# v2199 代码讲解：从“同后缀很多”走到可执行的重复治理

## Goal and non-goal / 目标与非目标

v2199 的目标不是立刻重写某个大 service，而是把 Round 2 最容易出错的一步先机械化：如何从 52 个受控 structural family 中找出真正值得做 engine 的两个对象。旧 census 只能回答某个后缀出现多少次，例如 `renderer` 有 245 个、`types` 有 221 个、`verification` 有 98 个；它不能回答这些文件是否仍然拥有重复行为。若直接按数量排序，已经完成 builder 迁移的 renderer 会再次被选中，执行者会在 242 个数据 wrapper 外再套一层 wrapper，代码跳转增加而格式逻辑一行没少。这正是本轮计划禁止的“有整理外观、没有删除实质”。

非目标同样明确。本版不改变 `src` 运行时，不删除任何 family 成员，不刷新名称 baseline，不改 route、profile、fixture、测试期望或报告字节，也不启动 Java 和 mini-kv。它只建立一把可复现的尺子、审计 Top 5 的真实依赖边界，并把 v2200/v2201 的可删除入口和 parity 表面写清。若审计结果不足两个安全候选，本版本应直接关闭 Round 2；现在找到两个候选，因此继续，但版本上限仍是三版而不是任务配额。

## Entry Points / 入口与复核路径

执行入口是 `docs/plans/elegance-round2-program-node.md`，它规定 E2-N1 只做 triage，后续每版最多处理一个 family。人类审计入口是 `docs/plans/elegance-round2-triage.md`：先读评分定义，再看 Top 5，最后看入选与拒绝理由。机器入口是新增的 `scripts/family-logic-census.mjs`，一条 `npm run elegance:families -- --json` 会输出全部 52 个 family，而不是只把挑中的五项写死在报告里。

脚本没有复制 family 命名规则。它从 `scripts/elegance-census.mjs` 直接导入 `listTypeScriptFiles` 和 `structuralFamily`，所以 `SummaryV13.ts` 的末尾数字忽略规则、目录名归属和 CamelCase 分词都与 shrink-only baseline 完全一致。若未来 family 分类器改变，两个 census 会一起改变；不会发生普通 census 说 15 个 summary、triage 工具却只看见三个 `*Summary.ts` 的语义分叉。

机器结果同时归档在 `d/2199/evidence/family-triage-v2199-summary.json`。该摘要不重复保存所有源码，只固定起点、Top 5、两项选择、三项拒绝、跨项目边界和验证状态。评审者应重新运行命令，而不是相信 JSON 自述；JSON 的作用是让版本结论可以和未来树对比，而不是替代实时 census。

## Profile Response Model / 评分响应模型

`buildFamilyLogicCensus` 首先读取 `docs/plans/elegance-baseline.json` 的 `structuralFamilies` 键，只为已经受 ratchet 管理的 52 个 family 建记录。每条记录包含 `memberCount`、`formattingLogicLines`、`averageFormattingLines`、`score` 和十个最重成员。平均数保留两位，score 则直接使用去重后的总格式行；因为成员数乘平均每成员行数在未舍入时就等于总行数，直接保存总数可以避免四舍五入改变名次。

格式行由 TypeScript AST 而非简单 grep 识别。名称含 `render`、`format` 或 `markdown` 的函数体，其非空、非纯注释物理行进入集合；函数外若调用格式函数或出现 Markdown/换行字面量，对应行也进入集合。同一行无论命中多少 AST 节点只计一次。普通 `createChecks`、类型声明和纯数据常量不会仅因文件很大就得分；解析诊断会写入 `errors` 并使 `ready=false`，不会静默跳过坏文件。

单数 renderer 是唯一有更强专用证据的族。`renderer-census.mjs` 已经知道哪些文件调用标准 builder，也会用 AST 验证三个 waiver 只能转发参数并展开两个子 renderer。只有当“标准化数量 + 有效组合 waiver = 总数”且非豁免为零时，family-logic census 才把该族本地格式分归零。本树为 242 + 3 = 245、非豁免 0。若将来第四个 raw renderer 出现，归零条件失效，scanner 报错而不是继续掩盖回归。

## Upstream Evidence And Config / 上游与并行边界

Step-0 核对的 Node 父版本是 `v2198`，commit `aeb2d2d7`，Node Evidence run `29187389490` 全绿；Claude 对 v2194-v2198 已给出 PASS，并留下 portability recurrence note。这个外部 PASS 是 Round 2 可以启动的治理前提，但并不意味着 v2199 可以自行宣布新计划完成。Round 1 review note 与新简报属于本版，另一个 `production-excellence-java-final-push.md` 修改属于评审者为 Java 留下的独立说明，暂存时必须排除。

Java 最新提交仍是 v1862，另一个会话正在工作树中准备 v1863，说明 Java 未到 program-final；Node 不运行 capstone，也不修改或测试 Java。mini-kv 最新提交是 v1661，工作树只有它自己的 Round 2 计划，同样可并行。family scanner 只读取 Node 的 `src` 与 baseline，不读取 sibling workspace，不受它们换行、路径或未提交状态影响。

本版没有新增环境变量。CLI 的 `--project-root` 和 `--baseline` 只用于可测试的输入定位，`--json` 只切换输出形式。renderer 专用归零默认只在真实 repository root 调用现有 renderer census；fixture 单测必须显式传入 renderer 结果，防止测试临时目录错误读取主仓库状态。

## Service Flow / 从扫描到选择的完整流程

第一步是文件枚举。脚本递归读取 `src` 下 TypeScript 文件，得到 1246 个输入；每个文件通过同一 `structuralFamily` 归类，不在 baseline 的族不会参与本轮排名。第二步是 AST 扫描：格式函数体和散落格式信号写入行号集合，再汇总到 family。第三步是 renderer 专用纠偏。第四步按 score、member count、family 名稳定排序，确保不同机器输出顺序一致。

最终前五名是 `src/services:renderers` 1904、`verification` 1320、`summary` 1185、`contract` 946、`packet` 868。这个列表之后还必须经过 import 图与结构形状审计。数量和格式行只说明“值得看”，不能证明“可以删”。只要一个候选需要删除测试直接 import 的路径、修改公共 route，或者保留所有 member 仅增加 engine，它就不合格。

`renderers` 入选 v2200。八个成员里，`opsPromotionArchiveBaseRenderers.ts` 与 `opsPromotionArchiveHandoffRenderers.ts` 没有直接测试 import，只由稳定的 `opsPromotionArchiveRenderers.ts` 重导出。后续可以把通用段落/列表行为放入 `promotionMarkdownEngine.ts`，把既有公共函数定义收回稳定 barrel，再删除两个内部文件。这样不是把长导出搬家：旧内部定义和 barrel 重导出的重复 debt 合并为一处，family 8 降到 6，service 1125 降到 1124。

`summary` 入选 v2201。V6 到 V13 的 module path 被测试直接引用，所以必须保留；但它们的 header、record、category、message、endpoint、next-action 与 join 语法高度重复。V5 没有直接模块测试，测试走稳定 HTTP route，因此可由短名内部 case 替代旧文件。共享 `readinessMarkdownEngine.ts` 只拥有格式行为，各版本仍拥有字段和业务数据。预计 summary family 15 降到 14，并使用 v2200 释放的一个 service 配额，最终不突破 1125。

## Retention Decisions / 三个拒绝结论

`verification` 虽然有 98 个成员，却混合 upstream echo、archive、live smoke、deployment 和 receipt 语义。规范化 AST 找到五个完全同形文件时，进一步检查发现它们只是重导出 shim，没有可删除格式行为；另一个两文件同形簇及主要 archive 簇都被测试或模块路径直接钉住。唯一没有直接测试 import 的 `operationApprovalEvidenceVerification.ts` 又没有第二个内部伙伴。为它建 engine 只能保留 98 个文件，无法满足 family 与名称 baseline 同版收紧，因此拒绝。

`contract` 的 16 个成员分别承担 identity、JWKS、audit、rollback、connection 与 execution 边界；`packet` 的 15 个成员分别承担 approval、CI、runtime smoke、read window 与 receipt 工作流。两族都没有 internal-only member，也没有重复 AST 簇。它们共同拥有后缀只是词汇分类，不是可共享算法。强行抽象会制造一个接受几十种可选字段的万能函数，维护成本高于当前明确边界，所以拒绝是有价值的阴性结果。

## Metric Limits / 指标盲区与使用方式

formatting score 不是“重复代码百分比”，也不判断两个句子的业务含义是否相同。它会把一个很长但独特的 render 函数计为高分，也可能因为函数名称没有 render/format/markdown 而漏掉藏在普通 helper 中的字符串组装。因此 Top 5 只能决定人工审计顺序，不能单独授权重构。v2199 用 import 图、AST 形状和直接测试路径做第二层检查，正是为了防止数字越权。

脚本也不把总 LOC 当格式 LOC。`types` 有 221 个成员却得零分，因为接口字段很多并不等于格式算法重复；`catalog` 有 41 个成员同样得零分，因为数据表应当保持数据。反过来，plural `renderers` 只有八个文件却得到最高分，原因是六个文件仍直接拥有大段行顺序、标题、空行、fallback 和列表语法。这种结果更贴近“抽出 engine 后能删掉什么”，而不是“哪个目录看起来最壮观”。

未来源码变化可能让排名自然改变，所以 v2199 不把 Top 5 写成永久 ratchet。永久门仍是 family 数量和 name debt 只减不增；family-logic census 是可重复的规划仪器。每个后续版本要同时记录改前、改后 score，但不能因为 score 降低就接受 family 数不降、公共路径变化或字节变化。

## Version Contracts / v2200 与 v2201 的工程契约

v2200 的成功不是新增 `promotionMarkdownEngine.ts`，而是 engine 出现的同时两个内部 Renderers 文件消失，稳定 barrel 仍导出同一组函数，所有调用者得到逐字节相同的 Markdown。新增 engine 的标识符必须小于等于 40 字符，文件不得超过 800 行，service 总数必须从 1125 降到 1124。若只抽取几条 helper、旧文件仍保留大部分格式过程，该版本触发“增加间接层却未删除格式代码”的失败条件。

v2201 的成功也不是把九份数组复制进一个巨型对象。engine 只拥有标题、顶层字段、命名 section、category 展开、消息 fallback、endpoint、action 与换行终止规则；V6-V13 各自保留字段选择和业务类型。V5 的业务构造放进短名 internal case，route 继续暴露原 JSON/Markdown URL。summary family 必须从 15 降到 14，v2200 留出的 service 配额最多回到 1125，不能借治理名义放宽上限。

两版都在改动前生成固定时钟的 body digest，然后在当前 mixed、独立 LF、独立 CRLF 三种工作树重放。比对单位是完整 body 的 byteLength 与 SHA-256，不是“包含某标题”。任何差异先定位到换行、时间、路径、字段顺序或真实格式变化；不允许修改旧期望、统一 fixture 字节或移动历史 tag 来消除差异。

## Adversarial Review / 对抗性自审

评审者最强的质疑是：scanner 的正则名称规则会不会只是换一种方式挑出执行者本来就想做的两个族？回应分三层。第一，52 个输入来自既有 baseline，不能删掉不喜欢的 family；排序规则和 renderer 例外在看到最终排名前已写入 design note。第二，Top 5 全部公开，三个拒绝项附有可复查的 import/shape 阴性证据，并未只展示入选对象。第三，真正验收不依赖 score，而依赖后续版本的 family/name shrink、完整 body parity、现有测试和 CI；即使排名有粗糙之处，也不能让不合格重构通过。

另一条质疑是删除内部模块是否偷偷改变“公共 module path”。本仓库是 private package，没有发布 exports map；本计划仍采用更严格定义：被 route、稳定 barrel、测试直接 import 或文档宣称为入口的路径视为受保护。v2200 只删除由稳定 barrel 单独重导出的两个实现文件，v2201 只删除测试经 HTTP 访问、没有直接 module import 的 V5 实现。最终 staged diff 和 `rg` importer census 会再次证明不存在悬空消费者。

## Safety Boundary / 安全和兼容边界

v2199 不改变任何运行时行为，`executionAllowed`、上游读写、审批、凭据、部署和回滚状态全部不受影响。新的 scanner 位于 `scripts`，只读源码和 baseline；它不加载应用、不打开端口、不访问网络，也不写 baseline。CLI 默认模式输出文字，JSON 模式输出结构化报告，只有解析错误、renderer 覆盖不完整或 family 数不完整时返回非零。

后续两版的边界已经先写死：route 字符串、公共 stable barrel、V6-V13 模块路径、fixture 和历史 archive 不变；existing test expectation 不改。因为它们触碰 byte-frozen Markdown surface，每版 push 前都必须完成 mixed、LF、CRLF 三种物化的精确 body parity。仅在 Windows 当前树通过不够，CI 也不能再充当跨平台发现工具。

没有 UI、HTML 或视觉状态变化，因此 v2199 不建立空 `图片` 目录。截图不能证明 AST 行数、import 关系或 family shrink，合适证据是 CLI JSON、测试输出和 Git diff。构建产生的 `dist` 在收尾删除，任何测试 worker 或 smoke 进程只按本任务 PID 清理，绝不全局结束 Node。

## Test Coverage / 测试与证据

`test/familyLogicCensus.test.ts` 有三层。第一层给同一源码放置普通 create 函数和 render 函数，精确断言只计 render 的三行，保护“普通 builder 不等于格式逻辑”。第二层在临时项目中建立三个 Renderer 与三个 Report，并显式传入 2 个标准化 + 1 个组合 waiver 的 renderer census；结果必须让 report 排在前面、renderer 得分为零。第三层执行真实 CLI，要求 ready、排名条数等于 tracked 数，并确认 renderer adjustment 非豁免为零。

它与 `eleganceCensus.test.ts`、`rendererCensusScript.test.ts` 合跑后为 3 files / 15 tests 全绿。测试日志中三个 renderer regression 文本来自故意将阈值收紧到 2 的负向用例，进程最终为零退出，不是隐藏失败。typecheck 同时通过。文档质量第一次因只有 2461 个中文字符被正确拦截；补入指标盲区、后续版本契约和对抗性自审后，两份质量测试共 8 项通过，当前讲解为 3471 个中文字符。

最终可审计全量使用 6 workers 和 JSON reporter，结果为 1133/1133 suites、1709/1709 tests，失败为零。lint 保持 0 error / 261 条既有预算 warning，security 扫描 8211 个文本文件并通过 6/6 窄豁免和 18/18 配置检查；elegance、family、renderer、source-size、archive 与 build 均通过。v2199 不需要本地 HTTP smoke，因为 route/runtime 完全未改，但远端 CI 的既有 safe smoke 仍会从 clean checkout 执行。最终 reporter、Vitest worker 与 `dist` 已清理。

## Failure Lookup / 失败定位

若 family CLI 报 `ready=false`，先查看 `errors`。解析错误指向具体文件与位置；renderer 错误表示专用 gate 不再覆盖全部 245 个成员；排名条数少于 baseline 则说明 family 分类或文件枚举出现分叉。任何一种都应修 scanner 或真实回归，不能删掉 baseline family 来让数字一致。

若 Top 5 变化，先比较源码是否在同一提交、baseline 是否相同、renderer adjustment 是否 applied；不要手改文档名次。若 v2200/v2201 无法同时让 family count 和 name debt 下降，应回退该 migration，并把阴性原因交给外部评审，而不是保留一个只增加 engine 的“部分完成”版本。

## Stop Condition / 停止条件

v2199 提交后，下一版只能是已选的 promotion renderer family；v2201 只能是 readiness summary family。两版完成后无论 census 还剩多少高分 family，都在第三版硬停止并请求外部 review。若 Java 在任一版本边界达到 program-final，则先暂停 Node，按共享规则运行 capstone，再等待 program-close review。计划上限和跨项目检查点都高于“连续推进”的偏好。

## One-Sentence Summary / 一句话总结

v2199 用共享 family 分类器、AST 格式行、renderer 专用纠偏和 import/shape 复核，把 52 个同后缀集合压缩成两个真正能删除重复且保持字节不变的工程版本，而不是让文件数量替代架构判断。
