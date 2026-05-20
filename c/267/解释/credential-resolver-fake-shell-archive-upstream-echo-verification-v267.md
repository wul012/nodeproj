# Node v267 运行调试说明：credential resolver fake-shell archive upstream echo verification

本版依据 `docs/plans/v266-post-fake-shell-archive-roadmap.md` 推进。Node v266 已完成 fake-shell archive verification，Java v110 和 mini-kv v117 已分别给出只读 echo / non-participation receipt。v267 的任务是把三方归档证据重新对齐，确认大家对 archive file count、snippet count、no-rerun 和安全边界理解一致。

## 本版目标

v267 消费：

```text
Node v266 credential resolver fake-shell archive verification
Java v110 credential resolver fake-shell archive echo receipt
mini-kv v117 credential resolver fake-shell archive non-participation receipt
```

它只做 upstream echo verification，不重新执行 fake resolver shell，不实现真实 resolver client / secret provider，不读取 credential value，不解析 raw endpoint URL，不发 external request，不启动 Java 或 mini-kv。

## 新增入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification?format=markdown
```

新增模块：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationRenderer.ts
```

## 关键结果

```text
verificationState=credential-resolver-fake-shell-archive-upstream-echo-verification-ready
sourceNodeV266Ready=true
javaV110EchoReady=true
miniKvV117NonParticipationReady=true
archiveCountsAligned=true
archiveSnippetsAligned=true
archiveNoRerunAligned=true
credentialBoundaryAligned=true
rawEndpointBoundaryAligned=true
resolverBoundaryAligned=true
connectionBoundaryAligned=true
writeBoundaryAligned=true
autoStartBoundaryAligned=true
```

安全边界继续关闭：

```text
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

## Historical Fallback

本版补齐了 GitHub runner 需要的 sibling workspace historical fallback：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/110/解释/说明.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/113-version-110-sandbox-endpoint-credential-resolver-fake-shell-archive-echo-receipt.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceiptBuilder.java
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.java
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-fake-shell-archive-non-participation-receipt.json
fixtures/historical/sibling-workspaces/mini-kv/c/117/解释/说明.md
fixtures/historical/sibling-workspaces/mini-kv/代码讲解记录_生产雏形阶段/173-version-117-credential-resolver-fake-shell-archive-non-participation-receipt.md
```

这让 CI 在没有 `D:/javaproj` 和 `D:/C/mini-kv` 的环境里，也能验证 Java v110 / mini-kv v117 的 committed evidence。

## 验证

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification.test.ts -> 1 file, 4 tests passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification.test.ts -> 2 files, 7 tests passed
npm test -> 207 files, 698 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/267/图片/credential-resolver-fake-shell-archive-upstream-echo-verification-v267.png
```

safe HTTP smoke 使用：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
AUDIT_STORE_KIND=memory
PORT=4367
```

smoke 结果：

```text
jsonState=credential-resolver-fake-shell-archive-upstream-echo-verification-ready
checkCount=18
passedCheckCount=18
evidenceFileCount=7
archiveFileCount=9
matchedSnippetCount=32
markdownStatus=200
```

## 下一步

计划下一步是：

```text
Node v268：credential resolver production readiness decision gate
```

v268 仍是决策门禁，默认应保持 blocked；不能直接跳到真实 resolver client、secret provider、raw endpoint 或 external request。

## 一句话总结

Node v267 把 Node v266、Java v110、mini-kv v117 的 fake-shell archive 证据链做成三方 upstream echo verification：归档数量、片段数量、no-rerun 边界和所有危险动作阻断都对齐，但真实 credential resolver 与 managed audit connection 仍未打开。
