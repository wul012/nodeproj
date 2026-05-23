# Node v320 endpoint handle allowlist approval contract intake 运行说明

## 本版目标

v320 继续执行 `docs/plans2/v319-post-credential-handle-prerequisite-closure-roadmap.md`。上一版 Node v319 已把 `credential-handle-approval` 推进到 `contract-intake-and-upstream-echo-complete`；本版只定义下一个 prerequisite：`endpoint-handle-allowlist-approval` 的非 raw URL contract。

本版不读取 credential value，不解析 raw endpoint URL，不实例化 secret provider / resolver client，不发送 HTTP/TCP 到 managed audit，不写 approval ledger，不执行 schema migration，也不自动启动 Java 或 mini-kv。

## 运行结果

- JSON evidence：`d/320/evidence/endpoint-handle-allowlist-approval-contract-intake-v320.json`
- Markdown evidence：`d/320/evidence/endpoint-handle-allowlist-approval-contract-intake-v320.md`
- HTTP JSON smoke：`d/320/evidence/endpoint-handle-allowlist-approval-contract-intake-v320-http.json`
- HTTP Markdown smoke：`d/320/evidence/endpoint-handle-allowlist-approval-contract-intake-v320-http.md`
- HTML evidence：`d/320/endpoint-handle-allowlist-approval-contract-intake-v320.html`
- Playwright MCP snapshot：`d/320/evidence/endpoint-handle-allowlist-approval-contract-intake-v320-snapshot.md`
- Playwright MCP screenshot：`d/320/图片/endpoint-handle-allowlist-approval-contract-intake-v320.png`

关键状态：

```text
contractState = endpoint-handle-allowlist-approval-contract-intake-ready
targetPrerequisiteId = endpoint-handle-allowlist-approval
activeNodeContractVersion = Node v320
nextJavaVersion = Java v147
nextMiniKvVersion = mini-kv v140
nextNodeVerificationVersion = Node v321
requiredFieldCount = 10
prohibitedFieldCount = 8
rejectionReasonCount = 5
noGoBoundaryCount = 9
upstreamEchoRequestCount = 2
productionBlockerCount = 0
credentialValueRead = false
rawEndpointUrlParsed = false
secretProviderInstantiated = false
resolverClientInstantiated = false
externalRequestSent = false
executionAllowed = false
```

## 验证

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake.test.ts
  1 test file passed, 4 tests passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview.test.ts test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake.test.ts
  2 test files passed, 8 tests passed

npm test
  253 test files passed, 876 tests passed

npm run build
  passed

HTTP smoke
  /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake
  JSON 200
  Markdown 200
```

第一次全量 `npm test` 中 v319 的 blocked-config 用例触发 30 秒测试预算超时，没有业务断言失败。按 timeout triage 规则，给该 historical-fallback 路径补 60 秒预算后，v319+v320 聚焦测试和全量测试均通过。

## 截图说明

HTTP smoke 用真实 Node 路由和访问控制 headers 验证 JSON / Markdown。Playwright MCP 本轮暴露的工具不含 header 注入，因此截图打开的是本轮生成的静态 HTML evidence；该 HTML 来自同一份 HTTP Markdown smoke 输出。页面 console 中有 1 条 favicon 缺失，不影响 evidence 内容、snapshot 或截图。

## 下一步

v320 完成后，当前计划进入：

```text
推荐并行：Java v147 + mini-kv v140
```

两边只做只读 echo / non-participation。Node v321 必须等待 Java v147 和 mini-kv v140 完成后，才能做 endpoint-handle allowlist contract upstream echo verification。
