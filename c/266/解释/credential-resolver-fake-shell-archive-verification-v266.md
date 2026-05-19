# Node v266 运行调试说明：credential resolver fake-shell archive verification

本版依据 `docs/plans/v263-post-disabled-resolver-echo-roadmap.md` 推进。Node v264 已定义 test-only fake resolver shell contract，Node v265 已完成 Java v107 / mini-kv v116 的 upstream echo verification。v266 只做归档验证：确认 v264/v265 的 HTML、截图、解释、代码讲解、route response 和 active plan 片段都完整，不重新执行 fake resolver shell。

## 本版目标

v266 消费：

```text
Node v264 credential resolver test-only shell contract
Node v265 test-only resolver shell upstream echo verification
c/264 + c/265 archive files
代码讲解记录_生产雏形阶段/268 + 269
docs/plans/v263-post-disabled-resolver-echo-roadmap.md
```

它只读验证归档，不启动 Java，不启动 mini-kv，不实例化 resolver client / secret provider，不读取 credential value，不解析 raw endpoint URL，不发 external request。

## 新增入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification?format=markdown
```

新增模块：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationRenderer.ts
```

## 关键结果

```text
archiveVerificationState=credential-resolver-fake-shell-archive-verification-ready
sourceNodeV264Ready=true
sourceNodeV265Ready=true
sourceNodeV265ConsumesUpstreamEchoes=true
archiveFilesPresent=true
archiveFilesNonEmpty=true
archiveSnippetsMatched=true
v264ArchiveRecordsFakeShellContract=true
v265ArchiveRecordsUpstreamEchoVerification=true
walkthroughsRecordImplementationAndVerification=true
activePlanPointsToV266ArchiveVerification=true
routeResponsesVerified=true
noArchiveVerificationFakeShellRerun=true
```

安全边界继续关闭：

```text
archiveVerificationRerunsFakeShellBehavior=false
executionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
storesManagedAuditCredential=false
credentialValueRead=false
rawEndpointUrlParsed=false
externalRequestSent=false
secretProviderInstantiated=false
resolverClientInstantiated=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

## 归档范围

验证的文件：

```text
c/264/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.html
c/264/图片/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.png
c/264/解释/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.md
代码讲解记录_生产雏形阶段/268-sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.md
c/265/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.html
c/265/图片/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.png
c/265/解释/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.md
代码讲解记录_生产雏形阶段/269-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.md
docs/plans/v263-post-disabled-resolver-echo-roadmap.md
```

验证的片段包括：

```text
v264 ready state
v264 fake shell no-real-resolver 边界
v264 safe HTTP smoke 和 Chrome screenshot
v265 ready state
v265 javaV109OptimizationContextReady=true
v265 safe HTTP smoke 和 Chrome screenshot
v266 计划项
不重新执行 fake resolver shell
不接入真实 secret provider / managed audit connection
```

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification.test.ts -> 1 file, 3 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification.test.ts -> 1 file, 3 tests passed
npm test -> 206 files, 694 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/266/图片/credential-resolver-fake-shell-archive-verification-v266.png
```

safe HTTP smoke 使用：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
AUDIT_STORE_KIND=memory
PORT=4366
```

smoke 结果：

```text
jsonState=credential-resolver-fake-shell-archive-verification-ready
checkCount=28
passedCheckCount=28
archiveFileCount=9
matchedSnippetCount=24
markdownStatus=200
```

## 计划收口

本版完成后，`docs/plans/v263-post-disabled-resolver-echo-roadmap.md` 收口，后续另起：

```text
docs/plans/v266-post-fake-shell-archive-roadmap.md
```

新计划下一步不是 Node 抢跑，而是推荐并行：

```text
Java v110 + mini-kv v117
```

两边只读消费 Node v266 归档，不做真实连接。

## 一句话总结

Node v266 把 credential resolver fake-shell 这一阶段的 Node 证据归档收口：v264 合同和 v265 三方 echo verification 都有 HTML、截图、解释、代码讲解和计划片段可复核，但真实 resolver、secret provider、credential value、raw endpoint 和 external request 仍然没有打开。
