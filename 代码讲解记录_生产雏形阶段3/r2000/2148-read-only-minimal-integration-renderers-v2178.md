# v2178 代码讲解：read-only / minimal integration renderer 标准化

## Goal and Non-goal / 目标与非目标

v2178 的目标是把四个 read-only / minimal integration 报告 renderer 迁到统一的 `renderVerificationReportMarkdown`，并用 parity 指纹证明迁移前后的 Markdown 合同没有漂移。它属于计划书里 N1 renderer consolidation 的连续推进版本：v2176 已经把 shard readiness / execution readiness 家族推进到 builder，v2177 修好了这批迁移在 Linux runner 上暴露出的 Markdown 路径标签归一化缺口，v2178 则继续处理更靠近只读联合验证入口的一组报告。迁移完成后，renderer census 从 217/245 标准化推进到 221/245，剩余未标准化 renderer 降到 24 个。

本版选的四个 renderer 有共同特征。第一个是 `managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerRenderer.ts`，它把 Node v326 合同、Java v150 evidence、mini-kv v142 receipt、side-effect safety matrix、checks 和 summary 汇成一个只读跨项目 readiness runner 报告。后三个属于 minimal read-only integration 家族：regular gate 定义 gate 的环境变量、header、target、failure classification 和 artifact expectation；smoke rehearsal 记录一次只读 smoke 的 target 结果；gate execution 则把外部 read window、复用的 smoke lane、gate execution 结果和 target 结果汇总给审查者。它们都只是报告层，不拥有真实启动 Java、启动 mini-kv、读取凭据或发送 managed-audit HTTP/TCP 的权限。

非目标同样明确。v2178 不修改 loader 的数据收集逻辑，不修改 profile type，不修改 route 注册，不修改 historical fixture，不修改 Java 或 mini-kv 仓库，也不把任何只读 rehearsal 改成真实执行。报告里原来表达的布尔字段、source version、check、warning、recommendation 和 next action 都必须继续由上游 profile 决定；renderer 只负责把这些值稳定地排版成 Markdown。换句话说，本版不是“让系统更接近真实执行”的业务推进，而是为后续真实执行之前的治理面清理重复代码，让同一类报告使用同一套版式规则。

这个切片的必要性来自两个方向。第一，计划书要求 N1 结束前所有可迁移 renderer 都要进入 shared builder 或给出明确 waiver，不能让 245 个 renderer 中持续存在大量手写数组拼接。第二，read-only/minimal integration 家族本身是后续 C1-C4 integration capstone 的审查前置材料。如果这些报告的版式各自维护，后续添加真实联合测试证据时很容易出现一处用 `entries`、一处手写 `- key: value`、一处空列表文案不一致的情况。先把它们收进 builder，等于把版式一致性问题提前解决。

## Entry Points / 入口

本版最重要的入口是四个导出的 renderer 函数。每个函数仍然接收原来的 profile 类型，并仍然返回一个 Markdown 字符串，只是返回值不再由本地数组手工 `join("\n")` 组成，而是交给 `renderVerificationReportMarkdown({ title, meta, sections })`。这保持了调用方的 API 不变：loader、route、测试和外部 HTTP smoke 不需要知道内部渲染方式已经替换。

`ReadOnlyCrossProjectReadinessRunnerRenderer` 的入口最能说明迁移方式。原文件原来有一个本地 `renderMessages(...)` helper，专门把 blocker、warning、recommendation 的 message 数组变成 Markdown 列表。迁移后这个 helper 被删除，因为 builder 原生支持 `messages` section 和 `emptyText`。但是 Java evidence、mini-kv receipt、side-effect matrix 这些 section 仍保留为显式 `lines`，原因是这些字段的 label 本身就是报告合同的一部分，迁移时不应把它们过度抽象到另一个新 helper 里。这里的设计取舍是：共性的 section 形态交给 builder，具体业务 label 保留在 renderer 附近，便于未来审查字段来源。

`MinimalReadOnlyIntegrationRegularGateRenderer` 的入口原来依赖 `liveProbeReportUtils` 里的 `renderEntries`、`renderList` 和 `renderMessages`。迁移后不再导入这些通用 helper，而是用 builder 的 `entries`、`list`、`messages` 能力表达同样内容。它本地保留了 `renderEnv`、`renderHeaders`、`renderTargets`、`renderFailures`、`renderArtifacts`，因为这些 helper 不是普通 key-value 输出，而是把数组里的多个业务字段组合成一条审查可读的句子。例如 target 不是简单的 id 列表，还包含 method、path、expectedStatus 和 readOnly 字段；artifact expectation 也需要把 required、path、description 绑定到同一行。保留这些局部 helper 可以让复杂业务行继续紧贴对应类型。

`SmokeRehearsalRenderer` 和 `GateExecutionRenderer` 都保留了 `renderTargetResult(...)`。这是因为 target result 的输出有多字段顺序要求：target id、attempted、status、expected status、elapsed ms、error code 等信息在审查时需要成组出现。如果强行拆成 generic entries，反而会让一个 target 的上下文散开。builder 在这里承担的是章节骨架和空列表/message 的统一处理，target result 的领域格式仍由 renderer 明确掌握。

## Response Model / 响应模型

v2178 迁移后的响应模型仍是 Markdown。第一层是 H1 标题；第二层是由 builder 输出的 meta 列表；后续是多个 H2 section。四个报告的标题文字保持原样，例如 read-only cross-project readiness runner 仍输出 `Managed audit manual sandbox connection credential resolver read-only cross-project readiness runner`，minimal regular gate、smoke rehearsal、gate execution 也保留各自完整标题。parity 测试通过 H1/H2/H3 数量约束确认层级没有误改：四个 case 分别保持 1 个 H1、10/13/9/10 个 H2，并且没有 H3。

meta 区域承担“这份报告是什么状态”的快速扫描职责。这里的字段不做业务解释，只把 profile 中已经计算好的值摆出来，比如 service、generatedAt、profileVersion、gate state、active/source version、是否启动 Java、是否启动 mini-kv、是否连接 managed audit、是否请求或读取 credential、是否解析 raw endpoint URL、是否允许 runtime shell invocation 等。迁移时这些字段的 label 和顺序被逐项搬入 `meta` 数组，目的就是让 builder 只改变生成方式，不改变阅读顺序。

section 区域承担“为什么是这个状态”的证据展开职责。readiness runner 的 section 包括 Source Node v326、Java v150 Evidence、mini-kv v142 Receipt、Side Effect Safety Matrix、Checks、Summary、Production Blockers、Warnings、Recommendations、Next Actions。minimal regular gate 的 section 包括 Source Node v350、Regular Gate、Required Env、Required Headers、Read-Only Targets、Failure Classifications、Artifact Expectations、Checks、Summary 和后续消息区。smoke rehearsal 强调 Smoke Session 和 Target Results，gate execution 则增加 Reused Node v349 Smoke Lane 与 Gate Execution。这些 section 名称没有被重命名，因为它们是审查者定位证据的入口。

builder 化后，空消息和列表由统一规则处理。比如 blocker 为空时输出 `No production blockers.`，warning 为空时输出 `No warnings.`，recommendation 为空时输出 `No recommendations.`，next action 为空时输出 `No next actions.`。这类文案以前散落在不同 renderer 或 helper 里，容易在后续维护时出现大小写、句点、列表形态不一致。v2178 把这些普通形态交给 `renderVerificationReportMarkdown`，使报告风格对齐，同时通过指纹保证没有把既有输出改坏。

## Upstream Evidence / 上游证据

本版只读取 Node 仓库内已有代码和历史 fixture，不要求 Java 或 mini-kv 给出新文件。readiness runner 中提到的 Java v150 evidence、mini-kv v142 receipt 仍由已有 profile loader 解析；本版没有改那些 loader，也没有把 sibling workspace 的实时状态写入本次迁移。测试里设置历史 fixture fallback，是为了模拟 GitHub runner 没有本地 sibling workspace 的环境，让 parity 指纹不会依赖开发机上 Java/mini-kv 目录是否存在。

v2177 的修复是 v2178 的直接上游前置。因为 read-only/minimal integration 报告里也会出现 evidence path、resolved path 或 fixture fallback 等路径信息，如果 normalizer 没有覆盖 Markdown 路径标签，本版新增 parity 很可能在本地通过、在 Linux runner 上因为绝对路径长度不同失败。先完成 v2177，再迁移 v2178，减少了“迁移正确但 CI 因路径噪声红掉”的风险。这就是为什么当前推进顺序先修 CI comparison surface，再继续功能迁移。

本版新增的证据文件是 `d/2178/evidence/read-only-minimal-integration-renderers-v2178-summary.json`。它记录了迁移范围、四个 renderer 路径、四组 normalized length / sha256 / heading count 指纹、census 数字以及已通过的本地命令。解释文档放在 `d/2178/解释/read-only-minimal-integration-renderers-v2178.md`，用于给审查者说明为什么本版只改 renderer 和测试而没有新增 route 或跨项目执行。代码讲解则放在本文件，服务于未来维护者理解迁移形态。

Java 和 mini-kv 的并行状态是 recommended parallel。也就是说，它们可以继续自己的 final-push playbook；Node v2178 不等待它们，也不要求它们消费 Node 的新输出。这个判断很重要：本版虽然名字里有 cross-project readiness 和 minimal integration，但它做的是 Node 本地 renderer 形态治理，不产生新的跨项目 contract，不改变 upstream evidence schema，也不需要真实服务启动。只有未来进入 live integration capstone 时，才需要在计划里明确 Java/mini-kv 的启动端口、owner、cleanup 和失败处理。

## Service Flow / 服务流向

运行时服务流保持原样：route 调 loader，loader 生成 profile，renderer 把 profile 渲染成 Markdown。v2178 只替换最后一步的内部实现。对于 JSON 响应，profile 对象完全不受影响；对于 Markdown 响应，builder 接收相同字段并输出相同文本骨架。也因此，本版没有修改 app route table，没有修改 access guard header，没有修改 auth 或 managed audit store 配置。

在 renderer 内部，服务流可以拆成三层。第一层是 `meta`，它把 profile 的顶层状态转为 `["Label", value]` pair。builder 会统一把这些 pair 渲染成 `- Label: value`。第二层是 `sections`，它把 profile 的领域块分成 `entries`、`lines`、`messages` 或 `list`。第三层是少量本地 helper，例如 regular gate 的 env/header/target/artifact helper 和 smoke/gate execution 的 target result helper。这样分层后，通用 Markdown 结构和领域行格式互不抢职责。

readiness runner 的服务流尤其强调 side-effect 边界。它展示 Java SQL、rollback、mini-kv write、automatic upstream start 等字段，但 renderer 不计算这些字段，也不执行任何动作。它只是把 loader 已经形成的布尔值排出来。迁移到 builder 后，这一边界更清晰：builder 没有能力调用网络、读凭据或启动进程，renderer 也没有新增任何副作用逻辑；所有动作能力仍被限制在上游 profile 生成阶段的只读数据整理中。

minimal regular gate 的服务流则强调 gate definition。Required Env、Required Headers、Read-Only Targets、Failure Classifications、Artifact Expectations 都是审查者判断“将来如何跑这个 gate”的说明，不是现在执行 gate 的命令。v2178 没有把这些内容合并成一段自由文本，而是保留分 section 输出。这样未来真正引入执行器时，可以从这些 section 反查环境变量、header、target 与 artifact 的期望，不必从一段不稳定的 prose 中解析。

smoke rehearsal 和 gate execution 的服务流更接近真实联合测试的前置形态，但仍然是报告。Smoke rehearsal 的 `Target Results` 展示 attempted、status、elapsed、error 等结果；gate execution 的 `Reused Node v349 Smoke Lane` 对 null 情况保留原句 `No smoke lane was executed because the explicit read window was not available.`。这个条件 section 是本版需要小心处理的地方：builder 支持 sections 数组中按条件选择 `lines` 或 `entries`，因此既能保留 null 分支文案，又能在有 smoke lane 时照旧输出 key-value entries。

## Safety Boundary / 安全边界

第一条安全边界是 parity 优先。v2178 没有因为迁移到 builder 就凭肉眼判断“看起来一样”。新增测试对四个代表性 profile 做 normalized length 和 sha256 检查，并额外检查 heading count 与尾部换行。长度能捕捉遗漏行和多余空行，sha256 能捕捉同长度文本替换，heading count 能捕捉 section 层级漂移。三者一起让迁移后的 Markdown 合同可复现。

第二条安全边界是不改测试期望来掩盖业务变化。指纹是根据迁移前后稳定比较面计算出来的；如果 renderer 迁移改变了业务字段、section 顺序或空列表文案，测试会要求先解释为什么输出合同应该改变。本版没有这种合同变更，因此所有 expected fingerprint 都代表“迁移后仍与旧输出一致”的稳定面，而不是接受一个新的业务输出。

第三条安全边界是不扩大执行能力。四个报告都带有“是否启动 Java / mini-kv”“是否连接 managed audit”“是否读取 credential”“是否发送 HTTP/TCP”“是否允许 runtime shell invocation”等字段，但 renderer 只是展示值。v2178 没有引入 fetch、child_process、net、fs 写入、provider client 或 secret resolver。即便报告里出现 execution 相关 label，也只是 profile 数据的一部分，不代表本版开放真实执行。

第四条安全边界是 sibling repo 不写入。用户已经明确 Node 只做 Node，Java 和 mini-kv 只在需要时检查情况。本版没有编辑 `D:\javaproj\advanced-order-platform` 或 `D:\C\mini-kv`，也没有把 progress 写回它们。跨项目并行状态写入证据和解释，是为了避免误会：Node 当前在收 renderer 标准化，不是要求另两个项目等待 Node 批准。

第五条安全边界是 census ratchet 只收紧。`test/rendererCensusScript.test.ts` 从 217/28 改到 221/24，负向门从 27 改到 23，含义是后续版本如果让未标准化 renderer 回升到 25 或更多会失败。ratchet 没有因为本版只迁移四个文件而放松，也没有把 total renderer 变化忽略掉。它既记录进度，也防止未来新增手写 renderer 把 N1 往回推。

## Test Coverage / 测试覆盖

第一组覆盖是 focused renderer parity 与业务报告回归：`npx vitest run test/rendererMigrationV2178Parity.test.ts test/managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner.test.ts test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.test.ts test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal.test.ts test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution.test.ts --maxWorkers=2`。这组命令覆盖新增 parity 文件和四个原有业务测试，结果是 5 个文件、15 个测试通过。它证明迁移后的 renderer 不只是单独指纹稳定，也没有破坏原有 loader/route profile 期望。

第二组覆盖是 census 小门：`npx vitest run test/rendererCensusScript.test.ts test/rendererMigrationV2178Parity.test.ts --maxWorkers=2` 与 `npm run renderer:census -- --json --max-unstandardized=24`。前者证明测试内的正向和负向 ratchet 都工作，后者用脚本直接输出当前 census：total 245，standardized 221，unstandardized 24，remaining shape signals 为 h3 0、forLoop 0、map 21、flatMap 22。这个脚本输出是计划书要求的可复现 census，不依赖人工数文件。

第三组覆盖是跨版本 renderer migration 回归：`npx vitest run test/rendererMigrationV2167Parity.test.ts test/rendererMigrationV2168Parity.test.ts test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts test/rendererMigrationV2175Parity.test.ts test/rendererMigrationV2176Parity.test.ts test/rendererMigrationV2178Parity.test.ts --maxWorkers=2`，结果是 7 个文件、8 个测试通过。它的意义是确认 v2178 没有和 v2177 normalizer 修复、v2176 shard readiness 迁移、v2175 shard readiness intake 迁移等历史批次互相冲突。

第四组覆盖在收尾阶段继续运行 typecheck、代码讲解质量门、解释可读性门、lint 和 build。typecheck 用来确认四个 renderer 的 builder section 类型没有误用；文档门用来确认新讲解满足中文、结构和禁止硬凑规则；lint 用来捕捉导入顺序、未使用 helper、格式问题；build 用来证明生产构建仍能完成。本地 full vitest 在这个仓库历史上容易因为体量超时，因此本版仍采用 focused + grouped + CI full coverage 的节奏，远端 GitHub Actions 承担最终完整门。

## One-sentence Summary / 一句话总结

v2178 把四个 read-only / minimal integration 报告 renderer 收进统一 verification report builder，用 parity 指纹和 census ratchet 证明输出合同不变、未标准化 renderer 从 28 降到 24，同时不改变 route、schema、fixture、loader 或任何跨项目执行边界。
