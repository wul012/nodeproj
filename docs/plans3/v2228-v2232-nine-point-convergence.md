# v2228-v2232 九分优雅度收敛批次

## 状态与目标

状态：active。所有权：Node 会话。范围：仅内部重构、机械质量门、行为等价证明和维护文档；
不新增功能、路由、报告、fixture、审批输入、网络访问、写路径或执行权限。本批结束后若终局门仍未
通过，Node 会话必须直接写下一份证据化 successor 并继续，不在中途请求主观评分。

用户要求把整个 Node 项目的 `coding brilliant and elegant` 提升到约 9/10。这个分数不能靠印象授予，
也不能把最新触及的几个文件当作全仓。因此本批先建立一次性终局门，再优先处理同时命中重复逻辑、
超长函数、高复杂度、近 800 行文件和超长命名的热点。九分点只表示下面的绝对阈值与全部既有回归门
同时通过；它不是“完美”、不是零历史债，也不扩大系统成熟度标签。

## Step-0 现实

- 起点提交/标签：`34756cee` / `v2227`，工作树干净并与 `origin/master` 同步。
- 远端 Node Evidence：run `29815849432`，job `88586909075`，成功；本地 582 个测试文件、
  1,780 项测试已由四个顺序 shard 在最多 4 workers 下通过。
- 维护性：1,289 个源码文件、6,868 个函数、82 个近限文件、89 个长函数、208 个复杂函数、
  0 个导入环；最长函数 217 行，最高复杂度 85。
- 优雅度：4,444 条存量超长文件/导出名债，52 个受管结构 family；renderer 为 242/245
  standardized、3 个 composition-only waiver、0 个 non-waived。
- 源码尺寸：超过 800 行的生产文件为 0；当前最大文件 780 行。
- family logic：`src/services:renderers` 为 1,681 行，`src/services:verification` 为 1,320 行。
- Java 工作树正在独立推进 v1885，mini-kv 仅有独立 README 变更；本批不读新鲜上游证据，
  二者均为 **recommended parallel**，Node 不是它们的批准前置。

## 为什么需要一个新门

现有 elegance、family、maintainability、renderer 和 source-size 门都是 shrink-only ratchet：它们能阻止
回退，却不能回答“全仓是否已经到九分点”。本门解决的唯一 blocker 是把用户要求的九分变成可重复的
绝对验收；它由本会话最终审核和 CI 消费。既有 census 仍是事实源，新脚本只组合结构化结果和固定阈值，
不再建立 route/report/archive 链。当所有阈值通过并由一次远端 CI 复核后，本链停止增长；后续只保留
回归门，不再增加 9.1、9.2 等评分层。

## 九分终局门

| 维度 | 起点 | 九分阈值 | 事实源 |
| --- | ---: | ---: | --- |
| 超过 800 行的源码文件 | 0 | 0 | source-size census |
| 运行时导入环 | 0 | 0 | maintainability census |
| non-waived renderer | 0 | 0 | renderer census |
| 近限文件数（>600 行） | 82 | <=70 | maintainability census |
| 长函数数（>120 行） | 89 | <=70 | maintainability census |
| 复杂函数数（score >20） | 208 | <=170 | maintainability census |
| 单函数最大长度 | 217 | <=160 | maintainability census |
| 单函数最大复杂度 | 85 | <=60 | maintainability census |
| 超长文件/导出名债 | 4,444 | <=4,200 | elegance census |
| `src/services:renderers` logic | 1,681 | <=700 | family logic census |
| `src/services:verification` logic | 1,320 | <=1,000 | family logic census |
| 受管 family | 52 | <=52，且无新增 | elegance census |

终局脚本还必须验证所有底层 census 自身 ready。上述十二项全部通过才允许输出
`ninePointReady: true`；不做平均分，不允许某一项超标后由另一项“加分抵消”。

## 防刷分规则

1. 不得压缩物理行、合并语句、隐藏 AST 分支、搬出 `src/`、改 family 后缀或增加 ignore 来降低计数。
2. 不得修改既有测试期望、snapshot、fixture 字节或 parity normalization 来迁就重构；新增 oracle 必须在
   改生产源码前冻结，之后期望不可改。
3. 提取函数必须拥有完整概念：一个 predicate group、一个 section spec、一个 evidence source 或一个
   domain mapping。只转发一行的薄包装不算收敛。
4. 共享 engine 只吸收结构；领域字段、顺序、标题、空值规则和 fail-closed 行为留在声明数据中。
5. 不以批量重命名公共合同刷 name debt。只迁移仓内私有边界，并在目录已经表达上下文时使用短名。
6. 每个触及文件离开时遵守 40 字符新增命名预算、800 行硬上限、无新增长/复杂函数和 rule-of-three。
7. 每版中文代码讲解至少 3,000 个汉字；自然写不够说明工程切片过薄，必须增加真实重构或验证深度。

## 需求-证据矩阵

| 要求 | 实现边界 | 机械证据 | 状态 |
| --- | --- | --- | --- |
| 九分点可复核 | 组合既有 census 的终局脚本、package 命令和单测；达标版再接阻塞 CI | 12 项阈值的正/负向单测 | v2228 passed locally |
| promotion Markdown 不再手写 1,681 行格式逻辑 | section/spec 数据 + 既有 report builder | 全部 28 artifact 固定时间 exact-byte oracle | v2228-v2229 passed locally; family score 247 |
| 最长 section renderer 不再承担 200 行控制流 | section builder catalog + 小型领域 helper | fixed-time JSON/Markdown parity、触及范围最大函数 60 行 | v2230 first slice passed; 6 long functions removed |
| 相邻 artifact composition 不再由单函数同时算 digest 和组装响应 | digest input + response assembly helper | 全 profile JSON/Markdown parity、累计净减 10 个 long | v2231 passed; cumulative long 89 -> 79 |
| 最高复杂度 checks 不再使用单体布尔拼接 | 具名 predicate groups + strict-true assembly | READY/BLOCKED/缺失/错类型完整 parity | v2232 pending |
| 近限、复杂和命名债按绝对目标下降 | 从榜首继续做成组的真实 bounded-context 提取 | 九分 census + shrink-only baseline | v2233 及 successor pending |
| 行为和安全边界不漂移 | 不改 route/schema/permission/write boundary | focused、typecheck、lint、full、build、smoke、CI | 终局阻塞项 |

## 新 family 设计说明（实现前）

`nine-point census` 只有一个组合器和一个阈值数据对象：数据是十二项稳定上限，行为是读取既有 census
结构、计算最大值并给出逐项 pass/fail；它不重新扫描 TypeScript。`promotion markdown specs` 的数据是
标题、metadata、section、entries/messages/lines 与顺序；行为只由既有通用 Markdown builder 渲染。
若同一领域需要多个 spec 文件，目录表达 `opsPromotion` 上下文，文件和导出使用短角色名。

## v2228：终局门与 promotion core

1. 新增 `scripts/nine-point-census.mjs`、package command 和单元测试。命令在任一项未达标时必须非零；
   为避免诚实的中间收敛提交故意制造红 CI，只在十二项全部通过的最终版本接入阻塞 CI。测试必须构造
   越界值证明每个阈值都能单独失败，并证明底层 census 不 ready 时不能误报九分。
2. 在任何 promotion renderer 修改前，固定 Date，并冻结 28 个 artifact Markdown 的完整 byte length +
   SHA-256；oracle 覆盖空 ledger 与有 decision 两个状态，且验证 LF/CRLF/混合工作树六表面规则。
3. 把 `opsPromotionArchiveRenderers.ts` 的 core/handoff 格式逻辑迁为 builder spec。优先删除重复的
   metadata、summary/checks/list 拼接；输出字节、字段顺序、尾换行和空列表表达必须完全一致。
4. 刷新 shrink-only baseline 只能收紧；版本结束时记录 family logic、维护性和 name debt 前后值。

## v2229：promotion release/deployment 收敛

迁移 release archive、deployment approval/change、deployment execution 四组 renderer。审计共享结构后用
一个领域 adapter 把 `items/checks/nextActions` 映射为 report sections；已有标准化 audit trail 不返工。
版本完成条件是 28 个 oracle 全部不变，`src/services:renderers` score <=700，且没有新增 composition waiver。

## v2228 收口证据

终局门以十二项绝对阈值加四项 foundation checks 组成，17 项纯函数测试逐一证明每个红项和底层 census
失败都不能被平均分掩盖。真实运行诚实报告 9 个通过、7 个未达标，不会提前输出九分。为冻结 non-empty
promotion 输出，`OpsPromotionDecisionLedger` 增加可选 ID factory，`buildApp` 增加可选 runtime deps；默认值
仍分别是 `randomUUID` 和 `createRuntimeDeps(config)`，运行行为不变，oracle 则可固定 UUID。

新的 28-artifact oracle 在固定时间下覆盖 empty 与 blocked 两种状态，共 56 个完整 byte length + SHA-256。
core/handoff 的 15 个公共 renderer 保持原名，只把规格迁入 `promotionMarkdown/core.ts` 与 `handoff.ts`，
统一由 `renderMarkdownSpec` 调用既有 engine。首次 parity 精确发现 completion verification 中两个 summary
字段次序互换；只修复 helper 的 before/after-handoff 数据边界，所有冻结期望保持不动，最终 56/56 一致。

`opsPromotionArchiveRenderers.ts` 从 742 行降为 151 行并退出近限账本；maintainability 从
82/89/208/0 收紧为 81/89/208/0，family logic 中 `src/services:renderers` 从 1,681 降为 1,110。
name debt 仍为 4,444、受管 family 仍为 52、导入环和 >800 行源码仍为 0；本版没有用重命名或压行换数字。
Java 与 mini-kv 为 recommended parallel，Node 未读取或要求新鲜上游证据。

文档写入后，8 个 focused 文件 35 项、typecheck、全仓零告警 lint、security 18/18、archive、
elegance、family、maintainability、renderer、source-size 与 governance growth ratchet 全部通过。
mixed、纯 LF、纯 CRLF 三种物化分别通过新 56 路 oracle 与旧 15 路历史 oracle，共六个 parity 表面；
短路径临时 checkout 与 junction 均已清理。完整 coverage/build/smoke/CI 按批次节奏留到 v2232。

## v2229 收口证据

release evidence/archive、deployment approval/change、execution record/receipt 共十二个文档函数迁入
`promotionMarkdown/release.ts`、`approval.ts` 与 `execution.ts`；三个原稳定模块继续保留原路径和导出，
但各自只剩 37 行 spec adapter。`stage.ts` 在第三组相似实现出现前统一 decision、summary、普通/校验
item 的结构，v2228 handoff 也改用该 helper；它不读取字符串路径，不推导领域状态，字段顺序仍由 spec
显式给出。

固定时间、固定 UUID 下的 56 个 empty/blocked raw payload 与旧 15 路 v2199 oracle 一次通过，三个领域
测试组也通过，未修改期望、fixture 或 normalizer。新增规格文件分别为 223/243/277 行，stage 为 110
行，handoff 从 566 降为 505 行；没有近限、长函数或复杂函数新增。

`src/services:renderers` family logic 从批次起点 1,681，经 v2228 的 1,110，最终降到 247，终局门的
renderersLogic 首次转绿。maintainability 保持 81/89/208/0，name debt 4,444、52 个受管 family、零导入
环与零个 >800 行源码均不变。Java 与 mini-kv 继续 recommended parallel，Node 不要求新鲜证据。

最终验证补齐了全仓零告警 lint、typecheck、security、archive、elegance、family、maintainability、
renderer 与 source-size 门。候选 index 另行物化为纯 LF 和纯 CRLF 两棵短路径工作树，两边都通过
56 路当前完整字节 oracle 与 15 路历史 oracle；加上当前 mixed 工作树，三种换行表面一致。物化目录、
zip 与 junction 已在验证后清理，未触及主 `node_modules`。完整 test/build/smoke/CI 继续按批次留到 v2232。

## v2230 收口证据

六个 170-217 行的 controlled-shard section renderer 改为稳定入口、按展示顺序排列的 builder catalog 与
39 个短 section builder。所有原字段、标签、嵌套列表、空值表达和后续 renderer 展开保持在原文件；没有
动态字符串路径、万能模板或新 family。最初尝试直接 `renderEntries` 整个领域对象时，内存等值检查发现会
泄漏原本刻意不展示的 live/production 字段，因此在改源码前否决该路线，继续使用受控字段子集。

ready 与 probes-disabled 两个完整 profile 的 JSON/Markdown hash 以及四个局部 renderer 测试在迁移前后
一致，旧期望、fixture 与 normalizer 均未修改。触及范围的最长 builder 为 60 行、最高复杂度为 10；全仓
maintainability 从 81/89/208/0 收紧为 81/83/208/0，最大函数从 217 降为 171，baseline 只删除六项 stale。
name debt 保持 4,444，52 个 family、零导入环、零个 >800 行源码与 renderer waiver 均不变。

文档完成后，8 个 focused 文件 16 项、typecheck、全仓零告警 lint、security 18/18、archive、elegance、
family、maintainability、renderer、source-size 与 governance growth ratchet 全部通过。完整 test/build/
smoke/CI 仍按五版批次节奏留到 v2232，不为单个结构版本重复远端验证。

本版源码与 baseline 已约 2,268 个增删行；若继续把四个 124-167 行 artifact builder 塞入同一提交，加上
讲解和证据会越过约 3,000 行审查预算。因此原“净减至少 10”目标按职责拆成两个版本：v2230 已真实净减
6，v2231 处理 comparison/submission/review/intake 四个相邻 builder，累计达到至少 10。Java 与 mini-kv
继续 recommended parallel，Node 不消费新鲜兄弟证据。

## v2231 收口证据

comparison、submission、review 与 intake 四个 148-167 行 artifact builder 现在只编排领域 catalog、
controls、gates 与 blocked reasons；各阶段的 digest input 和 response assembler 留在原文件，最长分别为
36 与 77 行。`shardArtifactState.ts` 只共享 blocker->ready 与 stable-json->digest 两项机制，不知道字段、
版本或响应类型；直接单测证明 fail-closed readiness 和键顺序无关 digest。

四个领域测试和 ready/probes-disabled 完整 profile JSON/Markdown hash 前后相同，未修改期望、fixture 或
normalizer。maintainability 从 81/83/208/0 收紧为 81/79/208/0，v2230-v2231 累计从 89 净减到 79，
原定累计十项已完成；baseline 只删除四个 stale long key。全仓最大函数仍是 171 行的高复杂度
`createChecks`，它不属于本版 composition 范围，随 v2232 的复杂度 84 目标一起处理，而不是压行过门。

name debt 保持 4,444、受管 family 保持 52，源码 >800 与导入环保持 0。Java 与 mini-kv 继续
recommended parallel；本版不读取新鲜兄弟证据，也不改变网络、权限、写路径或执行能力。

文档写入后，9 个 focused 文件 34 项、共享状态 2 项、typecheck、全仓零警告 lint、security 18/18、archive、elegance、family、maintainability、renderer、source-size 与 governance growth ratchet 全部通过。九分总门继续诚实报告 7 项红色：81/79/208、最大函数 171、最大复杂度 85、name debt 4,444 与 verification logic 1,320；这些数值进入 v2232 及 successor，不以本版局部通过替代终局完成。

## v2232：最高复杂度 checks 收敛

新 family `archiveChecks` 的数据边界是已解析归档、文件引用、来源摘要与验证记录；行为边界是按原键序生成严格布尔检查。入口服务继续负责文件读取、摘要和响应装配，共享模块只负责安全路径取值、digest/布尔集合判断；decision 与 closure 各自保留领域字段，不建立动态字段配置。

`echoCheckGroups` 只比较已经类型化的 Node/Java/mini-kv 回声事实，`releaseGateCheckGroups` 只比较既有 fixture 与只读步骤；二者都不读文件、不改配置、不推导新权限。每个导出按连续键区间调用具名 predicate group，调用方仍拥有最终 ready 聚合与响应格式，避免 companion 演化成第二个服务入口。

处理复杂度 85、84、76、76、72、71 的 checks/reference builder。按 source presence、identity、digest、
credential、connection、permission、write/auto-start boundary 分组，复用 strict-true assembly；缺失、null、
错类型和 conflicting evidence 必须 fail closed。版本完成条件是最高复杂度 <=70、复杂函数净减少至少 15，
并让 171 行 `createChecks` 退出 long 账本，使全仓最大函数 <=163。

## v2233 及后续：绝对阈值收口

重新排名而不是照旧清单盲做：选择同时命中近限、长、复杂、name debt 或 family score 中至少两项的
下一组热点。目标第一批结束至少达到 75/75/180/0（近限/长/复杂/环）、最大函数 <=165、最大复杂度
<=65、name debt <=4,300。若九分终局门已全绿，直接进入最终验证；否则写下一批 successor，阈值只能
按当前真实值继续收紧，不得停下来请求“是否继续”。

## v2232 收口证据

四类 archive 判定已进入 `src/services/archiveVerification/`，由 kernel 提供严格路径读取、精确布尔集合、
ID 集合、digest 形状和有序组装；decision、closure、intake、integration 保留各自字段与失败边界。echo、
release/retention、readiness reference 和 abort/rollback 也按具名 predicate group 或 evaluator 分离。原服务
继续拥有 I/O、ready 聚合和响应装配，没有产生第二套 route/report，也没有修改期望、fixture 或 normalizer。

结构族初稿曾使 checks 由 5 增到 11、utils 由 3 增到 4，elegance gate 正确失败；最终使用目录上下文与
短领域角色重新组织，旧 family baseline 未放宽，受管 family 保持 52。maintainability 从 81/79/208/0
收紧为 73/72/193/0，最大函数 171→163，最大复杂度 85→59；近限净减 8、长函数净减 7、复杂函数净减
15，导入环和 >800 行源码保持 0。21 个聚焦测试文件 64 项、typecheck、零告警 lint 与全部静态 census
通过；九分门仍诚实报告近限、长函数、复杂函数、最大函数、name debt 和 verification logic 六项红色。

本版没有 route/schema/权限/网络/写入/执行变化，无 UI，截图不适用。Java 与 mini-kv 继续 recommended
parallel，Node 不消费新鲜兄弟证据。文档完成后，四个顺序 shard 在最多四个 worker 下通过 586 个文件、
1,805 项测试，build 通过；默认安全模式验证 health、零请求 metrics 与 release readiness，强制 access
guard 和 historical fallback 模式验证受保护归档 21/21、Markdown 200、execution=false。两个服务均按
PID 关闭；coverage 与远端 CI 在提交推送后复核，失败只允许修复可复现根因，不得修改既有行为 oracle。

## 验证节奏

- 每版：冻结 oracle -> 改源码 -> focused tests -> typecheck -> 定向零告警 lint -> 全部静态 census ->
  baseline 收紧 -> 中文 walkthrough/docs gate -> commit/tag/push。
- 每 4-5 版：一次最多 4 workers 的完整 test/coverage、全仓 lint、build、security、archive、HTTP smoke
  和远端 Node Evidence；不为每版重复昂贵 CI。
- 终局：`npm run elegance:nine`、所有底层 census、独立 test discovery、完整 shard/coverage、build、
  access-guard 与默认模式 smoke、远端 CI 全绿后，才进行九分审核。
- 长验证期间只做下一版只读准备；timeout 先单文件、再相关组。只停止本会话启动的 PID，删除 `dist`、
  `.tmp` 和纯验证产物。

## 失败条件

- 任一既有输出、route、schema、权限、write/no-write 或 fail-closed 行为漂移。
- 为通过迁移修改旧期望、fixture、normalizer 或降低 ratchet/终局阈值。
- 数字下降来自压行、目录规避、薄包装、ignore 或机械重命名公共合同。
- 任一触及文件新增 >40 字符标识符、>800 行文件、新 long/complex function 或第三个重复实现。
- 中文讲解少于 3,000 汉字，或使用重复模板填充。
- 九分项尚有红项却给出“已到九分”的结论。
