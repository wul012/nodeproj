# 332 - Node v327 read-only cross-project readiness runner

## 版本目标

v327 的目标不是再加一层 `upstream echo verification`，而是把 Node 推到更真实的只读联调层：

```text
Node 读取 Java v150 evidence
Node 读取 mini-kv v142 receipt
Node 汇总 readiness report
Node 证明所有危险副作用仍然关闭
```

这个方向来自 `docs/plans2/v325-post-no-network-safety-fixture-prerequisite-closure-roadmap.md` 的统筹修正：治理链已经够厚，接下来需要证明 Node 能消费真实本地产物。

## 核心代码 1：读取 v326 合同作为 Node 自身来源

`src/services/managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner.ts` 里先调用 v326 loader：

```typescript
const source = loadManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake({
  config,
});
```

然后收窄成 `SourceNodeV326AbortRollbackSemanticsContractReference`。这里没有重新推导 v326 合同，而是复用 v326 已归档的合同结果，避免 digest 和字段语义漂移。

关键断言包括：

```typescript
implementationStillBlocked: source.abortRollbackSemanticsContract.implementationStillBlocked,
abortRollbackExecutionAllowed: source.abortRollbackSemanticsContract.abortRollbackExecutionAllowed,
runtimeShellImplemented: source.runtimeShellImplemented,
executionAllowed: source.executionAllowed,
credentialValueRead: source.credentialValueRead,
rawEndpointUrlParsed: source.rawEndpointUrlParsed,
```

这说明 v327 只消费 v326 结果，不解锁 runtime shell。

## 核心代码 2：读取 Java v150 本地 evidence

Java 输入路径固定为计划里的真实本地产物：

```typescript
const JAVA_V150_EVIDENCE_PATH = "D:/javaproj/advanced-order-platform/d/150/解释/说明.md";
```

读取时不是简单判断文件存在，而是匹配具体证据片段：

```typescript
snippet("java-v150-consumes-node-v326", filePath, "Java v150 接入 Node v326"),
snippet("java-v150-read-only-echo", filePath, "新增只读 echo receipt"),
snippet("java-v150-denies-sql-rollback-network", filePath, "不执行 SQL、部署、回滚、HTTP/TCP"),
```

这让报告能回答两个问题：

```text
Java v150 是否真的对应 Node v326？
Java v150 是否真的保持 SQL / rollback / ledger / network 禁止？
```

如果文件缺失或片段不匹配，`readyForNodeConsumption` 会变成 `false`，v327 fail closed。

## 核心代码 3：读取 mini-kv v142 receipt JSON

mini-kv 输入是结构化 JSON：

```typescript
const MINI_KV_V142_RECEIPT_PATH =
  "D:/C/mini-kv/fixtures/release/credential-resolver-abort-rollback-semantics-contract-non-participation-receipt.json";
```

代码解析关键字段：

```typescript
const releaseVersion = stringAny(receipt, nested, "release_version", "current_release_version");
const readOnly = booleanAny(receipt, nested, "read_only");
const executionAllowed = booleanAny(receipt, nested, "execution_allowed");
const miniKvWriteCommandAllowed = booleanAny(receipt, nested, "mini_kv_write_command_allowed");
const loadRestoreCompactExecuted = booleanAny(receipt, nested, "load_restore_compact_executed");
```

最终必须同时满足：

```typescript
releaseVersion === "v142"
&& readOnly === true
&& executionAllowed === false
&& restoreExecutionAllowed === false
&& miniKvWriteCommandAllowed === false
&& loadRestoreCompactExecuted === false
&& setnxexExecutionAllowed === false
&& abortRollbackAuthority === false
```

这比只读说明文档更硬，因为 mini-kv v142 是机器可验证 JSON。

## 核心代码 4：副作用安全矩阵

v327 单独建了 `ReadOnlyCrossProjectSideEffectSafetyMatrix`：

```typescript
nodeStartsJavaService: false,
nodeStartsMiniKvService: false,
nodeReadsCredentialValue: false,
nodeParsesRawEndpointUrl: false,
nodeSendsHttpRequest: false,
nodeOpensTcpConnection: false,
nodeWritesJavaLedger: false,
nodeExecutesJavaSql: false,
nodeCallsRollback: false,
nodeRunsMiniKvLoad: false,
nodeRunsMiniKvCompact: false,
nodeRunsMiniKvRestore: false,
nodeRunsMiniKvSetnxex: false,
```

这部分是 v327 的关键价值：它不只是说“我读到了两边 evidence”，还明确说明“我没有因为读取 evidence 而产生运行副作用”。

## 核心代码 5：fail closed 检查

`createChecks()` 把 Node、Java、mini-kv 和配置全部纳入：

```typescript
javaV150EvidencePresent: javaV150Evidence.evidencePresent,
javaV150ReadOnlyEchoDocumented: javaV150Evidence.readOnlyEchoDocumented,
miniKvV142ReceiptPresent: miniKvV142Receipt.evidencePresent,
miniKvV142ReleaseVersionMatches: miniKvV142Receipt.releaseVersion === "v142",
miniKvV142ReadOnlyReceipt: miniKvV142Receipt.readOnly === true,
upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
```

最终 `readyForReadOnlyCrossProjectReadinessReport` 由所有检查共同决定。测试里专门覆盖了 evidence 缺失场景，确保缺 Java 或 mini-kv 文件时不会误判 ready。

## 路由与报告

v327 挂到 audit JSON/Markdown 路由表：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-read-only-cross-project-readiness-runner
```

`Renderer` 输出 Markdown，HTTP smoke 同时验证 JSON 和 Markdown 都能返回 200。

## 验证结果

```text
typecheck：通过
focused tests：2 files / 8 tests passed
HTTP smoke：JSON 200 / Markdown 200
Playwright MCP：截图完成
```

## 小结

v327 是一个方向变化明显的版本：从“证明三方理解一致”推进到“Node 读取 Java/mini-kv 本地产物并自动生成 readiness report”。它仍然不真实执行，但已经比纯合同/回执更接近真实联调。
