# 349. Node v344：disabled design draft body draft candidate archive verification

## 版本进度

v344 消费 v343 的 body draft candidate，把它从“刚生成的设计正文候选”推进成“可被下一阶段引用的稳定归档证据”。

核心边界：

```text
验证 v343 归档
不打开 runtime shell
不请求 Java / mini-kv
不读取 credential value
不解析 raw endpoint URL
不发送 HTTP/TCP 到上游
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification.ts:1) 是主服务。它读取 v343 live profile 和 `d/343` 下的归档文件，生成 archive verification digest、检查项、blockers、warnings 和 next actions。

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationTypes.ts:1) 把 v344 的安全边界固定在类型层：`executionAllowed`、`credentialValueRead`、`rawEndpointUrlParsed`、`httpRequestSent`、`tcpConnectionAttempted`、`miniKvWriteCommandAllowed` 等字段都只能是 `false`。

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationRenderer.ts:1) 输出 Markdown，用于审计查看 v343 source、归档文件、checks、summary 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:424) 注册 v344 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate-archive-verification
```

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification.test.ts:1) 覆盖四条路径：正常归档验证、缺归档 fail-closed、上游配置打开时 blocked、JSON/Markdown route 输出。

## 核心流程

1. `createSourceNodeV343(...)` 调用 v343 服务，确认 draft candidate 已 ready，并读取 `candidateDigest`。
2. `createArchiveReferences(...)` 枚举 v343 必需归档文件，包括 JSON、Markdown、smoke summary、snapshot、HTML、截图、说明、代码讲解和计划索引。
3. `createArchiveVerification(...)` 用 v343 digest 和归档文件 digest 计算 v344 `verificationDigest`。
4. `createChecks(...)` 同时校验 live profile、归档 JSON、Markdown、smoke summary、截图/HTML、说明、代码讲解和计划索引。
5. `collectProductionBlockers(...)` 把缺文件、digest 漂移、runtime 边界打开、配置打开等情况全部 fail closed。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：2 files / 8 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：JSON 200，Markdown 200，28/28 checks
- Playwright MCP：HTTP 页面访问 200，已生成 browser snapshot 和截图
- 分块广域 vitest：277 files / 972 tests 通过
- 旧 route 慢测试单独重跑：8 files / 32 tests 通过；一次性全量中的超时归类为测试负载问题，不是 v344 行为回归
- CI 路径兼容修复：`managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview.test.ts` 不再写死 Windows 反斜杠路径，改为 normalize 后断言 historical fixture 目录

## 项目成熟度

v344 的价值不是继续堆治理层，而是把 v343 收成稳定证据。后续计划需要开始朝最小只读真实联调靠近：仍然不读真密钥、不连生产 endpoint、不写 Java 或 mini-kv，但要避免把“证明不会做危险事”本身变成长期终点。
