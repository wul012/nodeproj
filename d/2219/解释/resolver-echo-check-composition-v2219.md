# Node v2219 归档说明

## 改造目标

本版不增加任何功能，只治理维护性基线中复杂度排名第一和第二的两个 `createChecks`。
原实现分别用 156 行连续 `&&` 同时表达模式、计数、字段集合和副作用边界；结果虽然正确，
但审查者很难确认某个新增字段究竟属于凭据、端点、连接、写入还是自动启动边界。

## 代码入口与模型

稳定入口仍是
`src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.ts`
和
`src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.ts`。
本版只修改两个内部 checks 模块，并复用
`src/services/liveProbeReportUtils.ts` 的 `allBooleanFieldsAre`。checks 的 19/20 个键、键顺序、
blocker code/source/message、summary、profile 状态、JSON 与 Markdown 均未改变。

字段清单只描述同一对象上应全部为 true 或 false 的布尔事实，并由泛型 `keyof` 约束字段名；
计数、数组顺序、模式、版本和跨对象相等关系仍由具名函数表达。这样不会把全部逻辑伪装成
匿名 `every(Boolean)`，也不会失去“为什么这几条条件属于同一边界”的领域名称。

## 服务流程与失败关闭

loader 仍按原顺序加载 Node、Java 与 mini-kv 历史证据，再调用 `createChecks`。组合根按旧键序
调用 `isDisabledPrecheckAligned`、`hasAlignedRequiredEnvHandles`、
`isCredentialBoundaryClosed` 等谓词。共享 helper 会拒绝空清单、重复字段和 nullable 缺失值；
因此字段规格写错不会静默通过。任一凭据读取、原始 endpoint 解析、外部连接、写入或自动启动
字段变成 true，对应边界 check 都会变成 false，原 blocker 流程随即把 profile 置为 blocked。

## 等价证据

`test/resolverEchoParity.test.ts` 在源码改动前先通过，然后在改动后再次通过。测试固定
`generatedAt=2026-07-21T00:00:00.000Z` 并强制 historical fixture fallback：disabled-precheck
JSON/Markdown 保持 38,343/9,367 字节及原 SHA-256；test-only-shell 保持
43,068/10,582 字节及原 SHA-256。原业务、fallback、负向配置和 HTTP route 测试合计
3 个文件、12 项测试通过。

维护性账本从 85 / 103 / 226 / 0 收紧为 85 / 101 / 224 / 0。两个改动文件中均已没有
超 120 行或复杂度超 20 的函数，说明复杂度没有被搬到新的隐藏热点。

## 安全与并行边界

本版没有修改 fixture、路由、renderer、运行配置或执行权限，没有读取真实凭据，没有发起
外部请求，也没有启动 Java/mini-kv。Node 只消费仓库内冻结证据；Java 当前 v1881 工作和
mini-kv 的用户文档改动均保持原样，两项目可以独立并行。由于没有 HTML/UI 或可视页面变化，
本版不创建图片目录，避免用空目录暗示不存在的截图证据。

## 停止条件

当固定字节 oracle、原有 focused tests、typecheck、零警告 lint、静态门、维护性 ratchet 和
中文讲解门全部通过后，本版停止。下一版只处理 disabled candidate 的第三高复杂度策略，
不在 v2219 顺手扩展新功能或继续复制字段清单。
