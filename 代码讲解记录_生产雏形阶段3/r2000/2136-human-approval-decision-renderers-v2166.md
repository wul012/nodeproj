# v2166 代码讲解：human approval 决策链 renderer 成组迁移

## Goal and Non-goal / 目标与非目标

v2166 的目标是继续执行 N1 renderer consolidation，把 human approval artifact review 链条中两份决策型 Markdown renderer 迁移到 `renderVerificationReportMarkdown`。这两份文件分别是 `managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateRenderer.ts` 和 `managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionRenderer.ts`。前者对应 Node v310，描述 post-echo decision gate：Node 已经拿到 v309 的 review packet upstream echo verification，但仍不能打开 runtime shell，只能请求 Java v144 与 mini-kv v137 做 read-only decision echo。后者对应 Node v312，描述 governance stop prerequisite closure decision：Node v311 已验证 Java/mini-kv echo 后，只能关闭 `java-mini-kv-decision-echo` 这一项，其他五项人工或非秘密审批前置仍然缺失。

本版非目标同样明确：不改变任何 profile loader，不改变 route，不改变 historical fixture，不改变 Java 或 mini-kv 的证据要求，不启动 sibling service，不写 approval ledger，不解析 credential value，不解析 raw endpoint URL，不放开 managed audit 连接，也不声称真实分片联合执行已经发生。迁移只发生在 Markdown 展示层；所有业务状态仍由原 loader 计算，所有安全边界仍由原 checks 和 focused tests 证明。

## Entry Points / 入口与调用关系

post-echo decision gate 的公开入口是 `renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateMarkdown(profile)`。它接收 `loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate` 产出的 profile，并由 audit route 同时暴露 JSON 与 Markdown。profile 内部包含 source Node v309、decisionGate、checks、summary、productionBlockers、warnings、recommendations、evidenceEndpoints 和 nextActions。

governance-stop prerequisite closure decision 的公开入口是 `renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMarkdown(profile)`。它接收 Node v312 closure decision profile，消费 Node v311 的 post-echo decision upstream echo verification reference，并展示 closureDecision 中 completedPrerequisites 与 remainingPrerequisites。调用方没有变化；变化只在 renderer 内部，从手写字符串数组改成 builder spec。

两条入口的共同点是它们都属于 human-approval 决策链，而不是执行链。它们只把“为什么还不能继续执行”写清楚，让后续版本知道哪些前置已经闭合、哪些仍然阻断。这个定位决定了它们适合一起迁移：它们的业务边界接近，测试模式接近，都有动态 `generatedAt`，都已经有 route/fallback/blocked-path focused tests。

## Response Model / 响应模型与报告结构

post-echo decision gate 的 meta 包括 service、generatedAt、profileVersion、decisionGateState、runtimeShellChainDecision、ready flag、Java/mini-kv echo request readiness、runtime shell flags、executionAllowed 与 connectsManagedAudit。sections 包括 Source Node v309、Decision Gate、Required Post-Echo Prerequisites、Explicit No-Go Conditions、Necessity Proof、Checks、Summary、Production Blockers、Warnings、Recommendations、Evidence Endpoints、Next Actions。迁移后这些 heading 的顺序、空行与尾换行保持不变。

governance-stop prerequisite closure decision 的 meta 包括 service、generatedAt、profileVersion、decisionState、governanceChainDecision、ready flag、active Node decision version、new Java/mini-kv echo request flags、runtime shell flags、executionAllowed 与 connectsManagedAudit。sections 包括 Source Node v311、Closure Decision、Checks、Summary、Production Blockers、Warnings、Recommendations、Evidence Endpoints、Next Actions。Closure Decision 内部仍然包含 `### Completed Prerequisites` 和 `### Remaining Prerequisites` 两个 H3 子块，这是领域结构，不是通用 builder 的职责。

这两个输出都保留动态时间字段，所以测试采用 normalized profile。固定 `generatedAt = "2026-07-07T00:00:00.000Z"` 后，post-echo decision gate 的 SHA-256 是 `8e12af44f0a03e8e4176a22ff82d0eb490a679ae16e0e8086f4b1a4ded8bec3c`，长度 12160，H2 为 12，H3 为 0；governance-stop prerequisite closure decision 的 SHA-256 是 `4066f2f00da8224e23dac0c84b2ac6843f1b45d397214bef31dac3aaab4d128b`，长度 7255，H2 为 9，H3 为 2。hash、长度、标题计数与尾换行共同证明展示层迁移没有改变输出。

## Builder Mapping / builder 映射原则

本版的抽象边界沿用 v2165：报告外壳进入 builder，领域翻译留在本地 helper。H1、meta bullet、H2 section、messages、list、entries 的基本排版属于外壳；它们重复出现在大量 renderer 中，继续手写只会增加空行和尾换行漂移风险。`renderVerificationReportMarkdown` 正好提供 `meta` 与 `sections`，每个 section 可选择 `entries`、`messages`、`list` 或 `lines`，因此能表达旧报告的完整结构。

post-echo decision gate 中，Source Node v309、Decision Gate、Necessity Proof、Checks、Summary、Evidence Endpoints 都是键值输出，迁移为 `entries`。Required Post-Echo Prerequisites 与 Explicit No-Go Conditions 是列表输出，迁移为 `list`，但列表项仍由 `formatPrerequisite` 和 `formatNoGoCondition` 生成。这两个 formatter 保留在本地，因为它们表达的是人类审批前置与 no-go 条件的领域语言，不应被隐藏到一个泛泛的 report builder 里。

governance-stop prerequisite closure decision 中，Source Node v311 仍由 `renderSourceNodeV311` 展开，Closure Decision 则提取为 `renderClosureDecision(profile)`。这个 helper 先渲染 closureDecision 的键值字段，再保留 Completed/Remaining 两个 H3 子块。这样做比把 H3 子块拆到顶层 sections 更稳，因为旧输出本来就是一个 H2 下的两个子块；如果强行改层级，hash 会变，读者也会误以为 completed/remaining 是两个与 Closure Decision 平级的概念。

## Upstream Evidence / 上游证据与只读边界

post-echo decision gate 消费的是 Node v309 human approval artifact review upstream echo verification。这个上游已经证明 Node v308 review packet 被 Java v143 与 mini-kv v136 read-only echoed，并且 side-effect boundaries 仍然关闭。v2166 没有重新请求 Java/mini-kv，也没有读取 live sibling workspace；测试中的 fallback 仍通过 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK` 使用已提交的 historical fixture。

governance-stop prerequisite closure decision 消费的是 Node v311 post-echo decision upstream echo verification。它的业务含义更靠后：Java v144 与 mini-kv v137 已经 echo Node v310 decision gate，但这只能关闭 `java-mini-kv-decision-echo`，不能替代 signed human approval artifact、credential-handle approval、endpoint-handle allowlist approval、no-network safety fixture 与 abort/rollback semantics。也就是说，v2166 继续把“已验证的历史证据”和“仍缺失的人工前置”分开展示。

这个只读边界对三项目协作很重要。Java 和 mini-kv 可以并行推进自己的计划书，因为 Node 在这里只整理历史证据的展示层；Node 不要求它们提交新版本，也不会因为本版迁移而改变跨项目 contract。等未来进入 real joint testing，才需要 fresh Java jar、fresh mini-kv CLI、端口/PID/cleanup owner、no-write gate 和统一 readiness 命令。本版不是那个阶段。

## Service Flow / 服务流程与等价路径

旧 renderer 的流程是手工构造字符串数组：先 H1，再 meta bullet，然后每个 H2 前后手动插入空字符串，最后 join 成 Markdown。这个模式的问题不是不可工作，而是复制太多。每个 renderer 都要自己记住 H2 后要空行、messages 为空时的文字、next actions 为空时的 fallback、最后是否要尾换行。N1 consolidation 的目标就是把这些重复外壳收敛到一个 builder，让每个业务 renderer 只描述“报告有哪些 section”。

迁移后的流程更清楚：renderer 把 title、meta 和 sections 传给 `renderVerificationReportMarkdown`；builder 统一生成 H1、meta bullet、H2 与尾换行；本地 helper 只负责把 profile 内的领域结构转成 `entries` 或 list item 字符串。调用方看到的函数名不变，返回值仍是 string，route 层不需要知道实现发生过迁移。

等价路径由两层测试覆盖。第一层是 focused profile/route tests，它们仍检查 ready/blocked 状态、historical fallback、upstream probes/actions enabled 时阻断、JSON route 和 Markdown route。第二层是新增的 normalized Markdown hash，它把展示层完整钉住。两层合起来，既证明业务状态没变，也证明 byte-identical 输出没变。

## Safety Boundary / 安全边界与失败模式

v2166 最容易被误读的地方是 “readyForParallelJavaV144MiniKvV137EchoRequest: true”。它只表示可以请求两个上游项目做 read-only echo，不表示 Node 可以启动 runtime shell，也不表示可以连接 managed audit。post-echo decision gate 中 `allowsDisabledRuntimeShellImplementation`、`allowsDisabledRuntimeShellInvocation`、`allowsCredentialValueRead`、`allowsManagedAuditConnection` 都保持 false；governance-stop closure decision 中 `chainContinuationAllowed` 也保持 false。

如果后续 hash 失败，第一步不是改 expected hash，而是重新生成旧输出和新输出做差异。长度不变但 hash 变，通常是 label、字段顺序或字面量发生变化；长度变化但 H2/H3 计数不变，通常是空行、list item 或 fallback empty text 变化；H2/H3 计数变化，则说明 section 层级被改动。只有当业务需求明确改变报告内容，并且 changelog、evidence、讲解和测试一起解释原因，hash 才能更新。

如果 historical fallback 失败，也不要先改 renderer。renderer 只是展示 loader 给出的对象；证据读取、fixture 路径、snippet 匹配和 fallback 环境变量属于 loader/resolver 层。尤其是 governance-stop closure decision，它依赖 Node v311 的 historical fixture，如果 fixture 不存在或路径映射错了，renderer hash 再稳定也无法让 profile ready。

## Test Coverage / 测试覆盖与机械门

本版 focused gate 跑的是 `npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision.test.ts test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate.test.ts test/rendererCensusScript.test.ts --maxWorkers=2`，结果 3 个 test file、10 个测试通过。反向 census gate 的 stderr `Renderer census regression: 51 exceeds --max-unstandardized=50` 是预期结果，说明 shrink-only 门已经收紧到新基线。

`npm run renderer:census -- --max-unstandardized=51` 通过，当前 census 是 245 total、194 standardized、51 unstandardized；剩余 shape signals 为 h3 2、forLoop 0、map 44、flatMap 41。`npm run typecheck` 通过，`npm run lint` 通过并保持 0 errors / 263 warnings 基线，`npm run build` 通过。lint 曾经短暂暴露 post-echo renderer 残留的两个 unused import，我在本版内清掉并复跑，说明这类小问题应在提交前消化，不进入归档。

文档质量也纳入本版收尾。代码讲解必须使用中文，并且不能靠重复段落或巨大 Detailed Walkthrough 堆字数。本文通过分节说明目标、入口、模型、builder 映射、上游证据、服务流程、安全边界、测试覆盖和后续维护，让 reviewer 能快速定位自己关心的层面。讲解不是附属品，而是后续批量迁移的操作手册。

## Maintenance Notes / 后续维护建议

后续维护这两份 renderer 时，优先保持 builder spec 的 section 顺序和旧输出一致。post-echo decision gate 的 formatter 不要随便抽到共享 util，除非有第二批同形 renderer 证明它可以复用；governance-stop closure decision 的 H3 子块也不要为了减少字符串而改成平级 H2。维护性不是把所有代码都变短，而是让重复边界和领域边界都清楚。

下一批迁移可以沿两条路线继续：一是清理剩余两个 H3 signal，也就是 `operationApprovalEvidenceRenderer.ts` 与 `opsPromotionReleaseAuditTrailMarkdownRenderer.ts`；二是转向 map/flatMap 主导的 Java/mini-kv runtime execution renderer，把 repeated list rendering 继续收进 builder。选择时仍要先量旧输出 hash，再看 focused tests 是否覆盖 Markdown route 和 fallback，不要只看文件名相似就合批。

对跨项目计划来说，本版的结论是 Java 和 mini-kv 仍可并行，不需要等待 Node v2166。Node 只是把审批决策文档外壳标准化，未新增上游证据需求，也未打开 live integration。真正的跨项目 capstone 仍在后面，需要单独的服务启动、fresh output、no-write 与 cleanup 规则。

## Batch Rationale / 合批理由

v2166 没有选择一个很小的 renderer 单独迁移，也没有一次性把所有剩余 human-approval 文件扫完。原因是这两份文件的工程形状刚好处在合适区间：它们同属 human approval artifact review 的决策段，都依赖历史 Node evidence，都不需要 fresh sibling output，都已经有 focused tests，而且每份报告都有明确的 decision vocabulary。合批后 reviewer 可以沿着同一条审批链理解：Node v310 先决定“继续阻断执行并请求 read-only echo”，Node v312 再决定“只关闭 echo 前置，继续暂停治理链”。这比把其中一份和 unrelated runtime execution renderer 放在一起更容易审。

同时，这一版也避免了过度合批。比如 signed human approval artifact contract intake 或 sandbox handle review packet gate 虽然名字也接近审批，但它们进入的是另一段合同/把手审查链，profile 字段、测试关注点和后续消费者都不同。把它们强行塞进 v2166 会让讲解失焦，也会扩大 hash 失败时的排查范围。好的切片不是文件越多越好，而是每个文件都服务同一个清晰工程动作，且验证证据可以被 reviewer 一次性复现。

## Reviewer Flow / 审查者应如何看本版

审查本版时，第一眼应该看 `rendererCensusScript.test.ts`：它把标准化数从 192 推到 194，未标准化数从 53 收到 51，说明本版确实完成了两个 renderer 的迁移，而不是只写文档。第二步看两份 renderer：顶层是否只剩 builder spec，本地 helper 是否只保留领域列表翻译，是否没有新增无意义的共享抽象。第三步看 focused tests：normalized hash 是否固定了 `generatedAt`，长度和 H2/H3 计数是否与 evidence 一致。

第四步再看安全语义。post-echo decision gate 仍允许的是 Java v144 + mini-kv v137 read-only echo request，不是 Node 自己执行；governance-stop closure decision 仍把 chainContinuationAllowed 固定为 false，不是把一项前置闭合误判成整个审批链完成。第五步看归档材料：evidence JSON 要能对应命令和 hash，中文解释要明确 Java/mini-kv recommended parallel 的原因，代码讲解要说明下一批迁移如何复用本版方法。这样审查顺序从机械数字、代码结构、测试证据到工程语义逐层展开，不会被长文件名带偏。

## Remaining Renderer Strategy / 剩余 renderer 策略

v2166 后还剩 51 个未标准化 renderer。剩余列表可以分三类处理。第一类是 H3 特征残留，目前只有 `operationApprovalEvidenceRenderer.ts` 和 `opsPromotionReleaseAuditTrailMarkdownRenderer.ts`，它们可能属于较老的 operations/promotion 报告体系，迁移时要先确认是否适合 `renderVerificationReportMarkdown`，还是应该沿用 release-report 专用 builder。第二类是 map/flatMap 密集的 runtime execution、minimal integration、sandbox handle review 系列，它们很可能需要先提取 list helper，再迁移顶层外壳。第三类是 profile section renderer，比如 controlled read-only shard preview 的 section renderer，它们不一定是完整 Markdown report，可能不能用 full-document builder，需要谨慎判断。

这三类不能用同一把尺子硬迁。full-document report 适合用 normalized hash 钉住完整输出；section renderer 可能更适合钉住片段输出、调用者组合输出或 route-level output；release/promotion 体系可能已有专用 builder，盲目改成 verification builder 反而破坏局部风格。后续每版都应先把候选文件按“完整报告、片段 renderer、专用 release renderer”分类，再决定迁移策略。这样 N1 不只是数字下降，也是在建立一个可维护的 renderer 类型地图。

## Engineering Value / 本版的工程价值

v2166 的直接收益是减少两个手写 full-document renderer，并把 census 推到 194/245。更大的收益是把 human-approval 决策链从 packet、upstream verification 到 decision gate、closure decision 的展示外壳连续收敛。链条越连续，后续查问题时越容易判断某个 Markdown 差异是来自业务状态变化，还是来自展示层漂移。现在四个相邻节点都可以使用同一套 builder 和 hash 方法，reviewer 对这一段的信任会更高。

对生产前治理项目来说，这类维护性版本看起来不像新功能，但它在降低未来真实执行版本的噪声。等系统进入 fresh Java jar、fresh mini-kv CLI 和 Node cross readiness 的 live capstone 时，reviewer 不应该再被几百个 renderer 的空行、section 顺序和手写 messages 牵扯注意力。v2166 提前把审批决策文档的外壳稳定下来，就是在为以后更高风险的执行链留出审查空间。

## Failure Recovery / 失败恢复建议

如果未来有人在这两份 renderer 上遇到失败，建议按“输出、结构、证据、语义”的顺序恢复。输出层先比 hash 和长度，确定是不是 byte drift；结构层看 H2/H3 计数，确定是不是 section 层级变化；证据层看 historical fallback 和 source Node reference，确定是不是上游 fixture 或 loader 出错；语义层才判断业务字段是否应当改变。这个顺序能避免把 loader 问题误修到 renderer，也能避免把真实业务演进误当成空行差异。

如果确实需要改变 report 内容，提交时必须同时更新 focused hash、evidence JSON、中文解释和代码讲解，并说明为什么旧报告不能复用。比如未来真的出现 signed human approval artifact，closure decision 的 remainingPrerequisites 可能变化，那属于业务状态演进；但仅仅把 `Decision Gate` section 改名或调整 nextActions 空文本，就属于展示层漂移，默认不应改变 hash。把两者区分清楚，是 N1 renderer consolidation 能持续推进而不损坏治理语义的关键。

## CI Repair / CI 修复说明

v2166 收尾时检查到 v2165 的远端 CI 失败。失败点不是 renderer 输出在业务上改变，而是 v2165 为 post-echo upstream verification 新增的完整 Markdown hash 把 historical fixture 的 `resolvedPath` 绝对根路径也纳入了长度和 SHA-256。本机是 Windows 路径，GitHub runner 是 Linux workspace 路径，两者都会指向同一批 committed fixture，但字符串长度不同，导致 full coverage 在 runner 上收到 23787 而不是本机的 23227。

修复方式是在测试 hash 前调用 `normalizeFixtureRootPaths`，把任意绝对 fixture 根路径统一成 `<repo>/fixtures/`。这个修复没有降低断言强度：H2/H3 计数、尾换行、证据文件相对路径、文件 digest、snippet matched 状态和所有业务字段仍在 hash 覆盖范围内；被排除的只有环境相关的 repo 绝对前缀。这个经验应当用于后续所有包含 `resolvedPath` 的 Markdown hash，尤其是 Java/mini-kv historical evidence renderer。

## One-sentence Summary / 一句话总结

v2166 将 human approval post-echo decision gate 与 governance-stop prerequisite closure decision 两个决策 renderer 迁移到 `renderVerificationReportMarkdown`，用 normalized hash、结构计数、focused route/fallback tests、census ratchet、typecheck、lint 和 build 证明输出等价、只读边界不变、Java/mini-kv 可继续并行。
