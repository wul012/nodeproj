# v2215-v2218 优雅度收敛批次

## 目标

这一批不增加业务功能、路由、治理报告或执行权限，只处理四个已经被机械基线点名的
装配热点。目标不是把长代码搬到更多文件，而是把“稳定数据、领域判断、组合顺序”分开，
让后续修改只触碰真正拥有该知识的边界。

批次开始基线为：大文件 85、长函数 110、复杂函数 228、导入环 0。若四版均按预期
完成，至少删除 7 条长函数债务和 2 条复杂函数债务，目标收紧到 85 / 103 / 226 / 0。
任何新债务、阈值放宽或字节漂移都视为失败。

## Step 0 对账

- Node：`ec59753d`，工作树干净并与 `nodeproj/master` 同步；v2211-v2214 的
  Linux 修复 CI `29754499031` 已通过 575 文件 / 1748 测试、构建和 smoke。
- Java：`fd3c0cc1`，v1878 归档交接渲染器收尾已提交；本批借鉴其“组合根只负责
  排序，叶子模块拥有行为”的做法，不消费新 Java 契约。
- mini-kv：`10b392a0` / v1674；`治理计划/readme-exhibition-brief.md` 有用户改动，
  本批只读且不触碰。借鉴 v1673-v1674 的“有序清单、双向集合校验、未知项失败”做法。
- 三项目可以并行。Node 不需要新鲜兄弟项目证据，不是 Java 或 mini-kv 的前置批准方。

## 需求-证据矩阵

| 要求 | 实现边界 | 机械证据 | 状态 |
| --- | --- | --- | --- |
| 两套凭据策略不再手写超长布尔链 | 类型化字段清单 + 共享全字段判定 + 小型语义谓词 | 两份冻结 profile 字节/摘要、focused tests、基线收紧 | 待 v2215 |
| `buildApp` 只表达应用装配意图 | shell、运行时依赖、钩子、路由顺序分层 | 路由清单、钩子行为、访问审计、现有应用测试 | 待 v2216 |
| 28 条 promotion 路由由单一清单拥有 | 有序 route manifest + 分阶段工件流水线 | 路由方法/路径/顺序、profile parity、focused route tests | 待 v2217 |
| 三个批准输入模板由数据定义 | 模板定义与验证行为分离，目录 facade 稳定 | 模板顺序/键/摘要/目标路径、验证器和 live gate tests | 待 v2218 |
| 文档先于最终验证 | 每版解释 + 中文代码讲解 | 每篇 >=3000 中文字符且可扫描门通过 | 每版阻塞项 |
| 只在批次末跑完整 CI | 每版 focused/typecheck/static；v2218 后 full/build/smoke/CI | 一次最终 Node Evidence run | 批次阻塞项 |

## 新文件族设计说明

1. `credentialPolicy`：字段清单只描述“哪些布尔边界必须是什么值”；共享 helper
   只执行类型安全、空清单失败的逐字段判定；原 policy 保留领域语义与输出顺序。
2. `app`：依赖工厂只创建运行时对象，hook 模块只安装生命周期行为，route 模块
   只维护显式注册顺序；`buildApp` 是唯一组合根。
3. `promotionArchive`：route manifest 只拥有方法/路径/loader/renderer 配对；artifact
   stages 只拥有有向构建顺序；现有 route facade 保留公开入口。
4. `approvalTemplates`：definition 文件只拥有稳定模板数据；catalog 负责有序聚合与
   校验入口；消费者继续从现有公开文件导入。

以上每个家族均严格区分数据和行为；不得为降低指标而制作一行转发器或镜像 wrapper。

## v2215：凭据策略清单化

处理：

- `...DisabledFakeHarnessContractUpstreamEchoVerificationPolicy.ts|createChecks`
- `...ImplementationPlanUpstreamEchoVerificationChecks.ts|createChecks`
- `...ImplementationPlanUpstreamEchoVerificationChecks.ts|collectProductionBlockers`

实现约束：

- 在 `liveProbeReportUtils` 中提供泛型布尔字段判定；字段必须受 `keyof` 约束，空清单
  返回 false，避免“没有规则却通过”。
- 把纯布尔边界写成只读字段清单；涉及长度、摘要、集合、决策文本的规则仍保留具名
  语义谓词，不把领域逻辑压成难读表达式。
- blocker 复用已有 `collectFailedReportRules`，顺序和文案必须与旧实现一致。
- 不改变 checks 的键顺序、profile 状态、summary、recommendations 或安全边界。

冻结 oracle（强制历史回退，`generatedAt=2026-07-21T00:00:00.000Z`）：

- disabled harness：ready、29 checks；JSON 32,490 bytes，
  `e6ba14bd44a3870774a00a6aaec125724dd7788e978937c596e560c24e748838`；
  Markdown 9,456 bytes，
  `90cfc91d1b72a749303f3cd4b1793d25014f4b4f2eb2f98ba170844579f84805`。
- implementation plan：ready、28 checks；JSON 29,872 bytes，
  `06f95e701f098644032194e848bc7636d35f7a7bbfc361e74109febcee5ea734`；
  Markdown 8,182 bytes，
  `f56f269e4bcf5b17c1eca178b7427c8d51a180a2a5bd6ed9655cd3248ed9eb70`。

预期基线：85 / 107 / 226 / 0。

## v2216：应用装配分层

处理 `src/app.ts|buildApp`。保持 Fastify 构造、错误映射、访问控制、弱映射审计上下文、
计时 hook、运行时 store/client 创建以及全部路由注册顺序不变。

必须先固化并验证：

- route 注册序列从 dashboard 到 mini-kv 完全一致；
- `onRequest`、`preHandler`、`onResponse` 的相对时序和共享上下文不变；
- access enforcement 开关、401/错误响应、审计耗时写入不变；
- `buildApp` 成为可一屏阅读的组合根，而不是把同一长函数换一个文件名。

预期基线：85 / 106 / 226 / 0。

## v2217：归档路由清单与工件阶段

处理 `opsPromotionArchiveRoutes.ts` 的 28 次同构注册和 152 行工件构建链。

- route manifest 必须显式、只读、有序，验证 method/path 唯一且每个 selector/renderer
  配对完整；未知或重复项失败。
- 构建链拆成 archive、handoff/release、deployment/receipt 三个具名阶段，类型使后一
  阶段只能消费前一阶段产物。
- 公开 `registerOpsPromotionArchiveRoutes` 和响应对象保持不变；route/file 数不得增长。

预期基线：85 / 104 / 226 / 0。

## v2218：批准输入模板目录

处理 `createRuntimeExecutionApprovalInputTemplates`。三个模板按 node window、operator
record、cross-project packet 的既有顺序聚合；所有键、摘要、目标路径和说明文本原样保留。

- 数据定义不得包含运行时分支；验证器不得复制模板正文。
- catalog 对模板 id、顺序、目标路径和字段语义做 fail-closed 校验。
- 现有 validator、canonical value validation、live read gate 的导入路径和行为不变。

预期基线：85 / 103 / 226 / 0。

## 每版交付物

- `d/<version>/evidence/`：前后基线、oracle、focused/typecheck/static 命令与结果。
- `d/<version>/解释/`：为何拆、数据/行为边界、失败条件、并行说明。
- `代码讲解记录_生产雏形阶段3/r2000/2185..2188-*.md`：中文、每篇至少
  3000 中文字符，围绕真实实现与验证讲解，不设 `Detailed Walkthrough` 巨型段落。
- 无 HTML/UI 变化，截图不适用；解释中记录具体省略原因。
- 每版独立 commit 和 lightweight tag，批次末统一 push。

## 验证节奏

每版执行 focused tests、typecheck、相关 static gates、maintainability census 和 walkthrough
质量门。v2218 后一次执行零警告 lint、全部静态门、最多 4 workers 的有界全量分片、
独立 test discovery、build、历史回退 HTTP smoke、清理、push/tags 和一次远端 CI。

## 失败条件

- 修改冻结预期、fixture 或产品字节来让重构通过。
- helper 接受字符串字段名而失去类型约束，或空清单被判为通过。
- route/template manifest 允许重复、缺项、未知项或静默重排。
- 新文件只是转发旧长函数，职责没有缩小。
- 新增任何功能、路由、权限、网络连接、写路径或兄弟项目改动。
- 放宽 ratchet、增加任何已治理债务或制造导入环。
