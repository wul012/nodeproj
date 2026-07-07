# v2160 controlled read-only source matrix renderer

## 目标

v2160 迁移 `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixRenderer.ts`。这个 renderer 负责 source matrix、consumer gates、drift findings、consumption plan、review checklist、digest、archive snapshot 和 summary export 共 8 个二级 section，并包含 8 个运行时可见三级标题。旧实现把标题、字段和空行混在一个长数组里；新实现把这些段落收成 `renderProfileEntrySections` 的 `{ heading, lines }` 数据表。

## 输入与输出

- 输入仍是 `ControlledReadOnlyShardPreviewProfile`。
- 输出仍是 `string[]`，由上层 controlled read-only shard preview renderer 拼成完整 route markdown。
- 固定 fixture 下 source matrix section hash 保持 `738c074eaec922f9cf6a194ca77bd4c7b4255c142650a6e23262b3c6921d4ec6`。
- 固定 fixture 下完整 route markdown hash 保持 `a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d`。
- source matrix section 长度保持 8831，完整 route markdown 长度保持 81829。

## 边界

本版不改 source matrix 的构造逻辑，不改 drift 判断，不改消费计划，不改 approval 或 route。动态来源小标题、consumer comparison、plan step records、checklist items 都只是换了一层 section 外壳；字段名、字段顺序、空行和完整 Markdown 输出保持不变。Java 与 mini-kv 不需要为 v2160 提供新证据，可以按各自计划继续并行推进。

## 验证

- focused tests: source matrix hash 测试、controlled read-only shard preview route 覆盖、renderer census ratchet 均通过。
- census: 245 total，185 standardized，60 unstandardized；剩余 shape signals 为 h3 31、forLoop 0、map 71、flatMap 45。
- `npm run typecheck`、`npm run lint`、`npm run build` 均通过；lint 仍是既有 0 error / 263 warning 基线。
- 反向门证明：`Renderer census regression: 60 exceeds --max-unstandardized=59` 是预期 stderr，说明新基线会阻止未标准化数量回升。
