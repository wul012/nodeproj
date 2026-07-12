# v2197 归档证据引擎重构说明

## 这版解决什么

三个归档验证服务各自保存了一套相同的文件基础设施：拼接十一条路径、读取原始字节、计算
`byteLength` 与 SHA-256、去除文本 BOM、解析 JSON、列出固定顺序的证据文件，并从未知对象中
安全取值。复制已经出现第三次，继续保留会使任何摘要修复都必须同步修改三处，也会增加换行
规范化误入生产证据路径的风险。

v2197 新增 `src/evidence/archiveEvidenceEngine.ts`，只收拢上述纯文件能力。它位于 evidence
边界而非 services，也使 `src/services` 文件数继续满足 1125 的治理上限。三个消费者仍分别拥有
来源字段映射、冻结证据重放、业务 checks、summary、profile 和 Markdown renderer。因此这是去重，
不是把三份业务文件拼成一份巨型服务。

## 字节机理

引擎先用 `Buffer` 计算文件摘要和长度，再以 UTF-8 读取用于 JSON/文本分析的内容。BOM 只从解析
文本中移除，CRLF 不转换为 LF；报告继续诚实描述磁盘上的原始证据字节。现有历史回退工具会规范化
换行，语义不适合本链，所以没有复用。缺失文件返回 `exists=false`、零长度与空摘要，坏 JSON 返回
`null`，消费者原有的失败关闭检查保持不变。

## 命名和维护结果

第三个超长内部文件族改为 `liveGateArchiveVerification.ts`、`liveGateArchiveRenderer.ts` 和
`liveGateArchiveVerificationTypes.ts`，对应导出全部缩短到 40 字符以内；旧路径没有兼容壳。
名称债务由 4562 降到 4549，其中文件名减少 3 项、导出减少 10 项。受控 family 仍为 52 个，
`services:verification` 保持 98，没有为了短名制造第三个 `proof` family。

## 已完成验证

引擎单测覆盖 BOM、CRLF、原始摘要、文件顺序、缺失文件、坏 JSON 与窄类型转换。五个直接相关
测试文件共 13 项通过，TypeScript 和 lint 通过。六个旧版响应基线在当前混合、raw Git/LF 和
Windows CRLF 三种隔离检出树中全部通过；每种输入由三个 JSON profile 的 154 条摘要/长度信号
识别，未知指纹继续抛错。

第一次全量测试通过 559/560 个文件、1705/1706 项测试，唯一失败是 services 文件数 1126 超出
1125 的原治理上限。没有修改测试或上限，而是把纯引擎移入 `src/evidence`；治理单测随后 2/2
通过。修正后的最终全量为 560 文件、1706 测试全部通过，耗时 915.57 秒。build、安全扫描、
renderer、source-size 与 archive budget 通过；端口 31197 的 health 和六个目标 HTTP 表面均为
200，PID 3632 已停止，端口与日志均清理。远端 CI 仍待提交后确认，本文件不提前宣称远端完成。

本版没有新增或改变 UI、HTML 或视觉状态，因此不创建空图片目录。最终机器证据持续写入
`d/2197/evidence/archive-engine-v2197-summary.json`。
