# Node v2215 归档说明

## 改造目标

v2215 处理两套凭据解析器上游回声策略。旧实现把几十个安全布尔量连续写进
`createChecks`，虽然判断正确，却让“检查哪些字段”“字段属于哪个证据对象”“哪些条件
是真正的领域语义”混在同一层。两个入口都达到 230 行，复杂度分别为 160 和 152；
维护者很难确认新收据字段是否遗漏，也很难在审查时区分机械边界和版本语义。

本版新增 `credentialPolicy` 内部目录，用两个只读字段清单保存稳定布尔边界；共享
`allBooleanFieldsAre` 只负责执行类型安全的严格相等判断。版本、摘要、计数、文本和数组
顺序仍由原 policy 显式判断，没有被塞进通用规则语言。

## 可空证据语义

mini-kv 历史收据字段多数为 `boolean | null`。`null` 表示证据缺失或没有被解析，绝不等于
安全的 false。`BooleanFieldKey` 只接受布尔或可空布尔属性，helper 用 `=== expected`
比较，所以 `null` 会失败。空清单和重复字段同样失败：前者阻止“没有规则却通过”，后者
阻止用重复项掩盖漏项。不存在的字段在 TypeScript 编译阶段被拒绝。

## 组合结构

disabled harness policy 现在由 32 行组合根连接 source checks、contract alignment 与
boundary checks；implementation-plan policy 的组合根为 27 行。领域谓词被拆成可命名、
可单独阅读的小函数，最大替代函数 57 行、复杂度 13。profile 对象仍按旧顺序展开各组
字段，因此 JSON 键顺序、Markdown 顺序和 blocker 顺序不变。

`collectProductionBlockers` 复用既有 `collectFailedReportRules`，规则数组仍留在原 policy，
所以失败代码、来源、消息和先后关系均可在一处审阅；只是删除了两份相同的 filter/map
尾部。该调整还使 implementation-plan blocker collector 从 128 行降到 118 行。

## 机械证据

强制历史回退并固定 `generatedAt=2026-07-21T00:00:00.000Z` 后，disabled harness
保持 29/29 checks、JSON 32,490 bytes、Markdown 9,456 bytes；implementation plan
保持 28/28 checks、JSON 29,872 bytes、Markdown 8,182 bytes。四个 SHA-256 与改造前
oracle 完全一致。focused 共 3 文件 14 测试通过，包含 ready、probes/actions blocked、
历史 fixture fallback、真实 Fastify route 以及 helper 的空/重复/nullable 反例。

维护账本由 85/110/228/0 收紧到 85/107/226/0，只删除扫描器认定 stale 的 3 条长函数
与 2 条复杂函数记录；没有 unknown、grown 或新环。最终版本门在文档完成后执行。

## 安全和并行边界

本版不改 fixture、profile 类型、路由、schema、access guard、配置默认值、网络客户
端、写路径或执行许可。Java 和 mini-kv 只提供冻结历史输入，工作树未被 Node 修改，
两项目可以独立并行。没有 HTML/UI 变化，因此不创建截图目录。
