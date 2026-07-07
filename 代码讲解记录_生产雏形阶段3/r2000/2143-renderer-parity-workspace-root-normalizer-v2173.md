# v2173 代码讲解：workspace root 与 byteLength digest 归一化

## Goal and Non-goal / 目标与非目标

v2173 的目标是把 v2172 仍未覆盖的最后一段 Linux runner 差异收掉。v2172 修了 entry-rendered `xxxDigest`，但远端完整 coverage 仍然失败在 `test/rendererMigrationV2170Parity.test.ts` 的 `artifactIntakePreflight` case。失败信号很具体：远端规范化 Markdown 长度是 12447，本地期望是 12574。这个差值说明还有环境相关字段进入了 parity 比较面，而且它主要影响 artifact intake preflight 这一种 renderer。

非目标仍然是不动产品输出。`src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightRenderer.ts` 没有修改，loader 没有修改，fixture 没有修改，route 也没有修改。真实用户或审计者通过 HTTP route 看到的 Markdown 仍然会展示 workspace path、evidence file byte length 和 digest。v2173 只改变 `test/rendererMigrationParityUtils.ts`，也就是测试在计算 length 和 SHA-256 前如何把跨平台噪声折叠成占位符。

这个切片看似仍小，但它是 CI 红灯阻断下必须先做的工程动作。计划书明确要求红 CI 不能带入下一批 renderer 迁移，所以即使下一批五个 shard readiness renderer 已经只读准备好了，也不能在 v2172 红灯未修时写入。v2173 因此不是功能版本，而是让 N1 迁移链重新回到可推进状态的修复版本。

## Entry Points / 入口

入口仍然是 `normalizeRendererMigrationMarkdown` 和它内部调用的 `normalizePathValue`。v2172 后，本地残留扫描显示规范化后的 artifact intake preflight Markdown 里还有两行 workspace 根路径：`javaWorkspace: {"path":"D:/javaproj/advanced-order-platform",...}` 和 `miniKvWorkspace: {"path":"D:/C/mini-kv",...}`。旧规则只匹配包含 `/advanced-order-platform/` 或 `/mini-kv/` 的路径，也就是根目录后面还要有子路径；根目录本身没有尾斜杠，所以没有被折叠。

v2173 在 `normalizePathValue` 里先处理 root marker：如果标准化后的 slash path 以 `/advanced-order-platform` 结尾，就返回 `<java>`；如果以 `/mini-kv` 结尾，就返回 `<mini-kv>`。随后才处理带子路径的 marker，例如 `<java>/e/161/evidence/...` 或 `<mini-kv>/fixtures/...`。这个顺序让根路径和子路径都能稳定表达，同时不会把 Node 仓库内的 historical fixture 误认为真实 sibling workspace，因为 `/fixtures/` 规则仍然排在更前面。

另一个入口是 JSON file-reference 元数据。artifact intake preflight 中有 `javaV161DeclaredLifecycle`、`miniKvV152DeclaredLifecycle` 这类 JSON 对象，形态是 `exists=true, byteLength=<number>, digest=<sha256>`。上一轮只覆盖了 `sizeBytes/digest`，因为早几批 renderer 输出用的是另一种字段名。v2173 新增 `byteLength/digest` 规则，仍然要求 `exists=true` 且 digest 是 64 位小写十六进制，避免误伤缺失文件的 `digest:null` 记录。

## Response Model / 响应模型

parity 响应模型没有变：测试还是对规范化 Markdown 断言 `length`、`sha256`、H1/H2/H3 数量和尾换行。变化只体现在 `artifactIntakePreflight` 的金标：长度变为 12435，SHA-256 变为 `c9558730ad393f34c300010de25a6a499b6e00134adeb7e2610f71c944362dbf`。其它八个 case 没变，这一点很关键，因为它说明新规则没有扩大到不相关 renderer，也没有改变 v2169 的既有比较面。

为什么新长度比远端失败时的 12447 还短？因为远端失败日志反映的是 v2172 helper 的 Linux 输出，当时还没归一化 `byteLength/digest`；v2173 helper 在本地同时折叠 workspace root 和 `byteLength/digest`，所以会得到新的、更窄的比较面。真正要看的不是“是否等于旧远端 received”，而是新 helper 在 Windows 和 Linux 都会对同类字段做同样替换。残留扫描已经确认本地规范化输出里不再有绝对盘符路径，也不再有 64 位 digest。

这个响应模型依然能抓住真实 renderer 回归。如果 artifact intake preflight 删除 `javaWorkspace` 行，hash 会变；如果把 `Evidence Files` section 移动到别处，hash 会变；如果 warning、recommendation、check 结果或 summary 数字变化，hash 会变。被抽象掉的只有当前机器路径和文件字节摘要值，它们不是 builder 迁移要证明的语义。

## Upstream Evidence / 上游证据

v2173 的直接证据来自 GitHub run `28850320345`。该 run 完成了大部分 coverage，日志显示 536 个测试文件通过、1641 个测试通过，只剩 `rendererMigrationV2170Parity.test.ts` 的 `artifactIntakePreflight` 长度断言失败。这说明 v2172 的大方向有效：不是全局 timeout，不是 docs gate，不是 lint，也不是大量 renderer 结构变化；失败面已经缩到单个 case 的单个长度断言。

第二类证据是本地残留扫描。用真实 loader 和真实 renderer 生成 artifact intake preflight Markdown，再经过 v2172 normalizer 后，仍能看到 `D:/javaproj/advanced-order-platform`、`D:/C/mini-kv` 和 `byteLength/digest` JSON 文件引用。补上 v2173 规则后，再跑同样扫描，不再输出绝对路径、盘符、`/home`、未归一化 `byteLength/digest` 或 64 位 digest。这是比单纯更新 expected 更强的证据，因为它说明修复针对的是具体残留字段。

第三类证据是 focused parity：`npx vitest run test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts --maxWorkers=2` 已通过。它同时覆盖 v2169 和 v2170，证明 helper 扩展没有破坏前一批五个 runtime execution renderer，也证明 v2170 四个 renderer 的金标在新比较面下自洽。

## Service Flow / 服务流向

服务流向仍然分为 loader、renderer、test normalizer、assertion 四层。loader 层读取历史 fixture fallback，构造 artifact intake preflight profile。renderer 层照旧输出 Markdown，其中包含 `Artifact Candidates`、`Evidence Files`、`Checks`、`Summary`、`Warnings` 等 section。v2173 不参与这两层。

test normalizer 层先把 generatedAt 固定，再处理 JSON `path/resolvedPath`，然后处理 `resolved=` 文本、entry path 字段、hardening/source core path 标签、file-reference size 或 byte metadata、文本 `bytes/digest`、entry digest。v2173 的新增点落在两个地方：`normalizePathValue` 能识别根路径，主归一化链能识别 `byteLength/digest`。这些规则集中在一个 helper 中，避免每个 migration 测试自己写一套细碎正则。

assertion 层最后计算长度和 SHA-256。这里仍然不启动 Java service，不启动 mini-kv service，不连接 managed audit，不打开 runtime probe。CI 完整 coverage 只是运行 Node 测试进程，它验证 Linux runner 上同一 helper 能得到同一金标。这个服务流向保证修复既不改变外部行为，也不把 sibling 项目拉进当前版本的写入边界。

## Safety Boundary / 安全边界

第一条安全边界是路径折叠不等于隐藏证据。真实 Markdown 里保留原始路径，是审计可读性的一部分；测试 hash 里折叠路径，是为了跨平台稳定。两者服务不同读者：产品输出给人看，parity hash 给迁移测试看。把这两层分开，才能既保留审计信息，又避免 Windows 路径和 Linux runner 路径反复破坏迁移证明。

第二条安全边界是 `byteLength/digest` 只在文件引用对象里归一化。规则要求 `exists=true`，字段名固定为 `byteLength`，digest 固定为 64 位十六进制。它不会匹配 summary digest 文案，不会匹配 warning 里的普通文本，也不会替换业务 check 值。缺失文件的 `digest:null` 也没有被吞掉，因为缺失本身是语义信号，不能无差别改写。

第三条安全边界是历史不可改写。v2172 已经作为红 CI 修复版推送并打 tag，v2173 追加修复它，而不是移动 v2172 tag。这样 reviewer 能看到问题如何逐步收敛：v2171 修 path/file-reference，v2172 修 entry digest，v2173 修 workspace root 与 byteLength digest。这个历史虽然不漂亮，但很诚实，也更适合生产前治理项目。

## Test Coverage / 测试覆盖

当前已通过 focused parity：v2169 两类 runtime execution 链和 v2170 operator lifecycle 链全部通过。接下来必须补跑 `npm run typecheck`，因为 helper 中新增了 root marker 分支；必须补跑文档质量门，因为新增了 2143 代码讲解；必须补跑 `npm run lint` 和 `npm run build`，确保测试 helper 和文档不会引入工程级退化。推送后，GitHub CI 再跑完整 coverage，这是 Linux runner 的最终证明。

这次不会把下一批 v2174 renderer 迁移混进来。虽然五个候选 renderer 已经准备好，且迁移前金标也已计算，但红 CI 修复版本应保持窄切片。否则一旦远端继续红，就分不清是 helper 仍漏字段，还是新迁移 renderer 引入了新问题。v2173 的交付边界就是把 v2170 parity 修绿，等 CI 通过后再恢复 N1 迁移节奏。

## Maintenance Notes / 维护取舍

v2173 给后续维护者留下一个判断标准：如果某个字段表达“当前 checkout 中某个 evidence file 的字节状态”，它可以在 renderer migration parity 中归一化；如果某个字段表达“业务决策、检查结果、状态机结论、阻塞原因”，它必须进入 hash。workspace root 和 `byteLength/digest` 属于前者，`executionAllowed`、`productionBlockerCount`、`readyFor...`、warning text 属于后者。

从实现取舍看，继续使用小正则而不是引入 Markdown AST，是因为当前输出形态稳定且规则很窄。更重要的是，这些规则集中在 `rendererMigrationParityUtils.ts`，未来如果要收紧或审计 normalizer，只查一个文件即可。分散在每个测试文件里的 ad hoc normalizer 才是真正难维护的形态。

## Failure Pattern / 失败形态复盘

v2171、v2172、v2173 这三次连续修复看起来像反复补洞，但它们暴露的是同一条迁移测试边界：renderer migration parity 一开始太接近“字节级现场快照”，而不是“展示层语义快照”。v2171 的失败是路径长度差异，v2172 的失败是等长 digest 差异，v2173 的失败是 workspace root 和 `byteLength/digest` 的组合差异。每一次失败都不是 renderer builder 把 section 写错，而是测试把本机证据文件状态带进了 hash。

这类失败的排查节奏已经形成：先看远端失败是 length 还是 hash；再用本地真实 loader/renderer 生成 Markdown；然后对归一化后的文本做残留扫描，搜索盘符、反斜杠、`/home/runner`、64 位 digest、文件扩展名和 JSON path 对象。只要残留字段能被解释为 checkout-local evidence metadata，就应收进共享 normalizer；如果残留字段是 check、summary、warning 或 decision，就不能收。这比直接在测试里改 expected 更可靠，因为 expected 只告诉我们“现在是这个值”，残留扫描告诉我们“为什么这个值会跨平台漂移”。

## Why Product Code Stays Untouched / 为什么不改产品代码

最容易犯的错，是看到 Markdown 里有本地路径和 digest，就想把 renderer 改成永远输出 `<java>`、`<mini-kv>` 或 `<digest>`。这会让测试立刻稳定，却会改变真实审计材料。当前这些报告本来就要告诉读者证据来自哪里：是本地 sibling workspace，还是 Node 仓库内的 historical fixture，文件是否存在，字节长度和摘要是什么。把产品输出抽象掉，会降低人工排查能力，也会破坏历史报告“可定位到源文件”的价值。

测试 normalizer 的存在正是为了避免这种产品层降级。它只在 parity hash 之前运行，不在 route、不在 loader、不在 archive verifier 里运行。这样真实报告保留细节，迁移测试只比较 builder 迁移负责的结构。这个分层对后续 N1 很关键：我们还要迁移几十个 renderer，如果每次 CI 红都去改产品输出，项目会慢慢失去审计可解释性；如果把环境噪声集中到测试工具里，产品语义就能保持稳定。

## Reviewer Replay / 评审复现步骤

reviewer 要复现 v2173，不需要启动 Java 或 mini-kv。第一步运行 `gh run view 28850320345 --repo wul012/nodeproj --log-failed`，可以看到 v2172 远端只有 `artifactIntakePreflight` 长度断言失败，且完整 coverage 已经跑到最后阶段。第二步在本地运行 focused parity，确认 v2173 helper 下 v2169/v2170 全部通过。第三步运行一个只读 tsx 残留扫描脚本，调用真实 artifact intake preflight loader 和 renderer，再经过 `normalizeRendererMigrationMarkdown`，确认输出里没有 `D:/`、`/home/runner`、未归一化 `byteLength/digest` 和 64 位 digest。

这个复现顺序比只看 diff 更有价值。diff 告诉我们新增了两个规则，复现步骤告诉我们这两个规则确实对应远端失败的残留字段。若 v2173 推送后 CI 仍然失败，reviewer 也能继续沿用同一流程，而不是从头猜：先看失败 case，再扫残留，再判断字段属于环境元数据还是业务语义。这个流程会服务后续 v2174 的五个 shard readiness renderer 迁移，因为那些 renderer 同样大量展示路径和证据文件。

## Next Batch Readiness / 下一批准备度

v2173 通过以后，下一批可以迁移五个已经只读检查过的 renderer：`managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionRenderer.ts`、`CompletedShardReadinessEvidenceIntakeRenderer.ts`、`ActiveShardPlanEvidenceIntakeRenderer.ts`、`ActiveShardPlanBoundaryHandoffIntakeRenderer.ts`、`LiveReadGatePlanIntakeRenderer.ts`。它们都是同步 full-report renderer，不启动服务，不消费新鲜 sibling 输出，且已有现成 route/loader 测试。迁移预计把 census 从 209/245 推到 214/245。

不过下一批必须等 v2173 远端绿灯。原因不是流程保守，而是诊断清晰度：如果在 CI 红灯时混入五个 renderer 迁移，下一次失败就可能同时来自 normalizer、builder 映射、金标计算或新 renderer 结构。把 v2173 独立提交，可以让 CI 只回答一个问题：workspace root 与 `byteLength/digest` 归一化是否足够修复 v2170 parity。这个问题答完，再推进功能批次，后面的版本链才不会混乱。

## Stop Condition / 停止条件

normalizer 不能无限扩张。v2173 之后，如果 CI 再出现 renderer parity 失败，只有在残留字段明确属于路径、文件字节长度、文件摘要或 checkout-local evidence metadata 时，才允许继续扩展共享工具。若失败来自 `checks`、`summary`、`productionBlockers`、`warnings`、`recommendations`、`readyFor...` 或 section 标题，就必须回到 renderer/loader 做真实 diff，不能把它们加入替换规则。这个停止条件保护 parity 测试继续有牙齿：它可以忽略平台噪声，但必须咬住业务语义和 Markdown 结构。

实际执行时还要保留失败样本，不要只看最终绿色结果。每次扩展 normalizer，都应在 evidence JSON 或讲解中写明上一轮 CI run、失败字段、残留扫描依据和未归一化的字段形态；否则后来的人只会看到一串 expected hash 变化，无法判断这是合理的环境归一化，还是把真实回归藏进测试工具。这也是后续批次继续快速推进的前提，稳住。

## One-sentence Summary / 一句话总结

v2173 把 sibling workspace 根路径和 JSON `byteLength/digest` 文件引用收进共享 renderer migration normalizer，让 `artifactIntakePreflight` 的 parity 金标只比较 Markdown 结构与业务字段，而不再受 Windows/Linux checkout 路径和文件字节摘要影响。
