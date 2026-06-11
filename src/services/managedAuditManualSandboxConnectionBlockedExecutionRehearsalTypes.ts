import type {
  ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile,
} from "./managedAuditManualSandboxConnectionRehearsalPacketReview.js";
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";

export interface ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1";
  rehearsalState: "manual-sandbox-connection-blocked-execution-rehearsal-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal: boolean;
  readOnlyReview: true;
  sourceNodeV233: {
    sourceVersion: "Node v233";
    profileVersion: ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile["profileVersion"];
    reviewState: ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile["reviewState"];
    reviewDigest: string;
    readyForRehearsalPacketReview: boolean;
    readyForSandboxAdapterConnectionFromSource: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
    managedAuditWritesStillBlocked: boolean;
    upstreamOptimizationEvidenceAccepted: boolean;
    productionBlockerCount: number;
  };
  upstreamOptimizationEvidence: {
    javaV90: JavaV90ContextNormalizationReference;
    miniKvV99: MiniKvV99WalRegressionReference;
  };
  evidenceFiles: BlockedExecutionEvidenceFile[];
  snippetMatches: BlockedExecutionSnippetMatch[];
  blockedExecutionRehearsal: {
    rehearsalDigest: string;
    sourceRehearsalPacketReviewDigest: string;
    markerSpan: "Node v233 + Java v90 + mini-kv v99";
    rehearsalMode: "manual-sandbox-connection-blocked-execution-rehearsal-only";
    simulatedAttemptCount: number;
    blockedAttemptCount: number;
    actualExecutionAttemptCount: number;
    connectionExecutionAllowed: false;
    credentialValueReadAllowed: false;
    schemaMigrationExecutionAllowed: false;
    managedAuditWriteAllowed: false;
    upstreamServiceAutoStartAllowed: false;
    miniKvWriteOrRestoreAllowed: false;
    javaLedgerOrSqlAllowed: false;
    nodeV234BlocksDangerousOperations: boolean;
  };
  simulatedBlockedAttempts: BlockedExecutionAttempt[];
  checks: ManualSandboxBlockedExecutionRehearsalChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    simulatedAttemptCount: number;
    blockedAttemptCount: number;
    actualExecutionAttemptCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxBlockedExecutionRehearsalMessage[];
  warnings: ManualSandboxBlockedExecutionRehearsalMessage[];
  recommendations: ManualSandboxBlockedExecutionRehearsalMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionBlockedExecutionRehearsalJson: string;
    manualSandboxConnectionBlockedExecutionRehearsalMarkdown: string;
    sourceNodeV233Json: string;
    nodeV233Source: string;
    javaV90Runbook: string;
    javaV90Walkthrough: string;
    javaV90ContextHeaderFieldSource: string;
    miniKvV99Runbook: string;
    miniKvV99Walkthrough: string;
    miniKvRuntimeSmokeEvidence: string;
    miniKvVerificationManifest: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface JavaV90ContextNormalizationReference {
  sourceVersion: "Java v90";
  headTag: "v90订单平台release-approval-context-normalization-helper";
  runbookPath: string;
  walkthroughPath: string;
  sourcePath: string;
  evidencePresent: boolean;
  normalizeValuePresent: boolean;
  normalizedFactoryPresent: boolean;
  missingWarningCentralized: boolean;
  allEchoedRetained: boolean;
  contractPreservingRefactorDocumented: boolean;
  noLombokIntroduced: boolean;
  approvalLedgerWrittenByJava: boolean;
  schemaSqlExecutedByJava: boolean;
  credentialValueReadByJava: boolean;
  managedAuditConnectionOpenedByJava: boolean;
  readyForNodeV234BlockedExecutionRehearsal: boolean;
}

export interface MiniKvV99WalRegressionReference {
  sourceVersion: "mini-kv v99";
  headTag: "第九十九版execute-with-wal回归补强";
  runbookPath: string;
  walkthroughPath: string;
  runtimeSmokePath: string;
  verificationManifestPath: string;
  evidencePresent: boolean;
  projectVersion: string;
  releaseVersion: string;
  consumerHint: string;
  writeWalHelper: string;
  writeWalHelperScope: string[];
  writeWalHelperBehaviorPreserved: boolean;
  regressionCoverageDocumented: boolean;
  usageErrorsNoWal: boolean;
  missingExpiredNoOpNoWal: boolean;
  appendBeforeMutationPreserved: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  orderAuthoritative: boolean;
  noRuntimeWriteCommandAdded: boolean;
  runtimeWriteObserved: boolean;
  writeCommandsExecuted: boolean;
  readyForNodeV234BlockedExecutionRehearsal: boolean;
}

export interface BlockedExecutionAttempt {
  id:
    | "managed-audit-connect"
    | "credential-value-read"
    | "schema-migration"
    | "managed-audit-state-write"
    | "upstream-service-auto-start"
    | "mini-kv-write-or-restore"
    | "java-ledger-or-sql"
    | "production-window-open";
  surface: "node" | "java" | "mini-kv" | "production-window";
  requestedOperation: string;
  simulatedOnly: true;
  actualExecutionAttempted: false;
  blocked: true;
  blockedBy: string;
  executionAllowed: false;
  evidenceSource: string;
}

export interface BlockedExecutionEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface BlockedExecutionSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

export type ManualSandboxBlockedExecutionRehearsalChecks = {
  sourceNodeV233ReviewReady: boolean;
  sourceNodeV233DigestPresent: boolean;
  sourceNodeV233StillConnectionBlocked: boolean;
  sourceNodeV233StillWriteBlocked: boolean;
  javaV90EvidencePresent: boolean;
  javaV90ContextNormalizationAccepted: boolean;
  javaV90BoundaryAccepted: boolean;
  miniKvV99EvidencePresent: boolean;
  miniKvV99WalRegressionAccepted: boolean;
  miniKvV99RuntimeBoundaryAccepted: boolean;
  allDangerousOperationsSimulatedOnly: boolean;
  allDangerousOperationsBlocked: boolean;
  credentialValueStillForbidden: boolean;
  schemaMigrationStillBlocked: boolean;
  externalConnectionStillBlocked: boolean;
  managedAuditWritesStillBlocked: boolean;
  upstreamServiceAutoStartStillBlocked: boolean;
  miniKvWriteOrRestoreStillBlocked: boolean;
  javaLedgerOrSqlStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal: boolean;
};

export interface ManualSandboxBlockedExecutionRehearsalMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal"
    | "node-v233-rehearsal-packet-review"
    | "java-v90-context-normalization"
    | "mini-kv-v99-wal-regression"
    | "runtime-config";
  message: string;
}

export interface MiniKvRuntimeSmokeEvidence extends Record<string, unknown> {
  project_version?: unknown;
  release_version?: unknown;
  consumer_hint?: unknown;
  read_only?: unknown;
  execution_allowed?: unknown;
  restore_execution_allowed?: unknown;
  order_authoritative?: unknown;
  write_commands_executed?: unknown;
  runtime_write_observed?: unknown;
}

export interface MiniKvVerificationManifest extends Record<string, unknown> {
  project_version?: unknown;
  release_version?: unknown;
  consumer_hint?: unknown;
  read_only?: unknown;
  execution_allowed?: unknown;
  no_runtime_write_command_added?: unknown;
  version_manifest?: Record<string, unknown>;
  boundaries?: unknown;
}
