# Node v381 运行说明：active shard plan evidence intake archive verification

v381 验证 v380 的 active shard plan evidence intake 归档，并重新从 frozen historical evidence 回放 v380 service。它不启动 Java / mini-kv，不执行 live read，也不启用 active shard prototype。

## 归档文件

```text
e/381/evidence/java-mini-kv-active-shard-plan-evidence-intake-archive-verification-v381-http.json
e/381/evidence/java-mini-kv-active-shard-plan-evidence-intake-archive-verification-v381-http.md
e/381/evidence/java-mini-kv-active-shard-plan-evidence-intake-archive-verification-v381-summary.json
e/381/evidence/java-mini-kv-active-shard-plan-evidence-intake-archive-verification-v381-browser-snapshot.md
e/381/java-mini-kv-active-shard-plan-evidence-intake-archive-verification-v381.html
e/381/图片/java-mini-kv-active-shard-plan-evidence-intake-archive-verification-v381.png
```

## 验证目标

```text
Archive root: e/380
Archive files: 11/11
Replay from frozen evidence: 33/33
Java evidence: Java v157 handoff
mini-kv evidence: v147 frozen activePrototypePlan snapshot
Active shard prototype enabled: false
Production blockers: 0
```

## 验证结果

```text
Focused v381 test: 1 file / 3 tests passed
Adjacent v380+v381 tests: 2 files / 7 tests passed
Typecheck: passed
Build: passed
Full test: 314 files / 1088 tests passed
HTTP smoke: JSON 200, Markdown 200, ready=true, checks=33/33, replay=33/33, active=false
```

## 边界

```text
startsJavaService=false
startsMiniKvService=false
stopsJavaService=false
stopsMiniKvService=false
executionAllowed=false
activeShardPrototypeEnabled=false
connectsManagedAudit=false
credentialValueRead=false
rawEndpointUrlParsed=false
```

## 浏览器验证

Playwright MCP 用临时静态服务器访问 `java-mini-kv-active-shard-plan-evidence-intake-archive-verification-v381.html`，生成 browser snapshot 和 full-page screenshot。临时服务器验证后已停止。

## 下一步

没有新的完成冻结证据或明确 live-read gate 服务启停计划时，Node 应暂停。Java / mini-kv 可并行继续，不需要等待 Node。
