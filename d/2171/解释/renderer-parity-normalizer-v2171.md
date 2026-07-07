# v2171 说明：renderer parity normalizer CI 修复

v2171 是 v2170 红 CI 的直接修复版，不改变任何产品 renderer、loader、route、schema 或 fixture。失败点是 `test/rendererMigrationV2170Parity.test.ts` 在 GitHub Linux runner 上计算 `operatorServiceLifecycle` 的规范化 Markdown 长度为 13778，而本地金标是 13748。进一步对照输出后确认，差异不是业务字段变化，而是 v2170 normalizer 只处理了 JSON `path`/`resolvedPath` 和 JSON file-reference 元数据，却没有处理普通文本行里的 `resolved=...` 路径。

本版新增 `test/rendererMigrationParityUtils.ts`，把 renderer migration parity 的跨平台归一化集中到一个工具里。它统一处理固定 `generatedAt`、JSON `path/resolvedPath`、文本 `resolved=...`、entry 渲染出的 `path/resolvedPath/configuredPath/historicalFallbackPath`、shard readiness 的 `Hardening file / Resolved hardening path / Source core file`，以及 file-reference 的 `bytes/digest` 或 `sizeBytes/digest` 元数据。归一化边界仍然很窄：message、warning、recommendation、summary、checks、section 顺序和正文内容都不会被吞掉。

`rendererMigrationV2169Parity.test.ts` 和 `rendererMigrationV2170Parity.test.ts` 都改为使用共享工具。v2169 的金标没有变化；v2170 的四个金标改为路径和 file-reference 元数据归一化后的稳定值：operator service lifecycle `13532/f9d7a064...`，declared operator lifecycle `12830/ec84b73c...`，packet stop record `11736/3177e8f5...`，artifact intake preflight `12966/9be09674...`。这不是放宽测试，而是把操作系统路径和 checkout 字节元数据从金标中剥离，让 hash 继续锁定真实 Markdown 结构和业务字段。

已通过 focused parity 和 typecheck。文档质量、lint、build 与远端 CI 仍作为收尾门；推送后 GitHub CI 是完整 coverage 的采信门。Java 与 mini-kv 可继续并行推进，本版只修 Node 测试基础设施，不要求任何新鲜 sibling output。
