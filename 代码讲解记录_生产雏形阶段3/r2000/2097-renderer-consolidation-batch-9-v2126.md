# v2126 renderer consolidation batch 9

## Goal and Non-goal / 目标与非目标

v2126 的目标是收掉 archive verification renderer 子集的两个尾项，让这一类报告都进入 `renderVerificationReportMarkdown` 的统一排版模型。本版覆盖 Java/mini-kv runtime execution pass evidence archive verification 与 fake transport packet archive verification。前者验证 Node v407 已冻结的 runtime execution pass evidence 和 cleanup proof，后者验证 Node v255 的 fake transport packet 归档、截图、解释、代码记录和 snippet 匹配。它们看起来都叫 archive verification，但证据形态不同，所以本版重点不是把所有行都塞进一个 helper，而是把通用结构收归 builder，把真正特殊的 evidence line 留在本地。

这版的必要性来自 N1 的尾项状态。v2125 之后，常规 archive reference、shard readiness、minimal integration、sandbox handle、operator lifecycle 等 archive verification renderer 已经被迁移；剩下的两个文件之所以没在前几批处理，是因为它们不是标准 `path/exists/bytes/digest` 形态。runtime pass evidence 的 Archive References 是一组结构化对象，需要继续通过 `renderEntries` 展开；fake transport packet 则有 `Archive Files` 和 `Snippet Matches` 两个定制列表，分别展示 workspace path、sizeBytes、digest 和 snippet matched 状态。把它们单独收尾，比混在前几批里更容易证明边界。

本版非目标也同样清楚。第一，不改 runtime pass evidence 的 profile、cleanup proof、full Vitest 记录、target count 或 evidence endpoint。第二，不改 fake transport packet 的 snippet 匹配规则、历史 fixture fallback、UPSTREAM_ACTIONS_ENABLED 阻断逻辑或 fake transport 不重跑的判断。第三，不新增 service、route、schema、fixture 或测试期望。第四，不把特殊 line formatter 提升到全局 builder；builder 的职责仍是报告骨架，不是所有业务证据的格式库。

本地扫描显示，迁移后没有剩余 `*ArchiveVerificationRenderer.ts` 文件缺少 `verificationReportBuilder`。这句话只表示 archive verification renderer 子集完成，不等于整个 N1 所有 renderer 都已经完成。后续仍应按 playbook 检查其它非 archive verification renderer、Phase-B 合并机会和代码健康项。这个限定很重要：它让本版成果可信，不把一次子集收束夸大成整个项目的终局。

从工程节奏看，v2126 也是一次“尾项分类”版本。前几批迁移的是一眼就能看出重复的 renderer，本版处理的是最容易被误抽象的两个例外。如果跳过它们，archive verification 子集会留下两个旧式文件，后续 reviewer 每次搜索 renderer consolidation 都要重新判断它们是不是遗漏；如果把它们强行改造成普通 archive file reference，又会损坏证据语义。单独做 v2126 的好处是把这两种风险都写进版本边界：完成子集一致性，同时保留局部特殊性。

## Entry Points / 入口

本版保留两个 public export 入口名不变：`renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerificationMarkdown` 和 `renderManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationMarkdown`。route table、loader、测试 import 和外部调用都不需要调整。两个函数仍然接收原 profile，返回原 Markdown string，只是内部从手写数组变成 builder spec。

runtime pass evidence renderer 的 title 来自 `profile.title`，这一点保持不变。它的 meta 行仍按旧顺序输出 service、generatedAt、profileVersion、verificationState、verificationDecision、active/source Node version、ready flags、archiveVerificationOnly、rerunsSmoke、startsJavaService、startsMiniKvService、connectsManagedAudit 和 executionAllowed。这里没有把 title 写死，是因为该 profile 已经携带完整报告标题；迁移时沿用 profile title 可以避免额外的字符串重复和误改。

fake transport packet renderer 的 title 是固定字符串，meta 行则保留 service、generatedAt、profileVersion、archiveVerificationState、readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification、readOnlyArchiveVerification、archiveVerificationRerunsFakeTransportBehavior 和 connectsManagedAudit。注意它没有在 Markdown meta 中输出所有安全字段，例如 credential、schema migration 或 production window 字段，这些仍在 JSON profile 和 checks/summary 中。v2126 不补、不删、不重排这些字段，保持历史归档呈现合同。

入口迁移后的阅读方式更直接。过去 reviewer 需要在数组拼接中定位每个 section；现在只看 `meta` 与 `sections`。如果未来 N5 做 Phase-B 合并，判断某个 renderer 能否折回 catalog 时，不再需要从 60 到 70 行模板里找真正差异。两个文件迁移后分别是 43 行和 62 行，特殊逻辑仍在文件内，整体职责比旧实现清楚。

这两个入口还提供了两个后续判断模板。runtime pass evidence 是“title/profile driven report”的例子，说明 builder 不要求所有标题都写死；只要 profile title 本来就是合同的一部分，就应该沿用它。fake transport packet 是“static title with local line format”的例子，说明 builder 可以承接固定标题和标准段落，但不要求所有 section body 都变成 entries。后续遇到其它 renderer 时，可以按这两个模板判断：标题来自 profile 还是文件常量，section body 是标准 entries 还是业务专用行。

## Response Model / 响应模型

响应模型仍是 Markdown，输出已经通过 byte-identical compare 证明逐字节一致。runtime pass evidence 的 sections 顺序保持为 Archive References、Archive Verification、Checks、Summary、Production Blockers、Warnings、Recommendations、Evidence Endpoints、Next Actions。Archive References 仍然使用 `profile.archiveReferences.flatMap((reference) => renderEntries(reference))`，因为每个 reference 是结构化 evidence entry，而不是普通 archive file reference。这个选择避免了把 `renderVerificationArchiveFileReferenceLines` 用错到不匹配的证据模型上。

fake transport packet 的 sections 顺序也保持不变：Source Node v255、Archive Verification、Archive Files、Snippet Matches、Checks、Summary、Production Blockers、Warnings、Recommendations、Evidence Endpoints、Next Actions。Archive Files 仍输出 `- id: workspacePath exists=... sizeBytes=... digest=...`，Snippet Matches 仍输出 `- id: workspacePath matched=...`。这些行的顺序和字段含义直接服务 fake transport 归档审核，不能抽成普通 archive reference。

本版新增的本地 helper 很少，但恰好表达边界：`renderArchiveFile` 和 `renderSnippetMatch` 只服务 fake transport packet renderer。它们不进入 `verificationReportBuilder.ts`，因为 file evidence 使用 `sizeBytes` 而不是 `byteLength`，snippet evidence 完全不是文件引用。若为了减少两行局部函数而扩大全局 builder，后续会让 builder 成为业务杂货间，违背治理增长控制中“共享稳定模板，不复制新链条”的精神。

builder 仍只负责统一排版。entries section 调 `renderEntries`，messages section 调 `renderMessages`，list section 调 `renderList`，lines section 原样输出本地生成的字符串。这个模型已经足够覆盖两个尾项，同时没有新增 builder 分支。也就是说，v2126 是对已有抽象的消费，不是继续发明抽象。这点比迁移文件数量更重要，因为项目后期的主要风险已经从“缺功能”转向“重复治理层越来越多、难以判断哪里是真业务”。

如果从响应合同角度看，v2126 也避免了一个常见重构错误：把“输出看起来相似”的内容误判为“数据模型相同”。runtime pass evidence 的 Archive References 展示的是 reference 对象的所有 entry；fake transport files 展示的是文件证据的压缩行；snippet matches 展示的是文本匹配结果。三者都能用 bullet line 表示，但 bullet line 只是 Markdown 外形，不是业务模型。v2126 只统一外层报告结构，没有统一这三类证据模型，这让后续扩展仍有余地。

## Upstream Evidence and Config / 上游证据与配置

v2126 不需要新鲜 Java 或 mini-kv evidence，也不启动任何上游服务。runtime pass evidence archive verification 读取的是已归档的 v407 pass evidence 和 cleanup proof；fake transport packet archive verification 读取的是历史 Node v255 的 HTML、截图、解释、计划和 snippet 证据。测试配置继续关闭 `UPSTREAM_PROBES_ENABLED` 与 `UPSTREAM_ACTIONS_ENABLED`，fake transport packet 的测试还强制 historical fixture fallback，以确认缺少 sibling workspace 时仍然只读验证冻结资料。

这也说明 Java 和 mini-kv 可以继续并行推进。Node v2126 没有要求它们提交新版本、提供 fresh evidence、开放端口或写回 Node 计划。当前工作树里仍有 Java / mini-kv playbook 的外部修改，v2126 不 stage、不回滚。三项目协作的原则在这里很简单：Node 修改 Node renderer 与 Node 归档，Java/mini-kv 自己处理各自 repo 的 CI、coverage 和治理任务，只有真实 live integration 合同变化时才需要同步阻塞。

runtime pass evidence 的安全语义尤其容易被误读。它名字里有 runtime execution 和 pass evidence，但本版处理的是 archive verification，不是再次执行 runtime smoke。meta 中 `Archive verification only: true`、`Reruns smoke: false`、`Starts Java service: false`、`Starts mini-kv service: false`、`Connects managed audit: false`、`Execution allowed: false` 都保持在 Markdown 中。迁移后这些字段更集中，审查者能更快看到它只是接受冻结证据和 cleanup proof。

fake transport packet 的边界也保持清楚。它验证的是 fake transport adapter dry-run packet 的归档，不连接 managed audit，不执行 schema migration，不读 credential，不创建临时 dry-run 目录，不重跑 fake transport behavior。`UPSTREAM_ACTIONS_ENABLED=true` 时仍会阻断，这是 loader/checks 的职责。renderer 只展示结果，不改变这个 fail-closed 行为。

这里还要注意历史 fixture fallback 的意义。fake transport packet test 使用 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，这不是为了制造额外条件，而是为了证明 Node 在没有 sibling workspace 的环境里仍能验证冻结归档。GitHub runner、临时工作区或只拉 Node 仓库的审查环境，都可能没有 Java/mini-kv 的实时目录。v2126 不碰 resolver 和 fixture 路径，避免把一次展示层重构变成环境耦合变化。

## Service Flow / 服务流程

服务流保持 route 到 loader，再到 renderer。runtime pass evidence route 通过 loader 构造 profile，profile 中包含 archive references、archiveVerification、checks、summary、productionBlockers、warnings、recommendations、evidenceEndpoints 和 nextActions。renderer 现在把这些对象放进 builder spec。Archive References section 用本地 lines 传入 `renderEntries` 展开的结果，其它 section 用 builder 的 entries/messages/list 分支。

fake transport packet route 的流程类似，但 profile 里有 archivedEvidence.files 和 archivedEvidence.snippetMatches。旧 renderer 直接在数组里 map 这两个列表；新 renderer 把这两个 map 提取为 `renderArchiveFile` 与 `renderSnippetMatch`，再作为 lines section 传入 builder。这样 diff 能清楚显示：通用 section 交给 builder，fake transport 的文件和 snippet 证据仍按原业务格式输出。

这个服务流没有增加间接层。`verificationReportBuilder.ts` 在 v2126 没有被修改，也没有为尾项新增新 union type。两个 renderer 只是使用已有 `{ heading, entries/messages/list/lines }` 结构。对维护者来说，builder 的心智模型保持稳定；对这两个特殊报告来说，局部 helper 仍然能表达它们的证据形态。这个平衡比把所有 renderer 强行压成同一种 spec 更健康。

迁移后的本地扫描是一个重要收尾信号：`*ArchiveVerificationRenderer.ts` 文件都已经引用 `verificationReportBuilder`。这意味着 archive verification 报告层现在至少在骨架上统一了。后续如果要查某个 archive verification renderer 是否异常，可以先看它的本地 helper；若没有本地 helper，它基本就是标准 report spec；若有本地 helper，就说明该报告确实有特殊 evidence line。这个约定会让 N5 代码健康审查更快。

服务流上的另一个收益是 diff 可解释性。旧 renderer 修改时，新增或删除一段 section 往往表现为大量相邻字符串变化，很难区分是格式变化还是业务字段变化。builder spec 把 section 变成对象列表，后续如果新增一个真实证据段，会出现一条新的 `{ heading, ... }`，reviewer 能立刻看到它的位置和类型。对生产前治理工程来说，review 成本就是风险成本；让 diff 更接近业务意图，本身就是维护性收益。

## Safety Boundary / 安全边界

v2126 的第一条安全边界是输出不变。临时 exact compare 从 `git show HEAD` 读取迁移前源码，把相对 import 改写到当前源码目录，加载真实 profile 后比较旧 renderer 和新 renderer 的 Markdown 字符串。2/2 通过，说明标题、meta label、section 顺序、file/snippet 行、empty text、evidence endpoint、next action 和末尾换行都没有漂移。对归档验证报告来说，这是比人工抽查更可靠的底线。

第二条安全边界是行为不变。两个 renderer 都不负责启动服务、发送请求、解析 endpoint、读取 credential 或写入状态。runtime pass evidence 的 cleanup proof、full Vitest count 和 target count 仍由 loader 读取；fake transport packet 的 snippet matching 和 upstream action block 仍由 loader/checks 计算。renderer 只消费 profile。因此，迁移不会把一个只读归档验证变成执行动作。

第三条安全边界是抽象不外溢。本版没有把 runtime pass archive references 或 fake transport snippet matches 变成全局 builder helper。这样做看起来少一点“统一”，但更符合生产前治理：共享应当覆盖稳定且重复的报告骨架，特殊证据格式应当留在拥有它的文件里。若以后另一个报告真的复用 fake transport snippet line，再考虑提取；在第二个消费者出现之前，局部 helper 更清晰。

第四条安全边界是提交范围。Java / mini-kv playbook 的外部改动仍留在 working tree，不进入 v2126 commit。`.tmp` exact compare 文件和 `dist` build 输出应在提交前删除。没有启动本地 HTTP server、Playwright、Java 或 mini-kv，所以没有需要关闭的后台进程。这个清理规则让版本收尾和 CI 状态可信。

第五条安全边界是计划语言。v2126 在 playbook 中写的是 archive verification renderer 子集收束，而不是整个 N1 完结。这样做避免下一个会话误以为可以直接跳进 N5 大规模合并。正确的下一步应先扫描非 archive verification renderer，确认还有哪些 simple renderer、section-array renderer 或 loop-heavy renderer 未迁移，再决定是继续 N1 批次还是转向 Phase-B 合并。计划写得保守一些，反而能减少后续返工。

## Test Coverage / 测试覆盖

本版先跑 `npm run typecheck`，确认两个 renderer 的 builder spec、runtime pass evidence 的 `renderEntries` lines、fake transport local helper type 和 profile 类型兼容。接着跑 focused batch：`verificationReportBuilder.test.ts`、`governanceGrowthRatchet.test.ts`、runtime execution pass evidence archive verification test、fake transport packet archive verification test，共 4 个文件 10 个用例。它覆盖 route Markdown、JSON profile、fake transport upstream actions enabled 阻断、runtime pass cleanup proof、ready flags、安全字段和 service/route 增长约束。

然后跑 byte-identical compare，两个 renderer 都与迁移前实现逐字节一致。这个测试对 fake transport packet 尤其重要，因为它的 archive file 行和 snippet line 不是 builder 的标准 entries；若本地 helper 多一个冒号、少一个空格或把 `sizeBytes` 改成 `bytes`，route 片段测试未必能发现，但 exact compare 会直接失败。runtime pass evidence 的 Archive References 也是同理，`flatMap(renderEntries)` 的空行和字段顺序不能靠肉眼保证。

本版还跑了 archive verification renderer 子集扫描：遍历 `src/services/*ArchiveVerificationRenderer.ts`，报告没有 `verificationReportBuilder` 的文件。结果为空，说明 archive verification renderer 这一子集已经完成 builder-backed 迁移。这个扫描不是替代测试，而是给计划和后续 N5 一个结构性信号：如果还要继续 N1，应把视角转向非 archive verification renderer 或 Phase-B 合并，而不是在 archive verification 尾项里继续找重复模板。

后续收尾还需要正式文档 gate、lint、build 和远端 Node Evidence CI。lint 的 warning 仍是既有基线，v2126 只要求 0 error。build 会重新生成 `dist`，提交前仍要删除。CI 的 safe smoke 负责远端环境下的 typecheck、lint、test、build、health、metrics 和 release evidence readiness smoke。只有这些都通过，v2126 才能作为 archive verification renderer 子集收束版本成立。

测试覆盖还验证了“局部 helper 不等于未完成迁移”。两个 renderer 迁移后仍有本地函数，但这些函数只生产 lines section 的 body，不再拥有标题、meta、section 空行、messages/list 这些重复骨架。换句话说，v2126 的完成标准不是“文件里没有 helper”，而是“通用报告排版归 builder，特殊证据格式保留在本地，并且输出完全一致”。这个标准更符合真实维护需要。

## One-sentence Summary / 一句话总结

v2126 把 runtime execution pass evidence 与 fake transport packet 两个 archive verification 尾项迁移到共享 verification report builder，在保留各自特殊证据行、证明 Markdown 输出逐字节一致、并确认 archive verification renderer 子集已全部 builder-backed 的前提下，完成这一段报告层收束。
