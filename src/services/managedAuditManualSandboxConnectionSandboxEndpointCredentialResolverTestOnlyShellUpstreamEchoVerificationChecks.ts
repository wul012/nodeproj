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
    testOnlyShellContractAligned:
      sourceNodeV264.shellMode === javaV107.shellMode
      && sourceNodeV264.shellMode === miniKvV116.sourceShellMode
      && sourceNodeV264.shellName === javaV107.shellName
      && sourceNodeV264.shellName === miniKvV116.sourceShellName
      && sourceNodeV264.resolverKind === javaV107.resolverKind
      && sourceNodeV264.resolverKind === miniKvV116.sourceResolverKind
      && sourceNodeV264.profileVersion === javaV107.consumedNodeProfile
      && sourceNodeV264.profileVersion === miniKvV116.sourceContractProfileVersion
      && sourceNodeV264.shellContractState === miniKvV116.sourceContractState
      && sourceNodeV264.readyForTestOnlyShellContract
      && javaV107.fakeResolverOnlyEchoed
      && miniKvV116.sourceFakeResolverOnly,
    requestShapeAligned:
      sourceNodeV264.requestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
      && javaV107.requestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
      && miniKvV116.sourceRequestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
      && arraysEqual(sourceNodeV264.requestShapeFields, REQUEST_SHAPE_FIELDS)
      && arraysEqual(miniKvV116.requestShapeFields, REQUEST_SHAPE_FIELDS)
      && sourceNodeV264.handleOnlyRequest
      && miniKvV116.sourceHandleOnlyRequest
      && miniKvV116.handleOnlyRequest
      && javaV107.requestShapeEchoed,
    responseShapeAligned:
      sourceNodeV264.responseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
      && javaV107.responseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
      && miniKvV116.sourceResponseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
      && arraysEqual(sourceNodeV264.responseShapeFields, RESPONSE_SHAPE_FIELDS)
      && arraysEqual(miniKvV116.responseShapeFields, RESPONSE_SHAPE_FIELDS)
      && javaV107.responseShapeEchoed,
    failureMappingAligned:
      sourceNodeV264.failureMappingCount === FAILURE_CLASS_CODES.length
      && javaV107.failureMappingCount === FAILURE_CLASS_CODES.length
      && miniKvV116.sourceFailureMappingCount === FAILURE_CLASS_CODES.length
      && arraysEqual(sourceNodeV264.failureClassCodes, FAILURE_CLASS_CODES)
      && arraysEqual(miniKvV116.failureClassCodes, FAILURE_CLASS_CODES)
      && javaV107.failureMappingEchoed,
    guardConditionsAligned:
      sourceNodeV264.guardConditionCount === GUARD_CONDITION_CODES.length
      && javaV107.guardConditionCount === GUARD_CONDITION_CODES.length
      && miniKvV116.sourceGuardConditionCount === GUARD_CONDITION_CODES.length
      && arraysEqual(sourceNodeV264.guardConditionCodes, GUARD_CONDITION_CODES)
      && arraysEqual(miniKvV116.guardConditionCodes, GUARD_CONDITION_CODES)
      && javaV107.guardConditionsEchoed,
    fakeResolverProbeAligned:
      sourceNodeV264.fakeResolverProbeCovered
      && sourceNodeV264.fakeResolverProbeNoCredentialRead
      && sourceNodeV264.fakeResolverProbeNoExternalRequest
      && sourceNodeV264.fakeResolverProbeNoProductionWrite
      && javaV107.fakeResolverProbeEchoed
      && miniKvV116.fakeResolverProbeRequestId === "managed-audit-v264-test-only-resolver-shell-probe"
      && miniKvV116.fakeResolverProbeAcceptedByFakeResolver
      && miniKvV116.fakeResolverProbeNoCredentialRead
      && miniKvV116.fakeResolverProbeNoExternalRequest
      && miniKvV116.fakeResolverProbeNoProductionWrite
      && !miniKvV116.fakeResolverProbeExecuted,
    credentialBoundaryAligned:
      !sourceNodeV264.credentialResolverExecutionAllowed
      && !sourceNodeV264.credentialValueRead
      && !sourceNodeV264.credentialValueLoaded
      && !sourceNodeV264.credentialValueStored
      && !sourceNodeV264.credentialValueIncluded
      && !javaV107.credentialResolverExecutionAllowed
      && !javaV107.credentialValueRead
      && !javaV107.credentialValueLoaded
      && !javaV107.credentialValueStored
      && !javaV107.credentialValueIncluded
      && !miniKvV116.sourceCredentialResolverExecutionAllowed
      && !miniKvV116.sourceCredentialValueRead
      && !miniKvV116.sourceCredentialValueLoaded
      && !miniKvV116.sourceCredentialValueStored
      && !miniKvV116.sourceCredentialValueIncluded
      && !miniKvV116.credentialValueRequired
      && !miniKvV116.credentialValueReadAllowed
      && !miniKvV116.credentialValueLoaded
      && !miniKvV116.credentialValueStored
      && !miniKvV116.credentialValueIncluded,
    rawEndpointBoundaryAligned:
      !sourceNodeV264.rawEndpointUrlParsed
      && !sourceNodeV264.rawEndpointUrlIncluded
      && !javaV107.rawEndpointUrlParsed
      && !javaV107.rawEndpointUrlIncluded
      && !miniKvV116.sourceRawEndpointUrlParsed
      && !miniKvV116.sourceRawEndpointUrlIncluded
      && !miniKvV116.rawEndpointUrlParsed
      && !miniKvV116.rawEndpointUrlIncluded,
    connectionBoundaryAligned:
      !sourceNodeV264.externalRequestSent
      && !sourceNodeV264.connectsManagedAudit
      && !sourceNodeV264.secretProviderInstantiated
      && !sourceNodeV264.resolverClientInstantiated
      && !javaV107.externalRequestSent
      && !javaV107.connectsManagedAudit
      && !javaV107.secretProviderInstantiated
      && !javaV107.resolverClientInstantiated
      && !miniKvV116.sourceConnectsManagedAudit
      && !miniKvV116.sourceExternalRequestSent
      && !miniKvV116.connectionExecutionAllowed
      && !miniKvV116.externalRequestSent
      && !miniKvV116.secretProviderInstantiated
      && !miniKvV116.resolverClientInstantiated
      && !miniKvV116.credentialResolverImplemented
      && !miniKvV116.credentialResolverInvoked,
    writeBoundaryAligned:
      !sourceNodeV264.schemaMigrationExecuted
      && !javaV107.schemaMigrationExecuted
      && !javaV107.productionRecordWritten
      && !miniKvV116.sourceSchemaMigrationExecuted
      && !miniKvV116.sourceProductionRecordWritten
      && !miniKvV116.schemaRehearsalExecutionAllowed
      && !miniKvV116.schemaMigrationExecutionAllowed
      && !miniKvV116.storageWriteAllowed
      && !miniKvV116.managedAuditWriteExecuted
      && !miniKvV116.approvalLedgerWriteAllowed
      && !miniKvV116.approvalLedgerWriteExecuted
      && !miniKvV116.sandboxManagedAuditStateWriteAllowed
      && !miniKvV116.restoreExecutionAllowed
      && !miniKvV116.loadRestoreCompactExecuted
      && !miniKvV116.setnxexExecutionAllowed
      && !miniKvV116.managedAuditStore
      && !miniKvV116.managedAuditStorageBackend
      && !miniKvV116.sandboxAuditStorageBackend
      && !miniKvV116.orderAuthoritative,
    autoStartBoundaryAligned:
      !sourceNodeV264.automaticUpstreamStart
      && !javaV107.automaticUpstreamStart
      && !miniKvV116.sourceAutomaticUpstreamStart
      && !miniKvV116.nodeAutoStartAllowed
      && !miniKvV116.javaAutoStartAllowed
      && !miniKvV116.miniKvAutoStartAllowed
      && !miniKvV116.externalAuditServiceAutoStartAllowed,
    miniKvNonParticipationAligned:
      miniKvV116.readyForNodeV265Alignment
      && miniKvV116.readOnly
      && !miniKvV116.executionAllowed
      && miniKvV116.testOnlyResolverShellContractOnly
      && !miniKvV116.fakeResolverProbeExecuted,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification:
      false,
  };
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
