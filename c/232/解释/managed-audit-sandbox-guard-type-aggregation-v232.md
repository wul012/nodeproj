# Node v232 运行调试说明：sandbox guard type aggregation

## 本版目标

Node v232 是质量优化版本，不新增业务能力，不打开 managed audit 连接。

本版新增共享类型：

```text
src/services/managedAuditSandboxGuards.ts
```

用于收敛 v225-v231 沙箱链 profile 中重复出现的字段：

```text
readyForProductionAudit=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
restoreExecutionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
storesManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

## 关键结果

```text
新增 ReadOnlyDryRunGuards
新增 SandboxDryRunGuards
新增 LocalDryRunWriteGuard
v225-v231 共 7 个沙箱链 profile 继承共享 guard 类型
运行时 JSON contract 输出字段保持不变
```

## 影响范围

```text
src/services/managedAuditSandboxAdapterDryRunPackage.ts
src/services/managedAuditManualSandboxAdapterConnectionRunbook.ts
src/services/managedAuditManualSandboxConnectionEvidenceChecklist.ts
src/services/managedAuditManualSandboxConnectionOperatorPacket.ts
src/services/managedAuditManualSandboxConnectionPacketVerification.ts
src/services/managedAuditManualSandboxConnectionPreflightGate.ts
src/services/managedAuditManualSandboxConnectionPreflightVerification.ts
```

## 计划同步

`docs/plans/v231-post-preflight-verification-roadmap.md` 已更新：

```text
Node v232 已完成
下一步推荐并行 Java v89 + mini-kv v98
两边完成后 Node v233 消费优化证据
```

## 验证记录

```text
npm run typecheck：通过
聚焦测试：8 个文件 / 24 个用例通过
npm test：173 个文件 / 586 个用例通过
npm run build：通过
HTTP smoke：node dist/server.js 后 GET /health 返回 200
```

## 并行开发说明

本轮只修改 Node 项目。Java v89 已只读确认在 HEAD/tag 上完成；mini-kv v98 正在另一个窗口开发，Node 没有启动、停止、构建、测试或修改 mini-kv。

由于 mini-kv 当前 `runtime-smoke-evidence.json` 已体现 v98 字段，Node 同步调整旧链路的 current runtime fixture 验收：

```text
当前版本：0.98.0 / v98 / c/98/
历史 consumed digest：继续保留 v90 / v95 / v96 / v97 语义
```

这能支持三项目并行推进，同时避免 Node 把上游 current fixture 升版误判为失败。
