# v2125 renderer consolidation batch 8

## Goal and Non-goal / 目标与非目标

v2125 的目标是把 shard readiness 这一组 archive verification renderer 从手写 Markdown 数组迁移到共享的 `renderVerificationReportMarkdown`。本版覆盖三个文件：Java/mini-kv shard readiness evidence consumption archive verification、minimal shard readiness regular gate archive verification、minimal shard readiness live-read archive verification。它们共同服务真实分片联合执行之前的一个关键阶段：Node 只消费或验证已经冻结的分片就绪证据，而不是启动 Java、mini-kv 或 managed audit，也不是打开任何写入型执行窗口。

选择这三个文件作为一批，是因为它们的安全语义接近。regular gate 证明 Node v374 的 minimal shard readiness gate 已归档；live-read archive verification 证明 Node v371 的 Java 与 mini-kv 只读观测被安全冻结；Java/mini-kv shard evidence consumption archive verification 则证明 Node v376 已把上游 hardening 与 release evidence 消费结果固化下来。它们都在回答“分片执行之前的证据是否可信、是否可被后续版本继续读取”，而不是回答“现在是否可以执行真实操作”。因此，这一批适合统一薄化展示层，让审查者更容易看清证据链，而不是被每个 renderer 内部重复的标题、空行、messages/list 代码分散注意力。

本版的非目标也很明确。第一，不处理 runtime execution pass evidence renderer，因为它的 archive reference 不是普通 `path/exists/bytes/digest` 行，而是通过 `flatMap(renderEntries)` 展开结构化条目；如果硬塞进本批，会让共享 helper 的边界变模糊。第二，不处理 fake transport packet renderer，因为它属于 fake transport 安全叙事，和 shard readiness 的前置证据消费不同，后续应单独收尾。第三，不改 loader、profile type、route 注册、access guard、fixture、历史 fallback 或测试期望。renderer 只负责把已有 profile 显示成 Markdown，本版严格保持这个职责边界。

这不是为了凑 batch 数量而动三个文件。v2124 收掉 minimal read-only integration 后，剩余未迁移 renderer 已经进入尾项阶段；继续把不同形态混在一个大提交里，反而会让审查困难。v2125 单独拿 shard readiness family，是为了在真实分片联合执行前，把“证据消费”和“归档验证”的报告层先压薄。这样下一阶段讨论 live preview 或真正 shard execution 时，代码审查能聚焦合同、启动约束、端口清理和 operator approval，而不是在数十个重复 renderer 外壳里找风险字段。

## Entry Points / 入口

本版保留三个 public export 入口名不变。route 层仍调用 `renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationMarkdown` 和 `renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationMarkdown`。它们接收同样 profile，返回同样 Markdown 字符串。对外部调用者而言，函数签名、文件路径、路由行为和响应内容都没有变化。

入口不变的意义很实际。archive verification route 的测试不仅检查 JSON 字段，也会检查 Markdown content-type 和关键片段。若入口移动或函数名变化，route table、import 路径和审查习惯都会被迫跟着变。v2125 没有做这种无收益移动，而是在函数内部把手写数组改成 declarative spec：title 放在 `title` 字段，meta 行放在 `meta` tuple 列表，section 顺序放在 `sections` 数组。这样 diff 显示的是“这个报告由哪些字段组成”，而不是一长串模板拼接。

三个入口虽然都属于 shard readiness，但历史节点不同，所以 v2125 没有把标题或 meta 字段进一步抽象成统一函数。live-read archive verification 的 meta 有 `Sends managed audit HTTP/TCP`，evidence consumption 有 `Forced Historical Fallback Replay` section，regular gate 有 `Ready for Node v376 Java/mini-kv shard evidence consumption`。这些差异说明它们处于不同证据阶段。共享 builder 负责排版，不能把不同阶段压扁成同一个业务模型；否则读者会失去判断版本流向和安全边界所需的上下文。

入口层还体现了本版的“只薄化，不扩张”。没有新增 renderer 文件，没有新增 route，没有新增 service，也没有新增测试期望。迁移后三个文件分别是 61 行、63 行和 88 行，仍然能在一个屏幕里看清主要字段。对后续维护者来说，这种入口是可读的：先看 meta 判断报告身份，再看 sections 判断内容组成，最后看本地 helper 是否表达了特殊业务结构。相比旧实现的 80 到 120 行数组拼接，新的阅读路径更短，也更少遗漏。

## Response Model / 响应模型

响应模型仍是 Markdown，字节级输出保持不变。标准 section 继续走 builder 的四种表达：entries、messages、list、lines。`Source Node v376`、`Source Node v374`、`Source Node v371`、`Archive Verification`、`Checks` 和 `Summary` 都是 entries；`Production Blockers`、`Warnings`、`Recommendations` 都是 messages；`Next Actions` 是 list；`Archive References` 是 raw lines，并由 `renderVerificationArchiveFileReferenceLines` 统一生成 `- path: exists=...; bytes=...; digest=...` 格式。

minimal shard readiness live-read archive verification 多了两个特殊 section：`Archived Java Live Read` 和 `Archived mini-kv Live Read`。它们不是普通 entries，因为需要在缺失时输出 `- missing`，存在时按固定顺序列出 project、sourceVersion、status、attempted、transport、endpoint、command、required fields、readOnlySafe、executionBlocked、compatibleWithV370Evidence、boundarySafe 和 readyForGate。这个顺序是读者判断只读观测安全性的线索，不能被随意扁平化。

因此，v2125 保留 `renderLiveRead` 为本地函数。它的输出作为 `{ heading: "...", lines: renderLiveRead(...) }` 进入 builder。这个决定和前几版的原则一致：通用排版归 builder，具体业务行生成留在拥有该业务语义的 renderer 附近。若把 live-read observation 也抽成全局 helper，短期会再少几行代码，但它会把 Java/mini-kv archived read 的字段顺序固定到全局工具里，未来其它报告若只需要其中一部分字段，就会被迫复用一个语义不准确的 helper。

archive references 的处理则适合共享。三个 renderer 的 file reference 都是 path、exists、byteLength、digest 这组字段，旧实现只是类型名不同，行格式完全一样。v2125 删除了三个本地 `renderArchiveFileReferences`，改为复用 `renderVerificationArchiveFileReferenceLines`。字段列表仍由每个 renderer 显式列出，所以哪个报告包含 jsonEvidence、markdownEvidence、summaryEvidence、browserSnapshot、htmlArchive、screenshot、explanation、codeWalkthrough、sourcePlan、plansIndex、archiveIndex 仍然一眼可审查。

这种响应模型的边界很重要。builder 不是新的业务层，也不判断 ready flag，不修正文案，不补齐缺失证据。它只保证报告结构一致：标题、空行、meta bullet、section heading、section body、末尾换行。业务数据仍来自 loader，安全判断仍来自 profile，route 安全仍由 access guard 和 app wiring 保证。v2125 的 exact compare 证明这个边界没有被突破。

## Upstream Evidence and Config / 上游证据与配置

v2125 不需要 Java 或 mini-kv 提供新证据，也不需要读取 live endpoint。它消费的是 Node 仓库里已经冻结的归档 profile 和历史 fixture，测试配置仍使用 `UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`、`ACCESS_GUARD_ENFORCEMENT_ENABLED=true`。renderer 本身不读取配置、不打开 socket、不解析 raw endpoint、不请求 credential value。所有 starts/stops/connects/executionAllowed 等字段都只是 profile 中的只读值。

这一点关系到三项目并行。Java 和 mini-kv 仍然是 recommended parallel，可以按各自 playbook 做 CI、coverage、lint、文件拆分或文档整理，不需要等待 Node v2125。Node 本版也不会写回它们的 repo。当前工作树里 Java / mini-kv playbook 存在其它会话留下的改动，v2125 不 stage、不回滚这些文件，避免三项目同时推进时互相污染。只有未来 Node 真的需要 fresh Java/mini-kv evidence、live service startup、端口分配或合同字段变更时，才应把它们列为阻塞前置。

从真实分片联合执行的距离看，v2125 仍属于前置工作，而不是执行能力本身。它把 shard readiness 报告层变薄，是为了让后续设计 live preview 时，工程注意力放在启动拥有者、清理责任、只读窗口、批准头、失败关闭和证据快照上。若报告层继续由大量重复 renderer 堆积，审查者很难区分“已归档证明”与“实时执行能力”。v2125 的价值就在于降低这种误读风险。

历史 fallback 也没有被改动。Java/mini-kv shard evidence consumption archive verification 仍保留 `Forced Historical Fallback Replay` section，旧的 fallback replay ready、historical snapshot path、check count 等字段仍由 loader 生成。renderer 只是把这个 section 写成 `{ heading: "Forced Historical Fallback Replay", entries: ... }`。这保证 GitHub runner 或缺少 sibling workspace 的环境仍然依赖原有历史 fixture 行为，而不会因为展示层重构改变兼容性判断。

## Service Flow / 服务流程

服务流仍是 route 调 loader，loader 读归档和 fixture 构造 profile，renderer 把 profile 渲染成 Markdown。旧代码在每个 renderer 里手写一个数组，数组中交替出现标题、空行、meta 行、section heading、`renderEntries`、`renderMessages`、`renderList` 和本地 archive reference helper。新代码把这些拼接规则交给 builder，renderer 只提供 spec。执行路径更短，但输出路径没有变化。

以 evidence consumption renderer 为例，旧实现先输出标题和 16 条 meta，然后输出 Source Node v376、Forced Historical Fallback Replay、Archive Verification、Archive References、Checks、Summary、Production Blockers、Warnings、Recommendations、Next Actions。新实现的 sections 列表保持同样顺序。最容易出错的地方是 Forced Historical Fallback Replay 位置和 Archive References 字段顺序，exact compare 已覆盖这两点，route 测试也继续检查 forced fallback 相关片段。

regular gate renderer 更接近标准形态，迁移后几乎只剩 title、meta 和 sections 列表。它没有特殊本地 helper，因此删除本地 archive reference formatter 后，文件从旧的手写数组变成一个紧凑报告规格。这个形态对后续 Phase-B 合并很有价值：如果未来某些 archive verification service 与 renderer 可以折回更通用的 catalog，reviewer 能快速确认它是否真的只是同形报告，而不需要逐行辨认模板噪声。

live-read renderer 则展示了 builder 的使用边界。它保留 `renderLiveRead`，因为 archived Java / mini-kv live read observation 是独有业务格式。这个函数返回 raw lines，并没有改变 nested bullet 的内容或缺失值策略。这样做让 renderer 文件仍然比旧版短，但保留足够业务上下文：读者能直接看到 endpoint、command、required fields、readOnlySafe、executionBlocked、boundarySafe 等字段是怎样进入 Markdown 的。对真实执行前的只读观测来说，这些字段比抽象整洁更重要。

三文件合计 diff 是 163 行新增、247 行删除，净减少 84 行。减少的主要是重复模板和三个本地 archive reference helper；新增的主要是 builder spec 的 tuple/section 表达。这个比例说明本版不是把代码藏到另一个大文件里，而是复用已存在 builder，把每个 renderer 的职责收缩到“声明本报告的字段与段落”。共享 builder 本身没有新增功能，因此不会扩张全局复杂度。

## Safety Boundary / 安全边界

安全边界的第一层是行为不变。v2125 没有改 profile 生成逻辑，没有改 ready flag，没有改 production blocker，没有改 recommendation，没有改 access headers，也没有改 route 注册。所有 executionAllowed、startsJavaService、startsMiniKvService、stopsJavaService、stopsMiniKvService、connectsManagedAudit、sendsManagedAuditHttpTcp、credentialValueRead、rawEndpointUrlParsed 等字段仍由原 loader 判断。renderer 只显示这些值，不根据它们做任何动作。

第二层是输出不变。archive verification Markdown 是审计材料的一部分，不能因为“只是重构”就悄悄改变标签、空行或字段顺序。v2125 用临时 Vitest 从 `git show HEAD` 读取旧 renderer 源码，改写 import 后与当前 renderer 运行同一个真实 profile，并断言字符串完全一致。3/3 通过后，才把本版视为可归档。这比只跑 route 片段断言更可靠，因为片段断言通常不会覆盖每个 archive reference、每个空态文案和末尾换行。

第三层是批次边界。剩余的 runtime execution pass evidence 和 fake transport packet 没有被顺手加入本批。runtime pass evidence 的 archive references 是结构化 entries 展开，fake transport packet 的语义和 fake transport 安全隔离相关；它们都值得单独验证。把它们留到后续版本，看似少迁移了两个文件，但让每个版本的工程理由更清楚，也避免一次提交包含三种不相关安全故事。

第四层是工作树和进程边界。本版没有启动 Node HTTP 服务、Java 服务、mini-kv 服务或浏览器自动化，不存在需要保留的后台进程。临时 exact compare 文件位于 `.tmp`，提交前应删除；build 产物 `dist` 也应删除。Java / mini-kv playbook 的外部改动不属于 v2125，提交时必须排除。这个边界让 Node commit 可以独立审查，也让其它会话继续推进自己的 repo。

## Test Coverage / 测试覆盖

本版验证分为四层。第一层是 `npm run typecheck`，确认 builder spec、archive reference helper、live-read 本地 lines 和三个 profile type 的结构兼容。第二层是 focused tests：`verificationReportBuilder.test.ts`、`governanceGrowthRatchet.test.ts`、三个 shard readiness archive verification 测试，共 5 个测试文件、14 个用例。它覆盖 route Markdown、JSON profile、失败关闭、历史 fallback replay、安全字段和 service/route 增长约束。

第三层是 byte-identical compare。临时测试把迁移前 renderer 当作 legacy module 加载，并对三份真实 profile 分别比较旧输出和新输出。这里覆盖的风险和 focused tests 不同：focused tests 证明业务通路仍然工作，byte-identical compare 证明报告文本没有任何字符漂移。对 archive renderer 重构来说，两者缺一不可。没有 focused tests，可能错过 fail-closed 或 route wiring；没有 exact compare，可能错过空行、大小写、section 顺序这类审计材料细节。

第四层是收尾 gate：文档质量扫描、explanation readability gate、route quality gate、lint、build。文档质量扫描要求本篇中文讲解达到当前标准，并且不使用被禁用的旧标题。lint 的已知 warning 基线不在本版清理范围内，本版只要求不引入 error。build 则确认迁移后的源码能进入生产构建。完成这些 gate 后，v2125 才适合提交、打 tag，并等待远端 CI。

测试设计还刻意避免全量大批量 Vitest。此前大型测试进程曾造成 Node worker 过多和内存压力，所以本版先跑 focused batch，再跑 exact compare，再跑文档/lint/build。这个顺序既能快速定位问题，也符合当前项目的 timeout triage 规则。若后续需要全量测试，应在多个版本之后或 CI 中承担，而不是每个 renderer batch 都在本地启动庞大并发。

从覆盖结果看，v2125 达到了“薄化实现但不改变读者看到的证据”的目标。三个 renderer 输出逐字节一致，route tests 继续通过，governance ratchet 确认没有新增 service/route 文件。剩余尾项已经缩小到两类不同形态：runtime execution pass evidence 和 fake transport packet。下一版可以围绕这两个尾项收束 N1，而不是继续在 shard readiness 中反复清理同一种模板。

## One-sentence Summary / 一句话总结

v2125 把三个 shard readiness archive verification renderer 迁移到共享 verification report builder，在保留 live-read observation 本地行生成、复用 archive-reference helper、并证明 Markdown 输出逐字节一致的前提下，继续压薄真实分片联合执行前的证据展示层。
