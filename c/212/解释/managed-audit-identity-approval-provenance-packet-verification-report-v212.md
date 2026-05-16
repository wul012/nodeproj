# Node v212 managed audit identity approval provenance packet verification report

## 本版判断

v212 是 v211 packet 的复核版，不再扩大写入范围。它消费 v211 的本地 dry-run packet 结果，检查：

```text
packet shape
packet digest
verification digest
identity / approval / correlation 字段
Java v75 handoff provenance
mini-kv v84 retention provenance
append/query/digest/cleanup evidence
```

同时按最新计划合并一组轻量质量优化：修正 v205 runtime smoke 中 mini-kv `readCommands` 声明和真实执行命令不一致的问题，并把 runtime smoke 记录统计收敛为单次 counts helper。

## 本版新增

新增服务：

```text
src/services/managedAuditIdentityApprovalProvenancePacketVerificationReport.ts
```

新增接口：

```text
GET /api/v1/audit/managed-identity-approval-provenance-packet-verification-report
GET /api/v1/audit/managed-identity-approval-provenance-packet-verification-report?format=markdown
```

新增测试：

```text
test/managedAuditIdentityApprovalProvenancePacketVerificationReport.test.ts
```

## 质量优化

v205 文件同步优化：

```text
src/services/threeProjectRealReadRuntimeSmokeExecutionPacket.ts
```

优化点：

```text
mini-kv readCommands = SMOKEJSON / INFOJSON / STORAGEJSON / HEALTH
runTarget 使用同一命令常量
smokeSession / summary / createChecks 复用 RuntimeSmokeRecordCounts
```

这样后续 real-read smoke 报告不会再出现声明 `STATSJSON`、实际执行 `SMOKEJSON` 的偏差。

## 安全边界

本版仍然保持：

```text
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionAudit=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
additionalWriteSurfaceAdded=false
javaWriteAttempted=false
miniKvWriteAttempted=false
externalAuditSystemAccessed=false
productionAuditRecordAllowed=false
```

v212 会观察 v211 的本地 dry-run 写入证据，但不新增真实 managed audit、Java 或 mini-kv 写入面。

## 当前验证结果

```text
npm run typecheck：已通过
聚焦测试：managed audit v212 / v211 / v205，3 files / 10 tests 已通过
聚焦复跑：v212 / v205 / live-probe 慢测，4 files / 13 tests 已通过
首次全量测试：154 files / 524 tests 中 3 个既有 live-probe 测试因 5s/10s timeout 抖动失败；单独复跑通过
timeout 稳定性修正后全量测试：154 files / 524 tests 已通过
npm run build：已通过
Chrome screenshot：c/212/图片/managed-audit-identity-approval-provenance-packet-verification-report-v212.png 已生成
HTTP smoke：127.0.0.1:4317，reportState=packet-verification-ready
HTTP smoke：ready=true，readyForProductionAudit=false，localDryRunDirectoryRemoved=true
HTTP smoke：v205Commands=SMOKEJSON,INFOJSON,STORAGEJSON,HEALTH，v205Counts=true，Markdown 200
```

## 下一步

当前计划已调整为“同轮推荐并行”：

```text
Node v212：packet verification report
Java v76：approval handoff verification marker
mini-kv v85：retention provenance replay marker
```

Node v213 应等待 Java v76 和 mini-kv v85 的只读证据完成后，再做 managed audit packet restore drill plan。
