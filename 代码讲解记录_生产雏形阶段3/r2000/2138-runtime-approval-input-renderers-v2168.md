# v2168 代码讲解：runtime approval input renderer 标准化

## Goal and Non-goal / 目标与非目标

v2168 的目标是把 runtime execution approval input 链条中的四个完整 Markdown renderer 收进 `renderVerificationReportMarkdown`：`ApprovalInputIntakeContractRenderer`、`ApprovalInputCompletionIntakeRenderer`、`ApprovalInputTemplateValidatorRenderer` 和 `CanonicalApprovalInputValueValidationRenderer`。这四个文件都在讲同一条前置链：先确认 Java/mini-kv 侧输入，随后确认 Node、operator、cross-project 三类输入是否存在，最后验证 canonical approval input 的值能不能支持后续 live-read gate。迁移只处理展示层外壳，输出必须字节等价。

非目标同样重要。本版不创建 runtime window，不生成 operator approval record，不拼装 cross-project runtime execution packet，不启动 Java 或 mini-kv，不连接 managed audit，也不把 `readyForRuntimeLiveReadGate=true` 解释成可以真实执行。renderer 的职责只是把 profile 里已有字段展示为 Markdown；执行许可、审批语义、输入完整性判断仍然由各自 service 和 tests 负责。换句话说，v2168 是 N1 renderer consolidation，不是 runtime execution 功能推进。

## Entry Points / 入口与调用关系

四个入口函数仍保持原名不变，route 层无需感知实现变化。`renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractMarkdown` 消费 Node v400 intake contract profile；`render...CompletionIntakeMarkdown` 消费 Node v401 completion intake profile；`render...TemplateValidatorMarkdown` 消费 Node v402 template validator profile；`render...CanonicalApprovalInputValueValidationMarkdown` 消费 Node v405 value validation profile。调用方依旧只拿到一个 Markdown 字符串。

这些 renderer 的上游 loader 都已经完成业务构造：它们读取历史 fixture、汇总 source Node、Java、mini-kv 状态，计算 checks、summary、blockers、warnings、recommendations 和 nextActions。renderer 不重新计算 digest，也不重新判断 ready flag。迁移后，`renderVerificationReportMarkdown` 只接收 title、meta 和 sections；局部 helper 只负责把数组元素展开成旧格式 bullet 行。

## Response Model / 响应模型与报告结构

intake contract 报告是第一层输入契约，meta 记录 active/source Node 版本、Java v164、mini-kv v155、runtime gate 和执行禁止状态。正文包含 Source Node v399、Java v164 Approval Gate Input、mini-kv v155 Approval Gate Input Precheck、Required Node Approval Inputs、Handoff Requirements、Intake Contract、Checks、Summary、消息区和 Next Actions。它的输出重点是说明 mini-kv 仍是 precheck-only，Node/operator/cross-project 三类输入仍缺失。

completion intake 报告是第二层汇总，接受 Java v165 contract handoff 和 mini-kv v156 final approval input，但仍指出 Node-approved runtime window、correlated operator approval record、complete cross-project packet 缺失。template validator 报告发布三份 machine-checkable template，并检查 target path、archive path、template digest 和目标输入缺失状态。canonical value validation 报告则验证三份 canonical input 的值形状、共同 approval correlation id、runtime packet 关联、GET-only smoke commands 和 cleanup rules。

## Builder Mapping / builder 映射方式

四个文件都改为顶层 builder spec：meta 使用原 label 顺序，普通对象 section 使用 `entries`，消息区使用 `messages`，next actions 使用 `list`。这样 H1、meta bullet、H2 标题、空行和尾换行都由统一 builder 负责，减少每个 renderer 复制同一套数组拼接逻辑。`renderEntries` 仍保留给数组元素 helper，因为这些数组不是普通 object dump，而是有原始嵌套 bullet 语义。

最容易出错的是旧格式里“列表段落后紧接下一个 H2，没有额外空行”的位置。intake contract 的 Required Node Approval Inputs、Handoff Requirements、Intake Contract 必须合在同一个 `lines` section 里；completion intake 的 Completion Inputs 和 Completion Intake 也一样；template validator 的 Input Templates、Target Input Validations、Checks 也合在一个 section 中。这样 builder 不会额外插入空行，SHA-256 才能保持不变。

## Service Flow / 服务流程与调用路径

从服务流看，v2168 的四个 renderer 位于同一条 read-only approval input 链。Node v400 intake contract 先读取 Java v164 和 mini-kv v155，确认 sibling 输入存在但 runtime 仍被三类 Node/operator/cross-project 输入阻塞。Node v401 completion intake 接着读取 Java v165 和 mini-kv v156，确认 sibling 输入更完整，但依然不开放 runtime gate。Node v402 template validator 生成可机读模板，让缺失输入有明确目标形态。

Node v405 canonical value validation 发生在后面，它读取已有 canonical input 值，并验证 approval correlation、window、packet、GET-only smoke commands、service owner 和 cleanup rules。即使这个 profile 的 `readyForRuntimeExecutionPacket` 和 `readyForRuntimeLiveReadGate` 为 true，报告仍保留 `executionAttempted=false`、`startsJavaService=false`、`startsMiniKvService=false` 和 `executionAllowed=false`。renderer 迁移必须保护这种语义张力：可以说明“下一步门已准备好”，不能写成“已经执行”。

## Parity Method / 等价性证明

新增 `rendererMigrationV2168Parity.test.ts` 使用真实 loader，而不是手写窄 fixture。测试设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，用固定 `generatedAt`，并把 fixture 绝对路径和路径分隔符归一化，然后对四份 Markdown 输出断言长度、SHA-256、H1/H2/H3 数量和尾换行。这样既覆盖真实 profile shape，又避免 Windows/Linux 路径差异影响 hash。

四个稳定 hash 分别对应 intake contract、completion intake、template validator 和 canonical value validation。测试没有修改 route 断言，也没有降低业务测试要求；原有四个 route/fallback test 仍然证明 JSON/Markdown route、历史 fallback、身份头和安全字段有效。parity test 的角色更窄也更硬：只回答“builder 迁移是否改变展示字节”。这比 `toContain` 更适合 N1，因为它能抓到空行、字段顺序和尾换行漂移。

## Safety Boundary / 安全边界

runtime approval input 这个名字容易让人误会，以为它已经进入真实执行。本版必须反复强调，四个 renderer 都是前置材料，不是执行器。它们展示的是 approval input 的准备、缺口、模板和值验证，不会启动服务，不会读 credential value，不会解析 raw endpoint URL，不会连接 managed audit，不会写 Java 或 mini-kv 状态。迁移只改变 Markdown 外壳实现，不改变任何 runtime guard。

canonical value validation 是最需要小心的文件，因为它的 profile 中已经有 `runtimeExecutionPacketPresent=true` 和 `readyForRuntimeLiveReadGate=true`。这些字段说明后续 live-read gate 的材料准备充分，但 `executionAllowed=false` 仍然是硬边界。renderer 不能因为字段更积极就隐藏 warning、recommendation 或 stop-gate 文案；builder mapping 必须原样保留所有 section 和 message 内容。

## Test Coverage / 测试覆盖

v2168 focused gate 跑了新增 parity test、四个原 route/fallback test，以及 `rendererCensusScript.test.ts`，共 6 个 test file、14 个测试通过。census 输出从 196/245 standardized 推进到 200/245，unstandardized 从 49 降到 45，remaining shape signals 为 h3 0、forLoop 0、map 43、flatMap 33。reverse ratchet 也按预期报出 `45 exceeds --max-unstandardized=44`，说明收紧门还在工作。

`npm run typecheck` 已通过，证明新 builder spec、数组 helper 和 parity test 的类型关系都成立。后续收尾还要跑文档质量门、lint 和 build；如果 build 生成 `dist`，提交前必须删除。因为本版只改 Node 本地 renderer 和 tests，Java/mini-kv 仍可并行推进，不需要等待 Node 作为 contract approver。

## Maintenance Notes / 后续维护建议

后续处理剩余 45 个 renderer 时，可以沿用 v2168 的判断方法：先看它是否是完整报告，再看旧输出有没有“列表紧贴下一 H2”的格式，再决定是拆成普通 builder sections，还是把多个旧子段合并进一个 `lines` section。不要为了看起来更标准而强行插入空行；N1 的标准是输出等价和维护入口统一，不是重写 Markdown 风格。

同时要避免把 builder 扩展成业务规则引擎。runtime approval input 链条里有很多特殊字段，例如 approvalCorrelationId、loopback ports、operator record、cleanup rules 和 executionAllowed，这些都属于 service profile 的语义。builder 只应该负责稳定排版；如果未来某个字段含义变化，应改 loader、types、route tests 和业务证据，而不是在 renderer builder 里写条件分支。

## Format Details / 格式细节与换行风险

本版最值得记录的细节是换行。旧 renderer 不是每个 `##` 前都有空行，尤其是数组展开后紧接下一段标题的位置。如果把这些段落直接拆成多个 builder section，builder 会在 section 之间自动补一个空行，肉眼看起来只是更松一点，但 hash 会立刻变化。v2168 没有为了“更整齐”改输出，而是把旧格式中连在一起的子段保持为同一个 `lines` section，让外层标题交给 builder，内层标题仍按旧文本出现。

intake contract 的特殊点最多。Required Node Approval Inputs 展开三个缺失输入，每个输入内部有 key、owner、present、complete、file、missingReasonCode、requiredContents；紧接着就是 Handoff Requirements，再紧接 Intake Contract。如果这三段之间插入空行，读者可能不会觉得错，但历史 Markdown 的字节合同会被破坏。completion intake 也类似，Completion Inputs 后面紧跟 Completion Intake。template validator 中 Input Templates、Target Input Validations 和 Checks 也必须连成一块。

canonical value validation 没有这种紧贴标题风险，因为旧文件在 Input References、Target Validations、Value Validation 之间本来就放了空行，所以它可以更自然地拆成多个 builder sections。这也是 v2168 的一个判断样本：不是所有 flatMap renderer 都需要同样的迁移手法，必须先看旧输出的真实空行结构，再决定 builder 映射。统一 builder 不等于统一成一种排版。

## Input Output Example / 输入输出例子

可以把 v2168 看成一条审批输入材料流。输入端是一组已经构造好的 profile：第一个 profile 说明 Java 侧输入已经存在、mini-kv 还只是 precheck，Node/operator/cross-project 输入缺失；第二个 profile 说明 Java 和 mini-kv 输入更完整，但 Node 自己和人工审批材料仍缺；第三个 profile 说明 Node 发布了三份输入模板，让缺失材料有明确格式；第四个 profile 说明三份 canonical 输入已经能被解析和校验。renderer 接收这些对象后，只把它们翻译成 Markdown。

输出端仍然是人读的审计材料，而不是机器执行计划。比如 canonical validation 的 Markdown 会展示 approval correlation id、runtime window id、packet id、GET-only smoke commands 和 cleanup rules，但同一份报告也展示 executionAttempted 为 false、startsJavaService 为 false、startsMiniKvService 为 false、executionAllowed 为 false。这个组合很关键：它告诉 reviewer “材料已经足够进入下一道 live-read gate”，同时也告诉 operator “当前报告本身没有授权执行”。

如果未来有人阅读这些文件，最好的理解方式不是从 renderer 反推业务，而是从 loader 生成的 profile 开始。loader 决定哪些输入存在、哪些缺失、哪些检查通过；renderer 只是把结果排版。v2168 的迁移把排版公共逻辑收束到 builder，所以以后要查业务原因时看 service 和 tests，要查 Markdown 字节差异时看 renderer helper 和 parity test。职责边界越清楚，后续 N1 收尾越不容易变成反复改 hash。

## Review Checklist / 审核清单与故障定位

人工 review 本版时，可以按四层检查。第一层看公开入口是否保持不变，四个导出的 render 函数名称和参数类型都没有变化，route 层不需要改 import。第二层看 meta label 顺序是否保持旧输出顺序，尤其是 ready flags、execution flags 和 service startup flags；这些字段读起来很像状态摘要，顺序变化会影响审计材料的可比性。第三层看列表 helper 是否只返回旧 bullet 行，没有引入新的文案、过滤、排序或聚合。第四层看 parity test 的归一化是否只处理 generatedAt 和 fixture path，而没有把真实内容差异抹掉。

如果 v2168 后续在 CI 上失败，定位顺序也应该固定。若 parity test 长度和 hash 都变，先 diff Markdown，重点看空行和列表段标题；若长度相同 hash 不同，优先看路径分隔符、生成时间或对象字段顺序；若 route test 失败但 parity 通过，说明固定输入下 renderer 没漂移，问题更可能在 loader、route wiring 或 auth headers；若 census 失败，先看四个 renderer 是否仍包含 builder marker，再看是否有新文件进入 `*Renderer.ts` 扫描范围。

本版还保留了一个维护判断：有些 renderer 虽然只是 section renderer 或 profile section renderer，可能并不适合迁移到 verification report builder。剩余 45 个文件里有三类候选：完整报告、片段 renderer、专用 release/profile helper。完整报告优先迁移；片段 renderer 要看是否已经被上层 builder 组合；专用 helper 如果只是服务某个大报告，强行迁移可能只会增加间接层。v2168 的价值在于给出这种分类方法，而不是简单把所有 flatMap 都替换掉。

## Why No Reformat / 为什么不顺手重排

一个很自然的诱惑是：既然已经迁移到 builder，为什么不把所有 section 都整理成更统一的空行风格？答案是 N1 的目标不是美化旧报告，而是降低维护面并证明输出等价。许多旧 Markdown 已经被 route tests、截图、归档说明和外部 review 习惯消费；哪怕只是多一个空行，也会让 hash、diff 和审计材料对比变得嘈杂。更好的路线是先统一实现入口，等 N1 收尾后如果确实要改变排版，再单独做一个有明确迁移说明的格式版本。

这里的工程取舍是“先收敛机制，再讨论风格”。builder 让 H1、meta、section、message、list 的生成规则集中，已经解决了最大维护问题；保留旧空行则让行为证据保持干净。这样 reviewer 可以放心地把本版看作纯 renderer consolidation，而不是夹带文档风格重写。后续如果需要改风格，能在更小的 diff 里只看格式决策，不必同时审业务链和 builder 抽象。

## Cross-project Position / 跨项目位置

v2168 虽然名字里有 Java 和 mini-kv，但它没有要求那两个项目立刻做新动作。Node 读取的是已经冻结或已存在的 sibling evidence，并把这些证据展示为 approval input 链条的一部分。Java 侧负责说明 Java runtime execution approval gate input 是否存在，mini-kv 侧负责说明 final approval input 或 precheck 是否完整；Node 侧负责汇总缺口、生成模板、验证 canonical input，并继续保留执行禁止边界。

因此三项目并行关系很清楚：Java 和 mini-kv 可以继续自己的计划，不需要等待 v2168 批准；Node 也不能把 v2168 写成对 sibling 项目的最终认可。真正的联合执行还要等后续 live-read gate、service startup 规则、端口所有权、cleanup 责任和一键 readiness 报告都明确之后才有资格讨论。本版只是把“材料如何展示”变得更可维护，离“真实启动服务并联合执行”仍然隔着明确的审批和运行门。

交接时应把这点写在最前面：本版只证明四份报告排版等价和实现收敛，不证明 Java 或 mini-kv 已经被 Node 调起，也不证明人工审批已经允许执行。任何后续版本如果要推进真实联调，都必须重新列出启动命令、端口、进程清理、失败回滚和谁负责观察副作用，不能引用 v2168 当作执行授权。

这条边界能防止维护者把“证据可读”误认为“动作可做”。
后续评审也应继续按这个边界验收。

## One-sentence Summary / 一句话总结

v2168 把四个 runtime execution approval input renderer 迁移到统一 verification report builder，用 forced historical fallback 的稳定 hash 和原 route tests 证明 Markdown 字节不变，并把 renderer census 推进到 200/245 标准化、45 未标准化。
