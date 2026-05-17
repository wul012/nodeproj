# Node v229 衍生计划：packet verification 后续阶段

来源版本：Node v229 `managed audit manual sandbox connection packet verification`。

计划状态：已完成并收口。v229 已消费 Node v228、Java v87、mini-kv v96，验证 operator packet 与 Java handoff marker、mini-kv receipt echo marker 一致。Node v230 已完成 manual sandbox connection preflight gate。Java v88 + mini-kv v97 已推荐并行完成。Node v231 已完成 manual sandbox connection preflight verification。当前仍未打开 managed audit 连接，未读取 credential value，未执行 schema migration，未写 Java / mini-kv / audit 状态。下一阶段由 `v231-post-preflight-verification-roadmap.md` 接续。

## 当前状态

```text
Node v229：
- manual sandbox connection packet verification ready
- markerSpan=Node v228 + Java v87 + mini-kv v96
- readyForManagedAuditSandboxAdapterConnection=false
- connectsManagedAudit=false
- readsManagedAuditCredential=false
- schemaMigrationExecuted=false
- automaticUpstreamStart=false

Java v87：
- sandbox connection operator handoff marker ready
- 只读 echo owner artifact / credential handle / schema rehearsal / rollback / timeout / abort marker
- 不写 ledger，不执行 SQL，不读取 credential value

mini-kv v96：
- sandbox connection receipt echo marker ready
- 保留 v95 sandbox adapter receipt digest
- 不连接 sandbox managed audit，不读取 credential value，不写 managed audit state

Node v230：
- manual sandbox connection preflight gate ready
- 新增 manualWindowFlagName=ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED
- manualWindowOpenByDefault=false
- readyForManagedAuditSandboxAdapterConnection=false
- connectsManagedAudit=false
- readsManagedAuditCredential=false
- schemaMigrationExecuted=false
- automaticUpstreamStart=false

Java v88：
- sandbox connection preflight echo marker ready
- 只读 echo Node v230 preflight field / manual window flag / credential handle / schema rehearsal / rollback / timeout / abort marker
- 不写 ledger，不执行 SQL，不读取 credential value，不打开 managed audit 连接

mini-kv v97：
- sandbox connection no-start guard receipt ready
- 保留 v96 marker digest，并声明 manual window 默认关闭
- 不被 Node 自动启动，不参与 sandbox connection，不读 credential，不写 managed audit state

Node v231：
- manual sandbox connection preflight verification ready
- markerSpan=Node v230 + Java v88 + mini-kv v97
- readyForManagedAuditSandboxAdapterConnection=false
- connectsManagedAudit=false
- readsManagedAuditCredential=false
- schemaMigrationExecuted=false
- automaticUpstreamStart=false
```

## 推荐执行顺序

```text
1. 已完成：Node v230：manual sandbox connection preflight gate。
   消费 v229 verification，生成连接前 gate：owner approval artifact id、credential handle name、schema rehearsal id、rollback path id、timeout budget、manual abort marker、manual window flag。
   仍不连接、不读取 credential value、不启动上游、不执行 schema migration。

2. 已完成，推荐并行：Java v88 + mini-kv v97。
   - Java v88：manual sandbox connection preflight echo marker，只读声明 Java 侧需要哪些 preflight 字段，仍不写 ledger、不执行 SQL。
   - mini-kv v97：manual sandbox connection no-start guard receipt，只读声明 mini-kv 仍不会被 Node 自动启动，不参与连接，不读 credential。

3. 已完成：Node v231：manual sandbox connection preflight verification。
   消费 Node v230 + Java v88 + mini-kv v97，只验证 preflight 字段和 no-start guard 是否对齐；仍不打开真实连接。
```

## 合并/并行规则

```text
Node v230 是前置 gate，已完成；不应和 v231 verification 合并。
Java v88 + mini-kv v97 推荐并行，因为二者都是只读 echo/guard marker，不互相依赖。
Node v231 必须等 Java v88 + mini-kv v97 都完成后再消费。
能安全并行、互不阻塞、且同属一个交付闭环的三项目版本，必须写成“推荐并行”，不要拆成难懂的串行步骤。
```

## 质量优化显式待办

```text
Node：
- managedAudit* 服务文件接近 800 行时必须拆 helper，不继续堆单文件。
- audit JSON/Markdown 路由继续使用 registerAuditJsonMarkdownRoute。
- 旧链路读取 mini-kv current runtime fixture 时，必须验证“当前版本 + 历史 digest 保留”两层语义，不能只写死旧 release_version。
- v230/v231 不得直接打开连接；只能做 preflight gate / verification。
- 后续 v232-v235 可插入低风险类型优化：提取 ReadOnlyDryRunGuards / SandboxDryRunGuards 类型聚合，把 readyForProductionAudit=false、executionAllowed=false、connectsManagedAudit=false、readsManagedAuditCredential=false、schemaMigrationExecuted=false、automaticUpstreamStart=false 等沙箱只读字段集中维护；契约字段仍保留在各 profile 输出中。
- 后续 v232-v235 可评估 auditRoutes 配置数组化，但不能牺牲 registerAuditJsonMarkdownRoute；如果泛型/类型擦除风险变大，则先不做。

Java：
- 不允许把新 marker 堆进 OpsEvidenceService。
- 必须沿用 builder / helper / 子 service 拆分。
- 不允许新增长布尔参数构造链；字段按 sandbox window / credential boundary / schema rehearsal / rollback path 分组。
- 后续 v89-v92 可插入低风险优化：用 ContextHeaderField record 或等价小对象收敛 value/source 成对字段构造，降低 ReleaseApprovalRehearsalHintBuilder 长构造调用。
- 后续 v89-v92 可继续提取 context normalization / missing warning helper；不引入 Lombok，不做全仓风格替换。

mini-kv：
- 不允许继续膨胀 command.cpp 主 if-chain。
- 不允许触碰 WAL / snapshot / restore 核心。
- 不允许把 mini-kv 接成 sandbox audit storage backend。
- 不允许被 Node 自动启动，不允许读取 credential，不允许写 managed audit state。
- 后续 v98-v100 可插入低风险优化：收敛 SET / SETNXEX / DEL / EXPIRE 的 WAL / no-WAL 重复分支，优先提取 execute-with-wal helper；必须保持行为不变并用现有命令测试保护。
- 后续 v100+ 再评估 command dispatch table / command_read.cpp / command_write.cpp 拆分；这是中风险重构，不能和 sandbox guard 语义版本混在一版里。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Java v88 / mini-kv v97 未完成时，Node v231 必须停止。

## 一句话结论

```text
v230-v231 已完成连接前 preflight gate + verification；当前计划收口，下一阶段转入 v231-post-preflight-verification-roadmap.md，仍不能打开 managed audit 连接。
```
