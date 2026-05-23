# 321 - Node v316 signed human approval artifact prerequisite closure review

## 版本进度

本版从 v315 的三方 echo verification 继续推进一个小闭环：把 `signed-human-approval-artifact` 这个 prerequisite 从 `contract-intake-defined` 推进到 `contract-intake-and-upstream-echo-complete`。

它不是 runtime shell，也不是 credential resolver 实现。v316 只做 closure review：当前完成 2 个 prerequisite，剩余 4 个仍然明确保留为 missing，并把下一步限定为 Node v317 的 credential-handle approval contract intake。

## 关键代码

`src/services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview.ts`

- `loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview()` 是 profile 入口，组装 source Node v315、closure review、checks、summary、blockers 和 next actions。
- `createSourceNodeV315()` 直接消费 v315 的 `echoVerification` 和 summary，读取三方 echo 对齐结果、contract digest、11/8/5/8 字段计数、2 个 upstream echo request，以及 runtime / side-effect 边界。
- `createClosureReview()` 构造 v316 的核心决策：`java-mini-kv-decision-echo` 是 v316 前已完成项，`signed-human-approval-artifact` 在本版推进到 `contract-intake-and-upstream-echo-complete`，剩余 4 个 prerequisite 继续 missing。
- `completedSignedArtifact()` 把 v315 的 contract digest 写入 evidence，避免 v316 只做口头 closure。
- `createChecks()` 把安全约束编码成 17 个硬检查：v315 ready、三方 echo aligned、runtime blocked、side effects closed、只完成 2 个 prerequisite、剩余 4 个仍 missing、下一步只允许 Node v317 contract intake。
- `collectProductionBlockers()` 只在 closure count、v315 source 或 runtime 边界不满足时产生 blocker。正常 v316 输出 `productionBlockerCount=0`。

`src/services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewTypes.ts`

- `ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewProfile` 是对外 JSON contract。
- `SourceNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerificationReference` 保留 v315 的 digest、counts、checks 和边界状态。
- `SignedHumanApprovalArtifactPrerequisiteClosureReview` 固化本版移动的 prerequisite、剩余 prerequisite、下一步 Node v317 建议和 runtime blocked 语义。

`src/services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewRenderer.ts`

- 负责 Markdown evidence 渲染。
- 分别渲染 Source Node v315、Closure Review、Completed Prerequisites、Remaining Prerequisites、Checks、Summary 和 evidence endpoints。

`src/routes/auditJsonMarkdownRoutes.ts`

- 注册 `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review`。
- JSON 和 `?format=markdown` 继续走统一 audit route table。

`test/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview.test.ts`

- 覆盖 ready profile。
- 覆盖 forced historical fixture fallback，间接保护 v315 读取 Java v145 / mini-kv v138 historical fixtures。
- 覆盖 upstream probes/actions 开启时 blocked。
- 覆盖 JSON/Markdown route。

## 为什么这样拆

本版继续避免巨型文件。service 约 446 行，types 约 189 行，renderer 约 126 行，test 约 273 行。职责仍然分开：service 做决策，types 固化 contract，renderer 做展示，test 覆盖行为。

v316 没有请求 Java/mini-kv 新版本，因为 closure review 只消费 v315 已有证据。真正需要 Java v146 + mini-kv v139 的时机，是 Node v317 定义完 credential-handle approval contract 之后。

## 验证结果

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview.test.ts
  1 test file passed, 4 tests passed

npm test
  249 test files passed, 860 tests passed

npm run build
  passed

HTTP smoke
  JSON 200
  Markdown 200
```

全量测试第一次发现 3 个旧 route-table 用例在并发下超过 45s，成组重跑全部通过；因此只把这些旧 route smoke 的最后一个 JSON/Markdown 用例预算调到 60s。这是测试预算稳定，不改变业务行为。

## 项目成熟度

v316 把治理链从“echo 已对齐”推进到“prerequisite 状态可前进”，但仍保持生产边界：credential、endpoint、provider/client、HTTP/TCP、ledger/schema、runtime shell 全部关闭。

下一步是 Node v317 先做 credential-handle approval contract intake，不让 Java/mini-kv 抢跑。
