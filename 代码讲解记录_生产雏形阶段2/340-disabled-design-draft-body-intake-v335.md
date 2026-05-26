# 340：Node v335 disabled design draft body intake 代码讲解

## 一、版本目标

Node v334 已经把 v333 outline intake 的归档证据验稳。v335 继续推进，但只做一件事：

```text
把 outline section catalog 映射成未来 body draft 前的 intake / readiness 结构。
```

它不是 body draft，更不是 runtime shell implementation。

## 二、类型层的边界

类型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeTypes.ts
```

主 Profile 继续固定危险能力：

```ts
readyForDisabledRuntimeShellDesignDraft: false;
readyForDisabledRuntimeShellDesignDraftOutline: false;
readyForRuntimeShellImplementation: false;
readyForRuntimeShellInvocation: false;
executionAllowed: false;
connectsManagedAudit: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
httpRequestSent: false;
tcpConnectionAttempted: false;
javaSqlExecutionAllowed: false;
miniKvWriteCommandAllowed: false;
automaticUpstreamStart: false;
```

本版唯一正向输出是：

```ts
readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification: boolean;
```

这表示下一版可以验证 v335 归档，而不是现在可以写 body draft。

## 三、服务入口如何消费 v334

服务文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake.ts
```

入口函数：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake(...)
```

它先通过：

```ts
createSourceNodeV334(...)
```

消费：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification(...)
```

因此 v335 不重新访问 Java / mini-kv，也不重新打开真实上游，只消费 v334 的 archive verification 结果。

## 四、body section catalog

v335 没有直接写正文，而是集中定义：

```ts
const BODY_SECTIONS
```

里面共有 8 个 body section，逐一映射 v333 的 outline section：

```text
purpose-and-non-goals-body
input-contract-boundaries-body
credential-handle-boundaries-body
endpoint-handle-boundaries-body
no-network-safety-boundaries-body
abort-rollback-boundaries-body
operator-approval-boundaries-body
verification-and-stop-conditions-body
```

每个 section 都有：

```ts
sourceOutlineSection
requiredEvidence
allowedBodyContent
forbiddenBodyContent
requiresFutureArchiveVerification: true
```

这个 catalog 是本版最重要的防膨胀点：未来即使写 body draft，也应消费这个 catalog，而不是复制一组散乱字段。

## 五、evidence catalog

v335 同时定义：

```ts
const EVIDENCE_CATALOG
```

共有 6 个 evidence item：

```text
node-v334-archive-verification
node-v333-outline-intake-archive
historical-fallback-proof
credential-and-endpoint-handle-proof
no-network-and-side-effect-proof
manual-operator-boundary-proof
```

每个 item 都固定：

```ts
requiredForBodyIntake: true
allowsRuntimeBehavior: false
```

也就是说，这些证据只用于未来正文准备，不允许被解释成 runtime 权限。

## 六、必要性证明

`createNecessityProof()` 明确说明：

```ts
blockerResolved: "outline-archive-verified-but-body-intake-not-yet-declared"
consumer: "Node v336 body intake archive verification"
```

它还说明为什么不能复用 v334：v334 只验证 v333 归档，没有把 outline catalog 映射成 body intake sections 和 evidence requirements。

## 七、body intake record

`createBodyIntake(...)` 生成：

```ts
recordMode: "disabled-runtime-shell-design-draft-body-intake-only"
decision: "archive-disabled-body-intake-before-drafting-body"
bodyScope: "map-outline-sections-to-non-executable-body-intake-only"
bodySectionCatalogVersion: "disabled-runtime-shell-design-draft-body-section-catalog.v1"
evidenceCatalogVersion: "disabled-runtime-shell-design-draft-body-evidence-catalog.v1"
requiresArchiveVerificationBeforeBodyDraft: true
requestsJavaMiniKvEcho: false
readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification: true
```

这里的 `requestsJavaMiniKvEcho=false` 很关键：v335 没有新增需要 Java / mini-kv 回显的跨项目 contract 字段。

## 八、检查项

`createChecks(...)` 覆盖 25 个检查，包括：

```ts
sourceNodeV334Ready
sourceNodeV334AllowsBodyIntakeOnly
sourceNodeV334KeepsDesignDraftClosed
sourceNodeV334KeepsRuntimeAndSideEffectsClosed
necessityProofComplete
bodyIntakeOnly
bodySectionCatalogComplete
bodySectionCatalogMapsOutlineSections
evidenceCatalogComplete
bodyCatalogIsNonExecutable
archiveVerificationRequiredBeforeBodyDraft
noUpstreamEchoRequested
noRuntimeDesignDraftCreated
noRuntimeImplementationCreated
noCredentialValueRead
noRawEndpointUrlParsed
noProviderClientInstantiated
noExternalRequestSent
noJavaOrMiniKvWrites
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

如果 v334 blocked，或者配置打开 upstream probes/actions，v335 会 fail closed。

## 九、路由和测试

路由注册在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake
```

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake.test.ts
```

覆盖：

1. v334 ready 时，只打开 Node v336 archive verification；
2. v334 source archive blocked 时 fail closed；
3. upstream probes/actions 开启时 blocked；
4. JSON / Markdown route 输出正常。

## 十、验证结论

本版验证：

```text
npm.cmd run typecheck：通过
focused vitest：2 files / 8 tests 通过
npm.cmd run build：通过
full vitest stable mode：268 files / 936 tests 通过（--maxWorkers=2）
HTTP smoke：JSON 200，Markdown 200，25/25 checks，8 body sections，6 evidence items，8 stop conditions，0 blockers
```

v335 的价值是把“可以开始考虑正文”继续压成“先建立 body intake catalog 和 evidence catalog”，并要求 v336 先归档验证，避免直接进入正文或实现。
