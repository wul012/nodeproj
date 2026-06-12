# v2134 renderer consolidation batch 17

本版继续推进 N1 renderer consolidation，但刻意只迁移 2 个较重的历史验证报告：`managedAuditLocalAdapterCandidateVerificationReport.ts` 和 `managedAuditIdentityApprovalProvenancePacketVerificationReport.ts`。
这两个文件不是薄 renderer：前者有 archive file / snippet match 的分层证据，后者有 source packet / verification report / quality optimization 的生产前审计投影。v2134 只把标题、meta、标准 section、message、endpoints、next actions 这些重复 Markdown 外框交给 `verificationReportBuilder`，把业务语义强的局部行生成继续留在原文件。

本版不改 loader、route、profile type、历史 fixture，不启动 Java 或 mini-kv，不改变任何生产执行开关。Java / mini-kv 可以继续按自己的 playbook 并行推进，Node 不是它们的前置批准点。

已完成验证：`npm run typecheck` 通过；2 个 focused test 文件 / 6 个测试通过；临时逐字节对比 2 个文件、4 个 profile 全部通过，确认 migrated renderer 输出与 `git show HEAD:<path>` 的旧实现一致。
