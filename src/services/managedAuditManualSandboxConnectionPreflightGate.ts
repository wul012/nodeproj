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
  loadManagedAuditManualSandboxConnectionPacketVerification,
  type ManagedAuditManualSandboxConnectionPacketVerificationProfile,
} from "./managedAuditManualSandboxConnectionPacketVerification.js";
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";

export interface ManagedAuditManualSandboxConnectionPreflightGateProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-preflight-gate.v1";
  gateState: "manual-sandbox-connection-preflight-gate-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionPreflightGate: boolean;
  readOnlyGate: true;
  sourceNodeV229: {
    sourceVersion: "Node v229";
    profileVersion: ManagedAuditManualSandboxConnectionPacketVerificationProfile["profileVersion"];
    verificationState: ManagedAuditManualSandboxConnectionPacketVerificationProfile["verificationState"];
    verificationDigest: string;
    sourcePacketDigest: string;
    readyForPacketVerification: boolean;
    readyForConnectionFromSource: false;
    javaMarkerAccepted: boolean;
    miniKvMarkerAccepted: boolean;
    operatorFieldsEchoed: boolean;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
  };
  preflightGate: ManualSandboxConnectionPreflightGate;
  preflightFields: ManualSandboxConnectionPreflightField[];
  checks: ManualSandboxConnectionPreflightGateChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    preflightFieldCount: number;
    requiredPreflightFieldCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxConnectionPreflightGateMessage[];
  warnings: ManualSandboxConnectionPreflightGateMessage[];
  recommendations: ManualSandboxConnectionPreflightGateMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionPreflightGateJson: string;
    manualSandboxConnectionPreflightGateMarkdown: string;
    sourceNodeV229Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface ManualSandboxConnectionPreflightGate {
  gateDigest: string;
  sourceVerificationDigest: string;
  sourcePacketDigest: string;
  gateMode: "manual-sandbox-connection-preflight-gate-only";
  ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID";
  credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
  schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID";
  rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID";
  timeoutBudgetMs: 15000;
  manualAbortMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT";
  manualWindowFlagName: "ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED";
  manualWindowFlagRequired: true;
  manualWindowOpenByDefault: false;
  manualReviewRequired: true;
  connectionExecutionAllowed: false;
  credentialValueRequired: false;
  schemaMigrationExecutionAllowed: false;
  managedAuditWriteAllowed: false;
  nodeAutoStartAllowed: false;
}

interface ManualSandboxConnectionPreflightField {
  id:
    | "ownerApprovalArtifactId"
    | "credentialHandleName"
    | "schemaRehearsalId"
    | "rollbackPathId"
    | "timeoutBudgetMs"
    | "manualAbortMarker"
    | "manualWindowFlag";
  label: string;
  required: true;
  valuePolicy:
    | "identifier-only"
    | "handle-name-only"
    | "document-reference"
    | "numeric-budget"
    | "explicit-marker"
    | "boolean-flag-name-only";
  gateValue: string | number | boolean;
  mustNotContain: string[];
  evidenceTarget: string;
}

type ManualSandboxConnectionPreflightGateChecks = {
  sourceNodeV229VerificationReady: boolean;
  sourceNodeV229StillConnectionBlocked: boolean;
  sourceNodeV229DigestPresent: boolean;
  upstreamMarkersAccepted: boolean;
  operatorFieldsEchoedBeforeGate: boolean;
  preflightFieldsListed: boolean;
  ownerArtifactFieldPresent: boolean;
  credentialHandleNameFieldPresent: boolean;
  schemaRehearsalFieldPresent: boolean;
  rollbackPathFieldPresent: boolean;
  timeoutBudgetFieldPresent: boolean;
  manualAbortMarkerPresent: boolean;
  manualWindowFlagPresent: boolean;
  manualWindowClosedByDefault: boolean;
  gateDigestPresent: boolean;
  credentialValueStillForbidden: boolean;
  schemaMigrationStillBlocked: boolean;
  externalConnectionStillBlocked: boolean;
  managedAuditWritesStillBlocked: boolean;
  automaticServiceStartStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionPreflightGate: boolean;
};

interface ManualSandboxConnectionPreflightGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-preflight-gate"
    | "node-v229-packet-verification"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionPreflightGateJson: "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate",
  manualSandboxConnectionPreflightGateMarkdown: "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate?format=markdown",
  sourceNodeV229Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-packet-verification",
  activePlan: "docs/plans/v229-post-packet-verification-roadmap.md",
});

const SHA256_HEX = /^[a-f0-9]{64}$/;

export function loadManagedAuditManualSandboxConnectionPreflightGate(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionPreflightGateProfile {
  const sourceVerification = loadManagedAuditManualSandboxConnectionPacketVerification({ config: input.config });
  const preflightFields = createPreflightFields();
  const preflightGate = createPreflightGate(sourceVerification, preflightFields);
  const checks = createChecks(input.config, sourceVerification, preflightGate, preflightFields);
  checks.readyForManagedAuditManualSandboxConnectionPreflightGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionPreflightGate")
    .every(([, value]) => value);
  const gateState = checks.readyForManagedAuditManualSandboxConnectionPreflightGate
    ? "manual-sandbox-connection-preflight-gate-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection preflight gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-preflight-gate.v1",
    gateState,
    readyForManagedAuditManualSandboxConnectionPreflightGate: checks.readyForManagedAuditManualSandboxConnectionPreflightGate,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyGate: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV229: {
      sourceVersion: "Node v229",
      profileVersion: sourceVerification.profileVersion,
      verificationState: sourceVerification.verificationState,
      verificationDigest: sourceVerification.packetVerification.verificationDigest,
      sourcePacketDigest: sourceVerification.packetVerification.sourcePacketDigest,
      readyForPacketVerification: sourceVerification.readyForManagedAuditManualSandboxConnectionPacketVerification,
      readyForConnectionFromSource: sourceVerification.readyForManagedAuditSandboxAdapterConnection,
      javaMarkerAccepted: sourceVerification.packetVerification.javaMarkerAccepted,
      miniKvMarkerAccepted: sourceVerification.packetVerification.miniKvMarkerAccepted,
      operatorFieldsEchoed: sourceVerification.packetVerification.operatorFieldsEchoed,
      connectsManagedAudit: sourceVerification.connectsManagedAudit,
      readsManagedAuditCredential: sourceVerification.readsManagedAuditCredential,
      schemaMigrationExecuted: sourceVerification.schemaMigrationExecuted,
    },
    preflightGate,
    preflightFields,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      preflightFieldCount: preflightFields.length,
      requiredPreflightFieldCount: preflightFields.filter((fieldEntry) => fieldEntry.required).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v230 as a preflight gate only; do not open a sandbox managed audit connection from this profile.",
      "Recommend parallel Java v88 and mini-kv v97 read-only echo/guard markers before Node v231 verification.",
      "Keep the manual window flag as a field name and closed default; never archive a credential value.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionPreflightGateMarkdown(
  profile: ManagedAuditManualSandboxConnectionPreflightGateProfile,
): string {
  return [
    "# Managed audit manual sandbox connection preflight gate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Gate state: ${profile.gateState}`,
    `- Ready for preflight gate: ${profile.readyForManagedAuditManualSandboxConnectionPreflightGate}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v229",
    "",
    ...renderEntries(profile.sourceNodeV229),
    "",
    "## Preflight Gate",
    "",
    ...renderEntries(profile.preflightGate),
    "",
    "## Preflight Fields",
    "",
    ...profile.preflightFields.flatMap(renderPreflightField),
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
    ...renderMessages(profile.productionBlockers, "No manual sandbox preflight gate blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No manual sandbox preflight gate warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No manual sandbox preflight gate recommendations."),
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

function createPreflightFields(): ManualSandboxConnectionPreflightField[] {
  return [
    field("ownerApprovalArtifactId", "Owner approval artifact id", "identifier-only", "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID", "Owner approval artifact identifier only; no approval body or secret material."),
    field("credentialHandleName", "Sandbox credential handle name", "handle-name-only", "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE", "Credential handle name only; the resolved credential value must stay outside Node archives."),
    field("schemaRehearsalId", "Schema rehearsal id", "document-reference", "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID", "Schema rehearsal evidence id only; v230 must not execute schema SQL."),
    field("rollbackPathId", "Rollback path id", "document-reference", "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID", "Rollback path document id only; v230 must not execute rollback or restore."),
    field("timeoutBudgetMs", "Timeout budget in milliseconds", "numeric-budget", 15000, "Manual sandbox connection timeout budget for a later window; v230 does not spend it."),
    field("manualAbortMarker", "Manual abort marker", "explicit-marker", "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT", "Operator-visible abort marker that must remain available before any later manual attempt."),
    field("manualWindowFlag", "Manual sandbox window flag name", "boolean-flag-name-only", "ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED", "Flag name only; v230 keeps the window closed by default and does not auto-start services."),
  ];
}

function createPreflightGate(
  sourceVerification: ManagedAuditManualSandboxConnectionPacketVerificationProfile,
  preflightFields: ManualSandboxConnectionPreflightField[],
): ManualSandboxConnectionPreflightGate {
  const gateWithoutDigest = {
    sourceVerificationDigest: sourceVerification.packetVerification.verificationDigest,
    sourcePacketDigest: sourceVerification.packetVerification.sourcePacketDigest,
    gateMode: "manual-sandbox-connection-preflight-gate-only" as const,
    ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID" as const,
    credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE" as const,
    schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID" as const,
    rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID" as const,
    timeoutBudgetMs: 15000 as const,
    manualAbortMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT" as const,
    manualWindowFlagName: "ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED" as const,
    manualWindowFlagRequired: true as const,
    manualWindowOpenByDefault: false as const,
    manualReviewRequired: true as const,
    connectionExecutionAllowed: false as const,
    credentialValueRequired: false as const,
    schemaMigrationExecutionAllowed: false as const,
    managedAuditWriteAllowed: false as const,
    nodeAutoStartAllowed: false as const,
  };
  return {
    gateDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-preflight-gate.v1",
      sourceVerificationDigest: sourceVerification.packetVerification.verificationDigest,
      preflightFields,
      gateWithoutDigest,
    }),
    ...gateWithoutDigest,
  };
}

function createChecks(
  config: AppConfig,
  sourceVerification: ManagedAuditManualSandboxConnectionPacketVerificationProfile,
  preflightGate: ManualSandboxConnectionPreflightGate,
  preflightFields: ManualSandboxConnectionPreflightField[],
): ManualSandboxConnectionPreflightGateChecks {
  return {
    sourceNodeV229VerificationReady: sourceVerification.readyForManagedAuditManualSandboxConnectionPacketVerification
      && sourceVerification.verificationState === "manual-sandbox-connection-packet-verification-ready",
    sourceNodeV229StillConnectionBlocked: !sourceVerification.readyForManagedAuditSandboxAdapterConnection
      && !sourceVerification.connectsManagedAudit
      && !sourceVerification.readsManagedAuditCredential
      && !sourceVerification.schemaMigrationExecuted,
    sourceNodeV229DigestPresent: SHA256_HEX.test(sourceVerification.packetVerification.verificationDigest)
      && SHA256_HEX.test(sourceVerification.packetVerification.sourcePacketDigest),
    upstreamMarkersAccepted: sourceVerification.packetVerification.javaMarkerAccepted
      && sourceVerification.packetVerification.miniKvMarkerAccepted,
    operatorFieldsEchoedBeforeGate: sourceVerification.packetVerification.operatorFieldsEchoed,
    preflightFieldsListed: preflightFields.length === 7
      && preflightFields.every((fieldEntry) => fieldEntry.required),
    ownerArtifactFieldPresent: hasField(preflightFields, "ownerApprovalArtifactId", "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID"),
    credentialHandleNameFieldPresent: hasField(preflightFields, "credentialHandleName", "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE")
      && !String(fieldValue(preflightFields, "credentialHandleName")).toLowerCase().includes("value"),
    schemaRehearsalFieldPresent: hasField(preflightFields, "schemaRehearsalId", "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID"),
    rollbackPathFieldPresent: hasField(preflightFields, "rollbackPathId", "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID"),
    timeoutBudgetFieldPresent: fieldValue(preflightFields, "timeoutBudgetMs") === 15000
      && preflightGate.timeoutBudgetMs === 15000,
    manualAbortMarkerPresent: hasField(preflightFields, "manualAbortMarker", "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT"),
    manualWindowFlagPresent: hasField(preflightFields, "manualWindowFlag", "ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED")
      && preflightGate.manualWindowFlagRequired,
    manualWindowClosedByDefault: !preflightGate.manualWindowOpenByDefault,
    gateDigestPresent: SHA256_HEX.test(preflightGate.gateDigest),
    credentialValueStillForbidden: !preflightGate.credentialValueRequired,
    schemaMigrationStillBlocked: !preflightGate.schemaMigrationExecutionAllowed,
    externalConnectionStillBlocked: !preflightGate.connectionExecutionAllowed,
    managedAuditWritesStillBlocked: !preflightGate.managedAuditWriteAllowed,
    automaticServiceStartStillBlocked: !preflightGate.nodeAutoStartAllowed,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionPreflightGate: false,
  };
}

function collectProductionBlockers(
  checks: ManualSandboxConnectionPreflightGateChecks,
): ManualSandboxConnectionPreflightGateMessage[] {
  const blockers: ManualSandboxConnectionPreflightGateMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV229VerificationReady, "NODE_V229_VERIFICATION_NOT_READY", "node-v229-packet-verification", "Node v229 packet verification must be ready before v230 preflight gate.");
  addBlocker(blockers, checks.sourceNodeV229StillConnectionBlocked, "SOURCE_VERIFICATION_UNLOCKED_CONNECTION", "node-v229-packet-verification", "Node v229 source verification must still block connection, credential reads, and schema migration.");
  addBlocker(blockers, checks.upstreamMarkersAccepted, "UPSTREAM_MARKERS_NOT_ACCEPTED", "node-v229-packet-verification", "Java v87 and mini-kv v96 markers must be accepted before v230.");
  addBlocker(blockers, checks.preflightFieldsListed, "PREFLIGHT_FIELDS_INCOMPLETE", "managed-audit-manual-sandbox-connection-preflight-gate", "v230 must list the seven required preflight fields.");
  addBlocker(blockers, checks.manualWindowFlagPresent, "MANUAL_WINDOW_FLAG_MISSING", "managed-audit-manual-sandbox-connection-preflight-gate", "v230 must add a manual sandbox window flag name.");
  addBlocker(blockers, checks.manualWindowClosedByDefault, "MANUAL_WINDOW_OPEN_BY_DEFAULT", "managed-audit-manual-sandbox-connection-preflight-gate", "v230 must keep the manual window closed by default.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addBlocker(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-manual-sandbox-connection-preflight-gate", "v230 must not unlock production audit.");
  return blockers;
}

function collectWarnings(): ManualSandboxConnectionPreflightGateMessage[] {
  return [
    {
      code: "PREFLIGHT_GATE_ONLY_NO_CONNECTION",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-preflight-gate",
      message: "This profile creates a preflight gate only; it does not connect to managed audit.",
    },
    {
      code: "MANUAL_WINDOW_FLAG_NAME_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-preflight-gate",
      message: "The manual window flag is recorded as a field name and remains closed by default.",
    },
  ];
}

function collectRecommendations(): ManualSandboxConnectionPreflightGateMessage[] {
  return [
    {
      code: "RECOMMEND_PARALLEL_JAVA_V88_MINIKV_V97",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-preflight-gate",
      message: "After v230, recommend parallel Java v88 and mini-kv v97 read-only echo/guard markers before Node v231 verification.",
    },
    {
      code: "KEEP_PREFLIGHT_AND_CONNECTION_SEPARATE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-preflight-gate",
      message: "Keep the preflight gate separate from any later manual sandbox connection rehearsal.",
    },
  ];
}

function field(
  id: ManualSandboxConnectionPreflightField["id"],
  label: string,
  valuePolicy: ManualSandboxConnectionPreflightField["valuePolicy"],
  gateValue: string | number | boolean,
  evidenceTarget: string,
): ManualSandboxConnectionPreflightField {
  return {
    id,
    label,
    required: true,
    valuePolicy,
    gateValue,
    mustNotContain: ["credential value", "secret value", "connection string", "private key"],
    evidenceTarget,
  };
}

function hasField(
  fields: ManualSandboxConnectionPreflightField[],
  id: ManualSandboxConnectionPreflightField["id"],
  value: string | number | boolean,
): boolean {
  return fieldValue(fields, id) === value;
}

function fieldValue(
  fields: ManualSandboxConnectionPreflightField[],
  id: ManualSandboxConnectionPreflightField["id"],
): string | number | boolean | undefined {
  return fields.find((fieldEntry) => fieldEntry.id === id)?.gateValue;
}

function addBlocker(
  messages: ManualSandboxConnectionPreflightGateMessage[],
  condition: boolean,
  code: string,
  source: ManualSandboxConnectionPreflightGateMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderPreflightField(fieldEntry: ManualSandboxConnectionPreflightField): string[] {
  return [
    `### ${fieldEntry.id}`,
    "",
    ...renderEntries(fieldEntry),
    "",
  ];
}
