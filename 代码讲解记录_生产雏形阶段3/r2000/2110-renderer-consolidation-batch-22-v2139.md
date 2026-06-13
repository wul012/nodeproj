# v2139 renderer consolidation batch 22 / 部署与身份边界报告收口

## Goal and Non-goal / 目标与非目标

v2139 的目标是把四份部署与身份边界报告迁移到 `verificationReportBuilder`：`deploymentEnvironmentReadiness.ts`、`deploymentSafetyProfile.ts`、`idpVerifierBoundary.ts` 和 `idempotencyVerticalReadinessReview.ts`。这四份报告都处在真实执行之前的治理面：deployment environment 说明部署环境缺哪些生产前置，deployment safety 说明当前 runtime 是否适合 demo 暴露，IdP verifier boundary 说明真实身份提供方还没有接入，idempotency vertical readiness review 说明 Java 与 mini-kv 的只读证据是否足够进入下一段抽象设计。旧实现都手写 Markdown 外框，重复标题、meta、section、message、endpoint 和 next action。

本版非目标很重要。它不部署服务，不连接真实 IdP，不拉 JWKS，不启用 upstream actions，不让 mini-kv 进入 Java 事务链，不把 idempotency review 变成 controlled drill，也不改变 Java / mini-kv 的证据契约。所有 ready、blocked、executionAllowed、productionReady 类布尔位都保持原业务语义。v2139 只是把“报告怎样排版”这层收敛，把真正的配置检查、身份边界和 idempotency 判断继续留在原 service。

## Entry Points / 入口

`renderDeploymentEnvironmentReadinessMarkdown(gate)` 是第一个入口。它原本把 Environment、Evidence、Checks、Summary、messages、Evidence Endpoints、Next Actions 手写成数组。迁移后，Environment、Checks、Summary、messages、endpoints 和 next actions 进入 builder；Evidence 分区继续由本地 `renderEvidence` 生成，因为旧输出要求 `signedAuthTokenContract.profileVersion` 和 `managedAuditStoreContract.profileVersion` 这种带 prefix 的 key。builder 的 entries section 不能表达 prefix，所以这里保留 lines 是正确边界。

`renderDeploymentSafetyProfileMarkdown(profile)` 是第二个入口。它更标准：Config Snapshot、Checks、Summary、Evidence Endpoints 和 Next Actions 都能直接交给 builder。唯一保留本地的是无 source 的 blocker/warning/recommendation 行。DeploymentSafetyMessage 没有 source 字段，使用 builder 标准 messages 会改变输出，因此仍然用本地 `renderMessages` 后作为 lines section。

`renderIdpVerifierBoundaryMarkdown(profile)` 是第三个入口。Current Verifier、OIDC Contract、Checks、Summary、Evidence Endpoints 和 Next Actions 是标准 section；Verifier States 是本地三级标题子块，保留 `renderVerifierState` 并通过 `renderVerifierStates(...).slice(0, -1)` 处理尾空行。`renderIdempotencyVerticalReadinessReviewMarkdown(profile)` 是第四个入口，它原来已经用 `liveProbeReportUtils`，本版只把外框换成 builder，并保留 Artifacts 里的 Java Boundary、mini-kv Token Primitive、Node Safety Envelope 三个固定三级标题。

## Response Model / 响应模型

这四份报告的响应模型有两种 message。deployment environment 和 idempotency review 的 message 带 `source`，输出格式正好等于 builder 标准 messages：`CODE (severity, source): message`。deployment safety 和 IdP boundary 的 message 没有 source，必须保持 `CODE (severity): message`。v2139 因此没有一刀切，而是让带 source 的报告直接使用 builder messages，让无 source 的报告走本地 lines。

这版还出现两类局部分区。第一类是 prefixed evidence，deployment environment 的 Evidence section 要把两个子对象压到同一组列表里，并保留不同 prefix。第二类是 nested h3 section，IdP verifier states 和 idempotency artifacts 都用 `###` 分块。它们看起来相似，但语义不同：一个描述 verifier 状态机，一个描述 Java、mini-kv、Node 三方证据包。因此本版没有新增通用 nested helper，只用本地 wrapper 保持旧输出。

## Upstream Evidence and Config / 上游证据与配置

v2139 不要求 Java 或 mini-kv 提供 fresh evidence。idempotency review 仍然引用既有 Java v52 和 mini-kv v61 只读证据；deployment environment 和 deployment safety 使用 Node config；IdP boundary 使用 Node 的 IdP 配置形状。也就是说，Java / mini-kv 可以继续照各自 playbook 并行推进，Node 本版没有改变跨项目契约，也没有要求新的 upstream 服务启动。

配置含义也没有变化。`UPSTREAM_ACTIONS_ENABLED` 为 true 时仍然是 blocker；IdP issuer/audience/JWKS URL 缺失仍然是 production auth blocker；managed audit adapter 未连接仍然是 deployment blocker；idempotency review 中 mini-kv 仍然只是 TTL token candidate，不是 order truth source。renderer consolidation 不参与这些判断，只复用 loader 已经算好的 profile。

## Service Flow / 服务流程

deployment environment 的流程是：创建 signed auth token contract 和 managed audit store contract，计算部署检查，再把配置、证据、checks、summary、messages 输出为 Markdown。deployment safety 的流程是：读取运行时配置，检查 host、port、log level、fixture path、upstream timeout 和 action flag，再生成 blockers/warnings/recommendations。迁移后，二者的业务计算路径完全未动，只是 renderer 函数改为声明 builder spec。

IdP boundary 的流程是：构造 local-hmac-rehearsal、oidc-boundary、oidc-connected 三个 verifier state，检查 issuer、audience、JWKS URL、clock skew、真实 verifier 是否连接，再输出边界报告。idempotency review 的流程是：固化 Java v52 boundary 和 mini-kv v61 TTL token primitive，计算 review digest 与 checks，再输出 Artifacts、Summary 和 messages。迁移后，digest、state、artifact 字段都没有重新解释。

## Safety Boundary / 安全边界

这版靠近“真实执行”的外围，但没有放开任何执行。Deployment environment 仍然明确 readyForDeployment 为 false；deployment safety 即使 suitableForProductionDemo 为 true，也只表示安全 smoke/demo 配置层面没有 blocker，不等于 upstream actions 可以打开；IdP boundary 仍然不 fetch JWKS、不连接外部 IdP、不授权请求；idempotency review 仍然 read-only，不启动 Java、mini-kv，不写上游状态。

公共 builder 的边界也保持干净。它不理解 deployment readiness、不理解 OIDC、不理解 idempotency，只负责标题、meta、section 空行和 entries/messages/list/lines 渲染。局部 prefix、verifier state 和 artifact 三方分块留在 owning service 附近，方便 reviewer 判断业务含义。

## Test Coverage / 测试覆盖

本版先跑 `npm run typecheck`，确认四个 renderer 的 builder spec、local wrapper 和剩余 imports 正确。focused tests 覆盖 4 个文件 / 12 个测试：deployment environment 的 missing/ready rehearsal、deployment safety 的 safe/actions-on、IdP complete/missing、idempotency ready/blocked 和 route Markdown。随后临时逐字节对比从 `git show HEAD:<path>` 读取旧实现，用 8 个 profile 比较旧 renderer 和新 renderer，确认每个输出字符串完全一致。

逐字节对比特别保护三个风险点：deployment evidence 的 prefix key 不能丢，IdP verifier states 和 idempotency artifacts 的三级标题不能多空行，source-less message 不能误加 source。对 N1 来说，这比只看 route 200 更关键，因为本批不是重写业务，而是证明公共外框替换没有改变公开文本。

## Maintenance Decision / 维护决策

v2139 的维护决策是把部署与身份边界作为一组收口。它们都不是小文件，但共同重复的是报告外框；局部差异也清晰可控。没有新增共享 helper，是因为 prefixed evidence、verifier states、idempotency artifacts 还不足以证明需要一个公共 nested section API。继续用本地 wrapper 可以保持 builder 简单，也让下一批 controlled shard preview renderer 有更清楚的分类标准。

## File Decisions / 文件级决策

`deploymentEnvironmentReadiness.ts` 的关键不是 entries 本身，而是 Evidence 分区的 prefix。旧报告把 signed auth token contract 和 managed audit store contract 两个子对象压到同一个 Evidence section 里，并通过 `signedAuthTokenContract.*`、`managedAuditStoreContract.*` 保留来源。这个投影不适合直接用 builder entries，因为 builder 不知道 prefix 语义。v2139 因此新增本地 `renderEvidence`，让 Evidence 继续以旧格式输出，其余 Environment、Checks、Summary、messages 和 next actions 交给 builder。这个切分可以避免为了一个 prefix 用例扩展公共 API。

`deploymentSafetyProfile.ts` 则是纯粹的基础报告。Config Snapshot 里虽然含有嵌套 fixtures 对象，但旧 renderEntries 和 builder renderEntries 都会把对象 JSON 化，因此输出等价。这里保留本地 `renderMessages` 只是因为 message 没有 source。这个文件迁移后删除了本地 entries、list、formatValue 三个 helper，说明 builder 对普通对象报告已经足够成熟。

`idpVerifierBoundary.ts` 的 Verifier States 分区类似 v2138 的 command/sample 子块，但语义更靠近状态机。local-hmac-rehearsal、oidc-boundary、oidc-connected 三个状态分别说明当前 rehearsal、配置边界和未来连接态。它们需要三级标题，是为了让 reviewer 快速区分“当前可用”“配置形状已定义”“真实连接未完成”。保留 `renderVerifierState`，只在 wrapper 里裁最后尾空行，是最小改动。

`idempotencyVerticalReadinessReview.ts` 的 Artifacts 分区更特殊：Java Boundary、mini-kv Token Primitive、Node Safety Envelope 是三方证据并列，不是同一种对象数组。它原本已经使用 `liveProbeReportUtils`，所以这次迁移不是删除很多本地 helper，而是把外框从数组转成 builder spec。`renderArtifactSections` 保留固定三级标题，其他 section 直接走 builder。这个做法保持 Java / mini-kv 证据叙事不变，也没有误导成新跨项目契约。

## Verification Meaning / 验证含义

本版的 focused tests 和逐字节对比分别保护不同层面。focused tests 证明四个真实 route 和 profile 仍然返回正确业务状态，例如 deployment environment 仍然报告真实 IdP 和 managed adapter 缺失，deployment safety 仍然在 upstream actions 打开时阻断，IdP boundary 仍然不连接外部 IdP，idempotency review 仍然在 upstream actions 打开时 blocked。逐字节对比则证明 Markdown 排版没有变化。

临时对比覆盖 8 个 profile，是为了避免只测 happy path。deployment environment 有 missing 与 ready rehearsal 两种配置；deployment safety 有 safe 与 actions-on；IdP 有完整 OIDC shape 与缺失配置；idempotency 有 ready 与 blocked。每个 profile 都用旧实现和新实现同时渲染，字符串必须完全相同。这样即使多一个空行、少一个 prefix、message 多一个 source、artifact 顺序变化，测试都会失败。

## Production Boundary / 生产边界

v2139 很容易被误读为“部署/身份/idempotency 更接近执行了”，所以讲清边界很重要。Deployment environment 仍然只是 readiness gate，它读取配置和 contract evidence，不做部署；deployment safety 即使适合 demo，也只是说明配置层没有 blocker，不代表可以打开 upstream actions；IdP boundary 只记录 OIDC/JWKS 配置形状，不做网络调用；idempotency review 只读取历史 Java / mini-kv 证据，不授权写入。

真实执行还需要几个前置：真实 IdP verifier、JWKS cache、managed audit adapter、审计保留与恢复策略、Java idempotency store abstraction、mini-kv recovery evidence、Node controlled drill runbook、明确 operator approval。v2139 没有跳过这些前置，只是把围绕这些前置的报告外框变得统一。统一报告外框的价值，是后续审阅时可以把注意力集中在 blockers 是否被真实关闭，而不是被 Markdown 噪声分散。

## Cross-project Position / 跨项目位置

Java 和 mini-kv 在本版里继续是 recommended parallel。原因是 Node 没有要求 fresh evidence，也没有修改 Java / mini-kv 要消费的 contract。idempotency review 引用的是旧的 Java v52 和 mini-kv v61 固定证据，本版只是改变 Node 如何渲染这份 review。若后续进入 controlled idempotency drill 或 shard preview，才需要明确列出 Java / mini-kv 的新版本前置和服务启动要求。

这个状态应该在计划里持续写清楚。只要 Node 做的是本地 renderer consolidation、只读历史 evidence 消费、archive explanation 或 route quality 维护，就不该阻塞 sibling project。只有当 Node 明确需要 fresh Java / mini-kv evidence、需要 live integration 或需要共同修改 schema 时，才把它们列为等待项。v2139 没有触发这些条件。

## Next Scan Strategy / 下一轮扫描策略

后续 controlled shard preview 相关 renderer 数量很多，不能简单按文件名批量迁。建议先分四类：第一类是标准完整报告，能继续迁；第二类是单一 nested h3 list，可能迁但要逐字节对比；第三类是 worksheet、manual evidence entry、operator packet draft 这类人为填写材料，可能更适合保持本地；第四类是 text package comparison、approval artifact preflight 这类带特殊空行和 snippet 语义的文件，应该先记录暂缓原因。

如果下一轮要继续多文件批次，最好优先挑同一类别，不要把标准 report 和 worksheet 混在一版里。这样讲解能讲出共同维护收益，验证也能设计得更清楚。若只能找到边界模糊的文件，就应先做“剩余 renderer 分类清单”版本，而不是硬迁移。这个判断符合当前 AGENTS 里的治理增长控制：先证明复用必要性，再增加抽象或继续迁移。

## Operational Review / 运维审阅

从运维角度看，v2139 让四份关键报告更容易横向比较。deployment environment 说明生产前置缺什么，deployment safety 说明本地运行时是否能安全展示，IdP boundary 说明身份验证还停在哪个阶段，idempotency review 说明跨项目幂等证据是否只是只读准备。这些报告未来会被 production readiness summary、route quality gate 和人工 review 一起引用。外框统一后，审阅者可以更快定位“哪个 section 是结论、哪个 section 是证据、哪个 section 是下一步”。

这也降低了后续改动的回归面。比如以后 deployment environment 增加 secret manager check，只需要改 profile 和 Evidence/Checks 对应字段，不需要再复制一整套 Markdown 空行。以后 IdP boundary 增加 JWKS cache state，也只需要扩展 verifier state 本地 helper。以后 idempotency review 增加 Java v53 或 mini-kv v62 固定证据，也可以在 Artifacts 本地分区里扩展，而不影响 builder。公共模板稳定，局部业务可变，这就是后期保养要达到的状态。

## Regression Risks / 回归风险

本版最可能出错的地方不是类型，而是格式。Deployment environment 的 Evidence section 如果用普通 entries，会丢 prefix；IdP verifier states 如果不裁尾空行，会在 Checks 前多一行；idempotency Artifacts 如果让 builder 直接展开对象，会丢 Java/mini-kv/Node 三段标题；deployment safety 如果误用标准 messages，会把 source 位置加进无 source message。逐字节对比覆盖这些风险，说明迁移没有悄悄改变公开文本。

另一个风险是误删 import。idempotency review 仍然需要 `renderEntries` 来生成 Artifacts，本版只移除了 `renderList` 和 `renderMessages` 的直接 import；deployment environment 仍然需要本地 `renderEntries` 支持 prefix；deployment safety 和 IdP 则可以删掉本地 entries/list/formatValue。这个差异值得记录，因为下一批长名 renderer 很可能也会出现“某个旧 helper 只为局部分区保留”的情况，不能机械删除。

## Closeout Standard / 收尾标准

v2139 的收尾标准不是迁移数量，而是四个条件同时满足：第一，四个报告的公开 Markdown 逐字节不变；第二，builder 没有新增单例分支；第三，计划和归档明确 Java / mini-kv 可以并行；第四，后续扫描方向从“继续找标准报告”推进到“先分类 controlled shard preview”。只有这四点同时成立，本版才算真正改善维护性，而不是把重复代码从一个地方挪到另一个地方。

这也给下一版留下了清晰入口：先做剩余形状清单，再决定继续迁移还是先收紧分类规则。

如果下一版进入分类清单，应该把每个暂缓文件的原因写进计划，方便复查。

这样后续批次才不会重复踩同一类边界。

分类先于迁移，能让后续提交更稳。

后续扫描应开始从“标准 profile”转向“controlled shard preview 分组”。那一组文件很多，且含有 worksheet、approval packet、text package comparison、operator evidence intake 等文档型渲染。下一步不宜机械批量迁移，而应先分类：标准报告可迁；单一 nested h3 可迁；多层命令文本、compact spacing、人工证据模板应暂缓或另设 builder 边界。

## Review Notes / 审阅要点

审阅 v2139 时，重点看四处：deployment environment 的 Evidence 是否仍有 `signedAuthTokenContract.*` 和 `managedAuditStoreContract.*`；deployment safety 的 message 是否仍无 source；IdP boundary 的 `### local-hmac-rehearsal` 等 verifier states 是否空行不变；idempotency Artifacts 的 Java / mini-kv / Node 三段是否顺序不变。再确认 Java / mini-kv 没有 fresh evidence 前置要求，本版只是 Node 本地报告维护。

## One-sentence Summary / 一句话总结

v2139 把 deployment environment、deployment safety、IdP verifier boundary 和 idempotency vertical readiness review 四份部署与身份边界报告迁入 `verificationReportBuilder`，保留 prefix evidence 与本地三级标题子块，并用 focused tests 和 8 个 profile 的逐字节对比证明输出不变。
