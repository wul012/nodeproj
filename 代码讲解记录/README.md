# OrderOps Node 代码讲解记录

本目录用于永久记录对 `orderops-node` 项目的分次代码讲解。

讲解风格参考 `mini-kv` 的 `代码讲解记录`，并从现在开始以 Java 项目的
`D:\javaproj\advanced-order-platform\代码讲解记录\49-version-45-ops-evidence.md`
作为主要版式规则。

```text
先说明文件或模块的角色
再给核心流程
然后引用实际代码逐段解释
最后做一句话总结
```

本项目的讲解会尽量多引用真实代码。每篇都会围绕当前项目里的实际文件展开，而不是只讲概念。

## 代码讲解版式规则

后续每个 Node 版本的代码讲解记录，默认采用 Java v45 ops evidence 的教学型结构。除非该版本确实很小，否则不要只写“改了什么”，要说明“为什么这样设计、字段对控制面意味着什么、测试防住了什么回归”。

推荐结构：

```text
1. 本版目标与系统定位
   - 说明本版在 Node 控制面 / Java 交易核心 / mini-kv 基础设施中的位置。
   - 明确它是只读观察、证据归档、预演、审批，还是可执行入口。

2. 入口路由或入口函数
   - 引用真实 route / controller / service entry。
   - 说明请求是否接收 body、operator、确认词、idempotency key 等。
   - 如果没有写入口，要明确“不承载写操作”。

3. 响应模型与核心字段
   - 解释关键字段，例如 readOnly、executionAllowed、ready、blockers、warnings、digest。
   - 说明这些字段给 Dashboard、CI、归档或后续 Node 版本怎么使用。

4. 服务层核心逻辑
   - 引用实际 service 代码。
   - 按数据来源、聚合规则、检查规则、摘要生成顺序讲清楚。
   - 不只贴代码，要解释每段代码在业务边界里的意义。

5. 阻断、预警与安全边界
   - 区分 blocker、warning、recommendation。
   - 明确本版不会做的事，例如不执行 Java replay、不执行 mini-kv 写命令、不读取 secret、不部署。

6. 测试覆盖
   - 引用具体测试文件和关键断言。
   - 说明这些断言保障的契约，例如只读不变、执行关闭、digest 稳定、CI 环境可运行。

7. 一句话总结
   - 用一段话总结本版给系统增加了什么能力，以及下一步承接什么。
```

最低要求：

```text
- 必须引用真实代码片段或真实文件路径。
- 必须解释关键字段的控制面语义。
- 必须说明只读/执行边界。
- 必须说明测试覆盖的目的。
- 不能只写接口列表或流水账。
```

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

22-ops-promotion-review-v18.md
 -> 第十八版本地 promotion review：综合 readiness、runbook、checkpoint 和 baseline drift 输出推进决策

23-ops-promotion-decision-v19.md
 -> 第十九版本地 promotion decision ledger：固化 promotion review、reviewer/note 和 SHA-256 摘要

24-ops-promotion-decision-verification-v20.md
 -> 第二十版本地 promotion decision verification：重新计算 decision digest，确认记录是否仍然可复核

25-ops-promotion-evidence-report-v21.md
 -> 第二十一版本地 promotion evidence report：把 decision 和 verification 汇总成 JSON/Markdown 证据包

26-ops-promotion-ledger-integrity-v22.md
 -> 第二十二版本地 promotion ledger integrity：复算所有 decision digest，并生成滚动 ledger root digest

27-ops-promotion-integrity-report-v23.md
 -> 第二十三版本地 promotion integrity report：把 ledger integrity 渲染成 Markdown，方便人工审阅和归档

28-ops-promotion-archive-bundle-v24.md
 -> 第二十四版本地 promotion archive bundle：把最新 evidence 和 ledger integrity 汇总成 JSON/Markdown 归档包

29-ops-promotion-archive-manifest-v25.md
 -> 第二十五版本地 promotion archive manifest：为归档包生成 artifact digest 和 manifest digest

30-ops-promotion-archive-verification-v26.md
 -> 第二十六版本地 promotion archive verification：复核 manifest digest、artifact digest 和归档一致性

31-ops-promotion-archive-attestation-v27.md
 -> 第二十七版本地 promotion archive attestation：把 manifest、verification、decision 和 evidence source 封成交接 seal digest

32-ops-promotion-archive-attestation-verification-v28.md
 -> 第二十八版本地 promotion archive attestation verification：复核 seal digest、verification digest 和 handoff seal 一致性

33-ops-promotion-handoff-package-v29.md
 -> 第二十九版本地 promotion handoff package：汇总归档链路附件、生成 package digest 和 Markdown 交接包

34-ops-promotion-handoff-package-verification-v30.md
 -> 第三十版本地 promotion handoff package verification：复核 package digest、附件 digest 和交接包一致性

56-upstream-overview-v52.md
 -> 第五十二版统一上游观察台：把 Java health 和 mini-kv HEALTH/STATSJSON 汇总成只读 overview

57-java-ops-overview-v53.md
 -> 第五十三版 Java ops overview 接入：读取 Java v36 业务概览，并在接口不可用时保持 fallback

58-minikv-infojson-v54.md
 -> 第五十四版 mini-kv INFOJSON 接入：读取 mini-kv v45 元信息，并在旧可执行文件未支持时保持 degraded fallback

59-upstream-risk-summary-v55.md
 -> 第五十五版上游风险摘要：读取 Java failed-event summary 和 mini-kv COMMANDSJSON 命令分级

60-dashboard-upstream-overview-v56.md
 -> 第五十六版 Dashboard 上游观察详情面板：把 v53-v55 只读信号整理成可扫描页面

61-java-replay-readiness-v57.md
 -> 第五十七版 Java 失败事件 replay readiness 接入：Node 只读代理 Java v38 readiness，并在 Dashboard 提供查询入口

62-minikv-key-inventory-v58.md
 -> 第五十八版 mini-kv KEYSJSON 接入：Node 只读代理 key inventory，并在 Dashboard 展示 prefix / count / truncated / keys

63-operation-preflight-v59.md
 -> 第五十九版 Operation preflight evidence bundle：汇总 intent、policy、confirmation、dispatch history、Java readiness 和 mini-kv evidence

64-operation-preflight-report-v60.md
 -> 第六十版 Preflight Markdown report + digest：把 preflight bundle 渲染成可读报告、SHA-256 摘要和 verification

65-operation-execution-preview-v61.md
 -> 第六十一版 Operation execution preview：接入 Java replay simulation 和 mini-kv EXPLAINJSON，生成执行前预演

66-operation-approval-request-v62.md
 -> 第六十二版 Operation approval request ledger：把 preflight digest 和 execution preview digest 绑定成本地审批请求记录

67-operation-approval-decision-v63.md
 -> 第六十三版 Approval decision record：记录 reviewer approve/reject、decision digest 和 request 状态更新但不触发真实执行

68-operation-approval-evidence-v64.md
 -> 第六十四版 Approval evidence report + verification：把 request 与 decision 固化成可归档证据报告并复核 digest 链路

69-upstream-approval-evidence-v65.md
 -> 第六十五版上游审批证据接入：把 Java v40 approval-status 和 mini-kv v49 side_effects 纳入 approval evidence report

70-operation-approval-handoff-bundle-v66.md
 -> 第六十六版 Approval evidence handoff bundle：把 request、decision、evidence、verification 和 upstream evidence 打包成可归档交接包

71-digest-aware-upstream-evidence-v67.md
 -> 第六十七版 Digest-aware upstream evidence verification：接入 Java approvalDigest 和 mini-kv command_digest / side_effect_count 检查

72-operation-approval-execution-gate-preview-v68.md
 -> 第六十八版 Approval execution gate preview：基于 handoff bundle 判断执行门禁状态，但仍只返回 preview，不真实触碰上游

73-operation-approval-execution-gate-archive-v69.md
 -> 第六十九版 Execution gate archive record：把 gate preview 固化成本地归档记录，记录 gateDigest、bundleDigest 和 reviewer note

74-operation-approval-execution-gate-archive-verification-v70.md
 -> 第七十版 Execution gate archive verification：复核 archive digest、gate digest、bundle digest 和 request/decision ledger 对齐

75-execution-contract-evidence-v71.md
 -> 第七十一版 Execution contract evidence：接入 Java replay-execution-contract 与 mini-kv CHECKJSON，只读校验执行契约证据

76-execution-contract-archive-bundle-v72.md
 -> 第七十二版 Execution contract archive bundle：把 archive、gate、handoff、verification、Java contractDigest 和 mini-kv CHECKJSON 组织成可归档引用链

77-execution-contract-diagnostics-v73.md
 -> 第七十三版 Execution contract mismatch diagnostics：输出 archive、gate、Java contract、mini-kv CHECKJSON 不一致的具体 code 和字段定位

78-fixture-driven-smoke-v74.md
 -> 第七十四版 Fixture-driven smoke：读取 Java v43 与 mini-kv v52 稳定样本，生成 fixture report 并驱动本地 smoke

79-fixture-drift-diagnostics-v75.md
 -> 第七十五版 Fixture drift diagnostics：检查 fixture 字段、类型、digest 和 diagnostics 映射是否漂移
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
