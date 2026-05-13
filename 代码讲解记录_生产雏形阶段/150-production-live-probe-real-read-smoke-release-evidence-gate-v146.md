# 第一百四十六版代码讲解：production live probe real-read smoke release evidence gate

本版目标是消费 v145 result importer，判断导入的 smoke evidence 是否可以升级为 production pass evidence。

它解决的问题是：

```text
导入结果不等于生产通过；
必须有一个 gate 明确判断 all-pass、probe window、actions disabled 等条件。
```

## 本版所处项目进度

v144 做 execution request。

v145 做 result importer。

v146 做：

```text
real-read smoke release evidence gate
```

这是一版阶段 gate，不是新的 summary 流水账。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeReleaseEvidenceGate.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReleaseEvidenceGateProfile> {
```

它只消费 v145：

```ts
const importer = await loadProductionLiveProbeRealReadSmokeResultImporter(input);
const evaluatedRecords = importer.importedRecords.map(createEvaluatedRecord);
```

这样 release gate 的输入边界很清晰。

## gateDecision

本版核心决策：

```ts
gateDecision: "production-pass-evidence-ready" | "not-production-pass-evidence" | "blocked";
```

生成逻辑：

```ts
const gateDecision = productionBlockers.length > 0
  ? "blocked"
  : checks.readyForProductionPassEvidence
    ? "production-pass-evidence-ready"
    : "not-production-pass-evidence";
```

当前默认：

```text
UPSTREAM_PROBES_ENABLED=false
imported records=accepted-skipped
```

所以：

```text
gateDecision=not-production-pass-evidence
```

## evaluatedRecords

每条 imported record 转成 gate record：

```ts
function createEvaluatedRecord(record: ProductionLiveProbeImportedResultRecord): ProductionLiveProbeReleaseEvidenceRecord {
  return {
    id: record.id,
    gateStatus: record.importStatus === "accepted-pass"
      ? "pass-ready"
      : record.importStatus === "accepted-skipped"
        ? "not-pass-skipped"
        : "not-pass-rejected",
    importStatus: record.importStatus,
    sourceStatus: record.sourceStatus,
    readOnly: true,
    mutatesState: false,
    attempted: record.attempted,
    reason: record.importStatus === "accepted-pass"
      ? "Imported record is pass evidence; final promotion still requires all records pass and probe window open."
      : record.importStatus === "accepted-skipped"
        ? "Skipped imported record prevents production pass evidence."
        : "Rejected imported record blocks release evidence promotion.",
  };
}
```

当前 5 条都是：

```text
gateStatus=not-pass-skipped
```

## production pass 条件

核心 checks：

```ts
allImportedRecordsPass: importer.summary.acceptedPassRecordCount === importer.summary.importedRecordCount
  && importer.summary.importedRecordCount > 0,
noSkippedRecords: importer.summary.acceptedSkippedRecordCount === 0,
probeWindowWasOpen: input.config.upstreamProbesEnabled === true
  && importer.importEnvelope.upstreamProbesEnabled === true,
upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
  && importer.checks.upstreamActionsStillDisabled,
```

gate 可运行：

```ts
checks.readyForReleaseEvidenceGate = checks.resultImporterReady
  && checks.importDigestValid
  && checks.allExpectedRecordsImported
  && checks.allImportedRecordsAccepted
  && checks.noRejectedRecords
  && checks.noWriteEvidenceImported
  && checks.upstreamActionsStillDisabled;
```

生产 pass：

```ts
checks.readyForProductionPassEvidence = checks.readyForReleaseEvidenceGate
  && checks.allImportedRecordsPass
  && checks.noSkippedRecords
  && checks.probeWindowWasOpen;
```

当前结果：

```text
readyForReleaseEvidenceGate=true
readyForProductionPassEvidence=false
```

这就是本版最重要的判断：gate 能运行，但当前证据不能升级。

## 写动作保护

继续要求：

```ts
upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
  && importer.checks.upstreamActionsStillDisabled,
```

测试覆盖：

```text
UPSTREAM_ACTIONS_ENABLED=true => gateDecision=blocked
```

## gate digest

本版新增 gate digest：

```ts
const gateDigest = digestGate({
  profileVersion: "production-live-probe-real-read-smoke-release-evidence-gate.v1",
  gateDecision,
  sourceImportDigest: importer.importEnvelope.importDigest,
  upstreamProbesEnabled: input.config.upstreamProbesEnabled,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
  evaluatedRecords: evaluatedRecords.map((record) => ({
    id: record.id,
    gateStatus: record.gateStatus,
    importStatus: record.importStatus,
    attempted: record.attempted,
  })),
  checks: {
    ...checks,
    readyForReleaseEvidenceGate: checks.readyForReleaseEvidenceGate,
    readyForProductionPassEvidence: checks.readyForProductionPassEvidence,
  },
});
```

它让 gate 输出本身可归档、可引用。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-real-read-smoke-release-evidence-gate
GET /api/v1/production/live-probe-real-read-smoke-release-evidence-gate?format=markdown
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeReleaseEvidenceGate.test.ts
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "production-live-probe-real-read-smoke-release-evidence-gate.v1",
  gateDecision: "not-production-pass-evidence",
  readyForReleaseEvidenceGate: true,
  readyForProductionPassEvidence: false,
  gate: {
    sourceAdapterMode: "skipped",
    importedRecordCount: 5,
    passRecordCount: 0,
    skippedRecordCount: 5,
  },
});
```

还覆盖：

```text
UPSTREAM_ACTIONS_ENABLED=true 时 blocked
JSON / Markdown 路由可访问
```

## README、计划和归档

README 新增：

```text
Production live probe real-read smoke release evidence gate
GET /api/v1/production/live-probe-real-read-smoke-release-evidence-gate
GET /api/v1/production/live-probe-real-read-smoke-release-evidence-gate?format=markdown
```

归档：

```text
b/146/图片/production-live-probe-real-read-smoke-release-evidence-gate.png
b/146/解释/运行调试说明.md
```

## 一句话总结

v146 建立了从 imported smoke records 到 production pass evidence 的正式 gate：当前 skipped evidence 能被评估，但不能升级为生产通过证据；只有 all-pass、probe window open、actions disabled 同时成立时才可能通过。
