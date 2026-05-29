# OrderOps Node 计划文档目录 3

`docs/plans3/` 是 `docs/plans/`、`docs/plans2/` 的同级续写目录。从 Node v368 起，新的计划文档继续写入这里，避免旧计划目录继续膨胀。

## 当前有效入口

```text
docs/plans3/v382-post-java-mini-kv-active-shard-plan-boundary-handoff-intake-roadmap.md
```

上一入口：

```text
Node v382 已完成 Java v158 + mini-kv v149 active shard plan boundary handoff intake。
docs/plans3/v382-post-java-mini-kv-active-shard-plan-boundary-handoff-intake-roadmap.md
Node v381 已完成 Java / mini-kv active shard plan evidence intake archive verification。
docs/plans3/v381-post-java-mini-kv-active-shard-plan-evidence-intake-archive-verification-roadmap.md
Node v380 已完成 Java v157 + mini-kv v147 active shard plan evidence intake。
docs/plans3/v380-post-java-mini-kv-active-shard-plan-evidence-intake-roadmap.md
Node v379 已完成 Java / mini-kv completed shard-readiness evidence intake archive verification。
docs/plans3/v379-post-java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification-roadmap.md
Node v378 已完成 Java v156/v155 + mini-kv v146 completed shard-readiness evidence intake。
docs/plans3/v378-post-java-mini-kv-completed-shard-readiness-evidence-intake-roadmap.md
Node v377 已完成 Java / mini-kv shard-readiness evidence consumption archive verification。
docs/plans3/v377-post-java-mini-kv-shard-readiness-evidence-consumption-archive-verification-roadmap.md
Node v376 已完成 Java v154 + mini-kv v145 shard-readiness evidence consumption。
docs/plans3/v376-post-java-mini-kv-shard-readiness-evidence-consumption-roadmap.md
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
Node v382 已完成 Java v158 + mini-kv v149 boundary handoff intake。
下一步推荐 Node v383 archive verification；Java / mini-kv 仍可并行继续。
Node 不启动上游、不消费 rolling current、不打开 live-read gate。
```

历史 v274 及以前的计划保留在 `docs/plans/`；v275-v367 保留在 `docs/plans2/`。
