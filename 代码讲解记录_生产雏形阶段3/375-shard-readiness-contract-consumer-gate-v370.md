# 第三百七十版代码讲解：shard readiness contract consumer gate

本版目标是让 Node 消费 Java v153 和 mini-kv v144 的只读分片就绪证据。它不是正式启用分片，也不是让 Node 管理分片，而是验证两边输出已经足够让 Node v371 做最小真实只读联调。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans3\v369-post-operator-ci-regular-gate-handoff-roadmap.md
```

计划要求 Node v370 做：

```text
shard readiness contract consumer gate
消费 Java v153 / mini-kv v144 的 shard-readiness.v1 只读证据
不启动两边服务
不写上游
不连接 managed audit
```

Java v153 和 mini-kv v144 已经分别完成，所以本版可以推进。

## 核心文件

新增类型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateTypes.ts
```

它定义了三个关键结构：

```ts
ShardReadinessEvidenceFileReference
ShardReadinessEvidenceAssessment
ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile
```

其中 `ShardReadinessEvidenceAssessment` 是本版的核心，它把 Java / mini-kv 的原始 JSON 转成统一视图，并记录：

```text
requiredFieldCount
presentRequiredFieldCount
missingRequiredFields
readOnlySafe
executionBlocked
shardCountValid
slotCountValid
routingModePresent
statusAccepted
boundarySafe
readyForNodeConsumption
```

## 服务实现

新增服务：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.ts
```

入口函数先加载 Node v369：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff({
  config: input.config,
  archiveRoot: projectRoot,
});
```

然后读取两边证据：

```ts
assessShardReadinessEvidence("advanced-order-platform", "Java v153", JAVA_SHARD_READINESS_EVIDENCE);
assessShardReadinessEvidence("mini-kv", "mini-kv v144", MINI_KV_SHARD_READINESS_EVIDENCE);
```

这里没有 HTTP 调用，也没有启动服务。它只读取已经存在的证据文件，并通过 `resolveHistoricalEvidencePath(...)` 支持 GitHub runner 的历史 fixture fallback。

## 安全边界

`createChecks(...)` 要求：

```text
Node v369 ready
Java evidence 文件存在
mini-kv evidence 文件存在
两边 required fields 齐全
两边 readOnly=true
两边 executionAllowed=false
mini-kv 边界字段全部安全
Node 不启动 upstream
Node 不修改 sibling state
managed audit connection 关闭
production audit/window 仍 blocked
```

mini-kv 的边界检查会继续看：

```text
orderAuthoritative=false
auditAuthoritative=false
writeCommandsAllowed=false
adminCommandsAllowed=false
loadRestoreCompactAllowed=false
setnxexExecutionAllowed=false
multiProcessStarted=false
storageDirectoriesCreated=false
```

这保证 v370 消费的是“分片就绪证据”，不是“分片已经成为权威存储”。

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate
```

它沿用 audit JSON/Markdown route table，避免再复制一套路由分支。

## 测试覆盖

新增测试：

```text
test/managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.test.ts
```

覆盖四个场景：

1. 正常消费 Java v153 + mini-kv v144，31/31 checks 通过。
2. 强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 时使用历史 fixture。
3. 空归档目录下 fail closed。
4. route table 输出 JSON 和 Markdown。

## 本版验证结果

```text
npm run typecheck: passed
focused vitest: 4 tests passed
grouped vitest: 7 tests passed
npm run build: passed
HTTP smoke: 31/31 checks passed
Playwright MCP screenshot: completed
```

## 项目成熟度影响

v370 是从“治理前置”走向“真实联调前夜”的关键一步：

```text
v369: 冻结契约，允许 Java / mini-kv 并行
v370: 消费两边只读证据，确认 contract consumer gate 通过
v371: 在用户确认服务已启动后，做最小 live-read gate
```

这让 Node 不再无限前置归档，而是回到真实开发流程：消费上游证据、做联调门禁、等待真实服务窗口。
