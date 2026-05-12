# 第一百零九版代码讲解：audit retention integrity evidence

本版目标是把 v106 的 file audit restart evidence 再往生产审计方向推进一步。

它不做真实删除、轮转、备份，也不接数据库或云审计服务。它的角色是把生产审计必须关心的几个问题先变成可读、可测、可归档的 evidence：

```text
保留天数是否配置
文件大小上限是否配置
轮转策略是否配置
备份策略是否配置
当前 audit event digest 是否稳定
是否仍缺 managed audit store
```

## 本版所处项目进度

v106 已经证明 file audit runtime 可以把带 access guard / operator identity 的事件恢复出来。

v107 已经把 file audit restart evidence 纳入 production readiness summary v4。

v109 补的是 audit retention 和 integrity 层面的证据。它不是把 file audit 升级成生产审计库，而是更清楚地告诉后续 readiness summary：

```text
本地 file audit evidence 更完整了
但 managed audit store 仍然没完成
```

## 配置入口

本版在 `src/config.ts` 新增四个审计策略字段：

```ts
auditRetentionDays: number;
auditMaxFileBytes: number;
auditRotationEnabled: boolean;
auditBackupEnabled: boolean;
```

对应环境变量是：

```text
AUDIT_RETENTION_DAYS
AUDIT_MAX_FILE_BYTES
AUDIT_ROTATION_ENABLED
AUDIT_BACKUP_ENABLED
```

默认值仍然是未配置：

```text
retentionDays=0
maxFileBytes=0
rotationEnabled=false
backupEnabled=false
```

这样默认状态不会误判为生产审计就绪。

## Evidence 服务

新增服务文件：

```text
src/services/auditRetentionIntegrityEvidence.ts
```

核心入口是：

```ts
export function createAuditRetentionIntegrityEvidence(input: {
  config: Pick<AppConfig, "auditRetentionDays" | "auditMaxFileBytes" | "auditRotationEnabled" | "auditBackupEnabled">;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
}): AuditRetentionIntegrityEvidence {
  const events = input.auditLog.list(input.runtime.capacity);
  const canonicalEventDigest = digestEvents(events);
  const repeatedCanonicalEventDigest = digestEvents(input.auditLog.list(input.runtime.capacity));
  const fileSnapshot = readAuditFileSnapshot(input.runtime.auditStorePath);
```

这里有两个 digest：

```text
canonicalEventDigest：基于 AuditLog 事件列表生成
fileDigest：基于 JSONL 文件原文生成
```

`repeatedCanonicalEventDigest` 用来证明同一次读取期间 digest 稳定：

```ts
integrityDigestStable: canonicalEventDigest === repeatedCanonicalEventDigest,
```

这不是防篡改系统，但它让审计事件具备可复查的完整性指纹。

## Retention Policy

返回对象里的策略字段是：

```ts
retentionPolicy: {
  retentionDays: input.config.auditRetentionDays,
  maxFileBytes: input.config.auditMaxFileBytes,
  rotationEnabled: input.config.auditRotationEnabled,
  backupEnabled: input.config.auditBackupEnabled,
  managedStoreConfigured: false,
  deletesOrRotatesFiles: false,
},
```

最后两个字段很重要：

```text
managedStoreConfigured=false
deletesOrRotatesFiles=false
```

这说明 v109 只是 evidence，不会实际清理或移动审计文件。

## 生产阻塞项

检查项集中在：

```ts
const checks = {
  fileRuntimeSelected: input.runtime.runtimeStoreKind === "file",
  retentionDaysConfigured: input.config.auditRetentionDays > 0,
  maxFileBytesConfigured: input.config.auditMaxFileBytes > 0,
  rotationPolicyConfigured: input.config.auditRotationEnabled,
  backupPolicyConfigured: input.config.auditBackupEnabled,
  managedStoreConfigured: false,
  integrityDigestStable: canonicalEventDigest === repeatedCanonicalEventDigest,
  readOnlyEvidenceOnly: true,
};
```

如果 retention / rotation / backup 没配，会产生对应 blocker。

即使这些都配置齐，仍然会保留：

```ts
addMessage(blockers, checks.managedStoreConfigured, "MANAGED_AUDIT_STORE_MISSING", "A managed durable audit store is still required before production operations.");
```

这条 blocker 是 v109 的生产边界：file audit 只能作为本地演练证据，不能替代生产级审计存储。

## 文件完整性读取

文件 digest 读取逻辑是：

```ts
function readAuditFileSnapshot(filePath: string | undefined): {
  digest?: string;
  lineCount: number;
  bytes: number;
} {
  if (filePath === undefined || !existsSync(filePath)) {
    return { lineCount: 0, bytes: 0 };
  }

  const content = readFileSync(filePath, "utf8");
  return {
    digest: `sha256:${createHash("sha256").update(content).digest("hex")}`,
    lineCount: content.split(/\r?\n/).filter((line) => line.trim().length > 0).length,
    bytes: Buffer.byteLength(content, "utf8"),
  };
}
```

这段只读文件，不写文件，不截断文件，也不做轮转。它适合 smoke、归档和 readiness summary 使用。

## HTTP 入口

新增路由：

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/retention-integrity-evidence", {
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
  const report = createAuditRetentionIntegrityEvidence({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
  });
```

文件位置：

```text
src/routes/auditRoutes.ts
```

和前几版一样，它支持 JSON 和 Markdown 两种输出，便于自动化检查和人工阅读。

## 测试覆盖

新增测试文件：

```text
test/auditRetentionIntegrityEvidence.test.ts
```

第一组测试验证默认缺失策略时会阻塞：

```ts
expect(report.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
  "AUDIT_FILE_RUNTIME_NOT_SELECTED",
  "AUDIT_RETENTION_DAYS_MISSING",
  "AUDIT_MAX_FILE_BYTES_MISSING",
  "AUDIT_ROTATION_POLICY_MISSING",
  "AUDIT_BACKUP_POLICY_MISSING",
  "MANAGED_AUDIT_STORE_MISSING",
]));
```

第二组测试验证 file runtime + policy knobs 配齐时 digest 稳定：

```ts
expect(report.checks).toMatchObject({
  fileRuntimeSelected: true,
  retentionDaysConfigured: true,
  maxFileBytesConfigured: true,
  rotationPolicyConfigured: true,
  backupPolicyConfigured: true,
  managedStoreConfigured: false,
  integrityDigestStable: true,
  readOnlyEvidenceOnly: true,
});
```

此时 blocker 收敛为：

```ts
expect(report.productionBlockers.map((blocker) => blocker.code)).toEqual([
  "MANAGED_AUDIT_STORE_MISSING",
]);
```

第三组测试覆盖 HTTP JSON 和 Markdown：

```ts
expect(markdown.body).toContain("# Audit retention integrity evidence");
expect(markdown.body).toContain("MANAGED_AUDIT_STORE_MISSING");
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
58 个测试文件通过
217 条测试通过
```

运行归档：

```text
b/109/图片/audit-retention-integrity-evidence.png
b/109/解释/运行调试说明.md
```

## 一句话总结

v109 把 file audit 的 retention knobs 和 integrity digest 固化成只读 evidence，让生产审计阻塞项从“泛泛缺 retention”推进到“本地策略可检查，但 managed audit store 仍缺失”的更清晰状态。
