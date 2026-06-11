import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  ACTIVE_PLAN,
  JAVA_V113_BUILDER,
  JAVA_V113_RECORDS,
  JAVA_V113_RUNBOOK,
  JAVA_V113_SUPPORT,
  JAVA_V113_WALKTHROUGH,
  MINI_KV_V120_RECEIPT,
  MINI_KV_V120_RUNBOOK,
  MINI_KV_V120_WALKTHROUGH,
  NODE_V273_ROUTE,
  PROFILE_VERSION,
  ROUTE_PATH,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationConstants.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationPolicy.js";
import {
  createJavaV113Reference,
  createMiniKvV120Reference,
  createSourceNodeV273,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationReferences.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationTypes.js";

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationProfile {
  const sourceNodeV273 = createSourceNodeV273(input.config);
  const javaV113 = createJavaV113Reference();
  const miniKvV120 = createMiniKvV120Reference();
  const checks = createChecks(input.config, sourceNodeV273, javaV113, miniKvV120);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification
    ? "credential-resolver-disabled-candidate-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourceNodeV273CandidateDigest: sourceNodeV273.candidateDigest,
    javaV113ReceiptVersion: javaV113.receiptVersion,
    miniKvV120ReceiptDigest: miniKvV120.receiptDigest,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled candidate upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    disabledCandidateEchoVerificationOnly: true,
    readyForDisabledResolverInterfaceCandidate:
      sourceNodeV273.readyForDisabledResolverInterfaceCandidate
      && checks.javaV113EchoReady
      && checks.miniKvV120NonParticipationReady,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV273,
    upstreamEchoes: { javaV113, miniKvV120 },
    echoVerification: {
      verificationDigest,
      verificationMode: "java-v113-plus-mini-kv-v120-disabled-candidate-upstream-echo-verification-only",
      sourceSpan: "Node v273 + Java v113 + mini-kv v120",
      sourceNodeV273Ready: checks.sourceNodeV273Ready,
      javaV113EchoReady: checks.javaV113EchoReady,
      miniKvV120NonParticipationReady: checks.miniKvV120NonParticipationReady,
      candidateCountsAligned: checks.candidateCountsAligned,
      boundaryScopesAligned:
        checks.boundaryCodesAligned
        && checks.candidateReadyBoundaryCodesAligned
        && checks.approvalRequiredBoundaryCodesAligned,
      interfaceShapeAligned: checks.interfaceShapeAligned,
      fakeWiringAligned: checks.fakeWiringAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
      resolverBoundaryAligned: checks.resolverBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      javaEchoWorkflowTemplateApplied: checks.javaEchoWorkflowTemplateApplied,
      nodeV274KeepsRealResolverBlocked: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV113.evidenceFiles.filter((file) => file.exists).length
        + miniKvV120.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV113.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV120.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      sourceCheckCount: sourceNodeV273.checkCount,
      sourcePassedCheckCount: sourceNodeV273.passedCheckCount,
      candidateDecisionCount: sourceNodeV273.candidateDecisionCount,
      candidateReadyDecisionCount: sourceNodeV273.candidateReadyDecisionCount,
      approvalRequiredDecisionCount: sourceNodeV273.approvalRequiredDecisionCount,
      requestFieldCount: sourceNodeV273.requestFields.length,
      responseFieldCount: sourceNodeV273.responseFields.length,
      failureClassCount: sourceNodeV273.failureClasses.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledCandidateUpstreamEchoVerificationJson: ROUTE_PATH,
      disabledCandidateUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV273Json: NODE_V273_ROUTE,
      sourceNodeV273Markdown: `${NODE_V273_ROUTE}?format=markdown`,
      javaV113Runbook: JAVA_V113_RUNBOOK,
      javaV113Walkthrough: JAVA_V113_WALKTHROUGH,
      javaV113Builder: JAVA_V113_BUILDER,
      javaV113Support: JAVA_V113_SUPPORT,
      javaV113Records: JAVA_V113_RECORDS,
      miniKvV120Receipt: MINI_KV_V120_RECEIPT,
      miniKvV120Runbook: MINI_KV_V120_RUNBOOK,
      miniKvV120Walkthrough: MINI_KV_V120_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v274 with JSON, Markdown, screenshot, explanation, and code walkthrough evidence.",
      "Close the v272-derived plan after v274 because Node v273, Java v113, mini-kv v120, and Node v274 complete the sequence.",
      "Write a successor plan before introducing any real credential resolver implementation, credential value reads, raw endpoint parsing, external requests, schema migration, approval ledger writes, or upstream auto-start.",
      "Carry Java v114 as quality context only; it is not a runtime approval signal for Node.",
    ],
  };
}
