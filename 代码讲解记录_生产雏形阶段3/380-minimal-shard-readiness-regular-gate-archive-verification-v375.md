# 第三百七十五版代码讲解：minimal shard readiness regular gate archive verification

本版做的是 v374 regular gate 的归档验证。它不再生成新的上游判断，也不重新跑 Java / mini-kv live read，只检查 v374 的归档材料是否完整、可读、可追溯。

## 本版所处项目进度

计划来源：

```text
docs/plans3/v374-post-minimal-shard-readiness-regular-gate-roadmap.md
```

计划明确要求：

```text
Node v375：regular gate archive verification
消费 Node v374 的 JSON、Markdown、summary、HTML、截图、解释、代码讲解和计划索引
不启动、不停止、不写入 Java / mini-kv
```

Java v154 和 mini-kv v145 已经完成并行 hardening，本版只把 Node 自己的 v374 归档收好，为 v376 消费新证据做准备。

## 类型定义

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationTypes.ts
```

核心归档引用是：

```ts
export interface MinimalShardReadinessRegularGateArchiveReferences {
  archiveRoot: "e/374";
  jsonEvidence: MinimalShardReadinessRegularGateArchiveFileReference;
  markdownEvidence: MinimalShardReadinessRegularGateArchiveFileReference;
  summaryEvidence: MinimalShardReadinessRegularGateArchiveFileReference;
  browserSnapshot: MinimalShardReadinessRegularGateArchiveFileReference;
  htmlArchive: MinimalShardReadinessRegularGateArchiveFileReference;
  screenshot: MinimalShardReadinessRegularGateArchiveFileReference;
  explanation: MinimalShardReadinessRegularGateArchiveFileReference;
  codeWalkthrough: MinimalShardReadinessRegularGateArchiveFileReference;
  sourcePlan: MinimalShardReadinessRegularGateArchiveFileReference;
  plansIndex: MinimalShardReadinessRegularGateArchiveFileReference;
  archiveIndex: MinimalShardReadinessRegularGateArchiveFileReference;
}
```

这和 v372 的 archive verification 模式一致：证据文件、截图、解释、代码讲解、计划索引都必须在同一版闭环里可读。

## 服务实现

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification.ts
```

入口函数：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationProfile
```

它只读取本地归档：

```ts
const archiveReferences = createArchiveReferences(projectRoot);
const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
const sourceNodeV374 = createSourceNodeV374(parsedArchive);
```

这里没有 `orderPlatform`，也没有 `miniKv` client，所以不会访问 Java / mini-kv 服务。

## 归档 digest

`createArchiveVerification(...)` 会把 11 个归档文件的 path、digest、byteLength 放进稳定 digest：

```ts
const archiveFileDigests = [
  refs.jsonEvidence,
  refs.markdownEvidence,
  refs.summaryEvidence,
  refs.browserSnapshot,
  refs.htmlArchive,
  refs.screenshot,
  refs.explanation,
  refs.codeWalkthrough,
  refs.sourcePlan,
  refs.plansIndex,
  refs.archiveIndex,
].map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
```

这让后续版本能判断 v374 归档是否被改动过。

## checks

本版主要检查：

```ts
archiveFilesPresent
jsonEvidenceReadable
jsonProfileVersionValid
jsonGateReady
jsonSourceNodeV373Ready
jsonRegularGateDigestStable
jsonChecksAllPassed
summaryMatchesJson
markdownRecordsRegularGate
browserSnapshotPresent
screenshotAndHtmlPresent
explanationRecordsRegularGateAndBoundary
codeWalkthroughPresent
sourcePlanPointsToV375AndV376
planIndexReferencesV374AndV375
archiveIndexReferencesV374
routeRecordedInArchive
noAutomaticUpstreamStartStop
noManagedAuditConnection
```

其中 `sourcePlanPointsToV375AndV376` 会检查当前计划是否明确写到 Node v375 和 Node v376，也会检查 Java v154 / mini-kv v145 是否作为下一步消费对象出现。

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate-archive-verification
```

仍通过 `auditJsonMarkdownRoute(...)` 输出 JSON 和 Markdown。

## 测试覆盖

新增：

```text
test/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification.test.ts
```

覆盖：

```text
1. 正常验证 v374 归档。
2. archiveRoot 为空时 fail closed。
3. audit route 返回 JSON 和 Markdown。
```

## 本版验证结果

已运行：

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification.test.ts
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification.test.ts
npm run build
Node HTTP smoke on port 4386
Playwright MCP screenshot through local static archive page on port 4387
```

HTTP smoke 摘要：

```text
archiveVerificationState = minimal-shard-readiness-regular-gate-archive-verified
readyForMinimalShardReadinessRegularGateArchiveVerification = true
readyForNodeV376JavaMiniKvShardEvidenceConsumption = true
checkCount = 27
passedCheckCount = 27
archiveFileCount = 11
presentArchiveFileCount = 11
productionBlockerCount = 0
```

## 下一步

v376 应消费 Java v154 / mini-kv v145 的新一轮 shard-readiness 证据。它仍应默认只读，不启动、不停止、不写入 Java / mini-kv。
