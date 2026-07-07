# v2173 说明：workspace root 与 byteLength digest 归一化

v2173 是 v2172 远端 CI 的直接修复版。v2172 已经把 entry-rendered `xxxDigest` 行收进共享 normalizer，但 GitHub Actions 仍然在完整 coverage 中失败：`artifactIntakePreflight` 的规范化 Markdown 远端长度为 12447，本地金标为 12574。继续对本地规范化输出做残留扫描后发现两个漏口：`javaWorkspace` / `miniKvWorkspace` 这类 JSON `path` 值指向 sibling workspace 根目录，没有尾斜杠，旧的 `<java>` / `<mini-kv>` 折叠规则没有命中；另一个是 JSON 文件引用使用 `byteLength/digest`，不是之前覆盖的 `sizeBytes/digest`。

本版本只修测试比较面。`normalizePathValue` 现在能把以 `/advanced-order-platform` 和 `/mini-kv` 结尾的根路径折叠成 `<java>` / `<mini-kv>`，同时继续保留子路径形式；`normalizeRendererMigrationMarkdown` 新增 `byteLength/digest` 文件引用归一化。`rendererMigrationV2170Parity.test.ts` 只更新 `artifactIntakePreflight` 的 length/hash，其余 v2169 五个 case 和 v2170 前三个 case 在新规则下保持不变。

产品行为没有变化：真实 route、真实 renderer、真实归档 Markdown 仍展示完整 workspace path、file byte length 和 digest。被替换的只是 migration parity hash 的比较表面。已通过 `npx vitest run test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts --maxWorkers=2`；还要补跑 typecheck、文档质量、lint、build，并推送 v2173 让 GitHub CI 重新验证 Linux runner。
