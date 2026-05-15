# 第一百九十五版：real HTTP/TCP read adapter rehearsal（v191）

## 模块角色

v191 新增 `realReadAdapterRehearsal`，它不是新的上游客户端，也不是自动联调脚本，而是在既有 live-probe smoke harness 之上加一层更明确的 adapter rehearsal 语义：

```text
默认关闭
只读白名单
Java v67 / mini-kv v76 依赖已满足
不自动启动上游
不授权生产操作
```

## 本版所处项目进度

v185 已完成 real-read rehearsal intake，v186-v190 完成最大技术债拆分，Java v67 和 mini-kv v76 也已经准备好只读运行证据。v191 因此可以从“静态读取计划”推进到“可关闭的真实只读 adapter rehearsal”。

## 核心流程

```text
status route
  -> loadRealReadAdapterRehearsal
    -> loadProductionLiveProbeSmokeHarness
      -> UPSTREAM_PROBES_ENABLED=false 时全部 skipped
      -> UPSTREAM_PROBES_ENABLED=true 时只跑五个只读探针
    -> 转成 v191 adapter records
    -> 计算 adapter digest / checks / blockers / warnings
```

## 关键代码讲解

### 1. v191 的服务入口

文件：[realReadAdapterRehearsal.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterRehearsal.ts:126)

```ts
export async function loadRealReadAdapterRehearsal(input: {
```

这个函数接收 `config`、`orderPlatform`、`miniKv`，但不会自己决定启动上游。它只是调用已有 smoke harness，根据配置决定是否读取。

### 2. 默认关闭时不访问上游

文件：[realReadAdapterRehearsal.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterRehearsal.ts:283)

```ts
closedWindowSkipsWithoutAttempt: config.upstreamProbesEnabled
```

当 `UPSTREAM_PROBES_ENABLED=false` 时，v191 要求所有 record 都是 `skipped-read` 且 `attempted=false`。测试里使用会抛错的 fake client 来证明默认关闭不会碰 Java 或 mini-kv。

### 3. adapter 白名单只接受五个只读探针

文件：[realReadAdapterRehearsal.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterRehearsal.ts:390)

```ts
function isAllowedAdapterProbe(result: ProductionLiveProbeResult): boolean {
```

这里明确只接受：

```text
java-actuator-health
java-ops-overview
mini-kv-health
mini-kv-infojson
mini-kv-statsjson
```

`STORAGEJSON` 仍然属于 `upstreamProductionEvidenceIntake` 的证据链，本版没有把它塞进 live-probe smoke harness，避免改变既有五探针合约。

### 4. 路由接入 JSON/Markdown

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts:1583)

```ts
registerJsonMarkdownReportRoute(
```

路由挂在 `statusRoutes`，因为这里已经有 config、orderPlatform、miniKv 依赖，适合承接这类生产只读探测入口。它继续复用项目里的 JSON/Markdown 报告模式。

### 5. 测试覆盖默认关闭和打开窗口

文件：[realReadAdapterRehearsal.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterRehearsal.test.ts:10)

```ts
it("stays closed by default and does not contact upstreams", async () => {
```

这个测试是本版安全核心：默认关闭时 fake client 会抛错，如果实现真的访问上游，测试会失败。

文件：[realReadAdapterRehearsal.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterRehearsal.test.ts:66)

```ts
it("records pass evidence candidate when the manual probe window is open and read-only upstreams respond", async () => {
```

这个测试模拟人工窗口开启且上游只读返回成功，v191 会得到 `open-pass` 和 `readyForProductionPassEvidenceCandidate=true`，但仍然保持 `readyForProductionOperations=false`。

## 验证

```text
npm run typecheck
npx vitest run test/realReadAdapterRehearsal.test.ts
npx vitest run test/realReadAdapterRehearsal.test.ts test/productionLiveProbeSmokeHarness.test.ts test/productionLiveProbeReadinessContract.test.ts test/upstreamProductionEvidenceIntake.test.ts
npm test
npm run build
```

结果：全部通过。

## 成熟度变化

v191 让 Node 从“只读证据 intake”进入“可人工开启的真实只读 adapter rehearsal”。这仍不是生产操作能力，但已经比静态 fixture 更接近真实运行流程：它能表达窗口关闭、窗口打开、只读探针通过、生产操作仍禁止这几个关键状态。

## 一句话总结

v191 给 Node 增加了默认关闭的真实只读 adapter rehearsal 入口，能在人工窗口中读取 Java v67 和 mini-kv v76 的只读信号，同时继续严格禁止任何写操作和生产授权。
