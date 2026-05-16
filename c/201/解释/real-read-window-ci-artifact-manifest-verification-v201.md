# Node v201 real-read window CI artifact manifest verification

## 本版判断

v200 已经把 Node v191-v199 的证据整理成 CI artifact manifest。Java v71 和 mini-kv v80 也已经分别补了只读 CI/evidence hint。v201 不做真实上传，而是验证 v200 manifest 是否稳定、Java/mini-kv hint 是否可接受，并继续把真实 CI artifact store 缺失列为 blocker。

## 本版范围

新增：

```text
GET /api/v1/production/real-read-window-ci-artifact-manifest-verification
GET /api/v1/production/real-read-window-ci-artifact-manifest-verification?format=markdown
```

核心输出：

```text
verification
upstreamHints.javaV71
upstreamHints.miniKvV80
checks
productionBlockers
```

## 安全边界

```text
readyForCiArtifactUpload=false
ciArtifactStoreConnected=false
githubArtifactUploadAttempted=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
```

## 只读核对

本版推进前只读核对：

```text
Java v71：已完成，HEAD/tag 为 v71订单平台release-approval-ci-evidence-hint
mini-kv v80：已完成，HEAD/tag 为 第八十版CI证据提示
```

没有启动、测试、构建、修改 Java 或 mini-kv。

## 验证结果

```text
npm run typecheck：通过
聚焦测试：4 files / 12 tests 通过
本机 Chrome 截图：通过，见 c/201/图片/real-read-window-ci-artifact-manifest-verification-v201.png
npm test：143 files / 489 tests 通过
npm run build：通过
Node HTTP smoke：通过，/api/v1/production/real-read-window-ci-artifact-manifest-verification JSON/Markdown 均返回 200
```

## 下一步

按计划下一步是：

```text
Node v202：CI artifact upload dry-run contract
```
