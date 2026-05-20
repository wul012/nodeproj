# Node v275 运行调试说明：credential resolver approval-required boundary upstream echo verification

## 本版目标

v275 消费三方证据：

```text
Node v274：disabled candidate upstream echo verification
Java v115：approval-required boundary echo refinement
mini-kv v121：approval-required boundary non-participation receipt
```

它只做只读验证，不实现真实 credential resolver。

## 关键输出

```text
verificationState=credential-resolver-approval-required-boundary-upstream-echo-verification-ready
checkCount=26
passedCheckCount=26
approvalRequiredBoundaryCount=6
evidenceFileCount=11
productionBlockerCount=0
warningCount=2
recommendationCount=2
```

## 三方对齐内容

```text
Node v274：提供 10 个 boundary 中 6 个 approval-required 的基准
Java v115：回显 6 个 approval-required boundary 的解释与 requirement code
mini-kv v121：证明 6 个 approval-required boundary 下继续不参与 resolver / credential / raw endpoint / storage

对齐项：
- 6 个 approval-required boundary code
- 6 个 requirement code
- approval-required explanation / non-participation detail
- prohibited runtime actions
- credential / raw endpoint / resolver / connection / write / auto-start 边界
```

## 安全边界

```text
readyForManagedAuditSandboxAdapterConnection=false
realResolverImplementationAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
storesManagedAuditCredential=false
credentialValueRead=false
rawEndpointUrlParsed=false
externalRequestSent=false
secretProviderInstantiated=false
resolverClientInstantiated=false
schemaMigrationExecuted=false
approvalLedgerWritten=false
automaticUpstreamStart=false
```

## 运行调试入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification?format=markdown
```

## 文档目录调整

从本版开始，新的运行截图和解释写入：

```text
d/<版本>/图片
d/<版本>/解释
```

新的代码讲解写入：

```text
代码讲解记录_生产雏形阶段2/
```

新的计划续写优先写入：

```text
docs/plans2/
```

旧 `c/`、`代码讲解记录_生产雏形阶段/`、`docs/plans/` 保留为历史目录。

## 调试结论

v275 证明 Node、Java、mini-kv 对 6 个 approval-required boundary 的解释已经对齐：Java 给出只读业务解释，mini-kv 给出非参与证明，Node 统一验证 counts、requirement codes、prohibited runtime actions 和 no-side-effect 边界。

但这仍然不是生产连接版：真实 credential value、raw endpoint、secret provider、resolver client、managed audit connection、SQL、ledger、LOAD/COMPACT/RESTORE/SETNXEX 和自动启动全部保持关闭。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.test.ts -> 2 files, 8 tests passed
npm test -> 215 files, 728 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, verificationState=credential-resolver-approval-required-boundary-upstream-echo-verification-ready, ready=true, checkCount=26, passedCheckCount=26, javaReady=true, miniKvReady=true, blockerCount=0, markdownStatus=200
Chrome screenshot -> d/275/图片/credential-resolver-approval-required-boundary-upstream-echo-verification-v275.png
```
