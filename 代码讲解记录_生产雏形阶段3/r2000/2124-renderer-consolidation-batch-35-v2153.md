# v2153 Profile Section Renderer Consolidation

## Goal and Non-goal / 目标与非目标

本版目标是把 controlled read-only shard preview 链路里一批局部 profile-section renderer 的重复 Markdown 外壳收敛起来。这里说的局部外壳，指的是每个文件反复手写的 `## 标题`、若干 `- key: value` entry 行、以及段落末尾的空行分隔。v2152 已经证明完整 Markdown 报告可以进入 `verificationReportBuilder`；v2153 则补上另一类更窄的形态：它们不是完整报告，只是被上层 profile 聚合器拼接的 `string[]` 片段。本版成功的标准不是“迁移数量看起来更多”，而是让局部片段拥有自己的小合同，并保持字节级输出不变。

本版非目标同样明确。它不生成真实 operator evidence，不捕获真实 signed approval，不导入 candidate document，不启用 runtime payload，不允许写入兄弟项目，不启动 Java 或 mini-kv，不读取生产凭据，也不改变任何 route/schema/审批状态。它也不把 profile-section fragment 伪装成完整报告；`verificationReportBuilder` 仍只服务完整 Markdown 报告，局部 `##` 片段由 `renderProfileEntrySections` 负责。这样做可以避免 builder 语义膨胀，也能避免后续维护者误以为一个局部 profile 段落已经具备完整报告的标题、meta 和尾部换行策略。

还有一个重要非目标是“不为轻量整理新增服务文件”。如果为了三个小函数新建一个 `profileSectionRenderer.ts`，表面上模块名更专门，实际却会增加服务目录体积，并触发 governance growth ratchet。生产前治理阶段的重构不是把每个概念都拆成新文件，而是在职责足够小、层级足够接近时复用现有工具层。最终把 helper 放进 `liveProbeReportUtils.ts`，正是为了让这次收敛成为维护收益，而不是新的目录增长。

本版还刻意不迁移纯组合器。只负责调用多个子 renderer 并拼接数组的文件，本身没有局部标题和字段行，强行套 helper 只会多一层没有信息量的包装。保留它们的直连结构，可以让阅读者一眼看出“这里是聚合层”，而不是误认为这里也在定义新的 profile 段落。

## 本版要解决的问题

v2153 处理的是一个容易被误判的 renderer 债务。v2152 已经把 candidate document 五个完整 Markdown 报告迁进 `verificationReportBuilder`，并且在讲解里明确暂缓了相邻的 `controlledReadOnlyShardPreviewCandidateDocumentProfileSectionRenderer.ts`。原因很具体：那个文件不是完整报告，它不生成 `# 标题`，不生成 meta bullet，也不负责一个独立 Markdown 文档的尾部换行策略。它返回的是 `string[]`，用途是被更大的 live read-only window profile 聚合器继续拼接。若把它直接套进 full-report builder，表面上也许能减少几行重复代码，但语义上会错位，因为局部 profile 片段会被迫拥有“完整报告”的外壳。

这类文件在 controlled read-only shard preview 链里不止一个。本版扫描后确认，真正有本地 `## heading + entries + blank line` 重复结构的 profile-section renderer 有八个：operator evidence value supply import、value supply envelope、approval packet、signed approval capture、signed approval artifact draft、text package submission、text package compared evidence，以及 candidate document。它们共同的形状很稳定：每个文件把一个或多个 profile 对象字段交给 `renderEntries` 或本地 entry helper，然后手写 `## ...` 标题，再手写一个空字符串作为段落间隔。它们的业务字段差别很大，但 Markdown fragment 外壳完全相同。

本版的任务不是新增业务能力，而是把这层重复外壳收起来。这里的“收起来”有两个约束。第一，不能改变输出，哪怕只是一个空行或尾部换行都不能漂移，因为这些 profile 片段会进入上层 Markdown 聚合输出，后续归档和 hash 都依赖稳定文本。第二，不能为一个很轻的 helper 新增服务文件。项目里已经有治理增长 ratchet，服务文件数是明确受控的；第一次尝试新建 profile-section helper 文件时，ratchet 立刻提示 service count 从 1125 增到 1126，这正是规则要阻止的“为了整理而增长”。因此最终方案是把 helper 放入既有 `liveProbeReportUtils.ts`，让它成为已有只读报告工具的一部分。

## 输入、输出和调用位置

本版的输入仍然是 `ControlledReadOnlyShardPreviewProfile`。这个 profile 由 Node 本地 fixture 和测试配置构造，不从 Java 或 mini-kv 当前工作树读取新证据，也不连接真实服务。八个被迁移的 renderer 都接收同一个 profile，然后取 `profile.preview` 下的一段子对象。例如 value supply import renderer 读取 `liveReadOnlyWindowOperatorEvidenceImportPreflight` 和 `liveReadOnlyWindowOperatorEvidenceValueDraft`；candidate document profile renderer 读取 request package、submission precheck、intake packet、material request package、material submission precheck 五段 profile。输入对象里面的字段包括 ready 状态、count、digest、blocked flag、write/execution guard 等，只读展示，不改变系统状态。

输出是 `string[]`，不是完整 Markdown 字符串。这一点是本版设计的核心。一个典型输出片段长这样：第一行是 `## Live Read-Only Window ...`，后面若干行是 `- key: value`，最后一个空字符串用于把下一个 `##` 段落隔开。上层聚合器再把多个 profile-section renderer 的数组拼起来，最终进入更大的 profile Markdown。换句话说，本版 helper 的职责只有“渲染局部二级标题段落”，它不知道也不应该知道完整报告标题、meta、一级 section、尾部换行、HTTP route 或归档文件。

这一层边界带来一个好处：以后维护者打开某个 profile-section 文件时，主函数只表达“有哪些段落，每个段落的标题是什么，段落内容来自哪个本地 helper”。如果想审查字段是否正确，就进入对应的 `render...ProfileEntries`；如果想审查 Markdown fragment 间隔是否正确，就看共享 helper。过去这两类判断混在一个数组字面量里，审查者必须在大量字段行之间确认每个标题和空行是否放对。现在结构更直接。

## helper 合同

新增的类型是 `ProfileEntrySection`，只有两个字段：`heading` 和 `lines`。`heading` 不带 `##` 前缀，因为 helper 负责补这个 Markdown 语法；`lines` 是已经渲染好的条目行，通常来自 `renderEntries`，也可以来自本地 helper。这个设计刻意不接收原始对象，也不接收字段映射表。原因是 profile-section 文件里的字段顺序本身就是审计信息的一部分，继续保留显式 `renderEntries({ key: value })` 能让人直接看到每个只读字段，没有被动态表驱动隐藏。

`renderProfileEntrySection` 的输出非常小：先输出 `## ${section.heading}`，再展开 `section.lines`，最后补一个空字符串。这个空字符串不是美观问题，而是 legacy 输出的一部分。旧 renderer 每个段落后都手写 `""`，上层拼接依赖这个分隔。若 helper 少补这一行，hash 会变；若 helper 在开头多补空行，hash 也会变。`renderProfileEntrySections` 只是对多个 section 做 `flatMap(renderProfileEntrySection)`，保持旧文件中“段落按数组顺序连续展开”的行为。

测试 `test/profileSectionRenderer.test.ts` 覆盖两个最小合同：单个 section 必须输出标题、两行 entry 和尾部空行；多个 section 必须保持旧式空行分隔，并且不能增加 full-report 的 title/meta 行。这两个测试看起来很短，但覆盖的是本版最关键的语义边界。它们不是为了证明某个业务字段正确，而是为了证明这个 helper 只做局部 fragment，不越权成为完整报告 builder。

## 八个 renderer 的迁移方式

八个被迁移文件的改法保持一致：导入从 `renderEntries` 扩展为 `renderEntries, renderProfileEntrySections`；主函数从返回手写数组改为返回 `renderProfileEntrySections([...])`；每个旧的 `##` 标题变成一个 section 对象的 `heading`；旧标题后面展开的 entry lines 变成同一个 section 对象的 `lines`。本地字段 helper 没有被抽走，字段顺序也没有重排。

以 candidate document profile section 为例，旧文件连续手写五个 `##` 段落，每段读取 candidate document 链上的一个子 profile。迁移后，主函数仍然有五个 section，但每段都用 `{ heading, lines }` 表达。request package 仍然调用 `renderComparedEvidenceCandidateDocumentRequestPackageProfileEntries`，submission precheck 仍然调用对应 submission helper，intake/material 两段也一样。变化只发生在段落外壳，业务字段行没有被改写。

value supply import profile section 是另一个典型例子。它原来有两个段落：operator evidence import preflight 和 operator evidence value draft。每段内部字段很多，包括 ready flag、slot count、scope count、field count、是否 imports runtime payload、是否 accepts synthetic evidence、是否 contains secret value，以及 digest。迁移后这些字段仍然留在同一个文件的显式对象里，只是外层标题和空行由 helper 负责。这种选择比把字段也抽成通用表格更稳，因为这些安全字段本身就是人工审查要看的内容。

本版还故意没有改三个 composition-only profile-section renderer：`controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSectionRenderer.ts`、`controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSectionRenderer.ts`、`controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSectionRenderer.ts`。它们只是把多个子 renderer 的结果拼起来，没有自己的 heading + entries block。把它们纳入本版 helper 只会制造无意义包装，甚至可能让上层拼接层级变得不清楚。这个不改动同样是工程判断的一部分。

## 为什么放在 liveProbeReportUtils

一开始最直观的方案是新建 `src/services/profileSectionRenderer.ts`，把 helper 放进去。这在小项目里可能很自然，但在当前工程并不合适。OrderOps Node 已经进入生产前治理阶段，AGENTS 里有明确的治理增长控制：不要为了新增 echo、report、receipt 或辅助链条继续增加文件和层级，除非有必要证明。新建一个三函数服务文件会让服务模块数量增长，却没有带来新的边界、复用域或运行期能力。

`liveProbeReportUtils.ts` 已经包含 profile/live probe Markdown 渲染需要的稳定小工具，例如 `renderEntries`、`renderList`、`renderCodeBlock`、`renderOptionalMessage` 等。profile-section helper 与这些工具属于同一层：接收已经准备好的值，输出 Markdown 行，不读取配置，不访问网络，不触发执行，不保存文件。因此把 helper 放在这里比新建文件更符合既有结构，也让 ratchet 保持通过。

这个调整还避免了“为了重构而制造新债务”。如果每一类 renderer 都新建一个 helper service，短期 diff 可能好看，长期却会把服务目录继续拉大。v2153 的做法是：当职责足够小且与既有工具同层，就合并进现有工具；当职责确实跨越领域或有独立状态，再考虑新模块。这才是后期保养阶段需要的克制。

## 输出一致性的验证

本版使用临时 hash 脚本在迁移前后分别采样六个输出：operatorEvidenceValueSupply、operatorEvidenceValueSupplyApproval、signedApprovalArtifactDraft、signedApprovalArtifactDraftTextPackage、candidateDocument，以及 liveReadOnlyWindowAggregate。前五个覆盖被迁移 profile-section renderer 所在的主要聚合分支，最后一个覆盖上层完整聚合输出。迁移后六个输出的 length 和 sha256 全部一致，`Compare-Object` 没有差异。

这类 hash 验证比只看单元测试更严格。单元测试常常只断言包含关键字段，而 hash 会发现标题前缀、段落顺序、空行数量、字段顺序、布尔值文本、digest 文本、尾部换行等任何字符级变化。profile-section renderer 最容易出错的正是空行：旧代码每个段落末尾都有一个 `""`，helper 必须完全复刻。六个 hash 通过说明迁移没有让上层 profile 产生可见文本漂移。

focused tests 覆盖了新 helper 自身和五组上层 profile-section 测试，6 个文件 / 7 个测试通过。`npm run typecheck` 确认类型层面没有因为 `readonly string[]`、导入路径或 profile 类型产生问题。governance ratchet 通过，说明最终方案没有增加 service 文件数。`npm run lint` 也通过，仍然是 0 error / 263 existing warnings，这些 warning 是历史基线，不是本版新增错误。

## 对后续工作的意义

v2153 不改变 full-report renderer census。`verificationReportBuilder` 目前仍然覆盖 158 个完整报告，剩余 full-report renderer 仍按 v2152 的 87 个继续规划。这个数字没有下降并不表示本版无效，因为本版清理的是另一类债务：profile-section fragment 的重复外壳。把这两类债务分开统计，能避免后续计划把“完整报告迁移”和“局部片段标准化”混成一个指标。

后续如果继续推进 renderer consolidation，应当沿着两条线走。第一条线是完整 Markdown 报告，仍然看是否能进入 `verificationReportBuilder`，重点处理剩余 map/flatMap/h3 形态和 `*MarkdownRenderer.ts` 尾部文件。第二条线是局部 profile fragment，继续使用 `renderProfileEntrySections` 或类似轻量 helper，但前提是文件确实有本地 heading + entry lines，而不是单纯的组合器。这样可以保持 builder 语义干净，也能避免因为一味追求“迁移数量”而把不同层级的输出混在一起。

本版也再次确认 Java 和 mini-kv 可以并行推进。Node 这里没有消费它们的新输出，没有要求它们写回 Node repo，也没有打开 live integration。真正走向生产级分片联合执行时，需要另一个明确版本来列出输入材料、人工批准、服务启动端口、只读窗口、失败回滚和清理责任；v2153 只是把只读 profile 展示层收得更稳，为以后审查这些前置材料降低阅读成本。

一句话概括：v2153 把八个 controlled read-only shard preview profile-section renderer 的局部 Markdown 外壳收敛到 `renderProfileEntrySections`，同时保持输出字节级一致、服务文件数不增长、full-report builder 边界不膨胀，让 profile fragment 和完整报告从此按各自语义维护。
