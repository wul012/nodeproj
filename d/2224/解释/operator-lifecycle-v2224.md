# Node v2224 归档说明

## 改造目标

本版把 operator service lifecycle 的 7 个超长顶层文件迁入
`src/services/operatorLifecycle/`，并按 intake、types、sources、checks、profile、renderer、archive
与 archive checks 划分为 10 个短职责文件。目录承担领域上下文后，公开入口缩短为
`loadServiceIntake`、`loadServiceArchive`、`renderServiceIntakeMarkdown` 和
`renderServiceArchiveMarkdown`，没有保留会继续计入债务的超长兼容 alias。对应两份测试也迁入
`test/operatorLifecycle/`，route 只改变 TypeScript import，不改变任何 HTTP path。

## 行为与数据边界

`serviceSources` 只把冻结 Java/mini-kv JSON 投影为类型化 source；项目内 archive JSON 继续复用
v2223 的 `projectJson`，historical JSON 复用 `historicalEvidenceReportUtils`。`serviceChecks` 依次
组装 source、Java、mini-kv 与 runtime boundary，具名谓词拥有具体安全关系；`serviceProfile`
唯一拥有公共对象键序、endpoint 和 next actions。archive 侧以 JSON、assets、replay 与 boundary
四组谓词表达 37 项检查。旧 178 行、复杂度 88 的主 checks，146 行 loader，以及复杂度 35 的
archive checks 全部消失，没有把热点原样搬进新文件。

固定时间下，local 与 forced fallback 的 intake 仍为 45/45，完整 JSON/Markdown 仍为
15,922/13,748 字节，摘要为 `979c9b8f...168ff` / `ff34aaa9...80c9`；archive 仍为 37/37，
完整 JSON/Markdown 为 12,850/11,147 字节，摘要为 `33f4b2f9...78016` /
`7098c601...e7e1`。改造前后八组结果一致，未修改 fixture 或测试期望。

## 机械改善

目标家族的命名违规从 32 归零；全仓 name debt 从 4,537 收紧至 4,505，其中文件名从
984 降为 977、导出名从 3,553 降为 3,528。维护性基线从 83/98/217/0 收紧到
83/96/215/0，准确删除 2 个长函数和 2 个复杂函数。顶层 service 文件从 1,125 降为 1,118，
route 仍为硬上限 80；52 个受管 family 没有增长。

迁移还暴露 renderer census 只扫描顶层目录的盲点：两个标准化 renderer 进入 bounded context
后，旧脚本错误显示 240/243。discovery 现按 `**/*Renderer.ts` 递归，并由测试明确要求发现两条
嵌套路径，真实结果恢复为 242/245、3 个 composition-only waiver、0 个非豁免。这样未来建立
子目录不会让 renderer 逃出治理面。

## 验证与边界

typecheck、定向零警告 lint、profile/archive/renderer parity、renderer/family census 单测和
governance ratchet 共 7 文件 21 项测试通过；讲解含 3,050 个中文字符和 14 个可扫描章节，七项
静态门通过。Node 没有修改或启动 Java/mini-kv，没有增加网络、
写路径、凭据读取、服务 start/stop、active shard 或 execution authority。没有 HTML/UI 变化，
截图不适用，故按证据经济规则不创建图片目录。完整 repo CI 仍按批次节奏留到 v2227。
