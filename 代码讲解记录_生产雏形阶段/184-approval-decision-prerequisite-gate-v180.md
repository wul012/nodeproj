# 184-approval-decision-prerequisite-gate-v180

## 版本定位

Node v180 是 `approval decision prerequisite gate`。它接在：

```text
Node v179：production release pre-approval packet
Java v64：release operator signoff fixture
mini-kv v73：retained restore artifact digest fixture
```

本版不是创建审批决定，而是判断“审批决定 dry-run envelope 的前置证据是否已经可读”。这是靠近生产级发布流程的一步，但仍保持所有真实执行关闭。

## 核心入口

实现文件：

```text
src/services/approvalDecisionPrerequisiteGate.ts
```

入口函数：

```ts
export function loadApprovalDecisionPrerequisiteGate(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): ApprovalDecisionPrerequisiteGateProfile {
  const preApprovalPacket = loadProductionReleasePreApprovalPacket(config, headers);
  const prerequisiteSignals = createPrerequisiteSignals();
  const remainingApprovalBlockers = createRemainingApprovalBlockers();
  const prerequisiteSteps = createPrerequisiteSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
}
```

这个函数的输入链路很明确：

```text
Node v179 pre-approval packet
    +
Java v64 release operator signoff fixture
    +
mini-kv v73 retained restore artifact digest fixture
    ->
Node v180 prerequisite gate
```

## Java v64 引用

Java v64 被固化为：

```ts
const JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE: JavaReleaseOperatorSignoffFixtureReference = {
  plannedVersion: "Java v64",
  fixtureVersion: "java-release-operator-signoff-fixture.v1",
  signoffRecord: {
    releaseOperator: "release-operator-placeholder",
    rollbackApprover: "rollback-approver-placeholder",
    releaseWindow: "release-window-placeholder",
    artifactTarget: "release-tag-or-artifact-version-placeholder",
    operatorSignoffPlaceholder: "operator-signoff-placeholder",
    operatorMustReplacePlaceholders: true,
  },
}
```

这里重点是 Java 只提供审批前置 signoff 形状：

```text
release operator
rollback approver
release window
artifact target
operator signoff placeholder
```

Node 只能消费这些字段来渲染 gate：

```ts
nodeMayRenderApprovalPrerequisiteGate: true,
nodeMayCreateApprovalDecision: false,
nodeMayWriteApprovalLedger: false,
nodeMayTriggerDeployment: false,
nodeMayTriggerRollback: false,
nodeMayExecuteRollbackSql: false,
```

## mini-kv v73 引用

mini-kv v73 被固化为：

```ts
const MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST: MiniKvRetainedRestoreArtifactDigestReference = {
  plannedVersion: "mini-kv v73",
  digestVersion: "mini-kv-retained-restore-artifact-digest.v1",
  projectVersion: "0.73.0",
  digestTarget: {
    retentionId: "mini-kv-retained-restore-artifact-digest-v73",
    restoreTargetPlaceholder: "restore-target:<operator-recorded-restore-target>",
    restoreArtifactDigestPlaceholder: "sha256:<operator-retained-restore-artifact-digest>",
    snapshotReviewDigestPlaceholder: "sha256:<operator-retained-snapshot-review-digest>",
    walReviewDigestPlaceholder: "sha256:<operator-retained-wal-review-digest>",
    retentionOwner: "operator:<retained-restore-artifact-owner>",
  },
}
```

mini-kv 的角色仍然不是订单权威存储，而是提供 restore artifact digest 的只读证据：

```ts
readOnly: true,
executionAllowed: false,
restoreExecutionAllowed: false,
orderAuthoritative: false,
```

## Gate Digest

v180 生成自己的 gate digest：

```ts
const gateDigest = digestGate({
  profileVersion: "approval-decision-prerequisite-gate.v1",
  sourcePreApprovalPacketDigest: preApprovalPacket.packet.packetDigest,
  javaFixtureVersion: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.fixtureVersion,
  javaOperatorSignoffPlaceholder: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.operatorSignoffPlaceholder,
  miniKvDigestVersion: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestVersion,
  miniKvRetentionId: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.retentionId,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  checks: {
    ...checks,
    gateDigestValid: undefined,
    readyForApprovalDecisionPrerequisiteGate: undefined,
  },
});
```

digest 覆盖了：

```text
Node v179 packet digest
Java v64 signoff fixture version/signoff placeholder
mini-kv v73 digest version/retention id
UPSTREAM_ACTIONS_ENABLED
checks
```

这让 Node v181 可以引用 v180，而不是重新猜测 v64/v73 是否已经完成。

## 前置信号

`createPrerequisiteSignals()` 把 v179 的 missing evidence 对应到 v64/v73 新证据：

```ts
signal("java-release-operator-signoff-present", "java-v64-release-operator-signoff-fixture", "placeholder-requires-operator", ENDPOINTS.javaReleaseOperatorSignoffFixture),
signal("mini-kv-retained-artifact-digests-present", "mini-kv-v73-retained-restore-artifact-digest", "placeholder-requires-operator", ENDPOINTS.miniKvRetainedRestoreArtifactDigest),
signal("mini-kv-order-authority-closed", "mini-kv-v73-retained-restore-artifact-digest", "explicitly-blocked-for-production", "order_authoritative=false"),
```

状态名很重要：

```text
present-for-dry-run
placeholder-requires-operator
explicitly-blocked-for-production
```

也就是说，v180 可以支持下一版 dry-run envelope，但不能直接进入真实 approval decision。

## 剩余阻塞项

v180 保留真实审批前仍未完成的 blockers：

```ts
blocker("real-production-idp", "approval-decision", "..."),
blocker("approval-ledger-dry-run-envelope", "approval-decision", "..."),
blocker("rollback-approver-evidence-fixture", "production-rollback", "..."),
blocker("restore-approval-boundary-fixture", "production-restore", "..."),
```

每个 blocker 都是：

```ts
blocksRealApprovalDecision: true,
blocksDryRunEnvelope: false,
```

这就是 v180 的关键判断：下一步可以做 approval ledger dry-run envelope，但真实审批仍然被挡住。

## 关键检查

`createChecks()` 是本版核心：

```ts
sourcePreApprovalPacketReady
sourcePreApprovalStillBlocksApprovalAndProduction
javaV64SignoffFixtureReady
javaSignoffRecordComplete
javaNodeConsumptionSafe
javaProductionBoundariesClosed
miniKvV73DigestFixtureReady
miniKvDigestTargetComplete
miniKvRetainedDigestEvidenceComplete
miniKvCheckJsonDigestEvidenceReadOnly
miniKvBoundariesClosed
prerequisiteSignalsComplete
remainingApprovalBlockersExplicit
prerequisiteStepsReadOnly
upstreamActionsStillDisabled
noApprovalDecisionCreated
noApprovalLedgerWrite
noReleaseExecution
noRollbackExecution
noRestoreExecution
```

这些 checks 统一保护一句话：

```text
v180 只允许进入下一步 dry-run envelope，不允许创建真实 approval decision。
```

## 路由接入

路由在：

```text
src/routes/statusRoutes.ts
```

新增：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/approval-decision-prerequisite-gate", {
  schema: {
    querystring: fixtureReportQuerySchema,
  },
}, async (request, reply) => {
  const profile = loadApprovalDecisionPrerequisiteGate(deps.config, request.headers);
});
```

这里同样要传 `request.headers`，因为 v180 通过 v179/v178/v177 链路依赖 operator identity evidence。

## 测试覆盖

测试文件：

```text
test/approvalDecisionPrerequisiteGate.test.ts
```

覆盖四类行为：

```text
正常汇总 Node v179 + Java v64 + mini-kv v73
缺少 operator identity headers 时阻断
UPSTREAM_ACTIONS_ENABLED=true 时阻断
JSON / Markdown 路由可访问
```

正常路径断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "approval-decision-prerequisite-gate.v1",
  gateState: "ready-for-approval-decision-prerequisite-review",
  readyForApprovalDecisionPrerequisiteGate: true,
  readyForApprovalLedgerDryRunEnvelope: true,
  readyForApprovalDecision: false,
  executionAllowed: false,
});
```

阻断路径断言：

```ts
expect(profile.gateState).toBe("blocked");
expect(profile.readyForApprovalDecisionPrerequisiteGate).toBe(false);
expect(profile.readyForApprovalLedgerDryRunEnvelope).toBe(false);
```

## 计划位置

当前计划：

```text
docs/plans/v179-post-pre-approval-roadmap.md
```

v180 完成后，下一步是：

```text
Node v181：approval ledger dry-run envelope
```

注意仍然不是 Java v65 / mini-kv v74，也不是真实审批；v181 只做 ledger 写入前的 dry-run envelope。

## 验证与归档

本版验证包括：

```text
npm run typecheck
npx vitest run test/approvalDecisionPrerequisiteGate.test.ts test/productionReleasePreApprovalPacket.test.ts test/crossProjectEvidenceRetentionGate.test.ts test/ciOperatorIdentityEvidencePacket.test.ts
npm test
npm run build
safe HTTP smoke
Chrome screenshot
```

运行截图和说明写入：

```text
c/180/图片/approval-decision-prerequisite-gate-v180.png
c/180/解释/approval-decision-prerequisite-gate-v180.md
```

## 一句话总结

Node v180 把 Java v64 的人工 signoff 证据和 mini-kv v73 的保留摘要证据合成审批决定前置 gate，允许下一步做 approval ledger dry-run envelope，但继续阻断真实审批决定、发布、回滚、恢复和生产权限。
