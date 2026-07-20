import type { AppConfig } from "../config.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
  createEchoVerification,
  createSummary,
} from "../evidence/approvalReadinessEchoChecks.js";
import {
  APPROVAL_ECHO_PATHS,
  createJavaV116Reference,
  createMiniKvV122Reference,
} from "../evidence/approvalReadinessEchoSources.js";
import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview.js";
import type {
  ApprovalRequiredImplementationReadinessNodeV281Reference,
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification";
const NODE_V281_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review";
const ACTIVE_PLAN = "docs/plans2/v280-post-status-routes-quality-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationProfile {
  const sourceNodeV281 = createSourceNodeV281(input.config);
  const javaV116 = createJavaV116Reference();
  const miniKvV122 = createMiniKvV122Reference();
  const checks = createChecks(input.config, sourceNodeV281, javaV116, miniKvV122);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification
    ? "credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourceNodeV281ReadinessDigest: sourceNodeV281.readinessReviewDigest,
    javaV116ReceiptVersion: javaV116.receiptVersion,
    miniKvV122ReceiptDigest: miniKvV122.receiptDigest,
    checks,
  });
  const echoVerification = createEchoVerification(sourceNodeV281, javaV116, miniKvV122, checks, verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV281, javaV116, miniKvV122, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver approval-required implementation readiness upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    approvalRequiredImplementationReadinessEchoVerificationOnly: true,
    readyForManagedAuditResolverImplementation: false,
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
    sourceNodeV281,
    upstreamEchoes: { javaV116, miniKvV122 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      approvalRequiredImplementationReadinessUpstreamEchoVerificationJson: ROUTE_PATH,
      approvalRequiredImplementationReadinessUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV281Json: NODE_V281_ROUTE,
      sourceNodeV281Markdown: `${NODE_V281_ROUTE}?format=markdown`,
      javaV116Runbook: APPROVAL_ECHO_PATHS.javaRunbook,
      javaV116Walkthrough: APPROVAL_ECHO_PATHS.javaWalkthrough,
      javaV116Support: APPROVAL_ECHO_PATHS.javaSupport,
      javaV116Builder: APPROVAL_ECHO_PATHS.javaBuilder,
      miniKvV122Receipt: APPROVAL_ECHO_PATHS.miniKvReceipt,
      miniKvV122Runbook: APPROVAL_ECHO_PATHS.miniKvRunbook,
      miniKvV122Walkthrough: APPROVAL_ECHO_PATHS.miniKvWalkthrough,
      activePlan: ACTIVE_PLAN,
      nextNodeVersion: "Node v283",
    },
    nextActions: [
      "Archive Node v282 under d/282 with screenshot, explanation, and route evidence.",
      "Keep Java v116 and mini-kv v122 unchanged; this version only verifies their archived evidence.",
      "After v282, write Node v283 as the managed audit resolver implementation plan draft.",
      "Do not implement a real resolver, secret provider, raw endpoint parser, HTTP/TCP client, schema migration, ledger write, or auto-start in this stage.",
    ],
  };
}

function createSourceNodeV281(config: AppConfig): ApprovalRequiredImplementationReadinessNodeV281Reference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview({
    config,
  });
  return {
    sourceVersion: "Node v281",
    profileVersion: source.profileVersion,
    reviewState: source.reviewState,
    readyForApprovalRequiredImplementationReadinessReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview,
    readyForJavaV116MiniKvV122Echo: source.readyForJavaV116MiniKvV122Echo,
    readinessReviewDigest: source.readinessReview.reviewDigest,
    boundaryCount: source.summary.boundaryCount,
    echoReadyBoundaryCount: source.summary.echoReadyBoundaryCount,
    blockedForImplementationBoundaryCount: source.summary.blockedForImplementationBoundaryCount,
    requiredArtifactCount: source.summary.requiredArtifactCount,
    boundaryCodes: [...source.boundaryReadiness.map((boundary) => boundary.code)],
    requiredArtifactIds: source.boundaryReadiness.flatMap((boundary) => boundary.requiredArtifacts),
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    readyForManagedAuditResolverImplementation: source.readyForManagedAuditResolverImplementation,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}
