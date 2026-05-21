# 295 - Node v290 credential resolver disabled fake harness execution-denied route preflight

## 版本定位

Node v290 是 v289 upstream echo verification 之后的只读收口版。它不提供 fake harness runtime，而是新增一个 execution-denied route preflight，专门说明为什么当前仍然不能执行：approval gate 未满足、credential value 禁止、raw endpoint URL 禁止、provider/client 禁止、HTTP/TCP 禁止、ledger/schema 禁止、fake harness runtime 缺失、自动上游启动禁止。

入口是 [managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.ts:44) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight`。这个函数只读取 v289 证据并组装报告，不实例化 resolver、secret provider、HTTP client，也不启动上游。

## 代码结构

类型定义放在 [managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightTypes.ts:5)。主 profile 明确写死这些生产边界：

```ts
readyForManagedAuditResolverImplementation: false;
readyForManagedAuditSandboxAdapterConnection: false;
realResolverImplementationAllowed: false;
testOnlyFakeHarnessAllowed: false;
executionAllowed: false;
connectsManagedAudit: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
schemaMigrationExecuted: false;
approvalLedgerWritten: false;
automaticUpstreamStart: false;
```

这些字段都必须保留。它们分别覆盖 resolver、sandbox、runtime execution、credential、endpoint、network、write 和 startup 等不同审计维度，不能因为本版主题是“execution denied”就把边界字段合并掉。

## Node v289 证据

`createSourceNodeV289` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.ts:120) 直接调用 v289 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification({ config });
```

它提取 `verificationDigest`、`sourceCheckCount`、`sourcePassedCheckCount`、`sourceProductionBlockerCount`，并确认 v289 仍然保持 fake harness runtime 关闭。

## 执行被拒绝的 route preflight

`createExecutionDeniedRoutePreflight` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.ts:232) 组装一个只读 route preflight，路由本身是：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight
```

它并不承诺执行 fake harness，而是显式列出 8 类被拒绝的尝试：

- approval-gate
- credential-value
- raw-endpoint-url
- provider-client
- http-tcp
- ledger-schema
- fake-harness-runtime
- automatic-upstream-start

每条尝试都保持 `simulatedOnly: true`、`actualExecutionAttempted: false`、`denied: true`、`executionAllowed: false`。

## 路由和测试

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:670) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight
```

测试在 [managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.test.ts:13)，覆盖四件事：

- 默认 profile ready。
- 打开 `UPSTREAM_PROBES_ENABLED` / `UPSTREAM_ACTIONS_ENABLED` 会 blocked。
- forced historical fixture fallback 可用。
- JSON 和 Markdown route 都可访问。

## 验证结果

本版通过了 `npm run typecheck`、v289 相关聚焦测试、v290 聚焦测试。全量验证与 build 在本版收尾阶段继续执行，目标是保持 Node 的版本闭环、归档闭环和提交闭环都完整。

## 本版结论

v290 已把 Node 的 disabled fake harness 线从“合同回声”推进到“执行被拒绝的 route preflight”。这仍然不是 runtime，也没有打开 managed audit 连接；它只是把拒绝理由和路由级预检说明固定下来，方便下一版继续消费。
