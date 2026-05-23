# Node v318 credential handle approval contract upstream echo verification 运行说明

## 本版目标

v318 继续执行 `docs/plans2/v316-post-signed-artifact-prerequisite-closure-roadmap.md`。上一版 Node v317 已经定义 `credential-handle-approval` 的非 secret contract；Java v146 和 mini-kv v139 也已经完成只读 echo / non-participation receipt。本版只做三方理解一致性验证。

本版不读取 credential value，不解析 raw endpoint URL，不实例化 secret provider / resolver client，不发送 HTTP/TCP 到 managed audit，不写 approval ledger，不执行 schema migration，也不自动启动 Java 或 mini-kv。

## 运行结果

- JSON evidence：`d/318/evidence/credential-handle-approval-contract-upstream-echo-verification-v318.json`
- Markdown evidence：`d/318/evidence/credential-handle-approval-contract-upstream-echo-verification-v318.md`
- HTTP JSON smoke：`d/318/evidence/credential-handle-approval-contract-upstream-echo-verification-v318-http.json`
- HTTP Markdown smoke：`d/318/evidence/credential-handle-approval-contract-upstream-echo-verification-v318-http.md`
- HTML evidence：`d/318/credential-handle-approval-contract-upstream-echo-verification-v318.html`
- Playwright MCP snapshot：`d/318/evidence/credential-handle-approval-contract-upstream-echo-verification-v318-snapshot.md`
- Playwright MCP screenshot：`d/318/图片/credential-handle-approval-contract-upstream-echo-verification-v318.png`

关键状态：

```text
verificationState = credential-handle-approval-contract-upstream-echo-verification-ready
sourceSpan = Node v317 + Java v146 + mini-kv v139
requiredFieldCount = 10
prohibitedFieldCount = 8
rejectionReasonCount = 5
noGoBoundaryCount = 9
passedCheckCount = 23 / 23
productionBlockerCount = 0
javaV146EvidencePresent = true
miniKvV139EvidencePresent = true
upstreamEchoesAligned = true
credentialHandleContractAligned = true
sideEffectBoundariesAligned = true
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

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification.test.ts
  1 test file passed, 4 tests passed

npm test
  251 test files passed, 868 tests passed

npm run build
  passed

HTTP smoke
  /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification
  JSON 200
  Markdown 200
```

## 截图说明

截图通过 Playwright MCP 打开本轮 HTML evidence 获取。页面有 1 条 console error，为静态 HTML 的 favicon 请求缺失，不影响 evidence 内容、快照或截图。

## 下一步

v318 完成后，计划进入：

```text
Node v319：post-credential-handle prerequisite closure review
```

v319 只能判断 `credential-handle-approval` 是否可以推进到 `contract-intake-and-upstream-echo-complete`。即使 v319 完成，也仍不解锁 raw endpoint URL、provider/client、HTTP/TCP、ledger/schema 或 runtime shell。
