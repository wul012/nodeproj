# 第二百六十五版代码讲解：sandbox endpoint credential resolver test-only shell upstream echo verification

本版目标是消费 Node v264、Java v107 和 mini-kv v116，生成一个只读 upstream echo verification。它验证三边是否对同一个 test-only fake resolver shell 达成一致：request shape、response shape、failure mapping、guard conditions、fake resolver probe，以及所有 no-side-effect 边界。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v263-post-disabled-resolver-echo-roadmap.md
```

当前链路是：

```text
Node v263 disabled resolver precheck upstream echo verification
 -> Node v264 credential resolver test-only shell contract
 -> Java v107 test-only shell echo marker
 -> mini-kv v116 test-only shell non-participation receipt
 -> Node v265 test-only shell upstream echo verification
```

Java v108 / v109 已经完成优化收口，其中 v109 把 `ReleaseApprovalRehearsalResponse` 的 records 拆到独立 `ReleaseApprovalRehearsalResponseRecords`。v265 会把 v109 写入 `optimizationContext`，但它不是硬前置；v265 的硬前置仍然是 Java v107 和 mini-kv v116。

## 新增文件

本版新增三份服务文件：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationRenderer.ts
```

测试文件：

```text
test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.test.ts
```

路由接入：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

此外，本版补齐 Java v107 / Java v109 / mini-kv v116 的 committed historical fallback，避免 GitHub runner 依赖本机 `D:\javaproj` 或 `D:\C\mini-kv`。

## 主 profile

profile version 和路由定义在服务顶部：

```ts
const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification";
```

返回对象继续把危险动作写死为 false：

```ts
credentialResolverExecutionAllowed: false,
connectsManagedAudit: false,
readsManagedAuditCredential: false,
storesManagedAuditCredential: false,
credentialValueRead: false,
credentialValueLoaded: false,
credentialValueStored: false,
credentialValueIncluded: false,
rawEndpointUrlParsed: false,
rawEndpointUrlIncluded: false,
externalRequestSent: false,
secretProviderInstantiated: false,
resolverClientInstantiated: false,
schemaMigrationExecuted: false,
automaticUpstreamStart: false,
```

这里的 `readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification=true` 只表示三边回显一致，不表示真实 credential resolver 可以运行。

## 消费 Node v264

主服务先读取 v264：

```ts
const source = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract({ config });
const contract = source.resolverShellContract;
```

`createSourceNodeV264()` 会确认 v264 的合同仍是 fake-only：

```ts
reference.shellMode === "test-only-fake-resolver-contract"
&& reference.resolverKind === "fake-in-memory"
&& reference.testOnlyShell
&& reference.readOnlyContract
&& reference.fakeResolverOnly
&& reference.handleOnlyRequest
```

它还要求 request / response / failure / guard 的数量和字段顺序稳定：

```ts
arraysEqual(reference.requestShapeFields, REQUEST_SHAPE_FIELDS)
&& arraysEqual(reference.responseShapeFields, RESPONSE_SHAPE_FIELDS)
&& arraysEqual(reference.failureClassCodes, FAILURE_CLASS_CODES)
&& arraysEqual(reference.guardConditionCodes, GUARD_CONDITION_CODES)
```

这样 v265 不靠“名字像”，而是用实际 contract shape 判断 v264 是否可被上游回显。

## Java v107 echo marker

Java 侧读取四份证据：

```ts
const evidenceFiles = [
  evidenceFile("java-v107-runbook", JAVA_V107_RUNBOOK),
  evidenceFile("java-v107-walkthrough", JAVA_V107_WALKTHROUGH),
  evidenceFile("java-v107-marker-builder", JAVA_V107_MARKER_BUILDER),
  evidenceFile("java-v107-contract-builder", JAVA_V107_CONTRACT_BUILDER),
];
```

`createJavaV107Reference()` 用代码和说明里的实际片段确认 Java 回显了 Node v264：

```ts
snippet("java-v107-request-count", JAVA_V107_MARKER_BUILDER, "resolverShellContract.requestShapeFieldCount=9")
snippet("java-v107-response-count", JAVA_V107_MARKER_BUILDER, "resolverShellContract.responseShapeFieldCount=13")
snippet("java-v107-failure-count", JAVA_V107_MARKER_BUILDER, "resolverShellContract.failureMappingCount=7")
snippet("java-v107-guard-count", JAVA_V107_MARKER_BUILDER, "resolverShellContract.guardConditionCount=10")
```

Java 的 no-side-effect 边界也被显式检查：

```ts
!reference.credentialResolverExecutionAllowed
&& !reference.connectsManagedAudit
&& !reference.credentialValueRead
&& !reference.rawEndpointUrlParsed
&& !reference.externalRequestSent
&& !reference.secretProviderInstantiated
&& !reference.resolverClientInstantiated
&& !reference.schemaMigrationExecuted
&& !reference.productionRecordWritten
```

所以 Java v107 只是 echo marker，不是 resolver 实现。

## mini-kv v116 non-participation

mini-kv 侧读取 JSON fixture：

```ts
const root = readJsonObject(MINI_KV_V116_RECEIPT);
const receipt = objectField(root, "test_only_resolver_shell_non_participation_receipt");
```

然后解析 request / response / failure / guard：

```ts
const requestShape = objectField(receipt, "request_shape");
const responseShape = objectField(receipt, "response_shape");
const sourceFailureCodes = objectArrayField(receipt, "failure_mapping")
  .map((mapping) => stringField(mapping, "source_failure_code"))
  .filter(isNonNullString);
const guardConditionCodes = objectArrayField(receipt, "guard_conditions")
  .map((guard) => stringField(guard, "code"))
  .filter(isNonNullString);
```

关键检查是 mini-kv 只证明不参与：

```ts
!reference.credentialResolverImplemented
&& !reference.credentialResolverInvoked
&& !reference.secretProviderInstantiated
&& !reference.resolverClientInstantiated
&& !reference.connectionExecutionAllowed
&& !reference.storageWriteAllowed
&& !reference.credentialValueReadAllowed
&& !reference.rawEndpointUrlParsed
&& !reference.externalRequestSent
&& !reference.loadRestoreCompactExecuted
&& !reference.setnxexExecutionAllowed
```

也就是说，mini-kv v116 不会因为 Node 有 fake shell contract 就变成 managed audit storage backend。

## Java v109 优化上下文

v265 额外读取 Java v109：

```ts
const evidenceFiles = [
  evidenceFile("java-v109-runbook", JAVA_V109_RUNBOOK),
  evidenceFile("java-v109-walkthrough", JAVA_V109_WALKTHROUGH),
  evidenceFile("java-v109-records", JAVA_V109_RECORDS),
];
```

它输出：

```ts
optimizationOnly: true,
hardPrerequisiteForNodeV265: false,
businessMarkerAdded: false,
managedAuditBoundaryChanged: false,
responseRecordsSplit: true,
releaseApprovalRehearsalResponseRecordsPresent: true,
mainResponseShellLineCount: 68,
```

这解决了用户提到的“可以对齐 Java v109 吗”：可以对齐，但只作为质量优化上下文，不把 v109 升格为 v265 硬门槛。

## Checks

`createChecks()` 是本版的核心判断：

```ts
sourceNodeV264Ready: sourceNodeV264.readyForNodeV265TestOnlyShellUpstreamEchoVerification,
javaV107EchoReady: javaV107.readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
miniKvV116NonParticipationReady: miniKvV116.readyForNodeV265Alignment,
javaV109OptimizationContextReady: javaV109.alignedWithNodeV265,
```

三方结构对齐包括：

```ts
testOnlyShellContractAligned
requestShapeAligned
responseShapeAligned
failureMappingAligned
guardConditionsAligned
fakeResolverProbeAligned
```

五类边界继续关闭：

```ts
credentialBoundaryAligned
rawEndpointBoundaryAligned
connectionBoundaryAligned
writeBoundaryAligned
autoStartBoundaryAligned
```

最终 readiness 仍然要求 `UPSTREAM_ACTIONS_ENABLED=false`：

```ts
upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
```

所以 v265 不会在本地或 CI 里误开上游动作。

## 路由接入

路由仍走统一 helper：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown),
```

这延续 v240 之后的质量规则：新增 audit JSON/Markdown endpoint 不再手写两套 route 分支。

## 测试覆盖

测试覆盖四个场景：

```text
1. 三方对齐 ready，并确认 Java v109 只是 optimizationContext
2. 强制 historical fallback，模拟 GitHub runner 没有 sibling workspace
3. UPSTREAM_ACTIONS_ENABLED=true 时阻断
4. JSON / Markdown route 都能输出
```

关键断言包括：

```ts
expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
expect(profile.summary.evidenceFileCount).toBe(10);
expect(profile.summary.matchedSnippetCount).toBe(50);
```

这让 v265 的证据消费不依赖本机路径，也不绕过 route table。

## 验证结果

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.test.ts -> 1 file, 4 tests passed
npm test -> 205 files, 691 tests passed
npm run build -> passed
safe HTTP smoke -> passed, checkCount=20, passedCheckCount=20, javaV109OptimizationContextReady=true, markdownStatus=200
Chrome screenshot -> c/265/图片/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.png
```

## 成熟度变化

v265 让 credential resolver 这条线从“Node 已定义 fake shell”推进到“三项目都能证明 fake shell 仍然只是假壳”。这比单纯新增一个 endpoint 更接近生产流程，因为它要求：

```text
Node 定义合同
Java 只读回显业务侧理解
mini-kv 证明基础设施侧不参与
Node 再回读三边证据做一致性验证
```

但真实生产连接仍未打开。下一步 v266 应做 archive verification，把 v264/v265 的 HTML、截图、解释、代码讲解、route digest 和 fallback 证据固化下来。

## 一句话总结

Node v265 把 test-only credential resolver shell 的三项目一致性验证收口：Java v107 和 mini-kv v116 都确认了 fake-only、handle-only、no-side-effect 边界，Java v109 的 records split 也被纳入优化上下文，但真实 resolver、secret provider、credential value、raw endpoint 和 external request 依旧全部关闭。
