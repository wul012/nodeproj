# 第五次讲解：Outbox、异常处理、测试和运行方式

第五次重点讲解这些文件：

```text
src/main/java/com/codexdemo/orderplatform/outbox/OutboxEvent.java
src/main/java/com/codexdemo/orderplatform/outbox/OutboxRepository.java
src/main/java/com/codexdemo/orderplatform/outbox/OutboxEventResponse.java
src/main/java/com/codexdemo/orderplatform/outbox/OutboxController.java

src/main/java/com/codexdemo/orderplatform/common/BusinessException.java
src/main/java/com/codexdemo/orderplatform/common/ApiExceptionHandler.java

src/test/java/com/codexdemo/orderplatform/OrderApplicationServiceTests.java
README.md
.gitignore
```

这些文件不全在订单主流程里，但它们让项目更像一个工程：

```text
Outbox
 -> 为异步消息和最终一致性做准备

统一异常
 -> 让接口错误响应稳定、可读

测试
 -> 证明核心业务行为没跑偏

README
 -> 告诉使用者怎么运行和调用
```

---

# 1. `OutboxEvent.java`：领域事件表

`OutboxEvent` 是一个 JPA 实体：

```java
@Entity
@Table(name = "outbox_events")
public class OutboxEvent {
```

它对应数据库中的：

```text
outbox_events 表
```

主要字段是：

```text
id
 -> 事件 ID，UUID

aggregateType
 -> 聚合类型，比如 ORDER

aggregateId
 -> 聚合 ID，比如订单 ID

eventType
 -> 事件类型，比如 OrderCreated、OrderPaid、OrderCancelled

payload
 -> 事件内容，JSON 字符串

createdAt
 -> 事件创建时间

publishedAt
 -> 事件发布时间，当前预留
```

这里的聚合可以简单理解为：

```text
业务对象
```

比如订单就是一个聚合：

```text
aggregateType = ORDER
aggregateId = 订单 ID
```

当前有三个事件工厂方法：

```java
public static OutboxEvent orderCreated(SalesOrder order)
public static OutboxEvent orderPaid(SalesOrder order)
public static OutboxEvent orderCancelled(SalesOrder order)
```

它们分别在：

```text
订单创建成功后
订单支付成功后
订单取消成功后
```

被调用。

三个方法的代码结构是一样的：

```java
public static OutboxEvent orderCreated(SalesOrder order) {
    return new OutboxEvent("ORDER", String.valueOf(order.getId()), "OrderCreated", orderPayload(order));
}

public static OutboxEvent orderPaid(SalesOrder order) {
    return new OutboxEvent("ORDER", String.valueOf(order.getId()), "OrderPaid", orderPayload(order));
}

public static OutboxEvent orderCancelled(SalesOrder order) {
    return new OutboxEvent("ORDER", String.valueOf(order.getId()), "OrderCancelled", orderPayload(order));
}
```

这里变化的只有：

```text
eventType
```

也就是事件名字。

事件 payload 是：

```java
private static String orderPayload(SalesOrder order) {
    return """
            {"orderId":%d,"customerId":"%s","status":"%s","totalAmount":%s}
            """.formatted(order.getId(), order.getCustomerId(), order.getStatus(), order.getTotalAmount()).trim();
}
```

也就是把订单关键字段保存成 JSON 字符串。

一句话总结：`OutboxEvent` 把“订单发生了什么事”记录到数据库，为以后发消息做准备；第二版已经能记录创建、支付、取消三类订单事件。

---

# 2. 为什么需要 Outbox

如果以后接 Kafka 或 RabbitMQ，订单创建后通常要通知：

```text
库存服务
支付服务
通知服务
风控服务
数据分析服务
```

最直接的写法可能是：

```text
保存订单
 -> 调 Kafka 发送 OrderCreated 消息
```

但这里有一个经典问题：

```text
订单保存成功了，消息发送失败怎么办？
消息发送成功了，订单保存失败怎么办？
```

Outbox 的思路是：

```text
在同一个数据库事务里保存订单和事件
 -> 事务提交后，后台任务再扫描未发布事件
 -> 发布到 Kafka / RabbitMQ
 -> 发布成功后更新 publishedAt
```

这样至少能保证：

```text
订单和待发布事件一起成功
订单和待发布事件一起失败
```

当前项目还没有后台发布器，但已经有事件表，后续可以继续升级。

一句话总结：Outbox 是解决“数据库事务”和“消息发送”一致性问题的一种常见工程方案。

---

# 3. `OutboxRepository.java`：事件仓库

代码是：

```java
public interface OutboxRepository extends JpaRepository<OutboxEvent, UUID> {

    List<OutboxEvent> findTop50ByOrderByCreatedAtDesc();
}
```

它继承 JPA 基础能力，并额外提供：

```text
按 createdAt 倒序查询最近 50 条事件
```

这个方法现在给查询接口使用：

```text
GET /api/v1/outbox/events
```

以后也可以新增：

```text
findTop100ByPublishedAtIsNullOrderByCreatedAtAsc
```

让后台任务扫描未发布事件。

一句话总结：`OutboxRepository` 是事件表的数据库访问入口。

---

# 4. `OutboxController.java`：查看最近事件

Controller 路径是：

```java
@RequestMapping("/api/v1/outbox/events")
```

查询方法：

```java
@GetMapping
public List<OutboxEventResponse> listRecentEvents() {
    return outboxRepository.findTop50ByOrderByCreatedAtDesc().stream()
            .map(OutboxEventResponse::from)
            .toList();
}
```

当前它的作用是方便学习和调试。

你可以这样看事件：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/outbox/events
```

创建订单后应该看到：

```text
OrderCreated
```

支付订单后应该再看到：

```text
OrderPaid
```

取消订单后应该看到：

```text
OrderCancelled
```

一句话总结：`OutboxController` 让你能直接观察订单流程产生了哪些领域事件。

---

# 5. `BusinessException.java`：业务异常

代码核心是：

```java
public class BusinessException extends RuntimeException {

    private final HttpStatus status;
    private final String code;
```

它除了普通异常消息外，还带两个字段：

```text
status
 -> HTTP 状态码，比如 400、404、409

code
 -> 业务错误码，比如 PRODUCT_NOT_FOUND、INSUFFICIENT_STOCK
```

使用例子：

```java
throw new BusinessException(HttpStatus.CONFLICT, "INSUFFICIENT_STOCK",
        "Product " + productId + " has only " + available + " units available");
```

这样业务代码不用关心最终 JSON 怎么返回，只需要表达：

```text
这是什么错误
应该返回什么 HTTP 状态
错误说明是什么
```

一句话总结：`BusinessException` 是业务代码向接口层传递错误语义的统一方式。

---

# 6. `ApiExceptionHandler.java`：统一错误响应

这个类用了：

```java
@RestControllerAdvice
```

它会全局拦截 Controller 抛出的异常。

业务异常处理：

```java
@ExceptionHandler(BusinessException.class)
public ProblemDetail handleBusinessException(BusinessException exception) {
    ProblemDetail detail = ProblemDetail.forStatusAndDetail(exception.getStatus(), exception.getMessage());
    detail.setType(URI.create("https://advanced-order-platform/errors/" + exception.getCode()));
    detail.setTitle(exception.getCode());
    return detail;
}
```

返回的是 Spring 的：

```text
ProblemDetail
```

它适合表达标准化错误响应。

比如库存不足可能返回：

```json
{
  "type": "https://advanced-order-platform/errors/INSUFFICIENT_STOCK",
  "title": "INSUFFICIENT_STOCK",
  "status": 409,
  "detail": "Product 1 has only 0 units available"
}
```

参数校验异常：

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
```

会返回：

```text
VALIDATION_FAILED
fieldErrors
```

缺少请求头：

```java
@ExceptionHandler(MissingRequestHeaderException.class)
```

会返回：

```text
MISSING_HEADER
```

一句话总结：`ApiExceptionHandler` 把 Java 异常统一翻译成清晰稳定的 HTTP 错误响应。

---

# 7. `OrderApplicationServiceTests.java`：核心业务测试

测试类使用：

```java
@SpringBootTest
```

这表示启动完整 Spring 容器来测试业务逻辑。

注入了：

```java
private OrderApplicationService orderApplicationService;
private ProductRepository productRepository;
private InventoryRepository inventoryRepository;
```

也就是测试直接围绕真实业务服务和真实 Repository 运行。

## 测试一：幂等下单和库存预占

测试方法：

```java
void createOrderReservesStockAndReplaysIdempotentRequest()
```

核心行为是：

```text
第一次 createOrder
 -> 创建新订单
 -> available 减少 2

第二次用同一个 idempotencyKey createOrder
 -> 返回已有订单
 -> replayed = true
 -> available 不再减少
```

关键断言：

```java
assertThat(created.replayed()).isFalse();
assertThat(replayed.replayed()).isTrue();
assertThat(replayed.order().id()).isEqualTo(created.order().id());
assertThat(afterFirstCreate.getAvailable()).isEqualTo(before.getAvailable() - 2);
assertThat(afterReplay.getAvailable()).isEqualTo(afterFirstCreate.getAvailable());
```

这个测试证明：

```text
幂等不是只返回同一张订单
还必须保证库存不会重复扣
```

一句话总结：第一个测试守住了幂等下单最重要的行为。

## 测试二：支付确认预占库存

测试方法：

```java
void payOrderCommitsReservedInventory()
```

核心流程：

```text
创建订单
 -> 支付订单
 -> 订单状态变成 PAID
 -> paidAt 不为空
 -> reserved 库存仍然合法
```

关键断言：

```java
assertThat(paid.status()).isEqualTo(OrderStatus.PAID);
assertThat(paid.paidAt()).isNotNull();
assertThat(inventory.getReserved()).isGreaterThanOrEqualTo(0);
```

一句话总结：第二个测试证明支付流程能推动订单状态，并完成库存确认。

## 测试三：库存不足失败

测试方法：

```java
void createOrderFailsWhenStockIsInsufficient()
```

请求了一个特别大的数量：

```java
new CreateOrderLineRequest(product.getId(), 1_000_000)
```

断言会抛业务异常：

```java
assertThatThrownBy(() -> orderApplicationService.createOrder("test-idempotency-key-003", request))
        .isInstanceOf(BusinessException.class)
        .hasMessageContaining("has only");
```

一句话总结：第三个测试证明库存不足时不会创建正常订单，而是用业务异常中断流程。

## 测试四：取消订单释放库存，并且重复取消幂等

测试方法：

```java
void cancelOrderReleasesReservedInventoryAndIsIdempotent()
```

这个测试先记录取消前库存：

```java
InventoryItem before = inventoryRepository.findByProductId(product.getId()).orElseThrow();
```

然后创建一张购买 3 件商品的订单：

```java
CreateOrderRequest request = new CreateOrderRequest(
        UUID.fromString("44444444-4444-4444-4444-444444444444"),
        List.of(new CreateOrderLineRequest(product.getId(), 3))
);

CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-004", request);
```

创建后库存应该变化：

```text
available 减少 3
reserved 增加 3
```

对应断言是：

```java
assertThat(afterCreate.getAvailable()).isEqualTo(before.getAvailable() - 3);
assertThat(afterCreate.getReserved()).isEqualTo(before.getReserved() + 3);
```

然后取消订单：

```java
OrderResponse cancelled = orderApplicationService.cancel(created.order().id());
InventoryItem afterCancel = inventoryRepository.findByProductId(product.getId()).orElseThrow();
```

取消后断言：

```java
assertThat(cancelled.status()).isEqualTo(OrderStatus.CANCELLED);
assertThat(cancelled.canceledAt()).isNotNull();
assertThat(afterCancel.getAvailable()).isEqualTo(before.getAvailable());
assertThat(afterCancel.getReserved()).isEqualTo(before.getReserved());
```

这说明库存被释放回了取消前状态。

最后再次取消同一张订单：

```java
OrderResponse replayedCancel = orderApplicationService.cancel(created.order().id());
InventoryItem afterReplay = inventoryRepository.findByProductId(product.getId()).orElseThrow();
```

关键断言：

```java
assertThat(replayedCancel.status()).isEqualTo(OrderStatus.CANCELLED);
assertThat(afterReplay.getAvailable()).isEqualTo(afterCancel.getAvailable());
assertThat(afterReplay.getReserved()).isEqualTo(afterCancel.getReserved());
```

这说明重复取消不会重复释放库存。

一句话总结：第四个测试守住了第二版最关键的行为：取消订单释放库存，但重复取消不二次释放。

## 测试五：已支付订单不能取消

测试方法：

```java
void paidOrderCannotBeCancelled()
```

它先创建订单，再支付：

```java
CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-005", request);
orderApplicationService.pay(created.order().id());
```

然后尝试取消：

```java
assertThatThrownBy(() -> orderApplicationService.cancel(created.order().id()))
        .isInstanceOf(BusinessException.class)
        .hasMessageContaining("Only CREATED orders can be cancelled");
```

这个测试对应订单状态机规则：

```text
PAID 不能变成 CANCELLED
```

一句话总结：第五个测试防止已支付订单被错误取消。

## 测试六：已取消订单不能支付

测试方法：

```java
void cancelledOrderCannotBePaid()
```

它先创建订单，再取消：

```java
CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-006", request);
orderApplicationService.cancel(created.order().id());
```

然后尝试支付：

```java
assertThatThrownBy(() -> orderApplicationService.pay(created.order().id()))
        .isInstanceOf(BusinessException.class)
        .hasMessageContaining("Only CREATED orders can be paid");
```

这个测试对应订单状态机规则：

```text
CANCELLED 不能变成 PAID
```

一句话总结：第六个测试防止已取消订单又被支付。

---

# 8. 运行和验证

本项目可以直接运行：

```powershell
cd D:\javaproj\advanced-order-platform
mvn spring-boot:run
```

查询健康状态：

```powershell
Invoke-RestMethod http://localhost:8080/actuator/health
```

查询商品：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/products
```

创建订单：

```powershell
$body = @{
  customerId = "11111111-1111-1111-1111-111111111111"
  items = @(
    @{ productId = 1; quantity = 2 }
  )
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:8080/api/v1/orders `
  -ContentType "application/json" `
  -Headers @{ "Idempotency-Key" = "demo-order-001" } `
  -Body $body
```

支付订单：

```powershell
Invoke-RestMethod -Method Post http://localhost:8080/api/v1/orders/1/pay
```

取消订单：

```powershell
Invoke-RestMethod -Method Post http://localhost:8080/api/v1/orders/1/cancel
```

查看事件：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/outbox/events
```

运行测试：

```powershell
mvn test
```

一句话总结：这些命令能从 API、事件和测试三个角度证明项目雏形可用。

---

# 9. 后续升级路线

当前版本适合继续往这些方向加：

```text
定时取消
 -> 扫描 CREATED 且超时未支付订单
 -> 自动调用取消链路
 -> reserved 释放回 available

Outbox 发布器
 -> 定时扫描未发布事件
 -> 发布到 Kafka 或 RabbitMQ
 -> 成功后写 publishedAt

Redis
 -> 商品列表缓存
 -> 热点库存缓存
 -> 接口限流
 -> 分布式幂等 token

支付模块
 -> 支付单
 -> 支付回调
 -> 回调签名验证
 -> 重复回调幂等

观测体系
 -> Micrometer 指标
 -> Prometheus 抓取
 -> Grafana 面板
 -> OpenTelemetry 链路追踪

集成测试
 -> Testcontainers 启动 PostgreSQL
 -> Testcontainers 启动 Redis / Kafka
 -> 测真实数据库锁行为
```

一句话总结：当前项目已经有订单核心骨架和手动取消能力，下一步应该围绕自动取消、消息发布、Redis、支付回调和观测体系继续进阶。

---

# 本次讲解总结

第五次讲解的是工程配套能力：Outbox 让订单创建、支付、取消事件可以走向异步消息，统一异常让 API 更稳定，测试证明核心业务行为，README 和运行命令让项目可以被别人快速接手。
