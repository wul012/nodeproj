# 第三次讲解：订单领域模型和 HTTP API

第三次重点讲解这些文件：

```text
src/main/java/com/codexdemo/orderplatform/order/OrderStatus.java
src/main/java/com/codexdemo/orderplatform/order/SalesOrder.java
src/main/java/com/codexdemo/orderplatform/order/OrderLine.java
src/main/java/com/codexdemo/orderplatform/order/OrderLineDraft.java
src/main/java/com/codexdemo/orderplatform/order/CreateOrderRequest.java
src/main/java/com/codexdemo/orderplatform/order/CreateOrderLineRequest.java
src/main/java/com/codexdemo/orderplatform/order/OrderResponse.java
src/main/java/com/codexdemo/orderplatform/order/OrderLineResponse.java
src/main/java/com/codexdemo/orderplatform/order/CreateOrderResult.java
src/main/java/com/codexdemo/orderplatform/order/OrderRepository.java
src/main/java/com/codexdemo/orderplatform/order/OrderStatusHistory.java
src/main/java/com/codexdemo/orderplatform/order/OrderStatusHistoryRepository.java
src/main/java/com/codexdemo/orderplatform/order/OrderStatusHistoryResponse.java
src/main/java/com/codexdemo/orderplatform/order/OrderController.java
```

它们负责订单边界里的三类东西：

```text
领域模型
 -> SalesOrder、OrderLine、OrderStatus

接口模型
 -> CreateOrderRequest、OrderResponse 等 DTO

HTTP 入口
 -> OrderController
```

下单 API 的外部调用长这样：

```text
POST /api/v1/orders
Header: Idempotency-Key: demo-order-001
Body:
{
  "customerId": "11111111-1111-1111-1111-111111111111",
  "items": [
    { "productId": 1, "quantity": 2 }
  ]
}
```

内部模型长这样：

```text
SalesOrder
 -> 一张订单
 -> 有 customerId、idempotencyKey、status、totalAmount、createdAt、paidAt、canceledAt

OrderLine
 -> 订单里的一个商品行
 -> 有 productId、productName、unitPrice、quantity、lineTotal
```

---

# 1. `OrderStatus.java`：订单状态

代码是：

```java
public enum OrderStatus {
    CREATED,
    PAID,
    SHIPPED,
    COMPLETED,
    CANCELLED
}
```

当前三个状态都已经参与业务流转：

```text
CREATED
 -> 订单已创建，库存已经预占，还没有支付

PAID
 -> 订单已支付，预占库存已经确认扣减

SHIPPED
 -> 订单已发货，进入履约中状态

COMPLETED
 -> 订单已完成，履约闭环结束

CANCELLED
 -> 订单已取消，预占库存已经释放回 available
```

一句话总结：`OrderStatus` 是订单状态机的起点，当前已经支持 CREATED 到 PAID，再到 SHIPPED、COMPLETED，也支持 CREATED 到 CANCELLED。

---

# 2. `SalesOrder.java`：订单聚合根

`SalesOrder` 是订单表实体：

```java
@Entity
@Table(name = "orders")
public class SalesOrder {
```

它是订单模块里最重要的领域对象。

主要字段：

```text
id
 -> 订单 ID

customerId
 -> 下单用户 ID

idempotencyKey
 -> 幂等键，防止重复下单

status
 -> 订单状态

totalAmount
 -> 订单总金额

createdAt
 -> 创建时间

paidAt
 -> 支付时间

shippedAt
 -> 发货时间

completedAt
 -> 完成时间

canceledAt
 -> 取消时间

lines
 -> 订单行列表

version
 -> JPA 乐观锁版本
```

`idempotencyKey` 是唯一的：

```java
@Column(nullable = false, unique = true, length = 120)
private String idempotencyKey;
```

这意味着数据库层面也会阻止同一个幂等键生成两张订单。

订单和订单行是一对多关系：

```java
@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
private List<OrderLine> lines = new ArrayList<>();
```

含义是：

```text
一个 SalesOrder 有多条 OrderLine
cascade = ALL 表示保存订单时一起保存订单行
orphanRemoval = true 表示订单行从集合里移除时也会从数据库删除
```

创建订单的方法是：

```java
public static SalesOrder place(UUID customerId, String idempotencyKey, List<OrderLineDraft> drafts)
```

它做了几件事：

```text
校验订单行不能为空
创建 SalesOrder
把每个 OrderLineDraft 转成 OrderLine
计算 totalAmount
返回订单对象
```

计算金额的代码是：

```java
order.totalAmount = order.lines.stream()
        .map(OrderLine::getLineTotal)
        .reduce(BigDecimal.ZERO, BigDecimal::add);
```

也就是：

```text
订单总金额 = 所有订单行金额相加
```

支付状态流转是：

```java
public void markPaid() {
    if (status == OrderStatus.PAID) {
        return;
    }
    if (status != OrderStatus.CREATED) {
        throw new BusinessException(HttpStatus.CONFLICT, "ORDER_STATUS_INVALID",
                "Only CREATED orders can be paid");
    }
    status = OrderStatus.PAID;
    paidAt = Instant.now();
}
```

这里有两个关键点：

```text
已经 PAID 的订单再次支付，直接返回
只有 CREATED 状态可以变成 PAID
```

取消状态流转是：

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

这里有三个关键点：

```text
已经 CANCELLED 的订单再次取消，返回 false
只有 CREATED 状态可以变成 CANCELLED
真正取消时记录 canceledAt
```

为什么返回 `boolean`？

因为应用服务要根据返回值判断是否需要释放库存和写取消事件。

如果已经取消过，就不能再次释放库存，否则库存会被加回太多。

一句话总结：`SalesOrder` 不只是数据库表映射，它把订单创建、金额计算、支付和取消状态流转这些业务规则也收在一起。

---

# 3. `OrderLine.java`：订单行

`OrderLine` 对应：

```text
order_lines 表
```

主要字段是：

```text
order
 -> 属于哪张订单

productId
 -> 商品 ID

productName
 -> 下单时的商品名称快照

unitPrice
 -> 下单时的商品单价快照

quantity
 -> 购买数量

lineTotal
 -> 当前订单行总价
```

这里要注意：

```text
productName 和 unitPrice 是快照
```

也就是说，订单创建后，即使商品改名或调价，这张订单仍然保存当时购买时的名称和价格。

订单行的金额计算是：

```java
this.lineTotal = draft.unitPrice().multiply(BigDecimal.valueOf(draft.quantity()));
```

也就是：

```text
订单行金额 = 单价 * 数量
```

`OrderLine` 和 `SalesOrder` 的关联是：

```java
@ManyToOne(fetch = FetchType.LAZY, optional = false)
private SalesOrder order;
```

多条订单行属于同一张订单。

一句话总结：`OrderLine` 保存订单里的商品快照和数量金额，是订单明细的核心。

---

# 4. `OrderLineDraft.java`：创建订单行前的草稿

`OrderLineDraft` 是一个中间对象：

```java
public record OrderLineDraft(
        Long productId,
        String productName,
        BigDecimal unitPrice,
        int quantity
) {
}
```

它不是请求对象，也不是数据库实体。

它的作用是：

```text
OrderApplicationService 查询商品、汇总数量后
 -> 先组装 OrderLineDraft
 -> 再交给 SalesOrder.place 创建真正的 OrderLine
```

为什么需要这个中间对象？

因为用户请求里只有：

```text
productId
quantity
```

但订单行需要：

```text
productName
unitPrice
lineTotal
```

这些信息要通过商品表查出来。

一句话总结：`OrderLineDraft` 是从请求参数走向领域模型之间的一层干净过渡。

---

# 5. `CreateOrderRequest.java` 和 `CreateOrderLineRequest.java`：下单请求对象

`CreateOrderRequest`：

```java
public record CreateOrderRequest(
        @NotNull UUID customerId,
        @NotEmpty List<@Valid CreateOrderLineRequest> items
) {
}
```

含义是：

```text
customerId 不能为空
items 不能为空列表
items 里的每个元素都要继续校验
```

`CreateOrderLineRequest`：

```java
public record CreateOrderLineRequest(
        @NotNull Long productId,
        @Positive int quantity
) {
}
```

含义是：

```text
productId 不能为空
quantity 必须是正数
```

这些校验配合 Controller 里的：

```java
@Valid @RequestBody CreateOrderRequest request
```

如果请求不合法，Spring 会在进入业务逻辑前抛出校验异常。

一句话总结：请求 DTO 负责挡住明显不合法的输入，让业务服务不用反复写基础参数校验。

---

# 6. `OrderResponse.java` 和 `OrderLineResponse.java`：订单响应对象

`OrderResponse` 是接口返回的订单结构：

```java
public record OrderResponse(
        Long id,
        UUID customerId,
        OrderStatus status,
        BigDecimal totalAmount,
        Instant createdAt,
        Instant paidAt,
        Instant canceledAt,
        List<OrderLineResponse> lines
) {
}
```

它包含订单主信息、支付/取消时间和订单行列表。

转换方法是：

```java
static OrderResponse from(SalesOrder order) {
    return new OrderResponse(
            order.getId(),
            order.getCustomerId(),
            order.getStatus(),
            order.getTotalAmount(),
            order.getCreatedAt(),
            order.getPaidAt(),
            order.getCanceledAt(),
            order.getLines().stream().map(OrderLineResponse::from).toList()
    );
}
```

这一步把领域实体转换成对外 JSON。

这样做有两个好处：

```text
避免直接暴露 JPA 实体
可以控制接口返回字段
```

一句话总结：响应 DTO 是 API 和领域模型之间的隔离层。

---

# 7. `CreateOrderResult.java`：表达是否是幂等重放

代码是：

```java
public record CreateOrderResult(
        OrderResponse order,
        boolean replayed
) {
}
```

`replayed` 表示：

```text
false
 -> 这是一次真正新创建的订单

true
 -> 这是同一个 Idempotency-Key 的重复请求，直接返回已有订单
```

Controller 会根据它决定返回状态码：

```text
新订单
 -> 201 Created

重复请求
 -> 200 OK
```

一句话总结：`CreateOrderResult` 把“订单内容”和“是否幂等重放”这两个信息打包返回。

---

# 8. `OrderRepository.java`：订单仓库

代码是：

```java
public interface OrderRepository extends JpaRepository<SalesOrder, Long> {

    Optional<SalesOrder> findByIdempotencyKey(String idempotencyKey);
}
```

除了继承 JPA 的基础增删改查，它还额外声明了：

```java
findByIdempotencyKey
```

Spring Data JPA 会根据方法名自动生成查询。

它等价于：

```text
按 idempotencyKey 查询订单
```

这个方法是幂等下单的第一步。

一句话总结：`OrderRepository` 提供了订单持久化能力，并且支持按幂等键查订单。

---

# 9. `OrderController.java`：订单 HTTP 入口

Controller 映射路径：

```java
@RequestMapping("/api/v1/orders")
```

创建订单接口：

```java
@PostMapping
public ResponseEntity<OrderResponse> createOrder(
        @RequestHeader("Idempotency-Key") String idempotencyKey,
        @Valid @RequestBody CreateOrderRequest request
)
```

这里接收两部分数据：

```text
Header 里的 Idempotency-Key
Body 里的 CreateOrderRequest
```

调用业务服务：

```java
CreateOrderResult result = orderApplicationService.createOrder(idempotencyKey, request);
```

如果是幂等重放：

```java
if (result.replayed()) {
    return ResponseEntity.ok(result.order());
}
```

返回：

```text
200 OK
```

如果是新订单：

```java
return ResponseEntity
        .created(URI.create("/api/v1/orders/" + result.order().id()))
        .body(result.order());
```

返回：

```text
201 Created
Location: /api/v1/orders/{id}
```

查询订单接口：

```java
@GetMapping("/{orderId}")
public OrderResponse getOrder(@PathVariable Long orderId)
```

查询订单状态历史接口：

```java
@GetMapping("/{orderId}/history")
public List<OrderStatusHistoryResponse> getOrderHistory(@PathVariable Long orderId)
```

第六版新增这条接口，用来查看订单从创建到支付、发货、完成、取消或过期的状态时间线。

查询订单支付流水接口：

```java
@GetMapping("/{orderId}/payments")
public List<PaymentTransactionResponse> getOrderPayments(@PathVariable Long orderId)
```

第七版新增这条接口，用来查看订单支付成功后生成的支付交易记录。

支付接口：

```java
@PostMapping("/{orderId}/pay")
public ResponseEntity<OrderResponse> pay(@PathVariable Long orderId)
```

支付成功或已支付时返回：

```text
202 Accepted
```

取消接口：

```java
@PostMapping("/{orderId}/cancel")
public ResponseEntity<OrderResponse> cancel(@PathVariable Long orderId)
```

取消成功或重复取消已取消订单时返回：

```text
202 Accepted
```

如果订单已经支付，再取消会返回业务错误：

```text
409 ORDER_STATUS_INVALID
```

发货接口：

```java
@PostMapping("/{orderId}/ship")
public ResponseEntity<OrderResponse> ship(@PathVariable Long orderId)
```

只有 `PAID` 订单可以发货，成功后状态变成 `SHIPPED`。

完成接口：

```java
@PostMapping("/{orderId}/complete")
public ResponseEntity<OrderResponse> complete(@PathVariable Long orderId)
```

只有 `SHIPPED` 订单可以完成，成功后状态变成 `COMPLETED`。

一句话总结：`OrderController` 只负责 HTTP 参数接收和响应状态码，真正业务编排交给 `OrderApplicationService`。

---

# 本次讲解总结

第三次讲解的是订单 API 和领域模型：Controller 负责入口，DTO 负责请求响应，Repository 负责数据库访问，`SalesOrder` 和 `OrderLine` 负责表达订单的真实业务结构；后续版本补上了取消、发货、完成等状态流转接口。
