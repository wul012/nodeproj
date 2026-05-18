# 第二百四十三版代码讲解：manual sandbox dry-run command package verification report

本版目标是把 Node v241 的 disabled dry-run command package 做成一份可读、可测、可被后续 Java v98 / mini-kv v107 消费的 verification report。v243 不继续推进真实连接，而是确认命令包本身仍然安全。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v242-post-historical-evidence-fallback-roadmap.md
```

计划要求 Node v243 做：

```text
manual sandbox dry-run command package verification report
消费 Node v241 command package 与 Node v242 CI-stable historical fixture fallback
验证 command shape、disabled-by-default、no credential value、no connection、no mutation、route registration 与 archive evidence
不修改 Java / mini-kv
不打开 managed audit connection
```

这说明当前主线已经从“生成 command package”进入“验证 command package 可被上游安全回显”的阶段。

## 新增 verification report

新增文件：

```text
src/services/managedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport.ts
```

profile 版本：

```ts
profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report.v1"
```

状态字段：

```ts
reportState: "manual-sandbox-dry-run-command-package-verification-ready" | "blocked"
```

这说明 v243 是 verification report，不是 executor，也不是 connection gate。

## sourceNodeV241

v243 先读取 v241：

```ts
const sourceV241 = loadManagedAuditManualSandboxConnectionDryRunCommandPackage({ config: input.config });
```

然后提取关键字段：

```ts
commandCount: source.commandPackage.commandCount,
disabledByDefault: source.commandPackage.disabledByDefault,
dryRunOnly: source.commandPackage.dryRunOnly,
carriesCredentialValue: source.commandPackage.carriesCredentialValue,
actualConnectionAttempted: source.commandPackage.actualConnectionAttempted,
managedAuditStateWriteRequested: source.commandPackage.managedAuditStateWriteRequested,
```

也就是说，v243 不是重新构造命令包，而是验证 v241 的实际输出是否仍符合预期。

## sourceNodeV242

v243 还读取 v242 修复后的旧计划链路：

```ts
const sourceV242 = loadManagedAuditSandboxAdapterDryRunPlan({ config: input.config });
```

并确认：

```ts
sourcePlanState: "sandbox-adapter-dry-run-plan-ready"
historicalFixturePresent: true
ciStableFallback: true
```

这里的意义是：GitHub CI 不需要 `D:/javaproj` 或 `D:/C/mini-kv`，也能让旧 v223/v224 链路保持 ready。

## CI fallback for upstream context

本版最容易踩坑的地方是：v243 如果直接读取本机的 Java / mini-kv 兄弟仓库路径，GitHub CI 会因为没有这些路径而变成 blocked。

所以代码增加了 Node 仓库内 fallback fixture：

```ts
const COMMAND_PACKAGE_VERIFICATION_FIXTURE_ROOT =
  "fixtures/historical/managed-audit-command-package-verification";
```

读取 Java v97 时先找本机路径，找不到再使用 fixture：

```ts
const walkthroughPath = firstExistingPath(JAVA_V97_WALKTHROUGH, JAVA_V97_WALKTHROUGH_FALLBACK);
```

mini-kv v106 也是同样模式：

```ts
const commandCppPath = firstExistingPath(MINI_KV_COMMAND_CPP, MINI_KV_COMMAND_CPP_FALLBACK);
```

这个设计保持了本机开发时可以消费真实兄弟仓库证据，同时让 CI 环境不依赖开发机磁盘结构。

## checks

核心检查集中在 `createChecks()`：

```ts
commandShapeAccepted: sourceNodeV241.commandCount === 6
  && sourceNodeV241.disabledByDefault
  && sourceNodeV241.dryRunOnly,
```

这条检查锁定 v241 命令包的基本形状：必须还是 6 个命令，且默认禁用、只做 dry-run。

credential 边界：

```ts
noCredentialValueAccepted: !sourceNodeV241.carriesCredentialValue,
```

连接边界：

```ts
noConnectionAccepted: !sourceNodeV241.actualConnectionAttempted
  && !sourceNodeV241.readyForManagedAuditSandboxAdapterConnection,
```

写入边界：

```ts
noMutationAccepted: !sourceNodeV241.managedAuditStateWriteRequested
  && !sourceNodeV241.schemaMigrationRequested,
```

CI fallback 边界：

```ts
sourceNodeV242HistoricalFallbackReady:
  sourceNodeV242.historicalFixturePresent && sourceNodeV242.ciStableFallback,
```

这些检查全部通过后，v243 才能进入 ready 状态。

## 路由接入

改动文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增路由：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report",
  ...
)
```

这里继续走 `auditJsonMarkdownRoute` 注册表，符合 v240 后的路由质量规则，没有把 JSON / Markdown 分支重新写回 `auditRoutes.ts`。

新增这条路由后，路由表数量从 41 变成 42：

```ts
const ROUTE_REGISTRATION_TABLE_COUNT = 42;
```

这不是业务功能变化，而是维护 v240 route registration table quality pass 的滚动计数。否则 v241 command package 会因为 route table quality pass 失效而被误判为 blocked。

同时，mini-kv 当前 runtime smoke fixture 已经把 consumer hint 滚动到 Node v244：

```text
Node v244 manual sandbox dry-run command upstream echo verification
```

所以 v233-v237 旧链路也补了可接受的 rolling consumer hint，避免历史链路因为 current fixture 前进而失效。

## 测试

新增测试：

```text
test/managedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport.test.ts
```

覆盖三件事：

```text
1. ready 路径：v241 command package + v242 fallback 全部通过
2. blocked 路径：UPSTREAM_ACTIONS_ENABLED=true 时阻断
3. route 路径：JSON / Markdown 均可访问
```

测试中明确断言：

```ts
commandCount: 6
disabledByDefault: true
carriesCredentialValue: false
historicalFixturePresent: true
nodeV243BlocksRealConnection: true
```

本轮实际验证：

```text
npm run typecheck
focused tests: 6 files / 18 tests passed
npm test: 183 files / 616 tests passed
npm run build
HTTP smoke: ready=true, productionBlockerCount=0
```

HTTP smoke 使用安全环境变量启动本轮 Node 服务，只访问 v243 JSON route，脚本结束后已停止该 Node 进程。

## 安全边界

本版继续保持：

```text
不读取 credential value
不打开 managed audit connection
不执行 schema migration
不写 managed audit state
不启动 Java / mini-kv
不修改 Java / mini-kv
```

## 下一步

v243 完成后，计划已经切到：

```text
推荐并行 Java v98 + mini-kv v107
```

Node v244 必须等待两边完成只读 echo / non-participation receipt 后再推进，不能抢跑。

## 归档

```text
c/243/managed-audit-command-package-verification-report-v243.html
c/243/图片/managed-audit-command-package-verification-report-v243.png
c/243/解释/managed-audit-command-package-verification-report-v243.md
```
