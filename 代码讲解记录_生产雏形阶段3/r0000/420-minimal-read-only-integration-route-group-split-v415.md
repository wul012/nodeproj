# Node v415 代码讲解：minimal read-only integration route group split

## 目标

v415 继续缩小中央 audit route 表，把 minimal read-only integration 这一组 window、smoke、gate execution、archive verification、operator/CI handoff route 抽成独立 domain route group。

## 拆分方式

- 新增 `src/routes/auditMinimalReadOnlyIntegrationRoutes.ts`。
- 该文件导出 `minimalReadOnlyIntegrationAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...minimalReadOnlyIntegrationAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 从 `minimal-read-only-integration-window-readiness-cut` 到 `minimal-read-only-integration-operator-ci-regular-gate-handoff`，共 12 个 JSON/Markdown route。

## 验证

新增 `test/auditMinimalReadOnlyIntegrationRoutes.test.ts`，确认 route group 包含 12 个路径、中央 route 表使用 spread 注册、最新 operator/CI handoff JSON/Markdown route 仍然 200，并且安全字段继续保持 `rerunsLiveProbe=false`、`startsJavaService=false`、`startsMiniKvService=false`、`executionAllowed=false`。
