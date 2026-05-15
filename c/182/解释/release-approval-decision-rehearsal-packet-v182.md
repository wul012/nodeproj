# Node v182 运行调试说明：release approval decision rehearsal packet

## 本版本目标

Node v182 等待 Node v181、Java v65、mini-kv v74 都完成后推进。

本版本只生成 release approval decision rehearsal packet：

- 不创建真实 approval decision。
- 不写 approval ledger。
- 不启动 Java。
- 不启动 mini-kv。
- 不读取 production secret。
- 不连接生产数据库或生产 IdP。
- 不执行 release / deployment / rollback / restore。

## 新增入口

```text
GET /api/v1/production/release-approval-decision-rehearsal-packet
GET /api/v1/production/release-approval-decision-rehearsal-packet?format=markdown
```

本地 smoke 使用安全身份头：

```text
x-orderops-operator-id: release-reviewer-1
x-orderops-roles: viewer,operator
```

核心返回：

```text
profileVersion=release-approval-decision-rehearsal-packet.v1
packetState=ready-for-release-approval-decision-rehearsal-review
readyForReleaseApprovalDecisionRehearsalPacket=true
readyForApprovalDecision=false
readyForApprovalLedgerWrite=false
executionAllowed=false
```

## 三方输入

Node 输入：

```text
approval-ledger-dry-run-envelope.v1
ready-for-approval-ledger-dry-run-review
```

Java 输入：

```text
java-rollback-approver-evidence-fixture.v1
rollbackApprover=rollback-approver-placeholder
migrationDirection=no-database-change
rollbackSqlExecutionAllowed=false
requiresProductionDatabase=false
```

mini-kv 输入：

```text
mini-kv-restore-approval-boundary.v1
approvalBoundaryId=mini-kv-restore-approval-boundary-v74
restoreApproverPlaceholder=operator:<restore-approval-approver>
restoreTargetPlaceholder=restore-target:<operator-approved-restore-target>
orderAuthoritative=false
javaTransactionChainConnected=false
```

## 验证结果

本版本验证包括：

```text
npm run typecheck
npx vitest run test/releaseApprovalDecisionRehearsalPacket.test.ts
npm test
npm run build
safe HTTP smoke
Chrome screenshot
```

截图归档：

```text
c/182/图片/release-approval-decision-rehearsal-packet-v182.png
```

## 下一步

v182 收口后，下一阶段不继续横向堆 fixture。

新计划第一步必须是 Node 实际优化：

```text
Node v183：opsPromotionArchiveBundle split phase 1
```

优先拆分 `src/services/opsPromotionArchiveBundle.ts`，保持 endpoint 和测试契约不变。
