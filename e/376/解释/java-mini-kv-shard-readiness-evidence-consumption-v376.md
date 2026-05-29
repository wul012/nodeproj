# Node v376 运行说明：Java / mini-kv shard evidence consumption

## 本版目标

v376 的目标是让 Node 消费已经完成的 Java v154 和 mini-kv v145 分片就绪证据，并把它们和 Node v375 的 archive verification 串起来。

这版不是 live read，也不是打开真实分片：

```text
启动 Java: false
启动 mini-kv: false
停止 Java: false
停止 mini-kv: false
写 Java: false
写 mini-kv: false
executionAllowed: false
active sharding: disabled
```

## 实际读取的证据

Java 侧使用两个文件组合：

```text
D:/javaproj/advanced-order-platform/e/154/evidence/java-shard-readiness-hardening-v154.json
D:/javaproj/advanced-order-platform/e/153/evidence/java-shard-readiness-v153.json
```

原因是 Java v154 是 additive hardening，它不重复 `shardEnabled`、`shardCount`、`slotCount`、`routingMode` 等核心字段，而是通过 `sourceEvidencePath` 指回 Java v153 的核心证据。

mini-kv 侧使用冻结的 v145 证据：

```text
D:/C/mini-kv/fixtures/release/shard-readiness-v145.json
```

该文件内容标识为 `releaseVersion=v145`，状态为 `hardened-read-only`。不读取滚动的 `fixtures/release/shard-readiness.json`，避免 mini-kv 后续版本推进后影响 Node v376 的归档语义。

## 历史 fallback

本版新增了两个冻结 fixture：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/154/evidence/java-shard-readiness-hardening-v154.json
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v145.json
```

这些文件用于 forced historical fixture fallback：GitHub runner 或缺少本地 sibling workspace 时，Node 仍能复现 Java v154/v153 与 mini-kv v145 的只读证据消费结果。

同时把旧 v370 的 mini-kv 读取路径改为冻结的 `shard-readiness-v144.json`，避免旧版本继续读取 mini-kv 的滚动 current 文件。

## 验证结果

```text
typecheck: passed
focused v376 test: passed
v375 + v376 grouped test: passed
v370 + v376 fallback guard test: passed
build: passed
HTTP smoke: passed, route returned ready=true and 30/30 checks
browser snapshot: saved
screenshot: saved
```

归档文件：

```text
e/376/evidence/java-mini-kv-shard-readiness-evidence-consumption-v376-http.json
e/376/evidence/java-mini-kv-shard-readiness-evidence-consumption-v376-http.md
e/376/evidence/java-mini-kv-shard-readiness-evidence-consumption-v376-summary.json
e/376/evidence/java-mini-kv-shard-readiness-evidence-consumption-v376-browser-snapshot.md
e/376/java-mini-kv-shard-readiness-evidence-consumption-v376.html
e/376/图片/java-mini-kv-shard-readiness-evidence-consumption-v376.png
```

## 下一步

下一步是 Node v377：验证 v376 归档，而不是继续抢跑 Java / mini-kv 的新版本。Java 和 mini-kv 可以并行继续自己的 hardening，Node 后续只消费已经完成的新证据。
