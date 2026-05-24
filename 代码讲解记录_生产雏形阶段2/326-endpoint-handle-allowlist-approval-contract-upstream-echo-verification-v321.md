# 326 - Node v321 endpoint handle allowlist approval contract upstream echo verification

## 版本进度

v321 消费 Node v320、Java v147 和 mini-kv v140，验证三项目是否都按同一个 endpoint-handle allowlist approval contract 理解边界。Java v148 已经额外完成 response records split，本版把它记录为 non-blocking quality evidence，但不让 v148 改变 v321 的 echo 判断。

本版不是 managed audit connection。它不读取 credential value，不解析 raw endpoint URL，不实例化 secret provider / resolver client，不发送 HTTP/TCP，不写 approval ledger，不执行 schema migration，也不启用 runtime shell。

## 关键代码

`src/services/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification.ts`

- `loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification()` 是 v321 入口。它组装 `sourceNodeV320`、`javaV147`、`miniKvV140`、`javaV148QualitySplit`、`checks`、`echoVerification`、blockers、warnings、recommendations 和 summary。
- `createSourceNodeV320()` 直接消费 v320 contract intake，读取 contract digest、required/prohibited/no-go/upstream echo counts，以及 `nextJavaVersion=Java v147`、`nextMiniKvVersion=mini-kv v140`、`nextNodeVerificationVersion=Node v321`。
- `createJavaV147Reference()` 用实际 Java v147 support/test/说明/代码讲解作为证据，检查 Node v320 profile、route、state、contract digest、字段计数、`readyForNodeV321...=true` 和 Java 侧 side-effect boundary。
- `createMiniKvV140Reference()` 读取 mini-kv v140 standalone JSON receipt，并解析 `source_node_v320_reference`、contract digest、字段计数、ready marker，以及 endpoint/raw URL/credential/network/write/authority 全部关闭的布尔边界。
- `createJavaV148QualitySplitReference()` 只记录 Java v148 response records split 已存在。它是质量证据，不参与解锁真实连接。
- `createChecks()` 形成 24 个检查：Node v320 ready、Java v147 ready、mini-kv v140 ready、Java v148 质量证据存在、三方 contract aligned、side-effect boundaries aligned、upstream probes/actions disabled、production audit/window blocked。
- `collectProductionBlockers()` 使用声明式 rules，不再散落多段 `if` push，便于后续继续审计。

`src/services/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationTypes.ts`

- 固化 v321 profile、source Node v320 reference、Java v147 reference、mini-kv v140 reference、Java v148 quality reference、echo verification、checks、summary 和 message 类型。
- `remainingPrerequisitesAfterV321` 仍包含 `endpoint-handle-allowlist-approval`、`no-network-safety-fixture`、`abort-rollback-semantics`，因为 v321 只做 upstream echo verification，不做 closure review。

`src/services/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationRenderer.ts`

- 渲染 Markdown evidence。
- 分区输出 Source Node v320、Java v147 Echo、mini-kv v140 Receipt、Java v148 Quality Split、Echo Verification、Checks、Summary、Blockers、Warnings、Recommendations、Evidence Endpoints 和 Next Actions。

`src/routes/auditJsonMarkdownRoutes.ts`

- 新增 `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification`。
- 继续走统一 `auditJsonMarkdownRoute`，没有新增手写 JSON/Markdown 分支。

`test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification.test.ts`

- 覆盖 ready profile。
- 覆盖 forced historical fixture fallback，确保 GitHub runner 没有 Java/mini-kv sibling workspace 时仍能消费冻结证据。
- 覆盖 upstream probes/actions 开启时 blocked。
- 覆盖 JSON/Markdown route。

## 为什么这样拆

v321 延续 v320 的拆分方式：types、service、renderer、test 分离。服务文件负责证据读取和判断，renderer 只负责输出，types 固化契约形状，test 保护 profile 与 route。这能避免把 route、解析、渲染、测试断言继续堆进一个难维护的大文件。

本版还把 Java v148 明确标成 quality evidence。这样计划可以承认 Java 做了一版优化，但 Node v321 的真实消费对象仍然是 Java v147 echo 和 mini-kv v140 receipt，避免“质量优化版本”意外替代业务 echo 版本。

## 验证结果

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification.test.ts
  1 test file passed, 4 tests passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake.test.ts test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification.test.ts
  2 test files passed, 8 tests passed

npm test
  254 test files passed, 880 tests passed

npm run build
  passed

HTTP smoke
  JSON 200
  Markdown 200
```

## 项目成熟度

v321 把 endpoint-handle allowlist approval 从“Node 自己定义合同”推进到“三项目都能只读回显并验证一致”。这比单纯继续写计划更接近生产前置治理，但还没有进入真实联调。真实 managed audit connection 仍至少需要后续关闭 `no-network-safety-fixture` 和 `abort-rollback-semantics`，并且仍不能跳过 credential value、raw endpoint URL、provider/client、HTTP/TCP、ledger/schema、runtime shell 的硬门槛。
