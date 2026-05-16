# Node v216 managed audit dry-run adapter archive verification

## 本版判断

v216 消费 Node v215 的归档证据：

```text
c/215/managed-audit-dry-run-adapter-candidate-v215.html
c/215/图片/managed-audit-dry-run-adapter-candidate-v215.png
c/215/解释/managed-audit-dry-run-adapter-candidate-v215.md
代码讲解记录_生产雏形阶段/219-managed-audit-dry-run-adapter-candidate-v215.md
docs/plans/v215-post-dry-run-adapter-roadmap.md
```

本版只做归档验证，不重新调用 v215 endpoint，因为 v215 endpoint 会重新执行本地 `.tmp` dry-run 写入。本版只读文件证据，确认 v215 已记录 append / query / digest / cleanup 和 no-write 边界。

## 本版新增

新增服务：

```text
src/services/managedAuditDryRunAdapterArchiveVerification.ts
```

新增接口：

```text
GET /api/v1/audit/managed-audit-dry-run-adapter-archive-verification
GET /api/v1/audit/managed-audit-dry-run-adapter-archive-verification?format=markdown
```

新增测试：

```text
test/managedAuditDryRunAdapterArchiveVerification.test.ts
```

## 核心输出

核心字段：

```text
profileVersion=managed-audit-dry-run-adapter-archive-verification.v1
verificationState=verified-dry-run-adapter-archive
readyForManagedAuditDryRunAdapterArchiveVerification=true
readyForProductionAudit=false
readyForProductionWindow=false
restoreExecutionAllowed=false
connectsManagedAudit=false
archiveVerificationRerunsSourceEndpoint=false
localDryRunWritePerformed=false
```

## 归档复核范围

v216 检查 v215 归档是否包含：

```text
HTML archive
Chrome screenshot
解释文档
代码讲解文档
当前 post-v215 plan
上阶段 v213 plan 收口
```

并复核这些关键证据：

```text
candidateState=local-dry-run-adapter-verified
Java v77 receipt
mini-kv v86 receipt
receiptDigest=fnv1a64:f39d8e3ef98654ea
managed-audit-adapter-candidate.jsonl
appendRecordCount=1
queryByRequestIdCount=1
dryRunDirectoryRemoved=true
HTTP smoke 记录
forbidden operations 记录
```

## 安全边界

本版继续阻断：

```text
真实 managed audit 连接
生产 audit record
Java approval / ledger / SQL / deployment / rollback
mini-kv LOAD / COMPACT / SETNXEX / RESTORE
自动启动上游
UPSTREAM_ACTIONS_ENABLED=true
```

## 当前验证结果

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditDryRunAdapterArchiveVerification.test.ts，3 tests 已通过
聚焦稳定性回归：managed audit dry-run 相关 6 files / 18 tests 已通过
全量测试：158 files / 536 tests 已通过
npm run build：已通过
Chrome screenshot：c/216/图片/managed-audit-dry-run-adapter-archive-verification-v216.png 已生成
HTTP smoke：127.0.0.1:4322，verificationState=verified-dry-run-adapter-archive
HTTP smoke：ready=true，readyForProductionAudit=false，connectsManagedAudit=false，restoreExecutionAllowed=false，archiveVerificationRerunsSourceEndpoint=false，localDryRunWritePerformed=false，matchedSnippetCount=21，Markdown 200
```

## 下一步

当前计划下一步不是 Node 抢跑，而是推荐并行：

```text
Java v78 + mini-kv v87
```

它们完成后，Node v217 才消费 v216、Java v78、mini-kv v87，进入真实 managed audit adapter 前的 production-hardening readiness gate。
