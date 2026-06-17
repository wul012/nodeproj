# v2146 renderer consolidation batch 28 代码讲解

## Target And Non-target / 目标与非目标

v2146 的目标，是把 v2144 之后真正剩下的复杂 renderer 迁移路线打开。v2144 已经把最后一个纯标准 renderer 接入 `verificationReportBuilder`，v2145 又把文档质量门禁修到绿色，所以本版不能继续挑“已经容易”的文件，也不能只写文档收尾。真正的问题是：剩余 renderer 大多带 `###` 子标题、`map`、`flatMap` 或手写循环，它们不是简单的 `entries/messages/list` 四段式。如果直接把它们塞进现有 builder，会遇到两个输出细节：有些旧 renderer 在 `## Gates` 后面没有空行，有些报告末尾没有最终换行，而 builder 原先固定在 section heading 后插空行，并固定在报告末尾追加空字符串。这个差异看起来只是排版，但本计划的硬规则是 byte-identical，哪怕只多一个换行，也不能算迁移成功。

因此，本版选择的工程路线不是“给每一种 h3 行都发明新 section 类型”，也不是“修改测试预期接受新格式”，而是在共享 builder 上加两个很小但精确的输出控制：`bodyLeadingBlankLine` 和 `trailingNewline`。默认行为保持不变，让 v2114 到 v2145 已迁移的 122 个 builder-backed renderer 不受影响；只有需要保留紧凑旧格式的 renderer 才显式设置 `false`。这是一种向后兼容的扩展，它解决的是 renderer 迁移的格式表达能力，而不是新增报告业务语义。

本版非目标也必须说清楚。它不改变任何 managed-audit、controlled shard preview 或 production readiness 的业务字段；不改变路由路径；不新增服务；不读取 Java 或 mini-kv 的新证据；不启动上游；不把真实 shard preview 推进到执行阶段。它只是把五个只读 Markdown renderer 的外层拼装从手写数组切换到共享 builder，并证明切换前后的输出字节完全一致。换句话说，v2146 是 renderer 治理版本，不是功能开闸版本。

## Entry Points / 入口

本版的共享入口是 `src/services/verificationReportBuilder.ts`。这个文件原来提供 `renderVerificationReportMarkdown`，接收 `title`、`meta` 和 `sections`，再统一输出 `# 标题`、若干 `- Label: value` 元信息，以及多个 `## Section` 段落。原来的 `VerificationReportSection` 支持四类 body：`entries`、`messages`、`list` 和 `lines`。其中 `lines` 是 v2144 首次用于复杂内容的逃生口，可以把本地 helper 渲染出的字符串数组直接交给 builder。

v2146 在这个入口增加了一个小的基础结构 `VerificationReportSectionBase`，里面有 `heading` 和可选的 `bodyLeadingBlankLine`。这样四类 section 都自然继承同一组选项，不需要在每个 union 分支重复声明。`VerificationReportSpec` 又增加了 `trailingNewline?: boolean`。渲染时，builder 先输出空行和 `## heading`；如果 `bodyLeadingBlankLine !== false`，继续输出一个空行；最后输出 section body。报告结束时，如果 `trailingNewline !== false`，保留旧行为追加空字符串。默认值都选择旧 builder 行为，所以未设置这些选项的旧迁移文件仍然得到同样的 Markdown。

五个被迁移的 renderer 是第二层入口：`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogRenderer.ts`、`...LiveReadOnlyWindowStageLedgerRenderer.ts`、`...RunbookRenderer.ts`、`...CommandWorksheetRenderer.ts` 和 `...EvidencePacketRenderer.ts`。它们代表 controlled-read-only-shard-preview 族里比较典型的复杂报告：有大量 meta，有 `## Gates`，有 `### 1. Node v...` 形式的行内子条目，也有 `Blocked Reasons` 空态。它们不是最难的 renderer，但足够覆盖 h3/flatMap/紧凑 spacing 这三个后续迁移绕不开的问题。

## Response Model / 响应模型

从输出模型看，本版没有改变任何响应字段。每个 renderer 仍然输出纯 Markdown 字符串。Type module catalog 的模型是：标题、catalog version、public entry point、module count、stable re-export module count、stop condition，然后一个 `## Modules` 段落，段落内由 `renderTypeModuleEntry` 生成 220 个 `### order.id` 子块。这个文件原本在 `## Modules` 后有空行，末尾也有换行，所以迁移时只需要用默认 builder 行为，`sections` 里传入 `{ heading: "Modules", lines: catalog.entries.flatMap(renderTypeModuleEntry) }`。

Stage ledger、runbook、command worksheet 和 evidence packet 的模型更紧凑。它们的 `## Gates` 后面原本没有空行，`## Stages`、`## Sections`、`## Steps`、`## Records` 也是直接跟第一行内容。它们的最后一个 section 是 `Blocked Reasons`，旧 renderer 数组末尾没有额外空字符串，所以最终字符串没有 trailing newline。为了保持这个模型，迁移后的 spec 都设置 `trailingNewline: false`，并且每个 section 都设置 `bodyLeadingBlankLine: false`。这样 builder 仍然负责标题、meta、section 顺序和拼接，但不会偷偷改变旧报告的空行形状。

被保留的本地 helper 也很重要。`renderStage`、`renderSection`、`renderStep`、`renderRecord` 和 `renderTypeModuleEntry` 没有被拆掉，因为它们承载的是每个子条目的领域字段顺序，例如 owner、target、required evidence、cleanup、read-only、writes allowed、automatic service start、required fields、acceptance criteria。把这些 helper 保留在文件内，可以让这次迁移只改变“外层报告骨架”，不改变“领域条目怎么写”。这符合 playbook 的模式表：复杂局部 helper 可以原样保留，并作为 `lines` section 传给 builder。

## Upstream Evidence / 上游证据

v2146 不消费新的 Java 或 mini-kv 上游证据。开工前做了一个三项目快照检查：Node HEAD 仍在 v2145，Java 最新可见提交为 `c2974050` / `v1807-order-platform-production-excellence-ops-operator-evidence-value-draft-extraction`，mini-kv 最新为 `v1622`。Java v1807 从提交说明看是 operator-evidence-value-draft registry 的包拆分，提交信息声称 full `mvnw verify` green；这对 Node v2146 没有阻塞，因为 Node 本版只改本地 renderer 和 builder。

这里要强调“上游证据”的边界。五个迁移文件渲染的是 controlled-read-only-shard-preview 相关本地 profile 或 artifact，它们用测试 fixture 构造输入，不需要启动 Java HTTP 服务，不需要连接 mini-kv TCP 服务，不需要刷新历史 fixture。也就是说，本版的上游状态只作为项目进度观察，不作为运行时输入。若后续进入真实 shard preview 或 live read-only window，才需要在计划里明确 Java/mini-kv 启动端口、操作者、清理责任和证据归档位置。

## Service Flow / 服务流

本版的服务流可以分成三段。第一段是 builder 层：调用方传入 `VerificationReportSpec`，builder 输出字符串。默认情况下，输出仍是 `# title`、空行、meta、每个 `## heading` 后空行、body、最终换行。只有当 spec 明确设置 `bodyLeadingBlankLine: false` 或 `trailingNewline: false` 时，builder 才保留紧凑旧格式。这个设计让新增能力不反向影响旧迁移结果，风险被限制在本版迁移的五个文件。

第二段是 renderer 层。原来每个 renderer 都手写数组：标题、meta 字符串、section heading、展开 helper、最后 `join("\n")`。迁移后，meta 变成 `ReadonlyArray<[label, value]>`，section 变成 `{ heading, lines }`。比如 stage ledger 的 `Passed gates` 仍然用 `${ledger.passedGateCount}/${ledger.gateCount}` 保持旧字面值；blocked reasons 仍然由一个小 helper 输出 `["- none"]` 或 `reason.map(...)`。这些细节说明，迁移不是“抽象化后丢掉格式”，而是把每个旧字符串如何形成逐项映射到 builder spec。

第三段是验证层。迁移前，先用真实 artifact 构造五个 renderer 的当前输出，并记录长度和 SHA-256。迁移后，用完全相同的输入再次渲染，比较长度和 hash。五个结果全部一致：type module catalog 长度 153732、hash `a8ed...90e9`；stage ledger 长度 8024、hash `20eb...da0b`；runbook 长度 8224、hash `c008...4af9`；command worksheet 长度 12496、hash `3fac...ef8d`；evidence packet 长度 14910、hash `9e83...92d`。这个验证比 `toContain` 更强，因为它证明每一个换行、空格、字段顺序都没有改变。

## Safety Boundary / 安全边界

安全边界有三层。第一层是运行时安全：本版没有改 `OrderPlatformClient`、`MiniKvClient`、Fastify 路由、配置开关或上游 action gate，所以不会让任何本来被禁止的上游调用变成允许。`UPSTREAM_PROBES_ENABLED` 和 `UPSTREAM_ACTIONS_ENABLED` 的语义完全不变。第二层是证据安全：renderer 输出 byte-identical，说明历史归档、Markdown route、测试断言和人工审阅材料不会因为迁移而发生格式漂移。第三层是治理安全：builder 只增加两个排版控制开关，没有增加新报告类型，没有引入新的链式 closeout，也没有复制一个并行 builder。

这层边界尤其重要，因为 renderer consolidation 的风险不是业务 bug，而是“看似只是重构，实际让审计报告格式漂移”。如果一个报告多出空行，人工看起来也许无所谓，但 digest、快照、复制粘贴归档和文档门禁可能都会受到影响。v2146 的方法是先承认旧报告的排版差异是合同的一部分，再让 builder 能表达这些差异。这样后续迁移 h3/map/flatMap renderer 时，就不需要在每个文件里争论是否能接受格式变化。

还有一个容易被忽略的安全点：本版没有把 `renderEntries` 直接并入 builder 的 `entries` 分支来偷懒。对于紧凑旧报告，`entries` 分支虽然能生成同样的 `- key: value` 行，但它默认会在 section heading 后插入空行；如果为了方便把所有 `Gates` 都改成 entries 而不加 spacing 控制，就会得到看似“更标准”、实际不等价的 Markdown。v2146 保留 `renderEntries(...)` 作为 `lines`，看起来比 entries 分支多一行代码，却能把输出合同说得更清楚：这里复用的是行渲染，不是重新解释 section 语义。这个选择对后续维护有价值，因为审阅者看到 `bodyLeadingBlankLine: false` 就知道这份报告存在历史紧凑格式，需要继续做 byte-level 比对。

类似地，`trailingNewline: false` 不是为了追求风格偏好，而是为了承认旧报告末尾没有换行这个事实。很多 formatter 或 Markdown 工具会偏好末尾换行，但 renderer consolidation 的目标不是统一所有历史格式，而是先把重复拼装逻辑收拢到一个可维护位置。等整个 N1 阶段结束后，如果项目想统一报告末尾换行，应该作为单独的格式迁移版本处理，并集中更新测试、归档说明和 digest 预期；不应该混在 builder 迁移里悄悄发生。

## Test Coverage / 测试覆盖

测试覆盖分为三类。第一类是 builder 单测：`verificationReportBuilder.test.ts` 保留原 canonical 输出测试，又新增“紧凑 section spacing 和无 trailing newline”的测试，明确证明 `bodyLeadingBlankLine: false` 和 `trailingNewline: false` 的组合会输出旧式紧凑结构。这个测试保护的是新 builder 合同。

第二类是既有 renderer focused tests：type module catalog、stage ledger、runbook、command worksheet、evidence packet 五个测试文件全部运行。它们覆盖 artifact 构造、关键字段、read-only/writes-allowed/automatic-service-start 等安全断言，以及 Markdown 中关键标题和 h3 条目是否仍然存在。本次运行结果是 6 files / 28 tests passed。

第三类是迁移专用的哈希比对。这个比对不是提交进测试套件的长期测试，因为它依赖“迁移前输出”这个临时基线；但它是本版收尾的强证明。临时基线写入 `.tmp/v2146-renderer-baseline.json`，收尾时必须删除。最终 summary 记录了五个输出的 length 和 SHA-256，方便审阅者知道 byte-identical 不是口头判断。

从测试分层看，这版没有新增一个巨大的快照测试，也是刻意的。type module catalog 单个 Markdown 超过十五万字符，如果直接把它塞进 snapshot，会让测试文件难读、评审噪音很大，而且每次 type catalog 增减都可能产生大面积 diff。当前更好的做法是：领域测试继续检查关键条目、数量和安全断言；builder 单测检查格式能力；版本收尾用临时哈希证明迁移前后完全一致。三者组合起来，比单一超大 snapshot 更可维护，也更符合这个仓库后期“不要制造巨型文件”的约束。

这套验证办法也能复用到下一批。以后遇到 h3/map/flatMap renderer，先判断旧输出是否有紧凑 heading、是否有 trailing newline，再选择 builder 默认行为或显式 spacing control；迁移前后对同一 fixture 取 hash；最后跑该 renderer 的 focused tests 和 ratchet。这样每批都能用同一种审计语言说明“我们只换了拼装器，没有换报告”。这比把版本解释写成“测试通过”更透明，因为它告诉维护者通过的测试到底覆盖了什么、没有覆盖什么。

## Next-version Direction / 下一版本方向

v2146 之后，N1 可以继续迁移 controlled-read-only-shard-preview 族的邻近 renderer，特别是 live-read-only-window evidence intake、manual worksheet、operator evidence import/value draft 等文件。这些文件也有 h3/map/flatMap 特征，并且已经有测试。路线建议仍然是保守的：优先使用 `lines` 承载本地 helper，只有当多个文件出现同一种重复子结构、且能证明 helper 抽象不会改变输出时，再考虑给 builder 增加新的 section 类型。不要把所有复杂条目都一次性抽象成新的泛型 entries-array，否则容易把领域字段顺序隐藏到过宽的工具里。

另一个方向是持续观察未迁移统计。v2146 后 builder-backed renderer 为 127/245，未迁移 118；剩余 h3 48、for 9、map 65、flatMap 59。这个数字说明 N1 仍有不少工作，但现在已经跨过“只能处理纯标准报告”的阶段。下一版最好继续迁移 4 到 6 个同族同形文件，并复用本版的哈希比对办法，而不是扩大到几十个文件导致验证预算失控。

## Cross-project Position / 跨项目位置

Java 和 mini-kv 可以推荐并行。Node v2146 不要求 Java v1807 或 mini-kv v1622 提供新的 runtime evidence，不需要它们重新启动服务，也不要求它们写回 Node 计划。Claude 在 Java 做的 v1807 可以视为 sibling 项目自己的结构优化；Node 本版只是确认它没有成为 Node 阻塞项。后续如果 Node 要消费 Java 或 mini-kv 的真实文件，应当在计划里列出精确版本、路径和 fallback fixture，而不能把“看见 sibling 新 tag”当作已经获得真实批准。

## One-sentence Summary / 一句话总结

v2146 是 renderer consolidation 从纯标准报告进入复杂 h3/flatMap 报告的第一版：它用向后兼容的 spacing control 扩展共享 builder，迁移五个 controlled-read-only-shard-preview renderer，并用迁移前后 SHA-256 证明 Markdown 输出字节完全一致。
