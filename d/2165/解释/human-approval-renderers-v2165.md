# v2165 human approval renderers

## 目标

v2165 成组迁移两个 human-approval 完整 Markdown renderer：human approval artifact review packet，以及 post-echo decision upstream echo verification。两者都改用 `renderVerificationReportMarkdown` 表达 H1、meta 和 H2 section，内部 H3 evidence/contract 子列表继续保留本地 helper。

## 输入与输出

- review packet 规范化 hash 为 `ba1e40b6301beec744107f7829f3f6594330422daf9d841ade3f833f38c44d9c`，长度 12748，结构 1 H1 / 10 H2 / 6 H3。
- post-echo upstream verification 规范化 hash 为 `77b2b2f105c54dbe61e8553bf166a2ea5fde5b39d5988de6ba2f775457511638`，长度 23227，结构 1 H1 / 11 H2 / 4 H3。
- 两个 profile 的 `generatedAt` 都是动态字段，测试固定为 `2026-07-07T00:00:00.000Z` 后再 hashing。
- renderer census 从 190/245 标准化推进到 192/245，未标准化剩余 53；H3 shape signal 从 14 降到 4。

## 边界

本版不改 human approval artifact review packet 的业务字段，不改 Java v144 / mini-kv v137 historical evidence fallback，不改 route/schema，也不启动 sibling 服务。它仍是 Node-local renderer consolidation，Java 与 mini-kv 可以并行继续。

## 验证

- focused tests: 两个 human-approval focused tests 加 renderer census ratchet 共 10 个测试通过。
- census gate: `npm run renderer:census -- --max-unstandardized=53` 通过。
- `npm run typecheck`、`npm run lint`、`npm run build` 通过，lint 仍是 0 error / 263 warning。
- 反向门证明：`Renderer census regression: 53 exceeds --max-unstandardized=52` 是预期 stderr。
