# 329. Node v324 no-network safety fixture upstream echo verification

## 版本进度

v324 接在 v323 之后。v323 只定义 no-network safety fixture contract；Java v149 只读 echo 该 contract；mini-kv v141 提供 non-participation receipt。本版消费三边证据，判断 `no-network-safety-fixture` 是否已经具备 closure review 的输入，但不直接关闭它，也不打开真实连接。

对应计划是：

```text
D:\nodeproj\orderops-node\docs\plans2\v322-post-endpoint-handle-prerequisite-closure-roadmap.md
```

## 代码结构

本版没有继续把逻辑塞进路由文件，而是按现有拆分模式新增四个文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationTypes.ts      231 行
src/services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification.ts           617 行
src/services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationRenderer.ts   155 行
test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification.test.ts              302 行
```

`auditJsonMarkdownRoutes.ts` 只新增一次 route registration：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification
```

这保持了“路由只注册，业务在 service”的边界。

## 核心代码讲解

`loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification(...)` 是入口。它依次构建：

```typescript
const sourceNodeV323 = createSourceNodeV323(input.config);
const javaV149 = createJavaV149Reference(sourceNodeV323);
const miniKvV141 = createMiniKvV141Reference(sourceNodeV323);
const checks = createChecks(input.config, sourceNodeV323, javaV149, miniKvV141);
```

这里的设计重点是：Node 自己不去启动 Java/mini-kv，而是读取已经归档的证据文件。Java 侧用 snippet/evidence 文件确认 v149 echo，mini-kv 侧用 JSON receipt 读取 `credential_resolver_no_network_safety_fixture_contract_non_participation_receipt`。

`createSourceNodeV323(...)` 复用 v323 的 service 输出，把 contract digest、required/prohibited/no-go counts、上游版本、side-effect false 状态收进当前 profile：

```typescript
contractDigest: contract.contractDigest,
nextJavaVersion: source.nextJavaVersion,
nextMiniKvVersion: source.nextMiniKvVersion,
nextNodeVerificationVersion: source.nextNodeVerificationVersion,
networkSafetyFixtureExecuted: source.networkSafetyFixtureExecuted,
httpRequestSent: source.httpRequestSent,
tcpConnectionAttempted: source.tcpConnectionAttempted,
```

这让 v324 不复制 v323 的 contract 生成逻辑，只消费其结果。

`createJavaV149Reference(...)` 读取 Java v149 的 test/support/catalog/说明/讲解记录，核心检查包括：

```typescript
snippet("java-v149-contract-digest", JAVA_V149_TEST, sourceNodeV323.contractDigest)
snippet("java-v149-required-count", JAVA_V149_TEST, "summary().requiredFieldCount()).isEqualTo(10)")
snippet("java-v149-prohibited-count", JAVA_V149_TEST, "summary().prohibitedFieldCount()).isEqualTo(12)")
snippet("java-v149-no-fixture", JAVA_V149_TEST, "networkSafetyFixtureExecuted()).isFalse()")
snippet("java-v149-no-http", JAVA_V149_TEST, "httpRequestSent()).isFalse()")
snippet("java-v149-no-tcp", JAVA_V149_TEST, "tcpConnectionAttempted()).isFalse()")
```

也就是说，Java 不是“口头说完成”，而是通过实际测试代码里的字段、digest、边界 false 证明它确实只读 echo。

`createMiniKvV141Reference(...)` 读取 mini-kv 的 standalone receipt：

```typescript
const root = readJsonObject(MINI_KV_V141_RECEIPT);
const receipt = objectField(root, "credential_resolver_no_network_safety_fixture_contract_non_participation_receipt");
const sourceNode = objectField(receipt, "source_node_v323_reference");
const contract = objectField(sourceNode, "no_network_safety_fixture_contract");
```

它直接校验 `contract_digest`、字段数量、consumer hint、`ready_for_node_v324_no_network_safety_fixture_upstream_echo_verification=true`，并锁住 mini-kv 的非参与边界：

```typescript
networkSafetyFixtureExecuted === false
networkSafetyAuthority === false
httpRequestSent === false
tcpConnectionAttempted === false
networkSocketOpened === false
loadRestoreCompactExecuted === false
setnxexExecutionAllowed === false
auditAuthoritative === false
orderAuthoritative === false
```

`createChecks(...)` 是本版的核心判定层。它不只看文件存在，还要求三类事实同时成立：

```typescript
upstreamEchoesAligned
noNetworkSafetyFixtureContractAligned
sideEffectBoundariesAligned
```

只有 Node v323 ready、Java v149 ready、mini-kv v141 ready、三方 digest/count/side-effect 全对齐，`readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification` 才会变成 true。

## 历史 fallback

本版补入了 Java v149 和 mini-kv v141 的历史冻结证据：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/...
fixtures/historical/sibling-workspaces/mini-kv/...
```

测试里显式设置：

```typescript
process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true";
```

并断言 resolved path 落在 `fixtures/historical/sibling-workspaces` 下。这样 GitHub runner 即使没有 `D:\javaproj` 和 `D:\C\mini-kv`，也能验证 v324。

## 验证结果

通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake.test.ts
npm run build
HTTP JSON smoke 200
HTTP Markdown smoke 200
Playwright MCP screenshot
```

全量 `npm test` 在本机并发下出现 4 个历史路由测试 timeout；这 4 个文件单独成组复跑通过，所以归类为本地全量并发预算抖动，不是 v324 逻辑失败。

## 成熟度判断

v324 的价值不是新增执行能力，而是把 no-network safety fixture 从“Node 自己定义”推进到“三项目都已只读理解并签收”。它仍然属于生产前治理链，不是 runtime shell、不是真实 managed audit connection、不是 provider/client 实现。

下一步 Node v325 可以基于 v324 做 closure review：如果 no-network-safety-fixture 被关闭，剩余前置项会只剩 `abort-rollback-semantics`。这离真实连接更近，但仍必须继续保持默认关闭。
