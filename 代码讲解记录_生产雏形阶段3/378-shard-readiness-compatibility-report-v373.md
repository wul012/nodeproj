# 第三百七十三版代码讲解：shard readiness compatibility report

本版做的是 shard readiness compatibility report。它不再读 Java / mini-kv 服务，而是把 v370、v371、v372 形成的证据链做一次一致性判断：静态 contract 证据和真实只读归档证据是否匹配。

## 本版所处项目进度

计划来源：

```text
docs/plans3/v372-post-minimal-shard-readiness-live-read-archive-verification-roadmap.md
```

计划明确要求：

```text
Node v373：shard readiness compatibility report
消费 Node v370 静态 contract consumer gate 和 Node v371/v372 live-read archive
不启动、不停止、不写入 Java / mini-kv
```

## 类型定义

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportTypes.ts
```

关键结构是：

```ts
export interface ShardReadinessCompatibilityFieldCheck {
  project: "advanced-order-platform" | "mini-kv";
  field: string;
  staticValue: string | number | boolean | null;
  liveValue: string | number | boolean | null;
  matches: boolean;
}
```

这个类型把“静态证据”和“真实只读输出”逐字段摆在一起。这样报告不是笼统说兼容，而是能看到每个字段是否一致。

项目级报告是：

```ts
export interface ShardReadinessCompatibilityProjectReport {
  project: "advanced-order-platform" | "mini-kv";
  staticReady: boolean;
  liveReady: boolean;
  readOnlySafe: boolean;
  executionBlocked: boolean;
  activeShardingEnabled: boolean;
  fieldCount: number;
  matchedFieldCount: number;
  mismatchedFields: string[];
  compatibleForRegularGate: boolean;
}
```

这里刻意保留 `activeShardingEnabled`，因为 v373 只证明 readiness 兼容，不证明分片已启用。

## 服务实现

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.ts
```

入口函数：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportProfile
```

注意这里同样没有 `orderPlatform` 或 `miniKv` client。它只消费本地证据：

```ts
const staticGate = loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate(...);
const archiveVerification =
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification(...);
```

这意味着 v373 即使在 Java / mini-kv 服务关闭后也可以运行。

## 字段对比

对比字段固定为：

```ts
const COMPATIBILITY_FIELDS = Object.freeze([
  "project",
  "version",
  "readOnly",
  "executionAllowed",
  "shardEnabled",
  "shardCount",
  "slotCount",
  "routingMode",
  "status",
]);
```

`createFieldChecks(...)` 把 v370 的 `ShardReadinessEvidenceAssessment.evidence` 和 v371 归档里的 `liveRead.evidence` 对齐：

```ts
const staticValue = primitiveValue((staticEvidence.evidence as unknown as Record<string, unknown>)[field]);
const liveValue = primitiveValue(liveRead?.evidence?.[field]);
```

只比较 primitive 值，避免把嵌套对象、诊断对象和未来扩展字段误纳入当前常规门禁判断。

## 兼容判断

项目级兼容的条件是：

```ts
staticEvidence.readyForNodeConsumption
&& liveReady
&& readOnlySafe
&& executionBlocked
&& !activeShardingEnabled
&& mismatchedFields.length === 0
```

这组条件表达了当前阶段的真实边界：

```text
静态证据 ready
真实只读归档 ready
字段一致
仍然只读
仍然禁止执行
没有启用 active sharding
```

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-compatibility-report
```

路由只传 `config`，不传上游 client。这保证 v373 不会重新访问已经关闭的 Java / mini-kv 服务。

## 测试覆盖

新增：

```text
test/managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.test.ts
```

覆盖：

```text
1. 正常读取 v370/v372 证据并生成兼容报告。
2. 空 archiveRoot 下 fail closed。
3. audit route 返回 JSON 和 Markdown。
```

测试断言了：

```text
projectReportCount = 2
compatibleProjectCount = 2
fieldCheckCount = 18
matchedFieldCheckCount = 18
mismatchedFieldCount = 0
rerunsLiveRead = false
startsJavaService = false
stopsMiniKvService = false
```

## 本版验证结果

已运行：

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.test.ts
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification.test.ts test\managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.test.ts
npm run build
Node HTTP smoke on port 4382
Playwright MCP screenshot through local static archive page on port 4383
```

HTTP smoke 摘要：

```text
compatibilityState = shard-readiness-compatible-for-regular-gate
readyForShardReadinessCompatibilityReport = true
readyForNodeV374MinimalShardReadinessRegularGate = true
checkCount = 23
passedCheckCount = 23
fieldCheckCount = 18
matchedFieldCheckCount = 18
mismatchedFieldCount = 0
productionBlockerCount = 0
```

## 下一步

v374 应做 minimal shard readiness regular gate，把 v370-v373 的证据链收束为一个常规门禁。Java 和 mini-kv 可以并行继续 hardening，Node 后续只消费它们的新证据，不再把自己放在所有进度的前置审批中心。
