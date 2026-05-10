# 第七版讲解：支付交易流水

第七版重点讲解这些文件：

```text
src/main/java/com/codexdemo/orderplatform/payment/PaymentStatus.java
src/main/java/com/codexdemo/orderplatform/payment/PaymentTransaction.java
src/main/java/com/codexdemo/orderplatform/payment/PaymentTransactionRepository.java
src/main/java/com/codexdemo/orderplatform/payment/PaymentTransactionResponse.java
src/main/java/com/codexdemo/orderplatform/payment/PaymentService.java
src/main/java/com/codexdemo/orderplatform/order/OrderApplicationService.java
src/main/java/com/codexdemo/orderplatform/order/OrderController.java
src/test/java/com/codexdemo/orderplatform/OrderApplicationServiceTests.java
```

第七版解决的问题是：

```text
前面版本里，支付只体现为订单状态从 CREATED 变成 PAID
第七版把支付动作沉淀为一条可查询的支付交易流水
```

也就是说，订单支付后不仅能看到：

```text
order.status = PAID
```

还能看到：

```text
payment_transactions
 -> orderId
 -> amount
 -> status
 -> provider
 -> providerTransactionId
 -> createdAt
 -> completedAt
```

---

# 1. 为什么要有支付交易流水

只靠订单状态有一个问题：

```text
订单是 PAID
 -> 但不知道支付金额是多少
 -> 不知道支付渠道是什么
 -> 不知道支付交易号是什么
 -> 不知道重复支付有没有生成多条交易
```

支付交易流水解决这些问题。

第七版当前还是模拟支付，不接真实支付网关，但表结构和代码边界已经预留出来：

```text
provider = SIMULATED
providerTransactionId = SIM-随机 UUID
status = SUCCEEDED
```

一句话总结：支付交易流水让“支付成功”从一个订单状态，变成一条独立、可查询、可审计的交易记录。

---

# 2. `PaymentStatus.java`：支付状态

当前状态枚举很简单：

```java
public enum PaymentStatus {
    SUCCEEDED
}
```

为什么现在只有 `SUCCEEDED`？

因为当前项目的支付接口仍然是：

```text
POST /api/v1/orders/{orderId}/pay
```

它表示模拟支付成功。

后续可以扩展：

```text
PENDING
FAILED
REFUNDED
```

一句话总结：`PaymentStatus` 现在先服务成功支付流水，后面可以继续扩展真实支付网关状态。

---

# 3. `PaymentTransaction.java`：支付交易实体

实体定义：

```java
@Entity
@Table(
        name = "payment_transactions",
        indexes = @Index(name = "idx_payment_transactions_order_created", columnList = "order_id, created_at")
)
public class PaymentTransaction {
```

这里新增一张表：

```text
payment_transactions
```

索引是：

```text
order_id, created_at
```

因为最常见查询是：

```text
按订单查支付流水
按创建时间排序
```

核心字段：

```java
@Column(name = "order_id", nullable = false)
private Long orderId;

@Column(nullable = false, precision = 12, scale = 2)
private BigDecimal amount;

@Enumerated(EnumType.STRING)
@Column(nullable = false, length = 32)
private PaymentStatus status;

@Column(nullable = false, length = 40)
private String provider;

@Column(name = "provider_transaction_id", nullable = false, unique = true, length = 80)
private String providerTransactionId;

@Column(nullable = false)
private Instant createdAt;

private Instant completedAt;
```

字段含义：

```text
orderId
 -> 属于哪张订单

amount
 -> 支付金额，等于订单总金额

status
 -> 支付状态，当前为 SUCCEEDED

provider
 -> 支付渠道，当前为 SIMULATED

providerTransactionId
 -> 渠道交易号，当前用 SIM-UUID 模拟

createdAt
 -> 交易创建时间

completedAt
 -> 交易完成时间
```

创建成功支付交易：

```java
public static PaymentTransaction succeeded(Long orderId, BigDecimal amount) {
    return new PaymentTransaction(orderId, amount, "SIMULATED");
}
```

构造器里生成交易号：

```java
this.providerTransactionId = "SIM-" + UUID.randomUUID();
this.createdAt = Instant.now();
this.completedAt = this.createdAt;
```

为什么 `providerTransactionId` 要唯一？

因为真实支付渠道的交易号通常必须唯一。

第七版虽然是模拟支付，也先把这个约束建起来：

```java
@Column(name = "provider_transaction_id", nullable = false, unique = true, length = 80)
```

一句话总结：`PaymentTransaction` 是支付流水表实体，保存一次支付成功的金额、渠道、交易号和完成时间。

---

# 4. `PaymentTransactionRepository.java`：支付流水查询

仓库接口：

```java
public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {

    List<PaymentTransaction> findByOrderIdOrderByCreatedAtAscIdAsc(Long orderId);

    long countByOrderIdAndStatus(Long orderId, PaymentStatus status);

    Optional<PaymentTransaction> findFirstByOrderIdAndStatusOrderByCreatedAtAscIdAsc(
            Long orderId,
            PaymentStatus status
    );
}
```

三个方法分别服务不同场景。

查询订单支付流水：

```java
findByOrderIdOrderByCreatedAtAscIdAsc
```

用于接口：

```text
GET /api/v1/orders/{orderId}/payments
```

统计某状态支付数量：

```java
countByOrderIdAndStatus
```

用于测试确认重复支付不会插入多条 `SUCCEEDED`。

查找已有成功支付：

```java
findFirstByOrderIdAndStatusOrderByCreatedAtAscIdAsc
```

用于支付幂等：

```text
如果这张订单已经有成功支付交易
 -> 返回已有交易
 -> 不再插入新交易
```

一句话总结：Repository 同时支持流水查询、测试计数和支付成功幂等检查。

---

# 5. `PaymentTransactionResponse.java`：支付流水响应

响应 DTO：

```java
public record PaymentTransactionResponse(
        Long id,
        Long orderId,
        BigDecimal amount,
        PaymentStatus status,
        String provider,
        String providerTransactionId,
        Instant createdAt,
        Instant completedAt
) {
```

转换方法：

```java
public static PaymentTransactionResponse from(PaymentTransaction transaction) {
    return new PaymentTransactionResponse(
            transaction.getId(),
            transaction.getOrderId(),
            transaction.getAmount(),
            transaction.getStatus(),
            transaction.getProvider(),
            transaction.getProviderTransactionId(),
            transaction.getCreatedAt(),
            transaction.getCompletedAt()
    );
}
```

为什么需要 DTO？

```text
不直接暴露 JPA Entity
控制 API 返回字段
后续可以隐藏内部字段或增加展示字段
```

一句话总结：`PaymentTransactionResponse` 是支付交易实体和 HTTP JSON 响应之间的隔离层。

---

# 6. `PaymentService.java`：支付流水领域服务

服务类：

```java
@Service
public class PaymentService {

    private final PaymentTransactionRepository paymentTransactionRepository;
```

记录成功支付：

```java
public PaymentTransaction recordSucceededPayment(SalesOrder order) {
    return paymentTransactionRepository.findFirstByOrderIdAndStatusOrderByCreatedAtAscIdAsc(
                    order.getId(),
                    PaymentStatus.SUCCEEDED
            )
            .orElseGet(() -> paymentTransactionRepository.save(
                    PaymentTransaction.succeeded(order.getId(), order.getTotalAmount())
            ));
}
```

这段代码的关键是：

```text
先查有没有 SUCCEEDED 支付交易
有就直接返回
没有才创建新交易
```

这让支付流水具备幂等性。

查询支付流水：

```java
public List<PaymentTransaction> listOrderPayments(Long orderId) {
    return paymentTransactionRepository.findByOrderIdOrderByCreatedAtAscIdAsc(orderId);
}
```

一句话总结：`PaymentService` 负责支付交易流水的创建和查询，避免订单应用服务直接操作支付表细节。

---

# 7. `OrderApplicationService.java`：支付时写交易流水

第七版给订单应用服务新增依赖：

```java
private final PaymentService paymentService;
```

构造器注入：

```java
public OrderApplicationService(
        OrderRepository orderRepository,
        ProductRepository productRepository,
        InventoryService inventoryService,
        OutboxRepository outboxRepository,
        OrderStatusHistoryRepository orderStatusHistoryRepository,
        PaymentService paymentService
) {
```

支付方法变成：

```java
@Transactional
public OrderResponse pay(Long orderId) {
    SalesOrder order = findOrder(orderId);
    OrderStatus fromStatus = order.getStatus();
    if (fromStatus == OrderStatus.PAID) {
        return OrderResponse.from(order);
    }

    order.markPaid();
    inventoryService.commitReserved(order.quantitiesByProductId());
    paymentService.recordSucceededPayment(order);
    outboxRepository.save(OutboxEvent.orderPaid(order));
    recordHistory(order, fromStatus, "ORDER_PAID");
    return OrderResponse.from(order);
}
```

现在支付成功后的事务内动作是：

```text
1. 订单状态 CREATED -> PAID
2. reserved 库存确认扣减
3. 写 payment_transactions 支付流水
4. 写 OrderPaid Outbox 事件
5. 写 ORDER_PAID 状态历史
```

因为 `pay` 有：

```java
@Transactional
```

所以如果中间任何一步失败：

```text
订单状态
库存扣减
支付流水
Outbox
状态历史
```

都会一起回滚。

一句话总结：第七版把支付交易流水纳入支付事务，保证订单支付、库存扣减、事件和历史保持一致。

---

# 8. `getOrderPayments`：查询订单支付流水

应用服务新增：

```java
@Transactional(readOnly = true)
public List<PaymentTransactionResponse> getOrderPayments(Long orderId) {
    findOrder(orderId);
    return paymentService.listOrderPayments(orderId).stream()
            .map(PaymentTransactionResponse::from)
            .toList();
}
```

第一步仍然是：

```java
findOrder(orderId);
```

目的和历史查询一样：

```text
订单不存在
 -> 404 ORDER_NOT_FOUND
```

订单存在但没有支付：

```text
返回空列表
```

一句话总结：支付流水查询以订单存在为前提，返回该订单已有的支付交易记录。

---

# 9. `OrderController.java`：新增支付流水接口

HTTP 入口：

```java
@GetMapping("/{orderId}/payments")
public List<PaymentTransactionResponse> getOrderPayments(@PathVariable Long orderId) {
    return orderApplicationService.getOrderPayments(orderId);
}
```

调用方式：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/orders/1/payments
```

返回示例：

```json
[
  {
    "id": 1,
    "orderId": 1,
    "amount": 6999.00,
    "status": "SUCCEEDED",
    "provider": "SIMULATED",
    "providerTransactionId": "SIM-86d9f0b0-f66b-4f1d-9a20-1bf93f0e4f8d",
    "createdAt": "2026-05-10T03:50:00Z",
    "completedAt": "2026-05-10T03:50:00Z"
  }
]
```

一句话总结：`/payments` 接口让调试者可以直接看到订单对应的支付交易记录。

---

# 10. `OrderApplicationServiceTests.java`：测试支付流水

第七版新增测试：

```java
void payOrderCreatesSingleSucceededPaymentTransaction()
```

它做了这些事：

```text
创建订单
支付订单
重复支付同一订单
查询支付流水
确认只有一条 SUCCEEDED 交易
```

核心断言：

```java
assertThat(payments).hasSize(1);
PaymentTransactionResponse payment = payments.getFirst();
assertThat(payment.orderId()).isEqualTo(created.order().id());
assertThat(payment.amount()).isEqualByComparingTo(paid.totalAmount());
assertThat(payment.status()).isEqualTo(PaymentStatus.SUCCEEDED);
assertThat(payment.provider()).isEqualTo("SIMULATED");
assertThat(payment.providerTransactionId()).startsWith("SIM-");
```

再用 Repository 计数确认幂等：

```java
assertThat(paymentTransactionRepository.countByOrderIdAndStatus(
        created.order().id(),
        PaymentStatus.SUCCEEDED
)).isEqualTo(1);
```

第七版也增强了取消订单测试：

```java
assertThat(orderApplicationService.getOrderPayments(created.order().id())).isEmpty();
```

这表示：

```text
取消订单不能支付
不能产生支付流水
```

一句话总结：第七版测试覆盖了支付流水创建、金额一致、交易号生成、重复支付不重复写流水，以及非法支付不写流水。

---

# 11. 支付流水、状态历史和 Outbox 的区别

到第七版，项目里有三种“记录”：

```text
payment_transactions
order_status_history
outbox_events
```

它们职责不同。

支付流水：

```text
记录支付这件事本身
关心金额、渠道、交易号、支付状态
```

状态历史：

```text
记录订单状态怎么变
关心 fromStatus、toStatus、action、changedAt
```

Outbox：

```text
记录准备发布给外部系统的领域事件
关心 eventType、payload、publishedAt
```

同一次支付成功会写三种记录：

```text
payment_transactions
 -> SUCCEEDED 支付交易

order_status_history
 -> ORDER_PAID, CREATED -> PAID

outbox_events
 -> OrderPaid
```

一句话总结：三张表看起来都在“记事”，但分别服务支付审计、订单审计和事件发布。

---

# 本次讲解总结

第七版新增了支付交易流水：`PaymentTransaction` 保存支付交易，`PaymentService` 保证成功支付幂等创建，`OrderApplicationService.pay` 在同一事务内写支付流水、扣库存、写 Outbox 和状态历史，`OrderController` 暴露 `/payments` 查询接口，测试验证支付金额、状态、交易号和重复支付不重复写流水。至此，项目从“订单已支付”升级到“订单支付有交易凭证”。
