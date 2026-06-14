# v2142 渲染器整合批次 25 — 简要说明

把三个标准形态的 managed-audit「sandbox endpoint credential resolver upstream echo
verification」系列渲染器迁移到共享 `verificationReportBuilder`：

1. `...SandboxEndpointCredentialResolverUpstreamEchoVerificationRenderer.ts`（无内联对象）
2. `...SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationRenderer.ts`（两段内联对象 entries）
3. `...SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationRenderer.ts`（三段内联对象 entries）

- 仅改写函数体（数组拼装 → builder 调用），字符串字面量逐字保留，公共 API 不变。
- 三个标题均为字面量（非动态 `profile.title`）；内联对象 entries 原样保留、字段顺序不变。
- 不新增 helper / 链路 / 文件；net −93 行（153 增 / 246 删）。
- typecheck + 4 文件 17 用例 + ratchet 全绿。
- 这三个测试对 Markdown 用 `toContain` 断言，故额外做了渲染前后字节对比：全部差异仅落在
  运行时 `- Generated at:` 时间戳行，其余逐字节相同；一次性对比 harness 与 `.tmp/` 落盘已删除。

意义：本批清空了「纯标准形态且有测试」子集。批次启动时的形态普查显示，剩余 112 个未迁移
渲染器均含 `for` 循环 / `### ` 三级小节 / `.map`/`.flatMap`，无法用当前 builder 逐字节
表达。下一批需先做方向决策（补测 ProfileSection，或扩展 `lines`/嵌套小节格式化），不能
再沿用「随手挑标准渲染器」的低风险路径。

详见 `代码讲解记录_生产雏形阶段3/r2000/2113-renderer-consolidation-batch-25-v2142.md`。
