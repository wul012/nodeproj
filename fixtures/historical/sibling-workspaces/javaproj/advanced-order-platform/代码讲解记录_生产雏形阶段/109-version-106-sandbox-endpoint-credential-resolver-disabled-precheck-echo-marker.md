# Java v106 代码讲解：sandbox endpoint credential resolver disabled precheck echo marker

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v260-post-credential-resolver-decision-roadmap.md
```

计划要求 Java v106 承接 Node v262 的 disabled resolver precheck。这里的重点不是做真正的 resolver，而是继续把 release approval rehearsal 变成可被 Node 校验的只读证据链。

## 为什么现在做

Java v105 已经把 credential resolver decision record 固化为只读 marker。Node v262 在此基础上提出 disabled precheck：先看句柄、开关、失败分类和 dry-run 响应形状是否完整，再让下一版 Node 做 upstream echo verification。

因此 Java v106 做的是：

```text
回显 Node v262 disabled precheck
继承 Node v261 upstream echo verification source
证明 Java 仍没有打开 resolver 执行边界
给 Node v263 一个稳定字段继续消费
```

## 新增响应字段

新增字段：

```text
managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker
```

它包含：

```text
markerVersion
sourceCredentialResolverDecisionEchoMarkerVersion
sourceCredentialResolverDecisionEchoMarkerSchemaVersion
consumedByNodeSandboxEndpointCredentialResolverDisabledPrecheckVersion
consumedByNodeSandboxEndpointCredentialResolverDisabledPrecheckProfile
sourceNodeV261
disabledPrecheck
sideEffectBoundary
readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification
markerDigest
markerWarnings
nodeVerificationActions
```

## disabledPrecheck 里有什么

本版固定四组核心输入：

```text
6 required env handles
2 opt-in gates
7 failure classes
12 dry-run response fields
```

required env handles 不包含真实值，只包含 handle 名称和“当前 precheck 不需要 value”的边界。

opt-in gates 明确要求未来 resolver 必须显式打开：

```text
ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED
ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED
```

failure classes 先把失败路径分类清楚，例如 resolver disabled、approval marker 缺失、credential handle 缺失，以及任何试图读取 credential value、解析 raw endpoint、发送外部请求或执行 schema migration 的请求。

## side-effect boundary

这个 marker 最重要的是继续证明“不做真实动作”。v106 固定以下 false 边界：

```text
credentialResolverExecutionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
credentialValueRead=false
credentialValueLoaded=false
credentialValueStored=false
credentialValueIncluded=false
rawEndpointUrlParsed=false
rawEndpointUrlIncluded=false
externalRequestSent=false
secretProviderInstantiated=false
resolverClientInstantiated=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

`noLedgerWriteProved` 只依赖这些真实副作用边界，不把它和“是否已 ready for Node v263”混在一起。这样旧的只读证据仍能证明没有写 ledger，而 v263 readiness 继续作为更严格的链路对齐字段保留。

## 代码组织

新增两个文件：

```text
ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords.java
ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarkerBuilder.java
```

record 文件只放响应结构。builder 负责组装 source echo、disabled precheck、side-effect boundary、digest、warning 和 Node verification actions。

这版也顺手改善了 builder 内部可读性：没有继续扩散超长位置布尔参数，而是用 record 容器、`SourceGate` 和 `EchoReadiness` 把判断聚合起来。

## 接入点

接入文件：

```text
OpsEvidenceService
ReleaseApprovalRehearsalResponse
ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder
ReleaseApprovalRehearsalResponseBuilder
ReleaseApprovalVerificationHintBuilder
ReleaseApprovalVerificationWarningDigestBuilder
```

response schema 从：

```text
java-release-approval-rehearsal-response-schema.v27
```

升级到：

```text
java-release-approval-rehearsal-response-schema.v28
```

## 测试覆盖

新增/更新测试覆盖：

```text
OpsEvidenceServiceTests.releaseApprovalRehearsalAddsSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker
OpsOverviewIntegrationTests.releaseApprovalRehearsalExposesSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker
```

同时同步旧的 warning digest 精确顺序断言，确保 v106 新 warning input 和 boundary input 进入稳定 digest。

## 验证命令

已运行：

```text
mvn -q "-Dtest=OpsEvidenceServiceTests#buildsReadOnlyEvidenceForControlPlane,OpsOverviewIntegrationTests#releaseApprovalRehearsalReturnsReadOnlyLiveAggregation,OpsEvidenceServiceTests#releaseApprovalRehearsalAddsSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker,OpsOverviewIntegrationTests#releaseApprovalRehearsalExposesSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker" test
mvn -q test
```

全量测试通过。Docker 不可用导致 Testcontainers 报环境提示，但相关用例按项目配置跳过，Maven 退出码为 0。

## 一句话总结

Java v106 只读固化 Node v262 disabled credential resolver precheck，让 Node v263 可以继续校验，同时继续阻断 resolver、secret provider、credential value、raw endpoint、外部请求、managed-audit connection、SQL、ledger 和 auto-start。
