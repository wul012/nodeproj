# Node v213 managed audit packet restore drill plan 代码讲解

## 模块角色

v213 是 v211-v213 managed audit packet 小阶段的收口版：

```text
v211：生成本地 dry-run packet
v212：复核 packet shape / digest / provenance / cleanup
v213：生成 restore drill plan，说明如何人工复查和重建 packet evidence
```

它仍然不是 restore 执行器，也不是 managed audit adapter。它只输出一份只读计划。

## 1. 服务入口

文件：[managedAuditPacketRestoreDrillPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditPacketRestoreDrillPlan.ts)

```ts
export async function loadManagedAuditPacketRestoreDrillPlan(input: {
  config: AppConfig;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
})
```

入口仍接收 Java / mini-kv client，但测试使用 throwing fake，保证 v213 不调用上游运行时。

## 2. 消费 v212 verification report

文件：[managedAuditPacketRestoreDrillPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditPacketRestoreDrillPlan.ts)

```ts
const sourceReport = await loadManagedAuditIdentityApprovalProvenancePacketVerificationReport(input);
```

v213 不直接跳过 v212 去读 v211 packet，而是先要求 v212 已经验证：

```ts
sourceVerificationReportReady:
  sourceReport.readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport
  && sourceReport.reportState === "packet-verification-ready"
```

这样 restore drill plan 的来源是经过复核的 report，而不是原始 packet。

## 3. Java v76 回执

文件：[managedAuditPacketRestoreDrillPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditPacketRestoreDrillPlan.ts)

```ts
function createJavaV76Marker(): JavaV76ApprovalHandoffVerificationMarker {
  return {
    markerVersion: "java-release-approval-rehearsal-approval-handoff-verification-marker.v1",
    consumedByNodeVersion: "Node v211",
    consumedPacketRequestId: "managed-audit-v211-identity-approval-provenance-request",
    appendQueryDigestCleanupCovered: true,
    readyForNodeV213RestoreDrillPlan: true,
    javaApprovalDecisionCreated: false,
    javaApprovalLedgerWritten: false,
  };
}
```

这段对应 Java v76 的 `approvalHandoffVerificationMarker`：Java 只证明 v75 handoff 已被 Node v211 消费，并确认没有创建真实 approval decision 或 ledger。

## 4. mini-kv v85 回执

文件：[managedAuditPacketRestoreDrillPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditPacketRestoreDrillPlan.ts)

```ts
function createMiniKvV85ReplayMarker(): MiniKvV85RetentionProvenanceReplayMarker {
  return {
    consumer: "Node v213 managed audit packet restore drill plan",
    consumedBy: "Node v211 managed audit identity approval provenance dry-run packet",
    consumedReleaseVersion: "v84",
    consumedCheckDigest: "fnv1a64:357cc7e9eec3f223",
    currentArtifactPathHint: "c/85/",
    markerDigest: "fnv1a64:1ea4570c967cfdb1",
    replayExecuted: false,
    managedAuditWriteExecuted: false,
    restoreExecuted: false,
  };
}
```

这段对应 mini-kv v85 的 `retention_provenance_replay_marker`：它只说明 v84 provenance 已被 Node v211 消费，不执行 replay / restore / managed audit 写入。

## 5. restore drill plan digest

文件：[managedAuditPacketRestoreDrillPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditPacketRestoreDrillPlan.ts)

```ts
const planWithoutDigest = {
  profileVersion: "managed-audit-packet-restore-drill-plan.v1",
  sourceReportDigest: sourceReport.verificationReport.reportDigest,
  sourcePacketDigest: sourceReport.sourcePacket.packetDigest,
  sourcePacketVerificationDigest: sourceReport.sourcePacket.packetVerificationDigest,
  javaMarkerVersion: javaV76.markerVersion,
  miniKvMarkerDigest: miniKvV85.markerDigest,
  normalizedEvidenceHints: NORMALIZED_EVIDENCE_HINTS,
}
```

然后生成：

```ts
planDigest: sha256StableJson(planWithoutDigest)
```

这个 digest 把 Node v212、Java v76、mini-kv v85 和证据路径归一化结果绑定到同一份 v213 plan 里。

## 6. 证据路径归一化

文件：[managedAuditPacketRestoreDrillPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditPacketRestoreDrillPlan.ts)

```ts
const NORMALIZED_EVIDENCE_HINTS = Object.freeze({
  nodeV211Archive: "c/211/",
  nodeV212Archive: "c/212/",
  javaV76Archive: "c/76/",
  miniKvV85Archive: "c/85/",
  miniKvV85RuntimeSmokeEvidence: "fixtures/release/runtime-smoke-evidence.json",
  miniKvV85VerificationManifest: "fixtures/release/verification-manifest.json",
});
```

检查逻辑确保不再出现本机绝对路径：

```ts
evidenceHintsNormalized:
  Object.values(NORMALIZED_EVIDENCE_HINTS).every((value) => !/^[A-Za-z]:[\\/]/.test(value))
```

这是 v213 范围内的小修正，不大范围重写历史 endpoint。

## 7. dry-run steps

文件：[managedAuditPacketRestoreDrillPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditPacketRestoreDrillPlan.ts)

```ts
function createDrillSteps(): RestoreDrillStep[] {
  return [
    step(1, "verify-node-v212-report", "node", ...),
    step(2, "verify-java-v76-marker", "node", ...),
    step(3, "verify-mini-kv-v85-marker", "node", ...),
    step(4, "reconstruct-packet-field-map", "operator", ...),
    step(5, "compare-digests", "operator", ...),
    step(6, "close-restore-drill", "node", ...),
  ];
}
```

每个 step 都带：

```ts
dryRunOnly: true
```

所以它是人工 dry-run plan，不是执行器。

## 8. forbidden operations

文件：[managedAuditPacketRestoreDrillPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditPacketRestoreDrillPlan.ts)

```ts
forbidden("connect-real-managed-audit", ...)
forbidden("replay-packet-to-production", ...)
forbidden("create-java-approval-decision", ...)
forbidden("execute-mini-kv-restore", ...)
forbidden("start-upstreams-automatically", ...)
forbidden("enable-upstream-actions", ...)
```

这组 forbidden operations 是 v213 最重要的安全边界：它明确告诉后续版本，restore drill 之前不能进入真实 adapter、Java approval 写入或 mini-kv restore。

## 9. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>(
  "/api/v1/audit/managed-audit-packet-restore-drill-plan",
```

接口支持：

```text
/api/v1/audit/managed-audit-packet-restore-drill-plan
/api/v1/audit/managed-audit-packet-restore-drill-plan?format=markdown
```

## 本版项目进度

v213 让 managed audit packet 主线从“生成和复核 packet”推进到“能规划 packet evidence 的恢复演练”。这一步靠近生产级，但仍然保持生产安全边界：

```text
不连接真实 managed audit
不 replay 到生产存储
不创建 Java approval decision
不执行 mini-kv restore
不自动启动上游
不打开 UPSTREAM_ACTIONS_ENABLED
```

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：v213 + v212，2 files / 6 tests 已通过
全量测试：155 files / 527 tests 已通过
npm run build：已通过
Chrome screenshot：c/213/图片/managed-audit-packet-restore-drill-plan-v213.png 已生成
HTTP smoke：127.0.0.1:4318，drillState=ready-for-manual-dry-run-plan
HTTP smoke：ready=true，readyForProductionAudit=false，restoreExecutionAllowed=false
HTTP smoke：javaReady=true，miniKvMarkerDigest=fnv1a64:1ea4570c967cfdb1，evidenceHintsNormalized=true，Markdown 200
```
