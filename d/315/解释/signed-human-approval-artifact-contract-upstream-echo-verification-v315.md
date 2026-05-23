# Node v315 signed human approval artifact contract upstream echo verification 运行说明

## 本版目标

v315 继续 `docs/plans2/v313-post-prerequisite-catalog-cleanup-roadmap.md`，消费已经完成的三方证据：

- Node v314：signed human approval artifact contract intake。
- Java v145：只读 echo Node v314 contract。
- mini-kv v138：non-participation receipt，只确认不存储、不校验、不承载 authority。

本版只做上游 echo verification，不实现 runtime shell，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP 上游请求，不写 ledger，不执行 schema migration，不自动启动 Java 或 mini-kv。

## 运行结果

- JSON evidence：`d/315/evidence/signed-human-approval-artifact-contract-upstream-echo-verification-v315.json`
- Markdown evidence：`d/315/evidence/signed-human-approval-artifact-contract-upstream-echo-verification-v315.md`
- HTTP JSON smoke：`d/315/evidence/signed-human-approval-artifact-contract-upstream-echo-verification-v315-http.json`
- HTTP Markdown smoke：`d/315/evidence/signed-human-approval-artifact-contract-upstream-echo-verification-v315-http.md`
- HTML evidence：`d/315/signed-human-approval-artifact-contract-upstream-echo-verification-v315.html`
- Playwright MCP snapshot：`d/315/evidence/signed-human-approval-artifact-contract-upstream-echo-verification-v315-snapshot.md`
- Playwright MCP screenshot：`d/315/图片/signed-human-approval-artifact-contract-upstream-echo-verification-v315.png`

关键状态：

```text
verificationState = signed-human-approval-artifact-contract-upstream-echo-verification-ready
sourceSpan = Node v314 + Java v145 + mini-kv v138
requiredFieldCount = 11
prohibitedFieldCount = 8
rejectionReasonCount = 5
noGoBoundaryCount = 8
upstreamEchoRequestCount = 2
passedCheckCount = 23 / 23
productionBlockerCount = 0
executionAllowed = false
connectsManagedAudit = false
runtimeShellImplemented = false
```

## 验证

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification.test.ts
  1 test file passed, 4 tests passed

npx vitest run <8 个 live-probe route timeout 文件>
  8 test files passed, 32 tests passed

npm test
  248 test files passed, 856 tests passed

npm run build
  passed

HTTP smoke
  /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification
  JSON 200
  Markdown 200
```

全量测试第一次暴露 8 个旧 live-probe JSON/Markdown route 用例在并发下超过 60s，但这 8 个文件成组重跑全部通过。v315 只把这些旧 route 用例的最后一个 route smoke 预算从 60s 调到 90s；这是测试预算稳定，不是业务行为修复。

## 截图说明

截图通过 Playwright MCP 打开本轮 HTML evidence 获取。页面有 1 条 console error，为静态 HTML 的 favicon 请求缺失，不影响 evidence 内容、快照或截图。

## 下一步

v315 完成后，计划下一步是：

```text
Node v316：post-signed-artifact prerequisite closure review
```

v316 只能判断 `signed-human-approval-artifact` 是否可从 `still-missing` 推进到 `contract-intake-and-upstream-echo-complete`。即使通过，也仍不能解锁 credential value、raw endpoint URL、provider/client、HTTP/TCP、ledger/schema 或 runtime shell。
