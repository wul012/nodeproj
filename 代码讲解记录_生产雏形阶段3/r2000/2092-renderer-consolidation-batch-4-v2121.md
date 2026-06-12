# v2121 renderer consolidation batch 4

## 目标、边界与必要性

v2121 的目标是把 disabled runtime shell design draft 这一组 archive verification renderer 收进共享的 `renderVerificationReportMarkdown`，同时保留这一组自己的 archive reference helper。这个版本和 v2119、v2120 的区别很重要：v2119 主要处理完全同构的 Java / mini-kv cleanup archive renderer，v2120 处理 no-helper archive renderer，而 v2121 开始进入“有本地 helper，但 helper 仍然有合理存在价值”的迁移阶段。如果这一类文件继续留在旧数组拼接模型里，后续 N1 会卡在 helper renderer 上，N5 也无法判断哪些 renderer 已经薄到可以折回 service。相反，如果为了追求统一把 helper 也塞进 builder，就会扩大 builder 的业务含义，让一个排版工具变成 archive reference 专用模板。v2121 选择中间路线：共享外壳，保留局部行格式。

本版迁移 7 个文件：design draft candidate、outline、body intake、body candidate、pre-draft decision、preparation plan、body draft candidate archive verification renderer。它们都属于 managed audit manual sandbox connection credential resolver 的 disabled runtime shell 设计草案链路，报告内容用于证明 Node 只消费历史归档、不开真实 runtime shell、不读取凭据、不解析真实 endpoint、不发 HTTP/TCP 请求、不允许 Java SQL 或 mini-kv 写命令。因为这一组强调“禁用边界”，任何 renderer 迁移都不能改变输出文本，否则审计报告里的 ready label、source version、archive digest、stop condition 数量就可能被误读。

非目标也必须清楚。第一，本版不改 loader，不改 profile type，不改 route，不改测试期望，不改 access guard，不启动任何服务。第二，本版不把 minimal read-only integration、minimal shard readiness、sandbox handle review 这些仍在剩余列表里的 archive renderer 混进来。它们虽然也有 helper，但语义 family 不同，后续批次需要单独判断 helper 是否该保留。第三，本版不新增 builder 能力。`renderVerificationReportMarkdown` 仍只有 entries、messages、list、lines 四种 section；本版只是把 archive references 和 next actions 放进 lines section，不给 builder 加 archive-specific 参数。第四，本版不处理已存在的 Java playbook 未提交改动，那是别的会话留下的跨项目状态记录，v2121 只 stage Node renderer 与 Node 归档。

必要性来自治理节奏。N1 不只是减少几行代码，而是在给未来的 Phase-B 合并做准备。当前仓库里的 renderer 文件数量巨大，很多文件的唯一职责是把 profile 变成 markdown。如果每个文件都手写同样的标题、空行、meta、section 拼接，代码审查者很难区分“业务输出变化”和“机械排版重复”。v2121 把这 7 个文件改成 spec 形态后，审查焦点变成每个 section 的字段选择和 helper 行格式，重复的 markdown 框架退到 builder 里。这就是后续降低 file-count ratchet 的前置动作。

## 入口与响应模型

本版入口仍然是原来的 exported renderer function，函数名、文件名和返回值类型都不变。路由层调用 `renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraft...ArchiveVerificationMarkdown(profile)`，仍然拿到同一个 markdown string。迁移前这些函数返回一个数组：一级标题、空行、meta bullet、source node 分区、archive verification 分区、archive references 分区、checks、summary、production blockers、warnings、recommendations、next actions，最后 `join("\n")`。迁移后函数返回 `renderVerificationReportMarkdown({ title, meta, sections })`，但 section 顺序和字段表达式保持原样。

响应模型里最敏感的是 meta label。比如 body candidate archive verification 有 `Ready for v338 body candidate archive verification`、`Ready for Node v339 pre-draft decision`、`Ready for disabled runtime shell design draft`、`Ready for runtime shell implementation` 等行。这些 label 不是随便描述，它们定义了当前节点只打开下一步“预草案决策”，而没有打开设计正文、runtime 实现或 runtime 调用。v2121 把这些 label 原样放进 meta tuple，没有重命名，没有合并，没有改成更短的文案。这样浏览 markdown 的人仍能从第一屏判断当前证据边界。

source node 分区也保持旧模型。每个 renderer 都有自己的 source version，例如 candidate 是 v331，outline 是 v333，body intake 是 v335，body candidate 是 v337，pre-draft decision 是 v339，preparation plan 是 v341，body draft candidate 是 v343。每个 source 分区都会输出状态、决策、digest、source checks、production blockers 和当前阶段特有的计数，比如 body sections、evidence items、review questions、preparation controls、section plans、evidence mappings、draft guards、safety guards。迁移后这些对象仍由 `renderEntries` 间接输出，只是调用位置从 renderer 文件转到 builder 内部。

summary 分区没有改成 entries，而是继续使用 raw lines。原因很直接：旧 summary 行不是普通对象键值展示，它们是面向人读的聚合文本，例如 `Checks: passed/total`、`Source Node v337 checks: passed/total`、`Archive files present: present/total`。如果把它们改成 entries，key 会变成驼峰字段名，输出文本就会变化；如果把它们抽成新的 summary helper，builder 又会开始知道业务格式。v2121 使用 `lines` 保存这些旧字符串，是为了把“输出不变”放在“结构看起来更统一”之前。

## 保留 helper 的迁移方法

这一组文件都有同一个本地 helper：`renderArchiveFileReferences(files)`。它把每个 `ArchiveFileReference` 输出为 `- <path>: exists=<bool>; bytes=<number>; digest=<digest-or-missing>`。这个格式和普通 `renderEntries` 不一样，因为它不是把对象的每个属性拆成多行，而是把一个归档引用压成一行，便于人工扫视 11 个归档文件是否齐全。这个 helper 是业务报告行格式，不是 markdown 外壳，所以 v2121 没有把它提升到 `verificationReportBuilder.ts`。

保留 helper 的好处有三个。第一，builder 的职责保持稳定，只负责标题、meta、section、空行和四种 body 类型，不知道 archive reference 的字段名。第二，迁移后的 renderer 仍然能直观看到本文件有哪些归档引用参与报告：json evidence、markdown evidence、smoke summary、route snapshot、browser snapshot、html archive、screenshot、explanation、code walkthrough、active plan、plans index。第三，后续如果某个 family 的 archive reference 行格式不同，仍然可以在本地 helper 中表达，不需要扩展共享 builder 的参数面。

next actions 也用 raw lines，而不是 builder 的 list section。旧代码是 `profile.nextActions.map((item) => \`- ${item}\`)`，如果数组为空，section body 就为空；builder 的 list section 会在空数组时输出 `- No next actions.`。这种空态变化虽然看起来更友好，但会破坏逐字节一致性。v2121 因此把 next actions 写成 `lines: profile.nextActions.map(...)`，保留旧行为。这个选择体现了 renderer consolidation 的核心原则：先证明输出不变，再考虑产品文案优化；不能把重构和文案改动混在同一版本里。

迁移后的 renderer 文件仍然比理想状态长，因为 meta tuple 和 entries object 很大。但它们已经从“手写 markdown 框架”变成“声明报告结构”。这一步的价值不在于马上把文件压到几十行，而是让重复框架消失，后面才能安全判断哪些 field groups 可以抽成更小的本地 factory，哪些 renderer 可以折回 service。过早追求短文件容易引入过度抽象；v2121 的做法是先把稳定重复部分收进 builder，把不稳定业务行保留在本地。

## Service Flow / 服务流程

v2121 的服务流程从 route 到 renderer 没有换线，只是 renderer 内部的组装方式变化。以 body candidate archive verification 为例，route 仍然调用同名 service loader，loader 先读取历史归档、检查 forced historical fixture fallback、汇总 source node v337 的 ready 状态和 archive references，然后返回 profile。route 判断 `format=markdown` 时继续调用 `src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationRenderer.ts` 中的 public export。这个 public export 现在不再手写数组，而是把 profile 映射成 builder spec。请求进入、profile 生成、access guard、headers、状态码和 content-type 都不在本版改动范围内。

builder 内部流程也很短：先写 `# title` 和空行，再按 meta tuple 输出 bullet 行，然后按 sections 顺序输出 `## heading`、空行和 body。entries section 继续走 `renderEntries`，messages section 继续走 `renderMessages`，lines section 直接展开旧 helper 或旧 summary 字符串。这个流程的关键是 section body 的来源仍由 renderer 决定，而不是由 builder 猜业务。比如 source node section 的对象字段顺序由 renderer 里的 object literal 保持，archive verification section 的字段顺序也保留旧顺序，archive references 由本地 helper 生成，summary 由原来的字符串数组生成。builder 只负责统一 markdown 骨架。

这条 flow 对后续排障更友好。若某个 route 的 markdown 丢了 `Ready for Node v339 pre-draft decision`，首先看 renderer 的 meta tuple；若所有 builder 化报告都出现空行问题，才看 `verificationReportBuilder.ts`；若 JSON profile 本身少了 digest 或 ready flag，则回到 loader。职责分层后，reviewer 不需要在每个 renderer 里重新检查标题和空行拼接，只要检查本文件是否把 profile 字段放到了正确 section。v2121 的 exact compare 证明这条 flow 没改变输出，因此可以把它作为后续 helper-aware 批次的模板。

上游证据边界也在这条 flow 里被保住。loader 使用 Node 仓库里的 historical fixture 或本地归档目录，不会因为 renderer 迁移去读 Java 工作树、mini-kv 工作树或真实服务端口。profile 里的 `executionAllowed`、`credentialValueRead`、`httpRequestSent`、`tcpConnectionAttempted`、`javaSqlExecutionAllowed`、`miniKvWriteCommandAllowed` 等字段已经由 loader 判定为 false，renderer 只把它们渲染出来。本版没有把这些字段提升成 builder 的安全策略，也没有让 builder 根据字段值做条件输出，所以不会引入隐藏执行路径。

## 验证策略与风险控制

本版验证分三层。第一层是 `npm run typecheck`，它能发现 meta tuple、entries object、helper 参数和 profile 字段引用是否仍然合法。第二层是 focused renderer batch：`test/verificationReportBuilder.test.ts`、`test/governanceGrowthRatchet.test.ts` 加上 7 个目标 archive verification 测试，共 9 个测试文件、32 个断言通过。这里不仅验证 renderer 输出包含关键文本，也验证 forced historical fixture fallback、route markdown、ready flags、blocked 状态、upstream probes/actions enabled 时的 fail-closed 行为。第三层是临时 Vitest exact compare，它从 `git show HEAD` 读取迁移前 renderer 源码，临时把旧 import 指向当前 source tree，加载真实 fallback profile，然后比较旧 renderer 与新 renderer 输出是否完全相同。

exact compare 是这类版本最关键的证据。普通 route test 通常只检查几个关键片段，比如标题、ready label、requestsJavaMiniKvEcho；它不能证明每一个空行、summary 行、archive reference 行、message empty text 都没有变化。v2121 的 compare 直接用 `toBe` 比较完整 markdown string，7 个 renderer 全部通过，说明 builder spec 没有改变输出。临时 legacy 文件只用于测试，版本收尾前会删除，避免一次性脚本污染仓库。

风险主要有两类。第一类是格式风险：builder 的 `list` 空态和旧 `map` 空态不同，如果误用 list section 就会改变 next actions。v2121 通过 raw lines 避免了这个问题。第二类是 helper 泛化风险：如果把 `renderArchiveFileReferences` 移入 builder，后续其他 family 可能会要求不同 digest label、不同 byte 字段、不同 missing 文案，builder 会被迫接业务参数。v2121 没有这么做，保持了共享层薄、局部层清楚。

还有一个协作风险需要记录：当前工作树里存在一个未提交的 `docs/plans/production-excellence-java-playbook.md` 改动，记录 Java J0 已完成。这不是 v2121 的代码变化，也不是 Node renderer consolidation 的必要输入。本版会在 stage 时排除它，避免把别的会话的跨项目状态混入 Node renderer 提交。Java 和 mini-kv 可以继续 recommended parallel，因为 v2121 只消费 Node 仓库中的历史归档 profile，不要求它们生成新证据。

本版还把浏览器和截图边界说清楚：这些 renderer 对应的是 archive verification markdown，不是新 UI 页面，也没有新 HTTP smoke 页面需要截图。旧 archive reference 中会列出历史截图、HTML archive 或 browser snapshot 是否存在，但 v2121 不重新生成这些图像，也不需要 Playwright MCP。这样做并不是省略验证，而是避免把“展示层重构”误升级成“重新证明历史 archive 产物”。真正证明展示层没有变化的是逐字节 compare；证明 route 仍通的是 focused route tests；证明没有新增治理链的是 ratchet。

本地验证和远端 CI 的分工也保持克制。v2121 在本地先跑 typecheck、focused renderer tests、ratchet 和 exact compare，确认迁移对象自身没有行为变化；收尾阶段再跑 lint、build 和文档质量 gate，确认整个提交不会破坏仓库共同门禁。推送后远端 Node Evidence 工作流会再次跑 typecheck、lint、test、build、safe smoke、metrics smoke 和 release evidence readiness smoke。这个顺序避免了每个小改动都先跑全量重负载，同时也保证真正进入 master 的版本经过 CI 兜底。

提交边界同样是安全控制的一部分。本版会 stage 7 个 renderer、CHANGELOG、两个计划表、v2121 证据、v2121 解释和本篇讲解；不会 stage `.tmp`，不会 stage `dist`，不会 stage 已存在的 Java playbook 工作树改动。这样 commit 能被 reviewer 清楚地理解为“Node renderer consolidation batch 4”，而不是混入跨项目状态同步或临时验证工具。

## 后续批次的继承规则

v2121 给后续 helper renderer 批次留下了一个可复用判断：如果本地 helper 只负责把一个业务数组转换成已经格式化好的 markdown 行，就保留 helper，并把 section 写成 `lines: helper(...)`；如果 helper 只是重复 `renderEntries` 或 `renderMessages` 的薄包装，就可以考虑折回 entries/messages section；如果 helper 内部有条件分支、排序、过滤或跨字段摘要，先保留，不要在同一批次里重构业务逻辑。这个规则能防止 N1 后半段变成随意抽象。

剩余 archive renderer 还包括 declared operator lifecycle、runtime execution packet、minimal read-only integration、minimal shard readiness、sandbox handle review、fake transport packet 等 family。它们不应该全部混成一个大版本。比较稳的路线是继续按 family 分批：先处理结构接近的 operator lifecycle intake/gate/packet，再处理 minimal integration，再处理 sandbox handle review。每批都保留 focused tests、ratchet、exact compare、中文讲解和归档证据。这样版本工作量足够，但不会为了凑数量把不同风险面混在一起。

本版也继续遵守增长控制：没有新增 service、route 或 type 文件，只有 renderer 实现、归档证据、计划表和代码讲解变化。临时 codemod 和 exact compare 测试不会进入提交。后续如果 Phase-B 开始合并 renderer 文件到 service 文件，应当优先选择 v2119 到 v2121 这些已经 builder 化、输出有 byte-identical 证据的文件，而不是直接处理还在旧数组模型里的复杂 renderer。

下一批如果继续处理 helper renderer，要先看 helper 是否只是“把对象变成行”。若 helper 同时做业务判断、过滤缺失证据或计算摘要，就应先保留原 helper，不要在 renderer consolidation 版本里顺手重写业务规则。这个限制能让每次迁移都保持可回滚、可复核、可解释，也更稳妥。

## 一句话总结

v2121 把 disabled runtime shell design draft family 的 7 个 archive verification renderer 从旧数组拼接迁移到共享 builder，在保留 archive reference helper、保留 next actions 旧空态、保留逐字节输出一致的前提下，推进 N1 从 no-helper 批次进入 helper-aware 批次，为后续 Phase-B 合并和 N5 代码健康治理继续铺路。
