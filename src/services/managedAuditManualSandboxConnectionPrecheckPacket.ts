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
  loadManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification,
  type ManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification.js";
import {
  loadManagedAuditRouteRegistrationTableQualityPass,
  type ManagedAuditRouteRegistrationTableQualityPassProfile,
} from "./managedAuditRouteRegistrationTableQualityPass.js";

export interface ManagedAuditManualSandboxConnectionPrecheckPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-precheck-packet.v1";
  precheckState: "manual-sandbox-connection-precheck-packet-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionPrecheckPacket: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyPrecheckPacket: true;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV244: {
    sourceVersion: "Node v244";
    profileVersion: ManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerificationProfile["profileVersion"];
    verificationState: ManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerificationProfile["verificationState"];
    verificationDigest: string;
    readyForUpstreamEchoVerification: boolean;
    commandCountAligned: boolean;
    credentialBoundaryAligned: boolean;
    connectionBoundaryAligned: boolean;
    writeBoundaryAligned: boolean;
    autoStartBoundaryAligned: boolean;
  };
  precheckPacket: SandboxConnectionPrecheckPacket;
  checks: PrecheckPacketChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    precheckItemCount: number;
    requiredOperatorFieldCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: PrecheckPacketMessage[];
  warnings: PrecheckPacketMessage[];
  recommendations: PrecheckPacketMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionPrecheckPacketJson: string;
    manualSandboxConnectionPrecheckPacketMarkdown: string;
    sourceNodeV244Json: string;
    activePlan: string;
    nextPlan: string;
  };
  nextActions: string[];
}

interface SandboxConnectionPrecheckPacket {
  precheckDigest: string;
  packetMode: "manual-sandbox-connection-precheck-packet-only";
  sourceSpan: "Node v244 upstream echo verification";
  ownerApprovalArtifact: {
    required: true;
    fieldName: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID";
    valueIncluded: false;
    approvedByNode: false;
  };
  credentialHandleReview: {
    required: true;
    fieldName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
    credentialHandleOnly: true;
    credentialValueIncluded: false;
    credentialValueRead: false;
  };
  schemaMigrationRehearsal: {
    required: true;
    fieldName: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID";
    rehearsalIdOnly: true;
    migrationSqlIncluded: false;
    migrationExecuted: false;
  };
  operatorWindow: {
    required: true;
    mode: "manual-window-required";
    opensByDefault: false;
    operatorVerifiedRequired: true;
  };
  rollbackPath: {
    required: true;
    fieldName: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID";
    rollbackPathOnly: true;
    rollbackExecuted: false;
  };
  abortMarker: {
    required: true;
    fieldName: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT";
    manualAbortSupported: true;
    automaticAbortExecution: false;
  };
  timeoutPolicy: {
    required: true;
    fieldName: "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS";
    timeoutBudgetMs: 15000;
    timeoutExecutesRollback: false;
  };
  boundary: {
    dryRunOnly: true;
    actualConnectionAttempted: false;
    managedAuditStateWriteRequested: false;
    schemaMigrationRequested: false;
    approvalLedgerWriteRequested: false;
    javaSqlExecutionRequested: false;
    miniKvWritePermissionRequested: false;
    upstreamServiceAutoStartRequested: false;
  };
}

interface PrecheckPacketMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-precheck-packet"
    | "node-v244-upstream-echo-verification"
    | "runtime-config";
  message: string;
}

type PrecheckPacketChecks = {
  sourceNodeV244Ready: boolean;
  sourceNodeV244BoundariesAligned: boolean;
  ownerApprovalArtifactRequired: boolean;
  credentialHandleReviewHandleOnly: boolean;
  schemaMigrationRehearsalOnly: boolean;
  operatorWindowManualOnly: boolean;
  rollbackPathRequired: boolean;
  abortMarkerRequired: boolean;
  timeoutPolicyAccepted: boolean;
  noCredentialValueRead: boolean;
  noConnectionAttempted: boolean;
  noSchemaMigrationExecuted: boolean;
  noStateMutationRequested: boolean;
  noUpstreamAutoStart: boolean;
  routeRegistrationAccepted: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionPrecheckPacket: boolean;
};

const PRECHECK_ITEMS = Object.freeze([
  "owner approval artifact",
  "credential handle review",
  "schema migration rehearsal id",
  "operator window",
  "rollback path",
  "manual abort marker",
  "timeout policy",
]);

const OPERATOR_FIELDS = Object.freeze([
  "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
  "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
  "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS",
  "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
]);

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionPrecheckPacketJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet",
  manualSandboxConnectionPrecheckPacketMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet?format=markdown",
  sourceNodeV244Json:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
  activePlan: "docs/plans/v242-post-historical-evidence-fallback-roadmap.md",
  nextPlan: "docs/plans/v245-post-sandbox-precheck-roadmap.md",
});

export function loadManagedAuditManualSandboxConnectionPrecheckPacket(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionPrecheckPacketProfile {
  const sourceV244 = loadManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification({
    config: input.config,
  });
  const routeQuality = loadManagedAuditRouteRegistrationTableQualityPass({ config: input.config });
  const sourceNodeV244 = createSourceNodeV244(sourceV244);
  const precheckPacket = createPrecheckPacket(sourceNodeV244);
  const checks = createChecks(input.config, sourceNodeV244, precheckPacket, routeQuality);
  checks.readyForManagedAuditManualSandboxConnectionPrecheckPacket = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionPrecheckPacket")
    .every(([, value]) => value);
  const precheckState = checks.readyForManagedAuditManualSandboxConnectionPrecheckPacket
    ? "manual-sandbox-connection-precheck-packet-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection precheck packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-precheck-packet.v1",
    precheckState,
    readyForManagedAuditManualSandboxConnectionPrecheckPacket:
      checks.readyForManagedAuditManualSandboxConnectionPrecheckPacket,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyPrecheckPacket: true,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV244,
    precheckPacket,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      precheckItemCount: PRECHECK_ITEMS.length,
      requiredOperatorFieldCount: OPERATOR_FIELDS.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Start the post-v245 plan before adding more connection work.",
      "Let Java and mini-kv produce precheck receipt echoes before any Node connection rehearsal.",
      "Keep the next Node step as a verification or rehearsal packet unless a real credential and manual window are explicitly approved.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionPrecheckPacketMarkdown(
  profile: ManagedAuditManualSandboxConnectionPrecheckPacketProfile,
): string {
  return [
    "# Managed audit manual sandbox connection precheck packet",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Precheck state: ${profile.precheckState}`,
    `- Ready for precheck packet: ${profile.readyForManagedAuditManualSandboxConnectionPrecheckPacket}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    "",
    "## Source Node v244",
    "",
    ...renderEntries(profile.sourceNodeV244),
    "",
    "## Precheck Packet",
    "",
    ...renderEntries(profile.precheckPacket),
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
    ...renderMessages(profile.productionBlockers, "No precheck packet blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No precheck packet warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No precheck packet recommendations."),
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

function createSourceNodeV244(
  source: ManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerificationProfile,
): ManagedAuditManualSandboxConnectionPrecheckPacketProfile["sourceNodeV244"] {
  return {
    sourceVersion: "Node v244",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    verificationDigest: source.echoVerification.verificationDigest,
    readyForUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification,
    commandCountAligned: source.echoVerification.commandCountAligned,
    credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
    connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
    writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
    autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
  };
}

function createPrecheckPacket(
  sourceNodeV244: ManagedAuditManualSandboxConnectionPrecheckPacketProfile["sourceNodeV244"],
): SandboxConnectionPrecheckPacket {
  const packetWithoutDigest = {
    packetMode: "manual-sandbox-connection-precheck-packet-only" as const,
    sourceSpan: "Node v244 upstream echo verification" as const,
    ownerApprovalArtifact: {
      required: true as const,
      fieldName: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID" as const,
      valueIncluded: false as const,
      approvedByNode: false as const,
    },
    credentialHandleReview: {
      required: true as const,
      fieldName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE" as const,
      credentialHandleOnly: true as const,
      credentialValueIncluded: false as const,
      credentialValueRead: false as const,
    },
    schemaMigrationRehearsal: {
      required: true as const,
      fieldName: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID" as const,
      rehearsalIdOnly: true as const,
      migrationSqlIncluded: false as const,
      migrationExecuted: false as const,
    },
    operatorWindow: {
      required: true as const,
      mode: "manual-window-required" as const,
      opensByDefault: false as const,
      operatorVerifiedRequired: true as const,
    },
    rollbackPath: {
      required: true as const,
      fieldName: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID" as const,
      rollbackPathOnly: true as const,
      rollbackExecuted: false as const,
    },
    abortMarker: {
      required: true as const,
      fieldName: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT" as const,
      manualAbortSupported: true as const,
      automaticAbortExecution: false as const,
    },
    timeoutPolicy: {
      required: true as const,
      fieldName: "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS" as const,
      timeoutBudgetMs: 15000 as const,
      timeoutExecutesRollback: false as const,
    },
    boundary: {
      dryRunOnly: true as const,
      actualConnectionAttempted: false as const,
      managedAuditStateWriteRequested: false as const,
      schemaMigrationRequested: false as const,
      approvalLedgerWriteRequested: false as const,
      javaSqlExecutionRequested: false as const,
      miniKvWritePermissionRequested: false as const,
      upstreamServiceAutoStartRequested: false as const,
    },
  };
  return {
    precheckDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-precheck-packet.v1",
      sourceDigest: sourceNodeV244.verificationDigest,
      ...packetWithoutDigest,
    }),
    ...packetWithoutDigest,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV244: ManagedAuditManualSandboxConnectionPrecheckPacketProfile["sourceNodeV244"],
  packet: SandboxConnectionPrecheckPacket,
  routeQuality: ManagedAuditRouteRegistrationTableQualityPassProfile,
): PrecheckPacketChecks {
  return {
    sourceNodeV244Ready: sourceNodeV244.readyForUpstreamEchoVerification,
    sourceNodeV244BoundariesAligned:
      sourceNodeV244.commandCountAligned
      && sourceNodeV244.credentialBoundaryAligned
      && sourceNodeV244.connectionBoundaryAligned
      && sourceNodeV244.writeBoundaryAligned
      && sourceNodeV244.autoStartBoundaryAligned,
    ownerApprovalArtifactRequired:
      packet.ownerApprovalArtifact.required
      && packet.ownerApprovalArtifact.fieldName === "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID"
      && !packet.ownerApprovalArtifact.valueIncluded
      && !packet.ownerApprovalArtifact.approvedByNode,
    credentialHandleReviewHandleOnly:
      packet.credentialHandleReview.required
      && packet.credentialHandleReview.credentialHandleOnly
      && !packet.credentialHandleReview.credentialValueIncluded
      && !packet.credentialHandleReview.credentialValueRead,
    schemaMigrationRehearsalOnly:
      packet.schemaMigrationRehearsal.required
      && packet.schemaMigrationRehearsal.rehearsalIdOnly
      && !packet.schemaMigrationRehearsal.migrationSqlIncluded
      && !packet.schemaMigrationRehearsal.migrationExecuted,
    operatorWindowManualOnly:
      packet.operatorWindow.required
      && packet.operatorWindow.mode === "manual-window-required"
      && !packet.operatorWindow.opensByDefault
      && packet.operatorWindow.operatorVerifiedRequired,
    rollbackPathRequired:
      packet.rollbackPath.required
      && packet.rollbackPath.rollbackPathOnly
      && !packet.rollbackPath.rollbackExecuted,
    abortMarkerRequired:
      packet.abortMarker.required
      && packet.abortMarker.manualAbortSupported
      && !packet.abortMarker.automaticAbortExecution,
    timeoutPolicyAccepted:
      packet.timeoutPolicy.required
      && packet.timeoutPolicy.timeoutBudgetMs === 15000
      && !packet.timeoutPolicy.timeoutExecutesRollback,
    noCredentialValueRead:
      !packet.credentialHandleReview.credentialValueIncluded
      && !packet.credentialHandleReview.credentialValueRead,
    noConnectionAttempted: !packet.boundary.actualConnectionAttempted,
    noSchemaMigrationExecuted:
      !packet.schemaMigrationRehearsal.migrationSqlIncluded
      && !packet.schemaMigrationRehearsal.migrationExecuted
      && !packet.boundary.schemaMigrationRequested,
    noStateMutationRequested:
      !packet.boundary.managedAuditStateWriteRequested
      && !packet.boundary.approvalLedgerWriteRequested
      && !packet.boundary.javaSqlExecutionRequested
      && !packet.boundary.miniKvWritePermissionRequested,
    noUpstreamAutoStart: !packet.boundary.upstreamServiceAutoStartRequested,
    routeRegistrationAccepted: routeQuality.readyForManagedAuditRouteRegistrationTableQualityPass,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionPrecheckPacket: false,
  };
}

function collectProductionBlockers(checks: PrecheckPacketChecks): PrecheckPacketMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: PrecheckPacketMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV244Ready,
      code: "NODE_V244_UPSTREAM_ECHO_NOT_READY",
      source: "node-v244-upstream-echo-verification",
      message: "Node v244 upstream echo verification must be ready before creating the precheck packet.",
    },
    {
      condition: checks.sourceNodeV244BoundariesAligned,
      code: "NODE_V244_BOUNDARIES_NOT_ALIGNED",
      source: "node-v244-upstream-echo-verification",
      message: "Node v244 must prove command, credential, connection, write, and auto-start boundaries are aligned.",
    },
    {
      condition: checks.ownerApprovalArtifactRequired
        && checks.credentialHandleReviewHandleOnly
        && checks.schemaMigrationRehearsalOnly
        && checks.operatorWindowManualOnly
        && checks.rollbackPathRequired
        && checks.abortMarkerRequired
        && checks.timeoutPolicyAccepted,
      code: "PRECHECK_ITEMS_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-precheck-packet",
      message: "The precheck packet must include all required operator-review materials without values or execution.",
    },
    {
      condition: checks.noCredentialValueRead
        && checks.noConnectionAttempted
        && checks.noSchemaMigrationExecuted
        && checks.noStateMutationRequested
        && checks.noUpstreamAutoStart,
      code: "PRECHECK_BOUNDARY_BROKEN",
      source: "managed-audit-manual-sandbox-connection-precheck-packet",
      message: "The precheck packet must remain credential-free, connection-free, mutation-free, and no-auto-start.",
    },
    {
      condition: checks.routeRegistrationAccepted,
      code: "ROUTE_REGISTRATION_QUALITY_PASS_NOT_READY",
      source: "managed-audit-manual-sandbox-connection-precheck-packet",
      message: "The audit route registration table quality pass must remain ready after adding the v245 route.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during precheck packet generation.",
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

function collectWarnings(): PrecheckPacketMessage[] {
  return [
    {
      code: "PRECHECK_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-precheck-packet",
      message: "This version creates a precheck packet only; it does not authorize or open a real sandbox connection.",
    },
  ];
}

function collectRecommendations(): PrecheckPacketMessage[] {
  return [
    {
      code: "REQUEST_UPSTREAM_PRECHECK_RECEIPTS",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-precheck-packet",
      message: "Let Java and mini-kv echo the precheck packet before any connection rehearsal.",
    },
    {
      code: "OPEN_POST_V245_PLAN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-precheck-packet",
      message: "Use a new post-v245 plan for the next stage instead of appending duplicate versions to the v242 plan.",
    },
  ];
}
