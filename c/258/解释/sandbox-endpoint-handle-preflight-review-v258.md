# Node v258 运行调试说明：sandbox endpoint handle preflight review

本版依据 `docs/plans/v257-post-fake-transport-upstream-echo-roadmap.md` 推进。v258 消费 Node v257 的三方 fake transport upstream echo verification，向真实 sandbox endpoint 前进一步，但只做 handle-only preflight review。

## 本版目标

v258 只定义进入真实 sandbox endpoint 前必须完成的 review 项：

```text
endpoint handle
credential handle
owner approval artifact
network allowlist review
TLS policy review
redaction policy
operator window
```

它仍然不读取 credential value，不解析 raw endpoint URL，不发真实 managed audit HTTP 请求，不执行 schema migration，不写 Java ledger，也不启动 Java / mini-kv。

## 新增入口

新增服务：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview.ts
```

新增类型和渲染：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewRenderer.ts
```

新增路由：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review?format=markdown
```

## 关键结果

Source Node v257：

```text
verificationState=fake-transport-packet-upstream-echo-verification-ready
requestShapeAligned=true
responseShapeAligned=true
credentialBoundaryAligned=true
connectionBoundaryAligned=true
writeBoundaryAligned=true
autoStartBoundaryAligned=true
readyForNodeV258PreflightReview=true
```

Preflight review：

```text
reviewMode=sandbox-endpoint-handle-preflight-review-only
endpointHandle=ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE
credentialHandle=ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
networkAllowlistReview.reviewed=true
tlsPolicyReview.reviewed=true
redactionPolicy.reviewed=true
operatorWindow.windowOpen=false
```

安全边界：

```text
rawEndpointUrlParsed=false
rawEndpointUrlIncluded=false
credentialValueRead=false
externalRequestSent=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
connectsManagedAudit=false
readsManagedAuditCredential=false
```

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npm test -- managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview.test.ts managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification.test.ts -> 2 files, 8 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 198 files passed, 665 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/258/图片/sandbox-endpoint-handle-preflight-review-v258.png
```

smoke 结果：

```json
{
  "healthStatus": "ok",
  "reviewState": "sandbox-endpoint-handle-preflight-review-ready",
  "ready": true,
  "endpointHandleOnly": true,
  "credentialHandleOnly": true,
  "rawEndpointUrlParsed": false,
  "credentialValueRead": false,
  "externalRequestSent": false,
  "schemaMigrationExecuted": false,
  "connectsManagedAudit": false,
  "checkCount": 19,
  "passedCheckCount": 19
}
```

## 下一步

v258 完成后，不应直接推进 Node v259。计划下一步是推荐并行：

```text
Java v104 + mini-kv v113
```

Java v104 只读回显 endpoint/credential handle review；mini-kv v113 只读证明 non-participation。两边完成后，Node v259 才能做 sandbox endpoint handle upstream echo verification。

## 一句话总结

Node v258 把 fake transport 三方一致性证据推进到 sandbox endpoint handle preflight review：已经能说明进入真实 endpoint 前要审哪些 handle 和 policy，但真实 managed audit connection 仍然关闭。
