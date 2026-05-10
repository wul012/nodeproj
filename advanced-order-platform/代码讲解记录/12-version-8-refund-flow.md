# 第八版讲解：支付后退款与库存回补

第八版重点讲解这些文件：

```text
src/main/java/com/codexdemo/orderplatform/order/OrderStatus.java
src/main/java/com/codexdemo/orderplatform/order/SalesOrder.java
src/main/java/com/codexdemo/orderplatform/order/OrderResponse.java
src/main/java/com/codexdemo/orderplatform/inventory/InventoryItem.java
src/main/java/com/codexdemo/orderplatform/inventory/InventoryService.java
src/main/java/com/codexdemo/orderplatform/payment/PaymentStatus.java
src/main/java/com/codexdemo/orderplatform/payment/PaymentTransaction.java
src/main/java/com/codexdemo/orderplatform/payment/PaymentService.java
src/main/java/com/codexdemo/orderplatform/order/OrderApplicationService.java
src/main/java/com/codexdemo/orderplatform/order/OrderController.java
src/main/java/com/codexdemo/orderplatform/outbox/OutboxEvent.java
src/test/java/com/codexdemo/orderplatform/OrderApplicationServiceTests.java
```

第八版解决的问题是：

```text
订单已经支付后，如果还没有发货，可以退款
退款后要回补库存
退款后要写支付退款流水
退款后要写订单状态历史
退款后要写 Outbox 事件
```

退款主流程是：

```text
PAID
 -> refund
 -> REFUNDED
```

第八版当前只允许：

```text
PAID 订单退款
```

不允许：

```text
CREATED 订单退款
SHIPPED 订单退款
COMPLETED 订单退款
CANCELLED 订单退款
```

---

# 1. `OrderStatus.java`：新增 REFUNDED

状态枚举新增：

```java
public enum OrderStatus {
    CREATED,
    PAID,
    SHIPPED,
    COMPLETED,
    REFUNDED,
    CANCELLED
}
```

`REFUNDED` 表示：

```text
订单曾经支付成功
后来在未发货前完成退款
库存已经回补
支付流水里有 REFUNDED 记录
```

一句话总结：`REFUNDED` 是支付后退款的终态，不再和 `CANCELLED` 混用。

---

# 2. `SalesOrder.java`：退款领域规则

第八版新增退款时间：

```java
private Instant refundedAt;
```

退款领域方法：

```java
public boolean refund() {
    if (status == OrderStatus.REFUNDED) {
        return false;
    }
    if (status != OrderStatus.PAID) {
        throw new BusinessException(HttpStatus.CONFLICT, "ORDER_STATUS_INVALID",
                "Only PAID orders can be refunded");
    }
    status = OrderStatus.REFUNDED;
    refundedAt = Instant.now();
    return true;
}
```

这段规则有三层含义：

```text
已经 REFUNDED
 -> 返回 false，不重复退款

不是 PAID
 -> 抛 ORDER_STATUS_INVALID

PAID
 -> 状态改为 REFUNDED，记录 refundedAt，返回 true
```

为什么只允许 `PAID`？

因为当前项目还没有退货物流模块。

所以第八版先实现一个清晰边界：

```text
已支付但未发货
 -> 可以退款

已发货或已完成
 -> 不能直接退款
```

一句话总结：`SalesOrder.refund()` 把退款合法性放在订单聚合根里，避免服务层随意改状态。

---

# 3. `OrderResponse.java`：返回 refundedAt

响应 DTO 新增：

```java
Instant refundedAt,
```

转换方法里也新增：

```java
order.getRefundedAt(),
```

这样调用退款接口后，响应里能看到：

```text
status = REFUNDED
refundedAt = 退款时间
```

一句话总结：`OrderResponse` 继续作为对外 API 的稳定输出，把退款时间暴露给调用方。

---

# 4. `InventoryItem.java` 和 `InventoryService.java`：回补已扣减库存

支付成功时，库存流程是：

```text
下单 reserve
 -> available 减少
 -> reserved 增加

支付 commitReserved
 -> reserved 减少
 -> available 不变
```

所以退款时要把已经确认扣减的库存加回 `available`。

实体方法：

```java
public void returnCommitted(int quantity) {
    if (quantity <= 0) {
        throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_QUANTITY", "Quantity must be greater than zero");
    }
    available += quantity;
}
```

服务方法：

```java
public void returnCommitted(Map<Long, Integer> productQuantities) {
    productQuantities.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .forEach(entry -> findLocked(entry.getKey()).returnCommitted(entry.getValue()));
}
```

这里仍然按 productId 排序，并通过：

```java
findByProductIdForUpdate
```

拿到数据库写锁。

一句话总结：`returnCommitted` 负责把已支付扣减掉的库存回补到 `available`，并保持库存操作的锁顺序。

---

# 5. `PaymentStatus.java` 和 `PaymentTransaction.java`：退款流水

支付状态新增：

```java
public enum PaymentStatus {
    SUCCEEDED,
    REFUNDED
}
```

支付成功记录仍然是：

```java
public static PaymentTransaction succeeded(Long orderId, BigDecimal amount) {
    return new PaymentTransaction(orderId, amount, PaymentStatus.SUCCEEDED, "SIMULATED", "SIM-");
}
```

第八版新增退款记录：

```java
public static PaymentTransaction refunded(Long orderId, BigDecimal amount) {
    return new PaymentTransaction(orderId, amount, PaymentStatus.REFUNDED, "SIMULATED", "REF-");
}
```

通用构造器里生成渠道交易号：

```java
this.providerTransactionId = transactionPrefix + UUID.randomUUID();
```

所以现在交易号前缀有两种：

```text
SIM-
 -> 模拟支付成功交易

REF-
 -> 模拟退款成功交易
```

一句话总结：第八版复用 `payment_transactions` 表，用 `PaymentStatus.REFUNDED` 表达退款交易。

---

# 6. `PaymentService.java`：退款交易幂等

第八版新增：

```java
public PaymentTransaction recordRefundedPayment(SalesOrder order) {
    return paymentTransactionRepository.findFirstByOrderIdAndStatusOrderByCreatedAtAscIdAsc(
                    order.getId(),
                    PaymentStatus.REFUNDED
            )
            .orElseGet(() -> paymentTransactionRepository.save(
                    PaymentTransaction.refunded(order.getId(), order.getTotalAmount())
            ));
}
```

它的逻辑和支付成功类似：

```text
先查这张订单有没有 REFUNDED 交易
有就返回已有交易
没有才创建一条退款交易
```

这样重复调用退款接口不会重复写退款流水。

一句话总结：`recordRefundedPayment` 让退款流水和支付流水一样具备幂等性。

---

# 7. `OrderApplicationService.java`：退款事务编排

退款方法：

```java
@Transactional
public OrderResponse refund(Long orderId) {
    SalesOrder order = findOrder(orderId);
    OrderStatus fromStatus = order.getStatus();
    if (order.refund()) {
        inventoryService.returnCommitted(order.quantitiesByProductId());
        paymentService.recordRefundedPayment(order);
        outboxRepository.save(OutboxEvent.orderRefunded(order));
        recordHistory(order, fromStatus, "ORDER_REFUNDED");
    }
    return OrderResponse.from(order);
}
```

这段代码把退款拆成 5 步：

```text
1. 查询订单
2. 执行订单领域状态流转
3. 回补库存
4. 写退款支付流水
5. 写 Outbox 和状态历史
```

因为方法有：

```java
@Transactional
```

所以这些动作要么都成功，要么都回滚：

```text
订单状态
库存回补
退款流水
Outbox
状态历史
```

一句话总结：`refund` 是第八版的核心用例，负责把订单、库存、支付、事件和历史串成一个事务。

---

# 8. `OrderController.java`：退款 HTTP 接口

新增接口：

```java
@PostMapping("/{orderId}/refund")
public ResponseEntity<OrderResponse> refund(@PathVariable Long orderId) {
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(orderApplicationService.refund(orderId));
}
```

调用方式：

```powershell
Invoke-RestMethod -Method Post http://localhost:8080/api/v1/orders/1/refund
```

成功返回：

```text
202 Accepted
status = REFUNDED
refundedAt != null
```

非法状态返回：

```text
409 ORDER_STATUS_INVALID
```

一句话总结：Controller 只暴露薄接口，退款规则仍然由 `SalesOrder` 和 `OrderApplicationService` 负责。

---

# 9. `OutboxEvent.java`：退款事件

新增事件工厂：

```java
public static OutboxEvent orderRefunded(SalesOrder order) {
    return new OutboxEvent("ORDER", String.valueOf(order.getId()), "OrderRefunded", orderPayload(order));
}
```

退款成功后应用服务调用：

```java
outboxRepository.save(OutboxEvent.orderRefunded(order));
```

这样后续接消息系统时，下游可以感知：

```text
某张订单退款了
```

一句话总结：`OrderRefunded` 让退款动作也进入事件驱动链路。

---

# 10. `OrderApplicationServiceTests.java`：退款测试

第八版新增主测试：

```java
void paidOrderCanBeRefundedAndRestocksInventoryIdempotently()
```

它覆盖：

```text
创建订单
支付订单
退款订单
重复退款
库存回补
支付流水新增 REFUNDED
退款流水幂等
状态历史新增 ORDER_REFUNDED
Outbox 新增 OrderRefunded
```

关键断言：

```java
assertThat(refunded.status()).isEqualTo(OrderStatus.REFUNDED);
assertThat(refunded.refundedAt()).isNotNull();
assertThat(afterRefund.getAvailable()).isEqualTo(before.getAvailable());
assertThat(payments.stream().map(PaymentTransactionResponse::status).toList())
        .containsExactly(PaymentStatus.SUCCEEDED, PaymentStatus.REFUNDED);
```

重复退款幂等断言：

```java
assertThat(paymentTransactionRepository.countByOrderIdAndStatus(
        created.order().id(),
        PaymentStatus.REFUNDED
)).isEqualTo(1);
```

非法流测试：

```java
void shippedOrderCannotBeRefunded()
```

它验证：

```text
PAID -> SHIPPED 后不能直接退款
不会写 REFUNDED 支付流水
```

一句话总结：第八版测试同时覆盖成功退款、重复退款和已发货禁止退款三个关键风险点。

---

# 11. 第八版完整业务关系

支付成功时：

```text
orders
 -> status = PAID

inventory_items
 -> reserved 扣减确认

payment_transactions
 -> SUCCEEDED

order_status_history
 -> ORDER_PAID

outbox_events
 -> OrderPaid
```

退款成功时：

```text
orders
 -> status = REFUNDED

inventory_items
 -> available 回补

payment_transactions
 -> REFUNDED

order_status_history
 -> ORDER_REFUNDED

outbox_events
 -> OrderRefunded
```

一句话总结：第八版让项目从“支付有交易凭证”继续升级到“退款也有完整业务闭环”。

---

# 本次讲解总结

第八版新增支付后退款能力：`SalesOrder.refund` 守住状态规则，`InventoryService.returnCommitted` 回补已扣减库存，`PaymentService.recordRefundedPayment` 写退款交易流水，`OrderApplicationService.refund` 把订单、库存、支付、Outbox 和状态历史放在同一个事务中，`OrderController` 暴露 `/refund` 接口，测试覆盖成功退款、重复退款和已发货禁止退款。
