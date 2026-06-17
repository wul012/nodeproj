# v2148 Renderer Consolidation Batch 30

## Target And Non-target / 目标与非目标

v2148 的目标很窄：继续把 controlled read-only shard preview live-read-only-window 族里的五个 Markdown renderer 收敛到通用 `verificationReportBuilder` 外壳。被迁移的五个对象是 fresh sibling intake、value supply envelope、approval packet draft、approval packet review、signed approval template。它们位于“读取历史兄弟项目证据”到“形成批准包和签名模板”的中段，看上去已经接近真实批准流程，但本版仍然只处理只读报告渲染。

非目标同样重要。本版不生成批准，不采集签名，不启动 Java 或 mini-kv，不写入兄弟项目状态，也不让任何 `readyForSignedApprovalCapture` 或 `approvalGrantPresent` 从 false 变成 true。所有业务字段、状态机、digest 计算和 fixture 读取逻辑都留在原来的 artifact/type/service 文件里。renderer 的职责只是把对象写成 Markdown，因此迁移成功的标准不是“输出更漂亮”，而是“输出字节完全不变，同时重复结构更少”。

## Entry Points / 入口

本版主要入口是五个 renderer 文件：`OperatorEvidenceFreshSiblingIntakeRenderer.ts`、`OperatorEvidenceValueSupplyEnvelopeRenderer.ts`、`OperatorEvidenceValueSupplyApprovalPacketDraftRenderer.ts`、`OperatorEvidenceValueSupplyApprovalPacketReviewRenderer.ts` 和 `OperatorEvidenceValueSupplySignedApprovalTemplateRenderer.ts`。它们都接收一个已经构造好的 profile 对象，返回一段 Markdown 字符串。

辅助入口是 `verificationReportBuilder.ts`。v2146 已经让 builder 支持紧凑 section 和无末尾换行；v2147 加入 blocked reason 行 helper；v2148 在这个基础上增加两个小工具：`renderVerificationResolvedEvidenceFileDetailLines` 和 `trimVerificationTrailingBlankLine`。前者渲染 h3 形式的 Evidence Files 明细块，后者把旧 h3 helper 带来的单个末尾空行裁掉，让 builder 的 section 前置空行和旧输出保持一致。

## Response Model / 响应模型

这些 renderer 的输出模型可以拆成四层。第一层是标题和 meta bullet，例如版本号、source version、ready 状态、slot/control/field 计数、digest 和安全开关。第二层是 `## Gates`，它仍然通过 `renderEntries` 渲染，因为 gate 对象本来就是 key-value 形态。第三层是领域明细 section：有的叫 Slots，有的叫 Controls，有的分成 Fields 和 Clauses。第四层是 `## Blocked Reasons`，由共享 helper 输出 `- none` 或逐条 blocker code。

v2148 没有把 Slots、Controls、Fields、Clauses 抽进 builder。原因是这些行虽然形态相似，语义并不相同：slot 记录证据供应位置，control 记录人工审阅问题和策略检查，field/ clause 则描述签名模板字段和拒绝条款。把它们硬抽成通用结构会让 builder 变成领域模型，后续维护反而更难。本版只抽真正重复且语义稳定的 Evidence Files detail block。

## Upstream Evidence / 上游证据

fresh sibling intake 和 value supply envelope 会展示 Java/mini-kv 证据文件、snippet 匹配结果和历史 fixture fallback 解析结果。approval packet draft 继续展示 value supply 证据来源。approval packet review 和 signed approval template 则更多依赖前一层 Node 对象，不再重复 Evidence Files section。也就是说，本版覆盖的链条从“兄弟项目证据是否存在”逐步过渡到“批准包是否具备人工审阅材料”。

验证时临时 hash 脚本强制设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`。这点不是装饰，而是为了避免本机 Java/mini-kv 工作树变化影响 Markdown 路径、digest 或 snippet 状态。只要 fallback 输出与迁移前 hash 一致，就能证明 Node 在没有新鲜兄弟项目产物的情况下仍能稳定渲染归档。这也解释了为什么 Java 和 mini-kv 本轮推荐并行：Node 使用冻结证据，不把它们的当前进度当成前置批准。

## Service Flow / 服务流

实际调用流程没有改变。上层 loader 或测试 fixture 先创建完整的 controlled read-only shard preview profile，然后其中的 liveReadOnlyWindow 对象携带五个子报告。renderer 接到对象后，把 meta 字段交给 `renderVerificationReportMarkdown`，把 gates 交给 `renderEntries`，把 Evidence Files 交给 `renderVerificationResolvedEvidenceFileDetailLines`，把领域明细行保留在原文件本地 helper 中。

这个流向的好处是审阅者可以很快分辨责任边界：builder 管 Markdown 骨架，renderer 管本对象字段顺序，本地 helper 管领域明细行，artifact/service 管数据来源和状态计算。比如 approval packet draft 的 `approvalCaptured`、`signedApprovalPresent` 和 `operatorIdentityPresent` 仍然来自原对象；renderer 只是照原顺序输出。后续如果这些状态有业务变化，修改点仍然在 artifact/service 层，而不是 builder。

## Safety Boundary / 安全边界

本版最需要守住的是批准边界。approval packet draft、review 和 signed approval template 这些名字容易让人误会，以为系统已经能够批准或签名。实际上输出里反复出现的是 `Approval captured: false`、`Signed approval present: false`、`Ready for signed approval capture: false`、`Writes allowed: false`、`Mutates sibling state: false`。renderer 迁移绝不能改变这些值，也不能把 blocked/manual 状态解释成 ready。

因此 v2148 的 byte-identical 验证比普通测试更关键。普通测试会检查关键片段存在，但不一定覆盖所有空行、顺序和长字段。hash 比对把完整 Markdown 当成合同，任何字段顺序变化、空行变化、标签变化都会失败。五个输出的 length 和 SHA-256 全部一致，说明本版没有制造隐藏的批准语义变化，也没有在报告中悄悄增删安全开关。

## Maintenance Payoff / 维护收益

迁移后 builder-backed renderer 从 132 增加到 137，未迁移 renderer 从 113 降到 108。剩余形态统计也同步下降：h3 从 43 到 38，map 从 60 到 55，flatMap 从 54 到 49。数字本身不是目的，但它说明最难的一类 compact h3/flatMap renderer 正在稳定缩小，而不是继续堆出新的手写报告。

更实际的收益在重复结构上。三个文件原来各自复制 Evidence Files 明细块，字段完全相同：id、path、resolvedPath、exists、sizeBytes、digest。这个结构现在收敛为一个共享 helper。另一个收益是显式记录“旧 h3 block 末尾空行”这个兼容点。以前空行只是数组里一个空字符串，迁移时容易看漏；现在 `trimVerificationTrailingBlankLine` 把这个行为写成了可测试的维护工具。

## Spacing Mechanics / 空行机理

这版最容易出错的地方不是字段，而是空行。旧 renderer 是手写数组：有些 section 后面显式放一个 `""`，有些 section 依赖本地 `renderSlot`、`renderControl`、`renderField` 或 `renderClause` 的最后一行正好是空字符串。builder 的行为则是每个 section 前统一插入一个空行。如果把带末尾空行的旧 helper 原样交给 builder，而旧数组本来没有额外 `""`，输出就会多出一行空白，测试里的 `toContain` 可能不报错，但 SHA-256 一定会变。

所以 v2148 没有把空行问题藏在人工审阅里，而是把它写成明确 helper：`trimVerificationTrailingBlankLine`。这个 helper 只移除最后一个空字符串，不会改中间空行，也不会压缩多段内容。它的使用点都对应旧输出中“helper 自带空行，后面直接接下一个 h2 section”的形态。Evidence Files 则采用另一种处理：共享 helper 在文件块之间保留空行，但最后一个文件块后不再额外返回空行，让 builder 的 section 前置空行承担跨 section 分隔。这样做以后，空行规则可以被单元测试和 hash 比对同时锁住。

## Failure Modes / 失败模式

如果本版迁移失败，最可能出现四类问题。第一类是 meta 标签顺序变化，例如把 `Ready for operator value submission` 放到 `Ready for operator value supply` 前面，语义未变但归档 diff 会变。第二类是 ratio 字段格式变化，旧输出是 `7/7` 或 `25/25`，如果直接把两个数字作为两个 meta 字段，读者看到的报告结构就变了。第三类是 Evidence Files 末尾空行漂移，这会让相邻 section 多出空白。第四类是 approval 语义被误读，例如把“模板 preflight ready”当成“签名 capture ready”。

本版的验证链正是按这些失败模式设计的。hash 比对覆盖顺序、标签、空行和完整字符串；focused tests 覆盖 ready/blocked 两条业务路径、fallback、profile 注入和关键 Markdown 片段；typecheck 覆盖 helper 参数形态；ratchet 覆盖没有新增服务或 route。单一验证无法证明全部，但组合起来可以说明这次重构是外壳搬迁，不是行为改变。后续迁移如果进入 artifact draft text package，更要延续这种失败模式思维，因为那一段字段更多、名称更长、审阅风险也更高。

## Review Checklist / 审阅清单

审阅本版可以按四步走。第一，看五个 renderer 的 meta 标签是否与旧输出一一对应，尤其是 ratio 字段是否仍然用 `passed/total` 字符串。第二，看 Evidence Files section 是否只出现在原本拥有该 section 的三个 renderer 中，不要把 review/template 文件误加证据文件块。第三，看 Slots/Controls/Fields/Clauses 是否仍然由本地 helper 生成，不要把领域语义塞进 builder。第四，看 Blocked Reasons 是否统一走共享 helper。

还有一条容易被忽略：`trimVerificationTrailingBlankLine` 只能用于旧 helper 自带末尾空行、且旧 section 后没有额外显式空行的地方。不能为了“看起来整齐”到处裁剪，因为 v2146/v2147 的某些 renderer 旧输出本来就有两个空行边界。v2148 的 hash compare 已经证明这五个调用点是正确的，但后续迁移仍要按旧数组结构逐个判断。

## Test Coverage / 测试覆盖

本版第一层验证是临时 hash 脚本。它渲染五个 ready fixture，记录长度和 SHA-256，然后在迁移后重新渲染比较。结果是 freshSiblingIntake、valueSupplyEnvelope、approvalPacketDraft、approvalPacketReview、signedApprovalTemplate 全部 mismatch 为 0。这里使用 ready fixture 是因为它覆盖最大字段面；blocked path 继续由现有测试覆盖。

第二层验证是 focused Vitest：`verificationReportBuilder.test.ts` 加五个同族 report 测试，共 6 个文件、33 个测试通过。builder 测试新增了 Evidence Files detail helper 和 trailing blank trim helper 的直接断言；五个 report 测试继续覆盖 ready 构造、blocked fail-closed、Markdown 关键片段、profile 注入和强制历史 fallback。第三层是 `npm run typecheck`，它确认新增 helper 的类型边界能被当前 tsconfig 接受。

## Next-version Direction / 下一版本方向

v2149 可以继续沿 signed approval capture 方向推进，但切片要小心。下一批自然候选包括 signed approval capture preflight、artifact preflight、artifact draft preflight、draft readiness、draft authoring readiness 或 instruction preflight。它们仍然是同族 renderer，也有测试；不过语义会更接近“签名材料草稿”和“捕获前置检查”，审阅时必须继续强调不产生真实签名、不产生批准、不解锁 runtime payload。

如果下一批出现更多 Evidence Files detail block，可以继续复用本版 helper。如果出现的是 artifact draft/text package 的字段组合，不应急着抽新 builder API。先迁移一批，观察是否存在真正稳定的结构；只有当多个 renderer 重复同一种 h3 detail 行，并且抽象名称能表达清楚领域边界时，才把它提升为共享 helper。这个节奏比快速清空未迁移数量更重要。

还有一个取舍需要写清楚：本版没有把 `renderSlot`、`renderControl`、`renderField`、`renderClause` 合并成一个“万能明细渲染器”。短期看，合并后行数会更少；长期看，审阅者会失去语义锚点，不知道某个字段属于证据槽位、人工审阅控制、模板字段还是拒绝条款。生产前治理代码最怕这种“抽象看起来很统一，但出问题时不知道谁负责”的结构。v2148 选择保留本地 helper，是为了让每个 renderer 仍然能被领域词汇快速搜索、快速审阅、快速回滚。

如果后续发现某个迁移点有问题，回滚也很直接：先看 hash mismatch 指向哪一个 renderer，再只恢复该 renderer 的外壳拼接；共享 helper 可以保留，因为它们有独立测试且不改变调用方数据。这样的回滚粒度比整批撤销更好，能保护已经验证过的其他四个输出。

收尾时还要确认临时 hash 脚本已删除。它是验证工具，不是产品能力；保留下来会让仓库误以为存在一个长期维护的渲染审计入口。

真正长期保留的是归档证据和测试断言，而不是一次性的比对脚本。

这能避免未来误用，不留维护尾巴。

## Cross-project Position / 跨项目位置

Java 和 mini-kv 推荐并行。本版没有读取它们的新提交，没有要求它们生成真实文件，也没有把它们当前工作树当成 Node gate。Node 的输入来自冻结历史 fixture fallback，输出只是 Node 归档 Markdown。即使 Java/KV 同时推进自己的保养或证据链优化，也不会和 v2148 产生 git 冲突或契约冲突。

如果后面要进入真实分片联合执行，边界会不同：那时 Node 必须明确列出需要的新 Java/KV 版本、服务启动端口、清理要求、真实输入文件格式和批准材料来源。但 v2148 还在前置保养阶段，目标是把只读报告渲染变得可维护，让将来的真实执行审阅不被 245 个手写 renderer 淹没。

对另外两个项目的要求也因此保持克制。它们可以读 Node 的中央计划继续做本仓库允许的工作，但不需要为了 v2148 反向修改 Node 文件，也不需要制造“真实批准”占位物。真正有价值的协作方式，是 Java/KV 在自己的仓库里把证据产物、测试、progress 文档和清理规则做扎实；Node 在需要消费新证据时，再明确列出版本号、文件路径和 fallback 快照。这样三项目并行才不会退化成互相等待或互相污染工作树。

## One-sentence Summary / 一句话总结

v2148 把五个从 fresh sibling evidence 到 signed approval template 的只读 Markdown renderer 迁入共享 report builder，并用字节级 hash 证明批准语义、安全开关、证据路径和输出格式全部保持不变。
