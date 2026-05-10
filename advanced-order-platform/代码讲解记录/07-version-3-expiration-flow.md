# 第七次讲解：第三版超时未支付订单自动过期取消

第三版在第二版“手动取消订单”的基础上，新增自动过期取消能力。

新增能力可以概括成：

```text
CREATED 订单超过配置的未支付时间
 -> 定时任务扫描出来
 -> 调用应用服务过期取消
 -> 释放 reserved 库存
 -> 写入 OrderExpired 事件
```

涉及文件：

```text
src/main/java/com/codexdemo/orderplatform/OrderPlatformApplication.java
src/main/java/com/codexdemo/orderplatform/order/OrderExpirationProperties.java
src/main/java/com/codexdemo/orderplatform/order/OrderExpirationScheduler.java
src/main/java/com/codexdemo/orderplatform/order/OrderRepository.java
src/main/java/com/codexdemo/orderplatform/order/OrderApplicationService.java
src/main/java/com/codexdemo/orderplatform/order/SalesOrder.java
src/main/java/com/codexdemo/orderplatform/outbox/OutboxEvent.java
src/main/resources/application.yml
src/test/java/com/codexdemo/orderplatform/OrderApplicationServiceTests.java
```

---

# 1. 为什么第三版做自动过期

第二版已经支持手动取消：

```text
POST /api/v1/orders/{orderId}/cancel
 -> 订单 CANCELLED
 -> reserved 释放回 available
 -> 写 OrderCancelled 事件
```

但真实交易系统里，用户经常会：

```text
创建订单
 -> 不支付
 -> 直接离开
```

如果没有自动过期，这些订单会一直占住库存。

所以第三版加入：

```text
超时未支付订单自动取消
```

一句话总结：自动过期取消让库存闭环从“用户主动取消”升级到“系统自动兜底释放”。

---

# 2. `@EnableScheduling`：开启 Spring 定时任务

入口类现在是：

```java
@SpringBootApplication
@EnableScheduling
public class OrderPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderPlatformApplication.class, args);
    }
}
```

这里新增的是：

```java
@EnableScheduling
```

它告诉 Spring：

```text
扫描并启用 @Scheduled 标注的方法
```

没有这个注解，`OrderExpirationScheduler` 即使被 Spring 管理，也不会按固定间隔执行。

一句话总结：`@EnableScheduling` 是自动过期扫描能运行起来的总开关。

---

# 3. `OrderExpirationProperties`：过期配置对象

第三版新增配置类：

```java
@Component
@ConfigurationProperties(prefix = "order.expiration")
public class OrderExpirationProperties {

    private boolean enabled = true;
    private Duration unpaidTimeout = Duration.ofMinutes(15);
```

它绑定的是：

```yaml
order:
  expiration:
    enabled: true
    unpaid-timeout: PT15M
    scan-delay-ms: 60000
```

字段含义：

```text
enabled
 -> 是否启用自动过期扫描

unpaidTimeout
 -> 订单创建后多久还没支付，就认为超时
```

getter / setter 让 Spring Boot 可以把配置注入进来：

```java
public Duration getUnpaidTimeout() {
    return unpaidTimeout;
}

public void setUnpaidTimeout(Duration unpaidTimeout) {
    this.unpaidTimeout = unpaidTimeout;
}
```

一句话总结：`OrderExpirationProperties` 把“多久算超时”从硬编码变成可配置。

---

# 4. `OrderExpirationScheduler`：定时扫描器

调度器类是：

```java
@Component
@ConditionalOnProperty(prefix = "order.expiration", name = "enabled", havingValue = "true", matchIfMissing = true)
public class OrderExpirationScheduler {
```

这里有两个注解：

```text
@Component
 -> 让 Spring 创建这个 Bean

@ConditionalOnProperty
 -> 只有 order.expiration.enabled=true 时才启用
```

`matchIfMissing = true` 表示如果没有写配置，也默认启用。

核心定时方法：

```java
@Scheduled(fixedDelayString = "${order.expiration.scan-delay-ms:60000}")
public void expireCreatedOrders() {
    Instant createdBefore = Instant.now().minus(properties.getUnpaidTimeout());
    int expired = orderApplicationService.expireCreatedOrdersBefore(createdBefore);
    if (expired > 0) {
        log.info("event=order_expiration_scan expired={} createdBefore={}", expired, createdBefore);
    }
}
```

这段代码的流程是：

```text
当前时间 - unpaidTimeout
 -> 得到 createdBefore
 -> 创建时间早于 createdBefore 的 CREATED 订单就是过期订单
 -> 调用应用服务批量过期取消
 -> 如果取消了订单，打印结构化日志
```

比如配置是：

```text
unpaidTimeout = PT15M
```

当前时间是：

```text
10:30
```

那么：

```text
createdBefore = 10:15
```

所有创建时间早于 10:15 且仍为 `CREATED` 的订单都会被扫描出来。

一句话总结：`OrderExpirationScheduler` 不直接改订单，它只负责按时间触发应用服务。

---

# 5. `OrderRepository`：查询过期订单

第三版新增仓库方法：

```java
@Lock(LockModeType.PESSIMISTIC_WRITE)
List<SalesOrder> findTop50ByStatusAndCreatedAtBeforeOrderByCreatedAtAsc(OrderStatus status, Instant createdAt);
```

这个方法名表达的查询是：

```text
找 status 等于指定状态
并且 createdAt 早于指定时间
按 createdAt 升序
最多取 50 条
```

调用时传入：

```java
OrderStatus.CREATED
```

也就是只扫描仍未支付、未取消的订单。

`@Lock(LockModeType.PESSIMISTIC_WRITE)` 很重要：

```java
@Lock(LockModeType.PESSIMISTIC_WRITE)
```

它会在查询订单时加数据库写锁。

这样可以降低并发风险：

```text
定时过期任务正在取消订单
同时用户正在支付订单
```

订单记录被锁住后，同一时刻只有一个事务能推进状态。

一句话总结：Repository 的过期查询负责找到“已经超时且仍为 CREATED”的订单，并用写锁保护状态流转。

---

# 6. `OrderApplicationService.expireCreatedOrdersBefore`：批量过期用例

第三版新增应用服务方法：

```java
@Transactional
public int expireCreatedOrdersBefore(Instant createdBefore) {
    List<SalesOrder> orders = orderRepository.findTop50ByStatusAndCreatedAtBeforeOrderByCreatedAtAsc(
            OrderStatus.CREATED,
            createdBefore
    );

    int expired = 0;
    Instant expiredAt = Instant.now();
    for (SalesOrder order : orders) {
        if (order.expire(expiredAt)) {
            inventoryService.releaseReserved(order.quantitiesByProductId());
            outboxRepository.save(OutboxEvent.orderExpired(order));
            expired++;
        }
    }
    return expired;
}
```

它的职责和手动取消类似，但入口不是用户请求，而是定时任务。

流程拆开看：

```java
List<SalesOrder> orders = orderRepository.findTop50ByStatusAndCreatedAtBeforeOrderByCreatedAtAsc(
        OrderStatus.CREATED,
        createdBefore
);
```

先查出过期订单。

然后统一生成一个过期时间：

```java
Instant expiredAt = Instant.now();
```

接着逐个处理：

```java
if (order.expire(expiredAt)) {
    inventoryService.releaseReserved(order.quantitiesByProductId());
    outboxRepository.save(OutboxEvent.orderExpired(order));
    expired++;
}
```

每张订单都会走：

```text
订单状态变 CANCELLED
 -> 释放 reserved 库存
 -> 写 OrderExpired 事件
 -> expired 计数加 1
```

整个方法有：

```java
@Transactional
```

所以某张订单过期处理失败时，当前事务里的状态、库存、事件会一起回滚。

一句话总结：`expireCreatedOrdersBefore` 是第三版的核心用例，它把查询、状态流转、库存释放、事件写入放进同一个事务。

---

# 7. `SalesOrder.expire`：过期状态流转

订单实体新增：

```java
public boolean expire(Instant expiredAt) {
    if (status != OrderStatus.CREATED) {
        return false;
    }
    status = OrderStatus.CANCELLED;
    canceledAt = expiredAt;
    return true;
}
```

它和手动取消的区别是：

```text
cancel()
 -> 非 CREATED 状态会抛业务异常
 -> 适合用户主动请求

expire(...)
 -> 非 CREATED 状态直接返回 false
 -> 适合后台批处理扫描
```

为什么后台过期不抛异常？

因为批处理更关心：

```text
能处理的处理掉
不能处理的跳过
```

比如某张订单在扫描出来后，状态已经被别的事务改过，那么 `expire` 返回 `false` 就可以避免误释放库存。

一句话总结：`expire` 是后台友好的状态流转方法，只处理 CREATED 订单。

---

# 8. `OutboxEvent.orderExpired`：过期事件

第三版新增事件：

```java
public static OutboxEvent orderExpired(SalesOrder order) {
    return new OutboxEvent("ORDER", String.valueOf(order.getId()), "OrderExpired", orderPayload(order));
}
```

现在订单事件有四类：

```text
OrderCreated
OrderPaid
OrderCancelled
OrderExpired
```

为什么手动取消和自动过期要分两个事件？

因为它们虽然最终状态都是：

```text
CANCELLED
```

但业务原因不同：

```text
OrderCancelled
 -> 用户或外部调用主动取消

OrderExpired
 -> 系统因为超时自动取消
```

后续做数据分析、通知、风控时，这两个事件应该能区分。

一句话总结：`OrderExpired` 让系统知道这张订单不是用户主动取消，而是超时自动关闭。

---

# 9. 第三版测试补强

第三版测试从 6 个增加到 8 个。

新增测试一：

```java
void expireCreatedOrdersBeforeReleasesReservedInventory()
```

关键代码：

```java
CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-007", request);
InventoryItem afterCreate = inventoryRepository.findByProductId(product.getId()).orElseThrow();
int expired = orderApplicationService.expireCreatedOrdersBefore(Instant.now().plusSeconds(1));
OrderResponse expiredOrder = orderApplicationService.getOrder(created.order().id());
InventoryItem afterExpire = inventoryRepository.findByProductId(product.getId()).orElseThrow();
```

这里用：

```java
Instant.now().plusSeconds(1)
```

作为 cutoff，是为了让刚创建的订单也被视为过期，方便测试。

断言重点：

```java
assertThat(expired).isGreaterThanOrEqualTo(1);
assertThat(expiredOrder.status()).isEqualTo(OrderStatus.CANCELLED);
assertThat(expiredOrder.canceledAt()).isNotNull();
assertThat(afterExpire.getAvailable()).isGreaterThanOrEqualTo(afterCreate.getAvailable() + 2);
assertThat(afterExpire.getReserved()).isLessThanOrEqualTo(afterCreate.getReserved() - 2);
```

这证明过期取消会：

```text
把订单改成 CANCELLED
记录 canceledAt
释放 reserved 库存
```

新增测试二：

```java
void expireCreatedOrdersBeforeDoesNotCancelFreshOrder()
```

关键代码：

```java
CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-008", request);
orderApplicationService.expireCreatedOrdersBefore(created.order().createdAt().minusMillis(1));
OrderResponse freshOrder = orderApplicationService.getOrder(created.order().id());
```

这里 cutoff 早于订单创建时间：

```text
createdAt - 1ms
```

所以这张订单不应该被扫描到。

断言：

```java
assertThat(freshOrder.status()).isEqualTo(OrderStatus.CREATED);
assertThat(freshOrder.canceledAt()).isNull();
```

一句话总结：第三版测试同时证明“该过期的会取消”和“没到期的不会误取消”。

---

# 本次讲解总结

第七次讲解的是第三版自动过期取消：通过 `@Scheduled` 定时扫描超时 `CREATED` 订单，用应用服务统一推进状态、释放库存、写入 `OrderExpired` 事件，让订单系统具备自动释放库存的兜底能力。
