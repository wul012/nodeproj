# 174-release-report-shared-hardening-v170

## 版本定位

Node v170 是一次维护重构版，来自最近 v165-v169 报告链的代码质量收敛，不消费 Java v60 / mini-kv v69，也不替代后续 deployment evidence intake。

本版目标是把重复出现的 check summary 和 digest 校验逻辑前移到共享工具中，让后续 Node v171 继续接入 Java / mini-kv 部署证据时，不再复制同样的大文件骨架。

## 关键代码

共享工具集中在 `src/services/releaseReportShared.ts`：

```ts
export function summarizeReportChecks(checks: Record<string, boolean>): ReleaseReportCheckSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
  };
}
```

这里把报告里常见的“总检查数 / 通过检查数”统一封装。之前多个报告文件都会直接调用 `countReportChecks` 和 `countPassedReportChecks`，容易在新版本里继续复制。

同一文件还新增了带前缀的 summary 生成：

```ts
export function prefixReportCheckSummary(
  summary: ReleaseReportCheckSummary,
  prefix: string,
): Record<string, number> {
  return {
    [`${prefix}CheckCount`]: summary.checkCount,
    [`passed${capitalize(prefix)}CheckCount`]: summary.passedCheckCount,
  };
}
```

这个函数让旧字段名保持不变，比如 `gateCheckCount`、`passedGateCheckCount`、`checklistCheckCount`、`passedChecklistCheckCount`。也就是说，本版是结构收敛，不是 API 改名。

digest 校验也收敛成一个显式函数：

```ts
export function isReleaseReportDigest(value: unknown): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
```

它被 `src/services/postV166ReadinessSummary.ts` 使用，用来替换内联正则：

```ts
rollbackPreflightDigestPresent: isReleaseReportDigest(rollbackPreflight.contract.contractDigest),
environmentChecklistDigestPresent: isReleaseReportDigest(environmentPreflight.checklist.checklistDigest),
```

这样后续报告如果要判断 digest 是否可作为证据，也可以复用同一个函数，避免每个版本手写一遍正则。

## 迁移范围

本版迁移了最近生产证据报告链中的重复 summary 逻辑：

- `src/services/crossProjectReleaseBundleGate.ts`
- `src/services/rollbackWindowReadinessChecklist.ts`
- `src/services/rollbackExecutionPreflightContract.ts`
- `src/services/productionEnvironmentPreflightChecklist.ts`
- `src/services/postV166ReadinessSummary.ts`

例如 `crossProjectReleaseBundleGate.ts` 中现在先生成共享 summary：

```ts
const checkSummary = prefixReportCheckSummary(summarizeReportChecks(checks), "gate");
```

然后仍然输出原来的字段：

```ts
summary: {
  gateCheckCount: checkSummary.gateCheckCount,
  passedGateCheckCount: checkSummary.passedGateCheckCount,
  bundleManifestCount: 2,
}
```

这保证了前端、测试、截图、归档看到的 JSON 结构不变。

## 测试说明

新增 `test/releaseReportShared.test.ts`，直接验证两个重点：

- `summarizeReportChecks` 可以正确统计 boolean checks。
- `prefixReportCheckSummary` 可以生成稳定的旧字段形态。
- `isReleaseReportDigest` 只接受 64 位小写 hex 字符串，不会把对象或 undefined 强行当成 digest。

这一版的价值不在新增业务能力，而在降低后续版本继续膨胀的概率。它适合插在 Java v60 / mini-kv v69 之前，因为它不需要上游新证据，也不会阻塞你并行推进那两个项目。
