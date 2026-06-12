# v2120 renderer consolidation batch 3

## Goal and Non-goal / 目标与非目标

v2120 的目标是继续推进 N1 renderer consolidation，把第三批 no-helper archive verification renderer 收进 `renderVerificationReportMarkdown`。这一批比 v2119 更厚一些，因为它不再只覆盖一个完全同构的 Java / mini-kv cleanup 小族群，而是把剩余 6 个 Java / mini-kv route catalog cleanup archive verification renderer 和 4 个 managed-audit credential resolver archive verification renderer 放在同一个批次里。这样做的依据不是“业务名字相近”，而是它们都能被同一类 builder section 精准表达：meta 行保持原顺序，普通对象继续走 entries section，生产阻断、警告、建议走 messages section，nextActions 走 list section，archiveFiles、archiveReferences、snippetMatches 这类已经是格式化字符串的内容走 raw lines section。

非目标同样要写清楚。第一，本版不改 profile loader，不改 route handler，不改 access guard，不改 evidence schema，也不改任何测试期望。第二，本版不把带本地 helper 的 disabled runtime shell draft renderer、minimal integration renderer 或 sandbox handle review renderer 混进来，因为那些文件虽然也叫 archive verification，但内部有 helper 函数和更多局部整理逻辑，需要单独批次判断 helper 是否保留、是否提升、是否折回 service。第三，本版不启动 Java、mini-kv 或 Node HTTP server；所有验证都在本地 profile 和测试进程中完成。第四，本版不扩大 builder 能力。`verificationReportBuilder.ts` 已经支持 entries、messages、list、lines 四种 section，当前迁移只把旧数组模型映射到这些能力，不新增第五种 section，也不让 builder 知道业务概念。

这一版的工程价值在于继续把重复 markdown 拼接从 renderer 文件里拿掉，同时保留可审查边界。Java cleanup 侧收掉了 latest sibling evidence、latest sibling live smoke、route archive verification、route archive verification 的再 verification、twenty-version closeout 和 verification checklist 这 6 个剩余 archive verification renderer。managed-audit 侧则选了 fake shell archive verification、active shard plan boundary handoff intake、active shard plan evidence intake、completed shard readiness evidence intake 这 4 个无本地 helper 的文件。这样批次既有足够工作量，又没有把高风险 helper renderer 贸然纳入。

批次选择过程本身也值得记录，因为它会影响后面几十个 renderer 的迁移质量。我先按 `*ArchiveVerificationRenderer.ts` 收集还没有使用 builder 的文件，再标记是否存在顶层本地 helper、是否存在 section-array、是否存在 renderMessages/renderList/renderEntries。剩余 Java cleanup archive verification 数量不足 10 个，所以 v2120 没有硬凑别的 cleanup report renderer，而是继续从 archive verification 范围里寻找无 helper 文件。这样保持了迁移主题一致：同一版本只处理“验证报告 markdown 输出”，不混入普通 report renderer 或 profile section renderer。后续 reviewer 看到 v2120 时，可以知道它是 N1 的 archive verification 收束批次，而不是一次无边界的全局替换。

## Entry Points / 入口

本版入口仍然都是 `src/services/*ArchiveVerificationRenderer.ts` 中的 exported markdown renderer。Java cleanup 侧的入口包括 `renderJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationMarkdown`、`renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationMarkdown`、`renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationMarkdown`、`renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationMarkdown`、`renderJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerificationMarkdown` 和 `renderJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationMarkdown`。这些函数的调用者仍然拿到同一个 markdown string，不需要知道内部是否使用 builder。

managed-audit 侧入口包括 `renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerificationMarkdown` 和 `renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerificationMarkdown`。这 4 个函数原来从 `liveProbeReportUtils.js` 直接导入 `renderEntries`、`renderMessages`、`renderList`，现在统一只导入 `renderVerificationReportMarkdown`。公共渲染细节回到 builder，文件本身只声明 title、meta 和 sections。

入口保持不变的意义很具体：route 层、测试层、profile loader 层都不需要跟着动，迁移就不会扩散成跨模块修改。以后如果某个报告的 markdown 输出出现异常，排查路径也更清楚。标题或 section 顺序错，先看 renderer spec；entries/list/messages 的统一格式错，再看 `verificationReportBuilder.ts` 与 `liveProbeReportUtils.ts`；profile 字段错，才回到同名 service loader。职责分开以后，后续 Phase-B 把标准化 renderer 折回 service 时，也能更容易判断哪些文件已经没有独立存在的价值。

这批还刻意保留了每个 exported function 的长名称。长名称不美观，但它们已经是 route/test/profile 之间的稳定连接点；在 renderer consolidation 阶段改名，会把行为不变的重构变成调用面迁移。真正适合处理名称和文件布局的时间点是 Phase-B：当一组 renderer 已经只剩很薄的 builder spec，可以再判断它们是否应该折回 service 文件，或者是否需要一个小型 catalog 来减少重复 imports。v2120 先只做实现收敛，把 API 面保持原样，这能降低回滚成本。

## Response Model / 响应模型

v2120 的响应模型仍然是 markdown 报告，而不是 JSON profile。旧实现把整个响应模型藏在数组顺序里，例如 Java latest sibling evidence 的 `Route Catalog` 分区必须位于 `Source Report` 与 `Summary` 之间，latest sibling live smoke 的 `Source Live Smoke`、`Record Summary`、`Cleanup Proof` 又是另一组分区，managed-audit active shard 族群还包含 `Replay From Frozen Evidence`、`Archive Verification`、`Archive References`、`Production Blockers`、`Warnings`、`Recommendations`。这些顺序都不是装饰，route 文档和人读报告会依赖它们。

迁移后的响应模型用 builder spec 明示出来。`title` 可以是字符串，也可以是 `profile.title`；`meta` 是 label/value tuple 列表，保留原来每一行 label 的大小写和措辞；`sections` 则按旧数组里的顺序排列。Java cleanup 的 archive files 分两类保留：latest sibling 系列原来用 `Object.entries(profile.archiveFiles)` 输出 key、path、size、sha256 四行，本版继续放在 `lines` section；twenty-version closeout 和 verification checklist 原来用 `Object.values(profile.archiveFiles)` 输出 path、size、sha256 三行，本版也按原表达式保留。managed-audit active shard 族群的 archiveReferences 经过 filter 后 map 成字符串，同样作为 raw lines，不改成 entries。

messages section 是本批次比 v2119 更有代表性的地方。fake shell 和 managed-audit active shard 族群都有 `Production Blockers`、`Warnings`、`Recommendations`，旧代码分别调用 `renderMessages` 并带不同 empty text。迁移后这些分区写成 `{ heading, messages, emptyText }`，builder 内部仍然调用同一个 `renderMessages`。这样做避免了两种风险：一是把消息数组误当普通 entries，导致 code/severity/source/message 展示格式变化；二是丢失空态文案，导致无 blocker 时的人读报告和旧版不一致。

响应模型里还有一个容易被忽略的点：builder 只保证 markdown 骨架，不保证业务字段语义。比如 `Archive verification decision`、`Ready for Node v384 next boundary evidence or live gate`、`Active shard prototype enabled` 这些 meta label 都留在 renderer spec 中，而不是抽象成某个“managed audit archive header”。这样虽然每个文件仍然有若干 meta 行，但它避免了过早抽象。当前仓库的历史问题之一正是链路和报告增长太快，如果把这些 label 提升成又一个共享业务模板，下一次遇到 ready label 差异时就会被迫扩展模板参数，最终得到一个难读的大型配置对象。v2120 的选择是只共享稳定排版，不共享不稳定业务语义。

## Upstream Evidence and Config / 上游证据与配置

v2120 不需要 Java 或 mini-kv 产生新文件。Java cleanup renderer 的 profile loader 消费的是 Node 仓库里已有的 archive evidence，managed-audit renderer 也只处理 Node 本地的 frozen evidence 与 profile 对象。迁移没有改变这些 evidence 的路径、digest、ready 字段、source version 字段或 route catalog 数字。所谓 Java / mini-kv 只出现在报告语义中，不代表本版会启动 sibling service 或读取 sibling working tree。

配置上仍然走安全默认。focused tests 和 exact compare 都使用 `loadConfig` 构造静默配置，并保持 `UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`。renderer 函数本身不读 config，不发网络请求，不写磁盘；它只接收已经生成好的 profile，把字段渲染为 markdown。managed-audit 相关 profile 中的 `executionAllowed`、`startsJavaService`、`startsMiniKvService`、`connectsManagedAudit` 等字段仍由 loader 决定，renderer 只是输出它们。

因此，本版对跨项目并行的结论很明确：Java 和 mini-kv recommended parallel。Node v2120 不要求 fresh Java / mini-kv evidence，不改变它们的 playbook，不需要它们写回 Node，也不是任何真实执行批准的前置条件。它只是把 Node 控制面里已经存在的报告展示层继续标准化，为后续 code health 做准备。

这也解释了为什么 v2120 没有去读 Java 或 mini-kv 的工作树进度。当前批次的证据来源已经冻结在 Node 仓库内，读取 sibling repo 不能提高迁移正确性，反而可能把一个 renderer 重构版本误解成跨项目合同版本。只有当 Node 需要新鲜 upstream evidence、需要验证新的 schema 字段，或者要做 live integration 预演时，才应该让 Java/mini-kv 成为前置。对于这类展示层收束，最好的协作方式是三项目各自按 playbook 前进，Node 在计划表里明确“不阻塞”。

## Service Flow / 服务流程

本版服务流程可以从旧数组模型和新 builder 模型对照理解。旧流程是每个 renderer 自己创建一个字符串数组：一级标题、空行、meta 行、空行、`##` 分区标题、空行、分区内容、再空行，最后 `join("\n")`。新流程是 renderer 创建一个 `VerificationReportSpec`，然后交给 `renderVerificationReportMarkdown`。builder 负责统一标题、meta、section 间空行和末尾换行，section body 则按类型委托给 `renderEntries`、`renderMessages`、`renderList` 或 raw `lines`。

Java cleanup 侧最容易出错的是 archive files 的两种旧格式。latest sibling 系列按 entry key 输出，第一行是 `- json: present` 或 `- markdown: present`，第二行才是 `Path`。twenty-version 和 checklist 系列按 file path 输出，第一行直接是 `- <path>: present`。这两种都不能合并成一个 helper，因为合并会改变第一行文本。v2120 保守地把原来的表达式分别塞进 `lines` section，既减少外层 markdown 骨架重复，又不碰内部文件行格式。

managed-audit 侧的流程重点是 archiveReferences 和 messages。active shard 族群的 archiveReferences 不是普通对象展示，它先过滤出含 path 的对象，再输出 `exists/bytes/digest` 串；fake shell 还输出 archived evidence files 和 snippet matches。它们都保留 raw lines，因为这些行已经是旧报告的人读格式。Production Blockers、Warnings、Recommendations 则使用 messages section，让 builder 继续复用原来的消息格式和空态。

从服务流角度看，本版的 raw lines 处理是“保守迁移”的关键。只要旧报告中的某个 section 已经把业务对象格式化成字符串，就不把它反向拆成 entries。反向拆分看起来更结构化，但会改变可读文本，甚至改变 digest 相关行的顺序和缩进。v2120 把 raw lines 保留下来，说明 builder 并不是要吞掉所有展示逻辑；它只接管统一外壳，把真正属于业务报告的行内容留在 renderer spec。这个分界能帮助后续批次处理 helper renderer：helper 可以继续返回 lines，只要外层分区和 meta 交给 builder。

## Safety Boundary / 安全边界

v2120 的安全边界首先是文件边界：没有新增 service 文件，没有新增 route 文件，没有新增测试 fixture，也没有修改任何现有测试期望。`test/governanceGrowthRatchet.test.ts` 包含在 focused batch 里，证明 renderer consolidation 没有变成新链路增长。这个约束对 N5 很重要，因为 N5 后续要启用更严格的 unused 规则、拆分大文件，还要靠 Phase-B 合并 renderer 来抵消新增模块数量。

第二个边界是行为边界。所有改动都在 renderer 文件内，renderer 没有能力启动 Java、mini-kv、managed audit store 或 Node HTTP server。即使报告里出现 live smoke、active shard、runtime gate 这类词，也只是历史证据或计划证据的展示，不代表本版打开真实执行。exact compare 使用真实 profile，但只是进程内函数调用，没有后台服务、端口或外部资源。

第三个边界是批次边界。本版没有处理带本地 helper 的 archive verification renderer。那些文件往往有更复杂的局部 formatting，例如把 evidence references、command plan 或 decision table 先整理成中间 lines。它们不是不能迁移，而是不应该和 no-helper 批次混在一起。等到下一批处理 helper renderer 时，需要单独说明哪些 helper 原样保留、哪些 helper 可以折回 spec、哪些 helper 暂缓。

还有一个安全边界是临时工具边界。`.tmp/v2120-generate-renderers.mjs` 和 `.tmp/v2120-byte-identical-compare.test.ts` 都只是迁移期间的机械工具，不进入提交。生成器的价值是减少长文件名和长函数名手敲错误；exact compare 的价值是证明输出不变。它们完成任务后必须删除，否则仓库会开始堆积一次性脚本，反而违背本次 consolidation 的维护目标。正式交付只留下 renderer 变更、归档证据、计划表和中文讲解。

## Test Coverage / 测试覆盖

本版验证分四层。第一层是 `npm run typecheck`，确认 10 个 renderer 的 profile 字段、ready 字段、messages 字段、archiveReferences filter 类型谓词和 builder section 类型全部合法。第二层是 focused renderer batch：`test/verificationReportBuilder.test.ts`、`test/governanceGrowthRatchet.test.ts` 加上 10 个迁移对象对应测试文件，共 12 个测试文件、22 个断言通过。它覆盖真实 profile ready 状态、archive digest、route 输出和治理 ratchet。

第三层是临时 Vitest exact compare。裸 `tsx` 一次性 dynamic import latest sibling live-smoke 族群时会触发项目中既有 route 常量 ESM 初始化顺序问题，因此本版把 compare 放到临时 Vitest 测试里运行，让模块 runner 与正式测试一致。compare 的方法是加载真实 profile，用旧数组拼接模型重建 expected markdown，再与新 renderer 输出做 `toBe` 比较。结果 10/10 通过，证明 builder 迁移没有改变标题、meta、分区顺序、空行、消息空态或末尾换行。

第四层会在版本收尾时继续跑 lint、build 和文档质量 gate。文档质量 gate 对当前阶段很关键，因为代码讲解已经成为版本 closeout 的一部分，不能靠短文或模板段落蒙混。v2120 的讲解明确记录本批次选择、响应模型差异、raw lines 的保守处理、跨项目并行边界和 exact compare 方法，目的就是让下一批迁移有可继承的判断口径。

后续验证节奏也要保持克制。N1 单批迁移的首要证据是 focused renderer tests、typecheck、ratchet 和 exact compare；连续多个批次后再跑更大的 coverage 或全量本地测试更合适。远端 CI 仍会在 push 后执行 Node Evidence 的 typecheck、lint、test、build 和 smoke，所以本地阶段不需要每个批次都重复最重的验证。真正需要立即扩大验证范围的情况，是 exact compare 发现输出差异、focused tests 暴露 route 失败，或者迁移触碰了 builder 本身。v2120 没有这些信号，因此按 playbook 保持 focused 验证即可。

本版还把临时验证脚本的限制写进证据：裸 `tsx` 不适合一次性拉起这组存在路由常量循环的模块，Vitest 临时用例才是可靠路径。

## One-sentence Summary / 一句话总结

v2120 把 10 个无本地 helper 的 archive verification renderer 迁移到共享 verification report builder，在保持 markdown 输出逐字节一致、保持 Java/mini-kv 并行不受阻、保持 service/route 数量不增长的前提下，继续为 N1 收束和 N5 代码健康治理铺路。
