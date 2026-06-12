# v2134 renderer consolidation batch 17 / 渲染器骨架收口第17批

## 本版目标

v2134 的目标是继续压缩 N1 里剩余的手写 Markdown 报告骨架，但这次没有追求一次迁移很多文件，而是挑了两个信息密度更高、历史语义更重的验证报告：`managedAuditLocalAdapterCandidateVerificationReport.ts` 和 `managedAuditIdentityApprovalProvenancePacketVerificationReport.ts`。这两个文件都不是普通的“把几个字段列出来”的 renderer。前者围绕 Node v221 的本地 adapter candidate dry-run 归档，既要展示归档文件是否存在、大小、digest，也要逐条列出 snippet 是否命中；后者围绕 identity approval provenance dry-run packet，既要展示 source packet 的版本和 digest，也要展示 verification report 自己生成的 trace、append/query 计数，以及 v205 遗留质量优化是否仍然保持。

所以本版的重点不是“多迁几个文件显得进度大”，而是把较复杂报告中的共性和个性切开。共性是标题、顶层 meta、section 顺序、checks、summary、blocker/warning/recommendation、evidence endpoints、next actions，这些内容已经被前面十六批证明适合交给 `renderVerificationReportMarkdown`。个性是 archive file 行、snippet match 行、source packet 字段含义、quality optimization 字段含义，这些仍然留在原文件里。这样迁移后，调用方看见的 Markdown 不变，维护者看见的代码层次更清楚。

## 入口保持不变

两个公开入口都没有改名，也没有改参数。`renderManagedAuditLocalAdapterCandidateVerificationReportMarkdown(profile)` 仍然接收 `ManagedAuditLocalAdapterCandidateVerificationReportProfile`，返回完整 Markdown 字符串；`renderManagedAuditIdentityApprovalProvenancePacketVerificationReportMarkdown(profile)` 仍然接收 `ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile`，返回完整 Markdown 字符串。route 层不需要知道 renderer 内部发生了什么变化，测试里的 Markdown route 也不需要改 URL、header 或断言语义。

这点很重要，因为 N1 的 renderer consolidation 只应该降低报告层维护成本，不应该顺手改变对外契约。所有 loader 仍然按原来的方式生产 profile，所有 JSON 响应仍然按原来的 shape 输出，所有历史 fixture 和归档路径仍然由 loader 或常量维护。renderer 做的事情只是把 profile 投影成 Markdown，v2134 也只改变这个投影动作的内部写法。

## Service Flow / 服务流程

这两个报告的服务流程可以拆成三段看。第一段是 profile 生成：route 或测试调用 loader，loader 读取 config、历史归档、dry-run packet、运行时描述或审计日志，最后计算 checks、summary、blockers、warnings、recommendations。第二段是只读投影：renderer 接收已经成型的 profile，不再访问磁盘，不再重新跑 upstream，也不再制造新的业务判断。第三段是输出：如果请求 JSON，route 直接返回 profile；如果请求 Markdown，route 调用 render 函数，把同一个 profile 投影成文本。

v2134 只动第三段，而且只动第三段里的外框拼装方式。`loadManagedAuditLocalAdapterCandidateVerificationReport` 仍然负责判断 v221 archive 文件是否存在、snippet 是否命中、上游动作是否保持 disabled；`loadManagedAuditIdentityApprovalProvenancePacketVerificationReport` 仍然负责从 dry-run packet 取出 digest、approval identity、trace、append/query 计数和 v205 quality optimization 状态。renderer 不抢 loader 的职责，也不把 checks 重新计算一遍。这样的分层能避免一个常见维护错误：为了改 Markdown 格式，顺手把 profile 构造逻辑也搬进 renderer，最后让报告层和数据层互相缠住。

从调用链看，用户请求 Markdown route 时，流向仍然是 `src/routes/...` 注册的 audit route 调用对应 loader，再调用 `renderManagedAudit...Markdown`。迁移前，render 函数内部是一组手写数组；迁移后，render 函数内部是 `renderVerificationReportMarkdown({ title, meta, sections })`。这意味着所有调用方的时序、权限检查和 route 保护都不变，变化只发生在最后一层字符串组装。后续如果要排查 route 认证、profile 字段或 upstream 边界，仍然应该先看 loader 和 route，不应该把 builder 当成业务入口。

## 本地 adapter candidate 报告的迁移

`managedAuditLocalAdapterCandidateVerificationReport.ts` 原来的 render 函数是一长段数组拼接。它从标题开始，逐行拼 `Service`、`Generated at`、`Profile version`、`Report state`、`Ready for verification report`、`Ready for production audit`、`Read-only report`、`Source endpoint rerun performed`、`Additional local dry-run write performed`，然后进入 `Source Archive`、`Verification`、`Archived Evidence Files`、`Snippet Matches`、`Checks`、`Summary`、`Production Blockers`、`Warnings`、`Recommendations`、`Evidence Endpoints`、`Next Actions`。这些 section 的顺序本身就是报告契约的一部分，因此迁移时不能重新排序，也不能把标题改成更“漂亮”的文案。

迁移后的函数把顶层行改成 `meta` 数组，把对象型 section 改成 `{ heading, entries }`，把 message 型 section 改成 `{ heading, messages, emptyText }`，把 next actions 改成 `{ heading, list, emptyText }`。这样做之后，报告外框不再由本文件手写维护，后续如果 builder 的空行规则、message 空文案规则或 entries 展开规则需要统一修正，维护点只有一个。

这个文件里仍然保留了 `renderArchiveFile` 和 `renderSnippet`。原因不是懒得抽，而是这两段有明确的归档语义。archive file 行要展示 `id`、`path`、`exists`、`sizeBytes`、`digest`，snippet 行要展示 `id`、`path`、`matched`、`expectedText`。这些字段和 v221 的 dry-run archive 强绑定，放进通用 builder 会让 builder 知道太多历史版本细节。现在的边界更合理：本地 helper 负责把业务证据转换成 Markdown 行，builder 只负责把这些行放进正确 section。

## 空行兼容处理

本版有一个看起来很小但非常关键的处理：`removeTrailingBlankLine`。旧的 `renderArchiveFile` 和 `renderSnippet` helper 每个条目末尾都会返回一个空字符串，用来在下一个条目前留空行。手写数组拼接时，这个尾空行同时也承担“当前 section 和下一个 section 之间的空行”。但是 `renderVerificationReportMarkdown` 在每个 section 之间本来就会插入一个空行。如果直接把旧 helper 的输出传给 `lines`，section 之间就会多出一行空白，Markdown 字节级输出会变。

因此 v2134 在把 `flatMap(renderArchiveFile)` 和 `flatMap(renderSnippet)` 交给 builder 前，先用 `removeTrailingBlankLine` 去掉整体最后一个空字符串。这样每个条目之间的空行仍然存在，最后一个条目和下一个 section 之间的空行则由 builder 统一提供。这个处理不是格式美化，而是为了保持旧输出逐字一致。它也说明这类迁移不能只看“视觉上差不多”，必须理解旧数组里每个 `""` 到底承担了哪一层排版职责。

## provenance packet 报告的迁移

`managedAuditIdentityApprovalProvenancePacketVerificationReport.ts` 的结构比本地 adapter candidate 更规整，但它承载的生产前边界更敏感。顶层 meta 里有 `Ready for managed audit identity approval provenance packet verification report`、`Ready for production audit`、`Ready for production window`、`Ready for production operations`、`Read-only report`、`Source local dry-run write observed`、`Additional write surface added`、`Execution allowed`。这些字段共同表达一个核心事实：本报告验证的是 dry-run packet 和 provenance linkage，不是放开真实生产写入。

迁移后，`Source Packet`、`Verification Report`、`Quality Optimizations`、`Checks`、`Summary` 都变成标准 entries section。`Production Blockers`、`Warnings`、`Recommendations` 交给 builder 的 message section。`Evidence Endpoints` 和 `Next Actions` 也交给 builder。这个文件没有像本地 adapter candidate 那样的本地 Markdown 行 helper，所以迁移更直观：只要 meta 文案和 section 顺序不变，builder 输出就应该和旧输出一致。

这里仍然没有抽取 “source packet renderer” 或 “quality optimization renderer”。因为当前只是对象字段直接展开，并没有出现三个以上文件共享同一种 source packet 行语法。按照治理增长规则，公共 helper 必须解决真实重复，而不是为了让代码看上去更抽象而提前制造接口。v2134 的抽象层级停在报告外框，正好对应当前重复的真实位置。

## 安全边界

本版没有改任何执行开关。`UPSTREAM_ACTIONS_ENABLED` 的 blocked 行为仍由 loader/checks 决定，renderer 只是展示最终 profile。Java 和 mini-kv 也没有被启动，测试里还保留了会抛错的 upstream client，确保 provenance packet verification report 不会偷偷调用外部系统。`readyForProductionAudit`、`readyForProductionWindow`、`readyForProductionOperations` 仍然是 false；`executionAllowed` 仍然是 false；本地 adapter candidate 报告里的 `sourceEndpointRerunPerformed` 和 `additionalLocalDryRunWritePerformed` 也仍然是 false。

这层边界对后续真实执行很关键。越接近生产级分片执行，越要防止报告层清理被误读成执行层放行。v2134 改的是“怎样把已经存在的验证结果写成 Markdown”，不是“怎样获得更多权限”。所以它不会阻塞 Java / mini-kv 继续照自己的 playbook 推进，也不需要 sibling project 给新的证据。它只让 Node 自己的历史验证报告更容易维护。

## 验证方式

验证分三层。第一层是 `npm run typecheck`，确认两个文件移除 `renderList` / `renderMessages` / 部分 `renderEntries` 后，新的 builder spec 类型和原 profile 类型能对上。第二层是 focused tests：`test/managedAuditLocalAdapterCandidateVerificationReport.test.ts` 和 `test/managedAuditIdentityApprovalProvenancePacketVerificationReport.test.ts`，共 6 个测试，覆盖 ready profile、blocked profile、JSON route 和 Markdown route 的核心断言。第三层是临时逐字节对比测试，直接从 `git show HEAD:<path>` 读出旧文件源码，在内存里用 TypeScript 转译旧 renderer，然后用同一个真实 profile 同时跑旧实现和新实现，最后比较完整 Markdown 字符串。

逐字节对比覆盖了四个 profile：本地 adapter candidate ready、上游 actions enabled blocked、identity approval provenance packet ready、上游 actions enabled blocked。这样不只验证 happy path，也验证 blocker message、summary count、check false 值、empty text 等路径没有变。这个测试通过之后，才可以说“迁移没有改变输出”，而不是只说“页面看起来差不多”。

## 维护收益

v2134 之后，这两个较重报告的外框从手写数组变成了声明式 spec。维护者可以在函数开头直接看到报告由哪些 meta 和 sections 组成，不需要在一串 `return [ ... ].join("\n")` 里数空行。对于本地 adapter candidate，archive/snippet 语义仍然在本文件底部，定位也很直接。对于 provenance packet，source packet、verification report、quality optimization 都是对象投影，没有额外格式 helper，读者可以很快判断它们只是被 builder 展开，而不是被重新解释。

这也让后续扫描更有方向。剩余 renderer 如果只是完整报告骨架，就可以继续按 v2134 的方式迁移；如果是 worksheet、operator package、命令模板、局部 evidence block，就应该先判断它是不是完整报告，而不是强行套 builder。N1 真正要收口的是重复报告外框，不是把所有 Markdown 生成都塞进一个工具函数。

## 维护边界

这个版本的维护边界可以用两句话概括。第一，`verificationReportBuilder` 只吸收稳定的报告骨架，不吸收历史证据解释。第二，本地文件只保留自己真正拥有的业务投影，不继续手写标题、meta、标准 message 和尾部列表。前一句防止公共工具变成大而全的历史知识库，后一句防止每个 renderer 都复制一遍相同的空行和 section 规则。

因此，`removeTrailingBlankLine` 没有被放进 builder。它只服务本地 adapter candidate 这个文件，因为问题来自这个文件的 `renderArchiveFile` / `renderSnippet` 返回值。未来如果第三个、第四个文件出现同样“条目 helper 自带尾空行、builder section 又自动隔行”的结构，再考虑抽出一个命名更清楚的局部行规范化工具。现在提前抽公共 helper 反而会让读者误以为所有 line sections 都需要去尾空行，这不是事实。

同理，provenance packet 报告没有新增 packet 专用 renderer。`sourcePacket` 和 `verificationReport` 当前只是对象展开，`renderEntries` 已经足够稳定。只有当后面出现多份报告都要把 packet digest、binding contract digest、approval identity、trace digest 按同一套嵌套格式展示时，才值得把它们升成共享投影函数。这个停止条件写清楚后，后续版本就不会在“能抽一点就抽一点”的方向上失控。

## 风险复盘

本版最大的风险不是 TypeScript 类型，而是 Markdown 字节契约。builder 本身已经存在，meta 和 entries 的类型也不复杂；真正容易出错的是旧手写数组里空字符串的位置。比如旧文件在 `Archived Evidence Files` 后没有显式追加空行，而是依赖每个 `renderArchiveFile` 的返回值尾部带空字符串。如果迁移者只机械地把 `flatMap(renderArchiveFile)` 放进 `lines`，视觉上也许只多出一点空白，但逐字节对比会失败，route snapshot 或归档比对也会被扰动。

第二个风险是把 blocked profile 漏掉。ready profile 往往 messages 为空，主要验证 entries 和 list；blocked profile 会触发 production blockers，能覆盖 message section 的非空路径。v2134 的临时对比测试同时跑 ready 和 blocked，就是为了避免“空列表路径一致，但 blocker 列表路径改变”的假安全。第三个风险是误碰 upstream：identity approval provenance packet 的测试继续使用会抛错的 Java / mini-kv client，说明本报告仍是本地只读验证，不依赖真实 sibling service。

## 停止条件

v2134 在两个文件后停止，是因为这一批已经覆盖了两种较重形态：一种是 archive/snippet 分层证据，一种是 packet/quality projection。继续把下一组不同形态混进同一个提交，会让 review 很难判断每种形态的风险是否被分别验证。当前提交的变更面控制在两个 service 文件、三份归档文档和两处计划记录内，既能体现真实维护收益，也能让逐字节对比的结果足够明确。

后续继续推进时，优先找“完整报告外框仍然手写”的文件，而不是按文件名随便扫。判断标准是：文件是否有 `# title`、顶层 meta、`## Checks`、`## Summary`、message sections、evidence endpoints 和 next actions；如果有，就属于 builder 候选。如果文件只是某个大报告里的局部 section，或者它输出的是 operator worksheet / command package / approval template，就先不要迁移，除非能证明它也遵循同一份完整报告契约。

## 后续判断

下一批可以继续扫描 `render...Markdown` 里手写 `# title` 和标准 `## Checks` / `## Summary` / message sections 的文件，优先处理完整 verification/report 形态。遇到有本地行 helper 的文件，先做和本版一样的判断：本地 helper 是否只服务当前历史语义，是否需要保留，是否存在尾空行契约。只有当至少三个文件重复同一种本地行语法，并且逐字节对比能证明抽取不会改变输出时，才值得新增共享 helper。

v2134 的一句话结论是：两个历史验证报告已经从手写 Markdown 外框迁移到 `verificationReportBuilder`，archive/snippet/source packet 等业务强语义内容保持本地，执行边界没有打开，Java / mini-kv 不被阻塞，输出通过 focused tests 和逐字节对比确认不变。
