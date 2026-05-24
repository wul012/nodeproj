# Node v323 no-network safety fixture contract intake 运行说明

## 本版目标

v323 执行 `docs/plans2/v322-post-endpoint-handle-prerequisite-closure-roadmap.md` 的第一步。v322 已经关闭 `endpoint-handle-allowlist-approval`，剩余前置项变成 `no-network-safety-fixture` 和 `abort-rollback-semantics`。本版只定义 `no-network-safety-fixture` 的 contract intake，说明未来 runtime path 在未审批时应该拒绝 HTTP/TCP，并列出需要的 denial evidence、禁止动作和 cleanup marker。

本版仍不是网络演练。它不运行 fixture，不发送 HTTP/TCP，不打开 socket，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不写 approval ledger，不执行 SQL/schema migration，也不启动 Java/mini-kv。

## 运行结果

- JSON evidence：`d/323/evidence/no-network-safety-fixture-contract-intake-v323.json`
- Markdown evidence：`d/323/evidence/no-network-safety-fixture-contract-intake-v323.md`
- HTTP JSON smoke：`d/323/evidence/no-network-safety-fixture-contract-intake-v323-http.json`
- HTTP Markdown smoke：`d/323/evidence/no-network-safety-fixture-contract-intake-v323-http.md`
- HTTP smoke summary：`d/323/evidence/no-network-safety-fixture-contract-intake-v323-smoke-summary.json`
- HTML evidence：`d/323/no-network-safety-fixture-contract-intake-v323.html`
- Playwright MCP snapshot：`d/323/evidence/no-network-safety-fixture-contract-intake-v323-snapshot.md`
- Playwright MCP screenshot：`d/323/图片/no-network-safety-fixture-contract-intake-v323.png`

关键状态：

```text
contractState = no-network-safety-fixture-contract-intake-ready
activeNodeContractVersion = Node v323
targetPrerequisiteId = no-network-safety-fixture
nextJavaVersion = Java v149
nextMiniKvVersion = mini-kv v141
nextNodeVerificationVersion = Node v324
readyForParallelJavaV149MiniKvV141Echo = true
readyForNodeV324BeforeUpstreamEcho = false
requiredFieldCount = 10
prohibitedFieldCount = 12
rejectionReasonCount = 6
noGoBoundaryCount = 10
upstreamEchoRequestCount = 2
checkCount = 21
passedCheckCount = 21
productionBlockerCount = 0
networkSafetyFixtureExecuted = false
httpRequestSent = false
tcpConnectionAttempted = false
externalRequestSent = false
credentialValueRead = false
rawEndpointUrlParsed = false
secretProviderInstantiated = false
resolverClientInstantiated = false
approvalLedgerWritten = false
schemaMigrationExecuted = false
automaticUpstreamStart = false
```

## 验证

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake.test.ts
  1 test file passed, 4 tests passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview.test.ts test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake.test.ts
  2 test files passed, 8 tests passed

npm run build
  passed

npm test
  256 test files passed, 888 tests passed

HTTP smoke
  JSON 200
  Markdown 200
```

## 截图说明

本轮使用 Playwright MCP 打开真实 Markdown route，并通过 `browser_run_code_unsafe` 注入 operator/role/approval headers。截图对应真实 v323 route 的 200 页面。

## 下一步

v323 完成后，当前计划进入：

```text
推荐并行：Java v149 + mini-kv v141
```

Java v149 只读 echo no-network fixture contract；mini-kv v141 只读 non-participation receipt。两边完成后，Node v324 才能消费它们做 no-network safety fixture upstream echo verification。
