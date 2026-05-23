# Node v313 运行说明

Node v313 是质量优化版本，不重启 governance 功能链。它把 v310 与 v312 共用的 human approval post-echo prerequisite 定义抽成 catalog，避免后续继续复制 ID、label、missing evidence 文案。

## 本版目标

- 新增 `managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.ts`。
- 让 v310 的 `documented-missing` prerequisite 从 catalog 生成。
- 让 v312 的 `1 completed + 5 remaining` closure split 从同一个 catalog 生成。
- 新增 catalog 聚焦测试，确认 v310/v312 使用同一组 prerequisite 顺序。
- 不改变 JSON contract，不请求 Java / mini-kv 新 echo。

## 验证结果

- typecheck: passed。
- focused tests: `3` files / `9` tests passed。
- full test: `246` files / `848` tests passed。
- build: passed。
- HTTP smoke: v312 closure route JSON 200 / Markdown 200。
- Screenshot: Playwright MCP 截图成功，文件已保存。

## 归档文件

- `../evidence/human-approval-post-echo-prerequisite-catalog-cleanup-v313.json`
- `../evidence/human-approval-post-echo-prerequisite-catalog-cleanup-v313.md`
- `../evidence/human-approval-post-echo-prerequisite-catalog-cleanup-v313-http.json`
- `../evidence/human-approval-post-echo-prerequisite-catalog-cleanup-v313-http.md`
- `../evidence/human-approval-post-echo-prerequisite-catalog-cleanup-v313-snapshot.md`
- `../human-approval-post-echo-prerequisite-catalog-cleanup-v313.html`
- `../图片/human-approval-post-echo-prerequisite-catalog-cleanup-v313.png`

## 结论

v313 完成了 human approval prerequisite catalog cleanup。它让 v310 和 v312 不再各自维护 prerequisite 列表，降低后续漂移风险；功能主线仍等待新的具体 prerequisite artifact contract。
