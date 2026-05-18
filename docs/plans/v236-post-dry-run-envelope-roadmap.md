# Node v236 衍生计划：dry-run envelope 后续阶段

来源版本：Node v236 `managed audit manual sandbox connection dry-run request envelope`。

计划状态：已完成并收口。Node v236 已消费 Node v235 precondition intake，生成 dry-run request envelope；Java v92 + mini-kv v101 已推荐并行完成；Node v237 已完成 manual sandbox connection readiness gate。后续不在本文件继续追加，改由 `v237-post-readiness-gate-roadmap.md` 接续。

## 当前状态

```text
Node v236：
- manual sandbox connection dry-run request envelope ready
- operatorReviewFieldCount=6
- credentialHandleOnly=true
- credentialValueIncluded=false
- actualConnectionAttempted=false
- schemaMigrationRequested=false
- managedAuditStateWriteRequested=false
- upstreamServiceAutoStartRequested=false
- miniKvPermissionRequested=false
- readyForOperatorReview=true
- readyForManagedAuditSandboxAdapterConnection=false
- readyForProductionAudit=false
- readyForProductionWindow=false

Java v91：
- release approval sandbox connection precondition receipt ready
- 被 Node v235 intake 消费

mini-kv v100：
- current runtime fixture rolling evidence guard ready
- 被 Node v235 intake 和旧链路 rolling guard 消费
```

## 推荐执行顺序

```text
1. 推荐并行：Java v92 + mini-kv v101。
   - Java v92：connection precondition echo verification，只读回显 Node v236 envelope 字段名，验证不含 credential value，不执行 SQL，不写 ledger。
   - mini-kv v101：runtime no-start / no-write evidence follow-up，继续证明 mini-kv 不是 audit storage backend，不被 Node 自动启动；可顺手把 Node v236 consumer hint 固化。

2. Node v237：manual sandbox connection readiness gate。
   消费 Node v236 + Java v92 + mini-kv v101，判断是否具备“申请一次真实沙箱连接窗口”的材料；默认仍关闭，不执行真实连接。

3. Node v238：manual sandbox connection operator window checklist。
   只生成操作员窗口 checklist：谁审批、何时开启、超时多久、如何中止、失败如何回滚；仍不启动上游，不连接 managed audit。
```

## 显式质量优化项

```text
Node：
- v237 只能做 readiness gate，不要直接新增真实 adapter。
- v236 service 保持 envelope 逻辑，不重复读取 Java / mini-kv 证据；继续消费 v235 intake digest。
- auditRoutes 继续使用 registerAuditJsonMarkdownRoute。
- 如果后续 service 继续增长，优先拆 envelope builder / checks / markdown renderer。

Java：
- v92 只回显 Node v236 envelope 字段名，不读取 credential value，不写 ledger，不执行 SQL。
- 继续避免把大块逻辑堆回 OpsEvidenceService。

mini-kv：
- v101 只做 no-start / no-write evidence follow-up，不做 LOAD / COMPACT / RESTORE / SETNXEX 执行。
- mini-kv 继续是 runtime evidence provider，不是 managed audit storage backend。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- 任何版本要打开真实 sandbox connection，但缺少 Java v92 / mini-kv v101 对 v236 envelope 的只读回显证据。

## 收口结果

```text
v236 已把连接前置条件整理成 dry-run request envelope；
Java v92 + mini-kv v101 已补齐只读回显 / no-start no-write follow-up；
Node v237 已消费三方证据并完成 readiness gate；
下一阶段从 Node v238 operator window checklist 另起。
```
