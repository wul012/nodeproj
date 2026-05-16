# Node v200 real-read window CI archive artifact manifest

## 模块角色

v200 是 v197-v199 之后的 CI artifact 硬门槛前置版本。它不连接 GitHub Actions，不上传 artifact，也不要求真实 CI 产物立即存在，只把真实只读窗口需要归档的证据整理成 manifest schema。

核心目标是把真实窗口证据从：

```text
本地 c/<版本>/ 图片 + 解释 + Markdown
```

推进到：

```text
后续 CI 可以按 manifest 收集和验证
```

## 关键代码

### 1. 服务入口

文件：[realReadWindowCiArchiveArtifactManifest.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArchiveArtifactManifest.ts)

```ts
export async function loadRealReadWindowCiArchiveArtifactManifest(input: {
```

入口同时消费三个前置 profile：

```ts
loadRealReadAdapterProductionReadinessCheckpoint(input)
loadRealReadWindowOperatorIdentityBinding(input)
loadRealReadWindowAuditStoreHandoffContract(input)
```

这说明 v200 不是单独写一个“文件列表”，而是依赖 v197 checkpoint、v198 identity binding、v199 audit handoff 的真实 digest。

### 2. artifact record 清单

文件：[realReadWindowCiArchiveArtifactManifest.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArchiveArtifactManifest.ts)

```ts
function createArtifactRecords(
```

v200 固定 Node v191-v199 九条 artifact record。每条 record 都包含：

```text
localArchiveRoot
jsonOrEndpoint
markdown
screenshot
explanation
sourceDigest
recordDigest
```

这让后续 CI 不需要猜哪些文件应该被保存，也能复核每个版本的 source digest 是否被 manifest 捕获。

### 3. 文件类型要求

文件：[realReadWindowCiArchiveArtifactManifest.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArchiveArtifactManifest.ts)

```ts
function createFileKindRequirements(): CiFileKindRequirement[] {
```

清单要求每个版本都声明四类证据：

```text
json-or-endpoint
markdown
screenshot
explanation
```

它目前只是声明路径，`verifiedByCiNow=false`，表示 v200 还不是 CI 执行器。

### 4. 安全检查

文件：[realReadWindowCiArchiveArtifactManifest.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArchiveArtifactManifest.ts)

```ts
function createChecks(
```

重点检查包括：

```text
sourceCheckpointReady
sourceIdentityBindingReady
sourceAuditHandoffReady
artifactRecordsComplete
artifactRecordsReadOnly
githubArtifactNotRequiredYet
ciArtifactNotConnectedYet
upstreamActionsStillDisabled
productionWindowStillBlocked
```

这确保 v200 只输出 manifest，不把 CI artifact 缺失误判成生产可开窗。

### 5. 路由挂载

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts)

```text
/api/v1/production/real-read-window-ci-archive-artifact-manifest
```

路由接收和 v198/v199 相同的身份请求头。这样 v200 可以继续验证上游身份绑定链，而不是绕过前置 hard gate。

### 6. 测试覆盖

文件：[realReadWindowCiArchiveArtifactManifest.test.ts](D:/nodeproj/orderops-node/test/realReadWindowCiArchiveArtifactManifest.test.ts)

测试覆盖：

- 缺少身份头时 manifest blocked。
- 完整身份头时，manifest ready，但 production window/operations 仍为 false。
- artifact records 覆盖 Node v191-v199。
- JSON/Markdown 路由都正常输出。

## 本版结论

v200 把真实只读窗口的 CI artifact 清单做出来了。现在系统知道后续 CI 至少应该收集 Node v191-v199 的 endpoint/Markdown/screenshot/explanation 证据。

但真实 CI artifact store 仍未连接，生产窗口仍不能打开。

## 验证

```text
npm run typecheck：通过
聚焦测试：4 files / 12 tests 通过
本机 Chrome 截图：通过
npm test：142 files / 486 tests 通过
npm run build：通过
Node HTTP smoke：通过，JSON/Markdown 均返回 200
```

## 下一步

```text
推荐并行 Java v71 + mini-kv v80
Node v201：real-read window CI artifact manifest verification
```
