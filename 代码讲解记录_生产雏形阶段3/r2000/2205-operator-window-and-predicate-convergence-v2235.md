# Node v2235：让窗口验证、目录质量与复杂谓词各归其位

## Goal / Non-goal：本版要解决什么

本版同时解决三个相互关联的维护问题：operator-window 是 manual connection 报告语法的第三个实例，必须进入共享 renderer；catalog quality loader 达到 163 行，混合了五种组装职责；mini-kv v97/v102 reference 使用大量 `??` 与 `&&`，导致多个函数的复杂度超过五十。非目标是增加新验证链、改变 readiness、放宽阈值或执行真实连接。所有 route、profile、证据 fixture、权限、网络和写边界必须保持不变。

## 一、为什么第三个 renderer 必须复用

packet、preflight 与 operator-window 都由四个领域 section 开头，随后依次展示 Evidence Files、Snippet Matches、Checks、Summary、三组消息、Endpoints 与 Next Actions。前两份在 v2234 已建立 typed helper，第三份若继续手写，就违反三次规则，也让空行修复出现第三个 owner。因此本版只新增 `renderOperatorWindowVerification`，显式提供 operator 的标题、meta 和四个前置 section，其余语法复用同一个装配函数。

## 二、Entry point 如何保持稳定

route 与其他服务仍从 `managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts` 导入原来的长函数名。该文件现在把短函数别名重导出为稳定名称，调用路径、参数类型和返回值没有变化。内部短名只在 `verificationReports/manualConnection.ts` 出现，不要求全仓修改 import。这样重构可以被完整字节和现有 route 测试证明，而不是依赖调用者同时迁移。

## 三、Response model 为什么没有移动

operator profile 中的 sourceNodeV238、Java v93 echo、mini-kv v102 receipt、verification、checks 与 summary 仍由原服务构造。renderer 不重新判断 checklist count，不解释 digest，也不决定 no-start/no-write 是否成立。它只读取已经成形的 response model。这个界线和 v2234 一致：领域服务拥有事实含义，共享 renderer 只拥有可见顺序与 Markdown 语法。

## 四、Upstream evidence 的固定输入

operator loader 读取 Java v93 runbook、walkthrough、builder、integration test，以及 mini-kv v102 receipt、runtime smoke、walkthrough 和 test。测试直接设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，再断言 evidence path 解析到仓库内历史夹具。这样本机兄弟工作区即使存在，也不能替代 frozen evidence。Java 与 mini-kv 不需要启动，不会成为本版本的实时前置。

## 五、operator Markdown oracle 覆盖了什么

固定时间为 `2026-07-21T15:00:00.000Z`，probes/actions 关闭，历史回退强制开启。旧 renderer 在该输入下输出 17,955 字节，SHA-256 为 `093bb3bafb8035349a5721c2a0d252cbb0b2cc643131306cc78f482aea8fe23f`。迁移后同一个测试重新生成完整文档，长度与哈希完全相等，所以标题、字段顺序、H3 evidence block、snippet 缩进、空态消息和末尾换行都没有漂移。

## 六、Service flow 的三层关系

`src/services/manualConnectionSources.ts` 负责只读文件投影，operator 服务负责引用与 checks，`src/services/verificationReports/manualConnection.ts` 负责表达。新加入的 `manualConnectionReceiptMaps.ts` 位于事实投影与领域判断之间，只把 JSON key 按有序 spec 映射为 typed fields，不决定任何字段是否可接受。数据流依旧单向：fixture 到字段、字段到领域结论、结论到报告。

## 七、为什么 operator 服务能降到 582 行

移走完整 renderer 后，原文件不再包含八十多行格式逻辑；复用 sources 后，又删除 evidence 摘要、snippet 读取、id 查找和原始字段解析副本；静态 warning/recommendation 则进入 advisories owner。最后 operator 服务从计划起点 754 行降到 582 行，低于 600 行近限线。它留下的主要内容正是版本特有路径、reference、predicate 与 blocker，而不是通用基础设施。

## 八、163 行 loader 原来混合了哪些职责

catalog quality loader 原先先加载 v301，再统计 continuation options，然后构造 catalog scope、投影 sourceNodeV301、计算 checks、修改 ready 总门、收集三类消息、计算 summary 与 digest，最后组装完整 profile。任何一处字段变更都要求评审者浏览整段函数。它虽然没有很高复杂度，却是全仓最长函数，因此最大函数红项停在 163/160。

## 九、loader 拆分后的五个概念

`createCatalogScope` 只描述目录版本与 option 数量；`createSourceNodeV301` 只把上游 profile 投影成当前所需字段；`createCatalogChecks` 只计算布尔门并收束 ready；`createCatalogSummary` 只统计 checks 与消息；`assembleQualityProfile` 负责最终字段顺序、digest、endpoints 与 next actions。主 loader 只加载依赖并编排这些阶段，从 163 行变成 27 行，复杂度为 2。

## 十、完整 profile oracle 为什么必要

仅靠现有测试的部分 `toMatchObject` 无法证明字段插入顺序、summary 计数和 quality digest 的输入完全相同。本版在拆分前固定时间 `2026-07-21T15:30:00.000Z`，冻结整个 profile 的 JSON。旧值是 5,947 字节，SHA-256 为 `0aee7c29c888304cbf380dfdf995d489be1e287d93c24347f31d58e5b36fe19f`，内部 quality digest 为 `c7cf6c8bb2cef5bf4c94d77a593f01551d9e4da6939ad84f4668c2da03a5be74`。拆分后全部一致。

## 十一、receipt field map 解决的不是“少写几行”

旧 v97/v102 构造器逐字段调用 string、number、boolean helper，并在每个字段后写一个 `??` 默认值。schema 实际是稳定数据，却被表达成几十个控制流节点。新 `mapReceiptFields` spec 为每项声明目标名、来源 key、类型与 fail-closed fallback，输出顺序由 spec 顺序决定。新增字段时只需检查一行映射，重复 target 还会被通用 mapper 拒绝。

## 十二、fail-closed fallback 如何原样保留

文本缺失仍落为 `missing`，数量缺失仍为负一，需要为真的证据字段默认 false，任何可能放开执行或写入的允许字段默认 true 后再由边界检查拒绝。这个看似反直觉的 true fallback 是原有 fail-closed 设计：证据缺失时，reference 会表现为危险状态，从而不能 ready。本版逐项复制原 fallback 到 typed spec，并由完整 Markdown oracle 捕获任何值变化。

## 十三、长 `&&` 为什么改为具名 predicate group

一条五十项布尔链让 identity、版本兼容、证据完整性和安全边界混在一起。现在 `preflightGuardIdentityAccepted` 只核对版本、consumer、digest 与窗口参数；`preflightGuardBoundaryAccepted` 只核对 no-start/no-write；operator 也分为 identity 与 boundary。顶层 ready 只组合这几个完整概念。每个数组逐项列出布尔事实并调用 `every(Boolean)`，没有隐藏字段，也没有把逻辑压成字符串或 scanner 特判。

## 十四、为什么布尔数组比一行 helper 更诚实

薄转发只会把复杂度从 A 搬到 B，而布尔数组把同一领域内的条件变成可枚举集合。每项仍包含真实比较，评审可以逐行审阅；分组名说明条件为什么在一起；顶层只表达组之间全部成立。maintainability scanner 因此看到真实职责被拆开，而不是漏算。五个旧 complex key 变 stale，新的 helper 没有任何一个超过阈值，也没有 unknown 或 grown 项。

## 十五、operator verification 的两个复用谓词

`javaOperatorBoundaryAccepted` 同时服务 Java echo acceptance 与跨来源 boundary alignment，避免两处维护同一组 no-credential/no-SQL/no-ledger/no-connection 条件。`miniKvBoundaryAccepted` 列出二十二项 no-start/no-write 事实，既用于 v102 receipt ready，也用于最终 verification。这样的复用是领域语义复用，不是为了缩短 census；任一边界字段改变时，两个消费位置会同时得到一致判断。

## 十六、preflight checks 如何从复杂度 24 降为 1

`createChecks` 原来内联 source ready、source closed、三个 digest、Java boundary 与十四项 mini-kv boundary。现在分别调用 `sourcePreflightReady`、`sourcePreflightClosed`、`sourcePreflightDigestsPresent`、`javaPreflightBoundaryAccepted` 和 `preflightGuardBoundaryAccepted`。checks 对象仍按原字段顺序生成，但函数本身只把具名事实映射到检查项，因此长度从 53 行降到 30 行，复杂度从 24 降到 1。

## 十七、五个热点的实际变化

v102 reference 从 91 行/复杂度 57 降到 39/5；v97 reference 从 78/53 降到 25/5；operator verification 从 67/35 降到 54/1；preflight checks 从 53/24 降到 30/1；mini-kv boundary 从 24/22 变为 26/1。最后一项行数略增，因为每个布尔事实单独成行，但复杂度与可读性显著改善。这说明优化目标不是盲目压行，而是让结构透明。

## 十八、Safety boundary 怎样被机械保护

所有新 mapper 和 predicate 都是同步、只读、纯内存逻辑。没有客户端实例化、网络请求、凭据读取、schema migration、ledger 写入或自动启动。原 profile 中 connection、credential、write、execution 的关闭值没有变化，operator/preflight 完整字节哈希可以证明可见输出一致；领域测试则证明 ready 与 blocked 分支一致。任何 fallback 或 predicate 漂移都会使其中至少一层失败。

## 十九、Test coverage 的分层结果

operator renderer、原 operator 服务与 builder 三个文件共十七项测试通过；catalog loader parity 与原质量测试共四项通过；完成 receipt/predicate 重构后，manual parity、operator 与 preflight 三个文件共八项再次通过。随后 typecheck、全量零告警 lint、elegance、family 与 maintainability 门通过。测试没有修改旧期望，也没有根据迁移后输出更新哈希。

## 二十、账本数字如何解读

verification logic 从 980 降到 898，继续低于 1,000；近限从 71 降到 70，达到终局阈值；长函数从 72 降到 71，最大值从 163 降到 158，最大值阈值已通过但数量还差一个；复杂函数从 193 降到 188，还差十八个；name debt 保持 4,444。这个状态清楚地定义 v2236：集中处理一个 long 与十八个 complex，不再扩展 renderer 工作。

## 二十一、基线为什么只向下变化

刷新前 maintainability 报告一个近限 stale key、一个长函数 stale key和五个复杂函数 stale key，没有 unknown 或 grown。刷新后记录删除这些已消失债务，阈值仍是 600 行、120 行和复杂度 20。elegance 门确认新 receipt map 没有增长受管 family，name debt 也未增加。若出现新债，本版会修改设计而不是刷新吞掉。

## 二十二、评审者的最短路径

先看两个 parity 测试，确认 Markdown 与 profile 完整输出；再看 manual renderer 的 operator spec，确认 stable entry；然后看 catalog loader 的五阶段编排；最后看 receipt maps 与 identity/boundary predicates。复跑 `npm run maintainability:census` 应得到 70/71/188/0，复跑 family census 应看到 verification 898。这个顺序能从合同逐步进入实现，不必先穿过长历史命名。

## 二十三、用 v97 的一项字段看映射过程

原始 runtime smoke 中 `manual_window_open_by_default` 可能是布尔值，也可能因为证据损坏而缺失。spec 把它声明为目标 `manualWindowOpenByDefault`、来源 key、类型 `flag`、fallback `true`。通用 mapper 只在值确实为布尔值时采用原值，否则返回 true。随后 boundary predicate 要求该值为 false；因此字段缺失不会被误判为窗口关闭，而会让 receipt 失败。`timeout_budget_ms` 同理，非数字落为负一，identity predicate 要求一万五千。这里没有改变旧逻辑，只把散落在表达式右侧的默认值变成可审计的数据行。

## 二十四、布尔数组与旧短路链为何等价

旧 `a && b && c` 在第一个 false 时停止求值，新 `[a, b, c].every(Boolean)` 会先构造各项再检查。这里每一项都只是读取已经构造的普通对象、做字符串或数字比较、执行无副作用正则，不包含网络、文件读取、计数器或异常依赖，因此求值顺序差异不会改变行为。需要读取文件的工作早已在 reference 构造之前完成。完整 parity 又覆盖最终值与 digest，所以等价性既有静态前提，也有运行证据；若未来某项出现副作用，评审应拒绝把它放入 predicate 数组。

## 二十五、loader 拆分如何保持 JSON 字段顺序

最终 profile 仍由 `assembleQualityProfile` 按旧顺序书写：先基础状态和安全旗标，再 catalogScope、sourceNodeV301、checks、summary、qualityDigest、三组消息、endpoints 与 actions。辅助函数只提前产生子对象，没有对最终对象做排序、合并未知字段或 JSON 往返。summary 也按旧键序构造，quality digest 的输入对象继续依次包含 profileVersion、qualityPassState、catalogScope、sourceNodeV301 与 checks。正因如此，完整 JSON 不只是值相同，序列化后的 5,947 个字节也相同。

## 二十六、哪些看似省事的方案被拒绝

第一种方案是把 maintainability 阈值从 160 提高到 163，这没有减少评审负担，只会掩盖最长函数。第二种是给 scanner 增加文件豁免，它会让同一类 loader 继续膨胀。第三种是把长布尔链包装成一个 `allConditions()` 却仍在内部保留原链，复杂度只是改名。第四种是修改 oracle 哈希适配新输出，这会倒置证据关系。最终方案没有放宽基线、没有 ignore、没有测试回填，而是把每个概念变成真实可测试边界，并由 stale key 证明旧债确实消失。

## 二十七、未来新增 receipt 字段时应怎样改

若 mini-kv 后续增加新的只读证明字段，开发者先在 receipt map 增加一条有类型和 fallback 的 spec，再把该字段放进 identity 或 boundary 中唯一合适的一组，最后扩展 fixture 与领域测试。renderer 不需要变化，因为 profile 展开仍由 entries 处理；loader 编排也不需要变化，因为它不理解具体 receipt。若新字段会允许执行或写入，fallback 必须保持拒绝方向，并补 blocked case。这个维护路径把一次修改限制在 schema 数据、领域谓词和测试三处，不再要求阅读整条历史报告链。

## 二十八、回归失败时怎样定位责任层

若完整 Markdown 哈希先失败，而领域测试仍通过，应先检查 renderer 的标题、字段顺序、空行和换行，不应立刻改 predicate。若 operator 与 preflight 同时失败，应检查共享 source、advisory 或 receipt map；只有单个 profile 的 ready 状态变化时，才进入对应 identity/boundary 条件组逐项核对。强制历史回退失败则优先确认路径是否仍落在仓库 fixture，而不是怀疑 sibling 工作区。catalog JSON 哈希失败时先比较组装字段顺序，再看 summary 与 digest 输入。这个顺序把表现层、投影层、领域层和证据定位层分开，能避免为了修一个格式差异误改安全结论，也能让维护者用最小测试集合复现问题后再扩大验证范围。

## One-sentence summary / 一句话总结

v2235 在 operator Markdown 与 catalog quality profile 完整字节不变的前提下，把第三份报告、最长 loader 和五个复杂谓词重构为可复用的 renderer、分阶段组装、typed receipt map 与具名安全条件组，使九分门只剩 long、complex 和 name debt 三项。
