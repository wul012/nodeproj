# Node 控制面能力地图

本图用于后期保养阶段的快速阅读入口。Node 的定位是控制面聚合与质量门禁，不是 Java、mini-kv 或托管审计系统的真实执行器。

## 控制面分区

| 分区 | 代表入口 | 主要职责 | 执行边界 |
| --- | --- | --- | --- |
| audit 基础面 | `src/routes/auditRoutes.ts` | 注册 JSON/Markdown 审计报告、事件摘要和路由目录 | read-only，`executionAllowed=false` |
| access policy | `src/services/accessPolicyProfile.ts` | 描述未来身份、角色和 route policy 合同 | contract-only，不读取真实密钥 |
| route catalog | `src/routes/auditJsonMarkdownRouteGroups.ts` | 把 route 分组为 foundational、managed-audit、credential-resolver、java-mini-kv、minimal-integration、sandbox | 只维护注册表，不启动 sibling service |
| quality gate | `src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/explanationReadabilityCloseoutProfile.ts` | 扫描文档、讲解和目录形态是否达到当前标准，汇总讲解可读性收口状态 | 只读扫描仓库文件 |
| shard preflight | `src/services/productionShardExecutionExternalArtifactIntakeEnvelope.ts` 等 | 记录分片执行前置证据、dry-run 与 blocker | preflight，不声明 production execution |

## 十分钟阅读顺序

1. 从 `docs/architecture/control-plane-map.md` 判断控制面边界。
2. 从 `docs/architecture/quality-gates-map.md` 判断每个 quality gate 扫描什么。
3. 从 `docs/architecture/evidence-flow-map.md` 判断 evidence 从哪里来、是否只读。
4. 从 `docs/architecture/route-service-test-map.md` 找 route、service、test 对照。
5. 从 `docs/architecture/f-folder-explanation-standard-closeout.md` 判断 `f/<version>/解释` 的稳定标准。

## 明确不做的事

- 不启动 Java service。
- 不启动 mini-kv service。
- 不连接真实 managed audit。
- 不写入生产数据。
- 不把 preflight、dry-run、quality gate 报告说成 production execution。

## 后期保养原则

新增控制面能力前，优先确认它能否归入已有 route catalog、quality gate、evidence flow 或 f-folder 标准。重复段落、过大详细讲解章节和 H2 section 指标已经归入 `src/services/markdownDocumentReadabilitySignals.ts`，后续不要在多个 gate 中复制相同规则。只有当旧入口无法表达新的审计缺口时，才新增 route 或 service。
