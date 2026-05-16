# Node v218 managed audit route helper quality pass 代码讲解

## 模块角色

v218 是一次质量收口版本，不是新业务版本。它承接 v217 的 production-hardening readiness gate，把后续真实 adapter wiring 前最容易膨胀的两块先压住：

```text
auditRoutes.ts 重复的 JSON/Markdown route 注册
managedAuditAdapterProductionHardeningReadinessGate.ts 中的 endpoint / digest / message rules
```

本版仍然不连接真实 managed audit，不启动 Java / mini-kv，不打开生产窗口。

## 1. 公共 route registrar

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
function registerAuditJsonMarkdownRoute<TProfile>(
  app: FastifyInstance,
  routePath: string,
  loadProfile: () => TProfile | Promise<TProfile>,
  renderMarkdown: (profile: TProfile) => string,
): void
```

这个函数把原先重复出现的结构合并掉：

```text
schema.querystring.format = json | markdown
const profile = await loadProfile()
format=markdown 时设置 text/markdown
否则返回 JSON profile
```

这样以后新增 audit 类报告时，只要提供 profile loader 和 Markdown renderer，不必复制一整段 schema + reply 分支。

## 2. managed audit 路由迁移

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(
  app,
  "/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate",
  () => loadManagedAuditAdapterProductionHardeningReadinessGate({ config: deps.config }),
  renderManagedAuditAdapterProductionHardeningReadinessGateMarkdown,
);
```

v218 没有改路径，也没有改响应字段。它只是把 managed audit 后半段路由集中迁移到 helper。

本版质量报告记录：

```text
auditRoutesBeforeLineCount=518
auditRoutesAfterLineCount=391
auditRoutesRemovedLineCount=127
managedAuditRouteRegistrationsUsingHelper=13
```

## 3. readiness gate helper

文件：[managedAuditAdapterProductionHardeningReadinessGateHelpers.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterProductionHardeningReadinessGateHelpers.ts)

```ts
export const MANAGED_AUDIT_ADAPTER_PRODUCTION_HARDENING_ENDPOINTS = Object.freeze(...)
export const MANAGED_AUDIT_ADAPTER_PRODUCTION_HARDENING_PREREQUISITES = Object.freeze(...)
export function createManagedAuditAdapterProductionHardeningGateDigest(...)
export function collectReadinessGateProductionBlockers(...)
export function collectReadinessGateWarnings()
export function collectReadinessGateRecommendations()
```

这些内容从 v217 主服务里抽出来后，主服务更像编排层：创建 source archive、Java receipt、mini-kv receipt、checks、summary。helper 则负责可复用的 endpoint 常量、digest 和 message rules。

## 4. 主服务变化

文件：[managedAuditAdapterProductionHardeningReadinessGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterProductionHardeningReadinessGate.ts)

```ts
const gateDigest = createManagedAuditAdapterProductionHardeningGateDigest({
  gateState,
  sourceArchiveDigest: sourceArchive.verification.verificationDigest,
  javaReceiptVersion: javaV78.receiptVersion,
  miniKvReceiptDigest: miniKvV87.receiptDigest,
  checks,
});
```

v218 没有改变 digest 的语义，只是把 digest 生成入口从主服务中移出。测试继续断言 `gateDigest` 是 64 位 hex，并且 v217 endpoint 仍然返回 `ready-for-production-hardening-review`。

## 5. 新增质量报告

文件：[managedAuditRouteHelperQualityPass.ts](D:/nodeproj/orderops-node/src/services/managedAuditRouteHelperQualityPass.ts)

```ts
export function loadManagedAuditRouteHelperQualityPass(input: {
  config: AppConfig;
}): ManagedAuditRouteHelperQualityPassProfile
```

这个 profile 把本版重构结果显式化：

```text
qualityPassState=verified-quality-pass
apiPathsChanged=false
responseShapeChanged=false
javaMiniKvClientsAdded=false
readyForProductionAudit=false
connectsManagedAudit=false
```

这样 v218 不只是“代码变短了”，而是形成了一个可测试、可归档、可解释的质量闭环。

## 6. 测试保护

文件：[managedAuditRouteHelperQualityPass.test.ts](D:/nodeproj/orderops-node/test/managedAuditRouteHelperQualityPass.test.ts)

```ts
expect(profile).toMatchObject({
  qualityPassState: "verified-quality-pass",
  readyForProductionAudit: false,
  connectsManagedAudit: false,
  checks: {
    auditRouteRegistrarExtracted: true,
    readinessGateHelpersExtracted: true,
    apiPathsPreserved: true,
    responseShapePreserved: true,
  },
});
```

测试同时请求：

```text
/api/v1/audit/managed-audit-route-helper-quality-pass
/api/v1/audit/managed-audit-route-helper-quality-pass?format=markdown
/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate
```

也就是说，它不仅测试新质量报告，还回归 v217 gate 路由，确认公共 route registrar 没破坏旧接口。

## 本版项目进度

v218 把 Node 控制面的 managed audit 报告链从“能跑”推进到“更容易继续维护”。下一步按计划不是 Node 继续抢跑，而是推荐并行 Java v79 + mini-kv v88，让两边也补质量回执；只有它们完成后，Node v219 才做 managed audit adapter implementation precheck packet。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditRouteHelperQualityPass.test.ts + test/managedAuditAdapterProductionHardeningReadinessGate.test.ts，7 tests 已通过
全量测试：160 files / 543 tests 已通过
npm run build：已通过
Chrome screenshot：c/218/图片/managed-audit-route-helper-quality-pass-v218.png 已生成
HTTP smoke：127.0.0.1:4327，qualityPassState=verified-quality-pass
HTTP smoke：ready=true，readyForProductionAudit=false，connectsManagedAudit=false，executionAllowed=false，apiPathsChanged=false，responseShapeChanged=false，javaMiniKvClientsAdded=false，routeHelperCount=13，productionBlockers=0，Markdown 200，v217 gate endpoint 仍然返回 ready-for-production-hardening-review
```
