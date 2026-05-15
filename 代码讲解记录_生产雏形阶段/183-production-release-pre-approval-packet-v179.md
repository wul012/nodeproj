# 183-production-release-pre-approval-packet-v179

## 版本定位

Node v179 是 `production release pre-approval packet`。它接在 Node v178 之后：

```text
Node v177：CI operator identity evidence packet
Java v63：release audit retention fixture
mini-kv v72：restore evidence retention fixture
Node v178：cross-project evidence retention gate
Node v179：production release pre-approval packet
```

本版让项目向生产级又靠近一小步：不是直接发布，而是把“发布审批前必须人工审查的材料”做成可归档、可测试、可截图的 packet。

## 核心入口

实现文件：

```text
src/services/productionReleasePreApprovalPacket.ts
```

入口函数：

```ts
export function loadProductionReleasePreApprovalPacket(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): ProductionReleasePreApprovalPacketProfile {
  const retentionGate = loadCrossProjectEvidenceRetentionGate(config, headers);
  const preApprovalChecklist = createPreApprovalChecklist();
  const missingEvidence = createMissingEvidence();
  const preApprovalSteps = createPreApprovalSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
}
```

这段代码的关键是：v179 只消费 v178 的 retention gate，不重新直接操作 Java 或 mini-kv。

```text
v178 retention gate
    ->
v179 pre-approval packet
    ->
人工审批决定前的审查输入
```

## Packet Digest

v179 生成自己的 digest：

```ts
const packetDigest = digestPacket({
  profileVersion: "production-release-pre-approval-packet.v1",
  sourceRetentionGateDigest: retentionGate.gate.gateDigest,
  sourceRetentionGateProfileVersion: retentionGate.profileVersion,
  sourceRetentionGateState: retentionGate.gateState,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  checklistIds: preApprovalChecklist.map((item) => item.id),
  missingEvidenceIds: missingEvidence.map((item) => item.id),
  checks: {
    ...checks,
    packetDigestValid: undefined,
    readyForProductionReleasePreApprovalPacket: undefined,
  },
});
```

digest 覆盖：

```text
v178 gate digest
v178 profile version/state
UPSTREAM_ACTIONS_ENABLED
pre-approval checklist ids
missing evidence ids
checks
```

这样后续 Node v180 可以稳定引用 v179，而不是靠口头说明判断 v179 是否完成。

## preApprovalChecklist

本版新增人工审查清单：

```ts
function createPreApprovalChecklist(): PreApprovalChecklistItem[] {
  return [
    checklist("operator-identity-reviewed", "operator-identity", "...", ENDPOINTS.ciOperatorIdentityEvidencePacketJson, true),
    checklist("retention-placeholders-reviewed", "retention", "...", ENDPOINTS.crossProjectEvidenceRetentionGateJson, false),
    checklist("java-release-retention-reviewed", "retention", "...", ENDPOINTS.javaReleaseAuditRetentionFixture, true),
    checklist("mini-kv-restore-retention-reviewed", "retention", "...", ENDPOINTS.miniKvRestoreEvidenceRetention, true),
  ];
}
```

这里有两个重要边界：

```ts
nodeMayInfer: false,
approvalDecisionCreated: false,
```

意思是 Node 可以把清单列出来，但不能替人工做确认，更不能把清单本身当成审批决定。

## missingEvidence

`missingEvidence` 是本版最重要的生产级信号：

```ts
function createMissingEvidence(): MissingEvidenceItem[] {
  return [
    missing("real-production-idp", "runtime-config", "approval-decision", "..."),
    missing("release-operator-signoff", "manual operator handoff", "approval-decision", "..."),
    missing("rollback-approver-signoff", "manual rollback handoff", "approval-decision", "..."),
    missing("retained-artifact-digests", "Java v63 and mini-kv v72 placeholders", "approval-decision", "..."),
    missing("production-release-window-confirmation", "release management", "production-release", "..."),
  ];
}
```

每个缺失项都被设置为：

```ts
nodeMayFill: false,
blocksApprovalDecision: true,
```

这让系统不会因为“证据包看起来完整”就误判可以进入真实审批。靠近生产级时，这种阻断比按钮更多更重要。

## 关键检查

`createChecks()` 固化了 v179 的全部边界：

```ts
sourceRetentionGateReady
sourceRetentionGateDigestValid
sourceRetentionGateStillBlocksProduction
sourceRetentionGateReferencesNodeV177
sourceRetentionGateReferencesJavaV63
sourceRetentionGateReferencesMiniKvV72
preApprovalChecklistComplete
operatorConfirmationsRemainManual
missingEvidenceBlocksApprovalDecision
preApprovalStepsReadOnly
forbiddenOperationsCovered
upstreamActionsStillDisabled
noApprovalDecisionCreated
noApprovalLedgerWrite
noReleaseExecution
noDeploymentExecution
noRollbackExecution
noRestoreExecution
noProductionSecretRead
noProductionDatabaseConnection
noProductionIdpConnection
```

这些检查统一保护一句话：

```text
v179 可以进入人工 pre-approval review，但不能变成 approval decision。
```

## 禁止操作

本版显式列出危险动作：

```ts
forbid("Create production approval decision from Node v179", "...", "Node v179 pre-approval packet"),
forbid("Write production approval ledger from Node v179", "...", "Node v179 pre-approval packet"),
forbid("Trigger production release from Node v179", "...", "Node v179 pre-approval packet"),
forbid("Execute Java rollback SQL from Node v179", "...", "Java v63 release audit retention fixture"),
forbid("Execute mini-kv restore from Node v179", "...", "mini-kv v72 restore evidence retention"),
```

这和当前真实开发流程一致：Node 是控制面和证据层，不越权替 Java 做业务执行，也不让 mini-kv 进入订单权威存储。

## 路由接入

路由在：

```text
src/routes/statusRoutes.ts
```

新增：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/release-pre-approval-packet", {
  schema: {
    querystring: fixtureReportQuerySchema,
  },
}, async (request, reply) => {
  const profile = loadProductionReleasePreApprovalPacket(deps.config, request.headers);
});
```

这里必须传入 `request.headers`，因为 v179 通过 v178 间接依赖 v177 的 operator identity evidence。

## 测试覆盖

测试文件：

```text
test/productionReleasePreApprovalPacket.test.ts
```

核心测试包括：

```text
正常生成 pre-approval packet
缺少 operator identity headers 时阻断
UPSTREAM_ACTIONS_ENABLED=true 时阻断
JSON / Markdown 路由可访问
```

其中正常路径断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "production-release-pre-approval-packet.v1",
  packetState: "ready-for-production-release-pre-approval-review",
  readyForProductionReleasePreApprovalPacket: true,
  readyForApprovalDecision: false,
  readyForProductionRelease: false,
  executionAllowed: false,
});
```

阻断路径断言：

```ts
expect(profile.packetState).toBe("blocked");
expect(profile.readyForProductionReleasePreApprovalPacket).toBe(false);
expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("SOURCE_RETENTION_GATE_NOT_READY");
```

这说明 v179 不是“只要接口能返回就算成功”，而是会在缺少身份证据或打开上游写动作时主动阻断。

## 计划收口

v179 完成后，旧计划：

```text
docs/plans/v176-post-ci-evidence-hardening-roadmap.md
```

被标记为收口。

新计划：

```text
docs/plans/v179-post-pre-approval-roadmap.md
```

接续下一阶段，并明确下一步是：

```text
推荐并行 Java v64 + mini-kv v73
```

这样不会出现多个计划文件互相重合，也不会让 Node 在上游证据没补齐前继续抢跑。

## 验证与归档

本版验证包括：

```text
npm run typecheck
npx vitest run test/productionReleasePreApprovalPacket.test.ts test/crossProjectEvidenceRetentionGate.test.ts test/ciOperatorIdentityEvidencePacket.test.ts
npm test
npm run build
safe HTTP smoke
Chrome screenshot
```

运行截图和说明写入：

```text
c/179/图片/production-release-pre-approval-packet-v179.png
c/179/解释/production-release-pre-approval-packet-v179.md
```

## 一句话总结

Node v179 把发布前审查从“证据已经保留”推进到“可以人工预审批审查”，但仍然牢牢卡住真实审批决定、发布、回滚、恢复和生产权限。
