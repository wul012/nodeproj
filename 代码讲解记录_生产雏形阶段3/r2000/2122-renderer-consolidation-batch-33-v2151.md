# v2151 Renderer Consolidation Batch 33

## Goal And Non-goal / 目标与非目标

v2151 的目标是继续收紧 Node 里的只读 Markdown renderer，把 artifact draft text package 后续的 comparison 与 compared-evidence 链条迁移到共享 verification report builder。具体迁移六个报告：comparison preflight、comparison acceptance precheck、compared package evidence intake、compared evidence evaluation preflight、compared evidence candidate、compared evidence candidate intake。这六个报告刚好接在 v2150 的 text package intake、review、submission 之后，属于同一条人工材料前置链路。

非目标同样明确：本版不生成真实批准，不执行文本包提交，不启动 Java 或 mini-kv，不消费兄弟项目的新文件，不改变 route 字符串，不改变响应字段，不改变任何写入边界。报告里出现 comparison、acceptance、candidate、approval grant、signed approval 等词，只表示只读对象里有这些前置材料状态，不表示系统拥有自动批准或真实执行能力。

本版还做了一个很小的 builder 能力扩展。原因不是为了增加功能，而是为了忠实承载旧 renderer 的两种历史排版：一个文件第一节就是 `## Summary`，没有 meta；另外五个文件用 `for` 循环在每个 h3 block 前插空行。若不把这两种排版模式收进 builder，迁移就会变成手工拼接，后续剩余 for-loop renderer 也很难继续稳定推进。

## Entry Points / 入口

入口分两层。第一层是 `src/services/verificationReportBuilder.ts`，它现在除了既有的 `renderVerificationReportMarkdown`、`renderVerificationBlockedReasonLines`、`trimVerificationTrailingBlankLine`，还新增 `renderVerificationSeparatedBlockLines`。这个 helper 接收一个数组和一个本地 `renderItem` 函数，在 block 之间插入一个空行，但不在开头和结尾多加空行。它服务的是旧 for-loop renderer 的精确排版，不理解任何 approval 或 evidence 语义。

第二层是六个长文件名 renderer。`ComparisonPreflightRenderer` 比较特殊，旧输出是标题后直接进入 `## Summary`，然后再进入 lanes 和 controls。builder 原先在 meta 为空时会在第一节前多出一行空白，所以本版把分隔逻辑收窄为：只有空 meta 的第一节复用标题后的空行，后续 section 仍按旧行为总是插入 section 分隔。这样既修复 Summary-first 的排版，又不会吞掉 later section 前由旧 helper 明确留下的空白。

其余五个 renderer 原先都是 `const lines = [...]` 加两个 `for` 循环。迁移后，meta bullet 进入 builder 的 `meta` 数组，两个 h3 section 进入 builder 的 `sections`，每个循环体被提成本地 `renderCheckpoint`、`renderGuard`、`renderSlot`、`renderRule`、`renderSection`、`renderBlocker` 等 helper。命名仍贴着领域对象走，避免把 acceptance checkpoint、evidence slot、candidate section 混成无语义的通用行渲染。

## Response Model / 响应模型

这批报告可以理解成“文本包被比较、接收、转成候选证据”的只读链。comparison preflight 说明哪些 lane 能做离线比较，哪些 control 阻止未比较或未接受的材料继续前进。comparison acceptance precheck 把比较结果提升为 acceptance checkpoint，并说明哪些 guard 会阻止缺少真实接受证据的文本包。compared package evidence intake 接收真实 compared-package evidence，同时拒绝 synthetic evidence 成为可信材料。

后半段进入 candidate 形态。compared evidence evaluation preflight 定义哪些真实证据字段满足候选条件，哪些 guard 会拒绝缺失或合成候选。compared evidence candidate 生成候选蓝图，列出 candidate fields、candidate question、materialized/accepted counts 和 blocker。compared evidence candidate intake 则检查真实 candidate document 是否可以进入导入、评估和接受流程。每一步都只是展示对象，不负责计算对象。

迁移后响应模型没有改变。summary、meta、h3 section、guard 文本、digest、count、read-only/write/sibling mutation 字段全部保留原顺序。`ComparisonPreflight` 的 lanes 后保留了历史上的双空行；其他五个 for-loop renderer 保留“section heading 后一行空白，再进入第一个 h3 block”的格式。字节级 hash 一致证明这些响应模型的外观和内容都没有被重写。

## Upstream Evidence / 上游证据

本版继续使用 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 捕获和比对输出。这样 Node 不依赖 Java 或 mini-kv 当前工作树，也不会因为 Java 本地存在未跟踪说明文件而改变本版结果。输入来自 Node 的冻结 fixture，目的只有一个：证明同一份旧输入在迁移前后渲染成完全相同的 Markdown。

这六个对象包含多层 source version、source digest、count 和 blocker 文本。renderer 的职责是展示，不重算 digest，不补充 evidence，不判断 sibling project 是否已经完成新版本。比如 compared package evidence intake 会展示 real evidence、synthetic evidence、approval grant、signed approval 等字段，但是否存在这些字段由上游对象决定，renderer 不拥有事实来源。

跨项目位置也因此很清楚：Java 和 mini-kv 推荐并行，不是 v2151 的前置。等到真正做分片联合执行时，计划需要写明 Java/KV 的精确版本、服务端口、启动者、输入文件、审批材料来源和清理责任。v2151 还没有这些 live integration 条件，所以正确做法是继续清理 Node 报告外壳。

## Service Flow / 服务流程

旧流程是每个 renderer 自己维护完整 Markdown 数组。对于 for-loop 文件，函数先把标题和 meta 放进 `lines`，再追加第一个 section heading，随后循环 `checkpoints` 或 `slots`，每个元素前先插入空行和 h3，再追加字段 bullet；第二个 section 也重复同样模式。这个写法直接，但每个文件都复制空行规则，后续改错或迁移时非常容易出现一行差异。

新流程把骨架拆开。builder 负责标题、meta、section heading、尾随换行；`renderVerificationSeparatedBlockLines` 负责 h3 block 间的空行；本地 `renderX` helper 负责领域字段。这样读代码时能快速看出：哪些行是报告结构，哪些行是业务对象字段，哪些行只是旧格式兼容。出错时定位也更清楚，字段错看本地 helper，section 间距错看 builder，输入事实错看上游 profile。

`ComparisonPreflight` 的流程稍微不同，因为它没有 meta，而是第一节 `Summary`。本版没有为了它写一个独立 renderer 分支，而是修正 builder 的第一节分隔策略。这个修正只在 meta 为空且处理第一节时生效；后续 section 仍保留原来的强制分隔。因此它既支持 Summary-first 报告，又不会改变已有 compact h3 报告的 later-section 空白。

## Safety Boundary / 安全边界

这批文件最容易被误读的地方是 acceptance 和 candidate。acceptance precheck 不是接受真实生产执行，candidate intake 也不是把外部材料直接导入运行时。它们的字段会展示接受、候选、导入、评估等词，但报告仍然只读，且持续输出 write routing、starts services、mutates sibling state、runtime payload 等安全字段。renderer 只反映这些字段，不改变这些字段。

本版没有新增 HTTP route，没有新增 service，没有新增 shell 命令，没有新增文件读取路径，也没有启动浏览器或外部服务。Java 和 mini-kv 的状态只在总览时被检查过，Node v2151 的实现没有写入它们。所有迁移集中在 Markdown renderer 和 builder helper 上，安全边界比功能版本更窄。

安全证据不是靠文字保证，而是靠 hash。六份报告迁移前后 length 和 SHA-256 完全一致，包括 guard text、blocked reason codes、digest、字段顺序、空行和尾随换行。这说明本版没有把阻断条件变成放行条件，没有删除 synthetic evidence 拒绝说明，也没有让候选材料获得额外执行含义。

## Maintenance Payoff / 维护收益

v2151 后 builder-backed renderer 从 147 增加到 153，未迁移 renderer 从 98 降到 92。更关键的是 for-loop 债务从 9 降到 4。for-loop renderer 通常比普通 flatMap 更麻烦，因为它的空行规则隐含在 `lines.push("", "### ...")` 里，不能直接套用 v2150 的 trailing blank helper。本版把这类形态抽成 `renderVerificationSeparatedBlockLines`，后面剩余 for-loop renderer 可以按同一办法继续迁移。

维护收益也体现在抽象边界上。我们没有新增“文本包候选证据万能 renderer”，因为那会把不同报告的领域语言揉成一团。新增的是更底层的 block-spacing helper，它只处理行数组格式，不处理业务含义。这种抽象足够小，能减少重复，又不会遮蔽审查者真正关心的 acceptance checkpoint、evidence slot、evaluation rule、candidate blocker。

另一个收益是 builder 的空 meta 行为更完整了。早期 builder 主要服务“标题后立刻 meta bullet”的报告，v2151 证明它也能服务“标题后第一节 Summary”的报告。这个能力以后可以用于其他 summary-first renderer，不需要再写专门外壳。

还有一个实际收益是审查成本下降。迁移前，审查者要在六个文件里分别确认标题、meta、section、循环空行和尾随换行；其中五个文件的循环写法几乎相同，但字段名又不完全相同，很容易在“看起来都一样”的地方放松警惕。迁移后，审查者先看 builder spec 的三四个 section，再看本地 helper 的字段列表，关注点被自然分开。对于这种生产前治理代码，降低审查时的视觉噪声本身就是质量提升。

本版也给后续剩余 renderer 留下了更清楚的分类标准。若某个文件是标题加 meta，再跟两组循环 h3 block，它可以沿用 v2151 的 separated block helper；若某个文件是标题后直接 Summary，则先确认空 meta 第一节是否适合；若某个文件是 profile-section 聚合或 dashboard 拼装，则不要急着套 report builder。这样后续推进不是“见一个迁一个”，而是按形态选择工具，减少返工。

## Failure Modes / 失败模式

第一类失败是空 meta 多空行。若 builder 在标题后的空行之外又给第一节追加一个空行，`ComparisonPreflight` 的 `## Summary` 前会多出一个空白行，hash 立即失败。这个问题本版通过第一节条件处理解决，并加了 builder test。

第二类失败是吞掉旧 helper 留下的空行。最初修正空 meta 时条件过宽，导致 later section 前的显式空白被合并，`Comparison lanes` 和 `Acceptance controls` 之间少了一个换行。hash compare 捕获了这个一字符差异。本版最终把条件收窄到空 meta 第一节，并新增测试保护 later section 的显式 trailing blank。

第三类失败是 for-loop block 尾部多空行。若每个本地 `renderX` helper 都保留尾随空行，再由 builder 追加尾随换行，最后 section 会多一个空白；若完全不插入块间空行，多条 h3 会贴在一起。`renderVerificationSeparatedBlockLines` 的规则是块间插空、首尾不插空，正好匹配旧循环。

第四类失败是语义过度抽象。candidate section、evaluation rule、intake slot 都有相似字段，但它们不是同一个业务对象。后续如果为了减少行数把它们统一成动态字段表，会让审查者更难判断某个 guard 究竟阻断 candidate import、candidate evaluation，还是 package acceptance。本版没有走那条路。

第五类失败是把“真实证据存在”误读成“证据可自动采用”。compared package evidence intake 会同时展示 real evidence、synthetic evidence、manual materialized count 等字段，candidate intake 又会展示 real candidate document、imported payload、evaluated payload、accepted payload。它们只是报告字段，不是自动采信过程。后续如果有人在功能层新增真实导入，必须另写计划说明输入来源、人工审批、失败回滚和清理职责，不能把本版 renderer 迁移当成那一步的授权。

第六类失败是把 profile-section 聚合文件误归入同一批。它们看起来也在输出 text package summary，但职责是把多个 profile section 拼给上层展示，不是单个 verification report。若后续迁移这类文件，应该先证明 builder 的标题和 meta 模型适合它们；若不适合，就保持原有 profile-section 拼装方式，或者另建更准确的 profile section helper。

## Test Coverage / 测试覆盖

第一层是临时 hash compare：六个报告在 forced historical fallback 输入下，迁移前后长度和 SHA-256 全部一致。特别是 `ComparisonPreflight` 的一字符空行问题先失败后修复，说明这个门槛确实能捕捉肉眼容易忽略的格式漂移。

第二层是 focused Vitest：`verificationReportBuilder.test.ts` 加六个报告测试，共 7 个文件、41 个测试通过。builder test 覆盖空 meta 第一节、later section 显式空行保留、separated h3 block helper；报告测试覆盖各自现有 ready/blocked/markdown 断言。

第三层是 `npm run typecheck`，确认新增泛型 helper、indexed-access item 类型、本地 helper 和 builder spec 都能通过 TypeScript。提交前还会继续跑 ratchet、代码讲解质量门、lint、JSON 解析、diff 检查和清理检查，把治理增长、文档质量、既有 warning 和临时文件一起收口。

本版测试还有一个值得记住的细节：第一次 compare 失败只差一个字符，差异来自 later section 前的空行被误合并。这个失败非常有价值，因为它证明 hash 门不是形式主义。普通断言大概率不会关心两个 section 之间到底是一行空白还是两行空白，但归档文本的稳定性依赖这些细节。把这个问题修进 builder test 后，后续再改空 meta 或 section 分隔逻辑时，就不会悄悄破坏旧报告。

focused tests 没有替代 hash compare，hash compare 也没有替代 focused tests。前者证明输出完全不变，后者证明现有测试入口和 builder 行为仍能被项目测试体系捕捉。两者合在一起，才足够支撑这种“重构外壳但不改行为”的版本。

## Next-version Direction / 下一版方向

v2152 可以继续处理剩余 92 个未迁移 renderer。短期优先级有两条：一条是剩余 4 个 for-loop renderer，因为 v2151 已经给出安全迁移模板；另一条是 text-package profile-section 聚合 renderer，它们不是普通 report 外壳，应该单独评估是否适合 builder，避免把 profile 拼装和 verification report 混为一谈。

下一版仍不建议进入真实分片联合执行。Node 当前最有价值的工作是把只读证据展示层继续降噪，让报告、归档和审计材料稳定。等 renderer 外壳债务进一步下降，跨项目执行计划才能更清楚地描述输入、输出、审批、启动和清理责任。

## Cross-project Position / 跨项目位置

Java 当前主线 v1826 CI 已绿，但本地还有一个未跟踪 project explanation 文档，应由 Java 会话处理。mini-kv 当前 v1628 CI 已绿，下一步需要先决定 no-network receipt 的 canonical byte surface。Node v2151 不阻塞这两件事，也不依赖它们完成。

本版只在 Node 仓库内修改 renderer、builder、测试和归档。Java/mini-kv 可以继续并行推进自己的计划；如果未来 Node 需要 fresh sibling evidence，计划必须提前写明所需版本和文件。

从三项目统筹角度看，Node 当前最像“审计材料整形层”，Java 当前最像“业务平台 ops 包结构治理层”，mini-kv 当前最像“底层 receipt 字节表面治理层”。三者都在为真实分片联合执行铺路，但现在铺的是可读、可验证、可回滚的前置基础，而不是启动真实执行。只要这个边界不混淆，三个项目就可以并行做自己的维护版本。

## One-sentence Summary / 一句话总结

v2151 把六个 text-package comparison / compared-evidence 只读报告 renderer 迁移到共享 builder，并用字节级 hash 证明所有 summary、h3 block、guard、digest、空行和安全边界完全不变。
