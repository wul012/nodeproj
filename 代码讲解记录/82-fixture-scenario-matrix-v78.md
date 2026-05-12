# 82. Node v78：Fixture scenario matrix

## 模块角色

v78 新增 `upstreamContractFixtureScenarioMatrix.ts`，作用是把四类上游 fixture 统一成一张可诊断矩阵。

四类场景是：

```text
java-approved-replay-contract
java-blocked-replay-contract
mini-kv-write-checkjson
mini-kv-read-checkjson
```

这不是执行入口，只是只读证据聚合。

## 配置入口

v78 扩展了 `AppConfig`：

```ts
javaExecutionContractFixturePath: string;
javaExecutionContractBlockedFixturePath: string;
miniKvCheckJsonFixturePath: string;
miniKvCheckJsonReadFixturePath: string;
```

默认路径分别指向：

```text
D:\javaproj\advanced-order-platform\...\failed-event-replay-execution-contract-approved.sample.json
D:\javaproj\advanced-order-platform\...\failed-event-replay-execution-contract-blocked.sample.json
D:\C\mini-kv\fixtures\checkjson\set-orderops-write-contract.json
D:\C\mini-kv\fixtures\checkjson\get-orderops-read-contract.json
```

## 加载流程

核心入口：

```ts
export async function loadUpstreamContractFixtureScenarioMatrix(config): Promise<UpstreamContractFixtureScenarioMatrix> {
  const [
    javaApproved,
    javaBlocked,
    miniKvWrite,
    miniKvRead,
  ] = await Promise.all([
    readJsonFixture(config.javaExecutionContractFixturePath),
    readJsonFixture(config.javaExecutionContractBlockedFixturePath),
    readJsonFixture(config.miniKvCheckJsonFixturePath),
    readJsonFixture(config.miniKvCheckJsonReadFixturePath),
  ]);

  return createUpstreamContractFixtureScenarioMatrix([
    createJavaApprovedScenario(javaApproved),
    createJavaBlockedScenario(javaBlocked),
    createMiniKvWriteScenario(miniKvWrite),
    createMiniKvReadScenario(miniKvRead),
  ]);
}
```

四个文件都是本地 fixture，只读加载，不连 Java / mini-kv 运行时。

## blocked sample 不是失败

Java blocked 场景的关键检查是：

```ts
checkPath(details, "replayPreconditionsSatisfied", "javaReplayPreconditionsSatisfied", false, (value) => value === false)
checkValue("blockedBy", "javaBlockedBy", "non-empty array", ...)
checkValue("expectedSideEffects", "javaExpectedSideEffects", "empty array", ...)
checkValue("executionChecks", "javaExecutionChecks", "at least one FAILED", ...)
```

也就是说，blocked sample 只要明确表达“不能执行”和“为什么不能执行”，它就是一个有效诊断样本。

## mini-kv read sample 语义

mini-kv read 场景固定检查当前真实语义：

```ts
checkPath(details, "command", "miniKvCommand", "GET", ...)
checkPath(details, "write_command", "miniKvWriteCommand", false, ...)
checkPath(details, "read_only", "miniKvCheckReadOnly", true, ...)
checkPath(details, "execution_allowed", "miniKvCheckExecutionAllowed", false, ...)
checkValue("side_effects", "miniKvSideEffects", "[store_read]", ...)
checkPath(details, "side_effect_count", "miniKvSideEffectCount", 1, ...)
```

这里刻意保留：

```text
side_effects=["store_read"]
side_effect_count=1
```

这是 mini-kv 的真实解释语义，不为了 Node matrix 改成空数组。

## matrix 汇总

`createUpstreamContractFixtureScenarioMatrix` 会聚合：

```ts
totalScenarios
validScenarios
diagnosticReadyScenarios
issueCount
missingFixtureCount
invalidFixtureCount
javaScenarioCount
miniKvScenarioCount
```

同时把每个失败 check 转成 matrix 级 drift issue：

```ts
scenarioId
field
expected
actual
message
```

正常情况下 v78 输出：

```text
totalScenarios=4
validScenarios=4
diagnosticReadyScenarios=4
issueCount=0
```

## 路由层

新增路由：

```ts
GET /api/v1/upstream-contract-fixtures/scenario-matrix
```

Markdown 输出：

```ts
GET /api/v1/upstream-contract-fixtures/scenario-matrix?format=markdown
```

路由只调用：

```ts
loadUpstreamContractFixtureScenarioMatrix(deps.config)
```

没有执行 Java replay POST，也没有发送 mini-kv 写命令。

## 一句话总结

v78 把四类上游 fixture 从“分散样本”推进为“统一矩阵”，让 Node 能同时判断 approved、blocked、write、read 场景是否满足 diagnostics 所需字段。
