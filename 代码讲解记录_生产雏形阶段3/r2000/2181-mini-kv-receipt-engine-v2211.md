# Node v2211：mini-kv 非参与回执引擎重构讲解

## 一、版本目标与可验证结果

v2211 不增加功能，而是把 mini-kv v114 至 v117 的四条历史回执解析链从复制式代码改成声明式引擎。改造前四个构造函数共占据四条长函数债务和四条最高复杂度债务，其中 v117 还让整个服务进入近上限名单。改造后公开 loader、类型、对象键顺序、JSON、Markdown、摘要和安全结论全部不变，维护性账本从 86 个近上限文件、116 个长函数、232 个复杂函数、2 个循环，收紧为 85、112、228、2。这里的“更优雅”由完整字节预言机和 AST census 同时证明，不靠主观评价。

## 二、四份回执为何属于同一个工程问题

v114 是 credential resolver 决策记录，v115 是 disabled precheck，v116 是 test-only shell，v117 是 fake-shell archive。业务名不同，但输入机制高度同构：每条链都从历史 resolver 取得 JSON，找到一个根 receipt，再读取字符串、布尔和计数字段；字段缺失或类型错误时采用失败关闭默认值；最后检查证据齐全、摘要合法、来源阶段匹配，并确认凭据、网络、存储和自动启动均未开放。AST 对比还发现 v114-v116 有 52 个完全相同的 readiness 条件。继续维护四份手写流程，只会让共同规则逐渐分叉。

## 三、改造前的输入与输出怎样流动

以 v115 为例，输入是 `disabled_credential_resolver_precheck_non_participation_receipt` JSON。旧函数先读取 root、receipt、disabled_precheck 与 dry_run_response_shape，再逐行执行 `stringField(...) ?? ""`、`booleanField(...) ?? true`、`numberField(...) ?? -1`。随后它把一百多个值按固定顺序写入 reference，最后用一百余行 `&&` 计算 `readyForNodeV263Alignment`。输出会进入上游回显 profile，再由 JSON route 与 Markdown renderer 暴露。任何默认值、字段次序或判断变化都会传播到摘要，因此这种代码并非可以随意格式化的内部实现。

## 四、为什么先冻结完整表面

重构前新增 `sandboxResolverEchoParity.test.ts`，强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，把顶层 `generatedAt` 固定到同一时刻，并将仓库路径规范为 `<repo>`。测试同时序列化四个完整 profile，再调用四个原 renderer，记录 JSON 和 Markdown 的字节数与 SHA-256。最初故意放入零和 pending，占位断言精确红出八个真实值；这些值在生产源码未变时写死。此后若字段少一个、顺序换一次、默认值不同或 renderer 输入漂移，至少一个完整摘要会失败，不能通过修改局部断言掩盖。

## 五、便携化测试助手解决了什么

仓库已有三份完全相同的 `normalizeForParity`、`normalizeText` 与 `sha256` 测试助手。第三次重复本应触发共享抽象，因此 v2211 把它们放入 `test/support/portableProfileParity.ts`，三份旧预言机和新预言机共同调用。它递归保持数组和对象的原顺序，只规范路径分隔符与仓库绝对前缀；它不会删字段、排序键、屏蔽摘要或把字节数替换成占位符。这样 Windows 与 Linux 比较的是同一语义表面，而路径之外的任何差异仍然可见。

## 六、有序字段引擎的职责边界

`mapReceiptFields` 扩展在既有 `historicalEvidenceReportUtils` 内，因为字符串、布尔和数值的安全读取本来就在这里。调用者提供一组有序四元组：输出键、输入键、种类和默认值。引擎按声明顺序遍历，调用现有 `stringField`、`booleanField` 或 `numberField`，把结果写入新对象。它不认识 v114、resolver、archive 等业务概念，也不读取文件或决定 ready；它只保证“按什么顺序、从哪个键、以什么类型、失败时取什么值”这一项机制有唯一实现。

## 七、类型系统怎样保护声明

字段清单使用带字面量键的只读 tuple。`ReceiptFieldValue` 根据 tuple 的第三项推导结果类型：text 对应 string，flag 对应 boolean，count 对应 number；`ReceiptFieldValues` 再把每个 tuple 的第一个元素映射为返回对象属性。于是调用 `mapReceiptFields(receipt, V116_SOURCE_FIELDS)` 后，TypeScript 知道返回值包含 `sourceContractState` 等精确键，而不是宽泛的 `Record<string, unknown>`。四个 `readVxxxFields` 又显式声明为各自公开接口扣除元数据和 ready 字段后的类型，漏字段、错类型都会在 typecheck 阶段失败。

## 八、对象键顺序为何被视为合同

JavaScript 普通字符串键按插入顺序序列化，原 profile digest 和 JSON/Markdown 字节冻结都依赖这一点。v2211 没有把字段按类型统一分组后再随意 spread，而是让每份 manifest 依照旧对象的实际顺序排列。版本读取函数也只在原来出现嵌套对象或数组的位置插入相应结果，例如 v114 先写 receipt 来源字段，再写 decision_record 字段，之后才写 required IDs 与共同边界。完整八面预言机通过，说明这种顺序不仅在代码审查中看似一致，而且在最终字节上确实一致。

## 九、失败关闭默认值如何保持

非参与回执的默认值带有安全语义：表示“已证明关闭”的字段缺失时不能乐观返回关闭。例如 `executionAllowed`、`credentialResolverImplemented`、`externalRequestSent` 等字段的默认值是 true，使 readiness 失败；`readOnly`、来源 ready 和证据对齐字段的默认值是 false；计数通常回落到 0 或 -1；文本回落到空串或 missing。manifest 把每个默认值放在字段声明旁边，审查者不再需要从几百行 `??` 中推断。直接测试还用错误类型输入证明 flag 会回落 false，而合法字符串和数字仍按声明读取。

## 十、重复目标键为何必须立即报错

声明式清单的新风险是复制一行后忘记改输出键。如果引擎用普通赋值静默覆盖，最终对象可能只有最后一个值，而且属性位置仍由第一次插入决定，问题很难从肉眼发现。v2211 在写入前使用 `Object.hasOwn` 检查目标键，重复时抛出 `Duplicate receipt target field`。单元测试用两个来源同时映射到 state，证明错误在最小工具层被拒绝。这个机制借鉴 mini-kv v1674 清单对 duplicate、missing、unregistered、stale 的处理思路：清单带来简洁，也必须带来机械完整性。

## 十一、字段清单模块如何组织差异

`miniKvReceiptFields.ts` 只处理数据形状。共同片段分成自动启动、写入、凭据值和末端执行四组；每个版本再声明自己的 source、嵌套对象与模式字段。读取函数负责找到正确 root 和 subgroup，并把声明按旧顺序组合起来。v114 的 releaseVersion 和 consumerHint 保留 receipt 优先、root 兜底的双层规则；v115 的 handle/gate 数组通过统一 namedValues 提取；v116 仍对 probe 的三个负向字段取反；v117 仍从 archive 与 summary 子对象读取计数。共享没有抹平这些真实差异。

## 十二、readiness 模块为何与字段模块分开

字段是否读取正确，与一组字段是否足以判定 ready，是两个变化速度不同的职责。`miniKvReceiptReadiness.ts` 接受已经类型化的 reference，只表达合同条件，不再接触 JSON。四个 `isVxxxReady` 使用 `allChecks` 列出版本专属事实，因此 AST 不会把上百个 `&&` 当成一个复杂控制流；共同的运行时关闭条件进入 `isMiniKvNonParticipant`。如果未来 receipt 增字段但不影响决策，只改字段清单；若治理政策改变，只改判定并由字节预言机审查影响，维护边界比旧函数清晰。

## 十三、共同非参与边界包含哪些事实

四个版本共同要求 readOnly 为真，executionAllowed 为假，resolver 未实现且未调用，secret provider 未实例化，Node、Java、mini-kv 与外部审计服务均不自动启动，连接和存储写入均不允许。它还要求凭据值未读取、加载、存储或包含，原始端点未解析或包含，外部请求未发送，schema migration、restore、load/compact、SETNXEX 均不执行，mini-kv 不成为 managed-audit backend，也不成为订单权威。这些条件现在只写一次，任一版本传入结构不全会在类型检查中失败。

## 十四、v114 仍保留哪些专属语义

v114 要求来源是 Node v260 decision record，并继续验证 v259 的凭据、端点、写入和自动启动边界。它还检查 endpoint handle、credential handle、resolver policy handle、approval marker，以及 8 个必需字段和 9 个 no-go condition 的精确顺序。其模式必须是 `policy-record-only-no-value-read`，候选实现仍为 not-implemented。共同边界之外，v114 额外确认 managed-audit write、approval ledger、sandbox state、schema rehearsal 与 sandbox backend 均关闭，所以共享函数没有偷删任何版本专属保护。

## 十五、v115 仍保留哪些专属语义

v115 面向 disabled precheck，要求 6 个环境 handle、2 个 opt-in gate、7 类失败、12 个 dry-run 响应字段和 9 个继承 no-go 条件全部按既定顺序出现。disabled_precheck 子对象还必须声明 resolver 与 secret provider 均未实现，客户端、凭据、端点和外部请求都不可发生，并明确 opt-in gate 必需。来源 Node v261 的 verification mode、span 与边界布尔值仍逐项验证。字段 engine 只替代搬运，专属 policy 仍在 `isV115Ready` 中一眼可见。

## 十六、v116 仍保留哪些专属语义

v116 描述 test-only fake resolver shell。它继续锁定 source route、shell name、fake-in-memory resolver kind，以及 9 个请求字段、13 个响应字段、7 个 failure mapping 和 10 个 guard condition。fake probe 的 request ID 必须固定，accepted 为真，同时 no credential read、no external request、no production write 为真；实际 `fakeResolverProbeExecuted` 仍必须为假。Java v109 只是优化上下文，不成为运行前置。共享边界因此不会把“测试壳合同存在”误写成“测试壳已经执行”。

## 十七、v117 仍保留哪些专属语义

v117 验证 fake-shell archive，而不是重复执行 fake shell。它要求 Node v264 与 v265 来源均 ready，v265 的 Java、mini-kv 和优化上下文均已消费；归档文件为 9，必需与命中片段均为 24，检查为 28/28，blocker 为 0。`archiveFilesReadByMiniKv` 和两处 rerun 标记必须为假，archiveVerificationOnly 必须为真。v117 的 warning 数仍是 1，而 v114-v116 是 2。独立判定函数保留这些差异，说明抽象依据共同机制，而非强迫四个版本长得一样。

## 十八、原服务现在承担什么

四个原模块仍拥有证据文件清单与 expected snippet，因为这些内容决定各自历史合同，搬进通用 engine 反而会混淆业务。构造函数现在只做五步：建立三份 evidenceFile，建立版本 snippet，计算 evidencePresent 与 verificationDocumented，调用 `readVxxxFields`，再调用 `isVxxxReady`。公开函数名与 core 的 import 路径没有变化，v117 也仍由同一 facade 装配 checks、messages、summary 与 digest。调用者无需知道内部出现了 manifest，兼容性边界清楚。

## 十九、测试矩阵分别防守什么

字段工具测试防守类型、默认值、顺序和重复键；新 parity 测试防守四个完整 JSON/Markdown 字节；四个既有 suite 防守每版来源引用、checks、messages、route 与 fallback；之前三份热点预言机复跑，证明共享测试助手迁移没有改变 v2207-v2209 的基准。typecheck 防守 manifest 与接口的结构一致，零告警 lint 防守迁移残留，maintainability census 防守问题搬家。最终四版批次还会统一执行完整 suite、独立 discovery、build、HTTP smoke 与远端 Node Evidence。

## 二十、维护性数字为何可信

第一次在新实现上运行 census 时，结果已经是 85/112/228/2，但 Ready 为 false；报告逐条列出的只有 v117 服务一条 near-limit、四个旧构造函数 long、四个旧构造函数 complexity，共 9 条 stale。没有 unknown 或 grown 项，也没有新模块进入阈值。只有在这份结果出现后，基线才删除对应对象；第二次运行 Ready 为 true。这个顺序证明数字来自真实 AST 和 import graph，而不是先改账本再宣称改善。两个新模块 439 与 375 行，所有函数低于 120 行和复杂度 20。

## 二十一、Java 与 mini-kv 的经验怎样被正确借鉴

Java v1874-v1876 正把大量 renderer 收敛到 package-level `ReportRenderer`：共享机制由一个 engine 持有，具体报告只提供数据。mini-kv v1674 则把产品源文件变成声明式 CMake manifest，并用 duplicate、missing、unregistered、stale 检查保证清单可信。v2211 结合两者：typed mapper 是 Java 式 engine，四份字段表是 mini-kv 式 manifest，重复目标键测试是清单完整性门。借鉴的是可复用原则，不是复制它们的语言结构，也不改两个兄弟工作树。

## 二十二、安全和跨项目边界

本版只读取仓库内既有历史 fixture，强制 fallback 测试不会访问新鲜兄弟文件。没有启动 Java、mini-kv 或外部审计服务，没有网络连接、凭据读取、原始端点解析、存储写入、schema migration、restore、compact 或 SETNXEX。所有 `executionAllowed` 与连接相关值保持原字节。Java 当前已提交 v1875、独立推进脏树 v1876；mini-kv 已提交 v1673、独立推进脏树 v1674。两者推荐并行，Node 不是批准阻塞者，本版也不触发 live capstone。

## 二十三、评审者最强质疑与回答

最强质疑是：复杂度只是从函数搬进四百行数组，代码未必真正更易懂。回应有三层证据。第一，数组只表达稳定的数据映射，没有控制流，默认值与输入键现在相邻可审查；第二，共同边界和重复算法确实只有一份，未来修改不会在四个函数中同步；第三，新模块未跨健康阈值，旧服务实际退出 near-limit，四个函数退出 long 与 complexity，完整输出又保持不变。若只有 census 下降而共享机制仍复制，或新文件超过 600 行，这个质疑就成立，本版会失败。

## 二十四、后续维护者的修改路径

新增普通字段时，先在对应版本 manifest 的正确位置加入 tuple，并由接口与 parity 检查顺序；新增嵌套数组时，在 `readVxxxFields` 的语义位置装配，不要给通用 mapper 加业务特例；新增 ready 条件时，判断它是四版共同运行时边界还是某版来源事实，分别进入共同 predicate 或版本函数。若第三种读取机制出现，应扩展现有 typed mapper，而不是再写一套 `??` 链。任何需要改变冻结字节的真实合同变化，都必须另起功能版本并说明兼容性，不能借“重构”修改预言机。

## 二十五、一句话结论

v2211 把四份正确但复制、冗长且高复杂的 mini-kv 回执解析链收敛为“有序类型清单、共同失败关闭边界、版本专属判定”三层模型，在八个完整字节表面不变的前提下精确消除 9 条维护性债务，并为后续声明式治理提供了带重复键防线的共享引擎。
