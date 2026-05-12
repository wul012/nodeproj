# Node v102：audit store factory file runtime 代码讲解

## 1. 本版目标与系统定位

v99 把 `audit` 列为生产阻塞项，v100-v101 先推进 access-control。v102 回到 audit 硬缺口：

```text
之前：FileBackedAuditStore 只是原型类
现在：运行时可以通过 AUDIT_STORE_KIND=file 实际选择 FileBackedAuditStore
```

这不是生产数据库版本，而是一次可验证的 file runtime 迁移 rehearsal。

## 2. 入口路由或入口函数

真正的运行时入口在 `src/app.ts`：

```ts
const auditStoreRuntime = createAuditStoreRuntime(config);
const auditLog = auditStoreRuntime.auditLog;
```

注册审计路由时，把 runtime 描述传进去：

```ts
await registerAuditRoutes(app, { auditLog, auditStoreRuntime: auditStoreRuntime.description, config });
```

这样 `/api/v1/audit/store-profile` 不再猜测当前 store，而是读取真实 runtime 描述。

## 3. 响应模型与核心字段

运行时 profile 更新在 `src/services/auditStoreRuntimeProfile.ts`：

```ts
runtime: {
  instantiatedBy: "src/app.ts:createAuditStoreRuntime(config)",
  defaultStore: runtime.storeImplementation,
  defaultCapacity: runtime.capacity,
  durableAtRuntime: runtime.durableAtRuntime,
  configuredByEnvironment: runtime.configuredByEnvironment,
  requestedStoreKind: runtime.requestedStoreKind,
  runtimeStoreKind: runtime.runtimeStoreKind,
  auditStorePath: runtime.auditStorePath,
}
```

关键字段含义：

```text
defaultStore=FileBackedAuditStore
 -> 当前进程真的用了 file-backed store。

durableAtRuntime=true
 -> 审计事件会写入 JSONL 文件，可以用于重启恢复 rehearsal。

configuredByEnvironment=true
 -> 运行时 store 由 AUDIT_STORE_KIND / AUDIT_STORE_PATH 决定。

readyForProductionAudit=false
 -> file-backed 仍不等于生产级审计。
```

## 4. 服务层核心逻辑

新增 factory 在 `src/services/auditStoreFactory.ts`：

```ts
export function createAuditStoreRuntime(
  config: Pick<AppConfig, "auditStoreKind" | "auditStorePath" | "auditStoreUrl">,
): AuditStoreRuntime {
  const description = describeAuditStoreRuntime(config);
  const store = createStore(description);

  return {
    auditLog: new AuditLog({ capacity: description.capacity, store }),
    store,
    description,
  };
}
```

它先生成描述，再创建 store，最后把 store 注入 `AuditLog`。

file 模式要求路径：

```ts
if (normalizedStoreKind === "file") {
  if (config.auditStorePath.length === 0) {
    throw new Error("AUDIT_STORE_PATH is required when AUDIT_STORE_KIND=file");
  }

  return {
    runtimeStoreKind: "file",
    storeImplementation: FileBackedAuditStore.name,
    durableAtRuntime: true,
    configuredByEnvironment: true,
    auditStorePath: config.auditStorePath,
  };
}
```

数据库模式明确不做：

```ts
if (normalizedStoreKind === "database") {
  throw new Error("AUDIT_STORE_KIND=database is not implemented in this version");
}
```

这比“静默退回 memory”更安全，因为用户一旦请求 database，就不能给出假生产安全感。

## 5. 阻断、预警与安全边界

v102 会减少一个 audit blocker：

```ts
durableRuntimeConfigured: runtime.durableAtRuntime
```

当 `AUDIT_STORE_KIND=file` 时，`AUDIT_RUNTIME_NOT_DURABLE` 不再出现。但仍保留：

```text
DATABASE_AUDIT_STORE_MISSING
AUDIT_RETENTION_POLICY_MISSING
```

原因是 file-backed JSONL 只能支持本地重启恢复 rehearsal，不具备生产审计需要的加密、备份、轮转、查询权限、并发写协调。

配置 profile 也同步更新：

```ts
const fileRuntimeConfigured = normalizedStoreKind === "file" && auditStorePathConfigured;
durableStoreWiringImplemented: fileRuntimeConfigured,
currentRuntimeStillInMemory: !fileRuntimeConfigured,
```

## 6. 测试覆盖

新增测试在 `test/auditStoreFactory.test.ts`。

默认 memory：

```ts
expect(runtime.description).toMatchObject({
  runtimeStoreKind: "memory",
  storeImplementation: "InMemoryAuditStore",
  durableAtRuntime: false,
  configuredByEnvironment: false,
});
```

file runtime 重启恢复：

```ts
const restored = createAuditStoreRuntime({
  auditStoreKind: "file",
  auditStorePath: filePath,
  auditStoreUrl: "",
});

expect(restored.auditLog.list().map((event) => event.requestId)).toEqual(["req-file"]);
```

真实 app wiring：

```ts
expect(profile.json()).toMatchObject({
  runtime: {
    defaultStore: "FileBackedAuditStore",
    durableAtRuntime: true,
    configuredByEnvironment: true,
    runtimeStoreKind: "file",
  },
});
```

这些测试防止回归到“有 FileBackedAuditStore 类，但 app 仍总是 new AuditLog() 默认 memory”的状态。

## 7. 一句话总结

v102 让 Node 的 audit store 具备了真实可配置 file runtime 和重启恢复测试，但仍把 production audit 阻塞保留下来，避免把本地 JSONL 误包装成生产审计系统。
