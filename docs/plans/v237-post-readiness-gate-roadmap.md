# Node v237 衍生计划：readiness gate 后续阶段

来源版本：Node v237 `managed audit manual sandbox connection readiness gate`。

计划状态：当前唯一有效全局计划。Node v237 已消费 Node v236 dry-run request envelope、Java v92 echo receipt、mini-kv v101 runtime no-start/no-write follow-up，确认材料已经可以进入“人工 operator window checklist”。Node v238 已完成 operator window checklist；Java v93 + mini-kv v102 已完成只读回显 / no-start-no-write 证据；Node v239 已完成 operator window evidence verification。根据最新质量诊断，v240 插入 Node route registration table quality pass，先优化 `auditRoutes.ts` 重复注册和大文件问题。Java 已继续完成 v94-v97 优化收口，mini-kv 已继续完成 v103-v106 优化收口，当前对齐点推进到 Node v241：生成默认 disabled 的 manual sandbox connection dry-run command package。Java v94-v97 与 mini-kv v103-v106 仍是优化上下文，不是写权限、连接权限或生产窗口授权。

## 当前状态

```text
Node v237：
- managed-audit-manual-sandbox-connection-readiness-gate.v1
- gateState=manual-sandbox-connection-readiness-gate-ready
- readyForOperatorWindowChecklist=true
- readyForManagedAuditSandboxAdapterConnection=false
- readyForProductionAudit=false
- readyForProductionWindow=false
- connectsManagedAudit=false
- readsManagedAuditCredential=false
- schemaMigrationExecuted=false
- automaticUpstreamStart=false

Java v92：
- 已只读回显 Node v236 envelope 六个字段
- credentialValueReadByJava=false
- actualConnectionAttemptedByJava=false
- schemaMigrationSqlExecutedByJava=false
- approvalLedgerWrittenByJava=false

mini-kv v101：
- runtime no-start/no-write follow-up ready
- read_only=true
- execution_allowed=false
- node/java/mini-kv auto-start 全部 false
- managed audit store / storage write / credential read / restore 全部 false

Node v238：
- managed-audit-manual-sandbox-connection-operator-window-checklist.v1
- checklistState=manual-sandbox-connection-operator-window-checklist-ready
- approvalItemCount=3
- checklistStepCount=8
- pauseConditionCount=8
- forbiddenOperationCount=6
- readyForJavaV93EchoReceipt=true
- readyForManagedAuditSandboxAdapterConnection=false
- credentialValueRead=false
- actualConnectionAttempted=false
- schemaMigrationRequested=false
- upstreamServiceAutoStartRequested=false

Java v93：
- operator window checklist echo receipt ready
- 只读回显 Node v238 checklist 字段
- credentialValueReadByJava=false
- schemaMigrationSqlExecutedByJava=false
- approvalLedgerWrittenByJava=false
- actualConnectionAttemptedByJava=false
- javaAutoStartForbidden=true

mini-kv v102：
- operator window no-start/no-write receipt ready
- consumerHint=Node v239 manual sandbox connection operator window evidence verification
- sourceChecklist=Node v238 manual sandbox connection operator window checklist
- read_only=true
- execution_allowed=false
- restore_execution_allowed=false
- node/java/mini-kv auto-start 全部 false
- write / admin / restore / credential / schema / managed audit state 全部 false

Node v239：
- managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1
- verificationState=manual-sandbox-connection-operator-window-evidence-verification-ready
- markerSpan=Node v238 + Java v93 + mini-kv v102
- javaEchoAccepted=true
- miniKvReceiptAccepted=true
- checklistCountsAligned=true
- boundaryFlagsAligned=true
- nodeV239BlocksRealConnection=true
- Java v94 / mini-kv v103 仅记录为优化 follow-up，不作为新业务依赖

Node v240：
- managed-audit-route-registration-table-quality-pass.v1
- qualityPassState=verified-quality-pass
- auditRoutes.ts 从 457 行降到 29 行
- JSON/Markdown route 注册表拆到 src/routes/auditJsonMarkdownRoutes.ts
- 共享注册器拆到 src/routes/auditJsonMarkdownRouteRegistrar.ts
- 共享依赖类型拆到 src/routes/auditRouteTypes.ts
- direct registerAuditJsonMarkdownRoute 调用收敛到共享注册器 1 处
- 只做质量优化，不新增业务证据依赖，不打开 managed audit connection

Java v97：
- release approval rehearsal builder chain refactor 已完成并推送
- ReleaseApprovalRehearsalResponseBuilder.java 从 460 行降到 408 行
- ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder.java 承接 managed-audit receipt 链
- OpsEvidenceService.java 保持 606 行
- 明确保持 /api/v1/ops/release-approval-rehearsal response 字段顺序、digest、read-only/no-ledger/no-SQL/no-connection 边界不变

mini-kv v106：
- command dispatch table 已完成并推送
- execute_trimmed 顶层命令名长 if 链已改为本地 dispatch table + CommandDispatchVerb switch
- command.cpp 保持命令内部逻辑原位，不改变 WAL/snapshot/runtime evidence 边界
- CMake build、ctest、真实 smoke 均已归档

Node v241：
- managed-audit-manual-sandbox-connection-dry-run-command-package.v1
- 消费 Node v239 + Node v240 + Java v97 + mini-kv v106
- 只生成默认 disabled 的 dry-run command package
- commandCount=6，全部 dryRunOnly=true、disabledByDefault=true、opensConnection=false、mutatesState=false
- 不携带 credential value，不打开 managed audit sandbox connection，不执行 schema migration，不启动 Java / mini-kv
```

## 推荐执行顺序

```text
1. Node v238：manual sandbox connection operator window checklist。已完成。
   消费 Node v237 readiness gate，生成 operator checklist：审批人、窗口开始/结束、credential handle、schema rehearsal id、rollback path、timeout、manual abort marker、暂停条件。
   仍不打开连接，不读取 credential value，不执行 schema migration，不写 managed audit state。

2. 推荐并行：Java v93 + mini-kv v102。已完成。
   - Java v93：operator window checklist echo receipt，只读回显 Node v238 checklist 字段，不写 ledger、不执行 SQL、不打开连接。
   - mini-kv v102：operator window no-start/no-write receipt，只证明窗口材料不会让 mini-kv 自动启动、写 storage、执行 restore 或读 credential。
   - Java v94 / mini-kv v103：属于优化 follow-up，可在各自窗口内推进，但不作为 v239 的新依赖，也不改变 v239 的业务证据边界。

3. Node v239：operator window evidence verification。已完成。
   消费 Node v238 + Java v93 + mini-kv v102，验证三方对 operator checklist 的字段、digest、no-write/no-start 边界一致。
   只做 verification，不做真实 sandbox connection；如果 v239 检测到 v94 / v103 的优化证据存在，也只会记录为 follow-up，不会提升为新前置条件。

4. Node v240：route registration table quality pass。已完成。
   根据质量诊断插入维护优化，拆分 auditRoutes 重复注册和大文件问题；只改路由组织结构，不改 API path、profile shape、Java/mini-kv 依赖，也不打开 managed audit connection。

5. 推荐并行优化：Java v94-v97 + mini-kv v103-v106。已完成。
   - Java v94-v97：围绕 OpsEvidenceService / static release enum / rehearsal request record / rehearsal builder chain 做质量收口，外部契约不变。
   - mini-kv v103-v106：围绕 current path hint / managed audit receipt implementation split / WAL auto compact gate / command dispatch table 做质量收口，外部行为不变。
   - 这组版本只作为 Node v241 的优化上下文，不提升为连接权限。

6. Node v241：manual sandbox connection dry-run command package。当前推进。
   消费 Node v239 + Node v240 + Java v97 + mini-kv v106，生成默认 disabled 的 dry-run command package；命令包只能携带 handle / marker / timeout 审核语义，不携带 credential value，不打开 managed audit sandbox connection。
```

## 显式质量优化项

```text
Node：
- v238 已完成 operator checklist 小闭环，没有继续膨胀旧 readiness gate。
- v237 已把“source material readiness”和“当前 UPSTREAM_ACTIONS_ENABLED 阻塞”拆开，后续版本继续保持这个模式：材料可读不等于运行开关打开。
- 继续使用 registerAuditJsonMarkdownRoute，不新增手写 JSON/Markdown 路由分支。
- 若 v239 需要消费 rolling mini-kv evidence，优先抽 shared rolling evidence consumer helper，不要在每个 service 里重复维护 current release / digest / consumer list。
- 对于只读优化版本（例如 Java v94、mini-kv v103），Node 只记录其“优化 follow-up”属性，不把它们重新写成 v239 的业务前置条件。
- v239 已把历史 v223-v238 沙箱链路对 mini-kv current runtime fixture 的 accepted evidence 扩展到 v102，避免 rolling current fixture 造成旧链路 false block；后续若继续滚动，应优先抽共享 consumer helper。
- v240 已把 auditRoutes 里的 40+ 个 JSON/Markdown route 注册拆成配置表 + 共享注册器 + 共享类型；后续新增 audit profile 必须优先加到 `src/routes/auditJsonMarkdownRoutes.ts`，不要重新把注册样板塞回 `auditRoutes.ts`。
- v240 是优化版，不消耗 Java / mini-kv 新业务 evidence；等另外两个项目完成类似优化后，再重新对齐三方证据。
- v241 已按新 route table 接入 dry-run command package route；继续保持 disabled-by-default，不新增手写 JSON/Markdown 路由样板。
- v241 消费 Java v97 / mini-kv v106 时，只读取文档、源码锚点、tag/HEAD 状态和归档证据；不构建、不启动、不测试、不修改上游项目。

Java：
- v93 只做 operator checklist echo receipt，不回写 approval ledger，不执行 SQL，不读取 credential value。
- 继续避免把新逻辑堆回 OpsEvidenceService；如字段继续增加，按 checklist field / credential boundary / schema rehearsal / rollback path 分组。
- v94-v97 已完成优化收口；Node 只把它们作为质量上下文，不把它们当作连接授权。

mini-kv：
- v102 只做 operator window no-start/no-write receipt，不做 LOAD / COMPACT / RESTORE / SETNXEX 执行。
- 继续保持 mini-kv 是 runtime evidence provider，不是 managed audit storage backend，也不是 Java order authority。
- v103-v106 已完成优化收口；Node 只把它们作为质量上下文，不把它们当作写权限、restore 权限或 audit storage 权限。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- 任何版本要打开真实 sandbox connection，但缺少 Node v238 checklist、Java v93 echo、mini-kv v102 no-start/no-write receipt。

## 一句话结论

```text
v240 已完成 Node 路由注册表优化，Java v97 与 mini-kv v106 已完成各自优化收口；v241 进入默认 disabled 的 dry-run command package，对齐三方优化结果，但仍不能直接跳到真实连接。
```
