# 90. Node v86 Scenario release evidence index 代码讲解

## 1. v86 的定位

`src/services/upstreamContractFixtureScenarioReleaseEvidenceIndex.ts` 新增的是发布证据索引，不是新执行能力。

核心类型在开头定义：

```ts
export interface UpstreamContractFixtureScenarioReleaseEvidenceIndex {
  service: "orderops-node";
  valid: boolean;
  readOnly: true;
  executionAllowed: false;
  maturityTarget: "production-leaning";
}
```

这里的 `maturityTarget: "production-leaning"` 是本版开始落地的新规则：后续目标不只是作品级展示，而是逐步向生产级靠近。

## 2. 统一收集四类 evidence

加载函数先读取 scenario matrix，再在内存里生成 verification、archive bundle、archive verification：

```ts
const matrix = await loadUpstreamContractFixtureScenarioMatrix(config);
const verification = createUpstreamContractFixtureScenarioMatrixVerification(matrix);
const archiveBundle = createUpstreamContractFixtureScenarioVerificationArchiveBundle(matrix, verification);
const archiveVerification = createUpstreamContractFixtureScenarioVerificationArchiveBundleVerification(archiveBundle);
```

这样做的好处是 v86 不重复读取四次文件，也不绕过已有验证逻辑。它只是把已有证据组织成一个 release index。

## 3. 每份 evidence 都有 digest 和边界

`createUpstreamContractFixtureScenarioReleaseEvidenceIndex()` 会生成四个 evidence entry：

```ts
scenario-matrix
scenario-matrix-verification
scenario-archive-bundle
scenario-archive-bundle-verification
```

每个 entry 都统一带上：

```ts
digest
valid
readOnly: true
executionAllowed: false
boundary.canAuthorizeExecution: false
```

这点很重要：即使所有证据都 valid，也只说明“证据链干净”，不代表 Node 可以真实执行 Java replay 或 mini-kv 写命令。

## 4. index 自己也有 digest

v86 不只汇总别人的 digest，还给 index 本身计算 `releaseEvidenceDigest`：

```ts
export function digestUpstreamContractFixtureScenarioReleaseEvidenceIndex(
  index: Omit<UpstreamContractFixtureScenarioReleaseEvidenceIndex, "releaseEvidenceDigest">,
)
```

digest 覆盖字段包括：

```ts
service
valid
readOnly
executionAllowed
maturityTarget
checks
summary
evidence
evidenceEndpoints
nextActions
```

这使它更接近生产发布证据：后续 CI 或 release gate 可以复核这个 digest，确认发布材料没有被悄悄改动。

## 5. 路由只暴露 JSON / Markdown

`src/routes/statusRoutes.ts` 新增 endpoint：

```ts
/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-index
```

并继续支持：

```ts
?format=markdown
```

路由只调用：

```ts
loadUpstreamContractFixtureScenarioReleaseEvidenceIndex(deps.config)
```

没有新增任何 POST、PUT、DELETE，也没有调用上游写操作。

## 6. 测试覆盖的重点

`test/upstreamContractFixtureScenarioReleaseEvidenceIndex.test.ts` 覆盖三件事：

```ts
indexes all scenario release evidence
marks the index invalid when one evidence report is invalid
exposes release evidence index routes in JSON and Markdown
```

其中第一组断言锁住生产级方向的关键边界：

```ts
maturityTarget: "production-leaning"
executionAllowed: false
allEvidenceValid: true
executionNeverAllowed: true
digestsPresent: true
```

第三组断言锁住接口契约，确保 JSON / Markdown 都能被外部 release 流程读取。
