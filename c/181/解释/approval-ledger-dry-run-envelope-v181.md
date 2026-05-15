# Node v181 运行调试说明：approval ledger dry-run envelope

## 本版本目标

Node v181 接在 Node v180 `approval decision prerequisite gate` 后面，目标是形成 approval ledger 写入前的 dry-run envelope。

本版本只做可复核的候选信封：

- 不创建 approval decision。
- 不写真实 approval ledger。
- 不启动 Java。
- 不启动 mini-kv。
- 不读取 production secret。
- 不连接生产数据库或生产 IdP。
- 不执行 release / deployment / rollback / restore。

## 新增入口

```text
GET /api/v1/production/approval-ledger-dry-run-envelope
GET /api/v1/production/approval-ledger-dry-run-envelope?format=markdown
```

本地 smoke 使用安全身份头：

```text
x-orderops-operator-id: release-reviewer-1
x-orderops-roles: viewer,operator
```

核心返回：

```text
profileVersion=approval-ledger-dry-run-envelope.v1
envelopeState=ready-for-approval-ledger-dry-run-review
readyForApprovalLedgerDryRunEnvelope=true
readyForApprovalDecision=false
readyForApprovalLedgerWrite=false
executionAllowed=false
```

## 关键证据

v181 引用 v180 gate：

```text
sourcePrerequisiteGateVersion=approval-decision-prerequisite-gate.v1
sourcePrerequisiteGateState=ready-for-approval-decision-prerequisite-review
sourceReadyForDryRunEnvelope=true
```

v181 新增候选 ledger 字段：

```text
sourcePrerequisiteGateDigest
releaseOperator
rollbackApprover
releaseWindow
miniKvRetentionId
miniKvRestoreArtifactDigest
dryRunOnly
approvalDecisionCreated=false
approvalLedgerWriteAllowed=false
```

这些字段用于形成 envelope digest 和 idempotency key，但不会写入真实 ledger。

## 验证结果

本版本验证包括：

```text
npm run typecheck
npx vitest run test/approvalLedgerDryRunEnvelope.test.ts
npm test
npm run build
safe HTTP smoke
Chrome screenshot
```

截图归档：

```text
c/181/图片/approval-ledger-dry-run-envelope-v181.png
```

## 下一步

按最新计划，Node v181 完成后下一步不是 Node 抢跑，而是推荐并行：

```text
Java v65：rollback approver evidence fixture
mini-kv v74：restore approval boundary fixture
```

等 Java v65 和 mini-kv v74 都完成后，Node v182 再生成 `release approval decision rehearsal packet`，仍然不创建真实 approval decision。
