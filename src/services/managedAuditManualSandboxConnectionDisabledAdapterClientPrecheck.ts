import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionDecisionRecord,
  type ManagedAuditManualSandboxConnectionDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionDecisionRecord.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export interface ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1";
  precheckState: "disabled-adapter-client-precheck-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyPrecheck: true;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV251: {
    sourceVersion: "Node v251";
    profileVersion: ManagedAuditManualSandboxConnectionDecisionRecordProfile["profileVersion"];
    decisionState: ManagedAuditManualSandboxConnectionDecisionRecordProfile["decisionState"];
    decisionDigest: string;
    readyForDecisionRecord: boolean;
    requiredDecisionFieldCount: number;
    noGoConditionCount: number;
    connectionStillBlocked: true;
    credentialValueStillBlocked: true;
    schemaMigrationStillBlocked: true;
    autoStartStillBlocked: true;
  };
  disabledAdapterClientPrecheck: {
    precheckDigest: string;
    adapterMode: "disabled-client-precheck-only";
    clientImplementationStatus: "not-implemented";
    clientMayBeInstantiated: false;
    externalRequestMayBeSent: false;
    credentialValueMayBeLoaded: false;
    optInGateRequired: true;
    requiredEnvHandleCount: number;
    failureClassCount: number;
    dryRunResponseFieldCount: number;
    requiredEnvHandles: AdapterEnvHandle[];
    optInGate: AdapterOptInGate;
    failureTaxonomy: AdapterFailureClass[];
    dryRunResponseShape: AdapterDryRunResponseShape;
    reusedNoGoConditions: readonly string[];
  };
  checks: DisabledAdapterClientPrecheckChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    requiredEnvHandleCount: number;
    failureClassCount: number;
    dryRunResponseFieldCount: number;
    reusedNoGoConditionCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: DisabledAdapterClientPrecheckMessage[];
  warnings: DisabledAdapterClientPrecheckMessage[];
  recommendations: DisabledAdapterClientPrecheckMessage[];
  evidenceEndpoints: {
    disabledAdapterClientPrecheckJson: string;
    disabledAdapterClientPrecheckMarkdown: string;
    sourceNodeV251Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface AdapterEnvHandle {
  name: string;
  purpose: string;
  valueRequiredForPrecheck: false;
  credentialValue: false;
  requiredBeforeRealConnection: boolean;
}

interface AdapterOptInGate {
  gateName: "ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED";
  requiredValueForFutureConnection: "true";
  currentDefault: "false";
  precheckTreatsEnabledAsBlocked: true;
  operatorApprovalRequired: true;
}

interface AdapterFailureClass {
  code: string;
  source: "configuration" | "credential-boundary" | "network-boundary" | "schema-boundary" | "operator-boundary";
  retryable: boolean;
  action: "pause-and-review" | "pause-and-do-not-connect";
}

interface AdapterDryRunResponseShape {
  fields: readonly string[];
  readyState: "disabled-adapter-client-precheck-ready";
  connectionAttempted: false;
  credentialValueRead: false;
  externalRequestSent: false;
  schemaMigrationExecuted: false;
}

interface DisabledAdapterClientPrecheckMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck"
    | "node-v251-decision-record"
    | "runtime-config";
  message: string;
}

type DisabledAdapterClientPrecheckChecks = {
  sourceNodeV251Ready: boolean;
  sourceDecisionRecordStillBlocksConnection: boolean;
  sourceDecisionRecordStillBlocksCredentialValue: boolean;
  sourceDecisionRecordStillBlocksSchemaMigration: boolean;
  sourceDecisionRecordStillBlocksAutoStart: boolean;
  requiredEnvHandlesDeclared: boolean;
  envHandlesRemainHandleOnly: boolean;
  optInGateDeclared: boolean;
  optInGateDefaultDisabled: boolean;
  failureTaxonomyDeclared: boolean;
  dryRunResponseShapeDeclared: boolean;
  adapterClientNotImplemented: boolean;
  clientInstantiationBlocked: boolean;
  externalRequestBlocked: boolean;
  credentialValueLoadBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck: boolean;
};

const ACTIVE_PLAN = "docs/plans/v245-post-sandbox-precheck-roadmap.md";
const ROUTE_PATH = "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck";
const NODE_V251_ROUTE = "/api/v1/audit/managed-audit-manual-sandbox-connection-decision-record";

export function loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile {
  const sourceNodeV251 = createSourceNodeV251(
    loadManagedAuditManualSandboxConnectionDecisionRecord({
      config: input.config,
    }),
  );
  const disabledAdapterClientPrecheck = createDisabledAdapterClientPrecheck();
  const checks = createChecks(input.config, sourceNodeV251, disabledAdapterClientPrecheck);
  checks.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck")
    .every(([, value]) => value);
  const precheckState = checks.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck
    ? "disabled-adapter-client-precheck-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection disabled adapter client precheck",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1",
    precheckState,
    readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck:
      checks.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyPrecheck: true,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV251,
    disabledAdapterClientPrecheck,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      requiredEnvHandleCount: disabledAdapterClientPrecheck.requiredEnvHandleCount,
      failureClassCount: disabledAdapterClientPrecheck.failureClassCount,
      dryRunResponseFieldCount: disabledAdapterClientPrecheck.dryRunResponseFieldCount,
      reusedNoGoConditionCount: disabledAdapterClientPrecheck.reusedNoGoConditions.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledAdapterClientPrecheckJson: ROUTE_PATH,
      disabledAdapterClientPrecheckMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV251Json: NODE_V251_ROUTE,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Keep this as a disabled client precheck until an explicit future version chooses a test-only adapter shell.",
      "Do not add credential value loading; pass only credential handles and review status through future interfaces.",
      "If a future test-only adapter shell is built, it must use fake transport or loopback fixtures before any external endpoint.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckMarkdown(
  profile: ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection disabled adapter client precheck",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Precheck state", profile.precheckState],
      [
        "Ready for disabled adapter client precheck",
        profile.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck,
      ],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      { heading: "Source Node v251", entries: profile.sourceNodeV251 },
      {
        heading: "Disabled Adapter Client Precheck",
        entries: {
          precheckDigest: profile.disabledAdapterClientPrecheck.precheckDigest,
          adapterMode: profile.disabledAdapterClientPrecheck.adapterMode,
          clientImplementationStatus: profile.disabledAdapterClientPrecheck.clientImplementationStatus,
          clientMayBeInstantiated: profile.disabledAdapterClientPrecheck.clientMayBeInstantiated,
          externalRequestMayBeSent: profile.disabledAdapterClientPrecheck.externalRequestMayBeSent,
          credentialValueMayBeLoaded: profile.disabledAdapterClientPrecheck.credentialValueMayBeLoaded,
          optInGateRequired: profile.disabledAdapterClientPrecheck.optInGateRequired,
        },
      },
      {
        heading: "Required Env Handles",
        list: profile.disabledAdapterClientPrecheck.requiredEnvHandles.map(formatEnvHandle),
        emptyText: "No env handles.",
      },
      { heading: "Opt-In Gate", entries: profile.disabledAdapterClientPrecheck.optInGate },
      {
        heading: "Failure Taxonomy",
        list: profile.disabledAdapterClientPrecheck.failureTaxonomy.map(formatFailureClass),
        emptyText: "No failure classes.",
      },
      { heading: "Dry-Run Response Shape", entries: profile.disabledAdapterClientPrecheck.dryRunResponseShape },
      {
        heading: "Reused No-Go Conditions",
        list: [...profile.disabledAdapterClientPrecheck.reusedNoGoConditions],
        emptyText: "No no-go conditions.",
      },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No disabled adapter client precheck blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No disabled adapter client precheck warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No disabled adapter client precheck recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function createSourceNodeV251(
  source: ManagedAuditManualSandboxConnectionDecisionRecordProfile,
): ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile["sourceNodeV251"] {
  return {
    sourceVersion: "Node v251",
    profileVersion: source.profileVersion,
    decisionState: source.decisionState,
    decisionDigest: source.decisionRecord.decisionDigest,
    readyForDecisionRecord: source.readyForManagedAuditManualSandboxConnectionDecisionRecord,
    requiredDecisionFieldCount: source.decisionRecord.requiredDecisionFieldCount,
    noGoConditionCount: source.decisionRecord.noGoConditionCount,
    connectionStillBlocked: true,
    credentialValueStillBlocked: true,
    schemaMigrationStillBlocked: true,
    autoStartStillBlocked: true,
  };
}

function createDisabledAdapterClientPrecheck(): ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile["disabledAdapterClientPrecheck"] {
  const requiredEnvHandles = createRequiredEnvHandles();
  const optInGate = createOptInGate();
  const failureTaxonomy = createFailureTaxonomy();
  const dryRunResponseShape = createDryRunResponseShape();
  const reusedNoGoConditions = Object.freeze([
    "CREDENTIAL_VALUE_REQUIRED",
    "SCHEMA_MIGRATION_REQUIRED",
    "UPSTREAM_AUTO_START_REQUIRED",
    "APPROVAL_LEDGER_WRITE_REQUIRED",
    "MINI_KV_STORAGE_BACKEND_REQUIRED",
    "OWNER_ARTIFACT_MISSING",
    "ROLLBACK_OR_ABORT_MISSING",
    "TIMEOUT_POLICY_MISSING",
  ]);
  const precheck = {
    adapterMode: "disabled-client-precheck-only" as const,
    clientImplementationStatus: "not-implemented" as const,
    clientMayBeInstantiated: false as const,
    externalRequestMayBeSent: false as const,
    credentialValueMayBeLoaded: false as const,
    optInGateRequired: true as const,
    requiredEnvHandleCount: requiredEnvHandles.length,
    failureClassCount: failureTaxonomy.length,
    dryRunResponseFieldCount: dryRunResponseShape.fields.length,
    requiredEnvHandles,
    optInGate,
    failureTaxonomy,
    dryRunResponseShape,
    reusedNoGoConditions,
  };

  return {
    precheckDigest: sha256StableJson(precheck),
    ...precheck,
  };
}

function createRequiredEnvHandles(): AdapterEnvHandle[] {
  return [
    {
      name: "ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED",
      purpose: "Future explicit opt-in gate; precheck expects the default to remain false.",
      valueRequiredForPrecheck: false,
      credentialValue: false,
      requiredBeforeRealConnection: true,
    },
    {
      name: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
      purpose: "Opaque endpoint handle or registry key, not a raw production URL.",
      valueRequiredForPrecheck: false,
      credentialValue: false,
      requiredBeforeRealConnection: true,
    },
    {
      name: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
      purpose: "Credential handle name only; the resolved credential value must stay outside Node.",
      valueRequiredForPrecheck: false,
      credentialValue: false,
      requiredBeforeRealConnection: true,
    },
    {
      name: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
      purpose: "Human-owned approval artifact id from the v251 decision record.",
      valueRequiredForPrecheck: false,
      credentialValue: false,
      requiredBeforeRealConnection: true,
    },
    {
      name: "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS",
      purpose: "Finite timeout handle for a future guarded connection attempt.",
      valueRequiredForPrecheck: false,
      credentialValue: false,
      requiredBeforeRealConnection: true,
    },
  ];
}

function createOptInGate(): AdapterOptInGate {
  return {
    gateName: "ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED",
    requiredValueForFutureConnection: "true",
    currentDefault: "false",
    precheckTreatsEnabledAsBlocked: true,
    operatorApprovalRequired: true,
  };
}

function createFailureTaxonomy(): AdapterFailureClass[] {
  return [
    {
      code: "ADAPTER_CLIENT_DISABLED",
      source: "configuration",
      retryable: false,
      action: "pause-and-review",
    },
    {
      code: "CREDENTIAL_HANDLE_MISSING",
      source: "credential-boundary",
      retryable: false,
      action: "pause-and-do-not-connect",
    },
    {
      code: "CREDENTIAL_VALUE_REQUESTED",
      source: "credential-boundary",
      retryable: false,
      action: "pause-and-do-not-connect",
    },
    {
      code: "ENDPOINT_HANDLE_MISSING",
      source: "network-boundary",
      retryable: false,
      action: "pause-and-do-not-connect",
    },
    {
      code: "SCHEMA_REHEARSAL_MISSING",
      source: "schema-boundary",
      retryable: false,
      action: "pause-and-do-not-connect",
    },
    {
      code: "MANUAL_WINDOW_NOT_OPEN",
      source: "operator-boundary",
      retryable: false,
      action: "pause-and-do-not-connect",
    },
  ];
}

function createDryRunResponseShape(): AdapterDryRunResponseShape {
  return {
    fields: [
      "profileVersion",
      "precheckState",
      "adapterMode",
      "optInGate",
      "requiredEnvHandles",
      "failureTaxonomy",
      "connectionAttempted",
      "credentialValueRead",
      "externalRequestSent",
      "schemaMigrationExecuted",
    ],
    readyState: "disabled-adapter-client-precheck-ready",
    connectionAttempted: false,
    credentialValueRead: false,
    externalRequestSent: false,
    schemaMigrationExecuted: false,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV251: ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile["sourceNodeV251"],
  precheck: ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile["disabledAdapterClientPrecheck"],
): DisabledAdapterClientPrecheckChecks {
  return {
    sourceNodeV251Ready: sourceNodeV251.readyForDecisionRecord,
    sourceDecisionRecordStillBlocksConnection: sourceNodeV251.connectionStillBlocked,
    sourceDecisionRecordStillBlocksCredentialValue: sourceNodeV251.credentialValueStillBlocked,
    sourceDecisionRecordStillBlocksSchemaMigration: sourceNodeV251.schemaMigrationStillBlocked,
    sourceDecisionRecordStillBlocksAutoStart: sourceNodeV251.autoStartStillBlocked,
    requiredEnvHandlesDeclared: precheck.requiredEnvHandles.length === 5,
    envHandlesRemainHandleOnly: precheck.requiredEnvHandles.every(
      (handle) => !handle.valueRequiredForPrecheck && !handle.credentialValue,
    ),
    optInGateDeclared: precheck.optInGate.gateName === "ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED",
    optInGateDefaultDisabled:
      precheck.optInGate.currentDefault === "false" && precheck.optInGate.precheckTreatsEnabledAsBlocked,
    failureTaxonomyDeclared: precheck.failureTaxonomy.length >= 6,
    dryRunResponseShapeDeclared:
      precheck.dryRunResponseShape.fields.includes("connectionAttempted")
      && precheck.dryRunResponseShape.fields.includes("credentialValueRead")
      && !precheck.dryRunResponseShape.connectionAttempted
      && !precheck.dryRunResponseShape.credentialValueRead,
    adapterClientNotImplemented: precheck.clientImplementationStatus === "not-implemented",
    clientInstantiationBlocked: !precheck.clientMayBeInstantiated,
    externalRequestBlocked: !precheck.externalRequestMayBeSent,
    credentialValueLoadBlocked: !precheck.credentialValueMayBeLoaded,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck: false,
  };
}

function collectProductionBlockers(
  checks: DisabledAdapterClientPrecheckChecks,
): DisabledAdapterClientPrecheckMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: DisabledAdapterClientPrecheckMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV251Ready,
      code: "NODE_V251_DECISION_RECORD_NOT_READY",
      source: "node-v251-decision-record",
      message: "Node v251 decision record must be ready before v252 can define disabled adapter client precheck.",
    },
    {
      condition:
        checks.sourceDecisionRecordStillBlocksConnection
        && checks.sourceDecisionRecordStillBlocksCredentialValue
        && checks.sourceDecisionRecordStillBlocksSchemaMigration
        && checks.sourceDecisionRecordStillBlocksAutoStart,
      code: "SOURCE_DECISION_BOUNDARY_OPENED",
      source: "node-v251-decision-record",
      message: "The source decision record must still block connection, credential value, schema migration, and auto-start.",
    },
    {
      condition: checks.requiredEnvHandlesDeclared && checks.envHandlesRemainHandleOnly,
      code: "ENV_HANDLES_INVALID",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
      message: "Required env handles must be declared as handle-only values for precheck.",
    },
    {
      condition: checks.optInGateDeclared && checks.optInGateDefaultDisabled,
      code: "OPT_IN_GATE_INVALID",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
      message: "The adapter client opt-in gate must exist and default to disabled.",
    },
    {
      condition: checks.failureTaxonomyDeclared && checks.dryRunResponseShapeDeclared,
      code: "PRECHECK_SHAPE_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
      message: "Failure taxonomy and dry-run response shape must be declared before any adapter client work.",
    },
    {
      condition:
        checks.adapterClientNotImplemented
        && checks.clientInstantiationBlocked
        && checks.externalRequestBlocked
        && checks.credentialValueLoadBlocked,
      code: "ADAPTER_CLIENT_NOT_DISABLED",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
      message: "v252 must not implement, instantiate, call, or credential-load a managed audit adapter client.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during disabled adapter client precheck.",
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

function collectWarnings(): DisabledAdapterClientPrecheckMessage[] {
  return [
    {
      code: "DISABLED_PRECHECK_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
      message: "v252 defines a disabled client precheck only; it does not add a real adapter client.",
    },
    {
      code: "OPT_IN_GATE_BLOCKS_ENABLED_STATE",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
      message: "If the adapter client opt-in gate is enabled during this precheck, the version should block rather than connect.",
    },
  ];
}

function collectRecommendations(): DisabledAdapterClientPrecheckMessage[] {
  return [
    {
      code: "NEXT_VERSION_CAN_DEFINE_TEST_ONLY_SHELL",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
      message: "A later version may define a test-only adapter shell backed by fake transport, still without credential values.",
    },
    {
      code: "KEEP_FAILURE_TAXONOMY_VISIBLE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
      message: "Expose the failure taxonomy in any future operator-facing runbook before allowing real connection windows.",
    },
  ];
}

function formatEnvHandle(handle: AdapterEnvHandle): string {
  return `${handle.name}: ${handle.purpose}; valueRequiredForPrecheck=${handle.valueRequiredForPrecheck}; credentialValue=${handle.credentialValue}; requiredBeforeRealConnection=${handle.requiredBeforeRealConnection}`;
}

function formatFailureClass(failure: AdapterFailureClass): string {
  return `${failure.code}: source=${failure.source}; retryable=${failure.retryable}; action=${failure.action}`;
}
