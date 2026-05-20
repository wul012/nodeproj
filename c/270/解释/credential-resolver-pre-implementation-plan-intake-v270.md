# Node v270 运行调试说明：credential resolver pre-implementation plan intake

## 本版目标

v270 消费 Node v269 的 blocked-decision upstream echo verification，把 v268 中阻断真实 resolver 的 10 个缺失项整理为可审查的 pre-implementation plan intake。

本版只做计划入口，不实现真实 credential resolver：

- 不实例化真实 resolver client。
- 不实例化真实 secret provider runtime。
- 不读取 credential value。
- 不解析或输出 raw endpoint URL。
- 不发送 managed audit HTTP/TCP 请求。
- 不执行 schema migration。
- 不写 approval ledger。
- 不自动启动 Java 或 mini-kv。

## 运行调试入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake?format=markdown
```

## 本轮安全环境变量

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
AUDIT_STORE_KIND=memory
```

## 关键结果

```text
planIntakeState=credential-resolver-pre-implementation-plan-intake-ready
readyForCredentialResolverPreImplementationPlan=true
boundaryCount=10
definedBoundaryCount=10
missingBoundaryCount=0
realResolverImplementationAllowed=false
connectsManagedAudit=false
credentialValueRead=false
rawEndpointUrlParsed=false
externalRequestSent=false
schemaMigrationExecuted=false
approvalLedgerWritten=false
```

## 调试结论

v270 已经把真实 resolver 前必须补齐的 10 个边界写清楚，但这只代表“可以进入实现前评审链路”，不是“可以实现或打开真实连接”。

下一步按当前计划是 Node v271：`statusRoutes.ts` split pre-quality branch。Java v112 + mini-kv v119 在 v270 完成后可推荐并行回显本计划 intake，供后续 Node v272 做三方验证。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake.test.ts -> 1 file, 4 tests passed
npm test -> 210 files, 710 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, planIntakeState=credential-resolver-pre-implementation-plan-intake-ready, boundaryCount=10, productionBlockerCount=0
Chrome screenshot -> c/270/图片/credential-resolver-pre-implementation-plan-intake-v270.png
```
