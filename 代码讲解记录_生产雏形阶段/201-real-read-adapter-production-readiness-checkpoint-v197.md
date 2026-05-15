# 第二百零一版：real-read adapter production readiness checkpoint（v197）

## 模块角色

v197 新增 `realReadAdapterProductionReadinessCheckpoint`，它负责对 v191-v196 的真实只读 adapter 主线做阶段性生产就绪检查。

它不是新的 archive，不是新的 imported sample，也不是 production pass gate。它的角色是把已经完成的证据链和仍未满足的硬门槛同时摆出来：

```text
rehearsal evidence ready
production window still blocked
```

## 本版所处项目进度

v191-v196 已经完成：

```text
real-read adapter rehearsal
operator window runbook
failure taxonomy
evidence archive
archive verification
imported window result packet
```

Java v69 与 mini-kv v78 也已经给 Node v196 提供只读 verification hint。v197 因此不再继续横向扩展证据包，而是开始转向真实生产窗口硬门槛。

## 核心流程

```text
status route
  -> loadRealReadAdapterProductionReadinessCheckpoint
    -> loadRealReadAdapterImportedWindowResultPacket
    -> createEvidenceChain
    -> createHardGates
    -> 校验 evidence span / baseline / imported sample / read-only boundary
    -> 生成 checkpointDigest / blockers / warnings / nextActions
```

默认关闭窗口下，底层 v196 仍不会访问 Java 或 mini-kv。v197 只是汇总本地 profile 和版本化证据引用。

## 关键代码讲解

### 1. v197 服务入口

文件：[realReadAdapterProductionReadinessCheckpoint.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterProductionReadinessCheckpoint.ts:118)

```ts
export async function loadRealReadAdapterProductionReadinessCheckpoint(input: {
```

入口先消费 v196：

```text
loadRealReadAdapterImportedWindowResultPacket(input)
```

这保证 checkpoint 的上游不是零散字段，而是已经经过 v196 归一化的 imported window packet。

### 2. checkpoint digest 绑定证据链和硬门槛

文件：[realReadAdapterProductionReadinessCheckpoint.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterProductionReadinessCheckpoint.ts:133)

```ts
const checkpointDigest = sha256StableJson({
```

digest payload 包含：

```text
sourcePacketDigest
sourceSampleDigest
sourceVerificationDigest
sourceArchiveDigest
evidenceVersions
hardGateIds
productionWindowAllowed=false
readyForProductionOperations=false
checks
```

这意味着 v197 不只是一个文字总结，而是一个可复查的 checkpoint packet。

### 3. evidence chain 覆盖 Node v191-v196、Java v69、mini-kv v78

文件：[realReadAdapterProductionReadinessCheckpoint.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterProductionReadinessCheckpoint.ts:246)

```ts
function createEvidenceChain(packet: RealReadAdapterImportedWindowResultPacketProfile): EvidenceChainItem[] {
```

证据链一共 8 项：

```text
Node v191
Node v192
Node v193
Node v194
Node v195
Node v196
Java v69
mini-kv v78
```

每一项都带 `productionAuthority=false`，防止把 rehearsal evidence 误解成生产授权。

### 4. hard gates 明确四个未满足门槛

文件：[realReadAdapterProductionReadinessCheckpoint.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterProductionReadinessCheckpoint.ts:279)

```ts
function createHardGates(): ProductionHardGate[] {
```

四个 hard gate 是：

```text
real-operator-identity
managed-audit-store
ci-archive-artifact
manual-approval-record
```

它们全部：

```text
requiredBeforeProductionWindow=true
satisfied=false
blocking=true
```

所以 v197 可以 ready for checkpoint，但不能 ready for production window。

### 5. checks 分离“checkpoint ready”和“production blocked”

文件：[realReadAdapterProductionReadinessCheckpoint.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterProductionReadinessCheckpoint.ts:325)

```ts
function createChecks(
```

关键检查包括：

```text
sourcePacketReady
evidenceSpanComplete
closedBaselinePreserved
importedSampleSeparated
javaV69VerificationHintAccepted
miniKvV78SmokeVerificationAccepted
hardGatesRecorded
productionWindowStillBlocked
readyForProductionOperationsStillFalse
```

这里最重要的是：`productionWindowStillBlocked=true` 是正确状态，不是错误状态。

### 6. hard gate 作为 productionBlockers 输出

文件：[realReadAdapterProductionReadinessCheckpoint.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterProductionReadinessCheckpoint.ts:371)

```ts
for (const gate of hardGates.filter((item) => item.blocking && !item.satisfied)) {
```

v197 的 `productionBlockers` 会包含四条硬门槛 blocker。这样接口消费者能同时看到：

```text
checkpoint ready = true
production blockers = 4
production window = false
```

### 7. 路由接入 JSON/Markdown

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts:1674)

```ts
"/api/v1/production/real-read-adapter-production-readiness-checkpoint",
```

v197 延续 JSON/Markdown 双输出，方便测试、人工审阅和截图归档。

### 8. 测试锁定 checkpoint 与 production window 的区别

文件：[realReadAdapterProductionReadinessCheckpoint.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterProductionReadinessCheckpoint.test.ts:10)

```ts
it("summarizes v191-v196 evidence while keeping the production window blocked", async () => {
```

这个测试确认：

```text
readyForRealReadAdapterProductionReadinessCheckpoint=true
readyForProductionWindow=false
readyForProductionOperations=false
hardGateCount=4
productionBlockerCount=4
```

文件：[realReadAdapterProductionReadinessCheckpoint.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterProductionReadinessCheckpoint.test.ts:83)

```ts
it("blocks the checkpoint when upstream actions are enabled", async () => {
```

这个测试确认 `UPSTREAM_ACTIONS_ENABLED=true` 会让 checkpoint 自身阻断。

## 验证

```text
npm run typecheck
npx vitest run test/realReadAdapterProductionReadinessCheckpoint.test.ts test/realReadAdapterImportedWindowResultPacket.test.ts test/realReadAdapterEvidenceArchiveVerification.test.ts test/realReadAdapterEvidenceArchive.test.ts test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts
npm test
npm run build
```

结果：

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterProductionReadinessCheckpoint.test.ts test/realReadAdapterImportedWindowResultPacket.test.ts test/realReadAdapterEvidenceArchiveVerification.test.ts test/realReadAdapterEvidenceArchive.test.ts test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts：7 files / 24 tests 通过
npm test：139 files / 477 tests 通过
npm run build：通过
```

## 成熟度变化

v197 是一个阶段性转折点：真实只读 adapter 的 rehearsal evidence 已经比较完整，但项目不能继续靠增加 archive/summary 显得成熟。下一阶段必须处理真实 operator identity、managed audit store、CI artifact、manual approval record 这些硬工程门槛。

## 一句话总结

v197 汇总 Node v191-v196、Java v69、mini-kv v78 的真实只读 adapter 证据链，确认 checkpoint 可用，但生产窗口仍被四个硬门槛阻断。
