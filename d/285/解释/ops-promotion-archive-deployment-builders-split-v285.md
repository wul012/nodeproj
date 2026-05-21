# Node v285 运行说明：ops promotion archive deployment builders split

## 本版目标

本版继续质量优化，不新增 managed audit 功能，不改变 API 路径、JSON shape 或 Markdown 输出。

目标是拆分 `src/services/opsPromotionArchiveDeploymentBuilders.ts`。该文件原先约 1564 行，同时承载 deployment approval、change record、execution record、receipt、audit trail 和 digest payload helper。

## 拆分结果

```text
src/services/opsPromotionArchiveDeploymentBuilders.ts           barrel re-export
src/services/opsPromotionArchiveDeploymentApprovalBuilders.ts   approval / change record builders
src/services/opsPromotionArchiveDeploymentExecutionBuilders.ts  execution / receipt / audit trail builders
src/services/opsPromotionArchiveDeploymentDigestPayloads.ts     deployment digest payload helpers
```

## 行为边界

- 保留原导入路径 `./opsPromotionArchiveDeploymentBuilders.js`。
- 保留原 builder 函数名。
- 保留 digest payload 字段顺序和 coveredFields。
- 不启动 Java / mini-kv。
- 不读取 credential value，不解析 raw endpoint URL，不打开 managed audit connection。

## 验证

```bash
npm run typecheck
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/opsPromotionDecision.test.ts
npm run build
```

第一次验证发现 digest payload helper 拆出后未导出，会导致 promotion archive 路由 500；已修正为显式 `export function`，随后验证通过。
