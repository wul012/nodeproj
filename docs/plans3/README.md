# OrderOps Node 计划文档目录 3

`docs/plans3/` 是 `docs/plans/`、`docs/plans2/` 的同级续写目录。从 Node v368 起，新的计划文档继续写入这里，避免旧计划目录继续膨胀。

## 当前有效入口

```text
docs/plans3/v372-post-minimal-shard-readiness-live-read-archive-verification-roadmap.md
```

上一入口：

```text
docs/plans3/v371-post-minimal-shard-readiness-live-read-gate-roadmap.md
```

## 当前状态

```text
Node v372 已完成 minimal shard readiness live-read archive verification，验证 v371 归档完整，不重新读取 Java / mini-kv。
下一步 Node v373 是 shard readiness compatibility report，消费 v370 静态证据、v371 live-read 归档和 v372 archive verification。
Java / mini-kv 可并行继续做 shard readiness hardening；Node 不作为它们的前置审批中心。
```

历史 v274 及以前的计划保留在 `docs/plans/`；v275-v367 保留在 `docs/plans2/`。
