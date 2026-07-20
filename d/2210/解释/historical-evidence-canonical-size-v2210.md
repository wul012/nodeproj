# Node v2210 归档说明

v2210 修复历史文本证据元数据的跨平台不一致。共享 `evidenceFile` 早已在计算 SHA-256 前去除 UTF-8 BOM，并把 CRLF、CR 统一为 LF；但 `sizeBytes` 仍来自原始文件的 `stat.size`。因此同一语义内容会出现“digest 相同、sizeBytes 不同”，并进一步改变整个只读报告的稳定摘要。

GitHub run 29731349784 在 v2209 通过 typecheck、lint 和全部静态门后，只失败 JSON/Markdown hash，长度断言仍通过。本地把 Java v115 `OpsEvidenceService.java` 的大小从 Windows 工作树 55,853 改为 Git blob 55,243，并把 mini-kv v121 runbook 从 1,284 改为 blob 1,283，能够逐字命中 CI 的两个摘要，证明差异来自 raw checkout 字节而不是字段、策略或 renderer。进一步规范化后，mini-kv 文本为 1,280 字节；这才与 digest 实际使用的字节流一致。

实现让 `sizeBytes` 与 digest 一同从去 BOM、LF 化后的 UTF-8 内容派生。直接测试使用临时 LF、CRLF、混合换行、BOM 和缺失文件，修复前精确得到 2 failed / 1 passed，修复后 utility/resolver、v2207-v2209 三代预言机以及全部 size/archive/parity 重点测试通过。v2209 的最终规范输出仍为 JSON 38,431 字节、Markdown 37,992 字节，摘要更新为 `fe1823...bfade` 与 `6f29d6...dca1c8`；v2207、v2208 不变。

本版本不改 fixture、resolver mapping、snippet、JSON 解析、路由或安全决定。Java 已推送 v1875 并独立推进 v1876，mini-kv 已推送 v1673 并独立推进 v1674；Node 只读核对其版本状态，未修改两个工作树。全量测试 8/8 分片通过，合计 569 个文件、1,737 个用例；独立 discovery 得到相同清单。构建通过；强制历史回退的受控 HTTP smoke 得到 health 200/93 字节、JSON 200/40,003 字节、Markdown 200/39,564 字节，目标报告 26/26 检查通过，同时 executionAllowed 与 connectsManagedAudit 均为 false。精确 smoke PID 20428 已停止，31210 端口已释放。没有 HTML/UI 变化，因此不生成截图。
