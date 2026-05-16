# Node v213 managed audit packet restore drill plan

## 本版判断

v213 消费：

```text
Node v212：managed audit packet verification report
Java v76：approval handoff verification marker
mini-kv v85：retention provenance replay marker
```

本版只生成 managed audit packet restore drill plan，说明如何人工复查/重建 v211 packet evidence，不执行真实 restore，不连接真实 managed audit，不启动 Java 或 mini-kv。

## 本版新增

新增服务：

```text
src/services/managedAuditPacketRestoreDrillPlan.ts
```

新增接口：

```text
GET /api/v1/audit/managed-audit-packet-restore-drill-plan
GET /api/v1/audit/managed-audit-packet-restore-drill-plan?format=markdown
```

新增测试：

```text
test/managedAuditPacketRestoreDrillPlan.test.ts
```

## 核心输出

核心字段：

```text
profileVersion=managed-audit-packet-restore-drill-plan.v1
drillState=ready-for-manual-dry-run-plan
planMode=manual-dry-run-plan-only
packetSourceVersion=Node v211
verificationSourceVersion=Node v212
javaReceiptVersion=Java v76
miniKvReceiptVersion=mini-kv v85
restoreExecutionAllowed=false
connectsManagedAudit=false
automaticUpstreamStart=false
```

## 证据路径归一化

v213 不再把上游证据提示写成 `D:/...` 本机绝对路径，而是输出项目相对路径：

```text
nodeV211Archive=c/211/
nodeV212Archive=c/212/
javaV76Archive=c/76/
miniKvV85Archive=c/85/
miniKvV85RuntimeSmokeEvidence=fixtures/release/runtime-smoke-evidence.json
miniKvV85VerificationManifest=fixtures/release/verification-manifest.json
```

这只是 v213 输出范围内的归一化，不在本版大范围重写历史 endpoint。

## 安全边界

本版明确禁止：

```text
连接真实 managed audit adapter
把 v211 packet replay 到生产审计存储
创建 Java approval decision
写 Java approval ledger
执行 mini-kv LOAD / COMPACT / SETNXEX / RESTORE
自动启动 Java 或 mini-kv
打开 UPSTREAM_ACTIONS_ENABLED
```

## 当前验证结果

```text
npm run typecheck：已通过
聚焦测试：v213 + v212，2 files / 6 tests 已通过
全量测试：155 files / 527 tests 已通过
npm run build：已通过
Chrome screenshot：c/213/图片/managed-audit-packet-restore-drill-plan-v213.png 已生成
HTTP smoke：127.0.0.1:4318，drillState=ready-for-manual-dry-run-plan
HTTP smoke：ready=true，readyForProductionAudit=false，restoreExecutionAllowed=false
HTTP smoke：javaReady=true，miniKvMarkerDigest=fnv1a64:1ea4570c967cfdb1，evidenceHintsNormalized=true，Markdown 200
```

## 下一步

v211 衍生计划可以在 v213 后收口。下一阶段应另起新计划，优先做：

```text
Node v214：managed audit restore drill archive verification
之后再考虑第一版 dry-run managed audit adapter candidate
```

第一版 adapter 也必须继续 dry-run，不连接真实外部审计系统。
