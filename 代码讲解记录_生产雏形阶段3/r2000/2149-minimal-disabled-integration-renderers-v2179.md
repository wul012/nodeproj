# v2179 代码讲解：minimal read-only 与 managed-audit-disabled renderer 标准化

## Goal and Non-goal / 目标与非目标

v2179 的目标是继续推进 N1 renderer consolidation，把五个相邻的 read-only / disabled integration 报告 renderer 迁到 `renderVerificationReportMarkdown`。上一版 v2178 已经把 read-only cross-project readiness runner、minimal regular gate、smoke rehearsal 和 gate execution 收进 builder，并且远端 CI run `28871397293` 已经完整通过。v2179 在这个绿色基线上继续收敛剩余 renderer：window readiness cut、smoke rerun archive、operator/CI regular gate handoff、managed-audit-disabled read-only integration intake、managed-audit-disabled read-only integration decision record。

这五个文件适合放在同一版，是因为它们的报告骨架非常接近。每个 renderer 都先输出服务名、生成时间、profile version、状态、决策、active/source Node version、只读边界字段，然后展开 source evidence、当前 stage record、checks、summary、blocker、warning、recommendation 和 next action。它们不是全新的业务能力，而是同一批 read-only integration 治理报告的不同阶段：先判断窗口是否可进入，再归档 rerun evidence，再交给 operator/CI handoff，随后进入 managed-audit disabled intake 和 decision record。

本版非目标很清楚。它不修改任何 loader 的判定逻辑，不改 route path，不改 schema，不改 fixture，不改 access guard，不启动 Java，不启动 mini-kv，也不把 read-only 或 managed-audit-disabled 阶段升级为真实执行。报告中的状态值仍然由 profile 生成器决定；renderer 只负责把 profile 变成 Markdown。换句话说，v2179 是结构治理版本，不是 runtime integration 版本。

这个版本的工程价值在于减少重复报告骨架，同时保留领域行的可读性。如果继续让每个 renderer 自己拼数组，剩余 19 个 renderer 的每次迁移、CI 修复、路径归一化和空列表文案都要重复审查；如果过度抽象，把 read-only requirement、target result、frozen contract、intake input、decision input 都塞进一个万能 renderer，又会让业务含义变模糊。v2179 选择中间路线：section 框架统一，领域行 helper 保留。

这里还需要说明为什么 v2179 不再继续扩大到 sandbox handle review 家族。虽然那些 renderer 也在剩余列表里，但它们的语义已经从 minimal read-only integration 转向 sandbox handle prerequisite、packet gate 和 contract decision。如果把两个家族混在同一版，测试和讲解都会变成“什么都碰一点”，审查者很难判断输出指纹到底保护了哪个阶段。v2179 因此只吃掉 read-only integration 后半段和 managed-audit-disabled 前半段，形成一个清楚的版本故事：上一版证明 minimal gate/smoke/gate execution，当前版证明窗口切换、rerun archive、operator/CI handoff 与 disabled intake/decision record，下一版再进入 sandbox handle review。

## Entry Points / 入口

第一个入口是 `renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutMarkdown(...)`。它接收 window readiness cut profile，展示 Node v344 source archive、readiness cut、Java read-only requirements、mini-kv read-only requirements、environment handles、forbidden operations、checks 和 summary。迁移后，顶层 meta 进入 builder 的 `meta` 数组，`Source Node v344` 和 `Readiness Cut` 进入 `entries` section，需求、环境 handle 和 forbidden operation 继续由本地 helper 渲染成领域句子。

第二个入口是 smoke rerun archive renderer。它保留 `renderTargetResult(...)`，因为 target result 不是普通 key-value：一个 target 下有 targetName、status、readOnly、mutatesState、attempted、latencyMs、statusCode、responseShape、errorCode、errorMessage 等子字段。如果把它们拆散到通用 entries，审查者很难一眼看出某个 target 的完整结果。因此 v2179 只把 section 外壳和 message/list 交给 builder，target result 的多行格式仍由本地 helper 负责。

第三个入口是 operator/CI regular gate handoff renderer。这个报告有两个特别 section：`Frozen Contracts` 和 `Source Archive References`。前者展示 read-only integration contract 与 shard-readiness contract 的冻结状态、path、digest、required field count 和规则字段；后者展示 archive file reference 的 exists、bytes、digest。v2179 保留 `renderContract(...)` 与 `renderArchiveFileReferences(...)`，因为这些行是交接材料的核心证据，不适合被压成不透明对象。

第四和第五个入口是 managed-audit-disabled intake 与 decision record renderer。它们的结构相似：都有 source Node evidence、necessity proof、输入列表、record、checks、summary 和消息区。intake renderer 负责展示 disabled read-only integration 的输入和 closed scopes；decision record renderer 负责展示 next stage decision 的 decision inputs。迁移后，输入列表仍由 `renderInput(...)` 或 `renderDecisionInput(...)` 输出多行块，closed scope 也继续由本地 helper 输出 status 和 reason。

这些入口共同体现了一个维护约束：renderer 的职责是“忠实摆放 profile”，不是“重新解释 profile”。例如 window readiness cut 的 Java/mini-kv requirement 已经由 loader 判断只读与 mutation 边界，renderer 不再重新推导；operator/CI handoff 的 frozen contract 是否存在、digest 是否缺失，也已经由 profile 生成阶段决定，renderer 只展示。这样做可以避免两个判断源：如果 renderer 也开始根据字段值改 decision 或生成 blocker，未来测试会很难区分是 loader 退化还是 renderer 越权。

## Response Model / 响应模型

迁移前后响应模型保持 Markdown 字符串。H1 标题不变，H2 section 名称不变，meta label 不变，空列表文案不变，尾部换行也保持。新增 parity 测试分别锁定五个 normalized fingerprint：window readiness cut 长度 7062，smoke rerun archive passing 长度 5369，operator/CI handoff 长度 8943，disabled intake 长度 6304，disabled decision record 长度 6315。五个 case 都保持 1 个 H1，H2 数分别为 12、9、11、11、10，H3 为 0。

builder 输出的 meta 区域让状态扫描更一致。比如 window readiness cut 的 meta 展示是否 performs live probe、是否 starts Java、是否 starts mini-kv、是否 sends Java HTTP request、是否 opens mini-kv TCP socket、是否 reads managed audit credential；smoke rerun archive 展示 external read window 与 live probe performed；operator/CI handoff 展示 contract freeze included、ready for parallel Java/mini-kv、ready for Node v370；disabled intake 和 decision record 展示 managed audit disabled、secret provider、resolver client、runtime shell 等边界字段。字段值仍来自 profile，不由 renderer 推导。

section 区域保持原来的证据阅读路径。审查者看 window readiness cut 时，先看 source Node v344，再看 readiness cut，再看 Java/mini-kv requirements 和 forbidden operations；看 smoke rerun archive 时，重点是 rerun archive 和 target results；看 operator/CI handoff 时，重点是 frozen contracts、parallel shard readiness plan 和 source archive references；看 disabled intake/decision 时，重点是 necessity proof、inputs、record 与 checks。这些顺序是报告合同的一部分，所以迁移时逐段保留。

消息区由 builder 统一处理。Production Blockers、Warnings、Recommendations 和 Next Actions 在五个 renderer 里本来都使用相同的 empty text，但过去依赖 `liveProbeReportUtils` 或手写数组。v2179 让它们进入 builder 的 `messages` / `list` section，减少重复导入和重复空列表处理。这样后续如果项目需要统一 message 输出格式，只需要改 builder，不需要逐个 renderer 搜索替换。

从实际输出看，这五个 renderer 的差异主要体现在“多行证据块”而不是“报告骨架”。target result 需要父行和缩进行，frozen contract 需要把 contract version 作为父行再列出 path、exists、digest 和规则字段，intake/decision input 需要把 id 与 label 作为父行再列 source、status、notes。builder 对这些多行块只负责放进正确 section，不试图理解内部结构。这让响应模型保持透明：通用层处理版式，领域层处理证据语义，审查者能沿着 section 标题直接定位自己关心的证据。

## Upstream Evidence / 上游证据

本版开始前先确认 v2178 远端 CI 已绿。这个前置很重要，因为 v2177 曾经修过 CI-only 的路径归一化问题，如果上一个版本没有远端通过就继续迁移，会把“上一版比较面问题”和“本版输出漂移”混在一起。v2179 的 evidence JSON 明确记录了 precondition：run `28871397293` 通过。

本版没有要求 Java 或 mini-kv 产出新证据。虽然报告内容涉及 Java read-only requirements、mini-kv read-only requirements、parallel shard readiness plan 和 disabled managed audit 边界，但这些都是 Node 当前 profile 已经生成的本地审查材料。测试里仍设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK`，确保在没有 sibling workspace 的 GitHub runner 上也能稳定比较 Markdown。

上游 evidence 还包括现有业务测试。五个候选 renderer 对应的原有测试已经覆盖 route JSON/Markdown、blocked/fail-closed 分支、pending 分支、passing target 分支或 archive unavailable 分支。v2179 没有替换这些测试，而是在它们旁边新增 migration parity。这样业务测试负责证明 loader/route 语义仍通，parity 测试负责证明 renderer 输出骨架没有漂。

这里的 forced fallback 不是形式主义。Node 项目在本地常常能看到 sibling workspace，但 GitHub runner 通常只看到 committed fixture；如果 parity 依赖本地 sibling 路径或本地文件存在状态，就会出现本地绿、远端红的情况。v2174 到 v2177 已经连续修过几类 path/digest/metadata 噪声，所以 v2179 从一开始就把 historical fallback 作为测试默认上下文，避免再把 runner 差异带进新迁移。

新增归档材料分三层：`d/2179/evidence/minimal-disabled-integration-renderers-v2179-summary.json` 记录机器证据、指纹、census 和命令；`d/2179/解释/minimal-disabled-integration-renderers-v2179.md` 给审查者解释版本范围与下一步；本文件给维护者讲清楚每个 renderer 的入口、保留 helper 的原因和安全边界。三者互相补足，不把所有信息挤进一个文件。

## Service Flow / 服务流向

运行时服务流没有改变：HTTP route 调 loader，loader 生成 profile，renderer 输出 Markdown。JSON 响应仍直接来自 profile，所以 v2179 对 JSON route 没有影响。Markdown route 只是调用同名 renderer 函数，函数签名和返回类型都没有变化。因此上层 route table、access header、auth config、managed audit store config 都不需要改。

在 renderer 内部，v2179 把流程分成三步。第一步是把顶层字段列进 `meta`，由 builder 统一渲染成 `- Label: value`。第二步是把大块证据列进 `sections`，普通 object 使用 `entries`，普通字符串数组使用 `lines`，消息数组使用 `messages`，下一步列表使用 `list`。第三步是保留领域 helper 输出那些无法自然表达成普通 entries 的多行块，例如 target result 和 frozen contract。

这种分层让代码更容易维护。以前一个 renderer 里常常是几十行数组拼接，空字符串、H2 标题、renderEntries、renderMessages、renderList 混在一起；以后维护者可以先看 `meta` 得知顶部扫描字段，再看 `sections` 得知报告结构，最后看本地 helper 得知领域行格式。对剩余 19 个 renderer 来说，这个形态已经成为可复制模板。

服务流里最敏感的是“只读报告”和“真实执行”的边界。window readiness cut 和 smoke rerun archive 会提到 Java HTTP、mini-kv TCP、live probe、managed audit credential 等概念；operator/CI handoff 会提到 parallel shard readiness；disabled intake/decision 会提到 provider client 和 runtime shell。但 renderer 没有引入任何执行能力，它不 import HTTP client、不 import child process、不读取 secret、不打开 socket，只把 profile 已有字段展示出来。

这也是为什么 v2179 没有把 `liveProbeReportUtils` 作为长期共同依赖继续保留在这些文件里。那些 helper 可以输出 entries、messages 和 list，但它们本质上是另一个并行报告工具集；当 verification report builder 已经承担统一 section 输出时，继续混用两个工具会让维护者不确定“新 renderer 应该 import 哪个”。本版把通用报告骨架收敛到 builder，局部 helper 只服务于当前领域对象，依赖方向更清楚。

## Safety Boundary / 安全边界

第一条安全边界是输出 parity。新增 `test/rendererMigrationV2179Parity.test.ts` 对五个 renderer 都做 normalized length、sha256、H1/H2/H3 和尾部换行检查。normalized 比较会折叠 generatedAt、路径和部分环境噪声，但不会折叠业务字段、section 顺序、状态值、decision 文案或 warning/recommendation 文本。因此如果迁移误删一行、调换 section、改了空列表文案，测试会失败。

第二条安全边界是 census ratchet。`test/rendererCensusScript.test.ts` 从 221/24 收紧到 226/19，并设置 `--max-unstandardized=18` 的负向门。这样 N1 的进度不会只存在于 changelog 或口头说明里，而是进入会失败的机械检查。未来如果有人新增手写 renderer 或把 builder import 去掉，census 会直接暴露回退。

第三条安全边界是保留领域 helper。v2179 没有为了“看起来更统一”而把所有 helper 删除。`renderTargetResult(...)`、`renderContract(...)`、`renderInput(...)` 等 helper 保留，是因为它们输出的不是简单对象，而是报告合同里的多行证据块。真正需要统一的是 section 骨架和 message/list 形态，不是每个业务对象的语义表达。

第四条安全边界是不写 sibling repo。Node 本版不编辑 Java 或 mini-kv，不消费新鲜未提交文件，不要求另两个项目等待。证据里明确标注 `javaMiniKvParallelRecommended: true`，避免把 renderer 迁移误读成跨项目审批门。只有未来 live integration capstone 才需要写清楚服务启动、端口、owner 和 cleanup。

第五条安全边界是不在红 CI 上推进。v2179 开始前确认 v2178 CI 绿；如果 v2178 红，本应先修红而不是继续做新迁移。这个节奏看似慢一点，但它保持历史可解释：每个版本要么是功能迁移，要么是针对已知红 CI 的修复，不把多个失败原因叠在同一条远端流水线上。

第六条安全边界是本版没有删除任何原有业务测试。迁移 renderer 时最容易犯的错误，是觉得 parity 已经足够，于是只保留指纹测试。实际上 parity 只能证明某个固定 profile 输出稳定，不能替代 fail-closed、pending、route header、archive unavailable 这些语义覆盖。v2179 同时跑新 parity 和五个原有测试，就是为了让“输出不变”和“业务路径仍通”两条证据链并存。

## Test Coverage / 测试覆盖

第一组测试是 focused 业务回归加新 parity：`npx vitest run test/rendererMigrationV2179Parity.test.ts test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut.test.ts test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.test.ts test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.test.ts test/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.test.ts test/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.test.ts --maxWorkers=2`。结果是 6 个文件、16 个测试通过，覆盖了本版五个 renderer 的主路径和原有 route/profile 断言。

第二组测试是 census 与 v2179 parity 小门：`npx vitest run test/rendererCensusScript.test.ts test/rendererMigrationV2179Parity.test.ts --maxWorkers=2`，结果是 2 个文件、3 个测试通过，并且负向门打印了预期的 regression 文案。配套脚本 `npm run renderer:census -- --json --max-unstandardized=19` 输出 226 个 standardized renderer 和 19 个 unstandardized renderer。

第三组测试是历史 migration 回归：`npx vitest run test/rendererMigrationV2167Parity.test.ts test/rendererMigrationV2168Parity.test.ts test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts test/rendererMigrationV2175Parity.test.ts test/rendererMigrationV2176Parity.test.ts test/rendererMigrationV2178Parity.test.ts test/rendererMigrationV2179Parity.test.ts --maxWorkers=2`。结果是 8 个文件、9 个测试通过，说明 v2179 没有破坏前面几批 renderer normalizer 和 builder 迁移的比较面。

收尾还会继续跑文档质量门、typecheck、lint 和 build。文档门保证本讲解满足中文书写、章节形态和禁止硬凑要求；typecheck 保证 builder section 类型正确；lint 捕捉导入和未使用符号问题；build 证明生产编译通过。完整 CI 仍由 GitHub Actions 做最终确认，本地避免一口气跑全量 Vitest 导致历史上的大批量超时。

如果后续 v2180 继续迁 sandbox handle review 家族，测试策略应当复用本版的形态：先选择同一语义家族的 4 到 5 个 renderer，迁移前确认 v2179 CI 结果，再新增一个版本级 parity 文件，最后同步收紧 census。不要把剩余 19 个 renderer 一次性全改完，因为最后这些文件虽然都叫 renderer，但领域跨度已经变大；越到末尾，越需要让每个版本的解释能说清楚“为什么这些文件属于同一刀”。

此外，下一批如果遇到纯 section renderer，应先判断它是否应该迁入 builder、合并到父 renderer，还是登记为 waiver；不要为了数字好看而制造没有调用价值的新包装层。

## One-sentence Summary / 一句话总结

v2179 把五个 minimal read-only / managed-audit-disabled integration 报告 renderer 迁入统一 verification report builder，用 parity 和 census 证明输出合同不变、标准化进度推进到 226/245，并保持所有只读、无 sibling 写入、无真实执行的安全边界。
