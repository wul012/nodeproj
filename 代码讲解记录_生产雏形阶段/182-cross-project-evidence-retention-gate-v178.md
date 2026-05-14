# 182-cross-project-evidence-retention-gate-v178

## 版本定位

Node v178 是 `cross-project evidence retention gate`。它接在三方证据之后：

```text
Node v177：CI operator identity evidence packet
Java v63：release audit retention fixture
mini-kv v72：restore evidence retention fixture
```

本版目标不是生产发布，而是回答：

```text
谁触发了验证？
Java 发布证据准备如何保留？
mini-kv 恢复证据准备如何保留？
这些证据是否仍然不能触发真实执行？
```

## 核心入口

实现文件：

```text
src/services/crossProjectEvidenceRetentionGate.ts
```

入口函数：

```ts
export function loadCrossProjectEvidenceRetentionGate(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): CrossProjectEvidenceRetentionGateProfile {
  const identityPacket = loadCiOperatorIdentityEvidencePacket(config, headers);
  const retentionGateSteps = createRetentionGateSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(
    config,
    identityPacket,
    retentionGateSteps,
    forbiddenOperations,
    pauseConditions,
  );
}
```

这段代码的依赖关系很克制：

```text
v177 identity packet
    +
Java v63 static reference
    +
mini-kv v72 static reference
    ->
v178 retention gate
```

它不读取 Java 仓库、不启动 mini-kv，也不访问生产环境。

## Java v63 引用

Java 侧被固化为：

```ts
const JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE: JavaReleaseAuditRetentionFixtureReference = {
  plannedVersion: "Java v63",
  fixtureVersion: "java-release-audit-retention-fixture.v1",
  fixtureEndpoint: "/contracts/release-audit-retention.fixture.json",
  retentionRecord: {
    retentionId: "release-retention-record-placeholder",
    releaseOperator: "release-operator-placeholder",
    artifactTarget: "release-tag-or-artifact-version-placeholder",
    retentionDays: 180,
    operatorMustReplacePlaceholders: true,
    retentionStatus: "PENDING_EVIDENCE_ARCHIVE_CONFIRMATION",
  },
}
```

这里重点不是“真实保留文件已经存在”，而是 Java v63 已经把保留记录的形状固定下来：

```text
retention id
release operator
artifact target
retention days
audit export fields
no-secret boundary
```

Node v178 只消费这些字段，不写 audit export：

```ts
nodeMayRenderRetentionGate: true,
nodeMayTriggerDeployment: false,
nodeMayTriggerRollback: false,
nodeMayExecuteRollbackSql: false,
nodeMayWriteAuditExport: false,
nodeMayReadSecretValues: false,
```

## mini-kv v72 引用

mini-kv 侧被固化为：

```ts
const MINI_KV_V72_RESTORE_EVIDENCE_RETENTION: MiniKvRestoreEvidenceRetentionReference = {
  plannedVersion: "mini-kv v72",
  retentionVersion: "mini-kv-restore-evidence-retention.v1",
  projectVersion: "0.72.0",
  retentionTarget: {
    retentionId: "mini-kv-restore-retention-v72",
    artifactDigestPlaceholder: "sha256:<operator-retained-restore-artifact-digest>",
    snapshotReviewRetention: "sha256:<operator-retained-snapshot-review-digest>",
    walReviewRetention: "sha256:<operator-retained-wal-review-digest>",
    retentionDays: 90,
  },
}
```

mini-kv v72 的关键是 CHECKJSON 风险证据保留：

```ts
commands: [
  "INFOJSON",
  "CHECKJSON LOAD data/retention-restore.snap",
  "CHECKJSON COMPACT",
  "CHECKJSON SETNXEX restore:retention-token 30 value",
  "STORAGEJSON",
  "HEALTH",
  "GET restore:retention-token",
  "QUIT",
],
writeCommandsExecuted: false,
adminCommandsExecuted: false,
retentionGateInput: true,
```

这说明 mini-kv 只解释 LOAD / COMPACT / SETNXEX 的风险，不真的执行恢复或写入 token。

## Gate Digest

v178 生成自己的 gate digest：

```ts
const gateDigest = digestGate({
  profileVersion: "cross-project-evidence-retention-gate.v1",
  sourceNodeIdentityPacketDigest: identityPacket.packet.packetDigest,
  javaFixtureVersion: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.fixtureVersion,
  javaRetentionId: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.retentionId,
  miniKvRetentionVersion: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionVersion,
  miniKvRetentionId: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.retentionId,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  checks: {
    ...checks,
    gateDigestValid: undefined,
    readyForCrossProjectEvidenceRetentionGate: undefined,
  },
});
```

digest 覆盖：

```text
Node v177 identity digest
Java v63 retention fixture version / retention id
mini-kv v72 retention version / retention id
upstream action flag
```

这让后续 Node v179 pre-approval packet 可以引用 v178 的 gate digest。

## 关键检查

`createChecks()` 是本版核心：

```ts
nodeV177IdentityEvidenceReady
javaV63RetentionFixtureReady
javaRetentionRecordComplete
javaAuditExportFieldsComplete
javaNodeConsumptionReadOnly
javaProductionBoundariesClosed
miniKvV72RetentionFixtureReady
miniKvRetentionTargetComplete
miniKvRetainedEvidenceComplete
miniKvCheckJsonRiskEvidenceRetained
miniKvWriteAndAdminCommandsNotExecuted
miniKvBoundariesClosed
retentionGateStepsReadOnly
upstreamActionsStillDisabled
noProductionSecretRead
noProductionDatabaseConnection
noProductionIdpConnection
```

这些检查统一保护一个边界：

```text
retention gate 只能证明证据形状完整，不能变成执行入口。
```

## 路由接入

路由在：

```text
src/routes/statusRoutes.ts
```

新增：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/cross-project-evidence-retention-gate", {
  schema: {
    querystring: fixtureReportQuerySchema,
  },
}, async (request, reply) => {
  const profile = loadCrossProjectEvidenceRetentionGate(deps.config, request.headers);

  if (request.query.format === "markdown") {
    reply.type("text/markdown; charset=utf-8");
    return renderCrossProjectEvidenceRetentionGateMarkdown(profile);
  }

  return profile;
});
```

这里和 v177 一样没有用通用 route helper，因为 v178 需要把当前请求里的 operator header 传给 v177 identity packet。

## 测试覆盖

测试文件：

```text
test/crossProjectEvidenceRetentionGate.test.ts
```

覆盖四类：

1. 正常 operator headers 下，v178 gate ready。
2. 缺少 operator headers 时，gate blocked。
3. `UPSTREAM_ACTIONS_ENABLED=true` 时，gate blocked。
4. JSON / Markdown route 都能返回。

正常路径断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "cross-project-evidence-retention-gate.v1",
  gateState: "ready-for-cross-project-evidence-retention-review",
  readyForCrossProjectEvidenceRetentionGate: true,
  readyForProductionRelease: false,
  readyForProductionRestore: false,
  executionAllowed: false,
});
```

缺身份路径断言：

```ts
expect(profile.gateState).toBe("blocked");
expect(profile.checks.nodeV177IdentityEvidenceReady).toBe(false);
```

这能防止 v178 在没有操作人证据时错误放行。

## 本版价值

v178 把三个项目的证据第一次收成同一个 retention gate：

```text
Node：谁触发验证
Java：发布证据如何保留
mini-kv：恢复证据如何保留
```

但它仍然明确：

```text
readyForProductionRelease=false
readyForProductionDeployment=false
readyForProductionRollback=false
readyForProductionRestore=false
executionAllowed=false
```

这正是靠近生产级需要的节奏：先把证据、身份、保留和禁止项做扎实，再讨论 pre-approval。
