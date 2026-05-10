# 第十一版：RabbitMQ Outbox 真实发布

本版把前面已经存在的 Outbox 表从“只在数据库里标记已发布”推进到“可以真正把领域事件发送到 RabbitMQ”。

关键目标不是把项目立刻拆成微服务，而是先补齐分布式系统里非常典型的一环：

```text
业务事务写订单和 OutboxEvent
 -> OutboxPublisher 扫描未发布事件
 -> OutboxEventDispatcher 负责投递
 -> RabbitMQ 模式发送消息
 -> 发送成功后标记 publishedAt
```

这样做的好处是：订单写库和事件记录仍然在同一个数据库事务里完成，外部消息投递由后台发布器补发，后面可以继续接入积分、通知、物流、搜索索引等异步消费者。

## 本版新增文件

```text
src/main/java/com/codexdemo/orderplatform/outbox/OutboxEventDispatcher.java
 -> Outbox 发布动作的抽象接口

src/main/java/com/codexdemo/orderplatform/outbox/DatabaseOnlyOutboxEventDispatcher.java
 -> 默认模式，不连接消息队列，只保留数据库 Outbox 发布标记能力

src/main/java/com/codexdemo/orderplatform/outbox/OutboxRabbitMqProperties.java
 -> RabbitMQ Outbox 配置对象，集中管理 exchange、queue、routing key 前缀

src/main/java/com/codexdemo/orderplatform/outbox/RabbitMqOutboxConfiguration.java
 -> 创建 RabbitMQ exchange、queue、binding

src/main/java/com/codexdemo/orderplatform/outbox/RabbitMqOutboxEventDispatcher.java
 -> 真正使用 RabbitTemplate 投递 OutboxEvent

src/main/resources/application-rabbitmq.yml
 -> rabbitmq profile 的连接配置

src/test/java/com/codexdemo/orderplatform/RabbitMqOutboxPublisherIntegrationTests.java
 -> 使用 Testcontainers 启动真实 RabbitMQ 验证消息投递
```

## Maven 依赖

文件：`pom.xml`

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

`spring-boot-starter-amqp` 提供了 `RabbitTemplate`、连接工厂、RabbitMQ 自动配置和消息属性 API。

本项目没有手写底层 AMQP 连接代码，而是交给 Spring AMQP 管理：

```text
业务代码只关心：
 -> 发送到哪个 exchange
 -> 使用哪个 routing key
 -> 消息体和消息头是什么

连接、channel、序列化、声明队列等基础设施：
 -> 交给 Spring Boot + Spring AMQP
```

## 配置拆分

文件：`src/main/resources/application.yml`

```yaml
outbox:
  rabbitmq:
    enabled: false
    exchange: order-platform.outbox
    queue: order-platform.outbox.events
    routing-key-prefix: orders
```

默认配置里 `outbox.rabbitmq.enabled=false`，意思是平时运行项目不强制依赖 RabbitMQ。

这点很重要：高级项目练习要能逐步推进，不能因为本机没启动消息队列就让全部业务不可用。

文件：`src/main/resources/application-rabbitmq.yml`

```yaml
spring:
  rabbitmq:
    host: ${RABBITMQ_HOST:localhost}
    port: ${RABBITMQ_PORT:5672}
    username: ${RABBITMQ_USERNAME:order_app}
    password: ${RABBITMQ_PASSWORD:order_app}

outbox:
  rabbitmq:
    enabled: true
    exchange: ${OUTBOX_RABBITMQ_EXCHANGE:order-platform.outbox}
    queue: ${OUTBOX_RABBITMQ_QUEUE:order-platform.outbox.events}
    routing-key-prefix: ${OUTBOX_RABBITMQ_ROUTING_PREFIX:orders}
```

启用 `rabbitmq` profile 后：

```text
outbox.rabbitmq.enabled=true
 -> RabbitMqOutboxConfiguration 生效
 -> RabbitMqOutboxEventDispatcher 生效
 -> DatabaseOnlyOutboxEventDispatcher 不再生效
```

这就是本版最核心的“可插拔发布器”设计。

## Docker Compose 增加 RabbitMQ

文件：`docker-compose.yml`

```yaml
rabbitmq:
  image: rabbitmq:3.13-management-alpine
  container_name: advanced-order-platform-rabbitmq
  environment:
    RABBITMQ_DEFAULT_USER: order_app
    RABBITMQ_DEFAULT_PASS: order_app
  ports:
    - "5672:5672"
    - "15672:15672"
  healthcheck:
    test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
    interval: 5s
    timeout: 3s
    retries: 20
```

这里暴露了两个端口：

```text
5672
 -> 应用程序连接 RabbitMQ 的 AMQP 端口

15672
 -> RabbitMQ Management 管理后台端口
```

管理后台地址：

```text
http://localhost:15672
账号：order_app
密码：order_app
```

## Outbox 发布动作抽象

文件：`src/main/java/com/codexdemo/orderplatform/outbox/OutboxEventDispatcher.java`

```java
public interface OutboxEventDispatcher {
    void dispatch(OutboxEvent event);
}
```

这个接口看起来很小，但它把 `OutboxPublisher` 和具体消息中间件解耦了。

没有这个接口时，发布器只能自己决定“怎么发布”；有了这个接口后，发布器只负责扫描和标记，具体投递交给不同实现：

```text
DatabaseOnlyOutboxEventDispatcher
 -> 默认实现，不发送外部消息

RabbitMqOutboxEventDispatcher
 -> RabbitMQ 实现，发送到 exchange
```

## 默认发布器：只保留数据库记录

文件：`src/main/java/com/codexdemo/orderplatform/outbox/DatabaseOnlyOutboxEventDispatcher.java`

```java
@Component
@ConditionalOnProperty(prefix = "outbox.rabbitmq", name = "enabled", havingValue = "false", matchIfMissing = true)
public class DatabaseOnlyOutboxEventDispatcher implements OutboxEventDispatcher {

    @Override
    public void dispatch(OutboxEvent event) {
        // Default mode keeps the Outbox table as the delivery record without contacting a broker.
    }
}
```

重点在 `@ConditionalOnProperty`：

```text
outbox.rabbitmq.enabled=false
 -> 这个类生效

outbox.rabbitmq.enabled=true
 -> 这个类不生效
```

所以默认运行、普通单元测试、H2 本地开发都不会被 RabbitMQ 卡住。

## RabbitMQ 配置对象

文件：`src/main/java/com/codexdemo/orderplatform/outbox/OutboxRabbitMqProperties.java`

```java
@Component
@ConfigurationProperties(prefix = "outbox.rabbitmq")
public class OutboxRabbitMqProperties {

    private boolean enabled;

    private String exchange = "order-platform.outbox";

    private String queue = "order-platform.outbox.events";

    private String routingKeyPrefix = "orders";
}
```

这段代码把 yaml 配置绑定成 Java 对象。

另外还有一个方法负责统一生成 routing key：

```java
public String routingKeyFor(OutboxEvent event) {
    return routingKeyPrefix + "." + event.getEventType();
}
```

假设事件类型是 `OrderCreated`，默认 routing key 就是：

```text
orders.OrderCreated
```

后续如果增加订单支付、退款、发货事件，就会自然变成：

```text
orders.OrderPaid
orders.OrderRefunded
orders.OrderShipped
```

## RabbitMQ 拓扑声明

文件：`src/main/java/com/codexdemo/orderplatform/outbox/RabbitMqOutboxConfiguration.java`

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnProperty(prefix = "outbox.rabbitmq", name = "enabled", havingValue = "true")
public class RabbitMqOutboxConfiguration {
```

这个配置类只在 RabbitMQ 模式启用。

声明 exchange：

```java
@Bean
TopicExchange outboxExchange(OutboxRabbitMqProperties properties) {
    return new TopicExchange(properties.getExchange(), true, false);
}
```

这里使用 `TopicExchange`，因为 topic exchange 支持按 routing key 模式路由消息。

声明 queue：

```java
@Bean
Queue outboxQueue(OutboxRabbitMqProperties properties) {
    return QueueBuilder.durable(properties.getQueue()).build();
}
```

`durable` 表示队列是持久化队列，RabbitMQ 重启后队列定义仍然存在。

声明 binding：

```java
@Bean
Binding outboxBinding(Queue outboxQueue, TopicExchange outboxExchange, OutboxRabbitMqProperties properties) {
    return BindingBuilder
            .bind(outboxQueue)
            .to(outboxExchange)
            .with(properties.getRoutingKeyPrefix() + ".#");
}
```

`orders.#` 可以匹配所有订单事件：

```text
orders.OrderCreated
orders.OrderPaid
orders.OrderRefunded
orders.OrderShipped
```

## RabbitMQ 真实投递实现

文件：`src/main/java/com/codexdemo/orderplatform/outbox/RabbitMqOutboxEventDispatcher.java`

```java
@Component
@ConditionalOnProperty(prefix = "outbox.rabbitmq", name = "enabled", havingValue = "true")
public class RabbitMqOutboxEventDispatcher implements OutboxEventDispatcher {
```

仍然通过 `@ConditionalOnProperty` 控制是否启用。

核心发送逻辑：

```java
rabbitTemplate.convertAndSend(
        properties.getExchange(),
        properties.routingKeyFor(event),
        event.getPayload(),
        message -> {
            message.getMessageProperties().setContentType("application/json");
            message.getMessageProperties().setMessageId(event.getId().toString());
            message.getMessageProperties().setHeader("eventId", event.getId().toString());
            message.getMessageProperties().setHeader("aggregateType", event.getAggregateType());
            message.getMessageProperties().setHeader("aggregateId", event.getAggregateId());
            message.getMessageProperties().setHeader("eventType", event.getEventType());
            message.getMessageProperties().setHeader("createdAt", event.getCreatedAt().toString());
            return message;
        }
);
```

这里有几个关键点：

```text
properties.getExchange()
 -> 发送到配置里的 exchange

properties.routingKeyFor(event)
 -> 根据事件类型生成 routing key

event.getPayload()
 -> 直接发送 Outbox 表里保存的 JSON

messageId
 -> 使用 OutboxEvent 的 id，方便消费者做幂等

headers
 -> 把事件元信息放到消息头，消费者不解析 body 也能判断事件类型和聚合根
```

## OutboxPublisher 的职责变化

文件：`src/main/java/com/codexdemo/orderplatform/outbox/OutboxPublisher.java`

旧版本发布器只做一件事：扫描未发布事件，然后标记 `publishedAt`。

本版增加了 `OutboxEventDispatcher`：

```java
private final OutboxEventDispatcher outboxEventDispatcher;

public OutboxPublisher(OutboxRepository outboxRepository, OutboxEventDispatcher outboxEventDispatcher) {
    this.outboxRepository = outboxRepository;
    this.outboxEventDispatcher = outboxEventDispatcher;
}
```

发布流程变成：

```java
for (OutboxEvent event : events) {
    outboxEventDispatcher.dispatch(event);
    if (event.markPublished(publishedAt)) {
        published++;
    }
}
```

注意顺序：

```text
先 dispatch
再 markPublished
```

这意味着 RabbitMQ 发送失败时，`dispatch(event)` 会抛异常，事务回滚，事件不会被标记为已发布。

这样下一轮扫描仍然可以继续重试。

## 集成测试验证真实 RabbitMQ

文件：`src/test/java/com/codexdemo/orderplatform/RabbitMqOutboxPublisherIntegrationTests.java`

测试使用 Testcontainers 启动真实 RabbitMQ：

```java
@Container
static final GenericContainer<?> RABBITMQ = new GenericContainer<>(
        DockerImageName.parse("rabbitmq:3.13-management-alpine"))
        .withExposedPorts(5672)
        .withEnv("RABBITMQ_DEFAULT_USER", RABBITMQ_USER)
        .withEnv("RABBITMQ_DEFAULT_PASS", RABBITMQ_PASSWORD);
```

再把容器端口动态注入 Spring：

```java
@DynamicPropertySource
static void registerRabbitMqProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.rabbitmq.host", RABBITMQ::getHost);
    registry.add("spring.rabbitmq.port", () -> RABBITMQ.getMappedPort(5672));
    registry.add("spring.rabbitmq.username", () -> RABBITMQ_USER);
    registry.add("spring.rabbitmq.password", () -> RABBITMQ_PASSWORD);
}
```

测试流程：

```java
CreateOrderResult created = orderApplicationService.createOrder("rabbitmq-it-v11-001", request);
long pendingBeforePublish = outboxRepository.countByPublishedAtIsNull();
int published = outboxPublisher.publishPendingEvents();
long pendingAfterPublish = outboxRepository.countByPublishedAtIsNull();
Message message = rabbitTemplate.receive(OUTBOX_QUEUE, 5000);
```

这里一次性验证四件事：

```text
创建订单后 Outbox 有待发布事件
 -> pendingBeforePublish == 1

执行发布器后成功发布 1 条
 -> published == 1

发布后数据库没有待发布事件
 -> pendingAfterPublish == 0

RabbitMQ 队列里能收到消息
 -> message != null
```

消息体断言：

```java
assertThat(new String(message.getBody(), StandardCharsets.UTF_8))
        .contains("\"orderId\":" + created.order().id())
        .contains("\"status\":\"CREATED\"");
```

消息元信息断言：

```java
assertThat(message.getMessageProperties().getMessageId()).isEqualTo(events.getFirst().getId().toString());
assertThat(message.getMessageProperties().getReceivedRoutingKey()).isEqualTo("orders.OrderCreated");
assertThat(message.getMessageProperties().getHeaders())
        .containsEntry("eventType", "OrderCreated")
        .containsEntry("aggregateType", "ORDER")
        .containsEntry("aggregateId", String.valueOf(created.order().id()));
```

最后确认数据库标记：

```java
assertThat(events).allMatch(event -> event.getPublishedAt() != null);
```

## 运行方式

只启动 RabbitMQ：

```powershell
docker compose -f compose.yaml up -d rabbitmq
```

使用 H2 + RabbitMQ 运行：

```powershell
mvn spring-boot:run -Dspring-boot.run.profiles=rabbitmq
```

使用 PostgreSQL + RabbitMQ 运行：

```powershell
docker compose -f compose.yaml up -d postgres rabbitmq
mvn spring-boot:run -Dspring-boot.run.profiles=postgres,rabbitmq
```

运行 RabbitMQ 集成测试：

```powershell
mvn -Dtest=RabbitMqOutboxPublisherIntegrationTests test
```

运行全部测试：

```powershell
mvn test
```

## 本版总结

第十一版让 Outbox 从“数据库发布标记”升级成了“可真实投递到 RabbitMQ 的事件发布机制”。默认模式仍然轻量可跑，RabbitMQ 模式则具备真实消息队列、exchange/queue/binding 声明、消息头元数据、Testcontainers 集成验证和失败重试基础。
