# Node v174 运行调试说明

## 版本目标

Node v174 做 `production release dry-run envelope`。它消费 Node v173 的 `release window readiness packet`，生成发布前 dry-run envelope。

本版不执行真实 release、deployment、rollback、restore、SQL，不读取 production secret，不连接 production database，也不启动 Java 或 mini-kv。

## 运行入口

新增接口：

```text
GET /api/v1/production/release-dry-run-envelope
GET /api/v1/production/release-dry-run-envelope?format=markdown
```

HTTP smoke 使用安全环境变量：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_AUTH_MODE=rehearsal
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
```

截图阶段只关闭 access guard 以渲染 Markdown 页面，仍保持 `UPSTREAM_ACTIONS_ENABLED=false`。

## 验证命令

```text
npm run typecheck
npx vitest run test/productionReleaseDryRunEnvelope.test.ts test/releaseWindowReadinessPacket.test.ts
npm test
npm run build
HTTP smoke
Chrome screenshot
```

## 预期结果

```text
profileVersion = production-release-dry-run-envelope.v1
envelopeState = ready-for-manual-production-release-dry-run
readyForProductionReleaseDryRunEnvelope = true
readyForProductionRelease = false
readyForProductionDeployment = false
readyForProductionRollback = false
readyForProductionOperations = false
executionAllowed = false
summary.checkCount = 24
summary.passedCheckCount = 24
```

完成后下一步不是 Node 抢跑，而是推荐并行 Java v62 + mini-kv v71，补各自 handoff checklist fixture。
