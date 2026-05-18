# Node v251 运行调试说明：manual sandbox connection decision record

本版依据 `docs/plans/v245-post-sandbox-precheck-roadmap.md` 继续推进。v250 已完成 rehearsal guard，但真实 managed audit sandbox connection 仍不能打开；v251 的目标是把连接前人工决策记录固化出来。

## 本版目标

v251 生成一份 decision record，记录连接前必须人工确认的七个字段和八个 no-go 条件。它不是 approval，不是 connection，不是 adapter client，只是人工决策 envelope。

## 新增入口

新增服务：

```text
src/services/managedAuditManualSandboxConnectionDecisionRecord.ts
```

新增路由：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-decision-record
GET /api/v1/audit/managed-audit-manual-sandbox-connection-decision-record?format=markdown
```

## 消费来源

v251 只消费 Node v250：

```text
Node v250 manual sandbox connection rehearsal guard
```

它不重新读取 Java / mini-kv 文件，也不启动或修改 Java / mini-kv。Java v101 和 mini-kv v110 的完成状态已经由 v250 guard 统一验证。

## 七个决策字段

```text
owner approval artifact
credential handle review status
schema rehearsal approval id
manual window marker
rollback path id
manual abort marker
timeout policy
```

其中 credential 仍然是 handle/review status，不允许 Node 读取 credential value。

## 八个 no-go 条件

```text
CREDENTIAL_VALUE_REQUIRED
SCHEMA_MIGRATION_REQUIRED
UPSTREAM_AUTO_START_REQUIRED
APPROVAL_LEDGER_WRITE_REQUIRED
MINI_KV_STORAGE_BACKEND_REQUIRED
OWNER_ARTIFACT_MISSING
ROLLBACK_OR_ABORT_MISSING
TIMEOUT_POLICY_MISSING
```

任一条件触发，动作都是：

```text
pause-and-do-not-connect
```

## 边界

本版没有做：

```text
真实 managed audit connection
credential value 读取
schema migration SQL
approval ledger 写入
Java / mini-kv / external audit service auto-start
mini-kv managed audit storage backend
真实 adapter client
```

## 验证

聚焦验证：

```text
npm run typecheck -> passed
vitest run v251 decision record + v250 rehearsal guard -> 7 tests passed
```

最终验证将在本版收口时补入：

```text
npm test
npm run build
safe HTTP smoke
Chrome screenshot
```

## 一句话总结

Node v251 把 v250 rehearsal guard 推进为可审查的人工连接决策记录：字段和 no-go 条件齐备，但真实连接仍被硬性阻断。

## 最终验证补充

本版最终验证结果：

```text
npm run typecheck -> passed
npx vitest run test\managedAuditManualSandboxConnectionDecisionRecord.test.ts test\managedAuditManualSandboxConnectionRehearsalGuard.test.ts -> 7 tests passed
npm test -> 191 files / 641 tests passed
npm run build -> passed
safe HTTP smoke -> /health ok, v251 decision record ready, connectionAllowed=false, readsCredential=false, noGoConditionCount=8
Chrome screenshot -> c/251/图片/manual-sandbox-connection-decision-record-v251.png
```

HTTP smoke 启动的本轮 Node 服务 PID 为 `16336`，脚本结束时已停止。截图使用 Playwright + 本机 Chrome channel 打开本版静态 HTML 证据页，没有启动 Java 或 mini-kv。
