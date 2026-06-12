# v2125 renderer consolidation batch 8

v2125 继续 N1 renderer consolidation，把 3 个 shard readiness archive verification renderer 迁移到 `renderVerificationReportMarkdown`，并继续复用 `renderVerificationArchiveFileReferenceLines`。minimal shard readiness live-read renderer 仍保留本地 `renderLiveRead`，把 Java / mini-kv archived live-read observation 当作 raw lines section 进入 builder。

验证结果：

- `npm run typecheck` 通过。
- focused renderer batch 通过：5 个测试文件、14 个断言。
- 临时 Vitest exact compare 通过：3/3 个 renderer 与 `git show HEAD` 中的迁移前实现逐字节一致。
- `test/governanceGrowthRatchet.test.ts` 已包含在 focused batch 中，确认没有新增 service/route 文件。

本版没有启动 Java、mini-kv 或 Node HTTP 服务，不需要截图归档。Java 和 mini-kv 仍可按各自 playbook 并行推进；Node v2125 不改变证据合同、route、loader、access guard 或真实执行前置条件。
