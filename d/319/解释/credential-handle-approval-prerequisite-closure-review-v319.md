# Node v319 credential handle approval prerequisite closure review 运行说明

## 本版目标

v319 继续执行 `docs/plans2/v316-post-signed-artifact-prerequisite-closure-roadmap.md` 并完成该计划收口。上一版 Node v318 已消费 Node v317、Java v146、mini-kv v139，证明 `credential-handle-approval` 的非 secret contract 已被三方只读 echo / non-participation 对齐。本版只做 closure review：把 `credential-handle-approval` 从 `contract-intake-defined` 推进到 `contract-intake-and-upstream-echo-complete`。

本版不读取 credential value，不解析 raw endpoint URL，不实例化 secret provider / resolver client，不发送 HTTP/TCP 到 managed audit，不写 approval ledger，不执行 schema migration，也不自动启动 Java 或 mini-kv。

## 运行结果

- JSON evidence：`d/319/evidence/credential-handle-approval-prerequisite-closure-review-v319.json`
- Markdown evidence：`d/319/evidence/credential-handle-approval-prerequisite-closure-review-v319.md`
- HTTP JSON smoke：`d/319/evidence/credential-handle-approval-prerequisite-closure-review-v319-http.json`
- HTTP Markdown smoke：`d/319/evidence/credential-handle-approval-prerequisite-closure-review-v319-http.md`
- HTML evidence：`d/319/credential-handle-approval-prerequisite-closure-review-v319.html`
- Playwright MCP snapshot：`d/319/evidence/credential-handle-approval-prerequisite-closure-review-v319-snapshot.md`
- Playwright MCP screenshot：`d/319/图片/credential-handle-approval-prerequisite-closure-review-v319.png`

关键状态：

```text
reviewState = credential-handle-approval-prerequisite-closure-review-ready
sourceSpan = Node v318
movedPrerequisiteId = credential-handle-approval
movedTo = contract-intake-and-upstream-echo-complete
nextConcretePrerequisiteId = endpoint-handle-allowlist-approval
completedPrerequisiteCount = 3 / 6
remainingPrerequisiteCount = 3 / 6
requiredFieldCount = 10
prohibitedFieldCount = 8
rejectionReasonCount = 5
noGoBoundaryCount = 9
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

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview.test.ts
  1 test file passed, 4 tests passed

npm test
  252 test files passed, 872 tests passed

npm run build
  passed

HTTP smoke
  /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review
  JSON 200
  Markdown 200
```

第一次全量 `npm test` 在 184 秒预算内超时且没有断言失败输出；按 timeout triage 规则重跑全量测试，第二次在更合理预算下通过。这是测试预算问题，不是业务断言修复。

## 截图说明

截图通过 Playwright MCP 打开本轮 HTTP Markdown route 获取。MCP 本轮使用 `page.setExtraHTTPHeaders()` 注入访问控制头，实际 HTTP smoke 也以同一组 operator / role / correlation headers 命中 JSON 与 Markdown 路由。

## 下一步

v319 完成后，当前有效计划切换到：

```text
docs/plans2/v319-post-credential-handle-prerequisite-closure-roadmap.md
```

下一版是：

```text
Node v320：endpoint-handle allowlist approval contract intake
```

v320 只能定义 endpoint handle / allowlist review status 等非 raw URL contract。即使 v320 完成，也仍不解锁 raw endpoint URL、provider/client、HTTP/TCP、ledger/schema 或 runtime shell。
