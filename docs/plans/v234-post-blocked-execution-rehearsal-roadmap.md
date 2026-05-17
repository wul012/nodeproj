# Node v234 衍生计划：blocked execution rehearsal 后续阶段

来源版本：Node v234 `managed audit manual sandbox connection blocked execution rehearsal`。

计划状态：已完成并收口。Node v234 已消费 Node v233、Java v90、mini-kv v99，生成 blocked execution rehearsal；只模拟阻断矩阵，不打开 managed audit 连接，不读取 credential value，不执行 schema migration，不写 Java / mini-kv / audit 状态。Java v91 + mini-kv v100 已推荐并行完成，Node v235 已完成 manual sandbox connection precondition intake，并把 v223-v235 旧沙箱链路继续扩展为可消费 mini-kv current runtime fixture v100 的滚动证据。下一阶段由 `v235-post-precondition-intake-roadmap.md` 接续。

## 当前状态

```text
Node v234：
- managed audit manual sandbox connection blocked execution rehearsal ready
- markerSpan=Node v233 + Java v90 + mini-kv v99
- simulatedAttemptCount=8
- blockedAttemptCount=8
- actualExecutionAttemptCount=0
- readyForManagedAuditSandboxAdapterConnection=false
- connectsManagedAudit=false
- readsManagedAuditCredential=false
- schemaMigrationExecuted=false
- automaticUpstreamStart=false
- readyForProductionAudit=false
- readyForProductionWindow=false

Java v90：
- ContextHeaderField.normalizeValue / normalized / addMissingWarning 已完成
- release approval context normalization 仍保持 no ledger / no SQL / no credential value / no managed audit connection

mini-kv v99：
- execute_with_wal helper 回归补强已完成
- runtime smoke current fixture=0.99.0 / v99
- read_only=true、execution_allowed=false、restore_execution_allowed=false、order_authoritative=false

Java v91：
- release approval sandbox connection precondition receipt 已完成
- owner approval artifact、credential handle review、schema rehearsal evidence、rollback path、timeout budget、manual abort marker 六类前置条件已只读列出
- 不写 ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection

mini-kv v100：
- current runtime fixture rolling evidence guard 已完成
- current fixture 已滚到 0.100.0 / v100 / c/100/
- historical consumed digest anchors 仍保持 v84-v90/v95/v96 稳定
- read_only=true、execution_allowed=false、restore_execution_allowed=false、order_authoritative=false

Node v235：
- manual sandbox connection precondition intake ready
- markerSpan=Node v234 + Java v91 + mini-kv v100
- requiredPreconditionCount=6，documentedPreconditionCount=6
- handlesOnly=true
- actualConnectionAttempted=false
- credentialValueRead=false
- schemaMigrationExecuted=false
- managedAuditStateWritten=false
- upstreamServiceAutoStarted=false
- miniKvExecutionPermissionInferred=false
- 同步修正 v223-v235 旧沙箱链路读取 mini-kv current runtime fixture v100 的断言：接受当前版本滚动，同时保留历史 consumed digest / receipt 语义
```

## 推荐执行顺序

```text
1. 推荐并行：Java v91 + mini-kv v100。已完成。
   - Java v91：release approval sandbox connection precondition receipt，只读列出真实 sandbox connection 前必须具备的 owner approval artifact、credential handle review、schema rehearsal evidence、rollback path、timeout budget；不写 ledger，不执行 SQL，不打开连接。
   - mini-kv v100：current runtime fixture rolling evidence guard，把 v99 current fixture 的 version / receipt / historical digest 保留规则固化成只读 sample 或测试；不做 command dispatch table 大重构，不触碰 WAL / snapshot / restore 行为。

2. Node v235：manual sandbox connection precondition intake。已完成。
   消费 Java v91 + mini-kv v100 的只读前置条件证据，生成 precondition intake；仍不打开 managed audit 连接，不读取 credential value，不执行 schema migration，不启动 Java / mini-kv。

3. Node v236：manual sandbox connection dry-run request envelope。转入新计划。
   生成真正连接前的人工作业 envelope：列出 owner artifact id、credential handle name、schema rehearsal id、rollback path id、timeout budget、abort marker，但 request 仍为 dry-run，不执行连接。

4. 推荐并行：Java v92 + mini-kv v101。转入新计划。
   - Java v92：connection precondition echo verification，只读回显 Node v236 envelope 字段名，验证不含 credential value。
   - mini-kv v101：runtime no-start / no-write evidence follow-up，继续证明 mini-kv 不是 audit storage backend，不被 Node 自动启动。

5. Node v237：manual sandbox connection readiness gate。转入新计划。
   消费 Node v236 + Java v92 + mini-kv v101，判断是否具备“申请一次真实沙箱连接窗口”的材料；默认仍关闭，不执行真实连接。
```

## 显式质量优化项

```text
Node：
- 继续保留 v234 的 rolling fixture guard：读取 mini-kv current runtime fixture 时必须允许当前版本滚动，同时校验历史 consumed digest / receipt 没丢。
- v235 已把 v223-v235 沙箱链路继续扩展到 mini-kv v100 current fixture；后续不得重新把测试或 service 写死在 v99。
- managedAudit* 服务接近 800 行必须拆 helper；v234 新服务后续如果增长，优先拆 attempts / upstream evidence reader / markdown render。
- auditRoutes 继续使用 registerAuditJsonMarkdownRoute；不要新增手写 JSON/Markdown 路由分支。
- 后续不要再做单纯 summary 版本；每版必须形成一个可验证的小闭环。

Java：
- 下一步只做真实连接前置条件的只读 receipt，不写 ledger、不执行 SQL、不读取 credential value。
- 继续按 ContextHeaderField / builder / helper 风格拆分，不把新字段堆回 OpsEvidenceService。

mini-kv：
- v100 先固化 current fixture rolling evidence guard，不急着做 dispatch table 大重构。
- 不做 LOAD / COMPACT / RESTORE / SETNXEX 执行，不成为 managed audit storage backend。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- 任何版本要打开真实 sandbox connection，但缺少 owner approval artifact、credential handle review、schema rehearsal evidence、rollback path 或 manual abort marker。

## 一句话结论

```text
v235 已完成只读 precondition intake；下一阶段另起 post-v235 计划，先做 dry-run request envelope，不直接打开 managed audit sandbox connection。
```
