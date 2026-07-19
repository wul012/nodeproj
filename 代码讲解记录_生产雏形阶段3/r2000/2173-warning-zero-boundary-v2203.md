# v2203 代码讲解：从“零错误但有噪声”收口到可持续的零警告边界

## 目标与非目标

v2203 的目标不是让终端输出更好看，而是恢复静态检查作为工程信号的可信度。改动前，`npm run lint` 的错误数为零，但 warning 上限仍是二百六十一，当前树里真实存在一百八十条 warning。只看命令退出码会得到“通过”的结论，可维护者却必须在每次检查中重新分辨哪些是历史遗留，哪些是本次新增。长期允许这种状态，会让 warning 逐渐变成背景噪声：拆分完成后遗留的导入不会被及时删除，新增加的未使用变量也难以引起注意，显式 `any` 则会在证据结构之间形成不透明的类型通道。

本版的停止条件非常具体。第一，仓库全部源码和测试必须达到零错误、零警告；第二，`package.json` 必须把 warning ceiling 收紧为零，确保后续第一条 warning 就让命令失败；第三，清理不能改变任何路由、报告字节、fixture、上游证据或执行权限；第四，不能通过 `eslint-disable`、规则降级、下划线改名或扩大忽略范围制造表面通过。非目标包括全面重命名四千多个历史长标识符、启动 Stage 2、连接真实写入上游、调整 renderer waiver，以及顺手做与 lint 无关的大规模风格格式化。

## 输入、输出与调用边界

本版的输入是当前 ESLint JSON 报告。报告给出一百七十四条 `no-unused-vars` 和六条 `no-explicit-any`，并且暴露出高度集中的分布：`opsPromotionArchiveBundle.ts` 有六十三条，`opsPromotionArchiveReleaseBuilders.ts` 有六十一条，两者合计占全部 warning 的近七成。其余 warning 分散在 deployment evidence、historical evidence、production live-smoke 和 release report 公共层。这个分布决定了处理顺序：先清理迁移后残留的大块导入，再处理少量局部变量，最后收窄确实承担异构边界的类型。

输出不是一份新的治理报告 service，而是更小的现有模块、两个更准确的证据类型、零 warning 的 lint 命令和一份机器证据摘要。外部调用入口没有改变：业务代码继续通过原模块导出读取 promotion archive builder；deployment verification 继续消费 intake gate 的 `artifacts`；所有使用 `renderReleaseReportMarkdown` 的调用点保持原有对象结构；CI 仍调用 `npm run lint`，只是 warning 从“预算内通过”变成“第一条即失败”。因此本版改善的是实现边界与检查语义，不增加新的运行时表面。

## 为什么 promotion archive 会积累一百二十四条 warning

promotion archive 在此前版本中完成过职责拆分。稳定入口 `opsPromotionArchiveBundle.ts` 继续承担公开 re-export 和少量核心 archive 构造，但 handoff、release、deployment 等 builder 已迁移到独立文件。拆分时为了保持公开路径和类型导出不变，文件中的 `export type` 与 `export` 清单必须保留；然而顶部 `import type` 仍带着过去在本文件实现阶段使用过的整组类型。re-export 不要求先 import，同一个类型出现在 `export type { ... } from` 中也不会让顶部 import 成为已使用符号，于是形成六十多条明确的迁移尾债。

本版没有运行会重排全部 import/export 的自动 organize-imports，因为该操作会把大型稳定 re-export 清单压成难读的长行，并扩大无关 diff。处理方式是根据 TypeScript 语义结果逐项保留实际引用：核心 bundle 文件只留下 archive bundle、manifest、verification、attestation 相关类型，以及当前构造函数真正调用的 digest 与 validation helper。公开 re-export 清单一个名字也没有删除。结果是文件从五百四十余行降到四百八十行，减少的是死导入，不是外部能力。

`opsPromotionArchiveReleaseBuilders.ts` 的情况相似。deployment approval、execution record、handoff package 等实现已经分流到专门 builder，但文件头仍导入它们的类型、item 工厂和 next-action helper。当前文件实际只构造 release evidence、release archive 及对应 verification，因此保留范围可以由函数签名和调用点机械确定。清理后该文件降到五百五十三行，既离六百行健康线更近，也让读者一眼看到它真正依赖的 completion、evidence 和 archive 概念。两个较小 deployment builder 中同样删除不再引用的 item 类型，避免把同一迁移尾债留在旁支。

## 未使用局部值为什么直接删除

分散 warning 中有几类典型值。某些历史证据函数创建了 `matched` 闭包，但返回对象已直接使用 `expectedSnippets.every(...)`，闭包没有任何调用；某些 archive verification 读取了 `records`，后续检查却只依赖已经归一化的 verification record；template compatibility 文件保留了 `TEMPLATE_ARCHIVES` 常量，但当前输入模型使用的是 canonical targets；fake transport receipt 解析了 `cleanup` 对象，却没有任何字段参与结果。这些值不是未来扩展点，也没有副作用，所以正确处理是删除定义，而不是改名为 `_matched` 或 `_records`。

下划线改名虽然能满足现有 ESLint 配置，却会把“没有消费者”伪装成“刻意保留”。在证据链代码中，这种模糊尤其危险，因为读者可能误以为某份 archive 已被验证，实际上它只是被解析后丢弃。本版只在能够从调用和返回结构确认无消费者时删除；任何可能承担副作用的函数调用都不会仅因结果未使用而移除。被删除的读取 helper 都是纯对象访问或常量声明，typecheck 与 focused tests 进一步证明外部行为没有依赖它们。

## 从 Record<string, any> 到真实证据结构

六条显式 `any` 中有五条位于 `deploymentEvidenceVerification.ts`。该模块从 `DeploymentEvidenceIntakeGateProfile.artifacts` 取出 Java deployment runbook、mini-kv artifact package 和 Node readiness summary。旧类型把 `artifacts` 写成 `Record<string, object>`，消费端为了读取嵌套字段只能强制转换成 `Record<string, any>`。这不是单个 lint 语法问题，而是生产者已经知道结构、公开类型却把知识丢失，导致消费者重新进入无类型世界。

本版在生产者类型模块增加 `DeploymentEvidenceSummary` 和 `DeploymentEvidenceArtifacts`。前者明确列出 summary version、state、stage digest、三个 readiness/permission 布尔值和检查计数；后者把 Java 与 mini-kv 字段绑定到已经存在的 `JavaDeploymentRunbookContractReference`、`MiniKvReleaseArtifactDigestPackageReference`，并把 Node envelope 限定为布尔映射。`DeploymentEvidenceIntakeGateProfile.artifacts` 随后引用该接口，`summarizePostV166Summary` 也返回同一结构。这样 verification 端可以直接访问 `deploymentWindow.owner`、`restoreDrillCommands` 和 `executionAllowed`，字段拼错会在编译期失败。

这里没有新建第三套重复 DTO。Java 与 mini-kv 的权威类型原本就在 intake gate types 中，本版只组合它们；summary 类型则对应一个已有、稳定的投影函数。`stageDigest` 的上游容器仍是历史 `Record<string, unknown>`，所以生产者在投影边界用 `String(...)` 固化为摘要合同。已知输入本来就是字符串，这不会改变序列化字节，却阻止 unknown 继续向下游扩散。

## 共享 Markdown item 的类型擦除边界

最后一条显式 `any` 位于 `releaseReportShared.ts`。共享 Markdown renderer 允许一个报告同时传入不同 item 类型，每个 section 自带 renderer。公开泛型 `ReleaseReportMarkdownItemSection<TItem>` 对单个 section 是类型安全的，但把异构 section 放进同一个数组后，需要在统一循环处擦除各自的 `TItem`。旧实现直接写 `renderItem: (item: any) => string[]`，使调用点和公共层之间形成显式 any。

本版将内部擦除类型改为 `unknown`，并利用 method 形式保留不同具体 renderer 的可赋值性。统一循环可以把 unknown item 交还给该 section 自带的 renderer，而需要按动态键读取步骤字段的 `renderReleaseReportStep` 也把入口改为 unknown，只在函数内部集中转换为 `Record<string, unknown>`。这条转换是可见且局部的：外部模块不能获得 any，键访问只发生在负责动态字段渲染的函数内。与为每种 item 增加几十个 overload 相比，这个边界更短，也更诚实地表达“这里确实在做异构集合的运行时调度”。

## live-smoke 模块中的复制残留

production live-smoke 系列文件共享相似的报告骨架。早期生成时，多数文件统一导入 `countReportChecks`、`countPassedReportChecks`、`formatValue`、entries/list/messages renderer 和 digest helper；后续具体实现逐步变化，有些模块不再显示 count，有些不再格式化可选值。旧导入模板却没有同步收缩，形成二十余条 warning。两个 production-pass 文件还保留了本地 `countArchiveChecks` 或 `countVerificationChecks`，实际 summary 已改用公共计数函数，因此本地实现成为完全不可达的重复。

本版按每个文件真实调用删除导入，不创建第二个 helper 层，也不把九个模块重新生成。公共函数仍由 `liveProbeReportUtils.ts` 提供，使用者只声明自己需要的部分；两个未使用的本地计数函数整体删除。由于报告正文构造、检查条件、digest payload 和 next action 都没有修改，相关十个 live-smoke focused tests可以直接作为行为回归面。

## 零警告 ratchet 如何工作

清理完成后，单次 `eslint src test` 已经得到零错误和零 warning，但如果 `package.json` 仍保留 `--max-warnings 261`，未来债务仍可重新出现而不阻断 CI。因此真正的收口动作是把命令改为 `eslint src test --max-warnings 0`。GitHub workflow 调用的是 npm script，不需要复制第二份阈值；`productionExcellenceCloseoutRatchets.test.ts` 对命令字符串做精确断言，防止后来有人悄悄恢复宽松预算。

这个 ratchet 与历史 elegance baseline 的策略不同。四千多个长名字涉及路径和合同，必须以 shrink-only baseline 管理；lint warning 则全部是可在本版安全删除的局部债务，没有保留价值，所以最合理的 baseline 就是零。以后出现 warning 时，应修复根因，而不是建立新的 warning 清单。若第三方规则升级一次性引入大量新诊断，应在独立工具升级版本中逐条分类，而不能直接抬高 ceiling。

## 验证路径与结果

验证先运行 typecheck，证明新增 artifacts 结构与全部调用点一致；再运行 `npm run lint`，得到零错误、零 warning，并确认 ceiling 为零。行为测试覆盖 promotion archive 的核心 bundle、边界和 release/deployment renderer，deployment intake 与 verification，共享 release report，以及 archive adapter、dry-run command、evidence capture、execution request、production-pass archive/verification、readiness switch、release evidence gate 和 result importer。总计十六个测试文件、五十三项断言全部通过。

静态门随后独立运行。security scan 扫描八千二百二十六个文本文件，十八项配置检查全过，六个 credential signal 与六个窄 waiver 精确对应；elegance census 仍为四千五百三十七条并与 baseline digest 一致；五十二个 family 全部可排名；source-size 仍为零个文件超过八百行；renderer 仍为二百四十五总数、二百四十二标准化、三个 composition-only waiver、零非豁免。也就是说，本版没有用删除公开导出换取 lint 成绩，没有让任何既有治理门漂移。

完整 Vitest 没有在 v2203 重复运行。三版本简报已明确采用集中验证节奏：每个内部版本运行受影响 focused tests，最终 v2205 树只运行一次完整 suite、build、全部 static gates 和 HTTP smoke。这一选择是资源治理，不是降低验收标准；最终提交之前，v2203 的代码仍会被完整回归覆盖。测试 worker 固定为两个且文件串行，避免重现历史上大量 Vitest worker 占用数 GB 内存的问题。

## 失败定位与维护方法

若未来 lint 失败，先按 ruleId 分类。`no-unused-vars` 应确认符号是否真有消费者：纯导入和无副作用局部值可以删除，有副作用调用则保留调用但移除无用绑定；不要用下划线或 disable 逃避。`no-explicit-any` 应追溯知识在哪个生产者边界丢失，优先补充已有 DTO 的准确投影；确实处理异构运行时值时使用 unknown，并把 narrowing 或集中转换放在最小函数内。

若 deployment focused test 失败，应比较 intake artifacts 的原始 JSON 与新接口，不要修改 fixture 迎合类型。类型错误通常表示接口遗漏真实字段，运行时 digest 失败则说明投影发生字节变化，两者必须分开处理。若 release report 测试失败，重点检查 unknown 擦除边界是否把 item 交还给了正确 renderer；不要把 `any` 加回来掩盖调用错配。若 promotion archive digest 或 Markdown 失败，先确认被删符号是否只有 import，没有误删 re-export 或 payload helper。

后续维护 promotion archive 时，公开 re-export 与本地 import 必须分开理解：前者属于兼容表面，后者只服务当前实现。完成文件拆分后应立即运行 lint，让迁移尾债在同一版本消失。live-smoke 同族文件也不再以“统一大导入模板”为美观标准，每个模块应只声明真实依赖；第三个相似实现出现时则遵守 Rule of Three，优先复用公共 engine，而不是复制整份报告骨架。

## 停止条件与下一步

v2203 在 lint 0/0、typecheck 通过、focused 53/53、security 与四个结构门 ready 后停止。没有页面变化，所以不制造截图；没有跨项目合同变化，所以不启动 sibling runtime 或 live capstone。下一版 v2204 将补充 maintainability census，机械管理六百行以上文件、超长或高复杂度函数和相对 import cycle。它不会重新包装 lint 结果，也不会增加新的运行时 report 链。

## 一句话总结

v2203 删除的是拆分后已经没有消费者的噪声，补上的是生产者本来就知道的类型，并把“warning 可以存在”改成“第一条 warning 就失败”，让静态检查重新成为值得相信的工程信号。
