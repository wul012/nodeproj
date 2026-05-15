# 第一百九十六版：real-read adapter operator window runbook（v192）

## 模块角色

v192 新增 `realReadAdapterOperatorWindowRunbook`，它不是一个新的探针执行器，而是把 v191 的真实只读 adapter rehearsal 包装成“人工运行窗口 runbook”。

它回答的是：

```text
什么时候能开真实读取窗口
谁负责启动 Java / mini-kv
Node 应该读哪些目标
哪些操作绝对禁止
采集完以后如何停止和归档
```

## 本版所处项目进度

v191 已经能表达真实 HTTP/TCP 只读 adapter rehearsal，但真实开发流程里，下一步不能直接让 Node 自动启动上游。v192 因此先补人工窗口规则，把“可真实读取”推进成“可人工执行、可审计、可停止”的操作说明。

## 核心流程

```text
status route
  -> loadRealReadAdapterOperatorWindowRunbook
    -> 读取当前 runtime config
    -> 生成 requiredEnvironment
    -> 生成 operatorSteps
    -> 固化 allowedReads / forbiddenOperations / expectedEvidence
    -> 计算 runbookDigest / checks / blockers / warnings
```

这个流程不创建上游客户端，也不会访问 Java 或 mini-kv。

## 关键代码讲解

### 1. v192 的服务入口

文件：[realReadAdapterOperatorWindowRunbook.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterOperatorWindowRunbook.ts:245)

```ts
export function loadRealReadAdapterOperatorWindowRunbook(
```

入口只接收 `AppConfig`，没有接收 `OrderPlatformClient` 或 `MiniKvClient`。这点很关键：v192 只是生成 runbook，不承担真实探测，因此不会在默认推进中碰上游进程。

### 2. 操作窗口所需环境

文件：[realReadAdapterOperatorWindowRunbook.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterOperatorWindowRunbook.ts:251)

```ts
const requiredEnvironment: RequiredOperatorWindowEnvironment = {
```

这里把人工窗口要求固化成结构化字段：

```text
UPSTREAM_PROBES_ENABLED=true
UPSTREAM_ACTIONS_ENABLED=false
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
ORDER_PLATFORM_URL
MINIKV_HOST
MINIKV_PORT
```

这样后续 v193 做失败分类时，不需要从文档文字里猜运行条件。

### 3. 操作步骤明确“人启动、人停止”

文件：[realReadAdapterOperatorWindowRunbook.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterOperatorWindowRunbook.ts:417)

```ts
function createOperatorSteps(): OperatorWindowStep[] {
```

五步分别是：

```text
preflight
open-window
capture
close-window
archive
```

其中 `open-window` 和 `close-window` 的 owner 都是 `operator`，这直接把 Node 自动启动 Java/mini-kv 的风险挡掉。

### 4. 只读目标被硬编码成五个白名单

文件：[realReadAdapterOperatorWindowRunbook.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterOperatorWindowRunbook.ts:153)

```ts
const JAVA_ALLOWED_READS: readonly AllowedReadTarget[] = Object.freeze([
```

文件：[realReadAdapterOperatorWindowRunbook.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterOperatorWindowRunbook.ts:174)

```ts
const MINI_KV_ALLOWED_READS: readonly AllowedReadTarget[] = Object.freeze([
```

Java 只允许两个 GET，mini-kv 只允许 `HEALTH`、`INFOJSON`、`STATSJSON`。这些字段和 v191 adapter rehearsal 保持一致，不额外扩大读取面。

### 5. 检查项负责阻断越界配置

文件：[realReadAdapterOperatorWindowRunbook.ts](D:/nodeproj/orderops-node/src/services/realReadAdapterOperatorWindowRunbook.ts:467)

```ts
function createChecks(
```

核心检查包括：

```text
currentActionsDisabled
manualStartupDocumented
manualShutdownDocumented
allowedJavaReadsOnly
allowedMiniKvReadsOnly
forbiddenOperationsCovered
noAutomaticUpstreamStart
readyForProductionOperationsStillFalse
```

只要 `UPSTREAM_ACTIONS_ENABLED=true`，测试会确认 runbook 进入 `blocked`。

### 6. 路由保持 JSON/Markdown 双输出

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts:1603)

```ts
"/api/v1/production/real-read-adapter-operator-window-runbook",
```

它继续用项目已有的 `registerJsonMarkdownReportRoute` 模式，所以 API 输出和 Markdown 归档输出一致。

### 7. 测试覆盖默认 ready 和 actions 阻断

文件：[realReadAdapterOperatorWindowRunbook.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterOperatorWindowRunbook.test.ts:10)

```ts
it("builds a manual operator window runbook without contacting upstreams", () => {
```

这个测试证明默认配置下 runbook 可用于人工窗口评审，并且步骤、只读目标、禁用操作数量都固定。

文件：[realReadAdapterOperatorWindowRunbook.test.ts](D:/nodeproj/orderops-node/test/realReadAdapterOperatorWindowRunbook.test.ts:94)

```ts
it("blocks the runbook when upstream actions are enabled", () => {
```

这个测试把 `UPSTREAM_ACTIONS_ENABLED=true` 打开，确认 v192 不会继续宣称 ready。

## 验证

```text
npm run typecheck
npx vitest run test/realReadAdapterOperatorWindowRunbook.test.ts test/realReadAdapterRehearsal.test.ts
npm test
npm run build
```

结果：

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterOperatorWindowRunbook.test.ts test/realReadAdapterRehearsal.test.ts：2 files / 6 tests 通过
npm test：134 files / 459 tests 通过
npm run build：通过
```

## 成熟度变化

v192 让真实读取链路从“有 adapter rehearsal endpoint”推进到“有人工窗口操作说明”。这更接近生产流程，因为真实系统不会让控制面擅自启动交易核心或基础设施服务，而是要求操作者开窗口、采集证据、关闭窗口、再归档。

## 一句话总结

v192 给 v191 的真实只读 adapter rehearsal 补上了人工运行窗口 runbook，让 Node 能指导真实读取演练，但仍不启动上游、不写上游、不授权生产操作。
