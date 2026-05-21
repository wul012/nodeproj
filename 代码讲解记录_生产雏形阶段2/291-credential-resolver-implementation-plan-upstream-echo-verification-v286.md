# 291 - credential resolver implementation plan upstream echo verification（Node v286）

## 版本定位

Node v286 是三项目主流程的对齐版。它消费 Node v283 的 implementation plan draft、Java v121 的 echo receipt、mini-kv v126 的 non-participation receipt，判断三方是否都在同一组边界内。

这一版的结论是：三方证据已对齐，可以进入后续 Node v287 的 test-only fake harness precheck；但真实 resolver 仍然不能实现。

## 核心入口

新服务入口在：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification(...)
```

文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.ts
```

它先加载三组输入：

```ts
const sourceNodeV283 = createSourceNodeV283(input.config);
const javaV121 = createJavaV121Reference();
const miniKvV126 = createMiniKvV126Reference();
const checks = createChecks(input.config, sourceNodeV283, javaV121, miniKvV126);
```

这里的设计重点是：Node 自己的 v283 计划来自本地 service，Java / mini-kv 来自 sibling workspace 或 historical fixture。这样本机能读真实项目，GitHub runner 也能用 frozen evidence。

## Java v121 如何验证

Java 侧用文本 evidence 匹配，而不是 JSON 解析：

```ts
const evidenceFiles = [
  evidenceFile("java-v121-builder", JAVA_V121_BUILDER),
  evidenceFile("java-v121-records", JAVA_V121_RECORDS),
  evidenceFile("java-v121-tests", JAVA_V121_TESTS),
];
const expectedSnippets = createJavaV121ExpectedSnippets();
```

原因是 Java v121 的证据是 `.java` builder / record / test，不是 JSON fixture。这里检查的是：

```text
java-v121-credential-resolver-implementation-plan-echo-only
Node v283
Node v284
planDigest
java-v121-consumes-node-v283-plan
readyForNodeV284CredentialResolverImplementationPlanEchoVerification
```

注意：Java 侧只要求命名 `planDigest` 概念，不要求回显具体 digest 值；具体 digest 值由 mini-kv v126 JSON 锁定。

## mini-kv v126 如何验证

mini-kv 的证据是 JSON，因此可以读取结构化字段：

```ts
const readJson = readJsonObject(MINI_KV_V126_RECEIPT);
const receipt = objectField(readJson, "credential_resolver_implementation_plan_non_participation_receipt");
const plan = objectField(receipt, "implementation_plan");
const review = objectField(receipt, "implementation_plan_review");
```

这里验证 mini-kv v126 回显了 Node v283 的：

```text
planDigest
reviewDigest
7 个 interface boundary code
21 个 required artifact
21 个 prohibited action
4 个 Java requirement id
4 个 mini-kv requirement id
```

并继续断言所有副作用都是关闭状态：

```ts
credentialResolverImplemented === false
credentialValueRead === false
rawEndpointUrlParsed === false
externalRequestSent === false
connectsManagedAudit === false
approvalLedgerWritten === false
schemaMigrationExecuted === false
automaticUpstreamStart === false
```

## 检查项收口

`createChecks(...)` 把三方证据合并成 28 个检查项。关键门禁包括：

```ts
const sideEffectBoundaryClosed =
  credentialBoundaryClosed
  && rawEndpointBoundaryClosed
  && resolverBoundaryClosed
  && connectionBoundaryClosed
  && writeBoundaryClosed
  && autoStartBoundaryClosed;
```

最终 ready 不是手写常量，而是由所有检查项自动汇总：

```ts
checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification =
  Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification")
    .every(([, value]) => value);
```

这可以避免新增检查项后忘记纳入总门禁。

## 路由接入

路由注册在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增入口保持 JSON / Markdown 双格式：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification?format=markdown
```

renderer 独立放在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationRenderer.ts
```

避免 service 文件同时承担 profile 组装和 Markdown 输出。

## 测试重点

新增测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.test.ts
```

覆盖四类场景：

```text
1. 正常 profile 为 ready
2. UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 打开时 blocked
3. ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true 时仍能读 frozen evidence
4. audit route 同时输出 JSON 和 Markdown
```

其中 forced fallback 很重要，因为 GitHub Actions 不能依赖本机 `D:/javaproj` 和 `D:/C/mini-kv` 一定存在。

## 项目进度影响

Node v286 没有打开真实 managed audit connection，也没有开始 fake harness 实现。它只是确认：

```text
Node v283 计划草案
Java v121 echo
mini-kv v126 non-participation receipt
```

三者在 digest、边界、artifact、禁止动作和副作用上对齐。下一步 Node v287 可以做 test-only fake resolver harness precheck，但仍应保持 disabled / no credential value / no raw endpoint / no external request。
