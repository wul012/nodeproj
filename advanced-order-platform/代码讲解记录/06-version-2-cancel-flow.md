# 第六次讲解：第二版订单取消和库存释放

第二版重点新增这些能力：

```text
订单取消接口
 -> POST /api/v1/orders/{orderId}/cancel

库存释放
 -> reserved 减少
 -> available 增加

订单取消事件
 -> OrderCancelled

测试补强
 -> 取消释放库存
 -> 取消操作幂等
 -> 已支付订单不能取消
 -> 已取消订单不能支付
```

涉及文件：

```text
src/main/java/com/codexdemo/orderplatform/inventory/InventoryItem.java
src/main/java/com/codexdemo/orderplatform/inventory/InventoryService.java
src/main/java/com/codexdemo/orderplatform/order/SalesOrder.java
src/main/java/com/codexdemo/orderplatform/order/OrderResponse.java
src/main/java/com/codexdemo/orderplatform/order/OrderApplicationService.java
src/main/java/com/codexdemo/orderplatform/order/OrderController.java
src/main/java/com/codexdemo/orderplatform/outbox/OutboxEvent.java
src/test/java/com/codexdemo/orderplatform/OrderApplicationServiceTests.java
```

---

# 1. 第二版为什么先做取消

第一版已经能：

```text
创建订单
 -> 预占库存
 -> 支付订单
 -> 确认扣减 reserved 库存
```

但真实订单系统还有一个很重要的反向流程：

```text
订单创建后没有支付
 -> 用户取消或超时取消
 -> 释放 previously reserved 库存
```

如果只预占库存，不释放库存，就会出现：

```text
用户下单后不支付
库存一直卡在 reserved
其他用户买不到
```

所以第二版补上取消链路。

一句话总结：取消订单是库存闭环里不可缺的一半。

---

# 2. `InventoryItem.releaseReserved`：释放预占库存

新增方法：

```java
public void releaseReserved(int quantity) {
    if (quantity <= 0) {
        throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_QUANTITY", "Quantity must be greater than zero");
    }
    if (reserved < quantity) {
        throw new BusinessException(HttpStatus.CONFLICT, "RESERVATION_MISMATCH",
                "Product " + productId + " reservation is lower than requested release quantity");
    }
    reserved -= quantity;
    available += quantity;
}
```

它和支付时的 `commitReserved` 很像，但方向不同。

支付确认：

```text
reserved -= quantity
available 不变
```

取消释放：

```text
reserved -= quantity
available += quantity
```

因为取消不是卖出，而是把之前占住的库存还回去。

一句话总结：`releaseReserved` 把取消订单时被锁住的库存重新放回可售库存。

---

# 3. `InventoryService.releaseReserved`：锁库存后释放

新增方法：

```java
public void releaseReserved(Map<Long, Integer> productQuantities) {
    productQuantities.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .forEach(entry -> findLocked(entry.getKey()).releaseReserved(entry.getValue()));
}
```

它仍然按商品 ID 排序，再逐个加锁：

```text
按 productId 排序
 -> findByProductIdForUpdate
 -> releaseReserved
```

和第一版预占库存、确认扣减一样，取消释放也必须走锁。

原因是多个流程可能同时操作库存：

```text
支付
取消
后台超时关闭
人工运营操作
```

一句话总结：库存释放也必须通过 `InventoryService`，保持库存变更入口统一。

---

# 4. `SalesOrder.cancel`：订单状态流转

第二版订单实体新增：

```java
private Instant canceledAt;
```

用于记录取消时间。

新增取消方法：

```java
public boolean cancel() {
    if (status == OrderStatus.CANCELLED) {
        return false;
    }
    if (status != OrderStatus.CREATED) {
        throw new BusinessException(HttpStatus.CONFLICT, "ORDER_STATUS_INVALID",
                "Only CREATED orders can be cancelled");
    }
    status = OrderStatus.CANCELLED;
    canceledAt = Instant.now();
    return true;
}
```

这里有三种情况：

```text
已经 CANCELLED
 -> 返回 false，不重复释放库存，也不重复写事件

不是 CREATED
 -> 抛出 ORDER_STATUS_INVALID

CREATED
 -> 改成 CANCELLED，记录 canceledAt，返回 true
```

为什么返回 boolean？

因为应用服务需要知道：

```text
这次是真的刚刚取消
还是重复调用取消接口
```

只有真正刚刚取消时，才需要：

```text
释放库存
写 OrderCancelled 事件
```

一句话总结：`SalesOrder.cancel` 把取消状态规则收在订单实体内部。

---

# 5. `OrderApplicationService.cancel`：取消用例编排

新增应用服务方法：

```java
@Transactional
public OrderResponse cancel(Long orderId) {
    SalesOrder order = findOrder(orderId);
    if (order.cancel()) {
        inventoryService.releaseReserved(order.quantitiesByProductId());
        outboxRepository.save(OutboxEvent.orderCancelled(order));
    }
    return OrderResponse.from(order);
}
```

完整流程是：

```text
查询订单
 -> 调用 order.cancel()
 -> 如果返回 true，说明刚刚取消
 -> 释放 reserved 库存
 -> 写 OrderCancelled 事件
 -> 返回订单响应
```

`@Transactional` 很重要。

如果释放库存失败或保存事件失败：

```text
订单状态变更会回滚
库存释放会回滚
Outbox 事件也会回滚
```

一句话总结：`cancel` 用例把订单状态、库存释放和取消事件放在同一个事务里。

---

# 6. 支付流程的小调整

第二版把支付里的顺序调整为：

```java
order.markPaid();
inventoryService.commitReserved(order.quantitiesByProductId());
outboxRepository.save(OutboxEvent.orderPaid(order));
```

这样做是为了让已取消订单支付时先触发状态错误。

如果订单已经 `CANCELLED`：

```text
order.markPaid()
 -> 抛出 Only CREATED orders can be paid
 -> 不会误进入库存 commitReserved
```

一句话总结：先检查订单状态，再确认库存，可以让错误语义更准确。

---

# 7. `OrderController.cancel`：取消 API

新增接口：

```java
@PostMapping("/{orderId}/cancel")
public ResponseEntity<OrderResponse> cancel(@PathVariable Long orderId) {
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(orderApplicationService.cancel(orderId));
}
```

调用方式：

```powershell
Invoke-RestMethod -Method Post http://localhost:8080/api/v1/orders/1/cancel
```

返回订单状态应该是：

```text
CANCELLED
```

一句话总结：取消能力通过 `/api/v1/orders/{orderId}/cancel` 暴露给外部调用。

---

# 8. `OutboxEvent.orderCancelled`：取消事件

新增方法：

```java
public static OutboxEvent orderCancelled(SalesOrder order) {
    return new OutboxEvent("ORDER", String.valueOf(order.getId()), "OrderCancelled", orderPayload(order));
}
```

现在订单会产生三种事件：

```text
OrderCreated
OrderPaid
OrderCancelled
```

后续如果接 Kafka / RabbitMQ，库存服务、通知服务、数据分析服务都可以订阅这些事件。

一句话总结：`OrderCancelled` 让取消动作也进入事件驱动链路。

---

# 9. 第二版测试补强

第二版测试从 3 个增加到 6 个。

新增测试一：

```text
cancelOrderReleasesReservedInventoryAndIsIdempotent
```

验证：

```text
创建订单后 available 减少、reserved 增加
取消订单后 available 恢复、reserved 恢复
重复取消不会再次改变库存
```

新增测试二：

```text
paidOrderCannotBeCancelled
```

验证：

```text
已支付订单不能取消
```

新增测试三：

```text
cancelledOrderCannotBePaid
```

验证：

```text
已取消订单不能支付
```

一句话总结：第二版测试开始覆盖订单状态机的非法流转。

---

# 本次讲解总结

第六次讲解的是第二版取消链路：订单从 `CREATED` 变为 `CANCELLED`，库存从 `reserved` 释放回 `available`，系统记录 `OrderCancelled` 事件，并用测试守住取消、支付之间的状态边界。
