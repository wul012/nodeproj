# 第 241 版代码讲解：managed audit manual sandbox connection dry-run command package

本版目标是做一次“对齐后推进”：Node v240 已经把 audit route 注册表拆出来，Java 已推进到 v97，mini-kv 已推进到 v106。v241 不再停留在等待状态，而是把这三边优化结果固化成一个新的 Node profile：默认 disabled 的 manual sandbox connection dry-run command package。

## 本版所处项目进度

最新计划仍来自：

```text
D:\nodeproj\orderops-node\docs\plans\v237-post-readiness-gate-roadmap.md
```

这条主线的当前状态是：

```text
Node v239: operator window evidence verification ready
Node v240: route registration table quality pass ready
Java v97: release approval rehearsal builder chain refactor ready
mini-kv v106: command dispatch table ready
```

v241 的职责不是打开真实 managed audit sandbox connection，而是把这些完成状态汇总成可审计的 command package。这个 package 给后续 operator review 使用，仍然不能执行连接。

## 1. 新服务文件

新增文件：

```text
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionDryRunCommandPackage.ts
```

核心 profile 类型写明了本版边界：

```ts
export interface ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile extends SandboxDryRunGuards {
  profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-package.v1";
  packageState: "manual-sandbox-connection-dry-run-command-package-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionDryRunCommandPackage: boolean;
  readOnlyCommandPackage: true;
  sourceNodeV239: { ... };
  sourceNodeV240: { ... };
  upstreamOptimizationEvidence: {
    javaV97: UpstreamOptimizationReference;
    miniKvV106: UpstreamOptimizationReference;
  };
  commandPackage: { ... };
  disabledCommands: ManualSandboxConnectionDisabledCommand[];
}
```

这里继续继承 `SandboxDryRunGuards`，也就是沿用 v232 后抽出的统一安全边界：

```ts
readyForProductionAudit: false
readyForProductionWindow: false
readyForProductionOperations: false
executionAllowed: false
restoreExecutionAllowed: false
connectsManagedAudit: false
readsManagedAuditCredential: false
storesManagedAuditCredential: false
schemaMigrationExecuted: false
automaticUpstreamStart: false
```

这保证 v241 新增的是 review package，不是执行入口。

## 2. 消费 Node v239

v241 读取 v239 的 operator window evidence verification：

```ts
const sourceV239Profile = loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification({
  config: input.config,
});
```

然后 `createSourceNodeV239(...)` 只提取和本版相关的字段：

```ts
verificationDigest: source.operatorWindowEvidenceVerification.verificationDigest,
readyForOperatorWindowEvidenceVerification:
  source.readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification,
javaEchoAccepted: source.operatorWindowEvidenceVerification.javaEchoAccepted,
miniKvReceiptAccepted: source.operatorWindowEvidenceVerification.miniKvReceiptAccepted,
boundaryFlagsAligned: source.operatorWindowEvidenceVerification.boundaryFlagsAligned,
readyForSandboxAdapterConnectionFromSource: source.readyForManagedAuditSandboxAdapterConnection,
connectsManagedAudit: source.connectsManagedAudit,
readsManagedAuditCredential: source.readsManagedAuditCredential,
schemaMigrationExecuted: source.schemaMigrationExecuted,
```

这段代码的意思是：v241 承认 v239 的三方证据已经对齐，但仍要求 v239 明确没有打开连接、没有读 credential、没有执行 schema migration。

## 3. 消费 Node v240

v241 同时读取 v240 的路由注册表质量优化：

```ts
const sourceV240Profile = loadManagedAuditRouteRegistrationTableQualityPass({
  config: input.config,
});
```

对应抽取：

```ts
qualityPassState: source.qualityPassState,
qualityDigest: source.qualityDigest,
routeRegistrationMode: source.refactorScope.routeRegistrationMode,
auditRoutesAfterLineCount: source.codeShape.auditRoutesAfterLineCount,
readyForRouteRegistrationTableQualityPass: source.readyForManagedAuditRouteRegistrationTableQualityPass,
connectsManagedAudit: source.connectsManagedAudit,
```

这让 v241 可以证明：新增路由时没有绕回旧的 `auditRoutes.ts` 大文件模式，而是继续走 v240 建好的 route table。

## 4. 只读核对 Java v97

v241 没有构建、启动或测试 Java，只读读取 Java v97 的归档和源码锚点：

```ts
const JAVA_V97_RUNBOOK = "D:/javaproj/advanced-order-platform/c/97/解释/说明.md";
const JAVA_V97_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/100-version-97-release-approval-rehearsal-builder-chain-refactor.md";
const JAVA_V97_CHAIN_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder.java";
```

`createJavaV97Reference()` 检查的关键点包括：

```ts
snippet("java-v97-builder-chain", JAVA_V97_WALKTHROUGH, "release approval rehearsal builder chain refactor"),
snippet("java-v97-contract-preserved", JAVA_V97_WALKTHROUGH, "外部契约和 digest 不变"),
snippet("java-v97-boundary-preserved", JAVA_V97_WALKTHROUGH, "read-only/no-ledger/no-SQL/no-connection 边界"),
snippet("java-v97-ops-service-lines", JAVA_V97_WALKTHROUGH, "OpsEvidenceService.java: 606"),
```

这里把 Java v97 定位成质量上下文：它证明 Java 端已经重构收口，但不提供 Node 连接权限。

## 5. 只读核对 mini-kv v106

mini-kv 同样只读核对：

```ts
const MINI_KV_V106_RUNBOOK = "D:/C/mini-kv/c/106/解释/说明.md";
const MINI_KV_V106_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/162-version-106-command-dispatch-table.md";
const MINI_KV_COMMAND_CPP = "D:/C/mini-kv/src/command.cpp";
```

关键 snippet：

```ts
snippet("mini-kv-v106-title", MINI_KV_V106_WALKTHROUGH, "mini-kv v106 command dispatch table"),
snippet("mini-kv-v106-dispatch-table", MINI_KV_V106_WALKTHROUGH, "dispatch table"),
snippet("mini-kv-v106-behavior-preserved", MINI_KV_V106_WALKTHROUGH, "保持所有外部行为不变"),
snippet("mini-kv-v106-command-table-code", MINI_KV_COMMAND_CPP, "command_dispatch_table"),
```

这说明 mini-kv v106 完成了命令分发表优化，但仍不是 managed audit storage backend，也不是 Java order authority。

## 6. 生成 disabled command package

本版最核心的对象是 `commandPackage`：

```ts
packageMode: "manual-sandbox-connection-disabled-dry-run-command-package",
commandCount: disabledCommands.length,
disabledByDefault: true,
dryRunOnly: true,
carriesCredentialValue: false,
actualConnectionAttempted: false,
schemaMigrationRequested: false,
managedAuditStateWriteRequested: false,
upstreamServiceAutoStartRequested: false,
miniKvWritePermissionRequested: false,
readyForManagedAuditSandboxAdapterConnection: false,
```

它有 6 个命令条目：

```ts
disabledCommand("review-owner-approval-artifact", "Review owner approval artifact id"),
disabledCommand("verify-credential-handle", "Verify credential handle name only"),
disabledCommand("review-schema-rehearsal", "Review schema rehearsal evidence id"),
disabledCommand("review-rollback-path", "Review rollback path id"),
disabledCommand("confirm-timeout-budget", "Confirm timeout budget"),
disabledCommand("confirm-manual-abort-marker", "Confirm manual abort marker"),
```

每个条目都固定：

```ts
dryRunOnly: true,
disabledByDefault: true,
operatorReviewRequired: true,
carriesCredentialValue: false,
opensConnection: false,
mutatesState: false,
```

所以 v241 可以说“命令包准备好了”，但不能说“连接可以执行了”。

## 7. route table 接入

v241 遵守 v240 的路由表规则，在：

```text
D:\nodeproj\orderops-node\src\routes\auditJsonMarkdownRoutes.ts
```

新增一项：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package", (deps) => loadManagedAuditManualSandboxConnectionDryRunCommandPackage({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionDryRunCommandPackageMarkdown),
```

没有回到 `auditRoutes.ts` 里手写 JSON / Markdown 分支，这就是 v240 优化后的正确用法。

## 8. 测试覆盖

新增测试：

```text
D:\nodeproj\orderops-node\test\managedAuditManualSandboxConnectionDryRunCommandPackage.test.ts
```

覆盖三类场景：

```text
1. Node v239 / v240 / Java v97 / mini-kv v106 对齐后 package ready。
2. UPSTREAM_ACTIONS_ENABLED=true 时 package blocked。
3. JSON 和 Markdown 路由通过 route table 暴露。
```

其中最关键的断言是：

```ts
expect(profile.disabledCommands.every((command) => (
  command.disabledByDefault
  && command.dryRunOnly
  && command.operatorReviewRequired
  && !command.carriesCredentialValue
  && !command.opensConnection
  && !command.mutatesState
))).toBe(true);
```

这条断言保护本版不会悄悄变成执行入口。

## 边界

本版没有做：

```text
没有修改 Java / mini-kv
没有构建、启动、测试 Java / mini-kv
没有读取 credential value
没有打开 managed audit sandbox connection
没有执行 schema migration
没有写 managed audit state
没有启动 Java / mini-kv / external audit service
没有打开 production window
```

## 验证记录

已完成聚焦验证：

```text
npm run typecheck
vitest run test/managedAuditManualSandboxConnectionDryRunCommandPackage.test.ts test/managedAuditRouteRegistrationTableQualityPass.test.ts test/managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.test.ts
```

最终验证：

```text
npm run typecheck：通过
聚焦测试：3 个测试文件、9 个用例通过
npm test：182 个测试文件、613 个用例通过
npm run build：通过
HTTP smoke：通过，/health、新 v241 JSON/Markdown、v240 route 均可访问
git diff --check：通过，仅有 CRLF 工作区提示
截图：已保存到 c/241/图片/managed-audit-manual-sandbox-connection-dry-run-command-package-v241.png
```

## 成熟度变化

v241 的价值不在于新增一堆按钮，而在于把“优化完成后重新对齐”变成了一个可审计对象。它确认三项目已经从上一轮质量整理回到主线，但仍保持真实连接前的强边界。

## 一句话总结

v241 让 Node 重新接回三项目 managed audit sandbox 主线，生成默认 disabled 的 dry-run command package；它是下一步人工 review 的材料，不是连接许可。
