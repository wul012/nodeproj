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
      reference.readyForDisabledPrecheck
      && reference.precheckState === "sandbox-endpoint-credential-resolver-disabled-precheck-ready"
      && reference.precheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
      && reference.sourceNodeV261Ready
      && reference.sourceVerificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"
      && reference.sourceSpan === "Node v260 + Java v105 + mini-kv v114"
      && reference.sourceBlocksCredentialResolution
      && reference.sourceCredentialBoundaryAligned
      && reference.sourceRawEndpointBoundaryAligned
      && reference.sourceConnectionBoundaryAligned
      && reference.sourceWriteBoundaryAligned
      && reference.sourceAutoStartBoundaryAligned
      && reference.upstreamActionsStillDisabled
      && reference.resolverImplementationStatus === "not-implemented"
      && reference.secretProviderImplementationStatus === "not-implemented"
      && reference.requiredEnvHandleCount === REQUIRED_ENV_HANDLE_NAMES.length
      && reference.optInGateCount === OPT_IN_GATE_NAMES.length
      && reference.failureClassCount === FAILURE_CLASS_CODES.length
      && reference.dryRunResponseFieldCount === DRY_RUN_RESPONSE_FIELDS.length
      && reference.inheritedNoGoConditionCount === INHERITED_NO_GO_CONDITIONS.length
      && arraysEqual(reference.requiredEnvHandleNames, [...REQUIRED_ENV_HANDLE_NAMES])
      && arraysEqual(reference.optInGateNames, [...OPT_IN_GATE_NAMES])
      && arraysEqual(reference.failureClassCodes, [...FAILURE_CLASS_CODES])
      && arraysEqual(reference.dryRunResponseFields, [...DRY_RUN_RESPONSE_FIELDS])
      && arraysEqual([...reference.inheritedNoGoConditions], [...INHERITED_NO_GO_CONDITIONS])
      && !reference.resolverClientMayBeInstantiated
      && !reference.secretProviderMayBeInstantiated
      && !reference.credentialValueMayBeLoaded
      && !reference.rawEndpointUrlMayBeParsed
      && !reference.externalRequestMayBeSent
      && reference.optInGateRequired
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
      && reference.checkCount === reference.passedCheckCount
      && reference.checkCount === 24
      && reference.productionBlockerCount === 0
      && reference.warningCount === 2
      && reference.recommendationCount === 2,
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
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v106-response-schema")
      ? "java-release-approval-rehearsal-response-schema.v28" as const
      : "missing" as const,
    markerField: snippetMatched(expectedSnippets, "java-v106-marker-field")
      ? "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker" as const
      : "missing" as const,
    consumedNodeVersion: snippetMatched(expectedSnippets, "java-v106-node-v262") ? "Node v262" as const : "missing" as const,
    consumedNodeProfile: snippetMatched(expectedSnippets, "java-v106-node-v262")
      ? "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1"
      : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v106-node-v263") ? "Node v263" as const : "missing" as const,
    precheckMode: snippetMatched(expectedSnippets, "java-v106-precheck-mode")
      ? "sandbox-endpoint-credential-resolver-disabled-precheck-only"
      : "missing",
    sourceSpan: snippetMatched(expectedSnippets, "java-v106-source-span")
      ? "Node v261 credential resolver upstream echo verification"
      : "missing",
    sourceVerificationMode: snippetMatched(expectedSnippets, "java-v106-source-mode")
      ? "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"
      : "missing",
    sourceNodeV261Span: snippetMatched(expectedSnippets, "java-v106-source-span")
      ? "Node v260 + Java v105 + mini-kv v114"
      : "missing",
    requiredEnvHandleCount: snippetMatched(expectedSnippets, "java-v106-required-env-count") ? 6 : 0,
    optInGateCount: snippetMatched(expectedSnippets, "java-v106-opt-in-count") ? 2 : 0,
    failureClassCount: snippetMatched(expectedSnippets, "java-v106-failure-count") ? 7 : 0,
    dryRunResponseFieldCount: snippetMatched(expectedSnippets, "java-v106-dry-run-count") ? 12 : 0,
    inheritedNoGoConditionCount: snippetMatched(expectedSnippets, "java-v106-inherited-count") ? 9 : 0,
    sourceCheckCount: snippetMatched(expectedSnippets, "java-v106-source-check-count") ? 20 : 0,
    sourcePassedCheckCount: snippetMatched(expectedSnippets, "java-v106-source-passed-count") ? 20 : 0,
    sourceProductionBlockerCount: 0,
    sourceWarningCount: 2,
    sourceRecommendationCount: 2,
    resolverImplementationStatus: snippetMatched(expectedSnippets, "java-v106-resolver-status") ? "not-implemented" : "missing",
    secretProviderImplementationStatus: snippetMatched(expectedSnippets, "java-v106-secret-status") ? "not-implemented" : "missing",
    resolverClientMayBeInstantiated: !snippetMatched(expectedSnippets, "java-v106-resolver-client-blocked"),
    secretProviderMayBeInstantiated: !snippetMatched(expectedSnippets, "java-v106-secret-provider-blocked"),
    credentialValueMayBeLoaded: !snippetMatched(expectedSnippets, "java-v106-credential-load-blocked"),
    rawEndpointUrlMayBeParsed: !snippetMatched(expectedSnippets, "java-v106-raw-endpoint-blocked"),
    externalRequestMayBeSent: !snippetMatched(expectedSnippets, "java-v106-external-blocked"),
    credentialResolverExecutionAllowed: false,
    connectsManagedAudit: !snippetMatched(expectedSnippets, "java-v106-side-effect-connection"),
    credentialValueRead: false,
    credentialValueLoaded: false,
    credentialValueStored: false,
    credentialValueIncluded: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    externalRequestSent: !snippetMatched(expectedSnippets, "java-v106-side-effect-external"),
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
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v28"
      && reference.markerField === "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker"
      && reference.consumedNodeVersion === "Node v262"
      && reference.consumedNodeProfile
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1"
      && reference.nextNodeConsumerVersion === "Node v263"
      && reference.precheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
      && reference.sourceVerificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"
      && reference.requiredEnvHandleCount === 6
      && reference.optInGateCount === 2
      && reference.failureClassCount === 7
      && reference.dryRunResponseFieldCount === 12
      && reference.inheritedNoGoConditionCount === 9
      && reference.sourceCheckCount === reference.sourcePassedCheckCount
      && reference.sourceCheckCount === 20
      && reference.sourceProductionBlockerCount === 0
      && reference.sourceWarningCount === 2
      && reference.sourceRecommendationCount === 2
      && reference.resolverImplementationStatus === "not-implemented"
      && reference.secretProviderImplementationStatus === "not-implemented"
      && !reference.resolverClientMayBeInstantiated
      && !reference.secretProviderMayBeInstantiated
      && !reference.credentialValueMayBeLoaded
      && !reference.rawEndpointUrlMayBeParsed
      && !reference.externalRequestMayBeSent
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
      && !reference.readyForManagedAuditSandboxAdapterConnection,
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
  const root = readJsonObject(MINI_KV_V115_RECEIPT);
  const receipt = objectField(root, "disabled_credential_resolver_precheck_non_participation_receipt");
  const disabledPrecheck = objectField(receipt, "disabled_precheck");
  const dryRunResponseShape = objectField(receipt, "dry_run_response_shape");
  const requiredEnvHandleNames = objectArrayField(receipt, "required_env_handles")
    .map((handle) => stringField(handle, "name"))
    .filter(isNonNullString);
  const optInGateNames = objectArrayField(receipt, "opt_in_gates")
    .map((gate) => stringField(gate, "gate_name"))
    .filter(isNonNullString);
  const reference = {
    sourceVersion: "mini-kv v115" as const,
    tagLabel: "第一百一十五版禁用凭证解析器预检非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptVersion: stringField(root, "receipt_version") ?? "",
    releaseVersion: stringField(root, "release_version") ?? "",
    consumerHint: stringField(root, "consumer_hint") ?? "",
    receiptDigest: stringField(receipt, "receipt_digest") ?? "",
    sourcePrecheckProfileVersion: stringField(receipt, "source_precheck_profile_version") ?? "",
    sourcePrecheckState: stringField(receipt, "source_precheck_state") ?? "",
    sourcePrecheckMode: stringField(receipt, "source_precheck_mode") ?? "",
    sourceSpan: stringField(receipt, "source_span") ?? "",
    sourceReadyForDisabledPrecheck: booleanField(receipt, "source_ready_for_disabled_credential_resolver_precheck") ?? false,
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection") ?? true,
    sourceReadOnlyDisabledPrecheck: booleanField(receipt, "source_read_only_disabled_precheck") ?? false,
    sourceDisabledCredentialResolverPrecheckOnly:
      booleanField(receipt, "source_disabled_credential_resolver_precheck_only") ?? false,
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
    sourceRequiredEnvHandleCount: numberField(receipt, "source_required_env_handle_count") ?? 0,
    sourceOptInGateCount: numberField(receipt, "source_opt_in_gate_count") ?? 0,
    sourceFailureClassCount: numberField(receipt, "source_failure_class_count") ?? 0,
    sourceDryRunResponseFieldCount: numberField(receipt, "source_dry_run_response_field_count") ?? 0,
    sourceInheritedNoGoConditionCount: numberField(receipt, "source_inherited_no_go_condition_count") ?? 0,
    sourceCheckCount: numberField(receipt, "source_check_count") ?? 0,
    sourcePassedCheckCount: numberField(receipt, "source_passed_check_count") ?? 0,
    sourceProductionBlockerCount: numberField(receipt, "source_production_blocker_count") ?? -1,
    sourceWarningCount: numberField(receipt, "source_warning_count") ?? -1,
    sourceRecommendationCount: numberField(receipt, "source_recommendation_count") ?? -1,
    sourceNodeV261Ready: booleanField(receipt, "source_node_v261_ready") ?? false,
    sourceNodeV261VerificationMode: stringField(receipt, "source_node_v261_verification_mode") ?? "",
    sourceNodeV261Span: stringField(receipt, "source_node_v261_span") ?? "",
    sourceNodeV261BlocksCredentialResolution:
      booleanField(receipt, "source_node_v261_blocks_credential_resolution") ?? false,
    sourceNodeV261CredentialBoundaryAligned:
      booleanField(receipt, "source_node_v261_credential_boundary_aligned") ?? false,
    sourceNodeV261RawEndpointBoundaryAligned:
      booleanField(receipt, "source_node_v261_raw_endpoint_boundary_aligned") ?? false,
    sourceNodeV261ConnectionBoundaryAligned:
      booleanField(receipt, "source_node_v261_connection_boundary_aligned") ?? false,
    sourceNodeV261WriteBoundaryAligned:
      booleanField(receipt, "source_node_v261_write_boundary_aligned") ?? false,
    sourceNodeV261AutoStartBoundaryAligned:
      booleanField(receipt, "source_node_v261_auto_start_boundary_aligned") ?? false,
    sourceNodeV261UpstreamActionsStillDisabled:
      booleanField(receipt, "source_node_v261_upstream_actions_still_disabled") ?? false,
    disabledPrecheckMode: stringField(disabledPrecheck, "precheck_mode") ?? "",
    disabledPrecheckReadyState: stringField(disabledPrecheck, "ready_state") ?? "",
    resolverImplementationStatus: stringField(disabledPrecheck, "resolver_implementation_status") ?? "",
    secretProviderImplementationStatus: stringField(disabledPrecheck, "secret_provider_implementation_status") ?? "",
    resolverClientMayBeInstantiated: booleanField(disabledPrecheck, "resolver_client_may_be_instantiated") ?? true,
    secretProviderMayBeInstantiated: booleanField(disabledPrecheck, "secret_provider_may_be_instantiated") ?? true,
    credentialValueMayBeLoaded: booleanField(disabledPrecheck, "credential_value_may_be_loaded") ?? true,
    rawEndpointUrlMayBeParsed: booleanField(disabledPrecheck, "raw_endpoint_url_may_be_parsed") ?? true,
    externalRequestMayBeSent: booleanField(disabledPrecheck, "external_request_may_be_sent") ?? true,
    optInGateRequired: booleanField(disabledPrecheck, "opt_in_gate_required") ?? false,
    requiredEnvHandleCount: numberField(disabledPrecheck, "required_env_handle_count") ?? 0,
    optInGateCount: numberField(disabledPrecheck, "opt_in_gate_count") ?? 0,
    failureClassCount: numberField(disabledPrecheck, "failure_class_count") ?? 0,
    dryRunResponseFieldCount: numberField(disabledPrecheck, "dry_run_response_field_count") ?? 0,
    inheritedNoGoConditionCount: numberField(disabledPrecheck, "inherited_no_go_condition_count") ?? 0,
    requiredEnvHandleNames,
    optInGateNames,
    failureTaxonomyCodes: stringArrayField(receipt, "failure_taxonomy_codes"),
    dryRunResponseFields: stringArrayField(dryRunResponseShape, "fields"),
    inheritedNoGoConditions: stringArrayField(receipt, "inherited_no_go_conditions"),
    readOnly: booleanField(receipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? true,
    dryRunOnly: booleanField(receipt, "dry_run_only") ?? false,
    disabledCredentialResolverPrecheckOnly:
      booleanField(receipt, "disabled_credential_resolver_precheck_only") ?? false,
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
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend") ?? true,
    sandboxAuditStorageBackend: booleanField(receipt, "sandbox_audit_storage_backend") ?? true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") ?? true,
    readyForNodeV263Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV263Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.receiptVersion === "mini-kv-disabled-credential-resolver-precheck-non-participation-receipt.v1"
      && reference.releaseVersion === "v115"
      && reference.consumerHint === "Node v263 disabled credential resolver upstream echo verification"
      && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
      && reference.sourcePrecheckProfileVersion
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1"
      && reference.sourcePrecheckState === "sandbox-endpoint-credential-resolver-disabled-precheck-ready"
      && reference.sourcePrecheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
      && reference.sourceSpan === "Node v260 + Java v105 + mini-kv v114"
      && reference.sourceReadyForDisabledPrecheck
      && !reference.sourceReadyForManagedAuditSandboxAdapterConnection
      && reference.sourceReadOnlyDisabledPrecheck
      && reference.sourceDisabledCredentialResolverPrecheckOnly
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
      && reference.sourceRequiredEnvHandleCount === 6
      && reference.sourceOptInGateCount === 2
      && reference.sourceFailureClassCount === 7
      && reference.sourceDryRunResponseFieldCount === 12
      && reference.sourceInheritedNoGoConditionCount === 9
      && reference.sourceCheckCount === reference.sourcePassedCheckCount
      && reference.sourceCheckCount === 24
      && reference.sourceProductionBlockerCount === 0
      && reference.sourceWarningCount === 2
      && reference.sourceRecommendationCount === 2
      && reference.sourceNodeV261Ready
      && reference.sourceNodeV261VerificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"
      && reference.sourceNodeV261Span === "Node v260 + Java v105 + mini-kv v114"
      && reference.sourceNodeV261BlocksCredentialResolution
      && reference.sourceNodeV261CredentialBoundaryAligned
      && reference.sourceNodeV261RawEndpointBoundaryAligned
      && reference.sourceNodeV261ConnectionBoundaryAligned
      && reference.sourceNodeV261WriteBoundaryAligned
      && reference.sourceNodeV261AutoStartBoundaryAligned
      && reference.sourceNodeV261UpstreamActionsStillDisabled
      && reference.disabledPrecheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
      && reference.disabledPrecheckReadyState === "sandbox-endpoint-credential-resolver-disabled-precheck-ready"
      && reference.resolverImplementationStatus === "not-implemented"
      && reference.secretProviderImplementationStatus === "not-implemented"
      && !reference.resolverClientMayBeInstantiated
      && !reference.secretProviderMayBeInstantiated
      && !reference.credentialValueMayBeLoaded
      && !reference.rawEndpointUrlMayBeParsed
      && !reference.externalRequestMayBeSent
      && reference.optInGateRequired
      && reference.requiredEnvHandleCount === 6
      && reference.optInGateCount === 2
      && reference.failureClassCount === 7
      && reference.dryRunResponseFieldCount === 12
      && reference.inheritedNoGoConditionCount === 9
      && arraysEqual(reference.requiredEnvHandleNames, [...REQUIRED_ENV_HANDLE_NAMES])
      && arraysEqual(reference.optInGateNames, [...OPT_IN_GATE_NAMES])
      && arraysEqual(reference.failureTaxonomyCodes, [...FAILURE_CLASS_CODES])
      && arraysEqual(reference.dryRunResponseFields, [...DRY_RUN_RESPONSE_FIELDS])
      && arraysEqual(reference.inheritedNoGoConditions, [...INHERITED_NO_GO_CONDITIONS])
      && reference.readOnly
      && !reference.executionAllowed
      && reference.dryRunOnly
      && reference.disabledCredentialResolverPrecheckOnly
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
      && !reference.managedAuditStorageBackend
      && !reference.sandboxAuditStorageBackend
      && !reference.orderAuthoritative,
  };
}

function isNonNullString(value: string | null): value is string {
  return value !== null;
}

export function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
