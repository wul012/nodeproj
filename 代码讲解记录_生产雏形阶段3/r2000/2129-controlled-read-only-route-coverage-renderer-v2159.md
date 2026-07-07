# v2159 代码讲解：把 route coverage 手写 section 收进统一 profile renderer

## Goal and Non-goal / 目标与非目标

v2159 是 N1 renderer consolidation 的下一块实质切片，目标是迁移 controlled read-only shard preview 里的 route coverage section renderer。这个文件过去并不承担业务计算，它的主要职责是把 profile 中已经算好的 handoff route coverage、archive snapshot、summary receipt 和 verification gate 逐段排成 Markdown。问题在于这些段落虽然结构稳定，却一直以手写数组的方式存在：每一段都重复写 `##` 标题、`renderEntries` 结果、必要的 `###` 小标题和尾部空行。重复外壳多了以后，reviewer 每次读 diff 都要先确认“这次到底改了业务字段，还是只是在复制同一种 Markdown 包装”。本版把这些包装统一交给 `renderProfileEntrySections`，让文件更像一张清晰的 section 数据表。

本版的非目标同样明确：不改 route 注册，不改 JSON 响应，不改 schema，不改 profile loader，不改 Java 或 mini-kv 的证据来源，也不允许打开真实执行。它不是一次功能扩展，也不是为了让 report 文案变漂亮而重排输出；它只处理 renderer 结构重复这一类维护成本。完整 route markdown 的 hash 保持不变，是本版能进入计划书 N1 的核心证据。如果未来某个业务版本需要新增 route coverage 字段，那应该在业务版本里单独说明字段来源和审核含义，而不是把这次纯迁移作为顺手修改输出的机会。

选择 route coverage 作为 v2159 的目标，也是在避开“为了数量迁移 composition-only 文件”的陷阱。它不是简单调用几个子 renderer 的薄包装，而是自己持有一组可审计字段和多个 verification gate。这样的文件迁移后，代码可读性会真实提升：阅读者不必再在一串手写字符串里数空行，而是能从 section 数组的名字直接看出报告结构。计划书要求 N1 后半段要有机械证据和维护价值，本版正好同时满足这两点。

## Entry Points / 入口与路由关系

本版的直接入口是 `renderControlledReadOnlyShardPreviewHandoffRouteCoverageSections(profile)`。上层 `renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown(profile)` 会把它返回的 `string[]` 插入完整 controlled read-only shard preview Markdown 中，HTTP route 再把同一个 profile 暴露为 JSON 或 Markdown。换句话说，这个函数虽然不是 route handler，却处在用户可见 Markdown 的中间层：它输出的每一行都会出现在 `/api/v1/audit/...controlled-read-only-shard-preview...?format=markdown` 一类 route-facing 报告里。

迁移前，函数内部依次手写 8 个二级 section：route coverage、route coverage verification、archive snapshot、archive verification、archive summary、summary receipt、summary receipt archive snapshot、summary receipt archive verification。其中 verification 类段落包含 3 个三级 gate 小标题。迁移后，入口仍然返回同样的数组，只是把每个 section 写成 `{ heading, lines }`。`heading` 不再包含 `## ` 前缀，`lines` 仍然由原来的 `renderEntries(...)` 和固定的 `###` gate 标题组成。这个形状让 reviewer 能直接看到每段标题对应哪组 profile 字段，也能快速确认没有把上层 route 的其他章节混进来。

这个入口和 v2158 的 live-window renderer 有一个重要差别：live-window 更像连续的二级章节清单，而 route coverage 同时包含二级章节和嵌入的三级 gate。v2159 证明 `renderProfileEntrySections` 并不是只能处理最平整的章节，它也可以保留 section 内部的固定小标题，只要这些小标题属于 lines 的一部分。这个边界很实用，因为后续剩余 renderer 里仍有一些“二级标题包若干检查项”的形状；它们不需要新建专用渲染器，只要先确认小标题位置和空行规则能被 byte-identical 保存。

## Response/Data Model / 响应与数据模型

输入模型仍是 `ControlledReadOnlyShardPreviewProfile`，本版关注的是其中 route coverage 相关的预计算对象，而不是重新计算覆盖率。renderer 读取的字段包括 source matrix handoff route coverage、verification gates、archive snapshot、archive summary、receipt 和 receipt archive verification。每个字段都已经由上游服务准备好，renderer 只负责把键值对展开为 `- key: value` 形式。布尔值、digest、计数、路径和状态字段的格式化仍由既有 `renderEntries` 完成，因此 `undefined`、字符串和对象值的展示规则没有变化。

输出模型是 `string[]`，不是一个结构化 JSON 对象。这个细节很重要，因为本版验证的是 Markdown 字节等价，而不是 TypeScript 类型是否仍然能编译。迁移后 route coverage section 的 `sections.join("\n")` hash 仍是 `ee09a0d002941c3a162823e0edc380c13168b154cd2bd8bf7c0b6510ebc72154`，长度仍是 8385；完整 route markdown hash 仍是 `a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d`，长度仍是 81829。只要标题顺序、空行、三级 gate 标题或任一字段顺序发生变化，这两个 hash 就会立刻变动，所以它们比简单的 `contains` 断言更能约束迁移质量。

从数据责任看，renderer 不应该解释这些字段为什么为真，只应该如实呈现 profile 给出的结果。例如 archive snapshot 是否存在、summary receipt 是否可复核、verification gate 是否通过，都是上游 profile 构造阶段的判断。renderer 如果在这里重新推导状态，就会把展示层变成第二套业务规则，未来两套规则可能互相漂移。本版保留 `renderEntries` 的直接展开方式，就是为了让展示层保持薄而透明：输入是什么，输出就是什么；字段顺序由当前文件显式声明，格式细节由共享工具统一处理。

## Upstream Evidence / 上游证据与配置边界

本版测试使用 `loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview` 和 `controlledReadOnlyShardPreviewServiceFixtures` 构造固定 profile。Java 和 mini-kv 在这个测试场景里都是 fixture 化输入，不启动真实服务，也不读取新的 sibling workspace 文件。这样做符合计划书对 renderer 批次的要求：renderer 迁移必须先证明本地固定证据下输出不变，不能依赖正在变化的上游项目状态来解释 hash 差异。Java / mini-kv 可以继续并行推进，因为 v2159 没有要求它们提供新版本证据，也没有修改共同 contract。

这里还要区分“使用上游证据形状”和“消费新上游证据”。route coverage section 的文本里会出现 Java、mini-kv、handoff、archive、verification 等词，但这些只是 profile 中已有证据的展示结果。本版没有打开 `UPSTREAM_ACTIONS_ENABLED`，没有把 historical fallback 改成 live read，也没有把任何 approval 或 credential 值写回外部系统。若后续进入真实联合执行，Node 需要另起 integration capstone，把 Java jar、minikv CLI、端口、清理责任和失败条件写清楚；v2159 不提前跨过那条线。

这条边界也避免了跨项目协作中的误会。Java 和 mini-kv 看到 Node v2159 时，不需要为了这版提供新的 receipt、jar、CLI 输出或批准材料；它们可以继续自己的计划书收尾。Node 在这里消费的是 frozen fixture 形状，而不是新鲜 runtime 事实。等系统真的要进入 live integration，计划书会要求 one command readiness 报告和 no-write boundary 证明，那时才需要三项目共同进入同一个验收窗口。

## Service Flow / 服务流程与等价路径

运行路径可以分成四步。第一步，测试或 route 构造 `ControlledReadOnlyShardPreviewProfile`，其中 route coverage 相关对象已经具备 ready、documented、archived、verified 等状态字段。第二步，route coverage renderer 把这组对象变成 8 个 section 描述，每个描述只说明标题和行内容。第三步，`renderProfileEntrySections` 统一负责加 `##`、展开 lines、追加 section 尾部空行。第四步，上层 full renderer 把这 8 个 section 与 source matrix、live-window、blocker、warning、recommendation、endpoint、next action 等其他章节拼接成完整 Markdown。

这个流程说明本版为什么不需要新 helper，也不需要继续拆成更多文件。重复点不是字段计算，而是 Markdown section 外壳；已有的 `renderProfileEntrySections` 正好覆盖这类外壳。如果为 route coverage 再新增一个专用 builder，反而会制造新的维护面。迁移后的代码把业务字段留在原文件内，把通用排版交给共享 helper，抽象边界比较干净。reviewer 读 diff 时只需要确认原先 8 段的标题、字段组、三级 gate 标题和顺序都搬入了 section 数组，而不用逐行比对重复的空行模板。

如果后续有人要调试 route coverage Markdown，建议先从完整 route 测试定位到局部 section hash，再打开本文件查看 section 数据表。这样的排查路径比旧结构短：旧结构里标题、字段和空行混在一个长数组中，读者很容易把排版噪音当成业务变化；新结构里 heading 和 lines 分开，只有 lines 里的 `renderEntries` 参数才代表真正的领域字段。这个可读性收益不会出现在运行指标里，却会直接减少后续迁移和 review 的人力成本。

## Safety Boundary / 安全边界与只读性质

v2159 只触及一个 service renderer、一个 focused test、census baseline 和版本材料。它没有修改认证头、访问守卫、approval ledger、credential resolver、real-read switch、runtime shell 或任何启动脚本。测试中的 route case 仍通过 Fastify `app.inject` 和 mock fixture 验证响应，不打开生产端口，也不留下后台服务。构建生成的 `dist/` 只是验证产物，收版前会删除；本版没有新增浏览器页面或需要截图的 UI，因此不写 `d/2159/图片`。

安全边界还体现在 hash 的使用方式上。hash 在这里是 migration parity guard，不是永久冻结业务输出的产品承诺。只要本版声称“只迁移 renderer 外壳”，hash 就必须不变；如果未来业务真的新增 route coverage 字段，应该在新的版本里更新测试期望，并用变更说明解释新增字段的来源、顺序和审核意义。不能因为 hash 测试严格就删掉它，也不能在没有业务说明的情况下随手改 expected hash。这个边界能防止 N1 后半段退回到“看起来差不多”的人工判断。

另一个安全点是本版没有扩展共享 helper 的能力。`renderProfileEntrySections` 仍然只做三件小事：加二级标题、展开 lines、补 section 尾部空行。它不会根据 profile 状态隐藏章节，不会改变 `renderEntries` 的值格式，也不会替调用方决定 gate 是否通过。共享函数越克制，迁移风险越低；调用方只把重复排版外包出去，领域语义仍留在原来的业务 renderer 中。这种克制比“顺便做一个更智能的报告 builder”更适合当前的 byte-identical 收敛阶段。

## Test Coverage / 测试覆盖与机械门

本版先跑 focused gate：`npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageRenderer.test.ts test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test/rendererCensusScript.test.ts --maxWorkers=2`，结果 3 个 test file、4 个测试全部通过。新增测试同时断言局部 section hash、完整 route markdown hash、8 个二级 section、3 个三级 gate、首段标题、summary receipt 段落和最后空行。这样既有字节级等价，也有可读的结构提示，失败时不会只给 reviewer 一个难懂的 digest。

随后执行 `npm run renderer:census -- --json` 得到 245 total、184 standardized、61 unstandardized、remaining shape signals 为 h3 38、forLoop 0、map 75、flatMap 46。再执行 `npm run renderer:census -- --max-unstandardized=61`，证明当前树满足新基线。`test/rendererCensusScript.test.ts` 还保留反向门，故意用 `--max-unstandardized=60` 触发 `Renderer census regression: 61 exceeds --max-unstandardized=60`，说明 ratchet 不是摆设。最后 `npm run typecheck`、`npm run lint`、`npm run build` 均通过；lint 仍是既有 0 error / 263 warning。

如果这类测试未来失败，排查顺序应该从最便宜的证据开始。先看局部 section hash 是否变了：如果局部变而完整也变，通常是当前 renderer 的标题、空行或字段顺序被动过；如果局部不变但完整变了，问题更可能来自上层 full renderer 或其他 section。再看 census 是否回退：如果标准化数量下降，说明文件可能丢失共享 helper 标记或脚本识别规则被改坏。最后才看 typecheck、lint、build，这三者负责语法和工程完整性，却不能单独证明 Markdown 输出等价。

## Maintenance Notes / 后续维护提示

v2159 之后，renderer census 已经推进到 184/245，未标准化文件剩 61。下一批不应盲目追求数量，而应该继续挑选真正包含 section 外壳、字段映射或列表展开逻辑的 renderer。纯粹拼接子 renderer 的 composition-only 文件更适合进入 waiver 或后续合并策略，不值得为了数字硬塞 marker。route coverage 这一版的价值在于它既有多段重复结构，又有三级 gate 小标题，足以证明 `renderProfileEntrySections` 可以承载比普通二级 section 更复杂一点的固定内容。

维护者复核本版可以走三步。先看 diff，确认旧的 8 段手写数组只是被改写成 `heading/lines` 数据表，字段没有改名也没有重排。再跑新 focused test，确认局部 section 与完整 route markdown hash 都保持不变。最后跑 census gate，确认标准化数量从 183 增至 184，未标准化数量从 62 降至 61，并且反向门仍会失败。三步都成立时，本版就是一次可收口的结构迁移，而不是把真实行为藏进重构里的功能变更。

这一路线也给后续版本一个尺度：每一版都要能说清“维护成本从哪里来、共享 helper 解决了哪一层重复、输出等价由什么机械证据证明”。如果一个候选 renderer 无法自然写出这样的解释，说明切片可能太薄，应该合并到更大的批次，或者先做拆分准备。计划书要求的是生产前治理型工程，不是把文件名逐个扫过；因此 v2159 的收获不仅是一个数字下降，更是把 route-facing Markdown 迁移的复核范式继续固定下来。

下一批候选可以优先从仍带有真实 `.map` 或 `.flatMap` 展开的文件里挑，而不是追着文件名相邻顺序走。若某个 renderer 只是把三个已迁移子 renderer 拼在一起，它的最佳处理可能是 waiver、命名合并或上层聚合调整；若某个 renderer 自己维护多组标题和字段清单，就适合继续按 v2159 的方式迁移。这个筛选标准能让后续版本保持“少一点形式主义，多一点工程收益”，也符合用户要求的中大版本工作量和讲解质量。

## One-sentence Summary / 一句话总结

v2159 把 controlled read-only shard preview 的 route coverage 手写 section 迁移到统一 profile-section renderer，并用局部与完整 Markdown 双 hash、census ratchet、typecheck、lint 和 build 证明这次重构只降低维护重复，没有改变任何用户可见输出或跨项目契约。
