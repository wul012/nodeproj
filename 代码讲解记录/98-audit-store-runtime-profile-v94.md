# v94 代码讲解：Audit store runtime profile

## 1. 为什么这版不是“继续堆功能”

v94 的核心是把审计存储的生产差距显式暴露出来。`src/app.ts` 当前仍然是：

```ts
const auditLog = new AuditLog();
```

而 `AuditLog` 默认会使用：

```ts
this.store = options.store ?? new InMemoryAuditStore(this.capacity);
```

所以 Node 现在适合本地调试、safe smoke 和作品展示，但还不能把审计证据称为生产级持久审计。

## 2. profile 用真实代码类名描述当前 store

`src/services/auditStoreRuntimeProfile.ts` 直接引用当前已有实现：

```ts
import { FileBackedAuditStore, InMemoryAuditStore } from "./auditLog.js";
```

然后在 runtime 区域输出：

```ts
runtime: {
  instantiatedBy: "src/app.ts:new AuditLog()",
  defaultStore: InMemoryAuditStore.name,
  defaultCapacity: DEFAULT_AUDIT_CAPACITY,
  durableAtRuntime: false,
  configuredByEnvironment: false,
},
```

这让报告不是泛泛而谈，而是对应当前 Node 启动代码的真实运行状态。

## 3. file-backed 是 prototype，不是生产答案

store 列表里保留 `FileBackedAuditStore`：

```ts
{
  id: "file-backed-prototype",
  implementation: FileBackedAuditStore.name,
  durable: true,
  productionReady: false,
  limitation: "No rotation, encryption, compaction, concurrent writer coordination, or retention policy.",
}
```

这点很关键：文件持久化能证明 adapter 边界，但不能替代生产审计系统。它没有轮转、加密、并发写协调和保留策略。

## 4. 生产阻塞项不是 warning

本版把生产审计差距列为 blockers：

```ts
addMessage(blockers, checks.durableRuntimeConfigured, "AUDIT_RUNTIME_NOT_DURABLE", ...);
addMessage(blockers, checks.databaseStoreConfigured, "DATABASE_AUDIT_STORE_MISSING", ...);
addMessage(blockers, checks.retentionPolicyConfigured, "AUDIT_RETENTION_POLICY_MISSING", ...);
```

因此 endpoint 会返回：

```text
readyForProductionAudit=false
productionBlockerCount=3
executionAllowed=false
```

这符合“靠近生产级”的新规则：发现不足要明确记录，而不是把展示级能力包装成生产级。

## 5. 路由放在 audit namespace 下

`src/routes/auditRoutes.ts` 新增：

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/store-profile", {
```

它和 `/api/v1/audit/summary`、`/api/v1/audit/events` 属于同一个审计域；JSON 用于程序消费，Markdown 用于归档和截图。

## 6. 测试覆盖两层

`test/auditStoreRuntimeProfile.test.ts` 第一层测 service 输出：

```ts
expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
  "AUDIT_RUNTIME_NOT_DURABLE",
  "DATABASE_AUDIT_STORE_MISSING",
  "AUDIT_RETENTION_POLICY_MISSING",
]);
```

第二层测 HTTP 路由：

```ts
expect(markdown.body).toContain("### file-backed-prototype");
expect(markdown.body).toContain("auditStoreRuntimeProfileJson");
```

这保证 v94 既有可读解释，又有可运行接口。
