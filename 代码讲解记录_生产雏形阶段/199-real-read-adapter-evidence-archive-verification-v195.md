# 第一百九十九版：real-read adapter evidence archive verification（v195）

## 模块角色

v195 新增 `realReadAdapterEvidenceArchiveVerification`，它负责验证 v194 生成的真实只读 adapter archive 是否可复算、可追溯、仍保持生产操作关闭。

它不是新的上游读取入口，也不是 production pass gate，而是 archive 后面的验真层：

```text
v191 adapter rehearsal
v192 operator window runbook
v193 failure taxonomy
v194 evidence archive
v195 archive verification
```

## 本版所处项目进度

v194 已经把前面三段证据固化成 archive bundle。v195 把这份 archive 变成可独立复查的证据：后续 Node v196 导入人工窗口结果时，不需要重新猜 v194 的 archive 是否可信，可以先看 v195 verification digest 和检查结果。

## 核心流程

```text
status route
  -> loadRealReadAdapterEvidenceArchiveVerification
    -> loadRealReadAdapterEvidenceArchive
    -> createRealReadAdapterEvidenceArchiveDigestPayload
    -> sha256StableJson 复算 archiveDigest
    -> 校验 digest chain / classification coverage / production gates
    -> 生成 verificationDigest / blockers / warnings / nextActions
```

默认关闭窗口下，底层 v191 smoke harness 仍不会访问 Java 或 mini-kv。v195 只是复算本地 profile 里的 archive payload。

## 关键代码讲解

### 1. v194 暴露 digest payload helper

文件：[realReadAdapterEvidenceArchive.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterEvidenceArchive.ts:150)

```ts
export function createRealReadAdapterEvidenceArchiveDigestPayload(input: {
```

v194 原本直接在 `loadRealReadAdapterEvidenceArchive` 内部拼 digest payload。v195 如果复制那段结构，后面容易漂移，所以本版把 payload 构造提取成 helper。

这个 helper 固定 archive digest 的关键字段：

```text
archiveState
adapterDigest
taxonomyDigest
operatorWindowRunbookDigest
rehearsalState
taxonomyState
failureClasses
checks
```

### 2. v194 自己也改用同一个 helper

文件：[realReadAdapterEvidenceArchive.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterEvidenceArchive.ts:187)

```ts
const archiveDigest = sha256StableJson(createRealReadAdapterEvidenceArchiveDigestPayload({
```

这样 v194 的生成逻辑和 v195 的验证逻辑共用同一份 payload 定义，避免“生成一套、验证一套”的风险。

### 3. v195 服务入口

文件：[realReadAdapterEvidenceArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterEvidenceArchiveVerification.ts:128)

```ts
export async function loadRealReadAdapterEvidenceArchiveVerification(input: {
```

入口先调用 v194：

```text
loadRealReadAdapterEvidenceArchive(input)
```

然后从 archive profile 取出 digest chain 和 summary，不直接访问 Java / mini-kv，也不创建新的上游动作。

### 4. 独立复算 archive digest

文件：[realReadAdapterEvidenceArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterEvidenceArchiveVerification.ts:134)

```ts
const recomputedArchiveDigest = sha256StableJson(createRealReadAdapterEvidenceArchiveDigestPayload({
```

这里使用 v194 暴露的同一个 helper 重新生成 payload，再计算 `recomputedArchiveDigest`。核心检查是：

```text
storedArchiveDigest == recomputedArchiveDigest
```

如果 archive 结构、checks 或 failureClasses 发生不兼容漂移，v195 会把 `archiveDigestMatches` 置为 false。

### 5. checks 覆盖摘要链和生产边界

文件：[realReadAdapterEvidenceArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterEvidenceArchiveVerification.ts:306)

```ts
function createChecks(
```

关键检查包括：

```text
sourceArchiveReady
archiveDigestMatches
classificationCoverageStillComplete
archiveChecksAllPassed
closedWindowStillNonPass
productionPassStillFalse
upstreamActionsStillDisabled
noAutomaticUpstreamStart
readyForProductionOperationsStillFalse
```

这说明 v195 验证的是“证据包可信且边界没松”，不是“允许生产执行”。

### 6. verification state 区分闭窗和开窗归档

文件：[realReadAdapterEvidenceArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterEvidenceArchiveVerification.ts:334)

```ts
function determineVerificationState(
```

默认闭窗会输出：

```text
verified-closed-window-archive
```

如果人工只读窗口曾打开并形成 open-window archive，则输出：

```text
verified-open-window-archive
```

任何 blockers 或 digest mismatch 都会进入：

```text
blocked
```

### 7. 路由接入 JSON/Markdown

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts:1644)

```ts
"/api/v1/production/real-read-adapter-evidence-archive-verification",
```

v195 延续现有 JSON/Markdown 双输出模式，便于自动测试、人工浏览和截图归档。

### 8. 测试覆盖闭窗、开窗失败和 actions 阻断

文件：[realReadAdapterEvidenceArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterEvidenceArchiveVerification.test.ts:11)

```ts
it("verifies the closed-window archive digest without contacting upstreams", async () => {
```

这个测试用 throwing fake client 验证默认关闭窗口不会接触 Java 或 mini-kv。

文件：[realReadAdapterEvidenceArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterEvidenceArchiveVerification.test.ts:82)

```ts
it("verifies open-window failure archive evidence as non-production evidence", async () => {
```

这个测试模拟开窗读探针有通过、有失败，确认 v195 可以验证 open-window archive，但仍保持非生产证据。

文件：[realReadAdapterEvidenceArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterEvidenceArchiveVerification.test.ts:122)

```ts
it("blocks verification when upstream actions are enabled", async () => {
```

这个测试确认一旦 `UPSTREAM_ACTIONS_ENABLED=true`，verification 直接阻断。

## 验证

```text
npm run typecheck
npx vitest run test/realReadAdapterEvidenceArchiveVerification.test.ts test/realReadAdapterEvidenceArchive.test.ts test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts
npm test
npm run build
```

结果：

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterEvidenceArchiveVerification.test.ts test/realReadAdapterEvidenceArchive.test.ts test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts：5 files / 18 tests 通过
npm test：137 files / 471 tests 通过
npm run build：通过
```

## 成熟度变化

v195 让真实只读 adapter 主线从“已经归档”前进到“归档可验真”。这比继续堆新 endpoint 更接近真实生产流程，因为生产证据不只要生成，还要能被独立复算、能证明没有被误提升为生产授权。

## 一句话总结

v195 给 v194 archive 加上独立 verification 层，确认 digest chain、classification coverage 和生产关闭边界仍然成立，并把下一步交还给 Java v69 + mini-kv v78 的只读 verification hint。
