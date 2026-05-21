# 294 - Node v289 credential resolver disabled fake harness contract upstream echo verification

## 版本定位

Node v289 是 v288 disabled fake harness contract 的上游回声验证版。它不写 fake harness runtime，而是把三项目证据放到同一个只读 profile 里：Node v288 负责合同，Java v122-v126 负责测试拆分和 catalog 止血证据，mini-kv v127 负责结构化 non-participation receipt。

入口是 [managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.ts:123) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification`。这个函数只读取现有证据并组装报告，不实例化 resolver、secret provider、HTTP client，也不启动上游。

## 代码结构

类型定义放在 [managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationTypes.ts:7)。主 profile 明确写死这些生产边界：

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

这类字段看似重复，但它们分别服务 audit、production window、runtime execution、credential、endpoint、network、write gate 等不同审计维度，不能因为同为 `false` 就合并删除。

## Node v288 证据

`createSourceNodeV288` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.ts:231) 直接调用 v288 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract({ config });
```

它提取 `contractDigest`、`contractName`、`runtimeToggleName`、inputs/outputs/artifacts/assertions/actions 数量，以及 v288 的 check count。v289 只接受 `contractState === "disabled-fake-harness-contract-ready"` 且 `javaEchoRequiredNow` / `miniKvEchoRequiredNow` 都为 `true` 的 v288。

## Java v122-v126 证据

`createJavaV122V126Reference` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.ts:303) 消费六个文件：

```text
D:/javaproj/advanced-order-platform/d/122/解释/说明.md
D:/javaproj/advanced-order-platform/d/123/解释/说明.md
D:/javaproj/advanced-order-platform/d/124/解释/说明.md
D:/javaproj/advanced-order-platform/d/125/解释/说明.md
D:/javaproj/advanced-order-platform/d/126/解释/说明.md
D:/javaproj/advanced-order-platform/src/main/java/.../ReleaseApprovalSandboxEndpointCredentialResolverBoundaryCatalog.java
```

这里没有假装 Java 已经提供结构化 receipt。Java v122-v125 的核心价值是集成测试四连拆，v126 的核心价值是把 echo support 常量收敛到 `BoundaryCatalog`。所以 v289 用 snippet 证明它们完成了“只读质量证据”和“边界止血”，而不是让 Java 提前承诺 fake harness runtime。

## mini-kv v127 证据

`createMiniKvV127Reference` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.ts:371) 读取：

```text
D:/C/mini-kv/fixtures/release/credential-resolver-disabled-fake-harness-non-participation-receipt.json
```

mini-kv v127 是结构化 JSON，因此 v289 会读取 `disabled_fake_harness_contract.contract_digest`、`required_inputs`、`allowed_outputs`、`prohibited_inputs`、`required_artifacts`、`contract_assertions`、`prohibited_actions`，再和 Node v288 的合同形状逐项对齐。

## 核心校验

`createChecks` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.ts:495) 做三层判断：

1. Node v288 本身仍 ready 且关闭 runtime。
2. Java v122-v126 的 runbook/catalog 证据齐全。
3. mini-kv v127 echo 了 Node v288 digest 和 contract shape，并声明不参与 credential、endpoint、provider/client、HTTP/TCP、write、authority。

最后汇总到：

```ts
sideEffectBoundaryClosed =
  credentialBoundaryClosed
  && rawEndpointBoundaryClosed
  && providerClientBoundaryClosed
  && connectionBoundaryClosed
  && writeBoundaryClosed
  && autoStartBoundaryClosed
  && authorityBoundaryClosed
  && javaDocumentsRuntimeBoundaries
  && sourceNodeV288ContractStillDisabled
  && miniKvV127KeepsRuntimeSideEffectsBlocked;
```

这就是 v289 的主结论：三项目已经回声对齐，但执行面仍然关闭。

## 历史证据修正

本版还小修了 [managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.ts:223)。原因是 v286 需要验证 mini-kv v126 当时固化的 Node v283 `planDigest/reviewDigest`，不能让当前代码重新计算旧版本 source 后产生 digest 漂移。

新逻辑用 `readMiniKvV126NodeV283Snapshot` 从 mini-kv v126 receipt 中取当时的 source snapshot，这让 v286-v289 的历史链在后续重构后仍稳定。

## 路由和测试

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:659) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification
```

测试在 [managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.test.ts:13)，覆盖四件事：

- 默认 profile ready。
- 打开 `UPSTREAM_PROBES_ENABLED` / `UPSTREAM_ACTIONS_ENABLED` 会 blocked。
- forced historical fixture fallback 可用。
- JSON 和 Markdown route 都可访问。

## 验证结果

本版通过了 `npm run typecheck`、v286-v289 聚焦链路测试、三个 live-probe route 超时文件的单文件复跑，以及 `npm run build`。全量 `npm test` 第一次运行中 219/222 个测试文件、755/758 个用例通过；剩余三个 live-probe route 用例在全量并发下触发 60 秒预算超时，但单文件复跑全部通过。因此本版把这三个 route 用例预算从 60 秒提高到 90 秒，这是测试预算稳定性修正，不是 v289 的业务行为修改。最终全量 `npm test` 为 222 个测试文件、758 个用例全部通过。

## 本版结论

v289 已经确认：Node v288、Java v122-v126、mini-kv v127 在 disabled fake harness contract 上完成只读对齐；下一步可以另起计划继续推进，但仍不能直接打开 fake harness runtime、真实 resolver、真实 managed audit connection 或任何写路径。
