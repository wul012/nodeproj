# Node v2236：有序失败规则与历史证据投影收敛

本版不增加 route、schema、运行时连接或执行能力，只整理两类高维护成本结构。十九个 blocked-reason validator 原来各自用三元表达式过滤失败原因；现在由 `blockedReasonKernel.ts` 统一执行有序的 `[passes, failureReason]` 规则，领域文件仍拥有全部条件与错误码。Java v106/v107 reference 则通过 `mapSnippetFields` 声明命中值和缺失回退，并把身份条件与安全边界分组。

修改前先在固定时钟和 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 下冻结两份完整 profile。迁移后 Java v106 保持 38,343 字节和 SHA-256 `774add4d75f8222cfa72d57efa1087972eeb7ba49b89aa1320d6d27c53609aa9`，Java v107 保持 43,068 字节和 SHA-256 `f338d2f3b78afc8e3130a80bfcad8c975bb5ad395f4acfb570c2c70b4b2c72cc`。

维护性从 `70/71/188/0` 收紧到 `70/69/165/0`，含义依次为近限文件、长函数、复杂函数和导入环；九分目标 `70/70/170/0` 已通过。十九个 validator 的 744 条规则由二十个测试文件、九十三项测试覆盖；两条 reference 链另有十二项 focused/profile parity 测试。name debt 仍为 4,444，tracked family 仍为 52，未新增受管 family。

Java 与 mini-kv 可以继续并行，因为本版只读取仓库内冻结证据，不要求 sibling 服务启动或生成新文件。没有可渲染页面或新 HTTP surface，因此本版没有截图；这不是省略 UI 验证，而是该内部纯函数重构不存在适用的浏览器对象。
