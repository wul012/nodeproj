# OrderOps Node 计划文档目录 3

`docs/plans3/` 是 `docs/plans/`、`docs/plans2/` 的同级续写目录。从 Node v368 起，新的计划文档继续写入这里，避免旧计划目录继续膨胀。

## 当前有效入口

```text
docs/plans3/v395-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification-roadmap.md
```

上一入口：

```text
Node v395 已完成 v394 runtime execution artifact intake preflight archive verification。
docs/plans3/v395-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification-roadmap.md
Node v394 已完成 runtime execution artifact intake preflight。
docs/plans3/v394-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-roadmap.md
Node v393 已完成 v392 runtime execution packet stop record archive verification。
docs/plans3/v393-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification-roadmap.md
Node v392 已完成 runtime execution packet stop record。
docs/plans3/v392-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-roadmap.md
Node v391 正在进行 v390 declared operator lifecycle runtime live-read gate plan archive verification。
docs/plans3/v391-post-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification-roadmap.md
Node v390 已完成 separate runtime live-read gate plan。
docs/plans3/v390-post-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-roadmap.md
Node v389 已完成 Java / mini-kv declared operator lifecycle evidence intake archive verification。
docs/plans3/v389-post-java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification-roadmap.md
Node v388 已完成 Java v161 + mini-kv v152 declared operator lifecycle evidence intake。
docs/plans3/v388-post-java-mini-kv-declared-operator-lifecycle-evidence-intake-roadmap.md
Node v387 已完成 Java / mini-kv operator service lifecycle evidence intake archive verification。
docs/plans3/v387-post-java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification-roadmap.md
Node v386 已完成 Java v160 + mini-kv v151 operator service lifecycle evidence intake。
docs/plans3/v386-post-java-mini-kv-operator-service-lifecycle-evidence-intake-roadmap.md
Node v385 已完成 Java / mini-kv live-read gate plan intake archive verification。
docs/plans3/v385-post-java-mini-kv-live-read-gate-plan-intake-archive-verification-roadmap.md
Node v384 已完成 Java v159 + mini-kv v150 live-read gate plan intake。
docs/plans3/v384-post-java-mini-kv-live-read-gate-plan-intake-roadmap.md
Node v383 已完成 Java / mini-kv active shard plan boundary handoff intake archive verification。
docs/plans3/v383-post-java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-roadmap.md
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
Node v395 已完成 v394 runtime execution artifact intake preflight archive verification。
当前 readyForRuntimeExecutionPacket=false、readyForRuntimeLiveReadGate=false：v395 只校验 v394 blocked preflight 归档，不启动 Java / mini-kv。
下一步 Node v396 只有在六项真实 runtime execution artifacts 出现时才应继续；Java / mini-kv 推荐并行继续，Node 不是上游 pre-approval blocker。
```

历史 v274 及以前的计划保留在 `docs/plans/`；v275-v367 保留在 `docs/plans2/`。
