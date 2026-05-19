# Node v257 运行调试说明：fake transport packet upstream echo verification

本版依据 `docs/plans/v255-post-fake-transport-dry-run-roadmap.md` 推进。Java v103 和 mini-kv v112 已完成只读 echo / non-participation；v257 消费它们，验证 Node v255/v256 的 fake transport packet 边界在三项目中一致。

## 本版目标

v257 验证：

```text
Node v255 fake transport packet
Node v256 archive verification
Java v103 fake transport dry-run packet echo marker
mini-kv v112 fake transport packet non-participation receipt
```

它仍然不打开真实 managed audit connection，不读取 credential value，不发 external request，不执行 schema migration，不写 Java ledger，也不让 mini-kv 写 storage。

## 新增入口

新增服务：

```text
src/services/managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification.ts
```

新增类型和渲染：

```text
src/services/managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationRenderer.ts
```

新增路由：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification?format=markdown
```

## 三方验证结果

Node v255：

```text
requestShapeFieldCount=8
responseShapeFieldCount=9
failureMappingCount=6
timeoutBudgetMs=15000
cleanupArtifactCount=0
fakeTransportOnly=true
dryRunOnly=true
```

Node v256：

```text
archiveVerificationState=fake-transport-packet-archive-verification-ready
archiveVerificationRerunsFakeTransportBehavior=false
readOnlyArchiveVerification=true
noTempDryRunDirectoryCreated=true
```

Java v103：

```text
markerField=managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker
responseSchemaVersion=java-release-approval-rehearsal-response-schema.v25
nextNodeConsumerVersion=Node v257
readyForNodeV257Alignment=true
```

mini-kv v112：

```text
receiptVersion=mini-kv-fake-transport-dry-run-packet-non-participation-receipt.v1
releaseVersion=v112
consumerHint=Node v257 fake transport packet upstream echo verification
readyForNodeV257Alignment=true
```

对齐 checks：

```text
requestShapeAligned=true
responseShapeAligned=true
timeoutBoundaryAligned=true
failureMappingAligned=true
cleanupBoundaryAligned=true
archiveNoRerunAligned=true
credentialBoundaryAligned=true
connectionBoundaryAligned=true
writeBoundaryAligned=true
autoStartBoundaryAligned=true
```

## 历史 fixture fallback

本版把 Java v103 / mini-kv v112 的关键证据写入：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/...
fixtures/historical/sibling-workspaces/mini-kv/...
```

这样 GitHub runner 启用 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 时，不依赖本机 `D:/javaproj` 或 `D:/C/mini-kv`。

## 验证

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

smoke 结果：

```json
{
  "healthStatus": "ok",
  "verificationState": "fake-transport-packet-upstream-echo-verification-ready",
  "ready": true,
  "javaReady": true,
  "miniKvReady": true,
  "requestShapeAligned": true,
  "cleanupBoundaryAligned": true,
  "autoStartBoundaryAligned": true,
  "connectsManagedAudit": false,
  "readsManagedAuditCredential": false,
  "checkCount": 19,
  "passedCheckCount": 19
}
```

## 下一步

v257 是当前 `v255-post-fake-transport-dry-run-roadmap.md` 的最后一个执行版本。完成后这份计划应收口；后续如果要从 fake transport 过渡到真实 sandbox endpoint、credential resolver 或 schema migration rehearsal，必须另起计划。

## 一句话总结

Node v257 完成 fake transport packet 三方 upstream echo verification：Node v255/v256、Java v103、mini-kv v112 在 request/response/timeout/failure/cleanup/side-effect 边界上对齐，但真实 managed audit connection 仍然关闭。
