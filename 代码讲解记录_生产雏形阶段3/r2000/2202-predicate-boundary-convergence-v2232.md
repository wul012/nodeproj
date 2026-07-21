# Node v2232：从布尔长墙到可审计的判定边界

## 一、这一版究竟解决什么问题

归档验证服务的外观很容易让人误判：它们只是返回一组 true 或 false，似乎没有复杂算法。实际困难在于，
一个 `createChecks` 往往同时读取来源摘要、判断归档文件是否存在、沿多层 JSON 路径取值、核对 Markdown
文字、验证 digest、检查权限边界，再把二三十个结果按固定键序装进响应。任何一项写错都可能产生两类严重
后果：把缺失证据误认为通过，或者改变历史 JSON/Markdown 的字段顺序与摘要。v2231 结束时，全仓最高复杂度
85、最长 171 行的函数都集中在这类判定代码，说明问题不是业务规则太多，而是规则、取值和装配没有边界。

v2232 没有删除检查项，也没有把条件压成一行来躲过扫描。它把真实职责分成三层：外层服务负责 I/O 与
响应生命周期，领域 evaluator 负责可命名的 predicate groups，archive kernel 只负责严格的结构操作。
拆分后，读者可以先看外层知道数据从哪里来，再进入对应领域看为什么通过，最后只在怀疑通用取值语义时
查看 kernel。每层都有不同的修改原因，因而不是把一个大函数机械切成许多无意义薄包装。

## 二、输入和输出在调用链中的位置

以 decision archive 为例，外层入口先从配置和冻结路径加载 JSON、summary、Markdown、浏览器快照、中文
解释、代码讲解、计划索引与归档索引，同时建立来源 Node 版本摘要和文件引用。这里的输入既有结构化对象，
也有原始文字和 `exists/byteLength` 元数据。外层随后把已经解析好的值交给 `createDecisionArchiveChecks`，
得到完整的严格布尔对象；最后计算通过数量、ready 状态、blocker 与 verification digest，并组装公共响应。

领域 evaluator 的输出不是新的报告，也不读取磁盘。它只返回原类型定义要求的 checks 对象，键名、键序
和布尔语义保持不变。也就是说，HTTP route、renderer 和下游消费者仍只认识原服务；新模块是内部判定边界，
不是旁路 API。这样的所有权安排防止 companion 文件逐渐长成第二套入口，也避免文件系统异常与领域真假
判断混在一个函数里。

## 三、为什么建立 archiveVerification 目录

decision、closure、intake 与 integration 四个归档验证拥有共同的工作形态，却不能合并成一份动态配置。
它们都需要安全取多层值、检查文件、核对 digest 和边界，但字段名、期望文字、来源版本、计数以及下一步
决策完全不同。若创建一个接受几十个字符串路径和期望值的万能验证器，TypeScript 只能看到宽泛记录，
审查者还要在运行时配置中追踪每个条件，反而更难证明遗漏字段会失败。

因此目录表达“归档验证”这一上下文，文件名只表达域：`decision.ts`、`closure.ts`、`intake.ts`、
`integration.ts` 与 `kernel.ts`。目录已经提供语义，文件无需重复一百多字符的前缀。这个设计也通过结构族
门证明没有创造第三套 `*Checks` 或 `*Utils` 平铺家族：受管 family 仍是 52，旧 checks、utils 上限没有
放宽。短名来自目录上下文，而不是把公共导出随意改名；外部导出和类型完全不变。

## 四、kernel 的职责为什么必须很小

`kernel.ts` 提供五类机制。`valueAt` 只在当前值是非数组对象时继续下降，否则立即返回 undefined；
`allBooleanChecksPass` 要求输入是普通对象、键数精确相等且每个值严格等于 true；`arrayHasIds` 只接受
对象数组中的 id；`isDigest` 只接受 64 位小写十六进制字符串；`mergeArchiveCheckGroups` 按参数次序执行
对象合并。它们处理的是结构安全，不知道 Node 版本、route、权限或“ready”是什么意思。

这个停止边界非常重要。kernel 不应该增加“如果字段缺失就使用默认 true”，也不应该根据 profileVersion
自动选择检查集合。前者破坏失败关闭，后者把领域规则藏进通用层。未来新的 archive 可以复用这些机制，
但必须在自己的领域文件中写出期望字段和文字。只有当第三个完全相同的结构机制出现，才扩充 kernel；
不能因为两个条件看起来相似，就提前做一个无法审计的规则解释器。

## 五、严格路径读取如何阻止假阳性

旧长函数中常见多层访问，例如 `archive.json?.decisionRecord?.decision`。大量可选链本身没有错，但每个
函数会重复判断 null、数组和错误类型，有些位置还可能用字符串转换把坏数据变成可比较值。`valueAt` 把
这一机械规则统一：起点允许是对象或 null；每下降一层都要求普通对象；遇到 null、数组、字符串、数字或
布尔值立即返回 undefined。领域条件再与精确字面量比较，undefined 自然得到 false。

这里没有使用“宽容解析”。归档证据是批准链的一部分，错类型不应被猜测。测试专门传入数组和 primitive，
证明路径不会穿透错误容器；ID 集合测试还混入 null 与字符串，证明只有真实对象 id 才计入集合。这样缺失、
错类型和部分损坏都落到 blocked，而不是通过 String(value) 或 truthy 判断获得假阳性。

## 六、有序 check group 为什么不是普通重排

最终 checks 对象既用于计数，也会进入 JSON、Markdown 和 digest，所以组间次序是合同的一部分。v2232
没有用字母排序，也没有遍历一个无序注册表。每个领域入口按原连续键区间调用具名 group，再由
`Object.assign({}, ...groups)` 按参数次序合并。组内对象字面量继续按旧键序书写，组间顺序也与旧函数一致。

新增单测用三个带不同键的 group 检查 `Object.keys` 的结果，证明 helper 不会排序或丢失键。完整领域测试
则从 route/profile 层验证检查数量、ready 和输出。两层证据互补：kernel 测试锁机制，领域测试锁业务。
如果以后有人调整 group 顺序，即使布尔值都相同，键序测试和完整输出 oracle 仍有机会立即暴露漂移。

## 七、decision 与 closure 为什么分别保留领域文件

decision archive 关注输入是否完整、决策是否允许进入 prerequisite closure、是否记录不读取 credential、
不解析 raw endpoint、不实例化 provider/client 等边界。closure archive 则关注关闭条件、完成项、剩余项、
未来版本指向以及 closure review 的证据。两者都读取 archive，却代表批准链上的不同状态跃迁。

把它们放进同一个动态数组会让诸如“20 项 source checks”和“future prerequisite closure”之类的意义变成
索引与字符串。当前文件各自用 `archiveSourceChecks`、领域记录检查、内容检查、文档检查与 boundary checks
组织条件。函数名描述一段连续理由，条件仍逐项显式。审查者可以在一个文件里回答“为什么 decision ready”，
无需同时理解 integration smoke 或 non-secret intake 的规则。

## 八、intake 与 integration 的失败边界差异

non-secret intake 主要证明输入材料没有 secret、credential value、raw endpoint URL 和执行指令；它还核对
来源 packet、文件、摘要与文档。minimal read-only integration archive 则消费真实只读演练记录，检查 smoke
target、operator/CI handoff、读操作范围和无写入边界。两者都必须失败关闭，但风险模型并不相同：前者防止
危险材料进入链条，后者防止已运行证据被误述为更高权限。

v2232 只共享结构操作，不共享这两套风险词汇。integration 仍显式检查每个 target 与 handoff 状态；intake
仍显式检查 prohibited material 和来源计数。这样任何字段新增都必须由对应域审查，不能因为通用模板默认
忽略未知字段而悄悄通过。类型定义继续约束最终 checks 的完整性，漏键会在 typecheck 阶段失败。

## 九、echo 与 readiness reference 的拆分原则

除四类 archive 外，最高复杂度列表还包含 upstream echo 与 readiness reference。它们的问题同样不是 I/O，
而是一个函数连续比较 Node、Java、mini-kv 的 identity、digest、credential、connection、permission、write
和 auto-start 事实。`echoCheckGroups.ts` 把这些连续领域聚合成具名比较组，调用方继续拥有来源加载与最终
ready 计算。它不访问磁盘，也不决定缺少哪个上游版本时去哪里 fallback。

readiness reference 则改为 evaluator：它接收已经类型化的 reference，只回答 v101 gate 或 v107 alignment
是否满足原条件。这里没有新建第三个同形文件，两个 evaluator 共享同一语义边界。文件短名低于新增命名
预算，调用方的超长公共名称不被批量改动，避免借重命名公共合同刷 name debt。

## 十、release、retention 与 abort/rollback 的语义保真

release handoff 和 evidence retention 原先各有长 checks 函数，其中包含容易看反的否定条件，例如 step 不得
连接生产数据库、不得允许 execution。拆分到 `releaseGateCheckGroups.ts` 时保留原否定语义，没有把字段名
中的“allowed”误读成目标 true。focused 测试继续覆盖失败与通过路径，因此任何一项错误取反都会导致 gate
状态变化。

abort/rollback evaluator 则从 transition 自身取得目标 prerequisite id，而不是让外层重复传入同一个常量。
这既把外层函数恢复到旧行数 ratchet 以内，也消除两个可能不一致的真相来源。evaluator 依次检查 source、
required fields、prohibited fields、transition 与安全边界；它不执行 rollback，也不创建命令。一次中间审查
发现两项条件曾被误写为固定 true，随即恢复为真实 rejection count 与 no-go `every(false)` 判断，并由原测试
证明语义一致。这说明拆分后的代码仍要逐条件审查，不能只依赖编译通过。

## 十一、为什么最大复杂度下降不是压行得到的

本版前后的物理数字是 `81/79/208/0` 到 `73/72/193/0`：近限文件净减八个、长函数净减七个、复杂函数
净减十五个、导入环保持零。最大函数由 171 行降到 163 行，最大复杂度由 85 降到 59。所有下降都来自
具名职责提取，未合并语句、未隐藏 AST、未把代码搬出 `src`，也未给扫描器增加 ignore。

触及文件中的 group 大多只负责一个 predicate 主题；外层文件因移出布尔长墙而退出近限和复杂账本。
新模块都低于 800 行，source-size census 仍为零。maintainability baseline 刷新时只记录当前更低集合；扫描
先暴露 abort loader 多一行的增长，再通过消除重复 target 参数修复，而不是把增长写入基线。这是 ratchet
真正发挥作用的例子：全局净下降不能掩盖局部新债。

## 十二、结构族门如何改变了初版设计

最初提取出的文件暂名 `decisionArchiveChecks`、`closureArchiveChecks` 等，共使 `src/services:checks` 从五个
增长到十一个，通用文件也使 `utils` 从三个增长到四个。尽管代码更短，elegance census 正确判定为失败，
因为第三个结构相似文件已经出现，而设计仍在平铺复制角色后缀。不能通过刷新 baseline 批准增长。

最终方案把归档域放进一个目录并以域命名，kernel 表达共享机制；readiness 与 abort 使用 evaluator 角色；
echo 与 release 两个 group 文件尚未达到第三次规则。扫描结果是 209 个观察 family、52 个受管 family，
`Ready: true`，checks 与 utils 旧基线未增长。这个修正不是为了取巧改后缀，而是让目录真正承担上下文，
文件名承担局部角色，结构比平铺长名更容易导航。

## 十三、测试矩阵怎样覆盖重构风险

聚焦组包含 21 个测试文件、64 项测试，最多四个 worker。四类 archive 测试验证文件、来源、检查数量、
ready 与边界；echo、live gate、decision prerequisite、release、retention、deployment、route cleanup current/
checklist、dry-run、runtime candidate 和 abort/rollback 测试覆盖其调用链。kernel 的五项直接测试分别锁定组间
键序、错误 boolean 容器、路径读取、ID 集合与 digest 形状。

typecheck 负责证明拆分后完整 checks 类型没有漏键；全仓 lint 零告警证明 import、未使用值和风格没有退化；
maintainability、elegance、family、renderer 与 source-size census 分别证明债务真实下降、结构族未增长、
rendering family 未反弹、非豁免 renderer 为零且没有超限文件。测试期望、fixture 与 normalizer 均未修改，
因此通过来自生产代码保持原合同，而不是移动门柱。

## 十四、九分门为什么仍然不能通过

v2232 完成后，最大复杂度、renderer logic、source size、导入环、非豁免 renderer 和 family 数已经达标，
但终局门仍有六项红色：近限文件 73 大于 70，长函数 72 大于 70，复杂函数 193 大于 170，最大函数 163
大于 160，name debt 4,444 大于 4,200，verification family logic 1,320 大于 1,000。门使用绝对阈值，不能
用最大复杂度的富余去抵扣 name debt，也不能因为这一版净减十五个复杂函数就提前授予九分。

下一批应优先选择同时命中 verification logic、超长公共命名与函数热点的 bounded context，避免单纯重命名。
只有把私有实现迁入有目录上下文的短角色文件，并用既有输出 oracle 证明行为不变，才会同时产生可读性和
数字收益。`npm run elegance:nine` 在全部十二项绿之前必须非零退出，这个诚实失败正是本版交付的一部分。

## 十五、跨项目与运行边界

本版只重构 Node 内部判定，不读取新鲜 Java 或 mini-kv 证据，不启动它们，不修改历史 fixture，也不改变
任何跨项目 schema。Java 与 mini-kv 因而可以 recommended parallel；Node 不是它们的批准前置。归档服务
继续通过既有 resolver 使用本地或历史证据，强制 fallback 语义没有改变。

同样，本版没有新增 route、HTTP/TCP、数据库写入、credential 读取、raw endpoint 解析、provider/client
实例化或执行权限。没有 HTML/UI 变化，所以截图不适用，不能为了满足目录形式创建空图片。讲解完成后，
四个顺序 shard 在最多四个 worker 下通过 586 个文件、1,805 项测试，build 通过；默认安全 smoke 与强制
access guard、historical fallback 的受保护 smoke 均通过，两个服务按 PID 关闭。远端 coverage/CI 留给推送
后的机械复核。到这里，v2232 的价值是让最危险的布尔长墙变为可定位、可失败、可继续收敛的边界。
