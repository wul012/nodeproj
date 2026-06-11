# v2043-v2057 代码讲解：disabled candidate upstream echo verification 拆分

本批目标是整治 `managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.ts`。这个文件原来把 route 常量、Node v273 适配、Java v113 snippet 验证、mini-kv v120 receipt 解析、checks、blockers、recommendations、digest 和 profile assembly 全塞在一起，长度约 874 行。

本批不是新的 credential resolver 实现，不读取真实凭证，不解析真实 endpoint，不发外部请求，不写 approval ledger，也不启动 Java 或 mini-kv。它只是把既有 disabled-candidate upstream echo verification 拆成可维护边界。

## 入口和公共导出

公共入口仍然是：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.ts
```

入口现在只保留类型、loader 和 renderer 的兼容导出：

```ts
export type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationTypes.js";

export {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationCore.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationRenderer.js";
```

route 侧仍然从同一个入口导入，所以 `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification` 的 JSON/Markdown 行为没有变化。

## 响应模型

核心 profile 仍然表达三类事实：

```text
sourceNodeV273       Node 自身 disabled implementation candidate review
upstreamEchoes       Java v113 echo receipt 与 mini-kv v120 non-participation receipt
echoVerification     三方边界、数量、接口形状和副作用阻断是否对齐
```

关键安全字段继续保持：

```text
readOnlyUpstreamEchoVerification=true
disabledCandidateEchoVerificationOnly=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionOperations=false
realResolverImplementationAllowed=false
executionAllowed=false
```

## 模块边界

拆分后新增这些实现模块：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationConstants.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationCore.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationPolicy.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationReferences.ts
```

原有 `Types` 和 `Renderer` 继续保留。拆分后的职责是：

```text
Constants   profile version、route path、active plan、Java/mini-kv 证据路径、boundary codes
References  Node v273 source reference、Java v113 snippet reference、mini-kv v120 JSON receipt reference
Policy      createChecks、production blockers、warnings、recommendations
Core        调用 references/policy，计算 digest，组装最终 profile
Entry       兼容导出
```

## 上游证据

本批继续消费既有证据：

```text
Node v273 disabled implementation candidate review
Java v113 disabled implementation candidate echo receipt
mini-kv v120 disabled implementation candidate non-participation receipt
```

Java 和 mini-kv 不需要新版本，也不需要 live service startup。它们在本批里只是只读证据输入。

## 服务层核心流程

core 中的 loader 保持原行为：

```text
createSourceNodeV273(config)
createJavaV113Reference()
createMiniKvV120Reference()
createChecks(config, sourceNodeV273, javaV113, miniKvV120)
sha256StableJson(...)
collectProductionBlockers(checks)
collectWarnings()
collectRecommendations()
return profile
```

references 模块专门处理证据读取。例如 Java v113 侧继续检查 receipt version、review state、boundary code、requirement code、interface shape、fake wiring、workflow template 等 snippet。mini-kv v120 侧继续从 receipt JSON 读取 release version、consumer hint、candidate counts、side-effect flags 和 non-participation flags。

## 安全边界

本批最重要的安全语义是“仍然不执行”：

```text
credentialValueRead=false
rawEndpointUrlParsed=false
externalRequestSent=false
secretProviderInstantiated=false
resolverClientInstantiated=false
schemaMigrationExecuted=false
approvalLedgerWritten=false
automaticUpstreamStart=false
```

policy 模块继续要求 Node、Java、mini-kv 在 candidate counts、boundary scopes、interface shape、fake wiring、credential boundary、raw endpoint boundary、resolver boundary、connection boundary、write boundary 和 auto-start boundary 上对齐。

## 测试覆盖

本批本地验证了直接功能和下游消费：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.test.ts
test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification.test.ts
```

同时通过：

```text
npm run typecheck
npm run build
GitHub Actions Typecheck, Test, Build, safe smoke
```

## 一句话总结

v2043-v2057 把 disabled-candidate upstream echo verification 从一个高耦合大文件拆成常量、证据、策略、核心组装和兼容入口，保持所有三项目只读证据消费与生产阻断语义不变。
