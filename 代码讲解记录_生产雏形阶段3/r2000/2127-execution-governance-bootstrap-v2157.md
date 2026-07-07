# v2157 代码讲解：把会话定位和 renderer 进度变成可执行合同

## Goal and Non-goal / 目标与非目标

v2157 不是一个业务功能版，它解决的是长周期工程中一个容易被低估的问题：每次新会话都要重新查 git 状态、最新 tag、CI、活动计划和 renderer 剩余量，而且不同会话对“已标准化”的理解可能不一样。当项目只有几个文件时，人工重新定位不算负担；当 renderer 有 245 个、N1 已经走过 37 个批次时，任何口径漂移都会直接影响计划、验收和 review 结论。

本版的主目标有三个。第一，提供一条会话启动命令，让执行者先看见仓库现实，再进入当前计划。第二，把 renderer census 固化成仓库内脚本，使 Codex、Claude 和 CI 完全共享同一定义。第三，把“中间版本不必等完 CI”与“红 CI 禁止继续写”合并成没有歧义的节奏：中间版 push 后只确认远程任务已入队，下一版写入前先查上一版结果；如果失败，立即修复，不带红继续。

非目标必须说清。v2157 不迁移 renderer，不改 Markdown 输出，不改 route、schema、service loader、historical fixture 或任何跨项目合同。本版也不启动 Stage 2，不连接 Azure VM，不安装 Docker，不打开 Java 或 mini-kv 进程。Stage 2 文档是为未来保存的门禁计划，其状态仍然是 inactive；只有各项目 Stage 1 验收通过，且 C1-C4 真实只读集成 capstone 通过后，才能进入运行化阶段。

## Entry Points / 入口、命令与公共导出

第一个入口是 `scripts/codex-bootstrap.ps1`。它的定位不是自动决策器，而是一次性方向仪表。执行 `./scripts/codex-bootstrap.ps1` 后，脚本依次输出最近三个 commit、当前工作树、最新 tag、第一个 remote、最近三次 GitHub Actions，以及当前 active program、playbook 和 final-push brief 的位置。脚本只读，不 fetch、不 checkout、不改 git config、不修改任何文件。由于 Windows PowerShell 5.1 对无 BOM UTF-8 脚本里的中文字面量解码不稳定，本版把脚本保持为 ASCII，用“coordination repo AGENTS.md”表达中央计划入口，避免启动时出现乱码。

第二个入口是 package script `renderer:census`，它对应 `node scripts/renderer-census.mjs`。普通运行 `npm run renderer:census` 会打印一行摘要和所有未标准化文件；加 `-- --json` 会输出可存档、可 diff 的结构化 JSON；加 `-- --max-unstandardized=63` 则开启 shrink-only 检查。如果后续改动导致剩余数超过上一版基线，脚本会写 stderr 并以非零码结束。这个退出语义很重要：它让 census 从“给人看的数字”变成“可被自动化消费的门禁”。

脚本还导出 `buildRendererCensus()`。这个导出使后续测试、CI 或 review 工具能直接获得对象，不必再去解析终端文本。同时，文件使用 `if (process.argv[1] === fileURLToPath(import.meta.url))` 分开命令行执行和模块导入，被 import 时不会自动打印或修改 `process.exitCode`。

## Data Model / Census 响应模型

`buildRendererCensus()` 的输入是仓库内当前 `src/services` 目录，没有环境变量、时间戳或网络依赖。它先用 `readdir` 取得目录项，只保留以 `Renderer.ts` 结尾的文件，再排序。排序不影响计数，却能保证 JSON 和文本列表每次都按同一顺序生成，避免不同文件系统返回顺序不同而产生假 diff。

每个 renderer 记录有四类数据：文件名、是否标准化、命中的共享 helper marker，以及 h3、for-loop、map、flatMap 四类 shape signal。当前标准化 marker 包括 `renderVerificationReportMarkdown`、`releaseReportShared` 的 header/entries/line/messages/tail helper，以及 `renderProfileEntrySections`。这个口径是 v2156 后的实际架构口径：完整 verification 报告、release/probe 报告和局部 profile section 不需要被强迫进入同一个 builder，只要已经收入对应的共享语义层，就算标准化。

顶层响应包含 `totalRenderers`、`standardizedRenderers`、`unstandardizedRenderers`、`remainingShapeSignals` 和 `unstandardizedFiles`。当前结果是 245 个 renderer，182 个已标准化，63 个未标准化。shape signal 只是分批提示，不是互斥分类；一个文件可能同时有 map 和 flatMap，因此这四个数不能相加得到 63。脚本在 `definition.note` 中直接记录这一点，防止 reviewer 把“形态信号数”错当成“文件桶数”。

## Service Flow / 执行流程和错误语义

会话的正常流程从 bootstrap 开始。执行者先看到工作树，所以能区分上一个执行者留下的改动与自己即将做的改动；然后看最新 tag 与 CI，判断前一版是否真正收口；最后顺着 active brief 进入 N1。这一流程不会替代工程判断，但会把判断所需的基本事实放到同一个终端窗口里。

进入 renderer 批次后，执行者先运行 JSON census，将输出存入本版 evidence。选定一组同形态文件并迁移后，再运行带上一版基线的 `--max-unstandardized`。比如 v2157 是 63，下一批完成 12 个文件后，新输出应为 51，同时 `--max-unstandardized=63` 必须通过。后续版本再把 51 作为新基线。这种一步一收紧的方式比在文档里手写一个“剩余 51”更可靠，因为任何人都可以从当前树重现数字。

错误语义也是显式的。非法的 `--max-unstandardized` 参数会抛出可读错误；读取目录或文件失败会进入 `main().catch(...)`，写入 stderr 并设置非零退出码；census 回升也会非零退出。相反，bootstrap 将外部 `gh` 查询视为有用但不是启动硬依赖：网络短暂超时不应阻止本地代码定位，但执行者仍能看到 `gh` 的 stderr，知道远程状态没有成功取回。

## Plans and Upstream Evidence / 计划层与上游证据

本版将 Claude 准备的 Stage 2 master、Node brief 和 Java brief 收入 Node 仓库，但它们不会抢占当前执行权。中央协调 `AGENTS.md` 已明确写出：当前 active program 是 Production Excellence Stage 1 final acceptance；Stage 2 只是已设计、未激活的后续阶段。这样做的价值是把“完成 Stage 1 后做什么”写清，同时不允许执行者因为看到一份更新的文档就跳过现有门禁。

Node final-push brief 的 CI 规则在本版被统一。原来的批次步骤要求“CI green before the next batch starts”，新增的 Program Discipline 又要求中间版不要用 `gh run watch` 阻塞。两者的真实意图并不冲突：不需要在 push 后原地等十几分钟，但也不能在尚未检查上一版结果时就写新版。修订后的规则是 push 后确认 queued，下一批写入前查 conclusion，红则立即修复；到 N1 最终批次或 review checkpoint 时，必须阻塞等到绿色。

Java 和 mini-kv 在 v2157 期间都可以并行。Node 本版没有读取新 Java evidence，没有读取新 mini-kv receipt，没有改共享 schema 或 route contract，所以不存在等待另两个项目批准的理由。Stage 2 Java brief 虽然保存在 Node 文档目录中，但它现在也只是计划输入，不表示 Node 会修改 Java 工作树。

## Safety Boundary / 安全边界与可维护性

`renderer-census.mjs` 的权限面很小：只读取 `src/services` 直接子文件，不跟随链接，不访问网络，不写缓存，不生成临时文件，不导入项目服务代码。因为它只检查源文本 marker，执行 census 不会触发 loader、historical resolver、Java 进程或 mini-kv 命令。bootstrap 同样只读，它不会在后台保留 Node、Vitest 或浏览器进程。

可维护性方面，脚本将“标准化 marker”放在单一常量数组里，将读取与汇总放在 `buildRendererCensus()`，将 CLI 参数和输出放在 `main()`。这种拆分让未来新增一种合法共享 helper 时，只需修改 marker 数组；要添加 CI 测试时，可以直接 import 纯函数；要增加新的命令行门禁时，只需扩展参数层。文件体量保持在可读范围，没有把 git、CI 和计划解析都塞进这个 census 脚本。

还要特别说明，marker census 是一个工程进度定义，不是对 renderer 质量的充分证明。文件引用了共享 helper，只能说明它进入统一渲染语义；是否字节级等价，仍需要每批的 pre/post hash、现有测试、typecheck、lint 和全量 Vitest 来证明。所以脚本的 shrink-only 门禁只防“进度数字回退”，不会被误用成“只要数字下降就可以跳过验证”。

## Design Decisions / 口径取舍与复现方法

这个 census 没有使用 TypeScript AST，而是检查经过明确列举的 helper marker。选择文本 marker 不是因为 AST 没有价值，而是因为本计划需要回答的问题很具体：一个 `*Renderer.ts` 是否已经进入现有三类共享渲染层之一。对这个问题，公开 helper 名称就是最稳定、最便于 reviewer 理解的信号。如果用 AST 去推断函数体是否“足够共享”，脚本会从计数器变成一个启发式分析器，反而让数字难以解释。

文本 marker 也有必须正视的局限。如果某个文件只在注释中提到 helper 名字，它会构成假阳性；如果未来引入新的合法共享层却没有更新 marker，它会构成假阴性。当前 245 个文件中没有用这些名称做解释注释的情况，而共享层只有计划中明确的三类，所以当前口径可接受。以后如果新增第四类共享语义，不能只改脚本数组；应在同一版说明新层解决什么形态、为什么不能复用旧层，并将口径变化记录在 progress deviation 中。

脚本只扫描 `src/services` 的直接文件，这和 N1 的历史范围一致。N1 期间文件总数应该保持 245，因为每个批次只改 renderer 内部，不合并、不删除公共文件。N1 结束后的 N5 会进行大文件拆分和 renderer Phase-B merge，那时总数可能下降。总数下降不是 census 失败，但必须由 N5 的 service-file ratchet、公共 re-export 和现有测试解释，而不能用“剩余量看起来更少”代替对删除行为的审查。

复现一个批次时，reviewer 不需要相信讲解里的数字。他可以在对应 tag 上运行 JSON 命令，保存输出；再 checkout 上一个 tag 运行同一命令，对比 `unstandardizedFiles` 的集合差。集合中消失的文件应该恰好等于本批声明迁移的文件，不应有未声明消失或新增回退。然后 reviewer 再抽样用 `git show` 取迁移前函数，用同一归档 profile 生成 Markdown 并比较 SHA-256。census 证明范围收紧，hash 证明输出不变，两者职责不重叠。

这种设计还给了失败诊断一个固定顺序。如果总数变了，先查是否新增、删除或移动 renderer；如果标准化数意外回退，查共享 helper import 或调用是否被移除；如果数字符合预期但 hash 改变，查标题、标签大小写、空行、empty text 和 message 格式；如果 hash 相同但测试失败，再查 route、loader 和 historical fallback。它让排错从“重新猜计数方法”转向查一个具体契约层。

最后，把命令放进 `package.json` 而不是只在计划里写 `node scripts/...`，是为了给后续执行留下稳定名称。脚本文件以后可能调整目录结构，但 `npm run renderer:census` 可以继续作为人和自动化的共同入口。本版没有新增依赖，因此不应改动 lockfile；如果 review 中看到 lockfile diff，应视为范围泄漏而移除。这个细节保证工具版本仍然容易审查：新增的只是本地 Node 标准库脚本与一条显式命令，不携带供应链变化。

## Test and Verification / 测试、构建与 CI 验证

v2157 的第一层验证是直接运行 `npm run renderer:census -- --json`。它必须返回 245 个总文件、182 个标准化文件和 63 个未标准化文件，与 v2156 归档的广义口径一致。第二层是运行 `npm run renderer:census -- --max-unstandardized=63`，确认当前树没有超出基线。为了证明反向门禁真正有效，还要用一个更严的临时参数运行，并确认它返回非零码；这个过程不会生成临时文件。

第三层是执行 bootstrap，检查 PowerShell 不再对协调路径打印乱码，并确认 git、tag、remote 和 plan pointers 都可读。`gh run list` 受网络影响，如果发生 TLS 短暂超时，这是远程状态获取失败，不是本地 bootstrap 的文件破坏；收版前需要重试一次远程查询。

因为本版改了 `package.json`、文档和 Node ESM 脚本，仍应运行 `npm run typecheck`、文档质量门禁和 `npm run build`。它没有修改 `src` 运行时代码，因此不需要为了凑数新建一组业务测试；但在 tag 和 push 前仍然需要跑现有全量 Vitest，保证新增讲解、AGENTS 修订和计划文档没有触发仓库里已有的文档诚实性门禁。完整验证后删除 `dist/` 和任务中产生的 `.tmp/`，并确认没有残留 Vitest worker。

实际收版时，本版又补上了 `test/rendererCensusScript.test.ts`，把 census 从“可手动运行的脚本”推进到“有回归测试保护的脚本”。第一条用例直接 import `buildRendererCensus()`，断言当前基线为总数 245、已标准化 182、未标准化 63，并检查剩余 shape signal 与第一个未迁移文件名；第二条用例用 `process.execPath` 执行 `scripts/renderer-census.mjs --max-unstandardized=62`，断言它会抛出包含 `Renderer census regression` 的错误。这里 stderr 中出现回归提示是预期行为，因为测试正是在证明收紧门会失败，而不是在模拟成功路径。这个测试的价值在于：后续 renderer 批次如果让剩余数量继续下降，可以有意识地把 63 改成新的更小基线；如果某次改动让数量回升，测试会立即红，而不是等 reviewer 在文档里发现数字对不上。

本地全量 `npx vitest run --testTimeout=180000 --maxWorkers=4` 在 15 分钟 shell timeout 后仍未给出断言失败输出，且进程树残留在后台。按照仓库的 Timeout Triage 规则，这不被记录为业务失败，也不能拿来改业务代码；我停止了该 Vitest 树，再用更聚焦的门禁补齐本版本直接相关的证据：`npm run renderer:census -- --json` 通过，census 测试与两组讲解质量测试通过，`npm run typecheck` 通过，`npm run lint` 以 0 error / 263 warning 通过，`npm run build` 通过。build 后的 `dist/` 被删除，进程检查没有发现我启动的 Vitest 或 tsx worker。由于本版 push 后仍会触发远程 CI，下一版写入前必须先检查 v2157 的 CI conclusion；如果 CI 红，后续 renderer 迁移立即暂停，先修红。

## One-sentence Summary / 一句话总结

v2157 的工程价值是：它没有用更多文档取代事实，而是把会话起点、renderer 剩余量和 CI 推进节奏变成每个执行者都能用同一条命令复现的工程合同。

数字可复现，边界可审查，失败可定位，这才是后续连续批次能够稳定提速的前提。
