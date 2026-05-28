# OrderOps Node 计划文档目录 3

`docs/plans3/` 是 `docs/plans/`、`docs/plans2/` 的同级续写目录。从 Node v368 起，新的计划文档继续写入这里，避免旧计划目录继续膨胀。

## 当前唯一有效入口

```text
docs/plans3/v368-post-minimal-read-only-integration-gate-execution-archive-verification-roadmap.md
```

## 当前状态

```text
Node v368 已完成 minimal read-only gate execution archive verification；11/11 archive files present，42/42 checks passed，未重跑 Java / mini-kv probe。
下一步 Node v369 做 operator/CI regular gate handoff + contract freeze。
v369 之后推荐 mini-kv shard readiness prototype 与 Java shard readiness echo 并行推进，Node 只做契约消费者和联调门禁。
```

历史 v274 及以前的计划保留在 `docs/plans/`；v275-v367 保留在 `docs/plans2/`。
