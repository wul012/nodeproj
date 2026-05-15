# 第一百九十二版：opsPromotionArchiveBundle step/validation split phase 4（v188）

## 模块角色

`opsPromotionArchiveBundle` 是 Node 控制面中最重的发布证据链模块。v186 已经把类型拆到 `opsPromotionArchiveBundleTypes.ts`，v187 已经把 digest payload 拆到 `opsPromotionArchiveDigestPayloads.ts`。v188 继续拆第三块：step/item 构造和 validation/nextActions 决策。

## 本版所处项目进度

用户指出 v186+v187 后如果 `opsPromotionArchiveBundle.ts` 仍超过 5000 行，就不应该直接跳到 v188 real HTTP read adapter，而应追加 phase 4。这个判断合理，因为真实 HTTP 会引入上游状态、错误处理和运行窗口，如果此时主模块仍过大，后续维护风险会继续放大。

所以本版先修正 plan，再执行新的 Node v188：step/validation split phase 4。

## 核心流程

```text
v187 后：
  opsPromotionArchiveBundle.ts
  opsPromotionArchiveBundleTypes.ts
  opsPromotionArchiveDigestPayloads.ts

v188 后：
  opsPromotionArchiveBundle.ts              -> 主流程 / create / render 编排
  opsPromotionArchiveBundleTypes.ts         -> 类型定义
  opsPromotionArchiveDigestPayloads.ts      -> digest 输入规范
  opsPromotionArchiveSteps.ts               -> items / steps 构造
  opsPromotionArchiveValidation.ts          -> state / nextActions / reference checks
```

## 关键代码讲解

### 1. 主文件从 helper 模块导入 step 构造函数

文件：[opsPromotionArchiveBundle.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveBundle.ts:72)

```ts
import {
  archiveDeploymentApprovalItems,
  archiveDeploymentChangeRecordItems,
  archiveDeploymentExecutionReceiptItems,
```

这说明主文件不再直接保存 deployment/handoff/release/audit 的 item 构造细节，而是只负责调用这些 helper 参与主流程编排。

### 2. steps 模块负责证据项构造

文件：[opsPromotionArchiveSteps.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveSteps.ts:43)

```ts
export function archiveHandoffPackageAttachments(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
```

`archiveHandoffPackageAttachments` 会根据 bundle、manifest、verification、attestation 生成 handoff package 的附件证据。v188 只是移动位置，函数输入输出保持原样。

### 3. validation 模块负责 nextActions 和状态判断

文件：[opsPromotionArchiveValidation.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveValidation.ts:49)

```ts
export function archiveVerificationNextActions(
  manifestDigestValid: boolean,
  artifactsValid: boolean,
  manifest: OpsPromotionArchiveManifest,
): string[] {
```

这类函数决定失败时返回什么 nextActions。把它们从主文件中拆出，可以让后续报告/render 拆分更干净，也减少主流程和决策文案缠在一起的问题。

### 4. archive state 也被移入 validation 模块

文件：[opsPromotionArchiveValidation.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveValidation.ts:717)

```ts
export function archiveState(
  integrity: OpsPromotionDecisionLedgerIntegrity,
  latestEvidence: OpsPromotionEvidenceReport | undefined,
): OpsPromotionArchiveState {
```

`archiveState` 是 archive bundle 的核心状态判断。它被放入 validation 模块后，主文件只调用结果，不再内联保存状态规则。

### 5. 主文件调用点不变

文件：[opsPromotionArchiveBundle.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveBundle.ts:195)

```ts
const state = archiveState(input.integrity, input.latestEvidence);
```

这行说明 v188 没有重写主业务流程，只是把 helper 所在位置迁移了。现有边界测试继续保护 manifest digest、artifact digest、summary 和 nextActions。

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
c/188/图片
c/188/解释
代码讲解记录_生产雏形阶段/192-ops-promotion-archive-step-validation-split-v188.md
```

成熟度变化：Node 控制面的最大技术债继续收缩，发布证据链已经形成 types、digest payload、steps、validation 四类独立模块。主文件仍约 5658 行，所以下一步 plan 仍应继续拆 render/report。

## 一句话总结

v188 合理响应“不要过早跳 real HTTP”的建议，先把 step/validation helper 从巨型文件里拆出，让真实能力落地前的核心模块更可维护。
