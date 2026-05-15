# 187-ops-promotion-archive-bundle-split-phase-1-v183

## 版本定位

Node v183 是 `opsPromotionArchiveBundle split phase 1`。

它不是新业务能力，而是生产雏形阶段的一次必要质量优化：

```text
先消化 Node 控制面中最大文件的稳定工具逻辑，再继续推进真实运行纵深。
```

当前 `src/services/opsPromotionArchiveBundle.ts` 已经超过 8300 行。这个文件承担 archive bundle、release evidence、verification、audit trail、digest、Markdown renderer 等职责。v183 不做大重构，只抽出最稳、最容易验证的一块：稳定 JSON 和 sha256 digest。

## 抽取前的问题

抽取前，`opsPromotionArchiveBundle.ts` 顶部直接依赖：

```ts
import { createHash } from "node:crypto";
```

底部有两个通用工具函数：

```ts
function digestStable(value: unknown): string {
  return createHash("sha256").update(stableJson(value)).digest("hex");
}

function stableJson(value: unknown): string {
  if (value === undefined) {
    return "null";
  }
  ...
}
```

这两个函数本身和 archive bundle 的业务流程没有耦合，却被放在巨型业务文件内部。随着后续 `verification`、`release archive`、`approval evidence` 继续增加，digest 工具继续散在大文件里，会让重构和测试都越来越慢。

## 新模块：stableDigest

v183 新增：

```text
src/services/stableDigest.ts
```

核心代码：

```ts
import { createHash } from "node:crypto";

export function digestStable(value: unknown): string {
  return createHash("sha256").update(stableJson(value)).digest("hex");
}
```

这里没有改变算法，只是把 `createHash("sha256")` 的调用从 archive bundle 巨型文件中移到独立工具模块。

`stableJson()` 的关键语义也保持不变：

```ts
if (value === undefined) {
  return "null";
}
```

这个细节很重要。Node 之前的 archive digest 已经把 `undefined` 当成 `null` 参与稳定序列化。如果 v183 改成忽略字段，旧 digest 可能全部变化，所以本版明确保留这个行为。

对象排序逻辑也保持原样：

```ts
return `{${Object.keys(record)
  .sort()
  .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
  .join(",")}}`;
```

这保证 `{ a: 1, b: 2 }` 和 `{ b: 2, a: 1 }` 的 digest 一致。

## 旧文件接入

`src/services/opsPromotionArchiveBundle.ts` 现在只保留业务职责，顶部改为：

```ts
import { digestStable, stableJson } from "./stableDigest.js";
```

原文件中大量调用点不需要改名：

```ts
value: digestStable(manifestPayload)
```

以及：

```ts
summaryMatches: stableJson(input.manifest.summary) === stableJson(input.bundle.summary)
```

这说明 v183 是低风险抽取：调用语义仍然是 `digestStable()` / `stableJson()`，只是实现位置改变。

## 为什么这版工作量合适

这版没有新增 endpoint，也没有新增跨项目 evidence，但它不是“只改文档”。

它解决的是生产雏形阶段真实会遇到的问题：

```text
巨型文件内部的通用工具无法独立测试，也让后续修改 archive bundle 风险变高。
```

v183 的边界刚好：

- 抽取一组纯函数。
- 不碰业务判断。
- 不碰 Java / mini-kv。
- 不改公开契约。
- 新增专门测试锁住行为。
- 全量测试确认旧 archive 链路仍然通过。

## 测试保护

新增测试文件：

```text
test/stableDigest.test.ts
```

第一组测试锁住排序：

```ts
expect(stableJson({ z: 1, a: { d: 4, b: 2 }, c: [3, { y: true, x: false }] })).toBe(
  '{"a":{"b":2,"d":4},"c":[3,{"x":false,"y":true}],"z":1}',
);
```

第二组测试锁住 `undefined -> null`：

```ts
expect(stableJson({ present: "yes", missing: undefined })).toBe('{"missing":null,"present":"yes"}');
```

同时验证 key 顺序不影响 digest：

```ts
expect(digestStable({ b: 2, a: 1 })).toBe(digestStable({ a: 1, b: 2 }));
```

这几个测试让 v183 的抽取不会悄悄改变 archive digest 契约。

## 验证命令

本版本运行了：

```text
npm run typecheck
npx vitest run test/productionLiveProbeEvidenceArchiveBundle.test.ts test/upstreamContractFixtureScenarioVerificationArchiveBundle.test.ts test/crossProjectReleaseBundleGate.test.ts test/stableDigest.test.ts
npm test
npm run build
```

全量测试通过：

```text
Test Files  130 passed (130)
Tests       446 passed (446)
```

## 后续影响

v183 给 v184 铺路。

下一版不应该继续盲目拆文件，而应该先补：

```text
opsPromotionArchiveBundle boundary tests
```

也就是先用测试保护缺字段、digest mismatch、actions enabled、identity missing 等边界，再继续拆更复杂的 renderer 或 archive bundle 片段。这样更接近真实开发流程：先拆最稳工具，再补边界保护，再继续纵深。
