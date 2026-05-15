# 第一百九十版：opsPromotionArchiveBundle type split phase 2（v186）

## 模块角色

`opsPromotionArchiveBundle` 是 Node 控制面里发布证据链最重的模块之一。它负责把 approval decision ledger、latest evidence、archive manifest、handoff package、release archive、deployment approval、execution receipt、audit trail 等对象串成可校验的生产发布证据链。

到 v185 为止，这个模块已经承载太多职责：类型定义、构造函数、digest payload、verification、Markdown render、nextActions 都挤在同一个文件里。v186 先拆最安全的一层：类型定义。

## 本版所处项目进度

当前项目已经从“证据/契约/治理层建设”转入“真实能力落地 + 可维护性优化”阶段。用户特别要求关注 `opsPromotionArchiveBundle.ts` 的拆分，因为它已经成为 Node 侧最大技术债。

v186 的价值不是新增 endpoint，而是给后续生产级推进降低维护风险：先把 68 个公开类型从实现文件中移走，同时保证外部 import 路径不变。

## 核心流程

```text
原来：opsPromotionArchiveBundle.ts
  -> import 上游类型
  -> 定义 68 个 type/interface
  -> create/render/digest/verification 实现

现在：opsPromotionArchiveBundleTypes.ts
  -> 专门保存 archive bundle 类型族

现在：opsPromotionArchiveBundle.ts
  -> import type from opsPromotionArchiveBundleTypes.ts
  -> export type from opsPromotionArchiveBundleTypes.ts
  -> 保留 create/render/digest/verification 实现
```

## 关键代码讲解

### 1. 新 types 模块承接公开类型

文件：[opsPromotionArchiveBundleTypes.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveBundleTypes.ts:1)

```ts
import type { OpsPromotionDecisionLedgerIntegrity } from "./opsPromotionDecision.js";
import type { OpsPromotionEvidenceReport } from "./opsPromotionEvidenceReport.js";
import type { OpsPromotionDecision } from "./opsPromotionReview.js";
```

这三个 import 说明 types 模块不是“孤立 DTO 文件”，它仍然准确表达 archive bundle 与 decision ledger、evidence report、approval decision 的类型关系。

### 2. archive bundle 根类型被独立保存

文件：[opsPromotionArchiveBundleTypes.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveBundleTypes.ts:7)

```ts
export interface OpsPromotionArchiveBundle {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  state: OpsPromotionArchiveState;
```

`OpsPromotionArchiveBundle` 是整条 archive 证据链的根对象。v186 没有改变字段，只把定义位置移动到 types 模块，所以 JSON 契约不会漂移。

### 3. 实现文件只导入类型，不复制类型定义

文件：[opsPromotionArchiveBundle.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveBundle.ts:3)

```ts
import type {
  OpsPromotionArchiveState,
  OpsPromotionArchiveArtifactType,
  OpsPromotionArchiveBundle,
```

这里让实现文件继续获得完整类型约束，但不再把 1800 多行类型定义放在同一个文件里。后续拆 digest、validation、render 时，边界会更清楚。

### 4. 原公开 import 路径保持兼容

文件：[opsPromotionArchiveBundle.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveBundle.ts:75)

```ts
export type {
  OpsPromotionArchiveState,
  OpsPromotionArchiveArtifactType,
  OpsPromotionArchiveBundle,
```

这段 re-export 很关键。外部代码如果仍然从 `opsPromotionArchiveBundle.ts` 引入类型，不需要改路径。v186 是内部结构优化，不制造下游迁移成本。

### 5. 构造函数行为保持不变

文件：[opsPromotionArchiveBundle.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveBundle.ts:146)

```ts
export function createOpsPromotionArchiveBundle(input: {
  integrity: OpsPromotionDecisionLedgerIntegrity;
  latestEvidence?: OpsPromotionEvidenceReport;
}): OpsPromotionArchiveBundle {
```

函数签名仍然使用同样的 ledger/evidence 输入，返回同样的 `OpsPromotionArchiveBundle`。这证明 v186 没有把结构拆分变成行为变更。

## 验证

```text
npm run typecheck
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/stableDigest.test.ts test/realReadRehearsalIntake.test.ts
npm test
npm run build
```

结果：全部通过。

## 归档和成熟度变化

本版归档到：

```text
c/186/图片
c/186/解释
代码讲解记录_生产雏形阶段/190-ops-promotion-archive-bundle-type-split-phase-2-v186.md
```

成熟度变化：Node 控制面继续从“功能堆叠”转向“可维护的生产雏形”。`opsPromotionArchiveBundle.ts` 仍然偏大，但类型层已经独立，下一步可以更安全地拆 digest payload helper。

## 一句话总结

v186 把 archive bundle 类型族从巨型实现文件中剥离出来，保持契约不变，同时为 v187 的 digest payload 拆分打地基。
