# 第一百二十三版代码讲解：managed audit adapter harness runner

本版目标是把 v120 的单一 compliance harness 扩展成一个可选择 runner。

它不连接真实数据库、不迁移现有 audit 文件、不改变真实审计存储。本版做的是：

```text
同一套 ManagedAuditAdapter 验收步骤
分别跑 memory 与 file-candidate 两个本地目标
证明未来真实 adapter 可以接到同一个 runner 下
继续保留 real managed adapter missing 的生产阻塞
```

## 本版所处项目进度

v117 定义了生产 audit adapter 的接口边界：

```ts
export interface ManagedAuditAdapter {
  appendOnlyWrite(event: unknown): Promise<void>;
  queryByRequestId(requestId: string): Promise<unknown[]>;
  digest(): Promise<string>;
  backupRestoreMarker(): Promise<string>;
}
```

v120 已经用本地 adapter 跑通这四个方法。

v123 的增量是：

```text
不再只有一个本地 adapter
而是把验收逻辑抽成 runner
同一套步骤可以跑多个 target
```

## 新增服务

新增文件：

```text
src/services/managedAuditAdapterRunner.ts
```

入口函数：

```ts
export async function createManagedAuditAdapterRunnerProfile(
  config: Pick<AppConfig, "upstreamActionsEnabled">,
): Promise<ManagedAuditAdapterRunnerProfile> {
  const targetResults = [
    await runMemoryTarget(),
    await runFileCandidateTarget(),
  ];
```

这段说明本版的两个目标：

```text
memory
file-candidate
```

它们都必须走同一个 runner 验收流程。

## Runner Adapter 接口

本版内部定义：

```ts
interface RunnerAdapter extends ManagedAuditAdapter {
  readonly adapterName: string;
  size(): Promise<number> | number;
}
```

重点是它继承自 `ManagedAuditAdapter`，所以没有发明新接口。

`size()` 只是 runner 统计证据需要，核心能力仍是：

```text
appendOnlyWrite
queryByRequestId
digest
backupRestoreMarker
```

## Memory 目标

内存目标：

```ts
class MemoryRunnerAuditAdapter implements RunnerAdapter {
  readonly adapterName = "MemoryRunnerAuditAdapter";
  private readonly events: RunnerAuditEvent[] = [];

  async appendOnlyWrite(event: unknown): Promise<void> {
    if (!isRunnerAuditEvent(event)) {
      throw new Error("Runner audit event shape is invalid");
    }
    this.events.push(event);
  }
```

查询：

```ts
async queryByRequestId(requestId: string): Promise<RunnerAuditEvent[]> {
  return this.events.filter((event) => event.requestId === requestId);
}
```

digest：

```ts
async digest(): Promise<string> {
  return `sha256:${createHash("sha256").update(JSON.stringify(this.events)).digest("hex")}`;
}
```

这和 v120 的本地 adapter 思路一致，但现在只是 runner 的一个 target。

## File-Candidate 目标

file-candidate 目标：

```ts
class FileCandidateRunnerAuditAdapter implements RunnerAdapter {
  readonly adapterName = "FileCandidateRunnerAuditAdapter";

  constructor(private readonly filePath: string) {}

  async appendOnlyWrite(event: unknown): Promise<void> {
    if (!isRunnerAuditEvent(event)) {
      throw new Error("Runner audit event shape is invalid");
    }
    await appendFile(this.filePath, `${JSON.stringify(event)}\n`, "utf8");
  }
```

它会写临时 JSONL 文件，但不是项目真实 audit 文件。

查询逻辑：

```ts
async queryByRequestId(requestId: string): Promise<RunnerAuditEvent[]> {
  return (await this.readEvents()).filter((event) => event.requestId === requestId);
}
```

digest 逻辑：

```ts
async digest(): Promise<string> {
  const content = await this.readContent();
  return `sha256:${createHash("sha256").update(content).digest("hex")}`;
}
```

临时文件运行位置：

```ts
const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-managed-audit-runner-"));
```

运行结束清理：

```ts
finally {
  await rm(directory, { recursive: true, force: true });
}
```

这点很关键：file-candidate 只是候选验收，不迁移、不污染项目审计文件。

## 统一运行流程

两个 target 都进入同一个函数：

```ts
async function runTarget(input: {
  targetKind: ManagedAuditAdapterRunnerTargetResult["targetKind"];
  adapter: RunnerAdapter;
  temporaryFileUsed: boolean;
  temporaryFileCleanedUp: boolean;
}): Promise<ManagedAuditAdapterRunnerTargetResult> {
  const digestBefore = await input.adapter.digest();
  const event = createRunnerEvent(input.targetKind);
  await input.adapter.appendOnlyWrite(event);
  const digestAfterAppend = await input.adapter.digest();
  const queried = await input.adapter.queryByRequestId(event.requestId);
  const digestAfterRepeatRead = await input.adapter.digest();
  const backupRestoreMarker = await input.adapter.backupRestoreMarker();
```

这个流程复用了 v120 的核心验收顺序：

```text
先 digest
append 一条事件
再 digest
按 requestId 查询
重复 digest
生成 backupRestoreMarker
```

## 四个验收步骤

步骤生成：

```ts
function createSteps(evidence: ManagedAuditAdapterRunnerTargetResult["evidence"]): ManagedAuditAdapterRunnerStep[] {
  return [
    {
      id: "append-only-write",
      method: "appendOnlyWrite",
      passed: evidence.appendOnlyCountAfterWrite === 1 && evidence.digestBefore !== evidence.digestAfterAppend,
      evidence: `appendOnlyCountAfterWrite=${evidence.appendOnlyCountAfterWrite}`,
    },
```

其余三个：

```text
query-by-request-id
digest-stability
backup-restore-marker
```

这让以后接真实 adapter 时，只需要新增 target，不需要重写验收逻辑。

## 核心检查项

checks：

```ts
memoryRunnerPasses: targetPassed(targetResults, "memory"),
fileCandidateRunnerPasses: targetPassed(targetResults, "file-candidate"),
allRunnerTargetsPass: targetResults.every((target) => target.passed),
noDatabaseConnectionAttempted: true,
noAuditFileMigrationPerformed: true,
realManagedAdapterConnected: false,
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
```

这里的边界是：

```text
memory/file-candidate 都 pass
但 realManagedAdapterConnected 仍然 false
```

本版是候选层，不是生产连接。

## 生产阻塞项

正常情况下只剩：

```text
REAL_MANAGED_AUDIT_ADAPTER_MISSING
```

对应代码：

```ts
addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "A real managed audit adapter target is still required before production audit.");
```

如果误打开上游动作：

```ts
addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must remain false while production audit is not connected.");
```

如果某个 runner target 失败，也会出现：

```text
MEMORY_RUNNER_FAILED
FILE_CANDIDATE_RUNNER_FAILED
RUNNER_TARGETS_FAILED
```

## HTTP 入口

新增路由：

```text
GET /api/v1/audit/managed-adapter-runner
GET /api/v1/audit/managed-adapter-runner?format=markdown
```

文件位置：

```text
src/routes/auditRoutes.ts
```

路由代码：

```ts
const profile = await createManagedAuditAdapterRunnerProfile(deps.config);

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderManagedAuditAdapterRunnerMarkdown(profile);
}
```

该 route 属于 audit read 类，只输出证据，不执行真实生产写入。

## 测试覆盖

新增测试：

```text
test/managedAuditAdapterRunner.test.ts
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "managed-audit-adapter-runner.v1",
  readyForProductionAudit: false,
  runner: {
    targetInterface: "ManagedAuditAdapter",
    targetKinds: ["memory", "file-candidate"],
    realManagedAdapterConnected: false,
    realDatabaseConnectionAttempted: false,
    auditFileMigrationPerformed: false,
  },
});
```

target 断言：

```ts
expect(profile.targetResults.map((target) => [target.targetKind, target.passed])).toEqual([
  ["memory", true],
  ["file-candidate", true],
]);
```

file-candidate 清理断言：

```ts
expect(profile.targetResults.find((target) => target.targetKind === "file-candidate")).toMatchObject({
  temporaryFileUsed: true,
  temporaryFileCleanedUp: true,
});
```

生产阻塞断言：

```ts
expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
  "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
]);
```

## 运行调试与归档

本版运行了：

```text
npm run typecheck
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

结果：

```text
72 个测试文件通过
259 条测试通过
```

运行归档：

```text
b/123/图片/managed-audit-adapter-runner.png
b/123/解释/运行调试说明.md
```

## 一句话总结

v123 把 managed audit adapter 从“单个本地合规 harness”推进到“可替换 runner”：memory 和 file-candidate 两个目标都能跑同一套验收步骤，但真实 managed audit adapter 仍未连接，所以生产审计继续保持阻塞。
