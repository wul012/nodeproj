# Node v173 运行调试说明

## 版本目标

Node v173 做 `release window readiness packet`。它在 Node v171、Node v172、Java v61、mini-kv v70 都完成后推进，负责把发布窗口人工 review 所需证据汇成一个只读 packet。

本版同时做一处轻量质量优化：把重复的 blocker 收集样板抽到 `releaseReportShared.ts` 的 `collectBlockingMessages()`。这不是大重构，只服务 v173 及最近报告链的可维护性。

## 输入证据

本版消费的证据：

```text
Node v171：deployment evidence intake gate
Node v172：deployment evidence verification
Java v61：rollback approval record fixture
mini-kv v70：restore drill evidence fixture
```

Node 只引用这些已完成版本的只读证据，不启动、不停止、不构建、不测试、不修改 Java 或 mini-kv。

## 运行入口

新增接口：

```text
GET /api/v1/production/release-window-readiness-packet
GET /api/v1/production/release-window-readiness-packet?format=markdown
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

本版需要完成：

```text
npm run typecheck
npx vitest run test/releaseReportShared.test.ts test/deploymentEvidenceVerification.test.ts test/releaseWindowReadinessPacket.test.ts
npm test
npm run build
HTTP smoke
Chrome screenshot
```

## 预期结果

核心预期：

```text
profileVersion = release-window-readiness-packet.v1
packetState = ready-for-manual-release-window-review
readyForReleaseWindowReadinessPacket = true
readyForProductionRelease = false
readyForProductionDeployment = false
readyForProductionRollback = false
readyForProductionOperations = false
executionAllowed = false
summary.checkCount = 36
summary.passedCheckCount = 36
```

完成后，`v169-post-production-environment-preflight-roadmap.md` 收口。下一阶段需要另起新 plan，不继续在同一份计划里追加重合版本。
