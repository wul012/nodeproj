import type { AppConfig } from "../../config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake,
} from "../managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake.js";
import type { SourceV270PlanIntake } from "./types.js";

export function createSourceNode(config: AppConfig): SourceV270PlanIntake {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake({ config });

  return {
    sourceVersion: "Node v270",
    profileVersion: source.profileVersion,
    planIntakeState: source.planIntakeState,
    readyForPlanIntake: source.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake,
    planIntakeOnly: source.planIntakeOnly,
    readOnlyPlanIntake: source.readOnlyPlanIntake,
    readyForCredentialResolverPreImplementationPlan: source.readyForCredentialResolverPreImplementationPlan,
    readyForManagedAuditSandboxAdapterConnection: source.readyForManagedAuditSandboxAdapterConnection,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    storesManagedAuditCredential: source.storesManagedAuditCredential,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
    sourceNodeV269Ready: source.checks.sourceNodeV269Ready,
    sourceNodeV269KeepsBlockedDecision: source.checks.sourceNodeV269KeepsBlockedDecision,
    sourceNodeV269KeepsRealResolverBlocked: source.checks.sourceNodeV269KeepsRealResolverBlocked,
    planVersion: source.preImplementationPlan.planVersion,
    planMode: source.preImplementationPlan.planMode,
    planDigest: source.preImplementationPlan.planDigest,
    intakeDigest: source.planIntake.intakeDigest,
    boundaryCount: source.preImplementationPlan.boundaryCount,
    definedBoundaryCount: source.preImplementationPlan.definedBoundaryCount,
    missingBoundaryCount: source.planIntake.missingBoundaryCount,
    boundaryCodes: source.preImplementationPlan.boundaries.map((boundary) => boundary.code),
    requirementCodes: source.preImplementationPlan.boundaries.map((boundary) => boundary.requirementFromV268),
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    sourceCheckCount: source.summary.sourceCheckCount,
    sourcePassedCheckCount: source.summary.sourcePassedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
  };
}
