# Node v321 endpoint handle allowlist approval contract upstream echo verification 运行说明

## 本版目标

v321 执行 `docs/plans2/v319-post-credential-handle-prerequisite-closure-roadmap.md` 中的第三步。Node v320 已定义 `endpoint-handle-allowlist-approval` 的非 raw URL contract；Java v147 已完成只读 echo，mini-kv v140 已完成 non-participation receipt；Java v148 又做了一版 response records split 质量优化。

本版只做三方证据对齐：消费 Node v320 + Java v147 + mini-kv v140，并把 Java v148 记录为 non-blocking quality evidence。v321 不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发送 HTTP/TCP，不写 approval ledger，不执行 SQL/schema migration，也不打开 runtime shell。

## 运行结果

- JSON evidence：`d/321/evidence/endpoint-handle-allowlist-approval-contract-upstream-echo-verification-v321.json`
- Markdown evidence：`d/321/evidence/endpoint-handle-allowlist-approval-contract-upstream-echo-verification-v321.md`
- HTTP JSON smoke：`d/321/evidence/endpoint-handle-allowlist-approval-contract-upstream-echo-verification-v321-http.json`
- HTTP Markdown smoke：`d/321/evidence/endpoint-handle-allowlist-approval-contract-upstream-echo-verification-v321-http.md`
- HTTP smoke summary：`d/321/evidence/endpoint-handle-allowlist-approval-contract-upstream-echo-verification-v321-smoke-summary.json`
- HTML evidence：`d/321/endpoint-handle-allowlist-approval-contract-upstream-echo-verification-v321.html`
- Playwright MCP snapshot：`d/321/evidence/endpoint-handle-allowlist-approval-contract-upstream-echo-verification-v321-snapshot.md`
- Playwright MCP screenshot：`d/321/图片/endpoint-handle-allowlist-approval-contract-upstream-echo-verification-v321.png`

关键状态：

```text
verificationState = endpoint-handle-allowlist-approval-contract-upstream-echo-verification-ready
activeNodeVerificationVersion = Node v321
sourceSpan = Node v320 + Java v147 + mini-kv v140
javaV147.readyForNodeV321 = true
miniKvV140.readyForNodeV321 = true
javaV148QualitySplit.evidencePresent = true
checkCount = 24
passedCheckCount = 24
productionBlockerCount = 0
executionAllowed = false
connectsManagedAudit = false
credentialValueRead = false
rawEndpointUrlParsed = false
secretProviderInstantiated = false
resolverClientInstantiated = false
externalRequestSent = false
approvalLedgerWritten = false
schemaMigrationExecuted = false
automaticUpstreamStart = false
```

## 验证

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
  /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification
  JSON 200
  Markdown 200
```

第一次全量 `npm test` 使用 5 分钟命令预算时超时，没有断言失败；聚焦测试已通过。按 timeout triage 规则，重跑全量测试并给足预算后通过 254 个测试文件和 880 个用例。本次没有修改业务逻辑来处理这个超时。

## 截图说明

本轮先尝试访问 `d/321` 静态 HTML，但 Node 服务访问守卫对该路径返回 403。随后改用 Playwright MCP 的 header 注入能力直接打开真实 Markdown route，并重新覆盖 snapshot 与截图。因此最终截图对应的是带 operator/role/approval headers 的真实 v321 route，不是 403 页面。

## 下一步

v321 完成后，当前计划进入：

```text
Node v322：post-endpoint-handle prerequisite closure review
```

v322 只能判断 `endpoint-handle-allowlist-approval` 是否能进入 `contract-intake-and-upstream-echo-complete`。即使 v322 关闭该 prerequisite，`no-network-safety-fixture` 和 `abort-rollback-semantics` 仍然未完成，真实 managed audit connection 仍不能打开。
