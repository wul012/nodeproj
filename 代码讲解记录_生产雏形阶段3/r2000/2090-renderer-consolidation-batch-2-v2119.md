# v2119 renderer consolidation batch 2

## Goal and Non-goal / 目标与非目标

v2119 的目标很窄，但它不是一个小修小补：它继续执行 N1 renderer consolidation，把一组已经证明形态稳定的 archive verification renderer 从手写 markdown 数组迁移到 `renderVerificationReportMarkdown`。这类 renderer 在历史版本里大量重复同一种结构：先输出一级标题，再输出 `Service`、`Generated at`、`Profile version`、`Archive verification state`、`Ready`、`Active Node version`、`Source Node version`、`Execution allowed` 这些 meta 行，然后按固定分区输出 `Source Report`、`Summary`、`Checks`、`Archive Files` 和 `Next Actions`。重复本身不是单纯的审美问题，它会持续抬高后续重构成本：任何一个空行、列表空态文案、文件 digest 行格式或者 meta 顺序如果在某个 renderer 中被手工改错，测试未必能第一时间覆盖到；而 N5 又要求未来启用更严格的 unused 检查、减少警告池、拆分超大文件，并通过 Phase-B 把已经标准化的 renderer 折回 owning service，以降低文件数量和维护面。

本版的非目标同样明确。第一，不修改任何 loader、profile 类型、route handler、access policy 或上游证据 schema；因此 Java 和 mini-kv 没有新的输入要求。第二，不把 controlled shard preview、section-array、loop-heavy 或带复杂 helper 的 renderer 混入这一批，因为它们需要单独判断局部 helper 是否能安全落入 `lines` section，不能为了凑数量牺牲可审查性。第三，不新增新的 echo、verification、readiness 或 archive chain；本版复用 v2114 已经建立的 builder，而不是再制造一个同类模板。第四，不修改测试期望；如果迁移导致现有断言失败，正确动作是修 renderer spec，而不是调整测试来迎合新输出。

这也是为什么本版只迁移 10 个文件，却仍然算作一个有实际工程厚度的版本：它减少了 414 行旧数组拼接，新增 281 行 builder spec，净减少约 133 行重复渲染逻辑，同时为后续批次留下清楚边界。更重要的是，它在归档证据里加入了临时 exact compare：用真实 profile 重新生成旧数组拼接模型，然后和当前 renderer 输出逐字节相等比较。这让“行为不变”不只是口头判断，而是可复查的迁移证据。

选择这 10 个 renderer 还有一个维护层面的考虑：它们集中在 route catalog cleanup archive verification 这一族，命名虽然很长，但字段组合高度接近。把同族文件放在一个批次里，reviewer 可以横向比较每个 ready 字段、标题字符串和分区顺序，而不是在不同业务域之间来回切换。这样既能发现机械迁移的复制错误，也能让下一批次继续沿用“先找同构族群、再迁移、再做 exact compare”的节奏。这个目标比单纯追求迁移数量更重要，因为 N1 的后半段还会遇到带 helper、带嵌套 section、带循环输出的 renderer，必须先把最稳的 archive verification 族群收干净。

## Entry Points / 入口

本版触达的入口全部位于 `src/services/*Renderer.ts`。它们不是业务服务入口，也不拥有数据采集职责，只负责把同名 profile 转成 markdown 文本。10 个迁移对象分别是 `javaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerificationRenderer.ts`、`javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationRenderer.ts`、`javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerificationRenderer.ts`、`javaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationRenderer.ts`、`javaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerificationRenderer.ts`、`javaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerificationRenderer.ts`、`javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationRenderer.ts`、`javaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerificationRenderer.ts`、`javaMiniKvRouteCatalogCleanupLatestEvidenceArchiveVerificationRenderer.ts` 和 `javaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceArchiveVerificationRenderer.ts`。

每个入口仍然保留原来的 exported function 名称和参数签名，例如 `renderJavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationMarkdown(profile)` 仍然只接收一个 profile，并返回 markdown string。调用方不需要感知内部实现已经从 `["# title", "", ...].join("\n")` 变成 builder spec。这个边界非常关键：route 层、测试层、archive loader 层的 imports 都不需要更新，迁移就不会扩散成跨模块 API 修改。

共同入口的核心变化是 import。旧文件从 `liveProbeReportUtils.js` 引入 `renderEntries` 和 `renderList`，然后在 renderer 内部手动展开。新文件只引入 `renderVerificationReportMarkdown`。`renderEntries`、`renderList` 仍然存在，但被集中封装在 builder 内部，由 section kind 选择：`entries` section 调 `renderEntries`，`list` section 调 `renderList`，`lines` section 原样输出传入数组。这让 renderer 文件从“自己知道怎么拼 markdown”转成“声明报告由哪些分区组成”。入口没有变，职责边界变窄了。

入口收窄以后，后续维护者排查 markdown 输出问题时也更直接。若标题、meta label 或分区顺序不对，应先看对应 renderer 的 spec；若所有 renderer 的空行、列表空态或 entries 格式一起异常，应看 `verificationReportBuilder.ts` 和 `liveProbeReportUtils.ts`。这种二分排查以前并不明显，因为每个文件都自己拼完整数组，局部错和公共错混在一起。v2119 没有马上删除 renderer 文件，是因为 Phase-B 需要等足够多 renderer 标准化后再决定折回 service 的顺序，避免当前批次把 imports 和 route 调用面一起扰动。

## Response Model / 响应模型

这些 archive verification renderer 的响应模型是 markdown，而不是 JSON profile。JSON profile 由同名 service loader 负责，renderer 只把 profile 映射为可读报告。迁移前的模型靠数组顺序隐式表达：meta 行写在第一个 `##` 之前，分区之间用空字符串制造空行，`Archive Files` 用 `Object.values(profile.archiveFiles).flatMap(...)` 展开三行，`Next Actions` 用 `renderList(profile.nextActions, "No next actions.")` 处理空态。迁移后，同样的信息被写进 builder spec：`title` 表示一级标题，`meta` 是 label/value tuple 列表，`sections` 是一组按顺序排列的 section object。

这次迁移的关键不是“换一种写法”，而是把响应模型显式化。以前 reviewer 必须逐行检查数组里是否漏了空字符串、是否把某个 `renderEntries` 放错分区、是否把 `No next actions.` 文案改成别的空态；现在 reviewer 可以按字段看：meta 是否保持原顺序，sections 是否保持原分区顺序，`Archive Files` 是否仍然传 raw `lines`，`Next Actions` 是否仍然是 list section。响应模型变成结构化对象以后，迁移 diff 更短，也更适合后续批量审查。

本版保留了一个有意识的例外：`javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationRenderer.ts` 原本在 `Source Report` 后、`Summary` 前输出 `Route Catalog`。它不是通用模板外的错误，而是该报告自己的历史响应模型，所以 builder spec 里以 `{ heading: "Route Catalog", entries: profile.routeCatalog }` 原位保留。这个例外也写进归档证据，避免后续批次把“缺少统一性”误判为可以删除的历史分区。

## Upstream Evidence and Config / 上游证据与配置

v2119 没有读取新的 Java 或 mini-kv 工作树，也没有要求它们产生新 evidence。被迁移的报告名称虽然包含 Java / mini-kv，但它们在 Node 侧消费的是已经归档的本地 profile 数据和 frozen evidence，renderer 只处理 profile 对象在内存中的展示形式。换句话说，本版不改变任何跨项目合同：Java session 和 mini-kv session 可以继续按各自 playbook 做内部质量推进，不需要等待 Node v2119 的批准，也不需要把进度写回 Node 仓库。

配置层面同样保持静止。`loadConfig` 仍由测试用例用 `LOG_LEVEL=silent`、`UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false` 构造安全默认配置；renderer 不读环境变量，也不启动 upstream probe。临时 exact compare 脚本也使用相同配置加载真实 profile，然后把 current renderer 输出与旧模型输出相等比较。这个做法能证明 markdown 字符串稳定，同时不会触碰真实 Java 服务、mini-kv 服务或 Node HTTP server。

这种处理方式符合 cross-project parallel planning 的规则：如果 Node 版本只验证本地归档、消费冻结历史证据或准备本地报告，就应标记 Java / mini-kv 为 recommended parallel。v2119 正是这种情况。它是 Node 内部可维护性重构，不是跨项目 evidence schema 演进，也不是 live integration 阶段。

## Service Flow / 服务流程

迁移后的服务流程可以分成三步。第一步，同名 service loader 生成 profile。这个阶段读取本地 evidence、计算 summary/checks/archiveFiles/nextActions，并决定 ready 字段；v2119 没有改这里。第二步，route 或测试调用对应 renderer 函数，把 profile 交给 markdown renderer。这个函数现在不再展开所有 markdown 行，而是构造一个 `VerificationReportSpec`。第三步，`renderVerificationReportMarkdown` 统一执行渲染：先写标题和 meta，再逐个 section 输出 `## heading`，最后根据 section kind 调用 `renderEntries`、`renderMessages`、`renderList` 或直接返回 `lines`。

`Archive Files` 是这批里最需要保守处理的分区。它不是普通 object entries，因为旧输出不是 `key: value` 形态，而是每个文件三行：路径 present/missing、size bytes、sha256。为了保持逐字节一致，新 renderer 没有把它改造成 entries，而是继续用 `Object.values(profile.archiveFiles).flatMap((file) => [...])` 生成 raw lines，再传给 builder 的 `lines` section。这样既复用了统一的分区框架，又保留了历史 markdown 的文件 digest 细节。

`Next Actions` 则使用 list section。旧代码调用 `renderList(profile.nextActions, "No next actions.")`，新 spec 写成 `{ heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." }`。builder 内部仍然调用同一个 `renderList`，因此空列表时仍输出 `- No next actions.`，非空时仍逐项输出 bullet。这个映射看似简单，但它是批量迁移里最容易机械出错的地方：如果误写成 raw `lines`，空态就可能丢失；如果误把 list 当 entries，输出会完全变形。本版专门检查目标文件中没有残留 `renderList` 或 `lines: renderList`，并通过 focused tests 与 exact compare 双重验证。

fresh baseline evidence 的 `Route Catalog` 分区也说明了流程迁移不能只靠全局替换。它和同族文件一样有 archiveFiles、summary、checks 和 nextActions，但中间多出一段 routeCatalog entries。迁移时如果只按“Source Report 后面就是 Summary”的模板写，就会产生通过 typecheck 但输出缺段的错误。v2119 的做法是把这个差异显式写进 spec 和归档证据，让特殊点留在对应文件里，而不是提升成 builder 的新概念。builder 只表达通用 markdown 骨架，不吸收业务语义，这条边界能防止共享工具再次变成另一个难维护的大型条件分支。

## Safety Boundary / 安全边界

安全边界首先体现在文件数量和职责数量上。v2119 没有增加 `src/services` 文件，也没有增加 `src/routes` 文件；`governanceGrowthRatchet.test.ts` 已在 focused batch 中通过。这个约束很重要，因为 N5 的后续 code health 工作明确依赖文件数不继续膨胀。renderer consolidation 的正确方向是减少重复和为 Phase-B 合并创造条件，而不是给每一类报告再新建一套工具。

其次，迁移没有改变任何运行时动作。所有被改文件都是 renderer；它们不能发 HTTP 请求、不能读取环境变量、不能修改磁盘证据。`executionAllowed` 这类字段只是被输出到 markdown meta，字段值来源仍由 profile loader 决定。本版不启动 Node server，也不启动 Java/mini-kv，因此没有后台进程风险。

第三，批次选择遵守了“遇到偏离模板就跳过”的规则。controlled shard preview 相关 renderer、section-array renderer、带局部 helper 的 renderer 仍然留给后续批次。这样做不是保守拖延，而是保护迁移质量：只有当一个 renderer 的旧模型能被 builder section kind 清楚表达时，才进入当前批次；如果需要额外 helper 或 conditional section，就必须在单独批次中写清楚映射和验证策略。

第四，不编辑测试期望。现有测试中有些只覆盖 profile 与局部 markdown 内容，不是完整 snapshot；因此本版补充了一次临时 exact compare 作为验证动作，而不是把测试断言改成迁移后的输出。临时脚本不是交付代码，跑完会删除；归档 JSON 只保留结果和方法，避免仓库里长期留下一次性验证脚本。

## Test Coverage / 测试覆盖

本版验证分三层。第一层是 `npm run typecheck`，确认 10 个 renderer 的 builder spec 类型、ready 字段引用、section 字段和 import 都能通过 TypeScript 编译。由于每个 renderer 的 profile 类型不同，typecheck 能快速发现把某个 ready 字段复制错、把 `routeCatalog` 放到没有该字段的 profile、或者 import 路径写错的问题。

第二层是 focused renderer batch。实际运行命令覆盖了 `test/verificationReportBuilder.test.ts`、`test/governanceGrowthRatchet.test.ts` 和 12 个 Java/mini-kv route catalog cleanup archive verification 相关测试文件，共 14 个测试文件、16 个断言。builder 测试验证统一渲染器的标题、meta、entries、messages、list、raw lines、空态和末尾换行；ratchet 测试确认没有突破治理文件数；各 archive verification 测试确认真实 profile 仍然 ready、archive digest 仍然有效、checks 仍全部通过，且部分 markdown 内容仍存在。

第三层是临时 exact compare。脚本加载同一批真实 profile，用旧数组拼接模型重新生成期望 markdown：标题、meta、`Source Report`、可选 `Route Catalog`、`Summary`、`Checks`、`Archive Files`、`Next Actions` 全部按原顺序展开，然后断言当前 renderer 输出与期望字符串完全相等。比较结果为 10/10 通过，并记录了每个输出的 UTF-8 byte length。这个验证的价值在于，它补上了现有 focused tests 对完整 markdown 字符串覆盖不足的缝隙，同时不把临时验证逻辑长期加入测试套件，保持 batch 版本轻而可信。

本版没有跑全量 coverage，也没有启动 HTTP smoke。原因不是省略质量，而是当前 playbook 对 N1 单批迁移明确要求 focused tests、typecheck 和 ratchet，不建议为了单个 renderer batch 跑 500 多个测试文件。大验应当在数个批次之后或 N1 final closeout 时集中执行，这样更符合你要求的“不要一版一 CI 式大验证”的节奏。

CI 侧仍会在 push 后执行完整 Node Evidence 工作流，所以本地验证和远端验证的角色不同。本地阶段用 focused tests 缩短反馈，尽早发现 spec 映射错误；远端阶段用 typecheck、lint、test、build 和 safe smoke 覆盖整个仓库，捕捉本地 focused 范围外的治理门槛。v2119 的文档质量 gate 就属于这类远端也会扫到的仓库级规则：代码改动本身可以通过，但新增讲解必须满足当前中文篇幅、结构和可读性标准。把这一点纳入本版解释，是为了让后续批次知道讲解不是附属物，而是版本 closeout 的一部分。

## One-sentence Summary / 一句话总结

v2119 把 10 个 Java / mini-kv route catalog cleanup archive verification renderer 从手写 markdown 数组迁移到共享 builder，在不改变输出、不新增链路、不阻塞 Java/mini-kv 并行推进的前提下，继续为 N1 收束和后续 N5 代码健康治理腾出维护空间。
