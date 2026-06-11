# 第三百七十二版代码讲解：minimal shard readiness live-read archive verification

本版接在 v371 之后。v371 已经真实读取了 Java `/api/v1/ops/shard-readiness` 和 mini-kv `SHARDJSON`；v372 不再重新读取两边服务，而是验证 v371 的归档证据是否完整、稳定、可复查。

## 本版所处项目进度

计划来源：

```text
docs/plans3/v371-post-minimal-shard-readiness-live-read-gate-roadmap.md
```

该计划明确要求：

```text
Node v372：minimal shard readiness live-read archive verification
消费 v371 的 JSON / Markdown / summary / screenshot / explanation / walkthrough
不重新读取 Java / mini-kv
```

## 类型定义

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationTypes.ts
```

核心类型是 `MinimalShardReadinessLiveReadArchiveReferences`，固定记录 11 个 v371 证据文件：

```ts
jsonEvidence
markdownEvidence
summaryEvidence
browserSnapshot
htmlArchive
screenshot
explanation
codeWalkthrough
sourcePlan
plansIndex
archiveIndex
```

每个引用都包含：

```ts
path: string;
exists: boolean;
byteLength: number;
digest: string | null;
```

这样 v372 不只是看“文件名存在”，还会确认文件非空并有稳定 digest。

## 服务实现

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification.ts
```

入口函数是：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile
```

注意参数里没有 `orderPlatform` 和 `miniKv` client。这个设计是本版最重要的边界：v372 只读本地归档，不具备重新访问 Java 或 mini-kv 的依赖入口。

服务流程是：

```ts
const archiveReferences = createArchiveReferences(projectRoot);
const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
const sourceNodeV371 = createSourceNodeV371(parsedArchive);
const liveReads = createLiveReads(parsedArchive);
const checks = createChecks(...);
```

`createSourceNodeV371(...)` 从 v371 JSON 中提取稳定字段：

```text
gateState
gateDecision
readyForMinimalShardReadinessLiveReadGate
readyForNodeV372LiveReadArchiveVerification
sourceNodeV370GateDigest
gateDigest
javaStatus
miniKvStatus
attemptedReadCount
passedReadCount
checkCount
passedCheckCount
```

这些字段共同证明：v371 确实是一次成功的最小真实只读联调，而不是只有文档说明。

## 关键检查

`createChecks(...)` 是 v372 的核心。它检查：

```text
archiveFilesPresent
jsonEvidenceReadable
jsonProfileVersionValid
jsonGateReady
jsonSourceNodeV370Ready
jsonBothLiveReadsPassed
summaryMatchesJson
markdownRecordsGateAndReads
browserSnapshotPresent
screenshotAndHtmlPresent
explanationRecordsLiveReadAndBoundary
codeWalkthroughPresent
sourcePlanPointsToV372
planIndexReferencesV371AndV372
archiveIndexReferencesV371
archiveVerificationDoesNotRerunLiveRead
noAutomaticUpstreamStartStop
noUpstreamMutation
noManagedAuditConnection
```

其中最能体现边界的是：

```ts
archiveVerificationDoesNotRerunLiveRead: !verification.rerunsLiveRead,
noAutomaticUpstreamStartStop: !verification.startsUpstreamServices && !verification.stopsUpstreamServices,
noUpstreamMutation: !verification.writesUpstreamState,
```

这说明 v372 不负责再执行联调，只负责确认 v371 的联调结果已经被可靠保存。

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-archive-verification
```

路由只传 `config`，不传上游 client，确保路由层也不会绕过服务边界重新读取 Java / mini-kv。

## 测试覆盖

新增：

```text
test/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification.test.ts
```

覆盖三类场景：

```text
1. 正常读取 e/371 归档并验证 ready。
2. archiveRoot 指向空目录时 fail closed。
3. audit route 同时返回 JSON 和 Markdown。
```

空目录测试证明 v372 不会在缺少归档时“假装成功”：

```ts
expect(profile.archiveVerificationState).toBe("blocked");
expect(profile.readyForMinimalShardReadinessLiveReadArchiveVerification).toBe(false);
```

## 本版验证结果

已运行：

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification.test.ts
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification.test.ts
npm run build
Node HTTP smoke on port 4380
Playwright MCP screenshot through local static archive page on port 4381
```

HTTP smoke 摘要：

```text
archiveVerificationState = minimal-shard-readiness-live-read-archive-verified
readyForMinimalShardReadinessLiveReadArchiveVerification = true
readyForNodeV373ShardReadinessCompatibilityReport = true
checkCount = 29
passedCheckCount = 29
archiveFileCount = 11
presentArchiveFileCount = 11
productionBlockerCount = 0
rerunsLiveRead = false
startsJavaService = false
startsMiniKvService = false
stopsJavaService = false
stopsMiniKvService = false
executionAllowed = false
```

## 下一步

v373 应做 shard readiness compatibility report：

```text
消费 v370 静态证据
消费 v371 live-read 归档
消费 v372 archive verification
判断 contract 字段、真实只读输出和归档证据是否一致
```

如果 v373 通过，后续可以把 v370-v373 收束成常规门禁；Java 和 mini-kv 仍可并行继续做 shard-readiness hardening，不需要被 Node 当成前置审批中心卡住。
