# Java v110 代码讲解：sandbox endpoint credential resolver fake-shell archive echo receipt

本版目标是把 Node v266 的 credential resolver fake-shell archive verification 接成 Java 侧只读回显收据。它不是 resolver 实现，也不是连接准备完成信号，而是一份给 Node v267 继续校验用的 echo receipt。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v266-post-fake-shell-archive-roadmap.md
```

计划明确要求 Java v110：

```text
credential resolver fake-shell archive echo receipt
只读引用 Node v266
证明 Java 侧仍不写 ledger、不执行 SQL、不读取 credential value、不打开 managed audit connection
```

这说明当前主线仍处在 archive evidence / readiness gate 阶段，尚未进入真实 credential resolver 或 managed-audit adapter connection。

## response 新字段

`ReleaseApprovalRehearsalResponse` 新增：

```java
RehearsalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt
        managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt
```

字段名保持长而显式，因为它要告诉 Node 三件事：

```text
这是 managed-audit sandbox endpoint credential resolver 相关证据
这是 fake-shell archive echo，不是真实 resolver 执行
这是 receipt，可以进入 warning digest / proof claim / node verification action
```

## records

新增容器：

```text
ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
```

它集中放置本版响应类型：

```text
RehearsalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt
RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSourceEcho
RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidence
RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidenceFile
RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSnippet
RehearsalSandboxEndpointCredentialResolverFakeShellArchiveVerification
RehearsalSandboxEndpointCredentialResolverFakeShellArchiveChecks
RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSideEffectBoundary
```

这样顶层 response 不再重新膨胀回 nested record 大文件。

## builder 和 support 分工

新增 builder：

```text
ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceiptBuilder
```

它负责：

```text
从 Java v107 test-only shell marker 判断来源是否可接受
组装 v110 receipt
生成 receiptDigest
贡献 warningDigest input / line
贡献 proofClaims
贡献 nodeVerificationActions
证明 noCredentialConnectionWriteOrAutoStart
```

新增 support：

```text
ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport
```

它负责：

```text
archive roots / source versions
9 个 archive file id
24 个 required snippet id
sourceNodeV266 echo
archiveEvidence
archiveVerification
archiveChecks
sideEffectBoundary
readiness / read-only boundary 判断
```

这个拆分是本版质量点。初始 builder 曾经超过 800 行，拆出 support 后回到 450 行；证据清单和边界判断不再挤在回执组装逻辑里。

## 回显的 Node v266 证据

receipt 固定回显：

```text
checkCount=28
passedCheckCount=28
archiveFileCount=9
requiredSnippetCount=24
matchedSnippetCount=24
productionBlockerCount=0
warningCount=1
recommendationCount=2
```

证据跨度：

```text
Node v264 credential resolver fake shell contract + Node v265 upstream echo archive
```

active plan 指向：

```text
docs/plans/v266-post-fake-shell-archive-roadmap.md
```

## verification hint 接入

`ReleaseApprovalVerificationHintBuilder` 把 v110 builder 纳入：

```text
verificationContributions
schemaFields
warningDigestInputs
proofClaims
nodeVerificationActions
noLedgerWriteProved
```

因此 Node 不需要只看单个 receipt 字段，也可以从统一 verification hint 里看到 v110 的 digest 输入、证明声明和下一步动作。

## side-effect boundary

本版最关键的边界仍是全 false：

```text
credentialValueRead=false
rawEndpointUrlParsed=false
externalRequestSent=false
secretProviderInstantiated=false
resolverClientInstantiated=false
connectsManagedAudit=false
approvalLedgerWritten=false
sqlExecuted=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

所以 Java v110 只是“我读懂了 Node v266 的归档证据，并且我这边仍没越界”的证明，不是生产连接许可。

## 验证

本版补了两层测试：

```text
OpsEvidenceServiceTests
OpsOverviewIntegrationTests
```

覆盖点包括：

```text
receipt version / schema version
Node v266 profile / endpoint / state
Node v264/v265 来源版本
Node v267 下一跳版本
9 file / 24 snippet / 28 check
archive verification read-only
side-effect boundary false
verification hint schemaFields / warningDigestInputs / proofClaims / nodeVerificationActions
重复请求 digest 稳定
HTTP JSON 字段可见
```

已通过：

```text
mvn -q test
mvn -q -DskipTests package
git diff --check
```

## 一句话总结

Java v110 用一份拆分后的只读 echo receipt 承接 Node v266 归档验证，让 Node v267 可以继续做三方 upstream echo verification，同时 Java 仍然没有触碰 credential value、真实 resolver、managed audit connection、SQL、ledger 或 auto-start。
