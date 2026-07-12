# v2197 代码讲解：用原始字节引擎收拢三套归档读取链

## Goal and non-goal / 目标与非目标

v2197 的目标不是增加一条新报告，也不是继续堆叠“归档验证的归档验证”，而是偿还已经明确出现第三次的基础设施复制。`artifactIntakeArchiveProof.ts`、`packetStopArchiveProof.ts` 和原本名称很长的 runtime live-read gate archive verification 都要读取十一项本地归档证据。它们过去各自实现路径拼接、文件存在性判断、原始 SHA-256、字节长度、BOM 处理、JSON 容错、嵌套值读取与固定清单排序。三套代码逐行相似，却散落在不同版本链中；任何维护者只改其中一套，都会让同类报告在缺失文件、换行或坏 JSON 上产生不同语义。

本版的非目标同样明确：不改变任何 HTTP 路由，不改变 JSON 字段、Markdown 文案、业务 checks、冻结 fixture 或历史 archive，不引入网络调用，不启动 Java/mini-kv，不执行 runtime packet，也不把来源映射和重放逻辑塞进共享层。引擎只购买一次“如何忠实读取归档文件”的能力。三条业务链仍各自解释证据意味着什么，因此去重没有以制造巨型通用服务为代价。

## Entry Points / 入口与调用关系

共享入口是 `src/evidence/archiveEvidenceEngine.ts`。它导出 `createArchiveEvidenceRefs`、`readArchiveEvidence`、`listArchiveEvidenceFiles` 以及一组窄转换函数。调用者不传 profile 或 config，只传项目根目录和一个 `ArchiveEvidenceSpec`。spec 包含 archive root、basename、code walkthrough、source plan、plans index 与 archive index；引擎据此生成 JSON、Markdown、summary、browser snapshot、HTML、截图、解释等十一项引用。纯 I/O 放在 evidence 边界也使 services 数量保持在 1125 的硬上限内，而不是为共享代码放宽 ratchet。

三个业务入口分别仍是 `loadArtifactIntakeArchiveProof`、`loadPacketStopArchiveProof` 和新的 `loadLiveGateArchiveVerification`。前两项保留已有短名，第三项从超长内部导出改为 31 字符的概念名。`src/routes/auditJavaMiniKvDeclaredOperatorLifecycleRoutes.ts` 只替换导入符号，原有 live-read gate archive route 字符串保持逐字不变。`managedAudit...RuntimeExecutionPacketStopRecord.ts` 的冻结重放调用也改到短入口，但读取的 profile 字段与判断顺序没有变化。

对外可观察入口因此没有迁移。请求仍访问原来的三个长业务路由，Fastify 仍把 loader 结果交给原 renderer。改变的是模块内部怎样获得相同的 archive references，而不是调用方要学习一个新 URL。旧长文件没有留下 re-export 或 compatibility shim，避免名称债务表面下降、实际维护入口翻倍。

## Profile Response Model / 响应与类型模型

`ArchiveEvidenceFile` 只有四个字段：相对 `path`、`exists`、`byteLength` 和可空 `digest`。`ArchiveEvidenceRefs<Root>` 在此基础上固定十一项文件角色，同时用泛型保留每个消费者的字面量根路径，例如 `e/390`、`e/392` 与 `e/394`。这使业务 profile 中的 `archiveRoot` 仍然维持精确字面量，而不是退化为任意字符串。

`ArchiveEvidenceContent` 是解析视图：两个可空 JSON 对象和七段文本。这里故意不包含 `AppConfig`、ready 状态、check 结果或 summary。引擎能说“文件存在、原始摘要是什么、文本能否解析”，不能说“runtime gate 是否可打开”。业务层继续用自己的 `LiveGateArchiveSource`、`PacketStopArchiveSource` 与 `ArtifactIntakeArchiveSource` 把未知 JSON 映射为领域字段，再分别建立 replay、verification record、checks 和 summary。

两个原有 types 模块把重复的 file/ref interface 改成共享类型别名，profile 其余结构不动。第三个 types 模块则把九个内部超长导出缩短为 `LiveGateArchiveSource`、`LiveGateArchiveReplay`、`LiveGateArchiveRefs`、`LiveGateArchiveRecord`、`LiveGateArchiveChecks`、`LiveGateArchiveSummary`、`LiveGateArchiveMessage` 和 `LiveGateArchiveProfile`。响应里的长属性名是既有合同，仍原样保留；缩短的是 TypeScript 概念，不是线上的 JSON 键。

## Upstream Evidence And Config / 上游证据与配置

三条链读取的是 Node 历史归档以及 forced historical fallback 下可定位到的冻结证据。引擎本身不认识 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK`，也不调用 `historicalEvidenceReportUtils`。这个边界很重要：现有 historical helper 服务于跨工作区文本消费，会规范化换行并解析备用路径；本版三个验证器的报告则明确公布本地文件的原始长度和摘要。如果直接复用前者，CRLF 转 LF 后报告虽然更“跨平台一致”，却不再描述磁盘真实字节，属于合同改变。

`archiveRoot` 仍由 loader 的可选输入决定，未提供时取 `process.cwd()`。这保留了生产路由、测试临时目录和隔离 checkout 的三种调用方式。Java 与 mini-kv 在本版没有新鲜证据前置条件，可以继续并行；Node 不读取它们的运行端口、凭据或进程状态。Java v1862 的关闭 CI 只作为 E-track 从属边界观察，不进入归档引擎数据模型。

## Raw-byte model / 原始字节与解析文本为何要分层

`fileRef` 先以无编码方式读取 `Buffer`，使用同一份原始内容计算 SHA-256，并用文件 stat 记录字节长度。随后 `readText` 才以 UTF-8 读取，用于业务字段解析；若首字符是 BOM，只从这个解析视图移除。这个顺序复刻了三套旧实现最关键的机理：报告中的 digest 包含 BOM 与原始换行，而 JSON parser 不会被 BOM 阻断。

CRLF 也不会被替换。Git blob、当前混合工作树和 Windows autocrlf checkout 可能拥有不同原始字节，因此它们合理地产生不同 archive digest；真正必须保持的是旧代码和新代码面对同一证据根时输出完全一致。`readJson` 对空文本和解析异常统一返回 `null`，`readText` 对缺失文件返回空串。业务 checks 继续据此失败关闭，而不是由引擎猜测默认业务值。

辅助函数也保持窄语义。`archiveValueAt` 只沿对象键逐层读取，遇到 null、数组终点或标量就返回 `undefined`；`archiveArray` 只接受真实数组；`archiveStrings` 在数组上过滤字符串；`archiveString` 和 `archiveNumber` 不做隐式转换；`isSha256` 只接受 64 位小写十六进制；`hasAllStrings` 只验证集合包含关系。它们不会把字符串数字变成 number，也不会把大写摘要静默接受，因此共享并未放宽旧链的输入纪律。

## Service flow / 服务流程

一次 artifact intake archive 请求进入 route table 后，调用 `loadArtifactIntakeArchiveProof`。loader 用自己的 `ARCHIVE_SPEC` 调 `createArchiveEvidenceRefs`；引擎按固定顺序建立十一项引用，每项同时记录路径、存在性、原始长度和摘要。`readArchiveEvidence` 再生成解析视图，loader 随后调用 `createSourceNodeV394` 映射来源字段，并调用原有冻结证据 preflight 产生 replay。draft verification、checks、ready 汇总、final verification、blockers、warnings 和 recommendations 的顺序全部未改。

packet stop 与 live-gate 两条链走同一文件阶段，但从 `readArchiveEvidence` 返回后立即分叉。packet stop 提取 stop reasons、packet digest 和六项缺失执行工件；live-gate 提取 plan decision、四项 runtime gate 工件要求与上游归档摘要。共享引擎不知道这些字段，更不会用回调表把不同业务规则伪装成“配置”。这种分界让重复真正减少，同时保留三个服务可单独阅读和调试的领域叙事。

渲染阶段也不进入 engine。`liveGateArchiveRenderer.ts` 仍通过 `verificationReportBuilder` 按原有 section 次序输出 source、replay、archive verification、references、checks、summary 与消息。renderer 只换了类型导入和函数名，字符串、标题与 entry 顺序没有改。artifact 和 packet renderer 完全未动。最终响应仍由各自 profile 的字段插入次序与 renderer 决定，共享层不会重排 JSON 或 Markdown。

## Parity oracle / 六响应怎样证明没有暗改

`test/eleganceHotspotParity.test.ts` 从四个响应扩展到六个：artifact JSON/Markdown、packet JSON/Markdown、live-gate JSON/Markdown。固定时钟仍是 `2026-07-12T00:00:00.000Z`，访问控制头和 forced historical fallback 保持一致。测试保存三份 JSON profile，从所有 `byteLength` 和以 digest 结尾的字段中收集带路径的值，共 154 条信号，排序后形成 evidence fingerprint。

当前混合树、raw Git/LF checkout 与 Windows CRLF checkout 各有一个经过旧版代码预先生成的完整六响应基线。实现完成后，三种树分别运行同一个 parity test，均通过 1 文件、2 测试。测试还明确断言信号数为 154；未知指纹继续在选择输出基线前抛错。这样既证明引擎没有规范化原始字节，也证明六个完整 body 的状态、长度、字段顺序、Markdown 文案和 SHA-256 没有变化。

引擎自己的 `test/archiveEvidenceEngine.test.ts` 使用临时目录构造带 BOM 和 CRLF 的 JSON/Markdown。断言摘要针对原始 Buffer，解析文本去掉 BOM 但保留 CRLF；坏 summary JSON 为 null，缺失 browser snapshot 为不存在、零长度、空摘要；十一项文件顺序逐项固定。finally 删除临时目录，测试不会留下证据垃圾。

## Safety Boundary / 安全边界

本版没有执行能力。`archiveEvidenceEngine.ts` 只依赖 Node 的 crypto、fs 和 path，不导入 config、client、route、audit store、approval ledger 或 runtime shell。它不会解析 endpoint URL，不会发 HTTP/TCP，不会读取 credential value，不会启动或停止 Java/mini-kv，也不会写上游状态。三个 profile 的 `executionAllowed=false`、生产窗口关闭、runtime gate 需要独立批准等字段继续由业务层原样返回。

缺失证据也不会被共享默认值掩盖。文件不存在时 refs 明确记录失败；JSON 无法解析时 source 映射得到旧实现相同的空值；原 checks 会产生 blocker。引擎不提供“best effort ready”开关，也没有环境特判。未知 checkout 指纹不能自动登记，必须重新进行旧新代码同根双跑。安全性来自失败路径可见，而不是假设所有归档都健康。

本版没有 UI、HTML 或视觉状态变化，所以不创建空图片目录。现有 route 会在最终 HTTP smoke 中验证 200 和内容类型；对纯重构而言，六响应完整哈希比一张页面截图更能证明合同未变。临时 LF/CRLF worktree 使用主 `node_modules` junction，验证后整个 worktree 已移除；没有后台服务或 worker 留在系统中。

## Test Coverage / 测试覆盖与故障定位

第一层是 TypeScript 与五个 focused 文件：引擎单测、live-gate 业务测试、六响应 parity、packet-stop archive test 和 artifact-intake archive test，共 13 项已通过。第二层是 lint 与 elegance census：lint 为 0 error、261 个既有 warning；名称债务从 4562 收紧到 4549，文件名从 987 降到 984，导出从 3575 降到 3565，52 个受控 family 不增长，verification 保持 98。

第三层是跨 checkout 对等：LF 与 CRLF 隔离树各限制一个 Vitest worker，避免再制造高并发进程树；两边都通过后立即清理 worktree。第四层是最终全量 Vitest、build、安全扫描、renderer census、source-size、archive budget、HTTP smoke 和远端 CI。第一次全量跑到 559/560 个文件、1705/1706 项测试通过，唯一失败是 governance ratchet 检测到 `src/services` 从 1125 增至 1126。没有提高基线，也没有删无关服务；纯 I/O engine 随即移到 `src/evidence`，让目录所有权和文件预算同时正确。修正后的全量重跑通过 560 文件和 1706 项测试，build、安全、renderer、source-size、archive budget 与七项 HTTP smoke 也全部通过；远端 CI 仍需在提交后确认。

若后续 parity 报未知 fingerprint，应先比较 154 条信号和 checkout 字节，再用旧新代码读取同一证据根；不能直接复制新摘要。若指纹已知但六 body 不同，应检查 engine 路径顺序、BOM/CRLF 处理、renderer 或业务字段，不得新增指纹绕过。若 focused 业务断言失败，应在对应 consumer 修复领域映射，不能把规则推入 engine。三类失败各有唯一责任层，避免“共享代码出了问题”这种无法执行的结论。

## Review map / 评审者快速定位

评审可以按四步走，不需要从三份 loader 的第一行重新读起。第一步看 `archiveEvidenceEngine.ts` 的 import：只有 `node:crypto`、`node:fs` 和 `node:path` 才符合边界；若出现 config、client 或 report type，说明共享层开始吞业务。再看 `ArchiveEvidenceSpec` 与 `createArchiveEvidenceRefs`，十一项角色的顺序应与旧版 archive digest 顺序一致，路径只由 spec 和固定目录构造，不能根据平台或环境变量分支。

第二步看三个 consumer 的 `ARCHIVE_SPEC` 和 loader 前五行。它们都应在取得 refs/content 后立即进入自己的 source mapper，且后续 replay、checks、summary 调用顺序与旧版一致。特别关注 `packetStopArchiveProof.ts` 的 stopReasons 数组仍通过对象逐项读取 code，而 artifact intake 的 missingReasonCodes 仍只接受字符串数组；共享 helper 没有把两种数组语义合并成宽松的任意值转换。

第三步看 `liveGateArchiveVerificationTypes.ts` 与 route diff。类型文件只缩短内部概念，profile 的长字面量状态、ready 字段和 evidence endpoint 结构不应变化；route diff 只能出现 import/function symbol 替换，URL 字符串必须零差异。最后看 parity 表：六项 body 顺序固定，三种 fingerprint 都来自 154 条输入信号，任何表项若缺 status、bytes 或完整 SHA-256 都不足以证明字节等价。

第四步根据失败层回跳。engine 单测失败说明纯文件语义有误；consumer focused 失败说明领域映射或闭锁条件变化；已知指纹下 parity 失败说明最终输出改变；只有未知指纹才需要调查证据物化。这个定位图把评审从“看起来只是重构”转成四个可机械复核的问题，也让未来维护者不必靠文件名猜测责任边界。

## Maintenance tradeoff / 维护取舍与停止条件

共享引擎 167 行，三份 loader 从原来的约 652、639、598 行降到 527、517、485 行；主要减少的是重复 I/O 和解析样板，不是把业务行数隐藏到另一个超大文件。engine 的输入和输出都稳定、无回调、无泛型业务配置，测试可以在临时目录独立运行。新文件与所有新导出均不超过 40 字符，符合生成时购买优雅的规则。

这不是邀请把仓库里所有 archive verification 都迁入同一 engine。只有同时要求原始字节摘要、同样十一项角色、相同缺失/BOM/JSON 语义的消费者才有资格复用；使用历史规范化、snippet 扫描、不同清单或网络证据的模块应保持独立。当前三次重复已经消除，增长在此停止。E-track 最多五版，v2197 是第四版；版本边界必须再次检查 Java 最终关闭状态，再决定先跑 capstone 还是进入 v2198 终局 census，不能无界继续美化。

## One-sentence summary / 一句话总结

v2197 用一个不懂业务、忠实保留原始字节的归档证据引擎替换三份复制，同时以三种 checkout 下六个完整响应的旧版基线证明：维护入口更少了，运行合同一个字节也没有放松。
