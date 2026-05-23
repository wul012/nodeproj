# Node v317 credential handle approval contract intake 运行说明

## 本版目标

v317 继续执行 `docs/plans2/v316-post-signed-artifact-prerequisite-closure-roadmap.md`，消费 Node v316 的 closure review，把下一项缺失 prerequisite `credential-handle-approval` 推进到 `contract-intake-defined`。

本版只定义非 secret credential handle approval contract，不代表 credential 已批准，也不读取 credential value。它不解析 raw endpoint URL，不实例化 secret provider / resolver client，不发 HTTP/TCP 请求，不写 approval ledger，不执行 schema migration，不自动启动 Java 或 mini-kv。

## 运行结果

- JSON evidence：`d/317/evidence/credential-handle-approval-contract-intake-v317.json`
- Markdown evidence：`d/317/evidence/credential-handle-approval-contract-intake-v317.md`
- HTTP JSON smoke：`d/317/evidence/credential-handle-approval-contract-intake-v317-http.json`
- HTTP Markdown smoke：`d/317/evidence/credential-handle-approval-contract-intake-v317-http.md`
- HTML evidence：`d/317/credential-handle-approval-contract-intake-v317.html`
- Playwright MCP snapshot：`d/317/evidence/credential-handle-approval-contract-intake-v317-snapshot.md`
- Playwright MCP screenshot：`d/317/图片/credential-handle-approval-contract-intake-v317.png`

关键状态：

```text
contractState = credential-handle-approval-contract-intake-ready
targetPrerequisiteId = credential-handle-approval
beforeV317 = still-missing
afterV317 = contract-intake-defined
completedPrerequisiteCountBeforeV317 = 2
remainingPrerequisiteCountBeforeV317 = 4
requiredFieldCount = 10
prohibitedFieldCount = 8
rejectionReasonCount = 5
noGoBoundaryCount = 9
passedCheckCount = 20 / 20
productionBlockerCount = 0
readyForParallelJavaV146MiniKvV139Echo = true
readyForNodeV318BeforeUpstreamEcho = false
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

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake.test.ts
  1 test file passed, 4 tests passed

npm test
  250 test files passed, 864 tests passed

npm run build
  passed

HTTP smoke
  /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake
  JSON 200
  Markdown 200
```

## 截图说明

截图通过 Playwright MCP 打开本轮 HTML evidence 获取。页面有 1 条 console error，为静态 HTML 的 favicon 请求缺失，不影响 evidence 内容、快照或截图。

## 下一步

v317 完成后，计划进入推荐并行阶段：

```text
Java v146 + mini-kv v139
```

两边都只做只读 echo / non-participation receipt；Node v318 必须等 Java v146 和 mini-kv v139 都完成后，才能做 credential-handle approval upstream echo verification。
