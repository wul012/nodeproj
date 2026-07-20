# Node v2215 代码讲解：让凭据安全策略成为可审查的字段清单

## 一、这个版本解决什么问题

本版没有增加新的凭据读取能力，也没有让系统更接近连接真实 managed-audit。它解决的是
两份只读验证策略的表达问题：`createChecks` 各自有 230 行，安全字段、版本文本、摘要
对齐和输出装配挤在一起。代码能跑，但审查者必须逐行数几十个 `&&`，才能确认某个禁止
动作是否遗漏。v2215 把稳定布尔边界变成有类型的清单，把版本语义留给具名谓词。

## 二、输入和输出分别是什么

第一套策略接收 Node v288 合同、Java v122-v126 文件证据、mini-kv v127 非参与收据以及
运行配置，输出 29 个有序 checks。第二套接收 Node v283 计划、Java v121 回声、mini-kv
v126 收据和配置，输出 28 个有序 checks。下游再根据这些布尔量生成状态、blocker、摘要、
JSON 和 Markdown。重构只改变 checks 的内部计算方式，不改变输入对象和输出对象。

## 三、旧代码为什么难审查

连续布尔链把三种知识混在同一视觉层级。`credentialValueRead === false` 属于稳定安全
边界；`releaseVersion === "v127"` 属于版本契约；两组数组逐项相等属于结构一致性。
三者的失败含义不同，却都表现成下一行 `&&`。维护者想补一个新字段时，很容易只在总边界
里增加，却忘记凭据、端点或写入子边界，最终让汇总检查与细分检查不一致。

## 四、为什么字段清单适合这里

这些安全量拥有完全相同的操作：从同一个对象取字段，并要求每个值严格等于 true 或
false。变化的是字段集合，不是算法。它符合“三次规则”所描述的数据化场景。把字段名放进
只读数组后，审查者可以连续阅读一组完整边界；执行算法只实现一次，而且任何策略仍可在
清单之外保留自己的文本、摘要和计数判断。

## 五、共享 helper 的真实职责

`src/services/liveProbeReportUtils.ts` 新增 `allBooleanFieldsAre`。它只做三件事：拒绝空
清单、拒绝重复字段、逐项执行严格相等。它不读取环境变量，不知道 v126 或 v127，不生成
blocker，也不决定 profile 是否 ready。职责小到可以用一个单元测试完整描述，因此不会
成为一个吸收所有治理逻辑的万能引擎。

## 六、BooleanFieldKey 提供什么约束

`BooleanFieldKey<Value>` 从对象键中筛出值类型为 `boolean`、`boolean | null` 或可选布尔
的属性。字符串、数字、数组和对象键都不能进入清单。比如把 `receiptVersion` 错写进
false 字段列表，TypeScript 会在 manifest 文件直接报错，而不是等到运行历史 fixture
时才发现。字段重命名也会同时破坏清单编译，形成可靠的迁移提示。

## 七、为什么必须正确处理 null

mini-kv 历史收据不是所有字段都保证存在，解析层使用 `boolean | null` 表示“读取到布尔
值”或“证据中没有可靠值”。安全语义要求 fail-closed：`null` 不能因为是假值就冒充
false。helper 使用 `value[field] === expected`，所以只有字面 false 能通过 false 清单，
`null`、`undefined`、字符串和数字都会失败。测试专门冻结了这个区别。

## 八、空清单为何不能通过

JavaScript 的 `[].every(...)` 默认返回 true。如果直接调用 every，一个因为重命名或合并
失误而变空的安全清单会让整组边界自动通过。helper 先检查 `fields.length > 0`，把这种
数学上的真空真值转换成策略上的失败。它保护的是规则存在性，而不是某个具体业务字段。

## 九、重复字段为什么也是失败

重复项本身不会改变 every 的结果，却可能掩盖漏项。例如维护者复制两次
`credentialValueRead`，同时漏掉 `credentialValueStored`，肉眼只看数量很难发现。helper
比较 `new Set(fields).size` 与原长度；只要重复，整组判断返回 false。ready profile 的
冻结测试因此也成为所有已用清单的唯一性检查。

## 十、disabled harness 的 source 清单

`disabledHarnessFields.ts` 中的 `SOURCE_DISABLED_FIELDS` 集中列出真实 resolver、测试
harness、执行、managed-audit 连接、凭据值、原始端点、provider/client、迁移、ledger
和自动启动等 19 个字段。policy 只需表达“Node v288 的这些字段全部为 false”。字段集合
与执行方式分离后，安全边界是否完整可以不穿过 230 行函数直接审查。

## 十一、Java 证据为什么分成两组

Java v122-v126 有一组字段证明证据存在、拆分完成和 catalog 已应用；另一组字段说明
运行时、凭据、端点、连接、ledger 与 SQL 边界已被文档化。两组都期待 true，但失败含义
不同，所以分别命名为 evidence 与 boundary 清单。这样 blocker 仍能指出是证据不完整，
还是运行边界没有说明，而不是合并成一个含糊的“大体可用”。

## 十二、mini-kv 收据为何不能全部数据化

收据中的布尔边界适合清单，`receiptVersion`、`releaseVersion`、`consumerHint` 和
`sourceContract` 却是具体契约文本。v2215 刻意把这些字符串比较留在
`createDisabledSourceChecks` 中。若把不同类型规则强塞进统一 JSON DSL，类型信息会变弱，
错误消息也会远离业务语义；那只是把长代码改成难调试配置，并不优雅。

## 十三、运行时 false 清单怎样组合

mini-kv v127 的运行边界由 provider、credential、endpoint、connection、authority、write
和 auto-start 等子清单展开，再补充 fake harness 与 resolver 自身字段。组合使用数组
spread，但每个子清单也被细分 checks 复用。这样总边界和局部边界共享同一字段来源，
不会出现总表新增了字段而局部检查忘记同步的双份事实。

## 十四、细分边界仍然有价值

profile 不只需要一个 `sideEffectBoundaryClosed`。它还公开 credential、endpoint、provider、
connection、write、auto-start 与 authority 七个结果，方便 blocker 和运维人员定位哪一类
证据失效。`createDisabledBoundaryChecks` 先逐类求值，再对这些具名布尔结果做汇总；共享
清单减少重复，但没有牺牲故障分辨率。

## 十五、汇总边界如何避免新长链

七个局部边界先放进 `boundaries` 对象，`Object.values(boundaries).every(Boolean)` 判断它们
是否全部关闭，随后再联合 Java 文档、Node 合同和 mini-kv 总运行边界。这里的 values 都是
本函数刚创建的严格布尔值，不涉及 nullable 证据，因此 Boolean 转换是安全的。组合逻辑
从十几行降为能直接读出层次的四个条件。

## 十六、implementation plan 的清单结构

`planEchoFields.ts` 分别维护 source blocked、Java blocked、mini-kv receipt/runtime，以及
credential、endpoint、resolver、connection、write、auto-start 六类跨项目边界。v126
收据的 `executionAllowed` 只属于 receipt readiness，而其余副作用字段构成 side-effect
清单；两个集合通过显式 spread 关联，没有依赖数组位置切片。

## 十七、为什么不用 slice 表达子集

实现过程中曾可以写成 `PLAN_MINIKV_RUNTIME_FIELDS.slice(1)`，但这会把“第一个字段恰好是
executionAllowed”变成隐含约定。字段重排后语义会悄悄变化。最终代码给副作用集合独立命名，
再由 runtime 集合显式加入 executionAllowed。维护者看到名字就能理解集合关系，顺序变化
也不会改写边界含义。

## 十八、计划证据的语义谓词

`isPlanSourceReady`、`isJavaEchoReady`、`isJavaConsumptionDocumented` 和
`isMiniKvConsumptionDocumented` 继续显式比较状态文本、数量、摘要与版本。每个函数只回答
一个问题，复杂度分别保持在 3 或 8。把这些判断命名后，组合根不再要求读者同时记住三份
上游对象结构，失败时也能沿着对应谓词进入最小范围。

## 十九、alignment checks 保留什么

计划摘要、review 摘要、边界代码、必需工件、禁止动作以及 Java/mini-kv requirement id
仍使用原来的严格相等算法。`createPlanAlignmentChecks` 只把七个结果按旧顺序装配，不改变
数组比较函数。数据清单解决的是同形布尔字段，不接管数组顺序或摘要语义，因此不会把不同
契约错误压成一个模糊的 false。

## 二十、组合根为何要保持输出顺序

JSON 对象的插入顺序会影响字节摘要，Markdown renderer 也按既有 profile 结构读取字段。
两个新 `createChecks` 都按旧次序展开 source checks、alignment checks、boundary checks，
最后追加配置与 readiness。对象 spread 不是随意拼接，而是对应旧对象的连续区段。四组
冻结字节 oracle 证明键顺序和所有值都未漂移。

## 二十一、blocker 收集怎样去重

两份 policy 原来都在规则数组之后手写 `filter(!condition).map(...)`，其映射形状完全相同。
项目早已有 `collectFailedReportRules`，v2215 直接复用它。规则数组本身仍保留原位置、原
顺序、原 code、source 与 message，所以评审时仍能看到领域失败条件；被删除的只是通用
尾部算法，不是可读的业务内容。

## 二十二、为什么冻结 JSON 和 Markdown 两种表面

JSON oracle 能发现字段值、键顺序、路径和嵌套结构漂移；Markdown oracle 能发现标题、
章节、列表和错误消息变化。只冻结一种会留下盲区。disabled harness 分别保持 32,490 与
9,456 bytes，implementation plan 保持 29,872 与 8,182 bytes，并校验各自 SHA-256，
从而把“行为未变”变成四个精确断言。

## 二十三、为什么要固定 generatedAt

真实 loader 每次调用都会生成时间，直接摘要会导致同一代码每次测试都不同。测试只在
构建完成后把 `generatedAt` 覆盖为 `2026-07-21T00:00:00.000Z`，其余字段保持真实加载
结果。这样既不修改生产时钟逻辑，也能让输出契约稳定复现；若其他任意字段变化，摘要仍会
立刻失败。

## 二十四、为什么强制历史 fallback

CI runner 没有 Java 和 mini-kv 工作树，Node 必须能从冻结 sibling fixture 读取同一证据。
oracle 设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，确保测试覆盖 runner 真正
使用的路径，而不是恰好借到本机目录。路径在摘要前经过 portable normalization，宿主根
差异被消除，业务字段差异仍被保留。

## 二十五、blocked 反例覆盖什么

两套现有测试都把 `UPSTREAM_PROBES_ENABLED` 和 `UPSTREAM_ACTIONS_ENABLED` 设为 true，
要求 verification state 变为 blocked，并出现两个指定 blocker。它证明重构没有因为清单
聚合而绕开运行配置，也没有只验证 ready 快乐路径。执行、连接、凭据读取和写入许可仍然
保持 false。

## 二十六、helper 单元测试覆盖什么

`liveProbeReportUtils.test.ts` 同时验证全 true、全 false、混合失败、空清单失败、重复字段
失败和 nullable null 失败。前两项证明正常求值，后三项证明 fail-closed。不存在字段由
TypeScript 编译器保护。运行时和编译时证据互补，避免把类型约束误当成对历史 JSON 的
运行时校验。

## 二十七、维护指标如何证明没有搬家

disabled 入口由 230 行、复杂度 160 降到 32 行、复杂度 1；plan 入口由 230 行、复杂度
152 降到 27 行、复杂度 4。最大替代函数只有 57 行、复杂度 13，均低于 120 行和 20 分
阈值。账本从 85/110/228/0 收紧到 85/107/226/0，没有 unknown、grown 或导入环。

## 二十八、为何长函数减少三条

除了两个 `createChecks`，implementation-plan 的 `collectProductionBlockers` 从 128 行降到
118 行，也退出长函数清单。它的收缩来自复用既有 blocker 映射，不是删除任何规则。
基线刷新还把一个与本版无关、现实已降到 124 行的 readability 条目从 127 收紧为 124；
所有变化都是只减不增。

## 二十九、为何复杂函数减少两条

旧入口的复杂度主要来自把每个 `&&` 都放在一个函数中。提取后，各领域谓词拥有自己的
小范围分支，组合根只连接具名结果。扫描器按函数边界计算复杂度，所以这不是隐藏数字：
新函数最高复杂度 14，任何一个都没有重新进入复杂函数基线。评审可以从 census JSON
复算这些值。

## 三十、借鉴 Java 和 mini-kv 的部分

Java v1878 的有效做法是让组合根只表达顺序，把叶子行为交给聚焦模块；mini-kv v1673-
v1674 的有效做法是用有序 manifest 表达稳定集合，并对缺项、重复和未知项失败。v2215
结合两者：入口负责组合，字段清单负责数据，helper 负责统一判定，但没有复制兄弟项目的
文件结构或修改它们的工作树。

## 三十一、为什么不建立通用规则 DSL

一个可配置 DSL 看似还能减少更多行，却会需要动态 operator、unknown value、错误路径和
消息模板，最终把 TypeScript 已有的类型系统重新实现一遍。当前抽象只覆盖真正同构的
布尔字段判断，字符串、摘要、计数和数组仍用普通代码。抽象边界因此可以用一句话解释，
调试时也能直接停在具体谓词。

## 三十二、以后新增字段应怎样做

若新增纯布尔安全字段，先判断它属于哪个局部边界，再加入对应 manifest；总 runtime 清单
会通过组合自动获得它。若字段是版本、摘要、计数或有序集合，应在对应语义谓词中显式
判断，并为失败条件增加 blocker 或测试。不得只为了让 ready 通过而把 nullable 字段默认
成 false，也不得修改冻结 oracle 掩盖漂移。

## 三十三、评审这版最短路径

先读两个 manifest，确认字段分组完整且没有语义文本；再读两个 30 行左右的组合根，确认
输出区段顺序；随后查看四个 profile bytes/SHA 断言与 helper 反例；最后运行 maintainability
census，确认 85/107/226/0。这个顺序能在较短时间内覆盖数据、行为、输出和结构四层，
不需要从 460 行布尔链重新推导意图。

## 三十四、哪些安全边界完全没变

本版没有创建 secret provider、resolver client、HTTP/TCP 客户端或 child process；没有
解析原始 endpoint，没有读取或保存凭据值，没有写 approval ledger，没有执行 SQL、迁移
或 restore，也没有自动启动上游。所有 profile 仍明确输出 executionAllowed=false 和
connectsManagedAudit=false。函数变短不代表权限扩大。

## 三十五、路由和访问控制为何不受影响

公开 loader、renderer 与 route path 都未移动，`buildApp` 和 audit route table 没有修改。
真实 Fastify inject 测试仍使用完整 operator、role、verified 与 approval correlation headers，
JSON/Markdown 均返回 200。access guard、错误响应、schema 和 content type 继续由原代码
负责，字段清单不在请求路径上引入新分支。

## 三十六、三项目如何并行

Node 只读取仓库内冻结的 Java/mini-kv 历史证据，没有要求新上游版本，也没有启动兄弟
服务。Java 可继续自己的 renderer/归档治理，mini-kv 可继续 manifest/receipt 整理；Node
不是它们的批准前置。mini-kv 当前 README 展示简报改动属于用户工作，本版没有读取后
写回，更没有清理或覆盖。

## 三十七、验证节奏为何分层

版本内先跑 3 个 focused 文件和 typecheck，再用未刷新基线执行 census，观察到的只有目标
stale 条目；确认新函数均低于阈值后才刷新基线。文档完成后再跑定向 lint、全部静态门和
讲解质量门。完整 575 级测试、build、HTTP smoke 与远端 CI 留到 v2218 批次末，避免每个
内部重构版本重复支付同一验证成本。

## 三十八、一句话结论

v2215 把两套共 460 行、复杂度 312 的凭据策略入口收敛成清晰组合根、具名语义谓词和
类型化字段清单；严格处理空、重复与 nullable 证据，保持 29/29、28/28 checks 以及四个
JSON/Markdown 字节摘要完全不变，并将维护账本机械收紧到 85/107/226/0，为后续应用装配
重构提供了可复用但不过度泛化的安全判定基础。
