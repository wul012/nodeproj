# v2202 代码讲解：把仓库首页从功能流水账改成可复现的工程展台

## 目标与非目标

v2202 解决的是仓库入口的信息失真，而不是给系统增加新能力。改版前的 `README.md` 超过五百行，开头仍把项目描述为两个本地练习系统的控制平面，随后连续罗列数百个历史 evidence、approval、archive 与 readiness 版本名。每一项单独看都没有明显错误，但人类读者无法在短时间内区分当前核心能力、历史治理产物和仍被禁止的生产动作。真正有区分度的工程事实，例如一千七百一十六项测试、覆盖率门槛、零超大源码、渲染器 census、只读四项目 capstone，反而淹没在功能目录中。

本版的目标是让访问 GitHub 首页的人在三十秒内回答四个问题：这个仓库做什么，它有哪些可量化强项，这些数字去哪里复核，它明确不能做什么。非目标包括新增 route、service、renderer、报告 schema、fixture、跨项目字段或运行时开关；也不重新定义成熟度，不开启 Stage 2，不把历史归档删除或搬家。README 是导航和证据入口，不是替代 `START_HERE.md`、最终证据表或源码目录的第二份百科全书。

## 入口与读者路径

公开入口仍然是仓库根目录的 `README.md`，GitHub 会在代码列表下方直接渲染它。维护者入口继续由 `START_HERE.md` 承担，生产边界的权威文本仍在 `docs/PRODUCTION_BOUNDARIES.md`，E1-E10 的机械证据仍在 `docs/plans/node-track-final-evidence.md`，跨项目最终 verdict 仍在 `docs/plans/production-excellence-final-acceptance.md`。本版没有把这些材料复制进 README，而是建立由首页通往权威文件的短路径。

阅读顺序经过刻意设计。第一屏先出现仓库名、CI 与三个静态徽章、四句英文定位、一段中文镜像和逐字固定的成熟度标签。继续向下才是强度表、架构图、快速验证、证据地图和边界。这个顺序把“是什么、凭什么、怎么验、不能做什么”放在历史细节之前。旧版完整 API 列表被移除，源码级入口改为 `src/routes/` 链接，因为会随路由演进的四百行清单不应该由首页人工同步。

## 展示信息模型

README 现在可以看成六层响应模型。第一层是 identity，回答 OrderOps Node 的领域和技术栈；第二层是 maturity，只允许使用测试契约中的授权标签；第三层是 highlights，把质量事实表达为结果、命令和证据三元组；第四层是 architecture，用一张图区分普通 Fastify 路径与 env-gated capstone；第五层是 reproduction，给出本地验证和 live 回归所需输入；第六层是 boundaries，明确列出默认关闭项和禁止动作。

这种模型避免了旧版把“存在一个历史报告”直接等同于“当前平台能力”。例如 highlights 不写“具备生产级覆盖率”，而是写覆盖率四维实际值和四维 floor；capstone 不写“完成四项目生产集成”，而是写 HTTP GET、CLI read、artifact file read，以及 `read_only=true`、`execution_allowed=false`。读者看到的是可验证状态和权限边界，而不是营销式形容词。

## 数字与证据来源

所有展示数字在动笔前都完成了来源对账。测试徽章的一千七百一十六来自 `d/2201/evidence/readiness-markdown-engine-v2201-summary.json` 中的完整 Vitest 结果；它不是从本次尚未提交的终端输出临时抄来。覆盖率徽章显示百分之九十五点九，是 `d/2190/evidence/node-track-closeout-v2190-summary.json` 中 statements 百分之九十五点九二的一位小数展示，表格继续保留 statements、branches、functions、lines 四个精确值及 94/86/97/94 floor，防止一个徽章掩盖分支覆盖率。

lint 的零错误、二百六十一 warning 和原始二百六十三 ceiling 来自 `d/2189/evidence/n5-source-size-closure-v2189-summary.json`。renderer 的 245/242/3/0 由 `scripts/renderer-census.mjs` 复算，三个例外必须同时通过 `docs/plans/renderer-consolidation-waivers.json` 的 AST composition-only 规则。零个超过八百行的源码由 `scripts/source-size-census.mjs` 与空的 `docs/plans/source-size-remediation-baseline.json` 共同约束。四千五百三十七条命名债来自 `docs/plans/elegance-baseline.json`，其意义是只减不增，不是把存量长名字包装成优秀指标。

## 徽章设计与诚实口径

首行动态 Node Evidence 徽章直接指向 `.github/workflows/node-evidence.yml` 的 GitHub Actions 页面，因此绿色状态可继续下钻到具体 run。三个 shields.io 徽章分别表达 tests、coverage 和 source files over 800 lines；每个徽章本身又链接到仓库内的已提交来源。静态徽章不会自动证明当下工作树，所以它们旁边必须保留 evidence 链接，版本收口也仍要等待动态 CI 绿色。

覆盖率采用一位小数是首页可读性的折中，但 README 紧接着说明它由百分之九十五点九二四舍五入而来。这样既满足简报指定的百分之九十五点九展示，又不把舍入值伪装成原始测量。测试数字同样注明来自 v2201 已提交全量结果；v2202 不新增测试，所以最终本地全量门应继续得到相同总数。若依赖更新导致测试发现数量变化，正确做法是重新生成证据并审查原因，而不是只改徽章让页面看起来一致。

## 普通服务流程

架构图左侧描述普通 HTTP 路径：`src/app.ts` 创建 Fastify application，`src/routes/` 注册公开表面，治理 service 组装领域事实，共享 renderer 与 engine 把它们稳定输出为 JSON 或 Markdown。图中把 route 文本压缩进 Fastify app 与 governance services 之间的关系，目的是让首页说明职责而不是重画完整调用图。更精确的路由归属仍应从 `src/routes/statusRouteGroups.ts`、`src/routes/statusRoutes.ts` 和具体 route 文件进入。

“Stable JSON + Markdown”不是说所有报告永远不变，而是说明受保护的迁移必须保持既有字节，任何合同升级要显式版本化。v2194-v2201 的 renderer、archive、promotion 和 readiness engine 工作提供了这一点的直接背景。README 只展示这个共同工程性质，不列出两百四十五个 renderer 的名字；详情交给 census、waiver manifest 和代码图谱。

## 跨项目上游证据与配置

架构图右侧是与普通服务隔离的 capstone 流程。唯一命令仍为 `npm run readiness:cross`，实际入口是 `src/integration/readinessCrossCli.ts`。当 `INTEGRATION_LIVE` 不是一时，Java、mini-kv 与 aiproj 检查明确 skipped，不会把未运行伪装成 pass。live 模式要求 `JAVA_CAPSTONE_JAR`、`JAVA_CAPSTONE_COMMIT`、`MINIKV_CLI_PATH`、`MINIKV_CAPSTONE_COMMIT`、`AIPROJ_ROOT` 和 `AIPROJ_CAPSTONE_COMMIT`，缺少关键输入会失败闭合。

Java lane 由 Node 启动固定 jar，只读取 health 和 evidence GET，再关闭自己拥有的进程；mini-kv lane 新启一个 CLI，只执行已审核的只读命令并验证 fresh JSON；aiproj lane 只读 registry 选中的已提交 artifact，不启动训练、服务或 promotion。三路结果聚合为一个 C1-C4 JSON/Markdown 报告，并把只读与禁止执行字段放在顶层。v2202 只解释和链接 v2192 已接受证据，不重新启动 sibling 项目，因为 README 文档变更没有触碰 capstone contract surface。

## Mermaid 图的抽象边界

第一版预览暴露了一个实质问题：较长的 “Shared renderers and engines” 与 “Byte-stable JSON and Markdown evidence” 在 GitHub 宽度下被 Mermaid 节点裁字。语法解析成功并不等于可读性通过，因此最终节点缩短为 “Shared render engines” 与 “Stable JSON + Markdown”。两个 subgraph 分别固定为自上而下的职责链，再用一条标注 “separate live gate” 的虚线把普通 evidence 与显式 capstone 命令联系起来。

虚线不是运行时调用边。它表达的是普通报告体系和 live 回归都属于 Node 的治理责任，但后者必须经过独立环境门。三条上游边明确写成 HTTP GET only、fresh CLI read、artifact file read，避免“Node 连接另外三个项目”被误读为统一写入总线。最终节点直接展示两个布尔边界，读者无需回到正文才知道这条跨项目链不具备执行权限。

## 快速验证流程

Quickstart 先给 `npm ci`、`npm run typecheck` 和 `npx vitest run`，让第一次访问仓库的人能从锁文件安装并执行最核心门。随后单独给出 dashboard 的安全默认配置：`UPSTREAM_PROBES_ENABLED` 和 `UPSTREAM_ACTIONS_ENABLED` 都保持 false，再运行 `npm run dev`。这两行保留了 `test/productionExcellenceDocs.test.ts` 固定的 PowerShell 形式，移动位置但不重写字节。

四个 census 命令集中在一个代码块：archive retention 保护归档预算，elegance 保护命名与 family 债务，renderer 保护标准化及 waiver，source size 保护八百行上限。它们不是建议性诊断，每一个都应在超出已提交预算时非零退出。live capstone 放在后一个独立小节，并明确要求先构建上游产物、再固定三个 commit；这样普通贡献者不会把一次本地 typecheck 误认为需要启动四项目。

## 固定短语与安全边界

`test/productionMaturityContract.ts` 定义的成熟度字符串必须逐字保留。README 继续包含 `C1-C4`、`program-end PASS` 和 “not authorized for production execution”，从而满足 `test/productionExcellenceDocs.test.ts` 对公开入口诚实性的机械约束。本版没有改测试期望来适配新文案，而是把原句整体移动到信息层级更高的位置。

Boundaries 段落进一步把授权范围拆成五项：probe 默认关闭，action 默认关闭，capstone 仅允许三类只读输入，默认 CI 不启动 sibling runtime，Stage 2 仍等待 Java 最终评审。这里刻意没有写“只要设置环境变量就可以生产执行”；环境变量是进入受审回归窗口的技术条件，不是权限授予。README 也不宣称 Node 是审批权威，现有 approval artifacts 仍属于 rehearsal evidence。

## 证据地图与链接完整性

Evidence Map 按读者问题组织，不按文件夹组织。想知道单仓质量的人进入 E1-E10 final evidence；想知道谁接受 capstone 的人进入 PROGRAM-END VERDICT；想看真实输出的人直接打开 v2192 Markdown 或 JSON；想审 waiver 的人进入 renderer 和 security manifest；想知道禁止项的人进入 production boundaries。相同文件不会在首页不同段落反复解释，避免证据版本漂移。

实现后用 PowerShell 从 `README.md` 提取所有相对 Markdown 链接，剥离 anchor，再逐一执行 `Test-Path`。环境样例、六份版本证据、四份 baseline/waiver、最终计划、边界文档、源码目录和 `START_HERE.md` 全部存在。PROGRAM-END 使用文件内 anchor 直达 verdict；即使读者只打开文件，标题也仍位于清晰的最终收口区域。链接存在检查与浏览器渲染检查互补：前者防拼写错误，后者防徽章、表格或图形不可读。

## 被拒绝的替代方案

第一条被拒绝路线是保留旧 Features 与 API 全量清单，只在顶部加几个徽章。它不会解决五百行入口的扫描成本，也会让历史治理链继续冒充当前产品表面。第二条是把 README 写成营销 landing page，只说“production-ready”“enterprise governance”等无法证明的词；这直接违背成熟度合同和证据先于结论规则。第三条是从本次终端即时结果生成所有徽章而不链接 committed report，这会让展示依赖一个不可复现会话。

第四条是为 README 新增自动生成器、模板 service 或第二份 metrics JSON。现有报告和 census 已经足够，新增链条只会扩大治理表面。第五条是把 live capstone 放入默认 Quickstart，让初次运行者自动启动 sibling 进程；这会混淆普通本地验证与显式 integration window。最终方案只修改文档与归档，用链接复用已有权威来源，并让高风险命令单独出现。

## 浏览器与页面验证

为接近 GitHub 实际显示，本版没有用普通文本预览器。临时流程调用 GitHub Markdown API，以 `gfm` 模式和 `wul012/nodeproj` context 渲染当前 `README.md`，再在本地 HTML 外壳中加载 GitHub Markdown CSS。GitHub API 对 Mermaid 返回 enrichment payload，本地预览器先解码该 payload，再交给 Mermaid 11 生成 SVG。第一次 PowerShell 捕获把 HTML 行数组插值成空格，导致代码块失去换行；预览流程改用 `Out-String` 保留原始换行后才生成最终截图。

Playwright MCP 在 1440x1000 视口检查四个徽章自然宽度、零失败图片、一个成功 Mermaid SVG、零语法错误和页面级零横向溢出。随后在 390x844 视口复核文章宽度没有超过 viewport，图形 SVG 会缩到内容宽度，长表格和代码块由各自容器处理。最终桌面全页截图写入 `d/2202/图片/readme-exhibition-v2202.png`；临时 HTML、preview server 和手机检查截图不进入归档。

## 测试覆盖与最终门

编辑前先运行 `test/productionExcellenceDocs.test.ts`，得到一文件七测试通过，用来证明旧 README 的固定契约基线本来是绿色的。重写后立即再次运行同一测试，仍为七项通过，证明成熟度、C1-C4、program-end PASS、生产禁止语句和两条 PowerShell 默认配置没有丢失。`test/productionMaturityContract.ts` 作为常量模块由 typecheck 和该测试的 import 覆盖，不把无 test suite 的常量文件伪装成独立 Vitest suite。

最终验证在本讲解、CHANGELOG、计划账本和归档写完后执行。focused 文档与讲解组为三文件十五项通过；typecheck 和 build 通过；lint 为零错误、一百八十 warning，低于强制上限二百六十一；security 扫描八千二百二十五个文本文件，六个 signal 全部命中窄 waiver，十八项配置检查全过；archive、elegance、family、renderer 与 source-size 均为 ready。完整 Vitest 采用八个顺序 shard、每片最多两个 worker，合计一千一百四十一套件、一千七百一十六项测试全部通过，零失败、零 pending。这个调度避免重演高并发 Vitest 占用数 GB 内存，只改变测试调度，不改变断言、fixture 或通过标准。由于本版没有运行时、integration contract 或上游 fixture 变化，不触发 live capstone 回归。

## 失败定位

如果 focused docs 失败，先按缺失字符串定位，不要修改 `test/productionMaturityContract.ts` 或测试期望。成熟度失败说明标签发生了字节变化；PowerShell 配置失败通常是等号空格或引号被改；program-end 失败说明首页把已接受状态写回 pending。若相对链接检查失败，修正 README 路径，不能创建空文件来迎合错误链接。若徽章加载失败，区分 GitHub Actions workflow URL 与 shields URL，静态徽章失败不应被本地缓存掩盖。

若 Mermaid 失败，先用 GitHub GFM 输出中的原始 diagram data 复现；语法错误与文本裁切是两类问题。前者检查引号、subgraph 和 edge label，后者缩短展示名或调整方向，不能把图换成长段落逃避视觉门。若完整测试只有 timeout，应单跑报告中的失败文件，再按仓库超时规则分组验证；不能提高断言容忍度。若 archive census 超限，优先确认临时 preview 和 Playwright 输出是否清理，而不是放宽八十 MiB 或八千文件预算。

## 维护方式与停止条件

以后更新首页数字必须同时更新证据链接，并说明是精确值还是展示舍入。coverage 变化应来自正式 `npm run test:coverage` 报告；测试数量变化应来自完整 suite；renderer、source size 与 elegance 必须由对应 census 复算。若只有历史计划中的数字变化而机械 gate 未变，不应追逐每个版本在 README 制造噪声。首页保持结果与入口，版本级细节留在 evidence 与 walkthrough。

v2202 的停止条件是目标结构完整、链接全部存在、桌面与手机 GFM 渲染可读、所有本地门绿色、归档与中文讲解齐全、commit/tag/push 完成且 Node Evidence 绿色。完成后回到 maintenance-only，不自动启动 Stage 2，不因为 README 更漂亮就提高成熟度标签。GitHub social preview 仍需用户在仓库 Settings 中手工上传，这是站点元数据操作，不属于代码提交，也不阻塞本版工程收口。

## 一句话总结

v2202 把 OrderOps Node 的仓库首页从五百行历史功能目录改成一张可验证的工程展台：先讲清价值，再给数字、命令和证据，最后把只读边界与停止条件摆在任何能力想象之前。
