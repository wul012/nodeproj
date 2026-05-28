# 373 - Node v368 minimal read-only gate execution archive verification 代码讲解

## 版本定位

v368 是 v367 的归档验证版。v367 已经真实读取 Java / mini-kv 的 5 个只读目标，v368 不再次访问上游，而是把这次真实联调证据固化成后续 operator / CI 可以消费的门禁证据。

这版的边界是：

```text
只读 d/367 归档
不启动 Java / mini-kv
不重跑 probe
不打开 managed audit
不读取 credential value
```

## 类型拆分

类型放在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationTypes.ts
```

核心文件引用类型是：

```ts
export interface MinimalReadOnlyIntegrationGateExecutionArchiveReferences {
  archiveRoot: "d/367";
  jsonEvidence: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  markdownEvidence: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  summaryEvidence: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  browserSnapshot: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  htmlArchive: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  screenshot: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  explanation: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  codeWalkthrough: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  sourcePlan: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  plansIndex: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  archiveIndex: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
}
```

这里固定 `archiveRoot: "d/367"`，是为了让 v368 明确消费上一版证据，而不是动态查找最新目录。后续如果 v369 要做 handoff，也应该消费 v368 的固定归档，不要重跑 v367 的探测。

## 服务入口

服务入口在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.ts
```

入口先创建归档引用，然后读取 JSON / Markdown / summary / screenshot / walkthrough / plan index：

```ts
const projectRoot = input.archiveRoot ?? process.cwd();
const archiveReferences = createArchiveReferences(projectRoot);
const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
const targetResults = createTargetResults(parsedArchive);
const sourceNodeV367 = createSourceNodeV367(parsedArchive);
```

这里没有传入 `orderPlatform` 或 `miniKv` client，也没有调用 v367 的 `load...GateExecution(...)`。这是 v368 最重要的边界：验证归档，不执行上游读取。

## 文件证据读取

`createArchiveReferences(...)` 把每个证据文件转成统一结构：

```ts
function fileReference(projectRoot: string, ...segments: string[]): MinimalReadOnlyIntegrationGateExecutionArchiveFileReference {
  const relativePath = path.join(...segments).replace(/\\/g, "/");
  const absolutePath = path.join(projectRoot, ...segments);
  if (!existsSync(absolutePath)) {
    return { path: relativePath, exists: false, byteLength: 0, digest: null };
  }
  const content = readFileSync(absolutePath);
  return {
    path: relativePath,
    exists: true,
    byteLength: statSync(absolutePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}
```

这样每个 archive file 都有 `exists`、`byteLength` 和 `digest`，后续报告可以直接说明缺了哪个文件，而不是只给一个笼统失败。

## v367 摘要

`createSourceNodeV367(...)` 从 v367 JSON 里抽取关键事实：

```ts
gateExecutionState: gateExecutionState(archive),
gateExecutionResult: gateExecutionResult(archive),
gateExecutionDecision: gateExecutionDecision(archive),
readyForMinimalReadOnlyIntegrationGateExecution:
  valueAt(archive.json, "readyForMinimalReadOnlyIntegrationGateExecution") === true,
reusesNodeV349MinimalReadOnlySmokeLane:
  valueAt(archive.json, "reusesNodeV349MinimalReadOnlySmokeLane") === true,
attemptedTargetCount: numberValue(valueAt(archive.json, "summary", "attemptedTargetCount")),
passedTargetCount: numberValue(valueAt(archive.json, "summary", "passedTargetCount")),
checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
```

这几个字段共同证明 v367 不是空文档：它确实在读窗口下跑出了 `5/5 read-passed` 和 `20/20 checks passed`。

## 只读目标校验

`createTargetResults(...)` 把 v367 的 `targetResults` 映射成稳定结构，然后 `createChecks(...)` 校验目标集合：

```ts
jsonJavaTargetsGetOnly:
  expectedEvery(EXPECTED_JAVA_GETS, targetResults.map((target) => target.methodOrCommand))
  && targetResults.filter((target) => target.project === "java")
    .every((target) => target.methodOrCommand.startsWith("GET ")),
jsonMiniKvTargetsReadOnlyCommandsOnly:
  expectedEvery(EXPECTED_MINI_KV_READ_COMMANDS, targetResults.map((target) => target.methodOrCommand))
  && targetResults.filter((target) => target.project === "mini-kv")
    .every((target) => EXPECTED_MINI_KV_READ_COMMANDS.includes(target.methodOrCommand as typeof EXPECTED_MINI_KV_READ_COMMANDS[number])),
```

这里没有只看 `passedTargetCount=5`，还额外验证 Java 必须是 GET，mini-kv 必须是 `HEALTH / INFOJSON / STATSJSON`。这样 v367 归档不能被一个“通过但越权”的目标列表误判为可用。

## Operator / CI handoff

v368 新增了一个 operator / CI handoff check：

```ts
const record = {
  checkMode: "operator-ci-regular-minimal-read-only-gate-execution" as const,
  focusedTestCommand:
    "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.test.ts",
  groupedTestCommand:
    "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution.test.ts test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.test.ts",
  buildCommand: "npm.cmd run build",
  smokeCommand: "Node HTTP smoke with UPSTREAM_PROBES_ENABLED=false for archive verification route",
  avoidsFullTestBatchByDefault: true as const,
  requiresExternalReadWindowForActualProbe: true as const,
  automaticUpstreamStart: false as const,
};
```

这也是响应当前全局规则：不要一次性跑大批量测试。后续 CI/operator 可以先跑 focused，再跑小组合，再 build/smoke，而不是默认全仓压测。

## 路由接入

路由注册在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增入口：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationMarkdown),
```

注意这里没有传 `orderPlatform` / `miniKv`，说明 HTTP route 本身也不会触发上游探测。

## 渲染器

Markdown 渲染器在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationRenderer.ts
```

它输出：

```text
Source Node v367
Target Results
Archive Verification
Operator / CI Handoff Check
Archive References
Checks
Summary
Production Blockers
Warnings
Recommendations
Next Actions
```

这保持了此前版本的讲解模式：既能看业务结论，也能看到实际代码和归档证据。

## 测试覆盖

测试文件是：

```text
test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.test.ts
```

覆盖三类场景：

```text
1. 正常读取 d/367 归档，验证 11/11 文件、5/5 targets、20/20 checks。
2. archiveRoot 指向空目录时 fail closed。
3. audit route 同时输出 JSON 和 Markdown。
```

其中 fail closed 测试很关键，因为 archive verification 不能在证据缺失时“猜测通过”。

## 和后续节奏的关系

v368 之后，Node 不应继续无限扩展前置归档链。更合理的方向是：

```text
Node v369：把 v367/v368 固化为 operator / CI regular gate，并冻结 read-only-integration.v1 / shard-readiness.v1 最小契约。
mini-kv：并行做 shard map / slot table / key routing 只读证据。
Java：并行做 shard readiness echo。
Node：后续只作为契约消费者和联调门禁，不再挡住 mini-kv / Java 先推进。
```

这能让 Node 管风险，但不再管所有进度。

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.test.ts：3 passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution.test.ts test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.test.ts：6 passed
npm run build：通过
HTTP smoke：通过
Playwright MCP screenshot/snapshot：通过
```
