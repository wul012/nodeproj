# 第二百五十八版代码讲解：sandbox endpoint handle preflight review

本版目标是消费 Node v257 的 fake transport upstream echo verification，生成进入真实 sandbox endpoint 之前的 handle-only preflight review。它不是连接实现，也不是 credential resolver，而是把真实连接前必须审查的 endpoint handle、credential handle、network/TLS/redaction/operator window 固化成可测试 profile。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v257-post-fake-transport-upstream-echo-roadmap.md
```

当前链路是：

```text
Node v255 fake transport adapter dry-run verification packet
 -> Node v256 fake transport packet archive verification
 -> Java v103 + mini-kv v112 只读 echo / non-participation
 -> Node v257 fake transport packet upstream echo verification
 -> Node v258 sandbox endpoint handle preflight review
```

v258 是从 fake transport 走向真实 endpoint 的前置 review。它仍然不读取 credential value、不解析 raw endpoint URL、不发真实 HTTP 请求、不执行 schema migration。

## 模块拆分

新增三份文件：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewRenderer.ts
```

这次没有复制 v257 那类三方 evidence reader 的文件读取逻辑，因为 v258 只消费 Node v257 的 profile，不读取新的 Java / mini-kv 证据。这样符合计划里的质量约束：新版本保持一个小闭环，不把 v259 的三方 echo 验证提前塞进来。

## 主 profile

核心类型在：

```ts
profileVersion: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1";
reviewState: "sandbox-endpoint-handle-preflight-review-ready" | "blocked";
readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview: boolean;
readOnlyPreflightReview: true;
endpointHandleOnly: true;
credentialHandleOnly: true;
rawEndpointUrlParsed: false;
credentialValueRead: false;
externalRequestSent: false;
readyForManagedAuditSandboxAdapterConnection: false;
```

这里 ready 的对象是 preflight review，不是 sandbox adapter connection。`readyForManagedAuditSandboxAdapterConnection` 仍然强制为 `false`。

## 消费 Node v257

主服务先读取 v257：

```ts
const sourceNodeV257 = createSourceNodeV257(
  loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification({ config: input.config }),
);
```

`createSourceNodeV257()` 固化 v257 的三方一致性状态：

```ts
requestShapeAligned: verification.requestShapeAligned,
responseShapeAligned: verification.responseShapeAligned,
credentialBoundaryAligned: verification.credentialBoundaryAligned,
connectionBoundaryAligned: verification.connectionBoundaryAligned,
writeBoundaryAligned: verification.writeBoundaryAligned,
autoStartBoundaryAligned: verification.autoStartBoundaryAligned,
upstreamActionsStillDisabled: checks.upstreamActionsStillDisabled,
```

只有 v257 ready 且 credential / connection / write / auto-start 边界全部关闭，`readyForNodeV258PreflightReview` 才会为 true。

## Preflight review

`createPreflightReview()` 生成本版核心 review：

```ts
endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
ownerApprovalArtifactId: "owner-approval-artifact-review-only",
schemaRehearsalId: "schema-migration-rehearsal-review-only",
operatorWindowMarker: "manual-sandbox-endpoint-window-review-only",
```

这里出现的是 handle 名称，不是 endpoint URL 或 credential value。

network / TLS / redaction / operator window 也只记录 review 状态：

```ts
networkAllowlistReview: {
  allowlistHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_NETWORK_ALLOWLIST_HANDLE",
  rawHostIncluded: false,
  cidrIncluded: false,
  reviewed: true,
},
tlsPolicyReview: {
  policyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_TLS_POLICY_HANDLE",
  certificateMaterialIncluded: false,
  privateKeyIncluded: false,
  reviewed: true,
},
redactionPolicy: {
  credentialValueRedacted: true,
  rawEndpointUrlRedacted: true,
  payloadSecretRedacted: true,
  reviewed: true,
},
```

## Forbidden operations

本版把禁止动作写入 profile：

```ts
const FORBIDDEN_OPERATIONS = [
  "read credential value",
  "parse raw endpoint URL",
  "send real managed audit request",
  "execute schema migration",
  "write approval ledger",
  "start Java or mini-kv",
  "promote mini-kv to managed audit storage backend",
] as const;
```

这让 v258 的边界比单纯口头说明更强：测试、Markdown、smoke 都能看到这些 no-go 条件。

## checks

`createChecks()` 覆盖两类条件：

```ts
sourceNodeV257Ready
sourceNodeV257BoundariesAligned
endpointHandleOnly
credentialHandleOnly
networkAllowlistReviewReady
tlsPolicyReviewReady
redactionPolicyReady
operatorWindowReviewReady
```

以及副作用边界：

```ts
noRawEndpointUrlParsed: true,
noRawEndpointUrlIncluded: true,
noCredentialValueRead: true,
noExternalRequestSent: true,
noSchemaMigrationExecuted: true,
noUpstreamAutoStart: !sourceNodeV257.automaticUpstreamStart,
upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
```

如果 `UPSTREAM_ACTIONS_ENABLED=true`，本版会进入 `blocked`。

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review",
  (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewMarkdown,
)
```

仍然走共享 `auditJsonMarkdownRoute` 注册体系，没有回到旧的重复路由写法。

## 测试

新增：

```text
test/managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview.test.ts
```

覆盖：

```text
1. v257 ready 时生成 endpoint/credential handle preflight review
2. ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true 时兼容 GitHub runner
3. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
4. JSON / Markdown route 均可访问
```

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

safe HTTP smoke 结果：

```text
healthStatus=ok
reviewState=sandbox-endpoint-handle-preflight-review-ready
ready=true
endpointHandleOnly=true
credentialHandleOnly=true
rawEndpointUrlParsed=false
credentialValueRead=false
externalRequestSent=false
schemaMigrationExecuted=false
connectsManagedAudit=false
checkCount=19
passedCheckCount=19
```

## 成熟度变化

v258 让项目从“fake transport 三方一致性”推进到“真实 endpoint 前置审查”。这个变化很关键：它不急着连接真实服务，而是先把真实连接需要的审批材料、handle 名称、网络/TLS/redaction/operator window 逐项建模。

下一步不是 Node 继续抢跑，而是推荐并行 Java v104 + mini-kv v113：让 Java 回显这些 handle review，让 mini-kv 继续证明 non-participation。两边完成后，Node v259 再做三方 upstream echo verification。

## 一句话总结

v258 完成 sandbox endpoint handle preflight review：Node 已经明确真实 endpoint 前需要审哪些 handle 和 policy，但仍不解析 raw endpoint URL、不读取 credential value、不打开 managed audit connection。
