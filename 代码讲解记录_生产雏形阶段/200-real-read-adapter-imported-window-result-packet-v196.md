# 第二百版：real-read adapter imported window result packet（v196）

## 模块角色

v196 新增 `realReadAdapterImportedWindowResultPacket`，它把 v195 的 closed-window baseline 和一份 operator-window imported sample 放到同一个 packet 中，但明确两者不是同一种证据。

它不是 live probe 执行器，也不是 production pass gate，而是后续 production readiness checkpoint 的输入包：

```text
v195 archive verification
Java v69 verification hint
mini-kv v78 SMOKEJSON taxonomy digest
 -> v196 imported window result packet
```

## 本版所处项目进度

v195 已证明 v194 archive 可复算。随后 Java v69 补了 response schema / warning digest / no-ledger proof，mini-kv v78 补了 SMOKEJSON taxonomy digest 和 verification sample。v196 把这些证据锚点接入 Node，说明“闭窗 baseline”和“人工窗口结果样本”可以并存，但不能混为生产授权。

## 核心流程

```text
status route
  -> loadRealReadAdapterImportedWindowResultPacket
    -> loadRealReadAdapterEvidenceArchiveVerification
    -> 读取内置 imported operator-window sample
    -> 校验 Java v69 verification hint
    -> 校验 mini-kv v78 SMOKEJSON taxonomy digest
    -> 校验 5 条 imported records 均 read-only
    -> 生成 packetDigest / blockers / warnings / nextActions
```

默认运行下，底层 v195 仍是 closed-window verification，不会访问 Java 或 mini-kv。v196 只是消费版本化样本和只读证据锚点。

## 关键代码讲解

### 1. v196 服务入口

文件：[realReadAdapterImportedWindowResultPacket.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterImportedWindowResultPacket.ts:297)

```ts
export async function loadRealReadAdapterImportedWindowResultPacket(input: {
```

入口先加载 v195：

```text
loadRealReadAdapterEvidenceArchiveVerification(input)
```

这保证 v196 不绕过 archive verification，先拿到 closed-window baseline 的 `sourceVerificationDigest` 和 `sourceArchiveDigest`。

### 2. imported sample 固定 Java v69 与 mini-kv v78 锚点

文件：[realReadAdapterImportedWindowResultPacket.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterImportedWindowResultPacket.ts:188)

```ts
const IMPORTED_WINDOW_SAMPLE: ImportedWindowResultSample = {
```

这份样本记录：

```text
Java v69 warningDigest
Java v69 responseSchemaVersion
Java v69 noLedgerWriteProof
mini-kv v78 taxonomyDigest
mini-kv v78 runtimeVersion
5 条 read-only imported records
```

它是导入样本，不是实时启动 Java / mini-kv 得到的结果。

### 3. packet digest 绑定 baseline 与 imported sample

文件：[realReadAdapterImportedWindowResultPacket.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterImportedWindowResultPacket.ts:313)

```ts
const packetDigest = sha256StableJson({
```

digest payload 同时包含：

```text
sampleDigest
sourceVerificationDigest
sourceArchiveDigest
windowId
javaWarningDigest
miniKvTaxonomyDigest
importedRecords
checks
```

这让 v196 packet 能证明自己到底消费了哪个 v195 baseline，以及导入样本来自哪个上游证据版本。

### 4. closedWindowBaseline 明确保留闭窗状态

文件：[realReadAdapterImportedWindowResultPacket.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterImportedWindowResultPacket.ts:373)

```ts
closedWindowBaseline: {
```

这里固定：

```text
sourceArchiveState=closed-window-evidence-archived
sourceRehearsalState=closed-skipped
sourceTaxonomyState=closed-window-classified
readOnlyWindowOpen=false
attemptedProbeCount=0
```

这防止后续误把 imported operator-window sample 当成默认运行时已经连过上游。

### 5. operatorWindowResult 明确是导入样本

文件：[realReadAdapterImportedWindowResultPacket.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterImportedWindowResultPacket.ts:383)

```ts
operatorWindowResult: {
```

它记录：

```text
sampleVersion=real-read-adapter-imported-window-result-sample.v1
windowId=operator-window-sample-v196
importedRecordCount=5
passedRecordCount=5
operatorOwnsUpstreamLifecycle=true
nodeStartedUpstreams=false
importedAsProductionPassEvidence=false
```

也就是说，它可以作为后续 readiness checkpoint 的样本输入，但还不是生产窗口证明。

### 6. Java v69 hint 校验

文件：[realReadAdapterImportedWindowResultPacket.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterImportedWindowResultPacket.ts:512)

```ts
function isJavaV69VerificationHintReady(reference: JavaV69VerificationHintReference): boolean {
```

检查点包括：

```text
hintVersion=java-release-approval-rehearsal-verification-hint.v1
responseSchemaVersion=java-release-approval-rehearsal-response-schema.v3
warningDigest 是 sha256:...
noLedgerWriteProof 包含 nodeMayWriteApprovalLedger=false
nodeMayTreatAsProductionAuthorization=false
```

这正好消费 Java v69 的计划目标。

### 7. mini-kv v78 SMOKEJSON 校验

文件：[realReadAdapterImportedWindowResultPacket.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterImportedWindowResultPacket.ts:524)

```ts
function isMiniKvV78SmokeVerificationReady(reference: MiniKvV78SmokeVerificationReference): boolean {
```

检查点包括：

```text
command=SMOKEJSON
runtimeVersion=0.78.0
taxonomyDigest=fnv1a64:f92fcba55feb26a2
verificationSampleConsumer=Node v196 imported window result packet
restoreExecutionAllowed=false
orderAuthoritative=false
```

这确保 mini-kv 仍然只是自研 KV 实验位，不进入订单权威存储。

### 8. 路由接入 JSON/Markdown

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts:1659)

```ts
"/api/v1/production/real-read-adapter-imported-window-result-packet",
```

v196 延续 JSON/Markdown 双输出，便于自动测试、人工浏览和截图归档。

### 9. 测试覆盖闭窗 baseline、导入样本和 actions 阻断

文件：[realReadAdapterImportedWindowResultPacket.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterImportedWindowResultPacket.test.ts:10)

```ts
it("builds an imported operator-window sample while preserving the closed baseline", async () => {
```

这个测试用 throwing fake client 验证默认关闭窗口不会接触 Java 或 mini-kv，同时确认 packet 里有 5 条导入记录。

文件：[realReadAdapterImportedWindowResultPacket.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterImportedWindowResultPacket.test.ts:104)

```ts
it("blocks the packet when upstream actions are enabled", async () => {
```

这个测试确认 `UPSTREAM_ACTIONS_ENABLED=true` 时会阻断，不允许导入 packet 被误当成可执行状态。

## 验证

```text
npm run typecheck
npx vitest run test/realReadAdapterImportedWindowResultPacket.test.ts test/realReadAdapterEvidenceArchiveVerification.test.ts test/realReadAdapterEvidenceArchive.test.ts test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts
npm test
npm run build
```

结果：

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterImportedWindowResultPacket.test.ts test/realReadAdapterEvidenceArchiveVerification.test.ts test/realReadAdapterEvidenceArchive.test.ts test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts：6 files / 21 tests 通过
npm test：138 files / 474 tests 通过
npm run build：通过
```

## 成熟度变化

v196 让真实只读 adapter 主线从“archive 可验真”推进到“可以表达人工窗口导入结果”。但它仍保持克制：导入样本只作为 readiness 输入，不变成生产 pass，也不授权任何上游动作。

## 一句话总结

v196 把 v195 closed-window baseline、Java v69 verification hint 和 mini-kv v78 SMOKEJSON taxonomy digest 汇总成 imported window result packet，为 v197 production readiness checkpoint 做准备。
