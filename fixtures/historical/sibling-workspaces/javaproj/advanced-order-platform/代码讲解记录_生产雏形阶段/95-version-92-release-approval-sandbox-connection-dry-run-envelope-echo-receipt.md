# 第九十二版代码讲解：release approval sandbox connection dry-run envelope echo receipt

## 1. 这一版做什么

v92 给 release approval rehearsal 增加一个新的只读证据块：

```text
managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt
```

它回答的问题不是“Java 能不能打开 managed audit sandbox connection”，而是“Node v236 生成的 dry-run request envelope 里有哪些字段名，Java 侧能否只读回显这些字段，并证明没有 credential value、SQL、ledger 写入或真实连接动作”。

所以本版仍然是证据版本，不是执行版本。

## 2. 本版所处项目进度

当前唯一有效计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v236-post-dry-run-envelope-roadmap.md
```

计划要求 Java v92 做：

```text
connection precondition echo verification
只读回显 Node v236 envelope 字段名
验证不含 credential value
不执行 SQL
不写 ledger
```

Node v236 已经完成 `managed audit manual sandbox connection dry-run request envelope`。它只携带 6 个 operator review 字段：

```text
owner approval artifact field
credential handle field
schema rehearsal id field
rollback path field
timeout budget
manual abort marker
```

Java v92 的作用是把这 6 个字段名固定到 Java evidence response 中，让 Node v237 readiness gate 有一份 Java 侧只读回显依据。

## 3. 新增 builder

新增文件：

```text
src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceiptBuilder.java
```

它接收上一段证据：

```text
RehearsalManagedAuditSandboxConnectionPreconditionReceipt
```

然后输出：

```text
RehearsalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceipt
```

证据链变成：

```text
operator handoff marker
 -> preflight echo marker
 -> precondition receipt
 -> dry-run envelope echo receipt
```

`OpsEvidenceService` 仍只负责暴露总入口和常量，新逻辑没有堆回主服务类。

## 4. receipt 回显哪些字段

v92 回显 Node v236 dry-run envelope 的 6 个 operator review 字段：

```text
ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID
ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID
ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID
timeoutBudgetMs
ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT
```

这些值只作为字段名、handle 或 marker id。它们不包含 credential value，不包含 SQL，不包含连接命令，也不代表打开窗口。

## 5. 为什么 readyForNodeV237 可以为 true，但连接仍然是 false

完整 header 场景下，v91 precondition receipt 已经 ready，因此 v92 可以得到：

```text
readyForNodeV237ManualSandboxConnectionReadinessGate=true
```

这只表示 Node v237 可以消费这份 echo receipt 去做 readiness gate 判断。

它不表示真实连接已经获批，所以以下字段仍然保持 false：

```text
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
nodeMayTreatAsProductionAuditRecord=false
credentialValueIncludedInEnvelope=false
actualConnectionAttemptedByJava=false
schemaMigrationSqlExecutedByJava=false
approvalLedgerWrittenByJava=false
```

换句话说，v92 只把“dry-run envelope 长什么样”讲清楚，不把“现在可以连接”放行。

## 6. warning 和 digest

默认缺 header 时，上游 v91 precondition receipt 还没 ready，v92 会追加：

```text
NODE_V237_SOURCE_SANDBOX_CONNECTION_PRECONDITION_RECEIPT_NOT_READY
```

`ReleaseApprovalVerificationWarningDigestBuilder` 也把 v92 receipt 纳入 warning digest，新增输入包括：

```text
managedAuditSandboxConnectionDryRunEnvelopeEchoReceiptWarnings
sandboxConnectionDryRunEnvelopeEchoReceiptDigest
sandboxConnectionDryRunEnvelopeCredentialValueIncluded
sandboxConnectionDryRunEnvelopeCredentialValueReadByJava
sandboxConnectionDryRunEnvelopeActualConnectionAttemptedByJava
sandboxConnectionDryRunEnvelopeSchemaMigrationSqlExecutedByJava
sandboxConnectionDryRunEnvelopeApprovalLedgerWrittenByJava
```

这让 Node 后续可以校验两件事：

```text
v92 receipt 确实存在且 digest 稳定
危险动作仍然全部是 false
```

## 7. Response schema

因为顶层 response 新增字段，本版把 schema 从：

```text
java-release-approval-rehearsal-response-schema.v19
```

推进到：

```text
java-release-approval-rehearsal-response-schema.v20
```

旧的 v19 作为 `sourceSandboxConnectionPreconditionReceiptSchemaVersion` 保留，用来说明 v92 receipt 消费的是上一段 precondition receipt 的 schema。

## 8. 测试覆盖

默认缺 header 场景：

```text
readyForNodeV237ManualSandboxConnectionReadinessGate=false
receiptWarnings 包含 NODE_V237_SOURCE_SANDBOX_CONNECTION_PRECONDITION_RECEIPT_NOT_READY
credentialValueIncludedInEnvelope=false
actualConnectionAttemptedByJava=false
approvalLedgerWrittenByJava=false
```

完整 header 场景：

```text
readyForNodeV237ManualSandboxConnectionReadinessGate=true
receiptWarnings 为空
credentialHandleOnly=true
credentialValueReadByJava=false
schemaMigrationSqlExecutedByJava=false
approvalLedgerWrittenByJava=false
readyForManagedAuditSandboxAdapterConnection=false
```

同时 `OpsOverviewIntegrationTests` 把 v92 JSON 断言拆成单独测试，避免原本 release rehearsal 集成测试的 MockMvc 链继续膨胀，触发 javac 在超长 fluent chain 上递归推断。

## 9. 生产边界

本版明确不做：

- 不把 credential value 放进 envelope
- 不读取或打印 credential value
- 不打开 managed audit sandbox connection
- 不执行 schema migration SQL
- 不写 approval ledger
- 不写 managed audit store
- 不请求 mini-kv 权限
- 不触发 deployment / rollback / restore
- 不自动启动 Java / mini-kv / 外部 audit 服务

## 10. 一句话总结

v92 把 Node v236 dry-run request envelope 的 6 个字段名做成 Java 侧只读回显 receipt，允许 Node v237 做 readiness gate 前置校验，但继续把 credential value、真实连接、SQL、ledger 和服务自启动全部关住。
