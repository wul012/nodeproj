# Node v2222 代码讲解：让 fake-transport 证据拥有清楚边界

## 目标与非目标

改造对象是 `managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification.ts`。旧文件有
740 行，同时读取 Java v103 文本、解析 mini-kv v112 receipt、投影 Node v255/v256、计算十九项检查、
整理阻塞消息并组装公开报告。它没有业务错误，但维护者只想确认一个 cleanup 默认值时，也必须穿过整条
报告链。更危险的是，证据读取、失败关闭规则和展示字段混在一起，字段迁移很容易把“缺失即阻塞”误写成
普通默认值。本版目标是重新划分责任并删除机械热点；非目标是增加能力、修改 receipt、改变 route 或打开
真实执行。任何可观察输出变化都应让本版失败。

## 稳定入口没有变化

路由、renderer 和其他服务仍从原文件调用
`loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification`。公开函数名、profile 类型、
route path、renderer re-export 与对象键顺序都没有迁移。新文件 `src/evidence/fakeTransportEchoReferences.ts` 是内部来源模块，
只导出 Java v103、mini-kv v112 reference builder 以及报告已经公开展示的两个路径常量。消费者不需要知道
字段规格，更不能绕过完整 profile 把历史证据当成执行授权。

## 两个模块各自知道什么

`src/evidence/fakeTransportEchoReferences.ts` 知道兄弟项目证据在哪里、应出现哪些 snippet、receipt 的 snake_case 字段如何映射、
缺失字段取什么危险侧默认值，以及一份 reference 何时可以称为 aligned。原 profile 服务继续知道 Node
v255/v256 如何投影、四方数据应满足哪些横向关系、哪些失败组合成 blocker、最终 digest 和 summary 如何
生成。这个边界把“读懂一份来源”和“比较多个来源”分开，依赖方向只有 profile 指向 sources，没有反向
import，维护性扫描因此仍为零循环依赖。

## 为什么没有建立万能证据框架

仓库已有 `historicalEvidenceReportUtils.ts`，能提供路径回退、JSON 对象读取、snippet、标量类型检查和
`mapReceiptFields`。v112 只是浅层 text、flag、count，不需要再引入 schema 库或动态规则解释器。新模块
复用现成 engine，但保留 fake-transport 独有的 packet、archive、timeout 和 cleanup 语义。若把 v111 与
v112 强行塞进一份巨大通用配置，审查者反而看不出两份 receipt 的领域差异，本版刻意没有走那条路。

## 五组字段规格就是数据边界

mini-kv v112 的字段按原序分为 `V112_IDENTITY_FIELDS`、`V112_SOURCE_FIELDS`、`V112_REQUEST_FIELDS`、
`V112_RESPONSE_FIELDS` 和 `V112_RUNTIME_FIELDS`。每个元组同时声明 TypeScript 目标名、JSON 源名、
`text/flag/count` 类型与 fallback。`mapReceiptFields` 按规格顺序插入属性，并拒绝重复目标字段。维护者现在
可以在一张紧凑清单里审查映射关系，不必在四十多次 `booleanField(...) ?? ...` 调用之间来回比对。

## 缺字段为什么不能都默认 false

这是安全报告，不是表单。`executionAllowed`、`storageWriteAllowed`、`credentialValueReadAllowed`、自动启动和
外部请求等字段若缺失，必须按 `true` 处理，使 readiness 失败；否则残缺 receipt 会被误判为“明确禁止”。
`sourceCleanupArtifactCount` 与 `cleanupArtifactCount` 缺失时仍是 `-1`，不能伪装成零残留。只有上游明确提供
false 或零，报告才承认边界关闭。新规格逐项保留旧默认值，没有为了表格整齐把危险侧差异抹平。

## identity 规格证明消费的是哪份合同

identity 层读取 receipt version、release version、consumer hint、receipt digest、source packet profile、
packet state 和 archive state。`hasV112Identity` 还要求 evidence 文件与 snippet 全部存在，并检查 digest
符合 `fnv1a64` 形状。这样，一个字段恰好齐全但版本错误的 JSON 不会通过；一份文本写得正确却没有对应
结构字段的归档也不会通过。identity 的作用是先证明“这是谁的证据”，再讨论内容是否安全。

## source 规格保留 packet 与 archive 语义

source 层不只比较 8 个请求字段、9 个响应字段、6 个失败映射和 15 秒超时。它还要求 fake transport packet
ready、source 仅限 fake/dry-run、cleanup verified，并明确拒绝 archive 重跑行为、真实 adapter connection
ready 和临时目录或文件残留。`hasV112SourceShape` 把版本、计数与布尔边界放在同一领域问题下，替代原来
从第 413 行连续到第 435 行的匿名长链，失败位置因而更容易定位。

## request 与 response 分开审查

request 的三项边界是 credential value、raw endpoint URL 和可能含秘密的 payload；response 的五项边界是
connection attempted、external request sent、credential read、schema migration 与 production write。
两组字段都要求 false，但仍分成两个规格和一个具名 `keepsV112PayloadClosed` 判定。分组让审查者能分清
秘密是否在发送前进入请求，与执行后是否发生副作用，而不是把八个 false 当成没有语义的布尔集合。

## runtime 层回答谁可以执行

runtime 层要求 `readOnly` 和 `dryRunOnly` 为 true，并要求执行、四方自动启动、存储写入、凭据加载、外部
请求、临时文件、restore、SETNXEX、backend 身份和订单权威性全部为 false。cleanup count 另行严格等于零。
`keepsV112RuntimeClosed` 因此表达一个完整问题：mini-kv 是否只是非参与证明，而不是被悄悄赋予后端角色。
它不会因为某个展示字段正确，就忽略实际执行许可仍开启的情况。

## Java v103 为什么仍使用 snippet

Java v103 没有供 Node 直接解析的统一 receipt，所以 reference 继续从 runbook、代码讲解和 builder 中验证
schema、marker、Node v255/v256 消费关系、Node v257 下一消费者、计数和副作用声明。迁移没有把文本匹配
伪装成 JSON schema。`isJavaV103Ready` 显式比较版本和计数，再用类型约束的 true/false 字段清单确认所有
副作用关闭。证据媒介不同，但最终仍落到同一“来源身份加安全边界”模型。

## 类型化布尔清单的限制

`allBooleanFieldsAre` 接收的 key 必须真的是 reference 的布尔字段，并且拒绝空清单和重复 key。它适合表达
一组同方向的安全断言，却不负责版本字符串、计数或正则。因此 Java 与 v112 只把纯布尔部分放进清单，
其他关系留在具名函数里。这样既消除高复杂度长链，又没有把所有判断塞进一个失去类型和领域名称的数组。

## 对象键顺序为什么也是合同

报告会序列化为 JSON，也会按相同对象顺序渲染 Markdown；digest 与下游归档都能观察属性插入顺序。
五个规格组严格按旧实现顺序 spread：identity、source、request、response、runtime，最后写
`readyForNodeV257Alignment`。基础 reference 先把 ready 置 false，再 shallow copy 覆盖同一键，键的位置不会
移动。预言机因此保护的不只是值集合，还保护可观察的完整序列化合同。

## raw evidence metadata 为什么保留

旧实现用文件原始 Buffer 和 stat 计算 evidence size 与 SHA-256。共享 helper 默认规范化换行，适合新合同，
但直接采用会让 CRLF checkout 的历史摘要变化。本版和 v2221 一样显式传入 `{ textMode: "raw" }`，只对
这些已有报告保留旧语义；snippet 仍按文本内容匹配。raw 不是新默认值，也不能跳过 JSON 解析，它只是
一个有旧字节预言机约束的窄兼容开关。

## 中文路径暴露出的真实迁移风险

首次 focused 测试显示 Java evidence 全部 missing，mini-kv 文档 snippet 也未命中。原因不是 resolver，而是
PowerShell 终端把旧文件中的中文路径显示成乱码，迁移时若复制显示文本，就会把错误码位写回源码。修复时
直接从 `git show HEAD:<path>` 读取原文件并逐字符输出 Unicode 码位，再用 `\uXXXX` 字面量重建运行时字符串。
这样源码保持 ASCII 稳定，运行时路径仍是“解释/说明”和“代码讲解记录_生产雏形阶段”。

## 为什么这次不能更新测试摘要

乱码路径造成 ready 变 blocked 时，最省事的错误做法是接受新输出或修改 fixture。本版禁止那样做，因为
重构目标就是行为不变。恢复真实码位后，完整预言机 5/5 立即回到旧摘要，证明问题在实现而不在期望。
这个过程也说明固定 JSON/Markdown SHA 的价值：普通字段断言只能看出若干值错误，完整摘要会连 evidence
path、snippet 状态、blocker 顺序和渲染文本一起报警。

## Node v255 与 v256 投影没有搬走

`createSourceNodeV255` 和 `createSourceNodeV256` 仍在 profile 服务，因为它们读取本仓库当前 loader 的返回值，
不是兄弟项目历史证据。v255 提供 packet、request、response、failure、timeout、cleanup 和副作用边界；
v256 提供 archive 状态、文件与 snippet 数量，以及“不重跑 fake transport”的证明。把它们留在组合层，
避免 sources 模块同时拥有本地实时对象与外部历史文件两种生命周期。

## 顶层十九项 checks 如何变得可读

`createChecks` 保持原十九个键及顺序，但将大段关系交给 `keepsSourceBoundariesClosed`、
`hasAlignedRequestShape`、`hasAlignedResponseShape`、`hasAlignedCleanup` 和四个 side-effect boundary 函数。
组合根现在像一张检查目录：来源是否 ready、形状是否一致、超时和失败映射是否一致、各类边界是否关闭。
读者不必在一百多处分支中推断某个 false 属于请求还是写入权限。

## 横向对齐与来源 readiness 不混为一谈

Java 和 mini-kv reference 各自先完成内部 readiness；顶层再比较它们与 Node v255/v256 是否在请求数、响应数、
超时、失败映射和 cleanup 上一致。两层不能合并：来源内部完整，不代表四方值相同；四方恰好给出同一个数，
也不代表 evidence 身份和副作用声明完整。分层后，blocker 可以区分“某来源没准备好”和“来源之间合同不
一致”，诊断信息比一条总布尔值更透明。

## 四类副作用边界各自负责什么

credential boundary 检查 Node 和 Java 没有读值、mini-kv 没有许可也没加载；connection boundary 检查没有
尝试连接或发外部请求；write boundary 检查没有生产记录、存储许可、写执行、backend 或权威身份；auto-start
boundary 检查 Java、mini-kv、Node 和外部审计服务都不会自动启动。四个函数虽然都返回 boolean，却代表
不同事故类型，不能为了减少函数数量再合成无名的副作用数组。

## 服务流程：state、digest 与 summary 的生成顺序

`src/services/managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification.ts` 的 loader
先构造四个 source/reference，再创建 checks；最终 ready 键通过共享
`allReportChecksPassExcept` 检查其余十八项。随后才确定 verification state，并以 profile version、state、
两个 Node digest、Java marker、mini-kv receipt digest 和完整 checks 生成稳定摘要。blocker、warning、
recommendation 在 summary 之前收集，因此数量与实际数组一致。重构没有改变任何一步的输入或键顺序。

## blocker 顺序继续表达诊断优先级

`collectProductionBlockers` 仍按 Node 来源、Java echo、mini-kv 非参与、shape、boundary、runtime 开关排列。
规则数组与旧版相同，只是读取的新 reference 来自独立模块。负向 oracle 把 Node source 和 actions 同时置为
不安全，要求输出先出现 `NODE_FAKE_TRANSPORT_SOURCES_NOT_READY`，再出现 `UPSTREAM_ACTIONS_ENABLED`。
这防止未来用无序集合收集错误，导致操作员每次看到不同的首要原因。

## 四维字节预言机具体保护什么

测试固定 `generatedAt`，分别运行本机来源和强制 historical fixture fallback；每条路径都验证 ready 与
actions 开启的 blocked 形态，并同时计算 JSON 和 Markdown。Windows raw ready 是 26,350 与 25,977 字节，
portable ready 是 25,240 与 24,867 字节；blocked 也各有独立长度和摘要。portable 副本把 repository
绝对根替换为 `<repo>`、统一斜杠，并将证据文本按 LF 重算 `sizeBytes/digest`；这些操作不改变生产 profile，
因此 Linux 与 Windows 比较的是同一业务内容，而不是各自 checkout 的路径和换行表示。

## 首轮 Linux CI 为什么失败

首轮 run `29801098105` 的 typecheck、lint 和全部静态门均通过，测试阶段只出现 portable 哈希差异；v2221 与
v2222 的 JSON/Markdown 字节长度完全相同。Linux 实际哈希分别是
`be416997.../4c657eee...` 与 `cda7000a.../e006f8dd...`。Windows 在测试副本中按 LF 重算证据元数据后立即得到
同一组值，这形成了独立的根因证明：差异不是字段、顺序、默认值或 renderer 漂移，而是 raw 模式有意保留的
CRLF/LF 元数据泄漏进了“portable”视图。

修复采用结构守卫，只处理同时具有 `id/path/resolvedPath/exists/sizeBytes/digest` 且确实存在的证据记录；普通
业务对象中的 digest 不会被替换。单元测试创建逻辑内容相同的 LF 与 CRLF 文件，先证明 raw 大小不同，再证明
规范化后的大小和摘要一致，并在 `finally` 中删除临时目录。这样修复的是预言机的噪声模型，而不是拿 Linux
结果覆盖 Windows 期望；生产 raw oracle、fixture 与 renderer 全部不动。

## 为什么 focused 测试使用单 worker

历史 evidence resolver 直接读取 `process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK`。多个测试文件在线程
worker 中同时切换这个进程级变量时，会互相看到短暂状态，表现为几个本来无关的旧报告一起 blocked。首次
六文件并行运行就复现了这一点。按超时与 fallback 规则，先单独跑失败文件，再用 `--maxWorkers=1` 跑相关组，
最终 6 文件 22 项全绿。产品逻辑未因测试隔离问题被修改，最终全量也将采用有界、可复现的分片策略。

## 维护性账本究竟减少了什么

重构前账本为 84 个近限文件、99 个长函数、220 个复杂函数、0 个导入环。旧服务 740 行；
`createMiniKvV112Reference` 为 143 行且复杂度 98，`createChecks` 复杂度 70，Java builder 复杂度 38。
重构后 profile 468 行、sources 335 行，两个文件都没有 long/complex 条目；账本收紧为
83 / 98 / 217 / 0。下降量精确对应旧热点，没有把复杂度移动到新文件。

## 治理增长门怎样修正了模块位置

前六个全量分片通过后，第七分片的 `governanceGrowthRatchet` 报告 `src/services=1127`，超过 1125 硬上限。
多出的两个文件正是 v2221 与 v2222 的 reference 模块。正确处理不是把基线改成 1127，也不是把两份逻辑
塞回旧巨型服务，而是遵循仓库 v2208/v2209 已建立的目录边界：纯历史证据解析属于 `src/evidence`。
两模块迁移并改成准确的 `*EchoReferences` 名称后，service/route 回到 1125/80，整份第七分片复跑通过。

## 优雅门如何约束新文件

新模块命名为 `fakeTransportEchoReferences.ts`，准确表达它产出供 profile 消费的上游 reference，而不是
又造一份泛化 Evidence family。它与 v2221 reference 模块都位于仓库既有 `src/evidence`，没有增加受硬
上限约束的 service 文件；该 `References` family 目前只有两份，尚未触发第三次规则。若出现第三个类似
消费者，应先抽取共享
source engine，而不是复制本文件。字段读取已经复用 `mapReceiptFields`，新文件没有私有 JSON scalar helper。
elegance census 仍是 159 个 family、52 个受管 family，基线没有放宽。

## 安全边界没有因“ready”而打开

本报告的 ready 只表示 fake-transport packet 与上游非参与证据对齐。公开 profile 仍把 execution、managed
audit connection、credential read/store、schema migration、production readiness 和 automatic start 全部置
false。代码没有创建客户端、读取秘密、发送网络请求、写数据库或启动兄弟服务。`UPSTREAM_ACTIONS_ENABLED`
若为 true 反而会阻断报告，因此这次优化不可能成为真实执行的旁路。

## Java 与 mini-kv 为什么可以并行

Node 读取的是仓库内已冻结的 Java v103 和 mini-kv v112 historical fixtures，同时在本机存在 sibling 文件时
验证同一内容。它不要求 Java 或 mini-kv 生成新版本，也没有修改两个工作树，更没有启动它们。两项目可以
继续自己的优化轨道；若未来改用新鲜 evidence，计划必须先列出准确上游版本、端口、责任人和清理方式，
那时才能把并行状态改成等待或联合执行。

## 后续增加字段时应怎么做

新增浅层标量时，先确认它属于 identity、source、request、response 还是 runtime，再把规格放到原对象顺序
对应的位置，明确类型和危险侧 fallback。新增数组、联合结构或跨字段约束时，应写窄的具名 parser/predicate，
不要把 `ReceiptFieldSpec` 扩成动态语言。任何属性顺序、raw digest、fallback 或 blocker 顺序变化都属于可观察
合同变更，需要新版本和新 oracle，不能夹在维护重构里静默发生。

## 审查者应如何快速复核

第一步比较五组规格的 target、source、kind、fallback 与旧字段顺序；第二步确认 Java/v112 readiness 的每层
都参与最终 alignment；第三步检查 profile 的十九个键和六条 blocker 规则顺序；第四步运行 fixed-time
local/fallback/ready/blocked oracle；第五步看 maintainability baseline 是否只删除旧四条记录。若测试期望、
fixture、route 或执行权限有任何改动，本版都应判失败，而不是用“重构”名义接受。

## 本版停止条件

本地停止条件已经满足：字节预言机、6 文件 22 项 focused、typecheck、零警告 lint、全部静态门与中文
讲解门通过；八分片覆盖 579 个文件、1,764 项测试，独立 discovery 数量相同且重复为 0；build 与受保护
HTTP smoke 通过。第 2 分片的外层预算超时和第 7 分片的增长门失败都按根因处理并整片复验，没有静默省略。
远端首轮 CI 已完成 Linux 静态门并定位 portable oracle 噪声；修复提交需要再执行一次远端复验，确认 coverage、
build 与 CI 自有 smoke 全部走完。截图不适用，因为没有 HTML/UI 变化；关闭后不继续增加验证链，下一批从
账本中的最高真实热点重新取证。

## 一句话总结

Node v2222 把 Java v103 与 mini-kv v112 的证据读取从 740 行报告服务中独立出来，用有序字段规格和具名
失败关闭谓词保留完整输出合同，并把维护性账本从 84 / 99 / 220 / 0 实质收紧到 83 / 98 / 217 / 0。
