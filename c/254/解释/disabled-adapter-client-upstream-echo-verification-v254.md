# Node v254 运行调试说明：disabled adapter client upstream echo verification

本版依据 `docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md` 推进。Java v102 与 mini-kv v111 已完成只读 echo / non-participation，v254 负责把 Node v252、Node v253、Java v102、mini-kv v111 的 disabled adapter client 边界统一验证。

## 本版目标

v254 不是连接版本。它只做三方只读验证：

```text
Node v252：disabled adapter client precheck
Node v253：test-only adapter shell contract
Java v102：disabled adapter client precheck echo receipt
mini-kv v111：disabled adapter client non-participation receipt
```

验证通过只代表 fake transport / disabled client 前置证据一致，不代表可以打开真实 managed audit connection。

## 新增入口

新增服务：

```text
src/services/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.ts
```

新增类型和渲染拆分：

```text
src/services/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationRenderer.ts
```

新增路由：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification?format=markdown
```

## 验证重点

v254 对齐这些字段：

```text
requiredEnvHandleCount=5
failureClassCount=6
dryRunResponseFieldCount=10
requestShapeFieldCount=8
responseShapeFieldCount=9
failureMappingCount=6
guardConditionCount=7
```

并继续保持：

```text
readyForManagedAuditSandboxAdapterConnection=false
executionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

## GitHub fallback

本版新增 Java v102 / mini-kv v111 的 committed historical fixture fallback。这样 GitHub runner 即使没有 `D:/javaproj` 和 `D:/C/mini-kv`，也能验证同一份上游证据。

## 质量优化

v254 初始服务文件较大，因此本版同时做了轻量拆分：

```text
主服务：691 行，负责装配、证据读取、校验
types：244 行，集中 profile / reference / message 类型
renderer：72 行，集中 Markdown 输出
```

这符合当前计划的质量规则：新 service 接近 700 行时优先拆 types / renderer，不继续堆单文件。

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npm test -- managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.test.ts -> 1 file, 4 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 194 files passed, 651 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/254/图片/disabled-adapter-client-upstream-echo-verification-v254.png
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
  "verificationState": "disabled-adapter-client-upstream-echo-verification-ready",
  "ready": true,
  "javaReady": true,
  "miniKvReady": true,
  "envHandleCountAligned": true,
  "failureClassCountAligned": true,
  "fakeTransportShapeAligned": true,
  "connectsManagedAudit": false,
  "readsManagedAuditCredential": false
}
```

## 下一步

v254 完成后，按当前计划进入：

```text
Node v255：fake transport adapter dry-run verification packet
```

v255 仍只能验证 fake transport 的 dry-run request / response / timeout / failure mapping / cleanup，不能打开真实 external endpoint。

## 一句话总结

Node v254 把 disabled adapter client 的三方只读证据对齐了：Java v102 和 mini-kv v111 都确认 Node v252/v253 的 env handle、failure taxonomy、fake transport shape 和 no credential/no connection/no write/no auto-start 边界一致，但真实 managed audit connection 仍未打开。
