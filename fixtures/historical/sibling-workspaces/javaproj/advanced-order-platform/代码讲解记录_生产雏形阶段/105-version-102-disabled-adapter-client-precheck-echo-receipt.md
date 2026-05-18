# 第一百零二版代码讲解：disabled adapter client precheck echo receipt

本版目标是让 Java release approval rehearsal 增加一份 `disabled adapter client precheck echo receipt`。它接在 Node v252 之后，只证明 Java 读到了 disabled adapter client precheck 的形状和安全边界，不创建真实 adapter client，不读取 credential value，不打开 managed audit connection。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v252-post-disabled-adapter-client-precheck-roadmap.md
```

计划要求 Java v102：

```text
disabled adapter client precheck echo receipt
只读回显 Node v252 env handles、opt-in gate、failure taxonomy、dry-run response shape、no-go 条件
不写 approval ledger
不执行 SQL
不打开 managed audit connection
不读取 credential value
```

这说明当前主线仍处在 managed-audit 真实连接前的证据对齐阶段。Node v252 定义 disabled adapter client precheck，Java v102 负责回显，后续 Node v254 再做三方 echo verification。

## 核心新增 receipt

新增 response 字段：

```text
managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt
```

它的 receipt version 是：

```text
java-release-approval-rehearsal-managed-audit-sandbox-connection-disabled-adapter-client-precheck-echo-receipt.v1
```

整体 response schema 从 v23 提升到 v24：

```text
java-release-approval-rehearsal-response-schema.v24
```

但该 receipt 记录的 source schema 是 v23，因为它消费的是上一版 `managedAuditSandboxConnectionPrecheckPacketEchoReceipt`。

## Builder 拆分

新增文件：

```text
D:\javaproj\advanced-order-platform\src\main\java\com\codexdemo\orderplatform\ops\ReleaseApprovalManagedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceiptBuilder.java
```

这个 builder 固定回显 Node v252 的关键形状：

```text
profileVersion=managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1
precheckState=disabled-adapter-client-precheck-ready
adapterMode=disabled-client-precheck-only
clientImplementationStatus=not-implemented
requiredEnvHandleCount=5
failureClassCount=6
dryRunResponseFieldCount=10
reusedNoGoConditionCount=8
```

这样做的好处是 `OpsEvidenceService` 只保留版本常量和入口编排，不再承担大段 receipt 构造细节。

## 安全边界

本版最关键的不是“打开 adapter client”，而是明确它仍然不能被打开：

```text
clientMayBeInstantiated=false
externalRequestMayBeSent=false
credentialValueMayBeLoaded=false
actualConnectionAttemptedByJava=false
externalManagedAuditConnectionOpenedByJava=false
externalRequestSentByJava=false
schemaMigrationSqlExecutedByJava=false
approvalLedgerWrittenByJava=false
managedAuditStateWriteRequestedByJava=false
upstreamServiceAutoStartRequestedByJava=false
miniKvWritePermissionRequestedByJava=false
```

opt-in gate 也只作为后续真实连接前的门禁说明：

```text
ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED
requiredValueForFutureConnection=true
currentDefault=false
precheckTreatsEnabledAsBlocked=true
operatorApprovalRequired=true
```

也就是说，就算未来这个开关被显式设置，本版 precheck 仍只会把它视为阻断状态，不会降级成“可以连接”。

## Verification Hint 接入

`ReleaseApprovalVerificationHintBuilder` 增加了新字段、warning digest input、proof claims 和 Node verification actions。

Node 后续可以直接校验：

```text
managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.precheckShape.requiredEnvHandleCount=5
managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.precheckShape.failureClassCount=6
managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.precheckShape.dryRunResponseFieldCount=10
managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.javaExecutionBoundary.approvalLedgerWrittenByJava=false
```

Node verification actions 中新增：

```text
Compare managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.consumedByNodeDisabledAdapterClientPrecheckProfile with Node v252
Require managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.readyForNodeV254DisabledAdapterClientUpstreamEchoVerification=true before Node v254
```

## 验证

执行：

```text
mvn -q -DskipTests compile
mvn -q "-Dtest=OpsEvidenceServiceTests#releaseApprovalRehearsalExposesDisabledAdapterClientPrecheckEchoReceipt,OpsOverviewIntegrationTests#releaseApprovalRehearsalExposesDisabledAdapterClientPrecheckEchoReceipt" test
mvn -q "-Dtest=OpsEvidenceServiceTests,OpsOverviewIntegrationTests" test
mvn -q -DskipTests package
git diff --check
```

单元测试验证 Java 对象模型中的 receipt、digest、warning inputs、proof claims 和 Node actions。

集成测试验证 HTTP JSON 输出中的 receipt 字段，确保 Node 消费的是稳定外部契约，而不是 Java 内部实现细节。

## 成熟度变化

v102 后，Java 对 managed-audit sandbox connection 的证据链又向前推进了一步：

```text
v99: precheck packet echo receipt
v102: disabled adapter client precheck echo receipt
下一步: Node v254 upstream echo verification
```

但真实连接成熟度仍没有被提前打开。当前成熟度提升体现在“前置检查契约更清晰”，不是“生产连接能力已启用”。

## 一句话总结

v102 把 Node v252 disabled adapter client precheck 固化成 Java 可回显、可校验、可被 Node v254 消费的只读 receipt，同时继续阻断 credential value、真实连接、SQL、ledger、auto-start 和 mini-kv 写权限。
