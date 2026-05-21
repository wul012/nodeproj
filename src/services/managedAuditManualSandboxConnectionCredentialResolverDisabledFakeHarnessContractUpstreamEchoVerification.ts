import type { AppConfig } from "../config.js";
import {
  booleanField,
  evidenceFile,
  objectField,
  readJsonObject,
  snippet,
} from "./historicalEvidenceReportUtils.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract.js";
import type {
  DisabledFakeHarnessContractUpstreamEchoVerification,
  DisabledFakeHarnessContractUpstreamEchoVerificationChecks,
  DisabledFakeHarnessContractUpstreamEchoVerificationMessage,
  DisabledFakeHarnessContractUpstreamEchoVerificationSummary,
  JavaV122V126DisabledFakeHarnessEvidenceReference,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationProfile,
  MiniKvV127DisabledFakeHarnessNonParticipationReference,
  SourceNodeV288DisabledFakeHarnessContractReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification";
const NODE_V288_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract";
const ACTIVE_PLAN = "docs/plans2/v287-post-test-only-fake-harness-precheck-roadmap.md";
const NEXT_PLAN = "docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md";

const JAVA_V122_RUNBOOK = "D:/javaproj/advanced-order-platform/d/122/解释/说明.md";
const JAVA_V123_RUNBOOK = "D:/javaproj/advanced-order-platform/d/123/解释/说明.md";
const JAVA_V124_RUNBOOK = "D:/javaproj/advanced-order-platform/d/124/解释/说明.md";
const JAVA_V125_RUNBOOK = "D:/javaproj/advanced-order-platform/d/125/解释/说明.md";
const JAVA_V126_RUNBOOK = "D:/javaproj/advanced-order-platform/d/126/解释/说明.md";
const JAVA_V126_BOUNDARY_CATALOG =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverBoundaryCatalog.java";

const MINI_KV_V127_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-disabled-fake-harness-non-participation-receipt.json";

const REQUIRED_INPUTS = [
  "fake-credential-handle",
  "fake-endpoint-handle",
  "operator-approval-artifact-reference",
  "failure-taxonomy-simulation-map",
  "rollback-abort-marker",
  "disabled-runtime-toggle-state",
];
const ALLOWED_OUTPUTS = [
  "disabled-fake-harness-contract-digest",
  "disabled-runtime-toggle-state",
  "side-effect-boundary-summary",
  "upstream-echo-requirement",
  "blocked-runtime-reason",
];
const PROHIBITED_INPUTS = [
  "credential-value",
  "raw-endpoint-url",
  "secret-provider-instance",
  "resolver-client-instance",
  "managed-audit-http-client",
  "approval-ledger-write-request",
];
const REQUIRED_ARTIFACTS = [
  "disabled-fake-harness-contract-id",
  "disabled-runtime-toggle-proof",
  "credential-handle-fixture",
  "endpoint-handle-fixture",
  "operator-approval-artifact-reference",
  "failure-taxonomy-simulation-map",
  "side-effect-boundary-proof",
  "java-v122-echo-marker-requirement",
  "mini-kv-v127-non-participation-receipt-requirement",
];
const CONTRACT_ASSERTIONS = [
  "fake-harness-runtime-defaults-disabled",
  "fake-harness-runtime-implementation-absent",
  "fake-harness-invocation-blocked",
  "credential-value-never-read",
  "raw-endpoint-url-never-parsed",
  "provider-client-instantiation-blocked",
  "external-network-blocked",
  "ledger-and-schema-writes-blocked",
  "automatic-upstream-start-blocked",
  "parallel-java-mini-kv-echo-required-before-node-v289",
];
const PROHIBITED_ACTIONS = [
  "read-credential-value",
  "store-credential-value",
  "render-credential-value",
  "parse-raw-endpoint-url",
  "render-raw-endpoint-url",
  "instantiate-real-secret-provider",
  "instantiate-real-resolver-client",
  "instantiate-fake-secret-provider",
  "instantiate-fake-resolver-client",
  "send-external-request",
  "connect-managed-audit",
  "write-approval-ledger",
  "execute-schema-migration",
  "execute-fake-harness-runtime",
  "auto-start-upstream",
];

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationProfile {
  const sourceNodeV288 = createSourceNodeV288(input.config);
  const javaV122V126 = createJavaV122V126Reference();
  const miniKvV127 = createMiniKvV127Reference();
  const checks = createChecks(input.config, sourceNodeV288, javaV122V126, miniKvV127);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification
    ? "disabled-fake-harness-contract-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourceContractDigest: sourceNodeV288.contractDigest,
    javaEvidenceDigest: javaV122V126.evidenceDigest,
    miniKvReceiptDigest: miniKvV127.receiptDigest,
    checks,
  });
  const echoVerification = createEchoVerification(
    sourceNodeV288,
    javaV122V126,
    miniKvV127,
    checks,
    verificationDigest,
  );
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV288, javaV122V126, miniKvV127, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled fake harness contract upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    disabledFakeHarnessContractUpstreamEchoVerificationOnly: true,
    consumesNodeV288DisabledFakeHarnessContract: true,
    consumesJavaV122V126QualityAndEchoEvidence: true,
    consumesMiniKvV127DisabledFakeHarnessNonParticipationReceipt: true,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
    fakeHarnessRuntimeEnabled: false,
    fakeHarnessInvocationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    credentialValueProvided: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    fakeSecretProviderInstantiated: false,
    fakeResolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV288,
    upstreamEchoes: { javaV122V126, miniKvV127 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledFakeHarnessContractUpstreamEchoVerificationJson: ROUTE_PATH,
      disabledFakeHarnessContractUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV288Json: NODE_V288_ROUTE,
      sourceNodeV288Markdown: `${NODE_V288_ROUTE}?format=markdown`,
      javaV122Runbook: JAVA_V122_RUNBOOK,
      javaV123Runbook: JAVA_V123_RUNBOOK,
      javaV124Runbook: JAVA_V124_RUNBOOK,
      javaV125Runbook: JAVA_V125_RUNBOOK,
      javaV126Runbook: JAVA_V126_RUNBOOK,
      javaV126BoundaryCatalog: JAVA_V126_BOUNDARY_CATALOG,
      miniKvV127Receipt: MINI_KV_V127_RECEIPT,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
    },
    nextActions: [
      "Archive Node v289 with JSON, Markdown, explanation, and code walkthrough evidence.",
      "Treat Java v122-v126 and mini-kv v127 as read-only inputs; do not mutate sibling projects from Node.",
      "Use the next plan to decide whether the disabled fake harness line needs another read-only preflight before any runtime shell work.",
      "Keep credential values, raw endpoint URLs, provider/client instantiation, HTTP/TCP, ledger writes, schema migration, and automatic upstream start blocked.",
    ],
  };
}

function createSourceNodeV288(
  config: AppConfig,
): SourceNodeV288DisabledFakeHarnessContractReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract({
    config,
  });
  return {
    sourceVersion: "Node v288",
    profileVersion: source.profileVersion,
    contractState: source.contractState,
    readyForDisabledFakeHarnessContract:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract,
    readyForJavaV122MiniKvV127ParallelEcho: source.readyForJavaV122MiniKvV127ParallelEcho,
    contractDigest: source.disabledFakeHarnessContract.contractDigest,
    contractName: source.disabledFakeHarnessContract.contractName,
    contractMode: source.disabledFakeHarnessContract.contractMode,
    runtimeToggleName: source.disabledFakeHarnessContract.runtimeToggleName,
    defaultRuntimeToggleValue: source.disabledFakeHarnessContract.defaultRuntimeToggleValue,
    invocationState: source.disabledFakeHarnessContract.invocationState,
    requiredInputCount: source.disabledFakeHarnessContract.requiredInputs.length,
    allowedOutputCount: source.disabledFakeHarnessContract.allowedOutputs.length,
    prohibitedInputCount: source.disabledFakeHarnessContract.prohibitedInputs.length,
    requiredArtifactCount: source.disabledFakeHarnessContract.requiredArtifacts.length,
    contractAssertionCount: source.disabledFakeHarnessContract.contractAssertions.length,
    prohibitedActionCount: source.disabledFakeHarnessContract.prohibitedActions.length,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    javaEchoRequiredNow: source.upstreamEchoRequirement.javaEchoRequiredNow,
    miniKvEchoRequiredNow: source.upstreamEchoRequirement.miniKvEchoRequiredNow,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
    fakeHarnessRuntimeEnabled: false,
    fakeHarnessInvocationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    credentialValueProvided: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    fakeSecretProviderInstantiated: false,
    fakeResolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
  };
}

function createJavaV122V126Reference(): JavaV122V126DisabledFakeHarnessEvidenceReference {
  const evidenceFiles = [
    evidenceFile("java-v122-runbook", JAVA_V122_RUNBOOK),
    evidenceFile("java-v123-runbook", JAVA_V123_RUNBOOK),
    evidenceFile("java-v124-runbook", JAVA_V124_RUNBOOK),
    evidenceFile("java-v125-runbook", JAVA_V125_RUNBOOK),
    evidenceFile("java-v126-runbook", JAVA_V126_RUNBOOK),
    evidenceFile("java-v126-boundary-catalog", JAVA_V126_BOUNDARY_CATALOG),
  ];
  const expectedSnippets = createJavaV122V126ExpectedSnippets();
  const matched = (id: string) => expectedSnippets.some((match) => match.id === id && match.matched);
  return {
    sourceVersion: "Java v122-v126",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    evidenceDigest: evidenceDigest(evidenceFiles),
    completedVersions: ["Java v122", "Java v123", "Java v124", "Java v125", "Java v126"],
    integrationTestSplitVersions: ["Java v122", "Java v123", "Java v124", "Java v125"],
    qualityCatalogVersion: "Java v126",
    integrationTestSplitComplete:
      matched("java-v122-split")
      && matched("java-v123-split")
      && matched("java-v124-split")
      && matched("java-v125-split"),
    evidenceServiceCatalogStopgapApplied:
      matched("java-v126-catalog-runbook")
      && matched("java-v126-catalog-class")
      && matched("java-v126-template-record"),
    boundaryCatalogPresent: matched("java-v126-boundary-catalog-present"),
    noFakeHarnessRuntimeDocumented:
      matched("java-v122-no-runtime")
      && matched("java-v123-no-runtime")
      && matched("java-v124-no-runtime")
      && matched("java-v125-no-runtime")
      && matched("java-v126-no-runtime"),
    credentialValueBoundaryDocumented:
      matched("java-v122-no-credential")
      && matched("java-v123-no-credential")
      && matched("java-v124-no-credential")
      && matched("java-v125-no-credential")
      && matched("java-v126-no-credential"),
    rawEndpointBoundaryDocumented:
      matched("java-v122-no-raw-endpoint")
      && matched("java-v123-no-raw-endpoint")
      && matched("java-v124-no-raw-endpoint")
      && matched("java-v125-no-raw-endpoint")
      && matched("java-v126-no-raw-endpoint"),
    managedAuditConnectionBoundaryDocumented:
      matched("java-v122-no-managed-audit")
      && matched("java-v123-no-managed-audit")
      && matched("java-v124-no-managed-audit")
      && matched("java-v125-no-managed-audit")
      && matched("java-v126-no-managed-audit"),
    ledgerAndSqlBoundaryDocumented:
      matched("java-v122-no-ledger-sql")
      && matched("java-v123-no-ledger-sql")
      && matched("java-v124-no-ledger-sql")
      && matched("java-v125-no-ledger-sql")
      && matched("java-v126-no-ledger-sql"),
    didNotModifyProductionCodeDuringV122V125:
      matched("java-v122-no-production-code")
      && matched("java-v123-only-tests")
      && matched("java-v124-only-tests")
      && matched("java-v125-only-tests"),
    v126RefactorOnly: matched("java-v126-refactor-only"),
    javaStillReadOnlyEvidenceInput: true,
  };
}

function createMiniKvV127Reference(): MiniKvV127DisabledFakeHarnessNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v127-receipt", MINI_KV_V127_RECEIPT),
  ];
  const expectedSnippets = createMiniKvV127ExpectedSnippets();
  const readJson = readJsonObject(MINI_KV_V127_RECEIPT);
  const receipt = objectField(readJson, "credential_resolver_disabled_fake_harness_non_participation_receipt");
  const contract = objectField(receipt, "disabled_fake_harness_contract");
  const summary = objectField(receipt, "summary");
  return {
    sourceVersion: "mini-kv v127",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptDigest: evidenceDigest(evidenceFiles),
    receiptVersion: stringField(readJson, "receipt_version") ?? stringField(receipt, "receipt_version"),
    releaseVersion: stringField(readJson, "release_version") ?? stringField(receipt, "current_release_version"),
    consumerHint: stringField(readJson, "consumer_hint") ?? stringField(receipt, "consumer_hint"),
    sourceContract: stringField(receipt, "source_contract"),
    sourceProfileVersion: stringField(receipt, "source_profile_version"),
    sourceContractState: stringField(receipt, "source_contract_state"),
    sourceReadyForDisabledFakeHarnessContract:
      booleanFrom(receipt, readJson, "source_ready_for_disabled_fake_harness_contract"),
    sourceReadOnlyContract: booleanFrom(receipt, readJson, "source_read_only_contract"),
    sourceDisabledFakeHarnessContractOnly:
      booleanFrom(receipt, readJson, "source_disabled_fake_harness_contract_only"),
    readyForNodeV289UpstreamEchoVerification:
      booleanFrom(receipt, readJson, "ready_for_node_v289_upstream_echo_verification"),
    readyForJavaV122MiniKvV127ParallelEcho:
      booleanFrom(receipt, readJson, "ready_for_java_v122_mini_kv_v127_parallel_echo"),
    readOnly: booleanFrom(receipt, readJson, "read_only"),
    executionAllowed: booleanFrom(receipt, readJson, "execution_allowed"),
    disabledFakeHarnessNonParticipationReceiptOnly:
      booleanFrom(receipt, readJson, "disabled_fake_harness_non_participation_receipt_only"),
    disabledFakeHarnessContractOnly:
      booleanFrom(receipt, readJson, "disabled_fake_harness_contract_only"),
    consumesNodeV288DisabledFakeHarnessContract:
      booleanFrom(receipt, readJson, "consumes_node_v288_disabled_fake_harness_contract"),
    contractDigest: stringField(contract, "contract_digest"),
    contractName: stringField(contract, "contract_name"),
    requiredInputs: stringArrayField(contract, "required_inputs"),
    allowedOutputs: stringArrayField(contract, "allowed_outputs"),
    prohibitedInputs: stringArrayField(contract, "prohibited_inputs"),
    requiredArtifacts: stringArrayField(contract, "required_artifacts"),
    contractAssertions: stringArrayField(contract, "contract_assertions"),
    prohibitedActions: stringArrayField(contract, "prohibited_actions"),
    fakeHarnessRuntimeEnabled: booleanFrom(receipt, readJson, "fake_harness_runtime_enabled"),
    fakeHarnessInvocationAllowed: booleanFrom(receipt, readJson, "fake_harness_invocation_allowed"),
    fakeHarnessRuntimeImplemented: booleanFrom(receipt, readJson, "fake_harness_runtime_implemented"),
    fakeHarnessRuntimeInvoked: booleanFrom(receipt, readJson, "fake_harness_runtime_invoked"),
    credentialResolverImplemented: booleanFrom(receipt, readJson, "credential_resolver_implemented"),
    credentialResolverInvoked: booleanFrom(receipt, readJson, "credential_resolver_invoked"),
    resolverClientInstantiated: booleanFrom(receipt, readJson, "resolver_client_instantiated"),
    secretProviderInstantiated: booleanFrom(receipt, readJson, "secret_provider_instantiated"),
    fakeSecretProviderInstantiated: booleanFrom(receipt, readJson, "fake_secret_provider_instantiated"),
    fakeResolverClientInstantiated: booleanFrom(receipt, readJson, "fake_resolver_client_instantiated"),
    credentialValueReadAllowed: booleanFrom(receipt, readJson, "credential_value_read_allowed"),
    credentialValueRead: booleanFrom(receipt, readJson, "credential_value_read"),
    credentialValueProvided: booleanFrom(receipt, readJson, "credential_value_provided"),
    credentialValueLoaded: booleanFrom(receipt, readJson, "credential_value_loaded"),
    credentialValueStored: booleanFrom(receipt, readJson, "credential_value_stored"),
    credentialValueIncluded: booleanFrom(receipt, readJson, "credential_value_included"),
    credentialValueRendered: booleanFrom(receipt, readJson, "credential_value_rendered"),
    rawEndpointUrlParseAllowed: booleanFrom(receipt, readJson, "raw_endpoint_url_parse_allowed"),
    rawEndpointUrlRenderAllowed: booleanFrom(receipt, readJson, "raw_endpoint_url_render_allowed"),
    rawEndpointUrlParsed: booleanFrom(receipt, readJson, "raw_endpoint_url_parsed"),
    rawEndpointUrlRendered: booleanFrom(receipt, readJson, "raw_endpoint_url_rendered"),
    rawEndpointUrlProvided: booleanFrom(receipt, readJson, "raw_endpoint_url_provided"),
    rawEndpointUrlIncluded: booleanFrom(receipt, readJson, "raw_endpoint_url_included"),
    externalRequestAllowed: booleanFrom(receipt, readJson, "external_request_allowed"),
    externalRequestSent: booleanFrom(receipt, readJson, "external_request_sent"),
    httpTcpDialAllowed: booleanFrom(receipt, readJson, "http_tcp_dial_allowed"),
    connectsManagedAudit: booleanFrom(receipt, readJson, "connects_managed_audit"),
    readsManagedAuditCredential: booleanFrom(receipt, readJson, "reads_managed_audit_credential"),
    storesManagedAuditCredential: booleanFrom(receipt, readJson, "stores_managed_audit_credential"),
    managedAuditStore: booleanFrom(receipt, readJson, "managed_audit_store"),
    managedAuditStorageBackend: booleanFrom(receipt, readJson, "managed_audit_storage_backend"),
    sandboxAuditStorageBackend: booleanFrom(receipt, readJson, "sandbox_audit_storage_backend"),
    storageWriteAllowed: booleanFrom(receipt, readJson, "storage_write_allowed"),
    writeCommandsExecuted: booleanFrom(receipt, readJson, "write_commands_executed"),
    adminCommandsExecuted: booleanFrom(receipt, readJson, "admin_commands_executed"),
    runtimeWriteObserved: booleanFrom(receipt, readJson, "runtime_write_observed"),
    approvalLedgerWriteAllowed: booleanFrom(receipt, readJson, "approval_ledger_write_allowed"),
    approvalLedgerWritten: booleanFrom(receipt, readJson, "approval_ledger_written"),
    approvalLedgerWriteExecuted: booleanFrom(receipt, readJson, "approval_ledger_write_executed"),
    managedAuditWriteExecuted: booleanFrom(receipt, readJson, "managed_audit_write_executed"),
    productionRecordWritten: booleanFrom(receipt, readJson, "production_record_written"),
    schemaMigrationAllowed: booleanFrom(receipt, readJson, "schema_migration_allowed"),
    schemaMigrationExecuted: booleanFrom(receipt, readJson, "schema_migration_executed"),
    restoreExecutionAllowed: booleanFrom(receipt, readJson, "restore_execution_allowed"),
    loadRestoreCompactExecuted: booleanFrom(receipt, readJson, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanFrom(receipt, readJson, "setnxex_execution_allowed"),
    automaticUpstreamStartAllowed: booleanFrom(receipt, readJson, "automatic_upstream_start_allowed"),
    automaticUpstreamStart: booleanFrom(receipt, readJson, "automatic_upstream_start"),
    auditAuthoritative: booleanFrom(receipt, readJson, "audit_authoritative"),
    orderAuthoritative: booleanFrom(receipt, readJson, "order_authoritative"),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
  };
}

function createEchoVerification(
  sourceNodeV288: SourceNodeV288DisabledFakeHarnessContractReference,
  javaV122V126: JavaV122V126DisabledFakeHarnessEvidenceReference,
  miniKvV127: MiniKvV127DisabledFakeHarnessNonParticipationReference,
  checks: DisabledFakeHarnessContractUpstreamEchoVerificationChecks,
  verificationDigest: string,
): DisabledFakeHarnessContractUpstreamEchoVerification {
  return {
    verificationDigest,
    verificationMode:
      "java-v122-v126-plus-mini-kv-v127-disabled-fake-harness-contract-upstream-echo-verification-only",
    sourceSpan: "Node v288 + Java v122-v126 + mini-kv v127",
    sourceNodeV288Ready: checks.sourceNodeV288Ready,
    javaV122V126EvidenceReady: checks.javaV122V126EvidenceReady,
    miniKvV127NonParticipationReady: checks.miniKvV127ReceiptReady,
    contractDigestAlignedWithMiniKv: checks.contractDigestAlignedWithMiniKv,
    javaQualityStopgapApplied: javaV122V126.evidenceServiceCatalogStopgapApplied,
    integrationTestSplitComplete: javaV122V126.integrationTestSplitComplete,
    sideEffectBoundariesAligned: checks.sideEffectBoundaryClosed,
    implementationStillBlocked: true,
    readyForNextDisabledFakeHarnessPlanning:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV288: SourceNodeV288DisabledFakeHarnessContractReference,
  javaV122V126: JavaV122V126DisabledFakeHarnessEvidenceReference,
  miniKvV127: MiniKvV127DisabledFakeHarnessNonParticipationReference,
): DisabledFakeHarnessContractUpstreamEchoVerificationChecks {
  const sourceNodeV288Ready =
    sourceNodeV288.contractState === "disabled-fake-harness-contract-ready"
    && sourceNodeV288.readyForDisabledFakeHarnessContract
    && sourceNodeV288.readyForJavaV122MiniKvV127ParallelEcho
    && sourceNodeV288.sourceProductionBlockerCount === 0
    && sourceNodeV288.javaEchoRequiredNow
    && sourceNodeV288.miniKvEchoRequiredNow;
  const sourceNodeV288ContractStillDisabled =
    !sourceNodeV288.realResolverImplementationAllowed
    && !sourceNodeV288.testOnlyFakeHarnessAllowed
    && !sourceNodeV288.testOnlyFakeHarnessExecutionAllowed
    && !sourceNodeV288.fakeHarnessRuntimeEnabled
    && !sourceNodeV288.fakeHarnessInvocationAllowed
    && !sourceNodeV288.executionAllowed
    && !sourceNodeV288.connectsManagedAudit
    && !sourceNodeV288.credentialValueRead
    && !sourceNodeV288.credentialValueProvided
    && !sourceNodeV288.rawEndpointUrlParsed
    && !sourceNodeV288.rawEndpointUrlRendered
    && !sourceNodeV288.externalRequestSent
    && !sourceNodeV288.secretProviderInstantiated
    && !sourceNodeV288.resolverClientInstantiated
    && !sourceNodeV288.fakeSecretProviderInstantiated
    && !sourceNodeV288.fakeResolverClientInstantiated
    && !sourceNodeV288.schemaMigrationExecuted
    && !sourceNodeV288.approvalLedgerWritten
    && !sourceNodeV288.automaticUpstreamStart;
  const javaV122V126EvidenceReady =
    javaV122V126.evidencePresent
    && javaV122V126.verificationDocumented
    && javaV122V126.integrationTestSplitComplete
    && javaV122V126.evidenceServiceCatalogStopgapApplied
    && javaV122V126.boundaryCatalogPresent;
  const javaDocumentsRuntimeBoundaries =
    javaV122V126.noFakeHarnessRuntimeDocumented
    && javaV122V126.credentialValueBoundaryDocumented
    && javaV122V126.rawEndpointBoundaryDocumented
    && javaV122V126.managedAuditConnectionBoundaryDocumented
    && javaV122V126.ledgerAndSqlBoundaryDocumented
    && javaV122V126.didNotModifyProductionCodeDuringV122V125
    && javaV122V126.v126RefactorOnly;
  const miniKvV127ReceiptReady =
    miniKvV127.evidencePresent
    && miniKvV127.verificationDocumented
    && miniKvV127.receiptVersion === "mini-kv-credential-resolver-disabled-fake-harness-non-participation-receipt.v1"
    && miniKvV127.releaseVersion === "v127"
    && miniKvV127.consumerHint === "Node v289 disabled fake harness contract upstream echo verification"
    && miniKvV127.sourceContract === "Node v288 disabled fake harness contract"
    && miniKvV127.sourceReadyForDisabledFakeHarnessContract === true
    && miniKvV127.readyForNodeV289UpstreamEchoVerification === true
    && miniKvV127.readOnly === true
    && miniKvV127.executionAllowed === false;
  const miniKvV127EchoesNodeV288Contract =
    miniKvV127.consumesNodeV288DisabledFakeHarnessContract === true
    && miniKvV127.sourceProfileVersion
      === "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract.v1"
    && miniKvV127.sourceContractState === "disabled-fake-harness-contract-ready"
    && miniKvV127.sourceReadOnlyContract === true
    && miniKvV127.sourceDisabledFakeHarnessContractOnly === true
    && miniKvV127.disabledFakeHarnessContractOnly === true
    && miniKvV127.disabledFakeHarnessNonParticipationReceiptOnly === true;
  const miniKvV127KeepsRuntimeSideEffectsBlocked =
    miniKvV127.fakeHarnessRuntimeEnabled === false
    && miniKvV127.fakeHarnessInvocationAllowed === false
    && miniKvV127.fakeHarnessRuntimeImplemented === false
    && miniKvV127.fakeHarnessRuntimeInvoked === false
    && miniKvV127.credentialResolverImplemented === false
    && miniKvV127.credentialResolverInvoked === false
    && miniKvV127.resolverClientInstantiated === false
    && miniKvV127.secretProviderInstantiated === false
    && miniKvV127.fakeSecretProviderInstantiated === false
    && miniKvV127.fakeResolverClientInstantiated === false
    && miniKvV127.credentialValueReadAllowed === false
    && miniKvV127.credentialValueRead === false
    && miniKvV127.credentialValueProvided === false
    && miniKvV127.credentialValueLoaded === false
    && miniKvV127.credentialValueStored === false
    && miniKvV127.credentialValueIncluded === false
    && miniKvV127.credentialValueRendered === false
    && miniKvV127.rawEndpointUrlParseAllowed === false
    && miniKvV127.rawEndpointUrlRenderAllowed === false
    && miniKvV127.rawEndpointUrlParsed === false
    && miniKvV127.rawEndpointUrlRendered === false
    && miniKvV127.rawEndpointUrlProvided === false
    && miniKvV127.rawEndpointUrlIncluded === false
    && miniKvV127.externalRequestAllowed === false
    && miniKvV127.externalRequestSent === false
    && miniKvV127.httpTcpDialAllowed === false
    && miniKvV127.connectsManagedAudit === false
    && miniKvV127.readsManagedAuditCredential === false
    && miniKvV127.storesManagedAuditCredential === false
    && miniKvV127.managedAuditStore === false
    && miniKvV127.managedAuditStorageBackend === false
    && miniKvV127.sandboxAuditStorageBackend === false
    && miniKvV127.storageWriteAllowed === false
    && miniKvV127.writeCommandsExecuted === false
    && miniKvV127.adminCommandsExecuted === false
    && miniKvV127.runtimeWriteObserved === false
    && miniKvV127.approvalLedgerWriteAllowed === false
    && miniKvV127.approvalLedgerWritten === false
    && miniKvV127.approvalLedgerWriteExecuted === false
    && miniKvV127.managedAuditWriteExecuted === false
    && miniKvV127.productionRecordWritten === false
    && miniKvV127.schemaMigrationAllowed === false
    && miniKvV127.schemaMigrationExecuted === false
    && miniKvV127.restoreExecutionAllowed === false
    && miniKvV127.loadRestoreCompactExecuted === false
    && miniKvV127.setnxexExecutionAllowed === false
    && miniKvV127.automaticUpstreamStartAllowed === false
    && miniKvV127.automaticUpstreamStart === false
    && miniKvV127.auditAuthoritative === false
    && miniKvV127.orderAuthoritative === false;
  const credentialBoundaryClosed =
    !sourceNodeV288.credentialValueRead
    && !sourceNodeV288.credentialValueProvided
    && javaV122V126.credentialValueBoundaryDocumented
    && miniKvV127.credentialValueReadAllowed === false
    && miniKvV127.credentialValueRead === false
    && miniKvV127.credentialValueProvided === false
    && miniKvV127.credentialValueLoaded === false
    && miniKvV127.credentialValueStored === false
    && miniKvV127.credentialValueIncluded === false
    && miniKvV127.credentialValueRendered === false;
  const rawEndpointBoundaryClosed =
    !sourceNodeV288.rawEndpointUrlParsed
    && !sourceNodeV288.rawEndpointUrlRendered
    && javaV122V126.rawEndpointBoundaryDocumented
    && miniKvV127.rawEndpointUrlParseAllowed === false
    && miniKvV127.rawEndpointUrlRenderAllowed === false
    && miniKvV127.rawEndpointUrlParsed === false
    && miniKvV127.rawEndpointUrlRendered === false
    && miniKvV127.rawEndpointUrlProvided === false
    && miniKvV127.rawEndpointUrlIncluded === false;
  const providerClientBoundaryClosed =
    !sourceNodeV288.secretProviderInstantiated
    && !sourceNodeV288.resolverClientInstantiated
    && !sourceNodeV288.fakeSecretProviderInstantiated
    && !sourceNodeV288.fakeResolverClientInstantiated
    && miniKvV127.secretProviderInstantiated === false
    && miniKvV127.resolverClientInstantiated === false
    && miniKvV127.fakeSecretProviderInstantiated === false
    && miniKvV127.fakeResolverClientInstantiated === false;
  const connectionBoundaryClosed =
    !sourceNodeV288.connectsManagedAudit
    && !sourceNodeV288.externalRequestSent
    && javaV122V126.managedAuditConnectionBoundaryDocumented
    && miniKvV127.externalRequestAllowed === false
    && miniKvV127.externalRequestSent === false
    && miniKvV127.httpTcpDialAllowed === false
    && miniKvV127.connectsManagedAudit === false;
  const writeBoundaryClosed =
    !sourceNodeV288.executionAllowed
    && !sourceNodeV288.schemaMigrationExecuted
    && !sourceNodeV288.approvalLedgerWritten
    && javaV122V126.ledgerAndSqlBoundaryDocumented
    && miniKvV127.storageWriteAllowed === false
    && miniKvV127.writeCommandsExecuted === false
    && miniKvV127.adminCommandsExecuted === false
    && miniKvV127.runtimeWriteObserved === false
    && miniKvV127.approvalLedgerWriteAllowed === false
    && miniKvV127.approvalLedgerWritten === false
    && miniKvV127.approvalLedgerWriteExecuted === false
    && miniKvV127.managedAuditWriteExecuted === false
    && miniKvV127.productionRecordWritten === false
    && miniKvV127.schemaMigrationAllowed === false
    && miniKvV127.schemaMigrationExecuted === false
    && miniKvV127.restoreExecutionAllowed === false
    && miniKvV127.loadRestoreCompactExecuted === false
    && miniKvV127.setnxexExecutionAllowed === false;
  const autoStartBoundaryClosed =
    !sourceNodeV288.automaticUpstreamStart
    && miniKvV127.automaticUpstreamStartAllowed === false
    && miniKvV127.automaticUpstreamStart === false;
  const authorityBoundaryClosed =
    miniKvV127.auditAuthoritative === false
    && miniKvV127.orderAuthoritative === false
    && miniKvV127.managedAuditStore === false
    && miniKvV127.managedAuditStorageBackend === false
    && miniKvV127.sandboxAuditStorageBackend === false;
  const sideEffectBoundaryClosed =
    credentialBoundaryClosed
    && rawEndpointBoundaryClosed
    && providerClientBoundaryClosed
    && connectionBoundaryClosed
    && writeBoundaryClosed
    && autoStartBoundaryClosed
    && authorityBoundaryClosed
    && javaDocumentsRuntimeBoundaries
    && sourceNodeV288ContractStillDisabled
    && miniKvV127KeepsRuntimeSideEffectsBlocked;

  return {
    sourceNodeV288Ready,
    sourceNodeV288ContractStillDisabled,
    javaV122V126EvidenceReady,
    javaIntegrationTestSplitsComplete: javaV122V126.integrationTestSplitComplete,
    javaCatalogStopgapApplied: javaV122V126.evidenceServiceCatalogStopgapApplied,
    javaDocumentsRuntimeBoundaries,
    miniKvV127ReceiptReady,
    miniKvV127EchoesNodeV288Contract,
    miniKvV127KeepsRuntimeSideEffectsBlocked,
    contractDigestAlignedWithMiniKv: miniKvV127.contractDigest === sourceNodeV288.contractDigest,
    requiredInputsAlignedWithMiniKv: arraysEqual(miniKvV127.requiredInputs, REQUIRED_INPUTS),
    allowedOutputsAlignedWithMiniKv: arraysEqual(miniKvV127.allowedOutputs, ALLOWED_OUTPUTS),
    prohibitedInputsAlignedWithMiniKv: arraysEqual(miniKvV127.prohibitedInputs, PROHIBITED_INPUTS),
    requiredArtifactsAlignedWithMiniKv: arraysEqual(miniKvV127.requiredArtifacts, REQUIRED_ARTIFACTS),
    contractAssertionsAlignedWithMiniKv: arraysEqual(miniKvV127.contractAssertions, CONTRACT_ASSERTIONS),
    prohibitedActionsAlignedWithMiniKv: arraysEqual(miniKvV127.prohibitedActions, PROHIBITED_ACTIONS),
    credentialBoundaryClosed,
    rawEndpointBoundaryClosed,
    providerClientBoundaryClosed,
    connectionBoundaryClosed,
    writeBoundaryClosed,
    autoStartBoundaryClosed,
    authorityBoundaryClosed,
    sideEffectBoundaryClosed,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification:
      false,
  };
}

function createSummary(
  sourceNodeV288: SourceNodeV288DisabledFakeHarnessContractReference,
  javaV122V126: JavaV122V126DisabledFakeHarnessEvidenceReference,
  miniKvV127: MiniKvV127DisabledFakeHarnessNonParticipationReference,
  checks: DisabledFakeHarnessContractUpstreamEchoVerificationChecks,
  productionBlockers: DisabledFakeHarnessContractUpstreamEchoVerificationMessage[],
  warnings: DisabledFakeHarnessContractUpstreamEchoVerificationMessage[],
  recommendations: DisabledFakeHarnessContractUpstreamEchoVerificationMessage[],
): DisabledFakeHarnessContractUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceFileCount:
      javaV122V126.evidenceFiles.filter((file) => file.exists).length
      + miniKvV127.evidenceFiles.filter((file) => file.exists).length,
    matchedSnippetCount:
      javaV122V126.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
      + miniKvV127.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    sourceCheckCount: sourceNodeV288.sourceCheckCount,
    sourcePassedCheckCount: sourceNodeV288.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV288.sourceProductionBlockerCount,
    javaEvidenceFileCount: javaV122V126.evidenceFiles.filter((file) => file.exists).length,
    javaMatchedSnippetCount: javaV122V126.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    javaCompletedVersionCount: javaV122V126.completedVersions.length,
    javaIntegrationTestSplitVersionCount: javaV122V126.integrationTestSplitVersions.length,
    miniKvEvidenceFileCount: miniKvV127.evidenceFiles.filter((file) => file.exists).length,
    miniKvMatchedSnippetCount: miniKvV127.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    miniKvCheckCount: miniKvV127.checkCount,
    miniKvPassedCheckCount: miniKvV127.passedCheckCount,
    requiredInputCount: sourceNodeV288.requiredInputCount,
    allowedOutputCount: sourceNodeV288.allowedOutputCount,
    prohibitedInputCount: sourceNodeV288.prohibitedInputCount,
    requiredArtifactCount: sourceNodeV288.requiredArtifactCount,
    contractAssertionCount: sourceNodeV288.contractAssertionCount,
    prohibitedActionCount: sourceNodeV288.prohibitedActionCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function createJavaV122V126ExpectedSnippets() {
  return [
    snippet("java-v122-split", JAVA_V122_RUNBOOK, "Integration Tests 第一刀拆分"),
    snippet("java-v122-no-production-code", JAVA_V122_RUNBOOK, "本版不改生产代码"),
    snippet("java-v122-no-runtime", JAVA_V122_RUNBOOK, "不新增真实 fake harness runtime"),
    snippet("java-v122-no-credential", JAVA_V122_RUNBOOK, "不读取 credential value"),
    snippet("java-v122-no-raw-endpoint", JAVA_V122_RUNBOOK, "不解析 raw endpoint URL"),
    snippet("java-v122-no-managed-audit", JAVA_V122_RUNBOOK, "不打开 managed audit connection"),
    snippet("java-v122-no-ledger-sql", JAVA_V122_RUNBOOK, "不写 ledger，不执行 SQL"),
    snippet("java-v123-split", JAVA_V123_RUNBOOK, "Integration Tests 第二刀连拆"),
    snippet("java-v123-only-tests", JAVA_V123_RUNBOOK, "本版本只调整测试结构，不改生产代码"),
    snippet("java-v123-no-runtime", JAVA_V123_RUNBOOK, "不新增 fake harness runtime"),
    snippet("java-v123-no-credential", JAVA_V123_RUNBOOK, "不读取 credential value"),
    snippet("java-v123-no-raw-endpoint", JAVA_V123_RUNBOOK, "不解析 raw endpoint URL"),
    snippet("java-v123-no-managed-audit", JAVA_V123_RUNBOOK, "不打开 managed audit connection"),
    snippet("java-v123-no-ledger-sql", JAVA_V123_RUNBOOK, "不写 approval ledger；不执行外部 SQL"),
    snippet("java-v124-split", JAVA_V124_RUNBOOK, "Integration Tests 第三刀连拆"),
    snippet("java-v124-only-tests", JAVA_V124_RUNBOOK, "本版本只调整测试结构，不改生产代码"),
    snippet("java-v124-no-runtime", JAVA_V124_RUNBOOK, "不新增 fake harness runtime"),
    snippet("java-v124-no-credential", JAVA_V124_RUNBOOK, "不读取 credential value"),
    snippet("java-v124-no-raw-endpoint", JAVA_V124_RUNBOOK, "不解析 raw endpoint URL"),
    snippet("java-v124-no-managed-audit", JAVA_V124_RUNBOOK, "不打开 managed audit connection"),
    snippet("java-v124-no-ledger-sql", JAVA_V124_RUNBOOK, "不写 approval ledger；不执行外部 SQL"),
    snippet("java-v125-split", JAVA_V125_RUNBOOK, "Integration Tests 第四刀连拆"),
    snippet("java-v125-only-tests", JAVA_V125_RUNBOOK, "本版只调整测试结构，不改生产代码"),
    snippet("java-v125-no-runtime", JAVA_V125_RUNBOOK, "不新增 fake harness runtime"),
    snippet("java-v125-no-credential", JAVA_V125_RUNBOOK, "不读取 credential value"),
    snippet("java-v125-no-raw-endpoint", JAVA_V125_RUNBOOK, "不解析 raw endpoint URL"),
    snippet("java-v125-no-managed-audit", JAVA_V125_RUNBOOK, "不打开 managed audit connection"),
    snippet("java-v125-no-ledger-sql", JAVA_V125_RUNBOOK, "不写 approval ledger；不执行外部 SQL"),
    snippet("java-v126-catalog-runbook", JAVA_V126_RUNBOOK, "EvidenceService echo support catalog 止血"),
    snippet("java-v126-refactor-only", JAVA_V126_RUNBOOK, "本版只做小范围重构"),
    snippet("java-v126-no-runtime", JAVA_V126_RUNBOOK, "不新增 fake harness runtime"),
    snippet("java-v126-no-credential", JAVA_V126_RUNBOOK, "不读取 credential value"),
    snippet("java-v126-no-raw-endpoint", JAVA_V126_RUNBOOK, "不解析 raw endpoint URL"),
    snippet("java-v126-no-managed-audit", JAVA_V126_RUNBOOK, "不打开 managed audit connection"),
    snippet("java-v126-no-ledger-sql", JAVA_V126_RUNBOOK, "不写 approval ledger；不执行外部 SQL"),
    snippet("java-v126-boundary-catalog-present", JAVA_V126_BOUNDARY_CATALOG, "final class ReleaseApprovalSandboxEndpointCredentialResolverBoundaryCatalog"),
    snippet("java-v126-catalog-class", JAVA_V126_BOUNDARY_CATALOG, "approvalRequiredImplementationTemplateFor"),
    snippet("java-v126-template-record", JAVA_V126_BOUNDARY_CATALOG, "record ApprovalRequiredImplementationTemplate"),
  ];
}

function createMiniKvV127ExpectedSnippets() {
  return [
    snippet("mini-kv-v127-consumer", MINI_KV_V127_RECEIPT, "Node v289 disabled fake harness contract upstream echo verification"),
    snippet("mini-kv-v127-source-contract", MINI_KV_V127_RECEIPT, "Node v288 disabled fake harness contract"),
    snippet("mini-kv-v127-profile", MINI_KV_V127_RECEIPT, "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract.v1"),
    snippet("mini-kv-v127-contract-digest", MINI_KV_V127_RECEIPT, "2ebb03732323ee1f05715ec8f29843670f9131c9d212f144728fc327b4ceefb0"),
    snippet("mini-kv-v127-runtime-blocked", MINI_KV_V127_RECEIPT, "\"fake_harness_runtime_enabled\":false"),
    snippet("mini-kv-v127-credential-blocked", MINI_KV_V127_RECEIPT, "\"credential_value_read\":false"),
    snippet("mini-kv-v127-endpoint-blocked", MINI_KV_V127_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v127-managed-audit-blocked", MINI_KV_V127_RECEIPT, "\"connects_managed_audit\":false"),
    snippet("mini-kv-v127-write-blocked", MINI_KV_V127_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v127-authority-blocked", MINI_KV_V127_RECEIPT, "\"order_authoritative\":false"),
  ];
}

function collectProductionBlockers(
  checks: DisabledFakeHarnessContractUpstreamEchoVerificationChecks,
): DisabledFakeHarnessContractUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: DisabledFakeHarnessContractUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV288Ready,
      code: "NODE_V288_CONTRACT_NOT_READY",
      source: "node-v288-disabled-fake-harness-contract",
      message: "Node v288 disabled fake harness contract must be ready before Node v289 verifies upstream echoes.",
    },
    {
      condition: checks.sourceNodeV288ContractStillDisabled,
      code: "NODE_V288_CONTRACT_OPENED_RUNTIME",
      source: "node-v288-disabled-fake-harness-contract",
      message: "Node v288 must still keep fake harness runtime, provider/client instantiation, HTTP/TCP, and writes disabled.",
    },
    {
      condition: checks.javaV122V126EvidenceReady,
      code: "JAVA_V122_V126_EVIDENCE_NOT_READY",
      source: "java-v122-v126-quality-and-echo-evidence",
      message: "Java v122-v126 runbooks and catalog evidence must be present before Node v289.",
    },
    {
      condition: checks.javaIntegrationTestSplitsComplete,
      code: "JAVA_INTEGRATION_SPLITS_INCOMPLETE",
      source: "java-v122-v126-quality-and-echo-evidence",
      message: "Java v122-v125 integration test split evidence must remain complete.",
    },
    {
      condition: checks.javaCatalogStopgapApplied,
      code: "JAVA_CATALOG_STOPGAP_MISSING",
      source: "java-v122-v126-quality-and-echo-evidence",
      message: "Java v126 catalog stopgap must be present so repeated boundary constants do not drift.",
    },
    {
      condition: checks.javaDocumentsRuntimeBoundaries,
      code: "JAVA_RUNTIME_BOUNDARY_NOT_DOCUMENTED",
      source: "java-v122-v126-quality-and-echo-evidence",
      message: "Java evidence must explicitly keep fake harness runtime, credential values, raw endpoints, managed audit, ledger, and SQL blocked.",
    },
    {
      condition: checks.miniKvV127ReceiptReady,
      code: "MINI_KV_V127_RECEIPT_NOT_READY",
      source: "mini-kv-v127-disabled-fake-harness-non-participation-receipt",
      message: "mini-kv v127 non-participation receipt must be present and ready for Node v289.",
    },
    {
      condition: checks.miniKvV127EchoesNodeV288Contract,
      code: "MINI_KV_V127_CONTRACT_ECHO_MISSING",
      source: "mini-kv-v127-disabled-fake-harness-non-participation-receipt",
      message: "mini-kv v127 must echo the Node v288 disabled fake harness contract identity and closed-state semantics.",
    },
    {
      condition: checks.contractDigestAlignedWithMiniKv,
      code: "CONTRACT_DIGEST_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification",
      message: "mini-kv v127 contract digest must match the Node v288 disabled fake harness contract digest.",
    },
    {
      condition:
        checks.requiredInputsAlignedWithMiniKv
        && checks.allowedOutputsAlignedWithMiniKv
        && checks.prohibitedInputsAlignedWithMiniKv
        && checks.requiredArtifactsAlignedWithMiniKv
        && checks.contractAssertionsAlignedWithMiniKv
        && checks.prohibitedActionsAlignedWithMiniKv,
      code: "CONTRACT_SHAPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification",
      message: "mini-kv v127 must echo Node v288 inputs, outputs, artifacts, assertions, and prohibited actions without shape drift.",
    },
    {
      condition: checks.sideEffectBoundaryClosed,
      code: "SIDE_EFFECT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification",
      message: "Credential, endpoint, provider/client, connection, write, auto-start, and authority boundaries must remain closed across all three projects.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during Node v289 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during Node v289 upstream echo verification.",
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

function collectWarnings(): DisabledFakeHarnessContractUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "VERIFICATION_ONLY_NO_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification",
      message: "v289 only verifies upstream echo evidence; it does not create a fake harness runtime or resolver client.",
    },
    {
      code: "JAVA_EVIDENCE_IS_FILE_SCAN",
      severity: "warning",
      source: "java-v122-v126-quality-and-echo-evidence",
      message: "Java v122-v126 is consumed as runbook/catalog evidence, while mini-kv v127 is consumed as structured JSON receipt.",
    },
  ];
}

function collectRecommendations(): DisabledFakeHarnessContractUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "WRITE_NEXT_PLAN_AFTER_V289",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification",
      message: "After v289, start a fresh plan from the verified disabled fake harness echo baseline instead of appending duplicate versions.",
    },
    {
      code: "KEEP_NEXT_STEP_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification",
      message: "The next version may plan a disabled shell or preflight, but should keep runtime execution, credential values, raw endpoints, HTTP/TCP, and writes blocked.",
    },
  ];
}

function evidenceDigest(files: readonly { digest: string | null }[]): string | null {
  const digests = files.map((file) => file.digest).filter(isString);
  return digests.length > 0 ? sha256StableJson(digests) : null;
}

function stringField(input: Record<string, unknown>, key: string): string | null {
  const value = input[key];
  return typeof value === "string" ? value : null;
}

function numberField(input: Record<string, unknown>, key: string): number | null {
  const value = input[key];
  return typeof value === "number" ? value : null;
}

function stringArrayField(input: Record<string, unknown>, key: string): string[] {
  const value = input[key];
  return Array.isArray(value) ? value.filter(isString) : [];
}

function booleanFrom(
  primary: Record<string, unknown>,
  fallback: Record<string, unknown>,
  key: string,
): boolean | null {
  return booleanField(primary, key) ?? booleanField(fallback, key);
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length
    && left.every((value, index) => value === right[index]);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}
