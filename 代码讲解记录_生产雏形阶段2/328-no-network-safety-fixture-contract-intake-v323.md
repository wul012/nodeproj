# 328 - Node v323 no-network safety fixture contract intake

## 版本进度

v323 消费 Node v322 的 `endpoint-handle-allowlist-approval prerequisite closure review`，定义下一项 `no-network-safety-fixture` 的 contract intake。它把“未来 runtime path 必须在未审批时拒绝 HTTP/TCP”写成机器可读 contract，但不真正运行 fixture，也不打开任何网络连接。

本版完成后，计划明确进入推荐并行：Java v149 + mini-kv v141。Java 只读 echo，mini-kv 只读 non-participation；Node v324 需要等两边完成后再验证三方一致性。

## 关键代码

`src/services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake.ts`

- `loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake()` 是 v323 入口。它组装 `sourceNodeV322`、`prerequisiteTransition`、`necessityProof`、`noNetworkSafetyFixtureContract`、`checks`、blockers、warnings、recommendations 和 summary。
- `createSourceNodeV322()` 直接消费 v322 closure review，读取 review digest、完成/剩余 prerequisite 计数、下一项 `no-network-safety-fixture`，以及 runtime / side-effect boundary。
- `createNoNetworkSafetyFixtureContract()` 生成 contract digest，并固定 `contractName=managed-audit-no-network-safety-fixture`、`contractVersion=no-network-safety-fixture.v1`、`contractMode=no-network-safety-fixture-contract-intake-only`。
- `createRequiredFields()` 定义 10 个必需字段：`fixture_id`、`operator_confirmation_handle`、`approval_correlation_id`、`transport_denial_policy_id`、`expected_denied_transport_classes`、`required_denial_evidence`、`forbidden_network_actions`、`cleanup_marker`、`timeout_budget_ms`、`audit_digest`。
- `createProhibitedFields()` 定义 12 个禁止字段/行为，包括 credential value、raw endpoint URL、provider/client config、external request payload、socket open、HTTP request execution、TCP connection attempt、ledger/schema mutation、upstream process start 和 runtime shell invocation。
- `createNoGoBoundaries()` 明确 v323 不读取 credential、不解析 raw endpoint、不实例化 provider/client、不发 HTTP、不连 TCP、不执行 fixture、不写 ledger/schema、不自动启动上游、不调用 runtime shell。
- `createUpstreamEchoRequests()` 明确 Java v149 + mini-kv v141 可以并行，只能只读 echo / non-participation。
- `createChecks()` 固化 21 个检查，确保 v323 只做 contract intake，不执行 no-network fixture。

`src/services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeTypes.ts`

- 固化 v323 profile、source Node v322 reference、no-network safety fixture contract、prerequisite transition、necessity proof、checks、summary 和 message 类型。
- 额外保留 `networkSafetyFixtureExecuted=false`、`httpRequestSent=false`、`tcpConnectionAttempted=false`，让“没有真实联网动作”成为类型级输出。

`src/services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeRenderer.ts`

- 渲染 Markdown evidence。
- 分区输出 Source Node v322、No-Network Safety Fixture Contract、Prerequisite Transition、Necessity Proof、Checks、Summary、Blockers、Warnings、Recommendations、Evidence Endpoints 和 Next Actions。

`src/routes/auditJsonMarkdownRoutes.ts`

- 新增 `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake`。
- 继续走统一 `auditJsonMarkdownRoute`，没有新增手写 JSON/Markdown 分支。

`test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake.test.ts`

- 覆盖 ready profile。
- 覆盖 forced historical fixture fallback。
- 覆盖 upstream probes/actions 开启时 blocked。
- 覆盖 JSON/Markdown route。

## 为什么这样拆

v323 继续沿用 types / service / renderer / test 分离。这个 contract 比之前更容易膨胀，因为它同时涉及 endpoint、credential、network、cleanup、timeout 和 upstream echo，所以从第一版就拆开，避免生成难维护的大文件。

本版还继续复用 prerequisite catalog 和 closure review 模式。v323 不重新发明前置项列表，而是从 v322 source state 读取当前进度，只专注定义 `no-network-safety-fixture` 的 contract。

## 验证结果

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake.test.ts
  1 test file passed, 4 tests passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview.test.ts test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake.test.ts
  2 test files passed, 8 tests passed

npm run build
  passed

npm test
  256 test files passed, 888 tests passed

HTTP smoke
  JSON 200
  Markdown 200
```

## 项目成熟度

v323 让真实联调前置链条更接近可执行边界：现在不只是“不能连接”，而是开始定义未来如何证明“未审批时拒绝连接”。不过它仍然只是 contract intake，不是实际 fixture run。真实 managed audit connection 仍至少需要 Java v149、mini-kv v141、Node v324、Node v325，以及最后的 abort/rollback semantics 闭环。
