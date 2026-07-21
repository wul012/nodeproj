# Node v2228：九分终局门与 promotion Markdown 规格化

## 一、这不是给代码贴分数，而是规定什么时候有资格说“九分”

用户要求把整个 Node 项目的 `coding brilliant and elegant` 提高到约九分。这里最容易犯的错误，是刚重构完几个文件就凭观感宣布达标。一个拥有一千多个生产文件的仓库，不可能由最近触及的局部代表全部质量；同样，单纯看测试全绿也不够，因为测试回答行为是否正确，却不直接回答文件是否仍接近八百行、函数是否过长、复杂分支是否集中、命名是否继续串接十几个名词、同类 renderer 是否仍在复制格式语法。v2228 因此先把“九分点”从主观形容词改成终局验收门。这个门不输出 8.7 或 8.9，也不做加权平均；十二项绝对阈值和四项基础可信性检查必须同时通过，任何一项红色都只能继续改代码，不能拿另一项的好成绩抵消。

本版仍然不是完美声明。九分门允许有受控历史债，只要求债务进入明显更低、可持续维护的区间，并且所有安全、行为和回归防线同时成立。它不会改变项目已经获准使用的成熟度标签，也不会把“只读跨项目验证”夸大成生产分片执行。分数只描述 Node 内部代码的可读性、结构与机械健康度，不描述外部授权、真实凭据、网络拓扑或运维审批是否就绪。

## 二、Step-0 的真实起点决定了不能只做一项漂亮重构

起点是提交 `34756cee`、标签 `v2227`，工作树干净并与远端同步。上一个远端 Node Evidence run 已通过，本地完整测试由四个顺序 shard 验证了 582 个测试文件和 1,780 项测试。静态事实却仍然显示全仓距离终局门有明显距离：82 个文件超过六百行，89 个函数超过一百二十行，208 个函数复杂度超过二十，最长函数 217 行，最高复杂度 85；命名债为 4,444，受管结构 family 为 52。源码没有超过八百行的文件，导入环为零，renderer 也已经是 242 个标准化、3 个合法 composition-only waiver、零个未豁免，这些是坚固度基础，但不是九分的充分条件。

family logic 还揭示另一层问题。`src/services:renderers` 六个文件包含 1,681 行格式逻辑，其中 promotion 相关文件占主要部分；`src/services:verification` 仍有 1,320 行。也就是说，过去的 renderer consolidation 解决了 245 个单数 `Renderer.ts` 中的大规模复制，却没有自动消除复数 `Renderers.ts` 家族里较早形成的手写文档规格。v2228 选择 promotion core/handoff，不是因为它名字显眼，而是因为它同时命中近限文件和最高重复 family 两个账本，且有稳定路由边界可以建立完整字节证明。

## 三、终局 census 的输入、计算和输出分别是什么

`scripts/nine-point-census.mjs` 不重新扫描源码。它调用已经经过回归验证的四个事实源：elegance census 提供命名债、受管 family 和 shrink-only 状态；family logic census 提供各结构家族的格式逻辑行数；maintainability scan 提供文件行数、函数跨度、分支复杂度和导入环；renderer census 提供标准化、豁免与未豁免数量。这样做避免第五套 AST 定义与既有账本发生口径漂移。脚本只负责把结构化结果投影成十二个实际值、读取固定上限，再生成逐项检查。

四个 foundation checks 先确认底层事实值得相信：elegance ratchet 必须 ready，family census 必须完整，maintainability 不能有 TypeScript 解析错误，standardized 加合法 waiver 必须覆盖全部 renderer。随后才检查绝对阈值。零导入环、零八百行以上源码、零未豁免 renderer 使用严格相等；近限、长函数、复杂函数、最大函数、最大复杂度、命名债、两个 family logic 分数和 family 数量使用上限比较。输出包含 `metrics`、`limits`、每项 actual/comparison/limit/pass、失败键列表以及最终 `ninePointReady`。任何基础检查失败都会让最终值为 false，脚本作为 CLI 运行时返回非零退出码。

## 四、为什么终局命令现在不能立刻接入每次 CI

一个机械门要有失败能力，但失败能力必须放在正确节奏里。v2228 建立门时，全仓明知有八项未达标；若立即把 `npm run elegance:nine` 接成 master 的阻塞步骤，那么每个诚实的中间收敛提交都会红，远端 CI 将从“回归信号”退化为“计划尚未完成的重复提醒”。开发者看到红色也无法区分本版引入了倒退，还是终局目标原本未完成。现有 elegance、maintainability、source-size、renderer 和 family 门已经负责中间版本的只减不增，它们必须持续保持绿色。

因此终局门当前可以人工运行并诚实返回失败，纯函数单测则证明它不会误判。17 项测试先构造恰好位于全部上限的输入，确认可通过；再逐一让十二个指标只超出一单位，确认对应键单独失败；最后分别破坏四个 foundation，确认绝对数字再漂亮也不能掩盖扫描器失真。等实际代码让十二项全部通过时，再把同一条命令接入 CI。这个时序不是放宽标准，而是让日常回归门和阶段终局门各自保留清晰语义。

## 五、promotion 链的真实输入与输出是什么

promotion archive 路由不是执行部署的入口。它读取内存中的 promotion decision ledger：当 ledger 为空时，bundle 只描述空序列、完整性根摘要和“先记录 decision”的后续动作；当 ledger 有记录时，它选取最新 decision，生成 evidence report，再依次构建 archive bundle、manifest、archive verification、attestation、handoff package、certificate、receipt、closure、completion、release evidence、release archive、deployment approval、change record、execution record、execution receipt和 audit trail。这里的 deployment 名称描述审批档案链，不表示系统实际连接生产服务或执行写入。

每个 artifact 同时有 JSON 对象和 Markdown 展示。JSON 是领域构建器的直接输出；Markdown renderer 只能决定标题、字段标签、字段顺序、section 标题、item 展开和尾换行，不能改变 readiness、digest、decision 或安全结论。route manifest 是权威映射，列出 28 个 artifact key、GET 路径、对象 selector 与 renderer。v2228 直接遍历这个 manifest 建 oracle，避免测试维护者忘记新加在链尾的 release/deployment 路由。输入是固定时钟下的 empty ledger 或单条 blocked decision；输出是每个路由 raw payload 的字节长度与 SHA-256。

## 六、为什么固定时间仍不足以冻结 non-empty 输出

空 ledger 只依赖固定常量和当前时间，设置 fake Date 后可以稳定复现。单条 decision 不同：`OpsPromotionDecisionLedger.create` 原先直接调用 `randomUUID()`，UUID 进入 decision record，record digest 又覆盖 decision 字段，ledger chain digest、archive name、manifest digest 和后续每层 artifact digest继续依赖前一层。即使所有字段和时间都相同，每次测试也会得到不同 UUID，最终 28 个 Markdown hash 全部变化。把某一次随机运行的 hash 写进期望，只会制造下一次必然失败的脆弱测试；用正则删除所有 digest 又会削弱最重要的完整性证明。

本版采用依赖注入而不是 normalization。Ledger 构造函数新增第二个可选参数 `nextId`，默认仍绑定 `randomUUID`；`buildApp` 新增可选 runtime deps，默认仍调用 `createRuntimeDeps(config)`。生产调用没有提供第二参数，行为完全不变。oracle 创建正常 runtime deps，只把其中 ledger 替换为固定返回 `11111111-1111-4111-8111-111111111111` 的实例，然后交给 `buildApp`。这样 ID、record digest、chain digest 和所有后续摘要都仍按真实算法产生，只是熵源变为可重复输入。测试不是擦掉动态证据，而是控制动态证据的源头。

## 七、56 个完整字节表面为何比十五个旧 route 更可靠

旧 `promotionRendererParity.test.ts` 建于 v2199，只覆盖 archive 到 completion 的十五个路由。后来 release evidence、release archive、deployment approval/change/execution/receipt 与 audit trail 继续增长，但旧列表没有来自 manifest 的完备性约束，因此十三个链尾 renderer 只有标题或局部断言，没有统一的全响应冻结。v2228 新测试直接迭代 `PROMOTION_ARCHIVE_ROUTES`，manifest 本身又在模块加载时验证 artifact 数量恰好为 28、key 不重复、route 不重复、所有 artifact 都被路由。因此测试不需要手写第二份路径清单。

每个状态采集 28 个 `byteLength:sha256`，总计 56 个表面。empty 状态覆盖缺少 latest evidence、`none` 值、empty sequence 和 blocked 后续动作；单 decision 状态覆盖真实 UUID 位置、decision evidence、contiguous sequence、全部派生 digest 与 attention-required/blocked 语义。原十五路 v2199 oracle 继续保留，给同一输出增加不同固定时间下的历史基线。迁移生产 renderer 后没有改动任何一条期望、fixture 或 normalizer；因此字段、顺序、空行、冒号、摘要文本乃至最后一个换行发生变化都会立即失败。

## 八、旧 742 行 renderer 文件为什么职责过多

旧 `opsPromotionArchiveRenderers.ts` 已经比最早的手写数组更好：它调用 `renderMarkdownDocument`、`renderMarkdownFields`、`renderMarkdownItems` 和 digest helper，不再为每个文档重复 `join("\n")`。但一个文件仍同时承担四类职责。第一，它是十五个稳定公共函数的入口；第二，它知道每种 artifact 的全部字段和顺序；第三，它选择 section 及 item 展开策略；第四，它定义普通 item、checked item、completion step 等共享形状。公共导出的超长领域名与内部小 helper 混在一起，维护者为修改一个 handoff summary 必须滚过 archive、attestation、manifest、certificate、receipt、closure、completion 和 package 全链。

文件达到 742 行后，已经进入近限账本。更关键的是，稳定入口使人误以为所有规则必须留在同一物理文件；实际上公共 API 稳定只要求导出路径和函数名不变，并不要求规格数据与入口位于同一模块。若继续在原文件新增 artifact，它会再次逼近八百行硬上限；若简单按每种 artifact 再拆十个 `Renderer.ts`，又会制造第三套重复 family。正确边界应当是稳定入口很薄、规格按 bounded context 分组、格式行为集中在一个 engine。

## 九、engine、spec 与 public renderer 三层如何协作

底层 `promotionMarkdownEngine.ts` 定义 `MarkdownField`、`MarkdownSection` 和新的 `MarkdownDocumentSpec`。engine 只知道一级标题、字段前缀、二级 section、三级 item、bullet、digest 显示、可选值显示和空行文法；它不知道 certificate 是什么，也不知道某个 check 是否应该为 true。`renderMarkdownSpec` 只是把 `{title, fields, sections}` 交给既有 `renderMarkdownDocument`，没有新增第二套 formatter。

中层位于 `promotionMarkdown/`。`core.ts` 拥有 bundle、manifest、archive verification 与 attestation 规格，也拥有 latest evidence 和 artifact item 的领域映射；`handoff.ts` 拥有 package、certificate、receipt、closure、completion 及 verification 规格，复用 decision、summary、simple item、checked item 和 step 的结构 helper。规格函数返回数据对象，不做字符串拼接，不持有 route，也不修改输入。目录已经表达 promotion Markdown 上下文，因此函数可以叫 `archiveSpec`、`receiptCheckSpec`，不再复制整段产品前缀。

顶层 `opsPromotionArchiveRenderers.ts` 保留所有原导出。每个函数只接收原类型、调用对应 spec，再调用 `renderMarkdownSpec`。调用方、route manifest 和 barrel 不需要迁移；类型检查仍确保 certificate renderer 不能误接 receipt。三层分别拥有“怎么排版”“排什么内容”“从哪里稳定导出”，比原来把三件事揉在一个近限文件中更容易定位变化。

## 十、handoff helper 如何复用结构而不吞掉领域语义

普通 certificate、receipt、closure 和 completion 都含 decision section，但各自 verification section 不同。`decisionLines` 只提取共同的 total decisions、latest decision id 和 latest outcome；它不决定 package 是否 verified，也不推导 closeout ready。verification artifact 的 summary 共同包含 total、latest id 和 handoff ready，`summaryLines` 接收领域字段数组，把共同骨架与调用方提供的 attachment/milestone/closure/step count 组合。每个 spec 仍按原顺序显式列出 check label 与值，代码审查者可以直接看到哪一项来自哪个领域字段。

item helper 同样只复用展示形状。`simpleItemLines` 处理 name、valid、digest、source；`checkedItemLines` 再增加 valid/source/digest matches、领域 digest 与 recomputed digest；completion step 因为多出 ready 和 detail，保留独立 helper。没有建立按字符串路径动态读取对象的万能 mapper，也没有把不同 artifact 强制转换成无类型字典。共享层减少的是 Markdown 骨架，不是 TypeScript 对领域差异的约束。

## 十一、parity 抓到的顺序错误说明了什么

第一次运行迁移后测试时，55 个表面完全一致，只有 `completionVerification` 的 hash 变化，而且字节长度仍为 3,947。对比输出发现文字没有增删，只是 summary 中 `Closeout ready` 被放到了 `Handoff ready` 之前。原因是初版 `summaryLines` 总把调用方字段放在共同的 handoff 字段之前，而 completion 规格把 closeout 也作为普通扩展字段传入。这个差异不会导致 JSON 错误，肉眼看两个布尔值也都正确，普通 `toContain` 断言很难发现，但完整字节门能精确指出公共 Markdown 合同已经漂移。

修复没有改 hash 期望，也没有为 completion 放弃共享 helper。`summaryLines` 明确接收 handoff 前字段和可选的 handoff 后字段；certificate、receipt、closure 仍只传前字段，completion 把 step count 放在前面、closeout ready 放在后面。这个 API 把原输出顺序变成可读数据边界，而不是在 helper 内按字段名写特殊判断。修复后新旧两个固定时钟下的 completion verification 都恢复原摘要，56 个新表面和十五个旧表面全部通过。

## 十二、数字下降为什么来自职责收敛而不是扫描器规避

稳定 renderer 文件从 742 行降为 151 行并退出近限账本，维护性由 82/89/208/0 变成 81/89/208/0。新 `core.ts` 为 234 行，`handoff.ts` 约 565 行，都低于六百行近限阈值；里面没有超过一百二十行的函数，也没有复杂度超过二十的函数。拆分后没有新导入环。原文件减少约六百行并不是把内容原样复制到一个 742 行 `specs.ts`，而是将十个 handoff 文档共同的 decision、summary 与 item 形状合并，同时把公共 API 与规格分开。

family logic 的 `src/services:renderers` 从 1,681 降到 1,110，下降 571。这个数字只计算受管 renderer family 中的格式行为；规格数据移入 bounded context 后，稳定 renderer 的函数确实只剩一次 engine 调用。为了防止“改后缀刷分”，本版还检查全仓物理指标：name debt 仍是 4,444，没有用批量重命名制造下降；tracked family 仍是 52，没有产生第三个新 family；复杂和长函数没有增加；源码超过八百行仍为零。下一版还会删除 release/deployment 的手写 `lines` 数组，而不是让它们继续躲在其他文件中。

## 十三、公共行为与安全边界保持在哪里

route manifest、URL、HTTP method、content type、JSON artifact 对象和 28 个 renderer 导出均未改变。Ledger 的默认 capacity 仍为 100，默认 ID 仍来自加密随机 UUID；只有测试显式提供第二参数时才使用固定 ID。`buildApp(config)` 的现有调用仍创建完整 runtime deps，安装 access hooks、audit hooks 和全部 route；可选 deps 只用于测试组合，不放宽鉴权、不绕过 hook，也不向外暴露新 HTTP 输入。

promotion archive 链继续只读内存 decision ledger 并构造报告。它没有启动 Java 或 mini-kv，没有读取凭据值，没有建立生产连接，没有执行 SQL、KV 写入、部署或恢复，也没有新增网络请求。Java 与 mini-kv 可以并行推进各自维护，因为 Node 不消费新鲜上游文件。截图不适用于本版：变化发生在 TypeScript 内部结构和 Markdown 原始字节，生成一张静态页面图片既不能证明 hash 等价，也不能证明随机依赖被正确控制，因此不创建空图片目录。

## 十四、本版验证如何分层回答不同问题

终局 census 单测用 17 个案例回答“九分门会不会漏掉单项失败”；promotion oracle 用 56 个 raw payload 摘要回答“完整输出是否逐字节不变”；旧 v2199 parity 回答“历史固定时钟下的十五个早期路由是否仍兼容”；bundle boundary 与 re-export 测试回答“领域构建器标题及稳定导出是否断裂”。Typecheck 回答 app 依赖注入、spec 类型和 renderer 参数是否一致，定向 ESLint 保证新增文件零告警，governance growth ratchet 检查服务与 route 数量没有越过硬上限。

静态门再从全仓角度验证 elegance、family logic、maintainability、renderer 与 source size。由于 renderer 文件退出近限账本，baseline 只能按真实值从 82 收紧到 81，不能留下旧的宽松条目。v2228 属于五版批次的第一版，因此不重复运行完整 coverage、build、双模式 HTTP smoke 和远端 CI；这些昂贵门在 v2232 统一执行，期间每版仍跑 focused、typecheck、lint 与全静态 census。触碰 byte oracle 的版本还必须在 push 前完成 mixed、LF、CRLF 三种物化下的新旧 parity 表面。

## 十五、v2228 完成后为何不能停在“局部九分”

本版将最高重复 family 从 1,681 压到 1,110，并移除一个近限文件，说明方向有效；但终局命令仍会列出近限、长函数、复杂函数、最大长度、最大复杂度、命名债、renderer logic 和 verification logic 红项。尤其 release/deployment 的三个旧模块仍用大段字符串数组手写同一套标题、字段、checks、items、summary 与 next actions，它们是下一版最直接的重复源。v2229 必须把这十三个链尾 renderer 接入同一 spec/engine 边界，让 28 个 artifact 都由同一种结构表达，并把 `src/services:renderers` 压到 700 以下。

之后还要处理五个最长 controlled-shard section renderer、六个最高复杂度 checks/reference builder，再按最新 census 选择同时命中近限、复杂和命名债的热点。每一刀都必须有完整行为 oracle、缩紧 baseline 和可解释的领域边界，不能把函数平均切碎或用目录移动换数字。只有十二项终局阈值、全部现有回归、完整测试、build、smoke 和远端 CI 同时通过，才进入用户要求的九分审核。v2228 的工程意义，是让“继续优化到九分”第一次拥有可执行终点，同时证明高重复 promotion 展示链可以在不改变一个输出字节的前提下变成清晰的 engine、spec 与稳定 API 三层。
