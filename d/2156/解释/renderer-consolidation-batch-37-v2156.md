# v2156 renderer consolidation batch 37

## 本版目标

v2156 关闭 disabled runtime shell 设计/草案族的一整组手写 Markdown renderer。本批迁移 11 个文件，范围覆盖 v294 pre-plan intake、v295 design review、v296 upstream echo verification、v297 implementation candidate gate，以及 v331 到 v343 的 design draft / body draft 主链。

这些 renderer 都不是 verification-report builder 的典型形态：它们更像 release/probe 风格报告，表头是人工标签，正文混合 entries、列表、flatMap 明细、message 区和 next actions。因此本版没有把它们塞进 `verificationReportBuilder`，而是复用 v2154 已经建立的 `releaseReportShared` 分层：header、entries section、line section、messages section 和 tail。这样能减少重复拼接，又不会制造一个过度抽象的巨型 builder。

## 迁移文件

- `managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReviewRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntakeRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReviewRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateRenderer.ts`

## 边界

本版只改 Node renderer 内部结构，不改 route、schema、service loader、历史 fixture、兄弟项目证据，也不启动 Java 或 mini-kv。Java 和 mini-kv 可以继续并行推进；Node v2156 不构成它们的前置批准门。

## 输出稳定性

迁移前后使用归档 JSON profile 重新渲染 Markdown，11 个输出全部 SHA-256 一致。验证覆盖的归档来源包括 `d/294`、`d/295`、`d/296`、`d/297`、`d/331`、`d/333`、`d/335`、`d/337`、`d/339`、`d/341` 和 `d/343`。

本版 hash 证明结果：11/11 byte-identical，0 mismatch。

## 验证摘要

- pre/post hash compare：11/11 byte-identical。
- focused tests：11 files / 44 tests passed。
- typecheck：`npm run typecheck` passed。
- ratchet：`test/governanceGrowthRatchet.test.ts` passed，2 tests。
- lint：`npm run lint` passed，0 errors，历史 warning 仍存在。
- full Vitest：528 files / 1631 tests passed，使用 `--maxWorkers=4` 控制并发。
- build：`npm run build` passed。

## 维护收益

v2156 把 11 个约百行级手写 renderer 收束为同一种段落表达：标题和表头由 `renderReleaseReportHeader` 负责，普通对象段落由 `renderReleaseReportEntriesSection` 负责，目录/问题/stop condition/next action 这类保留原有文本格式的数组由 `renderReleaseReportLineSection` 负责，消息段由 `renderReleaseReportMessagesSection` 负责。

这个方向比继续逐个文件复制 Markdown 数组更容易维护，也比强行把 release/probe 报告塞进 verification builder 更稳。后续剩余 63 个未标准化 renderer 可以继续按形态拆：完整 verification 报告进 `verificationReportBuilder`，release/probe 报告进 `releaseReportShared`，局部 profile fragment 保持 `renderProfileEntrySections` 或列为 composition-only waiver。
