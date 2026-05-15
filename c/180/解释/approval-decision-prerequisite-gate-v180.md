# Node v180 运行调试说明：approval decision prerequisite gate

## 本版目标

Node v180 在 Java v64、mini-kv v73、Node v179 都完成后推进，目标是形成 approval decision prerequisite gate。

本版只判断是否可以进入下一版 approval ledger dry-run envelope：

- 不创建 approval decision。
- 不写 approval ledger。
- 不启动 Java。
- 不启动 mini-kv。
- 不读取 production secret。
- 不连接生产数据库或生产 IdP。
- 不执行 release / deployment / rollback / restore。

## 新增入口

```text
GET /api/v1/production/approval-decision-prerequisite-gate
GET /api/v1/production/approval-decision-prerequisite-gate?format=markdown
```

本地 smoke 使用安全身份头：

```text
x-orderops-operator-id: release-reviewer-1
x-orderops-roles: viewer,operator
```

核心返回：

```text
profileVersion=approval-decision-prerequisite-gate.v1
gateState=ready-for-approval-decision-prerequisite-review
readyForApprovalDecisionPrerequisiteGate=true
readyForApprovalLedgerDryRunEnvelope=true
readyForApprovalDecision=false
executionAllowed=false
```

## 三方输入

Node 输入：

```text
production-release-pre-approval-packet.v1
ready-for-production-release-pre-approval-review
```

Java 输入：

```text
java-release-operator-signoff-fixture.v1
releaseOperator=release-operator-placeholder
rollbackApprover=rollback-approver-placeholder
releaseWindow=release-window-placeholder
operatorSignoffPlaceholder=operator-signoff-placeholder
```

mini-kv 输入：

```text
mini-kv-retained-restore-artifact-digest.v1
retentionId=mini-kv-retained-restore-artifact-digest-v73
restoreArtifactDigestPlaceholder=sha256:<operator-retained-restore-artifact-digest>
restoreTargetPlaceholder=restore-target:<operator-recorded-restore-target>
orderAuthoritative=false
```

## 验证结果

本版验证：

```text
npm run typecheck
npx vitest run test/approvalDecisionPrerequisiteGate.test.ts test/productionReleasePreApprovalPacket.test.ts test/crossProjectEvidenceRetentionGate.test.ts test/ciOperatorIdentityEvidencePacket.test.ts
npm test
npm run build
safe HTTP smoke
Chrome screenshot
```

截图归档：

```text
c/180/图片/approval-decision-prerequisite-gate-v180.png
```

## 下一步

按最新计划，Node v180 完成后下一步是：

```text
Node v181：approval ledger dry-run envelope
```

v181 只能设计 approval ledger 写入前的 dry-run envelope，不写真实 ledger，不发布。
