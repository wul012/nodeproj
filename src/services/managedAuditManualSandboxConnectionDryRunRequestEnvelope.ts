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
  loadManagedAuditManualSandboxConnectionPreconditionIntake,
  type ManagedAuditManualSandboxConnectionPreconditionIntakeProfile,
} from "./managedAuditManualSandboxConnectionPreconditionIntake.js";
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";

export interface ManagedAuditManualSandboxConnectionDryRunRequestEnvelopeProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-dry-run-request-envelope.v1";
  envelopeState: "manual-sandbox-connection-dry-run-request-envelope-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope: boolean;
  readOnlyReview: true;
  sourceNodeV235: {
    sourceVersion: "Node v235";
    profileVersion: ManagedAuditManualSandboxConnectionPreconditionIntakeProfile["profileVersion"];
    intakeState: ManagedAuditManualSandboxConnectionPreconditionIntakeProfile["intakeState"];
    intakeDigest: string;
    readyForPreconditionIntake: boolean;
    readyForDryRunRequestEnvelope: boolean;
    requiredPreconditionCount: number;
    documentedPreconditionCount: number;
    handlesOnly: true;
    readyForSandboxAdapterConnectionFromSource: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
    managedAuditStateWritten: false;
  };
  dryRunRequestEnvelope: ManualSandboxConnectionDryRunRequestEnvelope;
  operatorReviewFields: ManualSandboxConnectionOperatorReviewField[];
  checks: ManualSandboxConnectionDryRunEnvelopeChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    operatorReviewFieldCount: number;
    requiredPreconditionCount: number;
    documentedPreconditionCount: number;
    secretValueFieldCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxConnectionDryRunEnvelopeMessage[];
  warnings: ManualSandboxConnectionDryRunEnvelopeMessage[];
  recommendations: ManualSandboxConnectionDryRunEnvelopeMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionDryRunRequestEnvelopeJson: string;
    manualSandboxConnectionDryRunRequestEnvelopeMarkdown: string;
    sourceNodeV235Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface ManualSandboxConnectionDryRunRequestEnvelope {
  envelopeDigest: string;
  envelopeId: string;
  sourceIntakeDigest: string;
  markerSpan: "Node v235 precondition intake";
  requestMode: "manual-sandbox-connection-dry-run-request-envelope-only";
  requiredPreconditionCount: number;
  documentedPreconditionCount: number;
  operatorReviewFieldCount: number;
  credentialHandleOnly: true;
  credentialValueIncluded: false;
  ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID";
  credentialHandleNameField: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
  schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID";
  rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID";
  timeoutBudgetMs: 15000;
  manualAbortMarkerField: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT";
  actualConnectionAttempted: false;
  schemaMigrationRequested: false;
  managedAuditStateWriteRequested: false;
  upstreamServiceAutoStartRequested: false;
  miniKvPermissionRequested: false;
  readyForOperatorReview: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
}

interface ManualSandboxConnectionOperatorReviewField {
  id:
    | "owner-approval-artifact"
    | "credential-handle-review"
    | "schema-rehearsal-evidence"
    | "rollback-path"
    | "timeout-budget"
    | "manual-abort-marker";
  source: "node-v235-precondition-intake";
  fieldName: string;
  expectedValueKind: "field-name-or-marker-id" | "duration-budget-ms";
  secretValueAllowed: false;
  operatorMustReview: true;
  envelopeCarriesValue: false;
}

type ManualSandboxConnectionDryRunEnvelopeChecks = {
  sourceNodeV235PreconditionIntakeReady: boolean;
  sourceIntakeDigestPresent: boolean;
  sourceReadyForDryRunRequestEnvelope: boolean;
  sourceStillBlocksSandboxAdapterConnection: boolean;
  requiredPreconditionsCarried: boolean;
  envelopeDigestPresent: boolean;
  operatorReviewFieldsComplete: boolean;
  credentialHandleOnly: boolean;
  noCredentialValueIncluded: boolean;
  noConnectionAttempted: boolean;
  noSchemaMigrationRequested: boolean;
  noManagedAuditStateWriteRequested: boolean;
  noUpstreamServiceAutoStartRequested: boolean;
  noMiniKvPermissionRequested: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope: boolean;
};

interface ManualSandboxConnectionDryRunEnvelopeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-dry-run-request-envelope"
    | "node-v235-precondition-intake"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionDryRunRequestEnvelopeJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope",
  manualSandboxConnectionDryRunRequestEnvelopeMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope?format=markdown",
  sourceNodeV235Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake",
  activePlan: "docs/plans/v235-post-precondition-intake-roadmap.md",
});

const SHA256_HEX = /^[a-f0-9]{64}$/;

export function loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionDryRunRequestEnvelopeProfile {
  const sourceNodeV235Profile = loadManagedAuditManualSandboxConnectionPreconditionIntake({
    config: input.config,
  });
  const sourceNodeV235 = createSourceNodeV235(sourceNodeV235Profile);
  const operatorReviewFields = createOperatorReviewFields(sourceNodeV235Profile);
  const dryRunRequestEnvelope = createDryRunRequestEnvelope(sourceNodeV235Profile, operatorReviewFields);
  const checks = createChecks(input.config, sourceNodeV235, dryRunRequestEnvelope, operatorReviewFields);
  checks.readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope")
    .every(([, value]) => value);
  const envelopeState = checks.readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope
    ? "manual-sandbox-connection-dry-run-request-envelope-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection dry-run request envelope",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-dry-run-request-envelope.v1",
    envelopeState,
    readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope:
      checks.readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyReview: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV235,
    dryRunRequestEnvelope,
    operatorReviewFields,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      operatorReviewFieldCount: operatorReviewFields.length,
      requiredPreconditionCount: dryRunRequestEnvelope.requiredPreconditionCount,
      documentedPreconditionCount: dryRunRequestEnvelope.documentedPreconditionCount,
      secretValueFieldCount: operatorReviewFields.filter((field) => field.secretValueAllowed).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v236 as dry-run request envelope only; do not open the managed audit sandbox connection.",
      "Let Java v92 and mini-kv v101 echo the envelope/no-start boundaries in parallel before Node v237 readiness gate.",
      "Keep credential values out of the request envelope; the envelope carries field names and marker ids only.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionDryRunRequestEnvelopeMarkdown(
  profile: ManagedAuditManualSandboxConnectionDryRunRequestEnvelopeProfile,
): string {
  return [
    "# Managed audit manual sandbox connection dry-run request envelope",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Envelope state: ${profile.envelopeState}`,
    `- Ready for dry-run request envelope: ${profile.readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v235",
    "",
    ...renderEntries(profile.sourceNodeV235),
    "",
    "## Dry-run Request Envelope",
    "",
    ...renderEntries(profile.dryRunRequestEnvelope),
    "",
    "## Operator Review Fields",
    "",
    ...profile.operatorReviewFields.flatMap(renderOperatorReviewField),
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
    ...renderMessages(profile.productionBlockers, "No dry-run request envelope blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No dry-run request envelope warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No dry-run request envelope recommendations."),
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

function createSourceNodeV235(
  source: ManagedAuditManualSandboxConnectionPreconditionIntakeProfile,
): ManagedAuditManualSandboxConnectionDryRunRequestEnvelopeProfile["sourceNodeV235"] {
  return {
    sourceVersion: "Node v235",
    profileVersion: source.profileVersion,
    intakeState: source.intakeState,
    intakeDigest: source.preconditionIntake.intakeDigest,
    readyForPreconditionIntake: source.readyForManagedAuditManualSandboxConnectionPreconditionIntake,
    readyForDryRunRequestEnvelope: source.preconditionIntake.readyForDryRunRequestEnvelope,
    requiredPreconditionCount: source.preconditionIntake.requiredPreconditionCount,
    documentedPreconditionCount: source.preconditionIntake.documentedPreconditionCount,
    handlesOnly: source.preconditionIntake.handlesOnly,
    readyForSandboxAdapterConnectionFromSource: source.readyForManagedAuditSandboxAdapterConnection,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    managedAuditStateWritten: source.preconditionIntake.managedAuditStateWritten,
  };
}

function createOperatorReviewFields(
  source: ManagedAuditManualSandboxConnectionPreconditionIntakeProfile,
): ManualSandboxConnectionOperatorReviewField[] {
  const intake = source.preconditionIntake;
  return [
    operatorReviewField("owner-approval-artifact", intake.ownerApprovalArtifactIdField, "field-name-or-marker-id"),
    operatorReviewField("credential-handle-review", intake.credentialHandleNameField, "field-name-or-marker-id"),
    operatorReviewField("schema-rehearsal-evidence", intake.schemaRehearsalIdField, "field-name-or-marker-id"),
    operatorReviewField("rollback-path", intake.rollbackPathIdField, "field-name-or-marker-id"),
    operatorReviewField("timeout-budget", "timeoutBudgetMs", "duration-budget-ms"),
    operatorReviewField("manual-abort-marker", intake.manualAbortMarkerField, "field-name-or-marker-id"),
  ];
}

function createDryRunRequestEnvelope(
  source: ManagedAuditManualSandboxConnectionPreconditionIntakeProfile,
  operatorReviewFields: ManualSandboxConnectionOperatorReviewField[],
): ManualSandboxConnectionDryRunRequestEnvelope {
  const intake = source.preconditionIntake;
  const digestInput = {
    profileVersion: "managed-audit-manual-sandbox-connection-dry-run-request-envelope.v1",
    sourceIntakeDigest: intake.intakeDigest,
    requestMode: "manual-sandbox-connection-dry-run-request-envelope-only",
    operatorReviewFields: operatorReviewFields.map((field) => ({
      id: field.id,
      fieldName: field.fieldName,
      expectedValueKind: field.expectedValueKind,
      secretValueAllowed: field.secretValueAllowed,
      envelopeCarriesValue: field.envelopeCarriesValue,
    })),
    boundary: {
      actualConnectionAttempted: false,
      credentialValueIncluded: false,
      schemaMigrationRequested: false,
      managedAuditStateWriteRequested: false,
      upstreamServiceAutoStartRequested: false,
      miniKvPermissionRequested: false,
    },
  };
  const envelopeDigest = sha256StableJson(digestInput);

  return {
    envelopeDigest,
    envelopeId: `manual-sandbox-dry-run-${envelopeDigest.slice(0, 16)}`,
    sourceIntakeDigest: intake.intakeDigest,
    markerSpan: "Node v235 precondition intake",
    requestMode: "manual-sandbox-connection-dry-run-request-envelope-only",
    requiredPreconditionCount: intake.requiredPreconditionCount,
    documentedPreconditionCount: intake.documentedPreconditionCount,
    operatorReviewFieldCount: operatorReviewFields.length,
    credentialHandleOnly: true,
    credentialValueIncluded: false,
    ownerApprovalArtifactIdField: intake.ownerApprovalArtifactIdField,
    credentialHandleNameField: intake.credentialHandleNameField,
    schemaRehearsalIdField: intake.schemaRehearsalIdField,
    rollbackPathIdField: intake.rollbackPathIdField,
    timeoutBudgetMs: intake.timeoutBudgetMs,
    manualAbortMarkerField: intake.manualAbortMarkerField,
    actualConnectionAttempted: false,
    schemaMigrationRequested: false,
    managedAuditStateWriteRequested: false,
    upstreamServiceAutoStartRequested: false,
    miniKvPermissionRequested: false,
    readyForOperatorReview: source.readyForManagedAuditManualSandboxConnectionPreconditionIntake
      && intake.readyForDryRunRequestEnvelope
      && intake.handlesOnly
      && operatorReviewFields.length === intake.requiredPreconditionCount
      && operatorReviewFields.every((field) => !field.secretValueAllowed && !field.envelopeCarriesValue),
    readyForManagedAuditSandboxAdapterConnection: false,
  };
}

function createChecks(
  config: AppConfig,
  source: ManagedAuditManualSandboxConnectionDryRunRequestEnvelopeProfile["sourceNodeV235"],
  envelope: ManualSandboxConnectionDryRunRequestEnvelope,
  operatorReviewFields: ManualSandboxConnectionOperatorReviewField[],
): ManualSandboxConnectionDryRunEnvelopeChecks {
  return {
    sourceNodeV235PreconditionIntakeReady:
      source.readyForPreconditionIntake
      && source.intakeState === "manual-sandbox-connection-precondition-intake-ready",
    sourceIntakeDigestPresent: SHA256_HEX.test(source.intakeDigest),
    sourceReadyForDryRunRequestEnvelope: source.readyForDryRunRequestEnvelope,
    sourceStillBlocksSandboxAdapterConnection:
      !source.readyForSandboxAdapterConnectionFromSource
      && !source.connectsManagedAudit
      && !source.readsManagedAuditCredential
      && !source.schemaMigrationExecuted
      && !source.managedAuditStateWritten,
    requiredPreconditionsCarried:
      envelope.requiredPreconditionCount === 6
      && envelope.documentedPreconditionCount === 6
      && envelope.operatorReviewFieldCount === 6,
    envelopeDigestPresent: SHA256_HEX.test(envelope.envelopeDigest)
      && envelope.envelopeId === `manual-sandbox-dry-run-${envelope.envelopeDigest.slice(0, 16)}`,
    operatorReviewFieldsComplete: operatorReviewFields.length === 6
      && operatorReviewFields.every((field) => field.operatorMustReview && !field.secretValueAllowed),
    credentialHandleOnly: envelope.credentialHandleOnly,
    noCredentialValueIncluded: !envelope.credentialValueIncluded
      && operatorReviewFields.every((field) => !field.envelopeCarriesValue),
    noConnectionAttempted: !envelope.actualConnectionAttempted,
    noSchemaMigrationRequested: !envelope.schemaMigrationRequested,
    noManagedAuditStateWriteRequested: !envelope.managedAuditStateWriteRequested,
    noUpstreamServiceAutoStartRequested: !envelope.upstreamServiceAutoStartRequested,
    noMiniKvPermissionRequested: !envelope.miniKvPermissionRequested,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope: false,
  };
}

function operatorReviewField(
  id: ManualSandboxConnectionOperatorReviewField["id"],
  fieldName: string,
  expectedValueKind: ManualSandboxConnectionOperatorReviewField["expectedValueKind"],
): ManualSandboxConnectionOperatorReviewField {
  return {
    id,
    source: "node-v235-precondition-intake",
    fieldName,
    expectedValueKind,
    secretValueAllowed: false,
    operatorMustReview: true,
    envelopeCarriesValue: false,
  };
}

function collectProductionBlockers(
  checks: ManualSandboxConnectionDryRunEnvelopeChecks,
): ManualSandboxConnectionDryRunEnvelopeMessage[] {
  const blockers: ManualSandboxConnectionDryRunEnvelopeMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV235PreconditionIntakeReady, "NODE_V235_PRECONDITION_INTAKE_NOT_READY", "node-v235-precondition-intake", "Node v235 precondition intake must be ready before v236 dry-run envelope.");
  addBlocker(blockers, checks.sourceReadyForDryRunRequestEnvelope, "SOURCE_NOT_READY_FOR_DRY_RUN_ENVELOPE", "node-v235-precondition-intake", "Node v235 must explicitly allow a dry-run request envelope.");
  addBlocker(blockers, checks.sourceStillBlocksSandboxAdapterConnection, "SOURCE_CONNECTION_BOUNDARY_DRIFTED", "node-v235-precondition-intake", "Node v235 must still keep sandbox adapter connection, credential read, schema migration, and managed audit write blocked.");
  addBlocker(blockers, checks.requiredPreconditionsCarried, "DRY_RUN_ENVELOPE_PRECONDITIONS_INCOMPLETE", "managed-audit-manual-sandbox-connection-dry-run-request-envelope", "The dry-run envelope must carry six operator-reviewed field names or marker ids.");
  addBlocker(blockers, checks.operatorReviewFieldsComplete, "OPERATOR_REVIEW_FIELDS_INCOMPLETE", "managed-audit-manual-sandbox-connection-dry-run-request-envelope", "All six operator review fields must be present and marked as review-required.");
  addBlocker(blockers, checks.noCredentialValueIncluded, "CREDENTIAL_VALUE_INCLUDED", "managed-audit-manual-sandbox-connection-dry-run-request-envelope", "The dry-run envelope must never include credential values.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  return blockers;
}

function collectWarnings(): ManualSandboxConnectionDryRunEnvelopeMessage[] {
  return [
    {
      code: "DRY_RUN_ENVELOPE_IS_NOT_CONNECTION_APPROVAL",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-dry-run-request-envelope",
      message: "The envelope is ready for operator review only; it is not approval to open a managed audit sandbox connection.",
    },
    {
      code: "ENVELOPE_CARRIES_FIELD_NAMES_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-dry-run-request-envelope",
      message: "The envelope carries field names and marker ids, not secret values, schema SQL, or executable connection instructions.",
    },
  ];
}

function collectRecommendations(): ManualSandboxConnectionDryRunEnvelopeMessage[] {
  return [
    {
      code: "NEXT_PARALLEL_JAVA_V92_MINIKV_V101",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-dry-run-request-envelope",
      message: "Let Java v92 and mini-kv v101 echo the dry-run envelope/no-start boundaries before Node v237 readiness gate.",
    },
    {
      code: "KEEP_REAL_CONNECTION_PAUSED_UNTIL_READINESS_GATE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-dry-run-request-envelope",
      message: "Do not open a real sandbox connection until Node v237 has consumed the upstream echo evidence and produced a readiness gate.",
    },
  ];
}

function addBlocker(
  messages: ManualSandboxConnectionDryRunEnvelopeMessage[],
  condition: boolean,
  code: string,
  source: ManualSandboxConnectionDryRunEnvelopeMessage["source"],
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

function renderOperatorReviewField(field: ManualSandboxConnectionOperatorReviewField): string[] {
  return [
    `- ${field.id}`,
    `  - source: ${field.source}`,
    `  - fieldName: ${field.fieldName}`,
    `  - expectedValueKind: ${field.expectedValueKind}`,
    `  - secretValueAllowed: ${field.secretValueAllowed}`,
    `  - operatorMustReview: ${field.operatorMustReview}`,
    `  - envelopeCarriesValue: ${field.envelopeCarriesValue}`,
  ];
}
