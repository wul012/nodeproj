# v2129 renderer consolidation batch 12

## Goal and Non-goal / 目标与非目标

v2129 的目标是把 managed-audit credential resolver 中两条相邻 prerequisite 治理链的 6 个 renderer 迁移到共享 `renderVerificationReportMarkdown`：Credential Handle Approval 的 contract intake、upstream echo verification、prerequisite closure review，以及 No-Network Safety Fixture 的 contract intake、upstream echo verification、prerequisite closure review。这两条链在业务位置上前后衔接，都是 runtime shell 和真实 resolver 实现之前的审批前置治理，报告结构也高度相似：先展示 profile 身份与执行边界，再展示 source Node 引用、上游 Java/mini-kv echo、合同或 closure review、checks、summary、blockers、warnings、recommendations、endpoints、next actions。

选择这 6 个文件，是因为它们既足够同族，又没有简单到只做表面替换。它们的外层 Markdown 骨架重复很明显：一级标题、meta bullet、多个二级 section、messages 空态、next actions 空态都遵循同一模式。旧代码把这些稳定结构和审批链独有细节混在一个数组里，导致 reviewer 打开文件时要先滤掉大量模板噪声，才能看到真正重要的 required fields、prohibited fields、rejection reasons、no-go boundaries、evidence files 和 prerequisites。v2129 要把这两层拆清楚。

本版的非目标同样重要。第一，不改任何 loader 或 type，不改变 contract digest、verification digest、ready flag、check count、production blockers 或 evidence endpoint。第二，不新增 helper。虽然两条 contract intake 都有 required/prohibited/rejection/no-go/upstream echo request 结构，两条 closure review 都有 completed/remaining prerequisite 结构，但这些 line shape 仍带有链路语义差异，贸然抽 helper 会把“审批合同内容”变成一个过宽的 formatter。第三，不触碰 Java/mini-kv 仓库，不读取它们的 dirty worktree，也不要求新 echo。

这个版本的工程价值不是把文件压到最短。迁移后 6 个 renderer 仍有 124 到 141 行，因为本地 helper 保留了真正需要就地阅读的业务细节。这是有意的：共享 builder 负责稳定的报告框架，本地 helper 负责审批链内容。若为了追求行数继续抽象，很容易得到一个参数很多、读者需要跳转多处才能理解合同细节的 helper，那会降低生产前治理材料的可审查性。v2129 的边界是“骨架统一，证据叙事留近”。

## Entry Points / 入口

六个公开 renderer 函数名保持不变：`renderManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntakeMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewMarkdown`。route 或 service re-export 不需要变化。

入口的可观察契约也保持不变。每个函数仍然接收原 profile，返回 Markdown string；标题文本不变，meta label 不变，section 顺序不变，empty text 不变，末尾换行也不变。改变的是函数内部从手写数组切换到 `renderVerificationReportMarkdown({ title, meta, sections })`。这种表达让入口更像报告目录：title 描述报告身份，meta 描述状态和安全边界，sections 描述正文块。reviewer 不再需要在几十行 `""` 和 ``##`` 字符串之间寻找真正的业务差异。

六个入口的安全 meta 都被保留下来。Credential Handle Approval contract intake 继续展示 target prerequisite id、Java v146 + mini-kv v139 echo readiness、Node v318 before upstream echo、credential value read、raw endpoint URL parsed、secret provider instantiated、resolver client instantiated、execution allowed。No-Network Safety Fixture contract intake 继续展示 network safety fixture executed、HTTP request sent、TCP connection attempted 等更偏网络边界的字段。upstream echo verification 和 closure review 也继续保留 runtime shell、managed audit connection、network attempt、execution allowed 等字段。

这些字段不是普通说明文字，而是入口层的治理护栏。读者通过 meta 可以立即知道本报告只是合同 intake、echo verification 或 closure review，而不是 runtime shell 执行授权。v2129 没有把这些安全字段藏进某个通用 summary section，也没有为了统一而删减字段。共享 builder 只是换了排版生成方式，入口仍然明确暴露“没有执行、没有读取凭据、没有打开真实 resolver、没有生产窗口”这一类边界。

## Response Model / 响应模型

响应模型仍然是 Markdown。`renderVerificationReportMarkdown` 输出的结构与旧手写模式一致：一级标题后空行，meta bullet 连续输出，然后每个 section 用空行、二级标题、空行、正文组成，最后带一个空行。v2129 的 exact compare 从 `git show HEAD` 抽取迁移前六个 renderer，改写 import 后和新 renderer 对同一份 profile 输出做字符串全等比较，6/6 通过。这意味着 section heading、空行、缩进、messages 空态、list 格式和证据行都没有漂移。

contract intake 的 response model 保留本地 `renderContract`。这个 helper 先输出合同 digest、name、version、mode、source span、target prerequisite、purpose、field counts、no-go count、upstream echo request count 和 implementation blocked 状态，然后再输出 `### Required Fields`、`### Prohibited Fields`、`### Rejection Reasons`、`### No-Go Boundaries`、`### Upstream Echo Requests`。这些三级标题属于合同正文的一部分，不适合拆成顶层 builder sections，因为它们和合同字段共同构成一个证据块。

upstream echo verification 的 response model 保留本地 Java/mini-kv evidence helper。Credential Handle Approval 使用 Java v146 和 mini-kv v139；No-Network Safety Fixture 使用 Java v149 和 mini-kv v141。两者都展示 source version、receipt version、evidence present、verification documented、echo alignment、ready for next Node、side-effect boundary 等信息，并在内部输出 `### Evidence Files`。这些 evidence file 行不是 v2127 的 standard evidence-file helper 形状：有些包含 resolved path，有些只包含 digest missing，有些字段名按上游版本定制。因此本版不复用 evidence-file helper。

closure review 的 response model 则保留本地 `renderClosureReview`。它输出 review digest、review mode、source span、source verification digest、completed/remaining/original prerequisite count、moved prerequisite、from/to、next concrete prerequisite、requested Java/mini-kv version、chain continuation、runtime shell still blocked、closure reason，然后展开 completed prerequisites 和 remaining prerequisites。这个块表达的是治理链状态迁移，而不是普通 entries；保留在本地能让读者看到闭环依据。

## Upstream Evidence and Config / 上游证据与配置

v2129 不读取实时 Java 或 mini-kv 服务。loader 仍然按既有逻辑读取 Node 仓库中的冻结材料、历史 fixture 或内置 profile；renderer 只接收已加载的 profile。测试配置关闭 upstream probes 和 upstream actions，并设置 historical fixture fallback，防止本地 sibling workspace 的偶然状态影响结果。也就是说，本版输出里出现 Java v146、mini-kv v139、Java v149、mini-kv v141，只代表历史 echo 或 non-participation receipt 的证据引用，不代表本轮重新消费上游项目。

这种上游边界让 Java 和 mini-kv 可以继续并行推进。Node v2129 不要求它们补新文件、不要求它们开端口、不要求它们重新跑 CI，也不改变任何 schema 合同。当前工作树里 Java / mini-kv playbook 的外部修改仍然不是本版提交范围，Node 只提交自己的 renderer、归档和计划索引。跨项目协作的正确状态是：Node 继续消化自身展示层重复，Java/mini-kv 继续按各自计划做后期治理，互不制造伪阻塞。

No-Network Safety Fixture 这条链尤其容易被误读，所以本版保留了网络边界字段。contract intake 和 upstream echo verification 都展示 network safety fixture executed、HTTP request sent、TCP connection attempted、credential value read、raw endpoint URL parsed、execution allowed。它们的值仍由原 profile 决定，renderer 不参与判断。将这些字段放在 meta 层，能让读者在第一屏就知道当前报告没有打开网络执行口。

Credential Handle Approval 链也保持 managed audit 边界。upstream echo verification 和 closure review 展示 connects managed audit、credential value read、execution allowed、runtime shell implemented 等字段。即使报告名称里有 credential handle 和 managed audit，本版本仍然只是审批前置证据展示；真实 resolver、secret provider、runtime shell invocation 和 production operations 都没有被启用。v2129 的改动不会把任何 read-only governance report 变成执行报告。

## Service Flow / 服务流程

服务流程继续是 route 或 service 调 loader，loader 返回 profile，renderer 把 profile 转为 Markdown。v2129 修改的仅是 renderer 最后一段。旧版本在函数里构造一个大数组，里面穿插 meta bullet、section heading、helper 输出和空行；新版本把 meta 与 sections 显式传给 builder。helper 函数还在同一文件内，负责 contract、source node、Java echo、mini-kv receipt、closure review 和 prerequisites 的本地行展开。

Contract intake 的迁移可以作为模板理解。旧函数先写标题和 15 到 18 个 meta bullet，再展开 Source Node、Contract、Prerequisite Transition、Necessity Proof、Checks、Summary、Production Blockers、Warnings、Recommendations、Evidence Endpoints、Next Actions。新函数中这些块变成 `sections` 数组，每个 section 的 body 类型一眼可见：source node 和 contract 是本地 lines，transition/proof/checks/summary/endpoints 是 entries，blockers/warnings/recommendations 是 messages，next actions 是 list。业务块没有变，只是被分类。

Upstream echo verification 的迁移保留 Java 与 mini-kv 专用 helper。这里不能简单把 upstreamEvidence 对象丢给 entries，因为 evidence files 需要在各自子块下展示。builder 支持 `lines` section，所以 `renderJavaV146`、`renderMiniKvV139`、`renderJavaV149`、`renderMiniKvV141` 原样保留。这个选择让 exact compare 容易成立，也让后续 reviewer 能在同一文件看到某个上游版本的展示格式。

Prerequisite closure review 的迁移新增了 `renderClosureReview` 小 helper。旧代码把 closure review entries 和两个 `###` prerequisite 小节直接内嵌在主函数数组中，导致主函数很长。新 helper 只把原本已经属于同一 closure review section 的内容移到函数下方，没有改变格式，也没有跨文件抽象。这样主入口更清楚，而 closure 细节仍然就在同一个 renderer 文件里，维护者不需要跳到共享 builder 以外寻找业务逻辑。

## Safety Boundary / 安全边界

第一层安全边界是输出不变。v2129 的临时 exact compare 对六个 renderer 都执行旧/新对比，旧 renderer 来源是当前 HEAD，也就是 v2128 提交中的手写实现。测试用同一个 profile 对象喂给旧 renderer 和新 renderer，避免 `generatedAt` 时间字段造成差异。6/6 通过，说明迁移没有改变任何 Markdown 可见输出。

第二层安全边界是行为不变。本版不触碰 loader，不修改 check 计算，不改生产阻断条件，不改 evidence 文件存在性判断，不改 route 注册，也不改 access guard。renderer 仍然是纯文本转换层。`renderVerificationReportMarkdown` 本身不读文件、不访问网络、不启动进程、不调用随机数，也不依赖当前时间；因此它适合承接这些只读报告的外层骨架。

第三层安全边界是抽象克制。本版没有为 required fields、prohibited fields、rejection reasons、no-go boundaries、upstream echo evidence files、closure prerequisites 新增共享 helper。虽然短期看会多留一些本地代码，但这保护了审批链语义。只有当后续更多 prerequisite 链证明这些 line shape 完全同构，且 exact compare 能覆盖所有差异时，才值得提取新的 helper。现在的停止条件写入 summary，防止 helper 继续无边界增长。

这里需要特别说明“没有新增 helper”不是保守拖延，而是对后期工程债的主动控制。Credential Handle Approval 的 Java evidence file 行包含 resolved path，No-Network Safety Fixture 的 Java evidence file 行则使用 digest 或 missing；Credential Handle Approval 更关心 managed audit credential handle 不被提前读取，No-Network Safety Fixture 更关心 HTTP/TCP 连接和网络安全 fixture 没有被执行。它们外层报告结构相同，但内层证据语义并不完全同构。如果现在抽出一个宽泛的 approval prerequisite chain formatter，调用点会变短，读者却必须理解一堆可选参数，反而更难判断某个字段为什么存在。v2129 选择让共享 builder 只处理稳定框架，本地 helper 继续承载业务证据，是为了让后续修改可以沿着证据语义定位，而不是沿着抽象参数定位。

还有一个隐含风险是三项目语义误传播。No-Network Safety Fixture 的名字容易让人以为 Node 正在执行网络安全检查，Credential Handle Approval 的名字容易让人以为 Node 正在触碰真实凭据。v2129 保留 meta 层字段，并在本地 evidence helper 中保留每条上游 echo 的只读边界，就是为了避免这种误读。报告可以说 Java 某个版本 echo 了合同，或 mini-kv 某个版本提供了 non-participation receipt，但不能让读者以为本版本重新打开了 Java/mini-kv 运行时。正因为这些词很接近真实执行，本版才更需要字节级对比和本地语义保留。

第四层安全边界是跨项目隔离。v2129 只变更 Node repo 内的 renderer 和归档计划文件，不提交外部会话改动的 Java / mini-kv playbook，不让其他项目承担 Node 重构的验证成本。Java 和 mini-kv 的进度仍可以由各自会话处理；Node 只有在需要 fresh evidence、live service startup 或 schema 合同时，才应把它们列为真实前置。

第五层安全边界是清理。临时 exact compare 创建 `.tmp/v2129-byte-identical-compare.test.ts` 和 `.tmp/v2129-legacy-renderers/*.ts`，build 会创建 `dist`。这些都是验证产物，不属于版本交付，提交前必须删除。本版没有启动 HTTP server、Playwright 浏览器、Java 服务、mini-kv 服务或后台 Node 进程，所以收尾只需要文件清理，不需要进程关闭。

## Test Coverage / 测试覆盖

本版先跑 `npm run typecheck`，确认六个 renderer 的 builder section 类型、profile 字段访问和新增 `renderClosureReview` helper 都能通过 TypeScript。随后跑 focused batch：`verificationReportBuilder.test.ts`、`governanceGrowthRatchet.test.ts` 加六个业务测试文件，共 8 个测试文件、30 个断言。这个批次覆盖 builder 基础行为、服务/路由增长约束、合同 intake、upstream echo verification 和 prerequisite closure review 的关键输出。

最关键的仍是 byte-identical compare。renderer consolidation 的风险不是业务断言失败，而是 Markdown 文本悄悄漂移：比如多一个空行、少一个 resolved path、section 顺序变化、empty text 不同、三级标题缩进不同。临时 compare 直接用旧 renderer 和新 renderer 对同一 profile 进行全字符串比较，6 个文件全部通过，说明本版可以作为无行为变化的重构提交。

后续正式收尾还要跑文档质量 gate、lint、build 和远端 CI。文档 gate 保证本篇中文讲解达到当前规则，不出现旧式英文标题或难读模板；lint 预期保持既有 263 warnings / 0 errors 基线；build 兜底输出编译。提交前清理 `.tmp` 和 `dist` 后，再打 tag `v2129` 推送，让 Node Evidence CI 完成 typecheck、lint、test、build 和 safe smoke。

v2129 之后，下一批不应直接冲 controlled read-only shard preview 的大块文件。那一带有 profile section renderer、worksheet renderer、runbook renderer 和 operator evidence value supply renderer，形状比本版复杂，应该先做一次专门分类：哪些只是 section 片段，哪些是完整 Markdown report，哪些需要保留本地表格/worksheet lines，哪些可以进入 builder。合适的下一步可能是 Endpoint Handle Allowlist Approval 或 Signed Human Approval Artifact 的同类 prerequisite 链，它们与本版更接近，exact compare 风险更可控。

从测试策略上看，v2129 也刻意避免一版一全量本地大跑。这个仓库的 Vitest 总量很大，之前已经观察到全量测试会启动大量 worker，占用明显内存；用户也明确希望四五个版本再做更重验证。当前版本的风险集中在六个 renderer，所以 typecheck、focused tests、exact compare、docs gate、lint、build 加远端 Node Evidence CI 已经覆盖主要风险面。这样做不是降低质量要求，而是把本地资源用在能直接发现本版回归的位置上，再由 CI 兜底全链路。

下一批如果继续沿 prerequisite chain 推进，优先级应高于 controlled read-only shard preview。原因是 Endpoint Handle Allowlist Approval、Signed Human Approval Artifact 等链条和本版结构近似，也能继续用同一套 exact compare 方法；controlled read-only shard preview 则混有 section renderer、worksheet、operator evidence envelope、runbook 和 command worksheet，直接混进一个版本容易让解释变散。更好的节奏是先把相邻 approval chain 的完整 report renderer 收拢，再单独为 controlled preview 做分类计划，判断哪些是完整 report，哪些只是局部 section，哪些根本不适合 `renderVerificationReportMarkdown`。

## One-sentence Summary / 一句话总结

v2129 将 Credential Handle Approval 与 No-Network Safety Fixture 两条 prerequisite 审批链的 6 个 renderer 迁移到共享 verification report builder，在保留合同、上游 echo 和 closure prerequisite 本地证据叙事的同时，证明 Markdown 输出逐字节不变。
