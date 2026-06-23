# v2152 Renderer Consolidation Batch 34

## Goal And Non-goal / 目标与非目标

v2152 的目标是继续收口 Node 项目里的只读 Markdown renderer，把 controlled read-only shard preview 中 candidate document 这一段连续链路迁移到共享的 `verificationReportBuilder`。本版迁移五个文件：`src/services/controlledReadOnlyShardPreviewCandidateDocumentRequestRenderer.ts`、`src/services/controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckRenderer.ts`、`src/services/controlledReadOnlyShardPreviewCandidateDocumentIntakePacketRenderer.ts`、`src/services/controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestRenderer.ts`、`src/services/controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckRenderer.ts`。它们共同描述候选文档从 request package、submission precheck、intake packet、material request 到 material submission precheck 的只读治理链。

非目标同样重要。本版不创建真实候选文档，不导入外部材料，不启动 Java 或 mini-kv，不读取生产凭证，不开放写路径，不改变 route，也不更改任何 approval 或 execution 状态。报告里出现 `candidate document request allowed`、`candidate payload import allowed`、`execution allowed`、`write routing allowed` 等字段，是因为旧报告已经展示这些安全字段；迁移只是保留字段顺序和文字，不把任何 blocked 状态改成 allowed 状态。

这版也不是为凑版本而做的小改。五个 renderer 都有完整测试入口和稳定 fixture，输出长度从两万到六万多字符不等，里面包含大量 h3 子块、guard、checkpoint、digest、count、read-only 和 write-safety 字段。把它们一次迁移成同一类 builder spec，可以验证 v2151 的 separated block helper 是否真的能承担后续 for-loop renderer，而不是只服务上一批 text package 文件。

## Entry Points / 入口

第一层入口是 `src/services/verificationReportBuilder.ts`。本版没有新增 builder API，而是复用已有的 `renderVerificationReportMarkdown` 和 `renderVerificationSeparatedBlockLines`。`renderVerificationReportMarkdown` 负责标题、meta、section heading、section body 和尾部换行；`renderVerificationSeparatedBlockLines` 负责把多个 h3 子块用单个空行隔开，同时不在开头和结尾额外塞空行。

第二层入口是五个 candidate document renderer。迁移前，每个 renderer 都在主函数里维护一个 `lines` 数组，然后手工 push 标题、meta、section heading，再用 `for` 或 `flatMap` 插入 `### order.nodeVersion.code` 子块。迁移后，主函数变成 builder spec：`title` 是报告名，`meta` 是固定 label/value 列表，`sections` 是两个分段，每个分段的 `lines` 来自本地 helper。

第三层入口是每个文件本地的 `renderRequestItem`、`renderAcceptanceCheck`、`renderCheckpoint`、`renderValidator`、`renderSlot`、`renderGuard` 等 helper。这些 helper 没有抽成一个跨文件万能 formatter，因为 candidate document request、submission checkpoint、intake slot、material request item、material validator 的字段很像但语义不同。把它们保留在本地，可以让审查者看到每个业务对象到底展示了哪些阻断字段，而不是被一个动态字段表隐藏。

## Response Model / 响应模型

这五个报告可以按材料流理解。request package 描述系统需要什么候选文档材料，它列出 request items 和 acceptance checks，并继续显示真实候选文档数量、合成材料数量、导入数量、评估数量、接受数量，以及所有写入和执行开关。submission precheck 描述人工提交候选文档前需要满足的 checkpoints 和 validators，重点是缺失候选文档、合成候选文档、未审阅候选文档会被挡住。

intake packet 把已经通过 submission precheck 的候选文档要求转成 intake slots 和 intake guards。这里的核心不是导入，而是继续保持 reviewed real candidate document 的前置要求，并展示 candidate payload import、candidate evaluation、approval grant、signed approval、runtime payload、writes、sibling mutation 等阻断字段。material request package 继续把候选文档材料拆成 material request items 和 material acceptance checks，强调 material fields、acceptance criterion、missing material、synthetic material、unreviewed material 都必须被检查。

material submission precheck 是本版链路的最后一段。它展示 material submission checkpoints 和 validators，继续拒绝 missing material、synthetic material、unreviewed material，并且保留 starts services、writes allowed、mutates sibling state 等安全字段。迁移后，这些响应模型没有任何行为变化。hash compare 证明标题、meta label、字段顺序、h3 heading、空行、digest 和尾部换行都与迁移前一致。

## Upstream Evidence / 上游证据

本版的输入来自 `test/support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.ts`。这个 fixture factory 生成 ready 和 blocked 两类 candidate document 对象，供五个测试文件和临时 hash 脚本复用。它不需要 Java 或 mini-kv 当前工作树提供新文件，也不发起 live integration。换句话说，v2152 不是跨项目 evidence consumption 版本，而是 Node 本地只读渲染层的结构整理版本。

这里仍然要注意三项目边界。Java 当前可以继续推进自己的生产前治理计划，mini-kv 也可以继续推进 receipt 字节表面和 no-network 约束。Node v2152 没有要求它们停止，也没有要求它们把进度写回 Node。若后续 Node 真正需要 fresh sibling evidence，计划必须提前列出 Java/KV 精确版本、文件路径、端口、启动责任和清理责任。v2152 没有这些 live 条件，所以正确边界是“推荐并行，不互相阻塞”。

## Service Flow / 服务流程

旧 request renderer 的流程是典型例子。函数先创建 `lines`，把 `# Controlled read-only shard preview candidate document request package` 和几十个 meta bullet 写进去，再写 `## Request Items`。随后它遍历 `requestPackage.requestItems`，每个 item 前都 push 一个空字符串，再 push h3 heading 和二十来个字段。第二段 `Acceptance Checks` 重复同样模式。这种写法直观，但报告结构和领域字段混在一起，审查时要同时盯字段顺序、空行和安全语义。

新 request renderer 把这三层拆开。主函数只声明 builder spec，`Request Items` section 调用 `renderVerificationSeparatedBlockLines(requestPackage.requestItems, renderRequestItem)`，`Acceptance Checks` section 调用 `renderVerificationSeparatedBlockLines(requestPackage.acceptanceChecks, renderAcceptanceCheck)`。`renderRequestItem` 只关心 item 字段，`renderAcceptanceCheck` 只关心 check 字段。section 前是否需要空行由 `bodyLeadingBlankLine: requestPackage.requestItems.length > 0` 明确表达。

submission precheck、intake packet、material request package 和 material submission precheck 都按同一流程迁移。两个原来带尾部换行的报告使用 builder 默认行为；三个原来没有尾部换行的报告显式设置 `trailingNewline: false`。这个细节看起来小，但非常关键。如果尾部换行错误，HTTP markdown、归档 hash 和历史文本对比都会漂移。v2152 的临时 hash 脚本先在迁移前记录五个输出，再在迁移后重新记录，最后 `Compare-Object` 没有任何差异。

## Safety Boundary / 安全边界

本版最重要的安全边界是只读。五个 renderer 只接收已经构建好的 profile 或 package 对象，然后把对象字段转换成 Markdown 字符串。它们不调用文件系统，不读取环境变量，不访问网络，不启动服务，不写审计账本，不连接 Java 或 mini-kv，也不计算新的 approval 结果。所有 digest、count、blocked reason、ready flag 都来自输入对象。

第二个边界是候选材料不等于生产材料。candidate document、material request、submission precheck 这些名字很容易让人以为系统已经在处理真实用户材料，但本版并不引入真实材料入口。字段里仍然大量显示 `realCandidateDocumentCount: 0`、`syntheticCandidateDocumentCount: 0`、`candidatePayloadImportAllowed: false`、`executionAllowed: false`、`writeRoutingAllowed: false`。renderer 的任务是把这些 blocked 状态原样展示出来。

第三个边界是 builder 不理解业务授权。`verificationReportBuilder` 只知道如何拼 Markdown，不知道什么是 signed approval、approval grant、runtime payload 或 sibling mutation。因此把 renderer 迁移到 builder 并不会让 builder 获得业务权限。它只是把重复的标题、meta、section 和 h3 block 间距规则集中起来，降低手写 Markdown 出错概率。

## Maintenance Payoff / 维护收益

v2152 后，未迁移 renderer 从 92 降到 87。更实际的收益是当前宽口径扫描下，剩余未迁移文件里已经没有 `for (` 形态。v2146 到 v2151 证明 builder 能处理 compact h3、blocked reason、resolved evidence detail、summary-first 和 separated h3 block；v2152 把这套能力用到 candidate document 五件套上，说明它可以覆盖更长、更密的报告。

这版也改善了阅读方式。迁移前，一个 reader 打开 renderer 会看到标题、meta、for loop、字段、第二个 for loop、字段和返回值混在一起。迁移后，reader 先看到报告骨架，再跳到本地 helper 看领域字段。对于维护者来说，判断“这个报告有几个 section”不需要读完所有字段；判断“这个 guard 是否还展示 blocks writes”也不需要穿过 title/meta 部分。

另一个收益是后续分类更清楚。普通 full report renderer 可以继续迁移到 `verificationReportBuilder`；profile section 聚合文件则应该谨慎处理，因为它们返回的是 string array 片段，而不是完整 Markdown 文档；`*MarkdownRenderer.ts` 尾部生产 probe 报告也需要单独评估是否属于同一规格。v2152 的证据 JSON 会写明当前 scan 口径，避免把 h3 分类数字当成绝对业务事实。

## File Decisions / 文件级决策

`controlledReadOnlyShardPreviewCandidateDocumentRequestRenderer.ts` 是本版第一块样板。它原来用两个 `for` 循环输出 request items 和 acceptance checks。迁移时没有把 item/check 字段抽成共享数据表，而是只把 section 分隔交给 builder。这样做的原因是 request item 里的 `requestInstruction`、`acceptanceCriterion` 和 acceptance check 里的 `rejectsMissingCandidateDocument`、`blocksRuntimePayload`、`blocksSiblingMutation` 属于审查者要直接看到的安全线索，保留显式字段列表更利于人工复核。

`controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckRenderer.ts` 的重点是 checkpoint 和 validator 的区别。checkpoint 描述提交前需要满足的材料状态，validator 描述缺失、合成、未审阅材料如何被拒绝。两者都带 `readOnly`、`writesAllowed`、`mutatesSiblingState`，但含义并不相同，所以本版给它们分别保留 `renderCheckpoint` 和 `renderValidator`。这比一个“render named block”更啰嗦一点，却避免了把提交条件和拒绝规则混在一起。

`controlledReadOnlyShardPreviewCandidateDocumentIntakePacketRenderer.ts` 和 `controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestRenderer.ts` 保留无尾换行，是一次很具体的兼容选择。很多 Markdown 输出是否有最后一个换行，对浏览器展示不敏感，但对归档 hash、fixture compare 和历史文档稳定性敏感。这里不因为“看起来一样”就统一风格，而是尊重旧输出。生产前治理代码最怕的不是多写几行，而是把可验证文本变成“差不多一样”。

`controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckRenderer.ts` 原来是 `flatMap` 形态，不是 `for` 循环形态，但它的输出结构与另外四个一致：标题、meta、两个 h3 block section。把它纳入同一版，是因为它正好闭合 material submission 的末端语义。若只迁移前四个，会让候选文档链尾巴继续保留旧写法，后续阅读时仍要跨两种 renderer 风格。

## Deferred Work / 暂缓工作

本版刻意没有迁移 `controlledReadOnlyShardPreviewCandidateDocumentProfileSectionRenderer.ts`。这个文件名字相邻，也确实属于 candidate document 族，但它返回的是 profile 的局部 string array，不是一个完整 `# title` Markdown 报告。它的职责是把五个 candidate document profile section 拼进更大的 controlled preview profile。若强行套 `renderVerificationReportMarkdown`，反而会引入不属于局部 section 的 title/meta 模型，可能让上层 profile 多出错误层级。

这个暂缓不是遗漏，而是边界判断。full report renderer 的迁移标准是：函数返回完整 Markdown 字符串，顶部有 `#` 标题，后续有 meta 和 `##` section。profile-section renderer 的迁移标准应该另定，例如是否需要一个轻量 `renderProfileSections` helper，是否要继续直接返回 string array，是否存在多个局部 section 可共享 `renderEntries` 包装。下一版如果处理它，应先写清这个判断，而不是因为文件名相邻就机械迁移。

同理，当前扫描里还剩若干 `*MarkdownRenderer.ts` 生产 probe 文件，它们虽然也输出 Markdown，但未必是 verification report builder 的自然对象。有些生产 probe 报告可能带 release evidence、live capture、readiness packet 等更接近操作审计的结构。后续推进时应先看它们的 section 模型和安全字段，而不是把所有 Markdown 字符串都归为同一种 renderer debt。

## Failure Modes / 失败模式

第一类失败是尾部换行漂移。request package 和 submission precheck 原来返回 `` `${lines.join("\n")}\n` ``，而 intake packet、material request package 和 material submission precheck 原来返回 `lines.join("\n")`。如果全部使用 builder 默认尾换行，后三个报告 hash 会改变。v2152 为后三个显式设置 `trailingNewline: false`，hash 已证明正确。

第二类失败是 section 内第一条 h3 前的空行。旧 renderer 在每个 item/check/validator 前先 push `""`，所以 `## Section` 后面必须有一个空白行再进入 `###`。如果把 `bodyLeadingBlankLine` 设成 false，就会把 `##` 和第一条 `###` 粘在一起。v2152 使用 `items.length > 0` 控制这个空白，既保留非空列表的旧排版，也避免空列表时产生额外空白。

第三类失败是把不同对象强行合并成一个万能函数。为了让 diff 更短，可以把所有字段都写成动态数组甚至反射式遍历对象，但那样会损失字段顺序和语义审查能力。v2152 没有这么做。每个文件仍然有自己的 helper，字段顺序由显式代码控制，输出 hash 可以稳定验证。

第四类失败是把 renderer consolidation 误认为功能授权。这个版本没有批准真实执行，也没有让 candidate document 进入 runtime payload。若后续要做真实分片联合执行，必须另写计划，列出输入材料、人工批准、启动服务、只读窗口、失败回滚和清理责任，不能把 v2152 的 Markdown 重构当成前置授权。

## Test Coverage / 测试覆盖

第一层验证是临时 hash compare。`.tmp/v2152-renderer-hashes.ts` 在迁移前生成 `.tmp/v2152-before.json`，迁移后生成 `.tmp/v2152-after.json`，五个输出的 length 和 SHA-256 完全一致。`Compare-Object` 没有输出，说明 JSON 基线也完全一致。这比普通 `toContain` 断言更严格，因为它能发现空行和尾换行差异。

第二层验证是 focused tests：`test/controlledReadOnlyShardPreviewCandidateDocumentRequestPackage.test.ts`、`test/controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck.test.ts`、`test/controlledReadOnlyShardPreviewCandidateDocumentIntakePacket.test.ts`、`test/controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage.test.ts`、`test/controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheck.test.ts`，共 5 个文件、27 个测试通过。这些测试覆盖 ready/blocked profile、markdown 关键字段、强制历史 fixture fallback 和上层 preview profile 包含关系。

第三层验证是工程门：`npm run typecheck` 通过，`npx vitest run test/governanceGrowthRatchet.test.ts --testTimeout=180000` 通过，`npm run lint` 通过且为 0 error / 263 existing warnings。代码讲解质量门在文档写入后再跑，用来确认新增讲解不是占位文本、中文长度足够、结构符合标准。

## Next-version Direction / 下一版方向

下一版可以继续推进 renderer consolidation，但不要机械选择文件名最靠前的一批。优先级建议分三组：第一组是剩余 `flatMap` 或 `map` full report renderer，它们最接近 v2152 的迁移模式；第二组是 profile-section renderer，它们需要先判断是否应该使用 full report builder；第三组是 `*MarkdownRenderer.ts` 生产 probe 尾部文件，它们可能和 verification report builder 形态不同，需要单独切一版评估。

Node 当前仍处在生产前治理和只读证据整形阶段。真正的分片联合执行还需要更明确的 runtime 输入、审批材料、服务启动、端口、owner、清理策略和失败边界。v2152 的意义是让候选材料报告更稳定、更容易审查，而不是把系统推进到真实执行。

## One-sentence Summary / 一句话总结

v2152 把 candidate document 五件套只读报告迁移到共享 verification report builder，并用 byte-identical hash、focused tests、typecheck、ratchet 和 lint 证明输出、安全边界和跨项目并行关系都没有漂移。
