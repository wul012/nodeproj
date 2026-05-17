# Node v228 managed audit manual sandbox connection operator packet 代码讲解

## 模块角色

v228 是 manual sandbox connection operator packet，不是 sandbox connection：

```text
Node v227：manual sandbox connection evidence checklist
Node v228：把 v227 checklist 转成手工窗口 operator packet
Java v87 + mini-kv v96：下一步推荐并行，只补 handoff / receipt marker
Node v229：等两边 marker 完成后再验证 packet
```

本版的价值是把人工窗口所需字段结构化，同时继续阻断真实连接、credential value、schema migration 和状态写入。

## 1. 服务入口

文件：[managedAuditManualSandboxConnectionOperatorPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionOperatorPacket.ts)

```ts
export function loadManagedAuditManualSandboxConnectionOperatorPacket(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionOperatorPacketProfile {
```

入口只接收 `AppConfig`，不接 Java client、mini-kv client 或 managed audit adapter client。因此 v228 没有能力打开外部连接，也不会启动上游服务。

## 2. 消费 Node v227

文件：[managedAuditManualSandboxConnectionOperatorPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionOperatorPacket.ts)

```ts
const sourceChecklist = loadManagedAuditManualSandboxConnectionEvidenceChecklist({ config: input.config });
```

v228 把 v227 的 checklist 状态压缩到 `sourceNodeV227`：

```ts
sourceNodeV227: {
  sourceVersion: "Node v227",
  profileVersion: sourceChecklist.profileVersion,
  checklistState: sourceChecklist.checklistState,
  checklistDigest: sourceChecklist.verification.checklistDigest,
  readyForChecklist: sourceChecklist.readyForManagedAuditManualSandboxConnectionEvidenceChecklist,
  readyForConnectionFromSource: sourceChecklist.readyForManagedAuditSandboxAdapterConnection,
}
```

关键点是 `readyForConnectionFromSource=false`。v227 checklist ready 只说明证据材料齐，不说明可以连接。

## 3. operatorFields

文件：[managedAuditManualSandboxConnectionOperatorPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionOperatorPacket.ts)

```ts
function createOperatorFields(): ManualSandboxOperatorPacketField[] {
```

v228 固定输出 6 个字段：

```ts
field("ownerApprovalArtifactId", ..., "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID", ...)
field("credentialHandleName", ..., "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE", ...)
field("schemaRehearsalId", ..., "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID", ...)
field("rollbackPathId", ..., "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID", ...)
field("timeoutBudgetMs", ..., 15000, ...)
field("manualAbortMarker", ..., "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT", ...)
```

这些是字段名、句柄名、文档 id 或预算值，不是 secret。`mustNotContain` 明确禁止：

```ts
["credential value", "secret value", "connection string", "private key"]
```

## 4. operatorPacket

文件：[managedAuditManualSandboxConnectionOperatorPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionOperatorPacket.ts)

```ts
function createOperatorPacket(
  sourceChecklist: ManagedAuditManualSandboxConnectionEvidenceChecklistProfile,
  operatorFields: ManualSandboxOperatorPacketField[],
): ManualSandboxOperatorPacket {
```

packet 明确设置：

```ts
packetMode: "manual-sandbox-connection-operator-packet-only",
manualReviewRequired: true,
connectionExecutionAllowed: false,
credentialValueRequired: false,
schemaMigrationExecutionAllowed: false,
managedAuditWriteAllowed: false,
nodeAutoStartAllowed: false,
```

也就是说，v228 可以生成给人工窗口看的 packet，但不能把 packet 当成连接命令。

## 5. packetDigest

文件：[managedAuditManualSandboxConnectionOperatorPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionOperatorPacket.ts)

```ts
packetDigest: sha256StableJson({
  profileVersion: "managed-audit-manual-sandbox-connection-operator-packet.v1",
  sourceChecklistDigest: sourceChecklist.verification.checklistDigest,
  operatorFields,
  packetWithoutDigest,
}),
```

digest 把 v227 checklist digest 和 v228 operator fields 绑定起来。它不包含 credential value，不代表连接已执行。

## 6. checks

文件：[managedAuditManualSandboxConnectionOperatorPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionOperatorPacket.ts)

```ts
sourceChecklistReady: sourceChecklist.readyForManagedAuditManualSandboxConnectionEvidenceChecklist
  && sourceChecklist.checklistState === "manual-sandbox-connection-evidence-checklist-ready",
sourceChecklistStillConnectionBlocked: !sourceChecklist.readyForManagedAuditSandboxAdapterConnection
  && !sourceChecklist.connectsManagedAudit
  && !sourceChecklist.readsManagedAuditCredential
  && !sourceChecklist.schemaMigrationExecuted,
```

v228 的 checks 重点是：v227 source 必须 ready，但连接仍必须 blocked。

```ts
credentialValueStillForbidden: !operatorPacket.credentialValueRequired,
schemaMigrationStillBlocked: !operatorPacket.schemaMigrationExecutionAllowed,
externalConnectionStillBlocked: !operatorPacket.connectionExecutionAllowed,
managedAuditWritesStillBlocked: !operatorPacket.managedAuditWriteAllowed,
automaticServiceStartStillBlocked: !operatorPacket.nodeAutoStartAllowed,
```

## 7. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet", () => loadManagedAuditManualSandboxConnectionOperatorPacket({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionOperatorPacketMarkdown);
```

本版继续使用共享 `registerAuditJsonMarkdownRoute`，没有新增手写 JSON/Markdown 路由分支。

## 8. 测试覆盖

文件：[managedAuditManualSandboxConnectionOperatorPacket.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionOperatorPacket.test.ts)

```ts
expect(profile).toMatchObject({
  packetState: "manual-sandbox-connection-operator-packet-ready",
  readyForManagedAuditSandboxAdapterConnection: false,
  connectsManagedAudit: false,
  readsManagedAuditCredential: false,
});
```

测试覆盖：

```text
默认配置：v228 operator packet ready，但 connection/production 仍 blocked
UPSTREAM_ACTIONS_ENABLED=true：packet blocked
JSON / Markdown route：v228 接口可用
```

## 本版项目进度

v228 完成后，managed audit 主线进入：

```text
manual sandbox connection evidence checklist
 -> manual sandbox connection operator packet
```

下一步按全局计划是：

```text
推荐并行 Java v87 + mini-kv v96
```

Node v229 必须等两边 marker 完成后再继续。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts + test/managedAuditManualSandboxConnectionOperatorPacket.test.ts，6 tests 已通过
全量测试：npx vitest run --pool=threads --maxWorkers=4，170 files / 577 tests 已通过
npm run build：已通过
Chrome screenshot：c/228/图片/managed-audit-manual-sandbox-connection-operator-packet-v228.png 已生成
Node HTTP smoke：安全环境变量下通过，PID 18876 已停止
```
