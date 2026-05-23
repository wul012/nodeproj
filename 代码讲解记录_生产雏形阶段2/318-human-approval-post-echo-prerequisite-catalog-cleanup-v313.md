# 第三百一十三版代码讲解：human approval post-echo prerequisite catalog cleanup

本版是 Node 质量优化版本。v312 已经暂停 governance 链，所以 v313 不再推进新功能，而是把 v310 和 v312 共用的 prerequisite 定义抽成 catalog，减少重复维护。

## 本版所处项目进度

当前计划来自：

```text
D:\nodeproj\orderops-node\docs\plans2\v311-post-human-approval-artifact-review-post-echo-decision-upstream-echo-roadmap.md
```

计划要求停链后优先做：

```text
human approval echo catalog cleanup
优化范围限于 catalog/helper/template 抽取
不改变 JSON contract
```

## 新增 catalog

新增文件：

```text
src/services/managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.ts
```

它集中定义 prerequisite ID：

```ts
export type HumanApprovalArtifactReviewPostEchoPrerequisiteId =
  | "signed-human-approval-artifact"
  | "credential-handle-approval"
  | "endpoint-handle-allowlist-approval"
  | "no-network-safety-fixture"
  | "abort-rollback-semantics"
  | "java-mini-kv-decision-echo";
```

并定义一个有序 catalog：

```ts
export const HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG = [
  {
    id: "signed-human-approval-artifact",
    decisionGateLabel: "Signed human approval artifact instance",
    closureLabel: "Signed human approval artifact",
    documentedMissingEvidence: "missing: v308 defined the review packet shape, but no signed artifact instance is present",
    closureMissingEvidence: "No committed artifact, approval record, safety fixture, or semantics contract exists yet.",
  },
  ...
]
```

这个 catalog 同时服务 v310 和 v312。

## v310 消费 catalog

v310 原来手写 6 次 `prerequisite(...)`：

```ts
prerequisite("signed-human-approval-artifact", ...)
prerequisite("credential-handle-approval", ...)
...
```

现在改为：

```ts
function createRequiredPrerequisites(): HumanApprovalArtifactReviewPostEchoPrerequisite[] {
  return HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG.map((entry) => ({
    id: entry.id,
    label: entry.decisionGateLabel,
    currentEvidence: entry.documentedMissingEvidence,
    status: "documented-missing",
    requiredBeforeRuntimeShell: true,
  }));
}
```

这让 v310 的 documented-missing 列表跟 catalog 同源。

## v312 消费 catalog

v312 原来同时维护 completed 和 remaining 两组 prerequisite。现在 completed 使用常量：

```ts
const javaMiniKvEcho = getHumanApprovalArtifactReviewPostEchoPrerequisite(JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID);
```

remaining 则从 catalog 过滤生成：

```ts
const remainingPrerequisites = HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG
  .filter((entry) => entry.id !== JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID)
  .map((entry) => missing(entry.id));
```

这样后续如果 prerequisite 名称或顺序调整，只需要动 catalog，不会让 v310 和 v312 分叉。

## 类型收束

v310 的 prerequisite ID 原来只是：

```ts
id: string;
```

现在改成：

```ts
id: HumanApprovalArtifactReviewPostEchoPrerequisiteId;
```

v312 的 union 也改为复用同一个类型：

```ts
id: HumanApprovalArtifactReviewPostEchoPrerequisiteId;
```

这比散落的字符串 union 更稳。

## 测试覆盖

新增测试：

```text
test/managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.test.ts
```

测试重点：

```ts
expect(v310.decisionGate.requiredPrerequisites.map((prerequisite) => prerequisite.id)).toEqual(catalogIds);
expect(v312.closureDecision.completedPrerequisites.map((prerequisite) => prerequisite.id)).toEqual([
  JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
]);
expect(v312.closureDecision.remainingPrerequisites.map((prerequisite) => prerequisite.id)).toEqual(
  catalogIds.filter((id) => id !== JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID),
);
```

这锁住了 v310 全缺失、v312 关闭 1 个剩 5 个的关系。

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.test.ts test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate.test.ts test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision.test.ts：3 files / 9 tests passed
npm test：246 files / 848 tests passed
npm run build：通过
HTTP smoke：v312 closure route JSON 200 / Markdown 200
截图：Playwright MCP 截图成功，文件已保存到 d/313/图片
```

## 项目成熟度变化

v313 的意义是降低治理链维护成本：

```text
v310 不再手写 6 个 prerequisite
v312 不再手写剩余 5 个 prerequisite
post-echo prerequisite ID/label/evidence 文案统一进入 catalog
```

这符合当前阶段的方向：功能链暂停时，优先做能减少后续膨胀和漂移的质量优化。
