# Node v188：opsPromotionArchiveBundle step/validation split phase 4

## 本版判断

用户给出的建议合理：v186 抽出 68 个类型、v187 抽出 digest payload 后，`opsPromotionArchiveBundle.ts` 仍约 6966 行，超过 5000 行阈值。因此 v188 不应直接跳到 real HTTP read adapter，而应继续拆分最大技术债。

## 本版目标

v188 把两类逻辑从 `opsPromotionArchiveBundle.ts` 拆出：

```text
src/services/opsPromotionArchiveSteps.ts
src/services/opsPromotionArchiveValidation.ts
```

其中 `opsPromotionArchiveSteps.ts` 承接 handoff/release/deployment/audit 的 items/steps 构造；`opsPromotionArchiveValidation.ts` 承接 archive state、completion reference checks、nextActions 决策。

## 拆分结果

```text
v187 后主文件：约 6966 行
v188 后主文件：约 5658 行
新增 step 模块：约 748 行
新增 validation 模块：约 756 行
```

本版没有改 endpoint、JSON/Markdown 字段、profileVersion 或 digest 算法。

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/stableDigest.test.ts test/realReadRehearsalIntake.test.ts：3 files / 9 tests 通过
npm test：132 files / 453 tests 通过
npm run build：通过
```

## 后续判断

v188 后主文件仍约 5658 行，尚未低于 5000 行，因此下一份 plan 需要继续加入 render/report split 或等价拆分。等主文件降到 3000-4000 行区间，再进入 real HTTP read adapter 会更稳。
