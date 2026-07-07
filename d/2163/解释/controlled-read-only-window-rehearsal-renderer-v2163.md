# v2163 controlled read-only window rehearsal renderer

## 目标

v2163 迁移 `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalRenderer.ts`。它输出的是一份完整 Markdown packet，不是 route 内部 section 片段，因此沿用 v2162 建立的完整文档路线：用 `renderVerificationReportMarkdown` 管理 H1、meta 和 section 外壳，保留 rehearsal step 的领域行模板。

## 输入与输出

- 输入仍是 `createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket(...)` 生成的 20 步手动 rehearsal packet。
- 输出仍是一份 Markdown string，SHA-256 固定为 `cbbefc011c6cf84dabded2ea4a758baac90d4dfc5ec33a59b021c7ec5e283263`，长度 8964。
- 文档结构保持 1 个 H1、3 个 H2、20 个 H3 step heading，且末尾没有 trailing newline。
- renderer census 从 187/245 标准化推进到 188/245，未标准化剩余 57。

## 边界

本版不改 runbook package、stage ledger、execution readiness artifact builder，也不启动 Java / mini-kv。rehearsal packet 仍只是手动 live read-only window 的预演材料：它声明 owner、evidence slot、cleanup slot、read-only 和 no-service-start 边界，但不执行真实读、不写 sibling state、不打开生产执行。

## 验证

- focused tests: rehearsal packet 测试与 renderer census ratchet 均通过。
- census gate: `npm run renderer:census -- --max-unstandardized=57` 通过。
- `npm run typecheck` 与 `npm run lint` 通过，lint 仍是既有 0 error / 263 warning 基线。
- 反向门证明：`Renderer census regression: 57 exceeds --max-unstandardized=56` 是预期 stderr。
