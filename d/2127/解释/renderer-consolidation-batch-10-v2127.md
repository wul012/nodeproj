# v2127 renderer consolidation batch 10

v2127 继续 N1 renderer consolidation，把 6 个 Java/mini-kv route catalog cleanup evidence report renderer 迁移到 `renderVerificationReportMarkdown`。本版新增 `renderVerificationEvidenceFileReferenceLines`，用于同形的 `id / present|missing / resolvedPath / digest` 证据文件行；版本 guard、release continuity 和 documentation snippet 仍保留本地 lines，避免把业务叙事硬塞进通用 builder。

验证结果：

- `npm run typecheck` 通过。
- focused renderer batch 通过：8 个测试文件、18 个断言。
- 临时 Vitest exact compare 通过：6/6 个 renderer 与 `git show HEAD` 中的迁移前实现逐字节一致。
- `renderVerificationEvidenceFileReferenceLines` 已加入 `test/verificationReportBuilder.test.ts` 覆盖。

本版没有启动 Java、mini-kv 或 Node HTTP 服务，不需要截图归档。Java 和 mini-kv 仍可按各自 playbook 并行推进；Node v2127 不改变证据合同、route、loader、access guard 或真实执行前置条件。
