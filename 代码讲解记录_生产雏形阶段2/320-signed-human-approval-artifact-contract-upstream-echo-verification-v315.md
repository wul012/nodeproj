# 320 - Node v315 signed human approval artifact contract upstream echo verification

## 版本进度

本版接在 Node v314、Java v145、mini-kv v138 之后，做 signed human approval artifact contract 的三方只读 echo verification。

v315 的定位很窄：它证明 Java 和 mini-kv 已经按 Node v314 的 contract 回显了同一组字段、拒绝原因和 no-go 边界；它不把 echo alignment 转成 runtime shell 许可，也不打开真实 managed audit connection。

## 关键代码

`src/services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification.ts`

- `loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification()` 是 profile 入口，组装 Node v314、Java v145、mini-kv v138 三方证据、checks、summary、blockers 和 next actions。
- `createSourceNodeV314()` 直接消费 v314 的 `signedArtifactContract`，读取 `contractDigest`、11 个 required fields、8 个 prohibited fields、5 个 rejection reasons、8 个 no-go boundaries，以及 Java v145 + mini-kv v138 的并行 echo 请求。
- `createJavaV145Reference()` 检查 Java v145 的 support、test、解释和代码讲解，确认它只读 echo Node v314 contract，并继续关闭 runtime、credential、endpoint、external request、ledger/schema、auto-start 等边界。
- `createMiniKvV138Reference()` 读取 mini-kv v138 standalone receipt JSON，解析 `credential_resolver_signed_human_approval_artifact_contract_non_participation_receipt`，确认 mini-kv 不存储、不校验、不承载 signed artifact authority。
- `createChecks()` 把三方对齐编码为 23 个硬检查，包括 source ready、parallel echo request、contract digest/count 对齐、上游 probes/actions 关闭、production audit/window 仍 blocked。
- `collectProductionBlockers()` 只在 Node v314、Java v145、mini-kv v138 任一侧证据未对齐时产生 blocker；正常 v315 输出 `productionBlockerCount=0`。

`src/services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationTypes.ts`

- `ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationProfile` 是对外 JSON contract。
- `SourceNodeV314SignedHumanApprovalArtifactContractIntakeReference` 保留 v314 contract 原文，而不是重新写一份字段。
- `JavaV145SignedHumanApprovalArtifactContractIntakeEchoReference` 和 `MiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceiptReference` 把上游证据整理为 Node 可验证字段。

`src/services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationRenderer.ts`

- 负责 Markdown evidence 渲染。
- 分别渲染 Source Node、Java Echo、mini-kv Receipt、Echo Verification、Checks、Summary 和 evidence endpoints，避免 service 混入展示逻辑。

`src/routes/auditJsonMarkdownRoutes.ts`

- 注册 `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification`。
- JSON 与 `?format=markdown` 继续走统一 audit route table。

`test/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification.test.ts`

- 覆盖 ready profile。
- 覆盖 forced historical fixture fallback，确保 GitHub runner 不依赖本机 Java / mini-kv 工作区。
- 覆盖 upstream probes/actions 开启时 blocked。
- 覆盖 JSON/Markdown route。

## 为什么这样拆

本版没有把 v315 做成单个巨型文件。service 约 665 行，types 约 266 行，renderer 约 167 行，test 约 322 行。它仍然偏长，但职责清楚：service 做证据聚合，types 固化 contract，renderer 做展示，test 覆盖行为。

另外，v315 没有硬依赖兄弟仓库在线存在。本版把 Java v145 / mini-kv v138 的必要证据复制到 `fixtures/historical/sibling-workspaces/...`，并通过 forced fallback 测试保护 CI 场景。

## 验证结果

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification.test.ts
  1 test file passed, 4 tests passed

npx vitest run <8 个 live-probe route timeout 文件>
  8 test files passed, 32 tests passed

npm test
  248 test files passed, 856 tests passed

npm run build
  passed

HTTP smoke
  JSON 200
  Markdown 200
```

全量测试第一次发现 8 个旧 live-probe route 用例在并发下超过 60s，但成组重跑全部通过；因此只把这些旧 route smoke 的最后一个 JSON/Markdown 用例预算调到 90s。这是测试预算稳定，不改变业务行为。

## 项目成熟度

v315 把 signed-human-approval-artifact 从“Node 自己定义 contract”推进到“三方都能只读回显同一个 contract”。这一步仍然不是生产连接，但它让后续 v316 可以有依据地判断该 prerequisite 是否从 `still-missing` 推进到 `contract-intake-and-upstream-echo-complete`。

下一步继续做 Node v316，不能抢跑真实 credential、endpoint、provider/client 或 runtime shell。
