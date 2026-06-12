# Node v2115 代码讲解：测试预算、ESLint 基线与 CI 治理入口

## Goal and Non-goal / 目标与非目标

v2115 的目标不是继续添加一条新的治理链，也不是把 Node 推向真实分片联合执行。它处理的是生产前工程里更底层、更容易被忽略的一类问题：项目已经有大量证据服务、归档验证、只读 smoke 和跨项目 readiness 报告，但基础质量入口仍然有不一致。最明显的不一致是测试超时。`package.json` 过去通过 CLI 参数给 `npm test` 传入 `--testTimeout=180000`，而 `vitest.config.ts` 里仍然是另一套默认值；更隐蔽的是大量历史测试文件在单个 `test(...)` 或 `it(...)` 调用末尾写了 `15000`、`45000`、`60000`、`90000` 这类局部 timeout。只改全局配置会让表面规则变整齐，却不能改变这些局部参数实际覆盖全局预算的事实。v2115 因此把三处规则统一起来：package script 只保留 `vitest run`，Vitest 配置设置 `testTimeout` 和 `hookTimeout` 为 `180_000`，测试文件里的 497 个历史 timeout 也统一到同一预算。

第二个目标是把 ESLint 变成 CI 的正式入口。这里采用的是保守落地，不是一次性追求零 warning。当前仓库有 1700 多个被扫描文件，历史上没有 ESLint 基线，直接启用所有严格规则会把 N0 变成大规模业务代码修补，既不符合 quick wins，也容易误伤正在进行的 renderer consolidation。因此本版只采用 `@eslint/js` 和 `typescript-eslint` 的 recommended 规则，不引入 type-aware lint，不引入 Prettier，不做 repo-wide reformat。真正阻断 CI 的是 error；遗留的 `no-unused-vars` 和 `no-explicit-any` 先作为 warning pool 记录到证据里，并明确归入 N5 code health 继续消化。

非目标同样清楚。本版不新增路由，不修改 sibling evidence schema，不改变任何 readiness 语义，不启用 Java 或 mini-kv 的实时连接，不改变 approval / credential / managed audit 的安全边界，不把 lint warning 硬压成大量无意义的下划线变量，也不把测试期望改成“看起来能过”的新文本。所有变更都服务于一个目的：让本地、CI 和后续维护者面对同一套质量入口。

## Entry Points / 入口

最直接的入口是 `package.json`。它现在新增了 `"lint": "eslint src test"`，同时把 `"test"` 收敛为 `"vitest run"`。这个选择很关键，因为命令行脚本不再夹带隐藏的测试预算。以后维护者直接运行 `vitest run` 和运行 `npm test`，会进入相同的配置路径，不会因为 package script 额外传参而出现两种行为。

第二个入口是 `vitest.config.ts`。这里把 `testTimeout` 和 `hookTimeout` 统一为 `180_000`。`hookTimeout` 一起调整，是为了避免 before/after 钩子和测试体在长归档测试中出现不同预算。OrderOps Node 的测试不只是轻量单元测试，还包含大量只读路由、归档验证、历史 fixture、Markdown renderer 和 readiness profile 的组合验证；在 Windows 本地、GitHub runner、防病毒扫描同时存在时，短局部预算容易把慢导入误判为业务失败。

第三个入口是 `eslint.config.js`。它使用 flat config，并显式忽略 `coverage`、`dist`、`node_modules`、`playwright-report`、`test-output` 和 `.vitest`。规则上保留 recommended 基础，关闭 TypeScript 项目中容易重复报错的 `no-undef`，把两个大规模遗留规则降为 warning，并在配置里留下 ratchet 注释。这个文件是后续 N5 的起点：未来要消 warning，不需要再争论是否启用 lint，只需要按规则逐类消化。

第四个入口是 `.github/workflows/node-evidence.yml`。CI 现在按 `typecheck -> lint -> test -> build -> safe smoke` 排列。lint 放在 test 之前，是为了让明显代码质量错误尽早失败；lint 放在 typecheck 之后，是因为 TypeScript 编译仍然是当前仓库最基础的结构校验。这个顺序让 CI 的失败语义更清楚：类型错、lint 错、测试错、构建错、smoke 错分别对应不同层级。

## Response Model / 响应模型

v2115 没有新增业务响应模型，但它重塑了“质量入口如何响应”的模型。测试入口的响应现在可以被一句话描述：无论从 `npm test` 还是直接从 Vitest 配置进入，标准预算都是 180 秒。历史局部 timeout 统一后，失败不再由“某个文件还残留 15 秒预算”这种偶然条件决定。换句话说，测试失败更接近真实断言失败、真实死锁或真实性能异常，而不是配置层分裂造成的假阴性。

ESLint 的响应模型也被分层。error 是立即阻断项，warning 是记录下来的治理债。当前 baseline 是 0 error、263 warning，其中 257 个来自 `@typescript-eslint/no-unused-vars`，6 个来自 `@typescript-eslint/no-explicit-any`。这个数字不是为了美化，而是为了让后续版本有明确目标。如果未来某次变更引入新的 lint error，CI 会直接挡住；如果要推进 N5，就可以按 warning 类型、目录和文件族逐步处理，而不是在一个版本里把所有历史问题混成一团。

本版还修掉了少量真正的 lint error。比如无用赋值、常量表达式和不必要转义，这些修改都遵守一个边界：只清掉静态分析能证明没有行为价值的代码，不借 lint 之名重写业务分支。这样 N0 的响应模型保持纯粹：它让质量工具进入主通道，同时把高风险的大规模语义清理留给后续更合适的版本。

## Upstream Evidence and Config / 上游证据与配置

本版不消费新的 Java 或 mini-kv evidence。Claude 留下的 production excellence 计划已经把三项目并行模式写清楚：Java 和 mini-kv 可以读取 Node 仓库里的 playbook，但它们不能、也不需要把进度写回 Node；各自 Codex session 应在自己的仓库里维护 `docs/production-excellence-progress.md`。Node 的 N0 只处理本仓库的测试、lint 和 CI，不要求 sibling 项目先完成任何版本。

配置层的安全默认值仍然维持关闭。CI 和本地 smoke 都使用 `UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`，本地 smoke 只访问 `/health` 和 release evidence readiness gate。后者返回 `readyForReleaseEvidenceArchive=true` 与 `executionAllowed=false`，说明归档证据就绪和真实执行许可仍然是两个不同概念。N0 的改动不会把只读 readiness 误升格为执行能力。

证据写在 `e/2115/evidence/production-excellence-node-n0-v2115-summary.json` 和同名 Markdown 摘要里。JSON 记录了 224 个测试文件、497 个 timeout 替换、旧 timeout 分布、ESLint baseline、验证命令和 HTTP smoke 结果；Markdown 给人读，说明本版为什么不附截图、为什么 Java/mini-kv 不被阻塞、为什么 warning pool 先保留为 ratchet。这样后续看历史时，不需要从 git diff 的 200 多个测试文件里倒推本版意图。

## Service Flow / 服务流程

从服务运行角度看，v2115 不改变 Fastify route、client、service profile 或 renderer 输出。变化发生在服务进入验证流水线之前。开发者先通过 `npm run typecheck` 验证 TypeScript 结构，再通过 `npm run lint` 验证基础静态规则，然后用 `npm test` 跑完整 Vitest 套件，最后 `npm run build` 产出 `dist` 并用只读 smoke 确认服务能安全启动。这个流程与 CI 对齐，意味着本地 closeout 不再是一套，GitHub Actions 又是另一套。

测试 timeout 的流向也更干净。过去的流向是：package script 提供一个 CLI timeout，Vitest 配置提供另一个默认值，部分测试又在局部传第三个值。维护者看到 timeout 失败时，需要判断是配置生效、CLI 生效，还是局部参数生效。现在流向被简化：配置默认是 180 秒，局部显式参数也是 180 秒，命令行不再额外覆盖。局部参数保留的原因是减少本版语义风险：大量测试已经显式传参，直接删除参数会改变源码结构范围更大；统一数值则能快速消除行为差异，并给后续测试整理留出空间。

ESLint 的流向则是从配置到 CI。`eslint.config.js` 定义扫描范围和规则，`package.json` 暴露脚本，workflow 在 typecheck 后调用脚本。剩余 warning 不被隐藏，因为 N5 需要看得见这批历史债。CI 中没有设置 `--max-warnings 0`，这是刻意选择：N0 的目标是让 lint error 阻断主线，而不是把 263 个历史 warning 硬塞进本版。这种分层比一次性大扫除更符合当前仓库状态。

这里还有一个维护上的取舍：为什么不在本版顺手抽一个 `TEST_TIMEOUT_MS` 常量，然后给 224 个文件逐个 import？从长期形态看，共享常量当然更漂亮；但在当前仓库里，这会把一个“数值统一”版本变成一次“测试文件结构重写”版本。每个 import 都可能触发排序、路径、未使用变量、循环依赖或 lint 争议，review 面积会显著扩大。v2115 选择先让行为一致，再把结构美化留给后续专门的测试整理版本。生产前治理最怕把几个目标揉在一起：看似一步到位，实际让失败原因变得更难定位。

同理，本版也没有立刻清空 warning pool。`no-unused-vars` 的主要集中区是历史归档 builder、promotion archive 和 managed audit 证据文件；这些文件正在被 v2114 之后的 renderer consolidation 逐批收敛。如果 N0 先粗暴删除 import 或改名为下划线变量，后续 N1/N5 反而要再次移动同一批代码。把它们作为 warning 留在 baseline 中，并在计划里写明 N5 处理，能让每个版本承担自己该承担的责任：N0 建入口，N1 收重复 renderer，N5 消静态债。

## Safety Boundary / 安全边界

本版最重要的安全边界是“不把质量治理误认为生产执行”。测试预算变长不代表允许测试无限拖延；它只是把历史治理测试在慢机器上的预算拉齐。ESLint 进入 CI 不代表业务已经达到零债；它只是让后续新增错误无法悄悄进入主线。HTTP smoke 通过不代表真实 Java、mini-kv 或 managed audit 已经接入；它只说明 Node 在关闭 upstream action/probe 的情况下可以启动并返回只读 readiness。

本地 smoke 使用 `node dist/server.js` 启动过一次，PID 为 32812，脚本在 `finally` 中已经停止。没有留下需要保留的后台服务。`dist` 是 build 产物，按项目清理规则在最终提交前删除。smoke 生成的本地日志只用于本次排查，也会在清理阶段删除。这样的处理符合 AGENTS.md 的 Completion Cleanup Gate：需要启动进程时记录用途和 PID，结束前停止；需要生成临时产物时保留最终证据，删除中间产物。

跨项目安全边界也保持独立。Java 和 mini-kv 可以按自己的 playbook 推进 CI、lint、coverage、配置和文档，但它们不应该编辑 Node 的计划文件，也不需要等待 Node N0。Node 只在 review checkpoint 汇总它们的结果。这个模型避免了三个 Codex session 同时写同一个 repo，也避免了把非契约质量工作误建成跨项目阻塞链。

## Test Coverage / 测试覆盖

本版验证分五层。第一层是 focused tests：`test/workflowEvidenceVerification.test.ts` 和 `test/governanceGrowthRatchet.test.ts` 通过，确认本轮小修没有破坏 workflow evidence 和治理增长约束。第二层是 `npm run lint`，扫描 1747 个文件，结果为 0 error、263 warning。第三层是 `npm run typecheck`，确认 TypeScript 编译结构未破坏。第四层是全量 `npm test`，524 个测试文件、1612 个测试全部通过，用实际结果证明 timeout 统一没有掩盖断言失败。第五层是 `npm run build` 和本地 HTTP smoke，确认构建产物可以启动，并且只读 readiness 路由仍然返回 `executionAllowed=false`。

这组验证里最有价值的是第一次全量 `npm test` 的失败。它暴露出一个容易被忽略的事实：只改 `vitest.config.ts` 不够，因为局部 timeout 会覆盖全局配置。v2115 没有把这个失败当成“加大 CLI 参数”处理，而是回到源码里把所有显式短预算统一。这比继续依赖 package script 的隐藏参数更可维护，也让 CI、直接运行 Vitest 和未来 coverage 命令更容易共享同一套基础预算。

仍然存在的测试治理空间也被明确留下。224 个测试文件里保留了显式 `180_000` 参数，这不是最终理想形态。更好的长期形态可能是抽出测试常量，或者删除不必要的局部 timeout，只保留少数真正需要特殊预算的文件。但在 N0 这个版本里，先统一行为、跑通全量验证、把 lint 接入 CI，是比大规模重写测试结构更稳的选择。

后续如果继续优化测试层，应该按风险从低到高推进。第一步可以写一个轻量脚本或测试，确认没有新的短 timeout 被引入；第二步再评估哪些文件其实不需要局部 timeout，逐批删除参数，让它们完全继承 `vitest.config.ts`；第三步才考虑共享常量或测试工具模块。这个顺序能避免 N0 今天解决的问题在几版之后反弹。也就是说，v2115 不是测试治理的终点，而是把混乱状态压成一个可继续演进的基线。

CI 层也有后续空间。现在 workflow 仍然执行 `npm test` 而不是 coverage，因为 N2 才会接入 `@vitest/coverage-v8` 并设置阈值。把 coverage 和 lint 同时塞进 N0 会让失败语义变混：如果 CI 红了，很难判断是 lint 新入口、timeout 统一、coverage 插桩还是阈值设置导致。当前切片保持了清楚的因果链：lint 只负责静态错误，test 只负责原有测试矩阵，build 和 smoke 只负责产物可启动与安全只读路由。下一版接 coverage 时，才有稳定基线可比较。

## One-sentence Summary / 一句话总结

v2115 把 Node 的测试预算、ESLint 基线和 CI lint 入口统一成可验证、可追踪、可继续收敛的生产前治理层，同时保持所有真实执行与跨项目契约边界关闭。
