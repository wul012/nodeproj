# 第一百九十三版：opsPromotionArchiveBundle render/report split phase 5（v189）

## 模块角色

`opsPromotionArchiveBundle` 在 v186-v188 已经陆续拆出 types、digest payload、steps、validation。v189 继续拆最后一块大面积职责：Markdown render/report 输出。

## 本版所处项目进度

v188 后主文件仍约 5658 行，超过 5000 行阈值。按真实开发流程，这时不适合直接加入 real HTTP read adapter，因为真实读取会带来上游连接、超时、错误分类和环境开关。如果主文件仍偏大，新增运行复杂度会放大维护成本。

所以 v189 先拆 render/report，让主文件进入 3000-4000 行目标区间。

## 核心流程

```text
v188 后：
  opsPromotionArchiveBundle.ts            -> 主流程 + render/report

v189 后：
  opsPromotionArchiveBundle.ts            -> create/verification 编排 + re-export
  opsPromotionArchiveRenderers.ts         -> Markdown render/report
  opsPromotionArchiveTypes/Digest/Steps/Validation 已独立
```

## 关键代码讲解

### 1. 主文件继续 re-export 公开 renderer

文件：[opsPromotionArchiveBundle.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveBundle.ts:127)

```ts
export {
  renderOpsPromotionArchiveMarkdown,
  renderOpsPromotionHandoffCertificateMarkdown,
```

路由层之前从 `opsPromotionArchiveBundle.ts` 引入 renderer。v189 没有强迫下游改 import，而是在原模块 re-export，避免迁移成本和接口漂移。

### 2. render/report 模块承接公开 Markdown 函数

文件：[opsPromotionArchiveRenderers.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveRenderers.ts:59)

```ts
export function renderOpsPromotionArchiveMarkdown(bundle: OpsPromotionArchiveBundle): string {
```

这个函数仍然输出 Promotion archive bundle 的 Markdown，只是从主文件移到 render/report 模块。函数签名和输出结构不变。

### 3. 渲染 helper 也被一起迁移

文件：[opsPromotionArchiveRenderers.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveRenderers.ts:1717)

```ts
function renderLatestEvidence(evidence: OpsPromotionEvidenceReport | undefined): string[] {
```

`renderLatestEvidence` 这类 helper 与 Markdown 输出强相关，放在 render/report 模块比留在 create/verification 主流程里更自然。

### 4. 主流程文件回到编排职责

文件：[opsPromotionArchiveBundle.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveBundle.ts:227)

```ts
export function createOpsPromotionArchiveBundle(input: {
```

v189 后主文件主要保留 create/verification 编排和 digest/step/validation 调用，职责边界更清楚。

## 验证

```text
npm run typecheck
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/stableDigest.test.ts test/realReadRehearsalIntake.test.ts
npm test
npm run build
```

结果：全部通过。

## 成熟度变化

`opsPromotionArchiveBundle.ts` 从 v186 前 8754 行，经过 v186-v189 降到约 3743 行。它不再是类型、digest、step、validation、render 全混在一起的巨型文件。下一步可以更稳地恢复三项目主线：Java v67 + mini-kv v76 推荐并行，然后 Node v190 进入可关闭 real HTTP read adapter rehearsal。

## 一句话总结

v189 把 render/report 从巨型主文件拆出，让 Node 发布证据链的核心模块进入可维护区间，并为真实 HTTP 读取适配清出空间。
