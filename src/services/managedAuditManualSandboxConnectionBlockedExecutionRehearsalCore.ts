import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import type {
  BlockedExecutionAttempt,
  BlockedExecutionEvidenceFile,
  BlockedExecutionSnippetMatch,
  JavaV90ContextNormalizationReference,
  ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile,
  ManualSandboxBlockedExecutionRehearsalChecks,
  ManualSandboxBlockedExecutionRehearsalMessage,
  MiniKvV99WalRegressionReference,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalTypes.js";
import type {
  ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile,
} from "./managedAuditManualSandboxConnectionRehearsalPacketReview.js";

export function createBlockedExecutionRehearsal(
  sourceReview: ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile,
  javaV90: JavaV90ContextNormalizationReference,
  miniKvV99: MiniKvV99WalRegressionReference,
  attempts: BlockedExecutionAttempt[],
): ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile["blockedExecutionRehearsal"] {
  const blockedAttemptCount = attempts.filter((attemptEntry) => attemptEntry.blocked).length;
  const actualExecutionAttemptCount = attempts.filter((attemptEntry) => attemptEntry.actualExecutionAttempted).length;

  return {
    rehearsalDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1",
      sourceRehearsalPacketReviewDigest: sourceReview.rehearsalPacketReview.reviewDigest,
      javaV90,
      miniKvV99,
      attempts,
    }),
    sourceRehearsalPacketReviewDigest: sourceReview.rehearsalPacketReview.reviewDigest,
    markerSpan: "Node v233 + Java v90 + mini-kv v99",
    rehearsalMode: "manual-sandbox-connection-blocked-execution-rehearsal-only",
    simulatedAttemptCount: attempts.length,
    blockedAttemptCount,
    actualExecutionAttemptCount,
    connectionExecutionAllowed: false,
    credentialValueReadAllowed: false,
    schemaMigrationExecutionAllowed: false,
    managedAuditWriteAllowed: false,
    upstreamServiceAutoStartAllowed: false,
    miniKvWriteOrRestoreAllowed: false,
    javaLedgerOrSqlAllowed: false,
    nodeV234BlocksDangerousOperations: blockedAttemptCount === attempts.length && actualExecutionAttemptCount === 0,
  };
}

export function createSummary(
  checks: ManualSandboxBlockedExecutionRehearsalChecks,
  evidenceFiles: BlockedExecutionEvidenceFile[],
  snippetMatches: BlockedExecutionSnippetMatch[],
  simulatedBlockedAttempts: BlockedExecutionAttempt[],
  productionBlockers: ManualSandboxBlockedExecutionRehearsalMessage[],
  warnings: ManualSandboxBlockedExecutionRehearsalMessage[],
  recommendations: ManualSandboxBlockedExecutionRehearsalMessage[],
): ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile["summary"] {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceFileCount: evidenceFiles.length,
    matchedSnippetCount: snippetMatches.filter((snippetMatch) => snippetMatch.matched).length,
    simulatedAttemptCount: simulatedBlockedAttempts.length,
    blockedAttemptCount: simulatedBlockedAttempts.filter((attempt) => attempt.blocked).length,
    actualExecutionAttemptCount: simulatedBlockedAttempts.filter((attempt) => attempt.actualExecutionAttempted).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
