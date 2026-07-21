# Node v2233：让 verification 只验证，让 renderer 只表达文档

## Goal / Non-goal：本版目标与明确边界

本版的目标是把 production connection archive 与 live-probe evidence archive 的 Markdown 表达职责迁入同一个有界 renderer owner，同时保持 loader、profile、route 与完整输出字节不变。非目标包括新增业务检查、修改 readiness 判定、调整权限、接触真实凭据、启动兄弟服务或改写历史 fixture。这个边界让后文每一项验证都能回答同一个问题：结构是否更清楚，而对外事实是否完全没有漂移。

## 一、为什么这一版不是简单搬函数

v2232 后九分门仍要求 `src/services:verification` 的 formatting logic 从 1,320 降到 1,000 以下。排名最高的
production connection archive verification 和 live probe evidence archive verification 分别承担 91 行与
83 行格式逻辑。两个文件虽然都叫 verification，却同时定义 profile、加载下游证据、计算 checks、生成 digest、
收集 blocker/warning/recommendation，并手写整份 Markdown。问题不是文件名，而是同一模块同时对“证据真假”
和“证据怎样展示”负责；修改标题或空行时，审查者被迫穿过安全检查，修改检查条件时又要绕过大段字符串。

本版把 Markdown ownership 迁到 `verificationReports/productionArchives.ts`，但没有把旧数组原样搬过去。
新 owner 用既有 `renderVerificationReportMarkdown` 声明 meta 与 sections，两个原服务只重导出稳定函数名。
因此这是职责模型变化：服务拥有事实，renderer 拥有表达，通用 builder 拥有标题、section、message、list 的
机械拼接。每层能用不同证据验证，而不是把同一个长函数换一个位置继续存在。

## 二、调用链为何没有改变

route 和 readiness summary 仍从原 `productionConnectionArchiveVerification.ts` 或
`productionLiveProbeEvidenceArchiveVerification.ts` 导入 loader 与 Markdown renderer。原模块通过别名重导出
短函数，调用者不需要知道新目录，也不需要改 import path。renderer 对原 profile 使用 type-only import，
编译后不会形成反向运行时依赖，所以服务重导出 renderer、renderer 引用 profile 类型不会产生循环执行。

运行时顺序仍是：loader 读取或构造证据，计算 checks 与 digest，形成 profile；route 根据 format 参数选择
JSON 或 Markdown；Markdown 分支调用原稳定导出；短函数再把 profile 映射为 report spec。JSON 路径完全不
经过新文件，profile 字段和对象顺序也未变化。`npm run maintainability:census` 继续报告零 import cycle，
说明 type-only 边界没有变成隐蔽运行环。

## 三、为什么两个领域放在一个文件

这两个报告都处于 production archive 链，结构都是顶层 meta、事实 sections、三组消息、evidence endpoints
和 next actions。它们共享同一 builder，却各有一个不应扩散的领域细节：connection 有 latest approval 和
`missing` 显示，live probe 有三个 H3 artifact 子块。放在 `verificationReports/productionArchives.ts` 能让
读者在一个短 bounded context 里比较共性与差异，也避免建立第三个同形文件家族。

文件内只导出 `renderConnectionArchive` 与 `renderLiveProbeArchive` 两个短角色名。原长公共名只在旧服务
入口出现一次。初稿曾让新文件也导出长名，elegance census 因重复暴露把 name debt 从 4,444 提高到 4,446；
本版没有接受或刷新这个增长，而是利用目录上下文缩短内部名字，再由稳定入口做别名。最终 name debt 回到
4,444，证明新结构没有用可读性换兼容性。

## 四、report spec 如何保存字段顺序

builder 接受 title、按顺序排列的 meta tuple 与 sections。connection 的 meta 依次是 service、generatedAt、
profileVersion、archive readiness、production connection readiness、readOnly、executionAllowed；live probe
只把第五项替换为 production operations readiness。数组顺序就是输出顺序，没有对象反射或字母排序。

sections 同样显式排列。connection 保持 Archive、Checks、Artifacts、Summary、三类消息、Evidence Endpoints、
Next Actions；live probe 保持 Verification、Checks、Artifacts、Summary 与同样的尾部。`entries` 只展开原对象
插入顺序，`messages` 和 `list` 使用 builder 已测试的固定格式。每一个标题与空态文字仍在领域 spec 中可见，
通用层不会根据 profile 名猜测内容。

## 五、connection 的 missing 特例为什么保留在领域层

仓库通用 `renderEntries` 对 undefined 输出 `unknown`，但旧 connection archive formatter 对 approvalDigest、
approvalDecision、approvalSequence 等缺失值输出 `missing`。在 READY profile 中这些字段存在，普通 route 测试
不容易发现差别；只有空 ledger 的 BLOCKED profile 会稳定暴露该合同。如果直接把 Archive section 写成
`entries: profile.archive`，迁移看起来更简洁，却会悄悄改变三个词并破坏完整 Markdown 字节。

因此 connection Archive 使用 `connectionEntryLines`，只对 undefined 保留 `missing`，其他字符串和 JSON
值仍按旧规则表达。这个 helper 没有进入通用 builder，因为 live probe 和大多数报告的约定是 `unknown`。
领域特例停在领域文件，避免为单一历史合同污染所有报告。冻结 oracle 正是用空 approval ledger 构造该分支，
所以任何人以后把它改回通用 entries，SHA-256 会立即失败。

## 六、latest approval 为什么不是普通 entries

latest approval 存在时，旧 Markdown 使用人类标签：Latest approval id、sequence、decision、reviewer、digest、
change request digest 和 real connection attempted；缺失时只显示一行 `Latest approval: missing`。直接展开对象
会改成 camelCase 键，还可能展示内部字段。新 `latestApprovalLines` 保留这个投影，并把它放在 implementation
precheck 与 dry-run change request 两个 entry block 后面。

Artifacts section 的三块之间各有一个空行，末尾不手工附加空行；builder 在下一个 Summary section 前插入
唯一分隔。这样职责清晰：领域函数决定三个 artifact block 的内容，builder 决定 section 边界。完整字节
oracle 同时覆盖 missing 分支，现有 ready route test 覆盖 approval 存在分支，两者组合避免只验证一半状态。

## 七、live-probe 的 H3 嵌套怎样保持

live probe Artifacts 不是三个无标题对象，而是 Archive record、Version references、Evidence state 三个 H3。
旧数组在 H3 前后和 entry block 之间有精确空行。新 `liveProbeArtifactLines` 返回同样的行序：H3、空行、
entries、空行，再进入下一 H3。最后一个 block 不带额外空行，由外层 builder 分隔 Summary。

这里没有为 H3 再设计递归 section tree。当前 builder 的顶层 section 已经稳定，只有一个报告需要这种三块
嵌套；把任意层级、任意间距做成通用 schema 会增加抽象成本。`lines` 扩展点正是让领域拥有特殊布局而不
复制整个报告框架。未来出现第三个完全相同嵌套结构时，再提取 typed sub-section helper。

## 八、oracle 为什么选择 BLOCKED 而不是只看 READY

固定时间为 `2026-07-21T13:00:00.000Z`，audit store 使用 memory，upstream probes/actions 都关闭，approval
ledger 为空。connection 因 approval 缺失进入 BLOCKED，输出三个以上 blocker 与 `missing` 字段；live probe
则消费未通过 approval 的 archive，同时展示 skipped probe 边界。这个状态覆盖空态、消息态、缺失字段、
嵌套 artifacts、digest 与安全关闭字段，比只看全 true 的 READY profile 更容易捕获 formatter 漂移。

迁移前先运行旧源码得到 connection 3,535 字节、SHA-256 `d1898d64f0ca8e615e2e6d41d0153f106a986bf9a55d79c871e84f87536dfae9`，
live probe 3,456 字节、SHA-256 `50a13c577a64816aeec1aab6b4b9eeef05aded423af0d3b1aff6322f99829883`。
随后才改生产源码。测试常量在迁移后未调整，两项再次通过，因此不是根据新输出回填期望。

## 九、现有测试与新 oracle 各自负责什么

`productionConnectionArchiveVerification.test.ts` 覆盖有 approval 的 ready loader、无 approval 的 blocked loader
以及 JSON/Markdown route；`productionLiveProbeEvidenceArchiveVerification.test.ts` 覆盖 skipped evidence、
archive not ready 与 route。它们验证业务真假、状态、消息 code 和关键 Markdown 内容。新 parity test 不重复
这些断言，只把两个固定 profile 的完整输出压成 byte length 与 hash。

`verificationReportBuilder.test.ts` 则验证引擎本身：四种 section、空态、紧凑间距、相邻标题和末尾换行。
四个测试文件共 19 项在最多四个 worker 下通过。分层后失败位置更明确：profile 字段错看领域测试，通用
间距错看 builder 测试，某一完整报告字节错看 parity test。

## 十、family logic 数字如何真实下降

family census 把文件名最后一个角色作为 family，并统计该 family 中 render/format/markdown 函数的代码行。
迁移前两个 verification 文件各拥有 91 与 83 行 formatting logic；迁移后服务里没有 renderer，formatting
进入 builder 驱动的报告 owner，verification 总分从 1,320 精确降到 1,146，净减 174，符合设计前预测。

这不是改后缀：两个原手写数组被 section specs 取代，重复 title/meta/message/list 拼接已删除；新 owner 通过
既有 renderer census 的标准化规则，没有增加 waiver。renderer 仍为 242/245 standardized、三个既有
composition-only waiver、零 non-waived。实际重复代码减少，family 数字只是这一职责迁移的机械映射。

## 十一、其他机械门为什么保持不变

maintainability 仍为 73 个近限文件、72 个长函数、193 个复杂函数、零导入环。两个原服务只有约 400 行，
移出 renderer 尚未影响近限或长函数账本；v2234 的 packet/preflight 才同时命中这些指标。name debt 保持
4,444，52 个受管 family 不变，源码超过 800 行为零。定向 lint 零告警，typecheck 证明别名重导出与 type-only
引用正确。

本版没有更改 maintainability/elegance baseline，因为没有对应集合需要收紧；也没有把新文件加入 ignore。
九分门仍不会通过，当前工作只是把 verification logic 红项从 320 行差距缩到 146 行。下一版按同一 oracle
纪律迁移 packet 与 preflight，理论上再减 166 行并让该门转绿。

## 十二、安全边界与跨项目关系

renderer 只消费已构造 profile，不读取文件、不访问网络、不计算批准、不改变 ready，也不实例化 client。
UPSTREAM_PROBES_ENABLED、UPSTREAM_ACTIONS_ENABLED、access guard 与 audit store 行为全部留在原 loader/config。
JSON route 不经过新 owner，Markdown route 的完整字节已锁定，所以没有 schema、权限、write/no-write 或
fail-closed 漂移。

本版不消费新鲜 Java/mini-kv 证据，不启动兄弟服务，不修改 historical fixture。两项目继续 recommended
parallel，Node 不是批准前置。没有 HTML 或 Dashboard 变化，截图不适用；创建空图片只会制造无信息档案。
v2233 到此只完成本地 focused/static 收口，完整 shard/coverage/build/smoke/CI 按五版批次留到终局执行。

## 十三、用一个具体输入看清三层输出

以 connection 的空 approval ledger 为例，loader 先得到 implementation precheck 和 dry-run change request，
再发现 `latestApproval` 为 undefined。它据此把 approvalRecordPresent、approvalDigestValid、
approvalDigestMatchesChangeRequest 与 approvalReadyForArchive 置为 false，收集对应 blocker，同时保持
noDatabaseConnectionAttempted、noJwksNetworkFetch、noExternalIdpCall、noRealConnectionAttempted 和
upstreamActionsStillDisabled 为 true。archive 对象仍含 precheckVersion、changeRequestDigest，并让三个
approval 字段保留 undefined；这就是 renderer 的完整输入事实。

领域 renderer 不重新判断“缺少 approval 是否 blocked”。它只把 archive 的 undefined 表达为 `missing`，
把 checks 按原对象顺序展开，把 implementation precheck 与 change request 作为两个 artifact block，再输出
`Latest approval: missing`。blocker 数量和文字直接来自 profile。最后，report builder 只在 meta 与各 section
之间放置约定空行，为消息与列表套上统一行格式，并追加一个末尾换行。三层分别回答“事实是什么”“这个
领域怎样展示事实”“通用 Markdown 骨架怎样拼接”，没有任何一层重复另两层的判断。

live probe 的输入也能按同样方法追踪。空 ledger 使底层 connection archive 不 ready，但 probes/actions 关闭，
因此 planned probe 仍为五个，结果全部 skipped，writeProbeAttempted 为 false。loader 负责证明 skipped 不是
production pass；renderer 只展示 Verification、Checks 和三个 artifact 子块；builder 只处理公共 section。
这解释了为什么两个报告能共享一个 owner，却不能共享一个把字段名动态化的万能 spec。

## 十四、最容易出现的四类回归

第一类是词值回归：把 connection Archive 改用通用 entries，会把 `missing` 变成 `unknown`。第二类是空行
回归：Artifacts lines 自己保留尾空行、builder 又在 Summary 前插入空行，会从一个空行变成两个。第三类是
导出回归：新文件和旧入口都暴露长 renderer 名，运行不坏，但 name debt 会增长。第四类是运行时环：若
renderer 用普通 import 读取 profile 值而不是 type-only import，旧服务的重导出可能形成循环初始化。

这四类风险分别由不同门捕捉。完整 hash 发现词值和空行变化，elegance census 发现重复长导出，typecheck 与
maintainability cycle scan 发现依赖边界问题，route tests 证明 stable import 仍可用。仅跑一个 contains 断言
无法覆盖这些风险；仅看静态数字也无法证明 Markdown 没变。因此本版坚持 oracle、编译、领域测试与 census
四层证据，而不是用其中一层替代全部验收。

## 十五、代码评审时应沿什么顺序阅读

评审者首先看两个原 verification 文件的 diff：应只出现 renderer 重导出和旧手写格式 helper 删除，loader、
checks、digest、messages 不应有改动。第二步看 `productionArchives.ts` 的 meta 和 section 次序，对照旧数组
确认每个标题、空态文字与字段投影存在。第三步看 connectionEntryLines、latestApprovalLines 与
liveProbeArtifactLines，确认它们只处理历史展示差异，没有判断 readiness 或权限。最后看 parity test 的
oracle 是否在源码迁移前生成、状态是否能覆盖缺失值和消息分支。

若 diff 出现 fixture、旧测试常量、profile interface、route catalog、config 或 access guard 变化，应立即
停止合并，因为这些都超出 renderer ownership。若新文件需要十几个 optional 回调才能表达两个报告，也应
退回设计，那意味着抽象正在吞噬领域差异。当前 spec 只用 builder 已有的 entries/messages/list/lines 四种
边界，特殊逻辑总计三个短 helper，审查面保持有限。

## 十六、为什么现在不继续迁移第三个报告

v2233 的两个报告共减少 174 行 verification formatting logic，新增源码与测试、文档仍能控制在单版审查
预算内。packet 与 preflight 每个文件都超过 700 行，除 renderer 外还包含 historical evidence 读取、snippet
解析与类型收窄；它们需要另一组 fixed fallback oracle，并可能共享 evidence file/snippet block。若把四个报告
一次塞入 v2233，提交会跨越两种风险模型，讲解和 focused 失败也难以定位。

因此下一版单独处理 packet/preflight。它会先验证真实 resolved path 在 historical fixture 下稳定，再迁移
两个 renderer，并观察两个大文件是否真实跌破 600 行。若第三次相同 evidence block 出现，才建立 typed
helper；若 spacing 或标签不同，则仍保留领域 lines。这个切片让 v2233 自身具有完整价值，也让 v2234 能对
近限与 verification 终局阈值给出独立、可复核的贡献。

## 十七、本版的完成判据

本版完成不以“新文件存在”为准，而以五件事同时成立：两个迁移前 hash 在迁移后完全相同；原路径导出仍由
现有 route tests 消费；verification formatting logic 精确减少 174 行；name debt、受管 family、renderer
waiver 与维护性集合没有增长；临时 oracle 文件、构建产物和后台进程均未遗留。任何一项缺失都只能称为迁移
进行中，不能打版本标签。这个判据也会成为 v2234 的起点，使后续收敛继续建立在可重现事实上。
