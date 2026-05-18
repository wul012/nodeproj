# Node v240 运行调试说明：managed audit route registration table quality pass

本版来源计划：

```text
D:\nodeproj\orderops-node\docs\plans\v237-post-readiness-gate-roadmap.md
```

v240 是插入的质量优化版。它不继续抢做 dry-run command package，而是先处理 `auditRoutes.ts` 重复注册和大文件问题。Java / mini-kv 也会并行做类似优化，等三边优化完后再重新对齐证据。

## 本版结果

核心 profile：

```text
managed-audit-route-registration-table-quality-pass.v1
```

质量状态：

```text
qualityPassState=verified-quality-pass
readyForManagedAuditRouteRegistrationTableQualityPass=true
readOnlyQualityPass=true
executionAllowed=false
connectsManagedAudit=false
automaticUpstreamStart=false
```

代码结构变化：

```text
src/routes/auditRoutes.ts
  457 行 -> 29 行

src/routes/auditJsonMarkdownRoutes.ts
  保存 JSON/Markdown route 配置表

src/routes/auditJsonMarkdownRouteRegistrar.ts
  保存共享注册器

src/routes/auditRouteTypes.ts
  保存 AuditRouteDeps / AuditStoreProfileQuery
```

## 关键代码

主入口现在只保留 events / summary / route table 注册：

```text
D:\nodeproj\orderops-node\src\routes\auditRoutes.ts
```

核心调用：

```ts
registerAuditJsonMarkdownRoutes(app, deps, auditJsonMarkdownRoutes);
```

配置表迁移到：

```text
D:\nodeproj\orderops-node\src\routes\auditJsonMarkdownRoutes.ts
```

共享注册器迁移到：

```text
D:\nodeproj\orderops-node\src\routes\auditJsonMarkdownRouteRegistrar.ts
```

新增质量证明服务：

```text
D:\nodeproj\orderops-node\src\services\managedAuditRouteRegistrationTableQualityPass.ts
```

它记录：

```text
auditRoutesBeforeLineCount=457
auditRoutesAfterLineCount=29
directRegisterAuditJsonMarkdownRouteCallsBefore=41
directRegisterAuditJsonMarkdownRouteCallsAfter=1
registrationTableRouteCount=41
```

## 路由

新增路由：

```text
GET /api/v1/audit/managed-audit-route-registration-table-quality-pass
GET /api/v1/audit/managed-audit-route-registration-table-quality-pass?format=markdown
```

代表性旧路由仍保持：

```text
GET /api/v1/audit/store-profile
GET /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification
GET /api/v1/audit/managed-adapter-compliance?format=markdown
```

## 验证

新增测试：

```text
D:\nodeproj\orderops-node\test\managedAuditRouteRegistrationTableQualityPass.test.ts
```

覆盖：

```text
1. v240 quality profile 字段和计数。
2. UPSTREAM_ACTIONS_ENABLED=true 时 blocked。
3. 新质量路由和代表性旧路由仍可访问。
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

v240 把 Node audit 路由注册从“长文件里连续注册”改成“薄入口 + 配置表 + 共享注册器”。这不是功能膨胀，而是为了降低后续 managed audit / sandbox 主线继续增加 profile 时的维护成本。

一句话总结：v240 先把 Node 路由注册的技术债收掉，等 Java / mini-kv 也完成优化后再重新对齐三方证据。
