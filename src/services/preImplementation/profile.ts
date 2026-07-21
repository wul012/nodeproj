import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "../liveProbeReportUtils.js";
import {
  ACTIVE_PLAN,
  JAVA_V112_BUILDER,
  JAVA_V112_RECORDS,
  JAVA_V112_RUNBOOK,
  JAVA_V112_SUPPORT,
  JAVA_V112_WALKTHROUGH,
  MINI_KV_V119_RECEIPT,
  MINI_KV_V119_RUNBOOK,
  MINI_KV_V119_WALKTHROUGH,
  NODE_V270_ROUTE,
  PROFILE_VERSION,
  ROUTE_PATH,
} from "./evidence.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
} from "./messages.js";
import type {
  JavaV112PlanEcho,
  MiniKvV119NonParticipation,
  PlanEchoChecks,
  PlanEchoProfile,
  PlanEchoVerification,
  SourceV270PlanIntake,
} from "./types.js";

export function createPlanEchoProfile(
  source: SourceV270PlanIntake,
  java: JavaV112PlanEcho,
  miniKv: MiniKvV119NonParticipation,
  checks: PlanEchoChecks,
): PlanEchoProfile {
  const ready = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification;
  const verificationState = ready
    ? "credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    nodeV270PlanDigest: source.planDigest,
    nodeV270IntakeDigest: source.intakeDigest,
    javaV112ReceiptVersion: java.receiptVersion,
    miniKvV119ReceiptDigest: miniKv.receiptDigest,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver pre-implementation plan intake upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification: ready,
    readOnlyUpstreamEchoVerification: true,
    planIntakeEchoVerificationOnly: true,
    readyForCredentialResolverPreImplementationPlan: source.readyForCredentialResolverPreImplementationPlan,
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
    sourceNodeV270: source,
    upstreamEchoes: { javaV112: java, miniKvV119: miniKv },
    echoVerification: createEchoVerification(verificationDigest, checks),
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        java.evidenceFiles.filter((file) => file.exists).length
        + miniKv.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        java.expectedSnippets.filter((match) => match.matched).length
        + miniKv.expectedSnippets.filter((match) => match.matched).length,
      sourceCheckCount: source.checkCount,
      sourcePassedCheckCount: source.passedCheckCount,
      boundaryCount: source.boundaryCount,
      definedBoundaryCount: source.definedBoundaryCount,
      missingBoundaryCount: source.missingBoundaryCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      planIntakeUpstreamEchoVerificationJson: ROUTE_PATH,
      planIntakeUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV270Json: NODE_V270_ROUTE,
      sourceNodeV270Markdown: `${NODE_V270_ROUTE}?format=markdown`,
      javaV112Runbook: JAVA_V112_RUNBOOK,
      javaV112Walkthrough: JAVA_V112_WALKTHROUGH,
      javaV112Builder: JAVA_V112_BUILDER,
      javaV112Support: JAVA_V112_SUPPORT,
      javaV112Records: JAVA_V112_RECORDS,
      miniKvV119Receipt: MINI_KV_V119_RECEIPT,
      miniKvV119Runbook: MINI_KV_V119_RUNBOOK,
      miniKvV119Walkthrough: MINI_KV_V119_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v272 with JSON, Markdown, screenshot, explanation, and code walkthrough evidence.",
      "Treat v272 as upstream echo verification only; do not implement a real credential resolver from this profile.",
      "Write the next plan before moving toward any disabled secret-provider stub or resolver interface candidate.",
      "Keep credential value reads, raw endpoint parsing, real resolver clients, real secret providers, external requests, schema migration, approval ledger writes, storage writes, and auto-start blocked.",
    ],
  };
}

function createEchoVerification(
  verificationDigest: string,
  checks: PlanEchoChecks,
): PlanEchoVerification {
  return {
    verificationDigest,
    verificationMode: "java-v112-plus-mini-kv-v119-plan-intake-upstream-echo-verification-only",
    sourceSpan: "Node v270 + Java v112 + mini-kv v119",
    sourceNodeV270Ready: checks.sourceNodeV270Ready,
    javaV112EchoReady: checks.javaV112EchoReady,
    miniKvV119NonParticipationReady: checks.miniKvV119NonParticipationReady,
    planIntakeStateAligned: checks.planIntakeStateAligned,
    planCountsAligned: checks.planCountsAligned,
    boundaryCodesAligned: checks.boundaryCodesAligned,
    requirementCodesAligned: checks.requirementCodesAligned,
    planIntakeVersionsAligned: checks.planIntakeVersionsAligned,
    credentialBoundaryAligned: checks.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
    resolverBoundaryAligned: checks.resolverBoundaryAligned,
    connectionBoundaryAligned: checks.connectionBoundaryAligned,
    writeBoundaryAligned: checks.writeBoundaryAligned,
    autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
    nodeV272KeepsRealResolverBlocked: true,
  };
}
