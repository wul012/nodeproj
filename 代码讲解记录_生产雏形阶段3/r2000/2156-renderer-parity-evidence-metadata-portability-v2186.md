# v2186：相同长度为何仍会失败，以及怎样一次扫完十一份报告

## Goal and Non-goal / 目标与非目标

v2185 已把带 Java/mini-kv 版本前缀的 resolved path 归一为 `<repo>/fixtures/...`，Windows 与 LF checkout 的候选门报告都得到相同长度和哈希。replacement CI 因而越过了上一轮 6172/6152 的长度失败，却在同一 v2183 parity 的 readiness gate 上停住：两端长度同为 13601，sha256 分别是 `6e0a...` 与 `da0d...`。这说明第一处修复真实生效，同时也说明还有固定宽度的动态内容没有纳入规范化。

本版目标有两层。第一层是定位并规范化这个固定宽度字段，且规则必须适用于同形 evidence metadata，而不是写死某个哈希。第二层是改进诊断方式，让十一份报告在一次测试运行中全部执行，避免第一份失败遮住后面的漂移。非目标仍然是产品行为：`src/`、fixtures、路由、loader 和公开 Markdown 都不改；也不借 CI 修复进入 N5。外部 N1-close review 仍是下一检查点。

两次远端失败构成一条完整因果链，而不是两个互不相关的问题。第一次在长度门停止，只能看到路径根差异；路径修复后，测试继续走到 readiness hash，才暴露等宽元数据。若第一版就使用 soft assertions，两个问题可以在一次运行中同时出现。v2186 因此不仅修字段，还修“失败信息被短路”的测试结构，目标是让下一次跨平台问题在本地 LF 扫描中一次显形，而非继续消耗远端版本号。

这也形成新的推送检查点：当共享 normalizer 因 CI-only 漂移发生第二次修改时，不能只重跑触发失败的单一报告；必须让所有同批 parity 案例在模拟 runner checkout 中走到末尾，并保留一次全量差异清单。只有清单为空才允许 replacement push。这个要求不依赖某个版本号，后续迁移批次遇到路径、摘要或换行差异时都可复用，从流程上阻止“修一处、远端再揭一处”。

## Entry Points / 入口

远端入口是 Node Evidence 运行 29075301137。它在 Test 步骤执行全量 coverage，最终统计为 544 个测试文件中 543 个通过，1657 项测试中 1656 项通过；typecheck 与 lint 已绿，build 与 safe smoke 因前置失败被跳过。失败发生在长度断言之后的 hash 断言，这个位置把调查方向从路径长度和换行数量收窄到“内容不同但宽度相同”。

本地入口仍是 `rendererMigrationV2183Parity.test.ts` 和 `rendererMigrationParityUtils.ts`。前者构造十一份报告并冻结规范化指纹，后者消除机器环境噪声。专用测试文件新增 evidence metadata 案例，直接输入两组不同 size/digest。为验证 Linux 现实而非手写样本，还保留 detached `core.autocrlf=false` worktree，将修复后的三份测试文件同步进去后运行完整 v2183 parity。

这里特意同步“修复后的测试文件”而不改临时 worktree 的产品源码。worktree 固定在远端失败提交，保留 LF 产品与 fixture 现实；主仓提供待验证的新 normalizer、单测和指纹。这样一次运行同时回答两个问题：旧产品在 LF 环境会生成什么，以及新测试工具能否正确识别它。若直接在临时 worktree 提交产品改动，环境与修复会混在一起，无法证明 `src/` 零变化。

## Response Model / 响应模型

readiness gate 的相关输出是一个缩进 evidence block：先有证据 id，再列 path、exists、sizeBytes 与 digest。Windows checkout 中目标 JSON 为 7256 字节，LF checkout 为 7255 字节；两个十进制值都占四个字符。sha256 无论内容如何都固定为六十四个十六进制字符。因此整份 Markdown 长度完全相同，只有内容哈希不同。长度门没有失效，它准确告诉我们差异不是增删字符，而是等宽替换。

测试规范化后，这两行保留字段名和缩进，只把值改成 `<bytes>` 与 `<sha256>`。证据 id、path、exists 与周边 section 不变，所以不同证据文件仍可区分；只有由 checkout 换行风格决定的物理字节信息被视为机器噪声。blocked rehearsal 也包含同形元数据，因此它的规范化指纹一并变化；soft assertion 运行证明其余九份报告没有命中新的规则。

新指纹不是从 CI 失败值照抄。blocked rehearsal 收敛到长度 15285、sha256 `916256...16a2`；readiness gate 收敛到长度 13282、sha256 `aa830c...df1b2`。这些值由主工作树和 LF worktree 使用同一规则各自生成，并在完整十一报告测试中共同验证。

物理元数据与语义元数据的界线也在这里明确。path 的 fixture 相对部分、evidence id、exists 状态和匹配到的 snippet 数量会影响系统判断，必须保留；文件字节数与内容摘要在本项目的历史 fixture fallback 中会因 checkout 换行改变，却不表示证据选择或业务结论变化，所以测试表示可以 canonicalize。若未来 digest 来自上游签名而不是本地文件字节，它就属于语义字段，不应套用缩进 evidence 规则。

## Upstream Evidence / 上游证据

逐行比较使用 v2185 时建立的协议：两个环境分别渲染、规范化，再把完整 UTF-8 Markdown 编成 base64，回到同一 PowerShell 进程解码并按 LF 分行。readiness gate 只有第 148、149 行不同。第 148 行是 sizeBytes 7256/7255；第 149 行是两个不同的 64 位摘要。前面的 path 与 exists 相同，后面的 snippet matches 也相同。根因因此不是 V8 coverage 改写输出，也不是 normalizer 的路径规则误吞内容。

差异对应 `mini-kv-v101-follow-up` fixture。Git blob 在 Windows 工作树中以 CRLF 落盘，在 `core.autocrlf=false` worktree 中以 LF 落盘，文件大小相差一个字节，内容摘要随之变化。Node 报告忠实展示现场字节与摘要是正确产品行为；迁移 parity 要比较的是 renderer 结构和业务字段，因此测试表示需要把这类物理属性 canonicalize。mini-kv 本身没有被启动、修改或重新生成 fixture。

逐行结果还排除了一个容易误判的方向：coverage 插桩。V8 coverage 会改变代码加载与统计，但不会修改被读取 JSON 文件的字节。如果插桩是根因，普通 LF probe 与 CI 可能产生不同结果；实际上 LF probe 精确复现了 CI 的 `da0dd...` hash，说明 checkout 文件已经足以解释失败。聚焦 coverage 仍需运行，是为了验证 normalizer 在插桩模式下无副作用，而不是把 coverage 当成根因。

## Service Flow / 服务流向

`normalizeRendererMigrationMarkdown()` 原先已处理两类同义数据：紧凑 JSON 中的 `sizeBytes/digest`，以及单行 `bytes=...; digest=...`。遗漏的是 Markdown evidence block 使用的两行形式。新增规则分别匹配行首任意空白加 `- sizeBytes: 数字`，以及相同缩进下 `- digest: 64位小写十六进制`。`m` 标志让 `^`、`$` 按行工作，`g` 标志覆盖一份报告中的多个 evidence block。

替换只改捕获组后的值，字段名、缩进和换行全部保留。digest 规则要求恰好六十四位十六进制，普通短 id、状态码或说明文字不会命中；sizeBytes 规则要求整个行尾只有数字，类似“sizeBytes mismatch”不会被吞掉。两个规则复用现有 token 词汇，与 JSON 形式的 `<bytes>`、`<sha256>` 保持一致，避免同一概念出现多套占位符。

v2183 测试循环的六项断言改用 `expect.soft`。每份报告仍检查长度、hash、三级标题数和 trailing newline，断言数量没有减少；区别是某一份报告失败后，Vitest 会继续执行后续报告并在测试结束时汇总全部 soft errors。第一次运行因此一次报告出 blocked rehearsal 与 readiness gate 两组指纹变化，同时证明另外九组不受影响。

soft error 的生命周期很重要：它只延迟当前测试用例内的抛出，不把失败转成 warning，也不允许后续测试文件忽略结果。循环结束后，Vitest 将四条指纹差异列为同一个失败测试下的四个 assertion errors，进程退出码仍为一。修完两组指纹后，退出码才归零。相比临时 `console.log`，soft assertions 是可长期保留的诊断能力，未来任何多报告漂移都能一次呈现。

## Safety Boundary / 安全边界

本版最硬的边界是 `git diff -- src fixtures` 必须为空。原始报告继续展示真实 sizeBytes 和 digest，便于运维人员审计；只有 test utility 生成的比较表示使用 token。若把 token 写入 renderer，现场证据会失真，那不属于本修复。专用单测还把两组不同物理值归一后比较，并断言准确输出两行 token，防止规则只碰其中一项。

soft assertions 也不是放宽。普通 `expect` 在第一处失败时中止循环，可能让一次 CI 修复后再暴露第二处；`expect.soft` 保留失败状态，只延迟抛出以收集完整差异。任何一个 hash、长度或章节断言不满足，测试文件仍退出一。它提高诊断完整性，不提高可通过范围。

另一个边界是没有把所有 `digest:` 文本无条件替换。规则必须是缩进 bullet、固定字段名和严格 64 位值。业务段落中的决策 digest 若不是机器派生，仍参与指纹。normalizer 的增长停止条件也明确：修复后的完整十一报告 parity 已在 LF worktree 一次通过；后续若出现新字段，应先证明具体跨平台来源，而不是预先泛化更多 Markdown。

两个冻结指纹的更新也受边界约束。只有 normalizer 命中的规范表示变化，H1/H2/H3、末尾换行和另外九份 hash 都保持原值；`git diff -- src fixtures` 必须为零。证据记录旧值、新值、触发规则和双环境结果，评审者能判断这是测试表示迁移，而不是为了接受新的产品 Markdown。若产品源码有一行变化，这个论证即不成立，版本应退回重新分类。

## Test Coverage / 测试覆盖

专用测试现在有四项：Java versioned path、mini-kv versioned path、非路径状态保护、缩进 size/digest 成对归一化。v2179 与 v2183 parity 是两项集成测试，内部分别运行六个和十一个案例。主工作树三文件六测试通过后，相同测试与 normalizer 被复制到 LF worktree，再次得到三文件六测试全绿；这一步直接覆盖远端 checkout 风格，并且 soft assertions 确认十七个案例全部走到末尾。

第一次完整套件也提供了额外的反证能力：它没有笼统地出现大量旧批次失败，而是只指出 v2179 的 `minimalReadOnlyIntegrationOperatorCiRegularGateHandoff` 一例长度与哈希变化，另外五例的六项断言均保持原值。该报告命中的同样是缩进 evidence metadata，因此先把 v2179 循环改为 soft assertions，聚合运行确认完整影响面，再更新规范化长度 8831 与哈希 `eb7e4a...2569`。这里更新的是共享 normalizer 输出的冻结指纹，不是 renderer 原文期望；标题计数、末尾换行、产品源码和 fixture 都没有变化。第二次 Windows/LF 聚焦运行共同通过，证明这份更新不是只适配当前工作树。

正式收口还要跑聚焦 coverage 模式。子集命令会把四项全局覆盖阈值临时设零，只用于验证 V8 插桩下断言；仓库 coverage 配置不改。随后执行文档质量门、typecheck、0 error/263 warning lint、build 和固定两 worker 的完整套件。提交后 replacement CI 必须通过全仓正式覆盖率、build、health、metrics 与 release-evidence smoke，才可把 CI repair 标为完成。

固定两 worker 的未分片全量命令运行到 3604 秒时，被外层一小时预算终止。终止前没有 assertion、失败文件或 worker 崩溃输出，终止后按命令行与父子关系检查也没有本任务 Vitest 进程残留，所以这次结果既不记通过，也不记测试失败，更不能靠提高超时掩盖。仓库所用 Vitest 4.1.8 原生提供确定性 `--shard`，因此同一测试集合改由八个分片顺序执行，每片仍限制两个 worker，并为每片保留独立退出码。

八片各覆盖 68 个文件，文件数合计 544；测试数依次为 202、187、215、247、200、200、197、210，合计 1658。八个退出码全部为零，Vitest 报告时长合计 3324.71 秒。分片没有使用 `--changed`、文件过滤或跳过标记，因此不是缩小回归面；它只是把一个超过外层命令预算的不可观测长进程，改成八段可审计的完整分区。最后一片输出的三条 renderer census regression 是负向测试对子进程失败消息的刻意断言，分片整体退出码为零，不属于遗留错误。

完整套件不能被 LF 三文件测试替代。normalizer 是多个历史 renderer migration 批次共享的工具，通用 size/digest 规则可能改变其他报告的指纹；soft assertion 本地运行已证明 v2183 只有两份变化、v2179 只有一份变化，但其余历史批次仍需全仓覆盖。固定两 worker、八个确定性分片组成的普通套件负责这一回归面，远端 coverage 则再次执行所有阈值。两层都绿，才能说明通用规则没有扩大到未预期报告。

最终接受矩阵因此有四格：Windows 聚焦证明开发机基线，LF 十一报告证明 checkout 可移植，聚焦 coverage 证明 V8 插桩兼容，远端全量证明正式覆盖率与 smoke。任一格失败都保留独立含义，不能用其他三格替代；只有四格全绿，v2186 才结束并回到外部 N1-close review。

即使 replacement CI 全绿，它授予的也只是技术流水线结论；N1 的最终评审仍需外部 reviewer 独立检查清单与证据，Node 不能自行把 pending 改成 pass。

在评审结论返回前，功能与 N5 拆分都保持停线。

清理同样纳入验证：LF worktree 的 node_modules 是 junction，移除时必须先安全删除 reparse point，不能递归跟随到主仓依赖；coverage、dist 和临时目录在提交前清空；本任务启动的 Vitest 进程必须为零。第一次 junction 清理曾导致主 node_modules 变空，本轮已通过 `npm ci` 恢复，并会使用非递归 .NET junction 删除避免重复。

依赖恢复有独立证据：清理异常后 `node_modules` 目录仍存在，但 `.bin/tsx.cmd` 与 `vitest.mjs` 均不存在，目录项计数为零；这排除了 PATH 问题。`npm ci` 按 lockfile 恢复 198 个包，随后主仓和 LF worktree 的聚焦测试都能启动。最终清理将先调用不递归的 `Directory.Delete` 删除 junction 本身，再让 `git worktree remove` 处理普通文件，最后复核主仓两个可执行入口仍存在。

## One-sentence Summary / 一句话总结

v2186 将等宽的 evidence size/digest 平台噪声规范为统一 token，并用 soft assertions、Windows/LF 十一报告全跑和严格边界证明修复提升的是跨平台诊断可信度，而不是放宽产品输出契约。
