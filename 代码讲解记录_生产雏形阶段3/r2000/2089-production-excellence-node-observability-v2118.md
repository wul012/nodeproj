# v2118 Node 生产卓越 N4 可观测性代码讲解

## Goal and Non-goal / 目标与非目标

v2118 的目标是把 Node 对两个上游系统的真实调用变成可观察、可测试、可在 CI 中冒烟的运行信号。这里的两个上游系统分别是 Java order-platform 和 mini-kv。此前项目里已经有很多 readiness、release evidence、audit、fixture、production boundary 文档，它们能说明“现在是否允许执行”“哪些证据存在”“哪些门仍然阻断”，但它们没有回答一个更偏运行态的问题：当 Node 真正通过 client 触碰上游时，最近发生了多少次请求、失败里哪些是普通错误、哪些是超时、延迟窗口处在什么水平。真实分片联合执行之前，这类信号很关键，因为操作者不能只看静态报告来判断系统状态。静态报告告诉我们开关是否关闭，metrics 则告诉我们实际调用有没有发生、调用路径是否抖动、失败是否集中在 timeout。N4 因此不是再增加一个治理 echo，而是给未来 shard preview、real-read rehearsal 和生产前排障准备一个直接的只读观测面。

非目标也很明确。本版本不启动 Java，不启动 mini-kv，不改变证据 schema，不授权任何 production execution，也不把 metrics 推到外部监控系统。它没有引入 Prometheus、OpenTelemetry 或新依赖，因为当前阶段更需要一个本地、低风险、可由测试直接覆盖的 JSON endpoint。`/api/v1/metrics` 的默认状态应该是空窗口：在 `UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false` 的 safe smoke 配置下，它只报告两个 client 的请求数为 0，不会为了生成指标而主动探测上游。这个边界很重要，因为观测不应成为新的副作用来源。N4 只记录已经发生的 client I/O，不主动制造 I/O。

## Entry Points / 入口

新的公开入口是 `src/app.ts` 中 inline 注册的 `GET /api/v1/metrics`。它只设置 `cache-control: no-store`，然后返回 `UpstreamMetricsRegistry.snapshot()`。它不读取配置、不访问上游、不遍历 audit log，也不把业务逻辑扩散到 route 层。这里刻意没有新增 `src/routes/metricsRoutes.ts`，因为完整 coverage 首轮发现新增 routes 文件会触发 v2114 governance growth ratchet。修正后的入口让 endpoint 的职责仍然稳定：app 只输出当前进程内 metrics registry 的快照，聚合逻辑在 client 边界的独立模块中，client 埋点仍在 client I/O 层。

`src/app.ts` 是连接入口。`buildApp` 创建一个 `UpstreamMetricsRegistry`，然后把同一个实例传给 `OrderPlatformClient` 和 `MiniKvClient`。这意味着两个 client 的所有调用都会进入同一个 registry，也避免每个 route 自己创建统计器造成数据割裂。`app.ts` 同时注册 `registerMetricsRoutes(app, { upstreamMetrics })`，使 metrics endpoint 和 app 生命周期绑定在一起。只要 app 实例存在，registry 就存在；app 关闭后，内存里的窗口自然释放。这符合当前 Node 服务的运行模型，也避免了文件持久化或外部状态带来的清理负担。

两个低层 I/O 入口分别是 `OrderPlatformClient.request` 和 `MiniKvClient.execute`。Java 侧所有 HTTP 调用都会经过 private `request` 方法，mini-kv 侧所有 TCP 命令都会经过 `execute` 方法。因此把埋点放在这两处，覆盖面比包 route 更完整。无论调用来自 order-platform route、operation preflight、evidence service，还是未来 shard preview，只要它复用这两个 client，就会记录 metrics。这个选择也减少了维护成本：以后新增上游 route 时，不需要记得再手写一段统计代码。

## Response Model / 响应模型

`UpstreamMetricsRegistry.snapshot()` 返回的是一个稳定 JSON 模型：`service` 固定为 `orderops-node`，`metricsVersion` 固定为 `upstream-metrics.v1`，`windowSize` 表示延迟环形窗口容量，`clients` 下有 `order-platform` 与 `mini-kv` 两个键。每个 client snapshot 包含 `requests`、`errors`、`timeouts` 和 `latencyMs`。`latencyMs` 里有 `count`、`p50`、`p95`、`p99`、`min`、`max`。如果没有样本，延迟字段里的百分位和边界值都是 `null`，count 为 0。这个空值模型比返回 0 更准确，因为“没有调用”与“调用延迟为 0ms”不是同一件事。

百分位计算采用 nearest-rank 规则。测试用 1 到 100 的样本锁住 p50=50、p95=95、p99=99，避免后续有人改成插值算法或数组下标近似时悄悄改变语义。窗口默认大小是 256，只保留最近的延迟样本，但 counters 不随窗口滚动回退。也就是说，`requests`、`errors`、`timeouts` 是进程生命周期内的累计计数，而 `latencyMs` 是最近窗口。这样的组合适合当前阶段：计数能说明这个进程是否触碰过上游，延迟窗口能说明最近状态，而不会让长期运行的进程无限积累样本数组。

错误计数的语义是“失败请求数”，超时计数是失败请求中的子类。也就是说 timeout 会同时增加 `errors` 和 `timeouts`。这比把 timeout 从 errors 中排除更适合排障，因为操作者看到 errors=5、timeouts=5 时可以判断全部失败都是超时；看到 errors=5、timeouts=1 时可以继续查 HTTP error、连接错误或协议错误。两个 client 的 timeout code 分别是 `ORDER_PLATFORM_TIMEOUT` 和 `MINIKV_TIMEOUT`，埋点时直接按这些 code 判断。

## Upstream Evidence and Config / 上游证据与配置

v2118 没有要求 Java 或 mini-kv 提供新文件，也没有改变 historical fixture 的读取方式。它观察的是 Node 自己发出的 client attempt，因此 Java/mini-kv 可以继续并行做自己的质量整治。这个判断也写入了本版 evidence：Java 和 mini-kv 都是 recommended parallel，Node 不等待新上游版本。这里需要区分“消费上游证据”和“观察上游调用”。前者可能需要冻结文件、schema、版本跨度和 fallback；后者只需要 Node 在发出调用时把结果记下来。N4 属于后者。

配置边界沿用现有安全开关。`UPSTREAM_PROBES_ENABLED=false` 时，读探测 route 会在进入 client 前被阻断；`UPSTREAM_ACTIONS_ENABLED=false` 时，动作 route 也会在进入 client 前被阻断。因此 safe smoke 下 `/api/v1/metrics` 不会因为访问 health 或 readiness endpoint 而产生上游计数。这个行为已经通过本地 HTTP smoke 和 CI metrics smoke 固化：在默认安全配置下，metrics endpoint 必须返回 `order-platform.requests=0` 和 `mini-kv.requests=0`。如果未来有人把 health、readiness 或 metrics route 改成会主动探测上游，CI smoke 会马上失败。

`src/services/accessPolicyProfile.ts` 也同步加入 `/api/v1/metrics` 的 readiness/viewer 策略。这里没有新增 `observability` routeGroup，因为当前 access policy 仍是 contract-only，且 metrics 是只读诊断入口，和 health、runtime config、security readiness 属于同一类最小读取面。新增一个权限分组会增加策略复杂度，却没有提供新的隔离收益。测试里补了两个断言：access policy profile 必须包含 `/api/v1/metrics`，access guard 对带 viewer 角色的 metrics 请求必须匹配 readiness 组。这样未来 access enforcement 真正打开时，metrics 不会因为 missing policy 被误杀，也不会落到 audit 或 upstream-proxy 这类错误权限组。

## Service Flow / 服务流程

`src/clients/upstreamMetrics.ts` 是这一版的核心。它定义了 `UpstreamMetricsRecorder` 接口、`UpstreamMetricsEvent` 输入模型、`UpstreamMetricsRegistry` 实现和 `summarizeLatency` 纯函数。client 只依赖 recorder 接口，不需要知道 registry 内部怎么存窗口；测试可以直接构造 registry，也可以传入默认 no-op recorder。这个接口切分避免了 client 与 app 强耦合。文件放在 `src/clients` 而不是 `src/services`，不是为了绕规则，而是因为它服务的正是 upstream client I/O 边界，并且项目已有 governance ratchet 明确要求 services 文件数不得增长。若以后需要把 metrics 导出到别的后端，也可以新增 recorder 实现或重组已有模块，但不能以放宽 ratchet 作为代价。

`OrderPlatformClient.request` 在一次 HTTP fetch 成功并且 response ok 后记录 `{ client: "order-platform", ok: true, timeout: false, latencyMs }`。如果 response 非 2xx，它仍然抛出原来的 `ORDER_PLATFORM_HTTP_ERROR`，但 catch 分支会按 AppHttpError 记录一次失败。AbortError 会被转换为 `ORDER_PLATFORM_TIMEOUT`，并记录 timeout=true。普通网络错误会转换为 `ORDER_PLATFORM_UNAVAILABLE`，记录为 error 但不是 timeout。这里的关键是不能重复记录：成功只在返回前记录，失败只在 catch 里记录。HTTP 非 2xx 虽然发生在 try 内部，但最终也走 catch 的 AppHttpError 分支，因此仍只记录一次。

`MiniKvClient.execute` 的模式稍有不同，因为它基于 TCP socket 和 Promise 手动 resolve/reject。v2118 在 `finishResolve` 中记录成功，并复用同一个 latencyMs 返回给调用者；在 `finishReject` 中记录失败，并根据 `MINIKV_TIMEOUT` 判断 timeout。`settled` 标记仍然保护重复完成，因此 socket 的 timeout、error、close 事件即使交错触发，也不会重复写 metrics。这个实现保持了原先的命令校验、socket timeout、连接关闭处理，只在完成边界增加观测事件。

`src/app.ts` 做了两处关联增强。第一处是创建 `UpstreamMetricsRegistry` 并注入两个 client；第二处是 request id correlation。Fastify 已经通过 `genReqId` 生成 request id，audit onResponse hook 也已经把 `request.id` 写入 auditLog。v2118 补齐的是错误响应：全局 error handler 现在会设置 `x-orderops-request-id` header，并在 JSON body 中返回 `requestId`。普通响应也在 onRequest hook 里写入同名 header。这样当 operator 看到一个错误响应时，可以直接拿 body/header 里的 requestId 去 audit events 查询同一次请求，而不用猜测时间窗口或路径。

## Safety Boundary / 安全边界

metrics endpoint 是只读的，但只读并不自动等于安全，所以本版设置了几条边界。第一，它不主动调用上游，只返回 registry 当前状态。第二，safe smoke 下必须保持两个上游计数为 0。第三，它被纳入 readiness/viewer 策略，而不是 upstream-proxy 策略，因为访问 metrics 本身不触碰 Java 或 mini-kv。第四，registry 是内存态，重启后清零，不参与审计持久化，也不改变已有 evidence 文件。第五，它没有把请求路径、payload、header 或 operator identity 放进 metrics，避免把诊断 endpoint 变成敏感数据出口。

本版本也没有引入外部依赖。对当前项目来说，这一点很实际：生产前治理阶段已经有大量归档、fixture、renderer 和 route surface，如果为了一个基础计数 endpoint 引入监控框架，会增加 CI、构建、运行时配置和安全审查成本。N4 的目标是先把核心观测语义放稳：两个 client、四类计数、三个百分位、一个窗口、一个 endpoint、一个 CI smoke。等真实执行链路进一步成熟，再考虑外部 metrics sink 才有意义。

request id correlation 也遵守边界。它没有改变 Fastify 的 id 生成方式，没有引入外部 trace id，也没有改变 auditLog 的存储格式。只是把已有 `request.id` 回显到错误响应和 header 中。对客户端来说，这是向后兼容的扩展字段；对 audit 来说，原有 requestId 字段继续保留。测试通过一次会触发 AppHttpError 的 action-plan 请求，确认错误 body/header 里的 requestId 与 audit events 记录一致。这个测试覆盖的是运行链路，而不是单纯检查字段存在。

从后续真实分片执行角度看，N4 的安全边界还承担一个“刹车提示”的作用。未来如果 Node 进入 shard preview 或 real-read 预演，最容易出现的问题不是某个静态证据缺文件，而是调用链已经被打开但 operator 不能快速判断打开到了什么程度。比如 Java 读探测是否真的发生、mini-kv key inventory 是否因为某个预览页被连续触发、失败到底是上游业务 4xx/5xx 还是连接超时，这些都不能靠归档目录肉眼判断。`/api/v1/metrics` 给出的不是授权结论，而是运行事实：某个进程生命周期里两个 client 是否实际发生过 I/O、失败是否累积、最近窗口延迟是否出现长尾。它不会替代 audit，因为 audit 负责逐请求、逐身份、逐路径的事件记录；它也不会替代 readiness，因为 readiness 负责门禁与证据完整性。它夹在两者之间，提供低成本、低敏感度、可以快速刷新观察的运行摘要。这个位置越清楚，后面越不容易为了排障再长出一批重复的“状态报告”。

这里没有把 metrics 做成持久化，也是有意的。生产前阶段的首要问题是“当前进程是否在按预期触碰上游”，而不是建立长期趋势库。持久化会引入保留周期、磁盘清理、隐私分级和跨进程聚合问题，超出了 N4 的风险预算。等真实执行需要长周期趋势时，可以把 `UpstreamMetricsRecorder` 作为扩展点接到外部 sink；现在保留内存窗口，则能让实现、测试、清理和 CI smoke 都足够直接。这样的切片也符合项目后期保养原则：先建立最小稳定核心，不提前把周边系统一起搬进来。

## Test Coverage / 测试覆盖

`test/upstreamMetrics.test.ts` 锁住纯计算。它验证 nearest-rank percentile，并验证 ring buffer 只保留最后 3 个样本，同时累计 request/error/timeout counters。这个测试很小，但价值很高，因为 percentile 算法一旦变动，endpoint 的运维语义就会变。比如 p95 是最近窗口第 95 个百分位，不应被随意改成平均值、最大值或插值。测试还覆盖空 client 的 null 延迟模型，避免无样本时误报 0ms。

`test/metricsRoutes.test.ts` 覆盖真实 route 与 client instrumentation。测试启动一个本地 HTTP server 模拟 Java replay readiness，再启动一个本地 TCP server 模拟 mini-kv `KEYSJSON` 响应，然后用 `buildApp` 指向这两个端口。在调用 `/api/v1/order-platform/failed-events/42/replay-readiness` 和 `/api/v1/mini-kv/keys?prefix=orderops` 后，测试读取 `/api/v1/metrics`，断言两个 client 的 requests 都从 0 变成 1，errors 和 timeouts 保持 0，延迟 count 都是 1。这证明 metrics 不是静态假数据，而是由真实 client I/O 触发。

同一个测试文件还覆盖 request id correlation。它调用一个会抛出 `ACTION_TARGET_MISMATCH` 的 action-plan 请求，断言错误响应 body 带 `requestId`，响应头 `x-orderops-request-id` 与 body 一致，并且 `/api/v1/audit/events?limit=1` 返回的最新 audit event 使用同一个 requestId。这个测试把 error handler、response header、audit onResponse hook 三段串起来，比只测其中一个函数更能防止未来回归。

access policy 和 access guard 的 focused tests 也被扩展。`test/accessPolicyProfile.test.ts` 要求 readiness-and-status 策略包含 `/api/v1/metrics`，Markdown 输出也必须出现该路径；`test/accessGuard.test.ts` 要求 viewer 访问 metrics 时匹配 readiness 组并通过 dry-run role evaluation。CI workflow 新增 Metrics smoke，在 dist server 的默认 safe config 下 curl `/api/v1/metrics`，并用 Node 脚本断言 `metricsVersion` 正确、两个上游 requests 都是 0、两个延迟窗口 count 都是 0。这样本版既有单元计算、真实 app 交互，也有生产构建后的 HTTP smoke。

## One-sentence Summary / 一句话总结

v2118 把 Node 对 Java 和 mini-kv 的真实 client 调用收敛为一个默认安全、可测试、可在 CI 冒烟的只读 metrics endpoint，并补齐错误响应到 audit event 的 request id 关联，为后续 shard preview 和真实分片联合执行准备了可操作的运行观测基础。
