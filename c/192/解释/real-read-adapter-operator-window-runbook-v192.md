# Node v192：real-read adapter operator window runbook

## 本版判断

v191 已经提供默认关闭的真实只读 adapter rehearsal，但它还只是一个可读取结果的入口。v192 补的是人工操作窗口说明：谁启动 Java/mini-kv、Node 用哪些环境变量、读哪些 endpoint/command、如何停止和归档。

本版不启动 Java，不启动 mini-kv，不执行任何上游写操作。

## 本版目标

新增：

```text
GET /api/v1/production/real-read-adapter-operator-window-runbook
GET /api/v1/production/real-read-adapter-operator-window-runbook?format=markdown
```

它把 v191 的五个只读探针组织成操作员窗口：

```text
Java GET /actuator/health
Java GET /api/v1/ops/overview
mini-kv HEALTH
mini-kv INFOJSON
mini-kv STATSJSON
```

## 安全边界

- `UPSTREAM_PROBES_ENABLED=true` 只允许在人工窗口中开启。
- `UPSTREAM_ACTIONS_ENABLED=false` 必须保持。
- Java / mini-kv 由操作者手动启动和停止。
- Node 不自动启动或停止上游。
- rehearsal pass 仍不是生产操作授权。

## 注入调试结果

```json
{
  "profileVersion": "real-read-adapter-operator-window-runbook.v1",
  "runbookState": "ready-for-manual-window",
  "ready": true,
  "steps": 5,
  "allowedReads": 5,
  "blockers": 0
}
```

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterOperatorWindowRunbook.test.ts test/realReadAdapterRehearsal.test.ts：2 files / 6 tests 通过
npm test：134 files / 459 tests 通过
npm run build：通过
```

## 下一步

按计划，Node v192 完成后不要抢跑 v193。下一步推荐并行：

```text
Java v68 + mini-kv v77
```

它们补失败分类证据后，再由 Node v193 消费并做 real-read adapter failure taxonomy。
