# 290 - ops promotion archive deployment builders split（Node v285）

## 版本定位

Node v285 是第二个连续质量优化版，承接 v284 的类型族拆分。

v284 已经把 `opsPromotionArchiveBundleTypes.ts` 从 1800+ 行压成 barrel；v285 处理另一个大文件 `src/services/opsPromotionArchiveDeploymentBuilders.ts`。

## 原始问题

原文件约 1564 行，里面混合了三类职责：

```text
deployment approval / change record builder
deployment execution / receipt / audit trail builder
digest payload helper
```

这些逻辑都服务 promotion archive deployment 链路，但职责层次不同。builder 负责组装证据对象，digest payload helper 负责稳定摘要输入，两者放在同一个文件里会让后续审计字段变更变重。

## 新结构

原文件保留为 barrel：

```ts
export * from "./opsPromotionArchiveDeploymentApprovalBuilders.js";
export * from "./opsPromotionArchiveDeploymentExecutionBuilders.js";
```

新增三个文件：

```text
opsPromotionArchiveDeploymentApprovalBuilders.ts
opsPromotionArchiveDeploymentExecutionBuilders.ts
opsPromotionArchiveDeploymentDigestPayloads.ts
```

其中 `opsPromotionArchiveDeploymentDigestPayloads.ts` 显式导出：

```ts
export function archiveDeploymentApprovalDigestPayload(...)
export function archiveDeploymentChangeRecordDigestPayload(...)
export function archiveDeploymentExecutionRecordDigestPayload(...)
export function archiveDeploymentExecutionReceiptDigestPayload(...)
export function archiveReleaseAuditTrailDigestPayload(...)
```

## 验证中发现的问题

第一次拆分后，`digest payload helper` 仍是普通 `function`，子 builder 文件导入时 TypeScript 报错：

```text
Module declares archiveDeploymentApprovalDigestPayload locally, but it is not exported.
```

同时 promotion archive route 测试出现 500。修正方式是把这些 helper 改成显式 `export function`。这是拆分边界问题，不是业务逻辑变化。

## 验证

已执行：

```bash
npm run typecheck
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/opsPromotionDecision.test.ts
npm run build
```

`opsPromotionDecision.test.ts` 覆盖 promotion archive 从 bundle、handoff、release 到 deployment 的 JSON / Markdown 路由，因此能证明旧导入路径和输出行为没有被拆分破坏。

## 项目进度影响

Node v284/v285 两个质量版已经把当前最明显的 1500+ TypeScript 大文件压下去。下一步可以按计划回到功能主线，由 Node v286 消费 Java v121 + mini-kv v126 做三方 plan echo verification。
