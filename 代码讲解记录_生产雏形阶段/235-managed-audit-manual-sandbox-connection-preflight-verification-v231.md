# 235 - Node v231 managed audit manual sandbox connection preflight verification

## 一、本版定位

Node v231 是 `v230 preflight gate` 之后的只读 verification 版本。它不打开 managed audit 连接，而是把三条证据链放在一起核对：

- Node v230：连接前 gate。
- Java v88：preflight echo marker。
- mini-kv v97：no-start guard receipt。

目标是确认“连接前字段已经对齐”，同时继续保持真实连接、credential value、schema migration、managed audit write 全部关闭。

## 二、入口代码

新增服务位于：

```text
src/services/managedAuditManualSandboxConnectionPreflightVerification.ts
```

`loadManagedAuditManualSandboxConnectionPreflightVerification()` 是主入口。它先读取 Node v230：

```ts
const sourceGate = loadManagedAuditManualSandboxConnectionPreflightGate({ config: input.config });
```

然后读取 Java / mini-kv 证据文件、snippet 和 mini-kv runtime smoke：

```ts
const evidenceFiles = createEvidenceFiles();
const snippetMatches = createSnippetMatches();
const miniKvEvidence = readMiniKvRuntimeSmokeEvidence();
```

最后组合出：

```ts
const javaV88 = createJavaV88Reference(evidenceFiles, snippetMatches);
const miniKvV97 = createMiniKvV97Reference(evidenceFiles, snippetMatches, miniKvEvidence);
const checks = createChecks(input.config, sourceGate, javaV88, miniKvV97);
```

这里的结构和 mini-kv 的运行证据讲解类似：不是只说“文件存在”，而是引用实际字段和 digest，把消费链锁住。

## 三、Java v88 证据怎么判断

`createJavaV88Reference()` 负责把 Java v88 的说明文档和代码讲解转成 Node 可判断字段：

```ts
markerFieldPresent: snippetMatched(snippets, "java-v88-marker-field"),
readyFieldDocumented: snippetMatched(snippets, "java-v88-ready-true"),
manualWindowClosedByDefault: snippetMatched(snippets, "java-v88-manual-window-closed"),
credentialValueReadByJava: false,
schemaMigrationSqlExecutedByJava: false,
approvalLedgerWrittenByJava: false,
managedAuditConnectionOpenedByJava: false,
```

这里保留了几个显式 `false`，因为这些字段是安全边界，不是普通状态描述。只要后续有人把 Java 侧改成会读 credential 或写 ledger，Node v231 这类 verification 就应该失败。

## 四、mini-kv v97 证据怎么判断

`createMiniKvV97Reference()` 读取的是：

```text
D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json
```

重点字段来自：

```text
managed_audit_sandbox_connection_no_start_guard_receipt
```

本版锁住这些实际值：

```ts
projectVersion: "0.97.0"
releaseVersion: "v97"
consumer: "Node v231 manual sandbox connection preflight verification"
consumedReleaseVersion: "v96"
consumedMarkerDigest: "fnv1a64:b9fc556875ea625b"
receiptDigest: "fnv1a64:9ff902c1a090c0b7"
manualWindowFlagName: "ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED"
manualWindowOpenByDefault: false
nodeAutoStartAllowed: false
javaAutoStartAllowed: false
miniKvAutoStartAllowed: false
```

这和 mini-kv 侧“不是订单权威存储、不是 audit backend、只做 runtime evidence provider”的边界一致。

## 五、核心 checks

`createChecks()` 是本版最重要的安全判断：

```ts
sourceNodeV230PreflightGateReady
javaV88PreflightEchoAccepted
miniKvV97NoStartGuardAccepted
preflightFieldsAlignedAcrossSources
manualWindowClosedAcrossSources
credentialValueStillForbidden
schemaMigrationStillBlocked
externalConnectionStillBlocked
automaticServiceStartStillBlocked
```

最终 ready 的计算仍然是所有 check 都通过：

```ts
checks.readyForManagedAuditManualSandboxConnectionPreflightVerification = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionPreflightVerification")
  .every(([, value]) => value);
```

这个写法的好处是后续新增安全 check 时，不容易忘记纳入总 ready。

## 六、路由接入

路由挂在 `src/routes/auditRoutes.ts`，继续复用共享 JSON/Markdown helper：

```ts
registerAuditJsonMarkdownRoute(
  app,
  "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-verification",
  () => loadManagedAuditManualSandboxConnectionPreflightVerification({ config: deps.config }),
  renderManagedAuditManualSandboxConnectionPreflightVerificationMarkdown,
);
```

这符合前面几版的路由治理规则：不再手写一套 JSON route 和 Markdown route。

## 七、旧链路 fixture 漂移修正

本版还修正了 v223-v229 旧链路对 mini-kv current runtime fixture 的旧值依赖。

mini-kv 当前 runtime smoke 已经是：

```text
project_version=0.97.0
release_version=v97
```

所以 Node 旧链路不能继续只断言 v96。修正后的思路是：

```text
接受当前 v97 runtime fixture
同时验证历史 consumed digest / marker digest 仍被保留
```

这能避免“真实证据已经推进，Node 历史消费层却被旧 release_version 卡死”的问题。

## 八、验证记录

```text
npm run typecheck
通过

聚焦测试：
npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPlan.test.ts test/managedAuditSandboxAdapterDryRunPackage.test.ts test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts test/managedAuditManualSandboxConnectionPacketVerification.test.ts test/managedAuditManualSandboxConnectionPreflightGate.test.ts test/managedAuditManualSandboxConnectionPreflightVerification.test.ts --pool=threads --maxWorkers=4
8 个测试文件通过，24 个用例通过

全量测试：
npm test -- --pool=threads --maxWorkers=4
173 个测试文件通过，586 个用例通过

npm run build
通过
```

HTTP smoke 使用本轮临时 Node 服务执行，服务结束后已停止。关键结果：

```text
healthStatus=ok
verificationState=manual-sandbox-connection-preflight-verification-ready
readyForVerification=true
readyForConnection=false
connectsManagedAudit=false
readsCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
blockerCount=0
markdownHasWarning=true
```

截图文件：

```text
c/231/图片/managed-audit-manual-sandbox-connection-preflight-verification-v231.png
```
