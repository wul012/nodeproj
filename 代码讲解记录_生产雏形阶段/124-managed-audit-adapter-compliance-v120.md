# 第一百二十版代码讲解：managed audit adapter compliance harness

本版目标是给 v117 定义出的 `ManagedAuditAdapter` 增加一个统一合规验收 harness。

它不连接真实数据库、不迁移 audit 文件、不删除或轮转 JSONL。本版做的是：

```text
用本地 adapter 统一跑 appendOnlyWrite / queryByRequestId / digest / backupRestoreMarker
确认这四个方法可以形成可复用的 adapter 验收流程
继续保留 real managed adapter missing 的生产阻塞
```

## 本版所处项目进度

v117 已经定义：

```ts
export interface ManagedAuditAdapter {
  appendOnlyWrite(event: unknown): Promise<void>;
  queryByRequestId(requestId: string): Promise<unknown[]>;
  digest(): Promise<string>;
  backupRestoreMarker(): Promise<string>;
}
```

文件位置：

```text
src/services/managedAuditAdapterBoundary.ts
```

v120 在这个接口基础上新增 compliance harness，让未来真实 adapter 可以被同一套步骤验收。

## 新增服务

新增文件：

```text
src/services/managedAuditAdapterCompliance.ts
```

入口函数：

```ts
export async function createManagedAuditAdapterComplianceProfile(
  config: Pick<AppConfig, "upstreamActionsEnabled">,
): Promise<ManagedAuditAdapterComplianceProfile> {
  const adapter = new InMemoryComplianceAuditAdapter();
  const digestBefore = await adapter.digest();
  const event = createComplianceEvent();
  await adapter.appendOnlyWrite(event);
  const digestAfterAppend = await adapter.digest();
  const queried = await adapter.queryByRequestId(event.requestId);
  const digestAfterRepeatRead = await adapter.digest();
  const backupRestoreMarker = await adapter.backupRestoreMarker();
```

这段就是本版核心闭环：

```text
先取 digest
写入一条 compliance event
再取 digest
按 requestId 查询
重复取 digest 验证稳定
生成 backup restore marker
```

## 本地合规 adapter

服务内部实现了：

```ts
class InMemoryComplianceAuditAdapter implements ManagedAuditAdapter {
  private readonly events: ComplianceAuditEvent[] = [];

  async appendOnlyWrite(event: unknown): Promise<void> {
    if (!isComplianceAuditEvent(event)) {
      throw new Error("Compliance audit event shape is invalid");
    }
    this.events.push(event);
  }
```

它实现的是 v117 的接口，而不是另起一套方法名。

查询方法：

```ts
async queryByRequestId(requestId: string): Promise<ComplianceAuditEvent[]> {
  return this.events.filter((event) => event.requestId === requestId);
}
```

digest：

```ts
async digest(): Promise<string> {
  return `sha256:${createHash("sha256").update(JSON.stringify(this.events)).digest("hex")}`;
}
```

backup marker：

```ts
async backupRestoreMarker(): Promise<string> {
  const digest = await this.digest();
  return `backup-restore-marker:${digest.slice("sha256:".length, "sha256:".length + 16)}`;
}
```

注意这仍然只是本地 compliance adapter，不是生产存储。

## 合规证据

本版输出的 `sampleEvidence` 是：

```ts
sampleEvidence: {
  requestId: event.requestId,
  appendedEventId: event.id,
  digestBefore,
  digestAfterAppend,
  digestAfterRepeatRead,
  queryByRequestIdCount: queried.length,
  appendOnlyCountAfterWrite: adapter.size(),
  backupRestoreMarker,
}
```

这里能证明四件事：

```text
append 后 digest 变化
append 后记录数为 1
requestId 可以查回同一条事件
重复读不改变 digest
backup marker 可生成
```

## Compliance Steps

本版把四个验收项变成结构化步骤：

```ts
id: "append-only-write" | "query-by-request-id" | "digest-stability" | "backup-restore-marker";
```

对应生成代码：

```ts
return [
  {
    id: "append-only-write",
    method: "appendOnlyWrite",
    passed: checks.appendOnlyWriteCovered,
    evidence: `appendOnlyCountAfterWrite=${evidence.appendOnlyCountAfterWrite}`,
  },
  {
    id: "query-by-request-id",
    method: "queryByRequestId",
    passed: checks.queryByRequestIdCovered,
    evidence: `queryByRequestIdCount=${evidence.queryByRequestIdCount}`,
  },
```

这让后续真实 adapter 能复用同样的步骤，而不是每个 adapter 自己写一套验收说明。

## 核心检查项

检查项：

```ts
adapterInterfaceExercised: true,
appendOnlyWriteCovered: sampleEvidence.appendOnlyCountAfterWrite === 1 && digestBefore !== digestAfterAppend,
queryByRequestIdCovered: queried.length === 1 && queried[0]?.id === event.id,
digestStableAfterRepeatRead: digestAfterAppend === digestAfterRepeatRead && digestAfterAppend.startsWith("sha256:"),
backupRestoreMarkerCovered: backupRestoreMarker.startsWith("backup-restore-marker:"),
noDatabaseConnectionAttempted: true,
noAuditFileMigrationPerformed: true,
realManagedAdapterConnected: false,
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
```

这里最重要的边界是：

```text
noDatabaseConnectionAttempted=true
noAuditFileMigrationPerformed=true
realManagedAdapterConnected=false
```

v120 是合规演练，不是生产连接。

## 生产阻塞项

生产 blocker 收集函数里保留：

```ts
addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "Compliance currently runs against a local adapter; a real managed adapter is still missing.");
```

在正常 smoke 下，四个合规步骤都通过，最终 blocker 只剩：

```text
REAL_MANAGED_AUDIT_ADAPTER_MISSING
```

这很关键：说明 harness 自己已通过，但生产 adapter 仍未接入。

## HTTP 入口

新增路由：

```text
GET /api/v1/audit/managed-adapter-compliance
GET /api/v1/audit/managed-adapter-compliance?format=markdown
```

文件位置：

```text
src/routes/auditRoutes.ts
```

代码：

```ts
const profile = await createManagedAuditAdapterComplianceProfile(deps.config);

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderManagedAuditAdapterComplianceMarkdown(profile);
}
```

这个 route 仍属于 audit read 范畴，access guard rehearsal 下由 auditor 读取。

## 测试覆盖

新增测试：

```text
test/managedAuditAdapterCompliance.test.ts
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "managed-audit-adapter-compliance.v1",
  readyForProductionAudit: false,
  harness: {
    adapterName: "InMemoryComplianceAuditAdapter",
    targetInterface: "ManagedAuditAdapter",
    realManagedAdapterConnected: false,
    realDatabaseConnectionAttempted: false,
    auditFileMigrationPerformed: false,
  },
});
```

四个步骤断言：

```ts
expect(profile.complianceSteps.map((step) => [step.id, step.passed])).toEqual([
  ["append-only-write", true],
  ["query-by-request-id", true],
  ["digest-stability", true],
  ["backup-restore-marker", true],
]);
```

安全阻塞断言：

```ts
expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
  "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
]);
```

如果误打开 upstream actions：

```ts
expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
  "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
  "UPSTREAM_ACTIONS_ENABLED",
]));
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
69 个测试文件通过
250 条测试通过
```

运行归档：

```text
b/120/图片/managed-audit-adapter-compliance.png
b/120/解释/运行调试说明.md
```

## 一句话总结

v120 把 managed audit adapter 从“接口边界”推进到“可统一验收的合规 harness”：四个核心方法在本地 adapter 上全部跑通，但真实 managed audit adapter 仍未连接，所以生产审计仍保持阻塞。
