# Node v283 运行说明：credential resolver implementation plan draft

## 本版目标

本版回到主流程：在 Node v282 已完成 Java v116 + mini-kv v122 的 approval-required implementation readiness echo verification 之后，生成 Node v283 的 credential resolver implementation plan draft。

注意：这版仍然只是计划草案，不实现真实 resolver，不实例化 secret provider，不解析 raw endpoint URL，不读取 credential value，不发送 HTTP/TCP，不启动 Java / mini-kv。

## 新增入口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft?format=markdown
```

## 核心输出

`implementationPlan` 包含 7 个接口边界：

```text
CONFIG_HANDLE_CONTRACT
CREDENTIAL_HANDLE_CONTRACT
ENDPOINT_HANDLE_CONTRACT
APPROVAL_ARTIFACT_CONTRACT
FAILURE_TAXONOMY_CONTRACT
ROLLBACK_GUARD_CONTRACT
TEST_ONLY_FAKE_HARNESS_CONTRACT
```

`implementationPlanReview` 指定下一步：

```text
推荐并行：Java v121 + mini-kv v126
Node v284：只消费两边 echo 做 verification
Node v285：再考虑 disabled test-only fake harness precheck
```

## 验证

已执行：

```bash
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft.test.ts
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft.test.ts test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification.test.ts
npm run build
```

HTTP smoke 使用安全环境变量完成，结果要点：

```json
{
  "jsonStatus": "credential-resolver-implementation-plan-draft-ready",
  "ready": true,
  "checkCount": 28,
  "passedCheckCount": 28,
  "javaNext": "Java v121 resolver implementation plan echo",
  "miniKvNext": "mini-kv v126 resolver implementation plan non-participation receipt",
  "markdownStatus": 200,
  "markdownContainsTitle": true
}
```

本机 Chrome 截图：

```text
d/283/图片/credential-resolver-implementation-plan-draft-v283.png
```
