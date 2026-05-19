# Java v105 说明：sandbox endpoint credential resolver decision echo marker

## 计划依据

最新计划：
```text
D:\nodeproj\orderops-node\docs\plans\v260-post-credential-resolver-decision-roadmap.md
```

## 这版做什么

Java v105 不实现 credential resolver，只做只读 decision echo marker。它回显：

```text
Node v260 decision record
Node v259 upstream echo verification
endpoint handle / credential handle / resolver policy handle / approval marker
8 个 required decision fields
9 个 explicit no-go conditions
read-only side-effect boundary
```

## 为什么现在做

Node v260 已经把 resolver 约束成决策记录。Java 这一版把决策边界固定下来，告诉后续链路：

```text
可以继续做只读校验
不能开始真正的 resolver 执行
不能读取 credential value
不能解析 raw endpoint URL
不能打开 managed-audit connection
不能发外部请求
不能写 ledger
不能启动 Java / mini-kv
```

## 代码改动

新增 builder：
```text
src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDecisionEchoMarkerBuilder.java
```

接入位置：
```text
OpsEvidenceService
ReleaseApprovalRehearsalResponse
ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder
ReleaseApprovalRehearsalResponseBuilder
ReleaseApprovalVerificationHintBuilder
ReleaseApprovalVerificationWarningDigestBuilder
```

## schema

```text
source schema: java-release-approval-rehearsal-response-schema.v26
response schema: java-release-approval-rehearsal-response-schema.v27
```

## 保持不做

```text
resolver 执行
credential value 读取/加载/存储
raw endpoint URL 解析
managed audit connection
外部请求
schema migration
approval ledger 写入
自动启动 Java 或 mini-kv
```
