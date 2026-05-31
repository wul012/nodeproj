# Node v416 代码讲解：managed-audit-disabled read-only integration route group split

## 目标

v416 继续缩小中央 audit route 表，把 managed-audit-disabled read-only integration 的 intake、archive verification、decision record route 抽成独立 domain route group。

## 拆分方式

- 新增 `src/routes/auditManagedAuditDisabledReadOnlyIntegrationRoutes.ts`。
- 该文件导出 `managedAuditDisabledReadOnlyIntegrationAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...managedAuditDisabledReadOnlyIntegrationAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 从 `managed-audit-disabled-read-only-integration-intake` 到 `managed-audit-disabled-read-only-integration-decision-record`，共 3 个 JSON/Markdown route。

## 验证

新增 `test/auditManagedAuditDisabledReadOnlyIntegrationRoutes.test.ts`，确认 route group 包含 3 个路径、中央 route 表使用 spread 注册、最新 decision-record JSON/Markdown route 仍然 200，并且安全字段继续保持 `rerunsLiveProbe=false`、`startsJavaService=false`、`startsMiniKvService=false`、`connectsManagedAudit=false`、`executionAllowed=false`。
