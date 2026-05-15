# 第一百九十七版：real-read adapter failure taxonomy（v193）

## 模块角色

v193 新增 `realReadAdapterFailureTaxonomy`，它不是新的上游读取器，而是把 v191 的 adapter records 和 v192 的人工窗口 runbook 组合起来，给真实只读读取结果打上稳定失败分类。

它要解决的问题是：

```text
skipped / blocked 太粗
真实窗口失败时需要知道是窗口关闭、连接失败、超时、JSON 错误，还是安全边界问题
```

## 本版所处项目进度

v191 已经有真实只读 adapter rehearsal，v192 已经有人工窗口 runbook。Java v68 和 mini-kv v77 也分别补了只读失败分类证据。v193 正好把这些证据汇合到 Node 控制面，开始形成可诊断的真实读取链路。

## 核心流程

```text
status route
  -> loadRealReadAdapterFailureTaxonomy
    -> loadRealReadAdapterRehearsal
    -> loadRealReadAdapterOperatorWindowRunbook
    -> classifyRecord(...)
    -> 引用 Java v68 / mini-kv v77 evidence
    -> 计算 taxonomyDigest / checks / blockers / warnings
```

默认 `UPSTREAM_PROBES_ENABLED=false` 时，v191 仍不会访问上游；v193 只消费 skipped records 并分类为 `closed-window`。

## 关键代码讲解

### 1. v193 的服务入口

文件：[realReadAdapterFailureTaxonomy.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterFailureTaxonomy.ts:186)

```ts
export async function loadRealReadAdapterFailureTaxonomy(input: {
```

入口接收 `config`、`orderPlatform`、`miniKv`，但真实访问由 v191 的 `loadRealReadAdapterRehearsal` 决定。默认关闭时，fake client 不会被调用。

### 2. 上游证据引用固定到 Java v68 / mini-kv v77

文件：[realReadAdapterFailureTaxonomy.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterFailureTaxonomy.ts:136)

```ts
const JAVA_V68_FAILURE_TAXONOMY: UpstreamFailureTaxonomyReference = Object.freeze({
```

文件：[realReadAdapterFailureTaxonomy.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterFailureTaxonomy.ts:153)

```ts
const MINI_KV_V77_FAILURE_TAXONOMY: UpstreamFailureTaxonomyReference = Object.freeze({
```

这里不是去改 Java 或 mini-kv，而是把它们已经完成的 evidence 作为 Node v193 的依赖来源。这样后续归档时能说明分类能力来自哪里。

### 3. 分类逻辑集中在 classifyRecord

文件：[realReadAdapterFailureTaxonomy.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterFailureTaxonomy.ts:323)

```ts
function classifyRecord(
```

分类顺序是有意安排的：

```text
先看 unsafe surface
再看 unexpected write signal
再看 passed-read
再看 closed-window
再看 timeout / invalid-json / connection-refused
最后落到 unclassified-upstream-error
```

这样安全问题会优先被 blocker 捕获，不会被普通网络错误掩盖。

### 4. 默认关闭窗口被明确分类

文件：[realReadAdapterFailureTaxonomy.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterFailureTaxonomy.ts:359)

```ts
if (!config.upstreamProbesEnabled && !record.attempted && record.adapterStatus === "skipped-read") {
```

默认关闭时，五个 record 都是 `closed-window`。这不是失败，而是本地开发和非窗口状态下的正常 baseline。

### 5. 检查项保护生产边界

文件：[realReadAdapterFailureTaxonomy.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterFailureTaxonomy.ts:442)

```ts
function createChecks(
```

关键检查包括：

```text
adapterReviewReady
operatorWindowReady
javaV68TaxonomyAccepted
miniKvV77TaxonomyAccepted
allRecordsClassified
unsafeSurfaceBlocked
unexpectedWriteSignalBlocked
upstreamActionsStillDisabled
readyForProductionOperationsStillFalse
```

这保证 v193 是“诊断层”，不是执行授权层。

### 6. 路由输出 JSON/Markdown

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts:1614)

```ts
"/api/v1/production/real-read-adapter-failure-taxonomy",
```

继续复用项目统一的 JSON/Markdown 报告路由，方便后续 v194 直接消费和归档。

### 7. 测试覆盖关闭窗口和真实失败映射

文件：[realReadAdapterFailureTaxonomy.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterFailureTaxonomy.test.ts:10)

```ts
it("classifies the default closed window without contacting upstreams", async () => {
```

这个测试证明默认关闭不会访问 Java 或 mini-kv，并且五条记录都会分类为 `closed-window`。

文件：[realReadAdapterFailureTaxonomy.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterFailureTaxonomy.test.ts:69)

```ts
it("classifies open-window timeout, invalid-json, and connection-refused failures", async () => {
```

这个测试用 fake upstream error 模拟 timeout、invalid JSON、connection refused，确认 v193 的分类不是只覆盖 happy path。

## 验证

```text
npm run typecheck
npx vitest run test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts
npm test
npm run build
```

结果：

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts：3 files / 10 tests 通过
npm test：135 files / 463 tests 通过
npm run build：通过
```

## 成熟度变化

v193 让真实只读 adapter 从“能读取/能跳过”推进到“能解释为什么没有成功读取”。这比继续加 summary 更有生产化价值，因为真实演练中最常见的问题不是缺页面，而是需要快速判断窗口没开、服务没起、超时、协议坏了，还是安全边界越界。

## 一句话总结

v193 给真实只读 adapter 增加 failure taxonomy，让 Node 能把 Java/mini-kv 读取结果分类为可操作原因，同时继续保持不启动上游、不写上游、不授权生产操作。
