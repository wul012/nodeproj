# Node v230 managed audit manual sandbox connection preflight gate 代码讲解

## 模块角色

v230 是 `manual sandbox connection preflight gate`，不是 sandbox connection：

```text
Node v229：manual sandbox connection packet verification
Node v230：连接前 preflight gate
Java v88 + mini-kv v97：下一步推荐并行，只补 read-only echo / no-start guard marker
Node v231：等两边 marker 完成后再验证 preflight
```

本版的价值是把“连接前必须满足的人工窗口字段”结构化，尤其新增 `manualWindowFlagName`，但继续阻断真实连接、credential value、schema migration、状态写入和自动启动。

## 1. 服务入口

文件：[managedAuditManualSandboxConnectionPreflightGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPreflightGate.ts)

```ts
export function loadManagedAuditManualSandboxConnectionPreflightGate(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionPreflightGateProfile {
```

入口只接收 `AppConfig`。它没有接收 Java client、mini-kv client 或 managed audit adapter client，因此 v230 没有能力打开外部连接，也不会启动上游服务。

## 2. 消费 Node v229

文件：[managedAuditManualSandboxConnectionPreflightGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPreflightGate.ts)

```ts
const sourceVerification = loadManagedAuditManualSandboxConnectionPacketVerification({ config: input.config });
```

v230 把 v229 的 verification 状态压缩到 `sourceNodeV229`：

```ts
sourceNodeV229: {
  sourceVersion: "Node v229",
  verificationState: sourceVerification.verificationState,
  verificationDigest: sourceVerification.packetVerification.verificationDigest,
  sourcePacketDigest: sourceVerification.packetVerification.sourcePacketDigest,
  readyForPacketVerification: sourceVerification.readyForManagedAuditManualSandboxConnectionPacketVerification,
  readyForConnectionFromSource: sourceVerification.readyForManagedAuditSandboxAdapterConnection,
}
```

关键点是 `readyForConnectionFromSource=false`。v229 verification ready 只说明 packet 与两侧 marker 对齐，不说明可以连接 sandbox。

## 3. Preflight Fields

文件：[managedAuditManualSandboxConnectionPreflightGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPreflightGate.ts)

```ts
function createPreflightFields(): ManualSandboxConnectionPreflightField[] {
```

v230 固定输出 7 个字段：

```ts
field("ownerApprovalArtifactId", ..., "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID", ...)
field("credentialHandleName", ..., "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE", ...)
field("schemaRehearsalId", ..., "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID", ...)
field("rollbackPathId", ..., "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID", ...)
field("timeoutBudgetMs", ..., 15000, ...)
field("manualAbortMarker", ..., "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT", ...)
field("manualWindowFlag", ..., "ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED", ...)
```

前 6 个来自 v228/v229 已验证的 operator packet。第 7 个是本版新增的人工窗口显式开关字段名。

## 4. Manual Window Flag

文件：[managedAuditManualSandboxConnectionPreflightGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPreflightGate.ts)

```ts
manualWindowFlagName: "ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED",
manualWindowFlagRequired: true,
manualWindowOpenByDefault: false,
```

这里记录的是 flag name，不是“窗口已打开”。`manualWindowOpenByDefault=false` 是核心边界：没有后续人工确认和两侧 marker 前，Node 不会把它当成连接许可。

## 5. Preflight Gate

文件：[managedAuditManualSandboxConnectionPreflightGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPreflightGate.ts)

```ts
function createPreflightGate(
  sourceVerification: ManagedAuditManualSandboxConnectionPacketVerificationProfile,
  preflightFields: ManualSandboxConnectionPreflightField[],
): ManualSandboxConnectionPreflightGate {
```

gate 明确设置：

```ts
gateMode: "manual-sandbox-connection-preflight-gate-only",
manualReviewRequired: true,
connectionExecutionAllowed: false,
credentialValueRequired: false,
schemaMigrationExecutionAllowed: false,
managedAuditWriteAllowed: false,
nodeAutoStartAllowed: false,
```

也就是说，v230 可以生成连接前 gate，但不能把 gate 当成连接命令。

## 6. Gate Digest

文件：[managedAuditManualSandboxConnectionPreflightGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPreflightGate.ts)

```ts
gateDigest: sha256StableJson({
  profileVersion: "managed-audit-manual-sandbox-connection-preflight-gate.v1",
  sourceVerificationDigest: sourceVerification.packetVerification.verificationDigest,
  preflightFields,
  gateWithoutDigest,
}),
```

digest 把 v229 verification digest 和 v230 preflight fields 绑定起来。它不包含 credential value，不代表连接已执行。

## 7. Checks

文件：[managedAuditManualSandboxConnectionPreflightGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPreflightGate.ts)

```ts
sourceNodeV229VerificationReady: sourceVerification.readyForManagedAuditManualSandboxConnectionPacketVerification
  && sourceVerification.verificationState === "manual-sandbox-connection-packet-verification-ready",
```

v230 的 `checks` 分四层：

```text
sourceNodeV229*：v229 verification 是否 ready，且仍阻断连接
upstreamMarkersAccepted / operatorFieldsEchoedBeforeGate：v229 已验证的两侧 marker 是否有效
preflightFields*：7 个 preflight 字段是否齐
credential / schema / connection / write / autostart：危险动作是否仍为 false
```

最终 ready 仍然只是“preflight gate ready”，不是连接 ready。

## 8. 路由注册

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(
  app,
  "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate",
  () => loadManagedAuditManualSandboxConnectionPreflightGate({ config: deps.config }),
  renderManagedAuditManualSandboxConnectionPreflightGateMarkdown,
);
```

v230 延续共享路由注册方式，没有新增手写 JSON/Markdown 分支。

## 9. 测试覆盖

文件：[managedAuditManualSandboxConnectionPreflightGate.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionPreflightGate.test.ts)

测试覆盖三件事：

```text
1. 默认配置下 v230 preflight gate ready，但 sandbox connection / production audit 仍为 false。
2. UPSTREAM_ACTIONS_ENABLED=true 时阻断。
3. JSON 和 Markdown 路由都可访问。
```

这能保证 v230 是一个可归档的小闭环，同时没有把 preflight gate 误升级成真实连接。
