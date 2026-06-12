# v2122 renderer consolidation batch 5

## Goal and Non-goal / 目标与非目标

v2122 的目标是把 Java / mini-kv operator lifecycle 与 runtime gate 相关的 7 个 archive verification renderer 迁移到共享的 `renderVerificationReportMarkdown`。这批文件的共同点是没有本地 helper 函数，报告结构由 meta、entries、messages、list 和少量 raw lines 表达即可。它们覆盖 declared operator lifecycle evidence intake、runtime execution artifact intake preflight、runtime execution packet stop record、runtime live-read gate plan、live-read gate plan intake、operator service lifecycle evidence intake、runtime execution packet approval gate review。它们都处在“只读归档验证”层，不启动 Java，不启动 mini-kv，不重放真实 runtime execution。

非目标同样重要。第一，本版不处理 `RuntimeExecutionPassEvidenceArchiveVerificationRenderer`，因为它的 archive references 使用 `profile.archiveReferences.flatMap((reference) => renderEntries(reference))`，这会让迁移后仍依赖 `renderEntries` 或需要新本地行 helper，最好单独批次判断。第二，本版不处理 shard readiness、minimal integration、sandbox handle、fake transport packet 等 family，它们有本地 helper 或不同的 archive file line 模型。第三，本版不新增 builder 能力，不把 archive reference filtering 抽成共享模板。第四，本版不 touch Java / mini-kv 仓库，也不 stage 当前工作树里既有的 Java playbook 进度记录。

必要性来自 N1 和 N5 的衔接。现在多个 archive renderer 仍在手写同样的 markdown 骨架：标题、meta、source/replay/archive/checks/summary/messages/next actions。只要这些文件继续保持旧数组拼接，Phase-B 就很难判断哪些 renderer 已经足够薄、可以折回 service 文件。v2122 把这一批改成 builder spec 后，文件的剩余职责更清楚：声明报告标题、meta 字段顺序、section 顺序，以及 archive references 的 raw lines 表达式。这样后续做文件合并或 unused warning cleanup 时，改动面会更小。

这批选择“七个”而不是追求更多数量，是为了保持工程切片的清晰度。剩余列表里还有 runtime pass evidence、shard readiness、minimal integration、sandbox handle、fake transport packet 等文件，它们表面上都叫 archive verification renderer，但它们的归档引用展示方式并不一致。若把它们放进同一版本，代码改动会看起来更大，实际审查反而更难，因为 reviewer 需要同时判断多种 helper 策略。v2122 只处理无本地 helper、能直接用 builder 四种 section 表达的 operator lifecycle/runtime gate renderer，能把风险压在“排版外壳迁移”这一件事上。

这也符合当前项目后期保养的节奏。现在 Node 仓库已经不是练习级小工程，很多文件承担的是治理证据和历史归档职责。对这种仓库做重构，最怕把安全边界、历史证据和代码形态优化混在一起。v2122 的做法是先让展示层变薄，让重复外壳退场；但不顺手改 profile 字段、不顺手改文案、不顺手把 archive reference 变成新的共享业务模板。这样每个版本的收益虽然集中，却能不断削减后面维护的认知成本。

## Entry Points / 入口

本版入口仍然是 7 个原有 public export，函数名和文件名都不变。route 层、测试层和 loader 层继续调用同名 renderer，不需要感知内部实现从数组拼接换成 builder spec。`renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationMarkdown` 仍然接收 declared operator lifecycle evidence intake profile；runtime execution artifact intake preflight、packet stop record、runtime live-read gate plan、live-read gate plan intake、operator service lifecycle evidence intake、approval gate review 也都保持同样签名。

这些入口的共同 meta 行非常敏感，包括 active/source Node version、ready for next runtime gate、archive verification only、reruns live read、starts/stops Java service、starts/stops mini-kv service、connects managed audit、execution allowed、active shard prototype enabled。迁移后这些 label 原样进入 meta tuple，没有改写大小写，没有合并字段，也没有调整顺序。这样 markdown 第一屏仍能表达同样的安全边界：这是 archive verification，不是 live execution，也不是 production approval。

## Response Model / 响应模型

响应模型仍然是 markdown string。旧模型用数组表达 section 顺序，新模型用 builder 的 `sections` 数组表达同一顺序。多数文件包含 `Source Node vXXX`、`Replay From Frozen Evidence`、`Archive Verification`、`Archive References`、`Checks`、`Summary`、`Production Blockers`、`Warnings`、`Recommendations`、`Next Actions`。其中 source、replay、archive verification、checks、summary 都是 entries section；production blockers、warnings、recommendations 是 messages section；next actions 是 list section，保留 `No next actions.` 的旧空态。

Archive References 是本版最需要谨慎的部分。旧代码对 `Object.values(profile.archiveReferences)` 做过滤，只保留含 `path` 的对象，再输出 `- path: exists=...; bytes=...; digest=...`。这不是普通 entries，也不适合变成新的 builder API。迁移后它被放在 `lines` section，表达式保持原来的 filter/map 逻辑。这样既避免更改文本格式，也避免把业务性的 archive reference 规则灌进共享 builder。runtime pass evidence 之所以跳过，也是因为它的 archive references 是另一个形态，需要单独设计。

响应模型还有一个容易忽略的点：这些 renderer 的 `title` 多数来自 `profile.title`，而不是固定字符串。旧实现使用 `` `# ${profile.title}` ``，新实现因此必须写成 `title: profile.title`，不能把当前测试里的标题复制成字面量。这样做保留了 profile 作为报告身份来源的设计，也避免未来 loader 调整标题时 renderer 不同步。meta 行则继续显式列出，因为 meta 行顺序就是报告读者判断边界的第一层索引，不能让 builder 根据 profile 自动枚举。

messages 与 list 也按旧语义保留。production blockers、warnings、recommendations 继续走 messages section，空态文案仍然是 `No production blockers.`、`No warnings.`、`No recommendations.`。next actions 继续走 list section，因为旧代码本来使用 `renderList(profile.nextActions, "No next actions.")`，空数组时会输出空态 bullet。这个选择和 v2121 的 next actions 处理不同，说明每个批次都要看旧实现，而不是套一个统一模板。迁移的规则不是“所有 next actions 都一样”，而是“每个 renderer 输出必须与旧代码逐字节一致”。

## Upstream Evidence and Config / 上游证据与配置

v2122 不需要新鲜 Java 或 mini-kv evidence。所有 profile 都来自 Node 仓库已有的 frozen archive 或 historical fallback，测试通过 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 验证 fallback 路径仍可用。配置仍然保持 `UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`，renderer 本身也没有读取配置、启动服务或打开网络的能力。它只接收 loader 已经生成好的 profile，然后渲染 markdown。

这一点决定跨项目协作结论：Java 和 mini-kv recommended parallel。Node v2122 不要求它们完成新版本，不要求它们写回 Node，不要求 live service startup，也不改变 evidence schema。它只是整理 Node 自己的报告展示层。其他项目可以继续按各自 playbook 做 CI、coverage、lint 或文件拆分，不需要等 Node 的 renderer consolidation 结果。

从证据消费角度看，本版更像“只读投影整理”，不是“上游合同推进”。profile 中的 Java / mini-kv 字段只是历史归档里的版本引用和状态摘要，renderer 不会打开 sibling workspace，也不会检查当前 Java 或 mini-kv 工作树。这个边界能避免三项目并行时出现假依赖：Node 可以继续折叠自己的报告 renderer，Java 可以继续改善 Maven/CI/coverage，mini-kv 可以继续做存储侧治理。只有当 Node 需要新的证据 schema、新的 live integration 或新的服务启动约定时，才应把另外两项目列为前置。

## Service Flow / 服务流程

服务流程从 HTTP route 到 loader 再到 renderer 保持不变。route 收到 markdown 请求后，loader 读取本地归档和 fallback 证据，生成 profile；renderer 把 profile 映射为 markdown。v2122 改动发生在最后一步：旧 renderer 自己推入标题、空行、section heading 和 body lines；新 renderer 声明 `title`、`meta`、`sections`，然后交给 `renderVerificationReportMarkdown`。builder 负责统一排版，renderer 保留业务字段选择。

builder 的流转很简单：先输出 H1 和 meta bullet，再按 sections 顺序输出每个 H2 和 section body。entries section 调 `renderEntries`，messages section 调 `renderMessages`，list section 调 `renderList`，lines section 直接展开给定字符串数组。v2122 的 archive reference filter/map 作为 lines section 保留在 renderer 文件里，因为它属于该 family 的人读行格式。这个分层让排障路径更短：字段缺失看 renderer spec，统一空行异常看 builder，profile 值错误看 loader。

具体到文件内部，旧实现的“数组脚本”会把每个 section 的标题、空行和 body 混在一起，阅读时需要在几十行重复结构中寻找真正的业务差异。新实现把 section 变成对象列表，差异就更明显：哪些 section 是 entries，哪些是 messages，哪些是 list，哪些是 raw lines，一眼能看出来。对 operator lifecycle 这一批来说，最特殊的只有 Archive References；其他 section 都是标准映射。这个结果说明 v2122 的切片是合适的，它没有把复杂 helper 版本提前卷进来。

服务流程保持不变还意味着回滚很简单。若 CI 或人工审查发现某个 renderer 输出异常，可以单独回滚对应文件到旧数组实现，而不需要回滚 loader 或 route。因为本版没有改 profile 生成，也没有改 route 注册，所以问题定位会落在 renderer spec 或 builder 映射上。这个可回滚性是治理型仓库重构必须保留的属性，尤其是在版本数量已经很多、历史证据目录庞大的情况下。

## Safety Boundary / 安全边界

安全边界有三层。第一层是行为边界：没有 route、loader、client、config 或 access guard 变化，`executionAllowed` 仍然由 profile 给出，renderer 不会根据字段值执行任何动作。第二层是增长边界：没有新增 service、route 或 type 文件，`test/governanceGrowthRatchet.test.ts` 包含在 focused batch 中。第三层是批次边界：runtime pass evidence、shard readiness、minimal integration、sandbox handle 和 fake transport packet 都没有混入本版，避免把不同 helper 风险合在一个 commit 里。

本版还继续保护工作树边界。当前 `docs/plans/production-excellence-java-playbook.md` 有既有未提交改动，它记录的是 Java J0 状态，不属于 Node v2122 renderer consolidation。提交时只 stage Node renderer、Node plan、CHANGELOG 和 v2122 归档，避免跨项目状态与 Node 展示层重构混在一起。这样 reviewer 可以直接判断这次 commit 的意图，不需要拆分无关 diff。

安全边界还体现在“没有截图需求”上。本批次迁移的是 markdown renderer，不是新页面，不是新 smoke route，也不是重新生成归档 HTML。旧报告会列出历史 archive references 是否存在，但本版不重新拍图、不启动浏览器、不把历史截图当作新产物。对展示层重构来说，逐字节 compare 比新截图更有效，因为它能证明整个 markdown 文本没有变化，而截图只能证明某个渲染结果肉眼相似。

## Test Coverage / 测试覆盖

本版验证包含 typecheck、focused renderer tests、ratchet 和 byte-identical compare。focused batch 共 9 个测试文件、25 个断言，覆盖 7 个目标 archive verification 测试、`verificationReportBuilder.test.ts` 和 `governanceGrowthRatchet.test.ts`。这些测试确保 route markdown、fallback profile、ready flags、blocked 状态和 no-service-growth 条件都保持稳定。

byte-identical compare 是最硬的展示层证据。临时 Vitest 测试从 `git show HEAD` 读取迁移前 renderer 源码，把旧 import 指向当前 source tree，加载真实 profile，然后比较新旧 renderer 输出完整字符串。7 个 renderer 全部通过，说明标题、meta、section 顺序、archive reference 行、messages 空态、next actions 空态和末尾换行都没有变化。这个临时测试不进入提交，收尾时会随 `.tmp` 删除。

后续收尾还会跑文档质量 gate、lint、build，并在推送后等待远端 Node Evidence CI。lint 的 263 warnings 是 v2115 既有基线，本版不扩大 warning 处理范围。CI 会再次跑 typecheck、lint、test、build、safe smoke、metrics smoke 和 release evidence readiness smoke，形成远端兜底。

临时 compare 测试的实现也值得保留为经验。它不是复制旧输出字符串，而是从 git 中取迁移前源代码，改写 import 后直接运行旧 renderer。这种方法能避免手写 expected markdown 时漏掉空行或空态，也能避免把当前新 renderer 的输出误当成 expected。测试跑完后临时文件必须删除，因为它们只服务本次证明，不应该进入仓库长期维护面。

v2122 之后的维护收益会体现在两个方向。第一，剩余 no-helper renderer 数量继续下降，下一次审查剩余列表时，真正复杂的 helper family 会更突出，不会被大量简单数组拼接噪声遮住。第二，已经 builder 化的文件可以成为 Phase-B 合并候选：如果某个 renderer 只剩一个 builder spec，且 service 文件本身没有超出可维护范围，就可以考虑把 renderer 折回 service，减少文件数量，同时下调 ratchet baseline。这样 N1 的工作不是孤立的排版重构，而是在给 N5 的 noUnused、lint warning、巨型文件拆分创造空间。

后续批次应继续保持“同族、同形、同验证”的原则。同族意味着一个版本最好只处理 operator lifecycle、minimal integration 或 sandbox handle 中的一个 family；同形意味着 helper 策略相近，不把 entries-only、raw-lines-helper、condition-heavy helper 混在一起；同验证意味着每批都能跑到对应 focused tests 和 exact compare。只要这三点守住，即使版本数量多，也不会变成凑版本，而是逐步把治理型代码库从历史堆积状态带回可维护状态。

从剩余列表看，v2122 收掉这一组后，后面的选择会更清楚：runtime pass evidence 需要单独处理 `flatMap(renderEntries)` 的行生成策略；shard readiness 和 minimal integration 需要沿用 v2121 的 helper-aware 思路；sandbox handle review 则应作为独立 family 做更完整的验证。换句话说，本版不是简单“又迁移七个文件”，而是在把剩余工作切成更可审查的几块。每收掉一个同形小族，下一批的风险画像就更明确，计划也更容易写得具体。

特别是 runtime pass evidence，虽然它没有顶层本地函数，但它在 section body 里直接复用 `renderEntries` 展开数组元素。若本版强行迁移它，要么保留旧 import，要么临时复制格式化逻辑，两种都不够干净。因此把它留给下一批是更稳的做法：先决定是否保留一个小型本地 helper，再做逐字节验证，而不是在本版里临时凑进来。

这个边界也提醒后续版本：能迁移不等于应该立刻迁移，先把相同风险的一组做扎实，比一次性改很多文件更符合后期维护，也更利于长期审查，可靠，也便于后续回滚和复核。后续版本若继续沿这个节奏推进，计划里应先列出剩余 renderer 的 helper 形态，再决定迁移批次，而不是只按文件名或数量凑批。

## One-sentence Summary / 一句话总结

v2122 把 7 个 Java / mini-kv operator lifecycle 与 runtime gate archive verification renderer 迁移到共享 builder，在保持输出逐字节一致、保持 Java/mini-kv 并行不受阻、保持服务和路由数量不增长的前提下，继续推进 N1 为后续 Phase-B 合并和 N5 代码健康治理铺路。
