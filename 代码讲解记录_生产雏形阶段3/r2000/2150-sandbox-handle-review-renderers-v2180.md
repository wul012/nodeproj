# v2180 代码讲解：sandbox handle review renderer 标准化

## Goal and Non-goal / 目标与非目标

v2180 的目标是把 sandbox handle review 链上的五个非 archive renderer 迁到 `renderVerificationReportMarkdown`，并用 parity 测试证明迁移前后的 Markdown 输出合同保持稳定。这一版接在 v2179 之后：v2179 已经把 minimal read-only 与 managed-audit-disabled integration 后半段收进 builder，并且远端 CI run `28873507461` 通过。v2180 因此可以在绿色基线上继续处理下一组语义连续的 renderer。

本版选择的五个文件分别是 prerequisite intake、contract decision、packet/gate non-secret intake、packet/gate decision record、prerequisite closure review。它们共同描述 sandbox handle review 真正开始之前的非秘密、非执行、非网络前置链：先定义允许输入和关闭范围，再定义合同，再定义 packet/gate 输入输出与 stop condition，再记录进入 closure review 的 decision，最后确认前置链闭合。把这五个放进同一版，比把 archive verification 或 endpoint credential resolver 混进来更清楚。

非目标同样明确。v2180 不改 loader 的判定规则，不改 route，不改 schema，不改 fixture，不启动 Java，不启动 mini-kv，不连接 managed audit，不读取 credential value，不解析 raw endpoint URL，也不开放 runtime shell。所有“是否允许”“是否关闭”“是否 ready”的判断仍由 profile 生成阶段完成；renderer 只负责展示已有 profile。这个边界使本版保持为报告结构治理，而不是执行能力推进。

本版的必要性来自 N1 收口压力。v2179 后仍有 19 个 renderer 未标准化，其中 sandbox handle review 家族占了连续一段。如果这些报告继续手写数组，后续每次修 section 形态、空列表文案、message 输出或 fingerprint normalizer 都要重复检查。v2180 把同一语义家族的共同骨架合并到 builder，剩余未标准化数量降到 14，也让后续的 endpoint credential resolver 和 controlled section waiver 更容易单独处理。

这个切片还有一个维护上的好处：它把“前置链”完整保留下来，而不是只迁某个单点。prerequisite intake 定义允许输入，contract decision 把输入整理成合同，packet gate intake 把合同转为 packet/gate 形态，packet gate decision record 给出下一阶段决策，closure review 则确认前置链已闭合。五个报告连起来读，审查者能看到 sandbox handle review 为什么仍然停留在非秘密、非执行、非网络的准备阶段，而不会误以为 Node 已经开始拿真实 handle 或真实 endpoint 做运行时操作。

## Entry Points / 入口

第一个入口是 prerequisite intake renderer。它展示 Source Node v353、Necessity Proof、Prerequisite Inputs、Closed Scopes、Intake Record、Checks、Summary 和消息区。迁移后，Source Node、Necessity Proof、Intake Record、Checks、Summary 使用 builder 的 `entries`；Prerequisite Inputs 和 Closed Scopes 继续由本地 helper 输出多行块。这样保留了每个输入的 category、allowedShape、containsSecretValue、containsRawEndpointUrl、allowsNetworkConnection、allowsRuntimeInvocation、status 与 notes。

第二个入口是 contract decision renderer。它从 Node v355 archive verification 推进到 sandbox handle review contract decision，展示 Contract Inputs 与 Contract Sections。这里的 helper 不能删除，因为 contract input 需要展示 sourcePrerequisiteId、contractRequirement、是否含秘密、是否含 raw endpoint、是否允许网络、是否允许 runtime；contract section 还要展示 decisionRule、acceptsOnlyOpaqueReference、opensManagedAuditConnection、invokesRuntimeShell、mutatesUpstreamState。builder 负责 section，helper 保留证据语义。

第三个入口是 packet/gate non-secret intake renderer。它是五个里输出最长的一个，因为它同时展示 Packet Inputs、Gate Outputs、Stop Conditions。packet input 描述输入来源和限制，gate output 描述决策输出是否会泄露敏感值或打开连接，stop condition 描述触发后如何 fail-closed。v2180 只迁骨架，不把这些三类多行块合并成一段 prose，避免审查者失去逐项扫描能力。

第四个入口是 packet/gate decision record renderer。它比 packet intake 更短，核心是 Source Node v359、Necessity Proof、Decision Inputs、Decision Record、Checks、Summary。它的本地 helper 只负责 decision input，因为每个 input 的 source、requiredForDecision、status、notes 必须和 id/label 绑在一起。迁移后这些行仍在 `Decision Inputs` section，输出顺序不变。

第五个入口是 prerequisite closure review renderer。它有一个小的结构特殊点：`profile.closureReview` 内含 completedClosureItems 和 remainingClosureItems，但 Closure Review section 只应该输出 summary 字段，不应该把两个 item 数组重复塞进 entries。原 renderer 用对象解构排除这两个数组，v2180 保留该做法，然后把 summary 交给 builder 的 `entries`，把 completed/remaining 两个数组交给 `renderClosureItems(...)`。

这些入口的共同原则是“保留证据块的归属感”。例如 prerequisite input 的 notes 必须跟对应 id 放在一起，stop condition 的 effect 必须跟同一条件下的 credential、endpoint、managed audit、runtime shell、upstream mutation 布尔边界放在一起，closure item 的 evidence 必须跟 closureState 和 requiredBeforeSandboxHandleReview 放在一起。如果把这些字段拆成全局 entries，单个字段看起来仍然存在，但审查者需要自己重新组装上下文，报告的透明度反而下降。

## Response Model / 响应模型

五个 renderer 的响应模型仍是 Markdown。H1 标题、H2 section 名称、meta label、section 顺序、空列表文案和尾部换行都由 parity 锁住。新增 v2180 parity 的五组指纹分别是：prerequisite intake 长度 10591，contract decision 长度 9833，packet/gate non-secret intake 长度 12228，packet/gate decision record 长度 7230，prerequisite closure review 长度 7927。五个 case 的 H1 都是 1，H3 都是 0，H2 分别为 11、11、12、10、10。

meta 区域承担快速扫描职责。五个报告都会展示 service、generatedAt、profileVersion、状态、决策、active/source Node version、是否 ready for archive verification、是否只做当前阶段、是否 rerun live probe、是否启动 Java/mini-kv、是否连接 managed audit、是否请求或读取 credential、是否请求或解析 raw endpoint、是否实例化 provider/client、是否实现或调用 runtime shell、是否允许 execution。builder 统一输出这些顶部字段，避免每个 renderer 自己处理空行和格式。

section 区域承担证据展开职责。prerequisite intake 看输入和关闭范围；contract decision 看合同输入与合同章节；packet gate intake 看 packet、gate output、stop condition；packet gate decision 看 decision inputs；closure review 看 completed 和 remaining closure items。v2180 没有重命名这些 section，因为它们是审查路径的一部分。审查者从标题就能知道当前报告在 sandbox handle review 链的哪一段。

消息区由 builder 的 `messages` 和 `list` 统一输出。Production Blockers、Warnings、Recommendations、Next Actions 四类 section 在五个 renderer 中完全同构，以前每个文件都要导入 `renderMessages` 和 `renderList`。迁移后，这些重复逻辑收进 builder，而领域 helper 只保留在确实有多行证据语义的地方。

这里的响应模型也保护了“空集合”的可读性。closure review 的 remaining items 可能为空，原 helper 会输出 `- none`；v2180 没有改掉这个细节，因为空列表不是缺失证据，而是“没有剩余 closure item”的明确审查结论。builder 负责放置 `Remaining Closure Items` section，本地 helper 负责表达空集合含义，两者分工后，报告既统一又不会丢掉领域语义。

## Upstream Evidence / 上游证据

v2180 的直接前置证据是 v2179 远端 CI 绿色。这个项目此前多次出现本地通过、Linux runner 因路径或比较面差异失败的情况，所以本版开始前明确等待 v2179 run 通过，避免在未知红 CI 上叠新迁移。v2180 evidence JSON 也记录了这个 precondition。

本版不需要 Java 或 mini-kv 新证据。虽然报告字段里继续出现 Java、mini-kv、managed audit、runtime shell、credential、endpoint 等概念，但它们都是“边界是否关闭”的报告字段，不是执行动作。测试强制 historical fallback，确保 runner 上没有 sibling workspace 时仍能稳定生成同一比较面。

上游业务覆盖来自五个原有测试文件。它们分别验证主路径、fail-closed、route JSON、route Markdown 和关键安全字段。v2180 没有改这些测试，而是新增 `rendererMigrationV2180Parity.test.ts` 作为迁移指纹门。业务测试证明 profile 与 route 语义仍通，parity 测试证明 renderer 输出合同未漂。

归档材料同样按三层组织：evidence JSON 记录机器结果和指纹，解释文档说明版本范围和下一步，代码讲解说明五个入口的职责分界。这样未来审查者不需要在一个超长文件里寻找所有信息，也能复现本版为什么没有纳入 archive verification renderer。

没有纳入 archive verification renderer 是刻意选择。archive verification 报告虽然也属于同一历史阶段，但它们负责检查归档文件是否完整、digest 是否存在、source archive 是否可复现；本版处理的是“生成阶段报告”本身。把生成报告和 archive verification 报告拆开，能让 parity 的含义更清楚：v2180 证明五个业务报告渲染不变，后续如果迁 archive verification，就专门证明归档审查报告渲染不变。

这个拆分也让后续验收更容易追责。生成阶段报告的风险是字段丢失、分组错位、message 区域顺序漂移；archive verification 报告的风险是归档路径、digest、source file 和重跑证据不一致。两类风险都重要，但机械检查的断言面不同。如果在同一版里混做，reviewer 看到一个 parity 失败时很难判断是业务报告输出变了，还是归档校验报告的路径表述变了。v2180 把断言面收窄到 sandbox handle review 前置链，使每个 hash、长度和标题数量都能直接对应一个业务入口。后续迁 archive verification 时，也能复用这套解释结构，但证据文件、测试名和必要性证明应单独写清楚，避免把“报告生成标准化”和“归档审查标准化”混成一个模糊大版本。

## Service Flow / 服务流向

运行时服务流保持 route -> loader -> profile -> renderer -> Markdown。JSON 响应仍来自 profile，v2180 不改变 JSON route。Markdown route 调用同名 renderer 函数，函数签名不变，返回类型不变。builder 只替代 renderer 内部数组拼接，不进入 loader、config、auth、access guard 或 managed audit store。

在每个 renderer 内部，服务流被拆为三层。第一层是 `meta`，列出顶部扫描字段；第二层是 `sections`，用 `entries`、`lines`、`messages`、`list` 表达不同 section；第三层是本地 helper，负责把领域对象展开成多行证据。这个分层让维护者能直接看出哪些内容是通用版式，哪些内容是 sandbox handle review 领域格式。

closure review 的服务流尤其值得注意。原 renderer 已经把 `completedClosureItems` 和 `remainingClosureItems` 从 `closureReviewSummary` 里排除，避免重复输出。v2180 保留这个对象拆分，只把 summary 送入 `entries`。如果这里偷懒直接把整个 `profile.closureReview` 作为 entries，输出会把数组渲成不适合审查的对象文本，也会破坏 parity。

packet/gate intake 的服务流则强调 stop condition。Stop Conditions 是安全门，不是普通列表；每一项都必须展示 effect、credentialValueRead、rawEndpointUrlParsed、managedAuditHttpTcpAllowed、runtimeShellInvocationAllowed、upstreamMutationAllowed。v2180 保留 `renderStopCondition(...)`，让每个 stop condition 仍然是一个可扫描的多行块。

从维护角度看，builder 化后的服务流更容易做局部审查。以后如果某个 sandbox handle review 字段需要改名，维护者可以直接看对应 helper；如果只是 message 空列表格式或 section 尾部换行要统一，则看 verification report builder。过去这些职责混在一个数组里，改动很容易误伤空行、标题层级或列表缩进。v2180 把改动面切开，让后续 14 个 renderer 的迁移也能沿用同样方法。

## Safety Boundary / 安全边界

第一条安全边界是只迁 renderer，不改行为。五个 loader 不动，route 不动，fixture 不动，schema 不动。所有 ready、decision、blocked、warning、recommendation 都来自原 profile。renderer 既不计算新状态，也不根据字段值改变 decision。这样 parity 如果失败，问题会集中在输出结构，而不是混入业务逻辑变化。

第二条安全边界是保留多行领域 helper。prerequisite input、contract section、gate output、stop condition、closure item 都不是普通 key-value。它们需要父行加缩进行，才能让审查者知道哪些字段属于同一项。v2180 没有为了减少函数数量而删除这些 helper，因为删除会牺牲报告透明度。

第三条安全边界是 historical fallback。所有 parity case 都在 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK` 下运行，避免开发机 sibling workspace 与 GitHub runner checkout 路径差异影响 hash。v2174 到 v2177 已经证明路径噪声会造成 CI-only 漂移，v2180 继续把这个经验写进测试默认上下文。

第四条安全边界是 census 只收紧。`rendererCensusScript.test.ts` 从 226/19 收到 231/14，负向门使用 `--max-unstandardized=13`。这保证本版不仅迁了五个文件，还把 N1 进度写成机械检查。后续如果有人新增未标准化 renderer，census 会失败。

第五条安全边界是不让 Node 阻塞 Java / mini-kv。v2180 是 Node 本地 renderer 治理，不产生新跨项目 contract，也不消费新鲜上游 evidence。Java 和 mini-kv 可以继续各自计划，只有未来真实 live integration capstone 才需要显式写启动端口、owner、cleanup 和服务依赖。

第六条安全边界是不要把剩余 controlled profile section renderer 误当成普通报告。v2180 后剩余列表里有几个 `controlledReadOnly...ProfileSectionRenderer`，它们可能只是父 renderer 的片段，而不是完整 route Markdown。后续处理时必须先看调用关系：能迁入 builder 的才迁，应该并入父 renderer 的就合并，确实是组合片段的则登记 waiver。否则为了追求 census 数字，可能会制造一个“标准化了但没人直接消费”的薄包装。

## Test Coverage / 测试覆盖

第一组测试是 focused 迁移覆盖：`npx vitest run test/rendererMigrationV2180Parity.test.ts test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.test.ts test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.test.ts test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake.test.ts test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord.test.ts test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReview.test.ts --maxWorkers=2`。结果是 6 个文件、16 个测试通过。

第二组测试是 census 小门：`npx vitest run test/rendererCensusScript.test.ts test/rendererMigrationV2180Parity.test.ts --maxWorkers=2`，结果是 2 个文件、3 个测试通过，并打印预期的负向 regression 文案。`npm run renderer:census -- --json --max-unstandardized=14` 输出 total 245、standardized 231、unstandardized 14、map 17、flatMap 8。

第三组测试是历史 migration 回归：`npx vitest run test/rendererMigrationV2167Parity.test.ts test/rendererMigrationV2168Parity.test.ts test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts test/rendererMigrationV2175Parity.test.ts test/rendererMigrationV2176Parity.test.ts test/rendererMigrationV2178Parity.test.ts test/rendererMigrationV2179Parity.test.ts test/rendererMigrationV2180Parity.test.ts --maxWorkers=2`。结果是 9 个文件、10 个测试通过，证明 v2180 没有破坏前面几批 renderer parity。

收尾还会继续跑文档质量门、typecheck、lint 和 build。文档门确认本讲解符合中文、章节、禁用执行声明和可读性要求；typecheck 捕捉 builder 类型误用；lint 捕捉导入和未使用符号；build 证明生产编译通过。远端 GitHub Actions 仍是最终完整门。

这些测试覆盖的关键不是数量，而是层次。focused 业务测试证明五个 loader 和 route 仍然工作，parity 测试证明五个 renderer 输出不漂，census 测试证明 N1 进度不可回退，历史 migration 回归证明新的 normalizer 使用没有破坏旧批次。四层证据互相补位，避免用单一测试承担所有风险。

## One-sentence Summary / 一句话总结

v2180 把五个 sandbox handle review 前置链 renderer 迁入统一 verification report builder，用 parity 和 census 证明输出合同不变、标准化进度推进到 231/245，并保持无跨项目写入、无网络动作、无真实执行的安全边界。
