import type { AppConfig } from "../config.js";
import {
  EXPLICIT_NO_GO_CONDITION_CODES,
  REQUIRED_DECISION_FIELD_IDS,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationConstants.js";
import { arraysEqual } from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationReferences.js";
import type {
  CredentialResolverUpstreamEchoVerificationChecks,
  CredentialResolverUpstreamEchoVerificationMessage,
  JavaV105CredentialResolverDecisionEchoMarkerReference,
  MiniKvV114CredentialResolverNonParticipationReference,
  SourceNodeV260CredentialResolverDecisionRecordReference,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationTypes.js";

export function createChecks(
  config: AppConfig,
  sourceNodeV260: SourceNodeV260CredentialResolverDecisionRecordReference,
  javaV105: JavaV105CredentialResolverDecisionEchoMarkerReference,
  miniKvV114: MiniKvV114CredentialResolverNonParticipationReference,
): CredentialResolverUpstreamEchoVerificationChecks {
  return {
    sourceNodeV260Ready: sourceNodeV260.readyForNodeV261CredentialResolverUpstreamEchoVerification,
    javaV105EchoReady: javaV105.readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification,
    miniKvV114NonParticipationReady: miniKvV114.readyForNodeV261Alignment,
    decisionRecordAligned:
      sourceNodeV260.recordMode === "sandbox-endpoint-credential-resolver-decision-record-only"
      && miniKvV114.sourceRecordMode === sourceNodeV260.recordMode
      && miniKvV114.sourceDecisionScope === sourceNodeV260.decisionScope
      && miniKvV114.sourceDecisionStatus === sourceNodeV260.decisionStatus
      && javaV105.consumedNodeProfile === sourceNodeV260.profileVersion,
    requiredDecisionFieldsAligned:
      arraysEqual(sourceNodeV260.requiredDecisionFieldIds, [...REQUIRED_DECISION_FIELD_IDS])
      && sourceNodeV260.requiredDecisionFieldCount === 8
      && javaV105.requiredDecisionFieldCount === 8
      && miniKvV114.requiredDecisionFieldCount === 8
      && arraysEqual(miniKvV114.requiredDecisionFieldIds, [...REQUIRED_DECISION_FIELD_IDS]),
    explicitNoGoConditionsAligned:
      arraysEqual(sourceNodeV260.explicitNoGoConditionCodes, [...EXPLICIT_NO_GO_CONDITION_CODES])
      && sourceNodeV260.explicitNoGoConditionCount === 9
      && javaV105.explicitNoGoConditionCount === 9
      && miniKvV114.explicitNoGoConditionCount === 9
      && arraysEqual(miniKvV114.explicitNoGoConditionCodes, [...EXPLICIT_NO_GO_CONDITION_CODES]),
    resolverPolicyAligned:
      sourceNodeV260.resolverPolicyHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE"
      && javaV105.resolverPolicyHandle === sourceNodeV260.resolverPolicyHandle
      && miniKvV114.resolverPolicyHandle === sourceNodeV260.resolverPolicyHandle
      && sourceNodeV260.resolverMode === "policy-record-only-no-value-read"
      && javaV105.resolverMode === sourceNodeV260.resolverMode
      && miniKvV114.resolverMode === sourceNodeV260.resolverMode
      && sourceNodeV260.resolverCandidateImplementation === "not-implemented"
      && javaV105.resolverCandidateImplementation === sourceNodeV260.resolverCandidateImplementation
      && miniKvV114.resolverCandidateImplementation === sourceNodeV260.resolverCandidateImplementation,
    approvalMarkerAligned:
      sourceNodeV260.approvalMarker === "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER"
      && javaV105.approvalMarker === sourceNodeV260.approvalMarker
      && miniKvV114.approvalMarker === sourceNodeV260.approvalMarker,
    operatorIdentityAligned:
      sourceNodeV260.operatorIdentityRequired
      && miniKvV114.operatorIdentityRequired
      && sourceNodeV260.requiredDecisionFieldIds.includes("operator-identity")
      && miniKvV114.requiredDecisionFieldIds.includes("operator-identity"),
    approvalCorrelationAligned:
      sourceNodeV260.approvalCorrelationRequired
      && miniKvV114.approvalCorrelationRequired
      && sourceNodeV260.requiredDecisionFieldIds.includes("approval-correlation")
      && miniKvV114.requiredDecisionFieldIds.includes("approval-correlation"),
    redactionAndFallbackAligned:
      sourceNodeV260.requiredDecisionFieldIds.includes("redaction-policy")
      && sourceNodeV260.requiredDecisionFieldIds.includes("fallback-rotation-plan")
      && miniKvV114.requiredDecisionFieldIds.includes("redaction-policy")
      && miniKvV114.requiredDecisionFieldIds.includes("fallback-rotation-plan"),
    credentialBoundaryAligned:
      !sourceNodeV260.credentialValueMayBeRead
      && !sourceNodeV260.credentialValueMayBeLoaded
      && !sourceNodeV260.credentialValueMayBeStored
      && !javaV105.credentialValueMayBeRead
      && !javaV105.credentialValueRead
      && !miniKvV114.sourceCredentialValueRead
      && !miniKvV114.sourceCredentialValueLoaded
      && !miniKvV114.sourceCredentialValueIncluded
      && !miniKvV114.credentialValueRequired
      && !miniKvV114.credentialValueReadAllowed
      && !miniKvV114.credentialValueLoaded
      && !miniKvV114.credentialValueStored
      && !miniKvV114.credentialValueIncluded,
    rawEndpointBoundaryAligned:
      !sourceNodeV260.rawEndpointUrlMayBeParsed
      && !javaV105.rawEndpointUrlMayBeParsed
      && !javaV105.rawEndpointUrlParsed
      && !miniKvV114.sourceRawEndpointUrlParsed
      && !miniKvV114.sourceRawEndpointUrlIncluded
      && !miniKvV114.rawEndpointUrlParsed
      && !miniKvV114.rawEndpointUrlIncluded,
    connectionBoundaryAligned:
      !sourceNodeV260.managedAuditConnectionMayOpen
      && !sourceNodeV260.externalRequestMayBeSent
      && !javaV105.connectsManagedAudit
      && !javaV105.externalRequestMayBeSent
      && !javaV105.externalRequestSent
      && !miniKvV114.sourceConnectsManagedAudit
      && !miniKvV114.sourceExternalRequestSent
      && !miniKvV114.connectionExecutionAllowed
      && !miniKvV114.externalRequestSent
      && !miniKvV114.credentialResolverImplemented
      && !miniKvV114.credentialResolverInvoked
      && !miniKvV114.secretProviderInstantiated,
    writeBoundaryAligned:
      !sourceNodeV260.schemaMigrationMayExecute
      && !sourceNodeV260.approvalLedgerMayBeWritten
      && !javaV105.schemaMigrationMayExecute
      && !javaV105.approvalLedgerMayBeWritten
      && !miniKvV114.sourceSchemaMigrationExecuted
      && !miniKvV114.schemaRehearsalExecutionAllowed
      && !miniKvV114.schemaMigrationExecutionAllowed
      && !miniKvV114.storageWriteAllowed
      && !miniKvV114.managedAuditWriteExecuted
      && !miniKvV114.approvalLedgerWriteAllowed
      && !miniKvV114.approvalLedgerWriteExecuted
      && !miniKvV114.sandboxManagedAuditStateWriteAllowed
      && !miniKvV114.restoreExecutionAllowed
      && !miniKvV114.loadRestoreCompactExecuted
      && !miniKvV114.setnxexExecutionAllowed
      && !miniKvV114.managedAuditStorageBackend
      && !miniKvV114.sandboxAuditStorageBackend
      && !miniKvV114.orderAuthoritative,
    autoStartBoundaryAligned:
      !sourceNodeV260.nodeMayStartJavaOrMiniKv
      && !javaV105.javaStarted
      && !javaV105.miniKvStarted
      && !miniKvV114.sourceAutomaticUpstreamStart
      && !miniKvV114.nodeAutoStartAllowed
      && !miniKvV114.javaAutoStartAllowed
      && !miniKvV114.miniKvAutoStartAllowed
      && !miniKvV114.externalAuditServiceAutoStartAllowed,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification: false,
  };
}

export function collectProductionBlockers(
  checks: CredentialResolverUpstreamEchoVerificationChecks,
): CredentialResolverUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV260Ready,
      code: "NODE_V260_DECISION_RECORD_NOT_READY",
      source: "node-v260-sandbox-endpoint-credential-resolver-decision-record",
      message: "Node v260 must be ready and keep the credential resolver policy-only before v261.",
    },
    {
      condition: checks.javaV105EchoReady,
      code: "JAVA_V105_CREDENTIAL_RESOLVER_ECHO_NOT_READY",
      source: "java-v105-sandbox-endpoint-credential-resolver-decision-echo-marker",
      message: "Java v105 must expose the credential resolver decision echo marker before Node v261.",
    },
    {
      condition: checks.miniKvV114NonParticipationReady,
      code: "MINI_KV_V114_CREDENTIAL_RESOLVER_NON_PARTICIPATION_NOT_READY",
      source: "mini-kv-v114-credential-resolver-non-participation-receipt",
      message: "mini-kv v114 must prove no credential resolver, no secret provider, no storage backend, no writes, and no auto-start.",
    },
    {
      condition:
        checks.decisionRecordAligned
        && checks.requiredDecisionFieldsAligned
        && checks.explicitNoGoConditionsAligned
        && checks.resolverPolicyAligned
        && checks.approvalMarkerAligned
        && checks.operatorIdentityAligned
        && checks.approvalCorrelationAligned
        && checks.redactionAndFallbackAligned,
      code: "CREDENTIAL_RESOLVER_DECISION_ECHO_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "Node v260, Java v105, and mini-kv v114 must align on resolver policy, approval marker, operator/correlation, decision fields, and no-go conditions.",
    },
    {
      condition:
        checks.credentialBoundaryAligned
        && checks.rawEndpointBoundaryAligned
        && checks.connectionBoundaryAligned
        && checks.writeBoundaryAligned
        && checks.autoStartBoundaryAligned,
      code: "CREDENTIAL_RESOLVER_SIDE_EFFECT_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "Credential, raw endpoint, connection, write, resolver invocation, storage backend, and auto-start boundaries must remain closed.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v261 credential resolver upstream echo verification.",
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

export function collectWarnings(): CredentialResolverUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "v261 verifies read-only upstream evidence only; it does not implement or invoke a credential resolver.",
    },
    {
      code: "DISABLED_PRECHECK_STILL_NEXT",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "The next Node step is a disabled resolver precheck, not a real secret provider or external endpoint request.",
    },
  ];
}

export function collectRecommendations(): CredentialResolverUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "WRITE_V262_DISABLED_PRECHECK_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "Use v262 to define disabled resolver env handles, opt-in gate, failure taxonomy, and dry-run response shape.",
    },
    {
      code: "KEEP_CREDENTIAL_RESOLUTION_CLOSED",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "Do not read credential values, parse raw endpoint URLs, instantiate secret providers, or open managed audit connections.",
    },
  ];
}
