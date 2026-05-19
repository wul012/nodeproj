# 第一百零三版代码讲解：fake transport dry-run packet echo marker

本版目标是让 Java release approval rehearsal 增加一份 `fake transport dry-run packet echo marker`。它接在 Node v255/v256 之后，只证明 Java 看见了 fake transport dry-run packet 的 request、response、timeout、failure mapping、cleanup 和 side-effect 边界，不创建真实 adapter client，不读取 credential value，不打开 managed audit connection。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v255-post-fake-transport-dry-run-roadmap.md
```

计划要求 Java v103：

```text
fake transport dry-run packet echo marker
只读回显 Node v255 packet request / response / timeout / cleanup boundaries
不写 ledger
不执行 SQL
不读 credential value
不连接 managed audit
不启动 Java / mini-kv / external audit service
```

这说明当前主线仍在 managed-audit sandbox connection 的真实连接前证据对齐阶段。Node v255 定义 fake transport dry-run packet，Node v256 做 archive verification，Java v103 负责把这些边界作为只读 marker 暴露给后续 Node v257 校验。

## 核心新增 marker

新增 response 字段：

```text
managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker
```

marker version：

```text
java-release-approval-rehearsal-managed-audit-sandbox-connection-fake-transport-dry-run-packet-echo-marker.v1
```

整体 response schema 从 v24 提升到 v25：

```text
java-release-approval-rehearsal-response-schema.v25
```

但 marker 的 source schema 是 v24，因为它消费的是上一版 `managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt`。

## Builder 拆分

新增文件：

```text
D:\javaproj\advanced-order-platform\src\main\java\com\codexdemo\orderplatform\ops\ReleaseApprovalManagedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarkerBuilder.java
```

这个 builder 固定回显 Node v255/v256/v257 的关键形状：

```text
Node v255 profile=managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1
Node v255 state=fake-transport-adapter-dry-run-verification-packet-ready
Node v256 profile=managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1
Node v256 state=fake-transport-packet-archive-verification-ready
Node v257 profile=managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification.v1
requestShapeFieldCount=8
responseShapeFieldCount=9
failureMappingCount=6
guardConditionCount=7
timeoutBudgetMs=15000
cleanupArtifactCount=0
```

这样做的收益是：`OpsEvidenceService` 继续只保留版本常量和入口编排，fake transport packet 细节不堆回主类。

## 安全边界

本版最关键的不是“fake transport 可以连接”，而是证明它仍然不能变成真实连接：

```text
credentialValueIncluded=false
rawEndpointUrlIncluded=false
payloadMayContainSecrets=false
connectionAttempted=false
externalRequestSent=false
credentialValueRead=false
credentialValueStored=false
schemaMigrationExecuted=false
productionRecordWritten=false
approvalLedgerWritten=false
managedAuditStateWritten=false
sqlExecuted=false
javaStarted=false
miniKvStarted=false
externalAuditServiceStarted=false
```

cleanup 边界也固定为：

```text
inMemoryOnly=true
temporaryDirectoryCreated=false
temporaryFileCreated=false
cleanupRequired=false
cleanupArtifactCount=0
nodeServiceStartedByPacket=false
```

也就是说，fake transport dry-run packet 只是一个可校验的内存形状，不是临时文件产物，也不是后台服务启动授权。

## Verification Hint 接入

`ReleaseApprovalVerificationHintBuilder` 和 `ReleaseApprovalVerificationWarningDigestBuilder` 增加了新 marker 的 warning digest input、boundary input、proof claims 和 Node verification actions。

Node 后续可以直接校验：

```text
managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.requestShape.requestShapeFieldCount=8
managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.responseShape.responseShapeFieldCount=9
managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.failureMappingShape.mappedFailureCount=6
managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.timeoutBoundary.timeoutBudgetMs=15000
managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.cleanupBoundary.cleanupArtifactCount=0
managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.sideEffectBoundary.connectionAttempted=false
managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.sideEffectBoundary.credentialValueRead=false
managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.sideEffectBoundary.schemaMigrationExecuted=false
managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.readyForManagedAuditSandboxAdapterConnection=false
```

Node verification actions 新增：

```text
Compare managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.consumedByNodeFakeTransportDryRunPacketProfile with Node v255
Compare managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.consumedByNodeFakeTransportPacketArchiveVerificationProfile with Node v256
Require managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.readyForNodeV257FakeTransportPacketUpstreamEchoVerification=true before Node v257
Verify managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.requestShape.credentialValueIncluded=false
Verify managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.cleanupBoundary.cleanupArtifactCount=0
```

## 验证

执行：

```text
mvn -q -DskipTests compile
mvn -q "-Dtest=OpsEvidenceServiceTests#releaseApprovalRehearsalExposesFakeTransportDryRunPacketEchoMarker,OpsOverviewIntegrationTests#releaseApprovalRehearsalExposesFakeTransportDryRunPacketEchoMarker" test
mvn -q "-Dtest=OpsEvidenceServiceTests,OpsOverviewIntegrationTests" test
```

单元测试验证 Java 对象模型中的 marker、digest、warning inputs、proof claims 和 Node actions。

集成测试验证 HTTP JSON 输出中的 marker 字段，确保 Node 消费的是稳定外部契约，而不是 Java 内部实现细节。

## 成熟度变化

v103 后，Java 对 managed-audit sandbox connection 的证据链又向前推进一步：

```text
v99: precheck packet echo receipt
v102: disabled adapter client precheck echo receipt
v103: fake transport dry-run packet echo marker
下一步: Node v257 upstream echo verification
```

成熟度提升体现在 fake transport dry-run packet 的字段和边界更清晰，不是生产连接能力被打开。

## 一句话总结

v103 把 Node v255/v256 fake transport dry-run packet 边界固化成 Java 可回显、可校验、可被 Node v257 消费的只读 marker，同时继续阻断 credential value、真实连接、外部请求、SQL、ledger、临时文件、auto-start 和 mini-kv 写权限。
