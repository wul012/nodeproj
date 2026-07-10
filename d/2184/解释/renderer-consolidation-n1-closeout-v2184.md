# v2184 renderer consolidation N1 收口说明

本版没有迁移或新增业务 renderer，而是把 v2183 后剩余的三个纯组合文件纳入
可执行豁免治理。原始 census 仍诚实显示 3 个未标准化文件，同时新增豁免数 3
与非豁免数 0，避免用“总数归零”掩盖真实文件结构。

规范清单位于 `docs/plans/renderer-consolidation-waivers.json`，评审视图位于
`docs/plans/renderer-consolidation-waivers.md`。census 使用 TypeScript AST 检查
每个文件只有一个导出函数，且返回值仅由清单声明的两个子渲染器展开调用组成。
任何本地 Markdown、额外语句、调用漂移、过期或新增豁免都会使门失败。

默认命令 `npm run renderer:census -- --json` 同时执行 3/3/0 三道 ratchet。
N1 实现因此完成，但外部 N1-close review 尚未授予；按计划，在评审通过前不开始
N5。Java 与 mini-kv 可继续各自工作，本版不消费它们的新鲜证据。
