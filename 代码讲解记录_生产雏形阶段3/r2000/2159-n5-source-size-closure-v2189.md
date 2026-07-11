# Node v2189 代码讲解：N5 源文件体积治理收口

## Goal and non-goal / 目标与非目标

本版的目标不是继续增加治理报告，而是解决一个可以被机器复现的维护性阻塞：`src/` 中最后四个超过八百行的文件仍把多种职责压在同一模块内。v2187 开始时，旧计划估计只有五个超限文件，但新 census 实际找出十六个；工程上必须让现实数据覆盖旧估计，因此三版依次把数量从十六降到十、再降到四，最后在 v2189 归零。归零不能只靠一次人工统计，还要把 baseline 改为空列表和 `maxOversized: 0`，从而使以后任何八百零一行的新增文件直接触发测试失败。

非目标同样明确。本版不增加路由，不改变 JSON 或 Markdown 字段，不改 fixture，不扩展 renderer normalizer，不授予真实上游执行权限，也不碰 Java 与 mini-kv 仓库。拆分不是为了追求文件数量好看，而是让每个模块拥有可说明的职责边界，同时保留原入口、原字节和原注册顺序。若拆分后必须修改旧测试期望才能通过，说明行为发生漂移，该方案就应修复或撤回；如果只是把八百行搬到一个新的九百行文件，也不算完成。

## Entry points / 公开入口与兼容面

四个旧入口全部保留。浏览器仍由 `src/ui/dashboardClientScript.ts` 导出 `dashboardClientScript`，调用它的 `dashboard.ts` 不需要知道内部已经分成三段。状态路由仍由 `registerStatusRoutes(app, deps)` 对外注册，新增的内部函数只承接四条已经存在的 production connection dry-run approval 路由。人工沙箱连接演练仍从 `managedAuditManualSandboxConnectionRehearsalGuard.ts` 加载与渲染；三项目真实读执行包仍从 `threeProjectRealReadRuntimeSmokeExecutionPacket.ts` 导出 profile、loader、renderer 和 `RuntimeSmokeExecutionRecord` 类型。

这种兼容方式的关键是把“文件路径”看作公开合同的一部分。仓库里大量 route 与 test 通过既有 service 路径导入；若为了拆分而让所有消费者改路径，会把局部治理变成全仓迁移，也会掩盖真正的行为差异。因此原模块继续做 facade，新模块只承接内部所有权。输入仍是原来的 `FastifyInstance`、依赖集合、配置、客户端、历史证据路径与预检 profile，输出仍是相同的注册副作用、相同的报告对象和相同的 Markdown 文本。

## Dashboard artifact / 仪表盘字节工件

原 `dashboardClientScript.ts` 是一个 51041 字符的 `String.raw` 浏览器脚本，源文件达到 1080 行。这里不能按函数名字随意重写，因为它最终以内联 `<script>` 形式进入 HTML，空格、换行、转义和声明顺序都可能影响哈希、调试行号或浏览器执行。拆分先记录旧工件长度与 SHA-256，再按连续源码行切成 core、operations、actions 三个片段；三个新文件各 362 行，facade 只按固定顺序连接它们。

core 片段保存 DOM 查询、输出区管理、HTTP 请求包装和基础状态刷新；operations 片段保存意图、检查点、基线、晋级与派发相关交互；actions 片段保存更后段的审批、归档及按钮分派。这个边界依据运行职责和原始顺序，而不是平均切块后再人为命名。片段采用字符串行数组并通过 `join("\n")` 重建内容，后两段显式补回边界换行。`dashboardClientScriptParity.test.ts` 同时检查三段连接关系、51041 长度、首尾换行和固定 SHA-256，任何漏行、重复行、顺序交换或转义改变都会机械失败。

浏览器层又做了一次独立验证。构建后的服务在受控端口 4190 启动，Playwright MCP 访问真实根页面，在 1440×1000 视口中确认标题为 OrderOps、页面只有一个脚本、118 个按钮存在、文档没有横向溢出。截图显示 Node gateway 在线，而 Java 和 mini-kv 因探针关闭明确标为 disabled，符合本地只读检查预期。控制台唯一错误是浏览器自动请求不存在的 favicon，与脚本拆分无关；服务验证结束后按精确 PID 停止，没有影响其他 Node 进程。

## Route flow / 状态路由服务流程

`statusRoutes.ts` 的输入是 Fastify 实例与 `StatusRouteDeps`，输出不是一个普通对象，而是一组按顺序写入 Fastify 路由表的注册副作用。顺序可能影响参数路由、固定路径和插件钩子的匹配，所以本版没有把 helper 调用挪到文件末尾。四条 approval 语句从原位置整体迁移到已有的 `statusDeploymentRoutes.ts`，原位置换成 `registerStatusProductionConnectionApprovalRoutes(app, deps)`；调用前后的其他路由顺序保持不动。

四条路由分别处理列表、latest、按 approvalId 查询和创建。查询输入中的 `format` 与 `limit` schema、创建输入中的 decision、reviewer、reason、changeRequestDigest 约束全部保留；列表仍从 ledger snapshot 读取，latest 缺失仍返回 404，单项查询仍委托 ledger 的 get，创建仍传入 config、auditLog 与 auditStoreRuntime 并返回 201。迁移脚本之外又用 TypeScript printer 对 `git HEAD` 的四个旧表达式与新 helper 中的四个表达式做 AST 规范化比较，结果四项完全一致。这样证明的不只是测试样例恰好通过，而是 route path、泛型、schema 和 handler 语法树没有被改写。

该拆分还顺手消除了两个原本就没有被使用的导入：`OpsSnapshotService` 和 ledger 类本身。它们不是运行依赖，删除后 lint warning 从 263 降到 261。这里没有进行全仓 warning 大扫除，因为那会扩大变更面并混入不相关风险；本版只清理因阅读目标文件而能明确证明无效的局部项。路由文件由 896 行降到 795 行，承接函数的 deployment 文件为 219 行，且路由文件总数仍为 80。

## Evidence boundary / guard 的证据输入与输出

`managedAuditManualSandboxConnectionRehearsalGuard.ts` 原先同时承担业务判定、报告组装、冻结路径清单、历史文件定位、文件哈希、文本片段匹配和展示格式化。拆分后，service 继续负责加载 v247/v248 前置结果、组合 Node/Java/mini-kv 安全维护引用、计算 checks、blockers、warnings、recommendations 与最终 digest；`src/evidence/managedAuditManualSandboxConnectionRehearsalGuardEvidence.ts` 只负责证据事实的取得和表达。

证据模块的输入是一个逻辑文件路径或“路径加预期文本”。处理流程为：先由 `resolveHistoricalEvidencePath` 决定读取本地 sibling 还是冻结 fallback，再由 stat 得到存在性与字节数，读取真实字节计算 SHA-256；片段检查则读取 UTF-8 文本并判断目标内容是否出现。输出是 `RehearsalEvidenceFile` 或 `RehearsalSnippetMatch`，其中同时保留逻辑路径、解析路径、存在性、大小、摘要或匹配结果。读取失败会得到明确的 `exists: false` 或 `matched: false`，不会把缺失证据伪装成成功。

二十五个类型、常量和函数由 AST 按完整声明搬迁，并与提交前版本逐项比较；忽略为跨模块使用新增的 `export` 修饰符后，没有声明内容差异。这个验证尤其重要，因为常量中包含历史中文归档路径和跨项目绝对路径，手工重打容易产生编码或字符漂移。主文件由 813 行降到 730 行，新 evidence 模块为 122 行；历史解析器本身没有被修改，强制历史 fallback 的既有行为也没有被重新定义。

## Response model / runtime 记录模型与响应

`threeProjectRealReadRuntimeSmokeExecutionPacket.ts` 的核心职责是编排：读取 preflight，决定窗口是否允许探针，按目标调用 Node、Java 或 mini-kv 的只读接口，汇总记录，计算 checks 与 packetState，再渲染完整报告。原文件还内嵌了记录数据模型、passed/skipped/failed 三种构造器、错误分类、错误摘要和单条记录 Markdown 渲染，这些职责对编排而言是稳定的叶子逻辑，因此迁移到 `src/runtime/threeProjectRealReadRuntimeSmokeExecutionRecords.ts`。

新模块的输入有两类。正常或跳过路径输入 preflight 的单个 read target，以及 latency、statusCode、evidenceSummary 等观测值；失败路径再输入捕获到的 error。输出统一为 `RuntimeSmokeExecutionRecord`：目标身份、项目、协议、方法或命令、是否尝试、只读标记、延迟、状态码、失败分类与说明。错误分类先识别 timeout，再按目标项目区分 Java、mini-kv 与 Node 连接失败，未知情况退回 read-command-failed。这个模型只描述观测，不打开任何执行开关。

八个声明同样经过提交前后 AST 对比，没有内容差异。原 service 继续从原路径重新导出 `RuntimeSmokeExecutionRecord`，所以外部类型消费者不需要迁移。主文件从 813 行降到 686 行，新 runtime 模块为 138 行。完整 profile 的字段、摘要计数、blocker 语义、Markdown 标题和 endpoint 都留在原 service；这避免把“单条结果怎么表示”与“整场 smoke 是否可归档”重新耦合。

## Upstream evidence and config / 上游证据与配置

本版使用的 Java 与 mini-kv 内容都是 Node 已有的冻结历史证据和关闭窗口配置，不需要上游提交新版本。`UPSTREAM_PROBES_ENABLED=false` 与 `UPSTREAM_ACTIONS_ENABLED=false` 下，runtime packet 应给出 closed-window 语义而不是偷偷连接 sibling 服务。浏览器截图中两个上游卡片显示 disabled，HTTP smoke 的 runtime Markdown 仍返回 200，证明关闭窗口本身是可报告状态，不是服务启动失败。

源文件 census 的输入是项目根目录、`src/` 树和 `docs/plans/source-size-remediation-baseline.json`；输出包含扫描文件数、阈值、超限列表、baseline 错误、未知超限、增长债务和 stale 条目。最终输出为 1234 个文件、阈值 800、超限 0、remediation 0、ready 为 true。baseline 不再保留四个已完成项目，也没有加入永久 waiver。治理文件数检查仍得到 services 1125、routes 80，说明这次拆分通过 `contracts`、`evidence`、`runtime` 和既有 route 宿主表达所有权，没有抬高最敏感的服务链增长上限。

## Safety boundary / 安全边界与失败条件

结构优化不能被误读成生产能力升级。所有真实写入授权仍然关闭，Node 不自动启动 Java 或 mini-kv，不读取或保存真实托管审计凭据，不执行 schema migration，也不把 mini-kv 当成订单权威存储。四条 approval route 本来就存在，本版只是迁移注册位置；runtime record 的 `readOnly` 与 `mutatesState` 固定语义没有改变。Playwright 检查只访问 Node 自己的本地页面和只读接口，服务进程有明确 PID、端口和停止记录。

本版的失败条件可直接操作。dashboard 哈希变化即失败；四条 route AST 数量不是四或语法树不同即失败；guard 二十五个声明或 runtime 八个声明出现不一致即失败；任何 `src/` 文件超过八百行、baseline 出现未知或 stale 条目即失败；服务或路由计数超过 1125/80 即失败；旧 fixture 或测试期望被修改来迎合拆分即失败；全量测试、typecheck、build、lint 或文档门不绿也不能提交。外部评审未授予 PASS 前，Phase 3 不开始。

Java 与 mini-kv 在本阶段是 recommended parallel，因为 Node 只消费冻结证据，不要求新鲜上游版本，也不拥有它们下一步的预批准门。本会话没有对两个 sibling 仓库执行写入、构建、测试、启动或停止操作。这样的并行声明既避免无理由等待，也防止 Node 质量重构被误当成跨项目合同切换。

## Test coverage / 测试覆盖与验证顺序

验证遵循由窄到宽。第一层是类型检查和目标文件 ESLint，先发现导入、导出与循环依赖错误；第二层运行 dashboard parity、approval ledger/archive、rehearsal guard、runtime packet 五个测试文件，共十五个测试，覆盖四个拆分面的直接行为；第三层运行 source-size 与 governance ratchet，证明零超限和 1125/80 上限可机械失败。随后执行完整 lint、build、renderer census 和真实 HTTP smoke，分别验证静态质量、可发布构建、N1 不回退与页面/路由可达。

最终全量 Vitest 不使用一个高并发大进程，而是按固定八个 shard、每个最多两个 worker 执行。原因不是降低标准，而是该仓库完整套件在 Windows 上体量很大，单次无分片运行容易超过外层任务时限并占用数 GB 内存；确定性分片仍覆盖全部测试文件，汇总文件数和测试数后才能判定完成。代码讲解质量门在文档写完后运行，检查标题、目标、入口、响应模型、上游证据、服务流程、安全边界、测试覆盖、一句话总结、三千中文字符下限与重复灌水信号。

本讲解初稿写作时，聚焦测试、ratchet、typecheck、lint、build、renderer census、Playwright 和 HTTP smoke 已有机械结果；随后执行的八分片全量套件也已通过，共覆盖 546 个测试文件和 1662 个测试，八片 Vitest 时长合计 3251.70 秒。文档质量门通过 2 个文件和 8 个测试，并确认最终文本有 3283 个中文字符、10 个二级章节。这个顺序既满足“讲解先于最终 verify”，也避免提前写下尚未发生的通过结论。

验证过程出现过一次编排偏差，但不是产品失败。用户中断发生时前五片已有完整 PASS 日志，第六片只有启动头且进程被终止，因此恢复后只重跑第六至第八片。第一次第八片又被 PowerShell 的 `ErrorActionPreference=Stop` 提前终止：renderer census 的负向测试故意向 stderr 输出“超过更紧上限”，包装脚本却把预期 stderr 当成终止异常。随后使用完全相同的 shard、worker、reporter 和 timeout 参数直接运行第八片，68 个文件和 210 个测试全部通过，退出码为零。期间没有修改产品代码、测试期望、fixture、timeout 或 census 阈值。提交、tag、push 后仍要等待 Node Evidence，CI 红色不能被本地通过覆盖。

## One-sentence summary / 一句话总结

v2189 用保持入口、字节、AST、响应与安全边界不变的四次职责拆分，把 N5 的真实源文件债务从三版前的十六项彻底收敛为零，并用空 baseline 棘轮保证这个结果以后会自动守住，而不是依赖维护者记忆。
