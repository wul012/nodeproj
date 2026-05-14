# Node v178 运行调试说明：cross-project evidence retention gate

## 本版目标

Node v178 在 Node v177、Java v63、mini-kv v72 都完成后推进，目标是形成三项目 evidence retention gate。

本版只做只读汇总和 gate 判断：

- 不启动 Java。
- 不启动 mini-kv。
- 不读取 production secret。
- 不连接生产数据库或生产 IdP。
- 不执行 Java deployment / rollback / rollback SQL。
- 不执行 mini-kv LOAD / COMPACT / SETNXEX / restore。
- 不创建 release approval decision。

## 新增入口

```text
GET /api/v1/production/cross-project-evidence-retention-gate
GET /api/v1/production/cross-project-evidence-retention-gate?format=markdown
```

本地 smoke 使用安全身份头：

```text
x-orderops-operator-id: smoke-operator-1
x-orderops-roles: viewer,operator
```

核心返回：

```text
profileVersion=cross-project-evidence-retention-gate.v1
gateState=ready-for-cross-project-evidence-retention-review
readyForCrossProjectEvidenceRetentionGate=true
executionAllowed=false
readyForProductionRelease=false
readyForProductionRestore=false
```

## 三方输入

Node 输入：

```text
ci-operator-identity-evidence-packet.v1
ready-for-operator-identity-evidence
```

Java 输入：

```text
java-release-audit-retention-fixture.v1
retentionId=release-retention-record-placeholder
retentionDays=180
```

mini-kv 输入：

```text
mini-kv-restore-evidence-retention.v1
retentionId=mini-kv-restore-retention-v72
retentionDays=90
```

## 验证结果

本版验证：

```text
npm run typecheck
npx vitest run test/crossProjectEvidenceRetentionGate.test.ts test/ciOperatorIdentityEvidencePacket.test.ts test/ciEvidenceHardeningPacket.test.ts test/accessPolicyProfile.test.ts test/accessGuard.test.ts
npm test
npm run build
safe HTTP smoke
Chrome screenshot
```

截图归档：

```text
c/178/图片/cross-project-evidence-retention-gate-v178.png
```

## 下一步

按最新计划，Node v178 完成后下一步是：

```text
Node v179：production release pre-approval packet
```

v179 只能生成 pre-approval packet，不创建 approval decision，不执行 release/deployment/rollback/restore。
