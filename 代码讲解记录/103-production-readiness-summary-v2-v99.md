# Node v99：production readiness summary v2 代码讲解

## 1. 本版目标与系统定位

v99 的目标不是再加一个普通报告，而是把 v96-v98 形成的生产证据统一收敛：

```text
v96: upstream production evidence intake
v97: audit store env config profile
v98: access-control readiness profile
Java v46: replay audit evidence samples
mini-kv v55: restart recovery evidence sample
```

它在三项目里的位置是：

```text
Java = 交易核心与 replay 审计证据来源
mini-kv = 存储恢复与基础设施证据来源
Node = 控制面生产就绪度分类器
```

本版仍然是只读控制面能力，不承载真实执行。

## 2. 入口路由或入口函数

入口在 `src/routes/statusRoutes.ts`：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary-v2", {
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
  const summary = await loadProductionReadinessSummaryV2(deps.config);

  if (request.query.format === "markdown") {
    reply.type("text/markdown; charset=utf-8");
    return renderProductionReadinessSummaryV2Markdown(summary);
  }

  return summary;
});
```

这个入口只接收 `format=json|markdown`，没有 request body，没有 operator，没有 idempotency key，也没有任何 POST/PUT/DELETE 语义。它的作用是读取证据并生成分类结果。

## 3. 响应模型与核心字段

核心模型在 `src/services/productionReadinessSummaryV2.ts`：

```ts
export interface ProductionReadinessSummaryV2 {
  service: "orderops-node";
  summaryVersion: "production-readiness-summary.v2";
  maturityTarget: "production-near";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  checks: {
    upstreamEvidenceIntakeValid: boolean;
    javaReplayAuditEvidenceTraceable: boolean;
    javaReplayBlockedEvidenceStillBlocked: boolean;
    miniKvRestartRecoveryEvidenceReady: boolean;
    auditStoreRuntimeProductionReady: boolean;
    auditStoreEnvConfigReady: boolean;
    accessControlProductionReady: boolean;
    executionStillBlocked: boolean;
  };
}
```

几个字段的控制面语义：

```text
readyForProductionOperations=false
 -> 即使有更多证据，Node 仍没有进入生产可执行状态。

readOnly=true
 -> 该 endpoint 只读汇总证据。

executionAllowed=false
 -> 该 endpoint 不授权 Java replay，也不授权 mini-kv 写操作。

maturityTarget=production-near
 -> 项目目标已经从展示级转向靠近生产级，但仍有硬阻塞。
```

本版把阻塞项分成四类：

```ts
export type ProductionReadinessV2CategoryId =
  | "upstream-observability"
  | "audit"
  | "access-control"
  | "execution-safety";
```

这让后续开发不再泛泛地说“还不生产级”，而是能明确知道下一版该补审计、权限、上游观测还是执行安全。

## 4. 服务层核心逻辑

入口函数 `loadProductionReadinessSummaryV2()` 先并行读取所有证据：

```ts
const [
  baseSummary,
  upstreamEvidenceIntake,
  javaReplayAuditApproved,
  javaReplayAuditBlocked,
  miniKvRestartRecovery,
] = await Promise.all([
  loadProductionReadinessSummaryIndex(config),
  loadUpstreamProductionEvidenceIntake(config),
  readJsonEvidence(config.javaReplayAuditApprovedFixturePath, "java"),
  readJsonEvidence(config.javaReplayAuditBlockedFixturePath, "java"),
  readJsonEvidence(config.miniKvRestartRecoveryEvidenceFixturePath, "mini-kv"),
]);
```

这里的设计点是：Node 不启动 Java，也不启动 mini-kv，只读取已经存在的稳定证据文件。这样 GitHub CI 可以用 Node 仓库里的 fixture，本机联调可以优先读兄弟仓库里的真实样本。

配置入口在 `src/config.ts`：

```ts
javaReplayAuditApprovedFixturePath: readString(
  env,
  "JAVA_REPLAY_AUDIT_APPROVED_FIXTURE_PATH",
  defaultJavaReplayAuditApprovedFixturePath(),
),
javaReplayAuditBlockedFixturePath: readString(
  env,
  "JAVA_REPLAY_AUDIT_BLOCKED_FIXTURE_PATH",
  defaultJavaReplayAuditBlockedFixturePath(),
),
miniKvRestartRecoveryEvidenceFixturePath: readString(
  env,
  "MINIKV_RESTART_RECOVERY_EVIDENCE_FIXTURE_PATH",
  defaultMiniKvRestartRecoveryEvidenceFixturePath(),
),
```

Java approved 样本校验的是“真实执行如果发生，是否可追溯”：

```ts
function isJavaApprovedAuditTraceable(
  source: EvidenceSource,
  approved: Record<string, unknown>,
  auditTrail: Record<string, unknown>[],
): boolean {
  return source.status === "available"
    && readString(approved, "auditEvidenceVersion") === "failed-event-replay-audit-evidence.v1"
    && readString(approved, "scenario") === "APPROVED_REPLAY_AUDIT"
    && readString(approved, "requestId") !== undefined
    && readString(approved, "decisionId") !== undefined
    && readString(readRecord(approved, "operator"), "operatorId") !== undefined
    && readString(readRecord(approved, "approval"), "approvalStatus") === "APPROVED"
    && readString(readRecord(approved, "execution"), "attemptStatus") === "SUCCEEDED"
    && auditTrail.length >= 3;
}
```

注意这里不是让 Node 去执行 replay，而是确认 Java v46 的样本具备 `operatorId`、`requestId`、`decisionId`、`auditTrail` 等追溯字段。

Java blocked 样本校验的是“未审批时必须保持阻断”：

```ts
function isJavaBlockedAuditStillBlocked(
  source: EvidenceSource,
  blocked: Record<string, unknown>,
  blockedBy: string[],
): boolean {
  return source.status === "available"
    && readString(blocked, "scenario") === "BLOCKED_REPLAY_AUDIT"
    && readBoolean(blocked, "dryRun") === true
    && readBoolean(blocked, "executionAllowed") === false
    && readString(readRecord(blocked, "execution"), "attemptStatus") === "NOT_ATTEMPTED"
    && blockedBy.includes("REPLAY_APPROVAL_NOT_APPROVED");
}
```

mini-kv v55 的恢复证据校验的是“它可以证明恢复能力，但不是订单权威存储”：

```ts
function isMiniKvRecoveryReady(source: EvidenceSource, recovery: Record<string, unknown>): boolean {
  return source.status === "available"
    && readString(recovery, "evidence_version") === "mini-kv-restart-recovery.v1"
    && readBoolean(recovery, "read_only") === true
    && readBoolean(recovery, "execution_allowed") === false
    && readBoolean(recovery, "recovered") === true
    && readBoolean(recovery, "digests_match") === true
    && readBoolean(readRecord(recovery, "diagnostics"), "order_authoritative") === false
    && readBoolean(readRecord(recovery, "diagnostics"), "write_commands_executed_by_evidence") === false;
}
```

最后 `createCategories()` 把这些判断落到四类：

```ts
{
  id: "upstream-observability",
  ready: checks.upstreamEvidenceIntakeValid
    && checks.javaReplayAuditEvidenceTraceable
    && checks.javaReplayBlockedEvidenceStillBlocked
    && checks.miniKvRestartRecoveryEvidenceReady,
  readOnly: true,
  executionAllowed: false,
}
```

v99 的结果是 upstream-observability 可以 ready，但 audit 和 access-control 仍然不 ready。

## 5. 阻断、预警与安全边界

阻断项来自三个来源：

```ts
...input.auditStoreRuntimeProfile.productionBlockers.map(...)
...input.auditStoreEnvConfigProfile.productionBlockers.map(...)
...input.accessControlReadinessProfile.productionBlockers.map(...)
```

这意味着：

```text
audit 阻塞：运行时仍是 in-memory，缺数据库/持久化/保留策略。
access-control 阻塞：缺认证、RBAC、operator identity、审计读取保护、mutation route 保护。
execution-safety：继续要求 UPSTREAM_ACTIONS_ENABLED=false。
```

本版明确不做：

```text
不执行 Java replay POST
不执行 mini-kv 写命令
不启用 UPSTREAM_ACTIONS_ENABLED
不连接数据库
不引入真实登录系统
不把 readyForProductionOperations 改成 true
```

## 6. 测试覆盖

测试文件是 `test/productionReadinessSummaryV2.test.ts`。

第一个测试确认 v99 的核心分类：

```ts
expect(summary.categories.map((category) => category.id)).toEqual([
  "upstream-observability",
  "audit",
  "access-control",
  "execution-safety",
]);
expect(summary.categories.find((category) => category.id === "upstream-observability")).toMatchObject({
  ready: true,
  blockerCount: 0,
});
expect(summary.categories.find((category) => category.id === "audit")).toMatchObject({
  ready: false,
});
expect(summary.categories.find((category) => category.id === "access-control")).toMatchObject({
  ready: false,
});
```

第二个测试确认路由同时支持 JSON 和 Markdown：

```ts
const json = await app.inject({
  method: "GET",
  url: "/api/v1/production/readiness-summary-v2",
});
const markdown = await app.inject({
  method: "GET",
  url: "/api/v1/production/readiness-summary-v2?format=markdown",
});
```

这些断言防住的回归是：

```text
1. v99 不能因为有 Java/mini-kv 新证据就误判 production-ready。
2. upstream evidence ready 只代表只读证据完整，不代表能执行。
3. audit/access-control 必须持续出现在 production blockers。
4. Markdown 归档入口必须可用。
```

## 7. 一句话总结

v99 把 Node 生产化判断推进到“分类收敛”阶段：上游证据已经能支撑生产化说明，但真正靠近生产级的下一步必须开始补 durable audit 和 access-control，而不是继续堆只读报告。
