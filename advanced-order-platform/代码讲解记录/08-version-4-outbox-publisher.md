# 第八次讲解：第四版 Outbox 后台发布器

第四版在前三版“写 Outbox 事件”的基础上，新增“扫描未发布事件并标记发布完成”的能力。

新增能力可以概括成：

```text
订单业务写入 OutboxEvent
 -> publishedAt 初始为空
 -> OutboxPublisherScheduler 定时触发
 -> OutboxPublisher 扫描未发布事件
 -> OutboxEvent.markPublished
 -> publishedAt 写入当前时间
```

涉及文件：

```text
src/main/java/com/codexdemo/orderplatform/outbox/OutboxEvent.java
src/main/java/com/codexdemo/orderplatform/outbox/OutboxRepository.java
src/main/java/com/codexdemo/orderplatform/outbox/OutboxPublisher.java
src/main/java/com/codexdemo/orderplatform/outbox/OutboxPublisherScheduler.java
src/main/java/com/codexdemo/orderplatform/outbox/OutboxPublisherProperties.java
src/main/resources/application.yml
src/test/java/com/codexdemo/orderplatform/OrderApplicationServiceTests.java
```

---

# 1. 为什么第四版做 Outbox 发布器

前面几版已经会写事件：

```text
OrderCreated
OrderPaid
OrderCancelled
OrderExpired
```

但这些事件只是保存在数据库里。

如果以后接 Kafka / RabbitMQ，不能只停在：

```text
把事件插入 outbox_events 表
```

还需要有一个后台组件：

```text
扫描未发布事件
 -> 发送消息
 -> 标记 publishedAt
```

第四版暂时不接真实消息队列，而是先实现发布标记。

这样先把可靠发布的骨架搭起来。

一句话总结：第四版让 Outbox 从“只写事件表”推进到“后台扫描并推进发布状态”。

---

# 2. `OutboxEvent.markPublished`：事件发布状态

第四版给事件实体新增方法：

```java
public boolean markPublished(Instant publishedAt) {
    if (this.publishedAt != null) {
        return false;
    }
    this.publishedAt = publishedAt;
    return true;
}
```

它做两件事：

```text
如果已经发布过，返回 false
如果还没发布，就写入 publishedAt 并返回 true
```

为什么要返回 boolean？

因为发布器需要统计这次真正发布了多少条。

比如：

```text
publishedAt = null
 -> markPublished 成功
 -> 计数 +1

publishedAt != null
 -> 已经发布过
 -> 不重复计数
```

`publishedAt` 的意义是：

```text
null
 -> 事件还在等待发布

有时间
 -> 事件已经被发布器处理过
```

一句话总结：`markPublished` 是 Outbox 事件从“待发布”变成“已发布”的状态流转。

---

# 3. `OutboxRepository`：查询未发布事件

第四版仓库新增两个方法：

```java
long countByPublishedAtIsNull();
```

这个方法用来统计当前还有多少事件没发布。

测试里会用它验证发布器是否真的清空待发布事件。

第二个方法更重要：

```java
@Lock(LockModeType.PESSIMISTIC_WRITE)
List<OutboxEvent> findTop50ByPublishedAtIsNullOrderByCreatedAtAsc();
```

它表达的查询是：

```text
找 publishedAt 为空的事件
按 createdAt 升序
最多取 50 条
```

也就是优先发布最早产生的事件。

这里加了：

```java
@Lock(LockModeType.PESSIMISTIC_WRITE)
```

原因是未来如果多个应用实例同时跑发布器，需要避免同一条事件被多个实例同时处理。

虽然当前只是单机练习项目，但先把锁的语义放进去，后续升级更顺。

一句话总结：`OutboxRepository` 给发布器提供“锁住并取出一批未发布事件”的能力。

---

# 4. `OutboxPublisher`：发布器核心

第四版新增服务：

```java
@Service
public class OutboxPublisher {

    private static final Logger log = LoggerFactory.getLogger(OutboxPublisher.class);

    private final OutboxRepository outboxRepository;
```

核心方法是：

```java
@Transactional
public int publishPendingEvents() {
    List<OutboxEvent> events = outboxRepository.findTop50ByPublishedAtIsNullOrderByCreatedAtAsc();
    Instant publishedAt = Instant.now();
    int published = 0;
    for (OutboxEvent event : events) {
        if (event.markPublished(publishedAt)) {
            published++;
        }
    }
    if (published > 0) {
        log.info("event=outbox_publish published={}", published);
    }
    return published;
}
```

流程拆开看：

```java
List<OutboxEvent> events = outboxRepository.findTop50ByPublishedAtIsNullOrderByCreatedAtAsc();
```

先从数据库里锁定一批待发布事件。

然后生成统一发布时间：

```java
Instant publishedAt = Instant.now();
```

接着逐条标记：

```java
for (OutboxEvent event : events) {
    if (event.markPublished(publishedAt)) {
        published++;
    }
}
```

最后打印结构化日志：

```java
log.info("event=outbox_publish published={}", published);
```

当前版本没有真正发 Kafka / RabbitMQ。

但以后可以把循环改成：

```text
发送消息到 broker
 -> broker ack 成功
 -> markPublished
```

一句话总结：`OutboxPublisher` 是第四版核心，它把未发布事件推进到已发布状态。

---

# 5. `OutboxPublisherScheduler`：后台定时触发

调度器代码是：

```java
@Component
@ConditionalOnProperty(prefix = "outbox.publisher", name = "enabled", havingValue = "true", matchIfMissing = true)
public class OutboxPublisherScheduler {

    private final OutboxPublisher outboxPublisher;
```

这里用：

```java
@ConditionalOnProperty
```

表示只有配置启用时才创建这个调度器。

核心方法：

```java
@Scheduled(fixedDelayString = "${outbox.publisher.scan-delay-ms:60000}")
public void publishPendingEvents() {
    outboxPublisher.publishPendingEvents();
}
```

它每隔一段时间调用发布器。

默认间隔在 `application.yml`：

```yaml
outbox:
  publisher:
    enabled: true
    scan-delay-ms: 60000
```

也就是：

```text
默认每 60 秒扫描一次
```

本地调试可以改成：

```text
--outbox.publisher.scan-delay-ms=1000
```

一句话总结：`OutboxPublisherScheduler` 负责让发布器自动运行，而不是只能手动调用。

---

# 6. `OutboxPublisherProperties`：发布器开关

配置类是：

```java
@Component
@ConfigurationProperties(prefix = "outbox.publisher")
public class OutboxPublisherProperties {

    private boolean enabled = true;
```

当前它主要表达：

```text
outbox.publisher.enabled
```

虽然调度器本身已经通过 `@ConditionalOnProperty` 读取这个配置，但保留配置类有一个好处：

后续如果要扩展：

```text
batch-size
max-retry
broker-topic
```

就可以直接加到这个类里。

一句话总结：`OutboxPublisherProperties` 是发布器配置扩展的落点。

---

# 7. 第四版测试补强

第四版测试类上增加了测试配置：

```java
@SpringBootTest(properties = {
        "order.expiration.enabled=false",
        "outbox.publisher.enabled=false"
})
```

这里关闭两个后台调度器：

```text
order.expiration.enabled=false
outbox.publisher.enabled=false
```

原因是单元测试要保持确定性。

测试直接调用服务方法，不依赖后台线程什么时候跑。

第四版新增测试：

```java
void outboxPublisherPublishesPendingEventsAndIsIdempotent()
```

它先创建一张订单，让业务写入 `OrderCreated`：

```java
orderApplicationService.createOrder("test-idempotency-key-009", request);
```

然后统计待发布事件：

```java
long pendingBefore = outboxRepository.countByPublishedAtIsNull();
```

调用发布器：

```java
int published = outboxPublisher.publishPendingEvents();
```

再看待发布数量：

```java
long pendingAfter = outboxRepository.countByPublishedAtIsNull();
```

最后再次调用发布器：

```java
int republished = outboxPublisher.publishPendingEvents();
```

关键断言是：

```java
assertThat(pendingBefore).isGreaterThanOrEqualTo(1);
assertThat(published).isEqualTo(Math.toIntExact(pendingBefore));
assertThat(pendingAfter).isZero();
assertThat(republished).isZero();
assertThat(outboxRepository.findTop50ByOrderByCreatedAtDesc())
        .allMatch(event -> event.getPublishedAt() != null);
```

这些断言证明：

```text
有待发布事件
 -> 第一次发布会标记它们
 -> 发布后没有 pending 事件
 -> 第二次发布不会重复发布
 -> 最近事件都有 publishedAt
```

一句话总结：第四版测试证明发布器能清空 pending 事件，并且重复执行是幂等的。

---

# 本次讲解总结

第八次讲解的是第四版 Outbox 后台发布器：它通过数据库锁取出未发布事件，在事务里写入 `publishedAt`，由调度器定时触发，为后续接入 Kafka / RabbitMQ 打下可靠消息发布的结构基础。
