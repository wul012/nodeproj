# 第一百一十五版代码讲解：managed audit readiness summary

本版目标是把 v112 的 managed audit store contract 和 v109 的 audit retention/integrity evidence 合成一个更接近生产落地前的审计准备报告。

它不实现数据库、不迁移审计文件、不删除或轮转本地 audit JSONL。它只回答：

```text
fake adapter contract 是否覆盖
file audit 证据是否稳定
retention / backup 配置是否齐
managed store URL 是否有
真实 managed audit adapter 是否仍缺失
```

## 本版所处项目进度

v112 已经有：

```text
managed-audit-store-contract.v1
```

它用 fake adapter 覆盖 append-only、requestId query、digest、retention metadata、backup marker。

v109 已经有：

```text
audit-retention-integrity-evidence.v1
```

它能检查 file audit digest、retention days、max file bytes、rotation、backup。

v115 做的是合成判断：把这两份 evidence 变成一个适合后续真实 managed adapter 开发前使用的 readiness summary。

## 新增服务

新增文件：

```text
src/services/managedAuditReadinessSummary.ts
```

入口函数：

```ts
export function createManagedAuditReadinessSummary(input: {
  config: Pick<AppConfig,
    | "auditStoreKind"
    | "auditStoreUrl"
    | "auditRetentionDays"
    | "auditMaxFileBytes"
    | "auditRotationEnabled"
    | "auditBackupEnabled"
  >;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
}): ManagedAuditReadinessSummary {
  const managedContract = createManagedAuditStoreContractProfile(input.config);
  const retentionEvidence = createAuditRetentionIntegrityEvidence({
    config: input.config,
    runtime: input.runtime,
    auditLog: input.auditLog,
  });
```

这里复用两个已有能力：

```text
createManagedAuditStoreContractProfile()
createAuditRetentionIntegrityEvidence()
```

所以 v115 不是重复造证据，而是把已有证据组合成更高一层的生产判断。

## Runtime 摘要

summary 输出的 runtime 是：

```ts
runtime: {
  requestedStoreKind: input.config.auditStoreKind,
  runtimeStoreKind: input.runtime.runtimeStoreKind,
  durableAtRuntime: input.runtime.durableAtRuntime,
  auditStoreUrlConfigured: input.config.auditStoreUrl.length > 0,
  realManagedAdapterConnected: false,
  fakeAdapterUsed: true,
  fileAuditStillRehearsal: true,
},
```

这里有三个故意保守的字段：

```text
realManagedAdapterConnected=false
fakeAdapterUsed=true
fileAuditStillRehearsal=true
```

它们明确告诉读者：当前只是生产前 adapter 合同和本地 evidence，不是生产审计存储。

## 核心检查项

检查项由 `createChecks()` 生成：

```ts
const fakeAdapterCapabilitiesCovered = managedContract.summary.coveredCapabilityCount === managedContract.summary.capabilityCount
  && managedContract.checks.appendOnlyWriteCovered
  && managedContract.checks.queryByRequestIdCovered
  && managedContract.checks.digestVerificationCovered;
const retentionKnobsConfigured = config.auditRetentionDays > 0 && config.auditMaxFileBytes > 0;
const backupRotationConfigured = config.auditRotationEnabled && config.auditBackupEnabled;
const fileAuditRuntimeSelected = runtime.runtimeStoreKind === "file";
const fileAuditIntegrityStable = retentionEvidence.checks.integrityDigestStable;
const managedStoreUrlConfigured = config.auditStoreUrl.length > 0;
const realManagedAdapterConnected = false;
```

然后合成：

```ts
localEvidenceReadyForAdapterWork: fakeAdapterCapabilitiesCovered
  && fileAuditIntegrityStable
  && retentionKnobsConfigured
  && backupRotationConfigured
  && managedStoreUrlConfigured,
readyForProductionAudit: false,
```

这两个字段的含义不同：

```text
localEvidenceReadyForAdapterWork=true
```

表示现在可以开始真实 adapter 的工程实现。

```text
readyForProductionAudit=false
```

表示还不能把它当生产审计系统，因为真实 adapter 还没有接。

## 实施清单

本版新增 `implementationChecklist`：

```ts
id:
  | "adapter-contract-covered"
  | "file-audit-evidence-stable"
  | "managed-store-url-configured"
  | "real-managed-adapter-implemented"
  | "backup-restore-drill-implemented";
```

其中前三项在配置齐全时可以完成：

```text
adapter-contract-covered
file-audit-evidence-stable
managed-store-url-configured
```

后两项保持 pending：

```text
real-managed-adapter-implemented
backup-restore-drill-implemented
```

这让后续版本可以很明确地继续推进，而不是只看到一个笼统的 blocker。

## 生产阻塞项

生产 blocker 由本函数收集：

```ts
addMessage(blockers, checks.fakeAdapterCapabilitiesCovered, "MANAGED_AUDIT_CONTRACT_INCOMPLETE", ...);
addMessage(blockers, checks.fileAuditIntegrityStable, "FILE_AUDIT_INTEGRITY_UNSTABLE", ...);
addMessage(blockers, checks.retentionKnobsConfigured, "AUDIT_RETENTION_KNOBS_MISSING", ...);
addMessage(blockers, checks.backupRotationConfigured, "AUDIT_BACKUP_ROTATION_MISSING", ...);
addMessage(blockers, checks.managedStoreUrlConfigured, "MANAGED_AUDIT_STORE_URL_MISSING", ...);
addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", ...);
```

在 v115 smoke 的完整 rehearsal 配置下，最终 blocker 只剩：

```text
REAL_MANAGED_AUDIT_ADAPTER_MISSING
```

这说明 Node 已经把本地前置证据准备好了，但真实生产审计依赖还没落地。

## HTTP 入口

新增路由：

```text
GET /api/v1/audit/managed-readiness-summary
GET /api/v1/audit/managed-readiness-summary?format=markdown
```

路由位置：

```text
src/routes/auditRoutes.ts
```

代码结构：

```ts
const summary = createManagedAuditReadinessSummary({
  config: deps.config,
  runtime: deps.auditStoreRuntime,
  auditLog: deps.auditLog,
});

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderManagedAuditReadinessSummaryMarkdown(summary);
}
```

因为它是 audit endpoint，所以 access policy 也扩展了 audit read 路径：

```ts
pathPatterns: [
  "/api/v1/audit/events",
  "/api/v1/audit/summary",
  "/api/v1/audit/store-*",
  "/api/v1/audit/file-*",
  "/api/v1/audit/retention-*",
  "/api/v1/audit/managed-*",
],
```

文件位置：

```text
src/services/accessPolicyProfile.ts
```

这保证 enforcement rehearsal 打开时，auditor 可以访问新的 managed readiness summary。

## 测试覆盖

新增测试：

```text
test/managedAuditReadinessSummary.test.ts
```

第一组测试使用 file-backed audit runtime：

```ts
const runtime = createAuditStoreRuntime(config);

runtime.auditLog.record({
  requestId: "req-managed-summary",
  method: "GET",
  path: "/api/v1/audit/managed-readiness-summary",
  statusCode: 200,
  durationMs: 4,
});
```

然后断言关键结果：

```ts
checks: {
  fakeAdapterCapabilitiesCovered: true,
  fileAuditRuntimeSelected: true,
  fileAuditIntegrityStable: true,
  retentionKnobsConfigured: true,
  backupRotationConfigured: true,
  managedStoreUrlConfigured: true,
  realManagedAdapterConnected: false,
  localEvidenceReadyForAdapterWork: true,
  readyForProductionAudit: false,
},
```

并确认 blocker 只有：

```ts
expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual([
  "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
]);
```

第二组测试缺配置时会出现：

```text
AUDIT_RETENTION_KNOBS_MISSING
AUDIT_BACKUP_ROTATION_MISSING
MANAGED_AUDIT_STORE_URL_MISSING
REAL_MANAGED_AUDIT_ADAPTER_MISSING
```

第三组测试覆盖 HTTP JSON 和 Markdown：

```ts
expect(markdown.body).toContain("# Managed audit readiness summary");
expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
```

## 运行调试与归档

本版运行了：

```text
npm run typecheck
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

结果：

```text
64 个测试文件通过
235 条测试通过
```

运行归档：

```text
b/115/图片/managed-audit-readiness-summary.png
b/115/解释/运行调试说明.md
```

## 一句话总结

v115 把 fake adapter contract、file audit digest、retention/backup knobs 和 managed store URL 合成审计生产准备 summary；本地 evidence 已经足够支撑下一步真实 adapter 开发，但真实 managed audit adapter 和 backup/restore drill 仍是生产硬门槛。
