# OrderOps Node 计划文档目录 3

`docs/plans3/` 是 `docs/plans/`、`docs/plans2/` 的同级续写目录。从 Node v368 起，新的计划文档继续写入这里，避免旧计划目录继续膨胀。

## 当前有效入口

```text
docs/plans3/v373-post-shard-readiness-compatibility-report-roadmap.md
```

上一入口：

```text
Node v372 已完成 minimal shard readiness live-read archive verification。
docs/plans3/v372-post-minimal-shard-readiness-live-read-archive-verification-roadmap.md
docs/plans3/v371-post-minimal-shard-readiness-live-read-gate-roadmap.md
```

## 当前状态

```text
Node v373 已完成 shard readiness compatibility report，v370 静态证据和 v371/v372 真实只读归档证据一致。
下一步 Node v374 是 minimal shard readiness regular gate，收束 v370-v373 证据链。
Java / mini-kv 可并行继续做 shard readiness hardening；Node 不作为它们的前置审批中心。
```

历史 v274 及以前的计划保留在 `docs/plans/`；v275-v367 保留在 `docs/plans2/`。
