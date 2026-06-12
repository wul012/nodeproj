# v2124 renderer consolidation batch 7

## Goal and Non-goal / 目标与非目标

v2124 的目标是把 minimal read-only integration 这一族 archive verification renderer 迁移到共享的 `renderVerificationReportMarkdown`。本版覆盖五个文件：minimal read-only integration smoke、minimal read-only integration passed、managed-audit-disabled read-only integration intake、minimal read-only integration regular gate、minimal read-only integration gate execution。它们处在 sandbox handle review 之后、真实分片联合执行之前，是“只读集成链路是否已经被归档验证”的报告层。旧实现仍然手写标题、meta、section heading、空行、entries、messages、list 和 archive references；v2124 把这些重复外壳改成 builder spec，让每个文件只保留字段选择和少量真正特殊的行生成逻辑。

这版不是简单追数量。五个文件里，前四个基本是标准 entries/messages/list/raw archive references 形态；gate execution 多了 `Target Results` section，它需要逐个展示 Java/mini-kv read-only target 的 targetName、status、readOnly、mutatesState、attempted、latency、statusCode、responseShape、errorCode、errorMessage。这个结构不是普通 `renderEntries` 能表达的，也不应该抽成全局 helper。v2124 因此保留 `renderTargetResult` 本地函数，只把它的输出放进 `{ heading: "Target Results", lines: ... }`。这样既完成 builder consolidation，又不把 read-only smoke target 的业务格式泄漏到通用 builder。

选择这一族还有一个维护原因：minimal integration 是“只读跨项目消费”进入真实执行之前最容易被误读的一段。报告里出现 Java、mini-kv、managed audit、credential、raw endpoint 等词，很容易让后来阅读者以为 Node 已经具备执行能力。旧 renderer 手写大量重复行时，这些安全字段被埋在模板噪声里。迁移后，meta 里的安全边界会更醒目，section 列表也更容易看出报告只是归档验证、不是 live probe 重放。对生产级治理来说，这种可读性比减少几行代码更关键。

非目标也很明确。第一，本版不处理 shard readiness 两个 renderer，因为它们与 active shard / minimal shard readiness 的证据消费更接近，应独立批次验证。第二，本版不处理 runtime execution pass evidence，因为它用 `flatMap(renderEntries)` 展开 archive references，和普通 file-reference 行不同。第三，本版不处理 fake transport packet，它与 fake transport archive 的安全叙事相关，最好单独收尾。第四，本版不改 loader、route、profile type、测试期望、access guard 或上游证据 schema。Java 和 mini-kv 继续 recommended parallel，不需要为 Node v2124 提供新证据。

## Entry Points / 入口

本版保留五个 public export 的函数名和文件名。route 层继续调用 `renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationMarkdown` 和 `renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationMarkdown`。这些入口仍然接收同样 profile，返回同样 markdown string。

入口不变的价值在于把 diff 的风险限制在 renderer 内部。smoke 文件仍然报告 Node v346 的只读 integration smoke archive；passed 文件仍然记录从 smoke 到 v351 intake 的 transition；managed-audit-disabled intake 仍然确认 managed audit 连接和 credential 读取保持禁用；regular gate 仍然记录 CI/operator friendly check；gate execution 仍然列出目标结果和 operator/CI handoff check。外部调用者不需要知道内部实现已经从数组拼接切换到 builder spec，现有 tests 也不用改 expected。

这些入口的 meta 行仍然按旧顺序显式列出。minimal integration family 的 meta 与 sandbox handle 不完全一样：有的报告 `Archive result` 和 `Archive decision`，有的报告 `Transition state` 和 `Transition decision`，有的报告 `CI/operator friendly check included` 或 `Operator/CI handoff check included`。v2124 没有尝试统一这些字段名，因为这些差异就是各版本安全叙事的一部分。builder 只负责排版，不负责把不同历史节点伪装成同一个模型。

从入口角度看，v2124 还保留了“历史节点身份”。smoke 是 v346 的结果归档，passed 是 v349 到 v351 的过渡，managed-audit-disabled intake 是 v351 的后续 intake，regular gate 是 v364 的 CI/operator friendly gate，gate execution 是 v367 的显式 read-window gate execution 归档。它们名字都很长，但长名本身说明了工程状态机的阶段。若为了简化而把这些标题压成一个统一模板，短期看更整齐，长期会丢失审查者判断风险所需的上下文。

## Response Model / 响应模型

响应模型仍是 markdown。标准 section 继续由 builder 表达：Source Node、Archive Verification、Transition Record、CI / Operator Friendly Check、Operator / CI Handoff Check、Checks、Summary 都是 entries section；Production Blockers、Warnings、Recommendations 是 messages section；Next Actions 是 list section；Archive References 是 raw lines section。v2123 新增的 `renderVerificationArchiveFileReferenceLines` 在本版得到复用，它覆盖 `- path: exists=...; bytes=...; digest=...` 这一完全同形的行格式。

本版最重要的响应差异是 gate execution 的 Target Results。旧实现用 `profile.targetResults.flatMap(renderTargetResult)` 展开每个目标，输出一个一级 bullet 加若干缩进字段。v2124 没有把这个函数搬进 builder，因为 target result 不是通用 archive reference，也不是所有 minimal integration renderer 都具备的结构。保留本地 helper 让阅读者能直接看到这个 renderer 的特殊业务：它不是只确认归档文件是否存在，还要展示每个只读目标的尝试结果和安全属性。

`Target Results` 的保留也避免了过度抽象。这个 section 的缩进行里有 latency、statusCode、responseShape、errorCode、errorMessage 等运行结果字段，它们和 archive reference 的 path/exists/byteLength/digest 完全不是一个层次。若把它们也塞进 verificationReportBuilder，builder 会开始承担具体业务报告格式，后续每个特殊 section 都可能要求新增一种通用类型。v2124 反过来证明 builder 的边界：通用排版归 builder，特殊行生成留在 renderer。

这个本地 helper 也方便后续审查真实执行前的只读目标。如果某个目标将来增加 retry、header 或协议字段，修改点会留在 gate execution renderer 附近，而不是扩散到所有 verification report。对这种仍在生产前阶段的项目来说，保留局部业务格式比过早追求全局统一更稳。

archive references 的处理则相反，应该共享。五个文件过去都写了几乎一样的 `renderArchiveFileReferences`，只是引用字段列表略有不同：smoke/passed 走 activePlan，regular/gate execution 走 sourcePlan 和 archiveIndex，managed-audit-disabled intake 不含 archiveIndex。v2124 把行格式共享出去，但仍在每个 renderer 里显式列出字段顺序。这样既减少重复，又保留报告合同中最重要的“哪些文件被展示”的可审查性。

## Upstream Evidence and Config / 上游证据与配置

v2124 不需要新鲜 Java 或 mini-kv evidence。这里的 minimal read-only integration 是历史归档验证，不是重新运行 read-only smoke，也不是启动真实上游服务。profile 来自 Node 已冻结归档和本地 fixtures，renderer 只消费 loader 生成的对象。`UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`、access guard headers 等安全设置仍由测试和 route 层覆盖；renderer 不读取配置、不启动进程、不打开网络。

跨项目并行结论仍然是 Java 和 mini-kv recommended parallel。本版没有要求它们提交新版本，也没有要求它们写回 Node playbook。当前工作树里 Java / mini-kv playbook 可能有其他会话写入的进度记录，Node v2124 不 stage、不回滚那些改动。这样三项目可以继续并行：Node 消化自己的报告展示层，Java 和 mini-kv 按各自 playbook 做 CI、覆盖率、lint 或文件拆分。只有未来 Node 需要 fresh evidence、live startup 约定或 schema 变更时，才应把它们列为阻塞前置。

从真实分片联合执行的距离看，v2124 仍属于前置保养，而不是打开执行。它把只读集成报告变薄，是为了让后续真正讨论 live preview、shard readiness、operator approval 时，代码库不再被大量重复 renderer 外壳干扰。也就是说，本版的价值不是“更接近自动执行按钮”，而是“让执行前的证据阅读和维护更可靠”。对生产前治理工程来说，这种清理是必要地基。

这个定位对三项目并行很重要。Java 和 mini-kv 即便同时推进自己的 coverage、lint 或文件拆分，也不会因为 Node v2124 而产生新合同负担。Node 只是在整理已经冻结的报告呈现方式，没有要求上游重新跑服务、重新生成截图或补交证据。未来如果要做真实 shard preview，应该先让 Node 的报告层足够薄，再定义明确的 live input/output 合同。v2124 正是在降低那一步之前的历史负担。

## Service Flow / 服务流程

服务流仍然是 route 调 loader、loader 读归档生成 profile、renderer 渲染 markdown。旧 renderer 把所有排版写在一个数组里，新 renderer 把 title、meta、sections 交给 builder。以 regular gate 为例，sourceNodeV364、archiveVerification、ciOperatorFriendlyCheck、archiveReferences、checks、summary、messages、nextActions 的顺序完全保留。gate execution 也是同样流程，只是在 Source Node v367 后插入 Target Results raw lines，再继续 Archive Verification 和 Operator / CI Handoff Check。

这种迁移让文件职责更集中。旧文件阅读时，真正的业务差异被大量模板行包住：空行、`##` 标题、`renderEntries` 调用、空态文案不断重复。新文件里，差异集中在 meta tuple 和 sections 列表。reviewer 可以很快确认：哪些 meta 行存在，哪个 source 节版本被引用，哪些 section 是 entries，哪个 section 是 raw lines，archive reference 字段是否沿用旧顺序。对后续 Phase-B 合并来说，这种结构更容易折回 service。

v2124 也证明了 v2123 的小 helper 有复用价值。`renderVerificationArchiveFileReferenceLines` 不是只服务 sandbox handle 的一次性函数；它能覆盖 minimal integration family 里同样的 file-reference 行格式。与此同时，gate execution 的 Target Results 被保留为本地 helper，说明复用不是无边界扩张。共享的是稳定、重复、无业务决策的字符串行；保留本地的是具体、少数、带业务语义的目标结果行。

这套分层会直接影响后续尾项怎么做。剩余 renderer 里，shard readiness 需要看 active shard 与 minimal shard 的区别，runtime pass evidence 需要单独处理 `flatMap(renderEntries)`，fake transport packet 则可能更适合和 fake transport archive 证据一起收。v2124 收掉 minimal integration 后，剩余工作不再是一堆相似长文件，而是三种明确不同的形态。计划就可以写得更准确，验证也能按风险分批，而不是用一个大版本吞掉所有尾项。

尤其是 shard readiness，不应该被当成 minimal integration 的附属品。read-only integration 关注“只读目标是否已经被归档验证”，shard readiness 关注“分片边界、消费证据和后续 preview 是否具备条件”。它们都在真实执行之前，但读者要回答的问题不同。把 shard readiness 留到下一批，能让下一版专门检查 active shard、minimal shard、source evidence consumption 的字段关系，也能避免本版讲解和验证把两种边界混成一个模糊的“接近真实执行”叙事。

## Safety Boundary / 安全边界

安全边界首先体现在行为不变。v2124 没有改 route path，没有改 loader fallback，没有改 profile 字段，没有改访问控制，也没有改任何测试期望。所有 ready flag、executionAllowed、startsJavaService、startsMiniKvService、connectsManagedAudit、reads credential、raw endpoint parsed 等安全字段仍来自旧 profile。renderer 不根据这些值执行动作，只把它们按旧标签输出到 markdown。

其次是批次边界。把五个 minimal integration 文件放在一起，是因为它们都服务同一只读集成链路；把 shard readiness、runtime pass evidence、fake transport 留到后面，是因为它们的风险不同。shard readiness 更靠近分片边界；runtime pass evidence 的 archive reference 展开方式不同；fake transport packet 是另一个安全故事。v2124 没有为了增加文件数量把不同风险混合在一起，这比一次改十个杂项文件更可审查。

安全边界还体现在“没有顺手修业务文案”。在这种归档报告里，哪怕一个 label 的大小写、一个 ready flag 的描述、一个空态句子改变，都可能让历史归档和说明材料出现不一致。v2124 的策略是只改变实现形态，不美化旧文案，不统一不同历史节点的词汇。是否要整理文案，应当是另一个明确版本，并且需要更新归档说明和 exact compare 目标；本版只证明结构迁移不改变读者看到的内容。

最后是工作树边界。当前 Node 仓库里还存在 Java 和 mini-kv playbook 的外部未提交改动。它们不是 v2124 的产物，不应进入本版 commit。提交时只应 stage Node renderer、builder/helper 相关测试、计划、changelog 和 v2124 归档。这个边界能防止三项目并行时互相污染，也能让每个 commit 的审查意图保持单一。

## Test Coverage / 测试覆盖

本版验证先跑 `npm run typecheck`，确认五个 renderer、共享 archive helper 和 gate execution 的本地 target helper 类型一致。随后跑 focused batch：`verificationReportBuilder.test.ts`、`governanceGrowthRatchet.test.ts` 加五个 minimal integration archive verification 测试，共 7 个测试文件、20 个断言。它覆盖 builder helper、service/route 数量不增长、各 route 的 JSON/Markdown、失败关闭路径、ready flag、安全字段和 archive summary。

最关键的仍然是 exact compare。临时 Vitest 从 `git show HEAD:<renderer>` 读取迁移前源码，把旧相对 import 改写到当前源码目录，加载真实 profile 后同时运行旧 renderer 和新 renderer。5 个 renderer 全部逐字节一致，说明标题、meta label、section 顺序、Target Results 缩进行、archive reference 行、messages/list 空态和末尾换行都没有变化。这个方法避免了手写 expected markdown 的漂移风险。

focused tests 和 exact compare 的职责不同。focused tests 证明 loader、route、失败关闭、安全字段和公开接口仍能工作；exact compare 证明展示层迁移没有改变任何字符。两者都需要，因为 route 测试通常只断言关键片段，不会覆盖每一个 archive reference 行和空行；而 exact compare 不会替代失败关闭路径或 access guard header 覆盖。v2124 同时跑这两层，是为了让“重构无行为变化”这句话有足够证据。

后续收尾还会跑文档质量 gate、lint、build，并在推送后等待远端 Node Evidence CI。lint 的 263 warnings 是 v2115 既有基线，本版不扩大 warning cleanup 范围。`.tmp` exact compare 文件和 build 输出 `dist` 都应在提交前删除。只要这些 gate 通过，v2124 就能作为 N1 的第七个批次收口，让剩余未迁移 renderer 缩小到 shard readiness、runtime pass evidence 和 fake transport 这些更明确的尾项。

这也让下一版的计划不必重新解释 minimal integration，可以直接聚焦剩余尾项的真实差异。
本版所有验证都围绕同一个原则：实现变薄，输出和行为不动。
这是本版底线。
也方便复核。

## One-sentence Summary / 一句话总结

v2124 把 minimal read-only integration 五件套迁移到共享 verification report builder，在复用 archive-reference helper、保留 gate execution 本地 target-result 行、并保持输出逐字节一致的前提下，继续压薄 N1 剩余 renderer，为后续 Phase-B 合并和 N5 代码健康治理铺路。
