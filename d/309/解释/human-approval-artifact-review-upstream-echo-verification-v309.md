# Node v309 运行说明

Node v309 消费 Node v308 的 human approval artifact review packet，以及 Java v143 / mini-kv v136 的只读 echo 证据，确认三项目对同一份人工 approval artifact review packet contract 已经对齐。

本版不是 runtime shell 实现版本，也不是 managed audit 连接版本；它只做 upstream echo verification。credential value、raw endpoint URL、provider/client、HTTP/TCP、approval ledger、schema migration、mini-kv write/admin、auto-start 仍全部 blocked。

## 本版目标

- 读取 Node v308 human approval artifact review packet。
- 读取 Java v143 只读 echo 证据。
- 读取 mini-kv v136 non-participation receipt。
- 校验 9 个 required fields、9 个 prohibited fields、13 个 rejection reasons、9 个 missing field checks、12 个 no-go boundaries。
- 校验 Java / mini-kv 都声明 ready for Node v309。
- 保持 disabled runtime shell implementation / invocation 仍为 false。

## 验证结果

- focused tests: passed，`4` tests。
- forced historical fixture fallback: passed。
- typecheck: passed。
- full test: `242` files / `835` tests passed。
- build: passed。
- HTTP smoke: JSON 200 / Markdown 200，短时 Node 服务已停止。
- Screenshot: Playwright MCP 已优先尝试；本地归档 HTML 在当前 MCP session 不可用，回退本机 Chrome headless，截图生成成功。
- archive profile: `verificationState=human-approval-artifact-review-upstream-echo-verification-ready`。
- checks: `23/23`。
- verification digest: `b306972aeab587fff6905759ad0fa2968af235cb13f09063c1c6c3af14e7913d`。

## 归档文件

- `../evidence/human-approval-artifact-review-upstream-echo-verification-v309.json`
- `../evidence/human-approval-artifact-review-upstream-echo-verification-v309.md`
- `../evidence/human-approval-artifact-review-upstream-echo-verification-v309-http.json`
- `../evidence/human-approval-artifact-review-upstream-echo-verification-v309-http.md`
- `../evidence/human-approval-artifact-review-upstream-echo-verification-v309-snapshot.md`
- `../human-approval-artifact-review-upstream-echo-verification-v309.html`
- `../图片/human-approval-artifact-review-upstream-echo-verification-v309.png`

## 结论

v309 完成了 Java v143 + mini-kv v136 对 Node v308 review packet contract 的上游对齐。下一步应另起 v309 衍生计划，谨慎规划后续 Node-only preflight 或真实只读联调前置，但仍不能直接跳到 runtime shell、credential 读取或真实 managed audit 连接。
