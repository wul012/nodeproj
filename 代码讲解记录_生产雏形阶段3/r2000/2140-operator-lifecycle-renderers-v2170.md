# v2170 代码讲解：operator lifecycle renderer 标准化

## Goal and Non-goal / 目标与非目标

v2170 的目标是把四个 Java/mini-kv operator lifecycle 相关的同步完整报告迁移到 `renderVerificationReportMarkdown`。四个入口分别是 `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeRenderer.ts`、`managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeRenderer.ts`、`managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordRenderer.ts` 和 `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightRenderer.ts`。它们共同描述从 operator service lifecycle evidence 到 declared operator lifecycle evidence，再到 runtime packet stop record 与 artifact intake preflight 的只读准备链。

本版的非目标是防止误读的关键。它不启动 Java，不启动 mini-kv，不停止服务，不连接 managed audit，不读取 credential value，不把 runtime execution packet present 解读为可执行授权，也不处理 approved local-loopback read-only smoke。四个 renderer 的职责仍然只是把 profile 展示成 Markdown；真实业务判断仍由 loader、route tests、历史 fixture 和审批门负责。换句话说，v2170 是展示层收敛，不是 runtime gate 开门。

## Entry Points / 入口与调用关系

四个公开 render 函数都保持原名和参数不变，route 层 import 不需要调整。operator service lifecycle evidence intake 消费 Node v385、Java v160 和 mini-kv v151/v150 证据，展示 operator service 生命周期模板是否足够让 Node 继续判断 live-read gate。declared operator lifecycle evidence intake 接着消费 Java v161、mini-kv v152 和 frozen operator template，说明 declared lifecycle evidence 是否齐备但仍需独立 runtime approval。packet stop record 把 Node v391 的 runtime execution packet stop 事实展示成审计报告，强调为什么即使 packet 存在也不能执行。artifact intake preflight 则在 Node v393 上检查 runtime execution artifacts 是否完整，并列出 candidate paths 与 source archive references。

这些入口的共同点是同步、只读、完整报告。它们都用普通 profile 输入和 Markdown 字符串输出，没有 async service probing，也不持有运行时进程。这个共同点让它们适合合批迁移；相反，approved local-loopback read-only smoke 有真实探测语义和异步加载路径，不应该混入本版。

## Response Model / 响应模型与字段结构

operator service lifecycle intake 的响应模型以 source Node、Java lifecycle、mini-kv template、frozen live read gate plan 和 evidence files 为主体。它说明 operator service lifecycle 的材料来源、fallback 状态、digest、intake、checks、summary、blockers、warnings、recommendations 和 next actions。declared operator lifecycle intake 的结构类似，但多了 declared operator lifecycle evidence present 和 runtime gate requires separate approval 等字段，用来区分“声明材料存在”和“执行门已授权”这两件事。

packet stop record 的响应模型更靠近运行执行链。它展示 runtime execution packet present、executable、runtime gate approval present、concrete loopback ports assigned、execution attempted 等字段，同时用 stop reasons 和 archive references 解释为什么仍然停止。artifact intake preflight 则把 artifact requirements 逐项展开，每项包含 key、present、source、missingReasonCode 和 candidate paths。这些嵌套数组是本版保留局部 helper 的原因：builder 管外层报告结构，本地 helper 管旧输出的行级细节。

## Builder Mapping / builder 映射方式

迁移后的四个 renderer 都从手写 `lines` 数组改为 builder spec。meta 部分按旧输出顺序逐项列出，普通对象 section 用 `entries`，消息类 section 用 `messages` 和对应 empty text，next actions 用 `list`。这样 H1、meta bullet、H2、空行和末尾换行都由统一 builder 负责，单个 renderer 不再复制 `renderMessages`、`renderList` 和手动空行拼接。N1 的价值正在这里：减少展示层重复机制，而不是改写业务事实。

数组展开仍然按旧格式保留。两个 lifecycle intake 的 Evidence Files 仍输出 `id/exists/fallback/bytes/digest/resolved` 单行；packet stop record 的 Stop Reasons 仍输出 code、source、required、present 和 message；artifact intake preflight 的 Runtime Execution Artifact Requirements 仍先输出 artifact 行，再缩进输出 candidate paths；Source Archive References 仍从对象值中过滤文件引用后输出 path、exists、bytes、digest。这样既使用统一 builder，又不改变审计文本中最容易被 reviewer 对比的行级格式。

## Service Flow / 服务流程与版本位置

从版本链看，operator service lifecycle intake 对应 Node v386 周边，declared operator lifecycle intake 对应 Node v388 周边，packet stop record 对应 Node v392 周边，artifact intake preflight 对应 Node v394 周边。它们不是严格相邻的四个文件名，但在业务上属于同一条“operator lifecycle 到 runtime execution 前置材料”的链。前半段回答生命周期证据是否存在，后半段回答即使 packet 和 artifacts 逐步齐备，为什么 runtime 仍然不能被自动执行。

这个服务流程在生产级分片执行前非常重要。系统需要先证明 operator lifecycle、声明材料、stop record 和 artifact preflight 都可以被稳定审计，才适合讨论更靠近真实执行的 live read 或 local loopback smoke。v2170 让这四类报告的展示方式统一，后续 reviewer 能更快区分材料来源、检查结果和阻塞原因。

## Parity Method / 等价性证明

新增的 `rendererMigrationV2170Parity.test.ts` 使用真实 loader 构造 profile，而不是手写最小 fixture。测试强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，固定 `generatedAt`，并只归一化 JSON `path` 和 `resolvedPath` 字段。这个 normalize 方式继承 v2169 的 CI 修复经验：它不会模糊正文差异，只把本地 Windows 路径和 GitHub Linux 路径折叠成稳定占位。

四个 case 分别断言长度、SHA-256、H1/H2/H3 数量和末尾换行。长度能抓住增删行，hash 能抓住字段顺序和空行漂移，标题计数能确认没有引入 H3 或丢失 H2，末尾换行能保护旧 Markdown 的文件结尾契约。focused gate 同时跑四个原业务测试，说明 builder 迁移没有破坏 route、fallback、访问控制和 profile 语义。

## Safety Boundary / 安全边界

本版文件名里同时出现 operator、runtime execution、packet、artifact、preflight，最容易产生“已经可以执行”的错觉。实际边界正相反：profile 里反复出现的 `executionAllowed=false`、`startsJavaService=false`、`startsMiniKvService=false`、`connectsManagedAudit=false` 是必须保留的审计信息。renderer 不能因为报告内容越来越接近 runtime 就隐藏 stop reasons、warnings 或 next actions。

builder 也不能进入授权判断。它不知道哪个 operator lifecycle evidence 足够，也不知道哪个 packet 应该被执行。它只负责稳定排版。未来如果要推进真实 local loopback smoke，必须另开版本写清楚服务启动命令、端口、操作者、进程清理、失败回滚和审计归属，不能引用 v2170 当作执行授权。

## Test Coverage / 测试覆盖

v2170 focused gate 已通过：`rendererMigrationV2169Parity.test.ts`、`rendererMigrationV2170Parity.test.ts`、四个原业务测试和 `rendererCensusScript.test.ts` 共 7 个 test file、16 个测试通过。这里把 v2169 parity 一起纳入，是因为远端 CI 已经证明旧归一化边界仍有 Linux runner 漂移；本版收尾必须先修红上一版，再提交新的 renderer 批次。`npm run renderer:census -- --max-unstandardized=36` 通过，输出 209/245 standardized、36 unstandardized、H3 0、forLoop 0、map 37、flatMap 27。`npm run typecheck` 通过，说明四个 builder spec、局部 helper 和新 parity test 的类型关系成立。

`rendererCensusScript.test.ts` 同步收紧到 209/245 和 unstandardized 36，reverse ratchet 改为 `--max-unstandardized=35` 必须失败。这个机械门能防止后续把已迁移 renderer 改回手写形态，也能发现新增未标准化 renderer。代码讲解质量门、readability closeout、lint 和 build 也已通过；lint 仍是 0 error / 263 existing warnings，build 产物会在提交前清理。本地完整 coverage 曾以 `npx vitest run --coverage --maxWorkers=2` 低并发启动，但约 30 分钟仍没有最终 Vitest 汇总，因此按 timeout triage 停止并记录为本地预算超时，不作为 assertion failure，也不写入 passed；推送后的 GitHub CI 仍会运行默认完整 coverage。

## Maintenance Notes / 后续维护建议

剩余 36 个 renderer 里还有 active shard plan、completed shard readiness、live read gate plan、minimal read-only integration、sandbox handle review、readiness runner 和 production shard execution readiness 等家族。下一批不应只看文件数量，而应继续按“同步完整报告优先、异步 smoke 单独处理、局部 section 谨慎迁移”的顺序推进。像 v2170 这样能用一个共同业务链解释四个文件的版本，才适合合批。

维护者以后查看这些 renderer 时，应先看 loader 和 types 判断业务含义，再看 renderer 了解展示映射。不要在 renderer 中新增业务分支，也不要为了减少几行 helper 把 artifact requirements、stop reasons 或 evidence files 改成通用对象 dump。这些局部行格式本身就是审计材料的可读性契约，保留它们比追求表面统一更重要。

## Input Output Example / 输入输出例子

以 artifact intake preflight 为例，输入 profile 已经包含 sourceNodeV393、replay、siblingWorkspaceSnapshot、artifactRequirements、artifactIntakePreflight、sourceArchiveReferences、checks 和 summary。renderer 接收后只把 artifactRequirements 展开成旧的两级 bullet：第一行说明 artifact key 是否 present，下面缩进列出 candidate path、exists、bytes 和 digest。输出 Markdown 因此能让 reviewer 一眼看到哪个 artifact 缺失，缺失理由是什么，候选路径是否存在。

以 packet stop record 为例，输入 profile 已经告诉 Node runtime execution packet 是否 present、是否 executable、是否有 runtime gate approval、是否分配 loopback ports、是否 attempted execution。renderer 不重新计算这些布尔值，只把 stopReasons 展示出来。输出的价值是透明解释“为什么停”，而不是生成“如何执行”的指令。这种输入输出边界保护了只读审计材料的可信度。

## Failure Triage / 失败定位

如果 v2170 parity 失败，先看长度。长度变化通常是空行或行数变化；长度不变 hash 变化通常是字段顺序、路径归一化或字符串内容变化；H2 数量变化说明 section 拆分不一致；H3 非零说明某个 helper 输出了不应出现的标题层级。修复顺序应当是 diff Markdown，再修 renderer 映射，最后才更新预期 hash。不能为了让测试通过而改业务 fixture 或 route 断言。

如果 route 测试失败但 parity 通过，说明固定输入下 renderer 没漂移，问题更可能来自 loader、历史 fallback、headers 或访问控制。如果 census 失败，先看四个文件是否仍包含 `renderVerificationReportMarkdown` marker，再看是否有新增 `*Renderer.ts` 进入扫描范围。把失败类型分开，能让后续 CI 修复更快。

## Review Checklist / 审核清单

人工审核 v2170 时可以按五层检查。第一层看公开函数名是否保持不变，route 文件不需要修改 import 就能继续工作。第二层看 meta label 顺序，尤其是 ready、runtime probe、starts/stops service、connects managed audit、execution allowed、active shard prototype enabled 这些边界字段是否仍按旧输出排列。第三层看 Evidence Files、Stop Reasons、Runtime Execution Artifact Requirements 和 Source Archive References 的行格式是否仍是旧格式，不要把它们改成普通对象 dump。第四层看 parity test 的 normalize 是否只处理 `generatedAt` 和路径字段，不要吞掉真实正文差异。第五层看 census 是否只收紧，不允许把阈值放宽。

这份清单也能用来判断后续版本是否应合批。若候选文件都属于同步完整报告、都不启动服务、都能用现有 builder 表达，并且每个文件都有对应业务测试，就可以像 v2170 一样合成一个中等版本。若某个文件需要新 helper、需要重排历史 Markdown，或者涉及异步 smoke、真实端口、进程清理，就应该拆开。合批的标准不是文件数，而是能否用一套清楚的输入输出边界说明整组变化。

## Batch Rationale / 合批理由

这四个 renderer 之所以放在同一版，是因为它们都围绕 operator lifecycle 和 declared runtime lifecycle 的前置材料。operator service lifecycle intake 解释服务生命周期模板，declared operator lifecycle intake 解释声明材料，packet stop record 解释为什么执行包停下，artifact intake preflight 解释执行材料是否齐备。它们像同一条链上的四个观察点，合在一起能让维护者看到从“生命周期证据”到“执行前停止”的完整路径。

如果只迁移其中一个文件，版本解释会变得很薄，后续维护者也难判断它和 runtime execution chain 的关系。如果把 approved local-loopback smoke 也塞进来，又会把同步审计报告和真实探测边界混在一起。v2170 的合批是中间路线：工作量足够大，能减少四份手写 renderer；边界仍足够窄，不触碰真实服务启动。

## Path Normalization Note / 路径归一化说明

v2169 的 CI 失败证明，简单把 `fixtures` 子串替换成 `<repo>/fixtures` 还不够稳。某些报告里同时有原始 `path` 和 fallback `resolvedPath`，Windows 本地路径、GitHub Linux 路径、JSON 转义反斜杠会让 hash 漂移；`passEvidenceCloseout` 还会展示归档 file-reference 的 `sizeBytes` 和 `digest`，这些值来自 checkout 后文件字节，Windows 与 Linux 对文本归档换行字节的处理不同，也会让同一业务报告在两个平台上 hash 不一致。v2170 沿用并收窄修正策略：只在 JSON 的 `path`、`resolvedPath` 以及 file-reference 元数据 `sizeBytes/digest` 字段里做归一化，把 repo fixture、Java 工程、mini-kv 工程和跨 OS 文件字节元数据折叠为稳定占位，其余正文不碰。

这种做法比全局替换安全。它不会改变 message、warning、recommendation 或普通说明文字，也不会把真实业务内容差异藏起来；它只处理由操作系统和 Git checkout 造成的非业务字节差异。若未来 parity 再遇到平台差异，应先确认差异是否来自路径字段或 file-reference 的 checkout 元数据；只有确认是这两类展示差异，才应扩展 normalize。不要把 normalize 变成“让 hash 通过”的万能过滤器。

## Remaining Work / 剩余工作判断

v2170 后还剩 36 个未标准化 renderer。剩余文件已经不是一眼就能机械替换的早期批次，它们分布在 active shard plan、completed shard readiness、minimal read-only integration、sandbox handle review、readiness runner 和 production shard execution readiness 等家族里。下一批应优先选择同族同步报告，继续排除异步 smoke 和局部 section renderer，除非先证明局部 section 的上层组合方式不会被破坏。

从生产级分片执行角度看，N1 的收尾价值不是“把数字刷到 245/245”本身，而是让所有审计报告有统一、可测试、可维护的展示入口。只有展示层稳定，后面做 live read、shard preview 或一键 readiness report 时，reviewer 才能相信报告差异来自业务事实，而不是来自手写 renderer 的空行、字段顺序或路径漂移。

下一步最合适的分组不是继续追求四个以上文件，而是先把剩余 36 个按职责切开：active shard evidence intake 是一组，minimal read-only integration 是一组，sandbox handle review 是一组，profile section renderer 可能需要保留局部职责。每组开始前都要先算旧输出 hash，再判断是否能沿用现有 builder；如果需要新增 builder 能力，应单独解释为什么现有 `entries/messages/list/lines` 不够。

## Cross-project Position / 跨项目位置

v2170 仍是 Node 本地 renderer consolidation。Java 与 mini-kv 可以继续并行推进自己的计划，不需要等待 Node 批准。本版消费的 sibling evidence 是冻结或已存在材料，并且所有报告都明确不启动服务、不停止服务、不写 sibling 状态。只有未来需要新鲜 Java/mini-kv 输出或真实进程启动时，计划书才需要列出具体 upstream 版本、命令、端口和清理责任。

这让三项目关系保持清楚：Java 和 mini-kv 提供可审计证据，Node 汇总并展示 readiness 与 stop gates，但 Node 的 renderer 标准化本身不是跨项目 contract 变更。v2170 提高的是 Node 审计文本的稳定性和维护性。

reviewer 读本版报告时应先看 stop 和 preflight 结论，再回看 lifecycle 证据来源。这样的阅读顺序能避免把存在的材料误判成已授权的动作，也能更快发现后续真实执行还缺哪一道人工门。
这也是本版维护价值最集中的地方。
这点很关键且可复查。

## One-sentence Summary / 一句话总结

v2170 把四个 operator lifecycle 与 declared runtime lifecycle 同步报告迁移到统一 verification report builder，用真实 loader、路径字段和 file-reference 元数据归一化稳定 hash 证明 Markdown 输出不变，同时修复 v2169 Linux-runner-only parity 漂移，并把 renderer census 推进到 209/245 标准化、36 未标准化。
