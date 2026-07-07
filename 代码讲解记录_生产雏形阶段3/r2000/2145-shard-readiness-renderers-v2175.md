# v2175 代码讲解：shard readiness intake renderer 的 builder 化收敛

## Goal and Non-goal / 目标与非目标

v2175 的目标是继续推进 N1 renderer consolidation，把五个 Java/mini-kv shard readiness 相关的 full-report renderer 从手写 Markdown 数组迁移到 `renderVerificationReportMarkdown`。这五个 renderer 分别覆盖 shard readiness evidence consumption、completed shard readiness evidence intake、active shard plan evidence intake、active shard plan boundary handoff intake、live read gate plan intake。它们都属于 Node 本地渲染层：读取的资料来自 loader 已经组装好的 profile，输出是 Markdown 报告；迁移不改变 profile 内容，不改变 evidence 文件读取方式，也不改变 route 表。

本版的非目标非常明确。第一，不改 Java 或 mini-kv 项目，不要求它们生成新证据。所有上游资料都来自冻结历史 fixture 或 Node 已归档证据。第二，不改 loader，不移动历史 fixture，不改测试期望来“迁就”新输出。第三，不把领域格式塞进通用 builder。`renderVerificationReportMarkdown` 只负责标题、meta bullet、section 间距、entries/messages/list/lines 这些通用框架；如果某个报告有领域特有行，例如 shard readiness assessment 的多行说明，就继续由本地 helper 生成，然后作为 `lines` section 交给 builder。这样做的价值是收敛重复结构，而不是把所有业务表达都抽象成一个巨大函数。

这批也刻意不混入新功能。v2174 刚刚修完 CI parity normalizer，v2175 恢复 N1 功能迁移，但仍保持一个清晰切片：五个 renderer、一个 parity 测试、一个 census/evidence 归档和一篇讲解。没有顺手清理 loader、没有改 route 文案、没有扩大 builder API。对于生产前治理型项目，提交边界比“多做一点看起来更勤快”更重要；边界清楚，后续 CI 红了才知道该查 renderer 映射，而不是在一堆无关修改里翻线索。

## Entry Points / 入口

本版的核心入口是五个 `renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKv...Markdown` 函数。迁移前，它们都通过数组拼接输出 Markdown：先写 `#` 标题，再写一组 meta bullet，然后反复写 `##` section、空行、`renderEntries` 或 `renderMessages` 或 `renderList` 的结果，最后 `join("\n")`。这种写法直接、可读，但在二百多个 renderer 里复制后就会变成维护负担。任何空行规则、messages 空态、list 空态或 meta 顺序的微小差异，都要靠肉眼检查。

迁移后，入口仍然是同名导出函数，外部调用方完全不变。函数内部改成返回 `renderVerificationReportMarkdown({ title, meta, sections })`。`meta` 是标签和值的元组数组，对应原来的 `- Label: value` 行；`sections` 是报告的二级章节定义，可以是 `entries`、`messages`、`list` 或 `lines`。这样每个 renderer 文件只保留本报告真正不同的内容：标题是什么，meta 字段有哪些，section 顺序是什么，每个 section 用哪种渲染方式。空行和尾换行由 builder 统一处理。

第一个入口 `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionRenderer.ts` 稍微特殊。它原本有 `renderShardReadiness` helper，用来把 `ShardReadinessEvidenceAssessment` 展开为项目、版本、字段完整性、执行阻断、文件路径和 evidence entry 等行。这个 helper 是领域格式，不属于通用 Markdown 框架。因此 v2175 没有把它拆掉，也没有把 `ShardReadinessEvidenceAssessment` 加进 builder 类型系统，而是让 `Java v154 Shard Readiness` 与 `mini-kv v145 Shard Readiness` 两个 section 使用 `{ lines: renderShardReadiness(...) }`。这是本版最重要的取舍：通用结构归 builder，领域行保留在本地。

另外四个入口的映射更直接，但仍然需要逐项对齐。`CompletedShardReadinessEvidenceIntake` 有三个证据文件行，分别来自 Java verification、Java index 和 mini-kv snapshot；`ActiveShardPlanEvidenceIntake` 有两个证据文件行；`ActiveShardPlanBoundaryHandoffIntake` 有三个证据文件行，并且多了 mini-kv frozen active plan section；`LiveReadGatePlanIntake` 有三个证据文件行，并且 meta 中多了 live read gate 与 runtime probe 两个布尔字段。迁移时每个差异都保留在 spec 里，而不是通过循环或配置表把五个报告强行做成一张大表。原因是这些报告虽然同族，但它们的业务含义不同：一个是“消费准备度”，一个是“完成证据接收”，一个是“活跃分片计划证据”，一个是“边界交接”，最后一个是“真实读取门计划”。保留显式 section 顺序，reviewer 才能一眼看出每份报告到底证明哪一步。

## Response Model / 响应模型

响应模型在语义上没有变化。每个报告仍然输出一个 H1 标题，一组 meta bullet，若干 H2 section，并以换行结尾。`CompletedShardReadinessEvidenceIntake` 仍然有 `Source Node v377`、`Java v156 Verification`、`Java v155 Index`、`mini-kv v146 Snapshot`、`Evidence Files`、`Intake`、`Checks`、`Summary`、`Production Blockers`、`Warnings`、`Recommendations`、`Next Actions`。active shard plan 和 boundary handoff 两个报告也保留原 section 顺序。live read gate plan intake 保留 `Live read gate allowed`、`Runtime probe allowed`、`Active shard prototype enabled` 等 meta 行。

输出等价由 `test/rendererMigrationV2175Parity.test.ts` 负责证明。测试使用 forced historical fixture fallback 和固定 `generatedAt`，调用真实 loader 与真实 renderer，再通过共享 normalizer 计算长度、SHA-256、H1/H2/H3 数量和尾换行。五个 case 的 fingerprint 都来自迁移前输出：`shardReadinessEvidenceConsumption` 长度 6614，`completedShardReadinessEvidenceIntake` 长度 8074，`activeShardPlanEvidenceIntake` 长度 7478，`activeShardPlanBoundaryHandoffIntake` 长度 9666，`liveReadGatePlanIntake` 长度 12558。迁移后这些值保持不变，说明 builder 没有引入隐藏的空行差异或 section 变化。

这里的 parity 是“规范化后的字节等价”，不是降低标准。路径、文件 digest、当前 checkout 的存在性会被 normalizer 折叠，这是为了跨 Windows/Linux 稳定；但标题、section 顺序、meta 标签、业务字段、check 结果、summary、warning 和 recommendation 仍然进入 hash。也就是说，如果迁移时少写了 `Active shard prototype enabled`，或者把 `Evidence Files` 放到错误位置，或者把 `messages` 的空态文案写错，hash 会立刻变。这个响应模型让大批量迁移可以快，但不是靠信任推进，而是靠机械证据推进。

Evidence Files section 是这批响应模型里最容易出错的地方。旧实现常见写法是先构造 `[fileA, fileB, fileC]`，再 `.map()` 成 `- id: exists=...` 这一行。迁移后仍然保留这个局部 `.map()`，只是把结果放进 `lines`。这样做比新增一个专门的 `renderEvidenceFileLine` 更克制，因为当前五个报告的证据文件行已经完全一致，未来如果真要抽取，也应该先观察更多批次是否复用同一种格式。现在最合适的边界是：builder 管 section，renderer 管本报告的文件清单。

## Upstream Evidence / 上游证据

v2175 的上游证据分两类。第一类是项目计划证据：Node final push 要求 N1 继续把 full-report renderer 迁移到 builder，并用 committed census 证明数量减少。v2174 CI 已绿，说明前置红灯清除，允许继续写下一批迁移。第二类是候选 renderer 的只读审计：五个候选文件迁移前都没有 `renderVerificationReportMarkdown` 标记，每个文件只有一个 `.map(` 或一个局部 helper，没有 h3 和 for-loop 复杂形态；对应测试都存在，并且 route 测试覆盖 JSON 与 Markdown 两种入口。

上游项目边界也经过检查。这五个 profile 都明确记录 `startsJavaService: false`、`startsMiniKvService: false`、`stopsJavaService: false`、`executionAllowed: false` 等安全字段，并通过历史 fixture/fallback 读取 Java 与 mini-kv 证据。也就是说，v2175 不需要启动 Java，不需要启动 mini-kv，不会连接 managed audit，不会读取滚动 current 文件来假装历史证据。Java 和 mini-kv 可以按自己的 playbook 并行推进，Node 这批不是它们的前置批准点。

第三个上游证据是 v2174 的 CI 成功：run `28857031600` 在 GitHub Actions 上通过，说明 renderer migration normalizer 的比较面已经稳定。没有这个前置，继续迁移会把 CI 红灯和新功能改动混在一起。v2175 正是在这条 CI 绿线之后开始，所以如果本版出问题，排查范围可以集中在五个 renderer 映射和新 parity test，而不是旧的 `artifactIntakePreflight` 环境漂移。

候选批次的选择也不是只看文件名相近。只读审计确认它们都属于已冻结证据链：v377、v379、v381、v383、v385 这些 Node 版本之间形成连续 intake/verification 链，每一步都只是接收或复核上一步归档，不打开真实 live read，也不把 active shard prototype 切到启用状态。把它们放进同一批，能让讲解和 parity 直接说明“这一段链条的展示层统一了”，而不是把不相干的 renderer 凑成数量。后续如果处理 runtime execution approved local loopback smoke 或 read-only cross-project readiness runner，就应该另开批次，因为那些报告的语义重心和风险面不同。

## Service Flow / 服务流向

运行时服务流没有变。route 收到请求后仍然调用对应 loader，loader 读取 Node 归档、历史 Java/mini-kv fixture 或 fallback 文件，构造 profile；renderer 接收 profile 并输出 Markdown；route 根据 `format=markdown` 返回文本。v2175 只替换 renderer 内部组装字符串的方式，没有改变 loader 输入、profile 类型或 route wiring。对于调用者来说，导出函数名、参数类型和返回值类型都没有变化。

builder 内部的流向很简单：先创建 `# title` 和空行，然后遍历 `meta` 输出 `- Label: value`，再遍历 `sections`。如果 section 是 `entries`，调用既有 `renderEntries`；如果是 `messages`，调用 `renderMessages` 并保留空态文案；如果是 `list`，调用 `renderList`；如果是 `lines`，直接展开传入行。v2175 的五个 renderer 分别把原来手写的 section 映射成这四类。绝大多数是 `entries/messages/list`，Evidence Files 是 `lines`，第一个 renderer 的 shard readiness assessment 也是 `lines`。

这种服务流向的好处是重复逻辑减少，但职责没有混乱。以前每个 renderer 都知道如何插空行、如何放 section 标题、如何处理空 messages；现在这些公共规则只在 builder 里。每个 renderer 只知道自己的报告语义。后续如果需要检查报告结构，reviewer 可以先看 builder，再看每个 renderer 的 spec；不用在几十个手写数组里逐行确认空行规则是否一致。

从维护角度看，新的服务流还有一个隐含收益：reviewer 可以按同一种阅读顺序检查所有迁移后的 renderer。先看 `meta`，确认头部状态字段没有遗漏；再看 `sections`，确认 section 顺序与旧报告一致；最后看每个 `lines` section，确认保留下来的局部格式是否真有领域必要性。这个阅读顺序比旧数组更稳定，因为旧数组里 meta、section 标题、空行和局部 map 混在一起，审查时容易漏掉“某个 section 多插了一行空字符串”这类微差。

## Safety Boundary / 安全边界

第一条安全边界是 byte-identical parity。迁移 builder 时最容易犯的错误是“看起来一样”，但多一个空行、少一个空行、section 顺序轻微变化。v2175 用迁移前 fingerprint 锁住输出，这比人工肉眼对比可靠。尤其这批报告包含大量历史路径和 evidence file 行，肉眼很难看出细小差异；hash 能直接给出结果。

第二条安全边界是不改数据层。loader 中有大量历史 fallback、read-only、execution blocked、active shard prototype 禁止启动等判断。它们是业务安全边界，不属于 renderer consolidation 的修改范围。v2175 不碰这些文件，避免为了渲染重构而影响真实 readiness 结论。renderer 只展示 profile，不重新解释 profile。

第三条安全边界是 builder 不膨胀。通用 builder 只支持少数 section 类型，足够表达当前重复结构。遇到 `renderShardReadiness` 这种领域格式，本版没有把 builder 扩展成知道 shard readiness 的大而全工具。保留局部 helper 可以防止 builder 变成新的巨型文件。AGENTS 里要求不要制造难维护的大文件，这条在 v2175 的取舍里直接体现出来：抽象只覆盖重复框架，不吞并领域细节。

第四条安全边界是后续扩展的停止条件。不要因为 v2175 成功，就把所有 renderer 都机械改成 builder spec。遇到 composition-only renderer，要先判断它是不是只组合其他 renderer；遇到包含复杂局部排序、分组、条件插入的 renderer，要先保留局部 helper，再用 parity 证明输出不变；遇到需要改变报告语义的情况，则不能纳入 N1 consolidation 批次。N1 的目标是消除重复渲染框架，不是借重构机会重新设计报告内容。

## Test Coverage / 测试覆盖

本版已通过第一组 focused gate：`npm run typecheck`，以及包含 v2175 parity 和五个现有 route/loader 测试的 vitest 命令。结果是 6 个测试文件通过、20 个测试通过。现有测试证明 loader、历史 fallback、失败关闭、route JSON 和 Markdown 入口仍然工作；新 parity 测试证明迁移后 Markdown 结构和规范化字节输出保持一致。

census 也已经通过：`npm run renderer:census -- --json --max-unstandardized=36` 输出 total 245、standardized 214、unstandardized 31。这个数字是 N1 的核心机械证据。相比 v2174 后的 209/245，v2175 一次减少五个未标准化 renderer，剩余 shape signals 变为 map 32、flatMap 27、h3 0、forLoop 0。后续批次可以继续按 map/flatMap 家族推进。

提交前还需要补齐 rendererMigration 全家桶、文档质量门、lint、build 和完整 vitest。完整 vitest 会使用受控并发，避免默认 worker 数造成机器压力。推送后 GitHub CI 仍是最终 Linux runner 证明；若 CI 红，必须先修本批问题，再继续下一批，不能把红灯带进新迁移。

下一轮验证还要特别看 lint warning 基线。v2175 理论上会删除四个文件里的 `renderEntries/renderMessages/renderList` 直接 import，只保留 builder import；第一个文件保留 `renderEntries` 是因为局部 helper 仍然需要它。如果 lint 出现 unused import，就说明迁移时没有把旧依赖清干净；如果 parity 通过但 lint 警告增加，则说明代码整洁度没有跟上。这个项目后期更接近生产前治理，验证不只看“功能没坏”，也要看“维护负担是否真的下降”。

这批完成后，后续维护者可以用同一套判断继续拆剩余 31 个 renderer：先问报告是不是完整报告，再问重复的是框架还是领域行，最后用 parity 和 census 双重证明。只有这三个问题都有证据，迁移才算真正减少维护成本，而不是把手写数组改写成另一种难读结构。

## One-sentence Summary / 一句话总结

v2175 把五个只读 shard readiness intake renderer 收敛到 `renderVerificationReportMarkdown`，用 parity hash 和 census 证明输出不变、标准化数量从 209/245 提升到 214/245，同时保留局部领域 helper，避免通用 builder 膨胀。
