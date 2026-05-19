# 第二百五十七版代码讲解：fake transport packet upstream echo verification

本版目标是消费 Java v103 和 mini-kv v112，把 Node v255/v256 的 fake transport packet 证据做成三方 upstream echo verification。它不是打开真实连接，而是证明 request、response、timeout、failure mapping、cleanup 和 side-effect boundary 在三项目里一致。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v255-post-fake-transport-dry-run-roadmap.md
```

这份计划的执行链路是：

```text
Node v255 fake transport adapter dry-run verification packet
 -> Node v256 fake transport packet archive verification
 -> 推荐并行 Java v103 + mini-kv v112
 -> Node v257 fake transport packet upstream echo verification
```

v257 是这份计划的最后一个执行版本。完成后进入真实 endpoint、credential resolver 或 schema migration rehearsal 前，必须另起计划。

## 模块拆分

新增三份文件：

```text
src/services/managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationRenderer.ts
```

service 当前约 741 行，略高于理想阈值，但 types 和 renderer 已拆出。后续若继续新增同类三方 upstream verification，应把 `evidenceFile/snippet/readJsonObject` 这类 historical evidence helper 抽到共享模块。

## 主 profile

核心字段：

```ts
profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification.v1";
verificationState: "fake-transport-packet-upstream-echo-verification-ready" | "blocked";
readOnlyUpstreamEchoVerification: true;
readyForManagedAuditSandboxAdapterConnection: false;
executionAllowed: false;
connectsManagedAudit: false;
readsManagedAuditCredential: false;
schemaMigrationExecuted: false;
automaticUpstreamStart: false;
```

这里 ready 的对象是 upstream echo verification，不是 sandbox adapter connection。

## 消费 Node v255 / v256

主服务先读取两个 Node 来源：

```ts
const sourceNodeV255 = createSourceNodeV255(
  loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket({ config: input.config }),
);
const sourceNodeV256 = createSourceNodeV256(
  loadManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification({ config: input.config }),
);
```

`sourceNodeV255` 固化 packet 形状：

```ts
requestShapeFieldCount: packet.request.requestShapeFieldCount,
responseShapeFieldCount: packet.response.responseShapeFieldCount,
failureMappingCount: packet.failureMappingVerification.mappedFailureCount,
timeoutBudgetMs: packet.timeoutBudget.timeoutBudgetMs,
cleanupArtifactCount: packet.cleanup.cleanupArtifactCount,
credentialValueIncluded: packet.request.credentialValueIncluded,
rawEndpointUrlIncluded: packet.request.rawEndpointUrlIncluded,
connectionAttempted: packet.boundaries.connectionAttempted,
externalRequestSent: packet.boundaries.externalRequestSent,
```

`sourceNodeV256` 固化 archive 边界：

```ts
archiveVerificationState: source.archiveVerificationState,
archiveVerificationRerunsFakeTransportBehavior: source.archiveVerificationRerunsFakeTransportBehavior,
readOnlyArchiveVerification: source.readOnlyArchiveVerification,
noTempDryRunDirectoryCreated: source.checks.noTempDryRunDirectoryCreated,
```

## Java v103 reference

`createJavaV103Reference()` 验证三类材料：

```ts
JAVA_V103_RUNBOOK
JAVA_V103_WALKTHROUGH
JAVA_V103_BUILDER
```

关键片段包括：

```ts
managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker
java-release-approval-rehearsal-response-schema.v25
Node v255 profile=managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1
Node v256 profile=managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1
readyForNodeV257FakeTransportPacketUpstreamEchoVerification
requestShapeFieldCount=8
responseShapeFieldCount=9
failureMappingCount=6
cleanupArtifactCount=0
```

最终 `readyForNodeV257Alignment` 只有在 marker 字段、schema、Node v255/v256 profile、Node v257 consumer、shape counts 和所有 side-effect false 都满足时才为 true。

## mini-kv v112 reference

`createMiniKvV112Reference()` 读取：

```text
D:\C\mini-kv\fixtures\release\fake-transport-dry-run-packet-non-participation-receipt.json
```

并解析：

```ts
source_packet_profile_version
source_packet_state
source_archive_state
source_archive_reruns_fake_transport_behavior
source_request_shape_field_count
source_response_shape_field_count
source_failure_mapping_count
source_timeout_budget_ms
source_cleanup_artifact_count
read_only
execution_allowed
storage_write_allowed
managed_audit_storage_backend
```

这里不是只匹配文档文字，而是直接解析 JSON receipt 字段，确保 Node v257 能消费真实 fixture。

## checks

`createChecks()` 做三方对齐：

```ts
requestShapeAligned
responseShapeAligned
timeoutBoundaryAligned
failureMappingAligned
cleanupBoundaryAligned
archiveNoRerunAligned
credentialBoundaryAligned
connectionBoundaryAligned
writeBoundaryAligned
autoStartBoundaryAligned
```

并且仍然检查：

```ts
upstreamActionsStillDisabled: !config.upstreamActionsEnabled
productionAuditStillBlocked: true
productionWindowStillBlocked: true
```

只要 `UPSTREAM_ACTIONS_ENABLED=true`，v257 会 blocked。

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification",
  (deps) => loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationMarkdown,
)
```

仍然走共享 route table。

## 测试

新增：

```text
test/managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification.test.ts
```

覆盖：

```text
1. Node v255/v256 + Java v103 + mini-kv v112 对齐时 ready
2. ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true 时走 committed fallback
3. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
4. JSON / Markdown route 均可访问
```

聚焦验证：

```text
npm run typecheck -> passed
npm test -- managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification.test.ts managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification.test.ts managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.test.ts -> 3 files, 10 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 197 files passed, 661 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/257/图片/fake-transport-packet-upstream-echo-verification-v257.png
```

safe HTTP smoke 结果：

```text
healthStatus=ok
verificationState=fake-transport-packet-upstream-echo-verification-ready
ready=true
javaReady=true
miniKvReady=true
requestShapeAligned=true
cleanupBoundaryAligned=true
autoStartBoundaryAligned=true
connectsManagedAudit=false
readsManagedAuditCredential=false
checkCount=19
passedCheckCount=19
```

## 成熟度变化

v257 让 fake transport packet 从“Node 内部证据”升级成“三项目一致性证据”：

```text
Node packet shape
 -> Node archive verification
 -> Java echo marker
 -> mini-kv non-participation receipt
 -> Node upstream echo verification
```

这条链路更接近真实工程里的上线前 contract gate。但它仍然不是生产连接能力。

## 一句话总结

v257 完成 fake transport packet 三方 upstream echo verification：Node v255/v256、Java v103、mini-kv v112 对 request/response/timeout/failure/cleanup/side-effect 边界一致，真实 managed audit connection 仍然关闭。
