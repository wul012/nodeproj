# Node v2216 代码讲解：把应用启动过程变成可验证的组合根

## 一、版本目标与非目标

本版目标是把 `src/app.ts` 中 213 行的 `buildApp` 整理成一眼可读的应用组合根，并明确
Fastify shell、request hooks、运行时依赖和路由阶段的所有权。非目标是增加路由、改变
响应、调整 access guard、替换存储、启动 Java/mini-kv 或扩大执行权限。重构的合格标准
不是文件变多，而是生命周期顺序和对象身份都可机械证明。

## 二、buildApp 的输入与输出

公开入口仍接收一个完整 `AppConfig`，异步返回同一个 `FastifyInstance` 类型。调用者
`src/server.ts` 不需要修改，测试仍通过 `buildApp(loadConfig(...))` 构造隔离实例。输入
配置控制日志、上游地址、超时、probe/action 开关、审计存储和限流；输出应用包含原有全部
hooks、OPTIONS、业务路由与 metrics，不新增第二种启动方式。

## 三、旧入口实际承担了哪些职责

旧函数先创建 Fastify 与 request id，再安装错误处理；随后创建两个 WeakMap，注册基础
header hook、access hook 与 CORS OPTIONS；接着构造 clients、snapshots、audit runtime、
限流器和多个 ledger；最后安装计时/audit hook，并顺序注册 15 个路由阶段。问题不是某一
行错误，而是四类变化原因共享同一个 213 行编辑区域。

## 四、新组合根为什么只有十行

新的 `src/app.ts` 依次调用 `createAppShell`、`installAccessHooks`、`createRuntimeDeps`、
`installAuditHooks` 和 `registerAppRoutes`，最后返回 app。十行并非追求极端短小，而是每行
恰好对应一个生命周期阶段。读者不用展开细节，就能回答错误边界、访问上下文、依赖创建、
审计计时和路由装配先后发生在哪里。

## 五、createAppShell 拥有什么

`src/app/createAppShell.ts` 只拥有 Fastify 构造参数与全局 error handler。logger level 继续
来自 `config.logLevel`，request id 继续使用 `crypto.randomUUID()`。它不注册业务路由，
也不创建 store 或 client。这个边界让“HTTP 进程外壳”和“OrderOps 运行时对象”不再互相
遮挡，未来修改日志或错误格式时不必穿过审批链。

## 六、错误映射如何保持不变

`isAppHttpError` 分支仍返回原 status、code、message、details 与 requestId；普通错误仍只
接受大于等于 400 的数值 statusCode，否则使用 500。500 对应 `INTERNAL_ERROR`，其他
HTTP 错误对应 `REQUEST_ERROR`，message 不是字符串时仍回退到 `Request failed`。新测试
主动抛出普通 Error，冻结状态码、消息和响应头中的同一 request id。

## 七、为什么 error handler 必须最先安装

错误外壳在任何 hook 和 route 之前安装，保证后续访问判断、handler 或 audit 路径抛出的
异常都由同一映射处理。新组合先创建 shell，再安装 hooks，保留旧函数的注册顺序。虽然
Fastify 通常允许稍后设置 handler，本版没有利用这种宽松行为，因为启动顺序本身就是应
被保留的工程合同。

## 八、requestHooks 模块的边界

`src/app/requestHooks.ts` 拥有所有“单次请求上下文”知识：基础响应头、access evaluation、
operator identity、verified token 绑定、CORS、开始时间与 audit record。它不拥有任何业务
ledger，也不注册 OrderOps 路由。访问和审计放在同一模块，是因为两者通过同一 request
对象和两张 WeakMap 传递上下文。

## 九、两个 WeakMap 为什么不能重建

access hook 把 `AuditAccessGuardContext` 与 `AuditOperatorIdentityContext` 写入以 request
对象为键的 WeakMap；onResponse hook 必须从同一两张表读取。如果拆分时各模块各建一张
表，audit event 会丢失身份或 guard 信息。`installAccessHooks` 返回明确的
`RequestAuditContexts`，`installAuditHooks` 接收该对象，类型把共享身份写进组合流程。

## 十、基础 header hook 的顺序

第一个 onRequest hook 仍设置 `x-orderops-service`、`x-orderops-request-id` 与 CORS origin。
第二个 onRequest 才评估 access guard 并设置 policy、route group、role、reason、auth mode
等 headers。保持两段而不是合并，意味着最基础的 request id 即使在后续访问判断失败时
也已经存在，响应和日志都能关联同一请求。

## 十一、access enforcement 如何保留

access hook 仍把 method、原始 URL 与 headers 交给 `evaluateAccessGuard`。OPTIONS、未启用
enforcement 或 `wouldDeny=false` 时直接继续；缺身份返回 401，角色不足返回 403。错误 code、
message 和 details 字段逐项沿用旧实现。`authEnforcementActive(config)` 在 header 与分支中
仍按旧位置求值，没有把演练开关缓存成不同生命周期的状态。

## 十二、operator identity 怎样进入审计

`toOperatorContext` 复制 authenticated、operatorId、roles、authSource、rawRoles 与 rejected
roles。若 authorization 存在，再调用 `createVerifiedTokenAuditContext`，required role 缺省
仍为 viewer。它只构造审计上下文，不决定请求是否放行。既有
`accessGuardAuditContext.test.ts` 继续验证 event 中的 guard 与 identity 内容。

## 十三、CORS OPTIONS 为什么位于依赖之前

旧代码在创建任何 client 或 ledger 前注册 `/*` OPTIONS。新实现仍由
`installAccessHooks` 在返回 contexts 前调用 `registerCorsPreflight`，随后组合根才创建
runtime deps。OPTIONS 继续返回 204，allow-origin、allow-methods 和 allow-headers 文本不变。
这个顺序避免预检请求意外依赖业务对象，也保留完整路由树位置。

## 十四、runtimeDeps 的输入输出

`src/app/runtimeDeps.ts` 接收同一个 AppConfig，返回所有 route 和 hook 共享的对象集合。
其中包括 metrics registry、两个上游 client、snapshot service、audit runtime、rate limiter、
checkpoint/baseline/promotion ledgers、生产连接 dry-run approval，以及 intent、dispatch 和
approval 三段状态。返回值类型由实现推导为 `AppRuntimeDeps`，不会维护第二份手写接口。

## 十五、构造顺序为何也要精确保留

这些类当前多数只初始化内存状态，但启动代码不应依赖“构造器永远没有副作用”的假设。
v2216 按旧顺序先 metrics 与 clients，再 snapshots、audit、limiter、ops ledgers、production
approval，最后创建 intents、dispatches、approval requests/decisions 与 execution archives。
审查时发现一次顺序偏移后已主动恢复，而不是用现状无副作用为理由接受漂移。

## 十六、对象身份比类型一致更重要

`OperationDispatchLedger` 必须消费 routes 使用的同一个 `OperationIntentStore`；
`OperationApprovalDecisionLedger` 必须消费同一个 request ledger；audit route、status route
与 response hook 必须共享同一个 AuditLog。依赖工厂先创建局部常量再统一返回，使这些引用
关系在一处可见。它没有每次 route stage 临时 new，也没有隐藏到全局 service locator。

## 十七、audit 计时 hook 如何工作

运行时依赖创建后，`installAuditHooks` 创建 requestStartTimes WeakMap，第三个 onRequest
记录 `performance.now()`。onResponse 从相同 request 读取开始值，缺失时 duration 为 0，
否则计算差值；然后记录 requestId、method、url、access context、operator identity 与 status。
hook 的相对顺序和旧实现完全一致。

## 十八、为什么审计 hook 在 access hook 之后

访问上下文必须先写入 WeakMap，响应审计才能读取；基础和 access hooks 也应先于计时 hook
保持旧注册顺序。虽然计时起点稍后于前两个 hook，这就是旧系统所度量的定义，本版不能
擅自把它前移后声称“更精确”。性能指标的语义属于契约，重构只澄清所有权，不重定义
duration 范围。

## 十九、route stage manifest 表达什么

`src/app/registerRoutes.ts` 用 15 个 `{name, register}` 条目表达应用级装配次序，从 dashboard
一直到 mini-kv。manifest 不保存路径、schema 或 handler；这些仍由既有 route 模块拥有。
它只负责“哪个路由族先注册”，正好对应 buildApp 原来的线性调用。测试从同一 manifest
导出的 names 冻结顺序并检查唯一性。

## 二十、为何 stage 仍使用具名函数

每个阶段的依赖投影不同。audit 需要 auditLog 和两个 clients，approval request 需要 intents、
dispatches、requests 与 limiter，status 还需要 production dry-run approvals。具名 stage
函数让这些需求在调用处显式可读。若改成一个宽泛 dispatcher 和 unknown 参数表，行数可能
更少，却会丢失 TypeScript 对每个 registrar 参数的检查。

## 二十一、dashboard 到 preflight 的顺序

前四段仍是 dashboard、audit、action plan、operation preflight。dashboard 提供人类查看面，
audit 提供证据面，action plan 描述建议动作，preflight 才读取 intent/dispatch 与上游 client
做执行前判断。v2216 没有按字母排序，也没有把所有 GET 路由提前；manifest 保留的是旧
业务启动顺序，而不是视觉整齐。

## 二十二、approval 链为何连续

approval request、decision、evidence、execution-gate archive 四段保持连续。request 与
decision 共享 ledgers，evidence 消费两者，archive 再加入 execution gate archive ledger 和
limiter。连续顺序便于 Fastify 在启动时形成完整审批表面，也让审查者沿同一文件连续确认
授权依赖没有被漏传或换成新实例。

## 二十三、intent 与 dispatch 的关系

intent stage 注册本地意图写入和读取，dispatch stage 使用由同一 intent store 构造的
dispatch ledger。它们仍位于 approval 链之后、ops summary 之前。重构没有把 dispatch
直接连接上游，也没有修改 `upstreamActionsEnabled`。现有 `operationIntent.test.ts` 与
`operationDispatch.test.ts` 继续验证 dry-run 和拒绝路径。

## 二十四、ops summary 与 status 的职责

ops summary 消费 audit log、intents、dispatches、checkpoints、baseline、promotion decisions
与 snapshots，status 消费 config、snapshots、clients、audit runtime 描述和 production
connection approvals。两个阶段共享对象但职责不同，因此没有合并。它们的先后仍是 summary
在前、status 在后，完整路由树摘要可以发现任何交换。

## 二十五、metrics 为什么是独立阶段

metrics 不是外部 route registrar，而是在 app 上直接注册 `/api/v1/metrics`。v2216 将它
包装为 `registerMetricsStage`，仍位于 status 与 order-platform 之间，仍设置
`cache-control: no-store` 并返回同一个 registry snapshot。独立命名使这条特殊路由不再
埋在一长串 await 中，同时不需要创建只含一条路由的新顶层 route 文件。

## 二十六、两个上游路由为什么最后注册

order-platform 和 mini-kv routes 保持最后两段，并继续分别接收既有 client 以及 probe/action
开关。注册它们不代表启动上游；开关仍控制探测和动作边界。应用内治理、审批和状态表面先
完成装配，再暴露上游代理表面。v2216 没有读取新鲜 sibling evidence，也没有改变 timeout
或 endpoint 配置。

## 二十七、循环 await 是否改变行为

旧代码逐行 `await registerX`，新代码按 manifest 顺序 `await stage.register(context)`。
循环不会并行，也不会预先启动下一阶段；任何阶段拒绝时，后续阶段仍不会注册。manifest
数组在模块初始化时冻结，运行中不能 push 或 reorder。异步串行语义、异常传播和 Fastify
注册时机与旧实现相同。

## 二十八、第一层 oracle 冻结什么

改造前用真实 buildApp 执行 `app.ready()`，再以 `commonPrefix:false` 输出 Fastify 路由树。
得到 41,596 bytes、460 行和 SHA-256
`e8fbc705761b2cf5f774d18e4879caf1b46ee6cb11046f4acdb71d6bbd778de9`。
重构后原值通过，能发现路径、方法、schema 树和整体路由集合漂移。

## 二十九、第二层 oracle 冻结什么

Fastify 路由树按前缀展示，不能完全代表源码注册先后，因此测试另行冻结 15 个 stage names。
names 直接由执行 manifest 派生，不存在一份只为测试维护的镜像列表；期望数组来自改造前
的线性调用。阶段重复会被 Set 长度断言发现，顺序交换会由精确数组断言发现。两层证据分别
覆盖“注册了什么”和“按什么族顺序注册”。

## 三十、行为测试覆盖哪些公共边界

新测试对 `/health` 检查 service、request id 与 dry-run access mode；对任意 API 路径发送
OPTIONS，检查 204 和允许方法；再注册一个测试错误路由，验证 500 body 与 header 使用同一
requestId。它不替代既有领域测试，而是专门覆盖从 shell 到 hooks 的公共行为。

## 三十一、代表矩阵为何选十六个文件

矩阵包含 app composition、access guard、audit context、access policy、audit foundational、
dashboard、metrics、action planner、preflight、四段 approval、intent、dispatch 与 status。
这些测试共同穿过 15 个 route stages 和两组 hooks，使用真实 buildApp/Fastify inject，而非
只检查导出存在。54 项全部通过，能及时发现依赖漏传或对象身份断裂。

## 三十二、为什么不引入依赖注入框架

当前应用只有一个组合根，依赖关系能在 42 行工厂和具名 stage 参数中完整表达。引入容器会
增加 token、注册 key、生命周期 scope 和运行时解析错误，却没有解决现有问题。v2216 选择
普通函数与推导类型，依赖图仍由 TypeScript 静态检查，测试也能直接构造整个应用。

## 三十三、为什么建立 src/app 子目录

这些模块共同服务唯一的应用组合边界，不属于通用 services，也不应增加顶层 routes 文件
数量。放在 `src/app/` 让导航者从公开 `src/app.ts` 向下展开，避免在已有上千个 service
文件中再制造四个顶层名字。目录内文件名都短于 40 字符，且每个文件只回答一种启动问题。

## 三十四、维护指标说明什么

`buildApp` 从 213 行降到 10 行并退出 long-function 基线。`installAccessHooks` 是最大替代
函数，63 行、复杂度 1；所有新函数复杂度最高 3。整体账本由 85/107/226/0 收紧为
85/106/226/0，没有新增近限文件、复杂函数或导入环。收益来自职责分离，不是放宽阈值或
把代码移出扫描目录。

## 三十五、从 Java 与 mini-kv 借鉴了什么

Java 最近的 renderer 收敛把组合根与叶子行为分开；mini-kv 的 manifest 收敛用有序列表
冻结集合并对重复失败。v2216 用同样原则表达 route stages，但没有生搬硬套：异构依赖仍由
具名函数传递，manifest 只拥有顺序。兄弟项目代码和契约均未修改，借鉴的是工程范式。

## 三十六、安全边界为何没有扩大

本版没有新增 client、网络调用、credential resolver、shell 或 child process；order-platform
与 mini-kv clients 仍按相同配置构造，probe/action 开关仍传给原 registrar。approval、ledger
和 audit store 的能力没有改变，只是集中创建。`executionAllowed`、生产审核和真实连接的
既有策略不因文件拆分获得任何新许可。

## 三十七、三项目并行关系

Node v2216 是纯本地启动结构重构，不需要 Java 或 mini-kv 新版本、端口或 live capstone。
Java 可以继续归档 renderer 治理，mini-kv 可以继续 manifest 工作；Node 不读取或写入它们
的工作树。mini-kv 当前用户 README 改动保持原样，本版也没有启动或停止任何兄弟项目进程。

## 三十八、后续修改应该走哪条路径

修改 Fastify 全局选项或错误体进入 createAppShell；修改身份、CORS 或 audit timing 进入
requestHooks；新增共享 client/store/ledger 进入 runtimeDeps，并明确对象身份；新增路由族
进入 registerRoutes 的具名 stage 和 manifest。每次改动都要同步对应 oracle，而不是重新
把细节塞回 buildApp。若阶段超过可读范围，再按真实业务边界拆分。

## 三十九、验证节奏如何安排

本版先固化路由树和 stage 顺序，让新模块缺失时测试红；实现后先通过 composition，再跑
16 文件 54 项真实矩阵和 typecheck。文档写完后执行定向 lint、maintainability、security、
archive、elegance、family、renderer、source-size 与讲解质量门。完整分片全测、build、
HTTP smoke 和 CI 按批次约定留到 v2218 后统一执行。

## 四十、一句话结论

v2216 在公开 `buildApp`、15 段路由顺序、41,596 字节路由树、hook 行为和共享对象身份均
不变的前提下，把 213 行应用启动入口重构为 10 行组合根与四个聚焦模块，将长函数账本从
107 收紧到 106，并让未来的 shell、访问审计、依赖和路由修改拥有各自清晰的审查入口。
