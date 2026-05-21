# Node v293 运行说明：credential resolver fake harness readiness blocked decision upstream echo verification

## 本版目标

按 `docs/plans2/v292-post-fake-harness-readiness-decision-roadmap.md` 推进 Node v293：消费 Node v292、Java v131、mini-kv v129 的已归档证据，确认 fake harness readiness blocked decision 已经得到三方上游回声支撑。

本版结论是：**upstream echo verification ready，但 runtime shell 仍不解锁**。也就是说，Node v293 只证明 Java direct execution-denied echo 与 mini-kv receipt retention check 已经补齐，不实现 fake harness runtime，不读取 credential value，不解析 raw endpoint URL，不连接 managed audit。

## 改动结果

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.test.ts
d/293/evidence/credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification-v293.json
d/293/evidence/credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification-v293.md
```

新增 historical fixture：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/d/131/解释/说明.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/133-version-131-credential-resolver-execution-denied-echo.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverExecutionDeniedEchoSupport.java
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-disabled-fake-harness-execution-denied-receipt-verification-retention-check.json
fixtures/historical/sibling-workspaces/mini-kv/d/129/解释/说明.md
```

调整：

```text
src/routes/auditJsonMarkdownRoutes.ts
docs/plans2/v292-post-fake-harness-readiness-decision-roadmap.md
docs/plans2/README.md
```

## 决策语义

v293 区分两层结论：

```text
verificationState = fake-harness-readiness-blocked-decision-upstream-echo-verification-ready
readyForDisabledRuntimeShellPlanning = false
```

第一层说明 Node 已经能用 Java v131 和 mini-kv v129 补齐 v292 的上游证据缺口；第二层说明这仍然不是 runtime 授权。

## 验证重点

- `sourceNodeV292.readinessDecision=blocked`。
- `javaV131.directExecutionDeniedEchoPresent=true`。
- `miniKvV129.readyForNodeV293=true`。
- `missingJavaEchoResolvedByJavaV131=true`。
- `sideEffectBoundariesClosed=true`。
- `credentialBoundaryClosed=true`。
- `connectionBoundaryClosed=true`。
- `writeBoundaryClosed=true`。
- `productionBlockerCount=0`。

## 验证命令

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.test.ts
```

当前 evidence 摘要：

```text
checkCount=20
passedCheckCount=20
evidenceFileCount=5
matchedSnippetCount=19
productionBlockerCount=0
verificationDigest=a32c3b7ce9e42a41c5df0d39407c26f6d44c17e1cf709e9e2fa33e725d0a7665
```

## 清理

本版未启动 Java、mini-kv 或 Node 长驻服务；未创建临时 helper 文件。
