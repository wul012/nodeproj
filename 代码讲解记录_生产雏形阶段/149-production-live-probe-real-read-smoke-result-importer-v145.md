# 第一百四十五版代码讲解：production live probe real-read smoke result importer

本版目标是把 v143 archive adapter 的输出转成标准导入 envelope。

它解决的问题是：

```text
release evidence gate 不应该直接吃散乱的 smoke 输出；
应该先有一个稳定 schema，把 pass/skipped 结果归一成 imported records。
```

## 本版所处项目进度

v144 做 execution request。

v145 做：

```text
real-read smoke result importer
```

它仍不做真实上游探测，只负责导入格式和样本归一。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeResultImporter.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeResultImporter(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeResultImporterProfile> {
```

它读取两个来源：

```ts
const executionRequest = await loadProductionLiveProbeRealReadSmokeExecutionRequest(input);
const sourceAdapter = await loadProductionLiveProbeRealReadSmokeArchiveAdapter(input);
```

含义：

```text
v144 execution request 提供执行请求 digest
v143 archive adapter 提供 smoke records
v145 importer 统一导入格式
```

## importSchema

本版定义 schema：

```ts
return {
  schemaVersion: "real-read-smoke-result-import.v1",
  requiredFields: [
    "id",
    "sourceStatus",
    "archiveStatus",
    "target",
    "protocol",
    "readOnly",
    "mutatesState",
    "attempted",
    "message",
  ],
  acceptedSourceStatuses: ["pass", "skipped"],
  rejectedSourceStatuses: ["blocked"],
  requiredReadOnly: true,
  requiredMutatesState: false,
  supportedProbeIds: [...SUPPORTED_PROBE_IDS],
};
```

支持的 probe：

```text
java-actuator-health
java-ops-overview
mini-kv-health
mini-kv-infojson
mini-kv-statsjson
```

## importedRecords

归一逻辑：

```ts
function createImportedRecord(
  record: ProductionLiveProbeRealReadSmokeArchiveRecord,
): ProductionLiveProbeImportedResultRecord {
  return {
    id: record.id,
    importStatus: record.sourceStatus === "pass"
      ? "accepted-pass"
      : record.sourceStatus === "skipped"
        ? "accepted-skipped"
        : "rejected-blocked",
    sourceStatus: record.sourceStatus,
    archiveStatus: record.archiveStatus,
    target: record.target,
    protocol: record.protocol,
    readOnly: true,
    mutatesState: false,
    attempted: record.attempted,
    message: record.message,
    evidenceSummary: record.evidenceSummary,
  };
}
```

当前默认：

```text
UPSTREAM_PROBES_ENABLED=false
```

因此导入结果是：

```text
accepted-skipped=5
accepted-pass=0
rejected=0
```

## importEnvelope

导入 envelope：

```ts
importEnvelope: {
  importDigest,
  resultSchemaVersion: importSchema.schemaVersion,
  sourceExecutionRequestDigest: executionRequest.request.requestDigest,
  sourceArchiveAdapterDigest: sourceAdapter.adapter.adapterDigest,
  sourceAdapterMode: sourceAdapter.adapter.adapterMode,
  upstreamProbesEnabled: input.config.upstreamProbesEnabled,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
  importedRecordCount: importedRecords.length,
  passRecordCount: importedRecords.filter((record) => record.importStatus === "accepted-pass").length,
  skippedRecordCount: importedRecords.filter((record) => record.importStatus === "accepted-skipped").length,
  rejectedRecordCount: importedRecords.filter((record) => record.importStatus === "rejected-blocked").length,
  skippedEvidenceNotProductionPass: sourceAdapter.adapter.adapterMode !== "pass",
},
```

这让后续 v146 gate 可以只消费 importer，而不是重新拼接多个来源。

## checks

核心 checks：

```ts
recordSetMatchesSchema: sourceAdapter.records.length === importSchema.supportedProbeIds.length
  && importSchema.supportedProbeIds.every((id) => sourceAdapter.records.some((record) => record.id === id)),
noBlockedRecordsImported: importedRecords.every((record) => record.importStatus !== "rejected-blocked"),
noWriteEvidenceImported: importedRecords.every((record) => record.readOnly && !record.mutatesState),
upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
  && sourceAdapter.checks.upstreamActionsStillDisabled,
```

readiness：

```ts
checks.readyForResultImport = checks.executionRequestReviewReady
  && checks.sourceArchiveAdapterReady
  && checks.sourceArchiveAdapterDigestValid
  && checks.sourceRecordsPresent
  && checks.recordSetMatchesSchema
  && checks.noBlockedRecordsImported
  && checks.noWriteEvidenceImported
  && checks.upstreamActionsStillDisabled
  && checks.skippedEvidenceNotProductionPass;
```

当前结果：

```text
readyForResultImport=true
readyForProductionPassEvidence=false
```

## 写动作保护

如果 `UPSTREAM_ACTIONS_ENABLED=true`：

```ts
upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
  && sourceAdapter.checks.upstreamActionsStillDisabled,
```

测试会确认：

```text
readyForResultImport=false
blocker=UPSTREAM_ACTIONS_ENABLED
```

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-real-read-smoke-result-importer
GET /api/v1/production/live-probe-real-read-smoke-result-importer?format=markdown
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeResultImporter.test.ts
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "production-live-probe-real-read-smoke-result-importer.v1",
  readyForResultImport: true,
  importEnvelope: {
    sourceAdapterMode: "skipped",
    importedRecordCount: 5,
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
Production live probe real-read smoke result importer
GET /api/v1/production/live-probe-real-read-smoke-result-importer
GET /api/v1/production/live-probe-real-read-smoke-result-importer?format=markdown
```

归档：

```text
b/145/图片/production-live-probe-real-read-smoke-result-importer.png
b/145/解释/运行调试说明.md
```

## 一句话总结

v145 把 smoke adapter 输出转成标准 result import envelope：当前 skipped 结果可被规范导入，但仍不能作为 production pass evidence。
