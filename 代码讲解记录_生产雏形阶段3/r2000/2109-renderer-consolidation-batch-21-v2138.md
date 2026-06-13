# v2138 renderer consolidation batch 21 / 基础治理报告收口

## Goal and Non-goal / 目标与非目标

v2138 的目标是继续 N1 renderer consolidation，把四份基础治理报告迁移到 `verificationReportBuilder`：`src/services/accessPolicyProfile.ts`、`src/services/ciEvidenceCommandProfile.ts`、`src/services/auditRetentionIntegrityEvidence.ts` 和 `src/services/authEnforcementRehearsal.ts`。这四份报告分别覆盖访问策略、CI 证据命令、审计保留完整性、认证执行演练，都是生产前治理面非常靠前的材料。它们旧实现的共同问题也很明显：每个文件都手写 `# title`、meta bullet、`## Checks`、`## Summary`、message section、Evidence Endpoints 和 Next Actions，重复多、空行协议分散、后续审阅成本高。

本版的非目标是保持业务层完全不动。Access policy 仍然是 contract-only，不会开始拦截请求；CI evidence command profile 仍然只描述安全命令，不会创建 workflow；audit retention evidence 仍然是只读证据，不会轮转或删除文件；auth enforcement rehearsal 仍然是 rehearsal，不会把 header-derived identity 当成真实凭据。v2138 没有改 route、schema、配置解析、access guard 判定、audit log 写入、CI 命令内容、Java 或 mini-kv 证据消费。它只把重复报告外框收进公共 builder。

这版也继续遵守“不为单例扩公共工具”的原则。四份报告的 message 都没有 `source` 字段，所以不能使用 builder 标准 `messages` section；access policy、CI command、auth rehearsal 还各有一个三级标题子块列表。它们的内容很有业务语义：route policy 要展示 methods 和 path patterns，command 要展示 phase 和 command 文本，sample 要展示 headers、evaluation、enforcement。v2138 让这些子块继续留在本地，只把它们作为 `lines` section 交给 builder。

## Entry Points / 入口

第一个入口是 `renderAccessPolicyProfileMarkdown(profile)`。它接收 `createAccessPolicyProfile(config)` 的结果，报告访问策略仍处在 contract-only 阶段：request identity contract 定义了 authenticated、operatorId、roles、authSource，route policies 定义 readiness、audit、intent、approval、archive、upstream-proxy 六组策略。迁移后，Enforcement、Checks、Summary、Evidence Endpoints 和 Next Actions 交给 builder；Request Identity Contract 和 Route Policies 通过本地 `renderIdentityFields`、`renderRoutePolicies` 生成 lines。

第二个入口是 `renderCiEvidenceCommandProfileMarkdown(profile)`。它描述 CI 证据命令集合：typecheck、coverage test、build、安全 smoke server、health smoke、release evidence readiness gate smoke，以及两个 manual authorization 命令。迁移后，Safe Environment、Checks、Summary、Evidence Endpoints 和 Next Actions 用 builder 标准 section，Commands 分区保留 `renderCommand` 生成的三级标题子块。这样命令文本、PowerShell 环境变量和手动授权说明的原始格式不会被 entries 扁平化。

第三个入口是 `renderAuditRetentionIntegrityEvidenceMarkdown(report)`。这一份比另外三份更标准，Runtime、Retention Policy、Integrity、Checks、Summary、Evidence Endpoints 和 Next Actions 都是普通对象或列表。唯一保留本地的是 message formatter，因为它没有 source 字段。第四个入口是 `renderAuthEnforcementRehearsalMarkdown(profile)`，它的 Samples 分区保留本地 `renderSample`，因为 sample 需要把 headers、evaluation、enforcement 三个对象按旧格式序列化成一行，不能交给通用 entries 展开。

## Response Model / 响应模型

四份报告的响应模型在顶层高度一致：meta 说明 service、generatedAt、profileVersion 或 evidenceVersion、ready/valid/readOnly/executionAllowed；中段是业务对象 section；末段是 blockers/warnings/recommendations、evidence endpoints 和 next actions。`renderVerificationReportMarkdown` 适合承接的正是这层稳定结构。迁移后，每个 renderer 都变成“声明标题、meta 和 sections”，而不再亲手维护每一个空字符串。

本版最需要小心的是三级标题子块的尾空行。旧 `renderIdentityField`、`renderRoutePolicy`、`renderCommand`、`renderSample` 都会在每个子块末尾返回一个空字符串。旧数组模型会在下一个 `##` 标题前自然形成一行空行；builder 则会在每个 section 之间统一补空行。如果直接把 flatMap 后的结果传入 builder，就会在子块分区末尾多出一行。v2138 的 wrapper 都采用同一个策略：`flatMap(...).slice(0, -1)`，让 builder 管理 section 间隔，本地 helper 只管理子块内部间隔。

message 模型也保持原样。Access policy 的 blocker 行仍然是 `ACCESS_GUARD_NOT_ENFORCED (blocker): ...`，CI evidence command 的 warning 行仍然是 `CURRENT_RUNTIME_ACTIONS_ENABLED (warning): ...`，audit retention 和 auth rehearsal 也一样。没有 `source` 字段是历史公开文本的一部分，不能为了复用而擅自改变。通过 lines section 保留本地 message formatter，是本版字节等价的关键。

## Upstream Evidence and Config / 上游证据与配置

v2138 不消费 fresh Java 或 mini-kv evidence。四份报告都在 Node 本地治理面内部：access policy 读取的是 Node 的 route policy contract 和 `upstreamActionsEnabled`；CI evidence command profile 读取当前 config，只用来决定是否产生 warning；audit retention evidence 读取 Node audit runtime、audit log 和本地 file snapshot；auth rehearsal 使用 Node access guard 评估样本请求。Java 和 mini-kv 继续推荐并行推进，不需要等待本版。

配置上，本版也没有改变任何默认值。`UPSTREAM_ACTIONS_ENABLED` 为 true 时，access policy 和 auth rehearsal 仍会记录 blocker；CI evidence command profile 即使当前 runtime 开了 probes/actions，也只产生 warning，safeEnvironment 仍然固定为 false；audit retention 仍然要求 `AUDIT_RETENTION_DAYS`、`AUDIT_MAX_FILE_BYTES`、rotation 和 backup 配置，同时继续把 managed audit store 缺失作为生产 blocker。renderer consolidation 不参与这些判断。

## Service Flow / 服务流程

access policy 的流程是：loader 构造 request identity contract 和 route policies，计算 checks，再生成 blockers、warnings、recommendations。renderer 现在只把这些结果投影为 builder spec。CI evidence command 的流程是：loader 创建 safe environment 和 command catalog，检查 CI-runnable 命令是否只读，收集当前 runtime warning；renderer 保留 command 子块文本，并把其余外框交给 builder。

audit retention 的流程是：读取 audit log events，计算 canonical digest 和 repeated digest，必要时读取 file snapshot，再判断 retention、rotation、backup、managed store 和 digest stable。renderer 不再碰这些计算，只声明 Runtime、Retention Policy、Integrity、Checks、Summary 等 section。auth rehearsal 的流程是：用 `evaluateAccessGuard` 构造 missing identity、insufficient role、allowed auditor 三个样本，计算 rehearsal enforcement 下的 status code，再输出 Samples、Checks、Summary 和 messages。迁移后，sample 仍由本地函数格式化，因此 evaluation 对象的 JSON 字符串顺序没有被改变。

## Safety Boundary / 安全边界

这四份报告都靠近真实生产执行的外围，但都没有放开执行。Access policy 说明未来应该怎样鉴权，并不拦截请求；auth rehearsal 可以在显式配置下测试 401/403，但仍然是 header-derived rehearsal，不是 signed credential auth；CI evidence command profile 描述命令目录，不启动后台服务，也不运行手动授权命令；audit retention evidence 读取 audit log 和文件快照，不删除、轮转或备份文件。

公共 builder 的安全边界也没有扩大。它仍然只是 Markdown 布局工具，不读取配置、不连接上游、不判断角色、不计算 digest、不解释 command 是否安全。每个 service 继续拥有自己的业务判断和本地投影 helper。这样后续如果某个安全结论不对，排查点仍然在 profile 构造；如果 Markdown 空行或 section 顺序不对，排查点才在 renderer spec 或 builder。

## Test Coverage / 测试覆盖

本版先跑 `npm run typecheck`，确认四个 service 的 builder spec、wrapper、local helper 和剩余 formatter 都类型正确。随后跑 4 个 focused 测试文件，共 12 个测试：access policy 覆盖 contract-only 和 upstream actions blocker；CI evidence command 覆盖 safe command catalog、runtime warning 和 Markdown route；audit retention 覆盖 memory blocker、file-backed digest 和 route；auth rehearsal 覆盖 observe-only、显式 enforcement、401/403 样本。

逐字节对比是本版最关键的验证。临时测试从 `git show HEAD:<path>` 读取旧实现，在 VM 中转译旧 renderer，再用 8 个 profile 对比新旧输出：access policy false/true、CI safe/warning、audit retention memory/file、auth rehearsal observe/enforce。这个覆盖专门针对本版风险点：子块尾空行、message source-less 格式、对象 JSON 序列化、warning/blocker 空态和 next actions 顺序。所有对比通过，说明迁移没有改变公开 Markdown。

## Maintenance Decision / 维护决策

v2138 的维护决策是把“基础治理报告”作为一组推进，而不是零散挑文件。这四份报告都不是新功能链路，但它们支撑生产前的访问控制、CI 安全、审计保留和认证演练。如果这些报告的 Markdown 外框继续散落在本地数组里，后续每次调整文档质量、route catalog 或 readiness summary 时都要承受额外噪声。把它们收进 builder，能让未来 reviewer 更快区分业务字段和报告排版。

没有新增共享 helper 也是维护决策的一部分。`renderIdentityFields`、`renderRoutePolicies`、`renderCommands`、`renderSamples` 看起来形状相似，但语义不同。现在就抽一个“nested h3 list helper”，会让 helper 名字过于抽象，调用方还要传各种 formatter。保留四个很薄的本地 wrapper 更清楚：每个 wrapper 只处理本文件的子块尾空行，真正的行格式仍在本地 helper 里。

## File Decisions / 文件级决策

`accessPolicyProfile.ts` 的迁移价值在于把访问控制报告的骨架和策略明细分开。旧实现里，Enforcement、Request Identity Contract、Route Policies、Checks 和 message section 全部混在同一个数组里。迁移后，前后关系更清楚：builder 管公共 section，`renderIdentityField` 和 `renderRoutePolicy` 管审阅者真正关心的策略行。这样以后如果 route policy 增加新字段，只需要看本地 helper；如果 section 顺序出错，才看 renderer spec。

`ciEvidenceCommandProfile.ts` 的风险点是 command 文本。这里的 command 字段包含 PowerShell 环境变量和 HTTP smoke URL，如果用 entries 把整个 command 对象直接展开，虽然也能显示字段，但无法保证旧的 `### command-id` 子块阅读体验。保留 `renderCommand` 让 typecheck、test、build、start-safe-smoke-server、manual-upstream-actions 这些命令仍然各自成段，reviewer 可以按命令粒度扫描。builder 只管理分区之间的空行，避免污染命令内容。

`auditRetentionIntegrityEvidence.ts` 是本批最标准的对象型报告。它的 Runtime、Retention Policy、Integrity、Checks、Summary 都能直接进入 entries section，因此迁移后删除了最多的本地渲染样板。它仍然保留本地 `renderMessages`，因为 message 没有 source。这个文件说明一个重要判断：不是每次迁移都要增加新 helper；只要 builder 现有 section 足够表达，就应该删除重复代码，而不是发明新的公共层。

`authEnforcementRehearsal.ts` 的关键是 Samples。sample 里有 headers、evaluation 和 enforcement 三个对象，旧实现用本地 `formatValue` 把它们压成一行 JSON。builder 的 entries 也有格式化能力，但如果把 sample 变成对象 entries，输出会完全不同。因此 v2138 只让 Samples 作为 lines section 接入，保留本地 `formatValue`。这也是“收外框、留语义”的另一个具体例子。

## Batch Coherence / 批次一致性

这四个文件放在同一版里，不是为了凑数量，而是因为它们都属于“基础治理报告”：access policy 决定未来谁能看什么、CI command 决定自动化证据怎么跑、audit retention 决定审计证据能否保留、auth rehearsal 决定认证拦截如何演练。它们共同支撑生产前控制面，但当前都仍然保持只读或 rehearsal 状态。把这组报告一次收口，可以减少后续生产 readiness summary、route quality 和 access guard hardening 版本里的排版噪声。

本批还形成了一个可复制模式：遇到 source-less message，不扩 builder；遇到 nested h3 list，保留本地 renderer 并裁掉最后尾空行；遇到普通对象 section，直接交给 entries；遇到普通 next actions，直接交给 list。这个模式比“所有东西都塞进 builder”更稳，因为它明确告诉后来者什么可以共用、什么应该留在 owning service。后续再遇到同形文件，可以先套这个判断表，而不是重新争论每个空行。

## Next Scan Strategy / 后续扫描策略

v2138 之后，剩余清单里很大一部分是 controlled read-only shard preview 相关长名 renderer。那批文件数量多，但不一定都适合直接迁移，因为其中不少是 command worksheet、operator evidence intake、approval packet draft、text package comparison preflight。下一轮应该先抽样分类，而不是从列表顶部机械推进。优先级可以是：标准完整报告优先；带单一 nested h3 section 的报告次之；多层 command/workbook/preflight 文档先记录形状，等有明确公共抽象再动。

同时也应该开始记录“暂缓原因”，否则后期会反复扫描同一批不适合的文件。比如 compact spacing、裸文本段落、代码块命令、source-less message、nested h3 list、snippet comparison table，都应该有固定分类。这样 N1 收尾时，reviewer 能看到不是某些文件被忘记，而是它们需要另一类 builder 或保持本地渲染更合理。这个清单也能帮助 Java / mini-kv 并行推进，因为它说明 Node 当前做的是本地报告维护，不是跨项目契约变更。

## Verification Meaning / 验证含义

本版验证通过以后，含义不是“这四个治理域已经生产可用”，而是“这四份报告的表达方式已经收敛且输出不变”。access policy 仍然提示 enforcement 没有真正打开；CI command profile 仍然要求 probes 和 actions 默认关闭；audit retention 仍然把 managed audit store 缺失列为 blocker；auth rehearsal 仍然把 signed credential auth 缺失列为 blocker。换句话说，验证保护的是迁移安全，不是扩大能力边界。

逐字节对比的价值也在这里。普通 focused tests 多数只断言关键字段存在，无法发现多一个空行、message 多一个 source 位置、command 子块顺序轻微变化这类问题。而 N1 的目标是减少重复，不是重写报告。临时对比用旧实现和新实现同时渲染相同 profile，能直接证明这次只是内部实现变化。等 CI 跑完以后，远端也会再验证 typecheck、test、lint、build 的完整流水线。

## Execution Distance / 执行距离

v2138 仍然距离真实分片联合执行有一段距离，但它在整理执行前的治理面。真实执行需要认证可信、审计持久、CI 命令安全、访问策略可执行、上游证据新鲜且可追溯。本版覆盖的是这些条件里的报告层和阅读层，减少维护噪声，让后续真正处理 execution preview、approval packet、operator evidence 时不必同时清理旧 Markdown 样板。这样分阶段推进更稳，也更容易定位风险。

因此，本版的完成标准是“报告外框稳定、业务边界未动、后续扫描更清楚”。

## Review Notes / 审阅要点

审阅时先看四个 render 函数的 meta 顺序是否和旧实现一致，再看三级标题分区是否只裁掉最后一个尾空行。Access policy 要确认 `### audit-read`、methods 和 path patterns 仍在同一子块；CI profile 要确认 `start-safe-smoke-server` 的命令文本未被改写；audit retention 要确认 file digest、line count 和 blocker 文案仍由 profile 产生；auth rehearsal 要确认 headers、evaluation、enforcement 仍通过本地 `formatValue` 输出。

还要看跨项目边界。v2138 没有让 Java 或 mini-kv 等待，也没有要求它们补证据；它只是 Node 内部报告维护。下一轮扫描可以继续找标准 profile，但 controlled read-only shard preview 那批长名 renderer 需要谨慎，因为很多是 command worksheet、evidence intake 或文本包 preflight，不一定适合直接套 builder。

## One-sentence Summary / 一句话总结

v2138 把 access policy、CI evidence command、audit retention integrity 和 auth enforcement rehearsal 四份基础治理报告迁入 `verificationReportBuilder`，保留 source-less messages 与本地三级标题子块，并用 typecheck、focused tests 和 8 个 profile 的逐字节对比证明输出不变。
