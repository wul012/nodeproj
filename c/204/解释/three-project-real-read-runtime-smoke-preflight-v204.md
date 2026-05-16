# Node v204 three-project real-read runtime smoke preflight

## 本版判断

v203 已经把 Node v202、Java v72、mini-kv v81 的 artifact retention 证据统一进 retention gate。v204 开始转向真实只读联调，但本版只做联调预检，不实际读取 Java 或 mini-kv。

这版的价值是把 v205 真正联调前必须明确的内容固化下来：只读目标、端口、进程启动/停止责任、失败分类和禁止命令。

## 本版范围

新增：

```text
GET /api/v1/production/three-project-real-read-runtime-smoke-preflight
GET /api/v1/production/three-project-real-read-runtime-smoke-preflight?format=markdown
```

核心输出：

```text
sourceRetentionGate
runtimeWindow
readTargets
commandPolicy
processPlan
failureTaxonomy
productionBlockers
```

## 安全边界

```text
realRuntimeSmokeExecutedInV204=false
automaticUpstreamStart=false
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
```

## 联调目标

```text
Node：GET /health
Node：GET /api/v1/production/cross-project-ci-artifact-retention-gate
Java：GET /actuator/health
Java：GET /api/v1/ops/release-approval-rehearsal
mini-kv：SMOKEJSON
mini-kv：INFOJSON
mini-kv：STORAGEJSON
mini-kv：HEALTH
```

## 验证结果

```text
npm run typecheck：通过
聚焦测试：2 files / 7 tests 通过
本机 Chrome 截图：通过，见 c/204/图片/three-project-real-read-runtime-smoke-preflight-v204.png
npm test：146 files / 499 tests 通过
npm run build：通过
Node HTTP smoke：通过，/api/v1/production/three-project-real-read-runtime-smoke-preflight JSON/Markdown 均返回 200
```

HTTP smoke 临时 Node 服务 PID `25916` 已停止。本轮没有启动 Java 或 mini-kv。

## 下一步

按计划下一步不是 Node 抢跑 v205，而是推荐并行：

```text
Java v73 + mini-kv v82
```

两边补真实只读联调友好字段后，Node v205 再执行真实三项目只读 runtime smoke。
