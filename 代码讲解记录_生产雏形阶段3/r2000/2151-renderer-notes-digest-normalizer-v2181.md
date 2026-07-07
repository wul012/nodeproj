# v2181 代码讲解：renderer parity 的 notes digest 归一化修复

## Goal and Non-goal / 目标与非目标

v2181 的目标是修复 v2180 推送后 GitHub Actions 暴露出来的 renderer parity hash 漂移。失败点非常集中：完整 CI 的 `npm run test:coverage` 在 `test/rendererMigrationV2180Parity.test.ts` 的 `sandboxHandleReviewPrerequisiteIntake` case 上失败，长度已经匹配，但 SHA-256 从本地期望的 `6a7f...` 变成 Linux runner 上的 `c2a0...`。长度一致说明 section 数量、换行规模和大体结构没有漂；hash 不一致说明某个同长度字段仍然携带了环境差异。v2181 因此只修测试比较面，不改任何产品输出。

本版的非目标必须写清楚。v2181 不改五个 v2180 迁移过的 renderer，不改 `renderVerificationReportMarkdown`，不改 sandbox handle review loader，不改 route，不改 schema，不改 fixture，不改 Java 或 mini-kv，也不把 sandbox handle review 推向真实 managed audit 连接。真实 Markdown 里仍会展示完整的 source decision digest；只有 parity 测试在做跨平台 hash 比较前，把这类上游内容派生 digest 折叠成稳定占位。用户通过 route 看到的报告没有变，变的是测试如何剥离 Windows 和 Linux checkout 差异。

这个修复必须单独成版，而不是移动 v2180 tag。v2180 已经提交、打 tag、推送，并且 CI run `28875448789` 已经留下失败证据。按照仓库前例，v2176 CI 红后是用 v2177 做单独 CI repair，而不是重写 v2176 历史。v2181 延续同样做法：保留失败记录，明确根因，提交最小修复，再等新的远端 CI 给出绿色结论。这样审查者能复现“迁移版做了什么、修复版修了什么”，而不是看到一个被重写到看不出失败原因的历史。

本版的价值不在于一个 hash 数字本身，而在于把 renderer migration parity 的比较边界继续磨准。renderer consolidation 后面还剩 14 个未标准化文件，其中很多报告会继续引用上游 digest、archive digest、source verification digest 或历史 fixture digest。如果 normalizer 只屏蔽结构化 digest 字段，却漏掉自然语言 notes 里的 digest，后续仍会出现本地通过、Linux runner 失败的噪声。v2181 把“notes 中的 chained source digest 也属于环境派生噪声”沉入共享工具，让后续版本不必重复踩同一个坑。

## Entry Points / 入口

第一个入口是 `test/rendererMigrationParityUtils.ts` 的 `normalizeRendererMigrationMarkdown(...)`。这个函数是所有 renderer migration parity test 的共同入口。它先固定 `Generated at`，再折叠 JSON path、Markdown path、resolved path、fixture size、file digest 和 entry-rendered digest。v2181 在已有 digest 规则旁边加了一条很窄的规则：只匹配 `(chained to )[a-f0-9]{64}`，替换成 `chained to <digest>`。它不匹配所有 64 位 hex，也不匹配业务状态、blocker code、warning code 或 recommendation 文本。

第二个入口是 `test/rendererMigrationV2180Parity.test.ts`。这里仍然只测试五个 v2180 renderer，仍然强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true"`，仍然固定 `generatedAt`，仍然检查 normalized length、sha256、H1/H2/H3 数量和结尾换行。唯一变化是 prerequisite-intake case 的 expected length 从 10591 变为 10535，expected sha256 变为 `fa329...`。其他四个 case 不变，说明新增 normalizer 规则的影响范围正好落在那一句 notes digest 上。

第三个入口是 v2181 的 evidence 和解释文档。它们记录 CI run、失败 step、失败 case、失败断言、根因、变更文件、更新后的稳定指纹和本地验证命令。这个入口不参与运行时，但对后续维护很重要：如果之后又出现 CI-only hash drift，维护者可以先看 v2177 和 v2181 两个 repair 版本，判断是路径标签、notes digest，还是产品输出真的变了。

这个入口设计保持了一个原则：parity test 应该对产品语义敏感，对环境噪声迟钝。`chained to <digest>` 里的 digest 不是本版 renderer 迁移想验证的语义；它来自上游 archive 内容，在 Windows 与 Linux checkout 下可能因为换行字节不同而派生不同值。section 标题、字段标签、ready/blocked 状态、production blocker、warning、recommendation 和 next action 才是 renderer 迁移必须锁住的内容。v2181 只折叠前者，不碰后者。

还有一个容易误判的点：这次不能把 normalizer 简化成“看到 64 位 hex 就全部替换”。很多 renderer 报告会把 digest 当成业务证据展示，例如 archive verification 的 digest valid、source archive digest、evidence digest 或 release package digest。如果全部替换，测试会变得很安静，但也会失去发现 digest 字段消失、字段名错位、digest 被放到错误 section 的能力。v2181 选择只匹配 `chained to` 这句 notes，是因为 CI 失败和本地排查都指向这一条自然语言链路说明。它不扩大到其他 digest 场景，也不改变后续 archive verification 应该承担的字节级审查责任。

## Response Model / 响应模型

v2181 不改变 public response model。`renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeMarkdown(...)` 仍然会输出 `The prerequisite intake is chained to <真实source decision digest>.` 这句话。真实报告保留 digest 是合理的，因为审查者可能需要把 v354 prerequisite intake 追溯到 v353 decision record。如果产品输出直接隐藏 digest，报告的证据链会变弱。

变化发生在 normalized comparison string。parity test 生成真实 Markdown 后，会调用 `normalizeRendererMigrationMarkdown(...)`。从 v2181 开始，notes 里那一句 chained source digest 会进入占位比较面：不同平台、不同 checkout 换行、不同 absolute workspace 环境下，只要报告结构和业务字段一致，hash 就稳定。这样测试仍然能发现 renderer section 顺序、meta 标签、message 区域或 helper 输出的真实漂移，却不会被上游 digest 的平台字节差异干扰。

更新后的 prerequisite-intake 稳定指纹是 length 10535、sha256 `fa32926da5b8871891ab5a0a6fd4bebc21e886b968f3c9d03a5c1e442275d2c1`、H1 为 1、H2 为 11、H3 为 0。length 减少 56 个字符，正好是 64 位 digest 替换成 `<digest>` 后的差值。这个数字解释了为什么 CI 失败时 length 没有先暴露问题：Windows 和 Linux 都是 64 位 hex，只是具体内容不同，所以长度相同而 hash 不同。

这里保留 length 和 sha256 的双重断言。length 能快速提示是否有段落规模变化，sha256 能发现同长度内容替换，标题数量能发现层级漂移。v2181 没有降低断言强度，只是让断言对准“迁移后应该稳定的 renderer 形态”。如果未来某个改动删除了 notes 行、改了 section heading、把 warning 挪到 recommendations，或者改变了 closed scope 展示顺序，这些检查仍然会失败。

## Upstream Evidence / 上游证据

直接上游证据是 GitHub Actions run `28875448789`。这个 run 的 Typecheck 和 Lint 都通过，Test 阶段跑到最后报一个失败：`test/rendererMigrationV2180Parity.test.ts` 的 `sandboxHandleReviewPrerequisiteIntake` case 期望 hash 为 `6a7f...`，实际为 `c2a0...`。同一个 run 里其余 541 个 test files、1646 个 tests 都已通过到失败汇总前，这说明问题范围非常窄。

本地复查时，v2180 parity 单跑通过，coverage instrumentation 下单跑测试本身也通过；退出码失败只来自 focused coverage 命令无法满足全项目 coverage 阈值，不是 parity 断言失败。继续打印 normalized Markdown 中的 digest 行后，发现结构化字段已经被替换为 `<digest>`，但 notes 里仍保留一条 64 位真实 digest：`The prerequisite intake is chained to ...`。这条线索解释了 CI 现象：同长度 digest 内容不同，长度检查过，hash 检查红。

这个差异为什么会发生？source decision digest 来自上游 archive 内容的稳定 JSON 或文件 digest 链。Windows 工作树可能把文本文件检出为 CRLF，Linux runner 检出为 LF；如果 digest 链包含这些字节，两个平台就会得到不同的 64 位 hex。对 archive verification 来说，这种差异需要在自己的归档检查里被解释；对 renderer migration parity 来说，它不是本版要证明的 public renderer 结构。因此 v2181 把它从比较面剥离。

Java 和 mini-kv 在 v2181 中没有被要求做任何事。这个修复只发生在 Node 测试工具和 v2180 parity expected 值里，不消费新 Java / mini-kv evidence，不启动服务，不要求上游仓库等 Node 批准。并行状态仍然是 recommended parallel。只有未来真实 integration capstone 才需要写清服务端口、owner、cleanup 和跨项目依赖。

## Service Flow / 服务流向

运行时服务流保持 route -> loader -> profile -> renderer -> Markdown。v2181 不进入这条链。loader 仍然生成 sourceNodeV353、necessityProof、prerequisiteInputs、closedScopes、intakeRecord、checks、summary、messages 和 endpoints；renderer 仍然使用 builder 输出 meta、sections、messages 和 list；真实 Markdown 仍然包含 source decision digest。用户和下游报告看到的内容不变。

测试服务流是 profile -> renderer -> raw Markdown -> normalizer -> length/hash/headings assertions。v2181 改的是 normalizer 这一格。raw Markdown 保持完整，normalizer 在比较前把时间戳、路径、size、digest 等环境噪声折叠为占位。这样 parity test 的 hash 代表“迁移后的结构与业务表达是否稳定”，而不是“某台机器的 checkout 字节是否和另一台完全一致”。

把规则放在共享 normalizer，而不是 v2180 test 内联 `.replace(...)`，是为了维护性。renderer migration 已经跨了很多版本，如果每个测试文件都自己处理一次路径或 digest，后续维护者很难知道哪些规则是全局经验，哪些只是某个 case 的临时补丁。共享 normalizer 让规则集中，也让 v2167 到 v2180 的迁移回归可以一起验证。v2181 跑了 9 个 migration test files，证明这个共享规则没有破坏历史 case。

这个 flow 还有一层安全含义：normalizer 不是“让测试永远过”的黑箱。它的每条规则都必须指向一个明确的环境噪声来源，并且要尽量窄。v2181 没有写成替换所有 `[a-f0-9]{64}`，因为很多 digest 字段本身就是业务证据，全部替换会让测试失去发现 digest 展示缺失或字段位置漂移的能力。只替换 `chained to <digest>` 这个 notes 句式，是为了把影响控制在 CI 失败根因上。

从后续版本的角度看，这个 service flow 也给剩余 14 个 renderer 留了一个判断模板。迁移 renderer 时，先看 public Markdown 是否保持完整证据；再看 normalized parity 是否只剥离时间、路径、大小和平台派生 digest；最后看 hash 是否仍覆盖业务形态。只要这三层分清，后续即使出现新的 runner-only 差异，也能先定位到“比较面”还是“产品输出”，而不是在红 CI 之后盲目改 expected 或改 fixture。

## Safety Boundary / 安全边界

第一条安全边界是产品输出不变。没有改 renderer、builder、loader、route、schema、fixture 或归档文件。真实 Markdown 继续展示 source decision digest，审查链条不被削弱。v2181 的所有改动都在 test comparison surface 和版本文档里。

第二条安全边界是测试期望不能随便追 CI 实际值。如果只是把 expected sha 从 `6a7f...` 改成 CI 收到的 `c2a0...`，Windows 本地就会反向失败，而且问题本质没有解决。v2181 先找到未归一化的 notes digest，再扩展 normalizer，再重新计算平台无关 fingerprint。这个顺序保证修复面有证据支持。

第三条安全边界是不要改 fixture 字节来迎合测试。CI 红是因为 renderer migration parity 的比较面太宽，不是因为 upstream fixture 错。修改 fixture 可能改变大量 archive digest，反而会扩大风险。v2181 保留 fixture 不动，说明上游证据仍按原样存在，修复只负责把上游内容派生 digest 从 renderer 结构比较中剥离。

第四条安全边界是红 CI 优先。v2180 远端红之后，不能继续做 v2182 功能迁移。v2181 必须先把 master 拉回绿色，等新的 GitHub Actions run 完成后再按用户要求停下。这个节奏符合计划书里的规则：CI 报错先修，连续推进目标让位于检查点和红灯修复。

第五条安全边界是 normalizer 不得吞掉业务字段。ready 状态、decision、check count、production blocker、warning、recommendation、next action、section heading 和 closed scope 仍然进入 hash。v2181 的规则只替换 notes 中的 source digest 值，保留句子本身和上下文。如果未来业务文案从 “chained to” 改成别的含义，hash 会变；如果只是 digest 内容随平台换行变化，hash 不变。这正是比较面的目标。

第六条安全边界是修复完成后停止本轮推进。用户明确要求“做完先停”，所以 v2181 不借 CI repair 的机会顺手迁剩余 renderer，也不读写 Java / mini-kv。收口标准只有一个：v2181 本地门通过、提交、tag、push，并等待新的 GitHub Actions run 到绿色。如果远端仍红，就继续修这个红灯；如果远端绿，就停止，不进入 v2182 功能切片。

第七条安全边界是把失败保留成可学习的工程记录。v2181 不把 v2180 的红灯描述成偶发噪声，而是写入 evidence：哪个 run、哪个 step、哪个 case、哪个断言、为什么本地和 Linux 会不同。这样的记录能帮助后续版本更快判断类似问题，不需要重新猜测是 renderer 行为变了、fixture 变了，还是 normalizer 比较面漏了一类环境字段。

因此本版完成后只等待远端绿灯，不把修复窗口扩大成新的迁移窗口，避免范围外扩，务必停止。

## Test Coverage / 测试覆盖

第一组验证是 v2180 focused parity 和 census：`npx vitest run test/rendererMigrationV2180Parity.test.ts test/rendererCensusScript.test.ts --maxWorkers=2`，结果是 2 个 test files、3 个 tests 通过，并继续打印预期的负向 census 文案 `Renderer census regression: 14 exceeds --max-unstandardized=13.`。这证明 v2181 没有放松 N1 census ratchet，也证明新的 prerequisite-intake fingerprint 自洽。

第二组验证是历史 migration 回归：`npx vitest run test/rendererMigrationV2167Parity.test.ts test/rendererMigrationV2168Parity.test.ts test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts test/rendererMigrationV2175Parity.test.ts test/rendererMigrationV2176Parity.test.ts test/rendererMigrationV2178Parity.test.ts test/rendererMigrationV2179Parity.test.ts test/rendererMigrationV2180Parity.test.ts --maxWorkers=2`，结果是 9 个 files、10 个 tests 通过。它证明共享 normalizer 新增规则没有误伤 v2167 到 v2179 的既有比较面。

第三组验证是文档门、typecheck、lint 和 build。文档门确认 v2181 的中文讲解满足章节、禁用短语和中文字符要求；typecheck 确认 normalizer 正则修改没有类型问题；lint 仍然是 0 errors / 263 existing warnings；build 证明生产 TypeScript 编译通过。最终远端证据仍以 GitHub Actions v2181 run 为准，因为原失败只在 Linux runner 完整 coverage 中暴露。

这套覆盖不是为了把一个小修复包装成大功能，而是为了把红 CI 修复闭合到可审查状态。focused parity 证明直接失败点修好，migration 回归证明共享工具没有误伤，文档门证明修复原因可读，typecheck/lint/build 证明工程门没退化，远端 CI 证明 Linux runner 不再漂。五层证据合起来，v2181 才算真正收口。

## One-sentence Summary / 一句话总结

v2181 把 v2180 prerequisite-intake notes 里的 source decision digest 纳入 renderer migration normalizer，修复 Linux runner 上的同长度 hash 漂移，同时保持产品 renderer、loader、route、schema、fixture 和真实 Markdown 输出全部不变。
