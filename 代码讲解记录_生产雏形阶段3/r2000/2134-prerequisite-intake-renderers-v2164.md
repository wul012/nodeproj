# v2164 代码讲解：成组迁移 approval prerequisite 与 abort rollback intake renderer

## Goal and Non-goal / 目标与非目标

v2164 继续推进 N1 renderer consolidation，这次不再只迁移单个文件，而是选择两个结构相近、风险边界一致的完整 Markdown renderer 合并成一版：`managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanRenderer.ts` 和 `managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeRenderer.ts`。两者都属于 prerequisite-intake 类治理文档，都是 H1、meta、多个 H2 section、内部 5 个 H3 子列表的完整报告形状，因此适合统一迁移到 `renderVerificationReportMarkdown`。

本版非目标非常明确：不改 approval prerequisite artifact intake plan 的字段、不改 abort/rollback semantics contract 的字段、不改 upstream echo 请求、不改 historical fallback、不改 route 注册、不改生产授权状态，也不启动 Java 或 mini-kv。renderer consolidation 只处理展示外壳，不能借机推进 runtime shell、网络请求、rollback 执行或 sibling 写入。两个文档仍然是 read-only governance evidence，而不是执行命令。

选择两个文件合并有工程理由。它们来自同一条 credential resolver prerequisite 链：approval artifact intake 先定义运行时 shell 之前必须具备的非秘密审批工件，abort/rollback contract 则定义最后一个 prerequisite 的 contract intake。二者输出形状高度一致，验证方式也一致；合并成一版能减少过薄版本，同时仍保持可 review 的清晰边界。

## Entry Points / 入口与调用关系

第一个入口是 `renderManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanMarkdown(profile)`。它由 `loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan` 生成 profile 后调用，并通过 audit route 暴露 Markdown。测试覆盖 profile 构造、historical fallback、blocked config、JSON route 和 Markdown route。

第二个入口是 `renderManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeMarkdown(profile)`。它由 `loadManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake` 调用，消费 Node v325 no-network safety fixture prerequisite closure review，并同样通过 audit route 暴露 Markdown。测试覆盖 ready 状态、fallback、blocked upstream probes/actions、route 输出。

两个入口的公开函数签名没有变化，调用方不需要改。变化发生在函数内部：旧代码手写数组，逐行拼 H1、meta、section 和尾部空行；新代码把 title、meta、sections 写成 report spec。领域专用内容仍留在本文件的 helper 中，例如 `renderArtifactIntakePlan` 和 `renderContract`，因为 required fields、prohibited fields、rejection reasons、no-go boundaries、upstream echo requests 这些 H3 子列表是业务语义，不应被通用 builder 抹平。

## Response/Data Model / 响应与数据模型

approval intake profile 的 meta 包含 service、generatedAt、profileVersion、planState、runtime shell chain decision、ready flag、Java/mini-kv parallel echo readiness、runtime shell implemented、runtime shell invocation allowed、execution allowed、connects managed audit。section 包含 Source Node v305、Artifact Intake Plan、Necessity Proof、Checks、Summary、Production Blockers、Warnings、Recommendations、Evidence Endpoints、Next Actions。

abort/rollback intake profile 的 meta 更长，除了 service、generatedAt、profileVersion、contractState 和 governance decision，还包含 active Node contract version、target prerequisite id、Java v150 + mini-kv v142 echo readiness、Node v327 readiness、final closure readiness，以及一组 side-effect boundary flags。section 比 approval intake 多一个 Prerequisite Transition，并将核心 contract 展开成 Required Fields、Prohibited Fields、Rejection Reasons、No-Go Boundaries、Upstream Echo Requests。

两个 profile 都带动态 `generatedAt`。如果直接对运行时输出做 hash，前后测试会因为时间戳变化而不稳定，所以 v2164 的 hash 门采用规范化 profile：保留所有业务字段和 digest，只把 `generatedAt` 固定为 `2026-07-07T00:00:00.000Z`。这样 hash 只证明 renderer 等价，不把时钟波动混进 renderer 迁移。

## Normalized Hash Strategy / 规范化 Hash 策略

本版的 hash 策略比 v2162、v2163 多一步，因为这两个 profile 的 `generatedAt` 不是 fixture 常量，而是加载时生成的当前时间。若每次测试都对原始 Markdown 做整文 SHA-256，测试会在没有代码变化的情况下失败；若因此取消 hash，只保留 `contains`，又会放过 meta 顺序、section 空行或 H3 子列表漂移。v2164 选择中间路线：在测试中创建 shallow copy，只覆盖 `generatedAt`，再调用 renderer。

这个做法保留了 hash 门的强度。除了时间戳之外，所有 digest、count、ready flag、upstream echo request、blocked/warning/recommendation、evidence endpoint 都来自真实 profile。也就是说，如果 renderer 改了任何标题、label、列表顺序或 helper 输出，hash 仍会失败；如果只是运行时间不同，hash 不会误报。它把“不稳定字段”和“渲染契约”分开了。

本版还用 inline parity check 在迁移过程中比较旧手写逻辑和新 builder 输出。这个检查不进入仓库文件，但它在开发过程中证明：对固定 generatedAt 的同一个 profile，旧函数与新函数输出完全相等。随后测试把新输出的规范化 hash 固定下来，保证未来不会退化。这样的流程比单纯“迁移后跑 contains”更严格，也比把旧长数组留在测试里更可维护。

## Batch Selection / 成组迁移判断

v2164 不是随意把两个文件放在一起。第一个判断是输出形状一致：两者都是完整 Markdown report，不是 route section，也不是 composition-only wrapper。第二个判断是风险来源一致：两者都消费历史 fixture fallback，都有 route tests，都不启动 sibling service，都表达 runtime shell 之前的 prerequisite contract。第三个判断是迁移手法一致：top-level 外壳交给 report builder，领域 H3 子列表留在本地 helper。

如果只迁移 approval intake，版本会偏薄，因为它的结构和此前多个 report renderer 类似；如果把整条 credential resolver approval 系列都塞进同版，又会过宽，动态字段、route 形状和安全边界会互相遮蔽。approval intake 与 abort/rollback intake 正好处在中间：足够相似，可以共享 reviewer 心智；又足够独立，各自有 hash 和 focused test，不会彼此掩盖。

这个筛选标准可以复用到后续 N1。未来若看到多个 renderer 都是同一类 full-document intake，并且具有相同 section 结构、相同验证方式、相同安全边界，就可以考虑成组迁移。反过来，若一个文件是 profile section，另一个是完整 report，或者一个文件有 dynamic generatedAt、另一个有 live evidence read，就不要为了凑批次合并。

## Upstream Evidence / 上游证据与配置边界

approval intake 的上游来自 Node v305 source chain 和历史 fixture fallback，它说明 Java v142 与 mini-kv v135 后续可以并行 echo，但本版没有读取新的 sibling repo 文件，也没有要求它们现在提供新证据。abort/rollback intake 的上游来自 Node v325 closure review 和 Node v313 prerequisite catalog，它请求 Java v150 与 mini-kv v142 echo，但同样只是计划与 contract intake 文档。

两个 renderer 都保留 forced historical fallback 测试路径。测试通过 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK` 证明 GitHub runner 环境不需要 sibling workspace 的实时文件。v2164 没有改 fallback resolver，也没有改 fixture 内容；它只改变 Markdown 外壳，因此不会影响 Java/mini-kv 的真实工作流。

这也解释了 parallel planning：Java 与 mini-kv 可继续并行。Node v2164 没有产生新 shared schema，没有改变 approval artifact 或 abort contract 的字段，没有改变 route path，也没有要求上游 fresh evidence。若后续要把这些 contract 变成真实执行前置条件，必须在单独版本里写清所需 upstream 版本、证据路径和机械检查。

## Service Flow / 服务流程与等价路径

旧流程在两个 renderer 中几乎一样：先输出 H1 和空行，再输出 meta bullet，然后每个 H2 section 都手写 `\"## Heading\"`、空行、section body、空行。新流程用 `renderVerificationReportMarkdown` 表达同样结构。builder 默认会在 H2 后加空行，并在文档结尾加尾换行，正好匹配这两个旧 renderer 的输出习惯。

approval renderer 的 Source Node v305、Necessity Proof、Checks、Summary、Evidence Endpoints 走 `entries` 分支；Production Blockers、Warnings、Recommendations 走 `messages` 分支；Next Actions 走 `list` 分支；Artifact Intake Plan 使用 `lines: renderArtifactIntakePlan(...)`，保留内部 5 个 H3 子列表。abort renderer 的 Source Node v325 和 Abort/Rollback Semantics Contract 使用 `lines`，其他结构对应 entries/messages/list。

本版没有使用 `bodyLeadingBlankLine: false`，也没有使用 trimming helper，因为旧文档每个 H2 后都有空行，最后也保留 trailing newline。和 v2163 的 rehearsal packet 不同，这两个文件是 report builder 默认行为的理想匹配。这个差异说明迁移策略不是固定配方，而是先读旧输出，再选择 builder 参数。

## Safety Boundary / 安全边界与只读性质

两个 intake 文档都处在 runtime shell 之前的治理层。approval intake 明确 `runtimeShellImplemented`、`runtimeShellInvocationAllowed`、`executionAllowed` 和 `connectsManagedAudit` 都保持关闭；abort/rollback intake 额外声明 abort/rollback semantics 未执行、rollback execution 不允许、deployment action 不允许、Java SQL execution 不允许、mini-kv write command 不允许、HTTP/TCP 均未打开。v2164 没有改这些字段，也没有改它们的来源。

测试仍是本地 in-process profile 构造、route injection 和 Markdown 渲染。route injection 使用 Fastify app，但不会启动外部长跑服务，也不会发真实 HTTP/TCP 到 sibling 项目。所有 upstream probes 和 upstream actions 都在测试配置中保持 disabled，blocked-path 测试也证明一旦打开这些开关，profile 会进入 blocked 状态。

这种边界在后期工程里很重要。随着项目接近真实分片联合执行，越不能把“报告渲染迁移”和“执行授权推进”混在一起。v2164 的价值是让治理报告更可维护，不是让生产执行更开放。真实执行仍要等 integration capstone 和明确的 no-write gate。

## Historical Fallback / 历史证据读取边界

这两个 focused tests 都保留了 historical fallback 路径。approval intake 通过 Node v305 source chain，abort/rollback intake 通过 Node v325 closure review；它们都依赖历史 sibling workspace fixture 在 CI 中可用。v2164 没有移动这些 fixture，也没有改 resolver，只是保证 renderer 迁移不会破坏 fallback 生成出的 Markdown。

这里容易犯的错误是把 sibling evidence 的存在当成真实执行。历史 fixture 只说明过去某个版本的 Java/mini-kv 证据已经冻结并可读，不说明本次测试启动了 Java 或 mini-kv。本版测试没有服务进程、端口、PID、cleanup owner，也没有 fresh output。证据 JSON 因此明确写 `runtimeBehaviorChanged: false`、`routesChanged: false`、`schemasChanged: false`，并标记 Java/mini-kv 为 recommended parallel。

这个边界对后续 review 很有用。若 CI 失败在 fallback 路径，应该检查 fixture resolver 和历史文件；若 hash 失败，应该检查 renderer 输出；若 route 失败，应该检查 route registration 和 access headers。把这些失败域分开，排查才不会把展示层重构误判为跨项目契约问题。

## Test Coverage / 测试覆盖与机械门

v2164 在两个 focused tests 中加入规范化 Markdown hash。approval intake 固定 generatedAt 后必须满足 SHA-256 `bfcbb70ddad243f441511a6ba6c07fd8766c12fd797b8afa18b50a61c9856c51`、长度 12746、10 个 H2、5 个 H3、带尾换行。abort/rollback intake 固定 generatedAt 后必须满足 SHA-256 `e0e36ab78e4ca9c6ecd526268390353cb0b78a935c9d88e05f977ea1bcf57e6d`、长度 13704、11 个 H2、5 个 H3、带尾换行。

focused gate 使用 `npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake.test.ts test/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan.test.ts test/rendererCensusScript.test.ts --maxWorkers=2`，3 个 test file、10 个测试通过。输出中的 `Renderer census regression: 55 exceeds --max-unstandardized=54` 是预期 stderr，证明 shrink-only ratchet 已从 57 收紧到 55。

`npm run renderer:census -- --max-unstandardized=55` 通过，当前 census 为 245 total、190 standardized、55 unstandardized，remaining shape signals 为 h3 14、forLoop 0、map 57、flatMap 41。`npm run typecheck`、`npm run lint`、`npm run build` 均通过。lint 一开始因为旧 helper import 变成 unused 而涨到 265 warning，本版已删掉两个无用 import，恢复到既有 0 error / 263 warning 基线。

## Failure Modes / 失败模式与排查顺序

如果未来 hash 失败，第一步先看测试是否仍固定 `generatedAt`。这两个 profile 的运行时 hash 天然不稳定，直接对真实时间戳输出做整文 hash 会制造误报。如果 generatedAt 已固定但 hash 失败，再看长度、H2/H3 数和 trailing newline。长度不变但 hash 变了，常见原因是 meta label 或 section body 文本变化；长度变化则多半是空行、尾换行或列表内容漂移。

如果 lint warning 数增加，要优先检查 renderer import。迁移到 builder 后，旧文件里原本用于 messages/list/entries 的 helper 可能部分不再直接使用。v2164 已经出现过这个情况：`renderMessages` 由 builder 内部调用，renderer 文件自己不再需要 import。保持 263 warning 基线是版本质量的一部分，不能把“只是 warning”静默带进提交。

如果 census 失败，要区分回退和前进。未标准化数超过 55 是回退，说明某个文件又丢失了标准化 marker；低于 55 是新迁移没有同步更新 baseline。无论哪种，不能只改数字，必须带上相应 renderer hash 或结构门。

## Version Slicing / 版本切片理由

v2164 成组迁移两个 renderer，是为了提高版本含金量，但仍控制在可 review 范围内。它没有把所有 prerequisite/approval 系列 renderer 一次性扫完，因为不同文件可能有不同的 section 形状、动态字段和 route 覆盖。两个文件的相似度足够高：都是完整文档、都带 5 个 H3 子列表、都已经有 focused route tests、都属于 non-executing prerequisite intake。

这个切片也修正了前面单文件版本可能偏薄的问题。v2164 一次减少两个未标准化文件，H3 shape signal 从 24 降到 14，map signal 从 67 降到 57，说明它不是只移动计数，而是消化了一批重复 H3 子列表渲染。与此同时，它仍保留了每个文档独立 hash，避免成组迁移失去可追责性。

后续可以继续寻找这种“同族同形”的批次，例如几个 Java/mini-kv runtime execution intake renderer 可能可以成组处理。但前提仍是先测旧输出、确认动态字段、补 hash 门，再更新 census。不能为了追求更大版本把不相干的 route section、full document、composition-only 文件混到一起。

## Maintenance Notes / 后续维护提示

维护这两个 renderer 时，要把 builder spec 当作报告目录，把 `renderArtifactIntakePlan` 和 `renderContract` 当作领域章节模板。新增 top-level meta 时改 spec；新增 required/prohibited/rejection/no-go/upstream echo 子项时改对应 helper；新增新的 H2 section 时同时补结构断言。这样维护者能从 diff 直接看出变更层级。

如果将来 approval artifact 或 abort/rollback contract 真的进入下一阶段执行准备，不应该在 renderer 里加执行逻辑，也不应该让 renderer 读取 sibling 文件。正确做法是新建或更新 artifact builder，让它产出新的 profile 字段和机械检查，再由 renderer 展示。展示层继续保持纯函数，才能让 hash 门有意义。

这版也把动态时间戳测试规范写清了：当 profile 有 `generatedAt`，renderer hash 测试要先规范化；当 profile 输出完全静态，才直接 hash。这个规则能避免将来有人因为 hash 不稳定而删除 hash 门，也能避免把动态字段误认为 renderer 漂移。

后续若继续成组迁移，要把 v2164 当作最低标准，而不是上限。每个成组文件都要有独立 hash、独立结构计数和独立说明；census 只能说明数量前进，不能代替输出等价证明。若某个文件没有 focused route test，应先补可复现测试，再迁移 renderer。若某个文件只是组合其它 renderer 的薄 wrapper，应考虑 waiver 或合并策略，而不是强行套 report builder。

维护者还要留意 lint 基线。v2164 迁移后第一次 lint 暴露两个无用 `renderMessages` import，把 warning 从 263 推到 265。虽然不是 error，但这类基线漂移会让后续真正 warning 更难识别，所以必须在版本内修掉。后期治理代码越多，越要珍惜这种小而明确的反馈信号。

规范化 hash 如果失败，也不要先改期望值；应先确认 fixed generatedAt、字段来源和旧输出是否真的发生业务变化。

## One-sentence Summary / 一句话总结

v2164 将 approval prerequisite artifact intake plan 与 abort/rollback semantics contract intake 两个完整 Markdown renderer 成组迁移到 `renderVerificationReportMarkdown`，并用规范化 hash、结构断言、route focused tests、census ratchet、typecheck、lint 和 build 证明迁移只统一报告外壳，没有改变 prerequisite 语义、执行边界或跨项目契约。
