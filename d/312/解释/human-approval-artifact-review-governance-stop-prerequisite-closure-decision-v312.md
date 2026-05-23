# Node v312 运行说明

Node v312 消费 Node v311 的 `human approval artifact review post-echo decision upstream echo verification`，生成 `governance stop/prerequisite closure decision`。

本版不是 runtime shell 实现版本，也不是 managed audit 连接版本；它的作用是把前面反复 echo 的治理链停下来，明确 6 个 prerequisite 里只有 `java-mini-kv-decision-echo` 已关闭，其余 5 个仍然缺失。

## 本版目标

- 读取 Node v311 verification result。
- 确认 Java v144 + mini-kv v137 echo 已经由 Node v311 关闭。
- 明确剩余 `signed-human-approval-artifact`、`credential-handle-approval`、`endpoint-handle-allowlist-approval`、`no-network-safety-fixture`、`abort-rollback-semantics` 仍缺失。
- 暂停 governance 链，不请求新的 Java / mini-kv echo。
- 继续保持 runtime shell、credential value、raw endpoint URL、provider/client、HTTP/TCP、ledger、schema migration、auto-start 全部 blocked。

## 验证结果

- typecheck: passed。
- focused tests: `4` tests passed。
- full test: `245` files / `847` tests passed。
- build: passed。
- HTTP smoke: JSON 200 / Markdown 200。
- Screenshot: Playwright MCP 截图成功，文件已保存。
- decision state: `human-approval-artifact-review-governance-stop-prerequisite-closure-decision-ready`。
- checks: `16/16`。
- closure digest: `152d7517c07119df360446a29c508f5d3d9a78a28adfc6137ea0b0254508b0c6`。

## 归档文件

- `../evidence/human-approval-artifact-review-governance-stop-prerequisite-closure-decision-v312.json`
- `../evidence/human-approval-artifact-review-governance-stop-prerequisite-closure-decision-v312.md`
- `../evidence/human-approval-artifact-review-governance-stop-prerequisite-closure-decision-v312-http.json`
- `../evidence/human-approval-artifact-review-governance-stop-prerequisite-closure-decision-v312-http.md`
- `../evidence/human-approval-artifact-review-governance-stop-prerequisite-closure-decision-v312-snapshot.md`
- `../human-approval-artifact-review-governance-stop-prerequisite-closure-decision-v312.html`
- `../图片/human-approval-artifact-review-governance-stop-prerequisite-closure-decision-v312.png`

## 结论

v312 完成了 governance stop/prerequisite closure decision。当前链条不应继续机械新增 echo；只有出现新的具体 prerequisite artifact contract，才适合再请求 Java / mini-kv 并行只读回显。否则下一步只适合做 Node 质量优化。
