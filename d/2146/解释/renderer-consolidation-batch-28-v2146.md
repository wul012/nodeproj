# v2146 renderer consolidation batch 28

v2146 接在 v2145 文档门禁修复之后，正式处理 v2144 留下的复杂 renderer 方向决策。本版选择的路线是：不急着做新的大型 builder 语义，也不把复杂 h3 段落硬拆成 entries，而是先把现有 `verificationReportBuilder` 扩展为可保留旧 Markdown 间距的外层拼装器。

具体改动有两类。第一类是 builder 能力：新增 section 级 `bodyLeadingBlankLine`，默认保持原来的 `## Heading` 后空行；当旧 renderer 本来没有空行时可以设为 `false`。新增 report 级 `trailingNewline`，默认保持旧 builder 的末尾换行；当旧 renderer 本来没有末尾换行时可以设为 `false`。第二类是迁移 5 个 controlled-read-only-shard-preview renderer：type module catalog、stage ledger、runbook、command worksheet、evidence packet。它们都保留本地 h3 helper，只把 title、meta 和 section 组合交给 builder。

这版最重要的验证不是 `toContain`，而是字节等价。迁移前先对 5 个 renderer 的真实输出抓取长度和 SHA-256，迁移后用同样 fixture 重新渲染并比较。结果 5/5 无 mismatch：type module catalog、stage ledger、runbook、command worksheet、evidence packet 的长度和 hash 全部一致。focused tests 也通过：`verificationReportBuilder.test.ts` 和 5 个 controlled-read-only-shard-preview 测试文件共 6 files / 28 tests passed。

迁移后 renderer 统计：总数 245，builder-backed 127，未迁移 118。剩余复杂形态仍包括 h3 48、for 9、map 65、flatMap 59。下一批可以继续沿 controlled-read-only-shard-preview 族推进，因为这次已经证明紧凑 h3 报告能通过 spacing control 保持 byte-identical。

跨项目方面，Java 和 mini-kv 可以继续并行。v2146 不读取新的 sibling evidence，不要求 Java/mini-kv 产出新文件，不启动上游服务，也不修改任何跨项目 schema。开工前快速观察到 Java 最新为 v1807 operator-evidence-value-draft package extraction，提交说明声称 `mvnw verify` green；Node 没有发现需要等待 Java 的 blocker。
