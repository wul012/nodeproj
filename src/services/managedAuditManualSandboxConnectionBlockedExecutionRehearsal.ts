import type { AppConfig } from "../config.js";
import { ENDPOINTS } from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalConstants.js";
import {
  createBlockedExecutionRehearsal,
  createSummary,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalCore.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createBlockedExecutionAttempts,
  createChecks,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalPolicy.js";
import {
  createEvidenceFiles,
  createJavaV90Reference,
  createMiniKvV99Reference,
  createSnippetMatches,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalReferences.js";
import type {
  ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalTypes.js";
import {
  loadManagedAuditManualSandboxConnectionRehearsalPacketReview,
} from "./managedAuditManualSandboxConnectionRehearsalPacketReview.js";

export {
  renderManagedAuditManualSandboxConnectionBlockedExecutionRehearsalMarkdown,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalRenderer.js";

export type {
  ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalTypes.js";

export function loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile {
  const sourceReview = loadManagedAuditManualSandboxConnectionRehearsalPacketReview({ config: input.config });
  const evidenceFiles = createEvidenceFiles();
  const snippetMatches = createSnippetMatches();
  const javaV90 = createJavaV90Reference(evidenceFiles, snippetMatches);
  const miniKvV99 = createMiniKvV99Reference(evidenceFiles, snippetMatches);
  const simulatedBlockedAttempts = createBlockedExecutionAttempts();
  const blockedExecutionRehearsal = createBlockedExecutionRehearsal(
    sourceReview,
    javaV90,
    miniKvV99,
    simulatedBlockedAttempts,
  );
  const checks = createChecks(
    input.config,
    sourceReview,
    javaV90,
    miniKvV99,
    blockedExecutionRehearsal,
    simulatedBlockedAttempts,
  );
  checks.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal")
    .every(([, value]) => value);
  const rehearsalState = checks.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal
    ? "manual-sandbox-connection-blocked-execution-rehearsal-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection blocked execution rehearsal",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1",
    rehearsalState,
    readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal:
      checks.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyReview: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV233: {
      sourceVersion: "Node v233",
      profileVersion: sourceReview.profileVersion,
      reviewState: sourceReview.reviewState,
      reviewDigest: sourceReview.rehearsalPacketReview.reviewDigest,
      readyForRehearsalPacketReview: sourceReview.readyForManagedAuditManualSandboxConnectionRehearsalPacketReview,
      readyForSandboxAdapterConnectionFromSource: sourceReview.readyForManagedAuditSandboxAdapterConnection,
      connectsManagedAudit: sourceReview.connectsManagedAudit,
      readsManagedAuditCredential: sourceReview.readsManagedAuditCredential,
      schemaMigrationExecuted: sourceReview.schemaMigrationExecuted,
      managedAuditWritesStillBlocked: sourceReview.rehearsalPacketReview.managedAuditWriteAllowed === false,
      upstreamOptimizationEvidenceAccepted:
        sourceReview.rehearsalPacketReview.upstreamOptimizationEvidenceAccepted,
      productionBlockerCount: sourceReview.summary.productionBlockerCount,
    },
    upstreamOptimizationEvidence: {
      javaV90,
      miniKvV99,
    },
    evidenceFiles,
    snippetMatches,
    blockedExecutionRehearsal,
    simulatedBlockedAttempts,
    checks,
    summary: createSummary(
      checks,
      evidenceFiles,
      snippetMatches,
      simulatedBlockedAttempts,
      productionBlockers,
      warnings,
      recommendations,
    ),
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v234 as blocked execution rehearsal evidence; do not open the managed audit sandbox connection.",
      "Start the next plan from post-v234 rather than appending overlapping versions into the v231 plan.",
      "Only move toward a real sandbox connection after a human-approved manual window and credential-handle review plan exist.",
    ],
  };
}
