# 第一百一十版代码讲解：production readiness summary v5

本版目标是复查 v108 和 v109 之后，Node 控制面离生产级还差什么。

它不是放行接口，不会启用 upstream action，不会执行 Java replay，不会写 mini-kv，也不会把 file audit 说成生产审计库。它的角色是把当前最关键的生产门槛重新汇总：

```text
上游边界证据是否仍 ready
auth enforcement rehearsal 是否可用
audit retention / integrity evidence 是否可用
真实 signed auth 是否完成
managed audit store 是否完成
```

## 本版所处项目进度

v107 已经有 production readiness summary v4，能汇总 Java v48、mini-kv v57、Node v104-v106。

v108 新增 auth enforcement rehearsal，可以显式打开 401 / 403 / 200 访问控制演练。

v109 新增 audit retention integrity evidence，可以检查 retention knobs 和 file audit digest 稳定性。

v110 把这些重新归并成 production readiness summary v5。成熟度变化是：项目已经不只是“列出缺口”，而是能区分哪些缺口已经被 rehearsal evidence 缩小，哪些仍然必须靠真正生产基础设施解决。

## 路由依赖变化

v110 需要读取 audit runtime 和 audit log，所以 `statusRoutes` 的依赖扩展了：

```ts
interface StatusRouteDeps {
  config: AppConfig;
  snapshots: OpsSnapshotService;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}
```

文件位置：

```text
src/routes/statusRoutes.ts
```

`src/app.ts` 注册路由时也把审计依赖传进去：

```ts
await registerStatusRoutes(app, {
  config,
  snapshots,
  auditLog,
  auditStoreRuntime: auditStoreRuntime.description,
});
```

这一步让 `/api/v1/production/readiness-summary-v5` 可以直接消费 v109 的 audit retention integrity evidence。

## HTTP 入口

新增路由：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary-v5", {
  schema: {
    querystring: {
      type: "object",
      properties: {
        format: { type: "string", enum: ["json", "markdown"] },
      },
      additionalProperties: false,
    },
  },
}, async (request, reply) => {
  const summary = await loadProductionReadinessSummaryV5({
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
  });
```

这个接口仍然只支持 JSON / Markdown 输出，不接收执行参数。

## 聚合服务

新增服务文件：

```text
src/services/productionReadinessSummaryV5.ts
```

核心加载函数是：

```ts
export async function loadProductionReadinessSummaryV5(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionReadinessSummaryV5> {
  const previousSummary = await loadProductionReadinessSummaryV4(input.config);
  return createProductionReadinessSummaryV5({
    config: input.config,
    previousSummary,
    authEnforcement: createAuthEnforcementRehearsalProfile(input.config),
    auditRetentionIntegrity: createAuditRetentionIntegrityEvidence({
      config: input.config,
      runtime: input.auditStoreRuntime,
      auditLog: input.auditLog,
    }),
  });
}
```

这段代码说明 v5 的三个输入来源：

```text
previousSummary：v107/v4 的上游边界与 access/audit 汇总
authEnforcement：v108 的 enforcement rehearsal profile
auditRetentionIntegrity：v109 的 retention/integrity evidence
```

## 核心检查项

v5 的核心 checks 是：

```ts
const checks = {
  previousSummaryAvailable: input.previousSummary.summaryVersion === "production-readiness-summary.v4",
  upstreamBoundaryEvidenceReady: input.previousSummary.checks.javaOperatorAuthBoundaryReady
    && input.previousSummary.checks.miniKvRecoveryBoundaryReady,
  authRehearsalProfileReady: Object.values(input.authEnforcement.checks).every(Boolean),
  authEnforcementCurrentlyRejects: input.authEnforcement.runtime.rejectsRequests,
  signedCredentialAuthReady: false,
  auditRetentionIntegrityEvidenceReady: input.auditRetentionIntegrity.checks.fileRuntimeSelected
    && input.auditRetentionIntegrity.checks.retentionDaysConfigured
    && input.auditRetentionIntegrity.checks.maxFileBytesConfigured
    && input.auditRetentionIntegrity.checks.rotationPolicyConfigured
    && input.auditRetentionIntegrity.checks.backupPolicyConfigured
    && input.auditRetentionIntegrity.checks.integrityDigestStable,
  managedAuditStoreReady: input.auditRetentionIntegrity.checks.managedStoreConfigured,
  upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
  executionStillBlocked: input.previousSummary.checks.executionStillBlocked
    && input.config.upstreamActionsEnabled === false,
  productionBlockersRemain: false,
};
```

这里有两个故意写死的生产阻塞：

```text
signedCredentialAuthReady=false
managedAuditStoreReady=false
```

它们不是遗漏，而是 v110 的生产判断：v108 和 v109 已经把 rehearsal 做得更像样，但还没有真实 signed auth，也没有 managed audit store。

## Auth enforcement 摘要

v5 会把 v108 profile 压缩成：

```ts
function summarizeAuthEnforcement(profile: AuthEnforcementRehearsalProfile): AuthEnforcementV5Summary {
  return {
    profileVersion: profile.profileVersion,
    authMode: profile.runtime.authMode,
    enforcementEnabled: profile.runtime.accessGuardEnforcementEnabled,
    rejectsRequests: profile.runtime.rejectsRequests,
    credentialAuthImplemented: profile.runtime.credentialAuthImplemented,
    sampleStatuses: Object.fromEntries(profile.samples.map((sample) => [sample.id, sample.enforcement.statusCode])),
    productionBlockerCodes: profile.productionBlockers.map((blocker) => blocker.code),
  };
}
```

这样 readiness summary 不需要展开整个 profile，也能看到：

```text
当前 enforcement 是否打开
是否会拒绝请求
三个样本分别是什么状态码
仍有哪些 auth blocker
```

## Audit retention 摘要

v5 对 v109 的摘要是：

```ts
function summarizeAuditRetentionIntegrity(report: AuditRetentionIntegrityEvidence): AuditRetentionIntegrityV5Summary {
  return {
    evidenceVersion: report.evidenceVersion,
    runtimeStoreKind: report.runtime.runtimeStoreKind,
    retentionDaysConfigured: report.checks.retentionDaysConfigured,
    maxFileBytesConfigured: report.checks.maxFileBytesConfigured,
    rotationPolicyConfigured: report.checks.rotationPolicyConfigured,
    backupPolicyConfigured: report.checks.backupPolicyConfigured,
    integrityDigestStable: report.checks.integrityDigestStable,
    managedStoreConfigured: report.checks.managedStoreConfigured,
    eventCount: report.integrity.eventCount,
    productionBlockerCodes: report.productionBlockers.map((blocker) => blocker.code),
  };
}
```

这让 v5 能区分：

```text
retention knobs 是否齐
digest 是否稳定
managed audit store 是否仍缺
```

## 生产阻塞项

v5 最关键的 blocker 是：

```ts
addCheckMessage(blockers, checks.signedCredentialAuthReady, "SIGNED_AUTH_MIDDLEWARE_MISSING", "auth-enforcement", "auth-enforcement-rehearsal", "Rehearsal headers are not signed credential authentication.");
addCheckMessage(blockers, checks.managedAuditStoreReady, "MANAGED_AUDIT_STORE_MISSING", "audit-retention", "audit-retention-integrity-evidence", "Managed durable audit storage is still required before production operations.");
```

如果当前运行时没有打开 enforcement，还会有：

```ts
addCheckMessage(blockers, checks.authEnforcementCurrentlyRejects, "AUTH_ENFORCEMENT_NOT_ENABLED", "auth-enforcement", "node-config", "ACCESS_GUARD_ENFORCEMENT_ENABLED is not enabled in the current runtime.");
```

这几个 blocker 让 v110 的判断非常直接：

```text
演练能力存在
生产认证未完成
生产审计未完成
真实执行继续关闭
```

## 分类结果

v5 的分类是：

```ts
export type ProductionReadinessV5CategoryId =
  | "upstream-boundary-evidence"
  | "auth-enforcement"
  | "audit-retention"
  | "execution-safety";
```

其中：

```text
upstream-boundary-evidence 可以 ready
execution-safety 可以 ready
auth-enforcement 不能 ready，因为 signed auth 缺失
audit-retention 不能 ready，因为 managed audit store 缺失
```

这比 v4 更接近生产判断，因为它已经能读到 v108/v109 的具体进展。

## 测试覆盖

新增测试文件：

```text
test/productionReadinessSummaryV5.test.ts
```

第一组测试验证默认不打开 enforcement 时的 v5 判断：

```ts
expect(summary).toMatchObject({
  summaryVersion: "production-readiness-summary.v5",
  readyForProductionOperations: false,
  checks: {
    upstreamBoundaryEvidenceReady: true,
    authRehearsalProfileReady: true,
    authEnforcementCurrentlyRejects: false,
    signedCredentialAuthReady: false,
    auditRetentionIntegrityEvidenceReady: true,
    managedAuditStoreReady: false,
    executionStillBlocked: true,
  },
});
```

第二组测试验证显式打开 rehearsal enforcement 后，v5 能看到 401 / 403 / 200：

```ts
expect(json.json()).toMatchObject({
  checks: {
    authEnforcementCurrentlyRejects: true,
    signedCredentialAuthReady: false,
    auditRetentionIntegrityEvidenceReady: true,
    managedAuditStoreReady: false,
  },
  evidence: {
    authEnforcement: {
      enforcementEnabled: true,
      rejectsRequests: true,
      sampleStatuses: {
        "missing-identity": 401,
        "insufficient-role": 403,
        "allowed-auditor": 200,
      },
    },
  },
});
```

第三组测试覆盖 JSON 和 Markdown 路由：

```ts
expect(markdown.body).toContain("# Production readiness summary v5");
expect(markdown.body).toContain("SIGNED_AUTH_MIDDLEWARE_MISSING");
expect(markdown.body).toContain("MANAGED_AUDIT_STORE_MISSING");
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
59 个测试文件通过
220 条测试通过
```

运行归档：

```text
b/110/图片/production-readiness-summary-v5.png
b/110/解释/运行调试说明.md
```

## 一句话总结

v110 把 auth enforcement rehearsal 和 audit retention integrity evidence 纳入 production readiness summary v5，证明生产雏形已经能更精确地复查门槛，但真实 signed auth 和 managed audit store 仍是生产级放行前的硬阻塞。
