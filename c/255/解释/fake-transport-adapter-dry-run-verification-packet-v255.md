# Node v255 运行调试说明：fake transport adapter dry-run verification packet

本版依据 `docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md` 推进。v253 已定义 test-only adapter shell contract，v254 已完成 Java v102 / mini-kv v111 的三方 echo verification；v255 在此基础上生成 fake transport adapter dry-run verification packet。

## 本版目标

v255 只验证 fake transport 的 dry-run packet：

```text
request shape
response shape
timeout budget
failure mapping
cleanup
side-effect boundaries
```

它仍然不是真实 managed audit client，不读取 credential value，不请求 external endpoint，不执行 schema migration，不启动 Java / mini-kv。

## 新增入口

新增服务：

```text
src/services/managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.ts
```

新增类型和渲染拆分：

```text
src/services/managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketTypes.ts
src/services/managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketRenderer.ts
```

新增路由：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet
GET /api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet?format=markdown
```

## 验证重点

v255 从 Node v253 读取 fake shell shape：

```text
requestShapeFieldCount=8
responseShapeFieldCount=9
failureMappingCount=6
guardConditionCount=7
```

并从 Node v254 读取上游 echo verification：

```text
javaV102EchoReady=true
miniKvV111NonParticipationReady=true
credentialBoundaryAligned=true
connectionBoundaryAligned=true
writeBoundaryAligned=true
autoStartBoundaryAligned=true
```

## dry-run packet

请求只携带 handle：

```text
credentialHandle=ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
endpointHandle=ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE
credentialValueIncluded=false
rawEndpointUrlIncluded=false
payloadMayContainSecrets=false
```

响应只表达 fake transport 结果：

```text
status=fake-transport-dry-run-accepted
code=TEST_ONLY_FAKE_TRANSPORT_DRY_RUN
connectionAttempted=false
externalRequestSent=false
credentialValueRead=false
schemaMigrationExecuted=false
productionRecordWritten=false
```

## timeout 和 cleanup

timeout budget 被记录但不实际花费：

```text
timeoutBudgetMs=15000
finiteBudget=true
budgetSpent=false
timerStarted=false
```

cleanup 证明本版没有创建临时文件：

```text
inMemoryOnly=true
temporaryDirectoryCreated=false
temporaryFileCreated=false
cleanupRequired=false
cleanupArtifactCount=0
cleanupVerified=true
```

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npm test -- managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.test.ts managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.test.ts managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.test.ts -> 3 files, 10 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 195 files passed, 654 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/255/图片/fake-transport-adapter-dry-run-verification-packet-v255.png
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
  "packetState": "fake-transport-adapter-dry-run-verification-packet-ready",
  "ready": true,
  "fakeTransportOnly": true,
  "timeoutBudgetMs": 15000,
  "cleanupVerified": true,
  "connectsManagedAudit": false,
  "readsManagedAuditCredential": false
}
```

## 下一步

v255 是当前 `v252-post-disabled-adapter-client-precheck-roadmap.md` 的最后一个执行版本。完成后这份计划应收口，后续若要继续推进真实 endpoint、credential resolver 或 schema migration rehearsal，必须另起下一阶段计划。

## 一句话总结

Node v255 把 fake transport adapter dry-run packet 固化为可验证证据：请求只带 handle，响应不声明真实 side effect，timeout 只记录不花费，cleanup 明确无临时产物；真实 managed audit connection 仍未打开。
