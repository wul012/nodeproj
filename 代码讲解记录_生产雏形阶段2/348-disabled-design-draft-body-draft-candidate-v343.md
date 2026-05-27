# 348. Node v343：disabled design draft body draft candidate

## 版本进度

v343 是从“准备写正文”进入“写受限正文 candidate”的一步，但它仍然不是 runtime 实现。

核心边界：

```text
可以写设计文本
不能写可执行 resolver/runtime/provider/client/network/Java write/mini-kv write
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate.ts:1) 是主服务，负责消费 v342 archive verification，生成正文 sections、evidence citations、安全 guards、stop conditions 和 digest。

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateTypes.ts:1) 把 v343 的类型边界写死：`writesDesignBodyText` 可以为 true，但 `implementsRuntimeShell`、`invokesRuntimeShell`、`readsCredentialValue`、`parsesRawEndpointUrl`、`sendsExternalRequest`、`writesJavaState`、`executesMiniKvWriteOrAdmin` 全为 false。

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateRenderer.ts:1) 输出 Markdown，展示 source v342、necessity proof、draft candidate、body sections、evidence citations、guards 和 stop conditions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1) 新增 v343 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate
```

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate.test.ts:1) 覆盖 ready、source blocked、配置阻断、route JSON/Markdown 四种路径。

## 核心流程

1. `createSourceNodeV342(...)` 读取 v342 的 archive verification，确认 v342 已经允许 v343 进入 draft candidate。
2. `createBodySections(...)` 写入 8 段设计正文，但每段都保持 `designTextOnly: true`。
3. `createEvidenceCitations(...)` 把 v335-v342 的链路固化为 8 条 citation，避免正文脱离证据。
4. `createDraftCandidate(...)` 计算 `candidateDigest`，并只开放 `readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification`。
5. `createChecks(...)` 再次断言所有 runtime、credential、raw endpoint、network、Java 写、mini-kv 写/admin 边界关闭。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：2 files / 8 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：JSON 200，Markdown 200，22/22 checks
- `npm.cmd test`：276 files / 968 tests 通过
- 旧 route 慢测试单独重跑：6 files / 24 tests 通过；此前大块分组超时是验证负载问题，不是 v343 行为回归
- 截图：Playwright MCP 因 `file://` 限制失败，已用本机 Chrome headless 回退生成

## 项目成熟度

v343 的意义是把“设计正文”从 runtime 实现中拆开。它让项目可以先沉淀可审核的设计文本，同时继续保持真实连接、secret、provider/client 和上游写操作全部关闭，符合生产前置审查的真实流程。
