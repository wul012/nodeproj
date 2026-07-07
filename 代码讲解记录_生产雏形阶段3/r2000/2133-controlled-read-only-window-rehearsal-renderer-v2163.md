# v2163 代码讲解：把 live read-only window rehearsal packet 渲染器迁移到完整报告 builder

## Goal and Non-goal / 目标与非目标

v2163 继续执行 Node final push 里的 N1 renderer consolidation，目标是 `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalRenderer.ts`。这个 renderer 生成的是 controlled read-only shard preview 的 live read-only window rehearsal packet：一份给人工操作窗口使用的预演材料，里面列出 packet 状态、12 个 gate、20 个 rehearsal step，以及 blocked reasons。它的输出是完整 Markdown 文档，因此本版延续 v2162 建立的 full-document 路线，用 `renderVerificationReportMarkdown` 承担 H1、meta、section 的报告外壳。

本版非目标也同样明确。它不改 rehearsal packet 的生成逻辑，不改 20 个 step 的顺序、owner、evidence slot、failure class、cleanup slot，不改 gate 判定，不改 blocked reason，不启动 Java 或 mini-kv，不把 rehearsal 提升为真实 live execution。renderer consolidation 的价值是让重复 Markdown 外壳退到共享 builder 中，同时用 hash 证明文档内容没有漂移；它不是用重构名义改变流程治理。

选择这个文件有现实工程价值。v2162 迁移的是 execution readiness 三份文档，v2163 迁移的是下一层 live read-only window rehearsal packet，二者都属于“完整归档文档”形状，但 rehearsal packet 只有一个输出函数，内部 Steps section 更大，有 20 个三级标题和每步 11 行细节。把它迁移成功，说明 report builder 不只适合短文档，也能承载较长的人工预演材料。

## Entry Points / 入口与调用关系

本版的导出入口是 `renderControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacketMarkdown(packet)`。它被 rehearsal packet 测试直接调用，也通过 review artifacts barrel 暴露给 controlled read-only shard preview 的归档链。上游数据来自 `createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket(runbookPackage)`，而 runbook package 又来自 stage ledger，stage ledger 再来自 v2162 已覆盖的 execution readiness candidate verification。

这条调用链很长，但本版只碰最末端的展示层。artifact builder 仍负责决定 packet 是否 ready、是否允许 live execution、step count 是否完整、每个 step 是否 read-only、是否禁止 automatic service start。renderer 不重新计算这些事实，只把 packet 结构投影为 Markdown。这个边界很重要，因为如果 renderer 开始参与 gate 逻辑，测试 hash 就不能证明它只是展示层重构。

调用方看到的输出入口没有变化：函数名、参数类型、返回类型都保持原样。review artifacts barrel 的导出断言也不需要修改。也就是说，对外 API 没有迁移成本；变化只发生在函数内部，从手写数组拼接换成 `renderVerificationReportMarkdown` spec。

## Response/Data Model / 响应与数据模型

输入对象 `ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket` 包含 packet meta、gates、steps 和 blocked reason codes。meta 区包括 packet version、packet state、ready flags、step count、owner count、evidence slot count、cleanup required step count、failure class count、passed gates 和 packet digest。Gates section 来自 `packet.gates` 对象，Steps section 来自 `packet.steps`，Blocked Reasons section 来自 `packet.blockedReasonCodes`。

输出模型是一份 Markdown string。旧输出的 SHA-256 是 `cbbefc011c6cf84dabded2ea4a758baac90d4dfc5ec33a59b021c7ec5e283263`，长度是 8964，结构是 1 个 H1、3 个 H2、20 个 H3，并且末尾没有 trailing newline。迁移后这些数字全部保持不变。这里的长度和 hash 不是装饰性证据，它们覆盖标题、meta 顺序、step 行、空行、blocked reason 的 `- none` 以及文档末尾。

Steps section 是本版最需要保护的部分。每个 step 的标题形如 `### 1. Node v732 REHEARSAL_SOURCE_PACKAGE_PRECHECK`，后面依次列出 kind、source runbook section、owner、rehearsal instruction、evidence slot、failure class、cleanup required、read-only、writes allowed、automatic service start。renderer 仍保留 `renderStep(step)` 小函数，因为这 11 行是领域模板，不应该被通用 builder 吞掉。

## Upstream Evidence / 上游证据与配置边界

v2163 的测试 fixture 从 `readySourceMatrix()` 开始，依次生成 execution gap matrix、live read-only packet candidate、candidate verification、stage ledger、runbook package，最后生成 rehearsal packet。这个路径说明 rehearsal packet 是前面 readiness 材料的消费者，但所有数据都在本地测试进程中构造，没有访问真实 Java 服务、mini-kv 进程或外部网络。

因此本版仍属于 Node-local renderer consolidation。它没有要求 Java 或 mini-kv 先完成新的上游版本，也没有向 sibling repo 写文件。Java 与 mini-kv 可以继续并行推进自己的计划书任务；Node 这里只是把已有 frozen fixture 生成的 packet 渲染方式收敛。若后续进入 real joint testing，计划书需要重新写清服务启动者、端口、PID、cleanup owner、只读命令和 no-write 证据，不能借本版的 rehearsal 文档声称已经真实联合执行。

这个边界也影响文档措辞。rehearsal packet 里出现 “Ready for live execution: false” 和 “Ready for production execution: false”，这是安全状态，不是失败状态。它表示当前材料只允许人工预演准备，不允许自动打开真实窗口。v2163 保留这些字段和文本，就是为了让归档继续显示 conservative posture。

## Service Flow / 服务流程与等价路径

旧 renderer 的流程是手写数组：先放 H1 和空行，再逐行推入 packet meta，然后放 `## Gates` 和 `renderEntries(packet.gates)`，再放 `## Steps` 和 `packet.steps.flatMap(renderStep)`，最后放 `## Blocked Reasons`，若没有 blocked reason 就输出 `- none`。迁移后的流程是把这四块外壳写成 report spec：title、meta、sections 和 `trailingNewline: false`。

Gates section 使用 builder 的 `entries` 分支，等价于旧的 `renderEntries(packet.gates)`。Blocked Reasons 使用 builder 的 `list` 分支，`emptyText` 仍是 `none`，等价于旧的三元表达式。Steps section 使用 `lines: packet.steps.flatMap(renderStep)`，保留旧的 step 模板。这里没有使用 `trimVerificationTrailingBlankLine`，这是本版的一个关键细节。

原因是旧 rehearsal renderer 在 Steps section 后面显式放了一个空字符串，然后外层数组又在 `## Blocked Reasons` 前放了一个空字符串；最后一个 step 自己也以空字符串结尾。迁移时如果像 v2162 的 candidate 那样裁掉 Steps 的末尾空行，输出长度会少 1，hash 会从 `cbbefc...` 变成另一个值。v2163 保留 `packet.steps.flatMap(renderStep)` 的尾空行，再让 builder 在 section 之间插入空行，才恢复旧字节。这说明迁移不能机械套模板，必须逐文件尊重旧输出。

## Blank Line Contract / 空行契约

v2163 最值得记录的细节就是空行契约。表面看，Markdown 多一个空行不影响渲染效果；但这个项目的 archive review 不是只看浏览器效果，而是要能把版本归档、测试 fixture、route 输出和历史材料做字节级比较。对于这种治理型工程，空行就是契约的一部分。旧文档在 Steps 和 Blocked Reasons 之间保留了比普通 section 间隔更宽的空白，这不是本版要修正的“格式问题”，而是旧输出事实。

这也是为什么本版先测旧 hash，再改代码。如果先凭直觉把 `trimVerificationTrailingBlankLine` 加上去，代码看起来更整洁，输出却已经不等价。第一次迁移后长度从 8964 变成 8963，说明少掉的是一个换行而不是业务内容。这个反馈直接指导修复：保留 `renderStep` 的尾空行，让 builder 插入 section 分隔空行，最后再用 `trailingNewline: false` 保持文档末尾不加新换行。

后续维护者要把这条经验写进手感里：builder 是帮助表达旧结构的工具，不是格式美化器。不同旧 renderer 的空行习惯不一样，迁移时要把“旧输出到底是什么”作为事实来源，而不是把“我觉得 Markdown 应该怎么写”作为事实来源。只要目标是 renderer consolidation，字节等价优先于审美统一。

## Operator Reading Model / 人工预演阅读方式

rehearsal packet 的读者不是普通 API 使用者，而是准备 live read-only window 的操作者或 reviewer。Meta 区先告诉他 packet 是否 ready、是否仍禁止 live execution 和 production execution、总共有多少 step、owner/evidence/cleanup/failure class 是否完整；Gates 区再给出机械条件；Steps 区才是逐项人工预演清单。这个顺序本身有含义：先看是否允许进入人工预演，再看前置条件，再逐步执行 dry-run 阅读。

每个 step 的字段都服务于可追责操作。owner 说明谁负责，source runbook section 说明它从哪条 runbook 条款来，rehearsal instruction 说明本步要检查什么，evidence slot 说明未来真实窗口里证据放在哪里，failure class 说明失败时如何分类，cleanup required 说明是否要留下清理责任。read-only、writes allowed 和 automatic service start 三个字段则把安全边界放在每一步旁边，而不是只在文档顶部说一句。

因此 v2163 保留 `renderStep` 小函数也是可维护性的选择。通用 builder 可以管理报告骨架，但人工操作语义要留在本地函数里，让 reviewer 一眼看到每个 step 到底如何呈现。若以后 operator 反馈某个字段顺序不好读，应该改 `renderStep` 并带新的业务说明，而不是在 builder 里加 rehearsal 专用分支。

## Safety Boundary / 安全边界与只读性质

rehearsal packet 的语义核心是只读预演。20 个 step 都要求 `readOnly` 为 true、`writesAllowed` 为 false、`automaticServiceStart` 为 false、`startsServices` 为 false。它们会要求人工记录 owner、evidence slot 和 cleanup slot，但不会执行真实读，也不会启动 sibling 服务。renderer 只呈现这些字段，不改变这些安全约束。

本版没有引入任何新 shell 命令、HTTP 请求或 background process。focused test 只是构造 packet 和渲染 Markdown。它也没有改 `loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview` 的 profile 加载路径，所以线上 route 或 API 行为不会发生变化。对于生产前治理项目，这种“强约束下的无行为重构”很有价值，因为它把维护性提高和运行风险隔开。

还有一个安全边界是“不把 readiness 文档当作授权”。文档里可以写 manual live read-only rehearsal ready，但真实执行仍需要更高层的 approval、operator owner、进程清理和 no-write 验证。v2163 只让 rehearsal packet 更容易维护，不能替代这些外部授权。这个区别需要在后续计划书里继续保持。

## Test Coverage / 测试覆盖与机械门

本版增强了 `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsal.test.ts` 的 stable markdown 测试。原测试只检查标题、step count、第一步、最后一步和 ready flag；现在额外断言无尾换行、20 个 H3 step heading、长度 8964、SHA-256 `cbbefc011c6cf84dabded2ea4a758baac90d4dfc5ec33a59b021c7ec5e283263`。这能捕获空行、顺序、标题或任何 step 文本漂移。

focused gate 使用 `npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsal.test.ts test/rendererCensusScript.test.ts --maxWorkers=2`，2 个 test file、6 个测试通过。测试输出中的 `Renderer census regression: 57 exceeds --max-unstandardized=56` 是预期 stderr，证明反向门仍会阻止未标准化数量回升。

`npm run renderer:census -- --max-unstandardized=57` 通过，当前 census 为 245 total、188 standardized、57 unstandardized，remaining shape signals 为 h3 24、forLoop 0、map 67、flatMap 41。`npm run typecheck` 和 `npm run lint` 通过，lint 仍是既有 0 error / 263 warning。后续 closeout 会再跑 build 和文档质量门，确保归档材料本身也符合当前规则。

## Failure Modes / 失败模式与排查顺序

如果 rehearsal Markdown hash 失败，第一步不要改测试期望，而是比较输出长度。长度少 1 通常是 Steps section 与 Blocked Reasons 之间的空行被修剪；长度多 1 可能是误打开了 trailing newline；长度变化较大才需要检查 meta 顺序、step 模板或 blocked reason 列表。v2163 已经验证过一次少 1 的情况，结论是这个文件必须保留 Steps body 的尾空行。

如果 H3 数量不是 20，说明 step 渲染或上游模板数量变化了。renderer 迁移不应该改变 step count；若业务版本真的增加或减少 rehearsal step，必须在 artifact builder 版本里解释，而不是在 renderer 版本里顺手改。hash、length 和 H3 count 三个断言配合，可以帮助 reviewer 判断变化属于格式漂移还是业务演进。

如果 census 失败，也要先看方向。未标准化数量超过 57 是回退；低于 57 则说明又有新 renderer 被标准化，需要同步更新 baseline、证据和版本说明。计划书要求 census-as-script 的意义就在这里：进度不是靠手填表，而是靠一个可复现脚本给出数字。

## Reviewer Checklist / 评审清单

评审 v2163 时，可以按四层看。第一层看行为边界：diff 中没有 artifact builder、route、schema、config 或 sibling evidence 的修改，说明没有悄悄改变业务。第二层看输出等价：hash、长度、H3 数和无尾换行都在测试里，说明完整 Markdown 没漂移。第三层看治理进度：renderer census 从 187/245 到 188/245，未标准化从 58 到 57，反向门从 57 收紧到 56。第四层看文档：证据 JSON、解释和代码讲解都说明这是一版 Node-local full-document renderer migration，Java/mini-kv 可并行。

如果只想快速判断这版有没有越界，重点看三处：renderer 文件只新增 builder import 和 spec；test 文件只增强 stable markdown 断言，没有改 packet 期望；证据文件声明 runtimeBehaviorChanged、routesChanged、schemasChanged、rendererOutputChanged 均为 false。这三处一致，基本就能说明本版是维护性收敛，而不是功能行为变更。

如果要深入判断它有没有价值，重点看它和 v2162 的组合。v2162 证明 execution readiness 三份完整文档可以进入 report builder；v2163 证明 20 步人工预演 packet 也可以进入同一路线，并且识别出不同文件的空行策略差异。两版合起来不是重复劳动，而是在剩余 renderer 中建立了一条可复用的 full-document 迁移方法。

## Version Slicing / 版本切片理由

v2163 只迁移 rehearsal packet renderer，没有继续顺手迁移 command worksheet 或 evidence packet renderer。原因是 rehearsal packet 有足够独立的工程含量：它消费 v2162 readiness 链，包含 20 个步骤，空行策略和 v2162 不同，并且需要专门 hash 门。把它单独成版，reviewer 可以清楚看到这个文件的等价证明，而不被多个 long-name renderer 的输出差异淹没。

这也是对“版本不能太薄”的回应。一个版本的工作量不只看文件数，也看风险闭环是否完整。本版完成了目标选择、旧输出测量、builder 迁移、hash 回归修正、测试增强、census ratchet、typecheck/lint、证据说明和中文讲解。它不是小修小补；它把一个较长人工预演文档纳入统一报告范式，并写下了后续迁移同类文档时必须注意的空行规则。

下一步自然候选是同一 live read-only window 链里的 command worksheet、evidence packet 或 evidence intake renderer，但不能默认全部同一种空行策略。每个文件都要先测旧 hash，再看它是完整报告、route section 还是组合包装。v2163 的经验尤其提醒后续版本：`trimVerificationTrailingBlankLine` 是工具，不是默认动作。

## Maintenance Notes / 后续维护提示

维护这个 renderer 时，应把通用报告外壳和领域 step 模板分开看。title、meta、sections、trailing newline 属于 builder spec；step 内的 11 行字段属于 rehearsal packet 的业务展示模板。若未来新增 step 字段，不要把它藏进 builder，而应显式更新 `renderStep` 和对应 hash 证据。

若未来 rehearsal packet 从“手动预演准备”升级到“真实 read-only window 执行准备”，这个 renderer 仍不应该负责启动服务或写 evidence。应新增执行层或 capstone runner，并把真实输出作为新的上游 artifact，再由 renderer 展示。这样展示层保持纯函数，测试可控，cleanup 责任也不会混乱。

对于剩余 N1 renderer，v2163 和 v2162 合起来给出一个明确原则：完整 Markdown 文档用 report builder，route profile section 用 profile section builder，composition-only 文件不硬迁。这个原则比单纯追求 standardized 数字更重要，因为它能防止后期维护变成“所有东西都套一个 helper”的另一种混乱。

## One-sentence Summary / 一句话总结

v2163 把 live read-only window rehearsal packet 的完整 Markdown renderer 迁移到 `renderVerificationReportMarkdown`，并用 SHA-256、长度、20 个 step heading、无尾换行、census ratchet、typecheck 和 lint 证明这次重构只统一报告外壳，没有改变 rehearsal packet 内容或跨项目执行边界。
