# 177-release-window-readiness-packet-v173

## 版本定位

Node v173 是 `release window readiness packet`。它不是生产发布器，也不是回滚执行器，而是把已经完成的四类证据汇成发布窗口人工 review 包：

- Node v171：`deployment evidence intake gate`
- Node v172：`deployment evidence verification`
- Java v61：`rollback approval record fixture`
- mini-kv v70：`restore drill evidence fixture`

本版同时做一个贴边的小重构：把重复的 blocker 收集逻辑抽到 `releaseReportShared.ts`，让 v172 和 v173 不再继续复制局部 `addMessage()`。

## 项目进度说明

从全局计划看，v173 收口的是 `v169-post-production-environment-preflight-roadmap.md`：

```text
Java v60 + mini-kv v69 -> Node v171 -> Node v172
Java v61 + mini-kv v70 -> Node v173
```

v173 完成后，这份计划不再继续追加新版本，下一阶段应另起新 plan。这样可以避免计划文件里出现重复和冲突版本。

## 核心入口

新增服务文件：

```text
src/services/releaseWindowReadinessPacket.ts
```

入口函数：

```ts
export function loadReleaseWindowReadinessPacket(config: AppConfig): ReleaseWindowReadinessPacketProfile {
  const intakeGate = loadDeploymentEvidenceIntakeGate(config);
  const verification = loadDeploymentEvidenceVerification(config);
  const releaseWindowSteps = createReleaseWindowSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, intakeGate, verification, releaseWindowSteps, forbiddenOperations);
}
```

这里 v173 复用 v171/v172 的 Node 侧 evidence，而不是重新做一份 summary。

## Java v61 引用

Java v61 被固化为：

```ts
const JAVA_V61_ROLLBACK_APPROVAL_RECORD: JavaRollbackApprovalRecordReference = Object.freeze({
  plannedVersion: "Java v61",
  evidenceTag: "v61订单平台rollback-approval-record-fixture",
  fixtureVersion: "java-rollback-approval-record-fixture.v1",
  fixtureEndpoint: "/contracts/rollback-approval-record.fixture.json",
});
```

关键字段包括：

```ts
approvalRecord: {
  reviewer: "rollback-reviewer-placeholder",
  approvalTimestampPlaceholder: "approval-timestamp-placeholder",
  rollbackTarget: "release-tag-or-artifact-version-placeholder",
  operatorMustReplacePlaceholders: true,
}
```

这些字段说明 Java v61 只是提供人工审批记录样本。Node 可以渲染 packet，但不能替操作者填写 reviewer、approval timestamp 或 rollback target。

## Java 安全检查

`createChecks()` 里 Java 侧重点是：

```ts
javaApprovalRecordPlaceholdersPresent
javaRequiredFieldsComplete
javaMigrationDirectionClosed
javaNoSecretBoundaryClosed
javaNodeConsumptionReadOnly
javaProductionBoundariesClosed
```

其中最关键的是：

```ts
JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayTriggerRollback === false
JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayExecuteRollbackSql === false
JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayReadSecretValues === false
```

这保证 v173 不会把 Java v61 的审批样本误升级成真实回滚能力。

## mini-kv v70 引用

mini-kv v70 被固化为：

```ts
const MINI_KV_V70_RESTORE_DRILL_EVIDENCE: MiniKvRestoreDrillEvidenceReference = Object.freeze({
  plannedVersion: "mini-kv v70",
  evidenceTag: "第七十版恢复演练证据",
  drillVersion: "mini-kv-restore-drill-evidence.v1",
  evidencePath: "fixtures/release/restore-drill-evidence.json",
});
```

核心命令是：

```ts
restoreDrillCommands: [
  "INFOJSON",
  "CHECKJSON LOAD data/restore-drill.snap",
  "CHECKJSON COMPACT",
  "CHECKJSON SETNXEX restore:drill-token 30 value",
  "STORAGEJSON",
  "HEALTH",
  "GET restore:drill-token",
  "QUIT",
]
```

这里的重点是 `CHECKJSON`。它只解释风险，不执行 `LOAD`、`COMPACT`、`SETNXEX`。

## mini-kv 安全检查

v173 锁住：

```ts
miniKvCheckJsonCommandsReady
miniKvWriteAndAdminCommandsNotExecuted
miniKvOperatorConfirmationComplete
miniKvBoundariesClosed
```

关键布尔值：

```ts
MINI_KV_V70_RESTORE_DRILL_EVIDENCE.writeCommandsExecuted === false
MINI_KV_V70_RESTORE_DRILL_EVIDENCE.adminCommandsExecuted === false
MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreExecutionAllowed === false
MINI_KV_V70_RESTORE_DRILL_EVIDENCE.orderAuthoritative === false
```

这保证 mini-kv v70 是恢复演练证据，不是恢复执行器，也不是 Java 订单权威存储。

## Packet Digest

v173 生成自己的 digest：

```ts
const packetDigest = digestPacket({
  profileVersion: "release-window-readiness-packet.v1",
  sourceIntakeDigest: intakeGate.gate.intakeDigest,
  sourceVerificationDigest: verification.verification.verificationDigest,
  javaVersion: JAVA_V61_ROLLBACK_APPROVAL_RECORD.plannedVersion,
  miniKvVersion: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.plannedVersion,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  checks: {
    ...checks,
    packetDigestValid: undefined,
    readyForReleaseWindowReadinessPacket: undefined,
  },
});
```

和 v172 一样，digest 不包含自校验字段，避免循环依赖。随后：

```ts
checks.packetDigestValid = isReleaseReportDigest(packetDigest);
completeAggregateReadyCheck(checks, "readyForReleaseWindowReadinessPacket");
```

这让 packet ready 状态来自 36 个 check 的聚合，而不是手写结果。

## 小重构：共享 blocker helper

新增：

```ts
export function collectBlockingMessages<TMessage extends LiveProbeReportMessage>(
  specs: Array<ReleaseReportBlockingMessageSpec<TMessage>>,
): TMessage[] {
  const messages: TMessage[] = [];
  for (const spec of specs) {
    appendBlockingMessage(messages, Boolean(spec.condition), spec.code, spec.source, spec.message);
  }
  return messages;
}
```

v172 和 v173 都可以写成声明式列表：

```ts
return collectBlockingMessages<PacketMessage>([
  { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", ... },
]);
```

这样减少重复的局部 `addMessage()`，但不改变已有 JSON 字段和 Markdown 输出。

## 路由接入

`statusRoutes.ts` 新增：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/release-window-readiness-packet",
  () => Promise.resolve(loadReleaseWindowReadinessPacket(deps.config)),
  renderReleaseWindowReadinessPacketMarkdown,
);
```

对应：

```text
GET /api/v1/production/release-window-readiness-packet
GET /api/v1/production/release-window-readiness-packet?format=markdown
```

## 测试覆盖

新增：

```text
test/releaseWindowReadinessPacket.test.ts
```

覆盖：

- 正常配置下 36 个 check 全部通过。
- `UPSTREAM_ACTIONS_ENABLED=true` 时 packet blocked。
- JSON / Markdown route 可访问，并包含 `Java v61`、`mini-kv v70` 和 `MANUAL_RELEASE_WINDOW_REVIEW_ONLY`。

`test/releaseReportShared.test.ts` 也新增了 `collectBlockingMessages()` 的单测，保证小重构不会改变 blocker 输出语义。
