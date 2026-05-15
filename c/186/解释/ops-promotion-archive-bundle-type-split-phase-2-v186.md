# Node v186：opsPromotionArchiveBundle type split phase 2

## 本版目标

v186 按最新计划继续处理 Node 当前最大的维护性技术债：`src/services/opsPromotionArchiveBundle.ts`。本版只做类型拆分，把 archive bundle、handoff、release evidence、deployment approval、execution receipt、audit trail 等 68 个 `type/interface` 移入独立模块：

```text
src/services/opsPromotionArchiveBundleTypes.ts
```

原 `opsPromotionArchiveBundle.ts` 保留 create/render/digest/verification 实现，并继续 re-export 这些类型，所以外部 import 路径保持兼容。

## 为什么这样做

v183 只抽出了 `stableDigest.ts`，方向正确但比例太小；v186 直接拆走 1800 多行类型定义，让巨型实现文件从 8754 行降到 7076 行。这样后续 v187 再抽 digest payload helper 时，类型和实现已经分层，改动风险更低。

## 本版边界

- 不改 endpoint。
- 不改 profileVersion。
- 不改 JSON/Markdown 字段。
- 不改 digest 算法。
- 不改 archive verification 行为。
- 不启动 Java / mini-kv。

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/stableDigest.test.ts test/realReadRehearsalIntake.test.ts：3 files / 9 tests 通过
npm test：132 files / 453 tests 通过
npm run build：通过
```

## 成熟度变化

本版不是功能扩张，而是把生产雏形阶段的核心发布证据模块从“巨型单文件”推进到“类型独立、实现保留、后续可继续拆分”的状态。下一版 v187 可以继续拆 manifest/archive/attestation digest payload helper。
