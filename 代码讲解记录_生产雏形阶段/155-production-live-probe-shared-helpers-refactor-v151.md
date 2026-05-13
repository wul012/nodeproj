# 第一百五十一版代码讲解：production live-probe shared helpers refactor

本版是一次工程债收口。

触发原因是 v144-v150 的类型安全和边界设计已经比较稳，但代码层面出现了明显重复：

```text
每个服务都有一份 stableJson
每个服务都有一份 sha256 digest 包装
每个服务都有 renderEntries / renderList / renderMessages
statusRoutes 里连续重复 JSON / Markdown route 注册模板
```

所以 v151 不继续堆新业务，而是先把重复工具函数收敛，避免后续 v152 archive verification 继续复制。

## 本版所处项目进度

v150 已经完成 production pass evidence archive：

```text
v146 release evidence gate
 -> v148 capture
 -> v149 verification
 -> v150 archive
```

按照全局计划，下一步本来应该进入 Java v49 + mini-kv v50 只读 evidence 供给。

但在进入下一轮前，Node v144-v150 的重复代码已经到达需要处理的程度。v151 因此被插入为一个必要的 Node 工程债版本：

```text
Node v151：共享工具函数 + route 注册辅助
Java v49 + mini-kv v50：只读 evidence 供给
Node v152：archive verification
```

这不是偏离计划，而是为了让后续计划更稳。

## 新增共享工具

新增文件：

```text
src/services/liveProbeReportUtils.ts
```

它提取了最稳定、最重复、最低风险的工具函数。

### sha256StableJson

```ts
export function sha256StableJson(value: unknown): string {
  return createHash("sha256")
    .update(stableJson(value))
    .digest("hex");
}
```

以前每个服务都有一份：

```text
createHash("sha256")
  .update(stableJson(value))
  .digest("hex")
```

现在统一走 `sha256StableJson`。这样 v152 之后再新增 digest-backed report，不需要继续复制一份 `stableJson`。

### check 计数

```ts
export function countReportChecks(checks: object): number {
  return Object.keys(checks).length;
}

export function countPassedReportChecks(checks: object): number {
  return Object.values(checks).filter(Boolean).length;
}
```

v149/v150 里原来有：

```text
countVerificationChecks
countPassedVerificationChecks
countArchiveChecks
countPassedArchiveChecks
```

它们行为完全一样，只是名字不同。v151 把它们变成共享函数。

### Markdown render helpers

```ts
export function renderMessages<T extends LiveProbeReportMessage>(
  messages: T[],
  emptyText: string,
): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}, ${message.source}): ${message.message}`);
}
```

以及：

```ts
export function renderEntries(record: object): string[] {
  return Object.entries(record).map(([key, value]) => `- ${key}: ${formatValue(value)}`);
}

export function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}
```

这些函数不含业务语义，只负责 Markdown 表达，因此适合共享。

## 服务层改造

v151 改造了这一组服务：

```text
productionLiveProbeRealReadSmokeReadinessSwitch.ts
productionLiveProbeRealReadSmokeArchiveAdapter.ts
productionLiveProbeRealReadSmokeExecutionRequest.ts
productionLiveProbeRealReadSmokeResultImporter.ts
productionLiveProbeRealReadSmokeReleaseEvidenceGate.ts
productionLiveProbeRealReadSmokeDryRunCommandPackage.ts
productionLiveProbeRealReadSmokeEvidenceCapture.ts
productionLiveProbeRealReadSmokeProductionPassEvidenceVerification.ts
productionLiveProbeRealReadSmokeProductionPassEvidenceArchive.ts
```

每个文件现在引用共享工具：

```ts
import {
  countPassedReportChecks,
  countReportChecks,
  formatValue,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
```

比如 v150 archive 的 digest 函数变成：

```ts
function digestArchive(value: unknown): string {
  return sha256StableJson(value);
}
```

原来尾部重复的 `stableJson` / `formatValue` / `renderEntries` / `renderList` / `renderMessages` 已经删除。

## 为什么没有抽象业务消息

本版没有抽象这些函数：

```text
collectProductionBlockers
collectWarnings
collectRecommendations
```

原因是它们包含业务语义。例如：

```text
SKIPPED_OR_MIXED_CAPTURE_REMAINS_BLOCKED
NON_PASS_EVIDENCE_ARCHIVED
UPSTREAM_ACTIONS_ENABLED
```

这些判断必须留在各自服务里，不能为了“少代码”把业务边界藏进通用工具。

这也是本版范围控制的关键。

## 路由注册辅助

修改文件：

```text
src/routes/statusRoutes.ts
```

新增 route helper：

```ts
function registerJsonMarkdownReportRoute<TProfile>(
  app: FastifyInstance,
  path: string,
  loadProfile: () => Promise<TProfile>,
  renderMarkdown: (profile: TProfile) => string,
): void {
  app.get<{ Querystring: FixtureReportQuery }>(path, {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadProfile();

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderMarkdown(profile);
    }

    return profile;
  });
}
```

同时提取 query schema：

```ts
const fixtureReportQuerySchema = {
  type: "object",
  properties: {
    format: { type: "string", enum: ["json", "markdown"] },
  },
  additionalProperties: false,
} as const;
```

这让 real-read smoke 这组 endpoint 的注册从重复模板变成：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive",
  () => loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchive({
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }),
  renderProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveMarkdown,
);
```

路径没有变，response 没有变，只是注册写法更短、更一致。

## 测试稳定性修复

全量测试并发时，有两个较重 route 测试原本只有 10 秒 timeout：

```text
test/productionLiveProbeRealReadSmokeArchiveAdapter.test.ts
test/productionLiveProbeEvidenceArchiveBundle.test.ts
```

它们和其他同类 route 测试一样，会构建 app、审批 dry-run change request、再请求 JSON 和 Markdown。v151 把它们调整到 20 秒：

```ts
}, 20000);
```

这不是跳过测试，而是让测试预算和同类重型 route 测试一致。

## 运行调试

本版执行并通过：

```text
npm run typecheck
npm test -- --run 9 个 productionLiveProbeRealReadSmoke*.test.ts
npm test -- --run test/productionLiveProbeRealReadSmokeArchiveAdapter.test.ts test/productionLiveProbeEvidenceArchiveBundle.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

全量测试结果：

```text
99 files, 343 tests passed
```

HTTP smoke 关键结果：

```text
archiveState=not-production-pass-evidence-archived
readyForProductionPassEvidenceArchive=true
archiveDigestLength=64
adapterMarkdownStatus=200
adapterMarkdownContainsTitle=true
```

归档截图：

```text
b/151/图片/shared-helper-route-smoke.png
```

## 成熟度变化

v151 的提升不在功能表面，而在可维护性：

```text
digest 算法集中
Markdown 基础渲染集中
route 注册模板集中
业务判断仍留在业务服务里
后续 v152/v153 不需要继续复制工具函数
```

这让生产雏形阶段更接近真实开发流程：不仅堆能力，也会在重复达到阈值时做工程债收口。

## 一句话总结

v151 把 v144-v150 的 live-probe 工具函数和 JSON/Markdown route 注册重复收敛到共享层，为后续 archive verification 和真实只读联调计划减少复制风险。
