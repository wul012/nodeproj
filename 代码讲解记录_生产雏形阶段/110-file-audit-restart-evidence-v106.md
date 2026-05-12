# 第一百零六版代码讲解：file audit restart evidence

本版目标是把 v102 的 file-backed audit runtime 从“可配置”推进到“可证明重启恢复”的证据报告。

它不是生产数据库，不做审计轮转、备份、加密或访问控制，也不会修改 Java / mini-kv。它的角色是用 Node 本地 file audit runtime 做一次可复查的恢复演练：写一条合成审计事件，再用新的 file store 实例重新读取，比较 digest 和 requestId。

## 项目进度说明

v106 是“生产雏形阶段”里 audit 方向的小闭环。

前面几个版本的进度是：

```text
v102: audit store factory 支持 memory/file
v104: accessGuard 写入 audit event
v105: operatorIdentity 写入 audit event
v106: file audit runtime 证明这些审计事件能被重新加载
```

完成 v106 后，Node 的审计链从“内存可看”推进到：

```text
accessGuard + operatorIdentity + file-backed reload evidence
```

但它仍然不是生产审计系统，因为：

```text
没有 managed audit store
没有 retention / rotation / backup
没有加密
没有审计查询权限隔离
没有并发写协调和长期运行验证
```

因此 v106 后最合理承接是 v107：用 production readiness summary v4 汇总 v104-v106 之后 access-control 和 audit 缺口减少了多少。

## 入口路由

本版新增只读入口：

```text
src/routes/auditRoutes.ts
```

路由代码是：

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/file-restart-evidence", {
  schema: {
    querystring: {
      type: "object",
      properties: {
        format: { type: "string", enum: ["json", "markdown"] },
      },
      additionalProperties: false,
    },
  },
}, async (request, reply) => {
  const report = createFileAuditRestartEvidenceReport({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
  });

  if (request.query.format === "markdown") {
    reply.type("text/markdown; charset=utf-8");
    return renderFileAuditRestartEvidenceMarkdown(report);
  }

  return report;
});
```

它只读当前 Node 配置和本地 audit file，不接收执行指令，也不调用上游服务。

## 响应模型

核心响应在：

```text
src/services/fileAuditRestartEvidence.ts
```

最外层字段：

```ts
export interface FileAuditRestartEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  evidenceVersion: "file-audit-restart-evidence.v1";
  readyForProductionAudit: false;
  readOnly: true;
  executionAllowed: false;
}
```

关键边界很明确：

```text
readyForProductionAudit=false
readOnly=true
executionAllowed=false
```

这表示它只是恢复证据，不是生产审计许可。

## file runtime 恢复演练

核心流程在 `runRestartRehearsal`：

```ts
const beforeLog = new AuditLog({ capacity: runtime.capacity, store: new FileBackedAuditStore(runtime.auditStorePath, runtime.capacity) });
const beforeEvents = beforeLog.list(runtime.capacity);
beforeLog.record(createSyntheticEventInput(expectedRequestId));
const afterWriteEvents = beforeLog.list(runtime.capacity);
const restoredLog = new AuditLog({ capacity: runtime.capacity, store: new FileBackedAuditStore(runtime.auditStorePath, runtime.capacity) });
const restoredEvents = restoredLog.list(runtime.capacity);
```

这模拟的是：

```text
已有 file audit runtime
 -> 写入一条合成事件
 -> 重新创建 FileBackedAuditStore
 -> 从 JSONL 读取回来
```

这里没有真正重启 Node 进程，但通过“新 store 实例重新加载同一个文件”验证了 file-backed store 的恢复路径。

## digest 检查

本版输出三个 digest：

```ts
digestBefore: digestEvents(beforeEvents),
digestAfterWrite: digestEvents(afterWriteEvents),
digestAfterRestore: digestEvents(restoredEvents),
```

检查规则是：

```ts
digestChangedAfterWrite: rehearsal.digestBefore !== rehearsal.digestAfterWrite,
digestStableAfterRestore: rehearsal.digestAfterWrite === rehearsal.digestAfterRestore,
```

控制面语义：

```text
写入前后 digest 必须变化，说明事件真的写入了
写入后和恢复后 digest 必须一致，说明重新加载没有丢失或改写事件
```

## 合成审计事件

合成事件同时带上 v104 / v105 的成果：

```ts
accessGuard: {
  guardVersion: "access-guard-dry-run.v1",
  mode: "dry-run",
  rejectsRequests: false,
  policyMatched: true,
  policyId: "audit-read",
  routeGroup: "audit",
  requiredRole: "auditor",
  matchedRoles: ["auditor"],
  wouldDeny: false,
  reason: "allowed_by_role",
},
operatorIdentity: {
  identityVersion: "operator-identity-contract.v1",
  authenticated: true,
  operatorId: "audit-restart-rehearsal",
  roles: ["auditor"],
  authSource: "headers",
  rawRoles: ["auditor"],
  rejectedRoles: [],
},
```

这证明 file audit 不只是能存普通 method/path/status，还能保留访问控制和操作员身份雏形。

## memory runtime 边界

如果当前是 memory runtime，报告不会假装可恢复：

```ts
return {
  mode: "memory-runtime-skip",
  writesSyntheticEvent: false,
  writtenEventCount: 0,
  restoredEventCount: 0,
  recoveryVerified: false,
};
```

这防止在本地默认 memory 模式下误判审计持久化已经完成。

## 生产阻断

本版保留两个 blocker：

```ts
{
  code: "MANAGED_AUDIT_STORE_MISSING",
  severity: "blocker",
  message: "File-backed audit restart evidence is not a managed production audit store.",
},
{
  code: "AUDIT_RETENTION_POLICY_MISSING",
  severity: "blocker",
  message: "Production audit still needs retention, rotation, backup, and access policy.",
}
```

也就是说，file runtime 可以作为迁移演练，但不能取代生产审计系统。

## 测试覆盖

测试文件：

```text
test/fileAuditRestartEvidence.test.ts
```

file runtime 断言：

```ts
expect(report).toMatchObject({
  evidenceVersion: "file-audit-restart-evidence.v1",
  readyForProductionAudit: false,
  runtime: {
    runtimeStoreKind: "file",
    storeImplementation: "FileBackedAuditStore",
    durableAtRuntime: true,
  },
  rehearsal: {
    mode: "file-runtime-reload",
    writesSyntheticEvent: true,
    writtenEventCount: 1,
    recoveryVerified: true,
  },
});
```

memory runtime 断言：

```ts
expect(report.rehearsal).toMatchObject({
  mode: "memory-runtime-skip",
  writesSyntheticEvent: false,
  writtenEventCount: 0,
  restoredEventCount: 0,
  recoveryVerified: false,
});
```

这两组测试保证：

```text
file runtime 能证明恢复
memory runtime 不会冒充持久审计
```

## 一句话总结

v106 把 file audit 从“配置可选”推进到“恢复可证”，但继续把 managed audit store、retention、backup 和访问控制列为生产级阻断项。
