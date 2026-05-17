# 237 - Node v233 managed audit manual sandbox connection rehearsal packet review

## 一、本版定位

Node v233 是 `v231-post-preflight-verification-roadmap.md` 里的 rehearsal packet review 版本。

它不是连接版本，也不是执行版本。它只把前面几个版本的证据拉到同一个 profile 里核对：

```text
Node v231：preflight verification ready
Node v232：SandboxDryRunGuards 类型聚合完成
Java v89：ContextHeaderField refactor 完成
mini-kv v98：execute_with_wal helper 完成
```

本版结论是：review packet 已 ready，但 sandbox connection 仍然不允许打开。

## 二、本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v231-post-preflight-verification-roadmap.md
```

计划要求 Node v233 做：

```text
manual sandbox connection rehearsal packet review
消费 Node v232 类型聚合结果
只读核对 Java v89 / mini-kv v98 优化证据
不打开 managed audit 连接
不读取 credential value
```

这说明项目现在仍处在“生产雏形阶段”的连接前治理链路：材料、边界和证据越来越完整，但真实连接窗口还没打开。

## 三、新增服务文件

新增文件：

```text
src/services/managedAuditManualSandboxConnectionRehearsalPacketReview.ts
```

核心 profile 类型继承了 v232 新增的共享 guard：

```ts
export interface ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-packet-review.v1";
  reviewState: "manual-sandbox-connection-rehearsal-packet-review-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionRehearsalPacketReview: boolean;
  readOnlyReview: true;
  // ...
}
```

这里的 `SandboxDryRunGuards` 来自：

```text
src/services/managedAuditSandboxGuards.ts
```

也就是说 v233 没有再手写一整组：

```text
readyForProductionAudit=false
executionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

类型层已经和 v232 的质量优化连上了。

## 四、复用 v231 作为来源

v233 没有跳过前置 preflight verification，而是先加载 v231：

```ts
const sourceVerification = loadManagedAuditManualSandboxConnectionPreflightVerification({ config: input.config });
```

随后在 `sourceNodeV231` 里固化关键结论：

```ts
readyForPreflightVerification: sourceVerification.readyForManagedAuditManualSandboxConnectionPreflightVerification,
readyForSandboxAdapterConnectionFromSource: sourceVerification.readyForManagedAuditSandboxAdapterConnection,
connectsManagedAudit: sourceVerification.connectsManagedAudit,
readsManagedAuditCredential: sourceVerification.readsManagedAuditCredential,
schemaMigrationExecuted: sourceVerification.schemaMigrationExecuted,
productionBlockerCount: sourceVerification.summary.productionBlockerCount,
```

这段代码的价值是防止 v233 变成“凭空 review”。如果 v231 自己不 ready，v233 会跟着 blocked。

## 五、Node v232 证据怎么核对

v233 读取：

```text
src/services/managedAuditSandboxGuards.ts
```

并检查三个类型是否存在：

```ts
snippet("node-v232-read-only-guards", NODE_V232_GUARD_SOURCE, "export interface ReadOnlyDryRunGuards"),
snippet("node-v232-sandbox-guards", NODE_V232_GUARD_SOURCE, "export interface SandboxDryRunGuards extends ReadOnlyDryRunGuards"),
snippet("node-v232-local-write-guard", NODE_V232_GUARD_SOURCE, "export interface LocalDryRunWriteGuard"),
```

还会扫描沙箱链 7 个 profile 是否都继承了 `SandboxDryRunGuards`：

```ts
const profileContractsUsingSandboxDryRunGuards = SANDBOX_GUARD_PROFILE_PATHS.filter((filePath) => {
  const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  return content.includes("extends SandboxDryRunGuards");
}).length;
```

这不是业务功能，但它让“安全字段一致性”变成可被测试的证据。

## 六、Java v89 证据怎么核对

v233 只读查看 Java 侧：

```text
D:\javaproj\advanced-order-platform\src\main\java\com\codexdemo\orderplatform\ops\ContextHeaderField.java
D:\javaproj\advanced-order-platform\代码讲解记录_生产雏形阶段\92-version-89-release-approval-context-header-field.md
```

关键检查：

```ts
contextHeaderFieldRecordPresent: snippetMatched(snippets, "java-v89-record"),
contextHeaderFieldFactoryPresent: snippetMatched(snippets, "java-v89-from"),
contextHeaderFieldWarningHelperPresent: snippetMatched(snippets, "java-v89-add-warning"),
contextHeaderFieldAllEchoedPresent: snippetMatched(snippets, "java-v89-all-echoed"),
contractPreservingRefactorDocumented: snippetMatched(snippets, "java-v89-contract-preserving"),
```

然后边界字段反向校验：

```ts
approvalLedgerWrittenByJava: !snippetMatched(snippets, "java-v89-no-ledger"),
schemaSqlExecutedByJava: !snippetMatched(snippets, "java-v89-no-sql"),
credentialValueReadByJava: !snippetMatched(snippets, "java-v89-no-credential"),
managedAuditConnectionOpenedByJava: !snippetMatched(snippets, "java-v89-no-connection"),
```

最终 ready 条件要求这些危险行为都为 false：

```ts
&& !reference.approvalLedgerWrittenByJava
&& !reference.schemaSqlExecutedByJava
&& !reference.credentialValueReadByJava
&& !reference.managedAuditConnectionOpenedByJava
```

所以 Java v89 被消费为“质量优化证据”，不是“允许 Node 连接 Java 或 audit 服务”的授权。

## 七、mini-kv v98 证据怎么核对

v233 读取：

```text
D:\C\mini-kv\fixtures\release\runtime-smoke-evidence.json
D:\C\mini-kv\fixtures\release\verification-manifest.json
```

关键代码：

```ts
const versionManifest = recordField(manifest, "version_manifest");
const readOnlySmoke = recordField(recordField(manifest, "commands"), "read_only_smoke");
const scope = stringArrayField(versionManifest, "write_wal_helper_scope");
```

这里有一个细节：`runtime-smoke-evidence.json` 里有 top-level 的 `read_only` / `execution_allowed` / `restore_execution_allowed`，但 `runtime_write_observed` 和 `write_commands_executed` 是 manifest 的 smoke 结果，不在 runtime 顶层。

因此 v233 明确写成：

```ts
runtimeWriteObserved: booleanField(readOnlySmoke, "runtime_write_observed")
  ?? booleanField(runtimeSmoke, "runtime_write_observed")
  ?? true,
writeCommandsExecuted: booleanField(readOnlySmoke, "write_commands_executed")
  ?? booleanField(runtimeSmoke, "write_commands_executed")
  ?? true,
```

这样 Node 消费的是上游真实结构，不会因为字段层级误判 mini-kv v98 不 ready。

## 八、review 为什么仍然不允许连接

最终 review 字段写死了本版边界：

```ts
connectionExecutionAllowed: false,
credentialValueReadAllowed: false,
schemaMigrationExecutionAllowed: false,
managedAuditWriteAllowed: false,
automaticServiceStartAllowed: false,
nodeV233BlocksRealConnection: true,
```

checks 里继续锁住：

```ts
credentialValueStillForbidden: !review.credentialValueReadAllowed,
schemaMigrationStillBlocked: !review.schemaMigrationExecutionAllowed,
externalConnectionStillBlocked: !review.connectionExecutionAllowed,
managedAuditWritesStillBlocked: !review.managedAuditWriteAllowed,
automaticServiceStartStillBlocked: !review.automaticServiceStartAllowed,
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
productionAuditStillBlocked: true,
productionWindowStillBlocked: true,
```

也就是说 v233 只把“材料已经足够进入下一次 blocked rehearsal”讲清楚，不把真实连接提前打开。

## 九、路由接入

路由文件：

```text
src/routes/auditRoutes.ts
```

新增导入：

```ts
import {
  loadManagedAuditManualSandboxConnectionRehearsalPacketReview,
  renderManagedAuditManualSandboxConnectionRehearsalPacketReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionRehearsalPacketReview.js";
```

新增 route：

```ts
registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review", () => loadManagedAuditManualSandboxConnectionRehearsalPacketReview({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionRehearsalPacketReviewMarkdown);
```

这里继续使用 v225 之后统一的 `registerAuditJsonMarkdownRoute`，所以 JSON/Markdown 双格式没有新重复分支。

## 十、测试覆盖

新增测试：

```text
test/managedAuditManualSandboxConnectionRehearsalPacketReview.test.ts
```

覆盖三类情况：

```text
1. 正常 review ready：Node v232 / Java v89 / mini-kv v98 都被接受，生产 blocker 为 0。
2. UPSTREAM_ACTIONS_ENABLED=true：review 立刻 blocked。
3. JSON / Markdown route：HTTP 注入验证 endpoint 和 markdown 内容。
```

关键断言包括：

```ts
expect(profile.connectsManagedAudit).toBe(false);
expect(profile.readsManagedAuditCredential).toBe(false);
expect(profile.rehearsalPacketReview.connectionExecutionAllowed).toBe(false);
```

以及：

```ts
expect(markdown.body).toContain("Node v232 + Java v89 + mini-kv v98");
```

## 十一、验证记录

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionRehearsalPacketReview.test.ts test/managedAuditManualSandboxConnectionPreflightVerification.test.ts
npm test
npm run build
node dist/server.js + /health + v233 route HTTP smoke
```

结果：

```text
typecheck 通过
聚焦测试 2 个文件 / 6 个用例通过
全量测试 174 个文件 / 589 个用例通过
build 通过
HTTP smoke 通过
```

HTTP smoke 关键输出：

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

## 十二、项目成熟度变化

v233 让 managed audit sandbox connection 链路从“preflight verification 已完成”推进到“rehearsal packet review 已完成”。

它的价值不是新增连接能力，而是把下一步 blocked execution rehearsal 的输入变清楚：

```text
Node guard 类型一致
Java header/context 重构证据存在
mini-kv WAL helper 重构证据存在
所有危险动作仍然默认 false
```

一句话总结：

```text
v233 把 Node v232、Java v89、mini-kv v98 的质量优化证据合并成一个只读 review packet，但真实 managed audit 连接仍然关闭。
```
