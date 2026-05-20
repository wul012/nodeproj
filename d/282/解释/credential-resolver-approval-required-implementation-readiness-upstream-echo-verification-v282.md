# Node v282 运行调试说明：approval-required implementation readiness upstream echo verification

## 本版目标

v282 消费三方已完成的只读证据：

```text
Node v281：approval-required implementation readiness review
Java v116：approval-required implementation readiness echo
mini-kv v122：approval-required implementation non-participation receipt
```

本版只做 upstream echo verification。它验证三方是否都同意 6 个 approval-required boundary、18 个 required artifact，以及 credential / endpoint / resolver / connection / write / auto-start 边界仍然关闭。

## 新增入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification?format=markdown
```

## 核心输出

```text
profileVersion=managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification.v1
verificationState=credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-ready
sourceSpan=Node v281 + Java v116 + mini-kv v122
readyForNodeV283ImplementationPlanDraft=true
readyForManagedAuditResolverImplementation=false
boundaryCount=6
requiredArtifactCount=18
checkCount=23
passedCheckCount=23
```

## 安全边界

```text
readOnlyUpstreamEchoVerification=true
approvalRequiredImplementationReadinessEchoVerificationOnly=true
realResolverImplementationAllowed=false
executionAllowed=false
connectsManagedAudit=false
credentialValueRead=false
rawEndpointUrlParsed=false
secretProviderInstantiated=false
resolverClientInstantiated=false
externalRequestSent=false
schemaMigrationExecuted=false
approvalLedgerWritten=false
automaticUpstreamStart=false
```

## 本轮额外修复

全量 `npm test` 初次运行时，7 个既有 `productionLiveProbeRealReadSmoke*` route 用例在并发全量测试里触发 60 秒超时。单文件和分组复跑都能通过，说明不是业务断言失败，而是这些 route 用例本身接近 60 秒门槛。

本版把这 7 个慢 route 用例的超时从 `60000` 调整为 `90000`，不改业务行为、不改断言，只让 CI 更稳定地反映真实失败。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification.test.ts -> 1 file, 4 tests passed
npx vitest run 7 productionLiveProbeRealReadSmoke slow route files -> 7 files, 28 tests passed
npm test -> 217 files, 735 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, verificationState=credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-ready, ready=true, readyForNodeV283ImplementationPlanDraft=true, boundaryCount=6, requiredArtifactCount=18, checkCount=23, passedCheckCount=23, markdown=200, executionAllowed=false, connectsManagedAudit=false, forcedHistoricalFixtureFallback=true
Chrome screenshot -> d/282/图片/credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-v282.png
```
