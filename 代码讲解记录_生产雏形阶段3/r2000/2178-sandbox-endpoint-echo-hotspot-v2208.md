# Node v2208：沙箱端点回显热点拆分讲解

## 一、这一版解决的不是“文件太长”这么简单

改动前的 `managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.ts` 有 779 行。单看行数，它只是维护性榜单上的第二名；真正让它优先级更高的是，同一个文件还挂着五个函数级债务：`createMiniKvV113Reference` 同时达到 202 行和复杂度 147，`createChecks`、`createJavaV104Reference`、`createSourceNodeV258` 的复杂度分别为 60、39、28。也就是说，阅读者不是单纯需要向下滚动，而是必须在一个文件中同时理解三种外部证据格式、几十个失败默认值、跨项目一致性判断、消息生成和最终 HTTP 响应。v2208 的目标因此定义为“消灭六个精确债务并保持字节输出”，而不是把 779 行随意切成两个 390 行文件。

## 二、原始数据流及其稳定契约

请求到来后，公共 loader 先加载 Node v258 的端点句柄预检，再读取 Java v104 的运行说明、代码讲解和 builder，随后读取 mini-kv v113 的非参与回执、运行说明和讲解。三份来源被投影为 `sourceNodeV258`、`javaV104`、`miniKvV113`，再送入 `createChecks` 产生固定顺序的布尔对象。最后一个 ready 字段由前面所有检查共同决定；该对象又参与 `sha256StableJson`，并被 renderer 展开成 Markdown。因此，字段值相同还不够，键的插入顺序也属于事实上的兼容契约。任何通过对象 spread 重新分组的做法，都必须证明展开顺序与旧实现一致，否则 digest、JSON 字节和 Markdown 段落都有可能漂移。

## 三、为什么先建立强制 fallback 的字节预言机

原测试能够证明关键字段为真、危险边界为假，也覆盖 JSON 和 Markdown 路由，但它没有冻结整个对象。拆分数十个字段时，最容易漏掉的是一个默认值、一个路径形式或一个对象键位置。新增测试直接设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，确保解析器使用仓库内已提交的 Java v104 与 mini-kv v113 快照，而不是依赖开发机上恰好存在的兄弟仓库。测试把 `generatedAt` 固定为 `2026-07-20T00:00:00.000Z`。v2208 占位阶段在 Windows 得到 JSON 26,606 字节、SHA-256 `060e...1584`，以及原始 Markdown 27,561 字节、SHA-256 `619e...8373`；原有四项测试仍通过。随后 v2209 的 Linux CI 证明后两项包含平台路径转义差异：renderer 在 profile 规范化之前执行时，Windows 的反斜杠会先被 JSON 转义成双反斜杠，事后替换无法得到与 Linux 相同的文本。修复后的预言机先递归规范化 profile，再同时生成 JSON 和 Markdown；JSON 摘要保持不变，跨平台 Markdown 固定为 26,245 字节、SHA-256 `159a...7ff5`。这次修正改变的是预言机的可移植性，不是业务输出、fixture 或重构验收标准。

## 四、公共 facade 现在只负责协议装配

重写后的公共 service 为 134 行，但其模块路径、loader 名、renderer 转出和返回类型完全不变。它负责六件事：调用 Node v258 loader，向来源模块索取 Java/mini-kv 引用，向检查模块索取有序 checks，计算最终 ready 与 verification digest，统计证据和消息数量，最后按原顺序组装 profile。路由表以及三个后续消费者仍从旧路径导入，所以仓库外部和内部调用者都不需要迁移。这里刻意没有建立一个新的 service wrapper，因为服务目录已有 1125 个文件的硬上限；新增实现放在 `src/evidence`，也避免把“拆分”伪装成治理链增长。

## 五、来源模块如何划分数据责任

`sandboxEndpointEchoSources.ts` 只处理证据获取与投影，不决定 blocker 或 recommendation。`createSourceNodeV258` 把预检 profile 收窄为 v259 所需的字段；`createJavaV104Reference` 根据 27 条 snippet 生成 Java 回显引用；`createMiniKvV113Reference` 读取结构化 JSON 和 12 条文本证据。历史路径解析、文件大小、文件 SHA-256 仍沿用原 resolver，缺文件时仍返回 `exists=false`、零字节和空 digest。这个模块对 service 类型只使用 type import，因此运行时依赖方向保持为 service 指向 evidence，没有形成 evidence 再加载 service 的新环。维护性 census 也证明运行时循环仍为原来的 2 个。

## 六、mini-kv 的 202 行函数为什么要按语义分组

第一次拆分把旧函数完整搬进新来源模块，复杂度虽然因为声明式合取降下来了，但函数仍有 122 行，维护性门把它标成 unknown。这里只需压缩两行就能越过 120 行阈值，但那不会改善阅读模型，所以继续提取 `createMiniKvSnippets`。最终 mini-kv 解析由四块组成：snippet 目录说明需要在哪些文件找到哪些承诺；`createMiniKvSourceFields` 读取上游版本、来源状态和计数；`createMiniKvReviewFields` 计算网络 allowlist、TLS、脱敏与人工窗口审查；`createMiniKvBoundaryFields` 读取执行、写入、凭据、原始 URL、迁移和自动启动边界。主函数只负责获取嵌套 JSON 对象、按原顺序展开这三组字段，并对完整引用计算 v259 alignment。

## 七、失败默认值为什么不能统一成 false

回执字段有两类语义。`read_only`、`dry_run_only`、来源已就绪等正向声明在缺失时应当是 false；`execution_allowed`、`storage_write_allowed`、`credential_value_required`、自动启动权限等危险能力在缺失时必须是 true，从而让后面的“必须为假”检查失败。v2208 用 `stringOr`、`numberOr`、`booleanOr` 统一读取方式，但每个调用仍显式给出原来的 fallback，没有把不同安全语义抹平成一个默认值。例如缺失 `source_production_blocker_count` 继续得到 -1，而不是 0；缺失 `schema_migration_execution_allowed` 继续得到 true，而不是看似安全的 false。这是 fail-closed 行为的一部分，完整字节预言机和 blocked 分支测试共同保护它。

## 八、检查模块把判断和消息放回同一语境

`sandboxEndpointEchoChecks.ts` 先按旧键顺序构建十九项 checks：三项来源 readiness，句柄与计数对齐，四类审查对齐，五类副作用边界，运行配置和两个固定生产阻断，最后是总 ready 占位。长串 `&&` 被布尔数组和 `all` 表达，目的不是隐藏条件数量，而是让每个条件成为独立的一行事实，同时让 AST 复杂度反映控制流而不是一张数据化核对清单。blocker 规则仍按原顺序过滤未满足条件；warnings 和 recommendations 文案未改。公共 facade 在对象创建后用除自身外的全部值重算最后 ready 字段，赋值不会改变该键原来的插入位置。

## 九、对象 spread 顺序如何保持 JSON 与 digest 不变

mini-kv 引用的 spread 顺序严格对应旧对象：先六个身份与证据字段，再展开 source fields，然后是 endpoint/credential 与四项 review，接着是所有 side-effect 字段，最后放 `readyForNodeV259Alignment`。Java 与 Node 引用同样保留旧字段序列。Java 中根据 snippet 选择 schema、marker、next consumer 的条件表达式没有被重排；mini-kv 中字符串、数字和布尔读取也保持原 key 和 fallback。拆分后预言机仍得到同一 JSON 长度、Markdown 长度和两个 SHA-256，这不仅证明值相同，也间接证明所有可序列化键的顺序、路径归一化结果及 renderer 输入没有变化。

## 十、下游回归为何选这三条链

CodeGraph 的影响分析显示，公共 loader 除了目标路由，还被 `SandboxEndpointCredentialResolverDecisionRecord`、后续 credential-resolver upstream echo 和 disabled precheck 三条链直接或间接消费。focused 批次因此不是只跑目标文件，而是把这三条消费者、维护性对抗测试和治理增长 ratchet 一起执行，共六个文件、二十七个用例。它们验证 v259 的 profile 仍能成为 v260 决策记录的来源，后续凭据解析阶段仍看见相同的阻断边界，禁用预检不会因重构误判为可执行，同时 service/route 文件数仍为 1125/80。

## 十一、基线收紧过程暴露并修复了什么

基线没有在代码一写完就刷新。第一次 census 得到 `87/120/233/2`：六个旧 key 都 stale，但新来源模块出现一个 122 行函数 unknown。这是有价值的失败，因为它阻止我们把“旧长函数”改名后当成完成。提取 snippet 目录后，第二次 census 得到目标 `87/119/233/2`，只剩一个旧文件、一个旧长函数和四个旧复杂度条目 stale，unknown 与 grown 均为零。随后手工删除这六个 JSON 对象，未调用全量 refresh，也没有更改任何其他 ceiling。最终 ready 证明债务是真实减少，而不是阈值放宽。

## 十二、维护者以后应从哪里进入

若需要理解 HTTP 响应形状，从 134 行公共 facade 开始；若某个 Java/mini-kv 字段缺失或 fallback 路径异常，进入 `sandboxEndpointEchoSources.ts` 对应来源组；若 profile 变成 blocked，进入 `sandboxEndpointEchoChecks.ts`，先找 false check，再查同文件中的 blocker 映射。不要把新证据继续塞回 facade，也不要为了复用而让来源模块运行时反向加载 service。若未来出现第三个同结构热点，应先评估提取共享的“来源组装 + 有序检查”引擎，遵守三次规则，而不是复制第三套 sources/checks 骨架。

## 十三、函数级输入与输出怎样逐层收窄

公共 loader 的直接输入只有 `AppConfig`，其中本版本真正参与决策的是 `upstreamActionsEnabled`；它不会接收原始凭据、端点 URL 或可执行命令。Node 来源函数的输入是已经生成的 v258 预检 profile，输出是只包含 v259 回显所需字段的强类型引用。Java 来源函数没有业务参数，它从三份历史文本中输出证据文件状态、snippet 命中状态和固定的回显声明。mini-kv 来源函数同样不接受调用者注入的数据，而是从已解析的回执对象输出来源元数据、四项审查结果和一组副作用开关。检查函数只接收这三个不可执行引用与配置，输出有序布尔对象；消息函数把其中的 false 映射为可读 blocker。最后 facade 才把引用、检查、摘要和 evidence endpoints 合并成 route profile。每一层都把输入缩窄为下一层真正需要的结构，因而维护者可以在边界处观察值，而不必同时理解文件 IO、策略和序列化。

## 十四、一份坏回执会怎样透明地变成 blocked

以 mini-kv 回执缺少 `storage_write_allowed` 为例。`readJsonObject` 仍然返回可检查的对象，`booleanOr` 按旧规则把这个危险权限默认为 true；`createMiniKvBoundaryFields` 将该值放回原字段位置，最终 alignment 数组要求它必须为 false，所以 `readyForNodeV259Alignment` 变成 false。检查模块随后令 `miniKvV113NonParticipationReady` 为 false，总 ready 在 facade 中由全部检查重算为 false，`verificationState` 变成 `blocked`，并生成 `MINI_KV_V113_ENDPOINT_HANDLE_NON_PARTICIPATION_NOT_READY`。整个过程不读取秘密、不尝试连接，也不会用异常跳过剩余证据；输出仍会说明哪个来源不合格。若缺的是文件本身，`evidenceFile` 还会保留原始路径和解析路径，同时给出 `exists=false`、`sizeBytes=0`、`digest=null`。这种可观察的失败链比“解析失败就返回空报告”更利于审计，也解释了为什么危险字段的缺省值看起来反直觉地设为 true。

## 十五、为什么没有立刻把 v2207 与 v2208 做成一个万能引擎

v2207 和 v2208 都形成了 sources/checks/facade 三层，但两者的数据协议并不相同。v2207 对齐的是六个审批边界和十八个制品 ID，v2208 对齐的是端点句柄、凭据句柄、审查计数以及网络、TLS、脱敏和人工窗口；两者的路径来源、失败默认值、消息类型与最终 digest 输入也不同。现在强行建立一个用字符串 key、动态字段表和通用回调驱动的引擎，可能减少表面代码，却会把类型约束、字段顺序和 fail-closed 语义藏进配置，审查成本反而上升。仓库的三次规则要求第三个结构相似实例出现时暂停复制，因此当前保留两套短名、强类型模块是有意选择。若下一次又遇到同类热点，应比较两版稳定后的共同部分，优先提取“按顺序组装 checks”“计算总 ready”“生成规则消息”等真正相同的机制，而不是把所有跨项目字段塞进一个无类型的大对象。

## 十六、分层验证分别能发现哪一类错误

typecheck 负责发现模块迁移后的漏字段、错误 literal 类型和运行时/类型导入混淆，但它不能证明输出顺序。固定字节预言机负责发现任何字段值、键顺序、路径或 Markdown 展开变化，但它不能单独说明后续消费者是否仍按预期解释 profile。三条下游测试因此验证 v260 决策记录、凭据解析回显和 disabled precheck 的业务读取。维护性 census 检查的是结构结果：第一次 122 行 unknown 正是由它发现；治理 ratchet 证明没有用新增 service/route 文件换取短文件。lint、security/config、elegance、family、source-size 和 renderer 门分别约束语法质量、敏感信号、命名债、复制族、绝对体积与渲染标准化。最终完整 suite 用于捕获远距离回归，build 验证真实产物，HTTP smoke 再从编译后服务读取 health、JSON 和 Markdown 并确认端口清理。只有这些层次都绿色，才能把“代码看起来等价”提升为可复现的工程结论。

## 十七、一句话总结（One-sentence summary）

v2208 用字节冻结的证据把一个混合三方解析、策略判断和响应装配的 779 行热点拆成职责清楚的来源层、检查层与公共 facade，真实消除六个维护性债务，同时保持所有只读边界、下游解释和路由输出不变。
