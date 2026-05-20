# Node v274 衍生计划：disabled candidate 验证后的小步生产化前置

来源版本：Node v274 `credential resolver disabled candidate upstream echo verification`。

计划状态：当前唯一有效全局计划。v272 衍生计划已完成 Node v273、Java v113、mini-kv v120、Node v274；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v273：disabled implementation candidate review 已完成；10 个 boundary 分类为 4 个 disabled-candidate-ready 和 6 个 approval-required。
Java v113：只读 echo receipt 已完成，并把 ReleaseApprovalEchoMarkerSupport 升级为 echo workflow template。
Java v114：verification hint catalog split 已完成，作为质量上下文记录。
mini-kv v120：disabled candidate non-participation receipt 已完成，仍不做 resolver / secret provider / credential / raw endpoint / storage / restore。
Node v274：disabled candidate upstream echo verification 已完成；三方 counts、boundary scopes、interface shape、fake wiring 和 no-side-effect 边界对齐。
```

## 推荐执行顺序

```text
1. 推荐并行：Java v115 + mini-kv v121。

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

2. Node v275：approval-required boundary upstream echo verification。
   - 等 Java v115 + mini-kv v121 完成后推进。
   - 验证 6 个 approval-required boundary 在三项目中的解释是否一致。
   - 仍不实现真实 resolver，不读取 credential value，不解析 raw endpoint，不打开 managed audit connection。

3. Node v276：statusRoutes split quality pass 第二步。
   - 若 v275 完成且没有新上游依赖，做 Node 质量版。
   - 继续拆 `statusRoutes.ts`，只迁移一组稳定只读路由，保持 API path / response shape 不变。
   - 不与 credential resolver 业务闭环混成一版。
```

## 显式质量优化项

```text
Node：
- v275 若新增 service/types/renderer/test，继续从一开始拆分类型和 renderer。
- route 继续放入 auditJsonMarkdownRoutes，不新增手写 JSON/Markdown route 样板。
- Node Strangler 第二步：`statusRoutes.ts` 仍约 2000 行，v276 优先继续拆，只迁移稳定只读路由。
- Node 大文件第二战场：`dashboard.ts` 约 2093 行，后续质量版再拆，不和 v275 业务验证混在一版。

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
- Java v115 / mini-kv v121 未完成时，Node v275 必须停止。

## 一句话结论

```text
v274 后下一步不是打开真实 resolver，而是先让 Java v115 + mini-kv v121 并行强化 6 个 approval-required boundary 的只读证据，再由 Node v275 做三方验证；随后 Node v276 可做 statusRoutes 第二步质量拆分。
```
