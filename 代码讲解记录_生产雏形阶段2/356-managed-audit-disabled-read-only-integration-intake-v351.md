# 356. Node v351：managed-audit-disabled read-only integration intake

## 版本进度

v351 的任务是接住 v350 的阶段切换决策，把“真实只读联调已经通过”之后的下一阶段定义清楚：managed audit 仍然 disabled，只允许整理 read-only integration 的输入和关闭边界。

本轮最终状态：

```text
intakeState: managed-audit-disabled-read-only-integration-intake-ready
intakeDecision: define-managed-audit-disabled-read-only-integration-stage
readyForManagedAuditDisabledReadOnlyIntegrationIntake: true
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.ts:34) 是主服务入口。它调用 v350 loader：

```text
loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification(...)
```

因此 v351 不重复读取 v349 archive，也不重新 live probe。它只消费 v350 已经给出的 transition decision。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.ts:125) 的 `createSourceNodeV350(...)` 把 v350 profile 缩成 `sourceNodeV350`。关键字段是：

```text
transitionState=minimal-read-only-integration-passed-archive-verified
transitionDecision=advance-to-managed-audit-disabled-read-only-integration-intake
attemptedTargetCount=5
passedTargetCount=5
productionBlockerCount=0
```

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.ts:153) 的 `createNecessityProof(...)` 是治理增长控制点：它说明 v351 解决的是“v350 passed archive 之后缺下一阶段 intake 边界”的 blocker，并声明如果后续请求 credential value、raw endpoint、provider/client、runtime shell 或写/admin scope，就必须停下。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.ts:164) 的 `createIntakeInputs(...)` 固定三类输入：v350 transition、未来 Java/mini-kv 启动仍归各自窗口、managed audit 仍 disabled。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.ts:193) 的 `createClosedScopes(...)` 固定 7 个关闭边界：credential value、raw endpoint URL、secret provider、runtime shell、Java writes、mini-kv write/admin、managed audit HTTP/TCP。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.ts:235) 的 `createChecks(...)` 是本版质量门。它同时确认：

```text
sourceNodeV350Ready=true
sourceTransitionAllowsIntake=true
sourceV349AllReadTargetsPassed=true
noUpstreamServiceStarted=true
noManagedAuditHttpTcp=true
productionAuditStillBlocked=true
productionWindowStillBlocked=true
```

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeTypes.ts:112) 固定 profile 合同。`startsJavaService`、`startsMiniKvService`、`connectsManagedAudit`、`sendsManagedAuditHttpTcp`、`readsManagedAuditCredential`、`rawEndpointUrlParsed`、`executionAllowed` 都是 `false` 类型。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeRenderer.ts:8) 输出 Markdown，展示 source Node v350、necessity proof、intake inputs、closed scopes、checks、summary 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1154) 注册 v351 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake
```

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.test.ts:17) 覆盖三条路径：正常消费 v350、缺 v350 源证据 fail-closed、JSON/Markdown route 输出。

## 核心流程

1. 读取 v350 passed archive verification profile。
2. 提炼 v350 transition decision 和 5/5 read-passed 结果。
3. 写入 v351 necessity proof，说明为什么需要 intake，不继续无边界增长。
4. 固定三类 intake inputs。
5. 固定七类 closed scopes。
6. 生成 intake digest，并确认 production audit/window 仍 blocked。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v351 1 file / 3 tests 通过
- 小组 vitest：v350 + v351 2 files / 6 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：200 JSON / 200 Markdown，20/20 checks 通过
- Playwright MCP 截图：已保存到 `d/351/图片/managed-audit-disabled-read-only-integration-intake-v351.png`

## 项目成熟度

v351 不是新执行能力，而是生产前置边界的 intake 合同。它让项目从“真实只读已经跑通”进入“managed audit 仍禁用但下一阶段输入明确”的状态。这个版本的价值是防止直接从一次通过跳到 provider/client 或 runtime shell，把 credential、endpoint、执行边界继续锁在类型和测试里。
