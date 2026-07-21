# Node v2224：operator lifecycle 有界上下文讲解

## 一、先看结果：从整句命名到局部语言

改造前，operator service lifecycle 的入口文件名把系统层级、连接方式、凭据解析器、兄弟项目、
业务阶段和 evidence intake 全部串在一起。名字确实“没有歧义”，但阅读成本被推给每一个 import、
类型标注和测试。开发者想找 renderer，要先在一百多个字符中辨认最后一个词；想比较 intake 与
archive verifier，IDE 标签页前半段完全相同；函数签名中同样的长前缀反复出现，真正有区分度的
`Profile`、`Checks`、`Record` 被淹没。长名没有替代架构，它只是暴露了上下文没有被建模。

v2224 建立 `src/services/operatorLifecycle/`。进入这个目录后，“operator lifecycle”已经是共同
语境，所以文件只需叫 `serviceIntake`、`serviceChecks`、`serviceProfile`、`serviceArchive` 等。
类型也使用 `ServiceIntakeProfile`、`ServiceArchiveChecks` 这类局部语言。HTTP profile 中的长字段
与用户可见标题保持原样，因为它们是历史契约；TypeScript 内部 API 则不再重复整条业务句子。
这不是为了追求短，而是让目录、文件、导出各承担一层信息，名字只表达本层的差异。

## 二、阅读路线与十个职责文件

最短阅读路线从 `serviceIntake.ts` 开始。它读取路径常量，取得 Node 本地 archive 和兄弟项目冻结
JSON，调用 sources 建模，调用 checks 判定，再调用 profile 组装。若要理解字段从哪里来，看
`serviceSources.ts` 和 `serviceTypes.ts`；若要审查为什么 ready，看 `serviceChecks.ts`；若要确认
公共对象顺序和 endpoint，看 `serviceProfile.ts`；若要看 Markdown，只读 `serviceRenderer.ts`。

archive verification 有一条平行但不复制的路线：`serviceArchive.ts` 读取 v386 交付物并重放
intake，`serviceArchiveChecks.ts` 判断 JSON、资产、replay 和安全边界，`serviceArchiveTypes.ts`
定义归档模型，`serviceArchiveRenderer.ts` 负责展示。十个文件看似比七个多，但每个文件的入口
与退出条件更清楚，而且顶层组合函数显著缩短。拆分评价不能只看文件数，要看一次规则变化需要
打开多少不相关逻辑，以及机械门能否指出具体责任人。

## 三、source 层只解释数据，不批准行为

`serviceSources.ts` 读取的是 Java v160 operator lifecycle、mini-kv v151 template 和 v150 frozen
live-read plan。文件引用仍通过 historical resolver 决定本地 sibling 路径还是 committed fallback，
并保留 configured path、resolved path、byte length 与 digest。字段投影复用 v2223 的
`valueAt`、`stringValue`、`stringValues`，不再保留第三份深路径和数组 helper。historical JSON
对象读取则复用 `readJsonObject`，让 BOM、解析和 fallback 规则只有一个真相源。

source builder 只回答“证据声称了什么”：版本是什么、readOnly 是否为 true、operator owner 是
什么、允许列表有哪些。它不回答“这些声明是否足够”。例如 `createMiniKvServiceTemplate` 可以
返回 `operatorRuntimeProbeAllowed=true`，但不会在 source 层抛错或修正；后续 checks 会把该值
判为不安全。这样数据层不会把错误输入隐藏成默认正确，行为层也不会重新解析原始 JSON。

## 四、service checks 怎样保留 45 项原键序

旧 `createChecks` 有 178 行、复杂度 88。它从 sourceNodeV385 一路写到 production boundary，
所有 `&&` 都积在一个函数中。v2224 的 `createServiceChecks` 只按四个连续分组展开：source、Java、
mini-kv、runtime boundary，最后附加总 readiness 占位字段。Java 和 mini-kv 分组仍按旧对象键顺序
返回属性，因此对象 spread 后的 `Object.entries(checks)` 顺序不变，summary 的计数和 renderer
展示顺序也不变。

复杂关系不再挤在分组函数里，而由具名谓词说明意图。例如 `javaReferencesAligned` 负责 v159、
Node v385 与下一消费者 v386 的链路；`javaSmokeTargetsSafe` 负责数量、GET-only 与三个必要路径；
`miniKvFreezeSafe` 负责 v150 fixture、禁止 probe/start/router/write/execution；
`runtimeGateBlocked` 同时核对 intake、Java、mini-kv template 与 frozen plan。审查者可以按威胁面
定位一条谓词，而不必从八十八个分支中推断某个否定号属于哪条规则。

## 五、为什么没有用一个巨大规则数组

把四十五项检查全部写成 `{key, path, expected}` 数据表看起来更短，却会把跨字段关系压成动态
解释器。版本对齐、数组包含、GET-only、历史 fallback 和 no-start/no-write 并不是同一种运算；
若用一个万能 schema 表达，类型系统只能退化为 unknown 与字符串路径，错误会从编译期移动到运行
期。v2224 只把真正同构的读取交给共享 helper，业务关系保留为普通 TypeScript 谓词。

这也符合三次规则：source/Java/mini-kv/boundary 是不同领域分组，不因都返回 boolean 就强行抽象；
相反，`includesAll`、`isSha256`、JSON 取值等完全同构能力已经复用。抽象的判断标准是能否删除
真实变化点，而不是能否让行数更少。最终 `serviceChecks.ts` 虽有 270 行，但没有长函数或复杂
函数，每个名字都指向可独立说明的安全关系。

## 六、两阶段 intake 如何解开 readiness 与 digest 的环

loader 不是读取完 source 后直接构造最终 profile。它先以 `ready=false` 创建 `draftIntake`，其中
包含三个 evidence digest、冻结来源标志、Java lifecycle 是否存在、mini-kv 是否仍是 template、
runtime gate 必须关闭等字段，并对这份 record 计算 intake digest。`createServiceChecks` 随后使用
draft intake 验证 no-start/no-stop/no-write/no-connect 以及 digest 形状，同时验证 source、Java、
mini-kv 和 frozen plan 的其余规则。总 readiness 通过遍历 checks 得出，但明确排除 readiness
自身，避免一个字段要求自己先为 true 的循环。

得到总结果后，loader 用同一组输入重建最终 intake，只把 `ready` 写成计算值；随后再次校验最终
intake digest，并覆盖 checks 中的 `intakeDigestStable`。这个顺序看似多做一次对象构造，却让 digest
覆盖的内容与最终 ready 状态一致，也让每一项检查在 ready 尚未决定时就能独立运行。若改成先猜
ready、边算边修改对象，属性插入顺序和摘要输入都可能随分支变化，完整字节 oracle 会失稳。

v2224 保留了这套两阶段协议，只把检查实现移出 loader。`createServiceChecks` 的输出仍先含 44 项
领域/边界结果和一个 false 占位；聚合后再写最终 readiness，最终 intake 与 digest 再生成一次。
这说明组合根变短并不等于省略关键步骤：真正的优雅是把循环依赖显式展开，让 draft、判定、final
三个状态在代码中可见，而不是用隐藏 mutation 把它们压成一行。

## 七、profile 组装为什么独立成文件

第一次拆出 checks 后，维护性 census 仍指出 `loadServiceIntake` 有 147 行。原因不是读取流程复杂，
而是它尾部直接构造包含几十个稳定字段的公共 profile。若只满足“删除 createChecks”就收工，
loader 仍同时承担 acquisition、assessment 和 presentation shape 三种职责，不符合本版计划。

`serviceProfile.ts` 因此成为唯一公共对象组装者。它拥有 profileVersion、当前 route、source route、
active/next plan 和 nextActions；输入已经是建模后的 source、checks、summary 与 messages。loader
现在只执行 acquire → model → assess → assemble，函数退出时不再逐字段写展示对象。profile 文件
保持 114 行，低于长函数阈值；其 `createServiceProfile` 的条件只有 ready/blocked 两条受控分支，
不会形成新的复杂热点。更重要的是公共对象键顺序集中在一个地方，未来字段调整能被完整字节
oracle 精确捕获。

## 八、archive verifier 也执行童子军规则

archive 文件虽然不是最初列出的最高热点，但本版移动并重命名了它。移动后 maintainability
baseline 会把旧路径视为 stale、新路径视为 unknown；若只是刷新路径，复杂度 35 的 `createChecks`
仍会以新名字继续存在。这不符合“碰过的文件离开时更好”的要求。因此 v2224 同时建立
`serviceArchiveChecks.ts`，把 37 项检查按 JSON、assets、replay 和 archive boundary 分组。

JSON 组验证 profileVersion、45/45、版本、digest、冻结来源和 template-only；assets 组验证 summary、
Markdown、browser snapshot、HTML、截图、解释、讲解和索引；replay 组确认重新调用 intake 后仍使用
v160/v151/v150 且 runtime gate 关闭；boundary 组确认 no-rerun、no-start/stop、no-write、no-connect。
私有谓词如 `summaryMatches`、`replayUsesFrozenVersions` 各自低于复杂阈值。结果不是把一个 94 行函数
平移，而是删除 archive 侧最后一个复杂函数。

## 九、完整字节等价怎样覆盖改名风险

TypeScript 改名本身不会出现在 JSON 中，但移动 profile assembly、checks spread 和 archive assets
判断都可能改变对象键序、计数或文本。验证在改造前后固定
`generatedAt=2026-07-21T00:00:00.000Z`，并分别在本地优先与强制 historical fallback 下运行。
service intake 始终是 45/45；完整 JSON 为 15,922 字节、SHA-256 为
`979c9b8feefed725ffc36a71f7c9ca848ebc3fe610bde75fb589c8361ef168ff`，Markdown 为 13,748
字节、摘要为 `ff34aaa902ccca2a470db1ebc47d8b2035921d48afdac8e95da34d4328b480c9`。

archive verifier 始终是 37/37；完整 JSON 为 12,850 字节、摘要为
`33f4b2f9ebdccd588488d8feba9d295273bcf4ca0b2e09e093e62d483b678016`，Markdown 为 11,147
字节、摘要为 `7098c601672cde98889930557c5300eeef360894fee00e8d2dd791c43079e7e1`。两种来源模式、改造前后
共八组结果一致。fixture、renderer 期望和 profile 断言没有为迁移而修改。

## 十、route 与测试为什么一起迁移

`auditJavaMiniKvActiveShardPlanRoutes.ts` 现在从短路径导入四个入口，注册的两个 URL 字符串保持
原样。路由测试仍通过 Fastify inject 验证带权限 header 的 JSON 与 Markdown；它不是只验证函数
能调用。两份超长测试文件也迁入 `test/operatorLifecycle/serviceIntake.test.ts` 与
`serviceArchive.test.ts`，import 相对路径随目录调整，测试标题和断言保持历史语言，便于对照外部
契约。`rendererMigrationV2170Parity` 改用短入口，但其冻结 length/hash 不变。

这种同步迁移避免了两种常见妥协：一是生产代码已短名，测试仍通过旧 facade，导致新 API 没有
真实消费者；二是为了少改测试而保留超长 alias，账本看似下降却留下双入口。项目是 private
control plane，没有仓外 TypeScript SDK 消费者，因此直接迁移所有仓内调用者比维护永久兼容层
更诚实。

## 十一、renderer census 的递归盲点

初次静态验证显示 renderer census 从 242/245 变成 240/243。两个文件明明还在且继续调用
`renderVerificationReportMarkdown`，下降只因脚本用一次 `readdir(src/services)` 扫描第一层。
若接受这个结果，以后任何未标准化 renderer 都可以通过移动到子目录逃避治理；bounded context
与 renderer ratchet 会形成冲突。

脚本现递归遍历子目录，记录相对路径并使用 `**/*Renderer.ts` 作为公开定义。测试除了继续固定
245 总数、242 标准化、3 个合法 waiver，还明确要求发现
`operatorLifecycle/serviceRenderer.ts` 与 `serviceArchiveRenderer.ts`。waiver manifest 的顶层路径
保持兼容，嵌套文件也进入同一标准化 marker 检查。修复后 census 恢复真实的 242/245，family
logic gate 同样使用完整集合。这个改动保证架构整理不会缩小治理视野。

## 十二、机械账本说明了什么

operator lifecycle 目标家族原有 32 条命名违规，来自 7 个文件名和 25 个导出名；迁移后为零。
全仓 name debt 从 4,537 降为 4,505，文件名债从 984 降为 977，导出名债从 3,553 降为
3,528。baseline 按实测摘要和更低 family 上限刷新，没有保留旧 digest，也没有新增达到三文件
阈值的未知 family。

这里同时核对“数量”和“键摘要”。只看总数会允许删除一个旧违规、再新增一个不同的违规而保持
数字不变；elegance baseline 的 digest 会识别这种等量替换。v2224 的新 digest 对应确切剩余集合，
而目标目录的逐文件 census 为零，所以这次收紧不是用另一批长名字交换出来的。后续版本若误把
超长 alias 加回，即使全仓总数碰巧不变，changed-debt 检查仍会失败。

维护性从 83 个近限文件、98 个长函数、217 个复杂函数、0 个环，收紧为 83/96/215/0。删除项
分别是主 checks、主 loader、主 checks complexity 和 archive checks complexity。十个新职责文件
最高 437 行；没有超过 120 行的函数，也没有超过复杂度 20 的函数。顶层 service 文件数由 1,125
降到 1,118，route 仍为硬上限 80，governance ratchet 通过。这里没有把“文件更多”等同于债务，
机械结果证明新增边界换来了更小的变化单元和更低函数风险。

## 十三、安全边界和三项目并行

本版没有改变 `readyForRuntimeLiveReadGate=false`、execution=false、active shard=false、no-start、
no-stop、no-write、no-connect 等外部字段。source 读取仍只消费已经冻结的 Java v160 与 mini-kv
v151/v150；archive replay 只在 Node 进程内重建 profile，不启动兄弟服务。没有新环境变量、端口、
凭据读取或网络请求。Java 的另一会话可以继续 route split，mini-kv 可以继续自己的维护，Node
不是它们的批准前置条件。

本版没有 HTML/UI 行为变化，截图无法证明 TypeScript 边界和字节等价，因此按证据经济规则只写
JSON 机械证据、归档解释和代码讲解，不创建空图片目录。完整 repo lint、全量测试、build、HTTP
smoke 与远端 CI 按五版批次节奏留到 v2227，当前版本只执行定向与静态门，不提前宣称批次 CI
完成。

## 十四、下一版如何复用而不是复制

v2225 将迁移 declared lifecycle。它与 service lifecycle 共享目录语境、project JSON reader、
source/check/profile/archive 分层方式，但不会复制现有文件再替换版本号。declared 规则拥有 Java
v161 已声明 owner/port/startup、mini-kv v152 declared lifecycle 与 v151 frozen template 的独特
语义；共享的只应是组织模式和真正同构 helper。若出现第三份相同 predicate 结构，届时先抽 engine，
而不是生成 `declaredChecks2`。

因此 v2224 的工程价值不只是减少三十二个长名字。它给一个历史证据链建立了可执行的局部语言，
把读取、判定、组装、渲染与归档验证分开，并修复了子目录可能逃出 renderer 治理面的盲点。下一
位维护者能从目录和短入口直接理解变化位置，同时仍可用完整字节摘要证明这次结构改造没有改写
任何运营契约。
