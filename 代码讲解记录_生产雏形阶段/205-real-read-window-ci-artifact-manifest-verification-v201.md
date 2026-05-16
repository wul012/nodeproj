# Node v201 real-read window CI artifact manifest verification

## 模块角色

v201 是 v200 CI artifact manifest 后面的验证层。它不生成新的证据清单，也不连接真实 GitHub artifact，而是复核 v200 的 manifest digest、artifact record 数量、文件类型要求，以及 Java v71 / mini-kv v80 的只读 CI evidence hint。

核心目标是把证据链从：

```text
manifest schema exists
```

推进到：

```text
manifest schema can be verified before any upload dry-run
```

## 关键代码

### 1. v200 manifest 暴露 digest payload helper

文件：[realReadWindowCiArchiveArtifactManifest.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArchiveArtifactManifest.ts)

```ts
export function createRealReadWindowCiArchiveArtifactManifestDigestPayload(input: {
```

v201 要复算 v200 的 manifest digest，所以 v200 模块新增了公开 payload helper，并把 `sourceDigests` 暴露到 `manifest` 里。

这不是改变 v200 的语义，而是让后续 verification 可以复用同一套 digest 输入。

### 2. v201 服务入口

文件：[realReadWindowCiArtifactManifestVerification.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArtifactManifestVerification.ts)

```ts
export async function loadRealReadWindowCiArtifactManifestVerification(input: {
```

入口先加载 v200：

```ts
loadRealReadWindowCiArchiveArtifactManifest(input)
```

然后用同一个 payload helper 复算 digest：

```ts
sha256StableJson(createRealReadWindowCiArchiveArtifactManifestDigestPayload(...))
```

这保证 v201 不是只看字段存在，而是真的检查 stored manifest digest 和 recomputed manifest digest 是否一致。

### 3. Java v71 hint

文件：[realReadWindowCiArtifactManifestVerification.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArtifactManifestVerification.ts)

```ts
function createJavaHint(): JavaCiEvidenceHint {
```

Java v71 hint 固定这些边界：

```text
hintVersion=java-release-approval-rehearsal-ci-evidence-hint.v1
noLedgerWriteProved=true
ciArtifactUploadedByJava=false
githubArtifactAccessedByJava=false
nodeMayTreatAsCiArtifactPublication=false
```

这说明 Java 只提供只读证据，不负责上传 CI artifact，也不授权 Node 写 approval ledger。

### 4. mini-kv v80 hint

文件：[realReadWindowCiArtifactManifestVerification.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArtifactManifestVerification.ts)

```ts
function createMiniKvHint(): MiniKvCiEvidenceHint {
```

mini-kv v80 hint 固定：

```text
runtimeSmokeEvidenceVersion=mini-kv-runtime-smoke-evidence.v5
artifactPathHint=c/80/
taxonomyDigest=fnv1a64:f92fcba55feb26a2
identityNeutralProof=true
noRestoreProof=true
uploadAllowed=false
```

这说明 mini-kv 只提供 runtime evidence 和路径 hint，不执行 restore，不接受业务身份，也不是订单权威存储。

### 5. 安全检查

文件：[realReadWindowCiArtifactManifestVerification.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArtifactManifestVerification.ts)

```ts
function createChecks(
```

重点检查包括：

```text
manifestDigestMatches
artifactRecordCountMatches
requiredFileKindsMatch
javaV71NoLedgerWriteProved
miniKvV80NoRestoreProved
ciArtifactStoreStillDisconnected
githubArtifactUploadNotAttempted
productionWindowStillBlocked
```

v201 允许 manifest verification ready，但仍把 `CI_ARTIFACT_STORE_NOT_CONNECTED` 作为生产 blocker。

### 6. 路由挂载

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts)

```text
/api/v1/production/real-read-window-ci-artifact-manifest-verification
```

路由沿用 v198-v200 的身份请求头，这样 manifest verification 不会绕过 operator identity / audit handoff 链。

### 7. 测试覆盖

文件：[realReadWindowCiArtifactManifestVerification.test.ts](D:/nodeproj/orderops-node/test/realReadWindowCiArtifactManifestVerification.test.ts)

测试覆盖：

- 缺少身份头时，source manifest blocked。
- 完整身份头时，manifest digest 可复算，Java/mini-kv hint 被接受。
- JSON/Markdown 路由都正常输出。

## 本版结论

v201 让 v200 manifest 从“声明存在”推进到“可以被复算和校验”。Node 已经能说明：CI artifact 清单完整、Java/mini-kv 只读 hint 匹配，但真实 CI artifact upload 仍未接入。

## 验证

```text
npm run typecheck：通过
聚焦测试：4 files / 12 tests 通过
本机 Chrome 截图：通过
npm test：143 files / 489 tests 通过
npm run build：通过
Node HTTP smoke：通过，JSON/Markdown 均返回 200
```

## 下一步

```text
Node v202：CI artifact upload dry-run contract
```
