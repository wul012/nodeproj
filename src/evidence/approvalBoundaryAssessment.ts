import type { AppConfig } from "../config.js";
import {
  collectFailedReportRules,
  countPassedReportChecks,
  countReportChecks,
} from "../services/liveProbeReportUtils.js";
import type { ReportRule } from "../services/liveProbeReportUtils.js";
import type {
  CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification,
  CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationChecks,
  CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage,
  JavaV115ApprovalRequiredBoundaryEchoReference,
  MiniKvV121ApprovalRequiredBoundaryNonParticipationReference,
  SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationTypes.js";
import {
  APPROVAL_REQUIRED_BOUNDARY_CODES,
  APPROVAL_REQUIRED_REQUIREMENT_CODES,
  PROHIBITED_ACTIONS_BY_BOUNDARY,
} from "./approvalBoundaryReference.js";

export function createChecks(
  config: AppConfig,
  source: SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference,
  java: JavaV115ApprovalRequiredBoundaryEchoReference,
  miniKv: MiniKvV121ApprovalRequiredBoundaryNonParticipationReference,
): CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationChecks {
  return {
    ...createSourceChecks(source),
    ...createAlignmentChecks(source, java, miniKv),
    ...createBoundaryChecks(source, java, miniKv),
    ...createRuntimeChecks(config, java),
  };
}

export function createEchoVerification(
  checks: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationChecks,
  verificationDigest: string,
): CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification {
  return {
    verificationDigest,
    verificationMode: "java-v115-plus-mini-kv-v121-approval-required-boundary-upstream-echo-verification-only",
    sourceSpan: "Node v274 + Java v115 + mini-kv v121",
    sourceNodeV274Ready: checks.sourceNodeV274Ready,
    javaV115EchoReady: checks.javaV115EchoReady,
    miniKvV121NonParticipationReady: checks.miniKvV121NonParticipationReady,
    approvalRequiredBoundaryScopeAligned: all([
      checks.approvalRequiredBoundaryCountAligned,
      checks.approvalRequiredBoundaryCodesAligned,
      checks.approvalRequiredRequirementCodesAligned,
    ]),
    approvalRequiredExplanationsAligned: all([
      checks.javaApprovalRequiredExplanationsComplete,
      checks.miniKvApprovalRequiredDetailsComplete,
    ]),
    prohibitedRuntimeActionsAligned: checks.prohibitedRuntimeActionsAligned,
    credentialBoundaryAligned: checks.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
    resolverBoundaryAligned: checks.resolverBoundaryAligned,
    connectionBoundaryAligned: checks.connectionBoundaryAligned,
    writeBoundaryAligned: checks.writeBoundaryAligned,
    autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
    javaEchoWorkflowTemplateApplied: checks.javaEchoWorkflowTemplateApplied,
    javaRecordsSplitApplied: checks.javaRecordsSplitApplied,
    nodeV275KeepsRealResolverBlocked: true,
  };
}

export function createSummary(
  source: SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference,
  java: JavaV115ApprovalRequiredBoundaryEchoReference,
  miniKv: MiniKvV121ApprovalRequiredBoundaryNonParticipationReference,
  checks: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationChecks,
  blockers: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage[],
  warnings: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage[],
  recommendations: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage[],
) {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceFileCount:
      java.evidenceFiles.filter((file) => file.exists).length
      + miniKv.evidenceFiles.filter((file) => file.exists).length,
    matchedSnippetCount:
      java.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
      + miniKv.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    approvalRequiredBoundaryCount: APPROVAL_REQUIRED_BOUNDARY_CODES.length,
    productionBlockerCount: blockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function createSourceChecks(
  source: SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference,
) {
  return {
    sourceNodeV274Ready: all([
      source.verificationState === "credential-resolver-disabled-candidate-upstream-echo-verification-ready",
      source.readyForDisabledCandidateUpstreamEchoVerification,
      source.sourceNodeV273Ready,
      source.javaV113EchoReady,
      source.miniKvV120NonParticipationReady,
    ]),
    sourceNodeV274KeepsReadOnlyEchoOnly: all([
      source.readOnlyUpstreamEchoVerification,
      source.disabledCandidateEchoVerificationOnly,
    ]),
    sourceNodeV274KeepsRealResolverBlocked: all([
      !source.realResolverImplementationAllowed,
      !source.connectsManagedAudit,
      !source.externalRequestSent,
      !source.resolverClientInstantiated,
      !source.secretProviderInstantiated,
    ]),
    sourceNodeV274KeepsBoundaryAlignment: all([
      source.candidateDecisionCount === 10,
      source.candidateReadyDecisionCount === 4,
      source.approvalRequiredDecisionCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length,
      source.candidateCountsAligned,
      source.approvalRequiredBoundaryCodesAligned,
    ]),
  };
}

function createAlignmentChecks(
  source: SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference,
  java: JavaV115ApprovalRequiredBoundaryEchoReference,
  miniKv: MiniKvV121ApprovalRequiredBoundaryNonParticipationReference,
) {
  return {
    javaV115EchoReady: java.readyForNodeV275Alignment,
    miniKvV121NonParticipationReady: miniKv.readyForNodeV275Alignment,
    approvalRequiredBoundaryCountAligned: all([
      java.approvalRequiredBoundaryExplanationCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length,
      miniKv.approvalRequiredBoundaryCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length,
      miniKv.sourceApprovalRequiredDecisionCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length,
    ]),
    approvalRequiredBoundaryCodesAligned: all([
      arrayEquals(source.approvalRequiredBoundaryCodes, APPROVAL_REQUIRED_BOUNDARY_CODES),
      arrayEquals(java.approvalRequiredBoundaryCodes, APPROVAL_REQUIRED_BOUNDARY_CODES),
      arrayEquals(miniKv.approvalRequiredBoundaryCodes, APPROVAL_REQUIRED_BOUNDARY_CODES),
      arrayEquals(miniKv.sourceApprovalRequiredBoundaryCodes, APPROVAL_REQUIRED_BOUNDARY_CODES),
    ]),
    approvalRequiredRequirementCodesAligned: all([
      arrayEquals(source.approvalRequiredRequirementCodes, APPROVAL_REQUIRED_REQUIREMENT_CODES),
      arrayEquals(java.approvalRequiredRequirementCodes, APPROVAL_REQUIRED_REQUIREMENT_CODES),
    ]),
    javaApprovalRequiredExplanationsComplete: all([
      java.approvalRequiredBoundaryExplanationsEchoed,
      java.evidenceAllowedMode === "approval-required-read-only-evidence",
      java.proofClaimPresent,
      java.nodeVerificationActionPresent,
    ]),
    miniKvApprovalRequiredDetailsComplete: all([
      miniKv.approvalRequiredBoundaryDetails.length === APPROVAL_REQUIRED_BOUNDARY_CODES.length,
      miniKv.approvalRequiredBoundaryDetails.every((detail) => all([
        detail.read_only,
        detail.approval_required,
        !detail.mini_kv_participates,
        APPROVAL_REQUIRED_BOUNDARY_CODES.some((code) => code === detail.code),
      ])),
    ]),
    prohibitedRuntimeActionsAligned: APPROVAL_REQUIRED_BOUNDARY_CODES.every((code) => {
      const detail = miniKv.approvalRequiredBoundaryDetails.find((candidate) => candidate.code === code);
      return detail !== undefined
        && arrayEquals(detail.prohibited_runtime_actions, PROHIBITED_ACTIONS_BY_BOUNDARY[code]);
    }),
  };
}

function createBoundaryChecks(
  source: SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference,
  java: JavaV115ApprovalRequiredBoundaryEchoReference,
  miniKv: MiniKvV121ApprovalRequiredBoundaryNonParticipationReference,
) {
  return {
    credentialBoundaryAligned: all([
      !source.credentialValueRead,
      !source.readsManagedAuditCredential,
      !source.storesManagedAuditCredential,
      !java.credentialValueReadAllowed,
      miniKv.sourceCredentialValueRead === false,
      miniKv.credentialValueReadAllowed === false,
      miniKv.credentialValueLoaded === false,
      miniKv.credentialValueStored === false,
      miniKv.credentialValueIncluded === false,
    ]),
    rawEndpointBoundaryAligned: all([
      !source.rawEndpointUrlParsed,
      !java.rawEndpointUrlParseAllowed,
      miniKv.sourceRawEndpointUrlParsed === false,
      miniKv.rawEndpointUrlParseAllowed === false,
      miniKv.rawEndpointUrlParsed === false,
      miniKv.rawEndpointUrlIncluded === false,
    ]),
    resolverBoundaryAligned: all([
      !source.resolverClientInstantiated,
      !source.secretProviderInstantiated,
      miniKv.credentialResolverImplemented === false,
      miniKv.credentialResolverInvoked === false,
      miniKv.resolverClientInstantiated === false,
      miniKv.secretProviderInstantiated === false,
      miniKv.secretProviderRuntimeAllowed === false,
    ]),
    connectionBoundaryAligned: all([
      !source.connectsManagedAudit,
      !source.externalRequestSent,
      !java.managedAuditConnectionAllowed,
      miniKv.sourceConnectsManagedAudit === false,
      miniKv.externalRequestAllowed === false,
      miniKv.externalRequestSent === false,
      miniKv.connectsManagedAudit === false,
      miniKv.readyForManagedAuditSandboxAdapterConnection === false,
    ]),
    writeBoundaryAligned: all([
      !source.executionAllowed,
      !source.schemaMigrationExecuted,
      !source.approvalLedgerWritten,
      !java.approvalLedgerWriteAllowed,
      !java.sqlExecutionAllowed,
      !java.rollbackExecutionAllowed,
      !java.approvalLedgerWritten,
      !java.sqlExecuted,
      !java.schemaMigrationExecuted,
      miniKv.executionAllowed === false,
      miniKv.storageWriteAllowed === false,
      miniKv.writeCommandsExecuted === false,
      miniKv.adminCommandsExecuted === false,
      miniKv.runtimeWriteObserved === false,
      miniKv.approvalLedgerWriteAllowed === false,
      miniKv.approvalLedgerWritten === false,
      miniKv.managedAuditWriteExecuted === false,
      miniKv.schemaMigrationAllowed === false,
      miniKv.schemaMigrationExecuted === false,
      miniKv.restoreExecutionAllowed === false,
      miniKv.loadRestoreCompactExecuted === false,
      miniKv.setnxexExecutionAllowed === false,
      miniKv.managedAuditStorageBackend === false,
      miniKv.auditAuthoritative === false,
      miniKv.orderAuthoritative === false,
    ]),
    autoStartBoundaryAligned: all([
      !source.automaticUpstreamStart,
      !java.automaticUpstreamStartAllowed,
      miniKv.sourceAutomaticUpstreamStart === false,
      miniKv.automaticUpstreamStartAllowed === false,
      miniKv.automaticUpstreamStart === false,
    ]),
  };
}

function createRuntimeChecks(
  config: AppConfig,
  java: JavaV115ApprovalRequiredBoundaryEchoReference,
) {
  return {
    javaEchoWorkflowTemplateApplied: java.echoWorkflowTemplateApplied,
    javaRecordsSplitApplied: java.recordsSplitApplied,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    realResolverImplementationStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification: false,
  };
}

export function collectProductionBlockers(
  checks: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationChecks,
): CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage[] {
  const rules: ReportRule<
    CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage["source"]
  >[] = [
    {
      condition: checks.sourceNodeV274Ready,
      code: "SOURCE_NODE_V274_NOT_READY",
      source: "node-v274-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Node v274 disabled candidate upstream echo verification must be ready before v275 verifies approval-required boundaries.",
    },
    {
      condition: checks.javaV115EchoReady,
      code: "JAVA_V115_ECHO_NOT_READY",
      source: "java-v115-credential-resolver-approval-required-boundary-echo-refinement",
      message: "Java v115 must echo the six approval-required boundary explanations before v275 can proceed.",
    },
    {
      condition: checks.miniKvV121NonParticipationReady,
      code: "MINI_KV_V121_RECEIPT_NOT_READY",
      source: "mini-kv-v121-credential-resolver-approval-required-boundary-non-participation-receipt",
      message: "mini-kv v121 must prove approval-required boundary non-participation before v275 can proceed.",
    },
    {
      condition: checks.approvalRequiredBoundaryCodesAligned,
      code: "APPROVAL_REQUIRED_BOUNDARY_CODES_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Node v274, Java v115, and mini-kv v121 must agree on the six approval-required boundary codes.",
    },
    {
      condition: checks.javaApprovalRequiredExplanationsComplete && checks.miniKvApprovalRequiredDetailsComplete,
      code: "APPROVAL_REQUIRED_EXPLANATIONS_NOT_COMPLETE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Java explanations and mini-kv non-participation details must both be complete and read-only.",
    },
    {
      condition: checks.prohibitedRuntimeActionsAligned,
      code: "PROHIBITED_RUNTIME_ACTIONS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "The prohibited runtime actions for the six approval-required boundaries must align.",
    },
    {
      condition: checks.credentialBoundaryAligned,
      code: "CREDENTIAL_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Credential value reads, loads, stores, and rendering must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.rawEndpointBoundaryAligned,
      code: "RAW_ENDPOINT_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Raw endpoint parsing and rendering must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.connectionBoundaryAligned,
      code: "CONNECTION_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Managed audit connections and external requests must remain closed.",
    },
    {
      condition: checks.writeBoundaryAligned,
      code: "WRITE_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "SQL, approval ledger, schema migration, storage write, restore, and SETNXEX boundaries must remain closed.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for v275 approval-required boundary upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v275 approval-required boundary upstream echo verification.",
    },
  ];

  return collectFailedReportRules(rules);
}

export function collectWarnings(): CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "APPROVAL_REQUIRED_ECHO_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Node v275 verifies Java v115 and mini-kv v121 explanations; it does not approve or implement a real credential resolver.",
    },
    {
      code: "REAL_RESOLVER_STILL_BLOCKED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Credential values, raw endpoint URLs, external requests, schema migration, ledger writes, and upstream auto-start remain blocked.",
    },
  ];
}

export function collectRecommendations(): CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_V275_UNDER_NEW_DOCUMENT_DIRECTORIES",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Archive v275 under d/ and the new code walkthrough sibling directory because the old documentation folders are crowded.",
    },
    {
      code: "CONTINUE_WITH_NODE_V276_STATUS_ROUTES_QUALITY_PASS",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "If no new upstream dependency appears, continue with the planned statusRoutes split quality pass rather than opening a real resolver.",
    },
  ];
}

function arrayEquals(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length
    && left.every((value, index) => value === right[index]);
}

function all(values: readonly boolean[]): boolean {
  return values.every((value) => value);
}
