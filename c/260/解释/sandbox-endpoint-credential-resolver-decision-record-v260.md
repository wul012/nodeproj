# Node v260 运行调试说明：sandbox endpoint credential resolver decision record

本版依据 `docs/plans/v257-post-fake-transport-upstream-echo-roadmap.md` 推进，是该计划的最后一个执行版本。v260 消费 Node v259 的三方 upstream echo verification，生成 credential resolver 的人工决策记录。

## 本版目标

v260 只记录 credential resolver 进入下一阶段前必须人工确认的字段：

```text
endpoint handle
credential handle
resolver policy handle
approval marker
operator identity
approval correlation
redaction policy
fallback / rotation plan handle
```

它仍然不读取 credential value，不加载 secret provider，不解析 raw endpoint URL，不发真实 managed audit HTTP 请求，不执行 schema migration，不写 Java ledger，也不启动 Java / mini-kv。

## 新增入口

新增服务：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord.ts
```

新增类型和渲染：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordRenderer.ts
```

新增路由：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record?format=markdown
```

## 关键结果

Source Node v259：

```text
verificationState=sandbox-endpoint-handle-upstream-echo-verification-ready
sourceNodeV259Ready=true
endpointHandleAligned=true
credentialHandleAligned=true
rawEndpointBoundaryAligned=true
connectionBoundaryAligned=true
writeBoundaryAligned=true
autoStartBoundaryAligned=true
miniKvNonParticipationAligned=true
```

Decision record：

```text
decisionState=sandbox-endpoint-credential-resolver-decision-record-ready
recordMode=sandbox-endpoint-credential-resolver-decision-record-only
decisionStatus=human-review-required-before-credential-resolution
resolverMode=policy-record-only-no-value-read
resolverCandidateImplementation=not-implemented
requiredDecisionFieldCount=8
explicitNoGoConditionCount=9
```

安全边界：

```text
credentialValueRead=false
credentialValueLoaded=false
credentialValueIncluded=false
rawEndpointUrlParsed=false
externalRequestSent=false
connectsManagedAudit=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
```

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npm test -- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord.test.ts -> 1 file, 4 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/260/图片/sandbox-endpoint-credential-resolver-decision-record-v260.png
```

## 下一步

v260 完成后，`v257-post-fake-transport-upstream-echo-roadmap.md` 收口。下一阶段已另起：

```text
docs/plans/v260-post-credential-resolver-decision-roadmap.md
```

下一步不是 Node 抢跑真实 resolver，而是推荐并行：

```text
Java v105 + mini-kv v114
```

Java v105 只读回显 v260 credential resolver decision record；mini-kv v114 只读证明 credential resolver non-participation。两边完成后，Node 才能继续做 disabled resolver precheck。

## 一句话总结

Node v260 把 v259 的三方 endpoint handle 证据推进到 credential resolver 的人工决策记录：可以说明将来 resolver 要审哪些 handle 和 policy，但真实 credential、raw endpoint 和 managed audit connection 仍然全部关闭。
