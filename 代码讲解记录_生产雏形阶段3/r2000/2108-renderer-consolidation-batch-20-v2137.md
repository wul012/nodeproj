# v2137 renderer consolidation batch 20 / audit-store 报告骨架收口

## Goal and Non-goal / 目标与非目标

v2137 的目标是把两份 audit-store 基础治理报告从手写 Markdown 数组迁到 `verificationReportBuilder`：`src/services/auditStoreEnvConfigProfile.ts` 与 `src/services/auditStoreRuntimeProfile.ts`。这两份文件虽然不属于 `*Renderer.ts` 命名族，但它们承担的职责和前面二十批 renderer consolidation 一样：接收已经计算好的 profile，把 profile 转成 Markdown。旧实现里，标题、meta 行、`Config`、`Runtime`、`Checks`、`Summary`、`Evidence Endpoints`、`Next Actions` 这些结构全部由本地数组一行一行拼出来。这样的重复不影响功能，但会让后续治理越来越难，因为任何一个空行、空态文案或字段顺序的手误都要在单个文件里排查。

本版的非目标同样清楚。它不改 audit store 的创建逻辑，不改 `AUDIT_STORE_KIND`、`AUDIT_STORE_PATH`、`AUDIT_STORE_URL` 的解析结果，不把 database store 接入运行时，不修改 route 注册，不新增 evidence schema，不启动 Java 或 mini-kv，也不把只读报告解释成生产执行能力。尤其要注意，runtime profile 里的 durable file-backed store 仍然是 prototype，env config profile 里的 database URL 仍然只做脱敏展示和 blocker 判断。v2137 只处理“报告外框怎么写得更一致”这一层，不碰“审计存储是否已能生产使用”这一层。

这版也刻意没有扩展公共 builder。`auditStoreEnvConfigProfile` 和 `auditStoreRuntimeProfile` 的 message 类型没有 `source` 字段，而 `renderVerificationReportMarkdown` 的标准 `messages` section 复用的是 `liveProbeReportUtils.renderMessages`，它会输出 `code (severity, source): message`。如果强行把这两份 profile 改成标准 message，会改变公开 Markdown；如果为了它们新增一个 `sourceLessMessages` section，又会让 builder 因单例而变胖。因此本版用 `lines` section 承接本地 message formatter，公共层只负责分区骨架。

## Entry Points / 入口

第一个入口是 `renderAuditStoreEnvConfigProfileMarkdown(profile)`。调用方仍然传入 `AuditStoreEnvConfigProfile`，这个 profile 由 `createAuditStoreEnvConfigProfile(config)` 构造。构造阶段会归一化 `auditStoreKind`，判断 path 和 URL 是否存在，计算 `storeKindRecognized`、`fileStorePathReady`、`databaseStoreUrlReady`、`durableStoreWiringImplemented` 等 checks，并生成 blockers、warnings、recommendations、evidence endpoints 与 next actions。renderer 的职责只从这里开始：它把这些字段排成 Markdown。

迁移后，这个入口不再手写 `return [ ... ].join("\n")`。它改为返回 `renderVerificationReportMarkdown({ title, meta, sections })`。`meta` 保留原来的 `Service`、`Generated at`、`Profile version`、`Ready for durable audit migration`、`Read only`、`Execution allowed` 顺序；`sections` 里，`Config`、`Checks`、`Summary`、`Evidence Endpoints` 用 `{ heading, entries }`，`Next Actions` 用 `{ heading, list, emptyText }`，三类 message section 用 `{ heading, lines }`。这样入口仍然暴露同一个导出函数，但函数内部从“拼字符串”变成“声明报告结构”。

第二个入口是 `renderAuditStoreRuntimeProfileMarkdown(profile)`。它的 profile 来源是 `createAuditStoreRuntimeProfile(input)`，默认描述当前 in-memory audit runtime，也可以接收 `describeAuditStoreRuntime(config)` 产生的 file runtime description。旧 renderer 里最特殊的是 `Stores` 分区：每个 store 以 `### in-memory`、`### file-backed-prototype`、`### database-required` 这类三级标题展开，并且每个 store 子块后都有空行。这个形状不是普通 entries，也不是普通 list，所以 v2137 保留 `renderStore`，新增一个很小的 `renderStores` 包装，把所有 store 行合并后裁掉最后一个尾空行，让 builder 在进入下一分区时补回唯一的一行间隔。

## Response Model / 响应模型

这两份报告的响应模型可以分成三层。第一层是 profile 层，它表达审计存储的治理事实。例如 env config profile 的 `config` 表示输入配置的归一化结果，`checks` 表示哪些生产前要求满足或缺失，`summary` 汇总 blocker、warning、recommendation 的数量。runtime profile 的 `runtime` 表示实际运行时描述，`stores` 表示当前可见的 store 实现和未来必须补齐的 database store，`checks` 表示当前运行时仍然为什么不能称为 production audit。

第二层是 renderer spec 层，也就是这次迁移真正改变的地方。`renderVerificationReportMarkdown` 不理解 audit store 业务，它只知道标题、meta 和 section。renderer 把业务字段挑出来交给 spec：对象型字段用 entries，数组型 next actions 用 list，已经按本地规则渲染好的 message 或 store 行用 lines。这个模型让 reviewer 可以一眼看出报告顺序，不必在几十行字符串数组里寻找每个空字符串的意义。

第三层是最终 Markdown 层。对 route 和测试而言，输出必须和旧实现一致。env config 的 message 行仍然是 `CODE (severity): message`，runtime 的 store 子块仍然以三级标题展示，runtime profile 的 `auditStorePath` 如果没有值仍然通过 shared `renderEntries` 输出 `unknown`。这些细节看似小，但它们是字节等价的核心。v2137 的临时对比测试覆盖了 memory、file、database 三种配置，以及默认 runtime 和 file runtime 两种运行时投影，就是为了确认响应模型没有因为模板化而缩水。

## Upstream Evidence and Config / 上游证据与配置

v2137 不需要新的 Java 或 mini-kv 证据。audit-store 这两份 profile 都是 Node 本地治理报告，它们读取的是 Node 配置和 Node 运行时描述，不依赖 sibling workspace 的 fresh evidence。Java 和 mini-kv 可以继续照自己的 playbook 并行推进；Node 在这里没有向它们发出前置批准要求，也没有要求它们产出新版本供本版消费。

配置层面的关键变量仍然是 `AUDIT_STORE_KIND`、`AUDIT_STORE_PATH`、`AUDIT_STORE_URL`。env config profile 会把 `memory` 或 `in-memory` 归为 memory，把 `file` 或 `jsonl` 归为 file，把 `database`、`postgres`、`postgresql` 归为 database，其余归为 unknown。database URL 如果存在会脱敏，用户名和密码被替换成 redacted；如果 URL 无法解析，则输出 `redacted-invalid-url`。这些规则全部保留在 loader 和本地 helper 中，renderer consolidation 不参与重新解释。

runtime profile 的配置来源更偏运行时。默认情况下，它描述 `InMemoryAuditStore`，容量为 200，`durableAtRuntime` 为 false。若传入 file runtime description，它会展示 `FileBackedAuditStore`、配置来源、runtime store kind 和 audit store path。这里的 file store 仍然被标为 prototype，因为它没有 rotation、encryption、compaction、concurrent writer coordination 或 retention policy。也就是说，即使 file runtime 能帮助 restart-recovery rehearsal，它仍然不是生产审计存储的最终答案。

## Service Flow / 服务流程

env config 的服务流程是：配置进入 `createAuditStoreEnvConfigProfile`，先通过 `normalizeStoreKind` 得到 normalized kind，再计算 path 和 URL 是否配置；随后形成 checks，收集 blockers、warnings、recommendations，最后把 endpoints 和 next actions 放进 profile。迁移前，renderer 直接按数组输出所有分区；迁移后，renderer 把相同分区交给 builder。这个流程没有新增任何判断分支，所有 blocker 数量、warning 内容、URL 脱敏和 next action 文案都来自原来的 profile 构造。

runtime profile 的服务流程是：`createAuditStoreRuntimeProfile` 接收可选 runtime description，若没有输入就构造默认 in-memory 描述；然后 `createStoreDescriptions` 列出三类 store，checks 判断接口、默认 store、file prototype、database store、durable runtime、retention policy 和 migration requirement；再收集 blockers、warnings、recommendations。renderer 阶段把 `Runtime`、`Checks`、`Summary`、`Evidence Endpoints` 和 `Next Actions` 交给 builder，把 `Stores` 交给本地 `renderStores`。

`renderStores` 是这版最小但很重要的维护点。旧 `renderStore` 每个子块末尾都返回一个空字符串；如果直接把 `profile.stores.flatMap(renderStore)` 放进 builder 的 lines section，builder 在进入下一 section 时还会追加自己的空行，最终 `Stores` 和 `Production Blockers` 之间会多一行。v2137 通过 `.slice(0, -1)` 去掉最后一个尾空行，让 section 间距继续由 builder 管理。这样既保留 store 子块之间的空行，又避免公共模板被迫增加“不要补空行”的开关。

## Safety Boundary / 安全边界

安全边界的第一层是只读。两份报告仍然只是 profile renderer，不会写 audit event，不会连接外部 database，不会触发上游 probe，也不会更改 Java 或 mini-kv 状态。env config profile 可以展示 database URL 已配置这一事实，但只展示脱敏结果；runtime profile 可以展示 file-backed prototype 已存在这一事实，但不会因此宣称 managed durable audit 已完成。

第二层是生产含义。`readyForDurableAuditMigration` 只说明配置层面是否满足未来迁移的前置条件，不等于生产审计已经可用。`readyForProductionAudit` 在 runtime profile 中仍然保持 false，因为当前缺少 managed database store、retention policy 和完整迁移测试。v2137 不碰这些布尔位，不把 blocker 改成 warning，也不把 warning 改成 recommendation。它只是让 Markdown 的外框走公共代码。

第三层是公共工具边界。`verificationReportBuilder` 应该保持为报告布局工具，而不是业务解释容器。本版没有把 source-less message 格式塞进去，也没有把 `Stores` 的三级标题逻辑变成通用 store helper。原因很实际：公共工具越少理解业务，越容易长期维护；特殊业务行越留在原服务附近，reviewer 越容易判断改动是否越界。

## Test Coverage / 测试覆盖

本版验证分四层。第一层是 `npm run typecheck`，它确认两个 service 文件的 import、builder spec、entries/list/lines section 都满足类型要求。第二层是 focused tests：`test/auditStoreEnvConfigProfile.test.ts` 和 `test/auditStoreRuntimeProfile.test.ts`，共 5 个测试。它们覆盖 memory config blocker、database URL 脱敏、file config route Markdown、默认 runtime profile、runtime route Markdown，以及 `### file-backed-prototype` 这类 store 子块仍在输出里。

第三层是临时逐字节对比。`.tmp/v2137-byte-identical-compare.test.ts` 通过 `git show HEAD:<path>` 读取迁移前的两个文件，把旧实现用 TypeScript 转译后放进 VM，再用相同 profile 对比旧 renderer 和新 renderer。env config 覆盖 memory、file、postgres 三种配置；runtime 覆盖默认 in-memory 和 file runtime 两种输入。这个测试比普通 snapshot 更适合本次迁移，因为它不依赖人眼判断“差不多”，而是直接要求输出字符串完全相同。

第四层是后续收尾门禁。文档补齐后还会跑 code walkthrough quality gate、explanation readability closeout gate 和 route quality routes；然后再跑 lint 与 build。由于本版不需要 HTTP smoke，也没有新 UI 或截图页面，归档里不生成图片。临时 `.tmp` 文件只服务于本轮对比，提交前会删除；构建如果生成 `dist/`，收尾前也会清理。

## Maintenance Decision / 维护决策

v2137 的维护决策可以概括为“收公共框架，保本地语义”。对 audit-store env config 来说，公共框架是标题、meta、Config、Checks、Summary、Evidence Endpoints、Next Actions；本地语义是无 source 的 message 行。对 audit-store runtime 来说，公共框架是 Runtime、Checks、Summary、Evidence Endpoints、Next Actions；本地语义是 store 子块和无 source 的 message 行。这种切分让迁移既有实际减行，又不会为了追求统一破坏已有公开文本。

这也说明为什么本版只迁两份文件。N1 后期剩余对象里有些很像报告，但存在 compact spacing、嵌套小节、命令块、snippet 投影或特殊 message 语法。把它们全部强推到一个 builder 里，看起来版本数量会更大，长期却会让 builder 变成特例集合。v2137 选择先收 audit-store 这一对基础 profile，是因为它们足够规整，同时又能补齐 Node 自身审计存储治理面的 builder-backed 覆盖。

后续扫描可以继续沿两条线走。第一条线是找同样规整的基础治理 profile，优先迁移那些 entries/list/lines 能清楚表达的文件。第二条线是把 compact spacing 文件单独列成候选池，等出现多个同形样本时再决定是否扩 builder。这样 N1 既能持续推进，又不会把公共层变重。

## Review Notes / 审阅要点

审阅 v2137 时，第一眼应看 `auditStoreEnvConfigProfile.ts` 的 message 输出是否仍然没有 source，尤其是 blocker 行是否保持 `CODE (severity): message`。如果误用 builder 的标准 messages section，输出会多一个 source 位置，逐字节对比会失败。第二眼应看 `auditStoreRuntimeProfile.ts` 的 `Stores` 分区，确认三级标题、每个 store 的字段顺序、store 子块之间的空行都没有变化，并且 `Stores` 与 `Production Blockers` 之间没有额外空行。

第三个审阅点是安全叙事。报告迁移不应被误读为 durable audit 已完成；当前版本仍然把生产审计阻断在 database store、retention policy、migration tests 和 managed storage 之前。第四个审阅点是跨项目并行：Java 和 mini-kv 不需要等待 v2137，它们没有收到新 contract，也没有被要求生成 fresh evidence。Node 这边只是把已有只读报告整理得更易维护。

## Builder Boundary / 公共模板边界

本版最值得记录的工程判断，是没有为了这两份 profile 去扩展 `VerificationReportSection`。从表面看，给 builder 加一个 `simpleMessages` 分支似乎可以再少几行本地代码；但那会把一个历史 profile 的偶然格式提升为公共协议。公共协议一旦发布，后面每个 renderer 都可能开始询问“这里能不能也加一个分支”，最后 builder 会重新变成维护负担。v2137 选择用 `lines` 接住本地格式，意味着公共模板只处理稳定重复的布局职责，而不接管每种 message 语法。

`Stores` 分区也是同样的判断。它不是普通 entries，因为每个 store 需要独立的三级标题；它也不是普通 list，因为每个 store 下面有 implementation、runtime default、durable、production ready、purpose、limitation 六行。若把它抽成共享 helper，就必须决定这个 helper 是否只服务 audit store，还是服务所有未来“实体卡片”分区。当前仓库没有足够多的同形样本，所以局部保留更合适。这样 reviewer 读 runtime profile 时，仍然能在同一个文件里看到 store 子块的输出规则，不必跳到一个含义模糊的公共工具里追踪。

这个边界判断会影响后续候选筛选。适合直接迁移的文件通常有三个特征：顶层 meta 稳定，section 间隔符合 builder 默认协议，局部内容能用 entries、list 或少量 lines 表达。不适合直接迁移的文件则往往有 compact spacing、section 中插入裸文本、命令块需要特殊空行、或者 message 格式带有历史语义。对后者，正确动作不是硬迁，而是先登记原因，等出现多个相同形状时再决定是否扩展 builder。这样做慢一点，但能避免公共层长期失控。

## Production Readiness Meaning / 生产前置含义

audit-store 这一对 profile 虽然只是 renderer consolidation，但它们处在真实生产审计之前的关键位置。env config profile 告诉 operator：配置层面是否已经请求 durable store、path 或 URL 是否存在、URL 是否安全脱敏、当前 runtime 是否仍然默认 in-memory。runtime profile 告诉 reviewer：应用真正实例化的 store 是什么、file-backed prototype 只能支持演练、database store 和 retention policy 仍然缺失。把这两份报告的外框收敛以后，后续讨论 durable audit migration 时，大家可以更快地区分“配置已经写入”“运行时已经接入”“生产策略已经闭环”这三件不同的事。

这对后续分片联合执行也有间接价值。真正执行前，审计证据必须可恢复、可查询、可保留、可授权访问；否则任何跨项目执行都会缺少可信追溯。v2137 没有直接推进执行，但它把审计存储的两份基础说明变得更稳定，减少了后续版本在报告层反复调整的噪声。等未来进入 durable audit store migration 或 shard preview 时，Node 可以把注意力放在真实存储、回滚证据和访问策略上，而不是继续维护一堆手写 Markdown 外框。

## Next Scan / 下一轮扫描

下一轮可以继续从基础治理 profile 和早期 access-control 报告里找候选，但要先看两个条件。第一，message 是否带 `source`。带 source 的报告可以用 builder 标准 messages section；不带 source 的报告如果只是少数样本，应继续用 lines，避免扩公共协议。第二，section 是否有尾空行或紧凑拼接。像 runtime `Stores` 这种可以用很小的局部 wrapper 保持等价；如果某个文件有多个 section 都依赖紧凑拼接，就应该暂缓，等有更清晰的 builder spacing 方案。

同时，这轮以后也可以做一次剩余清单分组，而不是只按文件名扫描。建议把剩余对象分为“标准完整报告”“带局部行 helper 的报告”“compact spacing 报告”“命令或计划型文档渲染”“暂不适合迁移”五类。这样连续推进时就能先吃掉高确定性的标准报告，再处理需要设计判断的边界报告。这个节奏比随机挑文件更像工程后期保养，也更容易向外部 reviewer 说明每版为什么值得做。

## One-sentence Summary / 一句话总结

v2137 把 audit-store env config profile 和 runtime profile 的重复 Markdown 外框迁入 `verificationReportBuilder`，保留 source-less message 与 store 子块的本地语义，并用 typecheck、focused tests 和逐字节对比证明公开输出没有变化。
