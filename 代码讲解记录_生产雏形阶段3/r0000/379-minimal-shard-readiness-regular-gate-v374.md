# 第三百七十四版代码讲解：minimal shard readiness regular gate

本版做的是 minimal shard readiness regular gate。它把 v370-v373 的证据链收束为一个常规门禁，供后续 operator / CI 判断使用。重点不是再做一次 live read，而是证明“已经归档的真实只读证据可以被稳定消费”。

## 本版所处项目进度

计划来源：

```text
docs/plans3/v373-post-shard-readiness-compatibility-report-roadmap.md
```

计划明确要求：

```text
Node v374：minimal shard readiness regular gate
消费 v370 静态证据、v371 live-read 归档、v372 archive verification、v373 compatibility report
不启动、不停止、不写入 Java / mini-kv
```

这意味着 Java 和 mini-kv 可以并行继续开发；Node v374 不把自己放在它们前面做审批中心。

## 类型定义

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateTypes.ts
```

核心结构之一是：

```ts
export interface MinimalShardReadinessRegularGateRecord {
  gateDigest: string;
  gateMode: "minimal-shard-readiness-regular-gate";
  sourceSpan: "Node v370-v373 shard readiness evidence chain";
  contractVersion: "shard-readiness-regular-gate.v1";
  consumesStaticContractGate: true;
  consumesLiveReadArchive: true;
  consumesArchiveVerification: true;
  consumesCompatibilityReport: true;
  operatorCiReady: boolean;
  activeShardingEnabled: false;
  readOnlyReadinessOnly: true;
  rerunsLiveRead: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
}
```

这里把 v374 的边界写成类型：它消费完整证据链，但不重新跑 live read、不启动上游、不写上游状态。

## 服务实现

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate.ts
```

入口函数是：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateProfile
```

它先读取 v373：

```ts
const sourceProfile = loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport({
  config: input.config,
  archiveRoot: input.archiveRoot ?? process.cwd(),
});
```

注意这里没有 Java client，也没有 mini-kv client。v374 只消费本地归档证据。

## regular gate digest

`createRegularGate(...)` 会把来源 digest 和门禁模式一起做稳定 digest：

```ts
const record = {
  gateMode: "minimal-shard-readiness-regular-gate" as const,
  sourceSpan: "Node v370-v373 shard readiness evidence chain" as const,
  contractVersion: "shard-readiness-regular-gate.v1" as const,
  sourceCompatibilityReportDigest: source.compatibilityReportDigest,
  sourceStaticGateDigest: source.sourceStaticGateDigest,
  sourceLiveReadGateDigest: source.sourceLiveReadGateDigest,
  sourceArchiveVerificationDigest: source.sourceArchiveVerificationDigest,
  operatorCiReady: ready,
};
```

这个 digest 是 v375 归档验证要消费的核心证据。

## 防止并行开发污染归档证据

本版还修正了：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.ts
```

v373 compatibility report 原本会重新调用 v370 static gate。如果 Java / mini-kv 正在并行推进，当前本地证据可能已经比 v370-v371 归档更新，导致 v374 重刷时把“归档链”误判成漂移。

新增逻辑：

```ts
const staticGate = readArchivedStaticGate(projectRoot)
  ?? loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate(...);
```

它优先读取：

```text
e/370/evidence/shard-readiness-contract-consumer-gate-v370-http.json
```

这样 v373/v374 这种归档链报告消费的是已冻结证据，不会被 Java / mini-kv 后续优化或字段状态变化影响。

## readiness checks

`createChecks(...)` 固定检查：

```ts
sourceNodeV373Ready
sourceDigestChainComplete
sourceProjectReportsComplete
sourceFieldChecksAllMatched
sourceProductionBlockersClear
regularGateDigestStable
operatorCiReady
noLiveReadRerun
noAutomaticUpstreamStartStop
noUpstreamMutation
noManagedAuditConnection
```

其中 `operatorCiReady` 不再依赖 draft gate 自己的 ready 值，而是直接来自 v373 兼容报告和字段匹配结果：

```ts
operatorCiReady:
  source.readyForNodeV374MinimalShardReadinessRegularGate
  && source.projectReportCount === source.compatibleProjectCount
  && source.fieldCheckCount === source.matchedFieldCheckCount
  && source.mismatchedFieldCount === 0
```

这样避免了“draft gate 还没 ready，却用 draft ready 反推自己 ready”的循环判断。

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate
```

它通过统一的 `registerAuditJsonMarkdownRoute(...)` 暴露 JSON 和 Markdown，保持 audit route 结构一致。

## 测试覆盖

新增：

```text
test/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate.test.ts
```

覆盖：

```text
1. 正常冻结 v370-v373 证据链为 regular gate。
2. v373 来源不可用时 fail closed。
3. audit route 同时返回 JSON 和 Markdown。
```

测试断言了：

```text
readyForMinimalShardReadinessRegularGate = true
readyForNodeV375RegularGateArchiveVerification = true
fieldCheckCount = 18
matchedFieldCheckCount = 18
productionBlockerCount = 0
rerunsLiveRead = false
startsJavaService = false
stopsMiniKvService = false
executionAllowed = false
```

## 本版验证结果

已运行：

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate.test.ts
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate.test.ts
npm run build
Node HTTP smoke on port 4384
Playwright MCP screenshot through local static archive page on port 4385
```

HTTP smoke 摘要：

```text
gateState = minimal-shard-readiness-regular-gate-ready
gateDecision = freeze-minimal-shard-readiness-regular-gate
readyForMinimalShardReadinessRegularGate = true
readyForNodeV375RegularGateArchiveVerification = true
checkCount = 18
passedCheckCount = 18
sourceProjectReportCount = 2
sourceCompatibleProjectCount = 2
sourceFieldCheckCount = 18
sourceMatchedFieldCheckCount = 18
sourceMismatchedFieldCount = 0
productionBlockerCount = 0
```

## 下一步

v375 应做 regular gate archive verification，验证 v374 的 JSON、Markdown、summary、HTML、截图、解释、代码讲解和计划索引是否完整。Java / mini-kv 可以并行继续做 shard readiness hardening；Node 后续只消费已完成的新证据。
