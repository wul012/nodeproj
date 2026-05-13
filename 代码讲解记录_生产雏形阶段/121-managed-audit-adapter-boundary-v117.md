# 第一百一十七版代码讲解：managed audit adapter boundary

本版目标是把“真实 managed audit adapter”先拆成稳定边界，而不是直接接数据库。

它不连接数据库、不迁移审计文件、不删除或轮转 JSONL，也不实现 backup/restore drill。本版只回答：

```text
未来真实 managed audit adapter 应该长什么样
当前 runtime 是 memory/file/managed-unimplemented 哪一种
哪些条件还阻止生产审计就绪
```

## 本版所处项目进度

v115 已经有：

```text
managed-audit-readiness-summary.v1
```

它证明本地 file audit、retention/backup 配置、fake adapter contract 已经能组合成审计准备证据。

v117 往前走一步：不再只看 evidence，而是定义未来真实 managed audit adapter 的接口边界。

## 新增服务

新增文件：

```text
src/services/managedAuditAdapterBoundary.ts
```

核心接口是：

```ts
export interface ManagedAuditAdapter {
  appendOnlyWrite(event: unknown): Promise<void>;
  queryByRequestId(requestId: string): Promise<unknown[]>;
  digest(): Promise<string>;
  backupRestoreMarker(): Promise<string>;
}
```

这四个方法对应之前 managed audit contract 已经验证过的能力：

```text
append-only write
query by requestId
digest verification
backup/restore marker
```

所以 v117 的接口不是凭空设计，而是从 v112/v115 的 evidence 反推出来的生产 adapter 形状。

## Runtime 选择

Profile 中输出：

```ts
runtimeSelection: {
  requestedStoreKind: input.config.auditStoreKind,
  currentRuntimeStoreKind: input.runtime.runtimeStoreKind,
  selectedBoundaryRuntime,
  managedStoreUrlConfigured: input.config.auditStoreUrl.length > 0,
  wouldUseManagedAdapter: selectedBoundaryRuntime === "managed-unimplemented",
  fallsBackToCurrentRuntime: selectedBoundaryRuntime !== "managed-unimplemented",
  doesNotOpenNetworkConnection: true,
  doesNotMigrateAuditFiles: true,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
},
```

这里最关键的是两个安全字段：

```text
doesNotOpenNetworkConnection=true
doesNotMigrateAuditFiles=true
```

它们说明本版只是边界定义，不会触碰外部数据库，也不会改现有 audit 文件。

## 三种 runtime 状态

本版明确支持三种状态：

```ts
id: "memory" | "file" | "managed-unimplemented";
```

`memory`：

```text
开发 fallback，重启丢失，不可生产。
```

`file`：

```text
本地 rehearsal 持久化，能做证据链，但仍不是 managed production audit。
```

`managed-unimplemented`：

```text
未来真实数据库 / managed audit service 的占位状态。
```

选择逻辑是：

```ts
if (normalized === "database" || normalized === "postgres" || normalized === "postgresql" || normalized === "managed") {
  return "managed-unimplemented";
}
return currentRuntimeStoreKind;
```

也就是说，`AUDIT_STORE_KIND=database/postgres/managed` 会被解释为“未来要走 managed adapter”，但本版不会真的创建连接。

## 关键检查项

检查项是：

```ts
adapterInterfaceDefined: methods.length === 4,
runtimeSelectionDocumented: selectedBoundaryRuntime === "memory"
  || selectedBoundaryRuntime === "file"
  || selectedBoundaryRuntime === "managed-unimplemented",
memoryRuntimeStateDocumented: supportedRuntimeStates.some((state) => state.id === "memory"),
fileRuntimeStateDocumented: supportedRuntimeStates.some((state) => state.id === "file"),
managedUnimplementedStateDocumented: supportedRuntimeStates.some((state) => state.id === "managed-unimplemented"),
managedStoreUrlConfigured: input.config.auditStoreUrl.length > 0,
realManagedAdapterConnected: false,
backupRestoreDrillImplemented: false,
noDatabaseConnectionAttempted: true,
noAuditMigrationPerformed: true,
upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
```

其中 `realManagedAdapterConnected=false` 和 `backupRestoreDrillImplemented=false` 是本版故意保留的生产硬阻塞。

## HTTP 入口

新增路由：

```text
GET /api/v1/audit/managed-adapter-boundary
GET /api/v1/audit/managed-adapter-boundary?format=markdown
```

路由位置：

```text
src/routes/auditRoutes.ts
```

代码：

```ts
const profile = createManagedAuditAdapterBoundaryProfile({
  config: deps.config,
  runtime: deps.auditStoreRuntime,
});

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderManagedAuditAdapterBoundaryMarkdown(profile);
}
```

因为 v115 已经把 `/api/v1/audit/managed-*` 纳入 audit read policy，所以本路由在 access guard rehearsal 下仍由 auditor 访问。

## 测试覆盖

新增测试：

```text
test/managedAuditAdapterBoundary.test.ts
```

第一组测试 memory runtime：

```ts
expect(profile).toMatchObject({
  profileVersion: "managed-audit-adapter-boundary.v1",
  readyForProductionAudit: false,
  runtimeSelection: {
    selectedBoundaryRuntime: "memory",
    managedStoreUrlConfigured: true,
    doesNotOpenNetworkConnection: true,
    doesNotMigrateAuditFiles: true,
  },
});
```

第二组测试 database-like 配置：

```ts
expect(profile.runtimeSelection).toMatchObject({
  requestedStoreKind: "database",
  selectedBoundaryRuntime: "managed-unimplemented",
  wouldUseManagedAdapter: true,
  fallsBackToCurrentRuntime: false,
  doesNotOpenNetworkConnection: true,
});
```

这证明即使配置形状指向 database，本版也只是报告 `managed-unimplemented`，不会实际构建数据库连接。

第三组测试 HTTP JSON 和 Markdown：

```ts
expect(markdown.body).toContain("# Managed audit adapter boundary");
expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
```

## 运行调试与归档

本版运行了：

```text
npm run typecheck
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

结果：

```text
66 个测试文件通过
241 条测试通过
```

运行归档：

```text
b/117/图片/managed-audit-adapter-boundary.png
b/117/解释/运行调试说明.md
```

## 一句话总结

v117 把 managed audit adapter 从“未来大任务”拆成明确接口和 runtime 边界；当前只定义边界，不连接数据库、不迁移文件，所以真实 adapter 与 backup/restore drill 仍是生产审计硬阻塞。
