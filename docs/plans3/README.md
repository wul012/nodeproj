# OrderOps Node 计划文档目录 3

`docs/plans3/` 是 `docs/plans/`、`docs/plans2/` 的同级续写目录。从 Node v368 起，新的计划文档继续写入这里，避免旧计划目录继续膨胀。

## 当前有效入口

```text
docs/plans3/v370-post-shard-readiness-contract-consumer-gate-roadmap.md
```

## 当前状态

```text
Node v370 已完成 shard readiness contract consumer gate，消费 Java v153 与 mini-kv v144 的只读证据。
下一步 Node v371 是 minimal shard readiness live-read gate。
v371 需要用户确认 Java / mini-kv 服务已经由各自项目启动；Node 不自动启动或停止两边服务。
```

历史 v274 及以前的计划保留在 `docs/plans/`；v275-v367 保留在 `docs/plans2/`。
