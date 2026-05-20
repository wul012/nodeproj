# Node v282 衍生计划：approval-required upstream echo 后的实现计划阶段

来源版本：Node v282 `approval required implementation readiness echo verification`。

计划状态：当前唯一有效全局计划。上一份 `docs/plans2/v280-post-status-routes-quality-roadmap.md` 已完成 Node v281、Java v116 + mini-kv v122、Node v282，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v282：已完成 approval-required implementation readiness upstream echo verification；23/23 检查通过，强制 historical fixture fallback 已覆盖。
Node v283 前置质量拆分：dashboard.ts strangler 第一步已完成；入口降为 23 行，样式 / markup / browser script 已拆到独立模块，不改变 UI 行为。
Node v283 前置质量拆分续：opsPromotionArchiveRenderers.ts 已拆成 base / handoff / release-deployment renderer 模块，原文件保留 36 行 barrel 导出。
Node v283 前置质量拆分收口：opsSummaryRoutes.ts 已把 promotion archive 路由迁入 opsPromotionArchiveRoutes.ts；主入口降到约 315 行，archive 子路由约 455 行，不改变 API 路径。
Node v283：managed audit resolver implementation plan draft 已完成；生成 7 个接口边界、Java v121 / mini-kv v126 并行 echo 要求和 Node v284 / v285 后续门禁，仍不实现真实 resolver。
Java v116：已完成 approval-required implementation readiness echo。
Java v117-v120：已自发完成测试拆分优化；当前 HEAD/tag 为 v120订单平台ops-evidence-service-test-suite-split，工作区干净。
mini-kv v122：已完成 approval-required implementation non-participation readiness receipt。
mini-kv v123-v125：已自发完成 SMOKEJSON / formatter / receipt split 优化；当前 HEAD/tag 为 第一百二十五版测试解析器壳回执拆分，工作区干净。
三项目当前都不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v283 前置质量拆分：dashboard.ts strangler 第一步。已完成。
   - 只拆 dashboard 静态资源边界，不改变 UI 行为。
   - `src/ui/dashboard.ts` 保留为组合入口。
   - `src/ui/dashboardStyles.ts`、`src/ui/dashboardMarkup.ts`、`src/ui/dashboardClientScript.ts` 分别承载 CSS、HTML 主体、浏览器脚本。
   - 这是 v283 功能版之前的维护性前置，不占用 Java / mini-kv 主流程。

2. Node v283 前置质量拆分续：opsPromotionArchiveRenderers.ts strangler 第一步。已完成。
   - 只拆 markdown renderer 聚合，不改变 archive / handoff / release-deployment 输出内容。
   - `src/services/opsPromotionArchiveRenderers.ts` 保留为 barrel re-export，不改既有导入方。
   - `src/services/opsPromotionArchiveBaseRenderers.ts`、`src/services/opsPromotionArchiveHandoffRenderers.ts`、`src/services/opsPromotionArchiveReleaseDeploymentRenderers.ts` 分别承载基础归档、交接链、发布部署链 renderer。

3. Node v283 前置质量拆分收口：opsSummaryRoutes.ts promotion archive 子路由拆分。已完成。
   - `src/routes/opsSummaryRoutes.ts` 只保留 summary/readiness、promotion decision、checkpoint/baseline、runbook/handoff 等路由入口。
   - `src/routes/opsPromotionArchiveRoutes.ts` 承载 promotion archive 全链路 JSON/Markdown 路由和 artifact 构造。
   - 路由路径、返回结构和 markdown 输出保持不变，并新增挂载回归测试。
   - 当前不继续拆 315/455 行级别文件，避免为了拆分而碎片化。

4. Node v283：managed audit resolver implementation plan draft。已完成。
   - 只写实现计划草案，不写真实 resolver / adapter。
   - 明确接口边界、config handle、credential handle、endpoint handle、approval artifact、failure taxonomy、rollback guard、test-only fake harness。
   - 消费 Node v282 的三方 echo verification，并把 Java v117-v120、mini-kv v123-v125 的优化状态记录为“已完成但不改变主流程边界”。
   - 必须继续验证 forced historical fixture fallback。
   - 不发 HTTP/TCP，不读取 credential value，不解析 raw endpoint URL，不实例化 secret provider 或 resolver client。
   - 输出推荐并行 Java v121 + mini-kv v126；Node v284 必须等两边 echo 完成后再推进。

5. 推荐并行：Java v121 + mini-kv v126。
   Java v121：resolver implementation plan echo。
   - 只读回显 Node v283 的 plan draft。
   - 说明 Java 侧后续若进入实现，需要哪些 operator approval / schema rehearsal / ledger policy artifact。
   - 可继续小范围测试/record 拆分优化，但不能写 ledger、不能执行 SQL、不能打开 managed audit connection。

   mini-kv v126：resolver implementation plan non-participation receipt。
   - 只读证明 mini-kv 仍不参与 credential resolver、secret provider、managed audit storage backend。
   - 可继续小范围 formatter / receipt / test helper 拆分优化，但不能执行 LOAD / COMPACT / RESTORE / SETNXEX / 写命令。

   并行理由：
   - Java v121 和 mini-kv v126 都只消费 Node v283 的计划草案。
   - 两边写入不同仓库、不同职责域，不互相依赖。
   - 这两版可以在 Node v283 完成后并行推进，不需要 Node 抢跑。

6. Node v284：resolver implementation plan upstream echo verification。
   - 只消费 Java v121 + mini-kv v126 的只读回显。
   - 验证三方对 implementation plan 的禁止动作、artifact 缺口、fake harness 边界一致。
   - 仍不实现真实 resolver，不建立真实连接。

7. Node v285：test-only fake resolver harness precheck。
   - 只允许 test-only fake harness precheck。
   - fake harness 不能读取 credential value，不能解析 raw endpoint，不能连接外部 managed audit。
   - 输出后续 Java / mini-kv 是否需要只读 echo 的判断；如果需要，应写成推荐并行，不拆成模糊的“或”。
```

## 显式质量优化项

```text
Node：
- dashboard.ts strangler 第一步已完成；后续若继续拆 UI，应按面板组继续拆 `dashboardMarkup.ts` / `dashboardClientScript.ts`，不要把入口文件重新写胖。
- opsPromotionArchiveRenderers.ts strangler 第一步已完成；后续若继续拆 renderer，应优先拆 `opsPromotionArchiveReleaseDeploymentRenderers.ts`，不要把 barrel 文件重新写胖。
- opsSummaryRoutes.ts promotion archive 拆分已完成；短期停止继续拆 315/455 行级别文件，下一步回到 v283 主流程。
- v283 新 service 必须继续拆成 types / renderer / service / test，避免 700+ 行单文件反向膨胀。
- 新增历史证据消费时，同版补 forced historical fixture fallback 测试；不能只依赖 loadConfig。
- HTTP smoke 若 blocked，先 dump false checks / evidencePresent / verificationDocumented，再改代码。
- statusRoutes 质量线已达标，短期不继续拆；dashboard.ts 可作为后续独立质量版，不要混进 v283-v285 主流程。

Java：
- Java v117-v120 的测试拆分优化已完成，后续继续沿用小范围 strangler 模式。
- 若 Java v121 执行，只做 plan echo + 必要小优化，不新增 600-800 行 echo support。

mini-kv：
- mini-kv v123-v125 的拆分优化已完成，后续继续保持 non-participation receipt 轻量化。
- 若 mini-kv v126 执行，只做 plan non-participation receipt + 必要小优化，不触碰 WAL/snapshot/restore 核心语义。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider 或真实 credential resolver client。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。

## 一句话结论

```text
v282 已把 Node v281、Java v116、mini-kv v122 的 approval-required implementation readiness 证据闭环；Java v117-v120 和 mini-kv v123-v125 又完成了各自优化；Node 已先做 dashboard.ts、opsPromotionArchiveRenderers.ts、opsSummaryRoutes.ts 前置质量拆分，并完成 Node v283 implementation plan draft。下一步不是 Node v284 抢跑，而是推荐并行 Java v121 + mini-kv v126，再由 Node v284 做三方 plan echo verification。
```
