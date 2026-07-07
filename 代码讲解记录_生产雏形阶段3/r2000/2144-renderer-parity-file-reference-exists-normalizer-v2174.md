# v2174 代码讲解：file-reference exists 归一化与 parity 边界收口

## Goal and Non-goal / 目标与非目标

v2174 的目标很窄，但它挡在下一批 renderer 迁移之前，必须先做完。v2173 推送后，GitHub Actions run `28851570922` 只剩一个失败点：`test/rendererMigrationV2170Parity.test.ts` 里的 `artifactIntakePreflight` case。失败形态是长度断言不一致，远端 Linux runner 归一化后的 Markdown 长度为 12415，本地 v2173 期望为 12435。这个差异不是 renderer builder 把标题、section 或业务字段排错，也不是 loader 读取了错误 fixture；它来自 migration parity 测试仍然把当前 checkout 的文件存在性带进了 hash。换句话说，测试想证明的是“手写 renderer 迁移到通用 builder 后，语义结构没有变化”，但它比较时仍然夹带了“这台机器上是否刚好存在 sibling Java/mini-kv evidence 文件”。

本版要做的是把 JSON file-reference 三元组里的 `exists`、`byteLength`、`digest` 一起折叠到占位符。v2173 已经处理了 `byteLength` 和 `digest`，但保留了 `exists`。本地 Windows 环境下，`javaV161DeclaredLifecycle` 与 `miniKvV152DeclaredLifecycle` 这类直接 sibling 文件存在；远端 Linux runner 没有这些 sibling workspace，因此同样的语义槽位会显示为缺失。两个 true 与两个 false 在 JSON 文本里会形成稳定的 20 字符差异，这正是 v2173 后仍然失败的尾巴。v2174 把这条尾巴收掉，让 parity hash 不再受 checkout-local 文件存在性影响。

非目标同样重要。v2174 不改任何产品 renderer，不改 loader，不改 route，不改 schema，不改 fixture，也不改真实 Markdown 输出。用户通过 HTTP route 或归档 HTML/Markdown 看到的报告仍然会展示证据文件是否存在、字节长度是多少、digest 是什么。那些细节对人工审计有价值，不能为了测试稳定而从产品层删掉。这里改的是测试比较层：在计算迁移 parity 的长度和 SHA-256 前，先把跨平台噪声折叠掉。产品层保留现实，测试层比较语义，这是这类治理型工程的基本分层。

## Entry Points / 入口

本版的主要入口是 `test/rendererMigrationParityUtils.ts` 中的 `normalizeRendererMigrationMarkdown`。这个 helper 是 v2171 抽出来的共享归一化工具，后续 renderer migration parity 测试都通过它来获得稳定比较面。它目前负责处理固定时间戳、JSON `path` 与 `resolvedPath`、文本 `resolved=`、entry path 字段、hardening/source core path 标签、文件 `sizeBytes`/`digest` 元数据、entry-rendered digest 行，以及 v2173 加入的 workspace root 和 `byteLength`/`digest` 文件元数据。v2174 在这条链上继续补一个缺口：当 JSON 对象同时出现 `"exists":true/false`、`"byteLength":number/<bytes>` 和 `"digest":hex/null/<sha256>` 时，把整组三元组替换成统一占位符。

这条入口之所以放在共享 helper，而不是只写在 `rendererMigrationV2170Parity.test.ts` 里，是为了避免同类问题在下一批迁移里重复出现。Node 当前 N1 还没有结束，后面还有几十个 full-report renderer 要迁移，其中不少都会展示 upstream evidence 文件、local fixture 文件、historical fallback 文件或 sibling workspace 文件。如果每个测试文件都手写一段 ad hoc replacement，后续维护者就无法判断哪些字段被允许折叠，哪些字段必须保留在 hash 中。集中到一个 helper，reviewer 只要审计一个文件，就能看清迁移比较面的真实边界。

第二个入口是 `test/rendererMigrationV2170Parity.test.ts`。这里的 `artifactIntakePreflight` expected fingerprint 必须随比较面变化而更新。新的长度是 12505，新的 SHA-256 是 `7756125199c6399629189fd6fb8affb665c1c94560ea9b65514bb2a926f7231d`，H1/H2/H3 数量保持 1/12/0。章节数量不变很关键：它说明本版没有把结构检查拿掉，也没有让测试变成只看“能生成字符串”。如果 renderer 少了一个 section、改了标题层级、删掉检查项、改变 summary 或 warning，这些都会继续改变归一化后的 Markdown，并被长度或 hash 捕获。

## Response Model / 响应模型

迁移 parity 的响应模型不是 HTTP 响应模型，而是测试内部的“规范化 Markdown 快照”。每个 case 会调用真实 loader 与真实 renderer，得到完整 Markdown；然后通过 `normalizeRendererMigrationMarkdown` 折叠环境噪声；最后断言长度、SHA-256、一级标题数、二级标题数、三级标题数和尾部换行。这个模型的长处是轻量且严厉：它不需要在测试里逐行维护巨大的 inline snapshot，却可以发现任何结构性变化。只要 section 顺序、字段名、检查结果、summary 文案或推荐项变化，hash 就会变。

v2174 改变的是“哪些字符不应参与迁移 hash”。`exists` 在真实报告里有意义，因为审计人员确实需要知道当前机器是否能直接找到某个 sibling evidence 文件。但在 renderer migration parity 里，`exists` 不应该决定 builder 迁移是否成功。原因很简单：同一份 Node 代码在开发者机器上可以看到 `D:\javaproj\advanced-order-platform` 和 `D:\C\mini-kv`，在 GitHub runner 上看不到；这个差异不能说明 renderer 迁移破坏了 Markdown 结构。把 `exists` 与 `byteLength`、`digest` 一起折叠后，测试仍然保留 file-reference 对象本身、字段顺序、字段名称、所在 section 和周边业务语义，只是不再把当前机器的文件状态计入 hash。

新的占位结果写成 `"exists":<exists>,"byteLength":<bytes>,"digest":"<sha256>"`。这里刻意保留了三元组形状，而不是把整个对象删掉。保留形状的好处是，如果 renderer 把 `byteLength` 改名、把 `digest` 移走、漏掉 `exists` 字段，正则不会匹配，hash 仍然会变化。测试因此不是“看不见文件引用”，而是“看得见文件引用存在，但不关心当前机器上的具体文件状态”。这就是迁移测试需要的粒度。

## Upstream Evidence / 上游证据

本版直接上游证据来自 v2173 的远端 CI。run `28851570922` 完整跑到了测试尾部，显示 536 个测试文件通过、1641 个测试通过，只剩 `rendererMigrationV2170Parity.test.ts` 的 `artifactIntakePreflight` 长度断言失败。这种失败形态给了很强的诊断信号：如果是 TypeScript、lint、文档质量门、构建或大面积 renderer 结构问题，失败不会收缩到单个 case 的单个长度断言。失败只剩一个 renderer case，说明 v2171、v2172、v2173 的方向都有效，但 normalizer 仍然遗漏了某个环境字段。

本地复核时，可以把 v2173 的差异拆开看。artifact intake preflight 输出里有 direct sibling file-reference：本地文件存在时，JSON 会出现 `exists:true`、实际 `byteLength` 和 64 位 digest；远端文件缺失时，会出现 `exists:false`、缺失状态下的长度或 null digest 形态。v2173 已经把字节长度和 digest 折叠，但 `exists` 留在 hash 里，所以本地与远端仍然不一致。两个 file-reference 共同漂移，最终表现为 20 字符差异。这个数字不是凭空猜测，而是和 true/false 文本长度以及两个槽位数量对应。

还有一个负向证据同样重要：本版没有看到业务 check 失败，没有看到 `ready` 字段变化，没有看到 production blocker 数量变化，也没有看到 warning/recommendation 文案变化。换句话说，没有证据支持去改 renderer 或 loader。若在这种情况下去动产品代码，就会把测试问题误修成产品行为变化，反而污染归档材料。v2174 只动 test helper 和 expected fingerprint，是因为所有证据都指向比较层而不是产品层。

## Service Flow / 服务流向

真实服务流向仍然是 loader 到 renderer，再到 route 或归档消费。artifact intake preflight loader 会读取配置和 historical fallback，组装 Java/mini-kv declared lifecycle、runtime packet、artifact candidate、evidence file 等资料；renderer 会把这些资料渲染成 Markdown；如果是 HTTP smoke 或归档页面，用户看到的就是未归一化的真实报告。这条链路没有被 v2174 触碰。

测试流向比真实服务多了一个 normalizer。`rendererMigrationV2170Parity.test.ts` 在 case 中调用 loader 和 renderer 后，先把 Markdown 送进 `normalizeRendererMigrationMarkdown`。这个函数按顺序处理时间、路径、文件元数据和 digest，再交给 `sha256`。顺序很重要：路径先折叠，文件元数据再折叠，最后才计算 hash。这样路径差异不会影响后续匹配，文件元数据也不会把 Windows/Linux 的文件系统状态带到 hash 里。

v2174 的正则只匹配紧邻的 JSON 三元组，不扫描普通 prose。它不会处理 Markdown 段落里的业务句子，不会处理 summary 里的数字，不会处理 check 的 true/false，也不会把 warning 中的失败原因吞掉。也就是说，服务层和测试层之间仍然有一条硬边界：测试层可以折叠 checkout-local metadata，但不能折叠业务语义。后续如果有人想把 normalizer 写成“替换所有 true/false”或“替换所有 digest”，那会越过这条边界，必须拒绝。

## Safety Boundary / 安全边界

第一条安全边界是产品输出不变。真实 Markdown 保留 `exists`，因为它告诉读者证据文件在当前运行环境里是否可直接读取。生产前治理项目非常依赖这种可定位信息：当报告显示某个 sibling 文件缺失，维护者才能判断是上游项目没生成、历史 fixture 没同步，还是当前 runner 本来就没有 sibling checkout。如果把产品输出也改成占位符，人工排查能力会下降。

第二条安全边界是 normalizer 的适用范围。允许折叠的是路径、文件字节长度、文件 digest、当前 checkout 文件是否存在，这些都属于“同一语义在不同机器上呈现不同本地元数据”。不允许折叠的是检查项、检查结果、summary、warning、recommendation、readiness 决策、schema version、receipt version 和 section 标题。这些字段表达业务状态或报告结构，必须进入 hash。迁移 parity 测试的价值就在这里：它可以忽略平台噪声，但仍然咬住语义。

第三条安全边界是历史不可改写。v2170 是迁移批，v2171、v2172、v2173 是逐步修 CI 的版本。v2174 不移动旧 tag，也不把旧提交改成看起来一次成功。保留这段修复链，对后续 reviewer 更有用：他们能看到 renderer migration parity 的比较面是怎样逐步从“现场字节快照”收缩为“展示语义快照”的。生产前工程不怕出现修复链，怕的是把失败擦掉，让后续维护者不知道边界为什么存在。

## Test Coverage / 测试覆盖

本版第一道验证是 focused parity：

```powershell
npx vitest run test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts --maxWorkers=2
```

它同时覆盖 v2169 与 v2170。把 v2169 放进同一条命令，是为了确认新规则没有意外影响上一批 runtime-execution renderer；把 v2170 放进去，是为了确认失败 case 和同批其他三个 renderer 都在新比较面下自洽。结果是 2 个测试文件通过、2 个测试通过。这个 focused gate 不是最终验收，但它是最直接的修复证明。

后续还需要 typecheck、文档质量门、lint、build 和 GitHub Actions CI。typecheck 确保 helper 改动没有类型问题；文档质量门确保新增讲解仍然满足中文深度、必备 section 和禁用模式；lint 确保测试工具没有引入风格错误；build 确保项目仍可打包；远端 CI 才能证明 Linux runner 上的同一 case 不再漂移。只有远端 CI 绿了，才能继续下一批五个 shard readiness renderer 迁移。CI 红灯时不写新功能，这是当前计划书的硬规则。

## Maintenance Notes / 维护说明

后续维护者判断是否可以继续扩展 normalizer 时，可以问三个问题。第一，失败字段是否只描述当前 checkout 的路径或文件元数据？如果是，它可能应该被折叠。第二，失败字段是否改变了用户阅读报告时得到的业务结论？如果是，它必须留在 hash 里。第三，折叠后是否仍然保留字段形状和 section 结构？如果不能保留，说明规则太粗，应该回到更窄的匹配方式。

这套判断会直接影响后面的 N1 批次。剩余 renderer 中还有大量 upstream evidence、shard readiness、approval、receipt 和 boundary handoff 报告，它们都可能展示本地路径或证据文件 digest。如果 normalizer 边界清楚，后续批次可以更快推进；如果边界模糊，CI 会反复因为 Windows/Linux 细节失败，或者更糟，把真实业务回归吞掉。v2174 的价值不只是修一个 20 字符漂移，而是把“哪些东西属于迁移证明，哪些东西属于运行现场”这条线画得更清楚。

## Stop Condition / 停止条件

如果 v2174 推送后 CI 仍然失败，下一步不能直接继续扩大正则。必须先看失败是长度还是 hash，是同一个 case 还是新 case；再生成本地归一化文本，扫描残留的盘符、`/home/runner`、64 位 digest、文件扩展路径、JSON file-reference、summary 和 warning。只有当残留字段明确属于 checkout-local path 或 file metadata，才允许进入共享 normalizer。若残留字段属于业务字段，就必须回到 renderer 或 loader 做真实 diff。

如果 CI 通过，停止条件也很明确：v2174 不再继续迁移 renderer。它是一个 CI 修复版，提交边界应该保持干净。下一版才能进入已准备好的五个 shard readiness renderer 批次，并在新版本里重新计算迁移前后指纹、更新 census、写新的 evidence 和讲解。把修复版与功能迁移版分开，能让 reviewer 准确判断每个提交解决了什么问题，也能避免下一次失败时把 normalizer 问题和 builder 映射问题混在一起。

## One-sentence Summary / 一句话总结

v2174 把 JSON file-reference 的 `exists`、`byteLength`、`digest` 一起收进 renderer migration parity 的共享归一化层，让测试继续严格比较 Markdown 结构和业务语义，同时不再被本地 Windows 与远端 Linux 的 sibling evidence 文件存在性差异打断。
