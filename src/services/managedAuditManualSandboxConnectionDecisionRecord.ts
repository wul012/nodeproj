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
  loadManagedAuditManualSandboxConnectionRehearsalGuard,
  type ManagedAuditManualSandboxConnectionRehearsalGuardProfile,
} from "./managedAuditManualSandboxConnectionRehearsalGuard.js";

export interface ManagedAuditManualSandboxConnectionDecisionRecordProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-decision-record.v1";
  decisionState: "manual-sandbox-connection-decision-record-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionDecisionRecord: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyDecisionRecord: true;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV250: {
    sourceVersion: "Node v250";
    profileVersion: ManagedAuditManualSandboxConnectionRehearsalGuardProfile["profileVersion"];
    guardState: ManagedAuditManualSandboxConnectionRehearsalGuardProfile["guardState"];
    guardDigest: string;
    readyForRehearsalGuard: boolean;
    requiredOperatorArtifactCount: number;
    requiredSecurityMaintenanceCount: number;
    nodeSecurityMaintenanceReady: boolean;
    javaSecurityMaintenanceReady: boolean;
    miniKvSecurityMaintenanceReady: boolean;
    connectionStillBlocked: true;
    credentialValueStillBlocked: true;
    schemaMigrationStillBlocked: true;
    autoStartStillBlocked: true;
    miniKvStillNonAuthoritative: true;
  };
  decisionRecord: {
    decisionDigest: string;
    recordMode: "manual-sandbox-connection-decision-record-only";
    decisionScope: "managed-audit-manual-sandbox-connection";
    decisionStatus: "human-review-required-before-connection";
    sourceSpan: "Node v250 rehearsal guard";
    ownerApprovalArtifactId: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID";
    credentialHandleReviewStatus: "required-handle-only-no-value-read";
    schemaRehearsalApprovalId: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID";
    manualWindowMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_WINDOW_OPEN";
    rollbackPathId: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID";
    abortMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT";
    timeoutPolicy: "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS";
    requiredDecisionFieldCount: 7;
    noGoConditionCount: number;
    requiredDecisionFields: DecisionRecordField[];
    explicitNoGoConditions: DecisionNoGoCondition[];
    credentialValueMayBeRead: false;
    managedAuditConnectionMayOpen: false;
    schemaMigrationMayExecute: false;
    nodeMayStartJavaOrMiniKv: false;
    miniKvMayActAsManagedAuditStorage: false;
    approvalLedgerMayBeWritten: false;
    javaSqlMayExecute: false;
  };
  checks: DecisionRecordChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    requiredDecisionFieldCount: number;
    noGoConditionCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: DecisionRecordMessage[];
  warnings: DecisionRecordMessage[];
  recommendations: DecisionRecordMessage[];
  evidenceEndpoints: {
    decisionRecordJson: string;
    decisionRecordMarkdown: string;
    sourceNodeV250Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface DecisionRecordField {
  id: string;
  label: string;
  expectedSource: string;
  required: true;
  nodeMayReadValue: boolean;
  acceptedEvidence: string;
}

interface DecisionNoGoCondition {
  code: string;
  condition: string;
  action: "pause-and-do-not-connect";
}

interface DecisionRecordMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-decision-record"
    | "node-v250-rehearsal-guard"
    | "runtime-config";
  message: string;
}

type DecisionRecordChecks = {
  sourceNodeV250Ready: boolean;
  sourceNodeV250StillBlocksConnection: boolean;
  sourceNodeV250StillBlocksCredentialValue: boolean;
  sourceNodeV250StillBlocksSchemaMigration: boolean;
  sourceNodeV250StillBlocksAutoStart: boolean;
  sourceNodeV250KeepsMiniKvNonAuthoritative: boolean;
  requiredSecurityMaintenanceComplete: boolean;
  ownerApprovalArtifactRecorded: boolean;
  credentialHandleReviewRecorded: boolean;
  schemaRehearsalApprovalRecorded: boolean;
  manualWindowMarkerRecorded: boolean;
  rollbackPathRecorded: boolean;
  abortMarkerRecorded: boolean;
  timeoutPolicyRecorded: boolean;
  explicitNoGoConditionsRecorded: boolean;
  decisionRecordStillReadOnly: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionDecisionRecord: boolean;
};

const ACTIVE_PLAN = "docs/plans/v245-post-sandbox-precheck-roadmap.md";
const ROUTE_PATH = "/api/v1/audit/managed-audit-manual-sandbox-connection-decision-record";
const NODE_V250_ROUTE = "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-guard";

export function loadManagedAuditManualSandboxConnectionDecisionRecord(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionDecisionRecordProfile {
  const sourceNodeV250 = createSourceNodeV250(
    loadManagedAuditManualSandboxConnectionRehearsalGuard({
      config: input.config,
    }),
  );
  const decisionRecord = createDecisionRecord();
  const checks = createChecks(input.config, sourceNodeV250, decisionRecord);
  checks.readyForManagedAuditManualSandboxConnectionDecisionRecord = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionDecisionRecord")
    .every(([, value]) => value);
  const decisionState = checks.readyForManagedAuditManualSandboxConnectionDecisionRecord
    ? "manual-sandbox-connection-decision-record-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection decision record",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-decision-record.v1",
    decisionState,
    readyForManagedAuditManualSandboxConnectionDecisionRecord:
      checks.readyForManagedAuditManualSandboxConnectionDecisionRecord,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyDecisionRecord: true,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV250,
    decisionRecord,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      requiredDecisionFieldCount: decisionRecord.requiredDecisionFieldCount,
      noGoConditionCount: decisionRecord.noGoConditionCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      decisionRecordJson: ROUTE_PATH,
      decisionRecordMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV250Json: NODE_V250_ROUTE,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Use this decision record as the human review envelope before any real managed audit sandbox connection work.",
      "Keep credential material as a handle/review status only; do not add credential value loading to Node.",
      "If the decision becomes go, create a separate guarded adapter-client version with explicit opt-in and test-only endpoints first.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionDecisionRecordMarkdown(
  profile: ManagedAuditManualSandboxConnectionDecisionRecordProfile,
): string {
  return [
    "# Managed audit manual sandbox connection decision record",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Decision state: ${profile.decisionState}`,
    `- Ready for decision record: ${profile.readyForManagedAuditManualSandboxConnectionDecisionRecord}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    "",
    "## Source Node v250",
    "",
    ...renderEntries(profile.sourceNodeV250),
    "",
    "## Decision Record",
    "",
    ...renderEntries({
      decisionDigest: profile.decisionRecord.decisionDigest,
      recordMode: profile.decisionRecord.recordMode,
      decisionScope: profile.decisionRecord.decisionScope,
      decisionStatus: profile.decisionRecord.decisionStatus,
      sourceSpan: profile.decisionRecord.sourceSpan,
      requiredDecisionFieldCount: profile.decisionRecord.requiredDecisionFieldCount,
      noGoConditionCount: profile.decisionRecord.noGoConditionCount,
      credentialValueMayBeRead: profile.decisionRecord.credentialValueMayBeRead,
      managedAuditConnectionMayOpen: profile.decisionRecord.managedAuditConnectionMayOpen,
      schemaMigrationMayExecute: profile.decisionRecord.schemaMigrationMayExecute,
      nodeMayStartJavaOrMiniKv: profile.decisionRecord.nodeMayStartJavaOrMiniKv,
      miniKvMayActAsManagedAuditStorage: profile.decisionRecord.miniKvMayActAsManagedAuditStorage,
    }),
    "",
    "## Required Decision Fields",
    "",
    ...renderList(profile.decisionRecord.requiredDecisionFields.map(formatDecisionField), "No required fields."),
    "",
    "## Explicit No-Go Conditions",
    "",
    ...renderList(profile.decisionRecord.explicitNoGoConditions.map(formatNoGoCondition), "No no-go conditions."),
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
    ...renderMessages(profile.productionBlockers, "No decision record blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No decision record warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No decision record recommendations."),
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

function createSourceNodeV250(
  source: ManagedAuditManualSandboxConnectionRehearsalGuardProfile,
): ManagedAuditManualSandboxConnectionDecisionRecordProfile["sourceNodeV250"] {
  return {
    sourceVersion: "Node v250",
    profileVersion: source.profileVersion,
    guardState: source.guardState,
    guardDigest: source.rehearsalGuard.guardDigest,
    readyForRehearsalGuard: source.readyForManagedAuditManualSandboxConnectionRehearsalGuard,
    requiredOperatorArtifactCount: source.rehearsalGuard.requiredOperatorArtifactCount,
    requiredSecurityMaintenanceCount: source.rehearsalGuard.requiredSecurityMaintenanceCount,
    nodeSecurityMaintenanceReady: source.sourceNodeV249.readyForRehearsalGuard,
    javaSecurityMaintenanceReady: source.upstreamSecurityMaintenance.javaV101.readyForRehearsalGuard,
    miniKvSecurityMaintenanceReady: source.upstreamSecurityMaintenance.miniKvV110.readyForRehearsalGuard,
    connectionStillBlocked: true,
    credentialValueStillBlocked: true,
    schemaMigrationStillBlocked: true,
    autoStartStillBlocked: true,
    miniKvStillNonAuthoritative: true,
  };
}

function createDecisionRecord(): ManagedAuditManualSandboxConnectionDecisionRecordProfile["decisionRecord"] {
  const requiredDecisionFields = createRequiredDecisionFields();
  const explicitNoGoConditions = createNoGoConditions();
  const record = {
    recordMode: "manual-sandbox-connection-decision-record-only" as const,
    decisionScope: "managed-audit-manual-sandbox-connection" as const,
    decisionStatus: "human-review-required-before-connection" as const,
    sourceSpan: "Node v250 rehearsal guard" as const,
    ownerApprovalArtifactId: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID" as const,
    credentialHandleReviewStatus: "required-handle-only-no-value-read" as const,
    schemaRehearsalApprovalId: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID" as const,
    manualWindowMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_WINDOW_OPEN" as const,
    rollbackPathId: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID" as const,
    abortMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT" as const,
    timeoutPolicy: "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS" as const,
    requiredDecisionFieldCount: 7 as const,
    noGoConditionCount: explicitNoGoConditions.length,
    requiredDecisionFields,
    explicitNoGoConditions,
    credentialValueMayBeRead: false as const,
    managedAuditConnectionMayOpen: false as const,
    schemaMigrationMayExecute: false as const,
    nodeMayStartJavaOrMiniKv: false as const,
    miniKvMayActAsManagedAuditStorage: false as const,
    approvalLedgerMayBeWritten: false as const,
    javaSqlMayExecute: false as const,
  };

  return {
    decisionDigest: sha256StableJson(record),
    ...record,
  };
}

function createRequiredDecisionFields(): DecisionRecordField[] {
  return [
    {
      id: "owner-approval-artifact",
      label: "Owner approval artifact",
      expectedSource: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
      required: true,
      nodeMayReadValue: true,
      acceptedEvidence: "Opaque artifact id only; content review remains human-owned.",
    },
    {
      id: "credential-handle-review",
      label: "Credential handle review status",
      expectedSource: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
      required: true,
      nodeMayReadValue: false,
      acceptedEvidence: "Credential handle/review status only; credential value must not enter Node.",
    },
    {
      id: "schema-rehearsal-approval",
      label: "Schema rehearsal approval",
      expectedSource: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
      required: true,
      nodeMayReadValue: true,
      acceptedEvidence: "Dry-run schema rehearsal identifier, not SQL execution.",
    },
    {
      id: "manual-window-marker",
      label: "Manual window open marker",
      expectedSource: "ORDEROPS_MANAGED_AUDIT_MANUAL_WINDOW_OPEN",
      required: true,
      nodeMayReadValue: true,
      acceptedEvidence: "Explicit human window marker; Node must not infer it from schedule alone.",
    },
    {
      id: "rollback-path",
      label: "Rollback path",
      expectedSource: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
      required: true,
      nodeMayReadValue: true,
      acceptedEvidence: "Rollback path id and owner review, not rollback execution.",
    },
    {
      id: "abort-marker",
      label: "Manual abort marker",
      expectedSource: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
      required: true,
      nodeMayReadValue: true,
      acceptedEvidence: "Manual abort marker must remain available before any real connection attempt.",
    },
    {
      id: "timeout-policy",
      label: "Timeout policy",
      expectedSource: "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS",
      required: true,
      nodeMayReadValue: true,
      acceptedEvidence: "Finite timeout budget for a future guarded connection attempt.",
    },
  ];
}

function createNoGoConditions(): DecisionNoGoCondition[] {
  return [
    {
      code: "CREDENTIAL_VALUE_REQUIRED",
      condition: "Any step requires Node to read or store a managed audit credential value.",
      action: "pause-and-do-not-connect",
    },
    {
      code: "SCHEMA_MIGRATION_REQUIRED",
      condition: "Any step requires Node or Java to execute schema migration SQL.",
      action: "pause-and-do-not-connect",
    },
    {
      code: "UPSTREAM_AUTO_START_REQUIRED",
      condition: "Any step requires Node to start Java, mini-kv, or the external managed audit service.",
      action: "pause-and-do-not-connect",
    },
    {
      code: "APPROVAL_LEDGER_WRITE_REQUIRED",
      condition: "Any step requires writing approval ledger or managed audit state.",
      action: "pause-and-do-not-connect",
    },
    {
      code: "MINI_KV_STORAGE_BACKEND_REQUIRED",
      condition: "Any step requires mini-kv to become the managed audit storage backend.",
      action: "pause-and-do-not-connect",
    },
    {
      code: "OWNER_ARTIFACT_MISSING",
      condition: "Owner approval artifact id is missing, stale, or not reviewable by a human operator.",
      action: "pause-and-do-not-connect",
    },
    {
      code: "ROLLBACK_OR_ABORT_MISSING",
      condition: "Rollback path or manual abort marker is missing before connection work starts.",
      action: "pause-and-do-not-connect",
    },
    {
      code: "TIMEOUT_POLICY_MISSING",
      condition: "A finite timeout budget is missing or cannot be reviewed before connection work starts.",
      action: "pause-and-do-not-connect",
    },
  ];
}

function createChecks(
  config: AppConfig,
  sourceNodeV250: ManagedAuditManualSandboxConnectionDecisionRecordProfile["sourceNodeV250"],
  decisionRecord: ManagedAuditManualSandboxConnectionDecisionRecordProfile["decisionRecord"],
): DecisionRecordChecks {
  return {
    sourceNodeV250Ready: sourceNodeV250.readyForRehearsalGuard,
    sourceNodeV250StillBlocksConnection: sourceNodeV250.connectionStillBlocked,
    sourceNodeV250StillBlocksCredentialValue: sourceNodeV250.credentialValueStillBlocked,
    sourceNodeV250StillBlocksSchemaMigration: sourceNodeV250.schemaMigrationStillBlocked,
    sourceNodeV250StillBlocksAutoStart: sourceNodeV250.autoStartStillBlocked,
    sourceNodeV250KeepsMiniKvNonAuthoritative: sourceNodeV250.miniKvStillNonAuthoritative,
    requiredSecurityMaintenanceComplete:
      sourceNodeV250.nodeSecurityMaintenanceReady
      && sourceNodeV250.javaSecurityMaintenanceReady
      && sourceNodeV250.miniKvSecurityMaintenanceReady,
    ownerApprovalArtifactRecorded: hasDecisionField(decisionRecord, "owner-approval-artifact"),
    credentialHandleReviewRecorded: hasDecisionField(decisionRecord, "credential-handle-review"),
    schemaRehearsalApprovalRecorded: hasDecisionField(decisionRecord, "schema-rehearsal-approval"),
    manualWindowMarkerRecorded: hasDecisionField(decisionRecord, "manual-window-marker"),
    rollbackPathRecorded: hasDecisionField(decisionRecord, "rollback-path"),
    abortMarkerRecorded: hasDecisionField(decisionRecord, "abort-marker"),
    timeoutPolicyRecorded: hasDecisionField(decisionRecord, "timeout-policy"),
    explicitNoGoConditionsRecorded: decisionRecord.explicitNoGoConditions.length >= 8,
    decisionRecordStillReadOnly:
      !decisionRecord.credentialValueMayBeRead
      && !decisionRecord.managedAuditConnectionMayOpen
      && !decisionRecord.schemaMigrationMayExecute
      && !decisionRecord.nodeMayStartJavaOrMiniKv
      && !decisionRecord.miniKvMayActAsManagedAuditStorage
      && !decisionRecord.approvalLedgerMayBeWritten
      && !decisionRecord.javaSqlMayExecute,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionDecisionRecord: false,
  };
}

function collectProductionBlockers(checks: DecisionRecordChecks): DecisionRecordMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: DecisionRecordMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV250Ready,
      code: "NODE_V250_GUARD_NOT_READY",
      source: "node-v250-rehearsal-guard",
      message: "Node v250 rehearsal guard must be ready before v251 can create a decision record.",
    },
    {
      condition:
        checks.sourceNodeV250StillBlocksConnection
        && checks.sourceNodeV250StillBlocksCredentialValue
        && checks.sourceNodeV250StillBlocksSchemaMigration
        && checks.sourceNodeV250StillBlocksAutoStart
        && checks.sourceNodeV250KeepsMiniKvNonAuthoritative,
      code: "SOURCE_GUARD_BOUNDARY_OPENED",
      source: "node-v250-rehearsal-guard",
      message: "The source guard must still block connection, credential value, schema migration, auto-start, and mini-kv storage authority.",
    },
    {
      condition: checks.requiredSecurityMaintenanceComplete,
      code: "SECURITY_MAINTENANCE_BATCH_INCOMPLETE",
      source: "node-v250-rehearsal-guard",
      message: "Node v249, Java v101, and mini-kv v110 security maintenance evidence must remain complete.",
    },
    {
      condition:
        checks.ownerApprovalArtifactRecorded
        && checks.credentialHandleReviewRecorded
        && checks.schemaRehearsalApprovalRecorded
        && checks.manualWindowMarkerRecorded
        && checks.rollbackPathRecorded
        && checks.abortMarkerRecorded
        && checks.timeoutPolicyRecorded,
      code: "DECISION_FIELDS_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-decision-record",
      message: "The decision record must include all seven required manual decision fields.",
    },
    {
      condition: checks.explicitNoGoConditionsRecorded,
      code: "NO_GO_CONDITIONS_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-decision-record",
      message: "The decision record must include explicit no-go conditions before any connection work.",
    },
    {
      condition: checks.decisionRecordStillReadOnly,
      code: "DECISION_RECORD_NOT_READ_ONLY",
      source: "managed-audit-manual-sandbox-connection-decision-record",
      message: "The decision record must not open connections, read credentials, migrate schema, or write upstream state.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false while creating the decision record.",
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

function collectWarnings(): DecisionRecordMessage[] {
  return [
    {
      code: "DECISION_RECORD_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-decision-record",
      message: "v251 records the human decision envelope only; it does not approve or execute a real connection.",
    },
    {
      code: "CREDENTIAL_HANDLE_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-decision-record",
      message: "Credential evidence remains handle/review-status only; the credential value must stay outside Node.",
    },
  ];
}

function collectRecommendations(): DecisionRecordMessage[] {
  return [
    {
      code: "NEXT_VERSION_SHOULD_BE_GUARDED_ADAPTER_CLIENT_PRECHECK",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-decision-record",
      message: "If this decision record remains ready, the next Node version may design a disabled adapter client precheck without real credentials.",
    },
    {
      code: "KEEP_NO_GO_CONDITIONS_VISIBLE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-decision-record",
      message: "Keep the no-go conditions visible in any future operator UI before enabling connection code.",
    },
  ];
}

function hasDecisionField(
  decisionRecord: ManagedAuditManualSandboxConnectionDecisionRecordProfile["decisionRecord"],
  id: string,
): boolean {
  return decisionRecord.requiredDecisionFields.some((field) => field.id === id && field.required);
}

function formatDecisionField(field: DecisionRecordField): string {
  return `${field.id}: ${field.label}; source=${field.expectedSource}; required=${field.required}; nodeMayReadValue=${field.nodeMayReadValue}; evidence=${field.acceptedEvidence}`;
}

function formatNoGoCondition(condition: DecisionNoGoCondition): string {
  return `${condition.code}: ${condition.condition}; action=${condition.action}`;
}
