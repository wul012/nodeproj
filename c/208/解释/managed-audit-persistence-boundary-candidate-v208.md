# Node v208 managed audit persistence boundary candidate

## 本版判断

v208 是 v207 生产硬化分诊后的第一个真实生产雏形能力候选版。它不连接真实外部审计系统，也不写 Java / mini-kv，而是把 managed audit persistence 的候选边界定义清楚：

```text
写入候选：file-jsonl 或 sqlite dry-run
保留策略：30 天候选 retention
轮转策略：size-and-age-rotation-candidate
失败模式：append/query/digest/rotation
下一步：v209 在 Node 本地临时目录做 dry-run 验证
```

## 本版新增

新增服务：

```text
src/services/managedAuditPersistenceBoundaryCandidate.ts
```

新增接口：

```text
GET /api/v1/audit/managed-persistence-boundary-candidate
GET /api/v1/audit/managed-persistence-boundary-candidate?format=markdown
```

新增测试：

```text
test/managedAuditPersistenceBoundaryCandidate.test.ts
```

## 消费的证据

v208 消费三类既有证据：

```text
Node v207：post-real-read production hardening triage
Java v74：audit-persistence handoff hint
mini-kv v83：binary provenance hint
```

其中 Java v74 只提供可进入 Node managed audit dry-run 的只读字段清单，不写 Java ledger，不写 managed audit store。

mini-kv v83 只提供运行二进制和证据路径提示，不执行 LOAD / RESTORE / COMPACT，不声明生产二进制。

## 候选方案

v208 定义两个 dry-run store candidate：

```text
file-jsonl：v209 首选，只写 Node 自己的临时目录
sqlite：只保留 schema 方向，v208 不引入依赖，不创建 sqlite 文件
```

v209 必须满足：

```text
temp-directory-only
append-query-digest
cleanup-after-test
no-java-mini-kv-write
```

## 安全边界

本版仍然保持：

```text
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionAudit=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
realManagedAdapterConnected=false
externalAuditSystemAccessed=false
productionAuditRecordAllowed=false
```

## 当前验证结果

最终验证已通过：

```text
npm run typecheck：通过
聚焦测试：4 files / 12 tests 通过
npm test：150 files / 512 tests 通过
npm run build：通过
Chrome screenshot：c/208/图片/managed-audit-persistence-boundary-candidate-v208.png 已生成
HTTP smoke：127.0.0.1:4313，candidateState=ready-for-managed-audit-dry-run
HTTP smoke：sinkMode=file-or-sqlite-dry-run-candidate，v209RequirementCount=4，readyForProductionAudit=false
HTTP smoke：Markdown 200，包含 Java v74 handoff hint 和 RUN_NODE_V209_DRY_RUN_VERIFICATION
```

## 下一步

按 v207 衍生计划，下一步是：

```text
Node v209：managed audit persistence dry-run verification
```

v209 可以连续推进，但只能在 Node 本地测试临时目录写 dry-run audit record，结束后必须清理；仍不能写 Java 或 mini-kv。
