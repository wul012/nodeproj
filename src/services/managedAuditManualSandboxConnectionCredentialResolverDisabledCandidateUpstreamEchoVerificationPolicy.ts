import type { AppConfig } from "../config.js";
import {
  APPROVAL_REQUIRED_BOUNDARY_CODES,
  BOUNDARY_CODES,
  CANDIDATE_READY_BOUNDARY_CODES,
  REQUIREMENT_CODES,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationConstants.js";
import type {
  CredentialResolverDisabledCandidateUpstreamEchoVerificationChecks,
  CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage,
  JavaV113DisabledImplementationCandidateEchoReceiptReference,
  MiniKvV120DisabledImplementationCandidateNonParticipationReference,
  SourceNodeV273DisabledImplementationCandidateReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationTypes.js";
import {
  allBooleanFieldsAre,
  collectFailedReportRules,
  type ReportRule,
} from "./liveProbeReportUtils.js";

const SOURCE_READY_TRUE_FIELDS = [
  "readyForDisabledImplementationCandidateReview",
  "sourceNodeV272Ready",
  "sourceNodeV272KeepsReadOnlyEchoOnly",
  "sourceNodeV272KeepsRealResolverBlocked",
  "sourceNodeV272KeepsBoundaryAlignment",
] as const;

const SOURCE_REVIEW_TRUE_FIELDS = [
  "disabledImplementationCandidateReviewOnly",
  "readOnlyCandidateReview",
] as const;

const SOURCE_RESOLVER_FALSE_FIELDS = [
  "realResolverImplementationAllowed",
  "connectsManagedAudit",
  "externalRequestSent",
  "resolverClientInstantiated",
  "secretProviderInstantiated",
] as const;

const MINIKV_INTERFACE_FALSE_FIELDS = [
  "includesCredentialValue",
  "includesRawEndpointUrl",
  "sendsExternalRequest",
  "instantiatesSecretProvider",
  "instantiatesResolverClient",
] as const;

const MINIKV_FAKE_FALSE_FIELDS = [
  "fakeRuntimeInstantiated",
  "realSecretProviderAllowed",
  "realManagedAuditTransportAllowed",
] as const;

const SOURCE_CREDENTIAL_FALSE_FIELDS = [
  "readsManagedAuditCredential",
  "storesManagedAuditCredential",
  "credentialValueRead",
] as const;

const MINIKV_CREDENTIAL_FALSE_FIELDS = [
  "sourceReadsManagedAuditCredential",
  "sourceStoresManagedAuditCredential",
  "sourceCredentialValueRead",
  "credentialValueReadAllowed",
  "credentialValueLoaded",
  "credentialValueStored",
  "credentialValueIncluded",
] as const;

const MINIKV_ENDPOINT_FALSE_FIELDS = [
  "sourceRawEndpointUrlParsed",
  "rawEndpointUrlParseAllowed",
  "rawEndpointUrlParsed",
  "rawEndpointUrlIncluded",
] as const;

const SOURCE_RESOLVER_CLIENT_FIELDS = [
  "resolverClientInstantiated",
  "secretProviderInstantiated",
] as const;

const JAVA_RESOLVER_CLIENT_FIELDS = [
  "resolverClientInstantiated",
  "secretProviderInstantiated",
] as const;

const MINIKV_RESOLVER_FALSE_FIELDS = [
  "credentialResolverImplemented",
  "credentialResolverInvoked",
  "resolverClientInstantiated",
  "secretProviderInstantiated",
  "secretProviderRuntimeAllowed",
] as const;

const MINIKV_CONNECTION_FALSE_FIELDS = [
  "connectsManagedAudit",
  "externalRequestAllowed",
  "externalRequestSent",
  "readyForManagedAuditSandboxAdapterConnection",
] as const;

const SOURCE_WRITE_FALSE_FIELDS = [
  "executionAllowed",
  "schemaMigrationExecuted",
  "approvalLedgerWritten",
] as const;

const JAVA_WRITE_FALSE_FIELDS = [
  "approvalLedgerWritten",
  "sqlExecuted",
  "schemaMigrationExecuted",
] as const;

const MINIKV_WRITE_FALSE_FIELDS = [
  "executionAllowed",
  "storageWriteAllowed",
  "writeCommandsExecuted",
  "adminCommandsExecuted",
  "approvalLedgerWriteAllowed",
  "approvalLedgerWritten",
  "managedAuditWriteExecuted",
  "schemaMigrationAllowed",
  "schemaMigrationExecuted",
  "restoreExecutionAllowed",
  "loadRestoreCompactExecuted",
  "setnxexExecutionAllowed",
  "managedAuditStorageBackend",
  "auditAuthoritative",
  "orderAuthoritative",
] as const;

const MINIKV_AUTOSTART_FALSE_FIELDS = [
  "automaticUpstreamStartAllowed",
  "automaticUpstreamStart",
] as const;

export function createChecks(
  config: AppConfig,
  sourceNodeV273: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaV113: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  miniKvV120: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): CredentialResolverDisabledCandidateUpstreamEchoVerificationChecks {
  return {
    sourceNodeV273Ready: isSourceReady(sourceNodeV273),
    sourceNodeV273KeepsReviewOnly: keepsReviewOnly(sourceNodeV273),
    sourceNodeV273KeepsRealResolverBlocked: keepsRealResolverBlocked(sourceNodeV273),
    sourceNodeV273KeepsBoundaryAlignment: keepsBoundaryAlignment(sourceNodeV273),
    javaV113EchoReady: javaV113.readyForNodeV274Alignment,
    miniKvV120NonParticipationReady: miniKvV120.readyForNodeV274Alignment,
    candidateCountsAligned: hasAlignedCandidateCounts(sourceNodeV273, javaV113, miniKvV120),
    boundaryCodesAligned: hasAlignedBoundaryCodes(sourceNodeV273, javaV113, miniKvV120),
    candidateReadyBoundaryCodesAligned: hasAlignedReadyCodes(sourceNodeV273, javaV113, miniKvV120),
    approvalRequiredBoundaryCodesAligned: hasAlignedApprovalCodes(sourceNodeV273, javaV113, miniKvV120),
    interfaceShapeAligned: hasAlignedInterfaceShape(sourceNodeV273, javaV113, miniKvV120),
    fakeWiringAligned: hasAlignedFakeWiring(sourceNodeV273, javaV113, miniKvV120),
    credentialBoundaryAligned: isCredentialBoundaryClosed(sourceNodeV273, javaV113, miniKvV120),
    rawEndpointBoundaryAligned: isEndpointBoundaryClosed(sourceNodeV273, javaV113, miniKvV120),
    resolverBoundaryAligned: isResolverBoundaryClosed(sourceNodeV273, javaV113, miniKvV120),
    connectionBoundaryAligned: isConnectionBoundaryClosed(sourceNodeV273, javaV113, miniKvV120),
    writeBoundaryAligned: isWriteBoundaryClosed(sourceNodeV273, javaV113, miniKvV120),
    autoStartBoundaryAligned: isAutoStartBoundaryClosed(sourceNodeV273, javaV113, miniKvV120),
    javaEchoWorkflowTemplateApplied: javaV113.echoWorkflowTemplateApplied,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    realResolverImplementationStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification: false,
  };
}

function isSourceReady(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
): boolean {
  return source.reviewState === "credential-resolver-disabled-implementation-candidate-review-ready"
    && allBooleanFieldsAre(source, SOURCE_READY_TRUE_FIELDS, true);
}

function keepsReviewOnly(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
): boolean {
  return allBooleanFieldsAre(source, SOURCE_REVIEW_TRUE_FIELDS, true);
}

function keepsRealResolverBlocked(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
): boolean {
  return allBooleanFieldsAre(source, SOURCE_RESOLVER_FALSE_FIELDS, false);
}

function keepsBoundaryAlignment(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
): boolean {
  return source.candidateDecisionCount === BOUNDARY_CODES.length
    && source.candidateReadyDecisionCount === CANDIDATE_READY_BOUNDARY_CODES.length
    && source.approvalRequiredDecisionCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length
    && arrayEquals(source.boundaryCodes, [...BOUNDARY_CODES])
    && arrayEquals(source.requirementCodes, [...REQUIREMENT_CODES]);
}

function hasAlignedCandidateCounts(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaEcho: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  receipt: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): boolean {
  return javaEcho.checkCount === source.checkCount
    && receipt.checkCount === source.checkCount
    && javaEcho.passedCheckCount === source.passedCheckCount
    && receipt.passedCheckCount === source.passedCheckCount
    && javaEcho.sourceCheckCount === source.sourceCheckCount
    && receipt.sourceCheckCount === source.sourceCheckCount
    && javaEcho.candidateDecisionCount === source.candidateDecisionCount
    && receipt.candidateDecisionCount === source.candidateDecisionCount
    && javaEcho.candidateReadyDecisionCount === source.candidateReadyDecisionCount
    && receipt.candidateReadyDecisionCount === source.candidateReadyDecisionCount
    && javaEcho.approvalRequiredDecisionCount === source.approvalRequiredDecisionCount
    && receipt.approvalRequiredDecisionCount === source.approvalRequiredDecisionCount;
}

function hasAlignedBoundaryCodes(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaEcho: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  receipt: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): boolean {
  return javaEcho.boundaryCodesEchoed
    && arrayEquals(source.boundaryCodes, [...BOUNDARY_CODES])
    && arrayEquals(receipt.sourceNodeV272BoundaryCodes, [...BOUNDARY_CODES]);
}

function hasAlignedReadyCodes(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaEcho: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  receipt: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): boolean {
  return javaEcho.candidateReadyBoundaryCodesEchoed
    && arrayEquals(source.candidateReadyBoundaryCodes, [...CANDIDATE_READY_BOUNDARY_CODES])
    && arrayEquals(receipt.candidateReadyBoundaryCodes, [...CANDIDATE_READY_BOUNDARY_CODES]);
}

function hasAlignedApprovalCodes(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaEcho: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  receipt: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): boolean {
  return javaEcho.approvalRequiredBoundaryCodesEchoed
    && arrayEquals(source.approvalRequiredBoundaryCodes, [...APPROVAL_REQUIRED_BOUNDARY_CODES])
    && arrayEquals(receipt.approvalRequiredBoundaryCodes, [...APPROVAL_REQUIRED_BOUNDARY_CODES]);
}

function hasAlignedInterfaceShape(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaEcho: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  receipt: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): boolean {
  return javaEcho.interfaceShapeEchoed
    && receipt.requestFieldCount === source.requestFields.length
    && receipt.responseFieldCount === source.responseFields.length
    && receipt.failureClassCount === source.failureClasses.length
    && receipt.handleOnlyRequest === true
    && allBooleanFieldsAre(receipt, MINIKV_INTERFACE_FALSE_FIELDS, false);
}

function hasAlignedFakeWiring(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaEcho: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  receipt: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): boolean {
  return javaEcho.fakeWiringEchoed
    && source.fakeWiringReviewOnly
    && source.fakeRuntimeInstantiated === false
    && receipt.fakeWiringReviewOnly === true
    && allBooleanFieldsAre(receipt, MINIKV_FAKE_FALSE_FIELDS, false);
}

function isCredentialBoundaryClosed(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaEcho: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  receipt: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): boolean {
  return allBooleanFieldsAre(source, SOURCE_CREDENTIAL_FALSE_FIELDS, false)
    && javaEcho.credentialValueRead === false
    && allBooleanFieldsAre(receipt, MINIKV_CREDENTIAL_FALSE_FIELDS, false);
}

function isEndpointBoundaryClosed(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaEcho: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  receipt: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): boolean {
  return source.rawEndpointUrlParsed === false
    && javaEcho.rawEndpointUrlParsed === false
    && allBooleanFieldsAre(receipt, MINIKV_ENDPOINT_FALSE_FIELDS, false);
}

function isResolverBoundaryClosed(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaEcho: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  receipt: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): boolean {
  return allBooleanFieldsAre(source, SOURCE_RESOLVER_CLIENT_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, JAVA_RESOLVER_CLIENT_FIELDS, false)
    && allBooleanFieldsAre(receipt, MINIKV_RESOLVER_FALSE_FIELDS, false);
}

function isConnectionBoundaryClosed(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaEcho: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  receipt: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): boolean {
  return source.connectsManagedAudit === false
    && source.externalRequestSent === false
    && javaEcho.connectsManagedAudit === false
    && javaEcho.externalRequestSent === false
    && allBooleanFieldsAre(receipt, MINIKV_CONNECTION_FALSE_FIELDS, false);
}

function isWriteBoundaryClosed(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaEcho: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  receipt: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): boolean {
  return allBooleanFieldsAre(source, SOURCE_WRITE_FALSE_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, JAVA_WRITE_FALSE_FIELDS, false)
    && allBooleanFieldsAre(receipt, MINIKV_WRITE_FALSE_FIELDS, false);
}

function isAutoStartBoundaryClosed(
  source: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaEcho: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  receipt: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): boolean {
  return source.automaticUpstreamStart === false
    && javaEcho.automaticUpstreamStart === false
    && allBooleanFieldsAre(receipt, MINIKV_AUTOSTART_FALSE_FIELDS, false);
}

export function collectProductionBlockers(
  checks: CredentialResolverDisabledCandidateUpstreamEchoVerificationChecks,
): CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage[] {
  const rules: ReportRule<CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage["source"]>[] = [
    {
      condition: checks.sourceNodeV273Ready,
      code: "SOURCE_NODE_V273_NOT_READY",
      source: "node-v273-credential-resolver-disabled-implementation-candidate-review",
      message: "Node v273 disabled implementation candidate review must be ready before v274 verifies upstream echoes.",
    },
    {
      condition: checks.javaV113EchoReady,
      code: "JAVA_V113_ECHO_NOT_READY",
      source: "java-v113-credential-resolver-disabled-implementation-candidate-echo-receipt",
      message: "Java v113 must echo Node v273 disabled candidate boundaries before v274 can proceed.",
    },
    {
      condition: checks.miniKvV120NonParticipationReady,
      code: "MINI_KV_V120_RECEIPT_NOT_READY",
      source: "mini-kv-v120-credential-resolver-disabled-implementation-candidate-non-participation-receipt",
      message: "mini-kv v120 must prove disabled-candidate non-participation before v274 can proceed.",
    },
    {
      condition: checks.candidateCountsAligned,
      code: "CANDIDATE_COUNTS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Node v273, Java v113, and mini-kv v120 must agree on 21/21 checks, 10 decisions, 4 disabled-ready, and 6 approval-required boundaries.",
    },
    {
      condition: checks.candidateReadyBoundaryCodesAligned && checks.approvalRequiredBoundaryCodesAligned,
      code: "CANDIDATE_SCOPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "The four disabled-ready and six approval-required boundary scopes must align across Node, Java, and mini-kv.",
    },
    {
      condition: checks.interfaceShapeAligned,
      code: "INTERFACE_SHAPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "The disabled resolver candidate interface must remain handle-only and exclude credential values and raw endpoint URLs.",
    },
    {
      condition: checks.fakeWiringAligned,
      code: "FAKE_WIRING_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Fake wiring must remain review-only and must not instantiate runtime resolver, secret provider, or transport components.",
    },
    {
      condition: checks.credentialBoundaryAligned,
      code: "CREDENTIAL_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Credential value reads, loads, stores, and rendering must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.rawEndpointBoundaryAligned,
      code: "RAW_ENDPOINT_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Raw endpoint parsing and rendering must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.connectionBoundaryAligned,
      code: "CONNECTION_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Managed audit connections and external requests must remain closed.",
    },
    {
      condition: checks.writeBoundaryAligned,
      code: "WRITE_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "SQL, approval ledger, schema migration, storage write, restore, and SETNXEX boundaries must remain closed.",
    },
    {
      condition: checks.javaEchoWorkflowTemplateApplied,
      code: "JAVA_ECHO_WORKFLOW_TEMPLATE_MISSING",
      source: "java-v113-credential-resolver-disabled-implementation-candidate-echo-receipt",
      message: "Java v113 should show the echo workflow template optimization so later echo receipts do not keep copying 600-800 lines.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for v274 disabled candidate upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v274 disabled candidate upstream echo verification.",
    },
  ];

  return collectFailedReportRules(rules);
}

export function collectWarnings(): CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "DISABLED_CANDIDATE_ECHO_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Node v274 verifies Java v113 and mini-kv v120 understanding of Node v273; it does not implement a real credential resolver.",
    },
    {
      code: "JAVA_V114_IS_QUALITY_CONTEXT_ONLY",
      severity: "warning",
      source: "java-v113-credential-resolver-disabled-implementation-candidate-echo-receipt",
      message: "Java v114 verification-hint catalog split is useful quality context, but it is not a runtime approval signal for Node.",
    },
  ];
}

export function collectRecommendations(): CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_V274_AND_CLOSE_V272_DERIVED_PLAN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Archive v274 and close the v272-derived plan because Node v273, Java v113, mini-kv v120, and Node v274 complete the sequence.",
    },
    {
      code: "WRITE_SUCCESSOR_PLAN_BEFORE_RUNTIME_RESOLVER",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Write a successor plan before moving from disabled candidate echo verification toward any real resolver shell or adapter behavior.",
    },
  ];
}

function arrayEquals(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
