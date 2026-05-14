# Node v171 运行调试说明

## 本版目标

Node v171 新增 `deployment evidence intake gate`，消费 Java v60 production deployment runbook contract 和 mini-kv v69 release artifact digest package。

## 安全边界

本版只操作 Node 项目：

- 不启动 Java。
- 不启动 mini-kv。
- 不修改 Java / mini-kv。
- 不执行部署、回滚、SQL、LOAD、COMPACT、SETNXEX 或 restore。
- `UPSTREAM_PROBES_ENABLED=false`
- `UPSTREAM_ACTIONS_ENABLED=false`

## 新增 endpoint

```text
GET /api/v1/production/deployment-evidence-intake-gate
GET /api/v1/production/deployment-evidence-intake-gate?format=markdown
```

## 验证项目

计划执行：

- `npm run typecheck`
- `npx vitest run test/deploymentEvidenceIntakeGate.test.ts`
- `npm test`
- `npm run build`
- Node HTTP smoke
- 本机 Chrome / Playwright 截图

## 预期结果

- `gateState=ready-for-manual-deployment-evidence-review`
- `readyForDeploymentEvidenceIntakeGate=true`
- `readyForProductionDeployment=false`
- `readyForProductionRollback=false`
- `readyForProductionOperations=false`
- `executionAllowed=false`

下一步是 Node v172：deployment evidence verification。
