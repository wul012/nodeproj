# v2135 renderer consolidation batch 18 / 渲染器骨架收口第18批

## Goal and Non-goal / 目标与非目标

v2135 继续做 N1 renderer consolidation，但这次的目标不是把所有相邻文件一网打尽，而是迁移两个能够稳定映射到 `verificationReportBuilder` 的完整报告：`managedAuditIdentityApprovalProvenanceDryRunPacket.ts` 和 `managedAuditExternalAdapterConnectionReadinessReview.ts`。前者是 identity approval provenance dry-run packet，承接 Node v210 binding contract、Java v75 handoff hint 和 mini-kv v84 retention provenance；后者是 external adapter connection readiness review，承接 Node v222 verification report、Java v81 migration guard 和 mini-kv v90 non-participation guard。它们都具有标准报告骨架：顶层标题、meta、证据 section、checks、summary、blockers、warnings、recommendations、evidence endpoints 和 next actions。

非目标同样明确。v2135 不改 loader，不改 route，不改 profile type，不改历史 fixture，不启动 Java，不启动 mini-kv，不打开 managed audit 的真实连接，不读取真实 credential，也不把任何生产执行开关改成放行。`managedAuditPacketRestoreDrillPlan.ts` 这次也没有迁移，因为它的旧 Markdown 在 `Drill Steps`、`Forbidden Operations`、`Checks` 之间使用紧凑无空行连接，而当前 builder 的 section 间隔规则天然会插入空行。为了一个单例去扩展 builder，会让公共工具背上不必要的格式特例，所以本版把它留作后续边界决策，而不是硬塞进来凑数量。

## Entry Points / 入口

第一个入口是 `renderManagedAuditIdentityApprovalProvenanceDryRunPacketMarkdown(profile)`。调用方仍然给它 `ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile`，它仍然返回完整 Markdown 字符串。这个 profile 由 `loadManagedAuditIdentityApprovalProvenanceDryRunPacket` 生成，里面已经包含 source binding contract、Java v75 evidence、mini-kv v84 evidence、dry-run packet、verification、checks、summary 和消息列表。迁移后，render 函数不再手写 `return [ ... ].join("\n")`，而是把同样的标题、meta 和 sections 交给 `renderVerificationReportMarkdown`。

第二个入口是 `renderManagedAuditExternalAdapterConnectionReadinessReviewMarkdown(profile)`。它继续接收 `ManagedAuditExternalAdapterConnectionReadinessReviewProfile`，继续服务 `/api/v1/audit/managed-audit-external-adapter-connection-readiness-review?format=markdown` 这类 Markdown route。这个报告更接近 v2134 的 local adapter candidate，因为它有 archived evidence files 和 snippet matches。迁移后，本地的 `renderEvidenceFile` 与 `renderSnippet` 仍然保留，只是它们的输出被作为 builder 的 `lines` section 投入，而不是直接拼在手写数组里。

## Response Model / 响应模型

这两个 renderer 的响应模型现在都变成声明式 spec。`title` 对应原来的第一行 `# ...`；`meta` 对应原来的顶层 bullet；`sections` 对应每个 `##` 标题下的内容。对象型内容使用 `{ heading, entries }`，message 型内容使用 `{ heading, messages, emptyText }`，next actions 使用 `{ heading, list, emptyText }`，已经生成好的 Markdown 行使用 `{ heading, lines }`。这个模型让报告结构一眼可见，也减少了后续维护者在长数组里数空行、找 section 顺序的成本。

dry-run packet 报告是最规整的形态：`Source Binding Contract`、`Java v75 Evidence`、`mini-kv v84 Evidence`、`Dry-run Packet`、`Verification`、`Checks`、`Summary`、`Evidence Endpoints` 都是 entries section，三类消息和 next actions 也都是 builder 已有能力。external adapter readiness 报告稍复杂：`Evidence Files` 和 `Snippet Matches` 不是普通对象展开，而是分层小标题和字段行，所以仍由本地 helper 负责生成。builder 只负责放置这些行，不解释它们的业务含义。

## Upstream Evidence and Config / 上游证据与配置

v2135 没有新增上游证据需求。dry-run packet 报告里的 Java v75 和 mini-kv v84 都来自已有历史证据投影，external adapter readiness 报告里的 Java v81 和 mini-kv v90 也来自已有 guard receipt 或 fixture。Node 在本版没有请求新 Java 文件，也没有要求 mini-kv 生成新 receipt。换句话说，本版迁移的是“怎么展示已经存在的 profile”，不是“怎么获得新的跨项目证据”。

配置边界也没有变化。`UPSTREAM_ACTIONS_ENABLED` 仍然可以让 profile 进入 blocked 状态，`UPSTREAM_PROBES_ENABLED` 不会因为 renderer 迁移而被打开，access guard 的 header 要求仍然由 route 层承担。Java / mini-kv 可以继续按自己的 production-excellence playbook 并行推进，因为 v2135 没有 schema、route、契约、live integration 或 fresh evidence 的变更。Node 在这里不是 sibling project 的批准门，只是把自己的 Markdown 报告外框变得更可维护。

## Service Flow / 服务流程

服务流程仍然保持 loader 到 renderer 的单向关系。以 dry-run packet 为例，route 或测试先调用 loader；loader 构造临时 dry-run packet、确认 append/query/digest/cleanup、读取 binding contract 与历史上游投影，然后生成 profile。renderer 接到 profile 后只做投影，把 source binding contract、Java v75 evidence、mini-kv v84 evidence、dry-run packet、verification 和 checks 按原顺序写成 Markdown。它不重新执行 dry-run，也不重新计算 digest，更不会访问真实上游。

external adapter readiness 的流程也一样。loader 先读取 Node v222 的本地 adapter candidate verification report，再组合 Java v81 guard、mini-kv v90 guard、connection readiness、archived evidence files 和 snippet matches。renderer 接到 profile 后，把标准外框交给 builder，把 evidence/snippet 行交给本地 helper。这个分层避免了两个方向的误解：一方面，builder 不负责找证据；另一方面，本地 helper 不再负责重复报告外框。后续排查时，如果字段值不对，看 loader；如果 section 顺序不对，看 renderer spec；如果空行规则不对，看 builder 或本地 line section 的尾空行处理。

## Safety Boundary / 安全边界

本版最关键的安全边界是“展示不等于执行”。dry-run packet 中 `localDryRunWritePerformed` 仍然只是本地临时目录写入，`executionAllowed` 仍然不是放行真实审计系统。external adapter readiness 中 `connectsManagedAudit`、`readsManagedAuditCredential`、`schemaMigrationExecuted`、`automaticUpstreamStart` 仍然保持关闭。报告可以说明 owner approval、schema migration review、credential review 仍然需要，但不会替用户补齐这些批准，也不会替 Java 或 mini-kv 执行任何动作。

另一个边界是 builder 不为单例特化。restore drill plan 目前没有迁移，就是因为它的 step 和 forbidden operation section 与标准 builder 间隔不完全一致。如果为了它新增“无空行 section”开关，短期能多迁一个文件，长期却会让 builder 的公共契约变得含糊。v2135 选择暂缓它，是为了保持公共抽象的克制：只有当多个剩余 renderer 共享同一种紧凑 section 语法，并且逐字节对比能证明迁移稳定时，才值得扩展 builder。

## Test Coverage / 测试覆盖

本版验证分三层。第一层是 `npm run typecheck`，证明两个文件的 import 收敛、builder spec 和 profile 字段都能通过类型检查。第二层是 focused tests：`test/managedAuditIdentityApprovalProvenanceDryRunPacket.test.ts` 与 `test/managedAuditExternalAdapterConnectionReadinessReview.test.ts`，共 6 个测试，覆盖 ready、blocked、JSON route、Markdown route，以及 dry-run cleanup、external adapter no-connection、snippet match 等关键断言。第三层是临时逐字节对比测试，它从 `git show HEAD:<path>` 取旧源码，在 VM 里转译旧 renderer，用 ready 和 blocked profile 分别比较旧输出和新输出。

逐字节对比特别重要，因为本版有 evidence/snippet 行。external adapter readiness 的 helper 会在每个 evidence/snippet 块末尾放空行，而 builder 自己也会在 section 之间放空行，所以迁移时必须像 v2134 一样去掉整体最后一个尾空行。临时测试通过说明这个处理是对的：条目之间的空行保留，最后一个条目和下一个 section 之间的空行由 builder 提供，最终 Markdown 与旧实现完全一致。

## Maintenance Decision / 维护决策

v2135 的维护决策可以分成三条。第一，dry-run packet 是标准完整报告，可以直接迁入 builder。第二，external adapter readiness 是完整报告加本地证据行，可以迁入 builder，但本地行 helper 保持原位。第三，restore drill plan 虽然也是完整报告，但它的局部 section 间隔不符合当前 builder 契约，因此暂缓。这三条把“能不能迁”的标准写得更细，后续版本不用靠猜。

这也解释了为什么本版数量只有两个。一个高质量版本不是把更多文件推过同一个补丁模板，而是把边界判断讲清楚、验证做足、不给公共工具增加未来会后悔的参数。N1 的价值是减少重复报告外框，不是把所有 Markdown 生成都折叠成同一个函数。保持这个边界，后续靠近真实分片执行时，报告层、审批层、执行层才不会混在一起。

## Code Change Details / 代码变更细节

dry-run packet 文件的代码变化最集中：原来 import 了 `renderEntries`、`renderMessages`、`renderList`，现在这些报告排版能力由 `renderVerificationReportMarkdown` 接管。函数主体从手写数组变成 spec 后，meta 行被显式列成键值对，section 也按原顺序列成数组。这个写法让“报告有哪些段落”比以前更清楚，同时也减少了未来修改某个空文案时漏改相邻报告的风险。值得注意的是，`sha256StableJson`、`countReportChecks`、`countPassedReportChecks` 这些 loader 需要的工具仍然保留，说明本版没有把数据计算逻辑移走。

external adapter readiness 文件的变化更有代表性。它既迁移了标准外框，又保留了 `renderEvidenceFile` 和 `renderSnippet`。这两个 helper 不是普通对象展开，因为它们要给每条 evidence 或 snippet 生成三级标题，再列出 path、exists、sizeBytes、digest 或 expectedText。迁移时只新增了一个很小的 `removeTrailingBlankLine`，目的不是改变样式，而是让本地 helper 的尾空行和 builder 的 section 间隔刚好衔接。这个函数留在本文件里，是因为它服务的是当前 evidence/snippet 行契约，不应该让全局 builder 承担这个历史格式细节。

这两个文件的共同点，是 render 函数现在都呈现“先 meta、后 sections”的平面结构。维护者要新增一个 section 时，可以在 sections 数组里清楚地看到插入点；要确认某个 route 是否仍然展示 warnings，也能直接看到 message section 的 emptyText。相比旧数组，新的结构减少了“视觉上像 Markdown，实际上难以审查”的问题。

## Restore Drill Plan Defer Reason / restore drill plan 暂缓原因

restore drill plan 暂缓的核心原因是字节契约。旧实现里 `renderStep` 和 `renderForbiddenOperation` 返回的行没有尾部空字符串，数组拼接时 `Drill Steps` 后面直接接 `## Forbidden Operations`，`Forbidden Operations` 后面直接接 `## Checks`。这种格式虽然不是最常见的报告间隔，但它已经成为旧输出的一部分。当前 builder 的设计则是在每个 section 前插入一个空行，让标准报告保持清晰段落。这两个规则不完全相同。

有两个做法看似可行，但都不够好。第一种是在 builder 里加一个“不要在下一个 section 前放空行”的选项；这样能迁 restore drill plan，却会让公共 API 立刻多一个很难命名、很难解释的格式参数。第二种是把 `## Forbidden Operations` 和 `## Checks` 都塞进上一个 `lines` section 的原始字符串里；这样虽然字节一致，但等于绕开 builder 的 section 模型，迁移后反而更难读。v2135 选择第三种：先不迁它，把原因写进计划和 summary，等未来看到更多紧凑 section 报告时再决定是否扩展 builder。

这个判断很符合后期工程保养的原则。抽象不是越多越好，迁移也不是越快越好。当前 builder 已经覆盖了大量完整报告，说明主路径是对的；但遇到边界特例时，应该先保留清晰事实，而不是为了版本数字把公共工具变复杂。后续 reviewer 看到这个暂缓记录，就知道 restore drill plan 是有意留下的，不是扫描遗漏。

## Future Scan / 后续扫描

下一轮扫描可以继续沿着三类线索走。第一类是完整报告且 section 间隔标准的文件，它们通常有 `## Checks`、`## Summary`、三类 message 和 `## Next Actions`，最适合直接迁移。第二类是完整报告但包含本地 evidence/snippet/requirement rows 的文件，它们也可以迁，但必须先检查 helper 是否自带尾空行、是否需要像本版一样去掉整体尾空行。第三类是输出形态不标准的文件，比如 worksheet、approval template、command package 或 compact drill plan，它们需要先做边界评估，不能直接套 builder。

从生产级分片执行的前置工作看，这种扫描顺序更稳。先把报告层重复外框清掉，后续真正要检查 approval packet、runtime input、shard preview 或 live read window 时，reviewer 能更快分辨“这是一份只读证据报告”还是“这是一份执行输入材料”。等报告层足够整齐，再去推进真实执行前置，风险会更低。

## Review Notes / 审阅要点

审阅 v2135 时，最值得看的不是行数减少了多少，而是三个边界是否成立。第一，两个 migrated renderer 的 meta 文案和 section 顺序是否与旧版一致；这个由逐字节对比兜底，但人工审阅仍可快速扫 sections 数组。第二，external adapter readiness 的 evidence/snippet 行是否仍然保留 `### id`、path、exists、sizeBytes、digest、matched、expectedText 这些字段；这说明本地证据语义没有被 builder 吞掉。第三，restore drill plan 的暂缓说明是否足够具体；如果后续有人要迁它，必须先处理紧凑 section 间隔，而不是直接照搬本版补丁。

还有一个小但实用的审阅点：本版没有新增测试期望，也没有改 route 测试，只新增临时对比测试作为迁移验证。这说明迁移是针对实现重复，不是为了让断言适配新输出。临时测试会在提交前清理，不进入仓库；归档 JSON 保留它的命令和结论，方便后续复盘。

如果以后看到类似的 renderer，审阅时也可以沿用这套问题清单：它是不是完整报告，是否有标准 message section，是否存在本地行 helper，helper 是否暗含空行契约，迁移后是否仍能用同一个 profile 做旧新输出对比。只要这几个问题能回答清楚，后续批次就会更像工程保养，而不是机械搬运。

这份记录也提醒后续不要把“暂缓”当成失败。能说明暂缓原因，并把继续推进的条件写清楚，本身就是生产前治理的一部分。

这样的节奏比盲目扩大迁移面更可靠，也更容易让后续审阅者信任每个版本的边界。

边界清楚，后面的真实执行准备才有稳固基础。

这也是本版的主要价值。

## One-sentence Summary / 一句话总结

v2135 把 identity approval provenance dry-run packet 和 external adapter connection readiness review 两个完整报告迁入 `verificationReportBuilder`，保留本地 evidence/snippet 语义，暂缓不符合标准 section 间隔的 restore drill plan，并用 typecheck、focused tests 和逐字节对比确认输出不变。
