# v2159 controlled read-only route coverage renderer

## 目标

v2159 迁移 `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageRenderer.ts`。这个 renderer 原来手写 8 个二级 section，其中 3 个 section 还在行内插入 `###` verification gates。结构本质上仍是标准的 profile-entry section：标题、若干 `renderEntries(...)` 行、必要的小标题、尾部空行，因此适合收进 `renderProfileEntrySections`。

## 输入与输出

- 输入仍是 `ControlledReadOnlyShardPreviewProfile`。
- 输出仍是 `string[]`，由上层 controlled read-only shard preview markdown renderer 拼成完整 route markdown。
- 固定 fixture 下 route coverage section hash 保持 `ee09a0d002941c3a162823e0edc380c13168b154cd2bd8bf7c0b6510ebc72154`。
- 固定 fixture 下完整 route markdown hash 保持 `a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d`。
- route coverage section 长度保持 8385，完整 route markdown 长度保持 81829。

## 边界

本版不改 Java / mini-kv 读取，不改 profile 生成，不改 route，不改 schema，不启动 sibling service，也不引入真实执行能力。它只把 route coverage 这组重复 section 的 markdown 外壳交给共享 helper，字段选择、字段顺序、verification gate 文案和上层 route 输出全部保持不变。Java 与 mini-kv 可以继续并行推进，Node v2159 不是它们的前置批准点。

## 验证

- focused tests: route coverage hash 测试、controlled read-only shard preview route 覆盖、renderer census ratchet 均通过。
- census: 245 total，184 standardized，61 unstandardized；剩余 shape signals 为 h3 38、forLoop 0、map 75、flatMap 46。
- `npm run typecheck`、`npm run lint`、`npm run build` 均通过；lint 仍是既有 0 error / 263 warning 基线。
- 新增反向门证明：`Renderer census regression: 61 exceeds --max-unstandardized=60` 是预期 stderr，说明 ratchet 会在未标准化数量回升时失败。
