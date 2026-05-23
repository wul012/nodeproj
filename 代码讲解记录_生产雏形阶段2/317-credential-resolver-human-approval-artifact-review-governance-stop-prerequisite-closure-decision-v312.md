# 第三百一十二版代码讲解：human approval artifact review governance stop prerequisite closure decision

本版目标是消费 Node v311 的上游回显验证结果，生成一个明确的治理链暂停决策。它不再继续请求 Java / mini-kv 新 echo，而是把 v310 记录的 6 个 prerequisite 做闭环盘点：只关闭 `java-mini-kv-decision-echo`，剩余 5 个继续阻塞。

## 本版所处项目进度

当前计划来自：

```text
D:\nodeproj\orderops-node\docs\plans2\v311-post-human-approval-artifact-review-post-echo-decision-upstream-echo-roadmap.md
```

计划要求：

```text
Node v312：human approval artifact review governance stop/prerequisite closure decision
必须消费 Node v311 verification result
只能关闭 java-mini-kv-decision-echo
其余 5 个 prerequisite 不能假装完成
如果没有具体 prerequisite contract，就暂停 governance 链
```

本版完成后，当前没有新的 Java + mini-kv 并行 echo 请求。功能主线必须等出现具体 prerequisite artifact contract 后再恢复。

## 文件拆分

本版继续按四件套拆分：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision.test.ts
```

行数大致为：

```text
service：374 行
types：173 行
renderer：120 行
test：260 行
```

没有新增 700+ 行 service，也没有把逻辑继续塞进 `auditJsonMarkdownRoutes.ts`。

## 核心入口

主入口是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision({ config })
```

它先读取 Node v311：

```ts
const sourceNodeV311 = createSourceNodeV311(input.config);
```

`createSourceNodeV311` 复用 v311 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification({
  config,
});
```

这点很重要：v312 不重新检查 Java v144 / mini-kv v137 的原始文件，而是消费 Node v311 已经验证过的结果，避免重复扩大跨项目证据链。

## Closure Decision

v312 的核心是 `createClosureDecision`：

```ts
const completedPrerequisites: HumanApprovalArtifactReviewGovernanceStopPrerequisite[] = [
  {
    id: "java-mini-kv-decision-echo",
    label: "Java v144 + mini-kv v137 decision echo",
    closureState: "completed-by-node-v311",
    evidence: "Node v311 verified Java v144 and mini-kv v137 echoed Node v310 decision gate.",
    requiredBeforeRuntimeShell: true,
    opensRuntimeShell: false,
  },
];
```

它只允许关闭一个 prerequisite。剩余项通过 `missing(...)` 明确保持缺失：

```ts
const remainingPrerequisites: HumanApprovalArtifactReviewGovernanceStopPrerequisite[] = [
  missing("signed-human-approval-artifact", "Signed human approval artifact"),
  missing("credential-handle-approval", "Credential handle approval"),
  missing("endpoint-handle-allowlist-approval", "Endpoint handle allowlist approval"),
  missing("no-network-safety-fixture", "No-network safety fixture"),
  missing("abort-rollback-semantics", "Abort and rollback semantics"),
];
```

因此本版不是“继续开新口子”，而是把链条停在可审计状态。

## 暂停语义

决策记录里明确写死：

```ts
chainContinuationAllowed: false
nextConcretePrerequisiteContractRequired: true
nextJavaVersionRequested: null
nextMiniKvVersionRequested: null
nextNodeVersionSuggested: null
```

这表示：

```text
没有新 prerequisite contract，就不请求 Java / mini-kv 新版本
没有新 prerequisite contract，就不继续 Node 功能链
```

这正好回应计划里的要求：不能继续空转 echo。

## 边界关闭

profile 继续显式关闭所有执行能力：

```ts
readyForDisabledRuntimeShellImplementation: false
runtimeShellImplemented: false
runtimeShellInvocationAllowed: false
executionAllowed: false
connectsManagedAudit: false
credentialValueRead: false
rawEndpointUrlParsed: false
externalRequestSent: false
schemaMigrationExecuted: false
approvalLedgerWritten: false
automaticUpstreamStart: false
```

这保证 `decisionState=ready` 只表示“暂停决策可归档”，不表示生产执行 ready。

## Checks

v312 的最终 ready 由 16 个 check 合成：

```ts
checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision =
  Object.entries(checks)
    .filter(([key]) =>
      key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision")
    .every(([, value]) => value);
```

最关键的三个 check 是：

```ts
javaMiniKvDecisionEchoClosed
exactlyOnePrerequisiteClosed
fivePrerequisitesRemainMissing
```

它们共同防止 v312 把缺失项误标为完成。

## 路由接入

新增路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision
```

它接入 `auditJsonMarkdownRoute`，同时支持 JSON 和 Markdown：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMarkdown,
)
```

## 测试覆盖

测试文件是：

```text
test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision.test.ts
```

覆盖四类场景：

```text
1. ready profile：只关闭 java-mini-kv-decision-echo，剩余 5 个 prerequisite 仍 missing。
2. historical fallback：强制使用 fixtures/historical/sibling-workspaces 下的 v311 上游证据链。
3. blocked config：UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 开启时 blocked。
4. route：JSON 和 Markdown 路由都返回 200。
```

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision.test.ts：4 passed
npm test：245 files / 847 tests passed
npm run build：通过
HTTP smoke：JSON 200 / Markdown 200
截图：Playwright MCP 截图成功，文件已保存到 d/312/图片
```

## 项目成熟度变化

v312 的价值不是继续加新业务，而是让治理链停止空转：

```text
v308-v311 已经把 human approval artifact review 的 packet / echo / decision / upstream verification 做完
v312 判断只能关闭 java-mini-kv-decision-echo
剩余 5 个 prerequisite 仍缺，不能继续装作已经具备生产条件
页面截图、HTTP smoke 和全量测试都已经归档完成
```

这让项目更接近生产流程：不是证据越多越好，而是每一条证据链必须能解释自己到底关闭了哪个 blocker。
