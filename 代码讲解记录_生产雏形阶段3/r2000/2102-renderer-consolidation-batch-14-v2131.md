# v2131 renderer consolidation batch 14

## Goal and Non-goal / 目标与非目标

v2131 继续推进 N1 的 renderer consolidation，这一批选择 fake shell、fake harness、execution denied、final prerequisite 和 human approval artifact review 周边的六个 Markdown renderer。选择它们不是因为文件名相近，而是因为它们都属于 managed audit runtime shell 前的治理型报告：报告本身只展示已经生成的 profile，不启动真实 resolver，不读取 credential value，不解析 raw endpoint URL，也不向 Java、mini-kv 或 managed audit 发起请求。它们的共同问题是外层 Markdown 框架高度重复：一级标题、meta bullet、若干 `##` section、blockers、warnings、recommendations、evidence endpoints 或 next actions。真正不同的部分只在局部 evidence 行、requirement/no-go 行、final closure 的 message 行，以及 human approval 的 evidence file 和 expected snippet 展开方式。

本版本的目标是把重复框架交给 `renderVerificationReportMarkdown`，并让每个 renderer 的入口函数更像一份报告规格，而不是一段长数组拼接。这样后续审查 N1 进度时，可以更快判断某个 renderer 是否仍在手写通用结构，也能为 N5 的 Phase-B merge 提供更清楚的候选边界。非目标同样重要：不新增 helper，不改 loader，不改 type，不改 route，不改测试期望，不改任何 evidence schema，也不把 Java 或 mini-kv 的进度写回 Node 以外的仓库。所有跨项目内容仍是只读消费已有 historical fixture 或现有 profile 字段，Java 和 mini-kv 可以继续并行推进自己的 playbook。

这次没有把六个 renderer 全部压成一个新的“runtime prerequisite report helper”，原因是它们看起来同属一组，实则局部语法差异很大。fake harness decision record 有 requirement 与 no-go condition 的专用字符串；fake harness blocked echo 与 execution denied echo 有不同的上游证据字段；final prerequisite closure review 的 blocker/warning/recommendation 行使用方括号格式，不能用 liveProbe 的标准 message formatter 替代；human approval upstream echo 需要保留 Java 和 mini-kv 的 evidence files 与 expected snippets 两个三级片段。若为了减少几行调用代码而强行抽宽 helper，helper 内会出现大量分支，反而让报告语义变暗。

## Entry Points / 入口

本批六个公开入口函数保持原名和参数不变，调用方不需要调整 import。`renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationMarkdown` 仍然接收 fake shell archive upstream echo verification profile；`renderManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordMarkdown` 仍然接收 fake harness readiness decision record profile；`renderManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMarkdown` 和 `renderManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationMarkdown` 仍然接收各自的 upstream echo verification profile；`renderManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewMarkdown` 仍然接收 final prerequisite closure review profile；`renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationMarkdown` 仍然接收 human approval artifact review upstream echo verification profile。

入口函数的职责现在更集中：把 profile 映射成一个 `VerificationReportSpec`。meta 区域保留原有标签、顺序和值来源，例如 fake shell 报告仍展示 service、generated at、profile version、verification state、ready flag、read-only upstream echo verification、archive verification only、connects managed audit；fake harness decision record 仍展示 decision record state、readiness decision、ready for decision record、ready for disabled runtime shell planning、fake harness runtime enabled、execution allowed；final closure 仍展示 active Node version、source readiness version、target prerequisite id、all prerequisites closed、runtime shell implementation 与各类 side effect flag。所有这些标签都只是从 profile 中取值，没有在 renderer 中重新判断。

入口函数保留本地 helper 的位置也有意为之。fake harness decision record 的 `formatRequirement` 和 `formatNoGoCondition` 仍在文件底部，因为它们是该报告的业务行格式，不应进入共享 builder。final closure 新增了 `renderSourceNodeV327`、`renderClosureReview` 和 `renderSummary` 三个本地函数，把原来嵌在大数组中的长串模板行分段收好，但不改变任何字段名。human approval upstream echo 保留 `renderSourceNodeV308`、`renderJavaReference` 和 `renderMiniKvReference`，其中 Java/mini-kv helper 继续输出 evidence files 与 expected snippets。入口变短，不代表语义被隐藏；相反，主函数现在能一眼看到报告结构，本地 helper 能一眼看到局部证据结构。

## Response Model / 响应模型

六个 renderer 的输出模型仍然是 Markdown string，且必须保持字节级一致。`renderVerificationReportMarkdown` 负责稳定的通用骨架：`# title`、空行、meta bullet、每个 `## section` 前后的空行、末尾换行。section body 则按四种形态渲染：`entries` 使用 `renderEntries`，`messages` 使用 liveProbe 标准 message formatter，`list` 使用 `renderList`，`lines` 直接接收本地 helper 已经写好的 Markdown 行。这个模型的好处是把“所有报告都一样的排版”集中在一个经过测试的 builder 中，把“这个报告为什么不同”留在 renderer 旁边。

fake shell archive upstream echo verification 是最简单的一类。Source Node v266、Java v110 Echo Receipt、mini-kv v117 Non-Participation Receipt、Echo Verification、Checks、Summary、Evidence Endpoints 都是对象展开，直接作为 `entries` section。Production Blockers、Warnings、Recommendations 采用标准 message section，Next Actions 采用 list section。这个文件从手写数组变成规格描述后，长度降到 50 行，仍保留原有标题、meta 标签和空状态文本。它证明对于纯 entries/list/messages 组合的 report，builder 可以直接承接外层结构。

fake harness readiness decision record 多了两段局部格式：Required Evidence 和 Explicit No-Go Conditions。旧实现先把 requirement 映射成 `id: status - label; evidence=...; requiredBeforeRuntimeShell=...`，再交给 `renderList`；no-go condition 也是类似的专用字符串。v2131 没有把这两种格式塞进 builder，而是继续在本文件内用 `formatRequirement` 和 `formatNoGoCondition` 生成字符串，再把结果作为 list section 交给 builder。这样既移除了重复框架，又保留了 report-specific 的语义边界。

fake harness blocked upstream echo 与 execution denied upstream echo 都有上游证据对象的局部投影。Java 与 mini-kv evidence 不是简单整个对象展开，而是挑选字段并按既有顺序输出，例如 fake harness blocked echo 的 Java v131 direct echo 包含 directExecutionDeniedEchoPresent、credentialValueBoundaryClosed、rawEndpointBoundaryClosed、managedAuditConnectionBoundaryClosed、ledgerSqlSchemaBoundaryClosed；execution denied echo 的 Java v127-v130 quality evidence 则包含 liveAggregationSecondSplitDocumented、responseRecordsSecondSplitDocumented、overviewTestsSecondSplitDocumented、javaExecutionDeniedEchoPresent。v2131 保留这些局部对象投影，只把 section 包装交给 builder。

final prerequisite closure review 是本批最容易误改输出的一项。它原来没有使用 liveProbe 的 `renderMessages`，而是在本文件中输出 `- [severity] code (source): message`。共享 builder 的 `messages` section 会输出 `code (severity, source): message`，二者不等价。因此 v2131 对 blocker、warning、recommendation 都使用 `lines` section，继续调用本地 `renderMessages`。Checks 也使用 lines，而不是 entries，因为旧实现的模板字符串会把 `undefined` 渲染成字符串 `undefined`，而 shared `renderEntries` 对 undefined 有自己的 `unknown` 规则。即使当前 profile 多为 boolean，这里也不冒不必要的输出风险。

human approval artifact review upstream echo 则展示了“保留本地 evidence 片段”的价值。Java v143 Echo 和 mini-kv v136 Receipt 不只是对象字段，还包含 `### Evidence Files` 与 `### Expected Snippets` 两个三级区域。builder 的 `lines` section 允许这些三级片段原样进入 section body，不改变层级。这样主函数不再重复标题、meta、blockers、warnings、recommendations 和 next actions，但 Java/mini-kv 证据的可读结构完全保留，便于后续确认历史 sibling evidence 是否真实匹配。

## Upstream Evidence and Config / 上游证据与配置

v2131 不触碰任何实时上游执行。所有 loader 仍通过现有 config 读取 profile，focused tests 和 byte-identical compare 都使用 `UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`、`ACCESS_GUARD_ENFORCEMENT_ENABLED=true` 和 historical fixture fallback。报告中出现 Java v110、v127-v131、v143、mini-kv v117、v128-v129、v136 等版本，只代表 Node 读取已有冻结证据或已有 profile 字段，不代表本版本请求 Java 或 mini-kv 重新生成材料。

fake shell 与 fake harness 周边的边界尤其需要写清。它们都围绕“不能让假 harness 或 runtime shell 被误当成真实执行通道”展开。renderer 展示 `executionAllowed=false`、`connectsManagedAudit=false`、`fakeHarnessRuntimeEnabled=false`、`credentialValueRead=false` 等字段，但这些字段的真值来自 loader 和 profile，不来自 renderer。v2131 只调整展示层，因此不会改变执行授权，也不会放宽 no-go condition。byte-identical compare 进一步证明这些布尔值在最终 Markdown 中的位置和值都没有变化。

human approval artifact review 的证据边界也没有放松。Java v143 与 mini-kv v136 的 evidence files 和 expected snippets 继续显示 matched/resolved path 信息，用来证明历史证据中确实存在对 Node v308 review packet 的 echo 或 non-participation receipt。renderer 不生成 approval artifact，不伪造 signed approval，也不把缺失字段判断为通过。它只是把已有 profile 中的证据文件、片段匹配结果和 echo verification 摆出来。后续若要进入真实 controlled read-only shard preview，仍需要单独的 live window 计划、服务启动归属、端口、失败清理与操作员证据导入流程。

## Service Flow / 服务流程

服务流程仍是 route 调用 loader，loader 返回 profile，renderer 返回 Markdown。v2131 没有在 route 层新增参数，也没有改变 JSON route 与 Markdown route 的分流方式。对于 `?format=markdown` 的请求，route 仍然调用同一个 renderer 入口，只是入口内部从旧的数组拼接变成 builder spec。JSON 响应完全不经过 renderer，因此本批对 JSON contract 没有影响。

从代码维护角度看，迁移后的 renderer 更容易审查。以前主函数里连续出现几十行字符串、空行、spread、map 和 helper 调用，reviewer 需要在排版噪声中寻找业务行。现在主函数大致分为 `title`、`meta`、`sections` 三块，section 名称即报告目录，本地 helper 则承载局部行格式。fake harness decision record 的主函数能直接看出 Required Evidence 与 Explicit No-Go Conditions 是两个 list section；final closure 的主函数能直接看出 Source Node v327、Closure Review、Completed Prerequisites、Checks、Summary 和 messages 的顺序；human approval 的主函数能直接看出 Java 与 mini-kv reference 是本地 lines，而 Echo Verification、Checks、Summary 是 entries。

这也为后续 Phase-B merge 提供了更明确的判断依据。一个 renderer 如果只剩下 builder spec 和很少的本地 helper，就可能在 N5 阶段评估是否合并回服务文件；如果 renderer 仍承担复杂 worksheet、runbook、operator input 或 profile section 片段，就不应该为了减少文件数而硬合并。v2131 的选择是先把完整 report renderer 的框架收稳，不提前处理 controlled read-only shard preview 的 worksheet 和 profile section renderer，因为那些文件的职责明显不同。

## Safety Boundary / 安全边界

第一层安全边界是输出不变。临时测试从 `git show HEAD:<renderer>` 读取 v2130 状态的旧 renderer 源码，把相对 import 重定向到当前源码模块，再用真实 loader 生成同一份 profile。然后分别调用旧 renderer 和新 renderer，断言字符串完全相等。本批 6/6 通过，覆盖了简单 entries 报告、带本地 list formatter 的报告、带局部 evidence 投影的报告、带特殊 message 格式的 final closure，以及带三级 evidence/snippet 片段的 human approval upstream echo。

第二层安全边界是行为不变。v2131 没有修改任何 loader、digest、check、evidence resolver、historical fixture resolver、route 或测试期望。renderer 仍然是纯展示层，builder 也只是纯字符串拼接工具。即使某些报告名称里带有 execution、credential、endpoint、approval、managed audit 等高风险词，本版本没有新增执行能力，没有创建 resolver client，没有实例化 secret provider，没有打开网络连接，也没有启动 Java 或 mini-kv 服务。

第三层安全边界是抽象不膨胀。AGENTS 要求治理链不能无限增长，重复 report 应优先用 catalog/template builder，而不是复制更多完整 renderer。v2131 遵守这个方向，但也没有为了“抽象”而新增宽 helper。新增 helper 为零，所有本地 helper 都服务于当前文件的局部行格式。停止条件也写入 summary：未来只有在三个以上剩余 renderer 共享完全相同的局部 evidence 行语法，并且能通过 legacy exact compare 时，才考虑新增 helper。

第四层安全边界是跨项目不写入。当前工作树中 Java 和 mini-kv playbook 有外部未暂存改动，v2131 不 stage、不修改、不回退这些文件。Node 本版本只提交自己的 renderer、归档、计划进度和 changelog。Java 与 mini-kv 的会话可以读取它们自己的 playbook 并继续推进，但 Node 不把它们作为本批前置条件，也不要求用户为本批提供新的授权材料。

## Test Coverage / 测试覆盖

本地验证先跑 `npm run typecheck`，确认所有 builder spec、section 类型、本地 helper 和 profile 类型能通过 TypeScript。随后跑 focused Vitest：`verificationReportBuilder.test.ts`、`governanceGrowthRatchet.test.ts` 加六个业务测试文件，共 8 files / 29 tests。这个组合覆盖 builder 基础行为、服务/路由增长约束，以及每个被迁移 renderer 对应的 loader 和 Markdown route。没有运行全量大批测试，符合当前“不要每版一遍大 CI，本地先聚焦”的节奏。

最关键的是 byte-identical compare。focused tests 能证明关键字段存在，但无法证明空行、section 顺序、message 空状态、next action 空状态、三级标题和局部 evidence 行完全不变。临时 exact compare 直接比较整段 Markdown，6/6 通过，说明新旧实现对真实 profile 的输出完全一致。这个测试文件和 legacy renderer 临时目录都位于 `.tmp`，只用于本批验证，提交前必须删除。

后续收口还需要文档质量门、lint、build 和远端 CI。文档质量门会检查 r2000 bucket 的中文讲解长度、结构、重复段落和禁用标题；lint 预期继续保持 0 errors / 263 warnings，不应因为删除 liveProbe imports 或引入 builder imports 产生新 error；build 负责确认生产编译不受影响。推送后还要观察 Node Evidence 工作流，确保 typecheck、lint、test、build 和 safe smoke 全部通过。

## Next Slice / 后续切片建议

v2131 之后不宜立刻把 160 个剩余 renderer 混成一个大批次。剩余文件里有三类完全不同的维护对象。第一类是完整报告型 renderer，通常有 service、generatedAt、profileVersion、ready state、checks、summary 和 next actions，这类可以继续按六到十个一批迁移到 builder，并且每批都做 legacy exact compare。第二类是 controlled read-only shard preview 里的 profile section renderer，它们只负责一个页面或报告里的局部片段，不应该直接套完整 report builder，否则会改变 heading 层级和阅读路径。第三类是 worksheet、runbook、operator evidence、command package 或 envelope 形态，它们常常承载操作员填写、证据导入或阶段 ledger 语义，迁移前应先判断是否真的属于 report frame，而不是为了减少文件数而破坏文档结构。

下一版如果继续 N1，比较自然的方向是再扫描 runtime shell candidate gate、post decision、pre implementation plan、production readiness blocked decision 这些完整 report renderer。它们和 v2131 一样处在“真实执行前治理链”里，风险语义接近，但仍需要逐个确认 message 格式、next action 空状态和局部 evidence 行。另一条路线是先做一个剩余 renderer 分类归档，把完整报告、section renderer、worksheet/runbook 三类列清楚，再决定后续每批迁移范围。若用户要求“刀刀到肉”的维护性提升，第二条路线更适合，因为它能减少后面误迁移 preview 局部片段的概率，也能让 N5 的文件合并计划更有依据。

从生产级分片联合执行的距离看，renderer consolidation 不是最后一步，却是降低审查噪声的必要前置。真实执行前还要有 live read-only window 的启动/关闭计划、端口和 owner、失败时的清理规则、操作员证据导入模板、签名审批材料校验、Java 与 mini-kv 的只读健康检查，以及 Node 对导入证据的不可变归档。v2131 没有试图跨过去做这些事情，而是继续把审批链报告变得稳定、可比对、可维护。等 report frame 的噪声降低后，再检查 live preview 的输入输出，reviewer 才能把注意力放在证据和边界本身，而不是手写 Markdown 的偶然差异。

## One-sentence Summary / 一句话总结

v2131 把六个 runtime-prerequisite 周边 Markdown renderer 的重复报告框架迁移到共享 verification report builder，在保留 requirement、no-go、final closure message、Java/mini-kv evidence 与 expected snippet 局部语法的同时，用 focused tests 和 6/6 byte-identical compare 证明输出与行为不变。
