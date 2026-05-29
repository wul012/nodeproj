# 381 - Node v376 Java / mini-kv shard readiness evidence consumption 代码讲解

## 版本定位

Node v376 承接 v375 的 archive verification，负责消费 Java v154 与 mini-kv v145 的分片就绪证据。

核心边界很明确：

```text
Node 只读本地证据和 historical fixture
不启动 Java / mini-kv
不停止 Java / mini-kv
不写 Java / mini-kv
不打开 managed audit 连接
不把 shard readiness 解释成 active sharding
```

## 关键代码文件

### `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption.ts`

这个文件是 v376 的主服务。入口函数是：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionProfile
```

它先加载 v375：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification({
  config: input.config,
  archiveRoot: projectRoot,
})
```

这保证 v376 不绕开 v375 的归档结论。只有 v375 的 `readyForNodeV376JavaMiniKvShardEvidenceConsumption` 为真，v376 才能进入 ready。

### Java 证据为什么是两段

Java v154 的 hardening 文件并不重复所有核心字段，而是引用 Java v153：

```ts
const JAVA_V154_HARDENING_EVIDENCE =
  "D:/javaproj/advanced-order-platform/e/154/evidence/java-shard-readiness-hardening-v154.json";
const JAVA_V153_CORE_EVIDENCE =
  "D:/javaproj/advanced-order-platform/e/153/evidence/java-shard-readiness-v153.json";
```

对应的合并逻辑在 `mergedJavaContractView(...)`：

```ts
version: stringValue(hardening?.version) || "missing",
sourceCoreVersion: stringValue(sourceCore?.version) || null,
readOnly: booleanOrNull(hardening?.readOnly),
executionAllowed: booleanOrNull(hardening?.executionAllowed),
shardEnabled: booleanOrNull(sourceCore?.shardEnabled),
shardCount: numberOrNull(sourceCore?.shardCount),
slotCount: numberOrNull(sourceCore?.slotCount),
routingMode: stringValue(sourceCore?.routingMode) || null,
```

这段代码表达了一个重要事实：Java v154 是 hardening，Java v153 是核心字段来源。Node 不要求 Java v154 复制所有字段，而是验证它是否正确指回 v153。

### mini-kv v145 的冻结 fallback

mini-kv 当前证据仍在：

```ts
const MINI_KV_V145_EVIDENCE = "D:/C/mini-kv/fixtures/release/shard-readiness.json";
```

但 GitHub fallback 不使用滚动 current 文件，而使用 v145 冻结快照：

```ts
const MINI_KV_V145_HISTORICAL_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v145.json";
```

这样 v376 可以消费 v145，同时旧 v370 继续消费 `shard-readiness-v144.json`。这是本版最重要的稳定性修复。

### 证据检查

`createChecks(...)` 汇总了本版的硬门槛：

```ts
sourceNodeV375Ready
javaV154HardeningFilePresent
javaV153SourceCoreFilePresent
javaRequiredFieldsComplete
miniKvReleaseVersionV145
miniKvBoundarySafe
historicalFallbackCovered
digestCoverageComplete
nodeDoesNotStartOrStopUpstreams
```

其中 `miniKvBoundarySafe(...)` 会验证：

```ts
writeCommandsAllowed === false
adminCommandsAllowed === false
loadRestoreCompactAllowed === false
activeRouterInstalled === false
archivedNodeEvidenceMutated === false
```

所以 mini-kv v145 虽然已经有 shard readiness evidence，但仍不是 active shard router。

## 类型和渲染拆分

为避免继续制造大文件，本版把类型和 Markdown 渲染拆出：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionRenderer.ts
```

主 service 保留业务流程和检查逻辑，types 管 profile shape，renderer 管 Markdown 输出。这个拆分是为了符合“不要制造难维护巨型代码文件”的规则。

## 路由入口

v376 挂在 audit JSON/Markdown 路由表：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption
```

同一路径加 `?format=markdown` 可返回 Markdown。

## 测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption.test.ts
```

覆盖四类场景：

```text
1. 本地 sibling evidence 消费成功
2. forced historical fallback 消费成功
3. v375 源归档缺失时 fail closed
4. audit route 同时输出 JSON 和 Markdown
```

另外补跑了 v370 测试，确认旧版 mini-kv v144 fallback 不会被 v145 current 文件污染。

## 成熟度判断

v376 让 Node 的 shard readiness 链条更接近真实协作：它已经能同时消费 Java hardening 与 mini-kv hardening，并区分“additive hardening”和“核心字段来源”。

但它仍不是集群分片，也不是真实写路由。它只是把 shard-readiness.v1 的证据消费稳定下来，为后续真正的分片雏形做入口准备。
