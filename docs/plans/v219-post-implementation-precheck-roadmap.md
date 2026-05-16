# Node v219 衍生计划：真实 managed audit adapter 的小步实现准备

来源版本：Node v219 `managed audit adapter implementation precheck packet`。

计划状态：已完成并收口。v219 已消费 Node v218、Java v79、mini-kv v88，完成真实 managed audit adapter wiring 前的最小 precheck；Node v220 已完成 adapter interface + disabled shell；Java v80 + mini-kv v89 已推荐并行完成只读 guard receipt；Node v221 已消费两边证据并完成本地 JSONL adapter candidate dry-run。下一阶段由 `v221-post-local-adapter-candidate-roadmap.md` 接续。

## 阶段原则

```text
先做 adapter interface + disabled implementation shell
再让 Java / mini-kv 推荐并行补只读实现前回执
最后 Node 做本地 file/sqlite candidate 的受控 dry-run，不连接生产外部审计
```

继续保持：

```text
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionAudit=false
readyForProductionWindow=false
restoreExecutionAllowed=false
默认不连接真实外部 managed audit
不执行 Java approval / ledger / SQL / deployment / rollback
不执行 mini-kv LOAD/COMPACT/SETNXEX/RESTORE
```

## 推荐执行顺序

```text
1. Node v220：已完成 managed audit adapter interface + disabled shell。
   定义 ManagedAuditAdapter 接口、disabled adapter、config selection skeleton 和 contract tests。默认 disabled，只能返回 blocked/disabled 状态，不写文件、不连外部审计、不接 Java/mini-kv。

2. 推荐并行：Java v80 + mini-kv v89，已完成。
   - Java v80：managed audit adapter implementation guard receipt。只读说明 Java 侧在 Node adapter shell 存在后仍不创建 approval decision、不写 ledger、不执行 SQL，并给 Node v221 提供 guard digest。
   - mini-kv v89：adapter shell non-storage guard receipt。只读说明 mini-kv 不作为 adapter shell 的存储后端，不新增写/admin/restore 路径，只提供 runtime evidence。

3. Node v221：已完成 managed audit local adapter candidate dry-run。
   消费 Node v220、Java v80、mini-kv v89，做 Node 本地 file/sqlite candidate 的 append/query/digest dry-run。只写 `.tmp` 或明确测试目录；仍不连接真实外部 managed audit，不把 dry-run 记录当生产审计。
```

## 本阶段可合并/并行规则

```text
Node v220 只做 adapter interface + disabled shell，不能把 dry-run candidate 一起塞进去。
Java v80 + mini-kv v89 推荐并行推进，因为二者都是只读 guard receipt，不互相依赖。
Node v221 已等 Java v80 + mini-kv v89 完成后再消费；下一阶段不在本文件继续追加重合版本。
```

## 质量优化插队项

```text
Node v220：
- 已完成 ManagedAuditAdapter interface，只覆盖 append/query/digest/health/describe 的最小形状。
- 已完成 DisabledManagedAuditAdapter 默认实现，append/query/health/describe/digest 均显式返回 disabled，不做任何写入。
- 已完成 selector skeleton：只接受 disabled/local-dry-run candidate；v220 默认选择 disabled，不接受生产外部 URL。

Java v80：
- 继续围绕 OpsEvidenceService 拆分边界做只读 guard，不借机新增写 ledger 或 SQL。

mini-kv v89：
- 继续围绕 command dispatch / runtime evidence guard，不碰 WAL/snapshot/restore 核心。

Node v221：
- 已完成本地 JSONL adapter candidate dry-run，只写 `.tmp/managed-audit-v221-*` 并在验证结束后删除。
- 已消费 Java v80 guard 和 mini-kv v89 non-storage guard，继续保持 `readyForProductionAudit=false`。
- 已新增 post-v221 计划，把真实 managed audit 连接前的 review / migration / credential gate 拆到下一阶段。
```

## 暂停条件

- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要真实外部 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Java 创建真实 approval decision、写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载订单权威状态。
- Node v220 想直接写 `.tmp` dry-run 记录，应推迟到 v221。
- Node v221 发现 Java v80 / mini-kv v89 未完成或证据不足。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v219-v221 已完成 implementation precheck、disabled shell、上游 guard receipt 消费和本地 dry-run candidate；下一阶段进入真实外部 adapter 前的 review/migration/credential 闸门，不直接连接生产审计。
```
