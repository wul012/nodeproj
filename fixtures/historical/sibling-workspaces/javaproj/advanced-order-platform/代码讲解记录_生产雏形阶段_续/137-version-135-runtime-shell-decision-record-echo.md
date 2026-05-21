# 137-version-135-runtime-shell-decision-record-echo

## 本版目标

Java v135 对齐 Node v299 `runtime shell candidate gate decision record`。

本版只做 read-only echo：

- 回显 Node v299 的 blocked decision record。
- 证明 Java 不实现、不启用、不调用 disabled runtime shell。
- 证明 Java 不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发 HTTP/TCP、不写 ledger、不执行 SQL、不自动启动上游。
- 将 rehearsal response schema 从 `v39` 提升到 `v40`，新增 v135 顶层 receipt。

## 主要新增文件

- `ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoRecords.java`
  - 定义 v135 receipt、source echo、decision record、required evidence、no-go condition、checks、side-effect boundary。
- `ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoSupport.java`
  - 构造 Node v299 blocked decision echo。
  - 固化 4 个 required evidence：
    - `node-v298-upstream-echo-ready`
    - `java-v134-echo-ready`
    - `mini-kv-v131-receipt-ready`
    - `runtime-shell-still-blocked`
  - 固化 6 个 no-go condition：
    - `RUNTIME_SHELL_IMPLEMENTATION_REQUIRED`
    - `CREDENTIAL_VALUE_REQUIRED`
    - `RAW_ENDPOINT_URL_REQUIRED`
    - `MANAGED_AUDIT_CONNECTION_REQUIRED`
    - `LEDGER_SCHEMA_WRITE_REQUIRED`
    - `AUTOSTART_REQUIRED`
- `ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceiptBuilder.java`
  - 给 response chain、verification hint、warning digest 提供统一入口。

## 接入位置

- `OpsEvidenceService`
  - 新增 v135 receipt version。
  - 新增 schema `v40`。
  - 新增 Node v299 profile/endpoint/state 常量。
- `ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder`
  - 在 v134 candidate gate echo 后追加 v135 decision record echo。
- `ReleaseApprovalRehearsalResponse`
  - 新增 `managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt`。
- `ReleaseApprovalVerificationHintBuilder`
  - 将 v135 receipt 加入 warning digest inputs、proof claims、node verification actions、no-ledger proof。
- `ReleaseApprovalVerificationWarningDigestBuilder`
  - 将 v135 warning lines 和 boundary lines 纳入最终 digest。
- `ReleaseApprovalVerificationHintCatalog`
  - schema fields 新增 v135 receipt。

## 测试覆盖

新增 `OpsEvidenceServiceCredentialResolverRuntimeShellDecisionRecordEchoTests`，覆盖：

- Node v299 profile、endpoint、markdown endpoint、state。
- Node v300 next echo verification profile。
- decision record 仍为 `blocked`。
- 4 个 required evidence 全部 present。
- 6 个 no-go condition 全部为 `pause-and-do-not-implement-runtime-shell`。
- 所有 runtime / credential / endpoint / provider / network / ledger / SQL / auto-start side effect 均为 false。
- verification hint schema 为 `v40`。
- v135 receipt 进入 schema fields、warning digest inputs、proof claims、node verification actions。
- receipt digest 在重复请求下稳定。

## 本版边界

本版没有实现 runtime shell，也没有引入运行时 provider/client。

Java v135 只是把 Node v299 的 blocked decision record 冻结成 Java 侧只读证据，给后续 Node v300 做 upstream echo verification 使用。
