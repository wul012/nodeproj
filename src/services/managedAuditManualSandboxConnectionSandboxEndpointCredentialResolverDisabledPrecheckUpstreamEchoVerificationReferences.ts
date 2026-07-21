import { readV115Fields } from "../evidence/miniKvReceiptFields.js";
import { isV115Ready } from "../evidence/miniKvReceiptReadiness.js";
import {
  evidenceFile,
  mapSnippetFields,
  readJsonObject,
  snippet,
} from "./historicalEvidenceReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckTypes.js";
import {
  DRY_RUN_RESPONSE_FIELDS,
  FAILURE_CLASS_CODES,
  INHERITED_NO_GO_CONDITIONS,
  JAVA_V106_BUILDER,
  JAVA_V106_RECORDS,
  JAVA_V106_RUNBOOK,
  JAVA_V106_WALKTHROUGH,
  MINI_KV_V115_RECEIPT,
  MINI_KV_V115_RUNBOOK,
  MINI_KV_V115_WALKTHROUGH,
  OPT_IN_GATE_NAMES,
  REQUIRED_ENV_HANDLE_NAMES,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationConstants.js";
import type {
  JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
  SourceNodeV262CredentialResolverDisabledPrecheckReference,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationTypes.js";

const JAVA_V106_IDENTITY_FIELDS = [
  ["responseSchemaVersion", "java-v106-response-schema", "java-release-approval-rehearsal-response-schema.v28", "missing"],
  ["markerField", "java-v106-marker-field", "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker", "missing"],
  ["consumedNodeVersion", "java-v106-node-v262", "Node v262", "missing"],
  ["consumedNodeProfile", "java-v106-node-v262", "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1", "missing"],
  ["nextNodeConsumerVersion", "java-v106-node-v263", "Node v263", "missing"],
  ["precheckMode", "java-v106-precheck-mode", "sandbox-endpoint-credential-resolver-disabled-precheck-only", "missing"],
  ["sourceSpan", "java-v106-source-span", "Node v261 credential resolver upstream echo verification", "missing"],
  ["sourceVerificationMode", "java-v106-source-mode", "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only", "missing"],
  ["sourceNodeV261Span", "java-v106-source-span", "Node v260 + Java v105 + mini-kv v114", "missing"],
  ["requiredEnvHandleCount", "java-v106-required-env-count", 6, 0],
  ["optInGateCount", "java-v106-opt-in-count", 2, 0],
  ["failureClassCount", "java-v106-failure-count", 7, 0],
  ["dryRunResponseFieldCount", "java-v106-dry-run-count", 12, 0],
  ["inheritedNoGoConditionCount", "java-v106-inherited-count", 9, 0],
  ["sourceCheckCount", "java-v106-source-check-count", 20, 0],
  ["sourcePassedCheckCount", "java-v106-source-passed-count", 20, 0],
] as const;

const JAVA_V106_IMPLEMENTATION_FIELDS = [
  ["resolverImplementationStatus", "java-v106-resolver-status", "not-implemented", "missing"],
  ["secretProviderImplementationStatus", "java-v106-secret-status", "not-implemented", "missing"],
  ["resolverClientMayBeInstantiated", "java-v106-resolver-client-blocked", false, true],
  ["secretProviderMayBeInstantiated", "java-v106-secret-provider-blocked", false, true],
  ["credentialValueMayBeLoaded", "java-v106-credential-load-blocked", false, true],
  ["rawEndpointUrlMayBeParsed", "java-v106-raw-endpoint-blocked", false, true],
  ["externalRequestMayBeSent", "java-v106-external-blocked", false, true],
] as const;

const JAVA_V106_CONNECTION_FIELD = [
  ["connectsManagedAudit", "java-v106-side-effect-connection", false, true],
] as const;

const JAVA_V106_EXTERNAL_FIELD = [
  ["externalRequestSent", "java-v106-side-effect-external", false, true],
] as const;

function nodeV262ContractReady(
  reference: SourceNodeV262CredentialResolverDisabledPrecheckReference,
): boolean {
  return [
    reference.readyForDisabledPrecheck,
    reference.precheckState === "sandbox-endpoint-credential-resolver-disabled-precheck-ready",
    reference.precheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only",
    reference.sourceNodeV261Ready,
    reference.sourceVerificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only",
    reference.sourceSpan === "Node v260 + Java v105 + mini-kv v114",
    reference.sourceBlocksCredentialResolution,
    reference.sourceCredentialBoundaryAligned,
    reference.sourceRawEndpointBoundaryAligned,
    reference.sourceConnectionBoundaryAligned,
    reference.sourceWriteBoundaryAligned,
    reference.sourceAutoStartBoundaryAligned,
    reference.upstreamActionsStillDisabled,
    reference.resolverImplementationStatus === "not-implemented",
    reference.secretProviderImplementationStatus === "not-implemented",
    reference.requiredEnvHandleCount === REQUIRED_ENV_HANDLE_NAMES.length,
    reference.optInGateCount === OPT_IN_GATE_NAMES.length,
    reference.failureClassCount === FAILURE_CLASS_CODES.length,
    reference.dryRunResponseFieldCount === DRY_RUN_RESPONSE_FIELDS.length,
    reference.inheritedNoGoConditionCount === INHERITED_NO_GO_CONDITIONS.length,
    arraysEqual(reference.requiredEnvHandleNames, [...REQUIRED_ENV_HANDLE_NAMES]),
    arraysEqual(reference.optInGateNames, [...OPT_IN_GATE_NAMES]),
    arraysEqual(reference.failureClassCodes, [...FAILURE_CLASS_CODES]),
    arraysEqual(reference.dryRunResponseFields, [...DRY_RUN_RESPONSE_FIELDS]),
    arraysEqual([...reference.inheritedNoGoConditions], [...INHERITED_NO_GO_CONDITIONS]),
  ].every(Boolean);
}

function nodeV262BoundaryClosed(
  reference: SourceNodeV262CredentialResolverDisabledPrecheckReference,
): boolean {
  return [
    !reference.resolverClientMayBeInstantiated,
    !reference.secretProviderMayBeInstantiated,
    !reference.credentialValueMayBeLoaded,
    !reference.rawEndpointUrlMayBeParsed,
    !reference.externalRequestMayBeSent,
    reference.optInGateRequired,
    !reference.credentialResolverExecutionAllowed,
    !reference.credentialValueRead,
    !reference.credentialValueLoaded,
    !reference.credentialValueStored,
    !reference.credentialValueIncluded,
    !reference.rawEndpointUrlParsed,
    !reference.rawEndpointUrlIncluded,
    !reference.externalRequestSent,
    !reference.secretProviderInstantiated,
    !reference.resolverClientInstantiated,
    !reference.connectsManagedAudit,
    !reference.schemaMigrationExecuted,
    !reference.automaticUpstreamStart,
    reference.checkCount === reference.passedCheckCount,
    reference.checkCount === 24,
    reference.productionBlockerCount === 0,
    reference.warningCount === 2,
    reference.recommendationCount === 2,
  ].every(Boolean);
}

function javaV106ContractReady(
  reference: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
): boolean {
  return [
    reference.evidencePresent,
    reference.verificationDocumented,
    reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v28",
    reference.markerField === "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker",
    reference.consumedNodeVersion === "Node v262",
    reference.consumedNodeProfile
      === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1",
    reference.nextNodeConsumerVersion === "Node v263",
    reference.precheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only",
    reference.sourceVerificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only",
    reference.requiredEnvHandleCount === 6,
    reference.optInGateCount === 2,
    reference.failureClassCount === 7,
    reference.dryRunResponseFieldCount === 12,
    reference.inheritedNoGoConditionCount === 9,
    reference.sourceCheckCount === reference.sourcePassedCheckCount,
    reference.sourceCheckCount === 20,
    reference.sourceProductionBlockerCount === 0,
    reference.sourceWarningCount === 2,
    reference.sourceRecommendationCount === 2,
    reference.resolverImplementationStatus === "not-implemented",
    reference.secretProviderImplementationStatus === "not-implemented",
  ].every(Boolean);
}

function javaV106BoundaryClosed(
  reference: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
): boolean {
  return [
    !reference.resolverClientMayBeInstantiated,
    !reference.secretProviderMayBeInstantiated,
    !reference.credentialValueMayBeLoaded,
    !reference.rawEndpointUrlMayBeParsed,
    !reference.externalRequestMayBeSent,
    !reference.credentialResolverExecutionAllowed,
    !reference.connectsManagedAudit,
    !reference.credentialValueRead,
    !reference.credentialValueLoaded,
    !reference.credentialValueStored,
    !reference.credentialValueIncluded,
    !reference.rawEndpointUrlParsed,
    !reference.rawEndpointUrlIncluded,
    !reference.externalRequestSent,
    !reference.secretProviderInstantiated,
    !reference.resolverClientInstantiated,
    !reference.schemaMigrationExecuted,
    !reference.automaticUpstreamStart,
    !reference.readyForManagedAuditSandboxAdapterConnection,
  ].every(Boolean);
}

export function createSourceNodeV262(
  source: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile,
): SourceNodeV262CredentialResolverDisabledPrecheckReference {
  const precheck = source.disabledCredentialResolverPrecheck;
  const reference = {
    sourceVersion: "Node v262" as const,
    profileVersion: source.profileVersion,
    precheckState: source.precheckState,
    readyForDisabledPrecheck:
      source.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck,
    precheckDigest: precheck.precheckDigest,
    precheckMode: precheck.precheckMode,
    resolverImplementationStatus: precheck.resolverImplementationStatus,
    secretProviderImplementationStatus: precheck.secretProviderImplementationStatus,
    requiredEnvHandleCount: precheck.requiredEnvHandleCount,
    optInGateCount: precheck.optInGateCount,
    failureClassCount: precheck.failureClassCount,
    dryRunResponseFieldCount: precheck.dryRunResponseFieldCount,
    inheritedNoGoConditionCount: precheck.inheritedNoGoConditionCount,
    requiredEnvHandleNames: precheck.requiredEnvHandles.map((handle) => handle.name),
    optInGateNames: precheck.optInGates.map((gate) => gate.gateName),
    failureClassCodes: precheck.failureTaxonomy.map((failure) => failure.code),
    dryRunResponseFields: [...precheck.dryRunResponseShape.fields],
    inheritedNoGoConditions: precheck.inheritedNoGoConditions,
    sourceNodeV261Ready: source.sourceNodeV261.readyForNodeV262CredentialResolverDisabledPrecheck,
    sourceVerificationMode: source.sourceNodeV261.verificationMode,
    sourceSpan: source.sourceNodeV261.sourceSpan,
    sourceBlocksCredentialResolution: !source.sourceNodeV261.credentialResolverExecutionAllowed,
    sourceCredentialBoundaryAligned: source.sourceNodeV261.credentialBoundaryAligned,
    sourceRawEndpointBoundaryAligned: source.sourceNodeV261.rawEndpointBoundaryAligned,
    sourceConnectionBoundaryAligned: source.sourceNodeV261.connectionBoundaryAligned,
    sourceWriteBoundaryAligned: source.sourceNodeV261.writeBoundaryAligned,
    sourceAutoStartBoundaryAligned: source.sourceNodeV261.autoStartBoundaryAligned,
    upstreamActionsStillDisabled: source.checks.upstreamActionsStillDisabled,
    resolverClientMayBeInstantiated: precheck.resolverClientMayBeInstantiated,
    secretProviderMayBeInstantiated: precheck.secretProviderMayBeInstantiated,
    credentialValueMayBeLoaded: precheck.credentialValueMayBeLoaded,
    rawEndpointUrlMayBeParsed: precheck.rawEndpointUrlMayBeParsed,
    externalRequestMayBeSent: precheck.externalRequestMayBeSent,
    optInGateRequired: precheck.optInGateRequired,
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
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    readyForNodeV263DisabledPrecheckUpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV263DisabledPrecheckUpstreamEchoVerification:
      [nodeV262ContractReady(reference), nodeV262BoundaryClosed(reference)].every(Boolean),
  };
}

export function createJavaV106Reference(): JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference {
  const evidenceFiles = [
    evidenceFile("java-v106-runbook", JAVA_V106_RUNBOOK),
    evidenceFile("java-v106-walkthrough", JAVA_V106_WALKTHROUGH),
    evidenceFile("java-v106-builder", JAVA_V106_BUILDER),
    evidenceFile("java-v106-records", JAVA_V106_RECORDS),
  ];
  const expectedSnippets = [
    snippet("java-v106-marker-field", JAVA_V106_RUNBOOK, "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker"),
    snippet("java-v106-response-schema", JAVA_V106_RUNBOOK, "response schema: java-release-approval-rehearsal-response-schema.v28"),
    snippet("java-v106-node-v262", JAVA_V106_RUNBOOK, "Node v262"),
    snippet("java-v106-node-v263", JAVA_V106_BUILDER, "readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification"),
    snippet("java-v106-precheck-mode", JAVA_V106_BUILDER, "sandbox-endpoint-credential-resolver-disabled-precheck-only"),
    snippet("java-v106-source-mode", JAVA_V106_BUILDER, "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"),
    snippet("java-v106-source-span", JAVA_V106_BUILDER, "Node v260 + Java v105 + mini-kv v114"),
    snippet("java-v106-required-env-count", JAVA_V106_BUILDER, "requiredEnvHandleCount=6"),
    snippet("java-v106-opt-in-count", JAVA_V106_BUILDER, "optInGateCount=2"),
    snippet("java-v106-failure-count", JAVA_V106_BUILDER, "failureClassCount=7"),
    snippet("java-v106-dry-run-count", JAVA_V106_BUILDER, "dryRunResponseFieldCount=12"),
    snippet("java-v106-inherited-count", JAVA_V106_BUILDER, "inheritedNoGoConditionCount=9"),
    snippet("java-v106-source-check-count", JAVA_V106_BUILDER, "SOURCE_CHECK_COUNT = 20"),
    snippet("java-v106-source-passed-count", JAVA_V106_BUILDER, "SOURCE_PASSED_CHECK_COUNT = 20"),
    snippet("java-v106-resolver-status", JAVA_V106_BUILDER, "RESOLVER_IMPLEMENTATION_STATUS = \"not-implemented\""),
    snippet("java-v106-secret-status", JAVA_V106_BUILDER, "SECRET_PROVIDER_IMPLEMENTATION_STATUS = \"not-implemented\""),
    snippet("java-v106-resolver-client-blocked", JAVA_V106_BUILDER, "resolverClientMayBeInstantiated=false"),
    snippet("java-v106-secret-provider-blocked", JAVA_V106_BUILDER, "secretProviderMayBeInstantiated=false"),
    snippet("java-v106-credential-load-blocked", JAVA_V106_BUILDER, "credentialValueMayBeLoaded=false"),
    snippet("java-v106-raw-endpoint-blocked", JAVA_V106_BUILDER, "rawEndpointUrlMayBeParsed=false"),
    snippet("java-v106-external-blocked", JAVA_V106_BUILDER, "externalRequestMayBeSent=false"),
    snippet("java-v106-side-effect-external", JAVA_V106_BUILDER, "sideEffectBoundary.externalRequestSent=false"),
    snippet("java-v106-side-effect-connection", JAVA_V106_BUILDER, "sideEffectBoundary.connectsManagedAudit=false"),
    snippet("java-v106-record-side-effect", JAVA_V106_RECORDS, "RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSideEffectBoundary"),
    snippet("java-v106-walkthrough-summary", JAVA_V106_WALKTHROUGH, "给 Node v263 一个稳定字段继续消费"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "Java v106" as const,
    tagLabel: "v106订单平台disabled-resolver-precheck-echo-marker",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    ...mapSnippetFields(expectedSnippets, JAVA_V106_IDENTITY_FIELDS),
    sourceProductionBlockerCount: 0,
    sourceWarningCount: 2,
    sourceRecommendationCount: 2,
    ...mapSnippetFields(expectedSnippets, JAVA_V106_IMPLEMENTATION_FIELDS),
    credentialResolverExecutionAllowed: false,
    ...mapSnippetFields(expectedSnippets, JAVA_V106_CONNECTION_FIELD),
    credentialValueRead: false,
    credentialValueLoaded: false,
    credentialValueStored: false,
    credentialValueIncluded: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    ...mapSnippetFields(expectedSnippets, JAVA_V106_EXTERNAL_FIELD),
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    readyForManagedAuditSandboxAdapterConnection: false as const,
    readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification:
      [javaV106ContractReady(reference), javaV106BoundaryClosed(reference)].every(Boolean),
  };
}

export function createMiniKvV115Reference(): MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v115-receipt", MINI_KV_V115_RECEIPT),
    evidenceFile("mini-kv-v115-runbook", MINI_KV_V115_RUNBOOK),
    evidenceFile("mini-kv-v115-walkthrough", MINI_KV_V115_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v115-receipt-version", MINI_KV_V115_RECEIPT, "mini-kv-disabled-credential-resolver-precheck-non-participation-receipt.v1"),
    snippet("mini-kv-v115-consumer", MINI_KV_V115_RECEIPT, "Node v263 disabled credential resolver upstream echo verification"),
    snippet("mini-kv-v115-source-profile", MINI_KV_V115_RECEIPT, "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1"),
    snippet("mini-kv-v115-required-count", MINI_KV_V115_RECEIPT, "\"source_required_env_handle_count\":6"),
    snippet("mini-kv-v115-failure-count", MINI_KV_V115_RECEIPT, "\"source_failure_class_count\":7"),
    snippet("mini-kv-v115-no-resolver-client", MINI_KV_V115_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v115-no-secret-provider", MINI_KV_V115_RECEIPT, "\"secret_provider_instantiated\":false"),
    snippet("mini-kv-v115-no-credential", MINI_KV_V115_RECEIPT, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v115-no-raw-endpoint", MINI_KV_V115_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v115-no-external", MINI_KV_V115_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v115-no-load", MINI_KV_V115_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v115-runbook", MINI_KV_V115_RUNBOOK, "Node v263"),
    snippet("mini-kv-v115-walkthrough", MINI_KV_V115_WALKTHROUGH, "Node v263 可以从真实 runtime smoke 里读取同一份边界证明"),
  ];
  const reference: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference = {
    sourceVersion: "mini-kv v115",
    tagLabel: "第一百一十五版禁用凭证解析器预检非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    ...readV115Fields(readJsonObject(MINI_KV_V115_RECEIPT)),
    readyForNodeV263Alignment: false,
  };
  return { ...reference, readyForNodeV263Alignment: isV115Ready(reference) };
}

export function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
