# Advanced Order Platform

一个面向高级 Java 练手的订单交易平台雏形。当前采用模块化单体架构，重点训练 Spring Boot 业务建模、事务编排、库存一致性、审计流水、Outbox 和数据库工程化。

## 当前能力

- 商品目录查询
- 幂等下单
- 库存预占、扣减、释放、退款回补
- 库存变更流水查询
- 订单支付模拟
- 支付交易流水查询
- 支付后退款
- 订单取消
- 未支付订单自动过期取消
- 订单发货与完成
- 订单状态历史查询
- Outbox 事件表
- Outbox 后台发布标记
- RabbitMQ Outbox 真实消息发布
- RabbitMQ 通知消费者
- 通知消息幂等落库与查询
- RabbitMQ 消费失败重试和死信队列
- 失败事件消息落库与查询
- Actuator 健康检查
- Flyway 数据库迁移
- H2 本地快速启动
- PostgreSQL profile
- RabbitMQ profile
- Testcontainers PostgreSQL / RabbitMQ 集成测试入口

## Tech Stack

- Java 21
- Spring Boot 3.5.9
- Spring MVC
- Spring Data JPA
- Bean Validation
- Spring AMQP
- Flyway
- H2 / PostgreSQL
- RabbitMQ
- Testcontainers
- Maven

## Run

默认使用 H2 内存数据库：

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

## PostgreSQL Run

本地启动 PostgreSQL：

```powershell
docker compose -f compose.yaml up -d postgres
```

使用 PostgreSQL profile 启动应用：

```powershell
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

打包后启动：

```powershell
java -jar target\advanced-order-platform-0.1.0-SNAPSHOT.jar --spring.profiles.active=postgres
```

默认连接信息在 [application-postgres.yml](<D:/javaproj/advanced-order-platform/src/main/resources/application-postgres.yml:1>) 中，可通过环境变量覆盖：

```text
DB_URL
DB_USERNAME
DB_PASSWORD
```

## RabbitMQ Run

本地启动 RabbitMQ：

```powershell
docker compose -f compose.yaml up -d rabbitmq
```

RabbitMQ 管理页面：

```text
http://localhost:15672
```

默认账号密码：

```text
order_app / order_app
```

启用 RabbitMQ Outbox 发布：

```powershell
mvn spring-boot:run -Dspring-boot.run.profiles=rabbitmq
```

同时使用 PostgreSQL 和 RabbitMQ：

```powershell
docker compose -f compose.yaml up -d postgres rabbitmq
mvn spring-boot:run -Dspring-boot.run.profiles=postgres,rabbitmq
```

RabbitMQ profile 会启用：

```yaml
outbox:
  rabbitmq:
    enabled: true
    exchange: order-platform.outbox
    queue: order-platform.outbox.events
    routing-key-prefix: orders
    dead-letter-exchange: order-platform.outbox.dlx
    dead-letter-queue: order-platform.outbox.events.dlq
    dead-letter-routing-key: orders.dead-letter

notification:
  rabbitmq:
    enabled: true
    retry:
      max-attempts: 3
      initial-interval-ms: 200
      multiplier: 2.0
      max-interval-ms: 1000
```

## API Quick Start

查询商品：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/products
```

查询商品库存流水：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/inventory/products/1/movements
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

查询订单支付流水：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/orders/1/payments
```

退款订单：

```powershell
Invoke-RestMethod -Method Post http://localhost:8080/api/v1/orders/1/refund
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

查询通知消息：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/notifications
```

查询某个订单的通知消息：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/notifications/orders/1
```

查询失败事件消息：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/failed-events
```

## Database Migration

第十版开始，项目使用 Flyway 管理数据库结构，Hibernate 只做结构校验：

```yaml
spring:
  flyway:
    locations: "classpath:db/migration/{vendor}"
  jpa:
    hibernate:
      ddl-auto: validate
```

默认 H2 执行：

```text
src/main/resources/db/migration/h2/V1__initial_schema.sql
src/main/resources/db/migration/h2/V2__notification_messages.sql
src/main/resources/db/migration/h2/V3__failed_event_messages.sql
```

PostgreSQL profile 执行：

```text
src/main/resources/db/migration/postgresql/V1__initial_schema.sql
src/main/resources/db/migration/postgresql/V2__notification_messages.sql
src/main/resources/db/migration/postgresql/V3__failed_event_messages.sql
```

如果 Docker 未启动，Testcontainers 的 PostgreSQL / RabbitMQ 集成测试会自动跳过；启动 Docker 后重新执行 `mvn test` 即可跑真实中间件验证。

## Order Expiration

默认每 60 秒扫描一次超过 15 分钟仍未支付的 `CREATED` 订单，并自动取消：

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

默认每 60 秒扫描一次未发布的 Outbox 事件。普通模式下只把 `publishedAt` 标记为当前时间；启用 `rabbitmq` profile 后，会先发送 RabbitMQ 消息，再标记 `publishedAt`：

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

```text
catalog
 -> 商品目录

inventory
 -> 库存、并发控制、库存预占/扣减/释放/回补、库存变更流水

order
 -> 订单模型、幂等下单、支付、退款、取消、发货、完成、状态历史、超时过期

payment
 -> 支付成功和退款交易流水

outbox
 -> 事件表、事件查询、后台发布标记、RabbitMQ 真实消息发布

notification
 -> RabbitMQ 订单事件消费者、通知消息、幂等落库、消费失败重试、死信记录、通知和失败事件查询接口

common
 -> 业务异常和统一错误响应
```

后续建议升级顺序：

1. 增加失败事件重放接口，把可恢复的 failed_event_messages 重新投递回业务 exchange。
2. 接入 Redis，训练热点商品缓存、限流、幂等 token。
3. 增加登录、鉴权和管理端接口。
4. 接入 OpenTelemetry、Prometheus、Grafana。
5. 增加并发库存压测和更多 Testcontainers 多中间件集成测试。
