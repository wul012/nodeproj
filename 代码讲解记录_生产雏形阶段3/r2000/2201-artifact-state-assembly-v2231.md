# Node v2231：四阶段 artifact state 与 response assembly

## 一、目标与非目标：完成累计净减十个长函数

v2230 已把六个 170-217 行 section renderer 拆成短 builder，但同一 controlled-shard 链上紧接着还有
四个 148-167 行 artifact builder。它们依次代表 text package intake、review preflight、submission
preflight 和 comparison preflight。每个函数都先调用领域 catalog/builder，随后生成 controls 与 gates，
收集 blocked reason codes，再构造 digest payload，最后返回一个包含几十个字段的大对象。代码并不难，
但三种职责挤在同一跨度内，阅读者无法快速区分哪些键属于摘要合同、哪些值只是最终响应投影。

本版目标是让公共入口只保留流程编排，把 digest 输入与 response assembly 分成可命名、可独立审查的
领域 helper，并在四个阶段之间共享真正相同的 state 机制。非目标是重命名公共 API、改变摘要、删减
字段、增加运行能力或把四个领域对象强行统一成无类型字典。完成后 v2230-v2231 的长函数由 89 累计降到
79，兑现原先净减十个的承诺。

## 二、四个入口在服务流程中的先后关系

链条起点是 signed approval artifact draft instruction preflight。intake 根据 instruction 生成 fields 与
guards；review 消费 intake，生成 criteria 与 review controls；submission 消费 review，生成 submission
slots 与 comparison controls；comparison 再消费 submission，生成 comparison lanes 与 acceptance controls。
每一层都调用自己的 validator 产生 gates 和 blocked reason codes，然后把上游 digest 继续绑定到当前
digest，使档案沿 lineage 可追踪。

这些函数由 `shardPreview/assessment.ts` 在构造完整 preview 时顺序调用，也通过 review artifacts barrel
保持既有导出。测试 fixture factory 能单独建立每一阶段的前置对象。v2231 没有改变任何调用方向：上游
对象仍是下一层唯一输入，公共导出仍返回原长类型，barrel 与 assessment 不需要知道内部出现了 helper。
因此重构发生在 composition boundary 内部，不扩散到 route 或 profile 类型。

## 三、响应模型为何不能被一个通用大模板合并

四个响应看起来相似，都有 version、state、ready、上游摘要、计数、目录项、controls、gates、blockers、
digest 和安全锁。然而它们的领域模型并不相同：intake 的核心是 field/guard，review 是 criterion/control，
submission 是 slot/comparison control，comparison 是 lane/acceptance control。每类 item 的 kind、mode、
source reference 和 ready 属性都不同，digest 中覆盖的 tuple 也不同。

若建立一个接受几十个可选字段的 `buildArtifact(stage, items, options)`，调用点会失去类型提示，键顺序
可能由分支决定，最终又需要按 stage 写 switch。v2231 只共享真正恒定的两步：是否有 blocker 决定 ready，
以及稳定 JSON 生成 digest。四个 digest input helper 与四个 result helper仍留在各自文件，响应模型的差异
在本地可见。共享机制很小，领域合同仍然具体。

## 四、公共 state helper 的输入、输出与停止边界

`resolveShardArtifactState` 接受 `blockedReasons` 和一个已由领域层构造好的普通对象。输出只有
`{ ready, digest }`：ready 严格等于 blocker 数量为零，digest 使用仓库既有 `sha256StableJson`。helper
不读取 blocker 内容，不判断某个 gate 是否应该存在，不改变对象键，也不知道 digest 最终要写入哪个
响应字段。它拥有的是跨四阶段完全一致的机械规则。

这个抽象的停止边界很明确。未来新阶段若同样使用 blocked reasons 和 stable digest，可以复用 state；
若 readiness 需要其他条件，就不能悄悄给 helper 增加 stage 参数。领域 digest 字段继续由 `*DigestInput`
函数定义，返回对象继续由 `*Result` 函数组装。这样公共层不会逐步膨胀成第五套 artifact framework，也
不会让一个阶段的特殊规则污染其他阶段。

## 五、digest input 提取后怎样保持摘要字节不变

原函数直接在 `sha256StableJson({ ... })` 内列出版本、上游 digest、items 的 tuple、controls 的 tuple 和
gates。AST 迁移把同一个对象字面量原样移入 `intakeDigestInput`、`reviewDigestInput`、
`submissionDigestInput` 与 `comparisonDigestInput`。对象键顺序、tuple 元素顺序、map 顺序和 gates 位置
都没有改变；helper 只把上游参数命名为 `source`，避免重复冗长阶段名。

摘要计算从领域文件移到共享 state helper，但输入对象完全相同，算法仍是同一个 `sha256StableJson`。
这与“先 JSON.stringify 再普通 hash”不同：稳定函数会排序对象键，同时保留数组次序。直接单测用
`{ version, count }` 和反向键序对象证明摘要相同；完整 profile parity 则证明四层真实 digest 和所有下游
派生值都没有漂移。没有删掉动态字段，也没有在测试中归一化 digest。

## 六、response assembler 为何仍保留几十个显式字段

四个 `*Result` helper 各接收一个短 context，解构为 source、items、controls、gates、blockedReasons、
ready 与 digest，再返回原对象。它们仍显式写出 readiness 阶梯、各种 kind 计数、expected/actual 数量、
approval 状态、上游 digest、目录数组、安全标志和最终 digest。最长 assembler 为 77 行，最短为 72 行，
都低于 120 行门且能一次阅读完整响应合同。

保留这些字段不是重复浪费。返回对象决定 JSON 的属性顺序，完整 Markdown renderer 又消费该 profile；
自动 spread source 或根据类型键反射，会把未授权字段带入响应，并让未来类型扩展自动改变公共合同。
assembler 的价值是把“哪些字段对外、按什么顺序”集中在一个短函数中。读者不必穿过 catalog 创建和
digest tuple，也不会失去显式合同。

## 七、入口缩到十七行后是否只是薄包装

四个公共入口现在约十七行，但它们并非没有职责的转发。入口拥有明确的 orchestration：按顺序创建
items、controls、gates、blocked reasons；把领域摘要对象交给 state resolver；最后把所有组成部分交给
对应 assembler。每一步的数据依赖都在入口可见，错误阶段也容易定位。它不再同时维护几十个响应字段，
但仍是这一阶段的应用服务边界。

所谓有害薄包装，是一个新函数只调用另一个同名函数且不形成概念。这里拆出的 digest input、state 和
result 分别对应摘要合同、跨阶段机械规则、响应合同，三者具有不同修改原因。入口则对应流程顺序。四种
职责各有真实所有权，所以函数变短来自概念分离，不是把原实现改名搬走。

## 八、AST 迁移为什么仍需要编译器后的人工审查

四个对象都很长，人工剪切容易漏键或改变逗号，因此迁移脚本用 TypeScript AST 精确找到公共函数、
`sha256StableJson` 的对象参数和最终 return object，再生成 helper。脚本在完成后删除，不进入产品工具链。
这种方法保留原节点文本，比正则跨越数百行安全，也能一次处理四个同形文件。

首次 typecheck 仍发现六处生成语法错误：长 readiness 名既可能是对象 shorthand，又可能是另一个属性的
值，文本后处理把值误写成 `ready: ready`。修复没有改变领域逻辑，而是恢复原属性名或单一值，并再次
运行编译器。这个过程说明 AST 能安全定位大结构，却不能替代对生成边界的审查；编译、格式检查和行为
oracle 都必须跟在机械迁移之后。

## 九、直接单测怎样让共享机制具有失败能力

仅依赖上层四个测试，state helper 即使被错误改成永远 ready，也可能要在复杂 fixture 中才能定位。
新增 `shardArtifactState.test.ts` 直接构造空 blocker 和单个 blocker，要求前者 ready、后者 blocked；
第二项测试要求 digest 是 64 位十六进制，并验证对象键插入顺序不同仍得到同一个值。这两项就是共享
机制全部职责的最小机械合同。

测试没有重复四个领域响应，也没有固定某个业务 digest 常量。领域测试继续检查 item 数量、kind、gate、
blocked code、ready 阶梯和具体摘要；共享测试只检查公共算法。两层测试按所有权分工，任何失败都能先
判断是 state 机制、某阶段 digest input，还是 response assembly。

## 九点五、为什么没有继续共享 context 与 result assembler

四个 context 都包含 source、items、controls、gates、blocked reasons、ready 和 digest，看起来还能再做
一层泛型。真正比较返回对象后可以看到，这种相似只存在于容器名称：每个阶段的 readiness 阶梯不同，
计数键不同，上游 digest 数量逐层增加，目录属性也分别叫 fields、criteria、slots、lanes。若共享 result
assembler，就必须让调用方传入大量字段回调或把响应强转成宽泛记录，TypeScript 将无法证明某个阶段
没有漏掉专属属性。

因此 context 只在单个文件内缩短参数列表，不作为跨文件公共类型；result helper 也保持领域专有。共享
state 停在两个可以用同一测试完整描述的规则上。这个决定使重复的七个 context 字段仍有少量文本成本，
却换来返回类型逐属性校验、对象顺序局部可读和更小的回归半径。以后只有出现三个字段集合真正相同的
阶段，才有理由再提升 assembler，而不能仅凭流程图相似就提前泛化。

## 十、完整 parity 证明了哪些间接消费者没有受影响

聚焦组包括 intake、review、submission、comparison 四个领域文件，共同运行二十一项测试；另一个核心
oracle 固定时间构造 ready 与 probes-disabled 两种完整 profile，比较超过 1.75 MB 的 JSON 和约 80 KB
Markdown 的长度与 SHA-256。四层 digest 会被后续很多 artifact 消费，所以只要任何 tuple、键、计数或
ready 值改变，完整 profile 摘要都会连锁变化。

迁移前后同一组测试全部通过，旧期望、fixture 和 normalization 没有修改。barrel identity 测试继续由
现有回归面保护，公共函数仍从原文件导出。这个证据比只断言四个新 helper 存在更强：它验证了整个下游
profile、renderer 和摘要链仍观察到完全相同的结果。

## 十一、维护性与优雅度数字如何解释

v2231 起点为 81 个近限文件、83 个长函数、208 个复杂函数、零导入环。四个 148-167 行入口退出账本后
变为 81/79/208/0；加上 v2230 的六个，本批从 89 累计下降到 79，净减十个。触及范围最大函数是
77 行 `comparisonResult`，最高复杂度 2。baseline 旧值首次只产生四个 stale key，没有 unknown、grown
或新 cycle，刷新后 ratchet 恢复 ready。

全仓最大函数仍为 171 行，因为榜首已转到复杂度 84 的 live-read-gate `createChecks`。这不是 v2231
失败，而是下一类热点已经显露：本版只处理 composition，v2232 会按 predicate group 拆 checks，并同时
移除该 long。name debt 仍为 4,444，受管 family 仍为 52；新增共享文件让总候选形状数多一，但没有形成
第三个成员或新的受管 family，终局门没有被规避。

## 十二、安全边界与跨项目证据关系

四个 builder 构造的仍是离线、只读治理 artifact。所有结果继续把 executionAllowed、writeRoutingAllowed、
startsServices、mutatesSiblingState、importsRuntimePayload、acceptsSyntheticEvidence 和 containsSecretValue
保持 false。v2231 没有修改 gate validator、权限 hook、route、配置、网络 client 或历史 fixture；shared
state 也不接触外部资源。

Java 与 mini-kv 不需要为本版产生新 evidence，可以 recommended parallel。Node 没有读取它们的工作树
状态作为完成条件，也不是兄弟项目的批准阻塞点。没有 HTML、页面或可视交互变化，截图不能证明 digest
与对象顺序，因此证据采用源码、直接单测、完整 profile hash 和维护性 census。

## 十三、后续修改时的故障定位顺序

若只有 ready 值在四个阶段一起错误，先检查 `resolveShardArtifactState`；若某一阶段 digest 改变但字段
值看似正确，检查对应 digest input 的键和 tuple 顺序；若 JSON 属性或 Markdown 顺序改变，检查对应
result assembler；若 items 或 gates 数量改变，则问题在已有 builder/validator，不应通过 state helper
修正。公共入口只负责调用顺序，调用缺失或前后颠倒才属于入口故障。

新增第五个同类阶段时，先写领域 digest input 和 result，再决定是否复用 state。只有 readiness 真正等于
“无 blocker”且摘要算法仍是 stable JSON 时才允许复用；否则建立领域规则，不能给共享 helper 增加布尔
开关。每次修改至少运行直接 state 单测、目标领域测试、完整双状态 parity、typecheck、lint 和
maintainability census，baseline 只在 stale 且无 grown 时收紧。

## 十四、测试验证与下一版衔接

本版收口验证包括五个领域/完整 profile 文件二十一项、共享 state 两项、typecheck、全仓零告警 lint、
security、archive、elegance、family、maintainability、renderer、source-size、governance 和文档质量门。
完整 test/build/smoke/远端 CI 按五版批次节奏留在 v2232，既避免每个纯结构版本重复昂贵验证，也保证
复杂度批次结束后有一次统一回归。

v2232 的第一目标是复杂度 84 且长度 171 的 `createChecks`，随后处理 85、76、76、72、71 等榜首。
它会按 source presence、identity、digest、credential、connection、permission 与 write/auto-start
边界建立具名 predicate groups，并用缺失、null、错类型和 conflicting evidence 测试证明 fail closed。
到那时全仓最大函数才有资格降到 163 以下，不能在 v2231 用删空行提前宣称。

## 十五、一句话总结

v2231 在完整 JSON/Markdown 和 digest 字节不变的前提下，把 intake、review、submission、comparison
四个长 composition builder 拆成十七行编排入口、领域 digest input、领域 response assembler 与一个
只负责 ready/digest 的共享 state 核心，使两版累计长函数 89→79，并把 171 行高复杂度检查函数明确交给
下一版继续收敛。
