export interface JavaV91SandboxConnectionPreconditionReceiptReference {
  sourceVersion: "Java v91";
  headTag: "v91订单平台release-approval-sandbox-connection-precondition-receipt";
  runbookPath: string;
  walkthroughPath: string;
  builderSourcePath: string;
  evidencePresent: boolean;
  readyForNodeV235ManualSandboxConnectionPreconditionIntake: boolean;
  consumedNodeV234BlockedExecutionRehearsal: boolean;
  ownerApprovalArtifactRequired: boolean;
  credentialHandleReviewRequired: boolean;
  schemaRehearsalEvidenceRequired: boolean;
  rollbackPathRequired: boolean;
  timeoutBudgetRequired: boolean;
  manualAbortMarkerRequired: boolean;
  ownerApprovalArtifactProvidedByJava: boolean;
  credentialValueReadByJava: boolean;
  schemaMigrationSqlExecutedByJava: boolean;
  externalManagedAuditConnectionOpenedByJava: boolean;
  actualConnectionAttemptedByJava: boolean;
  approvalLedgerWrittenByJava: boolean;
  readyForNodeV235Intake: boolean;
}

export interface MiniKvV100RollingRuntimeFixtureGuardReference {
  sourceVersion: "mini-kv v100";
  headTag: "第一百版运行证据滚动守卫";
  runbookPath: string;
  walkthroughPath: string;
  guardPath: string;
  runtimeSmokePath: string;
  verificationManifestPath: string;
  evidencePresent: boolean;
  guardVersion: string;
  projectVersion: string;
  releaseVersion: string;
  consumerHint: string;
  currentArtifactPathHint: string;
  currentLiveReadSessionEcho: string;
  readOnly: boolean;
  executionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  orderAuthoritative: boolean;
  historicalReceiptAnchorCount: number;
  historicalReceiptAnchorsStable: boolean;
  requiredChecksMentionNodeV235: boolean;
  boundariesForbidExecution: boolean;
  readyForNodeV235Intake: boolean;
}

export interface PreconditionIntakeEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface PreconditionIntakeSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

export type ManualSandboxPreconditionIntakeChecks = {
  sourceNodeV234BlockedExecutionRehearsalReady: boolean;
  sourceNodeV234DigestPresent: boolean;
  sourceNodeV234StillBlocksAllDangerousOperations: boolean;
  javaV91EvidencePresent: boolean;
  javaV91PreconditionsAccepted: boolean;
  javaV91BoundaryAccepted: boolean;
  miniKvV100EvidencePresent: boolean;
  miniKvV100RollingGuardAccepted: boolean;
  miniKvV100RuntimeBoundaryAccepted: boolean;
  requiredPreconditionsDocumented: boolean;
  handlesOnlyIntake: boolean;
  noConnectionAttempted: boolean;
  noCredentialValueRead: boolean;
  noSchemaMigrationExecuted: boolean;
  noManagedAuditStateWritten: boolean;
  noUpstreamServiceAutoStarted: boolean;
  noMiniKvExecutionPermissionInferred: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionPreconditionIntake: boolean;
};

export interface ManualSandboxPreconditionIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-precondition-intake"
    | "node-v234-blocked-execution-rehearsal"
    | "java-v91-precondition-receipt"
    | "mini-kv-v100-rolling-runtime-guard"
    | "runtime-config";
  message: string;
}

export type JsonObject = Record<string, unknown>;

export const NODE_V234_ROUTE = "/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal";

export const JAVA_V91_RUNBOOK = "D:/javaproj/advanced-order-platform/c/91/解释/说明.md";

export const JAVA_V91_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/94-version-91-release-approval-sandbox-connection-precondition-receipt.md";

export const JAVA_V91_BUILDER_SOURCE =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionPreconditionReceiptBuilder.java";

export const MINI_KV_V100_RUNBOOK = "D:/C/mini-kv/c/100/解释/说明.md";

export const MINI_KV_V100_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/156-version-100-current-runtime-fixture-rolling-guard.md";

export const MINI_KV_V100_ROLLING_GUARD = "D:/C/mini-kv/fixtures/release/current-runtime-fixture-rolling-guard.json";

export const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";

export const MINI_KV_VERIFICATION_MANIFEST = "D:/C/mini-kv/fixtures/release/verification-manifest.json";

export const ENDPOINTS = Object.freeze({
  manualSandboxConnectionPreconditionIntakeJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake",
  manualSandboxConnectionPreconditionIntakeMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake?format=markdown",
  sourceNodeV234Json: NODE_V234_ROUTE,
  javaV91Runbook: JAVA_V91_RUNBOOK,
  javaV91Walkthrough: JAVA_V91_WALKTHROUGH,
  javaV91BuilderSource: JAVA_V91_BUILDER_SOURCE,
  miniKvV100Runbook: MINI_KV_V100_RUNBOOK,
  miniKvV100Walkthrough: MINI_KV_V100_WALKTHROUGH,
  miniKvV100RollingGuard: MINI_KV_V100_ROLLING_GUARD,
  miniKvRuntimeSmokeEvidence: MINI_KV_RUNTIME_SMOKE,
  miniKvVerificationManifest: MINI_KV_VERIFICATION_MANIFEST,
  activePlan: "docs/plans/v234-post-blocked-execution-rehearsal-roadmap.md",
});

export const SHA256_HEX = /^[a-f0-9]{64}$/;

export const ACCEPTED_MINI_KV_CURRENT_RUNTIME_GUARDS = Object.freeze([
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
