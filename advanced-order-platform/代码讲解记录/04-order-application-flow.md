# 第四次讲解：订单业务编排和核心流程

第四次重点讲解：

```text
src/main/java/com/codexdemo/orderplatform/order/OrderApplicationService.java
```

这个类是当前项目最核心的业务编排类。

它不负责 HTTP 细节，也不直接定义数据库表。

它负责把多个模块串起来：

```text
order
catalog
inventory
payment
outbox
```

可以把它理解成：

```text
订单用例层
```

核心链路有三条：

```text
创建订单
查询订单
支付订单
退款订单
发货订单
完成订单
查询支付流水
```

其中最重要的是创建订单：

```text
createOrder
 -> 校验幂等键
 -> 查是否已有订单
 -> 如果已有，返回重放结果
 -> 如果没有，创建新订单
```

---

# 1. 类的依赖关系

构造器注入了 4 个依赖：

```java
private final OrderRepository orderRepository;
private final ProductRepository productRepository;
private final InventoryService inventoryService;
private final OutboxRepository outboxRepository;
private final OrderStatusHistoryRepository orderStatusHistoryRepository;
private final PaymentService paymentService;
```

它们分别负责：

```text
OrderRepository
 -> 保存订单、查询订单、按幂等键查订单

ProductRepository
 -> 查询商品是否存在、是否启用、价格是多少

InventoryService
 -> 预占库存、确认扣减库存

OutboxRepository
 -> 保存领域事件

OrderStatusHistoryRepository
 -> 保存订单状态历史，方便查询订单时间线

PaymentService
 -> 记录模拟支付成功交易，并查询订单支付流水
```

这里体现了一个常见分层：

```text
Controller
 -> 接收 HTTP 请求

ApplicationService
 -> 编排一个完整业务用例

Domain Entity
 -> 保存业务状态和局部业务规则

Repository
 -> 读写数据库
```

一句话总结：`OrderApplicationService` 站在业务用例层，把商品、库存、订单和事件串成完整流程。

---

# 2. `createOrder`：幂等下单入口

代码入口是：

```java
@Transactional
public CreateOrderResult createOrder(String idempotencyKey, CreateOrderRequest request) {
    requireIdempotencyKey(idempotencyKey);

    return orderRepository.findByIdempotencyKey(idempotencyKey)
            .map(existing -> new CreateOrderResult(OrderResponse.from(existing), true))
            .orElseGet(() -> placeNewOrder(idempotencyKey, request));
}
```

这个方法被 `@Transactional` 标注，表示：

```text
整个下单流程在一个数据库事务里执行
```

如果中间任何一步抛异常：

```text
库存预占、订单保存、Outbox 保存都会回滚
```

第一步是校验幂等键：

```java
requireIdempotencyKey(idempotencyKey);
```

幂等键的作用是防重复下单。

比如用户点下单后网络卡了，前端可能重试：

```text
第一次 POST /orders 成功，但响应丢了
第二次 POST /orders 又发了一遍
```

如果没有幂等键，可能创建两张订单。

有幂等键后：

```text
第一次请求创建订单
第二次请求查到同一个 idempotencyKey 已经存在
直接返回已有订单
```

查询已有订单的代码：

```java
orderRepository.findByIdempotencyKey(idempotencyKey)
```

如果找到了：

```java
.map(existing -> new CreateOrderResult(OrderResponse.from(existing), true))
```

这里 `true` 表示这是一次重放，不是新创建。

如果没找到：

```java
.orElseGet(() -> placeNewOrder(idempotencyKey, request));
```

才进入真正下单流程。

一句话总结：`createOrder` 的第一职责不是创建订单，而是先保证同一个幂等键不会重复创建订单。

---

# 3. `requireIdempotencyKey`：幂等键基础校验

代码是：

```java
private void requireIdempotencyKey(String idempotencyKey) {
    if (!StringUtils.hasText(idempotencyKey)) {
        throw new BusinessException(HttpStatus.BAD_REQUEST, "IDEMPOTENCY_KEY_REQUIRED",
                "Idempotency-Key header is required");
    }
    if (idempotencyKey.length() > 120) {
        throw new BusinessException(HttpStatus.BAD_REQUEST, "IDEMPOTENCY_KEY_TOO_LONG",
                "Idempotency-Key must not be longer than 120 characters");
    }
}
```

它校验两件事：

```text
必须有内容
长度不能超过 120
```

为什么要限制长度？

因为数据库字段是：

```java
@Column(nullable = false, unique = true, length = 120)
private String idempotencyKey;
```

如果不提前校验，可能等到数据库写入时才报错，错误信息就不够清晰。

一句话总结：`requireIdempotencyKey` 把幂等键的接口约束提前挡在业务流程入口。

---

# 4. `placeNewOrder`：真正创建新订单

新订单流程在这里：

```java
private CreateOrderResult placeNewOrder(String idempotencyKey, CreateOrderRequest request) {
    Map<Long, Integer> quantities = aggregateQuantities(request);
    Map<Long, Product> products = loadProducts(quantities);
    inventoryService.reserve(quantities);

    List<OrderLineDraft> drafts = quantities.entrySet().stream()
            .map(entry -> {
                Product product = products.get(entry.getKey());
                return new OrderLineDraft(product.getId(), product.getName(), product.getPrice(), entry.getValue());
            })
            .toList();

    SalesOrder order = SalesOrder.place(request.customerId(), idempotencyKey, drafts);
    SalesOrder saved = orderRepository.saveAndFlush(order);
    outboxRepository.save(OutboxEvent.orderCreated(saved));
    recordHistory(saved, null, "ORDER_CREATED");
    return new CreateOrderResult(OrderResponse.from(saved), false);
}
```

可以拆成 6 步：

```text
1. 聚合同一商品数量
2. 查询并校验商品
3. 预占库存
4. 生成订单行草稿
5. 创建并保存订单
6. 写入 OrderCreated 事件
```

一句话总结：`placeNewOrder` 是把“请求参数”变成“已持久化订单”的完整业务流水线。

---

# 5. `aggregateQuantities`：合并重复商品

代码是：

```java
private Map<Long, Integer> aggregateQuantities(CreateOrderRequest request) {
    return request.items().stream()
            .collect(Collectors.toMap(
                    CreateOrderLineRequest::productId,
                    CreateOrderLineRequest::quantity,
                    Integer::sum,
                    LinkedHashMap::new
            ));
}
```

它解决一个问题：

用户请求里可能这样传：

```json
{
  "items": [
    { "productId": 1, "quantity": 1 },
    { "productId": 1, "quantity": 2 }
  ]
}
```

这其实应该被看成：

```text
productId = 1
quantity = 3
```

`Collectors.toMap` 里的第三个参数：

```java
Integer::sum
```

表示如果 key 重复，就把数量相加。

第四个参数：

```java
LinkedHashMap::new
```

表示保留插入顺序。

一句话总结：`aggregateQuantities` 把请求里的订单行整理成“每个商品买多少件”的 Map。

---

# 6. `loadProducts`：校验商品存在且启用

代码开头是：

```java
Map<Long, Product> products = productRepository.findAllById(quantities.keySet()).stream()
        .filter(Product::isActive)
        .collect(Collectors.toMap(Product::getId, Function.identity()));
```

它做两件事：

```text
按 productId 批量查询商品
只保留 active = true 的商品
```

然后检查请求里的每个商品 ID 是否都查到了：

```java
quantities.keySet().stream()
        .filter(productId -> !products.containsKey(productId))
        .findFirst()
        .ifPresent(productId -> {
            throw new BusinessException(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND",
                    "Product " + productId + " was not found");
        });
```

如果某个商品不存在，或者存在但未启用，就抛出：

```text
PRODUCT_NOT_FOUND
```

为什么未启用也当成 not found？

因为对购买方来说，不能买的商品就不应该暴露更多内部状态。

一句话总结：`loadProducts` 负责把 productId 变成 Product，并保证订单里没有非法商品。

---

# 7. `inventoryService.reserve`：预占库存

代码是：

```java
inventoryService.reserve(quantities);
```

虽然只有一行，但很关键。

它会进入库存模块：

```text
InventoryService.reserve
 -> 按 productId 排序
 -> findByProductIdForUpdate 加数据库写锁
 -> InventoryItem.reserve
 -> available 减少
 -> reserved 增加
```

这一步发生在订单保存之前。

也就是说：

```text
库存不够
 -> 直接失败
 -> 不创建订单

库存够
 -> 先占住库存
 -> 再创建订单
```

因为整个 `createOrder` 有事务，所以如果订单保存失败，库存预占也会回滚。

一句话总结：库存预占是下单流程里防超卖的核心动作。

---

# 8. 创建 `OrderLineDraft`

代码是：

```java
List<OrderLineDraft> drafts = quantities.entrySet().stream()
        .map(entry -> {
            Product product = products.get(entry.getKey());
            return new OrderLineDraft(product.getId(), product.getName(), product.getPrice(), entry.getValue());
        })
        .toList();
```

它把：

```text
productId -> quantity
```

转换成：

```text
productId
productName
unitPrice
quantity
```

为什么这里要把 `productName` 和 `unitPrice` 拿出来？

因为订单要保存下单瞬间的商品快照。

如果以后商品改名或调价，老订单不能跟着变。

一句话总结：`OrderLineDraft` 把当前商品信息固化成订单行创建所需的快照数据。

---

# 9. 保存订单和 Outbox 事件

创建领域对象：

```java
SalesOrder order = SalesOrder.place(request.customerId(), idempotencyKey, drafts);
```

保存到数据库：

```java
SalesOrder saved = orderRepository.saveAndFlush(order);
```

这里用了 `saveAndFlush`。

它会尽快把 SQL flush 到数据库。

因为后面要创建 Outbox 事件，事件里需要订单 ID：

```java
outboxRepository.save(OutboxEvent.orderCreated(saved));
```

如果只是 `save`，在一些情况下 ID 也能拿到，但 `saveAndFlush` 更明确地表示：

```text
订单先落库
事件再引用订单 ID
```

最后返回：

```java
return new CreateOrderResult(OrderResponse.from(saved), false);
```

`false` 表示这不是重放，而是新建订单。

一句话总结：订单和事件在同一个事务里保存，为后续可靠消息发布做准备。

---

# 10. `getOrder`：查询订单

代码是：

```java
@Transactional(readOnly = true)
public OrderResponse getOrder(Long orderId) {
    return OrderResponse.from(findOrder(orderId));
}
```

它只是查询，不修改数据，所以用：

```java
@Transactional(readOnly = true)
```

内部调用：

```java
findOrder(orderId)
```

找不到时会抛：

```text
ORDER_NOT_FOUND
```

一句话总结：`getOrder` 是一个只读用例，把数据库里的订单转换成 API 响应。

---

# 11. `pay`：支付订单

支付方法是：

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

流程是：

```text
查询订单
如果已经支付，直接返回
订单标记为 PAID
汇总订单行商品数量
确认扣减 reserved 库存
记录支付交易流水
写入 OrderPaid 事件
返回订单响应
```

为什么先 `markPaid` 再 `commitReserved`？

因为当前要先确认订单状态允许支付。

`markPaid` 内部会检查：

```java
if (status == OrderStatus.PAID) {
    return;
}
if (status != OrderStatus.CREATED) {
    throw new BusinessException(HttpStatus.CONFLICT, "ORDER_STATUS_INVALID",
            "Only CREATED orders can be paid");
}
status = OrderStatus.PAID;
paidAt = Instant.now();
```

如果订单已经取消：

```text
status = CANCELLED
 -> markPaid 抛出 ORDER_STATUS_INVALID
 -> 不会继续扣减 reserved 库存
```

这样错误语义更准确。

`order.quantitiesByProductId()` 会把订单行重新汇总成：

```text
productId -> quantity
```

然后传给库存服务。

一句话总结：`pay` 把订单从 CREATED 推进到 PAID，同时把 reserved 库存确认掉，并记录支付事件。

第七版在支付成功后会先记录支付交易流水：

```java
paymentService.recordSucceededPayment(order);
```

它记录的是：

```text
orderId
amount
status = SUCCEEDED
provider = SIMULATED
providerTransactionId = SIM-...
```

第六版还会在支付成功后记录状态历史：

```java
recordHistory(order, fromStatus, "ORDER_PAID");
```

这条历史记录保存的是：

```text
fromStatus = CREATED
toStatus = PAID
action = ORDER_PAID
```

---

# 12. `refund`：支付后退款

第八版新增退款方法：

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

退款流程是：

```text
查询订单
调用 SalesOrder.refund()
如果本次真的从 PAID 变成 REFUNDED
 -> 回补已经确认扣减的库存
 -> 写 REFUNDED 支付交易流水
 -> 写 OrderRefunded Outbox 事件
 -> 写 ORDER_REFUNDED 状态历史
返回订单响应
```

领域规则是：

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

一句话总结：`refund` 只允许已支付未发货订单退款，并且用返回值保证重复退款不会重复回补库存或重复写流水。

---

# 13. `ship`：订单发货

第五版新增发货方法：

```java
@Transactional
public OrderResponse ship(Long orderId) {
    SalesOrder order = findOrder(orderId);
    OrderStatus fromStatus = order.getStatus();
    if (order.ship()) {
        outboxRepository.save(OutboxEvent.orderShipped(order));
        recordHistory(order, fromStatus, "ORDER_SHIPPED");
    }
    return OrderResponse.from(order);
}
```

流程是：

```text
查询订单
调用 SalesOrder.ship()
如果本次真的从 PAID 变成 SHIPPED
 -> 写入 OrderShipped 事件
返回订单响应
```

对应的领域规则是：

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

一句话总结：`ship` 只允许已支付订单进入发货状态，并用返回值避免重复写发货事件。

---

# 14. `complete`：订单完成

第五版新增完成方法：

```java
@Transactional
public OrderResponse complete(Long orderId) {
    SalesOrder order = findOrder(orderId);
    OrderStatus fromStatus = order.getStatus();
    if (order.complete()) {
        outboxRepository.save(OutboxEvent.orderCompleted(order));
        recordHistory(order, fromStatus, "ORDER_COMPLETED");
    }
    return OrderResponse.from(order);
}
```

它对应的领域规则是：

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

流程可以理解成：

```text
PAID
 -> ship
 -> SHIPPED
 -> complete
 -> COMPLETED
```

一句话总结：`complete` 把履约中的订单收口到最终完成状态，并记录完成事件。

---

# 15. `cancel`：取消订单并释放库存

第二版新增取消方法：

```java
@Transactional
public OrderResponse cancel(Long orderId) {
    SalesOrder order = findOrder(orderId);
    OrderStatus fromStatus = order.getStatus();
    if (order.cancel()) {
        inventoryService.releaseReserved(order.quantitiesByProductId());
        outboxRepository.save(OutboxEvent.orderCancelled(order));
        recordHistory(order, fromStatus, "ORDER_CANCELLED");
    }
    return OrderResponse.from(order);
}
```

流程是：

```text
查询订单
调用 SalesOrder.cancel()
如果这次真的从 CREATED 变成 CANCELLED
 -> 释放 reserved 库存
 -> 写入 OrderCancelled 事件
返回订单响应
```

关键点在这一句：

```java
if (order.cancel()) {
```

`SalesOrder.cancel()` 返回 `boolean`。

它的含义是：

```text
true
 -> 本次调用真正完成了取消
 -> 需要释放库存和写事件

false
 -> 订单之前已经取消过
 -> 直接返回，不重复释放库存，不重复写事件
```

对应的领域代码是：

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

为什么重复取消不抛错，而是返回已有取消状态？

因为取消接口做成幂等更好用。

调用方如果因为网络重试发了两次：

```text
POST /api/v1/orders/1/cancel
POST /api/v1/orders/1/cancel
```

第二次应该看到订单仍然是 `CANCELLED`，而不是造成库存二次释放。

库存释放调用是：

```java
inventoryService.releaseReserved(order.quantitiesByProductId());
```

它会进入库存服务：

```java
public void releaseReserved(Map<Long, Integer> productQuantities) {
    productQuantities.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .forEach(entry -> findLocked(entry.getKey()).releaseReserved(entry.getValue()));
}
```

最后进入库存实体：

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

所以取消订单时库存变化是：

```text
reserved -= quantity
available += quantity
```

取消事件写入是：

```java
outboxRepository.save(OutboxEvent.orderCancelled(order));
```

它让后续消息系统可以感知：

```text
某张订单被取消了
```

一句话总结：`cancel` 把订单从 CREATED 推进到 CANCELLED，同时把 reserved 库存释放回 available，并记录取消事件。

---

# 16. `getOrderHistory` 和 `recordHistory`：订单状态时间线

第六版新增历史查询用例：

```java
@Transactional(readOnly = true)
public List<OrderStatusHistoryResponse> getOrderHistory(Long orderId) {
    findOrder(orderId);
    return orderStatusHistoryRepository.findByOrderIdOrderByChangedAtAscIdAsc(orderId).stream()
            .map(OrderStatusHistoryResponse::from)
            .toList();
}
```

这里先调用：

```java
findOrder(orderId);
```

目的是保持和查询订单一致的错误语义：

```text
订单不存在
 -> 404 ORDER_NOT_FOUND
```

真正保存历史的是：

```java
private void recordHistory(SalesOrder order, OrderStatus fromStatus, String action) {
    orderStatusHistoryRepository.save(
            OrderStatusHistory.record(order.getId(), fromStatus, order.getStatus(), action)
    );
}
```

每次真实状态变化后都会调用它：

```text
ORDER_CREATED
ORDER_PAID
ORDER_CANCELLED
ORDER_EXPIRED
ORDER_SHIPPED
ORDER_COMPLETED
ORDER_REFUNDED
```

一句话总结：`recordHistory` 让订单状态机不仅“改变当前状态”，还留下可审计、可查询的状态变化轨迹。

---

# 17. `getOrderPayments`：查询支付交易流水

第七版新增支付流水查询：

```java
@Transactional(readOnly = true)
public List<PaymentTransactionResponse> getOrderPayments(Long orderId) {
    findOrder(orderId);
    return paymentService.listOrderPayments(orderId).stream()
            .map(PaymentTransactionResponse::from)
            .toList();
}
```

这里同样先调用：

```java
findOrder(orderId);
```

原因是保持统一错误语义：

```text
订单不存在
 -> 404 ORDER_NOT_FOUND
```

然后交给 `PaymentService` 查询：

```java
paymentService.listOrderPayments(orderId)
```

一句话总结：支付流水查询让订单支付不再只是一个 `PAID` 状态，而是能看到真实落库的支付交易记录。

---

# 18. 当前实现的一个重要边界

当前代码已经有：

```text
幂等键查询
数据库唯一约束
库存事务回滚
库存行写锁
订单乐观锁字段
订单取消释放库存
取消接口幂等
超时未支付订单自动过期取消
发货和完成履约状态流转
订单状态历史查询
支付交易流水查询
支付后退款和库存回补
```

但它还没有做完整的：

```text
并发相同 Idempotency-Key 冲突重试
分布式部署下的过期扫描抢占控制
真实支付网关回调和签名验签
Outbox 后台发布器
Redis 分布式限流
```

这是很适合作为下一阶段练习的地方。

一句话总结：当前版本是一个清晰的订单核心闭环，后续可以围绕并发冲突、自动取消、消息发布和支付回调继续加深。

---

# 本次讲解总结

第四次讲解的是 `OrderApplicationService`：它是项目最值得重点阅读的类，负责把幂等、商品校验、库存预占、订单创建、支付确认、支付流水、取消释放、发货完成、状态历史和 Outbox 事件串成完整业务流程。
