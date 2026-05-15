# 186-release-approval-decision-rehearsal-packet-v182

## 版本定位

Node v182 是 `release approval decision rehearsal packet`。

它接在这条链路之后：

```text
Node v181：approval ledger dry-run envelope
Java v65：rollback approver evidence fixture
mini-kv v74：restore approval boundary
    ->
Node v182：release approval decision rehearsal packet
```

本版本不是审批决定，也不是发布授权。它只把三边证据合成一次 rehearsal packet，用来证明“真实 approval decision 前需要看的证据已经能被 Node 同时读取和归档”。

## 核心入口

实现文件：

```text
src/services/releaseApprovalDecisionRehearsalPacket.ts
```

入口函数：

```ts
export function loadReleaseApprovalDecisionRehearsalPacket(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): ReleaseApprovalDecisionRehearsalPacketProfile {
  const dryRunEnvelope = loadApprovalLedgerDryRunEnvelope(config, headers);
  const rehearsalInputs = createRehearsalInputs();
  const rehearsalSteps = createRehearsalSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
}
```

这里最重要的设计是：v182 只消费 v181，以及 Java v65 / mini-kv v74 的 frozen evidence reference，不启动上游，不调用真实 Java / mini-kv。

## Node v181 引用

v182 先读取 v181：

```ts
const dryRunEnvelope = loadApprovalLedgerDryRunEnvelope(config, headers);
```

然后检查：

```ts
sourceDryRunEnvelopeReady: dryRunEnvelope.readyForApprovalLedgerDryRunEnvelope
  && dryRunEnvelope.envelopeState === "ready-for-approval-ledger-dry-run-review",
sourceDryRunEnvelopeDigestValid: isReleaseReportDigest(dryRunEnvelope.envelope.envelopeDigest),
sourceDryRunEnvelopeStillBlocksApprovalAndProduction: dryRunEnvelope.readyForApprovalDecision === false
  && dryRunEnvelope.readyForApprovalLedgerWrite === false
  && dryRunEnvelope.executionAllowed === false,
```

这确保 v182 的 rehearsal packet 只能建立在“非持久化、非执行”的 v181 envelope 上。

## Java v65 引用

Java v65 被固定成：

```ts
const JAVA_V65_ROLLBACK_APPROVER_EVIDENCE = {
  plannedVersion: "Java v65",
  fixtureVersion: "java-rollback-approver-evidence-fixture.v1",
  approverEvidence: {
    rollbackApprover: "rollback-approver-placeholder",
    operatorMustReplacePlaceholders: true,
  },
  databaseMigration: {
    selectedDirection: "no-database-change",
    rollbackSqlArtifactReference: "rollback-sql-artifact-reference-placeholder",
    rollbackSqlExecutionAllowed: false,
    requiresProductionDatabase: false,
  },
}
```

它的意义是补 rollback approver 和 SQL/no-SQL boundary。Node 可以把这些字段写进 rehearsal packet，但不能创建 approval decision：

```ts
nodeMayRenderDecisionRehearsalInput: true,
nodeMayCreateApprovalDecision: false,
nodeMayWriteApprovalLedger: false,
nodeMayExecuteRollbackSql: false,
```

## mini-kv v74 引用

mini-kv v74 被固定成：

```ts
const MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY = {
  boundaryVersion: "mini-kv-restore-approval-boundary.v1",
  projectVersion: "0.74.0",
  restoreExecutionAllowed: false,
  orderAuthoritative: false,
  javaTransactionChainConnected: false,
  approvalBoundaryTarget: {
    approvalBoundaryId: "mini-kv-restore-approval-boundary-v74",
    restoreApproverPlaceholder: "operator:<restore-approval-approver>",
    restoreTargetPlaceholder: "restore-target:<operator-approved-restore-target>",
    artifactDigestPlaceholder: "sha256:<operator-approved-restore-artifact-digest>",
  },
}
```

mini-kv 在这里仍然不是 Java 订单权威存储。它只提供 restore approval boundary evidence。

## Rehearsal Inputs

`createRehearsalInputs()` 把三边证据汇成统一输入：

```ts
input("node-approval-ledger-dry-run-envelope-present", "approval-ledger-dry-run-envelope", "present-for-rehearsal", ...),
input("java-rollback-approver-evidence-present", "java-v65-rollback-approver-evidence-fixture", "placeholder-requires-operator", ...),
input("java-rollback-sql-boundary-closed", "java-v65-rollback-approver-evidence-fixture", "explicitly-blocked-for-production", ...),
input("mini-kv-restore-approval-boundary-present", "mini-kv-v74-restore-approval-boundary", "placeholder-requires-operator", ...),
input("mini-kv-java-transaction-chain-disconnected", "mini-kv-v74-restore-approval-boundary", "explicitly-blocked-for-production", ...),
```

每个输入都固定：

```ts
nodeMayInfer: false,
nodeMayCreateApprovalDecision: false,
nodeMayWriteApprovalLedger: false,
```

## Packet Digest

v182 生成 packet digest：

```ts
const packetDigest = digestPacket({
  profileVersion: "release-approval-decision-rehearsal-packet.v1",
  sourceDryRunEnvelopeDigest: stringValue(dryRunEnvelope.envelope.envelopeDigest),
  javaFixtureVersion: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.fixtureVersion,
  javaRollbackApprover: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.approverEvidence.rollbackApprover,
  miniKvBoundaryVersion: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.boundaryVersion,
  miniKvApprovalBoundaryId: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.approvalBoundaryTarget.approvalBoundaryId,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  checks: {...},
});
```

digest 覆盖：

```text
Node v181 envelope digest
Java v65 fixture version / rollback approver
mini-kv v74 boundary version / approval boundary id
UPSTREAM_ACTIONS_ENABLED
checks
```

这让 v182 可以作为稳定归档证据，而不是临时页面拼接。

## 安全边界

v182 明确输出：

```ts
readyForApprovalDecision: false,
readyForApprovalLedgerWrite: false,
readyForProductionRelease: false,
readyForProductionRollback: false,
readyForProductionRestore: false,
executionAllowed: false,
```

`createForbiddenOperations()` 继续封死：

```ts
forbid("Create approval decision from Node v182", ...),
forbid("Write approval ledger from Node v182", ...),
forbid("Execute Java rollback SQL from Node v182", ...),
forbid("Execute mini-kv restore from Node v182", ...),
```

所以 v182 是 rehearsal packet，不是 production approval。

## 路由接入

路由文件：

```text
src/routes/statusRoutes.ts
```

新增：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/release-approval-decision-rehearsal-packet", {
  schema: { querystring: fixtureReportQuerySchema },
}, async (request, reply) => {
  const profile = loadReleaseApprovalDecisionRehearsalPacket(deps.config, request.headers);
});
```

继续传 `request.headers`，因为 v182 仍沿用 v181 -> v180 -> v179 -> v178 -> v177 的 operator identity 证据链。

## 测试覆盖

测试文件：

```text
test/releaseApprovalDecisionRehearsalPacket.test.ts
```

覆盖四类行为：

```text
正常合成 Node v181 + Java v65 + mini-kv v74
缺少 operator identity headers 时阻断
UPSTREAM_ACTIONS_ENABLED=true 时阻断
JSON / Markdown 路由可访问
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "release-approval-decision-rehearsal-packet.v1",
  packetState: "ready-for-release-approval-decision-rehearsal-review",
  readyForReleaseApprovalDecisionRehearsalPacket: true,
  readyForApprovalDecision: false,
  readyForApprovalLedgerWrite: false,
  executionAllowed: false,
});
```

## 计划收口

v182 完成后，`v179-post-pre-approval-roadmap.md` 收口。

下一份计划是：

```text
docs/plans/v182-post-rehearsal-quality-roadmap.md
```

下一阶段第一步不继续加 fixture，而是做实际 Node 质量优化：

```text
Node v183：opsPromotionArchiveBundle split phase 1
```

## 一句话总结

Node v182 把 Node v181、Java v65、mini-kv v74 合成 release approval decision rehearsal packet，证明三边证据能被统一审查；但它继续阻断真实 approval decision、approval ledger 写入、发布、回滚、恢复和所有生产权限。
