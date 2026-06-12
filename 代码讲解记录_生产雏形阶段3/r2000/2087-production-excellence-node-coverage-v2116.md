# v2116 Node 生产卓越 N2 覆盖率门禁代码讲解

## Goal and Non-goal / 目标与非目标

v2116 的目标是把 Node 项目的测试从“能跑完”提升到“在 CI 中持续度量并阻止覆盖率倒退”。上一版 v2115 已经完成了测试超时统一、ESLint 基线和 CI lint 接入，但它仍然只证明 Vitest 测试通过，没有让覆盖率成为版本准入条件。N2 要补上的不是一个新业务能力，而是一条工程治理能力：任何后续版本无论继续重构 renderer、拆分巨型文件，还是推进生产边界文档，都不能在没有显式决策的情况下悄悄牺牲核心源码覆盖面。

非目标同样重要。本版没有修改运行时业务语义，没有打开 upstream probes/actions，没有启动 Java 或 mini-kv，也没有改变跨项目证据 schema。覆盖率门禁只作用在本仓库的 Node CI 和本地验证命令上。Java 与 mini-kv 仍可并行推进自己的质量版本，因为 Node v2116 不消费新的上游证明，不要求它们产出新文件，也不改变它们需要响应的契约。这个边界让 N2 保持为纯 Node 工程质量版本，而不是伪装成跨项目集成版本。

本版的另一个目标是把命令契约讲清楚。最初把 GitHub Actions 的 Test step 从 `npm test` 改成 `npm run test:coverage` 后，完整 coverage 跑出了大量 readiness 失败。那些失败不是业务逻辑坏了，而是旧的 CI 证据服务仍把 `npm test` 当成唯一合法测试命令。v2116 没有改测试断言来“适配失败”，而是追到真实源头：workflow evidence、CI command profile、CI hardening packet，以及更早的 rehearsal guard security-maintenance 证据都需要承认 coverage 命令是现行测试命令。修完以后，下游 v250 到 v283 的旧 readiness 链自然恢复，这说明修复点落在契约源头，而不是在后续版本里硬塞 ready 状态。

## Entry Points / 入口

第一组入口是 `package.json` 和 `vitest.config.ts`。`package.json` 新增 `test:coverage`，命令为 `vitest run --coverage`。这样本地、CI 和文档都能引用一个稳定脚本，而不是在多个地方重复写 Vitest 参数。`vitest.config.ts` 新增 `coverage` 配置，指定 provider 为 `v8`，include 为 `src/**/*.ts`，reporter 为 `text`、`html`、`json-summary`，输出目录为 `coverage`。这些选择贴合当前项目：Node 运行环境已经是现代版本，V8 覆盖率无需额外 Babel/Istanbul 转译；`src/**/*.ts` 排除了测试文件，避免覆盖率被测试工具自身稀释；`json-summary` 给后续自动化归档留下结构化入口。

第二组入口是 `.github/workflows/node-evidence.yml`。CI 的 Test step 从 `npm test` 改为 `npm run test:coverage`，这意味着 coverage 不只是开发者本地可选命令，而是主证据 workflow 的必经门。这个改法有意没有删除 `npm test` 脚本：普通测试仍然可作为快速本地命令存在，但 CI 以覆盖率命令为准。这样既保留开发 ergonomics，也让生产前治理线更硬。

第三组入口是证据服务。`workflowEvidenceVerification.ts` 新增测试命令识别函数，允许 workflow 包含 `npm test` 或 `npm run test:coverage`。这是兼容层，因为历史上 workflow evidence 的职责是证明“有测试步骤”，不是绑定某个永远不变的 npm script 名称。`ciEvidenceCommandProfile.ts` 则把当前推荐命令明确改成 `npm run test:coverage`，并把期望结果从“Vitest exits with code 0”升级为“Vitest exits with code 0 and coverage thresholds pass”。`ciEvidenceHardeningPacket.ts` 同步 full-test expectation，避免上层 hardening packet 继续引用旧测试语义。

第四组入口是 `managedAuditManualSandboxConnectionRehearsalGuard.ts`。它看起来像旧版本链路，但这次是关键点：该服务读取当前 `.github/workflows/node-evidence.yml` 来证明 Node v249 的 security maintenance evidence 是否完整。workflow 改成 coverage 后，它原来扫描 `npm test` 的 snippet 就会失败，继而让 Node v250 rehearsal guard blocked，再一路影响 v251、v252、v253，直到 v283。把它的 Node CI test snippet 改成 `npm run test:coverage` 后，旧链路恢复了对当前 workflow 的正确理解。

## Response Model / 响应模型

v2116 不新增 HTTP 响应模型，但它改变了多个现有证据响应中的“测试命令事实”。`/api/v1/ci/workflow-evidence-verification` 的 `checks.testPresent` 仍然是布尔值，语义保持“workflow 有测试步骤”，只是判定逻辑更宽：旧的 `npm test` 和新的 `npm run test:coverage` 都能满足条件。这样外部消费者不用理解脚本名字迁移，只需要看 testPresent 是否为 true。

`/api/v1/ci/evidence-command-profile` 的响应更具体。它的 commands 数组中 `id: "test"` 的 command 现在是 `npm run test:coverage`，description 指向 coverage gates，expectedResult 也要求 thresholds pass。这个响应是当前 CI 命令画像，不是历史兼容层，所以它应该明确说出当前推荐命令。HTTP smoke 已验证该 endpoint 返回 `valid=true`，并且 test command 正是 `npm run test:coverage`。

`/api/v1/ci/evidence-hardening-packet` 通过 evidence expectations 引用 full-test。v2116 让这个 expectation 的 command 和 expectedEvidence 同步覆盖率门禁。这里的响应模型变化很小，但很有价值：如果将来有人审阅 hardening packet，不会看到 CI workflow 已经跑 coverage，而 packet 仍要求 plain test 的不一致状态。

最后是 rehearsal guard 的内部响应。它暴露的 `sourceNodeV249.expectedSnippets` 现在记录 `node-ci-test` 期望文本为 `npm run test:coverage`，`nodeV249SecurityMaintenanceReady` 恢复 true，`readyForManagedAuditManualSandboxConnectionRehearsalGuard` 恢复 true。这个变化没有改变旧版本目标，只是让旧版本的“当前 workflow 文件仍覆盖主要构建”判断随现行命令演进。

## Upstream Evidence and Config / 上游证据与配置

本版没有新鲜 Java 或 mini-kv evidence。计划文件中 N2 明确是 Node 本地 coverage 版本，因此 Java 和 mini-kv 可以继续按各自 playbook 并行推进。Node 只读取本仓库中的 workflow、package、Vitest 配置和历史证据服务。HTTP smoke 也在 `UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false` 下运行，release readiness gate 返回 `executionAllowed=false`，证明本版没有跨越生产执行边界。

配置方面，coverage thresholds 不是凭空拍数字。第一次完整 coverage 测得 statements 95.81%、branches 87.38%、functions 98.38%、lines 95.77%。门槛设置为 statements 93、branches 85、functions 96、lines 93，等价于按真实基线保留约两点缓冲并向下取整。这个策略兼顾两点：第一，首次门禁不会因为 runner 上微小波动导致大量无效失败；第二，后续如果大面积删除测试或绕开关键分支，阈值会立刻拦住。

阈值没有直接设置成当前百分比，是因为这个仓库的测试体量已经很大，覆盖率统计会受到运行环境、V8 版本、未执行 server 入口、生成型路由文件等因素影响。把阈值压到完全贴线，会让门禁在第一天就变成噪声源；把阈值放得太低，又等于只生成报告不进行治理。两点缓冲是一个务实折中：它承认当前基线已经很高，也承认后续大版本拆分和 renderer 合并会移动覆盖率分母。后续版本如果自然抬高覆盖率，可以在单独版本里提高阈值；如果覆盖率下降，则需要解释是测试盲区、删除无用代码，还是统计口径变化。N2 先把“必须解释”这个工程动作固定下来。

另一个配置取舍是保留 html reporter 但不提交 `coverage/`。html 对本地排查非常有用，尤其是找低覆盖的 route shell、client 错误分支、server 启动入口时，开发者可以打开目录逐文件看未覆盖行。但它是生成物，体积和变动噪声都不适合进 git。提交的是 `json-summary` 中抽取出来的版本证据和阈值配置，既能支持审计，又不会把仓库变成报告仓库。

证据输出保留在 `e/2116/evidence/` 下，包含 JSON 与 Markdown。JSON 记录覆盖率分子分母、阈值、修改文件、验证命令和 smoke 结果；Markdown 给人工审阅一个短版索引。coverage html/json-summary 本身不提交，因为它们是生成物，会在收尾清理中删除。这样仓库保留决策证据，不保留大体量临时报告。

## Service Flow / 服务流程

本版的执行流程可以拆成五段。第一段是工具接入：安装 `@vitest/coverage-v8`，新增 `test:coverage` 脚本，配置 Vitest coverage。第二段是基线测量：先在没有阈值阻断的情况下跑完整 suite，得到真实覆盖率。第三段是阈值落地：把四类覆盖率写进 `vitest.config.ts`，并让 CI Test step 跑 coverage。第四段是证据链修正：workflow verifier、command profile、hardening packet、rehearsal guard 和相关测试一起迁移到 coverage 命令。第五段是 closeout：聚焦测试、完整 coverage、typecheck、lint、build、HTTP smoke、文档和归档证据。

这里最值得记录的是第三段到第四段之间的失败处理。coverage 命令第一次带阈值跑时，大量 readiness 测试变成 blocked。表面上看像是几十个业务 profile 同时退化，但逐层打印 v283、v282、v281、v275、v270、v260、v250 后，根因收束到 `managedAuditManualSandboxConnectionRehearsalGuard.ts` 的 Node v249 security-maintenance snippet。也就是说，问题不是 downstream ready 判定坏，而是一个早期维护证据仍扫描旧 workflow 命令。修复这一处后，v250 ready，v283 ready，聚焦测试通过。这个排查路径保护了代码质量：没有改一堆下游断言，也没有给旧版本链条开后门。

这次排查也说明，当前项目虽然有大量历史版本 profile，但它们不是简单静态文档。很多服务会读取当前仓库里的 workflow、dependabot、计划和归档文件，再把这些 live facts 编入历史版本语义。这个设计有优点：当前 CI 安全边界一旦破坏，旧的 rehearsal guard 能立刻报出风险；也有代价：当测试命令从 plain test 升级为 coverage test 时，旧证据消费者必须清楚哪些字段表达“测试存在”，哪些字段表达“当前推荐命令”。v2116 的修复就是沿着这个边界做的。它没有让旧链路无条件通过，而是让旧链路重新识别当前 workflow 的测试步骤。

从维护角度看，这类故障以后还会出现。例如未来把 `npm run test:coverage` 再拆成 `npm run test:unit:coverage` 与 `npm run test:integration`，workflow verifier 也许仍应接受多种测试组合，而 command profile 则应指向新的标准组合；如果未来引入覆盖率上传或 artifact retention，hardening packet 需要增加上传边界，但 rehearsal guard 仍不应该要求生产 secret 或部署权限。也就是说，命令迁移不是字符串替换，而是证据消费者的职责重新校准。

另一个流程细节是兼容和当前事实分离。`workflowEvidenceVerification.ts` 接受 `npm test` 或 `npm run test:coverage`，因为它的抽象是“workflow 是否运行测试”；`ciEvidenceCommandProfile.ts` 只写 `npm run test:coverage`，因为它的抽象是“当前标准 CI 命令是什么”。这两个地方看似都处理测试命令，但职责不同，不能为了省事抽成同一个硬编码常量。保留这层差异使未来命令再次迁移时也能自然处理历史兼容。

## Safety Boundary / 安全边界

v2116 的安全边界保持保守。coverage 运行会生成 `coverage/`，build 会生成 `dist/`，smoke 会生成 `.tmp/v2116-smoke-out.log` 和 `.tmp/v2116-smoke-err.log`，这些都属于任务中间产物，收尾时删除。HTTP smoke 只绑定 loopback 地址，端口 4190，日志 silent，upstream probes/actions 都为 false。smoke 检查 release readiness gate 时确认 `readyForReleaseEvidenceArchive=true` 且 `executionAllowed=false`，这说明它只验证只读发布证据门，不触发任何上游动作。

coverage 命令本身也没有扩大权限。它会读取源码、测试、fixture 和历史证据文件，会生成本地报告，但不会写业务状态、不会发起上游 HTTP 调用、不会启动 Java 或 mini-kv。由于项目里存在大量“只读验证”和“执行仍阻断”的 profile，本版特别保留了 release readiness gate 与 workflow evidence 的 smoke 检查，确保“测试命令升级”没有被误解成“执行能力升级”。这个边界对于后续生产级分片执行尤其关键：在真正引入 live shard preview 或 read-only cross-project consumption 前，CI 可以越来越强，但 runtime authorization 不能被顺手打开。

本版也没有把历史归档中的旧 `npm test -> ...` 文本批量替换。那些文本属于旧版本真实归档，改掉反而会破坏历史证据。真正需要更新的是读取当前 workflow 的 live 证据服务，以及当前 CI 命令画像。这个边界避免了“为了新规则重写旧历史”的维护风险。

依赖方面只新增 devDependency `@vitest/coverage-v8`，没有新增运行时 dependency。`fastify` 等业务运行依赖不变，server 启动路径不变，客户端超时和 upstream disabled 默认值不变。package-lock 变化主要来自 npm 解析 coverage provider 及 Vitest 相关包，属于测试工具链变动，不进入运行时路径。

## Test Coverage / 测试覆盖

聚焦测试覆盖了这次最容易出错的证据链：workflow evidence、workflow 文件断言、dependabot 对 workflow 的敏感性、CI command profile、CI hardening packet、production readiness summary index、approval-required readiness routes、credential resolver implementation plan draft，以及 rehearsal guard。结果为 9 个文件、23 个测试通过。这个组合专门防止 `npm run test:coverage` 只在 workflow 里存在，却没有被旧证据消费者接受。

完整 coverage 跑了 524 个测试文件、1612 个测试，全部通过。最终覆盖率为 statements 95.81%、branches 87.38%、functions 98.38%、lines 95.77%，均高于阈值。Vitest 在覆盖率摘要之后打印了一条 worker shutdown timeout notice，但命令退出码为 0，所有测试和阈值通过；随后 typecheck、lint、build、HTTP smoke 均通过。因此它被记录为 runner shutdown 提示，而不是业务失败。

从覆盖率分布看，项目总体数值很高，但不是没有盲区。`server.ts` 因为主要靠 build/smoke 覆盖，单元 coverage 为 0；部分外部 client、operation dispatch、dashboard/order platform route 的分支覆盖低于全局平均。这不影响 N2 门禁落地，因为全局阈值先保护整体回归；但它给 N4/N5 后续版本提供了路线：观测指标、client 错误分支、route shell 的失败路径，都可以在功能推进时顺手补测试。更重要的是，覆盖率报告现在能稳定生成，后续不需要靠感觉判断哪里薄弱。

lint 仍保持 v2115 建立的基线：0 errors / 263 warnings。N2 没有尝试顺手消掉 warning，因为那会把 coverage 门禁版本变成大范围 lint cleanup，降低审阅清晰度。后续 N5 才是 warning burn-down 和大文件拆分的主战场。本版只保证新增或修改的覆盖率契约不会引入 ESLint error。

## One-sentence Summary / 一句话总结

v2116 把 Node 的主 CI 测试升级为带 V8 覆盖率阈值的 `npm run test:coverage`，并修正所有当前证据消费者对测试命令的理解，让覆盖率门禁成为后续重构和生产前治理的稳定底座。
