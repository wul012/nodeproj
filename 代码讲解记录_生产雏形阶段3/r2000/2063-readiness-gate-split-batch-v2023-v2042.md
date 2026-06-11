# v2023-v2042 代码讲解：manual sandbox readiness gate 拆分

本批目标是把 `managedAuditManualSandboxConnectionReadinessGate.ts` 从一个 886 行的混合型 readiness gate 拆成可维护的小模块。它不是新功能授权，不新增路由，不启动 Java 或 mini-kv，也不把 managed audit sandbox connection 变成可执行生产链路。

拆分后的角色很明确：入口文件只保留兼容导出，core 负责 profile 组装，references 负责读取 Node/Java/mini-kv 证据，policy 负责 checks 和消息策略，renderer 负责 Markdown。

## 入口和公共导出

原公共入口仍然是：

```text
src/services/managedAuditManualSandboxConnectionReadinessGate.ts
```

现在它只做三件事：

```ts
export type { ManagedAuditManualSandboxConnectionReadinessGateProfile } from "./managedAuditManualSandboxConnectionReadinessGateTypes.js";
export { loadManagedAuditManualSandboxConnectionReadinessGate } from "./managedAuditManualSandboxConnectionReadinessGateCore.js";
export { renderManagedAuditManualSandboxConnectionReadinessGateMarkdown } from "./managedAuditManualSandboxConnectionReadinessGateRenderer.js";
```

因此外部 route、测试和后续服务仍然从同一个 `.js` 入口导入 loader/renderer，不需要知道内部拆分。

## 模块边界

本批拆出了这些文件：

```text
src/services/managedAuditManualSandboxConnectionReadinessGateConstants.ts
src/services/managedAuditManualSandboxConnectionReadinessGateCore.ts
src/services/managedAuditManualSandboxConnectionReadinessGatePolicy.ts
src/services/managedAuditManualSandboxConnectionReadinessGateReferences.ts
src/services/managedAuditManualSandboxConnectionReadinessGateRenderer.ts
src/services/managedAuditManualSandboxConnectionReadinessGateTypes.ts
```

职责划分如下：

```text
Constants  固定 route、profile version、accepted follow-up、Java/mini-kv 证据路径
Types      profile、source reference、check、message、JSON helper contract
References Node v236、Java v92、mini-kv v101 的证据适配
Policy     readiness checks、blockers、warnings、recommendations
Core       digest、summary、profile assembly
Renderer   Markdown 展示
```

这个边界的重点不是减少行数本身，而是避免以后任何一个证据源变化时都要打开 800 多行混合文件。

## 上游证据

readiness gate 消费的是既有冻结证据：

```text
Node v236 managed audit manual sandbox connection packet
Java v92 managed audit manual sandbox connection receipt
mini-kv v101 no-start/no-write follow-up
```

本批没有要求 Java 或 mini-kv 新增版本。Java 和 mini-kv 可以继续并行推进，Node 只是把已有证据解析逻辑移动到 references 模块。

## 服务层流程

核心 loader 的流程保持不变：

```text
createSourceNodeV236(config)
createJavaV92Reference()
createMiniKvV101Reference()
createChecks(...)
sha256StableJson(...)
collectProductionBlockers(...)
collectWarnings()
collectRecommendations()
return profile
```

拆分后，core 不再知道每个 Java snippet 和 mini-kv JSON 字段怎么读；它只拿 references 的结构化结果，再组装 readiness profile。

## 安全边界

本批没有打开任何生产行为：

```text
executionAllowed=false
connectsManagedAudit=false
externalRequestSent=false
approvalLedgerWritten=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

这些字段继续由 profile 和 policy 双重表达。拆分只改变代码组织方式，不改变 gate 判断。

## 测试覆盖

本批本地验证覆盖直接 gate 和下游消费者：

```text
test/managedAuditManualSandboxConnectionReadinessGate.test.ts
test/managedAuditManualSandboxConnectionOperatorWindowChecklist.test.ts
test/managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.test.ts
test/managedAuditManualSandboxConnectionPreconditionIntake.test.ts
```

同时通过：

```text
npm run typecheck
npm run build
GitHub Actions Typecheck, Test, Build, safe smoke
```

## 一句话总结

v2023-v2042 把一个可运行但不可维护的 readiness gate 拆成稳定入口和清晰内部模块，保持所有只读与生产阻断语义不变，为后续继续拆治理链路降低成本。
