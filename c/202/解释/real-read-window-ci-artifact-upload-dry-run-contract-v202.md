# Node v202 real-read window CI artifact upload dry-run contract

## 本版判断

v201 已经验证 v200 manifest 和 Java v71 / mini-kv v80 的只读 hint。v202 不做真实 GitHub artifact 上传，而是定义未来上传前必须遵守的 dry-run contract：artifact name、retention days、path allowlist 和 forbidden paths。

## 本版范围

新增：

```text
GET /api/v1/production/real-read-window-ci-artifact-upload-dry-run-contract
GET /api/v1/production/real-read-window-ci-artifact-upload-dry-run-contract?format=markdown
```

核心输出：

```text
sourceVerification
dryRunContract
pathAllowlist
forbiddenPaths
productionBlockers
```

## 安全边界

```text
readyForRealCiArtifactUpload=false
githubTokenRequiredNow=false
githubArtifactUploadAttempted=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
```

## 验证结果

```text
npm run typecheck：通过
聚焦测试：3 files / 9 tests 通过
本机 Chrome 截图：通过，见 c/202/图片/real-read-window-ci-artifact-upload-dry-run-contract-v202.png
npm test：144 files / 492 tests 通过
npm run build：通过
Node HTTP smoke：通过，/api/v1/production/real-read-window-ci-artifact-upload-dry-run-contract JSON/Markdown 均返回 200
```

## 下一步

按计划下一步是：

```text
推荐并行 Java v72 + mini-kv v81
```
