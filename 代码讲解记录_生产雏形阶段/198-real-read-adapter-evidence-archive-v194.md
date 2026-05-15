# 第一百九十八版：real-read adapter evidence archive（v194）

## 模块角色

v194 新增 `realReadAdapterEvidenceArchive`，它把 v191-v193 的真实只读 adapter 证据链固化成一个 archive bundle。

它不是新的读取器，也不是 production pass gate，而是把以下三段证据收束到一个 digest chain：

```text
v191 real-read adapter rehearsal
v192 operator window runbook
v193 failure taxonomy
```

## 本版所处项目进度

v191 让 Node 能表达真实只读 adapter rehearsal；v192 补人工窗口；v193 补失败分类。v194 做的是阶段收口：把前面分散的入口变成一个可复查、可验证、可继续接下一阶段的 archive。

## 核心流程

```text
status route
  -> loadRealReadAdapterEvidenceArchive
    -> loadRealReadAdapterRehearsal
    -> loadRealReadAdapterOperatorWindowRunbook
    -> loadRealReadAdapterFailureTaxonomy
    -> 校验 digest / profile version / classification coverage
    -> 生成 archiveDigest / artifacts / blockers / warnings
```

默认关闭窗口下，v191 和 v193 都不会访问 Java 或 mini-kv，v194 只是归档 closed-window baseline。

## 关键代码讲解

### 1. v194 的服务入口

文件：[realReadAdapterEvidenceArchive.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterEvidenceArchive.ts:138)

```ts
export async function loadRealReadAdapterEvidenceArchive(input: {
```

入口同时调用 v191、v192、v193 的 loader。这样 archive 不是手写摘要，而是从真实 profile 结果中拿 digest、状态和 summary。

### 2. archive digest 串联三段证据

文件：[realReadAdapterEvidenceArchive.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterEvidenceArchive.ts:152)

```ts
const archiveDigest = sha256StableJson({
```

digest payload 包含：

```text
adapterDigest
taxonomyDigest
operatorWindowRunbookDigest
rehearsalState
taxonomyState
failureClasses
checks
```

后续 v195 verification 可以重新计算这些字段，判断 archive 是否漂移。

### 3. artifacts 保留 v191-v193 的摘要

文件：[realReadAdapterEvidenceArchive.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterEvidenceArchive.ts:194)

```ts
artifacts: {
```

这里把 adapter、operatorWindow、taxonomy 拆成三个 artifact block。这样报告不只是一个 digest，还能看到每段证据的 record 数、classification 数、runbook step 数和 production operation 状态。

### 4. checks 阻断越界归档

文件：[realReadAdapterEvidenceArchive.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterEvidenceArchive.ts:310)

```ts
function createChecks(
```

关键检查包括：

```text
taxonomyMatchesAdapterDigest
classificationCoverageComplete
closedWindowArchivedAsNonPass
unsafeSurfaceNotPromoted
upstreamActionsStillDisabled
readyForProductionOperationsStillFalse
```

这保证 v194 是“证据归档”，不是“生产授权”。

### 5. archive state 区分关闭窗口和打开窗口

文件：[realReadAdapterEvidenceArchive.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterEvidenceArchive.ts:341)

```ts
function determineArchiveState(
```

默认关闭窗口会得到：

```text
closed-window-evidence-archived
```

如果人工窗口开启且 taxonomy ready，则会得到：

```text
open-window-evidence-archived
```

两者都不会把 `archivedAsProductionPassEvidence` 置为 true。

### 6. 路由接入 JSON/Markdown

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts:1628)

```ts
"/api/v1/production/real-read-adapter-evidence-archive",
```

和 v191-v193 一样，v194 继续输出 JSON 和 Markdown，方便本地归档和后续 verification 消费。

### 7. 测试覆盖关闭窗口、打开窗口失败和 actions 阻断

文件：[realReadAdapterEvidenceArchive.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterEvidenceArchive.test.ts:10)

```ts
it("archives the closed-window adapter bundle without contacting upstreams", async () => {
```

这个测试验证默认关闭窗口能形成 archive，且 fake client 不会被访问。

文件：[realReadAdapterEvidenceArchive.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterEvidenceArchive.test.ts:89)

```ts
it("archives open-window failure taxonomy as non-production evidence", async () => {
```

这个测试模拟人工窗口中部分探针失败，确认 archive 会记录 open-window failure taxonomy，但仍不变成生产 pass evidence。

## 验证

```text
npm run typecheck
npx vitest run test/realReadAdapterEvidenceArchive.test.ts test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts
npm test
npm run build
```

结果：

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterEvidenceArchive.test.ts test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts：4 files / 14 tests 通过
npm test：136 files / 467 tests 通过
npm run build：通过
```

## 成熟度变化

v194 让这条真实只读 adapter 主线完成一个阶段闭环：不再只是 endpoint 分散存在，而是有了可归档的 digest chain。它仍不是生产操作系统，但已经更接近真实生产流程里的“证据包”：能说明来源、窗口状态、分类结果、归档状态和禁止执行边界。

## 一句话总结

v194 把 v191-v193 的真实只读 adapter 结果固化成 evidence archive，完成本阶段收口，同时继续保持不启动上游、不写上游、不授权生产操作。
