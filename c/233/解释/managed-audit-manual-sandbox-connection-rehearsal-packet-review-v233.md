# Node v233 运行调试说明：manual sandbox connection rehearsal packet review

## 本版目标

Node v233 消费三项已完成证据：

```text
Node v232：ReadOnlyDryRunGuards / SandboxDryRunGuards 类型聚合
Java v89：ContextHeaderField record 组合优化
mini-kv v98：CommandProcessor::execute_with_wal 重复分支收敛
```

本版只生成 `managed-audit-manual-sandbox-connection-rehearsal-packet-review.v1`，仍然不打开 managed audit 连接，不读取 credential value，不执行 schema migration，不写 audit state。

## 关键接口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review
GET /api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review?format=markdown
```

## 关键代码

新增服务：

```text
src/services/managedAuditManualSandboxConnectionRehearsalPacketReview.ts
```

它先复用 v231 的 source verification：

```ts
const sourceVerification = loadManagedAuditManualSandboxConnectionPreflightVerification({ config: input.config });
```

再分别创建三项证据引用：

```ts
const sourceNodeV232 = createNodeV232Reference(evidenceFiles, snippetMatches);
const javaV89 = createJavaV89Reference(evidenceFiles, snippetMatches);
const miniKvV98 = createMiniKvV98Reference(evidenceFiles, snippetMatches, runtimeSmoke, manifest);
```

最终输出的 review 明确保持阻断：

```ts
connectionExecutionAllowed: false,
credentialValueReadAllowed: false,
schemaMigrationExecutionAllowed: false,
managedAuditWriteAllowed: false,
automaticServiceStartAllowed: false,
nodeV233BlocksRealConnection: true,
```

路由注册在：

```text
src/routes/auditRoutes.ts
```

并继续复用 `registerAuditJsonMarkdownRoute`，没有新增手写 JSON/Markdown 分支。

## 上游证据核对

Java v89 核对：

```text
D:\javaproj\advanced-order-platform\src\main\java\com\codexdemo\orderplatform\ops\ContextHeaderField.java
D:\javaproj\advanced-order-platform\代码讲解记录_生产雏形阶段\92-version-89-release-approval-context-header-field.md
```

主要确认：

```text
ContextHeaderField record 存在
from / addMissingWarning / allEchoed 存在
contract-preserving refactor 已说明
不写 approval ledger
不执行 SQL
不读取 credential value
不打开 managed audit connection
```

mini-kv v98 核对：

```text
D:\C\mini-kv\fixtures\release\runtime-smoke-evidence.json
D:\C\mini-kv\fixtures\release\verification-manifest.json
D:\C\mini-kv\代码讲解记录_生产雏形阶段\154-version-98-execute-with-wal-helper.md
```

本版修正了消费端解析：`runtime_write_observed` / `write_commands_executed` 的 smoke 执行结果来自 `verification-manifest.json` 的 `commands.read_only_smoke`，而不是误读 runtime fixture 顶层字段。

## 关键结果

```text
reviewState=manual-sandbox-connection-rehearsal-packet-review-ready
readyForManagedAuditManualSandboxConnectionRehearsalPacketReview=true
readyForManagedAuditSandboxAdapterConnection=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
productionBlockerCount=0
markerSpan=Node v232 + Java v89 + mini-kv v98
```

## 计划同步

`docs/plans/v231-post-preflight-verification-roadmap.md` 已更新：

```text
Node v233 已完成
下一步推荐并行 Java v90 + mini-kv v99
两边完成后 Node v234 做 blocked execution rehearsal
```

## 验证记录

```text
npm run typecheck：通过
聚焦测试：2 个文件 / 6 个用例通过
npm test：174 个文件 / 589 个用例通过
npm run build：通过
HTTP smoke：node dist/server.js 后 /health 与 v233 route 均返回 200
```

HTTP smoke 结果：

```text
reviewState=manual-sandbox-connection-rehearsal-packet-review-ready
ready=true
readyForConnection=false
connects=false
readsCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
blockerCount=0
```

截图：

```text
c/233/图片/managed-audit-manual-sandbox-connection-rehearsal-packet-review-v233.png
```
