# Node v262 运行调试说明：sandbox endpoint credential resolver disabled precheck

本版依据 `docs/plans/v260-post-credential-resolver-decision-roadmap.md` 推进。Node v261 已完成三方 credential resolver upstream echo verification 后，v262 只定义 disabled credential resolver precheck。

## 本版目标

v262 消费：

```text
Node v261 credential resolver upstream echo verification
```

它定义未来 resolver client 之前的禁用态合约：

```text
required env handles
opt-in gates
failure taxonomy
dry-run response shape
inherited no-go conditions
```

它仍然不实现 resolver，不实例化 resolver client，不实例化 secret provider，不读取 credential value，不解析 raw endpoint URL，不发真实 external request，不执行 schema migration。

## 新增入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck?format=markdown
```

新增模块：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckRenderer.ts
```

## 关键结果

```text
precheckState=sandbox-endpoint-credential-resolver-disabled-precheck-ready
sourceNodeV261Ready=true
requiredEnvHandleCount=6
optInGateCount=2
failureClassCount=7
dryRunResponseFieldCount=12
inheritedNoGoConditionCount=9
```

安全边界继续关闭：

```text
credentialResolverExecutionAllowed=false
resolverClientInstantiated=false
secretProviderInstantiated=false
credentialValueRead=false
credentialValueLoaded=false
rawEndpointUrlParsed=false
externalRequestSent=false
connectsManagedAudit=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
```

## Disabled precheck 内容

env handles 只记录名称，不要求读取值：

```text
ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED
ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED
ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE
ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE
ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER
```

failure taxonomy 明确遇到危险诉求时暂停：

```text
RESOLVER_DISABLED
APPROVAL_MARKER_MISSING
CREDENTIAL_HANDLE_MISSING
CREDENTIAL_VALUE_REQUESTED
RAW_ENDPOINT_URL_REQUESTED
EXTERNAL_REQUEST_REQUESTED
SCHEMA_MIGRATION_REQUESTED
```

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npm test -- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.test.ts -> 1 file, 3 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> passed, 202 files / 680 tests
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/262/图片/sandbox-endpoint-credential-resolver-disabled-precheck-v262.png
```

## 下一步

下一步按当前计划不是 Node 抢跑，而是推荐并行：

```text
Java v106 + mini-kv v115
```

两边都只做只读 echo / non-participation。完成前 Node 不推进 v263。

## 一句话总结

Node v262 把 v261 的三方只读验证推进成 disabled credential resolver precheck 合约；它让后续 Java v106 / mini-kv v115 有明确回显对象，但仍不允许读取凭据、解析真实端点或打开 managed audit connection。
