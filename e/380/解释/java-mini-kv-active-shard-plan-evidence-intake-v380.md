# Node v380 运行说明：active shard plan evidence intake

v380 消费 Java v157 handoff 和 mini-kv v147 frozen activePrototypePlan evidence。它只读冻结证据，不启动 Java / mini-kv，不执行 live read，也不启用 active shard prototype。

## 归档文件

```text
e/380/evidence/java-mini-kv-active-shard-plan-evidence-intake-v380-http.json
e/380/evidence/java-mini-kv-active-shard-plan-evidence-intake-v380-http.md
e/380/evidence/java-mini-kv-active-shard-plan-evidence-intake-v380-summary.json
e/380/evidence/java-mini-kv-active-shard-plan-evidence-intake-v380-browser-snapshot.md
e/380/java-mini-kv-active-shard-plan-evidence-intake-v380.html
e/380/图片/java-mini-kv-active-shard-plan-evidence-intake-v380.png
```

## 验证结果

```text
Focused test: 1 file / 4 tests passed
Adjacent v378-v380 tests: 3 files / 11 tests passed
Typecheck: passed
Build: passed
Full test: 313 files / 1085 tests passed
Route JSON: 200
Route Markdown: 200
HTTP smoke: JSON 200, Markdown 200, ready=true, checks=33/33, active=false
Checks: 33/33
Evidence sources: 2/2
Production blockers: 0
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

Playwright MCP 用临时静态服务器访问 `java-mini-kv-active-shard-plan-evidence-intake-v380.html`，生成 browser snapshot 和 full-page screenshot。临时服务器验证后已停止。

## 下一步

Node v381 应做 v380 archive verification，并强制 historical fixture fallback，确认 Java v157 与 mini-kv v147 都来自 Node historical fixtures。
