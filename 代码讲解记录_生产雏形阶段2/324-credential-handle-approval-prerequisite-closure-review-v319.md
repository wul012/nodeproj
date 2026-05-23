# 324 - Node v319 credential handle approval prerequisite closure review

## 版本进度

v319 消费 Node v318 的 `credential-handle-approval-contract-upstream-echo-verification`，完成 `credential-handle-approval` prerequisite closure review。v317 定义 contract，Java v146 只读回显，mini-kv v139 只做 non-participation receipt，v318 验证三方对齐；v319 在这个证据基础上把 `credential-handle-approval` 推进到 `contract-intake-and-upstream-echo-complete`。

这不是 credential resolver 实现。v319 不读取 credential value，不解析 raw endpoint URL，不实例化 secret provider / resolver client，不发送 managed audit HTTP/TCP，不写 ledger，不执行 schema migration，也不自动启动任何上游服务。

## 关键代码

`src/services/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview.ts`

- `loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview()` 是本版入口。它组装 `sourceNodeV318`、`closureReview`、`checks`、`summary`、`productionBlockers`、`warnings`、`recommendations` 和 `nextActions`，最终输出 route 消费的 profile。
- `createSourceNodeV318()` 直接消费 `loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification()`，读取 v318 的 `verificationDigest`、`sourceSpan`、`sourceNodeV317Ready`、`javaV146EchoReady`、`miniKvV139ReceiptReady`、`credentialHandleContractAligned`、10/8/5/9 计数和 2 个 upstream echo request。
- `createClosureReview()` 是本版核心决策。它把 `java-mini-kv-decision-echo`、`signed-human-approval-artifact`、`credential-handle-approval` 放进 `completedPrerequisites`，把 `endpoint-handle-allowlist-approval`、`no-network-safety-fixture`、`abort-rollback-semantics` 保留在 `remainingPrerequisites`。
- `completedCredentialHandle()` 把 v318 的 contract digest 写进 evidence 文案，明确本轮 closure 的证据来源是 Java v146 + mini-kv v139 的只读 echo alignment。
- `createChecks()` 形成 17 个硬检查：v318 ready、三方 echo aligned、runtime 仍 blocked、side effects 仍 closed、closure count 3/6、remaining count 3/6、下一项只能是 endpoint-handle allowlist、upstream probes/actions 仍关闭、生产窗口仍 blocked。
- `collectProductionBlockers()` 把 source、closure count、next prerequisite、runtime config 分成 5 组 blocker。正常 v319 的 `productionBlockerCount=0`，但只要 upstream probe/action 被打开，就会返回 blocked。

`src/services/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewTypes.ts`

- `ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewProfile` 固化对外 JSON 形状。
- `SourceNodeV318CredentialHandleApprovalContractUpstreamEchoVerificationReference` 保存 v318 的 contract digest、checks、summary 和所有 no-side-effect flags。
- `CredentialHandleApprovalPrerequisiteClosureReview` 固化 closure decision：`movedPrerequisiteId="credential-handle-approval"`，`nextConcretePrerequisiteId="endpoint-handle-allowlist-approval"`。

`src/services/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewRenderer.ts`

- 渲染 Markdown evidence。
- 分区输出 Source Node v318、Closure Review、Completed Prerequisites、Remaining Prerequisites、Checks、Summary、Blockers、Warnings、Recommendations、Evidence Endpoints 和 Next Actions。

`src/routes/auditJsonMarkdownRoutes.ts`

- 注册 `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review`。
- JSON 和 `?format=markdown` 继续走统一 audit JSON/Markdown route table，没有新增手写路由样板。

`test/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview.test.ts`

- 覆盖 ready profile。
- 覆盖 forced historical fixture fallback，保护 GitHub runner 上没有 sibling workspace 时仍能消费 v318 的历史证据。
- 覆盖 upstream probes/actions 开启时 blocked。
- 覆盖 JSON/Markdown route。

## 为什么这样拆

v319 延续 v317/v318 的拆分模式：types、service、renderer、test 分离。它没有把 route、渲染、类型、closure count 和测试塞进单个巨型文件。

本版也避免了一个常见误区：`credential-handle-approval` 完成，不等于可以打开真实 connection。它只把 prerequisite 从 2/6 推进到 3/6；下一项仍是 `endpoint-handle-allowlist-approval` 的非 raw URL contract intake。

## 验证结果

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview.test.ts
  1 test file passed, 4 tests passed

npm test
  252 test files passed, 872 tests passed

npm run build
  passed

HTTP smoke
  JSON 200
  Markdown 200
```

## 项目成熟度

v319 让 approval prerequisite 链从 `signed-human-approval-artifact` 继续推进到 `credential-handle-approval`，现在已完成 3/6 prerequisite。项目仍未进入真实联调：endpoint-handle allowlist、no-network safety fixture、abort/rollback semantics 还没完成，因此 raw endpoint、provider/client、HTTP/TCP、ledger/schema 和 runtime shell 仍必须保持关闭。
