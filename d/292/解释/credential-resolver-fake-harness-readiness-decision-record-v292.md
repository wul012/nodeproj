# Node v292 运行说明：credential resolver fake harness readiness decision record

## 本版目标

按 `docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md` 推进 Node v292：汇总 Node v287-v291，判断是否可以进入 disabled runtime shell 规划。

本版结论是：**decision record 可以归档，但 readiness decision 仍然 blocked**。原因是 Node v291 已确认 Java v127-v130 只是质量证据，不是 direct execution-denied echo；因此 Node 不能把 fake harness runtime shell 规划解锁。

## 改动结果

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.test.ts
d/292/evidence/credential-resolver-fake-harness-readiness-decision-record-v292.json
d/292/evidence/credential-resolver-fake-harness-readiness-decision-record-v292.md
```

调整：

```text
src/routes/auditJsonMarkdownRoutes.ts
docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md
docs/plans2/v292-post-fake-harness-readiness-decision-roadmap.md
docs/plans2/README.md
```

## 决策语义

v292 区分两层状态：

```text
decisionRecordState = fake-harness-readiness-decision-record-ready
readinessDecision = blocked
```

也就是说，Node 可以归档这份决策记录，但不能进入 runtime shell。`requiredEvidence` 中前三项已 present：

```text
Node v290 execution-denied route preflight
Java v127-v130 quality evidence
mini-kv v128 execution-denied non-participation receipt
```

缺失项是：

```text
Java direct execution-denied echo
```

## 验证重点

- `sourceNodeV291.verificationState=blocked`。
- `sourceNodeV291.javaExecutionDeniedEchoMissing=true`。
- `readinessDecisionRecord.allowsDisabledRuntimeShellPlanning=false`。
- `readinessDecisionRecord.allowsFakeHarnessRuntimeImplementation=false`。
- `readinessDecisionRecord.allowsCredentialValueRead=false`。
- `readinessDecisionRecord.allowsManagedAuditConnection=false`。
- `productionBlockers` 包含 `JAVA_EXECUTION_DENIED_ECHO_MISSING`。

## 验证命令

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.test.ts test/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.test.ts
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.test.ts test/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.test.ts
npm test
npm run build
```

全量结果：225 个测试文件、769 个用例通过。`npm run build` 通过。

## 清理

本版未启动 Java、mini-kv 或 Node 长驻服务；`dist/` 在 build 验证后删除。
