# OrderOps Node 计划文档目录 3

`docs/plans3/` 是 `docs/plans/`、`docs/plans2/` 的同级续写目录。从 Node v368 起，新的计划文档继续写入这里，避免旧计划目录继续膨胀。

## 当前有效入口

```text
docs/plans3/v375-post-minimal-shard-readiness-regular-gate-archive-verification-roadmap.md
```

上一入口：

```text
Node v375 已完成 minimal shard readiness regular gate archive verification。
docs/plans3/v375-post-minimal-shard-readiness-regular-gate-archive-verification-roadmap.md
Node v374 已完成 minimal shard readiness regular gate。
docs/plans3/v374-post-minimal-shard-readiness-regular-gate-roadmap.md
Node v373 已完成 shard readiness compatibility report。
docs/plans3/v373-post-shard-readiness-compatibility-report-roadmap.md
Node v372 已完成 minimal shard readiness live-read archive verification。
docs/plans3/v372-post-minimal-shard-readiness-live-read-archive-verification-roadmap.md
docs/plans3/v371-post-minimal-shard-readiness-live-read-gate-roadmap.md
```

## 当前状态

```text
Node v375 已完成 minimal shard readiness regular gate archive verification，v374 归档可被后续版本消费。
下一步 Node v376 是 consume Java v154 + mini-kv v145 shard-readiness evidence。
Java / mini-kv 可并行继续后续 hardening；Node v376 只消费已完成的 v154 / v145 证据，不读取未完成版本。
```

历史 v274 及以前的计划保留在 `docs/plans/`；v275-v367 保留在 `docs/plans2/`。
