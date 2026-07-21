# v2229 promotion release/deployment 规格化说明

## 目标

v2228 已把 archive/handoff 十五个 renderer 从一个近限文件中拆出，但 release/deployment 链尾仍有
三个 319-373 行模块直接维护 `lines` 数组。v2229 把 release evidence/archive、approval/change、
execution record/receipt 及其 verification 全部迁入同一 spec/engine 模式，保留旧模块路径和导出。

## 结构

`promotionMarkdown/stage.ts` 在第三组相似文档出现前建立共享边界：decision 与 summary 的共同前缀、
普通 item、带 detail 的 item 以及对应 verification item。它只接受类型化对象和调用方显式提供的字段，
不通过字符串路径读取数据，也不推导 ready/valid。`release.ts`、`approval.ts`、`execution.ts` 保留每个
artifact 的标题、字段顺序、checks、summary 和领域 digest label。

三个旧 renderer 模块各从 319/339/373 行降到 37 行，只把原参数交给对应 spec 和
`renderMarkdownSpec`。已有测试直接导入这些路径，因此没有删除兼容入口；主 barrel 与 route manifest
也无需改动。

## 证明与收益

固定时间、固定 UUID 下，empty 与 blocked 共 56 个 raw payload 的 byte length + SHA-256 一次保持
一致；旧 v2199 十五路 oracle 与 release/deployment 三组领域测试同步通过。测试期望、fixture、
normalizer、路由和权限均未修改。

候选 index 还分别物化为纯 LF 与纯 CRLF 工作树，两份都通过新 56 路和历史 15 路原始 payload
oracle；当前 mixed 工作树此前已通过同组检查。全仓 typecheck、零告警 lint、security、archive、
elegance、family、maintainability、renderer 与 source-size 门均通过，临时物化目录和 junction 已清理。

family logic 从批次起点 1,681 降到 v2228 的 1,110，再降至 247，`renderersLogic <=700` 已转绿。
维护性保持 81/89/208/0，说明规格迁移没有制造长函数或复杂函数；新文件最大 505 行，没有近限文件。
name debt、family、导入环与源码尺寸均不增长。Java 与 mini-kv 可并行，本版无 UI，截图不适用。
