import type { AppConfig } from "../config.js";
import {
  FAILURE_CLASS_CODES,
  GUARD_CONDITION_CODES,
  REQUEST_SHAPE_FIELDS,
  RESPONSE_SHAPE_FIELDS,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationConstants.js";
import { arraysEqual } from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationReferences.js";
import type {
  CredentialResolverTestOnlyShellUpstreamEchoVerificationChecks,
  CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage,
  JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  JavaV109RehearsalResponseRecordsSplitOptimizationContext,
  MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
  SourceNodeV264CredentialResolverTestOnlyShellContractReference,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationTypes.js";
import { allBooleanFieldsAre } from "./liveProbeReportUtils.js";

const SOURCE_PROBE_TRUE_FIELDS = [
  "fakeResolverProbeCovered",
  "fakeResolverProbeNoCredentialRead",
  "fakeResolverProbeNoExternalRequest",
  "fakeResolverProbeNoProductionWrite",
] as const;

const MINIKV_PROBE_TRUE_FIELDS = [
  "fakeResolverProbeAcceptedByFakeResolver",
  "fakeResolverProbeNoCredentialRead",
  "fakeResolverProbeNoExternalRequest",
  "fakeResolverProbeNoProductionWrite",
] as const;

const SOURCE_CREDENTIAL_FALSE_FIELDS = [
  "credentialResolverExecutionAllowed",
  "credentialValueRead",
  "credentialValueLoaded",
  "credentialValueStored",
  "credentialValueIncluded",
] as const;

const JAVA_CREDENTIAL_FALSE_FIELDS = [
  "credentialResolverExecutionAllowed",
  "credentialValueRead",
  "credentialValueLoaded",
  "credentialValueStored",
  "credentialValueIncluded",
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
] as const;

const JAVA_ENDPOINT_FALSE_FIELDS = [
  "rawEndpointUrlParsed",
  "rawEndpointUrlIncluded",
] as const;

const MINIKV_ENDPOINT_FALSE_FIELDS = [
  "sourceRawEndpointUrlParsed",
  "sourceRawEndpointUrlIncluded",
  "rawEndpointUrlParsed",
  "rawEndpointUrlIncluded",
] as const;

const SOURCE_CONNECTION_FALSE_FIELDS = [
  "externalRequestSent",
  "connectsManagedAudit",
  "secretProviderInstantiated",
  "resolverClientInstantiated",
] as const;

const JAVA_CONNECTION_FALSE_FIELDS = [
  "externalRequestSent",
  "connectsManagedAudit",
  "secretProviderInstantiated",
  "resolverClientInstantiated",
] as const;

const MINIKV_CONNECTION_FALSE_FIELDS = [
  "sourceConnectsManagedAudit",
  "sourceExternalRequestSent",
  "connectionExecutionAllowed",
  "externalRequestSent",
  "secretProviderInstantiated",
  "resolverClientInstantiated",
  "credentialResolverImplemented",
  "credentialResolverInvoked",
] as const;

const MINIKV_WRITE_FALSE_FIELDS = [
  "sourceSchemaMigrationExecuted",
  "sourceProductionRecordWritten",
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
  "managedAuditStore",
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
  sourceNodeV264: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaV107: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  miniKvV116: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
  javaV109: JavaV109RehearsalResponseRecordsSplitOptimizationContext,
): CredentialResolverTestOnlyShellUpstreamEchoVerificationChecks {
  return {
    sourceNodeV264Ready: sourceNodeV264.readyForNodeV265TestOnlyShellUpstreamEchoVerification,
    javaV107EchoReady: javaV107.readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
    miniKvV116NonParticipationReady: miniKvV116.readyForNodeV265Alignment,
    javaV109OptimizationContextReady: javaV109.alignedWithNodeV265,
    testOnlyShellContractAligned: isShellContractAligned(sourceNodeV264, javaV107, miniKvV116),
    requestShapeAligned: hasAlignedRequestShape(sourceNodeV264, javaV107, miniKvV116),
    responseShapeAligned: hasAlignedResponseShape(sourceNodeV264, javaV107, miniKvV116),
    failureMappingAligned: hasAlignedFailureMapping(sourceNodeV264, javaV107, miniKvV116),
    guardConditionsAligned: hasAlignedGuardConditions(sourceNodeV264, javaV107, miniKvV116),
    fakeResolverProbeAligned: isFakeResolverProbeAligned(sourceNodeV264, javaV107, miniKvV116),
    credentialBoundaryAligned: isCredentialBoundaryClosed(sourceNodeV264, javaV107, miniKvV116),
    rawEndpointBoundaryAligned: isRawEndpointBoundaryClosed(sourceNodeV264, javaV107, miniKvV116),
    connectionBoundaryAligned: isConnectionBoundaryClosed(sourceNodeV264, javaV107, miniKvV116),
    writeBoundaryAligned: isWriteBoundaryClosed(sourceNodeV264, javaV107, miniKvV116),
    autoStartBoundaryAligned: isAutoStartBoundaryClosed(sourceNodeV264, javaV107, miniKvV116),
    miniKvNonParticipationAligned: isMiniKvNonParticipationAligned(miniKvV116),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification:
      false,
  };
}

function isShellContractAligned(
  source: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaEcho: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  receipt: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
): boolean {
  return source.shellMode === javaEcho.shellMode
    && source.shellMode === receipt.sourceShellMode
    && source.shellName === javaEcho.shellName
    && source.shellName === receipt.sourceShellName
    && source.resolverKind === javaEcho.resolverKind
    && source.resolverKind === receipt.sourceResolverKind
    && source.profileVersion === javaEcho.consumedNodeProfile
    && source.profileVersion === receipt.sourceContractProfileVersion
    && source.shellContractState === receipt.sourceContractState
    && source.readyForTestOnlyShellContract
    && javaEcho.fakeResolverOnlyEchoed
    && receipt.sourceFakeResolverOnly;
}

function hasAlignedRequestShape(
  source: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaEcho: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  receipt: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
): boolean {
  return source.requestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
    && javaEcho.requestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
    && receipt.sourceRequestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
    && arraysEqual(source.requestShapeFields, REQUEST_SHAPE_FIELDS)
    && arraysEqual(receipt.requestShapeFields, REQUEST_SHAPE_FIELDS)
    && source.handleOnlyRequest
    && receipt.sourceHandleOnlyRequest
    && receipt.handleOnlyRequest
    && javaEcho.requestShapeEchoed;
}

function hasAlignedResponseShape(
  source: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaEcho: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  receipt: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
): boolean {
  return source.responseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
    && javaEcho.responseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
    && receipt.sourceResponseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
    && arraysEqual(source.responseShapeFields, RESPONSE_SHAPE_FIELDS)
    && arraysEqual(receipt.responseShapeFields, RESPONSE_SHAPE_FIELDS)
    && javaEcho.responseShapeEchoed;
}

function hasAlignedFailureMapping(
  source: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaEcho: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  receipt: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
): boolean {
  return source.failureMappingCount === FAILURE_CLASS_CODES.length
    && javaEcho.failureMappingCount === FAILURE_CLASS_CODES.length
    && receipt.sourceFailureMappingCount === FAILURE_CLASS_CODES.length
    && arraysEqual(source.failureClassCodes, FAILURE_CLASS_CODES)
    && arraysEqual(receipt.failureClassCodes, FAILURE_CLASS_CODES)
    && javaEcho.failureMappingEchoed;
}

function hasAlignedGuardConditions(
  source: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaEcho: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  receipt: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
): boolean {
  return source.guardConditionCount === GUARD_CONDITION_CODES.length
    && javaEcho.guardConditionCount === GUARD_CONDITION_CODES.length
    && receipt.sourceGuardConditionCount === GUARD_CONDITION_CODES.length
    && arraysEqual(source.guardConditionCodes, GUARD_CONDITION_CODES)
    && arraysEqual(receipt.guardConditionCodes, GUARD_CONDITION_CODES)
    && javaEcho.guardConditionsEchoed;
}

function isFakeResolverProbeAligned(
  source: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaEcho: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  receipt: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
): boolean {
  return allBooleanFieldsAre(source, SOURCE_PROBE_TRUE_FIELDS, true)
    && javaEcho.fakeResolverProbeEchoed
    && receipt.fakeResolverProbeRequestId === "managed-audit-v264-test-only-resolver-shell-probe"
    && allBooleanFieldsAre(receipt, MINIKV_PROBE_TRUE_FIELDS, true)
    && receipt.fakeResolverProbeExecuted === false;
}

function isCredentialBoundaryClosed(
  source: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaEcho: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  receipt: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
): boolean {
  return allBooleanFieldsAre(source, SOURCE_CREDENTIAL_FALSE_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, JAVA_CREDENTIAL_FALSE_FIELDS, false)
    && allBooleanFieldsAre(receipt, MINIKV_CREDENTIAL_FALSE_FIELDS, false);
}

function isRawEndpointBoundaryClosed(
  source: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaEcho: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  receipt: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
): boolean {
  return allBooleanFieldsAre(source, SOURCE_ENDPOINT_FALSE_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, JAVA_ENDPOINT_FALSE_FIELDS, false)
    && allBooleanFieldsAre(receipt, MINIKV_ENDPOINT_FALSE_FIELDS, false);
}

function isConnectionBoundaryClosed(
  source: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaEcho: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  receipt: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
): boolean {
  return allBooleanFieldsAre(source, SOURCE_CONNECTION_FALSE_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, JAVA_CONNECTION_FALSE_FIELDS, false)
    && allBooleanFieldsAre(receipt, MINIKV_CONNECTION_FALSE_FIELDS, false);
}

function isWriteBoundaryClosed(
  source: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaEcho: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  receipt: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
): boolean {
  return source.schemaMigrationExecuted === false
    && javaEcho.schemaMigrationExecuted === false
    && javaEcho.productionRecordWritten === false
    && allBooleanFieldsAre(receipt, MINIKV_WRITE_FALSE_FIELDS, false);
}

function isAutoStartBoundaryClosed(
  source: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaEcho: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  receipt: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
): boolean {
  return source.automaticUpstreamStart === false
    && javaEcho.automaticUpstreamStart === false
    && allBooleanFieldsAre(receipt, MINIKV_AUTOSTART_FALSE_FIELDS, false);
}

function isMiniKvNonParticipationAligned(
  receipt: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
): boolean {
  return receipt.readyForNodeV265Alignment
    && receipt.readOnly
    && receipt.executionAllowed === false
    && receipt.testOnlyResolverShellContractOnly
    && receipt.fakeResolverProbeExecuted === false;
}

export function collectProductionBlockers(
  checks: CredentialResolverTestOnlyShellUpstreamEchoVerificationChecks,
): CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV264Ready,
      code: "NODE_V264_TEST_ONLY_SHELL_CONTRACT_NOT_READY",
      source: "node-v264-sandbox-endpoint-credential-resolver-test-only-shell-contract",
      message: "Node v264 must expose a ready test-only resolver shell contract before v265 can verify upstream echoes.",
    },
    {
      condition: checks.javaV107EchoReady,
      code: "JAVA_V107_TEST_ONLY_SHELL_ECHO_NOT_READY",
      source: "java-v107-sandbox-endpoint-credential-resolver-test-only-shell-echo-marker",
      message: "Java v107 must echo the Node v264 fake-only request, response, failure mapping, guard, and probe boundary.",
    },
    {
      condition: checks.miniKvV116NonParticipationReady,
      code: "MINI_KV_V116_TEST_ONLY_SHELL_NON_PARTICIPATION_NOT_READY",
      source: "mini-kv-v116-test-only-resolver-shell-non-participation-receipt",
      message: "mini-kv v116 must prove non-participation for resolver, credential value, raw endpoint, external request, writes, and auto-start.",
    },
    {
      condition:
        checks.testOnlyShellContractAligned
        && checks.requestShapeAligned
        && checks.responseShapeAligned
        && checks.failureMappingAligned
        && checks.guardConditionsAligned
        && checks.fakeResolverProbeAligned,
      code: "TEST_ONLY_SHELL_ECHO_NOT_ALIGNED",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification",
      message: "Node v264, Java v107, and mini-kv v116 must align on shell mode, request, response, failure mapping, guards, and fake probe.",
    },
    {
      condition:
        checks.credentialBoundaryAligned
        && checks.rawEndpointBoundaryAligned
        && checks.connectionBoundaryAligned
        && checks.writeBoundaryAligned
        && checks.autoStartBoundaryAligned,
      code: "TEST_ONLY_SHELL_SIDE_EFFECT_BOUNDARY_OPEN",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification",
      message: "Credential, raw endpoint, connection, write, resolver instantiation, secret provider, and auto-start boundaries must remain closed.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v265 test-only shell upstream echo verification.",
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

export function collectWarnings(): CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_ONLY",
      severity: "warning",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification",
      message: "v265 verifies read-only upstream evidence only; it does not execute the fake resolver shell.",
    },
    {
      code: "JAVA_V109_IS_OPTIMIZATION_CONTEXT",
      severity: "warning",
      source: "java-v109-release-approval-rehearsal-response-records-split",
      message: "Java v109 is consumed as structural cleanup context only; it is not a hard prerequisite for v265 readiness.",
    },
  ];
}

export function collectRecommendations(): CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_FAKE_SHELL_EVIDENCE_NEXT",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification",
      message: "Use Node v266 to verify the v264/v265 archive, fallback, route digest, screenshot, and explanation evidence.",
    },
    {
      code: "KEEP_REAL_RESOLVER_OUT_OF_SCOPE",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification",
      message: "Do not add real credential resolution, raw endpoint parsing, external HTTP, schema migration, or storage writes without a new plan.",
    },
  ];
}
