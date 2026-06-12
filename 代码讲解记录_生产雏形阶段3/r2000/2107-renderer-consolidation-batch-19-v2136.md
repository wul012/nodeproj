# v2136 renderer consolidation batch 19 / 渲染器骨架收口第19批

## Goal and Non-goal / 目标与非目标

v2136 继续做 N1 renderer consolidation，但这一次挑的是两个早期、相对规整、又仍然保留少量本地业务行生成的完整报告：`managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.ts` 与 `managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationRenderer.ts`。前者描述“禁用的 adapter client 预检”是否已经定义了 env handle、opt-in gate、failure taxonomy、dry-run response shape 和 reused no-go conditions；后者描述该禁用 client 的上游回声核验，展示 Node v252、Node v253、Java v102 echo 和 mini-kv v111 non-participation 的证据。两者都属于标准报表型 renderer，最上层都是 `# title`、meta、checks、summary、messages、evidence endpoints、next actions，因此很适合被 `verificationReportBuilder` 收口。

非目标也很明确。v2136 不改 loader，不改 route，不改 profile type，不启动 Java，不启动 mini-kv，不放开真实 managed audit 连接，也不把任何执行允许位从 false 变成 true。它仍然只是把“已经算好的 profile 怎么排成 Markdown”这件事做得更统一。`managedAuditPacketRestoreDrillPlan.ts` 依然没有动，因为它的 section 间隔和 builder 的默认 section 间隔存在真实差异；为了一个单例去扩公共 builder 的 spacing 选项，不值得。v2136 选择继续收标准报告，避免过早把工具做胖。

## Entry Points / 入口

第一个入口是 `renderManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckMarkdown(profile)`。这个函数输入 `ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile`，输出完整 Markdown。profile 的来源仍然是 loader，它负责从 Node v251 decision record 派生出 disabled adapter client precheck 的状态，再组合 env handles、opt-in gate、failure taxonomy 和 dry-run response shape。render 函数不再自己拼完整 Markdown，而是把 title、meta、section 和消息列表交给 `renderVerificationReportMarkdown`。

第二个入口是 `renderManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationMarkdown(profile)`。它输入 `ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile`，输出同样完整的 Markdown。这个报告更像一个“升级后的回声核验”：它要说明 Node v252、Node v253、Java v102 echo、mini-kv v111 non-participation、echo verification 和 checks 是如何组合成一个只读报告的。迁移后，render 函数也变成声明式 spec，调用方不需要知道里面用了哪个 section helper，只要知道仍然返回同样的 Markdown。

## Response Model / 响应模型

这两个 renderer 的响应模型现在都变成了清晰的 builder spec。`title` 对应 `# Managed audit ...`，`meta` 对应最上方的条目列表，`sections` 对应所有 `##` 标题段。对象型 section 用 `{ heading, entries }`，message 型 section 用 `{ heading, messages, emptyText }`，列表型 section 用 `{ heading, list, emptyText }`。这种模型比手写数组更容易看出报告结构，也更容易在后续版本里定位边界。

precheck 报告里最值得保留本地语义的是 `Required Env Handles`、`Failure Taxonomy`、`Reused No-Go Conditions` 三块。它们不是普通对象展开，而是需要把原始字段映射成一行字符串，再交给 list section。`formatEnvHandle` 和 `formatFailureClass` 就是为了这层业务文本投影而保留。它们让 reviewer 能一眼看出某个 env handle 为什么必须存在、哪个 failure class 对应哪个拒绝理由，而不是只看见一堆扁平字段。

upstream echo verification 报告更规整一些，但它仍然包含 Node v252 与 Node v253 两个分层证据，以及 Java v102 / mini-kv v111 的双上游 echo。这个结构继续说明：它是历史核验，不是真实执行。builder 负责把这些段落排序正确，本地 loader 负责把版本投影算正确，二者职责清晰分离。

## Upstream Evidence and Config / 上游证据与配置

v2136 没有新增上游证据要求。precheck 报告里的 Node v251 来源、decision record 绑定、required env handles、failure taxonomy，全部还是 loader 在历史证据基础上生成；upstream echo verification 报告里的 Node v252、Node v253、Java v102、mini-kv v111 也都来自既有历史投影，没有引入新的外部调用。换句话说，本版只是在整理“已有证据怎么呈现”，不是要求 sibling project 再产出新证据。

配置方面也没有变化。`UPSTREAM_ACTIONS_ENABLED` 依旧可以把报告打回 blocked，`UPSTREAM_PROBES_ENABLED` 不会因为 renderer 的改动而被打开，access guard 的 header 仍然由 route 层验证。Java / mini-kv 可以继续并行推进，因为本版既不依赖它们的新版本，也不要求它们为 Node 让路。Node 在这里做的是只读治理，不是跨项目联动审批。

## Service Flow / 服务流程

服务流程仍然是 loader -> profile -> renderer 的单向路径。以 precheck 为例，loader 先从 Node v251 decision record 和相关配置里拿到前提信息，再构造 disabled adapter client precheck profile。profile 里已经包含 `requiredEnvHandles`、`optInGate`、`failureTaxonomy`、`dryRunResponseShape` 和 `reusedNoGoConditions`。renderer 只负责把这些内容按照既定顺序写成 Markdown。它不重新判断某个 env handle 是否 required，不重新判定某个 failure taxonomy 是否 blocker，也不再碰 upstream client。

upstream echo verification 的流程也类似。loader 先构造 Node v252 / v253 的源节点投影，再放入 Java v102 echo 与 mini-kv v111 non-participation 的历史回声，最后算出 echo verification、checks、summary、blockers、warnings、recommendations。renderer 接到 profile 后，把标准外框交给 builder，把本地的 entries/list/messages 交给 builder。因为它没有像 v2135 那样的 evidence file / snippet file 的尾空行问题，所以这次迁移更直接，也更适合拿来验证 builder 对标准完整报告的覆盖面。

## Safety Boundary / 安全边界

这版的安全边界仍然很硬。precheck 明确只是在说 disabled adapter client precheck，不是在说真正的 adapter client 已经可以实例化；它里面的 `clientMayBeInstantiated`、`externalRequestMayBeSent`、`credentialValueMayBeLoaded` 都保持 false。failure taxonomy 只是列出未来可能拒绝的原因，不是给运行时提供新的开关。upstream echo verification 也保持只读：Java v102 echo 和 mini-kv v111 non-participation 被展示出来，是为了证明边界没有被打破，而不是为了打破边界。

从生产治理角度看，这一点很重要。越靠近真实执行，越不能把“报告已经收口”误读成“执行已经放开”。v2136 仍然属于治理层和审计层，它只是让这些层的 Markdown 更一致、更容易审阅。真正的执行能力、credential read、connects managed audit、schema migration execute 等位移都没有发生。这样后面如果继续推进真实分片执行，审阅者可以更放心地把“说明书”和“动作本身”分开看。

## Test Coverage / 测试覆盖

v2136 的测试也分三层。第一层是 `npm run typecheck`，确认 builder spec、新的 import 以及 helper 签名都能通过类型检查。第二层是 focused tests：`test/managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.test.ts` 与 `test/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.test.ts`，总共 7 个测试，覆盖 ready 与 blocked profile、JSON route、Markdown route、env handle 投影和 upstream echo 投影。第三层是临时逐字节对比测试，它从 `git show HEAD:<path>` 取旧源码，在 VM 里转译旧 renderer，再用相同 profile 比较 old 和 new Markdown。

逐字节对比里最重要的验证点是列表 section。precheck 的 `Required Env Handles` 和 `Failure Taxonomy` 都依赖 `renderList`，upstream echo verification 的 `Java v102 Echo` 和 `mini-kv v111 Non-Participation` 也依赖 `renderEntries`。这类 section 没有尾空行的复杂契约，所以迁移主要考察 section 顺序、空文案和消息段落是否一致。测试通过意味着 builder 没有悄悄改变行顺序，也没有把 list section 的空项渲染成多余的噪声。

## Maintenance Decision / 维护决策

v2136 的维护决策可以概括成“迁标准骨架，留本地语义”。precheck 报告中 `Required Env Handles` 和 `Failure Taxonomy` 仍然保留局部字符串格式函数，因为它们是业务解释文本，不是通用渲染模板。upstream echo verification 的两个节点证据段则直接进入 builder，因为它们只是对象展开，没有必要再保留单独的顶层数组。这样做以后，文件头部能直接看出这个报告的结构意图，底部又能保留本地逻辑的可读性。

这也说明为什么本版只迁 2 个文件。不是因为数量上限，而是因为这两个文件都已经把最重复、最稳定的部分暴露出来了。继续往更复杂的恢复计划、命令包或紧凑分段报告推，就会碰到 section 间隔、列表语义、局部 helper 空行规则等更细的边界。先把这类标准完整报告收住，后面的版本才有更好的扫描基础。

## Future Scan / 后续扫描

后续扫描可以继续沿着三条线走。第一条是继续找标准完整报告，尤其是 `# title`、`## Checks`、`## Summary`、`## Evidence Endpoints`、`## Next Actions` 都齐的文件，这类最适合直接迁。第二条是继续找带本地行 helper 的报告，例如 env handle、failure taxonomy、step list、snippet list、evidence file list 这类需要少量业务投影的文件；这类要先看 helper 是否需要保留，不要为了少几行把语义拆碎。第三条是把 compact section spacing 的文件单独列出来，不要混进 builder 主线里。

从更大的工程路径看，v2136 之后的判断会更稳：只要新文件能快速看出是完整报告，且 section 间隔与 builder 一致，就可以继续迁；如果它属于 compact plan、command package、worksheet 或执行模板，就应该先进入“是否值得扩 builder”的边界讨论。这样做能让 N1 继续向前，但不会让公共工具越来越像一堆特例的缝合体。

## Review Notes / 审阅要点

如果后续 reviewer 要快速检查 v2136，最重要的三件事是：第一，precheck 的 `Required Env Handles`、`Failure Taxonomy`、`Reused No-Go Conditions` 是否仍然按原顺序输出，且本地 helper 没有把解释文本压扁。第二，upstream echo verification 的 Node v252、Node v253、Java v102、mini-kv v111 四段是否仍然齐全，且 `Checks`、`Summary`、`Evidence Endpoints`、`Next Actions` 顺序没有变。第三，blocker / warning / recommendation 的空文案是否仍然是原来的句子，这样 route snapshot 和 Markdown route 才会稳定。

临时逐字节对比测试会在提交前清理，不进入仓库；但它的存在本身说明这次迁移不是“看起来差不多”，而是明确验证了旧新输出完全一致。对一个长期维护的 Node 项目来说，这种把结果固定住再继续往前走的节奏，比一次性做很多看似热闹的修改要可靠得多。

## Code Change Details / 代码变更细节

precheck 的代码变化比上一个版本更像标准模板收口。顶层 render 函数不再拼长数组，而是把 title、meta 和 sections 明确列出来。最重要的是，`Disabled Adapter Client Precheck` 这一段没有被粗暴拆成整份 profile 展开，而是只挑出 `precheckDigest`、adapter mode、client implementation status、client may be instantiated、external request may be sent、credential value may be loaded、opt-in gate required 这些真正想在报告里说明的字段。这样一来，报告更像审阅材料，而不是 dump 出来的 JSON。

upstream echo verification 的变化更纯粹。它几乎只做标准 builder spec 投影，没有额外的本地行格式函数。Node v252、Node v253、Java v102、mini-kv v111、echo verification、checks、summary、messages、evidence endpoints、next actions 这些 section 全都可以直接交给 builder。对后续迁移来说，这类文件的价值很高，因为它说明 builder 已经能够承接绝大多数完整报告的常规骨架，剩下的就只是少数本地语义段落。

这版留下的局部 helper 也很有意义。`formatEnvHandle` 让 `Required Env Handles` 更容易读，`formatFailureClass` 让 `Failure Taxonomy` 更容易读。它们没有被提到公共层，不是因为抽不出来，而是因为它们目前只服务这一类 disabled client precheck 语义。把它们留在原文件里，可以减少公共工具的历史负担，也能让 reviewer 快速找到解释文本和它对应的业务边界。

## Validation Notes / 验证说明

本版的验证仍然遵循三层。第一层是 `npm run typecheck`，它保证 builder spec 的字段组合、render 函数签名、helper 返回值和 profile 类型之间没有断裂。第二层是 focused tests，覆盖 ready 和 blocked 两条路径。这样做的原因很简单：只测 ready path 往往会忽略 blocker 或 warning 为空时的文案，而只测 blocked path 又可能忽略 summary 和 next actions 的正常投影。两条一起跑，能更全面地覆盖 Markdown 结构。

第三层是临时逐字节对比，这是本版最关键的验证。它从 `git show HEAD:<path>` 读取旧实现，在内存里转译，再拿同一个 profile 生成新旧两份 Markdown 作比较。这个方法能直接验证 section 顺序、空文案、消息列表、list 展开和 header 对齐是否变化，而不是只验证某几个字段值。对于一个已经进入批量治理阶段的 Node 项目来说，这比单纯“路由返回 200”更能说明迁移安全。

本版的对比测试选择了 ready 和 blocked 两种 profile，因为 disabled adapter client precheck 和 upstream echo verification 都存在清晰的前提条件。ready path 用来验证标准投影；blocked path 用来验证 blocker、warning 和 recommendation 的行为没有被 builder 改坏。这样一来，测试通过的含义就不只是“代码能跑”，而是“旧新输出完全一致，且关键审阅路径都已被覆盖”。

## Future Scan / 后续扫描

后续扫描可以继续沿着三个方向推进。第一，继续找像本版这样标准完整报告的 renderer，它们通常都能直接迁入 builder。第二，继续找带局部解释 helper 的文件，只要 helper 的职责清楚，就可以像本版一样迁外框、留语义。第三，继续把 section 间隔不标准的文件单独列出来，不要因为它们看着像报告就强推 builder。那类文件更适合先做边界说明，再决定是否值得扩展公共抽象。

这条扫描路线对后面靠近真实执行尤其重要。等报告层足够整齐后，reviewer 看任何新文件，都更容易判断它是在整理证据、还是在打开执行能力。N1 的目的不是把所有 Markdown 统一成一个函数，而是把真正重复的报告外框从历史遗留里拔出来。只要这一点不丢，后面的版本就会更稳。

这也是 v2136 留下的实际价值：它既继续减轻了重复，又没有因为赶进度把公共 builder 做成一个塞满特例的容器。这个节奏也更适合长期维护。

后续版本只要沿着这个边界走，就会更稳。

这次也是这样。

稳。

够了。

呢。

## One-sentence Summary / 一句话总结

v2136 把 disabled adapter client precheck 和 disabled adapter client upstream echo verification 两个完整报告迁入 `verificationReportBuilder`，保留本地 env-handle / failure-taxonomy / upstream-echo 语义，并用 typecheck、focused tests 和逐字节对比确认输出没有变化。
