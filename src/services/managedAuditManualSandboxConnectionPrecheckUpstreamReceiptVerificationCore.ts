import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import { ENDPOINTS } from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationConstants.js";
import type {
  JavaV99PrecheckEchoReference,
  ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile,
  MiniKvV108PrecheckNonParticipationReference,
  PrecheckUpstreamReceiptVerificationChecks,
  PrecheckUpstreamReceiptVerificationMessage,
} from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationTypes.js";

export function createPrecheckUpstreamReceiptVerificationProfile(input: {
  sourceNodeV245: ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile["sourceNodeV245"];
  javaV99: JavaV99PrecheckEchoReference;
  miniKvV108: MiniKvV108PrecheckNonParticipationReference;
  checks: PrecheckUpstreamReceiptVerificationChecks;
  productionBlockers: PrecheckUpstreamReceiptVerificationMessage[];
  warnings: PrecheckUpstreamReceiptVerificationMessage[];
  recommendations: PrecheckUpstreamReceiptVerificationMessage[];
}): ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile {
  const verificationState = input.checks.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification
    ? "manual-sandbox-precheck-upstream-receipt-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification.v1",
    verificationState,
    nodeV245PrecheckDigest: input.sourceNodeV245.precheckDigest,
    javaV99Ready: input.javaV99.readyForNodeV247Alignment,
    miniKvV108ReceiptDigest: input.miniKvV108.receiptDigest,
    checks: input.checks,
  });

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection precheck upstream receipt verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification.v1",
    verificationState,
    readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification:
      input.checks.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification,
    readOnlyUpstreamReceiptVerification: true,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV245: input.sourceNodeV245,
    upstreamReceipts: {
      javaV99: input.javaV99,
      miniKvV108: input.miniKvV108,
    },
    receiptVerification: {
      verificationDigest,
      verificationMode: "java-v99-plus-mini-kv-v108-precheck-upstream-receipt-verification-only",
      sourceSpan: "Node v245 + Java v99 + mini-kv v108",
      precheckItemCountAligned: input.checks.precheckItemCountAligned,
      operatorFieldCountAligned: input.checks.operatorFieldCountAligned,
      operatorFieldNamesAligned: input.checks.operatorFieldNamesAligned,
      timeoutPolicyAligned: input.checks.timeoutPolicyAligned,
      credentialBoundaryAligned: input.checks.credentialBoundaryAligned,
      connectionBoundaryAligned: input.checks.connectionBoundaryAligned,
      writeBoundaryAligned: input.checks.writeBoundaryAligned,
      autoStartBoundaryAligned: input.checks.autoStartBoundaryAligned,
      consumerHintShiftAccepted: input.checks.consumerHintAcceptedForCurrentPlan,
      routeRegistrationAccepted: input.checks.routeRegistrationAccepted,
      nodeV247BlocksRealConnection: true,
    },
    checks: input.checks,
    summary: {
      checkCount: countReportChecks(input.checks),
      passedCheckCount: countPassedReportChecks(input.checks),
      evidenceFileCount:
        input.javaV99.evidenceFiles.filter((file) => file.exists).length
        + input.miniKvV108.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        input.javaV99.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + input.miniKvV108.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: input.productionBlockers.length,
      warningCount: input.warnings.length,
      recommendationCount: input.recommendations.length,
    },
    productionBlockers: input.productionBlockers,
    warnings: input.warnings,
    recommendations: input.recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Proceed to Node v248 only as a manual sandbox connection rehearsal guard.",
      "Keep Java and mini-kv as read-only evidence providers until a real credential review and manual window are explicitly approved.",
      "Pause if Java, mini-kv, or Node changes the seven precheck items, six operator fields, timeout policy, or no-write/no-start boundaries.",
    ],
  };
}
