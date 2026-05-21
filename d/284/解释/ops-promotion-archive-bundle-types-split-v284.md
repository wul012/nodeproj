# Node v284 运行说明：ops promotion archive bundle types split

## 本版目标

本版是质量优化版，不新增 managed audit 功能，不消费 Java / mini-kv 运行时，也不改变任何 JSON shape。

目标是拆分 `src/services/opsPromotionArchiveBundleTypes.ts`。该文件原先超过 1800 行，包含 archive、handoff、release、deployment 多个类型族。v284 将它改成 4 行 barrel re-export，并把类型族拆到独立文件。

## 拆分结果

```text
src/services/opsPromotionArchiveBundleTypes.ts       barrel re-export
src/services/opsPromotionArchiveCoreTypes.ts         archive / manifest / verification / attestation
src/services/opsPromotionArchiveHandoffTypes.ts      package / certificate / receipt / closure / completion
src/services/opsPromotionArchiveReleaseTypes.ts      release evidence / release archive
src/services/opsPromotionArchiveDeploymentTypes.ts   deployment approval / change / execution / audit trail
```

## 行为边界

- 保留原导入路径 `./opsPromotionArchiveBundleTypes.js`。
- 不改导出类型名。
- 不改 runtime service、renderer、builder、route。
- 不启动 Java / mini-kv。
- 不读取 credential value，不解析 raw endpoint URL，不打开 managed audit connection。

## 验证

```bash
npm run typecheck
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts
```

验证重点是 TypeScript barrel 仍可被旧导入方消费，archive bundle 边界测试继续通过。
