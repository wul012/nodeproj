import type { AppConfig } from "../config.js";
import {
  DRY_RUN_RESPONSE_FIELDS,
  FAILURE_CLASS_CODES,
  INHERITED_NO_GO_CONDITIONS,
  OPT_IN_GATE_NAMES,
  REQUIRED_ENV_HANDLE_NAMES,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationConstants.js";
import { arraysEqual } from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationReferences.js";
import type {
  CredentialResolverDisabledPrecheckUpstreamEchoVerificationChecks,
  CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage,
  JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
  SourceNodeV262CredentialResolverDisabledPrecheckReference,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationTypes.js";

export function createChecks(
  config: AppConfig,
  sourceNodeV262: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaV106: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  miniKvV115: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): CredentialResolverDisabledPrecheckUpstreamEchoVerificationChecks {
  return {
    sourceNodeV262Ready: sourceNodeV262.readyForNodeV263DisabledPrecheckUpstreamEchoVerification,
    javaV106EchoReady: javaV106.readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
    miniKvV115NonParticipationReady: miniKvV115.readyForNodeV263Alignment,
    disabledPrecheckAligned:
      sourceNodeV262.precheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
      && javaV106.precheckMode === sourceNodeV262.precheckMode
      && miniKvV115.disabledPrecheckMode === sourceNodeV262.precheckMode
      && miniKvV115.sourcePrecheckMode === sourceNodeV262.precheckMode
      && miniKvV115.sourcePrecheckState === sourceNodeV262.precheckState
      && javaV106.consumedNodeProfile === sourceNodeV262.profileVersion
      && !sourceNodeV262.resolverClientMayBeInstantiated
      && !sourceNodeV262.secretProviderMayBeInstantiated
      && !miniKvV115.resolverClientMayBeInstantiated
      && !miniKvV115.secretProviderMayBeInstantiated,
    requiredEnvHandlesAligned:
      sourceNodeV262.requiredEnvHandleCount === 6
      && javaV106.requiredEnvHandleCount === 6
      && miniKvV115.sourceRequiredEnvHandleCount === 6
      && miniKvV115.requiredEnvHandleCount === 6
      && arraysEqual(sourceNodeV262.requiredEnvHandleNames, [...REQUIRED_ENV_HANDLE_NAMES])
      && arraysEqual(miniKvV115.requiredEnvHandleNames, [...REQUIRED_ENV_HANDLE_NAMES]),
    optInGatesAligned:
      sourceNodeV262.optInGateCount === 2
      && javaV106.optInGateCount === 2
      && miniKvV115.sourceOptInGateCount === 2
      && miniKvV115.optInGateCount === 2
      && arraysEqual(sourceNodeV262.optInGateNames, [...OPT_IN_GATE_NAMES])
      && arraysEqual(miniKvV115.optInGateNames, [...OPT_IN_GATE_NAMES]),
    failureTaxonomyAligned:
      sourceNodeV262.failureClassCount === 7
      && javaV106.failureClassCount === 7
      && miniKvV115.sourceFailureClassCount === 7
      && miniKvV115.failureClassCount === 7
      && arraysEqual(sourceNodeV262.failureClassCodes, [...FAILURE_CLASS_CODES])
      && arraysEqual(miniKvV115.failureTaxonomyCodes, [...FAILURE_CLASS_CODES]),
    dryRunResponseShapeAligned:
      sourceNodeV262.dryRunResponseFieldCount === 12
      && javaV106.dryRunResponseFieldCount === 12
      && miniKvV115.sourceDryRunResponseFieldCount === 12
      && miniKvV115.dryRunResponseFieldCount === 12
      && arraysEqual(sourceNodeV262.dryRunResponseFields, [...DRY_RUN_RESPONSE_FIELDS])
      && arraysEqual(miniKvV115.dryRunResponseFields, [...DRY_RUN_RESPONSE_FIELDS])
      && miniKvV115.disabledPrecheckReadyState === sourceNodeV262.precheckState,
    inheritedNoGoConditionsAligned:
      sourceNodeV262.inheritedNoGoConditionCount === 9
      && javaV106.inheritedNoGoConditionCount === 9
      && miniKvV115.sourceInheritedNoGoConditionCount === 9
      && miniKvV115.inheritedNoGoConditionCount === 9
      && arraysEqual([...sourceNodeV262.inheritedNoGoConditions], [...INHERITED_NO_GO_CONDITIONS])
      && arraysEqual(miniKvV115.inheritedNoGoConditions, [...INHERITED_NO_GO_CONDITIONS]),
    sourceNodeV261Aligned:
      sourceNodeV262.sourceNodeV261Ready
      && miniKvV115.sourceNodeV261Ready
      && sourceNodeV262.sourceVerificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"
      && miniKvV115.sourceNodeV261VerificationMode === sourceNodeV262.sourceVerificationMode
      && miniKvV115.sourceNodeV261Span === sourceNodeV262.sourceSpan
      && sourceNodeV262.sourceBlocksCredentialResolution
      && miniKvV115.sourceNodeV261BlocksCredentialResolution
      && sourceNodeV262.sourceCredentialBoundaryAligned
      && miniKvV115.sourceNodeV261CredentialBoundaryAligned
      && sourceNodeV262.sourceRawEndpointBoundaryAligned
      && miniKvV115.sourceNodeV261RawEndpointBoundaryAligned
      && sourceNodeV262.sourceConnectionBoundaryAligned
      && miniKvV115.sourceNodeV261ConnectionBoundaryAligned
      && sourceNodeV262.sourceWriteBoundaryAligned
      && miniKvV115.sourceNodeV261WriteBoundaryAligned
      && sourceNodeV262.sourceAutoStartBoundaryAligned
      && miniKvV115.sourceNodeV261AutoStartBoundaryAligned,
    credentialBoundaryAligned:
      !sourceNodeV262.credentialResolverExecutionAllowed
      && !sourceNodeV262.credentialValueRead
      && !sourceNodeV262.credentialValueLoaded
      && !sourceNodeV262.credentialValueStored
      && !sourceNodeV262.credentialValueIncluded
      && !sourceNodeV262.credentialValueMayBeLoaded
      && !javaV106.credentialResolverExecutionAllowed
      && !javaV106.credentialValueRead
      && !javaV106.credentialValueLoaded
      && !javaV106.credentialValueStored
      && !javaV106.credentialValueIncluded
      && !javaV106.credentialValueMayBeLoaded
      && !miniKvV115.sourceCredentialResolverExecutionAllowed
      && !miniKvV115.sourceCredentialValueRead
      && !miniKvV115.sourceCredentialValueLoaded
      && !miniKvV115.sourceCredentialValueStored
      && !miniKvV115.sourceCredentialValueIncluded
      && !miniKvV115.credentialValueRequired
      && !miniKvV115.credentialValueReadAllowed
      && !miniKvV115.credentialValueLoaded
      && !miniKvV115.credentialValueStored
      && !miniKvV115.credentialValueIncluded,
    rawEndpointBoundaryAligned:
      !sourceNodeV262.rawEndpointUrlParsed
      && !sourceNodeV262.rawEndpointUrlIncluded
      && !sourceNodeV262.rawEndpointUrlMayBeParsed
      && !javaV106.rawEndpointUrlParsed
      && !javaV106.rawEndpointUrlIncluded
      && !javaV106.rawEndpointUrlMayBeParsed
      && !miniKvV115.sourceRawEndpointUrlParsed
      && !miniKvV115.sourceRawEndpointUrlIncluded
      && !miniKvV115.rawEndpointUrlParsed
      && !miniKvV115.rawEndpointUrlIncluded
      && !miniKvV115.rawEndpointUrlMayBeParsed,
    connectionBoundaryAligned:
      !sourceNodeV262.externalRequestSent
      && !sourceNodeV262.externalRequestMayBeSent
      && !sourceNodeV262.connectsManagedAudit
      && !javaV106.externalRequestSent
      && !javaV106.externalRequestMayBeSent
      && !javaV106.connectsManagedAudit
      && !miniKvV115.sourceConnectsManagedAudit
      && !miniKvV115.sourceExternalRequestSent
      && !miniKvV115.connectionExecutionAllowed
      && !miniKvV115.externalRequestSent
      && !miniKvV115.credentialResolverImplemented
      && !miniKvV115.credentialResolverInvoked
      && !miniKvV115.secretProviderInstantiated
      && !miniKvV115.resolverClientInstantiated,
    writeBoundaryAligned:
      !sourceNodeV262.schemaMigrationExecuted
      && !javaV106.schemaMigrationExecuted
      && !miniKvV115.sourceSchemaMigrationExecuted
      && !miniKvV115.schemaRehearsalExecutionAllowed
      && !miniKvV115.schemaMigrationExecutionAllowed
      && !miniKvV115.storageWriteAllowed
      && !miniKvV115.managedAuditWriteExecuted
      && !miniKvV115.approvalLedgerWriteAllowed
      && !miniKvV115.approvalLedgerWriteExecuted
      && !miniKvV115.sandboxManagedAuditStateWriteAllowed
      && !miniKvV115.restoreExecutionAllowed
      && !miniKvV115.loadRestoreCompactExecuted
      && !miniKvV115.setnxexExecutionAllowed
      && !miniKvV115.managedAuditStorageBackend
      && !miniKvV115.sandboxAuditStorageBackend
      && !miniKvV115.orderAuthoritative,
    autoStartBoundaryAligned:
      !sourceNodeV262.automaticUpstreamStart
      && !javaV106.automaticUpstreamStart
      && !miniKvV115.sourceAutomaticUpstreamStart
      && !miniKvV115.nodeAutoStartAllowed
      && !miniKvV115.javaAutoStartAllowed
      && !miniKvV115.miniKvAutoStartAllowed
      && !miniKvV115.externalAuditServiceAutoStartAllowed,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification: false,
  };
}

export function collectProductionBlockers(
  checks: CredentialResolverDisabledPrecheckUpstreamEchoVerificationChecks,
): CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV262Ready,
      code: "NODE_V262_DISABLED_PRECHECK_NOT_READY",
      source: "node-v262-sandbox-endpoint-credential-resolver-disabled-precheck",
      message: "Node v262 must be ready before v263 can verify upstream disabled precheck echoes.",
    },
    {
      condition: checks.javaV106EchoReady,
      code: "JAVA_V106_DISABLED_PRECHECK_ECHO_NOT_READY",
      source: "java-v106-sandbox-endpoint-credential-resolver-disabled-precheck-echo-marker",
      message: "Java v106 must expose a disabled precheck echo marker for Node v263.",
    },
    {
      condition: checks.miniKvV115NonParticipationReady,
      code: "MINI_KV_V115_DISABLED_PRECHECK_NON_PARTICIPATION_NOT_READY",
      source: "mini-kv-v115-disabled-credential-resolver-precheck-non-participation-receipt",
      message: "mini-kv v115 must prove no resolver, no credential read, no endpoint parse, no writes, and no auto-start.",
    },
    {
      condition:
        checks.disabledPrecheckAligned
        && checks.requiredEnvHandlesAligned
        && checks.optInGatesAligned
        && checks.failureTaxonomyAligned
        && checks.dryRunResponseShapeAligned
        && checks.inheritedNoGoConditionsAligned
        && checks.sourceNodeV261Aligned,
      code: "DISABLED_PRECHECK_ECHO_NOT_ALIGNED",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "Node v262, Java v106, and mini-kv v115 must align on disabled precheck counts, shape, and source Node v261 boundary.",
    },
    {
      condition:
        checks.credentialBoundaryAligned
        && checks.rawEndpointBoundaryAligned
        && checks.connectionBoundaryAligned
        && checks.writeBoundaryAligned
        && checks.autoStartBoundaryAligned,
      code: "DISABLED_PRECHECK_SIDE_EFFECT_BOUNDARY_OPEN",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "Credential, raw endpoint, connection, write, resolver instantiation, and auto-start boundaries must remain closed.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v263 disabled resolver upstream echo verification.",
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

export function collectWarnings(): CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_ONLY",
      severity: "warning",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "v263 verifies read-only upstream evidence only; it does not instantiate a resolver client or secret provider.",
    },
    {
      code: "TEST_ONLY_SHELL_STILL_REQUIRES_PLAN",
      severity: "warning",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "Any future resolver shell must be test-only, explicitly planned, and still forbidden from reading credential values.",
    },
  ];
}

export function collectRecommendations(): CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "WRITE_POST_V263_PLAN",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "After v263, write a new plan before entering any credential resolver shell or fake secret provider contract.",
    },
    {
      code: "KEEP_REAL_RESOLVER_OUT_OF_SCOPE",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "Do not add real credential resolution, raw endpoint parsing, external HTTP, schema migration, or storage writes.",
    },
  ];
}
