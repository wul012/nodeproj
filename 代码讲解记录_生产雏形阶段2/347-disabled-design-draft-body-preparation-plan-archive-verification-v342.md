# 347. Node v342：disabled design draft body preparation plan archive verification

## 版本进度

v342 接在 v341 之后，职责是把 v341 的 preparation plan 先做归档验证，而不是直接写 body draft。

这版形成的新闭环是：

```text
Node v341 preparation plan
  -> Node v342 archive verification
  -> Node v343 bounded body draft candidate
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification.ts:1) 是本版主服务。它读取 v341 live profile 和 `d/341` 归档文件，生成 `archiveVerificationState`、`archiveVerification`、`checks`、`summary` 和 blockers。

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationTypes.ts:1) 把 v342 的安全边界固定成类型：`readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate` 可以为 true，但 `readyForDisabledRuntimeShellDesignDraft`、runtime、credential、raw endpoint、HTTP/TCP、Java 写、mini-kv write/admin 仍全部为 false。

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationRenderer.ts:1) 负责 Markdown 输出，展示 source Node v341、archive references、checks、summary、warnings 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1) 新增 v342 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan-archive-verification
```

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification.test.ts:1) 覆盖四类场景：正常 ready、归档缺失 fail closed、上游 probe/action 配置阻断、JSON/Markdown route 输出。

## 核心流程

1. `createSourceNodeV341(...)` 调用 v341 preparation plan，读取 `bodyPreparationPlan.planDigest`、section/evidence/guard/stop 计数和所有安全关闭字段。
2. `createArchiveReferences(...)` 固定读取 `d/341` 的 JSON、Markdown、smoke summary、snapshot、HTML、截图、解释、代码讲解和计划索引。
3. `createChecks(...)` 同时验证 live source 和 archived evidence：v341 ready、archive 文件齐全、digest 一致、Markdown/smoke/截图/讲解/计划都对齐。
4. 只有所有检查都通过时，v342 才把 `readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate` 置为 true。
5. 即便 ready，v342 仍不写 body draft、不实现 runtime、不请求 Java/mini-kv。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：2 files / 8 tests 通过
- full vitest stable mode：275 files / 964 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：JSON 200，Markdown 200，29/29 checks
- 截图：Playwright MCP 因 `file://` 限制失败，已用本机 Chrome headless 回退生成

## 项目成熟度

v342 的价值不是新增真实执行能力，而是把“准备写 body draft 前必须先验证归档”固化成可测试入口。这样后续 v343 即使开始做 body draft candidate，也不会绕过 v341 的证据链、digest、截图、讲解和计划索引。
