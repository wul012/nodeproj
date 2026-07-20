import type { AppConfig } from "../config.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
  createEchoVerification,
  createSummary,
} from "../evidence/approvalBoundaryAssessment.js";
import {
  ACTIVE_PLAN,
  createJavaV115Reference,
  createMiniKvV121Reference,
  createSourceNodeV274,
  JAVA_V115_BUILDER,
  JAVA_V115_RECORDS,
  JAVA_V115_RUNBOOK,
  JAVA_V115_SUPPORT,
  JAVA_V115_WALKTHROUGH,
  MINI_KV_V121_RECEIPT,
  MINI_KV_V121_RUNBOOK,
  MINI_KV_V121_WALKTHROUGH,
  NODE_V274_ROUTE,
  PROFILE_VERSION,
  ROUTE_PATH,
} from "../evidence/approvalBoundaryReference.js";
import {
  allReportChecksPassExcept,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationRenderer.js";

export function loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationProfile {
  const sourceNodeV274 = createSourceNodeV274(input.config);
  const javaV115 = createJavaV115Reference();
  const miniKvV121 = createMiniKvV121Reference();
  const checks = createChecks(input.config, sourceNodeV274, javaV115, miniKvV121);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification =
    allReportChecksPassExcept(
      checks,
      "readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification",
    );
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification
    ? "credential-resolver-approval-required-boundary-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourceNodeV274CandidateDigest: sourceNodeV274.candidateDigest,
    javaV115EchoMode: javaV115.echoMode,
    miniKvV121ReceiptDigest: miniKvV121.receiptDigest,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver approval-required boundary upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    approvalRequiredBoundaryEchoVerificationOnly: true,
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
    sourceNodeV274,
    upstreamEchoes: { javaV115, miniKvV121 },
    echoVerification: createEchoVerification(checks, verificationDigest),
    checks,
    summary: createSummary(
      sourceNodeV274,
      javaV115,
      miniKvV121,
      checks,
      productionBlockers,
      warnings,
      recommendations,
    ),
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      approvalRequiredBoundaryUpstreamEchoVerificationJson: ROUTE_PATH,
      approvalRequiredBoundaryUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV274Json: NODE_V274_ROUTE,
      sourceNodeV274Markdown: `${NODE_V274_ROUTE}?format=markdown`,
      javaV115Runbook: JAVA_V115_RUNBOOK,
      javaV115Walkthrough: JAVA_V115_WALKTHROUGH,
      javaV115Builder: JAVA_V115_BUILDER,
      javaV115Support: JAVA_V115_SUPPORT,
      javaV115Records: JAVA_V115_RECORDS,
      miniKvV121Receipt: MINI_KV_V121_RECEIPT,
      miniKvV121Runbook: MINI_KV_V121_RUNBOOK,
      miniKvV121Walkthrough: MINI_KV_V121_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v275 under d/275 with screenshot, explanation, and route evidence.",
      "Write the code walkthrough under the current walkthrough sibling directory instead of the crowded historical folder.",
      "After v275, advance to Node v276 statusRoutes split quality pass only if no new Java or mini-kv dependency appears.",
      "Keep the real credential resolver, credential values, raw endpoint URL parsing, external requests, schema migration, ledger writes, and upstream auto-start blocked.",
    ],
  };
}
