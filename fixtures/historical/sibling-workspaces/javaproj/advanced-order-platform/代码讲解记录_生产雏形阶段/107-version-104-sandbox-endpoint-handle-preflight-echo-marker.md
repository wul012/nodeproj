# 第一百零四版代码讲解：sandbox endpoint handle preflight echo marker

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v257-post-fake-transport-upstream-echo-roadmap.md
```

计划里 Node v258 已经完成 `sandbox endpoint handle preflight review`。这一版 Java 不实现真实 adapter，也不接入 credential resolver，而是补一份只读 echo marker，让 Java 明确回显 Node v258 的预检结果和安全边界，供后续 Node v259 做三项目一致性验证。

## 为什么现在做这件事

前一版 Java v103 已经能回显 fake transport dry-run packet 的 request、response、timeout、cleanup 和 side-effect 边界。Node v258 在这个基础上进一步检查了真实 sandbox endpoint 进入前需要人工确认的 handle-only 内容：

```text
endpoint handle
credential handle
owner approval artifact
network allowlist review
TLS policy review
redaction policy
operator window
```

这些内容适合被 Java 只读记录为证据，但还不适合升级成真实连接。v104 的价值就是把“可以进入下一轮 echo verification”的形状固定下来，同时继续证明 Java 没有读取秘密、没有解析 endpoint、没有发请求、没有写库。

## 新增 response 字段

新增字段：

```text
managedAuditSandboxEndpointHandlePreflightEchoMarker
```

它记录当前 marker 版本：

```text
java-release-approval-rehearsal-managed-audit-sandbox-endpoint-handle-preflight-echo-marker.v1
```

也记录 source schema：

```text
java-release-approval-rehearsal-response-schema.v25
```

这里的 v25 是上一版 `managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker` 的 response schema。当前完整 response schema 升到：

```text
java-release-approval-rehearsal-response-schema.v26
```

## 独立 Builder

新增文件：

```text
src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointHandlePreflightEchoMarkerBuilder.java
```

它负责：

```text
构建 marker 主体
构建 Node v257 source echo
构建 Node v258 preflight review shape
构建 network allowlist / TLS / redaction / operator window review
构建 side-effect boundary
生成 markerDigest
提供 warningDigestInputs / proofClaims / nodeVerificationActions
参与 noLedgerWriteProved
```

这样 `OpsEvidenceService` 没有继续膨胀；它只新增版本常量和 Node profile 常量。

## Node v258 对齐项

marker 回显 Node v258：

```text
version=Node v258
profile=managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1
endpoint=/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review
markdownEndpoint=/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review?format=markdown
state=sandbox-endpoint-handle-preflight-review-ready
```

同时回显它来自 Node v257：

```text
profile=managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification.v1
state=fake-transport-packet-upstream-echo-verification-ready
evidenceFileCount=6
matchedSnippetCount=33
```

下一跳声明为：

```text
Node v259 sandbox endpoint handle upstream echo verification
```

## 安全边界

本版最关键的是这些字段保持 false：

```text
rawEndpointUrlParsed=false
rawEndpointUrlIncluded=false
credentialValueRead=false
externalRequestSent=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
connectsManagedAudit=false
readsManagedAuditCredential=false
storesManagedAuditCredential=false
executionAllowed=false
approvalLedgerWritten=false
javaStarted=false
miniKvStarted=false
externalAuditServiceStarted=false
productionAuditAllowed=false
productionWindowAllowed=false
```

这意味着 Java v104 只是证据回显，不是连接实现，不是生产审计授权，也不是启动脚本。

## Verification Hint 接入

`ReleaseApprovalVerificationHintBuilder` 新增了 v104 marker 的：

```text
schemaFields
warningDigestInputs
proofClaims
nodeVerificationActions
noLedgerWriteProved 判断
```

关键 Node 检查动作包括：

```text
Compare managedAuditSandboxEndpointHandlePreflightEchoMarker.consumedByNodeSandboxEndpointHandlePreflightReviewProfile with Node v258
Require managedAuditSandboxEndpointHandlePreflightEchoMarker.readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification=true before Node v259
Verify managedAuditSandboxEndpointHandlePreflightEchoMarker.preflightReview.endpointHandleOnly=true
Verify managedAuditSandboxEndpointHandlePreflightEchoMarker.preflightReview.credentialHandleOnly=true
Keep managedAuditSandboxEndpointHandlePreflightEchoMarker.sideEffectBoundary.externalRequestSent=false
```

## 测试覆盖

新增两条测试：

```text
OpsEvidenceServiceTests#releaseApprovalRehearsalExposesSandboxEndpointHandlePreflightEchoMarker
OpsOverviewIntegrationTests#releaseApprovalRehearsalExposesSandboxEndpointHandlePreflightEchoMarker
```

服务层测试覆盖 record 字段、digest、review counts、source Node v257 状态、Node v258 profile、Node v259 readiness、verification hint 接入和 digest 稳定性。

HTTP 集成测试覆盖 JSON 字段名、handle-only review、network/TLS/redaction/operator-window 边界，以及 no raw endpoint / no credential / no external request / no schema migration。

## 本版推进到哪里

v104 把 Java 从 fake transport packet echo 推进到 sandbox endpoint handle preflight echo，但仍然停在人工预检和证据对齐阶段。

还没有做：

```text
credential resolver
raw endpoint URL parser
真实 managed audit HTTP request
schema migration rehearsal execution
approval ledger write
mini-kv managed audit backend
```

这正好满足计划要求：Java v104 和 mini-kv v113 完成后，Node v259 才能继续做 upstream echo verification。

## 一句话总结

Java v104 增加 `managedAuditSandboxEndpointHandlePreflightEchoMarker`，只读回显 Node v258 的 sandbox endpoint handle preflight review，并继续证明 Java 没有读取 credential、没有解析 raw endpoint、没有连接真实 managed audit、没有执行 SQL、没有写 ledger、没有启动 Java/mini-kv。
