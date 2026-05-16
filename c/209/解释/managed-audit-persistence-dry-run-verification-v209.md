# Node v209 managed audit persistence dry-run verification

## 本版判断

v209 是 v208 managed audit persistence boundary candidate 的第一轮真实验证。它不是生产审计落地，也不连接真实外部审计系统，而是把 v208 约定的四个要求执行成一个 Node 本地小闭环：

```text
temp-directory-only
append-query-digest
cleanup-after-test
no-java-mini-kv-write
```

本版实际在 Node 项目的 `.tmp` 下创建 `managed-audit-v209-*` 临时目录，写入一条 JSONL dry-run audit record，按 `requestId` 查询一次，生成文件 digest 和 verification digest，然后删除临时目录。

## 本版新增

新增服务：

```text
src/services/managedAuditPersistenceDryRunVerification.ts
```

新增接口：

```text
GET /api/v1/audit/managed-persistence-dry-run-verification
GET /api/v1/audit/managed-persistence-dry-run-verification?format=markdown
```

新增测试：

```text
test/managedAuditPersistenceDryRunVerification.test.ts
```

## 消费的证据

v209 消费 v208 candidate：

```text
profileVersion=managed-audit-persistence-boundary-candidate.v1
candidateState=ready-for-managed-audit-dry-run
candidateDigest=sha256 hex
Java v74 handoff hint
mini-kv v83 provenance digest
```

Java 和 mini-kv 在本版仍然只是只读证据来源。测试里使用 throwing fake client，如果代码意外调用 Java 或 mini-kv，聚焦测试会失败。

## dry-run record

本版生成的记录固定为：

```text
recordVersion=managed-audit-dry-run-record.v1
requestId=managed-audit-dry-run-v209-request
operatorId=operator:v209-dry-run
eventType=MANAGED_AUDIT_DRY_RUN_APPEND_QUERY_DIGEST
nodeSourceVersion=Node v209
candidateSourceVersion=Node v208
javaSourceVersion=Java v74
miniKvSourceVersion=mini-kv v83
```

安全边界也写进 record：

```text
nodeTempDirectoryOnly=true
upstreamReadOnly=true
javaWriteAllowed=false
miniKvWriteAllowed=false
externalAuditSystemAllowed=false
productionAuditRecordAllowed=false
```

## 安全边界

本版仍然保持：

```text
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionAudit=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
externalAuditSystemAccessed=false
productionAuditRecordAllowed=false
```

本地 dry-run 写入只用于验证 append/query/digest/cleanup，不代表生产 audit store 已经接入。

## 当前验证结果

```text
npm run typecheck：通过
聚焦测试：2 files / 6 tests 通过
npm test：151 files / 515 tests 通过
npm run build：通过
Chrome screenshot：c/209/图片/managed-audit-persistence-dry-run-verification-v209.png 已生成
HTTP smoke：127.0.0.1:4314，verificationState=dry-run-verified
HTTP smoke：appendRecordCount=1，queryByRequestIdCount=1，dryRunDirectoryRemoved=true，digestCovered=true
HTTP smoke：readyForProductionAudit=false，Markdown 200，包含 START_NODE_V210_IDENTITY_APPROVAL_BINDING
```

## 下一步

按 v209 衍生计划，下一步是：

```text
Node v210：operator identity + approval record binding contract
推荐并行：Java v75 + mini-kv v84
```

v210 应把 operator identity、approval request、approval decision 和 correlation id 字段绑定到 audit record shape；仍不创建真实 approval decision，不写真实 ledger。
