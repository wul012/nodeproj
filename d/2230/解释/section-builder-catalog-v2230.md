# v2230 controlled-shard section builder catalog 说明

## 目标与非目标

本版处理全仓最长的六个 Markdown section renderer。目标是把 170-217 行的单体入口拆成有序 builder
catalog 与短 section builder，同时保持受控字段子集、section 顺序和嵌套列表逐字节不变。非目标是新增
路由、扩大 profile 输出、连接 Java/mini-kv、放开只读边界或改变任何 readiness 结论。

## 实现

六个公共函数签名和模块路径保持不动。每个文件新增一个短 catalog，按原顺序列出本文件的 section
builder；共 39 个 builder，各自只拥有一个标题和一段字段/列表展开。两个 approval/capture 文件使用短
局部别名消除重复的深层 profile 访问。触及范围最大函数为 `matrixPlanSection`，60 行、复杂度 10。

实现前曾比较“直接把完整领域对象交给 `renderEntries`”的候选输出。两种 profile 状态都不相等，因为
领域对象含有当前 Markdown 刻意不展示的 live/production 字段；该方案在写生产源码前被否决。最终实现
保留原来的显式字段选择，没有字符串路径、动态反射或万能模板。

## 证据与版本切片

ready 与 probes-disabled 两种固定时间 profile 在迁移前后保持相同 JSON/Markdown 长度和 SHA-256；
四个局部 renderer 测试也通过，未修改测试期望、fixture 或 normalizer。maintainability 从
81/89/208/0 收紧为 81/83/208/0，最大函数从 217 降为 171，baseline 只删除六项 stale；name debt
4,444、52 个 family、零导入环和零个 >800 行源码不变。

源码与 baseline 已产生约 2,268 个增删行。继续纳入四个相邻 artifact builder 会让实现、讲解和证据
超过约 3,000 行的单提交审查预算，因此累计净减 10 的目标拆到 v2231 完成。本版不是降低目标，而是
让 renderer 与 composition builder 各自拥有可独立复核的行为证据。

最终验证包含 8 个 focused 文件 16 项、typecheck、全仓零告警 lint、security 18/18、archive、
elegance、family、maintainability、renderer、source-size 与 governance growth ratchet，结果全部通过。

## 安全与并行

本版只改变函数内部组织，不改变 route/schema/权限、网络、写路径或生产执行能力。Java 与 mini-kv 可
继续并行，Node 不要求新鲜兄弟证据。没有 HTML 或视觉交互变化，截图不适用。
