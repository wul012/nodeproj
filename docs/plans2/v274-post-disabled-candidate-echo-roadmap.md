# Node v274 衍生计划：disabled candidate 验证后的小步生产化前置

来源版本：Node v274 `credential resolver disabled candidate upstream echo verification`。

计划状态：当前唯一有效全局计划。v272 衍生计划已完成 Node v273、Java v113、mini-kv v120、Node v274；本计划已完成 Java v115、mini-kv v121、Node v275、Node v276、Node v277、Node v278、Node v279、Node v280；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v273：disabled implementation candidate review 已完成；10 个 boundary 分类为 4 个 disabled-candidate-ready 和 6 个 approval-required。
Java v113：只读 echo receipt 已完成，并把 ReleaseApprovalEchoMarkerSupport 升级为 echo workflow template。
Java v114：verification hint catalog split 已完成，作为质量上下文记录。
mini-kv v120：disabled candidate non-participation receipt 已完成，仍不做 resolver / secret provider / credential / raw endpoint / storage / restore。
Node v274：disabled candidate upstream echo verification 已完成；三方 counts、boundary scopes、interface shape、fake wiring 和 no-side-effect 边界对齐。
Java v115：credential resolver approval-required boundary echo refinement 已完成；6 个 approval-required boundary 的只读解释已补强，继续复用 echo workflow template。
mini-kv v121：approval-required boundary non-participation receipt 已完成；明确不实现 resolver、不读 credential、不解析 raw endpoint、不写 storage、不执行 LOAD / COMPACT / RESTORE / SETNXEX。
Node v275：approval-required boundary upstream echo verification 已完成；三方 approval-required boundary codes、requirement codes、prohibited runtime actions 和 no-side-effect 边界对齐。
Node v276：statusRoutes security split quality pass 已完成；10 条 `/api/v1/security/*` 只读路由迁入 `statusSecurityRoutes.ts`，`statusRoutes.ts` 降到约 1784 行，但仍高于 1200 行目标。
Node v277：statusRoutes deployment + connection readiness split quality pass 已完成；7 条 deployment / connection readiness 只读路由迁入 `statusDeploymentRoutes.ts`，`statusRoutes.ts` 降到约 1619 行。
Node v278：statusRoutes production readiness summary split quality pass 已完成；13 条 `/api/v1/production/readiness-summary*` 只读路由迁入 `statusReadinessSummaryRoutes.ts`，`statusRoutes.ts` 降到约 1295 行。
Node v279：statusRoutes rollback readiness split quality pass 已完成；4 条 rollback readiness 只读路由迁入 `statusRollbackRoutes.ts`，`statusRoutes.ts` 降到约 1245 行。
Node v280：statusRoutes live-probe split quality pass 已完成；23 条 live-probe / real-read smoke 只读路由迁入 `statusLiveProbeRoutes.ts`，`statusRoutes.ts` 降到约 896 行。
```

## 推荐执行顺序

```text
1. 已完成：推荐并行 Java v115 + mini-kv v121。

   Java v115：credential resolver approval-required boundary echo refinement。
   - 只读强化 6 个 approval-required boundary 的解释：CREDENTIAL_HANDLE、ENDPOINT_HANDLE、OPERATOR_APPROVAL、ROLLBACK_BOUNDARY、SCHEMA_MIGRATION_POLICY、AUDIT_LEDGER_WRITE_POLICY。
   - 继续使用 v113 的 echo workflow template，不允许新增 600-800 行重复 support。
   - 不写 approval ledger，不执行 SQL，不读取 credential value，不解析 raw endpoint，不打开 managed audit connection。

   mini-kv v121：approval-required boundary non-participation receipt。
   - 只读强化 6 个 approval-required boundary 的 non-participation receipt。
   - 明确 mini-kv 不实现 resolver、不读 credential、不解析 raw endpoint、不写 storage、不执行 LOAD / COMPACT / RESTORE / SETNXEX。

   并行理由：
   - Java v115 和 mini-kv v121 都只消费 Node v274 的只读 verification evidence。
   - 两边写入不同仓库、不同职责域，不互相依赖。

2. 已完成：Node v275 approval-required boundary upstream echo verification。
   - 已消费 Java v115 + mini-kv v121。
   - 已验证 6 个 approval-required boundary 在三项目中的解释一致。
   - 仍不实现真实 resolver，不读取 credential value，不解析 raw endpoint，不打开 managed audit connection。

3. 已完成：Node v276 statusRoutes split quality pass 第二步。
   - 已迁移 10 条 security readiness 路由。
   - 已保持 API path / response shape 不变。
   - 已修复 `/api/v1/status-routes/*` access policy 覆盖。

4. 已完成：Node v277 statusRoutes split quality pass 第三步。
   - 已拆 `statusRoutes.ts`，迁移 deployment + connection readiness 这组稳定只读路由。
   - 保持 API path / response shape 不变。
   - 不与 credential resolver 业务闭环混成一版。

5. 后续候选：Node v278 statusRoutes split quality pass 第四步。
   - 已拆 production readiness summary 这组稳定只读路由。
   - 已保持 API path / response shape 不变。

6. 后续候选：Node v279 statusRoutes split quality pass 第五步。
   - 已拆 rollback readiness 这组稳定只读路由。
   - 已保持 API path / response shape 不变。

7. 已完成：Node v280 statusRoutes split quality pass 第六步。
   - 已拆 live-probe route group。
   - 已迁移 23 条 `/api/v1/production/live-probe*` 只读 JSON/Markdown route。
   - 保持 API path / response shape 不变。

8. 后续候选：Node v281 statusRoutes split quality pass 第七步。
   - 若继续 Node 质量线，先评估 remaining real-read window route group 是否仍值得拆。
   - 不迁移包含 POST、本地 ledger 写入或审批状态变更的 route，除非单独作为 ledger route 拆分版。
   - 不和 credential resolver 业务能力混成一版。
```

## 显式质量优化项

```text
Node：
- v275 已按 service/types/renderer/test 拆分，继续保持新 service 不回到单文件膨胀模式。
- route 继续放入 auditJsonMarkdownRoutes，不新增手写 JSON/Markdown route 样板。
- Node Strangler 第二步：v276 已把 `statusRoutes.ts` 从约 2002 行降到约 1784 行；v277 可继续拆 deployment + connection readiness 路由。
- Node Strangler 第三步：v277 已把 `statusRoutes.ts` 降到约 1619 行；下一步如继续拆，优先选择 rollback runbook / production readiness summary，不要混入业务功能。
- Node Strangler 第四步：v278 已把 `statusRoutes.ts` 降到约 1295 行；下一步如继续拆，优先选择 rollback runbook / live-probe route group。
- Node Strangler 第五步：v279 已把 `statusRoutes.ts` 降到约 1245 行；下一步如继续拆，优先选择 live-probe route group。
- Node Strangler 第六步：v280 已把 `statusRoutes.ts` 降到约 896 行；后续再拆前先判断收益，优先只拆 remaining real-read window route group，不再为了版本号拆过小 route。
- Node 大文件第二战场：`dashboard.ts` 约 2093 行，后续质量版再拆，不和 v275 业务验证混在一版。
- 文档写入规则：从 v275 起，运行截图和解释写入 `d/<版本>/`，代码讲解写入 `代码讲解记录_生产雏形阶段2/`，新计划继续写入 `docs/plans2/`。

Java：
- Java v115 必须继续复用 v113 echo workflow template，避免 echo support 反向膨胀。
- Java Strangler 第二步：`ReleaseApprovalRehearsalResponseRecords.java` 仍是后续高优先级拆分项。
- Java `ReleaseApprovalVerificationHintBuilder.java` 已由 v114 优化过，后续只在必要时继续拆。
- 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

mini-kv：
- mini-kv v121 只做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
- 不执行 LOAD / COMPACT / RESTORE / SETNXEX / 写命令，不成为 managed audit storage backend。
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
- v281 若需要修改 Java、mini-kv、打开真实 resolver、读取 credential value 或执行真实上游请求，必须停止并重新出计划。

## 一句话结论

```text
v274 后的 Java v115 + mini-kv v121 + Node v275 已完成，只读 approval-required boundary 证据已对齐；Node v276-v280 已完成 security、deployment + connection readiness、production readiness summary、rollback readiness、live-probe 路由拆分；下一步仍不是打开真实 resolver，而是先判断是否继续拆 remaining real-read window route group。
```
