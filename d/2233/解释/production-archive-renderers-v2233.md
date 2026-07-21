# v2233 production archive renderer ownership 说明

本版把 production connection archive 与 live probe archive 的 Markdown ownership 从 verification 服务迁到
`verificationReports/productionArchives.ts`。服务继续拥有 profile、checks、digest、messages 与 loader；
renderer 只声明标题、元数据顺序、section 顺序、嵌套 artifact 行和末尾换行，并复用既有 report builder。

迁移前用固定时间、memory audit store 和空 approval ledger 冻结两个 BLOCKED profile。connection Markdown
为 3,535 字节、SHA-256 `d1898d64...36dfae9`；live-probe Markdown 为 3,456 字节、SHA-256
`50a13c57...29883`。迁移后两项完整字节一致，旧期望、fixture 和 normalizer 未修改。connection 的 undefined
仍显示 `missing`，live-probe 仍使用 `unknown`；Artifacts 内 H3 与空行次序不变。

verification family logic 从 1,320 降为 1,146，name debt 保持 4,444，maintainability 保持 73/72/193/0，
52 个受管 family、零个 >800 行源码、零导入环和零 non-waived renderer 均不变。四个聚焦文件 19 项测试、
typecheck、定向零告警 lint 与静态门通过。本版不涉及 UI，截图不适用；Java 与 mini-kv 可继续并行。
