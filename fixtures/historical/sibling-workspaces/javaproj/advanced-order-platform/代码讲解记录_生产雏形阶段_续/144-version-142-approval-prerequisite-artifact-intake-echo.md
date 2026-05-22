# 144-version-142-approval-prerequisite-artifact-intake-echo

## 本版目标

Java v142 按 Node `docs/plans2/v305-post-stop-prerequisite-upstream-echo-roadmap.md` 推进，只读回显 Node v306 的 approval prerequisite artifact intake plan。

本版不实现 runtime shell，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发送 HTTP/TCP，不写 approval ledger，不执行 SQL/schema migration，也不启动 Node 或 mini-kv。

## 代码拆分结果

- `ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords.java`
  - 承载 v142 receipt、Node v305 source echo、artifact intake plan、required/prohibited field、rejection reason、no-go boundary、checks、side-effect boundary 等 record。

- `ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog.java`
  - 集中维护 12 个 required fields、8 个 prohibited fields、9 个 rejection reasons、12 个 no-go boundaries、proof claims、Node verification actions 和后续 echo 版本。

- `ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoSupport.java`
  - 从 v141 stop/prerequisite receipt 串接生成 v142 artifact intake echo receipt。
  - 只负责 readiness、digest、warning、boundary lines、no-write proof 的组装，不把常量文案塞回主服务。

- `ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceiptBuilder.java`
  - 保持和相邻 echo builder 一致的薄封装模式，供 response chain、verification hint、warning digest 复用。

## 主链路接入

- `OpsEvidenceService`
  - 新增 Java v142 receipt version。
  - 新增 Node v306 plan version/profile/endpoint/markdown/state 常量。
  - 顶层 rehearsal schema 从 `v42` 升级到 `v43`。

- `ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder`
  - 在 v141 stop/prerequisite echo receipt 之后生成 v142 approval prerequisite artifact intake echo receipt。

- `ReleaseApprovalRehearsalResponse` / `ReleaseApprovalRehearsalResponseBuilder`
  - 新增 v142 receipt 字段，并纳入 verification hint 和 no-ledger-write proof。

- `ReleaseApprovalVerificationHint*` / `ReleaseApprovalVerificationWarningDigest*`
  - schema fields、warning digest inputs、proof claims、Node verification actions、boundary lines 均纳入 v142。

## 关键证据

- Node source: `Node v306`
- Source verification: `Node v305`
- Next Node verification: `Node v307`
- Node profile: `managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan.v1`
- Node route: `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan`
- Markdown route: `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan?format=markdown`
- Node state: `approval-prerequisite-artifact-intake-plan-ready`
- Echo mode: `java-v142-credential-resolver-approval-prerequisite-artifact-intake-echo-only`
- Required field count: `12`
- Prohibited field count: `8`
- Rejection reason count: `9`
- No-go boundary count: `12`
- Java v142 schema: `java-release-approval-rehearsal-response-schema.v43`

## 测试覆盖

- 新增 `OpsEvidenceServiceApprovalPrerequisiteArtifactIntakeEchoTests`
  - 验证 Node v306 profile/route/state、source schema v42、Java v142 schema v43。
  - 验证 12/8/9/12 artifact contract。
  - 验证 Java v142 与 mini-kv v135 并行只读 echo request。
  - 验证所有 runtime/credential/raw endpoint/provider/client/external request/write/migration/auto-start boundary 均为 false。
  - 验证 digest 对 padded header request 稳定。

- 更新 existing schema assertions
  - 顶层 rehearsal/verification schema 从 v42 调整到 v43。
  - v141 focused test 保留 source receipt schema v42 语义。

- 更新 verification hint 和 warning digest catalog tests
  - contribution 数量从 26 到 27。
  - warning digest lines 增加 v142 warning input 和 artifact boundary lines。

## 验证命令

```powershell
mvn -q test
```

结果：通过。日志中 Testcontainers 探测不到 Docker 环境，但本次测试未因此失败；本版没有启动 Docker Desktop，也没有留下 Java/Node/mini-kv 后台服务。

## 维护性判断

`OpsEvidenceService.java` 当前 1260 行，仍低于之前主服务膨胀风险线；新增 v142 没有继续堆成单个 600+ 行 echo support 的孤岛，而是按 records/catalog/support/builder 分拆。

新增文件行数：

- records: 224 行
- catalog: 282 行
- support: 591 行
- builder: 58 行
- focused test: 294 行

本版拆分幅度合理。后续如继续质量优化，更适合单独开版本继续把相邻 echo support 的通用 source profile、check id、boundary code 做模板化，而不是在 v142 里混入大型重构。

## 结论

Java v142 已完成 Node v306 要求的只读 artifact intake echo，为 Node v307 的 upstream echo verification 提供 Java 侧证据。当前仍保持 blocked runtime shell 和全只读边界。
