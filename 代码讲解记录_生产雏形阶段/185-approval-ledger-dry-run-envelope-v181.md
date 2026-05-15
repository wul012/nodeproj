# 185-approval-ledger-dry-run-envelope-v181

## 版本定位

Node v181 是 `approval ledger dry-run envelope`。它接在 Node v180 后面：

```text
Node v180：approval decision prerequisite gate
    ->
Node v181：approval ledger dry-run envelope
```

本版本不是审批决定，也不是 ledger 写入，而是把 v180 已经通过的前置 gate 封装成“可归档、可复核、可生成 digest 的候选 ledger 信封”。

## 核心入口

实现文件：

```text
src/services/approvalLedgerDryRunEnvelope.ts
```

入口函数：

```ts
export function loadApprovalLedgerDryRunEnvelope(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): ApprovalLedgerDryRunEnvelopeProfile {
  const prerequisiteGate = loadApprovalDecisionPrerequisiteGate(config, headers);
  const ledgerCandidateFields = createLedgerCandidateFields(prerequisiteGate);
  const dryRunSteps = createDryRunSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
}
```

这里的依赖非常明确：v181 只消费 Node v180，不重新直接判断 Java v64 / mini-kv v73。这样可以保持版本职责清楚：

```text
Java v64 + mini-kv v73 -> Node v180 gate -> Node v181 envelope
```

## v180 Gate 引用

v181 首先读取 v180：

```ts
const prerequisiteGate = loadApprovalDecisionPrerequisiteGate(config, headers);
```

然后检查：

```ts
sourcePrerequisiteGateReady: prerequisiteGate.readyForApprovalDecisionPrerequisiteGate
  && prerequisiteGate.readyForApprovalLedgerDryRunEnvelope
  && prerequisiteGate.gateState === "ready-for-approval-decision-prerequisite-review",
sourcePrerequisiteGateDigestValid: isReleaseReportDigest(prerequisiteGate.gate.gateDigest),
sourcePrerequisiteNoLedgerWrite: prerequisiteGate.gate.approvalLedgerWriteAllowed === false,
```

这几项保证 v181 只建立在已通过的 v180 prerequisite gate 上，而且 v180 仍然没有打开真实 ledger 写入。

## Ledger Candidate Fields

v181 的核心新增能力是 `createLedgerCandidateFields()`：

```ts
function createLedgerCandidateFields(
  prerequisiteGate: ApprovalDecisionPrerequisiteGateProfile,
): LedgerCandidateField[] {
  return [
    field("sourcePrerequisiteGateDigest", "Node v180 gate", stringValue(prerequisiteGate.gate.gateDigest), false),
    field("releaseOperator", "Java v64 signoff fixture through Node v180", stringValue(prerequisiteGate.gate.javaReleaseOperator), true),
    field("rollbackApprover", "Java v64 signoff fixture through Node v180", stringValue(prerequisiteGate.gate.javaRollbackApprover), true),
    field("miniKvRestoreArtifactDigest", "mini-kv v73 retained digest through Node v180", stringValue(prerequisiteGate.gate.miniKvRestoreArtifactDigestPlaceholder), true),
    field("approvalLedgerWriteAllowed", "Node v181 envelope", false, false),
  ];
}
```

这些字段像真实 ledger 记录的雏形，但每个字段都被限制为：

```ts
required: true,
nodeMayInfer: false,
writesLedger: false,
```

也就是说，Node 可以展示和归档候选字段，但不能凭这些字段推断人工审批，也不能写入真实 ledger。

## Envelope Digest 和 Idempotency Key

v181 生成自己的 digest：

```ts
const envelopeDigest = digestEnvelope({
  profileVersion: "approval-ledger-dry-run-envelope.v1",
  sourceGateDigest: stringValue(prerequisiteGate.gate.gateDigest),
  sourceGateProfileVersion: prerequisiteGate.profileVersion,
  ledgerCandidateFields,
  dryRunSteps,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  checks: {
    ...checks,
    envelopeDigestValid: undefined,
    readyForApprovalLedgerDryRunEnvelope: undefined,
  },
});
```

digest 覆盖：

```text
v180 gate digest
v180 profile version
ledger candidate fields
dry-run steps
UPSTREAM_ACTIONS_ENABLED
checks
```

同时生成幂等键：

```ts
function createIdempotencyKey(prerequisiteGate: ApprovalDecisionPrerequisiteGateProfile): string {
  return `approval-ledger-dry-run:${String(prerequisiteGate.gate.gateDigest).slice(0, 16)}`;
}
```

这个 key 只用于 dry-run envelope 的可复核身份，不代表真实审批写入幂等。

## 安全边界

v181 明确输出：

```ts
readyForApprovalDecision: false,
readyForApprovalLedgerWrite: false,
readyForProductionRelease: false,
readyForProductionRollback: false,
readyForProductionRestore: false,
executionAllowed: false,
```

`createForbiddenOperations()` 继续封死危险动作：

```ts
forbid("Create approval decision from Node v181", "..."),
forbid("Write approval ledger from Node v181", "..."),
forbid("Trigger production release from Node v181", "..."),
forbid("Execute Java rollback SQL from Node v181", "..."),
forbid("Execute mini-kv restore from Node v181", "..."),
```

所以 v181 的价值是让 ledger 写入前的结构变得清楚，而不是让系统进入真实审批。

## 路由接入

路由文件：

```text
src/routes/statusRoutes.ts
```

新增入口：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/approval-ledger-dry-run-envelope", {
  schema: {
    querystring: fixtureReportQuerySchema,
  },
}, async (request, reply) => {
  const profile = loadApprovalLedgerDryRunEnvelope(deps.config, request.headers);
});
```

这里继续传入 `request.headers`，因为 v181 通过 v180 -> v179 -> v178 -> v177 这条链路依赖 operator identity evidence。

## 测试覆盖

测试文件：

```text
test/approvalLedgerDryRunEnvelope.test.ts
```

覆盖四类行为：

```text
正常生成 dry-run envelope
缺少 operator identity headers 时阻断
UPSTREAM_ACTIONS_ENABLED=true 时阻断
JSON / Markdown 路由可访问
```

正常路径断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "approval-ledger-dry-run-envelope.v1",
  envelopeState: "ready-for-approval-ledger-dry-run-review",
  readyForApprovalLedgerDryRunEnvelope: true,
  readyForApprovalDecision: false,
  readyForApprovalLedgerWrite: false,
  executionAllowed: false,
});
```

路由断言：

```ts
expect(markdown.body).toContain("# Approval ledger dry-run envelope");
expect(markdown.body).toContain("approval-ledger-candidate.v1");
expect(markdown.body).toContain("Write approval ledger from Node v181");
```

## 计划位置

当前计划：

```text
docs/plans/v179-post-pre-approval-roadmap.md
```

v181 完成后，下一步是：

```text
推荐并行：Java v65 + mini-kv v74
```

Node v182 必须等待这两个上游证据完成后再做，不应该继续 Node 抢跑。

## 验证与归档

本版本验证包括：

```text
npm run typecheck
npx vitest run test/approvalLedgerDryRunEnvelope.test.ts
npm test
npm run build
safe HTTP smoke
Chrome screenshot
```

归档：

```text
c/181/图片/approval-ledger-dry-run-envelope-v181.png
c/181/解释/approval-ledger-dry-run-envelope-v181.md
```

## 一句话总结

Node v181 把 v180 的审批前置 gate 转换成 approval ledger 写入前的 dry-run envelope：它生成候选字段、digest、idempotency key、audit context 和 rollback boundary，但继续阻断真实 approval decision、ledger 写入、发布、回滚、恢复和生产权限。
