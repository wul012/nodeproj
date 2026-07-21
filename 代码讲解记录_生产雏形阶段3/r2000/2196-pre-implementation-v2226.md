# Node v2226：预实现回声验证的证据所有权重构

## 一、版本目标与明确非目标

v2226 处理的是 Node v272 那条“预实现计划上游回声验证”链。它读取 Node v270 已归档的 credential resolver 预实现计划，再确认 Java v112 是否准确回声该计划、mini-kv v119 是否准确声明不参与，最后把三方事实组合为一份只读 readiness 报告。旧实现已经能得到正确结果，问题不在功能缺失，而在一个 758 行文件同时拥有六种责任：读取本项目基准、扫描 Java 文本、解析 mini-kv JSON、执行跨项目检查、选择 blocker 文案、组装公共 profile。代码一旦需要排查，维护者很难快速判断错误属于输入、解释、判断还是展示。

本版只重构内部结构。HTTP 路径、访问控制、profileVersion、公共字段、检查键序、消息文本、摘要输入、Markdown 字节和 historical fallback 都不在变更范围内。它也不实现真实凭据解析器，不读取凭据值，不解析 raw endpoint，不连接 managed audit，不发送外部请求，不写 approval ledger，不执行 schema migration，更不启动 Java 或 mini-kv。这里的“ready”只表示三项目对一份预实现计划的只读理解一致，不能外推为生产执行授权。

## 二、旧调用链为什么形成维护热点

请求从 `auditCredentialResolverPreImplementationReadinessRoutes.ts` 进入旧 loader。loader 首先调用 Node v270 intake，再在同一文件里建立 Java 五份 evidence file 和四十二条 snippet；随后读取 mini-kv receipt，把 root、receipt、plan、intake、summary 五层对象逐字段映射成九十余项 reference；接着一个大 `createChecks` 将二十二项判断按对象字面量写出；最后 loader 计算 verification digest、收集消息、统计 summary 并返回完整 profile。renderer 虽然单独存在，但类型、证据常量与所有行为仍围绕超长文件名分散。

这种结构有三个实际风险。第一，Java 文本中的一个标记缺失会同时影响 evidence、reference、checks、blocker 和 summary，调试时需要跨越数百行。第二，mini-kv 字段既有必须为 `false` 的安全边界，也有允许 `null` 表示证据缺失的输入语义，若维护者误用带默认值的 mapper，缺失字段可能被悄悄解释成安全值。第三，aggregate readiness 通过遍历 checks 后原地赋值，已经在 operator lifecycle 的多条链路重复；再复制一次会让同一失败关闭规则出现第三种实现。

## 三、目录如何代替超长前缀表达上下文

最终目录是 `src/services/preImplementation/`。进入该目录后，“这是 credential resolver pre-implementation plan echo”已经由路径说明，因此文件只需叫 `verification.ts`、`sourceNode.ts`、`javaEcho.ts`、`miniKvReceipt.ts`、`checks.ts`、`messages.ts`、`profile.ts`、`types.ts`、`planEchoRenderer.ts` 与 `evidence.ts`。renderer 保留 `Renderer.ts` 后缀，是为了继续被仓库递归 census 机械发现；调用者使用 `loadPlanEchoVerification` 和 `renderPlanEchoMarkdown`，不再把整个历史句子复制到每个 TypeScript 标识符中。

短名并不等于丢失语义。每个名字都位于强上下文目录里，而且文件职责比旧前缀更精确：`javaEcho.ts` 明确只解释 Java 回声，`miniKvReceipt.ts` 明确只解释不参与回执，`checks.ts` 明确拥有行为判定，`profile.ts` 明确拥有输出形状。旧结构用名字长度弥补边界缺失，新结构用目录和单一责任承载语义。仓内消费者在同一提交迁移，没有真实外部 TypeScript package consumer，因此不保留会继续制造歧义和命名债的长 alias。

## 四、十八行编排入口如何工作

新的 `verification.ts` 只有一条可读流水线。`createSourceNode` 先得到 Node v270 的基准；`createJavaV112Echo` 与 `createMiniKvV119Receipt` 分别解释两份上游证据；`createPlanEchoChecks` 对三者和当前 config 做有序判定；`createPlanEchoProfile` 再把完成的事实塑造成公共报告。入口自身不读文件、不知道 snippet 文本、不写 blocker，也不计算字段级 predicate。

这个顺序刻意保持旧实现。source 必须先于上游对齐存在，Java 与 mini-kv reference 必须在 checks 前完成，checks 必须在 verification digest 前完成，消息和 summary 则依赖最终 checks。重构没有为了“函数式漂亮”而并行读取或改变求值顺序，因为 evidence resolver 的路径选择、对象插入顺序和 digest 都属于现有行为面。入口变短的价值不是少几行，而是让审阅者在十秒内看到完整业务流程，并能沿着明确模块进入某一阶段。

## 五、Node 基准为何由 sourceNode 独占

`sourceNode.ts` 调用既有 v270 intake，并把庞大的历史 profile 收窄为本版真正需要的 `SourceV270PlanIntake`。它保留 plan state、read-only 标志、禁止执行字段、v269 三项来源检查、plan/intake digest、十个 boundary code、十个 requirement code 和 summary counts。这里没有重新计算 v270 readiness，也没有从归档文本猜测结果；它只引用 v270 已有的强类型对象。

这种 source adapter 隔离了历史版本的字段噪声。若未来 v270 profile 增加展示字段，本版不必自动继承；若本版确实需要新事实，修改点会明确落在 source adapter 和相应 check，而不会顺手扩散到 Java parser 或 renderer。`sourceNode.ts` 仍显式传递所有禁止行为，例如 `credentialValueRead`、`externalRequestSent`、`resolverClientInstantiated`，因为这些不是可省略的装饰字段，而是三项目对齐时必须保持关闭的安全事实。

## 六、Java 文本证据怎样从控制流变成有序数据

`javaEcho.ts` 先建立五个 evidence file：runbook、walkthrough、builder、support 和 records。四十二条期望文本改为有序的三元组规格，每项包含 snippet id、文件路径和期望文字，再统一映射为 `HistoricalSnippetMatch`。这不是把业务规则塞进万能 schema；规格只描述“在哪个固定证据中找什么文本”，而 consumed version、plan state、counts 和 side-effect boundary 的语义仍由具名代码解释。

旧 builder 反复调用 `snippetMatched` 并使用十余个三元表达式，导致主函数进入复杂度账本。新实现建立局部 `matched` 查询，再用 `selectBySnippet` 处理“命中取固定值、否则取 missing/zero”的机械选择；`hasPlanEcho` 与 `hasSideEffectEcho` 分别表达计划回声和八项副作用禁令；`isAligned` 最后要求 evidence 存在、文档完整、消费 Node v270、下一消费者为 Node v272、状态正确且两组边界全部回声。每个函数都低于复杂度阈值，规则名称直接说明失败原因。

## 七、mini-kv nullable 语义为什么不能被默认值吞掉

mini-kv v119 receipt 是 JSON，不是编译期类型。`readJsonObject` 在缺文件、非法 JSON 或非对象 root 时返回空对象；`objectField` 对错误嵌套返回空对象；`stringField`、`numberField`、`booleanField` 在字段缺失或类型错误时返回 `null`。这些 `null` 是证据不完整的信号，后续严格比较必须失败关闭。

仓库已有 `mapReceiptFields`，但它为 text、flag、count 提供 fallback。对某些 receipt 很合适，对本版却危险：例如 `credential_value_read_allowed` 缺失时，若默认成 `false`，检查会把“没有证据”误认为“明确禁止读取”。因此本版没有为了复用而误用共享 mapper，而是保留直接 field reader，并只按连续键序拆成 `sourceFields`、`planFields`、`runtimeFields` 与 `authorityFields`。对象 spread 保持原插入顺序，每个值仍可为 `null`，缺失或错类型不会被美化成通过值。

`createMiniKvV119Receipt` 自身只负责 evidence、snippet、五个 JSON section 和四组字段的组合。最后 `isAligned` 只确认 v119、consumer hint、evidence present 与 verification documented；更细的 no-network、no-write、no-resolver 条件仍由 `checks.ts` 判断。这样“receipt 身份正确”和“receipt 内容足以关闭安全边界”不会混成一个难以定位的布尔值。

## 八、checks 按风险边界组织而不是按文件平均切分

`createPlanEchoChecks` 仍按原公共键序创建二十二项检查。前三项验证 Node source ready、保持 plan-intake-only、保持真实 resolver blocked；随后验证 Java 和 mini-kv evidence identity；再验证状态、计数、boundary codes、requirement codes 与版本/digest 对齐；最后依次关闭 credential、raw endpoint、resolver、connection、write、auto-start 六类运行边界，并检查 config 中 probes/actions 仍关闭。三个 production 标志保持固定 blocked，aggregate readiness 仍位于最后。

复杂 predicate 被按风险概念提取，而不是简单每二十行切一段。`isCredentialBoundaryClosed` 同时检查 Node 不读不存、Java 不读、mini-kv 不允许 load/store/include；`isResolverBoundaryClosed` 聚合 client、secret provider 与 resolver invocation；`isConnectionBoundaryClosed` 聚合 managed-audit 与 external request；`isWriteBoundaryClosed` 再分 Node、Java、mini-kv 三个所有者，避免单个函数因十五项 mini-kv 禁令进入复杂度账本。维护者看到 false check 后，可以直接进入对应风险函数，不必在一百三十行连续 `&&` 中数条件。

## 九、共享 reportCheckAssembly 的提升理由

v2224 与 v2225 已有 service intake、service archive、declared intake、declared archive 四个消费者，共享聚合器原先放在 `operatorLifecycle/`。v2226 成为第三个 bounded context 后，继续从 preImplementation 反向依赖 operatorLifecycle 会错误表达所有权；复制一份又违反三次规则。因此模块提升到 `src/services/reportCheckAssembly.ts`，名称表明它属于报告检查完成机制，而不是某个 lifecycle 子域。

`completeChecks` 接收 draft 与 readiness key。它先确认 key 存在，再排除该 key，要求至少有一项 evidence，并要求所有值严格为 `true`。返回的新对象通过覆盖既有属性完成，因此 readiness 原来在键序中的位置不会移动，输入也不被修改。空 evidence 不会利用 `every([]) === true` 意外放行，数字一、字符串和对象也不会凭 truthy 通过。该函数不理解 v272、Java、mini-kv、route 或消息，因此五个消费者共享的是机制，不是把领域差异隐藏进动态配置。

## 十、profile 层为何独占公共对象顺序

`profile.ts` 先从最终 checks 决定 verification state，再按原字段顺序建立 digest 输入：profile version、state、Node plan digest、Node intake digest、Java receipt version、mini-kv receipt digest 和 checks。之后才收集 blockers、warnings、recommendations，并按旧顺序返回顶层 profile。summary 使用共享 count helper，但 evidence file 与 matched snippet 仍分别从 Java、mini-kv reference 统计。

把 profile 独立出来的核心价值是合同可审阅。公共对象从 `service` 到 `nextActions` 的顺序集中在一个文件，sources 和 checks 无权在读取过程中顺手插入字段。`createEchoVerification` 同样显式复制检查结果，不按字母排序。Markdown renderer 只选择 meta 与 section，完全不参与证据读取或 readiness 推导。未来若确需合同升级，diff 会清楚显示是 profile/renderer 变化，而不是埋在 source parser 的控制流里。

## 十一、内部短名与外部字段的边界事故

本版初次机械替换时，把内部超长 loader、renderer、type 名缩短是正确的，但同名替换也误伤了公共 readiness 属性。TypeScript 可以编译，focused 测试在测试文件同步替换后也可能通过；然而固定时钟完整 JSON 从 52,250 字节变短，Markdown 同样变化，四个 SHA-256 全部偏离 Step-0。这说明“编译绿”和“局部断言绿”并不足以证明无行为变化。

修复原则不是更新期望，而是回到合同所有权：函数叫 `loadPlanEchoVerification` 属于内部 API，可以缩短；类型叫 `PlanEchoProfile` 属于仓内表达，可以缩短；公共 JSON 属性 `readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification` 已被 route 消费和历史归档记录，必须原样保留。恢复后四个摘要精确回到冻结值。这个事故也说明四十字符门只约束新增和可安全迁移的内部名字，不能凌驾于兼容合同。

## 十二、完整字节 oracle 怎样保护这次重构

oracle 固定 `generatedAt` 为 `2026-07-21T00:00:00.000Z`，并分别构造正常 READY 与运行配置 BLOCKED 场景。READY 输出有 22/22 checks、26/26 source checks、八份 evidence、六十八条 snippet、十个完整 boundary 和零 blocker。JSON 为 52,250 字节，SHA-256 是 `fa1bedae0e1fd8a505e593bc464836d83dcb7a934ac89828c8eb3b1ea4d78b00`；Markdown 为 51,719 字节，摘要是 `8fb687c268903457c6d5124c83392f4ee6f1325e20a4dbb7c018cb37718e2f9c`。

BLOCKED 场景把 `UPSTREAM_PROBES_ENABLED` 和 `UPSTREAM_ACTIONS_ENABLED` 都设为真，输出必须保持 state blocked，只通过 16/22 checks、21/26 source checks，并产生四个 blocker。JSON 为 53,007 字节，摘要 `89a9b923e2f3538cb15d300b98725d5c97acc2ed6c9882ed163fc39fcc78a0f8`；Markdown 为 52,252 字节，摘要 `e1aabda5189247a798482e228d9c54b24284e71837b8407740c965454577ec80`。这四个 oracle 在移动、模块拆分、复杂度消除和公共字段恢复后均与改造前一致。

## 十三、现有测试覆盖了哪些真实失败

领域测试验证 ready profile 的版本、状态、三方引用、所有关键禁止字段、checks、summary 和摘要形状；强制设置 `process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 后，resolved path 必须进入仓内 frozen fixture；打开 probes/actions 时，ready 必须关闭且对应 blocker 出现；受保护 JSON/Markdown route 使用完整 operator、roles、verified 与 approval correlation headers，确保二百响应没有绕过 access guard。

下游 disabled implementation candidate review 仍直接消费本版 profile。它继续读取原公共 readiness 字段，并把 source state、三方 checks 与真实 resolver 禁令传入下一阶段。共享 `reportCheckAssembly` 的单测则覆盖输入不可变、键序不变、单项 false、空 evidence 和非布尔运行时污染。三层测试分别保护报告行为、下游调用和共享机制，避免只验证一个 happy path。

## 十四、维护性账本证明没有平移热点

旧 758 行文件从近限文件账本移除，四个超过 120 行的函数和两个超过复杂度 20 的函数消失。最终最大的新文件是 310 行纯类型定义，其余行为文件在 18 到 219 行之间；所有函数都低于长函数和复杂度阈值，导入环仍为零。`verification.ts` 18 行，`sourceNode.ts` 52 行，Java、mini-kv、checks、messages、profile 各自拥有可单独阅读的边界。

全仓维护性计数从 83 个近限文件、94 个长函数、213 个复杂函数、0 个导入环，收紧为 82/90/211/0。命名债从 4,475 降到 4,461，其中文件债 970 降为 966，导出债 3,505 降为 3,495；目标家族十四条违规归零。受管结构 family 仍是 52，没有因为拆文件制造第三个重复 family。两份 baseline 只按真实下降刷新，没有提高阈值或保留宽松余额。

## 十五、三项目边界与后续维护方式

Node 本版读取的是固定 Java v112 与 mini-kv v119 evidence，正常解析和强制 historical fallback 都已验证。Java 与 mini-kv 的当前开发会话可以继续并行，它们不需要等待 Node，也不需要为 v2226 生成新鲜文件。Node 没有构建、测试、启动、停止或修改兄弟项目，更没有把 sibling rolling current 当作历史基准。

以后若 Java 回声增加事实，先在 `javaEcho.ts` 增加明确 snippet 与 identity 解释，再在 `checks.ts` 增加属于该风险边界的 predicate；若 mini-kv receipt 增加字段，应继续判断缺失是否必须为 `null`，只有领域允许默认值时才考虑 mapper；若公共 profile 真要变更，必须由新合同版本、route/consumer 更新和新 oracle共同批准。不要把逻辑重新塞回 `verification.ts`，也不要为了减少文件数把消息、判断和输出顺序混在一起。

## 十六、版本结论

v2226 没有让系统“更能执行”，而是让一条关键只读验证链更容易证明、维护和失败关闭。调用链现在从编排入口清晰落到三方证据解释、风险检查与公共输出；共享 readiness 机制有了正确的项目级所有权；nullable JSON 语义没有被通用默认值破坏；最重要的是，完整 oracle 实际抓住并纠正了一次编译和局部测试都可能放过的合同误改。

因此本版的价值可以用三句话概括：内部结构更短但公共合同不短；共享机制上移但领域规则不上移；账本显著下降但行为一个字节不变。它为 v2227 的 precheck receipt 收敛提供了可复制的边界方法，却不复制具体字段或版本逻辑。
