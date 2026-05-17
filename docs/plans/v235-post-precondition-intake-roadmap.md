# Node v235 衍生计划：precondition intake 后续阶段

来源版本：Node v235 `managed audit manual sandbox connection precondition intake`。

计划状态：当前唯一有效全局计划。Node v235 已消费 Node v234、Java v91、mini-kv v100，生成 manual sandbox connection precondition intake；只读确认 owner approval artifact、credential handle review、schema rehearsal evidence、rollback path、timeout budget、manual abort marker 六类前置条件齐备。v235 仍不打开 managed audit 连接，不读取 credential value，不执行 schema migration，不写 Java / mini-kv / audit 状态，不自动启动 Java / mini-kv。

## 当前状态

```text
Node v235：
- manual sandbox connection precondition intake ready
- markerSpan=Node v234 + Java v91 + mini-kv v100
- requiredPreconditionCount=6
- documentedPreconditionCount=6
- handlesOnly=true
- actualConnectionAttempted=false
- credentialValueRead=false
- schemaMigrationExecuted=false
- managedAuditStateWritten=false
- upstreamServiceAutoStarted=false
- miniKvExecutionPermissionInferred=false
- readyForManagedAuditSandboxAdapterConnection=false
- readyForProductionAudit=false
- readyForProductionWindow=false
- v223-v235 旧沙箱链路已扩展到 mini-kv current runtime fixture v100，同时保留历史 consumed digest / receipt 检查

Java v91：
- release approval sandbox connection precondition receipt ready
- owner approval artifact、credential handle review、schema rehearsal evidence、rollback path、timeout budget、manual abort marker 已只读列出
- 不写 ledger，不执行 SQL，不打开连接，不读取 credential value

mini-kv v100：
- current runtime fixture rolling evidence guard ready
- current fixture=0.100.0 / v100 / c/100/
- historical consumed digest anchors stable
- read_only=true、execution_allowed=false、restore_execution_allowed=false、order_authoritative=false
```

## 推荐执行顺序

```text
1. Node v236：manual sandbox connection dry-run request envelope。
   消费 Node v235 intake，生成 dry-run request envelope；只放 owner artifact id field、credential handle name、schema rehearsal id、rollback path id、timeout budget、manual abort marker，不读取 credential value，不打开连接。

2. 推荐并行：Java v92 + mini-kv v101。
   - Java v92：connection precondition echo verification，只读回显 Node v236 envelope 字段名，验证不含 credential value，不执行 SQL，不写 ledger。
   - mini-kv v101：runtime no-start / no-write evidence follow-up，继续证明 mini-kv 不是 audit storage backend，不被 Node 自动启动；可顺手把 v100 rolling guard 的 Node v236 consumer hint 固化。

3. Node v237：manual sandbox connection readiness gate。
   消费 Node v236 + Java v92 + mini-kv v101，判断是否具备“申请一次真实沙箱连接窗口”的材料；默认仍关闭，不执行真实连接。

4. Node v238：manual sandbox connection operator window checklist。
   只生成操作员窗口 checklist：谁审批、何时开启、超时多久、如何中止、失败如何回滚；仍不启动上游，不连接 managed audit。
```

## 显式质量优化项

```text
Node：
- v236 不要新增真实 adapter；只做 envelope 和 digest。
- v235 service 若继续增长，优先拆 upstream evidence reader / intake builder / markdown render，不再把所有逻辑压进单文件。
- 旧沙箱链读取 mini-kv current fixture 必须继续按 rolling guard 处理：current version 可滚，historical consumed digest 不可漂移。
- auditRoutes 继续使用 registerAuditJsonMarkdownRoute。

Java：
- v92 只回显 Node v236 envelope 字段，不读取 credential value，不写 ledger，不执行 SQL。
- 继续避免把大块逻辑堆回 OpsEvidenceService。

mini-kv：
- v101 只做 no-start / no-write evidence follow-up，不做 LOAD / COMPACT / RESTORE / SETNXEX 执行。
- mini-kv 继续是 runtime evidence provider，不是 managed audit storage backend。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- 任何版本要打开真实 sandbox connection，但缺少 owner approval artifact、credential handle review、schema rehearsal evidence、rollback path、timeout budget 或 manual abort marker。

## 一句话结论

```text
v235 已把真实沙箱连接前置条件收成只读 intake；下一步 Node v236 只能做 dry-run request envelope，仍不能打开连接。
```
