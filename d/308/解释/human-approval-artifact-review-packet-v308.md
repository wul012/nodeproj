# Node v308 运行说明

Node v308 消费 Node v307 的三方 upstream echo verification，定义人工提交 approval artifact 的 review packet 契约。它只检查 artifact shape、缺字段、禁字段、拒绝原因和 no-go 边界，不实现 runtime shell。

本版仍不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP，不写 approval ledger，不执行 schema migration，不启动 Java / mini-kv / 外部审计服务。

## 本版目标

- 读取 Node v307 的 `approval-prerequisite-artifact-upstream-echo-verification-ready` 结果。
- 定义 human approval artifact review packet。
- 固化 9 个 required fields、9 个 prohibited fields、13 个 rejection reasons、9 个 missing field checks、12 个 no-go boundaries。
- 明确推荐并行 `Java v143 + mini-kv v136`，两边只做只读 echo / non-participation receipt。
- 保持 `runtimeShellImplemented=false`、`runtimeShellInvocationAllowed=false`、`connectsManagedAudit=false`、`executionAllowed=false`。

## 验证结果

- focused tests: passed，`4` tests。
- forced historical fixture fallback: passed through the Node v307 source chain。
- typecheck: passed。
- full test: `241` files / `831` tests passed。
- build: passed。
- HTTP smoke: JSON 200 / Markdown 200，短时 Node 服务已停止。
- Screenshot: Playwright MCP 已优先尝试；因 MCP 阻止 `file://`，回退本机 Chrome headless，截图生成成功。
- archive profile: `reviewPacketState=human-approval-artifact-review-packet-ready`。
- checks: `18/18`。
- review packet digest: `b0dda954c509337c96a645c177be521d0a200d8f8e6d52081ed8c0df9a43ccf3`。

## 归档文件

- `../evidence/human-approval-artifact-review-packet-v308.json`
- `../evidence/human-approval-artifact-review-packet-v308.md`
- `../evidence/human-approval-artifact-review-packet-v308-http.json`
- `../evidence/human-approval-artifact-review-packet-v308-http.md`
- `../evidence/human-approval-artifact-review-packet-v308-snapshot.md`
- `../human-approval-artifact-review-packet-v308.html`
- `../图片/human-approval-artifact-review-packet-v308.png`

## 结论

v308 把“人工 approval artifact 怎么被审查”从 v307 的三方 echo 之后接上了，但仍然没有进入 runtime shell 实现。下一步按计划是推荐并行 Java v143 + mini-kv v136；Node v309 必须等两边完成后再做上游 echo verification。
