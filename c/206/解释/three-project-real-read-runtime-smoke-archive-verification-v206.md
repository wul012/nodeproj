# Node v206 three-project real-read runtime smoke archive verification

## 本版判断

v206 是 v205 真实只读联调后的归档验证版。它不重新启动 Java 或 mini-kv，也不重新执行真实 runtime smoke，而是验证 v205 是否留下了可审计、可复查、不会误导成生产授权的证据。

本版核心问题：

```text
v205 是否真的归档了 executed-pass？
截图、HTML、说明、代码讲解是否都存在且非空？
计划是否已经标记 v205 完成并指向 v206？
v206 自己是否没有重新触发上游读？
生产窗口是否仍然关闭？
```

## 本版新增

新增服务：

```text
src/services/threeProjectRealReadRuntimeSmokeArchiveVerification.ts
```

新增接口：

```text
GET /api/v1/production/three-project-real-read-runtime-smoke-archive-verification
GET /api/v1/production/three-project-real-read-runtime-smoke-archive-verification?format=markdown
```

新增测试：

```text
test/threeProjectRealReadRuntimeSmokeArchiveVerification.test.ts
```

## 验证内容

v206 验证的文件：

```text
c/205/three-project-real-read-runtime-smoke-execution-packet-v205.html
c/205/图片/three-project-real-read-runtime-smoke-execution-packet-v205.png
c/205/解释/three-project-real-read-runtime-smoke-execution-packet-v205.md
代码讲解记录_生产雏形阶段/209-three-project-real-read-runtime-smoke-execution-packet-v205.md
docs/plans/v203-post-ci-artifact-retention-roadmap.md
```

关键片段：

```text
packetState=executed-pass
passedTargetCount=8
1bb5dcd900100feb0ce0bccb96a9db371c03f90cab7199edc98433b5a21f36c1
本轮启动的 Java、mini-kv、Node 进程：已停止
Node v205：three-project real-read runtime smoke execution packet。已完成。
Node v206：real-read runtime smoke archive verification。下一步。
```

## 安全边界

v206 会强制以 closed-window 方式复核 v205 endpoint shape：

```text
packetState=closed-window-skipped
attemptedTargetCount=0
skippedTargetCount=8
realRuntimeSmokeExecuted=false
```

这说明 v206 自己没有重新跑 Java / mini-kv runtime smoke。它只验证归档，不重复联调。

仍然保持：

```text
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
UPSTREAM_ACTIONS_ENABLED=false
```

## 当前验证结果

最终验证已经通过：

```text
npm run typecheck：通过
聚焦测试：2 files / 7 tests 通过
npm test：148 files / 506 tests 通过
npm run build：通过
截图：c/206/图片/three-project-real-read-runtime-smoke-archive-verification-v206.png 已生成
HTTP smoke：127.0.0.1:4310，verificationState=verified-real-read-runtime-smoke-archive
HTTP smoke：archiveFilesPresent=true，archiveFilesNonEmpty=true，snippetMatchCount=9
HTTP smoke：closedWindowPacketState=closed-window-skipped，realRuntimeSmokeExecuted=false
HTTP smoke：Markdown 200，包含 archiveFilesPresent: true 和 CREATE_NEXT_REAL_READ_HARDENING_PLAN
```

## 下一步

v204-v206 的真实只读联调阶段到 v206 应收口。下一步需要另起新计划，不继续在 v203 计划里叠加重复 archive/summary。建议下一阶段转向生产硬化：

```text
Node v207：post-real-read hardening plan / production gap triage
推荐并行 Java v74 + mini-kv v83：只做真实运行证据或治理能力补强
Node v208：消费两边新证据，推进 managed audit / identity / approval boundary 中的一个真实硬门槛
```
