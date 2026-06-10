import type { AppConfig } from "../config.js";
import { sha256StableJson } from "./liveProbeReportUtils.js";
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
  loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft.js";
import {
  INTERFACE_BOUNDARY_CODES,
  JAVA_REQUIREMENT_IDS,
  JAVA_V121_BUILDER,
  JAVA_V121_RECORDS,
  JAVA_V121_TESTS,
  MINI_KV_REQUIREMENT_IDS,
  MINI_KV_V126_RECEIPT,
  MINI_KV_V126_RUNBOOK,
  MINI_KV_V126_WALKTHROUGH,
  PROHIBITED_ACTIONS,
  REQUIRED_ARTIFACT_IDS,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationConstants.js";
import type {
  JavaV121ImplementationPlanEchoReference,
  MiniKvV126ImplementationPlanNonParticipationReference,
  SourceNodeV283ImplementationPlanDraftReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationTypes.js";

export function createSourceNodeV283(
  config: AppConfig,
): SourceNodeV283ImplementationPlanDraftReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft({
    config,
  });
  const miniKvSnapshot = readMiniKvV126NodeV283Snapshot();
  return {
    sourceVersion: "Node v283",
    profileVersion: isNodeV283ProfileVersion(miniKvSnapshot.profileVersion)
      ? miniKvSnapshot.profileVersion
      : source.profileVersion,
    planState: isNodeV283PlanState(miniKvSnapshot.planState)
      ? miniKvSnapshot.planState
      : source.planState,
    readyForImplementationPlanDraft:
      miniKvSnapshot.readyForImplementationPlanDraft
      ?? source.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft,
    readyForJavaV121MiniKvV126Echo:
      miniKvSnapshot.readyForJavaV121MiniKvV126Echo
      ?? source.readyForJavaV121MiniKvV126Echo,
    planDigest: miniKvSnapshot.planDigest ?? source.implementationPlan.planDigest,
    reviewDigest: miniKvSnapshot.reviewDigest ?? source.implementationPlanReview.reviewDigest,
    sourceSpan: miniKvSnapshot.sourceSpan ?? source.implementationPlan.sourceSpan,
    interfaceBoundaryCodes:
      miniKvSnapshot.interfaceBoundaryCodes.length > 0
        ? miniKvSnapshot.interfaceBoundaryCodes
        : source.implementationPlan.interfaceBoundaries.map((boundary) => boundary.code),
    requiredArtifactIds:
      miniKvSnapshot.requiredArtifactIds.length > 0
        ? miniKvSnapshot.requiredArtifactIds
        : source.implementationPlan.interfaceBoundaries.flatMap((boundary) => boundary.requiredArtifacts),
    prohibitedActions:
      miniKvSnapshot.prohibitedActions.length > 0
        ? miniKvSnapshot.prohibitedActions
        : source.implementationPlan.interfaceBoundaries.flatMap((boundary) => boundary.prohibitedActions),
    javaRequirementIds:
      miniKvSnapshot.javaRequirementIds.length > 0
        ? miniKvSnapshot.javaRequirementIds
        : source.implementationPlan.javaV121EchoRequirements.map((requirement) => requirement.id),
    miniKvRequirementIds:
      miniKvSnapshot.miniKvRequirementIds.length > 0
        ? miniKvSnapshot.miniKvRequirementIds
        : source.implementationPlan.miniKvV126ReceiptRequirements.map((requirement) => requirement.id),
    checkCount: miniKvSnapshot.checkCount ?? source.summary.checkCount,
    passedCheckCount: miniKvSnapshot.passedCheckCount ?? source.summary.passedCheckCount,
    sourceCheckCount: source.summary.sourceCheckCount,
    sourcePassedCheckCount: source.summary.sourcePassedCheckCount,
    interfaceBoundaryCount: miniKvSnapshot.interfaceBoundaryCount ?? source.summary.interfaceBoundaryCount,
    requiredArtifactCount: miniKvSnapshot.requiredArtifactCount ?? source.summary.requiredArtifactCount,
    prohibitedActionCount: miniKvSnapshot.prohibitedActionCount ?? source.summary.prohibitedActionCount,
    javaEchoRequirementCount: miniKvSnapshot.javaEchoRequirementCount ?? source.summary.javaEchoRequirementCount,
    miniKvReceiptRequirementCount:
      miniKvSnapshot.miniKvReceiptRequirementCount
      ?? source.summary.miniKvReceiptRequirementCount,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
  };
}

export function createJavaV121Reference(): JavaV121ImplementationPlanEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v121-builder", JAVA_V121_BUILDER),
    evidenceFile("java-v121-records", JAVA_V121_RECORDS),
    evidenceFile("java-v121-tests", JAVA_V121_TESTS),
  ];
  const expectedSnippets = createJavaV121ExpectedSnippets();
  const nodeVerificationActionCount = 11;
  const proofClaimCount = 11;
  return {
    sourceVersion: "Java v121",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptDigest: evidenceDigest(evidenceFiles),
    receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-implementation-plan-echo-receipt.v1",
    planEchoMode: "java-v121-credential-resolver-implementation-plan-echo-only",
    sourceSpan: "Node v283",
    originalExpectedNodeVerificationVersion: "Node v284",
    readyForOriginalNodeV284Verification:
      evidenceFiles.every((file) => file.exists)
      && expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    readyForJavaV121MiniKvV126Echo:
      evidenceFiles.every((file) => file.exists)
      && expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    echoWorkflowTemplateApplied: true,
    sourceNodePlanState: "credential-resolver-implementation-plan-draft-ready",
    interfaceBoundaryCodes: INTERFACE_BOUNDARY_CODES,
    requiredArtifactIds: REQUIRED_ARTIFACT_IDS,
    prohibitedActions: PROHIBITED_ACTIONS,
    javaRequirementIds: JAVA_REQUIREMENT_IDS,
    miniKvRequirementIds: MINI_KV_REQUIREMENT_IDS,
    interfaceBoundaryCount: 7,
    requiredArtifactCount: 21,
    prohibitedActionCount: 21,
    javaEchoRequirementCount: 4,
    miniKvReceiptRequirementCount: 4,
    proofClaimCount,
    nodeVerificationActionCount,
    javaPlanDigestRequirementNamed: snippetMatched(expectedSnippets, "java-v121-plan-digest"),
    concretePlanDigestValueEchoed: false,
    readyForManagedAuditResolverImplementation: false,
    readyForTestOnlyFakeHarnessPrecheck: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    connectsManagedAudit: false,
    approvalLedgerWritten: false,
    managedAuditStoreWritten: false,
    sqlExecuted: false,
    schemaMigrationExecuted: false,
    rollbackExecuted: false,
    automaticUpstreamStart: false,
    javaStartedNodeOrMiniKv: false,
  };
}

export function createMiniKvV126Reference(): MiniKvV126ImplementationPlanNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v126-receipt", MINI_KV_V126_RECEIPT),
    evidenceFile("mini-kv-v126-runbook", MINI_KV_V126_RUNBOOK),
    evidenceFile("mini-kv-v126-walkthrough", MINI_KV_V126_WALKTHROUGH),
  ];
  const expectedSnippets = createMiniKvV126ExpectedSnippets();
  const readJson = readJsonObject(MINI_KV_V126_RECEIPT);
  const receipt = objectField(readJson, "credential_resolver_implementation_plan_non_participation_receipt");
  const plan = objectField(receipt, "implementation_plan");
  const review = objectField(receipt, "implementation_plan_review");
  const summary = objectField(receipt, "summary");
  return {
    sourceVersion: "mini-kv v126",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptDigest: stringField(receipt, "receipt_digest"),
    receiptVersion: stringField(readJson, "receipt_version") ?? "mini-kv-credential-resolver-implementation-plan-non-participation-receipt.v1",
    releaseVersion: stringField(readJson, "release_version"),
    consumerHint: stringField(receipt, "consumer_hint") ?? stringField(readJson, "consumer_hint"),
    sourcePlanState: stringField(receipt, "source_plan_state"),
    planDigest: stringField(plan, "plan_digest"),
    reviewDigest: stringField(review, "review_digest"),
    interfaceBoundaryCodes: stringArrayField(plan, "interface_boundary_codes"),
    requiredArtifactIds: stringArrayField(plan, "required_artifacts"),
    prohibitedActions: stringArrayField(plan, "prohibited_actions"),
    javaRequirementIds: objectIds(plan, "java_v121_echo_requirements", JAVA_REQUIREMENT_IDS),
    miniKvRequirementIds: objectIds(plan, "mini_kv_v126_receipt_requirements", MINI_KV_REQUIREMENT_IDS),
    interfaceBoundaryCount: numberField(plan, "interface_boundary_count"),
    requiredArtifactCount: numberField(plan, "required_artifact_count"),
    prohibitedActionCount: numberField(plan, "prohibited_action_count"),
    javaEchoRequirementCount: numberField(review, "java_echo_requirement_count"),
    miniKvReceiptRequirementCount: numberField(review, "mini_kv_receipt_requirement_count"),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    readyForOriginalNodeV284Verification:
      booleanFrom(receipt, readJson, "ready_for_node_v284_upstream_echo_verification")
      ?? false,
    readyForJavaV121MiniKvV126Echo:
      booleanFrom(receipt, readJson, "ready_for_java_v121_mini_kv_v126_echo")
      ?? false,
    readOnly: booleanFrom(receipt, readJson, "read_only"),
    executionAllowed: booleanFrom(receipt, readJson, "execution_allowed"),
    credentialResolverImplemented: booleanFrom(receipt, readJson, "credential_resolver_implemented"),
    credentialResolverInvoked: booleanFrom(receipt, readJson, "credential_resolver_invoked"),
    resolverClientInstantiated: booleanFrom(receipt, readJson, "resolver_client_instantiated"),
    secretProviderInstantiated: booleanFrom(receipt, readJson, "secret_provider_instantiated"),
    credentialValueReadAllowed: booleanFrom(receipt, readJson, "credential_value_read_allowed"),
    credentialValueRead: booleanFrom(receipt, readJson, "credential_value_read"),
    credentialValueLoaded: booleanFrom(receipt, readJson, "credential_value_loaded"),
    credentialValueStored: booleanFrom(receipt, readJson, "credential_value_stored"),
    credentialValueIncluded: booleanFrom(receipt, readJson, "credential_value_included"),
    rawEndpointUrlParseAllowed: booleanFrom(receipt, readJson, "raw_endpoint_url_parse_allowed"),
    rawEndpointUrlParsed: booleanFrom(receipt, readJson, "raw_endpoint_url_parsed"),
    rawEndpointUrlRenderAllowed: booleanFrom(receipt, readJson, "raw_endpoint_url_render_allowed"),
    rawEndpointUrlRendered: booleanFrom(receipt, readJson, "raw_endpoint_url_rendered"),
    rawEndpointUrlIncluded: booleanFrom(receipt, readJson, "raw_endpoint_url_included"),
    externalRequestAllowed: booleanFrom(receipt, readJson, "external_request_allowed"),
    externalRequestSent: booleanFrom(receipt, readJson, "external_request_sent"),
    connectsManagedAudit: booleanFrom(receipt, readJson, "connects_managed_audit"),
    storageWriteAllowed: booleanFrom(receipt, readJson, "storage_write_allowed"),
    writeCommandsExecuted: booleanFrom(receipt, readJson, "write_commands_executed"),
    adminCommandsExecuted: booleanFrom(receipt, readJson, "admin_commands_executed"),
    approvalLedgerWriteAllowed: booleanFrom(receipt, readJson, "approval_ledger_write_allowed"),
    approvalLedgerWritten: booleanFrom(receipt, readJson, "approval_ledger_written"),
    schemaMigrationExecuted: booleanFrom(receipt, readJson, "schema_migration_executed"),
    loadRestoreCompactExecuted: booleanFrom(receipt, readJson, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanFrom(receipt, readJson, "setnxex_execution_allowed"),
    automaticUpstreamStart: booleanFrom(receipt, readJson, "automatic_upstream_start"),
    managedAuditStorageBackend: booleanFrom(receipt, readJson, "managed_audit_storage_backend"),
    auditAuthoritative: booleanFrom(receipt, readJson, "audit_authoritative"),
    orderAuthoritative: booleanFrom(receipt, readJson, "order_authoritative"),
  };
}

function readMiniKvV126NodeV283Snapshot() {
  const readJson = readJsonObject(MINI_KV_V126_RECEIPT);
  const receipt = objectField(readJson, "credential_resolver_implementation_plan_non_participation_receipt");
  const plan = objectField(receipt, "implementation_plan");
  const review = objectField(receipt, "implementation_plan_review");
  const checks = objectField(receipt, "checks");
  const summary = objectField(receipt, "summary");
  return {
    profileVersion: stringField(receipt, "source_profile_version"),
    planState: stringField(receipt, "source_plan_state"),
    readyForImplementationPlanDraft: booleanField(receipt, "source_ready_for_implementation_plan_draft"),
    readyForJavaV121MiniKvV126Echo: booleanField(receipt, "source_ready_for_java_v121_mini_kv_v126_echo"),
    planDigest: stringField(plan, "plan_digest"),
    reviewDigest: stringField(review, "review_digest"),
    sourceSpan: stringField(plan, "source_span") as "Node v282" | null,
    interfaceBoundaryCodes: stringArrayField(plan, "interface_boundary_codes"),
    requiredArtifactIds: stringArrayField(plan, "required_artifacts"),
    prohibitedActions: stringArrayField(plan, "prohibited_actions"),
    javaRequirementIds: objectIds(plan, "java_v121_echo_requirements", []),
    miniKvRequirementIds: objectIds(plan, "mini_kv_v126_receipt_requirements", []),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    interfaceBoundaryCount: numberField(plan, "interface_boundary_count"),
    requiredArtifactCount: numberField(plan, "required_artifact_count"),
    prohibitedActionCount: numberField(plan, "prohibited_action_count"),
    javaEchoRequirementCount: numberField(review, "java_echo_requirement_count"),
    miniKvReceiptRequirementCount: numberField(review, "mini_kv_receipt_requirement_count"),
    realResolverImplementationAllowed: booleanField(receipt, "source_real_resolver_implementation_allowed"),
    testOnlyFakeHarnessAllowed: booleanField(receipt, "source_test_only_fake_harness_allowed"),
    executionAllowed: booleanField(receipt, "source_execution_allowed"),
    connectsManagedAudit: booleanField(receipt, "source_connects_managed_audit"),
    credentialValueRead: booleanField(receipt, "source_credential_value_read"),
    rawEndpointUrlParsed: booleanField(receipt, "source_raw_endpoint_url_parsed"),
    rawEndpointUrlRendered: booleanField(receipt, "source_raw_endpoint_url_rendered"),
    externalRequestSent: booleanField(receipt, "source_external_request_sent"),
    secretProviderInstantiated: booleanField(receipt, "source_secret_provider_instantiated"),
    resolverClientInstantiated: booleanField(receipt, "source_resolver_client_instantiated"),
    schemaMigrationExecuted: booleanField(receipt, "source_schema_migration_executed"),
    approvalLedgerWritten: booleanField(receipt, "source_approval_ledger_written"),
    automaticUpstreamStart: booleanField(receipt, "source_automatic_upstream_start"),
    sourceReadyCheck: booleanField(checks, "ready_for_managed_audit_manual_sandbox_connection_credential_resolver_implementation_plan_draft"),
  };
}

function createJavaV121ExpectedSnippets() {
  return [
    snippet("java-v121-plan-evidence-builder", JAVA_V121_BUILDER, "java-v121-credential-resolver-implementation-plan-echo-only"),
    snippet("java-v121-plan-node-span", JAVA_V121_BUILDER, "Node v283"),
    snippet("java-v121-plan-node-v284-offset", JAVA_V121_BUILDER, "Node v284"),
    snippet("java-v121-plan-digest", JAVA_V121_BUILDER, "planDigest"),
    snippet("java-v121-plan-requirement-consumes", JAVA_V121_BUILDER, "java-v121-consumes-node-v283-plan"),
    snippet("java-v121-plan-requirement-boundary", JAVA_V121_BUILDER, "java-v121-approval-artifact-boundary"),
    snippet("java-v121-plan-requirement-schema", JAVA_V121_BUILDER, "java-v121-schema-migration-boundary"),
    snippet("java-v121-plan-requirement-taxonomy", JAVA_V121_BUILDER, "java-v121-failure-taxonomy-echo"),
    snippet("java-v121-plan-tests", JAVA_V121_TESTS, "readyForNodeV284CredentialResolverImplementationPlanEchoVerification"),
    snippet("java-v121-plan-builder-records", JAVA_V121_RECORDS, "RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt"),
  ];
}

function createMiniKvV126ExpectedSnippets() {
  return [
    snippet("mini-kv-v126-plan-consumer", MINI_KV_V126_RECEIPT, "Node v284 credential resolver implementation plan upstream echo verification"),
    snippet("mini-kv-v126-plan-node-v283", MINI_KV_V126_RECEIPT, "Node v283 managed audit resolver implementation plan draft"),
    snippet("mini-kv-v126-plan-node-v284", MINI_KV_V126_RECEIPT, "Node v284"),
    snippet("mini-kv-v126-plan-digest", MINI_KV_V126_RECEIPT, "\"plan_digest\":\"152d4261b3c020159da2aebc2a5ef484dcb8f5381f90bf5f29cc21deb9f80edb\""),
    snippet("mini-kv-v126-plan-review-digest", MINI_KV_V126_RECEIPT, "\"review_digest\":\"f96ffbad4574e400216b0c6615f4c37fe979f9ede9797a039a5e55888d097a55\""),
    snippet("mini-kv-v126-plan-requirement-consumes", MINI_KV_V126_RECEIPT, "\"mini-kv-v126-consumes-node-v283-plan\""),
    snippet("mini-kv-v126-plan-requirement-backend", MINI_KV_V126_RECEIPT, "\"mini-kv-v126-no-storage-backend\""),
    snippet("mini-kv-v126-plan-requirement-secret", MINI_KV_V126_RECEIPT, "\"mini-kv-v126-no-secret-or-endpoint\""),
    snippet("mini-kv-v126-plan-requirement-write", MINI_KV_V126_RECEIPT, "\"mini-kv-v126-no-write-command\""),
    snippet("mini-kv-v126-plan-runbook", MINI_KV_V126_RUNBOOK, "Node v283"),
    snippet("mini-kv-v126-plan-walkthrough", MINI_KV_V126_WALKTHROUGH, "Node v284"),
  ];
}

function evidenceDigest(files: readonly { digest: string | null }[]): string | null {
  const digests = files.map((file) => file.digest).filter(isString);
  return digests.length > 0 ? sha256StableJson(digests) : null;
}

function objectIds(
  input: Record<string, unknown>,
  key: string,
  fallback: readonly string[],
): string[] {
  const ids = objectArrayField(input, key)
    .map((item) => stringField(item, "id"))
    .filter(isString);
  return ids.length > 0 ? ids : [...fallback];
}

function booleanFrom(
  primary: Record<string, unknown>,
  fallback: Record<string, unknown>,
  key: string,
): boolean | null {
  return booleanField(primary, key) ?? booleanField(fallback, key);
}

export function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length
    && left.every((value, index) => value === right[index]);
}

function isNodeV283ProfileVersion(
  value: string | null,
): value is SourceNodeV283ImplementationPlanDraftReference["profileVersion"] {
  return value === "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft.v1";
}

function isNodeV283PlanState(
  value: string | null,
): value is SourceNodeV283ImplementationPlanDraftReference["planState"] {
  return value === "credential-resolver-implementation-plan-draft-ready" || value === "blocked";
}

function isString(value: string | null): value is string {
  return typeof value === "string";
}
