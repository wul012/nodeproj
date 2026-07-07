# v2161 controlled read-only handoff summary renderer

## 目标

v2161 迁移 `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffSummaryRenderer.ts`。这个 renderer 位于 source matrix 与 route coverage 之间，负责 handoff notes、handoff summary、summary consumer、consumer export、receipt、receipt archive snapshot、receipt archive verification 共 7 个二级 section，并保留 3 个三级段落。新实现把重复的 section 外壳收进 `renderProfileEntrySections`。

## 输入与输出

- 输入仍是 `ControlledReadOnlyShardPreviewProfile`。
- 输出仍是 `string[]`，由上层 controlled read-only shard preview renderer 拼成完整 route markdown。
- 固定 fixture 下 handoff summary section hash 保持 `fb9c44571c6456026784947dbcb6a563d85aa24c9123d7905638a4794c520069`。
- 固定 fixture 下完整 route markdown hash 保持 `a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d`。
- handoff summary section 长度保持 6564，完整 route markdown 长度保持 81829。

## 边界

本版不改 handoff notes 的生成，不改 consumer gate，不改 export / receipt / archive verification 的业务字段，不改 route 或 schema。Java 与 mini-kv 不需要提供新证据；Node 只是把本地 Markdown section 的重复排版外壳统一起来。输出字段、顺序、空行和完整 route-facing Markdown 均由 hash 测试证明不变。

## 验证

- focused tests: handoff summary hash 测试、controlled read-only shard preview route 覆盖、renderer census ratchet 均通过。
- census: 245 total，186 standardized，59 unstandardized；剩余 shape signals 为 h3 28、forLoop 0、map 70、flatMap 45。
- `npm run typecheck`、`npm run lint`、`npm run build` 均通过；lint 仍是既有 0 error / 263 warning 基线。
- 反向门证明：`Renderer census regression: 59 exceeds --max-unstandardized=58` 是预期 stderr，说明新基线会阻止未标准化数量回升。
