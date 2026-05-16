# Node v200 real-read window CI archive artifact manifest

## 本版判断

v197 已经形成 production readiness checkpoint，v198 补了 operator identity binding，v199 补了 managed audit store handoff contract。v200 不继续新增真实读取能力，而是把 v191-v199 的证据产物整理成 CI artifact manifest：

```text
Node v191-v199 evidence
 -> JSON / endpoint
 -> Markdown
 -> screenshot
 -> explanation
 -> manifest digest
```

这版的价值是把“本地归档习惯”提升成“后续 CI 可接管的清单 schema”，但仍不连接 GitHub artifact、不上传产物、不打开生产窗口。

## 本版范围

新增：

```text
GET /api/v1/production/real-read-window-ci-archive-artifact-manifest
GET /api/v1/production/real-read-window-ci-archive-artifact-manifest?format=markdown
```

核心输出：

```text
sourceProfiles
manifest
artifactRecords
fileKindRequirements
productionBlockers
```

## 安全边界

```text
ciArtifactConnected=false
githubArtifactRequiredNow=false
localArchiveLayoutOnly=true
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
```

## 只读核对

本版推进前只读核对了前置计划：

```text
Java v70：已完成，工作区干净
mini-kv v79：已完成，工作区干净
Node v199：HEAD 已打 v199 标签，工作区干净
```

没有启动、测试、构建、修改 Java 或 mini-kv。

## 验证结果

```text
npm run typecheck：通过
聚焦测试：4 files / 12 tests 通过
本机 Chrome 截图：通过，见 c/200/图片/real-read-window-ci-archive-artifact-manifest-v200.png
npm test：142 files / 486 tests 通过
npm run build：通过
Node HTTP smoke：通过，/api/v1/production/real-read-window-ci-archive-artifact-manifest JSON/Markdown 均返回 200
```

## 下一步

按新计划下一步是：

```text
推荐并行 Java v71 + mini-kv v80
Node v201：real-read window CI artifact manifest verification
```
