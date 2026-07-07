# v2165 代码讲解：成组迁移 human approval artifact review 两个完整文档 renderer

## Goal and Non-goal / 目标与非目标

v2165 继续推进 N1 renderer consolidation，这次选择 human approval artifact review 这一段的两个完整 Markdown renderer：`managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketRenderer.ts` 与 `managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationRenderer.ts`。前者输出 Node v308 human approval artifact review packet，后者输出 Node v311 对 Java v144 与 mini-kv v137 post-echo decision evidence 的只读验证报告。两个文件都具有完整报告形状，适合迁移到 `renderVerificationReportMarkdown`。

本版非目标是：不改 review packet 的 required/prohibited/rejection/missing/no-go/upstream echo 语义，不改 post-echo verification 的 Java/mini-kv evidence 读取，不改 historical fallback，不改 route/schema，不启动 Java 或 mini-kv，不放开 runtime shell，也不声称真实执行已经发生。它只是把报告外壳统一到 builder，继续保持所有执行边界关闭。

这两个文件合并成一版，是因为它们属于同一 human-approval 链。v2164 已经处理 approval prerequisite 与 abort/rollback intake，本版继续往后消化 human approval artifact review 的 contract packet 与 post-echo verification。它们都带动态 generatedAt，都有 focused route/fallback tests，都有内部 H3 子列表，因此可以共享迁移方法，又能分别保留 hash 证明。

## Entry Points / 入口与调用关系

第一个入口是 `renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketMarkdown(profile)`，由 `loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket` 生成 profile 后调用。它消费 Node v307 approval prerequisite artifact upstream echo verification，产出 Node v308 review packet，并通过 audit route 输出 Markdown。

第二个入口是 `renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMarkdown(profile)`，由 post-echo upstream verification loader 调用。它消费 Node v310 decision gate、Java v144 echo、mini-kv v137 non-participation receipt，生成 Node v311 verification report。测试覆盖 ready profile、historical fallback、blocked upstream probes/actions、JSON route 和 Markdown route。

两个入口的函数签名、route path、profile 类型都没有变化。调用方仍按原方式拿到 Markdown；变化只是函数内部从手写数组拼接变成 report builder spec。review packet 的 `renderReviewPacket`、upstream verification 的 `renderJavaReference` 和 `renderMiniKvReference` 仍保留本地，因为这些 helper 展开的是领域证据和 contract 子列表。

## Response/Data Model / 响应与数据模型

human approval artifact review packet 的 meta 包含 service、generatedAt、profileVersion、reviewPacketState、runtime shell chain decision、ready flag、active Node review version、下一轮 Java/mini-kv/Node 版本、parallel echo readiness、runtime shell implemented、runtime shell invocation allowed、execution allowed、connects managed audit。section 包含 Source Node v307、Review Packet Contract、Necessity Proof、Checks、Summary、Production Blockers、Warnings、Recommendations、Evidence Endpoints、Next Actions。

post-echo upstream verification 的 meta 包含 service、generatedAt、profileVersion、verificationState、runtime shell chain decision、ready flag、active Node verification version、runtime shell implemented、runtime shell invocation allowed、execution allowed、connects managed audit。section 包含 Source Node v310、Java v144 Echo、mini-kv v137 Receipt、Echo Verification、Checks、Summary、Production Blockers、Warnings、Recommendations、Evidence Endpoints、Next Actions。

两个输出都带动态 generatedAt，所以测试采用规范化 hash。review packet 固定 generatedAt 后的 SHA-256 是 `ba1e40b6301beec744107f7829f3f6594330422daf9d841ade3f833f38c44d9c`，长度 12748，结构为 1 个 H1、10 个 H2、6 个 H3。post-echo verification 固定 generatedAt 后的 SHA-256 是 `77b2b2f105c54dbe61e8553bf166a2ea5fde5b39d5988de6ba2f775457511638`，长度 23227，结构为 1 个 H1、11 个 H2、4 个 H3。两个文档都保留尾换行。

## Upstream Evidence / 上游证据与配置边界

review packet 的上游是 Node v307 approval prerequisite artifact upstream echo verification，里面已经对 Java v142 和 mini-kv v135 的历史 evidence 做过只读对齐。v2165 不重新读取这些 sibling repo 的 live 文件，只沿用 loader 通过 historical fallback 得到的 profile。post-echo verification 的上游更靠后，读取 Java v144 与 mini-kv v137 的历史 evidence 文件，并验证它们 echo 了 Node v310 decision gate。

本版没有改任何 evidence resolver，也没有新增 fixture。测试中的 fallback 仍通过 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK` 走 committed historical fixture 路径。这样 GitHub runner 不需要本机 sibling workspace，也不会因为 Java/mini-kv 当前工作树状态影响 Node renderer migration。

因此 Java 与 mini-kv 在 v2165 中仍是 recommended parallel。Node 不要求它们提供新证据，不要求它们执行服务，不修改共享契约。若后续进入 real joint testing，必须单独写启动、端口、PID、cleanup owner、fresh output 和 no-write gate，不能把 historical fixture fallback 误读为真实联合执行。

## Service Flow / 服务流程与等价路径

旧 renderer 都是手写数组：H1、空行、meta bullet、每个 H2 的标题和空行、section body、section 间空行、最后尾换行。新 renderer 使用 `renderVerificationReportMarkdown`，title 映射 H1，meta 映射 H1 下 bullet，sections 依次描述 H2 块。builder 默认 H2 后空行和结尾尾换行，正好匹配这两个旧文件。

review packet renderer 的 Source Node v307、Review Packet Contract、Necessity Proof 使用 `lines`，因为这些 section 通过本地 helper 精确控制条目展开；Checks、Summary、Evidence Endpoints 使用 `entries`；Production Blockers、Warnings、Recommendations 使用 `messages`；Next Actions 使用 `list`。post-echo verification renderer 的 Java v144 Echo 和 mini-kv v137 Receipt 也使用 `lines`，保留 Evidence Files 与 Expected Snippets 两组 H3 子列表。

这次没有使用 trimming，也没有设置 `bodyLeadingBlankLine: false`。原因和 v2164 一样：旧文档每个 H2 后都有空行，子列表之间也保留标准空行。迁移策略延续“先测旧输出，再选择 builder 参数”的规则，而不是把 v2163 的 rehearsal 空行特殊策略机械套到所有文件。

## Safety Boundary / 安全边界与只读性质

human approval artifact review packet 仍然是 contract-only 文档。它要求 operator approval reference、credential handle review status、endpoint allowlist review status、no-network safety reference、manual abort/rollback reference 等字段，但不读取 credential value，不渲染 raw endpoint URL，不发 external request，不写 approval ledger，不执行 schema migration，也不请求 runtime shell invocation。

post-echo upstream verification 也是只读验证报告。它证明 Java v144 和 mini-kv v137 的历史证据 echo 了 Node v310 decision gate，并且 side-effect boundaries closed。测试只在 Node 进程里加载 fixture 和注入 Fastify route，不启动 Java，不执行 mini-kv CLI，不打开 TCP 连接。blocked-path 测试继续证明 upstream probes 或 actions 打开时会阻断 ready state。

这种只读边界是生产前治理项目的核心。renderer migration 不能把“文档看起来 ready”改造成“系统可以执行”。v2165 的证据只支持“两个 human-approval Markdown renderer 已标准化且输出等价”，不支持“真实分片联合执行已完成”。这条线必须保持清楚。

## Test Coverage / 测试覆盖与机械门

v2165 在两个 focused tests 中增加规范化 Markdown hash。review packet 测试断言尾换行存在、H2 数为 10、H3 数为 6、长度 12748、SHA-256 为 `ba1e40b6301beec744107f7829f3f6594330422daf9d841ade3f833f38c44d9c`。post-echo verification 测试断言尾换行存在、H2 数为 11、H3 数为 4、长度 23227、SHA-256 为 `77b2b2f105c54dbe61e8553bf166a2ea5fde5b39d5988de6ba2f775457511638`。

focused gate 使用 `npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket.test.ts test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification.test.ts test/rendererCensusScript.test.ts --maxWorkers=2`，3 个 test file、10 个测试通过。反向门 stderr `Renderer census regression: 53 exceeds --max-unstandardized=52` 是预期结果，证明 shrink-only gate 已收紧。

`npm run renderer:census -- --max-unstandardized=53` 通过，当前 census 为 245 total、192 standardized、53 unstandardized，remaining shape signals 为 h3 4、forLoop 0、map 47、flatMap 41。`npm run typecheck`、`npm run lint`、`npm run build` 全部通过，lint 仍为 0 error / 263 warning 基线。

## Failure Modes / 失败模式与排查顺序

如果 hash 失败，先检查测试是否固定 generatedAt。两个 profile 的运行时生成时间会自然变化，直接 hash 原始输出会误报。若 generatedAt 已固定，再看长度和结构计数。长度不变但 hash 变，通常是 label、字段顺序或文本变化；长度变化则可能是 H2/H3 空行、尾换行、list 内容或 expected snippet 输出改变。

如果 historical fallback 相关断言失败，不要先改 renderer。review packet 失败可能来自 Node v307 source chain，post-echo verification 失败可能来自 Java v144 或 mini-kv v137 fixture 路径。renderer 只展示 loader 给出的对象；证据读取失败应在 resolver、fixture 或 upstream verification loader 层排查。

如果 census 数字不是 192/53，要看方向。高于 53 是回退，说明某个标准化 marker 丢失；低于 53 是又有人迁移了 renderer，需要同步更新 baseline、证据和讲解。不能只改 census 数字，因为数字本身不是输出等价证明。

## Version Slicing / 版本切片理由

v2165 一次迁移两个 human-approval renderer，是为了保持版本工作量充实，但仍然可 review。它们同族、同形、同样有 dynamic generatedAt，同样有 route/fallback focused tests，同样是 full-document report。合并迁移使 H3 shape signal 从 14 降到 4，说明本版消化的是剩余 renderer 中比较重的 H3 展开部分。

这版没有继续把 post-echo decision gate renderer、governance stop closure decision renderer 等其它 human-approval 文件一起迁走。那些文件虽然同名相近，但结构不同，有的 H3 数少，有的更像 decision record，有的可能适合单独迁移或与另一批同形文件合并。保持成组边界清晰，比一次性扫完更利于 review。

后续可考虑迁移剩余 4 个 H3 signal 文件，或转向 map/flatMap 主导的 Java/mini-kv runtime execution renderer。v2165 给出的经验是：同族成组迁移可行，但每个文件仍要独立 hash、独立结构断言、独立说明动态字段。

## Maintenance Notes / 后续维护提示

维护这两个 renderer 时，top-level report 结构应改 builder spec，领域子列表应改本地 helper。review packet 的 required/prohibited/rejection/missing/no-go/upstream echo 字段不要塞进通用 builder；post-echo verification 的 Evidence Files 与 Expected Snippets 也不要抽成没有语义名字的通用数组。抽象应该收敛重复外壳，而不是遮蔽业务含义。

若未来 Java v144 或 mini-kv v137 evidence 规则变化，应先更新 upstream loader 与 focused tests，再更新 renderer hash。若只是 renderer 重构，hash 必须不变。这个区分能让 reviewer 知道自己是在看行为演进，还是在看展示层维护性改造。

还要继续保持 lint 基线。v2165 迁移后没有引入新的 unused import，说明 v2164 的教训已经吸收：当 messages/list 渲染交给 builder 后，renderer 文件只保留本地 helper 真正需要的 imports。小的基线纪律会保护后续更大的工程质量。

## Builder Mapping / builder 映射规则

本版最关键的判断不是“能不能把所有代码都塞进 builder”，而是“哪些重复属于报告外壳，哪些重复其实承载业务语义”。H1、meta bullet、H2 标题、空行、尾换行、entries/messages/list 的基本排版，都是跨 renderer 重复的外壳，交给 `renderVerificationReportMarkdown` 后更容易统一，也更容易被 census 识别。相反，review packet contract 中 required、prohibited、rejection、missing、no-go、upstream echo 这些子块，是审批文档自身的语义结构；post-echo verification 中 Java evidence files、mini-kv expected snippets 也是跨项目证据的解释结构。这些内容如果抽成一个无名通用函数，会让代码短一点，却让后续 reviewer 更难判断字段从哪里来、为什么要渲染、缺失时该查哪一层。

因此 v2165 采用“外壳统一、领域 helper 保留”的分层。顶层 renderer 只描述报告标题、meta 与 section 顺序；本地 helper 继续负责把 profile 中的嵌套证据展开成人能检查的列表。这样迁移后文件职责更清楚：builder 负责格式稳定，本地 helper 负责领域翻译，loader 负责证据读取和状态计算。下一批 renderer 如果也有类似的 contract 子列表，应先按这个规则分类，而不是机械搜索 `renderMessages` 或 `renderEntries` 后逐行替换。

## Parity Method / 等价性证明方法

这两个 renderer 都带 `generatedAt`，所以不能直接对运行时 Markdown 做 hash。v2165 的做法是先用旧 renderer 在固定 `generatedAt = "2026-07-07T00:00:00.000Z"` 的 profile 上生成基准，再迁移到 builder 后用同一份归一化 profile 重算。hash、长度、H1/H2/H3 计数和尾换行共同组成等价证据：hash 证明完整文本没有改变，长度能快速定位空白或字面量变化，标题计数能发现 section 层级漂移，尾换行能覆盖很多 Markdown renderer 容易漏掉的末端格式差异。

这个组合比只断言包含某几段文字更严格。包含断言只能证明“关键片段还在”，不能证明字段顺序、空行、空消息文本、endpoint 列表和 expected snippets 没被改坏。反过来，只看 hash 又不方便排查；一旦失败，reviewer 很难知道是标题层级变了，还是某个字符串变了。v2165 同时保留结构计数，就是为了让后续维护者先看粗粒度结构，再进入具体 diff。后续批次可以复用这套方法，尤其适合带动态时间、历史证据和多段 H3 子块的 full-document renderer。

## Review Surface / 审查面如何缩小

旧实现的审查面分散在每一个字符串拼接点：数组里加一个空字符串会改变段落间距，`renderMessages` 的 empty text 改一下会影响 blocked/ready 两种输出，helper 顺序微调会改变整份 Markdown。迁移后，reviewer 首先只需要确认 builder spec 的 section 顺序是否与旧文档一致，再确认每个 section 使用的 body 类型是否正确。`lines` 适合已经由本地 helper 排好行的复杂块，`entries` 适合键值项，`messages` 适合 blockers/warnings/recommendations，`list` 适合 next actions。类型选择正确以后，很多低价值的空行审查就变成了 builder 的统一责任。

这并不表示审查可以变松。v2165 反而把审查重点从“手工排版有没有少写空行”转移到“是否改变了可审计证据”。例如 review packet 的 ready flag、runtime shell flags、active Node review version、next Java/mini-kv/Node version 仍然必须在 meta 中可见；post-echo verification 的 Java v144 和 mini-kv v137 来源仍然必须在独立 section 中展示；blocked upstream probe/action 的测试仍然必须证明开关打开时不会误报 ready。这些才是生产前治理代码真正需要反复盯住的地方。

## Cross-project Meaning / 跨项目含义

v2165 不要求 Java 和 mini-kv 提供新提交，因为它消费的是已经冻结在 Node historical fixtures 中的证据。这个边界很重要：Node 可以在本地继续收敛 renderer 维护性，而 Java、mini-kv 可以并行推进自己的计划书；三者不会因为这一版产生合同变化、端口占用或写入竞争。文档里把 Java 和 mini-kv 标成 recommended parallel，不是客气说法，而是对工程依赖的准确描述：Node 这里只验证历史证据的展示层等价，不验证新的 live output。

同时，v2165 也没有把“历史证据可展示”包装成“真实联合执行已完成”。真实分片联合执行以后需要 fresh Java jar、fresh mini-kv CLI、服务启动/清理责任、no-write gate 和一个统一 readiness 命令；这些都不在本版范围内。本版的价值是把审批链上两份较重的报告纳入统一 renderer 体系，让未来做 capstone 时审计文档更稳定、差异更少、门禁更容易收紧。它是前置治理，不是最终联调。

## Next Migration Guidance / 下一批迁移指引

完成 v2165 后，census 从 190/55 推到 192/53，H3 signal 从 14 降到 4。这个数字说明最重的一组 H3 展开已经被消化，后续选择可以有两条路：一条是继续清掉剩余 H3 renderer，让 full-document report 的层级特殊性更少；另一条是转向 map/flatMap 主导的 runtime execution renderer，把 repeated list rendering 继续收进 builder。选择哪条路要看文件是否同形，而不是只看文件名。若两个文件都服务 human approval，但一个是 decision record、一个是 governance stop closure，就不应该为了版本数量硬合并。

下一批开工前应先做三件事。第一，用 census JSON 确认当前未标准化文件和 shape signal，避免凭记忆挑文件。第二，对候选 renderer 先生成旧输出 hash，确认是否存在动态字段、H3 子块或特殊空行。第三，读 focused tests，看它们是否已经覆盖 route、fallback、blocked path；如果测试只覆盖 JSON，不覆盖 Markdown，就要在迁移时补上 Markdown 等价断言。这样每一版都能自然写出有价值的讲解，而不是迁移完成后再反向凑说明。

## Operational Checklist / 操作检查表

如果后续有人改动本版两份 renderer，最小检查顺序应是：先跑两个 focused test，确认 normalized hash 不变；再跑 renderer census，确认 192/53 没回退，或者在新增迁移时只向更小的 unstandardized 数字移动；然后跑 typecheck、lint、build，排除 import、类型和编译产物问题；最后跑代码讲解质量门，确保文档仍然符合中文、结构和可读性约束。这个顺序能把问题分层：输出等价先于全局质量，文档合规后于代码证据。

若某一步失败，不要直接改 expected hash。hash 失败首先要回到旧输出对比，判断是业务行为被故意修改，还是 builder 参数或 helper 顺序造成展示漂移。只有当需求明确要求报告内容变化，并且 tests、evidence、changelog、讲解都同步说明原因时，hash 才能更新。N1 renderer consolidation 的默认规则仍然是 byte-identical migration；这个默认值越稳定，后续真正要做跨项目 live capstone 时，reviewer 越能把注意力放在新执行路径上，而不是被历史 Markdown 噪声拖住。

## One-sentence Summary / 一句话总结

v2165 将 human approval artifact review packet 与 post-echo decision upstream echo verification 两个完整 Markdown renderer 成组迁移到 `renderVerificationReportMarkdown`，并用规范化 hash、结构断言、route/fallback focused tests、census ratchet、typecheck、lint 和 build 证明输出等价、安全边界不变、跨项目契约未变。
