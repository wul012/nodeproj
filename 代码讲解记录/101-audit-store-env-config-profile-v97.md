# v97 代码讲解：Audit store env config profile

## 本版目标与系统定位

v97 接着 v94 的 audit store runtime profile 往生产级靠近。v94 已经说明当前运行时使用 `InMemoryAuditStore`，生产审计还缺 durable store；v97 不急着切换存储，而是先把环境配置边界定义清楚。

本版定位是：

```text
Node 控制面审计配置证据
 -> 解释 AUDIT_STORE_KIND / AUDIT_STORE_PATH / AUDIT_STORE_URL
 -> 标记当前 runtime 仍未接入 durable store
 -> 不连接数据库，不迁移数据，不替换 AuditLog
```

这样做的意义是先把生产缺口变成可检查契约，避免后续直接把数据库连接塞进运行时。

## 入口路由

入口在 `src/routes/auditRoutes.ts`：

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/store-config-profile", {
```

路由只读取配置并生成 profile：

```ts
const profile = createAuditStoreEnvConfigProfile({
  auditStoreKind: deps.config.auditStoreKind,
  auditStorePath: deps.config.auditStorePath,
  auditStoreUrl: deps.config.auditStoreUrl,
});
```

这里没有写审计文件，没有连接数据库，也没有把 `AuditLog` 的 store 切到新实现。它只是把环境变量如何被解释、为什么还不能生产化讲清楚。

## 响应模型与核心字段

核心模型在 `src/services/auditStoreEnvConfigProfile.ts`：

```ts
export interface AuditStoreEnvConfigProfile {
  readyForDurableAuditMigration: boolean;
  readOnly: true;
  executionAllowed: false;
  config: {
    requestedStoreKind: string;
    normalizedStoreKind: "memory" | "file" | "database" | "unknown";
    runtimeStillUsesDefaultInMemoryStore: true;
  };
```

关键字段语义：

```text
readyForDurableAuditMigration=false
```

表示当前配置和运行时还不足以进入真实 durable audit 迁移。

```text
runtimeStillUsesDefaultInMemoryStore=true
```

表示 `src/app.ts` 仍然走默认 `new AuditLog()`，不会因为设置了环境变量就悄悄切换存储。

```text
executionAllowed=false
```

表示这个 endpoint 不是迁移执行入口，也不是数据库初始化入口。

## 服务层核心逻辑

配置读取在 `src/config.ts`：

```ts
auditStoreKind: readString(env, "AUDIT_STORE_KIND", "memory").toLowerCase(),
auditStorePath: readString(env, "AUDIT_STORE_PATH", ""),
auditStoreUrl: readString(env, "AUDIT_STORE_URL", ""),
```

这里先把环境变量纳入统一 config，但还不用于构造 `AuditLog`。运行时实际创建仍在 `src/app.ts`：

```ts
const auditLog = new AuditLog();
```

这就是 v97 要强调的边界：配置 profile 已经能描述未来迁移目标，但真实 store wiring 还没有实现。

store kind 归一化逻辑是：

```ts
if (value === "memory" || value === "in-memory") {
  return "memory";
}
if (value === "file" || value === "jsonl") {
  return "file";
}
if (value === "database" || value === "postgres" || value === "postgresql") {
  return "database";
}
```

这让后续版本可以支持更友好的环境变量写法，同时仍然把未知值作为 blocker。

## 阻断、预警与安全边界

生产阻断项集中在：

```ts
addMessage(blockers, normalizedStoreKind !== "memory", "AUDIT_STORE_KIND_MEMORY", ...);
addMessage(blockers, checks.durableStoreWiringImplemented, "AUDIT_STORE_RUNTIME_NOT_WIRED", ...);
addMessage(blockers, !checks.migrationRequiredBeforeProduction, "AUDIT_STORE_MIGRATION_REQUIRED", ...);
```

这三类 blocker 分别说明：

```text
memory 不是生产审计存储
runtime 还没有真的接入 durable store
迁移测试和回滚证据还没做
```

数据库 URL 只做脱敏展示：

```ts
url.username = "redacted";
url.password = "redacted";
```

所以即使未来配置了 `AUDIT_STORE_URL`，Markdown 和 JSON profile 也不会暴露真实密码。

## 测试覆盖

测试文件是 `test/auditStoreEnvConfigProfile.test.ts`。

默认 memory 场景断言：

```ts
expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
  "AUDIT_STORE_KIND_MEMORY",
  "AUDIT_STORE_RUNTIME_NOT_WIRED",
  "AUDIT_STORE_MIGRATION_REQUIRED",
]);
```

database 场景断言 URL 被脱敏：

```ts
expect(profile.config.auditStoreUrlRedacted)
  .toBe("postgres://redacted:redacted@localhost:5432/orderops");
```

HTTP 测试则验证 Markdown endpoint：

```ts
url: "/api/v1/audit/store-config-profile?format=markdown",
```

这些测试防住两类回归：一是误把环境变量解释成已完成迁移，二是把数据库密码暴露到证据报告。

## 一句话总结

v97 把 audit store 的生产迁移配置边界提前固化成只读 evidence，明确当前仍是 in-memory runtime，并为后续真正实现 durable audit store factory、重启恢复测试和审计保留策略铺路。
