# 383 - Node v378 completed shard-readiness evidence intake 代码讲解

## 版本定位

Node v378 承接 v377，做的是“完成证据消费”：Java / mini-kv 已经各自完成新版本，Node 只把完成证据读入、校验、冻结，并为 v379 archive verification 做准备。

边界保持不变：

```text
不启动 Java / mini-kv
不停止 Java / mini-kv
不写 Java / mini-kv
不重新执行 live read
不打开 managed audit 连接
不把 readiness 解释成 active sharding
```

## 关键代码文件

### `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake.ts`

入口函数是：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeProfile
```

它先读取 v377 归档：

```ts
const SOURCE_NODE_V377_ARCHIVE =
  "e/377/evidence/java-mini-kv-shard-readiness-evidence-consumption-archive-verification-v377-http.json";
```

这保证 v378 不是绕过上一版直接消费上游，而是承接 v377 的归档验证结论。

### Java v155 / v156

Java 的两个输入分别是：

```ts
const JAVA_V155_INDEX =
  "D:/javaproj/advanced-order-platform/e/155/evidence/java-shard-readiness-evidence-index-v155.json";
const JAVA_V156_VERIFICATION =
  "D:/javaproj/advanced-order-platform/e/156/evidence/java-shard-readiness-evidence-verification-v156.json";
```

v155 提供 evidence index，v156 验证这个 index。v378 检查：

```text
Java v156 version == Java v156
Java v156 sourceIndexVersion == Java v155
Java v156 checks 8/8 passed
Java v155 evidence entries 2/2 frozen
Java v155 rollingCurrentPointerCount == 0
```

也就是说，Node 不再自己猜 Java v153/v154 的关系，而是消费 Java 已完成的 index + verification。

### mini-kv v146 冻结快照

mini-kv v146 的完成证据原本在 current 输出中：

```text
D:/C/mini-kv/fixtures/release/shard-readiness.json
```

但 v378 不读取这个滚动 current，而是定义版本化快照路径：

```ts
const MINI_KV_V146_SNAPSHOT =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v146.json";
const MINI_KV_V146_SNAPSHOT_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v146.json";
```

本版把 mini-kv v146 的完成证据复制进 Node historical fixture，使 resolver 读到冻结 `shard-readiness-v146.json`。这延续了 v376/v377 的经验：旧版本不能依赖滚动 current 文件。

### 关键检查

`createChecks(...)` 是本版核心门禁，包含：

```ts
javaV156ChecksAllPassed
javaV155EntriesFrozen
javaV155NoRollingCurrentPointers
miniKvV146HistoricalFallbackHardened
miniKvV146PreservesNodeV376
allEvidenceUsesHistoricalFallbackSnapshots
noRollingCurrentHistoricalBaseline
noAutomaticUpstreamStartStop
noUpstreamMutation
```

其中 `allEvidenceUsesHistoricalFallbackSnapshots` 要求 Java v155、Java v156 和 mini-kv v146 都解析到 Node historical fixture。这样 GitHub runner 不需要本地 sibling workspace，也能复现 v378。

## 类型和渲染拆分

本版继续拆三段：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeRenderer.ts
```

这种拆法避免新增巨型文件：service 管流程，types 管结构，renderer 管 Markdown。

## 路由入口

v378 路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake
```

加 `?format=markdown` 返回 Markdown。

## 测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake.test.ts
```

覆盖：

```text
1. 消费 Java v156/v155 与 mini-kv v146 冻结证据成功
2. forced historical fallback 下仍读取冻结证据
3. Node v377 源归档缺失时 fail closed
4. audit route 输出 JSON 和 Markdown
```

## 验证结果

```text
npm run typecheck: passed
v378 focused test: passed
v377 + v378 adjacent test: 2 files / 7 tests passed
npm run build: passed
HTTP smoke: passed
  route: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake
  ready: true
  checks: 38/38
  markdown: 200
Playwright MCP screenshot: saved
Playwright MCP browser snapshot: saved
```

## 成熟度判断

v378 把“Java / mini-kv 已完成版本可被 Node 消费”这件事推进了一步：Node 不是阻塞上游的审批中心，而是完成证据的消费者和门禁。

但这仍然不是集群分片。真正分片应该由 mini-kv 另开原型线；Java 只做只读 echo，Node 只消费 readiness 和 gate。
