# Node v294 运行说明：credential resolver disabled runtime shell pre-plan intake

## 本版目标

按 `docs/plans2/v292-post-fake-harness-readiness-decision-roadmap.md` 推进 Node v294：消费 Node v293 的三方 blocked decision upstream echo verification，产出 disabled runtime shell 的前置计划清单。

本版结论是：**pre-plan intake ready，但 runtime shell 仍未实现、未启用、不可调用**。v294 只定义边界、命名、开关策略、测试策略和暂停条件，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发送 HTTP/TCP，不写 ledger/schema，不自动启动上游。

## 改动结果

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.test.ts
d/294/evidence/credential-resolver-disabled-runtime-shell-pre-plan-intake-v294.json
d/294/evidence/credential-resolver-disabled-runtime-shell-pre-plan-intake-v294.md
```

调整：

```text
src/routes/auditJsonMarkdownRoutes.ts
docs/plans2/v292-post-fake-harness-readiness-decision-roadmap.md
docs/plans2/README.md
```

## 决策语义

v294 区分两层状态：

```text
prePlanIntakeState = disabled-runtime-shell-pre-plan-intake-ready
readyForDisabledRuntimeShellImplementation = false
```

也就是说，Node 可以归档这份前置计划，但不能把它当作 runtime 实现授权。

## 验证重点

- `sourceNodeV293.readyForBlockedDecisionUpstreamEchoVerification=true`。
- `disabledRuntimeShellPrePlan.boundaryCount=10`。
- `runtimeShellImplemented=false`。
- `runtimeShellEnabled=false`。
- `runtimeShellInvocationAllowed=false`。
- `credentialValueRead=false`。
- `rawEndpointUrlParsed=false`。
- `externalRequestSent=false`。
- `connectsManagedAudit=false`。
- `productionBlockerCount=0`。

## 验证命令

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.test.ts
npm test
npm run build
```

全量结果：227 个测试文件、777 个用例通过。`npm run build` 通过。

当前 evidence 摘要：

```text
checkCount=28
passedCheckCount=28
sourceEvidenceFileCount=5
boundaryCount=10
definedBoundaryCount=10
prohibitedActionCount=24
productionBlockerCount=0
planDigest=29e1a772ec0f1aca8dd56b12f63dd390f499cb8da9c3ecaa658b4c84c0f97008
intakeDigest=c6aae7474f3cfbd05103dc4a57fbf06335724d44a6b7300bb9cdd2cc0c714eb8
```

## 清理

本版未启动 Java、mini-kv 或 Node 长驻服务；未创建临时 helper 文件。
