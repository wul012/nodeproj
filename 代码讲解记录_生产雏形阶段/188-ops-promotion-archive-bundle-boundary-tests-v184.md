# 188-ops-promotion-archive-bundle-boundary-tests-v184

## 版本定位

Node v184 是 `opsPromotionArchiveBundle boundary tests`。

它接在 v183 后面，形成一个完整质量优化闭环：

```text
Node v183：把 stable digest 工具从巨型 archive bundle 文件中抽出
Node v184：用边界测试保护 archive bundle verification 行为
```

这版不新增 endpoint，也不新增跨项目 evidence。它的目标是让后续继续拆 `src/services/opsPromotionArchiveBundle.ts` 时有测试网兜。

## 为什么不继续拆

v183 已经拆出：

```ts
import { digestStable, stableJson } from "./stableDigest.js";
```

如果 v184 继续拆 renderer 或更深的 archive 子链路，风险会开始变高。更真实的开发流程是：

```text
先抽最稳工具 -> 再补边界测试 -> 再继续拆更复杂模块
```

所以 v184 只新增测试文件：

```text
test/opsPromotionArchiveBundleBoundary.test.ts
```

## 被保护的核心函数

v184 主要保护这三个导出函数：

```ts
createOpsPromotionArchiveBundle()
createOpsPromotionArchiveManifest()
createOpsPromotionArchiveVerification()
```

其中 verification 的核心判断在 `createOpsPromotionArchiveVerification()`：

```ts
const archiveNameMatches = input.manifest.archiveName === input.bundle.archiveName;
const stateMatches = input.manifest.state === input.bundle.state;
const summaryMatches = stableJson(input.manifest.summary) === stableJson(input.bundle.summary);
const nextActionsMatch = stableJson(input.manifest.nextActions) === stableJson(input.bundle.nextActions);
const manifestDigestValid = input.manifest.manifestDigest.value === recomputedManifestDigest;
const artifactsValid = artifactChecks.length === expectedArtifacts.length && artifactChecks.every((artifact) => artifact.valid);
```

最终 valid 必须全部满足：

```ts
valid: manifestDigestValid && artifactsValid && archiveNameMatches && stateMatches && summaryMatches && nextActionsMatch
```

v184 的测试就是围绕这些布尔边界展开。

## 边界一：manifest digest 被篡改

测试直接把 manifest digest 改成 64 个 `0`：

```ts
const corruptedManifest: OpsPromotionArchiveManifest = {
  ...manifest,
  manifestDigest: {
    ...manifest.manifestDigest,
    value: "0".repeat(64),
  },
};
```

预期是：

```ts
manifestDigestValid: false,
artifactsValid: true,
archiveNameMatches: true,
stateMatches: true,
summaryMatches: true,
nextActionsMatch: true,
```

这说明只是指纹坏了，不应该误报 artifact、summary 或 nextActions 坏。

## 边界二：artifact digest mismatch

第二个测试模拟 `ledger-integrity` artifact digest 被替换：

```ts
artifact.name === "ledger-integrity"
  ? {
    ...artifact,
    digest: {
      ...artifact.digest,
      value: "f".repeat(64),
    },
  }
  : artifact
```

预期是：

```ts
manifestDigestValid: true,
artifactsValid: false,
digestMatches: false,
```

这里故意让 manifest digest 自洽，测试重点落在 artifact 对 bundle 的真实重算校验上。

## 边界三：missing artifact

第三个测试删除 `latest-evidence`：

```ts
artifacts: manifest.artifacts.filter((artifact) => artifact.name !== "latest-evidence")
```

预期：

```ts
artifactsValid: false
artifactCount: 2
```

这保护的是归档结构完整性：archive manifest 必须包含 `archive-summary`、`latest-evidence`、`ledger-integrity` 三类证据，即使 `latest-evidence.present=false`，artifact 本身也不能消失。

## 边界四：summary / nextActions drift

第四个测试篡改：

```ts
summary: {
  ...manifest.summary,
  totalDecisions: 1,
},
nextActions: ["operator changed the next action outside archive generation"],
```

预期：

```ts
summaryMatches: false,
nextActionsMatch: false,
manifestDigestValid: false
```

这说明 verification 不只看 digest，也会把 manifest 的人读摘要和下一步动作与 bundle 源对象重新对齐。

## 关于 actions enabled 和 identity missing

当前 `opsPromotionArchiveBundle` 是纯 archive/verification 模块：

```text
输入：bundle + manifest
输出：verification
```

它不读取 `AppConfig`，也不处理 HTTP header。所以 v184 没有硬写 `UPSTREAM_ACTIONS_ENABLED` 或 missing identity 测试。

这不是漏做，而是职责边界正确：

- actions enabled 应由 production gate / action guard 覆盖。
- identity missing 应由 access guard / identity packet / pre-approval packet 覆盖。
- archive bundle 只负责 archive 一致性。

## 验证命令

本版本运行了：

```text
npm run typecheck
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/opsPromotionDecision.test.ts test/stableDigest.test.ts
npm test
npm run build
```

全量测试通过：

```text
Test Files  131 passed (131)
Tests       450 passed (450)
```

## 后续影响

v184 完成后，Node 这轮技术债优化形成闭环：

```text
先拆 stable digest，再补 archive boundary tests。
```

下一步按全局计划不应该 Node 抢跑 v185，而是推荐并行推进：

```text
Java v66 + mini-kv v75
```

等它们补出更接近真实运行的只读 evidence 后，再由 Node v185 做 `real-read rehearsal intake`。
