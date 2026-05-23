# 322 - Node v317 credential handle approval contract intake

## 版本进度

本版从 v316 的 prerequisite closure review 继续推进一个小闭环：v316 已完成 2/6 prerequisite，并明确下一项是 `credential-handle-approval`；v317 只把这项的非 secret contract 定义清楚，状态推进到 `contract-intake-defined`。

它不是 credential resolver 实现，也不是 credential approval 执行。v317 不读取 credential value，不解析 raw endpoint URL，不实例化 secret provider / resolver client，不发送 HTTP/TCP，不写 ledger，不执行 schema migration，也不自动启动 Java 或 mini-kv。

## 关键代码

`src/services/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake.ts`

- `loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake()` 是 profile 入口，组装 source Node v316、contract、transition、necessity proof、checks、summary、blockers 和 next actions。
- `createSourceNodeV316()` 消费 v316 closure review，读取 `completedPrerequisiteCount=2`、`remainingPrerequisiteCount=4`、`nextConcretePrerequisiteId=credential-handle-approval`，并继承 runtime / side-effect 全关闭状态。
- `createCredentialHandleApprovalContract()` 生成本版核心 contract，包含 10 个 required fields、8 个 prohibited fields、5 个 rejection reasons、9 个 no-go boundaries 和 2 个 upstream echo requests。
- `createRequiredFields()` 明确允许的字段只有 `credential_handle`、`approval_status`、operator/reviewer handle、policy version、correlation id、issued/expires timestamp、revocation marker、audit digest 等非 secret 信息。
- `createProhibitedFields()` 明确拒绝 `credential_value`、`raw_endpoint_url`、`secret_provider_config`、`resolver_client_config`、`external_request_payload`、`approval_ledger_mutation`、`schema_migration_sql`。
- `createNoGoBoundaries()` 把 credential read、endpoint parse、provider/client instantiation、external request、ledger/schema write、auto-start、runtime shell implementation/invocation 全部编码为 `allowed=false`。
- `createChecks()` 用 20 个硬检查证明：v316 source ready、下一项确实是 credential handle、contract 字段齐全、仍为非 secret、Java v146 + mini-kv v139 只能并行只读 echo、Node v318 不可抢跑。

`src/services/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntakeTypes.ts`

- `ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntakeProfile` 固化对外 JSON contract。
- `SourceNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReviewReference` 保存 v316 的 review digest、prerequisite counts、remaining ids 和安全边界。
- `CredentialHandleApprovalContract`、`CredentialHandleApprovalPrerequisiteTransition`、`CredentialHandleApprovalContractNecessityProof` 分别表达 contract、状态迁移和必要性证明。

`src/services/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntakeRenderer.ts`

- 负责 Markdown evidence 渲染。
- 分区输出 Source Node v316、Credential Handle Approval Contract、Prerequisite Transition、Necessity Proof、Checks、Summary、Blockers、Warnings、Recommendations、Evidence Endpoints 和 Next Actions。

`src/routes/auditJsonMarkdownRoutes.ts`

- 注册 `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake`。
- JSON 和 `?format=markdown` 继续走统一 audit route table。

`test/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake.test.ts`

- 覆盖 ready profile。
- 覆盖 forced historical fixture fallback，保护 v316 source chain。
- 覆盖 upstream probes/actions 开启时 blocked。
- 覆盖 JSON/Markdown route。

## 为什么这样拆

本版遵循“不要制造巨型文件”的规则：service 约 582 行，types 约 250 行，renderer 约 154 行，test 约 305 行。相比把 contract、渲染、类型和 route 测试堆到一个文件里，这种拆法更利于后续 v318 只消费 contract evidence，不复制一整套长逻辑。

v317 也没有请求 Java/mini-kv 抢跑。只有本版归档完成后，计划才推荐 Java v146 + mini-kv v139 并行做只读 echo / non-participation receipt。

## 验证结果

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake.test.ts
  1 test file passed, 4 tests passed

npm test
  250 test files passed, 864 tests passed

npm run build
  passed

HTTP smoke
  JSON 200
  Markdown 200
```

## 项目成熟度

v317 没有打开真实联调，但它把 credential handle approval 这条前置从“缺失”推进到“可被 Java/mini-kv echo 的 contract”。这一步完成后，三项目可以并行推进 Java v146 + mini-kv v139；Node v318 再统一验证三方理解是否一致。
