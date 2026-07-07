# v2177 说明：修复 renderer parity 的 Markdown 路径标签归一化

v2177 是 v2176 的 CI 修复版，不是功能版。v2176 已经把三个 shard/readiness renderer 迁移到 `renderVerificationReportMarkdown`，本地 focused、文档门、lint、build 和分片全量测试都通过；但 GitHub Actions 在 `test:coverage` 的 Test 步骤中暴露了一个 Linux-runner-only parity 差异：`shardReadinessContractConsumerGate` 的 normalized length 本地期望为 7243，CI 实际为 7263。

定位后确认差异来自测试比较面，而不是产品 renderer。`rendererMigrationParityUtils` 已经能归一化 JSON 里的 `path` / `resolvedPath`，也能归一化一些 lower-case Markdown path 标签；但 v2176 的 contract consumer gate 输出里还有 `- Evidence file:` 和 `- Resolved path:` 这种大写、带空格的 Markdown 标签。它们携带本地 Windows 路径或 GitHub Linux runner 路径，进入 hash 后造成长度漂移。

本版只扩展 normalizer 的路径标签覆盖，把 `Evidence file`、`Resolved path`、`Historical fallback path` 交给同一个 `normalizePathValue(...)` 处理。随后更新受影响的 v2176 parity 指纹：`shardReadinessContractConsumerGate` 的稳定比较长度变为 7170，SHA-256 变为 `511043dda77864007d4c1f8e8828bbba59c7b6b1412af14bd97e485acf3a71c1`。其他四个 v2176 parity case 指纹保持不变。

验证已完成两层：迁移回归组 `v2167/v2168/v2169/v2170/v2175/v2176` 全部通过；同一个 v2176 parity 文件也在 v8 coverage instrumentation 下通过，coverage 阈值只在 focused 复现命令中临时设为 0，因为该命令不是完整覆盖率门。后续仍以 GitHub Actions 的完整 `test:coverage` 作为最终远端证据。
