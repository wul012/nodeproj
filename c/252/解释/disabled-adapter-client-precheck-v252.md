# Node v252 运行调试说明：disabled adapter client precheck

本版依据 `docs/plans/v245-post-sandbox-precheck-roadmap.md` 的最后一步推进。v251 已完成人工连接决策记录，v252 只做 disabled adapter client precheck：定义将来 adapter client 需要的边界、handle、opt-in gate、失败分类和 dry-run response shape。

## 本版目标

v252 不实现真实 adapter client，不实例化 client，不读取 credential value，不发真实外部请求。它只是把将来写 client 前必须满足的禁用态边界写成机器可读 profile。

## 新增入口

新增服务：

```text
src/services/managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.ts
```

新增路由：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck
GET /api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck?format=markdown
```

## 消费来源

v252 只消费：

```text
Node v251 manual sandbox connection decision record
```

它不重新读取 Java / mini-kv 文件，也不启动或修改 Java / mini-kv。

## required env handles

本版只声明 handle 名称，不要求读取值：

```text
ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED
ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE
ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID
ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS
```

其中 credential 仍然是 handle，不是 credential value。

## opt-in gate

```text
ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED
currentDefault=false
precheckTreatsEnabledAsBlocked=true
```

也就是说：v252 期间如果有人把 client enabled 打开，反而应该 blocked，不允许继续连接。

## failure taxonomy

本版定义六类失败：

```text
ADAPTER_CLIENT_DISABLED
CREDENTIAL_HANDLE_MISSING
CREDENTIAL_VALUE_REQUESTED
ENDPOINT_HANDLE_MISSING
SCHEMA_REHEARSAL_MISSING
MANUAL_WINDOW_NOT_OPEN
```

## 边界

本版没有做：

```text
真实 managed audit connection
真实 external endpoint request
adapter client implementation
client instantiation
credential value loading
schema migration SQL
approval ledger 写入
Java / mini-kv / external audit service auto-start
```

## 验证

聚焦验证：

```text
npm run typecheck -> passed
vitest run v252 disabled adapter client precheck + v251 decision record -> 6 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 192 files passed, 644 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/252/图片/disabled-adapter-client-precheck-v252.png
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
  "precheckState": "disabled-adapter-client-precheck-ready",
  "ready": true,
  "connectsManagedAudit": false,
  "readsManagedAuditCredential": false,
  "externalRequestMayBeSent": false,
  "failureClassCount": 6,
  "checkCount": 19,
  "passedCheckCount": 19
}
```

本版同时收口：

```text
docs/plans/v245-post-sandbox-precheck-roadmap.md
```

并另起：

```text
docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md
```

## 一句话总结

Node v252 把真实 adapter client 之前的禁用态边界写清楚了：需要哪些 handle、什么时候必须失败、返回什么 dry-run shape，但仍然没有任何真实连接能力。
