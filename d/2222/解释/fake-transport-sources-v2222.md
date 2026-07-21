# Node v2222 归档说明

## 改造目标

本版拆分 740 行 fake-transport upstream echo 服务。旧文件同时拥有 Node v255/v256 投影、Java v103
文本证据、mini-kv v112 receipt 解析、19 项跨项目 checks 和报告组装。改造后，335 行
`src/evidence/fakeTransportEchoReferences.ts` 唯一拥有兄弟项目历史证据；468 行 profile 服务只组合 Node source、对齐判断、
digest、summary 和消息。两份文件均低于维护性阈值，也没有把旧长函数原样搬家。

## 数据与行为边界

v112 receipt 的 identity、source、request、response、runtime 五组标量由有序 `ReceiptFieldSpec` 描述。
cleanup 数量缺失仍为 `-1`；允许执行、联网、读凭据、写存储和自动启动等字段缺失仍按 `true` 处理，
要求上游明确给出安全值才能 ready。Java 与 mini-kv readiness 分解为 identity、shape、cleanup 和
side-effect closure；顶层 checks 使用具名谓词表达请求、响应、凭据、连接、写入和自动启动边界。

历史 evidence metadata 显式采用 `textMode: "raw"`，维持旧 CRLF 文件的 size/digest。中文历史路径改用
Unicode escape 写入源码，运行时值与旧版相同，同时避免终端错误解码把显示乱码再次固化进源文件。

## 等价与维护性证据

固定时间下，本机 raw ready JSON/Markdown 仍为 26,350/25,977 字节；跨平台 `<repo>` 结果仍为
25,240/24,867 字节。local 与 forced fallback 都是 19/19 ready。actions 开启的负向路径仍为 15/19，
并按原顺序产生 `NODE_FAKE_TRANSPORT_SOURCES_NOT_READY` 与 `UPSTREAM_ACTIONS_ENABLED`；四份摘要均与
源码改动前冻结值一致；迁移阶段没有修改测试期望或 fixture。

首轮 Linux CI `29801098105` 随后发现 portable oracle 仍携带 raw 证据文本的 CRLF/LF 元数据。修复没有触碰
生产服务、renderer、fixture 或历史证据文件，只在测试副本中按 LF 重算结构化证据记录的 `sizeBytes/digest`，
然后再规范仓库根路径。Windows 修复后 ready 哈希与首轮 Linux 实际哈希完全一致，证明差异来自测试归一化
模型而非业务输出；ready/blocked 四组长度也全部保持不变。

维护性账本从 84 / 99 / 220 / 0 收紧为 83 / 98 / 217 / 0，准确删除一个近限文件、一个长函数和三个
复杂函数。elegance census 仍为 159 个 family、52 个受管 family；新 `References` family 只有两个成员，
没有触发第三次规则。第 7 全量分片最初捕获 service 文件数 1127 超过 1125：两份纯历史 reference 当时
仍位于 `src/services`。修复没有抬高 ratchet，而是迁入仓库已有 `src/evidence`，整片复跑通过，最终
service/route 为 1125/80。
定向 typecheck、lint、6 文件 22 项测试及全部静态门通过。

## 安全、并行与停止条件

本版没有修改 route、renderer、fixture、执行权限、凭据、网络、存储或自动启动行为。Node 只读取已冻结
Java v103 与 mini-kv v112 证据，两项目推荐并行且工作树未被触碰。无 HTML/UI 变化，因此不创建截图。
归档与讲解完成后，八个有界分片最终覆盖 579 个文件、1,764 项测试并全部通过；独立 discovery 得到同一
579/1,764 集合且重复为 0。第 2 分片首次只因 300 秒外层预算到期，专属 PID 12104 测试树清理后在未修改
单测 timeout 的条件下重跑通过。TypeScript build 通过。受保护 HTTP smoke 的 health 与 metrics 通过，
未匹配策略的 release readiness 正确返回 403；v2222 JSON/Markdown 返回 200、19/19 ready，同时保持
execution=false、connectsManagedAudit=false。smoke PID 22556 已停止，43122 端口和日志已清理。远端
Node Evidence CI 首轮已执行并只在 portable oracle 上失败；根因修复的远端复验待本维护提交推送后执行。
