# Node v202 real-read window CI artifact upload dry-run contract

## 模块角色

v202 是 v201 manifest verification 后面的上传前边界版本。它不新增真实 GitHub Actions job，不读取 token，不上传 artifact，只定义将来如果接入上传时必须遵守的 dry-run contract。

核心目标是把证据链从：

```text
manifest verified
```

推进到：

```text
future upload shape is constrained before real CI integration
```

## 关键代码

### 1. 服务入口

文件：[realReadWindowCiArtifactUploadDryRunContract.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArtifactUploadDryRunContract.ts)

```ts
export async function loadRealReadWindowCiArtifactUploadDryRunContract(input: {
```

入口先加载 v201：

```ts
loadRealReadWindowCiArtifactManifestVerification(input)
```

这保证 v202 不会绕过 manifest verification 直接谈上传。

### 2. dry-run contract

文件：[realReadWindowCiArtifactUploadDryRunContract.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArtifactUploadDryRunContract.ts)

```ts
dryRunContract: {
  artifactName: "orderops-real-read-window-evidence-v191-v201",
  artifactRoot: "c/",
  retentionDays: 30,
  uploadMode: "dry-run-contract-only",
```

这里固定 artifact name、根路径、保留天数和 dry-run 模式。`githubTokenRequiredNow=false` 和 `githubArtifactUploadAttempted=false` 明确说明 v202 仍不是上传实现。

### 3. path allowlist

文件：[realReadWindowCiArtifactUploadDryRunContract.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArtifactUploadDryRunContract.ts)

```ts
function createPathAllowlist(): ArtifactPathRule[] {
```

allowlist 只允许未来上传这些证据根：

```text
c/{191..201}/**
代码讲解记录_生产雏形阶段/*-v{191..202}.md
docs/plans/v200-post-ci-artifact-manifest-roadmap.md
package.json
```

这让上传范围被限制在证据、讲解、计划和项目元信息内。

### 4. forbidden paths

文件：[realReadWindowCiArtifactUploadDryRunContract.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArtifactUploadDryRunContract.ts)

```ts
function createForbiddenPaths(): ArtifactForbiddenPath[] {
```

禁止上传：

```text
.env*
.git/**
node_modules/**
dist/**
.tmp/**
data/audit/**
*secret*
*.pem
```

这些规则把 secret、仓库内部、依赖、临时文件、运行时审计存储和私钥材料挡在 artifact 外。

### 5. 安全检查

文件：[realReadWindowCiArtifactUploadDryRunContract.ts](D:/nodeproj/orderops-node/src/services/realReadWindowCiArtifactUploadDryRunContract.ts)

```ts
function createChecks(
```

重点检查包括：

```text
sourceVerificationReady
sourceCiUploadStillBlocked
pathAllowlistComplete
forbiddenPathsComplete
githubTokenNotRequiredYet
githubArtifactUploadNotAttempted
productionWindowStillBlocked
```

即使 contract ready，也仍然输出 `REAL_GITHUB_ARTIFACT_UPLOAD_NOT_CONFIGURED` blocker。

### 6. 路由挂载

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts)

```text
/api/v1/production/real-read-window-ci-artifact-upload-dry-run-contract
```

路由继续接收 operator identity headers，保持 v198-v202 的链路一致。

### 7. 测试覆盖

文件：[realReadWindowCiArtifactUploadDryRunContract.test.ts](D:/nodeproj/orderops-node/test/realReadWindowCiArtifactUploadDryRunContract.test.ts)

测试覆盖：

- 缺少身份头时，source v201 verification 不 ready，contract blocked。
- 完整身份头时，dry-run contract ready，但 real CI upload 仍为 false。
- JSON/Markdown 路由都正常输出。

## 本版结论

v202 把真实 CI artifact 上传前的安全边界先定义出来了。现在系统知道未来上传应该叫什么、保留多久、允许哪些路径、禁止哪些路径。

但真实 GitHub artifact upload 仍未配置，生产窗口仍不能打开。

## 验证

```text
npm run typecheck：通过
聚焦测试：3 files / 9 tests 通过
本机 Chrome 截图：通过
npm test：144 files / 492 tests 通过
npm run build：通过
Node HTTP smoke：通过，JSON/Markdown 均返回 200
```

## 下一步

```text
推荐并行 Java v72 + mini-kv v81
```
