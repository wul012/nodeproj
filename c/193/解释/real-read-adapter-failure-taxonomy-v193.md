# Node v193：real-read adapter failure taxonomy

## 本版判断

Java v68 和 mini-kv v77 已完成并推送，满足 v191 计划中 Node v193 的依赖。v193 因此继续推进 Node 自己的真实只读 adapter failure taxonomy。

本版不启动 Java，不启动 mini-kv，不新增写操作。

## 本版目标

新增：

```text
GET /api/v1/production/real-read-adapter-failure-taxonomy
GET /api/v1/production/real-read-adapter-failure-taxonomy?format=markdown
```

它消费：

```text
Node v191 real-read adapter rehearsal
Node v192 operator window runbook
Java v68 release approval failure taxonomy
mini-kv v77 runtime smoke failure taxonomy
```

## 分类范围

```text
closed-window
connection-refused
timeout
invalid-json
unsafe-surface
unexpected-write-signal
passed-read
unclassified-upstream-error
```

## 注入调试结果

```json
{
  "profileVersion": "real-read-adapter-failure-taxonomy.v1",
  "taxonomyState": "closed-window-classified",
  "ready": true,
  "classifications": 5,
  "closedWindow": 5,
  "blockers": 0,
  "javaEvidence": "Java v68",
  "miniKvEvidence": "mini-kv v77"
}
```

## 安全边界

- 默认 `UPSTREAM_PROBES_ENABLED=false`，不会访问上游。
- `UPSTREAM_ACTIONS_ENABLED=false` 必须保持。
- Node 不自动启动 Java / mini-kv。
- unsafe surface 和 unexpected write signal 会被 blocker 处理。
- 分类结果不等于生产操作授权。

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts：3 files / 10 tests 通过
npm test：135 files / 463 tests 通过
npm run build：通过
```

## 下一步

按计划，下一步是 Node v194：real-read adapter evidence archive。它会把 v191/v193 的结果固化成可归档 bundle，仍不授权生产操作。
