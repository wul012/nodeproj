# Node v215 managed audit dry-run adapter candidate

## 本版判断

v215 消费：

```text
Node v214：managed audit restore drill archive verification
Java v77：managed audit adapter boundary receipt
mini-kv v86：managed audit adapter restore boundary receipt
```

本版只实现 Node 本地 JSONL dry-run adapter candidate。它会写入 Node 自己的 `.tmp` 临时目录并立即清理，用来验证 append / query / digest / cleanup 流程；不连接真实 managed audit，不写 Java，不写 mini-kv，不执行 restore。

## 本版新增

新增服务：

```text
src/services/managedAuditDryRunAdapterCandidate.ts
```

新增接口：

```text
GET /api/v1/audit/managed-audit-dry-run-adapter-candidate
GET /api/v1/audit/managed-audit-dry-run-adapter-candidate?format=markdown
```

新增测试：

```text
test/managedAuditDryRunAdapterCandidate.test.ts
```

## 核心输出

核心字段：

```text
profileVersion=managed-audit-dry-run-adapter-candidate.v1
candidateState=local-dry-run-adapter-verified
readyForManagedAuditDryRunAdapterCandidate=true
readyForProductionAudit=false
readyForProductionWindow=false
executionAllowed=false
restoreExecutionAllowed=false
connectsManagedAudit=false
automaticUpstreamStart=false
localDryRunWritePerformed=true
```

## 本地 dry-run adapter

v215 写入的只是一个 Node 本地临时 JSONL 文件：

```text
.tmp/managed-audit-v215-*/managed-audit-adapter-candidate.jsonl
```

写入后执行：

```text
appendRecordCount=1
queryByRequestIdCount=1
digestBeforeAppend != digestAfterAppend
digestAfterAppend == digestAfterRepeatRead
dryRunDirectoryRemoved=true
```

## 上游边界回执

Java v77 证明 Node v215 只能：

```text
consume receipt
write local dry-run files
```

不能：

```text
connect managed audit
create approval decision
write approval ledger
persist approval record
execute SQL
trigger deployment / rollback
execute restore
```

mini-kv v86 证明：

```text
receiptDigest=fnv1a64:f39d8e3ef98654ea
adapterWriteAllowed=false
restoreExecutionAllowed=false
loadRestoreCompactExecuted=false
managedAuditWriteExecuted=false
orderAuthoritative=false
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
聚焦测试：test/managedAuditDryRunAdapterCandidate.test.ts，3 tests 已通过
全量测试：157 files / 533 tests 已通过
npm run build：已通过
Chrome screenshot：c/215/图片/managed-audit-dry-run-adapter-candidate-v215.png 已生成
HTTP smoke：127.0.0.1:4321，candidateState=local-dry-run-adapter-verified
HTTP smoke：ready=true，readyForProductionAudit=false，connectsManagedAudit=false，restoreExecutionAllowed=false，appendRecordCount=1，queryByRequestIdCount=1，dryRunDirectoryRemoved=true，Markdown 200
```

## 下一步

v215 已经把 managed audit adapter 从“计划和边界回执”推进到“本地 dry-run adapter candidate”。下一阶段应另起 post-v215 计划，优先做 v215 archive verification 和真实 adapter 前的存储/身份/恢复硬门槛，不要直接连接生产审计系统。
