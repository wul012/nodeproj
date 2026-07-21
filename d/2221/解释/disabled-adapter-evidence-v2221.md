# Node v2221 归档说明

## 改造目标

本版拆分 691 行 disabled-adapter upstream echo 服务，并把 mini-kv v111 的重复 JSON 标量读取迁入
已有 `mapReceiptFields`。旧文件同时拥有 profile 编排、Node source、Java/mini-kv evidence、底层 JSON
helper、readiness、checks 和消息，任何 receipt 字段变动都要穿过整份文件。改造后 profile 服务为
412 行，`src/evidence/disabledAdapterEchoReferences.ts` 为 345 行，两者都只拥有一类知识。该纯历史来源模块在
v2222 批次治理门复核时归入仓库既有 `src/evidence` 边界，避免增加顶层 service 文件数。

## 数据与行为边界

evidence 模块拥有 Java v102 与 mini-kv v111 路径、evidence/snippet、字段规格和 readiness。profile 服务
继续拥有 Node v252/v253 source、17 个 checks、digest、summary、blocker/warning/recommendation 与公开
renderer re-export。v111 同构标量按 source/request/response/boundary 五个有序规格组读取；receipt root
优先于 nested 的七个兼容字段仍显式使用 `??`，所以 false、0 和空字符串不会被 `||` 错误覆盖。

`historicalEvidenceReportUtils.evidenceFile` 新增可选 `textMode: "raw"`，默认 normalized 行为不变。该报告
显式选择 raw，保持旧版对 CRLF 文件的 size/digest 语义；单元测试同时证明默认 LF/CRLF 规范化和 legacy
raw 模式。第一次 oracle 失败还定位出 restore 字段的属性插入顺序，最终把字段规格分成 restore 前后两段，
恢复完整 JSON 与 Markdown 摘要，没有修改期望值。

## 等价与维护性证据

固定时间的 Windows 原始路径输出仍为 JSON 22,564 字节、Markdown 22,177 字节及原摘要。跨平台测试把
repository root 规范成 `<repo>`：local 与 forced fallback 均为 17/17 ready，JSON/Markdown 保持
21,502/21,115 字节；actions 开启时仍为 13/17，并按顺序产生 `NODE_SOURCES_NOT_READY` 与
`UPSTREAM_ACTIONS_ENABLED`，blocked 输出保持 21,818/21,284 字节。3 文件 14 项 focused 测试通过。

维护性账本从 85 / 100 / 223 / 0 收紧为 84 / 99 / 220 / 0，准确删除一个大文件、一个长函数和三个
复杂函数。两个新职责文件均无超限函数或复杂函数，未产生导入环。用于对比旧实现的临时 v2220 worktree
与 node_modules junction 已按核验路径删除。

## 安全、并行与停止条件

本版没有修改 fixture、字段默认值、路由、renderer 或执行权限，没有读取真实凭据、发送请求、写存储或
启动任何服务。Java v1881 和 mini-kv 用户文档工作树保持不动，两项目可继续并行。无 UI 变化，不创建
图片目录。完成 lint、静态门、讲解门与版本提交后停止，下一版只迁移 v112 fake-transport evidence。
