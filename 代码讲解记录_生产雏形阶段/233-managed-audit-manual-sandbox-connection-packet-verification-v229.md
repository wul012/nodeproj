# Node v229 managed audit manual sandbox connection packet verification 代码讲解

## 模块角色

v229 是 `manual sandbox connection packet verification`，不是 sandbox connection：

```text
Node v228：manual sandbox connection operator packet
Java v87 + mini-kv v96：只读 handoff / receipt marker
Node v229：验证 packet 与两侧 marker 对齐
Node v230：下一步才做 preflight gate，仍不是连接
```

本版的价值是把“人工 sandbox 连接前的 operator packet”与 Java、mini-kv 两侧只读证据对齐，同时继续阻断真实连接、credential value、schema migration 和状态写入。

## 1. 服务入口

文件：[managedAuditManualSandboxConnectionPacketVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPacketVerification.ts)

```ts
export function loadManagedAuditManualSandboxConnectionPacketVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionPacketVerificationProfile {
```

入口只接收 `AppConfig`。它没有接收 Java client、mini-kv client 或 managed audit adapter client，因此 v229 没有能力打开外部连接，也不会启动上游服务。

## 2. 消费 Node v228

文件：[managedAuditManualSandboxConnectionPacketVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPacketVerification.ts)

```ts
const sourcePacket = loadManagedAuditManualSandboxConnectionOperatorPacket({ config: input.config });
```

v229 把 v228 的 operator packet 压缩到 `sourceNodeV228`：

```ts
sourceNodeV228: {
  sourceVersion: "Node v228",
  profileVersion: sourcePacket.profileVersion,
  packetState: sourcePacket.packetState,
  packetDigest: sourcePacket.operatorPacket.packetDigest,
  sourceChecklistDigest: sourcePacket.operatorPacket.sourceChecklistDigest,
  readyForOperatorPacket: sourcePacket.readyForManagedAuditManualSandboxConnectionOperatorPacket,
  readyForConnectionFromSource: sourcePacket.readyForManagedAuditSandboxAdapterConnection,
}
```

关键点是 `readyForConnectionFromSource=false`。v228 packet ready 只说明人工窗口字段已经结构化，不说明可以连接 sandbox。

## 3. Java v87 Marker

文件：[managedAuditManualSandboxConnectionPacketVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPacketVerification.ts)

```ts
function createJavaV87Reference(
  evidenceFiles: PacketVerificationEvidenceFile[],
  snippets: PacketVerificationSnippetMatch[],
): JavaV87OperatorHandoffMarkerReference {
```

Java 侧只通过文档和代码讲解证据参与验证。v229 查找这些片段：

```ts
snippet("java-v87-ready-field", JAVA_V87_RUNBOOK, "readyForNodeV229ManualSandboxConnectionPacketVerification=true")
snippet("java-v87-owner-artifact", JAVA_V87_RUNBOOK, "owner approval artifact id")
snippet("java-v87-credential-handle", JAVA_V87_RUNBOOK, "sandbox credential handle name")
snippet("java-v87-no-ledger-write", JAVA_V87_WALKTHROUGH, "approvalLedgerWrittenByJava=false")
snippet("java-v87-no-sql", JAVA_V87_WALKTHROUGH, "sqlExecutedByJava=false")
snippet("java-v87-no-credential", JAVA_V87_WALKTHROUGH, "credentialValueReadByJava=false")
```

这说明 v229 只确认 Java 已经能描述 handoff marker，不要求 Java 写 ledger、不要求 Java 执行 SQL，也不读取 credential。

## 4. mini-kv v96 Marker

文件：[managedAuditManualSandboxConnectionPacketVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPacketVerification.ts)

```ts
const marker = evidence.managed_audit_sandbox_connection_receipt_echo_marker ?? {};
```

mini-kv 侧直接读取当前 runtime smoke fixture 中的 receipt echo marker。v229 要求：

```ts
projectVersion === "0.96.0"
releaseVersion === "v96"
markerDigest === "fnv1a64:b9fc556875ea625b"
consumedReceiptDigest === "fnv1a64:ceaed265f7f9560c"
sourceOperatorPacketProfile === "managed-audit-manual-sandbox-connection-operator-packet.v1"
packetMode === "manual-sandbox-connection-operator-packet-only"
```

`consumedReceiptDigest` 是 v95 sandbox adapter receipt digest。也就是说，v96 是当前 fixture，但它必须保留 v95 证据链。

## 5. 边界字段

文件：[managedAuditManualSandboxConnectionPacketVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPacketVerification.ts)

```ts
connectionExecutionAllowed: booleanField(marker, "connection_execution_allowed") ?? true,
credentialValueReadAllowed: booleanField(marker, "credential_value_read_allowed") ?? true,
schemaMigrationExecutionAllowed: booleanField(marker, "schema_migration_execution_allowed") ?? true,
managedAuditWriteAllowed: booleanField(marker, "managed_audit_write_allowed") ?? true,
nodeAutoStartAllowed: booleanField(marker, "node_auto_start_allowed") ?? true,
```

这些字段的默认值故意偏保守：如果 fixture 缺字段，默认按危险处理。只有显式为 `false`，v229 才接受该边界。

## 6. Packet Verification Digest

文件：[managedAuditManualSandboxConnectionPacketVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPacketVerification.ts)

```ts
verificationDigest: sha256StableJson({
  profileVersion: "managed-audit-manual-sandbox-connection-packet-verification.v1",
  sourcePacketDigest: sourcePacket.operatorPacket.packetDigest,
  javaV87,
  miniKvV96,
  operatorFieldsEchoed,
}),
```

digest 把 Node v228 packet、Java v87 marker、mini-kv v96 marker 绑定成一个可归档验证结果。它不包含 credential value，不代表连接已执行。

## 7. Checks

文件：[managedAuditManualSandboxConnectionPacketVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPacketVerification.ts)

```ts
sourceNodeV228PacketReady: sourcePacket.readyForManagedAuditManualSandboxConnectionOperatorPacket
  && sourcePacket.packetState === "manual-sandbox-connection-operator-packet-ready",
```

v229 的 `checks` 分三层：

```text
sourceNodeV228*：v228 packet 是否 ready，且仍阻断连接
javaV87* / miniKvV96*：两侧只读 marker 是否齐
credential / schema / connection / write / autostart：危险动作是否仍为 false
```

最后通过：

```ts
checks.readyForManagedAuditManualSandboxConnectionPacketVerification = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionPacketVerification")
  .every(([, value]) => value);
```

这里的 ready 仍然只是“packet verification ready”，不是连接 ready。

## 8. 路由注册

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(
  app,
  "/api/v1/audit/managed-audit-manual-sandbox-connection-packet-verification",
  () => loadManagedAuditManualSandboxConnectionPacketVerification({ config }),
  renderManagedAuditManualSandboxConnectionPacketVerificationMarkdown,
);
```

v229 延续共享路由注册方式，没有新增手写 JSON/Markdown 分支，避免 audit route 继续膨胀。

## 9. 旧链路兼容修正

文件：[managedAuditSandboxAdapterDryRunPackage.ts](D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPackage.ts)

mini-kv 当前 runtime smoke fixture 已经从 v95 推进到 v96。旧 v225 package 仍要确认 v91-origin sandbox non-participation receipt 被保留，因此本版把判断从“只认 v95 顶层版本”修正为：

```ts
miniKvSandboxReceiptAccepted: miniKvGuard.currentReleaseVersion === "v96"
  && miniKvGuard.consumedReleaseVersion === "v90"
  && miniKvGuard.consumedReceiptDigest === "fnv1a64:0dfb07cd2f8de289"
  && miniKvGuard.currentArtifactPathHint === "c/96/"
  && miniKvGuard.receiptDigest === "fnv1a64:e3693d38283c37e2"
```

同时 `receiptConsumer` 改为读取 receipt 内部的 `consumer`，而不是顶层 `consumer_hint`。顶层已经服务 v229，receipt 内部才是 v225 的稳定消费关系。

## 10. 测试覆盖

文件：[managedAuditManualSandboxConnectionPacketVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionPacketVerification.test.ts)

测试覆盖三件事：

```text
1. 默认配置下 v229 verification ready，但 sandbox connection / production audit 仍为 false。
2. UPSTREAM_ACTIONS_ENABLED=true 时阻断。
3. JSON 和 Markdown 路由都可访问。
```

同时本版聚焦测试覆盖 v223-v229 连续链路，防止旧 profile 因 mini-kv 当前 fixture 推进到 v96 而误 blocked。
