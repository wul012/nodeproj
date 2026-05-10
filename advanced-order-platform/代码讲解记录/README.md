# advanced-order-platform 代码讲解记录

本目录用于永久记录对 `advanced-order-platform` 项目的分次代码讲解。

讲解风格参照 `D:\C\mini-kv\代码讲解记录`：

```text
先说明文件或类的角色
再给核心流程
然后逐段解释代码
最后做一句话总结
```

## 讲解目录

```text
01-project-entry-config.md
 -> 项目入口、Maven 依赖、配置文件和演示数据初始化

02-catalog-inventory.md
 -> 商品目录、库存模型、悲观锁、库存预占和确认扣减

03-order-domain-api.md
 -> 订单领域模型、请求响应对象、Controller 和下单 API

04-order-application-flow.md
 -> OrderApplicationService：幂等下单、商品校验、库存预占、支付流程

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
```

## 项目整体理解

`advanced-order-platform` 是一个用 Java 21 / Spring Boot 3.5.9 编写的订单交易平台雏形。

它现在不是完整商城，也不是一上来就拆成多个微服务，而是一个适合练高级 Java 的模块化单体：

```text
HTTP 请求
 -> Controller 接收参数
 -> ApplicationService 编排业务
 -> Repository 读写数据库
 -> Domain Entity 保存业务状态
 -> OutboxEvent 记录领域事件
 -> Controller 返回 JSON 响应
```

最核心的业务链路是下单：

```text
POST /api/v1/orders
 -> 读取 Idempotency-Key
 -> 校验请求参数
 -> 查询是否已经用同一个幂等键下过单
 -> 聚合同一商品的购买数量
 -> 查询商品是否存在且启用
 -> 锁定库存记录
 -> available 减少，reserved 增加
 -> 创建 SalesOrder 和 OrderLine
 -> 保存订单
 -> 写入 OrderCreated Outbox 事件
 -> 返回订单详情
```

支付链路是：

```text
POST /api/v1/orders/{orderId}/pay
 -> 查询订单
 -> 如果已经 PAID，直接返回
 -> 汇总订单行里的商品数量
 -> 锁定库存记录
 -> reserved 减少
 -> 订单状态从 CREATED 改成 PAID
 -> 写入 OrderPaid Outbox 事件
 -> 返回订单详情
```

从代码职责看：

```text
pom.xml
 -> 定义 Spring Boot、JPA、Web、Validation、Actuator、H2、PostgreSQL、测试依赖

application.yml
 -> 默认使用 H2 内存数据库，开启 H2 Console、JPA ddl-auto、Actuator 健康检查

DemoDataInitializer
 -> 应用启动后插入 3 个商品和对应库存，方便直接调用 API

catalog 包
 -> 商品模型、商品仓库、商品列表接口

inventory 包
 -> 库存模型、锁库存查询、预占库存、确认扣减

order 包
 -> 订单模型、订单行、请求响应 DTO、状态历史、下单、支付、取消、发货、完成、过期扫描和订单业务编排

outbox 包
 -> 记录订单创建、支付、取消、过期、发货、完成事件，并用后台发布器标记 publishedAt

common 包
 -> 业务异常和统一错误响应

src/test
 -> 验证幂等、库存预占、支付确认、库存不足等核心行为
```

## 推荐阅读顺序

第一次阅读建议按这个顺序：

```text
README.md
 -> 先建立项目总图

01-project-entry-config.md
 -> 知道项目怎么启动、依赖从哪里来、初始数据怎么进库

02-catalog-inventory.md
 -> 明白商品和库存的关系，尤其是 available / reserved 的意义

03-order-domain-api.md
 -> 明白订单表、订单行、请求响应对象和 HTTP 接口

04-order-application-flow.md
 -> 重点理解下单与支付的完整业务编排

05-outbox-exception-tests.md
 -> 理解事件、异常、测试和后续可升级点

06-version-2-cancel-flow.md
 -> 理解第二版如何取消订单并释放 reserved 库存

07-version-3-expiration-flow.md
 -> 理解第三版如何自动扫描并取消超时未支付订单

08-version-4-outbox-publisher.md
 -> 理解第四版如何扫描未发布 Outbox 事件并标记发布完成

09-version-5-fulfillment-flow.md
 -> 理解第五版如何把订单从 PAID 推进到 SHIPPED，再推进到 COMPLETED

10-version-6-status-history.md
 -> 理解第六版如何把订单每次状态变化记录为可查询时间线
```

## 一句话总览

一句话总结：这个项目的核心不是“能创建订单”这么简单，而是用 Spring Boot 把下单幂等、库存一致性、支付/取消/过期/发货/完成状态流转、状态历史、Outbox 发布标记和事件驱动雏形串成一个可以继续升级的后端系统。
