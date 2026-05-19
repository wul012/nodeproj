# Node v263 运行调试说明：sandbox endpoint credential resolver disabled precheck upstream echo verification

本版依据 `docs/plans/v260-post-credential-resolver-decision-roadmap.md` 推进。Java v106 和 mini-kv v115 已完成只读回显/非参与证据后，Node v263 负责消费两侧材料，验证 v262 disabled credential resolver precheck 的三方一致性。

## 本版目标

v263 消费：

```text
Node v262 disabled credential resolver precheck
Java v106 disabled resolver precheck echo marker
mini-kv v115 disabled credential resolver precheck non-participation receipt
```

它只做只读 upstream echo verification：

```text
验证 env handles
验证 opt-in gates
验证 failure taxonomy
验证 dry-run response shape
验证 inherited no-go conditions
验证 Node v261 source boundary
验证 Java / mini-kv / Node 三方无副作用边界一致
```

它仍然不实例化 resolver client，不实例化 secret provider，不读取 credential value，不解析 raw endpoint URL，不发真实 external request，不执行 schema migration，不启动 Java 或 mini-kv。

## 新增入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification?format=markdown
```

新增模块：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationRenderer.ts
src/services/historicalEvidenceReportUtils.ts
```

`historicalEvidenceReportUtils.ts` 是本轮质量优化：把跨项目 evidence file、snippet 和 JSON 读取 helper 集中起来，避免 v263 继续复制 v261 的本地 helper 样板。

## 关键结果

```text
verificationState=sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready
sourceNodeV262Ready=true
javaV106EchoReady=true
miniKvV115NonParticipationReady=true
disabledPrecheckAligned=true
requiredEnvHandlesAligned=true
optInGatesAligned=true
failureTaxonomyAligned=true
dryRunResponseShapeAligned=true
inheritedNoGoConditionsAligned=true
sourceNodeV261Aligned=true
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

## Historical fallback

本版补齐 Java v106 和 mini-kv v115 的 committed fallback：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/106/解释/说明.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/109-version-106-sandbox-endpoint-credential-resolver-disabled-precheck-echo-marker.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarkerBuilder.java
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords.java
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/disabled-credential-resolver-precheck-non-participation-receipt.json
fixtures/historical/sibling-workspaces/mini-kv/c/115/解释/说明.md
fixtures/historical/sibling-workspaces/mini-kv/代码讲解记录_生产雏形阶段/171-version-115-disabled-credential-resolver-precheck-non-participation-receipt.md
```

因此 GitHub runner 即使没有 `D:/javaproj` 和 `D:/C/mini-kv`，也可以通过 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 验证 v263。

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.test.ts --reporter=dot -> 1 file, 4 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> passed, 203 files / 684 tests
npm run build -> passed
safe HTTP smoke -> passed, port=4363, verificationState=sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready
Chrome screenshot -> c/263/图片/sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-v263.png
```

## 下一步

v260 衍生计划到 v263 已收口。下一阶段另起 `docs/plans/v263-post-disabled-resolver-echo-roadmap.md`，再决定是否进入 test-only resolver shell contract。

下一步仍不能直接做真实 credential provider：

```text
不读取 credential value
不解析 raw endpoint URL
不打开真实 managed audit connection
不执行 schema migration
不写 approval ledger
不让 mini-kv 成为 managed audit storage backend
```

## 一句话总结

Node v263 把 v262 disabled resolver precheck、Java v106 echo marker 和 mini-kv v115 non-participation receipt 收束成三方一致性验证；它证明禁用态 resolver precheck 证据链完整，但仍不允许任何真实凭证解析或外部连接。
