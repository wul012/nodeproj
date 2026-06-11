import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import { ENDPOINTS } from "./managedAuditManualSandboxConnectionReadinessGateConstants.js";
import type {
  JavaV92DryRunEnvelopeEchoReceiptReference,
  ManagedAuditManualSandboxConnectionReadinessGateProfile,
  ManualSandboxConnectionReadinessGateChecks,
  ManualSandboxConnectionReadinessGateMessage,
  MiniKvV101RuntimeNoStartNoWriteFollowUpReference,
  ReadinessGateEvidenceFile,
  ReadinessGateSnippetMatch,
} from "./managedAuditManualSandboxConnectionReadinessGateTypes.js";

export function createReadinessGate(
  sourceNodeV236: ManagedAuditManualSandboxConnectionReadinessGateProfile["sourceNodeV236"],
  javaV92: JavaV92DryRunEnvelopeEchoReceiptReference,
  miniKvV101: MiniKvV101RuntimeNoStartNoWriteFollowUpReference,
): ManagedAuditManualSandboxConnectionReadinessGateProfile["readinessGate"] {
  const base = {
    markerSpan: "Node v236 + Java v92 + mini-kv v101" as const,
    gateMode: "manual-sandbox-connection-readiness-gate-only" as const,
    sourceEnvelopeAccepted: sourceNodeV236.readyForDryRunRequestEnvelope
      && sourceNodeV236.readyForOperatorReview
      && sourceNodeV236.operatorReviewFieldCount === 6,
    javaEchoReceiptAccepted: javaV92.readyForNodeV237Gate,
    miniKvNoStartNoWriteAccepted: miniKvV101.readyForNodeV237Gate,
    readyForOperatorWindowChecklist: sourceNodeV236.readyForDryRunRequestEnvelope
      && javaV92.readyForNodeV237Gate
      && miniKvV101.readyForNodeV237Gate,
    readyForManagedAuditSandboxAdapterConnection: false as const,
    actualConnectionAttempted: false as const,
    credentialValueRead: false as const,
    schemaMigrationRequested: false as const,
    managedAuditStateWriteRequested: false as const,
    upstreamServiceAutoStartRequested: false as const,
    miniKvExecutionPermissionInferred: false as const,
    productionWindowOpened: false as const,
  };

  return {
    ...base,
    gateDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-readiness-gate.v1",
      sourceEnvelopeDigest: sourceNodeV236.envelopeDigest,
      javaV92,
      miniKvV101,
      gateMode: base.gateMode,
      boundary: {
        readyForManagedAuditSandboxAdapterConnection: base.readyForManagedAuditSandboxAdapterConnection,
        actualConnectionAttempted: base.actualConnectionAttempted,
        credentialValueRead: base.credentialValueRead,
        schemaMigrationRequested: base.schemaMigrationRequested,
        managedAuditStateWriteRequested: base.managedAuditStateWriteRequested,
        upstreamServiceAutoStartRequested: base.upstreamServiceAutoStartRequested,
        miniKvExecutionPermissionInferred: base.miniKvExecutionPermissionInferred,
        productionWindowOpened: base.productionWindowOpened,
      },
    }),
  };
}

export function createReadinessGateProfile(input: {
  sourceNodeV236: ManagedAuditManualSandboxConnectionReadinessGateProfile["sourceNodeV236"];
  javaV92: JavaV92DryRunEnvelopeEchoReceiptReference;
  miniKvV101: MiniKvV101RuntimeNoStartNoWriteFollowUpReference;
  readinessGate: ManagedAuditManualSandboxConnectionReadinessGateProfile["readinessGate"];
  evidenceFiles: ReadinessGateEvidenceFile[];
  snippetMatches: ReadinessGateSnippetMatch[];
  checks: ManualSandboxConnectionReadinessGateChecks;
  productionBlockers: ManualSandboxConnectionReadinessGateMessage[];
  warnings: ManualSandboxConnectionReadinessGateMessage[];
  recommendations: ManualSandboxConnectionReadinessGateMessage[];
}): ManagedAuditManualSandboxConnectionReadinessGateProfile {
  const gateState = input.checks.readyForManagedAuditManualSandboxConnectionReadinessGate
    ? "manual-sandbox-connection-readiness-gate-ready"
    : "blocked";

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection readiness gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-readiness-gate.v1",
    gateState,
    readyForManagedAuditManualSandboxConnectionReadinessGate:
      input.checks.readyForManagedAuditManualSandboxConnectionReadinessGate,
    readyForOperatorWindowChecklist: input.checks.readyForOperatorWindowChecklist,
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
    sourceNodeV236: input.sourceNodeV236,
    upstreamReadinessEvidence: {
      javaV92: input.javaV92,
      miniKvV101: input.miniKvV101,
    },
    readinessGate: input.readinessGate,
    evidenceFiles: input.evidenceFiles,
    snippetMatches: input.snippetMatches,
    checks: input.checks,
    summary: {
      checkCount: countReportChecks(input.checks),
      passedCheckCount: countPassedReportChecks(input.checks),
      evidenceFileCount: input.evidenceFiles.length,
      matchedSnippetCount: input.snippetMatches.filter((entry) => entry.matched).length,
      javaEchoedFieldCount: input.javaV92.echoedEnvelopeFieldCount,
      miniKvHistoricalAnchorCount: input.miniKvV101.historicalReceiptAnchorCount,
      productionBlockerCount: input.productionBlockers.length,
      warningCount: input.warnings.length,
      recommendationCount: input.recommendations.length,
    },
    productionBlockers: input.productionBlockers,
    warnings: input.warnings,
    recommendations: input.recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v237 as readiness gate only; do not open the managed audit sandbox connection.",
      "Use Node v238 to create an operator window checklist before any real sandbox connection discussion.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false until an explicit human window approval exists outside this readiness gate.",
    ],
  };
}
