# Node v253 运行调试说明：test-only adapter shell contract

本版依据 `docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md` 推进。v252 已完成 disabled adapter client precheck，v253 只做 test-only adapter shell contract：定义 fake transport / request shape / response shape / failure mapping / guard conditions。

## 本版目标

v253 不是 managed audit 真实 client。它只把将来测试 shell 的契约固定下来：

```text
fakeTransportOnly=true
realClientImplemented=false
realTransportAllowed=false
externalRequestMayBeSent=false
credentialValueMayBeLoaded=false
```

## 新增入口

新增服务：

```text
src/services/managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.ts
```

新增路由：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract
GET /api/v1/audit/managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract?format=markdown
```

## 消费来源

v253 只消费：

```text
Node v252 disabled adapter client precheck
```

它不重新读取 Java / mini-kv 文件，也不启动或修改 Java / mini-kv。

## fake transport contract

本版定义：

```text
shellName=ManagedAuditManualSandboxTestOnlyAdapterShell
shellMode=test-only-fake-transport-contract
transportKind=fake-in-memory
```

fake transport probe 的真实动作字段全部为 false：

```text
connectionAttempted=false
externalRequestSent=false
credentialValueRead=false
schemaMigrationExecuted=false
productionRecordWritten=false
```

## request / response shape

request 只接受 handle：

```text
credentialHandleOnly=true
credentialValueAccepted=false
endpointHandleOnly=true
externalUrlAccepted=false
payloadMayContainSecrets=false
```

response 只表达 fake transport 结果，不表达真实连接结果：

```text
fakeTransportResponseOnly=true
connectionAttempted=false
externalRequestSent=false
credentialValueRead=false
productionRecordWritten=false
```

## failure mapping

v253 把 v252 的六类失败映射为 test-only shell failure code：

```text
ADAPTER_CLIENT_DISABLED -> TEST_ONLY_SHELL_DISABLED
CREDENTIAL_HANDLE_MISSING -> TEST_ONLY_CREDENTIAL_HANDLE_MISSING
CREDENTIAL_VALUE_REQUESTED -> TEST_ONLY_CREDENTIAL_VALUE_BLOCKED
ENDPOINT_HANDLE_MISSING -> TEST_ONLY_ENDPOINT_HANDLE_MISSING
SCHEMA_REHEARSAL_MISSING -> TEST_ONLY_SCHEMA_REHEARSAL_MISSING
MANUAL_WINDOW_NOT_OPEN -> TEST_ONLY_MANUAL_WINDOW_NOT_OPEN
```

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npx vitest run test\managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.test.ts test\managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.test.ts -> 2 files, 6 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 193 files passed, 647 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/253/图片/test-only-adapter-shell-contract-v253.png
```

HTTP smoke 使用安全环境变量：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
AUDIT_STORE_URL=managed-audit://contract-only
```

smoke 结果：

```json
{
  "healthStatus": "ok",
  "shellContractState": "test-only-adapter-shell-contract-ready",
  "ready": true,
  "transportKind": "fake-in-memory",
  "fakeTransportOnly": true,
  "externalRequestSent": false,
  "credentialValueRead": false,
  "productionRecordWritten": false,
  "failureMappingCount": 6,
  "checkCount": 16,
  "passedCheckCount": 16
}
```

## 下一步

v253 完成后，不应直接抢跑 Node v254。按计划应先推荐并行推进：

```text
Java v102 + mini-kv v111
```

两边只读回显 / 非参与完成后，Node v254 再做三方 echo verification。

## 一句话总结

Node v253 把真实 managed audit client 之前的 test-only shell contract 固化下来：可以 fake transport 验证 shape，但仍不读 credential、不发真实请求、不打开 managed audit connection。
