import type { AppConfig } from "../config.js";
import { readV116Fields } from "../evidence/miniKvReceiptFields.js";
import { isV116Ready } from "../evidence/miniKvReceiptReadiness.js";
import {
  evidenceFile,
  mapSnippetFields,
  readJsonObject,
  snippet,
  snippetMatched,
  snippetsMatched,
} from "./historicalEvidenceReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.js";
import {
  FAILURE_CLASS_CODES,
  GUARD_CONDITION_CODES,
  JAVA_V107_CONTRACT_BUILDER,
  JAVA_V107_MARKER_BUILDER,
  JAVA_V107_RUNBOOK,
  JAVA_V107_WALKTHROUGH,
  JAVA_V109_RECORDS,
  JAVA_V109_RUNBOOK,
  JAVA_V109_WALKTHROUGH,
  MINI_KV_V116_RECEIPT,
  MINI_KV_V116_RUNBOOK,
  MINI_KV_V116_WALKTHROUGH,
  REQUEST_SHAPE_FIELDS,
  RESPONSE_SHAPE_FIELDS,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationConstants.js";
import type {
  JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  JavaV109RehearsalResponseRecordsSplitOptimizationContext,
  MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
  SourceNodeV264CredentialResolverTestOnlyShellContractReference,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationTypes.js";

const JAVA_V107_IDENTITY_FIELDS = [
  ["responseSchemaVersion", "java-v107-response-schema", "java-release-approval-rehearsal-response-schema.v29", "missing"],
  ["markerField", "java-v107-marker-field", "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker", "missing"],
  ["consumedNodeVersion", "java-v107-node-v264", "Node v264", "missing"],
  ["consumedNodeProfile", "java-v107-node-v264", "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1", "missing"],
  ["nextNodeConsumerVersion", "java-v107-node-v265", "Node v265", "missing"],
  ["sourceSpan", "java-v107-source-span", "Node v264 credential resolver test-only shell contract", "missing"],
  ["shellMode", "java-v107-shell-mode", "test-only-fake-resolver-contract", "missing"],
  ["shellName", "java-v107-shell-name", "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell", "missing"],
  ["resolverKind", "java-v107-resolver-kind", "fake-in-memory", "missing"],
  ["requestShapeFieldCount", "java-v107-request-count", 9, 0],
  ["responseShapeFieldCount", "java-v107-response-count", 13, 0],
  ["failureMappingCount", "java-v107-failure-count", 7, 0],
  ["guardConditionCount", "java-v107-guard-count", 10, 0],
  ["fakeResolverProbeCount", "java-v107-fake-probe-credential", 1, 0],
] as const;

const JAVA_V107_ECHO_FIELDS = [
  ["failureMappingEchoed", "java-v107-code-failure-codes", true, false],
  ["guardConditionsEchoed", "java-v107-code-guard-codes", true, false],
  ["fakeResolverProbeEchoed", "java-v107-fake-probe-credential", true, false],
  ["fakeResolverOnlyEchoed", "java-v107-fake-only", true, false],
  ["sideEffectBoundaryClosed", "java-v107-side-effect-connection", true, false],
] as const;

const JAVA_V107_CONNECTION_FIELDS = [
  ["connectsManagedAudit", "java-v107-side-effect-connection", false, true],
  ["credentialValueRead", "java-v107-fake-probe-credential", false, true],
] as const;

const JAVA_V107_RUNTIME_FIELDS = [
  ["externalRequestSent", "java-v107-external-blocked", false, true],
  ["secretProviderInstantiated", "java-v107-secret-provider-blocked", false, true],
  ["resolverClientInstantiated", "java-v107-resolver-client-blocked", false, true],
] as const;

function nodeV264ContractReady(
  reference: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
): boolean {
  return [
    reference.readyForTestOnlyShellContract,
    reference.shellContractState === "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready",
    reference.profileVersion
      === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1",
    reference.shellMode === "test-only-fake-resolver-contract",
    reference.resolverKind === "fake-in-memory",
    reference.testOnlyShell,
    reference.readOnlyContract,
    reference.fakeResolverOnly,
    reference.handleOnlyRequest,
    arraysEqual(reference.requestShapeFields, REQUEST_SHAPE_FIELDS),
    arraysEqual(reference.responseShapeFields, RESPONSE_SHAPE_FIELDS),
    arraysEqual(reference.failureClassCodes, FAILURE_CLASS_CODES),
    arraysEqual(reference.guardConditionCodes, GUARD_CONDITION_CODES),
    reference.requestShapeFieldCount === REQUEST_SHAPE_FIELDS.length,
    reference.responseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length,
    reference.failureMappingCount === FAILURE_CLASS_CODES.length,
    reference.guardConditionCount === GUARD_CONDITION_CODES.length,
    reference.sourceNodeV263Ready,
    reference.sourceVerificationMode
      === "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only",
    reference.sourceSpan === "Node v262 + Java v106 + mini-kv v115",
    reference.sourceCheckCount === reference.sourcePassedCheckCount,
    reference.sourceCheckCount === 19,
    reference.checkCount === reference.passedCheckCount,
    reference.checkCount === 20,
    reference.productionBlockerCount === 0,
    reference.warningCount === 2,
    reference.recommendationCount === 2,
  ].every(Boolean);
}

function nodeV264BoundaryClosed(
  reference: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
): boolean {
  return [
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
    reference.fakeResolverProbeCovered,
    reference.fakeResolverProbeNoCredentialRead,
    reference.fakeResolverProbeNoExternalRequest,
    reference.fakeResolverProbeNoProductionWrite,
  ].every(Boolean);
}

function javaV107ContractReady(
  reference: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
): boolean {
  return [
    reference.evidencePresent,
    reference.verificationDocumented,
    reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v29",
    reference.markerField === "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker",
    reference.consumedNodeVersion === "Node v264",
    reference.consumedNodeProfile
      === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1",
    reference.nextNodeConsumerVersion === "Node v265",
    reference.sourceSpan === "Node v264 credential resolver test-only shell contract",
    reference.shellMode === "test-only-fake-resolver-contract",
    reference.shellName === "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell",
    reference.resolverKind === "fake-in-memory",
    reference.requestShapeFieldCount === 9,
    reference.responseShapeFieldCount === 13,
    reference.failureMappingCount === 7,
    reference.guardConditionCount === 10,
    reference.fakeResolverProbeCount === 1,
    reference.requestShapeEchoed,
    reference.responseShapeEchoed,
    reference.failureMappingEchoed,
    reference.guardConditionsEchoed,
    reference.fakeResolverProbeEchoed,
    reference.fakeResolverOnlyEchoed,
    reference.sideEffectBoundaryClosed,
  ].every(Boolean);
}

function javaV107BoundaryClosed(
  reference: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
): boolean {
  return [
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
    !reference.productionRecordWritten,
    !reference.readyForManagedAuditSandboxAdapterConnection,
  ].every(Boolean);
}

export function createSourceNodeV264(
  config: AppConfig,
): SourceNodeV264CredentialResolverTestOnlyShellContractReference {
  const source = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract({ config });
  const contract = source.resolverShellContract;
  const reference = {
    sourceVersion: "Node v264" as const,
    profileVersion: source.profileVersion,
    shellContractState: source.shellContractState,
    readyForTestOnlyShellContract:
      source.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract,
    contractDigest: contract.contractDigest,
    shellName: contract.shellName,
    shellMode: contract.shellMode,
    resolverKind: contract.resolverKind,
    testOnlyShell: source.testOnlyShell,
    readOnlyContract: source.readOnlyContract,
    fakeResolverOnly: source.fakeResolverOnly,
    handleOnlyRequest: source.handleOnlyRequest,
    requestShapeFieldCount: contract.requestShapeFieldCount,
    responseShapeFieldCount: contract.responseShapeFieldCount,
    failureMappingCount: contract.failureMappingCount,
    guardConditionCount: contract.guardConditionCount,
    requestShapeFields: contract.requestShape.fields,
    responseShapeFields: contract.responseShape.fields,
    failureClassCodes: contract.failureMapping.map((mapping) => mapping.sourceFailureCode),
    guardConditionCodes: contract.guardConditions.map((guard) => guard.code),
    sourceNodeV263Ready: source.sourceNodeV263.readyForNodeV264CredentialResolverTestOnlyShellContract,
    sourceVerificationMode: source.sourceNodeV263.verificationMode,
    sourceSpan: source.sourceNodeV263.sourceSpan,
    sourceCheckCount: source.sourceNodeV263.checkCount,
    sourcePassedCheckCount: source.sourceNodeV263.passedCheckCount,
    sourceProductionBlockerCount: source.sourceNodeV263.productionBlockerCount,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
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
    fakeResolverProbeCovered: source.checks.fakeResolverProbeCovered,
    fakeResolverProbeNoCredentialRead: source.checks.fakeResolverProbeNoCredentialRead,
    fakeResolverProbeNoExternalRequest: source.checks.fakeResolverProbeNoExternalRequest,
    fakeResolverProbeNoProductionWrite: source.checks.fakeResolverProbeNoProductionWrite,
    readyForNodeV265TestOnlyShellUpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV265TestOnlyShellUpstreamEchoVerification:
      [nodeV264ContractReady(reference), nodeV264BoundaryClosed(reference)].every(Boolean),
  };
}

export function createJavaV107Reference(): JavaV107CredentialResolverTestOnlyShellEchoMarkerReference {
  const evidenceFiles = [
    evidenceFile("java-v107-runbook", JAVA_V107_RUNBOOK),
    evidenceFile("java-v107-walkthrough", JAVA_V107_WALKTHROUGH),
    evidenceFile("java-v107-marker-builder", JAVA_V107_MARKER_BUILDER),
    evidenceFile("java-v107-contract-builder", JAVA_V107_CONTRACT_BUILDER),
  ];
  const expectedSnippets = [
    snippet("java-v107-marker-field", JAVA_V107_RUNBOOK, "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker"),
    snippet("java-v107-response-schema", JAVA_V107_RUNBOOK, "java-release-approval-rehearsal-response-schema.v29"),
    snippet("java-v107-node-v264", JAVA_V107_RUNBOOK, "Node v264"),
    snippet("java-v107-node-v265", JAVA_V107_MARKER_BUILDER, "readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification"),
    snippet("java-v107-source-span", JAVA_V107_MARKER_BUILDER, "Node v264 credential resolver test-only shell contract"),
    snippet("java-v107-shell-mode", JAVA_V107_CONTRACT_BUILDER, "test-only-fake-resolver-contract"),
    snippet("java-v107-shell-name", JAVA_V107_CONTRACT_BUILDER, "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell"),
    snippet("java-v107-resolver-kind", JAVA_V107_CONTRACT_BUILDER, "fake-in-memory"),
    snippet("java-v107-request-count", JAVA_V107_MARKER_BUILDER, "resolverShellContract.requestShapeFieldCount=9"),
    snippet("java-v107-response-count", JAVA_V107_MARKER_BUILDER, "resolverShellContract.responseShapeFieldCount=13"),
    snippet("java-v107-failure-count", JAVA_V107_MARKER_BUILDER, "resolverShellContract.failureMappingCount=7"),
    snippet("java-v107-guard-count", JAVA_V107_MARKER_BUILDER, "resolverShellContract.guardConditionCount=10"),
    snippet("java-v107-fake-only", JAVA_V107_MARKER_BUILDER, "resolverShellContract.fakeResolverOnly=true"),
    snippet("java-v107-credential-value-blocked", JAVA_V107_MARKER_BUILDER, "resolverShellContract.requestShape.credentialValueAccepted=false"),
    snippet("java-v107-raw-endpoint-blocked", JAVA_V107_MARKER_BUILDER, "resolverShellContract.requestShape.rawEndpointUrlAccepted=false"),
    snippet("java-v107-resolver-client-blocked", JAVA_V107_MARKER_BUILDER, "resolverShellContract.responseShape.resolverClientInstantiated=false"),
    snippet("java-v107-secret-provider-blocked", JAVA_V107_MARKER_BUILDER, "resolverShellContract.responseShape.secretProviderInstantiated=false"),
    snippet("java-v107-external-blocked", JAVA_V107_MARKER_BUILDER, "resolverShellContract.responseShape.externalRequestSent=false"),
    snippet("java-v107-fake-probe-credential", JAVA_V107_MARKER_BUILDER, "fakeResolverProbe.credentialValueRead=false"),
    snippet("java-v107-side-effect-connection", JAVA_V107_MARKER_BUILDER, "sideEffectBoundary.connectsManagedAudit=false"),
    snippet("java-v107-code-request-fields", JAVA_V107_CONTRACT_BUILDER, "REQUEST_SHAPE_FIELDS = List.of"),
    snippet("java-v107-code-response-fields", JAVA_V107_CONTRACT_BUILDER, "RESPONSE_SHAPE_FIELDS = List.of"),
    snippet("java-v107-code-failure-codes", JAVA_V107_CONTRACT_BUILDER, "FAILURE_CLASS_CODES = List.of"),
    snippet("java-v107-code-guard-codes", JAVA_V107_CONTRACT_BUILDER, "GUARD_CONDITION_CODES = List.of"),
    snippet("java-v107-no-real-resolver", JAVA_V107_RUNBOOK, "不实现真实 resolver"),
    snippet("java-v107-walkthrough-summary", JAVA_V107_WALKTHROUGH, "给 Node v265 upstream echo verification 一个稳定字段"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "Java v107" as const,
    tagLabel: "v107订单平台test-only-resolver-shell-echo-marker",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    ...mapSnippetFields(expectedSnippets, JAVA_V107_IDENTITY_FIELDS),
    requestShapeEchoed:
      snippetsMatched(expectedSnippets, [
        "java-v107-code-request-fields",
        "java-v107-credential-value-blocked",
        "java-v107-raw-endpoint-blocked",
      ]),
    responseShapeEchoed:
      snippetsMatched(expectedSnippets, [
        "java-v107-code-response-fields",
        "java-v107-resolver-client-blocked",
        "java-v107-secret-provider-blocked",
        "java-v107-external-blocked",
      ]),
    ...mapSnippetFields(expectedSnippets, JAVA_V107_ECHO_FIELDS),
    credentialResolverExecutionAllowed: false,
    ...mapSnippetFields(expectedSnippets, JAVA_V107_CONNECTION_FIELDS),
    credentialValueLoaded: false,
    credentialValueStored: false,
    credentialValueIncluded: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    ...mapSnippetFields(expectedSnippets, JAVA_V107_RUNTIME_FIELDS),
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    productionRecordWritten: false,
    readyForManagedAuditSandboxAdapterConnection: false as const,
    readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification:
      [javaV107ContractReady(reference), javaV107BoundaryClosed(reference)].every(Boolean),
  };
}

export function createMiniKvV116Reference(): MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v116-receipt", MINI_KV_V116_RECEIPT),
    evidenceFile("mini-kv-v116-runbook", MINI_KV_V116_RUNBOOK),
    evidenceFile("mini-kv-v116-walkthrough", MINI_KV_V116_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v116-receipt-version", MINI_KV_V116_RECEIPT, "mini-kv-test-only-resolver-shell-non-participation-receipt.v1"),
    snippet("mini-kv-v116-consumer", MINI_KV_V116_RECEIPT, "Node v265 test-only resolver shell upstream echo verification"),
    snippet("mini-kv-v116-source-profile", MINI_KV_V116_RECEIPT, "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1"),
    snippet("mini-kv-v116-source-route", MINI_KV_V116_RECEIPT, "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract"),
    snippet("mini-kv-v116-source-state", MINI_KV_V116_RECEIPT, "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready"),
    snippet("mini-kv-v116-source-mode", MINI_KV_V116_RECEIPT, "test-only-fake-resolver-contract"),
    snippet("mini-kv-v116-request-count", MINI_KV_V116_RECEIPT, "\"source_request_shape_field_count\":9"),
    snippet("mini-kv-v116-response-count", MINI_KV_V116_RECEIPT, "\"source_response_shape_field_count\":13"),
    snippet("mini-kv-v116-failure-count", MINI_KV_V116_RECEIPT, "\"source_failure_mapping_count\":7"),
    snippet("mini-kv-v116-guard-count", MINI_KV_V116_RECEIPT, "\"source_guard_condition_count\":10"),
    snippet("mini-kv-v116-no-resolver-client", MINI_KV_V116_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v116-no-secret-provider", MINI_KV_V116_RECEIPT, "\"secret_provider_instantiated\":false"),
    snippet("mini-kv-v116-no-credential", MINI_KV_V116_RECEIPT, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v116-no-raw-endpoint", MINI_KV_V116_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v116-no-external", MINI_KV_V116_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v116-no-load", MINI_KV_V116_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v116-runbook", MINI_KV_V116_RUNBOOK, "Node v265"),
    snippet("mini-kv-v116-walkthrough", MINI_KV_V116_WALKTHROUGH, "Node v265"),
  ];
  const reference: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference = {
    sourceVersion: "mini-kv v116",
    tagLabel: "第一百一十六版测试解析器壳非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    ...readV116Fields(readJsonObject(MINI_KV_V116_RECEIPT)),
    readyForNodeV265Alignment: false,
  };
  return { ...reference, readyForNodeV265Alignment: isV116Ready(reference) };
}

export function createJavaV109OptimizationContext(): JavaV109RehearsalResponseRecordsSplitOptimizationContext {
  const evidenceFiles = [
    evidenceFile("java-v109-runbook", JAVA_V109_RUNBOOK),
    evidenceFile("java-v109-walkthrough", JAVA_V109_WALKTHROUGH),
    evidenceFile("java-v109-records", JAVA_V109_RECORDS),
  ];
  const expectedSnippets = [
    snippet("java-v109-records-split", JAVA_V109_RUNBOOK, "ReleaseApprovalRehearsalResponseRecords"),
    snippet("java-v109-main-shell", JAVA_V109_RUNBOOK, "主响应文件只保留 68 行壳"),
    snippet("java-v109-no-business-marker", JAVA_V109_RUNBOOK, "v109 不新增业务 marker"),
    snippet("java-v109-no-boundary-change", JAVA_V109_RUNBOOK, "不碰 managed-audit 边界"),
    snippet("java-v109-records-class", JAVA_V109_RECORDS, "public final class ReleaseApprovalRehearsalResponseRecords"),
    snippet("java-v109-walkthrough", JAVA_V109_WALKTHROUGH, "主响应类只保留顶层字段壳"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const optimizationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);

  return {
    sourceVersion: "Java v109",
    tagLabel: "v109订单平台rehearsal-response-records拆分",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    optimizationDocumented,
    optimizationOnly: true,
    hardPrerequisiteForNodeV265: false,
    businessMarkerAdded: false,
    managedAuditBoundaryChanged: false,
    responseRecordsSplit: snippetMatched(expectedSnippets, "java-v109-records-split"),
    releaseApprovalRehearsalResponseRecordsPresent: snippetMatched(expectedSnippets, "java-v109-records-class"),
    mainResponseShellLineCount: snippetMatched(expectedSnippets, "java-v109-main-shell") ? 68 : 0,
    alignedWithNodeV265:
      evidencePresent
      && optimizationDocumented
      && snippetMatched(expectedSnippets, "java-v109-no-business-marker")
      && snippetMatched(expectedSnippets, "java-v109-no-boundary-change"),
  };
}

export function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
