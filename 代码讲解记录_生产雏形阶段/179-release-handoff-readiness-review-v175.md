# 179-release-handoff-readiness-review-v175

## 版本定位

Node v175 是 `release handoff readiness review`。它站在 Node v174、Java v62、mini-kv v71 之后，把三方的发布交接证据合成一个人工 review 包。

本版仍不是生产发布器：

- 不执行 release。
- 不执行 deployment。
- 不执行 rollback。
- 不执行 mini-kv restore。
- 不执行 Java rollback SQL。
- 不读取 production secret。
- 不连接 production database。
- 不启动 Java 或 mini-kv。

## 核心入口

实现文件：

```text
src/services/releaseHandoffReadinessReview.ts
```

入口函数：

```ts
export function loadReleaseHandoffReadinessReview(config: AppConfig): ReleaseHandoffReadinessReviewProfile {
  const envelope = loadProductionReleaseDryRunEnvelope(config);
  const handoffReviewSteps = createHandoffReviewSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(config, envelope, handoffReviewSteps, forbiddenOperations, pauseConditions);
}
```

这里可以看出 v175 的 Node 内部依赖是 v174 envelope。Java v62 和 mini-kv v71 以只读 fixture reference 的形式进入 review，不触发真实上游调用。

## Java v62 证据

v175 固化 Java v62 的 handoff fixture 摘要：

```ts
const JAVA_V62_RELEASE_HANDOFF_CHECKLIST = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v62",
  fixtureVersion: "java-release-handoff-checklist-fixture.v1",
  scenario: "RELEASE_HANDOFF_CHECKLIST_FIXTURE_SAMPLE",
  fixtureEndpoint: "/contracts/release-handoff-checklist.fixture.json",
  archivePath: "c/62",
  readOnly: true,
  executionAllowed: false,
} as const satisfies JavaReleaseHandoffChecklistReference);
```

关键字段是：

```ts
releaseOperator: "release-operator-placeholder"
rollbackApprover: "rollback-approver-placeholder"
artifactTarget: "release-tag-or-artifact-version-placeholder"
operatorMustReplacePlaceholders: true
handoffStatus: "PENDING_OPERATOR_CONFIRMATION"
```

这说明 Node 只展示“谁要确认什么”，不能替人填写 release operator、rollback approver 或 artifact target。

## mini-kv v71 证据

v175 也固化 mini-kv v71 的 restore handoff checklist：

```ts
const MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v71",
  checklistVersion: "mini-kv-restore-handoff-checklist.v1",
  evidencePath: "fixtures/release/restore-handoff-checklist.json",
  projectVersion: "0.71.0",
  releaseVersion: "v71",
  readOnly: true,
  executionAllowed: false,
  restoreExecutionAllowed: false,
  orderAuthoritative: false,
} as const satisfies MiniKvRestoreHandoffChecklistReference);
```

其中 `checkjsonRiskConfirmation.commands` 包含：

```text
CHECKJSON LOAD data/handoff-restore.snap
CHECKJSON COMPACT
CHECKJSON SETNXEX restore:handoff-token 30 value
GET restore:handoff-token
```

注意这里是 `CHECKJSON` 风险确认，不是执行 `LOAD`、`COMPACT` 或 `SETNXEX`。`GET restore:handoff-token` 的预期仍是 `(nil)`，证明没有真实写 token。

## Review Digest

v175 生成自己的 review digest：

```ts
const reviewDigest = digestReview({
  profileVersion: "release-handoff-readiness-review.v1",
  sourceEnvelopeDigest: envelope.envelope.envelopeDigest,
  javaVersion: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.plannedVersion,
  javaFixtureVersion: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.fixtureVersion,
  miniKvVersion: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.plannedVersion,
  miniKvChecklistVersion: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.checklistVersion,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  checks: {
    ...checks,
    reviewDigestValid: undefined,
    readyForReleaseHandoffReadinessReview: undefined,
  },
});
```

它排除自校验字段，避免 digest 自引用。随后：

```ts
checks.reviewDigestValid = isReleaseReportDigest(reviewDigest);
completeAggregateReadyCheck(checks, "readyForReleaseHandoffReadinessReview");
```

最终 ready 状态来自 37 个 check 全部通过，而不是直接写死。

## 关键检查

`createChecks()` 保护三类边界。

第一类是 Node v174 上游：

```ts
sourceEnvelopeReady
sourceEnvelopeDigestValid
sourceEnvelopeStillBlocksProduction
sourceEnvelopeReferencesV173
```

第二类是 Java v62：

```ts
javaV62FixtureReady
javaChecklistPlaceholdersPresent
javaRequiredFieldsComplete
javaMigrationDirectionClosed
javaSecretBoundaryClosed
javaNodeConsumptionReadOnly
javaProductionBoundariesClosed
```

第三类是 mini-kv v71：

```ts
miniKvV71ChecklistReady
miniKvDigestPlaceholdersPresent
miniKvCheckJsonRiskCommandsReady
miniKvNoWriteOrAdminExecuted
miniKvBoundariesClosed
```

这些检查把“能展示证据”和“能执行生产操作”分开。v175 只允许前者。

## Handoff Review Steps

`createHandoffReviewSteps()` 固化 6 个步骤：

```text
collect Node v174 envelope
collect Java v62 checklist
collect mini-kv v71 checklist
compare into one review
operator manual review
render archive evidence
```

每一步都明确：

```ts
readOnly: true
dryRunOnly: true
mutatesState: false
executesRelease: false
executesDeployment: false
executesRollback: false
executesRestore: false
readsSecretValues: false
connectsProductionDatabase: false
```

这让 v175 是接近生产级流程的一步，但仍不越过执行边界。

## Forbidden Operations

`createForbiddenOperations()` 列出 10 个禁止动作，例如：

```ts
{
  operation: "Trigger Java deployment from Node v175",
  reason: "Java v62 provides a read-only handoff checklist fixture only.",
  blockedBy: "Java v62 release handoff checklist fixture",
}
```

以及：

```ts
{
  operation: "Execute mini-kv restore from Node v175",
  reason: "mini-kv v71 restore handoff checklist is manual review evidence only.",
  blockedBy: "mini-kv v71 restore handoff checklist",
}
```

这些条目是给操作员看的边界清单，也是测试保护的 contract。

## 路由接入

`statusRoutes.ts` 新增：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/release-handoff-readiness-review",
  () => Promise.resolve(loadReleaseHandoffReadinessReview(deps.config)),
  renderReleaseHandoffReadinessReviewMarkdown,
);
```

对应：

```text
GET /api/v1/production/release-handoff-readiness-review
GET /api/v1/production/release-handoff-readiness-review?format=markdown
```

## 测试覆盖

新增：

```text
test/releaseHandoffReadinessReview.test.ts
```

覆盖：

- 正常情况下 37 个 check 全部通过。
- `UPSTREAM_ACTIONS_ENABLED=true` 时 review blocked。
- JSON / Markdown route 可访问。
- Markdown 包含 `java-release-handoff-checklist-fixture.v1`、`mini-kv-restore-handoff-checklist.v1` 和 `PROCEED_TO_NODE_V176_CI_EVIDENCE_HARDENING`。

v175 的价值是把三项目 release handoff 证据合成一个可展示、可验证、可归档的人工 review 包，同时仍然不打开真实生产执行。
