# 382 - Node v377 Java / mini-kv shard readiness evidence consumption archive verification 代码讲解

## 版本定位

Node v377 承接 v376，做的是归档验证，不是新的上游读取。

核心边界：

```text
Node 只读 e/376 归档和 historical fixture
不启动 Java / mini-kv
不停止 Java / mini-kv
不写 Java / mini-kv
不重新执行 live read
不打开 managed audit 连接
```

## 关键代码文件

### `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerification.ts`

入口函数是：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerificationProfile
```

它先建立 v376 的归档引用：

```ts
const ARCHIVE_ROOT = "e/376" as const;
const V376_BASENAME = "java-mini-kv-shard-readiness-evidence-consumption-v376";
```

然后读取这些归档：

```ts
const archiveReferences = createArchiveReferences(projectRoot);
const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
const sourceNodeV376 = createSourceNodeV376(parsedArchive);
```

这说明 v377 的输入不是 Java / mini-kv 当前目录，而是 v376 已经冻结下来的归档结果。

### forced historical fallback 回放

v377 还会主动回放 v376 的历史 fixture：

```ts
const previous = process.env[FORCE_FALLBACK_ENV];
process.env[FORCE_FALLBACK_ENV] = "true";
```

回放时重新调用 v376 service：

```ts
const profile = loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption({
  config,
  archiveRoot: projectRoot,
});
```

这比只检查文件存在更稳，因为它证明 GitHub runner 缺少本地 sibling workspace 时，v376 仍能通过历史 fixture 得到同样的 Java v154/v153 与 mini-kv v145 结果。

### v145 冻结证据门禁

回放结果必须满足：

```ts
profile.miniKvShardReadiness.hardeningFile.usedHistoricalFallback
  && profile.miniKvShardReadiness.evidence.releaseVersion === "v145"
```

`collectProductionBlockers(...)` 也把这个约束写成硬门槛：

```ts
[checks.forcedFallbackUsesVersionedMiniKvSnapshot, "MINI_KV_FALLBACK_NOT_VERSIONED", "forced-historical-fallback", "mini-kv fallback must use shard-readiness-v145.json."]
```

这能防止旧版本被 mini-kv 后续 `shard-readiness.json` 的滚动内容污染。

## 类型和渲染拆分

为避免继续制造巨型文件，本版仍然拆成三段：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerificationRenderer.ts
```

主 service 管流程，types 管 profile shape，renderer 管 Markdown 输出。这个模式比把 service / type / renderer / route 文案塞进一个文件更容易维护。

## 路由入口

v377 通过 audit JSON/Markdown 路由表暴露：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption-archive-verification
```

同一路径加 `?format=markdown` 返回 Markdown。

## 测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerification.test.ts
```

覆盖三类场景：

```text
1. 验证 v376 归档和 forced historical fallback 回放
2. 归档缺失时 fail closed
3. 路由同时输出 JSON 和 Markdown
```

本版还同步重跑 v376 + v377 组合测试，确认 v376 改为冻结 `shard-readiness-v145.json` 后不会再被 mini-kv 后续版本影响。

## 验证结果

```text
npm run typecheck: passed
npx vitest run v370 + v376 + v377: 3 files / 11 tests passed
npm run build: passed
HTTP smoke: passed
  route: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption-archive-verification
  ready: true
  checks: 30/30
  markdown: 200
Playwright MCP screenshot: saved
Playwright MCP browser snapshot: saved
```

## 成熟度判断

v377 的价值是把 v376 的跨项目证据消费固化成可审计归档：它证明 Node 可以消费 Java / mini-kv 的完成证据，也能在 CI 环境用 historical fixture 复现。

但它仍不是真实分片，也不是 active shard router。后续 Node v378 只有在 Java / mini-kv 产出新的完成证据时才继续消费，否则应该暂停，而不是继续增加无意义的治理链。
