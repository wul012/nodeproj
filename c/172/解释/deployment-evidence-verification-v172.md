# Node v172 运行调试说明

## 版本目标

Node v172 做 `deployment evidence verification`，负责复核 Node v171 的 `deployment evidence intake gate`。本版不新增 Java / mini-kv 上游证据，也不启动、停止、构建、测试或修改另外两个项目。

本版验证范围：

- v171 intake digest 与 source summary digest 必须是有效 SHA-256。
- Java v60 deployment runbook contract 必须保留 deployment window、rollback approver、migration、secret boundary 和 no-execution 字段。
- mini-kv v69 release artifact digest package 必须保留 binary / WAL / Snapshot / fixture digest、restore drill、operator confirmation 和 order authority boundary。
- Node 仍保持 `UPSTREAM_ACTIONS_ENABLED=false`，不触发 deployment、rollback、SQL、secret、database、restore 或上游自动启动。

## 运行入口

新增接口：

```text
GET /api/v1/production/deployment-evidence-verification
GET /api/v1/production/deployment-evidence-verification?format=markdown
```

本轮 HTTP smoke 使用本地 Node 服务，仅访问 Node 自身接口；安全环境变量保持：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_AUTH_MODE=rehearsal
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
```

浏览器截图阶段关闭 access guard，仅用于把 Markdown evidence 页面渲染成截图，不放开任何上游动作。

## 验证命令

本版需要完成：

```text
npm run typecheck
npx vitest run test/deploymentEvidenceVerification.test.ts test/deploymentEvidenceIntakeGate.test.ts
npm test
npm run build
HTTP smoke
Chrome screenshot
```

## 预期结果

核心预期：

```text
profileVersion = deployment-evidence-verification.v1
verificationState = ready-for-manual-deployment-evidence-verification
readyForDeploymentEvidenceVerification = true
readyForProductionDeployment = false
readyForProductionRollback = false
readyForProductionOperations = false
executionAllowed = false
summary.checkCount = 22
summary.passedCheckCount = 22
```

本版完成后，计划下一步不是 Node 抢跑，而是推荐并行推进 Java v61 + mini-kv v70，给 Node v173 的 release window readiness packet 提供新的上游证据。
