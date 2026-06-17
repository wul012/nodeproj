# v2147 renderer consolidation batch 29 代码讲解

## Target And Non-target / 目标与非目标

v2147 的目标，是在 v2146 已经证明“紧凑 h3/flatMap 报告可以通过 builder spacing control 保持字节等价”的基础上，继续推进同一个 controlled-read-only-shard-preview live-read-only-window 家族。v2146 迁移到 evidence packet 为止，刚好覆盖了从 stage ledger、runbook、command worksheet 到 evidence packet 的手工窗口前半段；v2147 接着处理 evidence intake ledger、evidence intake review package、manual evidence entry worksheet、operator evidence import preflight、operator evidence value draft。它们都是同一条人工只读窗口证据流的后续节点，形态稳定：标题、meta、`## Gates`、`###` 子条目列表、`## Blocked Reasons`。

本版另一个目标是把重复的 blocked reason 行渲染从各个 renderer 中收束出来。v2146 为了保守，每个已迁移的紧凑 renderer 都保留了本地 `renderBlockedReasons` helper。这个做法在第一版验证 spacing control 时合理，因为它让风险局限在单个文件；但继续迁移时，如果每个 renderer 都复制一份 `blockedReasonCodes.length === 0 ? ["- none"] : ...`，共享 builder 的维护价值就会被重复 helper 稀释。v2147 因此在 `verificationReportBuilder.ts` 里新增 `renderVerificationBlockedReasonLines`，并把 v2146 受影响的四个 renderer 和本版五个 renderer 都改成复用它。

非目标同样明确。本版不新增 route，不改 controlled shard preview 的 profile 字段，不改变 Java/mini-kv evidence 读取，不启动上游服务，不把只读窗口推进成真实执行。它也不试图把 `renderSlot`、`renderControl`、`renderEntry` 这些领域 helper 泛化成一个巨大条目 builder，因为这些 helper 的字段顺序与具体证据语义强绑定。当前更好的工程边界是：外层报告骨架共享，局部领域行仍保留在各自 renderer。

## Entry Points / 入口

本版的共享入口仍然是 `verificationReportBuilder.ts`。新增的 `renderVerificationBlockedReasonLines` 很小，但它是一个重要的维护标记：紧凑报告里的 blocked reason section 不再由每个 renderer 自己解释，而由 builder 工具层统一解释。它输出两种形态：空数组变成 `["- none"]`，非空数组变成每个 reason 一行 `- REASON_CODE`。这正好匹配 controlled-read-only-shard-preview 族旧 renderer 的字面输出。

新迁移的五个 renderer 分别对应人工证据入口链的五个阶段。`EvidenceIntakeLedgerRenderer` 把 evidence packet 中的记录转成可导入 ledger；`EvidenceIntakeReviewPackageRenderer` 把 ledger 的 gates 和 entries 转成 operator review controls；`ManualEvidenceEntryWorksheetRenderer` 把 review package 转成手工填值 worksheet；`OperatorEvidenceImportPreflightRenderer` 对 worksheet slot 做导入前检查；`OperatorEvidenceValueDraftRenderer` 生成 operator evidence value draft。它们不是孤立文件，而是同一个 live-read-only-window 证据输入链条，所以放在同一版迁移，审阅者可以沿着数据流理解本版的价值。

## Response Model / 响应模型

五个 renderer 的输出模型都保持不变。每个报告顶部仍然是 `# Controlled read-only shard preview ...` 标题，然后是若干 `- Label: value` 元信息。重要计数如 `Entry count`、`Control count`、`Slot count`、`Passed gates`、`Contains secret value`、`Imports runtime payload`、`Accepts synthetic evidence` 都保留原标签和原顺序。`Passed gates` 继续用 `${passedGateCount}/${gateCount}` 拼成字符串，不让 `formatValue` 或 JSON 序列化改变展示。

中间 section 也保持旧形态。`## Gates` 使用 `renderEntries` 生成 `- key: value` 行；`## Entries`、`## Controls` 或 `## Slots` 使用本地 helper 生成大量 `### order.nodeVersion.code` 子块；`## Blocked Reasons` 使用新的共享 helper 生成相同的空态或 reason 列表。所有这些 section 都显式设置 `bodyLeadingBlankLine: false`，报告级设置 `trailingNewline: false`，因为旧 renderer 的这些紧凑输出就是合同的一部分。

本地 helper 的保留尤其关键。比如 evidence intake ledger 的 `renderEntry` 需要按顺序展示 preserved required fields、acceptance criteria、redaction rule、operator input instruction、missing input policy、capture input state 等字段；operator evidence value draft 的 `renderSlot` 需要展示 draft value state、actual value state、draft normalizer/redaction/import block/missing value policy 等字段。如果把这些字段塞进一个过宽的通用 entries-array builder，短期看似减少代码，长期会让领域顺序和审计含义变得不透明。

## Upstream Evidence / 上游证据

v2147 没有读取新的 Java 或 mini-kv 文件，也没有依赖 sibling 项目完成新版本。当前 Java 和 mini-kv 工作树在外部会话中都有未提交变化，Node 本版刻意不触碰它们。对 Node 来说，本版输入来自本仓库内的 TypeScript artifact builder 和测试 fixture。`readySourceMatrix()` 构造 ready 状态，然后链式生成 execution gap matrix、candidate、verification、stage ledger、runbook、rehearsal、command worksheet、evidence packet、intake ledger、review package、manual worksheet、import preflight、value draft。所有渲染输入都来自这个本地 fixture 链。

这个边界能避免把 sibling 项目的推进状态误判成 Node 的前置条件。Java 可以继续做 ops package extraction，mini-kv 可以继续做 CMake/测试治理；Node 本版只证明自己的 renderer 拼装逻辑更集中、更可验证。若后续版本真正要消费 Java/KV 新证据，必须在计划里写清楚需要的 tag、文件路径、fallback fixture 和验证命令，而不是因为 sibling 工作树有变化就默认可以接入。

## Service Flow / 服务流

服务流的第一段是 artifact 构造。测试脚本从 ready source matrix 开始，生成一条完整的 live-read-only-window 证据链。这个链条本身体现了项目的生产前治理逻辑：先确认 controlled read-only shard preview 的源矩阵，再生成候选包和验证，再落到 stage ledger/runbook/worksheet/evidence packet，最后进入 operator evidence 的 intake、review、manual entry、import preflight、value draft。v2147 迁移的五个 renderer 正好处在后半段，说明本版不是随机挑文件，而是沿着业务证据流推进。

第二段是 renderer 拼装。旧 renderer 通过数组手写每一行，然后 `join("\n")`。新 renderer 把标题和 meta 交给 `renderVerificationReportMarkdown`，把 `Gates`、`Entries/Controls/Slots`、`Blocked Reasons` 作为 compact `lines` section 传入。对于 `Blocked Reasons`，本版不再复制本地 helper，而是调用 `renderVerificationBlockedReasonLines`。这让代码读起来更像一张表：哪些字段属于 meta，哪些段落属于 body，哪些局部行仍由领域 helper 负责。

第三段是字节验证。迁移前，临时脚本 `.tmp/v2147-renderer-hashes.ts` 记录九个受影响报告的长度和 SHA-256：四个 v2146 renderer 因 helper 收束受影响，五个 v2147 renderer 因迁移受影响。迁移后，同一脚本用 `--compare` 重新渲染并比对。结果 `mismatches: []`，说明 helper 收束和五个新迁移都没有改变任何输出字节。这个验证覆盖了字段顺序、空行、末尾换行、`- none` 空态以及所有 h3 子块。

## Safety Boundary / 安全边界

v2147 的安全边界首先是运行时边界。所有改动都在 renderer 和 builder 层，没有改 Fastify route、client、config、access guard、audit store 或 upstream action gate。也就是说，这一版不会影响 `/api/v1/...` 路由是否可访问，不会改变 Java 或 mini-kv 调用条件，不会让原本被 `UPSTREAM_ACTIONS_ENABLED=false` 阻挡的行为变成允许。它也不会改变任何 profile 的 JSON 字段，因为 renderer 只处理 Markdown 输出。

其次是格式边界。`renderVerificationBlockedReasonLines` 只替代重复代码，不改变语义。它没有把 blocked reason 当作 `list` section，因为 `list` section 的空态会渲染成 `- <emptyText>`，需要传入不同文案；旧 controlled shard preview 报告的固定空态是 `- none`。把它做成专门 helper，能避免每个 renderer 手写，也避免误用普通 list 造成细微格式漂移。

第三是维护边界。v2147 没有把每个 `renderSlot` 进一步抽象，是因为这些 slot 字段不是纯展示数据，而是证据链的操作说明、验证规则、缺失值策略和安全边界。保持本地 helper，能让维护者打开某个 renderer 时直接看到该阶段的领域含义；使用 builder 只收拢重复外壳，避免把项目推向“所有东西都进一个万能渲染器”的反方向。

## Maintenance Payoff / 维护收益

v2147 的维护收益不是减少几行代码这么简单，而是把后续迁移的判断规则固定下来。以后遇到同类 renderer，审阅者可以先看三个问题：第一，报告是否是标题、meta、Gates、h3 列表、Blocked Reasons 的紧凑结构；第二，局部 h3 helper 是否包含领域字段顺序，是否应该保留为 `lines`；第三，blocked reasons 是否就是 `- none` 或 reason code 列表。如果三个答案都成立，就可以复用 v2147 的迁移模板，而不用重新发明一套写法。

这个收益对 controlled-read-only-shard-preview 族尤其明显。这个家族的文件名很长、阶段很多、字段也很相似，如果每个 renderer 都保留手写外壳，维护者很难一眼分辨差异到底在业务字段还是拼装样板。迁移后，外层样板基本统一，真正值得审阅的是 meta 字段是否完整、slot/control/entry helper 是否保持原字段顺序、hash 是否证明输出未变。换句话说，代码的“噪音层”变薄了，领域层更突出。

共享 blocked-reason helper 还有一个长期好处：它减少了错误修复的分叉点。假如未来发现 controlled shard preview 族 blocked reason 的空态需要统一说明，维护者可以在一个 helper 上做计划内格式迁移，而不是搜索几十个本地 helper。当前版本没有做这个格式迁移，只是把现有行为集中表达出来；但集中表达本身让未来变更的影响面更可控，也更容易写测试。

## Review Checklist / 审阅清单

审阅 v2147 时，最重要的不是看“用了 builder”这件事，而是看迁移是否遵守四条约束。第一，meta label 必须逐字保留，例如 `Ready for manual evidence entry`、`Imports runtime payload`、`Contains secret value` 不能改大小写、不能换词。第二，计数字段的展示必须保持原来的字符串形态，尤其是 `Passed gates: x/y`，不能让布尔或数字格式化改变人工阅读习惯。第三，h3 helper 的字段顺序必须保留，因为这些字段代表人工证据入口的操作顺序和安全边界。第四，报告末尾和 section 空行必须按旧输出保留，所以所有紧凑 section 都显式设置 `bodyLeadingBlankLine: false`，报告设置 `trailingNewline: false`。

如果这些约束满足，再看测试。focused tests 证明领域对象仍然构造正确、关键 Markdown 片段仍然存在；hash 比对证明完整输出没有变化；typecheck 证明类型层没有漏字段；ratchet 证明没有通过新增服务或路由绕开治理限制。四类证据合在一起，才构成这个版本的可信收尾。

## Test Coverage / 测试覆盖

测试分三层。第一层是 builder 单测，新增对 `renderVerificationBlockedReasonLines` 的覆盖：空数组返回 `- none`，非空数组返回每个 reason code 的列表。这是对共享 helper 合同的直接保护。

第二层是 focused renderer tests。本版运行了 builder 单测、四个 v2146 受 helper 影响的 renderer 测试，以及五个 v2147 新迁移 renderer 测试，共 10 files / 42 tests passed。这些测试覆盖 stage ledger、runbook、command worksheet、evidence packet、evidence intake ledger、review package、manual worksheet、import preflight 和 value draft 的关键数量、ready/blocked 状态、read-only/writes-allowed/automatic-service-start 等安全断言，以及 Markdown 中关键标题和 h3 条目。

第三层是迁移专用 hash 比对。这个比对比 `toContain` 更强，因为它证明九个完整 Markdown 输出没有任何字节差异。记录的 hash 包括 evidence intake ledger `601aa353...`、review package `c9b0ba0b...`、manual worksheet `d05f820e...`、operator evidence import preflight `ed67a0b...`、operator evidence value draft `d0f2f905...`。这些值写入 summary，临时脚本和 baseline 在收尾清理中删除。

这套测试还有一个实际价值：它把“旧文件也受影响”的事实纳入验证。v2147 不只是迁移五个新 renderer，还把 v2146 的四个 renderer 从本地 helper 改成共享 helper。如果只跑新文件测试，就会漏掉这四个旧文件的风险；如果只看 TypeScript 类型，也无法发现 Markdown 空行变化。把九个输出一起做 hash，说明本版没有把“优化旧代码”变成未验证的顺手改动。

## Next-version Direction / 下一版本方向

v2148 可以继续沿同一族推进。最自然的候选是 operator evidence fresh sibling intake、value supply envelope、approval packet draft、approval packet review、signed approval template 附近的 renderer。它们仍然是 h3/map/flatMap 形态，已有相邻测试和 fixture 支撑，并且可以复用 v2146/v2147 的 spacing control、blocked reason helper、临时 hash 比对流程。

推进时需要保持一个节奏：每版迁移 4 到 6 个同族文件，优先选输出形态一致、测试覆盖明确、fixture 构造链相同的 renderer。不要一次横跨多个报告族，否则 hash 脚本会过长、验证说明会变散，代码讲解也会难以聚焦。等 controlled-read-only-shard-preview 族的紧凑报告完成一批后，再考虑是否存在可抽象的 slot/control/record 行渲染模式。

下一批还有一个风险：越往 value supply 和 signed approval 方向走，字段会从“证据入口状态”逐渐转向“批准材料草稿”和“人工签名捕获”。这些字段虽然仍然只是 Markdown renderer，但审阅语义更接近真实批准前置条件。迁移时必须继续保持“不生成批准、不伪造批准、不改变人工输入状态”的边界，只能移动渲染外壳，不能把任何 pending/manual/blocked 状态解释成 ready。这个提醒写在这里，是为了让 v2148 不因为代码形态相似而忽略领域风险。

还有一个维护细节值得提前固定：后续如果某个 renderer 同时出现“字段清单、人工动作、失败原因、签名草稿”四类内容，不要急着再扩展 builder 的参数面。应该先看这些内容是否只是同一 report section 内的普通行；只要是普通行，就继续由调用方组装 lines，让 builder 负责标题、空行和 section 顺序。只有当多个 renderer 反复出现同一种可命名结构，并且这种结构本身有稳定语义时，才把它提升成共享 helper。这样可以避免把 builder 变成领域模型，也能让每次迁移的风险仍然停留在可 hash 比对的字符串边界内。

## Cross-project Position / 跨项目位置

Java 和 mini-kv 推荐并行。本版没有读取它们的新版本产物，没有改跨项目 schema，没有启动服务，也没有要求它们提供真实批准。Java/KV 当前有未提交工作树，Node 只观察到这个状态并避开它们。后续如果用户要求三项目总览，再分别检查它们的提交、测试和归档；但 Node v2147 本身不依赖这两个项目。

## One-sentence Summary / 一句话总结

v2147 把 controlled-read-only-shard-preview live-read-only-window 证据入口链的后续五个紧凑 h3/flatMap renderer 接入共享 builder，并用共享 blocked-reason helper 和九份输出 hash 证明重构没有改变任何 Markdown 字节。
