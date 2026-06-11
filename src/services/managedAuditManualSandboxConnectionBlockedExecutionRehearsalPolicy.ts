import type { AppConfig } from "../config.js";
import { SHA256_HEX } from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalConstants.js";
import type {
  BlockedExecutionAttempt,
  JavaV90ContextNormalizationReference,
  ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile,
  ManualSandboxBlockedExecutionRehearsalChecks,
  ManualSandboxBlockedExecutionRehearsalMessage,
  MiniKvV99WalRegressionReference,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalTypes.js";
import type {
  ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile,
} from "./managedAuditManualSandboxConnectionRehearsalPacketReview.js";

export function createBlockedExecutionAttempts(): BlockedExecutionAttempt[] {
  return [
    attempt(
      "managed-audit-connect",
      "node",
      "open managed audit sandbox adapter connection",
      "readyForManagedAuditSandboxAdapterConnection=false and connectsManagedAudit=false",
      "Node v233 rehearsal packet review",
    ),
    attempt(
      "credential-value-read",
      "node",
      "read ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE value",
      "readsManagedAuditCredential=false and credential handle remains a name only",
      "Node v233 + Java v90 boundary evidence",
    ),
    attempt(
      "schema-migration",
      "node",
      "execute managed audit schema rehearsal or migration",
      "schemaMigrationExecuted=false and schemaMigrationExecutionAllowed=false",
      "Node v233 + mini-kv v99 runtime boundary",
    ),
    attempt(
      "managed-audit-state-write",
      "node",
      "write managed audit state or local adapter records",
      "managedAuditWriteAllowed=false and storesManagedAuditCredential=false",
      "Node v233 rehearsal packet review",
    ),
    attempt(
      "upstream-service-auto-start",
      "node",
      "auto-start Java, mini-kv, or managed audit adapter service",
      "automaticUpstreamStart=false and no-start guard remains closed",
      "mini-kv v99 no-start guard receipt",
    ),
    attempt(
      "mini-kv-write-or-restore",
      "mini-kv",
      "execute SETNXEX, LOAD, COMPACT, RESTORE, or WAL-changing smoke command",
      "mini-kv v99 read_only=true, execution_allowed=false, restore_execution_allowed=false",
      "mini-kv v99 runtime smoke evidence",
    ),
    attempt(
      "java-ledger-or-sql",
      "java",
      "write Java approval ledger or execute SQL from rehearsal",
      "Java v90 says no approval ledger write and no SQL execution",
      "Java v90 ContextHeaderField normalization evidence",
    ),
    attempt(
      "production-window-open",
      "production-window",
      "open production audit or production operation window",
      "readyForProductionAudit=false and readyForProductionWindow=false",
      "Node v234 blocked execution rehearsal",
    ),
  ];
}

export function createChecks(
  config: AppConfig,
  sourceReview: ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile,
  javaV90: JavaV90ContextNormalizationReference,
  miniKvV99: MiniKvV99WalRegressionReference,
  rehearsal: ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile["blockedExecutionRehearsal"],
  attempts: BlockedExecutionAttempt[],
): ManualSandboxBlockedExecutionRehearsalChecks {
  return {
    sourceNodeV233ReviewReady:
      sourceReview.readyForManagedAuditManualSandboxConnectionRehearsalPacketReview
      && sourceReview.reviewState === "manual-sandbox-connection-rehearsal-packet-review-ready",
    sourceNodeV233DigestPresent: SHA256_HEX.test(sourceReview.rehearsalPacketReview.reviewDigest),
    sourceNodeV233StillConnectionBlocked: !sourceReview.readyForManagedAuditSandboxAdapterConnection
      && !sourceReview.connectsManagedAudit
      && !sourceReview.readsManagedAuditCredential
      && !sourceReview.schemaMigrationExecuted,
    sourceNodeV233StillWriteBlocked: !sourceReview.rehearsalPacketReview.managedAuditWriteAllowed,
    javaV90EvidencePresent: javaV90.evidencePresent,
    javaV90ContextNormalizationAccepted: javaV90.readyForNodeV234BlockedExecutionRehearsal,
    javaV90BoundaryAccepted: !javaV90.approvalLedgerWrittenByJava
      && !javaV90.schemaSqlExecutedByJava
      && !javaV90.credentialValueReadByJava
      && !javaV90.managedAuditConnectionOpenedByJava,
    miniKvV99EvidencePresent: miniKvV99.evidencePresent,
    miniKvV99WalRegressionAccepted: miniKvV99.readyForNodeV234BlockedExecutionRehearsal,
    miniKvV99RuntimeBoundaryAccepted: miniKvV99.readOnly
      && !miniKvV99.executionAllowed
      && !miniKvV99.restoreExecutionAllowed
      && !miniKvV99.orderAuthoritative
      && !miniKvV99.runtimeWriteObserved
      && !miniKvV99.writeCommandsExecuted,
    allDangerousOperationsSimulatedOnly: attempts.every((attemptEntry) => attemptEntry.simulatedOnly
      && !attemptEntry.actualExecutionAttempted),
    allDangerousOperationsBlocked: attempts.every((attemptEntry) => attemptEntry.blocked
      && !attemptEntry.executionAllowed) && rehearsal.nodeV234BlocksDangerousOperations,
    credentialValueStillForbidden: !rehearsal.credentialValueReadAllowed,
    schemaMigrationStillBlocked: !rehearsal.schemaMigrationExecutionAllowed,
    externalConnectionStillBlocked: !rehearsal.connectionExecutionAllowed,
    managedAuditWritesStillBlocked: !rehearsal.managedAuditWriteAllowed,
    upstreamServiceAutoStartStillBlocked: !rehearsal.upstreamServiceAutoStartAllowed,
    miniKvWriteOrRestoreStillBlocked: !rehearsal.miniKvWriteOrRestoreAllowed,
    javaLedgerOrSqlStillBlocked: !rehearsal.javaLedgerOrSqlAllowed,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal: false,
  };
}

export function collectProductionBlockers(
  checks: ManualSandboxBlockedExecutionRehearsalChecks,
): ManualSandboxBlockedExecutionRehearsalMessage[] {
  const blockers: ManualSandboxBlockedExecutionRehearsalMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV233ReviewReady, "NODE_V233_REHEARSAL_PACKET_REVIEW_NOT_READY", "node-v233-rehearsal-packet-review", "Node v233 rehearsal packet review must be ready before v234 blocked execution rehearsal.");
  addBlocker(blockers, checks.sourceNodeV233StillConnectionBlocked, "SOURCE_REVIEW_UNLOCKED_CONNECTION", "node-v233-rehearsal-packet-review", "Node v233 source review must still block connection, credential reads, and schema migration.");
  addBlocker(blockers, checks.sourceNodeV233StillWriteBlocked, "SOURCE_REVIEW_UNLOCKED_WRITE", "node-v233-rehearsal-packet-review", "Node v233 source review must still block managed audit writes.");
  addBlocker(blockers, checks.javaV90ContextNormalizationAccepted, "JAVA_V90_CONTEXT_NORMALIZATION_NOT_ACCEPTED", "java-v90-context-normalization", "Java v90 context normalization evidence must be present and no-write.");
  addBlocker(blockers, checks.miniKvV99WalRegressionAccepted, "MINIKV_V99_WAL_REGRESSION_NOT_ACCEPTED", "mini-kv-v99-wal-regression", "mini-kv v99 WAL regression evidence must preserve read-only runtime boundaries.");
  addBlocker(blockers, checks.allDangerousOperationsSimulatedOnly, "DANGEROUS_OPERATION_ACTUALLY_ATTEMPTED", "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal", "v234 may only simulate blocked attempts; it must not execute connection, credential, schema, write, restore, or auto-start operations.");
  addBlocker(blockers, checks.allDangerousOperationsBlocked, "DANGEROUS_OPERATION_NOT_BLOCKED", "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal", "Every dangerous operation in the rehearsal matrix must remain blocked.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  return blockers;
}

export function collectWarnings(): ManualSandboxBlockedExecutionRehearsalMessage[] {
  return [
    {
      code: "BLOCKED_EXECUTION_REHEARSAL_ONLY_NO_REAL_ATTEMPT",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal",
      message: "This profile rehearses the block matrix only; it does not open a connection or intentionally trigger a live rejection.",
    },
    {
      code: "OPTIMIZATION_EVIDENCE_IS_STILL_NOT_PERMISSION",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal",
      message: "Java v90 and mini-kv v99 prove quality improvements, not permission to write ledgers, read credentials, or start services.",
    },
  ];
}

export function collectRecommendations(): ManualSandboxBlockedExecutionRehearsalMessage[] {
  return [
    {
      code: "START_POST_V234_PLAN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal",
      message: "Close the v231 plan after v234 and start a post-v234 plan that separates blocked rehearsal from any real sandbox connection.",
    },
    {
      code: "NEXT_STEP_REQUIRES_MANUAL_WINDOW_DESIGN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal",
      message: "The next stage should define a human-approved sandbox window and credential-handle review before any real connection adapter work.",
    },
  ];
}

function attempt(
  id: BlockedExecutionAttempt["id"],
  surface: BlockedExecutionAttempt["surface"],
  requestedOperation: string,
  blockedBy: string,
  evidenceSource: string,
): BlockedExecutionAttempt {
  return {
    id,
    surface,
    requestedOperation,
    simulatedOnly: true,
    actualExecutionAttempted: false,
    blocked: true,
    blockedBy,
    executionAllowed: false,
    evidenceSource,
  };
}

function addBlocker(
  messages: ManualSandboxBlockedExecutionRehearsalMessage[],
  condition: boolean,
  code: string,
  source: ManualSandboxBlockedExecutionRehearsalMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({
      code,
      severity: "blocker",
      source,
      message,
    });
  }
}
