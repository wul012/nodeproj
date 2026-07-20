import type { AppConfig } from "../config.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
} from "../evidence/sandboxEndpointEchoChecks.js";
import {
  createJavaV104Reference,
  createMiniKvV113Reference,
  createSourceNodeV258,
} from "../evidence/sandboxEndpointEchoSources.js";
import {
  ACTIVE_PLAN,
  JAVA_V104_RUNBOOK,
  MINI_KV_V113_RECEIPT,
  NODE_V258_ROUTE,
  PROFILE_VERSION,
  ROUTE_PATH,
} from "../evidence/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationEvidence.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationRenderer.js";

export function loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationProfile {
  const sourceNodeV258 = createSourceNodeV258(
    loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview({ config: input.config }),
  );
  const javaV104 = createJavaV104Reference();
  const miniKvV113 = createMiniKvV113Reference();
  const checks = createChecks(input.config, sourceNodeV258, javaV104, miniKvV113);
  checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification
    ? "sandbox-endpoint-handle-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourceNodeV258ReviewDigest: sourceNodeV258.reviewDigest,
    javaV104Ready: javaV104.readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification,
    miniKvV113ReceiptDigest: miniKvV113.receiptDigest,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection sandbox endpoint handle upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
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
    sourceNodeV258,
    upstreamEchoes: { javaV104, miniKvV113 },
    echoVerification: {
      verificationDigest,
      verificationMode: "java-v104-plus-mini-kv-v113-sandbox-endpoint-handle-upstream-echo-verification-only",
      sourceSpan: "Node v258 + Java v104 + mini-kv v113",
      endpointHandleAligned: checks.endpointHandleAligned,
      credentialHandleAligned: checks.credentialHandleAligned,
      reviewCountsAligned: checks.reviewCountsAligned,
      policyReviewsAligned:
        checks.networkAllowlistAligned && checks.tlsPolicyAligned && checks.redactionPolicyAligned,
      operatorWindowAligned: checks.operatorWindowAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      miniKvNonParticipationAligned: checks.miniKvV113NonParticipationReady,
      nodeV259BlocksRealConnection: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV104.evidenceFiles.filter((file) => file.exists).length
        + miniKvV113.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV104.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV113.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxEndpointHandleUpstreamEchoVerificationJson: ROUTE_PATH,
      sandboxEndpointHandleUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV258Json: NODE_V258_ROUTE,
      javaV104Runbook: JAVA_V104_RUNBOOK,
      miniKvV113Receipt: MINI_KV_V113_RECEIPT,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Use Node v259 as a read-only upstream echo gate before writing the Node v260 credential resolver decision record.",
      "Do not treat Java v104 or mini-kv v113 as permission to resolve credential values, parse raw endpoint URLs, or open a managed audit connection.",
      "Keep Java v104 and mini-kv v113 evidence in historical fallback so GitHub CI can verify this profile without sibling workspaces.",
    ],
  };
}
