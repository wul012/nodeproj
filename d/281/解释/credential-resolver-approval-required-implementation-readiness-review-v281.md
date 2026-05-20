# Node v281 运行调试说明：credential resolver approval-required implementation readiness review

## 本版目标

v281 从 `statusRoutes` 质量线回到 managed audit 主流程。它消费 Node v275 已经对齐的 6 个 approval-required boundary，生成进入实现前必须补齐的只读证据清单。

本版不写真实 resolver，不读取 credential value，不解析 raw endpoint URL，不实例化 secret provider，不连接 managed audit，不写 approval ledger，不执行 schema migration。

## 新增入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review?format=markdown
```

## 核心输出

```text
profileVersion=managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review.v1
reviewState=credential-resolver-approval-required-implementation-readiness-review-ready
readyForJavaV116MiniKvV122Echo=true
readyForManagedAuditResolverImplementation=false
boundaryCount=6
requiredArtifactCount=18
checkCount=21
passedCheckCount=21
```

## 六个 approval-required boundary

```text
CREDENTIAL_HANDLE
ENDPOINT_HANDLE
OPERATOR_APPROVAL
ROLLBACK_BOUNDARY
SCHEMA_MIGRATION_POLICY
AUDIT_LEDGER_WRITE_POLICY
```

每个 boundary 都输出：

```text
requiredArtifacts：后续必须补齐的人工/策略/审批证据
javaV116EchoHint：Java v116 只读回显建议
miniKvV122ReceiptHint：mini-kv v122 非参与证明建议
nodeV282VerificationHint：Node v282 三方验证建议
prohibitedRuntimeActions：当前仍禁止的真实行为
```

## 安全边界

```text
implementationReadinessReviewOnly=true
readOnlyImplementationReadinessReview=true
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

## 推荐并行

v281 完成后，下一步推荐并行：

```text
Java v116：approval-required implementation readiness echo
mini-kv v122：approval-required implementation non-participation readiness receipt
```

两边都只消费 Node v281 的只读 review，不互相依赖，不写上游状态。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run v281 focused tests -> 2 files, 7 tests passed
npm test -> 216 files, 731 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, reviewState=credential-resolver-approval-required-implementation-readiness-review-ready, readyForJavaV116MiniKvV122Echo=true, readyForManagedAuditResolverImplementation=false, boundaryCount=6, requiredArtifactCount=18, checkCount=21, passedCheckCount=21, markdown=200, executionAllowed=false, connectsManagedAudit=false
Chrome screenshot -> d/281/图片/credential-resolver-approval-required-implementation-readiness-review-v281.png
```
