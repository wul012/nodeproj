# 第十二版：RabbitMQ 通知消费者和幂等落库

第十一版已经能把 OutboxEvent 真实发送到 RabbitMQ。

第十二版继续往后推进一步：应用不只会“发布事件”，还会“消费事件”。

本版新增一个通知模块，用来消费 `OrderCreated` 消息，并把它转换成站内通知记录。

核心链路：

```text
创建订单
 -> 写入 OutboxEvent
 -> OutboxPublisher 发送 RabbitMQ 消息
 -> OrderNotificationListener 消费消息
 -> NotificationService 幂等写入 notification_messages
 -> NotificationController 提供查询接口
```

## 本版新增文件

```text
src/main/java/com/codexdemo/orderplatform/notification/NotificationMessage.java
 -> 通知消息实体，保存事件消费后的业务投影

src/main/java/com/codexdemo/orderplatform/notification/NotificationMessageRepository.java
 -> 通知消息仓储，支持按 eventId 幂等查询、最近通知查询、订单通知查询

src/main/java/com/codexdemo/orderplatform/notification/NotificationService.java
 -> 通知写入服务，处理幂等逻辑

src/main/java/com/codexdemo/orderplatform/notification/OrderNotificationListener.java
 -> RabbitMQ 消费者，消费 OrderCreated 消息

src/main/java/com/codexdemo/orderplatform/notification/NotificationController.java
 -> 通知查询 API

src/main/resources/db/migration/h2/V2__notification_messages.sql
 -> H2 通知表迁移

src/main/resources/db/migration/postgresql/V2__notification_messages.sql
 -> PostgreSQL 通知表迁移

src/test/java/com/codexdemo/orderplatform/RabbitMqNotificationConsumerIntegrationTests.java
 -> RabbitMQ 消费者集成测试
```

## 配置开关

文件：`src/main/resources/application.yml`

```yaml
notification:
  rabbitmq:
    enabled: false
```

默认模式下，通知消费者关闭。

原因和 v11 的发布器设计一样：普通本地开发不应该被 RabbitMQ 强制卡住。

文件：`src/main/resources/application-rabbitmq.yml`

```yaml
notification:
  rabbitmq:
    enabled: ${NOTIFICATION_RABBITMQ_ENABLED:true}
```

启用 `rabbitmq` profile 后，通知消费者默认开启。

如果只想发布消息、不想消费，也可以这样关掉：

```powershell
mvn spring-boot:run `
  -Dspring-boot.run.profiles=rabbitmq `
  -Dspring-boot.run.arguments="--notification.rabbitmq.enabled=false"
```

## 开启 Rabbit Listener 支持

文件：`src/main/java/com/codexdemo/orderplatform/outbox/RabbitMqOutboxConfiguration.java`

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnProperty(prefix = "outbox.rabbitmq", name = "enabled", havingValue = "true")
@EnableRabbit
public class RabbitMqOutboxConfiguration {
```

`@EnableRabbit` 让 `@RabbitListener` 生效。

本项目把它放在 RabbitMQ 配置类上，而不是全局启动类上，含义更明确：

```text
outbox.rabbitmq.enabled=true
 -> RabbitMQ 拓扑声明启用
 -> Rabbit Listener 注解处理启用

outbox.rabbitmq.enabled=false
 -> 不启动 RabbitMQ 相关基础设施
```

## 通知消息实体

文件：`src/main/java/com/codexdemo/orderplatform/notification/NotificationMessage.java`

```java
@Entity
@Table(
        name = "notification_messages",
        indexes = @Index(name = "idx_notification_messages_order_created", columnList = "order_id, created_at")
)
public class NotificationMessage {
```

这张表是“事件消费结果表”，不是订单主表。

关键字段：

```java
@Column(nullable = false, unique = true)
private UUID eventId;

@Column(nullable = false, length = 80)
private String eventType;

@Column(nullable = false)
private Long orderId;
```

`eventId` 对应 RabbitMQ 消息头里的 OutboxEvent id。

它被设置成唯一键，是本版消费者幂等的核心。

```text
同一个 eventId 第一次消费
 -> 插入 notification_messages

同一个 eventId 重复消费
 -> 查询到已有通知
 -> 不再插入第二条
```

通知内容构造：

```java
public static NotificationMessage orderCreated(UUID eventId, Long orderId, String payload) {
    return new NotificationMessage(eventId, "OrderCreated", orderId, "customer:" + orderId, payload);
}
```

这里先用 `customer:{orderId}` 作为演示 recipient。

后续如果给订单事件 payload 增加客户信息，或者接入用户表，可以再改成真实用户 id。

## 通知服务的幂等写入

文件：`src/main/java/com/codexdemo/orderplatform/notification/NotificationService.java`

```java
@Transactional
public NotificationMessage recordOrderCreated(UUID eventId, Long orderId, String payload) {
    return notificationMessageRepository.findByEventId(eventId)
            .orElseGet(() -> saveOrderCreated(eventId, orderId, payload));
}
```

第一层幂等：先按 `eventId` 查已有记录。

如果没有，才保存：

```java
private NotificationMessage saveOrderCreated(UUID eventId, Long orderId, String payload) {
    try {
        return notificationMessageRepository.save(NotificationMessage.orderCreated(eventId, orderId, payload));
    } catch (DataIntegrityViolationException ex) {
        return notificationMessageRepository.findByEventId(eventId).orElseThrow(() -> ex);
    }
}
```

第二层幂等：数据库唯一键兜底。

如果两个消费者并发处理同一个事件，其中一个插入成功，另一个触发唯一键冲突，后者会回查已有记录并返回。

这比单纯在 Java 里 `existsByEventId` 更稳。

## RabbitMQ 消费者

文件：`src/main/java/com/codexdemo/orderplatform/notification/OrderNotificationListener.java`

```java
@Component
@ConditionalOnProperty(prefix = "notification.rabbitmq", name = "enabled", havingValue = "true")
public class OrderNotificationListener {
```

消费者通过配置开关启用。

监听队列：

```java
@RabbitListener(queues = "${outbox.rabbitmq.queue}")
public void handle(Message message) {
```

这里监听的是 v11 Outbox 发布器绑定的队列：

```text
order-platform.outbox.events
```

也就是说，v11 负责把事件发进去，v12 负责把事件消费出来。

只处理 `OrderCreated`：

```java
String eventType = headerAsString(message, "eventType");
if (!"OrderCreated".equals(eventType)) {
    log.debug("event=notification_ignored eventType={}", eventType);
    return;
}
```

后续如果要对 `OrderPaid`、`OrderRefunded` 做不同通知，可以在这里扩展分支。

读取消息头：

```java
UUID eventId = UUID.fromString(headerAsString(message, "eventId"));
Long orderId = Long.valueOf(headerAsString(message, "aggregateId"));
String payload = new String(message.getBody(), StandardCharsets.UTF_8);
```

这些 header 正是 v11 的 `RabbitMqOutboxEventDispatcher` 写进去的：

```java
message.getMessageProperties().setHeader("eventId", event.getId().toString());
message.getMessageProperties().setHeader("aggregateType", event.getAggregateType());
message.getMessageProperties().setHeader("aggregateId", event.getAggregateId());
message.getMessageProperties().setHeader("eventType", event.getEventType());
```

所以 v11 和 v12 形成了完整闭环：

```text
RabbitMqOutboxEventDispatcher 写消息头
 -> OrderNotificationListener 读取消息头
 -> NotificationService 按 eventId 幂等落库
```

## 通知查询接口

文件：`src/main/java/com/codexdemo/orderplatform/notification/NotificationController.java`

```java
@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {
```

查询最近通知：

```java
@GetMapping
public List<NotificationMessageResponse> listRecentNotifications() {
    return notificationService.listRecentNotifications();
}
```

查询某个订单通知：

```java
@GetMapping("/orders/{orderId}")
public List<NotificationMessageResponse> listOrderNotifications(@PathVariable Long orderId) {
    return notificationService.listOrderNotifications(orderId);
}
```

运行后可以这样访问：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/notifications
Invoke-RestMethod http://localhost:8080/api/v1/notifications/orders/1
```

## Flyway V2

文件：`src/main/resources/db/migration/h2/V2__notification_messages.sql`

```sql
create table notification_messages (
    id bigint generated by default as identity primary key,
    event_id uuid not null,
    event_type varchar(80) not null,
    order_id bigint not null,
    channel varchar(32) not null,
    status varchar(32) not null,
    recipient varchar(120) not null,
    subject varchar(160) not null,
    content varchar(500) not null,
    payload text not null,
    created_at timestamp(6) with time zone not null,
    constraint uk_notification_messages_event unique (event_id)
);
```

文件：`src/main/resources/db/migration/postgresql/V2__notification_messages.sql`

内容和 H2 版本保持一致。

第十版开始项目已经使用 Hibernate validate，所以新增实体时必须同步新增迁移脚本。

否则启动时会出现：

```text
Schema-validation: missing table [notification_messages]
```

## 集成测试

文件：`src/test/java/com/codexdemo/orderplatform/RabbitMqNotificationConsumerIntegrationTests.java`

测试使用真实 RabbitMQ 容器：

```java
@Container
static final GenericContainer<?> RABBITMQ = new GenericContainer<>(
        DockerImageName.parse("rabbitmq:3.13-management-alpine"))
        .withExposedPorts(5672)
        .withEnv("RABBITMQ_DEFAULT_USER", RABBITMQ_USER)
        .withEnv("RABBITMQ_DEFAULT_PASS", RABBITMQ_PASSWORD);
```

测试配置开启消费者：

```java
"outbox.rabbitmq.enabled=true",
"notification.rabbitmq.enabled=true"
```

测试主流程：

```java
CreateOrderResult created = orderApplicationService.createOrder("rabbitmq-consumer-v12-001", request);
int published = outboxPublisher.publishPendingEvents();
NotificationMessage firstNotification = waitForNotificationCount(1).getFirst();
OutboxEvent event = outboxRepository.findTop50ByOrderByCreatedAtDesc().getFirst();
```

这段验证：

```text
创建订单
 -> 生成 OutboxEvent
 -> 发布 RabbitMQ 消息
 -> 消费者落库 NotificationMessage
```

随后测试重复投递同一个 eventId：

```java
rabbitTemplate.convertAndSend(
        OUTBOX_EXCHANGE,
        "orders.OrderCreated",
        event.getPayload(),
        message -> {
            message.getMessageProperties().setMessageId(event.getId().toString());
            message.getMessageProperties().setHeader("eventId", event.getId().toString());
            message.getMessageProperties().setHeader("aggregateId", event.getAggregateId());
            message.getMessageProperties().setHeader("eventType", event.getEventType());
            return message;
        }
);
```

最终断言：

```java
assertThat(notificationsAfterDuplicate)
        .singleElement()
        .extracting(NotificationMessage::getId)
        .isEqualTo(firstNotification.getId());
```

这表示同一个事件即使被重复消费，也只保留一条通知记录。

## 本版总结

第十二版把项目从“能发布领域事件”推进到“能消费领域事件并驱动异步业务”。

目前已经具备：

```text
Outbox 事件表
RabbitMQ 真实发布
RabbitMQ 真实消费
通知消息投影表
消费者幂等
通知查询 API
Flyway V2 迁移
Testcontainers 消费者集成测试
```

下一步适合继续补：消费者失败重试、死信队列、失败事件表和告警记录。
