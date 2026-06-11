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

export function createChecks(
  config: AppConfig,
  sourceNodeV273: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaV113: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  miniKvV120: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): CredentialResolverDisabledCandidateUpstreamEchoVerificationChecks {
  return {
    sourceNodeV273Ready:
      sourceNodeV273.reviewState === "credential-resolver-disabled-implementation-candidate-review-ready"
      && sourceNodeV273.readyForDisabledImplementationCandidateReview
      && sourceNodeV273.sourceNodeV272Ready
      && sourceNodeV273.sourceNodeV272KeepsReadOnlyEchoOnly
      && sourceNodeV273.sourceNodeV272KeepsRealResolverBlocked
      && sourceNodeV273.sourceNodeV272KeepsBoundaryAlignment,
    sourceNodeV273KeepsReviewOnly:
      sourceNodeV273.disabledImplementationCandidateReviewOnly
      && sourceNodeV273.readOnlyCandidateReview,
    sourceNodeV273KeepsRealResolverBlocked:
      !sourceNodeV273.realResolverImplementationAllowed
      && !sourceNodeV273.connectsManagedAudit
      && !sourceNodeV273.externalRequestSent
      && !sourceNodeV273.resolverClientInstantiated
      && !sourceNodeV273.secretProviderInstantiated,
    sourceNodeV273KeepsBoundaryAlignment:
      sourceNodeV273.candidateDecisionCount === BOUNDARY_CODES.length
      && sourceNodeV273.candidateReadyDecisionCount === CANDIDATE_READY_BOUNDARY_CODES.length
      && sourceNodeV273.approvalRequiredDecisionCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length
      && arrayEquals(sourceNodeV273.boundaryCodes, [...BOUNDARY_CODES])
      && arrayEquals(sourceNodeV273.requirementCodes, [...REQUIREMENT_CODES]),
    javaV113EchoReady: javaV113.readyForNodeV274Alignment,
    miniKvV120NonParticipationReady: miniKvV120.readyForNodeV274Alignment,
    candidateCountsAligned:
      javaV113.checkCount === sourceNodeV273.checkCount
      && miniKvV120.checkCount === sourceNodeV273.checkCount
      && javaV113.passedCheckCount === sourceNodeV273.passedCheckCount
      && miniKvV120.passedCheckCount === sourceNodeV273.passedCheckCount
      && javaV113.sourceCheckCount === sourceNodeV273.sourceCheckCount
      && miniKvV120.sourceCheckCount === sourceNodeV273.sourceCheckCount
      && javaV113.candidateDecisionCount === sourceNodeV273.candidateDecisionCount
      && miniKvV120.candidateDecisionCount === sourceNodeV273.candidateDecisionCount
      && javaV113.candidateReadyDecisionCount === sourceNodeV273.candidateReadyDecisionCount
      && miniKvV120.candidateReadyDecisionCount === sourceNodeV273.candidateReadyDecisionCount
      && javaV113.approvalRequiredDecisionCount === sourceNodeV273.approvalRequiredDecisionCount
      && miniKvV120.approvalRequiredDecisionCount === sourceNodeV273.approvalRequiredDecisionCount,
    boundaryCodesAligned:
      javaV113.boundaryCodesEchoed
      && arrayEquals(sourceNodeV273.boundaryCodes, [...BOUNDARY_CODES])
      && arrayEquals(miniKvV120.sourceNodeV272BoundaryCodes, [...BOUNDARY_CODES]),
    candidateReadyBoundaryCodesAligned:
      javaV113.candidateReadyBoundaryCodesEchoed
      && arrayEquals(sourceNodeV273.candidateReadyBoundaryCodes, [...CANDIDATE_READY_BOUNDARY_CODES])
      && arrayEquals(miniKvV120.candidateReadyBoundaryCodes, [...CANDIDATE_READY_BOUNDARY_CODES]),
    approvalRequiredBoundaryCodesAligned:
      javaV113.approvalRequiredBoundaryCodesEchoed
      && arrayEquals(sourceNodeV273.approvalRequiredBoundaryCodes, [...APPROVAL_REQUIRED_BOUNDARY_CODES])
      && arrayEquals(miniKvV120.approvalRequiredBoundaryCodes, [...APPROVAL_REQUIRED_BOUNDARY_CODES]),
    interfaceShapeAligned:
      javaV113.interfaceShapeEchoed
      && miniKvV120.requestFieldCount === sourceNodeV273.requestFields.length
      && miniKvV120.responseFieldCount === sourceNodeV273.responseFields.length
      && miniKvV120.failureClassCount === sourceNodeV273.failureClasses.length
      && miniKvV120.handleOnlyRequest === true
      && miniKvV120.includesCredentialValue === false
      && miniKvV120.includesRawEndpointUrl === false
      && miniKvV120.sendsExternalRequest === false
      && miniKvV120.instantiatesSecretProvider === false
      && miniKvV120.instantiatesResolverClient === false,
    fakeWiringAligned:
      javaV113.fakeWiringEchoed
      && sourceNodeV273.fakeWiringReviewOnly
      && !sourceNodeV273.fakeRuntimeInstantiated
      && miniKvV120.fakeWiringReviewOnly === true
      && miniKvV120.fakeRuntimeInstantiated === false
      && miniKvV120.realSecretProviderAllowed === false
      && miniKvV120.realManagedAuditTransportAllowed === false,
    credentialBoundaryAligned:
      !sourceNodeV273.readsManagedAuditCredential
      && !sourceNodeV273.storesManagedAuditCredential
      && !sourceNodeV273.credentialValueRead
      && !javaV113.credentialValueRead
      && miniKvV120.sourceReadsManagedAuditCredential === false
      && miniKvV120.sourceStoresManagedAuditCredential === false
      && miniKvV120.sourceCredentialValueRead === false
      && miniKvV120.credentialValueReadAllowed === false
      && miniKvV120.credentialValueLoaded === false
      && miniKvV120.credentialValueStored === false
      && miniKvV120.credentialValueIncluded === false,
    rawEndpointBoundaryAligned:
      !sourceNodeV273.rawEndpointUrlParsed
      && !javaV113.rawEndpointUrlParsed
      && miniKvV120.sourceRawEndpointUrlParsed === false
      && miniKvV120.rawEndpointUrlParseAllowed === false
      && miniKvV120.rawEndpointUrlParsed === false
      && miniKvV120.rawEndpointUrlIncluded === false,
    resolverBoundaryAligned:
      !sourceNodeV273.resolverClientInstantiated
      && !sourceNodeV273.secretProviderInstantiated
      && !javaV113.resolverClientInstantiated
      && !javaV113.secretProviderInstantiated
      && miniKvV120.credentialResolverImplemented === false
      && miniKvV120.credentialResolverInvoked === false
      && miniKvV120.resolverClientInstantiated === false
      && miniKvV120.secretProviderInstantiated === false
      && miniKvV120.secretProviderRuntimeAllowed === false,
    connectionBoundaryAligned:
      !sourceNodeV273.connectsManagedAudit
      && !sourceNodeV273.externalRequestSent
      && !javaV113.connectsManagedAudit
      && !javaV113.externalRequestSent
      && miniKvV120.connectsManagedAudit === false
      && miniKvV120.externalRequestAllowed === false
      && miniKvV120.externalRequestSent === false
      && miniKvV120.readyForManagedAuditSandboxAdapterConnection === false,
    writeBoundaryAligned:
      !sourceNodeV273.executionAllowed
      && !sourceNodeV273.schemaMigrationExecuted
      && !sourceNodeV273.approvalLedgerWritten
      && !javaV113.approvalLedgerWritten
      && !javaV113.sqlExecuted
      && !javaV113.schemaMigrationExecuted
      && miniKvV120.executionAllowed === false
      && miniKvV120.storageWriteAllowed === false
      && miniKvV120.writeCommandsExecuted === false
      && miniKvV120.adminCommandsExecuted === false
      && miniKvV120.approvalLedgerWriteAllowed === false
      && miniKvV120.approvalLedgerWritten === false
      && miniKvV120.managedAuditWriteExecuted === false
      && miniKvV120.schemaMigrationAllowed === false
      && miniKvV120.schemaMigrationExecuted === false
      && miniKvV120.restoreExecutionAllowed === false
      && miniKvV120.loadRestoreCompactExecuted === false
      && miniKvV120.setnxexExecutionAllowed === false
      && miniKvV120.managedAuditStorageBackend === false
      && miniKvV120.auditAuthoritative === false
      && miniKvV120.orderAuthoritative === false,
    autoStartBoundaryAligned:
      !sourceNodeV273.automaticUpstreamStart
      && !javaV113.automaticUpstreamStart
      && miniKvV120.automaticUpstreamStartAllowed === false
      && miniKvV120.automaticUpstreamStart === false,
    javaEchoWorkflowTemplateApplied: javaV113.echoWorkflowTemplateApplied,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    realResolverImplementationStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification: false,
  };
}

export function collectProductionBlockers(
  checks: CredentialResolverDisabledCandidateUpstreamEchoVerificationChecks,
): CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
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

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
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
