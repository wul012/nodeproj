import type { AppConfig } from "../config.js";
import {
  booleanField,
  evidenceFile,
  objectField,
  readJsonObject,
  snippet,
} from "./historicalEvidenceReportUtils.js";
import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract.js";
import {
  JAVA_V122_RUNBOOK,
  JAVA_V123_RUNBOOK,
  JAVA_V124_RUNBOOK,
  JAVA_V125_RUNBOOK,
  JAVA_V126_BOUNDARY_CATALOG,
  JAVA_V126_RUNBOOK,
  MINI_KV_V127_RECEIPT,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationConstants.js";
import type {
  JavaV122V126DisabledFakeHarnessEvidenceReference,
  MiniKvV127DisabledFakeHarnessNonParticipationReference,
  SourceNodeV288DisabledFakeHarnessContractReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationTypes.js";

export function createSourceNodeV288(
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

export function createJavaV122V126Reference(): JavaV122V126DisabledFakeHarnessEvidenceReference {
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

export function createMiniKvV127Reference(): MiniKvV127DisabledFakeHarnessNonParticipationReference {
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


function isString(value: unknown): value is string {
  return typeof value === "string";
}
