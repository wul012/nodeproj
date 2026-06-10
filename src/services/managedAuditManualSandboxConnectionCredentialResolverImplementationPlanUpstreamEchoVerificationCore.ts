import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  ACTIVE_PLAN,
  JAVA_V121_BUILDER,
  JAVA_V121_RECORDS,
  JAVA_V121_TESTS,
  MINI_KV_V126_RECEIPT,
  MINI_KV_V126_RUNBOOK,
  MINI_KV_V126_WALKTHROUGH,
  NODE_V283_ROUTE,
  PROFILE_VERSION,
  ROUTE_PATH,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationConstants.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationChecks.js";
import {
  createJavaV121Reference,
  createMiniKvV126Reference,
  createSourceNodeV283,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationReferences.js";
import type {
  CredentialResolverImplementationPlanUpstreamEchoVerification,
  CredentialResolverImplementationPlanUpstreamEchoVerificationChecks,
  CredentialResolverImplementationPlanUpstreamEchoVerificationMessage,
  CredentialResolverImplementationPlanUpstreamEchoVerificationSummary,
  JavaV121ImplementationPlanEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationProfile,
  MiniKvV126ImplementationPlanNonParticipationReference,
  SourceNodeV283ImplementationPlanDraftReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationTypes.js";

export function loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationProfile {
  const sourceNodeV283 = createSourceNodeV283(input.config);
  const javaV121 = createJavaV121Reference();
  const miniKvV126 = createMiniKvV126Reference();
  const checks = createChecks(input.config, sourceNodeV283, javaV121, miniKvV126);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification
    ? "credential-resolver-implementation-plan-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourcePlanDigest: sourceNodeV283.planDigest,
    sourceReviewDigest: sourceNodeV283.reviewDigest,
    javaV121EvidenceDigest: javaV121.receiptDigest,
    miniKvV126EvidenceDigest: miniKvV126.receiptDigest,
    checks,
  });
  const echoVerification = createEchoVerification(sourceNodeV283, javaV121, miniKvV126, checks, verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV283, javaV121, miniKvV126, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver implementation plan upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    implementationPlanUpstreamEchoVerificationOnly: true,
    consumesNodeV283ImplementationPlanDraft: true,
    consumesJavaV121ImplementationPlanEcho: true,
    consumesMiniKvV126ImplementationPlanNonParticipationReceipt: true,
    originalExpectedNodeVerificationVersion: "Node v284",
    executedAsNodeVersion: "Node v286",
    nodeVersionOffsetReason: "Java v121 and mini-kv v126 were produced for the original Node v284 gate, but Node v284 and Node v285 were consumed by local quality optimization before this verification stage executed.",
    readyForTestOnlyFakeHarnessPrecheck: false,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV283,
    upstreamEchoes: { javaV121, miniKvV126 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      implementationPlanUpstreamEchoVerificationJson: ROUTE_PATH,
      implementationPlanUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV283Json: NODE_V283_ROUTE,
      sourceNodeV283Markdown: `${NODE_V283_ROUTE}?format=markdown`,
      javaV121Builder: JAVA_V121_BUILDER,
      javaV121Records: JAVA_V121_RECORDS,
      javaV121Tests: JAVA_V121_TESTS,
      miniKvV126Receipt: MINI_KV_V126_RECEIPT,
      miniKvV126Runbook: MINI_KV_V126_RUNBOOK,
      miniKvV126Walkthrough: MINI_KV_V126_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
      nextNodeVersion: "Node v287",
    },
    nextActions: [
      "Archive Node v286 with JSON, Markdown, screenshot, explanation, and code walkthrough evidence.",
      "Keep Java v121 and mini-kv v126 unchanged; this version only verifies their archived evidence against Node v283.",
      "Use Node v287 for the disabled test-only fake harness precheck only if this verification still holds.",
      "Do not implement a real resolver, instantiate a secret provider, parse raw endpoint URLs, send HTTP/TCP, run schema migration, write ledger state, or auto-start upstream services in this stage.",
    ],
  };
}

function createEchoVerification(
  sourceNodeV283: SourceNodeV283ImplementationPlanDraftReference,
  javaV121: JavaV121ImplementationPlanEchoReference,
  miniKvV126: MiniKvV126ImplementationPlanNonParticipationReference,
  checks: CredentialResolverImplementationPlanUpstreamEchoVerificationChecks,
  verificationDigest: string,
): CredentialResolverImplementationPlanUpstreamEchoVerification {
  return {
    verificationDigest,
    verificationMode: "java-v121-plus-mini-kv-v126-implementation-plan-upstream-echo-verification-only",
    sourceSpan: "Node v283 + Java v121 + mini-kv v126",
    sourceNodeV283Ready: checks.sourceNodeV283Ready,
    javaV121EchoReady: checks.javaV121EchoReady,
    miniKvV126NonParticipationReady: checks.miniKvV126ReceiptReady,
    planDigestAligned: checks.planDigestAlignedWithMiniKv,
    reviewDigestAligned: checks.reviewDigestAlignedWithMiniKv,
    interfaceBoundariesAligned: checks.boundaryCodesAligned,
    requiredArtifactsAligned: checks.requiredArtifactsAligned,
    prohibitedActionsAligned: checks.prohibitedActionsAligned,
    javaRequirementIdsAligned: checks.javaRequirementIdsAligned,
    miniKvRequirementIdsAligned: checks.miniKvRequirementIdsAligned,
    sideEffectBoundariesAligned: checks.sideEffectBoundaryClosed,
    implementationStillBlocked: true,
    originalExpectedNodeV284SatisfiedByNodeV286: true,
    readyForNodeV287TestOnlyFakeHarnessPrecheck:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification,
  };
}

function createSummary(
  sourceNodeV283: SourceNodeV283ImplementationPlanDraftReference,
  javaV121: JavaV121ImplementationPlanEchoReference,
  miniKvV126: MiniKvV126ImplementationPlanNonParticipationReference,
  checks: CredentialResolverImplementationPlanUpstreamEchoVerificationChecks,
  productionBlockers: CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[],
  warnings: CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[],
  recommendations: CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[],
): CredentialResolverImplementationPlanUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceFileCount:
      javaV121.evidenceFiles.filter((file) => file.exists).length
      + miniKvV126.evidenceFiles.filter((file) => file.exists).length,
    matchedSnippetCount:
      javaV121.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
      + miniKvV126.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    sourceCheckCount: sourceNodeV283.checkCount,
    sourcePassedCheckCount: sourceNodeV283.passedCheckCount,
    interfaceBoundaryCount: sourceNodeV283.interfaceBoundaryCount,
    requiredArtifactCount: sourceNodeV283.requiredArtifactCount,
    prohibitedActionCount: sourceNodeV283.prohibitedActionCount,
    javaEchoRequirementCount: javaV121.javaEchoRequirementCount,
    miniKvReceiptRequirementCount: miniKvV126.miniKvReceiptRequirementCount ?? 4,
    javaProofClaimCount: javaV121.proofClaimCount,
    javaNodeVerificationActionCount: javaV121.nodeVerificationActionCount,
    miniKvCheckCount: miniKvV126.checkCount,
    miniKvPassedCheckCount: miniKvV126.passedCheckCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
