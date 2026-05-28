# 第三百六十九版代码讲解：minimal read-only operator/CI regular gate handoff

本版目标是把已经跑通的最小只读联调证据，整理成 operator / CI 可以长期复用的固定门禁。它不是再做一层归档，而是把后续 Java 和 mini-kv 可以并行推进的契约冻结下来。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans3\v368-post-minimal-read-only-integration-gate-execution-archive-verification-roadmap.md
```

计划要求 Node v369 做：

```text
operator/CI regular gate handoff
read-only-integration.v1 contract freeze
shard-readiness.v1 contract freeze
让 Java / mini-kv 后续可以并行产出 shard readiness 证据
```

这说明主线已经从“证明最小只读联调能跑通”，转向“把联调门禁常规化，并允许另外两个项目并行往 shard readiness 方向推进”。

## 契约文件

新增文件：

```text
fixtures/upstream-contracts/read-only-integration.v1.json
fixtures/upstream-contracts/shard-readiness.v1.json
```

`read-only-integration.v1` 固定最小只读联调字段：

```json
{
  "project": "...",
  "version": "...",
  "readOnly": true,
  "executionAllowed": false,
  "status": "...",
  "evidencePath": "..."
}
```

`shard-readiness.v1` 在这个基础上增加：

```json
{
  "shardEnabled": true,
  "shardCount": 1,
  "slotCount": 16384,
  "routingMode": "static-slot-table"
}
```

这里的重点不是让 Node 管理分片，而是让 mini-kv 和 Java 后续都按同一个只读证据格式输出结果。

## 类型定义

新增文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffTypes.ts
```

其中 `FrozenContractReference` 记录契约是否存在、是否 frozen、字段是否齐全，以及是否明确要求：

```ts
readOnlyRequired: boolean;
executionAllowedRequired: boolean;
automaticUpstreamStartAllowed: boolean;
```

这三个字段让 Node 可以在运行时 fail closed：契约文件缺失或字段不匹配时，v369 不会把 handoff 判为 ready。

`ParallelShardReadinessPlan` 明确三条轨道：

```text
mini-kv: shard readiness prototype
Java: shard readiness echo
Node: contract consumer and integration gate
```

这正是本版要固化的分工：Node 不再挡住另外两个项目先产出只读证据。

## 服务实现

新增文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.ts
```

入口函数先消费 v368：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification({
  config: input.config,
  archiveRoot: projectRoot,
});
```

然后构造三块核心数据：

```ts
const sourceNodeV368 = createSourceNodeV368(sourceNodeV368Profile);
const frozenContracts = createFrozenContracts(projectRoot);
const parallelShardReadinessPlan = createParallelShardReadinessPlan(frozenContracts);
```

`createChecks(...)` 是本版的门禁中心。它要求：

```text
Node v368 ready
Node v367 5/5 read passed
v368 archive files complete
read-only-integration.v1 frozen
shard-readiness.v1 frozen
不启动 Java / mini-kv
不连接 managed audit
不读取 credential value
不解析 raw endpoint URL
```

最终通过：

```ts
checks.readyForOperatorCiRegularGateHandoff = Object.entries(checks)
  .filter(([key]) => key !== "readyForOperatorCiRegularGateHandoff")
  .every(([, value]) => value);
```

也就是说，只要任意一项边界不满足，整个 handoff 就会变成 blocked。

## 路由接入

修改文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-operator-ci-regular-gate-handoff
```

它同时支持 JSON 和 Markdown，沿用既有 audit route table，不单独复制新的路由分支。

## 测试覆盖

新增测试：

```text
test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.test.ts
```

测试覆盖三件事：

1. 正常工程目录下，v369 ready，30/30 checks 通过。
2. 空目录下缺少契约和归档时，必须 fail closed。
3. audit 路由能输出 JSON 和 Markdown。

其中第二点很关键：本版不是“只要字段看起来对就 ready”，而是缺证据就 blocked。

## 本版验证结果

```text
npm run typecheck: passed
focused vitest: 3 tests passed
grouped vitest: 6 tests passed
npm run build: passed
HTTP smoke: 30/30 checks passed
Playwright MCP screenshot: completed
```

本轮验证没有启动 Java / mini-kv，也没有打开 managed audit 真实连接。

## 项目成熟度影响

v369 的价值在于把 Node 的职责收窄：

```text
以前：Node 容易变成所有进度的前置审批中心
现在：Node 冻结契约，等待 Java / mini-kv 并行产出证据，再做联调门禁
```

这让后续真正进入 shard readiness 方向更顺：mini-kv 可以先做分片雏形，Java 可以先做 echo，Node 等两边证据就绪后消费，而不是每一步都先由 Node 写一版前置归档。
