# Advanced Order Platform

一个面向高级 Java 练手的订单交易平台雏形。当前版本先采用模块化单体架构，把核心业务闭环跑通：

- 商品目录查询
- 库存锁定与扣减
- 幂等下单
- 订单支付模拟
- 订单取消与预占库存释放
- 订单发货与完成履约流转
- 订单状态历史与操作流水查询
- 超时未支付订单自动过期取消
- Outbox 事件表
- Outbox 后台发布标记
- Actuator 健康检查
- H2 本地快速启动，PostgreSQL 配置预留

## Tech Stack

- Java 21
- Spring Boot 3.5.9
- Spring MVC
- Spring Data JPA
- Bean Validation
- H2 / PostgreSQL
- Maven

## Run

```powershell
mvn spring-boot:run
```

默认地址：

```text
http://localhost:8080
```

健康检查：

```powershell
Invoke-RestMethod http://localhost:8080/actuator/health
```

## API Quick Start

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

发货订单：

```powershell
Invoke-RestMethod -Method Post http://localhost:8080/api/v1/orders/1/ship
```

完成订单：

```powershell
Invoke-RestMethod -Method Post http://localhost:8080/api/v1/orders/1/complete
```

查询订单状态历史：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/orders/1/history
```

查看 Outbox 事件：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/outbox/events
```

## Order Expiration

默认配置会每 60 秒扫描一次超过 15 分钟仍未支付的 `CREATED` 订单，并自动取消：

```yaml
order:
  expiration:
    enabled: true
    unpaid-timeout: PT15M
    scan-delay-ms: 60000
```

本地调试时可以临时缩短：

```powershell
mvn spring-boot:run `
  -Dspring-boot.run.arguments="--order.expiration.unpaid-timeout=PT5S --order.expiration.scan-delay-ms=1000"
```

## Outbox Publisher

默认配置会每 60 秒扫描一次未发布的 Outbox 事件，并把 `publishedAt` 标记为当前时间：

```yaml
outbox:
  publisher:
    enabled: true
    scan-delay-ms: 60000
```

本地调试时可以临时缩短：

```powershell
mvn spring-boot:run `
  -Dspring-boot.run.arguments="--outbox.publisher.scan-delay-ms=1000"
```

## Architecture Direction

当前代码按业务边界分包：

- `catalog`: 商品目录
- `inventory`: 库存与并发控制
- `order`: 订单编排、幂等、防重复提交、支付、取消、发货、完成、状态历史和超时过期状态流转
- `outbox`: 事件表和后台发布标记，为后续 Kafka/RabbitMQ 做准备
- `common`: 异常与统一错误响应

后续建议按这个顺序升级：

1. 接入 Redis：缓存商品、热点库存、限流。
2. 接入 Kafka/RabbitMQ：把 Outbox 发布器从“标记已发布”升级为真实消息发送。
3. 增加支付、防欺诈、优惠券模块。
4. 引入 Testcontainers 做数据库/消息队列集成测试。
5. 接入 OpenTelemetry、Prometheus、Grafana。
6. 从模块化单体拆分为订单、库存、支付服务。
