# Node v237 衍生计划：readiness gate 后续阶段

来源版本：Node v237 `managed audit manual sandbox connection readiness gate`。

计划状态：当前唯一有效全局计划。Node v237 已消费 Node v236 dry-run request envelope、Java v92 echo receipt、mini-kv v101 runtime no-start/no-write follow-up，确认材料已经可以进入“人工 operator window checklist”。Node v238 已完成 operator window checklist；本计划继续承载 v239-v240，不因单版完成另起重复计划。

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
```

## 推荐执行顺序

```text
1. Node v238：manual sandbox connection operator window checklist。已完成。
   消费 Node v237 readiness gate，生成 operator checklist：审批人、窗口开始/结束、credential handle、schema rehearsal id、rollback path、timeout、manual abort marker、暂停条件。
   仍不打开连接，不读取 credential value，不执行 schema migration，不写 managed audit state。

2. 下一步推荐并行：Java v93 + mini-kv v102。
   - Java v93：operator window checklist echo receipt，只读回显 Node v238 checklist 字段，不写 ledger、不执行 SQL、不打开连接。
   - mini-kv v102：operator window no-start/no-write receipt，只证明窗口材料不会让 mini-kv 自动启动、写 storage、执行 restore 或读 credential。

3. Node v239：operator window evidence verification。
   消费 Node v238 + Java v93 + mini-kv v102，验证三方对 operator checklist 的字段、digest、no-write/no-start 边界一致。
   只做 verification，不做真实 sandbox connection。

4. Node v240：manual sandbox connection dry-run command package。
   只有在 v239 通过后，生成一份仍默认 disabled 的 dry-run command package；命令包只能携带 handle / marker / timeout，不携带 credential value。
```

## 显式质量优化项

```text
Node：
- v238 已完成 operator checklist 小闭环，没有继续膨胀旧 readiness gate。
- v237 已把“source material readiness”和“当前 UPSTREAM_ACTIONS_ENABLED 阻塞”拆开，后续版本继续保持这个模式：材料可读不等于运行开关打开。
- 继续使用 registerAuditJsonMarkdownRoute，不新增手写 JSON/Markdown 路由分支。
- 若 v239 需要消费 rolling mini-kv evidence，优先抽 shared rolling evidence consumer helper，不要在每个 service 里重复维护 current release / digest / consumer list。

Java：
- v93 只做 operator checklist echo receipt，不回写 approval ledger，不执行 SQL，不读取 credential value。
- 继续避免把新逻辑堆回 OpsEvidenceService；如字段继续增加，按 checklist field / credential boundary / schema rehearsal / rollback path 分组。

mini-kv：
- v102 只做 operator window no-start/no-write receipt，不做 LOAD / COMPACT / RESTORE / SETNXEX 执行。
- 继续保持 mini-kv 是 runtime evidence provider，不是 managed audit storage backend，也不是 Java order authority。
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
v238 已把人工 operator window checklist 固化为 Node 证据；下一步推荐并行 Java v93 + mini-kv v102 回显和守边界，不能直接跳到真实连接。
```
