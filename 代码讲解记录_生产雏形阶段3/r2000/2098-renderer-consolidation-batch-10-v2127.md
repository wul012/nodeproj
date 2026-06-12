# v2127 renderer consolidation batch 10

## Goal and Non-goal / 目标与非目标

v2127 的目标是把 Java/mini-kv route catalog cleanup 的 6 个 evidence report renderer 迁移到共享报告 builder，并把重复的 evidence file 行格式提取成一个可测试 helper。本版覆盖 fresh baseline evidence、latest evidence、latest sibling evidence、handoff evidence、readiness handoff evidence、verification checklist evidence 六个报告。它们都不是 archive verification renderer，而是 Node 汇总 Java 与 mini-kv 路由目录清理证据的报告层：展示当前冻结证据、历史 fixture、版本 guard、release continuity、route catalog 和下一步动作。

选择这 6 个文件，是因为它们共享一个很明确的重复点：`Evidence Files` section 都输出 `- id: present|missing`，随后缩进 `Resolved path` 与 `SHA-256`。这种格式既不是 v2123 的 archive byteLength reference，也不是 v2126 的 fake transport snippet；它适合成为独立的 `renderVerificationEvidenceFileReferenceLines`。同时，这 6 个文件还包含各自的版本叙事，例如 Java v226-v231 readiness guards、mini-kv v213-v220 continuity、latest sibling documentation snippets。这些内容不适合全局抽象，应作为本地 lines 保留。

本版非目标同样明确。第一，不迁移所有 route catalog cleanup renderer，只做 evidence report 这一组；batch closeout、preflight、availability closeout 可以后续单独处理。第二，不改 report loader、evidence loader、route 注册、profile type、fixture 路径或测试期望。第三，不把版本 guard、release continuity、snippet matched 统一成新 helper；它们虽然都是 bullet 行，但业务模型不同。第四，不触碰 Java / mini-kv 仓库，不要求它们提供新证据。

这版的工程价值不是“又少了几行代码”，而是把 route catalog cleanup report 的层次分清：通用报告骨架由 builder 管，重复 evidence file 由小 helper 管，版本化证据叙事留在 renderer 附近。这样后续 reviewer 打开文件时，不需要在标题、空行、summary、checks、next actions 的重复模板里找差异，而能直接看到哪个 Java/mini-kv 证据段是本报告的核心。

从批次选择看，v2127 也避免了两个极端。一个极端是只迁移一两个最简单文件，这会让 route catalog cleanup 家族继续碎片化；另一个极端是把 preflight、batch closeout、availability closeout 和 evidence report 全部混在一起，这会让验证面变宽、讲解变散。六个 evidence report 的共同点足够强：都围绕 frozen sibling evidence、report summary、checks、evidence files 和 endpoints；差异又足够有限：只在几个版本列表和 snippet section。因此它们适合成为一个中等批次。

## Entry Points / 入口

六个 public renderer 函数名全部保持不变：`renderJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReportMarkdown`、`renderJavaMiniKvRouteCatalogCleanupLatestEvidenceReportMarkdown`、`renderJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceReportMarkdown`、`renderJavaMiniKvRouteCatalogCleanupHandoffEvidenceReportMarkdown`、`renderJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReportMarkdown`、`renderJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReportMarkdown`。route 层继续通过原 report service re-export markdown renderer，调用方不需要感知内部实现变化。

每个入口仍接收原 report 对象，返回原 Markdown string。meta 行也保留旧顺序：service、generatedAt、profileVersion、reportState、ready flag、active/source Node version、executionAllowed；latest sibling evidence 还保留 `CI stabilization version`。这个顺序不是随意排版，它反映了报告身份、版本来源和安全边界。v2127 没有为了统一而改变标签名或字段顺序。

迁移后，入口的主体变成 `renderVerificationReportMarkdown({ title, meta, sections })`。这让每个 renderer 的结构更像报告目录：先看标题和 meta，再看 Summary、Checks、Java evidence、mini-kv evidence、Evidence Files、Evidence Endpoints、Next Actions。对这种证据汇总报告来说，目录感很重要，因为读者常常不是要逐行看源码，而是判断证据链是否完整、是否仍只读、是否可以进入下一个归档版本。

这一批也给后续 route catalog cleanup renderer 提供模板。若文件只有 entries/list/messages 和同形 evidence files，可以直接套用 builder 与 helper；若文件含有 process plan、read targets、version guard 或 snippet match，就把那些业务行保留为 local lines。入口层因此既统一又不僵硬。

六个入口之间的差异仍然清楚。handoff evidence 关注 Java v202/v206 与 mini-kv v191；verification checklist 关注 Java v215-v217 与 mini-kv v201；readiness handoff 关注 Java v225-v231 与 mini-kv v211-v212；fresh baseline 把 Java v232-v239 和 mini-kv v213-v220 放在一起；latest evidence 回看 Java v207/v208 与 mini-kv v193；latest sibling evidence 冻结 Java v274 与 mini-kv v247。迁移后这些阶段没有被抹平，标题和 section 名仍然保留版本语义。

## Response Model / 响应模型

响应模型仍是 Markdown，exact compare 证明输出逐字节一致。标准 section 用 builder 的 entries/list 分支：Summary、Checks、Java v207 Controller Split、Java v208 Endpoint Catalog、mini-kv v193 Handoff Audit Freeze、Java v225 Readiness Handoff、Evidence Endpoints 和 Next Actions 等都保持旧内容。Evidence Files 用新 helper 输出三行一组的文件引用，顺序来自 `Object.values(report.evidence.files)`，没有重排。

`renderVerificationEvidenceFileReferenceLines` 的格式刻意不同于 `renderVerificationArchiveFileReferenceLines`。archive helper 输出 `path: exists=true; bytes=...; digest=...`，适合归档文件存在性和 byteLength；evidence helper 输出 `id: present|missing`、resolvedPath、SHA-256，适合 route catalog cleanup 的 sibling evidence 文件。二者如果混用，会让读者误判证据类型。v2127 单独建 helper，就是为了把“相似但不同”的边界写进代码。

版本 guard 和 release continuity 仍是本地 lines。fresh baseline report 的 Java v232-v239 receipts、mini-kv v213-v220 releases，readiness handoff report 的 Java v226-v231 guards、mini-kv v211-v212 retention，都不是通用文件引用。它们表达的是跨版本连续性：哪个版本、哪个 scope、status、guardCount、validationCount、historicalFixtureCount、boundaryRuntimeClosed。把这些抽成全局 helper会让 builder 背上过多业务语义。

latest sibling evidence 还有 Documentation Snippets section。它只输出 `snippet.id` 与 matched/missing，用来证明文档片段仍能在冻结资料中找到。这个格式也保留在 renderer 内，因为它和 evidence file 的 resolved path/digest 不同。v2127 的原则很一致：共享重复且稳定的文件引用行，保留具体报告独有的证据叙事。

helper 的输入接口也经过刻意限制。它不接受任意 object，不接收 label formatter，也不提供自定义字段名；只接受 id、exists、resolvedPath、digest。这样调用点不会把不相干的结构硬塞进来。若未来某个报告只有 path、byteLength 或 snippet matched，那就不该用这个 helper。这个小限制能防止“看起来都像文件”的证据被格式化成同一种叙事，从而保留审计材料的精确性。

## Upstream Evidence and Config / 上游证据与配置

v2127 不读取实时 Java 或 mini-kv 服务。六个 report 都基于 Node 仓库内已有的 sibling evidence、historical fixture 或冻结摘要生成；测试配置继续关闭 upstream probes 和 actions，并可通过 historical fallback 覆盖缺少 sibling workspace 的场景。renderer 本身不读取配置、不启动进程、不打开网络，只把 report loader 已经给出的结构渲染为 Markdown。

这意味着 Java 和 mini-kv 可以继续并行推进。本版没有要求它们补新文件、开放端口、修改 schema 或提供新的 CI 结果。当前工作树里 Java / mini-kv playbook 的外部修改仍然不属于 Node v2127；提交时必须排除。这个边界对三项目并行很关键：Node 消化自己的展示层重复，上游项目继续做自己的工程治理，不因为 Node 的 renderer 重构被阻塞。

从真实执行距离看，route catalog cleanup evidence report 仍是“只读证据治理”，不是 live integration。报告里虽然出现 Java、mini-kv、route catalog、consumer readiness 等词，但它们描述的是证据文件和历史版本链，不是对上游服务发请求。`Execution allowed: false` 仍保留在 meta 中，提醒读者这批报告不能被当成执行授权。

这个定位也解释了为什么 v2127 不需要截图。没有新 UI、HTML 页面或 HTTP smoke 页面被生成；本版只改变 Markdown renderer 的内部组织，并用 byte-identical compare 证明输出不变。归档交付以 summary、中文解释和代码讲解为主，足够描述本版治理动作。

对于三项目协作，v2127 还减少了一种误会：Node 正在整理 Java/mini-kv evidence 的展示方式，并不代表 Node 要求 Java/mini-kv 重新生产这些 evidence。报告中的版本号和 fixture 路径都是历史冻结输入，Java/mini-kv 会话可以继续按照自己的 playbook 做后期治理。只有当 Node 后续要消费 fresh live evidence、改变字段合同或引入真实服务启动时，才需要把它们列为阻塞前置。

## Service Flow / 服务流程

服务流保持 route 调 report loader，report loader 调 evidence loader 或读取已有 evidence，renderer 将 report 渲染成 Markdown。旧 renderer 直接在数组里拼接标题、meta、section heading、entries、evidence files、next actions；新 renderer 把标题、meta 和 sections 交给 builder。这个改变没有改变数据来源，也没有改变 route response。

以 latest evidence report 为例，旧文件依次渲染 Summary、Checks、Java v207、Java v208、Java v208 fixture、mini-kv v193、Evidence Files、Evidence Endpoints、Next Actions。新文件 sections 列表保持完全相同的顺序。由于 Evidence Files 使用 helper，文件引用格式由一个测试覆盖，而各个 evidence section 仍显式列在 renderer 中，阅读者不会丢失报告结构。

readiness handoff report 是本批最复杂的文件。它既有 entries section，也有 Java v226-v231 guard list 和 mini-kv retention list。v2127 没有把这两个 list 抽离，因为它们是理解 readiness handoff 的关键。迁移后这个文件仍然保留最重要的业务差异，但去掉了大量重复骨架，行数降到 59 行。这个结果比“完全无 helper、完全无本地 lines”更接近可维护状态。

新增 helper 位于 `verificationReportBuilder.ts`，并在 `verificationReportBuilder.test.ts` 中覆盖 present/missing、resolvedPath 和 digest missing。这个测试让后续使用 helper 的 renderer 不需要重复测试三行格式；每个 renderer 只需要证明自己输出仍和旧版本一致。共享测试加 exact compare，是本版重构的安全组合。

另一个服务流收益是减少审查时的噪声。旧文件里每个 Evidence Files 都复制三行 formatter，六个文件加起来就是十八行完全同形的格式字符串；这些字符串一旦有一个被误改，route 片段测试未必发现。现在格式只有一处，且有 builder test 覆盖。renderer 负责选择哪些 files 进入 section，helper 负责怎样显示单个 file，职责分割更自然。

这种职责分割也方便后续局部优化。如果未来 evidence file 需要增加可读大小、来源类型或 fixture 标记，应先确认所有使用者都需要这些字段，再改 helper 和 exact compare 预期；如果只有某个 report 需要，就应留在本地 lines。v2127 把这个决策点变得更清楚：共享格式是默认稳定层，特殊字段是本地业务层。

## Safety Boundary / 安全边界

安全边界第一层是输出不变。临时 Vitest 从 `git show HEAD` 读取六个迁移前 renderer，改写 import 后动态加载，和当前 renderer 对同一个真实 report 做字符串比较。6/6 通过，说明标题、meta、section 顺序、Evidence Files 三行格式、version guard 行、snippet 行、next actions 和末尾换行都没有变化。

第二层是行为不变。本版不改 loader，不改 evidence files 的存在性判断，不改 digest 计算，不改 route catalog count，不改 readiness flag，也不改 historical fallback。renderer 的工作仍是展示。即便新增了 helper，helper 也只是纯字符串转换，没有文件读取、网络访问或状态修改。

第三层是抽象边界。v2127 没有扩大 `renderVerificationReportMarkdown` 的 union 类型；只是新增了一个独立 evidence file helper。这个 helper 有明确输入接口：id、exists、resolvedPath、digest。它不会替代 archive byteLength helper，也不会承担 fake transport snippet 或 version guard。停止条件写清楚，可以防止 helper 继续膨胀成“任何 bullet 列表都往里塞”的工具。

第四层是版本范围。虽然 route catalog cleanup 还有其它未迁移 renderer，本版只处理 evidence report 家族。batch closeout、preflight、availability closeout 仍应独立评估，因为它们的 section 形态和风险语义不同。这样每版都能给出清晰解释，而不是把多个方向混成一次难审查的大改。

第五层是增长控制。v2127 新增 helper 之前有明确必要性：同形 Evidence Files 在多个 report 中重复，并且不适合使用 archive byteLength helper。新增后也有停止条件：只有同样的 evidence file reference 才能复用它。这个必要性和停止条件都写入 summary，避免后续每遇到一种 bullet list 都继续扩展 builder。治理项目最怕的不是没有 helper，而是 helper 成为无边界收纳箱。

## Test Coverage / 测试覆盖

本版验证先跑 `npm run typecheck`，确认新 helper 的结构类型能被六个 report 的 evidence file 对象满足。随后跑 focused batch：`verificationReportBuilder.test.ts`、`governanceGrowthRatchet.test.ts` 加六个 route catalog cleanup evidence report 相关测试，共 8 个文件 18 个用例。它覆盖 helper、报告 loader、历史 evidence、ready/check summary 和 service/route 增长约束。

最关键的是 byte-identical compare。六个 report 都用真实 report loader 生成输入，再把旧 renderer 和新 renderer 输出逐字节比较。由于本版涉及 shared helper，exact compare 能确认 helper 没有把 `present/missing`、`Resolved path`、`SHA-256`、缩进或换行改错。focused tests 通常只断言关键字段，无法覆盖完整 Markdown，因此 exact compare 是必须的。

后续收尾还需要正式文档 gate、lint、build 和远端 Node Evidence CI。lint 的 263 warning 是既有基线，本版只要求 0 error。build 会生成 `dist`，提交前需要删除；`.tmp` 中的 exact compare 文件也要删除。本版没有启动 HTTP server、Java、mini-kv 或浏览器自动化，没有后台进程需要保留。

这批完成后，route catalog cleanup evidence report 的标准形态会更清楚。下一版可继续处理 batch closeout/preflight/availability closeout，或者扫描 controlled read-only shard preview renderer。无论选哪条路，v2127 留下的判断标准都可以复用：共享骨架和稳定文件引用，保留具体业务证据行。

测试结果也说明这批没有牺牲速度。focused batch 8 个文件 18 个用例在本地快速通过，exact compare 6 个 renderer 也快速完成。相比启动大规模全量测试，这种分层验证更适合当前机器和项目体量：先用 focused tests 覆盖业务入口，再用 exact compare 覆盖完整 Markdown，最后交给 lint/build/CI 做全局兜底。

下一批不应盲目继续按文件名排序。更合适的路径是先扫描剩余 renderer 的形态：哪些只有 entries/list/messages，哪些含 process plan 或 read targets，哪些可以因为同形 helper 受益，哪些应该等待 Phase-B 合并。v2127 已经把 route catalog cleanup evidence report 家族收成一个清晰模板，后续批次应继续按“同族、同风险、可 exact compare”的标准推进。

这个标准也能保护版本解释质量。若一个批次无法自然说明为什么这些文件属于同一类，通常就说明切片太碎或混杂；此时应重新分组，而不是靠文字补救。

因此，下一版的首要动作仍应是扫描和归类，再进入代码迁移。
这能让每个版本都留下可复核的工程理由。
也能减少后续返工。
更稳。
维护更稳。

## One-sentence Summary / 一句话总结

v2127 把 6 个 Java/mini-kv route catalog cleanup evidence report renderer 迁移到共享 verification report builder，新增并测试 evidence-file 行 helper，在保留版本 guard、release continuity 和 snippet 本地叙事且输出逐字节一致的前提下，继续压薄 N1 非 archive verification renderer。
