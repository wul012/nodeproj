# v2126 renderer consolidation batch 9

v2126 收掉 archive verification renderer 子集的两个尾项：Java/mini-kv runtime execution pass evidence archive verification 与 fake transport packet archive verification。二者都迁移到 `renderVerificationReportMarkdown`，但保留各自特殊行：runtime pass evidence 继续用 `renderEntries` 展开 archive references，fake transport packet 继续用本地 file/snippet line formatter 表达归档文件和 snippet 匹配。

验证结果：

- `npm run typecheck` 通过。
- focused renderer batch 通过：4 个测试文件、10 个断言。
- 临时 Vitest exact compare 通过：2/2 个 renderer 与 `git show HEAD` 中的迁移前实现逐字节一致。
- 本地扫描确认：`*ArchiveVerificationRenderer.ts` 中没有剩余文件缺少 `verificationReportBuilder`。

本版没有启动 Java、mini-kv 或 Node HTTP 服务，不需要截图归档。Java 和 mini-kv 仍可按各自 playbook 并行推进；Node v2126 不改变证据合同、route、loader、access guard 或真实执行前置条件。
