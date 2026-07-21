# Node v2234：把手工连接验证拆成事实、判断与表达三层

## Goal / Non-goal：目标与非目标

本版目标有两个。第一，把 packet verification 与 preflight verification 中手写 Markdown 的职责迁入短小、数据驱动的 renderer owner，使 verification family 的格式逻辑进入九分阈值。第二，不能只移动渲染函数后就停下，而要让原来七百多行的两个服务真实退出近限账本，所以继续提取重复的历史证据读取和固定操作建议。非目标同样明确：不增加 route，不改变 profile 字段，不改 readiness 判断，不接触真实凭据，不启动 Java 或 mini-kv，不写外部状态，也不把 preflight 解释成连接授权。

## 一、为什么单纯迁移 renderer 还不够

第一次迁移完成后，family census 已从 1,146 行降到 980 行，说明最直接的九分红项已经解决。但 maintainability census 仍显示 73 个近限文件。原因很朴素：packet 服务从 733 行只降到 648 行，preflight 从 778 行只降到 693 行；近限阈值是 600 行，两者虽然变短，却仍在账本里。这个中间结果很有价值，因为它阻止我们把“格式逻辑下降”和“文件职责健康”混为一个结论。继续拆分不是追求漂亮数字，而是兑现计划里两个 owner 必须真正退出近限集合的承诺。

## 二、Entry point 与稳定导出为什么不动

外部调用者仍从原来的两个服务文件导入长名称 Markdown 函数，route 也没有改 import path。原文件只通过别名重导出 `renderPacketVerification` 与 `renderPreflightVerification`，因此稳定入口、函数签名和调用时机都不变。短名称只存在于 `verificationReports/manualConnection.ts` 的局部语境中，调用者无需知道内部目录调整。这样既减少新增长名称，又避免为了内部重构让路由层、测试层和其他聚合服务发生无意义扩散修改。

## 三、Response model 为什么仍由领域服务拥有

packet profile 描述 Node v228 operator packet、Java v87 marker、mini-kv v96 receipt echo 与 packet verification；preflight profile 描述 Node v230 gate、Java v88 echo、mini-kv v97 no-start guard 与 manual window。两者的字段集合和 acceptance checks 并不相同，所以 profile interface、digest 计算、ready/blocked 状态与 summary 仍留在原服务。renderer 接收已经完成判断的 profile，只读取事实并按固定顺序展示。这个边界保证表达层无法偷偷重新定义“什么算通过”。

## 四、Upstream evidence 与 config 如何进入系统

两份 loader 都消费兄弟项目的历史说明、代码讲解、runtime smoke 与 verification manifest。`manualConnectionSources.ts` 只封装文件是否存在、读取字节、计算 SHA-256、查找 expected snippet，以及从 JSON 中安全取得字符串、布尔值和数字。具体路径、snippet 文本、Java/mini-kv 版本和可接受 digest 仍写在各自领域服务中。运行时 config 中的 `upstreamActionsEnabled` 仍由领域 checks 判断；共享 sources 模块不知道 readiness，更没有网络或服务启动能力。

## 五、强制 historical fallback 为什么是独立证据

本机恰好存在兄弟仓库时，普通测试可能直接读取真实路径，从而掩盖 GitHub runner 缺少兄弟工作区的问题。因此 parity test 直接设置 `process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK`，而不是只向 `loadConfig` 填一个同名值。测试还枚举 packet 与 preflight profile 中属于 Java/mini-kv 的 evidence path，逐一调用 resolver，并断言解析结果位于 `fixtures/historical/sibling-workspaces/`。这证明通过的不是本机偶然环境，而是仓库内冻结证据链。

## 六、迁移前 oracle 的输入是什么

oracle 使用固定时间 `2026-07-21T14:00:00.000Z`、关闭 upstream probes/actions、启用 access guard 的测试 config，并强制走历史夹具。loader 在这个输入下生成完整 READY profile，包括 source digest、兄弟 marker、六个 evidence file、snippet matches、checks、summary、消息和 endpoints。随后旧 renderer 生成完整 Markdown，而不是只截取标题或几个 contains 断言。packet 输出为 11,099 字节，preflight 输出为 13,344 字节，这两个长度与哈希在生产代码改动之前已经落定。

## 七、三层 Service flow 怎样运转

第一层位于 `src/services/manualConnectionSources.ts`，把文件系统输入变成带 exists、sizeBytes、digest 的证据事实，把文档输入变成 matched 布尔值。第二层仍位于两个 verification 服务，负责把事实投影成 Java/mini-kv reference，执行领域 checks，计算 verification digest，并生成 blocker。第三层位于 `src/services/verificationReports/manualConnection.ts`，把已完成判断的 profile 映射为 report spec，再交给通用 builder 处理标题、section 和末尾换行。数据只沿一个方向流动，没有 renderer 反向读取磁盘或 policy 反向改变 checks。

## 八、共享 renderer 为什么不是两个大函数的拼接

两个公开短函数只声明领域差异：标题、meta 标签、四个前置 section 及空态文案。公共的 Evidence Files、Snippet Matches、Checks、Summary、三组消息、Evidence Endpoints 与 Next Actions 由 `renderManualVerification` 统一装配。这样共同骨架只存在一次，字段顺序却仍显式可读。若未来 packet 增加领域 section，只需在它的 leading sections 中加入一项，不会迫使 preflight 接受无关字段，也不会让 builder 根据 profile 名称猜测布局。

## 九、空行为什么需要成为可测试合同

旧格式在 Evidence Files 的每个 H3 块末尾保留空行，而 Snippet Matches 的最后一条与 Checks 标题之间没有额外空行。通用 builder 默认会在 section 前增加分隔，所以迁移时对 Snippet Matches 与 Checks 显式设置 `headingLeadingBlankLine: false`。这不是审美细枝末节：归档 Markdown 的 digest、人工 diff 和下游引用都依赖完整字节。parity oracle 同时覆盖标题、字段顺序、空态、缩进、空行和末尾换行，比逐段 contains 更能防止无声漂移。

## 十、evidence source 抽取为何没有吞掉领域规则

共享 sources 只提供七个原子操作：读取 evidence file、匹配 snippet、读取 JSON、按 id 查找 evidence，以及取得三种原始字段。它不知道 v87、v88、v96 或 v97，也不知道哪个 digest 可接受。`createJavaV87Reference`、`createMiniKvV96Reference`、`createJavaV88Reference` 与 `createMiniKvV97Reference` 仍在原服务，所有版本约束、no-write 条件、manual-window 条件和 receipt 兼容集合都没有移动。这让共享层稳定，领域层仍可独立演化。

## 十一、advisories 为什么可以数据化

warning 与 recommendation 是固定操作说明，不依赖动态 checks。旧代码在两个大服务末尾各放两组静态数组，使 I/O、判断和文案混在同一文件。`manualConnectionAdvisories.ts` 现在定义共同 message contract，并分别返回 packet 与 preflight 的静态建议。动态 blocker 不在这里生成：它仍由原服务根据 checks 逐条追加。因而 advisory 模块没有获得决定 ready/blocked 的权力，只接管了原本纯数据的操作指导。

## 十二、命名门如何发现错误归类

初稿把两个新文件命名为 `...Evidence.ts` 与 `...Policy.ts`。代码逻辑没有问题，name debt 也没有增加，但 elegance census 报告既有 evidence family 和 policy family 各增长一个成员。这个信号说明文件后缀把它们归到了过宽的历史家族。最终名称改成 `manualConnectionSources.ts` 与 `manualConnectionAdvisories.ts`，直接表达“证据来源投影”和“操作建议”两个有限概念。没有刷新 elegance 基线来吞掉增长，门恢复为 Ready，tracked family 保持 52。

## 十三、安全边界为何没有变化

整个版本保持 read-only。sources 只读取冻结文件，不访问网络；renderer 只消费内存 profile；advisories 只返回常量对象。`executionAllowed`、`connectsManagedAudit`、`readsManagedAuditCredential`、schema migration 与 automatic start 的 false 边界仍来自原 profile 和 checks。没有新增客户端、socket、数据库句柄、凭据解析或写路径。Java 与 mini-kv 可以 recommended parallel，因为 Node 不需要新鲜兄弟证据，也不会要求它们提供运行中服务。

## 十四、Test coverage 如何分层

原 packet 与 preflight 测试继续验证完整业务 profile、blocked 分支以及 JSON/Markdown route。`verificationReportBuilder.test.ts` 继续验证通用标题、section、消息、列表与换行语法。新 parity test 专门负责两个固定 profile 的完整字节哈希，并验证 forced fallback 的真实解析目录。四个测试文件共十九项通过，随后 typecheck 和全量零告警 lint 通过。每层失败都指向明确 owner：事实错看 sources，判断错看领域服务，布局错看 renderer/builder，入口错看 route。

## 十五、机械指标说明了什么

verification formatting logic 从 1,146 精确降到 980，首次进入九分阈值。packet 服务从计划记录的 733 行降到 535 行，preflight 从 778 行降到 576 行，两者都低于 600 行近限线，所以 near-limit count 从 73 降到 71。long functions 仍为 72，complex functions 仍为 193，最大值与后续版本目标尚未处理；name debt 保持 4,444，import cycles 为零，超过 800 行的源码仍为零。基线刷新只删除两个 stale key，没有放宽任何 ceiling。

## 十六、一个具体输入如何得到三个输出

以 mini-kv v97 runtime smoke 为例，sources 先从历史 fixture 读取 JSON，并把 receipt object 原样交给 preflight 服务。服务用 `stringField`、`booleanField` 和 `numberField` 取得 project version、release version、manual window、timeout 与 no-start 字段，再与 snippet 证据和允许 digest 集合共同计算 reference。checks 判断三个来源是否都保持窗口默认关闭、禁止自动启动和禁止写入。renderer 最后只把 reference、checks 和 summary 展示为 Markdown。原始文件事实、领域结论、展示文本三者可分别追踪，不再藏在一个七百多行模块里。

## 十七、失败条件与后续边界

若任一哈希变化、fallback 未进入 fixture、原 route 导出失效、near-limit 未下降、family 增长或 baseline 放宽，本版都应失败。当前这些条件全部有机械检查。v2234 不处理 operator-window renderer，也不拆 163 行 loader，更不处理复杂函数和 mega type barrel；它们属于 v2235 至 v2237。这样的停止点避免在一个提交里混合过多风险，同时保证本版已是一块完整工程成果，而不是为了计数切出的半成品。

## 十八、为什么复用现有 builder 而不是另建模板系统

仓库已经有 `renderVerificationReportMarkdown`，它能稳定处理标题、元数据、entries、messages、list 和末尾换行。本版真正缺少的不是另一套模板语言，而是两个领域 profile 到既有 report spec 的清晰映射。若另建“手工连接报告框架”，调用者需要学习第二套 section 语义，空行修复也会重复，未来 renderer census 还要同时理解两种抽象。现在的设计只补一个薄领域 owner：它声明差异，底层语法继续由成熟 builder 负责。停止条件也因此清楚，当 packet 与 preflight 都迁入后，不再为这一历史链新增 renderer 层；后续报告只有在出现新的真实布局能力时才扩展 builder。

## 十九、输入输出合同矩阵怎样逐项对账

对 packet 而言，输入包含 sourceNodeV228、javaV87、miniKvV96、packetVerification、六份 evidence、十六项 snippet、checks 和消息；输出按原顺序出现四个领域 section，再出现共同尾部。对 preflight 而言，输入替换为 sourceNodeV230、javaV88、miniKvV97 与 preflightVerification，snippet 数量增加，但尾部语法相同。JSON 输出完全绕过 renderer，所以 profile 对象顺序与字段不受影响；Markdown 输出经过新 owner，却由完整哈希证明每个字符相同；route 输出继续使用原导出，所以 HTTP content type 和访问守卫不变。三条输出路径分别有类型、字节和路由测试，任何一条漂移都不能由另一条的通过代替。

## 二十、一次失败应当怎样快速定位

假设未来有人把 evidence file 的缺失 digest 从 `null` 改成空字符串。sources 单元行为会先改变，完整 parity 哈希也会失败，但 route 可能仍返回二百状态；这时不应修改哈希，而应确认缺失值合同是否获准变化。若哈希只多一个空行，领域 profile 测试仍通过，问题应定位在 manual renderer 的 section 分隔。若 ready 状态从 true 变成 false 而 Markdown 布局未变，首先检查兄弟 fixture、snippet 与领域 checks，不能去 renderer 中补条件。若只有 HTTP 测试失败，则检查稳定重导出、route 注册和 access headers。分层后的价值正是让“失败了”变成一条短调查路径，而不是重新阅读两个七百多行文件。

## 二十一、基线刷新为什么可以接受

maintainability 第一次重跑返回非零，不是出现新债，而是报告两个 stale key：原 packet 与 preflight 文件已经低于六百行，但旧 baseline 仍列出它们。刷新命令重新扫描真实树后只删除这两个条目，近限上限仍是六百，长函数与复杂度阈值也没有变化。随后 census 以 71/72/193/0 通过。相反，elegance 初次失败指出的是两个 family 增长，这不能靠刷新解决，所以选择改名并再次扫描。两种失败采用不同处置，体现基线的基本纪律：债务消失时收紧记录，新增债务时修改设计，绝不把 refresh 当成通用消音按钮。

## 二十二、评审者最短阅读路径

评审可以先看 parity test 中两个固定哈希和 fallback 路径断言，确认外部输出与运行环境；再看 `manualConnection.ts` 的两个领域入口和一个共同装配函数，确认布局差异没有被动态猜测；接着看 sources 文件，确认它只做只读文件投影；最后回到原服务查看 Java/mini-kv reference 与 checks，确认领域规则没有外移。若只关心维护收益，可复跑 family 与 maintainability census，并核对 980 和 71 两个数字。这个阅读顺序从合同到结构再到判断，避免先陷入历史路径和长版本名，也让审核成本随着模块缩短而真实下降。

## One-sentence summary / 一句话总结

v2234 在完整 Markdown 字节、历史证据回退、route、profile 和安全判断全部不变的前提下，把两份手工连接验证重构成“sources 提供事实、verification 作出判断、renderer 负责表达”的三层结构，并让 verification logic 与两个近限文件同时跨过目标线。
