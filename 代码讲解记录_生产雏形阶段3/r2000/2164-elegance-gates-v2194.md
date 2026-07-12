# v2194 代码讲解：优雅债务 census 与只减门

## Family Design Note / 文件族设计（实现前冻结）

- 抽象名：`elegance census`，唯一入口负责扫描、对账与 CLI 展示。
- 行为层：TypeScript AST 识别导出；文件 stem 分类 family；ratchet 比较当前与 baseline。
- 数据层：baseline 保存稳定 name key 集合摘要、分类计数与达到 3 个成员的 family count。
- 只读边界：默认与 `--json` 不写文件；`--refresh-baseline` 是唯一显式写入动作。
- 失败边界：name debt 增长、未同步收缩、同数量替换及 family 漂移均返回非零。
- 扩展边界：后续规则先进入同一 census，不新增第二套 elegance 扫描器。
- 停止条件：E-N1 只建立门，不在本版重命名热点或改变产品输出。

这七行设计先于脚本、baseline 与测试落地，后续实现没有改变其中的数据、行为和
写入边界，因此它可以作为本版设计先行的可核对证据。

## 一、Goal / 目标

v2194 是 Node Elegance Hotspot Program 的 E-N1，它不直接偿还某一个长名称，而是先建立一把不会随着作者偏好移动的尺子。项目已经有 source-size、renderer、archive-retention 等 ratchet，能够证明文件不继续变大、renderer 不重新分叉、归档不无限增长；但“优雅”此前仍主要依靠评审印象。外部评审指出，代码库中存在大量名词串联式命名和按版本生成的相似文件。如果没有 census，后续所谓 top-5 很容易挑到顺手的文件，而不是最严重且可安全修改的热点。

本版把两个规则机械化。第一条是 40 字符命名预算：扫描 `src/**/*.ts` 的文件 stem 和 exported identifier，当前超限债务进入 baseline，新出现的 key 立即失败。第二条是三次规则：按“相对目录 + 文件名末端角色词”形成 structural family，达到三个成员的存量 family 进入 baseline；新 family 到第三个成员、既有 family 增长，都会使 census 非零退出。baseline 不是 waiver 清单，它只是对 2026-07-12 现实债务的精确快照，后续必须伴随真实代码收缩而缩小。

## 二、Non-goal / 非目标

E-N1 不重命名任何 `src` 文件或导出，不移动模块，不改 route string，不改 report Markdown/JSON 字节，也不碰 renderer waiver manifest。计划把改名放在 E-N2 以后，是因为“发现名字长”和“证明名字可改”是两件事：前者由 census 给出，后者还要检查 import graph、公开模块路径、fixture 文本、route catalog、waiver 和 byte parity。本版若边建门边改热点，就会失去可复现的起始基线。

本版也不宣称 family suffix 等于真正重复。`src/services:verification` 有一百个成员，只说明这些文件共享目录和末端角色，不证明它们能够直接合并。family count 是 STOP/调查信号，E-N2/E-N3 必须再用 CodeGraph、AST 与输出 parity 判断是否存在共享行为。反过来，两个完全同构但命名 suffix 不同的文件也可能不在同一 family；因此这把尺子刻意简单、稳定、可解释，而不是伪装成完美 clone detector。

## 三、入口、响应模型与输出

唯一日常入口是 `npm run elegance:census`，它调用 `node scripts/elegance-census.mjs`。默认输出给人看：总违规数、文件/导出拆分、family 总数与 tracked 数，再列出全局最严重的十个名称。`--json` 输出单行结构化报告，它才是后续选 top-N 和归档数字的 number of record。报告仍包含每一个超限项，只是按文件分组，避免同一路径随每个 export 重复数千次；另有 top-50 平铺列表，便于直接排序查看最长热点。

响应模型分为四层。scan 层返回当前源文件、name violation、family count 和 parser error；baseline 层返回获准存在的 name key-set digest、分类计数与 family ceiling；ratchet 层计算 name debt 的 grown、shrunk、same-count-changed 和 family 的 new/grown/shrunk/stale；CLI 层只负责选择人读或 JSON 展示并根据 `ready` 设置退出码。普通模式与 `--json` 都不写文件，只有显式 `--refresh-baseline` 会把当前 scan 转成 baseline。契约测试会在运行 JSON 命令前后比较 baseline 全部字节，确保只读承诺不是注释。

每一步的输入和输出如下：

| 步骤 | 输入 | 输出 |
|---|---|---|
| 文件扫描 | `src` 根目录 | 1245 个排序稳定的 TypeScript 路径 |
| 名称分析 | 文件 stem + TypeScript AST | 文件名和 exported identifier 的长度、种类、路径、稳定 key |
| family 分类 | 相对目录 + stem token | 134 个 family 及各自 file count |
| baseline 对账 | 当前 keys/counts + committed JSON | 新增、残留、增长、未同步收缩四类差异 |
| CLI | report + `--json` 选择 | 可读摘要或 814206 字符的单行 JSON，失败时退出 1 |

## 四、为什么导出必须用 TypeScript AST

导出不只写成 `export function name`。代码里还可能出现 `export const`、class、interface、type alias、enum、module、解构变量，以及 `export { local as publicName }` 或 `export * as namespaceName`。如果用正则扫描行首，alias re-export 会漏掉，多行声明和注释也可能误报。`collectExportNames` 因此读取 TypeScript `SourceFile` 的顶层 statement：export declaration 从 export clause 取真正暴露的名称，带 export modifier 的变量递归展开 binding pattern，其他具名声明按 AST kind 记录。

同一文件与名称在 Map 中去重，避免声明后又 re-export 自己时双计。报告保留 `declarationKind`，所以 reviewer 能区分 function、interface、variable 和 re-export；baseline key 则只使用 kind/file/name 三个稳定事实，不把 AST 节点位置或格式写进去。这样 prettier、换行或注释变化不会制造债务漂移，而真正的公开名称变化一定会使 key 改变。

负向 fixture 同时写入一个超长直接导出和一个超长 alias re-export。测试要求二者分别被识别为 `variable` 与 `re-export`，再加上超长文件 stem，共产生三个 new name violations。这条 oracle 直接防止未来维护者为了缩短脚本而退回只识别最常见导出语法的正则方案。

## 五、文件名长度与 structural family 如何定义

文件名预算计算 `.ts` 之前的 stem，不把目录和扩展名算入。原因是 stem 才是 import path 中承担概念命名的部分；`src/services/` 是所有权位置，`.ts` 是语言格式。如果把完整路径计长，深目录会把短而清楚的文件误判；如果连扩展名也算，规则会随 `.ts/.tsx` 改变。长度按 Unicode code point 计算，虽然当前名称主要是 ASCII，也避免未来代理对代理对或组合字符使用 UTF-16 code unit 得到意外结果。

family 分类先把 camelCase/PascalCase stem 切成词，选择最后一个非数字角色词，再与完整相对目录组合。例如 `crossProjectReadinessTypes.ts` 属于 `src/integration:types`，`someProfileRenderer.ts` 属于 `src/services:renderer`，`orderPlatformRoutes.ts` 属于 `src/routes:routes`。数字版本词不会成为角色。目录加入 key 后，不会把 integration 的 `types` 与 services 的 `types` 当成同一实现族。

当前共有 134 个 family，52 个达到 threshold=3 并进入 baseline。最大的十二个依次包括 renderer 245、types 221、verification 100、routes 73、artifacts 46、catalog 41、builder 36、intake 27、gate 21、review 21、evidence 20、report 19。这个排序揭示了后续调查价值，但不自动授权合并：三个 composition-only renderer 的精确文件名仍由 waiver manifest 固定，计划明确禁止触碰。

## 六、baseline 为什么按文件压缩而不是逐 key 铺开

第一次机械刷新得到 4592 个 name key。如果把每个 key 作为 pretty JSON 单独一行，baseline 连同脚本和测试会超过单版约 3000 changed-line 预算，而且同一条 150 字符路径会随着多个 export 重复。第一轮压缩曾按文件把 `$file` 与 exports 放在同一行，降到 1185 行，但仍有 444454 字节；既有 archive-retention 门正确拒绝它超过 131072 字节的 bounded-file ceiling。v2194 没有放宽 archive 预算，也没有把巨大 baseline 移到不受管的位置。

最终 baseline 使用 `nameDebt`：保存总数 4592、filename 993、export 3599，以及对全部排序 key 计算的 `sha256:fa92ba837b8ccabe533295b64654a83bc51406ad6b3c5251eb8f6190a7fdf675`。完整路径和名称仍无损保存在每次 `--json` report 中，baseline 只承担“当前精确集合是否变化”的 ratchet 责任。最终文件为 65 行、1921 字节，文件 SHA-256 是 `375010123d263b97501d44be60756b58e51cdadf8e7e418d50b74a41063502cf`。family count 必须是至少 3 的整数；schemaVersion、maxNameLength=40、familyThreshold=3 或 nameDebt 分类和不一致，都会成为 baseline error。

JSON report 也经历了同样的自我约束。最初即使按文件分组，pretty 输出仍有 28587 行、1058638 字符，刚好超过 Node `spawnSync` 默认 1 MiB buffer，测试得到 status=null。最终 `--json` 改成标准单行 JSON，完整数据为 814206 字符，默认工具可直接读取。这里没有把测试 buffer 抬高来掩盖接口臃肿，而是减少传输表示的重复与空白。

## 七、ratchet 真值表

名称 baseline 使用 count 与 key-set digest 精确对账。当前 count 大于 baseline 是 `grownNameDebt`；小于是 `shrunkNameDebt`，代表好债务已经消除但 baseline 尚未同步；count 相同而 digest 不同是 `changedNameDebt`，能抓住“删一个旧违规、加一个新违规”的等量替换。三者都失败，所以 E-N2 改名后必须在同一提交刷新 baseline，不能让陈旧额度留给未来名字复用，也不能用新长名替换旧长名维持表面计数。

family baseline 有四种失败。当前达到三成员但 baseline 不认识，是 `newFamilies`；当前 count 大于 ceiling，是 `grownFamilies`；当前仍达到三成员但小于旧 ceiling，是 `shrunkFamilies`；当前已经低于三成员或消失，是 `staleFamilies`。后两种看似是好事，仍暂时失败，因为 baseline 必须在同一版本记录真实收缩，ratchet 才不会留下一块可重新长回去的空间。

测试分别构造第三个 `Service` 文件、从三个增长到四个、从四个缩到三个但不更新 baseline、name debt 缩小未同步，以及同数量 key 被替换。它们都不接触真实 `src`，使用系统临时目录并在 finally 中删除。最后一条 fixture 直接执行 CLI，确认违规不是只在返回对象里写 `ready=false`，而是操作系统进程状态确实为 1，CI 才能阻断。

## 八、初始债务合同与后续选择

v2194 初始 census 扫描 1245 个源文件，得到 4592 个超限名称，其中 993 个是文件 stem、3599 个是 exported identifier。最长两个文件 stem 都是 217 字符；最长 export 是一个 175 字符的 blocked-reasons builder。数字很大，但它是多年版本式生成的存量，不应靠一次大爆炸重命名。E-N2 只从 top 列表挑五个名称，且必须证明没有 route、waiver、fixture 或公开模块路径钉住。

baseline 的作用正是在小批次中提供可见收益：安全改掉一个同时超长的文件和一个导出，name count 至少下降两个；re-export 入口若同步缩短，还会额外下降。每个 E-N2/E-N3 版本结束时，报告的新旧数字和 baseline diff 会展示真实收缩。如果某个名字外部固定，版本说明必须写可复核理由，但不能通过往 baseline 新加另一个名字补偿。

family 方向则先排除已完成 renderer consolidation 的 245 个 renderer，再调查 types、verification、artifacts、catalog 等族。suffix count 只是入口；真正的 duplication remediation 要证明至少第三个成员共享行为，把变化部分变成数据，并用既有 byte parity 固定输出。若调查后没有满足条件的 family，E-N4 可以记录“无可安全合并项”及证据，而不是为了完成指标硬造 engine。

## 九、安全边界、验证与清理

本版新增文件只在 `scripts/`、`test/`、`docs/plans/`、walkthrough 和版本归档中。脚本读取 `src`，正常命令不写 `src`、fixture 或兄弟仓库；refresh 只写调用者明确指定的 baseline 路径。Node workflow 在 archive gate 后、coverage 前运行 `npm run elegance:census`，且 workflow paths 显式包含 baseline，因此只有 baseline 文档变化的 closeout 版本也会触发 CI。

Java 在 Step-0 时已经提交 v1857，活跃工作树正在做 v1858；mini-kv 停在 v1658 并有自己的 elegance 计划。Node 没有 stage、revert、build 或执行这些仓库。若 Java 在本版结束前完成 final review，计划要求先到 v2194 版本边界，再暂停 E-track 执行 live capstone，不允许把 program-close 混进 elegance commit。

最终验证顺序是：focused elegance tests、typecheck、中文 walkthrough quality gate、完整 Vitest 分片、build、lint、security、renderer/source-size/archive/elegance census，最后 commit/tag/push/CI。没有 UI 或 runtime 页面变化，因此截图不会增加证明强度；本版不创建图片目录。构建后的 `dist` 和本次测试进程在收口前清理。

## 十、对抗性自审

评审者最强的质疑是：“baseline 与测试都能在同一提交修改，新增债务的人也可以顺手刷新 baseline，所谓机械门是否只是仪式？”回答分两层。机械层无法判断提交者意图，但它确保任何新增都会在 baseline diff 中留下明确 file/export key 或 family count，不能像以前那样静默进入；baseline 的 stale/growth 检查也防止额度自然漂移。治理层由 AGENTS 的 ratchet-only 规则和外部复现评审约束：E-N2 每次刷新必须展示 count 下降，增加或替换 key 没有 reviewer-checkable 理由就是失败。

第二个质疑是 family 算法会不会把不同职责误判成同族。答案是它只作为增长门和调查信号，不自动重构。存量 family 被 baseline 接纳，新文件想成为第三个成员时必须先写 design note、说明共享 engine 或解释为何分类不合适。若分类确有系统性误差，应在单独治理版本修改算法并重新审查全量 diff，不能在功能版本里临时绕开。

还有一个必须披露的范围边界：E-N1 简报要求机械扫描 `src` 的 identifier-bearing filename 与 exported identifier，所以当前 baseline 没有把函数内部的局部变量、参数和私有成员全部纳入。这个选择优先锁住跨文件引用和公开契约成本最高的名称，同时避免第一版 baseline 因每个临时变量膨胀到难以审阅。它不解除 AGENTS 对新增和被改动代码的 40 字符作者规则；v2194 新增脚本与测试的实际标识符仍逐项控制在预算内。若以后要机械覆盖内部标识符，必须在同一个 census 中新增 AST scope、先记录独立 baseline 与误报定义，再通过治理版本启用，不能另建扫描器或把扩展伪装成当前已经完成。

## 十一、一句话总结

v2194 用 AST、稳定 family 分类和精确只减 baseline，把“不要再写更长、更重复的代码”从评审口号变成会使本地与 CI 失败的仓库契约，同时完整保留存量债务，供后续五项一批地安全偿还。
