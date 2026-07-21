import type { AppConfig } from "../../config.js";
import { completeChecks } from "../reportCheckAssembly.js";
import {
  BOUNDARY_CODES,
  REQUIREMENT_CODES,
  arrayEquals,
} from "./evidence.js";
import type {
  JavaV112PlanEcho,
  MiniKvV119NonParticipation,
  PlanEchoChecks,
  SourceV270PlanIntake,
} from "./types.js";

export function createPlanEchoChecks(
  config: AppConfig,
  source: SourceV270PlanIntake,
  java: JavaV112PlanEcho,
  miniKv: MiniKvV119NonParticipation,
): PlanEchoChecks {
  const draft: PlanEchoChecks = {
    sourceNodeV270Ready: isSourceReady(source),
    sourceNodeV270KeepsPlanIntakeOnly: isSourcePlanOnly(source),
    sourceNodeV270KeepsRealResolverBlocked: isSourceBlocked(source),
    javaV112EchoReady: java.readyForNodeV272Alignment,
    miniKvV119NonParticipationReady: miniKv.readyForNodeV272Alignment,
    planIntakeStateAligned:
      java.planIntakeState === source.planIntakeState
      && miniKv.sourcePlanIntakeState === source.planIntakeState,
    planCountsAligned: arePlanCountsAligned(source, java, miniKv),
    boundaryCodesAligned:
      java.boundaryCodesEchoed
      && arrayEquals(source.boundaryCodes, [...BOUNDARY_CODES])
      && arrayEquals(miniKv.boundaryCodes, [...BOUNDARY_CODES]),
    requirementCodesAligned:
      java.requirementCodesEchoed
      && arrayEquals(source.requirementCodes, [...REQUIREMENT_CODES])
      && arrayEquals(miniKv.requirementCodes, [...REQUIREMENT_CODES]),
    planIntakeVersionsAligned:
      java.consumedNodeVersion === "Node v270"
      && java.nextNodeConsumerVersion === "Node v272"
      && miniKv.planVersion === source.planVersion
      && miniKv.planMode === source.planMode
      && miniKv.planDigest === source.planDigest
      && miniKv.intakeDigest === source.intakeDigest,
    credentialBoundaryAligned: isCredentialBoundaryClosed(source, java, miniKv),
    rawEndpointBoundaryAligned: isRawEndpointBoundaryClosed(source, java, miniKv),
    resolverBoundaryAligned: isResolverBoundaryClosed(source, java, miniKv),
    connectionBoundaryAligned: isConnectionBoundaryClosed(source, java, miniKv),
    writeBoundaryAligned: isWriteBoundaryClosed(source, java, miniKv),
    autoStartBoundaryAligned: isAutoStartBoundaryClosed(source, java, miniKv),
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    realResolverImplementationStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification: false,
  };

  return completeChecks(
    draft,
    "readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification",
  ).checks;
}

function isSourceReady(source: SourceV270PlanIntake): boolean {
  return source.planIntakeState === "credential-resolver-pre-implementation-plan-intake-ready"
    && source.readyForPlanIntake
    && source.sourceNodeV269Ready
    && source.sourceNodeV269KeepsBlockedDecision
    && source.sourceNodeV269KeepsRealResolverBlocked;
}

function isSourcePlanOnly(source: SourceV270PlanIntake): boolean {
  return source.planIntakeOnly
    && source.readOnlyPlanIntake
    && source.planMode === "plan-intake-only";
}

function isSourceBlocked(source: SourceV270PlanIntake): boolean {
  return !source.realResolverImplementationAllowed
    && !source.connectsManagedAudit
    && !source.externalRequestSent
    && !source.resolverClientInstantiated
    && !source.secretProviderInstantiated;
}

function arePlanCountsAligned(
  source: SourceV270PlanIntake,
  java: JavaV112PlanEcho,
  miniKv: MiniKvV119NonParticipation,
): boolean {
  return java.checkCount === source.checkCount
    && miniKv.checkCount === source.checkCount
    && java.passedCheckCount === source.passedCheckCount
    && miniKv.passedCheckCount === source.passedCheckCount
    && java.sourceCheckCount === source.sourceCheckCount
    && miniKv.sourceCheckCount === source.sourceCheckCount
    && java.boundaryCount === source.boundaryCount
    && miniKv.boundaryCount === source.boundaryCount
    && java.definedBoundaryCount === source.definedBoundaryCount
    && miniKv.definedBoundaryCount === source.definedBoundaryCount
    && java.missingBoundaryCount === source.missingBoundaryCount
    && miniKv.missingBoundaryCount === source.missingBoundaryCount
    && java.productionBlockerCount === source.productionBlockerCount
    && miniKv.productionBlockerCount === source.productionBlockerCount;
}

function isCredentialBoundaryClosed(
  source: SourceV270PlanIntake,
  java: JavaV112PlanEcho,
  miniKv: MiniKvV119NonParticipation,
): boolean {
  return !source.readsManagedAuditCredential
    && !source.storesManagedAuditCredential
    && !source.credentialValueRead
    && !java.credentialValueRead
    && miniKv.credentialValueReadAllowed === false
    && miniKv.credentialValueLoaded === false
    && miniKv.credentialValueStored === false
    && miniKv.credentialValueIncluded === false;
}

function isRawEndpointBoundaryClosed(
  source: SourceV270PlanIntake,
  java: JavaV112PlanEcho,
  miniKv: MiniKvV119NonParticipation,
): boolean {
  return !source.rawEndpointUrlParsed
    && !java.rawEndpointUrlParsed
    && miniKv.rawEndpointUrlParseAllowed === false
    && miniKv.rawEndpointUrlParsed === false
    && miniKv.rawEndpointUrlIncluded === false;
}

function isResolverBoundaryClosed(
  source: SourceV270PlanIntake,
  java: JavaV112PlanEcho,
  miniKv: MiniKvV119NonParticipation,
): boolean {
  return !source.resolverClientInstantiated
    && !source.secretProviderInstantiated
    && !java.resolverClientInstantiated
    && !java.secretProviderInstantiated
    && miniKv.credentialResolverImplemented === false
    && miniKv.credentialResolverInvoked === false
    && miniKv.resolverClientInstantiated === false
    && miniKv.secretProviderInstantiated === false
    && miniKv.secretProviderRuntimeAllowed === false;
}

function isConnectionBoundaryClosed(
  source: SourceV270PlanIntake,
  java: JavaV112PlanEcho,
  miniKv: MiniKvV119NonParticipation,
): boolean {
  return !source.connectsManagedAudit
    && !source.externalRequestSent
    && !java.connectsManagedAudit
    && !java.externalRequestSent
    && miniKv.connectsManagedAudit === false
    && miniKv.externalRequestAllowed === false
    && miniKv.externalRequestSent === false
    && miniKv.readyForManagedAuditSandboxAdapterConnection === false;
}

function isWriteBoundaryClosed(
  source: SourceV270PlanIntake,
  java: JavaV112PlanEcho,
  miniKv: MiniKvV119NonParticipation,
): boolean {
  return isNodeWriteClosed(source)
    && isJavaWriteClosed(java)
    && isMiniKvWriteClosed(miniKv);
}

function isNodeWriteClosed(source: SourceV270PlanIntake): boolean {
  return !source.executionAllowed
    && !source.schemaMigrationExecuted
    && !source.approvalLedgerWritten;
}

function isJavaWriteClosed(java: JavaV112PlanEcho): boolean {
  return !java.approvalLedgerWritten
    && !java.sqlExecuted
    && !java.schemaMigrationExecuted;
}

function isMiniKvWriteClosed(miniKv: MiniKvV119NonParticipation): boolean {
  return miniKv.executionAllowed === false
    && miniKv.storageWriteAllowed === false
    && miniKv.writeCommandsExecuted === false
    && miniKv.adminCommandsExecuted === false
    && miniKv.approvalLedgerWriteAllowed === false
    && miniKv.approvalLedgerWritten === false
    && miniKv.managedAuditWriteExecuted === false
    && miniKv.schemaMigrationAllowed === false
    && miniKv.schemaMigrationExecuted === false
    && miniKv.restoreExecutionAllowed === false
    && miniKv.loadRestoreCompactExecuted === false
    && miniKv.setnxexExecutionAllowed === false
    && miniKv.managedAuditStorageBackend === false
    && miniKv.auditAuthoritative === false
    && miniKv.orderAuthoritative === false;
}

function isAutoStartBoundaryClosed(
  source: SourceV270PlanIntake,
  java: JavaV112PlanEcho,
  miniKv: MiniKvV119NonParticipation,
): boolean {
  return !source.automaticUpstreamStart
    && !java.automaticUpstreamStart
    && miniKv.nodeAutoStartAllowed === false
    && miniKv.javaAutoStartAllowed === false
    && miniKv.miniKvAutoStartAllowed === false
    && miniKv.automaticUpstreamStartAllowed === false
    && miniKv.automaticUpstreamStart === false;
}
