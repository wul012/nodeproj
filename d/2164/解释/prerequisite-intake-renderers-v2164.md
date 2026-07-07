# v2164 prerequisite intake renderers

## 目标

v2164 合并迁移两个同形的完整 Markdown renderer：approval prerequisite artifact intake plan，以及 abort/rollback semantics contract intake。两者都从手写 H1/meta/section 数组迁移到 `renderVerificationReportMarkdown`，内部 H3 子列表模板保留在本地 helper 中。

## 输入与输出

- approval intake 输出规范化 hash 为 `bfcbb70ddad243f441511a6ba6c07fd8766c12fd797b8afa18b50a61c9856c51`，长度 12746，结构 1 H1 / 10 H2 / 5 H3。
- abort/rollback intake 输出规范化 hash 为 `e0e36ab78e4ca9c6ecd526268390353cb0b78a935c9d88e05f977ea1bcf57e6d`，长度 13704，结构 1 H1 / 11 H2 / 5 H3。
- 两个 profile 都有动态 `generatedAt`，测试在 hashing 前固定为 `2026-07-07T00:00:00.000Z`，避免把时间戳误判为 renderer 漂移。
- renderer census 从 188/245 标准化推进到 190/245，未标准化剩余 55。

## 边界

本版不改 intake profile 构造，不改 historical fixture fallback，不改路由、schema、Java/mini-kv 证据，也不放开 runtime shell、网络请求、写命令或执行授权。Java 与 mini-kv 可继续并行推进，不需要等待 Node v2164 批准。

## 验证

- focused tests: 两个 intake focused test 加 renderer census ratchet 共 10 个测试通过。
- census gate: `npm run renderer:census -- --max-unstandardized=55` 通过。
- `npm run typecheck`、`npm run lint`、`npm run build` 通过，lint 仍是既有 0 error / 263 warning 基线。
- 反向门证明：`Renderer census regression: 55 exceeds --max-unstandardized=54` 是预期 stderr。
