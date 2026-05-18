# 第二百四十四版代码讲解：manual sandbox dry-run command upstream echo verification

本版目标是把 Node v243、Java v98、mini-kv v107 三边证据合成一份 upstream echo verification。它不是执行入口，而是确认三方对 disabled dry-run command package 的理解一致。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v242-post-historical-evidence-fallback-roadmap.md
```

计划要求 Node v244 做：

```text
manual sandbox dry-run command upstream echo verification
只读消费 Java v98 + mini-kv v107 回执
验证三方 command package 字段、digest、禁用状态和 no-write / no-start 边界一致
```

这说明当前主线已经从“Node 自检 command package”推进到“三项目只读回执对齐”。

## 新增 upstream echo verification

新增文件：

```text
src/services/managedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification.ts
```

profile 版本：

```ts
profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification.v1"
```

状态字段：

```ts
verificationState:
  "manual-sandbox-dry-run-command-upstream-echo-verification-ready" | "blocked"
```

这说明 v244 是 verifier，不是 precheck packet，也不是 connection opener。

## sourceNodeV243

v244 先读取 v243：

```ts
const sourceV243 = loadManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport({
  config: input.config,
});
```

然后提取 v241 command package 经 v243 验证后的核心字段：

```ts
commandCount: source.sourceNodeV241.commandCount,
disabledByDefault: source.sourceNodeV241.disabledByDefault,
dryRunOnly: source.sourceNodeV241.dryRunOnly,
carriesCredentialValue: source.sourceNodeV241.carriesCredentialValue,
actualConnectionAttempted: source.sourceNodeV241.actualConnectionAttempted,
managedAuditStateWriteRequested: source.sourceNodeV241.managedAuditStateWriteRequested,
```

这表示 v244 不绕过 v243，也不重新解释 v241，而是消费已经收口的 verification report。

## Java v98 echo

Java v98 通过文档和 builder 证据表达：

```text
managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt
readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification=true
commandCount=6
credentialValueReadByJava=false
schemaMigrationSqlExecutedByJava=false
```

代码里对应检查：

```ts
readyForNodeV244Alignment: reference.evidencePresent
  && reference.verificationDocumented
  && reference.commandCount === 6
  && reference.readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification
```

Java 的角色是只读 echo，不写 ledger、不执行 SQL、不读取 credential value。

## mini-kv v107 receipt

mini-kv v107 的结构化回执来自：

```text
manual_sandbox_dry_run_command_non_participation_receipt
```

Node v244 会解析 JSON：

```ts
const nestedReceipt = objectField(receipt, "manual_sandbox_dry_run_command_non_participation_receipt");
const sourcePackage = objectField(receipt, "source_command_package");
```

关键字段包括：

```ts
sourcePackageCommandCount: 6
sourcePackageDisabledByDefault: true
sourcePackageDryRunOnly: true
miniKvAutoStartAllowed: false
storageWriteAllowed: false
credentialValueReadAllowed: false
```

这证明 mini-kv 只是 non-participation evidence provider，不是 audit storage backend，也不会执行 LOAD/COMPACT/RESTORE/SETNXEX。

## 三方对齐 checks

核心 checks 集中在 `createChecks()`：

```ts
commandCountAligned:
  sourceNodeV243.commandCount === 6
  && javaV98.commandCount === 6
  && miniKvV107.sourcePackageCommandCount === 6,
```

credential 边界：

```ts
credentialBoundaryAligned:
  !sourceNodeV243.carriesCredentialValue
  && !javaV98.credentialValueReadByJava
  && !miniKvV107.credentialValueReadAllowed,
```

写入边界：

```ts
writeBoundaryAligned:
  !javaV98.approvalLedgerWrittenByJava
  && !javaV98.schemaMigrationSqlExecutedByJava
  && !miniKvV107.storageWriteAllowed
  && !miniKvV107.managedAuditWriteExecuted,
```

auto-start 边界：

```ts
autoStartBoundaryAligned:
  !javaV98.upstreamServiceAutoStartRequestedByJava
  && !miniKvV107.nodeAutoStartAllowed
  && !miniKvV107.javaAutoStartAllowed
  && !miniKvV107.miniKvAutoStartAllowed,
```

这些全部通过，v244 才能进入 ready。

## 路由接入

改动文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增路由：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
  ...
)
```

新增路由后同步更新：

```ts
const ROUTE_REGISTRATION_TABLE_COUNT = 43;
```

这里仍然遵守 v240 后的路由注册表规则，没有把 JSON / Markdown 分支写回 `auditRoutes.ts`。

## CI fallback

本版新增：

```text
fixtures/historical/managed-audit-command-upstream-echo-verification/
```

Java v98 / mini-kv v107 先读本机兄弟仓库；如果 CI 没有 `D:/javaproj` 或 `D:/C/mini-kv`，就读取 Node 仓库内 fixture：

```ts
const walkthroughPath = firstExistingPath(JAVA_V98_WALKTHROUGH, JAVA_V98_WALKTHROUGH_FALLBACK);
const receiptPath = firstExistingPath(MINI_KV_V107_RECEIPT, MINI_KV_V107_RECEIPT_FALLBACK);
```

这延续了 v242/v243 的 CI-stable 思路。

## 测试

新增测试：

```text
test/managedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification.test.ts
```

覆盖三件事：

```text
1. ready 路径：Node v243 + Java v98 + mini-kv v107 三方对齐
2. blocked 路径：UPSTREAM_ACTIONS_ENABLED=true 时阻断
3. route 路径：JSON / Markdown 均可访问
```

本轮实际验证：

```text
npm run typecheck
focused tests: 3 files / 9 tests passed
npm test: 184 files / 619 tests passed
npm run build
HTTP smoke: ready=true, productionBlockerCount=0
```

HTTP smoke 使用安全环境变量启动本轮 Node 服务，只访问 v244 JSON route，脚本结束后已停止该 Node 进程。

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

v244 完成后，计划下一步是：

```text
Node v245：sandbox connection precheck packet
```

v245 仍然只能生成 precheck 材料，不能打开真实连接。

## 归档

```text
c/244/managed-audit-upstream-echo-verification-v244.html
c/244/图片/managed-audit-upstream-echo-verification-v244.png
c/244/解释/managed-audit-upstream-echo-verification-v244.md
```
