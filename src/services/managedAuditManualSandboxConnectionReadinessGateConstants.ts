export const JAVA_V92_RUNBOOK = "D:/javaproj/advanced-order-platform/c/92/解释/说明.md";
export const JAVA_V92_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/95-version-92-release-approval-sandbox-connection-dry-run-envelope-echo-receipt.md";
export const JAVA_V92_BUILDER_SOURCE =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceiptBuilder.java";
export const MINI_KV_V101_RUNBOOK = "D:/C/mini-kv/c/101/解释/说明.md";
export const MINI_KV_V101_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/157-version-101-runtime-no-start-no-write-follow-up.md";
export const MINI_KV_V101_FOLLOW_UP = "D:/C/mini-kv/fixtures/release/runtime-no-start-no-write-follow-up.json";
export const ACCEPTED_MINI_KV_RUNTIME_NO_START_NO_WRITE_FOLLOW_UPS = Object.freeze([
  {
    projectVersion: "0.101.0",
    releaseVersion: "v101",
    consumerHint: "Node v237 manual sandbox connection readiness gate",
  },
  {
    projectVersion: "0.102.0",
    releaseVersion: "v102",
    consumerHint: "Node v239 manual sandbox connection operator window evidence verification",
  },
  {
    projectVersion: "0.102.0",
    releaseVersion: "v102",
    consumerHint: "Node v244 manual sandbox dry-run command upstream echo verification",
  },
  {
    projectVersion: "0.102.0",
    releaseVersion: "v102",
    consumerHint: "Node v246 manual sandbox connection precheck upstream receipt verification",
  },
]);

export const ENDPOINTS = Object.freeze({
  manualSandboxConnectionReadinessGateJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate",
  manualSandboxConnectionReadinessGateMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate?format=markdown",
  sourceNodeV236Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope",
  javaV92Runbook: JAVA_V92_RUNBOOK,
  javaV92Walkthrough: JAVA_V92_WALKTHROUGH,
  javaV92BuilderSource: JAVA_V92_BUILDER_SOURCE,
  miniKvV101Runbook: MINI_KV_V101_RUNBOOK,
  miniKvV101Walkthrough: MINI_KV_V101_WALKTHROUGH,
  miniKvV101FollowUp: MINI_KV_V101_FOLLOW_UP,
  activePlan: "docs/plans/v236-post-dry-run-envelope-roadmap.md",
});

export const SHA256_HEX = /^[a-f0-9]{64}$/;
