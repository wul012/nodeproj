# Node v2219 代码讲解：让两套 resolver echo 安全判定按领域边界阅读

## Goal / 目标与 Non-goal

本版目标是重构两套只读 upstream echo verification 的 checks 生成过程。被处理的两个函数都叫
`createChecks`，分别位于 disabled-precheck 与 test-only-shell 模块；它们在维护性扫描中是全仓
复杂度最高的两个函数，分数为 117 和 114。重构后的目标不是少写几个 `&&`，而是让维护者能沿着
“契约形状、凭据边界、原始端点边界、连接边界、写边界、自动启动边界”逐项阅读，并能明确知道
每一个布尔字段由谁拥有、缺失时如何失败。

Non-goal 同样明确：本版不新增 resolver，不创建 secret provider，不读取 credential value，不解析
raw endpoint，不发出 external request，不执行 schema migration，不写 approval ledger，也不改变任何
生产批准或运行时开关。两个报告仍然只是 Node 对冻结历史证据的只读核对，不能据此推导真实联合执行
已经开放。

## Entry Point / 稳定入口与内部入口

调用者仍从
`src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.ts`
与
`src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.ts`
进入。两个 facade 继续导出原 loader 与 Markdown renderer，路由层和其他消费者不需要修改 import。

实际改动集中在
`src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationChecks.ts`
和
`src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationChecks.ts`。
共享执行器来自 `src/services/liveProbeReportUtils.ts` 的 `allBooleanFieldsAre`。这种布局把稳定入口、领域
策略和通用布尔字段判定分开，避免为了重构内部实现扩大公开 API。

## Response Model / 响应与 checks 模型

disabled-precheck profile 仍包含 19 个 checks，test-only-shell profile 仍包含 20 个 checks。它们的
对象键顺序不仅影响阅读，也会进入 JSON 字节和 verification digest，因此本版把键顺序视为契约。
`createChecks` 仍按原来的顺序写出 `sourceNode...Ready`、Java echo readiness、mini-kv non-participation、
契约形状、各类副作用边界、运行配置开关以及最终 readiness 占位值。

loader 在 checks 初次创建后，仍然排除最终 readiness 键并计算其余值是否全部为 true。随后原有 core
继续生成 `verificationState`、`productionBlockers`、`warnings`、`recommendations` 和 summary。换言之，
本版改变的是“每个 check 怎样得到布尔值”，没有改变“这些布尔值怎样组成对外 profile”。

## Upstream Evidence / 上游证据与配置

disabled-precheck 报告消费 Node v262、Java v106 与 mini-kv v115；test-only-shell 报告消费 Node v264、
Java v107、mini-kv v116，并把 Java v109 作为优化上下文。测试显式设置
`ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，所以所有外部路径都解析到
`fixtures/historical/sibling-workspaces/` 下的冻结副本，而不是依赖当前 Java 或 mini-kv 工作树。

运行配置只读取 `upstreamActionsEnabled`。它在两套 checks 中仍通过逻辑非得到
`upstreamActionsStillDisabled`；一旦测试把开关设为 true，原有 blocker `UPSTREAM_ACTIONS_ENABLED`
仍然出现。这里没有把配置读取塞进字段清单，因为配置对象的语义是运行时门，而不是上游 evidence
对象的字段完整性，两者应保持不同的审查入口。

## Service Flow / 总体调用流程

第一步，core loader 读取 source Node profile 和两份 sibling evidence reference。第二步，它把四个或五个
具名对象传入本版的 `createChecks`。第三步，组合根按既有对象键顺序调用一组语义谓词。第四步，边界
谓词把同一证据对象上的布尔字段交给 `allBooleanFieldsAre`；计数、数组和字符串关系则在具名函数内
显式比较。第五步，core 根据完整 checks 生成 readiness、blockers 和 digest。第六步，renderer 读取相同
profile 输出 Markdown，因此 JSON 与 Markdown 不会出现两套业务判断。

这个流程的关键是“数据定义”和“行为判断”没有混在一起。只读字段清单说明哪些字段共同构成一个
边界；语义谓词说明多个对象之间为何需要相等；组合根说明最终报告有哪些 check 以及它们的稳定顺序。

## Service Flow / disabled-precheck 的契约判断

`isDisabledPrecheckAligned` 先比较 source、Java echo 和 mini-kv receipt 的 precheck mode，再比较
source state 与 consumed profile。最后，它分别检查 Node 与 mini-kv 的 resolver client、secret provider
是否都不可实例化。模式关系和布尔边界故意没有合成一张大表：模式是跨对象关系，字段清单是单对象
约束，拆开后字段归属清晰，类型也能约束正确对象。

`hasAlignedRequiredEnvHandles`、`hasAlignedOptInGates`、`hasAlignedFailureTaxonomy`、
`hasAlignedDryRunShape` 和 `hasAlignedNoGoConditions` 各自拥有一种集合语义。它们先以常量数组长度代替
散落的魔法数字，再用原来的 `arraysEqual` 保持顺序敏感比较。这样未来常量列表合法增删时，count 与
items 不会分离；同时并未把不同列表压入难以调试的通用 schema。

## Service Flow / source v261 继承链

`isSourceV261Aligned` 处理 v262 从 v261 继承的只读边界。验证模式和 source span 属于跨对象文本关系，
继续显式比较；ready、blocksCredentialResolution 以及 credential/endpoint/connection/write/auto-start
五类 alignment 则分别在 Node 和 mini-kv 的 true 字段清单中声明。若 receipt 少回显其中任何一项，
`allBooleanFieldsAre` 会返回 false，不能因为其他字段全部正确而获得 readiness。

这段拆分还消除了原代码中交替读取 source 与 receipt 的视觉噪声。维护者现在先确认文本身份，再查看
两张对称字段清单，就能回答“上游回显是否完整”；不必从十几行 `&&` 中人工配对同名字段。

## Service Flow / test-only-shell 的形状判断

`isShellContractAligned` 保留 shell mode、shell name、resolver kind、profile version 和 contract state 的
逐项相等关系。`hasAlignedRequestShape`、`hasAlignedResponseShape`、`hasAlignedFailureMapping` 与
`hasAlignedGuardConditions` 分别比较计数、完整数组和 Java echo marker。每个函数只回答一个领域问题，
失败时可以直接从函数名定位，而不是先拆解 156 行组合根。

request shape 中的 `handleOnlyRequest`、source handle-only 与 receipt handle-only 仍是独立条件。它们没有
因为都为 true 就被改成一个模糊的“shape valid”字段，因为三个对象分别证明 Node 合同、mini-kv 对
source 的回显以及 mini-kv 自身不参与 credential value 传递。

## Service Flow / fake resolver probe

`isFakeResolverProbeAligned` 把 probe 分成 identity 与副作用两部分。request id 仍必须精确等于
`managed-audit-v264-test-only-resolver-shell-probe`；Node 的 covered/no-read/no-request/no-write 与 mini-kv
的 accepted/no-read/no-request/no-write 分别用 true 字段清单表达；Java 必须回显 probe；最后
`fakeResolverProbeExecuted` 必须为 false。

这里“accepted by fake resolver”与“executed”并不矛盾。前者是冻结契约对测试探针形状的认可，后者是
真实执行边界。显式保留这两个条件，可以防止未来维护者误把契约认可写成运行时调用。

## Data Ownership / 字段清单如何拥有知识

字段清单使用 `as const`，因此 TypeScript 保留每个字符串的字面量类型。把清单传给泛型
`allBooleanFieldsAre` 时，字段必须属于对应对象且其值类型包含 boolean；拼错名称、把 Node 字段交给
mini-kv，或选择一个字符串字段都会在 typecheck 阶段失败。字段清单不是无类型配置，而是可编译验证的
领域规格。

清单按对象和边界命名，例如 `SOURCE_CREDENTIAL_FALSE_FIELDS`、`MINIKV_CONNECTION_FALSE_FIELDS`。
这种命名比一张包含 owner/path/expected 的万能表更直接：读者先知道证据所有者，再知道安全边界，
最后看到期望值由调用点明确传入。新标识符均控制在 40 字符内，没有用超长名字掩盖缺少抽象的问题。

## Failure Semantics / 空清单与重复字段

`allBooleanFieldsAre` 不只是调用 `fields.every(...)`。它先要求清单非空，再要求去重后的大小等于原大小，
最后才逐字段做严格相等比较。空清单不会因为 JavaScript 的 vacuous truth 返回 true，复制粘贴造成的重复
字段也不会伪装成额外覆盖。字段值若为 null、undefined 或缺失，同样不等于期望布尔值，因此保持
fail-closed。

这些行为已有 `test/historicalEvidenceReportUtils.test.ts` 之外的共享 helper 测试覆盖，本版没有复制第二套
validator。复用已经机械验证的执行器，是对 v2215 做法的延续，也符合第三个相似结构出现时先建立共享
engine 的优雅门。

## Credential Boundary / 凭据边界

两套报告都分别检查 source、Java 与 mini-kv。source/Java 的字段包括 resolver execution、value read、
loaded、stored、included；disabled-precheck 还包括 `credentialValueMayBeLoaded`。mini-kv 同时检查 source
回显字段与自身的 required/readAllowed/loaded/stored/included。任何层级变成 true，
`isCredentialBoundaryClosed` 都会失败。

这里保留三次 helper 调用而没有把三个对象 spread 成一个大对象，是为了防止同名字段覆盖，也让审查者
能够看出究竟是哪一方破坏边界。它也避免创建临时 merged evidence，减少对象键顺序和调试输出漂移。

## Endpoint Boundary / 原始端点边界

`isRawEndpointBoundaryClosed` 检查 parsed、included 和 mayBeParsed。test-only-shell 的 source/Java 类型没有
mayBeParsed，因此清单只列实际合同字段；mini-kv 仍同时检查 source 回显和自身状态。类型约束使不同版本
合同的这种差异保持显式，不会为了“看起来对称”虚构不存在的属性。

该边界仍然只验证布尔事实，不读取 endpoint handle 的内容，更不会把 handle 解析成 URL。字段清单中的
`rawEndpointUrlIncluded=false` 也确保报告输出不携带敏感原始地址。

## Connection Boundary / 连接边界

连接谓词覆盖 external request、connectsManagedAudit、resolver/client/provider 实例化等字段。mini-kv 的
清单还包含 implemented 与 invoked，说明“代码是否存在”“对象是否创建”“调用是否发生”“请求是否发送”
是四层不同事实。全为 false 才能通过，不能用 `externalRequestSent=false` 替代前面三层。

本版没有运行任何 live upstream 命令，也没有启动兄弟服务。测试只解析冻结文件并构造内存 profile；
因此连接边界的证明来自合同与历史 fixture，而不是一次真实网络探测，成熟度标签仍保持原授权范围。

## Write Boundary / 写入边界

disabled-precheck 的 write 谓词先显式检查 Node 与 Java 的 `schemaMigrationExecuted=false`，再检查 mini-kv 的
schema rehearsal、migration、storage write、managed audit write、approval ledger、sandbox state、restore、
load/restore/compact、SETNXEX 和 authoritative 等十四项字段。test-only-shell 还检查 Java production record
与 mini-kv source production record。

使用严格 `=== false` 或字段 helper，而不是 `!value`，可以区分“明确关闭”和“字段缺失”。如果 JSON 解析
没有得到布尔值，helper 不会把 undefined 当成安全的 false。这个细节是证据消费者保持失败关闭的核心。

## Auto-start Boundary / 自动启动边界

自动启动谓词检查 source Node、Java echo 与 mini-kv 的 node/java/mini-kv/external audit service 开关。
任何一方允许自动启动都令 check 失败。本版没有把 auto-start 和 connection 合成一个字段，因为启动服务
与发送请求是不同阶段；分别报告能让 blocker 说明更准确，也为未来独立回归保留定位点。

## Blocker Flow / blocker 为什么没有改

两个 `collectProductionBlockers` 仍保留原规则数组、code、source、message 与顺序。它们消费相同 checks，
并只在 condition 为 false 时输出 blocker。本版没有顺手迁移这部分，因为它们不是当前复杂度热点，且
v2219 的证明重点是 predicate composition。把无关重构塞进同一版会扩大字节漂移排查面。

由于 checks 键序和每个布尔值不变，blocker 数组在 ready 与 `UPSTREAM_ACTIONS_ENABLED=true` 两条路径上
均保持原行为。现有负向测试继续证明开关打开时 profile blocked，且 credential/client/provider 字段仍为
false。

## Byte Oracle / 为什么要冻结完整字节

局部断言只能证明几个字段，无法证明对象键顺序、evidence/snippet 顺序、summary 和 Markdown 文案都未
变化。`test/resolverEchoParity.test.ts` 因而固定 generatedAt，并对完整 `JSON.stringify(profile)` 与
renderer 输出计算字节数和 SHA-256。该测试在修改源码前先通过，防止重构者按新实现反推期望。

disabled-precheck 的 JSON 是 38,343 字节，摘要为
`aede3ab9c385c357c21cfea8b86cafdf18054bb38717462e28c85cc8ced59480`；Markdown 是 9,367 字节，
摘要为 `aa6fd14cd0c0c62b4a2499e749ba34df7c8c5a3c5f3be057bc6dadb8b2b7f4a0`。

test-only-shell 的 JSON 是 43,068 字节，摘要为
`d4b4d534e2a571eb290d2f4b436dfe5db4b77fe64aaad5464a6a9458748c7179`；Markdown 是 10,582 字节，
摘要为 `ec8640aeca9d44f828f54a7102aa779f03eaeaf694695899da1c252d47608e5b`。四项全部不变，说明本版没有
用“逻辑上近似”替代合同等价。

## Maintainability / 指标为何是真改善

重构前两个 `createChecks` 都是 156 行，并分别产生复杂度 117/114。重构后组合根只保留稳定键序和具名
调用；新增谓词均低于 120 行与复杂度 20。仓库基线从 85 个大文件、103 个长函数、226 个复杂函数、
0 个导入环，收紧为 85 / 101 / 224 / 0。

两个源文件物理行数因字段清单和语义函数而增加到约四百行，但仍低于 600 行近限阈值，且每一段都有
独立领域职责。这是用可定位结构换掉不可定位分支，而不是只追求总行数减少。扫描结果没有出现未知或
增长债务，也没有把复杂度转移到 helper。

## Test Coverage / 测试覆盖

第一层是新增完整字节 oracle，覆盖两份 JSON 与两份 Markdown。第二层是原有两个 report 测试，覆盖 ready
profile、强制历史 fallback、运行开关负向路径、Fastify JSON/Markdown route 和 access headers。三份测试
合计 12 项并限制为两个 workers，避免再次制造高并发 Vitest 进程树。

第三层是 `npm run typecheck`，它验证字段清单只能引用对应类型的布尔字段。第四层是定向 ESLint 与仓库
静态门，检查命名、重复 family、source size、renderer、archive 和 maintainability。完整全量测试、build、
HTTP smoke 与远端 CI 按计划留到 v2222 统一执行，避免每版重复消耗同一批资源。

## Safety Boundary / 安全边界

`executionAllowed`、`connectsManagedAudit`、credential read/store、raw endpoint parse/include、external request、
resolver/provider instance、schema migration 与 automatic start 的对外值全部保持 false。`productionAuditStillBlocked`
和 `productionWindowStillBlocked` 仍为 true，最终 readiness 只代表该只读 verification 报告自身完整。

本版未修改 `fixtures/`，未写 Java 或 mini-kv 工作树，未创建 approval input，未启动 server，也没有留下
后台 Node 进程。Java 的 v1881 renderer 收敛和 mini-kv 的用户文档可以继续独立推进；Node 不是它们的
前置批准方。

## Maintenance Guide / 后续怎样增删字段

如果将来合同新增纯布尔安全字段，先判断它属于哪一个证据所有者和哪一类边界，再加入对应类型化清单，
并观察 typecheck 与负向测试。若新增的是 count、ordered list、mode、version 或跨对象关系，应修改具名
谓词，而不是强行塞进布尔字段 helper。这样字段的存储类型与领域语义不会混淆。

若需要新增一类边界，应先建立一个能用一句话命名的问题，再创建谓词和对应 check；不要在现有函数尾部
继续添加匿名条件。若第三套 report 出现同样结构，应复用现有 engine 与命名范式，但保留各自合同字段，
避免构建一个接收任意字符串 path 的无类型万能验证器。

## Failure Lookup / 失败时最短排查路径

完整 oracle 失败而 focused profile 仍 ready，优先检查对象键顺序、evidence/snippet 顺序、summary 或 Markdown
格式。某个 boundary check 失败，先打开对应 `*_FIELDS` 清单，再对照 source/Java/mini-kv 三个对象定位变成
非期望值的字段。typecheck 失败则通常是字段名拼错、字段不属于该对象或其类型不含 boolean。

maintainability 出现 unknown/grown 条目时，不应刷新基线掩盖增长；先检查是否把长链搬入新谓词，或新增
函数超过 20 分。只有扫描显示旧热点消失且没有新增热点，才允许用 `--refresh-baseline` 向下收紧账本。

## Stop Condition / 停止条件

v2219 在四组冻结字节不变、3 文件 12 测试通过、typecheck 通过、静态门通过、维护性基线收紧以及本篇
讲解通过中文质量门后停止。下一版进入 disabled candidate 策略，不在本版继续修改 renderer、route、
fixtures 或兄弟项目，从而保持回归范围可解释。

## One-sentence summary / 一句话总结

Node v2219 用类型受约束的字段清单和具名领域谓词替代两条 156 行安全判定链，在完整 JSON/Markdown
字节不变的前提下删除两条长函数与两条复杂函数债务，并继续保持所有凭据、连接、写入和自动启动边界关闭。
