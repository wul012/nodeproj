# Quality Gate 命名族地图

本图收敛 Node 控制面的 quality gate 阅读方式。后续新增门禁时，优先沿用同一组命名族，而不是为相近概念创造多个近似名字。

## 命名族规则

| 后缀 | 职责 | 说明 |
| --- | --- | --- |
| `QualityTypes` | 类型、常量、profile contract | 放响应模型、最低门槛、消息类型和扫描范围 |
| `QualityRules` | 单文档或单项规则评价 | 不读目录，只评价传入文本或结构 |
| `QualityScanner` | 仓库文件扫描 | 只读本地文件，不解释业务是否可执行 |
| `QualityGate` | 汇总 checks、summary、blockers、Markdown renderer | 对外提供 JSON/Markdown profile |
| `QualityReportRenderer` | 独立报告渲染器 | 只有当 renderer 足够复杂时才拆出 |

## 当前家族

| 家族 | Types | Rules | Scanner | Gate | Route | Focused tests |
| --- | --- | --- | --- | --- | --- | --- |
| 代码讲解质量 | `src/services/codeWalkthroughDocumentationQualityTypes.ts` | `src/services/codeWalkthroughDocumentationQualityRules.ts` | `src/services/codeWalkthroughDocumentationQualityScanner.ts` | `src/services/codeWalkthroughDocumentationQualityGate.ts` | `/api/v1/audit/code-walkthrough-documentation-quality-gate` | `test/codeWalkthroughDocumentationQualityRules.test.ts`、`test/codeWalkthroughDocumentationQualityGate.test.ts` |
| f 目录讲解质量 | `src/services/fFolderExplanationQualityTypes.ts` | `src/services/fFolderExplanationQualityRules.ts` | `src/services/fFolderExplanationQualityScanner.ts` | `src/services/fFolderExplanationQualityGate.ts` | `/api/v1/audit/f-folder-explanation-quality-gate` | `test/fFolderExplanationQualityRules.test.ts`、`test/fFolderExplanationQualityGate.test.ts` |
| 可读性保养 profile | `src/services/readabilityMaintenanceProfileTypes.ts` | 内联文档规则 | 本地文档读取 | `src/services/readabilityMaintenanceProfile.ts` | `/api/v1/audit/managed-audit-readability-maintenance-profile` | `test/readabilityMaintenanceProfile.test.ts`、`test/auditManagedAuditRouteQualityRoutes.test.ts` |

## 防止命名膨胀

- 同一概念不要同时出现 `DocumentationQuality`、`DocQuality`、`WalkthroughGate` 等并行名字。
- 如果文件名已经表达 family，函数名可以保持 `load*`、`render*Markdown` 的本地惯例。
- 新增 quality gate 前要先说明：旧 gate 为什么不能复用、scanner 是否只读、route 是否会增加审计入口。
- 新增一组 gate 时必须同时补 route、service、test、docs map，否则先停在文档计划。

## 安全边界

所有 quality gate 都是 read-only profile：`executionAllowed=false`、`startsJavaService=false`、`startsMiniKvService=false`。它们可以阻止进一步推进，但不能代替真实批准、不能写入 sibling 项目、不能启动生产执行。
