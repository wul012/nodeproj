# Node v259 运行调试说明：sandbox endpoint handle upstream echo verification

本版依据 `docs/plans/v257-post-fake-transport-upstream-echo-roadmap.md` 推进。v259 在 Java v104 与 mini-kv v113 完成后执行，目标是把 Node v258 的 endpoint handle preflight review 与两边上游只读回显对齐。

## 本版目标

v259 只做 upstream echo verification：

```text
Node v258：endpoint/credential handle preflight review
Java v104：sandbox endpoint handle preflight echo marker
mini-kv v113：sandbox endpoint handle non-participation receipt
```

它仍然不读取 credential value，不解析 raw endpoint URL，不发真实 managed audit HTTP 请求，不执行 schema migration，不写 Java ledger，也不启动 Java / mini-kv。

## 新增入口

新增服务：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.ts
```

新增类型和渲染：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationRenderer.ts
```

新增路由：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification?format=markdown
```

## 关键结果

三方来源：

```text
sourceNodeV258Ready=true
javaV104Ready=true
miniKvV113Ready=true
```

对齐结果：

```text
verificationState=sandbox-endpoint-handle-upstream-echo-verification-ready
endpointHandleAligned=true
credentialHandleAligned=true
reviewCountsAligned=true
policyReviewsAligned=true
rawEndpointBoundaryAligned=true
connectionBoundaryAligned=true
writeBoundaryAligned=true
autoStartBoundaryAligned=true
miniKvNonParticipationAligned=true
```

安全边界：

```text
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
executionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

证据摘要：

```text
checkCount=19
passedCheckCount=19
evidenceFileCount=6
matchedSnippetCount=39
productionBlockerCount=0
verificationDigest=4e8edfb74cfd71df0977fd8147ba9bae0dd4bf685d61f0a988f3814a15be49ce
miniKvReceiptDigest=fnv1a64:7ebda671f0a1d00d
```

## Historical fallback

本版补齐 committed historical fixture fallback，保证 GitHub runner 不依赖开发机 sibling workspace：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/104/解释/说明.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/107-version-104-sandbox-endpoint-handle-preflight-echo-marker.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointHandlePreflightEchoMarkerBuilder.java
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/sandbox-endpoint-handle-non-participation-receipt.json
fixtures/historical/sibling-workspaces/mini-kv/c/113/解释/说明.md
fixtures/historical/sibling-workspaces/mini-kv/代码讲解记录_生产雏形阶段/169-version-113-sandbox-endpoint-handle-non-participation-receipt.md
```

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npm test -- managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.test.ts -> 1 file, 4 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/259/图片/sandbox-endpoint-handle-upstream-echo-verification-v259.png
```

## 下一步

v259 完成后，下一步是 Node v260：

```text
Node v260：sandbox endpoint credential resolver decision record
```

v260 仍然只能写人工决策记录：credential handle、resolver policy、approval marker、pause condition。若需要真实 credential、raw endpoint URL 或外部网络连接，必须暂停并另起新计划。

## 一句话总结

Node v259 把 Node v258、Java v104、mini-kv v113 的 endpoint handle / credential handle / no-side-effect 证据对齐成一个 upstream echo verification；它证明三方证据链已闭合，但真实 managed audit connection 仍然关闭。
