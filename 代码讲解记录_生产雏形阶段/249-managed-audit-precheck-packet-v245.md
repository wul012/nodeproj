# 第二百四十五版代码讲解：managed audit sandbox connection precheck packet

本版目标是把 Node v244 的 upstream echo verification 往前推进一步，生成真实 sandbox connection 前必须人工确认的 precheck packet。它仍然不是连接实现，而是把 owner approval、credential handle review、schema rehearsal、operator window、rollback、abort、timeout 这些材料做成可验证的 Node 证据包。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v242-post-historical-evidence-fallback-roadmap.md
```

计划要求 Node v245 做：

```text
sandbox connection precheck packet
在 v244 三方 echo 通过后，生成真实 sandbox connection 前的 precheck packet
仍不连接 managed audit，不读取 credential value，不执行 schema migration，不启动 Java / mini-kv
```

v245 完成后，后续计划已经另起：

```text
D:\nodeproj\orderops-node\docs\plans\v245-post-sandbox-precheck-roadmap.md
```

这符合“一个计划覆盖的版本做完后另起续写”的规则，也避免 v242 计划继续膨胀。

## 新增 precheck packet 服务

新增文件：

```text
src/services/managedAuditManualSandboxConnectionPrecheckPacket.ts
```

profile 版本：

```ts
profileVersion: "managed-audit-manual-sandbox-connection-precheck-packet.v1"
```

状态字段：

```ts
precheckState: "manual-sandbox-connection-precheck-packet-ready" | "blocked"
```

这说明 v245 的职责是“连接前材料包”，不是 adapter connection，也不是 migration executor。

## 消费 Node v244

v245 不重新解释 Java v98 / mini-kv v107，而是直接消费 v244 已经完成的三方 echo verification：

```ts
const sourceV244 = loadManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification({
  config: input.config,
});
```

然后抽取 v244 的关键边界：

```ts
readyForUpstreamEchoVerification: source.readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification,
commandCountAligned: source.echoVerification.commandCountAligned,
credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
```

这样 v245 的来源是稳定的：只有 v244 已经证明三方边界一致时，v245 才能进入 ready。

## precheckPacket 的七类材料

核心结构在 `createPrecheckPacket()` 中生成：

```ts
ownerApprovalArtifact: {
  fieldName: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
  valueIncluded: false,
  approvedByNode: false,
},
```

credential 只保留 handle review：

```ts
credentialHandleReview: {
  fieldName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
  credentialHandleOnly: true,
  credentialValueIncluded: false,
  credentialValueRead: false,
},
```

schema migration 也只保留 rehearsal id：

```ts
schemaMigrationRehearsal: {
  fieldName: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
  rehearsalIdOnly: true,
  migrationSqlIncluded: false,
  migrationExecuted: false,
},
```

这三段是本版最重要的安全边界：Node 可以生成“需要人工审核什么”，但不会把真实 secret、SQL 或连接动作带进 profile。

## boundary 明确禁止真实动作

`boundary` 字段把禁止项写死为 false：

```ts
boundary: {
  dryRunOnly: true,
  actualConnectionAttempted: false,
  managedAuditStateWriteRequested: false,
  schemaMigrationRequested: false,
  approvalLedgerWriteRequested: false,
  javaSqlExecutionRequested: false,
  miniKvWritePermissionRequested: false,
  upstreamServiceAutoStartRequested: false,
},
```

这意味着 v245 即使处于 ready，也只是“precheck packet ready”，不是“connection ready”。

## checks 如何计算 ready

`createChecks()` 里先验证来源：

```ts
sourceNodeV244Ready: sourceNodeV244.readyForUpstreamEchoVerification,
sourceNodeV244BoundariesAligned:
  sourceNodeV244.commandCountAligned
  && sourceNodeV244.credentialBoundaryAligned
  && sourceNodeV244.connectionBoundaryAligned
  && sourceNodeV244.writeBoundaryAligned
  && sourceNodeV244.autoStartBoundaryAligned,
```

再验证本版材料完整和边界未破：

```ts
noCredentialValueRead:
  !packet.credentialHandleReview.credentialValueIncluded
  && !packet.credentialHandleReview.credentialValueRead,
noConnectionAttempted: !packet.boundary.actualConnectionAttempted,
noSchemaMigrationExecuted:
  !packet.schemaMigrationRehearsal.migrationSqlIncluded
  && !packet.schemaMigrationRehearsal.migrationExecuted
  && !packet.boundary.schemaMigrationRequested,
```

最后统一计算：

```ts
checks.readyForManagedAuditManualSandboxConnectionPrecheckPacket = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionPrecheckPacket")
  .every(([, value]) => value);
```

这保证 ready 不是手写结果，而是所有检查共同决定。

## route table 接入

改动文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增路由：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet",
  ...
)
```

新增路由后同步更新：

```ts
const ROUTE_REGISTRATION_TABLE_COUNT = 44;
```

这里继续沿用 v240 之后的 route table 规则，没有把 JSON / Markdown 样板写回 `auditRoutes.ts`。

## 测试

新增测试：

```text
test/managedAuditManualSandboxConnectionPrecheckPacket.test.ts
```

覆盖三件事：

```text
1. ready 路径：Node v244 通过后生成 precheck packet
2. blocked 路径：UPSTREAM_ACTIONS_ENABLED=true 时阻断
3. route 路径：JSON / Markdown 均可访问
```

本轮实际验证：

```text
npm run typecheck
focused tests: 3 files / 9 tests passed
npm test: 185 files / 622 tests passed
npm run build: passed
HTTP smoke: precheckState=manual-sandbox-connection-precheck-packet-ready, ready=true, productionBlockerCount=0
```

HTTP smoke 使用安全环境变量启动本轮 Node 服务，只访问 v245 JSON route，脚本结束后已停止该 Node 进程。

## 安全边界

本版继续保持：

```text
不读取 credential value
不打开 managed audit connection
不执行 schema migration
不写 Java ledger / SQL
不写 mini-kv storage
不启动 Java / mini-kv
```

## 下一步

v245 完成后，计划下一步是：

```text
推荐并行 Java v99 + mini-kv v108
```

Java v99 只读回显 Node v245 precheck packet，mini-kv v108 只读证明 non-participation。两边完成后，Node v246 再做 upstream receipt verification。

## 归档

```text
c/245/managed-audit-precheck-packet-v245.html
c/245/图片/managed-audit-precheck-packet-v245.png
c/245/解释/managed-audit-precheck-packet-v245.md
```
