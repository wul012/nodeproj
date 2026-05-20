# Node v274 运行调试说明：credential resolver disabled candidate upstream echo verification

## 本版目标

v274 消费三方证据：

```text
Node v273：disabled implementation candidate review
Java v113：disabled candidate echo receipt
mini-kv v120：disabled candidate non-participation receipt
```

它只做验证，不做真实 resolver 实现。

## 关键输出

```text
verificationState=credential-resolver-disabled-candidate-upstream-echo-verification-ready
candidateDecisionCount=10
candidateReadyDecisionCount=4
approvalRequiredDecisionCount=6
requestFieldCount=6
responseFieldCount=7
failureClassCount=6
javaEchoWorkflowTemplateApplied=true
```

## 三方对齐内容

```text
candidate counts 对齐
10 个 boundary code 对齐
4 个 disabled-candidate-ready boundary 对齐
6 个 approval-required boundary 对齐
handle-only interface shape 对齐
fake wiring review-only 对齐
credential / raw endpoint / resolver / connection / write / auto-start 边界全部关闭
```

## 安全边界

```text
realResolverImplementationAllowed=false
connectsManagedAudit=false
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
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification?format=markdown
```

## 调试结论

v274 证明 Node、Java、mini-kv 已经能围绕 disabled candidate 做稳定只读回显：Java 理解接口/审批边界，mini-kv 证明不参与 resolver/credential/storage，Node 聚合验证三方一致。

但它仍然不是生产连接版：真实 credential value、raw endpoint、secret provider、resolver client、managed audit connection、SQL、ledger、LOAD/COMPACT/RESTORE/SETNXEX 和自动启动全部保持关闭。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.test.ts -> 4 tests passed
npx vitest run v272/v273/v274 focused tests -> 3 files, 12 tests passed
npm test -> 214 files, 724 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, verificationState=credential-resolver-disabled-candidate-upstream-echo-verification-ready, ready=true, checkCount=25, passedCheckCount=25, javaReady=true, miniKvReady=true, blockerCount=0, markdownStatus=200
Chrome screenshot -> c/274/图片/credential-resolver-disabled-candidate-upstream-echo-verification-v274.png
```
