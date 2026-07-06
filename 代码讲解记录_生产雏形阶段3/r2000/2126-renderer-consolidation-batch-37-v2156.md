# v2156 代码讲解：disabled runtime shell 报告渲染器整族收束

## Goal and Non-goal / 目标与非目标

v2156 做的是 Node 项目 N1 renderer consolidation 的第 37 个批次。表面上看，它只是把 11 个 `*Renderer.ts` 文件里的 Markdown 数组拼接换成共享 helper；但从工程结构上看，这一版把一个历史链条完整收进了同一套 release-report 渲染语义里。被处理的链条是 managed audit manual sandbox connection credential resolver 的 disabled runtime shell 设计/草案阶段：从 v294 的 pre-plan intake，到 v295 的 design review，再到 v296 的 upstream echo verification、v297 的 implementation candidate gate，最后延伸到 v331 到 v343 的 design draft / outline / body draft 主链。

这批文件有一个共同特点：它们都在表达“还不能真的执行，只能证明边界、证据、问题、stop condition 和下一步”。也就是说，它们不是普通业务页面，也不是最终生产执行报告，而是一组治理型 release/probe 文档。旧代码每个文件都手写一大段数组：

`"# title"`, 空行，若干 `- Label: ${value}`，再空行，`"## Source Node vXXX"`，再 `renderEntries(...)`，然后若干 map/flatMap 拼出的列表、messages、next actions。每个文件看起来都不难，但 11 个文件放在一起就形成重复维护成本：标题段重复、entries 段重复、消息段重复、尾部 next action 重复，真正有业务差异的只是每个 section 选择哪些字段、数组行怎么格式化。

这一版没有改任何 loader、route、type、schema 或证据文件。所有导出的 renderer 函数名也保持不变。换句话说，外部调用者仍然调用原来的 `renderManagedAudit...Markdown(profile)`，得到的 Markdown 字符串必须和旧版完全一样。真正变化只在函数内部：把结构重复交给 `releaseReportShared.ts` 中已有的 helper，保留每个文件特有的字段选择和列表格式。

非目标同样重要。本版不把 disabled runtime shell 从“设计材料”推进成“运行实现”，不把任何 `readyForRuntimeShellImplementation` 翻成 true，不增加 Java SQL、mini-kv 写命令、HTTP/TCP 连接、凭据值读取、原始 endpoint URL 解析、provider/client 实例化，也不把历史归档材料当作新的上游批准。它只处理 Markdown 渲染层的维护问题：同类报告的段落外壳重复太多，人工标签和空行容易在后续版本里漂移，reviewer 看 diff 时需要从大段数组中分辨哪些是结构重复、哪些是业务文本。v2156 的目标就是把这些重复外壳集中，同时保留每个报告自己的业务行，做到“减少重复但不模糊责任”。

这也解释了为什么本版可以算作中等工程切片，而不是小修小补。它一次性覆盖 11 个文件，贯穿 disabled runtime shell 的早期设计、上游回声、候选门、设计草案候选、outline intake、body intake、body candidate review、pre-draft decision、preparation plan 和 draft candidate。这个跨度足够暴露不同列表形态：有简单 boundaries，有多行 required gates，有 review questions，有 outline/body catalog，有 evidence mappings，有 safety guards，也有历史自定义 message 格式。通过同一批处理这些形态，可以验证 `releaseReportShared` 的边界是否合适，而不是只迁一个最简单文件后就宣布模式成立。

## 二、为什么不用 verificationReportBuilder

这个项目现在有两条 renderer 收束路线。第一条是 `verificationReportBuilder`，适合标准 verification 报告：meta、entries、messages、list、lines，每个 section 都是验证报告语义。第二条是 `releaseReportShared`，适合 production/live-probe/release 风格的报告：表头使用人工标签，section 可能是 entries，也可能是本地数组展开，最后可能有 evidence endpoints 和 next actions。

v2156 选择第二条，是因为 disabled runtime shell 这一族不是典型 verification builder 形态。举例说，`DesignDraftCandidateReviewRenderer` 的消息格式是历史自定义的 `- [severity] code (source): message`，它和通用 `renderMessages` 的 `- code (severity, source): message` 不同。如果强行迁到 verification builder，很容易把格式改掉，或者为了兼容这个例外把 builder 继续加复杂，最后 builder 本身变成难维护的巨型函数。

更好的做法是尊重报告语义：header、entries section、line section、messages section 这些通用结构可以共享；但每个报告的本地业务行，例如 review question、gate item、body section、evidence citation、safety guard，仍然在本文件中以小函数或 map 表达。这样既减少重复，又不把所有领域细节塞进一个中央抽象里。

## 三、核心迁移方式

旧代码通常是这种形态：

```ts
return [
  "# Managed audit ...",
  "",
  `- Service: ${profile.service}`,
  `- Generated at: ${profile.generatedAt}`,
  "",
  "## Checks",
  "",
  ...renderEntries(profile.checks),
  "",
].join("\n");
```

v2156 改成：

```ts
return [
  ...renderReleaseReportHeader("Managed audit ...", {
    Service: profile.service,
    "Generated at": profile.generatedAt,
  }),
  ...renderReleaseReportEntriesSection("Checks", profile.checks),
].join("\n");
```

这里有一个很重要的细节：header 对象的 key 不是 `service`、`generatedAt`，而是 `Service`、`Generated at`。因为底层 `renderEntries` 会把 key 原样写到 Markdown 里。如果使用小写字段名，输出就会从 `- Service:` 变成 `- service:`，这就不是重构，而是行为变化。所以这一版所有人工标签都用带空格、带大小写的 quoted key 保持旧输出。

普通对象段落用 `renderReleaseReportEntriesSection`。例如 source node、necessity proof、candidate gate、checks、summary 等，只要旧代码本来就是 `...renderEntries(object)`，就可以直接迁移。少数旧代码原来不是 `renderEntries`，而是手写 `- Review state:`、`- Source checks:` 这种行，也可以迁成 entries section，但必须用人工标签作为 key，并且复合值如 `passed/total` 仍然由本文件拼成字符串。

数组段落用 `renderReleaseReportLineSection`。比如 required gates 需要多行：

```ts
function renderGate(gate): string[] {
  return [
    `- ${gate.code}: ${gate.title}`,
    `  - owner: ${gate.owner}`,
    ...
  ];
}
```

这种局部格式保留在 renderer 文件内，再把 `profile.candidateGate.requiredGates.flatMap(renderGate)` 交给 line section。这样共享层只负责 section 标题、空行和结尾空行，不碰业务行格式。

消息段大多数用 `renderReleaseReportMessagesSection`。只有 `DesignDraftCandidateReviewRenderer` 保留了本地 `renderMessages`，因为它的历史格式不同。这个文件仍然使用 `renderReleaseReportLineSection("Warnings", renderMessages(...))`，既纳入统一 section 框架，又不改变消息文本。

## Service Flow / 服务流程与每个文件的变化重点

`PrePlanIntakeRenderer` 是最基础的形态。它把 source node、pre-plan、pre-plan intake、checks、summary 都迁到 entries section；boundaries 是数组映射，所以用 line section；最后 evidence endpoints 和 next actions 直接复用 `renderReleaseReportTail`，因为旧代码本来使用 `renderList(profile.nextActions, "No next actions.")`，和 tail 的行为一致。

`DesignReviewRenderer` 也可以使用 tail，但 stop conditions 需要保留旧的 empty 文案：`No disabled runtime shell design review stop conditions.`。这里没有新增 shared helper，而是在本文件内把空数组转换成同样的 `- <empty text>` 行，再交给 line section。这样做比为了一个空文案扩展 tail 更克制。

`UpstreamEchoVerificationRenderer` 处理两个 upstream evidence 段：Java v133 handoff echo 和 mini-kv v130 receipt。这两段都是 inline object，所以用 entries section。它的 next actions 旧代码是 `profile.nextActions.map(...)`，不是 `renderList`，因此本版没有用 tail，而是把 Evidence Endpoints 和 Next Actions 分开渲染，避免空数组行为发生隐性变化。

`ImplementationCandidateGateRenderer` 保留了 `renderGate`。required gates 是典型多行 item，适合 line section；stop conditions 继续通过 `renderList` 生成旧格式；messages 用通用 messages section。这个文件说明了本版的边界：共享 section 壳，保留本地 item 格式。

`DesignDraftCandidateReviewRenderer` 是本批最特殊的文件。它没有使用 `liveProbeReportUtils.renderMessages`，而是有自己的 `[severity]` 格式。这里如果盲目改成通用 messages section，hash 会变。v2156 保留本地 `renderMessages`，并且把 source node、necessity proof、candidate review、summary 的手写行改成 entries section。这个文件证明本版不是机械替换，而是按输出合同逐项迁移。

`DesignDraftOutlineIntakeRenderer` 和 `DesignDraftBodyIntakeRenderer` 都有 catalog 类段落，分别是 outline section catalog 和 body section catalog。它们使用 flatMap 输出多行明细，这些明细保留在文件中，只由 line section 包住。这样后续如果 section 的业务字段变了，读者仍然在对应 renderer 里就能看到具体格式，而不是跳到 shared helper 里猜。

`BodyCandidateReviewRenderer`、`BodyPreDraftDecisionRenderer`、`BodyPreparationPlanRenderer`、`BodyDraftCandidateRenderer` 是 body 链条的四个后续阶段。它们的共同点是 summary 段不是简单 `renderEntries(profile.summary)`，而是用人工标签组合多个 `x/y` 值。本版把这些 summary 改成带人工 key 的 entries section，输出仍然是 `- Checks: passed/total`、`- Source archive files: present/total` 等旧格式。

从服务流看，这 11 个 renderer 可以理解为一条只读设计材料流水线。前四个文件回答“是否可以开始讨论一个 disabled runtime shell”，但答案一直是不能执行：pre-plan 只列边界，design review 只做设计审查，upstream echo verification 只确认 Java/mini-kv 对不参与或只读回声的态度，implementation candidate gate 也只是候选门，没有打开实际实现。后七个文件回答“如果未来要写设计草案，应该先怎样拆材料”：candidate review 决定先归档，outline intake 只列章节目录，body intake 只列正文材料入口，body candidate review 检查候选正文是否足够，pre-draft decision 决定能否准备草案，preparation plan 安排 section/evidence/guard，draft candidate 才形成仍不可执行的正文候选。

迁移后的代码流也对应这条业务流。每个 renderer 先用 `renderReleaseReportHeader` 声明当前 profile 的身份和最重要的 ready/blocked 状态；再用 entries section 展示 source node 和本阶段主记录；然后用 line section 展示本阶段的数组型材料，例如 gates、questions、catalog、evidence mappings、guards、stop conditions；最后进入 checks、summary、blockers、warnings、recommendations 和 next actions。读者看代码时不再需要在一百多行数组里数空行，而是能按报告段落顺序读到服务流：身份、来源、主记录、明细、检查、摘要、风险、下一步。

这条服务流还保留了一个关键限制：所有“下一步”都只是治理动作，不是执行动作。即便字段名里出现 implementation、runtime、candidate、draft，它们在这些 profile 中也都是 false 或 blocked 的证据上下文。renderer 不重新解释这些布尔值，只把 profile 已经计算好的状态写出来。这样，维护者在后续批次中如果看到某个 renderer 开始生成新 ready 状态，就能立刻判断那已经不是本版这种渲染整理，而是业务行为变更，必须另开功能版本和更严格验证。

换成日常维护语言说，本版把读代码的路径缩短了。以前 reviewer 要先在每个文件里排除大量重复外壳，才能看到真正的业务行；现在只要确认共享 helper 负责段落边界，再检查本文件传入哪些字段和列表即可。这个变化不会让系统更会“做事”，但会让后续每一次审查更快发现风险，更少把时间浪费在重复空行和标题模板上。

更直接地说，这次重构把审查焦点从“这一百多行数组有没有漏空行”转成“这个报告到底暴露了哪些治理材料”。前者容易疲劳，后者才是生产前工程需要持续保持的判断力。

## 五、为什么 hash 证明比“看起来没变”重要

这类迁移最大的风险不是 TypeScript 类型错误，而是 Markdown 输出悄悄变了一个空行、一个 label 大小写、一个 message 格式或一个 empty text。很多测试只检查 route 200、关键字段或 `toContain`，并不会覆盖整份 Markdown 的字节级一致性。计划书要求 byte-identical，这一版就用归档 JSON profile 做了前后渲染 hash。

基线不是现场调用 loader 生成的，因为 loader 会走 historical fixture fallback 和一长串源链，运行很重，也会生成新的 `generatedAt`。本版改用已经归档的 JSON profile：从 `d/294` 到 `d/343` 取 11 个代表版本的 profile，迁移前渲染一次，迁移后用同样 JSON 再渲染一次。这样 `generatedAt`、数组顺序、source digest 都固定，hash 不会受运行时变化影响。

结果是 11 个 SHA-256 全部一致。比如 pre-plan intake 的 hash 是 `412c88ddd8da739bfd31b8ff5d947afdabdf267bd5582e5898794547f0903f46`，design review 是 `d4fee6ec44503a4502b186652b912009c4984c2ae27f7ffaecb28f8497c81d5d`，body draft candidate 是 `c434d58fc8c54dbec8b66bd88c0d1709c45ed48f0c13ca2baeada3d482cfd3f0`。这些 hash 不是业务新证据，而是重构安全证据：说明同一输入下输出没有变化。

## 六、验证和工程位置

本版跑了四层验证。第一层是 pre/post hash，证明 11 个归档 profile 的 Markdown byte-identical。第二层是 focused tests，11 个相关测试文件共 44 个测试通过，覆盖 JSON/Markdown route、historical fallback、blocked 状态等局部行为。第三层是常规门禁：`npm run typecheck`、`npm run lint`、`test/governanceGrowthRatchet.test.ts`。lint 仍有仓库历史 warning，但退出码为 0，没有本版引入的 error。第四层是计划书要求的全量 Vitest：528 个测试文件、1631 个测试全部通过，并且用 `--maxWorkers=4` 控制并发，避免 Windows 上 vitest worker 无限扩张。

迁移后的 census 从 171/245 标准化提升到 182/245，未标准化从 74 降到 63。这里的口径特意写清楚：旧的 87 是 `verificationReportBuilder` only 的扫描数，它没有把 v2153 的 profile section fragment 标准化和 v2154 的 release-report tail 标准化计入。v2156 使用更真实的标准化口径：`verificationReportBuilder`、`releaseReportShared`、`renderProfileEntrySections` 三类都算标准化。这样后续推进不会误以为 v2153/v2154/v2156 的工作“不降低剩余量”。

## 七、后续怎么接

v2156 后，剩余 63 个未标准化 renderer 不应该一股脑塞进同一个 builder。最稳的路线是继续按形态分批：完整 verification 报告继续进 `verificationReportBuilder`；release/probe 风格完整报告继续进 `releaseReportShared`；只返回局部 section fragments 的文件继续用 `renderProfileEntrySections` 或写 composition-only waiver。这样既能完成 N1，又不会把中央 helper 变成新的维护债。

对 Java 和 mini-kv 来说，本版没有新合同输入，也没有要求它们产出 fresh evidence。它们可以并行推进自己的最终计划，Node v2156 不阻塞它们。真正需要三项目联动的是最终 integration capstone，而不是这个 renderer consolidation 批次。

还要注意一个维护纪律：后续批次不应该只追求“未迁移数量下降”，而要看每个批次是否把一类报告语言真正收束清楚。本版的收获不是少了 11 个文件里的几百行代码，而是明确了 release/probe 型报告的稳定边界：共享层只负责 Markdown 段落骨架，业务层仍然直接表达字段选择、列表明细和历史消息格式。这个边界一旦守住，未来 reviewer 看 diff 时就能快速判断风险在哪里：如果只是在 header/entries/line/messages 之间移动，那主要风险是空行和标签；如果修改了本地 map/flatMap 行，那才是业务文本风险。这样的分层比“大一统 builder”更容易审查，也更符合生产前治理工程的长期维护方式。
