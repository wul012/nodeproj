# 第一百零七版代码讲解：production readiness summary v4

本版目标是把前几版分散的生产化证据合成一个新的只读判断入口。

它不是生产放行接口，不会执行 Java replay，不会写 mini-kv，也不会把 file audit 当成生产最终审计库。它的角色是回答一个更接近生产的问题：

```text
Java 上游 operator/auth 边界是否明确？
mini-kv 恢复证据和 retention 边界是否明确？
Node 自己的 access guard、operator identity、file audit restart evidence 是否能串起来？
如果这些都能串起来，离真正生产执行还差什么？
```

## 本版所处项目进度

v104 已经把 access guard dry-run 结果写入审计事件。

v105 已经把 header-derived operator identity 固化为 contract。

v106 已经验证 file audit runtime 能把带 `accessGuard` 和 `operatorIdentity` 的合成事件重启恢复出来。

v107 在这些基础上新增 `production readiness summary v4`。它把 Node 自身证据和上游两个项目的最新证据放到同一张生产阻塞表里：

```text
Java v48：operator auth boundary
mini-kv v57：recovery retention boundary
Node v104：access guard audit context
Node v105：operator identity contract
Node v106：file audit restart evidence
```

成熟度变化是：项目从“分别证明各个生产雏形能力存在”，推进到“能统一判断这些能力是否足以解除生产阻塞”。结论仍然是否定的，所以本版继续保持 `readyForProductionOperations=false`。

## HTTP 入口

本版在状态路由里新增 v4 入口：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary-v4", {
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
  const summary = await loadProductionReadinessSummaryV4(deps.config);

  if (request.query.format === "markdown") {
    reply.type("text/markdown; charset=utf-8");
    return renderProductionReadinessSummaryV4Markdown(summary);
  }

  return summary;
});
```

文件位置：

```text
src/routes/statusRoutes.ts
```

这里仍然是 `GET`，并且只根据 `format=json|markdown` 返回不同展示形式。它不会接收执行参数，也不会触发上游写操作。

## 聚合入口

核心聚合函数是：

```ts
export async function loadProductionReadinessSummaryV4(config: AppConfig): Promise<ProductionReadinessSummaryV4> {
  const [previousSummary, javaReplayEvidenceIndex, miniKvRecoveryFixtureIndex] = await Promise.all([
    loadProductionReadinessSummaryV3(config),
    readJsonEvidence(config.javaReplayEvidenceIndexFixturePath, "java"),
    readJsonEvidence(config.miniKvRecoveryFixtureIndexPath, "mini-kv"),
  ]);
  const runtime = describeAuditStoreRuntime(config);

  return createProductionReadinessSummaryV4({
    config,
    previousSummary,
    javaReplayEvidenceIndex,
    miniKvRecoveryFixtureIndex,
    accessGuardReadinessProfile: createAccessGuardReadinessProfile(),
    accessGuardAuditSample: evaluateAccessGuard({
      method: "GET",
      path: "/api/v1/audit/events",
      headers: {
        "x-orderops-operator-id": "audit-v107",
        "x-orderops-roles": "auditor",
      },
    }),
    operatorIdentityContract: createOperatorIdentityContractProfile(),
    fileAuditRestartEvidence: createFileAuditRestartEvidenceReport({ config, runtime }),
  });
}
```

文件位置：

```text
src/services/productionReadinessSummaryV4.ts
```

这段代码有三层含义。

第一层，v4 不抛弃 v3，而是先加载 `loadProductionReadinessSummaryV3(config)`。这样 v107 是在既有生产 readiness 判断上继续叠加，不是另起一套互相割裂的判断。

第二层，上游项目只作为证据输入读取：

```ts
readJsonEvidence(config.javaReplayEvidenceIndexFixturePath, "java")
readJsonEvidence(config.miniKvRecoveryFixtureIndexPath, "mini-kv")
```

这符合当前三项目边界：Node 消费 Java / mini-kv 的只读 evidence，不直接启动、不构建、不修改它们。

第三层，Node 自己的三块证据被放在同一个返回对象里：

```text
accessGuardReadinessProfile
operatorIdentityContract
fileAuditRestartEvidence
```

这也是 v107 的核心价值：把访问控制、身份、审计恢复从三个报告合成一个生产判断。

## Java operator auth boundary

v107 对 Java evidence index 的要求升级到了 v2：

```ts
const checks = {
  evidenceVersionMatches: evidenceVersion === "failed-event-replay-evidence-index.v2",
  readOnlyIndex: readBoolean(data, "readOnly") === true,
  executionBlocked: readBoolean(data, "executionAllowed") === false,
  identitySourceDeclared: readString(boundary, "identitySource") === "HEADER_DERIVED_OPERATOR_CONTEXT",
  requiredHeadersPresent: ["X-Operator-Id", "X-Operator-Role"].every((header) => requiredHeaders.includes(header)),
  anonymousBlocked: readBoolean(boundary, "anonymousAllowed") === false,
  credentialsNotAuthenticatedByJava: readBoolean(boundary, "javaAuthenticatesCredentials") === false,
  enforcementModeDeclared: readString(boundary, "enforcementMode") === "ROLE_POLICY_PRECHECK_AND_SERVICE_GATE",
  globalRolesDeclared: globalAllowedRoles.length >= 3,
  productionAuthGapsDeclared: productionAuthGaps.length >= 3,
  operatorSafetyRulesPresent: [
    "OPERATOR_HEADERS_ARE_REQUIRED_BUT_NOT_CREDENTIAL_AUTHENTICATION",
    "UPSTREAM_MUST_PREVENT_X_OPERATOR_HEADER_SPOOFING",
  ].every((rule) => executionSafetyRules.includes(rule)),
};
```

这里重点不是说 Java 已经完成真实认证，而是明确 Java 当前的边界：

```text
X-Operator-Id / X-Operator-Role 是 operator context
Java 会做角色预检和服务层 gate
Java 不验证 JWT / session / IdP 签名
上游控制面或网关必须防止 header spoofing
```

所以 v107 把 Java evidence 识别为上游边界证据 ready，但仍然追加生产阻塞：

```ts
blockers.push({
  category: "access-control",
  code: "JAVA_HEADER_AUTH_REHEARSAL_ONLY",
  severity: "blocker",
  source: "java-operator-auth-boundary",
  message: `Java declares ${javaOperatorAuthBoundary.productionAuthGaps.length} production auth gaps; Node must still treat header identity as rehearsal evidence.`,
});
```

这条 blocker 很关键：Java v48 越清楚地说明自己不做真实 credential auth，Node 越不能误以为可以开放生产执行。

## mini-kv recovery retention boundary

mini-kv v57 的 evidence index 也被 v107 消费：

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
  restartReplayCostDeclared: readString(restartReplayCost, "cost_model") === "sample_record_count"
    && readBoolean(restartReplayCost, "measured_in_fixture_only") === true,
  retentionBoundaryDeclared: readBoolean(retentionBoundary, "fixture_sample_only") === true
    && readString(retentionBoundary, "operator_action_required") !== undefined,
  retentionPolicyNotDefined: readString(retentionBoundary, "production_retention_policy") === "not_defined",
  valuesNotRetainedInIndex: readBoolean(retentionBoundary, "values_retained_in_index") === false,
  consumerHintTargetsNodeV107: (readString(recoveryFixture, "consumer_hint") ?? "").includes("Node v107"),
};
```

这段逻辑把 mini-kv 证据拆成两类：

```text
恢复证据 ready：recovered=true、digests_match=true、restart_replay_cost 存在
生产边界仍阻塞：production_retention_policy=not_defined
```

所以 v107 会继续产生：

```ts
if (miniKvRecoveryBoundary.retentionBoundary.productionRetentionPolicy === "not_defined") {
  blockers.push({
    category: "audit",
    code: "MINIKV_RETENTION_POLICY_NOT_DEFINED",
    severity: "blocker",
    source: "mini-kv-recovery-fixture-index",
    message: "mini-kv recovery evidence explicitly marks retention policy as not defined, so it is not production storage evidence.",
  });
}
```

这符合 mini-kv 的定位：它是 Redis-like 基础设施实验位，可以给 Node 提供恢复和边界证据，但不能被包装成订单权威存储或生产审计存储。

## Node access guard audit context

v107 会主动构造一个访问审计样本：

```ts
accessGuardAuditSample: evaluateAccessGuard({
  method: "GET",
  path: "/api/v1/audit/events",
  headers: {
    "x-orderops-operator-id": "audit-v107",
    "x-orderops-roles": "auditor",
  },
}),
```

这个样本走的是已有 access guard 策略。它验证 `/api/v1/audit/events` 这种 audit 路由，在 `auditor` 角色下能得到：

```text
policyMatched=true
routeGroup=audit
requiredRole=auditor
wouldDeny=false
reason=allowed_by_role
```

汇总对象里保留这份样本：

```ts
auditSample: {
  method: "GET",
  path: "/api/v1/audit/events",
  policyMatched: sample.policyMatched,
  routeGroup: sample.routeGroup,
  requiredRole: sample.requiredRole,
  matchedRoles: sample.matchedRoles,
  wouldDeny: sample.wouldDeny,
  reason: sample.reason,
  operatorId: sample.requestIdentity.operatorId,
},
```

这样 v107 不只是说“access guard 存在”，而是给出一个具体路由、具体角色、具体判断结果。

## file audit restart evidence

v106 的 file audit restart evidence 在 v107 里变成 durable coverage 的来源：

```ts
durableCoverageReady: fileAuditRestartEvidence.checks.fileRuntimeSelected
  && fileAuditRestartEvidence.checks.restoredEventPresent
  && fileAuditRestartEvidence.checks.digestStableAfterRestore,
```

这表示：如果当前配置选择 file audit runtime，并且合成事件能被恢复，且恢复前后 digest 稳定，那么 access/operator audit evidence 至少在本地文件运行时具备重启恢复证明。

但 v107 仍然不会把它说成生产审计：

```ts
readyForProductionOperations: false,
readOnly: true,
executionAllowed: false,
```

原因是 v106 自己的 blocker 还会继续传递进 v107：

```text
MANAGED_AUDIT_STORE_MISSING
AUDIT_RETENTION_POLICY_MISSING
```

也就是说，file audit 是生产雏形证据，不是生产最终能力。

## 总体检查项

v107 的顶层检查项集中在 `checks` 字段：

```ts
const checks = {
  previousSummaryAvailable: input.previousSummary.summaryVersion === "production-readiness-summary.v3",
  javaOperatorAuthBoundaryReady: javaOperatorAuthBoundaryReady(javaOperatorAuthBoundary),
  miniKvRecoveryBoundaryReady: miniKvRecoveryBoundaryReady(miniKvRecoveryBoundary),
  accessGuardAuditContextReady: accessGuardAuditContext.readinessChecksPass
    && accessGuardAuditContext.auditSample.policyMatched
    && !accessGuardAuditContext.auditSample.wouldDeny,
  operatorIdentityCoverageReady: Object.values(operatorIdentityContract.checks).every(Boolean),
  fileAuditRestartEvidenceReady: fileAuditRestartEvidence.checks.fileRuntimeSelected
    && fileAuditRestartEvidence.checks.filePathConfigured
    && fileAuditRestartEvidence.checks.syntheticWriteRecorded
    && fileAuditRestartEvidence.checks.restoredEventPresent
    && fileAuditRestartEvidence.checks.digestStableAfterRestore,
  accessEvidenceDurableCoverage: accessGuardAuditContext.durableCoverageReady,
  upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
  executionStillBlocked: input.previousSummary.checks.executionStillBlocked
    && input.config.upstreamActionsEnabled === false,
  productionBlockersRemain: false,
};
```

这里能看出 v107 的判断方式：

```text
上游边界证据要 ready
Node access/operator/audit evidence 要能串起来
真实执行仍必须 blocked
只要 productionBlockers 还存在，就不能放行生产操作
```

## 分类结果

v107 继续用 category 组织生产判断：

```ts
export type ProductionReadinessV4CategoryId =
  | "upstream-boundary-evidence"
  | "access-control"
  | "audit"
  | "execution-safety";
```

其中 `upstream-boundary-evidence` 和 `execution-safety` 可以 ready，因为它们表示：

```text
上游 evidence 可读
真实执行仍被关住
```

但 `access-control` 和 `audit` 不能 ready，因为：

```text
真实 auth/RBAC enforcement 未完成
managed audit store / retention / backup policy 未完成
```

这也是本版成熟度判断最重要的地方：证据链成熟度提高，不等于生产执行能力解锁。

## 测试覆盖

新增测试文件：

```text
test/productionReadinessSummaryV4.test.ts
```

第一组测试验证 file runtime 下 v4 汇总成功：

```ts
expect(summary).toMatchObject({
  service: "orderops-node",
  summaryVersion: "production-readiness-summary.v4",
  maturityTarget: "production-near",
  readyForProductionOperations: false,
  readOnly: true,
  executionAllowed: false,
  checks: {
    previousSummaryAvailable: true,
    javaOperatorAuthBoundaryReady: true,
    miniKvRecoveryBoundaryReady: true,
    accessGuardAuditContextReady: true,
    operatorIdentityCoverageReady: true,
    fileAuditRestartEvidenceReady: true,
    accessEvidenceDurableCoverage: true,
    upstreamActionsStillDisabled: true,
    executionStillBlocked: true,
    productionBlockersRemain: true,
  },
});
```

第二组测试验证 memory runtime 下不会误判 durable evidence：

```ts
expect(summary.checks.fileAuditRestartEvidenceReady).toBe(false);
expect(summary.checks.accessEvidenceDurableCoverage).toBe(false);
expect(summary.nodeEvidence.fileAuditRestartEvidence).toMatchObject({
  runtimeStoreKind: "memory",
  durableAtRuntime: false,
  recoveryVerified: false,
});
```

第三组测试覆盖 JSON 和 Markdown 路由：

```ts
const json = await app.inject({
  method: "GET",
  url: "/api/v1/production/readiness-summary-v4",
});
const markdown = await app.inject({
  method: "GET",
  url: "/api/v1/production/readiness-summary-v4?format=markdown",
});
```

核心断言包括：

```ts
expect(markdown.body).toContain("# Production readiness summary v4");
expect(markdown.body).toContain("JAVA_HEADER_AUTH_REHEARSAL_ONLY");
expect(markdown.body).toContain("MINIKV_RETENTION_POLICY_NOT_DEFINED");
```

这保证 v107 不只返回 JSON，也能作为人工复查报告阅读。

## 运行调试与归档

本版运行了：

```text
npm run typecheck
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

运行归档按新规则写入：

```text
b/107/图片/production-readiness-summary-v4-viewport.png
b/107/解释/运行调试说明.md
```

测试结果：

```text
56 个测试文件通过
211 条测试通过
```

HTTP smoke 的关键结果：

```text
summaryVersion=production-readiness-summary.v4
javaReady=true
miniKvReady=true
accessDurable=true
fileAuditReady=true
readyForProductionOperations=false
executionAllowed=false
```

## 一句话总结

v107 把 Java operator/auth 边界、mini-kv recovery/retention 边界、Node access guard / operator identity / file audit restart evidence 汇总成 production readiness summary v4，证明生产雏形证据链更完整了，但也明确说明真实 auth、RBAC enforcement、managed audit store 仍是生产级放行前的硬阻塞。
