# Node v268 运行调试说明：credential resolver production readiness decision gate

本版依据 `docs/plans/v266-post-fake-shell-archive-roadmap.md` 推进。Node v267 已确认 Node v266、Java v110、mini-kv v117 的 fake-shell archive echo 证据链一致；v268 不继续堆 echo，而是做生产就绪决策门禁。

## 本版目标

v268 消费：

```text
Node v267 credential resolver fake-shell archive upstream echo verification
```

它输出一个明确结论：

```text
readinessDecision=blocked
readyForCredentialResolverPreImplementationPlan=false
realResolverImplementationAllowed=false
```

原因是当前还没有新的 pre-implementation plan 明确定义 credential handle、endpoint handle、secret provider stub、operator approval、rollback、redaction、external request simulation、schema migration policy 和 audit ledger write policy。

## 新增入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate?format=markdown
```

新增模块：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateRenderer.ts
```

## 关键结果

```text
decisionGateState=blocked
readinessDecision=blocked
decisionGateEvaluated=true
sourceNodeV267Ready=true
sourceNodeV267BlocksRealResolver=true
archiveEchoChainReady=true
missingPreImplementationRequirementCount=10
productionBlockerCount=10
```

安全边界继续关闭：

```text
executionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
storesManagedAuditCredential=false
credentialValueRead=false
rawEndpointUrlParsed=false
externalRequestSent=false
secretProviderInstantiated=false
resolverClientInstantiated=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

## Blockers

v268 的 blocker 是设计上故意保留的硬门槛：

```text
REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING
CREDENTIAL_HANDLE_BOUNDARY_MISSING
ENDPOINT_HANDLE_BOUNDARY_MISSING
SECRET_PROVIDER_STUB_MISSING
OPERATOR_APPROVAL_BOUNDARY_MISSING
ROLLBACK_BOUNDARY_MISSING
REDACTION_POLICY_MISSING
EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING
SCHEMA_MIGRATION_POLICY_MISSING
AUDIT_LEDGER_WRITE_POLICY_MISSING
```

这表示三方 archive echo 已经 ready，但生产 resolver 还不能进入实现。

## 验证

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate.test.ts -> 1 file, 4 tests passed
npm test -> 208 files, 702 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/268/图片/credential-resolver-production-readiness-decision-gate-v268.png
```

safe HTTP smoke 使用：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
AUDIT_STORE_KIND=memory
PORT=4368
```

smoke 结果：

```text
jsonStatus=200
markdownStatus=200
decision=blocked
sourceNodeV267Ready=true
missingPreImplementationRequirementCount=10
productionBlockerCount=10
```

## 下一步

本计划到 v268 收口。下一份计划已经另起：

```text
docs/plans/v268-post-production-readiness-decision-roadmap.md
```

下一步推荐先并行推进 Java v111 + mini-kv v118，只读 echo 这个 blocked decision gate；Node 后续再做 v269 三方 blocked-decision echo verification。

## 一句话总结

Node v268 把 v267 的三方 archive echo 证据转成生产就绪决策：证据链 ready，但真实 credential resolver pre-implementation 仍 blocked，必须先另起计划补齐 10 个硬边界。
