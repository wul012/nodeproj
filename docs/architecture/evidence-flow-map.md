# Evidence Flow 地图

本图说明 Node 控制面如何消费证据。它的重点是区分本地扫描、历史 fixture、route catalog 和 preflight 报告，避免把“证据已记录”误读为“生产已执行”。

## Evidence 来源

| 来源 | 典型路径 | 消费方式 | 边界 |
| --- | --- | --- | --- |
| 本地仓库文档 | `docs/architecture/*`、`docs/code-walkthrough-documentation-standard.md` | profile 读取文本并检查关键词、结构和路线图 | read-only |
| 版本解释材料 | `f/<version>/解释/*.md` | f-folder quality gate 扫描长度、中文深度、路径引用和禁用声明 | 不读取图片以外内容，不创建真实截图 |
| 代码讲解记录 | `代码讲解记录_生产雏形阶段3/r2000/*.md` | code walkthrough quality gate 检查章节、bucket、中文下限和 unsafe claim | 只读扫描 |
| route catalog | `src/routes/auditJsonMarkdownRouteGroups.ts` | catalog summary/integrity 测试保证 route table、group 和 flat list 对齐 | 不触发 route handler |
| sibling fixture | `fixtures/historical/sibling-workspaces/*` | 历史 fallback 兼容 GitHub runner | 不代表 live Java/mini-kv 状态 |
| HTTP smoke | `/api/v1/audit/*?format=markdown` | 验证 route 可返回 JSON/Markdown | 使用本地 Node 服务，收尾必须停止 |

## 当前只读声明

Node 可读性保养不需要 fresh Java 或 mini-kv evidence。Java 与 mini-kv 可以按各自保养建议并行推进；Node 只在需要 live integration 或真实上游产物时才等待它们。

## 不允许的解释

- 不把 historical fixture 说成当前 sibling service 已启动。
- 不把 dry-run 说成 production execution。
- 不把 quality gate success 说成真实人工批准。
- 不把 `readyForReadabilityMaintenance=true` 扩展成 `readyForProductionOperations=true`。

## 保养闭环

后期保养版本应把“读者入口”也当作证据：地图文档说明边界，profile route 验证地图存在，focused tests 证明 route/service/test 仍能对齐，f 目录讲解记录为什么这版是保养而不是业务执行。
