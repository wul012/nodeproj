# 138-version-136-runtime-shell-post-decision-plan-intake-echo

## 本版目标

Java v136 对齐 Node v301 `post-decision continuation plan intake`，只做只读 echo：

- 消费 Java v135 的 runtime shell decision record echo receipt。
- 回显 Node v301 的 selected continuation decision、四个 continuation options、必要性证明和停止条件。
- 为 Node v302 暴露可校验字段，同时继续证明 Java 没有实现 runtime shell、没有读取 credential、没有解析原始 endpoint、没有访问外部 managed audit、没有写 ledger/SQL/schema、没有自动启动上游。

## 主要新增

- `ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoRecords`
  - 拆出 v136 receipt、source echo、plan intake、continuation option、necessity proof、checks、side-effect boundary 等 record。
  - 避免继续把长 record 堆进 `OpsEvidenceService`。
- `ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoSupport`
  - 构造 v136 receipt。
  - 集中维护 warning digest 输入、proof claims、Node verification actions、ready steps 和 side-effect 证明。
- `ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceiptBuilder`
  - 给 receipt chain / verification hint / warning digest 提供薄 builder 入口。

## 集成点

- `OpsEvidenceService`
  - response schema 升级到 `java-release-approval-rehearsal-response-schema.v41`。
  - 新增 Java v136 receipt 版本/schema 常量。
  - 新增 Node v301 profile、endpoint、markdown endpoint、state 常量。
- `ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder`
  - 在 v135 decision record echo 后构建 v136 plan intake echo。
- `ReleaseApprovalRehearsalResponse`
  - 新增 `managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt` 字段。
- `ReleaseApprovalVerificationHintBuilder`
  - 把 v136 receipt 纳入 contribution、proof claims、node verification actions 和 no-ledger proof。
- `ReleaseApprovalVerificationWarningDigestBuilder`
  - 把 v136 warning/boundary lines 纳入 warning digest。
- `ReleaseApprovalVerificationHintCatalog`
  - schemaFields 增加 v136 receipt 字段。

## 关键边界

本版仍是 echo-only/read-only：

- `runtimeShellImplementationAllowed=false`
- `runtimeShellInvocationAllowed=false`
- `credentialValueReadAllowed=false`
- `rawEndpointUrlParseAllowed=false`
- `providerClientInstantiationAllowed=false`
- `externalRequestAllowed=false`
- `approvalLedgerWriteAllowed=false`
- `schemaMigrationAllowed=false`
- `automaticUpstreamStartAllowed=false`

v136 只证明 Node v301 的 plan intake 可以交给 Node v302 做三方一致性验证；它不授权任何 runtime shell 实现或调用。

## 测试覆盖

- 新增 `OpsEvidenceServiceCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoTests`
  - 验证 v136 receipt 版本、来源 v135 digest/schema、Node v301 profile、Node v302 下一步、continuation options、necessity proof、checks、side-effect boundary、ready steps、warning/proof/action 集成和 digest 稳定性。
- 更新 `OpsEvidenceServiceReleaseApprovalRehearsalVerificationHintOverviewTests`
  - 确认 schemaFields、warningDigestInputs、proofClaims、nodeVerificationActions 可看到 v136 receipt。
- 更新既有 schema 断言到 v41。

## 维护性说明

本版没有把 600+ 行 echo support 继续塞进 `OpsEvidenceService`，而是保持 strangler 模式：主服务只挂常量与 response 链接，具体 receipt 结构、构造和 digest 逻辑留在 v136 专属文件中。新增 support 约 613 行，records 约 196 行，builder 约 58 行；后续如果 runtime-shell post-decision 类 echo 继续增加，建议再抽 catalog/template，避免 echo support 家族复制扩张。
