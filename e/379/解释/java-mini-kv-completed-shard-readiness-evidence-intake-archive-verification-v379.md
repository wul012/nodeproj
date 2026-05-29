# Node v379 运行说明：completed shard evidence intake archive verification

## 本版目标

v379 的目标是验证 v378 的 completed shard-readiness evidence intake 归档是否完整，并确认它可以从冻结证据重新回放。

本版仍不做 live read：

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

本版检查 `e/378` 的 11 个归档引用：

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

同时重新调用 v378 service，验证 Java v156、Java v155 和 mini-kv v146 都从 Node historical fixture 读取，mini-kv 仍是冻结的 `shard-readiness-v146.json`。

## 结果

```text
archiveVerificationState: java-mini-kv-completed-shard-readiness-evidence-intake-archive-verified
archiveVerificationDecision: archive-completed-shard-evidence-intake-and-prepare-v380
Archive files: 11/11
Checks: 31/31
Replay: 38/38
Production blockers: 0
```

## 验证命令

```text
npm run typecheck: passed
v379 focused test: passed
v378 + v379 adjacent test: 2 files / 7 tests passed
npm run build: passed
HTTP smoke: passed, ready=true, 31/31 checks, Markdown 200
Playwright MCP screenshot: saved
Playwright MCP browser snapshot: saved
```

## 下一步

下一步是 Node v380，但只有两种合理入口：消费 Java / mini-kv 新的完成冻结证据，或者显式写 live-read gate 计划。否则 Node 应暂停，不继续堆治理链。
