export const NODE_V233_SOURCE =
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionRehearsalPacketReview.ts";
export const JAVA_V90_RUNBOOK = "D:/javaproj/advanced-order-platform/c/90/解释/说明.md";
export const JAVA_V90_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/93-version-90-release-approval-context-normalization-helper.md";
export const JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ContextHeaderField.java";
export const MINI_KV_V99_RUNBOOK = "D:/C/mini-kv/c/99/解释/说明.md";
export const MINI_KV_V99_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/155-version-99-wal-helper-regression-evidence.md";
export const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";
export const MINI_KV_VERIFICATION_MANIFEST = "D:/C/mini-kv/fixtures/release/verification-manifest.json";

export const ENDPOINTS = Object.freeze({
  manualSandboxConnectionBlockedExecutionRehearsalJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal",
  manualSandboxConnectionBlockedExecutionRehearsalMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal?format=markdown",
  sourceNodeV233Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review",
  nodeV233Source: NODE_V233_SOURCE,
  javaV90Runbook: JAVA_V90_RUNBOOK,
  javaV90Walkthrough: JAVA_V90_WALKTHROUGH,
  javaV90ContextHeaderFieldSource: JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE,
  miniKvV99Runbook: MINI_KV_V99_RUNBOOK,
  miniKvV99Walkthrough: MINI_KV_V99_WALKTHROUGH,
  miniKvRuntimeSmokeEvidence: MINI_KV_RUNTIME_SMOKE,
  miniKvVerificationManifest: MINI_KV_VERIFICATION_MANIFEST,
  activePlan: "docs/plans/v231-post-preflight-verification-roadmap.md",
});

export const SHA256_HEX = /^[a-f0-9]{64}$/;
export const ACCEPTED_MINI_KV_RUNTIME_SMOKE_WAL_REGRESSION_REFERENCES = Object.freeze([
  {
    projectVersion: "0.99.0",
    releaseVersion: "v99",
    consumerHint: "Node v234 manual sandbox connection blocked execution rehearsal",
  },
  {
    projectVersion: "0.100.0",
    releaseVersion: "v100",
    consumerHint: "Node v235 manual sandbox connection precondition intake",
  },
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
] as const);
