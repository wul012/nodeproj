# Node v322 endpoint handle allowlist approval prerequisite closure review 运行说明

## 本版目标

v322 执行 `docs/plans2/v319-post-credential-handle-prerequisite-closure-roadmap.md` 的收口步骤。v321 已经验证 Node v320、Java v147、mini-kv v140 对 endpoint-handle allowlist approval contract 的只读 echo 一致；本版只判断 `endpoint-handle-allowlist-approval` 是否可以推进到 `contract-intake-and-upstream-echo-complete`。

本版仍不是 managed audit connection。它不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发送 HTTP/TCP，不写 approval ledger，不执行 SQL/schema migration，也不打开 runtime shell。

## 运行结果

- JSON evidence：`d/322/evidence/endpoint-handle-allowlist-approval-prerequisite-closure-review-v322.json`
- Markdown evidence：`d/322/evidence/endpoint-handle-allowlist-approval-prerequisite-closure-review-v322.md`
- HTTP JSON smoke：`d/322/evidence/endpoint-handle-allowlist-approval-prerequisite-closure-review-v322-http.json`
- HTTP Markdown smoke：`d/322/evidence/endpoint-handle-allowlist-approval-prerequisite-closure-review-v322-http.md`
- HTTP smoke summary：`d/322/evidence/endpoint-handle-allowlist-approval-prerequisite-closure-review-v322-smoke-summary.json`
- HTML evidence：`d/322/endpoint-handle-allowlist-approval-prerequisite-closure-review-v322.html`
- Playwright MCP snapshot：`d/322/evidence/endpoint-handle-allowlist-approval-prerequisite-closure-review-v322-snapshot.md`
- Playwright MCP screenshot：`d/322/图片/endpoint-handle-allowlist-approval-prerequisite-closure-review-v322.png`

关键状态：

```text
reviewState = endpoint-handle-allowlist-approval-prerequisite-closure-review-ready
activeNodeReviewVersion = Node v322
sourceSpan = Node v321
movedPrerequisiteId = endpoint-handle-allowlist-approval
movedTo = contract-intake-and-upstream-echo-complete
completedPrerequisiteCount = 4
remainingPrerequisiteCount = 2
nextConcretePrerequisiteId = no-network-safety-fixture
checkCount = 17
passedCheckCount = 17
productionBlockerCount = 0
executionAllowed = false
connectsManagedAudit = false
credentialValueRead = false
endpointHandleAllowlistApproved = false
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

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview.test.ts
  1 test file passed, 4 tests passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake.test.ts test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview.test.ts
  3 test files passed, 12 tests passed

npm run build
  passed

HTTP smoke
  JSON 200
  Markdown 200
```

全量 `npm test` 本轮暴露的是测试预算问题：默认并发下多组历史 route-table 用例命中各自写死的 45/90 秒 timeout；单 worker / 2 worker 重跑又超过本轮命令预算。失败项没有 v322 断言差异，v322 聚焦测试和 v320-v322 链路测试均已通过。本版不把这个历史全量预算问题混入 v322 业务逻辑修复。

## 截图说明

本轮使用 Playwright MCP 打开真实 Markdown route，并通过 `browser_run_code_unsafe` 注入 operator/role/approval headers，截图对应真实 v322 route 的 200 页面，不是静态 HTML 或 403 页面。

## 下一步

v322 完成后，当前计划转入：

```text
Node v323：no-network safety fixture contract intake
```

v323 只能定义“未来 runtime path 在未审批时拒绝 HTTP/TCP”的 fixture contract。即使后续关闭 `no-network-safety-fixture`，`abort-rollback-semantics` 仍然未完成，真实 managed audit connection 仍不能打开。
