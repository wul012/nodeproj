# v2180 解释：sandbox handle review renderer 迁移

v2180 是 N1 renderer consolidation 的第 55 批。v2179 远端 CI 已经通过，本版才继续改代码。迁移范围是 sandbox handle review 链上的五个非 archive renderer：prerequisite intake、contract decision、packet/gate non-secret intake、packet/gate decision record、prerequisite closure review。

这五个 renderer 原来都手写 Markdown 数组，并混用 `liveProbeReportUtils` 的 entries/messages/list helper。v2180 把标题、meta、section、message、next action 的共同骨架迁到 `renderVerificationReportMarkdown`，同时保留本地领域 helper：prerequisite input、closed scope、contract input、contract section、packet input、gate output、stop condition、decision input、closure item。这样既减少重复骨架，又不把业务证据行压平。

本版没有改 route、loader、schema、fixture、Java 或 mini-kv。所有 profile 判定仍由原服务完成，renderer 只负责排版。Java / mini-kv 可继续并行推进，Node v2180 不要求新上游证据。

新增 `test/rendererMigrationV2180Parity.test.ts` 固定 `generatedAt`，强制 historical fallback，并锁定五个 renderer 的 normalized length、sha256、H1/H2/H3 数量和尾部换行。focused 回归加原业务测试共 6 个文件、16 个测试通过；历史 renderer migration 回归共 9 个文件、10 个测试通过。

census ratchet 从 226/245 标准化推进到 231/245，未标准化 renderer 从 19 降到 14。负向门改为 `--max-unstandardized=13` 必须失败，错误文案为 `Renderer census regression: 14 exceeds --max-unstandardized=13.`。

下一批建议优先处理 sandbox endpoint credential resolver 三个 renderer，加上 `managedAuditManualSandboxConnectionReadinessGateRenderer.ts`。剩余的 controlled profile section renderer 更像组合片段，后续需要判断是迁 builder、并入父 renderer，还是登记 waiver。
