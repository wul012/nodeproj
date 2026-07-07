# v2182 代码讲解：closure evidence digest 归一化修复

## Goal and Non-goal / 目标与非目标

v2182 的目标是修复 v2181 推送后 GitHub Actions 暴露出来的第二个 v2180 renderer parity hash 漂移。v2181 已经把 prerequisite-intake notes 里的 `chained to <digest>` 折叠成稳定占位，新的 CI run `28877491126` 证明第一个 case 不再失败；但完整 coverage 跑到最后时，`sandboxHandleReviewPrerequisiteClosureReview` 又出现同类现象：normalized length 已经匹配，sha256 从本地期望的 `fe331...` 变成 Linux runner 上的 `f844...`。长度一致说明输出规模没有漂移，hash 不一致说明还有同长度 digest 文本没有被归一化。

本版的非目标非常窄。v2182 不改 sandbox handle review 的任何产品 renderer，不改 `renderVerificationReportMarkdown`，不改 loader，不改 route，不改 schema，不改 fixture，不改 Java 或 mini-kv，也不改变真实 Markdown 中展示 digest 的能力。真实报告继续保留 archive digest 和 decision digest，方便审查者追溯 closure review 的上游证据。v2182 改的是测试比较面：在计算 renderer migration parity hash 前，把一个已确认属于平台派生噪声的自然语言 digest 句式折叠成占位。

这个修复继续单独成版，是因为 v2181 已经提交、打 tag、推送，并且远端 CI 已经留下失败证据。仓库前例已经证明这种情况下不移动旧 tag，而是用新的 CI repair 版本保留历史链条。v2180 是 renderer 迁移，v2181 是第一处 notes digest normalizer 修复，v2182 是第二处 closure evidence digest normalizer 修复。这样做看起来多一个版本号，但工程审计更清楚：每个红灯都有独立 run、独立根因和独立修复。

本版的价值在于把 normalizer 的边界继续收窄到真实失败行。v2181 后仍红，说明“自然语言 digest”不是单一形态；一个在 prerequisite input notes 中，一个在 closure completed item evidence 中。二者都不是本次 renderer migration 要验证的结构语义，但二者的位置不同、句式不同、包含的 digest 数量也不同。v2182 没有写成替换所有 64 位 hex，而是只补 `verified archive <digest> for decision <digest>`。这让测试稳定，同时避免把 archive verification 里真正应该敏感的 digest 字段吞掉。

这次连续两轮 CI repair 也暴露出一个更一般的工程事实：renderer parity 的“字节一致”不是裸 Markdown 在任意机器上的逐字节一致，而是经过既定 normalizer 后的稳定比较面一致。真实 Markdown 要服务审查者，所以它应该保留路径、digest、证据引用和 source 链路；测试 hash 要服务迁移回归，所以它应该排除时间、工作区路径、平台换行派生 digest 这类不属于 renderer 结构的噪声。v2182 把这个边界再向前推进一步，但没有改变目标：迁移 builder 以后，报告的可读结构和业务语义必须保持不变。

## Entry Points / 入口

第一入口仍是 `test/rendererMigrationParityUtils.ts` 的 `normalizeRendererMigrationMarkdown(...)`。v2182 新增的规则是：`/(verified archive )[a-f0-9]{64}( for decision )[a-f0-9]{64}/g` 替换成 `$1<digest>$2<digest>`。这条规则只匹配 closure review evidence 的自然语言句式，不匹配任意 digest，不匹配结构化 `archiveVerificationDigest` 或 `sourceDecisionDigest` 字段，也不匹配其他业务文案。它的目标就是把 CI 日志暴露的那一行 runner-specific 派生值从 hash 比较面里拿掉。

第二入口是 `test/rendererMigrationV2180Parity.test.ts`。v2182 只更新第五个 case `sandboxHandleReviewPrerequisiteClosureReview` 的 expected length 和 sha256：length 从 7927 变为 7815，sha256 变为 `6b4bd57cbfde80470b02a3bd12cfbf14d70c91eee2418533ab54ae12e5ac2010`。H1/H2/H3 数量保持 1/10/0。前四个 case 不变，尤其 v2181 修过的 prerequisite-intake 仍是 10535 / `fa329...`，说明新增规则没有扩大影响。

第三入口是 v2182 的 evidence、解释和代码讲解。它们不参与运行时，但会把这次失败写成可复现记录：run `28877491126`、失败 step Test、失败 case closure review、失败断言、根因、变更文件和新的 normalized fingerprint。这个记录有两个作用：一是说明为什么 v2181 没有完全收住 CI，二是给以后处理类似 parity 漂移提供判断模板。

这个入口分工也避免了一个诱惑：直接把 expected hash 改成 CI 收到的 `f844...`。那种做法只是把 Linux runner 当前字节值写死，Windows 本地会反向失败，下一次 checkout 策略变化也可能再红。v2182 先找到具体未归一化行，再添加句式级 normalizer，再重新计算平台无关 fingerprint。这个顺序比追随某一次 CI 实际值更稳。

还有一个入口层面的维护判断：为什么不把这两次修复合并成一个“所有自然语言 digest 都替换”的大规则？原因是自然语言并不天然等于噪声。某些说明句里的 digest 可能就是报告要强调的证据，例如 release evidence 的最终包 digest、archive bundle 的 manifest digest、或人工批准材料的签名摘要。如果一条宽规则把这些都替换掉，未来 renderer 改错 digest 所在 section 时，测试可能仍然绿。v2182 选择句式级规则，是为了把 normalizer 的每次扩展都绑定到一个可复现失败和一个明确责任边界。

## Response Model / 响应模型

v2182 不改变 public response model。closure review Markdown 仍然会在 Completed Closure Items 中展示一句完整 evidence：某个 Node 版本验证了 archive digest，并关联到 source decision digest。这个证据对真实审查有价值，不能从产品输出中删除。报告用户需要看到 digest，才能把 closure review 与前置 archive verification、decision record 串起来。

变化只发生在 normalized comparison string。parity test 生成真实 Markdown 后，normalizer 会把 `verified archive <64位hex> for decision <64位hex>` 转成 `verified archive <digest> for decision <digest>`。这样 hash 仍然覆盖“这句话存在、句式存在、evidence 属于 closure item、section 顺序不变、closure state 不变”，但不覆盖两个由上游文件字节派生出来的平台敏感 digest 值。

这个响应模型的关键是“双层真实”。第一层真实是产品报告真实：route 返回的 Markdown 必须能帮助人审查证据链，因此 digest 不应被隐藏。第二层真实是迁移比较真实：测试要判断 builder 迁移有没有改变渲染骨架，因此不应把平台相关 digest 当成 renderer 行为。v2182 没有牺牲第一层来满足第二层，而是在第二层比较前做归一化。这样既保留审查价值，也让 CI 判断更贴近迁移风险。

更新后的 closure review 指纹是 length 7815、sha256 `6b4bd57cbfde80470b02a3bd12cfbf14d70c91eee2418533ab54ae12e5ac2010`。length 减少 112 个字符，正好对应两个 64 位 digest 各替换成 `<digest>` 的差值。这个差值解释了为什么 v2181 CI 里长度检查仍然先通过：Windows 和 Linux 都输出两个 64 位 hex，只是具体内容不同，所以长度不变，只有 hash 能发现。

这里的响应模型继续保留多层断言。length 检查报告规模，sha256 检查同长度内容，H1/H2/H3 检查标题层级，结尾换行检查 Markdown 合同。v2182 没有降低测试强度，只是把 hash 对准 renderer migration 真正应该保持稳定的内容。如果未来 closure review 丢掉 completed item、改了 heading、删了 evidence 句子或改变了状态字段，测试仍会失败。

## Upstream Evidence / 上游证据

直接上游证据是 GitHub Actions run `28877491126`。这个 run 的 Typecheck 和 Lint 都已经通过，Test 阶段完整跑到最后，只剩 `test/rendererMigrationV2180Parity.test.ts` 的一个 assertion failure。失败 case 是 `sandboxHandleReviewPrerequisiteClosureReview`，期望 `fe331...`，实际 `f844...`。同一 run 中 541 个 test files 和 1646 个 tests 已经通过到汇总前，说明问题仍然集中在 v2180 parity 的比较面。

本地排查方式很直接：用同样的 fixed generatedAt 和 forced historical fallback 生成 closure review Markdown，再经过 normalizer 后扫描 64 位 hex。结果显示结构化 digest 字段都已变成 `<digest>`，但 completed item evidence 行仍有两个真实 digest：`verified archive ... for decision ...`。这说明 v2181 的 normalizer 修了第一种 notes 句式，没有覆盖第二种 evidence 句式。

这两个 digest 为什么也会跨平台变化？它们来自上游 archive verification 和 source decision 的派生值，而这些上游派生值可能受 checkout 文本字节影响。Windows 工作树中的 CRLF 与 Linux runner 中的 LF 会让同一个文档内容在字节层面不同。对于 archive verification 自身，这种差异可能需要专门证据解释；对于 renderer migration parity，它不是要验证的对象。v2182 因此只在比较面折叠这两个值。

这里还要区分“上游证据有效”和“上游 digest 可跨平台复用”两个概念。forced historical fallback 能保证 CI 不依赖 sibling workspace，但它不能自动保证每个由文本字节计算出来的 digest 在 Windows 和 Linux 上相同。只要 Git checkout 的换行策略不同，某些派生 digest 就可能不同。v2182 不否定上游证据，也不重写 fixture；它只是承认 renderer 迁移测试不应该把这类派生值当成稳定 UI 合同。

Java 和 mini-kv 在 v2182 中仍然不需要等待。v2182 不消费新上游证据，不启动 sibling 服务，不写任何外部仓库，也不改变 cross-project contract。Java / mini-kv 可以继续各自计划。Node 这里只是把红 CI 的测试比较面修到稳定。

## Service Flow / 服务流向

运行时服务流不变：route 调 loader，loader 生成 profile，renderer 把 profile 渲染成 Markdown。v2182 不进入这条链。`renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewMarkdown(...)` 仍然展示 closure review summary、completed closure items、remaining closure items、checks、summary、messages 和 next actions。真实输出里 digest 仍然完整。

测试服务流是 renderer 输出先保持真实，再进入 normalizer，再做断言。v2182 改的是 normalizer 中的一条替换规则。它不会改变 loader 里的 `reviewDigest`、`archiveVerificationDigest`、`sourceDecisionDigest`，也不会改变 renderer helper 如何缩进 closure item。它只是让 parity hash 不再依赖两个平台派生 digest 的具体 hex。

把这条规则写进共享 normalizer，而不是 v2180 parity test 内联替换，是为了避免后续维护分裂。v2167 到 v2180 的 migration tests 都用同一个 normalizer；当 CI 发现新的环境噪声类型，应该先判断是否属于全局比较经验，再放入共享工具。v2182 的句式来自 v2180 closure review，但以后其他 renderer 也可能出现相同自然语言证据句。共享规则能复用，同时通过历史 migration 回归确认没有误伤。

这个 service flow 还提示后续版本怎么处理剩余 renderer。每次遇到 CI-only hash drift，先问三个问题：真实 Markdown 是否应该保留这个值；这个值是否由环境或上游字节派生；替换规则能否窄到具体标签或句式。如果三个答案分别是“应该保留”“是派生噪声”“可以窄匹配”，才应该扩展 normalizer。否则就要怀疑产品输出真的变了，不能用 normalizer 掩盖。

从剩余 14 个 renderer 的角度看，这个判断模板很重要。后续 endpoint credential resolver、readiness gate 和 controlled profile section 仍可能展示 source digest、archive digest 或 approval digest。迁移它们时，不能因为 v2181/v2182 修过自然语言 digest，就默认所有 digest 都可忽略。每一个被折叠的值都要回答“它是不是 renderer 结构之外的环境派生值”。回答不清楚，就应该保持 hash 敏感，让测试失败暴露问题。

## Safety Boundary / 安全边界

第一条安全边界是 public Markdown 不变。v2182 没有隐藏真实 digest，没有改变 completed closure item，也没有缩短 evidence 句子。审查者仍能从报告中看到 archive digest 和 decision digest。这对真实证据链很重要。

第二条安全边界是 normalizer 规则必须窄。新增正则只匹配 `verified archive <digest> for decision <digest>`，不会替换所有 hex。这样 archive verification、release evidence、source bundle 等真正需要 digest 敏感性的字段仍然进入 hash。测试不会因为这条规则变成“digest 全忽略”。

第三条安全边界是保留失败历史。v2181 tag 不移动，v2182 记录 v2181 的红 CI。这样历史能表达修复过程：第一次 repair 解决 prerequisite-intake notes，第二次 repair 解决 closure evidence。虽然多了一次往返，但比重写历史更可审查。

第四条安全边界是红 CI 继续优先。v2182 不继续迁移剩余 renderer，不新增功能，不扩大范围。收口条件是本地 focused 和文档门通过，提交、tag、push，然后等待 v2182 GitHub Actions 绿色。如果仍有红灯，继续修红灯；如果绿色，就按用户要求停下。

第五条安全边界是不要改 fixture。CI 失败不是 fixture 缺失，也不是 route 行为错误，而是 normalized comparison string 仍含平台派生 digest。改 fixture 会扩大影响面，还可能改变上游证据链。v2182 保持 fixture 不动。

第六条安全边界是本轮到绿灯即停。用户已经明确要求“做完先停”，所以 v2182 不继续推进剩余 renderer，也不把这次 normalizer 修复顺手扩展成下一批迁移。若 v2182 远端仍红，就继续处理红灯；若远端绿，就停止并汇报。这条边界能避免 CI repair 演变成新的功能窗口，保持当前任务的可控收口。

## Test Coverage / 测试覆盖

v2182 的第一组验证会重跑 `npx vitest run test/rendererMigrationV2180Parity.test.ts test/rendererCensusScript.test.ts --maxWorkers=2`。它要证明直接失败的 v2180 parity case 已经用新 fingerprint 自洽，同时 census ratchet 仍然保持 231/245 标准化、14 个未标准化。

第二组验证会重跑历史 migration 回归：v2167、v2168、v2169、v2170、v2175、v2176、v2178、v2179、v2180。共享 normalizer 被改动后，必须证明历史 case 没有被误伤。这个回归比单跑 v2180 更重要，因为 normalizer 是公共测试工具。

第三组验证是文档门、typecheck、lint、build 和最终 GitHub Actions。文档门确认 v2182 讲解满足中文、章节和禁用短语要求；typecheck/lint/build 确认测试工具变更不破坏工程门；GitHub Actions 是 Linux runner 完整 coverage 和 smoke 的最终证据。

这些覆盖共同证明 v2182 只是 CI comparison repair，不是产品行为变更。focused parity 对准失败点，migration 回归保护共享工具，文档门保护可审查性，工程门保护基础质量，远端 CI 保护 Linux 环境。全部过后，本轮才算真正完成。

验证结果还要读成分层证据，而不是简单地看“跑了很多命令”。如果 focused parity 失败，说明 v2182 没修到直接红点；如果 migration 回归失败，说明共享 normalizer 误伤旧版本；如果文档门失败，说明修复原因不足以交给后续维护者；如果远端 CI 失败，说明本地仍没有覆盖真实 Linux runner 条件。每一层都有不同责任，全部通过才说明修复闭环。

## One-sentence Summary / 一句话总结

v2182 把 closure review evidence 里的 `verified archive <digest> for decision <digest>` 纳入 renderer migration normalizer，修复 v2181 后仍存在的 Linux runner hash 漂移，同时保持产品 renderer、loader、route、schema、fixture 和真实 Markdown 输出全部不变。
