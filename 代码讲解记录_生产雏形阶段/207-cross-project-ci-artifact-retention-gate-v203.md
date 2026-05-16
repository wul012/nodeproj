# Node v203 cross-project CI artifact retention gate 代码讲解

## 模块角色

v203 是 v200-v202 这条 CI artifact 链路的收口 gate。它不上传 GitHub artifact，不连接真实 artifact store，也不打开生产窗口；它只做一件事：把三项目的 retention 证据合成一份可以审查的只读 profile。

链路从：

```text
Node v202 upload dry-run contract
Java v72 release approval artifact retention hint
mini-kv v81 runtime smoke artifact retention evidence
```

推进到：

```text
cross-project retention evidence is consistent, but real upload is still blocked
```

## 关键代码

### 1. 服务入口

文件：[crossProjectCiArtifactRetentionGate.ts](D:/nodeproj/orderops-node/src/services/crossProjectCiArtifactRetentionGate.ts)

```ts
export async function loadCrossProjectCiArtifactRetentionGate(input: {
```

入口先加载 v202：

```ts
loadRealReadWindowCiArtifactUploadDryRunContract(input)
```

这保证 v203 不会绕过 v202 的 path allowlist、forbidden paths、retention days 和 upload dry-run contract。

### 2. Java v72 hint

文件：[crossProjectCiArtifactRetentionGate.ts](D:/nodeproj/orderops-node/src/services/crossProjectCiArtifactRetentionGate.ts)

```ts
function createJavaHint(): JavaArtifactRetentionHint {
```

这里把 Java v72 的只读字段固定进 Node gate：

```text
hintVersion=java-release-approval-rehearsal-artifact-retention-hint.v1
ciArtifactName=orderops-real-read-window-evidence-v191-v201
ciArtifactRoot=c/
ciRetentionDays=30
javaRetentionDays=180
ciArtifactUploadedByJava=false
githubArtifactAccessedByJava=false
nodeMayTreatAsRetentionAuthorization=false
```

这些字段说明 Java 只是回显和证明 retention 兼容，不负责上传 artifact，也不给 Node 生产授权。

### 3. mini-kv v81 evidence

文件：[crossProjectCiArtifactRetentionGate.ts](D:/nodeproj/orderops-node/src/services/crossProjectCiArtifactRetentionGate.ts)

```ts
function createMiniKvHint(): MiniKvArtifactRetentionEvidence {
```

mini-kv 侧被作为基础设施 evidence，而不是订单权威存储：

```text
runtimeSmokeEvidenceVersion=mini-kv-runtime-smoke-evidence.v6
artifactRoot=c/
artifactPathHint=c/81/
retentionDays=30
githubArtifactUploadAttempted=false
productionWindowAllowed=false
restoreExecutionAllowed=false
orderAuthoritative=false
```

这让 Node 能检查 mini-kv 的 runtime smoke retention hint，但不会执行 `LOAD`、`COMPACT`、`SETNXEX` 或 restore。

### 4. retention records

文件：[crossProjectCiArtifactRetentionGate.ts](D:/nodeproj/orderops-node/src/services/crossProjectCiArtifactRetentionGate.ts)

```ts
function createRetentionRecords(
```

本版生成三条 records：

```text
node-v202-upload-dry-run-contract
java-v72-release-approval-retention-hint
mini-kv-v81-runtime-smoke-retention-evidence
```

每条 record 都包含：

```text
readOnly=true
executionAllowed=false
uploadAttempted=false
productionWindowAllowed=false
recordDigest=<sha256>
```

digest 让后续计划能引用这些记录，而不是只靠文字描述。

### 5. gate checks

文件：[crossProjectCiArtifactRetentionGate.ts](D:/nodeproj/orderops-node/src/services/crossProjectCiArtifactRetentionGate.ts)

```ts
function createChecks(
```

核心检查包括：

```text
sourceUploadDryRunContractReady
sourceRealUploadStillBlocked
javaV72RetentionDaysCompatible
javaV72DoesNotAuthorizeNodeRetention
miniKvV81RetentionDaysMatch
miniKvV81DoesNotRestore
retentionRecordsComplete
realArtifactStoreStillDisconnected
productionWindowStillBlocked
executionStillBlocked
```

即使所有检查通过，`productionBlockers` 仍然保留：

```text
REAL_ARTIFACT_RETENTION_STORE_NOT_CONNECTED
```

所以本版是 review-ready，不是 production-ready。

### 6. 路由挂载

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts)

```text
/api/v1/production/cross-project-ci-artifact-retention-gate
```

路由同时支持 JSON 和 Markdown，继续使用生产 profile 这一套输出风格。

### 7. 测试覆盖

文件：[crossProjectCiArtifactRetentionGate.test.ts](D:/nodeproj/orderops-node/test/crossProjectCiArtifactRetentionGate.test.ts)

测试覆盖：

- 缺少 operator headers 时，source v202 contract 不 ready，v203 blocked。
- 完整 headers 时，Node/Java/mini-kv retention evidence 全部 accepted，但 real upload 仍 blocked。
- JSON 和 Markdown 路由都正常输出，并包含 Java v72、mini-kv v81 和 blocker。

## 本版结论

v203 把 CI artifact retention 从“Node 自己的 dry-run contract”推进到“三项目 retention gate”。它证明三边 retention 证据已经能统一核对，但真实 artifact store、GitHub upload workflow、生产窗口授权仍然缺失，所以下一步应转向真实只读 runtime smoke，而不是继续堆 summary。

## 验证记录

```text
npm run typecheck：通过
聚焦测试：3 files / 9 tests 通过
本机 Chrome 截图：通过
npm test：145 files / 495 tests 通过
npm run build：通过
Node HTTP smoke：通过，JSON/Markdown endpoint 均返回 200
```
