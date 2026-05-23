# Node v314 signed human approval artifact contract intake 运行说明

## 本版目标

v314 继续 `docs/plans2/v313-post-prerequisite-catalog-cleanup-roadmap.md`，只推进 v312 剩余 5 个 prerequisite 中的第一个：`signed-human-approval-artifact`。

本版做的是非 secret contract intake：

- 定义 signed human approval artifact 的必要字段、禁止字段、拒绝原因和 no-go 边界。
- 复用 v313 prerequisite catalog，不重新手写 prerequisite id / label。
- 明确 Java v145 + mini-kv v138 可以在 v314 完成后并行做只读 echo / non-participation。
- 不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP 上游请求，不写 ledger，不执行 schema migration，不实现 runtime shell。

## 运行结果

- JSON evidence：`d/314/evidence/signed-human-approval-artifact-contract-intake-v314.json`
- Markdown evidence：`d/314/evidence/signed-human-approval-artifact-contract-intake-v314.md`
- HTTP JSON smoke：`d/314/evidence/signed-human-approval-artifact-contract-intake-v314-http.json`
- HTTP Markdown smoke：`d/314/evidence/signed-human-approval-artifact-contract-intake-v314-http.md`
- HTML evidence：`d/314/signed-human-approval-artifact-contract-intake-v314.html`
- Playwright MCP snapshot：`d/314/evidence/signed-human-approval-artifact-contract-intake-v314-snapshot.md`
- Playwright MCP screenshot：`d/314/图片/signed-human-approval-artifact-contract-intake-v314.png`

关键状态：

```text
contractState = signed-human-approval-artifact-contract-intake-ready
targetPrerequisiteId = signed-human-approval-artifact
requiredFieldCount = 11
prohibitedFieldCount = 8
rejectionReasonCount = 5
noGoBoundaryCount = 8
upstreamEchoRequestCount = 2
readyForParallelJavaV145MiniKvV138Echo = true
readyForNodeV315BeforeUpstreamEcho = false
executionAllowed = false
connectsManagedAudit = false
```

## 验证

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake.test.ts
  1 test file passed, 4 tests passed

npm run build
  passed

npm test
  247 test files passed, 852 tests passed

HTTP smoke
  /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake
  JSON 200
  Markdown 200
```

全量测试第一次暴露两个旧 route-table 用例在并发下超过 45s，但单文件和成组重跑均通过；本版只把这两个旧 JSON/Markdown route 测试预算调到 60s。该调整是测试预算稳定，不是业务行为修复。

## 截图说明

截图通过 Playwright MCP 打开本轮 HTML evidence 获取。页面有 1 条 console error，为静态 HTML 的 favicon 请求缺失，不影响 evidence 内容、快照或截图。

## 下一步

v314 完成后，计划推荐并行：

```text
Java v145 + mini-kv v138
```

两边都只能做只读 echo / non-participation。Node v315 必须等待这两边完成后，再做 signed human approval artifact contract upstream echo verification。
