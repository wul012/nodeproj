# v2199 family triage 说明

## 本版结论

v2199 把 Round 2 的“处理重复 family”从口头方向变成一条可复现选择链。新命令
`npm run elegance:families -- --json` 读取同一个 shrink-only baseline 和同一个 family
分类器，对 52 个受控 family 计算本地格式逻辑行。它不会把 242 个标准 renderer 的数据配置
误算成算法；现有 renderer AST gate 证明 242 个已标准化、3 个仅组合、0 个非豁免后，该族得分为零。

最终 Top 5 是 renderers 1904、verification 1320、summary 1185、contract 946、packet 868。
import 图和规范化 AST 形状审计后，只选择两个能同时删除重复、缩紧 family 和名称基线、又不破坏
公共路径的族：v2200 处理 promotion renderers，v2201 处理 readiness summary。verification 的
真实重复成员被测试与模块路径钉住；contract 和 packet 只是同后缀，并非同一行为抽象。

## 为什么不是继续改 Renderer

单数 `*Renderer.ts` 族共有 245 个文件，但 242 个已经把格式行为交给通用 builder，剩余三个
只拼接标准子 renderer。继续把这些 wrapper 塞进另一层 engine 只会增加跳转，不会删除格式代码，
正好触发计划中的 inverted-waiver 失败条件。因此 v2199 让 renderer gate 的行为判定优先于 LOC，
避免“文件多就是重复多”的错误结论。

## 下一步边界

v2200 只允许在稳定 `opsPromotionArchiveRenderers.ts` 入口后删除两个内部模块并提取一个短名
engine；v2201 只允许保留 V6-V13 路径、替换内部 V5 模块并共享 Markdown 语法。两版都必须在
push 前完成 mixed、LF、CRLF 三种物化下的精确 body parity；family count 和 name baseline
必须同版下降，否则回退。Java 当前仍在独立 v1863 切片，未触发 capstone；mini-kv 也可独立推进。

本版没有运行时、route、fixture 或报告输出变化，因此不创建空图片目录。机器证据见
`d/2199/evidence/family-triage-v2199-summary.json`，完整选择理由见
`docs/plans/elegance-round2-triage.md`。

## 验证结果

family、elegance、renderer focused 共 3 文件 15 项通过；文档质量首次因 2461 个中文字符被
正确拦截，补齐指标盲区与对抗性自审后 2 文件 8 项通过，讲解为 3471 个中文字符。最终全量
JSON reporter 为 1133/1133 suites、1709/1709 tests，失败为零。typecheck、build、security、
source-size 和 archive 门通过，lint 保持 0 error / 261 条既有预算 warning。`dist`、临时 JSON
和本任务 Vitest workers 已清理；远端 clean-checkout CI 留待 push 后确认。
