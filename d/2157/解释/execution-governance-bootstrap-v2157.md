# v2157 execution governance and deterministic census

## 目标

v2157 把会话启动定位、renderer census 和 CI 等待节奏收成可重复执行的工具与规则。它不修改任何运行时服务、路由、schema 或 Markdown renderer 输出。

## 输入与输出

- `scripts/codex-bootstrap.ps1` 读取 git、tag、remote、CI 和活动计划指针，只输出定位信息。
- `npm run renderer:census -- --json` 扫描 `src/services/*Renderer.ts`，输出统一 JSON 口径。
- `--max-unstandardized=<n>` 把上一版数量变成 shrink-only 检查，一旦剩余数回升就以非零码退出。

## 边界

Stage 2 文档在本版只做归档，状态仍是 inactive。当前仍执行 Stage 1 N1；Java 与 mini-kv 可继续并行，Node 不需要它们产出新证据。

## 当前 census

Renderer 总数 245，已标准化 182，未标准化 63。标准化口径同时识别 `verificationReportBuilder`、`releaseReportShared` 和 `renderProfileEntrySections`，解决旧的 builder-only 数字无法反映 v2153-v2156 收敛成果的问题。

## 验证记录

- `npm run renderer:census -- --json` 已通过，输出 245/182/63。
- `npx vitest run test/rendererCensusScript.test.ts test/codeWalkthroughDocumentationQualityGate.test.ts test/explanationReadabilityCloseoutProfile.test.ts --maxWorkers=2` 已通过，包含 census 基线与反向 shrink-only 失败门。
- `npm run typecheck` 已通过。
- `npm run lint` 已通过，结果为 0 error / 263 warning，warning 属于既有历史基线。
- `npm run build` 已通过，随后删除 `dist/`。
- `npx vitest run --testTimeout=180000 --maxWorkers=4` 在本地运行 15 分钟后触发 shell timeout，未观察到断言失败；超时后残留的 Vitest 进程树已停止。本版后续以远程 CI 作为全量套件门，下一版写入前必须先检查 v2157 CI conclusion。
