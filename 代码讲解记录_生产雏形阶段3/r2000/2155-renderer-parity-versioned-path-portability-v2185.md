# v2185：从一次 Linux 长度漂移建立可复现的跨平台路径门

## Goal and Non-goal / 目标与非目标

v2184 完成 N1 的机械收口后，远端 `Node Evidence` 在 coverage 测试中只出现一个失败：`candidateGateUpstreamHardeningReview` 经测试归一化后的长度，本地冻结值是 6152，Linux Runner 实际得到 6172。失败发生在长度断言，尚未走到 sha256 断言；同一流水线的 typecheck、lint 已通过，另外 542 个测试文件和 1653 项测试也全部通过。这个形状说明问题不是 renderer 大面积回归，而是某个固定长度的机器相关字段仍进入了指纹。

本版目标是把该差异定位到具体行，扩展已有的测试归一化边界，并用 Windows 与独立 LF checkout 证明两端得到逐字相同结果。非目标包括修改业务 renderer、loader、route、schema、fixture 或 sibling evidence，也不通过直接接受 Linux 的 6172 来掩盖平台差异。产品 Markdown 必须保持原样；只有用于跨机器比较的测试表示可以把仓库根替换为语义占位符。N1 的外部评审状态也不因 CI 修复自动改变，N5 仍需等待 review。

长度断言排在哈希之前，对诊断有实际帮助。若长度相同而哈希不同，通常意味着固定宽度的摘要、布尔值或内容字符漂移；本次先出现二十字符差，优先怀疑路径根、换行数量或可变数字。修复过程中保留这个断言顺序，没有把长度检查删除后只看哈希。哈希适合证明最终一致，长度更适合快速缩小故障类别，两者组合比单一快照更透明。

## Entry Points / 入口

问题入口是 GitHub Actions 运行 29071738931 的 `npm run test:coverage`。测试文件 `rendererMigrationV2183Parity.test.ts` 会加载强制历史 fixture，生成十一份迁移后的报告，再把每份报告传给 `normalizeRendererMigrationMarkdown()`。归一化之后才检查长度、sha256、H1/H2/H3 数量和末尾换行。因此失败的 6172 不是公开接口返回长度的直接契约，而是已经去除时间戳、部分路径和动态摘要后的测试指纹。

修复入口仍放在 `rendererMigrationParityUtils.ts`，因为差异属于所有 renderer migration 共用的机器环境噪声，而不是候选门报告自己的业务语义。新测试入口 `rendererMigrationParityUtils.test.ts` 不加载大型业务图，直接给 normalizer 输入 Windows 与 Linux 形式的同一条路径；这种小测试能在几毫秒内指出规则是否对称。原有 v2183 parity 则保留为集成入口，证明真实报告经过新规则后仍满足标题、章节和换行约束。

coverage 模式是另一个必须保留的入口。远端调用的不是普通 `vitest run`，而是 `vitest run --coverage`；V8 插桩本身不应改变 renderer 字符串，但它会在 Linux checkout 中执行完整加载路径，因此能暴露本地 Windows 未见的问题。聚焦复现只运行两个测试文件时，全仓覆盖率当然低于正式阈值，所以第二条命令仅在命令行把四项阈值设为零，目的是确认插桩模式下断言通过。`vitest.config.ts` 的 93/85/96/93 正式门没有修改，replacement CI 仍运行全仓严格阈值。

## Response Model / 响应模型

这里需要区分三层“输出”。第一层是原始 renderer Markdown，它仍包含真实的 `D:\nodeproj\...` 或 `/home/runner/work/...` resolved path，用于现场证据可追踪性，本版不改。第二层是 normalizer 返回的测试字符串，它把时间、仓库根、动态字节数和环境派生摘要替换成固定 token，目的是让相同业务事实跨机器具有同一个指纹。第三层是 parity case 保存的 `{length, sha256, h1Count, h2Count, h3Count, trailingNewline}`，它冻结第二层而非第一层。

新规则把 `- Java v151 resolved path: <absolute>` 和 `- mini-kv v143 resolved path: <absolute>` 的值交给既有 `normalizePathValue()`。只要值中出现 `/fixtures/`，仓库根就折叠成 `<repo>`，后续 sibling workspace 相对路径完整保留。这样既不会丢失“这是 Java 151 还是 mini-kv 143”的标签，也不会丢失 fixture 的具体层级；被移除的只有无法表达业务差异的 checkout 位置。候选报告的新规范化指纹是长度 6114、sha256 `96457d87...3ec6`，Windows 与 LF checkout 完全一致。

可比较字符串必须满足三个不变量：相同 fixture 相对路径在任何仓库根下相等，不同 sibling 项目或版本标签仍可区分，非路径业务文本逐字保留。`<repo>` 只替代 `/fixtures/` 之前的前缀，不会把后半段缩成泛化名称；因此 Java 151 与 Java 152 仍有不同路径，真正的证据选择变化仍会改变指纹。专用负例则保证普通 evidence status 不因同时含有 `Java v151` 被误处理。

## Upstream Evidence / 上游证据

根因证据由三组数字和一次逐行比较组成。主工作树得到 6152，GitHub Runner 得到 6172；仅凭这两个数字可以推测存在两条各差十字符的路径，却无法排除换行、文件摘要或 fixture 内容差异。为此本地建立了一个 detached worktree，固定在 v2184 提交 `b2b1bc05`，并通过 `core.autocrlf=false` 确认源文件只有 LF。该 worktree 使用同一套 node_modules，但从自己的 fixture 树加载证据，修复前得到 6180。

随后把主工作树和 LF worktree 的规范化 Markdown 以 base64 原样带回同一比较进程，按行执行区分大小写的差异检查。结果只有第 40 与 44 行不同：`Java v151 resolved path` 和 `Java v152 resolved path`。decision digest、review digest、证据状态、章节数量和其他路径全部相同。LF 临时目录名比主目录每条长十四字符，所以总差二十八；GitHub 根目录比主目录每条长十字符，所以总差二十。两组长度差与相同的两行完全吻合，根因由猜测变成可复现实证。

使用 base64 不是装饰步骤。若直接让 PowerShell 捕获多行输出再重新拼接，它可能把 LF 转成 CRLF，从而给比较过程引入新的换行差异。渲染进程先按 UTF-8 把完整 Markdown 编码为单行 base64，比较进程再解码，能够保持原始字节和换行。worktree 还检查了目标 TypeScript 文件的 CR 字节数为零、LF 数为 458，证明所谓“LF 环境”并非只改了目录名。

本版不需要 Java 或 mini-kv 产生新证据。它们的 fixture 内容在两份 checkout 中来自同一 Git blob，差异仅是 Node 测试进程报告的 resolved path。Java 与 mini-kv 因而可继续各自工作，Node 既不启动它们，也不把本次 CI 修复变成跨项目批准门。

## Service Flow / 服务流向

归一化控制流从一串有顺序的替换规则开始。时间戳先固定，JSON path、`resolved=`、配置路径和普通 evidence/resolved path 随后进入 `normalizePathValue()`；文件大小与摘要等动态字段再被替换。旧规则对 `- Resolved path:` 使用精确标签匹配，但候选报告为了保留来源，把标签写成 `- Java v151 resolved path:`。版本前缀插在短横线与 `resolved path` 之间，导致旧正则整条不命中，绝对路径原样流到最终哈希。

新增规则只接受 `Java` 或 `mini-kv`、一个 `v` 加数字、再接 `resolved path:` 的结构，并使用大小写不敏感匹配；捕获到的前缀原样返回，只有冒号后的值进入路径 helper。Windows 反斜杠先转斜杠，重复分隔符被合并，再以 `/fixtures/` 为锚点返回 `<repo>` 加剩余路径。Linux 路径不需要分隔符转换，但在同一锚点截断。两端因此收敛到完全相同的字符串，而不是分别维护 Windows 与 Linux 两套预期。

正则使用全局标志，是因为同一报告可以同时携带多个上游版本；使用大小写不敏感标志，是为了兼容现有 `Resolved path` 与小写 `resolved path` 的文案差别。它没有捕获版本号后面的任意文本，而是要求固定标签和冒号，避免把一句描述中偶然出现的“resolved path”当作字段。`normalizePathValue()` 本身没有新增分支，继续复用经过多批 parity 验证的 fixtures、Java 与 mini-kv 根识别逻辑。

规则顺序也有意义。版本化 resolved path 放在普通 resolved path 之后不会产生双重处理，因为普通规则无法匹配带前缀标签；新规则命中后，后续摘要规则不再改路径。它没有扩成“任何包含 path 的行都替换”，是为了防止把业务描述、URL 或普通状态文字误认为文件系统路径。范围越明确，测试归一化越不容易掩盖真实输出变化。

## Safety Boundary / 安全边界

最重要的边界是本版 `src/` 改动数为零。renderer 仍渲染原始路径，loader 仍读取同一历史 fixture，路由仍返回同一 Markdown。normalizer 位于 `test/`，只参与迁移奇偶校验。若将占位符逻辑放进产品 renderer，现场报告会失去真实证据位置，那会是行为变化；当前方案没有这样做。

第二条边界是对称性。不能只在 Linux 遇到 `/home/runner/work` 时把它改造成某个 Windows 固定路径，否则测试虽绿，却把开发者机器布局写进规范。现在 Windows 与 Linux 都经过同一 helper，并收敛到语义 token。第三条边界是非路径保护：专用测试输入 `Java v151 evidence status`，断言 normalizer 逐字返回，证明版本标签本身不会触发替换。第四条边界是既有结构断言全部保留；长度和哈希更新只反映规范化表示变化，H1/H2/H3 与 trailing newline 没有删减。

更新冻结指纹并不是把失败数字直接写成期望。直接改成 6172 会让 Windows 继续得到 6152，两边仍不一致；改成 LF 临时目录的 6180 也同样错误。只有先证明两端归一后都得到 6114，才记录新的规范化指纹。产品输出没有借此获得额外自由度，反而新增了两类路径样本与一个误匹配负例，测试约束更窄更清楚。

评审时还可以用文件边界验证这一点：v2185 的功能差异只出现在 `test/rendererMigrationParityUtils.ts`、其新单测和 v2183 的规范化指纹行，`src/` 与 `fixtures/` 均无修改。若未来规则意外吞掉业务内容，非路径负例或现有十一报告哈希会失败；若有人修改产品输出，原始 renderer 测试和章节计数仍会提供独立信号。测试工具的变化没有成为修改产品行为的通道。

还要避免把所有跨平台失败都归入路径问题。若差异行数很多且每行末尾多一个字符，应先检查 CRLF；若长度相同但摘要不同，应检查 fixture 内容或稳定 JSON；只有差异集中在带绝对根的字段、且长度差能由根目录长度解释时，才适用本版规则。这个判别顺序防止 normalizer 无限制扩张，也让真实内容漂移继续保持可见。

## Test Coverage / 测试覆盖

专用单元测试采用表驱动方式覆盖 Java 与 mini-kv。每个案例各给一条 Windows 绝对路径和一条 GitHub 风格 Linux 绝对路径，断言两者规范化结果相等，并断言结果仍包含 `resolved path: <repo>/fixtures/`。第三项负例验证 evidence status 行不被重写。这个测试直接锁定本次缺陷，不需要等待十二分钟 coverage 全量结束才知道正则是否退化。

集成层继续运行 v2183 的十一报告 parity；修复后候选报告与其他十份报告全部通过，标题和换行计数保持原值。独立 LF worktree 探针使用修复后的主工作树 normalizer处理 LF checkout 生成的真实报告，得到与 Windows 相同的 6114 与 sha256。收口还必须在 coverage 模式运行这两个文件，因为远端失败发生在 `vitest --coverage`；随后执行 typecheck、lint、build、文档门和固定两 worker 的完整套件。最后只推一次 v2185 并 block-watch replacement CI，若仍红则继续从新日志定位，而不叠加功能工作。

验证结果需要区分“测试断言通过”和“聚焦覆盖率达标”。第一次 coverage 聚焦运行中四项断言全部通过，但进程因全局覆盖率只统计两个文件而退出一；这不是产品失败，也不能被记录成完整 coverage 通过。第二次显式把本次子集命令的四个阈值设零后退出零，证明插桩兼容。最终覆盖率门只认 replacement CI 的全量结果，证据中会分别写明两者，避免把局部命令包装成仓库覆盖率结论。

## One-sentence Summary / 一句话总结

v2185 用独立 LF checkout 把 20 字符漂移锁定为两条版本化 resolved path，并以对称 `<repo>/fixtures/...` 归一化、路径矩阵负例和完整 parity 证明修复仅消除机器根目录噪声，不改变任何产品 Markdown。
