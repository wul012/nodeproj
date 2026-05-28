# OrderOps Node 计划文档目录 3

`docs/plans3/` 是 `docs/plans/`、`docs/plans2/` 的同级续写目录。从 Node v368 起，新的计划文档继续写入这里，避免旧计划目录继续膨胀。

## 当前有效入口

```text
docs/plans3/v369-post-operator-ci-regular-gate-handoff-roadmap.md
```

## 当前状态

```text
Node v369 已完成 operator/CI regular gate handoff，并冻结 read-only-integration.v1 与 shard-readiness.v1。
下一步推荐并行推进 mini-kv shard readiness prototype + Java shard readiness echo。
Node v370 只有在两边都发布只读 shard readiness 证据后才继续消费和 gate。
```

历史 v274 及以前的计划保留在 `docs/plans/`；v275-v367 保留在 `docs/plans2/`。
