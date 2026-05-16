# Node v211 managed audit identity approval provenance dry-run packet

## 本版判断

v211 是 v209-v211 managed audit 小阶段的收口版。它消费：

```text
Node v210：identity / approval binding contract
Java v75：approval record handoff hint
mini-kv v84：retention provenance check
```

本版在 Node 本地 `.tmp` 临时目录写入一条 `managed-audit-dry-run-record.v2-candidate`，其中同时包含 operator identity、approval request、approval decision、correlation、Java handoff 和 mini-kv provenance。写入后按 request id 查询、生成 digest、删除临时目录。

## 本版新增

新增服务：

```text
src/services/managedAuditIdentityApprovalProvenanceDryRunPacket.ts
```

新增接口：

```text
GET /api/v1/audit/managed-identity-approval-provenance-dry-run-packet
GET /api/v1/audit/managed-identity-approval-provenance-dry-run-packet?format=markdown
```

新增测试：

```text
test/managedAuditIdentityApprovalProvenanceDryRunPacket.test.ts
```

## packet 内容

核心字段：

```text
packetVersion=managed-audit-dry-run-record.v2-candidate
requestId=managed-audit-v211-identity-approval-provenance-request
operatorId=operator:v211-dry-run
approvalDecision.decision=approved
approvalDecision.upstreamTouched=false
javaApprovalRecordHandoffHintVersion=java-release-approval-rehearsal-approval-record-handoff-hint.v1
miniKvRetentionProvenanceCheckDigest=fnv1a64:357cc7e9eec3f223
```

## 安全边界

本版仍然保持：

```text
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionAudit=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
realApprovalDecisionCreated=false
realApprovalLedgerWritten=false
externalAuditSystemAccessed=false
javaWriteAttempted=false
miniKvWriteAttempted=false
productionAuditRecordAllowed=false
```

## 当前验证结果

```text
npm run typecheck：通过
聚焦测试：2 files / 6 tests 通过
npm test：153 files / 521 tests 通过
npm run build：通过
Chrome screenshot：c/211/图片/managed-audit-identity-approval-provenance-dry-run-packet-v211.png 已生成
HTTP smoke：127.0.0.1:4316，packetState=dry-run-packet-verified
HTTP smoke：appendPacketCount=1，queryByRequestIdCount=1，dryRunDirectoryRemoved=true
HTTP smoke：readyForProductionAudit=false，miniKvRetentionProvenanceCheckDigest=fnv1a64:357cc7e9eec3f223，Markdown 200
```

## 下一步

v211 已收口当前 managed audit packet 阶段，后续另起：

```text
v211-post-managed-audit-packet-roadmap.md
```

下一步建议 Node v212 做 packet verification report；同时推荐并行 Java v76 + mini-kv v85，补只读消费回执。
