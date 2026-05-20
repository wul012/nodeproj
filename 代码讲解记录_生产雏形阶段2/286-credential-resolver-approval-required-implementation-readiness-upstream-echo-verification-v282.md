# 286. Node v282 credential resolver approval-required implementation readiness upstream echo verification

## 本版所处项目进度

v282 是 v281 衍生出来的三方回显验证版。它不再新增新的 approval-required boundary，也不做真实 resolver，而是检查：

```text
Node v281 readiness review
Java v116 readiness echo
mini-kv v122 non-participation receipt
```

三者是否对 6 个 boundary、18 个 artifact、以及所有副作用禁止项保持一致。

## 新增类型文件

文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationTypes.ts
```

核心 profile：

```ts
export interface ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationProfile {
  verificationState:
    | "credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-ready"
    | "blocked";
  readOnlyUpstreamEchoVerification: true;
  approvalRequiredImplementationReadinessEchoVerificationOnly: true;
  readyForManagedAuditResolverImplementation: false;
  realResolverImplementationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
}
```

这里继续把危险动作写成字面量 `false`。这不是重复字段，而是审计边界：即使三方 echo ready，也不能解释成“可以实现或连接真实 managed audit”。

## 新增服务

文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification.ts
```

入口函数：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationProfile {
```

服务先加载 v281：

```ts
const sourceNodeV281 = createSourceNodeV281(input.config);
```

再读取 Java / mini-kv 的归档证据：

```ts
const javaV116 = createJavaV116Reference();
const miniKvV122 = createMiniKvV122Reference();
```

最后用 checks 决定 `verificationState`：

```ts
const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification
  ? "credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-ready"
  : "blocked";
```

## Java v116 读取方式

Java 侧仍是静态证据验证，不启动 Java 服务：

```ts
const evidenceFiles = [
  evidenceFile("java-v116-runbook", JAVA_V116_RUNBOOK),
  evidenceFile("java-v116-walkthrough", JAVA_V116_WALKTHROUGH),
  evidenceFile("java-v116-support", JAVA_V116_SUPPORT),
  evidenceFile("java-v116-builder", JAVA_V116_BUILDER),
];
```

关键片段包括：

```ts
snippet("java-v116-boundary-count", JAVA_V116_SUPPORT, "BOUNDARY_COUNT = 6")
snippet("java-v116-required-artifact-count", JAVA_V116_SUPPORT, "REQUIRED_ARTIFACT_COUNT = 18")
snippet("java-v116-proof-claims", JAVA_V116_BUILDER, "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.boundaryReadiness.size=6")
```

这保证 Node v282 不是“相信 Java 做了”，而是读取 Java v116 的实际归档和代码片段后才给出 ready。

## mini-kv v122 读取方式

mini-kv 的 receipt 是 JSON fixture：

```text
D:/C/mini-kv/fixtures/release/credential-resolver-approval-required-implementation-readiness-non-participation-receipt.json
```

服务读取内层 receipt、`boundary_readiness` 和 `summary`：

```ts
const root = readJsonObject(MINI_KV_V122_RECEIPT);
const receipt = objectField(root, "credential_resolver_approval_required_implementation_readiness_non_participation_receipt");
const boundaryReadiness = objectField(receipt, "boundary_readiness");
const checks = objectField(receipt, "checks");
const summary = objectField(receipt, "summary");
```

这次调试里发现 mini-kv 字段不是平铺结构，所以修成按真实 receipt 结构读取：

```ts
boundaryCount: numberField(boundaryReadiness, "boundary_count"),
requiredArtifactCount: numberField(boundaryReadiness, "required_artifact_count"),
boundaryCodes: stringArrayField(boundaryReadiness, "boundary_codes"),
requiredArtifactIds: stringArrayField(boundaryReadiness, "required_artifact_codes"),
checkCount: numberField(summary, "check_count"),
passedCheckCount: numberField(summary, "passed_check_count"),
```

这个细节很重要：v282 验证的是 mini-kv 实际输出契约，而不是 Node 自己假想的 JSON shape。

## checks 设计

本版共有 23 个 checks，核心分成四组：

```text
1. sourceNodeV281Ready / sourceNodeV281KeepsRuntimeImplementationBlocked
2. javaV116EchoReady / javaV116DocumentsNodeV281Consumption / javaV116KeepsRuntimeSideEffectsBlocked
3. miniKvV122ReceiptReady / miniKvV122DocumentsNodeV281Consumption / miniKvV122KeepsRuntimeSideEffectsBlocked
4. boundaryCodesAligned / requiredArtifactsAligned / readinessCountsAligned / side-effect boundary checks
```

代表性检查：

```ts
credentialBoundaryClosed:
  sourceNodeV281.credentialValueRead === false
  && javaV116.credentialValueRead === false
  && miniKvV122.credentialValueReadAllowed === false
  && miniKvV122.credentialValueLoaded === false
  && miniKvV122.credentialValueStored === false
  && miniKvV122.credentialValueIncluded === false,
```

这说明 v282 不只看“版本号到了”，还把三方的禁止动作逐项并起来验证。

## 路由接入

文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增注册：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationMarkdown),
```

仍然使用现有 `auditJsonMarkdownRoute`，没有再写新的 format 分支。

## 测试覆盖

文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification.test.ts
```

覆盖三类场景：

```text
1. 默认安全配置下，v282 verification ready，但 resolver implementation 仍 false
2. UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 打开时 blocked
3. JSON / Markdown route 都能通过 audit route table 输出
```

关键断言：

```ts
expect(profile.summary).toMatchObject({
  checkCount: 23,
  passedCheckCount: 23,
  boundaryCount: 6,
  requiredArtifactCount: 18,
});
```

## 本版质量修复

全量测试首次运行时，7 个既有 `productionLiveProbeRealReadSmoke*` route 用例在并发全量下触发 60 秒超时。它们单独和分组复跑均通过，所以不是业务失败。

本版把这 7 个慢 route 用例超时从 `60000` 提到 `90000`，没有修改业务逻辑和断言。修复后：

```text
npx vitest run 7 slow productionLiveProbeRealReadSmoke route files -> 7 files, 28 tests passed
npm test -> 217 files, 735 tests passed
```

另外补了一条 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 的测试。原因是 historical resolver 看 `process.env`，不能只靠 `loadConfig` 里的字段假设 CI fallback 已覆盖；v282 现在会在没有 sibling workspace 的 GitHub runner 风格环境下读取 Node 仓库内冻结的 Java v116 / mini-kv v122 fixture。

## 一句话总结

Node v282 把 Node v281、Java v116、mini-kv v122 的 approval-required implementation readiness 证据合成一个三方 upstream echo verification：23 个检查全部通过，但真实 resolver、credential value、raw endpoint、managed audit connection、写操作、schema migration 和 auto-start 仍然全部关闭。下一步只能写 Node v283 implementation plan draft，不能直接实现生产连接。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification.test.ts -> 1 file, 4 tests passed
npx vitest run 7 productionLiveProbeRealReadSmoke slow route files -> 7 files, 28 tests passed
npm test -> 217 files, 735 tests passed
npm run build -> passed
Node HTTP smoke -> passed with forced historical fixture fallback
Chrome screenshot -> d/282/图片/credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-v282.png
```
