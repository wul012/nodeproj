# Node v190：opsPromotionArchiveBundle profile builder split phase 6

## 本版判断

v185 已提前完成 `real-read rehearsal intake`，但计划原本把完整 real HTTP adapter 放在 v190，出现了版本节奏偏差。同时 v189 后 `opsPromotionArchiveBundle.ts` 仍约 3743 行，剩余 handoff/release/deployment/audit profile builder 仍集中在一个主文件里。

因此 v190 先做实际维护重构，不抢跑完整 real HTTP adapter。

## 本版目标

把 profile builder 组装链从 `opsPromotionArchiveBundle.ts` 拆出，并继续按职责细分，避免把大文件平移成另一个大文件：

```text
opsPromotionArchiveBundle.ts              -> archive / manifest / attestation 基础入口
opsPromotionArchiveProfileBuilders.ts     -> 兼容 re-export 门面
opsPromotionArchiveHandoffBuilders.ts     -> handoff package/certificate/receipt/closure/completion
opsPromotionArchiveReleaseBuilders.ts     -> release evidence/archive
opsPromotionArchiveDeploymentBuilders.ts  -> deployment approval/change/execution/receipt/audit
```

## 拆分结果

```text
v189 后 opsPromotionArchiveBundle.ts：约 3743 行
v190 后 opsPromotionArchiveBundle.ts：约 544 行
profileBuilders 门面：约 32 行
handoff builders：约 1260 行
release builders：约 616 行
deployment builders：约 1565 行
```

主文件已低于 2000 行目标，最大新增 builder 也控制在 1600 行以内。

## 本版边界

- 不改 endpoint。
- 不改 JSON 字段。
- 不改 Markdown 输出。
- 不改 digest 算法。
- 不启动、不修改 Java 或 mini-kv。
- 不执行真实上游读取。

## 计划修正

`docs/plans/v185-post-real-read-rehearsal-roadmap.md` 已同步修正：

```text
Node v190 = profile builder split
推荐并行 Java v67 + mini-kv v76
Node v191 = real HTTP read adapter rehearsal
```

这样避免 v185 已提前完成 intake 后，计划仍把 v190 写成完整 real adapter 的冲突。

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/stableDigest.test.ts test/realReadRehearsalIntake.test.ts：3 files / 9 tests 通过
npm test：132 files / 453 tests 通过
npm run build：通过
```
