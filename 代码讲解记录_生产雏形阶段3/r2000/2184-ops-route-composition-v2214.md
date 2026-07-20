# Node v2214 代码讲解：把路由总入口变成清楚的组合根

## 一、版本目标与非目标

本版目标是把 `registerOpsSummaryRoutes` 从 239 行连续注册流程整理成一眼能看懂的组合根，并让 summary、promotion、runbook/checkpoint、baseline 与 handoff 各自拥有清楚的阅读边界。非目标是新增接口、调整响应、改造鉴权、改变存储方式、启动上游服务或扩大任何执行权限。路由路径、方法、schema、handler 闭包和调用顺序都属于必须保留的合同。

## 二、为什么现在处理这个热点

旧文件只有一个超长函数被维护账本点名，问题不在分支复杂，而在组合信息密度过高。读者从 summary 看到 promotion archive，再穿过 decision、runbook、checkpoint、baseline 和 handoff，必须记住两百多行之前的上下文。任何局部新增都容易插错位置，代码评审也难快速判断改动究竟只影响某组路由，还是改变了整个 ops 表面。

## 三、入口与公共导出保持什么

公共入口仍是 `src/routes/opsSummaryRoutes.ts` 导出的 `registerOpsSummaryRoutes`，参数仍为 `FastifyInstance` 与 `OpsSummaryRouteDeps`，返回值仍是 `Promise<void>`。`src/app.ts` 的调用点不需要修改，`opsPromotionArchiveRoutes.ts` 继续只通过 type import 消费依赖类型。下游看不到新增公共符号，也不必理解内部 registrar 的划分。

## 四、响应模型为什么没有变化

本版没有创建新的 profile 或 DTO。summary、readiness、promotion decision、runbook、checkpoint、baseline 与 handoff 的响应仍由原 service builder 产生，路由层只保留相同的参数读取、reply 状态码和 Markdown content type。因为 handler 本体未改写，响应对象的字段顺序、缺省值、错误传播方式和 ledger 访问次序都延续旧实现。

## 五、上游证据与配置如何处理

`OpsSummaryRouteDeps` 中的 `config`、audit log、operation intent、dispatch、checkpoint、baseline、promotion decision 与 snapshot service 原样传入各 registrar。重构不加载 Java 或 mini-kv 新证据，不读取 sibling 工作树，也不改变 `UPSTREAM_PROBES_ENABLED` 或 `UPSTREAM_ACTIONS_ENABLED`。这是一轮纯 Node 组合整理，所以两兄弟项目可以独立并行。

## 六、旧服务流的真实形状

旧函数按固定顺序注册 46 条记录：先 summary/readiness，再整组 promotion archive，然后 promotion review 与 decision，接着 runbook、checkpoint list/diff、baseline 三方法、checkpoint detail/create，最后 handoff report。代码并没有复杂条件分支，但一个函数同时承载五种生命周期，使“顺序合同”和“业务职责”纠缠在同一跨度里。

## 七、新服务流怎样展开

新的公共入口只按顺序调用 `registerSummaryRoutes`、`registerPromotionRoutes`、`registerRunbookCheckpointRoutes` 与 `registerHandoffRoute`。runbook/checkpoint 组在原位置调用 `registerBaselineRoutes`，所以它虽然形成独立职责，却没有被挪到整组末尾。控制流现在从四个动作就能读出整张 ops 路由地图，细节再按需要下钻。

## 八、组合根为何只有六行

组合根的职责是表达模块装配顺序，不应知道 query schema、状态码或报告构造细节。六行实现包含函数签名、四次有序调用和结束括号，恰好展示稳定骨架。它没有使用循环或字符串表驱动，因为五组路由的 handler 形状明显不同；强行数据化只会把类型信息藏进 `unknown` 和分派逻辑。

## 九、为何采用文件内 registrar

这些路由共同依赖 `OpsSummaryRouteDeps`，也共享 baseline 与 promotion review 的局部构造函数，仍属于同一个公开 ownership boundary。拆成五个顶层 route 文件会增加导航和 import 成本，还会触碰 80 个 route 文件的增长上限。因此本版在原文件内提取私有函数，获得职责隔离，同时不制造新的公共模块或文件家族。

## 十、契约 oracle 的设计

`test/opsSummaryRouteComposition.test.ts` 构造一个极小 recorder，提供 `get`、`post`、`put`、`delete` 四个方法。每次注册只记录 method、path、schema 与发生顺序，然后立即返回 recorder。测试不启动 socket，不调用 handler，不需要真实 store；它专门回答“组合代码是否仍注册了同一张有序接口表”这一问题。

## 十一、为什么先让 oracle 失败

测试最初把数量写为零、摘要写为未冻结值，在生产源码尚未修改时运行。失败信息从旧实现报告 46 条记录，再报告 SHA-256 `7de62deb...c1957`。随后才把这两个旧事实写入断言并确认绿色。这样摘要来自重构前的真实表面，而不是根据重构后结果反向调整测试，避免自证式快照。

## 十二、摘要具体覆盖什么

recorder 对每条注册保留 HTTP 方法、完整路径、可序列化 schema 以及数组位置。无 options 的 handler 记录 `schema=null`，带 query/body 约束的路由记录原 schema 对象。任何方法替换、路径拼写漂移、required/minimum/maximum/enum 改动或调用位置移动都会改变序列化字节，进而使摘要测试失败。

## 十三、为何不只依赖 Fastify 路由树

Fastify 的 `printRoutes` 会按前缀树合并节点，因此打印顺序不等同于源码注册顺序，例如共同前缀可能让后来注册的分支出现在较前位置。recorder 直接截获调用，能冻结真正的装配次序。真实 Fastify 行为仍由现有 `buildApp` 与 inject 测试覆盖，两层测试分别负责组合合同与运行结果。

## 十四、summary 组的职责

`registerSummaryRoutes` 只有四行，继续注册 `/api/v1/ops/summary` 和 `/api/v1/ops/readiness`。readiness 仍从同一次 handler 内创建的 summary 派生，没有缓存、共享可变状态或新的异常处理。这个最小组让维护者立刻看到 ops 入口的总览面，而无需先穿过 promotion 的几十条归档路由。

## 十五、promotion 组的职责

`registerPromotionRoutes` 先委托 `registerOpsPromotionArchiveRoutes`，再注册 review、decision list、integrity、verification、evidence、detail 与 create。其 91 行主要是显式 Fastify schema 和 handler，不是分支算法，扫描复杂度为 1。把它保持为一组，可以连续审查从归档证据到人工 decision ledger 的完整只读与记录表面。

## 十六、archive 委托位置为何重要

promotion archive 原来紧跟 readiness，且位于 promotion review 之前。新实现仍在 promotion registrar 的第一行调用 archive registrar；公共组合根又在 summary 之后立即调用 promotion 组。因此 46 条 recorder 记录的相对位置完全不变。若未来有人把委托放到组尾，摘要会立即揭示漂移，而不是等某条前缀冲突在运行时出现。

## 十七、decision schema 如何保留

list 的 limit 仍限制在 1 到 100，integrity 与 evidence 的 format 仍只允许 json/markdown，create 的 reviewer 与 note 长度约束也原样保留。POST 仍先调用 `createPromotionReview`，再向 ledger 创建记录并返回 201。提取函数没有抽象 schema 字符串，也没有共用一个宽泛 options 对象，所以 TypeScript 仍能在原注册点检查泛型参数。

## 十八、runbook/checkpoint 组为何放在一起

runbook、checkpoint 与 baseline 构成同一运维时间线：runbook 描述当前操作规则，checkpoint 固化某一时刻的 summary/readiness，baseline 选择比较基点。`registerRunbookCheckpointRoutes` 保留 runbook、list、diff、detail 与 create 的显式顺序，并在中间调用 baseline registrar。这个边界贴合业务关系，比按 HTTP 方法拆组更容易理解。

## 十九、baseline 为何另成 registrar

baseline 同一路径拥有 GET、PUT、DELETE 三种方法，内部还涉及 checkpoint lookup、latest 选择与状态重建。将 38 行提取为 `registerBaselineRoutes`，维护者可以在一个连续区域审查基线的完整生命周期。它仍调用原 `createBaselineStatus` 与 `createOpsBaselineStatus`，没有增加 store wrapper，也没有改变清除后的返回对象展开顺序。

## 二十、最容易犯错的顺序细节

baseline 在旧代码中位于 checkpoint diff 之后、checkpoint detail 与 create 之前。若按视觉分类把三条 baseline 路由整体移到 checkpoint 组末尾，表面路径虽都存在，注册顺序却改变。本版让 runbook/checkpoint registrar 在原位置调用 baseline helper，再继续 detail/create；oracle 摘要因此保持完全一致，这是重构最关键的细节。

## 二十一、handoff 组为何单独收尾

handoff handler 会采样 snapshots，并组合 summary、readiness、audit events、intents、dispatches 与 intent events，再按 query 返回 JSON 或 Markdown。它是唯一异步聚合多个本地来源的 ops 路由，35 行逻辑与前面 CRUD 风格明显不同。独立后，读者能够单独检查采样、limit 和 renderer，而无需翻过 baseline 写入流程。

## 二十二、依赖闭包为何安全

每个私有 registrar 都接收同一个 `deps` 引用，handler 仍在注册时闭包捕获它。没有复制 ledger、没有创建第二个 snapshot service，也没有把依赖存入模块级变量。因此请求之间的状态共享语义与旧实现一致，测试并行时也不会因新全局状态交叉污染。函数提取改变的是词法位置，不是对象生命周期。

## 二十三、异步公共签名为何保留

内部注册调用目前都是同步的，但公共函数历史签名是 `async` 并返回 `Promise<void>`，`src/app.ts` 也使用 `await`。本版没有为了少一个 Promise 就修改公开合同。保留签名可以避免调用方和测试发生无价值变化，也给未来需要异步 plugin 注册时留下原有兼容面；私有 registrar 则明确返回 `void`。

## 二十四、请求 schema 仍放在哪里

schema 继续紧邻对应 route handler，而不是抽进一个远处的共享字典。limit、format、body required、字符串长度等约束在阅读处理逻辑时就能看到；只有真正共享的业务 builder 继续由 service 层拥有。这样的局部重复属于不同端点的明确合同，不满足三次同构实现规则所指的行为复制，因此没有为了缩行数制造 schema 引擎。

## 二十五、函数尺度如何机械证明

维护扫描器按物理源码跨度测得公共入口 6 行，summary 4 行，promotion 91 行，runbook/checkpoint 80 行，baseline 38 行，handoff 35 行；每个 registrar 的分支复杂度都是 1。最长替代函数低于 120 行长函数阈值，也远低于旧入口 239 行。收益不是视觉折叠，而是账本能复现的职责缩小。

## 二十六、账本怎样只收紧

实现完成后的第一次 census 使用未改基线运行，只报告 `src/routes/opsSummaryRoutes.ts|registerOpsSummaryRoutes` 一条 stale，没有 unknown 或 grown。确认新函数都低于阈值后，才从 `docs/plans3/maintainability-baseline.json` 删除这一条。最终计数从 `85/111/228/0` 变为 `85/110/228/0`，文件、复杂函数与环均未增长。

## 二十七、路由文件上限为何没被绕开

顶层 `src/routes/*.ts` 仍是 80 个文件，顶层 `src/services/*.ts` 仍是 1125 个文件。所有私有 registrar 留在既有文件，测试 recorder 位于 test 目录，不进入运行时表面。`governanceGrowthRatchet.test.ts` 机械检查这两个数字，所以本版无法通过把一个长函数拆成五个新 route 文件来伪造优雅度提升。

## 二十八、安全边界保持什么

重构没有触碰 access guard 注册、身份 header、role 或 approval policy。summary 与 readiness 仍只汇总状态；baseline 和 decision 的既有本地写入能力未扩大；handoff 仍只采样并渲染。没有新增 shell、网络客户端、child process、凭据读取或 managed-audit 连接。函数名中的 promotion 或 handoff 仍不等同于生产授权。

## 二十九、读写能力如何区分

GET 路由继续调用 list/get/integrity/sample 等既有读方法，POST promotion decision、POST checkpoint 与 PUT/DELETE baseline 继续使用原 ledger/store 方法。提取没有把不同方法塞进统一动态 dispatcher，因此每一处可能写入本地状态的 handler 仍直接可见。评审者可以在对应 registrar 内准确定位 201 返回与 mutation，而不会被通用表格隐藏。

## 三十、测试覆盖分成哪几层

第一层是 46 条注册记录摘要，防 method/path/schema/order 漂移；第二层是 summary、handoff、promotion core/list 五文件十一项代表性 inject 测试；第三层是所有 `ops*.test.ts` 的受限 worker 矩阵，覆盖 baseline、checkpoint、runbook 与完整 promotion archive；第四层是 maintainability、elegance、family 和 governance 的反例门。

## 三十一、为什么限制 Vitest worker

这个仓库测试文件很多，历史上一次无界全量运行曾产生大量 Node worker 并占用数 GB 内存。v2214 的 ops 矩阵显式限制最多四个 worker，批末全量也采用分片与受限并发。这样失败仍能定位到具体文件，同时不会把机器资源压力误判为断言失败，更不会通过盲目加 timeout 掩盖测试调度问题。

## 三十二、失败时应按什么顺序排查

若 recorder 摘要失败，先打印注册数组并比较第一处 method/path/schema/order 差异；若摘要通过而 inject 失败，检查 handler 是否在移动时丢失 reply type、201 或默认 limit；若 maintainability 失败，确认是否出现超过 120 行的新函数；若 growth ratchet 失败，检查是否误增顶层 route/service 文件。不同证据负责不同故障，不应互相替代。

## 三十三、后续维护者如何新增路由

新增 summary 类只进入 summary 组，promotion 生命周期进入 promotion 组，checkpoint 或 baseline 修改进入对应 registrar，跨来源交接输出进入 handoff。添加后必须有真实 handler 测试，并有意识地审查注册位置造成的摘要变化；只有产品合同确实改变时，才在变更说明中更新冻结摘要。若某一组未来超过 120 行，应先寻找新的业务子边界，而不是恢复万能入口。

## 三十四、Java 与 mini-kv 的并行关系

本版不需要新鲜 sibling evidence，也不运行 live capstone。Java 可以继续自己的 renderer 或结构治理，mini-kv 可以继续 manifest 与 receipt 整理；Node 没有读取、构建、测试、启动、停止或修改它们的工作树。未来若某条 ops 路由消费新合同，必须另立功能版本，写明所需上游版本、端口、owner、清理和 no-write 证明。

## 三十五、验证为什么安排在讲解之后

本讲解在批末大验证前写成，避免先看到绿色结果再用文档为实现找理由。接下来统一执行 repository-wide lint、静态门、受限分片全测、独立测试发现、build 与 historical fallback HTTP smoke；结果写回归档证据和计划。若任何门失败，先修代码或讲解，再重跑相关层，不修改冻结合同来迁就实现。

## 三十六、远端首次失败揭示了什么

首次 Node Evidence 在安装、类型检查、零告警 lint 和所有静态门通过后，只在 preview parity oracle 上失败。两种 ready 状态的 JSON 都比 Windows 结果多 38 字节，但 Markdown 字节和摘要完全一致。这说明路由重构本身没有改变，差异位于 Markdown 未展示的 JSON 字段。用 Linux Node 22 容器挂载同一仓库后，能够精确复现 runner 的 1,752,423 字节和 `a3b206ca...f1957bc` 摘要，排除了 CI 并发、Node 版本和偶发时钟因素。

随后按对象树逐层计算子摘要，唯一漂移子树是 value-supply approval packet draft。继续下钻后发现，同一个 Node 历史证据路径分别出现在 files 记录和 snippets 记录中，每处在 Linux 恰好多 19 字节。原 helper 只把当前工作目录替换成 `<repo>`：Windows 当前目录正好是 `D:/nodeproj/orderops-node`，Linux 当前目录却是 `/repo`，所以同一声明路径在两个系统上被不对称处理。这个问题属于 oracle 的可移植性缺陷，不是产品 profile 漂移。

## 三十七、修复为什么没有削弱 oracle

修复没有更改四个冻结字节数和 SHA-256，没有修改 fixture，也没有触碰生产 loader、assessment、profile 或 renderer。`normalizeText` 仍先统一斜杠，只是把“运行时仓库根”和“证据中声明的仓库根”都作为明确根路径处理，并要求后面必须是字符串结束或 `/`。因此 `D:/nodeproj/orderops-node/src/a.ts` 会归一化，而 `D:/nodeproj/orderops-node-copy/src/a.ts` 不会被误伤。新增测试分别覆盖 POSIX 运行目录、Windows 反斜杠声明路径、前缀碰撞和嵌套对象递归。

Windows 上原有 parity oracle 与新增测试共 2 文件 3 项通过；随后在只读挂载源码、使用匿名依赖卷的干净 Linux Node 22 容器里执行 `npm ci`，同样 2 文件 3 项通过。因为期望值未动，而且 Linux 现在必须产生与旧 Windows oracle 相同的摘要，这次修复提高了契约强度：以后任何宿主路径差异都不能冒充业务变化，真实字段、顺序或字节漂移仍会让摘要立即失败。

## 三十八、一句话结论

v2214 用覆盖 46 条 method、path、schema 与顺序的旧实现 oracle，证明在 HTTP 合同和权限边界不变的前提下，把 239 行 ops 路由入口收敛为 6 行组合根与五个低复杂度职责区，将长函数账本从 111 项机械收紧到 110 项，并把首次远端运行发现的跨平台路径噪声转化为 Windows/Linux 都必须通过的严格回归门。
