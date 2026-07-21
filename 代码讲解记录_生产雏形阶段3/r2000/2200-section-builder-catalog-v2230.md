# Node v2230：controlled-shard 的 section builder catalog

## 一、目标与非目标：消除长入口，但不扩大展示合同

v2230 的直接目标，是处理维护性榜首的六个 section renderer。它们的函数跨度分别为 217、213、208、
197、196 和 170 行，共同特点不是算法复杂，而是一个公共函数连续写出许多 Markdown section。每个
section 单独看都很直白，合在一起却迫使维护者滚动两百行才能判断一处字段属于哪个阶段，也让新增一段
展示时容易误插到相邻阶段。完成本版后，公共入口仍保留原函数名和模块路径，但只负责按 catalog 顺序
调用短 builder；每个 builder 拥有一个标题及其字段或列表。

非目标同样重要。本版不新增 controlled-shard 功能，不改变 profile 对象，不增加 route，不接入真实
Java 或 mini-kv，不启动服务，不读取凭据，也不允许写入或生产执行。Markdown 里哪些领域字段可以展示
本身就是合同，不能因为想少写代码就把整个对象倾倒出来。重构的价值必须来自职责边界，而不是输出内容
变多、把字段名动态化，或者把两百行搬进一个新文件后宣称入口变短。

## 二、入口与调用关系：六个稳定函数位于哪条服务流程

总入口是 `renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown`。
它先渲染 profile 顶层摘要，再依次展开 source matrix、handoff summary、route coverage 与 live read-only
window 四组 sections。live window 组还组合 operator value supply、approval、signed artifact draft、text
package 与 candidate document 的已有子 renderer。此次修改的六个函数仍从原模块导出，调用者和 import
路径完全不动，因此外层总 renderer 不需要知道内部已经拆分。

调用方向保持单向：总 renderer 调稳定入口，稳定入口读取本文件的 builder catalog，catalog 中的函数把
同一个只读 profile 投影为 `{ heading, lines }`，最后仍由 `renderProfileEntrySections` 统一加二级标题和
尾部空行。builder 不反向调用总 renderer，也不访问 loader、配置或 route。这个方向保证拆分没有形成
导入环，更不会把展示代码重新耦合到领域构建过程。

## 三、响应模型：profile、section 与最终 Markdown 如何对应

输入 `ControlledReadOnlyShardPreviewProfile` 是已经计算完成的领域响应模型。它包含 source readiness、
drift、consumption plan、handoff、route archive、live window packet、operator evidence 和大量安全布尔值。
renderer 不负责判断这些值是否正确，只决定展示其中哪一部分。单个 section 的中间模型仍是
`ProfileEntrySection`：一个 `heading` 和一组已格式化 `lines`。最终输出则是一个字符串数组，由上层在
完整 Markdown 文档中连接。

本版没有创造第二套 section 类型。builder 直接返回既有结构，普通键值仍交给 `renderEntries`，需要人类
标签、数组 join、三级标题或自定义 item 句子的 section 继续使用显式字符串。这样响应模型只有三层：
领域 profile、既有 section、最终 Markdown；catalog 只记录 section builder 顺序，不储存领域值，也不
成为可执行模板语言。

## 四、为什么“直接 renderEntries 整个对象”被证据否决

在正式编辑前，先构造 ready 与 probes-disabled 两种真实测试 profile，把候选实现
`renderEntries(profile.preview.<object>)` 与当前函数逐行比较。结果两类 approval/capture section 都不相等。
原因不是对象键顺序偶然变化，而是领域对象比公开 Markdown 丰富：它还带有
`readyForManualEvidenceEntry`、`readyForLiveExecution`、`readyForProductionExecution`、额外计数及明细。
旧 renderer 有意识地只选取审计所需子集。

若直接渲染完整对象，代码确实能从二百行缩到十几行，却会悄悄扩大公共信息面，改变字节摘要，并可能让
读者误以为这些额外状态属于当前档案合同。更糟的是，未来领域对象新增属性时 Markdown 会无审查自动
增长。这个失败实验说明“少代码”不等于“优雅”：优雅首先要尊重边界。最终方案保留显式字段清单，只
重组 section 所有权，候选路线没有进入生产源码，也没有通过修改期望来合法化。

## 五、builder catalog 怎样表达顺序而不引入动态路径

每个文件现在有一个只读数组，例如 `MATRIX_SECTIONS` 按原次序列出 `sourceMatrixSection`、consumer、
drift、plan、checklist、digest、archive 与 export。入口对这个数组执行一次 map，把 profile 传入每个
builder，再交给既有 section renderer。顺序由源码中的函数引用直接表达，TypeScript 能检查函数存在且
参数兼容；没有诸如 `"preview.sourceMatrix.foo"` 的字符串路径，也没有根据标题进入 switch。

catalog 的作用只是把“有哪些 section、先后如何”从两百行函数体提升到十行左右的目录。点开一个名字，
维护者立即进入该阶段的全部字段；查看数组，又能一次看清整条文档流。新增阶段需要显式新增 builder 并
把它插入 catalog，代码审查会同时看到内容和位置。删除阶段也不会残留隐藏配置。它是一份可导航的目录，
不是把 TypeScript 类型系统绕开的配置文件。

## 六、三十九个短 builder 的职责如何划分

六个文件总共提取三十九个 builder：capture 两个、approval 三个、source matrix 八个、live window
十一个、route coverage 八个、handoff summary 七个。划分边界完全沿用原二级标题，因此没有发明新的
阶段概念。最小 builder 只渲染几项摘要，最大的 `matrixPlanSection` 为 60 行，负责 consumption plan
字段、步骤列表与 step record；其复杂度为 10，来自多个数组空值回退和 map，而不是交叉业务分支。

这种粒度比“每一个字段一个函数”更稳。一个 builder 内仍能从上到下阅读某个档案阶段的版本、状态、
digest、安全标记和明细，领域上下文没有被打散。另一方面，修改 route archive verification 时不再需要
越过七个无关 section。触及范围其余较大的 builder 为 46、37、35 行，远低于 120 行长函数线，也给以后
增加一两个合法字段留下空间。

## 七、深层 profile 访问为何只在两个文件中引入局部别名

capture 与 approval 的原代码反复访问长度很长的 `profile.preview.liveReadOnlyWindow...` 路径，同一
section 中每个字段都重复几十个字符。拆成 builder 后，如果原样保留，最大的 artifact helper 会正好
达到 121 行，只是从 217 行降到另一条红线。这里引入 `capture`、`artifact`、`draft`、`review` 和
`template` 五个局部别名；名字表达当前 section 的领域对象，作用域只覆盖一个函数，不会与其他阶段混淆。

其他四个 renderer 没有一律套用别名。它们包含嵌套 digest、数组 join、自定义标签和明细 map，保留
`profile.preview.<stage>` 能让每条人工标签直接对应来源。只在重复路径确实妨碍阅读处缩短，是“目录已
表达上下文时用短名”的具体实践；全仓批量改名公共类型既会制造迁移噪声，也不能降低真实复杂度，因此
本版 name debt 保持 4,444，不拿机械重命名刷分。

## 八、source matrix 为什么保留显式标签和嵌套列表

source matrix 是六个文件中结构最丰富的一组。基础 matrix 会展开每个 source 的三级标题；consumer
有 gates 与 comparison；drift summary 把 finding 格式化为维度、状态、严重度和消息；consumption plan
既有四十余个带人类标签的字段，又有普通步骤和包含 order/code/status/evidence/权限位的 step records。
这些不是 `renderEntries` 能无损替代的同一种形状。

本版只把八个 section 移到八个 builder，原模板字符串一字未改。特别是 `join(", ") || "none"`、
`join("; ")`、digest 的 value/scope/covered count，以及三级标题前的空行都留在本地。这样一旦 parity
失败，受影响的 builder 能直接指出是哪一种展示语法；公共 catalog 不需要为 source、finding、step 三种
item 建立带大量可选参数的万能 engine。

## 九、live window 的组合边界为何不能被 catalog 吞掉

live window 入口与其他五个不同。它先渲染本文件的十一段 packet/window section，随后展开五个早已
拆分的领域 renderer：operator value supply、approval、signed artifact draft、text package 和 candidate
document。AST 迁移第一次在这里停止，因为返回值是“本地 sections 加外部 sections”的数组，而不是单个
`renderProfileEntrySections` 调用。脚本没有假定所有函数形状相同后强行覆盖。

修正后的迁移保留外部展开表达式原样，只把第一个本地数组替换为 `WINDOW_SECTIONS` 的结果。因此
catalog 不拥有其他模块，也没有重新导出它们的细节。这个边界很关键：本文件负责 live window 的骨架，
子模块负责 operator/candidate 的独立阶段。入口仍然清楚展示组合顺序，未来某个子链调整时不必修改一份
集中了所有 section 的巨型注册表。

## 十、行为证据：完整 hash 比局部 contains 更能证明什么

核心 oracle 固定时间为 2026-07-20，分别构造上游 probes 可用的 ready profile 和
`UPSTREAM_PROBES_ENABLED=false` 的 blocked profile。每个 profile 的可移植 JSON 都超过 1.75 MB，
Markdown 分别为 81,829 与 80,224 字节。测试比较完整长度和 SHA-256，因此任何字段增删、section
换序、列表标点、空行或尾换行变化都会失败；它不是只检查几个标题仍然存在。

在 AST 迁移前先运行一次基线，迁移、别名和格式整理后再运行同一测试，两个状态的 JSON/Markdown
摘要完全不变。另有 source matrix、handoff summary、route coverage、live window 四个局部测试验证
section 数量和关键内容。测试期望、fixture 和 portable normalization 从头到尾没有修改。由此可以区分
“代码编译了”和“公共响应逐字节相同”两种强度完全不同的结论。

## 十一、维护性数字下降说明了什么，也没有说明什么

迁移前全仓有 81 个近限文件、89 个长函数、208 个复杂函数、零导入环，最长函数为 217 行。迁移后是
81/83/208/0，六个目标入口全部退出长函数账本，最大函数变为另一个尚未处理的 171 行 `createChecks`。
触及范围内最大函数只有 60 行、最高复杂度 10。baseline 首次运行只报告原六个 key stale，没有 unknown
或 grown；刷新后 ratchet 变绿，证明门只收紧没有放宽。

数字没有宣称全仓已经达到九分。长函数终局阈值是 70，当前仍有 83；最大函数阈值是 160，当前仍为
171；复杂函数、近限文件和命名债也尚未进入目标区间。本版只解决最长展示入口这一类问题。它没有减少
复杂函数，因为这些 renderer 本来复杂度就低，也没有通过删空行把 121 压成 120，而是让每个 section
成为独立、可命名、可测试的概念。

## 十二、为什么原定净减十个要拆成两个版本

计划最初要求 v2230 至少净减十个 long。六个 renderer 经过 AST 提取和一致格式整理后，源码加 baseline
已有约 2,268 个增删行；证据、解释和三千字讲解加入后会接近单提交约 3,000 行预算。榜单后四个目标是
124-167 行的 artifact composition builder，它们处理 digest、catalog、gates 与大响应对象，职责与
Markdown section 不同。把它们同时塞入本提交，审查者需要在两种重构模式间来回切换。

因此目标按责任拆开而非取消：v2230 实际净减六个 renderer long；v2231 单独处理 comparison、submission、
review、intake 四个相邻 builder，使本批累计净减至少十个，并把当前 171 行最大函数继续压低。计划中
写明偏差、原因、后继消费和停止条件，避免把未完成部分藏在“后续优化”四个字里。提交尺寸约束与质量
阈值同时成立，才有可复核的工程节奏。

## 十三、安全边界与跨项目并行关系

renderer 只读取内存 profile 并返回字符串数组。v2230 没有触碰 loader、route、schema、access guard、
approval ledger、digest 算法、环境变量或历史 sibling fixture；没有新增网络调用、文件写入、SQL/KV
操作、服务启动或生产执行权限。字段名中出现 live、execution、production 只是档案里的 readiness 与
禁用状态，不代表本版开启相应能力。

Node 不需要 Java 或 mini-kv 提供新版本证据，二者为 recommended parallel，也不把 Node 设为批准
前置。没有 HTML、页面或交互变化，截图无法证明 TypeScript 函数边界和 1.75 MB 响应 hash，因此本版
不创建图片。真正有证明力的材料是固定 profile、完整字节 oracle、maintainability ratchet 与源码中的
有序 catalog。

## 十四、测试验证、故障定位与后续维护方法

若以后完整 parity 只有 source matrix Markdown 变化，先根据局部测试确定是否落在该文件，再看八个
builder 中哪一段负责对应标题。若所有二级标题都丢失，检查稳定入口或 `renderProfileEntrySections`；
若只有某段多出领域对象新属性，说明有人绕过显式字段清单直接渲染完整对象；若 JSON 也变化，则问题在
领域 builder 或测试输入，不应通过 renderer 修复。catalog 顺序变化会影响后续全部字节位置，也能被
完整 hash 立即发现。

新增 section 时，应先判断它属于哪个现有文件的领域阶段，写一个不超过 120 行的 builder，再在 catalog
中显式放置。仅当第三个 section 重复同一种 item 文法时才提取共享 helper；不能预先建立万能配置。每次
修改继续运行双状态完整 parity、局部 renderer 测试、typecheck、lint 和 maintainability census。这样
catalog 保持目录作用，领域细节保持本地可读，机械门负责阻止无意扩面。

## 十五、一句话总结

v2230 在不改变任何 JSON/Markdown 字节和安全边界的前提下，把六个 170-217 行的 controlled-shard
展示入口重构为六份有序 catalog 与三十九个短 section builder，使全仓长函数从 89 降到 83、最大函数
从 217 降到 171，并把剩余四个 composition builder 以明确行预算和验收条件交给紧接着的 v2231。
