# 319 - Node v314 signed human approval artifact contract intake

## 版本进度

本版从 v313 的 prerequisite catalog cleanup 往前推进一个小闭环：把 v312 剩余 prerequisite 里的 `signed-human-approval-artifact` 具体化为非 secret contract intake。

它不是 runtime shell 实现，也不是真实 managed audit connection。v314 只定义“人工签署审批 artifact 应该长什么样、哪些字段禁止出现、什么条件必须拒绝”，并把后续 Java v145 + mini-kv v138 并行只读 echo 写进 contract。

## 关键代码

`src/services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake.ts`

- `loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake()` 组装完整 profile，输出 contract state、source v312、artifact contract、prerequisite transition、checks 和 next actions。
- `createSourceNodeV312()` 只读消费 v312 stop/prerequisite closure decision，把 v312 中 1 个已完成 prerequisite 和 5 个仍缺 prerequisite 固化进本版证据。
- `createSignedArtifactContract()` 生成 `contractDigest`，并把 required fields、prohibited fields、rejection reasons、no-go boundaries、upstream echo requests 放入同一个稳定 contract。
- `createRequiredFields()` 定义 11 个允许字段：artifact id、approval correlation id、operator/signer handle、policy version、artifact digest、issued/expires timestamp、review status、no-network assertion、rollback/abort reference。
- `createPrerequisiteTransition()` 明确本版只把 `signed-human-approval-artifact` 从 `still-missing` 推到 `contract-intake-defined`，不关闭 credential handle、endpoint allowlist、no-network fixture、abort/rollback semantics。
- `createChecks()` 把安全边界编码为硬检查：上游 probes/actions 必须关闭，runtime shell / production audit / production window 仍 blocked。
- `collectProductionBlockers()` 只在检查失败时产生 blocker；正常 v314 contract intake 不产生 production blocker。

`src/services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeTypes.ts`

- `ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeProfile` 是对外 JSON contract。
- `SignedHumanApprovalArtifactContract` 固化 contract digest、字段清单、拒绝原因、no-go 边界和两边上游 echo 请求。
- `SignedHumanApprovalArtifactContractIntakeChecks` 保证 v314 不是“只写文档”，而是有可测试的 contract readiness gate。

`src/services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeRenderer.ts`

- 负责 Markdown evidence 渲染。
- 复用 `renderEntries`、`renderList`、`renderMessages`，没有在 service 内混入展示逻辑。

`src/routes/auditJsonMarkdownRoutes.ts`

- 注册 `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake`。
- JSON 和 `?format=markdown` 共用 audit route table。

`test/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake.test.ts`

- 覆盖 ready profile。
- 覆盖 forced historical fixture fallback。
- 覆盖 upstream probes/actions 开启时 blocked。
- 覆盖 JSON/Markdown route。

## 为什么这样拆

本轮没有把 types、renderer、service、test 堆进一个文件。service 约 526 行，types 约 239 行，renderer 约 130 行，test 约 267 行，符合当前“不制造巨型文件”的规则。

v314 也没有复制 v312/v313 的 prerequisite 文案，而是复用 `managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.ts`。这样后续 Node v315、Java v145、mini-kv v138 看到的是同一个 prerequisite id，不会出现 plan、代码、报告三处 drift。

## 验证结果

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake.test.ts
  1 test file passed, 4 tests passed

npm test
  247 test files passed, 852 tests passed

npm run build
  passed

HTTP smoke
  JSON 200
  Markdown 200
```

全量测试第一次发现两个旧路由表测试在并发下超过 45s，单独和成组重跑均通过，因此只把这两个旧测试预算调到 60s。这是测试预算稳定，不改变业务行为。

## 项目成熟度

v314 让“继续治理链”从抽象讨论变成第一个具体 prerequisite contract。它仍然很保守：不读 secret、不接 endpoint、不启动上游、不写状态。但它给 Java v145 / mini-kv v138 提供了明确、可验证的只读回显目标。

下一步应先并行做 Java v145 + mini-kv v138；Node v315 再消费两边证据，判断 signed approval artifact contract 是否完成上游 echo。
