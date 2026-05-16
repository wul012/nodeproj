# Node v210 managed audit identity approval binding contract

## 本版判断

v210 接在 v209 之后。v209 已经证明 Node 可以在本地临时目录写入、查询、digest 并清理一条 dry-run audit record；v210 不重复做文件写入，而是把生产审计真正需要的身份和审批字段绑定清楚。

本版只做 schema/contract：

```text
operator identity 字段绑定
approval request 字段绑定
approval decision 字段绑定
correlation id / trace digest 字段绑定
missing field -> block dry-run packet
```

它不创建真实 approval decision，不写 approval ledger，不连接真实 managed audit，也不写 Java / mini-kv。

## 本版新增

新增服务：

```text
src/services/managedAuditIdentityApprovalBindingContract.ts
```

新增接口：

```text
GET /api/v1/audit/managed-identity-approval-binding-contract
GET /api/v1/audit/managed-identity-approval-binding-contract?format=markdown
```

新增测试：

```text
test/managedAuditIdentityApprovalBindingContract.test.ts
```

## 消费的证据

v210 消费 v209：

```text
profileVersion=managed-audit-persistence-dry-run-verification.v1
verificationState=dry-run-verified
dryRunRecordVersion=managed-audit-dry-run-record.v1
verificationDigest=sha256 hex
```

如果 v209 dry-run 没通过，v210 contract 会进入 blocked。

## 绑定内容

本版输出目标 record：

```text
targetRecordVersion=managed-audit-dry-run-record.v2-candidate
sourceRecordVersion=managed-audit-dry-run-record.v1
schemaOnly=true
```

重点字段：

```text
operatorIdentity.operatorId
operatorIdentity.authenticated
operatorIdentity.roles
operatorIdentity.authSource
approvalRequest.requestId
approvalRequest.intentId
approvalRequest.previewDigest
approvalRequest.preflightDigest
approvalDecision.decisionId
approvalDecision.decision
approvalDecision.decisionDigest
approvalDecision.upstreamTouched
headers.x-orderops-approval-correlation-id
bindingContract.contractDigest
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
productionAuditRecordAllowed=false
```

## 当前验证结果

```text
npm run typecheck：通过
聚焦测试：2 files / 6 tests 通过
npm test：152 files / 518 tests 通过
npm run build：通过
Chrome screenshot：c/210/图片/managed-audit-identity-approval-binding-contract-v210.png 已生成
HTTP smoke：127.0.0.1:4315，contractState=ready-for-identity-approval-dry-run-packet
HTTP smoke：requiredBindingCount=5，missingFieldRuleCount=5，realApprovalDecisionCreated=false，realApprovalLedgerWritten=false
HTTP smoke：readyForProductionAudit=false，Markdown 200，包含 operatorIdentity.operatorId 和 START_NODE_V211_IDENTITY_APPROVAL_DRY_RUN_PACKET
```

## 下一步

当前下一步不是 Node v211 抢跑，而是：

```text
推荐并行：Java v75 + mini-kv v84
```

Java v75 和 mini-kv v84 完成后，Node v211 才消费两边只读证据，生成带 identity / approval / provenance 的本地 dry-run audit packet。
