# Node v2190 代码讲解：生产卓越轨道的机械化收口

## Goal and non-goal / 目标与非目标

v2190 的目标，是把 Node 轨道过去分散完成的 N0 到 N5 重新放回 E1 到 E10 的同一张验收表中，并补上仍然只能靠人记忆的约束。所谓“收口”并不是再写一篇总结合集，而是要求每个结论后面都有一条会在回退时返回非零退出码的命令。审计发现，构建、测试、可观测性、renderer 统一和源文件体积已经有机械证据，但 lint 只有历史数字没有上限，覆盖率门槛与当前实际值之间留下了过宽余量，安全边界只有配置测试而没有仓库级凭据扫描，历史归档也只有“不要移动”的规则而没有增长预算。四个缺口分别对应 `--max-warnings`、上调后的 coverage thresholds、安全配置扫描器和归档 census。

非目标决定了本版的风险边界。v2190 不新增 Fastify 路由，不修改任何 JSON/Markdown 产品响应，不增加治理报告 service，不连接 Java 或 mini-kv，不重写冻结 fixture，不开启 probe/action，也不把本地假适配器包装成生产能力。安全扫描器和归档 census 都是开发期 CLI，输入是本仓库文件，输出是终端或 JSON，不进入 HTTP 运行时。三个项目仍可并行推进各自工作，因为 Node 本版不消费新鲜 sibling 证据；只有外部 closeout review 通过后，Node 才能另开 C1-C4 联合验证计划。

## Entry points / 入口、输入与输出

本版增加两个稳定入口。`npm run security:scan` 调用 `scripts/security-config-scan.mjs`，默认输入是当前项目根和 `docs/security-scan-waivers.json`；命令还支持 `--project-root`、`--waivers` 与 `--json`，使测试可以在临时项目里构造失败，而不是污染真实仓库。成功输出扫描文本文件数、跳过的二进制数、凭据信号数、精确豁免数和安全配置检查数；失败输出未豁免信号、环境秘密、无效或过期 waiver 以及配置事实缺口，并把进程退出码设为一。

`npm run archive:retention:census` 调用 `scripts/archive-retention-census.mjs`，输入是项目根和 `docs/archive-retention-budget.json`。预算文件把所有权分成三类：`a/` 到 `f/` 的数字版本目录、四个代码讲解根、fixtures 与 plans 等受限目录。输出既有面向人的 MiB 摘要，也有供测试和归档读取的 JSON，其中包含每个根的文件数与字节数、最大数字版本目录、最大 walkthrough、最大受限文件，以及按失败类型分组的 violations。两个入口都只读；它们不修复、不移动、不压缩任何文件，因为自动“替用户做清理”会破坏历史证据语义。

其余入口保持原样：`npm run lint` 仍扫描 `src test`，只是在命令末尾加入 `--max-warnings 261`；`npm run test:coverage` 仍由 Vitest/V8 覆盖全部 `src/**/*.ts`，只是门槛从 93/85/96/93 提高为 statements 94、branches 86、functions 97、lines 94。CI 的 `Node Evidence` workflow 在 coverage 之前依次运行 lint、安全扫描和归档 census，之后才 build、启动受控 Node、检查 health/metrics/release-evidence，并在 always 步骤停止它。

## Security scan flow / 安全扫描的数据流

安全扫描首先递归枚举项目文件，但主动排除 `.git`、`node_modules`、`dist`、`coverage` 以及测试和浏览器临时输出。读取文件前会判断二进制内容，避免把图片、压缩数据或 SQLite 索引当成文本 token；这一步的输出是“可扫描文本集合”和“跳过二进制计数”。随后每个文本按独立规则匹配完整私钥块、AWS 访问键、GitHub token、OpenAI key、Slack token 与带用户凭据的数据库 URL。对 `.env*` 又增加赋值语义检查：变量名含 secret、password、api key、access token 或 auth token 且值非空时直接失败，注释和明确空值不会被误判。

仓库已有六个 credential-URL 信号，它们来自脱敏测试，不是泄漏。处理这类历史输入的关键不是放宽正则，而是让例外比信号本身更窄。`docs/security-scan-waivers.json` 的五个条目同时固定相对路径、信号类型、匹配文本 SHA-256、预期出现次数和可审核原因；其中同一测试文件可能出现两次同一合成输入，所以五个条目覆盖六次匹配。扫描器把实际匹配按这四个键核对：找不到 waiver 是未授权信号，次数增加是潜在复制，digest 改变是内容漂移，条目没有对应匹配则是 stale waiver。任何一种都失败，因此 waiver 不是“这个目录永远安全”的通行证。

凭据正则之外还有配置事实层。扫描器读取 `src/config.ts`、环境模板、workflow、边界与安全文档，核对上游 probe/action 默认关闭、访问执行与秘密值的边界、生产模板不含可运行外部连接、managed audit 仍选择 fail-closed 的 `managed-unimplemented`、CI 没有打开上游动作等十八项事实。正则回答“仓库里是否像是出现了秘密”，配置检查回答“默认组合是否会意外形成可执行状态”，两者缺一不可。最终 JSON 的 `ready` 只有在未豁免信号为零、环境秘密为零、waiver 无错误且十八项全部通过时才为 true。

## Archive census flow / 归档预算的数据流

归档门解决的是另一类长期风险：每个版本都只增加几张图和几篇说明，看起来很小，但数百版叠加后会让 clone、索引、Defender 扫描和人工检索持续变慢。census 不把源码和依赖混入数据，而是只读取预算列出的证据根。数字版本目录按相对路径的第一层数字目录归组，所以 `d/2190/evidence`、`d/2190/解释` 与 `d/2190/图片` 会共同计入一个版本；walkthrough 则逐文件检查，避免单篇讲解靠无限增长满足字数规则；fixtures 和 plans 同时受根总量与单文件上限保护。

预算采用多层限制而不是单个总字节数。80 MiB 聚合限制控制仓库证据总体，8000 文件限制控制文件系统与 checkout 开销，1 MiB 单版本防止一次运行塞入大日志，64 KiB walkthrough 限制迫使讲解保持可读，fixtures 的 10 MiB/512 KiB 与三卷 plans 的独立上限防止某个类别吃掉全部余量。脚本还拒绝不存在、互相重叠或指向符号链接的根，否则相同文件可能重复计数，或者扫描边界可能被链接引到仓库外。v2190 加归档前的基线是 7012 个文件、65448540 字节，最大数字版本目录是 `d/341`，说明新预算来自实际测量，不是随手猜的整数。

失败时脚本只报告事实。临时 build、coverage、浏览器报告和调试日志应在 cleanup 阶段删除；真正的版本证据若导致超限，则应先复用已有证据、减少重复截图，或者单独提出 retention 变更。禁止为了变绿而改写冻结 sibling fixture、移动被 439 类路径引用消费的历史文件、降低讲解质量，或直接把预算抬高。`test/archiveRetentionCensus.test.ts` 除了验证真实仓库通过，还构造一个很小的临时项目，让聚合、文件数、单版本、walkthrough、受限根和单文件六类问题在同一次运行中出现，证明报告不会只暴露第一项错误后提前返回。

## Quality ratchets / 覆盖率与静态分析棘轮

覆盖率不是追求 100% 的装饰数字，而是防止已有测试面悄悄变薄。v2189 的 Linux CI 实际值为 statements 95.92%、branches 87.59%、functions 98.64%、lines 95.88%；旧下限 93/85/96/93 与实际值都相差超过两个百分点，触发简报的“向上重设”规则。新下限 94/86/97/94 仍给机器差异和合理重构留出约一点到一点半的空间，却比旧门更接近真实能力。`productionExcellenceCloseoutRatchets.test.ts` 直接导入 Vitest 配置并固定四个值，防止以后只在配置里悄悄调低门槛。

ESLint 当前有 261 个 warnings、零 errors。这里没有开展与 closeout 无关的全仓 warning 重写，因为上千服务文件的机械改动会放大风险，也难以在一个收口版本里说明行为不变；但“记录 261”仍不足以防回退，所以 package 脚本加入 `--max-warnings 261`。以后新 warning 会让命令失败，维护者可以在触及相关文件时逐步消减，不能先把上限升到 262。测试同时固定 lint 命令、两个治理命令以及 workflow 中 security、retention、coverage 的先后顺序，保证本地门不是孤立脚本。

## Documentation and evidence / 文档与证据模型

E7 的核心是文档必须描述最终树，而不是描述它创建时的旧树。旧 START_HERE 仍停在 v242，并把项目方向描述成继续累积 command package 与 upstream echo；README 的普通启动示例甚至同时把 probes 和 actions 设为 true，这与“默认关闭”的文字冲突。v2190 把普通启动示例改回 false，并把只读 probe 说明为独立评审窗口，把 action true 从推荐路径中移除。START_HERE、README 和 PRODUCTION_BOUNDARIES 都使用完全相同的成熟度标签：`single-project validation + cross-project contract alignment`。

`docs/plans/node-track-final-evidence.md` 是外部 reviewer 的入口，不再要求他从数百版说明中拼结论。它按 E1-E10 列出实现、会失败的命令、结果和路径，并在同一处枚举所有 waiver：三个 AST 验证的 composition-only renderer、五个安全 waiver 条目覆盖六次合成匹配、源文件零 waiver、归档零 waiver、覆盖率没有额外排除。文档也解释了一个时间因果限制：提交内容不可能预先知道“本次 push 才创建”的 GitHub run URL，因此仓库中引用前一轮可复现 CI，最终 tagged run 的不可变 URL由 closeout 回复和 GitHub commit checks 提供，不能伪造一个尚不存在的链接。

版本 JSON、解释、截图和本讲解是人类证据层；脚本 JSON、Vitest 结果、coverage summary、GitHub Actions 和 tag 是机械证据层。人类文档可以告诉 reviewer 为什么这些门必要、输入输出如何流动，但不能覆盖退出码。反过来，测试通过也不能把成熟度自动升级为生产级：E1-E10 只闭合 Node 单仓，真实 Java jar、真实 mini-kv CLI、无写证明和一键跨项目报告仍属于 C1-C4。

## Runtime and browser boundary / 运行时与页面边界

虽然本版不改运行时代码，closeout 仍要验证现有入口没有被配置和 CI 改动破坏。构建后的 `dist/server.js` 只在选定的空闲端口启动，记录精确 PID，环境固定 `UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`。HTTP smoke 检查根页面、`/health` 与 `/api/v1/metrics`，metrics 中 Java 和 mini-kv 请求计数应为零；release evidence 路由必须继续给出可归档证据，同时 `executionAllowed` 保持 false。验证后只停止该 PID，不使用按进程名清空所有 node.exe 的做法，避免再次影响 MCP 或用户其他任务。

Playwright MCP 访问同一个受控服务，以桌面视口确认页面可见、没有横向溢出、脚本和关键按钮存在，上游状态明确显示 disabled。截图写入 `d/2190/图片`，和文字解释、evidence JSON 分开保存。浏览器检查的意义不是证明新 UI 功能，而是作为 E7/E5 的端到端抽样：入口文档说默认不触碰上游，页面和 metrics 也必须呈现同一事实。若访问产生 favicon 404，可记录为既有非关键请求；脚本异常、主要接口非 200、上游计数非零或页面空白都属于阻塞问题。

## Safety boundary / 安全边界与失败条件

`.env.production.example` 是刻意不可运行的边界清单：probe/action 为 false，访问执行为 true，token secret、IdP/JWKS 与 audit URL 留空，audit kind 选择 `managed-unimplemented`。这看似矛盾，实际表达的是“生产环境若没有身份执行必须失败，但外部身份和存储尚未接入，因此整体不能启动为生产服务”。模板不提供示例秘密，也不暗示开发 header 已成为可信身份。`.env.example` 则服务本地安全启动，所有敏感能力仍默认关闭。

本版的失败条件是可操作的：coverage 低于任一下限失败；lint 超过 261 失败；出现一个未精确豁免凭据信号、非空环境秘密、stale waiver 或配置事实缺口失败；归档任一预算超限、根缺失、重叠或符号链接失败；renderer 出现第四个 waiver 或一个 non-waived 文件失败；任意 `src` 文件达到 801 行失败；README 声称 C1-C4 已完成或生产已授权失败；全量 suite、build、HTTP smoke、浏览器检查、tag 或 CI 任一缺失都不能请求外部 PASS。更不能通过修改旧 fixture、测试期望、waiver digest 或预算数值来迎合失败。

安全扫描没有网络访问，不会验证真实供应链漏洞数据库；归档 census 也不是备份系统。这两个门分别回答“仓库是否出现明显秘密/危险默认”和“受治理证据是否越界增长”，不会被描述成它们没有做到的事情。依赖更新仍由 Dependabot 与 Node CI处理，灾难恢复、生产 secret provider、managed audit 和真实跨项目联调仍由后续独立计划承担。

## Test coverage / 测试覆盖与验证顺序

验证从窄到宽，先运行三个新脚本测试和 closeout 文档/ratchet 测试。安全测试的负例动态拼出合成 AWS key，避免扫描器把自己的测试源当成泄漏；归档负例使用系统临时目录并在 finally 删除；文档测试检查 E1-E10、waiver 总表、成熟度句子和默认 false 示例。这一层快速发现参数解析、JSON 输出、路径规范化和事实漂移。随后执行 typecheck、完整 lint、security scan、archive census、renderer census 与 source-size census，证明门在真实树上成立。

最终 `npm run test:coverage -- --maxWorkers=2` 覆盖完整测试集和全部 `src/**/*.ts`，不是用 focused tests 替代 full suite。最多两个 worker 是资源边界：此前高并发 Vitest worker 曾占用数 GB 内存，降低并发只影响耗时，不缩小测试文件集合。coverage 输出给出最终 statements/branches/functions/lines，用它核对 94/86/97/94。之后 build、HTTP smoke 与 Playwright 验证发布工件；提交前再跑涉及最终数字的文档测试和两个 CLI，确保截图和讲解加入后 archive census 仍绿。

本次完整 coverage 最终以退出码零结束，共通过 550 个测试文件和 1674 项测试，墙钟为 2225.2 秒；statements 95.92%、branches 87.59%、functions 98.64%、lines 95.88%，四项都超过新下限。第一次尝试没有断言失败，而是外层命令在三十分钟时返回 124，并连同 Vitest 树一起停止；当时 `coverage/` 只有中间文件且没有 summary，因此先验证无遗留 orderops-node/Vitest 进程、删除该临时目录，再以同样的 2-worker、同样阈值和测试预算重跑，仅把外层等待扩到九十分钟。这个处置把编排 timeout 与代码失败分开，没有修改测试来迎合结果。

Git 提交按责任分成质量门与收口证据，单个 commit 保持在治理预算内。Claude 留在工作区的 AGENTS、Node brief 和 Java brief 评审追加由用户明确要求在本版提交；它们只记录规则与评审结果，本会话不因此操作 Java 仓库。tag `v2190` 指向所有 closeout 文件齐备的提交，push 后等待 Node Evidence 终态。CI 失败会阻塞外部评审，不能继续 capstone；CI 变绿后也只说明“可提交 review”，最终 PASS 仍由外部 reviewer 从 fresh evidence 授予。

## One-sentence summary / 一句话总结

v2190 没有再堆一层功能，而是用收紧的 coverage 与 lint 棘轮、精确到路径和摘要的安全扫描、分层归档预算以及一致的成熟度文档，把 Node 单仓从“许多阶段分别做完”推进到“E1-E10 可由同一组命令复现且任何回退都会机械失败”，同时明确把真实三项目联合执行留给外部 closeout PASS 之后的 C1-C4。
