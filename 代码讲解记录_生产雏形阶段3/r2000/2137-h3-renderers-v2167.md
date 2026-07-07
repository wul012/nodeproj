# v2167 代码讲解：剩余 H3 renderer 清零

## Goal and Non-goal / 目标与非目标

v2167 的目标是清理 renderer census 中最后两个 H3 shape signal，把 `operationApprovalEvidenceRenderer.ts` 和 `opsPromotionReleaseAuditTrailMarkdownRenderer.ts` 迁移到 `renderVerificationReportMarkdown`。这两个文件都不是 human approval 链条的一部分，但它们有共同点：都是完整 Markdown 文档输出，都有 H1、meta、多个 H2 section，并且内部保留少量 H3 子块。operation approval evidence 文件包含两份输出：approval evidence report 和 approval evidence verification；promotion audit trail 文件包含 promotion release audit trail record。

本版非目标同样清楚：不改变 operation approval 的 request/decision/evidence 计算，不改变 mini-kv probe 或 Java approval-status evidence，不改变 promotion archive 的 digest、audit item、decision 或 verification 逻辑，不改变任何 route，不放开 upstream execution，也不新增跨项目 fresh evidence。它只把手写 Markdown 外壳迁移到 builder，让重复的 H1/meta/H2/尾换行规则由一个地方承担。

## Entry Points / 入口与调用关系

operation approval 的两个入口是 `renderOperationApprovalEvidenceMarkdown(report)` 和 `renderOperationApprovalEvidenceVerificationMarkdown(verification)`。前者被 operation approval evidence route 使用，用来展示审批请求、reviewer decision、Java/mini-kv upstream evidence、expected side effects、hard blockers、warnings 和 next actions；后者展示 stored/recomputed digest、verification checks 和 next actions。迁移后函数签名不变，route 层和调用方完全不需要感知内部实现变化。

promotion audit trail 的入口是 `renderOpsPromotionReleaseAuditTrailRecordMarkdown(record)`。它被 promotion archive release audit trail route 调用，也通过 `opsPromotionArchiveReleaseDeploymentRenderers` 和其他 barrel re-export 暴露。它展示 release promotion 的 audit trail metadata、decision、receipt verification、audit items 和 next actions。本版同时跑了 re-export 测试，确认模块拆分后的入口稳定性没有被破坏。

## Response Model / 响应模型与报告结构

operation approval evidence report 的 meta 包含 service、generatedAt、state、request id、decision id、intent id、action、target 和 evidence digest。sections 包含 Approval Request、Reviewer Decision、Upstream Evidence、Expected Side Effects、Hard Blockers、Warnings、Next Actions。Upstream Evidence 内部仍然保留 `### mini-kv side_effects`，因为 side effects 是 upstream evidence 的子结构，不应该被提升成与 Upstream Evidence 平级的 H2。

operation approval evidence verification 的 meta 包含 service、verifiedAt、valid、request id、decision id、state、stored digest 和 recomputed digest。sections 只有 Checks 和 Next Actions。它虽然没有 H3，但和 report 在同一文件中；如果只迁移 report，不迁移 verification，文件仍然会保留手写 renderer 风格，也会让后续维护者在同一模块里看到两种不必要的外壳写法。

promotion release audit trail record 的 meta 很长，包含 auditTrailName、receiptName、executionName、changeRecordName、approvalName、releaseArchiveName、evidenceName、completionName、closureName、receiptRecordName、certificateName、packageName、archiveName、state、valid、各 readiness flag 和 digest。sections 是 Decision、Verification、Audit Items、Next Actions。Audit Items 内部保留 `### item.name`，这是每个 audit item 的自然层级。

## Builder Mapping / builder 映射方式

operation approval evidence report 的迁移采用“top-level builder + 本地 lines helper”。Approval Request、Reviewer Decision、Upstream Evidence 和 Verification Checks 都不是普通 object dump，因为它们的 label、fallback 文本和字段组合已经经过人工整理；如果直接用 `entries` 渲染对象 key，会改变旧输出的 label 风格。因此本版保留 `renderApprovalRequest`、`renderReviewerDecision`、`renderUpstreamEvidence` 和 `renderVerificationChecks`，让它们返回旧 bullet 行，再由 builder 负责 H2 外壳。

Expected Side Effects、Hard Blockers、Warnings、Next Actions 适合直接用 builder 的 `list` section，因为旧实现本来就是 `renderList(items, emptyText)`。这类列表没有嵌套业务解释，只需要保持空列表 fallback 文本不变。builder 调用后，空行和尾换行由通用逻辑处理，避免手写数组继续复制。

promotion audit trail 的 meta 全部映射到 builder `meta`，Decision 和 Verification 提取为本地 helper，Audit Items 继续由 `renderReleaseAuditTrailItems` 展开。这里没有把 audit item 变成 `list`，因为旧输出每个 item 都是 H3 子块，包含 valid、digest、source、detail 四个字段；保留 helper 可以让 H3 层级和空行模式 byte-identical。

## Service Flow / 服务流程与调用路径

operation approval evidence 的服务流程从 route 层开始：请求进入 operation approval evidence route 后，服务根据 approval request、reviewer decision、preflight preview、Java/mini-kv upstream evidence 生成 `OperationApprovalEvidenceReport`。renderer 只消费已经生成好的 report，不再查 ledger、不访问 mini-kv、不访问 Java，也不重新计算 digest。Markdown 输出只是把 request 状态、reviewer decision、upstream evidence、expected side effects、hard blockers、warnings 和 next actions 展示给操作者。verification renderer 的路径更窄，它消费 `OperationApprovalEvidenceVerification`，把 stored/recomputed digest 和 checks 展示为人能读的审查材料。

promotion release audit trail 的服务流程也类似：promotion archive builder 先汇总 receipt、execution record、change record、approval record、release archive 与 audit items，生成 `OpsPromotionReleaseAuditTrailRecord`。renderer 只负责把这个 record 转成 Markdown。Decision section 反映当前 promotion decision 数量和最新结果，Verification section 反映 receipt verification 是否通过，Audit Items section 展开每个审计条目的 digest、source 和 detail。迁移后，route 返回 JSON 的逻辑没有动，Markdown route 只是通过同一个函数获得更标准化的排版外壳。

这个流程拆分是 v2167 的关键。builder 不进入业务服务层，也不成为新的决策引擎；它只是 renderer 层的模板。这样未来如果 operation evidence 的 upstreamEvidence 规则变化，应该改 evidence 构造和 verification tests；如果 promotion audit item 的来源变化，应该改 archive builder 和 audit trail route tests；只有当 Markdown 外壳或 section 排版变化时，才应该改 renderer builder spec。

## Classification / renderer 分类判断

v2167 清掉 H3 signal，但这并不意味着所有带 H3 的文件都应该被“平铺”。这里的 H3 有两种含义。operation approval evidence 的 `mini-kv side_effects` 是 Upstream Evidence 的子列表，它解释 mini-kv `EXPLAINJSON` 或 `CHECKJSON` 暴露的副作用。promotion audit trail 的 audit item H3 是多条审计条目的重复子块，每条都有自己的 digest 和 source。二者都不适合提升为 H2，因为提升后会改变文档语义，也会让 reader 误以为它们和主 section 平级。

因此本版的实际策略是“保留 H3 语义，移除未标准化状态”。renderer 文件中仍然存在 H3 字符串，但因为文件已经使用 `renderVerificationReportMarkdown`，census 不再把它们计入 unstandardized H3 signal。这个区别很重要：N1 的目标不是禁止 Markdown 出现 H3，而是禁止大量手写 full-document renderer 独立维护外壳。H3 可以存在，只要它被放在清晰的本地 helper 中，并且顶层报告结构由 builder 统一管理。

这个分类也帮助后续版本。剩余 49 个未标准化 renderer 大多不再靠 H3 判断，而要看它们是不是完整报告、是不是 section renderer、是不是 release 专用体系。完整报告优先迁移到 verification builder；section renderer 可能只应保留片段函数；release 专用体系如果已经有自己的 header/tail builder，就应该沿用本地模式。v2167 给出的不是“一律套模板”，而是“先判定文档层级，再抽外壳”的方法。

## Parity Method / 等价性证明

本版新增 `test/rendererMigrationV2167Parity.test.ts`，用固定 typed fixture 直接调用三份 renderer 输出。operation approval evidence report 的固定输出长度是 2090，SHA-256 是 `19d864f7a32ef7b8a8a4f0c9b9c645eb3fdd8f5e409c4186ffc515cb4f28b199`，H2 为 7，H3 为 1。operation approval evidence verification 的长度是 1004，SHA-256 是 `aa988caaa667c662c9a2ca5b1ee3a2fcfc39553f0f6d4a33582fe9932584185d`，H2 为 2，H3 为 0。promotion audit trail 的长度是 2353，SHA-256 是 `3d4f8b6becceb2aa7f3f81213aa3d13ab476e2d1551f26421aa377f0a608042c`，H2 为 4，H3 为 2。

选择固定 fixture 而不是 route 运行时 hash，是为了避免 UUID、generatedAt、digest payload 和外部 mock server 调用顺序干扰展示层等价性。route tests 仍然保留，它们证明真实 app 注入路径没有坏；parity test 负责证明 renderer 输出本身没有漂移。这是比单纯 `toContain` 更硬的保护，也比 full route hash 更稳定。

## Why Fixed Fixtures / 为什么使用固定 fixture

operation approval route 的真实测试会启动 mock TCP server 或 HTTP server，并通过 app.inject 走完整业务路径。这对行为验证很好，但不适合做 renderer byte hash：请求 id、decision id、generatedAt、digest payload、mock server 请求次数都可能随着测试流程变化而变化。promotion audit trail 的真实 route 也会根据 promotion decision ledger 当前状态生成 digest 和名称。把这些 live output 直接 hash，会把 renderer 等价性和业务构造过程绑在一起，失败后难以判断问题在哪一层。

固定 typed fixture 的好处是把关注点收窄到 renderer。fixture 仍然是类型检查过的业务对象，字段名和嵌套结构必须符合真实类型；但它的值是稳定的，能准确证明旧 renderer 与新 builder renderer 在同一输入下输出相同。route tests 继续验证真实流程，parity tests 验证展示层，两者互补。这个模式尤其适合后续 runtime execution renderer，因为那些文件经常包含动态 evidence、路径、digest 或外部 probe 结果。

本版还避免了 `any` fixture。测试使用真实类型和局部 type assertion，只在 renderer 不读取的 deep preview 字段上用类型占位，避免为了测试方便给 lint 增加新的 `no-explicit-any` warning。这个细节看似小，但它让 lint 基线保持 263 warning 不变，也说明测试代码本身没有成为新的维护负担。

## Safety Boundary / 安全边界

operation approval evidence report 容易被误读为“批准后可以执行”。实际上 report 和 verification 都只是审批证据与执行前检查材料；它们展示 mini-kv `CHECKJSON execution_allowed=false`、upstreamTouched=false、hard blockers/warnings 和 next actions，不会发起真实 upstream action。renderer 迁移不能改变这个边界，也不能把 “review-required” 或 “approved evidence exists” 误写成 execution allowed。

promotion audit trail 也只是 promotion archive 的审计记录。它展示 receipt、execution、change、approval、release archive 等 digest 和 audit items，并说明 closeout 是否 ready。它不是发布执行器，不写 archive 状态，也不创建 promotion decision。v2167 只改变 Markdown 外壳，不会让 auditReady、handoffReady 或 closeoutReady 的逻辑发生变化。

## Failure Modes / 失败模式与恢复顺序

如果 v2167 parity test 失败，先看是哪一份输出失败。operation report 长度变化通常来自 Upstream Evidence、mini-kv side effects、expected side effects 或 fallback empty text；operation verification 变化通常来自 checks label 或 next actions；promotion audit trail 变化通常来自 meta 顺序、covered fields join、audit item H3 空行或 next actions。不要第一时间更新 hash，先用旧输出和新输出 diff，看变化是不是预期业务演进。

如果 route tests 失败而 parity test 通过，说明 renderer 对固定输入仍等价，问题更可能出在业务构造层、ledger 状态、mock upstream 或 route wiring。此时应排查 operation approval service、promotion archive builder 或 app route，而不是反复修改 renderer。反过来，如果 parity test 失败但 route contain 断言还过，说明 route 只覆盖了片段，完整 Markdown 已经漂移，必须修 renderer 或更新有明确理由的 hash。

如果 census 数字不是 196/49，也要先看方向。高于 49 是回退，通常说明某个文件丢了 builder marker；低于 49 可能是同一工作树里还有别的 renderer 被迁移，需要同步更新测试、evidence 和讲解。H3 signal 如果重新出现，要确认是否有新的 unstandardized file 引入了 `###`，而不是误以为所有 H3 都被禁止。

## Test Coverage / 测试覆盖

v2167 focused gate 跑了 `rendererMigrationV2167Parity.test.ts`、`operationApprovalEvidence.test.ts`、`opsPromotionReleaseAuditTrail.test.ts`、`opsPromotionArchiveReleaseDeploymentRenderers.test.ts` 和 `rendererCensusScript.test.ts`，5 个 test file、9 个测试通过。这个组合覆盖三层：renderer 固定输出、真实 route JSON/Markdown、barrel re-export 入口，以及 shrink-only census。

`npm run renderer:census -- --max-unstandardized=49` 通过，当前 census 是 196/245 standardized、49 unstandardized，remaining shape signals 为 h3 0、forLoop 0、map 43、flatMap 40。`npm run typecheck` 已在新增 parity fixture 后通过，`npm run lint` 保持 0 errors / 263 warnings 基线，`npm run build` 通过。H3 signal 清零是本版最明确的结构收益。

## Maintenance Notes / 后续维护建议

后续再处理剩余 49 个 renderer 时，不能只看 shape signal。H3 已经清零，后面的主要信号是 map 和 flatMap，但这些文件可能分成三类：完整报告、片段 renderer、专用 release/section renderer。完整报告可以继续用 `renderVerificationReportMarkdown`；片段 renderer 可能应该保持 section-level helper；release/promotion 体系如果已有专用 builder，要优先沿用本地体系，而不是强行套 verification builder。

本版提供的经验是：先用固定 fixture 量旧输出，再迁移，再用同一 fixture 证明 hash 不变。对于含有运行时路径的 renderer，要像 v2166 那样规范化环境根路径；对于含有 UUID 或 digest 的 renderer，要构造 typed fixture，而不是 hash live route 输出。这样 N1 可以继续推进，同时不把测试变成环境偶然值的记录。

## Next Slice / 下一版建议

v2167 后，N1 的明显阶段变化是 H3 signal 清零，剩余主要是 map/flatMap。下一版更适合挑同一个业务链里的 list-heavy renderer，而不是继续找 H3。候选包括 Java/mini-kv runtime execution approval input 系列、sandbox handle review packet gate 系列、minimal read-only integration 系列。挑选时应先看它们是不是 full-document renderer，再看是否已有 route/fallback focused tests，最后看是否需要提取本地 list formatter。

如果下一批是 Java/mini-kv runtime execution 系列，要格外注意跨项目措辞。大多数文件仍然只是 historical evidence intake、approval input template、packet review 或 pass evidence closeout，并不代表真实执行已发生。renderer 迁移只能说明 Markdown 外壳标准化，不能改变 readiness 或 executionAllowed 语义。Java 和 mini-kv 仍可并行，除非下一版明确需要 fresh sibling output。

## Review Checklist / 审核清单与维护判断

复查 v2167 时，第一件事不是看代码是否“更漂亮”，而是看迁移是否仍然遵守 N1 的三条硬边界。第一，旧输出必须可复现；如果 hash、长度、H2/H3 数量或尾换行发生变化，就要先解释差异来源，不能直接把新 hash 当成正确结果。第二，业务对象不能被 renderer 重组；`OperationApprovalEvidenceReport`、`OperationApprovalEvidenceVerification` 和 `OpsPromotionReleaseAuditTrailRecord` 已经是上游服务生成的审计材料，renderer 只能消费它们，不能补字段、删字段、重新判断通过状态。第三，census 只能收紧；本版从 194/51 变为 196/49，并把 H3 signal 从 2 降到 0，所以后续版本至少要保住这个地板，除非有更严格的分类脚本同时落地。

人工 review 可以按文件分层看。`operationApprovalEvidenceRenderer.ts` 的重点是 meta 顺序、空列表文案和 `mini-kv side_effects` 子标题；这些地方最容易因为 builder 改造而出现肉眼不明显的字节漂移。`opsPromotionReleaseAuditTrailMarkdownRenderer.ts` 的重点是长 meta 列表、covered fields 拼接、audit item 的 H3 层级和 next actions 的 bullet 格式；这些字段是 release closeout 解释材料的一部分，顺序改变会影响审计阅读体验。`rendererMigrationV2167Parity.test.ts` 的重点是 fixture 是否仍然代表真实类型，而不是为了通过测试构造了过窄对象；当前 fixture 覆盖了 digest、readiness flag、side effects、audit items 和 next actions，足够证明外壳迁移没有偷换核心结构。

如果审查中出现失败，推荐先按“固定 fixture、真实 route、census”三层拆开定位。固定 fixture 失败时，优先比对 Markdown 字节差异；真实 route 失败但固定 fixture 通过时，优先看服务构造、mock upstream、ledger 输入或时间字段；census 失败时，优先看文件是否仍缺 builder marker 或新增了未分类 renderer。这样可以避免把所有问题都压回模板函数，也能让每次修复落在真实责任层。

这种分层也方便交接：新维护者可以先跑最小 parity，再跑 route，再看 census，不需要一次读完整条审批链。

后续维护还要避免两个常见误区。第一个误区是看到 H3 signal 已清零，就把剩余 49 个文件都当作简单列表替换；实际上剩余 renderer 里会有片段函数、专用 release helper 和完整报告混在一起，需要逐个判断抽象边界。第二个误区是把 builder 当成新的业务 DSL，不断往里面塞审批、执行、证据来源的特殊规则；这会让 builder 从排版工具变成第二套服务层。更好的做法是：业务特例留在本地 helper，builder 只负责稳定的 H1、meta、section、list 和换行规则。这样 N1 收尾后，未来新增报告也能复用同一外壳，同时不会把跨项目执行语义藏进模板函数里。

## CI Repair Note / v2166 CI 修复说明

v2166 远端 CI 暴露了一个本地 focused test 没有覆盖到的细节：历史 fixture 根目录已经被替换成 `<repo>/fixtures/`，但根目录之后的路径分隔符仍然保留宿主系统差异。Windows 本地输出使用反斜杠，Linux runner 输出使用正斜杠；两者长度和标题数量完全一致，所以只有 SHA-256 不同。v2167 把 normalization 扩展到完整 fixture 路径段，先替换绝对根目录，再把该段内的反斜杠统一成正斜杠。这个修复不改变 renderer 输出，也不改变 fixture 内容，只让测试 hash 的输入面真正跨平台稳定。

## One-sentence Summary / 一句话总结

v2167 将 operation approval evidence report/verification 和 promotion release audit trail record 迁移到 `renderVerificationReportMarkdown`，用固定 fixture hash、route tests、re-export test、census ratchet、typecheck、lint 和 build 证明输出等价，并把 renderer census 的剩余 H3 signal 清零，同时修复 v2166 historical-fallback Markdown hash 的跨平台路径分隔符问题。
