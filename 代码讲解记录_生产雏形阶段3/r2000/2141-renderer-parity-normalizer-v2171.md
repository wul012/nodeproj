# v2171 代码讲解：renderer parity normalizer CI 修复

## 问题背景

v2170 迁移了四个 operator lifecycle 与 declared runtime lifecycle renderer，局部测试、typecheck、lint 和 build 都通过，但 GitHub CI 在完整 coverage 阶段失败。失败不是某个 route 变成 500，也不是业务断言变了，而是 `rendererMigrationV2170Parity.test.ts` 的第一个 case `operatorServiceLifecycle` 长度断言失败：本地期望 13748，Linux runner 得到 13778。这个差 30 字符的信号很关键，因为它说明输出并不是大段内容错乱，而是某个路径或元数据字段在不同平台上长度不同。

上一版已经修过两类漂移。第一类是 JSON 字段里的 `path` 和 `resolvedPath`，Windows 会出现反斜杠和本地盘符，Linux runner 会出现 `/home/runner/work/...`。第二类是 JSON file-reference 的 `sizeBytes` 和 `digest`，因为归档文本在不同 checkout 环境下可能有不同换行字节，摘要也会不同。v2170 的失败证明还存在第三类：renderer 有些历史证据文件不是 JSON 对象输出，而是普通 Markdown 行，例如 `bytes=...; digest=...; resolved=...`。这类行没有被 v2170 normalizer 覆盖，所以 Linux 上的 resolved 路径直接进入 hash。

## 修复目标

本版目标不是“让测试随便过”，而是把 parity 测试的非业务差异边界建成可复用工具。renderer migration parity 的职责，是证明手写 Markdown 拼装迁移到 `renderVerificationReportMarkdown` 后，报告结构、字段顺序、业务字段、空行和标题层级没有变化。它不应该把当前机器的绝对路径长度、Git checkout 换行字节、或者本地 sibling workspace 盘符纳入业务金标。换句话说，测试应该锁住报告语义，不应该锁住运行环境。

同时，normalizer 不能过宽。它不能吞掉 warning 文案，不能吞掉 blocker，不能改 checks 的 true/false，不能改 summary 数字，也不能忽略 section 顺序。只要这些内容变化，长度或 SHA-256 仍然必须失败。v2171 的实现把可归一化内容限制在 generatedAt、路径展示字段和 file-reference 字节元数据三类，这三类都属于测试环境差异，而不是 renderer 业务行为。

## 新工具文件

新增的 `test/rendererMigrationParityUtils.ts` 暴露两个函数：`sha256` 和 `normalizeRendererMigrationMarkdown`。`sha256` 只是原来各 parity 测试里重复写的 `createHash("sha256")` 包装，抽出来的价值是让测试文件专注描述 case，而不是每一版重复工具函数。`normalizeRendererMigrationMarkdown` 接收 Markdown 字符串和固定 `generatedAt`，按固定顺序做归一化。

第一步替换 `Generated at: ...`。这是所有 renderer parity 测试的基础，因为 loader 或 route 可能给报告生成当前时间；固定时间能让 hash 可复现。第二步处理 JSON `path` 和 `resolvedPath` 字段，这保留了 v2168/v2169 修复的经验。第三步处理文本 `resolved=...`，这正是 v2170 CI 红的直接原因。第四步处理 entry 渲染出来的 `path`、`resolvedPath`、`configuredPath` 和 `historicalFallbackPath`。这些字段常来自 `renderEntries`，外观看起来是普通 bullet，但本质上仍是路径展示。第五步处理 `Hardening file`、`Resolved hardening path` 和 `Source core file`，这是 v2171 后续 shard-readiness renderer 会遇到的路径形态，提前纳入工具可以避免下一版再复制一套 ad hoc 规则。最后处理 JSON 和文本 file-reference 的 bytes/digest 元数据。

## Service Flow / 服务流向

这次修复涉及的服务流向可以分成三层。第一层是真实业务流：loader 从历史 fixture、本地归档或 sibling evidence 中构造 profile，renderer 把 profile 渲染成 Markdown，route 再把 JSON 或 Markdown 暴露给审计端。v2171 完全不碰这一层，所有 loader、renderer、route 的输入输出仍按 v2170 的实现运行。换句话说，用户实际请求 `/api/v1/audit/...operator-service-lifecycle...` 时看到的 Markdown 仍然包含完整的 evidence file 行，里面有真实 `bytes`、`digest` 和 `resolved` 路径；这些字段没有在产品输出里被隐藏。

第二层是测试比较流。renderer migration parity 测试不会通过 HTTP route，而是直接调用真实 loader 和真实 renderer，拿到一份 Markdown 字符串。这个字符串先进入 `normalizeRendererMigrationMarkdown`，把时间、路径展示和 file-reference 本地字节元数据替换成稳定占位，然后才计算长度、SHA-256、H1/H2/H3 数量和末尾换行。这里的关键点是“先保留真实生成，再缩小比较面”，而不是在 loader 或 renderer 里提前造一个测试专用 profile。这样做能保证 parity 测试仍覆盖真实资料结构，只是不让环境差异干扰 hash。

第三层是 CI 反馈流。GitHub runner 执行 `npm run test:coverage`，完整测试集中包含 v2169 和 v2170 parity。v2170 失败后，本地复现不到长度差，因为 Windows checkout 的 resolved 路径和 Linux runner 不一样。v2171 把这个差异归入共享 normalizer 后，下一次 CI 会重新跑完整 coverage。如果这次仍失败，失败信息就应该指向新的未覆盖路径形态或真正的业务变化；如果通过，就说明原失败确实是测试比较面过窄。这个流向让修复具备可证伪性，而不是只靠本地猜测。

从维护角度看，服务流向还决定了为什么工具必须放在 `test/` 下。它不是运行时代码，不能被产品 route import，也不能成为 renderer 输出的一部分。它只服务于 migration parity 的断言面。未来如果 N1 结束后进入 N5 文件拆分或 integration capstone，这个工具也不应该被业务层复用；它的名字包含 `MigrationParity`，就是为了提醒维护者它只处理迁移测试，不是通用 Markdown 清洗器。

## 输入输出例子

以 v2170 的 operator service lifecycle 报告为例，真实 renderer 输出里会有一行 `java-v160-operator-service-lifecycle: exists=true; fallback=true; bytes=2221; digest=...; resolved=D:\nodeproj\...fixtures\historical...`。在 Windows 本地，这行包含盘符和反斜杠；在 Linux runner，它会变成 `/home/runner/work/nodeproj/nodeproj/fixtures/...`。两者都说明同一件事：报告使用了 Node 仓库内的历史 fallback 文件。但如果直接 hash，两条路径长度不同，测试会红。

进入 `normalizeRendererMigrationMarkdown` 后，这行会变成稳定形态：`bytes=<bytes>; digest=<sha256>; resolved=<repo>/fixtures/historical/...`。这时 hash 仍然能捕捉 `exists`、`fallback`、文件 id、section 位置和行顺序；如果 renderer 把 Evidence Files 移到别的 section，或者删掉 `fallback=true`，测试依旧会失败。被抽象掉的只有本地文件字节元数据和绝对路径前缀，它们不是 renderer migration 的业务判断依据。

再以后续 v2172 候选的 shard readiness consumption 为例，输出里会有 `Hardening file: D:/javaproj/...` 和 `Resolved hardening path: D:\nodeproj\...fixtures...`。这不是 `resolved=` 格式，也不是 JSON 字段。如果每个 parity 测试单独写 regex，很容易漏掉。v2171 已经把这类标签纳入工具，后续迁移只需要说明为什么这些字段属于环境展示，不需要再把同一组规则复制一遍。这样可以减少 CI 往返，也让 reviewer 更容易审查测试边界。

## 路径归一化规则

`normalizePathValue` 先把反斜杠统一成 `/`，再折叠连续斜杠。随后按三类项目根做稳定占位：包含 `/fixtures/` 的路径折叠成 `<repo>/fixtures/...`，包含 `/advanced-order-platform/` 的路径折叠成 `<java>/...`，包含 `/mini-kv/` 的路径折叠成 `<mini-kv>/...`。如果值是 `not-applicable`，原样保留，因为它不是路径，也不应该被改写。

这个顺序有意把 repo fixture 放在 Java/mini-kv marker 前面。历史 fixture 路径里经常同时包含 `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/...`，如果先匹配 Java marker，就会把 repo 内历史 fixture 误认为真实 Java workspace。优先匹配 `/fixtures/` 可以保留“这是 Node 仓库内冻结证据”的事实，也能让 reviewer 看到报告消费的是 fallback，而不是现场读取 sibling repo。

## file-reference 元数据

file-reference 的 `bytes`、`sizeBytes` 和 `digest` 是最容易误判的部分。它们看起来像业务证据，但在 parity 测试里，它们是当前 checkout 字节状态的产物。对于 renderer migration 来说，真正需要证明的是“迁移前后同一个 profile 以同样格式展示 file-reference”，不是证明 Windows 和 Linux 对归档文本换行的字节摘要相同。v2171 因此只在 parity normalizer 中把这些元数据替换为 `<bytes>` 和 `<sha256>`，并且只匹配 file-reference 形态：JSON 中必须紧邻 `exists/sizeBytes/digest`，文本中必须是 `bytes=...; digest=...`。

这个限制避免吞掉普通业务 digest。比如 intakeDigest、archiveVerificationDigest、consumptionDigest 等字段仍然会进入 hash。如果后续某个 loader 真的改变了业务 digest，parity 测试仍会失败。只有“文件引用自身的本地字节元数据”会被抽象掉，因为它的跨平台变化不代表 renderer 迁移破坏了 Markdown。

## 测试文件变化

`rendererMigrationV2169Parity.test.ts` 删除了本地 `sha256`、`normalizeMarkdown` 和 `normalizePathValue`，改为导入共享工具。v2169 的五个 case 金标没有变化，说明新工具完全覆盖旧行为，没有改变已经修好的 JSON 路径和 file-reference 归一化结果。这个点很重要，因为它证明抽工具不是重写测试口径，而是把既有口径集中。

`rendererMigrationV2170Parity.test.ts` 同样删除本地工具函数，并更新四个 expected。更新后的 expected 是在相同真实 loader、相同 fallback 环境、相同 generatedAt 下，对普通文本路径和 file-reference 元数据归一化后的结果。四个 case 的 H1/H2/H3 数量不变，末尾换行断言不变，说明迁移后的报告层级结构没有被 normalizer 放松。它只改变长度和 hash 的环境差异面。

## 为什么不改 renderer

这次不应该改 renderer。renderer 当前输出的 resolved 路径和 file-reference 元数据是历史报告的一部分，产品侧是否展示这些字段是已有行为。CI 红的是 parity 测试把这些环境相关字段当成跨平台金标，而不是 renderer 输出错误。如果为了让测试过而把 renderer 里的路径隐藏掉，反而会改变用户可见 Markdown，并破坏“renderer migration byte-identical”的主线。

也不应该改 fixture。fixture 是历史证据，改 fixture 来改变 digest 或路径表现，会让测试通过但污染证据来源。v2171 的修复点放在测试工具层，正好卡住正确边界：真实输出仍然包含完整路径和 file-reference 元数据；只有 parity hash 的比较面把不可跨平台稳定的部分替换成占位。

## 对后续 v2172 的价值

只修 v2170 CI 当然可以写一两个正则了事，但那会把同类问题留给下一批。只读准备已经显示，下一批 shard-readiness/active-shard/live-read-plan renderer 也大量使用 `resolved=...`、`Hardening file`、`Resolved hardening path` 和 `Source core file`。如果没有共享工具，v2172 很可能再次在 Linux runner 上失败。v2171 把这些形态一次性纳入工具，让后续 renderer migration 可以直接复用同一套金标策略。

这也是维护价值所在：parity 测试越多，重复 normalizer 越危险。不同版本各自复制一套规则，会造成“某版修了路径，下一版忘了 file metadata；某版修了 JSON，下一版忘了文本行”的循环。共享工具让规则集中、变更可审查，也让 reviewer 看到哪些字段被允许归一化，哪些字段绝对不能动。

更具体地说，后续 reviewer 只需要审查一个工具文件，就能判断某次 parity hash 更新是否合理。若新 renderer 失败原因是 `Resolved hardening path`，应该扩展共享工具；若失败原因是 `summary.passedCheckCount`、`productionBlockerCount` 或 warning 文案变化，就不应该扩展 normalizer，而应该回到 renderer 或 loader diff。这个判断边界被写进工具后，迁移批次就不会因为每个测试作者的临时正则而漂移。

它也让版本切片更厚实。v2172 可以把精力放在五个 shard readiness renderer 的 builder 映射、局部 helper 保留和真实 route 测试上，而不是再次处理 CI runner 路径差异。一次 CI repair 如果只修当前失败，工程价值很薄；把失败归纳成共享测试基础设施，才符合后期治理阶段的维护需求。

## 验证方式

本版先跑 `npx vitest run test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts --maxWorkers=2`，两个 parity 测试通过，说明共享工具没有破坏旧版 v2169，也修住了 v2170 的新金标。随后跑 `npm run typecheck`，确认新增测试工具和两个测试文件的 TypeScript 引用没有问题。后续还需要补跑文档质量、lint、build，并推送让 GitHub CI 执行完整 coverage。只有远端 CI 绿，才说明 v2170 的 Linux runner 漂移真正被修住。

本地验证不能替代远端 CI，因为这次问题恰恰来自 Linux runner 与 Windows 工作树的差异。本地通过只能证明工具在当前 checkout 下没有破坏金标；远端通过才能证明新增的文本路径和 file-reference 归一化覆盖了 Linux 形态。因此 v2171 的证据链必须同时记录本地 focused gate 和推送后的 CI 结论。若远端仍红，下一步仍然是先看失败字段，不允许直接把更多正文纳入模糊替换。

文档质量门也属于这次验证的一部分。因为本版是测试基础设施修复，代码量不大，讲解必须把问题机理、输入输出、服务流向和安全边界讲清楚，不能用短说明冒充版本交付。讲解达标后，后续维护者才能从文档里复盘为什么 normalizer 存在、为什么它不属于产品层、为什么它不能无边界扩大。

## 边界总结

v2171 的本质是把 renderer migration parity 从“每个测试各自理解跨平台差异”升级为“一个共享工具统一定义跨平台差异”。它不改变产品行为，不降低业务断言，不移动 fixture，不改 route。它只让测试比较它应该比较的东西：标题、section、字段顺序、业务值、空行、H1/H2/H3 层级和末尾换行。路径展示和 file-reference 本地字节元数据仍在真实 Markdown 中存在，但不再让 Windows 与 Linux 的环境差异破坏迁移证明。
