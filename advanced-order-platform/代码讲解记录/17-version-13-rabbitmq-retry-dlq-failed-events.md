# 第十三版：RabbitMQ 消费失败重试、死信队列和失败事件表

第十二版已经完成了 RabbitMQ 消费者，把 `OrderCreated` 消息消费成通知记录。

第十三版继续补消费者失败治理：如果通知消费者处理失败，消息不会无限重试，也不会静默丢失，而是：

```text
消费者处理失败
 -> 本地重试 3 次
 -> 仍失败则 reject 且不 requeue
 -> RabbitMQ 投递到 DLQ
 -> FailedEventMessageListener 消费 DLQ
 -> 写入 failed_event_messages
 -> /api/v1/failed-events 查询失败消息
```

这是消息系统进入工程化阶段的关键一步。

## 本版新增文件

```text
src/main/java/com/codexdemo/orderplatform/notification/NotificationRabbitMqProperties.java
 -> 通知消费者重试参数配置

src/main/java/com/codexdemo/orderplatform/notification/NotificationRabbitMqConfiguration.java
 -> 自定义 RabbitListener 容器，配置 retry 和 reject 策略

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessage.java
 -> 失败事件消息实体

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageRepository.java
 -> 失败事件消息仓储

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java
 -> DLQ 消息幂等落库和 header 解析

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageListener.java
 -> 监听死信队列并记录失败消息

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java
 -> 失败消息查询接口

src/main/resources/db/migration/h2/V3__failed_event_messages.sql
 -> H2 失败消息表迁移

src/main/resources/db/migration/postgresql/V3__failed_event_messages.sql
 -> PostgreSQL 失败消息表迁移

src/test/java/com/codexdemo/orderplatform/RabbitMqNotificationFailureIntegrationTests.java
 -> 真实 RabbitMQ 失败重试和 DLQ 集成测试
```

## RabbitMQ 拓扑升级

文件：`src/main/java/com/codexdemo/orderplatform/outbox/OutboxRabbitMqProperties.java`

第十三版给 Outbox RabbitMQ 配置增加死信相关字段：

```java
private String deadLetterExchange = "order-platform.outbox.dlx";

private String deadLetterQueue = "order-platform.outbox.events.dlq";

private String deadLetterRoutingKey = "orders.dead-letter";
```

这三个配置分别表示：

```text
deadLetterExchange
 -> 失败消息被转发到哪个 exchange

deadLetterQueue
 -> 失败消息最终落到哪个 queue

deadLetterRoutingKey
 -> 从主队列进入 DLX 时使用哪个 routing key
```

文件：`src/main/java/com/codexdemo/orderplatform/outbox/RabbitMqOutboxConfiguration.java`

主队列现在带死信参数：

```java
@Bean
Queue outboxQueue(OutboxRabbitMqProperties properties) {
    return QueueBuilder.durable(properties.getQueue())
            .deadLetterExchange(properties.getDeadLetterExchange())
            .deadLetterRoutingKey(properties.getDeadLetterRoutingKey())
            .build();
}
```

这意味着消费者拒绝消息且不重新入队时，RabbitMQ 会把消息转到 DLX。

声明死信 exchange：

```java
@Bean
DirectExchange outboxDeadLetterExchange(OutboxRabbitMqProperties properties) {
    return new DirectExchange(properties.getDeadLetterExchange(), true, false);
}
```

声明死信 queue：

```java
@Bean
Queue outboxDeadLetterQueue(OutboxRabbitMqProperties properties) {
    return QueueBuilder.durable(properties.getDeadLetterQueue()).build();
}
```

绑定死信队列：

```java
@Bean
Binding outboxDeadLetterBinding(
        @Qualifier("outboxDeadLetterQueue") Queue outboxDeadLetterQueue,
        DirectExchange outboxDeadLetterExchange,
        OutboxRabbitMqProperties properties
) {
    return BindingBuilder
            .bind(outboxDeadLetterQueue)
            .to(outboxDeadLetterExchange)
            .with(properties.getDeadLetterRoutingKey());
}
```

所以 v13 的 RabbitMQ 拓扑变成：

```text
order-platform.outbox
 -> order-platform.outbox.events
 -> 消费失败
 -> order-platform.outbox.dlx
 -> order-platform.outbox.events.dlq
```

## 消费者重试配置

文件：`src/main/java/com/codexdemo/orderplatform/notification/NotificationRabbitMqProperties.java`

```java
@Component
@ConfigurationProperties(prefix = "notification.rabbitmq")
public class NotificationRabbitMqProperties {

    private boolean enabled;

    private Retry retry = new Retry();
```

重试参数：

```java
private int maxAttempts = 3;

private long initialIntervalMs = 200;

private double multiplier = 2.0;

private long maxIntervalMs = 1000;
```

对应配置：

```yaml
notification:
  rabbitmq:
    retry:
      max-attempts: 3
      initial-interval-ms: 200
      multiplier: 2.0
      max-interval-ms: 1000
```

## 自定义 RabbitListener 容器

文件：`src/main/java/com/codexdemo/orderplatform/notification/NotificationRabbitMqConfiguration.java`

```java
@Bean
SimpleRabbitListenerContainerFactory notificationRabbitListenerContainerFactory(
        ConnectionFactory connectionFactory,
        SimpleRabbitListenerContainerFactoryConfigurer configurer,
        NotificationRabbitMqProperties properties
) {
```

这段代码创建了通知消费者专用的 Listener 容器。

它先继承 Spring Boot 自动配置：

```java
SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
configurer.configure(factory, connectionFactory);
```

然后设置失败不重新入队：

```java
factory.setDefaultRequeueRejected(false);
```

再配置 retry advice：

```java
factory.setAdviceChain(RetryInterceptorBuilder
        .stateless()
        .maxAttempts(retry.getMaxAttempts())
        .backOffOptions(
                retry.getInitialIntervalMs(),
                retry.getMultiplier(),
                retry.getMaxIntervalMs()
        )
        .recoverer(new RejectAndDontRequeueRecoverer())
        .build());
```

关键点：

```text
RetryInterceptorBuilder.stateless()
 -> 在消费者本地重试，不改变消息体

maxAttempts(3)
 -> 最多尝试 3 次

RejectAndDontRequeueRecoverer
 -> 重试耗尽后拒绝消息，并且不重新放回原队列

defaultRequeueRejected(false)
 -> 防止失败消息在主队列里无限循环
```

## 通知消费者使用重试容器

文件：`src/main/java/com/codexdemo/orderplatform/notification/OrderNotificationListener.java`

```java
@RabbitListener(
        queues = "${outbox.rabbitmq.queue}",
        containerFactory = "notificationRabbitListenerContainerFactory"
)
public void handle(Message message) {
```

这表示 `OrderNotificationListener` 不再使用默认容器，而是使用 v13 的重试容器。

如果消息缺少关键 header：

```java
private String headerAsString(Message message, String name) {
    Object value = message.getMessageProperties().getHeaders().get(name);
    if (value == null) {
        throw new IllegalArgumentException("missing message header: " + name);
    }
    return value.toString();
}
```

它会抛异常，触发：

```text
本地 retry
 -> retry 耗尽
 -> reject and don't requeue
 -> dead letter queue
```

## 失败事件消息表

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessage.java`

```java
@Entity
@Table(
        name = "failed_event_messages",
        indexes = @Index(name = "idx_failed_event_messages_failed_at", columnList = "failed_at")
)
public class FailedEventMessage {
```

核心字段：

```java
@Column(name = "message_id", nullable = false, unique = true, length = 120)
private String messageId;

@Column(name = "event_id", length = 80)
private String eventId;

@Column(name = "event_type", length = 80)
private String eventType;

@Column(name = "aggregate_type", length = 64)
private String aggregateType;

@Column(name = "aggregate_id", length = 64)
private String aggregateId;

@Column(name = "source_queue", length = 160)
private String sourceQueue;

@Column(name = "dead_letter_queue", nullable = false, length = 160)
private String deadLetterQueue;

@Column(name = "failure_reason", nullable = false, length = 500)
private String failureReason;
```

`messageId` 是唯一键，防止同一条 DLQ 消息被重复记录。

## DLQ 消息落库

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageListener.java`

```java
@RabbitListener(queues = "${outbox.rabbitmq.dead-letter-queue}")
public void handle(Message message) {
    FailedEventMessage failedMessage = failedEventMessageService.record(
            message,
            outboxRabbitMqProperties.getDeadLetterQueue()
    );
```

这个监听器专门消费 DLQ。

它不负责重新处理业务，只负责把失败消息变成可查询、可审计的数据。

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

解析消息体：

```java
String payload = new String(message.getBody(), StandardCharsets.UTF_8);
```

解析 messageId：

```java
private String resolveMessageId(Message message, String payload) {
    return firstNonBlank(
            message.getMessageProperties().getMessageId(),
            header(message, "eventId"),
            "sha256-" + sha256(payload + message.getMessageProperties().getHeaders())
    );
}
```

优先级：

```text
messageId
 -> eventId
 -> payload + headers 的 sha256
```

这样即使消息没有 `messageId`，也能生成一个稳定的去重键。

保存失败消息：

```java
return failedEventMessageRepository.save(FailedEventMessage.record(
        messageId,
        header(message, "eventId"),
        header(message, "eventType"),
        header(message, "aggregateType"),
        header(message, "aggregateId"),
        header(message, "x-first-death-queue"),
        deadLetterQueue,
        truncate(firstNonBlank(header(message, "x-first-death-reason"), "dead-lettered"), 500),
        payload
));
```

RabbitMQ 会给死信消息添加 `x-first-death-queue`、`x-first-death-reason` 等 header。

所以失败表可以知道：

```text
消息原来在哪个队列失败
为什么进入死信
失败时的 payload 是什么
事件类型和聚合根是什么
```

## 查询接口

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java`

```java
@RestController
@RequestMapping("/api/v1/failed-events")
public class FailedEventMessageController {
```

查询最近 50 条失败消息：

```java
@GetMapping
public List<FailedEventMessageResponse> listRecentFailedMessages() {
    return failedEventMessageService.listRecentFailedMessages();
}
```

运行后访问：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/failed-events
```

## Flyway V3

文件：`src/main/resources/db/migration/h2/V3__failed_event_messages.sql`

```sql
create table failed_event_messages (
    id bigint generated by default as identity primary key,
    message_id varchar(120) not null,
    event_id varchar(80),
    event_type varchar(80),
    aggregate_type varchar(64),
    aggregate_id varchar(64),
    source_queue varchar(160),
    dead_letter_queue varchar(160) not null,
    failure_reason varchar(500) not null,
    payload text not null,
    failed_at timestamp(6) with time zone not null,
    constraint uk_failed_event_messages_message unique (message_id)
);
```

文件：`src/main/resources/db/migration/postgresql/V3__failed_event_messages.sql`

内容与 H2 版本保持一致。

PostgreSQL 集成测试同步升级为：

```text
appliedMigrations = 3
tableCount = 10
```

## 失败链路集成测试

文件：`src/test/java/com/codexdemo/orderplatform/RabbitMqNotificationFailureIntegrationTests.java`

测试使用真实 RabbitMQ：

```java
@Container
static final GenericContainer<?> RABBITMQ = new GenericContainer<>(
        DockerImageName.parse("rabbitmq:3.13-management-alpine"))
        .withExposedPorts(5672)
        .withEnv("RABBITMQ_DEFAULT_USER", RABBITMQ_USER)
        .withEnv("RABBITMQ_DEFAULT_PASS", RABBITMQ_PASSWORD)
        .waitingFor(Wait.forLogMessage(".*Server startup complete.*\\n", 1));
```

测试配置独立的 exchange、queue、DLX、DLQ：

```java
"outbox.rabbitmq.exchange=order-platform.failure.test",
"outbox.rabbitmq.queue=order-platform.failure.test",
"outbox.rabbitmq.dead-letter-exchange=order-platform.failure.dlx",
"outbox.rabbitmq.dead-letter-queue=order-platform.failure.dlq",
"outbox.rabbitmq.dead-letter-routing-key=orders.failure"
```

发送一条故意缺少 `eventId` 的消息：

```java
rabbitTemplate.convertAndSend(
        OUTBOX_EXCHANGE,
        "orders.OrderCreated",
        "{\"orderId\":404,\"status\":\"CREATED\"}",
        message -> {
            message.getMessageProperties().setMessageId(BAD_MESSAGE_ID);
            message.getMessageProperties().setHeader("aggregateType", "ORDER");
            message.getMessageProperties().setHeader("aggregateId", "404");
            message.getMessageProperties().setHeader("eventType", "OrderCreated");
            return message;
        }
);
```

因为缺少 `eventId`，主消费者会抛异常：

```text
missing message header: eventId
```

测试最终断言：

```java
assertThat(notificationMessageRepository.findAll()).isEmpty();
assertThat(failedMessage.getMessageId()).isEqualTo(BAD_MESSAGE_ID);
assertThat(failedMessage.getEventType()).isEqualTo("OrderCreated");
assertThat(failedMessage.getSourceQueue()).isEqualTo(OUTBOX_QUEUE);
assertThat(failedMessage.getDeadLetterQueue()).isEqualTo(DEAD_LETTER_QUEUE);
assertThat(failedMessage.getPayload()).contains("\"orderId\":404");
```

这证明消息没有被错误处理成正常通知，而是进入失败表。

## 本版总结

第十三版让 RabbitMQ 消费者从“能消费”升级为“失败可治理”。

目前具备：

```text
消费者本地重试
重试耗尽后 reject
主队列配置 DLX
失败消息进入 DLQ
DLQ 消费者记录失败消息
failed_event_messages 查询接口
Flyway V3
Testcontainers 真实失败链路验证
```

下一版最适合继续补：失败事件重放接口，把可恢复的 `failed_event_messages` 重新投递回业务 exchange。
