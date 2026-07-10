# v2183 代码讲解：最后十一份完整报告的共享骨架归并

## Goal and Non-goal / 目标与非目标

v2183 的目标不是增加报告，也不是继续延长治理链，而是把 N1 renderer consolidation 剩余清单中真正还承担“完整报告”职责的十一份实现全部归并到 `verificationReportBuilder`。这些文件虽然对应不同历史阶段，有 blocked execution rehearsal、readiness gate、credential resolver decision、input-hardening decision、controlled shard preview 和 local-loopback smoke，但它们的外层工作高度一致：先输出一个一级标题，再输出若干元数据行，随后按固定顺序输出二级章节，最后处理 blocker、warning、recommendation 和 next action。过去每个文件都手工维护这一层数组拼装，使空行、结尾换行和空集合文案分散在十一处。

本版的非目标同样明确。它不修改 loader 如何生成 profile，不改变 route 路径与 HTTP 方法，不重排 profile 字段，不更新 fixture 字节，不改变跨项目证据来源，也不把任何只读边界改成执行能力。Java 和 mini-kv 可以继续各自的计划，Node 不等待新版本证据。本版也不处理最后三个 composition-only profile-section renderer，因为那三个文件没有独立标题和行格式，只负责把两个已经标准化的 section 数组顺序拼接起来。是否豁免需要在 N1 closeout 中形成可机械复现的清单，不能混在本次十一文件迁移中顺手宣布完成。

本次工程切片的实质价值有三层。第一层是删除重复：十一份 renderer 的手工骨架被统一入口替代，源代码净减少两百余行。第二层是集中规则：章节间距、正文前空行和结尾换行从隐式数组位置变为具名配置。第三层是把 N1 的尾部从“多种完整报告混杂三个组合器”压缩成“只剩三个无格式逻辑组合器”，为 v2184 的明确豁免和 N5 大文件治理建立干净边界。

十一份文件放在同一批并不是因为它们名字都很长，而是因为变更责任相同且能被同一种证据关闭。它们都对外返回完整 Markdown 字符串，都包含一级标题与元数据，都在末尾输出检查、摘要和消息分组，并且都已经有可直接构造 profile 的服务测试。相反，三个剩余组合器只返回 section 数组，既没有完整报告头，也没有独立空状态文案。用“是否拥有完整报告合同”划分批次，比按文件年代或目录相邻关系更稳定，也让评审者能用同一组指纹规则复查全部十一项。

## Entry Points / 入口

第一入口是 `src/services/verificationReportBuilder.ts` 的 `renderVerificationReportMarkdown`。它接收 title、meta、sections 和 trailingNewline 四类信息。title 与 meta 负责报告头部；sections 用判别联合区分 entries、messages、list 和 lines；trailingNewline 保存某些历史报告不以换行结尾的合同。v2183 在 section 基础属性上新增 `headingLeadingBlankLine?: boolean`，只解决一个已经由旧输出证明存在的格式差异：部分报告在一个列表结束后立刻输出下一个 `##` 标题，中间没有空行。

这个新字段默认不传，因此旧调用者仍会在章节前插入一个空行。只有 blocked execution rehearsal、readiness gate 和 disabled fake harness preflight 中明确存在紧邻标题的位置传入 false。实现内部先判断“第一个 section 且 meta 为空时，标题前已有 builder 初始化空行”这一既有特例，再判断新字段。两个条件分开表达，避免把第一章节去重逻辑与历史紧凑章节逻辑耦合。`verificationReportBuilder.test.ts` 新增独立样例，直接断言 `- one\n## Evidence` 之间没有额外空行，同时原有 canonical、empty、compact 和 trailing-newline 样例继续通过。

如果没有这个开关，迁移者通常会在前一章节末尾删除或添加空字符串，直到 hash 碰巧相等。那种写法把“下一个标题是否需要分隔”错误地藏在前一个章节的正文数组中，后续重排 section 时很容易失效。现在该决定属于即将输出的 section，自解释性更强。字段名刻意描述 heading 前的行为，而不是使用含糊的 compact 模式，因为同一 section 还可能需要保留 heading 后的正文空行；两个方向必须能够独立控制。

第二入口是十一份 `*Renderer.ts`。常规报告直接把字段映射为 meta tuple，把对象章节映射为 entries，把字符串数组映射为 list，把复杂领域记录映射为 lines。domain helper 并没有被塞进 builder。例如 blocked rehearsal 的 `renderAttempt`、`renderEvidenceFile`、`renderSnippet` 继续掌握字段名称与缩进；credential resolver 的 `formatDecisionField`、`formatNoGoCondition`、`formatEnvHandle` 和 `formatGuardCondition` 继续留在所属文件。builder 只负责报告结构，不理解业务字段，这使共享抽象保持稳定。

第三入口是 `test/rendererMigrationV2183Parity.test.ts`。测试在任何产品文件修改前先运行旧 renderer，冻结十一份输出的 normalized length、SHA-256、标题数量与结尾换行状态。迁移后测试使用同一 loader、同一固定 generatedAt、同一 forced historical fixture fallback 和同一 fake client 再生成结果。它没有通过更新 fixture 或追随迁移后输出建立期望，而是把迁移前事实保存为不可移动的比较基线。

## Response Model / 响应模型

v2183 不改变响应模型。常规报告仍返回包含末尾换行的 Markdown；controlled read-only shard preview 仍保持无末尾换行，因为它由大量 section renderer 组合而成，历史合同就是最后一个 next-action 行结束后立即结束字符串。该报告也是本批最容易被“统一格式”误伤的对象，所以迁移没有强迫它拆成七十多个 builder section，而是让 builder 管理 title、meta 与第一个 Java Preview 标题，剩余已经模块化的 section 数组按原顺序作为 lines 继续拼接。这样既让根 renderer 接入共享骨架，又不重新实现已经稳定的下游 section 协议。

entries 章节继续通过 `liveProbeReportUtils.renderEntries` 处理嵌套值和数组。一个重要细节是 local-loopback smoke 的 targets 与 records 不能直接使用 JavaScript 模板字符串遍历 `Object.entries`，否则数组和对象会变成逗号串或 `[object Object]`。v2183 保留 `renderEntries` 对每个 target/record 的格式化，再把结果作为 lines 交给 builder。这是“抽取公共结构但不偷换值格式”的具体例子。

messages 也分两类处理。大多数报告原来就使用共享 `renderMessages`，因此可以使用 builder 的 messages section，空集合文案保持一致。candidate hardening review 与 input-hardening decision 原来使用带方括号的本地格式 `- [severity] code (source): message`，与共享格式不同。v2183 没有为了代码看起来统一而改变公开文本，而是保留本地小 helper，并把生成结果作为 lines。抽象边界以响应合同为准，而不是以最少函数数量为准。

## Upstream Evidence / 上游证据

本版不需要新的 Java 或 mini-kv 产物。所有涉及 sibling workspace 的同步 loader 都在测试中设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，确保 Windows 本地与 GitHub runner 都读取仓库内冻结证据。controlled shard preview 使用测试 support 中的 fake order-platform 与 fake mini-kv client，返回固定的 Java shard-readiness 和 mini-kv SHARDJSON 结构；local-loopback smoke 使用只实现 health 的两个 fake client，证明迁移只触碰渲染层，不会启动服务或访问真实端口。

本次直接上游事实是 v2182 后的 renderer census：总数 245，标准化 231，未标准化 14。十一份完整报告迁移后重新运行同一脚本，结果变为标准化 242、未标准化 3，h3、forLoop、map、flatMap 四类残余信号全部归零。负向测试把最大允许值设为 2，并要求脚本以 `Renderer census regression: 3 exceeds --max-unstandardized=2` 失败。这说明数字不是说明文档里的自报，而是可以向下收紧、向上失败的机械门。

另一个上游证据是迁移前输出指纹。十一份报告中最小的 local-loopback smoke normalized length 为 5933，最大的 controlled shard preview 为 78413；标题结构从 10 个 H2 到 72 个 H2、14 个 H3 不等。如此大的差异说明不能只用一个“典型报告”推断全部迁移正确。v2183 为每份报告保留独立名称与独立指纹，失败时 Vitest assertion message 会指出具体 case，而不是只给出一个批次总 hash。

## Service Flow / 服务流向

运行时流程仍然是 route 调用 loader，loader 聚合配置、历史证据或只读 client 结果并生成强类型 profile，renderer 再把 profile 变成 Markdown。v2183 只改变最后一步的内部组织。过去 renderer 自己创建从标题到 next action 的完整 string array；现在 renderer 创建 declarative spec，builder 按既定顺序展开。profile 对象没有被重新序列化，loader 也不知道 builder 的存在。

对普通 entries 章节，renderer 把 profile 子对象交给 builder，builder 再调用 `renderEntries`。对领域专属结构，renderer 先调用本地 helper 得到 string[]，builder 只负责在 heading 后放置这些行。对 message 和 list，builder 复用原有 `liveProbeReportUtils`。因此数据流没有增加新的转换层，只是把十一处重复的结构控制收敛到一处。

受控 shard preview 的流程值得单独说明。根 renderer 仍调用 source matrix、handoff summary、route coverage 和 live-read-only-window 四组 section 聚合器；这些聚合器各自又组合更细的 renderer。v2183 没有把整棵树压进一个巨大 spec，而是只接管根标题和 meta，把现有 section 输出原样携带。这避免因重构而扩大到数十个已标准化文件，也符合一次一个主题的版本原则。

## Safety Boundary / 安全边界

第一条边界是字节等价优先于抽象整齐。新增 `headingLeadingBlankLine` 不是视觉偏好，而是由迁移前真实输出推导出的必要控制。若 builder 默认行为已经匹配，就不传该字段；只有旧实现明确没有 separator 时才关闭。这样默认路径保持简单，例外路径有名字、有测试，也不会通过在 lines 中手工塞入更多空字符串来隐藏意图。

第二条边界是不改变测试期望来追随新实现。v2183 parity 的 length、hash、heading count 和 newline 状态全部来自改动前运行。迁移后测试一次通过，说明 builder spec 与旧实现一致，而不是把期望改成了新输出。renderer census 期望从 14 改为 3属于 shrink-only 基线收紧，是计划要求的机械 ratchet，不是为掩盖失败而放宽断言。

第三条边界是保持只读与无执行语义。报告里的 execution allowed、credential read、external request、Java SQL、mini-kv write/admin 等字段仍由 profile 决定，renderer 只输出它们。v2183 没有新增 client 方法，没有打开 probe/action 默认值，没有改 route 方法，也没有接触真实 credential。Java 与 mini-kv 的本地目录未被写入、构建或启动。

第四条边界是把三个组合器留到独立 closeout。它们每个只有十二行，返回值只是两个下游 renderer 数组的展开。给它们强行套 builder 会增加无意义标题或额外中间对象，反而降低可读性。下一版需要用明确 waiver 文件和 waiver-aware census 证明它们属于 composition-only，而不是以“文件很小”为理由逃避迁移。

## Test Coverage / 测试覆盖

第一层是 builder 单测。新增样例覆盖无章节前空行的历史紧凑布局，原有测试继续覆盖四种 section 类型、空状态文案、meta 为空、显式尾部空行、正文紧凑布局、无结尾换行以及多个通用行 helper。它验证共享抽象自身没有回归。

第二层是十一案例 parity。每个 case 都固定 generatedAt，并对可能依赖 sibling workspace 的 loader 强制使用历史 fixture。断言包括 normalized length、SHA-256、H1/H2/H3 数量和 endsWith newline。controlled shard preview 还通过异步 fake client 路径生成完整七十余章节报告，能覆盖组合链的空行与标题顺序。

第三层是原服务测试。十一份对应 test 文件共 35 个测试继续验证 ready/blocked 状态、checks、summary、危险操作保持禁止、route JSON/Markdown 结果和 fake client 行为。parity 回答“文本有没有变”，原服务测试回答“业务对象与安全判断有没有变”，两者职责不同且互补。

第四层是 census 与工程门。census 正向门要求 242/245 标准化、仅剩三个指定组合器；负向门要求最大值 2 时失败。typecheck 检查 section union 与 profile 类型，lint 检查新增 helper 和长行规则，build 检查 ESM import 与产物生成，受控全量 Vitest 在最终收尾阶段覆盖仓库其他 renderer 消费者。整个测试过程固定最多两个 worker，避免再次形成大规模 Vitest worker 树。

两类异步案例决定了本批不能只跑同步 fingerprint。controlled shard preview 会沿着大量 section 聚合器生成七万余字符，单次装载接近一分钟；local-loopback smoke 则依赖两个只读 client 的异步返回。测试把前者固定为仓库 support fixture，把后者固定为 health 响应，并限制 worker 数量。这样既覆盖 Promise 调度与组合顺序，也不会连接真实 Java 或 mini-kv。长耗时是被记录的验证成本，而不是通过放宽 timeout 后忽略断言；若以后拆分这些服务，仍可用相同 case 判断性能变化是否伴随输出漂移。

## One-sentence Summary / 一句话总结

v2183 用一个默认兼容、例外可命名的共享报告 builder 替代最后十一份完整 Markdown 手工骨架，以迁移前冻结指纹和原服务回归证明公开输出与安全边界不变，并把 N1 遗留精确压缩为三个纯组合 renderer。
