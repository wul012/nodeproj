# v2188：让 evidence service 只负责编排，而不是同时保存全部证据知识

## Goal and Non-goal / 目标与非目标

v2188 延续 N5 的同一目标，但解决的是不同一层的维护问题。v2187 已经建立全仓 source-size census，并把十六个超限文件降到十个；剩余十项中有六项属于同一种历史演进结果：一个 service 从最初的 loader 慢慢吸收了上游路径、局部 evidence interface、JSON 防御读取、允许值集合、消息规则与 renderer。每一段单独看都合理，合在一个文件里却使读者无法快速判断哪些是静态事实、哪些是运行编排。

本版把这六个文件的 evidence 所有权迁到 `src/evidence`。原 service 继续负责调用前一阶段 profile、构造 Java/mini-kv reference、计算 checks、汇总 blocker/warning/recommendation、形成 digest，并从原路径导出 JSON/Markdown 能力。新 evidence 模块只承载冻结路径、局部结构类型、无副作用字段读取和纯映射函数。这个边界让主文件降到八百行以内，同时没有把核心流程拆成难以追踪的微函数网络。

非目标首先是功能。没有新增 route、profileVersion、check、message、fixture 或上游版本要求；没有改变历史 evidence fallback；没有把 blocked 状态改成 ready；没有给真实执行、凭据读取或 sibling 启动开放权限。非目标也包括通用化：六组证据属于不同版本与不同安全场景，本版没有创建一个巨型 `sharedEvidence.ts` 把所有路径和类型混在一起。每个模块名称仍直接对应唯一 service，便于查找和删除。

## Entry Points / 入口

批次入口先由 v2187 的远端结论守门。Node Evidence 运行 29097275944 在 13 分 48 秒内通过 typecheck、lint、正式 test、build、health、metrics 与 release-evidence smoke；只有该 run 变成 success 后，v2188 才开始写入。这样执行了 final-push 简报“上一版红灯阻断新写入”的要求，而不是在 CI 运行期间提前叠加下一批。

六个公开入口保持原样：`loadManagedAuditManualSandboxConnectionRehearsalPacketReview`、`loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification`、`loadManagedAuditManualSandboxConnectionPreconditionIntake`、credential resolver pre-implementation echo verification loader、sandbox endpoint handle echo verification loader，以及 `loadManagedAuditSandboxAdapterDryRunPackage`。调用它们的 routes 和测试文件都不改 import。

新内部入口位于六个 `src/evidence/*Evidence.ts` 文件。rehearsal packet evidence 负责 accepted WAL reference、runtime-smoke/manifest 读取和字段提取；operator window evidence 负责 Java v93、mini-kv v102 路径及本地 reference/check/message 结构；precondition evidence 负责 Java v91、mini-kv v100 guard 与相关结构；pre-implementation evidence 负责路径和 code-to-snippet 映射；endpoint handle evidence 负责路径与防御 JSON reader；adapter package evidence 负责 release/digest 允许集合与 runtime-smoke reader。

机械门入口仍是 `npm run source:size:census -- --json`。v2188 将 remediation baseline 从十项缩到四项，没有修改测试本身的 expected count。`test/sourceSizeRatchet.test.ts` 读取 baseline 后自然接受新状态，继续拒绝未知超限、已登记增长和 stale 条目。governance 入口 `test/governanceGrowthRatchet.test.ts` 同时证明 root service 数没有因六个新模块增长，因为 evidence 数据已经被正确分类到顶层 evidence 所有权，而非伪装成新 service chain。

## Response Model / 响应模型

公开响应模型完全不变。六个 profile 仍从原 service 文件导出或由既有 Types 文件定义，JSON 字段、数组顺序、布尔安全标志与 digest 输入不变。对于前三个旧式单文件模块，本地 reference、evidence file、snippet、checks 和 message 类型从 service 移到 evidence 文件后，以 type-only import 回到主模块；TypeScript 编译产物不会为这些 interface 生成运行时代码。

pre-implementation echo verification 已经拥有独立 Types 和 Renderer，因此不重复迁移公开模型。它只把 `PROFILE_VERSION`、route/plan/upstream path 常量、boundary/requirement code 数组以及两个 code-to-snippet 纯映射函数移出。映射函数仍接收同样的 union type并返回同样的 literal id，调用点与 switch 分支不变。主文件从 848 降到 758，新 evidence 文件为 120 行。

sandbox endpoint handle 模块同样保留既有 Types/Renderer。新 evidence 文件中的 `readJsonObject` 在文件不存在时仍返回空对象，JSON 解析结果不是普通对象时仍返回空对象；string/number/boolean field reader 的 null 语义不变。`snippetMatched` 继续要求 id 相等且 matched 为真。迁移没有把防御失败改成异常，也没有用宽松类型接受数组。

adapter dry-run package 的 runtime-smoke reader 保留 `parseJsonEvidence`，只是依赖方向变为 evidence 模块调用已有 service helper。不存在时返回空对象，存在时仍使用 historical resolver 读取同一路径。主 service 继续拥有 evidenceFile、snippet、render、blocker 等行为函数，因此新模块不会成为第二个 package service。

## Upstream Evidence / 上游证据

本版没有消费 sibling 的新鲜工作树。所有 Java/mini-kv 路径都是原源文件中已经存在的冻结字符串，并继续通过 `historicalEvidenceResolver` 在本地 sibling 与 historical fallback 之间解析。移动路径常量不会改变 resolver 的输入值；若字符串中含 Windows 盘符、中文目录或历史版本号，它们按原文本搬移，不重新编码、不格式化、不改写斜杠。

rehearsal packet 仍识别 mini-kv v98 到 v102 的 accepted execute-with-WAL reference，precondition 仍识别 v100 到 v102 的 rolling guard，operator window 仍检查 v102 no-start/no-write receipt。pre-implementation 仍指向 Java v112 与 mini-kv v119，endpoint handle 仍指向 Java v104 与 mini-kv v113，adapter package 仍保留 v91/v92/v93/v95 的 walkthrough 与当前 receipt digest 集合。版本含义没有被合并或推断。

跨项目并行规则仍是 Java 与 mini-kv recommended parallel。Node 只重组自身代码，不要求 sibling 先交付任何版本，也没有启动、停止、编译或测试它们。所有本地契约测试可以依赖 frozen historical fallback 完成，因此 Node 不是这两个项目的 pre-approval blocker。

## Service Flow / 服务流向

以 rehearsal packet review 为例，loader 仍先加载 Node v231 preflight verification，再构造 Node v232 guard、Java v89 context-header reference 与 mini-kv v98 execute-with-WAL reference。变化只发生在准备阶段：路径、accepted reference 数组和 JSON reader 从 evidence 模块导入。主文件继续组合 review、checks、evidence files 和 snippets，最后生成 quality digest 与 next actions。读取失败仍变成空记录和 blocker，不会越过安全门。

这一组拆分中，rehearsal packet review 的输入包括前序 preflight profile、Node guard 源文件、Java 上下文字段材料、mini-kv 运行烟测和 verification manifest。新模块只回答“证据在哪里、怎样安全读成普通对象、哪些 WAL 版本被当前审查接受”。主 service 仍回答“每份证据是否存在、snippet 是否命中、审查是否 ready、缺项应产生哪一个 blocker”。因此文件读取细节与审核结论被分开，维护者修改 accepted 版本时不会误入 blocker 聚合，修改审核规则时也不必翻过一百多行路径常量。

operator window 与 precondition 的流向相似，但本版没有强行抽象成共享 builder。它们的 reference 字段、accepted version 规则和失败代码不同，过早共享会把多个历史契约塞进条件分支。现在每个 service 的 orchestration 留在一个文件内，evidence 文件只提供它需要的词汇表，读者可以在两次跳转内看完完整流程。

operator window evidence verification 接收前序 checklist，并核验 Java v93 checklist echo 与 mini-kv v102 no-start/no-write receipt。迁出的 interface 描述的是这两份上游材料和本地 evidence/snippet 载体，迁出的常量描述 runbook、walkthrough、builder、integration test 与 receipt 路径。主 service 保留 sourceNodeV238、reference 构造、receipt 内容验证、checks 和 message 汇总。这样一来，若 mini-kv receipt 字段不匹配，失败仍由原 checks 精确表达，而不是由 evidence 模块擅自决定窗口是否可用。

precondition intake 的输入是 blocked-execution rehearsal、Java v91 precondition receipt、mini-kv v100 rolling guard、runtime smoke 与 manifest。evidence 模块保存 accepted runtime guard 列表和字段结构，主 service 继续决定 Java receipt 是否声明只读边界、rolling guard 是否覆盖当前 fixture、运行配置是否仍禁用上游动作。`JsonObject` 移出后只用于描述解析结果，不改变 `recordField`、`arrayField`、`stringField` 等函数对缺失值的处理。任何证据缺失仍汇入 blocker，不能因为拆分后类型推断更宽而被当作通过。

pre-implementation 的 boundary code 与 requirement code 映射是纯函数，迁移后由 evidence 模块导出。主 loader 创建 Java/mini-kv reference 和 checks 时调用同一函数，sha256StableJson 仍在主 service 汇总最终结构。这样静态映射可独立维护，而 digest 责任没有分散。endpoint handle 的 JSON reader也只返回解析字段，真正的 evidence file digest、snippet 构造、checks 和 blocker 仍由主 service掌握。

pre-implementation echo verification 还保留一个重要边界：新 evidence 模块可以知道某个 requirement code 对应哪个 snippet id，却不能判断 requirement 已满足。满足性仍由主 service 根据 Java echo、mini-kv non-participation 与 Node plan 三方数据计算。`arrayEquals` 仍按顺序比较数组，避免集合相同但契约顺序变化时静默通过。路径常量原样迁移，包括历史中文目录中的既有字节；本版没有借机修正显示文字，因为那会把重构变成证据内容迁移。

sandbox endpoint handle 的读取链先通过 historical resolver 判断文件是否存在，再解析 JSON，并对每个字段执行严格类型检查。新模块返回空对象或 null，主 service 据此形成 reference、evidence file 和 snippet，再计算 endpoint handle、credential resolver、no-participation 与执行禁止项。`isRecord` 明确排除数组，`snippetMatched` 同时要求 id 与 matched；这两点防止结构近似的数据误过闸门。迁移只改变函数所在文件，不改变异常吞吐、默认值或检查次序。

adapter package 的 evidence 模块读取 runtime smoke 后，把普通对象交还主文件。主文件再构造 package plan、source Node v224、Java v82 和 mini-kv guard reference，并计算 checks。这个方向避免 evidence 模块反向调用 loader，依赖图只有 service 指向 evidence；evidence 只依赖低层 historical resolver 或 JSON utility，不依赖当前 service，因此没有运行时循环。

adapter package 同时维护多代 mini-kv walkthrough、允许的当前 release、receipt digest 与 artifact path hint。它们属于静态兼容性词汇，迁入 evidence 后与 runtime-smoke reader 放在同一证据所有权中。主 service 仍创建 dry-run package plan、收集 evidence files/snippets、核验 no-write guard，并渲染 Markdown。若 digest 列表发生变化，现有 package 测试会从原公开入口看到结果；新模块本身不提供 route，也不能绕过 `UPSTREAM_ACTIONS_ENABLED=false` 等运行边界。

## Safety Boundary / 安全边界

第一条边界是主 service 必须保留决策权。checks、blocker、warning、recommendation、digest 与 nextActions 没有迁到 evidence 文件；否则静态数据模块会逐渐变成隐藏 service。新模块只能提供事实和无副作用解释。所有提取都通过 TypeScript AST 选中完整顶层声明，避免在函数中间剪切闭包变量或改变语句顺序。

第二条边界是导出路径稳定。routes 和其他 services 仍从原文件导入 profile loader 与 renderer，前三个本地 profile interface 也仍在原模块。新 evidence interface 只在内部以 type-only import 使用，不要求外部消费者改路径。已有 Types 文件继续是 pre-implementation 与 endpoint handle 的公开类型来源，没有产生第二套同名 schema。

第三条边界是治理文件数不增长。新增六个文件位于 `src/evidence`，因为它们没有 loader、route registration、网络调用或业务决策，不属于 `src/services`。这不是把文件藏入 services 子目录：顶层目录直接表达不同责任，source-size census 仍递归扫描它们。root service/route 文件数保持 1125/80，既有 ratchet 不放宽。

第四条边界是 warning 与测试基线。初次 typecheck 通过，但 lint 指出四个迁移后冗余 import：两个 pre-implementation code type、一个 precondition route 常量和 adapter 的 parse helper。删除后 lint 回到 0 error/263 warning。这里没有趁重构清扫无关 warning，也没有修改 warning baseline；只消除本版引入的噪声。

第五条边界是可回退性。每个拆分都可以通过把 evidence 声明原样放回对应 service 而独立回退，不需要同时撤销另外五组，也不需要修改 route table。新文件没有共享可变状态，常量仍在模块加载时一次构造，reader 每次按原逻辑读取目标文件。若后续评审发现某个边界命名不清，可以只调整该 evidence 模块和一条 import；不会触发跨服务数据迁移。这种局部可逆性是本版选择六个同类但互不合并模块的原因。

## Test Coverage / 测试覆盖

聚焦层包括六个原公开入口测试、source-size ratchet 和 governance growth ratchet，共 8 文件、25 项测试。它们分别验证 JSON/Markdown route contract、安全标志、历史 fallback、digest/summary、unknown/growth 负例以及 service/route 文件数。六个主文件行数现在分别为 760、754、718、758、779、778，新 evidence 文件分别为 180、163、170、120、69、70，所有文件均低于八百。

source-size census 扫描数量从 v2187 的 1223 增到 1229，这是六个新 evidence 文件的真实增长；同时 oversized count 从 10 降到 4。增长总文件数并不等于治理链增长，因为新增文件不具备 service 行为，且每个都对应从超限文件移出的现有职责。baseline 删除六个 v2188 条目后，unknown、grown、stale、countExceeded 全部为空。

最终验证在讲解完成后运行。它包括 typecheck、lint、build、renderer census、source-size census、文档质量门和固定两 worker 的完整 Vitest shards。完整 suite 必须覆盖所有 parity 与 governance tests，不能只用 8 个聚焦文件替代。提交后还要等待 Node Evidence 的正式 coverage 和 safe smoke；若 CI 红，v2189 不得写入。

失败排查也按层分开。若 typecheck 失败，先检查搬走的 interface、type-only import 和 evidence 模块依赖方向；若 lint 增长，只删除本版产生的冗余 import，不扩大到全仓清扫；若聚焦 contract 失败，比较原公开入口生成的 profile 和 Markdown，禁止修改 expected；若 source-size ratchet 失败，判断是 baseline 未删除、文件继续增长还是新路径未登记；若 governance ratchet 失败，检查是否误把 evidence 模块放进 service 根目录。每种失败都有单独修复方向，避免为了一个数字调整多个无关门。

v2189 将处理剩余四个不同难度边界。dashboard client 需要按字节稳定的有序片段，status routes 需要保持注册顺序和 schema，rehearsal guard 与 runtime packet 需要把 evidence/record support 移出但保留决策编排。最终 baseline 变成空数组，`maxOversized=0`，同一 ratchet 才成为 N5 E9 完成门。

## One-sentence Summary / 一句话总结

v2188 让六个 evidence service 回归“编排与决策”职责，把静态证据和纯解析迁入明确的 evidence 所有权，并在零契约漂移、零治理基线放宽的前提下把超限文件从 10 收缩到 4。
