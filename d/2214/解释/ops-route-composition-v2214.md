# Node v2214 归档说明

## 改造目标

v2214 只整理 `src/routes/opsSummaryRoutes.ts` 的组合职责。旧入口
`registerOpsSummaryRoutes` 连续注册 summary、readiness、promotion archive、promotion
decision、runbook、checkpoint、baseline 与 handoff 共 46 条记录，函数跨度 239 行。
这些接口本身已经稳定，问题是读者必须在一个长控制流中识别五组不同生命周期的路由，
后续修改也容易把相邻注册顺序、schema 或 handler 搞混。本版不新增功能，不改变任何
HTTP 合同，只把组合根变成可导航结构。

## 契约冻结

生产代码修改前新增 `test/opsSummaryRouteComposition.test.ts`。测试用最小 recorder
代替 Fastify，只截获 `get/post/put/delete` 调用，不执行 handler，也不触碰存储或上游。
占位断言先从旧实现取得 46 条注册记录和摘要
`7de62deb53695ed355e38286b69ad101453a0d42d00ae7aca08daaa6defc1957`。
摘要覆盖 method、path、schema 与调用顺序，重构后保持一致；因此不能靠改测试期望掩盖
路由漂移。现有 ops 测试继续通过真实 `buildApp` 和 inject 验证响应行为，两层证据互补。

## 新组合结构

公共入口现在只有 6 行，依次调用 summary、promotion、runbook/checkpoint、handoff
registrar。baseline 并未被移到调用序列末尾，而是在 runbook/checkpoint 组内原来的位置
调用独立 registrar，所以 checkpoint diff、baseline、checkpoint detail、checkpoint create
的先后关系不变。promotion archive 也仍在 promotion review 与 decision 之前注册。
所有 helper 都留在原文件，类型 `OpsSummaryRouteDeps` 与公共导出路径不变，没有制造新的
route 文件或跨模块依赖。

## 可维护性收益

扫描器测得公共入口由 239 行降为 6 行，五个 registrar 分别为 4、91、80、38、35 行，
复杂度全部为 1。第一次预刷新 census 只报告旧入口这一条 stale，没有 unknown 或 grown；
删除该条后账本从 `85/111/228/0` 收紧到 `85/110/228/0`。顶层 service/route 文件数仍为
1125/80，说明收益来自职责分组，不是把代码搬进额外文件或放宽阈值。

## 安全和并行边界

本版没有修改 access guard、配置默认值、上游 probe、ledger 数据、fixture、响应 renderer
或执行开关。handler 仍闭包捕获同一个 `deps`，所有读写能力与旧实现一致；重构本身没有
启动 Java、mini-kv 或 live capstone。Java 与 mini-kv 可继续独立并行，Node 没有读取或
写入它们的工作树。没有 HTML/UI 改动，因此不创建截图目录。

## 验证次序

旧实现先红后冻结，重构后 route oracle、代表性接口 5 文件 11 项测试、完整 ops 矩阵、
typecheck、定向零告警 lint、治理与 census 4 文件 18 项测试均通过。中文代码讲解先于
批末全量验证写入；随后 v2211 至 v2214 统一执行全仓零告警 lint、静态门、受限 worker
测试分片、独立发现、build、historical fallback HTTP smoke、推送与远端 Node Evidence。
最终 8 个分片在最多 4 个 worker 下覆盖 574 个唯一文件、1,746 项测试，全部一次通过；
独立 discovery 得到相同数字，build 通过。强制 fallback 报告的 Java 与 mini-kv 路径都
位于冻结 fixture，18/18 检查通过；preview 保持 probes-disabled、blocked、execution=false、
connectsManagedAudit=false，ops summary/readiness 均返回 200。smoke PID 30712 已停止，
31214 端口已释放，远端 Node Evidence 留到推送后最终核验。
