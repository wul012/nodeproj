import type { AppConfig } from "../config.js";
import type {
  CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationChecks,
  JavaV111ProductionReadinessBlockedDecisionEchoReceiptReference,
  MiniKvV118ProductionReadinessBlockedDecisionNonParticipationReference,
  SourceNodeV268ProductionReadinessDecisionGateReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationTypes.js";
import type {
  JavaV134RuntimeShellCandidateGateEchoReference,
  MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference,
  RuntimeShellCandidateGateUpstreamEchoVerificationChecks,
  SourceNodeV297RuntimeShellCandidateGateReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationTypes.js";

export function createBlockedDecisionChecks(
  config: AppConfig,
  source: SourceNodeV268ProductionReadinessDecisionGateReference,
  java: JavaV111ProductionReadinessBlockedDecisionEchoReceiptReference,
  miniKv: MiniKvV118ProductionReadinessBlockedDecisionNonParticipationReference,
  missingCodes: readonly string[],
): CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationChecks {
  return {
    ...blockedSourceChecks(source),
    ...blockedEchoChecks(source, java, miniKv, missingCodes),
    ...blockedSecretChecks(source, java, miniKv),
    ...blockedConnectionChecks(source, java, miniKv),
    ...blockedWriteChecks(source, java, miniKv),
    ...blockedConfigChecks(config, source, java, miniKv),
  };
}

function blockedSourceChecks(source: SourceNodeV268ProductionReadinessDecisionGateReference) {
  return {
    sourceNodeV268Ready:
      source.decisionGateState === "blocked"
      && source.readinessDecision === "blocked"
      && source.decisionGateEvaluated
      && source.sourceNodeV267Ready
      && source.sourceNodeV267BlocksRealResolver,
    sourceNodeV268DecisionBlocked:
      source.readinessDecision === "blocked"
      && source.productionBlockerCount === 10
      && source.missingPreImplementationRequirementCount === 10,
    sourceNodeV268KeepsRealResolverBlocked:
      !source.readyForCredentialResolverPreImplementationPlan
      && !source.realResolverImplementationAllowed
      && !source.connectsManagedAudit,
  };
}

function blockedEchoChecks(
  source: SourceNodeV268ProductionReadinessDecisionGateReference,
  java: JavaV111ProductionReadinessBlockedDecisionEchoReceiptReference,
  miniKv: MiniKvV118ProductionReadinessBlockedDecisionNonParticipationReference,
  missingCodes: readonly string[],
) {
  return {
    javaV111EchoReady: java.readyForNodeV269Alignment,
    miniKvV118NonParticipationReady: miniKv.readyForNodeV269Alignment,
    blockedDecisionAligned:
      java.readinessDecision === "blocked"
      && miniKv.sourceReadinessDecision === "blocked",
    decisionModeAligned:
      java.decisionEchoMode === "java-v111-credential-resolver-production-readiness-blocked-decision-echo-receipt-only"
      && miniKv.sourceDecisionMode === source.decisionMode,
    countSummaryAligned:
      java.checkCount === source.checkCount
      && miniKv.checkCount === source.checkCount
      && java.passedCheckCount === source.passedCheckCount
      && miniKv.passedCheckCount === source.passedCheckCount
      && java.sourceCheckCount === source.sourceCheckCount
      && miniKv.sourceCheckCount === source.sourceCheckCount
      && java.missingPreImplementationRequirementCount === source.missingPreImplementationRequirementCount
      && miniKv.missingPreImplementationRequirementCount === source.missingPreImplementationRequirementCount,
    missingRequirementBlockersAligned:
      java.blockerCodesEchoed
      && arraysEqual(miniKv.productionBlockerCodes, missingCodes)
      && source.productionBlockerCodes.every((code) => missingCodes.includes(code)),
    readOnlyDecisionGateAligned:
      source.productionReadinessGateOnly
      && source.readOnlyDecisionGate
      && miniKv.productionReadinessGateOnly === true
      && miniKv.readOnlyDecisionGate === true,
  };
}

function blockedSecretChecks(
  source: SourceNodeV268ProductionReadinessDecisionGateReference,
  java: JavaV111ProductionReadinessBlockedDecisionEchoReceiptReference,
  miniKv: MiniKvV118ProductionReadinessBlockedDecisionNonParticipationReference,
) {
  return {
    credentialBoundaryAligned:
      !source.readsManagedAuditCredential
      && !source.storesManagedAuditCredential
      && !source.credentialValueRead
      && !java.credentialValueRead
      && miniKv.credentialValueReadAllowed === false
      && miniKv.credentialValueLoaded === false
      && miniKv.credentialValueStored === false
      && miniKv.credentialValueIncluded === false,
    rawEndpointBoundaryAligned:
      !source.rawEndpointUrlParsed
      && !java.rawEndpointUrlParsed
      && miniKv.rawEndpointUrlParsed === false
      && miniKv.rawEndpointUrlIncluded === false,
    resolverBoundaryAligned:
      !source.resolverClientInstantiated
      && !source.secretProviderInstantiated
      && !java.resolverClientInstantiated
      && !java.secretProviderInstantiated
      && miniKv.credentialResolverImplemented === false
      && miniKv.credentialResolverInvoked === false
      && miniKv.resolverClientInstantiated === false
      && miniKv.secretProviderInstantiated === false
      && miniKv.secretProviderStubDefined === false
      && miniKv.secretProviderRuntimeAllowed === false,
  };
}

function blockedConnectionChecks(
  source: SourceNodeV268ProductionReadinessDecisionGateReference,
  java: JavaV111ProductionReadinessBlockedDecisionEchoReceiptReference,
  miniKv: MiniKvV118ProductionReadinessBlockedDecisionNonParticipationReference,
) {
  return {
    connectionBoundaryAligned:
      !source.connectsManagedAudit
      && !source.externalRequestSent
      && !java.connectsManagedAudit
      && !java.externalRequestSent
      && miniKv.connectionExecutionAllowed === false
      && miniKv.externalRequestSent === false
      && miniKv.readyForManagedAuditSandboxAdapterConnection === false,
  };
}

function blockedWriteChecks(
  source: SourceNodeV268ProductionReadinessDecisionGateReference,
  java: JavaV111ProductionReadinessBlockedDecisionEchoReceiptReference,
  miniKv: MiniKvV118ProductionReadinessBlockedDecisionNonParticipationReference,
) {
  return {
    writeBoundaryAligned:
      !source.executionAllowed
      && !source.schemaMigrationExecuted
      && !java.approvalLedgerWritten
      && !java.sqlExecuted
      && !java.schemaMigrationExecuted
      && miniKv.executionAllowed === false
      && miniKv.storageWriteAllowed === false
      && miniKv.managedAuditWriteExecuted === false
      && miniKv.approvalLedgerWriteAllowed === false
      && miniKv.approvalLedgerWriteExecuted === false
      && miniKv.schemaMigrationExecutionAllowed === false
      && miniKv.restoreExecutionAllowed === false
      && miniKv.loadRestoreCompactExecuted === false
      && miniKv.setnxexExecutionAllowed === false
      && miniKv.managedAuditStorageBackend === false,
  };
}

function blockedConfigChecks(
  config: AppConfig,
  source: SourceNodeV268ProductionReadinessDecisionGateReference,
  java: JavaV111ProductionReadinessBlockedDecisionEchoReceiptReference,
  miniKv: MiniKvV118ProductionReadinessBlockedDecisionNonParticipationReference,
) {
  return {
    autoStartBoundaryAligned:
      !source.automaticUpstreamStart
      && !java.automaticUpstreamStart
      && miniKv.nodeAutoStartAllowed === false
      && miniKv.javaAutoStartAllowed === false
      && miniKv.miniKvAutoStartAllowed === false
      && miniKv.externalAuditServiceAutoStartAllowed === false,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    realResolverImplementationStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification: false,
  };
}

export function createRuntimeCandidateChecks(
  config: AppConfig,
  source: SourceNodeV297RuntimeShellCandidateGateReference,
  java: JavaV134RuntimeShellCandidateGateEchoReference,
  miniKv: MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference,
  gateDecision: string,
  requiredGateCount: number,
): RuntimeShellCandidateGateUpstreamEchoVerificationChecks {
  return {
    ...runtimeSourceChecks(source),
    ...runtimeEvidenceChecks(java, miniKv),
    ...runtimeAlignmentChecks(source, java, miniKv, gateDecision, requiredGateCount),
    ...runtimeExecutionChecks(source, java, miniKv),
    ...runtimeSecretChecks(source, java, miniKv),
    ...runtimeIoChecks(source, java, miniKv),
    ...runtimeFinalChecks(source, java, miniKv),
    ...runtimeConfigChecks(config),
  };
}

function runtimeSourceChecks(source: SourceNodeV297RuntimeShellCandidateGateReference) {
  return {
    sourceNodeV297Ready:
      source.candidateGateState === "disabled-runtime-shell-implementation-candidate-gate-reviewed"
      && source.readyForCandidateGate
      && source.readyForParallelJavaV134MiniKvV131EchoRequest
      && source.productionBlockerCount === 0,
    sourceNodeV297KeepsImplementationBlocked:
      source.readyForNodeV298RuntimeShellImplementation === false
      && source.runtimeShellImplemented === false
      && source.runtimeShellInvocationAllowed === false
      && source.executionAllowed === false,
    sourceNodeV297KeepsSideEffectsClosed:
      source.credentialValueRead === false
      && source.rawEndpointUrlParsed === false
      && source.externalRequestSent === false
      && source.connectsManagedAudit === false
      && source.secretProviderInstantiated === false
      && source.resolverClientInstantiated === false
      && source.schemaMigrationExecuted === false
      && source.approvalLedgerWritten === false
      && source.automaticUpstreamStart === false,
  };
}

function runtimeEvidenceChecks(
  java: JavaV134RuntimeShellCandidateGateEchoReference,
  miniKv: MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference,
) {
  return {
    javaV134EvidencePresent: java.evidencePresent && java.verificationDocumented,
    javaV134CandidateGateEchoReady:
      java.candidateGateEchoPresent
      && java.readyForNodeV298
      && java.consumedNodeV297
      && java.gateDecisionEchoed
      && java.fiveGateSetEchoed
      && java.necessityEchoed,
    miniKvV131EvidencePresent: miniKv.evidencePresent && miniKv.verificationDocumented,
    miniKvV131NonParticipationReceiptReady:
      miniKv.releaseVersion === "v131"
      && miniKv.consumerHint === "Node v298 runtime shell candidate gate upstream echo verification"
      && miniKv.readyForNodeV298 === true
      && miniKv.productionBlockerCount === 0,
  };
}

function runtimeAlignmentChecks(
  source: SourceNodeV297RuntimeShellCandidateGateReference,
  java: JavaV134RuntimeShellCandidateGateEchoReference,
  miniKv: MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference,
  gateDecision: string,
  requiredGateCount: number,
) {
  return {
    upstreamEchoConsumerAligned:
      java.readyForNodeV298
      && miniKv.consumerHint === "Node v298 runtime shell candidate gate upstream echo verification",
    nodeJavaMiniKvGateDecisionAligned:
      source.gateDecision === gateDecision
      && java.gateDecisionEchoed
      && miniKv.nodeV297GateDecision === gateDecision,
    candidateGateCountAligned:
      source.requiredGateCount === requiredGateCount
      && source.documentedGateCount === requiredGateCount
      && source.reviewEvidenceSatisfiedCount === requiredGateCount
      && java.fiveGateSetEchoed
      && miniKv.requiredGateCount === requiredGateCount
      && miniKv.documentedGateCount === requiredGateCount
      && miniKv.reviewEvidenceSatisfiedCount === requiredGateCount
      && miniKv.runtimePrerequisiteSatisfiedCount === 0
      && miniKv.implementationAllowedGateCount === 0,
    candidateGateDigestAnchored:
      miniKv.nodeV297GateDigest === source.gateDigest
      && source.gateDigest.length === 64,
  };
}

function runtimeExecutionChecks(
  source: SourceNodeV297RuntimeShellCandidateGateReference,
  java: JavaV134RuntimeShellCandidateGateEchoReference,
  miniKv: MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference,
) {
  return {
    runtimeShellImplementationStillForbidden:
      !source.runtimeShellImplemented
      && java.noRuntimeImplementation
      && miniKv.runtimeShellImplemented === false
      && miniKv.disabledRuntimeShellParticipates === false,
    runtimeShellInvocationStillForbidden:
      !source.runtimeShellInvocationAllowed
      && java.noRuntimeInvocation
      && miniKv.runtimeShellInvocationAllowed === false
      && miniKv.executionAllowed === false,
  };
}

function runtimeSecretChecks(
  source: SourceNodeV297RuntimeShellCandidateGateReference,
  java: JavaV134RuntimeShellCandidateGateEchoReference,
  miniKv: MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference,
) {
  return {
    credentialBoundaryClosed:
      !source.credentialValueRead
      && java.credentialValueBoundaryClosed
      && miniKv.credentialValueRead === false,
    rawEndpointBoundaryClosed:
      !source.rawEndpointUrlParsed
      && java.rawEndpointBoundaryClosed
      && miniKv.rawEndpointUrlParsed === false,
    providerClientBoundaryClosed:
      !source.secretProviderInstantiated
      && !source.resolverClientInstantiated
      && java.providerClientBoundaryClosed
      && miniKv.providerClientInstantiationAllowed === false,
  };
}

function runtimeIoChecks(
  source: SourceNodeV297RuntimeShellCandidateGateReference,
  java: JavaV134RuntimeShellCandidateGateEchoReference,
  miniKv: MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference,
) {
  return {
    connectionBoundaryClosed:
      !source.connectsManagedAudit
      && !source.externalRequestSent
      && java.connectionBoundaryClosed
      && miniKv.connectsManagedAudit === false
      && miniKv.externalRequestSent === false,
    writeBoundaryClosed:
      !source.approvalLedgerWritten
      && !source.schemaMigrationExecuted
      && java.ledgerSqlSchemaBoundaryClosed
      && miniKv.storageWriteAllowed === false
      && miniKv.approvalLedgerWritten === false
      && miniKv.schemaMigrationExecuted === false,
  };
}

function runtimeFinalChecks(
  source: SourceNodeV297RuntimeShellCandidateGateReference,
  java: JavaV134RuntimeShellCandidateGateEchoReference,
  miniKv: MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference,
) {
  return {
    loadCompactRestoreSetnxexStillBlocked:
      miniKv.loadRestoreCompactExecuted === false
      && miniKv.setnxexExecutionAllowed === false,
    autoStartBoundaryClosed:
      !source.automaticUpstreamStart
      && java.automaticUpstreamStartBlocked
      && miniKv.automaticUpstreamStart === false,
    auditAndOrderAuthorityForbidden:
      miniKv.auditAuthoritative === false
      && miniKv.orderAuthoritative === false,
  };
}

function runtimeConfigChecks(config: AppConfig) {
  return {
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification: false,
  };
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
