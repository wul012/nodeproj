import type { AppConfig } from "../config.js";
import {
  booleanField,
  evidenceFile,
  numberField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview.js";
import {
  APPROVAL_REQUIRED_BOUNDARY_CODES,
  BOUNDARY_CODES,
  CANDIDATE_READY_BOUNDARY_CODES,
  JAVA_V113_BUILDER,
  JAVA_V113_ECHO_MARKER_SUPPORT,
  JAVA_V113_EVIDENCE_SERVICE,
  JAVA_V113_RECORDS,
  JAVA_V113_RUNBOOK,
  JAVA_V113_SUPPORT,
  JAVA_V113_WALKTHROUGH,
  MINI_KV_V120_RECEIPT,
  MINI_KV_V120_RUNBOOK,
  MINI_KV_V120_RUNTIME_RECEIPT,
  MINI_KV_V120_WALKTHROUGH,
  REQUIREMENT_CODES,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationConstants.js";
import type {
  JavaV113DisabledImplementationCandidateEchoReceiptReference,
  MiniKvV120DisabledImplementationCandidateNonParticipationReference,
  SourceNodeV273DisabledImplementationCandidateReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationTypes.js";

export function createSourceNodeV273(config: AppConfig): SourceNodeV273DisabledImplementationCandidateReviewReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview({ config });
  const candidateReadyBoundaryCodes = source.disabledImplementationCandidate.decisions
    .filter((decision) => decision.disposition === "disabled-candidate-ready")
    .map((decision) => decision.code);
  const approvalRequiredBoundaryCodes = source.disabledImplementationCandidate.decisions
    .filter((decision) => decision.disposition === "approval-required")
    .map((decision) => decision.code);

  return {
    sourceVersion: "Node v273",
    profileVersion: source.profileVersion,
    reviewState: source.reviewState,
    readyForDisabledImplementationCandidateReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview,
    disabledImplementationCandidateReviewOnly: source.disabledImplementationCandidateReviewOnly,
    readOnlyCandidateReview: source.readOnlyCandidateReview,
    readyForDisabledResolverInterfaceCandidate: source.readyForDisabledResolverInterfaceCandidate,
    readyForManagedAuditSandboxAdapterConnection: source.readyForManagedAuditSandboxAdapterConnection,
    readyForProductionAudit: source.readyForProductionAudit,
    readyForProductionWindow: source.readyForProductionWindow,
    readyForProductionOperations: source.readyForProductionOperations,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    storesManagedAuditCredential: source.storesManagedAuditCredential,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
    sourceNodeV272Ready: source.checks.sourceNodeV272Ready,
    sourceNodeV272KeepsReadOnlyEchoOnly: source.checks.sourceNodeV272KeepsReadOnlyEchoOnly,
    sourceNodeV272KeepsRealResolverBlocked: source.checks.sourceNodeV272KeepsRealResolverBlocked,
    sourceNodeV272KeepsBoundaryAlignment: source.checks.sourceNodeV272KeepsBoundaryAlignment,
    candidateVersion: source.disabledImplementationCandidate.candidateVersion,
    candidateMode: source.disabledImplementationCandidate.candidateMode,
    candidateDigest: source.disabledImplementationCandidate.candidateDigest,
    candidateDecisionCount: source.disabledImplementationCandidate.candidateDecisionCount,
    candidateReadyDecisionCount: source.disabledImplementationCandidate.candidateReadyDecisionCount,
    approvalRequiredDecisionCount: source.disabledImplementationCandidate.approvalRequiredDecisionCount,
    candidateReadyBoundaryCodes,
    approvalRequiredBoundaryCodes,
    boundaryCodes: source.disabledImplementationCandidate.decisions.map((decision) => decision.code),
    requirementCodes: source.disabledImplementationCandidate.decisions.map((decision) => decision.requirementFromV268),
    requestFields: source.disabledImplementationCandidate.interfaceShape.requestFields,
    responseFields: source.disabledImplementationCandidate.interfaceShape.responseFields,
    failureClasses: source.disabledImplementationCandidate.interfaceShape.failureClasses,
    handleOnlyRequest: source.disabledImplementationCandidate.interfaceShape.handleOnlyRequest,
    includesCredentialValue: source.disabledImplementationCandidate.interfaceShape.includesCredentialValue,
    includesRawEndpointUrl: source.disabledImplementationCandidate.interfaceShape.includesRawEndpointUrl,
    fakeWiringReviewOnly: source.disabledImplementationCandidate.fakeWiringReview.fakeWiringReviewOnly,
    fakeRuntimeInstantiated: source.disabledImplementationCandidate.fakeWiringReview.fakeRuntimeInstantiated,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    sourceCheckCount: source.summary.sourceCheckCount,
    sourcePassedCheckCount: source.summary.sourcePassedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
  };
}

export function createJavaV113Reference(): JavaV113DisabledImplementationCandidateEchoReceiptReference {
  const evidenceFiles = [
    evidenceFile("java-v113-runbook", JAVA_V113_RUNBOOK),
    evidenceFile("java-v113-walkthrough", JAVA_V113_WALKTHROUGH),
    evidenceFile("java-v113-builder", JAVA_V113_BUILDER),
    evidenceFile("java-v113-support", JAVA_V113_SUPPORT),
    evidenceFile("java-v113-records", JAVA_V113_RECORDS),
    evidenceFile("java-v113-echo-marker-support", JAVA_V113_ECHO_MARKER_SUPPORT),
    evidenceFile("java-v113-ops-evidence-service", JAVA_V113_EVIDENCE_SERVICE),
  ];
  const expectedSnippets = [
    snippet("java-v113-runbook-node-v273", JAVA_V113_RUNBOOK, "Node v273 disabled implementation candidate review"),
    snippet("java-v113-runbook-node-v274", JAVA_V113_RUNBOOK, "Node v274"),
    snippet("java-v113-receipt-version", JAVA_V113_EVIDENCE_SERVICE, "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-disabled-implementation-candidate-echo-receipt.v1"),
    snippet("java-v113-profile", JAVA_V113_EVIDENCE_SERVICE, "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1"),
    snippet("java-v113-echo-mode", JAVA_V113_SUPPORT, "java-v113-credential-resolver-disabled-implementation-candidate-echo-receipt-only"),
    snippet("java-v115-echo-mode", JAVA_V113_SUPPORT, "java-v115-credential-resolver-approval-required-boundary-echo-refinement-only"),
    snippet("java-v113-review-state", JAVA_V113_SUPPORT, "credential-resolver-disabled-implementation-candidate-review-ready"),
    snippet("java-v113-check-count", JAVA_V113_SUPPORT, "static final int CHECK_COUNT = 21"),
    snippet("java-v113-passed-count", JAVA_V113_SUPPORT, "static final int PASSED_CHECK_COUNT = 21"),
    snippet("java-v113-source-count", JAVA_V113_SUPPORT, "static final int SOURCE_CHECK_COUNT = 22"),
    snippet("java-v113-candidate-count", JAVA_V113_SUPPORT, "static final int REQUIRED_BOUNDARY_COUNT = 10"),
    snippet("java-v113-candidate-ready-count", JAVA_V113_SUPPORT, "static final int CANDIDATE_READY_DECISION_COUNT = 4"),
    snippet("java-v113-approval-required-count", JAVA_V113_SUPPORT, "static final int APPROVAL_REQUIRED_DECISION_COUNT = 6"),
    ...BOUNDARY_CODES.map((code) => snippet(`java-v113-boundary-${code}`, JAVA_V113_SUPPORT, code)),
    ...REQUIREMENT_CODES.map((code) => snippet(`java-v113-requirement-${code}`, JAVA_V113_SUPPORT, code)),
    ...CANDIDATE_READY_BOUNDARY_CODES.map((code) => snippet(`java-v113-ready-boundary-${code}`, JAVA_V113_SUPPORT, code)),
    ...APPROVAL_REQUIRED_BOUNDARY_CODES.map((code) => snippet(`java-v113-approval-boundary-${code}`, JAVA_V113_SUPPORT, code)),
    snippet("java-v113-request-fields", JAVA_V113_RECORDS, "List<String> requestFields"),
    snippet("java-v113-response-fields", JAVA_V113_RECORDS, "List<String> responseFields"),
    snippet("java-v113-failure-classes", JAVA_V113_RECORDS, "List<String> failureClasses"),
    snippet("java-v113-handle-only", JAVA_V113_SUPPORT, "candidate.interfaceShape().handleOnlyRequest()"),
    snippet("java-v113-no-credential-value", JAVA_V113_SUPPORT, "!candidate.interfaceShape().includesCredentialValue()"),
    snippet("java-v113-no-raw-endpoint", JAVA_V113_SUPPORT, "!candidate.interfaceShape().includesRawEndpointUrl()"),
    snippet("java-v113-fake-wiring", JAVA_V113_SUPPORT, "fakeWiringReviewOnly"),
    snippet("java-v113-no-fake-runtime", JAVA_V113_SUPPORT, "!candidate.fakeWiringReview().fakeRuntimeInstantiated()"),
    snippet("java-v113-no-connection", JAVA_V113_SUPPORT, "!candidate.externalRequestAllowed()"),
    snippet("java-v113-no-schema", JAVA_V113_SUPPORT, "!candidate.schemaMigrationAllowed()"),
    snippet("java-v113-no-ledger", JAVA_V113_BUILDER, "approvalLedgerWritten=false"),
    snippet("java-v113-no-sql", JAVA_V113_BUILDER, "sqlExecuted"),
    snippet("java-v113-no-auto-start", JAVA_V113_BUILDER, "automaticUpstreamStart=false"),
    snippet("java-v113-ready-for-node-v274", JAVA_V113_RECORDS, "readyForNodeV274CredentialResolverDisabledCandidateVerification"),
    snippet("java-v113-workflow-readiness", JAVA_V113_BUILDER, "workflowReadiness("),
    snippet("java-v113-workflow-step", JAVA_V113_BUILDER, "workflowStep(\"sourceNodeV273Echoed\""),
    snippet("java-v113-workflow-support", JAVA_V113_ECHO_MARKER_SUPPORT, "static EchoWorkflowReadiness workflowReadiness"),
    snippet("java-v113-workflow-template-doc", JAVA_V113_WALKTHROUGH, "echo workflow template"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets
    .filter((snippetMatch) => snippetMatch.id !== "java-v113-echo-mode" && snippetMatch.id !== "java-v115-echo-mode")
    .every((snippetMatch) => snippetMatch.matched)
    && (snippetMatched(expectedSnippets, "java-v113-echo-mode") || snippetMatched(expectedSnippets, "java-v115-echo-mode"));

  const reference: JavaV113DisabledImplementationCandidateEchoReceiptReference = {
    sourceVersion: "Java v113",
    tagLabel: "v113订单平台disabled-candidate回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-disabled-implementation-candidate-echo-receipt.v1",
    echoMode: snippetMatched(expectedSnippets, "java-v113-echo-mode")
      ? "java-v113-credential-resolver-disabled-implementation-candidate-echo-receipt-only"
      : snippetMatched(expectedSnippets, "java-v115-echo-mode")
        ? "java-v115-credential-resolver-approval-required-boundary-echo-refinement-only"
        : "missing",
    consumedNodeVersion: snippetMatched(expectedSnippets, "java-v113-runbook-node-v273") ? "Node v273" : "missing",
    consumedNodeProfile: snippetMatched(expectedSnippets, "java-v113-profile")
      ? "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1"
      : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v113-ready-for-node-v274") ? "Node v274" : "missing",
    reviewState: snippetMatched(expectedSnippets, "java-v113-review-state")
      ? "credential-resolver-disabled-implementation-candidate-review-ready"
      : "missing",
    checkCount: snippetMatched(expectedSnippets, "java-v113-check-count") ? 21 : 0,
    passedCheckCount: snippetMatched(expectedSnippets, "java-v113-passed-count") ? 21 : 0,
    sourceCheckCount: snippetMatched(expectedSnippets, "java-v113-source-count") ? 22 : 0,
    sourcePassedCheckCount: snippetMatched(expectedSnippets, "java-v113-source-count") ? 22 : 0,
    candidateDecisionCount: snippetMatched(expectedSnippets, "java-v113-candidate-count") ? 10 : 0,
    candidateReadyDecisionCount: snippetMatched(expectedSnippets, "java-v113-candidate-ready-count") ? 4 : 0,
    approvalRequiredDecisionCount: snippetMatched(expectedSnippets, "java-v113-approval-required-count") ? 6 : 0,
    requestFieldCount: snippetMatched(expectedSnippets, "java-v113-request-fields") ? 6 : 0,
    responseFieldCount: snippetMatched(expectedSnippets, "java-v113-response-fields") ? 7 : 0,
    failureClassCount: snippetMatched(expectedSnippets, "java-v113-failure-classes") ? 6 : 0,
    boundaryCodesEchoed: BOUNDARY_CODES.every((code) => snippetMatched(expectedSnippets, `java-v113-boundary-${code}`)),
    requirementCodesEchoed: REQUIREMENT_CODES.every((code) => snippetMatched(expectedSnippets, `java-v113-requirement-${code}`)),
    candidateReadyBoundaryCodesEchoed:
      CANDIDATE_READY_BOUNDARY_CODES.every((code) => snippetMatched(expectedSnippets, `java-v113-ready-boundary-${code}`)),
    approvalRequiredBoundaryCodesEchoed:
      APPROVAL_REQUIRED_BOUNDARY_CODES.every((code) => snippetMatched(expectedSnippets, `java-v113-approval-boundary-${code}`)),
    interfaceShapeEchoed:
      snippetMatched(expectedSnippets, "java-v113-handle-only")
      && snippetMatched(expectedSnippets, "java-v113-no-credential-value")
      && snippetMatched(expectedSnippets, "java-v113-no-raw-endpoint"),
    fakeWiringEchoed:
      snippetMatched(expectedSnippets, "java-v113-fake-wiring")
      && snippetMatched(expectedSnippets, "java-v113-no-fake-runtime"),
    sideEffectBoundaryEchoed:
      snippetMatched(expectedSnippets, "java-v113-no-connection")
      && snippetMatched(expectedSnippets, "java-v113-no-schema")
      && snippetMatched(expectedSnippets, "java-v113-no-ledger")
      && snippetMatched(expectedSnippets, "java-v113-no-sql")
      && snippetMatched(expectedSnippets, "java-v113-no-auto-start"),
    echoWorkflowTemplateApplied:
      snippetMatched(expectedSnippets, "java-v113-workflow-readiness")
      && snippetMatched(expectedSnippets, "java-v113-workflow-step")
      && snippetMatched(expectedSnippets, "java-v113-workflow-support")
      && snippetMatched(expectedSnippets, "java-v113-workflow-template-doc"),
    readyForNodeV274Alignment: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    connectsManagedAudit: false,
    approvalLedgerWritten: false,
    sqlExecuted: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    readyForManagedAuditSandboxAdapterConnection: false,
  };
  reference.readyForNodeV274Alignment =
    reference.evidencePresent
    && reference.verificationDocumented
    && reference.consumedNodeVersion === "Node v273"
    && reference.nextNodeConsumerVersion === "Node v274"
    && reference.echoMode !== "missing"
    && reference.reviewState === "credential-resolver-disabled-implementation-candidate-review-ready"
    && reference.boundaryCodesEchoed
    && reference.requirementCodesEchoed
    && reference.candidateReadyBoundaryCodesEchoed
    && reference.approvalRequiredBoundaryCodesEchoed
    && reference.interfaceShapeEchoed
    && reference.fakeWiringEchoed
    && reference.sideEffectBoundaryEchoed
    && reference.echoWorkflowTemplateApplied;

  return reference;
}

export function createMiniKvV120Reference(): MiniKvV120DisabledImplementationCandidateNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v120-receipt", MINI_KV_V120_RECEIPT),
    evidenceFile("mini-kv-v120-runbook", MINI_KV_V120_RUNBOOK),
    evidenceFile("mini-kv-v120-walkthrough", MINI_KV_V120_WALKTHROUGH),
    evidenceFile("mini-kv-v120-runtime-receipt", MINI_KV_V120_RUNTIME_RECEIPT),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v120-consumer", MINI_KV_V120_RECEIPT, "Node v274 credential resolver disabled candidate upstream echo verification"),
    snippet("mini-kv-v120-release", MINI_KV_V120_RECEIPT, "\"release_version\":\"v120\""),
    snippet("mini-kv-v120-profile", MINI_KV_V120_RECEIPT, "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1"),
    snippet("mini-kv-v120-review-state", MINI_KV_V120_RECEIPT, "credential-resolver-disabled-implementation-candidate-review-ready"),
    snippet("mini-kv-v120-candidate-count", MINI_KV_V120_RECEIPT, "\"candidate_decision_count\":10"),
    snippet("mini-kv-v120-candidate-ready-count", MINI_KV_V120_RECEIPT, "\"candidate_ready_decision_count\":4"),
    snippet("mini-kv-v120-approval-count", MINI_KV_V120_RECEIPT, "\"approval_required_decision_count\":6"),
    snippet("mini-kv-v120-handle-only", MINI_KV_V120_RECEIPT, "\"handle_only_request\":true"),
    snippet("mini-kv-v120-no-credential", MINI_KV_V120_RECEIPT, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v120-no-raw", MINI_KV_V120_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v120-no-resolver", MINI_KV_V120_RECEIPT, "\"credential_resolver_implemented\":false"),
    snippet("mini-kv-v120-no-client", MINI_KV_V120_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v120-no-secret", MINI_KV_V120_RECEIPT, "\"secret_provider_instantiated\":false"),
    snippet("mini-kv-v120-no-external", MINI_KV_V120_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v120-no-write", MINI_KV_V120_RECEIPT, "\"storage_write_allowed\":false"),
    snippet("mini-kv-v120-no-ledger", MINI_KV_V120_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v120-no-schema", MINI_KV_V120_RECEIPT, "\"schema_migration_executed\":false"),
    snippet("mini-kv-v120-no-restore", MINI_KV_V120_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v120-no-setnxex", MINI_KV_V120_RECEIPT, "\"setnxex_execution_allowed\":false"),
    snippet("mini-kv-v120-walkthrough", MINI_KV_V120_WALKTHROUGH, "后续 Node v274 能确认"),
    snippet("mini-kv-v120-runtime-function", MINI_KV_V120_RUNTIME_RECEIPT, "credential_resolver_disabled_implementation_candidate_non_participation_receipt"),
  ];
  const root = readJsonObject(MINI_KV_V120_RECEIPT);
  const receipt = objectField(root, "credential_resolver_disabled_implementation_candidate_non_participation_receipt");
  const sourceNodeV272 = objectField(receipt, "source_node_v272_reference");
  const candidate = objectField(receipt, "disabled_implementation_candidate");
  const interfaceShape = objectField(candidate, "interface_shape");
  const fakeWiring = objectField(candidate, "fake_wiring_review");
  const summary = objectField(receipt, "summary");

  const reference: MiniKvV120DisabledImplementationCandidateNonParticipationReference = {
    sourceVersion: "mini-kv v120",
    tagLabel: "第一百二十版禁用候选非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptVersion: stringField(root, "receipt_version"),
    releaseVersion: stringField(root, "release_version"),
    consumerHint: stringField(root, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    sourceProfileVersion: stringField(receipt, "source_profile_version"),
    sourceReviewState: stringField(receipt, "source_review_state"),
    sourceReadyForDisabledImplementationCandidateReview:
      booleanField(receipt, "source_ready_for_disabled_implementation_candidate_review"),
    sourceDisabledImplementationCandidateReviewOnly:
      booleanField(receipt, "source_disabled_implementation_candidate_review_only"),
    sourceReadOnlyCandidateReview: booleanField(receipt, "source_read_only_candidate_review"),
    sourceReadyForDisabledResolverInterfaceCandidate:
      booleanField(receipt, "source_ready_for_disabled_resolver_interface_candidate"),
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection"),
    sourceRealResolverImplementationAllowed: booleanField(receipt, "source_real_resolver_implementation_allowed"),
    sourceExecutionAllowed: booleanField(receipt, "source_execution_allowed"),
    sourceConnectsManagedAudit: booleanField(receipt, "source_connects_managed_audit"),
    sourceReadsManagedAuditCredential: booleanField(receipt, "source_reads_managed_audit_credential"),
    sourceStoresManagedAuditCredential: booleanField(receipt, "source_stores_managed_audit_credential"),
    sourceCredentialValueRead: booleanField(receipt, "source_credential_value_read"),
    sourceRawEndpointUrlParsed: booleanField(receipt, "source_raw_endpoint_url_parsed"),
    sourceExternalRequestSent: booleanField(receipt, "source_external_request_sent"),
    sourceSecretProviderInstantiated: booleanField(receipt, "source_secret_provider_instantiated"),
    sourceResolverClientInstantiated: booleanField(receipt, "source_resolver_client_instantiated"),
    sourceSchemaMigrationExecuted: booleanField(receipt, "source_schema_migration_executed"),
    sourceApprovalLedgerWritten: booleanField(receipt, "source_approval_ledger_written"),
    sourceAutomaticUpstreamStart: booleanField(receipt, "source_automatic_upstream_start"),
    sourceNodeV272Ready: booleanField(sourceNodeV272, "ready_for_plan_intake_upstream_echo_verification"),
    sourceNodeV272Digest: stringField(sourceNodeV272, "verification_digest"),
    sourceNodeV272BoundaryCodes: stringArrayField(sourceNodeV272, "boundary_codes"),
    sourceNodeV272RequirementCodes: stringArrayField(sourceNodeV272, "requirement_codes"),
    candidateVersion: stringField(candidate, "candidate_version"),
    candidateMode: stringField(candidate, "candidate_mode"),
    candidateDigest: stringField(candidate, "candidate_digest"),
    candidateDecisionCount: numberField(candidate, "candidate_decision_count"),
    candidateReadyDecisionCount: numberField(candidate, "candidate_ready_decision_count"),
    approvalRequiredDecisionCount: numberField(candidate, "approval_required_decision_count"),
    candidateReadyBoundaryCodes: stringArrayField(candidate, "candidate_ready_boundary_codes"),
    approvalRequiredBoundaryCodes: stringArrayField(candidate, "approval_required_boundary_codes"),
    requestFieldCount: numberField(interfaceShape, "request_field_count"),
    responseFieldCount: numberField(interfaceShape, "response_field_count"),
    failureClassCount: numberField(interfaceShape, "failure_class_count"),
    handleOnlyRequest: booleanField(interfaceShape, "handle_only_request"),
    includesCredentialValue: booleanField(interfaceShape, "includes_credential_value"),
    includesRawEndpointUrl: booleanField(interfaceShape, "includes_raw_endpoint_url"),
    sendsExternalRequest: booleanField(interfaceShape, "sends_external_request"),
    instantiatesSecretProvider: booleanField(interfaceShape, "instantiates_secret_provider"),
    instantiatesResolverClient: booleanField(interfaceShape, "instantiates_resolver_client"),
    fakeWiringReviewOnly: booleanField(fakeWiring, "fake_wiring_review_only"),
    fakeRuntimeInstantiated: booleanField(fakeWiring, "fake_runtime_instantiated"),
    realSecretProviderAllowed: booleanField(fakeWiring, "real_secret_provider_allowed"),
    realManagedAuditTransportAllowed: booleanField(fakeWiring, "real_managed_audit_transport_allowed"),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    sourceCheckCount: numberField(summary, "source_check_count"),
    sourcePassedCheckCount: numberField(summary, "source_passed_check_count"),
    productionBlockerCount: numberField(summary, "production_blocker_count"),
    warningCount: numberField(summary, "warning_count"),
    recommendationCount: numberField(summary, "recommendation_count"),
    readOnly: booleanField(receipt, "read_only"),
    executionAllowed: booleanField(receipt, "execution_allowed"),
    disabledImplementationCandidateReviewOnly: booleanField(receipt, "disabled_implementation_candidate_review_only"),
    readOnlyCandidateReview: booleanField(receipt, "read_only_candidate_review"),
    receiptOnly: booleanField(receipt, "credential_resolver_disabled_implementation_candidate_non_participation_receipt_only"),
    readyForDisabledResolverInterfaceCandidate: booleanField(receipt, "ready_for_disabled_resolver_interface_candidate"),
    readyForManagedAuditSandboxAdapterConnection: booleanField(receipt, "ready_for_managed_audit_sandbox_adapter_connection"),
    realResolverImplementationAllowed: booleanField(receipt, "real_resolver_implementation_allowed"),
    credentialResolverImplemented: booleanField(receipt, "credential_resolver_implemented"),
    credentialResolverInvoked: booleanField(receipt, "credential_resolver_invoked"),
    resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated"),
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated"),
    secretProviderRuntimeAllowed: booleanField(receipt, "secret_provider_runtime_allowed"),
    credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed"),
    credentialValueLoaded: booleanField(receipt, "credential_value_loaded"),
    credentialValueStored: booleanField(receipt, "credential_value_stored"),
    credentialValueIncluded: booleanField(receipt, "credential_value_included"),
    rawEndpointUrlParseAllowed: booleanField(receipt, "raw_endpoint_url_parse_allowed"),
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
    rawEndpointUrlIncluded: booleanField(receipt, "raw_endpoint_url_included"),
    externalRequestAllowed: booleanField(receipt, "external_request_allowed"),
    externalRequestSent: booleanField(receipt, "external_request_sent"),
    connectsManagedAudit: booleanField(receipt, "connects_managed_audit"),
    readsManagedAuditCredential: booleanField(receipt, "reads_managed_audit_credential"),
    storesManagedAuditCredential: booleanField(receipt, "stores_managed_audit_credential"),
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed"),
    writeCommandsExecuted: booleanField(receipt, "write_commands_executed"),
    adminCommandsExecuted: booleanField(receipt, "admin_commands_executed"),
    approvalLedgerWriteAllowed: booleanField(receipt, "approval_ledger_write_allowed"),
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written"),
    managedAuditWriteExecuted: booleanField(receipt, "managed_audit_write_executed"),
    schemaMigrationAllowed: booleanField(receipt, "schema_migration_allowed"),
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed"),
    restoreExecutionAllowed: booleanField(receipt, "restore_execution_allowed"),
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
    automaticUpstreamStartAllowed: booleanField(receipt, "automatic_upstream_start_allowed"),
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start"),
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend"),
    auditAuthoritative: booleanField(receipt, "audit_authoritative"),
    orderAuthoritative: booleanField(receipt, "order_authoritative"),
    readyForNodeV274Alignment: false,
  };
  reference.readyForNodeV274Alignment =
    reference.evidencePresent
    && reference.verificationDocumented
    && reference.releaseVersion === "v120"
    && reference.consumerHint === "Node v274 credential resolver disabled candidate upstream echo verification";

  return reference;
}
