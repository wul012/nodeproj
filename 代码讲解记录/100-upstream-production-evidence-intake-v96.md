# v96 代码讲解：Upstream production evidence intake

## 本版目标与系统定位

v96 是 `docs/plans/v95-production-gap-roadmap.md` 里 Node 回到上游证据链的第一步。前置条件是 Java v45 已经提供 `/api/v1/ops/evidence`，mini-kv v54 已经提供 `STORAGEJSON`。

本版的 Node 角色不是执行器，而是控制面证据入口：

```text
Java = 订单交易核心，提供 ops evidence
mini-kv = 自研 KV 基础设施，提供 STORAGEJSON
Node = 读取并归一化这两份只读证据
```

因此本版新增的是 intake endpoint，不是 replay endpoint，也不是 mini-kv command proxy。它只判断“这些上游生产证据是否安全、只读、可被后续 readiness summary 使用”。

## 入口路由

入口在 `src/routes/statusRoutes.ts`：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/upstreams/production-evidence-intake", {
```

路由内部只调用 service：

```ts
const intake = await loadUpstreamProductionEvidenceIntake(deps.config);

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderUpstreamProductionEvidenceIntakeMarkdown(intake);
}
```

这里没有请求体，没有 operator，没有确认词，也没有 idempotency key。原因是它不承载写操作，只把 Java / mini-kv 的证据样本读进 Node 控制面。

## 响应模型与核心字段

核心模型在 `src/services/upstreamProductionEvidenceIntake.ts`：

```ts
export interface UpstreamProductionEvidenceIntake {
  valid: boolean;
  readOnly: true;
  executionAllowed: false;
  sources: {
    java: UpstreamEvidenceSource;
    miniKv: UpstreamEvidenceSource;
  };
```

几个字段的控制面语义：

```text
valid=true
```

说明 Node 成功读取并验证两份上游证据结构。

```text
readOnly=true
executionAllowed=false
```

说明这个 Node endpoint 自身也是证据接口，不允许被 Dashboard、CI 或后续自动化解释成真实执行许可。

```text
productionBlockerCount=0
```

只表示“上游证据接入没有结构性阻塞”，不表示整个 Node 控制面生产 ready。真正的生产阻塞还在 audit store、access control 等后续版本里继续收敛。

## 服务层核心逻辑

配置入口在 `src/config.ts`：

```ts
javaOpsEvidenceFixturePath: readString(
  env,
  "JAVA_OPS_EVIDENCE_FIXTURE_PATH",
  defaultJavaOpsEvidenceFixturePath(),
),
miniKvStorageEvidenceFixturePath: readString(
  env,
  "MINIKV_STORAGE_EVIDENCE_FIXTURE_PATH",
  defaultMiniKvStorageEvidenceFixturePath(),
),
```

这两个配置让本地和 CI 都能使用仓库内样本；以后如果要接真实上游，也可以显式改成真实导出的 evidence 文件。

读取逻辑是：

```ts
const java = await readJsonEvidence(config.javaOpsEvidenceFixturePath, "java");
const miniKv = await readJsonEvidence(config.miniKvStorageEvidenceFixturePath, "mini-kv");
```

这里仍然是读文件样本，不启动 Java，也不连接 mini-kv。这样 GitHub Actions 不需要额外服务就能验证控制面契约。

核心检查集中在 `checks`：

```ts
javaReadOnly: readBoolean(java, "readOnly") === true,
javaExecutionBlocked: readBoolean(java, "executionAllowed") === false,
javaReplayNotAllowedByEvidence: readBoolean(readRecord(java, "failedEventReplay"), "realReplayAllowedByEvidence") === false,
miniKvReadOnly: readBoolean(miniKv, "read_only") === true,
miniKvExecutionBlocked: readBoolean(miniKv, "execution_allowed") === false,
miniKvNotOrderAuthoritative: readBoolean(readRecord(miniKv, "store"), "order_authoritative") === false
  && readBoolean(readRecord(miniKv, "diagnostics"), "order_authoritative") === false,
```

这几项把 Java 和 mini-kv 的字段翻译成 Node 控制面的硬边界：Java evidence 不能授权 replay，mini-kv storage evidence 不能被当成订单权威存储。

## 阻断、预警与安全边界

结构性问题会进入 `productionBlockers`：

```ts
addMessage(blockers, checks.javaExecutionBlocked, "JAVA_EXECUTION_ALLOWED", "java", ...);
addMessage(blockers, checks.javaReplayNotAllowedByEvidence, "JAVA_REPLAY_ALLOWED_BY_EVIDENCE", "java", ...);
addMessage(blockers, checks.miniKvExecutionBlocked, "MINIKV_EXECUTION_ALLOWED", "mini-kv", ...);
addMessage(blockers, checks.miniKvNotOrderAuthoritative, "MINIKV_ORDER_AUTHORITATIVE", "mini-kv", ...);
```

这些 blocker 防的是最危险的误用：把 evidence 读成执行许可，或者把 mini-kv 读成订单真相。

预警则保留上游自身的运行状态：

```ts
if (javaBlockers.length > 0) {
  warnings.push({
    code: "JAVA_EVIDENCE_HAS_RUNTIME_BLOCKERS",
```

Java 样本里有 `READ_ONLY_EVIDENCE_ENDPOINT`、Outbox/RabbitMQ 禁用等 blockers，这是 Java 侧环境的真实说明，不影响 Node intake 的结构有效性。

## 测试覆盖

测试文件是 `test/upstreamProductionEvidenceIntake.test.ts`。

第一组测试验证仓库内样本能被 Node 默认配置读取：

```ts
expect(intake).toMatchObject({
  valid: true,
  readOnly: true,
  executionAllowed: false,
  checks: {
    javaEvidenceVersionOk: true,
    miniKvNoWriteCommandsExecuted: true,
    executionStillBlocked: true,
  },
});
```

第二组测试故意构造危险证据：

```ts
executionAllowed: true,
realReplayAllowedByEvidence: true,
write_commands_executed: true,
order_authoritative: true,
```

并断言这些危险字段会变成 blockers。这样后续如果 Java 或 mini-kv 的 evidence 语义漂移，Node 不会悄悄把它吞掉。

第三组测试覆盖 HTTP JSON / Markdown：

```ts
url: "/api/v1/upstreams/production-evidence-intake?format=markdown",
```

它保证 endpoint 可被归档、截图，也能被后续 readiness summary 或 Dashboard 消费。

## 一句话总结

v96 把 Java v45 与 mini-kv v54 的只读生产证据接入 Node 控制面，并明确锁住“不授权 Java replay、不执行 mini-kv 写命令、不把 mini-kv 当订单权威存储”的边界，为后续 v99 production readiness summary v2 准备上游证据输入。
