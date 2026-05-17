# Node v231 衍生计划：preflight verification 后续阶段

来源版本：Node v231 `managed audit manual sandbox connection preflight verification`。

计划状态：当前唯一有效全局计划。Node v231 已消费 Node v230、Java v88、mini-kv v97，验证 preflight echo marker 与 no-start guard 一致。当前仍未打开 managed audit 连接，未读取 credential value，未执行 schema migration，未写 Java / mini-kv / audit 状态。

## 当前状态

```text
Node v231：
- manual sandbox connection preflight verification ready
- markerSpan=Node v230 + Java v88 + mini-kv v97
- manualWindowFlagName=ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED
- manualWindowOpenByDefault=false
- readyForManagedAuditSandboxAdapterConnection=false
- connectsManagedAudit=false
- readsManagedAuditCredential=false
- schemaMigrationExecuted=false
- automaticUpstreamStart=false

Java v88：
- sandbox connection preflight echo marker ready
- 只读 echo preflight fields / manual window flag / credential handle / schema rehearsal / rollback / timeout / abort marker
- 不写 ledger，不执行 SQL，不读取 credential value

mini-kv v97：
- sandbox connection no-start guard receipt ready
- 保留 v96 marker digest，声明 manual window 默认关闭
- 不被 Node 自动启动，不参与 sandbox connection，不读 credential，不写 managed audit state
```

## 推荐执行顺序

```text
1. 推荐并行：Node v232 + Java v89 + mini-kv v98。
   - Node v232：提取 ReadOnlyDryRunGuards / SandboxDryRunGuards 类型聚合，用一个低风险类型优化收敛 v225-v231 沙箱链的 readOnly / executionAllowed / connectsManagedAudit / credential / schema / auto-start 字段；契约输出字段保持不变。
   - Java v89：ContextHeaderField record 组合优化，收敛 value/source 成对字段构造；不新增 approval 行为，不写 ledger，不执行 SQL。
   - mini-kv v98：execute-with-wal helper 第一版，收敛 SET / SETNXEX / DEL / EXPIRE 的 WAL / no-WAL 重复分支；行为不变，不触碰 snapshot / restore 核心。

2. Node v233：manual sandbox connection rehearsal packet review。
   消费 Node v232 类型聚合结果，并只读核对 Java v89 / mini-kv v98 是否完成优化证据；生成 rehearsal packet review，不打开 managed audit 连接，不读取 credential value。

3. 推荐并行：Java v90 + mini-kv v99。
   - Java v90：context normalization / missing warning helper 收敛，不引入 Lombok，不做全仓风格替换。
   - mini-kv v99：继续 execute-with-wal helper 覆盖剩余低风险写命令或补齐回归测试；不做 dispatch table 大重构。

4. Node v234：manual sandbox connection blocked execution rehearsal。
   消费 Node v233 + 两边优化证据，生成 blocked execution rehearsal，只验证所有危险动作仍被阻断。
```

## 显式质量优化项

```text
Node：
- v232 必须优先处理 ReadOnlyDryRunGuards / SandboxDryRunGuards 类型聚合，不能再让 10+ 个 service 手写同一组 dry-run / no-connection / no-credential / no-schema / no-auto-start 字段。
- auditRoutes 继续使用 registerAuditJsonMarkdownRoute；配置数组化可以评估，但不能牺牲类型清晰度。
- managedAudit* 服务文件接近 800 行时必须拆 helper，不继续堆单文件。
- 旧链路读取 mini-kv current runtime fixture 时，必须验证“当前版本 + 历史 digest 保留”两层语义，不能只写死旧 release_version。

Java：
- v89-v90 优先优化 ContextHeaderField / normalization / missing warning helper。
- 不允许把新 marker 堆进 OpsEvidenceService。
- 不允许新增长布尔参数构造链；字段按 sandbox window / credential boundary / schema rehearsal / rollback path 分组。

mini-kv：
- v98-v99 优先优化 WAL / no-WAL 重复分支，行为保持不变。
- 不允许继续膨胀 command.cpp 主 if-chain。
- 不允许触碰 WAL / snapshot / restore 核心行为。
- v100+ 再评估 command dispatch table / command_read.cpp / command_write.cpp 拆分；这是中风险重构，不和 sandbox guard 语义版本混在一版里。
```

## 合并/并行规则

```text
Node v232、Java v89、mini-kv v98 可推荐并行，因为三者都是低风险内部优化，不互相依赖，也不改变跨项目契约。
Java v90 + mini-kv v99 可推荐并行，因为二者都是各自内部的质量优化。
Node v233 必须等 v232 完成；如果 Java v89 或 mini-kv v98 未完成，则 Node v233 只能记录缺口，不得假装两边证据 ready。
能安全并行、互不阻塞、且同属一个交付闭环的三项目版本，必须写成“推荐并行”，不要拆成难懂的串行步骤。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- 任何优化会改变现有 JSON contract 字段名、字段值或默认阻断语义。

## 一句话结论

```text
v231 已完成 preflight verification；下一轮推荐并行 Node v232 + Java v89 + mini-kv v98，先做低风险质量优化，再推进 sandbox connection rehearsal review。
```
