# Node v306 运行说明

Node v306 消费 Node v305 的 stop/prerequisite upstream echo verification，把 v304 中 6 个 documented-missing prerequisites 收束为一个 approval prerequisite artifact intake contract。它不是 runtime shell 实现版本，也不是连接版本；本版只定义非 secret artifact 的 required fields、prohibited fields、rejection reasons、no-go boundaries，以及 Java v142 + mini-kv v135 后续只读 echo 的并行入口。

## 本版目标

- 读取 Node v305 的 upstream echo verification 结果。
- 定义 `managed-audit-runtime-shell-approval-prerequisite-artifact` 的最小输入契约。
- 明确 12 个 required fields、8 个 prohibited fields、9 个 rejection reasons、12 个 no-go boundaries。
- 明确 Java v142 + mini-kv v135 可以在 Node v306 完成后并行推进，只做只读 echo / non-participation receipt。
- 保持 credential value、raw endpoint URL、provider/client、HTTP/TCP、runtime shell implementation、ledger write、schema migration、mini-kv write/admin、auto-start 全部 blocked。

## 验证结果

- focused tests: passed。
- forced historical fixture fallback: passed。
- typecheck: passed。
- full test: `239` files / `823` tests passed。
- build: passed。
- HTTP smoke: JSON 200 / Markdown 200，短时 Node 服务已停止。
- Playwright MCP screenshot: passed。
- archive profile: `planState=approval-prerequisite-artifact-intake-plan-ready`。
- checks: `16/16`。
- artifact digest: `72f3e90606e40a978611fa4b8596c76c3ebc468124c4ead7bb9c4833130ee9c2`。

## 归档文件

- `../evidence/approval-prerequisite-artifact-intake-plan-v306.json`
- `../evidence/approval-prerequisite-artifact-intake-plan-v306.md`
- `../runtime-shell-approval-prerequisite-artifact-intake-plan-v306.html`
- `../图片/runtime-shell-approval-prerequisite-artifact-intake-plan-v306.png`

## 结论

v306 把“继续之前必须补什么”从口头计划变成可测试 artifact contract。下一步不是 Node 抢跑，而是推荐并行 Java v142 + mini-kv v135：两边只读回显 v306 contract，完成后再由 Node v307 做 upstream echo verification。
