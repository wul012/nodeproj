# Node v2217 归档说明

## 改造目标

`opsPromotionArchiveRoutes.ts` 原来在同一文件里逐条注册 28 条 GET 路由，并在线性函数中依次构造
28 份归档工件。代码虽然正确，但路径、工件键、选择器和 Markdown renderer 的对应关系散落在
198 行重复调用中，构建依赖则埋在另一段 152 行局部变量链中。v2217 将前者收束为经过校验的
有序 route manifest，将后者拆成 archive core、handoff、release、deployment 四个具名阶段，
公开注册函数和每请求重新构建工件的语义保持不变。

## 契约证据

源码修改前，新测试因计划中的 `promotionArchive/routeManifest` 尚不存在而失败。实现后，清单测试
冻结全部 28 个 method/path/artifactKey 三元组，并验证数组、条目冻结以及空、缺失、重复路径、
重复工件键、未知工件键的 fail-closed 行为。既有 ops-summary recorder 仍产生同一 46 路由序列和
SHA-256 `7de62deb53695ed355e38286b69ad101453a0d42d00ae7aca08daaa6defc1957`；
15 份固定时间 Markdown 字节摘要保持不变，交接、发布、部署和审计尾链的端到端路由矩阵通过。

## 新职责边界

`artifacts.ts` 只读取 `OpsSummaryRouteDeps` 并沿四阶段有向链构造工件，不知道 HTTP、query 或
renderer。`routeManifest.ts` 只绑定 GET 路径、工件键和对应 renderer，并同时执行编译期全集覆盖
与运行期唯一性检查。原文件只保留 query schema、遍历清单和 JSON/Markdown 响应分支，因此
仍是外部调用者唯一认识的 facade，没有把旧长函数换名搬家。

## 可维护性与安全

原 467 行顶层路由文件降为 54 行，替代模块为 266/245 行；最大替代函数 66 行、复杂度 1，
最高替代复杂度 7。账本由 85/106/226/0 收紧为 85/104/226/0，顶层 route 文件数保持 80。
本版没有修改 schema、响应对象、renderer、fixture、访问策略、网络连接或执行权限，也没有读取
新鲜 sibling evidence。Java 与 mini-kv 可独立并行；没有 HTML/UI 变化，因此不创建截图目录。
