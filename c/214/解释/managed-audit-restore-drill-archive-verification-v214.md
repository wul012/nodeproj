# Node v214 managed audit restore drill archive verification

## 本版判断

v214 消费的是 Node v213 的归档证据：

```text
c/213/managed-audit-packet-restore-drill-plan-v213.html
c/213/图片/managed-audit-packet-restore-drill-plan-v213.png
c/213/解释/managed-audit-packet-restore-drill-plan-v213.md
代码讲解记录_生产雏形阶段/217-managed-audit-packet-restore-drill-plan-v213.md
docs/plans/v213-post-restore-drill-plan-roadmap.md
```

本版只做归档完整性和安全边界复核，不重新调用 v213 源 endpoint，不启动 Java 或 mini-kv，不连接真实 managed audit，不执行 restore。

## 本版新增

新增服务：

```text
src/services/managedAuditRestoreDrillArchiveVerification.ts
```

新增接口：

```text
GET /api/v1/audit/managed-audit-restore-drill-archive-verification
GET /api/v1/audit/managed-audit-restore-drill-archive-verification?format=markdown
```

新增测试：

```text
test/managedAuditRestoreDrillArchiveVerification.test.ts
```

## 核心输出

核心字段：

```text
profileVersion=managed-audit-restore-drill-archive-verification.v1
verificationState=verified-restore-drill-archive
readyForManagedAuditRestoreDrillArchiveVerification=true
readyForProductionAudit=false
readyForProductionWindow=false
restoreExecutionAllowed=false
connectsManagedAudit=false
archiveVerificationRerunsSourceEndpoint=false
automaticUpstreamStart=false
```

## 归档复核范围

v214 检查 v213 归档是否包含：

```text
HTML archive
Chrome screenshot
解释文档
代码讲解文档
当前计划文档
上阶段计划收口文档
```

并复核这些关键证据：

```text
drillState=ready-for-manual-dry-run-plan
planMode=manual-dry-run-plan-only
Java v76 receipt
mini-kv v85 receipt
miniKvMarkerDigest=fnv1a64:1ea4570c967cfdb1
HTTP smoke 记录
forbidden operations 记录
项目相对 evidence hints
```

## 安全边界

本版继续阻断：

```text
真实 managed audit 连接
真实 restore 执行
Java approval decision / ledger 写入
mini-kv LOAD / COMPACT / SETNXEX / RESTORE
自动启动 Java 或 mini-kv
UPSTREAM_ACTIONS_ENABLED=true
```

## 当前验证结果

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditRestoreDrillArchiveVerification.test.ts，3 tests 已通过
全量测试：156 files / 530 tests 已通过
npm run build：已通过
Chrome screenshot：c/214/图片/managed-audit-restore-drill-archive-verification-v214.png 已生成
HTTP smoke：127.0.0.1:4320，verificationState=verified-restore-drill-archive
HTTP smoke：ready=true，readyForProductionAudit=false，restoreExecutionAllowed=false，archiveVerificationRerunsSourceEndpoint=false，matchedSnippetCount=18，Markdown 200
```

## 下一步

当前计划的下一步不是 Node 抢跑，而是推荐并行：

```text
Java v77 + mini-kv v86
```

它们完成后，Node v215 才消费 v214、Java v77、mini-kv v86，进入本地 dry-run adapter candidate。
