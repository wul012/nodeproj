# v2169 代码讲解：runtime execution chain renderer 标准化

## Goal and Non-goal / 目标与非目标

v2169 的目标是把运行执行链上五个同步完整报告迁移到统一的 `renderVerificationReportMarkdown`。这五个入口分别是 `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeRenderer.ts`、`...PacketContributionReviewRenderer.ts`、`...PacketApprovalGateReviewRenderer.ts`、`...LiveReadGateRenderer.ts` 和 `...PassEvidenceCloseoutRenderer.ts`。它们处在同一条只读执行准备链上：先收集上游 runtime artifact progress，再审查 packet contribution，再进入 approval gate review，随后判断 live read gate 是否具备阅读条件，最后把 pass evidence closeout 整理成可审计报告。迁移的本质是把重复的 H1、meta、H2、entries、messages、next actions 拼装逻辑交给通用 builder，让每个 renderer 只保留本报告特有的数据展开函数。

本版的非目标同样明确。它不改变任何 loader 计算，不改变 route 注册，不改变 JSON schema，不改变 Java 或 mini-kv 的证据消费方式，不启动 Java 服务，不启动 mini-kv 服务，不连接 managed audit，不把 `readyForRuntimeLiveReadGate` 解释成生产执行授权。特别是 `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeRenderer.ts` 被故意留到后续版本，因为它是异步 smoke 报告，语义上比这五个同步报告更接近真实服务探测，应该单独做输出对账和失败边界说明。v2169 只解决“这些同步报告如何稳定排版”的问题，不把展示层重构伪装成功能推进。

## Entry Points / 入口与调用关系

五个公开 render 函数都保持原名和参数类型不变，调用方仍然传入对应 profile 并拿到 Markdown 字符串。`render...ArtifactUpstreamProgressIntakeMarkdown` 展示 Node v395、Java v162、mini-kv v153 的 artifact progress intake 结果；`render...PacketContributionReviewMarkdown` 展示 Node v396、Java v163、mini-kv v154 的 packet contribution 审查；`render...PacketApprovalGateReviewMarkdown` 展示 Node v397 的 approval gate inputs 和 gate review；`render...LiveReadGateMarkdown` 展示 Node v405 的 service targets 和 live read gate；`render...PassEvidenceCloseoutMarkdown` 展示 archive references、closeout、checks、summary 和后续动作。route 层不需要知道 builder 是否存在，测试也不需要改业务断言来适配迁移。

这些 renderer 的上游 service 已经负责了业务事实：读取历史 fixture 或本地证据，归纳 source profile，计算 checks、summary、messages、evidenceEndpoints 和 nextActions。renderer 不负责重新判断“是否批准执行”，也不重新计算 digest 或 readiness flag。迁移后每个文件的代码更像一张映射表：meta 保持原标签顺序；普通对象用 `entries`；消息用 `messages`；末尾建议用 `list`；带有内部字段顺序要求的数组继续通过本地 helper 展开成 `lines`。这种职责边界能防止 builder 变成新的业务规则中心。

## Response Model / 响应模型与报告结构

artifact upstream progress intake 报告是这一批的起点。它把 source Node、Java、mini-kv 三侧证据放在前面，然后展示 runtime packet requirement clarification、upstream progress clarification、checks、summary、messages、evidence endpoints 和 next actions。它回答的问题不是“可以执行了吗”，而是“上游项目给出的 artifact progress 是否足够让 Node 继续准备 runtime packet”。因此报告里保留了 sourceEvidence、verificationDocumented、ready flags 和缺口说明，方便 reviewer 知道哪些材料来自 sibling 项目，哪些判断来自 Node 自己的 intake。

packet contribution review 报告进一步把 contribution rows 展开出来，逐项说明 Node、Java、mini-kv 对 runtime execution packet 的贡献是否存在、是否可审查、是否需要补齐。approval gate review 则把 gate inputs 放到更靠近审批的位置，强调 operator approval、cross-project correlation 和 packet readiness 之间的关系。live read gate 报告展示 serviceTargets，每个 target 都带有 owner、endpoint、read-only intent、startup boundary 和 cleanup 语义。pass evidence closeout 报告收束 archiveReferences 和 closeout 结果，回答“这批只读准备材料是否形成了可复查证据包”。五个报告串起来像一条审计链，但每一环依旧是只读报告，不是执行器。

## Builder Mapping / builder 映射方式

本版最大的维护收益来自 `renderVerificationReportMarkdown` 的统一映射。旧 renderer 通常手写一个 `lines` 数组，再不断 `push` 标题、空行、`renderEntries` 输出和列表项。这样的代码很容易在复制时漏掉末尾换行、H2 空行或 messages 标题。迁移后，H1、meta、section 排布、messages 与 tail 都由 builder 统一处理，单个 renderer 只声明报告标题、meta 列表和 sections。它减少的不是业务代码，而是重复排版代码；这正是 N1 计划要收敛的风险面。

五个文件没有机械套同一种 section 写法，而是按旧输出的真实空行结构选择 builder section。Source Node、Java、mini-kv、checks、summary、messages、evidence endpoints、next actions 这种普通块可以直接拆成多个 section，因为旧输出在这些 H2 之间本来就有稳定空行。带数组行的块则保留本地 helper，例如 `renderRequirement`、`renderReviewRow`、`renderApprovalGateInput`，以及 service target 和 archive reference 的 `flatMap(renderEntries)`。这些 helper 不是业务判断，只是为了保留旧 Markdown 中嵌套对象的字段顺序和 bullet 形态。这样做比把所有对象直接交给通用 `entries` 更稳，因为审计材料中的字段顺序本身就是可读性的一部分。

## Service Flow / 服务流程与链路位置

从流程看，v2169 位于“真实联合执行之前”的最后一段材料整理层。artifact upstream progress intake 先确认 sibling artifact progress 和 Node 自身 requirement clarification；packet contribution review 进一步核对各项目对 runtime packet 的贡献；packet approval gate review 把这些贡献投射到审批门需要的输入；live read gate 描述如果进入只读探测，需要观察哪些服务目标、哪些端口和哪些只读约束；pass evidence closeout 则把已经形成的证据引用、检查结果和后续动作整理成收尾报告。每个 renderer 都展示 `executionAllowed=false` 或同等边界字段，避免把“材料准备充分”误读成“可以真实启动服务”。

这也是为什么本版不顺手迁移 approved local-loopback smoke。同步报告的输入都是普通 profile，渲染过程没有 `await`，也不代表真实服务探测已经发生。approved local-loopback smoke 的名字和加载方式更接近真实窗口验证，未来迁移它时需要额外说明启动责任、端口占用、进程清理、失败时如何区分服务不可达和 Markdown 漂移。把它混进 v2169 会让版本边界变糊，reviewer 也难判断这版到底是排版收敛还是 smoke 语义整理。保留它作为后续独立切片，是为了让版本解释和验证门都更诚实。

## Parity Method / 等价性证明

新增的 `rendererMigrationV2169Parity.test.ts` 使用真实 typed loader，而不是手写最小对象。测试设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，用固定 `generatedAt`，再把 fixture 绝对路径和 Windows/Linux 分隔符归一化。这样既能覆盖真实 profile shape，又能排除机器路径差异。每个 case 都断言规范化 Markdown 的长度、SHA-256、H1/H2/H3 数量和末尾换行。五个 hash 分别对应五份报告，任何空行、标题顺序、字段顺序、消息段落或换行漂移都会让测试失败。

这个 parity test 的意义不是重复 route 测试。route 测试证明 HTTP 层、auth headers、JSON/Markdown format 和 fallback 能走通；parity test 证明“builder 迁移没有改变字节级输出”。两类测试的故障定位也不同：如果 parity 失败，优先 diff Markdown，看 builder section 是否多插空行、helper 是否改了字段顺序、normalize 是否漏掉路径差异；如果 route 测试失败但 parity 通过，问题更可能在 route wiring、headers、loader 输入或访问控制。把这两种证据分开，后续修 CI 时不会把展示层问题和业务路径问题混在一起。

## Safety Boundary / 安全边界

运行执行链的命名很容易让人产生误解，所以 v2169 必须保留安全边界说明。五个 renderer 都只是报告生成器，不执行命令，不打开 socket，不解析 secret，不写 Java 或 mini-kv 状态，不生成新的审批事实。即使 live read gate 报告里出现 service target、endpoint、owner 或 cleanup rule，renderer 也只是把 profile 里已经存在的字段排版出来。真正的执行授权必须来自独立的 operator approval、明确的 service startup 计划、端口和进程归属、失败回滚规则，以及最后的 cross-project readiness gate。

builder 也不能承担安全判断。它只知道如何排版 title、meta、sections 和 messages，不知道某个 target 是否可启动，也不知道某个 packet 是否应该被接受。保持这个边界很重要：如果未来业务语义变化，应该修改 loader、types、route tests 和证据生成逻辑，而不是在 renderer 或 builder 里加入条件分支。v2169 的代码变化遵守这个原则，所有安全相关字段仍然来自 profile；renderer 只负责原样展示，并通过 SHA-256 parity 证明没有删改警告、blocker 或 next action。

## Test Coverage / 测试覆盖

本版已经通过 focused gate：`rendererMigrationV2169Parity.test.ts`、五个原业务测试和 `rendererCensusScript.test.ts` 共 7 个 test file、16 个测试通过。`npm run renderer:census -- --max-unstandardized=40` 也通过，输出为 205/245 standardized、40 unstandardized、H3 0、forLoop 0、map 43、flatMap 28。`npm run typecheck` 通过，说明新 builder spec、helper 返回值和 parity test 的类型关系都成立。后续收尾还会跑代码讲解质量门、readability closeout、lint 和 build；build 产生的 `dist` 会在提交前清理。

`rendererCensusScript.test.ts` 同步收紧到 205/245 和 unstandardized 40，并把 reverse ratchet 改成 `--max-unstandardized=39` 必须失败。这一点很关键：如果后续有人把某个已迁移 renderer 改回手写排版，census 不会安静退回 204；如果有人新增未标准化 renderer，也会被同一个门发现。N1 的收尾不是靠人工记账，而是靠每版收紧一个会失败的机械检查。v2169 继续遵守这个节奏。

## Maintenance Notes / 后续维护建议

后续处理剩余 40 个 renderer 时，可以把 v2169 当作同步完整报告的模板：先确认文件是否是完整报告，而不是上层报告的一段 section；再用真实 loader 做迁移前 hash；再按旧输出空行结构选择 section 粒度；最后用 parity test 固化长度、hash、标题层级和末尾换行。不要为了“看起来更统一”重排 Markdown 风格。N1 当前阶段的目标是实现入口收敛和字节等价，不是重写历史审计材料的版式。

剩余列表里还有 declared operator lifecycle、minimal read-only integration、sandbox handle review、cross-project readiness runner、production shard execution readiness 等不同家族。它们不一定都适合一版吃完。优先级应当看风险和收益：完整报告优先于局部 section；同步只读报告优先于异步 smoke；字段顺序简单的报告优先于带复杂审批语义的报告。每版都应该能写出清楚的输入、输出、边界和验证说明，而不是只按文件数推进。这样 N1 收尾才会越来越稳，而不是把最后 40 个文件变成维护噪声。

## Input Output Example / 输入输出例子

可以把本版的一次渲染理解成“结构化审计对象到稳定 Markdown”的单向转换。输入端不是原始文件路径列表，而是 loader 已经构造好的 profile。以 packet contribution review 为例，输入里已经有 source Node、Java、mini-kv 版本，已经有每个 contribution row 的 owner、artifact、present、reviewed、blockingReason 和 recommendation，也已经有 checks 与 summary。renderer 收到这些对象后，只做三件事：把 meta 字段按旧顺序列出，把 contribution rows 逐行展开，把 checks、summary、messages、evidence endpoints 和 next actions 放回原来的标题结构。它不判断某个 row 是否应该通过，也不补写新的 recommendation。

输出端是一份可以被 route 返回、归档比对和人工 review 的 Markdown。比如 live read gate 报告会展示 service target，但这不等于启动服务；pass evidence closeout 会展示 archive reference，但这不等于生成新的 sibling artifact。v2169 的 parity test 把这种输入输出关系固定下来：同一个 profile，在旧 renderer 和新 builder renderer 下必须得到同样长度、同样 hash、同样标题数量、同样末尾换行。维护者以后要改业务时应先改 loader 和测试；只要还在 renderer 层，就必须尊重这份字节契约。

## Review Checklist / 审核清单

人工复查 v2169 时可以按四步走。第一步看公开导出函数和文件名是否保持不变，确认 route 或上游 service 没有被迫改 import。第二步看每个 builder spec 的 meta label 顺序，尤其是 ready、execution、service target、closeout state 这类审计字段；这些字段顺序变化虽然不一定破坏业务，但会破坏可比对的审计文本。第三步看本地 helper 是否只是把已有对象字段转成旧 bullet 行，没有排序、过滤、改名或合并含义。第四步看 parity test 的 normalize 只处理 `generatedAt` 和 fixture path，没有把真实内容差异抹掉。

这份清单还能帮助判断剩余 renderer 是否适合并入同一批。如果某个文件需要新的 builder 功能、需要重排旧 Markdown、或者需要解释真实服务启动语义，就应该拆成单独版本。v2169 的五个文件之所以能合批，是因为它们都是同步完整报告、都属于同一条 runtime execution 准备链、都能用现有 builder 表达、并且都能用真实 loader 固化 hash。合批依据来自结构相似和验证充分，而不是为了减少版本数量。

## Failure Triage / 失败定位

如果后续 CI 中 v2169 parity 失败，第一优先级不是改 hash，而是导出新旧 Markdown 做最小 diff。长度增加通常意味着 section 之间多了空行，长度减少通常意味着某个 helper 少返回了一行，长度相同但 hash 不同则优先看字段顺序、路径分隔符或时间归一化。若 H2 数量变化，问题一般在 builder section 拆分；若 H3 变为非零，说明某个局部标题没有按旧格式保留；若末尾换行断言失败，通常是手写拼接和 builder tail 的边界没有对齐。

如果原业务测试失败但 parity 通过，应把注意力转向 loader、route headers、fallback fixture 或访问控制，而不是先怀疑 builder。反过来，如果 census 失败但 parity 和 route 都通过，可能是文件没有包含标准 marker、扫描脚本范围发生变化，或新增 renderer 没有同步加入迁移计划。把这些失败类型分开，能减少“为了让 CI 绿而改测试期望”的冲动，也符合当前计划书里“测试期望和 fixture 字节不能为了迁移通过而被修改”的规则。

## Cross-project Position / 跨项目位置

v2169 的文件名带有 Java 和 mini-kv，但本版不是给那两个项目下发新任务。Node 读取的是已经存在或历史 fallback 中冻结的 sibling evidence，并把这些证据作为只读报告的一部分展示出来。Java 与 mini-kv 可以继续按自己的 production excellence brief 推进，不需要等待 v2169 作为前置批准。只有当 Node 后续真的需要新鲜 sibling output、真实 jar、真实 `minikv_cli` 或 live endpoint 时，计划书才必须列出具体版本、启动命令、端口、进程归属和清理责任。

这种位置说明对生产级分片执行很重要。当前系统已经接近能够描述真实联合执行，但还没有完成真实执行的最后授权链。v2169 做的是把“描述材料”的展示层变得可维护，让 reviewer 更容易看清哪些材料已经准备好，哪些门还没有打开。它提高的是审计材料的稳定性和维护性，而不是直接缩短安全审批。把这两件事分清，后续推进 live read 或 shard preview 时才不会混淆证据可读性和执行可授权性。

## One-sentence Summary / 一句话总结

v2169 把五个同步 runtime execution chain renderer 迁移到统一 verification report builder，用真实 loader 和 forced historical fallback 的 SHA-256 parity 证明 Markdown 输出不变，并把 renderer census 推进到 205/245 标准化、40 未标准化，同时明确不授予真实联合执行权限。
