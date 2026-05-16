# Node v203 cross-project CI artifact retention gate

## 本版判断

Java v72 和 mini-kv v81 已经按 v200 衍生计划完成，只读提供 artifact retention 证据。Node v203 的目标不是继续做 summary，也不是开始真实上传，而是把 Node v202 upload dry-run contract、Java v72 retention hint、mini-kv v81 runtime smoke retention evidence 合成一个跨项目 retention gate。

这版完成后，三项目对 CI artifact retention 的约束已经能统一检查，但真实 GitHub artifact upload、真实 artifact retention store 和生产窗口仍然关闭。

## 本版范围

新增：

```text
GET /api/v1/production/cross-project-ci-artifact-retention-gate
GET /api/v1/production/cross-project-ci-artifact-retention-gate?format=markdown
```

核心输出：

```text
sourceUploadDryRunContract
upstreamRetentionHints.javaV72
upstreamRetentionHints.miniKvV81
retentionGate
retentionRecords
productionBlockers
```

## 安全边界

```text
readyForCrossProjectCiArtifactRetentionGate=true
readyForRealCiArtifactUpload=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
realArtifactStoreConnected=false
githubArtifactUploadAttempted=false
```

## 验证结果

```text
npm run typecheck：通过
聚焦测试：3 files / 9 tests 通过
本机 Chrome 截图：通过，见 c/203/图片/cross-project-ci-artifact-retention-gate-v203.png
npm test：145 files / 495 tests 通过
npm run build：通过
Node HTTP smoke：通过，/api/v1/production/cross-project-ci-artifact-retention-gate JSON/Markdown 均返回 200
```

HTTP smoke 说明：第一次 readiness 使用无身份 `/health`，被当前 access guard rehearsal enforcement 拦截；随后改为带 operator headers 的只读 smoke，验证通过。临时 Node 服务 PID `15916` 已停止。

## 下一步

当前 v200 衍生计划已收口。下一份计划从 v203 衍生，开始转向真实只读三项目 runtime smoke：

```text
Node v204：three-project real-read runtime smoke preflight
```

如果需要真正启动 Java / mini-kv 进行联调，必须在对应版本里明确记录启动范围、端口、只读命令和停止清理。
