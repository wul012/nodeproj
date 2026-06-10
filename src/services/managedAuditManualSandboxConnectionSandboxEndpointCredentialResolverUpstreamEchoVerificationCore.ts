import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord.js";
import {
  ACTIVE_PLAN,
  JAVA_V105_RUNBOOK,
  MINI_KV_V114_RECEIPT,
  NODE_V260_ROUTE,
  PROFILE_VERSION,
  ROUTE_PATH,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationConstants.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationChecks.js";
import {
  createJavaV105Reference,
  createMiniKvV114Reference,
  createSourceNodeV260,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationReferences.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationTypes.js";

export function loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationProfile {
  const sourceNodeV260 = createSourceNodeV260(
    loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord({ config: input.config }),
  );
  const javaV105 = createJavaV105Reference();
  const miniKvV114 = createMiniKvV114Reference();
  const checks = createChecks(input.config, sourceNodeV260, javaV105, miniKvV114);
  checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification
    ? "sandbox-endpoint-credential-resolver-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      sourceDecisionDigest: sourceNodeV260.decisionDigest,
      javaV105Ready: javaV105.readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification,
      miniKvV114ReceiptDigest: miniKvV114.receiptDigest,
      checks,
    }),
    verificationMode: "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only" as const,
    sourceSpan: "Node v260 + Java v105 + mini-kv v114" as const,
    decisionRecordAligned: checks.decisionRecordAligned,
    requiredDecisionFieldsAligned: checks.requiredDecisionFieldsAligned,
    explicitNoGoConditionsAligned: checks.explicitNoGoConditionsAligned,
    resolverPolicyAligned: checks.resolverPolicyAligned,
    approvalMarkerAligned: checks.approvalMarkerAligned,
    operatorIdentityAligned: checks.operatorIdentityAligned,
    approvalCorrelationAligned: checks.approvalCorrelationAligned,
    redactionAndFallbackAligned: checks.redactionAndFallbackAligned,
    credentialBoundaryAligned: checks.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
    connectionBoundaryAligned: checks.connectionBoundaryAligned,
    writeBoundaryAligned: checks.writeBoundaryAligned,
    autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
    miniKvNonParticipationAligned: checks.miniKvV114NonParticipationReady,
    nodeV261BlocksCredentialResolution: true as const,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection sandbox endpoint credential resolver upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    credentialResolverExecutionAllowed: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    credentialValueLoaded: false,
    credentialValueStored: false,
    credentialValueIncluded: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    externalRequestSent: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV260,
    upstreamEchoes: { javaV105, miniKvV114 },
    echoVerification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV105.evidenceFiles.filter((file) => file.exists).length
        + miniKvV114.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV105.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV114.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxEndpointCredentialResolverUpstreamEchoVerificationJson: ROUTE_PATH,
      sandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV260Json: NODE_V260_ROUTE,
      javaV105Runbook: JAVA_V105_RUNBOOK,
      miniKvV114Receipt: MINI_KV_V114_RECEIPT,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Use Node v261 as the last upstream echo gate before designing the disabled credential resolver precheck.",
      "Do not treat Java v105 or mini-kv v114 as permission to resolve credentials, parse raw endpoint URLs, or open managed audit connections.",
      "Keep Java v105 and mini-kv v114 evidence in historical fallback so GitHub CI can verify this profile without sibling workspaces.",
    ],
  };
}
