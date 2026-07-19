# Node v2205 代码讲解：从两个临界大文件收回三笔维护债务

## 目标与非目标

v2205 的目标不是为了让文件列表看起来更整齐，而是验证 v2204 新增的维护性门能指导一次真实、可证明、不会搬家式造假的重构。输入是排名最前的两个近线文件：`statusRoutes.ts` 有七百九十五个物理行，`dashboardMarkup.ts` 有七百九十三个物理行；前者的主注册函数本身跨度六百一十八行，后者则把多个已经稳定成组的页面 section 放在一个原始模板中。停止条件要求两个文件都降到六百行以内，并且路由、响应、dashboard 字节与安全边界不变。

非目标包括重新设计 API、改写报告字段、调整场景证据含义、更新 fixture 迎合实现、开放生产写入、改变 Java 或 mini-kv 合同，以及顺手重命名历史长路径。本版也不按固定行数把文件切成无意义的上半部和下半部。每个新模块必须能用一个职责名称说明，抽取后不能出现新的六百行文件、百二十行函数、高分支函数或运行时循环。

## 选择热点所依据的证据

候选不是凭印象决定。v2204 census 给出精确排序，两处文件分别位于第一、第二名；CodeGraph 显示 `registerStatusRoutes` 已经调用六个先前拆出的 status 子模块，但剩余代码仍集中为 real-read、release/approval、基础状态、CI 和 runtime/SSE 五组。历史记录也说明该文件在 v271、v276 至 v280 连续拆出上游 fixture、安全、部署、readiness、rollback 与 live-probe 组，当前质量档案明确把“remaining real-read window route group”列为下一候选。

dashboard 的历史则显示样式和三段 client script 已经从入口移出，`dashboard.ts` 只负责组合；剩余热点纯粹来自静态 markup。模板第一个自然边界是 fixture 与场景证据，第二个自然边界是场景证据与审计/操作台。场景矩阵、场景验证、归档 bundle、归档验证四个连续 section 共享相同审查语义和 endpoint 家族，抽成一个 fragment 比把若干随机 card 搬走更容易理解，也不会制造第三个相似渲染 engine。

## 迁移前 oracle 如何冻结输出

`test/maintainabilityHotspotParity.test.ts` 在任何源码迁移前先运行通过。路由部分列出本次准备移动的三十四条 GET 路径，构建真实 Fastify app 后逐条调用 `hasRoute`，同时断言数组长度和集合大小都为三十四。长度保证没有漏写清单，集合大小防止同一路径重复占位，`hasRoute` 则证明每条路径真实注册在应用中，而不是只存在于文档或常量里。

页面部分同时冻结两个层次。`dashboardMarkup` 必须保持三万八千一百三十七个字符与固定 SHA-256；`dashboardHtml()` 还要保持九万五千七百二十四个字符与另一份固定 SHA-256。前者能定位 markup 组合偏差，后者把 styles、markup、client script 与外壳全部纳入最终浏览器 artifact。这样，少一个空行、移动一个空格、改变模板插值边界都会立即失败，测试不依赖肉眼判断“看起来差不多”。

## 共享 JSON/Markdown 注册边界

原 `statusJsonMarkdownRoute.ts` 已能注册不依赖请求上下文的 profile：校验 `format` 查询参数，调用 loader，遇到 Markdown 时设置内容类型并调用 renderer，否则直接返回 JSON。剩余十五条路由也重复同一骨架，差别只是 loader 需要读取身份、角色与审批关联请求头。继续在两个新模块复制 Fastify handler 会违反三次规则，因此本版增加 `registerHeaderJsonMarkdownRoute`。

新入口接收一个 `headers -> profile` loader，然后委托私有 `registerRequestReportRoute`。原无请求入口也改为委托同一私有函数，所以 schema、await、内容类型和 JSON 返回路径只有一份实现。headers 类型直接取自 `FastifyRequest`，没有退化为自由字典或 `any`；同步 loader 与 Promise loader 都由 `Promise.resolve` 归一化。输入仍是同一 Fastify request headers，输出仍是同一 profile 或 renderer 字符串，改变的只有重复控制流所在的位置。

## report 路由模块中 real-read 注册函数的输入与输出

`statusReportRoutes.ts` 中的 `registerStatusRealReadRoutes` 接管十七条路径。前七条是 adapter rehearsal、operator window runbook、failure taxonomy、evidence archive、archive verification、imported result packet 与 readiness checkpoint；它们不读取请求头，通过已有 `statusJsonMarkdownRoute` 数据项批量注册。`createAdapterDeps` 每次构造 config、orderPlatform client 和 miniKv client 三项依赖，保持旧实现每次调用都得到新容器的语义。

后十条涉及 operator identity、audit-store handoff、CI manifest、upload dry-run、cross-project retention、三项目 smoke 与 hardening triage，必须保留请求头。`createWindowDeps` 在 adapter 依赖上增加当前 request headers，再交给原 service loader。每条 renderer、路径字符串和注册顺序都从旧主函数原样迁移。该注册函数不拥有业务判断；它只负责把请求上下文送到既有服务，并把既有服务送到共享响应边界。

## report 路由模块中 release 与 approval 注册函数的输入输出

同一文件中的 `registerStatusReleaseGateRoutes` 接管另外十七条路径。前十一条包括 idempotency review、controlled drill、cross-project release gates、environment preflight、post-v166 summary、deployment evidence、release window、dry-run envelope 与 handoff review，输入只有 `deps.config`。接下来的 retention、pre-approval、decision prerequisite、approval ledger 与 rehearsal packet 五条需要 headers，因此走新的 header registrar。最后的 real-read rehearsal intake 保持在这些 approval 路径之后注册。

合并模块容器没有合并两个注册函数，也没有把不同 profile 压成一个大联合。每个 `statusJsonMarkdownRoute` 调用仍由 TypeScript 在本地推断具体 profile 与 renderer 参数；若 loader 和 renderer 类型错配，typecheck 会在对应条目失败。数据驱动只复用稳定的注册行为，不抹掉业务类型。整个文件三百六十九行，两个职责函数分别保持短小，读者仍可沿着 real-read 证据链或发布准备顺序独立阅读。

## 为什么没有把三十四条路由塞进一张巨型配置表

这些路由表面上都有 path、loader、renderer 三项，似乎可以合并成一个大数组；实际 loader 的输入分为 config、adapter clients、request headers 与四者组合，返回 profile 也各不相同。若强行把全部条目放进同一数组，TypeScript 往往需要把 loader 和 renderer 擦除成 `unknown` 后再断言，或者构造一个包含所有可选依赖的宽接口。这样行数可能更少，类型知识却从每个条目的编译期连接处消失，维护者也难以看出哪些 route 具有身份上下文。

本版只把同形且同输入类别的条目数据化：纯 config/adapter loader 使用现有数组 registrar，需要 headers 的条目保留独立泛型调用。两个注册函数的边界按照业务阶段划分，函数内部再按照请求上下文划分。重复的 Fastify 控制流被共享 helper 消除，但 loader 与 renderer 的具体配对仍由编译器逐项验证。这种折中比追求最少源码行更重要，因为优雅的目标是减少认知歧义，而不是把差异藏进动态类型。

## 主路由函数为何继续拆到百二十行以下

第一次迁出三十四条路由后，`statusRoutes.ts` 已从七百九十五行降到二百一十四行，但 census 仍显示 `registerStatusRoutes` 跨度一百七十一行。若此时只刷新近线文件基线，文件层数字很好看，触碰过的函数却仍占用历史额度，不符合童子军规则。因此继续在同一文件提取 `registerStatusCoreRoutes`、`registerStatusCiRoutes`、`registerWorkflowEvidenceRoute` 与 `registerStatusRuntimeRoutes`。

主函数现在只表达注册顺序：core、upstream fixture、CI prelude、既有 status 子模块、workflow、production approval、real-read、release gates、runtime。core 拥有 health、source snapshot 与 upstream overview；CI helper 复用两个 registrar；workflow 保留原位置；runtime 包含配置投影和 SSE 生命周期。所有 helper 都低于百二十行，主函数债务从基线彻底删除。最终文件还吸收了原本只有十行的 Dashboard 路由注册壳，因此为二百一十五行；`app.ts` 仍在原位置调用同名导出，注册顺序没有为了美观被重排。

## runtime 与 SSE 为什么留在同一主模块

`/api/v1/runtime/config` 和 `/api/v1/events/ops` 没有被塞进 real-read 或 release 模块，因为它们属于 Node 自身运行面。runtime config 只是把安全开关、upstream 地址、fixture 路径、限流和审计保留策略投影为只读响应；SSE 则周期性调用已有 snapshot service，把成功样本或错误消息写入同一个连接。二者共享 `StatusRouteDeps`，却不依赖任何生产 profile renderer，继续留在主模块能让基础运行入口与治理报告入口保持清晰分界。

提取成 `registerStatusRuntimeRoutes` 时，`reply.hijack()`、响应头、closed 标志、首次立即发送、interval 周期和 close 监听器的顺序都保持不变。特别是首次 `void send()` 仍在 listener 安装之后，避免连接关闭与第一次异步 sample 之间出现未清理窗口；错误仍只序列化 message，不泄露异常对象。该 helper 的职责是维护连接生命周期，而不是创建新的 SSE abstraction，因此没有额外文件或第二套事件协议。

## dashboard 原始模板怎样保持逐字节一致

`dashboardScenarioMarkup.ts` 保存四个连续场景 section，使用与原文件相同的 `String.raw`。这里最容易出错的不是 HTML 标签，而是模板边界的换行。原文在前一 section、场景组和后续 audit section 之间各有一个空行。新 fragment 的模板值首尾各保留一个换行，外层 `dashboardMarkup` 在插值点前后也各贡献一个换行，组合后仍得到原来的双换行。

抽取过程没有重新排版 HTML，没有改变 id、href、class、按钮文字或 section 顺序。`dashboardMarkup` 从七百九十三行降到五百三十一行，fragment 为二百六十五行。运行时再次计算后，markup 长度和摘要与迁移前完全相同，完整 HTML 的长度和摘要也完全相同。这比只断言若干元素存在更严格，因为元素存在测试无法发现空白、顺序或未覆盖区域漂移。

## 模板拆分后的维护路径

以后修改场景矩阵、场景验证或归档证据面板时，维护者只需打开 `dashboardScenarioMarkup.ts`，元素 id 与对应 client-script selector 仍保持原名。修改 service 状态、fixture 概览、审计统计或操作按钮时继续进入主 markup。这个边界不是按屏幕上下半区随意分割：被抽出的四组 section 都消费 scenario fixture 家族，拥有共同的 JSON/Markdown 链接和 digest 信号；留下的区域则覆盖实时状态、操作输入与通用输出。

fragment 仍是纯字符串数据，没有函数、条件或 DOM 副作用，因此不会形成第三套前端渲染体系。页面行为继续由 `dashboardClientCoreScript`、`dashboardClientOperationsScript` 和 `dashboardClientActionsScript` 驱动，样式继续来自 `dashboardStyles`。若未来场景面板需要动态生成，必须先证明重复达到三次规则并建立数据模型；不能在当前静态片段中夹入另一段手写脚本。

## 收缩基线如何阻止债务搬家

源码完成后第一次运行 census 没有直接通过，而是报告 `statusRoutes.ts` 与 `dashboardMarkup.ts` 两条 near-limit stale。这个失败是正确结果：说明扫描器看到两处真实修复，并要求收回旧额度。显式刷新后继续拆短主函数，第二次又只报告 `statusRoutes.ts|registerStatusRoutes` stale。最终刷新后的 git diff 只删除这三个键，没有新增 unknown，没有 grown，也没有改阈值。

最终计数由九十一个近线文件降到八十九个，长函数由一百二十二个降到一百二十一个，高分支函数仍为二百三十八个，运行时循环仍为两个。后两项不下降并不代表失败，因为本次选定范围没有对应债务；关键是它们既未增长也未被替换。baseline 摘要改变是三笔额度被永久收回，而不是把新文件加入豁免清单。

完整回归还发现了设计草案没有处理好的另一条机械边界。最初两个 route module 让 `src/routes` 的直接 TypeScript 文件从八十个增到八十二个，`governanceGrowthRatchet.test.ts` 因而在完整分片中失败。这个失败不能靠把上限改成八十二解决，因为测试注释明确要求新增 route 文件时先合并既有壳，净数量不得增长；把文件藏进子目录也只是绕过非递归计数，并没有消除模块数量。

最终方案保留两个独立注册函数，但让它们共享一个 `statusReportRoutes.ts` 容器；同时删除只负责根路径十行逻辑的 `dashboardRoutes.ts`，把同名注册函数放进已经承担状态入口的 `statusRoutes.ts`。`app.ts` 的 import 来源改变，调用位置不变。这样代码仍按 real-read 与 release-gate 两条阅读路径分开，直接 route 文件却恢复为八十个。原失败测试未改一字再次通过，维护性 census 也没有出现新文件、新长函数或增长条目。这次先红后绿说明治理门不是展示数字，而是真正参与了设计选择。

## 测试覆盖与失败排查

类型检查证明共享 header registrar 与三十四个具体 profile 类型一致，lint 保持零错误、零警告。代表性路由组覆盖 real-read rehearsal、taxonomy、archive、archive verification、imported packet、checkpoint、pre-approval、decision prerequisite、ledger 与 rehearsal packet，十一份测试文件共三十九项断言通过。抽取后的小批复验再覆盖路由 oracle、dashboard、real-read 与 pre-approval，四份文件十一项通过。

最终树没有直接运行高并发整套 Vitest，而是把清单分成十六片并把总 worker 限为两个。第一次尝试让两片各用一个 worker，第六片在四百二十秒预算处只发生 timeout，没有断言失败。按超时分诊规则，最后仍有活动的历史证据路由文件先单独运行，四项用例全部通过，耗时六十四秒；随后第六片独占两个 worker，三十六个文件、一百一十八项用例在二百三十三秒内通过。没有提高全局超时，没有修改产品代码，也没有改变测试期望。最终十六片全部通过，累计五百六十七个测试文件、一千七百二十六项用例；独立 `vitest list` 得到相同总数，证明分片没有遗漏或重复计数。

build、typecheck、零警告 lint、维护性、优雅命名、family、八百行上限、renderer、安全配置与归档保留门全部通过。HTTP smoke 使用工具托管的前台进程绑定 31205 端口，上游探测、动作与访问强制均关闭；health、metrics、runtime config、real-read JSON、同路由 Markdown 和 Dashboard 六项响应都是 200，JSON 均可解析。验证结束后页面、进程和端口全部关闭。

若以后 34 路径 oracle 失败，先检查调用顺序与新模块是否仍被主函数注册；若具体 JSON/Markdown 测试失败，检查 loader 是否收到了原 config、client 和 headers，不要修改 fixture 或期望来迁就错误映射。若 dashboard digest 失败，应先比较插值点首尾换行和移动块字节，再检查是否有人顺手格式化模板。若 census 报 unknown 或 grown，说明拆分制造了新热点或某个额度变大，不能通过刷新基线掩盖。

## 安全边界与跨项目关系

本版没有增加 endpoint，三十四条路径只是换了内部注册模块；没有改变 access guard、角色、identity header、approval correlation、upstream probe 或 action 开关。共享 helper 把原 request headers 原样交给 loader，不解析凭据值，也不缓存请求对象。SSE 的 hijack、interval、close listener 和错误事件仍在 runtime helper 中保持原实现，生产连接权限与写路径没有被触碰。

Java 与 mini-kv 只作为既有 client 类型和 profile 语义出现，本版不读取新鲜 sibling 文件，不修改冻结历史 fixture，也不启动它们的进程。两项目可继续独立推进，Node 不是前置批准者。由于外部合同、跨项目证据与 live-capstone 触发面均未改变，最终验证只需要 Node 完整 suite、build、静态门、HTTP smoke 和 dashboard 浏览器检查。

Playwright 在一千四百四十乘九百桌面视口完整渲染页面并归档全页截图；主要三列、表单和操作区均位于主内容边界内。三百九十乘八百四十四移动快照证明卡片和表单已经按单列重排，同时暴露少数超长审计按钮超过三百零二像素内容列，控制台也记录 favicon 404。源码侧还可见迁移前就存在的重复文档外壳标签。由于 v2205 的 oracle 明确要求完整 HTML 逐字节不变，这些发现不能偷偷混入本次重构；它们被写进机器证据，交给独立后续版本以“先失败结构测试、再有意更新摘要”的方式修复。

## 停止条件与继续优化的门槛

本版完成不等于宣称全仓库已经没有历史债务。剩余八十九个近线文件、一百二十一个长函数、二百三十八个高分支函数和两个循环仍由 v2204 基线公开记录；它们不能增长，也不能换路径。当前两处之所以优先，是因为排名、历史拆分方向、调用影响和 parity oracle 同时支持低风险收益。下一处重构仍应满足相同条件，而不是看到一个数字就连续拆文件。

本地的完整 suite、build、全部静态门、HTTP smoke 与浏览器证据已经成立，远端 Node Evidence 仍要等 v2206 页面壳修复后批量推送检查，因此这里只授予“本地验收完成”，不预判远端结果。若后续功能真实触碰某个基线热点，童子军规则要求在该功能版本内顺带让它达标；若没有强行为 oracle 或明确职责边界，则应先补证据而不是冒险大改。永久门已经把“不能再长坏”机械化，后续优化可以按业务触达和收益排序，不需要再制造无止境的治理版本。

## 一句话总结

v2205 用迁移前摘要和路径 oracle 锁住外部结果，再用一个共享请求头 registrar、同一模块中的两个职责函数、四个短主路由 helper 与一个场景 markup fragment，把两个临界大文件和一个超长函数从收缩基线中永久删除；完整回归还迫使草案从八十二个 route 文件重构回八十个，同时让三十四条路由、所有代表性响应以及完整 dashboard 字节保持不变。
