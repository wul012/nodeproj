# 第三百七十一版代码讲解：minimal shard readiness live-read gate

本版目标是做三项目最小真实只读联调。v370 已经消费 Java v153 和 mini-kv v144 的静态只读证据；v371 则真正读取正在运行的 Java / mini-kv 服务，确认 live 输出和 v370 证据一致。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans3\v370-post-shard-readiness-contract-consumer-gate-roadmap.md
```

计划要求：

```text
Java 服务已启动，并能访问 GET /api/v1/ops/shard-readiness
mini-kv 服务已启动，并能返回 SHARDJSON
Node 只读读取，不自动启动或停止两边服务
```

本轮开始前已确认：

```text
Java 8080: LISTEN
mini-kv 6379: LISTEN
Java shard-readiness: HTTP 200
mini-kv SHARDJSON: 返回 shard-readiness.v1 JSON
```

## Client 改动

修改：

```text
src/clients/orderPlatformClient.ts
src/clients/miniKvClient.ts
```

Java client 新增：

```ts
shardReadiness(): Promise<UpstreamJsonResponse<OrderPlatformShardReadiness>> {
  return this.request("/api/v1/ops/shard-readiness");
}
```

mini-kv client 新增：

```ts
async shardJson(): Promise<MiniKvShardJsonResult> {
  const result = await this.execute("SHARDJSON");
  return {
    ...result,
    readiness: parseMiniKvShardJson(result.response),
  };
}
```

`validateRawGatewayCommand(...)` 也加入了 `SHARDJSON`。这是只读命令，不开放写路径。

## v371 类型与服务

新增类型：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateTypes.ts
```

核心结构是 `MinimalShardReadinessLiveReadObservation`，它记录每个 live read：

```text
attempted
status
transport
endpoint
command
latencyMs
requiredFieldCount
presentRequiredFieldCount
readOnlySafe
executionBlocked
compatibleWithV370Evidence
boundarySafe
readyForGate
```

新增服务：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate.ts
```

入口函数先消费 v370：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate({
  config: input.config,
  archiveRoot: projectRoot,
});
```

然后并行读取 Java 和 mini-kv：

```ts
const [javaLiveRead, miniKvLiveRead] = await Promise.all([
  readJavaShardReadiness(input.config, input.orderPlatform, sourceNodeV370Profile.javaShardReadiness),
  readMiniKvShardReadiness(input.config, input.miniKv, sourceNodeV370Profile.miniKvShardReadiness),
]);
```

这里没有启动进程，也没有调用写接口。

## Fail Closed 逻辑

如果 `UPSTREAM_PROBES_ENABLED=false`，服务不会尝试读取，而是返回：

```text
status = skipped-probes-disabled
readyForGate = false
```

如果 Java 或 mini-kv 读取失败，会返回：

```text
status = failed-read
errorCode = 对应错误
readyForGate = false
```

只有两边 live read 都满足字段完整、只读、安全边界和 v370 证据兼容，v371 才会 ready。

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate
```

它从 `AuditRouteDeps` 取得 `orderPlatform` 和 `miniKv` client，因此走的是应用内已有 client，不另建临时连接器。

## 测试覆盖

新增：

```text
test/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate.test.ts
```

覆盖三件事：

1. fake client 下 Java / mini-kv live read 都通过。
2. `UPSTREAM_PROBES_ENABLED=false` 时 fail closed 且不尝试读取。
3. route table 通过本地 mock Java HTTP server 和 mock mini-kv TCP server 输出 JSON / Markdown。

## 本版验证结果

```text
npm run typecheck: passed
focused vitest: 3 tests passed
grouped vitest: 7 tests passed
npm run build: passed
HTTP smoke: 27/27 checks passed
Playwright MCP screenshot: completed
```

## 项目成熟度影响

v371 是一个质变点：之前很多版本都在做证据、契约和门禁；这一版真正做到了：

```text
Node -> Java live read
Node -> mini-kv live read
仍然只读
仍然不自动启动/停止服务
仍然不让 mini-kv 成为权威存储
```

后续 v372 应先做 archive verification，而不是立刻继续扩展治理链。
