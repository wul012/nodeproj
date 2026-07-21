# Node v2229：promotion 链尾的类型化规格与共享 stage

## 一、为什么 v2228 做完后 promotion 家族仍不能算收口

v2228 把 archive、manifest、attestation 和 handoff package/certificate/receipt/closure/completion 十五个公共 renderer 变成了稳定入口、文档规格与 Markdown engine 三层，原 742 行文件降为 151 行。然而 family census 仍报告 `src/services:renderers` 有 1,110 行格式逻辑，说明问题并没有随一个近限文件退出账本而结束。剩余大头位于链尾三个模块：release evidence/archive 约 319 行，deployment approval/change 约 339 行，deployment execution record/receipt 约 373 行。它们各自直接建立 `lines` 数组，重复一级标题、metadata、Decision、Verification、Items、Summary、Next Actions、三级 item 和 digest 显示。

这些模块形成于不同功能版本，所以单看每一份都能理解；把三份并排后，结构相似度已经超过 rule-of-three 的停止线。继续逐文件“整理排版”只会让相同语法以更工整的形式复制三次。v2229 的目标不是删除几个空行，而是让全部 28 个 promotion artifact 使用同一种表达边界：领域 builder 产生对象，spec 显式描述展示数据，engine 负责固定文法，稳定 renderer 只连接两者。完成条件是所有输出字节不变，并且 family logic 低于九分终局门的 700，而不是仅让文件看起来更短。

## 二、链尾十二个文档的输入、响应模型和输出是什么

本版迁移十二个函数。release 层包含 evidence、evidence verification、archive、archive verification；approval/change 层包含 deployment approval、approval verification、change record、change verification；execution 层包含 execution record、record verification、execution receipt、receipt verification。第十三个链尾入口是 release audit trail，它在早期版本已经使用标准 verification report builder，本版只通过总 oracle 复核，不重复改写。

每个普通 artifact 的输入是前一层领域 builder 已经计算完成的只读对象。对象包含 lineage 名称、state、valid、handoff/approval/change/execution/receipt readiness、多个 digest、decision 摘要、verification 摘要、item 列表和 next actions。verification artifact 再包含 recomputed digest、逐项 match checks 与 summary。renderer 的输出只有 Markdown 字符串；它无权修改对象、重新计算 digest、决定 readiness、访问网络或执行部署。v2229 迁移的正是“对象如何按固定顺序展示”这一层，不是 production execution 能力。

## 三、第三个相似实现出现前为什么必须先抽 stage

v2228 的 `handoff.ts` 已经有 decision、summary、simple item、checked item helper。若 v2229 在 release、approval 和 execution 三个文件里各复制一套 detail item 展开，即使稳定 renderer family 数字下降，bounded context 内仍会存在第四套相同语法。这会违反“第三个结构相似文件先停下建 engine”的规则，也会让以后修改 `Detail matches` 顺序时需要同时改三处。

因此本版先新增 110 行 `promotionMarkdown/stage.ts`。它提供六种小而明确的结构：`decisionLines` 固定 total/latest id/latest outcome；`summaryLines` 固定 total/latest id 前缀，并要求调用方显式提供其余有序字段；`simpleItemLines` 与 `checkedItemLines` 服务 handoff；`detailItemLines` 与 `checkedDetailLines` 服务 release/deployment。handoff 随即迁移到这些 helper，删除本地重复定义，文件从约 566 行降为 505 行。共享不是只面向新代码，旧的第二份实现也一起回到同一事实源。

## 四、stage 共享了什么，又刻意拒绝共享什么

stage 共享的是 Markdown 结构：字段前缀、可选 decision 值显示为 `none`、item 的三级标题、valid/digest/source/detail 顺序，以及 verification item 的 valid/source/detail/digest matches 与 recomputed digest 顺序。它接收 `MarkdownDigest` 和几个结构接口，TypeScript 会检查调用方对象至少具有所需字段。`checkedDetailLines` 的领域 digest 通过类型化 selector 传入，例如 release evidence 选择 `item.evidenceDigest`，change record 选择 `item.changeItemDigest`，execution receipt 选择 `item.receiptItemDigest`。

stage 刻意不共享标题、lineage 字段、readiness 字段、checks 列表、summary 的领域顺序、item heading 和 digest label。它也不接受诸如 `"verification.checks.foo"` 的字符串路径，不把对象转成 `Record<string, unknown>`，不根据 artifact 名称走 switch。这样公共层不会成为动态模板语言。代码审查者进入某个 spec 时，仍能逐行看到 `Approval ready` 位于哪里、`Closeout ready` 在 summary 的最后、某个 check 读取哪个明确属性；共享 helper 只消除语法骨架，不吞掉领域含义。

## 五、release spec 如何表达 evidence 到 archive 的递进

`release.ts` 只有四个规格函数。`releaseEvidenceSpec` 保留 evidence、completion、closure、receipt、certificate、package、archive 的 lineage，随后展示 handoff 状态和五个 digest。Decision 使用 stage 的共同三项；Verification 仍显式列出 completion verified、digest valid、steps valid、closure reference、closeout ready 与两个计数；Evidence Items 使用带 detail 的普通 item；Next Actions 使用 engine 的 bullet helper。

verification 规格的 metadata 保留 evidence digest 与 recomputed digest，Checks 逐项列出名称匹配、状态匹配、completion/closure digest 匹配、decision/verification/next actions 匹配。item helper 只负责每项共同布局，领域 selector 明确选择 evidence digest。Summary 显式给出 evidence item count、handoff ready、closeout ready。archive 两个规格沿用同一模式，但字段、check 名与 item digest 改为 release archive 领域。四个函数没有因为结构共享而合并成一个接受几十个可选参数的万能函数。

## 六、approval 与 change 为何放在同一规格模块

approval 是 release archive 进入部署治理链的第一步，change record 又直接消费 approval，因此两者共享同一 lineage 和 readiness 前缀。`approval.ts` 将四个规格放在一起，使维护者可以从 approval normal/verification 顺序阅读到 change normal/verification。普通 approval 展示 handoff ready 与 approval ready；change 再增加 change ready。两者各自显式保留上游 digest、verified digest、covered fields、verification 计数和 item heading。

共享 stage 并没有把 approval item 与 change item混为一类。普通 item 都具备 valid/digest/source/detail，所以复用 `detailItemLines`；verification item 的领域摘要不同，approval selector 读取 `approvalDigest`，change selector 读取 `changeItemDigest`，标签也分别是 `Approval digest` 与 `Change item digest`。Summary 的 readiness 阶梯按原顺序逐级增长：approval 为 handoff/approval/closeout，change 为 handoff/approval/change/closeout。任何顺序变化都会被完整字节 oracle 抓住。

## 七、execution record 与 receipt 如何保留更长的 readiness 阶梯

`execution.ts` 处理 execution record 和 execution receipt。record metadata 在 change/approval/release lineage 之后增加 execution ready，receipt 再增加 receipt ready，并把上游 handoff receipt 命名为 `Receipt record name`，避免与当前 execution receipt 的 `Receipt name` 混淆。这两个标签看似接近，却属于既有公共 Markdown 合同，规格中必须原样、按原顺序保留。

record verification 的 Checks 有 execution 名称、change record、approval、release archive、完整 lineage、四级 readiness、change/verified change/approval/release digest 以及 decision/verification/next actions。receipt verification 再增加 receipt record 名称、receipt ready 和 verified execution digest。把它们留在各自 277 行以内的规格模块，比动态生成“所有可能 readiness 字段”更冗长一点，却换来完整的局部可读性和类型提示。公共 helper 只展开 item，共享不越过领域边界。

## 八、三个 37 行稳定模块有什么价值

旧模块路径被测试和仓内 barrel 直接导入，删除它们会制造无必要的迁移噪声。v2229 因此保留 `opsPromotionReleaseArchiveMarkdownRenderers.ts`、`opsPromotionDeploymentApprovalChangeMarkdownRenderers.ts` 和 `opsPromotionDeploymentExecutionMarkdownRenderers.ts`。每个文件导入四个领域类型、四个 spec 与 `renderMarkdownSpec`，然后保留四个原函数签名；函数体只有把参数交给 spec 再渲染。

这种薄入口不是为了藏逻辑。它拥有真实兼容职责：稳定模块路径、导出名称和参数类型。规格文件不再承担公共导出历史，engine 不知道领域对象，barrel 不需要了解内部拆分。调用者若从旧模块导入，得到的仍是同一函数对象；route manifest 从总 bundle 导入也不变。三个入口都为 37 行，没有继续堆叠新的 helper 或 re-export alias。

## 九、为什么这次迁移一次就通过完整字节门

v2228 已经建立确定性测试边界：固定 Date，向 ledger 注入固定 UUID，再从权威 route manifest 遍历全部 28 个 artifact。在 empty 和单条 blocked decision 两种状态下，测试比较 56 个 raw payload 的字节长度和 SHA-256；旧 v2199 oracle 还在另一个固定时间复核最早十五路。v2229 没有新增或修改期望，也没有调整 normalizer，因此任何字段、空行、item 顺序或尾换行差异都会立即失败。

迁移第一次 focused run 就通过 56 路新 oracle、15 路旧 oracle和三个领域测试组，共六个测试文件十五项。与 v2228 曾被抓住 summary 顺序不同，本版所有 summary 都通过 `summaryLines` 接收完整有序领域字段，不让 helper自行插入 handoff/closeout 位置；这正是从上一次错误中提炼出的 API 改进。测试通过不是因为比较变宽松，而是因为 spec 按旧实现逐项映射，stage 的共享边界足够窄。

## 十、family logic 从 1,681 到 247 代表什么

批次开始时 `src/services:renderers` 有 1,681 行格式逻辑。v2228 迁移 core/handoff 后降到 1,110；v2229 迁移链尾后降到 247，终局阈值 700 已明显通过。剩余 247 行主要由另一个 approval prerequisite renderer 文件 114 行、promotion 主入口 73 行以及三个 20 行稳定模块构成。promotion 规格中的字段数据不再算作 renderer family 的行为，因为它们已经离开公共 renderer 并由一个共用 engine解释；但全仓维护性扫描仍会计算这些新文件的物理行数和函数跨度，不能通过改后缀逃避文件健康检查。

实际物理指标证明不是搬运刷分。release/approval/execution 规格分别 223、243、277 行，stage 110 行，handoff 505 行；没有文件超过六百行，没有函数超过一百二十行或复杂度二十。maintainability 保持 81/89/208/0，没有新增条目；name debt 保持 4,444，未用批量改名制造分数；tracked family 仍为 52，导入环和八百行以上源码仍为零。代码总量的主要变化是三份重复字符串拼接被 engine/stage 取代，而不是把一千行藏进单个新文件。

## 十一、终局九分门现在发生了什么变化

运行 `npm run elegance:nine` 时，foundation、零八百行源码、零导入环、零未豁免 renderer、renderer coverage 和 family 数量继续通过；`renderersLogic` 从 v2228 的 1,110 红项变为 247 绿项。剩余红项是 81 个近限文件、89 个长函数、208 个复杂函数、217 行最大函数、85 最大复杂度、4,444 命名债和 1,320 verification family logic。门没有因为本版取得大幅 family 收益就宣布平均达标。

这个结果给下一步明确排序。v2230 不再继续打磨 promotion，因为该 blocker 已超额解决；它转向最长的 controlled-shard section renderers，目标同时压低最大函数与长函数数量。v2231 再处理复杂度 85、84、76 等 checks。verification family 需要在后续专门审计真实重复形状，不能仅因排名第一就把 94 个异构 verification 强塞进万能模板。终局门把“哪里仍不足”保持为具体工程问题。

## 十二、安全、并行与验证边界

本版没有修改 route manifest、HTTP 路径、JSON 对象、decision ledger、digest builder、permission hook、audit hook、配置、fixture 或环境变量。Markdown 56 个当前表面和十五个历史表面逐字节一致。名称中出现 deployment、execution、receipt 不代表系统获得生产执行权限；这些对象仍是只读治理档案，Node 没有连接 Java 或 mini-kv、没有读取凭据、没有执行 SQL/KV 写入、没有自动启动兄弟服务。

Java 与 mini-kv 可以继续各自维护，Node 不需要它们产生新版本或新 evidence。没有 HTML、dashboard 或视觉交互变化，截图不能证明 TypeScript 类型边界和 Markdown hash，因此不创建图片。文档写入后还要跑全仓零告警 lint、typecheck、elegance/family/maintainability/renderer/source-size/security/archive 门，并在 mixed、纯 LF、纯 CRLF 三种物化下重复新旧 parity。完整 coverage、build、双模式 HTTP smoke 与远端 CI 仍按五版批次节奏留到 v2232，避免每个纯结构版本重复运行同一昂贵门。

v2229 的工程意义，是把 promotion 的后半条档案链从三份独立手写文档变成类型化规格，并让共享 stage 在第三个重复实现出现前承担共同语法。输出没有动一个字节，稳定导入没有断，renderer family 的重复逻辑却从批次起点缩到约七分之一；这是一项可以由维护者读懂、由 census 量化、由完整 oracle 反证回归的结构改进。

## 十三、发生回归时怎样从失败表面定位到责任层

这套拆分的一个直接收益是故障定位范围变小。若所有文档同时多出一个空行，首先检查 `renderMarkdownSpec`，因为只有 engine 统一拼接最终段落；若 release、approval、execution 的每个 item 都以相同方式错位，则检查 `stage.ts` 的 item helper；若只有 execution receipt 的 `Verified execution digest` 顺序变化，则责任必定位于 `executionReceiptVerificationSpec`，不需要在通用 engine 里设置例外。稳定入口只有参数转交，除非出现导入或类型错误，否则它通常不是内容回归来源。

反过来，测试失败的分布也能审计抽象是否越界。假设新增 approval 字段后，release 和 execution 的 hash 也一起变化，就说明公共 helper 不当地知道了 approval 领域；正确改法应是把该字段留在 `approval.ts` 的有序 metadata 或 summary 数组中。若只有空状态通过、含 decision 状态失败，则重点检查 `decisionLines` 的可选值规则以及 ledger 注入，而不是修改固定 hash。若 Windows 与 LF 物化通过、CRLF 失败，则应检查源码换行是否被运行时当成模板内容读取；不能用 trim 或换行归一化掩盖问题，因为真实接口合同是原始字节。

这种定位方法把“一个 Markdown 测试红了”分解为四个有所有权的层级：领域 builder 对值负责，spec 对字段与顺序负责，stage 对重复小节文法负责，engine 对整篇拼装负责。每层都只有一种主要失败形态，维护者可以根据受影响的 artifact 集合缩小搜索范围。它不是为了让文件数变多，而是让失败半径与代码职责相互对应。

## 十四、以后增加 promotion 文档时必须遵守的扩展路径

未来若增加新的治理档案，第一步不是复制最近的 renderer，而是先判断它属于现有文法还是新领域行为。标题、metadata 字段、check 顺序和 readiness 阶梯属于 spec，应在新的领域规格函数中显式列出；三级 item 若完全符合现有 simple、checked、detail 或 checked-detail 形状，才调用 stage。只差一个标签时应由参数表达，字段集合或语义不同则保留局部实现，不能把 helper 扩成拥有大量可选参数的万能入口。

第二步是在生产实现前为新 artifact 建立确定性输出样本。时间和标识符必须由依赖注入固定，至少覆盖空集合与一条失败决策；正常 JSON 合同继续由领域测试负责，Markdown 则比较原始长度和摘要。然后实现 spec 并接到稳定入口，运行完整 route manifest oracle，确认新增表面不会间接改变既有二十八个表面。只有当第三个真实重复形状出现时才提升到 stage；一次性的相似片段不值得提前抽象。

第三步是观察三个机械信号：family logic 不得反弹，maintainability 不得新增长函数或复杂函数，name debt 不得因堆叠超长领域名而上升。若为了容纳新文档必须让某个 spec 超过近限，应按领域阶段拆分，而不是把数组移入另一个无语义的 `utils` 文件。这个扩展协议保留了本版最重要的性质：共同文法只有一个事实源，领域顺序仍在本地可见，公共输出继续由不可宽松化的字节门保护。
