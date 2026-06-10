import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.js";
import {
  ACTIVE_PLAN,
  JAVA_V106_RUNBOOK,
  MINI_KV_V115_RECEIPT,
  NODE_V262_ROUTE,
  PROFILE_VERSION,
  ROUTE_PATH,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationConstants.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationChecks.js";
import {
  createJavaV106Reference,
  createMiniKvV115Reference,
  createSourceNodeV262,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationReferences.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationTypes.js";

export function loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationProfile {
  const sourceNodeV262 = createSourceNodeV262(
    loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck({ config: input.config }),
  );
  const javaV106 = createJavaV106Reference();
  const miniKvV115 = createMiniKvV115Reference();
  const checks = createChecks(input.config, sourceNodeV262, javaV106, miniKvV115);
  checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification
    ? "sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      sourcePrecheckDigest: sourceNodeV262.precheckDigest,
      javaV106Ready: javaV106.readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
      miniKvV115ReceiptDigest: miniKvV115.receiptDigest,
      checks,
    }),
    verificationMode:
      "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only" as const,
    sourceSpan: "Node v262 + Java v106 + mini-kv v115" as const,
    disabledPrecheckAligned: checks.disabledPrecheckAligned,
    requiredEnvHandlesAligned: checks.requiredEnvHandlesAligned,
    optInGatesAligned: checks.optInGatesAligned,
    failureTaxonomyAligned: checks.failureTaxonomyAligned,
    dryRunResponseShapeAligned: checks.dryRunResponseShapeAligned,
    inheritedNoGoConditionsAligned: checks.inheritedNoGoConditionsAligned,
    sourceNodeV261Aligned: checks.sourceNodeV261Aligned,
    credentialBoundaryAligned: checks.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
    connectionBoundaryAligned: checks.connectionBoundaryAligned,
    writeBoundaryAligned: checks.writeBoundaryAligned,
    autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
    miniKvNonParticipationAligned: checks.miniKvV115NonParticipationReady,
    nodeV263BlocksCredentialResolution: true as const,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection sandbox endpoint credential resolver disabled precheck upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    disabledCredentialResolverPrecheckOnly: true,
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
    sourceNodeV262,
    upstreamEchoes: { javaV106, miniKvV115 },
    echoVerification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV106.evidenceFiles.filter((file) => file.exists).length
        + miniKvV115.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV106.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV115.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationJson: ROUTE_PATH,
      sandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV262Json: NODE_V262_ROUTE,
      javaV106Runbook: JAVA_V106_RUNBOOK,
      miniKvV115Receipt: MINI_KV_V115_RECEIPT,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Use Node v263 as the final read-only upstream echo gate for the disabled resolver precheck.",
      "Do not instantiate a resolver client, secret provider, credential loader, raw endpoint parser, or external request sender.",
      "If the next plan chooses a resolver shell, keep it test-only and require explicit Java/mini-kv echo before any real endpoint work.",
    ],
  };
}
