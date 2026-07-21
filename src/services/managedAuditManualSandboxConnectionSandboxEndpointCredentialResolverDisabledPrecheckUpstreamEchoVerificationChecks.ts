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
import { allBooleanFieldsAre } from "./liveProbeReportUtils.js";

const SOURCE_PRECHECK_FALSE_FIELDS = [
  "resolverClientMayBeInstantiated",
  "secretProviderMayBeInstantiated",
] as const;

const MINIKV_PRECHECK_FALSE_FIELDS = [
  "resolverClientMayBeInstantiated",
  "secretProviderMayBeInstantiated",
] as const;

const SOURCE_V261_TRUE_FIELDS = [
  "sourceNodeV261Ready",
  "sourceBlocksCredentialResolution",
  "sourceCredentialBoundaryAligned",
  "sourceRawEndpointBoundaryAligned",
  "sourceConnectionBoundaryAligned",
  "sourceWriteBoundaryAligned",
  "sourceAutoStartBoundaryAligned",
] as const;

const MINIKV_V261_TRUE_FIELDS = [
  "sourceNodeV261Ready",
  "sourceNodeV261BlocksCredentialResolution",
  "sourceNodeV261CredentialBoundaryAligned",
  "sourceNodeV261RawEndpointBoundaryAligned",
  "sourceNodeV261ConnectionBoundaryAligned",
  "sourceNodeV261WriteBoundaryAligned",
  "sourceNodeV261AutoStartBoundaryAligned",
] as const;

const SOURCE_CREDENTIAL_FALSE_FIELDS = [
  "credentialResolverExecutionAllowed",
  "credentialValueRead",
  "credentialValueLoaded",
  "credentialValueStored",
  "credentialValueIncluded",
  "credentialValueMayBeLoaded",
] as const;

const JAVA_CREDENTIAL_FALSE_FIELDS = [
  "credentialResolverExecutionAllowed",
  "credentialValueRead",
  "credentialValueLoaded",
  "credentialValueStored",
  "credentialValueIncluded",
  "credentialValueMayBeLoaded",
] as const;

const MINIKV_CREDENTIAL_FALSE_FIELDS = [
  "sourceCredentialResolverExecutionAllowed",
  "sourceCredentialValueRead",
  "sourceCredentialValueLoaded",
  "sourceCredentialValueStored",
  "sourceCredentialValueIncluded",
  "credentialValueRequired",
  "credentialValueReadAllowed",
  "credentialValueLoaded",
  "credentialValueStored",
  "credentialValueIncluded",
] as const;

const SOURCE_ENDPOINT_FALSE_FIELDS = [
  "rawEndpointUrlParsed",
  "rawEndpointUrlIncluded",
  "rawEndpointUrlMayBeParsed",
] as const;

const JAVA_ENDPOINT_FALSE_FIELDS = [
  "rawEndpointUrlParsed",
  "rawEndpointUrlIncluded",
  "rawEndpointUrlMayBeParsed",
] as const;

const MINIKV_ENDPOINT_FALSE_FIELDS = [
  "sourceRawEndpointUrlParsed",
  "sourceRawEndpointUrlIncluded",
  "rawEndpointUrlParsed",
  "rawEndpointUrlIncluded",
  "rawEndpointUrlMayBeParsed",
] as const;

const SOURCE_CONNECTION_FALSE_FIELDS = [
  "externalRequestSent",
  "externalRequestMayBeSent",
  "connectsManagedAudit",
] as const;

const JAVA_CONNECTION_FALSE_FIELDS = [
  "externalRequestSent",
  "externalRequestMayBeSent",
  "connectsManagedAudit",
] as const;

const MINIKV_CONNECTION_FALSE_FIELDS = [
  "sourceConnectsManagedAudit",
  "sourceExternalRequestSent",
  "connectionExecutionAllowed",
  "externalRequestSent",
  "credentialResolverImplemented",
  "credentialResolverInvoked",
  "secretProviderInstantiated",
  "resolverClientInstantiated",
] as const;

const MINIKV_WRITE_FALSE_FIELDS = [
  "sourceSchemaMigrationExecuted",
  "schemaRehearsalExecutionAllowed",
  "schemaMigrationExecutionAllowed",
  "storageWriteAllowed",
  "managedAuditWriteExecuted",
  "approvalLedgerWriteAllowed",
  "approvalLedgerWriteExecuted",
  "sandboxManagedAuditStateWriteAllowed",
  "restoreExecutionAllowed",
  "loadRestoreCompactExecuted",
  "setnxexExecutionAllowed",
  "managedAuditStorageBackend",
  "sandboxAuditStorageBackend",
  "orderAuthoritative",
] as const;

const MINIKV_AUTOSTART_FALSE_FIELDS = [
  "sourceAutomaticUpstreamStart",
  "nodeAutoStartAllowed",
  "javaAutoStartAllowed",
  "miniKvAutoStartAllowed",
  "externalAuditServiceAutoStartAllowed",
] as const;

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
    disabledPrecheckAligned: isDisabledPrecheckAligned(sourceNodeV262, javaV106, miniKvV115),
    requiredEnvHandlesAligned: hasAlignedRequiredEnvHandles(sourceNodeV262, javaV106, miniKvV115),
    optInGatesAligned: hasAlignedOptInGates(sourceNodeV262, javaV106, miniKvV115),
    failureTaxonomyAligned: hasAlignedFailureTaxonomy(sourceNodeV262, javaV106, miniKvV115),
    dryRunResponseShapeAligned: hasAlignedDryRunShape(sourceNodeV262, javaV106, miniKvV115),
    inheritedNoGoConditionsAligned: hasAlignedNoGoConditions(sourceNodeV262, javaV106, miniKvV115),
    sourceNodeV261Aligned: isSourceV261Aligned(sourceNodeV262, miniKvV115),
    credentialBoundaryAligned: isCredentialBoundaryClosed(sourceNodeV262, javaV106, miniKvV115),
    rawEndpointBoundaryAligned: isRawEndpointBoundaryClosed(sourceNodeV262, javaV106, miniKvV115),
    connectionBoundaryAligned: isConnectionBoundaryClosed(sourceNodeV262, javaV106, miniKvV115),
    writeBoundaryAligned: isWriteBoundaryClosed(sourceNodeV262, javaV106, miniKvV115),
    autoStartBoundaryAligned: isAutoStartBoundaryClosed(sourceNodeV262, javaV106, miniKvV115),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification: false,
  };
}

function isDisabledPrecheckAligned(
  source: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaEcho: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  receipt: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): boolean {
  return source.precheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
    && javaEcho.precheckMode === source.precheckMode
    && receipt.disabledPrecheckMode === source.precheckMode
    && receipt.sourcePrecheckMode === source.precheckMode
    && receipt.sourcePrecheckState === source.precheckState
    && javaEcho.consumedNodeProfile === source.profileVersion
    && allBooleanFieldsAre(source, SOURCE_PRECHECK_FALSE_FIELDS, false)
    && allBooleanFieldsAre(receipt, MINIKV_PRECHECK_FALSE_FIELDS, false);
}

function hasAlignedRequiredEnvHandles(
  source: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaEcho: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  receipt: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): boolean {
  return source.requiredEnvHandleCount === REQUIRED_ENV_HANDLE_NAMES.length
    && javaEcho.requiredEnvHandleCount === REQUIRED_ENV_HANDLE_NAMES.length
    && receipt.sourceRequiredEnvHandleCount === REQUIRED_ENV_HANDLE_NAMES.length
    && receipt.requiredEnvHandleCount === REQUIRED_ENV_HANDLE_NAMES.length
    && arraysEqual(source.requiredEnvHandleNames, [...REQUIRED_ENV_HANDLE_NAMES])
    && arraysEqual(receipt.requiredEnvHandleNames, [...REQUIRED_ENV_HANDLE_NAMES]);
}

function hasAlignedOptInGates(
  source: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaEcho: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  receipt: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): boolean {
  return source.optInGateCount === OPT_IN_GATE_NAMES.length
    && javaEcho.optInGateCount === OPT_IN_GATE_NAMES.length
    && receipt.sourceOptInGateCount === OPT_IN_GATE_NAMES.length
    && receipt.optInGateCount === OPT_IN_GATE_NAMES.length
    && arraysEqual(source.optInGateNames, [...OPT_IN_GATE_NAMES])
    && arraysEqual(receipt.optInGateNames, [...OPT_IN_GATE_NAMES]);
}

function hasAlignedFailureTaxonomy(
  source: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaEcho: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  receipt: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): boolean {
  return source.failureClassCount === FAILURE_CLASS_CODES.length
    && javaEcho.failureClassCount === FAILURE_CLASS_CODES.length
    && receipt.sourceFailureClassCount === FAILURE_CLASS_CODES.length
    && receipt.failureClassCount === FAILURE_CLASS_CODES.length
    && arraysEqual(source.failureClassCodes, [...FAILURE_CLASS_CODES])
    && arraysEqual(receipt.failureTaxonomyCodes, [...FAILURE_CLASS_CODES]);
}

function hasAlignedDryRunShape(
  source: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaEcho: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  receipt: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): boolean {
  return source.dryRunResponseFieldCount === DRY_RUN_RESPONSE_FIELDS.length
    && javaEcho.dryRunResponseFieldCount === DRY_RUN_RESPONSE_FIELDS.length
    && receipt.sourceDryRunResponseFieldCount === DRY_RUN_RESPONSE_FIELDS.length
    && receipt.dryRunResponseFieldCount === DRY_RUN_RESPONSE_FIELDS.length
    && arraysEqual(source.dryRunResponseFields, [...DRY_RUN_RESPONSE_FIELDS])
    && arraysEqual(receipt.dryRunResponseFields, [...DRY_RUN_RESPONSE_FIELDS])
    && receipt.disabledPrecheckReadyState === source.precheckState;
}

function hasAlignedNoGoConditions(
  source: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaEcho: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  receipt: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): boolean {
  return source.inheritedNoGoConditionCount === INHERITED_NO_GO_CONDITIONS.length
    && javaEcho.inheritedNoGoConditionCount === INHERITED_NO_GO_CONDITIONS.length
    && receipt.sourceInheritedNoGoConditionCount === INHERITED_NO_GO_CONDITIONS.length
    && receipt.inheritedNoGoConditionCount === INHERITED_NO_GO_CONDITIONS.length
    && arraysEqual([...source.inheritedNoGoConditions], [...INHERITED_NO_GO_CONDITIONS])
    && arraysEqual(receipt.inheritedNoGoConditions, [...INHERITED_NO_GO_CONDITIONS]);
}

function isSourceV261Aligned(
  source: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  receipt: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): boolean {
  return source.sourceVerificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"
    && receipt.sourceNodeV261VerificationMode === source.sourceVerificationMode
    && receipt.sourceNodeV261Span === source.sourceSpan
    && allBooleanFieldsAre(source, SOURCE_V261_TRUE_FIELDS, true)
    && allBooleanFieldsAre(receipt, MINIKV_V261_TRUE_FIELDS, true);
}

function isCredentialBoundaryClosed(
  source: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaEcho: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  receipt: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): boolean {
  return allBooleanFieldsAre(source, SOURCE_CREDENTIAL_FALSE_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, JAVA_CREDENTIAL_FALSE_FIELDS, false)
    && allBooleanFieldsAre(receipt, MINIKV_CREDENTIAL_FALSE_FIELDS, false);
}

function isRawEndpointBoundaryClosed(
  source: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaEcho: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  receipt: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): boolean {
  return allBooleanFieldsAre(source, SOURCE_ENDPOINT_FALSE_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, JAVA_ENDPOINT_FALSE_FIELDS, false)
    && allBooleanFieldsAre(receipt, MINIKV_ENDPOINT_FALSE_FIELDS, false);
}

function isConnectionBoundaryClosed(
  source: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaEcho: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  receipt: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): boolean {
  return allBooleanFieldsAre(source, SOURCE_CONNECTION_FALSE_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, JAVA_CONNECTION_FALSE_FIELDS, false)
    && allBooleanFieldsAre(receipt, MINIKV_CONNECTION_FALSE_FIELDS, false);
}

function isWriteBoundaryClosed(
  source: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaEcho: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  receipt: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): boolean {
  return source.schemaMigrationExecuted === false
    && javaEcho.schemaMigrationExecuted === false
    && allBooleanFieldsAre(receipt, MINIKV_WRITE_FALSE_FIELDS, false);
}

function isAutoStartBoundaryClosed(
  source: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaEcho: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  receipt: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): boolean {
  return source.automaticUpstreamStart === false
    && javaEcho.automaticUpstreamStart === false
    && allBooleanFieldsAre(receipt, MINIKV_AUTOSTART_FALSE_FIELDS, false);
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
