# v2152 renderer consolidation batch 34

## 本版目标

本版继续 Node 的 renderer consolidation，迁移 controlled read-only shard preview 里的 candidate document 五件套报告：

- `controlledReadOnlyShardPreviewCandidateDocumentRequestRenderer.ts`
- `controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckRenderer.ts`
- `controlledReadOnlyShardPreviewCandidateDocumentIntakePacketRenderer.ts`
- `controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestRenderer.ts`
- `controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckRenderer.ts`

这五个文件原本都是标题、meta bullet、两个 `##` section、再接多组 `###` 子块的手写 Markdown。迁移后，标题、meta、section 间距和尾部换行交给 `verificationReportBuilder`，领域字段留在文件本地 helper 里。这样既不改变输出，又把“报告骨架”和“候选文档字段”分开，后续继续迁移同形态 renderer 时更容易审查。

## 重要边界

本版只改 Markdown 渲染外壳，不改业务对象、route、schema、审批、执行、兄弟项目读取或写入。报告里出现 candidate document、material request、submission precheck、acceptance check、approval grant、signed approval 等词，只表示只读 profile 字段仍按旧顺序展示，不表示系统获得真实批准、真实导入或真实执行能力。

Java 和 mini-kv 可以继续并行推进。本版没有读取它们的新工作树文件，也没有要求它们提供 fresh evidence。验证使用 Node 本地 fixture factory 生成同一组候选文档对象，并通过迁移前后 SHA-256 证明 Markdown 输出完全一致。

## 代码入口

核心入口仍是 `src/services/verificationReportBuilder.ts` 的 `renderVerificationReportMarkdown` 和 `renderVerificationSeparatedBlockLines`。本版没有新增 builder API，只复用 v2151 已经引入的 separated h3 block helper。每个被迁移 renderer 的主函数现在只表达三件事：

1. 当前报告标题。
2. meta bullet 的 label/value 顺序。
3. 两个 section 对应的 item/check/helper 渲染函数。

例如 request package renderer 现在把 `Request Items` 和 `Acceptance Checks` 分别交给 `renderRequestItem`、`renderAcceptanceCheck`。submission precheck renderer 把 `Submission Checkpoints` 和 `Submission Validators` 分别交给 `renderCheckpoint`、`renderValidator`。material request 与 material submission precheck 也按同样结构拆开。

## 输出稳定性

迁移前后 5 个输出全部 byte-identical：

- request package: `939d1efddd2c3fe783e2fab3739c317ee386441ca9efa9d3b5a2710ee7ef368c`
- submission precheck: `e4967a82ef7bf038cbf14055a758d1aa233e77df0d1b798d809692721044dfb3`
- intake packet: `b6368e8ab43ff2fae422c01f3b461b1e29cdf0d807a61e90afb3840499f4814c`
- material request package: `1008ec3d429d710c7272ba3343ddf36b07fc1802694d77e774c26963da503cb9`
- material submission precheck: `b81f00f8ffce5e1b87f73c79a288d52c56339a2673a698c46977ecd55f6745d1`

两个 request/submission 报告原来带尾部换行，builder 保持默认尾换行；三个 intake/material 报告原来没有尾部换行，迁移后显式设置 `trailingNewline: false`。这是本版最容易出错的排版边界，已由 hash compare 覆盖。

## 验证摘要

- 迁移前后 hash compare：5/5 byte-identical。
- focused tests：5 个 candidate document 测试文件，27 个测试通过。
- typecheck：`npm run typecheck` 通过。
- ratchet：`test/governanceGrowthRatchet.test.ts` 通过。
- lint：`npm run lint` 通过，0 error / 263 existing warnings。

## 维护收益

本版把未迁移 renderer 从 92 降到 87，并清掉当前扫描口径下的剩余 `for (` renderer。之后若继续做 renderer consolidation，可以优先处理两类对象：一类是剩余 `flatMap` / `map` 报告 renderer，另一类是 profile-section 聚合 renderer。后者不应强行套用 full report builder，需要先确认它们是不是单独报告，还是上层 profile 的局部 section。

本版没有扩大治理链条，也没有新增报告类型。它的价值在于减少重复渲染壳、降低未来审查成本，并让候选文档流的五个连续报告使用同一套结构表达。
