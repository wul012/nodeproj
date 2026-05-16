# Node v212 managed audit packet verification report 代码讲解

## 模块角色

v212 是 v211 managed audit dry-run packet 的复核层。v211 负责生成一条本地 JSONL packet，v212 负责回答：

```text
这条 packet 的 shape 是否对
digest 链接是否对
identity / approval / provenance 字段是否齐
cleanup 证据是否完整
生产审计是否仍然关闭
```

本版还顺手收掉 v205 runtime smoke 的两个轻量技术债：mini-kv read command 声明和真实执行同源、records 统计单次遍历。

## 1. 服务入口

文件：[managedAuditIdentityApprovalProvenancePacketVerificationReport.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalProvenancePacketVerificationReport.ts)

```ts
export async function loadManagedAuditIdentityApprovalProvenancePacketVerificationReport(input: {
  config: AppConfig;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
})
```

入口参数和 v211 保持一致，这样 v212 可以消费同一套 managed audit / identity / approval 证据上下文。测试中 Java 和 mini-kv client 仍然是 throwing fake，保证 v212 不会偷偷调用上游。

## 2. 消费 v211 packet

文件：[managedAuditIdentityApprovalProvenancePacketVerificationReport.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalProvenancePacketVerificationReport.ts)

```ts
const sourcePacket = await loadManagedAuditIdentityApprovalProvenanceDryRunPacket(input);
const sourceSummary = createSourcePacketSummary(sourcePacket);
```

v212 不是重新定义 packet，而是消费 v211 结果。`sourceSummary` 抽出复核需要的关键字段：

```ts
packetDigest: sourcePacket.dryRunPacket.packetDigest,
packetVerificationDigest: sourcePacket.verification.packetVerificationDigest,
sourceBindingContractDigest: sourcePacket.sourceBindingContract.contractDigest,
javaHandoffHintVersion: sourcePacket.upstreamEvidence.javaV75.hintVersion,
miniKvRetentionProvenanceCheckDigest: sourcePacket.upstreamEvidence.miniKvV84.retentionProvenanceCheckDigest,
localDryRunDirectoryRemoved: sourcePacket.verification.dryRunDirectoryRemoved,
```

这让 v212 输出更像一个“复核报告”，而不是又一份完整 packet 副本。

## 3. verification report digest

文件：[managedAuditIdentityApprovalProvenancePacketVerificationReport.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalProvenancePacketVerificationReport.ts)

```ts
const reportWithoutDigest = {
  profileVersion: "managed-audit-identity-approval-provenance-packet-verification-report.v1",
  sourcePacketProfileVersion: sourcePacket.profileVersion,
  sourcePacketDigest: packet.packetDigest,
  sourcePacketVerificationDigest: sourcePacket.verification.packetVerificationDigest,
  sourceBindingContractDigest: sourcePacket.sourceBindingContract.contractDigest,
  identityOperatorId: packet.identity.operatorId,
  approvalRequestId: packet.approvalRequest.requestId,
  approvalDecisionId: packet.approvalDecision.decisionId,
  approvalCorrelationId: packet.correlation.approvalCorrelationId,
}
```

随后生成：

```ts
reportDigest: sha256StableJson(reportWithoutDigest)
```

这条 digest 是 v212 自己的报告摘要，用来把 v211 packet digest、verification digest、binding contract digest 和 identity / approval ids 固化到同一份复核证据里。

## 4. 字段级检查

文件：[managedAuditIdentityApprovalProvenancePacketVerificationReport.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalProvenancePacketVerificationReport.ts)

```ts
identityFieldsVerified:
  packet.identity.identityVersion === "operator-identity-contract.v1"
  && packet.identity.operatorId === "operator:v211-dry-run"
  && packet.identity.authenticated
  && packet.identity.roles.includes("auditor")
  && packet.identity.roles.includes("operator")
  && !packet.identity.verifiedTokenAttached
```

approval request 检查：

```ts
approvalRequestFieldsVerified:
  packet.approvalRequest.requestId === "approval-request-v211-dry-run"
  && packet.approvalRequest.status === "approved"
  && packet.approvalRequest.requestedBy === packet.identity.operatorId
  && isSha256(packet.approvalRequest.previewDigest)
  && isSha256(packet.approvalRequest.preflightDigest)
```

approval decision 检查：

```ts
approvalDecisionFieldsVerified:
  packet.approvalDecision.decisionId === "approval-decision-v211-dry-run"
  && packet.approvalDecision.decision === "approved"
  && packet.approvalDecision.reviewer === packet.approvalRequest.reviewer
  && isSha256(packet.approvalDecision.decisionDigest)
  && !packet.approvalDecision.upstreamTouched
```

这些判断让 v212 不只是“看见 v211 ready”，而是逐项确认 operator、request、decision 和 digest 链条确实闭合。

## 5. provenance 和 cleanup

文件：[managedAuditIdentityApprovalProvenancePacketVerificationReport.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalProvenancePacketVerificationReport.ts)

```ts
provenanceFieldsVerified:
  packet.provenance.javaApprovalRecordHandoffHintVersion === sourcePacket.upstreamEvidence.javaV75.hintVersion
  && packet.provenance.miniKvRetentionProvenanceCheckDigest === sourcePacket.upstreamEvidence.miniKvV84.retentionProvenanceCheckDigest
  && !packet.provenance.miniKvManagedAuditWriteExecuted
```

cleanup 检查：

```ts
cleanupEvidenceVerified:
  sourcePacket.verification.dryRunDirectoryCreated
  && sourcePacket.verification.dryRunDirectoryRemoved
  && sourcePacket.verification.appendPacketCount === 1
  && sourcePacket.verification.queryByRequestIdCount === 1
  && sourcePacket.verification.digestAfterAppend === sourcePacket.verification.digestAfterRepeatRead
```

这里重点是：v211 的本地 `.tmp` 写入必须完成 append/query/digest，并在响应前清理掉临时目录。

## 6. v205 read command 同源

文件：[threeProjectRealReadRuntimeSmokeExecutionPacket.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokeExecutionPacket.ts)

```ts
const MINI_KV_RUNTIME_SMOKE_READ_COMMANDS = ["SMOKEJSON", "INFOJSON", "STORAGEJSON", "HEALTH"] as const;
```

接口证据和真实执行现在用同一个常量：

```ts
readCommands: MINI_KV_RUNTIME_SMOKE_READ_COMMANDS
```

执行 `mini-kv-smokejson` 时也消费常量：

```ts
const result = await input.miniKv.execute(MINI_KV_RUNTIME_SMOKE_READ_COMMANDS[0]);
```

这样不会再出现报告写 `STATSJSON`，但实际执行 `SMOKEJSON` 的不一致。

## 7. v205 records 统计收敛

文件：[threeProjectRealReadRuntimeSmokeExecutionPacket.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokeExecutionPacket.ts)

```ts
const recordCounts = countRuntimeSmokeRecords(records);
```

统计函数单次遍历：

```ts
function countRuntimeSmokeRecords(records: RuntimeSmokeExecutionRecord[]): RuntimeSmokeRecordCounts {
  const counts: RuntimeSmokeRecordCounts = {
    attemptedTargetCount: 0,
    passedTargetCount: 0,
    skippedTargetCount: 0,
    failedTargetCount: 0,
    javaRecordCount: 0,
    miniKvRecordCount: 0,
    httpRecordCount: 0,
  };
```

`smokeSession`、`summary`、`createChecks` 和 warning 文案都复用 `recordCounts`，避免多处重复 `records.filter(...)`。

## 8. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>(
  "/api/v1/audit/managed-identity-approval-provenance-packet-verification-report",
```

接口支持 JSON 和 Markdown：

```text
/api/v1/audit/managed-identity-approval-provenance-packet-verification-report
/api/v1/audit/managed-identity-approval-provenance-packet-verification-report?format=markdown
```

## 本版项目进度

v212 把 managed audit 主线从“能生成 dry-run packet”推进到“能复核 dry-run packet”。这比单纯加一个 endpoint 更重要：它让后续 v213 做 restore drill plan 时，有一个明确可消费的 verification report，而不是直接依赖 v211 原始 packet。

但生产边界仍未打开：

```text
不创建真实 approval decision
不写 approval ledger
不连接真实 managed audit
不写 Java / mini-kv
不打开生产窗口
```

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：managed audit v212 / v211 / v205，3 files / 10 tests 已通过
聚焦复跑：v212 / v205 / live-probe 慢测，4 files / 13 tests 已通过
首次全量测试：154 files / 524 tests 中 3 个既有 live-probe 测试因 5s/10s timeout 抖动失败；单独复跑通过
timeout 稳定性修正后全量测试：154 files / 524 tests 已通过
npm run build：已通过
Chrome screenshot：c/212/图片/managed-audit-identity-approval-provenance-packet-verification-report-v212.png 已生成
HTTP smoke：127.0.0.1:4317，reportState=packet-verification-ready
HTTP smoke：ready=true，readyForProductionAudit=false，localDryRunDirectoryRemoved=true
HTTP smoke：v205Commands=SMOKEJSON,INFOJSON,STORAGEJSON,HEALTH，v205Counts=true，Markdown 200
```
