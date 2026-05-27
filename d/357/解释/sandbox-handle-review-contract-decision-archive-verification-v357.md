# Node v357：sandbox handle review contract decision archive verification

## 版本进度

v357 消费 v356 的归档材料，验证 sandbox handle review contract decision 是否完整可追溯。它只做归档验证，不新增 handle review packet/gate 行为，不请求 Java / mini-kv，也不打开 credential、raw endpoint、provider/client、runtime shell 或 managed audit HTTP/TCP。

本轮结论：

```text
archiveVerificationState: sandbox-handle-review-contract-decision-archive-verified
archiveVerificationDecision: archive-sandbox-handle-review-contract-decision
readyForNodeV358SandboxHandleReviewPacketOrGateIntake: true
checkCount: 30
passedCheckCount: 30
archiveFileCount: 11
presentArchiveFileCount: 11
contractInputCount: 5
contractSectionCount: 6
sourceCheckCount: 25
sourcePassedCheckCount: 25
```

## 本版新增

- 新增 v357 archive verification 类型、服务、Markdown renderer。
- 新增 audit JSON/Markdown route。
- 新增 focused tests，覆盖 v356 归档验证、缺归档 fail-closed、route 输出。
- 归档 HTTP JSON、Markdown、summary、HTML、Playwright MCP 截图和 browser snapshot。

## 关键边界

- 不启动 Java。
- 不启动 mini-kv。
- 不重新 live probe。
- 不读取或请求 managed audit credential value。
- 不解析或输出 raw endpoint URL。
- 不实例化 secret provider 或 resolver client。
- 不实现或调用 runtime shell。
- 不发送 managed audit HTTP/TCP。
- 不执行 Java ledger/schema/SQL/deployment/rollback。
- 不执行 mini-kv LOAD/COMPACT/SETNXEX/RESTORE/write/admin。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v357 1 file / 3 tests 通过
- 小组 vitest：v356 + v357 2 files / 6 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：200 JSON / 200 Markdown，`archiveVerificationDecision=archive-sandbox-handle-review-contract-decision`
- 浏览器截图：Playwright MCP 通过静态归档页完成截图

## 证据文件

- `d/357/evidence/sandbox-handle-review-contract-decision-archive-verification-v357-http.json`
- `d/357/evidence/sandbox-handle-review-contract-decision-archive-verification-v357-http.md`
- `d/357/evidence/sandbox-handle-review-contract-decision-archive-verification-v357-summary.json`
- `d/357/evidence/sandbox-handle-review-contract-decision-archive-verification-v357-browser-snapshot.md`
- `d/357/sandbox-handle-review-contract-decision-archive-verification-v357.html`

## 截图

![v357 sandbox handle review contract decision archive verification](../图片/sandbox-handle-review-contract-decision-archive-verification-v357.png)

## 结论

v357 证明 v356 的 contract decision 归档完整：JSON、Markdown、summary、HTML、截图、解释、代码讲解、计划索引和 `d/README.md` 都对齐。下一步可以进入 Node v358 的 sandbox handle review packet / gate 非 secret intake，但仍不能打开真实 credential、endpoint、provider/client、runtime shell 或 managed audit 连接。
