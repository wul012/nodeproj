import type { AppConfig } from "../config.js";
import {
  getHumanApprovalArtifactReviewPostEchoPrerequisite,
} from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import type {
  AbortRollbackSemanticsContract,
  AbortRollbackSemanticsContractIntakeChecks,
  AbortRollbackSemanticsContractNecessityProof,
  AbortRollbackSemanticsPrerequisiteTransition,
  SourceNodeV325NoNetworkSafetyFixturePrerequisiteClosureReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeTypes.js";

export function createAbortRollbackIntakeChecks(
  config: AppConfig,
  source: SourceNodeV325NoNetworkSafetyFixturePrerequisiteClosureReviewReference,
  contract: AbortRollbackSemanticsContract,
  transition: AbortRollbackSemanticsPrerequisiteTransition,
  proof: AbortRollbackSemanticsContractNecessityProof,
): AbortRollbackSemanticsContractIntakeChecks {
  const fieldIds = contract.requiredFields.map((field) => field.id);
  const prohibitedIds = contract.prohibitedFields.map((field) => field.id);
  const targetId = transition.prerequisiteId;
  return {
    ...abortSourceChecks(source, targetId),
    ...abortRequiredFieldChecks(fieldIds),
    ...abortProhibitedFieldChecks(prohibitedIds),
    ...abortTransitionChecks(contract, transition, proof, targetId),
    ...abortBoundaryChecks(config, contract, fieldIds, prohibitedIds),
  };
}

function abortSourceChecks(
  source: SourceNodeV325NoNetworkSafetyFixturePrerequisiteClosureReviewReference,
  targetId: AbortRollbackSemanticsPrerequisiteTransition["prerequisiteId"],
) {
  return {
    sourceNodeV325Ready: source.readyForNoNetworkSafetyFixturePrerequisiteClosureReview,
    sourceNodeV325PointsToAbortRollbackSemantics:
      source.nextConcretePrerequisiteId === targetId
      && source.nextConcretePrerequisiteContractRequired
      && source.nextNodeVersionSuggested === "Node v326",
    sourceNodeV325KeepsRuntimeBlocked:
      source.runtimeShellStillBlocked
      && source.runtimeShellImplemented === false
      && source.runtimeShellInvocationAllowed === false,
    sourceNodeV325KeepsSideEffectsClosed:
      source.executionAllowed === false
      && source.connectsManagedAudit === false
      && source.credentialValueRead === false
      && source.rawEndpointUrlParsed === false
      && source.externalRequestSent === false
      && source.networkSafetyFixtureExecuted === false
      && source.httpRequestSent === false
      && source.tcpConnectionAttempted === false
      && source.networkSocketOpened === false
      && source.schemaMigrationExecuted === false
      && source.approvalLedgerWritten === false
      && source.automaticUpstreamStart === false,
    abortRollbackSemanticsStillMissingInSource:
      source.remainingPrerequisiteIds.includes(targetId)
      && !source.completedPrerequisiteIds.includes(targetId),
    catalogTargetMatchesAbortRollbackSemantics:
      getHumanApprovalArtifactReviewPostEchoPrerequisite(targetId).id === targetId,
  };
}

function abortRequiredFieldChecks(fieldIds: readonly string[]) {
  return {
    contractRequiredFieldsDocumented:
      fieldIds.length === 10
      && fieldIds.includes("manual_abort_marker")
      && fieldIds.includes("rollback_runbook_reference")
      && fieldIds.includes("operator_confirmation_handle")
      && fieldIds.includes("approval_correlation_id")
      && fieldIds.includes("cleanup_evidence_marker")
      && fieldIds.includes("idempotent_noop_failure_policy")
      && fieldIds.includes("rollback_authority_boundary")
      && fieldIds.includes("abort_reason_code")
      && fieldIds.includes("recovery_checkpoint_reference")
      && fieldIds.includes("audit_digest"),
  };
}

function abortProhibitedFieldChecks(prohibitedIds: readonly string[]) {
  return {
    contractProhibitedFieldsDocumented:
      prohibitedIds.includes("credential_value")
      && prohibitedIds.includes("raw_endpoint_url")
      && prohibitedIds.includes("runtime_shell_command")
      && prohibitedIds.includes("shell_script_body")
      && prohibitedIds.includes("secret_provider_config")
      && prohibitedIds.includes("resolver_client_config")
      && prohibitedIds.includes("external_request_payload")
      && prohibitedIds.includes("approval_ledger_mutation")
      && prohibitedIds.includes("schema_migration_sql")
      && prohibitedIds.includes("deployment_action")
      && prohibitedIds.includes("rollback_execution_action")
      && prohibitedIds.includes("upstream_process_start")
      && prohibitedIds.includes("mini_kv_write_command")
      && prohibitedIds.includes("java_sql_execution"),
  };
}

function abortTransitionChecks(
  contract: AbortRollbackSemanticsContract,
  transition: AbortRollbackSemanticsPrerequisiteTransition,
  proof: AbortRollbackSemanticsContractNecessityProof,
  targetId: AbortRollbackSemanticsPrerequisiteTransition["prerequisiteId"],
) {
  return {
    rejectionReasonsDocumented: contract.rejectionReasonCount >= 6,
    noGoBoundariesClosed:
      contract.noGoBoundaryCount >= 11
      && contract.noGoBoundaries.every((boundary) => boundary.allowed === false),
    prerequisiteTransitionScopedToAbortRollbackSemantics:
      transition.prerequisiteId === targetId
      && transition.beforeV326 === "still-missing"
      && transition.afterV326 === "contract-intake-defined"
      && transition.closureRequiresUpstreamEcho
      && transition.completedPrerequisiteCountBeforeV326 === 5
      && transition.remainingPrerequisiteCountBeforeV326 === 1
      && transition.preservesSignedHumanApprovalArtifactClosure
      && transition.preservesCredentialHandleApprovalClosure
      && transition.preservesEndpointHandleAllowlistApprovalClosure
      && transition.preservesNoNetworkSafetyFixtureClosure
      && !transition.closesAbortRollbackSemantics,
    necessityProofDocumented:
      proof.proofComplete && proof.consumer === "Java v150 + mini-kv v142, then Node v327",
  };
}

function abortBoundaryChecks(
  config: AppConfig,
  contract: AbortRollbackSemanticsContract,
  fieldIds: readonly string[],
  prohibitedIds: readonly string[],
) {
  return {
    javaMiniKvEchoRequestExplicitlyParallel:
      contract.upstreamEchoRequests.length === 2
      && contract.upstreamEchoRequests.every((request) =>
        request.canRunInParallel && request.mustRemainReadOnly),
    contractStaysNonSecretAndNonExecuting:
      fieldIds.includes("manual_abort_marker")
      && fieldIds.includes("rollback_runbook_reference")
      && fieldIds.includes("audit_digest")
      && prohibitedIds.includes("credential_value")
      && prohibitedIds.includes("raw_endpoint_url")
      && prohibitedIds.includes("runtime_shell_command")
      && prohibitedIds.includes("rollback_execution_action")
      && prohibitedIds.includes("mini_kv_write_command")
      && prohibitedIds.includes("java_sql_execution"),
    abortRollbackExecutionStillBlocked: contract.abortRollbackExecutionAllowed === false,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    runtimeShellImplementationStillBlocked: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake: false,
  };
}
