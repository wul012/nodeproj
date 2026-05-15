# Node v183 运行调试说明：opsPromotionArchiveBundle split phase 1

## 本版本目标

Node v183 是质量优化版本，不新增业务 endpoint。

本版本只做一件事：

```text
把 src/services/opsPromotionArchiveBundle.ts 里的稳定 digest 工具抽到独立模块。
```

抽取前，`digestStable()` 和 `stableJson()` 位于 `opsPromotionArchiveBundle.ts` 底部。这个文件已经超过 8300 行，继续把工具函数留在巨型文件中，会让后续 archive bundle、verification、release evidence 的维护成本继续上升。

## 新增模块

```text
src/services/stableDigest.ts
```

提供两个导出函数：

```ts
export function digestStable(value: unknown): string
export function stableJson(value: unknown): string
```

`stableJson()` 保持原语义：

- object key 按字典序排序。
- array 保持原顺序。
- `undefined` 序列化为 `null`。
- 其他 primitive 走 `JSON.stringify()`。

`digestStable()` 仍然对 `stableJson(value)` 做 `sha256`。

## 旧文件变化

`src/services/opsPromotionArchiveBundle.ts` 不再直接引入 `node:crypto`，改为：

```ts
import { digestStable, stableJson } from "./stableDigest.js";
```

公开行为不变：

- 不改 endpoint。
- 不改 profileVersion。
- 不改 JSON 字段。
- 不改 Markdown 字段。
- 不改 release/archive/verification 判断。
- 不改 Java 或 mini-kv 接入边界。

## 新增测试

```text
test/stableDigest.test.ts
```

覆盖两类关键契约：

```text
1. 对象 key 排序稳定。
2. archive bundle 既有 undefined-as-null digest 语义不变。
```

这保证 v183 是一次安全拆分，而不是隐性改 digest 算法。

## 验证结果

本版本已运行：

```text
npm run typecheck
npx vitest run test/productionLiveProbeEvidenceArchiveBundle.test.ts test/upstreamContractFixtureScenarioVerificationArchiveBundle.test.ts test/crossProjectReleaseBundleGate.test.ts test/stableDigest.test.ts
npm test
npm run build
Chrome screenshot
```

全量测试结果：

```text
Test Files  130 passed (130)
Tests       446 passed (446)
```

截图归档：

```text
c/183/图片/ops-promotion-archive-bundle-split-phase-1-v183.png
```

## 下一步

下一步仍按当前 plan：

```text
Node v184：opsPromotionArchiveBundle boundary tests
```

v184 不继续拆大块，而是先补边界测试，保护 v183 已经拆出的 digest 工具和 archive bundle 行为。
