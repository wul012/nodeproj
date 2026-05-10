# advanced-order-platform 代码讲解记录

本目录用于永久记录 `advanced-order-platform` 项目的分版本代码讲解。

讲解风格参照 `D:\C\mini-kv\代码讲解记录`：

```text
先说明文件或类的角色
再给核心流程
然后多代码引用解释关键实现
最后做一句话总结
```

## 讲解目录

```text
01-project-entry-config.md
 -> 项目入口、Maven 依赖、配置文件和演示数据初始化

02-catalog-inventory.md
 -> 商品目录、库存模型、库存锁、库存预占/扣减/释放/回补和库存流水

03-order-domain-api.md
 -> 订单领域模型、请求响应对象、Controller 和下单 API

04-order-application-flow.md
 -> OrderApplicationService 的幂等下单、商品校验、库存预占、支付、退款、履约和状态流转

05-outbox-exception-tests.md
 -> Outbox 事件表、统一异常、测试用例、运行方式和后续升级路线

06-version-2-cancel-flow.md
 -> 第二版订单取消、释放预占库存、取消事件和测试补强

07-version-3-expiration-flow.md
 -> 第三版超时未支付订单自动过期取消、调度器、配置和测试补强

08-version-4-outbox-publisher.md
 -> 第四版 Outbox 后台发布器、publishedAt 标记、调度器和测试补强

09-version-5-fulfillment-flow.md
 -> 第五版订单发货、完成履约、状态机扩展、事件和测试补强

10-version-6-status-history.md
 -> 第六版订单状态历史、操作流水、历史查询接口和测试补强

11-version-7-payment-transactions.md
 -> 第七版支付交易流水、模拟支付成功记录、支付查询接口和测试补强

12-version-8-refund-flow.md
 -> 第八版支付后退款、库存回补、退款流水、退款事件和测试补强

13-version-9-inventory-movements.md
 -> 第九版库存变更流水、库存审计查询接口和测试补强

14-version-10-postgres-flyway-testcontainers.md
 -> 第十版 PostgreSQL 配置、Flyway 迁移脚本、Hibernate validate、Testcontainers 集成测试和 Docker 配合点

15-version-11-rabbitmq-outbox-publisher.md
 -> 第十一版 RabbitMQ Outbox 真实消息发布、exchange/queue/binding、消息头元数据和 Testcontainers 集成验证

16-version-12-rabbitmq-notification-consumer.md
 -> 第十二版 RabbitMQ 通知消费者、通知消息幂等落库、通知查询接口、Flyway V2 和消费者集成测试

17-version-13-rabbitmq-retry-dlq-failed-events.md
 -> 第十三版 RabbitMQ 消费失败重试、死信队列、失败事件消息表、失败查询接口和 Testcontainers 失败链路验证
```

## 项目整体理解

`advanced-order-platform` 是一个用 Java 21 / Spring Boot 3.5.9 编写的订单交易平台雏形。

它不是完整商城，也不是一开始就拆成多个微服务，而是一个适合练高级 Java 的模块化单体：

```text
HTTP 请求
 -> Controller 接收参数
 -> ApplicationService 编排业务
 -> Repository 读写数据库
 -> Domain Entity 保存业务状态
 -> OutboxEvent 记录领域事件
 -> Controller 返回 JSON 响应
```

核心业务链路：

```text
创建订单
 -> 幂等校验
 -> 商品校验
 -> 库存预占
 -> 保存订单和订单行
 -> 写订单状态历史
 -> 写 Outbox 事件

支付订单
 -> 确认预占库存
 -> 写支付成功流水
 -> 写订单状态历史
 -> 写 Outbox 事件

退款订单
 -> 回补已扣减库存
 -> 写退款流水
 -> 写库存变更流水
 -> 写订单状态历史
 -> 写 Outbox 事件
```

第十版之后，数据库结构不再靠 Hibernate 自动更新，而是由 Flyway SQL 脚本版本化管理，再由 Hibernate validate 校验实体和表结构是否一致。

## 推荐阅读顺序

```text
README.md
 -> 先建立项目总图

01-project-entry-config.md
 -> 知道项目怎么启动、依赖从哪里来、配置如何生效、初始化数据怎么入库

02-catalog-inventory.md
 -> 理解商品和库存关系，尤其是 available / reserved / inventory_movements

03-order-domain-api.md
 -> 理解订单表、订单行、请求响应对象和 HTTP 接口

04-order-application-flow.md
 -> 重点理解下单、支付、退款、取消、发货、完成的完整业务编排

05-outbox-exception-tests.md
 -> 理解事件、异常、测试和后续可升级点

06-version-2-cancel-flow.md
 -> 理解取消订单和释放 reserved 库存

07-version-3-expiration-flow.md
 -> 理解自动扫描并取消超时未支付订单

08-version-4-outbox-publisher.md
 -> 理解 Outbox 发布器如何扫描并标记 publishedAt

09-version-5-fulfillment-flow.md
 -> 理解订单从 PAID 到 SHIPPED 再到 COMPLETED

10-version-6-status-history.md
 -> 理解订单状态变化如何记录成可查询时间线

11-version-7-payment-transactions.md
 -> 理解支付动作如何沉淀成可查询、幂等的支付交易流水

12-version-8-refund-flow.md
 -> 理解 PAID 订单如何退款，并同步回补库存、记录退款流水和事件

13-version-9-inventory-movements.md
 -> 理解库存 available/reserved 的每次变化如何记录成可查询流水

14-version-10-postgres-flyway-testcontainers.md
 -> 理解建表责任如何从 Hibernate update 迁到 Flyway，并用 PostgreSQL/Testcontainers 验证真实数据库兼容性

15-version-11-rabbitmq-outbox-publisher.md
 -> 理解 Outbox 如何从数据库发布标记升级为 RabbitMQ 真实投递，并保留默认无消息队列运行模式

16-version-12-rabbitmq-notification-consumer.md
 -> 理解 RabbitMQ 消息如何被消费者处理成通知消息，并通过 eventId 唯一键实现幂等消费

17-version-13-rabbitmq-retry-dlq-failed-events.md
 -> 理解 RabbitMQ 消费失败如何重试、进入 DLQ，并沉淀为可查询的失败事件消息
```

## 一句话总览

这个项目的核心不是“能创建订单”这么简单，而是用 Spring Boot 把下单幂等、库存一致性、库存流水、支付/退款流水、取消/过期/发货/完成状态流转、状态历史、Outbox 发布标记、RabbitMQ 真实消息投递、RabbitMQ 消费者、通知消息幂等落库、消费失败重试、死信队列、失败事件表、Flyway 数据库迁移和 Testcontainers 真实中间件验证串成一个可继续升级的后端系统。
