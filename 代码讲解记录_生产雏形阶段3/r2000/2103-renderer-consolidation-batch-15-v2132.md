# v2132 renderer consolidation batch 15

## Goal and Non-goal / 目标与非目标

v2132 继续执行 N1 的 renderer consolidation，这一批聚焦 runtime shell candidate、post-decision plan intake、chain stop/prerequisite 三段治理链上的完整 Markdown 报告。它们处在真实 runtime shell 实现之前，职责是把“为什么仍然不能实现或调用 runtime shell”“哪些前置条件还在阻断”“Java 与 mini-kv 是否只读 echo 了 Node 决策”这些材料展示出来。旧实现共同问题很明确：每个文件都手写一级标题、meta 行、若干 `##` section、blockers、warnings、recommendations、evidence endpoints 和 next actions；真正不同的部分只有 decision record 投影、requirement/no-go 字符串、continuation options，以及 Java/mini-kv evidence files 与 expected snippets。

本版本目标是继续把公共报告框架迁移到 `renderVerificationReportMarkdown`，让主函数变成稳定的报告规格描述。非目标也保持清楚：不改 loader，不改 route，不改 profile type，不改历史 fixture，不新增真实执行能力，不启动 Java 或 mini-kv 服务，不打开 managed audit 连接，不读取 credential value，不解析 raw endpoint URL，也不把 runtime shell 的禁止状态改成允许状态。所有行为仍由已有 loader 和 checks 决定，renderer 只负责纯展示。

这次选择 6 个文件，而不是把全部 runtime shell 相关 renderer 一次性吃掉，是因为这一组处在同一条治理链上，验证成本可控。candidate gate upstream echo 验证 Node v297 与 Java v134、mini-kv v131 的 echo；candidate gate decision record 基于 Node v298 记录候选门决策；post-decision continuation plan intake 继续整理 Node v300 之后的计划选择；post-decision upstream echo 验证 Node v301/v302 与 Java v136、mini-kv v133；chain stop decision record 基于 Node v303 写明 stop-or-prerequisite 决策；chain stop upstream echo 验证 Node v304 与 Java v141、mini-kv v134。它们不是 UI section，也不是 worksheet，而是完整报告，适合迁移到 report builder。

## Entry Points / 入口

六个公开入口函数保持原名、参数和返回值不变。`renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeMarkdown` 仍接收 post-decision continuation plan intake profile；`renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMarkdown` 仍接收 post-decision upstream echo verification profile；`renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordMarkdown` 仍接收 chain stop decision record profile；`renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMarkdown` 仍接收 chain stop upstream echo verification profile；`renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordMarkdown` 和 `renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationMarkdown` 仍接收 candidate gate 对应 profile。route 层调用无需改变。

入口函数现在都以 `renderVerificationReportMarkdown({ title, meta, sections })` 为核心。meta 保留旧标签和顺序，例如 post-decision continuation plan intake 仍展示 plan intake state、ready for v301 plan intake、ready for Java v136 + mini-kv v133、ready for Node v303、runtime shell implemented、runtime shell invocation allowed、execution allowed、connects managed audit；chain stop decision record 仍展示 runtime shell chain decision、ready for Java v141 + mini-kv v134 echo request；candidate gate upstream echo 仍展示 ready for Node v299 decision record 与 ready for runtime implementation。renderer 没有重算这些值，只是从 profile 读取。

本地 helper 的保留点也很明确。post-decision continuation plan intake 新增 `renderContinuationPlanIntake`，只是把原本散在主函数里的 intakeDigest、selectedContinuationDecision、decisionOptionCount、nextJavaEchoVersion、runtimeShellImplementationAllowed 等字段收成一个局部投影。chain stop decision record 与 candidate gate decision record 各自有 `renderDecisionRecord`，字段相似但不完全相同，所以保留在各自文件里。Java/mini-kv upstream echo renderer 保留 `renderJavaReference` 和 `renderMiniKvReference`，因为 evidence files 和 expected snippets 仍需要三级标题展开。

## Response Model / 响应模型

响应仍是 Markdown string，且 byte-identical compare 已证明与旧实现逐字节一致。shared builder 只负责通用结构：一级标题、meta bullet、section heading、空行和末尾换行。section body 分为四种：对象用 entries、标准 message 用 messages、普通列表用 list、已经由本地 helper 生成好的 Markdown 行用 lines。这个模型和 v2131 一致，优点是 review 时可以把重复排版和业务证据分开看。

post-decision continuation plan intake 的 `Continuation Plan Intake` section 使用本地对象投影，因为它不是整个对象原样展开，而是旧实现指定了字段顺序。`Continuation Options` 使用 lines，而不是 list section 的空态文本，因为旧实现直接 map continuationOptions，若未来为空，旧输出没有自动加“no options”句子。为了完全保持输出，v2132 保留这种行为。Production Blockers、Warnings、Recommendations 采用标准 messages section，Next Actions 采用 list section，因为旧实现本来就是 `renderList(profile.nextActions, "No next actions.")`。

post-decision plan intake upstream echo 和 chain stop prerequisite upstream echo 都带有 Java/mini-kv 证据细节。Java reference 先输出 sourceVersion、receiptVersion、echoMode、sourceSpan、next node version、evidencePresent、verificationDocumented、sideEffectBoundariesClosed 等 entries，再输出 `### Evidence Files` 与 `### Expected Snippets`。mini-kv reference 同样保留 releaseVersion、consumerHint、receiptDigest、decision state、nonParticipationReceiptOnly 等字段。builder 的 lines section 能原样承载这些三级标题，不改变 report 层级。

chain stop decision record 与 candidate gate decision record 都有 requirement/no-go 行。它们的格式看起来相似，都是 `id: status - label; evidence=...; requiredBeforeRuntimeShell=...` 或 `code: condition -> action`，但类型不同、字段命名不同、治理语义也不同。v2132 没有新增共享 formatter，而是在各自文件里保留 `formatPrerequisite`、`formatRequirement`、`formatNoGoCondition`。这样做的收益是把抽象停止在报告框架层，不让 builder 变成 runtime shell 治理领域对象的知识库。

candidate gate upstream echo 是本批最简单的文件。Source Node v297、Java v134 Echo、mini-kv v131 Receipt、Echo Verification、Checks、Summary、Evidence Endpoints 都可直接作为 entries section；blockers、warnings、recommendations 是 standard messages；next actions 仍用 lines，因为旧实现直接 map action，没有空态句。迁移后文件只有 52 行，足以说明对于纯报告型 renderer，shared builder 能明显降低重复代码。

## Upstream Evidence and Config / 上游证据与配置

v2132 不请求新的 Java 或 mini-kv 产物。报告中的 Java v134、v136、v141 与 mini-kv v131、v133、v134 都来自既有 loader 的历史证据引用或 profile 字段。测试配置继续关闭 upstream probes 与 upstream actions，并使用 historical fixture fallback。renderer 不关心证据来自真实 sibling workspace 还是冻结 fixture，它只展示 profile 已经解析出的 evidencePresent、verificationDocumented、expected snippet matched、resolved path 等信息。

这批报告最重要的跨项目语义是“上游只读 echo，而不是执行授权”。Java 和 mini-kv 需要证明它们看见了 Node 的治理决策，或者明确写出 non-participation receipt；它们不因此拥有启动 managed audit、写 approval ledger、读取 credential value 或执行 SQL 的权限。Node renderer 展示这些字段时，也不能把“echo ready”误读为“runtime shell ready”。因此 meta 中继续保留 runtimeShellImplemented、runtimeShellInvocationAllowed、executionAllowed、connectsManagedAudit 等值，且它们仍然为 false。

配置层没有新增开关。`UPSTREAM_PROBES_ENABLED` 和 `UPSTREAM_ACTIONS_ENABLED` 仍然是安全边界；若这些开关开启，loader 的 blockers 会让 report 显示 blocked。v2132 不改变这个逻辑，也不把任何 production readiness 改成 true。Java 与 mini-kv 可以并行继续自己的计划，因为 Node 本批只重构展示层，不要求它们提交 fresh evidence，也不要求它们启动服务。

## Service Flow / 服务流程

服务流程仍是 route 调用 loader，loader 返回 profile，renderer 渲染 Markdown。JSON route 不经过 renderer，因此本批对 JSON contract 没有影响。Markdown route 的可见输出通过 exact compare 覆盖。主函数现在更像一张目录：先列 meta，再列 Source Node、Decision Record 或 Upstream Echo、Checks、Summary、Messages、Evidence Endpoints、Next Actions。局部 helper 则分别解释某个 section 内部的字段顺序。

在 post-decision continuation plan intake 中，`renderContinuationPlanIntake` 把旧实现里的 intake 对象投影移到主函数下方。这个 helper 不是共享抽象，只是让主函数不被十几行字段淹没。chain stop 和 candidate gate 的 `renderDecisionRecord` 也同理：它们提取 decisionDigest、recordMode、decisionScope、sourceSpan、decision、decisionReason、allow flags、count 字段，保留旧字段顺序。这样 reviewer 能快速看到 report 结构，也能在 helper 中检查决策字段是否保持一致。

upstream echo 两个文件的服务流更强调证据展开。Java 与 mini-kv reference helper 仍调用 `renderEntries` 与 `renderList`，因为它们需要嵌套 evidence files 和 snippets。builder 只是接收 helper 返回的 lines。这个分层避免了两种错误：一是把 evidence file 片段拆成顶层 section，破坏旧 Markdown 层级；二是把 evidence/snippet 专用语法塞进 shared builder，污染其他报告。

## Safety Boundary / 安全边界

第一层边界是输出不变。v2132 的临时 compare 从 `git show HEAD:<path>` 读取六个旧 renderer，把 import 重定向到当前源码模块，然后用真实 loader 生成 profile，分别调用旧新 renderer 比较字符串。6/6 通过，说明 title、meta、空行、section 顺序、message 空态、evidence files、expected snippets、next actions 都没有变化。

第二层边界是行为不变。没有 loader、route、type、config、fixture 或 test expectation 被改动。renderer 仍然是纯展示层；builder 也只是字符串拼装工具。虽然报告名称里包含 runtime shell、candidate gate、decision record、managed audit 等高风险词，本版本没有让 runtime shell 可实现、可调用或可执行，没有打开网络连接，也没有启动上游服务。

第三层边界是抽象不过度。v2132 没有新增 shared helper，原因是 decision record 的局部字段仍带有链路差异。candidate gate decision record 和 chain stop decision record 都有 requirement/no-go，但前者描述候选门是否可继续，后者描述 runtime shell 链是否停止或等待前置条件；强行共用业务 helper 会让“同形字符串”掩盖“不同治理语义”。当前只把公共 report frame 合并，正好停在维护收益和语义清晰之间。

第四层边界是跨项目不写入。Java 与 mini-kv playbook 外部改动仍保持未暂存，Node 本批不触碰它们。即使本批报告引用 Java/mini-kv 版本，Node 的提交也只包含自身 renderer、归档、计划与 changelog。若未来进入真实 live read-only window，才需要写明服务启动、端口、owner、失败清理与证据导入责任；v2132 没有进入那一步。

## Maintenance Classification / 维护分类

v2132 做完后，runtime shell 治理链里有一批完整报告已经 builder-backed，但剩余 renderer 仍不能简单批量迁移。后续应先按职责分类。第一类是完整 report renderer，通常以 service、generatedAt、profileVersion、state、checks、summary、messages、next actions 为骨架，适合继续迁移。这类文件的关键验证方式仍是 legacy exact compare，因为它们的可见输出就是 Markdown report。第二类是 profile section renderer，它们只负责某个更大报告里的局部片段，不能直接使用完整 report builder，否则会把局部 heading 提升成顶层 report，破坏阅读层级。第三类是 worksheet、runbook、operator evidence、stage ledger 或 command package，它们往往是操作材料，不只是状态报告，迁移前必须确认是否有相同 report frame。

这次没有选择 controlled read-only shard preview 的原因也在这里。preview 方向接近真实分片联合执行，文件名里有很多 renderer，但它们包含 live read-only window、operator evidence value supply、signed approval capture、artifact draft text package 等复杂语义。有些是完整报告，有些是片段，有些是工作表。若在没有分类的情况下直接迁移，可能会把操作员输入材料错误地当作只读报告。v2132 仍留在 runtime shell governance report 范围内，是为了继续降低治理报告噪声，同时不扰动即将进入真实执行前置的 preview 材料。

从维护收益看，本批把六个 report 的公共结构收到了 builder，减少了 91 行，但更重要的是让“哪些地方仍是业务语义”更明显。decision record 投影、requirement/no-go 行、evidence files、expected snippets 都没有被隐藏。后续 reviewer 打开文件时，不必在一长串空行和标题里寻找真正的治理内容，而是可以直接看 sections 数组和本地 helper。这个改变对生产前治理很有价值，因为生产前最容易出问题的不是一行 Markdown 少了空格，而是审批链含义被模板噪声盖住，导致某个 blocked 状态被误读成 ready。

## Production Readiness Relation / 与真实执行的关系

v2132 仍然不是真实分片联合执行版本，但它在清理真实执行前的审查路径。真实执行至少还需要几个明确前置：一是 live read-only window 的启动计划，包括 Node、Java、mini-kv 各自的端口、owner、启动命令、健康检查和关闭责任；二是操作员证据导入格式，包括 signed approval artifact、credential handle review status、endpoint allowlist review status、no-network safety reference、abort/rollback semantics reference；三是失败清理规则，包括若 Java 或 mini-kv 没启动、端口冲突、证据导入不完整、健康检查失败时，哪些进程要停止、哪些文件要保留、哪些结果不能写入归档；四是只读保障，包括禁止 credential value、raw endpoint URL、external request、approval ledger mutation、schema migration 和 mini-kv write command。

runtime shell candidate 与 chain stop 报告正好记录这些前置为什么还不能被绕过。candidate gate 不等于实现许可，post-decision continuation 不等于执行许可，chain stop/prerequisite echo 不等于生产窗口开放。v2132 保持这些报告输出不变，是为了确保后续进入 preview 或 live window 时，前置治理链仍可追溯。等 remaining renderer 分类完成后，下一阶段可以更有把握地处理 preview 的 operator evidence 和 signed approval 材料，而不是在手写 Markdown 差异里猜测哪个字段才是权威边界。

这也解释了为什么本批仍然坚持 byte-identical compare。对于接近真实执行的治理材料，任何“看起来只是文字变化”的改动都可能影响审查判断。例如 next action 空态从空列表变成“ No next actions.”，在普通报告里可能无害，但在审批链里可能被理解为没有后续阻断。又比如 final 或 chain stop 的 no-go 行如果换了顺序，reviewer 可能以为治理优先级发生变化。因此 v2132 只接受逐字节一致的迁移，不接受“语义上差不多”的人工判断。

## Test Coverage / 测试覆盖

本地验证先跑 `npm run typecheck`，确认 builder spec 和本地 helper 类型正确。随后跑 focused tests：builder、governance ratchet，加六个 runtime shell chain 相关测试，共 8 files / 29 tests。测试覆盖 Markdown route、JSON route、历史 fallback、blocked 条件和核心 profile 字段。没有运行全量测试批，避免把单批 renderer 重构变成过重的本地验证。

byte-identical compare 是本批的关键保证。focused tests 只会抽查若干字段和 route 响应，不能证明每个空行和子标题都不变。临时 compare 直接比较旧新完整 Markdown，6/6 通过。测试文件和 legacy renderer 目录都在 `.tmp` 下，提交前必须删除。后续还要跑文档质量门、lint、build，并在推送后观察 Node Evidence CI 的 typecheck、lint、test、build 和 safe smoke。

后续验证批次还可以更精细地分层。若下一批继续迁移完整 report renderer，应保持“typecheck、focused tests、legacy exact compare、docs gate、lint、build、CI”这条链；若下一批转向 renderer 分类归档，可以少跑业务 focused tests，但必须补足扫描命令和分类证据；若下一批触碰 controlled read-only shard preview，则需要额外检查 route 是否需要访问头、是否需要浏览器或 HTTP smoke、是否有截图归档价值，以及是否会因为本地 HTML 或带 header 路由触发 Playwright MCP 限制。v2132 没有这些浏览器或服务启动需求，所以没有截图，也没有启动后台进程。

另一个需要持续关注的是 warning baseline。当前 lint 仍允许 263 warnings，这是 N0 保留下来的治理债，而不是 v2132 新增的问题。每次 renderer 迁移都要确保没有新增 unused import，否则 263 会向上漂移。真正清理 warnings 应放到 N5 或专门的代码健康版本里，不应混进 renderer byte-identical 迁移，因为那会把输出保持不变和代码健康修复混在一起，增加 review 难度。v2132 保持这个边界，先把报告框架收稳，再让后续版本有条件做更干净的 warning burn down。

## One-sentence Summary / 一句话总结

v2132 把 runtime shell candidate、post-decision、chain stop/prerequisite 三段治理链上的六个完整 Markdown renderer 迁移到共享 verification report builder，保留本地 decision/evidence 行语法，并用 focused tests 与 6/6 byte-identical compare 证明输出和行为不变。
