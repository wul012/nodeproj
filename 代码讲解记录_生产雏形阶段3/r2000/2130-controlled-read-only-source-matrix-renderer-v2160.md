# v2160 代码讲解：把 source matrix 复杂 section 收进统一 profile renderer

## Goal and Non-goal / 目标与非目标

v2160 继续执行 N1 renderer consolidation，但比 v2158、v2159 更厚一点：这次迁移的是 controlled read-only shard preview 的 source matrix renderer。这个文件不是简单的静态章节清单，它同时展示 source matrix 汇总、consumer gate、drift finding、consumption plan、review checklist、digest、archive snapshot 和 summary export。旧代码把 8 个二级 section、8 个运行时三级标题、若干 `map` / `flatMap` 展开和大量字段行混在一个数组里，功能上能工作，但审查成本高。只要新增或删除一行，reviewer 就要在排版字符串和真正业务字段之间反复切换注意力。

本版的目标是把重复的 Markdown section 外壳迁移到 `renderProfileEntrySections`，让源文件表达为清晰的 `{ heading, lines }` 数据表。迁移后，标题如何加 `##`、section 末尾如何补空行这些机械规则由共享 helper 管；source matrix 自己只保留字段选择、列表展开和小标题位置。非目标也很重要：本版不改 source matrix 生成逻辑，不改 drift 判断，不改 consumption plan 的安全结论，不改 route，不改 schema，不读新的 Java / mini-kv evidence，也不打开真实执行。它是一版结构治理，不是业务含义变更。

选择这个文件有实际价值。前三个剩余文件是 composition-only，继续迁移它们很容易变成凑数字；而 source matrix renderer 真正持有多组报告结构。它既有固定二级 section，也有动态来源小标题，还有 plan step records 和 checklist items 这类列表行。迁移它能证明统一 section helper 不只适合短小平整的 report，也适合带内部小标题和列表展开的 route-facing 文本。这个证明对后续 60 个剩余 renderer 的筛选有指导意义。

从工程节奏上看，v2160 也避免了另一个常见问题：连续做太小切片会让每版讲解只能重复“hash 不变、census 减一”。source matrix 的字段足够多，才值得写一篇完整说明，解释输入对象、章节层级、列表展开、上游证据边界和测试门之间的关系。这样的版本虽然只让 standardized count 增加一，但它实际降低的是一个长 report 片段的维护摩擦，而不是只给进度表添一个数字。

## Entry Points / 入口与路由关系

本版直接入口是 `renderControlledReadOnlyShardPreviewSourceMatrixSections(profile)`。上层 `renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown(profile)` 会在 Java Preview、mini-kv Preview、Combined Preview 之后调用它，然后继续拼接 handoff summary、route coverage、live-window、checks、summary、blockers、warnings、recommendations、evidence endpoints 和 next actions。因此 source matrix section 位于整份 controlled read-only shard preview Markdown 的前半部分，承担“说明这些读到的源证据能否被安全消费”的作用。

旧入口返回一个长数组，数组里直接写 `"## Source Matrix"`、字段行、动态 `### ${source.source}`、consumer gates、comparison、drift findings、plan steps、checklist items 等内容。新入口仍然返回 `string[]`，但先把每段组织成 section 对象。`heading` 是二级标题文本，`lines` 是这一段内部所有输出行，包括空行、三级标题和列表展开。这样一来，调用关系没有变化，HTTP route 看到的还是同一份 Markdown；变化只发生在源码可读性上，读者可以按 section 对象分块理解。

这个入口还验证了一个细节：`renderProfileEntrySections` 只负责二级 section 外壳，不会吞掉 lines 内部的 `###` 小标题。source matrix 的第一个三级标题来自 `profile.preview.sourceMatrix.sources.flatMap(...)`，标题文本取决于 fixture 里的 source 名；其余三级标题来自 consumer gates、consumer comparison、drift findings、consumption plan steps、consumption plan step records 和 checklist items。运行时统计为 8 个 `###`，测试也把这个数量固定下来，防止迁移时少掉内部层级。

这里的“入口”还包含一个隐含契约：source matrix section 必须出现在 handoff summary、route coverage 和 live-window 之前。它先说明证据源是否齐、消费计划是否安全、复核清单是否可归档，后续章节才基于这些结论继续描述 handoff 和窗口材料。本版没有移动上层调用顺序，所以报告阅读路径保持原样。若未来要重排这些大章节，那是信息架构变更，不应和 renderer consolidation 混在同一个版本里。

## Response/Data Model / 响应与数据模型

输入模型仍是 `ControlledReadOnlyShardPreviewProfile`。renderer 读取的对象包括 `sourceMatrix`、`sourceMatrixConsumer`、`sourceMatrixDriftSummary`、`sourceMatrixConsumptionPlan`、`sourceMatrixReviewChecklist`、`sourceMatrixReviewDigest`、`sourceMatrixArchiveSnapshot` 和 `sourceMatrixArchiveSnapshotSummaryExport`。这些对象已经由上游 profile 构造完成，renderer 不重新判断状态，不重新计算 digest，也不根据风险级别隐藏或改写字段。它只是把这些对象投影成 Markdown 行。

输出模型仍是 `string[]`，字节等价是本版的核心约束。迁移前先用固定 fixture 取 hash：source matrix section 的 `sections.join("\n")` 为 `738c074eaec922f9cf6a194ca77bd4c7b4255c142650a6e23262b3c6921d4ec6`，长度为 8831；完整 route markdown 为 `a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d`，长度为 81829。迁移后这四个值完全不变，说明标题、空行、字段顺序、列表展开和上层拼接都没有发生用户可见差异。

数据表形式还有一个维护优点：字段的业务归属更清楚。比如 consumption plan 这一段包含 plan digest、step status summary、step safety summary、risk summary、promotion hold、read-only review scope 和若干安全开关。旧数组中这些行连续堆在一起，很容易读疲劳；新结构至少把它们固定在 `Source Matrix Consumption Plan` 的 lines 内，reviewer 可以先确认 section 边界，再细看字段组是否应该进一步拆分。当前没有额外拆 helper，是因为字段仍然属于同一个计划段落，过早拆出私有 builder 反而会让跳转变多。

另一个需要保留的模型细节是 `formatValue`。source matrix 中的 shard count delta 和 slot count delta 可能是数字、空值或其他稳定展示值，旧代码用 `formatValue` 处理，本版继续保留。没有把它替换成 `renderEntries` 的原因是输出必须和旧字符串逐字一致。这个小点说明迁移不是“把所有字段都机械塞进 renderEntries”，而是逐行保留旧输出语义，只把 section 包装提到共享层。

## Upstream Evidence / 上游证据与配置边界

本版测试仍使用 `loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview` 加 `controlledReadOnlyShardPreviewServiceFixtures` 构造 profile。Java 和 mini-kv 在这里只是 fixture 化的输入形状，不启动真实服务，不访问 sibling workspace，也不要求另外两个项目产出新版本证据。source matrix 文本会展示 Java、mini-kv、routing、shard、slot、archive、digest 等信息，但这些是已存在 profile 的只读呈现，不是新消费链。

这条边界对三项目并行很关键。Node v2160 不修改 shared contract，不改变 evidence schema，不改变 route 的 JSON 字段，也不要求 Java / mini-kv 先完成某个 milestone。它只让 Node 本地的 Markdown renderer 更可维护。因此 Java 和 mini-kv 可以继续按照各自 final-push brief 推进，Node 不成为它们的前置审批点。真正需要三项目同步的是后续 integration capstone：那时才会启动真实 Java jar、执行真实 `minikv_cli`、验证 no-write boundary，并由一个 readiness 命令汇总结果。

如果未来 source matrix 的上游字段变化，维护者需要把变更归类。若只是 renderer 迁移，hash 不应该变化；若是 profile 业务字段新增、删除或重新排序，hash 变化可以成立，但必须在那个业务版本里解释字段来源、审核意义和兼容影响。不能把 v2160 的 hash 测试当成“永远禁止 source matrix 输出演进”，也不能在 renderer 批次里无说明地改 expected hash。这个区分是计划书里“证据先于结论”的具体执行方式。

排查上游差异时，优先看 profile 构造测试而不是 renderer。source matrix digest、archive snapshot digest、summary digest 这些值都来自上游对象；renderer 只展示它们。如果未来完整 route hash 变了，而 source matrix 局部 hash 不变，问题大概率在其他 section；如果 source matrix 局部 hash 变了，再看是 fixture 数据变了、字段顺序变了，还是本文件的 lines 被改动。把排查路径写清楚，可以避免后续为了“快速修绿”误改测试期望。

## Service Flow / 服务流程与等价路径

运行路径可以分成四层。第一层，controlled read-only shard preview service 构造 profile，汇总 Java / mini-kv 的只读状态、combined preview、source matrix、handoff、route coverage 和 live-window 等对象。第二层，source matrix renderer 把 profile 中的前半段治理对象组织成 8 个 section 描述。第三层，`renderProfileEntrySections` 统一生成二级标题和尾部空行，并原样展开 lines。第四层，上层 full renderer 把 source matrix 与后续 handoff、checks、summary 等段落拼接成完整 Markdown。

这次迁移最容易出错的地方是空行和内部小标题。旧实现里每个动态 source 前有一个空行，consumer gates 和 consumer comparison 之间也有空行，consumption plan 的 steps 与 step records 之间同样有空行。新实现把这些空行保留在 lines 里，只把 section 末尾空行交给 helper。这样能保持 byte-identical：helper 不需要知道内部小标题的语义，也不会替调用方猜测哪里应该分段。

另一个等价点是列表展开没有换工具。`sourceMatrix.sources` 仍用 `flatMap`，drift findings、plan steps、plan step records、checklist items 仍用原来的 `map` 表达式。换句话说，v2160 没有把领域列表抽象成新格式，也没有更改每个列表项的文本模板。这个选择有点保守，但适合当前阶段：先把外壳统一，等剩余 renderer 收敛到更少数量后，再判断是否值得提取跨文件的 list row builder。

如果用一个更通俗的例子看，旧代码像把一本报告的目录、正文、小标题和页边距全写进同一串文本；新代码先把章节目录列出来，再把每章的正文放进对应格子。书的内容没有改，读者翻到的页也没有改，但编辑以后能更快判断某一段是不是放错章。source matrix 这类治理报告尤其需要这种透明度，因为它既给机器测试读，也给人工 reviewer 读。

## Safety Boundary / 安全边界与只读性质

v2160 只触及一个 renderer、一个 focused test、census baseline 和版本材料。它没有改 access guard、approval header、credential resolver、runtime shell、live-read switch、service startup 或任何外部连接配置。测试通过 `app.inject` 和 fake clients 完成，不打开生产端口，不留下后台进程，也不读写 Java / mini-kv 的真实状态。`npm run build` 生成的 `dist/` 是验证产物，收版前按仓库规则删除。

安全边界还体现在共享 helper 的克制上。`renderProfileEntrySections` 仍只做二级标题包装和尾部空行，不理解 digest，不筛掉 blocked item，不根据 `requiresRoutingActivation` 或 `startsServices` 这类字段改变输出。source matrix 的安全含义继续来自 profile 本身，而不是 renderer 的二次判断。这样能避免展示层变成第二套治理规则，也让 reviewer 可以把注意力放在“输出是否等价”和“结构是否更清晰”两件事上。

本版没有新增截图或浏览器检查，因为没有新增可视化页面，也没有启动 HTTP smoke server。对一个纯 Markdown renderer 迁移来说，最高价值证据是固定 fixture 下的局部 hash、完整 route hash、focused route test 和 census ratchet。若为了形式去截本地文件或开浏览器，反而会制造无关产物和清理负担。计划书要求的是可复现证据，不是每版都堆同一种仪式。

需要特别注意的是，本版虽然展示很多安全相关字段，例如是否需要 routing activation、是否启动服务、是否修改 sibling state，但 renderer 本身不做安全决策。它把这些字段输出给审计报告，真正的安全判断来自 profile 构造、访问守卫和上游门控。把展示层保持为只读投影，是避免治理代码膨胀的重要原则。

## Test Coverage / 测试覆盖与机械门

新增测试 `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixRenderer.test.ts` 先构造固定 profile，再分别计算 source matrix section 和完整 route markdown。它断言二级 section 数量为 8、三级 heading 数量为 8、首行是 `## Source Matrix`，并检查 consumer gates、consumer comparison、consumption plan step records、archive snapshot summary export 等关键段落仍存在。最后用 SHA-256 固定局部与完整输出。

focused gate 使用 `npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixRenderer.test.ts test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test/rendererCensusScript.test.ts --maxWorkers=2`，3 个 test file、4 个测试通过。测试输出中的 `Renderer census regression: 60 exceeds --max-unstandardized=59` 是预期 stderr，因为反向门故意用更严格的上限证明 ratchet 会失败。

随后运行 `npm run renderer:census -- --json`，得到 245 total、185 standardized、60 unstandardized、remaining shape signals 为 h3 31、forLoop 0、map 71、flatMap 45。再运行 `npm run renderer:census -- --max-unstandardized=60`，证明当前树满足新门槛。`npm run typecheck`、`npm run lint`、`npm run build` 均通过；lint 仍是既有 0 error / 263 warning。由于本版不改运行时服务，不额外启动 smoke server。

这些测试覆盖了不同风险层次。hash 测试负责字节等价，route test 负责确认上层 HTTP Markdown 仍然能拼出整份报告，census 负责防止标准化进度回退，typecheck 负责导入和类型边界，lint 负责基础代码风格，build 负责生产编译。它们不是互相替代的关系：只跑 build 不能证明 Markdown 没变，只跑 hash 也不能证明 TypeScript 项目仍能生产编译。把这些门组合起来，才符合计划书的“机械检查会失败”要求。

## Maintenance Notes / 后续维护提示

v2160 后，controlled read-only shard preview 这条大报告链已经连续迁移 live-window、route coverage 和 source matrix 三个重要片段。剩余同领域候选里，handoff summary、execution readiness、live read-only window rehearsal 仍值得继续观察；它们如果也包含真实 section 外壳和列表展开，就适合沿用本版方法。composition-only 文件则不要急着碰，除非后续建立 waiver 清单或合并策略。

后续 reviewer 复核这类迁移时，可以采用固定流程：先看 diff 是否只把手写数组改成 section 数据表；再看局部 hash 和完整 route hash 是否不变；接着看 census 是否只收紧没有放松；最后看讲解是否能说明维护价值。如果某个版本无法自然解释这些点，通常说明切片太薄，或者它其实不是 renderer consolidation 的合适对象。这个判断比单纯追求未标准化数量下降更接近生产级治理。

这版还提醒后续不要过早抽象列表项。source matrix 里有多类列表：source entries、drift findings、plan steps、plan step records、checklist items。它们看起来都能抽成 helper，但文本模板和业务语义并不一致。当前只统一 section 外壳，保留列表模板在原文件内，是更稳的选择。等多个文件出现完全相同的列表形状，再提取共享 list renderer 才更有必要。

v2161 的候选应继续遵循这个判断：优先选有真实 section 重复和可固定 hash 的 renderer，避免拿 composition-only 文件充数。若候选文件包含复杂 map/flatMap，但局部输出难以稳定 hash，就先找固定 profile builder 或补 fixture，而不是降低测试质量。N1 后半段的成熟度来自一版一版把“输出等价、结构更清楚、门更紧”做实，而不是一次性大改所有剩余文件。

## One-sentence Summary / 一句话总结

v2160 把带动态三级标题和多类列表展开的 source matrix renderer 收进统一 profile-section 外壳，并用局部/完整双 hash、census ratchet、typecheck、lint 和 build 证明这次结构治理没有改变任何 route-facing Markdown 或跨项目契约。
