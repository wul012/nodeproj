# Route / Service / Test 对照表

本表用于新增 route 前的可读性检查。任何新增审计 route 都要能回答：暴露什么能力、是否只读、调用哪个 service、focused test 在哪里、是否会启动 sibling service。

## Managed audit route quality 组

| Route | Service | Test | 只读边界 |
| --- | --- | --- | --- |
| `/api/v1/audit/code-walkthrough-documentation-quality-gate` | `src/services/codeWalkthroughDocumentationQualityGate.ts` | `test/codeWalkthroughDocumentationQualityGate.test.ts`、`test/auditManagedAuditRouteQualityRoutes.test.ts` | 扫描代码讲解文档，`executionAllowed=false` |
| `/api/v1/audit/f-folder-explanation-quality-gate` | `src/services/fFolderExplanationQualityGate.ts` | `test/fFolderExplanationQualityGate.test.ts`、`test/auditManagedAuditRouteQualityRoutes.test.ts` | 扫描 `f/<version>/解释`，不启动 sibling service |
| `/api/v1/audit/managed-audit-route-helper-quality-pass` | `src/services/managedAuditRouteHelperQualityPass.ts` | `test/managedAuditRouteHelperQualityPass.test.ts`、`test/auditManagedAuditRouteQualityRoutes.test.ts` | 证明 route helper 拆分，不连接 managed audit |
| `/api/v1/audit/managed-audit-route-registration-table-quality-pass` | `src/services/managedAuditRouteRegistrationTableQualityPass.ts` | `test/managedAuditRouteRegistrationTableQualityPass.test.ts`、`test/auditManagedAuditRouteQualityRoutes.test.ts` | 证明 route catalog/table 对齐 |
| `/api/v1/audit/managed-audit-readability-maintenance-profile` | `src/services/readabilityMaintenanceProfile.ts` | `test/readabilityMaintenanceProfile.test.ts`、`test/auditManagedAuditRouteQualityRoutes.test.ts` | 验证架构地图和保养标准，不触发业务执行 |

## Catalog 对照

| 文件 | 作用 |
| --- | --- |
| `src/routes/auditManagedAuditRouteQualityRoutes.ts` | 注册 managed-audit route quality 组内的 JSON/Markdown route |
| `src/routes/auditJsonMarkdownRouteGroups.ts` | 把 route quality 组挂到全局 catalog |
| `src/routes/auditJsonMarkdownRouteCatalogSummary.ts` | 保存 group/route/domain 计数快照 |
| `src/routes/auditJsonMarkdownRouteCatalogIntegrity.ts` | 检查 group、flat route table、重复路径和空组 |

## 新增 route 审查清单

- route path 必须进入共享 registrar。
- service 必须返回 `executionAllowed=false` 或等价字段。
- focused test 必须覆盖 JSON 和 Markdown 中至少一个格式。
- catalog summary 和 integrity tests 必须跟着更新。
- access policy 必须能覆盖该 path。
- 文档必须说明是否会读取 sibling evidence、是否需要 live service、是否只是本地保养。
