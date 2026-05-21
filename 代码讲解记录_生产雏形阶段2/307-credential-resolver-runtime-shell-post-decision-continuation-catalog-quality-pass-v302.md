# 307 - Node v302 credential resolver runtime shell post-decision continuation catalog quality pass

## 版本定位

Node v302 是质量优化版本。它利用 Java v136 和 mini-kv v133 并行推进的等待窗口，先把 Node v301 中容易复制的 continuation options 与 necessity proof 抽成共享 catalog。

这版不消费 Java v136 或 mini-kv v133，不做 upstream echo verification，也不实现 runtime shell。

## Catalog 文件

新增 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalog.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalog.ts:1)。

它导出：

```ts
RUNTIME_SHELL_POST_DECISION_CONTINUATION_CATALOG_VERSION
RUNTIME_SHELL_POST_DECISION_CONTINUATION_VERSIONS
createRuntimeShellPostDecisionContinuationPlanIntake
createRuntimeShellPostDecisionContinuationNecessityProof
createRuntimeShellPostDecisionContinuationOptions
```

这样后续 Node v303 如果还需要相同的 continuation options / proof，可以复用 catalog，而不是复制 v301 的构造函数。

## v301 消费 Catalog

[managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts:5) 现在从 catalog 引入：

```ts
createRuntimeShellPostDecisionContinuationNecessityProof
createRuntimeShellPostDecisionContinuationPlanIntake
```

原来 service 内部的 `createContinuationOptions` 和 `createNecessityProof` 已下沉到 catalog。service 自己只保留 source Node v300、checks、messages、summary 等入口职责。

## v302 质量报告

新增 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass.ts:1)。

它输出：

```ts
qualityPassState: "runtime-shell-post-decision-continuation-catalog-quality-pass-ready";
readOnlyQualityPass: true;
consumesJavaV136PostDecisionPlanIntakeEcho: false;
consumesMiniKvV133PostDecisionPlanIntakeReceipt: false;
readyForNodeV303PostDecisionPlanIntakeUpstreamEchoVerification: false;
```

这几个字段明确说明：v302 是 Node 质量优化，不是对 Java/mini-kv 的消费，也不是 v303 的替代。

## v302 的 Checks

`loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass.ts:147) 汇总 19 个检查：

```ts
sourceNodeV301Ready
sourceNodeV301UsesCatalog
nodeV303IsActiveVerificationTarget
legacyNodeV302ReferenceRetainedOnlyForCompatibility
continuationOptionsCataloged
necessityProofCataloged
noJavaV136Consumption
noMiniKvV133Consumption
noRuntimeShellImplementation
noCredentialRead
noExternalRequest
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

全部通过时，`qualityPassState` 才是 ready。

## 路由

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:762) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-catalog-quality-pass
```

## 测试

[managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass.test.ts:10) 覆盖：

- 正向 quality pass。
- upstream probes/actions 打开时阻断。
- JSON / Markdown 路由。

[managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.test.ts:10) 同步确认 v301 现在 active target 是 Node v303。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.test.ts test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass.test.ts
npm test
npm run build
HTTP smoke JSON/Markdown route = 200
Playwright MCP screenshot -> d/302/图片/credential-resolver-runtime-shell-post-decision-continuation-catalog-quality-pass-v302.png
```

全量结果：

```text
235 个测试文件通过
807 个测试用例通过
```

## 下一步

Node v302 完成后，真正的上游回显验证顺延为 Node v303。Node v303 必须等待 Java v136 + mini-kv v133 完成，不能在两边未完成时抢跑。
