# v2128 renderer consolidation batch 11

## Goal and Non-goal / 目标与非目标

v2128 的目标是收拢 v2127 之后仍然散在 Java / mini-kv route catalog cleanup 报告面里的 6 个 renderer，让它们进入同一套 `renderVerificationReportMarkdown` 骨架。这个批次选择 consumer readiness evidence report、consumer readiness batch closeout、current evidence report、fresh baseline batch closeout、latest sibling live smoke preflight、sibling workspace availability closeout，并不是按文件名随手继续迁移，而是因为它们处在同一个治理带：都服务于 Java 与 mini-kv 路由目录清理证据链，都是把已经加载完成的 profile 或 report 转成 Markdown，且都不承担读取文件、连接服务、启动进程或判断权限的职责。

这版真正要解决的维护问题，是“报告骨架重复”已经从 archive verification 家族扩散到 route catalog cleanup 的普通报告、批次收尾、预执行计划和可用性收尾层。旧实现里每个文件都手写标题、meta、section heading、summary、checks、next actions 和末尾换行。重复代码本身不是唯一问题，更大的风险是将来某个 renderer 单独改了空行、布尔值展示或 section 顺序，reviewer 很难判断这是有意的证据语义变化，还是手写模板漂移。v2128 把稳定骨架交给 builder，让 reviewer 的注意力回到真正有差异的本地证据行。

本版也明确不做几件事。第一，不改 report loader 和 evidence loader，不把任何 ready flag、check count、fixture path、digest 或 route path 重新计算。第二，不新增 route，不改 HTTP 行为，不改 access guard，也不打开真实执行授权。第三，不为每一种本地 lines 都抽 helper。consumer evidence 和 current evidence 可以复用 v2127 的 evidence-file helper，因为它们都是 `id / exists / resolvedPath / digest` 形状；batch closeout 的 `path / sizeBytes / sha256`、live smoke preflight 的 process plan 与 read targets、availability closeout 的 historical fixture roots 都保留在本地 renderer 中，因为这些行不仅是格式，还表达具体操作边界。

这个切片的工程尺度也比单纯“少几行”更重。它把 v2127 未覆盖的相邻报告补齐，使 route catalog cleanup 这一块从 evidence report 到 batch closeout、preflight、availability closeout 的 Markdown 骨架基本统一。后续如果要审计这一领域，已经不需要在几十个手写 renderer 里反复辨认相同模板，而可以按报告类型看差异：哪些是证据文件引用，哪些是归档文件引用，哪些是启动计划，哪些是历史 fixture 可用性。这种分类清晰度，对生产前治理项目比短期功能增长更重要。

## Entry Points / 入口

六个公开 renderer 函数名全部保持不变：`renderJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReportMarkdown`、`renderJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReportMarkdown`、`renderJavaMiniKvRouteCatalogCleanupCurrentEvidenceReportMarkdown`、`renderJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutMarkdown`、`renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightMarkdown`、`renderJavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutMarkdown`。route 层仍然通过原 report service re-export 拿到这些函数，外部调用方不需要知道内部从手写数组切换到了 builder。

每个入口仍然只接收当前 report 或 profile 对象，并返回 Markdown string。换句话说，入口的可观察契约没有变化：输入模型不变，返回类型不变，标题不变，meta 字段不变，section 顺序不变，next actions 的空态文字也不变。v2128 的重构点只发生在 renderer 内部表达方式上，把原来一行行拼接字符串的代码变成 `title + meta + sections` 的声明式目录。这个目录更贴近报告结构，也更容易看出某个 section 是否属于通用 entries、list、messages，还是必须保留本地 lines。

入口层最重要的保留点是安全状态仍然显式出现在 meta 中。consumer readiness evidence report 和 current evidence report 继续展示 report state、ready flag、active/source Node version、execution allowed；latest sibling live smoke preflight 继续展示 preflight state、planned execution version、preflight only、starts Java service、starts mini-kv service、execution allowed；availability closeout 继续展示 closeout state 与 execution allowed。对于生产前治理来说，这些 meta 不是装饰，而是读者判断“这是证据展示还是执行授权”的第一层提示。

六个入口之间的业务差异也没有被 builder 抹平。consumer readiness evidence report 关注 frozen consumer readiness evidence、guard 和 release continuity；current evidence report 关注当前 route catalog cleanup evidence 里 Java 与 mini-kv 的冻结材料；fresh baseline batch closeout 关注 v507-v511 的批次收尾和 route catalog 计数；latest sibling live smoke preflight 关注下一步真实 local read-only smoke 需要的进程计划、端口、读目标和命令禁区；sibling workspace availability closeout 关注默认 historical fixture 模式和本地 sibling repo 非默认要求。入口统一的是渲染骨架，不是报告语义。

## Response Model / 响应模型

响应模型仍然是 Markdown，而且临时 exact compare 已经证明六个 renderer 输出与迁移前逐字节一致。这个结果很关键，因为本版不仅替换了标题和 section 拼接方式，还把一部分 evidence-file lines 改为共享 helper。如果空行、缩进、布尔值、`present|missing` 文案、`Resolved path`、`SHA-256`、section heading 或末尾换行任意一个地方漂移，exact compare 都会失败。通过 6/6 说明这次重构没有借“整理代码”之名改变下游可见文本。

builder 接管的模型可以概括为三层。第一层是 `title`，对应 Markdown 一级标题。第二层是 `meta`，用固定 label/value 列表呈现报告身份、版本、状态和执行边界。第三层是 `sections`，每个 section 自己声明 entries、list、messages 或 lines。entries 适合 summary、checks、source archive verification、live smoke window、command policy 这类对象；list 适合 next actions；lines 适合那些本身已经带有业务缩进结构的内容。这样的模型让 renderer 不再混在一大段字符串数组里，而是像一个报告目录。

v2128 复用 v2127 的 `renderVerificationEvidenceFileReferenceLines`，但只在两个最匹配的场景里使用：consumer readiness evidence report 和 current evidence report 的 Evidence Files。它们的文件引用都包含 `id`、`exists`、`resolvedPath`、`digest`，输出正好是三行一组：第一行展示 id 与 present/missing，第二行展示 resolved path，第三行展示 SHA-256 或 missing。这个 helper 不参与 batch closeout 的 path/size/sha 输出，因为那里没有 id/resolvedPath/digest 的同一语义，也不参与 historical fixture roots，因为 root 可用性更像环境模式说明，而不是普通 evidence file reference。

live smoke preflight 的 response model 是本版最需要保留本地 lines 的部分。process plan 每个条目要展示 project、owner、cwd、host、port、start command、readiness probe、stop policy、cleanup verification、fail closed rule；read targets 要展示 project、protocol、method or command、target、expected evidence、read only、mutates state。这些内容虽然也能抽成 helper，但抽象收益不够明确，反而会让 builder 了解太多“启动计划”语义。v2128 保持它们在 renderer 内部展开，读者一眼就能看到这是即将进入真实 local read-only smoke 前的操作清单，而不是普通 report object。

## Upstream Evidence and Config / 上游证据与配置

v2128 不读取实时 Java 或 mini-kv 服务。focused tests 使用的配置继续关闭 upstream probes 和 upstream actions，并开启 historical fixture fallback 场景，确保没有依赖本地 sibling workspace 的未冻结状态。renderer 自身更不接触 config；它只消费 loader 已经生成的 report。因此，即使报告标题里出现 Java、mini-kv、live smoke、sibling workspace 等词，也不能把本版理解为真实执行推进。本版只整理 Node 里已有报告的展示层。

这条边界对三项目并行很重要。Java 和 mini-kv 当前可以继续按自己的 playbook 做治理、测试、文档或文件拆分，不需要因为 Node v2128 等待审批。Node 没有要求它们提供新证据，也没有把它们的 dirty worktree 文件读成权威输入。未来如果 Node 需要 fresh live evidence、改字段合同、启动 Java 服务、连接 mini-kv 或消费新的 CI artifact，计划里必须写清版本、端口、owner、清理要求和阻塞关系；但 v2128 不属于这种情况。

配置层也没有新增开关。`executionAllowed`、`startsJavaService`、`startsMiniKvService`、`preflightOnly`、`closeoutOnly` 等字段都来自既有模型，renderer 只是按原顺序展示。尤其 latest sibling live smoke preflight 仍然只是 preflight：它声明将来执行版本的启动计划和读目标，但当前版本本身不启动服务、不发请求、不读取凭据、不解析 raw endpoint，也不赋予生产窗口权限。把这些字段保留在 meta 和 sections 中，可以防止读者把“准备执行说明”误读成“已经执行或可以执行”。

historical fixture availability 的处理也保持原语义。availability closeout 展示 Java 与 mini-kv historical fixture roots 是否存在，并说明默认 evidence mode 是 historical-fixture，live sibling repo 不是默认前置条件。这对 CI 和本地环境都友好：CI 可以依赖仓库内冻结材料，本地开发者也不会因为没有同时打开三个项目就无法阅读 Node 报告。v2128 只是把这些行放入 builder 的 section 中，根可用性判断仍然由原 loader 负责。

## Service Flow / 服务流程

服务流程仍然是 route 调 report loader，report loader 组合 evidence 或 closeout profile，renderer 把结果转成 Markdown。旧 renderer 在最后一步手写数组并 `join("\n")`；新 renderer 在最后一步声明 `renderVerificationReportMarkdown({ title, meta, sections })`。这个变化没有跨过展示层边界，所以不会影响 route 注册、JSON 响应、Markdown endpoint、summary 计数、check 计算或 fixture 解析。

consumer readiness evidence report 和 current evidence report 是最直接的迁移：summary、checks、各 Java/mini-kv evidence object、Evidence Files、Evidence Endpoints、Next Actions 都进入 sections。Evidence Files 使用共享 evidence-file helper，避免两个文件继续复制同一组三行格式。它们仍然保留各自的 evidence section 名称，例如 Java v211 consumer handoff bundle、Java v214 integrity、mini-kv batch closeout 等；这说明 builder 没有把业务标题统一成无差别通用词。

consumer readiness batch closeout 和 fresh baseline batch closeout 的迁移更像“骨架统一，本地文件引用保留”。它们的 files 不是 evidence-file helper 的模型，而是 path、exists、sizeBytes、sha256。v2128 没有为了减少代码再造一个新 helper，因为这类 batch closeout 文件引用是否会在更多 renderer 中稳定复用，还需要后续扫描确认。现在把它们保留在本地 lines，既能减少外层 Markdown 骨架重复，也不提前承诺一个可能会膨胀的抽象。

latest sibling live smoke preflight 展示的是下一执行版本的过程设计，因此保留最多本地 lines。process plan 和 read targets 的条目字段多、顺序有含义、读者依赖它们判断启动/清理边界。v2128 只把它们所在 section 纳入 builder，内部行展开仍在 renderer 中。这样文件从手写整篇 Markdown 变成“通用框架加两段操作清单”，可维护性提升明显，同时没有把 operation plan 语义藏进远处 helper。

sibling workspace availability closeout 是本版最短的迁移。它的关键内容是 source chain closeout、historical fixture roots、upstream boundary、summary、checks、next actions。historical fixture roots 只有 Java 与 mini-kv 两个 root，行格式简单但语义具体，留在本地比抽 helper 更直观。迁移后文件只有 35 行，读者可以快速确认它没有引入 live sibling startup 默认要求，也没有打开 runtime authority。

## Safety Boundary / 安全边界

第一层安全边界是字节级输出不变。临时测试从 `git show HEAD:<renderer>` 抽取旧实现，改写相对 import 到当前源码，再动态导入旧 renderer。测试使用当前 loader 生成真实 report，把同一份 report 同时传给旧 renderer 和新 renderer，最后用字符串完全相等断言。这样可以避开 `generatedAt` 时间字段造成的误差，因为两边用的是同一个对象；也能覆盖完整 Markdown，而不只是几个关键字段。

第二层安全边界是行为层不变。本版没有编辑测试期望，没有改 loader，没有改 fixture，没有改 ready/check 逻辑，也没有新增服务或 route。renderer 只是纯函数式地把已存在对象转成文本。即使 builder 被更多 renderer 复用，它也只处理字符串拼接、entries 展开、list 展示和空态文案，不包含网络、文件、时间、随机数或进程操作。这一点让重构可以被 focused tests 和 exact compare 充分覆盖。

第三层安全边界是抽象停止条件。v2128 没有新增 helper，因为这一批的新增重复并未达到必须抽象的程度。已经存在的 evidence-file helper 只处理同形 evidence reference；其他本地 lines 继续留在 renderer。这个选择避免了治理代码里常见的后期问题：为了统一而统一，最后得到一个参数很多、语义模糊、谁都能塞的万能 formatter。生产前治理项目需要的是稳定边界，而不是表面上的函数数量最少。

第四层安全边界是跨项目隔离。当前工作树里 Java / mini-kv playbook 有外部修改，但它们不属于 v2128 提交范围。Node 本版只 stage 自己的 renderer、归档、讲解和计划索引，不会回滚、覆盖或提交另两个项目计划文件。这样可以让其他会话继续推进自己的进度，同时避免 Node 提交混入跨项目协调文件的未审定改动。

第五层安全边界是清理规则。byte-identical compare 会创建 `.tmp/v2128-byte-identical-compare.test.ts` 和 `.tmp/v2128-legacy-renderers/*.ts`，build 会生成 `dist`。这些都是本版临时验证产物，提交前必须删除。没有启动 HTTP server、Playwright、Java、mini-kv 或后台 Node 进程，所以收尾时不需要保留任何进程。若后续版本进入 live smoke，才需要在计划中先写清启动端口、owner 和关闭动作。

## Test Coverage / 测试覆盖

本版已经完成三层本地验证。第一层是 `npm run typecheck`，确认六个 renderer 在 builder API 下类型成立，特别是 entries、list、lines 的 section 形状没有误用。第二层是 focused renderer batch，包括 `verificationReportBuilder.test.ts`、`governanceGrowthRatchet.test.ts` 以及六个 route catalog cleanup 相关测试，共 8 个测试文件、14 个断言。它们覆盖 builder helper、治理增长约束、report loader 的核心 ready/check 输出和相关报告入口。

第三层是临时 exact compare，这是本版最关键的重构保障。focused tests 通常只断言摘要、状态或少量内容，无法保证 Markdown 全文的空行、缩进、section 顺序完全不变。exact compare 直接比较旧 renderer 与新 renderer 输出，6/6 通过，说明这次迁移没有改变浏览器或 CLI 消费 Markdown endpoint 时看到的文本。对于 renderer consolidation，这类测试比新增大量脆弱快照更合适，因为它只在迁移期间存在，任务完成后删除，不会长期增加测试维护成本。

后续收尾还需要跑文档质量 gate、lint、build 和远端 CI。文档 gate 用来确认本篇中文讲解达到当前规则，不再出现旧式英文 walkthrough 标题或难读的大块模板；lint 预期保持既有 263 warnings 基线但 0 errors；build 用来兜底 TypeScript 输出与包结构。build 生成的 `dist` 和 exact compare 生成的 `.tmp` 都要在提交前删除。

这版没有跑全量 `npm test`，原因是用户已经明确不要求每版都做大批量 CI，本地策略改为 focused tests + exact compare + typecheck + lint + build，再交给远端 Node Evidence CI 做整体验证。考虑到之前大批量 Vitest 会启动大量 worker 并占用内存，这个分层验证更符合当前机器和项目规模：对改动面精准验证，对仓库整体用 CI 兜底，避免本地每个版本都耗费不必要的资源。

完成 v2128 后，下一步可以继续扫描剩余 non-archive renderer：优先寻找同族、同风险、能 exact compare 的批次，而不是机械按文件名推进。比较自然的方向包括其他 route catalog cleanup closeout/preflight 形状、controlled read-only shard preview 展示层，或继续压缩显著重复的 report renderer。每一版仍应先证明“为什么这些文件是一组”，再动代码；如果讲解无法自然写清楚，就说明切片可能太薄或混杂，需要重新分组。

## One-sentence Summary / 一句话总结

v2128 把 6 个 Java / mini-kv route catalog cleanup 相邻报告 renderer 迁移到共享 verification report builder，在复用 evidence-file helper、保留操作性本地 lines、保持 Markdown 逐字节一致的前提下，把这一带展示层重复继续压缩为更容易审查的结构。
