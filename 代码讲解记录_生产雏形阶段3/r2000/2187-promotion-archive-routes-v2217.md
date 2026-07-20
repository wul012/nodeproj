# Node v2217 代码讲解：让归档路由和工件链各自拥有一份可验证的事实

## 一、Goal 与 Non-goal

本版目标是消除 `opsPromotionArchiveRoutes.ts` 中两种彼此独立的重复：28 次同构路由注册，以及
152 行连续工件构建。非目标是新增归档能力、改变任何路径、调整响应字段、重写 renderer、读取
兄弟项目实时状态或扩大执行权限。衡量标准不是文件数量，而是路径映射和依赖顺序能否被机器证明。

## 二、公开 Entry point 保持什么

外部模块仍只调用 `registerOpsPromotionArchiveRoutes(app, deps)`。参数类型、返回类型和导入路径均未
改变，`opsSummaryRoutes.ts` 无需认识新子目录。这个 facade 继续拥有 HTTP query schema 与注册
动作，说明拆分发生在实现边界内，而不是要求上层调用者参与一次无价值的迁移。

## 三、每个请求的输入与输出

输入仍是 Fastify request 中可选的 `format=json|markdown`，以及启动时注入的 `OpsSummaryRouteDeps`。
输出仍是清单指定的单份归档工件；Markdown 分支设置相同 content type 后调用原 renderer，JSON
分支直接返回同一对象。没有缓存整条工件链，也没有把一次请求的状态泄露给下一次请求。

## 四、旧代码为什么难维护

旧注册函数连续写了 28 组 app、deps、path、selector、renderer 参数。审查者若想确认一个路径是否
选中了正确工件，需要在大段相似文本里横向比对；插入一条路由时还可能漏改相邻顺序。代码正确，
但事实没有结构化，重复文本让简单的映射审查变成视觉搜索任务。

## 五、第二个问题是有向依赖被压平

旧 `createPromotionArchiveRouteArtifacts` 用 28 个局部变量表达核心归档、交接、发布、部署的先后链。
每一步都依赖前一步的摘要或验证结果，却没有阶段名称。读者只能从变量名反推边界，后续增加一个
部署产物时，容易误以为整条 152 行函数都属于同一个职责。

## 六、为何不能只把旧调用包进循环

若仅建立 path 数组，再在循环里用字符串索引和宽泛 renderer，行数会下降，但 TypeScript 会失去
工件类型与 renderer 参数之间的相关性。v2217 的 `definePromotionRoute` 用泛型键捕获这种对应关系，
因此每一项仍在编译期证明“这个 renderer 正在接收这个键对应的真实类型”。

## 七、源码修改前的 red oracle

首先新增清单测试并导入计划中的模块，此时 Vitest 明确报告模块不存在，测试文件没有执行任何断言。
这证明绿灯不是旧实现偶然满足的新断言。随后才创建源码模块；测试期望在迁移过程中没有被改写，
也没有修改 fixture 或冻结摘要来迁就新结构。

## 八、route manifest 的数据模型

每条 `PromotionArchiveRoute` 只包含五项：固定为 GET 的 method、path、artifactKey、从完整工件对象
取值的 selector，以及消费完整工件对象的 Markdown 渲染闭包。清单不读取 deps、不构建业务对象、
不操作 reply，因此它只拥有“HTTP 地址怎样对应一份已有工件”这一类知识。

## 九、为什么保留 artifactKey

selector 本身可以完成取值，但函数闭包不便审计和比较。显式 artifactKey 让测试能输出 28 个稳定
三元组，也让运行期校验能发现重复消费或未知键。它不是第二套业务标识，而是类型化属性名，始终受
`keyof PromotionArchiveArtifacts` 约束，拼写错误会在 typecheck 阶段被拒绝。

## 十、definePromotionRoute 如何保住类型相关性

工厂的泛型参数 `K` 来自完整工件对象的键集合，renderer 参数类型则是
`PromotionArchiveArtifacts[K]`。工厂内部同时生成 selector 与 renderMarkdown 闭包，两者都读取
同一 artifactKey。调用处无法把 receipt renderer 误配给 certificate 键后仍通过编译。

## 十一、28 项顺序为什么是合同

Fastify 最终按清单顺序注册路径，现有 ops-summary 组合测试又把这 28 项夹在 summary/readiness 与
promotion review 之间。顺序变化虽然未必改变普通匹配结果，却会改变路由注册证据与维护者阅读路径。
所以本版不按字母排序，而是逐项保持 archive 到 release audit trail 的历史顺序。

## 十二、manifest 为什么要整体冻结

模块初始化时，校验器复制并冻结每个条目，再冻结返回数组。运行时不能 push、splice 或修改 path，
避免测试通过后被其他模块悄悄重排。冻结不是权限系统，它保护的是进程内配置事实；真正的权限边界
仍由已有 access guard 和只读归档路由承担。

## 十三、空清单怎样 fail-closed

校验器首先要求条目数精确等于工件数 28，因此空数组与缺一项数组都会立即抛错。这里不能使用
`every` 后把空集合视为成功，因为“没有重复”不等于“完整”。测试分别传入空清单和 27 项清单，
确认错误消息包含 exact count，而不是静默注册一个残缺表面。

## 十四、重复 method/path 怎样被发现

每项先组合成 `GET + path` 的 routeId，再进入 seenRoutes 集合。同一个 method/path 第二次出现时
立即抛出带具体 routeId 的错误。测试保留 28 项总数，只把最后一项路径替换为第一项路径，证明
校验失败来自唯一性，而不是条目总数不足。

## 十五、重复 artifactKey 为什么同样危险

两个不同路径若选择同一 artifactKey，其中一份真实工件必然没有公开路由，单看路径唯一性无法发现。
seenKeys 因而独立于 seenRoutes。测试构造路径仍唯一、但最后一项复用 bundle 键的清单，校验器会
报告重复工件键，不让“有 28 条路由”冒充“覆盖 28 份工件”。

## 十六、未知工件键怎样阻断

运行时 expectedKeys 来自 `PROMOTION_ARCHIVE_ARTIFACT_KEYS`，即使有人绕开 TypeScript 强制传入
`unknown`，校验器也会拒绝。测试故意通过双重类型转换模拟不可信动态输入，确认运行期仍失败。
这借鉴了 mini-kv 最近 manifest 治理中的双层策略：静态类型负责日常，运行校验负责边界破坏。

## 十七、工件全集如何做编译期证明

`PROMOTION_ARCHIVE_ARTIFACT_KEYS` 使用 `satisfies readonly (keyof ... )[]`，禁止未知键；随后用
`Exclude` 计算返回对象中未声明的键。只有差集为 never 时，常量 28 才能赋给条件类型。将来若
builder 新增工件却忘记进入键表，typecheck 会在源码层直接失败。

## 十八、路由全集如何做第二次证明

route definitions 的 artifactKey 联合再次与完整工件键集合做 `Exclude`。只要存在未路由工件，
`allArtifactKeysRouted` 就无法赋值为 true。运行期的数量、未知和重复检查再补上类型系统不擅长的
基数问题，形成“联合覆盖加集合唯一性”的闭环，而不是依赖人工数 28 行。

## 十九、artifacts 模块的 service flow

完整流程可读成：`deps -> archive core -> handoff -> release -> deployment`。入口只调用四个具名阶段，
再按原顺序扩展为一个对象。阶段之间传递经过推导的类型，不使用字符串任务名、通用上下文容器或
动态 dispatcher，因此调用图保持静态可追踪，编辑器也能准确跳转。

## 二十、archive core 阶段的职责

核心阶段先从 promotion decision ledger 读取 integrity 与最近一条 decision；若存在 decision，再用
get 与 verify 的结果创建 evidence report。随后依次生成 bundle、manifest、archive verification、
attestation 和 attestation verification，五个返回键与旧函数开头的对象顺序完全一致。

## 二十一、最近 decision 的读取语义没有变化

代码仍调用 `list(1)[0]`，没有改成缓存、遍历或直接访问内部 Map。存在记录时仍通过 ledger 的
`get(id)` 与 `verify(id)` 获取规范副本和验证结果；不存在时 latestEvidence 仍是 undefined。
这保证空状态和已有批准状态下的 archiveName、digest、检查项与旧实现相同。

## 二十二、handoff 阶段接收什么

handoff 阶段显式解构 core 的五项输出，再把 archiveVerification 以既有参数名 verification 传给
package builders。这里没有直接扩展整个 core 对象，因为宽泛 spread 会把非契约字段也带入调用。
显式列参让调用者一眼看到每个 builder 的真实依赖，也为未来签名变化提供精确编译错误。

## 二十三、package 到 completion 的链条

该阶段按原顺序生成 package、package verification、certificate、certificate verification、receipt、
receipt verification、closure、closure verification、completion 和 completion verification。
每个 verification 都与它验证的主体相邻，输入没有跨阶段回读 deps，因而能独立审查完整交接链。

## 二十四、release 阶段为什么单独存在

release evidence 只需要 completion 与其 verification，release archive 又只需要 evidence 与其验证。
这四项已经不再依赖 bundle 或证书细节，把它们从 handoff 阶段分离后，依赖收窄为真正需要的两个键。
未来修改发布归档时，无需重新阅读 package、receipt 和 closure 的构建细节。

## 二十五、deployment 阶段表达的状态推进

部署阶段从 release archive 开始，依次创建 approval、change record、execution record、execution
receipt，并为前四类主体配套 verification，最后生成 release audit trail record。它只是组装只读
证据对象，没有调用部署命令、shell、网络客户端或写入 Java/mini-kv 状态。

## 二十六、为何不用通用 stage runner

四个阶段的输入和输出形状不同，通用 runner 必须引入 unknown 上下文、字符串 key 或大量类型转换。
这会把直观的有向图压进框架机制，降低局部可读性。具名普通函数虽然保留若干显式调用，却让每一步
参数都接受 TypeScript 检查，符合“第三次重复才提取真正共同机制”的优雅门。

## 二十七、对象键顺序为什么不会漂移

入口按 core、handoff、release、deployment 顺序展开对象，各阶段内部返回键顺序逐项复刻旧函数
末尾的 return 对象。路由只选择其中一个既有工件，工件自身字段仍由原 builder 创建，因此 JSON
字段顺序与 Markdown 输入都不受阶段拆分影响，没有通过重新序列化完整中间对象改变字节。

## 二十八、facade 现在如何注册路由

`registerOpsPromotionArchiveRoutes` 只遍历冻结清单，并把 app、deps 与单条 route 交给局部注册函数。
它从 198 行降为一屏内的组合逻辑，却没有把注册函数搬到另一个 198 行文件。所有重复数据集中到
manifest，所有重复行为只保留一次，facade 因而表达“注册全部归档路由”而非每条路径细节。

## 二十九、query schema 为什么仍留在 facade

`format` 的 object schema 属于 HTTP 适配层，不属于业务工件或路径数据。它继续使用相同 enum、
`additionalProperties:false` 和 Fastify 泛型。若把 schema 放进每条 manifest 条目会重新制造 28 份
重复；若放进 artifacts 又会污染纯构建模块，所以保留在 facade 是最小且清晰的所有权。

## 三十、JSON 与 Markdown 分支的响应模型

处理器每次先构建完整工件对象。Markdown 请求由 route 闭包选择并渲染同一键，设置原 content type；
其他请求由 selector 返回原对象。判断条件仍严格比较字符串 markdown，未引入 Accept 协商或新的
默认值。错误仍由 Fastify 与全局 handler 按原方式传播。

## 三十一、为什么每个请求仍构建完整链

从性能角度看，可以只构建目标工件之前的前缀，但这会改变 ledger 读取次数、时间戳生成边界和错误
暴露顺序。v2217 是结构重构，不借机改变惰性策略。保持完整构建使旧测试与摘要具有直接可比性；
若未来要优化，应单独建立性能证据和行为契约后再做。

## 三十二、route recorder 冻结了什么

`opsSummaryRouteComposition.test.ts` 用假的 Fastify registrar 记录 method、path、schema 和调用顺序。
46 条完整 ops 路由序列序列化后的 SHA-256 仍是
`7de62deb53695ed355e38286b69ad101453a0d42d00ae7aca08daaa6defc1957`，
因此 manifest 没有改变归档路由在更大路由表中的位置。

## 三十三、固定时间字节测试覆盖什么

`promotionRendererParity.test.ts` 冻结时间后依次请求 archive、manifest、verification、attestation，
以及 package、certificate、receipt、closure、completion 的主体与验证 Markdown，共 15 个响应。
长度与 SHA-256 全部保持 v2199 值，能发现 selector 或 renderer 误配以及文本字段顺序漂移。

## 三十四、后半链为何使用端到端测试

release archive、deployment approval/change、execution record/receipt 与 audit trail 各有真实 buildApp
和 inject 测试。它们断言 source 路径、digest 覆盖、ready 状态、JSON 结构与 Markdown 标题。
本版集中运行这些文件，确保 manifest 后半段不是只因方法和路径正确就被误判为安全。

## 三十五、新清单测试增加了什么证据

新测试直接读取生产清单，精确比较 28 个 method/path/artifactKey 三元组，检查数组与每个条目冻结，
并主动构造五类坏输入。它不复制 selector 实现，也不伪造 renderer 输出；静态键绑定由类型系统检查，
真实输出由既有路由测试检查，各层证据针对不同失败模式。

## 三十六、测试与 typecheck 结果

红灯后，清单、旧路由顺序和固定字节 oracle 先通过 3 个文件、4 项测试；随后完整 promotion 路由族
通过 18 个文件、39 项测试。`npm run typecheck` 与定向 ESLint 零警告通过。完整分片全测、build、
HTTP smoke 和 CI 按批次规则留到 v2218 统一执行，不在中间版本重复消耗。

## 三十七、可维护性指标怎样变化

原顶层文件 467 行，现 facade 为 54 行；artifacts 与 manifest 分别为 266 和 245 行。原 198 行
registrar 与 152 行 artifact builder 同时退出长函数账本，整体从 85/106/226/0 收紧到
85/104/226/0。最大替代函数 66 行、复杂度 1，最高替代复杂度 7，没有新增导入环。

## 三十八、命名与文件族优雅门

新目录名 `promotionArchive` 表示单一领域边界，文件名 `artifacts` 与 `routeManifest` 分别回答行为链
和数据映射。新抽象名均在 40 字符预算内，顶层 routes 文件数仍是 80。该家族设计说明已在批次计划
中先于实现写明，且没有创建一行转发器、镜像 facade 或第三份平行清单。

## 三十九、Safety boundary 与 upstream evidence

本版没有新增 route、client、credential、child process 或网络调用；`executionAllowed` 的既有只读
含义未改变。Node 不读取新鲜 Java 或 mini-kv evidence，不启动它们的服务，也不写入兄弟工作树。
两个项目可继续独立并行，Node 不是它们的前置批准者；本版也不触发 live capstone。

## 四十、后续维护者应怎样扩展

若确有新归档工件，先在 artifacts 的正确阶段创建并加入有序键表，再用 `definePromotionRoute` 绑定
路径与 renderer；编译期覆盖会提示遗漏，运行校验会阻止重复。若只是修改某个现有 builder，通常
无需触碰 route manifest。两类变化路径分开后，审查范围能与真实责任边界一致。

## 四十一、明确失败条件

任一 method/path/key 顺序变化、清单未冻结、坏清单被接受、固定 Markdown 摘要漂移、后半链响应
不一致、账本放宽、顶层 route 数增长、fixture 被修改或执行权限扩大，都应判定本版失败并回退。
不能通过改测试期望、删除失败样本或把完整构建改成惰性构建来掩盖差异。

## 四十二、One-sentence summary

v2217 在 28 条路由、28 份工件、schema、响应字节和安全边界均不变的前提下，把 467 行混合文件
重构为 54 行稳定入口、四阶段类型化工件流水线和一份冻结且 fail-closed 的路由清单，并用静态全集
证明、运行唯一性校验、路由摘要及端到端测试共同守住行为等价。
