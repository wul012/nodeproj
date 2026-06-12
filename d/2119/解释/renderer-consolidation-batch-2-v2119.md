# v2119 renderer consolidation batch 2

v2119 回到 N1 renderer consolidation 主线，在不改变任何路由、证据 schema、profile loader 或测试期望的前提下，把 10 个 Java / mini-kv route catalog cleanup archive verification renderer 从手写数组拼接迁移到 `renderVerificationReportMarkdown`。

本批次选择的文件都属于同一种稳定形态：meta 块后跟 `Source Report`、`Summary`、`Checks`、`Archive Files`、`Next Actions`。唯一差异是 fresh baseline evidence 原本包含 `Route Catalog` 分区，本版在 builder spec 中原位保留。controlled shard preview、section-array 和 loop-heavy renderer 没有混入本批次，避免把不同结构硬压成同一个迁移模板。

验证结果：

- `npm run typecheck` 通过。
- focused renderer batch 通过：14 个测试文件、16 个断言。
- 临时 exact compare 通过：10/10 个 renderer 使用真实 profile 生成输出，并与旧数组拼接模型逐字节一致。
- `test/governanceGrowthRatchet.test.ts` 已包含在 focused batch 中，确认没有新增 service/route 文件。

本版不启动 Java、mini-kv 或 Node HTTP 服务，不做浏览器页面检查，也不需要截图归档。Java 和 mini-kv 可以继续按各自 playbook 并行推进；Node v2119 不是它们的批准前置条件。
