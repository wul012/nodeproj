# Node v324 no-network safety fixture upstream echo verification 运行说明

## 本版定位

v324 执行 `docs/plans2/v322-post-endpoint-handle-prerequisite-closure-roadmap.md` 的第三步。Node v323 已定义 `no-network-safety-fixture` contract，Java v149 和 mini-kv v141 已完成并行只读 echo / non-participation；本版只做三方 upstream echo verification，不启动 Java/mini-kv，不发 HTTP/TCP，不读取 credential value，不解析 raw endpoint URL。

## 产物

- JSON evidence：`d/324/evidence/no-network-safety-fixture-upstream-echo-verification-v324.json`
- Markdown evidence：`d/324/evidence/no-network-safety-fixture-upstream-echo-verification-v324.md`
- HTTP JSON smoke：`d/324/evidence/no-network-safety-fixture-upstream-echo-verification-v324-http.json`
- HTTP Markdown smoke：`d/324/evidence/no-network-safety-fixture-upstream-echo-verification-v324-http.md`
- HTTP smoke summary：`d/324/evidence/no-network-safety-fixture-upstream-echo-verification-v324-smoke-summary.json`
- HTML evidence：`d/324/no-network-safety-fixture-upstream-echo-verification-v324.html`
- Playwright MCP snapshot：`d/324/evidence/no-network-safety-fixture-upstream-echo-verification-v324-snapshot.md`
- Playwright MCP screenshot：`d/324/图片/no-network-safety-fixture-upstream-echo-verification-v324.png`

## 关键结果

```text
verificationState = no-network-safety-fixture-upstream-echo-verification-ready
activeNodeVerificationVersion = Node v324
consumesNodeV323NoNetworkSafetyFixtureContractIntake = true
consumesJavaV149NoNetworkSafetyFixtureContractEcho = true
consumesMiniKvV141NoNetworkSafetyFixtureContractNonParticipationReceipt = true
requiredFieldCount = 10
prohibitedFieldCount = 12
rejectionReasonCount = 6
noGoBoundaryCount = 10
productionBlockerCount = 0
```

本版确认 Java v149 和 mini-kv v141 都回显了 Node v323 的 contract digest `73dcd413298048da6283f81bd0c3b759b9c1c2d360eb1382983d7db7349b2b88`，并且 `networkSafetyFixtureExecuted=false`、`httpRequestSent=false`、`tcpConnectionAttempted=false`、`externalRequestSent=false`、`approvalLedgerWritten=false`、`schemaMigrationExecuted=false`、`automaticUpstreamStart=false`。

## 验证记录

```powershell
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake.test.ts
npm run build
npm test
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan.test.ts test/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification.test.ts test/productionLiveProbeRealReadSmokeOperatorRunbook.test.ts
```

结果：

- `typecheck` 通过。
- v323-v324 聚焦链路通过：2 files / 8 tests。
- `build` 通过。
- 全量 `npm test`：253 files / 888 tests 通过，4 个历史路由测试在全量并发里超时；这 4 个文件随后单独成组复跑通过：4 files / 16 tests。判定为本地全量并发预算抖动，不是 v324 断言或行为失败。
- HTTP smoke 通过：JSON 200，Markdown 200。
- Playwright MCP 截图完成；为截图临时启动 `python -m http.server` 承载 `d/324`，截图后应停止。

## 下一步

v324 只证明三方 upstream echo 对齐，不直接关闭 prerequisite。下一步是 Node v325：`no-network-safety-fixture prerequisite closure review`。即使 v325 关闭该 prerequisite，也仍不解锁 provider/client、HTTP/TCP、ledger/schema 或 runtime shell；最后剩余项仍是 `abort-rollback-semantics`。
