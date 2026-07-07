# v2179 解释：minimal read-only / managed-audit-disabled renderer 迁移

v2179 是 N1 renderer consolidation 的第 54 批。v2178 远端 CI 已经通过，本版才继续改 renderer，避免在红 CI 上叠新功能。迁移范围是五个相邻报告：minimal read-only integration window readiness cut、smoke rerun archive、operator/CI regular gate handoff，以及 managed-audit-disabled read-only integration intake / decision record。

这五个 renderer 原来都在手写同一种 Markdown 骨架：标题、meta、若干证据 section、checks、summary、blocker、warning、recommendation、next action。它们的差别主要是领域行不同，例如 read-only requirement、target result、frozen contract、intake input、decision input。v2179 的做法是把共同骨架交给 `renderVerificationReportMarkdown`，同时保留这些领域 helper，避免把业务行压成过度通用的抽象。

本版没有改 route、schema、loader、fixture，也没有改 Java / mini-kv 仓库。它只改变 Node Markdown renderer 的内部实现；profile 数据仍由原来的 loader 生成，JSON 响应也不受影响。Java 和 mini-kv 可以继续并行推进，Node 本版不要求新鲜上游 evidence。

新增的 `test/rendererMigrationV2179Parity.test.ts` 固定 `generatedAt`，强制 historical fallback，并覆盖五个 renderer 的 normalized length、sha256、H1/H2/H3 数量和尾部换行。对应的本地业务回归也已跑过：新 parity 加五个原有业务测试共 6 个文件、16 个测试通过。

census ratchet 同步收紧：总 renderer 仍为 245，标准化 renderer 从 221 增至 226，未标准化 renderer 从 24 降到 19。负向门改为 `--max-unstandardized=18` 必须失败，错误文案为 `Renderer census regression: 19 exceeds --max-unstandardized=18.`。这让 N1 进度成为机械门，而不是进度表自述。

下一批建议优先处理 sandbox handle review 家族的 prerequisite intake、closure review、packet gate intake/decision、contract decision。它们在剩余 19 个 renderer 中结构最相近，适合作为 v2180 的中等批次；更早期的 approval/candidate gate 或 endpoint credential resolver 可以放在后续批次，避免一个版本跨太多语义家族。

