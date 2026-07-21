# Node v2220 代码讲解：把 disabled candidate 策略拆成可审查的不变量

## Goal / 目标与 Non-goal

本版处理 `managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationPolicy.ts`
中的最高风险维护点。旧 `createChecks` 有 149 行、复杂度 100，它把 Node v273 review、Java v113 echo、
mini-kv v120 non-participation 与运行配置全部串在一个对象字面量中。读者虽然能看到最终布尔值，却很难
判断一处失败属于计数漂移、接口形状漂移，还是某个副作用边界打开。

目标是让每一类不变量有独立名字和单一证据所有权，同时保持对外字节完全不变。Non-goal 是实现真实
credential resolver、连接 managed audit 或改变批准语义；本版仍是对冻结证据的只读 verification。

## Entry Point / 入口与公开导出

公开入口仍是
`src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.ts`。
它继续导出原类型、core loader 与 Markdown renderer，没有新增或删除任何 export。调用者和 route 不会感知
内部 policy 的拆分。

核心 loader 位于
`src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationCore.ts`，
策略位于
`src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationPolicy.ts`。
测试入口为 `test/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.test.ts`
和 `test/resolverEchoParity.test.ts`。

## Response Model / 25 个 checks 的稳定契约

profile 仍输出 25 个有序 checks。前六项证明 source、Java 和 mini-kv 证据 ready；中间十二项表达 candidate
count、三组 boundary code、interface、fake wiring 与六类副作用边界；其后保留 Java workflow template、
probes/actions 开关、production blockers 和最终 readiness 占位值。键名和键序进入完整 JSON 与 digest，
因此本版没有用排序或 map 动态生成对象。

`createChecks` 现在只负责按旧顺序调用 `isSourceReady`、`hasAlignedCandidateCounts`、
`hasAlignedInterfaceShape`、`isWriteBoundaryClosed` 等函数。这个组合根可以一屏阅读，审查者先看到完整
政策目录，再按需要进入具体谓词。

## Upstream Evidence / 三方证据

source Node v273 是 disabled implementation candidate review；Java v113 提供 echo receipt；mini-kv v120
提供 non-participation receipt。测试设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，三方路径解析到
仓库内 `fixtures/historical/sibling-workspaces/`，所以当前 Java v1881 工作树和 mini-kv 用户文档改动不会
影响结果。

运行时只读取 `upstreamProbesEnabled` 与 `upstreamActionsEnabled`。这两个开关一旦为 true，source profile
本身也会失去 ready 状态和计数对齐，所以 blocker 不只包含两个 runtime code，还包含 source not ready 与
candidate counts not aligned。完整 blocked oracle 专门锁定这条连带关系。

## Service Flow / 从 evidence 到 profile

core 先加载 source Node v273 profile，再通过 references 模块读取 Java v113 与 mini-kv v120。随后 policy
生成 25 个 checks。core 排除最终 readiness 占位键，要求其余 checks 全部为 true，生成 verificationState。
接着 `collectProductionBlockers` 根据同一 checks 产生 blocker，renderer 再从完整 profile 输出 Markdown。

本版只改 policy 内部。evidence 解析、core readiness 算法、digest、renderer 和 route 均未动，因此等价
验证能把排查范围限制在“谓词是否重现旧布尔值”和“blocker helper 是否保持旧顺序”两点。

## Source Review / source readiness 与 review-only

`isSourceReady` 先精确比较 review state，再要求 ready、source v272 ready、read-only echo、real resolver
blocked 和 boundary alignment 五个字段全部为 true。字段名在 `SOURCE_READY_TRUE_FIELDS` 中集中表达，
拼写错误或选择非布尔字段会在 typecheck 阶段失败。

`keepsReviewOnly` 单独检查 candidate review only 与 read-only candidate review。它不与 source ready 合并，
因为“资料完整”与“范围仍停留在评审”是不同事实：即使证据 ready，只要 review-only 被取消，profile 也
必须 blocked。

## Real Resolver / 真实 resolver 仍被阻断

`keepsRealResolverBlocked` 检查 implementation allowed、managed audit connection、external request、resolver
client 和 secret provider 五项均为 false。旧实现使用连续逻辑非，本版使用严格字段判定；字段缺失、null
或错误类型都不会被当成安全的 false。

这一谓词只处理 source Node v273。Java 与 mini-kv 的对应边界在后续 resolver/connection 谓词中分别验证，
保持证据所有者清楚，避免把多个对象 spread 后因同名键覆盖而漏检。

## Counts / 三方计数为什么独立成函数

`hasAlignedCandidateCounts` 比较总 check、passed check、source check、candidate decision、ready decision 和
approval-required decision 六组计数。每组都要求 Java 与 mini-kv 同时等于 source，合计十二条关系。

计数不能改成简单“Java 等于 mini-kv”，因为 source Node v273 才是本次 review 的合同所有者。明确以
source 为基准，使未来某一 receipt 同时漂移时仍会被发现，也让函数名准确表达三方 alignment。

## Boundary Codes / 三组有序 code

`hasAlignedBoundaryCodes`、`hasAlignedReadyCodes` 和 `hasAlignedApprovalCodes` 分别验证全部 boundary、
disabled-ready 子集和 approval-required 子集。Java 用 echo marker 证明已回显，source 与 mini-kv 则通过
`arrayEquals` 做有序比较。顺序被保留，因为这些 code 同时服务人工解释和下游展示。

三组数组没有压缩成接受任意数组参数的万能函数。它们的 Java marker 字段、mini-kv 字段与业务含义不同，
三个短函数能让失败定位直接对应 check 名，不必再从动态参数猜测是哪组 code。

## Interface Shape / handle-only 合同

`hasAlignedInterfaceShape` 要求 Java 已回显 interface shape，mini-kv 的 request/response/failure 数量与 source
数组长度一致，且 request 保持 handle-only。credential value、raw endpoint、external request、secret
provider 与 resolver client 五项由 `MINIKV_INTERFACE_FALSE_FIELDS` 一次性严格验证。

这里保留 `receipt.handleOnlyRequest === true`，没有简写为普通 truthy。该字段类型允许 null，null 表示证据
未给出结论，必须失败；它不能因为 JavaScript 条件表达式的宽松规则被误当成 false 或被类型断言掩盖。

## Fake Wiring / 评审形状不等于运行实例

`hasAlignedFakeWiring` 要求 Java echo 存在、source 和 receipt 都声明 review-only，同时 source fake runtime、
mini-kv fake runtime、real secret provider 与 real transport 全部未实例化或不允许。fake wiring 在这里是
候选设计资料，不代表运行时对象已经创建。

`receipt.fakeWiringReviewOnly` 同样严格比较 true。第一次 typecheck 正是因为普通 truthy 可能返回
`boolean | null` 而失败；修复没有使用 `as boolean`，而是恢复旧合同的 `=== true`，让 null 继续被阻断。

## Credential Boundary / 凭据边界

source 侧检查 read、store 与 value read；Java 检查 value read；mini-kv 同时检查 source 回显和自身的
readAllowed、loaded、stored、included。三层都关闭才得到 `credentialBoundaryAligned=true`。

这组字段不检查 credential handle，因为 handle 是无秘密值的引用，可存在于只读候选接口；真正危险的是
credential value 被读取、加载、保存或出现在输出中。把两者区分开是该合同的核心机制。

## Endpoint Boundary / 原始 endpoint 边界

`isEndpointBoundaryClosed` 要求 source 与 Java 均未 parse raw endpoint，mini-kv 的 source echo、parseAllowed、
parsed 和 included 也全部为 false。endpoint handle 仍可作为不可解析标识存在，但不能转成真实 URL。

严格 false 检查让缺失字段失败。若 receipt 将 parseAllowed 省略，helper 得到 undefined，与 false 不相等，
因此不会因为逻辑非把“未知”误解释成“已关闭”。

## Resolver Boundary / 实现、调用与实例化

source 和 Java 各检查 resolver client 与 secret provider 是否实例化；mini-kv 进一步检查 resolver 是否
implemented、invoked，client/provider 是否 instantiated，以及 provider runtime 是否 allowed。这五层状态
共同证明真实 resolver 路径仍不存在。

把 resolver 从 connection 中单列，可以区分“组件已创建但尚未发请求”与“组件根本没有创建”。安全报告
需要在更早阶段阻断，因此不能只检查最终 `externalRequestSent=false`。

## Connection Boundary / 网络连接边界

source 与 Java 都要求 `connectsManagedAudit=false` 和 `externalRequestSent=false`；mini-kv 还要求 connection
本身 false、request 不允许也未发送、sandbox adapter connection readiness 仍为 false。该谓词不启动任何
服务，只验证冻结 evidence 中的状态。

本版没有把 live probe 加进测试。因为计划明确是内部重构，现有成熟度只允许历史证据与 env-gated 的既有
capstone；为了证明一个纯函数重构而启动兄弟服务，会扩大权限与清理风险，反而降低可审查性。

## Write Boundary / 所有写路径

source 检查 execution、schema migration 与 approval ledger；Java 检查 ledger、SQL 与 migration；mini-kv
检查 execution、storage write、write/admin commands、ledger、managed audit write、migration、restore、
load/restore/compact、SETNXEX、storage backend 和 authority。任一字段为 true 都使 write check 失败。

该清单包含十五个 mini-kv 字段，但它们仍属于同一“持久化或权威状态改变”边界。集中声明比连续十五次
对象访问更容易做完整性审查，也能通过 helper 的重复字段检测防止看似十五项实际重复一项。

## Auto-start Boundary / 自动启动

source 和 Java 的 automatic start 必须为 false；mini-kv 的 allowed 与 actual 两个字段也必须为 false。
“允许自动启动”与“已经自动启动”分别验证，避免只检查结果而放过权限已经打开的状态。

这一 check 与 productionWindowStillBlocked 并存。前者是具体行为边界，后者是总体治理结论；二者不能互相
替代，因此 checks 键和原始常量 true 均保持不变。

## Blocker Collection / 共享收集器

旧 `collectProductionBlockers` 在规则数组后手写 filter 与 map。仓库已有
`src/services/liveProbeReportUtils.ts#collectFailedReportRules`，它按输入顺序筛选 condition=false 的规则，
并补上固定 severity `blocker`。本版复用该 engine，规则数组的十四条定义一个字未改。

泛型 `ReportRule<Message["source"]>` 保留 source 联合类型，避免共享 helper 把来源退化成任意字符串。
ready 路径 blocker 仍为空；blocked oracle 则证明四个 code、顺序、source、message 和 Markdown 呈现全部
保持，因为完整字节摘要未变化。

## Byte Oracle / ready 路径

`test/resolverEchoParity.test.ts` 在改源码前冻结时间为 `2026-07-21T00:00:00.000Z` 并强制历史 fallback。
ready JSON 为 51,391 字节，SHA-256 是
`6a372391b0712e4b213d6298b5444016fd1b55ee4f83fe50a1b5874240515fd9`；Markdown 为 50,911 字节，
摘要是 `25ce0a46d926ac3d2da291d19c9d104ae21d25b64900999a657df0f7af5f8e0b`。

该 oracle 覆盖 25 个 checks 的键序、所有 evidence 与 snippet、echo verification、summary、warnings、
recommendations 和 renderer 输出。源码改动后摘要完全一致，排除了“部分断言通过但展示漂移”。

## Byte Oracle / blocked 路径

同时开启 probes/actions 后，passed checks 降为 20，blocker 顺序固定为 source not ready、candidate counts、
probes enabled、actions enabled。blocked JSON 为 52,245 字节，摘要
`3a77c29f51f0d1e16c9db234b0e27bf41dc19fb4b3dd5b305f99a329dfc8d4b6`；Markdown 为 51,554 字节，
摘要 `d1cc7af7a2dc23a1ad1ea976dfc842f2aa106858a4cc22d34f1aadec686c345e`。

这一负向 oracle 比 `arrayContaining` 更强：它不允许 blocker 重新排序、不允许 message 改字，也不允许共享
收集器改变对象属性顺序。因而 blocker 重构获得与 ready profile 同等级别的等价证明。

## Maintainability / 机械结果

旧 `createChecks` 的 149 行与复杂度 100 从基线中消失，仓库由 85 / 101 / 224 / 0 收紧为
85 / 100 / 223 / 0。策略文件现在约 468 行，但扫描中没有该文件的长函数或复杂函数条目；最大逻辑被
拆到一组低于阈值、可按领域名称定位的谓词。

这不是把一个函数机械切成编号函数。每个函数都对应已有 check 或明确子边界，字段清单按证据 owner 与
安全类别命名，组合根仍拥有稳定输出顺序。未来改某类合同只需进入相应谓词，不再触碰所有不相关条件。

## Test Coverage / 验证层次

focused 矩阵包括原 disabled-candidate 测试与 resolver parity 测试，共 2 文件 7 项。它覆盖 ready profile、
历史 fallback、probes/actions 负向路径、Fastify JSON/Markdown route，以及 ready/blocked 四份完整字节。

`npm run typecheck` 验证字段清单和 nullable 语义；定向 ESLint 验证修改文件零警告；maintainability census
验证无替代热点。security、archive、elegance、family、renderer 与 source-size 门在文档写完后统一跑。
批次 full/build/smoke/CI 仍按计划只在 v2222 执行一次。

## Safety Boundary / 安全边界

profile 的 realResolverImplementationStillBlocked、productionAuditStillBlocked 与 productionWindowStillBlocked
保持 true；execution、credential、endpoint、resolver、connection、write 和 auto-start 全部保持关闭。
本版未修改 fixture、未创建 approval artifact、未启动 Node server 或兄弟服务，也未写 Java/mini-kv。

Java 当前 v1881 的 renderer 收敛可继续，mini-kv 的用户文档改动也可继续。Node 使用 frozen historical
fixtures，不等待 fresh upstream evidence，不是另两个项目的前置批准方。

## Failure Lookup / 失败排查

typecheck 报 `boolean | null` 时，应恢复严格 `=== true/false` 或把字段放入正确的 fail-closed helper，不能
用类型断言压过去。ready oracle 失败时先查 checks 键序与谓词结果；blocked oracle 单独失败时查规则顺序、
共享收集器和 runtime 开关引发的 source profile 连带变化。

maintainability 若出现新热点，先检查是否把多组语义重新塞进一个 helper；不可直接刷新 baseline。只有旧
条目 stale 且 unknown/grown 为空，才能向下写入新账本。

## Design Tradeoff / 为什么不做万能 schema

一种看似更“数据驱动”的方案，是把 25 个 checks 全部写成包含对象路径、运算符和期望值的 JSON 式规则。
本版没有采用它，因为 candidate counts 需要三方相等，boundary codes 需要有序数组比较，interface shape
同时包含长度与布尔边界，普通 path/operator 表最终会发展成一门解释型语言。那会把 TypeScript 能直接
表达和检查的关系藏进字符串，错误只能在运行时发现，调试时还要先解释规则格式。

当前做法只把真正同构的“同一对象上若干布尔字段都等于某值”数据化，其余关系保留为普通 TypeScript
谓词。共享范围较窄，却有静态类型、跳转定义和直接断点；这是少一点抽象表面积，换取更透明的维护成本。

## Naming Budget / 名称如何帮助审查

新函数名都在 40 字符预算内，并使用问题式语义：`isSourceReady` 回答 source 是否 ready，
`hasAlignedCandidateCounts` 回答计数是否一致，`isResolverBoundaryClosed` 回答 resolver 边界是否关闭。
字段清单名称同时包含 owner、领域和期望，例如 `MINIKV_WRITE_FALSE_FIELDS`，读者不打开数组也能知道用途。

没有把版本号写进每个新名字，因为函数参数类型已经限定 v273/v113/v120，且策略文件本身提供上下文。
去掉冗余版本前缀后，名称更短，但并未失去所有权；这与旧仓库大量超长全路径标识符形成明确改进。

## Object Order / 为什么组合根仍手写

checks 对象没有由谓词 manifest 循环生成。虽然循环能进一步减少行数，却会让返回类型依赖断言，并可能
改变属性插入顺序。该顺序同时影响 `JSON.stringify`、digest、Markdown checks 列表与审查者的阅读路径，
所以它是稳定合同的一部分，而不是可以随意排序的内部细节。

手写 25 个短赋值让 TypeScript 检查每个返回键是否齐全，也让 diff 清楚显示哪一项换了判定函数。数据驱动
适合大量同构 case；这里的键虽多，但每个值对应不同领域问题，保留显式组合比建立动态 registry 更优雅。

## Comparison Semantics / 严格比较的层次

字符串 state、profile 与 code 使用严格相等；数组使用保序 `arrayEquals`；计数使用数字严格相等；纯布尔
字段使用 `allBooleanFieldsAre`。四种比较方式分别对应身份、序列、数量和边界事实，不能统一成普通 truthy。
特别是 receipt 的 null 表示“未提供证据”，不是 false；数字 0 也可能是合法或故障值，不能被 `||` 覆盖。

这种分层让失败语义可预测：错 state 指向身份，数组错位指向合同清单，计数不符指向上下游版本漂移，
nullable 布尔指向证据缺失。排查者无需从一个模糊 `aligned=false` 猜所有可能原因。

## Evolution Guide / 将来怎样扩展

若 Node source 新增 review readiness 字段，应先更新 source 类型与构造器，再把纯布尔字段加入对应清单，
最后让 ready/blocked oracle 给出合同字节变化的明确评审。若新增的是一组 code 或 count，应扩展现有具名
谓词并增加负向 fixture，而不是把它塞进不相关的 write 或 resolver 清单。

若 Java 或 mini-kv 发布新 receipt 版本，Node 应先冻结历史 fixture、验证本地与 forced fallback 一致，再
调整 references。只有上游 schema 确实改变时才允许更新 oracle；单纯重构不得修改期望摘要。若出现第四个
相似 policy，应复用共享布尔和 blocker engine，但仍为不同合同保留各自短谓词，避免再次复制百行长链。

## Stop Condition / 停止条件

v2220 在 ready/blocked 完整 oracle、原 focused tests、typecheck、lint、七项静态门、讲解质量门和
85 / 100 / 223 / 0 ratchet 全部通过后停止。下一版只处理 v111 evidence 解析与 691 行服务拆分，避免在
同一版本混入新的合同或执行能力。

## One-sentence summary / 一句话总结

Node v2220 把 disabled candidate 的百级复杂策略分解为类型安全、按证据所有者命名的不变量，并用 ready
与四 blocker 的完整 JSON/Markdown oracle 证明输出零漂移，同时继续关闭真实 resolver、网络和写入边界。
