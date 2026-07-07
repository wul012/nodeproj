# v2172 说明：renderer parity digest 归一化修复

v2172 是 v2171 远端 CI 的直接修复版。v2171 已经把路径、`resolved=` 文本行、entry 路径字段和 file-reference 的 `bytes/digest` 元数据集中到 `test/rendererMigrationParityUtils.ts`，但 GitHub Actions 在完整测试里仍然失败：`test/rendererMigrationV2170Parity.test.ts` 的 `packetStopRecord` 长度已经和本地一致，SHA-256 却不同。这类“长度相同、hash 不同”的信号说明差异不再是绝对路径长短，而是某些等长的 64 位十六进制摘要仍然进入了 parity 金标。

这次只扩展测试归一化边界：把 entry 渲染出的 `- xxxDigest: <64hex>` 统一替换为 `<digest>`。这类值来自本地证据文件、归档文件或 packet 文件的字节摘要，证明的是源材料的 checkout 状态，不证明 renderer builder 迁移是否保持 Markdown 布局。真正应该被 parity 锁住的内容仍然包括标题层级、section 顺序、字段是否存在、warning 文案、recommendation 文案、check 名称和 check 值；这些内容没有被新规则吞掉。

输入路径很窄：`rendererMigrationV2169Parity.test.ts` 和 `rendererMigrationV2170Parity.test.ts` 继续调用真实 loader 与真实 renderer，生成真实 Markdown 后才进入 `normalizeRendererMigrationMarkdown`。输出也很窄：测试只拿规范化后的 Markdown 计算长度、SHA-256、H1/H2/H3 数量和末尾换行。产品侧 route、schema、fixture、loader、renderer 文件全部不动，所以用户通过 HTTP 或归档看到的 Markdown 仍然包含真实 digest；被替换的只是迁移测试的比较表面。

本地已经完成两个必要门：`npx vitest run test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts --maxWorkers=2` 通过，`npm run typecheck` 通过。接下来还要补跑文档质量门、lint 和 build，推送后由 GitHub CI 重新跑完整 coverage。Java 和 mini-kv 可以继续并行推进；本版本不需要它们提供新证据，也不改变三项目接口。
