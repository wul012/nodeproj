# v2234 manual connection verification ownership 说明

本版将 packet verification 与 preflight verification 的 Markdown 表达迁入
`verificationReports/manualConnection.ts`，并继续拆出历史证据读取与固定操作建议。两个原服务只保留 profile、digest、领域 acceptance checks 和 blocker 判定。

迁移前先在 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 与固定时间下冻结完整输出。packet 为 11,099 字节，SHA-256 为
`876df6e9...da7feb49`；preflight 为 13,344 字节，SHA-256 为 `b00d1a28...1801d77`。迁移后两项完全一致，测试还断言兄弟证据实际解析到 `fixtures/historical/sibling-workspaces/`。

verification family logic 从 1,146 降至 980。packet 服务从 733 行降至 535 行，preflight 服务从 778 行降至 576 行，近限文件从 73 降至 71；name debt 保持 4,444，long/complex 保持 72/193，导入环为零。基线仅删除两个 stale 近限项，没有放宽阈值。

相关 4 个测试文件共 19 项通过，typecheck、全量零告警 lint、elegance、family 与 maintainability 门通过。JSON、route、权限、fixture、网络、写路径和执行能力均未改变。本版无 UI，截图不适用；Java 与 mini-kv 可继续并行。
