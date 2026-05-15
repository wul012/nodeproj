# Node v179 运行调试说明：production release pre-approval packet

## 本版目标

Node v179 接在 Node v178 `cross-project evidence retention gate` 之后，目标是把发布前证据整理成一个人工 pre-approval packet。

本版只做审查输入：

- 不创建 approval decision。
- 不写 approval ledger。
- 不启动 Java。
- 不启动 mini-kv。
- 不读取 production secret。
- 不连接生产数据库或生产 IdP。
- 不执行 release / deployment / rollback / restore。

## 新增入口

```text
GET /api/v1/production/release-pre-approval-packet
GET /api/v1/production/release-pre-approval-packet?format=markdown
```

本地 smoke 使用安全身份头：

```text
x-orderops-operator-id: release-reviewer-1
x-orderops-roles: viewer,operator
```

核心返回：

```text
profileVersion=production-release-pre-approval-packet.v1
packetState=ready-for-production-release-pre-approval-review
readyForProductionReleasePreApprovalPacket=true
readyForApprovalDecision=false
executionAllowed=false
readyForProductionRelease=false
readyForProductionRestore=false
```

## 依赖输入

Node v179 消费 Node v178：

```text
cross-project-evidence-retention-gate.v1
ready-for-cross-project-evidence-retention-review
```

并间接保留三方引用：

```text
Node v177：ci-operator-identity-evidence-packet.v1
Java v63：java-release-audit-retention-fixture.v1
mini-kv v72：mini-kv-restore-evidence-retention.v1
```

## 本版新增证据

本版新增三类审查材料：

```text
preApprovalChecklist
missingEvidence
preApprovalSteps
```

其中 `missingEvidence` 明确阻止下一步审批决定：

```text
real-production-idp
release-operator-signoff
rollback-approver-signoff
retained-artifact-digests
production-release-window-confirmation
```

这些缺失项只能由外部人工流程补齐，Node 不能自动推断。

## 验证结果

本版验证：

```text
npm run typecheck
npx vitest run test/productionReleasePreApprovalPacket.test.ts test/crossProjectEvidenceRetentionGate.test.ts test/ciOperatorIdentityEvidencePacket.test.ts
npm test
npm run build
safe HTTP smoke
Chrome screenshot
```

截图归档：

```text
c/179/图片/production-release-pre-approval-packet-v179.png
```

## 下一步

本版完成后，`v176-post-ci-evidence-hardening-roadmap.md` 收口。

新的全局计划是：

```text
docs/plans/v179-post-pre-approval-roadmap.md
```

按新计划，下一步不是 Node 抢跑，而是：

```text
推荐并行 Java v64 + mini-kv v73
```
