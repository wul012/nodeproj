# v2158 代码讲解：把 live-window 手写 section 收进统一 profile renderer

## Goal and Non-goal / 目标与非目标

v2158 是 N1 renderer consolidation 的一个中等切片，目标很窄，但工程意义不小：把 controlled read-only shard preview 里 live-window profile sections 的手写渲染，迁移到 `renderProfileEntrySections` 这个共享入口。这个文件过去并不是坏代码，它的输出很规整：每一段都是二级标题、若干 `renderEntries` 行、再跟一个空行。问题在于这种规整还停留在人工复制的形态里，后续如果继续手写，reviewer 很难快速判断“这是一个新业务 section，还是又一份重复模板”。迁移后，section 的标题和行内容被明确表达成数据表，标题拼接、空行策略和 section 展平交给共享 helper，未来阅读时能更快分清“哪些是领域字段，哪些只是 markdown 外壳”。

本版不改运行行为，不改 route，不改 profile 生成，不改 Java 或 mini-kv evidence，不新增任何真实执行能力。它也没有处理剩余清单最前面的三个 composition-only renderer：`controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSectionRenderer.ts`、`controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSectionRenderer.ts`、`controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSectionRenderer.ts`。这三个文件只是拼接已经迁移过的子 renderer，本身没有 section heading 或 entry rendering 逻辑。按照计划书里“waivers only for composition-only renderers”的原则，它们更适合后续进入例外清单或在 Phase-B 合并时处理，而不是为了让 census 数字下降去添加没有语义的 marker。

## Entry Points / 入口与调用关系

本版的核心入口是 `renderControlledReadOnlyShardPreviewLiveReadOnlyWindowSections(profile)`。它被 `renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown(profile)` 调用，后者再由 controlled read-only shard preview route 暴露为 markdown 响应。也就是说，这个函数虽然只是返回 `string[]`，但它承载的是 route-facing 文本的一大块内容：execution gap matrix、live read-only packet candidate、candidate verification、stage ledger、runbook package、rehearsal packet、command worksheet、evidence packet、evidence intake ledger、evidence intake review package、manual evidence entry worksheet，以及后面已经拆出去的 operator evidence、approval、signed artifact draft、text package、candidate document sections。

迁移前，前 11 个 section 在当前文件里逐段手写。每段的结构完全相同，例如先写 `"## Execution Gap Matrix"`，再展开 `renderEntries({ matrixVersion, matrixState, ... })`，最后追加 `""`。迁移后，文件导入 `renderProfileEntrySections`，把这 11 段改成一个 section 数组：每个对象有 `heading` 和 `lines`，`lines` 仍然由原来的 `renderEntries` 产生。函数返回值仍是数组展开，后面的已拆分子 renderer 顺序不变。这里没有引入新的 domain helper，也没有把字段映射拆到别的文件，因为当前规模足够清楚；过早再拆一层反而会让 reader 跳文件。

## Data Model / 数据形状

`renderProfileEntrySections` 接收的形状很简单：`{ heading: string; lines: readonly string[] }[]`。它会对每个 section 生成 `## ${heading}`、展开 lines、追加空行。v2158 利用的正是这个稳定约定。原来的标题已经包含完整业务词，例如 `Live Read-Only Window Evidence Intake Review Package`，迁移后只去掉前缀里的 `## `，交给 helper 统一加回去。原来的 lines 没有重排，仍按同一对象字面量顺序传给 `renderEntries`，所以 `- key: value` 的行顺序和格式保持不变。

这点很关键：本版不是把 markdown 输出“重新设计”成一种更漂亮的文档，而是把既有输出的机械外壳换成共享机制。字段名、字段顺序、布尔值格式、digest 字段、计数字段全部原样保留。`renderEntries` 的 `formatValue` 行为也没有变：字符串直接输出，其他值走 JSON 序列化，`undefined` 输出 `unknown`。所以只要 section heading、lines 顺序和尾部空行一致，最终 markdown 应当字节级一致。

迁移后 census 的定义也更准确。v2157 的脚本把含有 `renderProfileEntrySections` 的 renderer 计入 standardized；v2158 的目标文件现在真正进入这个共享层，因此标准化数从 182 增至 183，未标准化数从 63 降至 62。remaining shape signals 没变：h3 仍是 41，forLoop 仍是 0，map 仍是 75，flatMap 仍是 46。原因是这个目标文件原本没有 `###`、`.map` 或 `.flatMap` 信号，它是一个手写二级 section 列表；迁移它降低的是 unstandardized count，不会改变剩余形态提示。

## Service Flow / 输出路径与等价性

运行时路径保持不变。测试 fixture 先通过 `loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview` 构造 `ControlledReadOnlyShardPreviewProfile`，其中 Java 和 mini-kv 都是测试内的 fake client，不启动真实服务，也不连接兄弟仓库。随后 live-window renderer 读取 `profile.preview` 里的多个子对象，把它们渲染成 markdown section。上层 full renderer 把这些 section 插入 source matrix、handoff、checks、summary、blockers、warnings、recommendations、evidence endpoints 和 next actions 之间，最终形成 route-facing markdown。

本版新增的测试刻意同时检查两个 hash。第一个 hash 对 live-window section 自身取 `sections.join("\n")`，对应值是 `66d0f030a66b890f102c675b37ae93c27e8ee3503e49337fc3994e389d16b605`，长度为 52094。第二个 hash 对完整 route markdown 取值，对应 `a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d`，长度为 81829。这样做比只断言若干 `contains` 更强：如果标题多了一个空格、空行少了一行、某个字段顺序被改动，hash 都会变。

测试里还保留了可读断言：sections 里 `## ` heading 数量是 39，第一个 section 必须是 `## Execution Gap Matrix`，并且必须包含 manual evidence entry worksheet、operator evidence value supply envelope、approval packet draft、artifact draft text package intake 等关键段落。这个数量不是完整 route markdown 的 heading 数，而是 live-window renderer 自身返回数组里的 heading 数。完整 route 里还有 source matrix、checks、summary 等其他 section，因此不能把 route heading 数拿来约束这个函数。第一次本地测试红就是因为我把这个口径写成了 55；修正为 39 后，hash 与 route 测试都通过。

## Safety Boundary / 安全边界

这次修改只触及一个 `src/services/*Renderer.ts` 文件、一个测试文件和版本材料。它没有修改 loader、resolver、client、config、route registration 或任何 upstream action flag。fake Java / mini-kv 只在测试进程里返回固定 evidence；没有真实 TCP 外连到生产服务，也没有启动 sibling service。测试中的 route case 会启动本地 mock HTTP server 和 mock TCP server，但它们在测试 `finally` / `afterEach` 中关闭，属于既有测试模式，不是本版新增的后台服务。

从维护角度看，v2158 没有把一个 192 行文件膨胀成更大的巨型工具，也没有新增一个只能服务单文件的 helper。`renderProfileEntrySections` 已经被 candidate document、signed approval artifact draft、operator evidence value supply 等 profile-section renderer 使用，本版只是让同一类结构继续归队。这个选择符合当前系统的局部抽象边界：共享层负责 markdown section 外壳，业务文件负责字段选择和顺序。

需要注意的风险是 hash 测试会对 fixture 输出非常敏感。后续如果 controlled read-only shard preview profile 的真实字段发生有意变化，full markdown hash 可能需要随业务变更收紧更新；但在纯 renderer 迁移批次中，hash 变化就是失败信号，不能通过改期望来让迁移过关。换句话说，v2158 的 hash 测试是 migration parity guard，不是业务输出演进测试。这个边界在 review 时要说清，避免未来把它误用为“任何 route 文案都不能变”的永久冻结。

## Test and Verification / 验证链

本版先用 `npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowProfileSectionsRenderer.test.ts test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test/rendererCensusScript.test.ts --maxWorkers=2` 跑 focused tests，结果 3 个 test file、4 个 test 全部通过。这里覆盖三件事：live-window section hash 不变，完整 route markdown hash 不变，route markdown 仍包含原有关键业务段，renderer census 的 62 基线和反向失败门有效。测试输出中 `Renderer census regression: 62 exceeds --max-unstandardized=61` 是预期 stderr，因为测试故意执行更严格的门来证明它会失败。

随后执行 `npm run renderer:census -- --json`，得到总数 245、已标准化 183、未标准化 62；再执行 `npm run renderer:census -- --max-unstandardized=62`，证明当前树没有超过新基线。`npm run typecheck` 通过，说明 import 与类型没有破坏；`npm run lint` 通过，仍是既有 0 error / 263 warning；`npm run build` 通过，说明生产编译也接受这次迁移。v2157 的远程 CI 在本版开始时已经通过 typecheck 和 lint，仍处于 Test 步骤；按照中间版本不原地 block-watch 的规则，v2158 可以继续本地收口，但在 push/下一版前仍要检查远程结果，若红则先修 CI。

## Maintenance Notes / 后续维护提示

选择 live-window profile renderer 作为 v2158 的目标，还有一个现实理由：它不是最难的 renderer，却覆盖了很大的 route-facing 输出面。它连接了早期 read-only shard preview 的执行差距、候选包、证据包、证据录入和人工 worksheet，再把后续已经拆出的 operator evidence 链条接上。换句话说，它的结构足够统一，适合迁移到共享 helper；它的输出又足够长，足以证明迁移不是只改一个玩具段落。如果这类 52KB markdown 面都能 byte-identical 收进统一 section 模型，后续更短的 handoff、intake、decision-record renderer 就可以沿着同一种验证方式推进。

这个入口还体现了 N1 后半段最需要坚持的边界：迁移 renderer，不顺手改 profile。很多字段名看起来冗长，例如 `readyForManualEvidenceEntry`、`importsRuntimePayload`、`acceptsSyntheticEvidence`、`containsSecretValue`，但这些字段是上游 profile 的合同语言，不是 renderer 迁移可以重新命名的对象。v2158 只把“标题如何包裹 lines”统一，不借机重排字段、不把一组布尔值抽成新 summary、不把 digest 字段拆到新 helper。这样 reviewer 可以把注意力集中在两件事：旧输出是否等价，新文件是否更容易维护。

这里也说明了 census 的一个使用细节：它是进度门，不是复杂度评分器。某个文件没有 `.map` 或 `.flatMap`，不代表它没有维护成本；目标文件恰好就是例子。它没有高级控制流，却有 11 组重复结构和 52KB 的固定输出面，review 成本来自“复制粘贴结构太多”，而不是来自算法复杂度。v2158 迁移后，复杂度仍在字段清单本身，但 markdown 结构的重复被收进一个统一函数，后续 diff 更容易看出真正新增或删除了哪个字段。

这次 focused 测试里出现过一个小但有价值的修正：我最初把 live-window section 的 heading 数写成 55，测试立即失败；检查后发现 55 是完整 route markdown 的外层章节口径，而这个 renderer 自身返回的是 39 个二级 section。修正为 39 不是降低标准，而是把断言范围对准当前函数的责任。后续遇到 aggregator 或嵌套 renderer 时，也要先分清“这个函数负责什么”和“上层页面最终包含什么”，否则测试会给出误导性的红灯。

另一个安全点是本版没有扩大共享 helper 的能力。`renderProfileEntrySections` 仍然只会渲染二级标题、展开 lines、添加空行；它不会理解 digest，不会过滤空字段，不会格式化布尔值，也不会根据 profile 状态隐藏 section。保持 helper 简单，能减少“迁移一个 renderer 却影响所有 profile section”的风险。如果未来确实需要更强的 section helper，例如支持 optional section 或 section-level messages，应当单独成版，并先证明所有现有调用点不会改变输出，而不是在 N1 的 byte-identical 迁移批次里顺手扩展。

维护 hash 测试时要看变更类型。如果下一版仍是 renderer 迁移，hash 不应改变；如果未来 profile 生成逻辑新增字段，hash 改变可能是合理的，但必须在那个业务版本的讲解里说明新增字段、输出位置和 reviewer 可复现命令。不能因为 hash 测试“烦”就删除它，也不能在没有解释的情况下把 expected hash 改成新值。它的职责是让迁移批次对 route-facing 文本负责，而不是冻结所有未来产品演进。

下一批不宜继续处理这三个 composition-only 文件，除非计划明确要建立 waiver 口径或合并子 renderer。更好的路线是挑选仍然包含真实 `.map`、`.flatMap` 或多段 `renderEntries` 的 unstandardized renderer，先用固定 fixture 取 pre-hash，再迁移到 `renderProfileEntrySections` 或 `releaseReportShared`，最后用同一条 census 命令收紧基线。这样每一版都能回答三个问题：输出有没有变，标准化数字有没有下降，代码结构是否比上一版更容易审查。

如果后续某个 renderer 的输出无法稳定 hash，优先查 fixture 是否包含时间、路径、随机顺序或外部状态；不要先改 renderer。v2158 的目标能稳定 hash，是因为 fixture 完全在测试内构造，profile 的 generatedAt 或 digest 来源已经在既有测试体系中稳定。如果遇到包含当前时间的 renderer，应先找项目内是否已有 fixed clock 或 stable profile builder，而不是把 hash 断言换成松散的字符串包含。N1 的价值来自 byte-identical 证据，不能让后半段退回“看起来差不多”的文本匹配。

验证链还有一个隐含结论：v2158 不需要启动 HTTP smoke server。目标是纯 markdown renderer，focused route test 已通过 `app.inject` 覆盖 JSON 和 markdown 输出，mock Java 与 mock mini-kv 在测试内完成，且没有留下后台进程。build 生成的 `dist/` 是验证产物，收版前应删除；如果后续为了截图或页面 smoke 启动真实 server，才需要补 `d/<version>/图片`，本版没有新的可视页面，也没有新增浏览器验证价值。

reviewer 复核本版时，最短路径不是重读整个 192 行文件，而是三步：先看 diff 是否只把手写 section 改成 `heading/lines` 数据表；再跑新 hash 测试确认局部和完整 markdown 都不变；最后跑 `npm run renderer:census -- --max-unstandardized=62` 确认标准化数字只收紧没有回退。三步都成立，本版的重构意图就闭环了。

下一版选题时应先过滤“只拼接子 renderer”的文件，再看剩余文件是否真的拥有自己的标题、字段映射或列表展开逻辑。这样可以避免把 waiver 候选误当成迁移目标，也能让每一版的解释都有真实工程内容。
这条顺序要坚持。

## One-sentence Summary / 一句话总结

v2158 的价值不是多迁移了一个数字，而是把一个 52KB 输出面的手写 live-window section renderer 收进统一 section 语义，并用固定 hash 证明这个重构没有改变用户真正会看到的 controlled read-only shard preview markdown。
