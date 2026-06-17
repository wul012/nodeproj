# v2150 Renderer Consolidation Batch 32

## Goal And Non-goal / 目标与非目标

v2150 的目标很窄但工作量不小：把 signed approval capture artifact draft 链条后半段的五个文本包相关 renderer 从手写数组迁移到共享 verification report builder。五个入口分别是 authoring readiness、instruction preflight、text package intake、text package review preflight 和 text package submission preflight。它们都位于 `src/services/`，文件名很长，但职责一致：把上游已经计算好的只读对象渲染成 Markdown 报告，供归档、测试和人工阅读使用。

非目标必须先说清楚。本版不创建真实批准，不写入签名，不生成可执行 runtime payload，不启动 Java 或 mini-kv，不向兄弟项目写入进度，也不把任何 blocked 状态改成 ready。报告名称里有 signed approval、draft、review、submission 等词，这些词在这里指的是前置材料的只读审查链，不是运行时授权链。renderer 只做字符串输出，不能也不应该拥有执行能力。

本版还有一个维护目标：继续压缩手写 Markdown 外壳的数量，但不制造巨型抽象。五个 renderer 的局部明细 helper 仍然保留在各自文件里，因为它们承载不同的领域含义。authoring requirement、instruction slot、intake field、review criterion、submission slot 表面都是 h3 加 bullet，实际代表不同审查层级。把它们硬塞进一个“万能明细 helper”会让读代码的人失去语义锚点。

## Entry Points / 入口

本版的核心入口是五个 `renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraft...Markdown` 函数。它们原先都返回 `["# title", "", ...].join("\n")`。迁移后，它们返回 `renderVerificationReportMarkdown({ title, meta, sections, trailingNewline: false })`。这个变化让标题、meta 列表、section 分隔、无尾随换行这些共同规则集中到 `verificationReportBuilder.ts`，但保留 `renderEntries`、`renderRequirement`、`renderGuard`、`renderCriterion`、`renderControl` 等本地函数。

五个入口的章节结构分别是：authoring readiness 输出 `Gates`、`Authoring Requirements`、`Authoring Blockers`、`Blocked Reasons`；instruction preflight 输出 `Gates`、`Instruction Slots`、`Instruction Guards`、`Blocked Reasons`；text package intake 输出 `Gates`、`Intake Fields`、`Intake Guards`、`Blocked Reasons`；review preflight 输出 `Gates`、`Review Criteria`、`Review Controls`、`Blocked Reasons`；submission preflight 输出 `Gates`、`Submission Slots`、`Comparison Controls`、`Blocked Reasons`。这些名字没有被改写，是为了让历史归档、测试断言和人工审查路径都能继续按旧名字定位。

本版还使用了两个已经存在的共享 helper。`renderVerificationBlockedReasonLines` 负责把 blocked reason 列表统一成 `- none` 或逐项 bullet。`trimVerificationTrailingBlankLine` 负责兼容老式 h3 helper 的末尾空行。旧 helper 每个明细块最后都会返回一个空字符串，手写数组依靠这个空字符串在下一段 heading 前形成空行；builder 自己也会在 section 前放空行，所以必须先裁掉最后一个空字符串，才能保持字节级一致。

## Response Model / 响应模型

可以把这五个报告看成一条文本包只读审查流水线。authoring readiness 先判断人工草稿材料是否具备写作条件；instruction preflight 再判断草稿说明槽位和守卫是否完整；text package intake 判断草稿文本包字段是否被接收；review preflight 判断文本包是否可被离线审查和批准；submission preflight 判断文本包是否可以进入人工提交和比较控制。这条链越往后越接近人工材料，但仍然只是前置报告，不是批准动作。

每个报告对象都有三层信息。第一层是 meta：版本号、来源版本、ready 状态、计数、source digest、安全开关和本报告 digest。第二层是 gates：从对象里已有的 gate 字典渲染出来，展示整体条件。第三层是两个 h3 明细 section：一个通常描述“材料槽位或字段”，另一个描述“守卫或控制”。最后的 blocked reasons 把失败原因压成可扫描列表。renderer 没有计算这些值，只负责按原顺序输出。

迁移后的响应模型和旧模型字节一致。为了做到这一点，本版没有把布尔值、数字值直接做业务转换，而是让 meta 保持旧模板字符串的输出效果；例如 `Passed gates` 仍然是 `passed/total`，各种 ready 字段仍然以旧的文本形式出现。builder 只负责把 `["Label", value]` 渲染成 `- Label: value`，不理解也不改变 value 的业务含义。

## Upstream Evidence / 上游证据

本版校验使用 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`。这意味着五个 renderer 的输入来自 Node 仓库内冻结的历史 fixture，而不是当前 Java 或 mini-kv 工作树的即时输出。这样做的价值很直接：如果兄弟项目正在并行推进，本版的 renderer hash 不会被它们尚未提交或尚未稳定的新文件影响。我们验证的是“重构前后同一份输入渲染是否完全一致”，不是验证跨项目实时材料是否更新。

五个报告虽然没有直接展开 Evidence Files 明细块，但它们都携带多层 source digest，包括 signed approval template、approval packet review、artifact draft readiness、artifact draft instruction preflight、text package intake、review preflight 等来源摘要。renderer 对这些 digest 的职责只有展示，不重新计算、不补齐、不纠错。只要 hash 对比一致，就说明 digest 字段的顺序、标签和文本都没有被本次迁移改变。

这也解释了为什么 Java 和 mini-kv 在本版不是前置阻塞。Node 没有要求它们新生成批准材料，没有要求它们提供 live service，也没有要求它们写回 Node 的 plans 文件。真正的分片联合执行需要另一个计划，明确服务启动、端口、输入材料、所有者和清理规则。v2150 仍处在只读报告保养阶段，使用冻结证据是正确边界。

## Service Flow / 服务流程

服务流程可以分成四步。第一步，上游 service 或 fixture 生成完整 profile 对象，里面已经包含 ready 字段、计数、digest、gates、明细数组和 blocked reason。第二步，renderer 把 profile 的 meta 字段列成二维数组，同时把 `gates` 交给 `renderEntries`。第三步，renderer 调用本地明细 helper，把 requirements、slots、fields、criteria、controls 等对象转成 h3 行数组，并通过 `trimVerificationTrailingBlankLine` 交给 builder。第四步，builder 拼出最终 Markdown。

这套流向的关键是职责分层。builder 不知道什么是 submission slot，也不知道什么是 comparison control；它只知道如何拼标题、meta 和 section。局部 helper 不知道整份报告的 title 和尾随换行策略；它只知道某个领域对象的字段该怎样排列。blocked reason helper 不知道具体报告，只知道空列表要输出 `- none`。这样一来，出问题时定位也清楚：字段值错看 service，字段标签错看 renderer，空行错看 builder 适配，blocked 文本错看输入对象。

本版的机械迁移先捕获旧输出 hash，再修改源码，再用同一批 fixture 比对新输出。这个顺序很重要。如果先改代码再凭测试片段判断，可能漏掉一行空白、一个 digest 标签或某个 guard text 的顺序变化。现在五份输出的 length 和 SHA-256 全部和旧实现一致，说明服务流里的可观察结果没有变化。

## Safety Boundary / 安全边界

v2150 离“人工批准材料”语义更近，所以安全边界比普通报告更要写明。报告中出现的 `approvalCaptured`、`approvalGrantPresent`、`signedApprovalPresent` 等字段来自输入对象，renderer 不会把它们置真，也不会根据名称推断批准已经发生。报告中的 `writesAllowed`、`startsServices`、`mutatesSiblingState` 仍然保留在明细里，用来持续说明该链条没有写入、没有启动外部服务、没有改动兄弟项目状态。

这种边界不只是文字声明，也体现在代码结构里。迁移没有新增 route，没有新增 service，没有新增命令入口，没有新增 schema，没有引入 HTTP 客户端，也没有读取新的兄弟项目路径。五个文件只新增 builder import，并把手写 Markdown 外壳换成 builder spec。真正敏感的对象构造逻辑、ready 判定逻辑、blocked reason 生成逻辑都不在本次改动范围内。

字节级 hash 是本版最重要的安全证据。因为这五份报告很长，人工阅读很难逐行确认每个 guard、digest、slot、criterion 都没动。SHA-256 一致说明新旧输出完全相同，既没有把 blocked reason 删掉，也没有把只读 guard 改成放行文本，更没有改动任何 source digest。对于接近批准语义的报告，这比“看起来没问题”可靠得多。

## Maintenance Payoff / 维护收益

v2150 后，245 个 renderer 中已有 147 个使用共享 builder，未迁移数量降到 98。按未迁移文件统计，老式 h3 renderer 剩 14 个，for-loop renderer 剩 9 个，map renderer 剩 45 个，flatMap renderer 剩 39 个。这个口径比简单扫描全部文件更准确，因为已经迁移的文件仍会保留局部 `.flatMap(renderX)`，那是领域明细 helper 的合理用法，不应该再算作“老式外壳债务”。

本版真正减少的是重复外壳，而不是消灭所有局部函数。过去每个 renderer 都手写标题、空行、meta bullet、section heading、blocked reason 分支。任何一个文件复制错空行或漏一个 `- none`，都可能让归档读者看到不一致格式。现在这些通用格式集中在 builder，后续如果要调整报告骨架，只需要审查一个地方。局部 helper 继续保留，使字段语义仍然靠近领域对象。

另一个收益是验证流程可复用。v2148 引入的 trailing blank helper 在 v2150 继续有效，证明该抽象不是一次性补丁。只要 renderer 属于“compact h3 section 加本地 helper”的形态，就可以用同样方法迁移：先 hash baseline，再用 builder 包骨架，再 trim 最后一行，再 compare。这个方法让后续批次可以稳定推进，而不是每次重新发明空行策略。

## Failure Modes / 失败模式

第一类失败是字段串线。五个报告的字段名很相似，都有 ready、digest、count、approval、signature payload 等词。如果把 text package intake 的 source digest 放进 review preflight，普通 `toContain` 测试可能仍然能看到某个 digest 字符串，却无法证明顺序和来源正确。hash compare 能直接发现这种错位。

第二类失败是空行叠加。旧 helper 的末尾空字符串和 builder 的 section 前置空行如果同时存在，就会多出一行；如果裁剪过度，又可能让多个 h3 块贴在一起。v2150 对每个 h3 明细 section 都使用 `trimVerificationTrailingBlankLine`，只裁掉 section 最后一行的兼容空白，不碰中间明细块之间的空行。

第三类失败是把报告语义误读成执行语义。submission preflight 这个名字容易让人误以为已经提交，但当前对象仍然是前置检查。它展示 expected slot、actual submission、comparison control、blocks runtime payload 等信息，不执行提交。只要这类文件还停留在 renderer 层，就不能写成“已真实执行”或“已生产批准”。本版文档也明确记录了这个边界。

第四类失败是抽象过度。看到五个文件都像“两个 h3 section”，很容易继续抽出大而全的明细渲染器。但那样会把 authoring、instruction、intake、review、submission 的差异藏起来，后面排查批准材料时反而更难。v2150 选择只抽公共骨架，留下领域 helper，是更适合生产前治理代码的折中。

## Test Coverage / 测试覆盖

本版第一层验证是临时 hash 脚本。脚本在迁移前对五个 renderer 用 forced historical fallback fixture 渲染，记录 length 和 SHA-256；迁移后再次渲染并 compare。五个输出全部一致：authoring readiness、instruction preflight、text package intake、text package review preflight、text package submission preflight 都没有发生任何字节变化。

第二层验证是 focused Vitest。运行了 `verificationReportBuilder.test.ts` 以及五个对应报告测试，共 6 个文件、33 个测试。它覆盖 builder 的基础行为，也覆盖这批报告的 ready path、blocked path、Markdown 关键片段和 fallback 输入。第三层验证是 `npm run typecheck`，确认新的 builder spec、meta 数组和局部 helper 组合不会破坏 TypeScript 类型。

提交前还要跑 ratchet、代码讲解质量门、lint 和 diff 检查。ratchet 用来确认本版没有制造服务/路由膨胀；讲解质量门确认本文件是中文、结构完整且不是占位说明；lint 用来确认没有引入新的错误；diff 检查则避免行尾空白。临时 `.tmp` hash/codemod 脚本只服务本版验证，收尾时会删除。

## Next-version Direction / 下一版方向

v2151 可以继续沿 artifact draft text package 后续链条推进，优先看 compared evidence candidate、comparison preflight、comparison acceptance precheck 等相邻 renderer。它们仍然可能是 compact h3/flatMap 形态，但要先检查每个文件的局部 helper 是否真的同形。只要字段语义不同，就继续保留本地 helper，不为了压行数牺牲审查可读性。

下一版仍不应该直接进入真实分片联合执行。现在最有价值的工作是把批准前只读材料的报告层整理到稳定、可审计、可比对的状态。等 renderer 债务和报告外壳噪声继续下降后，再讨论 live service、端口、真实输入、清理责任和跨项目执行，会更容易把风险讲清楚。

## Cross-project Position / 跨项目位置

Java 和 mini-kv 本版推荐并行，不需要等待 Node。Node 使用冻结历史 fixture，不消费它们的新证据，也不要求它们修改 Node 文件。它们如果按自己的 playbook 继续做 CI、拆分、覆盖率或文档保养，不会影响 v2150 的 hash 和测试。

如果未来 Node 需要它们提供新版本证据，计划里必须写清楚具体版本、文件路径、服务启动方式和清理要求。在 v2150，没有这样的 live integration 条件。本版只是 Node 仓库内部的渲染保养和归档质量推进。

## One-sentence Summary / 一句话总结

v2150 把五个 signed approval artifact draft 文本包前置报告 renderer 迁移到共享 builder，并用历史 fixture 的长度与 SHA-256 证明输出完全不变，同时继续把真实批准、写入、服务启动和兄弟项目状态变更排除在本版之外。
