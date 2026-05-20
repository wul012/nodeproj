# 274. Node v270 credential resolver pre-implementation plan intake

## 版本定位

本版由 Node v269 的 blocked-decision upstream echo verification 衍生，目标是把 Node v268 中阻断真实 credential resolver 的 10 个缺失项转成可审查的实现前计划边界。

这不是 resolver 实现版，也不是连接版。v270 只回答一个问题：

```text
真实 resolver 进入实现前，哪些边界必须先被定义、回显和验证？
```

## 入口代码

核心入口在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake.ts
```

主函数：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeProfile {
  const sourceNodeV269 = createSourceNodeV269(input.config);
  const boundaries = createPreImplementationBoundaries();
  const plan = createPreImplementationPlan(boundaries);
  const planIntake = createPlanIntake(plan);
  const checks = createChecks(input.config, sourceNodeV269, planIntake, plan);
```

这里的结构有四层：

1. `sourceNodeV269`：复用上一版三方 blocked decision 验证。
2. `boundaries`：列出 10 个实现前边界。
3. `plan`：生成 plan digest 和总体策略。
4. `planIntake`：把边界转成下一轮 Java v112 / mini-kv v119 可回显字段。

## 复用 v269 作为来源

v270 不重新判断 Java v111 / mini-kv v118，而是通过 v269 已收口的结果作为来源：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification({
  config,
});
```

随后只提取关键字段：

```ts
verificationState: source.verificationState,
readyForBlockedDecisionUpstreamEchoVerification:
  source.readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification,
verificationDigest: source.echoVerification.verificationDigest,
sourceSpan: source.echoVerification.sourceSpan,
sourceNodeV268Ready: source.echoVerification.sourceNodeV268Ready,
javaV111EchoReady: source.echoVerification.javaV111EchoReady,
miniKvV118NonParticipationReady: source.echoVerification.miniKvV118NonParticipationReady,
```

这样 v270 不会绕过 v269 的证据链，也不会重新触发 Java / mini-kv 行为。

## 10 个边界

`createPreImplementationBoundaries()` 是本版核心。每个边界都带：

```ts
code
requirementFromV268
title
status
owner
implementationRule
prohibitedActions
verificationEvidence
```

例如 credential handle 边界：

```ts
{
  code: "CREDENTIAL_HANDLE",
  requirementFromV268: "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
  title: "Credential handle boundary",
  status: "defined-for-review",
  owner: "security",
  implementationRule: "Only credential handles and review status may be stored or rendered; credential values remain unavailable to Node, Java, and mini-kv.",
  prohibitedActions: ["read-credential-value", "store-credential-value", "render-credential-value"],
  verificationEvidence: "credentialValueRead=false and readsManagedAuditCredential=false",
}
```

这段实际代码把“缺少 credential boundary”从一个 blocker 转成了可审查规则：只能处理 handle，不能读、存、显示真实 credential value。

## 仍然不能实现 resolver

`createPreImplementationPlan()` 明确把运行时能力继续关掉：

```ts
realResolverImplementationAllowed: false,
secretProviderRuntimeAllowed: false,
credentialValueReadAllowed: false,
rawEndpointUrlParseAllowed: false,
externalRequestAllowed: false,
schemaMigrationAllowed: false,
approvalLedgerWriteAllowed: false,
automaticUpstreamStartAllowed: false,
```

这就是 v270 的关键边界：`readyForCredentialResolverPreImplementationPlan=true` 只表示“计划边界写清楚”，不表示真实 resolver 可以实现。

## 检查逻辑

`createChecks()` 同时检查来源和本版边界：

```ts
sourceNodeV269Ready:
  sourceNodeV269.verificationState === "credential-resolver-production-readiness-blocked-decision-upstream-echo-verification-ready"
  && sourceNodeV269.readyForBlockedDecisionUpstreamEchoVerification
  && sourceNodeV269.sourceNodeV268Ready
  && sourceNodeV269.javaV111EchoReady
  && sourceNodeV269.miniKvV118NonParticipationReady,
```

这保证 v270 必须站在 v269 成功验证后面。

另一个关键检查：

```ts
allTenBoundariesDefined:
  plan.boundaryCount === 10
  && plan.definedBoundaryCount === 10
  && plan.allRequiredBoundariesDefined
  && planIntake.missingBoundaryCount === 0,
```

如果 10 个边界少一个，v270 就不能 ready。

## 路由接入

路由注册在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增入口：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeMarkdown),
```

仍然复用 `auditJsonMarkdownRoute`，没有新增手写 JSON / Markdown 分支。

## 测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake.test.ts
```

覆盖四类场景：

1. v268 的 10 个 missing requirement 被转成 10 个 defined boundary。
2. GitHub runner 风格下使用 committed historical fixture fallback。
3. `UPSTREAM_PROBES_ENABLED=true` 或 `UPSTREAM_ACTIONS_ENABLED=true` 时阻断。
4. JSON / Markdown 路由正常输出。

关键断言：

```ts
expect(profile.preImplementationPlan.boundaries.map((boundary) => boundary.requirementFromV268)).toEqual([
  "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
  "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
  "ENDPOINT_HANDLE_BOUNDARY_MISSING",
  "SECRET_PROVIDER_STUB_MISSING",
  "OPERATOR_APPROVAL_BOUNDARY_MISSING",
  "ROLLBACK_BOUNDARY_MISSING",
  "REDACTION_POLICY_MISSING",
  "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
  "SCHEMA_MIGRATION_POLICY_MISSING",
  "AUDIT_LEDGER_WRITE_POLICY_MISSING",
]);
```

这保证 v270 没有遗漏 v268 中列出的硬 blocker。

## 本版结论

v270 让项目从“知道不能做真实 resolver”前进到“知道真实 resolver 前必须先定义什么”。这是一小步，但对靠近生产级很关键：它把下一阶段实现前的安全边界写成了可测试、可回显、可归档的结构化 profile。

下一步按计划是 Node v271：`statusRoutes.ts` split pre-quality branch。Java v112 + mini-kv v119 可在 v270 归档后推荐并行回显本版 plan intake。

## 验证结果

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake.test.ts -> 1 file, 4 tests passed
npm test -> 210 files, 710 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, planIntakeState=credential-resolver-pre-implementation-plan-intake-ready, boundaryCount=10, definedBoundaryCount=10, productionBlockerCount=0
Chrome screenshot -> c/270/图片/credential-resolver-pre-implementation-plan-intake-v270.png
```

补充说明：本轮新增 `vitest.config.ts`，把 Vitest 默认测试超时显式设为 30 秒。原因是 v266-v270 的 credential resolver 历史 evidence 链在全量并发下已经会超过默认 5 秒，之前失败属于 timeout 误报，不是业务断言失败。
