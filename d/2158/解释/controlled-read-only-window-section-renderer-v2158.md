# v2158 controlled read-only window section renderer

## 目标

v2158 迁移 `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowProfileSectionsRenderer.ts`。这个文件原来手写 11 个 live-window 顶层 section，每个 section 都是 `"## 标题" + renderEntries(...) + 空行`，语义上已经完全符合 `renderProfileEntrySections` 的通用模型，只是还没有走共享入口。

## 输入与输出

- 输入仍是 `ControlledReadOnlyShardPreviewProfile`。
- 输出仍是 `string[]`，并由上层 controlled read-only shard preview markdown renderer 拼成完整路由 markdown。
- 固定 fixture 下 live-window section hash 保持 `66d0f030a66b890f102c675b37ae93c27e8ee3503e49337fc3994e389d16b605`。
- 固定 fixture 下完整 route markdown hash 保持 `a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d`。

## 边界

本版没有改 Java/mini-kv 读取、没有改 shard preview profile 生成、没有改 route、没有改 schema、没有启动 sibling service。三个纯组合 profile-section renderer 仍保留在剩余清单里，后续应作为 composition-only waiver 或单独合并策略处理，不用为了数字把 marker 硬塞进组合器。

## 验证

- focused tests: 新 hash 测试、route markdown 大覆盖、renderer census ratchet 均通过。
- census: 245 total，183 standardized，62 unstandardized。
- typecheck/lint/build 均通过；lint 仍是 0 error / 263 warning 的既有基线。
