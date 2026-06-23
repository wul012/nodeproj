# v2154 Production Read-only Window Markdown Renderer Consolidation

## Goal and Non-goal / 目标与非目标

v2154 的目标是整理 production live probe real-read smoke read-only window 这一组完整 Markdown 报告。它们都位于 `src/services/productionLiveProbeRealReadSmokeReadOnlyWindow*MarkdownRenderer.ts`，负责把只读窗口 readiness packet、live capture、capture archive、archive verification、release evidence review 五类 profile 渲染成 Markdown。旧代码每个文件都手写 `#` 标题、header bullet、`##` 段落、artifact 下的 `###` 子段落、production blockers / warnings / recommendations，以及 Evidence Endpoints / Next Actions 尾部。本版把这些重复外壳收敛到 `releaseReportShared.ts`，让文件主函数只描述当前报告有哪些段落、每段读取哪个 profile 字段。

非目标必须说清楚。v2154 不改变只读窗口状态，不启动 Java 或 mini-kv，不打开 upstream probe 写动作，不读生产凭据，不导入真实 release evidence，也不把 skipped capture 变成 production pass evidence。它不是生产执行版，也不是跨项目 live integration 版；它只整理报告渲染层。报告里仍然会出现 production pass、read-only window、capture archive、release evidence review 等词，但这些词来自原 profile 字段，并不表示本版授予执行能力。

本版还刻意不把这五个文件迁进 `verificationReportBuilder`。过去三十多个 renderer consolidation 版本主要处理 verification-report 风格的报告：标题、meta、若干 verification section、h3 block。read-only window 这组不同，它们是 production live-probe / release-report 风格，天然有 evidence endpoints、next actions、messages、artifact subsections、captured records、operator requirements 等结构。把它们塞进 verification builder 会让 builder 语义变宽，短期能减少行数，长期会让维护者分不清报告类型。因此 v2154 选择扩展已有 `releaseReportShared`，让 release/probe 报告走自己的共享层。

这个判断也影响后续版本的路线。renderer consolidation 不能只看文件名里有没有 Markdown，也不能只看函数是否返回 string。一个成熟工程后期真正要保养的是“同类输出走同类合同”：verification 报告强调检查项和证据块，profile fragment 强调局部 `##` 片段，release/probe 报告强调人工审查材料、证据端点和下一步动作。v2154 把这条分类线落到代码里，后续再遇到 production live probe 或 ops promotion 的尾部报告时，可以先判断它属于哪类合同，而不是把所有 Markdown 都拖向同一个工具。

## Entry Points / 入口

共享入口在 `src/services/releaseReportShared.ts`。本版新增或导出的核心 helper 包括 `renderReleaseReportHeader`、`renderReleaseReportEntriesSection`、`renderReleaseReportLineSection`、`renderReleaseReportItemSection`、`renderReleaseReportEntriesSubsectionGroup`、`renderReleaseReportMessagesSection` 和 `renderReleaseReportTail`。这些函数都只接收已经构造好的 profile 字段，然后返回 Markdown 行数组。它们不读取配置，不访问网络，不创建审计记录，不启动服务，也不决定任何 ready 状态。

五个业务入口仍然保持原导出名不变。`renderProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdown` 继续渲染 readiness packet；`renderProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdown` 继续渲染 live capture；`renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveMarkdown` 继续渲染 capture archive；`renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationMarkdown` 继续渲染 archive verification；`renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewMarkdown` 继续渲染 release evidence review。测试里稳定入口和 renderer 文件入口仍然指向同一函数，因此 route 层无需感知这次重构。

每个 renderer 的主函数现在更像一份报告目录。先调用 `renderReleaseReportHeader` 输出 `#` 标题和 header bullets；再用 entries section 输出 Packet、Capture、Archive、Verification、Review、Checks、Summary 等对象段；需要直接输出 bullet list 的地方用 line section，例如 readiness packet 的 Evidence Chain、Operator Window Requirements、Review Steps；需要 `###` 子段落的 Artifacts 用 entries-subsection group；captured records 这种每条记录自带 `###` 和空行的结构用 item section；最后用 messages section 和 tail 收束。

这些 helper 的粒度经过刻意控制。`renderReleaseReportHeader` 不接收 profile，只接收 title 和 header object，所以它不会知道什么是 live capture；`renderReleaseReportEntriesSection` 只负责 `##`、空行、entries、空行；`renderReleaseReportEntriesSubsectionGroup` 只负责一个 `## Artifacts` 下的多个 `###` object subsection；`renderReleaseReportTail` 只负责 Evidence Endpoints 和 Next Actions。每个 helper 都是排版合同，不是业务合同。这样即使后续报告新增字段，维护者仍然在对应 renderer 里显式列出 header object 和 section 顺序，不会被一个全能 builder 吞掉语义。

这组 helper 也故意没有提供“自动根据对象生成完整报告”的入口。自动化越强，越容易把字段顺序、章节含义和安全提示隐藏起来。v2154 只把重复的 Markdown 骨架集中，仍要求每个 renderer 显式写出章节顺序和 artifact 名称。这样 reviewer 可以快速看出报告是否遗漏了 Summary、Production Blockers 或 Evidence Endpoints，而不需要跳进一个配置驱动的大型 builder 里反推输出。

## Response Model / 响应模型

这五个 profile 处在同一条只读窗口链上。readiness packet 负责把 archive verification、operator runbook、runbook verification、manual Java start、manual mini-kv start、upstream probes requirement、upstream actions disabled 等人工窗口条件组织成 review packet。live capture 根据只读窗口是否打开、upstream probes 是否开启、upstream actions 是否关闭，记录五个目标的 capture record。capture archive 把 live capture 和 readiness packet 固化成 archive，但如果 capture 是 skipped 或 mixed，它仍然只能是 non-pass local evidence。

archive verification 再校验 capture archive 的 digest、profile version、reference、read-only flags 和 non-pass 语义。release evidence review 则把 archive verification 与 Java v51 field guide、mini-kv v60 field guide 合在一起，让 operator 能看到这份材料为什么仍然不是生产通过证据。整个响应模型是“只读窗口材料链”，不是“执行链”。每个 profile 都有 `readyForProductionOperations` 之类字段，但本版只是原样渲染它们，绝不在 renderer 层计算或翻转这些值。

Markdown 结构也有对应模型。Header 是报告身份，entries section 是一个对象的字段展开，line section 是已格式化好的业务列表，item section 是重复记录列表，entries-subsection group 是一个 `##` 下的多个 `###` artifact，messages section 是 blockers/warnings/recommendations，tail 是 Evidence Endpoints 和 Next Actions。v2154 的收益就是把这些模型从五个文件的手写数组里显式抽出来。

从输入输出角度看，五个报告像一条只读证据传送带。readiness packet 的输入是前置归档、runbook 和窗口要求，输出是人工审查包；live capture 的输入是窗口配置和上游客户端，输出是一组 captured records；capture archive 的输入是 live capture 和 readiness packet，输出是可归档但不等于生产通过的证据包；archive verification 的输入是 archive，输出是 digest 和引用一致性的检查结果；release evidence review 的输入是 archive verification 加两个兄弟项目 field guide，输出是 operator 可阅读的 release evidence 审查材料。renderer 不创造这些中间物，只把每一站的结果按固定章节展示出来。

## Upstream Evidence / 上游证据

本版没有请求 Java 或 mini-kv 提供 fresh evidence。哈希脚本使用本地测试配置构造 profile：`UPSTREAM_PROBES_ENABLED` 为 false，`UPSTREAM_ACTIONS_ENABLED` 为 false，access guard 打开，audit store 使用临时文件，dry-run approval ledger 写入一次本地批准记录。由于 probe window 关闭，loader 会生成 skipped capture 的只读 profile，不会连接真实 Java 或 mini-kv 服务。

为了避免 `generatedAt` 造成迁移前后 hash 漂移，临时脚本分两步工作。第一步在迁移前执行 capture：加载五个 profile，保存到 `.tmp/v2154-profiles.json`，同时生成 `.tmp/v2154-before.json`。第二步在迁移后执行 render：读取同一份 profile JSON，用新 renderer 重渲染并生成 `.tmp/v2154-after.json`。最后用 `Compare-Object` 比较 before/after JSON。这样对比的是 renderer 文本变化，而不是运行时间、临时目录或新 profile 生成时机。

这个做法比“迁移前跑一次、迁移后重新加载一次”更可靠。read-only window profile 里包含时间戳、digest、临时 audit store 路径间接影响的派生字段，以及 dry-run approval ledger 产生的审查记录。如果前后各自重新生成 profile，即使 renderer 完全没变，也可能因为时间或 digest 输入不同而得到不同 hash。v2154 先冻结 profile，再只比较 renderer，是为了把变量压到唯一：代码改动是否改变 Markdown 文本。

这里的上游证据边界很重要。profile 里会引用 Java v50/v51、mini-kv v59/v60 的说明材料，但这些引用是旧链条中已经固化的本地字段，本版没有重新读取兄弟工作树，也没有要求 Java 或 mini-kv 会话停下来配合 Node。三项目可以继续并行；Node 本版只是在本地报告层做结构保养。

## Service Flow / 服务流程

旧 readiness packet renderer 的流程是典型例子。函数先构造一个大数组，写标题和 header，再写 Packet、Checks、Evidence Chain、Operator Window Requirements、Review Steps、Artifacts、Summary、Production Blockers、Warnings、Recommendations、Evidence Endpoints、Next Actions。每个段落都手动插入空字符串。读者如果想确认“Artifacts 下有几个 `###` 子段落”，必须在长数组中逐行数；如果想确认 “Warnings 是否仍用 renderMessages”，也要在 header 和 artifact 行之间寻找。

迁移后，同一函数变成一串 helper 调用。`renderReleaseReportHeader` 负责 header；`renderReleaseReportEntriesSection("Packet", profile.packet)` 和 `renderReleaseReportEntriesSection("Checks", profile.checks)` 负责对象段；Evidence Chain、Operator Requirements、Review Steps 保留原本的本地 formatter，只是外层交给 `renderReleaseReportLineSection`；Artifacts 使用 `renderReleaseReportEntriesSubsectionGroup`，把每个 artifact 的 heading 和 entries 列成小对象。业务字段没有被动态化，也没有被反射遍历；只是重复 Markdown 外壳被统一。

live capture 的特殊点是 Captured Records。每条 record 仍然由本地 `renderCapturedRecord` 输出，因为它有 `### id`、状态字段、目标、协议、readOnly、mutatesState、attempted、message 和 JSON evidence summary。这个 helper 保留在文件内是对的，因为 captured record 的字段语义属于 live capture 自己。外层只使用 `renderReleaseReportItemSection("Captured Records", profile.capturedRecords, renderCapturedRecord)`，表示这是一个重复 item section。这样既减少重复外壳，又不把业务字段藏进通用 helper。

这里没有把 captured record 也做成 entries-subsection group，是因为它的字段不是简单对象展开：标题来自 record id，字段名有人工友好的大小写和空格，`Evidence summary` 还需要 `JSON.stringify`。如果为了“统一”而把它塞进 artifact subsection，会丢失 live capture 自己的表达习惯。v2154 的重构原则是只抽取重复结构，不抽取领域含义；哪里有特殊语义，哪里就保留本地 helper。

capture archive、archive verification 和 release evidence review 的迁移更直接。它们都有一个主对象段、Checks、Artifacts、Summary 和三类 messages。Artifacts 中的 Live Capture、Readiness Packet、Java Reference、mini-kv Reference、Archive Verification、Field Guide 等都可以用 entries-subsection group 表示。最终五个文件在结构上统一：报告身份、业务对象段、检查段、artifact 段、摘要段、消息段、证据端点和下一步。

## Safety Boundary / 安全边界

renderer 层必须保持纯输出。v2154 的 helper 只接收字符串、对象、数组和已格式化行，然后返回 Markdown 行。它不调用 `loadConfig`，不接触 `OrderPlatformClient` 或 `MiniKvClient`，不写 audit store，不创建 approval ledger，不启动 HTTP 服务。所有业务判断都在上游 loader 和 profile builder 中完成，renderer 只把结果展示出来。

安全边界还包括“不要把 skipped capture 说成通过”。这组报告中最敏感的字段是 read-only window 和 production pass 的关系。旧文本里明确说明 skipped 或 mixed evidence cannot pass，archive 也不会把 skipped capture archived as production pass evidence。迁移后 hash byte-identical，说明这些安全词、布尔值、warning code 和 blocker 文本都没有改变。如果一个空行漂移都能被 hash 发现，那么更不用说字段缺失或顺序变化。

另一个边界是 builder 选择。`verificationReportBuilder` 继续服务 verification-report 形态，`releaseReportShared` 服务 release/probe 形态。这个分层能防止一个通用 builder 越来越胖。后续如果遇到 ops promotion 或 production live probe 的其他 MarkdownRenderer，应先判断它们是否属于 release-report model；如果属于，就沿用 v2154 的 release helper，而不是为了降低“未迁移 verification renderer”数字而强行归类。

这也是为什么 v2154 的 summary 明确写出 verificationReportBuilder census 没有下降。表面指标不变，但维护债务确实下降了：五个尾部 MarkdownRenderer 从手写长数组变成 release helper 组合，后续同类报告有了更明确的迁移模板。工程后期不能只追一个数字，否则会鼓励错误归类；更好的指标是每类报告是否被放进匹配的共享合同里，并且是否能用 hash 证明输出没有漂移。

后续判断一个 MarkdownRenderer 是否适合沿用本版路线，可以看三个信号：第一，报告尾部是否固定包含 Evidence Endpoints 和 Next Actions；第二，主体是否由业务对象段、artifact 子段、blocker/warning/recommendation 消息段组成；第三，是否有人工审查或 release/probe 语义，而不是纯 verification checklist。三项都满足时，优先考虑 `releaseReportShared`；若只有局部 `##` 片段，则考虑 profile-section helper；若是完整 verification 报告，再考虑 `verificationReportBuilder`。这条判别规则能减少后续返工。

## Test Coverage / 测试覆盖

第一层验证是 pre/post hash。迁移前保存五个 profile，并记录五个 Markdown 输出的 length 和 SHA-256：readinessPacket、liveCapture、captureArchive、captureArchiveVerification、captureReleaseEvidenceReview。迁移后读取同一 profile 重渲染，`Compare-Object` 没有任何输出，证明五个报告字节级一致。这个验证覆盖了标题、header、section 顺序、artifact 子段落、message section、Evidence Endpoints、Next Actions、空行和尾部换行。

第二层验证是 focused tests：`test/productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.test.ts`、`test/productionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture.test.ts`、`test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.test.ts`、`test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.test.ts`、`test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.test.ts`，共 5 个文件 / 22 个测试通过。这些测试覆盖 loader 状态、route JSON、route Markdown、entrypoint re-export、blocked 状态和 skipped/pass 只读场景。

第三层是工程门：`npm run typecheck` 通过；`npx vitest run test/governanceGrowthRatchet.test.ts --testTimeout=180000` 通过，说明没有新增服务文件；`npm run lint` 通过，仍然是 0 error / 263 existing warnings。文档写完后还要跑 code walkthrough quality gate，确认新讲解中文字符数、章节形状、非占位内容和禁止执行声明都合格。

这组验证组合覆盖了不同风险。hash compare 防排版漂移，focused tests 防 route 和 loader 行为漂移，typecheck 防 helper 签名和泛型使用错误，ratchet 防“为了重构新增服务文件”，lint 防新增语法或规则错误，讲解质量门防版本材料缩水。它们一起说明 v2154 是一次可维护性提升，而不是把旧数组机械换成一组新函数名。

本版没有跑 full test 和 build，是按当前节奏控制验证成本：改动集中在五个 renderer 和共享 Markdown helper，focused tests 已覆盖对应 route、JSON、Markdown、blocked/pass/skipped 场景，hash 又提供字符级输出证明。等累计四五个相邻版本后，再做更大范围 CI 更合适。

下一版若继续沿 production live probe 线推进，可以优先扫描剩余带 Evidence Endpoints 和 Next Actions 的报告。若它们的 artifact 结构与本版一致，就直接复用 release helper；若出现新的表格或嵌套列表，再先写小范围 hash 证明，再决定是否扩展 helper。

这个顺序能让后续迁移先有判别标准，再有代码动作，减少为了追求版本数量而误改报告语义的风险。

这也是本版最重要的维护价值和后续判断依据。

## One-sentence Summary / 一句话总结

v2154 把 production live-probe read-only window 的五个完整 MarkdownRenderer 收敛到 `releaseReportShared` 的 release-report helper 组合，并用固定 profile 的 byte-identical hash、focused tests、typecheck、ratchet 和 lint 证明渲染输出、安全边界和三项目并行关系都没有漂移。
