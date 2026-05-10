# 第六版讲解：订单状态历史与操作流水

第六版重点讲解这些文件：

```text
src/main/java/com/codexdemo/orderplatform/order/OrderStatusHistory.java
src/main/java/com/codexdemo/orderplatform/order/OrderStatusHistoryRepository.java
src/main/java/com/codexdemo/orderplatform/order/OrderStatusHistoryResponse.java
src/main/java/com/codexdemo/orderplatform/order/OrderApplicationService.java
src/main/java/com/codexdemo/orderplatform/order/OrderController.java
src/test/java/com/codexdemo/orderplatform/OrderApplicationServiceTests.java
```

第五版已经有完整履约状态机：

```text
CREATED -> PAID -> SHIPPED -> COMPLETED
CREATED -> CANCELLED
CREATED -> EXPIRED(CANCELLED)
```

第六版解决的问题是：

```text
订单当前状态只能告诉你“现在是什么”
状态历史能告诉你“它怎么一步步变成现在这样”
```

所以第六版新增一张内部审计表：

```text
order_status_history
```

它记录每次真实状态变化：

```text
orderId
fromStatus
toStatus
action
changedAt
```

---

# 1. `OrderStatusHistory.java`：状态历史实体

实体定义：

```java
@Entity
@Table(
        name = "order_status_history",
        indexes = @Index(name = "idx_order_status_history_order_changed", columnList = "order_id, changed_at")
)
public class OrderStatusHistory {
```

这里单独建表，而不是把历史塞进 `orders` 表。

原因是：

```text
orders
 -> 保存订单当前状态

order_status_history
 -> 保存订单状态变化过程
```

核心字段：

```java
@Column(name = "order_id", nullable = false)
private Long orderId;

@Enumerated(EnumType.STRING)
@Column(name = "from_status", length = 32)
private OrderStatus fromStatus;

@Enumerated(EnumType.STRING)
@Column(name = "to_status", nullable = false, length = 32)
private OrderStatus toStatus;

@Column(nullable = false, length = 80)
private String action;

@Column(name = "changed_at", nullable = false)
private Instant changedAt;
```

字段含义：

```text
orderId
 -> 哪张订单的历史

fromStatus
 -> 变化前状态，订单创建时为 null

toStatus
 -> 变化后状态

action
 -> 触发动作，比如 ORDER_PAID、ORDER_SHIPPED

changedAt
 -> 变化发生时间
```

创建历史记录的方法：

```java
public static OrderStatusHistory record(
        Long orderId,
        OrderStatus fromStatus,
        OrderStatus toStatus,
        String action
) {
    return new OrderStatusHistory(orderId, fromStatus, toStatus, action);
}
```

构造方法里做了基础保护：

```java
if (orderId == null) {
    throw new IllegalArgumentException("orderId is required");
}
if (toStatus == null) {
    throw new IllegalArgumentException("toStatus is required");
}
if (action == null || action.isBlank()) {
    throw new IllegalArgumentException("action is required");
}
```

这说明：

```text
历史必须属于某张订单
历史必须有目标状态
历史必须有触发动作
```

一句话总结：`OrderStatusHistory` 是订单状态机的审计日志，每条记录代表一次真实状态变化。

---

# 2. `OrderStatusHistoryRepository.java`：按订单查询时间线

仓库接口：

```java
public interface OrderStatusHistoryRepository extends JpaRepository<OrderStatusHistory, Long> {

    List<OrderStatusHistory> findByOrderIdOrderByChangedAtAscIdAsc(Long orderId);
}
```

方法名含义：

```text
findByOrderId
 -> 只查某张订单的历史

OrderByChangedAtAsc
 -> 按变化时间从早到晚排序

IdAsc
 -> 如果时间相同，再按 id 从小到大排序
```

为什么要追加 `IdAsc`？

因为同一个事务里可能快速写入多条记录，`changedAt` 非常接近。

追加 `id` 排序后，时间线更稳定：

```text
ORDER_CREATED
ORDER_PAID
ORDER_SHIPPED
ORDER_COMPLETED
```

一句话总结：`OrderStatusHistoryRepository` 提供“按订单 ID 查询完整状态时间线”的数据库访问能力。

---

# 3. `OrderStatusHistoryResponse.java`：对外响应 DTO

响应对象：

```java
public record OrderStatusHistoryResponse(
        Long id,
        Long orderId,
        OrderStatus fromStatus,
        OrderStatus toStatus,
        String action,
        Instant changedAt
) {
```

转换方法：

```java
static OrderStatusHistoryResponse from(OrderStatusHistory history) {
    return new OrderStatusHistoryResponse(
            history.getId(),
            history.getOrderId(),
            history.getFromStatus(),
            history.getToStatus(),
            history.getAction(),
            history.getChangedAt()
    );
}
```

为什么不直接返回实体？

```text
避免直接暴露 JPA Entity
让 API 返回结构稳定
以后可以在 DTO 上增加展示字段，不影响内部表结构
```

一句话总结：`OrderStatusHistoryResponse` 是历史表和 HTTP JSON 之间的隔离层。

---

# 4. `OrderApplicationService.java`：在状态变化后写历史

第六版给应用服务新增依赖：

```java
private final OrderStatusHistoryRepository orderStatusHistoryRepository;
```

构造器注入：

```java
public OrderApplicationService(
        OrderRepository orderRepository,
        ProductRepository productRepository,
        InventoryService inventoryService,
        OutboxRepository outboxRepository,
        OrderStatusHistoryRepository orderStatusHistoryRepository
) {
```

统一写历史的方法：

```java
private void recordHistory(SalesOrder order, OrderStatus fromStatus, String action) {
    orderStatusHistoryRepository.save(
            OrderStatusHistory.record(order.getId(), fromStatus, order.getStatus(), action)
    );
}
```

这个方法只接收：

```text
order
 -> 从订单里取 orderId 和当前状态

fromStatus
 -> 调用领域方法前的状态

action
 -> 本次触发动作
```

变化后的状态不单独传入，而是从：

```java
order.getStatus()
```

读取。

这样能避免调用方传错 `toStatus`。

一句话总结：`recordHistory` 把“写历史”变成统一动作，避免每个业务方法重复组装历史对象。

---

# 5. 创建订单历史：`ORDER_CREATED`

创建订单时，代码最后是：

```java
SalesOrder order = SalesOrder.place(request.customerId(), idempotencyKey, drafts);
SalesOrder saved = orderRepository.saveAndFlush(order);
outboxRepository.save(OutboxEvent.orderCreated(saved));
recordHistory(saved, null, "ORDER_CREATED");
return new CreateOrderResult(OrderResponse.from(saved), false);
```

这里 `fromStatus` 是：

```java
null
```

因为订单创建前没有旧状态。

历史记录是：

```text
fromStatus = null
toStatus = CREATED
action = ORDER_CREATED
```

一句话总结：创建订单是状态历史的第一条记录，它表示订单从“无”进入 `CREATED`。

---

# 6. 支付历史：`ORDER_PAID`

支付方法先保存变化前状态：

```java
OrderStatus fromStatus = order.getStatus();
if (fromStatus == OrderStatus.PAID) {
    return OrderResponse.from(order);
}
```

然后执行状态变化、库存确认和事件写入：

```java
order.markPaid();
inventoryService.commitReserved(order.quantitiesByProductId());
outboxRepository.save(OutboxEvent.orderPaid(order));
recordHistory(order, fromStatus, "ORDER_PAID");
```

成功后历史记录是：

```text
fromStatus = CREATED
toStatus = PAID
action = ORDER_PAID
```

为什么已经 `PAID` 时直接返回？

```text
这是支付接口的幂等处理
重复支付不应该重复写历史
```

一句话总结：支付历史只在订单真的从 `CREATED` 变成 `PAID` 时写入。

---

# 7. 取消、过期、发货、完成历史

取消订单：

```java
OrderStatus fromStatus = order.getStatus();
if (order.cancel()) {
    inventoryService.releaseReserved(order.quantitiesByProductId());
    outboxRepository.save(OutboxEvent.orderCancelled(order));
    recordHistory(order, fromStatus, "ORDER_CANCELLED");
}
```

过期订单：

```java
OrderStatus fromStatus = order.getStatus();
if (order.expire(expiredAt)) {
    inventoryService.releaseReserved(order.quantitiesByProductId());
    outboxRepository.save(OutboxEvent.orderExpired(order));
    recordHistory(order, fromStatus, "ORDER_EXPIRED");
    expired++;
}
```

发货订单：

```java
OrderStatus fromStatus = order.getStatus();
if (order.ship()) {
    outboxRepository.save(OutboxEvent.orderShipped(order));
    recordHistory(order, fromStatus, "ORDER_SHIPPED");
}
```

完成订单：

```java
OrderStatus fromStatus = order.getStatus();
if (order.complete()) {
    outboxRepository.save(OutboxEvent.orderCompleted(order));
    recordHistory(order, fromStatus, "ORDER_COMPLETED");
}
```

共同点是：

```text
先拿 fromStatus
再调用 SalesOrder 的领域方法
只有领域方法返回 true，才写 Outbox 和状态历史
```

这样重复取消、重复发货、重复完成不会产生重复历史。

一句话总结：状态历史严格跟随真实状态变化，而不是跟随接口调用次数。

---

# 8. `getOrderHistory`：查询订单历史

应用服务新增查询方法：

```java
@Transactional(readOnly = true)
public List<OrderStatusHistoryResponse> getOrderHistory(Long orderId) {
    findOrder(orderId);
    return orderStatusHistoryRepository.findByOrderIdOrderByChangedAtAscIdAsc(orderId).stream()
            .map(OrderStatusHistoryResponse::from)
            .toList();
}
```

第一行：

```java
findOrder(orderId);
```

不是为了使用返回值，而是为了确认订单存在。

如果订单不存在，就沿用原来的业务错误：

```text
404 ORDER_NOT_FOUND
```

后面的查询：

```java
findByOrderIdOrderByChangedAtAscIdAsc(orderId)
```

返回从早到晚排列的时间线。

一句话总结：历史查询先保证订单存在，再返回按时间排序的状态流水。

---

# 9. `OrderController.java`：新增历史查询接口

HTTP 入口：

```java
@GetMapping("/{orderId}/history")
public List<OrderStatusHistoryResponse> getOrderHistory(@PathVariable Long orderId) {
    return orderApplicationService.getOrderHistory(orderId);
}
```

调用方式：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/orders/1/history
```

返回示例：

```json
[
  {
    "id": 1,
    "orderId": 1,
    "fromStatus": null,
    "toStatus": "CREATED",
    "action": "ORDER_CREATED",
    "changedAt": "2026-05-10T03:30:00Z"
  },
  {
    "id": 2,
    "orderId": 1,
    "fromStatus": "CREATED",
    "toStatus": "PAID",
    "action": "ORDER_PAID",
    "changedAt": "2026-05-10T03:30:01Z"
  }
]
```

一句话总结：`/history` 接口让运行调试时不用只看当前状态，还能看订单一路怎么走过来的。

---

# 10. `OrderApplicationServiceTests.java`：测试状态时间线

第六版新增第一个测试：

```java
void orderHistoryTracksFulfillmentTimeline()
```

它执行完整履约流程：

```text
create
pay
ship
complete
```

核心断言：

```java
assertThat(history.stream().map(OrderStatusHistoryResponse::action).toList())
        .containsExactly("ORDER_CREATED", "ORDER_PAID", "ORDER_SHIPPED", "ORDER_COMPLETED");
```

再断言来源状态：

```java
assertThat(history.stream().map(OrderStatusHistoryResponse::fromStatus).toList())
        .containsExactly(null, OrderStatus.CREATED, OrderStatus.PAID, OrderStatus.SHIPPED);
```

再断言目标状态：

```java
assertThat(history.stream().map(OrderStatusHistoryResponse::toStatus).toList())
        .containsExactly(OrderStatus.CREATED, OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.COMPLETED);
```

第二个测试：

```java
void orderHistoryTracksCancelAndExpirationActions()
```

验证手动取消：

```text
ORDER_CREATED
ORDER_CANCELLED
```

也验证自动过期：

```text
ORDER_CREATED
ORDER_EXPIRED
```

一句话总结：第六版测试不仅验证“有历史”，还验证历史顺序、动作名称和状态前后关系都正确。

---

# 11. Outbox 和状态历史的区别

第六版以后，项目里有两种“记录变化”的表：

```text
outbox_events
order_status_history
```

它们不是重复设计。

Outbox 的目标是：

```text
把领域事件可靠地交给后续消息系统
```

比如：

```text
OrderPaid
 -> 以后可以通知支付服务、积分服务、消息服务
```

状态历史的目标是：

```text
给系统内部查询、审计、排查问题
```

比如：

```text
用户说订单没发货
 -> 查 /api/v1/orders/{id}/history
 -> 看是否真的进入 SHIPPED
```

一句话总结：Outbox 面向外部事件发布，状态历史面向内部审计查询。

---

# 本次讲解总结

第六版新增了订单状态历史能力：`OrderStatusHistory` 负责保存流水，`OrderStatusHistoryRepository` 负责按订单查询，`OrderApplicationService` 在每次真实状态变化后调用 `recordHistory`，`OrderController` 暴露 `/history` 查询接口，测试覆盖了完整履约、手动取消和自动过期三类时间线。至此，项目不仅能处理订单状态，还能解释订单状态是怎么一步步变化来的。
