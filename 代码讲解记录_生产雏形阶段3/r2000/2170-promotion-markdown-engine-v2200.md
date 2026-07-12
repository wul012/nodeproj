# v2200 代码讲解：把十五份 promotion 排版收回一个可证明的语法内核

## Goal and non-goal / 目标与非目标

本版的目标不是增加一条运营报告，也不是重新设计 promotion 流程，而是消除已经存在于 archive 与 handoff Markdown 输出中的结构性重复。迁移前，`opsPromotionArchiveBaseRenderers.ts` 与 `opsPromotionArchiveHandoffRenderers.ts` 合计超过一千行，十五个公开函数都自行拼接一级标题、字段、章节、列表项、空行和结尾换行。任何统一格式修正都需要人工搜索多个函数，而且同一种附件结构分别以 package、certificate、receipt、closure 的名字复制。v2200 要把这些真正相同的行为集中起来，同时删除两个内部模块，使 `src/services:renderers` 的成员数与长命名债在同一提交中下降。

非目标同样明确：不更改路由、不改 JSON 数据、不调整字段标题或顺序、不重写 fixture、不改变摘要算法，也不借机整理 release/deployment renderer。公开导出名称虽然很长，但它们已经是调用契约；本版只消除它们在内部模块与稳定 barrel 中的重复登记，不把稳定名称改短。若抽象只能增加跳转、不能删除成员与格式代码，按计划必须撤销，而不能以“以后可能复用”为理由保留。

## Entry Points / 入口与公开路径

运行时入口仍是 `src/routes/opsPromotionArchiveRoutes.ts`。路由表把十五条 archive/handoff Markdown 请求分别交给十五个 renderer，路径和选择函数均未修改。服务层入口仍是 `src/services/opsPromotionArchiveBundle.ts`，它继续从 `opsPromotionArchiveRenderers.ts` 统一导出创建器调用方需要的函数。因此使用方看见的模块路径、函数名和 TypeScript 参数类型与 v2199 完全相同。

变化只发生在稳定入口之后。过去 `opsPromotionArchiveRenderers.ts` 是一个二次导出清单，真正实现藏在 base 与 handoff 两个内部文件里；现在十五个函数直接定义在这个稳定文件中，release/deployment 的导出块仍原样指向原模块。仓库搜索证明没有源码或测试直接导入被删除的两个内部路径，所以删除的是实现细节，不是公共入口。历史文档仍可描述旧拆分过程，但运行代码不再需要维护三层跳转。

## Response Model / 响应模型与字节语法

每个 renderer 的输入仍是强类型业务对象，例如 `OpsPromotionHandoffReceipt`。公开函数先把对象映射成两类数据：顶部字段数组，以及按顺序排列的章节数组。字段是“标签、值”二元组；章节是“标题、正文行”二元组。`promotionMarkdownEngine.ts` 不认识 receipt、certificate、archive 或 approval，它只认识这两种最小结构，因此业务字段是否存在、取哪个嵌套属性、出现在哪个章节，仍由公开函数显式决定。

engine 的输出规则只有六项：一级标题前加 `#`；字段前加 `-`；章节标题前加 `##`；命名项前加 `###`；项目动作前加 `-`；所有行最终用单个 `\n` 连接。文档标题后、字段组后、章节标题后和章节末尾各放置既有空行。命名项自身也保留末尾空行，所以它位于章节末尾时会与下一章节之间形成原实现已有的两条空行记录。这个细节看似微小，却直接影响响应字节与摘要，因而由 engine 单测锁定，而不是依赖肉眼判断 Markdown“看起来差不多”。

## Upstream Evidence And Config / 上游证据与配置

本版不读取 Java 或 mini-kv 的新产物，也不依赖它们提供批准。版本边界复核显示 Java 的最新已提交状态仍是 v1862，另一个会话正在处理未提交的 v1863，因此尚未触发跨项目 capstone；mini-kv 也没有成为 Node 的前置阻塞。两个项目均可继续并行，Node 只消费自身构造出来的 promotion 对象。

配置边界也没有扩张。字节门通过 `loadConfig` 仅设置静默日志，并用只替换 `Date` 的固定时钟稳定 `generatedAt`；它没有开启上游动作、真实执行或写入能力。v2199 的 Node Evidence 流水线运行 `29189927574` 已经绿色完成，为本版提供干净父提交证据。与 Java 简报有关的工作区改动属于其他会话，始终保持未暂存且不进入本版提交。

## Service Flow / 服务流程与调用链

一次 `/api/v1/ops/promotion-archive/handoff-closure?format=markdown` 请求先进入 archive 路由注册表。路由依赖创建完整 promotion artifact 链，从 archive bundle、manifest、verification、attestation、handoff package、certificate、receipt 一直得到 closure；这些 builder 与摘要计算均未改动。选择函数取出 closure 后调用 `renderOpsPromotionHandoffClosureMarkdown`。

该公开函数按原顺序读取 service、generatedAt、五个对象名称、state、valid、handoffReady、七组摘要以及 covered fields，形成顶部字段。随后形成 Decision、Verification、Closure Items、Next Actions 四个章节。普通字段交给 `renderMarkdownFields`，动作交给 `renderMarkdownBullets`，closure items 交给 `renderSimpleItems`；后者再调用通用 `renderMarkdownItems` 添加三级标题和字段前缀。最后 `renderMarkdownDocument` 只负责把标题、字段和四个章节按既有空行规则连接。响应再由路由层原样发送，过程中没有重新排序、标准化换行或修改值。

verification 路径与此类似，但附件类条目多一组 matches 字段和一对原始/重算摘要。`renderCheckedItems` 接收摘要标签及取值函数，因此 package、certificate、receipt、closure 可以共享 Valid、Valid matches、Source matches、Digest matches、Recomputed digest、Source 的固定结构，同时保留各自的 `Package digest`、`Certificate digest` 等准确文字。completion step 因为多出 Ready 与 Detail 语义，使用独立小助手，没有被强行塞进普通附件模型。

## Abstraction Boundary / 抽象边界为何放在这里

这次提取没有采用“字段路径字符串 + 反射取值”的万能配置。那种方案虽然能进一步压缩行数，却会把类型错误推迟到运行时，还会让维护者无法直接从函数中看见 `verification.checks.closureItemsValid` 对应哪个输出标签。当前方案让 TypeScript 在每个公开函数里检查真实属性，engine 只处理已求值的标签和值。数据与行为的边界因此很窄：稳定模块拥有领域顺序，engine 拥有 Markdown 标点。

同理，engine 没有负责摘要策略。它的 `formatMarkdownDigest` 仅把已经给出的 algorithm 与 value 用冒号连接；archive summary 中明确固定为 `sha256:` 的字段仍在调用方写出。`optionalMarkdownValue` 只把 null 或 undefined 映射为旧文本 `none`，不会错误地把 false 或 0 当成缺失值。直接测试专门覆盖 false 与 0，防止日后有人用逻辑或运算符简化后破坏合法数据。

## Maintainability / 文件尺寸与可读性

迁移后的 engine 只有 47 行，能够一次读完；稳定 renderer 文件为 742 行，低于 800 行硬门。虽然 742 行仍不算小，但它集中的是十五个同一公开入口下的字段表，而不是十五套排版算法。继续拆成第三个 `*Renderers.ts` 文件会让家族数量回升，也会重新产生跨文件导出债，因此本版没有为追求表面短文件而拆散数据。

稳定文件底部的结构接口只描述四种真实形状：普通证据项、带匹配结果的证据项、completion step、带匹配结果的 completion step。它们避免导入十余个只在字段结构上相同的具体 item 类型，又没有使用 `any`。公开函数参数仍保留完整领域类型，结构接口只在私有助手边界上发挥作用。这样既降低导入噪声，也不牺牲调用方类型信息。

## Ratchet Effects / 机械收紧结果

迁移前 elegance baseline 记录 4,549 个超预算名称，其中 3,565 个是导出名；`src/services:renderers` 有 8 个成员，services 目录有 1,125 个 TypeScript 文件。删除两个内部模块并新增一个非 renderer engine 后，超预算名称降到 4,538，导出债降到 3,554，renderer 家族降到 6，service 文件降到 1,124。新 engine 的文件名和全部导出都在 40 字符预算内，也没有形成第三个 engine 家族。

这些数字不是说明文档里的手算结果。`npm run elegance:census -- --json` 先在旧 baseline 上报告一个 shrink 家族与一组 shrink name debt，且没有 new/grown family；确认结果后才执行 `--refresh-baseline`。刷新后的 census 与 `npm run elegance:families -- --json` 都返回 ready。baseline 因此只向更小值移动，下一版若重新引入两个 renderer 或长导出会立即失败。

## Byte Parity / 字节等价证明

最关键的证据不是“测试仍然绿”，而是迁移前后每个响应的完整字节一致。为避免在新实现完成后倒推一个有利期望，本版先在 v2199 旧源码上新增 `promotionRendererParity.test.ts`，固定时间为 `2026-07-12T10:00:00.000Z`，依次请求十五个 Markdown 路由，并记录每个 raw payload 的字节长度与 SHA-256。旧实现先通过这组刚冻结的常量，之后才删除文件和引入 engine；迁移完成后同一测试再次全部命中。

这组门同时覆盖空 archive、manifest、archive verification、attestation 及其 verification、package/certificate/receipt/closure/completion 与各自 verification。长度从 archive 的 679 字节到 closure verification 的 3,960 字节不等，既包含空证据回退，也包含多项附件与重算摘要。任一标签大小写、字段顺序、空行数量、结尾换行或动态时间漂移都会同时改变长度或散列，测试不会只检查几个 `contains` 片段。

## Portability / mixed、LF 与 CRLF 复核

仓库规则要求任何字节 oracle 触达都在 push 前完成 mixed、LF、CRLF 三种物化。mixed 使用当前 Windows 工作区；LF 与 CRLF 使用 index 生成的不移动分支 commit-tree 创建独立 detached worktree，并分别设置 checkout 行尾策略。三处都运行 engine 直接测试与十五路由摘要门，结果均为 2 个文件、3 项测试通过。EOL 证据分别是 mixed `w/lf`、LF `w/lf`、CRLF `w/crlf`，证明 CRLF 物化确实生效，而不是重复跑了同一工作区。

临时 worktree 位于明确的 `.tmp` 子目录，没有创建 `node_modules` junction；测试后已通过 `git worktree remove` 和 prune 清理。三种物化全部命中同一组 v2199 响应摘要，因此 v2200 达到 push 前 portability 条件。若未来其中一处失败，仍应先检查固定时钟、fixture 原始字节与 checkout filter，而不是修改生产 renderer 做换行归一化。

## Safety Boundary / 安全与兼容边界

本版没有改变任何 Fastify route、Content-Type、鉴权 header、状态码或 JSON 结构；没有读取凭据、启动 Java、调用 mini-kv、写入外部状态，也没有变更 historical fixture。被删除文件的直接导入搜索结果为空，稳定 barrel 与 bundle 的导出路径继续存在。release/deployment renderer 只在文件尾保留原二次导出，没有被 engine 扩大处理范围。

既有测试期望没有为迁移而修改。新增摘要常量是在旧实现上生成并先行通过的，因此其角色是不可移动的旧版契约，而不是新实现自证。若 parity 失败，处理顺序是定位字段或分隔符差异、修正实现、重跑旧常量；禁止更新摘要来接受新字节。截图不属于有效证据，因为此次没有 HTML、页面布局或可视交互变化，强行创建图片只会增加归档噪声。

## Test Coverage / 测试覆盖与最终门

底层测试 `promotionMarkdownEngine.test.ts` 精确锁定文档标题、字段、章节、命名项、双空行、动作列表与最终换行，并覆盖 digest、undefined、false、0。路由字节测试锁定十五个完整响应。promotion 专项批次包含 archive、approved、package、certificate、receipt、closure、completion、release/deployment boundary 等 22 个测试文件，证明稳定导出与构建链没有断裂。

最终版本门在讲解完成后执行。TypeScript typecheck、lint、security scan、renderer census、elegance census、family logic census、source-size、archive budget、文档质量与 build 全部通过；lint 为 0 error / 180 个既有预算 warning。全量 Vitest 的 JSON 报告记录 1,137/1,137 suites、1,712/1,712 tests、0 失败、0 pending。由于运行时 renderer 发生变化，push 后还由现有远端 safe smoke 复核，不能沿用 v2199 的“不适用”结论。

## Failure Lookup / 失败时怎样定位

若 TypeScript 报错集中在 `renderCheckedItems`，先比较具体 verification item 是否具备 common matches 字段，再检查传入的摘要取值函数；不要放宽成 `any`。若 engine 单测失败，按标题、字段、item 末尾、section 末尾四层空行逐项数数组元素。若某个 route digest 独立失败，用测试输出的路由名定位对应公开函数，再把旧文件的字段顺序与当前二元组逐行对照。

若 elegance census 失败，先区分 new family、grown family、name count growth 与同数异 digest；本版预期只允许 baseline 已刷新后的零差异。若只有 LF 或 CRLF worktree 失败，检查该 worktree 的 `git ls-files --eol` 与固定时钟，确认不是 checkout 配置没有生效。若全量测试超时，按仓库规则先单跑失败文件和相关组，不能通过放宽业务断言掩盖。若远端 CI 红于 portability，本版视为 closeout 违规，必须修复后再进入 v2201。

## Stop Condition / 停止条件与下一版边界

v2200 的停止条件是：十五路由字节摘要在 mixed/LF/CRLF 全部一致；renderer 家族、服务文件数和名称 baseline 同版下降；全部本地门通过；提交、标签和 push 完成；远端 CI 至少启动。它不会顺手处理 summary、release 或 deployment。下一版 v2201 只处理已选定的 readiness summary 家族，并保留 V6 至 V13 的直接模块路径。

如果 Java 在 v2200 版本边界已经达到计划最终状态，Node 必须暂停并切换 capstone；否则继续 v2201。完成 v2201 后，无论还发现多少相似家族，都按 Round 2 三版本上限硬停，交给外部评审判断抽象是否真的比原结构更清楚。

## One-Sentence Summary / 一句话总结

v2200 用一个不懂业务的 47 行 Markdown engine 替代两份内部排版实现，在保留十五个稳定公开函数和全部响应字节的同时，真实删除 renderer 家族成员、服务文件与长命名债。
