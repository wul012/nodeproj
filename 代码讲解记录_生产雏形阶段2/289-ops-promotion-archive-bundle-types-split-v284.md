# 289 - ops promotion archive bundle types split（Node v284）

## 版本定位

Node v284 是质量优化版，专门处理 `src/services/opsPromotionArchiveBundleTypes.ts` 的文件膨胀问题。

这版没有新增 API、没有新增真实执行能力，也没有消费 Java / mini-kv 的运行时。它只把一个超大类型聚合文件拆成可维护的类型族模块。

## 原始问题

原文件 `src/services/opsPromotionArchiveBundleTypes.ts` 同时承载：

```text
archive bundle / manifest / verification / attestation
handoff package / certificate / receipt / closure / completion
release evidence / release archive
deployment approval / change / execution / receipt / audit trail
```

这些类型都属于 promotion archive 链路，但放在一个 1800+ 行文件里，会让后续开发时很难定位某个阶段的字段来源。

## 新结构

v284 保留原文件为 barrel：

```ts
export type * from "./opsPromotionArchiveCoreTypes.js";
export type * from "./opsPromotionArchiveHandoffTypes.js";
export type * from "./opsPromotionArchiveReleaseTypes.js";
export type * from "./opsPromotionArchiveDeploymentTypes.js";
```

这样旧代码仍然可以继续从 `opsPromotionArchiveBundleTypes.ts` 导入类型，不需要全仓迁移 import。

具体类型族拆到：

```text
opsPromotionArchiveCoreTypes.ts
opsPromotionArchiveHandoffTypes.ts
opsPromotionArchiveReleaseTypes.ts
opsPromotionArchiveDeploymentTypes.ts
```

## 为什么这样拆

这次没有把每个 interface 都拆成一个文件，因为那会把类型系统碎片化。按业务阶段分组更稳：

```text
core       = archive 基础证据
handoff    = 交接证据链
release    = 发布证据链
deployment = 部署执行证据链
```

这个粒度既能降低单文件阅读压力，又保留 promotion archive 链路的整体感。

## 验证

已执行：

```bash
npm run typecheck
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts
```

`typecheck` 证明 barrel re-export 和跨类型文件依赖正常；`opsPromotionArchiveBundleBoundary.test.ts` 证明 archive bundle / manifest / verification 的边界行为没有变化。

## 项目进度影响

Java v121 和 mini-kv v126 已经完成，可以供后续 Node v286 消费。Node 先做 v284/v285 质量优化，是为了在进入三方验证前把自己剩余的大文件技术债压下去。
