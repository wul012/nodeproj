# v2176 代码讲解：shard/readiness 与 production shard execution 共享 renderer 收敛

## Goal and Non-goal / 目标与非目标

v2176 的目标是继续压缩 N1 renderer consolidation 的尾部，把三个仍然手写 Markdown 数组的完整报告 renderer 迁移到 `renderVerificationReportMarkdown`。这三个文件分别是 shard readiness compatibility report、shard readiness contract consumer gate、production shard execution readiness renderer。前两个属于较早的 shard readiness 合同消费链，第三个属于生产分片执行准备链，而且不是单一路由专用 renderer，而是被 21 个 production shard execution stage profile 复用的共享 renderer。

本版的非目标同样清楚：不改 loader，不改 route，不改 schema，不改 fixture，不启用生产分片执行，不启动 Java 或 mini-kv，也不让 Node 获得任何新的真实执行能力。所有改动只发生在 Markdown 展示层。对于这类生产前治理项目，renderer consolidation 的价值不是“看起来现代化”，而是减少复制粘贴式报告骨架，同时让输出仍由 parity 测试咬住。任何业务状态、执行边界、证据读取路径都必须由原 loader 决定，renderer 不能重新解释。

这批选择三个 renderer，而不是追求更大的数量，是因为 `productionShardExecutionReadinessRenderer` 的影响半径很大。它虽然只是一个文件，但被 21 个 stage 共享，覆盖 handoff readiness、candidate contract、failure matrix、operator worksheet、archive verification、route catalog、signed approval、managed audit store、external artifact、real artifact intake 等阶段。如果这个 renderer 的 section 映射多出或少掉一行，影响的不是一个端点，而是一整条 production shard execution 叙事。因此 v2176 把它和两个 shard readiness 报告放在同一批，但没有再混入更多复杂 renderer，避免验证面失控。

从维护收益看，本版真正解决的是“同一套报告骨架散落在多个风险层级不同的文件里”。两个 shard readiness 报告属于合同消费与兼容性判断，生产分片执行报告属于更后段的执行准备治理。它们的业务阶段不同，但手写数组里的重复框架完全相同：标题、meta、二级章节、空行、messages 空态和 next actions 列表。把这些框架交给 builder，可以让后续审查者把精力放到每份报告的业务顺序和字段完整性上，而不是反复数空行。这个收益比少几行代码更重要，因为 N1 后面还要继续处理 28 个剩余 renderer，审查成本会随着每批推进不断累积。

## Entry Points / 入口

第一个入口是 `renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportMarkdown`。迁移前，它手写标题、meta、Source Node v370、Source Node v372、Project Reports、Field Checks、Compatibility Report、Checks、Summary、Production Blockers、Warnings、Recommendations、Next Actions。迁移后，标题和 meta 变成 builder spec，普通对象 section 用 `entries`，`Project Reports` 和 `Field Checks` 保留局部 helper 输出为 `lines`。`renderProjectReport` 和 `renderFieldCheck` 没有被删，因为它们表达的是字段兼容性报告的领域格式，不是通用 Markdown 框架。

第二个入口是 `renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateMarkdown`。它和 v2175 的 shard readiness evidence consumption 类似，含有局部 `renderShardReadiness`，需要把 Java 与 mini-kv 的 readiness assessment 展开成多行，包括 required field、missing field、read only、execution blocked、routing mode、boundary safe、evidence file、digest 和嵌套 evidence entries。这个 helper 继续留在本地，section 以 `lines` 交给 builder。这样 builder 只负责排版骨架，不理解 shard readiness assessment 的业务结构。

第三个入口是 `renderProductionShardExecutionReadinessMarkdown`。它最值得小心，因为所有 production shard execution stage profile 都走它。迁移后，`Stage`、`Safety Boundary`、`Stage Payload`、`Checks`、`Summary`、`Evidence Endpoints` 走 `entries`；`Sources` 和 `Controls` 仍然把数组逐项 `renderEntries` 后作为 `lines`；blockers、warnings、recommendations、next actions 交给 builder 的 messages/list。这个映射保持了旧输出的 section 顺序，也保留了 sources 和 controls 之间不插额外标题的旧形态。

审查这三个入口时，可以采用固定顺序。先看 meta 数组是否逐行对应旧报告头部，尤其是 ready、decision、state、service lifecycle 和 parallel recommendation 这些容易漏掉的字段。再看 sections 数组是否与旧报告的标题顺序完全一致。最后看 `lines` section 的来源是否仍然是旧 helper 或旧局部展开。只要这三步都对，builder 迁移就是框架迁移；如果其中任何一步出现新增业务判断、字段改名或 helper 合并，就已经越过本版边界。这个审查顺序会继续适用于后面处理 read-only cross-project runner、minimal integration gate 和 sandbox handle review 家族。

## Response Model / 响应模型

响应模型仍然是一个 H1 标题、一组 meta bullet、多个 H2 section 和尾换行。两个 shard readiness 报告的 fingerprint 分别是 6808 和 7243，H2 数量分别是 11 和 10。production shard execution 共享 renderer 选了三个代表 profile 做 parity：handoff readiness 长度 6484，external artifact dry run closeout 长度 8148，real artifact intake preflight closeout 长度 8143，三者 H2 数量都是 12。选择这三个不是随机的：第一个代表链条开头，第二个代表外部 artifact 处理中段，第三个代表真实 artifact intake 收尾，能覆盖同一 renderer 在不同 payload 规模下的空行和 section 展开。

这些 parity 指纹都通过 `normalizeRendererMigrationMarkdown` 后计算。normalizer 会折叠 generatedAt、绝对路径和 checkout-local 文件元数据，但不会折叠 section 标题、meta 标签、业务字段、检查结果、summary、warning 或 recommendation。因此如果 builder 迁移时漏掉 `Java / mini-kv recommended parallel`，或者把 `Sources` 与 `Controls` 的展开顺序调换，或者让 `Project Reports` 多出空行，hash 都会改变。v2176 不是用新测试覆盖旧错误，而是用迁移前输出锁住新实现。

对 production shard execution 共享 renderer 来说，单个 parity case 不够稳，因为 stage payload 的形状会随阶段变化。现有 `productionShardExecutionReadiness.test.ts` 已经构造并检查 21 个 stage profile，确保它们都保持 execution blocked、readyForProductionShardExecution false、Java/mini-kv parallel recommendation 等关键字段。v2176 parity 再挑三个代表输出做字节级锁定。一个证明数据链还在，另一个证明展示形状没变，两者合起来才足够覆盖共享 renderer 的风险。

响应模型里还要注意“代表 profile”不是覆盖所有业务组合的替代品。它只证明同一个 renderer 在短报告、中等报告和较长报告下的空行、section、列表展开稳定；所有 stage 的业务完整性仍然由既有批量测试负责。因此如果未来 production shard execution 新增 stage，不应该只把它塞进 parity case，而应该先确认 loader 层的批量 stage 测试是否覆盖，再决定是否需要增加一个新的代表输出。renderer parity 是展示层证据，不是业务 stage 构造证据。

## Upstream Evidence / 上游证据

v2176 的直接上游是 v2175 CI green。v2175 已经把 Java/mini-kv shard readiness intake 家族推进到 214/245 标准化，并收紧 census 到 31。只有在 v2175 远端通过后，v2176 才开始写新 renderer，这是为了遵守“CI 红不能带入下一批”的计划书要求。否则如果 v2176 失败，就无法判断问题来自新迁移还是上一批的远端差异。

候选文件来自 `npm run renderer:census -- --json` 的剩余列表。`managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportRenderer.ts` 有 projectReports flatMap 和 fieldChecks map；`managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateRenderer.ts` 有 shard readiness helper；`productionShardExecutionReadinessRenderer.ts` 有 sources/controls flatMap。这三者都是完整报告 renderer，不是纯组合 section renderer，也不是应该 waiver 的文件。相反，三个 `controlledReadOnlyShardPreview...ProfileSectionRenderer.ts` 只是拼接其他 section renderer，更像后续 waiver 候选，不适合强行 builder 化。

上游项目边界仍然安全。两个 shard readiness renderer 只消费历史或已有 profile 数据，production shard execution renderer 只展示 Node 内部 stage profile。没有一个改动需要 Java 或 mini-kv 先交新版本，也没有一个改动会启动服务、开写路由或连接 managed audit。并行状态是 recommended parallel：Java/mini-kv 可以继续自己的 final-push playbook，Node 这里不构成它们的批准阻塞。

这条并行边界需要写清楚，是因为 production shard execution 这个名字容易让人误会为“下一步要真实执行分片”。v2176 完全不是这个动作。它只是在生产分片执行准备材料已经存在的前提下，把展示层从手写数组迁到 builder。真实分片联合执行仍然要等更后面的 integration capstone、服务启动计划、端口所有权、清理责任和外部评审。当前版本只让文档和报告更容易维护，不把任何计划状态升级为执行授权。

## Service Flow / 服务流向

运行时服务流没有变化。route 调 loader，loader 构造 profile，renderer 渲染 Markdown，route 返回 JSON 或 Markdown。v2176 只替换 renderer 内部如何组织 Markdown 字符串。旧代码由数组手写空行和 section，新代码由 builder 统一这些框架规则。导出函数名没有变，参数类型没有变，返回值仍是 string。

builder 流程也保持简单。meta 数组逐项输出为 bullet；section 根据类型选择 entries、messages、list 或 lines。`Project Reports`、`Field Checks`、`Java Shard Readiness`、`mini-kv Shard Readiness`、`Sources`、`Controls` 都属于 lines，因为它们已经由本地 helper 或局部展开生成了最终行。这个选择避免把 builder 扩张成知道 project report、field check、production source/control 的巨型格式器。

对 production shard execution 来说，`Sources` 与 `Controls` 的处理尤其关键。旧输出不是为每个 source/control 加三级标题，而是把每个对象的 entries 连续展开。v2176 保留 `profile.sources.flatMap((source) => renderEntries(source))` 和 `profile.controls.flatMap((control) => renderEntries(control))`，只是把结果交给 builder 的 `lines`。这样报告读者看到的仍是旧格式，维护者看到的则是更清楚的 spec。

服务流的另一个细节是空态文案集中化。旧 renderer 每个文件都直接调用 messages/list 工具，并在数组里手写空态文案。迁移后，空态文案仍然写在本 renderer 的 spec 中，说明文案所有权没有离开报告文件；真正集中的是调用时机和空行规则。这个边界很重要：如果以后某个报告需要把 “No warnings.” 改成更具体的空态说明，仍然应该在该 renderer 的 section spec 里改，而不是去 builder 里加条件分支。

共享 renderer 的流向还有一个容易忽视的维护点：它不是由某一个 route 独占，因此不能只用“当前截图看起来正常”来判断迁移成功。生产分片执行链里每个 stage 都可能带着不同数量的 sources、controls、blockers、warnings 和 recommendations 进入同一个 renderer。v2176 的实现刻意不在 renderer 内部判断阶段名称，也不根据 stage type 选择不同分支，而是把 profile 中已经整理好的结构如实交给统一报告 builder。这样做的好处是后续新增 stage 时，只要 loader 层继续输出同一类 profile，展示层不需要继续复制一份数组模板；坏处是任何 section 顺序错误都会一次性影响很多报告，所以本版必须把 route 级测试、代表输出 parity、census ratchet 和完整套件放在一起看，不能只看某一个局部结果。

这也是本版没有继续扩大迁移范围的原因。N1 的剩余 renderer 中仍有一些 map/flatMap 信号更醒目的文件，但它们如果同时混入 v2176，会把“共享 renderer 风险”和“新家族迁移风险”叠在一起。当前切片把风险控制在三个完整报告：两个 shard readiness 报告用于证明普通完整报告可以继续收敛，一个 production shard execution 共享 renderer 用于证明高复用报告也可以收敛。三者足够形成工程收益，也足够让 reviewer 逐项复核输出，范围再大反而会降低证据质量。

## Safety Boundary / 安全边界

第一条安全边界是不要把共享 renderer 的迁移误认为业务进展。`productionShardExecutionReadinessRenderer` 改成 builder，不代表 production shard execution 更接近真实执行，也不代表任何 blocker 被解除。profile 中的 `readyForProductionShardExecution`、`executionAllowed`、production blockers 仍由 loader 决定。renderer 只是展示这些值。

第二条安全边界是局部 helper 保留。`renderProjectReport`、`renderFieldCheck`、`renderShardReadiness` 都没有进入 builder。原因不是懒，而是职责边界：这些 helper 反映领域语义，builder 只反映报告框架。如果把它们塞进 builder，短期会让某几个 renderer 更短，长期会让 builder 变成难维护的总控文件，违背 AGENTS 里“不要制造巨型代码文件”的要求。

第三条安全边界是 ratchet 只收紧。v2176 census 从 217/28 反推测试基线，`rendererCensusScript.test.ts` 更新为当前值，负向 gate 改成 `--max-unstandardized=27` 必须失败。这不是为了让测试过而改期望，而是把已完成迁移固化成未来不能回退的机械检查。如果后续有人把这三个 renderer 改回手写数组，census 测试会失败。

第四条安全边界是不要提前处理 waiver。只读准备已经发现三个 controlled read-only shard preview section renderer 可能是纯组合器，后续可以写入 waiver 文档；但 v2176 没有顺手处理它们。原因是 waiver 需要单独证明“builder 迁移不会减少格式逻辑，只会增加间接层”，它和本版三个完整报告的迁移证据不同。把 waiver 和迁移混在同一版，会让 reviewer 难以判断本版到底是在减少未标准化 renderer，还是在声明例外。后续应单独做 waiver 批或在 N1 尾部集中处理。

## Test Coverage / 测试覆盖

第一组验证已经通过：`npm run typecheck`，以及 `npx vitest run test/rendererMigrationV2176Parity.test.ts test/managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.test.ts test/managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.test.ts test/productionShardExecutionReadiness.test.ts --maxWorkers=2`。结果是 4 个测试文件通过、10 个测试通过。这里覆盖了新 parity、两个 shard readiness report 的原有 route/loader 行为、production shard execution 的 21 stage 批量构造。

census 已经通过 `npm run renderer:census -- --json --max-unstandardized=31`，输出 total 245、standardized 217、unstandardized 28，shape signals 为 map 30、flatMap 24、h3 0、forLoop 0。接下来还需要跑 rendererMigration 全家桶、文档质量门、lint、build 和完整 vitest，并在 evidence JSON 里回填结果。推送后还要等 GitHub Actions CI 绿，才能继续下一批。

完整验证的重点有两个。一个是 `rendererCensusScript.test.ts`，它会证明新 ratchet 自洽，并且负向 gate 能真的失败。另一个是 full vitest，因为 production shard execution renderer 影响面比普通单路由 renderer 大，只有完整套件能确认没有某个阶段的 route Markdown 被遗漏。若 full vitest 失败，必须先修 v2176，不能带红灯进入 v2177。

验证通过后，下一批可以继续沿着剩余列表做选择。优先级不应只看文件短，而应看“是否完整报告、是否能用 parity 证明、是否有现成 route/loader 测试、是否会拉入新的业务语义”。例如 read-only cross-project readiness runner 虽然 map 数多，但如果现有测试足够稳定，可以作为中等批次；纯组合 section renderer 则更可能进入 waiver；sandbox handle review 家族包含多个 flatMap，可能需要拆成更小切片。这个排序原则能避免最后只剩难题，也能保持每版有足够工程含量。

验证证据还要区分“本地迁移正确”和“远端流水线接受”。本地 focused tests 说明这三个 renderer 自身没有改坏；rendererMigration 历史批次回归说明 builder 和 normalizer 没有破坏前几版迁移；lint 和 build 说明类型与打包路径仍然干净；full vitest 说明更广的服务行为没有被间接影响。推送后的 GitHub Actions 则是最后一层环境证据，因为 Windows 本地路径、历史 fallback、CI 安装和远端脚本顺序都可能暴露本机没有暴露的问题。只有这些层次都绿，v2176 才能作为下一批的可信上游，而不是仅仅“在当前终端跑过几个命令”。

## One-sentence Summary / 一句话总结

v2176 把两个 shard readiness 完整报告和一个覆盖 21 个 stage 的 production shard execution 共享 renderer 收敛到通用 builder，用五个 parity 指纹和收紧后的 census ratchet 证明输出不变、标准化进度从 214/245 推进到 217/245。
