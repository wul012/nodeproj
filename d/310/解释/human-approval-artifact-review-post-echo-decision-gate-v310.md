# Node v310 运行说明

Node v310 消费 Node v309 的 human approval artifact review upstream echo verification，把 v308/v309 的结果收束成 post-echo decision gate。

本版不是 runtime shell 实现版本，也不是 managed audit 连接版本；它只做决策门归档：确认三方 echo 已对齐，但仍缺 signed artifact instance、credential handle approval、endpoint allowlist approval、no-network safety fixture、abort/rollback semantics、Java v144 + mini-kv v137 decision echo。

## 本版目标

- 读取 Node v309 三方 echo verification。
- 生成 post-echo decision gate。
- 明确 Node v311 不能在 Java v144 + mini-kv v137 之前抢跑。
- 显式请求 Java v144 + mini-kv v137 推荐并行只读 echo。
- 保持 runtime shell、credential value、raw endpoint URL、provider/client、HTTP/TCP、ledger、schema migration、mini-kv write/admin、auto-start 全部 blocked。

## 验证结果

- focused tests: passed，`4` tests。
- forced historical fixture fallback: passed。
- typecheck: passed。
- full test: `243` files / `839` tests passed。
- build: passed。
- HTTP smoke: JSON 200 / Markdown 200，短时 Node 服务已停止。
- Screenshot: Playwright MCP 已优先尝试；本地 `file://` 被 MCP 阻止，回退本机 Chrome headless，截图生成成功。
- decision state: `human-approval-artifact-review-post-echo-decision-gate-ready`。
- checks: `17/17`。
- decision digest: `91c0927b63fee6dd0fb44e27cd82c7f700ceeeb4cef750606777bd4d3436102c`。

## 归档文件

- `../evidence/human-approval-artifact-review-post-echo-decision-gate-v310.json`
- `../evidence/human-approval-artifact-review-post-echo-decision-gate-v310.md`
- `../evidence/human-approval-artifact-review-post-echo-decision-gate-v310-http.json`
- `../evidence/human-approval-artifact-review-post-echo-decision-gate-v310-http.md`
- `../evidence/human-approval-artifact-review-post-echo-decision-gate-v310-snapshot.md`
- `../human-approval-artifact-review-post-echo-decision-gate-v310.html`
- `../图片/human-approval-artifact-review-post-echo-decision-gate-v310.png`

## 结论

v310 完成了 post-echo decision gate。下一步不是 Node 抢跑，而是推荐并行 Java v144 + mini-kv v137，只读回显本决策门；两边完成后，Node v311 再消费它们。
