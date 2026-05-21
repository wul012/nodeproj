# 298 - Node v293 credential resolver fake harness readiness blocked decision upstream echo verification

## 版本定位

Node v293 是 v292 之后的三方证据对齐版。v292 的结论是 decision record 可以归档，但 readiness decision 仍 blocked，因为 Java direct execution-denied echo 缺失。v293 消费 Java v131 和 mini-kv v129 后，把这个缺口闭合成只读 upstream echo verification。

入口是 [managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.ts:52) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification`。这个函数只读本地/历史证据，不启动 Java、mini-kv 或外部 audit 服务。

## 类型边界

[managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationTypes.ts:9) 明确保留安全字段：

```ts
readyForDisabledRuntimeShellPlanning: false;
realResolverImplementationAllowed: false;
testOnlyFakeHarnessAllowed: false;
testOnlyFakeHarnessExecutionAllowed: false;
fakeHarnessRuntimeEnabled: false;
fakeHarnessInvocationAllowed: false;
executionAllowed: false;
connectsManagedAudit: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
schemaMigrationExecuted: false;
approvalLedgerWritten: false;
automaticUpstreamStart: false;
```

这些字段说明 v293 只是证据验证，不是 runtime shell 前进许可。

## Source Node v292

`createSourceNodeV292` 在 [managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.ts:148) 调用 v292 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord({ config });
```

它提取 v292 的核心状态：

```ts
decisionRecordState: "fake-harness-readiness-decision-record-ready";
readinessDecision: "blocked";
javaDirectExecutionDeniedEchoMissing: true;
implementationStillBlocked: true;
```

这让 v293 的职责很窄：只验证“Java v131 是否已经补齐缺失 echo”，不重写 v292 决策。

## Java v131 Evidence

`createJavaV131Reference` 在 [managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.ts:186) 读取三份 Java 证据：

```text
d/131/解释/说明.md
代码讲解记录_生产雏形阶段_续/133-version-131-credential-resolver-execution-denied-echo.md
ReleaseApprovalSandboxEndpointCredentialResolverExecutionDeniedEchoSupport.java
```

它检查的关键片段包括：

```ts
"direct execution-denied echo receipt"
"readyForNodeV293FakeHarnessReadinessBlockedDecisionUpstreamEchoVerification"
"java-v131-credential-resolver-direct-execution-denied-echo-only"
```

因此 Java v131 的作用是补齐 direct execution-denied echo，而不是让 Node 执行 fake harness。

## mini-kv v129 Evidence

`createMiniKvV129Reference` 在 [managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.ts:225) 读取 mini-kv v129 receipt：

```ts
readyForNodeV293: booleanField(receipt, "ready_for_node_v293_blocked_decision_upstream_echo_verification")
executionAllowed: booleanField(root, "execution_allowed") ?? booleanField(receipt, "execution_allowed")
loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed")
setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed")
```

这保证 mini-kv 仍只是 receipt retention provider，不执行 `LOAD`、`COMPACT`、`RESTORE`、`SETNXEX`，也不成为 audit/order 权威存储。

## Checks

`createChecks` 在 [managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.ts:284) 汇总 20 个检查。最关键的是：

```ts
missingJavaEchoResolvedByJavaV131:
  sourceNodeV292.javaDirectExecutionDeniedEchoMissing
  && javaV131.directExecutionDeniedEchoPresent

sideEffectBoundariesClosed:
  javaV131.noFakeHarnessRuntime
  && miniKvV129.fakeHarnessRuntimeImplemented === false
  && miniKvV129.fakeHarnessRuntimeInvoked === false
  && miniKvV129.executionAllowed === false
```

也就是说，v293 是“缺口已被只读证据闭合”，不是“可以执行”。

## 路由和测试

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:694) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification
```

测试在 [managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.test.ts:13)，覆盖：

- 默认 profile ready，但 execution 仍 false。
- `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 时 historical fixtures 可用。
- upstream probes/actions 开启时会 blocked。
- JSON 和 Markdown route 都可访问。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.test.ts
```

核心结果：

```text
checkCount=20
passedCheckCount=20
productionBlockerCount=0
verificationDigest=a32c3b7ce9e42a41c5df0d39407c26f6d44c17e1cf709e9e2fa33e725d0a7665
```

## 本版结论

v293 让 v292 的 blocked decision 得到 Java v131 和 mini-kv v129 的只读上游证据支撑。它解除的是“Java echo 缺失”这个证据缺口，不解除 runtime、credential、endpoint、network、ledger、schema 或 auto-start 边界。下一步如果继续，只能进入 Node v294 的 disabled runtime shell pre-plan intake，仍不能直接实现 runtime。
