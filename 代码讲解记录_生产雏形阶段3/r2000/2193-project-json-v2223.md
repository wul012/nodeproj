# Node v2223：项目 JSON 证据访问边界讲解

## 一、阅读地图：这一版改了哪条调用链

本版处理的不是新业务功能，而是两条已经运行多版的证据 intake 调用链。第一条链路从 audit
route 进入 operator service lifecycle loader，读取 Node v385 的归档，再组合 Java v160 与
mini-kv v151/v150 的冻结证据；第二条链路读取 Node v387 归档，再组合 Java v161 与 mini-kv
v152/v151 的 declared lifecycle 证据。两条链最终都生成 JSON profile，并由各自 renderer 生成
Markdown。外部使用者看到的是路由、字段、checks、summary、blocker 和摘要，本版没有改变这些
表面；内部变化发生在“怎样安全地把项目内归档 JSON 变成可供领域代码读取的对象”这一层。

推荐阅读顺序是：先看 `src/evidence/projectJson.ts`，理解读取和收窄的失败关闭规则；再看两份
lifecycle intake 顶部新增的 import，确认它们只复用通用能力；最后看各自的 `createSourceNode...`
和 `createChecks`，确认版本含义、字段关系与 readiness 仍留在领域模块中。这样可以清楚地区分
“数据是否能被安全读取”和“数据是否足以批准某个只读 intake”，不会把两个问题混为一谈。

## 二、旧结构为什么不够优雅

旧代码在两份相邻服务的尾部各有七个几乎相同的 helper：`readProjectJson`、`valueAt`、
`includesAll`、`stringValue`、`numberValue`、`isDigest` 和 `stripBom`。单看每个函数都不长，甚至
很容易被当成无害样板；问题在于它们共同定义了证据边界。若一个副本未来开始拒绝数组 root，
另一个副本仍把数组强制转换成对象；若一个副本要求数值有限，另一个副本接受 Infinity；若 BOM
处理只在某处修复，两个 intake 就会对同一文件产生不同结论。重复的危险不是多了几十行，而是
安全语义出现了多个真相源。

旧 `readProjectJson` 还使用 `JSON.parse(...) as Record<string, unknown>`。类型断言只让编译器
闭嘴，并不验证运行时 root。合法 JSON 可以是数组、null、字符串、布尔或数字；这些输入被断言
成对象后，后续代码只能依赖偶然行为。当前冻结 fixture 都是 object，所以正常路径不会暴露问题，
但证据读取器的职责恰恰是对异常输入失败关闭。生产治理代码不能以“现有文件碰巧正确”替代边界
守卫，否则损坏或误投递的归档可能在不同消费者中产生不一致解释。

## 三、共享模块只拥有什么

`projectJson.ts` 的设计说明只有三行，明确它拥有项目内 JSON 文件访问和安全类型收窄；调用者
拥有版本路径、领域字段、readiness 规则和报告文案；任何缺失、损坏或错类型输入都收窄为关闭值。
这个边界刻意很窄。模块没有 Node v385、Java v160、mini-kv v151 等常量，也没有 route、checks、
blocker、summary 或“是否 ready”的概念，因此不会演变成把所有 evidence 业务塞进去的巨型工具箱。

文件名采用 `projectJson` 而不是较宽泛的 `projectEvidence` 还有一层机械原因。仓库 elegance gate
按目录和后缀统计结构 family，`src/evidence:evidence` 已经是受管 family；再增加一个 Evidence
后缀文件会无理由推高该 family。`projectJson` 准确描述数据格式，同时形成阈值以下的局部角色，
使新增抽象既符合命名预算，也不绕过“三次规则”。这是让架构意图和机械规则相互支持，而不是
为了通过检查随意换名字。

## 四、读取过程怎样处理 BOM 与对象根

`readProjectJson(projectRoot, relativePath)` 先按路径段拼出绝对路径。相对路径按正斜杠拆分，
因此 committed archive 路径在 Windows 与 CI 环境中都由 `path.join` 重新构造；缺文件立即返回
null，不抛异常，也不制造空对象来伪装证据存在。文件存在时，它读取 UTF-8 文本并调用仓库已有
的 `parseJsonEvidence`。后者已经拥有 UTF-8 BOM 去除语义，本版复用它，而没有出现第三份
`stripBom`。

解析成功后仍要经过 `isJsonObject`。判断条件同时要求值是 object、不是 null、也不是数组。
只有满足这三项才返回 `Record<string, unknown>`，其他合法 JSON root 也返回 null。异常捕获覆盖
损坏文本和文件读取错误。于是调用者只面对两种状态：可信到“对象形状”这一层的未知字段集合，
或者 null。它不会收到被类型断言伪装的数组，也不会因为 JSON 损坏把整个 HTTP 请求变成未处理
异常；后续 checks 会把 null 投影成空字符串、零或 false，从而进入 blocked 状态。

## 五、深路径读取为什么也要守住数组

`valueAt` 逐段访问字段，每一步都重新调用 `isJsonObject`。这比只判断
`typeof value === "object"` 更严格，因为 JavaScript 数组也是对象。如果路径中间节点意外变成
数组，旧实现可以继续按字符串 key 访问，产生难以解释的半成功状态；新实现立即返回 undefined。
这条规则不妨碍领域代码读取真正的数组字段，因为数组本身通常在路径终点返回，再由专用收窄
函数处理。换句话说，对象负责命名字段，数组负责序列，两种结构不会在遍历中被混用。

路径不存在、遇到 null、遇到标量或遇到数组中间节点都返回 undefined。调用者随后使用
`stringValue` 得到空字符串、用 `numberValue` 得到零，或显式比较 `=== true` 得到 false。这里
没有抛错，也没有宽松真值转换；报告能继续形成，但 readiness 必然不能因为错误形状而通过。
这正是治理型 control plane 需要的“可报告失败”，比崩溃或静默接受都更可审查。

## 六、标量和集合收窄的安全默认值

`stringValue` 只接受真实字符串，其他类型统一返回空字符串。`numberValue` 除了检查 number，还
要求 `Number.isFinite`，所以 NaN、Infinity 和负 Infinity 都回落为零。零本身仍被保留，不会被
`||` 错误替换；这对 check count、port count 和 blocker count 很重要。`stringValues` 只在输入
为数组时工作，并逐项过滤非字符串值，不把数字自动转成文本。它为后续 bounded-context 迁移
准备统一语义，但 v2223 不强行改造尚未触及的字段映射。

`includesAll` 保留“required 的每一项都必须出现”的显式集合关系。空 required 集合按数学定义
会通过，因此领域层仍负责决定 required 常量是否允许为空；共享层不偷偷加入版本规则。
`isSha256` 接受 unknown，并只认可 64 位小写十六进制。大写、长度 63 或其他字符都失败。函数名
从局部 `isDigest` 收窄为 `isSha256`，让调用处不用翻实现就知道校验的是哪一种摘要形状。

## 七、两份 intake 如何迁移而不改变领域语义

两份服务都删除 `node:fs` 和 `node:path` 的直接 import，改从 `../evidence/projectJson.js` 引入
六个短 API。原来位于文件尾部的十四个 helper 随之删除。service lifecycle 文件从 589 行降为
551 行，declared lifecycle 文件从 554 行降为 516 行。下降幅度不是本批最终目标，因为真正的
178/159 行 checks 热点留给 v2224/v2225；这一版先把数据边界稳定下来，减少下一步拆分时同时
修改读取与判定的风险。

迁移没有改 `createSourceNodeV385`、`createSourceNodeV387` 中任何字段名或访问顺序。字符串、数值
与布尔检查的旧安全默认值保持；`includesAll` 的调用参数和 required 条目保持；intake digest 的
生成输入保持。唯一可观察到的新语义是畸形非对象 root 被更明确地拒绝，而正常冻结证据输出逐字
相同。这个变化属于边界收紧，不是业务契约扩张，也不会让任何原本 blocked 的输入变成 ready。

## 八、字节等价是怎样证明的

只跑字段断言不足以证明重构等价，因为对象插入顺序、resolved path、summary 数量或 Markdown
空格都可能漂移。为此，本版在修改前后使用同一固定时间
`2026-07-21T00:00:00.000Z`，分别加载 service lifecycle 与 declared lifecycle profile，再对
完整 `JSON.stringify(profile)` 和完整 renderer 输出计算字节数与 SHA-256。验证同时覆盖本地优先
和 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 两种路径。

service lifecycle 的 JSON 始终是 15,922 字节，摘要为
`979c9b8feefed725ffc36a71f7c9ca848ebc3fe610bde75fb589c8361ef168ff`；Markdown 始终是
13,748 字节，摘要为 `ff34aaa902ccca2a470db1ebc47d8b2035921d48afdac8e95da34d4328b480c9`。
declared lifecycle 的 JSON 始终是 15,237 字节，摘要为
`23009992c1707ae5c572a877a26bde583081e3e8b2ea7402f5d063c5423164ff`；Markdown 始终是
13,047 字节，摘要为 `7155bae78bdb6a2b8e39111179591367a8fcbfe4ba4d08445e5e21f8f6174100`。
本地、强制 fallback、修改前、修改后八组结果一致，且没有修改 fixture 或测试期望。

## 九、负向测试覆盖了哪些错误模型

新 `projectJson.test.ts` 不只验证 happy path。第一组输入在 JSON 前加入 UTF-8 BOM，并验证嵌套
有限数值、混合数组中的字符串过滤和缺字段空字符串。第二组表驱动输入依次使用非法文本、数组、
null、布尔和数字 root，全部必须得到 null。第三组验证缺文件、数组中间节点、Infinity、字符串
伪数字和非数组输入都回落到安全值。第四组验证 required 集合缺项会失败，并验证 SHA-256 的
大小写和长度约束。

测试使用系统临时目录，每个 case 在 `finally` 中递归删除自己的目录。没有留下仓库内临时文件，
也没有启动后台进程。它与两份既有 lifecycle 测试一起运行，共 3 个文件、14 项测试，worker 上限
为 4。既有测试继续覆盖 ready 路径、Node archive 缺失时 blocked、受保护 route 的 JSON 和
Markdown 响应，因此共享 helper 的单元语义与领域 profile 的端到端语义同时受到保护。

## 十、为什么不直接复用另外两套证据 helper

仓库已有 `historicalEvidenceReportUtils`，但它服务的是“按配置路径解析兄弟项目历史证据”。它会
调用 historical resolver，在本地 sibling 路径与 committed fallback 之间选择来源，并生成带
configured/resolved path、size 和 digest 的 evidence metadata。v2223 要读取的是 Node 自己归档根
下的相对 JSON，例如 `e/385/...`；若强行套 historical resolver，项目内文件也会被误建模成上游
fallback，数据来源语义反而变模糊。因此 lifecycle 中真正的 Java/mini-kv 文件仍由原 evidence
模块读取，只有 Node 项目内 archive 交给 `projectJson`。

`archiveEvidenceEngine` 也已有 `archiveValueAt`、`archiveString` 与 `archiveNumber`，但它的入口
围绕一整组版本归档资产：JSON、Markdown、summary、浏览器快照、HTML、截图、解释、讲解、计划和
索引。为了读一个 source profile 而先构造完整 `ArchiveEvidenceRefs`，会把不需要的归档清单协议
带入普通 intake；反过来把它的私有 `readJson` 直接导出，又会让一个负责版本归档完整性的 engine
承担任意项目文件读取。两者都扩大了已有模块职责。

所以三者的分工是互补而非重复：historical helper 负责跨工作区证据定位和元数据，archive engine
负责版本交付物集合及完整性，project JSON helper 只负责给定项目根与相对路径后的对象读取和安全
收窄。这个判断也给后续复用设了停止条件：只有调用者已经知道项目根和相对路径、且不需要来源
选择或归档集合时，才使用 `projectJson`。若未来出现第四种读取模式，应先判断能否落入这三条边界，
不能因为函数名字相似就继续增加同义工具。

## 十一、CI action 更新为什么放在同一版

GitHub Actions 最近的成功 run 已提示 JavaScript action 的旧 Node 20 runtime 将被 runner 强制
迁移。本版把 `actions/checkout` 与 `actions/setup-node` 从 v4 更新到官方 v7。这个改动与共享
读取内核同属“基础运行环境维护”，且只有两行版本引用，不值得制造一个只有 YAML 改动的空心
版本。重要的是它没有顺手改变项目 Node：`node-version` 仍为 22，npm cache 仍开启，permissions、
paths trigger、coverage、build、health、metrics、release smoke 和 cleanup 步骤全部保持。

远端 CI 不在每个中间版本重复触发。本批会在 v2227 收口后统一 push 和运行 Node Evidence，届时
action v7 的 hosted runner 行为与全部源码重构一起验证。v2223 的本地证据只声明 workflow 配置
保持，不提前把尚未运行的远端结果写成通过。

## 十二、机械门给出的当前结论

typecheck、定向 ESLint 零警告和 focused tests 已通过。security scan 检查 8,341 个文本文件，
18/18 配置项通过；archive retention 为 7,147 个文件、64.38 MiB/80 MiB；renderer census 保持
242/245 标准化、3 个 composition-only waiver、0 个非豁免；source-size 仍为 0 个超过 800 行。

elegance name debt 保持 4,537，没有因为新增模块和 API 上升；结构 family 总数因一个阈值以下的
`projectJson` 局部角色从 159 变为 160，但受管 family 仍为 52，family gate 全部通过。维护性
基线保持 83 个近限文件、98 个长函数、217 个复杂函数和 0 个导入环。本版没有假称已经删除
checks 热点；它完成的是为 v2224/v2225 的真实下降建立单一数据边界。

## 十三、安全边界与下一步

共享模块只读项目内文件，不访问网络、不写 archive、不启动 Java 或 mini-kv、不读取凭据值，也
不改变 execution authority。两个 intake 的 `readyForRuntimeLiveReadGate`、start/stop、mutation、
managed-audit connection 和 production readiness 字段都由完整字节等价证明保持。Java 正由另一
会话推进 route split，mini-kv 只有用户文档改动；本版对它们只读检查，没有构建、测试或修改。

下一版 v2224 会在这个稳定读取边界之上迁移 operator service lifecycle bounded context：目录
承担长领域前缀，types、sources、checks、profile、renderer 和 archive verifier 使用局部短名；
178 行、复杂度 88 的 checks 会按 Node source、Java、mini-kv 与 runtime boundary 分组。因为 v2223
已经锁住读取语义和完整输出，下一版可以把注意力集中在业务判定的可读性，而不同时承担 parser
变化。工程意义可以概括为：本版把重复的“能否安全读到数据”变成一个可测试事实，为后续把
“这些数据意味着什么”拆成清晰领域规则奠定边界。
