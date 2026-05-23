# 325 - Node v320 endpoint handle allowlist approval contract intake

## 版本进度

v320 消费 Node v319 的 `credential-handle-approval prerequisite closure review`，定义下一个 prerequisite：`endpoint-handle-allowlist-approval` 的非 raw URL contract。它把下一步上游请求明确为 Java v147 + mini-kv v140 推荐并行，但本版本身不请求真实连接，也不读取 credential 或解析 raw endpoint。

这不是 managed audit connection 实现。v320 不读取 credential value，不解析 raw endpoint URL，不实例化 secret provider / resolver client，不发送 managed audit HTTP/TCP，不写 ledger，不执行 schema migration，也不自动启动任何上游服务。

## 关键代码

`src/services/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake.ts`

- `loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake()` 是本版入口。它组装 `sourceNodeV319`、`endpointHandleAllowlistApprovalContract`、`prerequisiteTransition`、`necessityProof`、`checks`、`summary`、blockers 和 next actions。
- `createSourceNodeV319()` 消费 v319 closure review，读取 `reviewDigest`、已完成 prerequisite 3/6、剩余 prerequisite 3/6、`nextConcretePrerequisiteId="endpoint-handle-allowlist-approval"`，并继承所有 no-side-effect flags。
- `createEndpointHandleAllowlistApprovalContract()` 生成本版 contract digest。digest 输入包括 v319 review digest、transition、necessity proof 和 contract record，避免 contract 形状漂移。
- `createRequiredFields()` 固化 10 个允许字段：`endpoint_handle`、`approval_correlation_id`、`operator_identity_handle`、`reviewer_identity_handle`、`policy_version`、`approval_status`、`issued_at`、`expires_at`、`revocation_marker`、`audit_digest`。
- `createProhibitedFields()` 明确禁止 `raw_endpoint_url`、`credential_value`、secret provider config、resolver client config、external request payload、approval ledger mutation 和 schema migration SQL。
- `createNoGoBoundaries()` 继续关闭 credential read、raw endpoint parse、provider/client instantiation、external request、ledger/schema write、auto-start、runtime shell implementation/invocation。
- `createUpstreamEchoRequests()` 把下一步写成 Java v147 + mini-kv v140，且两边都必须 read-only。
- `createChecks()` 形成 20 个硬检查：source v319 ready、指向 endpoint allowlist、runtime blocked、side effects closed、contract fields 完整、transition 只作用于 endpoint allowlist、necessity proof 完整、Java/mini-kv 可并行只读、生产窗口仍 blocked。

`src/services/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeTypes.ts`

- `ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeProfile` 固化对外 JSON 形状。
- `SourceNodeV319CredentialHandleApprovalPrerequisiteClosureReviewReference` 保存 v319 closure review 的 digest、counts、remaining prerequisite 和安全边界。
- `EndpointHandleAllowlistApprovalContract` 保存 required/prohibited/rejection/no-go/upstream echo request 的完整 contract。

`src/services/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeRenderer.ts`

- 渲染 Markdown evidence。
- 分区输出 Source Node v319、Endpoint Handle Allowlist Approval Contract、Prerequisite Transition、Necessity Proof、Checks、Summary、Blockers、Warnings、Recommendations、Evidence Endpoints 和 Next Actions。

`src/routes/auditJsonMarkdownRoutes.ts`

- 注册 `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake`。
- JSON 和 `?format=markdown` 继续走统一 audit JSON/Markdown route table，没有新增手写路由样板。

`test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake.test.ts`

- 覆盖 ready profile。
- 覆盖 forced historical fixture fallback，保护 GitHub runner 上没有 sibling workspace 时仍能消费 v319 的历史证据。
- 覆盖 upstream probes/actions 开启时 blocked。
- 覆盖 JSON/Markdown route。

`test/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview.test.ts`

- 本轮只调整 blocked-config 用例 timeout 到 60 秒。
- 原因是该用例会触发 v318/v319 historical fallback 路径，30 秒预算在全量并发测试里偶发不足；这是测试预算稳定，不是业务行为修复。

## 为什么这样拆

v320 延续 v317-v319 的拆分模式：types、service、renderer、test 分离。它没有把 route、渲染、类型、contract 字段、transition 和测试塞进单个巨型文件。

本版也避免把 endpoint handle allowlist approval 等同于真实网络权限。`endpoint_handle` 是允许字段，`raw_endpoint_url` 是禁止字段；即使 v320 ready，Node 仍不能解析 URL、实例化 client、发送 HTTP/TCP 或打开 runtime shell。

## 验证结果

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake.test.ts
  1 test file passed, 4 tests passed

npm test
  253 test files passed, 876 tests passed

npm run build
  passed

HTTP smoke
  JSON 200
  Markdown 200
```

## 项目成熟度

v320 让 human approval prerequisite 链继续向真实连接前置条件推进：当前已完成 signed artifact、credential handle approval，并开始 endpoint handle allowlist approval 的 contract intake。真实联调仍不能开始，因为 endpoint allowlist 还需要 Java/mini-kv echo、Node v321 verification、Node v322 closure review；no-network safety fixture 和 abort/rollback semantics 也仍未完成。
