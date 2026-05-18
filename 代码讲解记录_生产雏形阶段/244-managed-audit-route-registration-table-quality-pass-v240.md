# 第二百四十版代码讲解：managed audit route registration table quality pass

本版目标是做一次 Node 质量优化：把 `auditRoutes.ts` 里持续增长的 JSON/Markdown route 注册样板拆成配置表、共享注册器和共享类型。v240 不新增业务能力，不消费 Java / mini-kv 新 evidence，也不打开 managed audit sandbox connection。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v237-post-readiness-gate-roadmap.md
```

原计划下一步是做 disabled dry-run command package，但当前质量诊断指出 Node `auditRoutes.ts` 和 managed audit service 文件持续膨胀。因此 v240 插入优化版：

```text
route registration table quality pass
拆分 auditRoutes.ts 重复注册
保持 API path 和 response shape 不变
不新增 Java / mini-kv 业务 evidence 依赖
```

这也和当前三项目节奏一致：Java / mini-kv 也会做类似优化，三边优化完成后再重新对齐证据。

## 主路由入口瘦身

改动前：

```text
D:\nodeproj\orderops-node\src\routes\auditRoutes.ts
457 行
```

改动后：

```text
D:\nodeproj\orderops-node\src\routes\auditRoutes.ts
29 行
```

现在 `auditRoutes.ts` 只保留三件事：

```ts
app.get("/api/v1/audit/events", ...)
app.get("/api/v1/audit/summary", ...)
registerAuditJsonMarkdownRoutes(app, deps, auditJsonMarkdownRoutes)
```

这让主路由文件重新变成入口，而不是所有 audit profile 注册细节的堆积处。

## 共享类型

新增文件：

```text
D:\nodeproj\orderops-node\src\routes\auditRouteTypes.ts
```

它集中定义：

```ts
export interface AuditRouteDeps {
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  config: AppConfig;
}

export interface AuditStoreProfileQuery {
  format?: "json" | "markdown";
}
```

之前这些类型藏在 `auditRoutes.ts`，导致后续想拆 route table 时会被类型依赖卡住。现在它们是独立模块，可以被 registrar 和 route table 共享。

## 共享注册器

新增文件：

```text
D:\nodeproj\orderops-node\src\routes\auditJsonMarkdownRouteRegistrar.ts
```

它保留原来的 JSON / Markdown 输出行为：

```ts
export function registerAuditJsonMarkdownRoute<TProfile>(
  app: FastifyInstance,
  routePath: string,
  loadProfile: () => TProfile | Promise<TProfile>,
  renderMarkdown: (profile: TProfile) => string,
): void
```

然后新增一个配置项构造器：

```ts
export function auditJsonMarkdownRoute<TProfile>(
  path: string,
  loadProfile: (deps: AuditRouteDeps) => TProfile | Promise<TProfile>,
  renderMarkdown: (profile: TProfile) => string,
): AuditJsonMarkdownRouteRegistration
```

最后统一注册：

```ts
export function registerAuditJsonMarkdownRoutes(
  app: FastifyInstance,
  deps: AuditRouteDeps,
  routes: readonly AuditJsonMarkdownRouteRegistration[],
): void {
  for (const route of routes) {
    route.register(app, deps);
  }
}
```

这让“怎么支持 `?format=markdown`”和“有哪些 profile 路由”彻底分开。

## route table

新增文件：

```text
D:\nodeproj\orderops-node\src\routes\auditJsonMarkdownRoutes.ts
```

它保存 41 个 JSON / Markdown profile 路由，例如：

```ts
auditJsonMarkdownRoute("/api/v1/audit/store-profile", (deps) => createAuditStoreRuntimeProfile({
  currentEventCount: deps.auditLog.summary().total,
  runtime: deps.auditStoreRuntime,
}), renderAuditStoreRuntimeProfileMarkdown)
```

以及 v239 的 route：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification",
  (deps) => loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationMarkdown,
)
```

后续新增 audit profile 时，只需要往这个表里加一项，不要把样板重新塞回 `auditRoutes.ts`。

## 质量证明 profile

新增服务：

```text
D:\nodeproj\orderops-node\src\services\managedAuditRouteRegistrationTableQualityPass.ts
```

profile 版本：

```text
managed-audit-route-registration-table-quality-pass.v1
```

它记录本版结构变化：

```text
auditRoutesBeforeLineCount=457
auditRoutesAfterLineCount=29
directRegisterAuditJsonMarkdownRouteCallsBefore=41
directRegisterAuditJsonMarkdownRouteCallsAfter=1
registrationTableRouteCount=41
registerAuditRoutesLoopCount=1
```

同时确认边界：

```ts
readyForProductionAudit: false
readyForProductionWindow: false
readyForProductionOperations: false
readOnlyQualityPass: true
executionAllowed: false
connectsManagedAudit: false
automaticUpstreamStart: false
```

## 新路由

新增接口：

```text
GET /api/v1/audit/managed-audit-route-registration-table-quality-pass
GET /api/v1/audit/managed-audit-route-registration-table-quality-pass?format=markdown
```

这条路由本身也通过新的 route table 注册，所以它既是质量证明，也是对新注册结构的自检。

## 测试覆盖

新增测试：

```text
D:\nodeproj\orderops-node\test\managedAuditRouteRegistrationTableQualityPass.test.ts
```

覆盖三类场景：

```text
1. profile 记录 v240 route table 优化，且 production audit 仍关闭。
2. UPSTREAM_ACTIONS_ENABLED=true 时进入 blocked。
3. 新质量路由、store-profile、v239 路由、managed-adapter-compliance Markdown 仍可访问。
```

这比只跑一个新路由更稳，因为它抽样验证了：

```text
老基础路由仍在
managed audit sandbox 链路路由仍在
末尾 compliance markdown 路由仍在
```

本轮最终验证：

```text
npm run typecheck：通过
npm test：181 个测试文件、610 个用例全部通过
npm run build：通过
HTTP smoke：通过，/health、新 v240 JSON/Markdown、store-profile、v239 route 均可访问
git diff --check：通过，仅有 CRLF 工作区提示
截图：已保存到 c/240/图片/managed-audit-route-registration-table-quality-pass-v240.png
```

## 边界

本版没有做：

```text
没有改 Java / mini-kv
没有新增业务 evidence 依赖
没有打开 managed audit connection
没有读取 credential value
没有执行 schema migration
没有启动上游服务
没有打开 production window
```

## 成熟度变化

v240 让 Node 的 audit route 层从“功能能跑但文件继续膨胀”推进到“可继续维护的配置化注册”。这类优化短期不增加业务功能，但对生产级项目很关键，因为后续 managed audit / sandbox / dry-run profile 还会继续增长。

## 一句话总结

v240 先把 audit route 注册技术债收掉，避免后续版本继续把 `auditRoutes.ts` 撑大；等 Java / mini-kv 也完成优化后，再重新对齐三项目证据并恢复 dry-run command package 主线。
