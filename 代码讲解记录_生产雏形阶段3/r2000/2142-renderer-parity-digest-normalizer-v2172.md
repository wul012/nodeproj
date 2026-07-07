# v2172 代码讲解：renderer parity digest-entry normalizer CI 修复

## Goal and Non-goal / 目标与非目标

v2172 的目标很明确：修复 v2171 在 GitHub Actions 上暴露出来的 renderer migration parity 不稳定点，让 v2169 和 v2170 两批迁移测试在 Windows 本地与 Linux runner 上使用同一套可解释的比较表面。v2171 已经解决了路径和 file-reference 字节元数据的问题，但远端完整测试仍然在 `packetStopRecord` 上失败，而且失败形态从“长度不一致”变成了“长度一致、SHA-256 不一致”。这说明上一版已经清掉了路径长度差异，剩下的是等长的摘要值差异。v2172 因此只补上 entry-rendered digest 行的归一化规则，避免同一类 CI 红灯在后续 renderer 迁移批次里反复出现。

非目标同样重要。本版本不修改任何生产 renderer，不修改 loader，不修改 route，不修改 schema，也不改 fixture 字节。`src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordRenderer.ts` 这类产品文件保持 v2170 的输出行为。真实 Markdown 中的 `archiveVerificationDigest`、`packetDigest`、`sourcePlanDigest` 等字段仍然会按原样展示给审计读者；v2172 只是让迁移测试在计算金标 hash 前，把这些“源证据文件的本地字节摘要”从 builder 迁移比较面中剥离出来。换句话说，测试仍然锁住报告结构和业务字段，但不再把 checkout 环境里的证据文件摘要误判为 renderer 布局变化。

这也是为什么本版本被切成一个独立的 CI repair，而不是继续向前迁移新 renderer。计划书要求“CI red carried into a new batch = stop; fix first”，所以 v2171 远端红灯必须先收敛。这里不挪 tag、不改已经推送的 v2171 历史，而是新增 v2172 记录失败、修复、验证和边界。这样审计链保持透明：v2171 证明了 path/file-reference normalizer 还不够，v2172 证明了剩余 hash 漂移来自 digest-entry 比较面过宽。

## Entry Points / 入口

本版本真正的代码入口只有 `test/rendererMigrationParityUtils.ts`。两个 parity 测试文件 `test/rendererMigrationV2169Parity.test.ts` 和 `test/rendererMigrationV2170Parity.test.ts` 都导入 `normalizeRendererMigrationMarkdown` 与 `sha256`，它们不再各自维护一套本地正则。测试执行时，case 会先调用对应的真实 loader，例如 `loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord`，再调用真实 renderer，例如 `renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordMarkdown`。只有拿到完整 Markdown 字符串之后，测试才进入归一化工具。

新增规则位于归一化链路末尾：`.replace(/(- [A-Za-z0-9]+Digest: )[a-f0-9]{64}/g, "$1<digest>")`。放在末尾是有意的，因为前面的规则先处理 `Generated at`、JSON `path/resolvedPath`、文本 `resolved=`、entry path 字段、hardening path 标签以及 file-reference 的 `bytes/digest` 元数据。digest-entry 规则只匹配 bullet 行里以 `Digest` 结尾的字段名，并且要求值是 64 位小写十六进制。它不会匹配普通 warning 文案，不会匹配 check 名称，也不会匹配非 digest 字段。

从调用边界看，`test/rendererMigrationV2170Parity.test.ts` 仍然只描述四个 v2170 renderer：operator service lifecycle、declared operator lifecycle、packet stop record、artifact intake preflight。`test/rendererMigrationV2169Parity.test.ts` 仍然只描述五个 v2169 renderer：artifact upstream progress intake、packet contribution review、packet approval gate review、live read gate、pass evidence closeout。v2172 没有新增新的业务入口，也没有扩大被测 renderer 集合；它只是让已有入口共享更准确的比较规则。

## Response Model / 响应模型

这里的“响应模型”不是 HTTP response，而是 parity 测试内部的响应模型。每个 case 都有同一组 expected 字段：`length`、`sha256`、`h1Count`、`h2Count`、`h3Count`。测试先生成真实 Markdown，再做归一化，然后断言长度、摘要、标题层级数量和末尾换行。这个模型的好处是非常机械：只要 renderer 迁移改变了 section 顺序、少了一行、改了标题层级、删了尾部换行，长度或摘要就会变；只要业务字段从 true 变 false，或 warning/recommendation 文案被改写，摘要也会变。

v2172 更新 expected 的原因，是比较面又剥离了一类不属于 renderer 迁移语义的环境差异。以 v2170 的 `packetStopRecord` 为例，v2171 远端失败时长度已经一致，但 SHA-256 从本地的期望值变成了远端值。排查结论是 entry-rendered 行中还有 `archiveVerificationDigest`、`packetDigest`、`sourcePlanDigest` 之类 64 位摘要，这些摘要对应的是本地证据文件或归档文件内容。不同平台上的换行、历史 fixture 读取路径或归档字节状态可能让摘要不同，但 renderer builder 是否等价并不由这些摘要决定。

因此新的响应模型不是“更松”，而是“更准”。测试仍然要求每个 digest 字段的字段名存在、位置存在、行格式存在；只是字段值被替换为 `<digest>`。如果 renderer 把 `packetDigest` 行删掉，长度和摘要都会失败。如果 renderer 把 digest 行移动到另一个 section，摘要也会失败。如果 renderer 把字段名改成别的名字，正则不会按原位置产生同样输出，hash 仍会变化。被移除的只有 64 位值本身，它不是 builder 布局的一部分。

## Upstream Evidence / 上游证据

v2172 消费的上游证据来自两个方向。第一是 v2171 的 CI 失败事实：GitHub run `28848967659` 在 `rendererMigrationV2170Parity.test.ts` 的 `packetStopRecord` case 上给出同长不同 hash 的失败。这个事实被写进 `d/2172/evidence/renderer-parity-digest-normalizer-v2172-summary.json`，包括失败版本、失败 case、根因和修复边界。第二是本地 focused parity 结果：`npx vitest run test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts --maxWorkers=2` 已通过，说明更新后的 expected 与共享 normalizer 在当前 checkout 下自洽。

这里没有读取 Java 或 mini-kv 的新鲜输出，也没有启动 sibling service。测试里的 loader 会在 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 下读取 Node 仓库内的历史 fixture，这符合 renderer migration parity 的定位：它验证的是 Node 本地 renderer 迁移是否保持 Markdown 布局，不验证 Java jar 或 `minikv_cli` 的实时行为。换句话说，Java 和 mini-kv 可以继续并行推进，不需要等 v2172 批准，也不需要为这次修复生成新证据。

证据边界还体现在“不改 fixture”。如果为了让 hash 过关而改历史 fixture，测试会变绿，但证据链会被污染，因为 renderer parity 本该比较同一份输入材料在迁移前后的展示形态。v2172 没有走这条路。它保留 fixture、loader 和 renderer，只把测试比较面中不应跨平台固定的 digest 值抽象掉。这样 reviewer 可以复现：真实 Markdown 仍有 digest，归一化后的 Markdown 用 `<digest>` 表示该字段存在。

## Service Flow / 服务流向

服务流向可以拆成四步。第一步是 loader 层：测试构造 `loadConfig`，关闭 upstream probes/actions，打开 access guard，并强制历史 fixture fallback。loader 从 Node 仓库内的冻结证据读取 profile，profile 中包含 summary、checks、evidence files、source paths、digest 等字段。第二步是 renderer 层：真实 renderer 调用已经迁移后的 `renderVerificationReportMarkdown` builder，组合 H1、H2、entries、lists 和 messages，输出完整 Markdown。v2172 不介入这两步。

第三步才是测试工具层：Markdown 进入 `normalizeRendererMigrationMarkdown`。这个函数按顺序替换时间、路径、file-reference 元数据和 digest-entry 值。顺序很重要，路径先被规整成 `<repo>/fixtures/...`、`<java>/...` 或 `<mini-kv>/...`，file-reference 的 `bytes` 和 `digest` 先被收成占位符，最后才处理 entry bullet 里的 `xxxDigest`。这样每类差异都有可审查的规则，不需要在测试 case 里散落临时正则。

第四步是断言层：测试对归一化后的 Markdown 计算 `sha256`，再对长度和标题数量做断言。这里没有 HTTP route，没有 Fastify app，也没有外部进程。它是纯本地的 migration safety gate。远端 CI 则在完整 coverage 中重新执行同一批测试，提供 Linux runner 视角的证明。如果 v2172 的规则仍然漏掉某种平台差异，下一次 CI 会继续红；如果 CI 通过，就说明 digest-entry 是 v2171 剩余漂移的主要来源。

## Safety Boundary / 安全边界

安全边界的第一条是产品输出不变。`rendererMigrationParityUtils.ts` 位于 `test/` 目录，只被测试文件导入，生产代码不会 import 它。用户通过 route 或归档看到的 Markdown 不经过这个 normalizer，所以 v2172 不隐藏真实 digest、不压缩证据路径、不改变审计报告正文。任何声称“产品现在不展示 digest”的理解都是错的；产品仍展示，只有测试 hash 比较时替换。

第二条边界是 normalizer 不能变成万能清洗器。它不能吞掉 summary 数字，不能吞掉 warning/recommendation，不能吞掉 check true/false，不能吞掉 section 标题。v2172 的正则写得窄，是为了只匹配 bullet 中字段名以 `Digest` 结尾且值为 64 位十六进制的行。它不会把 `readinessState`、`productionBlockerCount`、`ready`、`executionAllowed` 之类字段替换掉。讲解里可以说本版本保持只读和不启动 sibling 服务，但代码里没有打开任何生产执行。

第三条边界是版本治理。v2171 已经推送并打 tag，不能为了“让历史看起来干净”而移动 tag 或 force-push。v2172 作为追加修复版记录红 CI、根因和新规则，符合可审计历史。后续如果 v2172 远端仍红，下一步仍然是看失败字段并修复比较面或真实代码问题，而不是继续扩大 normalizer 到任意 64 位 hash。每次扩展都必须回答同一个问题：这个字段是否属于 renderer 布局语义，还是属于当前 checkout 的证据字节状态。

## Test Coverage / 测试覆盖

本地已经完成两个直接门。`npx vitest run test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts --maxWorkers=2` 通过，证明 v2169 五个 case 与 v2170 四个 case 在新 normalizer 下都能稳定得到金标。`npm run typecheck` 通过，证明共享工具和两个测试文件的 TypeScript 引用没有破坏编译。接下来还要跑代码讲解质量门、解释可读性 closeout、lint 和 build，再推送 v2172 让 GitHub CI 执行完整 coverage。

覆盖策略没有把 full local suite 当成每次 repair 的唯一证明。这个仓库的全量 vitest 在本机容易因为 worker 并发和 Windows Defender 扫描耗尽时间，之前已经出现过 timeout-only 信号；计划里也允许用远端 CI 作为完整 coverage 采信门。v2172 本地要证明的是：失败面相关测试已过、类型系统已过、文档质量已过、lint/build 不退化。完整跨平台证明则交给远端 GitHub Actions。

测试更新本身也有回归保护。v2169 的 expected 同样更新为 digest-entry 归一化后的值，避免共享 normalizer 只为 v2170 服务。若未来某个迁移批次复用 `normalizeRendererMigrationMarkdown`，它会继承同一套边界，而不是复制一份更宽或更窄的规则。这样 N1 后续 36 个剩余 renderer 的迁移风险会下降，因为每批只需关注 renderer builder 映射，不必反复处理 Linux 与 Windows 的路径和摘要噪声。

## Maintenance Notes / 维护取舍

这次修复看起来只是一行正则，但工程价值在于把“什么属于 renderer parity”讲清楚。renderer parity 不是 evidence integrity test；它不负责证明某个历史 packet 的 digest 在不同平台完全相同。evidence integrity 应该由 archive verification、fixture digest gate 或专门的 evidence loader 测试负责。renderer parity 负责的是展示层迁移是否保持布局与字段语义。因此，把 `xxxDigest` 值从 parity hash 中剥离，不是降低 evidence 要求，而是避免一个测试承担两个层次的职责。

另一个取舍是没有做更复杂的 Markdown parser。当前 renderer migration 的输出格式稳定，digest-entry 是简单 bullet 行，正则足够窄且可读。引入 parser 会让 repair 版变大，也会把测试基础设施复杂化。后续如果 Markdown 格式变成嵌套表格或多层列表，再考虑结构化解析；在当前阶段，一条命名明确、匹配面明确、放在共享工具里的规则更适合维护。

文档也属于本版本的一部分。`d/2172/evidence/renderer-parity-digest-normalizer-v2172-summary.json` 给机器和 reviewer 看，记录失败 run、目标文件、金标和验证状态；`d/2172/解释/renderer-parity-digest-normalizer-v2172.md` 给人快速读，说明为什么这不是产品变更；本文件则给后续维护者读，说明输入、输出、服务流向、安全边界和测试覆盖。三者互相补位，避免下一次看到 expected hash 更新时只能从 diff 猜原因。

## Failure Lookup / 失败排查索引

以后如果相邻批次再出现 renderer parity 红灯，可以按 v2172 的顺序排查。第一看长度是否变化：长度变化通常指向路径前缀、换行、字段增删或 section 移动，需要先比对归一化前后的 Markdown。第二看长度不变但 hash 变化：这种情况更像固定宽度值漂移，常见对象是 64 位 digest、固定长度 token 或排序稳定但内容不同的证据摘要。第三看 H1/H2/H3 数量是否变化：标题数量变化一般不是环境噪声，而是 renderer builder 映射或 `lines` 组合出了结构差异，不能靠 normalizer 修。

排查时不要第一反应就更新 expected。正确顺序是先确认失败字段属于哪一层：如果是 warning 文案、check 结果、summary 数字或 blocker 数量，应该回到 loader/renderer 查真实行为；如果是绝对路径、checkout 字节、历史 fixture 文件摘要这类环境展示字段，才考虑扩展共享 normalizer。扩展以后也要同时跑旧批次测试，例如 v2172 同时跑 v2169 和 v2170，证明新规则不会只服务一个失败 case。

## Next Batch Impact / 对下一批迁移的影响

v2172 收稳以后，下一批 shard readiness、active shard plan、live read gate plan 迁移可以少背一类噪声债。那些 renderer 很可能继续展示 `Hardening file`、`Resolved hardening path`、`Source core file`、`resolved=` 和若干 digest 字段。如果没有共享工具，每个新测试都会重新面对 Windows 路径、Linux runner 路径、历史 fixture 字节摘要的差异，批次越多，临时规则越容易分叉。现在这些差异集中在 `rendererMigrationParityUtils.ts`，后续测试只要说明自己的业务字段和标题层级，就能复用同一套比较面。

但这不意味着下一批可以放松验证。新 renderer 迁移仍然要先读取原文件形状，确认是否是 map、flatMap、local helper 或 composition-only；迁移时要保持 helper 的职责，不把复杂本地函数硬塞进 builder 参数；迁移后要用真实 loader 生成 Markdown，再计算归一化金标。v2172 只降低环境差异带来的 CI 往返，不替代每个 renderer 的结构审查。N1 的目标仍然是把 36 个剩余 full-report renderer 逐批迁走，同时保持每批切片可复查、可解释、可回滚。

## One-sentence Summary / 一句话总结

v2172 把 renderer migration parity 中最后一类跨平台噪声，也就是 entry-rendered `xxxDigest` 证据摘要值，收进共享测试 normalizer，让测试继续锁住 Markdown 结构和业务字段，而不再把 Windows 与 Linux 的证据字节摘要差异误判为 renderer 迁移失败。
