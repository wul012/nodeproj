# v2161 代码讲解：把 handoff summary 承接链收进统一 profile renderer

## Goal and Non-goal / 目标与非目标

v2161 继续推进 N1 renderer consolidation，目标是迁移 controlled read-only shard preview 中的 handoff summary renderer。这个文件处在 source matrix 与 route coverage 之间：source matrix 说明证据源、消费计划和复核清单是否可用，handoff summary 把这些信息整理成给 operator / reviewer 可消费的移交说明，route coverage 再证明这些移交内容已经进入 route-facing 报告。旧实现把 7 个二级 section、3 个三级段落、receipt / archive / verification 多组字段写在同一个手工数组里，结构稳定但维护噪音偏高。

本版的目标不是增加新的 handoff 能力，而是降低这段报告的排版重复。迁移后，`renderProfileEntrySections` 负责统一加二级标题和尾部空行，业务文件只保留每个 section 的 heading 与 lines。非目标包括：不改 handoff notes 生成，不改 consumer gate，不改 export digest，不改 receipt digest，不改 archive snapshot，不改 route，不改 schema，不读新的 Java / mini-kv evidence，也不启动任何真实服务。只要输出 hash 改变，本版就必须视为失败，而不能用“重构后看起来更整齐”来解释。

选择 handoff summary 作为 v2161 有连续性。v2159 处理 route coverage，v2160 处理 source matrix，v2161 刚好补上中间的移交摘要链。这样三版连起来，controlled read-only shard preview 的前半段大块 route-facing section 已经从手写 Markdown 外壳逐步收敛到同一 profile-section 模型。这个路线比随机挑文件更容易审查，也更能说明 N1 后半段不是机械扫文件，而是在沿报告阅读路径降低维护成本。

这版的实际收益不是“文件少了几行”，而是把 handoff 链条的层级关系显出来。旧数组里 notes、summary、consumer、export、receipt、archive snapshot、archive verification 连在一起，读者要靠肉眼数标题判断当前处于哪一步。新结构把每一步都变成独立 section 对象，reviewer 先看到流程骨架，再看每一步的字段。对于生产前治理报告来说，这种可审查性比局部代码长度更重要。

## Entry Points / 入口与路由关系

本版直接入口是 `renderControlledReadOnlyShardPreviewHandoffSummarySections(profile)`。上层 full renderer 在 `renderControlledReadOnlyShardPreviewSourceMatrixSections(profile)` 后调用它，然后再调用 route coverage 和 live-window sections。因此 handoff summary 的位置非常明确：它承接 source matrix 的 review digest 与 summary export，把这些结论转成 handoff notes、summary consumer、consumer export、receipt 和 archive verification。它不是独立页面，而是整份 controlled read-only shard preview Markdown 的中间段。

旧入口返回一个长数组，里面直接写 `"## Source Matrix Handoff Notes"`、`"### Handoff Notes"`、`"### Handoff Summary Consumer Gates"`、`"### Handoff Summary Receipt Archive Verification Gates"` 等标题。新入口仍返回 `string[]`，但改为 `renderProfileEntrySections([...])`。每个 section 对象的 `heading` 对应一个二级标题，`lines` 保存字段行、内部三级标题和列表展开。调用方不感知这个变化，route 的 Markdown 响应仍是同一份文本。

这版比纯平铺 section 稍复杂，因为 `Handoff Notes` 是由 notes 列表 map 出来的，consumer gates 和 receipt archive verification gates 仍由 `renderEntries` 展开。迁移时不能把这些内部三级标题交给 helper，也不能让 helper理解 gates 的业务含义。它们只是 lines 的一部分，原样保留在各自 section 内。测试断言 7 个 `##` 和 3 个 `###`，就是为了防止内部层级在重构时被误删。

入口的另一个复核点是相邻章节顺序。handoff summary 必须紧跟 source matrix summary export，因为它的 `inputSummaryExportVersion`、`handoffDigestValue`、`summaryDigestValue` 等字段都在说明“上一段证据如何被交接”。如果未来有人把它移到 route coverage 后面，文本仍可能编译通过，但报告叙事会倒置。本版没有移动上层调用顺序，也没有把 handoff summary 合并进 source matrix renderer，保留了清楚的责任边界。

## Response/Data Model / 响应与数据模型

输入模型仍是 `ControlledReadOnlyShardPreviewProfile`。renderer 读取的对象包括 `sourceMatrixHandoffNotes`、`sourceMatrixHandoffSummary`、`sourceMatrixHandoffSummaryConsumer`、`sourceMatrixHandoffSummaryConsumerExport`、`sourceMatrixHandoffSummaryConsumerReceipt`、`sourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot` 和 `sourceMatrixHandoffSummaryConsumerReceiptArchiveVerification`。这些对象已经由上游 profile 构造完成，renderer 不重新判断是否 ready，不重新计算 digest，也不根据 blocked reason 改写输出。

输出模型仍是 `string[]`。迁移前固定 fixture 下，handoff summary section 的 `sections.join("\n")` hash 是 `fb9c44571c6456026784947dbcb6a563d85aa24c9123d7905638a4794c520069`，长度为 6564；完整 controlled read-only shard preview Markdown hash 是 `a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d`，长度为 81829。迁移后这些值完全不变，说明字段顺序、空行、小标题、digest 行和上层拼接都保持原状。

handoff summary 的数据链条是递进的：notes 先形成 handoff digest，summary 记录 audience 与 action required 信息，consumer 验证摘要可消费，export 生成导出行，receipt 确认导出被收取，archive snapshot 归档 receipt，archive verification 再验证归档结果。renderer 不需要理解这些状态如何产生，但必须保持它们的展示顺序，因为这个顺序就是人工 reviewer 阅读移交流程的顺序。本版用 section 数据表把这种顺序显式化。

字段格式也必须保持旧行为。例如 audiences 继续用逗号连接，export lines 和 receipt lines 继续用分号连接，blocked reason codes 在空列表时继续显示 `none`。这些看起来像小细节，但它们会影响人工复核和 hash。v2161 没有把所有内容改成 `renderEntries`，正是因为旧输出已经有少量定制格式。统一 section 外壳不等于抹平领域表达，迁移时要保留这些局部格式约定。

## Upstream Evidence / 上游证据与配置边界

本版测试仍使用 controlled read-only shard preview 的固定 fixture。Java 和 mini-kv 在这里只是已冻结的 profile 输入，不启动真实 Java jar，不执行真实 `minikv_cli`，也不向 sibling project 写任何文件。handoff summary 文本里虽然出现 routing activation、fresh sibling evidence、starts services、mutates sibling state 等字段，但这些字段只是被展示，不会触发任何动作。

因此 Java 和 mini-kv 可以继续并行推进。v2161 没有提出新的上游版本要求，没有更改 evidence schema，没有更改共同 route contract，也没有要求另外两个项目产生新的 approval 或 receipt。等后续进入 integration capstone，才需要三项目共同启动真实只读消费验证；本版仍属于 Node 本地 renderer consolidation。这个边界要写清楚，避免其他项目误以为 Node 的 handoff summary 迁移会阻塞它们自己的计划。

如果未来 handoff summary 的上游对象发生变化，应该先判断变化来自哪里。若 profile 新增 handoff note 或 receipt 字段，局部 hash 会变化，那是业务输出变更，需要在业务版本说明；若只是 renderer 重排或 helper 替换，hash 就必须不变。v2161 的测试把这条边界机械化，避免后续靠肉眼判断“差不多还是那份报告”。

从跨项目角度看，handoff summary 容易被误解为“已经完成真实移交”。实际上，本版只是展示已有 fixture 中的移交摘要，不代表 Java 或 mini-kv 已被 Node 实时读取，也不代表可以执行生产窗口。计划书最后要求的真实联合执行仍未在这里打开。这个 distinction 很关键：文档可以说本地 route-facing Markdown 等价、renderer 标准化推进，但不能把它夸成跨项目 live integration 已完成。

## Service Flow / 服务流程与等价路径

运行流程可以拆成四步。第一步，controlled read-only shard preview service 构造 profile，并在 source matrix 阶段产生 summary export。第二步，handoff summary renderer 把 summary export 之后的移交链整理成 7 个 section。第三步，`renderProfileEntrySections` 统一为每个 section 加二级标题和尾部空行。第四步，上层 full renderer 把它与 source matrix、route coverage、live-window 和后续 checks / summary 等段落拼接成完整 Markdown。

本版最重要的等价点是空行归属。旧代码在每个二级 section 末尾手写 `""`，在三级标题前后也手写空行。新代码让 helper 负责二级 section 末尾空行，内部空行继续留在 lines 中。这样既避免重复写 section 尾部，又不会改变 `### Handoff Notes`、consumer gates、archive verification gates 的位置。局部 hash 保持不变，说明这一点处理正确。

另一个等价点是列表模板没有变化。handoff notes 仍按 `- order. audience: message` 展开，consumer gates 和 archive verification gates 仍使用 `renderEntries`，receipt lines 和 export lines 仍用 `join("; ")` 展示。v2161 没有趁机引入新的 list renderer，也没有把 digest 字段包装成新对象。当前阶段只统一 section 外壳，比过早抽象每一种列表行更稳。

如果局部 hash 未来失败，排查可以按层级走。先比较二级 section 数量是否还是 7，再看三级标题是否还是 handoff notes、consumer gates、archive verification gates 三个。若数量不变，再检查字段顺序和分隔符；若局部 hash 不变但完整 route hash 改了，则问题很可能在 source matrix、route coverage、live-window 或 full renderer 的其他段落。这样的分层排查能避免一上来改 expected hash。

## Safety Boundary / 安全边界与只读性质

v2161 只修改一个 Node 本地 renderer、一个 focused test、census baseline 和版本材料。它没有修改访问控制、approval ledger、credential resolver、runtime execution、route registration 或任何环境变量。测试通过 fixture 和 `app.inject` 覆盖 route-facing 输出，不打开真实端口，不启动 Java / mini-kv，不留下后台进程。`npm run build` 产生的 `dist/` 在收版前删除。

安全边界还体现在展示层不做判断。handoff summary 会展示是否需要 approval、是否需要 routing activation、是否需要 fresh sibling evidence、是否 starts services、是否 mutates sibling state，但 renderer 不根据这些值改变行为。它不是安全门本身，而是审计报告的只读投影。把这个边界保住，能防止 renderer 层逐渐长出第二套治理逻辑。

本版也没有新增截图。没有新 UI、没有新 HTML 页面、没有浏览器行为，也没有 HTTP smoke server。对纯 Markdown renderer 迁移而言，最强证据是局部 hash、完整 route hash、focused route test、census ratchet、typecheck、lint 和 build。额外截图不会提高这类变更的可信度，只会增加无关产物。

另一个安全点是 helper 本身没有被扩展。`renderProfileEntrySections` 仍然不理解 handoff、receipt、archive 或 verification，它只是包装 section。这样 v2161 不会把一个领域文件的需要强加给所有 profile-section renderer。共享 helper 越简单，后续迁移时越容易判断影响面；如果未来真的要支持 optional section 或标准 gate block，那应该单独成版并用现有调用点 hash 证明不破坏输出。

## Test Coverage / 测试覆盖与机械门

新增测试 `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffSummaryRenderer.test.ts` 构造固定 profile，渲染 handoff summary sections 和完整 route markdown。它断言二级 section 数量为 7、三级 heading 数量为 3、首行是 `## Source Matrix Handoff Notes`，并检查 handoff notes、consumer gates、archive verification gates、最终 archive verification section 都存在。最后用 SHA-256 固定局部与完整输出。

focused gate 使用 `npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffSummaryRenderer.test.ts test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test/rendererCensusScript.test.ts --maxWorkers=2`，3 个 test file、4 个测试通过。输出中的 `Renderer census regression: 59 exceeds --max-unstandardized=58` 是反向门预期 stderr，不是失败。

随后执行 `npm run renderer:census -- --json`，得到 245 total、186 standardized、59 unstandardized、remaining shape signals 为 h3 28、forLoop 0、map 70、flatMap 45。`npm run renderer:census -- --max-unstandardized=59` 通过，证明新上限生效。`npm run typecheck`、`npm run lint`、`npm run build` 均通过；lint 仍是既有 0 error / 263 warning。每个门覆盖不同风险，合在一起构成这版的机械 DONE 证据。

这里的测试组合刻意没有跑全量本地 suite，是按当前规则执行：中间 renderer 批次用 focused parity、route 覆盖、census、typecheck、lint、build 收口，完整 suite 交给远端 CI。这样可以避免每一版都被长测试拖住，同时仍保留足够强的局部证据。若远端 CI 对 v2159、v2160 或 v2161 报错，下一轮必须先修 CI，再继续新迁移。

## Maintenance Notes / 后续维护提示

v2161 之后，controlled read-only shard preview 的 source matrix、handoff summary、route coverage、live-window 四块主要 route-facing section 已经完成统一外壳迁移。剩下同领域候选主要是 execution readiness、live read-only window rehearsal 和 full preview renderer；它们不一定都适合 `renderProfileEntrySections`，需要先看是 route section 片段，还是独立完整 Markdown 文档。不要因为名字相邻就机械迁移。

后续迁移应保持三个标准。第一，候选文件必须有真实重复结构或列表展开，不拿 composition-only 文件凑数。第二，必须能用固定 fixture 锁住局部输出和上层 route 输出。第三，讲解要能说明这个版本降低了哪类维护成本。如果三点说不清，说明该切片太薄或方向不对，应重新选目标。

handoff summary 这版还说明，统一 helper 不等于隐藏业务链条。新文件仍然能按 notes、summary、consumer、export、receipt、archive、verification 的顺序阅读，只是少了重复的 `##` 和尾部空行模板。理想状态不是让 renderer 变得“短到看不见业务”，而是让排版噪音退后，让业务字段更容易被复核。

v2162 的候选最好不要直接处理前三个 composition-only 文件。更合适的是 controlled read-only execution readiness 或 live read-only window rehearsal 这种仍带有真实 `map` / `flatMap` 和多段 Markdown 的文件。不过这两类可能是独立完整 Markdown 文档，而不是 route section 片段，迁移前要先判断应走 `renderProfileEntrySections` 还是更适合全文档 report helper。先做这个判断，比盲目套用同一个 helper 更稳。

还有一个后续维护点：handoff summary 的 section 命名现在和 source matrix / route coverage 一样，保持了 `Source Matrix ...` 前缀。这个前缀虽然长，但它把段落归属说得很清楚，后续不要为了“标题短一点”在 renderer 迁移批次里改名。标题是用户可见输出，改标题就是行为变化；如果确实要做文案压缩，应该单独成版并重新评估 route 文档、归档说明和 hash 期望。

最后，v2161 的收口方式可以作为这一小批 controlled read-only section 的复核模板：先取 pre-hash，迁移为 heading/lines，立即验证局部和完整 hash，再补 focused test、census、类型、lint、build、归档和中文讲解。这个顺序能减少“先写一堆材料，最后发现 hash 不等价”的返工，也能让每一步失败时定位更明确。

这样后续版本即使继续加速，也不会牺牲证据链的清晰度。

复核时优先看输出证据，再看代码形状，顺序不能倒过来。

这能防止重构解释盖过真实行为验证。

稳妥优先。

## One-sentence Summary / 一句话总结

v2161 把 controlled read-only shard preview 的 handoff summary 承接链迁移到统一 profile-section 外壳，并用局部/完整双 hash、census ratchet、typecheck、lint 和 build 证明这次重构没有改变 route-facing Markdown 或跨项目契约。
