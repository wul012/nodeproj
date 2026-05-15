# 第一百九十四版：opsPromotionArchiveBundle profile builder split phase 6（v190）

## 模块角色

`opsPromotionArchiveBundle` 是 Node 控制面里发布证据链的核心入口。它原本同时承担 archive 基础入口、handoff 构建、release 构建、deployment 构建、digest payload、step、validation、render 等职责。v186-v189 已经拆出 types、digest、steps、validation、render，v190 继续拆剩余 profile builder 组装链。

## 本版所处项目进度

v185 已提前完成 `real-read rehearsal intake`，但它不是完整 real HTTP adapter。按真实开发流程，v190 不应该在主文件仍偏大时继续叠加真实上游读取、超时、错误分类和安全开关。

所以 v190 先把 `opsPromotionArchiveBundle.ts` 从约 3743 行压到约 544 行，让后续真实 HTTP adapter 有更清楚的落点。

## 核心流程

```text
v189 后：
  opsPromotionArchiveBundle.ts
    archive/manifest/attestation + handoff/release/deployment/audit builders

v190 后：
  opsPromotionArchiveBundle.ts
    archive/manifest/attestation 基础入口

  opsPromotionArchiveProfileBuilders.ts
    兼容导出门面

  opsPromotionArchiveHandoffBuilders.ts
    handoff builder 链

  opsPromotionArchiveReleaseBuilders.ts
    release builder 链

  opsPromotionArchiveDeploymentBuilders.ts
    deployment/audit builder 链
```

## 关键代码讲解

### 1. 主文件保留基础 archive 入口

文件：[opsPromotionArchiveBundle.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveBundle.ts:215)

```ts
export function createOpsPromotionArchiveBundle(input: {
```

这个函数仍然负责从 ledger integrity 和 latest evidence 生成 archive bundle。v190 没有改变它的入参、返回结构或 `nextActions` 计算，只是把后续 profile builder 从同一个文件里移走。

### 2. 主文件继续兼容旧导入路径

文件：[opsPromotionArchiveBundle.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveBundle.ts:118)

```ts
export {
  createOpsPromotionHandoffPackage,
```

路由层仍然可以从 `opsPromotionArchiveBundle.ts` 引入 `createOpsPromotionHandoffPackage`、`createOpsPromotionReleaseEvidence`、`createOpsPromotionDeploymentApproval` 等函数。v190 用 re-export 保持兼容，不强迫业务路由在同一版一起迁移。

### 3. profile builder 门面按职责转发

文件：[opsPromotionArchiveProfileBuilders.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveProfileBuilders.ts:1)

```ts
export {
  createOpsPromotionHandoffPackage,
```

这个文件只做门面，不放业务逻辑。它把 handoff、release、deployment 三组 builder 统一暴露给主文件，避免主文件知道过多内部拆分细节。

### 4. handoff builder 独立承接交接链

文件：[opsPromotionArchiveHandoffBuilders.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveHandoffBuilders.ts:85)

```ts
export function createOpsPromotionHandoffPackage(input: {
```

handoff 链包括 package、certificate、receipt、closure、completion 及其 verification。它们共享的是“把前一阶段证据固化成下一阶段交接材料”的职责，独立成一个模块后更容易测试和继续拆小。

### 5. release builder 独立承接发布证据链

文件：[opsPromotionArchiveReleaseBuilders.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveReleaseBuilders.ts:85)

```ts
export function createOpsPromotionReleaseEvidence(input: {
```

release builder 只处理 release evidence 和 release archive，不再和 handoff/deployment 混在同一个文件里。这让后续如果要接真实 release evidence source，可以直接找 release 模块。

### 6. deployment builder 独立承接部署与审计链

文件：[opsPromotionArchiveDeploymentBuilders.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveDeploymentBuilders.ts:85)

```ts
export function createOpsPromotionDeploymentApproval(input: {
```

deployment builder 承接 approval、change record、execution record、execution receipt 和 audit trail。它仍然只是构造证据，不执行真实部署、回滚或审批写入。

## 验证

```text
npm run typecheck
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/stableDigest.test.ts test/realReadRehearsalIntake.test.ts
npm test
npm run build
```

结果：全部通过。

## 成熟度变化

v190 不是新增业务 surface，而是生产级项目需要的结构治理。主文件从约 3743 行降到约 544 行，后续真实 HTTP adapter 不再需要塞进一个过大的控制面核心文件。

## 一句话总结

v190 把 promotion archive 的 profile builder 链拆成 handoff、release、deployment 三个职责模块，让 Node 控制面从“能跑、能证明”进一步靠近“能长期维护”。
