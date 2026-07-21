# v2228 九分终局门与 promotion core/handoff 收敛说明

## 本版解决什么

本版不增加业务能力，而是解决两个会妨碍后续维护的问题。第一，过去的质量门只能保证债务不增长，
不能机械回答“整个仓库是否达到九分点”；第二，promotion archive/handoff 的十五个 Markdown 入口虽然
共用了低层拼接函数，但公共 API、字段顺序、section 规格和 item 展开仍集中在一个 742 行文件中。

## 实现边界

`scripts/nine-point-census.mjs` 组合既有 census，不重新发明扫描器。十二项绝对阈值与四项 foundation
checks 必须全部通过，不做平均分。当前未达标时命令返回非零；为避免中间收敛版本故意制造红 CI，
只在最终达标版把它接入阻塞 workflow。

promotion 层保留原十五个导出。`promotionMarkdown/core.ts` 和 `handoff.ts` 只拥有标题、字段、顺序与
section 数据；`promotionMarkdownEngine.ts` 只拥有 Markdown 文法；原 renderer 文件只把稳定入口转成
spec 再交给 engine。目录表达上下文，因此新 helper 使用短名，没有复制完整业务前缀。

## 行为证明

空 ledger 的输出天然稳定；单 decision 会包含随机 UUID 及其派生 digest，因此直接冻结一次随机 hash
是假证据。Ledger 现在允许注入 ID factory，`buildApp` 允许注入 runtime deps，但默认值仍是原来的
`randomUUID` 与 `createRuntimeDeps`。测试固定 UUID 和时间后，对 manifest 中全部 28 个 artifact 分别在
empty 与 blocked 状态采集 raw payload 字节数及 SHA-256，共 56 个完整表面。

第一次迁移测试只发现 completion verification 的两个 summary 字段互换。修复发生在共享 helper：把
字段显式分成 `Handoff ready` 前后两组；没有修改 oracle。最终全部 56 个摘要恢复，旧 v2199 的十五路
oracle 也继续通过。

## 数字变化与边界

公共 renderer 文件从 742 行降到 151 行，退出 >600 行账本；维护性由 82/89/208/0 收紧为
81/89/208/0。`src/services:renderers` 格式逻辑从 1,681 降到 1,110。name debt 仍为 4,444，family
仍为 52，说明本版没有借重命名、压行或新增第三套结构换取数字。路由、JSON、Markdown、fixture、权限、
网络、写入与执行边界均未变化。

Java 和 mini-kv 可继续各自维护；Node 本版不需要新鲜兄弟项目证据，也不是它们的批准前置。没有页面
或视觉状态变化，因此截图不适用。完整 test/build/smoke/CI 按五版批次节奏留到 v2232。
