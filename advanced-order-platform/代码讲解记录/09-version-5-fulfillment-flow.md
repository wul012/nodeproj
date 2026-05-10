# 第五版讲解：订单发货与完成履约流转

第五版重点讲解这些文件：

```text
src/main/java/com/codexdemo/orderplatform/order/OrderStatus.java
src/main/java/com/codexdemo/orderplatform/order/SalesOrder.java
src/main/java/com/codexdemo/orderplatform/order/OrderResponse.java
src/main/java/com/codexdemo/orderplatform/order/OrderApplicationService.java
src/main/java/com/codexdemo/orderplatform/order/OrderController.java
src/main/java/com/codexdemo/orderplatform/outbox/OutboxEvent.java
src/test/java/com/codexdemo/orderplatform/OrderApplicationServiceTests.java
```

第五版解决的问题是：

```text
前四版订单支付后就停在 PAID
第五版继续补齐履约链路
 -> PAID 订单可以发货
 -> SHIPPED 订单可以完成
 -> 每次有效状态变化都写 Outbox 事件
 -> 重复发货/重复完成不会重复写事件
```

新的主流程是：

```text
CREATED
 -> pay
 -> PAID
 -> ship
 -> SHIPPED
 -> complete
 -> COMPLETED
```

取消和过期仍然只处理未支付订单：

```text
CREATED
 -> cancel / expire
 -> CANCELLED
```

---

# 1. `OrderStatus.java`：扩展订单状态

第五版把订单状态从三种扩展为五种：

```java
public enum OrderStatus {
    CREATED,
    PAID,
    SHIPPED,
    COMPLETED,
    CANCELLED
}
```

每个状态的业务含义是：

```text
CREATED
 -> 已创建，库存已经预占，等待支付

PAID
 -> 已支付，reserved 库存已经确认扣减

SHIPPED
 -> 已发货，订单进入履约中

COMPLETED
 -> 已完成，履约闭环结束

CANCELLED
 -> 已取消，预占库存已经释放
```

一句话总结：第五版的状态机从“下单-支付/取消”升级成“下单-支付-发货-完成”的履约闭环。

---

# 2. `SalesOrder.java`：把发货和完成规则放进聚合根

第五版新增两个时间字段：

```java
private Instant shippedAt;

private Instant completedAt;
```

它们和已有的时间字段一起表达订单生命周期：

```text
createdAt
 -> 创建时间

paidAt
 -> 支付时间

shippedAt
 -> 发货时间

completedAt
 -> 完成时间

canceledAt
 -> 取消或过期时间
```

发货领域方法是：

```java
public boolean ship() {
    if (status == OrderStatus.SHIPPED) {
        return false;
    }
    if (status != OrderStatus.PAID) {
        throw new BusinessException(HttpStatus.CONFLICT, "ORDER_STATUS_INVALID",
                "Only PAID orders can be shipped");
    }
    status = OrderStatus.SHIPPED;
    shippedAt = Instant.now();
    return true;
}
```

这段代码有三个重点：

```text
已经 SHIPPED
 -> 返回 false，表示这次没有真实状态变化

不是 PAID
 -> 抛出 ORDER_STATUS_INVALID

PAID
 -> 改成 SHIPPED，记录 shippedAt，返回 true
```

完成领域方法是：

```java
public boolean complete() {
    if (status == OrderStatus.COMPLETED) {
        return false;
    }
    if (status != OrderStatus.SHIPPED) {
        throw new BusinessException(HttpStatus.CONFLICT, "ORDER_STATUS_INVALID",
                "Only SHIPPED orders can be completed");
    }
    status = OrderStatus.COMPLETED;
    completedAt = Instant.now();
    return true;
}
```

它的规则同样清晰：

```text
已经 COMPLETED
 -> 返回 false，不重复完成

不是 SHIPPED
 -> 抛业务异常

SHIPPED
 -> 改成 COMPLETED，记录 completedAt
```

为什么返回 `boolean`？

因为应用服务需要知道“这次调用是否真的发生状态变化”：

```text
true
 -> 需要写 Outbox 事件

false
 -> 只是幂等重放，不重复写事件
```

一句话总结：`SalesOrder` 负责守住状态机规则，保证订单不能跳过支付直接发货，也不能跳过发货直接完成。

---

# 3. `OrderResponse.java`：把履约时间返回给调用方

第五版响应 DTO 新增：

```java
Instant shippedAt,
Instant completedAt,
```

完整转换代码里也多了两个 getter：

```java
return new OrderResponse(
        order.getId(),
        order.getCustomerId(),
        order.getStatus(),
        order.getTotalAmount(),
        order.getCreatedAt(),
        order.getPaidAt(),
        order.getShippedAt(),
        order.getCompletedAt(),
        order.getCanceledAt(),
        order.getLines().stream().map(OrderLineResponse::from).toList()
);
```

这样前端或调试脚本能直接看到：

```text
订单什么时候发货
订单什么时候完成
```

一句话总结：`OrderResponse` 继续保持“对外返回 DTO”的角色，只把必要的履约字段暴露出去，不直接暴露 JPA 实体。

---

# 4. `OrderApplicationService.java`：编排发货和完成用例

发货用例是：

```java
@Transactional
public OrderResponse ship(Long orderId) {
    SalesOrder order = findOrder(orderId);
    if (order.ship()) {
        outboxRepository.save(OutboxEvent.orderShipped(order));
    }
    return OrderResponse.from(order);
}
```

流程是：

```text
1. findOrder 查询订单
2. order.ship() 执行领域状态变更
3. 如果返回 true，写 OrderShipped 事件
4. 返回订单响应
```

完成用例是：

```java
@Transactional
public OrderResponse complete(Long orderId) {
    SalesOrder order = findOrder(orderId);
    if (order.complete()) {
        outboxRepository.save(OutboxEvent.orderCompleted(order));
    }
    return OrderResponse.from(order);
}
```

它的流程类似：

```text
1. findOrder 查询订单
2. order.complete() 执行领域状态变更
3. 如果返回 true，写 OrderCompleted 事件
4. 返回订单响应
```

这里的关键设计是：

```text
状态合法性由 SalesOrder 判断
Outbox 写入由 OrderApplicationService 编排
事务边界由 @Transactional 包住
```

所以订单状态变化和事件落库仍然在同一个事务里完成。

一句话总结：应用服务不自己判断能不能发货、能不能完成，而是调用领域方法，然后根据返回值决定是否写事件。

---

# 5. `OrderController.java`：新增两个 HTTP 入口

第五版新增发货接口：

```java
@PostMapping("/{orderId}/ship")
public ResponseEntity<OrderResponse> ship(@PathVariable Long orderId) {
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(orderApplicationService.ship(orderId));
}
```

新增完成接口：

```java
@PostMapping("/{orderId}/complete")
public ResponseEntity<OrderResponse> complete(@PathVariable Long orderId) {
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(orderApplicationService.complete(orderId));
}
```

外部调用顺序通常是：

```powershell
Invoke-RestMethod -Method Post http://localhost:8080/api/v1/orders/1/pay
Invoke-RestMethod -Method Post http://localhost:8080/api/v1/orders/1/ship
Invoke-RestMethod -Method Post http://localhost:8080/api/v1/orders/1/complete
```

如果顺序错误，比如未支付直接发货：

```text
POST /api/v1/orders/1/ship
 -> 409 ORDER_STATUS_INVALID
```

如果已支付但未发货直接完成：

```text
POST /api/v1/orders/1/complete
 -> 409 ORDER_STATUS_INVALID
```

一句话总结：Controller 只增加两个薄入口，真正业务规则仍然沉在领域对象和应用服务里。

---

# 6. `OutboxEvent.java`：新增发货和完成事件

第五版新增两个事件工厂：

```java
public static OutboxEvent orderShipped(SalesOrder order) {
    return new OutboxEvent("ORDER", String.valueOf(order.getId()), "OrderShipped", orderPayload(order));
}

public static OutboxEvent orderCompleted(SalesOrder order) {
    return new OutboxEvent("ORDER", String.valueOf(order.getId()), "OrderCompleted", orderPayload(order));
}
```

它们和已有事件形成一组订单生命周期事件：

```text
OrderCreated
OrderPaid
OrderCancelled
OrderExpired
OrderShipped
OrderCompleted
```

事件 payload 仍然复用：

```java
private static String orderPayload(SalesOrder order) {
    return """
            {"orderId":%d,"customerId":"%s","status":"%s","totalAmount":%s}
            """.formatted(order.getId(), order.getCustomerId(), order.getStatus(), order.getTotalAmount()).trim();
}
```

所以发货事件里的 `status` 会是：

```text
SHIPPED
```

完成事件里的 `status` 会是：

```text
COMPLETED
```

一句话总结：Outbox 继续记录领域事件，后续接 Kafka/RabbitMQ 时可以把这些事件直接发送给物流、通知、积分等下游系统。

---

# 7. `OrderApplicationServiceTests.java`：测试正常流和非法流

第五版新增的主测试是：

```java
void paidOrderCanBeShippedAndCompletedIdempotently()
```

它覆盖：

```text
创建订单
支付订单
发货订单
重复发货
完成订单
重复完成
检查只新增一次 OrderShipped 事件
检查只新增一次 OrderCompleted 事件
```

核心断言是：

```java
assertThat(shipped.status()).isEqualTo(OrderStatus.SHIPPED);
assertThat(shipped.shippedAt()).isNotNull();
assertThat(eventsAfterShip).isEqualTo(eventsBeforeShip + 1);
assertThat(completed.status()).isEqualTo(OrderStatus.COMPLETED);
assertThat(completed.completedAt()).isNotNull();
assertThat(eventsAfterComplete).isEqualTo(eventsAfterShip + 1);
```

这说明：

```text
状态确实变化
时间戳确实写入
重复调用没有重复写事件
```

第五版还新增两个非法流测试：

```java
void createdOrderCannotBeShipped()
```

验证未支付订单不能发货：

```java
assertThatThrownBy(() -> orderApplicationService.ship(created.order().id()))
        .isInstanceOf(BusinessException.class)
        .hasMessageContaining("Only PAID orders can be shipped");
```

另一个是：

```java
void paidOrderCannotBeCompletedBeforeShipping()
```

验证已支付但未发货订单不能直接完成：

```java
assertThatThrownBy(() -> orderApplicationService.complete(created.order().id()))
        .isInstanceOf(BusinessException.class)
        .hasMessageContaining("Only SHIPPED orders can be completed");
```

一句话总结：第五版测试不仅测成功路径，还测了两个最容易写错的状态跳跃。

---

# 8. 第五版完整状态机

现在订单状态流转可以画成：

```text
                      cancel / expire
                    +------------------+
                    |                  v
CREATED --pay--> PAID --ship--> SHIPPED --complete--> COMPLETED
   |
   +-------------------------------------------------> CANCELLED
```

更准确地说：

```text
CREATED
 -> pay
 -> PAID

CREATED
 -> cancel
 -> CANCELLED

CREATED
 -> expire
 -> CANCELLED

PAID
 -> ship
 -> SHIPPED

SHIPPED
 -> complete
 -> COMPLETED
```

禁止的流转包括：

```text
CREATED -> ship
PAID -> complete
CANCELLED -> pay
PAID -> cancel
COMPLETED -> cancel
```

一句话总结：第五版让项目更像真实订单系统，因为订单不是支付完就结束，还要继续经历发货和完成。

---

# 本次讲解总结

第五版补齐的是履约流：`SalesOrder` 负责状态机规则，`OrderApplicationService` 负责事务和 Outbox 编排，`OrderController` 暴露发货/完成接口，`OrderResponse` 返回履约时间，测试覆盖成功路径、幂等路径和非法跳跃路径。至此，项目已经从“订单交易雏形”推进到“交易 + 履约状态机雏形”。
