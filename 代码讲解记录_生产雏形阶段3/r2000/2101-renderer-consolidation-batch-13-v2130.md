# v2130 renderer consolidation batch 13

## Goal and Non-goal / 目标与非目标

v2130 的目标是继续收拢 managed-audit credential resolver 的 prerequisite-chain renderer，把 Endpoint Handle Allowlist Approval 和 Signed Human Approval Artifact 两条链的 contract intake、upstream echo verification、prerequisite closure review 迁移到共享 `renderVerificationReportMarkdown`。这两条链位于 v2129 已处理的 Credential Handle Approval 与 No-Network Safety Fixture 附近，属于同一类“真实 resolver 和 runtime shell 之前的审批前置治理”。它们的外层 Markdown 结构一致：标题、meta、安全边界、source Node、合同或上游 echo、closure review、checks、summary、blockers、warnings、recommendations、endpoints、next actions。

选择这 6 个文件，是因为它们和 v2129 形成连续的治理带，而不是单纯文件名相似。Endpoint Handle Allowlist Approval 关注的是 endpoint handle allowlist 的审批合同，避免在真实 endpoint、raw URL 和 resolver client 还没获得批准时打开执行口。Signed Human Approval Artifact 关注的是人工签名批准材料的合同与回显，避免把缺少签名材料或不完整字段的输入当成上线授权。两条链都很接近真实执行语义，因此更需要把稳定的报告骨架和具体证据行分开。

本版的非目标也必须写清。第一，不修改 loader、type、route 或 test expectation；所有 ready flag、digest、field count、side-effect boundary 和 production blocker 都仍由原服务决定。第二，不新增 helper。虽然 Endpoint 和 Signed Human 都有 contract detail、evidence files、closure prerequisites，但它们的子行差异明显：Signed Human upstream 有 expected snippets，Endpoint upstream 有 Java v148 quality split，contract 字段也分别围绕 endpoint allowlist 和 signed artifact 展开。第三，不触碰 Java/mini-kv 仓库，不请求 fresh evidence，也不启动任何上游服务。

这版还做了一个小的机械规范化：6 个旧 renderer 首行带 UTF-8 BOM，导致 `apply_patch` 无法稳定锚定第一行。迁移前先把这些文件规范为 UTF-8 无 BOM，内容不改。这个动作属于维护性清理，不改变业务输出；exact compare 使用旧 HEAD 抽取 legacy renderer 并比较最终 Markdown，因此也覆盖了规范化之后输出不变的结果。后续同类文件若也有 BOM，应该先机械规范化，再做补丁，而不是绕过审查直接脚本改逻辑。

BOM 规范化在这版里还有一个额外价值：它让后续差异更容易审查。带 BOM 的文件在某些工具里首行显示正常，在 patch 或跨平台脚本里却可能出现不可见差异；如果不先处理，后续每次改首行 import 都会出现工具行为不一致。v2130 没有把 BOM 清理扩大到全仓库，因为那会制造无关 diff；它只处理本版正在迁移的 6 个 renderer，并用 byte-identical compare 证明内容输出不受影响。这个边界也符合“刀刀到肉”的维护思路：清掉阻碍当前工程动作的格式问题，不顺手制造大型格式化提交。

## Entry Points / 入口

六个公开 renderer 函数名保持不变：`renderManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationMarkdown`、`renderManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewMarkdown`。调用方继续通过原 service export 使用它们。

入口函数仍然接收原 profile 并返回 Markdown string。meta 字段顺序完整保留，例如 Endpoint contract intake 继续展示 target prerequisite id、Java v147 + mini-kv v140 echo readiness、Node v321 before upstream echo、credential value read、raw endpoint URL parsed、secret provider instantiated、resolver client instantiated、execution allowed；Signed Human contract intake 继续展示 Java v145 + mini-kv v138 echo readiness、runtime shell implemented、execution allowed、connects managed audit。入口统一的是渲染骨架，不是审批语义。

上游 echo verification 入口尤其需要保持字段不变。Endpoint upstream echo 展示 credential value read、raw endpoint URL parsed、secret provider instantiated、resolver client instantiated、execution allowed；Signed Human upstream echo 展示 runtime shell implemented、runtime shell invocation allowed、execution allowed、connects managed audit。字段不同，反映的是两条链的风险不同：Endpoint 更接近 endpoint handle 和 raw URL 边界，Signed Human 更接近人工批准材料与 runtime shell 授权边界。

closure review 入口也继续保留下一步指向。Endpoint closure review 指向 no-network safety fixture contract intake；Signed Human closure review 指向 credential handle contract intake。这个顺序说明 prerequisite chain 是一条逐步关闭前置条件的治理链，而不是互相替代的报告。v2130 迁移后，入口函数更短，但读者仍能从 meta 和 section 名称看到链路推进方向。

## Response Model / 响应模型

响应模型仍然是 Markdown，而且 byte-identical compare 证明输出逐字节不变。共享 builder 生成一级标题、meta bullet、二级 section 和末尾换行；本地 helper 生成 contract detail、source node reference、Java/mini-kv evidence files、expected snippets、closure prerequisites 等业务行。这样的模型把“所有报告都一样的结构”交给 builder，把“每条审批链为什么重要”留在 renderer 附近。

Endpoint contract intake 的 contract section 保留 `renderContract`，它展示 contract digest、contract name、version、mode、source span、target prerequisite、purpose、required/prohibited/rejection/no-go/upstream echo request count，以及 implementation still blocked。随后继续输出 `### Required Fields`、`### Prohibited Fields`、`### Rejection Reasons`、`### No-Go Boundaries`、`### Upstream Echo Requests`。这些三级标题是合同正文，不适合拆成顶层 sections。

Signed Human contract intake 的 contract section 也保留本地 helper，但内容略有不同。它围绕 signed artifact contract 展开，字段是 artifact name、artifact version、required/prohibited/no-go/upstream echo request 等。它没有和 Endpoint contract 完全同构，尤其 signed artifact 更强调批准材料字段与人工签名语义。把这两者强行抽成一个 contract helper，会让 helper 参数变宽，也会让读者更难判断某个字段属于 endpoint 还是 signed artifact。

Upstream echo verification 的差异更明显。Endpoint upstream echo 有 Java v147、mini-kv v140 和 Java v148 quality split；Signed Human upstream echo 有 Java v145、mini-kv v138，并且 Java/mini-kv reference 都包含 expected snippets。v2130 只把它们作为 builder 的 `lines` section 或 entries section 组合起来，具体 evidence files 和 snippets 仍在本地 helper 中。这样既减少外层重复，又不丢失上游材料的结构细节。

这里可以看到本版没有抽象过度的原因。Endpoint 的 Java v148 quality split 是一个已经结构化好的 entries 对象，直接作为 section 展示即可；Signed Human 的 expected snippets 则是审核材料存在性的文本片段证据，需要和 evidence files 放在同一个 Java 或 mini-kv reference 下阅读。如果把二者都塞进一个“上游证据 helper”，调用端会变短，但 helper 内部会出现大量分支：有没有 quality split、有没有 snippets、snippets 是否有 resolved path、evidence file 是否有 sizeBytes、digest 是否允许 missing。这样的 helper 会隐藏风险，而不是降低复杂度。v2130 的选择是让 builder 负责稳定框架，让每条链的证据块继续用清楚的本地代码表达。

## Upstream Evidence and Config / 上游证据与配置

v2130 不读取实时 Java 或 mini-kv 服务，不启动上游进程，不打开 HTTP 或 TCP 连接。测试配置仍然关闭 upstream probes 和 upstream actions，并使用 historical fixture fallback。报告里出现 Java v145、v147、v148、mini-kv v138、v140，只代表 Node 仓库内已有冻结证据的引用和回显，不代表本版重新要求上游项目生成证据。

Java 和 mini-kv 因此可以继续并行推进。Node v2130 不改 schema，不改合同，不要求上游项目开端口，也不依赖它们的 dirty worktree。当前工作树里 Java / mini-kv playbook 的外部改动继续保持未 staged，Node 本版只提交自己的 renderer 和归档材料。这个隔离很重要，因为这些报告名都带有 Java/mini-kv 版本号，容易被误解成跨项目阻塞。

Endpoint Handle Allowlist Approval 的上游证据边界是 endpoint authority 不能被提前声明。mini-kv receipt 中有 endpoint authority claimed、endpoint allowlist authority、audit authoritative、order authoritative 等字段，renderer 只是展示这些字段，不参与判定。Signed Human Approval Artifact 的边界是人工批准材料不能被伪造或跳过，expected snippets 继续展示 matched 和 resolved path，用来证明历史证据中确实存在对应片段。

配置层没有新增开关。execution allowed、runtime shell implemented、runtime shell invocation allowed、connects managed audit、credential value read、raw endpoint URL parsed 等值都来自既有 profile。v2130 没有因为迁移 builder 而改变任何安全字段的位置或名字。读者仍然能在 meta 层判断当前报告是审批前置治理，不是生产窗口授权。

## Service Flow / 服务流程

服务流程仍然是 loader 生成 profile，renderer 渲染 Markdown。旧 renderer 把 meta、section heading、entries、messages、lists 和本地 helper 输出混在一个数组中；新 renderer 把 title、meta、sections 交给 builder。builder 根据 section 类型调用 renderEntries、renderMessages、renderList 或直接接收 lines。本地 helper 不离开文件，因此业务上下文没有被拆远。

Endpoint contract intake 的迁移最直观：Source Node v319 和 Endpoint Handle Allowlist Approval Contract 是本地 lines，Prerequisite Transition、Necessity Proof、Checks、Summary、Evidence Endpoints 是 entries，Production Blockers、Warnings、Recommendations 是 messages，Next Actions 是 list。旧结构里的空行和 section 顺序由 builder 复刻，exact compare 兜住输出。

Endpoint upstream echo verification 在 sections 中保留 Java v148 Quality Split。这个 section 是 entries，不是本地 helper，因为它已经是一个可直接展示的对象；Java v147 和 mini-kv v140 则需要本地 helper 来展开 evidence files。这个分层体现了本版的原则：对象可直接展示时用 entries；对象内部有子标题和列表时保留 lines。

Signed Human upstream echo verification 新增了 `renderSourceNodeV314` 本地 helper，用来把原本内嵌在主函数里的 source node entries 移到函数下方。这不是共享抽象，只是把同一个 section 的字段收拢，让入口函数不被 source node 字段撑长。Java 和 mini-kv reference 保留 expected snippets，本地 helper 仍然展示 evidence files 与 snippets 两个三级小节。

Closure review 两个 renderer 都新增本地 `renderClosureReview`，与 v2129 一致。它把 review digest、review mode、source span、source verification digest、prerequisite counts、moved prerequisite、next versions、chain continuation、runtime shell still blocked、closure reason 和 completed/remaining prerequisites 放在同一个 section 中。这比把一长串 entries 直接塞在入口函数里更清楚，也没有把业务细节抽到共享层。

## Safety Boundary / 安全边界

第一层安全边界是输出不变。临时 test 从 `git show HEAD` 读取六个旧 renderer，改写 import 到当前源码路径，再把同一份真实 profile 分别交给旧 renderer 和新 renderer。6/6 字符串全等，说明 BOM 规范化、builder 迁移、本地 helper 拆分都没有改变 Markdown 可见内容。

第二层安全边界是行为不变。本版不修改 loader，不改 digest 算法，不改 evidence 文件读取，不改 check 逻辑，不改 route，不改 access guard。renderer 继续是纯展示层；builder 也只是纯字符串拼装。即使报告涉及 endpoint、signed artifact、credential、managed audit 等敏感词，本版没有任何执行能力变化。

第三层安全边界是抽象停止。v2130 没有新增通用 helper，因为 Endpoint 与 Signed Human 的差异足够明显：Endpoint 有 Java v148 quality split，Signed Human 有 expected snippets；contract 字段名称、证据行格式和风险语义都不同。把它们合成一个宽 helper 会让调用点短一些，却让语义边界变模糊。当前更好的选择是复用 report builder，保留本地证据行。

第四层安全边界还包括审批语义不跨链污染。Endpoint Handle Allowlist Approval 的核心风险是 endpoint handle 和 raw endpoint URL 不被提前授权；Signed Human Approval Artifact 的核心风险是人工签名材料不被伪造或跳过。两者都属于 managed audit 前置治理，但一个偏 endpoint allowlist，一个偏 approval artifact。如果后续把它们抽成同一个业务 helper，reviewer 很容易只看到“approval prerequisite chain”这个大类，而忽略具体风险点。v2130 宁可保留本地 helper，也要让每条链的风险词留在文件内。

第四层安全边界是跨项目不阻塞。Java 和 mini-kv 不需要等待 Node v2130，也不需要因为 Node 的 renderer 整理而重跑自己的证据生成。Node 只消费已有冻结材料。未来如果要真实启动 Java 或 mini-kv，计划必须写清端口、owner、启动命令、关闭责任和失败处理；v2130 没有进入那一阶段。

第五层安全边界是清理。临时 compare 文件和 legacy renderer 会放在 `.tmp`，build 会生成 `dist`；它们都必须在提交前删除。本版没有启动后台进程，没有 HTTP smoke server，没有 Playwright 浏览器，也没有 Java/mini-kv 服务，因此进程清理为空。

## Test Coverage / 测试覆盖

本版本地验证先跑 `npm run typecheck`，确认 builder section 类型、本地 helper 类型索引和 BOM 规范化后的文件都能通过编译。随后跑 focused batch：`verificationReportBuilder.test.ts`、`governanceGrowthRatchet.test.ts` 加 6 个 Endpoint/Signed Human 业务测试文件，共 8 个测试文件、30 个断言。它们覆盖 report builder、增长约束和六个 report loader/renderer 相关入口。

临时 exact compare 是本版关键验证。focused tests 能证明核心字段存在，但不能保证 Markdown 的空行、三级标题、messages 空态、evidence file 行、snippet 行完全不变。exact compare 直接比较旧/新输出，6/6 通过，足以证明这是展示层重构，不是业务行为变化。

这个闭环也保护了 BOM 规范化：即使文件编码被整理，最终报告文本仍必须和旧实现一致。
这让审查边界更稳定。

后续收尾还要跑文档质量 gate、lint、build 和远端 Node Evidence CI。lint 目标是保持 263 warnings / 0 errors 基线，不能因为迁移 builder 留下未用 import。build 通过后删除 `.tmp` 和 `dist`，再提交 tag。若 CI 出错，先看是本版输出、lint、typecheck 还是全量测试问题，再定向修复。

v2130 之后，四条 prerequisite-chain 家族已经 builder-backed：Signed Human、Credential Handle、Endpoint Handle Allowlist、No-Network Safety Fixture。下一步可以继续查 Abort/Rollback、Approval Prerequisite Artifact、Human Approval Artifact Review 等同类报告，也可以单独给 controlled read-only shard preview 做分类。不要把 section renderer 和完整 report renderer 混在同一批，否则讲解会散，exact compare 也更难覆盖。

下一阶段如果转向 controlled read-only shard preview，需要先把文件分成三类。第一类是完整 Markdown report renderer，通常有 service、generatedAt、profileVersion、ready state、checks、summary、next actions，适合评估是否迁移到 builder。第二类是 profile section renderer，只负责局部片段，不能直接用完整 report builder，否则会改变层级。第三类是 worksheet、runbook、command package 或 envelope 形状，它们通常有表格化、步骤化或操作者输入语义，应该保留本地布局。这个分类做清楚后，再决定 v2131 或后续版本是否继续迁移 renderer，能避免把不同职责的文件硬凑成一个批次。

从三项目推进角度看，v2130 也继续保持 Node 自治。Java 与 mini-kv 不需要为本版提供任何新文件，原因是这些 approval chain 只消费历史 echo 和 non-participation receipt。真正要让三项目进入真实分片联合执行，还差 live read-only window 的服务启动、端口归属、健康探测、失败清理、证据导入和审批材料绑定。当前 renderer consolidation 是前置治理的一部分：它不直接执行分片，但让后续真实执行材料更容易审查、更少被重复模板淹没。

因此，先把 prerequisite chain 的完整报告收拢，是比立刻进入 controlled preview 更稳的路线。真实分片执行前，审批材料、endpoint allowlist、credential handle、no-network safety、signed artifact 这些前置证据必须可读、可比对、可追溯；如果这些报告仍然由大量手写 Markdown 维持，后续 reviewer 很难区分“证据真的变了”和“renderer 模板漂移了”。v2130 把这类报告继续标准化，就是在为后续 live read-only window 降低审查噪声。

## One-sentence Summary / 一句话总结

v2130 将 Endpoint Handle Allowlist Approval 与 Signed Human Approval Artifact 两条 prerequisite 审批链的 6 个 renderer 迁移到共享 verification report builder，在保留合同、上游 echo、expected snippets 与 closure prerequisite 本地语义的同时，保持 Markdown 输出逐字节不变。
