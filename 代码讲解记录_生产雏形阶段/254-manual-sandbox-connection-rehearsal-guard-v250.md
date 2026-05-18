# 第二百五十版代码讲解：manual sandbox connection rehearsal guard

本版目标是把 Node v249、Java v101、mini-kv v110 的安全维护批次收束成一个三项目 rehearsal guard。它不是真实连接版本，而是进入真实 managed audit sandbox connection 前的最后一层人工守卫：证据齐备可以进入“连接决策记录”，但仍不能自动打开连接。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v245-post-sandbox-precheck-roadmap.md
```

计划要求在 Node v249、Java v101、mini-kv v110 都完成后，再由 Node v250 做：

```text
manual sandbox connection rehearsal guard / three-project alignment
```

只读核对结果是三边都已完成：

```text
Node v249: tag v249
Java v101: tag v101订单平台dependabot-security-maintenance
mini-kv v110: tag 第一百一十版Dependabot安全维护
```

所以 v250 可以继续推进。

## rehearsal guard 服务

新增文件：

```text
src/services/managedAuditManualSandboxConnectionRehearsalGuard.ts
```

核心 profile 类型固定了本版的安全边界：

```ts
profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-guard.v1";
guardState: "manual-sandbox-connection-rehearsal-guard-ready" | "blocked";
readyForManagedAuditSandboxAdapterConnection: false;
executionAllowed: false;
connectsManagedAudit: false;
readsManagedAuditCredential: false;
schemaMigrationExecuted: false;
automaticUpstreamStart: false;
```

这组字段的意义是：v250 可以说“rehearsal guard ready”，但不能说“adapter connection ready”。前者是人工演练守卫材料齐备，后者是真实连接能力，仍然为 false。

## 消费 Node v247 / v248

v250 先读取 v247：

```ts
loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification({
  config: input.config,
})
```

再读取 v248：

```ts
loadManagedAuditSandboxCodeHealthPass({
  config: input.config,
})
```

然后压缩成两个 source 摘要：

```ts
readyForPrecheckReceiptVerification: source.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification
readyForCodeHealthPass: source.readyForManagedAuditSandboxCodeHealthPass
connectionStillBlocked: true
```

这说明 v250 不是绕过前面版本，而是继续承接 v247 的上游 receipt verification 和 v248 的 code health pass。

## 消费 Node v249 / Java v101 / mini-kv v110

v250 对三项目安全维护做统一结构：

```ts
interface SecurityMaintenanceReference {
  sourceVersion: "Node v249" | "Java v101" | "mini-kv v110";
  configuredEcosystems: readonly string[];
  weeklySchedule: boolean;
  asiaShanghaiTimezone: boolean;
  minorPatchGrouped: boolean;
  semverMajorIgnored: boolean;
  dependencyVersionsChanged: false;
  runtimeBehaviorChanged: false;
  managedAuditBoundaryChanged: false;
  readyForRehearsalGuard: boolean;
}
```

Node v249 要求：

```text
npm + github-actions
```

Java v101 要求：

```text
maven + github-actions
```

mini-kv v110 要求：

```text
github-actions
```

三者共同要求 weekly、Asia/Shanghai、minor/patch 分组、semver-major ignore，并明确没有升级依赖版本、没有改变 runtime 行为、没有改变 managed-audit 边界。

## Java root-level fallback 修正

本版还修正：

```text
src/services/historicalEvidenceResolver.ts
```

新增映射：

```ts
{
  prefix: "D:/javaproj/",
  fallbackRoot: "fixtures/historical/sibling-workspaces/javaproj/",
}
```

原因是 Java v101 的 Dependabot 文件在 Java git 根：

```text
D:\javaproj\.github\dependabot.yml
```

而不是 Maven 子项目内：

```text
D:\javaproj\advanced-order-platform\.github\dependabot.yml
```

测试新增了 root-level fallback 覆盖，防止 GitHub runner 没有 sibling workspace 时读不到 Java 的 `.github` 证据。

## rehearsalGuard 字段

核心 guard 明确七个必需人工材料：

```ts
ownerApprovalArtifactRequired: true
credentialHandleReviewRequired: true
schemaRehearsalApprovalRequired: true
manualWindowOpenMarkerRequired: true
rollbackPathRequired: true
abortMarkerRequired: true
timeoutPolicyRequired: true
```

同时锁死五个禁止项：

```ts
credentialValueMayBeRead: false
managedAuditConnectionMayOpen: false
schemaMigrationMayExecute: false
nodeMayStartJavaOrMiniKv: false
miniKvMayActAsManagedAuditStorage: false
```

这就是本版的价值：允许“人工连接演练守卫 ready”，但不允许“真实连接已打开”。

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-guard",
  (deps) => loadManagedAuditManualSandboxConnectionRehearsalGuard({ config: deps.config }),
  renderManagedAuditManualSandboxConnectionRehearsalGuardMarkdown,
)
```

这延续 v240 之后的 route table 模式，避免 `auditRoutes.ts` 再次膨胀。

## 测试

新增：

```text
test/managedAuditManualSandboxConnectionRehearsalGuard.test.ts
```

覆盖四类场景：

```text
1. 三项目证据齐备时 guard ready，但真实 connection 仍 false
2. ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true 时走 committed fallback
3. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
4. JSON / Markdown route 通过 route table 暴露
```

同时补：

```text
test/historicalEvidenceResolver.test.ts
```

新增 Java root `.github` fallback 用例。

## 验证

本版聚焦验证：

```text
npm run typecheck
npx vitest run test\historicalEvidenceResolver.test.ts test\managedAuditManualSandboxConnectionRehearsalGuard.test.ts test\managedAuditSandboxCodeHealthPass.test.ts test\dependabotConfig.test.ts
```

最终收口会继续跑：

```text
npm test
npm run build
safe HTTP smoke
Chrome screenshot
```

## 成熟度变化

v250 让三项目从“各自完成安全维护”进入“Node 可统一验证三项目安全维护并生成连接前守卫”的阶段。

但它仍不是生产连接版本：

```text
真实 managed audit connection 未打开
credential value 未读取
schema migration 未执行
Java / mini-kv 未被 Node 启动
mini-kv 未成为 managed audit storage backend
```

下一步如果继续逼近真实联调，应先做 connection decision record，把 owner、credential handle、schema rehearsal、rollback、abort、timeout 的人工确认写成一份可审查记录，再决定是否引入真实 adapter client。

## 一句话总结

v250 把 Node v247-v249、Java v101、mini-kv v110 的证据收成 manual sandbox connection rehearsal guard：三项目准备度可验证，但真实连接仍被硬性阻断，下一步应先做连接决策记录。

## 最终验证补充

收口验证：

```text
npm run typecheck -> passed
npx vitest run test\historicalEvidenceResolver.test.ts test\managedAuditManualSandboxConnectionRehearsalGuard.test.ts test\managedAuditSandboxCodeHealthPass.test.ts test\dependabotConfig.test.ts -> 12 tests passed
npm test -> 190 files / 638 tests passed
npm run build -> passed
safe HTTP smoke -> health ok, guardState=manual-sandbox-connection-rehearsal-guard-ready, connectsManagedAudit=false, readsManagedAuditCredential=false
Chrome screenshot -> c/250/图片/manual-sandbox-connection-rehearsal-guard-v250.png
```

本版 HTTP smoke 只启动 Node，本轮进程已停止；没有启动 Java 或 mini-kv。
