# 370 - Node v365 minimal read-only integration regular gate archive verification 代码讲解

## 版本定位

v365 接在 v364 后面。v364 负责把 v349/v350 的真实最小只读联调固化成 regular gate；v365 负责验证这份 gate 的归档，并把后续 CI/operator 验证方式写清楚。

这一版不是新的业务能力，也不是新的 closure 链条。它的主要价值是让 v364 这条 regular gate 变成可审计、可复查、可被后续操作员按步骤执行的门禁资料。

## 类型层

类型定义在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationTypes.ts
```

Profile 仍然显式保留安全边界：

```ts
archiveVerificationOnly: true;
ciOperatorFriendlyCheckIncluded: true;
rerunsLiveProbe: false;
startsJavaService: false;
startsMiniKvService: false;
connectsManagedAudit: false;
sendsManagedAuditHttpTcp: false;
credentialValueRequested: false;
credentialValueRead: false;
rawEndpointUrlRequested: false;
rawEndpointUrlParsed: false;
secretProviderInstantiated: false;
resolverClientInstantiated: false;
runtimeShellImplemented: false;
runtimeShellInvocationAllowed: false;
executionAllowed: false;
```

这些字段是 v365 最重要的约束：它只验证归档和操作步骤，不打开真实执行面。

## 服务入口

服务入口在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification.ts
```

主函数先读取 v364 的归档引用：

```ts
const archiveReferences = createArchiveReferences(projectRoot);
const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
const sourceNodeV364 = createSourceNodeV364(parsedArchive);
```

然后生成 CI/operator friendly check：

```ts
const ciOperatorFriendlyCheck = createCiOperatorFriendlyCheck(sourceNodeV364);
```

最后用 checks 决定是否 ready：

```ts
checks.readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification = Object.entries(checks)
  .filter(([key]) => key !== "readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification")
  .every(([, value]) => value);
```

这说明 v365 的 ready 不是手写常量，而是由归档文件、v364 JSON/Markdown、summary、截图、计划索引、代码讲解和 CI/operator check 一起决定。

## Archive References

`createArchiveReferences()` 固定检查 `d/364` 的 11 类归档：

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

这延续了前面版本的归档模式，但这次 source 是 `Node v364 minimal read-only integration regular gate`。

## Source Node v364

`createSourceNodeV364()` 从 v364 JSON 中提取关键字段：

```ts
gateState
gateDecision
readyForMinimalReadOnlyIntegrationRegularGate
readyForNodeV365RegularGateArchiveVerification
gateDigest
sourceTransitionDigest
sourceArchiveDigest
checkCount
passedCheckCount
readOnlyTargetCount
requiredEnvCount
requiredHeaderCount
failureClassificationCount
```

这些字段证明 v365 消费的是 v364 的稳定门禁结果，而不是重新拼一份相似报告。

## CI / Operator Friendly Check

`createCiOperatorFriendlyCheck()` 是本版相对普通 archive verification 的新增点：

```ts
focusedTestCommand
groupedTestCommand
buildCommand
smokeRoute
smokeMarkdownRoute
splitsVerificationIntoFocusedSteps: true
avoidsFullTestBatchByDefault: true
requiresExplicitReadWindowForActualProbe: true
automaticUpstreamStart: false
rerunsJavaMiniKvNow: false
```

它把后续操作员和 CI 应该怎么跑写成结构化 profile，而不是散在说明文档里。

## Checks

`createChecks()` 一共生成 40 个检查，核心分组是：

```text
archive files：v364 JSON / Markdown / summary / snapshot / HTML / screenshot / explanation / walkthrough / plan / index
source JSON：v364 gate ready、v350 source ready、regular gate digest、targets/env/headers/failure classes 完整
docs：Markdown、解释、代码讲解、plan、d/README 都能对应 v364
CI/operator：focused command、grouped command、build command、显式 read window、避免大批量测试
boundary：不启动上游、不写上游、不连接 managed audit、不读 credential、不解析 raw endpoint、不实例化 provider/client、不实现 runtime shell
```

HTTP smoke 返回：

```text
checkCount=40
passedCheckCount=40
productionBlockerCount=0
readyForNodeV366ExplicitReadWindowGateExecutionDecision=true
```

## 路由入口

路由注册在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate-archive-verification",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationMarkdown,
)
```

它继续走统一 JSON / Markdown helper，只暴露报告，不暴露执行入口。

## 测试

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification.test.ts
```

覆盖三类行为：

```text
1. 正常路径：v364 归档完整时，v365 40/40 checks passed。
2. fail closed：v364 归档缺失时，v365 blocked。
3. route：JSON 和 Markdown 都能通过统一 audit route 输出。
```

fail closed 测试说明：如果未来有人误删 v364 归档或破坏 v364 gate，v365 不会继续给出 v366 readiness。

## 本版价值

v365 的价值是把“常规门禁”从报告推进到可执行流程：它告诉后续 CI/operator 应先跑 focused test，再跑小组测试，再 build，再在显式读窗口里跑 smoke。

这样既避免默认大批量测试，又避免再次在 archive / closure 里绕圈。
