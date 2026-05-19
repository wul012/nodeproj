# Node v264 运行调试说明：sandbox endpoint credential resolver test-only shell contract

本版依据 `docs/plans/v263-post-disabled-resolver-echo-roadmap.md` 推进。v263 已经完成 disabled resolver precheck 的三方 echo verification，v264 在此基础上只定义 test-only fake resolver shell contract。

## 本版目标

v264 消费：

```text
Node v263 disabled resolver precheck upstream echo verification
```

它只定义 test-only shell：

```text
fake in-memory resolver
handle-only request shape
fake-only response shape
failure mapping
guard conditions
fake resolver probe
```

它仍然不实例化真实 resolver client，不实例化 secret provider，不读取 credential value，不解析 raw endpoint URL，不发真实 external request，不连接 managed audit，不执行 schema migration。

## 新增入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract?format=markdown
```

新增模块：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractRenderer.ts
```

本版从一开始拆出 service / types / renderer，避免继续扩大单文件 service 体积。

## 关键结果

```text
shellContractState=sandbox-endpoint-credential-resolver-test-only-shell-contract-ready
sourceNodeV263Ready=true
fakeResolverOnly=true
requestShapeHandleOnly=true
responseShapeNoSideEffects=true
failureMappingCoversSourceTaxonomy=true
guardConditionsDeclared=true
fakeResolverProbeNoCredentialRead=true
fakeResolverProbeNoExternalRequest=true
fakeResolverProbeNoProductionWrite=true
```

安全边界继续关闭：

```text
credentialResolverExecutionAllowed=false
resolverClientInstantiated=false
secretProviderInstantiated=false
credentialValueRead=false
credentialValueLoaded=false
credentialValueStored=false
credentialValueIncluded=false
rawEndpointUrlParsed=false
rawEndpointUrlIncluded=false
externalRequestSent=false
connectsManagedAudit=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
```

## Request / Response

request 只允许句柄和审查 marker：

```text
requestId
operation
credentialHandle
endpointHandle
resolverPolicyHandle
approvalMarker
approvalCorrelationId
dryRun
fakeResolverOnly
```

response 明确是 fake-only：

```text
fakeResolverResponseOnly=true
resolverClientInstantiated=false
secretProviderInstantiated=false
credentialValueRead=false
credentialValueLoaded=false
rawEndpointUrlParsed=false
externalRequestSent=false
connectsManagedAudit=false
schemaMigrationExecuted=false
productionRecordWritten=false
```

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.test.ts --reporter=dot -> 1 file, 3 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.test.ts test/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.test.ts --reporter=dot -> 3 files, 10 tests passed
npm test -> 204 files, 687 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/264/图片/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.png
```

safe HTTP smoke 使用：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
AUDIT_STORE_KIND=memory
PORT=4364
```

smoke 结果：

```text
jsonState=sandbox-endpoint-credential-resolver-test-only-shell-contract-ready
checkCount=20
passedCheckCount=20
requestShapeFieldCount=9
responseShapeFieldCount=13
failureMappingCount=7
guardConditionCount=10
markdownStatus=200
```

全量测试期间还顺手修复了两个旧 audit route table 测试的默认 5 秒超时预算，使其和同类重路由测试统一为 15 秒；断言逻辑未变。

## 下一步

下一步按计划不是 Node 抢跑，而是推荐并行：

```text
Java v107 + mini-kv v116
```

Java v107 只读回显 v264 fake-only request / response / failure mapping 和 no-side-effect boundary；mini-kv v116 继续证明 non-participation。两边完成前 Node 不推进 v265。

## 一句话总结

Node v264 把 credential resolver 从“禁用态 precheck 已对齐”推进到“test-only fake shell contract 已定义”；它让下一步 Java v107 / mini-kv v116 有明确回显对象，但仍不允许真实凭证解析、raw endpoint 解析或外部连接。
