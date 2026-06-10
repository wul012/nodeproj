import type { AppConfig } from "../config.js";
import {
  booleanField,
  evidenceFile,
  numberField,
  objectArrayField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringArrayField,
  stringField,
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
  NODE_V264_ROUTE,
  REQUEST_SHAPE_FIELDS,
  RESPONSE_SHAPE_FIELDS,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationConstants.js";
import type {
  JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  JavaV109RehearsalResponseRecordsSplitOptimizationContext,
  MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
  SourceNodeV264CredentialResolverTestOnlyShellContractReference,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationTypes.js";

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
      reference.readyForTestOnlyShellContract
      && reference.shellContractState === "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready"
      && reference.profileVersion
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1"
      && reference.shellMode === "test-only-fake-resolver-contract"
      && reference.resolverKind === "fake-in-memory"
      && reference.testOnlyShell
      && reference.readOnlyContract
      && reference.fakeResolverOnly
      && reference.handleOnlyRequest
      && arraysEqual(reference.requestShapeFields, REQUEST_SHAPE_FIELDS)
      && arraysEqual(reference.responseShapeFields, RESPONSE_SHAPE_FIELDS)
      && arraysEqual(reference.failureClassCodes, FAILURE_CLASS_CODES)
      && arraysEqual(reference.guardConditionCodes, GUARD_CONDITION_CODES)
      && reference.requestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
      && reference.responseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
      && reference.failureMappingCount === FAILURE_CLASS_CODES.length
      && reference.guardConditionCount === GUARD_CONDITION_CODES.length
      && reference.sourceNodeV263Ready
      && reference.sourceVerificationMode
        === "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only"
      && reference.sourceSpan === "Node v262 + Java v106 + mini-kv v115"
      && reference.sourceCheckCount === reference.sourcePassedCheckCount
      && reference.sourceCheckCount === 19
      && reference.checkCount === reference.passedCheckCount
      && reference.checkCount === 20
      && reference.productionBlockerCount === 0
      && reference.warningCount === 2
      && reference.recommendationCount === 2
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
      && reference.fakeResolverProbeCovered
      && reference.fakeResolverProbeNoCredentialRead
      && reference.fakeResolverProbeNoExternalRequest
      && reference.fakeResolverProbeNoProductionWrite,
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
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v107-response-schema")
      ? "java-release-approval-rehearsal-response-schema.v29" as const
      : "missing" as const,
    markerField: snippetMatched(expectedSnippets, "java-v107-marker-field")
      ? "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker" as const
      : "missing" as const,
    consumedNodeVersion: snippetMatched(expectedSnippets, "java-v107-node-v264") ? "Node v264" as const : "missing" as const,
    consumedNodeProfile: snippetMatched(expectedSnippets, "java-v107-node-v264")
      ? "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1"
      : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v107-node-v265") ? "Node v265" as const : "missing" as const,
    sourceSpan: snippetMatched(expectedSnippets, "java-v107-source-span")
      ? "Node v264 credential resolver test-only shell contract"
      : "missing",
    shellMode: snippetMatched(expectedSnippets, "java-v107-shell-mode") ? "test-only-fake-resolver-contract" : "missing",
    shellName: snippetMatched(expectedSnippets, "java-v107-shell-name")
      ? "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell"
      : "missing",
    resolverKind: snippetMatched(expectedSnippets, "java-v107-resolver-kind") ? "fake-in-memory" : "missing",
    requestShapeFieldCount: snippetMatched(expectedSnippets, "java-v107-request-count") ? 9 : 0,
    responseShapeFieldCount: snippetMatched(expectedSnippets, "java-v107-response-count") ? 13 : 0,
    failureMappingCount: snippetMatched(expectedSnippets, "java-v107-failure-count") ? 7 : 0,
    guardConditionCount: snippetMatched(expectedSnippets, "java-v107-guard-count") ? 10 : 0,
    fakeResolverProbeCount: snippetMatched(expectedSnippets, "java-v107-fake-probe-credential") ? 1 : 0,
    requestShapeEchoed:
      snippetMatched(expectedSnippets, "java-v107-code-request-fields")
      && snippetMatched(expectedSnippets, "java-v107-credential-value-blocked")
      && snippetMatched(expectedSnippets, "java-v107-raw-endpoint-blocked"),
    responseShapeEchoed:
      snippetMatched(expectedSnippets, "java-v107-code-response-fields")
      && snippetMatched(expectedSnippets, "java-v107-resolver-client-blocked")
      && snippetMatched(expectedSnippets, "java-v107-secret-provider-blocked")
      && snippetMatched(expectedSnippets, "java-v107-external-blocked"),
    failureMappingEchoed: snippetMatched(expectedSnippets, "java-v107-code-failure-codes"),
    guardConditionsEchoed: snippetMatched(expectedSnippets, "java-v107-code-guard-codes"),
    fakeResolverProbeEchoed: snippetMatched(expectedSnippets, "java-v107-fake-probe-credential"),
    fakeResolverOnlyEchoed: snippetMatched(expectedSnippets, "java-v107-fake-only"),
    sideEffectBoundaryClosed: snippetMatched(expectedSnippets, "java-v107-side-effect-connection"),
    credentialResolverExecutionAllowed: false,
    connectsManagedAudit: !snippetMatched(expectedSnippets, "java-v107-side-effect-connection"),
    credentialValueRead: !snippetMatched(expectedSnippets, "java-v107-fake-probe-credential"),
    credentialValueLoaded: false,
    credentialValueStored: false,
    credentialValueIncluded: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    externalRequestSent: !snippetMatched(expectedSnippets, "java-v107-external-blocked"),
    secretProviderInstantiated: !snippetMatched(expectedSnippets, "java-v107-secret-provider-blocked"),
    resolverClientInstantiated: !snippetMatched(expectedSnippets, "java-v107-resolver-client-blocked"),
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    productionRecordWritten: false,
    readyForManagedAuditSandboxAdapterConnection: false as const,
    readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v29"
      && reference.markerField === "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker"
      && reference.consumedNodeVersion === "Node v264"
      && reference.consumedNodeProfile
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1"
      && reference.nextNodeConsumerVersion === "Node v265"
      && reference.sourceSpan === "Node v264 credential resolver test-only shell contract"
      && reference.shellMode === "test-only-fake-resolver-contract"
      && reference.shellName === "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell"
      && reference.resolverKind === "fake-in-memory"
      && reference.requestShapeFieldCount === 9
      && reference.responseShapeFieldCount === 13
      && reference.failureMappingCount === 7
      && reference.guardConditionCount === 10
      && reference.fakeResolverProbeCount === 1
      && reference.requestShapeEchoed
      && reference.responseShapeEchoed
      && reference.failureMappingEchoed
      && reference.guardConditionsEchoed
      && reference.fakeResolverProbeEchoed
      && reference.fakeResolverOnlyEchoed
      && reference.sideEffectBoundaryClosed
      && !reference.credentialResolverExecutionAllowed
      && !reference.connectsManagedAudit
      && !reference.credentialValueRead
      && !reference.credentialValueLoaded
      && !reference.credentialValueStored
      && !reference.credentialValueIncluded
      && !reference.rawEndpointUrlParsed
      && !reference.rawEndpointUrlIncluded
      && !reference.externalRequestSent
      && !reference.secretProviderInstantiated
      && !reference.resolverClientInstantiated
      && !reference.schemaMigrationExecuted
      && !reference.automaticUpstreamStart
      && !reference.productionRecordWritten
      && !reference.readyForManagedAuditSandboxAdapterConnection,
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
  const root = readJsonObject(MINI_KV_V116_RECEIPT);
  const receipt = objectField(root, "test_only_resolver_shell_non_participation_receipt");
  const requestShape = objectField(receipt, "request_shape");
  const responseShape = objectField(receipt, "response_shape");
  const fakeResolverProbe = objectField(receipt, "fake_resolver_probe");
  const sourceFailureCodes = objectArrayField(receipt, "failure_mapping")
    .map((mapping) => stringField(mapping, "source_failure_code"))
    .filter(isNonNullString);
  const guardConditionCodes = objectArrayField(receipt, "guard_conditions")
    .map((guard) => stringField(guard, "code"))
    .filter(isNonNullString);
  const reference = {
    sourceVersion: "mini-kv v116" as const,
    tagLabel: "第一百一十六版测试解析器壳非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptVersion: stringField(root, "receipt_version") ?? "",
    releaseVersion: stringField(root, "release_version") ?? "",
    consumerHint: stringField(root, "consumer_hint") ?? "",
    receiptDigest: stringField(receipt, "receipt_digest") ?? "",
    sourceContractProfileVersion: stringField(receipt, "source_contract_profile_version") ?? "",
    sourceContractRoutePath: stringField(receipt, "source_contract_route_path") ?? "",
    sourceContractState: stringField(receipt, "source_contract_state") ?? "",
    sourceShellMode: stringField(receipt, "source_shell_mode") ?? "",
    sourceShellName: stringField(receipt, "source_shell_name") ?? "",
    sourceResolverKind: stringField(receipt, "source_resolver_kind") ?? "",
    sourceReadyForTestOnlyResolverShellContract:
      booleanField(receipt, "source_ready_for_test_only_resolver_shell_contract") ?? false,
    sourceTestOnlyShell: booleanField(receipt, "source_test_only_shell") ?? false,
    sourceReadOnlyContract: booleanField(receipt, "source_read_only_contract") ?? false,
    sourceFakeResolverOnly: booleanField(receipt, "source_fake_resolver_only") ?? false,
    sourceHandleOnlyRequest: booleanField(receipt, "source_handle_only_request") ?? false,
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection") ?? true,
    sourceReadyForProductionAudit: booleanField(receipt, "source_ready_for_production_audit") ?? true,
    sourceReadyForProductionWindow: booleanField(receipt, "source_ready_for_production_window") ?? true,
    sourceCredentialResolverExecutionAllowed:
      booleanField(receipt, "source_credential_resolver_execution_allowed") ?? true,
    sourceExecutionAllowed: booleanField(receipt, "source_execution_allowed") ?? true,
    sourceConnectsManagedAudit: booleanField(receipt, "source_connects_managed_audit") ?? true,
    sourceReadsManagedAuditCredential: booleanField(receipt, "source_reads_managed_audit_credential") ?? true,
    sourceStoresManagedAuditCredential: booleanField(receipt, "source_stores_managed_audit_credential") ?? true,
    sourceCredentialValueRead: booleanField(receipt, "source_credential_value_read") ?? true,
    sourceCredentialValueLoaded: booleanField(receipt, "source_credential_value_loaded") ?? true,
    sourceCredentialValueStored: booleanField(receipt, "source_credential_value_stored") ?? true,
    sourceCredentialValueIncluded: booleanField(receipt, "source_credential_value_included") ?? true,
    sourceRawEndpointUrlParsed: booleanField(receipt, "source_raw_endpoint_url_parsed") ?? true,
    sourceRawEndpointUrlIncluded: booleanField(receipt, "source_raw_endpoint_url_included") ?? true,
    sourceExternalRequestSent: booleanField(receipt, "source_external_request_sent") ?? true,
    sourceSecretProviderInstantiated: booleanField(receipt, "source_secret_provider_instantiated") ?? true,
    sourceResolverClientInstantiated: booleanField(receipt, "source_resolver_client_instantiated") ?? true,
    sourceSchemaMigrationExecuted: booleanField(receipt, "source_schema_migration_executed") ?? true,
    sourceAutomaticUpstreamStart: booleanField(receipt, "source_automatic_upstream_start") ?? true,
    sourceProductionRecordWritten: booleanField(receipt, "source_production_record_written") ?? true,
    sourceRequestShapeFieldCount: numberField(receipt, "source_request_shape_field_count") ?? 0,
    sourceResponseShapeFieldCount: numberField(receipt, "source_response_shape_field_count") ?? 0,
    sourceFailureMappingCount: numberField(receipt, "source_failure_mapping_count") ?? 0,
    sourceGuardConditionCount: numberField(receipt, "source_guard_condition_count") ?? 0,
    sourceCheckCount: numberField(receipt, "source_check_count") ?? 0,
    sourcePassedCheckCount: numberField(receipt, "source_passed_check_count") ?? 0,
    sourceProductionBlockerCount: numberField(receipt, "source_production_blocker_count") ?? -1,
    sourceWarningCount: numberField(receipt, "source_warning_count") ?? -1,
    sourceRecommendationCount: numberField(receipt, "source_recommendation_count") ?? -1,
    sourceNodeV263Ready: booleanField(receipt, "source_node_v263_ready") ?? false,
    sourceNodeV263VerificationMode: stringField(receipt, "source_node_v263_verification_mode") ?? "",
    sourceNodeV263Span: stringField(receipt, "source_node_v263_span") ?? "",
    sourceNodeV263CheckCount: numberField(receipt, "source_node_v263_check_count") ?? 0,
    sourceNodeV263PassedCheckCount: numberField(receipt, "source_node_v263_passed_check_count") ?? 0,
    sourceNodeV263ProductionBlockerCount: numberField(receipt, "source_node_v263_production_blocker_count") ?? -1,
    requestShapeFields: stringArrayField(requestShape, "fields"),
    responseShapeFields: stringArrayField(responseShape, "fields"),
    failureClassCodes: sourceFailureCodes,
    guardConditionCodes,
    fakeResolverProbeRequestId: stringField(fakeResolverProbe, "request_id") ?? "",
    fakeResolverProbeAcceptedByFakeResolver: booleanField(fakeResolverProbe, "accepted_by_fake_resolver") ?? false,
    fakeResolverProbeNoCredentialRead: !(booleanField(fakeResolverProbe, "credential_value_read") ?? true),
    fakeResolverProbeNoExternalRequest: !(booleanField(fakeResolverProbe, "external_request_sent") ?? true),
    fakeResolverProbeNoProductionWrite: !(booleanField(fakeResolverProbe, "production_record_written") ?? true),
    readOnly: booleanField(receipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? true,
    dryRunOnly: booleanField(receipt, "dry_run_only") ?? false,
    testOnlyResolverShellContractOnly:
      booleanField(receipt, "test_only_resolver_shell_contract_only") ?? false,
    testOnlyShell: booleanField(receipt, "test_only_shell") ?? false,
    fakeResolverOnly: booleanField(receipt, "fake_resolver_only") ?? false,
    handleOnlyRequest: booleanField(receipt, "handle_only_request") ?? false,
    credentialResolverImplemented: booleanField(receipt, "credential_resolver_implemented") ?? true,
    credentialResolverInvoked: booleanField(receipt, "credential_resolver_invoked") ?? true,
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated") ?? true,
    resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated") ?? true,
    nodeAutoStartAllowed: booleanField(receipt, "node_auto_start_allowed") ?? true,
    javaAutoStartAllowed: booleanField(receipt, "java_auto_start_allowed") ?? true,
    miniKvAutoStartAllowed: booleanField(receipt, "mini_kv_auto_start_allowed") ?? true,
    externalAuditServiceAutoStartAllowed: booleanField(receipt, "external_audit_service_auto_start_allowed") ?? true,
    connectionExecutionAllowed: booleanField(receipt, "connection_execution_allowed") ?? true,
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed") ?? true,
    managedAuditWriteExecuted: booleanField(receipt, "managed_audit_write_executed") ?? true,
    approvalLedgerWriteAllowed: booleanField(receipt, "approval_ledger_write_allowed") ?? true,
    approvalLedgerWriteExecuted: booleanField(receipt, "approval_ledger_write_executed") ?? true,
    sandboxManagedAuditStateWriteAllowed: booleanField(receipt, "sandbox_managed_audit_state_write_allowed") ?? true,
    credentialValueRequired: booleanField(receipt, "credential_value_required") ?? true,
    credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed") ?? true,
    credentialValueLoaded: booleanField(receipt, "credential_value_loaded") ?? true,
    credentialValueStored: booleanField(receipt, "credential_value_stored") ?? true,
    credentialValueIncluded: booleanField(receipt, "credential_value_included") ?? true,
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed") ?? true,
    rawEndpointUrlIncluded: booleanField(receipt, "raw_endpoint_url_included") ?? true,
    externalRequestSent: booleanField(receipt, "external_request_sent") ?? true,
    schemaRehearsalExecutionAllowed: booleanField(receipt, "schema_rehearsal_execution_allowed") ?? true,
    schemaMigrationExecutionAllowed: booleanField(receipt, "schema_migration_execution_allowed") ?? true,
    restoreExecutionAllowed: booleanField(receipt, "restore_execution_allowed") ?? true,
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed") ?? true,
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed") ?? true,
    managedAuditStore: booleanField(receipt, "managed_audit_store") ?? true,
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend") ?? true,
    sandboxAuditStorageBackend: booleanField(receipt, "sandbox_audit_storage_backend") ?? true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") ?? true,
    fakeResolverProbeExecuted: booleanField(receipt, "fake_resolver_probe_executed") ?? true,
    readyForNodeV265Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV265Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.receiptVersion === "mini-kv-test-only-resolver-shell-non-participation-receipt.v1"
      && reference.releaseVersion === "v116"
      && reference.consumerHint === "Node v265 test-only resolver shell upstream echo verification"
      && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
      && reference.sourceContractProfileVersion
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1"
      && reference.sourceContractRoutePath === NODE_V264_ROUTE
      && reference.sourceContractState === "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready"
      && reference.sourceShellMode === "test-only-fake-resolver-contract"
      && reference.sourceShellName === "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell"
      && reference.sourceResolverKind === "fake-in-memory"
      && reference.sourceReadyForTestOnlyResolverShellContract
      && reference.sourceTestOnlyShell
      && reference.sourceReadOnlyContract
      && reference.sourceFakeResolverOnly
      && reference.sourceHandleOnlyRequest
      && !reference.sourceReadyForManagedAuditSandboxAdapterConnection
      && !reference.sourceReadyForProductionAudit
      && !reference.sourceReadyForProductionWindow
      && !reference.sourceCredentialResolverExecutionAllowed
      && !reference.sourceExecutionAllowed
      && !reference.sourceConnectsManagedAudit
      && !reference.sourceReadsManagedAuditCredential
      && !reference.sourceStoresManagedAuditCredential
      && !reference.sourceCredentialValueRead
      && !reference.sourceCredentialValueLoaded
      && !reference.sourceCredentialValueStored
      && !reference.sourceCredentialValueIncluded
      && !reference.sourceRawEndpointUrlParsed
      && !reference.sourceRawEndpointUrlIncluded
      && !reference.sourceExternalRequestSent
      && !reference.sourceSecretProviderInstantiated
      && !reference.sourceResolverClientInstantiated
      && !reference.sourceSchemaMigrationExecuted
      && !reference.sourceAutomaticUpstreamStart
      && !reference.sourceProductionRecordWritten
      && reference.sourceRequestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
      && reference.sourceResponseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
      && reference.sourceFailureMappingCount === FAILURE_CLASS_CODES.length
      && reference.sourceGuardConditionCount === GUARD_CONDITION_CODES.length
      && reference.sourceCheckCount === reference.sourcePassedCheckCount
      && reference.sourceCheckCount === 20
      && reference.sourceProductionBlockerCount === 0
      && reference.sourceWarningCount === 2
      && reference.sourceRecommendationCount === 2
      && reference.sourceNodeV263Ready
      && reference.sourceNodeV263VerificationMode
        === "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only"
      && reference.sourceNodeV263Span === "Node v262 + Java v106 + mini-kv v115"
      && reference.sourceNodeV263CheckCount === reference.sourceNodeV263PassedCheckCount
      && reference.sourceNodeV263CheckCount === 19
      && reference.sourceNodeV263ProductionBlockerCount === 0
      && arraysEqual(reference.requestShapeFields, REQUEST_SHAPE_FIELDS)
      && arraysEqual(reference.responseShapeFields, RESPONSE_SHAPE_FIELDS)
      && arraysEqual(reference.failureClassCodes, FAILURE_CLASS_CODES)
      && arraysEqual(reference.guardConditionCodes, GUARD_CONDITION_CODES)
      && reference.fakeResolverProbeRequestId === "managed-audit-v264-test-only-resolver-shell-probe"
      && reference.fakeResolverProbeAcceptedByFakeResolver
      && reference.fakeResolverProbeNoCredentialRead
      && reference.fakeResolverProbeNoExternalRequest
      && reference.fakeResolverProbeNoProductionWrite
      && reference.readOnly
      && !reference.executionAllowed
      && reference.dryRunOnly
      && reference.testOnlyResolverShellContractOnly
      && reference.testOnlyShell
      && reference.fakeResolverOnly
      && reference.handleOnlyRequest
      && !reference.credentialResolverImplemented
      && !reference.credentialResolverInvoked
      && !reference.secretProviderInstantiated
      && !reference.resolverClientInstantiated
      && !reference.nodeAutoStartAllowed
      && !reference.javaAutoStartAllowed
      && !reference.miniKvAutoStartAllowed
      && !reference.externalAuditServiceAutoStartAllowed
      && !reference.connectionExecutionAllowed
      && !reference.storageWriteAllowed
      && !reference.managedAuditWriteExecuted
      && !reference.approvalLedgerWriteAllowed
      && !reference.approvalLedgerWriteExecuted
      && !reference.sandboxManagedAuditStateWriteAllowed
      && !reference.credentialValueRequired
      && !reference.credentialValueReadAllowed
      && !reference.credentialValueLoaded
      && !reference.credentialValueStored
      && !reference.credentialValueIncluded
      && !reference.rawEndpointUrlParsed
      && !reference.rawEndpointUrlIncluded
      && !reference.externalRequestSent
      && !reference.schemaRehearsalExecutionAllowed
      && !reference.schemaMigrationExecutionAllowed
      && !reference.restoreExecutionAllowed
      && !reference.loadRestoreCompactExecuted
      && !reference.setnxexExecutionAllowed
      && !reference.managedAuditStore
      && !reference.managedAuditStorageBackend
      && !reference.sandboxAuditStorageBackend
      && !reference.orderAuthoritative
      && !reference.fakeResolverProbeExecuted,
  };
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

function isNonNullString(value: string | null): value is string {
  return value !== null;
}

export function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
