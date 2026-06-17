# v2149 Renderer Consolidation Batch 31

## Target And Non-target / 目标与非目标

v2149 继续推进同一条 controlled read-only shard preview live-read-only-window 链，但切入点已经从“签名模板”进入“签名捕获前置检查”和“签名材料草稿前置检查”。本版迁移五个 renderer：signed approval capture preflight、signed approval capture artifact preflight、signed approval capture artifact draft preflight、artifact draft readiness、artifact draft review package preflight。它们都只是把已有只读对象渲染成 Markdown。

非目标必须放在最前面：本版不产生真实批准，不保存签名，不生成可执行 runtime payload，不启动 Java 或 mini-kv，不写入兄弟项目，也不让任何人工 review 状态被自动通过。名字里出现 capture、artifact、draft、review package，并不代表系统已经进入真实执行。这里的 capture 是“捕获前置条件是否满足”的只读报告，artifact 是“草稿材料结构是否具备”的只读报告。renderer 迁移只改 Markdown 外壳，不改状态计算。

## Entry Points / 入口

入口文件是五个长文件名 renderer。它们原先都有相同骨架：先输出标题和几十个 meta bullet，再输出 `## Gates`，然后输出两个 h3 明细 section，最后输出 `## Blocked Reasons`。v2149 把标题、meta 和 section 外壳交给 `renderVerificationReportMarkdown`；把 blocked reason 交给 `renderVerificationBlockedReasonLines`；把旧 h3 helper 的末尾空行通过 `trimVerificationTrailingBlankLine` 处理。

这五个 renderer 没有新增共享 helper。v2148 已经为 Evidence Files detail block 新增了 helper，但 v2149 的 Inputs、Attestations、Fragments、Seals、Fields、Guards、Readiness Lanes、Package Slots 不是同一个领域对象。它们表面都是 h3 加 bullet，语义却分别指向签名输入、拒绝声明、材料片段、材料封条、草稿字段、草稿守卫、人工审阅通道和审阅包槽位。保留本地 helper 能让后续审阅按领域词搜索，而不是在万能 helper 里猜字段含义。

## Response Model / 响应模型

响应模型可以理解成一条只读门禁链。capture preflight 检查签名捕获需要哪些输入和声明；artifact preflight 检查这些输入能否组成材料片段和封条；artifact draft preflight 检查草稿字段和守卫；artifact draft readiness 检查人工草稿 review 的通道和控制；review package preflight 检查是否能形成审阅包槽位和守卫。每一层都继承前一层 digest，并继续声明 writes、runtime payload、sibling mutation 被禁止。

Markdown 输出的关键不是短，而是完整呈现审阅材料。meta 部分给出版本、source digest、计数和安全开关；Gates 部分给出整体条件；两个 h3 section 给出逐项输入或控制；Blocked Reasons 给出阻塞原因。v2149 没有调整这些字段的顺序，也没有合并字段名称。字段顺序是归档读者判断链路的线索，hash 比对也会把顺序变化直接暴露出来。

## Upstream Evidence / 上游证据

本版使用的输入来自 Node 的历史 fixture 链，而不是实时兄弟服务。临时 hash 脚本设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，保证输出稳定地引用冻结证据。这很重要，因为 Java 和 mini-kv 可能正在别的会话里继续推进，如果 Node 此时读取它们的未提交工作树，renderer hash 会受到外部进度影响，无法证明本次迁移只改变了 Node 代码外壳。

五个对象虽然不直接展示 Evidence Files section，但它们包含多层 source digest：signed approval template digest、approval packet review digest、artifact preflight digest、artifact draft preflight digest、artifact readiness digest 等。renderer 只照对象输出这些 digest，不重新计算、不解释、不补齐。只要 hash 一致，就说明这些 source 关系没有被迁移过程改写。后续真正进入分片联合执行时，才需要把这些 digest 和 live service 输出重新绑定。

## Service Flow / 服务流

服务流保持原样。上游 artifact/service 先构造完整对象，测试 fixture 再把 ready 或 blocked 状态传入 renderer。renderer 将 meta 数组传给 builder，Gates 继续用 `renderEntries`，两个领域明细 section 继续用本地 helper 生成字符串数组。builder 只负责统一标题、空行和 section 顺序；它不知道什么是签名捕获、什么是草稿字段，也不会修改任何 ready 字段。

这种分层让维护者能够快速定位问题。如果字段值错了，要看 artifact/service；如果字段标签漏了，要看 renderer 的 meta 数组；如果 section 空行错了，要看 builder 和 `trimVerificationTrailingBlankLine`；如果 blocked reasons 不一致，要看共享 blocked helper 或输入对象。v2149 的价值不是把所有代码变短，而是把每一层的责任边界重新暴露出来，减少手写 Markdown 数组的维护噪音。

## Safety Boundary / 安全边界

v2149 是本轮最容易被误读的一版，因为文件名里密集出现 signed approval、capture、artifact、draft、review package。必须明确：报告里这些字段仍然是前置条件和人工审阅材料，不是批准动作。`Approval captured`、`Approval grant present`、`Signed approval present` 仍由原对象提供；renderer 只输出它们。`Writes allowed`、`Starts services`、`Mutates sibling state` 仍然保留在每个 h3 明细项里，用来持续证明这条链没有执行能力。

字节级 hash 是安全边界的一部分。普通测试会检查代表性片段，但不会覆盖每个 guard text、attestation text、blocker text 和空行。v2149 的五个输出长度从四万九千到七万五千字符不等，人工 review 很难逐行确认。pre/post SHA-256 完全一致，说明这次迁移没有把任何阻塞条款改成通过条款，没有删除 no-execution guard，也没有改变 source digest。对于接近批准语义的报告，这是比“看起来没问题”更可靠的证据。

## Maintenance Payoff / 维护收益

迁移后 builder-backed renderer 从 137 增加到 142，未迁移 renderer 从 108 降到 103。剩余 h3 从 38 降到 33，map 从 55 降到 50，flatMap 从 49 降到 44。这说明 controlled read-only shard preview 里最重的 compact h3 renderer 正在稳定减少。更重要的是，本版没有为了追求数字而新增抽象；五个文件只复用已有 helper，让抽象面保持克制。

本版也验证了 v2148 的维护判断：`trimVerificationTrailingBlankLine` 不只是服务上一版，而是可以稳定承载后续双 h3 section 的迁移。每个 h3 helper 末尾都保留旧的空字符串，传入 builder 前裁掉最后一个空行，builder 再负责 section 分隔。这样既不用改几十个本地 helper 的返回结构，也不会产生多余空行。这个模式后续可以继续用，但必须配合 hash compare，不能凭感觉套用。

## Failure Modes / 失败模式

v2149 的失败模式比前两版更隐蔽。第一类失败是“名字相近导致字段错放”。例如 artifact preflight 和 artifact draft preflight 都有 signature payload、approval grant、source digest，但一个描述材料片段和封条，另一个描述草稿字段和守卫。如果迁移时把两者的 meta 顺序或 section 名称混起来，普通 `toContain` 可能仍然通过，归档读者却会误判链路位置。hash 比对可以捕捉这种顺序变化。

第二类失败是“空行兼容被误用”。这五个 renderer 的两个 h3 section 后面都没有手写额外空行，旧输出依赖本地 helper 的末尾空字符串完成分隔。因此必须使用 `trimVerificationTrailingBlankLine`，让 builder 的 section 前置空行承担分隔。如果忘记裁剪，输出会多一行；如果过度裁剪中间空行，多个 h3 block 会贴在一起。两种情况都不是业务逻辑错误，却会破坏归档稳定性。

第三类失败是“批准语义被提前放行”。这条链已经出现 capture、artifact、draft、review package 等词，但报告仍然只是 preflight 和 readiness。`approvalCaptured=false`、`approvalGrantPresent=false`、`signedApprovalPresent=false` 不只是展示字段，而是安全证据。任何迁移都不能因为 report 名称更接近人工签名，就把 readiness 解释成可执行批准。后续 v2150 进入文本包时，这个风险会更高。

## Abstraction Boundary / 抽象边界

本版刻意没有新增 `renderVerificationDualH3Section` 之类的 helper。表面看，Inputs/Attestations、Fragments/Seals、Fields/Guards、Readiness Lanes/Controls、Package Slots/Guards 都可以塞进一个“双明细 section”抽象；但这个抽象不会表达领域含义，只会把审阅者带到一个更远的间接层。生产前治理代码需要的是可追踪性，而不是为了少几行代码牺牲语义定位。

正确的抽象边界是：builder 管 Markdown 骨架，blocked helper 管一行式 blocker 列表，trailing blank helper 管旧数组兼容；具体的签名输入、材料片段、草稿字段、人工审阅通道、审阅包槽位继续留在本地 helper。这样后续查找 `Package slot materialized` 或 `Blocks signed approval capture` 时，可以直接定位到对应 renderer，而不是跳进一个泛化 helper 里再反查调用方。

## Review Checklist / 审阅清单

审阅 v2149 时，第一步看五个 renderer 是否都只新增 builder import，没有引入新 service、route、schema 或执行入口。第二步看 meta label 是否与旧输出一致，尤其是 `Ready for signed approval capture`、`Ready for runtime payload`、`Approval grant present`、`Signed approval present` 这些敏感字段。第三步看两个 h3 section 的名字是否保持原样，例如 Inputs/Attestations、Fragments/Seals、Fields/Guards、Readiness Lanes/Controls、Package Slots/Guards。

第四步看 blocked reason 是否统一使用 `renderVerificationBlockedReasonLines`。第五步看每个明细 section 是否通过 `trimVerificationTrailingBlankLine` 包裹，避免 builder 和旧 helper 的空行叠加。第六步看归档是否明确 Java/mini-kv 推荐并行，因为本版使用冻结 fallback，不等待新兄弟项目证据。审阅者如果只看行数，会觉得一版改动不小；按这六步看，会发现行为面非常窄。

## Test Coverage / 测试覆盖

第一层验证是临时 hash 脚本。它用五个 ready fixture 渲染旧输出，保存长度和 SHA-256；迁移后再次渲染并比较。结果是五个输出 mismatch 为 0：capture preflight、artifact preflight、artifact draft preflight、artifact draft readiness、review package preflight 全部字节一致。这里选择 ready fixture，是因为 ready path 覆盖字段最完整，blocked path 则由现有测试负责。

第二层验证是 focused Vitest，6 个文件、33 个测试通过。测试覆盖 builder helper、五个 report 的 ready 构造、blocked fail-closed、Markdown 关键片段、profile 注入和历史 fallback。第三层验证是 `npm run typecheck`，确认新增 builder 调用和 meta 数组不会破坏类型。最终 closeout 还会跑 ratchet、代码讲解质量门和 lint，把“没有新增治理增长”“讲解符合中文标准”“没有 lint error”也写入 evidence summary。

## Rollback And Cleanup / 回滚与清理

如果 v2149 某个输出在未来出现问题，最小回滚单位应该是单个 renderer，而不是整批回滚。原因是五个 renderer 互不共享新 helper，只共享 v2148 已经验证过的 builder 辅助能力。可以先用 hash mismatch 定位具体输出，再恢复该 renderer 的旧数组外壳；其他四个已经字节验证通过的 renderer 不需要一起撤销。这样的回滚方式能减少无关震荡，也符合每版控制变更面的原则。

本版还必须删除 `.tmp/v2149-renderer-hashes.ts` 和 `.tmp/v2149-renderer-baseline.json`。它们只用于迁移期间的 before/after 比对，不是长期产品代码。长期保留的证据应该是 summary JSON、短说明、中文代码讲解、focused tests、typecheck、ratchet、质量门和 lint 结果。把临时脚本清掉，可以避免后续维护者误以为仓库存在一个正式渲染审计入口。

## Next-version Direction / 下一版本方向

v2150 可以继续沿 authoring readiness、draft instruction preflight 和 text package 链推进。下一批需要更加小心，因为它会进入人工签名草稿文本、文本包提交、文本包 review、文本包 comparison 这些更贴近人工材料的报告。迁移仍然只能搬运 Markdown 外壳，不能把“草稿文本存在”解释成“签名批准存在”，也不能把 review package ready 解释成 runtime payload ready。

如果 v2150 发现多个 renderer 出现完全相同的文本包 h3 结构，可以考虑新增一个很小的 helper；但先观察，不预先抽象。现在最优路线仍然是每版 4 到 6 个同族文件，强制 fallback hash，比对通过后再跑 focused tests。这样既能持续降低手写 renderer 数量，又不会把生产前治理代码变成难以审阅的大抽象。

下一版仍不应跨到真实执行。当前缺的不是“再开一个执行入口”，而是把审批前只读材料整理到足够稳定、足够可审阅。只有这些报告的渲染、证据路径、阻塞原因和人工材料边界都稳定下来，后续讨论真实分片联合执行才不会被手写 renderer 的噪音干扰。

这也是持续做重构保养的真正价值：先把判断材料做可靠，再谈执行。

否则执行讨论会建立在不稳的报告上，风险会被放大，责任边界也会变得模糊不清。

## Cross-project Position / 跨项目位置

Java 和 mini-kv 推荐并行。本版没有读取它们的新文件，没有要求它们生成真实批准材料，也没有让它们向 Node 写回 progress。Node 使用冻结 historical fixture，输出只在 Node 仓库归档。另两个项目如果继续按自己的 playbook 推进，不会影响 v2149 的 hash、测试或提交。

等到真实分片联合执行前，Node 需要另外写清楚：需要哪几个 Java/KV 版本，服务如何启动，端口谁负责，真实输入文件在哪里，审批材料由谁提供，执行后如何清理。v2149 还不是那一步。它的价值是继续把只读报告外壳收紧，让未来真正执行前的审阅材料更少噪音、更容易定位、更不容易把“前置报告”误认为“执行批准”。

## One-sentence Summary / 一句话总结

v2149 把五个 signed approval capture / artifact draft 只读 renderer 迁入共享 builder，并用强制历史 fallback 的完整 hash 比对证明签名、批准、runtime payload、写入和兄弟项目状态全部保持未执行、未授权、未改变。
