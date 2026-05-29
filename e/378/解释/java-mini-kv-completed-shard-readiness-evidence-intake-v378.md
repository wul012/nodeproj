# Node v378 运行说明：completed shard-readiness evidence intake

## 本版目标

v378 的目标是消费已经完成的 Java v156/v155 与 mini-kv v146 分片就绪证据，并把它们固定成 Node 可复现的冻结输入。

这版不是 live read，也不打开真实分片：

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

## 实际消费的证据

Java 侧：

```text
Java v155: e/155/evidence/java-shard-readiness-evidence-index-v155.json
Java v156: e/156/evidence/java-shard-readiness-evidence-verification-v156.json
```

v155 是 evidence index，声明 Java v153/v154 是冻结来源；v156 验证 v155 index，确认 source entry 全部 frozen、没有 rolling current pointer、所有检查通过。

mini-kv 侧：

```text
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v146.json
```

mini-kv v146 原始完成证据来自 `fixtures/release/shard-readiness.json`。为了避免后续 current 滚动污染 v378，本版在 Node historical fixture 中保存为 `shard-readiness-v146.json`，并让 v378 只读取该冻结快照。

## 结果

```text
intakeState: java-mini-kv-completed-shard-readiness-evidence-intake-ready
intakeDecision: consume-java-v156-and-mini-kv-v146-completed-evidence
Checks: 38/38
Production blockers: 0
Java verification checks: 8/8
mini-kv releaseVersion: v146
```

## 验证命令

```text
npm run typecheck: passed
v378 focused test: passed
v377 + v378 adjacent test: 2 files / 7 tests passed
npm run build: passed
HTTP smoke: passed, ready=true, 38/38 checks, Markdown 200
Playwright MCP screenshot: saved
Playwright MCP browser snapshot: saved
```

## 下一步

下一步是 Node v379：验证 v378 归档。Java 和 mini-kv 可以继续并行推进；Node 不读取未完成上游版本，只消费完成并冻结的证据。
