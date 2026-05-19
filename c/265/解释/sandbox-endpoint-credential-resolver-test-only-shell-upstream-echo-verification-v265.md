# Node v265 运行调试说明：sandbox endpoint credential resolver test-only shell upstream echo verification

本版依据 `docs/plans/v263-post-disabled-resolver-echo-roadmap.md` 推进。Node v264 已经定义 test-only fake resolver shell contract；Java v107 和 mini-kv v116 已经分别完成 echo marker 与 non-participation receipt。v265 的职责是把三边证据读回来，验证 shell contract 没被任何项目扩成真实 resolver、secret provider 或 external endpoint client。

## 本版目标

v265 消费：

```text
Node v264 credential resolver test-only shell contract
Java v107 test-only resolver shell echo marker
mini-kv v116 test-only resolver shell non-participation receipt
Java v109 records split optimization context
```

这里的 Java v109 只是优化上下文：它说明 Java 已经把 response records 从大壳里拆出去，方便后续维护；它不是 v265 readiness 的硬前置，硬前置仍然只有 Java v107 + mini-kv v116。

## 新增入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification?format=markdown
```

新增模块：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationRenderer.ts
```

继续沿用 v263 抽出的 `historicalEvidenceReportUtils.ts`，并补齐 committed fallback：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/107/解释/说明.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/109/解释/说明.md
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/test-only-resolver-shell-non-participation-receipt.json
```

## 关键结果

```text
verificationState=sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready
sourceNodeV264Ready=true
javaV107EchoReady=true
miniKvV116NonParticipationReady=true
javaV109OptimizationContextReady=true
testOnlyShellContractAligned=true
requestShapeAligned=true
responseShapeAligned=true
failureMappingAligned=true
guardConditionsAligned=true
fakeResolverProbeAligned=true
credentialBoundaryAligned=true
rawEndpointBoundaryAligned=true
connectionBoundaryAligned=true
writeBoundaryAligned=true
autoStartBoundaryAligned=true
```

安全边界继续关闭：

```text
credentialResolverExecutionAllowed=false
resolverClientInstantiated=false
secretProviderInstantiated=false
credentialValueRead=false
credentialValueLoaded=false
credentialValueStored=false
credentialValueIncluded=false
rawEndpointUrlParsed=false
rawEndpointUrlIncluded=false
externalRequestSent=false
connectsManagedAudit=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
```

## 对齐内容

三边共同确认的 contract shape：

```text
requestShapeFieldCount=9
responseShapeFieldCount=13
failureMappingCount=7
guardConditionCount=10
fakeResolverProbe=requestId managed-audit-v264-test-only-resolver-shell-probe
```

request 仍是 handle-only：

```text
requestId
operation
credentialHandle
endpointHandle
resolverPolicyHandle
approvalMarker
approvalCorrelationId
dryRun
fakeResolverOnly
```

failure mapping 继续覆盖：

```text
RESOLVER_DISABLED
APPROVAL_MARKER_MISSING
CREDENTIAL_HANDLE_MISSING
CREDENTIAL_VALUE_REQUESTED
RAW_ENDPOINT_URL_REQUESTED
EXTERNAL_REQUEST_REQUESTED
SCHEMA_MIGRATION_REQUESTED
```

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.test.ts -> 1 file, 4 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.test.ts -> 1 file, 4 tests passed
npm test -> 205 files, 691 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/265/图片/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.png
```

safe HTTP smoke 使用：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
AUDIT_STORE_KIND=memory
PORT=4365
```

smoke 结果：

```text
jsonState=sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready
checkCount=20
passedCheckCount=20
requestShapeFieldCount=9
responseShapeFieldCount=13
failureMappingCount=7
guardConditionCount=10
javaV109OptimizationContextReady=true
markdownStatus=200
```

## 下一步

下一步按计划推进 Node v266：

```text
credential resolver fake-shell archive verification
```

v266 只读验证 Node v264 / v265 的 HTML、截图、解释、代码讲解、route digest、historical fallback 和 active plan 片段；仍不重新执行 fake resolver shell，不接入真实 secret provider，不打开真实 managed audit connection。

## 一句话总结

Node v265 把 test-only fake resolver shell 从“合同已定义”推进到“三项目回显已对齐”：Java v107 和 mini-kv v116 都确认了 request / response / failure mapping / guard / fake probe 与 no-side-effect 边界，Java v109 的结构优化也被纳入说明，但真实凭证解析和外部连接仍然关闭。
