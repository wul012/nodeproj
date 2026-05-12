# 78. Node v74：Fixture-driven smoke

## 模块角色

v74 新增 `upstreamContractFixtures.ts`，用来读取 Java v43 和 mini-kv v52 提供的稳定样本。

它解决的问题是：Node 的 smoke 不应该长期靠手写 mock 字段维持，而应该尽早消费上游项目自己维护的 contract sample。

## 配置入口

配置新增：

```ts
javaExecutionContractFixturePath: readString(
  env,
  "JAVA_EXECUTION_CONTRACT_FIXTURE_PATH",
  defaultJavaExecutionContractFixturePath(),
),
miniKvCheckJsonFixturePath: readString(
  env,
  "MINIKV_CHECKJSON_FIXTURE_PATH",
  defaultMiniKvCheckJsonFixturePath(),
),
```

默认路径指向当前三项目本地布局：

```text
D:\javaproj\advanced-order-platform\src\main\resources\static\contracts\failed-event-replay-execution-contract-approved.sample.json
D:\C\mini-kv\fixtures\checkjson\set-orderops-write-contract.json
```

如果目录变化，也可以通过环境变量覆盖。

## Fixture report 入口

核心函数：

```ts
export async function loadUpstreamContractFixtureReport(
  config: Pick<AppConfig, "javaExecutionContractFixturePath" | "miniKvCheckJsonFixturePath">,
): Promise<UpstreamContractFixtureReport> {
```

它先读取两个 JSON 文件：

```ts
const javaResult = await readJsonFixture(config.javaExecutionContractFixturePath);
const miniKvResult = await readJsonFixture(config.miniKvCheckJsonFixturePath);
```

然后转换为统一 source：

```ts
const java = createJavaSource(config.javaExecutionContractFixturePath, javaResult);
const miniKv = createMiniKvSource(config.miniKvCheckJsonFixturePath, miniKvResult);
```

最后生成 report。

## Java 样本校验

Java fixture 必须满足：

```ts
return readString(details, "contractVersion") === "failed-event-replay-execution-contract.v1"
  && isSha256Digest(readString(details, "contractDigest"))
  && isSha256Digest(readString(details, "approvalDigest"))
  && isSha256Digest(readString(details, "replayEligibilityDigest"))
  && readBoolean(details, "replayPreconditionsSatisfied") === true
  && readString(details, "digestVerificationMode") === "CLIENT_PRECHECK_ONLY"
  && readStringArray(details.expectedSideEffects).length > 0;
```

这和 Node v71-v73 关心的 execution-contract 字段保持一致。

## mini-kv 样本校验

mini-kv fixture 必须满足：

```ts
return isPositiveInteger(readNumber(details, "schema_version"))
  && isFnv1a64Digest(readString(details, "command_digest"))
  && readBoolean(details, "read_only") === true
  && readBoolean(details, "execution_allowed") === false
  && readNumber(details, "side_effect_count") === sideEffects.length
  && typeof readNested(details, ["wal", "durability"]) === "string";
```

重点是 `read_only=true` 和 `execution_allowed=false`，这保证 CHECKJSON 仍然只是只读执行契约。

## 路由层

`statusRoutes.ts` 新增：

```ts
app.get("/api/v1/upstream-contract-fixtures", ...)
```

它支持 JSON 和 Markdown：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderUpstreamContractFixtureReportMarkdown(report);
}
```

这让 fixture report 可以直接归档到版本目录，也能作为后续 smoke 的第一步检查。

## 一句话总结

v74 把 Java / mini-kv 的真实稳定样本纳入 Node 自己的控制面能力，为后续 fixture drift diagnostics 打基础。
