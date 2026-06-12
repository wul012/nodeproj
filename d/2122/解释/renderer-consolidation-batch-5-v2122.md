# v2122 renderer consolidation batch 5

v2122 继续 N1 renderer consolidation，把 7 个 Java / mini-kv operator lifecycle、runtime live-read gate 和 approval-gate archive verification renderer 迁移到 `renderVerificationReportMarkdown`。本批次仍然不改变 profile schema、route、loader、access guard 或测试期望。

验证结果：

- `npm run typecheck` 通过。
- focused renderer batch 通过：9 个测试文件、25 个断言。
- 临时 Vitest exact compare 通过：7/7 个 renderer 与 `git show HEAD` 中的迁移前实现逐字节一致。
- `test/governanceGrowthRatchet.test.ts` 已包含在 focused batch 中，确认没有新增 service/route 文件。

本版没有启动 Java、mini-kv 或 Node HTTP 服务，不需要截图归档。Java 和 mini-kv 仍可按各自 playbook 并行推进；Node v2122 不改变它们的证据合同或前置条件。
