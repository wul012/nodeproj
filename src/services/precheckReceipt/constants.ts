export const JAVA_V99_RUNBOOK = "D:/javaproj/advanced-order-platform/c/99/解释/说明.md";
export const JAVA_V99_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/102-version-99-release-approval-sandbox-precheck-packet-echo-receipt.md";
export const JAVA_V99_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionPrecheckPacketEchoReceiptBuilder.java";

export const MINI_KV_V108_RECEIPT = "D:/C/mini-kv/fixtures/release/manual-sandbox-connection-precheck-non-participation-receipt.json";
export const MINI_KV_V108_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/164-version-108-manual-sandbox-precheck-non-participation-receipt.md";
export const MINI_KV_V108_RUNBOOK = "D:/C/mini-kv/c/108/解释/说明.md";

export const NODE_V245_OPERATOR_FIELDS = Object.freeze([
  "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
  "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
  "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS",
  "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
]);

export const NODE_V245_PRECHECK_ITEMS = Object.freeze([
  "owner approval artifact",
  "credential handle review",
  "schema migration rehearsal id",
  "operator window",
  "rollback path",
  "manual abort marker",
  "timeout policy",
]);

export const ENDPOINTS = Object.freeze({
  precheckUpstreamReceiptVerificationJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
  precheckUpstreamReceiptVerificationMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification?format=markdown",
  sourceNodeV245Json:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet",
  activePlan: "docs/plans/v245-post-sandbox-precheck-roadmap.md",
});
