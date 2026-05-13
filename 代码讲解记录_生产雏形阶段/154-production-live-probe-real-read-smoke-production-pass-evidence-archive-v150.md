# 第一百五十版代码讲解：production pass evidence archive

本版目标是把 v149 的 verification 结果归档成稳定 archive。

它解决的问题是：

```text
v146 决定 release evidence gate；
v148 捕获 capture evidence；
v149 判断 capture 是否能成为 production pass evidence；
v150 把这条 digest 链固化，作为 Java v49 / mini-kv v50 后续只读 evidence 的承接点。
```

## 本版所处项目进度

当前项目已经进入生产雏形阶段后半段：Node 不再只是看板，而是在形成可审计、可验证、可归档的生产前证据链。

v150 的位置是：

```text
v146 release evidence gate
 -> v148 evidence capture
 -> v149 production pass evidence verification
 -> v150 production pass evidence archive
```

本版仍然不启动 Java / mini-kv。默认没有真实只读窗口时，archive 可以成立，但只能是：

```text
not-production-pass-evidence-archived
```

不能变成 production pass。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeProductionPassEvidenceArchive.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchive(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveProfile> {
```

它只读取 v149 verification：

```ts
const verification = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceVerification(input);
```

这里没有新建上游连接生命周期，也没有自动启动 Java / mini-kv。

## production pass 判断

本版不自己重新判断五条 probe 是否 pass，而是承接 v149 的结论：

```ts
const archivedAsProductionPassEvidence = verification.readyForProductionPassEvidenceVerification
  && verification.verificationState === "production-pass-evidence-ready";
```

这意味着：

```text
v149 没有通过 -> v150 只能归档为 non-pass evidence
v149 通过 -> v150 可以归档为 pass evidence
```

但即使 pass，也不会打开生产操作：

```ts
readyForProductionOperations: false,
readOnly: true,
executionAllowed: false,
```

## archive digest 链

archive 的核心字段：

```ts
archive: {
  archiveDigest,
  verificationDigest: verification.verification.verificationDigest,
  captureDigest: verification.verification.captureDigest,
  releaseEvidenceGateDigest: verification.verification.releaseEvidenceGateDigest,
  verificationProfileVersion: verification.profileVersion,
  captureProfileVersion: verification.verification.captureProfileVersion,
  releaseEvidenceGateProfileVersion: verification.verification.releaseEvidenceGateProfileVersion,
  verificationState: verification.verificationState,
  captureMode: verification.verification.captureMode,
  releaseGateDecision: verification.verification.releaseGateDecision,
  upstreamProbesEnabled: verification.verification.upstreamProbesEnabled,
  upstreamActionsEnabled: verification.verification.upstreamActionsEnabled,
  readOnlyWindowOpen: verification.verification.readOnlyWindowOpen,
  automaticUpstreamStart: false,
  mutatesUpstreamState: false,
  archivedAsProductionPassEvidence,
},
```

这段代码把三层证据串起来：

```text
verificationDigest
captureDigest
releaseEvidenceGateDigest
```

`archiveDigest` 再把这些字段整体封存：

```ts
const archiveDigest = digestArchive({
  profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-archive.v1",
  verificationDigest: verification.verification.verificationDigest,
  captureDigest: verification.verification.captureDigest,
  releaseEvidenceGateDigest: verification.verification.releaseEvidenceGateDigest,
  archiveState,
  archivedAsProductionPassEvidence,
  verificationState: verification.verificationState,
  captureMode: verification.verification.captureMode,
  releaseGateDecision: verification.verification.releaseGateDecision,
  upstreamActionsEnabled: verification.verification.upstreamActionsEnabled,
  readyForProductionOperations: verification.readyForProductionOperations,
  checks,
});
```

这让后续 Node v151 可以重算并验证 archive，而不是只相信文本说明。

## checks 设计

本版 checks 不是简单看字段存在，而是检查版本、digest、状态边界和安全开关：

```ts
const checks = {
  verificationDigestValid: /^[a-f0-9]{64}$/.test(verification.verification.verificationDigest),
  captureDigestValid: /^[a-f0-9]{64}$/.test(verification.verification.captureDigest),
  releaseEvidenceGateDigestValid: /^[a-f0-9]{64}$/.test(verification.verification.releaseEvidenceGateDigest),
  verificationProfileVersionValid: verification.profileVersion === "production-live-probe-real-read-smoke-production-pass-evidence-verification.v1",
  captureProfileVersionValid: verification.verification.captureProfileVersion === "production-live-probe-real-read-smoke-evidence-capture.v1",
  releaseEvidenceGateProfileVersionValid: verification.verification.releaseEvidenceGateProfileVersion === "production-live-probe-real-read-smoke-release-evidence-gate.v1",
  verificationStateMatchesArchive: archivedAsProductionPassEvidence
    ? verification.verificationState === "production-pass-evidence-ready"
    : verification.verificationState !== "production-pass-evidence-ready",
  skippedOrMixedArchivedAsNonPass: verification.verification.captureMode === "pass"
    || archivedAsProductionPassEvidence === false,
  upstreamActionsStillDisabled: verification.verification.upstreamActionsEnabled === false
    && verification.checks.upstreamActionsStillDisabled,
  noAutomaticUpstreamStart: verification.verification.automaticUpstreamStart === false
    && verification.checks.noAutomaticUpstreamStart,
  readyForProductionOperationsStillFalse: verification.readyForProductionOperations === false,
  readyForProductionPassEvidenceArchive: false,
};
```

其中最关键的是：

```text
skippedOrMixedArchivedAsNonPass
upstreamActionsStillDisabled
readyForProductionOperationsStillFalse
```

这三项防止本地 skipped 证据被误当成生产通过证据。

## archiveState

archiveState 的判断：

```ts
const archiveState = verification.verificationState === "blocked"
  || verification.productionBlockers.length > 0
  || !checks.readyForProductionPassEvidenceArchive
  ? "blocked"
  : archivedAsProductionPassEvidence
    ? "production-pass-evidence-archived"
    : "not-production-pass-evidence-archived";
```

默认没有启动上游时，v148 capture 是 skipped，v149 verification 是 not-production-pass-evidence，所以 v150 正常输出：

```text
not-production-pass-evidence-archived
```

这不是失败，而是当前安全边界下的正确结果。

## 路由接入

修改文件：

```text
src/routes/statusRoutes.ts
```

新增路由：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive", {
```

路由支持 JSON：

```text
/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive
```

也支持 Markdown：

```text
/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive?format=markdown
```

Markdown 由这个函数生成：

```ts
renderProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveMarkdown(profile)
```

截图就是通过 Markdown route 获取的。

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeProductionPassEvidenceArchive.test.ts
```

第一类测试：默认 skipped 只能归档为 non-pass：

```ts
expect(profile).toMatchObject({
  archiveState: "not-production-pass-evidence-archived",
  readyForProductionPassEvidenceArchive: true,
  readyForProductionOperations: false,
  archive: {
    verificationState: "not-production-pass-evidence",
    captureMode: "skipped",
    archivedAsProductionPassEvidence: false,
  },
});
```

第二类测试：模拟 all-pass upstream 时可以成为 pass archive，但仍不打开生产操作：

```ts
expect(profile).toMatchObject({
  archiveState: "production-pass-evidence-archived",
  readyForProductionPassEvidenceArchive: true,
  readyForProductionOperations: false,
  archive: {
    verificationState: "production-pass-evidence-ready",
    captureMode: "pass",
    archivedAsProductionPassEvidence: true,
  },
});
```

第三类测试：如果打开写开关，archive 必须 blocked：

```ts
expect(profile.archiveState).toBe("blocked");
expect(profile.readyForProductionPassEvidenceArchive).toBe(false);
expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
```

第四类测试：JSON / Markdown 路由可访问。

## 运行调试

本版执行并通过：

```text
npm run typecheck
npm test -- --run test/productionLiveProbeRealReadSmokeProductionPassEvidenceArchive.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

全量测试结果：

```text
99 files, 343 tests passed
```

HTTP smoke 关键结果：

```text
archiveState=not-production-pass-evidence-archived
readyForProductionPassEvidenceArchive=true
readyForProductionOperations=false
captureMode=skipped
archivedAsProductionPassEvidence=false
archiveDigestLength=64
markdownStatus=200
```

归档截图：

```text
b/150/图片/production-pass-evidence-archive.png
```

## 成熟度变化

v150 的提升不是新增一个按钮，而是把 Node 生产前证据链从“判断”推进到“归档”：

```text
verification 可以被 archive 引用
capture 可以被 archive 引用
release gate 可以被 archive 引用
archive 自己也有 digest
skipped/mixed 仍然不能冒充 pass
生产操作仍然关闭
```

这让下一步全局计划更清楚：Java v49 和 mini-kv v50 可以一起补只读 evidence 供给，Node v151 再消费这些证据做 archive verification。

## 一句话总结

v150 把 production pass evidence 从一次性 verification 结果，升级成可归档、可复核、可交给后续 Java/mini-kv 只读 evidence 继续补强的 digest 链。
