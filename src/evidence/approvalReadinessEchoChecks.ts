import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
} from "../services/liveProbeReportUtils.js";
import type {
  ApprovalRequiredImplementationReadinessNodeV281Reference,
  ApprovalRequiredImplementationReadinessUpstreamEchoVerification,
  ApprovalRequiredImplementationReadinessUpstreamEchoVerificationChecks,
  ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage,
  JavaV116ApprovalRequiredImplementationReadinessEchoReference,
  MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationTypes.js";
import {
  APPROVAL_REQUIRED_BOUNDARY_CODES,
  REQUIRED_ARTIFACT_IDS,
} from "./approvalReadinessEchoSources.js";

export function createChecks(
  config: AppConfig,
  sourceNodeV281: ApprovalRequiredImplementationReadinessNodeV281Reference,
  javaV116: JavaV116ApprovalRequiredImplementationReadinessEchoReference,
  miniKvV122: MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
): ApprovalRequiredImplementationReadinessUpstreamEchoVerificationChecks {
  return {
    ...createNodeChecks(sourceNodeV281),
    ...createJavaChecks(javaV116),
    ...createMiniKvChecks(miniKvV122),
    ...createAlignmentChecks(sourceNodeV281, javaV116, miniKvV122),
    ...createBoundaryChecks(sourceNodeV281, javaV116, miniKvV122),
    ...createRuntimeChecks(config, sourceNodeV281, javaV116, miniKvV122),
  };
}

export function createEchoVerification(
  sourceNodeV281: ApprovalRequiredImplementationReadinessNodeV281Reference,
  javaV116: JavaV116ApprovalRequiredImplementationReadinessEchoReference,
  miniKvV122: MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
  checks: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationChecks,
  verificationDigest: string,
): ApprovalRequiredImplementationReadinessUpstreamEchoVerification {
  return {
    verificationDigest,
    verificationMode: "java-v116-plus-mini-kv-v122-approval-required-implementation-readiness-upstream-echo-verification-only",
    sourceSpan: "Node v281 + Java v116 + mini-kv v122",
    sourceNodeV281Ready: checks.sourceNodeV281Ready,
    javaV116EchoReady: checks.javaV116EchoReady,
    miniKvV122NonParticipationReady: checks.miniKvV122ReceiptReady,
    boundaryReadinessAligned: checks.boundaryCodesAligned,
    requiredArtifactsAligned: checks.requiredArtifactsAligned,
    readinessCountsAligned: checks.readinessCountsAligned,
    javaProofClaimsAligned: checks.proofClaimsAligned,
    miniKvReceiptAligned: checks.miniKvV122DocumentsNodeV281Consumption,
    sideEffectBoundariesAligned: checks.credentialBoundaryClosed
      && checks.rawEndpointBoundaryClosed
      && checks.resolverBoundaryClosed
      && checks.connectionBoundaryClosed
      && checks.writeBoundaryClosed
      && checks.autoStartBoundaryClosed,
    implementationStillBlocked: true,
    readyForNodeV283ImplementationPlanDraft:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification,
  };
}

export function collectProductionBlockers(
  checks: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationChecks,
): ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV281Ready,
      code: "NODE_V281_REVIEW_NOT_READY",
      source: "node-v281-approval-required-implementation-readiness-review",
      message: "Node v281 approval-required implementation readiness review must be ready before v282 verifies upstream echoes.",
    },
    {
      condition: checks.javaV116EchoReady,
      code: "JAVA_V116_ECHO_NOT_READY",
      source: "java-v116-approval-required-implementation-readiness-echo",
      message: "Java v116 approval-required implementation readiness echo must be ready before v282.",
    },
    {
      condition: checks.miniKvV122ReceiptReady,
      code: "MINI_KV_V122_RECEIPT_NOT_READY",
      source: "mini-kv-v122-approval-required-implementation-readiness-non-participation-receipt",
      message: "mini-kv v122 non-participation receipt must be ready before v282.",
    },
    {
      condition: checks.boundaryCodesAligned,
      code: "BOUNDARY_CODES_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Node v281, Java v116, and mini-kv v122 must agree on the six approval-required boundary codes.",
    },
    {
      condition: checks.requiredArtifactsAligned,
      code: "REQUIRED_ARTIFACT_IDS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "The eighteen required artifact ids must be echoed identically by all three projects.",
    },
    {
      condition: checks.credentialBoundaryClosed,
      code: "CREDENTIAL_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Credential value reads and storage must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.rawEndpointBoundaryClosed,
      code: "RAW_ENDPOINT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Raw endpoint parsing must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.resolverBoundaryClosed,
      code: "RESOLVER_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Resolver client and secret provider instantiation must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.connectionBoundaryClosed,
      code: "CONNECTION_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Managed audit connection and external request sending must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.writeBoundaryClosed,
      code: "WRITE_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Ledger writes, schema migration, load/restore/compact, and storage writes must remain blocked.",
    },
    {
      condition: checks.autoStartBoundaryClosed,
      code: "AUTO_START_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Automatic upstream start must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during Node v282 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during Node v282 upstream echo verification.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

export function collectWarnings(): ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "IMPLEMENTATION_STILL_BLOCKED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "v282 is still an echo verification; runtime implementation remains blocked until Node v283 exists.",
    },
    {
      code: "DASHBOARD_QUALITY_VERSION_PENDING",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "After v282, the next quality-only version should focus on dashboard.ts or another naturally large Node file, not on more credential resolver behavior.",
    },
  ];
}

export function collectRecommendations(): ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "RUN_NODE_V283_PLAN_DRAFT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "After v282, draft Node v283 as the managed audit resolver implementation plan only.",
    },
    {
      code: "SCHEDULE_DASHBOARD_QUALITY_VERSION",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Once the upstream echo chain is archived, schedule a separate Node quality version for dashboard.ts rather than mixing it into the credential resolver flow.",
    },
  ];
}

export function createSummary(
  sourceNodeV281: ApprovalRequiredImplementationReadinessNodeV281Reference,
  javaV116: JavaV116ApprovalRequiredImplementationReadinessEchoReference,
  miniKvV122: MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
  checks: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationChecks,
  productionBlockers: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[],
  warnings: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[],
  recommendations: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[],
) {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceFileCount:
      javaV116.evidenceFiles.filter((file) => file.exists).length
      + miniKvV122.evidenceFiles.filter((file) => file.exists).length,
    matchedSnippetCount:
      javaV116.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
      + miniKvV122.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    boundaryCount: sourceNodeV281.boundaryCount,
    requiredArtifactCount: sourceNodeV281.requiredArtifactCount,
    sourceCheckCount: sourceNodeV281.checkCount,
    sourcePassedCheckCount: sourceNodeV281.passedCheckCount,
    javaProofClaimCount: javaV116.proofClaimCount,
    miniKvCheckCount: miniKvV122.checkCount,
    miniKvPassedCheckCount: miniKvV122.passedCheckCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function createNodeChecks(
  source: ApprovalRequiredImplementationReadinessNodeV281Reference,
) {
  return {
    sourceNodeV281Ready: all([
      source.reviewState === "credential-resolver-approval-required-implementation-readiness-review-ready",
      source.readyForApprovalRequiredImplementationReadinessReview,
      source.readyForJavaV116MiniKvV122Echo,
    ]),
    sourceNodeV281KeepsRuntimeImplementationBlocked: all([
      !source.readyForManagedAuditResolverImplementation,
      !source.realResolverImplementationAllowed,
      !source.executionAllowed,
      !source.connectsManagedAudit,
      !source.credentialValueRead,
      !source.rawEndpointUrlParsed,
      !source.externalRequestSent,
      !source.secretProviderInstantiated,
      !source.resolverClientInstantiated,
      !source.schemaMigrationExecuted,
      !source.approvalLedgerWritten,
      !source.automaticUpstreamStart,
    ]),
  };
}

function createJavaChecks(
  java: JavaV116ApprovalRequiredImplementationReadinessEchoReference,
) {
  return {
    javaV116EchoReady: all([
      java.readyForNodeV282Verification,
      java.readyForManagedAuditResolverImplementation === false,
      java.noCredentialConnectionWriteOrAutoStartProved,
      java.credentialValueRead === false,
      java.rawEndpointUrlParsed === false,
      java.externalRequestSent === false,
      java.secretProviderInstantiated === false,
      java.resolverClientInstantiated === false,
      java.connectsManagedAudit === false,
      java.approvalLedgerWritten === false,
      java.sqlExecuted === false,
      java.schemaMigrationExecuted === false,
      java.automaticUpstreamStart === false,
      java.javaStartedNodeOrMiniKv === false,
    ]),
    javaV116DocumentsNodeV281Consumption: all([
      java.evidencePresent,
      java.verificationDocumented,
      java.proofClaimCount === 11,
      java.boundaryCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length,
      java.requiredArtifactCount === REQUIRED_ARTIFACT_IDS.length,
    ]),
    javaV116KeepsRuntimeSideEffectsBlocked: all([
      java.readyForManagedAuditResolverImplementation === false,
      java.credentialValueRead === false,
      java.rawEndpointUrlParsed === false,
      java.externalRequestSent === false,
      java.secretProviderInstantiated === false,
      java.resolverClientInstantiated === false,
      java.connectsManagedAudit === false,
      java.approvalLedgerWritten === false,
      java.sqlExecuted === false,
      java.schemaMigrationExecuted === false,
      java.javaStartedNodeOrMiniKv === false,
    ]),
  };
}

function createMiniKvChecks(
  miniKv: MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
) {
  return {
    miniKvV122ReceiptReady: all([
      miniKv.readyForNodeV282Alignment,
      miniKv.readOnly === true,
      miniKv.executionAllowed === false,
      miniKv.readyForManagedAuditResolverImplementation === false,
      miniKv.realResolverImplementationAllowed === false,
    ]),
    miniKvV122DocumentsNodeV281Consumption: all([
      miniKv.evidencePresent,
      miniKv.verificationDocumented,
      miniKv.releaseVersion === "v122",
      miniKv.consumerHint === "Node v282 credential resolver approval-required implementation readiness upstream echo verification",
    ]),
    miniKvV122KeepsRuntimeSideEffectsBlocked: all([
      miniKv.credentialResolverImplemented === false,
      miniKv.credentialResolverInvoked === false,
      miniKv.resolverClientInstantiated === false,
      miniKv.secretProviderInstantiated === false,
      miniKv.credentialValueReadAllowed === false,
      miniKv.credentialValueLoaded === false,
      miniKv.credentialValueStored === false,
      miniKv.credentialValueIncluded === false,
      miniKv.rawEndpointUrlParseAllowed === false,
      miniKv.rawEndpointUrlParsed === false,
      miniKv.rawEndpointUrlIncluded === false,
      miniKv.externalRequestAllowed === false,
      miniKv.externalRequestSent === false,
      miniKv.connectsManagedAudit === false,
      miniKv.storageWriteAllowed === false,
      miniKv.writeCommandsExecuted === false,
      miniKv.adminCommandsExecuted === false,
      miniKv.approvalLedgerWriteAllowed === false,
      miniKv.approvalLedgerWritten === false,
      miniKv.managedAuditWriteExecuted === false,
      miniKv.schemaMigrationAllowed === false,
      miniKv.schemaMigrationExecuted === false,
      miniKv.restoreExecutionAllowed === false,
      miniKv.loadRestoreCompactExecuted === false,
      miniKv.setnxexExecutionAllowed === false,
      miniKv.automaticUpstreamStartAllowed === false,
      miniKv.automaticUpstreamStart === false,
      miniKv.managedAuditStorageBackend === false,
      miniKv.auditAuthoritative === false,
      miniKv.orderAuthoritative === false,
    ]),
  };
}

function createAlignmentChecks(
  source: ApprovalRequiredImplementationReadinessNodeV281Reference,
  java: JavaV116ApprovalRequiredImplementationReadinessEchoReference,
  miniKv: MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
) {
  return {
    boundaryCodesAligned: all([
      source.boundaryCodes.length === APPROVAL_REQUIRED_BOUNDARY_CODES.length,
      source.boundaryCodes.every((code, index) => code === APPROVAL_REQUIRED_BOUNDARY_CODES[index]),
      java.boundaryCodes.length === APPROVAL_REQUIRED_BOUNDARY_CODES.length,
      java.boundaryCodes.every((code, index) => code === APPROVAL_REQUIRED_BOUNDARY_CODES[index]),
      miniKv.boundaryCodes.length === APPROVAL_REQUIRED_BOUNDARY_CODES.length,
      miniKv.boundaryCodes.every((code, index) => code === APPROVAL_REQUIRED_BOUNDARY_CODES[index]),
    ]),
    requiredArtifactsAligned: all([
      source.requiredArtifactIds.length === REQUIRED_ARTIFACT_IDS.length,
      java.requiredArtifactIds.length === REQUIRED_ARTIFACT_IDS.length,
      miniKv.requiredArtifactIds.length === REQUIRED_ARTIFACT_IDS.length,
      REQUIRED_ARTIFACT_IDS.every((id, index) => all([
        source.requiredArtifactIds[index] === id,
        java.requiredArtifactIds[index] === id,
        miniKv.requiredArtifactIds[index] === id,
      ])),
    ]),
    readinessCountsAligned: all([
      source.checkCount === 21,
      source.passedCheckCount === 21,
      java.proofClaimCount === 11,
      miniKv.checkCount === 21,
      miniKv.passedCheckCount === 21,
    ]),
    proofClaimsAligned: all([
      java.proofClaimsPresent,
      java.warningDigestInputsPresent,
      java.nodeVerificationActionsPresent,
    ]),
  };
}

function createBoundaryChecks(
  source: ApprovalRequiredImplementationReadinessNodeV281Reference,
  java: JavaV116ApprovalRequiredImplementationReadinessEchoReference,
  miniKv: MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
) {
  return {
    credentialBoundaryClosed: all([
      source.credentialValueRead === false,
      java.credentialValueRead === false,
      miniKv.credentialValueReadAllowed === false,
      miniKv.credentialValueLoaded === false,
      miniKv.credentialValueStored === false,
      miniKv.credentialValueIncluded === false,
    ]),
    rawEndpointBoundaryClosed: all([
      source.rawEndpointUrlParsed === false,
      java.rawEndpointUrlParsed === false,
      miniKv.rawEndpointUrlParseAllowed === false,
      miniKv.rawEndpointUrlParsed === false,
      miniKv.rawEndpointUrlIncluded === false,
    ]),
    resolverBoundaryClosed: all([
      source.resolverClientInstantiated === false,
      source.secretProviderInstantiated === false,
      java.resolverClientInstantiated === false,
      java.secretProviderInstantiated === false,
      miniKv.credentialResolverImplemented === false,
      miniKv.credentialResolverInvoked === false,
      miniKv.resolverClientInstantiated === false,
      miniKv.secretProviderInstantiated === false,
    ]),
    connectionBoundaryClosed: all([
      source.connectsManagedAudit === false,
      source.externalRequestSent === false,
      java.connectsManagedAudit === false,
      java.externalRequestSent === false,
      miniKv.connectsManagedAudit === false,
      miniKv.externalRequestAllowed === false,
      miniKv.externalRequestSent === false,
    ]),
    writeBoundaryClosed: all([
      source.executionAllowed === false,
      source.schemaMigrationExecuted === false,
      source.approvalLedgerWritten === false,
      java.approvalLedgerWritten === false,
      java.sqlExecuted === false,
      java.schemaMigrationExecuted === false,
      miniKv.storageWriteAllowed === false,
      miniKv.writeCommandsExecuted === false,
      miniKv.adminCommandsExecuted === false,
      miniKv.approvalLedgerWriteAllowed === false,
      miniKv.approvalLedgerWritten === false,
      miniKv.managedAuditWriteExecuted === false,
      miniKv.schemaMigrationAllowed === false,
      miniKv.schemaMigrationExecuted === false,
      miniKv.restoreExecutionAllowed === false,
      miniKv.loadRestoreCompactExecuted === false,
      miniKv.setnxexExecutionAllowed === false,
    ]),
    autoStartBoundaryClosed: all([
      source.automaticUpstreamStart === false,
      java.automaticUpstreamStart === false,
      java.javaStartedNodeOrMiniKv === false,
      miniKv.automaticUpstreamStartAllowed === false,
      miniKv.automaticUpstreamStart === false,
    ]),
  };
}

function createRuntimeChecks(
  config: AppConfig,
  source: ApprovalRequiredImplementationReadinessNodeV281Reference,
  java: JavaV116ApprovalRequiredImplementationReadinessEchoReference,
  miniKv: MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
) {
  return {
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification: all([
      source.readyForApprovalRequiredImplementationReadinessReview,
      java.readyForNodeV282Verification,
      miniKv.readyForNodeV282Alignment,
      !config.upstreamProbesEnabled,
      !config.upstreamActionsEnabled,
    ]),
  };
}

function all(values: readonly boolean[]): boolean {
  return values.every((value) => value);
}
