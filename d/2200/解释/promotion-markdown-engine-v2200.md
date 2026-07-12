# v2200 promotion Markdown engine 说明

## 本版解决的问题

promotion archive 与 handoff 的 15 个 Markdown renderer 原本分散在两个内部文件中。每个函数都重复维护标题、空行、字段前缀、章节标题、列表项与最终换行；两个文件还重复导入了大量并未使用的类型。它们对外又通过 `opsPromotionArchiveRenderers.ts` 二次导出，因此维护者需要在三处之间来回跳转，修改一个换行规则时也容易漏掉同族成员。

v2200 保留稳定入口与全部函数名，把公共语法提取到 47 行的 `promotionMarkdownEngine.ts`。稳定模块继续显式列出业务字段和章节顺序，engine 只添加 Markdown 符号与分隔空行。这样做没有把业务模型藏进反射式配置，也没有产生新的 renderer 文件；维护者仍可从公开函数直接读出响应内容。

## 可复现结果

- `src/services:renderers` 从 8 个成员降到 6 个。
- `src/services` 从 1,125 个 TypeScript 文件降到 1,124 个。
- 超过 40 字符的存量命名债从 4,549 降到 4,538，新增长名为零。
- 稳定 renderer 文件 742 行，engine 47 行，均未越过 800 行门。
- 固定时钟后请求 15 个 archive/handoff Markdown 路由，逐一比较字节长度与 SHA-256；新实现命中迁移前在 v2199 上冻结的全部摘要。
- promotion 相关 22 个测试文件全部通过，类型检查与 elegance/family ratchet 通过。
- mixed、LF、CRLF 三种物化各自通过 engine 精确语法与 15 路由字节门；全量回归为 1,137/1,137 suites、1,712/1,712 tests。

## 边界与后续

本版没有修改 route 字符串、JSON 对象、fixture、鉴权、上游证据或 Java/mini-kv 状态，也没有改动既有测试期望来容纳输出差异。截图不适用，因为没有 HTML、页面或可视状态变化。v2200 已完成 mixed/LF/CRLF 本地复核及最终门；提交、标签、推送后进入 v2201，下一版只处理计划中已经选定的 readiness summary 家族，之后按三版本上限硬停等待外部评审。
