# Node v307 运行说明

Node v307 消费 Node v306 的 approval prerequisite artifact intake plan，以及 Java v142 / mini-kv v135 的只读 echo 证据，确认三项目对同一份非 secret artifact contract 已经对齐。

本版不是 runtime shell 实现版本，也不是 managed audit 连接版本；它只做 upstream echo verification。credential value、raw endpoint URL、provider/client、HTTP/TCP、approval ledger、schema migration、mini-kv write/admin、auto-start 仍全部 blocked。

## 本版目标

- 读取 Node v306 artifact intake plan。
- 读取 Java v142 只读 echo 证据。
- 读取 mini-kv v135 non-participation receipt。
- 校验 12 个 required fields、8 个 prohibited fields、9 个 rejection reasons、12 个 no-go boundaries。
- 校验 Java / mini-kv 都声明 ready for Node v307。
- 保持 disabled runtime shell implementation / invocation 仍为 false。

## 验证结果

- focused tests: passed。
- forced historical fixture fallback: passed。
- typecheck: passed。
- full test: `240` files / `827` tests passed。
- build: passed。
- HTTP smoke: JSON 200 / Markdown 200，短时 Node 服务已停止。
- Playwright MCP screenshot: passed。
- archive profile: `verificationState=approval-prerequisite-artifact-upstream-echo-verification-ready`。
- checks: `23/23`。
- artifact digest: `72f3e90606e40a978611fa4b8596c76c3ebc468124c4ead7bb9c4833130ee9c2`。

## 归档文件

- `../evidence/approval-prerequisite-artifact-upstream-echo-verification-v307.json`
- `../evidence/approval-prerequisite-artifact-upstream-echo-verification-v307.md`
- `../evidence/approval-prerequisite-artifact-upstream-echo-verification-v307-http.json`
- `../evidence/approval-prerequisite-artifact-upstream-echo-verification-v307-http.md`
- `../evidence/approval-prerequisite-artifact-upstream-echo-verification-v307-snapshot.md`
- `../approval-prerequisite-artifact-upstream-echo-verification-v307.html`
- `../图片/approval-prerequisite-artifact-upstream-echo-verification-v307.png`

## 结论

v307 完成了 Java v142 + mini-kv v135 对 Node v306 contract 的上游对齐。下一步可以另起 v307 衍生计划，定义人工提交 approval artifact 的 review packet，但仍不能直接跳到 runtime shell、credential 读取或真实 managed audit 连接。
