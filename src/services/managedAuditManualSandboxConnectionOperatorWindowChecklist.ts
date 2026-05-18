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
  loadManagedAuditManualSandboxConnectionReadinessGate,
  type ManagedAuditManualSandboxConnectionReadinessGateProfile,
} from "./managedAuditManualSandboxConnectionReadinessGate.js";
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";

export interface ManagedAuditManualSandboxConnectionOperatorWindowChecklistProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-operator-window-checklist.v1";
  checklistState: "manual-sandbox-connection-operator-window-checklist-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist: boolean;
  readOnlyChecklist: true;
  sourceNodeV237: {
    sourceVersion: "Node v237";
    profileVersion: ManagedAuditManualSandboxConnectionReadinessGateProfile["profileVersion"];
    gateState: ManagedAuditManualSandboxConnectionReadinessGateProfile["gateState"];
    gateDigest: string;
    readyForReadinessGate: boolean;
    readyForOperatorWindowChecklist: boolean;
    readyForSandboxAdapterConnectionFromSource: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
    productionBlockerCount: number;
    warningCount: number;
  };
  operatorWindowChecklist: ManualSandboxOperatorWindowChecklist;
  approvalItems: ManualSandboxOperatorWindowApprovalItem[];
  checklistSteps: ManualSandboxOperatorWindowChecklistStep[];
  pauseConditions: ManualSandboxOperatorWindowPauseCondition[];
  forbiddenOperations: ManualSandboxOperatorWindowForbiddenOperation[];
  checks: ManualSandboxOperatorWindowChecklistChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    approvalItemCount: number;
    checklistStepCount: number;
    pauseConditionCount: number;
    forbiddenOperationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxOperatorWindowChecklistMessage[];
  warnings: ManualSandboxOperatorWindowChecklistMessage[];
  recommendations: ManualSandboxOperatorWindowChecklistMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionOperatorWindowChecklistJson: string;
    manualSandboxConnectionOperatorWindowChecklistMarkdown: string;
    sourceNodeV237Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface ManualSandboxOperatorWindowChecklist {
  checklistDigest: string;
  sourceReadinessGateDigest: string;
  markerSpan: "Node v237 readiness gate -> Node v238 operator window checklist";
  checklistMode: "manual-sandbox-connection-operator-window-checklist-only";
  checklistMaterialReady: boolean;
  requiredApprovalCount: 3;
  checklistStepCount: number;
  pauseConditionCount: number;
  forbiddenOperationCount: number;
  ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID";
  credentialHandleNameField: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
  schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID";
  rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID";
  timeoutBudgetMs: 15000;
  manualAbortMarkerField: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT";
  windowDurationMinutes: 30;
  windowOpenByDefault: false;
  manualReviewRequired: true;
  readyForJavaV93EchoReceipt: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  actualConnectionAttempted: false;
  credentialValueRead: false;
  schemaMigrationRequested: false;
  managedAuditStateWriteRequested: false;
  upstreamServiceAutoStartRequested: false;
  miniKvExecutionPermissionInferred: false;
  productionWindowOpened: false;
}

interface ManualSandboxOperatorWindowApprovalItem {
  id: "release-owner" | "security-reviewer" | "operations-owner";
  label: string;
  required: true;
  evidenceField: string;
  valuePolicy: "artifact-id-only" | "attestation-only" | "window-record-only";
  mustNotContain: string[];
  blocksConnectionIfMissing: true;
}

interface ManualSandboxOperatorWindowChecklistStep {
  step: number;
  phase:
    | "source-readiness-gate"
    | "owner-approval"
    | "credential-handle"
    | "schema-rehearsal"
    | "rollback-path"
    | "timeout-budget"
    | "manual-abort"
    | "final-stop-gate";
  owner: "node-operator" | "release-owner" | "security-reviewer" | "java-owner" | "operations-owner";
  action: string;
  evidenceRequired: string;
  required: true;
  executionBoundary: "record-only" | "review-only";
}

interface ManualSandboxOperatorWindowPauseCondition {
  code:
    | "SOURCE_GATE_NOT_READY"
    | "OWNER_APPROVAL_MISSING"
    | "CREDENTIAL_VALUE_REQUESTED"
    | "SCHEMA_SQL_REQUESTED"
    | "ROLLBACK_PATH_MISSING"
    | "TIMEOUT_BUDGET_CHANGED"
    | "UPSTREAM_ACTIONS_ENABLED"
    | "MANUAL_ABORT_MARKED";
  severity: "pause";
  source:
    | "source-readiness-gate"
    | "owner-approval"
    | "credential-boundary"
    | "schema-rehearsal"
    | "rollback-path"
    | "timeout-budget"
    | "runtime-config"
    | "manual-abort";
  condition: string;
  operatorResponse: string;
}

interface ManualSandboxOperatorWindowForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v238 operator window checklist"
    | "credential boundary"
    | "schema rehearsal boundary"
    | "upstream auto-start boundary"
    | "mini-kv runtime boundary";
}

type ManualSandboxOperatorWindowChecklistChecks = {
  sourceNodeV237ReadinessGateReady: boolean;
  sourceNodeV237AllowsOperatorChecklist: boolean;
  sourceNodeV237StillBlocksConnection: boolean;
  sourceNodeV237DigestPresent: boolean;
  approvalItemsComplete: boolean;
  checklistStepsComplete: boolean;
  pauseConditionsComplete: boolean;
  forbiddenOperationsComplete: boolean;
  checklistDigestPresent: boolean;
  checklistMaterialReady: boolean;
  readyForJavaV93EchoReceipt: boolean;
  credentialValueStillForbidden: boolean;
  schemaMigrationStillBlocked: boolean;
  externalConnectionStillBlocked: boolean;
  managedAuditWritesStillBlocked: boolean;
  automaticServiceStartStillBlocked: boolean;
  miniKvExecutionStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist: boolean;
};

interface ManualSandboxOperatorWindowChecklistMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-operator-window-checklist"
    | "node-v237-readiness-gate"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionOperatorWindowChecklistJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist",
  manualSandboxConnectionOperatorWindowChecklistMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist?format=markdown",
  sourceNodeV237Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate",
  activePlan: "docs/plans/v237-post-readiness-gate-roadmap.md",
});

const SHA256_HEX = /^[a-f0-9]{64}$/;

export function loadManagedAuditManualSandboxConnectionOperatorWindowChecklist(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionOperatorWindowChecklistProfile {
  const sourceGateConfig: AppConfig = {
    ...input.config,
    upstreamActionsEnabled: false,
  };
  const sourceGate = loadManagedAuditManualSandboxConnectionReadinessGate({ config: sourceGateConfig });
  const sourceNodeV237 = createSourceNodeV237(sourceGate);
  const approvalItems = createApprovalItems();
  const checklistSteps = createChecklistSteps();
  const pauseConditions = createPauseConditions();
  const forbiddenOperations = createForbiddenOperations();
  const operatorWindowChecklist = createOperatorWindowChecklist(
    sourceNodeV237,
    approvalItems,
    checklistSteps,
    pauseConditions,
    forbiddenOperations,
  );
  const checks = createChecks(
    input.config,
    sourceNodeV237,
    operatorWindowChecklist,
    approvalItems,
    checklistSteps,
    pauseConditions,
    forbiddenOperations,
  );
  checks.readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist")
    .every(([, value]) => value);
  const checklistState = checks.readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist
    ? "manual-sandbox-connection-operator-window-checklist-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection operator window checklist",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-operator-window-checklist.v1",
    checklistState,
    readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist:
      checks.readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyChecklist: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV237,
    operatorWindowChecklist,
    approvalItems,
    checklistSteps,
    pauseConditions,
    forbiddenOperations,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      approvalItemCount: approvalItems.length,
      checklistStepCount: checklistSteps.length,
      pauseConditionCount: pauseConditions.length,
      forbiddenOperationCount: forbiddenOperations.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v238 as an operator checklist only; do not open a managed audit sandbox connection.",
      "Recommend parallel Java v93 and mini-kv v102 to echo the checklist fields and no-start/no-write boundaries.",
      "Keep credential values outside Node archives; v238 records the credential handle field only.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionOperatorWindowChecklistMarkdown(
  profile: ManagedAuditManualSandboxConnectionOperatorWindowChecklistProfile,
): string {
  return [
    "# Managed audit manual sandbox connection operator window checklist",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Checklist state: ${profile.checklistState}`,
    `- Ready for operator window checklist: ${profile.readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v237",
    "",
    ...renderEntries(profile.sourceNodeV237),
    "",
    "## Operator Window Checklist",
    "",
    ...renderEntries(profile.operatorWindowChecklist),
    "",
    "## Approval Items",
    "",
    ...profile.approvalItems.flatMap(renderApprovalItem),
    "## Checklist Steps",
    "",
    ...profile.checklistSteps.flatMap(renderChecklistStep),
    "## Pause Conditions",
    "",
    ...profile.pauseConditions.flatMap(renderPauseCondition),
    "## Forbidden Operations",
    "",
    ...profile.forbiddenOperations.flatMap(renderForbiddenOperation),
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
    ...renderMessages(profile.productionBlockers, "No operator window checklist blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No operator window checklist warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No operator window checklist recommendations."),
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

function createSourceNodeV237(
  source: ManagedAuditManualSandboxConnectionReadinessGateProfile,
): ManagedAuditManualSandboxConnectionOperatorWindowChecklistProfile["sourceNodeV237"] {
  return {
    sourceVersion: "Node v237",
    profileVersion: source.profileVersion,
    gateState: source.gateState,
    gateDigest: source.readinessGate.gateDigest,
    readyForReadinessGate: source.readyForManagedAuditManualSandboxConnectionReadinessGate,
    readyForOperatorWindowChecklist: source.readyForOperatorWindowChecklist,
    readyForSandboxAdapterConnectionFromSource: source.readyForManagedAuditSandboxAdapterConnection,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
  };
}

function createApprovalItems(): ManualSandboxOperatorWindowApprovalItem[] {
  return [
    approvalItem(
      "release-owner",
      "Release owner approval artifact",
      "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
      "artifact-id-only",
      ["password", "secret", "credential value", "SQL body"],
    ),
    approvalItem(
      "security-reviewer",
      "Credential handle and secret boundary attestation",
      "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
      "attestation-only",
      ["credential value", "token value", "private key", "password"],
    ),
    approvalItem(
      "operations-owner",
      "Manual window timing and rollback acknowledgement",
      "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
      "window-record-only",
      ["production password", "database URL", "write command"],
    ),
  ];
}

function approvalItem(
  id: ManualSandboxOperatorWindowApprovalItem["id"],
  label: string,
  evidenceField: string,
  valuePolicy: ManualSandboxOperatorWindowApprovalItem["valuePolicy"],
  mustNotContain: string[],
): ManualSandboxOperatorWindowApprovalItem {
  return {
    id,
    label,
    required: true,
    evidenceField,
    valuePolicy,
    mustNotContain,
    blocksConnectionIfMissing: true,
  };
}

function createChecklistSteps(): ManualSandboxOperatorWindowChecklistStep[] {
  return [
    step(1, "source-readiness-gate", "node-operator", "Attach Node v237 readiness gate digest and confirm it is ready.", "Node v237 gate digest and JSON/Markdown archive.", "record-only"),
    step(2, "owner-approval", "release-owner", "Attach owner approval artifact id before any sandbox window discussion.", "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID.", "review-only"),
    step(3, "credential-handle", "security-reviewer", "Review credential handle name only; do not expose credential value to Node.", "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE handle-name attestation.", "review-only"),
    step(4, "schema-rehearsal", "java-owner", "Attach schema rehearsal id proving SQL is reviewed but not executed by Node.", "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID.", "review-only"),
    step(5, "rollback-path", "operations-owner", "Attach rollback path id and confirm manual abort ownership.", "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID.", "review-only"),
    step(6, "timeout-budget", "node-operator", "Confirm timeoutBudgetMs remains 15000 unless a later version explicitly changes it.", "timeoutBudgetMs=15000.", "record-only"),
    step(7, "manual-abort", "operations-owner", "Confirm manual abort marker is available before any future dry-run command package.", "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT.", "review-only"),
    step(8, "final-stop-gate", "node-operator", "Stop if any checklist field contains a secret, SQL body, connection string, or production write request.", "Final stop gate confirmation.", "record-only"),
  ];
}

function step(
  stepNumber: number,
  phase: ManualSandboxOperatorWindowChecklistStep["phase"],
  owner: ManualSandboxOperatorWindowChecklistStep["owner"],
  action: string,
  evidenceRequired: string,
  executionBoundary: ManualSandboxOperatorWindowChecklistStep["executionBoundary"],
): ManualSandboxOperatorWindowChecklistStep {
  return {
    step: stepNumber,
    phase,
    owner,
    action,
    evidenceRequired,
    required: true,
    executionBoundary,
  };
}

function createPauseConditions(): ManualSandboxOperatorWindowPauseCondition[] {
  return [
    pause("SOURCE_GATE_NOT_READY", "source-readiness-gate", "Node v237 readiness gate is missing, blocked, or has digest drift.", "Pause and regenerate/readiness-review Node v237 evidence."),
    pause("OWNER_APPROVAL_MISSING", "owner-approval", "Owner approval artifact id is missing.", "Pause until the release owner supplies an artifact id, not a verbal approval."),
    pause("CREDENTIAL_VALUE_REQUESTED", "credential-boundary", "Any checklist field asks Node to store or display a credential value.", "Stop the window and replace the value with a credential handle reference only."),
    pause("SCHEMA_SQL_REQUESTED", "schema-rehearsal", "Any step asks Node to execute SQL or carry SQL body text.", "Pause and move SQL review back to Java/schema owner evidence."),
    pause("ROLLBACK_PATH_MISSING", "rollback-path", "Rollback path id is absent or points to an unreviewed artifact.", "Pause until operations owner provides a reviewed rollback artifact id."),
    pause("TIMEOUT_BUDGET_CHANGED", "timeout-budget", "Timeout budget differs from 15000 ms without a later approved version.", "Pause and require a new versioned checklist."),
    pause("UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED is true during checklist generation.", "Stop; v238 is not allowed to execute upstream actions."),
    pause("MANUAL_ABORT_MARKED", "manual-abort", "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT is marked before or during review.", "Stop the window and archive the abort marker."),
  ];
}

function pause(
  code: ManualSandboxOperatorWindowPauseCondition["code"],
  source: ManualSandboxOperatorWindowPauseCondition["source"],
  condition: string,
  operatorResponse: string,
): ManualSandboxOperatorWindowPauseCondition {
  return {
    code,
    severity: "pause",
    source,
    condition,
    operatorResponse,
  };
}

function createForbiddenOperations(): ManualSandboxOperatorWindowForbiddenOperation[] {
  return [
    forbidden("Open managed audit sandbox connection", "v238 only prepares an operator checklist.", "Node v238 operator window checklist"),
    forbidden("Read or archive managed audit credential value", "Only the credential handle field is allowed.", "credential boundary"),
    forbidden("Execute schema rehearsal SQL", "SQL review remains Java/schema owner evidence.", "schema rehearsal boundary"),
    forbidden("Write managed audit state", "Checklist output is evidence only and has no adapter write path.", "Node v238 operator window checklist"),
    forbidden("Auto-start Java, mini-kv, or external audit service", "Manual window work must not start upstream services.", "upstream auto-start boundary"),
    forbidden("Grant mini-kv execution or restore permission", "mini-kv remains runtime evidence provider only.", "mini-kv runtime boundary"),
  ];
}

function forbidden(
  operation: string,
  reason: string,
  blockedBy: ManualSandboxOperatorWindowForbiddenOperation["blockedBy"],
): ManualSandboxOperatorWindowForbiddenOperation {
  return { operation, reason, blockedBy };
}

function createOperatorWindowChecklist(
  sourceNodeV237: ManagedAuditManualSandboxConnectionOperatorWindowChecklistProfile["sourceNodeV237"],
  approvalItems: ManualSandboxOperatorWindowApprovalItem[],
  checklistSteps: ManualSandboxOperatorWindowChecklistStep[],
  pauseConditions: ManualSandboxOperatorWindowPauseCondition[],
  forbiddenOperations: ManualSandboxOperatorWindowForbiddenOperation[],
): ManualSandboxOperatorWindowChecklist {
  const base = {
    sourceReadinessGateDigest: sourceNodeV237.gateDigest,
    markerSpan: "Node v237 readiness gate -> Node v238 operator window checklist" as const,
    checklistMode: "manual-sandbox-connection-operator-window-checklist-only" as const,
    checklistMaterialReady: sourceNodeV237.readyForReadinessGate && sourceNodeV237.readyForOperatorWindowChecklist,
    requiredApprovalCount: 3 as const,
    checklistStepCount: checklistSteps.length,
    pauseConditionCount: pauseConditions.length,
    forbiddenOperationCount: forbiddenOperations.length,
    ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID" as const,
    credentialHandleNameField: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE" as const,
    schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID" as const,
    rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID" as const,
    timeoutBudgetMs: 15000 as const,
    manualAbortMarkerField: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT" as const,
    windowDurationMinutes: 30 as const,
    windowOpenByDefault: false as const,
    manualReviewRequired: true as const,
    readyForJavaV93EchoReceipt: sourceNodeV237.readyForReadinessGate
      && sourceNodeV237.readyForOperatorWindowChecklist
      && approvalItems.length === 3
      && checklistSteps.length === 8
      && pauseConditions.length === 8,
    readyForManagedAuditSandboxAdapterConnection: false as const,
    actualConnectionAttempted: false as const,
    credentialValueRead: false as const,
    schemaMigrationRequested: false as const,
    managedAuditStateWriteRequested: false as const,
    upstreamServiceAutoStartRequested: false as const,
    miniKvExecutionPermissionInferred: false as const,
    productionWindowOpened: false as const,
  };

  return {
    ...base,
    checklistDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-operator-window-checklist.v1",
      sourceReadinessGateDigest: sourceNodeV237.gateDigest,
      approvalItems,
      checklistSteps,
      pauseConditions,
      forbiddenOperations,
      boundary: {
        readyForManagedAuditSandboxAdapterConnection: base.readyForManagedAuditSandboxAdapterConnection,
        actualConnectionAttempted: base.actualConnectionAttempted,
        credentialValueRead: base.credentialValueRead,
        schemaMigrationRequested: base.schemaMigrationRequested,
        managedAuditStateWriteRequested: base.managedAuditStateWriteRequested,
        upstreamServiceAutoStartRequested: base.upstreamServiceAutoStartRequested,
        miniKvExecutionPermissionInferred: base.miniKvExecutionPermissionInferred,
        productionWindowOpened: base.productionWindowOpened,
      },
    }),
  };
}

function createChecks(
  config: AppConfig,
  source: ManagedAuditManualSandboxConnectionOperatorWindowChecklistProfile["sourceNodeV237"],
  checklist: ManualSandboxOperatorWindowChecklist,
  approvalItems: ManualSandboxOperatorWindowApprovalItem[],
  checklistSteps: ManualSandboxOperatorWindowChecklistStep[],
  pauseConditions: ManualSandboxOperatorWindowPauseCondition[],
  forbiddenOperations: ManualSandboxOperatorWindowForbiddenOperation[],
): ManualSandboxOperatorWindowChecklistChecks {
  return {
    sourceNodeV237ReadinessGateReady:
      source.readyForReadinessGate
      && source.gateState === "manual-sandbox-connection-readiness-gate-ready",
    sourceNodeV237AllowsOperatorChecklist: source.readyForOperatorWindowChecklist,
    sourceNodeV237StillBlocksConnection:
      !source.readyForSandboxAdapterConnectionFromSource
      && !source.connectsManagedAudit
      && !source.readsManagedAuditCredential
      && !source.schemaMigrationExecuted,
    sourceNodeV237DigestPresent: SHA256_HEX.test(source.gateDigest),
    approvalItemsComplete: approvalItems.length === 3
      && approvalItems.every((item) => item.required && item.blocksConnectionIfMissing),
    checklistStepsComplete: checklistSteps.length === 8
      && checklistSteps.every((item, index) => item.step === index + 1 && item.required),
    pauseConditionsComplete: pauseConditions.length === 8
      && pauseConditions.every((item) => item.severity === "pause"),
    forbiddenOperationsComplete: forbiddenOperations.length >= 6,
    checklistDigestPresent: SHA256_HEX.test(checklist.checklistDigest),
    checklistMaterialReady: checklist.checklistMaterialReady,
    readyForJavaV93EchoReceipt: checklist.readyForJavaV93EchoReceipt,
    credentialValueStillForbidden: !checklist.credentialValueRead
      && checklist.credentialHandleNameField === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    schemaMigrationStillBlocked: !checklist.schemaMigrationRequested,
    externalConnectionStillBlocked: !checklist.actualConnectionAttempted
      && !checklist.readyForManagedAuditSandboxAdapterConnection,
    managedAuditWritesStillBlocked: !checklist.managedAuditStateWriteRequested,
    automaticServiceStartStillBlocked: !checklist.upstreamServiceAutoStartRequested,
    miniKvExecutionStillBlocked: !checklist.miniKvExecutionPermissionInferred,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist: false,
  };
}

function collectProductionBlockers(
  checks: ManualSandboxOperatorWindowChecklistChecks,
): ManualSandboxOperatorWindowChecklistMessage[] {
  const blockers: ManualSandboxOperatorWindowChecklistMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV237ReadinessGateReady, "NODE_V237_READINESS_GATE_NOT_READY", "node-v237-readiness-gate", "Node v237 readiness gate must be ready before v238 operator window checklist.");
  addBlocker(blockers, checks.sourceNodeV237StillBlocksConnection, "SOURCE_READINESS_GATE_UNLOCKED_CONNECTION", "node-v237-readiness-gate", "Node v237 source gate must still block connection, credential reads, and schema migration.");
  addBlocker(blockers, checks.approvalItemsComplete, "APPROVAL_ITEMS_INCOMPLETE", "managed-audit-manual-sandbox-connection-operator-window-checklist", "v238 approval items must include release owner, security reviewer, and operations owner.");
  addBlocker(blockers, checks.checklistStepsComplete, "CHECKLIST_STEPS_INCOMPLETE", "managed-audit-manual-sandbox-connection-operator-window-checklist", "v238 operator window checklist steps must be complete and ordered.");
  addBlocker(blockers, checks.pauseConditionsComplete, "PAUSE_CONDITIONS_INCOMPLETE", "managed-audit-manual-sandbox-connection-operator-window-checklist", "v238 pause conditions must be explicit before a later dry-run package.");
  addBlocker(blockers, checks.forbiddenOperationsComplete, "FORBIDDEN_OPERATIONS_INCOMPLETE", "managed-audit-manual-sandbox-connection-operator-window-checklist", "v238 forbidden operations must cover connection, credential, SQL, write, auto-start, and mini-kv execution boundaries.");
  addBlocker(blockers, checks.readyForJavaV93EchoReceipt, "JAVA_V93_ECHO_NOT_READY", "managed-audit-manual-sandbox-connection-operator-window-checklist", "v238 must be ready for Java v93 checklist echo receipt before moving on.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  return blockers;
}

function collectWarnings(): ManualSandboxOperatorWindowChecklistMessage[] {
  return [
    {
      code: "OPERATOR_WINDOW_CHECKLIST_IS_NOT_CONNECTION_APPROVAL",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-operator-window-checklist",
      message: "This checklist prepares a manual operator window only; it is not approval to open a managed audit sandbox connection.",
    },
    {
      code: "CREDENTIAL_HANDLE_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-operator-window-checklist",
      message: "The checklist records the credential handle field only; credential values must stay outside Node archives.",
    },
  ];
}

function collectRecommendations(): ManualSandboxOperatorWindowChecklistMessage[] {
  return [
    {
      code: "NEXT_PARALLEL_JAVA_V93_MINIKV_V102",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-operator-window-checklist",
      message: "After v238, recommend parallel Java v93 and mini-kv v102 to echo checklist fields and no-start/no-write boundaries.",
    },
    {
      code: "KEEP_WINDOW_CLOSED_BY_DEFAULT",
      severity: "recommendation",
      source: "runtime-config",
      message: "Keep the manual sandbox connection window closed by default until a later verification consumes Java v93 and mini-kv v102.",
    },
  ];
}

function addBlocker(
  messages: ManualSandboxOperatorWindowChecklistMessage[],
  condition: boolean,
  code: string,
  source: ManualSandboxOperatorWindowChecklistMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({
      code,
      severity: "blocker",
      source,
      message,
    });
  }
}

function renderApprovalItem(item: ManualSandboxOperatorWindowApprovalItem): string[] {
  return [
    `### ${item.id}`,
    "",
    ...renderEntries(item),
    "",
  ];
}

function renderChecklistStep(item: ManualSandboxOperatorWindowChecklistStep): string[] {
  return [
    `### Step ${item.step}: ${item.phase}`,
    "",
    ...renderEntries(item),
    "",
  ];
}

function renderPauseCondition(item: ManualSandboxOperatorWindowPauseCondition): string[] {
  return [
    `### ${item.code}`,
    "",
    ...renderEntries(item),
    "",
  ];
}

function renderForbiddenOperation(item: ManualSandboxOperatorWindowForbiddenOperation): string[] {
  return [
    `### ${item.operation}`,
    "",
    ...renderEntries(item),
    "",
  ];
}
