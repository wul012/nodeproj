# 第一百零三版代码讲解：production readiness summary v3

本版目标是把 Node v100-v102 的生产化进展做一次复查。

它不是新的执行入口，不会调用 Java replay POST，不会执行 mini-kv 写命令，也不会把控制面声明为生产可用。它的角色是把 Java v47、mini-kv v56、Node access policy、Node access guard dry-run、Node audit store runtime 汇总成一个新的只读生产就绪度报告，让后续版本知道 access-control 和 audit 还差哪些硬门槛。

## 入口路由

本版新增入口在：

```text
src/routes/statusRoutes.ts
```

真实路由代码是：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary-v3", {
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
  const summary = await loadProductionReadinessSummaryV3(deps.config);

  if (request.query.format === "markdown") {
    reply.type("text/markdown; charset=utf-8");
    return renderProductionReadinessSummaryV3Markdown(summary);
  }

  return summary;
});
```

这里仍然是 `GET`，只接收 `format=json|markdown` 查询参数，不接收请求体、operator、确认词或 idempotency key。因此它天然不承载写操作，只负责读取本地 fixture 和 Node 内部 profile。

## 响应模型

核心响应对象在：

```text
src/services/productionReadinessSummaryV3.ts
```

最外层字段定义为：

```ts
export interface ProductionReadinessSummaryV3 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v3";
  maturityTarget: "production-near";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  checks: {
    previousSummaryAvailable: boolean;
    javaReplayEvidenceIndexReady: boolean;
    miniKvRecoveryFixtureIndexReady: boolean;
    accessPolicyCoverageReady: boolean;
    accessGuardDryRunReady: boolean;
    auditStoreRuntimeSelectable: boolean;
    auditStoreRuntimeDurable: boolean;
    auditStoreProductionReady: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    categorizedProductionBlockersPresent: boolean;
  };
}
```

几个关键字段的语义：

```text
readyForProductionOperations=false
readOnly=true
executionAllowed=false
```

这三个字段是控制面硬边界：v103 可以说明生产缺口，但不能授权真实操作。

## 上游证据配置

本版新增两个 fixture 路径配置：

```ts
javaReplayEvidenceIndexFixturePath: readString(
  env,
  "JAVA_REPLAY_EVIDENCE_INDEX_FIXTURE_PATH",
  defaultJavaReplayEvidenceIndexFixturePath(),
),
miniKvRecoveryFixtureIndexPath: readString(
  env,
  "MINIKV_RECOVERY_FIXTURE_INDEX_PATH",
  defaultMiniKvRecoveryFixtureIndexPath(),
),
```

文件位置：

```text
src/config.ts
```

Java 侧默认优先找未来可能出现的静态样本：

```text
D:\javaproj\advanced-order-platform\src\main\resources\static\contracts\failed-event-replay-evidence-index.sample.json
```

找不到时回退到 Node 自带样本：

```text
fixtures/upstream-production-evidence/failed-event-replay-evidence-index.sample.json
```

mini-kv 侧默认优先读取真实项目的：

```text
D:\C\mini-kv\fixtures\recovery\index.json
```

找不到时回退到：

```text
fixtures/upstream-production-evidence/mini-kv-recovery-fixtures-index.json
```

这个设计让 Node 可以在另外两个项目未启动时完成本地 smoke，也能在它们有真实 fixture 时自动使用上游证据。

## 服务层核心流程

入口函数先并行读取 v2 summary 和两份上游索引：

```ts
const [previousSummary, javaReplayEvidenceIndex, miniKvRecoveryFixtureIndex] = await Promise.all([
  loadProductionReadinessSummaryV2(config),
  readJsonEvidence(config.javaReplayEvidenceIndexFixturePath, "java"),
  readJsonEvidence(config.miniKvRecoveryFixtureIndexPath, "mini-kv"),
]);
```

然后把 v100-v102 的 Node 内部 profile 聚合进来：

```ts
return createProductionReadinessSummaryV3({
  config,
  previousSummary,
  javaReplayEvidenceIndex,
  miniKvRecoveryFixtureIndex,
  accessPolicyProfile: createAccessPolicyProfile(config),
  accessGuardReadinessProfile: createAccessGuardReadinessProfile(),
  auditStoreRuntimeProfile: createAuditStoreRuntimeProfile({ runtime: auditRuntime }),
  auditStoreEnvConfigProfile: createAuditStoreEnvConfigProfile(config),
});
```

这里的含义是：

```text
v100 -> accessPolicyProfile
v101 -> accessGuardReadinessProfile
v102 -> auditStoreRuntimeProfile
Java v47 -> replay evidence index
mini-kv v56 -> recovery fixture index
```

v103 不重新发明判断逻辑，而是把前面几个小闭环的证据放在同一个生产视角里复查。

## Java 证据检查

Java replay evidence index 的检查逻辑是：

```ts
const checks = {
  evidenceVersionMatches: readString(data, "evidenceVersion") === "failed-event-replay-evidence-index.v1",
  readOnlyIndex: readBoolean(data, "readOnly") === true,
  executionBlocked: readBoolean(data, "executionAllowed") === false,
  liveEvidenceEndpointsReadOnly: liveEvidenceEndpoints.length >= 6
    && liveEvidenceEndpoints.every((endpoint) =>
      readString(endpoint, "method") === "GET"
      && readBoolean(endpoint, "readOnly") === true
      && readBoolean(endpoint, "changesReplayState") === false),
  staticEvidenceSamplesPresent: staticEvidenceSamples.length >= 4,
};
```

这段代码要求 Java v47 证据满足：

```text
版本号稳定
索引本身只读
真实执行关闭
至少 6 个 live evidence endpoint 都是 GET 且不改变 replay state
至少 4 个 static evidence sample 可供 Node/CI 复查
```

因此 Node 可以读取 Java replay 证据，但不会因为读到了 Java evidence index 就拥有执行 replay 的权限。

## mini-kv 证据检查

mini-kv recovery fixture index 的检查逻辑是：

```ts
const checks = {
  indexVersionMatches: readString(data, "index_version") === "mini-kv-recovery-fixtures.v1",
  readOnlyIndex: readBoolean(data, "read_only") === true,
  executionBlocked: readBoolean(data, "execution_allowed") === false,
  notOrderAuthoritative: readBoolean(data, "order_authoritative") === false,
  recoveryFixturePresent: isRecord(recoveryFixture) && Object.keys(recoveryFixture).length > 0,
  recoveryFixtureValid: readString(recoveryFixture, "evidence_version") === "mini-kv-restart-recovery.v1"
    && readBoolean(recoveryFixture, "recovered") === true
    && readBoolean(recoveryFixture, "digests_match") === true,
};
```

这里重点不是让 mini-kv 参与订单一致性，而是确认它能提供恢复证据：

```text
read_only=true
execution_allowed=false
order_authoritative=false
recovered=true
digests_match=true
```

这符合三项目定位：mini-kv 是基础设施实验位，不是订单权威存储。

## 阻断与安全边界

v103 的 access-control 阻断来自这两条：

```ts
addCheckMessage(blockers, input.accessPolicyProfile.readyForEnforcement, "ACCESS_POLICY_CONTRACT_ONLY", "access-control", "access-policy-profile", "Access policy is still a contract and is not enforceable production authentication.");
addCheckMessage(blockers, input.accessGuardReadinessProfile.readyForEnforcement, "ACCESS_GUARD_DRY_RUN_ONLY", "access-control", "access-guard-readiness-profile", "Access guard still records would-deny evidence without rejecting requests.");
```

这说明 v100/v101 已经让访问控制“可解释、可评估”，但还不是生产级认证授权。

audit 阻断来自：

```ts
addCheckMessage(blockers, checks.auditStoreRuntimeDurable, "AUDIT_RUNTIME_NOT_DURABLE", "audit", "audit-store-runtime-profile", "Current runtime is not durable enough for production audit evidence.");
addCheckMessage(blockers, checks.auditStoreProductionReady, "AUDIT_PRODUCTION_STORE_NOT_READY", "audit", "audit-store-runtime-profile", "Durable audit still needs production storage, retention, rotation, and backup policy.");
```

如果本地用 `AUDIT_STORE_KIND=file`，第一条可以消失；但第二条仍然存在，因为文件型审计只是重启恢复演练，不等于生产数据库、备份、轮转和留存策略。

## 测试覆盖

测试文件是：

```text
test/productionReadinessSummaryV3.test.ts
```

默认 memory runtime 的核心断言：

```ts
expect(summary).toMatchObject({
  summaryVersion: "production-readiness-summary.v3",
  readyForProductionOperations: false,
  readOnly: true,
  executionAllowed: false,
  checks: {
    javaReplayEvidenceIndexReady: true,
    miniKvRecoveryFixtureIndexReady: true,
    accessPolicyCoverageReady: true,
    accessGuardDryRunReady: true,
    auditStoreRuntimeDurable: false,
    auditStoreProductionReady: false,
    upstreamActionsStillDisabled: true,
    executionStillBlocked: true,
  },
});
```

file runtime 的核心断言：

```ts
expect(summary.checks.auditStoreRuntimeDurable).toBe(true);
expect(summary.checks.auditStoreProductionReady).toBe(false);
expect(summary.auditEvidence).toMatchObject({
  runtimeStoreKind: "file",
  storeImplementation: "FileBackedAuditStore",
  durableAtRuntime: true,
  configuredByEnvironment: true,
});
```

这两个测试一起保证：

```text
memory 默认仍然安全但不持久
file runtime 可以作为重启恢复演练
两者都不能把 readyForProductionOperations 改成 true
```

路由测试还覆盖 JSON 和 Markdown：

```ts
expect(markdown.body).toContain("# Production readiness summary v3");
expect(markdown.body).toContain("ACCESS_GUARD_DRY_RUN_ONLY");
expect(markdown.body).toContain("AUDIT_PRODUCTION_STORE_NOT_READY");
```

这防止后续改动把人工归档视图或关键 blocker 文案弄丢。

## 一句话总结

v103 把 Java v47、mini-kv v56、Node v100-v102 的生产化证据聚合成新的只读 summary：上游观察和执行安全已经比较稳，但 access-control 仍是 dry-run，audit 仍缺生产级持久化，因此控制面继续保持 `readyForProductionOperations=false`。
