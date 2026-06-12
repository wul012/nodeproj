# v2123 renderer consolidation batch 6

v2123 继续 N1 renderer consolidation，把 5 个 sandbox handle review archive verification renderer 迁移到 `renderVerificationReportMarkdown`，并在 `verificationReportBuilder.ts` 增加 `renderVerificationArchiveFileReferenceLines`，用一个共享 helper 替代五份完全相同的 archive-reference 本地渲染函数。

验证结果：

- `npm run typecheck` 通过。
- focused renderer batch 通过：7 个测试文件、20 个断言。
- 临时 Vitest exact compare 通过：5/5 个 renderer 与 `git show HEAD` 中的迁移前实现逐字节一致。
- `test/governanceGrowthRatchet.test.ts` 已包含在 focused batch 中，确认没有新增 service/route 文件。

本版没有启动 Java、mini-kv 或 Node HTTP 服务，不需要截图归档。Java 和 mini-kv 仍可按各自 playbook 并行推进；Node v2123 不改变证据合同、route、loader、access guard 或真实执行前置条件。
