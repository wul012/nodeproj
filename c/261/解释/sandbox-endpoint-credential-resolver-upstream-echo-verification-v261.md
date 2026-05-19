# Node v261 运行调试说明：sandbox endpoint credential resolver upstream echo verification

本版依据 `docs/plans/v260-post-credential-resolver-decision-roadmap.md` 推进。Java v105 和 mini-kv v114 已完成后，Node v261 才继续，目标是只读验证三方 credential resolver 决策回显是否一致。

## 本版目标

v261 消费：

```text
Node v260 credential resolver decision record
Java v105 credential resolver decision echo marker
mini-kv v114 credential resolver non-participation receipt
```

它验证 resolver policy handle、approval marker、operator identity、approval correlation、redaction / fallback、8 个 decision fields、9 个 no-go conditions，以及 credential / raw endpoint / connection / write / auto-start 边界。它仍然不实现 resolver，不读取 credential value，不解析 raw endpoint URL，不发真实请求，不打开 managed audit connection。

## 新增入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification?format=markdown
```

新增模块：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationRenderer.ts
```

## 关键结果

```text
verificationState=sandbox-endpoint-credential-resolver-upstream-echo-verification-ready
sourceNodeV260Ready=true
javaV105EchoReady=true
miniKvV114NonParticipationReady=true
decisionRecordAligned=true
requiredDecisionFieldsAligned=true
explicitNoGoConditionsAligned=true
resolverPolicyAligned=true
approvalMarkerAligned=true
credentialBoundaryAligned=true
rawEndpointBoundaryAligned=true
connectionBoundaryAligned=true
writeBoundaryAligned=true
autoStartBoundaryAligned=true
```

安全边界继续关闭：

```text
credentialResolverExecutionAllowed=false
credentialValueRead=false
credentialValueLoaded=false
credentialValueStored=false
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

## CI fallback 修复

本版把 Java v105 和 mini-kv v114 证据复制到：

```text
fixtures/historical/sibling-workspaces/
```

并修复 `historicalEvidenceResolver` 的 UTF-8 BOM 文本读取，避免 mini-kv 生成的带 BOM JSON 在 GitHub runner 或本机 fallback 中触发 `JSON.parse` 异常。

## 验证

聚焦验证：

```text
npm run typecheck -> passed
npm test -- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification.test.ts -> 1 file, 4 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/261/图片/sandbox-endpoint-credential-resolver-upstream-echo-verification-v261.png
```

## 下一步

下一步仍按当前计划推进：

```text
Node v262: disabled credential resolver precheck
```

v262 只能定义 disabled / dry-run / no secret provider instantiated 的 precheck，不实现真实 secret provider adapter，不解析 raw endpoint URL，不发 external request。

## 一句话总结

Node v261 把 Node v260、Java v105、mini-kv v114 的 credential resolver 只读证据对齐成三方 verification gate；它证明“可以进入 disabled precheck 设计”，但仍然不能读取凭据、打开连接或写任何上游状态。
