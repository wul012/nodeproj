# Node v316 signed human approval artifact prerequisite closure review 运行说明

## 本版目标

v316 收口 `docs/plans2/v313-post-prerequisite-catalog-cleanup-roadmap.md`，消费 Node v315 的三方 upstream echo verification，只判断 `signed-human-approval-artifact` 这个 prerequisite 是否可以从 `contract-intake-defined` 推进到 `contract-intake-and-upstream-echo-complete`。

本版不是 runtime shell 实现，也不是真实 managed audit connection。v316 只改变 prerequisite review 状态：当前完成 2/6，剩余 4/6。它不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP 请求，不写 ledger，不执行 schema migration，不自动启动 Java 或 mini-kv。

## 运行结果

- JSON evidence：`d/316/evidence/signed-human-approval-artifact-prerequisite-closure-review-v316.json`
- Markdown evidence：`d/316/evidence/signed-human-approval-artifact-prerequisite-closure-review-v316.md`
- HTTP JSON smoke：`d/316/evidence/signed-human-approval-artifact-prerequisite-closure-review-v316-http.json`
- HTTP Markdown smoke：`d/316/evidence/signed-human-approval-artifact-prerequisite-closure-review-v316-http.md`
- HTML evidence：`d/316/signed-human-approval-artifact-prerequisite-closure-review-v316.html`
- Playwright MCP snapshot：`d/316/evidence/signed-human-approval-artifact-prerequisite-closure-review-v316-snapshot.md`
- Playwright MCP screenshot：`d/316/图片/signed-human-approval-artifact-prerequisite-closure-review-v316.png`

关键状态：

```text
reviewState = signed-human-approval-artifact-prerequisite-closure-review-ready
movedPrerequisiteId = signed-human-approval-artifact
movedFrom = contract-intake-defined
movedTo = contract-intake-and-upstream-echo-complete
completedPrerequisiteCount = 2
remainingPrerequisiteCount = 4
nextConcretePrerequisiteId = credential-handle-approval
nextNodeVersionSuggested = Node v317
passedCheckCount = 17 / 17
productionBlockerCount = 0
executionAllowed = false
connectsManagedAudit = false
runtimeShellImplemented = false
```

## 验证

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview.test.ts
  1 test file passed, 4 tests passed

npm test
  249 test files passed, 860 tests passed

npm run build
  passed

HTTP smoke
  /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review
  JSON 200
  Markdown 200
```

全量测试第一次暴露 3 个旧 JSON/Markdown route 用例在并发下超过 45s，但这 3 个文件成组重跑全部通过。v316 只把这些旧 route 用例的最后一个 route smoke 预算从 45s 调到 60s；这是测试预算稳定，不是业务行为修复。

## 截图说明

截图通过 Playwright MCP 打开本轮 HTML evidence 获取。页面有 1 条 console error，为静态 HTML 的 favicon 请求缺失，不影响 evidence 内容、快照或截图。

## 下一步

v316 完成后，当前有效计划切换到：

```text
docs/plans2/v316-post-signed-artifact-prerequisite-closure-roadmap.md
```

下一步是 Node v317：credential-handle approval contract intake。Java v146 + mini-kv v139 只有在 Node v317 完成后才推荐并行。
