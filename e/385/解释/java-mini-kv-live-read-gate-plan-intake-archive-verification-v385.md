# Node v385 说明：Java / mini-kv live-read gate plan intake archive verification

## 结论

Node v385 已完成 v384 live-read gate plan intake archive verification。

本版本只验证归档和冻结证据重放，不启动 Java，不启动 mini-kv，不运行 runtime probe，不打开 managed audit 连接，也不启用 active shard prototype。

## 证据来源

- Node v384 JSON: `e/384/evidence/java-mini-kv-live-read-gate-plan-intake-v384-http.json`
- Node v384 Markdown: `e/384/evidence/java-mini-kv-live-read-gate-plan-intake-v384-http.md`
- Node v384 summary: `e/384/evidence/java-mini-kv-live-read-gate-plan-intake-v384-summary.json`
- Node v384 screenshot / explanation / code walkthrough / plan indexes
- Replay inputs: Java v159, mini-kv v150, and mini-kv v149 frozen historical fixtures

## 验证结果

```text
HTTP JSON: 200
HTTP Markdown: 200
readyForLiveReadGatePlanIntakeArchiveVerification: true
readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate: true
checks: 35/35
replay: ready
replay checks: 46/46
productionBlockers: 0
warningCount: 1
recommendationCount: 1
```

## 关键边界

- `archiveVerificationOnly=true`
- `rerunsLiveRead=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `stopsJavaService=false`
- `stopsMiniKvService=false`
- `executionAllowed=false`
- `activeShardPrototypeEnabled=false`
- v384 replay 继续使用 Java v159、mini-kv v150、mini-kv v149 的 historical fallback 快照。

## 浏览器检查

通过 Playwright MCP 打开本地 HTTP 静态页面：

```text
http://127.0.0.1:8385/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385.html
```

已生成：

- `e/385/evidence/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385-browser-snapshot.md`
- `e/385/图片/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385.png`

页面主体可渲染。浏览器控制台只有静态服务器默认 favicon 请求 404，不影响归档内容。

## 下一步

Node 应在 v385 后暂停，除非出现 operator-owned service lifecycle evidence。任何真实 live-read runtime gate 仍必须等待明确的 service owner、启动责任、端口、GET-only smoke target、fail-closed 行为和 cleanup 责任。
