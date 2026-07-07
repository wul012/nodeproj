# v2169 说明：runtime execution chain renderer 标准化

v2169 继续执行 N1 renderer consolidation，把运行执行链上五个同步完整报告迁移到 `renderVerificationReportMarkdown`：artifact upstream progress intake、packet contribution review、packet approval gate review、live read gate、pass evidence closeout。本版只调整 Markdown 展示层实现，不改变 route、schema、loader、审批语义、历史证据读取或真实执行权限。`ApprovedLocalLoopbackReadOnlySmokeRenderer` 被故意排除，因为它属于异步 smoke 路径，应该作为后续单独版本处理。

本版迁移前后使用真实 loader、`ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`、固定 `generatedAt` 和归一化 JSON path/resolvedPath 做字节级对账。五份报告的规范化输出 SHA-256 分别为 `3b85b5941d0633f4e7977ef79a204c967ac6fb0258553aa43c1dbc8a806b8ca4`、`d8cd56d502aec03c7eb1108e9bb91ec1e8ed4bb0f0676f1a1377a3d640cc25a7`、`059338f940417812b8b953442bb58af32f41b7c1326a9bf60521ba8ae959c417`、`4efed60de898cf8119a2004cfbf20ea91effb287151cb019dc2d4bb457427ac8`、`ed617ddbdf85b6a3b0266e326cd94a29c0456b30d1e83f423f5baa3a9916231f`。这些断言覆盖长度、H1/H2/H3 数量和末尾换行，能捕捉空行、字段顺序、标题层级和路径归一化漂移。

验证已通过 focused gate、renderer census 和 typecheck。renderer census 从 200/245 标准化推进到 205/245，未标准化 renderer 从 45 降到 40，flatMap signal 从 33 降到 28，H3 和 for-loop signal 继续保持 0。Java 与 mini-kv 可以继续并行推进；本版不要求新鲜 sibling output，也不授予真实联合执行。
