# Node v296 运行解释：disabled runtime shell upstream echo verification

## 本版定位

Node v296 消费三份证据：

```text
Node v295：disabled runtime shell design review
Java v133：disabled runtime shell handoff echo
mini-kv v130：disabled runtime shell non-participation receipt
```

这里有一个计划修正：v295 计划里写的是 Java v132，但 Java v132 实际是质量优化版；真正提供 handoff echo 的是 Java v133。所以 v296 在 profile 中显式记录：

```text
plannedJavaVersion = Java v132
actualJavaEchoVersion = Java v133
planVersionCorrectionApplied = true
```

## 运行结果

证据文件：

```text
d/296/evidence/credential-resolver-disabled-runtime-shell-upstream-echo-verification-v296.json
d/296/evidence/credential-resolver-disabled-runtime-shell-upstream-echo-verification-v296.md
```

核心结果：

```text
verificationState = disabled-runtime-shell-upstream-echo-verification-ready
readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification = true
readyForNodeV297RuntimeShellImplementationCandidateGate = true
readyForNodeV297RuntimeShellImplementation = false
checkCount = 24
passedCheckCount = 24
productionBlockerCount = 0
```

`readyForNodeV297RuntimeShellImplementationCandidateGate=true` 只表示可以进入“候选门禁”版本，不表示可以实现或调用 runtime shell。

## 三方证据

Java v133 侧确认：

```text
handoffEchoMode = java-v133-credential-resolver-disabled-runtime-shell-handoff-echo-only
readyForNodeV296 = true
noRuntimeImplementation = true
noRuntimeInvocation = true
credentialValueBoundaryClosed = true
rawEndpointBoundaryClosed = true
providerClientBoundaryClosed = true
ledgerSqlSchemaBoundaryClosed = true
automaticUpstreamStartBlocked = true
```

mini-kv v130 侧确认：

```text
releaseVersion = v130
consumerHint = Node v296 disabled runtime shell upstream echo verification
readyForNodeV296 = true
readOnly = true
executionAllowed = false
runtimeShellImplemented = false
runtimeShellInvocationAllowed = false
credentialValueRead = false
rawEndpointUrlParsed = false
externalRequestSent = false
loadRestoreCompactExecuted = false
setnxexExecutionAllowed = false
auditAuthoritative = false
orderAuthoritative = false
```

## 安全边界

本版仍保持这些字段为 `false`：

```text
runtimeShellImplemented
runtimeShellEnabled
runtimeShellInvocationAllowed
testOnlyFakeHarnessAllowed
testOnlyFakeHarnessExecutionAllowed
realResolverImplementationAllowed
executionAllowed
connectsManagedAudit
credentialValueRead
rawEndpointUrlParsed
externalRequestSent
secretProviderInstantiated
resolverClientInstantiated
fakeSecretProviderInstantiated
fakeResolverClientInstantiated
schemaMigrationExecuted
approvalLedgerWritten
automaticUpstreamStart
```

## 下一步

v296 的合理下一步是 Node v297：disabled runtime shell implementation candidate gate。v297 仍应默认 blocked，只判断候选门槛是否齐全；不能直接实现 runtime shell，不能实例化 provider/client，不能读取 credential value，不能解析 raw endpoint URL，不能发 HTTP/TCP。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.test.ts
npm test
npm run build
```

全量结果：229 个测试文件、785 个用例通过。`npm run build` 通过。
