# Node v2114 代码讲解：verification report builder 与第一批 renderer 收敛

## Goal and Non-goal / 目标与非目标

目标是把一批重复的 Markdown verification renderer 收敛到共享 `verificationReportBuilder`，并用 focused tests 证明输出形态没有被业务重写。这个目标有三个边界：第一，保留所有 public export、文件名和调用方式；第二，不修改既有测试期望；第三，只迁移能够被当前 spec 准确表达的标准 renderer。非目标也必须说清楚：本版不新增任何 echo、readiness、verification、closure 链路，不修改路由行为，不启动 Java 或 mini-kv，不读取真实凭据，不把 deferred 的嵌套 section renderer 强行塞进第一版 builder。这样做的价值不是追求一次性迁移数量，而是给后续批次提供一个可以反复复用、失败时容易回退的工程模板。

## Entry Points / 入口

本版最重要的入口是 `src/services/verificationReportBuilder.ts`，它定义 `renderVerificationReportMarkdown` 和四类 section spec。两个参考迁移位于 `src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationRenderer.ts` 与 `src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationRenderer.ts`。第一批新增迁移集中在 `javaMiniKvRouteCatalogCleanup...CloseoutRenderer` 和 managed-audit disabled/fake-harness 相关 renderer。治理入口还包括 `test/verificationReportBuilder.test.ts`、`test/governanceGrowthRatchet.test.ts`、`docs/plans/v2114-codex-migration-playbook.md`、`START_HERE.md` 的 curated tour，以及 `e/2114/evidence/verification-report-builder-batch-1-v2114-summary.json`。

## Response Model / 响应模型

builder 的响应模型不是业务 profile，而是一份渲染规格。`title` 对应原始 Markdown 的 H1；`meta` 对应第一个 `##` 前的 bullet 区；`sections` 对应每个二级标题和正文。section union 有四种：`entries` 交给 `renderEntries`，`messages` 交给 `renderMessages`，`list` 交给 `renderList`，`lines` 保留调用方已经生成好的 Markdown 行。这个模型的关键是有序和透明：字段不会被排序，空值文案不会被自动改写，局部 helper 不会被吞掉。每个迁移文件仍然显式列出自己的 meta 和 sections，所以 reviewer 可以像读清单一样确认报告内容，而不用重新审一遍数组拼接协议。

## Upstream Evidence and Config / 上游证据与配置

v2114 不消费 fresh Java 或 mini-kv evidence，也不要求 sibling 项目等待 Node。证据来自三个本地来源：playbook 中的迁移规则、focused tests 对 Markdown 输出路径的覆盖、以及 e/2114 归档记录。配置层保持普通测试和 CI 的安全默认值：`UPSTREAM_ACTIONS_ENABLED=false`，upstream probes 不作为迁移前置条件，managed-audit 连接不打开。`.idea/` 从 Git 索引移除属于 repo hygiene，不影响运行时配置；START_HERE 的 curated tour 是阅读入口更新，不是功能开关。

## Service Flow / 服务流程

迁移后的服务流程可以分成三步。第一步，原 service 仍然构造各自 profile，例如 closeout profile 或 upstream echo verification profile，这部分业务逻辑完全不动。第二步，renderer 把 profile 字段映射为 builder spec，显式声明标题、meta 和 section。第三步，`renderVerificationReportMarkdown` 用统一空行协议调用 `liveProbeReportUtils`，返回最终 Markdown 字符串。对于路由层、archive verification 层和测试层来说，导出的 `render...Markdown` 函数没有变；变化只发生在函数内部的重复布局代码。这个流程让后续排查更直接：业务字段错看 profile 构造，Markdown 空行错看 builder，字段遗漏看迁移 spec。

## Safety Boundary / 安全边界

本版所有安全边界都是只读治理边界。迁移 renderer 不会启动 Java service，不会启动 mini-kv service，不会连接 managed audit，不会写 approval ledger，不会执行 SQL，不会读取 credential value，也不会改变生产 readiness 含义。讲解里提到 `executionAllowed=false` 是为了说明边界保持关闭，不是声称生产能力已经开放。deferred 文件也体现这个安全思路：遇到循环、嵌套 `###`、section-array aggregator 时先记录原因，等后续设计更合适的 helper 模式，而不是为了凑批次数量扩大 builder 权限。

## Test Coverage / 测试覆盖

本版验证分为本地基础验证、本地批次验证和远端 CI 验证修复三层。基础验证包括 `npm run typecheck`、`test/verificationReportBuilder.test.ts`、`test/governanceGrowthRatchet.test.ts`、两个参考迁移测试。批次验证包括 10 个新增迁移 renderer 的对应 focused tests，加 ratchet，共 15 个测试文件、28 个测试通过。本地还跑了 `npm run build`，构建产物随后删除。第一次远端 CI 暴露的是本讲解文档没有命中 code walkthrough required shape，而不是 renderer 行为失败；修复策略是补齐讲解结构和中文长度，不修改任何测试期望。

## One-sentence Summary / 一句话总结

v2114 把 verification Markdown 的重复拼装从多个 renderer 收敛到一个窄 builder，用测试和 ratchet 证明这是一版维护性增强，而不是新增治理链或生产执行能力。

## 这版解决什么

v2114 不是继续增加一个新的治理链，也不是再扩一条 echo / readiness / verification 路由。它处理的是另一个更后期、更真实的工程问题：当项目已经有大量版本化证据服务时，维护成本开始从“功能是否存在”转向“相同渲染骨架是否在 200 多个文件里复制”。这类复制短期看不危险，因为每个 renderer 都只是拼 Markdown；但长期会让任何格式调整、质量规则和阅读入口都变成全仓搜索。更重要的是，AGENTS.md 已经写了 Governance Growth Control：新增治理链之前要先证明必要性，并优先使用 catalog/template builder。v2114 把这条规则从文字要求变成代码结构和测试约束。

本版的核心新增文件是 `src/services/verificationReportBuilder.ts`。它并不理解任何业务领域，也不会读取 Java、mini-kv 或 managed audit。它只表达一种共享 Markdown 形态：标题、meta bullet、若干 `##` section，以及 section 内的 entries、messages、list 或预渲染 lines。这个边界很重要，因为 builder 一旦掺入业务判断，就会变成新的巨型服务；现在它只是把已经到处复制的 layout 收起来，保留每个 profile 原有字段选择和顺序。

## Builder 的设计边界

`renderVerificationReportMarkdown` 接收一个 spec：`title`、`meta`、`sections`。`meta` 是有序二元组数组，因此原 renderer 里的标签顺序能逐行保留；`sections` 是一个窄 union，分别覆盖四种已经存在的拼装方式。`entries` 继续复用 `renderEntries`，`messages` 继续复用 `renderMessages`，`list` 继续复用 `renderList`，`lines` 用来承接已经渲染好的局部行，比如 `array.map((x) => "- ...")` 或保留本地 helper 的输出。

这个设计故意没有加入条件 section、嵌套 section builder、自动标题格式化或字段排序。原因很简单：v2114 的目标是字节等价迁移，不是重写报告语义。越多“聪明”逻辑越容易改变空行、标题、空列表文案或数组格式。当前 builder 只负责把相同的空行协议稳定下来：开头 `# title` 后空行，meta 后进入每个 `##`，section 之间由下一段开头的空行自然隔开，最后保留一个 trailing newline。这样它能替换绝大多数手写数组 `.join("\n")` 模板，同时不改变调用方 API。

## 两个参考迁移的意义

规划阶段已经放入两个参考迁移。`managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationRenderer.ts` 是简单形态：profile 字段直接映射为 entries、messages、list。它证明普通 verification renderer 可以变成一份声明式 spec，原有导出函数仍然存在，routes 和 tests 不需要知道内部实现改变。

另一个参考是 `managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationRenderer.ts`。它保留了 `renderJavaReference` 和 `renderMiniKvReference` 这类本地 helper，再通过 `{ heading, lines }` 交给 builder。这说明迁移不要求一次性消灭所有局部函数。只要 helper 的职责是产生局部 Markdown 行，而且原来就已经稳定，保留它比强行抽象更安全。后续批次遇到 helper renderer 时，可以沿着这个模式逐步收敛，而不是把所有字段都塞进一个超复杂 builder。

## 第一批为什么这样选

playbook 给出的 discovery 命令会找到“没有本地 `function` helper”的 renderer，但这个条件不等于“可以安全迁移”。实际检查时，排序最前面的 10 个 raw simple-list 文件包含两类不适合首批处理的形态：一类是 candidate document renderer，内部有 `for` 循环或 `flatMap` 生成多级 `###` 子段；另一类是 operator evidence value supply 的 section renderer，它们返回 `string[]`，本来就不是完整 Markdown 文档。这些文件强行迁移会迫使 builder 过早支持嵌套动态 section 或 section-array aggregation，反而扩大抽象。

因此 v2114 第一批选择了 10 个真正标准的完整报告 renderer：6 个 `javaMiniKvRouteCatalogCleanup...CloseoutRenderer`，加 4 个 managed-audit disabled/fake-harness 相关 renderer。它们都符合相同结构：固定标题、固定 meta、固定 `##` section，section body 要么来自 `renderEntries`，要么来自 `renderMessages`、`renderList`，少量版本列表用 `map` 生成 bullet lines。这样的批次足够代表常见模板，又不会把第一版 builder 拉得过大。

## 迁移后的代码阅读方式

迁移前，维护者需要在每个 renderer 里阅读几十到上百行数组拼接，才能确认它只是常规报告布局。迁移后，代码的重心从“如何拼 Markdown”转成“这份报告有哪些字段和 section”。例如 closeout renderer 现在一眼能看到 meta 包括 service、generatedAt、profileVersion、state、ready、active/source version、executionAllowed；sections 则列出 cross-project mode、route catalog、summary、checks、next actions 等。布局细节被统一，字段选择仍留在本文件，所以审查时不会丢失上下文。

这对后续版本有两个实际收益。第一，新增或审查 renderer 时，可以先问“能否写成 spec”，不能写成 spec 的才值得单独解释原因。第二，如果未来要加强 Markdown 文档质量，例如禁止巨型详细讲解、检查 section 可扫描性、统一 empty-state 文案，入口会更集中。v2114 不是最终重构，但它把最常见的重复形态拉到了一个可维护的中心。

## START_HERE 和 repo hygiene

本版还补了 START_HERE 的 curated tour。这个项目的 `src/services` 已经包含大量版本化治理证据，对新读者来说不应该从最长、最新、名字最复杂的文件开始。tour 把真实入口压到约 15 个文件：Fastify bootstrap、status/dashboard、intent/preflight/dispatch、approval request/decision、upstream boundary routes、clients，以及 report builder 和 liveProbe report utils。每个路径在提交前都做了存在性检查。

`.idea/` 也从 Git 索引移除，并写入 `.gitignore`。这不是功能变化，但它符合“生产前治理型工程”的维护边界：IDE 本地状态不应该占据版本历史，更不应该在后续 renderer 批次里制造噪声。这个清理保留本地 `.idea` 文件，只是不再把它们作为项目交付物。

## 测试如何证明没有改行为

v2114 的验证分两层。Step 0 先验证 Claude 留下的基础文件：typecheck、builder 单测、ratchet 单测、两个参考迁移的 focused tests。通过后才进入批量迁移。第一批迁移完成后，再跑 typecheck，以及 10 个迁移 renderer 对应的 focused tests 和 ratchet。结果是 Step 0 的 4 个测试文件 12 个测试通过，batch focused 的 15 个测试文件 28 个测试通过。

这里没有修改既有测试期望。对 renderer 迁移来说，这一点比多写几个新测试更关键：如果原有测试会读取 Markdown 输出、route Markdown 或 archive verification，那么它们就是字节等价的守门员。测试失败时应该修 spec mapping，而不是调整 expected text。当前批次的测试通过，说明至少这些已覆盖路径的 Markdown 结构、空行、标题、empty text 和列表输出仍被接受。

## Ratchet 的作用

`test/governanceGrowthRatchet.test.ts` 把服务文件和路由文件数量固定在 v2114 的基线：`src/services <= 1125`，`src/routes <= 80`。它不是为了阻止所有新增代码，而是阻止治理层继续无约束增长。后续如果真的需要新 service 或 route，就必须先做等量或更大的收敛，或者在新的计划里写清必要性证明。v2114 当前新增了一个 builder 和一个 ratchet test，但 `.idea/` 从索引移除，renderer 迁移本身不增加服务数量，路线是“先收敛，再谈新增”。

## 后续批次该怎么继续

下一批不应该盲目取 grep 输出的前 10 个文件。更稳的做法是继续按形态分层：先迁移完整报告、固定 section、无循环的 renderer；再处理有局部 helper 的 renderer；最后单独设计 nested section / section-array aggregator 的策略。对于 deferred 的 controlled read-only shard preview 文件，需要先决定 builder 是否要支持嵌套 `###` 子段，还是保留局部 renderer 并只把外层完整报告接入 builder。这个选择应当由失败风险和代码缩减收益决定，而不是为了凑迁移数量。

后续批次还需要保留一个人工审查动作：每迁移一个 renderer，都要看它原先最后是否有 trailing newline、section heading 后是否有空行、空数组时是否产生双空行，以及列表项是否已经提前格式化。多数测试会覆盖这些差异，但不能把测试当成唯一理解来源。迁移者应该先读原文件，再写 spec，再用 focused tests 验证；遇到格式异常时宁可记录 skipped reason，也不要把异常兼容逻辑塞进通用 builder。

这条口径能保护 builder 的小而稳：它只服务共性布局，不承担修复历史格式、解释领域字段、合并 section 层级的职责。职责越窄，后续批次越容易判断某个 renderer 是否真的适合迁移，审查边界也更清楚，维护者读起来也更省力。

到 v2114 为止，245 个 renderer 中已有 12 个接入 `renderVerificationReportMarkdown`，还剩 233 个。这个数字看上去仍然大，但现在已经有了可复制的迁移模板、ratchet、playbook 和首批 focused 验证记录。后续每批继续保持一个原则：少写新抽象，多删除重复拼装；遇到不规则形态先记录原因，不为了表面进度牺牲字节等价。
