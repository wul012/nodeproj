# v2162 代码讲解：把 execution readiness 完整文档迁移到 verification report builder

## Goal and Non-goal / 目标与非目标

v2162 继续推进 N1 renderer consolidation，但目标类型和前几版不同。v2159 到 v2161 迁移的是 controlled read-only shard preview route 中的 section 片段，适合 `renderProfileEntrySections`；v2162 面对的是 execution readiness renderer，它输出三份完整 Markdown 文档，每份都有自己的 H1、meta 区和若干二级 section。因此本版的目标不是继续套用 profile-section helper，而是把这类完整文档迁移到 `renderVerificationReportMarkdown`，让 H1、meta、section 拼装进入已有通用 builder。

这版的非目标很明确：不改 execution gap matrix 的构造，不改 live read-only packet candidate 的 process plan，不改 read target，不改 verification gates，不改 blocked reasons，不改 route 或 schema，也不启动 Java / mini-kv。它不让系统更接近真实执行，只让现有 readiness 文档的渲染方式更统一。由于这三份文档是后续 live read-only window 的人工准备材料，任何换行、标题或列表变化都可能影响 reviewer 对历史归档的比对，所以 byte-identical 是硬门。

选择这个文件有两个工程原因。第一，它在剩余 renderer 中有真实复杂度：3 个函数、3 份文档、3 种尾部换行规则、多个 `flatMap` 展开的三级段落。第二，它能补上一个抽象边界：不是所有 renderer 都应该迁移到 profile-section helper。把完整文档放到 verification report builder，能让后续遇到类似 H1/meta/section 形状的 renderer 时有更合适的范式。

## Entry Points / 入口与调用关系

本版涉及三个导出入口：`renderControlledReadOnlyShardPreviewExecutionGapMatrixMarkdown(matrix)`、`renderControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateMarkdown(candidate)`、`renderControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerificationMarkdown(verification)`。它们由 execution readiness artifacts 测试覆盖，也服务于 controlled read-only shard preview 的 readiness 归档材料。每个入口都返回完整 Markdown string，而不是 `string[]` section 片段。

三个入口的职责不同。execution gap matrix 展示 Node、Java、mini-kv 和 production 范围的 readiness gates；candidate 展示手动 live read-only window 的 process plan 和 read targets；verification 展示候选包是否满足手动只读窗口前置条件、归档了哪些 section、还有哪些 blocked reasons。迁移后这些职责没有合并，仍保持三个函数，避免为了“统一”把不同文档揉成一个大 renderer。

调用关系也说明为什么不能使用前几版的 section helper。`renderProfileEntrySections` 只会生成 `##` section，不负责 H1 和 meta 区；而这三份文档都以 `# Controlled read-only...` 开头，并在第一个 `##` 前有一组关键 meta 行。`renderVerificationReportMarkdown` 正好覆盖这种形状：title、meta、sections、trailing newline 策略都能由调用方明确声明。

## Response/Data Model / 响应与数据模型

输入对象来自 `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.ts`。matrix 由 source matrix 与几个安全开关构造，包含 8 个 readiness gate；candidate 基于 matrix 生成 4 个 process step、6 个 read target 和 9 个 checks；verification 基于 candidate 生成 7 个 gates、archived sections 和 blocked reason 列表。renderer 不重新计算这些值，只把它们投影成 Markdown。

输出模型是三个独立 string。迁移前固定 hash 为：matrix `52e60c2197a3b606a9f9d1b453b87213a41b66a2469cf69796b8ffca47937626`，candidate `8175275766aa9c72c4109917005ac5d2c6fd1d7cf06d1f4fd6bb79630220449e`，verification `54cf9bf7bbe13af599a56b48a6b567981434516832301fda5a6746ac01a45ea8`。迁移后这三个 hash 和长度都保持不变，说明 builder 没有改变标题、空行、列表、三级 gate 或尾部换行。

这里最容易忽略的是尾部换行。matrix 和 candidate 的旧输出都以换行结尾，因为最后一个 gate 或 read target block 后面保留了空行；verification 的旧输出不以换行结尾，因为最后是 blocked reasons 列表，没有尾部空字符串。本版在 builder 调用中分别处理：前两份使用默认 trailing newline，verification 显式关闭 trailing newline。这个差异被测试固定下来，避免未来统一格式时误改归档字节。

## Upstream Evidence / 上游证据与配置边界

本版的 fixture 来自 `readySourceMatrix()` 和 execution readiness artifact builders。Java 与 mini-kv 没有被真实启动，也没有通过网络读取；它们只是 source matrix 中已经准备好的只读证据形状。candidate 中会列出 Java read-only service、mini-kv read-only service、SHARDJSON、SHARDROUTEVERIFYREPORTJSON 等 target，但这些只是计划文本，不代表本版真的执行了这些命令。

这条边界必须保持清楚。execution readiness 文档是下一阶段 live read-only window 的准备材料，不是 live integration 的完成证据。v2162 可以说“三份准备文档的 renderer 已标准化且输出不变”，不能说“三项目已经真实联合执行”。真正的联合执行仍要等 integration capstone：明确进程 owner、端口、启动/停止责任、只读命令和 no-write boundary。

Java 和 mini-kv 因此可以继续并行推进。v2162 没有要求它们提交新文件、改契约或提供 fresh evidence。Node 只是治理自己的 Markdown renderer 和测试门。若后续需要 fresh sibling evidence，计划书必须写清所需 upstream 版本和证据路径；本版没有跨那条线。

## Service Flow / 服务流程与等价路径

运行路径先由 artifact builder 构造 matrix，再由 matrix 构造 candidate，最后由 candidate 构造 verification。renderer 层只接受这三个对象。迁移后，每个函数调用 `renderVerificationReportMarkdown`：title 映射到 H1，meta 映射到 H1 下的 bullet list，sections 映射到 `##` 块。section 内部如果旧输出没有空行，就设置 `bodyLeadingBlankLine: false`，保证 `## Gates` 后面紧跟 `### CODE` 或 `- key: value`。

matrix 的 Gates section 仍通过 `renderExecutionGapMatrixGateLines` 展开每个 gate，保留 `### gate.code`、scope、state、severity、evidence、next action、两个 blocking flag。candidate 的 Checks section 使用 builder 的 entries 分支，Process Plan 和 Read Targets 保留原来的 flatMap 模板。verification 的 Gates 使用 entries，Archived Sections 和 Blocked Reasons 使用 list 分支，其中 empty text 仍是 `none`。

这版还引入了 `trimVerificationTrailingBlankLine` 的必要使用。旧 Process Plan / Read Targets 每个 item 后都有空行，但在交给 builder 后，section 之间的空行由 builder 插入；如果不裁掉 section body 的末尾空行，就会多出一个空白行。matrix gate lines 也一样，需要先去掉最后一个空行，再由 builder 的默认 trailing newline 补回文档结尾。这个处理是本版 byte-identical 的关键。

## Builder Selection / Builder 选择理由

本版最重要的设计判断不是“把数组拼接代码换成 helper”，而是选对 helper。前几版迁移的 renderer 大多服务于 HTTP route 的 Markdown 片段，调用方已经负责外层页面标题，因此 renderer 只需要生成若干 `##` 块；这类形状用 `renderProfileEntrySections` 很自然。v2162 的三个函数不同，它们本身就是可归档的完整文档：第一行是 H1，紧接着是 matrix version、state、generatedAt、source 等 meta 行，然后才进入 `## Gates`、`## Checks` 或 `## Archived Sections`。如果硬用 route-section helper，就必须在 helper 外面再手写 H1 和 meta，结果只是把旧拼接拆成两段，没有真正收敛重复结构。

`renderVerificationReportMarkdown` 的优势在于它把“完整报告”的骨架显式化。title、meta、sections、trailing newline 都是参数，调用点能一眼看出旧文档的外壳结构；真正有业务含义的行仍留在本 renderer 中，例如 gate 的 evidence、next action、blocking flags。这样抽象不会吞掉领域语义，只接管报告通用格式。后续 reviewer 如果怀疑输出漂移，也可以从参数直接定位：标题错看 title，meta 顺序错看 meta array，section 空行错看 `bodyLeadingBlankLine` 和 trimming，而不必在多层 string push 中搜索。

这个选择也给剩余 58 个未标准化 renderer 留下了可复用的判断标准。只要文件输出完整归档文档，并且标题、meta、section 边界清楚，就优先尝试 report builder；如果文件只是组合其它 renderer 的结果，或者只是把多个已经标准化的片段塞进 route response，就不应该为了数字迁移而加一层无意义包装。v2162 的价值在于把抽象边界画清，而不是把 helper 数量做少。

## Equivalence Risks / 等价风险拆解

这类迁移的风险集中在“肉眼不容易注意、hash 会立刻发现”的地方。第一是 H2 后的空行。很多 Markdown 写法会在标题后空一行，但旧输出里 `## Gates` 后面直接跟 `### gate`，如果 builder 默认插入空行，文档语义看似没变，字节已经变了。第二是 section body 末尾空行。旧 renderer 用 `flatMap` 时常在每个 block 后追加 `""`，交给 builder 后如果不修剪，section 间会出现双空行。第三是文档末尾。matrix 和 candidate 的旧结果带最后换行，verification 不带；统一成一种风格会破坏历史归档。

v2162 没有把这些风险交给人工肉眼检查，而是把它们变成测试条件。三个 SHA-256 覆盖整份字符串，trailing newline 断言覆盖末尾差异，census ratchet 覆盖迁移计数，focused test 覆盖 artifact builder 与 renderer 的组合路径。这样 reviewer 不需要逐行比较三份长 Markdown，只要看到 hash 未变，就知道标题、meta、空行、列表、三级 gate 和尾部换行都没有漂移。

还有一个风险是“语义顺手修正”。execution readiness 里有一些文本看起来像可以优化，例如 blocked reasons 的措辞、manual start 的说明、candidate target 的顺序。但本版是 renderer consolidation，不是 readiness policy 更新；一旦顺手改文本，就无法再证明迁移纯粹，也会把后续 live-read-only gate 的 review 混在一起。因此本版只允许改渲染外壳，不允许借重构修改 readiness 事实。

## Safety Boundary / 安全边界与只读性质

v2162 只修改 Node 本地 renderer、execution readiness artifacts 测试、census baseline 和版本材料。它不改 readiness artifact builder，不改安全开关，不改 approval ledger，不改 runtime shell，不改 route registration，不启动 Java 或 mini-kv。测试只在本地进程中构造对象和渲染字符串，没有外部副作用。

安全边界还体现在文档语义上。candidate 文档描述的是“手动 live read-only window 候选包”，其中 process plan 明确 manual service start required，但 renderer 本身不会启动服务。read target 文档会列出 HTTP/TCP target，但测试不会连接这些 target。verification 文档会说 production execution 仍 blocked，但这是 artifact builder 给出的状态，renderer 不做新的安全判断。

保持这个边界可以防止治理代码误膨胀。renderer 的职责是忠实呈现准备材料，不是执行准备材料。后续如果要真的启动服务、读 Java endpoint 或执行 mini-kv command，必须走专门的 integration capstone 和清理规则，不能在 renderer 迁移中顺手打开。

## Test Coverage / 测试覆盖与机械门

本版增强了 `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.test.ts` 的 stable markdown 测试。它现在不仅检查标题和关键文本，还断言三份文档的 SHA-256、长度相关结构和 trailing newline 差异。matrix 与 candidate 必须以换行结尾，verification 必须不以换行结尾。这样空行漂移会直接失败，而不是被 `contains` 放过。

focused gate 使用 `npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.test.ts test/rendererCensusScript.test.ts --maxWorkers=2`，2 个 test file、6 个测试通过。输出中的 `Renderer census regression: 58 exceeds --max-unstandardized=57` 是反向门预期 stderr，证明 ratchet 会在未标准化数量回升时失败。

随后运行 `npm run renderer:census -- --json`，得到 245 total、187 standardized、58 unstandardized、remaining shape signals 为 h3 25、forLoop 0、map 68、flatMap 42。`npm run renderer:census -- --max-unstandardized=58`、`npm run typecheck`、`npm run lint`、`npm run build` 均通过。lint 仍是既有 0 error / 263 warning。

## Failure Modes / 失败模式与排查顺序

如果未来这个测试失败，排查顺序应该从输出形状开始，而不是先怀疑业务逻辑。hash 失败但关键 `contains` 仍通过，通常意味着空行、meta 顺序、section 顺序或尾部换行漂移；先打印三份 Markdown 的 length、最后几个字符和标题附近片段，能最快定位。matrix hash 失败时重点看 `renderExecutionGapMatrixGateLines`，candidate hash 失败时重点看 Process Plan 与 Read Targets 的 trimming，verification hash 失败时重点看 `trailingNewline: false` 和空列表 `none` 的写法。

如果 census test 失败，要区分两种情况。第一种是标准化数量下降，说明某个已迁移 renderer 又出现了旧式拼接信号，应优先恢复 builder 路径。第二种是标准化数量上升，说明有人又迁移了 renderer，但没有同步更新 census baseline 和版本证据；这不是坏事，但必须带上对应解释、hash 或结构测试，不能只改数字。v2162 把反向门也保留在测试中，就是为了防止 census 成为手动填写的进度表。

如果 build 或 typecheck 失败，最可能是 builder 参数类型不匹配，例如把 `lines` 和 `entries` 混用，或者 section body 传入了含 `undefined` 的数组。此时不要回退到手写拼接，而应该把输入先整理成明确的 string array。renderer consolidation 的目标不是少写几行代码，而是让形状可读、类型可查、输出可证。

## Version Slicing / 版本切片理由

v2162 没有继续塞入第二个 renderer，是有意的切片选择。execution readiness renderer 一次迁移三份完整文档，且引入了 full-document builder 路线；它的验证工作量已经覆盖 pre/post hash、focused artifacts、census、typecheck、lint、build 和中文讲解。若同版再迁移 live-read-only window rehearsal renderer，两个不同输出族的风险会混在一起，reviewer 很难判断某个 hash 或 census 变化来自哪个文件。

这个版本也没有推进真实分片联合执行。原因不是不重要，而是它属于不同层级的工作：真实执行需要启动 Java jar、执行 mini-kv CLI、管理端口和进程、验证 no-write boundary，并在失败时保留可复现日志；renderer consolidation 只要求字符串等价和维护性收敛。把两者混在一个版本里，会让 cleanup、证据路径和失败责任都变得不清楚。工程后期越接近生产，越需要把可验证的小边界切稳，而不是在一个大提交里追求戏剧性。

因此本版的“中等工作量”体现在深度而非广度：选了一个完整文档类 renderer，建立了 helper 分流规则，补了三份强 hash 门，更新了 census ratchet，并写清楚 parallel planning。它给下一版留下清楚路径：继续迁移同类 full-document renderer，或者在计划书允许的检查点之后转入 N5 file-size health；但无论哪条路，都应继续保持“一个版本能被机械验证、能被人读懂、能被回滚”的粒度。

## Maintenance Notes / 后续维护提示

v2162 给后续剩余 renderer 一个重要分流标准：如果目标输出是 route 内部 `string[]` section，优先考虑 `renderProfileEntrySections`；如果目标输出是完整 Markdown 文档，优先考虑 `renderVerificationReportMarkdown` 或 release report helper。不要为了“统一”把所有 renderer 都塞进同一个 helper。抽象边界和输出形状要匹配。

后续候选中，live read-only window rehearsal renderer 也像完整文档，可能适合沿用 v2162 的路线；minimal integration、Java/mini-kv runtime execution 一批 renderer 则要逐个判断是完整文档、section 片段还是 composition-only。composition-only 文件继续不要拿来凑数，除非先建立 waiver 或合并策略。

维护 hash 测试时也要看变更类型。如果只是 renderer 迁移，hash 必须不变；如果 artifact builder 的业务字段变了，hash 可以变，但必须在对应业务版本解释字段来源和输出差异。本版的价值就是把 renderer 迁移和业务输出演进分开，让 reviewer 知道什么时候该看结构，什么时候该看产品语义。

## One-sentence Summary / 一句话总结

v2162 把 controlled read-only shard preview execution readiness 的三份完整 Markdown 文档迁移到 verification report builder，并用三份 SHA-256、census ratchet、typecheck、lint 和 build 证明这次重构只统一渲染外壳，没有改变准备材料内容或跨项目契约。
