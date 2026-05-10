# OrderOps Node 代码讲解记录

本目录用于永久记录对 `orderops-node` 项目的分次代码讲解。

讲解风格参考 `mini-kv` 的 `代码讲解记录`：

```text
先说明文件或模块的角色
再给核心流程
然后引用实际代码逐段解释
最后做一句话总结
```

本项目的讲解会尽量多引用真实代码。每篇都会围绕当前项目里的实际文件展开，而不是只讲概念。

## 讲解目录

```text
01-project-entry-config.md
 -> 项目入口、配置加载、Fastify 应用组装和统一错误处理

02-upstream-clients.md
 -> Java 订单平台 HTTP client 和 mini-kv TCP client

03-routes-status-flow.md
 -> 路由层、状态采样服务和 SSE 实时状态流

04-dashboard-ui.md
 -> 内置 Dashboard 页面、布局、按钮事件和 EventSource 刷新

05-tests-build-docs.md
 -> package.json、TypeScript 配置、Vitest 测试、README 和项目边界

06-audit-log-v2.md
 -> 第二版审计日志：AuditLog、请求 hook、审计 API、Dashboard 审计面板和测试

07-upstream-probe-safety-v3.md
 -> 第三版上游探测安全开关：UPSTREAM_PROBES_ENABLED、disabled 状态、Dashboard 标识和测试

08-upstream-action-gate-v4.md
 -> 第四版上游动作闸门：UPSTREAM_ACTIONS_ENABLED、代理路由 403、防误点 Dashboard 和 runtime config

09-action-planner-v5.md
 -> 第五版本地动作计划：action catalog、dry-run plan、Dashboard 预检和不触碰上游的测试

10-operation-intents-v6.md
 -> 第六版操作意图流：本地 RBAC、确认短语、intent 状态机和不执行上游的控制面流程

11-operation-timeline-v7.md
 -> 第七版操作时间线：intent event feed、单个 intent timeline、确认失败追踪和 Dashboard 查询入口

12-operation-idempotency-v8.md
 -> 第八版操作意图幂等键：Idempotency-Key、重复提交 replay、冲突保护和 timeline 事件

13-operation-dispatch-v9.md
 -> 第九版本地 dispatch ledger：confirmed intent 的 dry-run 派发、rejected 记录和 timeline 事件

14-mutation-rate-limit-v10.md
 -> 第十版本地 mutation 限流：intent/dispatch POST 防重复刷、429 错误、限流 header 和 runtime config

15-ops-summary-v11.md
 -> 第十一版本地运营指标汇总：audit、intent、dispatch、timeline event、rate limit 和 Dashboard 指标卡

16-ops-readiness-v12.md
 -> 第十二版本地 readiness gate：基于 ops summary 的 blocker/warning/pass 检查和 Dashboard 就绪度指标

17-ops-handoff-report-v13.md
 -> 第十三版本地 handoff report：把 sources、summary、readiness、最近操作记录汇总成 JSON/Markdown 交接报告

18-ops-runbook-v14.md
 -> 第十四版本地 runbook checklist：把 readiness/summary 信号转换成 blocked/todo/done/info 预检步骤

19-ops-checkpoints-v15.md
 -> 第十五版本地 checkpoint ledger：捕获 summary/readiness/runbook 快照并生成 SHA-256 摘要

20-ops-checkpoint-diff-v16.md
 -> 第十六版本地 checkpoint diff：比较两个 checkpoint 的决策、signals、runbook totals 和步骤状态变化

21-ops-baseline-v17.md
 -> 第十七版本地 baseline tracking：把 checkpoint 设为基线，并将最新 checkpoint 与基线做 drift 对比
```

## 项目整体理解

`orderops-node` 是一个 Node.js / TypeScript 控制面项目。

它不是重新实现订单系统，也不是重新实现 KV 存储。它的定位是：

```text
Node 控制台 / 网关
 -> 连接 Java 订单平台
 -> 连接 C++ mini-kv
 -> 给浏览器提供统一 API 和实时状态页面
```

核心链路是：

```text
浏览器 Dashboard
 -> Fastify 路由
 -> OrderPlatformClient 或 MiniKvClient
 -> Java Spring Boot 服务或 C++ mini-kv TCP 服务
 -> 返回 JSON 给浏览器
```

状态观测链路是：

```text
浏览器 EventSource
 -> GET /api/v1/events/ops
 -> StatusRoutes 建立 SSE 长连接
 -> OpsSnapshotService 周期采样
 -> 同时 probe Java 和 mini-kv
 -> 推送 snapshot 事件给页面
```

项目目录大致是：

```text
src/app.ts
 -> 创建 Fastify 实例、注入 client、注册路由

src/server.ts
 -> 加载配置、启动 HTTP 服务、处理 SIGINT / SIGTERM

src/config.ts
 -> 从环境变量读取端口、上游地址、超时时间

src/clients/
 -> 封装对 Java HTTP 服务和 mini-kv TCP 服务的访问

src/routes/
 -> 对外暴露 HTTP API

src/services/
 -> 聚合业务状态采样

src/ui/
 -> 生成内置 Dashboard HTML

test/
 -> Vitest 单元测试
```

一句话总结：`orderops-node` 的 V1 目标是把已有 Java / C++ 两个练手项目串成一个可操作、可观测、可扩展的 Node 控制台雏形。
