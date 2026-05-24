# 327 - Node v322 endpoint handle allowlist approval prerequisite closure review

## 版本进度

v322 消费 Node v321 的 upstream echo verification，判断 `endpoint-handle-allowlist-approval` 是否可以从“契约已定义并已被 Java/mini-kv 只读回显”推进到 `contract-intake-and-upstream-echo-complete`。本版完成后，人工 approval artifact review 后置前置项从 3/6 完成推进到 4/6 完成，剩余 `no-network-safety-fixture` 和 `abort-rollback-semantics`。

本版不是真实连接，也不是 approval 执行。它不读取 credential value，不解析 raw endpoint URL，不实例化 secret provider / resolver client，不发送 HTTP/TCP，不写 approval ledger，不执行 schema migration，也不启用 runtime shell。

## 关键代码

`src/services/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview.ts`

- `loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview()` 是 v322 入口。它组装 `sourceNodeV321`、`closureReview`、`checks`、blockers、warnings、recommendations 和 summary。
- `createSourceNodeV321()` 直接消费 v321 服务，读取 `echoVerification.verificationDigest`、三方 echo 对齐状态、contract digest、字段计数、check 计数，以及 runtime / side-effect boundary。
- `createClosureReview()` 构造 4 个 completed prerequisites：`java-mini-kv-decision-echo`、`signed-human-approval-artifact`、`credential-handle-approval`、`endpoint-handle-allowlist-approval`。剩余项通过 prerequisite catalog 自动筛出，避免手写重复列表。
- `completedEndpointHandleAllowlist()` 把 v321 contract digest 写入 evidence 文本，说明本次关闭基于 Node v320 + Java v147 + mini-kv v140 的只读 echo 证据。
- `createChecks()` 固化 17 个检查：v321 ready、v321 echo aligned、runtime blocked、side effects closed、endpoint-handle allowlist contract 可关闭、完成数为 4、剩余数为 2、下一项是 no-network safety fixture、没有请求新 Java/mini-kv echo、upstream probes/actions disabled、production audit/window blocked。
- `collectProductionBlockers()` 继续使用声明式 rules，避免新增一堆分散 `if` push。

`src/services/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewTypes.ts`

- 固化 v322 profile、source Node v321 reference、closure prerequisite、closure review、checks、summary 和 message 类型。
- `EndpointHandleAllowlistApprovalPrerequisiteClosureReview` 明确 `movedPrerequisiteId=endpoint-handle-allowlist-approval`、`movedTo=contract-intake-and-upstream-echo-complete`、`nextConcretePrerequisiteId=no-network-safety-fixture`。

`src/services/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewRenderer.ts`

- 渲染 Markdown evidence。
- 分区输出 Source Node v321、Closure Review、Completed Prerequisites、Remaining Prerequisites、Checks、Summary、Blockers、Warnings、Recommendations、Evidence Endpoints 和 Next Actions。

`src/routes/auditJsonMarkdownRoutes.ts`

- 新增 `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review`。
- 继续走统一 `auditJsonMarkdownRoute`，没有新增手写 JSON/Markdown 分支。

`test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview.test.ts`

- 覆盖 ready profile。
- 覆盖 forced historical fixture fallback，确保 GitHub runner 没有 Java/mini-kv sibling workspace 时仍能消费冻结证据。
- 覆盖 upstream probes/actions 开启时 blocked。
- 覆盖 JSON/Markdown route。

## 为什么这样拆

v322 延续 v319/v321 的拆分方式：types、service、renderer、test 分离。服务只负责证据消费和判断，renderer 只负责输出，types 保护契约形状，test 保护 profile 与 route。这避免把 closure review 的契约、渲染和路由继续压回大文件。

本版还把“剩余前置项”交给 `managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.ts` 统一管理。这样每关闭一个 prerequisite，只需把 completed ids 交给 catalog 过滤，减少手写顺序和数量错误。

## 验证结果

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview.test.ts
  1 test file passed, 4 tests passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake.test.ts test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview.test.ts
  3 test files passed, 12 tests passed

npm run build
  passed

HTTP smoke
  JSON 200
  Markdown 200
```

全量 `npm test` 本轮没有暴露 v322 断言差异，但历史 route-table 用例在本机并发下命中 45/90 秒单用例 timeout；串行/低并发全量又超过本轮命令预算。按 timeout triage，本版记录为全量测试预算问题，不把它改成 v322 业务逻辑修复。

## 项目成熟度

v322 把 endpoint-handle allowlist approval 从“三项目已回显一致”推进到“前置项正式关闭”。这让真实连接前置链条更短，但仍未进入真实联调。后续还需要 no-network safety fixture 和 abort/rollback semantics 两个前置项，才有资格讨论 disabled runtime shell 的下一步；现在仍不能打开真实 managed audit connection。
