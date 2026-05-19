# Node v256 运行调试说明：fake transport packet archive verification

本版依据 `docs/plans/v255-post-fake-transport-dry-run-roadmap.md` 推进。v255 已生成 fake transport adapter dry-run verification packet；v256 只验证 v255 的归档完整性、route response shape 和 digest 链路，不重新执行 fake transport 行为。

## 本版目标

v256 验证以下证据：

```text
v255 HTML archive
v255 Chrome screenshot
v255 运行解释
v255 代码讲解
v255 route response digest / request digest / response digest
v255 cleanup evidence
active plan 对 v256 / Java v103 + mini-kv v112 的指向
```

## 新增入口

新增服务：

```text
src/services/managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification.ts
```

新增类型和渲染拆分：

```text
src/services/managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationRenderer.ts
```

新增路由：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification?format=markdown
```

## 验证重点

v256 消费 Node v255 route response：

```text
packetState=fake-transport-adapter-dry-run-verification-packet-ready
requestShapeFieldCount=8
responseShapeFieldCount=9
failureMappingCount=6
timeoutBudgetMs=15000
cleanupArtifactCount=0
cleanupVerified=true
temporaryDirectoryCreated=false
temporaryFileCreated=false
```

v256 复核归档文件：

```text
c/255/fake-transport-adapter-dry-run-verification-packet-v255.html
c/255/图片/fake-transport-adapter-dry-run-verification-packet-v255.png
c/255/解释/fake-transport-adapter-dry-run-verification-packet-v255.md
代码讲解记录_生产雏形阶段/259-fake-transport-adapter-dry-run-verification-packet-v255.md
docs/plans/v255-post-fake-transport-dry-run-roadmap.md
```

片段验证：

```text
requiredSnippetCount=19
matchedSnippetCount=19
archiveSnippetsMatched=true
htmlRecordsFakeTransportBlocked=true
explanationRecordsSmokeAndCleanup=true
walkthroughRecordsImplementationAndVerification=true
planPointsToV256=true
```

## 安全边界

v256 是 archive verification：

```text
readOnlyArchiveVerification=true
archiveVerificationRerunsFakeTransportBehavior=false
noArchiveVerificationFakeTransportRerun=true
noTempDryRunDirectoryCreated=true
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

它不会启动 Java / mini-kv，也不会创建 `.tmp` dry-run 目录。

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npm test -- managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification.test.ts managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.test.ts -> 2 files, 6 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 196 files passed, 657 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/256/图片/fake-transport-packet-archive-verification-v256.png
```

HTTP smoke 使用安全环境变量：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
AUDIT_STORE_URL=managed-audit://contract-only
```

smoke 结果：

```json
{
  "healthStatus": "ok",
  "archiveVerificationState": "fake-transport-packet-archive-verification-ready",
  "ready": true,
  "archiveFilesPresent": true,
  "archiveSnippetsMatched": true,
  "sourceCleanupEvidenceVerified": true,
  "rerunsFakeTransport": false,
  "connectsManagedAudit": false,
  "readsManagedAuditCredential": false,
  "checkCount": 24,
  "passedCheckCount": 24
}
```

## 下一步

v256 完成后，按当前计划不是 Node 抢跑 v257，而是推荐并行推进：

```text
Java v103 + mini-kv v112
```

两边完成后，再由 Node v257 消费它们的只读 echo / non-participation 证据。

## 一句话总结

Node v256 把 v255 fake transport dry-run packet 的 HTML、截图、解释、代码讲解、route digest 和 cleanup evidence 固化为可复核归档；真实 managed audit connection 仍未打开。
