# v2130 renderer consolidation batch 13

v2130 延续 v2129 的 prerequisite-chain renderer consolidation，把 Endpoint Handle Allowlist Approval 和 Signed Human Approval Artifact 两条相邻审批链的 6 个 renderer 迁移到 `renderVerificationReportMarkdown`。

本版覆盖：
- Endpoint Handle Allowlist Approval contract intake / upstream echo verification / prerequisite closure review。
- Signed Human Approval Artifact contract intake / upstream echo verification / prerequisite closure review。

本版不改 loader、route、type、fixture、access guard 或真实执行开关。共享 builder 只负责标题、meta、section、messages 和 list 骨架；contract 字段、Java/mini-kv evidence files、expected snippets、Java v148 quality split、closure prerequisites 继续保留在本地 helper 中。

已完成验证：
- `npm run typecheck` 通过。
- focused renderer batch 通过：8 个测试文件、30 个断言。
- 临时 exact compare 通过：6/6 个 renderer 与 `git show HEAD` 旧实现逐字节一致。

工程注意：
- 这批文件原始带 BOM，迁移前已做机械规范化为 UTF-8 无 BOM；内容语义不变。
- Signed Human upstream 保留 expected snippets 本地行，没有抽成共享 helper。
- Java 和 mini-kv 可继续并行，v2130 不请求新上游证据。

待最终收尾验证：
- walkthrough 中文质量 gate。
- lint。
- build。
- 删除 `.tmp` 和 `dist` 后提交、tag、push、观察 CI。
