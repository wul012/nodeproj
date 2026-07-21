# Node v2221 代码讲解：声明式读取 v111 证据并拆开 691 行服务

## Goal / 目标与 Non-goal

本版处理 `managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.ts`。旧文件 691 行，
同时负责 Node source 摘取、Java v102 文本证据、mini-kv v111 JSON 证据、字段默认值、readiness、checks、
blocker 和最终 profile。职责过密的直接后果是：修改一个 receipt 字段时，审查者必须浏览整份服务，无法
快速确认读取顺序、缺失默认值和安全判断是否仍一致。

目标是建立清楚的 evidence ownership，并复用仓库已有字段映射 engine。Non-goal 是改变 receipt schema、
更新 frozen fixture、增加 route 或打开 adapter connection；所有输出必须和旧实现逐字一致。

## Entry Point / 稳定入口

公开入口仍是
`src/services/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.ts`。它继续导出原
loader 与 `renderManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationMarkdown`，
route、测试和下游 import 无需迁移。

新内部入口是 `src/services/disabledAdapterSources.ts`，只向 profile 服务导出
`createJavaV102Reference` 与 `createMiniKvV111Reference`。它没有从稳定 facade re-export，因此内部拆分没有
扩大公共 API，也没有让消费者绕过完整 profile 直接依赖历史证据实现。

## Response Model / 对外模型保持什么

profile 继续包含 sourceNodeV252、sourceNodeV253、upstreamEchoes、echoVerification、17 个 checks、summary、
messages、evidenceEndpoints 与 nextActions。对象键顺序、evidence 文件顺序、snippet 顺序、字段默认值、
verification digest 和 Markdown 顺序全部由完整字节 oracle 保护。

Java v102 reference 与 mini-kv v111 reference 的类型仍来自
`managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationTypes.ts`。新模块没有重新定义
镜像接口，因而类型所有权和 renderer 消费模型不变。

## Upstream Evidence / 证据来源

Java v102 证据由 runbook、代码讲解和 builder 三个文件组成；mini-kv v111 由 receipt JSON 和 runbook
组成。路径仍写成原 sibling workspace 位置，`historicalEvidenceResolver.ts` 在本机或 CI 中解析到冻结的
`fixtures/historical/sibling-workspaces/`，没有读取当前 Java v1881 或 mini-kv v1674 之后的工作成果。

本版显式验证不强制 fallback 与强制 fallback 两条入口。当前仓库因 committed fallback 存在，两条路径都
选择相同冻结文件；测试仍分别执行两次，防止环境变量直读规则在后续维护中被配置对象误代替。

## Service Flow / 新调用链

profile loader 先从本仓库生成 Node v252 precheck 与 Node v253 shell source。随后调用 evidence 模块生成 Java
与 mini-kv reference，再把四个对象交给 `createChecks`。checks 通过后，原 loader 计算 state、messages、
digest 和 summary；renderer 读取同一 profile 生成 Markdown。

与旧版相比，顶层服务不再知道 JSON 如何解析，也不再拥有 sibling evidence 路径。evidence 模块不负责
Node source 和最终 report。两个方向依赖单向流动，没有互相 import，因此 maintainability scanner 仍为
零导入环。

## Data Model / ReceiptFieldSpec

`historicalEvidenceReportUtils.ts` 已提供 `ReceiptFieldSpec`：每条规格包含目标字段、源 JSON key、类型
`text/flag/count` 与 fail-closed 默认值。`mapReceiptFields` 按声明顺序写入对象，拒绝重复目标 key，并对
错误类型使用显式默认值。

v111 将字段分成 source、request、response、boundary 和 post-restore 五组。分组不是为了凑文件，而是对应
JSON 的对象所有权与原对象键序；维护者可以在一个连续表格中审查字段名、类型和默认安全方向。

## Source Fields / source 规格

`V111_SOURCE_FIELDS` 从 nested receipt 读取 digest、source precheck、计数、source shell、transport 和 probe。
允许类字段默认 true，例如 source external request may be sent；ready/closed 类字段默认 false。这样缺字段
会使 readiness 失败，而不是给出虚假的安全结论。

字段目标名是类型化结果对象的 key，源名保持 mini-kv 的 snake_case。二者并列后，映射关系无需在五十行
`booleanField(...) ?? true` 中逐个寻找，也避免复制粘贴时把 source key 配给错误目标。

## Request And Response / 请求响应规格

request 只包含 credential handle only 与 credential value accepted。前者缺失默认 false，后者缺失默认 true，
因此不完整证据不会误判为 handle-only 安全合同。response 的 external request、credential read 和 production
record 都默认 true，同样要求 receipt 明确给出 false 才能通过。

这套默认值体现“允许或发生副作用的未知值按危险处理”。它不是普通 UI 默认值，而是验证器的失败关闭
策略；本版逐项保留旧值，没有统一改成 false。

## Root Precedence / root 与 nested 兼容

receiptVersion、releaseVersion、consumerHint、readOnly、executionAllowed、restoreExecutionAllowed 和
orderAuthoritative 允许旧 schema 把字段放在 root，也允许 nested 新位置。它们没有进入普通 manifest，
而是显式写成 `root ?? nested ?? fallback`。

必须使用 `??` 而不是 `||`。false 是 executionAllowed 等字段的重要合法值，空字符串也可能是需要被后续
identity 判断拒绝的真实输入；`||` 会把这些值错误替换成 nested 或 fallback，掩盖证据内容。

## Object Order / restore 字段的教训

第一次迁移后，完整输出字节长度相同但 SHA 不同。逐项检查确认所有值一致，问题来自对象属性插入顺序：
旧对象在 schema migration 后写 restore，再写 load/restore/compact、SETNXEX 和 backend；首版 manifest
却先 spread 后三项，再插入 restore。

修复方式不是更新 oracle，而是把规格拆成 `V111_BOUNDARY_FIELDS` 与 `V111_POST_RESTORE_FIELDS`，在两次
spread 之间显式写 restore。复测恢复原摘要。这说明对报告对象而言，字段顺序也是合同，声明式映射必须
保存顺序而不只是保存键值集合。

## Evidence Metadata / raw 与 normalized

旧服务通过 raw Buffer 和文件 stat 计算 evidence size/digest。共享 `evidenceFile` 默认会去 BOM 并统一换行，
这对新报告的跨平台 canonical metadata 很有价值，但直接迁移会改变 v111 runbook 的 CRLF 摘要。

因此 `evidenceFile` 新增可选 `textMode: "raw"`。默认值仍是 normalized，所有现有调用行为不变；本报告的
五个历史文件显式选择 raw，保留旧合同。`test/historicalEvidenceReportUtils.test.ts` 新增 raw CRLF 用例，
同时既有 LF/CRLF canonical 用例继续通过。

## Java Reference / v102 readiness

Java builder 保留原 evidence 和 16 个 snippet。identity、profile、next consumer 与四个计数仍显式比较；
ready/verification 字段和十个禁止副作用字段分别交给 `allBooleanFieldsAre`。`isJavaV102Ready` 的复杂度低于
阈值，同时比旧 31 分长链更容易看出哪些字段必须 true、哪些必须 false。

Java reference 仍先构造 `readyForNodeV254Alignment=false` 的基础对象，再以具名 readiness 生成最终 shallow
copy。属性位置不变，因此对外序列化顺序也不变。

## Mini-kv Reference / v111 readiness

mini-kv readiness 分为 identity、source precheck、shell shape 与 runtime closed 四层。identity 检查 evidence、
receipt version、release、consumer 和 FNV digest；source precheck 检查 profile/state/计数与 source probe；
shell shape 检查 fake transport 形状；runtime closed 检查 handle-only/read-only/dry-run 与二十个 false 字段。

这些函数没有把不同类型关系塞回一个新长链。每层都对应 review 时可独立回答的问题，任何一层失败都让
最终 alignment false；没有“部分证据足够”的宽松路径。

## Checks / 顶层服务也做童子军清理

旧服务的 `createChecks` 复杂度 50。拆证据时如果原样留下，文件虽变短却仍有明显热点。本版把 Node boundary、
count、fake transport、credential、connection、write 和 auto-start 分成具名谓词，组合根只保留 17 个稳定键。

三个 count 复用 `hasAlignedCount`，该 helper 要求至少一个值并逐项严格等于 expected；空输入不会 vacuous
pass。其他谓词保持各自领域字段，最大复杂度低于 20，没有用一个无类型万能规则表取代原长链。

## Portable Oracle / 为什么规范化路径

报告包含 resolvedPath，本机为 `D:\nodeproj\...`，Linux CI 会是 runner 绝对路径。直接对完整 JSON 求摘要会
把机器路径误当业务合同。测试复用 `test/support/portableProfileParity.ts`，把当前 repository root 和声明的
Windows root 统一替换为 `<repo>`，并将反斜杠改为正斜杠。

规范化只作用于测试副本，不修改生产 profile。v2219/v2220 的本机 raw 摘要仍保留在归档，同时新增 portable
摘要；这样本机可以证明真实输出不变，CI 可以跨操作系统证明除路径外的全部字节不变。

## Ready Oracle / local 与 fallback

固定时间后，portable ready JSON 为 21,502 字节，SHA-256
`b51ebacc7b10d101176b8ca245d7f86155443b0166e602b66abb143bd7084047`；Markdown 为 21,115 字节，摘要
`293393d31d69e894e7939b53a4c1b95488d6efb092cfb9d0b29a520e45e3207f`。local 与 forced fallback 两次加载
都必须得到这组结果和 17/17 checks。

Windows 未规范化输出仍为 22,564/22,177 字节与旧摘要，证明 portability 修正没有改变真实报告，只改变
测试如何去除机器路径噪声。

## Blocked Oracle / 开关负向路径

`UPSTREAM_ACTIONS_ENABLED=true` 会同时使 Node source 不 ready 和 runtime check 失败，因此 blocker 顺序保持
`NODE_SOURCES_NOT_READY`、`UPSTREAM_ACTIONS_ENABLED`。portable blocked JSON/Markdown 为 21,818/21,284
字节及固定摘要，passed checks 为 13/17。

该负向路径保护 checks 的连带关系、blocker 顺序与 renderer 文案，防止字段迁移只在 ready fixture 上正确，
却在安全开关打开时遗漏阻断。

## Maintainability / 机械改善

原 691 行文件离开 near-limit 列表，当前 profile 服务 412 行，evidence 模块 345 行。旧 151 行
`createMiniKvV111Reference`、复杂度 109 的 mini-kv builder、复杂度 50 的 checks 与复杂度 31 的 Java builder
全部从账本消失。

仓库基线由 85 / 100 / 223 / 0 收紧为 84 / 99 / 220 / 0。两个新文件都没有 long/complex 条目，说明职责
拆分没有把指标搬家；import cycle 仍为零，依赖方向保持 evidence 到 shared utils、profile 到 evidence。

## Test Coverage / 测试覆盖

focused 矩阵包含 `test/resolverEchoParity.test.ts`、
`test/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.test.ts` 与
`test/historicalEvidenceReportUtils.test.ts`，共 14 项。它覆盖完整字节、local/fallback、blocked 开关、route、
字段映射重复 key、错误类型默认值、normalized 与 raw evidence metadata。

typecheck 保护 field spec 元组类型和 reference 结构；定向 lint、七项静态门与讲解门在文档完成后执行。
完整全量测试、build、HTTP smoke 和远端 CI 留到 v2222 批次末统一运行。

## Safety Boundary / 安全边界

本版没有改变 executionAllowed、connectsManagedAudit、credential read/store、schema migration、auto-start 或
production readiness。没有修改任何 fixture，也没有启动 Java、mini-kv 或 Node server。临时 v2220 对比
worktree 只用于只读差异定位，其 node_modules junction 和目录已经删除。

Java v1881 与 mini-kv 用户文档改动保持不动。Node 只消费冻结 v102/v111 evidence，不等待 fresh 上游版本，
三项目可以继续独立并行。

## Evolution Guide / 后续扩展方式

新增普通标量时，把它放入拥有相同 source object 和相同顺序位置的 spec group，并选择显式安全默认值。
新增 root/nested 兼容字段时保留显式 `??`；新增复杂数组或对象时建立具名 parser，不要扩展
`ReceiptFieldSpec` 成无边界解释器。

若报告希望采用 normalized evidence digest，应在新合同中明确声明；已有 raw 合同不能静默迁移。改变对象
顺序、fallback precedence 或默认值都属于合同变化，必须有新版本和新 oracle，不能夹在重构提交里。

## Failure Semantics / 异常类型如何失败关闭

`mapReceiptFields` 不做 JavaScript 隐式转换。字符串 `"false"` 不是 flag，数字字符串 `"5"` 也不是 count；
它们都会落到规格给出的危险侧默认值。text 字段若不是字符串则得到 `"missing"`。这种处理不会替上游
修复数据，而是让 identity、计数或 boundary readiness 明确失败。

`readJsonObject` 在文件不存在或顶层不是对象时返回空对象，后续所有规格自然采用默认值。nested、request
或 response 不是对象时，`objectField` 也返回空对象。解析链没有非空断言和强制 cast，因此 malformed
receipt 不会因运行时异常绕过 blocker，也不会凭空构造 ready 证据。

## Snippet Ownership / 文本证据与字段证据的分工

Java v102 没有由 Node 解析的统一 JSON receipt，因而 reference 仍用 snippet 证明 schema、marker、计数和
no-go 文本存在。mini-kv v111 同时使用 JSON 字段和 snippet：字段参与结构化 readiness，snippet 证明
归档文件确实记录了 consumer、source 版本和关键安全声明。

两类证据不能互相替代。只查 snippet 容易被相似文本误命中，只查 JSON 则无法证明 runbook 讲清真实
server/client 路径仍被禁止。evidence 模块把它们放在同一 reference 中，但 readiness 分别检查文件存在、
snippet 完整和结构字段，使审查者能判断失败来自文件、文字还是数据。

## Parser Choice / 为什么不用新 schema 库

仓库没有为历史 receipt 引入运行时 schema 库，本版也没有新增依赖。v111 字段都是浅层 text/flag/count，
已有 `readJsonObject`、`objectField` 和 `mapReceiptFields` 能提供严格类型检查、默认值与重复 target 检测。
引入另一套 validator 会扩大构建面，并让十五个同类旧消费者继续保留私有 helper，收益不足。

若未来出现联合类型、嵌套数组或字段间复杂约束，应先评估在 shared evidence engine 中增加窄能力，而不是
在单个 report 内写 ad hoc parser。当前切片只购买实际需要的抽象，不把一个简单 receipt 迁移变成全仓
schema 框架替换。

## Review Checklist / 审查者应看什么

审查字段规格时，先比较 target key 顺序，再核对 source key 与 kind，最后确认 fallback 位于危险侧。审查
root precedence 时，逐项确认 `??` 次序与旧实现一致。审查 readiness 时，确认 identity、source、shell 和
runtime 四层都参与最终 `&&`，没有某一层只用于展示却未阻断 readiness。

审查输出时，不只看 17/17 和 state，还要比较 evidence/snippet 数量、resolvedPath 规范化结果、raw digest、
blocker 顺序和 Markdown。最后运行 maintainability census，确认旧三个复杂函数确实 stale，且两个新文件
没有 unknown/grown 条目。

## Raw Mode Boundary / raw 选项的停止点

`textMode: "raw"` 只用于维护已有报告的历史 metadata 合同，不应成为新报告默认值。新证据通常更适合
normalized 模式，因为 Git checkout 的 CRLF/LF 不应制造 digest 漂移。调用者若选择 raw，必须有旧 oracle
或外部协议证明字节级 metadata 本身就是合同。

该选项也不影响 snippet：snippet 仍按 UTF-8 文本读取并查找内容。raw 只控制 evidenceFile 的 size 和
SHA-256，不能借此跳过 BOM、JSON 解析或字段验证。这样兼容开关保持窄边界，不会扩散成第二套读取体系。

## Migration Sequence / 可重复的迁移顺序

以后迁移同类消费者时，应先固定本机 raw 与 portable CI oracle，再建立新 evidence 模块；随后迁移路径与
snippet，接着把同构标量写成有序规格，最后拆 readiness 与顶层 checks。每一步都跑 oracle，长度相同但
摘要不同优先检查属性顺序和 digest 语义，不立即改期望。

完成源码后再向下刷新 maintainability baseline，并在文档里记录前后文件行数、长函数和复杂函数。只有
本地/forced fallback、ready/blocked、raw/portable 四个维度都覆盖，才算证据读取迁移完成。

## Stop Condition / 停止条件

v2221 在 raw 与 portable oracles、3 文件 14 项测试、typecheck、lint、静态门、讲解门和 84 / 99 / 220 / 0
ratchet 全绿后停止。下一版用同一已验证范式处理 v112 fake-transport，但保留其独有 packet、archive、cleanup
语义，不把两个 receipt 强行合成一份大配置。

## One-sentence summary / 一句话总结

Node v2221 把 v102/v111 证据读取从 691 行服务中独立出来，以有序字段规格、显式 nullish precedence 和可选
raw metadata 保持完整输出不变，同时删除一个大文件、一个长函数和三个复杂函数债务。
