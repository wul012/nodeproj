# v2162 controlled read-only execution readiness renderer

## 目标

v2162 迁移 `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessRenderer.ts`。它不是 route section 片段，而是 3 份完整 Markdown 文档：execution gap matrix、live read-only packet candidate、candidate verification。因此本版没有使用前几版的 `renderProfileEntrySections`，而是改用 `renderVerificationReportMarkdown`，并显式控制 section 内空行和尾部换行。

## 输入与输出

- 输入仍是 execution readiness artifact builders 生成的 matrix、candidate、verification 对象。
- 输出仍是 3 个完整 Markdown string。
- execution gap matrix hash 保持 `52e60c2197a3b606a9f9d1b453b87213a41b66a2469cf69796b8ffca47937626`，长度 3209。
- live read-only packet candidate hash 保持 `8175275766aa9c72c4109917005ac5d2c6fd1d7cf06d1f4fd6bb79630220449e`，长度 2682。
- candidate verification hash 保持 `54cf9bf7bbe13af599a56b48a6b567981434516832301fda5a6746ac01a45ea8`，长度 873。

## 边界

本版不改 execution readiness artifact 构造，不改 matrix/candidate/verification 字段，不改 route 或 schema，不启动 Java / mini-kv，也不打开真实执行。它只把完整 Markdown 文档的 H1、meta、section 拼装交给通用 report builder；gate 行、process plan、read targets、blocked reasons 的文本模板保持原样。

## 验证

- focused tests: execution readiness artifacts 测试和 renderer census ratchet 均通过。
- census: 245 total，187 standardized，58 unstandardized；剩余 shape signals 为 h3 25、forLoop 0、map 68、flatMap 42。
- `npm run typecheck`、`npm run lint`、`npm run build` 均通过；lint 仍是既有 0 error / 263 warning 基线。
- 反向门证明：`Renderer census regression: 58 exceeds --max-unstandardized=57` 是预期 stderr。
