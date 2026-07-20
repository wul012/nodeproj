# Node v2209：审批必需边界回显热点重构讲解

## 一、为什么这个文件必须现在处理

改动前的 `managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification.ts` 有 766 行。它并非单纯因为行数大而进入本轮，而是同时命中五项可复现债务：文件超过维护性近限阈值，`createChecks` 和 `createMiniKvV121Reference` 都有 137 行，公共 loader 有 124 行，`createChecks` 的分支复杂度为 78。更重要的是，这五项债务集中在同一条安全关键链路里：代码要读懂 Node、Java、mini-kv 三方证据，又要确保凭据读取、原始端点解析、外部连接、数据库写入和自动启动仍被阻断。继续把字段与判断追加到原文件，会让一次小的上游证据变化同时牵动解析、策略和输出装配。v2209 因而把目标定义为“保持字节与安全决策不变，消除五个精确债务，并解决第三个相似回显实现的重复机制”，而不是为了缩短文件做机械搬运。

## 二、这条链路的输入到底是什么

公共 loader 的显式输入是 `AppConfig`，其中本链真正读取的是 `upstreamProbesEnabled` 与 `upstreamActionsEnabled` 等运行开关。其余输入来自三组只读证据。第一组是 Node v274 已生成的 disabled-candidate 回显 profile，它给出候选决定数量、六个审批必需边界代码以及是否曾读取凭据、解析 URL、创建 resolver、发出请求或执行写入。第二组是 Java v115 的说明、代码讲解、builder、support、record 和 evidence service 文本，解析结果证明 Java 对六类审批边界的解释是否完整。第三组是 mini-kv v121 的结构化回执、运行说明、讲解和 runtime receipt，说明 mini-kv 不参与凭据解析、连接或写入。历史 resolver 可以在本机兄弟仓库存在时读取本地证据，也能在 GitHub runner 上强制转向已提交 fixture；两种路径只影响证据文件位置，不应改变逻辑 profile。

## 三、输出为什么比普通对象更难保持

loader 最终返回的是一个有固定插入顺序的 profile。它包含来源引用、`checks`、三类消息、证据计数、摘要、验证状态与 digest，并由同一模块的 renderer 展开成 Markdown。这里的兼容性不只等于“字段值大致一样”。JavaScript 对象键顺序会影响 JSON 字节，checks 的键顺序又参与稳定 digest；reference 内部数组的顺序会影响 Markdown 表格；路径表示、缺失值与布尔默认值也会改变最终摘要。因此拆分前必须同时冻结 JSON 长度与 SHA-256、Markdown 长度与 SHA-256。只断言几个 ready 字段会漏掉对象 spread 次序、一个不显眼的 fallback 或一条消息顺序漂移，无法证明重构等价。

## 四、红色预言机怎样先证明测试有约束力

新增预言机先把 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK` 直接设为 `true`，避免 `loadConfig` 中同名配置与 resolver 实际读取的环境变量混淆；再把 `generatedAt` 固定为 `2026-07-20T00:00:00.000Z`，递归规范化 profile 中的仓库根路径和斜杠，最后分别序列化 JSON 与调用 Markdown renderer。占位期运行结果是原有四项测试通过、新增一项精确失败，四个占位断言都报告真实值。这一红灯很关键：它证明预言机确实观察整个输出，而不是因为测试路径没有触发就虚假通过。冻结长度为 JSON 38,431 字节、Markdown 37,992 字节。v2210 又把历史文本大小与其规范化 digest 对齐，最终跨平台摘要为 JSON `fe18...fade`、Markdown `6f29...a1c8`；长度不变，fixture 不变，变化只来自两个 metadata 字段改为描述同一份规范化字节。

## 五、131 行 facade 现在只承担协议装配

公共文件仍保留原来的长模块路径、导出函数、类型和 renderer 转出，因此 audit route、v275 readiness review 以及后续 v281/v282 链不需要迁移 import。131 行 facade 依次取得 Node 引用、Java 引用和 mini-kv 引用，把它们交给 assessment 生成 checks 与 echo verification，再计算最终 ready、verification state、摘要和 digest，最后按旧顺序装配 profile。它不再知道 Java 文本里需要搜索哪些 marker，也不再展开 mini-kv 几十个安全字段，更不直接列出十二条 blocker 规则。这里的职责边界可以用一句话概括：facade 决定“怎样把已经准备好的数据和判断装成公共协议”，但不决定“怎样读取证据”或“某个边界为什么通过”。

## 六、Reference 模块只负责把外部事实变成强类型引用

`approvalBoundaryReference.ts` 包含稳定路径、profile/route 常量、审批边界代码、需求代码和每类边界禁止动作目录。`createSourceNodeV274` 把上游 profile 收窄成当前链需要的字段；`createJavaV115Reference` 读取六份文本证据并计算 snippet 命中与 v275 对齐状态；`createMiniKvV121Reference` 读取 JSON 回执与三份辅助证据，生成完整的不参与引用。该模块不生成 blocker、warning 或 recommendation，也不读取 HTTP 请求上下文。它对 service 中的合同类型使用 type-only import，运行时依赖仍由 service 指向 evidence，没有新增反向环。这样当未来某个 Java marker 改名时，维护者只需进入 reference；当 blocker 文案或边界组合变化时，则进入 assessment，不会同时搅动文件 IO 与策略。

## 七、mini-kv 的第二次拆分为何不是追求阈值数字

第一次把旧函数整体搬到 reference 后，五个旧债务都变成 stale，但维护性门又发现一个未知长函数。这说明“从 service 搬到 evidence”并不等于消除维护问题。最终实现把 mini-kv 解析分为四个语义阶段：`createMiniKvEvidence` 只解析文件与回执；`createMiniKvDetails` 把六个边界详情投影为强类型数组；`createMiniKvReceiptFields` 与 `createMiniKvSourceFields` 负责版本、计数和来源声明；`createMiniKvReviewFields` 负责 allowlist、TLS、脱敏和人工窗口；`createMiniKvBoundaryFields` 负责所有执行、连接、写入和自动启动开关。主函数只按原顺序组合这些组并计算最终 alignment。即使把原函数压缩几行也能暂时低于 120 行，但那不会告诉读者一个字段属于来源真实性、审查结果还是副作用边界；本次拆分购买的是可定位性，而不只是绿灯。

## 八、Assessment 模块如何表达判断而不隐藏含义

`approvalBoundaryAssessment.ts` 将 checks 分为来源就绪、代码与计数对齐、安全边界和运行配置四组。每个组都返回带明确字段名的布尔对象，`createChecks` 按旧顺序展开它们，并把最终 ready 占位放回原位置。长串 `&&` 被局部 `all([...])` 收纳，但数组中的每个事实仍然逐行可见；没有用字符串路径反射读取对象，也没有把边界代码与任意回调塞进动态规则引擎。这样既降低 AST 分支复杂度，也保留 TypeScript 对字段名和类型的检查。`createEchoVerification`、`createSummary` 和三类消息生成函数与 checks 放在同一行为语境中，读者看到一个 false 检查后，可以在同一模块找到它如何影响摘要和 blocker。

## 九、第三次规则真正提取了什么

v2207、v2208、v2209 都出现过两段完全相同的机械逻辑：第一段遍历 checks，忽略最终 ready 键，只要其余任何值不为 true 就让总 ready 为 false；第二段过滤 `condition=false` 的规则并按输入顺序映射成 `severity="blocker"` 的消息。v2209 将它们提取为 `allReportChecksPassExcept` 与 `collectFailedReportRules`，并在 `liveProbeReportUtils.test.ts` 直接证明“只排除指定 ready 字段”和“失败规则顺序、code、source、message 原样保留”。随后三代回显共同使用这些 helper。提取边界非常窄：helper 不知道 v2207、v2208 或 v2209，不知道 Java/mini-kv，不读取文件，也不决定任何安全策略，因此复用不会把不同领域协议耦合在一起。

## 十、为什么没有制造一个万能回显引擎

三代实现的表面形状相似，但数据协议并不相同。v2207 关心实现就绪材料，v2208 关心 sandbox endpoint handle，v2209 关心六类审批必需边界；它们读取的版本、文件形态、失败默认值、checks 键和消息代码都不同。如果建立一个接受动态字段表、路径表、谓词回调和文案配置的万能 engine，源码行数可能更少，但类型系统无法自然证明对象键顺序与每个 fail-closed 默认值，审查者还必须在配置和引擎之间来回跳转。本版只共享真实同构的算法，把领域数据和行为保留在命名明确的模块里。这满足三次规则，也避免为了“看起来去重”牺牲机理透明。

## 十一、文件族命名失败暴露了什么设计问题

初稿把两个新模块命名为 `approvalBoundaryEchoSources` 和 `approvalBoundaryEchoChecks`。优雅门随即报告 `src/evidence:sources` 与 `src/evidence:checks` 各出现第三个结构家族。若直接把新名字登记进 baseline，就等于用账本许可新复制。检查实现后可以看到，三代真正共享的 readiness 与 rule mapping 已经提取；剩余模块承担的是本版本特有的“证据引用”和“边界评估”。因此最终改名为 `approvalBoundaryReference` 与 `approvalBoundaryAssessment`。这不是为了绕过字符串匹配：名称更准确地表达职责，新文件也不再假装属于一套可复制骨架。复跑结果为历史 4,537 个命名债务不增长、52 个已登记家族不增长，证明本版没有通过换后缀制造新的扩张入口。

## 十二、最终 ready 怎样避免把自己算进自己

checks 对象为了保持输出合同，创建时仍带一个值为 false 的最终 ready 字段。若直接执行 `Object.values(checks).every(Boolean)`，该占位会让结果永远为 false；若手写 `slice(0, -1)`，又把正确性绑定到“ready 必须永远是最后一项”这种隐含约定。`allReportChecksPassExcept(checks, readyKey)` 显式按键排除唯一的汇总字段，其余键必须严格等于 true。随后 facade 给已有属性赋值，不重新 spread 对象，所以键仍停留在原插入位置，JSON 和 digest 顺序不变。直接单元测试还放入一个无关的 false 字段，证明 helper 不会因为排除了 ready 就错误忽略其他失败；这比只在大型 profile 里间接覆盖更容易定位回归。

## 十三、一次坏证据如何逐层变成可解释的 blocked

以 mini-kv 回执把 `credential_value_read_allowed` 错误设为 true 为例。reference 的边界字段读取函数会保留该危险值，不会替调用者“纠正”为 false；mini-kv 自身的 `readyForNodeV275Alignment` 因此失败。assessment 随后令 `credentialBoundaryAligned` 为 false，`allReportChecksPassExcept` 令总 ready 为 false，验证状态变成 blocked。规则目录按原顺序产出 `CREDENTIAL_BOUNDARY_NOT_ALIGNED` blocker，摘要中的通过检查数同步减少，最终 route 仍返回完整 JSON/Markdown 说明失败来源，而不是抛异常或返回空对象。整个链路不会读取真实凭据、创建 resolver、解析真实端点或连接外部系统。失败是“可观察但无副作用”的，这正是控制面报告应有的性质。

## 十四、v2208 的 Linux 红灯根因与本版修复

v2208 的本地预言机先渲染 Windows profile，再对生成文本执行反斜杠替换。问题是 Markdown renderer 会把嵌套对象 JSON 化，Windows 单个反斜杠先被转义成两个反斜杠；渲染后的简单替换无法得到 Linux 从正斜杠输入生成的同一文本。结果是本地捕获 27,561 字节，而 Linux CI 得到 26,245 字节。v2209 没有把测试改成接受两个答案，也没有修改 renderer 或 fixture；它先递归规范化整个 profile，再把同一个规范化对象交给 JSON 与 Markdown renderer。v2207 原摘要保持不变，v2208 变为 Linux 已观察到的唯一规范值，v2209 使用同样机制。三代预言机 3 个文件、15 项测试同时通过，证明这是测试可移植性修复而非业务漂移。

## 十五、类型检查怎样挡住了一次真实的迁移失误

来源模块第一次抽取时，终端展示长文件的输出被截断，截断标记意外混入新文件。TypeScript 在行为测试之前就以非法字符拒绝编译，因此问题没有进入摘要比对，更没有被提交。修复没有手工猜测缺失段落，而是从 `git show HEAD:` 指向的原提交按精确行段重新取得内容，再进行语义拆分。这个偏差值得记录，因为它说明“看起来只是移动文本”仍需要多层防护：typecheck 能抓语法和类型损坏，字节预言机抓值与顺序漂移，focused consumers 抓下游解释变化。任何一层都不能由肉眼 diff 完全替代。

## 十六、维护性基线为何必须先失败再收紧

实现完成后没有立即删除 baseline。第一次 census 报出五个旧 key stale，同时报出一个新的 mini-kv 长函数 unknown；这迫使实现继续拆分。第二次 census 才达到要求：只有原 766 行文件、两个 137 行函数、124 行 loader 和复杂度 78 的 createChecks 共五项 stale，unknown 与 grown 都为零。随后只手工删除这五个对象，没有调用全量刷新，也没有放宽任何阈值。最终指标从 `87 / 119 / 233 / 2` 收紧到 `86 / 116 / 232 / 2`。其中长函数减少三项，是因为 loader、checks 和 mini-kv reference 都真正低于阈值；运行时循环仍为历史的两个，没有因 evidence 类型引用形成新环。

## 十七、下游验证为什么覆盖这些入口

CodeGraph 显示公共 loader 被 audit route、v275 approval implementation readiness review 以及后续 v281/v282 upstream echo 链消费。focused 批次因此同时运行目标测试、两个后续消费者、路由测试、共享 helper 直接测试、维护性对抗测试和治理增长 ratchet，共 8 个文件、31 项测试。三代字节预言机又单独组成 3 个文件、15 项测试的可移植性批次。前者回答“下游还能否按旧合同解释结果”，后者回答“完整输出是否逐字节稳定”。最终 16 个低并发 shard 全部通过，独立清单确认 568 个文件、1,734 项测试；typecheck、零告警 lint、build 与静态门全部通过。带鉴权头的编译服务 smoke 又得到 health `200/93`、JSON `200/40003`、Markdown `200/39564`，profile 保持 ready 且执行、连接能力为 false，随后精确停止 PID 27808 并确认端口归零。这样远距离回归、真实产物和路由装配都有各自机械证据。

## 十八、以后维护时从哪里进入

若问题表现为某份 Java 或 mini-kv 文件缺失、版本字段不符、snippet 没命中，应进入 `approvalBoundaryReference.ts` 的对应来源函数；若问题是某个边界为何 blocked、blocker 顺序或摘要不对，应进入 `approvalBoundaryAssessment.ts`；若问题是 route 输出缺字段、digest 或状态装配异常，应从 131 行公共 facade 开始；只有当多个报告都需要相同的无领域算法时，才扩展 `liveProbeReportUtils.ts`，并先加直接测试。不要把新上游字段重新塞回 facade，不要把领域策略塞进共享 utility，也不要为了少几行把强类型字段改成字符串反射。这个入口地图使维护者可以沿着“事实、判断、协议”三层定位，而不必重新通读 766 行混合实现。

## 十九、一句话总结

v2209 用跨平台字节预言机守住完整输出，把审批必需边界回显拆成事实引用、边界评估与协议装配三层，提取第三次出现的真实公共机制并收紧五项维护债务，同时保持所有凭据、连接、写入和自动启动边界原样关闭。
