import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationTypes.js";
import type {
  CredentialResolverTestOnlyShellContract,
  CredentialResolverTestOnlyShellContractChecks,
  CredentialResolverTestOnlyShellContractMessage,
  CredentialResolverTestOnlyShellFailureMapping,
  CredentialResolverTestOnlyShellGuardCondition,
  CredentialResolverTestOnlyShellProbe,
  CredentialResolverTestOnlyShellRequestShape,
  CredentialResolverTestOnlyShellResponseShape,
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile,
  SourceNodeV263DisabledResolverPrecheckEchoReference,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractTypes.js";
export {
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractMarkdown,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract";
const NODE_V263_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans/v263-post-disabled-resolver-echo-roadmap.md";

const REQUEST_SHAPE_FIELDS = [
  "requestId",
  "operation",
  "credentialHandle",
  "endpointHandle",
  "resolverPolicyHandle",
  "approvalMarker",
  "approvalCorrelationId",
  "dryRun",
  "fakeResolverOnly",
] as const;

const RESPONSE_SHAPE_FIELDS = [
  "requestId",
  "status",
  "code",
  "fakeResolverOnly",
  "resolverClientInstantiated",
  "secretProviderInstantiated",
  "credentialValueRead",
  "credentialValueLoaded",
  "rawEndpointUrlParsed",
  "externalRequestSent",
  "connectsManagedAudit",
  "schemaMigrationExecuted",
  "productionRecordWritten",
] as const;

export function loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile {
  const sourceNodeV263 = createSourceNodeV263(
    loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification({
      config: input.config,
    }),
  );
  const resolverShellContract = createResolverShellContract(sourceNodeV263);
  const checks = createChecks(input.config, sourceNodeV263, resolverShellContract);
  checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract")
      .every(([, value]) => value);
  const shellContractState = checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract
    ? "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection sandbox endpoint credential resolver test-only shell contract",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    shellContractState,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract:
      checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract,
    testOnlyShell: true,
    readOnlyContract: true,
    fakeResolverOnly: true,
    handleOnlyRequest: true,
    credentialResolverExecutionAllowed: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    credentialValueLoaded: false,
    credentialValueStored: false,
    credentialValueIncluded: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV263,
    resolverShellContract,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      requestShapeFieldCount: resolverShellContract.requestShapeFieldCount,
      responseShapeFieldCount: resolverShellContract.responseShapeFieldCount,
      failureMappingCount: resolverShellContract.failureMappingCount,
      guardConditionCount: resolverShellContract.guardConditionCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxEndpointCredentialResolverTestOnlyShellContractJson: ROUTE_PATH,
      sandboxEndpointCredentialResolverTestOnlyShellContractMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV263Json: NODE_V263_ROUTE,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Ask Java v107 and mini-kv v116 to echo this test-only resolver shell before Node v265 verification.",
      "Keep resolver input handle-only; do not accept credential values or raw endpoint URLs.",
      "Do not promote this fake resolver shell into a real secret provider or external endpoint client without a new plan.",
    ],
  };
}

function createSourceNodeV263(
  source: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationProfile,
): SourceNodeV263DisabledResolverPrecheckEchoReference {
  const reference = {
    sourceVersion: "Node v263" as const,
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForDisabledPrecheckUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    verificationMode: source.echoVerification.verificationMode,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV262Ready: source.checks.sourceNodeV262Ready,
    javaV106EchoReady: source.checks.javaV106EchoReady,
    miniKvV115NonParticipationReady: source.checks.miniKvV115NonParticipationReady,
    disabledPrecheckAligned: source.echoVerification.disabledPrecheckAligned,
    requiredEnvHandlesAligned: source.echoVerification.requiredEnvHandlesAligned,
    optInGatesAligned: source.echoVerification.optInGatesAligned,
    failureTaxonomyAligned: source.echoVerification.failureTaxonomyAligned,
    dryRunResponseShapeAligned: source.echoVerification.dryRunResponseShapeAligned,
    inheritedNoGoConditionsAligned: source.echoVerification.inheritedNoGoConditionsAligned,
    sourceNodeV261Aligned: source.echoVerification.sourceNodeV261Aligned,
    credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: source.echoVerification.rawEndpointBoundaryAligned,
    connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
    writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
    autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
    upstreamActionsStillDisabled: source.checks.upstreamActionsStillDisabled,
    credentialResolverExecutionAllowed: source.credentialResolverExecutionAllowed,
    credentialValueRead: source.credentialValueRead,
    credentialValueLoaded: source.credentialValueLoaded,
    credentialValueStored: source.credentialValueStored,
    credentialValueIncluded: source.credentialValueIncluded,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    rawEndpointUrlIncluded: source.rawEndpointUrlIncluded,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    connectsManagedAudit: source.connectsManagedAudit,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
    failureClassCodes: source.sourceNodeV262.failureClassCodes,
    requiredEnvHandleNames: source.sourceNodeV262.requiredEnvHandleNames,
    optInGateNames: source.sourceNodeV262.optInGateNames,
    dryRunResponseFields: source.sourceNodeV262.dryRunResponseFields,
    inheritedNoGoConditions: source.sourceNodeV262.inheritedNoGoConditions,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    readyForNodeV264CredentialResolverTestOnlyShellContract: false,
  };

  return {
    ...reference,
    readyForNodeV264CredentialResolverTestOnlyShellContract:
      reference.readyForDisabledPrecheckUpstreamEchoVerification
      && reference.verificationState === "sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready"
      && reference.verificationMode
        === "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only"
      && reference.sourceSpan === "Node v262 + Java v106 + mini-kv v115"
      && reference.sourceNodeV262Ready
      && reference.javaV106EchoReady
      && reference.miniKvV115NonParticipationReady
      && reference.disabledPrecheckAligned
      && reference.requiredEnvHandlesAligned
      && reference.optInGatesAligned
      && reference.failureTaxonomyAligned
      && reference.dryRunResponseShapeAligned
      && reference.inheritedNoGoConditionsAligned
      && reference.sourceNodeV261Aligned
      && reference.credentialBoundaryAligned
      && reference.rawEndpointBoundaryAligned
      && reference.connectionBoundaryAligned
      && reference.writeBoundaryAligned
      && reference.autoStartBoundaryAligned
      && reference.upstreamActionsStillDisabled
      && !reference.credentialResolverExecutionAllowed
      && !reference.credentialValueRead
      && !reference.credentialValueLoaded
      && !reference.credentialValueStored
      && !reference.credentialValueIncluded
      && !reference.rawEndpointUrlParsed
      && !reference.rawEndpointUrlIncluded
      && !reference.externalRequestSent
      && !reference.secretProviderInstantiated
      && !reference.resolverClientInstantiated
      && !reference.connectsManagedAudit
      && !reference.schemaMigrationExecuted
      && !reference.automaticUpstreamStart
      && reference.failureClassCodes.length === 7
      && reference.requiredEnvHandleNames.length === 6
      && reference.optInGateNames.length === 2
      && reference.dryRunResponseFields.length === 12
      && reference.inheritedNoGoConditions.length === 9
      && reference.checkCount === reference.passedCheckCount
      && reference.productionBlockerCount === 0,
  };
}

function createResolverShellContract(
  sourceNodeV263: SourceNodeV263DisabledResolverPrecheckEchoReference,
): CredentialResolverTestOnlyShellContract {
  const requestShape = createRequestShape();
  const responseShape = createResponseShape();
  const failureMapping = createFailureMapping(sourceNodeV263.failureClassCodes);
  const guardConditions = createGuardConditions();
  const fakeResolverProbe = createFakeResolverProbe();
  const contract = {
    shellName: "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell" as const,
    shellMode: "test-only-fake-resolver-contract" as const,
    resolverKind: "fake-in-memory" as const,
    realResolverImplemented: false as const,
    realSecretProviderAllowed: false as const,
    fakeResolverOnly: true as const,
    resolverClientMayBeInstantiatedForProduction: false as const,
    secretProviderMayBeInstantiated: false as const,
    credentialValueMayBeLoaded: false as const,
    rawEndpointUrlMayBeParsed: false as const,
    externalRequestMayBeSent: false as const,
    requestShapeFieldCount: requestShape.fields.length,
    responseShapeFieldCount: responseShape.fields.length,
    failureMappingCount: failureMapping.length,
    guardConditionCount: guardConditions.length,
    requestShape,
    responseShape,
    failureMapping,
    guardConditions,
    fakeResolverProbe,
    sourceDigest: sourceNodeV263.verificationDigest,
  };

  return {
    contractDigest: sha256StableJson(contract),
    shellName: contract.shellName,
    shellMode: contract.shellMode,
    resolverKind: contract.resolverKind,
    realResolverImplemented: contract.realResolverImplemented,
    realSecretProviderAllowed: contract.realSecretProviderAllowed,
    fakeResolverOnly: contract.fakeResolverOnly,
    resolverClientMayBeInstantiatedForProduction: contract.resolverClientMayBeInstantiatedForProduction,
    secretProviderMayBeInstantiated: contract.secretProviderMayBeInstantiated,
    credentialValueMayBeLoaded: contract.credentialValueMayBeLoaded,
    rawEndpointUrlMayBeParsed: contract.rawEndpointUrlMayBeParsed,
    externalRequestMayBeSent: contract.externalRequestMayBeSent,
    requestShapeFieldCount: contract.requestShapeFieldCount,
    responseShapeFieldCount: contract.responseShapeFieldCount,
    failureMappingCount: contract.failureMappingCount,
    guardConditionCount: contract.guardConditionCount,
    requestShape,
    responseShape,
    failureMapping,
    guardConditions,
    fakeResolverProbe,
  };
}

function createRequestShape(): CredentialResolverTestOnlyShellRequestShape {
  return {
    fields: REQUEST_SHAPE_FIELDS,
    credentialHandleOnly: true,
    credentialValueAccepted: false,
    endpointHandleOnly: true,
    rawEndpointUrlAccepted: false,
    resolverPolicyHandleRequired: true,
    approvalMarkerRequired: true,
    payloadMayContainSecrets: false,
  };
}

function createResponseShape(): CredentialResolverTestOnlyShellResponseShape {
  return {
    fields: RESPONSE_SHAPE_FIELDS,
    fakeResolverResponseOnly: true,
    resolverClientInstantiated: false,
    secretProviderInstantiated: false,
    credentialValueRead: false,
    credentialValueLoaded: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    connectsManagedAudit: false,
    schemaMigrationExecuted: false,
    productionRecordWritten: false,
  };
}

function createFailureMapping(sourceFailureCodes: readonly string[]): CredentialResolverTestOnlyShellFailureMapping[] {
  const actionByCode = new Map<string, CredentialResolverTestOnlyShellFailureMapping["mappedAction"]>([
    ["RESOLVER_DISABLED", "return-fake-failure"],
    ["APPROVAL_MARKER_MISSING", "pause-and-do-not-resolve"],
    ["CREDENTIAL_HANDLE_MISSING", "pause-and-do-not-resolve"],
    ["CREDENTIAL_VALUE_REQUESTED", "pause-and-do-not-resolve"],
    ["RAW_ENDPOINT_URL_REQUESTED", "pause-and-do-not-resolve"],
    ["EXTERNAL_REQUEST_REQUESTED", "pause-and-do-not-resolve"],
    ["SCHEMA_MIGRATION_REQUESTED", "pause-and-do-not-resolve"],
  ]);

  return sourceFailureCodes.map((code) => ({
    sourceFailureCode: code,
    shellFailureCode: `TEST_ONLY_${code}`,
    mappedAction: actionByCode.get(code) ?? "pause-and-do-not-resolve",
    retryable: false,
  }));
}

function createGuardConditions(): CredentialResolverTestOnlyShellGuardCondition[] {
  return [
    guard("SOURCE_V263_READY", true, "Node v263 disabled precheck upstream echo verification must be ready."),
    guard("FAKE_RESOLVER_ONLY", true, "Only fake in-memory resolver is allowed in v264."),
    guard("CREDENTIAL_HANDLE_ONLY", true, "Requests may carry credential handles only, never credential values."),
    guard("ENDPOINT_HANDLE_ONLY", true, "Requests may carry endpoint handles only, never raw endpoint URLs."),
    guard("RESOLVER_POLICY_HANDLE_REQUIRED", true, "Resolver policy handle must be present as a handle only."),
    guard("APPROVAL_MARKER_REQUIRED", true, "Approval marker must be present before any later resolver work."),
    guard("UPSTREAM_ACTIONS_DISABLED", true, "UPSTREAM_ACTIONS_ENABLED must stay false."),
    guard("NO_SECRET_PROVIDER", true, "The test-only shell must not instantiate a secret provider."),
    guard("NO_EXTERNAL_REQUEST", true, "The test-only shell must not send external managed audit requests."),
    guard("NO_SCHEMA_MIGRATION", true, "The test-only shell must not execute schema migration SQL."),
  ];
}

function guard(code: string, value: boolean, message: string): CredentialResolverTestOnlyShellGuardCondition {
  return {
    code,
    required: true,
    value,
    message,
  };
}

function createFakeResolverProbe(): CredentialResolverTestOnlyShellProbe {
  const probe = {
    requestId: "managed-audit-v264-test-only-resolver-shell-probe" as const,
    resolverKind: "fake-in-memory" as const,
    acceptedByFakeResolver: true as const,
    responseStatus: "fake-resolver-accepted" as const,
    responseCode: "TEST_ONLY_FAKE_RESOLVER" as const,
    resolverClientInstantiated: false as const,
    secretProviderInstantiated: false as const,
    credentialValueRead: false as const,
    credentialValueLoaded: false as const,
    rawEndpointUrlParsed: false as const,
    externalRequestSent: false as const,
    connectsManagedAudit: false as const,
    schemaMigrationExecuted: false as const,
    productionRecordWritten: false as const,
  };

  return {
    ...probe,
    probeDigest: sha256StableJson(probe),
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV263: SourceNodeV263DisabledResolverPrecheckEchoReference,
  contract: CredentialResolverTestOnlyShellContract,
): CredentialResolverTestOnlyShellContractChecks {
  return {
    sourceNodeV263Ready: sourceNodeV263.readyForNodeV264CredentialResolverTestOnlyShellContract,
    sourceStillBlocksCredentialResolution: !sourceNodeV263.credentialResolverExecutionAllowed,
    sourceStillBlocksCredentialValue:
      sourceNodeV263.credentialBoundaryAligned
      && !sourceNodeV263.credentialValueRead
      && !sourceNodeV263.credentialValueLoaded
      && !sourceNodeV263.credentialValueIncluded,
    sourceStillBlocksRawEndpoint:
      sourceNodeV263.rawEndpointBoundaryAligned
      && !sourceNodeV263.rawEndpointUrlParsed
      && !sourceNodeV263.rawEndpointUrlIncluded,
    sourceStillBlocksConnection:
      sourceNodeV263.connectionBoundaryAligned
      && !sourceNodeV263.connectsManagedAudit
      && !sourceNodeV263.externalRequestSent,
    sourceStillBlocksWrites:
      sourceNodeV263.writeBoundaryAligned
      && !sourceNodeV263.schemaMigrationExecuted,
    sourceStillBlocksAutoStart:
      sourceNodeV263.autoStartBoundaryAligned
      && !sourceNodeV263.automaticUpstreamStart,
    fakeResolverOnly:
      contract.fakeResolverOnly
      && contract.resolverKind === "fake-in-memory"
      && !contract.realResolverImplemented
      && !contract.realSecretProviderAllowed,
    requestShapeHandleOnly:
      contract.requestShape.credentialHandleOnly
      && !contract.requestShape.credentialValueAccepted
      && contract.requestShape.endpointHandleOnly
      && !contract.requestShape.rawEndpointUrlAccepted
      && contract.requestShape.resolverPolicyHandleRequired
      && contract.requestShape.approvalMarkerRequired
      && !contract.requestShape.payloadMayContainSecrets,
    responseShapeNoSideEffects:
      contract.responseShape.fakeResolverResponseOnly
      && !contract.responseShape.resolverClientInstantiated
      && !contract.responseShape.secretProviderInstantiated
      && !contract.responseShape.credentialValueRead
      && !contract.responseShape.credentialValueLoaded
      && !contract.responseShape.rawEndpointUrlParsed
      && !contract.responseShape.externalRequestSent
      && !contract.responseShape.connectsManagedAudit
      && !contract.responseShape.schemaMigrationExecuted
      && !contract.responseShape.productionRecordWritten,
    failureMappingCoversSourceTaxonomy:
      contract.failureMapping.length === sourceNodeV263.failureClassCodes.length
      && contract.failureMapping.every((mapping, index) =>
        mapping.sourceFailureCode === sourceNodeV263.failureClassCodes[index]
        && !mapping.retryable),
    guardConditionsDeclared:
      contract.guardConditions.length >= 10
      && contract.guardConditions.every((condition) => condition.required && condition.value),
    fakeResolverProbeCovered: contract.fakeResolverProbe.acceptedByFakeResolver,
    fakeResolverProbeNoCredentialRead:
      !contract.fakeResolverProbe.credentialValueRead
      && !contract.fakeResolverProbe.credentialValueLoaded
      && !contract.fakeResolverProbe.secretProviderInstantiated
      && !contract.fakeResolverProbe.resolverClientInstantiated,
    fakeResolverProbeNoExternalRequest:
      !contract.fakeResolverProbe.externalRequestSent
      && !contract.fakeResolverProbe.rawEndpointUrlParsed
      && !contract.fakeResolverProbe.connectsManagedAudit,
    fakeResolverProbeNoProductionWrite:
      !contract.fakeResolverProbe.schemaMigrationExecuted
      && !contract.fakeResolverProbe.productionRecordWritten,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract: false,
  };
}

function collectProductionBlockers(
  checks: CredentialResolverTestOnlyShellContractChecks,
): CredentialResolverTestOnlyShellContractMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverTestOnlyShellContractMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV263Ready,
      code: "NODE_V263_DISABLED_PRECHECK_ECHO_NOT_READY",
      source: "node-v263-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "Node v263 must be ready before v264 can define a test-only credential resolver shell.",
    },
    {
      condition:
        checks.sourceStillBlocksCredentialResolution
        && checks.sourceStillBlocksCredentialValue
        && checks.sourceStillBlocksRawEndpoint
        && checks.sourceStillBlocksConnection
        && checks.sourceStillBlocksWrites
        && checks.sourceStillBlocksAutoStart,
      code: "SOURCE_BOUNDARY_OPENED",
      source: "node-v263-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "Node v263 must still block credential resolution, credential values, raw endpoints, connections, writes, and auto-start.",
    },
    {
      condition: checks.fakeResolverOnly,
      code: "REAL_RESOLVER_SELECTED",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract",
      message: "v264 must use a fake in-memory resolver only.",
    },
    {
      condition: checks.requestShapeHandleOnly && checks.responseShapeNoSideEffects,
      code: "RESOLVER_SHELL_SHAPE_UNSAFE",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract",
      message: "Request and response shapes must stay handle-only and must not claim real side effects.",
    },
    {
      condition: checks.failureMappingCoversSourceTaxonomy && checks.guardConditionsDeclared,
      code: "RESOLVER_SHELL_GUARDS_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract",
      message: "Failure mapping and guard conditions must be complete before Java v107 and mini-kv v116 consume v264.",
    },
    {
      condition:
        checks.fakeResolverProbeCovered
        && checks.fakeResolverProbeNoCredentialRead
        && checks.fakeResolverProbeNoExternalRequest
        && checks.fakeResolverProbeNoProductionWrite,
      code: "FAKE_RESOLVER_PROBE_UNSAFE",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract",
      message: "The fake resolver probe must not instantiate resolver/client/provider, read credentials, parse endpoints, connect, or write records.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for the v264 credential resolver test-only shell contract.",
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

function collectWarnings(): CredentialResolverTestOnlyShellContractMessage[] {
  return [
    {
      code: "TEST_ONLY_SHELL_NOT_A_REAL_RESOLVER",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract",
      message: "v264 defines a fake resolver shell contract only; it does not implement a real secret provider or resolver client.",
    },
    {
      code: "UPSTREAM_ECHO_REQUIRED_NEXT",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract",
      message: "Java v107 and mini-kv v116 should echo this boundary before Node v265 verifies alignment.",
    },
  ];
}

function collectRecommendations(): CredentialResolverTestOnlyShellContractMessage[] {
  return [
    {
      code: "ASK_JAVA_MINI_KV_FOR_ECHO_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract",
      message: "Next, use Java v107 and mini-kv v116 as read-only echo / non-participation evidence for this fake resolver shell.",
    },
    {
      code: "KEEP_REAL_RESOLVER_OUT_OF_SCOPE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract",
      message: "Do not add a real credential resolver until a later plan explicitly approves secret provider and endpoint boundaries.",
    },
  ];
}
