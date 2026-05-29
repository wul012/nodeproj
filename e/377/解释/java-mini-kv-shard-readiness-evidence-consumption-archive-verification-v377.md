# Node v377 运行说明：Java / mini-kv shard evidence archive verification

## 本版目标

v377 的目标是验证 v376 的归档是否完整、可复现、可在 GitHub runner 场景下通过 forced historical fallback 回放。

它不是 live read，也不推进真实分片：

```text
启动 Java: false
启动 mini-kv: false
停止 Java: false
停止 mini-kv: false
写 Java: false
写 mini-kv: false
rerunsLiveRead: false
executionAllowed: false
```

## 验证范围

本版检查 `e/376` 的 11 个归档引用：

```text
JSON evidence
Markdown evidence
summary
browser snapshot
HTML archive
screenshot
解释文档
代码讲解
source plan
plans index
archive index
```

同时强制设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，重新加载 v376，确认 Java v154/v153 与 mini-kv v145 都能走历史 fixture。mini-kv 读取的是冻结文件：

```text
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v145.json
```

不是滚动 current 文件 `shard-readiness.json`。

## 结果

```text
archiveVerificationState: java-mini-kv-shard-readiness-evidence-consumption-archive-verified
archiveVerificationDecision: archive-java-mini-kv-shard-evidence-consumption-and-prepare-v378
Archive files: 11/11
Checks: 30/30
Forced fallback replay: 30/30
Production blockers: 0
```

## 验证命令

```text
npm run typecheck: passed
v370 + v376 + v377 focused group: 3 files / 11 tests passed
npm run build: passed
HTTP smoke: passed, JSON ready=true, 30/30 checks, Markdown 200
Playwright MCP screenshot: saved
Playwright MCP browser snapshot: saved
```

## 截图与浏览器验证

本版使用 Playwright MCP 打开本地静态 HTML：

```text
http://127.0.0.1:4397/e/377/java-mini-kv-shard-readiness-evidence-consumption-archive-verification-v377.html
```

已保存：

```text
e/377/evidence/java-mini-kv-shard-readiness-evidence-consumption-archive-verification-v377-browser-snapshot.md
e/377/图片/java-mini-kv-shard-readiness-evidence-consumption-archive-verification-v377.png
```

截图中的核心字段包括 `Archive verification state`、`Ready for Node v378 completed evidence intake`、`Reruns live read: false`、`Starts Java service: false` 和 `Starts mini-kv service: false`。

## 下一步

下一步不是继续抢跑 Node 治理链，而是等待或消费已经完成的 Java / mini-kv 新证据。Java 和 mini-kv 可以并行推进；Node v378 只读取完成并冻结的证据。
