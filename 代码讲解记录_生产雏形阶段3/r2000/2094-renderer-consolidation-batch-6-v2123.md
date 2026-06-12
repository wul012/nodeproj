# v2123 renderer consolidation batch 6

## Goal and Non-goal / 目标与非目标

v2123 的目标是收掉 sandbox handle review 这一小族 archive verification renderer。它们分别对应 prerequisite intake、contract decision、packet/gate non-secret intake、packet/gate decision record、prerequisite closure review，来源版本从 Node v354 到 Node v362，目标状态都是只读归档验证。旧实现的共同形态非常明显：每个文件都手写同一套 markdown 数组，开头是标题和 meta bullet，中间是 Source Node、Archive Verification、Archive References、Checks、Summary，最后是 Production Blockers、Warnings、Recommendations、Next Actions。唯一的小差异是 source 节标题、ready flag 文案和 profile 字段名。v2123 把这些差异保留在各自 renderer 的 builder spec 里，把重复外壳交给 `renderVerificationReportMarkdown`。

本版还有一个比 v2121、v2122 更进一步的小重构：五个 renderer 原本都带有一个完全同形的 `renderArchiveFileReferences` 本地 helper，输出格式都是 `- path: exists=...; bytes=...; digest=...`。如果只把 helper 原样留在每个文件里，迁移虽然能完成，但维护面仍然重复。v2123 因此把这个行渲染抽到 `verificationReportBuilder.ts`，命名为 `renderVerificationArchiveFileReferenceLines`，并在 `test/verificationReportBuilder.test.ts` 增加空 digest 输出 `missing` 的覆盖。这个 helper 没有改变 builder 的 section 模型，它只是生成 raw lines，仍由 renderer 明确决定哪些 archive references、按什么顺序进入报告。

这个选择的必要性在于它解决的是“同形重复”，不是制造新的治理层。五个本地 helper 的代码虽然每个只有几行，但它们分散在五个长文件里，后续如果要统一 archive reference 文案、检查 digest 缺失表现、或把已迁移 renderer 折回 service，审查者必须确认五处是否完全一致。抽成一个小 helper 后，重复点只剩调用处的 reference 顺序，而顺序恰好是各 renderer 应该自己表达的业务内容。也就是说，本版没有把差异藏起来，只把不该重复的字符串格式收起来。

非目标同样清楚。第一，本版不处理 minimal read-only integration 相关 renderer，因为那些文件虽然也有 archive reference helper，但 section 形态、source 字段和 gate 语义更杂，应该作为下一族单独迁移。第二，本版不处理 runtime execution pass evidence，因为它的 archive references 使用 `flatMap(renderEntries)` 展开，不是本版新增 helper 能表达的普通 file-reference 行。第三，本版不处理 fake transport packet，它只有一个 renderer，但证据语义和 managed audit connection fake transport 更接近，应留给后续独立判断。第四，本版不改 route、loader、profile type、测试期望、访问控制或上游证据 schema，也不 touch Java / mini-kv 仓库。

## Entry Points / 入口

本版保留五个 public renderer export 的函数名、文件名和参数类型。route 层继续调用 `renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMarkdown` 和 `renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMarkdown`。这些入口仍然只接收 loader 已经组装好的 profile，然后返回 markdown string。

入口保持不变的意义在于把风险固定在展示层。测试里仍然通过现有 audit route 访问 JSON 和 Markdown，loader 仍然从本地 d/354、d/356、d/358、d/360、d/362 归档读取证据，profile 的 ready flag、state、decision、summary 仍由原服务代码计算。renderer 只把 profile 的字段按旧顺序映射出来。这样一来，如果未来某个 route 的输出出现差异，排查路径会很短：profile 值问题看 loader，字符串排版问题看 builder，字段选择和 section 顺序问题看对应 renderer spec。

五个入口的 meta 行顺序全部照旧保留。sandbox handle family 的 meta 很密集，包含 Archive verification state、Archive verification decision、Active Node version、Source Node version、Ready for next Node step、Archive verification only、Reruns live probe、Starts Java service、Starts mini-kv service、Connects managed audit、Sends managed audit HTTP/TCP、Credential value requested/read、Raw endpoint URL requested/parsed、Secret provider/resolver client instantiated、Runtime shell implemented/invocation allowed、Execution allowed。对治理型报告来说，这些行不是装饰，而是安全边界的第一屏摘要，所以 v2123 没有自动枚举 profile，也没有按字母序重排。

## Response Model / 响应模型

响应模型仍是完整 markdown 文本，旧输出和新输出必须逐字节一致。`renderVerificationReportMarkdown` 负责统一输出 `# title`、meta bullet、空行、`## heading` 和各 section body。entries section 继续走 `renderEntries`，messages section 继续走 `renderMessages`，list section 继续走 `renderList`，archive references 则由 `renderVerificationArchiveFileReferenceLines` 先变成 raw lines，再作为 `{ heading: "Archive References", lines: [...] }` 交给 builder。这个模型把“怎么排版”和“选择哪些业务字段”分开，renderer 文件不再承担空行和标题拼接细节。

本版抽出的 archive helper 很克制。它接收的结构只有 `path`、`exists`、`byteLength`、`digest`，输出仍然是旧本地 helper 的固定行格式。它没有认识 sandbox handle，没有读取 profile，没有过滤 archiveReferences，也没有决定顺序。顺序仍由每个 renderer 明确列出：jsonEvidence、markdownEvidence、summaryEvidence、browserSnapshot、htmlArchive、screenshot、explanation、codeWalkthrough、sourcePlan、plansIndex、archiveIndex。这样抽象边界比较干净：共享 helper 只消灭字符串格式重复，不把业务规则吸进通用层。

这里最容易走偏的是把 archive references 做成一个更大的自动化配置，例如传入整个 `profile.archiveReferences` 后自动 `Object.values`。v2123 没这么做，因为对象字段顺序虽然在当前 JavaScript 运行时通常稳定，但它不是报告合同里最值得依赖的表达方式。显式列出 11 个 reference 字段更笨一点，却更适合这个阶段：代码审查能直接看到哪个证据文件在报告里、顺序是否沿用旧实现、有没有把 sourcePlan 或 archiveIndex 漏掉。共享 helper 只处理单行格式，避免把“列哪些文件”也变成隐式行为。

这一点也保护了后续批次。minimal integration、shard readiness 或 fake transport 如果有相同 file-reference 行格式，可以复用 helper；如果它们需要 `flatMap(renderEntries)`、条件过滤或额外字段，就不应该硬套这个 helper。也就是说，v2123 没有让共享 builder 变成大而全的报告框架，而是在已有 builder 旁边补了一个非常小的行格式函数。它降低重复，却没有扩大自动化决策范围。

## Upstream Evidence and Config / 上游证据与配置

v2123 不需要 Java 或 mini-kv 新产物。五个 profile 使用的都是 Node 仓库内已经冻结的 sandbox handle 归档，renderer 不会打开 sibling workspace，不会启动服务，也不会进行真实 managed audit 连接。配置仍然保持 `UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`、测试路由访问需要完整的 operator/role/approval headers。renderer 本身不读取这些配置；配置只影响 loader 和 route 测试环境。

跨项目结论仍然是 Java 和 mini-kv recommended parallel。Node 本版做的是本仓库展示层维护，不改变 evidence schema，不改变 route path，不要求 upstream live integration，不要求别的项目写回 Node。Java 和 mini-kv 可以继续按各自 playbook 推进 CI、coverage、lint、文件拆分或本地治理，不需要等待 v2123。只有当 Node 后续版本需要新的 Java/mini-kv 证据、需要真实服务启动顺序、或者要改跨项目合同字段时，才应在计划里把另外两项目列为前置。

从三项目统筹角度看，v2123 是一个典型的“Node 自己消化历史外壳”的版本。它不会让 Java 或 mini-kv 的当前分支变得更难合并，也不会让它们必须生成新的归档给 Node 消费。相反，Node 越早把这些只读报告 renderer 变薄，后面真正接近分片联合执行时，跨项目合同层会更容易被看见：哪些字段来自历史归档，哪些字段来自 live preview，哪些字段仍然只是安全阻断说明。这个区分比单纯增加版本数量更重要。

这个边界也解释了为什么本版没有截图。旧报告虽然引用 screenshot、browser snapshot、HTML archive 等文件，但 v2123 只是重构 markdown renderer，不重新生成历史归档页面，也不改变截图文件。对这种展示层迁移，逐字节 compare 比重新截图更强：它直接证明整个 markdown 字符串没有变化，包括空行、末尾换行、空态文本和 archive reference 行。截图只能证明某个浏览器渲染大致相似，不能覆盖所有字符串细节。

## Service Flow / 服务流程

服务流从 route 到 loader 到 renderer 保持原样。以 prerequisite intake 为例，route 收到 markdown 请求后，loader 读取 d/354 归档并生成 profile；旧 renderer 用数组手写每一行，新 renderer 声明同样的 title、meta、sections，然后调用 builder。contract decision、packet/gate intake、decision record、closure review 也是同样模式，只是 source 节从 v354、v356、v358、v360、v362 逐步前进，ready flag 指向下一步不同节点。

旧实现的问题不是功能错，而是长期维护成本高。五个文件各有九十行左右，绝大多数行只是重复排版骨架。审查者想找真正差异时，需要在标题、空行、helper 调用和 message/list 空态之间来回对照。迁移后，每个文件的差异集中在 meta tuple、source section 字段和 archive reference 顺序上。对后续 N5 来说，这种文件更容易判断是否可以 Phase-B 合并回 service：如果 renderer 只剩一段 builder spec，且 service 文件没有过大，就可以考虑减少独立 renderer 文件数量。

这种“变薄”对后续拆分优化有直接价值。N5 需要处理 unused warnings、noUnusedLocals、以及若干超过八百行的大文件，但当前 ratchet 又限制 service/route 数量不能增长。若 N1 先把一批 renderer 改成清晰 spec，后面拆大文件时就能用 Phase-B 合并抵消新增模块数量。例如一个 service 拆出两个真正有业务职责的 helper 文件，同时折回两个已经 builder 化且很薄的 renderer 文件，项目结构会更合理，文件数量也不会失控。v2123 迁移 sandbox handle 五件套，就是在给这种交换创造筹码。

`verificationReportBuilder.ts` 本身也保持可读。它仍然只有 section union、report spec、主渲染函数、archive-reference 行 helper、section body 分发函数。新增 helper 没有引入依赖，没有跨文件读取，也没有把 builder 扩展成复杂注册表。测试只补了一个直接用例，覆盖 digest 正常值和 digest 缺失时的 `missing` 输出。这样 shared helper 的行为有独立保护，而五个 renderer 的旧输出则由 exact compare 保护。

## Safety Boundary / 安全边界

本版安全边界有四条。第一，不改变行为边界：没有 route、loader、client、config、access guard 或 profile type 变化，`executionAllowed` 继续来自归档 profile，且仍为 false。第二，不改变执行边界：renderer 仍然只渲染字符串，不启动 Java，不启动 mini-kv，不连接 managed audit，不请求 credential value，不解析 raw endpoint URL。第三，不扩大代码增长：没有新增 service/route 文件，`governanceGrowthRatchet` 包含在 focused batch 中。第四，不混入外部状态：当前工作树里已有的 Java playbook 未提交改动与 Node v2123 无关，提交时仍应保持未暂存。

选择五个 sandbox handle renderer，而不是把 minimal integration 一起卷进来，也是安全边界的一部分。minimal integration 是下一段真实只读集成链路的门槛，语义上更靠近 read-only integration gate；sandbox handle review 则是前置审查链条，已经形成同形闭环。把这两类放在同一版本里会让审查者同时判断两组业务边界，反而降低可维护性。v2123 把 sandbox handle 一次收完，让后续剩余列表更清楚：minimal integration、shard readiness、runtime pass evidence、fake transport 各自独立。

剩余列表因此变得更有辨识度。runtime pass evidence 的问题是 `flatMap(renderEntries)`，它需要决定是保留小 helper 还是新增更通用的 entries-list 行生成方式；minimal integration 的问题是 gate、smoke、passed、managed-audit-disabled intake 之间语义相近但字段并不完全同形；fake transport packet 则和 managed audit connection fake transport 的安全叙事绑定更紧。v2123 没有把这些风险提前混入，是为了让下一版计划能写得更具体，而不是在一个大 diff 里用“renderer consolidation”概括所有不同风险。

回滚边界也很干净。若某个 renderer 输出不符合预期，可以只回滚对应 renderer 和 builder helper 使用点；因为 route、loader 和 profile 没变，不需要撤销服务逻辑。若共享 archive helper 有问题，`verificationReportBuilder.test.ts` 会先暴露；若某个 renderer 字段顺序写错，临时 exact compare 会暴露。这个分层比手写数组更稳，因为每一层都有清晰责任和验证方式。

## Test Coverage / 测试覆盖

本版已经完成三层验证。第一层是 `npm run typecheck`，证明新增 helper、五个 renderer 的类型关系和测试 import 都能通过 TypeScript。第二层是 focused batch：`verificationReportBuilder.test.ts`、`governanceGrowthRatchet.test.ts` 加五个 sandbox handle archive verification 测试，共 7 个测试文件、20 个断言。它覆盖 builder 的新 helper、service/route 数量不增长、五个 profile 的 ready flag、失败关闭路径、route JSON/Markdown 暴露和安全字段。

第三层是临时 exact compare。测试从 `git show HEAD:<renderer>` 读取迁移前源码，把旧相对 import 改写到当前 `src/services`，运行旧 renderer，再和当前 renderer 对同一真实 profile 的输出做完整字符串比较。5 个 renderer 全部通过，说明标题、meta label、section heading、archive reference 行、message/list 空态和末尾换行都没有变化。这个验证比 snapshot 更硬，因为它不是复制 expected 文本，而是直接运行迁移前的真实实现。

这个 compare 方法也降低了人为测试期望漂移的风险。如果手写 expected markdown，很容易在迁移时把新实现的输出复制过去，测试就会失去保护意义。现在的临时测试把迁移前实现当作唯一参照，并在运行时加载真实 profile，这等于让旧代码和新代码在同一输入上对照。只要有一个空行、一个 label、一个 digest 缺失文案或一个 reference 顺序不同，测试都会失败。它不进入提交，是因为它只服务本次迁移证明；长期仓库应该保留的是 focused 行为测试和 builder 单元测试。

后续收尾还会跑文档质量 gate、lint、build，并在推送后等待 GitHub Actions 的 Node Evidence CI。lint 的 warning 基线仍是 v2115 的 263 warnings，本版目标不是清 warning，而是把 N1 的 renderer 形态继续压薄。CI 会再次执行 typecheck、lint、test、build、safe smoke、metrics smoke 和 release evidence readiness smoke，作为远端兜底。临时 `.tmp` compare 测试和 legacy renderer 文件只服务本次证明，提交前必须删除。

## One-sentence Summary / 一句话总结

v2123 把 sandbox handle review 五件套迁移到共享 verification report builder，并用一个受测试保护的 archive-reference 行 helper 取代五份本地重复函数，在保持输出逐字节一致和跨项目并行不受阻的前提下，继续为 N1 收尾、Phase-B 合并和 N5 代码健康治理铺路。
