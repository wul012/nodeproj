# Node v291 运行说明：execution-denied upstream echo verification

## 本版目标

按 `docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md` 推进 Node v291：消费 Node v290 的 execution-denied route preflight、Java v127-v130 的质量证据、mini-kv v128 的 execution-denied non-participation receipt，生成一次只读 upstream echo verification。

本版结论是 `blocked`，但这是预期结果：mini-kv v128 已能回显 Node v290 的 preflight digest，Java v127-v130 也完成质量止血；不过 Java 侧还没有直接的 execution-denied echo，所以 Node 不能把质量证据当成执行回声，更不能抢跑 fake harness runtime。

## 改动结果

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.test.ts
d/291/evidence/credential-resolver-execution-denied-upstream-echo-verification-v291.json
d/291/evidence/credential-resolver-execution-denied-upstream-echo-verification-v291.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/d/127/解释/说明.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/d/128/解释/说明.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/d/129/解释/说明.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/d/130/解释/说明.md
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-disabled-fake-harness-execution-denied-non-participation-receipt.json
```

调整：

```text
src/routes/auditJsonMarkdownRoutes.ts
docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md
docs/plans2/README.md
```

## 验证重点

- `sourceNodeV290`：确认 v290 preflight ready，preflight digest 是稳定 sha256，且 execution attempt 数仍为 0。
- `javaV127V130`：确认 Java v127-v130 质量证据存在，并记录 live aggregation 二拆、ResponseRecords 二拆、OverviewTests 二拆、echo catalog 延伸。
- `miniKvV128`：确认 mini-kv v128 receipt 回显 Node v290 route path 和 preflight digest，并继续声明不执行 fake harness、不读 credential、不解析 raw endpoint、不发 HTTP/TCP、不写 ledger/schema/storage。
- `checks.javaExecutionDeniedEchoPresent=false`：明确标记 Java 质量证据不是 Java execution-denied echo，不能被 Node 用来解锁下一阶段 runtime；该缺口会进入 `productionBlockers`。
- 归档 profile 统计：`checkCount=19`、`passedCheckCount=17`、`productionBlockerCount=1`、`warningCount=1`。

## 验证命令

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.test.ts
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.test.ts test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.test.ts
npx vitest run test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.test.ts test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.test.ts test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.test.ts
npm test
npm run build
```

全量结果：224 个测试文件、765 个用例通过。`npm run build` 通过。

说明：全量第一次运行时，3 个既有 production live-probe route 用例在全量并发下触发 60s 默认超时；三个文件单独重跑全部通过。随后只给这 3 个 route smoke 用例补显式 90s timeout，属于测试预算稳定，不改变业务行为。

## 清理

本版未启动 Java、mini-kv 或 Node 长驻服务；`dist/` 在 build 验证后删除。
