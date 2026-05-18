# 第九十一版代码讲解：release approval sandbox connection precondition receipt

## 1. 这一版做什么

v91 给 release approval rehearsal 增加一个新的只读证据块：

```text
managedAuditSandboxConnectionPreconditionReceipt
```

它回答的问题不是“现在能不能连接 managed audit sandbox”，而是“如果未来要申请一次真实 sandbox connection window，Java 侧知道哪些前置条件必须先齐备”。

所以本版仍然是证据版本，不是执行版本。

## 2. 本版所处项目进度

当前唯一有效计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v234-post-blocked-execution-rehearsal-roadmap.md
```

计划要求 Java v91 做：

```text
release approval sandbox connection precondition receipt
只读列出真实 sandbox connection 前必须具备的 owner approval artifact、credential handle review、schema rehearsal evidence、rollback path、timeout budget
不写 ledger
不执行 SQL
不打开连接
```

Node v234 已经完成 blocked execution rehearsal，证明危险动作全部阻断。v91 的作用是给 Node v235 的 precondition intake 提供 Java 侧只读材料清单。

## 3. 新增 builder

新增文件：

```text
src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionPreconditionReceiptBuilder.java
```

它接收上一段证据：

```text
RehearsalManagedAuditSandboxConnectionPreflightEchoMarker
```

然后输出：

```text
RehearsalManagedAuditSandboxConnectionPreconditionReceipt
```

这样证据链是连续的：

```text
operator handoff marker
 -> preflight echo marker
 -> precondition receipt
```

## 4. receipt 里记录哪些前置条件

v91 固定六类前置条件：

```text
owner approval artifact id
credential handle review
schema rehearsal evidence
rollback path id
timeout budget
manual abort marker
```

这些字段只作为 handle / id / review evidence 记录，不包含 credential value，不包含 SQL，不包含连接命令。

## 5. 为什么 readyForManagedAuditSandboxAdapterConnection 仍然是 false

这是本版最重要的边界。

即使 `allPreconditionsDocumented=true`，也只说明“材料清单已列出”。它不代表 Java 已获得真实连接许可，也不代表 Node 可以直接打开连接。

因此：

```text
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
nodeMayTreatAsProductionAuditRecord=false
```

v91 只允许 Node v235 做 intake，不能把 receipt 当成 execution approval。

## 6. warning 和 digest

如果上游 preflight echo marker 还没 ready，v91 会追加：

```text
NODE_V235_SOURCE_SANDBOX_CONNECTION_PREFLIGHT_ECHO_MARKER_NOT_READY
```

`ReleaseApprovalVerificationWarningDigestBuilder` 也把 v91 receipt 纳入 warning digest，新增输入包括：

```text
managedAuditSandboxConnectionPreconditionReceiptWarnings
sandboxConnectionPreconditionReceiptDigest
sandboxConnectionPreconditionCredentialValueReadByJava
sandboxConnectionPreconditionSchemaMigrationSqlExecutedByJava
sandboxConnectionPreconditionExternalManagedAuditConnectionOpenedByJava
sandboxConnectionPreconditionActualConnectionAttemptedByJava
```

这让 Node 后续能校验：v91 的前置条件清单存在，同时危险动作仍是 false。

## 7. Response schema

因为顶层 response 新增字段，本版把 schema 从：

```text
java-release-approval-rehearsal-response-schema.v18
```

推进到：

```text
java-release-approval-rehearsal-response-schema.v19
```

旧的 v18 作为 `sourceSandboxConnectionPreflightEchoMarkerSchemaVersion` 保留，用来说明 v91 receipt 消费的是上一段 preflight marker 的 schema。

## 8. 测试覆盖

本版测试锁住两类场景。

默认缺 header 场景：

```text
readyForNodeV235ManualSandboxConnectionPreconditionIntake=false
receiptWarnings 包含 NODE_V235_SOURCE_SANDBOX_CONNECTION_PREFLIGHT_ECHO_MARKER_NOT_READY
readyForManagedAuditSandboxAdapterConnection=false
```

完整 header 场景：

```text
readyForNodeV235ManualSandboxConnectionPreconditionIntake=true
receiptWarnings 为空
credentialValueReadByJava=false
schemaMigrationSqlExecutedByJava=false
externalManagedAuditConnectionOpenedByJava=false
actualConnectionAttemptedByJava=false
```

## 9. 生产边界

本版明确不做：

- 不打开 managed audit connection
- 不读取 credential value
- 不执行 schema migration SQL
- 不写 approval ledger
- 不写 managed audit store
- 不触发 deployment / rollback / restore
- 不自动启动 Java / mini-kv / 外部 audit 服务

## 10. 一句话总结

v91 给 Node v235 提供真实 sandbox connection 前的只读前置条件 receipt，但仍把所有连接、凭据、SQL、ledger 和服务启动动作保持在关闭状态。
