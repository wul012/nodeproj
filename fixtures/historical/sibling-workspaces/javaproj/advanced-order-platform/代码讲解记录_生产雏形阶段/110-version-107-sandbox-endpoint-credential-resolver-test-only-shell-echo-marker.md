# Java v107 代码讲解：sandbox endpoint credential resolver test-only shell echo marker

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v263-post-disabled-resolver-echo-roadmap.md
```

当前链路已经走到：

```text
Node v262 disabled credential resolver precheck
 -> Java v106 disabled precheck echo marker
 -> mini-kv v115 disabled precheck non-participation receipt
 -> Node v263 disabled precheck upstream echo verification
 -> Node v264 credential resolver test-only shell contract
```

Java v107 的职责是消费 Node v264，生成只读 echo marker。它不是 resolver 实现，也不会替 Node 或 mini-kv 打开任何真实连接。

## 为什么现在做

Node v264 把下一步控制在 test-only fake shell：request 只允许 credential handle、endpoint handle、resolver policy handle、approval marker 和 approval correlation；response 只允许 fake resolver response；failure mapping 会阻断 credential value、raw endpoint、external request 和 schema migration。

所以 Java v107 做的是：

```text
回显 Node v264 fake-only shell contract
继承 Java v106 disabled precheck echo marker
证明 Java 仍没有 secret provider / resolver client / external request
给 Node v265 upstream echo verification 一个稳定字段
```

## 新增响应字段

新增字段：

```text
managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker
```

它包含：

```text
markerVersion
sourceCredentialResolverDisabledPrecheckEchoMarkerVersion
sourceCredentialResolverDisabledPrecheckEchoMarkerSchemaVersion
consumedByNodeSandboxEndpointCredentialResolverTestOnlyShellContractVersion
consumedByNodeSandboxEndpointCredentialResolverTestOnlyShellContractProfile
consumedByNodeSandboxEndpointCredentialResolverTestOnlyShellContractEndpoint
sourceNodeV263
resolverShellContract
sideEffectBoundary
readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification
markerDigest
markerWarnings
nodeVerificationActions
```

response schema 从 v28 升级到 v29：

```text
java-release-approval-rehearsal-response-schema.v29
```

## resolverShellContract 里有什么

本版固定五组 Node v264 contract：

```text
9 request shape fields
13 response shape fields
7 failure mappings
10 guard conditions
1 fake resolver probe
```

request shape 只接受 handle 和 marker：

```text
credentialHandleOnly=true
credentialValueAccepted=false
endpointHandleOnly=true
rawEndpointUrlAccepted=false
resolverPolicyHandleRequired=true
approvalMarkerRequired=true
payloadMayContainSecrets=false
```

response shape 只声明 fake-only result：

```text
fakeResolverResponseOnly=true
resolverClientInstantiated=false
secretProviderInstantiated=false
credentialValueRead=false
credentialValueLoaded=false
rawEndpointUrlParsed=false
externalRequestSent=false
connectsManagedAudit=false
schemaMigrationExecuted=false
productionRecordWritten=false
```

failure mapping 继续覆盖 Node v264 的 7 类失败。`RESOLVER_DISABLED` 可以返回 fake failure；credential value、raw endpoint、external request、schema migration 等危险诉求都会映射为 `pause-and-do-not-resolve`。

## fake resolver probe

probe 只是一条内存证据：

```text
requestId=managed-audit-v264-test-only-resolver-shell-probe
resolverKind=fake-in-memory
acceptedByFakeResolver=true
responseStatus=fake-resolver-accepted
responseCode=TEST_ONLY_FAKE_RESOLVER
```

它的危险动作全部为 false：

```text
resolverClientInstantiated=false
secretProviderInstantiated=false
credentialValueRead=false
credentialValueLoaded=false
rawEndpointUrlParsed=false
externalRequestSent=false
connectsManagedAudit=false
schemaMigrationExecuted=false
productionRecordWritten=false
```

## side-effect boundary

这个 marker 的关键不是“能 resolve”，而是“即使出现 fake shell，也不能误开真实动作”。v107 固定：

```text
testOnlyShell=true
fakeResolverOnly=true
credentialHandleOnly=true
endpointHandleOnly=true
credentialValueAccepted=false
rawEndpointUrlAccepted=false
resolverClientInstantiated=false
secretProviderInstantiated=false
externalRequestSent=false
connectsManagedAudit=false
schemaMigrationExecuted=false
productionRecordWritten=false
automaticUpstreamStart=false
```

`noLedgerWriteProved` 继续只依赖真实副作用边界，不把它和 “ready for Node v265” 混在一起。这样旧的只读证据仍能证明没有写 ledger，而 v265 readiness 作为更严格的三方对齐信号保留。

## 代码组织

新增三个文件：

```text
ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords.java
ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder.java
ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarkerBuilder.java
```

records 文件只放响应形状；contract builder 负责组装 request / response / failure mapping / guard / fake probe；marker builder 负责组装 source echo、side-effect boundary、digest、warning 和 Node verification actions。

这版没有把新字段塞回 `OpsEvidenceService` 主体。接入仍走 receipt chain builder 和 response builder；warning digest 也通过专门的 digest builder 扩展输入名和边界行。

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

`ReleaseApprovalVerificationHintBuilder` 新增了 v107 proof claims、Node verification actions、warning digest input 和 boundary input。这样 Node 后续消费 response 时，不需要猜字段是否进入 no-ledger-write proof。

## 测试覆盖

新增/更新测试：

```text
OpsEvidenceServiceTests.releaseApprovalRehearsalAddsSandboxEndpointCredentialResolverTestOnlyShellEchoMarker
OpsOverviewIntegrationTests.releaseApprovalRehearsalExposesSandboxEndpointCredentialResolverTestOnlyShellEchoMarker
```

同时更新：

```text
OpsEvidenceServiceTests.buildsReadOnlyEvidenceForControlPlane
OpsOverviewIntegrationTests.releaseApprovalRehearsalReturnsReadOnlyLiveAggregation
```

覆盖 response schema v29、warning digest 精确顺序、新 marker JSON 暴露，以及 v106 disabled precheck 到 v107 test-only shell 的 source 链路。

## 验证命令

已运行：

```text
mvn -q -DskipTests compile
mvn -q "-Dtest=OpsEvidenceServiceTests#buildsReadOnlyEvidenceForControlPlane,OpsOverviewIntegrationTests#releaseApprovalRehearsalReturnsReadOnlyLiveAggregation,OpsEvidenceServiceTests#releaseApprovalRehearsalAddsSandboxEndpointCredentialResolverTestOnlyShellEchoMarker,OpsOverviewIntegrationTests#releaseApprovalRehearsalExposesSandboxEndpointCredentialResolverTestOnlyShellEchoMarker,OpsEvidenceServiceTests#releaseApprovalRehearsalAddsSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker,OpsOverviewIntegrationTests#releaseApprovalRehearsalExposesSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker" test
mvn -q test
```

全量测试通过。Docker 不可用时 Testcontainers 输出环境提示，但本轮 Maven 退出码为 0，没有出现必须启动 Docker 才能完成的失败。

## 本版总结

Java v107 把 Node v264 的 credential resolver test-only shell contract 固化为只读 echo marker：Java 可以证明 fake-only request / response / failure mapping / guard / probe 一致，但仍不实现 resolver、不读取凭证、不解析 raw endpoint、不发外部请求、不连接 managed audit、不写 SQL 或 ledger，也不自动启动上游。
