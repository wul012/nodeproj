# Node v189：opsPromotionArchiveBundle render/report split phase 5

## 本版判断

v188 后 `opsPromotionArchiveBundle.ts` 仍约 5658 行，超过 5000 行阈值。因此 v189 不直接进入 real HTTP read adapter，而是继续拆 render/report 区域。

## 本版目标

v189 把 `renderOpsPromotion...Markdown` 系列函数、`render...Items` 列表 helper、`renderLatestEvidence`、`renderManifestArtifacts` 等 Markdown 输出逻辑移动到：

```text
src/services/opsPromotionArchiveRenderers.ts
```

原 `opsPromotionArchiveBundle.ts` 继续 re-export 公开 renderer，路由层 import 路径保持兼容。

## 拆分结果

```text
v188 后主文件：约 5658 行
v189 后主文件：约 3743 行
新增 render/report 模块：约 2115 行
```

主文件已经进入 3000-4000 行目标区间，因此下一步可以回到推荐并行 Java v67 + mini-kv v76，再由 Node v190 做 real HTTP read adapter rehearsal。

## 本版边界

- 不改 endpoint。
- 不改 Markdown 内容。
- 不改 JSON 字段。
- 不改 digest/verification 行为。
- 不启动 Java / mini-kv。

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/stableDigest.test.ts test/realReadRehearsalIntake.test.ts：3 files / 9 tests 通过
npm test：132 files / 453 tests 通过
npm run build：通过
```
