# v2187 N5 源文件体积治理基础

本版在 N1 获得外部 PASS 后正式进入 N5。新鲜 census 发现 `src/` 中不是历史记录的
5 个，而是 16 个文件超过 800 行。v2187 不隐藏偏差，也不创建宽泛豁免，而是建立
全仓扫描脚本、收缩 baseline 和三类负向测试，并先拆分六个边界清晰的文件。

六个主文件分别降至 594 至 741 行，新模块为 173 至 300 行。公开类型归入
`src/contracts/`，不可变 Java/mini-kv 证据归入 `src/evidence/`，因此既改善所有权，
也不增长 service-chain 文件数。原 loader、checks、renderer、路由及公开导入路径
保持不变。census 因而从 16 收缩到 10，且不存在新增超限或行数增长。

首次 N5 push 的特殊入口门也已执行：候选差异应用到独立
`core.autocrlf=false` worktree，完整 renderer migration parity 共 11 文件/15 测试
全部通过。Java 与 mini-kv 可继续并行，本版没有启动、停止、构建或修改它们。
