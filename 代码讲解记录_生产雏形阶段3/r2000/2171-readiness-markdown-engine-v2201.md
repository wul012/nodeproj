# v2201 代码讲解：九代 readiness summary 共享一套语法但保留各自事实

## Goal and non-goal / 目标与非目标

v2201 解决的是 readiness summary V5 到 V13 的重复排版，而不是继续扩展 readiness 版本链。迁移前，九个模块分别实现标题、顶部字段、章节、对象 entries、category、消息、空列表和 unknown 值处理。V6-V13 的结构已经高度稳定，每个文件末尾都复制五个 helper；当第三个同形文件出现时本应建立共享 engine，现在已有八份，任何格式修正都需要跨文件同步。本版把相同行为收回一个实现，并使 `src/services:summary` 成员数、超长命名债和格式逻辑行数在同一提交中下降。

非目标包括：不合并 V6-V13 的业务加载函数，不改变它们的直接模块路径，不把九代数据揉成一个运行时版本分支，不新增 V14，不修改 JSON 属性、路由或 fixture。V5 的创建策略也不会塞进通用 engine。engine 只拥有如何渲染；每一代仍拥有渲染什么。若抽象要求用属性路径字符串、`any` 或运行时反射绕开类型检查，就违背本版目标。

## Entry Points / 入口与兼容路径

HTTP 入口仍是 `src/routes/statusReadinessSummaryRoutes.ts`，九条路径仍为 `/api/v1/production/readiness-summary-v5` 至 `-v13`，`?format=markdown` 的选择方式也未改变。V6-V13 的 route 仍从原来的 `productionReadinessSummaryV6.ts` 至 `V13.ts` 导入原函数；这些模块还有直接测试和后续版本级联消费者，因此文件名、导出名与参数类型全部保留。

V5 的边界不同。仓库搜索证明没有源码或测试直接导入 `productionReadinessSummaryV5.ts`，唯一消费者是 route，而 V5 测试本身也是通过 HTTP 验证。因此该内部文件改为 `productionReadinessCaseV5.ts`，只导出 `loadV5Case` 与 `renderV5Case`。原来的类型、分类与消息模型留在 case 内部，route 不再暴露超过需要的 V5 实现面。这一改动删除一个 summary 家族成员，也删除旧长 renderer 导出，而不是把债换个文件名搬走。

## Response Model / 两层响应模型

`readinessMarkdownEngine.ts` 提供高低两层 API。高层 `renderReadinessReport` 面向 V6-V13 的标准形状：固定读取 service、generatedAt、summaryVersion、readyForProductionOperations、readOnly 与 executionAllowed；固定生成 Stage、Categories、Checks、Summary、Production Blockers、Warnings、Recommendations、Evidence Endpoints、Next Actions；调用方可以在 Stage 后插入一个命名状态记录，并提供 category 字段映射。

低层 API 包括 document、fields、entries、items、messages 与 list。它们处理标题符号、字段前缀、章节空行、三级 category、对象值序列化、空集合提示和消息上下文。V5 使用低层 API，因为它比标准形状多 maturityTarget、三组带前缀 Evidence，并且消息括号中包含 category。两层设计避免为了“统一”而给标准 report 塞入一堆 V5 专用开关，也避免 V5 继续复制整套 Markdown helper。

## Upstream Evidence And Config / 上游证据与配置

本版只读取 Node 自身已有的 readiness 构建链，没有要求 Java 或 mini-kv 生成新文件。版本边界上 Java 已提交 v1863/J73 并通过 CI，但 direct root 仍是 174，最终目标是 104，且没有 `java-track-final-evidence.md` 或外部 final review。因此 v1863 的“close evidence”表示该批账本收口，不是 Java program-final，不触发 capstone；Java 可以继续并行。

字节测试使用 `loadConfig` 的安全默认值，显式保持 upstream actions 与 probes 关闭，只用 fake Date 固定 `generatedAt`。测试不会连接真实 IdP、managed audit、Java 或 mini-kv，也不会赋予执行权限。v2200 的远端 CI 在 v2201 开始时已通过 typecheck、lint、security、archive、elegance 与 family 门，完整结论由下一版本边界继续检查。

## Service Flow / V13 标准流程

以 V13 为例，route 先调用原有 `loadProductionReadinessSummaryV13`。该函数仍加载 V12、live probe readiness contract 与 smoke harness，计算 stage、readinessStatus、categories、checks、summary、三类消息、endpoints 和 actions；这部分业务代码没有进入 engine。随后原公开 renderer 把 summary 作为 `report`，指定标题、`Readiness Status` 记录，并把 category 的 `readinessPasses` 作为首个 signal 交给 engine。

engine 先渲染六个顶部字段，再生成 Stage 与可选状态章节。category 由 signal 加共享的 Production connected、Status、Evidence、Note 组成；其余标准章节由同一骨架按固定顺序展开。entries 保留对象的插入顺序，非字符串值用 JSON 序列化，undefined 仍显示 unknown。最终所有行用单个 `\n` 连接并保留末尾换行，route 原样返回。因此 loader 的事实与 renderer 的语法之间有清楚边界。

## V5 Case Flow / V5 特例流程

V5 route 改为调用 `loadV5Case`，但内部仍按原顺序加载 V4、auth enforcement rehearsal 与 audit retention integrity，随后由 `createV5Summary` 计算 checks、categories、blockers、warnings 和 recommendations。改名没有改变任何成熟度判断、阻塞条件或 endpoint 常量。V5 case 仍是一份完整可读的业务切片，不依赖版本号 switch。

渲染时，case 显式声明 maturityTarget，并把 previousSummary、authEnforcement、auditRetentionIntegrity 三个对象分别交给 entries，同时传入原前缀，得到 `previousSummary.*` 等完全相同的键。V5 category 的 Title、Ready、Read only、Execution allowed、三个计数、endpoints 与 Note 也在 case 中逐项列出。消息对象拥有可选 category，engine 只在 category 存在时把它放在 severity 与 source 之间，所以 V5 与 V6+ 的两种括号格式共享一条无分支外泄的规则。

## Abstraction Boundary / 三次规则与抽象边界

最初把 V7-V13 改成配置时，七个 wrapper 仍重复 Production connected、Status、Evidence、Note 四个尾部字段，只是首个判断分别叫 Boundary exists、Rehearsal passes、Candidate passes 或 Readiness passes。这已经再次触发三次规则。因此 engine 增加 `readinessConnectionFields`：调用方提供唯一 signal 二元组，engine 添加共同尾部。差异仍以数据表达，共同结构只有一份。

V6 category 没有 productionConnected，也没有额外状态章节，所以它保留三字段 callback，不被强行套入 connection category。V5 的 category 又有完全不同的九字段模型，同样走低层 items。这里的判断标准不是“都叫 category 就统一”，而是字段语义和顺序是否真正一致。该边界让 engine 足够复用，却没有演变成可配置一切的报表框架。

## Type Ownership / 类型所有权与编译期证明

高层 engine 使用 `ReadinessReportBase<C, M>` 描述九个标准章节所需的最小结构，但它不导出一个取代 V6-V13 领域 interface 的“总类型”。每个 wrapper 把自己的 `ProductionReadinessSummaryVn` 直接传入，TypeScript 会检查该代是否真的拥有 stage、categories、checks、三类消息与 endpoints；category callback 的参数也由该代数组元素推断，所以写错 `candidatePasses` 与 `readinessPasses` 会在编译期失败。engine 的泛型只表达共同需求，不夺走数据所有权。

`ReadinessMessage` 把 category 设计成可选字段，是因为 V5 消息确实有 category，而 V6+ 没有；渲染函数根据字段是否存在构造上下文，不靠版本号判断。`ReadinessConnectionCategory` 只要求四个共同尾部属性，首个 signal 仍由 wrapper 提供。整个迁移没有引入 `any`、字符串属性路径或类型断言来蒙混结构差异。V5 case 的类型不再 export，但它们仍完整约束创建器、分类器与 renderer，缩小的是模块表面，不是类型安全。

## Rejected Alternatives / 被拒绝的替代方案

第一条被拒绝路线是建立一个 V5-V13 巨型 switch，让 engine 同时加载数据和渲染。它会把九代依赖汇入单文件，破坏 V6-V13 的稳定模块路径，也让新增证据必须修改中央分支。第二条是直接复用 `promotionMarkdownEngine`；promotion item 在章节末尾拥有双空行，而 readiness category 只有单空行，两者的消息和值序列化语法也不同，强行复用会把字节差异藏进开关。

第三条是把 V5 创建逻辑搬进 route，从而只新增一个 engine 文件。这样虽然服务计数更小，却会让 HTTP 注册层负责 auth/audit readiness 聚合，违反既有分层。第四条是只抽取五个小 helper、保留八份五十行文档数组；它能减少少量行数，却没有把稳定的章节骨架转成数据，也无法把格式逻辑从 1185 行压到 511 行。当前两层 API 在删除重复、保留类型、控制文件数量与维持可读性之间更均衡。

## Maintainability / 可读性与尺寸

engine 为 148 行，V5 case 为 444 行；V6-V13 从原来的 322–399 行降到 249–320 行，每个稳定模块减少约 70–80 行。文件仍保留 loader、领域 interface 和少量 renderer 配置，维护者打开某一代文件就能看见该代新增证据与判断，而不必进入一个九版本巨型 switch。所有新文件与新导出均在 40 字符预算内。

服务文件数从 v2200 的 1,124 回到 1,125：删除旧 V5 summary，新增 V5 case 与 engine，净增一。这个增量不是治理链扩张，而是使用前一版明确预留的一格容量来换取一个共享行为模块；原 1,125 上限没有放宽。没有新增第三个 engine 文件，也没有让 route 承担业务逻辑。

## Ratchet Effects / 机械收紧

迁移前 baseline 为 4,538 个超长名称、3,554 个长导出、15 个 summary 成员。迁移后分别为 4,537、3,553、14。旧 V5 长 renderer 导出消失，新 case API 与 engine API 都低于命名预算。`elegance:census` 在刷新前明确报告 name 与 summary family shrink，且 newFamilies、grownFamilies 和 changedNameDebt 均为零，确认后才刷新 baseline。

`family-logic-census` 对 summary 的格式逻辑统计从 1,185 行降到 511 行，降幅超过一半。这个指标不是靠删除测试或把模板字符串藏到另一个 `*Summary.ts` 文件获得；engine 的 suffix 不属于 summary family，八个 wrapper 的重复 helper 真实删除，V5 也不再拥有本地 entries/messages/list/value 实现。baseline 刷新后两条 census 均恢复 ready。

## Byte Parity / 十八个完整响应的真值门

迁移前先在 v2200 源码上创建 `readinessSummaryParity.test.ts`，固定时间为 `2026-07-12T12:00:00.000Z`。测试依次请求 V5-V13 的 JSON 与 Markdown，共十八个 raw payload，并冻结每个响应的字节长度与 SHA-256。旧实现先通过这些常量，随后才改名 V5、创建 engine、修改 V6-V13。迁移后同一常量再次全部通过，测试期望没有被更新。

JSON 也进入门，是为了证明模块改名与 route 接线没有影响 loader 数据；Markdown 则证明字段顺序、消息上下文、category 空行、unknown 序列化和结尾换行全部不变。响应规模从 V6 JSON 的 4,125 字节到 V5 Markdown 的 6,123 字节，覆盖九代不同 category 与状态形状。任何仅靠 `contains` 测试可能漏掉的单字节变化都会改变长度或散列。

## Portability / mixed、LF 与 CRLF

因为本版新增字节 oracle，push 前必须运行 mixed/LF/CRLF 六表面复核。最终 index 被写成不移动 master 的临时 commit `0393181b`，再创建 LF 与 CRLF detached worktree；三处分别运行 engine 直接测试和十八路由摘要门，结果均为 2 文件、4 测试通过。`git ls-files --eol` 记录 mixed `w/lf`、LF `w/lf`、CRLF `w/crlf`，证明 CRLF 工作树确实物化成功。

临时 worktree 放在仓库已忽略的 `.tmp` 下，依赖通过目录向上解析到主仓库，没有创建 junction；测试完成后已用 Git 自身 remove/prune，既有 `claude-*` 临时目录保持不动。三种物化全部命中同一 v2200 基线。如果未来只有 CRLF 失败，仍应先检查 checkout filter 与固定时间，不得修改 response 做换行归一化，也不得改摘要常量接受漂移。

## Safety Boundary / 安全和兼容边界

本版没有开启 upstream probes/actions，没有启动 sibling 服务，没有读取或写入凭据，也没有修改 audit、auth 或 approval 规则。V6-V13 的公共文件和导出仍在，V5 只删除了经 importer 审计确认的内部模块路径。所有 HTTP route、状态码、Content-Type、JSON key、Markdown 文本与 fixture 保持不变。

截图不适用，因为没有 HTML、页面、图表或交互状态；最有意义的证据是完整 raw payload 摘要。现有测试断言与 fixture 没有为迁移而调整。若固定摘要失败，唯一允许的方向是修 engine 或 wrapper 的字段/空行实现，禁止重录“新正确值”。工作区中其他会话写入的 Java 简报继续保持未暂存。

## Test Coverage / 测试覆盖

engine 直接测试锁定单 category 的空行所有权、带/不带 category 的消息括号、带前缀 entries、undefined/string/boolean 格式和共享 connection 字段。V5 HTTP 测试验证短 case API；V6-V13 原有直接模块测试验证稳定路径；status route split 测试验证路由归属；十八响应 parity 测试验证最终字节。readiness 专项组合已经通过。

最终门在本讲解完成后运行。typecheck、lint、security、renderer、elegance、family logic、source-size、archive、文档质量与 build 全部通过；lint 为 0 error / 180 个预算 warning。全量 JSON 报告记录 1,141/1,141 suites、1,716/1,716 tests、0 失败、0 pending。v2201 是 Round 2 最终版本，因此 push 后不仅等待 CI 启动，还要阻塞观察最终结论，并整理三版本评审材料。

## Failure Lookup / 失败定位

若类型错误指向 `ReadinessReportBase`，先确认某代 messages 是否具备 code、severity、source、message，categories 是否具备 id；不要放宽为 `any`。若 V5 Markdown 摘要失败，优先检查 Evidence 前缀、带 category 的消息上下文和 category 九字段顺序。若 V6 摘要失败，检查它是否被误加了 status section 或 productionConnected。若 V7-V13 失败，按版本定位 status 名称和首个 signal。

若 category 附近只差一个换行，检查 items 是否只在项目之间加空行，文档是否统一拥有章节末尾空行。若 JSON 摘要失败，说明问题不只是 renderer，应检查 route 是否仍调用原 loader 和固定配置。若 elegance 失败，区分 name count、digest、summary family 与新增 engine family；本版只允许 shrink 后零差异。若全量测试仅超时，按仓库规则先单跑失败文件，不通过放宽断言收尾。

## Stop Condition / 停止条件与评审

v2201 只有在十八响应于 mixed/LF/CRLF 全部一致、summary family 与 name baseline 同版下降、本地全门通过、提交/tag/push 完成、v2200 和 v2201 远端 CI 都绿色时才算候选完成。完成后 Round 2 达到三版本硬上限，必须停止新增 family 迁移并请求外部评审。

外部评审要复核三件事：v2199 的 top-five 选择是否可重现；v2200 与 v2201 是否真实删除重复而非转移；两组固定摘要与三种行尾是否独立成立。在评审明确 PASS 前，计划书不能自称 final，也不能启动第四个“顺手优化”版本。

## One-Sentence Summary / 一句话总结

v2201 让九代 readiness summary 共享一套可验证的 Markdown 语法，同时保留八个稳定模块和 V5 的独特业务事实，并用十八个完整响应证明抽象没有改变任何对外字节。
