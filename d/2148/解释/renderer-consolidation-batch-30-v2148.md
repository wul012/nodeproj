# v2148 renderer consolidation batch 30

本版继续 N1 renderer consolidation，迁移 controlled read-only shard preview live-read-only-window 链上的五个相邻 Markdown renderer：

- operator evidence fresh sibling intake
- operator evidence value supply envelope
- operator evidence value supply approval packet draft
- operator evidence value supply approval packet review
- operator evidence value supply signed approval template

这五个 renderer 都只是把已经存在的只读治理对象输出成 Markdown。v2148 没有新增 route、service、schema、证据链、真实执行能力或批准能力，也没有读取 Java/mini-kv 的新工作树产物。验证脚本强制使用历史 fixture fallback，因此 Java 和 mini-kv 可以继续并行，不需要等待 Node 批准。

工程变化集中在三个点：

1. 这五个 renderer 改用 `renderVerificationReportMarkdown` 作为标题、meta 和 section 外壳。
2. 三个重复的 Evidence Files h3 detail block 收敛到 `renderVerificationResolvedEvidenceFileDetailLines`。
3. 对旧版 h3 helper 自带末尾空行的 section，使用 `trimVerificationTrailingBlankLine` 保持旧 Markdown 间距字节不变。

已完成的直接验证：

- 五个输出 pre/post SHA-256 和长度完全一致，mismatch 为 0。
- 聚焦 Vitest：6 个文件 / 33 个测试通过。
- `npm run typecheck` 通过。

最终 closeout 还会继续补跑 ratchet、代码讲解质量门、lint，并在 evidence summary 中回填结果。
