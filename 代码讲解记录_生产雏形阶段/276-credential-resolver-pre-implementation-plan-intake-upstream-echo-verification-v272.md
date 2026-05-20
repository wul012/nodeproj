# 276. Node v272 credential resolver pre-implementation plan intake upstream echo verification

## 版本定位

v272 是 v269 衍生计划的收口版。它消费：

```text
Node v270 credential resolver pre-implementation plan intake
Java v112 read-only echo receipt
mini-kv v119 non-participation receipt
```

本版不实现真实 resolver，不实例化 secret provider，不读取 credential value，不解析 raw endpoint URL，也不打开 managed audit connection。

它回答的问题是：

```text
Node v270 写下的 10 个实施前边界，Java 和 mini-kv 是否已经一致理解？
```

## 新增服务入口

文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification.ts
```

主入口：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationProfile {
  const sourceNodeV270 = createSourceNodeV270(input.config);
  const javaV112 = createJavaV112Reference();
  const miniKvV119 = createMiniKvV119Reference();
  const checks = createChecks(input.config, sourceNodeV270, javaV112, miniKvV119);
```

这里的结构和前面的 v269 upstream echo verification 保持一致：先读取 Node 自身 source，再读取 Java / mini-kv historical evidence，最后统一生成 checks 和 digest。

## Source Node v270

v272 不是重新定义 plan，而是读取 v270 的真实输出：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake({ config });
```

然后只抽取需要对齐的事实：

```ts
planIntakeState: source.planIntakeState,
readyForPlanIntake: source.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake,
planIntakeOnly: source.planIntakeOnly,
readOnlyPlanIntake: source.readOnlyPlanIntake,
planVersion: source.preImplementationPlan.planVersion,
planDigest: source.preImplementationPlan.planDigest,
intakeDigest: source.planIntake.intakeDigest,
boundaryCount: source.preImplementationPlan.boundaryCount,
definedBoundaryCount: source.preImplementationPlan.definedBoundaryCount,
missingBoundaryCount: source.planIntake.missingBoundaryCount,
boundaryCodes: source.preImplementationPlan.boundaries.map((boundary) => boundary.code),
requirementCodes: source.preImplementationPlan.boundaries.map((boundary) => boundary.requirementFromV268),
```

这让 v272 的判断绑定到 v270 的实际代码，而不是手写一份重复计划。

## Java v112 证据读取

Java 证据来自 committed historical fixture：

```ts
const JAVA_V112_RUNBOOK = "D:/javaproj/advanced-order-platform/c/112/解释/说明.md";
const JAVA_V112_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/115-version-112-sandbox-endpoint-credential-resolver-pre-implementation-plan-intake-echo-receipt.md";
const JAVA_V112_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceiptBuilder.java";
const JAVA_V112_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.java";
```

测试和 CI 不依赖本机 `D:\javaproj`，因为这些文件也被复制到了：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/...
```

Java v112 的 readiness 不是只看文件存在，还要求 snippet 全部命中：

```ts
reference.readyForNodeV272Alignment =
  reference.evidencePresent
  && reference.verificationDocumented
  && reference.consumedNodeVersion === "Node v270"
  && reference.nextNodeConsumerVersion === "Node v272"
  && reference.planIntakeState === "credential-resolver-pre-implementation-plan-intake-ready"
  && reference.boundaryCodesEchoed
  && reference.requirementCodesEchoed
  && reference.planIntakeEchoed
  && reference.sideEffectBoundaryEchoed;
```

这避免了“只看到 Java v112 文件，但不知道内容是否真的对齐”的假通过。

## mini-kv v119 证据读取

mini-kv 的主证据是 JSON receipt：

```ts
const MINI_KV_V119_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-pre-implementation-plan-intake-non-participation-receipt.json";
```

读取时分三层：

```ts
const root = readJsonObject(MINI_KV_V119_RECEIPT);
const receipt = objectField(root, "credential_resolver_pre_implementation_plan_intake_non_participation_receipt");
const preImplementationPlan = objectField(receipt, "pre_implementation_plan");
const planIntake = objectField(receipt, "plan_intake");
const summary = objectField(receipt, "summary");
```

然后取出 plan / intake / summary / side-effect 边界：

```ts
planVersion: stringField(preImplementationPlan, "plan_version"),
planMode: stringField(preImplementationPlan, "plan_mode"),
planDigest: stringField(preImplementationPlan, "plan_digest"),
intakeDigest: stringField(planIntake, "intake_digest"),
boundaryCount: numberField(preImplementationPlan, "boundary_count"),
definedBoundaryCount: numberField(preImplementationPlan, "defined_boundary_count"),
missingBoundaryCount: numberField(planIntake, "missing_boundary_count"),
boundaryCodes: stringArrayField(preImplementationPlan, "boundary_codes"),
requirementCodes: stringArrayField(preImplementationPlan, "requirement_codes"),
```

mini-kv 仍然被固定为 evidence provider：

```ts
credentialResolverImplemented: booleanField(receipt, "credential_resolver_implemented"),
resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated"),
secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated"),
credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed"),
rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
externalRequestSent: booleanField(receipt, "external_request_sent"),
storageWriteAllowed: booleanField(receipt, "storage_write_allowed"),
approvalLedgerWritten: booleanField(receipt, "approval_ledger_written"),
loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
```

这些字段全部为 `false`，说明 v119 没有变成 resolver、secret provider、endpoint parser、transport 或 audit store。

## 三方对齐检查

核心 checks 在 `createChecks()` 中：

```ts
planCountsAligned:
  javaV112.checkCount === sourceNodeV270.checkCount
  && miniKvV119.checkCount === sourceNodeV270.checkCount
  && javaV112.passedCheckCount === sourceNodeV270.passedCheckCount
  && miniKvV119.passedCheckCount === sourceNodeV270.passedCheckCount
  && javaV112.boundaryCount === sourceNodeV270.boundaryCount
  && miniKvV119.boundaryCount === sourceNodeV270.boundaryCount
  && javaV112.definedBoundaryCount === sourceNodeV270.definedBoundaryCount
  && miniKvV119.definedBoundaryCount === sourceNodeV270.definedBoundaryCount
  && javaV112.missingBoundaryCount === sourceNodeV270.missingBoundaryCount
  && miniKvV119.missingBoundaryCount === sourceNodeV270.missingBoundaryCount
  && javaV112.productionBlockerCount === sourceNodeV270.productionBlockerCount
  && miniKvV119.productionBlockerCount === sourceNodeV270.productionBlockerCount,
```

边界名称也逐项比对：

```ts
boundaryCodesAligned:
  javaV112.boundaryCodesEchoed
  && arrayEquals(sourceNodeV270.boundaryCodes, [...BOUNDARY_CODES])
  && arrayEquals(miniKvV119.boundaryCodes, [...BOUNDARY_CODES]),
requirementCodesAligned:
  javaV112.requirementCodesEchoed
  && arrayEquals(sourceNodeV270.requirementCodes, [...REQUIREMENT_CODES])
  && arrayEquals(miniKvV119.requirementCodes, [...REQUIREMENT_CODES]),
```

这两个检查保证 Java / mini-kv 不只是说“我看到了 plan”，而是真的承认同一组 boundary code 和 requirement code。

## 危险动作继续关闭

credential 相关：

```ts
credentialBoundaryAligned:
  !sourceNodeV270.readsManagedAuditCredential
  && !sourceNodeV270.storesManagedAuditCredential
  && !sourceNodeV270.credentialValueRead
  && !javaV112.credentialValueRead
  && miniKvV119.credentialValueReadAllowed === false
  && miniKvV119.credentialValueLoaded === false
  && miniKvV119.credentialValueStored === false
  && miniKvV119.credentialValueIncluded === false,
```

resolver / secret provider 相关：

```ts
resolverBoundaryAligned:
  !sourceNodeV270.resolverClientInstantiated
  && !sourceNodeV270.secretProviderInstantiated
  && !javaV112.resolverClientInstantiated
  && !javaV112.secretProviderInstantiated
  && miniKvV119.credentialResolverImplemented === false
  && miniKvV119.credentialResolverInvoked === false
  && miniKvV119.resolverClientInstantiated === false
  && miniKvV119.secretProviderInstantiated === false
  && miniKvV119.secretProviderRuntimeAllowed === false,
```

写操作相关：

```ts
writeBoundaryAligned:
  !sourceNodeV270.executionAllowed
  && !sourceNodeV270.schemaMigrationExecuted
  && !sourceNodeV270.approvalLedgerWritten
  && !javaV112.approvalLedgerWritten
  && !javaV112.sqlExecuted
  && !javaV112.schemaMigrationExecuted
  && miniKvV119.executionAllowed === false
  && miniKvV119.storageWriteAllowed === false
  && miniKvV119.approvalLedgerWritten === false
  && miniKvV119.schemaMigrationExecuted === false
  && miniKvV119.loadRestoreCompactExecuted === false
  && miniKvV119.setnxexExecutionAllowed === false,
```

所以 v272 的结论是“plan-intake echo 已对齐”，不是“可以开始真实执行”。

## 路由注册

文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMarkdown),
```

继续走 `auditJsonMarkdownRoute` 表驱动注册，没有新增手写 JSON / Markdown 路由样板。

## 测试覆盖

文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification.test.ts
```

测试覆盖四类场景：

```text
正常 v270 + v112 + v119 三方对齐
GitHub runner historical fixture fallback
UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 打开时阻断
JSON / Markdown route table 暴露
```

关键断言：

```ts
expect(profile.echoVerification).toMatchObject({
  sourceNodeV270Ready: true,
  javaV112EchoReady: true,
  miniKvV119NonParticipationReady: true,
  planCountsAligned: true,
  boundaryCodesAligned: true,
  requirementCodesAligned: true,
  resolverBoundaryAligned: true,
  writeBoundaryAligned: true,
});
```

同时测试还断言：

```ts
expect(profile.realResolverImplementationAllowed).toBe(false);
expect(profile.connectsManagedAudit).toBe(false);
expect(profile.externalRequestSent).toBe(false);
expect(profile.resolverClientInstantiated).toBe(false);
```

## 本版推进程度

v272 让 credential resolver 主线从：

```text
Node v270 已写 plan-intake
Java / mini-kv 需要回显
```

推进到：

```text
Node v270 + Java v112 + mini-kv v119 的 plan-intake 证据已经三方对齐
```

但真实生产能力仍未打开：

```text
credential value 未读取
raw endpoint 未解析
secret provider 未实例化
resolver client 未实例化
managed audit connection 未打开
SQL / ledger / storage write 未执行
auto-start 未允许
```

下一阶段应该另起计划，先讨论 disabled resolver implementation candidate 或 secret-provider stub 的更窄边界，而不是直接跳到真实 resolver。

## 验证结果

```text
npm run typecheck -> passed
npx vitest run v269/v270/v272 focused tests -> 3 files, 12 tests passed
npx vitest run旧 live-probe route timeout 聚焦回归 -> 3 files, 9 tests passed
npm test -> 212 files, 716 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, verificationState=credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-ready, javaReady=true, miniKvReady=true, blockerCount=0
Chrome screenshot -> c/272/图片/credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-v272.png
```
