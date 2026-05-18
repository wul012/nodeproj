import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck,
  type ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.js";

export interface ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1";
  shellContractState: "test-only-adapter-shell-contract-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  testOnlyShell: true;
  readOnlyContract: true;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV252: {
    sourceVersion: "Node v252";
    profileVersion: ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile["profileVersion"];
    precheckState: ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile["precheckState"];
    precheckDigest: string;
    readyForDisabledAdapterClientPrecheck: boolean;
    requiredEnvHandleCount: number;
    failureClassCount: number;
    dryRunResponseFieldCount: number;
    clientImplementationStatus: "not-implemented";
    externalRequestStillBlocked: true;
    credentialValueStillBlocked: true;
  };
  testOnlyAdapterShellContract: {
    contractDigest: string;
    shellName: "ManagedAuditManualSandboxTestOnlyAdapterShell";
    shellMode: "test-only-fake-transport-contract";
    transportKind: "fake-in-memory";
    realClientImplemented: false;
    realTransportAllowed: false;
    fakeTransportOnly: true;
    clientMayBeInstantiatedForProduction: false;
    externalRequestMayBeSent: false;
    credentialValueMayBeLoaded: false;
    requestShapeFieldCount: number;
    responseShapeFieldCount: number;
    failureMappingCount: number;
    guardConditionCount: number;
    requestShape: TestOnlyAdapterRequestShape;
    responseShape: TestOnlyAdapterResponseShape;
    failureMapping: TestOnlyAdapterFailureMapping[];
    guardConditions: TestOnlyAdapterGuardCondition[];
    fakeTransportProbe: TestOnlyAdapterFakeTransportProbe;
  };
  checks: TestOnlyAdapterShellContractChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    requestShapeFieldCount: number;
    responseShapeFieldCount: number;
    failureMappingCount: number;
    guardConditionCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: TestOnlyAdapterShellContractMessage[];
  warnings: TestOnlyAdapterShellContractMessage[];
  recommendations: TestOnlyAdapterShellContractMessage[];
  evidenceEndpoints: {
    testOnlyAdapterShellContractJson: string;
    testOnlyAdapterShellContractMarkdown: string;
    sourceNodeV252Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface TestOnlyAdapterRequestShape {
  fields: readonly string[];
  credentialHandleOnly: true;
  credentialValueAccepted: false;
  endpointHandleOnly: true;
  externalUrlAccepted: false;
  payloadMayContainSecrets: false;
}

interface TestOnlyAdapterResponseShape {
  fields: readonly string[];
  fakeTransportResponseOnly: true;
  connectionAttempted: false;
  externalRequestSent: false;
  credentialValueRead: false;
  schemaMigrationExecuted: false;
  productionRecordWritten: false;
}

interface TestOnlyAdapterFailureMapping {
  sourceFailureCode: string;
  shellFailureCode: string;
  mappedAction: "return-fake-failure" | "pause-and-do-not-connect";
  retryable: false;
}

interface TestOnlyAdapterGuardCondition {
  code: string;
  required: true;
  value: boolean;
  message: string;
}

interface TestOnlyAdapterFakeTransportProbe {
  requestId: "managed-audit-v253-test-only-shell-probe";
  transportKind: "fake-in-memory";
  acceptedByFakeTransport: true;
  responseStatus: "fake-transport-accepted";
  responseCode: "TEST_ONLY_FAKE_TRANSPORT";
  connectionAttempted: false;
  externalRequestSent: false;
  credentialValueRead: false;
  schemaMigrationExecuted: false;
  productionRecordWritten: false;
  probeDigest: string;
}

interface TestOnlyAdapterShellContractMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract"
    | "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck"
    | "runtime-config";
  message: string;
}

type TestOnlyAdapterShellContractChecks = {
  sourceNodeV252Ready: boolean;
  sourceStillBlocksExternalRequest: boolean;
  sourceStillBlocksCredentialValue: boolean;
  fakeTransportOnly: boolean;
  requestShapeHandleOnly: boolean;
  responseShapeDoesNotClaimRealConnection: boolean;
  failureMappingCoversSourceTaxonomy: boolean;
  guardConditionsDeclared: boolean;
  fakeTransportProbeCovered: boolean;
  fakeTransportProbeNoExternalRequest: boolean;
  fakeTransportProbeNoCredentialRead: boolean;
  fakeTransportProbeNoProductionWrite: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract: boolean;
};

const PROFILE_VERSION = "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1";
const ACTIVE_PLAN = "docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md";
const ROUTE_PATH = "/api/v1/audit/managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract";
const NODE_V252_ROUTE = "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck";

export function loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile {
  const sourceNodeV252 = createSourceNodeV252(
    loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck({ config: input.config }),
  );
  const testOnlyAdapterShellContract = createTestOnlyAdapterShellContract(sourceNodeV252);
  const checks = createChecks(input.config, sourceNodeV252, testOnlyAdapterShellContract);
  checks.readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract")
    .every(([, value]) => value);
  const shellContractState = checks.readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract
    ? "test-only-adapter-shell-contract-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection test-only adapter shell contract",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    shellContractState,
    readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract:
      checks.readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    testOnlyShell: true,
    readOnlyContract: true,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV252,
    testOnlyAdapterShellContract,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      requestShapeFieldCount: testOnlyAdapterShellContract.requestShapeFieldCount,
      responseShapeFieldCount: testOnlyAdapterShellContract.responseShapeFieldCount,
      failureMappingCount: testOnlyAdapterShellContract.failureMappingCount,
      guardConditionCount: testOnlyAdapterShellContract.guardConditionCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      testOnlyAdapterShellContractJson: ROUTE_PATH,
      testOnlyAdapterShellContractMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV252Json: NODE_V252_ROUTE,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Ask Java v102 and mini-kv v111 to echo this test-only shell boundary before Node v254 verification.",
      "Keep fake transport isolated from any real managed audit endpoint or credential value resolver.",
      "Only after upstream echo passes should a future version verify fake transport dry-run packets.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractMarkdown(
  profile: ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile,
): string {
  return [
    "# Managed audit manual sandbox connection test-only adapter shell contract",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Shell contract state: ${profile.shellContractState}`,
    `- Ready for test-only shell contract: ${profile.readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    "",
    "## Source Node v252",
    "",
    ...renderEntries(profile.sourceNodeV252),
    "",
    "## Test-Only Adapter Shell Contract",
    "",
    ...renderEntries({
      contractDigest: profile.testOnlyAdapterShellContract.contractDigest,
      shellName: profile.testOnlyAdapterShellContract.shellName,
      shellMode: profile.testOnlyAdapterShellContract.shellMode,
      transportKind: profile.testOnlyAdapterShellContract.transportKind,
      realClientImplemented: profile.testOnlyAdapterShellContract.realClientImplemented,
      realTransportAllowed: profile.testOnlyAdapterShellContract.realTransportAllowed,
      fakeTransportOnly: profile.testOnlyAdapterShellContract.fakeTransportOnly,
      clientMayBeInstantiatedForProduction: profile.testOnlyAdapterShellContract.clientMayBeInstantiatedForProduction,
      externalRequestMayBeSent: profile.testOnlyAdapterShellContract.externalRequestMayBeSent,
      credentialValueMayBeLoaded: profile.testOnlyAdapterShellContract.credentialValueMayBeLoaded,
    }),
    "",
    "## Request Shape",
    "",
    ...renderEntries(profile.testOnlyAdapterShellContract.requestShape),
    "",
    "## Response Shape",
    "",
    ...renderEntries(profile.testOnlyAdapterShellContract.responseShape),
    "",
    "## Failure Mapping",
    "",
    ...renderList(
      profile.testOnlyAdapterShellContract.failureMapping.map(formatFailureMapping),
      "No failure mappings.",
    ),
    "",
    "## Guard Conditions",
    "",
    ...renderList(
      profile.testOnlyAdapterShellContract.guardConditions.map(formatGuardCondition),
      "No guard conditions.",
    ),
    "",
    "## Fake Transport Probe",
    "",
    ...renderEntries(profile.testOnlyAdapterShellContract.fakeTransportProbe),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No test-only adapter shell contract blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No test-only adapter shell contract warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No test-only adapter shell contract recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createSourceNodeV252(
  source: ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile,
): ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile["sourceNodeV252"] {
  return {
    sourceVersion: "Node v252",
    profileVersion: source.profileVersion,
    precheckState: source.precheckState,
    precheckDigest: source.disabledAdapterClientPrecheck.precheckDigest,
    readyForDisabledAdapterClientPrecheck:
      source.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck,
    requiredEnvHandleCount: source.disabledAdapterClientPrecheck.requiredEnvHandleCount,
    failureClassCount: source.disabledAdapterClientPrecheck.failureClassCount,
    dryRunResponseFieldCount: source.disabledAdapterClientPrecheck.dryRunResponseFieldCount,
    clientImplementationStatus: source.disabledAdapterClientPrecheck.clientImplementationStatus,
    externalRequestStillBlocked: true,
    credentialValueStillBlocked: true,
  };
}

function createTestOnlyAdapterShellContract(
  sourceNodeV252: ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile["sourceNodeV252"],
): ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile["testOnlyAdapterShellContract"] {
  const requestShape = createRequestShape();
  const responseShape = createResponseShape();
  const failureMapping = createFailureMapping();
  const guardConditions = createGuardConditions();
  const fakeTransportProbe = createFakeTransportProbe();
  const contract = {
    shellName: "ManagedAuditManualSandboxTestOnlyAdapterShell" as const,
    shellMode: "test-only-fake-transport-contract" as const,
    transportKind: "fake-in-memory" as const,
    realClientImplemented: false as const,
    realTransportAllowed: false as const,
    fakeTransportOnly: true as const,
    clientMayBeInstantiatedForProduction: false as const,
    externalRequestMayBeSent: false as const,
    credentialValueMayBeLoaded: false as const,
    requestShapeFieldCount: requestShape.fields.length,
    responseShapeFieldCount: responseShape.fields.length,
    failureMappingCount: failureMapping.length,
    guardConditionCount: guardConditions.length,
    requestShape,
    responseShape,
    failureMapping,
    guardConditions,
    fakeTransportProbe,
    sourceDigest: sourceNodeV252.precheckDigest,
  };

  return {
    contractDigest: sha256StableJson(contract),
    shellName: contract.shellName,
    shellMode: contract.shellMode,
    transportKind: contract.transportKind,
    realClientImplemented: contract.realClientImplemented,
    realTransportAllowed: contract.realTransportAllowed,
    fakeTransportOnly: contract.fakeTransportOnly,
    clientMayBeInstantiatedForProduction: contract.clientMayBeInstantiatedForProduction,
    externalRequestMayBeSent: contract.externalRequestMayBeSent,
    credentialValueMayBeLoaded: contract.credentialValueMayBeLoaded,
    requestShapeFieldCount: contract.requestShapeFieldCount,
    responseShapeFieldCount: contract.responseShapeFieldCount,
    failureMappingCount: contract.failureMappingCount,
    guardConditionCount: contract.guardConditionCount,
    requestShape,
    responseShape,
    failureMapping,
    guardConditions,
    fakeTransportProbe,
  };
}

function createRequestShape(): TestOnlyAdapterRequestShape {
  return {
    fields: [
      "requestId",
      "operation",
      "credentialHandle",
      "endpointHandle",
      "ownerApprovalArtifactId",
      "timeoutBudgetMs",
      "dryRun",
      "fakeTransportOnly",
    ],
    credentialHandleOnly: true,
    credentialValueAccepted: false,
    endpointHandleOnly: true,
    externalUrlAccepted: false,
    payloadMayContainSecrets: false,
  };
}

function createResponseShape(): TestOnlyAdapterResponseShape {
  return {
    fields: [
      "requestId",
      "status",
      "code",
      "fakeTransportOnly",
      "connectionAttempted",
      "externalRequestSent",
      "credentialValueRead",
      "schemaMigrationExecuted",
      "productionRecordWritten",
    ],
    fakeTransportResponseOnly: true,
    connectionAttempted: false,
    externalRequestSent: false,
    credentialValueRead: false,
    schemaMigrationExecuted: false,
    productionRecordWritten: false,
  };
}

function createFailureMapping(): TestOnlyAdapterFailureMapping[] {
  return [
    mapFailure("ADAPTER_CLIENT_DISABLED", "TEST_ONLY_SHELL_DISABLED", "return-fake-failure"),
    mapFailure("CREDENTIAL_HANDLE_MISSING", "TEST_ONLY_CREDENTIAL_HANDLE_MISSING", "pause-and-do-not-connect"),
    mapFailure("CREDENTIAL_VALUE_REQUESTED", "TEST_ONLY_CREDENTIAL_VALUE_BLOCKED", "pause-and-do-not-connect"),
    mapFailure("ENDPOINT_HANDLE_MISSING", "TEST_ONLY_ENDPOINT_HANDLE_MISSING", "pause-and-do-not-connect"),
    mapFailure("SCHEMA_REHEARSAL_MISSING", "TEST_ONLY_SCHEMA_REHEARSAL_MISSING", "pause-and-do-not-connect"),
    mapFailure("MANUAL_WINDOW_NOT_OPEN", "TEST_ONLY_MANUAL_WINDOW_NOT_OPEN", "pause-and-do-not-connect"),
  ];
}

function mapFailure(
  sourceFailureCode: string,
  shellFailureCode: string,
  mappedAction: TestOnlyAdapterFailureMapping["mappedAction"],
): TestOnlyAdapterFailureMapping {
  return {
    sourceFailureCode,
    shellFailureCode,
    mappedAction,
    retryable: false,
  };
}

function createGuardConditions(): TestOnlyAdapterGuardCondition[] {
  return [
    guard("SOURCE_V252_READY", true, "Node v252 disabled adapter client precheck must be ready."),
    guard("FAKE_TRANSPORT_ONLY", true, "Only fake in-memory transport is allowed in v253."),
    guard("CREDENTIAL_HANDLE_ONLY", true, "Requests may carry credential handles only, never credential values."),
    guard("ENDPOINT_HANDLE_ONLY", true, "Requests may carry endpoint handles only, never raw production URLs."),
    guard("UPSTREAM_ACTIONS_DISABLED", true, "UPSTREAM_ACTIONS_ENABLED must stay false."),
    guard("NO_SCHEMA_MIGRATION", true, "The shell contract must not execute schema migration SQL."),
    guard("NO_PRODUCTION_WRITE", true, "The shell contract must not write production audit records."),
  ];
}

function guard(code: string, value: boolean, message: string): TestOnlyAdapterGuardCondition {
  return {
    code,
    required: true,
    value,
    message,
  };
}

function createFakeTransportProbe(): TestOnlyAdapterFakeTransportProbe {
  const probe = {
    requestId: "managed-audit-v253-test-only-shell-probe" as const,
    transportKind: "fake-in-memory" as const,
    acceptedByFakeTransport: true as const,
    responseStatus: "fake-transport-accepted" as const,
    responseCode: "TEST_ONLY_FAKE_TRANSPORT" as const,
    connectionAttempted: false as const,
    externalRequestSent: false as const,
    credentialValueRead: false as const,
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
  sourceNodeV252: ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile["sourceNodeV252"],
  contract: ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile["testOnlyAdapterShellContract"],
): TestOnlyAdapterShellContractChecks {
  return {
    sourceNodeV252Ready: sourceNodeV252.readyForDisabledAdapterClientPrecheck,
    sourceStillBlocksExternalRequest: sourceNodeV252.externalRequestStillBlocked,
    sourceStillBlocksCredentialValue: sourceNodeV252.credentialValueStillBlocked,
    fakeTransportOnly: contract.fakeTransportOnly && contract.transportKind === "fake-in-memory",
    requestShapeHandleOnly:
      contract.requestShape.credentialHandleOnly
      && !contract.requestShape.credentialValueAccepted
      && contract.requestShape.endpointHandleOnly
      && !contract.requestShape.externalUrlAccepted,
    responseShapeDoesNotClaimRealConnection:
      contract.responseShape.fakeTransportResponseOnly
      && !contract.responseShape.connectionAttempted
      && !contract.responseShape.externalRequestSent
      && !contract.responseShape.credentialValueRead,
    failureMappingCoversSourceTaxonomy: contract.failureMapping.length === sourceNodeV252.failureClassCount,
    guardConditionsDeclared: contract.guardConditions.length >= 7 && contract.guardConditions.every((condition) => condition.value),
    fakeTransportProbeCovered: contract.fakeTransportProbe.acceptedByFakeTransport,
    fakeTransportProbeNoExternalRequest: !contract.fakeTransportProbe.externalRequestSent
      && !contract.fakeTransportProbe.connectionAttempted,
    fakeTransportProbeNoCredentialRead: !contract.fakeTransportProbe.credentialValueRead,
    fakeTransportProbeNoProductionWrite: !contract.fakeTransportProbe.productionRecordWritten,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract: false,
  };
}

function collectProductionBlockers(
  checks: TestOnlyAdapterShellContractChecks,
): TestOnlyAdapterShellContractMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: TestOnlyAdapterShellContractMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV252Ready,
      code: "NODE_V252_PRECHECK_NOT_READY",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
      message: "Node v252 disabled adapter client precheck must be ready before v253 shell contract.",
    },
    {
      condition: checks.sourceStillBlocksExternalRequest && checks.sourceStillBlocksCredentialValue,
      code: "SOURCE_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
      message: "The v252 source must still block external requests and credential value loading.",
    },
    {
      condition: checks.fakeTransportOnly,
      code: "REAL_TRANSPORT_SELECTED",
      source: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
      message: "v253 must use fake in-memory transport only.",
    },
    {
      condition: checks.requestShapeHandleOnly && checks.responseShapeDoesNotClaimRealConnection,
      code: "SHELL_SHAPE_UNSAFE",
      source: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
      message: "Request and response shapes must stay handle-only and must not claim real connection effects.",
    },
    {
      condition: checks.failureMappingCoversSourceTaxonomy && checks.guardConditionsDeclared,
      code: "SHELL_GUARDS_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
      message: "Failure mapping and guard conditions must be complete before upstream echo versions consume v253.",
    },
    {
      condition:
        checks.fakeTransportProbeCovered
        && checks.fakeTransportProbeNoExternalRequest
        && checks.fakeTransportProbeNoCredentialRead
        && checks.fakeTransportProbeNoProductionWrite,
      code: "FAKE_TRANSPORT_PROBE_UNSAFE",
      source: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
      message: "The fake transport probe must not attempt connection, read credentials, or write records.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for the v253 test-only shell contract.",
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

function collectWarnings(): TestOnlyAdapterShellContractMessage[] {
  return [
    {
      code: "TEST_ONLY_SHELL_NOT_A_CLIENT",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
      message: "v253 defines a shell contract and fake transport probe only; it does not implement a real client.",
    },
    {
      code: "UPSTREAM_ECHO_REQUIRED_NEXT",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
      message: "Java v102 and mini-kv v111 should echo this boundary before Node v254 verifies alignment.",
    },
  ];
}

function collectRecommendations(): TestOnlyAdapterShellContractMessage[] {
  return [
    {
      code: "KEEP_FAKE_TRANSPORT_ISOLATED",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
      message: "Keep fake transport isolated from config-driven endpoint resolution in future versions.",
    },
    {
      code: "VERIFY_ECHO_BEFORE_DRY_RUN_PACKET",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
      message: "Do not advance to fake transport dry-run packet until Java and mini-kv echo receipts are ready.",
    },
  ];
}

function formatFailureMapping(mapping: TestOnlyAdapterFailureMapping): string {
  return `${mapping.sourceFailureCode} -> ${mapping.shellFailureCode}; action=${mapping.mappedAction}; retryable=${mapping.retryable}`;
}

function formatGuardCondition(condition: TestOnlyAdapterGuardCondition): string {
  return `${condition.code}: required=${condition.required}; value=${condition.value}; ${condition.message}`;
}
