# v2177 代码讲解：renderer parity 的 Markdown 路径标签归一化修复

## Goal and Non-goal / 目标与非目标

v2177 的目标是修复 v2176 推送后 GitHub Actions 暴露出来的 renderer parity 环境差异。失败点很集中：`test/rendererMigrationV2176Parity.test.ts` 中的 `shardReadinessContractConsumerGate` 在本地 normalized length 为 7243，但 Linux runner 上得到 7263。这个差异不是 route、loader、schema、fixture 或 renderer 业务逻辑变化造成的，而是测试 normalizer 没有覆盖某些 Markdown 路径标签，让绝对路径长度进入了 parity hash。v2177 因此只修测试比较面：扩展 `rendererMigrationParityUtils`，并更新受影响 case 的稳定指纹。

本版的非目标同样明确。不改三个 v2176 迁移过的 renderer，不改 `renderVerificationReportMarkdown`，不改 shard readiness loader，不改历史 fixture，不改 Java 或 mini-kv 的任何文件，也不把任何 read-only gate 升级为真实执行。v2176 的 public Markdown 输出仍然由产品 renderer 原样生成；v2177 改的是测试在比较这个输出时如何折叠 runner 私有路径。换句话说，用户或 route 看到的报告没有被“修短”，只有 parity 测试里的 normalized 字符串更稳定。

这个修复必须单独成版，而不是直接移动 v2176 tag。原因很简单：v2176 已经提交、打 tag、推送，并且 CI 已经对那个 commit 给出了失败证据。工程上不能把已经发布的 tag 当成本地草稿重写，否则后续审查者无法复现“失败来自哪里、修复改了什么”。v2177 把失败、根因、修复面和新验证命令都记录下来，使历史链条保持透明：v2176 是 renderer 迁移，v2177 是该迁移的 CI-only comparison repair。

这类修复的价值在于保护后续 N1 renderer consolidation 的节奏。剩余未标准化 renderer 还要继续做 parity，如果 normalizer 对路径标签覆盖不完整，每次迁移都可能在 Windows 本地通过、Linux CI 失败。v2177 不只是把一个数字从 7243 改到 7170，而是把“Markdown 输出里的证据路径标签也属于环境噪声”这一规则沉入共享工具。以后遇到类似 `Evidence file`、`Resolved path`、`Historical fallback path` 的报告，不需要每个 parity test 各自写一套替换规则。

更重要的是，本版把“修 CI”限定在证据可解释的最小范围。CI 的失败断言只说明 normalized length 不同，并没有指出某个业务字段、section 标题或 readiness 决策不同。如果这时直接改 renderer 输出，例如把真实路径隐藏掉，虽然也可能让测试变绿，却会降低报告对审查者的解释价值；如果改 fixture 路径或复制一份 Linux 风格路径，则是在把 runner 细节写进证据数据。v2177 选择改 normalizer，是因为 normalizer 本来就负责把环境差异从比较面剥离出去。这条职责边界清楚，修复后也更容易被未来版本复用。

## Entry Points / 入口

本版的第一入口是 `test/rendererMigrationParityUtils.ts` 里的 `normalizeRendererMigrationMarkdown(...)`。这个函数是 renderer migration parity 测试的统一比较面：先固定 `Generated at`，再折叠 JSON 路径、Markdown 路径、workspace root、file-reference size/digest 和 entry-rendered digest。v2177 在已有 path label 规则旁边新增了一条更窄的正则，只匹配 `- Evidence file:`、`- Resolved path:`、`- Historical fallback path:` 三种 Markdown 行，并把冒号后的值交给 `normalizePathValue(...)`。

第二入口是 `test/rendererMigrationV2176Parity.test.ts`。这里没有增加新 case，也没有修改 loader 构造方式。测试仍然强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true"`，仍然用固定 `generatedAt`，仍然检查 length、sha256、H1/H2/H3 数量和结尾换行。唯一变化是 `shardReadinessContractConsumerGate` 的 expected length 与 sha256 更新为新的 runner-stable normalized 值。其他四个 case 没变，说明修复面没有误伤 production shard execution 或 compatibility report。

第三入口是 v2177 的证据文件与说明文档。它们的作用不是参与运行时，而是把 CI 失败和修复逻辑写成可审查材料。证据文件记录了 GitHub Actions run `28867793465`、失败断言、根因、修改文件和已跑命令；解释文件说明为什么不能改产品 renderer 或 fixture 来“迎合”测试。这样以后如果又出现 runner-only length drift，审查者能直接沿着 v2177 的模式判断是 normalizer 缺口还是产品输出真的变了。

正则入口故意没有写成“任何包含 path 的行都替换”。那种写法看起来省事，但会吞掉业务字段里的普通文本，例如某个 recommendation 里提到 “path ownership” 或 “path policy” 时，并不一定是文件路径。v2177 只承认三种当前报告真实存在的标签，并且要求行首形态是 `- 标签: 值`。这让规则足够窄：它能覆盖 CI 失败的根因，也不会把将来某个业务解释句误判为路径。对于测试基础设施，窄规则比宽规则更适合长期演进，因为宽规则一旦误伤，hash 仍会稳定，却可能稳定在错误的比较面上。

## Response Model / 响应模型

v2177 不改变任何产品响应模型。`renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateMarkdown(...)` 仍然会输出 `- Evidence file:` 和 `- Resolved path:`，而且这些行在真实 Markdown 里继续展示真实路径。对于 route 用户来说，路径信息越真实越好，因为它告诉审查者 Node 到底读的是本地 sibling workspace 还是 historical fixture fallback。v2177 不把这些真实路径从报告里拿掉。

变化只发生在测试响应模型。normalized parity 字符串现在会把这些路径行里的环境部分折叠成稳定占位，例如 fixture 路径会归一成 `<repo>/fixtures/...`，Java workspace 路径会归一成 `<java>/...`，mini-kv workspace 路径会归一成 `<mini-kv>/...`。这样 hash 仍然能检查 section 标题、字段标签、业务布尔值、检查结果、warning、recommendation 和 next action，但不会因为 `/home/runner/work/nodeproj/nodeproj` 比 `D:\nodeproj\orderops-node` 长或短而失败。

受影响的稳定指纹从旧的 7243 / `2bf226...` 变成 7170 / `511043...`。这个变化不是 public output 变短，而是 normalized comparison string 折叠了两条以前漏掉的路径行。`shardReadinessCompatibilityReport` 仍是 6808，三个 production shard execution 代表 case 仍是 6484、8148、8143。这个结果很重要：它证明新增 normalizer rule 的影响只落在真正含有这些 Markdown path label 的 case 上，没有扩大到无关 renderer。

这里还保留了 length 和 sha256 的双重检查。只看 hash 能证明整体字符串没变，但审查日志不容易一眼判断差异规模；只看 length 又可能漏掉同长度内容替换。两者一起使用，可以把“路径折叠后的展示骨架”锁得更牢。H1/H2/H3 数量检查则是第三层防线，它不关心具体路径或 digest，却能发现 section 层级被误改。v2177 更新 expected 值时没有删除这些检查，说明修复不是降低 parity 强度，而是让 parity 对准真正应该稳定的部分。

## Upstream Evidence / 上游证据

本版的直接上游证据是 v2176 CI 失败日志。GitHub Actions 的 Test 步骤运行 `npm run test:coverage`，在 `rendererMigrationV2176Parity.test.ts:137` 报出 length assertion：expected 7243, received 7263。此前同一 commit 本地 focused parity、文档门、lint、build 和分片全量测试都通过，所以优先怀疑 runner 环境差异，而不是 renderer 迁移本身。

复现路径分两步。第一步在本地用 coverage instrumentation 单跑 v2176 parity，证明 coverage 本身不会改变输出；第二步打印 contract consumer gate 的 normalized path 相关行，发现 normalizer 后仍残留 `- Evidence file:` 和 `- Resolved path:` 的绝对路径。这解释了为什么 Linux runner 能产生 20 字符漂移：它不是业务字段差异，而是两个平台的绝对路径文本不同。这个定位过程也避免了一个错误方向，即直接把 expected length 改成 CI 的 7263。那样只是把 Linux 路径长度写死，下一台 runner 或另一条 checkout 路径仍会失败。

Java 和 mini-kv 在本版中只是被描述为证据来源，没有被写入、启动或要求等待。`ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK` 仍然用于让 Node 读取 committed fixture，从而模拟 GitHub runner 没有 sibling workspace 的情况。v2177 的并行状态是 recommended parallel：Java 和 mini-kv 可以继续各自 final-push playbook，Node 的这次修复不构成它们的批准门。

这个上游证据还有一个经验教训：本地存在真实 sibling workspace 时，很多路径问题会被“恰好可读”掩盖。v2176 已经强制 fallback，但 normalizer 仍然把 fallback resolved path 原样留下，因此 Windows 与 Linux 的 checkout root 仍会进入比较面。以后遇到 sibling evidence parity，不能只问“是否 forced fallback”，还要看 forced fallback 之后的 Markdown 是否仍输出了 runner-specific absolute path。v2177 的规则正是把这后一层补上。

## Service Flow / 服务流向

运行时服务流完全没有变化。route 仍然调用 loader，loader 仍然生成 profile，renderer 仍然把 profile 渲染成 Markdown。v2177 不参与这个链条；它只在 test 层处理 renderer 输出后的 comparison string。真实报告里 `Evidence file` 指向配置路径，`Resolved path` 指向实际解析路径，`Used historical fallback` 标明是否走 fixture fallback，这些语义都保持原样。

测试服务流则更清晰了。parity test 先生成真实 Markdown，然后调用 `normalizeRendererMigrationMarkdown(...)`。normalizer 的职责不是制造“理想输出”，而是移除已知非业务噪声：时间戳、checkout 路径、workspace root、file size、digest 这类随环境或 fixture 状态变化的字段。v2177 把大写 Markdown path label 纳入同一个流程，使 JSON path 和 Markdown path 的处理规则保持一致。

这种设计比在每个 parity test 里单独 `.replace(...)` 更稳。单独替换会让每个版本各自理解路径噪声，过几版之后很难知道哪个规则还有效；共享 normalizer 则把“什么属于比较噪声”集中在一个文件里。未来如果又出现 path-like 标签，可以先判断它是否真的是环境噪声，再加一条最窄规则。这样不会把 builder、renderer 或 loader 推向难维护的条件分支。

从维护路径看，v2177 也把下一批 renderer 迁移的准备成本降了下来。下一版候选里有 read-only cross-project readiness runner 和 minimal read-only integration 家族，它们同样会输出证据路径、resolved path 或 fixture fallback 状态。如果不先修 normalizer，这些候选即使 renderer 迁移完全正确，也可能在 CI 上因为路径标签漂移失败。先收 v2177，相当于把比较工具磨准，再继续迁移功能 renderer。这比一边新增功能一边追 CI path drift 更符合计划书里“红 CI 先修”的节奏。

## Safety Boundary / 安全边界

第一条安全边界是不要修改测试期望来掩盖真实输出变化。v2177 的顺序是先确认 normalizer 缺口，再扩展 normalizer，再重新计算稳定指纹。如果 renderer 的 section 顺序、业务字段、检查结果或 warning 内容真的改变，normalizer 不会替它遮住。新增规则只匹配三种路径标签，冒号后的值还会经过 `normalizePathValue(...)`，不会影响普通业务文案。

第二条安全边界是不要改 fixture 字节。CI 失败里出现的是 length drift，不是 JSON schema、digest 或 evidence missing。修改 historical fixture 或 loader 只会把问题转移到更危险的位置。v2177 保留 fixture 和 loader 不动，说明证据内容仍然可信，只有测试比较层对环境路径的处理不完整。

第三条安全边界是保留 failed CI 的历史。v2176 tag 不移动，v2177 用新 commit 修复。这样远端历史能完整表达：迁移版本失败在比较面，后续修复版本收窄比较面。对于生产前治理项目，这比“把历史打磨成看起来从未失败”更重要，因为真实工程成熟度来自可追踪的失败处理，而不是没有失败记录。

第四条安全边界是后续功能推进必须等 v2177 CI 绿。虽然 v2177 已经只改测试工具和期望，但 master 当前远端状态是红的。按计划书规则，不能在红 CI 上继续堆 v2178 功能迁移。等 v2177 远端通过后，才回到 read-only cross-project runner 或 minimal read-only integration renderer 的下一批迁移。

第五条安全边界是不要把 normalizer 发展成“万能忽略器”。它可以折叠环境路径，但不应该折叠 readiness state、decision、executionAllowed、blocker code、warning code 或 recommendation 文本。renderer migration 的目标是输出不变，normalizer 只是避免本机和 CI 的不可控上下文影响判断。只要某个字段属于业务语义，就必须让 hash 继续敏感。v2177 的新增规则没有触碰这些字段，因此仍然能发现真正的 renderer 退化。

## Test Coverage / 测试覆盖

第一组验证是历史迁移回归：`npx vitest run test/rendererMigrationV2176Parity.test.ts test/rendererMigrationV2167Parity.test.ts test/rendererMigrationV2168Parity.test.ts test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts test/rendererMigrationV2175Parity.test.ts --maxWorkers=2`，结果是 6 个测试文件、7 个测试通过。它证明 v2177 的 normalizer 扩展没有破坏 v2167 到 v2175 的既有比较面，也证明 v2176 的五个 case 在新比较面下自洽。

第二组验证贴近 CI 的失败环境：`npx vitest run --coverage test/rendererMigrationV2176Parity.test.ts --maxWorkers=2 --coverage.thresholds.lines=0 --coverage.thresholds.functions=0 --coverage.thresholds.statements=0 --coverage.thresholds.branches=0`。这个命令启用 v8 coverage instrumentation，测试本身 1/1 通过。阈值设为 0 只是因为 focused 单文件命令不可能满足全项目 coverage 门；真正的 coverage 阈值仍交给 GitHub Actions 的完整 `npm run test:coverage`。

接下来还要跑 typecheck、文档质量门、lint 和 build。因为 v2177 新增中文代码讲解，文档质量门必须重新过；因为 normalizer 是 TypeScript 测试工具，typecheck 和 lint 也必须过；因为 CI 之前在 Test 步骤红掉，远端 GitHub Actions 才是最终验收。只有远端绿以后，下一版才可以恢复功能迁移。

这组验证刻意没有把本地完整 coverage 当作必须前置，因为当前仓库的 coverage 全量在 CI 中执行，且本地全量 vitest 已经在 v2176 收版时表现为体量型超时，需要分片完成。v2177 的改动范围极窄，最有信号的本地命令是迁移 parity 回归和 coverage instrumentation focused run；真正模拟 CI 的完整覆盖率、build 和 smoke 仍由远端流水线承担。这样既不降低验收标准，也避免在本机重复消耗几十分钟去跑一个已经由 GitHub Actions 专门负责的完整门。

## One-sentence Summary / 一句话总结

v2177 把 renderer migration parity 的 Markdown 路径标签纳入共享 normalizer，修复 v2176 在 Linux runner 上的 shard readiness contract consumer gate 长度漂移，同时保持产品 renderer、loader、route、schema、fixture 和真实 Markdown 输出全部不变。
