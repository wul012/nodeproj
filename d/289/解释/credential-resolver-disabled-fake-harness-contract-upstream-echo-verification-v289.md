# Node v289 运行说明：disabled fake harness contract upstream echo verification

## 本版目标

按 `docs/plans2/v287-post-test-only-fake-harness-precheck-roadmap.md` 推进 Node v289：消费 Node v288 disabled fake harness contract、Java v122-v126 只读质量证据、mini-kv v127 non-participation receipt，确认三项目仍停在“合同/证据回声”阶段。

本版不新增 fake harness runtime，不读取 credential value，不解析 raw endpoint URL，不打开 managed audit connection，不发送 HTTP/TCP，不写 approval ledger，不执行 schema migration，不自动启动 Java 或 mini-kv。

## 改动结果

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.test.ts
d/289/evidence/credential-resolver-disabled-fake-harness-contract-upstream-echo-verification-v289.json
d/289/evidence/credential-resolver-disabled-fake-harness-contract-upstream-echo-verification-v289.md
```

调整：

```text
src/routes/auditJsonMarkdownRoutes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.ts
fixtures/historical/sibling-workspaces/...
```

其中 `ImplementationPlanUpstreamEchoVerification` 的小修是为了让旧版本 v286 消费 mini-kv v126 里固化的 Node v283 digest 快照，避免后续代码演进导致历史 gate 重新计算后漂移。

## 验证重点

- `sourceNodeV288`：确认 Node v288 contract ready，且 fake harness runtime、provider/client、HTTP/TCP、ledger、schema migration 全部仍关闭。
- `javaV122V126`：确认 Java v122-v125 集成测试四连拆完成，Java v126 catalog 化止血完成，并且这些版本都声明不新增 fake harness runtime、不读取 credential、不解析 raw endpoint、不连接 managed audit、不写 ledger/SQL。
- `miniKvV127`：读取结构化 JSON receipt，确认它 echo Node v288 contract digest、inputs/outputs/artifacts/assertions/actions，并保持 non-participation。
- `forced historical fixture fallback`：补齐 Java v122-v126 与 mini-kv v127 的历史 fixture，保证 GitHub runner 没有本机兄弟仓库时也能验证。

## 验证命令

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck.test.ts test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract.test.ts test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.test.ts
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.test.ts
npx vitest run test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.test.ts
npx vitest run test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.test.ts
npx vitest run test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.test.ts
npx vitest run test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.test.ts test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.test.ts test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.test.ts
npm test
npm run build
```

全量 `npm test` 第一次结果：222 个测试文件中 219 个通过，755/758 个用例通过；剩余 3 个 live-probe route 用例在全量并发下触发 60 秒测试预算超时。三者单文件复跑均通过，因此记录为全量预算稳定性问题，不是 v289 业务逻辑失败。本版已把这三个 route 用例预算从 60 秒提高到 90 秒，用于稳定全量并发验证，不改业务行为。最终全量结果：222 个测试文件、758 个用例全部通过。

## 清理

本版未启动 Java、mini-kv 或 Node 长驻服务；生成的 `dist/` 会在 build 验证后删除。
