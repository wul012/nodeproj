# 第一百一十二版代码讲解：managed audit store adapter contract

本版目标是把 managed audit store 抽象成一个可测试的 adapter contract。

它不接 PostgreSQL、Redis、S3 或云审计服务，不迁移历史 audit 文件，也不执行真实保留、轮转、删除。它的角色是先定义生产审计存储必须具备哪些能力，并用 fake adapter 证明这些能力的接口形状：

```text
append-only write
query by requestId
digest verification
retention metadata
backup restore marker
```

## 本版所处项目进度

v109 已经证明 file audit 的 retention knobs 和 digest evidence 可以被读取。

v110 仍然把 `MANAGED_AUDIT_STORE_MISSING` 作为生产硬阻塞。

v112 补的是 managed audit store 的 adapter contract：不是实现真实存储，而是让“真实存储将来必须满足什么”变成可测试 evidence。

## 服务入口

新增服务文件：

```text
src/services/managedAuditStoreContract.ts
```

核心函数是：

```ts
export function createManagedAuditStoreContractProfile(
  config: Pick<AppConfig, "auditStoreKind" | "auditStoreUrl" | "auditRetentionDays" | "auditRotationEnabled" | "auditBackupEnabled">,
): ManagedAuditStoreContractProfile {
  const fake = new InMemoryManagedAuditStoreFake({
    retentionDays: config.auditRetentionDays,
    rotationEnabled: config.auditRotationEnabled,
    backupEnabled: config.auditBackupEnabled,
  });
```

这里明确使用 `InMemoryManagedAuditStoreFake`，说明本版只验证 contract，不连接真实 managed store。

## Fake Adapter

fake adapter 的能力很小，但覆盖生产 contract 形状：

```ts
class InMemoryManagedAuditStoreFake {
  private readonly events: ManagedAuditEvent[] = [];

  append(event: ManagedAuditEvent): void {
    this.events.push(event);
  }

  queryByRequestId(requestId: string): ManagedAuditEvent[] {
    return this.events.filter((event) => event.requestId === requestId);
  }

  digest(): string {
    return `sha256:${createHash("sha256").update(JSON.stringify(this.events)).digest("hex")}`;
  }
```

这三个方法对应：

```text
append-only write
query by requestId
digest verification
```

另外还有：

```ts
retentionMetadata(): ManagedAuditStoreContractProfile["fakeAdapterEvidence"]["retentionMetadata"] {
  return { ...this.metadata };
}

backupRestoreMarker(): string {
  return `backup-restore-marker:${this.digest().slice("sha256:".length, "sha256:".length + 16)}`;
}
```

这对应：

```text
retention metadata
backup restore marker
```

## Required Capabilities

本版把五个能力列成结构化数组：

```ts
function createCapabilities(): ManagedAuditCapability[] {
  return [
    {
      id: "append-only-write",
      requiredForProduction: true,
      coveredByFakeAdapter: true,
      productionAdapterRequired: true,
      note: "Production audit must append records without rewriting existing events.",
    },
```

每个 capability 都有：

```text
requiredForProduction=true
coveredByFakeAdapter=true
productionAdapterRequired=true
```

这三者一起表达：fake adapter 覆盖接口形状，但生产仍必须接真实 adapter。

## Evidence 结果

服务会执行一次 fake append，然后查询和 digest：

```ts
const digestBefore = fake.digest();
const event = createContractEvent();
fake.append(event);
const digestAfterWrite = fake.digest();
const digestAfterRepeatRead = fake.digest();
const queried = fake.queryByRequestId(event.requestId);
```

检查项是：

```ts
const checks = {
  appendOnlyWriteCovered: fake.size() === 1 && digestBefore !== digestAfterWrite,
  queryByRequestIdCovered: queried.length === 1 && queried[0]?.id === event.id,
  digestVerificationCovered: digestAfterWrite === digestAfterRepeatRead && digestAfterWrite.startsWith("sha256:"),
  retentionMetadataCovered: retentionMetadata.retentionDays > 0
    && retentionMetadata.rotationEnabled
    && retentionMetadata.backupEnabled,
  backupRestoreMarkerCovered: backupRestoreMarker.startsWith("backup-restore-marker:"),
  fakeAdapterDoesNotClaimProduction: true,
  realManagedAdapterConnected: false,
};
```

注意最后一项：

```text
realManagedAdapterConnected=false
```

这是本版的生产边界，不允许把 fake adapter 误判为生产审计库。

## HTTP 入口

新增路由：

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/managed-store-contract", {
  schema: {
    querystring: {
      type: "object",
      properties: {
        format: { type: "string", enum: ["json", "markdown"] },
      },
      additionalProperties: false,
    },
  },
}, async (request, reply) => {
  const profile = createManagedAuditStoreContractProfile(deps.config);
```

文件位置：

```text
src/routes/auditRoutes.ts
```

它继续支持 JSON 和 Markdown，给自动化和人工 review 使用。

## 生产阻塞项

核心 blocker：

```ts
addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "A fake adapter covers the contract, but no production managed audit adapter is connected.");
```

如果 retention knobs 没配，还会出现：

```text
RETENTION_METADATA_CONTRACT_UNCOVERED
```

这让 v112 的结论很清晰：接口形状可以证明，真实存储没有接入。

## 测试覆盖

新增测试：

```text
test/managedAuditStoreContract.test.ts
```

能力覆盖断言：

```ts
expect(profile.requiredCapabilities.map((capability) => capability.id)).toEqual([
  "append-only-write",
  "query-by-request-id",
  "digest-verification",
  "retention-metadata",
  "backup-restore-marker",
]);
```

fake adapter 证据断言：

```ts
expect(profile.fakeAdapterEvidence).toMatchObject({
  requestId: "managed-audit-contract-request",
  queryByRequestIdCount: 1,
  appendOnlyCountAfterWrite: 1,
  digestStableOnRepeatRead: true,
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
61 个测试文件通过
226 条测试通过
```

运行归档：

```text
b/112/图片/managed-audit-store-contract.png
b/112/解释/运行调试说明.md
```

## 一句话总结

v112 把 managed audit store 的生产前置能力拆成五个 adapter contract，并用 fake adapter 证明接口形状；但真实 managed adapter 没接入，所以生产审计阻塞继续保留。
