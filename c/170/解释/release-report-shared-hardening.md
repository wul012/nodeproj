# Node v170 运行调试说明

## 本版目标

本版是 `report shared helpers hardening`，用于收敛最近 v165-v169 报告链里重复的 check summary 与 digest 校验逻辑。

## 改动范围

- 新增 `summarizeReportChecks`，统一生成 `checkCount` / `passedCheckCount`。
- 新增 `prefixReportCheckSummary`，保持旧 JSON 字段名不变，例如 `gateCheckCount`、`passedGateCheckCount`。
- 新增 `isReleaseReportDigest`，统一校验 64 位小写 SHA-256 digest。
- 改造 v165-v169 报告链中最近几处重复统计逻辑。
- 更新计划文件，把本版明确标记为维护重构版，并把原 deployment evidence intake 顺延到 Node v171。

## 安全边界

本版没有启动 Java 或 mini-kv，没有修改它们的仓库，也没有打开 `UPSTREAM_ACTIONS_ENABLED`。

Node HTTP smoke 使用安全环境变量：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
```

截图阶段仅打开 Node 自己的 Markdown endpoint，不触发上游服务。

## 验证项目

计划执行：

- `npm run typecheck`
- `npx vitest run test/releaseReportShared.test.ts test/postV166ReadinessSummary.test.ts test/productionEnvironmentPreflightChecklist.test.ts test/rollbackExecutionPreflightContract.test.ts test/rollbackWindowReadinessChecklist.test.ts test/crossProjectReleaseBundleGate.test.ts`
- `npm test`
- `npm run build`
- Node HTTP smoke
- 本机 Chrome / Playwright 截图

## 后续计划

v170 完成后，当前全局计划仍然要求下一步推荐并行 Java v60 + mini-kv v69。等两边完成并推送后，Node v171 再消费它们的 deployment runbook / release digest evidence。
