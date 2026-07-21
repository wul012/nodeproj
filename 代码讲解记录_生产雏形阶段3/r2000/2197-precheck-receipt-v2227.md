# Node v2227：预检回执验证的声明式收敛

## 一、这一版解决的不是新功能，而是旧功能的可证明性

v2227 处理的是 Node v247 的“手动沙箱连接预检上游回执验证”。这条链先读取 Node v245 形成的预检包，再核对 Java v99 是否准确回声七项预检、六个操作员字段和十五秒超时策略，同时核对 mini-kv v108 是否明确声明不参与连接、凭据读取、写入、恢复与自动启动，最后输出只读 JSON 或 Markdown 报告。旧代码能够给出正确结果，但正确性主要埋在一个很长的对象构造器和一串连续布尔表达式中。维护者看到报告失败时，很难立即区分是文件不存在、文本标记缺失、JSON 类型错误、兼容字段优先级变化，还是某一类安全边界真的打开了。

本版没有增加新的 route、profile 字段、检查项或消息，也没有扩大系统能力。它只让已有输入如何变成已有输出更容易追踪，并用机械证据证明重构没有改变公共行为。真实 managed-audit 连接仍被禁止，凭据值仍不读取，Java SQL 与 mini-kv 写入仍不执行，上游服务仍不自动启动。这里的 ready 仍只表示三份历史证据对同一预检方案达成只读一致，绝不等于生产执行授权。

## 二、Step-0 为什么必须推翻计划里的旧文件描述

计划最初把目标描述为“拆分 758 行单文件”，但实际工作树已经经过中间版本演进。正式改动前重新盘点发现，目标由七个平铺生产文件组成：57 行入口、363 行 references、207 行 policy、100 行 core、208 行 types、48 行 renderer 和常量文件，另有一个 255 行测试。若照抄旧计划继续拆“758 行文件”，不仅找不到对象，还可能误以为前置工作已经完成。

现实证据说明真正的热点仍在。mini-kv builder 长 153 行、复杂度 95；policy 的 `createChecks` 复杂度 38；Java builder 复杂度 21；目标文件与导出共有十七条超过四十字符的命名债。于是计划先记录 deviation，再把执行目标修正为：建立真正的 bounded context，按证据所有者拆开 references，保护 root-over-nested 兼容语义，消除三个复杂热点，并让所有仓内调用者迁移到短 API。这里体现的是“现实赢过账本”：计划约束目标和失败条件，但不能替代开工时对代码现状的测量。

## 三、旧调用链的输入和输出到底是什么

入口接收一份 `AppConfig`。第一项输入来自 Node 自身：v245 预检包提供状态、digest、七项 precheck items、六个 required operator fields、十五秒 timeout，以及连接、凭据、写入和自动启动都关闭的事实。第二项输入是 Java v99 的三份历史文件：runbook、中文讲解和 Java builder 源码；系统只检查固定文本是否存在，不编译或启动 Java。第三项输入是 mini-kv v108 的 JSON 回执、讲解和 runbook；系统读取字段类型、数组顺序、版本、consumer hint 与安全标志，同样不启动 mini-kv。

这些输入经过四层转换。证据层把文件变成存在性、字节数、摘要和 snippet match；收窄层把无类型 JSON 变成带明确缺失默认值的 TypeScript 对象；检查层把三方事实变成十八个有序布尔检查；profile 层再根据检查生成 verification state、digest、摘要、blocker、warning、recommendation 和 endpoints。最终输出可以序列化为 JSON，也可以由 renderer 生成 Markdown。输入文件本身不被改写，输出也不会反向触发任何连接或写入。

## 四、目录如何承担上下文，短名如何保持准确

新目录是 `src/services/precheckReceipt/`。进入这个目录后，上下文已经明确是 precheck receipt，因此文件不再重复整句业务名。`verification.ts` 表示编排入口，`sourceNode.ts` 表示 Node 基准，`javaEcho.ts` 表示 Java 文本回声，`miniKvReceipt.ts` 表示 mini-kv JSON 回执，`checks.ts` 表示行为判断，`messages.ts` 表示策略消息，`profile.ts` 表示公共输出，`types.ts` 表示形状，`constants.ts` 表示冻结路径与有序字段，`precheckReceiptRenderer.ts` 表示展示。

短名并没有删掉领域信息，而是把领域信息从每个标识符搬到目录边界。仓内调用者使用 `loadPrecheckReceiptVerification`、`renderPrecheckReceiptMarkdown` 和 `PrecheckReceiptProfile`，足以区分用途。旧超长 alias 没有保留，因为所有 TypeScript 消费者都在同一仓内、同一提交迁移；留下 alias 只会让旧边界继续成为默认入口。公共 JSON 中那个超长 readiness 属性则完全保留，因为它属于外部可见合同，不受内部命名预算支配。

## 五、四十八行编排入口只展示业务顺序

新的 loader 依次执行六步：加载 v245 precheck packet 并收窄为 source；解释 Java v99；解释 mini-kv v108；加载 route quality；建立有序 checks；根据 checks 收集消息并建立 profile。入口不再知道 Java 某段文字在哪个文件，不再知道 mini-kv 某字段在 root 还是 nested receipt，也不再内联 credential 或 write 边界的十几个条件。

这个顺序保留了旧行为。source 在上游解释前建立，三方 reference 在 checks 前完成，checks 在 blockers 和 profile 前完成，digest 只使用最终 checks。没有为了表面上的并行而改变读取顺序，也没有引入缓存或延迟求值。维护者从入口可以一眼看到完整数据流；若 Java evidence 缺失，进入 `javaEcho.ts`；若 JSON 类型异常，进入 `miniKvReceipt.ts`；若所有输入都存在但 readiness 为 false，进入 `checks.ts`。入口因此成为导航，而不是隐藏细节的总管。

## 六、Java 文本证据为何适合用有序规格表达

Java v99 证据本质是十四个“文件中必须出现某段固定文字”的事实。旧 builder 为每项重复创建 snippet、查找 matched id，再用三元表达式填充字段，控制流随字段增加而膨胀。新实现把 id、路径和期望文本放进有序 `SnippetSpec`，统一映射为 snippet match；局部 `matched` 查询负责按 id 取结果，`selectBySnippet` 负责命中与缺失两种值，`hasFieldEcho` 单独确认三个操作员字段名都出现。

规格只表达机械文本匹配，不吞掉领域判断。`isAligned` 仍明确要求 response schema、receipt field、item count、timeout 和 ready hint 正确，并逐项要求 credential echo、credential read、connection、SQL、ledger、managed-audit write、自动启动和 mini-kv write request 都是 false。这样新增一个文本证据时，数据位置和语义判断位置都很清楚；共享 helper 不需要知道 Java v99 或 Node v247，更不会把某个历史版本的规则扩散为万能 schema。

## 七、mini-kv 回执中最危险的是“兼容”两个字

mini-kv v108 同时保留 root 字段和 nested receipt 字段。正确规则是：先读 root 的显式值；只有 root 缺失或类型不正确时，才读 nested 兼容值；两边都不可用时，返回会让安全检查失败的默认值。这里必须使用 `??`，不能使用 `||`。空字符串、数字零和布尔 false 虽然在 JavaScript 中是假值，却可能是上游明确提供的事实；用 `||` 会把它们错误替换成 nested 值。

例如 root 的 `execution_allowed=false` 是明确禁止执行，nested 即使出现 true 也不能覆盖；`precheck_item_count=0` 表示真实不匹配，不能偷偷换成 nested 的七；`receipt_version=""` 表示无效版本，不能借 nested 的合法字符串变成通过。`textPair`、`countPair` 与 `flagPair` 都按“primary 的正确类型值 `??` secondary 的正确类型值 `??` 失败默认值”工作。新增负向测试把空串、零和 false 同时放在 primary，再放入会通过的 nested 值，证明三者原样保留且最终 alignment 为 false。

## 八、失败默认值为何看起来有时为 true

收窄层的默认值必须根据后续判定方向选择，而不是一律设成 false。`dryRunOnly`、`readOnly`、`sourceReadyForPrecheckPacket` 需要为 true 才安全，因此缺失时默认 false；`executionAllowed`、`storageWriteAllowed`、`credentialValueReadAllowed` 和各种 auto-start 标志需要为 false 才安全，因此缺失时默认 true。这样“没有证据”不会被误解释成“安全边界明确关闭”。

这也是 `mapReceiptFields` 的字段规格包含 fallback 的原因。九个 restore 前标志和三个 restore 后标志共享同一机械读取方式，但每项 fallback 仍在规格中显式可见。领域判定没有搬进 mapper；mapper 只负责类型安全取值。`isBoundaryClosed` 再按业务含义要求 dry-run 为真、其余执行和写入能力为假。读值机制与安全策略分开，既减少重复，也避免一个通用默认值悄悄改变 fail-closed 方向。

## 九、数组必须拒绝“过滤后看起来正确”

通用 `stringArrayField` 会收集字符串项，但在安全回执中，仅仅得到字符串列表还不够。若原数组是六个合法字段加一个数字，过滤数字后可能仍得到看似接近的列表；更危险的是错误项恰好替代某个位置时，维护者可能只看到长度而忽略运行时污染。`exactStrings` 因此同时检查原值确为数组，并要求收窄后的字符串数量等于原数组长度。任何非字符串项都会让整组返回 null，再进入 secondary 或最终空数组。

`arrayPair` 对 operator fields 和 precheck items 使用同样的 root-over-nested 规则；`arraysEqual` 再按长度和索引逐项比较，不把数组当集合。顺序属于既有合同，因为上游讲解、操作员审核界面和 digest 都依赖同一有序列表。负向测试给出 `['valid', 1]`，最终得到空数组且 alignment 关闭，证明实现不会通过静默过滤修补坏证据。

## 十、mini-kv alignment 被拆成三种可定位失败

旧实现把三十余个条件串在一个返回表达式中，复杂度达到九十五。新实现把它分为 `isIdentityReady`、`isSourceReady` 和 `isBoundaryClosed`。identity 只回答证据文件、讲解、版本、consumer hint 与 receipt digest 是否可信；source 只回答 mini-kv 回声的 Node v245 状态、计数、timeout、只读属性和有序列表是否一致；boundary 只回答连接、写入、凭据、恢复、存储后端和权威性是否关闭。

三个函数不是按行数平均切割，而是对应三种运维处置。identity 失败时应检查归档和版本；source 失败时应检查三项目是否仍谈论同一个预检包；boundary 失败时必须停止推进并审查权限变化。最终 `isAligned` 只连接这三个概念。153 行 builder 和复杂度 95 的热点因此消失，新函数没有进入长函数或复杂函数账本，也没有把条件藏进难以审查的动态规则解释器。

## 十一、checks 层按风险所有权组织十八项结论

`createPrecheckReceiptChecks` 保留原十八个键和原插入顺序。它先验证 Node source 及只读边界，再验证 Java、mini-kv 和 consumer hint；随后核对 item count、operator field count、字段名与 timeout；接着分别检查 credential、connection、write 和 auto-start；最后确认 route registration、upstream actions 关闭、生产审计与生产窗口继续 blocked，并计算 aggregate readiness。

四个安全函数按风险命名。credential 同时检查 Node 不读、Java 不读不回声、mini-kv 不读；connection 同时检查 Node 未尝试、Java 未打开、mini-kv 不允许执行；write 同时覆盖 Node 请求、Java SQL/ledger/state、mini-kv storage/backend；auto-start 同时覆盖三项目。false check 可以直接定位到一类安全边界，不必在一百多行布尔链中寻找第几个条件。

aggregate readiness 继续调用项目级 `completeChecks`。该 helper 要求 readiness 键真实存在、至少有一项证据检查、所有非 readiness 值严格等于布尔 true，并在不修改输入及键序的情况下返回完成对象。字符串、数字和 truthy 对象都不能通过。v2227 复用的是严格完成机制，不是复制第五套聚合逻辑，也没有让 helper 理解任何 Java、mini-kv 或 route 语义。

## 十二、消息和 profile 为什么必须离开检查实现

检查回答事实真假，消息回答失败后如何向操作员解释，两者变化节奏不同。`messages.ts` 以具名规则收集 blocker、warning 和 recommendation，保留原 code、source、message 与顺序。打开 upstream actions 时，原来的三个 blocker 继续出现；正常场景仍是零 blocker、三条 warning、两条 recommendation。检查函数不再被长文本打断，也不会因为调整说明文字而误改判断。

`profile.ts` 独占公共对象顺序。它先根据 aggregate check 选 verification state，再用 profile version、state、Node digest、Java ready、mini-kv receipt digest 和完整 checks 计算 verification digest，最后按旧顺序返回安全常量、三方 reference、receipt verification、checks、summary、消息、endpoints 与 next actions。renderer 只消费这个完成对象。公共合同的 diff 因此集中可见，source parser 无权在读取过程中顺手改变输出形状。

## 十三、代码健康报告为什么允许一个有边界的摘要变化

`managedAuditSandboxCodeHealthPass` 会扫描一组明确的 live source/test 路径，并根据内容生成派生 digest。旧文件被删除后，若仍保留旧路径，报告可能继续 ready，却是在陈述不存在的代码，这比摘要变化更危险。因此 Step-0 预先声明唯一例外：source path inventory、test path inventory以及由真实文件内容派生的 digest 可以更新。

例外不能扩张。代码健康报告的 route、readiness 规则、检查语义、安全常量和下游 rehearsal guard 都必须保持；focused 测试同时覆盖 code health、rehearsal guard 与 audit precheck routes。换言之，变化的是“被检查的文件现在叫什么”，不是“什么条件算健康”或“系统获得什么能力”。把这项差异提前写入计划，可以避免事后拿“重构”作为任何输出漂移的万能解释。

## 十四、四个完整字节 oracle 如何证明外部行为没动

oracle 固定 `generatedAt` 为 `2026-07-21T00:00:00.000Z`，并强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，确保结果不依赖本机 Java/mini-kv 工作树。READY 场景必须保持 18/18 checks、零 blocker、三条 warning和两条 recommendation；紧凑 JSON 是 21,595 字节，SHA-256 为 `f4ca082735d59dd441b96055dfed43b88a05885e1c118c6729d54fc70b685563`；Markdown 是 21,169 字节，摘要为 `3601456362c2decc6a5a69678c135ea895ede65a830f175550f422636012f30d`。

BLOCKED 场景只打开 `UPSTREAM_ACTIONS_ENABLED=true`。它必须保持 14/18 checks、三个 blocker、三条 warning和两条 recommendation；JSON 是 22,180 字节，摘要 `16d588e7d67b0111dff4055396f3770eb31cf2538eb6540ed124a77aa1577fae`；Markdown 是 21,578 字节，摘要 `ff3b3a90dcea7a61ca4be3960bb928a72762c83ee527b3ece2feb68e0ac32892`。重构后四项与 Step-0 冻结值逐字节一致，测试期望和 fixture 没有修改。它们共同保护字段、顺序、路径文本、消息、摘要和失败状态，覆盖面远大于只断言 `ready === true`。

## 十五、负向测试补上了字节 oracle 看不到的未来风险

完整 oracle 使用当前合法 fixture，能证明正常历史输入的输出不变，却不能单独证明未来坏输入会怎样。新增 `miniKvReceipt.test.ts` 直接向 builder 注入运行时对象。第一组案例锁定 primary 的空串、零和 false 不被 nested 合法值覆盖；第二组案例注入数字版本、字符串布尔和混合数组，确认它们分别收窄为 missing、危险默认值或空数组，并让最终 alignment 为 false。

领域测试继续覆盖正常 profile、强制 historical fallback、upstream actions blocked 和受保护 JSON/Markdown route；下游 focused 测试覆盖 code health 与 rehearsal guard；共享检查测试覆盖 strict-true、空检查、键序和输入不可变。几层测试各自回答不同问题：oracle 证明既有合法行为不漂移，负向测试证明 malformed evidence 失败关闭，route 测试证明访问控制和展示入口仍工作，下游测试证明消费关系没有断裂。

## 十六、维护账本说明热点被消除而非平移

目标家族十七条命名债全部消失。全仓 name debt 从 4,461 收紧到 4,444，其中文件债从 966 降到 959，导出债从 3,495 降到 3,485。维护性从 82 个近限文件、90 个长函数、211 个复杂函数、零导入环，收紧为 82/89/208/0。被移除的是一个长函数和三个复杂函数，十个替代生产文件中没有新的账本条目。

新模块最大文件是 260 行的 mini-kv schema adapter，内容主要是字段规格、显式兼容读取和三组具名判定；它低于近限阈值，也没有长函数或复杂函数。受管结构 family 仍是五十二个，说明拆目录没有制造第三套 renderer、checks 或 profile engine；renderer census 仍为 242/245，三个 raw renderer 都有 composition waiver；全仓没有超过八百行的源码。baseline 只按实际下降刷新，没有提高阈值，也没有留下宽松余额。

## 十七、三项目并行边界和以后怎么改

Node 本版只读取仓内 frozen Java v99 与 mini-kv v108 evidence；local 路径和强制 historical fallback 都有测试。Java 与 mini-kv 可以继续各自工作，不需要为 v2227 生成新版本，Node 也不是它们的审批方。本版没有构建、启动、停止或修改兄弟项目，没有访问新鲜凭据，没有连接网络，没有创建写路径。没有 HTML/UI 变化，因此截图无法证明 JSON 类型收窄、`??` 优先级或完整字节等价，不创建空图片目录。

以后若 mini-kv 增加兼容字段，应先决定 primary 与 nested 的所有权，再选择失败默认值，并为 false、零、空串和错类型补负向用例；若 Java 增加回声事实，应在 snippet 规格中声明位置，并在 `isAligned` 或对应风险 check 中明确语义；若公共 profile 真要变化，必须新建合同版本、更新消费者并重新冻结 oracle。不要把消息塞回 checks，不要把 receipt 字段塞进无类型巨型配置，也不要用 alias 维持已经被迁走的长命名边界。

## 十八、版本结论

v2227 的主要价值不是文件数量变化，而是每一步输入和输出都有明确主人：历史文件由 evidence helper 读取，Java 文本由 echo adapter 解释，mini-kv JSON 由 receipt adapter 严格收窄，安全事实由 checks 判断，处置文字由 messages 选择，公共合同由 profile 组装，展示由 renderer 完成。compatibility 不再是散落的三元表达式，而是可测试的 nullish 优先级；失败默认值不再凭直觉统一，而是按安全判定方向选择。

最终四个输出摘要完全不变，十七条命名债清零，一个长函数和三个复杂函数从账本消失，错误运行时类型新增机械防线。它没有让系统更接近未经批准的真实执行，却让预检证据链更容易审阅、定位和长期维护。这正是后期优雅治理应购买的东西：减少认知成本，同时把兼容性和失败关闭证明得更硬。

## 十九、批次验证为何还修了一处 v2223 遗留

限四 worker 的第二个测试 shard 发现 `workflowEvidenceVerification` 报告当前 Node Evidence workflow 无效。workflow 本身已在 v2223 从 `actions/setup-node@v4` 升到审定的 v7，Node 运行版本仍固定为 22；但验证器的 `nodeSetupPresent` 还硬编码查找 v4，于是把正确的新 workflow 当成缺少 Node setup。这不是 v2227 precheck receipt 的行为回归，而是批次末全仓验证终于让 v2223 的验证器与被验证对象发生了正面碰撞。

修复没有把测试改成接受 false，也没有让验证器宽泛接受任意版本。生产规则改为明确要求 `actions/setup-node@v7` 与 `node-version: "22"` 同时出现；新增测试从真实 workflow 读取文本，只把 v7 替换成退休的 v4，然后要求 `nodeSetupPresent=false`、整体 valid=false 并出现 `NODE_SETUP_MISSING`。单文件四项测试与零告警 lint 通过后，还必须重跑整个第二 shard。这样当前基线被精确钉住，未来 action 主版本变化仍会要求一次可见审查，而不是被模糊正则自动放行。
