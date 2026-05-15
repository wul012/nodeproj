# Node v199 real-read window audit store handoff contract

## 本版判断

v198 已经把真实只读窗口的 operator identity binding 固定下来，但 production readiness 仍缺 managed audit store。v199 不直接连接真实数据库，也不迁移 file audit，而是定义未来 managed audit store 需要接收的三类窗口记录：

```text
window-open
imported-result
checkpoint
```

这使真实只读窗口从“有身份绑定”推进到“知道将来要怎样写入托管审计”，但仍保持只读 contract，不做真实写入。

## 本版范围

新增：

```text
GET /api/v1/production/real-read-window-audit-store-handoff-contract
GET /api/v1/production/real-read-window-audit-store-handoff-contract?format=markdown
```

核心输出：

```text
sourceIdentityBinding
handoffContract
requiredRecords
handoffRules
productionBlockers
```

## 安全边界

```text
managedAuditStoreConnected=false
managedAuditWritesAllowed=false
realDatabaseConnectionAttempted=false
fileAuditMigrationPerformed=false
readyForProductionAudit=false
readyForProductionWindow=false
```

## 只读核对

本版推进前只读核对了前置计划：

```text
Java v70：已完成，tag 为 v70订单平台release-approval-operator-window-hint
mini-kv v79：已完成，tag 为 第七十九版运行时身份中性窗口证明
```

没有启动、测试、构建、修改 Java 或 mini-kv。

## 验证结果

```text
npm run typecheck：通过
聚焦测试：4 files / 12 tests 通过
npm test：141 files / 483 tests 通过
npm run build：通过
```

## 下一步

按计划下一步是：

```text
Node v200：real-read window CI archive artifact manifest
```
