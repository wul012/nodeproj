# Node v206 three-project real-read runtime smoke archive verification 代码讲解

## 模块角色

v206 是 v205 的归档验证层，不是第二次真实联调。v205 已经启动 Java、mini-kv、Node 并完成 8 个只读目标；v206 要做的是验证这些证据是否被完整保存，并且确认验证行为本身不会再次触碰上游。

这个版本解决的是工程流程问题：

```text
一次真实联调跑通
 -> 证据必须归档
 -> 归档必须可验证
 -> 验证不能变成又一次联调或生产授权
```

## 1. 服务入口

文件：[threeProjectRealReadRuntimeSmokeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokeArchiveVerification.ts)

```ts
export async function loadThreeProjectRealReadRuntimeSmokeArchiveVerification(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
})
```

入口接收和 v205 类似的依赖，但使用方式不同。v206 不把 `orderPlatform` / `miniKv` 用来真实探测，而是强制 closed-window 复核 v205 profile shape。

## 2. 强制 closed-window 复核

文件：[threeProjectRealReadRuntimeSmokeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokeArchiveVerification.ts)

```ts
const closedWindowPacket = await loadThreeProjectRealReadRuntimeSmokeExecutionPacket({
  ...input,
  config: {
    ...input.config,
    upstreamProbesEnabled: false,
  },
});
```

这是 v206 的关键边界。即使外部环境传入 `UPSTREAM_PROBES_ENABLED=true`，归档验证也会把它压回 `false`，避免验证阶段重新读取 Java / mini-kv。

测试里也用了会抛错的 client：

```ts
new ThrowingOrderPlatformClient()
new ThrowingMiniKvClient()
```

如果 v206 不小心触发上游调用，测试会立即失败。

## 3. 归档文件检查

文件：[threeProjectRealReadRuntimeSmokeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokeArchiveVerification.ts)

```ts
function createArchiveFileEvidence(): ArchiveFileEvidence[] {
  return [
    fileEvidence("archive-html", "c/205/three-project-real-read-runtime-smoke-execution-packet-v205.html"),
    fileEvidence("archive-screenshot", "c/205/图片/three-project-real-read-runtime-smoke-execution-packet-v205.png"),
    fileEvidence("archive-explanation", "c/205/解释/three-project-real-read-runtime-smoke-execution-packet-v205.md"),
    fileEvidence("code-walkthrough", "代码讲解记录_生产雏形阶段/209-three-project-real-read-runtime-smoke-execution-packet-v205.md"),
    fileEvidence("plan-roadmap", "docs/plans/v203-post-ci-artifact-retention-roadmap.md"),
  ];
}
```

这里检查五类证据：

```text
HTML 归档
截图
解释说明
代码讲解
计划状态
```

每个文件都会记录：

```text
exists
sizeBytes
digest
```

## 4. 关键片段检查

文件：[threeProjectRealReadRuntimeSmokeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokeArchiveVerification.ts)

```ts
snippetEvidence("archive-executed-pass", "...v205.md", "packetState=executed-pass")
snippetEvidence("archive-eight-targets", "...v205.md", "passedTargetCount=8")
snippetEvidence("archive-cleanup", "...v205.md", "本轮启动的 Java、mini-kv、Node 进程：已停止")
snippetEvidence("archive-digest", "...v205.md", ARCHIVED_EXECUTION_DIGEST)
```

这比只检查“文件存在”更稳。v206 要确认文件里真的写了 v205 的关键结果：

```text
真实联调通过
8 个目标通过
执行 digest 被记录
进程清理被记录
```

代码讲解也必须说明：

```text
不可以把 smoke 结果当成生产窗口授权
.tmp/mini-kv-build-v82
```

这能防止 v205 的临时构建细节丢失。

## 5. 安全检查

文件：[threeProjectRealReadRuntimeSmokeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokeArchiveVerification.ts)

```ts
sourcePacketClosedWindowSafe: packet.packetState === "closed-window-skipped"
  && packet.smokeSession.realRuntimeSmokeExecuted === false
  && packet.smokeSession.attemptedTargetCount === 0
  && packet.smokeSession.skippedTargetCount === 8,
```

这条检查说明 v206 自己没有重新执行真实 smoke。

```ts
noArchiveVerificationUpstreamRerun: packet.smokeSession.realRuntimeSmokeExecuted === false,
```

这条则把“不重跑上游”变成显式 contract。

```ts
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
productionWindowStillBlocked: packet.readyForProductionWindow === false,
readyForProductionOperationsStillFalse: packet.readyForProductionOperations === false,
```

这些继续保证 v206 不会把归档验证升级成生产执行权限。

## 6. 路由挂载

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts)

```ts
app.get<{ Querystring: FixtureReportQuery }>(
  "/api/v1/production/three-project-real-read-runtime-smoke-archive-verification",
```

接口支持 JSON 和 Markdown：

```text
/api/v1/production/three-project-real-read-runtime-smoke-archive-verification
/api/v1/production/three-project-real-read-runtime-smoke-archive-verification?format=markdown
```

这和 v204/v205 保持同一套生产 profile 输出风格。

## 7. 测试覆盖

文件：[threeProjectRealReadRuntimeSmokeArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/threeProjectRealReadRuntimeSmokeArchiveVerification.test.ts)

第一类测试验证归档完整：

```ts
verifies v205 archive files without rerunning Java or mini-kv
```

断言包括：

```text
verificationState=verified-real-read-runtime-smoke-archive
archiveFileCount=5
snippetMatchCount=9
productionBlockerCount=0
```

第二类测试验证危险开关：

```ts
blocks when upstream actions are enabled
```

只要 `UPSTREAM_ACTIONS_ENABLED=true`，v206 就 blocked。

第三类测试验证路由：

```ts
exposes JSON and Markdown routes
```

确保 endpoint 可被运维面读取，并包含：

```text
archiveFilesPresent: true
CREATE_NEXT_REAL_READ_HARDENING_PLAN
```

## 本版结论

v206 把 v205 的真实联调证据收成一个可验证归档。它的价值不是新增更多读目标，而是防止“真实联调跑过了，但证据不可复查”。

v204-v206 阶段到这里应收口。下一阶段不要继续叠 archive-only summary，而应该另起新计划，转向更真实的生产硬门槛，例如 managed audit、真实身份、审批记录、回滚控制或 CI artifact store 的一个小闭环。

## 验证记录

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
