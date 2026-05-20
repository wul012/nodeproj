# Java v113 代码讲解：sandbox endpoint credential resolver disabled implementation candidate echo receipt

本版目标是把 Node v273 的 `credential resolver disabled implementation candidate review` 接成 Java 侧只读 echo receipt。它表达的是“Java 已理解 disabled candidate 的接口边界和审批边界”，不是打开真实 resolver、credential、连接或生产审计。

## 本版所处项目进度

当前有效计划来自：
```text
D:\nodeproj\orderops-node\docs\plans\v272-post-plan-intake-echo-roadmap.md
```

计划要求 Java v113：
```text
read-only echo for Node v273 disabled implementation candidate review
不写 approval ledger
不执行 SQL
不打开 managed audit connection
不读取 credential value
不解析 raw endpoint
同时处理 Java echo 反向膨胀风险
```

Node v273 已经把 Node v272 的 plan-intake upstream echo verification 消费完毕，并给出 disabled interface candidate / fake wiring review 的候选边界。Java v113 做的是稳定回显和 no-side-effect proof，供 Node v274 继续三方验证。

## response 新字段

`ReleaseApprovalRehearsalResponse` 新增：
```java
RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt
        managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt
```

字段很长，但含义明确：
```text
managed audit sandbox endpoint credential resolver 相关证据
disabled implementation candidate review 的 Java echo receipt
供 Node v274 验证
```

当前整体 rehearsal schema 升级为：
```text
java-release-approval-rehearsal-response-schema.v33
```

receipt 内部引用的 v112 来源 schema 仍保持：
```text
java-release-approval-rehearsal-response-schema.v32
```

这样可以区分“当前响应版本”和“来源证据版本”。

## records / support / builder 拆分

新增 records 容器：
```text
ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords
```

它只负责响应结构：
```text
receipt
sourceNodeV273
sourceNodeV272
candidate
boundary decision
interface shape
fake wiring review
checks
summary
sideEffectBoundary
```

新增 support：
```text
ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport
```

它负责固定事实和闭合判断：
```text
Node v273 candidate version / mode / state
Node v272 source profile / state
10 boundary code
10 requirement code
4 candidate-ready boundary code
6 approval-required boundary code
candidateComplete
checksClosed
sideEffectBoundaryBlocked
```

新增 builder：
```text
ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceiptBuilder
```

它负责：
```text
从 v112 plan-intake echo receipt 组装 Node v272 来源引用
组装 Node v273 review source echo
生成 candidate digest / source digest / receipt digest
贡献 warningDigest input / line
贡献 proofClaims
贡献 nodeVerificationActions
证明 noCredentialConnectionWriteOrAutoStart
```

## echo workflow template

本版优化了：
```text
ReleaseApprovalEchoMarkerSupport
```

新增的通用能力包括：
```text
boundaryInputNames
BoundaryDigestInput
boundaryInput
boundaryLines
workflowStep
workflowReadiness
EchoWorkflowStep
EchoWorkflowReadiness
```

v113 builder 用 `workflowReadiness(...)` 统一表达：
```text
sourceNodeV273Echoed
sourceNodeV272UpstreamEchoed
disabledImplementationCandidateEchoed
candidateDecisionsEchoed
candidateReadyScopeEchoed
approvalRequiredScopeEchoed
handleOnlyInterfaceEchoed
fakeWiringReviewEchoed
noCredentialBoundaryEchoed
noRawEndpointBoundaryEchoed
noResolverRuntimeBoundaryEchoed
noConnectionBoundaryEchoed
noWriteBoundaryEchoed
noAutoStartBoundaryEchoed
```

这就是计划里要求的 echo factory / workflow template 抽象：后续 echo receipt 不需要继续复制一整套 ready step / warning / boundary line 样板。

## Node v273 被回显的事实

receipt 固定回显：
```text
profileVersion=managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1
reviewState=credential-resolver-disabled-implementation-candidate-review-ready
candidateMode=disabled-interface-and-fake-wiring-review-only
candidateDecisionCount=10
candidateReadyDecisionCount=4
approvalRequiredDecisionCount=6
checkCount=21
passedCheckCount=21
```

4 个 candidate-ready 边界：
```text
PLAN_DOCUMENT
DISABLED_SECRET_PROVIDER_STUB
REDACTION_POLICY
EXTERNAL_REQUEST_SIMULATION
```

6 个仍需审批的边界：
```text
CREDENTIAL_HANDLE
ENDPOINT_HANDLE
OPERATOR_APPROVAL
ROLLBACK_BOUNDARY
SCHEMA_MIGRATION_POLICY
AUDIT_LEDGER_WRITE_POLICY
```

## interface shape

请求字段只允许 handle / marker：
```text
credentialHandle
endpointHandle
resolverPolicyHandle
operatorIdentity
approvalCorrelationId
manualWindowMarker
```

响应字段只作为 disabled candidate 的形状声明：
```text
resolverState
resolvedCredentialValue
rawEndpointUrl
redactionApplied
externalRequestSent
failureClass
auditDigest
```

这里出现 `resolvedCredentialValue` 和 `rawEndpointUrl` 只是字段名；对应证明仍是：
```text
includesCredentialValue=false
includesRawEndpointUrl=false
credentialValueRead=false
rawEndpointUrlParsed=false
```

## verification hint 接入

`ReleaseApprovalVerificationHintBuilder` 纳入 v113 builder：
```text
verificationContributions
warningDigestInputs
proofClaims
nodeVerificationActions
noLedgerWriteProved
schemaFields
```

`ReleaseApprovalVerificationWarningDigestBuilder` 同步纳入 v113 的 warning lines 和 boundary lines。Node v274 可以从统一 verification hint 读取 candidate review state、decision counts、dangerous side-effect flags 和 digest。

## no-write 证明

v113 的 `noCredentialConnectionWriteOrAutoStartProved` 特意不要求上游完整 ready。默认请求缺少 header 时，receipt 可以产生 readiness warning，但 Java 仍然可以证明自己没有危险副作用。

它直接检查：
```text
candidateComplete
sideEffectBoundaryBlocked
noCredentialBoundaryEchoed
noRawEndpointBoundaryEchoed
noResolverRuntimeBoundaryEchoed
noConnectionBoundaryEchoed
noWriteBoundaryEchoed
noAutoStartBoundaryEchoed
```

也就是说：
```text
readiness 属于“能否交给 Node v274”
no-write proof 属于“Java 本次是否安全只读”
```

这两个概念分开，避免默认缺上下文请求把全局 `noLedgerWriteProved` 错误打成 false。

## 验证

本版补了：
```text
OpsEvidenceServiceTests
OpsOverviewIntegrationTests
```

覆盖：
```text
receipt version / schema v33
source v112 schema v32
Node v273 profile / endpoint / ready state
Node v272 source verification reference
10 boundary code / 10 requirement code
4 candidate-ready / 6 approval-required 分流
interface request/response/failure class
fake wiring review only
side-effect boundary 全部危险动作=false
echoWorkflowTemplateApplied=true
verification hint schemaFields / warningDigestInputs / proofClaims / nodeVerificationActions
HTTP JSON 字段可见
重复请求 digest 稳定
```

运行过：
```text
mvn -q -DskipTests compile
mvn -q -Dtest=OpsEvidenceServiceTests#releaseApprovalRehearsalAddsSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt test
mvn -q -Dtest=OpsOverviewIntegrationTests#releaseApprovalRehearsalExposesSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt test
mvn -q "-Dtest=OpsEvidenceServiceTests,OpsOverviewIntegrationTests" test
```

## 一句话总结

Java v113 用拆分后的 records / support / builder 和新 echo workflow template 承接 Node v273 disabled implementation candidate review，让 Node v274 能验证 disabled resolver candidate，同时 Java 仍然没有读取 credential value、解析 raw endpoint、实例化真实 resolver、打开 managed-audit connection、执行 SQL、写 ledger、做 schema migration 或自动启动上游。
