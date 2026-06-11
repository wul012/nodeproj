# 384 - Node v379 completed shard-readiness evidence intake archive verification 代码讲解

## 版本定位

Node v379 承接 v378，做 archive verification。它验证的是 v378 的归档完整性和冻结证据回放能力，不读取新的 Java / mini-kv 当前进度。

边界：

```text
不启动 Java / mini-kv
不停止 Java / mini-kv
不写 Java / mini-kv
不重新执行 live read
不打开 managed audit 连接
```

## 关键代码文件

### `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerification.ts`

入口函数：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerificationProfile
```

它固定读取 v378 的归档根：

```ts
const ARCHIVE_ROOT = "e/378" as const;
const V378_BASENAME = "java-mini-kv-completed-shard-readiness-evidence-intake-v378";
```

并把 JSON、Markdown、summary、snapshot、HTML、截图、说明、代码讲解、计划和索引都登记为 archive reference。

### v378 回放

v379 不只是检查文件存在，还会重新调用 v378 service：

```ts
const profile = loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake({
  config,
  archiveRoot: projectRoot,
});
```

回放必须满足：

```text
readyForCompletedShardReadinessEvidenceIntake: true
javaVerificationFile.usedHistoricalFallback: true
javaIndexFile.usedHistoricalFallback: true
miniKvSnapshotFile.usedHistoricalFallback: true
miniKvEvidence.releaseVersion: v146
```

这证明 v378 不是依赖本机 Java / mini-kv 工作区当前状态，而是依赖 Node 已冻结的 historical fixture。

### 关键检查

`createChecks(...)` 包括：

```text
archiveFilesPresent
jsonIntakeReady
jsonEvidenceVersionsMatch
jsonUsesFrozenHistoricalSnapshots
summaryMatchesJson
browserSnapshotPresent
explanationRecordsFrozenMiniKvV146
replayReady
replayUsesFrozenMiniKvV146
noAutomaticUpstreamStartStop
noUpstreamMutation
```

这里最关键的是 `jsonUsesFrozenHistoricalSnapshots` 和 `replayUsesFrozenMiniKvV146`，它们锁住 v378 对 Java v156/v155 和 mini-kv v146 的冻结读取语义。

## 类型和渲染拆分

本版继续拆三段：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerificationRenderer.ts
```

主 service 约束流程，types 约束 profile，renderer 输出 Markdown，没有新增巨型文件。

## 路由入口

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification
```

加 `?format=markdown` 返回 Markdown。

## 测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerification.test.ts
```

覆盖：

```text
1. 验证 v378 归档和冻结证据回放
2. v378 归档缺失时 fail closed
3. audit route 输出 JSON 和 Markdown
```

## 验证结果

```text
npm run typecheck: passed
v379 focused test: passed
v378 + v379 adjacent test: 2 files / 7 tests passed
npm run build: passed
HTTP smoke: passed
  route: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification
  ready: true
  checks: 31/31
  markdown: 200
Playwright MCP screenshot: saved
Playwright MCP browser snapshot: saved
```

## 成熟度判断

v379 把 v378 的跨项目完成证据消费固化为可审计归档。到这里，Node 已经能稳定消费 Java / mini-kv 的冻结 readiness 证据。

下一步不能继续无限堆 archive 链：要么消费新的完成证据，要么明确进入最小只读 live-read gate。
