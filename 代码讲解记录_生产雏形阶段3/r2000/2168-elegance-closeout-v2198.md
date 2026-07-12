# v2198 代码讲解：让优雅治理在第五版有证据地停止

## Goal and non-goal / 目标与非目标

v2198 的目标是关闭一个有上限的工程治理程序，而不是再寻找一批可以改名的文件。E-track 从授权之初就规定最多五版：先建立机械 census，再处理安全名称热点和真实重复，最后记录终态并请求外部评审。现在 v2194 到 v2197 已经完成门、改名、跨 checkout parity 修复和共享归档证据引擎，v2198 必须回答三个问题：数字到底从哪里到哪里，剩余项为何没有继续改，谁有权宣布程序最终通过。

非目标决定本版不会制造“为了收口而收口”的代码。它不改 `src`，不增加测试期望，不改 route、profile、fixture、archive 或 baseline 上限，不新增报告 service，也不连接 Java/mini-kv。所谓 final census 不是把 4549 项旧债写成零，而是证明它们仍被只减不增的 baseline 看住，并把下一批最显眼候选的合同固定关系写清。完成本版后 Codex 停在 Claude review；没有第六个 E-track 版本，也不会因为 Node 先关闭就擅自开始跨项目 capstone。

## Entry Points / 入口与评审路径

人类入口是 `docs/plans/elegance-hotspot-program-node.md`，它记录五版里程碑和硬停止。v2198 的执行入口是 `docs/plans/v2198-elegance-closeout-roadmap.md`，其中包含 Step-0、最终 census、保留清单、需求-证据矩阵和 Claude review checklist。机器入口仍然是 `scripts/elegance-census.mjs` 与 `docs/plans/elegance-baseline.json`；closeout 没有另造第二套扫描器。

证据入口是 `d/2198/evidence/elegance-closeout-v2198-summary.json`。它保存起点、终点、变化量、最终 digest、五个版本和 CI run、保留类别、跨项目边界及最终验证状态。解释入口 `d/2198/解释/elegance-closeout-v2198.md` 面向不需要阅读实现的维护者。本篇 walkthrough 则解释数字背后的机理和停止理由，避免终局 summary 变成只有表格没有因果关系的账本。

评审者应先跑 census，再看保留项引用，最后核对每版远端 run。这个顺序很重要：先确认当前树与 baseline 相等，才能讨论为什么保留；若 census 已不 ready，任何总结都失去基础。外部 reviewer 不需要相信进度表自述，只需按 checklist 执行命令、查看精确源码路径和 GitHub run 终态。

## Profile Response Model / 响应与基线模型

`elegance-baseline.json` 的 `nameDebt` 同时保存 count、fileCount、exportCount 和 keyDigest。count 防止总量上升，两个分项说明债务发生在文件名还是导出标识符，digest 则防止“删一个旧违规、加一个新违规但数量不变”的替换逃逸。v2194 起点是 4592，其中 993 个文件名、3599 个导出；v2198 终点是 4549，其中 984 个文件名、3565 个导出，总计减少 43 项。

`structuralFamilies` 保存达到三次规则阈值的目录/后缀族。起终点都为 52 个受控 family，并不表示结构毫无变化：`src/services:verification` 从 100 降到 98，其他已跟踪 family 没有增长；v2197 新增的单个 `src/evidence:engine` 尚未达到三次阈值，不构成一个可复制 family。services 文件数在 v2197 第一次全量时曾到 1126，被 governance gate 拒绝；把纯文件引擎移到 evidence 边界后恢复 1125，测试上限没有修改。

最终 name-debt digest 是 `sha256:a31b133d878f10d1c819c47f25de3e8efa1ae51a44c9ee70bb7166918ed7441d`。评审不能只看 4549 这个整数，必须同时匹配 digest 和 family map。若未来安全迁移一个名字，baseline 应在行为验证后向下刷新；若新增一个长名，即使总量被另一次删除抵消，keyDigest 差异仍会让 ratchet 报告 changed debt 而不是 ready。

## Upstream Evidence And Config / 上游证据与并行边界

本版不消费新的 Java 或 mini-kv 文件。版本边界重新检查了 Java：v1862 的实现和 closeout CI 都成功，但 endgame census 仍是 direct root 187、movable 83、retained target 104。这是完成一个 extraction batch，不是整个 Java 计划 final close。因此共享规则中“Java final close 后先暂停 Node 并重跑 capstone”尚未触发，Node 可以完成自己的第五版文档收口，Java 继续并行。

mini-kv 没有新任务、文件或进程。Node 的最终 census 只读取本仓库 `src`，不会扫描 sibling repo。v2196/v2197 的历史 fallback 与 mixed/LF/CRLF parity 已经是前序版本证据，v2198 只引用对应 commit 和 run，不重新物化 sibling fixture，也不启动服务。这样 closeout 的输入是稳定的 Git 与 CI 事实，而不是另一轮跨项目运行。

没有环境变量能绕过 elegance baseline。census 接受 `--json` 只改变输出格式，不改变阈值；maxNameLength 固定为 40，familyThreshold 固定为 3。CI 中的 elegance step读取同一 baseline。外部评审若在不同 checkout 运行，名称 AST 结果不依赖历史 Markdown 换行，因此应得到同一 count、keyDigest 和 family map。

## Service flow / 五版如何形成闭环

v2194 先扫描而不改债务，把每个超长文件名和导出标识符转成稳定 key，并冻结 4592/52 的起点。`test/eleganceGrowthRatchet.test.ts` 与 CI step 让增长返回非零退出码。从这一刻开始，“名字太长”不再只是评审意见，而是能阻止提交的合同。v2195 再从 census 中筛选不被 route、fixture、waiver 或 catalog 固定的候选，完整迁移 artifact-intake 与 packet-stop 两个三文件族，减少六个文件名和二十四个导出。

v2195 的生产实现和本地完整测试通过，但远端 parity oracle 失败。四个响应长度不变、摘要变化，最终定位为 Git checkout 对历史归档换行的物化差异。v2196 没有覆盖期望或规范化生产摘要，而是从两个 JSON profile 的 digest/byteLength 信号形成 evidence fingerprint，让每种已双跑验证的输入选择自己的 v2194 完整响应基线，未知输入先抛错。这个失败被保留在 run `29180385904`，v2196 run `29182204688` 是修复证据，历史 tag 不移动。

v2197 在 parity 安全网下处理真正的三次复制。三个 loader 的路径清单、原始 SHA-256、byteLength、BOM、JSON 容错和嵌套读取进入 `archiveEvidenceEngine.ts`，业务 source/replay/checks/summary/renderer 留在各自服务。第三个 live-gate 文件族缩成内部概念名。三种 checkout 的六个完整响应全部保持旧版字节，最终 census 到 4549，run `29184382279` 绿。

v2198 不再经过“扫描后继续选候选”的循环，而是反向验证程序停止条件：数字已收紧，最坏复制已消除，下一批最长名字存在报告合同固定，五版预算已经用完。它更新中央进度、写最终 evidence 和 reviewer checklist，然后让同一套 CI 再跑一次最终树。闭环的最后一步是外部 Claude 给出 PASS 或具体 correction，而不是执行者在自己的总结里盖章。

## Retention decisions / 为什么剩余热点不能顺手再改

当前最长的七个文件名长度为 215 到 217。只看名称会觉得它们比 v2195 候选更应优先，但精确搜索显示，这些 `.ts` 文件名被 `...TypeModuleCatalogTextPackageEvidenceEntries.ts` 或 `...TypeModuleCatalogTextPackagePreflightEntries.ts` 作为字符串数据输出。它们不是单纯 import path；catalog 消费者可以在 JSON 或 Markdown 中看到这些名字。若直接 `git mv` 并更新字符串，报告字节会变化；若保留旧字符串，catalog 会撒谎；若增加兼容映射，名称债务和维护入口反而扩大。

所以这七项需要独立的 report-contract migration：先确定消费者是否允许新文件名、是否要版本化 profile、如何保留旧 archive、怎样做旧新输出差异评审。E-track 的授权是内部优雅治理和字节冻结，不包含合同升级。把它们列为“精确文件名固定”比写“风险较高暂不做”更严格，因为 reviewer 可以跳到具体行验证。

三个 renderer waiver 也不是普通遗留。`renderer-consolidation-waivers.json` 对每项保存 classification、reason、reviewerCheck 和 composedFunctions。AST census 要求文件只能导入标准化子 renderer，函数只能按声明顺序展开子结果，不能出现本地 Markdown 字面量、循环、map、heading 或 fallback。新增第四项、改变子函数或让旧 waiver 失效都会失败。把这三项再塞进 builder 只会增加一次函数跳转，不会删除格式行为，因此保留更优雅。

其余 4549 是历史存量，不逐项在 closeout 中发明理由。它们共同受 shrink-only baseline 管理，新代码没有继承其豁免。未来任务触碰某个旧文件时，童子军规则要求离开时达标；出现第三个相似实现时先建 engine；功能版本新增源码仍受 400 行上限。这让“程序停止”与“规则停止”分开：批量治理停止，但生成时购买优雅继续永久生效。

## Safety Boundary / 安全与权限边界

v2198 是文档和证据版本，没有运行时入口。它不改变 `executionAllowed`、approval、credential、network、write、deployment 或 rollback 行为。没有新增 HTTP route、report chain、feature flag 或环境变量。Node 不启动 sibling service，不解析 endpoint URL，不读取秘密，也不把 E-track 完成解释成生产授权。

版本也不修改测试期望来迎合数字。最终 baseline 与 v2197 相同，因为 v2198 没有 source 变更；若 census 不等于 4549/52/digest，closeout 应失败，而不是刷新 baseline。renderer waiver 数不能从 3 增加，services/route 上限不能提高，archive budget 不能为新文档无证据放宽。所有“final”措辞限定在 Codex 本地执行和提交状态，外部 PASS 字段保持 false/pending。

由于没有 UI、HTML 或视觉状态变化，不创建 `图片` 目录。截图无法证明 AST debt、digest 或 CI 终态；可复现命令和 JSON evidence 才是合适证据。最终 verify 若启动 smoke server，仍需记录 PID、使用独立端口、完整访问控制头，并在结束后停止；构建产生的 dist 也必须在提交前删除。

## Test Coverage / 最终验证与失败处理

focused 层首先运行 elegance census、governance growth ratchet、renderer census tests、walkthrough quality gate 和 v2197 六响应 parity。它们分别保护最终数字、services/routes 文件预算、三项 waiver 形状、中文讲解质量和行为字节。v2198 自身不添加产品测试；复用已有门比复制一组“closeout tests”更能证明长期机制仍有效。

完整层执行 typecheck、lint、security scan、archive retention、source-size、renderer、全量 Vitest、build 与受控 HTTP smoke。最终可审计全量运行使用 JSON reporter，返回 1131/1131 suites 与 1706/1706 tests 全部通过、失败为零；第一次运行虽然进程正常结束，但终端会话丢失而无法取回报告，因此没有被写成“通过”。typecheck 与 build 为零退出，lint 保持 0 error / 261 条既有预算 warning，security 为 8204 个文本文件、6/6 窄豁免和 18/18 配置检查，source-size 仍为零个超过 800 行的源码文件。

renderer census 为 242/245 标准化、三个 composition-only waiver、零个非豁免，最终文档树的 archive retention 为 7057 个文件、62.80 MiB / 80 MiB。受控 smoke 在 31198 端口以 probes=false、actions=false、accessGuard=false、auth=disabled 启动，health、metrics、runtime config 三个 JSON 表面均返回 200；自有 PID 26116 随后停止，端口、临时日志和 `dist` 全部清理。结果回填后又重跑两份 walkthrough quality 文件，8 项测试全部通过，当前讲解含 3262 个中文字符。远端 Node Evidence 再从干净 checkout 重复同一链。若只出现 timeout，按单文件、相关组、全量顺序分诊；若 assertion 失败，修实现或文档事实，不调宽期望；若 census 变化，先检查工作树是否混入新 source。v2198 只有所有本地门、commit、tag、push 和远端 CI 完成后才能提交外部 review。

评审 checklist 额外要求重跑最终 digest、核对七个精确 filename 引用、验证三个 AST waiver、确认 engine 只有三消费者，并检查 v2194-v2198 恰好五版。Claude 若发现 correction，修复必须明确归属：若只是 closeout 证据错误，可按评审指令处理；若要求新一轮源码治理，需要新的授权计划，不能偷偷称作 E-track 第六版。

## Failure lookup / 失败定位与责任归属

如果 `elegance:census` 报 name count 大于 4549，先看 `grownNameDebt`，它会列出新增 key；这通常意味着新文件或新导出超过 40 字符，应回到产生该名字的版本修复，不能提高 count。如果总数仍是 4549 但 digest 不同，应看 `changedNameDebt`：这表示旧违规被另一个新违规替换，数量没有增长也不能放行。若 family 报 grown 或 new，则按三次规则检查是否已经出现第三个相似实现，优先提取 engine，而不是给 family 加配额。

如果 walkthrough quality gate 失败，先区分中文字符下限、required shape、重复段落和 oversized section。字符不足说明工程解释缺少真实路径，应补充入口、模型、边界或故障定位；标题缺失要改成标准章节，不能修改扫描器的同义词表来迎合一篇文档；重复或单章过大则拆成可跳读的不同责任段。本版第一次 focused 正是因为只有 2647 个汉字且模型标题不合标准而被拦住，修复对象应当是这篇讲解本身。

如果 renderer census 失败，先看是非豁免实现、第四项 waiver、还是现有 composition-only 文件形状漂移。前三项 manifest 不是通行证：任何本地 Markdown、循环、映射或子函数顺序变化都会让 AST 检查失败。若 governance growth test 失败，则核对 services 1125 和 routes 80；v2197 已证明纯 evidence engine 应放在 evidence 边界，而不是调大 services 上限。

如果全量测试、build 或 HTTP smoke 失败，按具体门处理，不把 closeout 文档标成 complete。CI 红时保留失败 run，先复现其 step；只有干净 checkout 的同一提交转绿才能进入 Claude review。最后，若所有机械门都绿但 `externalClaudeReview` 仍为 pending，这不是故障，而是权限边界：执行者已经交付评审包，但最终 PASS 尚未由独立 reviewer 授予。

## Stop condition / 维护停止条件与下一步

v2198 tag 和 CI 变绿后，Codex 的动作是停止并报告“等待 Claude review”。不继续扫描更多候选，不把保留清单扩成新任务，也不开始 capstone。Java 当前仍可独立推进剩余 83 个 movable 文件；当 Java 真正 final close，Node 应按共享简报先运行 live capstone against final Java tag，再更新系统级评审证据。那是跨项目程序的边界，不属于本 E-track。

如果 Claude 给出 PASS，中央表可以标记 external review complete，优雅规则继续作为全仓库生成门存在。如果 Claude 给出 correction，应优先复现其命令和数字，不能以本篇总结反驳机械证据。这个停止设计让治理不演变成无穷版本：程序有明确终点，规则有永久生命，合同迁移有独立授权，三者互不冒充。

## One-sentence summary / 一句话总结

v2198 用最终 census、精确保留理由、五版证据链和外部评审清单证明 Node 优雅治理已经到达应当停止的位置：债务真实下降、规则继续收紧、合同没有偷改，而最终 PASS 留给独立 reviewer。
