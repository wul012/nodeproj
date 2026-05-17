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
  loadManagedAuditManualSandboxConnectionEvidenceChecklist,
  type ManagedAuditManualSandboxConnectionEvidenceChecklistProfile,
} from "./managedAuditManualSandboxConnectionEvidenceChecklist.js";

export interface ManagedAuditManualSandboxConnectionOperatorPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-operator-packet.v1";
  packetState: "manual-sandbox-connection-operator-packet-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionOperatorPacket: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyPacket: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV227: {
    sourceVersion: "Node v227";
    profileVersion: ManagedAuditManualSandboxConnectionEvidenceChecklistProfile["profileVersion"];
    checklistState: ManagedAuditManualSandboxConnectionEvidenceChecklistProfile["checklistState"];
    checklistDigest: string;
    readyForChecklist: boolean;
    readyForConnectionFromSource: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
    checklistItemCount: number;
    requiredChecklistItemCount: number;
    productionBlockerCount: number;
    warningCount: number;
  };
  operatorPacket: ManualSandboxOperatorPacket;
  operatorFields: ManualSandboxOperatorPacketField[];
  verification: {
    packetDigest: string;
    sourceChecklistDigest: string;
    packetMode: "manual-sandbox-connection-operator-packet-only";
    requiredFieldCount: number;
    credentialValueRequired: false;
    connectionExecutionAllowed: false;
    schemaMigrationExecutionAllowed: false;
    managedAuditWriteAllowed: false;
    automaticServiceStartAllowed: false;
    nodeV228BlocksRealConnection: true;
  };
  checks: ManualSandboxOperatorPacketChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    operatorFieldCount: number;
    requiredOperatorFieldCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxOperatorPacketMessage[];
  warnings: ManualSandboxOperatorPacketMessage[];
  recommendations: ManualSandboxOperatorPacketMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionOperatorPacketJson: string;
    manualSandboxConnectionOperatorPacketMarkdown: string;
    sourceNodeV227Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface ManualSandboxOperatorPacket {
  packetDigest: string;
  sourceChecklistDigest: string;
  ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID";
  credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
  schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID";
  rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID";
  timeoutBudgetMs: 15000;
  manualAbortMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT";
  packetMode: "manual-sandbox-connection-operator-packet-only";
  manualReviewRequired: true;
  connectionExecutionAllowed: false;
  credentialValueRequired: false;
  schemaMigrationExecutionAllowed: false;
  managedAuditWriteAllowed: false;
  nodeAutoStartAllowed: false;
}

interface ManualSandboxOperatorPacketField {
  id:
    | "ownerApprovalArtifactId"
    | "credentialHandleName"
    | "schemaRehearsalId"
    | "rollbackPathId"
    | "timeoutBudgetMs"
    | "manualAbortMarker";
  label: string;
  required: true;
  valuePolicy:
    | "identifier-only"
    | "handle-name-only"
    | "document-reference"
    | "numeric-budget"
    | "explicit-marker";
  packetValue: string | number;
  mustNotContain: string[];
  evidenceTarget: string;
}

type ManualSandboxOperatorPacketChecks = {
  sourceChecklistReady: boolean;
  sourceChecklistStillConnectionBlocked: boolean;
  sourceChecklistDigestPresent: boolean;
  operatorFieldsListed: boolean;
  ownerArtifactFieldPresent: boolean;
  credentialHandleNameFieldPresent: boolean;
  schemaRehearsalFieldPresent: boolean;
  rollbackPathFieldPresent: boolean;
  timeoutBudgetFieldPresent: boolean;
  manualAbortMarkerPresent: boolean;
  packetDigestPresent: boolean;
  credentialValueStillForbidden: boolean;
  schemaMigrationStillBlocked: boolean;
  externalConnectionStillBlocked: boolean;
  managedAuditWritesStillBlocked: boolean;
  automaticServiceStartStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionOperatorPacket: boolean;
};

interface ManualSandboxOperatorPacketMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-operator-packet"
    | "node-v227-evidence-checklist"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionOperatorPacketJson: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet",
  manualSandboxConnectionOperatorPacketMarkdown: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet?format=markdown",
  sourceNodeV227Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist",
  activePlan: "docs/plans/v227-post-evidence-checklist-roadmap.md",
});

const SHA256_HEX = /^[a-f0-9]{64}$/;

export function loadManagedAuditManualSandboxConnectionOperatorPacket(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionOperatorPacketProfile {
  const sourceChecklist = loadManagedAuditManualSandboxConnectionEvidenceChecklist({ config: input.config });
  const operatorFields = createOperatorFields();
  const operatorPacket = createOperatorPacket(sourceChecklist, operatorFields);
  const verification = createVerification(operatorPacket, operatorFields);
  const checks = createChecks(input.config, sourceChecklist, operatorPacket, operatorFields);
  checks.readyForManagedAuditManualSandboxConnectionOperatorPacket = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionOperatorPacket")
    .every(([, value]) => value);
  const packetState = checks.readyForManagedAuditManualSandboxConnectionOperatorPacket
    ? "manual-sandbox-connection-operator-packet-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection operator packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-operator-packet.v1",
    packetState,
    readyForManagedAuditManualSandboxConnectionOperatorPacket: checks.readyForManagedAuditManualSandboxConnectionOperatorPacket,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyPacket: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV227: {
      sourceVersion: "Node v227",
      profileVersion: sourceChecklist.profileVersion,
      checklistState: sourceChecklist.checklistState,
      checklistDigest: sourceChecklist.verification.checklistDigest,
      readyForChecklist: sourceChecklist.readyForManagedAuditManualSandboxConnectionEvidenceChecklist,
      readyForConnectionFromSource: sourceChecklist.readyForManagedAuditSandboxAdapterConnection,
      connectsManagedAudit: sourceChecklist.connectsManagedAudit,
      readsManagedAuditCredential: sourceChecklist.readsManagedAuditCredential,
      schemaMigrationExecuted: sourceChecklist.schemaMigrationExecuted,
      checklistItemCount: sourceChecklist.summary.checklistItemCount,
      requiredChecklistItemCount: sourceChecklist.summary.requiredChecklistItemCount,
      productionBlockerCount: sourceChecklist.summary.productionBlockerCount,
      warningCount: sourceChecklist.summary.warningCount,
    },
    operatorPacket,
    operatorFields,
    verification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      operatorFieldCount: operatorFields.length,
      requiredOperatorFieldCount: operatorFields.filter((field) => field.required).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v228 as an operator packet only; do not open a sandbox managed audit connection from this packet.",
      "Recommend parallel Java v87 and mini-kv v96 handoff markers before Node v229 verification.",
      "Keep credential values outside Node archives; v228 records the credential handle name only.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionOperatorPacketMarkdown(
  profile: ManagedAuditManualSandboxConnectionOperatorPacketProfile,
): string {
  return [
    "# Managed audit manual sandbox connection operator packet",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Packet state: ${profile.packetState}`,
    `- Ready for operator packet: ${profile.readyForManagedAuditManualSandboxConnectionOperatorPacket}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v227",
    "",
    ...renderEntries(profile.sourceNodeV227),
    "",
    "## Operator Packet",
    "",
    ...renderEntries(profile.operatorPacket),
    "",
    "## Operator Fields",
    "",
    ...profile.operatorFields.flatMap(renderOperatorField),
    "## Verification",
    "",
    ...renderEntries(profile.verification),
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
    ...renderMessages(profile.productionBlockers, "No manual sandbox operator packet blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No manual sandbox operator packet warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No manual sandbox operator packet recommendations."),
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

function createOperatorFields(): ManualSandboxOperatorPacketField[] {
  return [
    field(
      "ownerApprovalArtifactId",
      "Owner approval artifact id",
      "identifier-only",
      "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
      "Manual owner approval artifact identifier only; do not embed approval body or secret material.",
    ),
    field(
      "credentialHandleName",
      "Sandbox credential handle name",
      "handle-name-only",
      "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
      "Credential handle name only; the resolved credential value must remain outside Node archives.",
    ),
    field(
      "schemaRehearsalId",
      "Schema rehearsal id",
      "document-reference",
      "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
      "Schema rehearsal evidence id only; v228 must not execute schema SQL.",
    ),
    field(
      "rollbackPathId",
      "Rollback path id",
      "document-reference",
      "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
      "Rollback path document id only; v228 must not execute rollback or restore.",
    ),
    field(
      "timeoutBudgetMs",
      "Timeout budget in milliseconds",
      "numeric-budget",
      15000,
      "Manual sandbox connection timeout budget for a later window; v228 does not spend it.",
    ),
    field(
      "manualAbortMarker",
      "Manual abort marker",
      "explicit-marker",
      "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
      "Operator-visible abort marker that must remain available before any later manual attempt.",
    ),
  ];
}

function createOperatorPacket(
  sourceChecklist: ManagedAuditManualSandboxConnectionEvidenceChecklistProfile,
  operatorFields: ManualSandboxOperatorPacketField[],
): ManualSandboxOperatorPacket {
  const packetWithoutDigest = {
    sourceChecklistDigest: sourceChecklist.verification.checklistDigest,
    ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID" as const,
    credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE" as const,
    schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID" as const,
    rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID" as const,
    timeoutBudgetMs: 15000 as const,
    manualAbortMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT" as const,
    packetMode: "manual-sandbox-connection-operator-packet-only" as const,
    manualReviewRequired: true as const,
    connectionExecutionAllowed: false as const,
    credentialValueRequired: false as const,
    schemaMigrationExecutionAllowed: false as const,
    managedAuditWriteAllowed: false as const,
    nodeAutoStartAllowed: false as const,
  };
  return {
    packetDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-operator-packet.v1",
      sourceChecklistDigest: sourceChecklist.verification.checklistDigest,
      operatorFields,
      packetWithoutDigest,
    }),
    ...packetWithoutDigest,
  };
}

function createVerification(
  operatorPacket: ManualSandboxOperatorPacket,
  operatorFields: ManualSandboxOperatorPacketField[],
): ManagedAuditManualSandboxConnectionOperatorPacketProfile["verification"] {
  return {
    packetDigest: operatorPacket.packetDigest,
    sourceChecklistDigest: operatorPacket.sourceChecklistDigest,
    packetMode: "manual-sandbox-connection-operator-packet-only",
    requiredFieldCount: operatorFields.filter((field) => field.required).length,
    credentialValueRequired: false,
    connectionExecutionAllowed: false,
    schemaMigrationExecutionAllowed: false,
    managedAuditWriteAllowed: false,
    automaticServiceStartAllowed: false,
    nodeV228BlocksRealConnection: true,
  };
}

function createChecks(
  config: AppConfig,
  sourceChecklist: ManagedAuditManualSandboxConnectionEvidenceChecklistProfile,
  operatorPacket: ManualSandboxOperatorPacket,
  operatorFields: ManualSandboxOperatorPacketField[],
): ManualSandboxOperatorPacketChecks {
  return {
    sourceChecklistReady: sourceChecklist.readyForManagedAuditManualSandboxConnectionEvidenceChecklist
      && sourceChecklist.checklistState === "manual-sandbox-connection-evidence-checklist-ready",
    sourceChecklistStillConnectionBlocked: !sourceChecklist.readyForManagedAuditSandboxAdapterConnection
      && !sourceChecklist.connectsManagedAudit
      && !sourceChecklist.readsManagedAuditCredential
      && !sourceChecklist.schemaMigrationExecuted,
    sourceChecklistDigestPresent: SHA256_HEX.test(sourceChecklist.verification.checklistDigest),
    operatorFieldsListed: operatorFields.length === 6
      && operatorFields.every((field) => field.required),
    ownerArtifactFieldPresent: hasField(operatorFields, "ownerApprovalArtifactId", "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID"),
    credentialHandleNameFieldPresent: hasField(operatorFields, "credentialHandleName", "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE")
      && !String(fieldValue(operatorFields, "credentialHandleName")).toLowerCase().includes("value"),
    schemaRehearsalFieldPresent: hasField(operatorFields, "schemaRehearsalId", "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID"),
    rollbackPathFieldPresent: hasField(operatorFields, "rollbackPathId", "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID"),
    timeoutBudgetFieldPresent: fieldValue(operatorFields, "timeoutBudgetMs") === 15000
      && operatorPacket.timeoutBudgetMs === 15000,
    manualAbortMarkerPresent: hasField(operatorFields, "manualAbortMarker", "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT"),
    packetDigestPresent: SHA256_HEX.test(operatorPacket.packetDigest),
    credentialValueStillForbidden: !operatorPacket.credentialValueRequired,
    schemaMigrationStillBlocked: !operatorPacket.schemaMigrationExecutionAllowed,
    externalConnectionStillBlocked: !operatorPacket.connectionExecutionAllowed,
    managedAuditWritesStillBlocked: !operatorPacket.managedAuditWriteAllowed,
    automaticServiceStartStillBlocked: !operatorPacket.nodeAutoStartAllowed,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionOperatorPacket: false,
  };
}

function collectProductionBlockers(
  checks: ManualSandboxOperatorPacketChecks,
): ManualSandboxOperatorPacketMessage[] {
  const blockers: ManualSandboxOperatorPacketMessage[] = [];
  addBlocker(blockers, checks.sourceChecklistReady, "NODE_V227_CHECKLIST_NOT_READY", "node-v227-evidence-checklist", "Node v227 evidence checklist must be ready before v228 operator packet.");
  addBlocker(blockers, checks.sourceChecklistStillConnectionBlocked, "SOURCE_CHECKLIST_UNLOCKED_CONNECTION", "node-v227-evidence-checklist", "Node v227 source checklist must still block connection, credential reads, and schema migration.");
  addBlocker(blockers, checks.operatorFieldsListed, "OPERATOR_FIELDS_INCOMPLETE", "managed-audit-manual-sandbox-connection-operator-packet", "v228 must list exactly the six required operator packet fields.");
  addBlocker(blockers, checks.credentialHandleNameFieldPresent, "CREDENTIAL_HANDLE_NAME_MISSING", "managed-audit-manual-sandbox-connection-operator-packet", "v228 must record the credential handle name only.");
  addBlocker(blockers, checks.packetDigestPresent, "PACKET_DIGEST_MISSING", "managed-audit-manual-sandbox-connection-operator-packet", "v228 operator packet digest must be present.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addBlocker(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-manual-sandbox-connection-operator-packet", "v228 must not unlock production audit.");
  return blockers;
}

function collectWarnings(): ManualSandboxOperatorPacketMessage[] {
  return [
    {
      code: "OPERATOR_PACKET_ONLY_NO_CONNECTION",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-operator-packet",
      message: "This profile creates an operator packet only; it does not connect to managed audit.",
    },
    {
      code: "CREDENTIAL_HANDLE_NAME_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-operator-packet",
      message: "The packet stores the credential handle name, never the resolved credential value.",
    },
  ];
}

function collectRecommendations(): ManualSandboxOperatorPacketMessage[] {
  return [
    {
      code: "RECOMMEND_PARALLEL_JAVA_V87_MINIKV_V96",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-operator-packet",
      message: "After v228, recommend parallel Java v87 and mini-kv v96 handoff markers before Node v229 verification.",
    },
    {
      code: "KEEP_PACKET_REVIEW_MANUAL",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-operator-packet",
      message: "Keep the operator packet manual-review-only until both upstream handoff markers exist.",
    },
  ];
}

function field(
  id: ManualSandboxOperatorPacketField["id"],
  label: string,
  valuePolicy: ManualSandboxOperatorPacketField["valuePolicy"],
  packetValue: string | number,
  evidenceTarget: string,
): ManualSandboxOperatorPacketField {
  return {
    id,
    label,
    required: true,
    valuePolicy,
    packetValue,
    mustNotContain: ["credential value", "secret value", "connection string", "private key"],
    evidenceTarget,
  };
}

function hasField(
  fields: ManualSandboxOperatorPacketField[],
  id: ManualSandboxOperatorPacketField["id"],
  value: string | number,
): boolean {
  return fieldValue(fields, id) === value;
}

function fieldValue(
  fields: ManualSandboxOperatorPacketField[],
  id: ManualSandboxOperatorPacketField["id"],
): string | number | undefined {
  return fields.find((fieldEntry) => fieldEntry.id === id)?.packetValue;
}

function addBlocker(
  messages: ManualSandboxOperatorPacketMessage[],
  condition: boolean,
  code: string,
  source: ManualSandboxOperatorPacketMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderOperatorField(fieldEntry: ManualSandboxOperatorPacketField): string[] {
  return [
    `### ${fieldEntry.id}`,
    "",
    ...renderEntries(fieldEntry),
    "",
  ];
}
