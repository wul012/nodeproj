import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  ACTIVE_PLAN,
  JAVA_V107_RUNBOOK,
  JAVA_V109_RUNBOOK,
  MINI_KV_V116_RECEIPT,
  NODE_V264_ROUTE,
  PROFILE_VERSION,
  ROUTE_PATH,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationConstants.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationChecks.js";
import {
  createJavaV107Reference,
  createJavaV109OptimizationContext,
  createMiniKvV116Reference,
  createSourceNodeV264,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationReferences.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationTypes.js";

export function loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationProfile {
  const sourceNodeV264 = createSourceNodeV264(input.config);
  const javaV107 = createJavaV107Reference();
  const miniKvV116 = createMiniKvV116Reference();
  const javaV109 = createJavaV109OptimizationContext();
  const checks = createChecks(input.config, sourceNodeV264, javaV107, miniKvV116, javaV109);
  checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification
    ? "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      nodeV264ContractDigest: sourceNodeV264.contractDigest,
      miniKvV116ReceiptDigest: miniKvV116.receiptDigest,
      checks,
    }),
    verificationMode:
      "java-v107-plus-mini-kv-v116-test-only-resolver-shell-upstream-echo-verification-only" as const,
    sourceSpan: "Node v264 + Java v107 + mini-kv v116" as const,
    testOnlyShellContractAligned: checks.testOnlyShellContractAligned,
    requestShapeAligned: checks.requestShapeAligned,
    responseShapeAligned: checks.responseShapeAligned,
    failureMappingAligned: checks.failureMappingAligned,
    guardConditionsAligned: checks.guardConditionsAligned,
    fakeResolverProbeAligned: checks.fakeResolverProbeAligned,
    credentialBoundaryAligned: checks.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
    connectionBoundaryAligned: checks.connectionBoundaryAligned,
    writeBoundaryAligned: checks.writeBoundaryAligned,
    autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
    miniKvNonParticipationAligned: checks.miniKvNonParticipationAligned,
    javaV109OptimizationContextAligned: checks.javaV109OptimizationContextReady,
    nodeV265KeepsRealResolverOutOfScope: true as const,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection sandbox endpoint credential resolver test-only shell upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    testOnlyResolverShellUpstreamEchoVerificationOnly: true,
    fakeResolverOnly: true,
    handleOnlyRequest: true,
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
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV264,
    upstreamEchoes: { javaV107, miniKvV116 },
    optimizationContext: { javaV109 },
    echoVerification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV107.evidenceFiles.filter((file) => file.exists).length
        + miniKvV116.evidenceFiles.filter((file) => file.exists).length
        + javaV109.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV107.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV116.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + javaV109.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      requestShapeFieldCount: sourceNodeV264.requestShapeFieldCount,
      responseShapeFieldCount: sourceNodeV264.responseShapeFieldCount,
      failureMappingCount: sourceNodeV264.failureMappingCount,
      guardConditionCount: sourceNodeV264.guardConditionCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationJson: ROUTE_PATH,
      sandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV264Json: NODE_V264_ROUTE,
      javaV107Runbook: JAVA_V107_RUNBOOK,
      javaV109OptimizationRunbook: JAVA_V109_RUNBOOK,
      miniKvV116Receipt: MINI_KV_V116_RECEIPT,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Use Node v265 as the read-only upstream echo gate for the test-only credential resolver shell.",
      "Treat Java v109 as an optimization context only; Java v107 and mini-kv v116 remain the hard upstream evidence for v265.",
      "Proceed to Node v266 archive verification before any new resolver surface; do not instantiate a real secret provider or external endpoint client.",
    ],
  };
}
