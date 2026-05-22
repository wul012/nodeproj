# 第三百零四版代码讲解：runtime shell chain stop-or-prerequisite decision record

本版目标是把 v303 之后的 runtime shell 链条收束成一个明确决策：当前不实现 runtime shell，而是要求先补齐显式审批前置。它不是继续堆一个普通 summary，也不是开始写 runtime shell。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans2\v303-post-decision-plan-intake-upstream-echo-roadmap.md
```

计划要求 Node v304 做：

```text
runtime shell chain stop-or-prerequisite decision record
把链条收束为：暂停 runtime shell chain，或列出必须补齐的显式审批前置
默认仍 blocked / no runtime implementation
```

本版选择的是第二条：继续只做 blocked prerequisite review，并明确 Java v141 + mini-kv v134 可以并行做只读 echo。

## 核心入口

新增文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord.ts
```

主函数：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord({ config })
```

它先读取 v303：

```ts
const sourceNodeV303 = createSourceNodeV303(input.config);
```

然后创建决策记录：

```ts
const decisionRecord = createDecisionRecord(sourceNodeV303);
```

最后用 checks 判断当前版本是否 ready：

```ts
checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord =
  Object.entries(checks)
    .filter(([key]) =>
      key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord")
    .every(([, value]) => value);
```

这保持了前几版的模式：先消费来源，再产出 record，再用 check gate 收口。

## v303 来源

`createSourceNodeV303` 消费 v303 的 upstream echo verification：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification({
  config,
});
```

它只取必要字段：

```ts
readyForPostDecisionPlanIntakeUpstreamEchoVerification:
  source.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification,
verificationDigest: source.echoVerification.verificationDigest,
upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
implementationStillBlocked: source.echoVerification.implementationStillBlocked,
```

这说明 v304 没有重新计算 Java/mini-kv 的底层证据，只把 v303 当作可信上游结果继续决策。

## 决策记录

核心决策是：

```ts
decision: "require-explicit-approval-prerequisites-before-runtime-shell",
selectedPath: "continue-only-as-blocked-prerequisite-review",
stopRuntimeShellChainWithoutPrerequisites: true,
```

这个命名比较长，但表达的是关键事实：不是批准 runtime shell，而是说“如果还要继续讨论 runtime shell，先补齐审批前置；否则链条应停止”。

## 六个缺失前置

`createRequiredPrerequisites` 固化 6 个前置：

```ts
operator-approval-artifact
credential-handle-readiness
raw-endpoint-allowlist-review
no-network-test-fixture
manual-abort-and-rollback-semantics
java-mini-kv-prerequisite-echo
```

每个前置都是：

```ts
status: "documented-missing",
requiredBeforeRuntimeShell: true,
```

也就是说，这些不是“已经满足的条件”，而是“缺失且必须补齐的阻塞项”。

## 八个 no-go 条件

`createNoGoConditions` 固化 8 个 no-go：

```ts
RUNTIME_SHELL_IMPLEMENTATION_REQUESTED
RUNTIME_SHELL_INVOCATION_REQUESTED
CREDENTIAL_VALUE_READ_REQUESTED
RAW_ENDPOINT_URL_PARSE_REQUESTED
PROVIDER_CLIENT_INSTANTIATION_REQUESTED
EXTERNAL_REQUEST_REQUESTED
LEDGER_OR_SCHEMA_WRITE_REQUESTED
MINIKV_WRITE_OR_AUTHORITY_REQUESTED
```

每个 action 都是：

```ts
pause-and-do-not-implement-runtime-shell
```

这就是 v304 的生产价值：它把“不能做什么”变成可测试、可渲染、可被 Java/mini-kv 回显的决策记录。

## 必要性证明

`createNecessityProof` 解释为什么不能复用 v303：

```ts
whyV303CannotBeReused:
  "v303 verifies upstream echo alignment only; it does not enumerate missing prerequisites or publish a decision that Java and mini-kv can echo before any later runtime-shell discussion."
```

这符合当前规则：新增 echo/governance 链必须说明 blocker、consumer、复用边界和停止条件。

## 路由挂载

新增路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record
```

仍然通过 `auditJsonMarkdownRoute` 注册，JSON 和 Markdown 共用同一个 loader：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordMarkdown),
```

## 测试覆盖

新增测试：

```text
test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord.test.ts
```

覆盖四类场景：

1. 正常 ready，决策为 blocked prerequisite review。
2. 强制 historical fallback，通过 v303 source chain 仍可 ready。
3. upstream probes/actions 开启时 blocked。
4. JSON / Markdown 路由正常暴露。

关键断言：

```ts
expect(profile.decisionRecord.requiredPrerequisites.map((item) => [item.id, item.status])).toEqual([
  ["operator-approval-artifact", "documented-missing"],
  ["credential-handle-readiness", "documented-missing"],
  ["raw-endpoint-allowlist-review", "documented-missing"],
  ["no-network-test-fixture", "documented-missing"],
  ["manual-abort-and-rollback-semantics", "documented-missing"],
  ["java-mini-kv-prerequisite-echo", "documented-missing"],
]);
```

## 安全边界

本版仍然全部关闭：

```ts
runtimeShellImplemented: false,
runtimeShellInvocationAllowed: false,
executionAllowed: false,
connectsManagedAudit: false,
credentialValueRead: false,
rawEndpointUrlParsed: false,
externalRequestSent: false,
schemaMigrationExecuted: false,
approvalLedgerWritten: false,
automaticUpstreamStart: false,
```

## 一句话总结

Node v304 把 v303 之后的 runtime shell 链条从“继续 echo”收束为“显式审批前置未满足，继续 blocked”的可验证决策，并把下一步明确成推荐并行 Java v141 + mini-kv v134，只读回显 v304。
