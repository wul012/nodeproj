# v2133 renderer consolidation batch 16 / 渲染器骨架收口第16批

## Goal and Non-goal / 目标与非目标

这次版本的目标很明确：把 `managedAuditManualSandboxConnectionCredentialResolver*Renderer.ts` 里仍然手写的报表骨架继续收进 `verificationReportBuilder`。被迁移的 7 个文件分别覆盖前置计划、生产就绪、实施计划和 runtime shell 决策记录四个方向。它们都不是新业务逻辑，而是同一种 Markdown 报表样式在不同治理阶段里的重复出现。重复的不是信息，而是标题、meta、章节、空行和收尾换行这些最容易被复制粘贴的模板动作。

非目标也要说清楚。v2133 不改任何 loader，不改 route，不改 profile type，不改历史 fixture，不启动 Java，也不启动 mini-kv，更不会把 managed audit 的边界打开。它只是让报表层的外壳统一，把真正的业务语义留在各自文件里。像 `plan boundary`、`decision record`、`echo receipt`、`evidence files`、`expected snippets` 这些内容，依旧留在本地 helper 或本地对象投影里，不往公共 builder 里硬塞。

## Entry Points / 入口

这 7 个文件的公开入口都没有变。它们仍然是各自 loader 对应的 `render...Markdown(profile)` 函数，参数还是原来的 profile，返回值还是 Markdown 字符串。对调用方来说，唯一可见的变化只是内部不再直接 `return [ ... ].join("\n")`，而是把标题、meta 和 sections 交给 `renderVerificationReportMarkdown({...})`。所以路由层、JSON 层和测试层都不用改接口。

这批入口可以分成三类。第一类是完整报表，比如 `PreImplementationPlanIntakeRenderer`、`ProductionReadinessDecisionGateRenderer`、`ImplementationPlanDraftRenderer`，它们几乎都能直接映射到 `title/meta/sections`。第二类是上游回声核验，比如 `PreImplementationPlanIntakeUpstreamEchoVerificationRenderer` 和 `ProductionReadinessBlockedDecisionUpstreamEchoVerificationRenderer`，它们多了 Java / mini-kv 的证据引用，但仍然是标准报表。第三类是 `RuntimeShellDecisionRecordUpstreamEchoVerificationRenderer`，它保留了更细的局部证据展开 helper，因为这份文件里不只是表格，还有证据文件和期望片段的分层展示。

## Response Model / 响应模型

`verificationReportBuilder` 的响应模型很朴素，正好适合当前这批文件。`title` 负责一行标题，`meta` 负责最顶层的元信息键值对，`sections` 负责所有 `##` 章节。章节又分成四种：`entries` 适合对象投影，`messages` 适合 blocker / warning / recommendation，`list` 适合普通字符串数组，`lines` 适合已经在本地生成好的 Markdown 行。这个模型比手工拼数组更清晰，因为它把“报表结构”和“报表内容”分成了两层。

这次迁移最重要的地方，是没有把业务信息扁平化成纯字符串。比如 `PreImplementationPlanIntakeRenderer` 里的 `Boundaries` 仍然用 `lines` 保留 `code/status/requirement/owner/evidence` 的固定句式；`ImplementationPlanDraftRenderer` 里的 `Interface Boundaries` 仍然保留 `requiredArtifacts` 的 join 顺序；`ImplementationPlanUpstreamEchoVerificationRenderer` 里的 `Version Offset` 依然是一段原文解释，而不是被重排成一组字段。builder 只是接管排版，不接管语义。

## Upstream Evidence and Config / 上游证据与配置

这批文件没有新的上游证据要求。Java 和 mini-kv 仍然只是 loader 已经解出来的历史证据投影，renderer 只负责展示，不负责获取。也就是说，本版既没有要求 Java 起服务，也没有要求 mini-kv 起服务；它展示的 `Java v112 Echo Receipt`、`Java v121 Echo Requirements`、`Java v135 Echo`、`mini-kv v119 Non-Participation Receipt`、`mini-kv v126 Receipt`、`mini-kv v132 Receipt` 之类内容，全部来自 profile 里的字段和历史 fixture，而不是来自新运行时。

配置层也没有发生变化。`UPSTREAM_PROBES_ENABLED` 和 `UPSTREAM_ACTIONS_ENABLED` 仍然保持原来的边界，不因为 renderer 迁移而改变。`runtime shell` 相关文件里保留的 `runtimeShellImplemented`、`runtimeShellInvocationAllowed`、`executionAllowed`、`connectsManagedAudit` 等字段也没有被改成 true；它们仍旧只是状态展示。这样做的原因很简单：如果只是在报表层做收口，就不应该顺手把执行层边界打开，那样会把“展示”和“放行”混成一件事。

## Service Flow / 服务流程

服务流其实没有变。路由仍然先找到对应 loader，loader 仍然去读 config、fixture 和历史证据，最后把 profile 交给 renderer。变化只在最后一步：renderer 不再自己拼出整份 Markdown，而是把共有结构交给 builder。这样以后如果有第 8 份、第 9 份同类报表，只要内容字段还在，新增成本就会小很多。

这次改造里，前置计划和生产就绪两类文件最接近“纯报表”。它们都围绕 `Source Node`、计划主体、检查、总结、阻塞项和建议展开，几乎没有额外的本地文案函数。`ImplementationPlanDraftRenderer` 和 `ImplementationPlanUpstreamEchoVerificationRenderer` 略复杂一点，因为它们要把 `Interface Boundaries`、`Java v121 Echo Requirements`、`mini-kv v126 Receipt Requirements`、`Version Offset` 这些段落保留下来。最复杂的是 runtime shell 决策记录，它的 Java / mini-kv 部分还要单独列出 `Evidence Files` 和 `Expected Snippets`，所以我保留了 `renderJavaReference` 和 `renderMiniKvReference` 两个局部 helper，只把它们的返回值交给 builder 作为 `lines`。

## Safety Boundary / 安全边界

安全边界第一层是输出不变。为了确认这一点，我给这 7 个文件做了临时逐字比对：把 `git show HEAD:<path>` 里的旧源码取出来，再用同样的 profile 跑一遍旧渲染和新渲染，最后直接比较整段 Markdown。7 个文件都通过了，所以这次迁移没有引入额外空行、空列表、标题错位或段落顺序变化。

安全边界第二层是逻辑不外溢。`renderVerificationReportMarkdown` 只接收 `title/meta/sections`，它不知道也不应该知道“什么是生产就绪决策”“什么是前置计划边界”“什么是 Java 证据文件”“什么是 mini-kv 期望片段”。这些事情继续留在本地 helper 里，所以 builder 不会变成一个越长越胖的中央接口。第三层是依赖不外跑：没有新进程，没有新端口，没有新服务，也没有新 route。改动面始终局限在 Node 的 Markdown 视图层。

## Maintenance Classification / 维护分类

从维护角度看，这 7 个文件可以分成三种层级。第一种是完整报表，它们很适合继续迁，因为顶层结构和别的文件高度一致，迁过去以后收益最大。第二种是带局部格式的报表，比如 `ImplementationPlanUpstreamEchoVerificationRenderer` 和 `RuntimeShellDecisionRecordUpstreamEchoVerificationRenderer`，它们虽然也能吃 builder，但要保留少量本地解释器来维持证据行顺序和子段落结构。第三种是将来可能出现的更细报告片段，这类文件如果只是某个更大报告里的局部节段，就不应该直接套完整 builder，免得把章节抬升成顶层报表。

这一版没有继续提炼更大的共享 helper，不是因为提不出来，而是因为还没到那个阶段。当前这批文件共享的是“报表外壳”，不是“证据语义”。如果硬把证据语义也抽成公共 helper，参数会越来越长，调用点会越来越难读，反而不利于维护。现在的做法是：公共层收窄到 `title/meta/sections`，局部层继续持有自己的投影和文案句式。这个边界更稳，也更适合后续继续推进。

## Production Readiness Relation / 与真实执行的关系

v2133 依旧不是进入真实执行的版本。虽然文件名里有 `production-readiness`、`implementation-plan`、`runtime-shell` 这些很容易让人联想到执行权限的词，但这批改动没有把任何一个 false 变成 true，没有把任何一个 blocked 变成 ready，也没有打开 managed audit 的生产路径。它只是把“怎么看”这件事做得更清楚，让审查人不用在一长串手写字符串里找结构。

这点很重要，因为越接近真实执行，越不能把报表层的清理误读成执行层的放行。`ProductionReadinessDecisionGateRenderer` 仍然只是“决策门”；`ProductionReadinessBlockedDecisionUpstreamEchoVerificationRenderer` 仍然只是“被阻塞决策的上游回声核验”；`RuntimeShellDecisionRecordUpstreamEchoVerificationRenderer` 仍然只是在证明 runtime shell 还没被允许执行。它们的存在，是为了让后面的真实执行更可审计，而不是为了提前制造真实执行的幻觉。

## Test Coverage / 测试覆盖

这版的测试覆盖分成三层。第一层是 `npm run typecheck`，确认 builder 的入参和 7 个 renderer 的新写法都能通过类型检查。第二层是 10 个 focused test 文件，共 32 个测试，覆盖了这 7 个 renderer 的单测和相邻路由层核验。第三层是临时逐字比对测试，它直接用旧源码和新源码各自渲染一遍，再比较完整 Markdown 字符串，确保版式没有被改坏。

因为这批文件只是报表框架收口，所以我没有再去跑很大的回归批次。更大的测试套件只会增加等待时间，不会额外证明这次迁移比逐字比对更安全。相反，逐字比对能直接回答最核心的问题：标题、meta、章节顺序、空行、列表文案和子段落展开，是否与旧版完全一致。答案是肯定的，这也是为什么这版可以继续往前推，而不是停在“看起来应该没问题”的层面。

## One-sentence Summary / 一句话总结

v2133 把 7 个仍在手写 Markdown 外壳的 managed-audit credential-resolver 报表 renderer 收进了 `verificationReportBuilder`，保留了本地的计划边界、证据展开和 runtime shell 子段落语义，并用 typecheck、focused tests 和逐字比对确认输出没有变化。

## Maintenance Notes / 维护备注

这批文件完成以后，后续维护时最需要关注的不是“还能不能少几行”，而是“哪些文件真的共享同一种报表骨架”。如果只是为了减少行数，把工作表、操作包、命令模板也塞进同一个 builder，短期看起来会变薄，长期反而会让报表和操作材料的边界变乱。v2133 的做法更保守：只处理完整状态报告，不处理局部 section renderer，也不处理 operator worksheet。这个边界在真实执行前尤其重要，因为越靠近执行窗口，越要让审查材料能一眼看出自己是证据展示、输入准备还是动作批准。

另一个维护点是局部 helper 的命名。`renderJavaReference` 和 `renderMiniKvReference` 仍然留在 runtime shell 文件里，不是因为它们复杂到不能抽，而是因为它们的语义和具体版本强绑定。它们展示的是 Java v135 与 mini-kv v132 对 Node v299 决策记录的回应，里面有证据文件、期望片段和边界标记。把这种版本语义抽到公共层，会让公共层承担太多历史知识。保持局部，反而能让未来的 reviewer 直接看到这份报告到底依赖哪一组上游材料。

## Future Scan / 后续扫描

下一批继续做时，应该先扫描还在 `renderEntries/renderMessages/renderList` 上手写完整报表的文件，而不是只按文件名或者行数粗选。合适的候选通常有几个特征：顶层有 `service/generatedAt/profileVersion/state` 一类 meta；中间有稳定的 `Checks`、`Summary`、`Production Blockers`、`Warnings`、`Recommendations`、`Evidence Endpoints`；末尾有 `Next Actions`。如果这些结构齐全，就说明它的重复主要是报表 frame，适合继续迁到 builder。

不合适的候选也要主动放过。比如 controlled read-only shard preview 相关文件里，有些是真正的完整报告，有些是窗口工作表，有些是人工证据输入草稿，还有一些是签名审批文本包。它们都可能长得像 Markdown renderer，但职责并不一样。后面如果动这组文件，应该先分类，再迁移，不能因为它们都在同一个命名家族里就一口气套同一个抽象。这个筛选动作会比单纯改代码更重要。

## Stop Condition / 停止条件

这类 renderer consolidation 的停止条件也要提前写清楚。第一，当剩余文件已经不是完整报表，而是局部片段、工作表或操作包时，就应该停止套 `verificationReportBuilder`。第二，当本地 helper 开始需要太多参数才能共享时，也应该停止继续抽象，因为那说明差异已经是业务差异，不是模板差异。第三，如果某个后续版本需要新证据、新 route 或 live read-only window，就应该先切出功能计划，而不是混在报表收口里做。

对 v2133 来说，当前版本的停止点就是这 7 个文件。它们都能逐字比对通过，说明迁移边界正确；剩余文件需要重新扫描分类，不能直接沿用本批假设。这个停止点不是保守拖慢，而是在给后续更靠近真实执行的版本留清晰空间：先把报表外壳的噪声压下去，再处理真正需要人判断的证据输入、审批文本和 live window 前置条件。

后面如果继续做同类版本，我会把这个停止条件写进版本说明里，而不是只在心里记着。原因是这类治理型工程最容易在连续推进时滑向“看见相似就合并”。把停止条件显式写出来，可以让每个版本都知道自己是在收重复、还是在改契约、还是已经碰到真实执行前置。三者不能混在一个提交里。
