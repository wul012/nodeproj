# 296 - Node v291 credential resolver execution-denied upstream echo verification

## 版本定位

Node v291 是 v290 execution-denied route preflight 之后的三方证据消费版。它读取 Node v290、Java v127-v130、mini-kv v128 的证据，但故意不把系统推进到 runtime ready：Java 当前提供的是质量止血证据，不是 execution-denied echo，所以本版输出 `verificationState: "blocked"`。

入口是 [managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.ts:49) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification`。它只组装报告，不实例化 resolver、secret provider、HTTP client，也不启动 Java 或 mini-kv。

## 类型边界

[managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationTypes.ts:7) 定义了主 profile。这里继续保留多组显式 false：

```ts
readyForManagedAuditResolverImplementation: false;
readyForManagedAuditSandboxAdapterConnection: false;
realResolverImplementationAllowed: false;
testOnlyFakeHarnessAllowed: false;
fakeHarnessRuntimeEnabled: false;
executionAllowed: false;
connectsManagedAudit: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
schemaMigrationExecuted: false;
approvalLedgerWritten: false;
automaticUpstreamStart: false;
```

这些字段看起来重复，但分别代表 implementation、sandbox connection、test-only runtime、credential、endpoint、network、write 和 startup 的审计维度。v291 的价值就在于把这些边界和“blocked”结论一起固化。

## Node v290 证据

`createSourceNodeV290` 在 [managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.ts:137) 直接调用 v290 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight({ config });
```

它提取 `preflightDigest`、route path、denial reason count、simulated attempt count、actual execution attempt count，并确认 v290 仍保持 `executionAllowed=false`、`externalRequestSent=false`、`credentialValueRead=false`。

## Java v127-v130 证据

`createJavaV127V130Reference` 在 [managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.ts:185) 读取 4 个 Java 说明文件：

```text
D:/javaproj/advanced-order-platform/d/127/解释/说明.md
D:/javaproj/advanced-order-platform/d/128/解释/说明.md
D:/javaproj/advanced-order-platform/d/129/解释/说明.md
D:/javaproj/advanced-order-platform/d/130/解释/说明.md
```

这里确认的是质量队列已经完成：LiveAggregationIntegrationTests 二拆、ResponseRecords 二拆、OverviewTests 二拆、echo catalog 延伸。代码里也明确写死：

```ts
javaExecutionDeniedEchoPresent: false;
```

这点很重要：Java 质量证据只能证明结构在变健康，不能替代 Java execution-denied echo。

## mini-kv v128 证据

`createMiniKvV128Reference` 在 [managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.ts:237) 读取 mini-kv receipt：

```text
D:/C/mini-kv/fixtures/release/credential-resolver-disabled-fake-harness-execution-denied-non-participation-receipt.json
```

它解析 `execution_denied_route_preflight.preflight_digest`，再在 [createChecks](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.ts:335) 里和 Node v290 的 `preflightDigest` 对齐：

```ts
miniKvV128.preflightDigest === sourceNodeV290.preflightDigest
```

这次没有拿 `source_node_v289_reference.verification_digest` 来对齐 v290，因为那是 v289 upstream echo 的 digest，不是 v290 route preflight digest。

## Checks 和 blocked 结论

`createChecks` 产出 19 个检查，其中 17 个为 true，两个 false 是设计内结论：

```ts
javaExecutionDeniedEchoPresent: false;
readyForManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification: false;
```

因此 v291 是“证据消费完成，但 implementation 仍 blocked”。这和计划一致：不抢跑真实 fake harness，不连接 managed audit，不读 credential value。

`collectProductionBlockers` 会把 `JAVA_EXECUTION_DENIED_ECHO_MISSING` 放入 blocker，而不是只作为 warning。这样 `verificationState: "blocked"` 与报告里的阻塞原因一致。

## 路由和测试

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:675) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification
```

测试在 [managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.test.ts:13)，覆盖：

- 默认 profile blocked，且 blocked 原因是 Java execution-denied echo 缺失。
- mini-kv v128 receipt 已 ready，并与 Node v290 preflight digest 对齐。
- `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 时仍能读取 frozen Java/mini-kv evidence。
- JSON 和 Markdown route 均可访问。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.test.ts
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.test.ts test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.test.ts
npx vitest run test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.test.ts test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.test.ts test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.test.ts
npm test
npm run build
```

全量结果：224 个测试文件、765 个用例通过。`npm run build` 通过。

全量第一次运行时，3 个既有 production live-probe route 用例在并发压力下触发 60s 默认超时；三个文件单独运行全部通过。因此本版只给这 3 个 route smoke 用例补显式 90s timeout，这是测试预算稳定，不是业务行为修改。

## 本版结论

v291 把 Node v290 + Java v127-v130 + mini-kv v128 三方证据读到了同一个报告里，也守住了关键边界：Java 质量证据不能当成 execution-denied echo，mini-kv non-participation 不能当成执行能力，Node 仍不能打开 fake harness runtime。
