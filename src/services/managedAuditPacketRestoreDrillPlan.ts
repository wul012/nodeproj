import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditIdentityApprovalProvenancePacketVerificationReport,
  type ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile,
} from "./managedAuditIdentityApprovalProvenancePacketVerificationReport.js";

export interface ManagedAuditPacketRestoreDrillPlanProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-packet-restore-drill-plan.v1";
  drillState: "ready-for-manual-dry-run-plan" | "blocked";
  readyForManagedAuditPacketRestoreDrillPlan: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyPlan: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  automaticUpstreamStart: false;
  sourceVerificationReport: {
    profileVersion: ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile["profileVersion"];
    reportState: ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile["reportState"];
    reportDigest: string;
    sourcePacketDigest: string;
    sourcePacketVerificationDigest: string;
    sourcePacketLocalCleanupVerified: boolean;
    sourceLocalDryRunWriteObserved: true;
  };
  upstreamReceipts: {
    javaV76: JavaV76ApprovalHandoffVerificationMarker;
    miniKvV85: MiniKvV85RetentionProvenanceReplayMarker;
  };
  restoreDrillPlan: {
    planDigest: string;
    planMode: "manual-dry-run-plan-only";
    packetSourceVersion: "Node v211";
    verificationSourceVersion: "Node v212";
    javaReceiptVersion: "Java v76";
    miniKvReceiptVersion: "mini-kv v85";
    normalizedEvidenceRoot: "project-relative";
    expectedPacketFileName: "managed-audit-packet.jsonl";
    expectedPacketRequestId: "managed-audit-v211-identity-approval-provenance-request";
    expectedPacketVersion: "managed-audit-dry-run-record.v2-candidate";
    stepCount: number;
    forbiddenOperationCount: number;
  };
  normalizedEvidenceHints: {
    nodeV211Archive: "c/211/";
    nodeV212Archive: "c/212/";
    javaV76Archive: "c/76/";
    javaV76Walkthrough: "代码讲解记录_生产雏形阶段/80-version-76-release-approval-handoff-verification-marker.md";
    miniKvV85Archive: "c/85/";
    miniKvV85RuntimeSmokeEvidence: "fixtures/release/runtime-smoke-evidence.json";
    miniKvV85VerificationManifest: "fixtures/release/verification-manifest.json";
  };
  drillSteps: RestoreDrillStep[];
  forbiddenOperations: RestoreForbiddenOperation[];
  checks: {
    sourceVerificationReportReady: boolean;
    sourcePacketStillBlocksProduction: boolean;
    sourceCleanupEvidenceVerified: boolean;
    javaV76MarkerAccepted: boolean;
    javaV76ReadyForNodeV213: boolean;
    javaV76NoWriteBoundary: boolean;
    miniKvV85ReplayMarkerAccepted: boolean;
    miniKvV85ReadOnly: boolean;
    miniKvV85NoRestoreOrAuditWrite: boolean;
    evidenceHintsNormalized: boolean;
    drillStepsDryRunOnly: boolean;
    forbiddenOperationsCovered: boolean;
    noAutomaticUpstreamStart: boolean;
    upstreamActionsStillDisabled: boolean;
    productionAuditStillBlocked: boolean;
    restoreExecutionStillBlocked: boolean;
    readyForManagedAuditPacketRestoreDrillPlan: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    drillStepCount: number;
    forbiddenOperationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: RestoreDrillMessage[];
  warnings: RestoreDrillMessage[];
  recommendations: RestoreDrillMessage[];
  evidenceEndpoints: {
    managedAuditPacketRestoreDrillPlanJson: string;
    managedAuditPacketRestoreDrillPlanMarkdown: string;
    sourcePacketVerificationReportJson: string;
    sourcePacketVerificationReportMarkdown: string;
    sourceDryRunPacketJson: string;
    javaV76ArchiveHint: string;
    miniKvV85ArchiveHint: string;
  };
  nextActions: string[];
}

interface JavaV76ApprovalHandoffVerificationMarker {
  sourceVersion: "Java v76";
  markerVersion: "java-release-approval-rehearsal-approval-handoff-verification-marker.v1";
  sourceApprovalRecordHandoffHintVersion: "java-release-approval-rehearsal-approval-record-handoff-hint.v1";
  consumedByNodeVersion: "Node v211";
  consumedByNodeProfileVersion: "managed-audit-identity-approval-provenance-dry-run-packet.v1";
  consumedPacketRequestId: "managed-audit-v211-identity-approval-provenance-request";
  consumedPacketVersion: "managed-audit-dry-run-record.v2-candidate";
  consumedPacketFileName: "managed-audit-packet.jsonl";
  appendQueryDigestCleanupCovered: true;
  readyForNodeV213RestoreDrillPlan: true;
  javaApprovalDecisionCreated: false;
  javaApprovalLedgerWritten: false;
  javaApprovalRecordPersisted: false;
  managedAuditWriteExecuted: false;
  restoreExecuted: false;
  nodeMayTreatAsProductionAuditRecord: false;
}

interface MiniKvV85RetentionProvenanceReplayMarker {
  sourceVersion: "mini-kv v85";
  projectVersion: "0.85.0";
  markerVersion: "mini-kv-retention-provenance-replay-marker.v1";
  consumer: "Node v213 managed audit packet restore drill plan";
  consumedBy: "Node v211 managed audit identity approval provenance dry-run packet";
  consumedReleaseVersion: "v84";
  consumedArtifactPathHint: "c/84/";
  consumedCheckDigest: "fnv1a64:357cc7e9eec3f223";
  currentArtifactPathHint: "c/85/";
  markerDigest: "fnv1a64:1ea4570c967cfdb1";
  liveReadSessionEcho: "mini-kv-live-read-v85";
  readCommandListDigest: "fnv1a64:5bef33f2fbe65cc5";
  readOnly: true;
  executionAllowed: false;
  replayExecuted: false;
  managedAuditWriteExecuted: false;
  restoreExecuted: false;
  orderAuthoritative: false;
}

interface RestoreDrillStep {
  step: number;
  id: string;
  owner: "node" | "operator";
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  dryRunOnly: true;
}

interface RestoreForbiddenOperation {
  id: string;
  operation: string;
  blockedBy: "Node v213 drill plan" | "Java v76 receipt" | "mini-kv v85 receipt" | "runtime config";
  reason: string;
}

interface RestoreDrillMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-packet-restore-drill-plan"
    | "managed-audit-identity-approval-provenance-packet-verification-report"
    | "java-v76-approval-handoff-verification-marker"
    | "mini-kv-v85-retention-provenance-replay-marker"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  managedAuditPacketRestoreDrillPlanJson: "/api/v1/audit/managed-audit-packet-restore-drill-plan",
  managedAuditPacketRestoreDrillPlanMarkdown: "/api/v1/audit/managed-audit-packet-restore-drill-plan?format=markdown",
  sourcePacketVerificationReportJson: "/api/v1/audit/managed-identity-approval-provenance-packet-verification-report",
  sourcePacketVerificationReportMarkdown: "/api/v1/audit/managed-identity-approval-provenance-packet-verification-report?format=markdown",
  sourceDryRunPacketJson: "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet",
  javaV76ArchiveHint: "c/76/",
  miniKvV85ArchiveHint: "c/85/",
});

const NORMALIZED_EVIDENCE_HINTS = Object.freeze({
  nodeV211Archive: "c/211/",
  nodeV212Archive: "c/212/",
  javaV76Archive: "c/76/",
  javaV76Walkthrough: "代码讲解记录_生产雏形阶段/80-version-76-release-approval-handoff-verification-marker.md",
  miniKvV85Archive: "c/85/",
  miniKvV85RuntimeSmokeEvidence: "fixtures/release/runtime-smoke-evidence.json",
  miniKvV85VerificationManifest: "fixtures/release/verification-manifest.json",
} satisfies ManagedAuditPacketRestoreDrillPlanProfile["normalizedEvidenceHints"]);

export async function loadManagedAuditPacketRestoreDrillPlan(input: {
  config: AppConfig;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ManagedAuditPacketRestoreDrillPlanProfile> {
  const sourceReport = await loadManagedAuditIdentityApprovalProvenancePacketVerificationReport(input);
  const javaV76 = createJavaV76Marker();
  const miniKvV85 = createMiniKvV85ReplayMarker();
  const drillSteps = createDrillSteps();
  const forbiddenOperations = createForbiddenOperations();
  const restoreDrillPlan = createRestoreDrillPlan(sourceReport, javaV76, miniKvV85, drillSteps, forbiddenOperations);
  const checks = createChecks(input.config, sourceReport, javaV76, miniKvV85, drillSteps, forbiddenOperations);
  checks.readyForManagedAuditPacketRestoreDrillPlan = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditPacketRestoreDrillPlan")
    .every(([, value]) => value);
  const drillState = checks.readyForManagedAuditPacketRestoreDrillPlan
    ? "ready-for-manual-dry-run-plan"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit packet restore drill plan",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-packet-restore-drill-plan.v1",
    drillState,
    readyForManagedAuditPacketRestoreDrillPlan: checks.readyForManagedAuditPacketRestoreDrillPlan,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyPlan: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    automaticUpstreamStart: false,
    sourceVerificationReport: {
      profileVersion: sourceReport.profileVersion,
      reportState: sourceReport.reportState,
      reportDigest: sourceReport.verificationReport.reportDigest,
      sourcePacketDigest: sourceReport.sourcePacket.packetDigest,
      sourcePacketVerificationDigest: sourceReport.sourcePacket.packetVerificationDigest,
      sourcePacketLocalCleanupVerified: sourceReport.sourcePacket.localDryRunDirectoryRemoved,
      sourceLocalDryRunWriteObserved: true,
    },
    upstreamReceipts: {
      javaV76,
      miniKvV85,
    },
    restoreDrillPlan,
    normalizedEvidenceHints: { ...NORMALIZED_EVIDENCE_HINTS },
    drillSteps,
    forbiddenOperations,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      drillStepCount: drillSteps.length,
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
      "Archive and verify this v213 restore drill plan before adding any managed audit adapter implementation.",
      "Keep the first adapter implementation behind a dry-run boundary; do not connect a real external audit system from v213.",
      "If a future version needs Java or mini-kv receipts, write them as read-only markers and consume them after completion.",
    ],
  };
}

export function renderManagedAuditPacketRestoreDrillPlanMarkdown(
  profile: ManagedAuditPacketRestoreDrillPlanProfile,
): string {
  return [
    "# Managed audit packet restore drill plan",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Drill state: ${profile.drillState}`,
    `- Ready for managed audit packet restore drill plan: ${profile.readyForManagedAuditPacketRestoreDrillPlan}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read-only plan: ${profile.readOnlyPlan}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Restore execution allowed: ${profile.restoreExecutionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Automatic upstream start: ${profile.automaticUpstreamStart}`,
    "",
    "## Source Verification Report",
    "",
    ...renderEntries(profile.sourceVerificationReport),
    "",
    "## Java v76 Receipt",
    "",
    ...renderEntries(profile.upstreamReceipts.javaV76),
    "",
    "## mini-kv v85 Receipt",
    "",
    ...renderEntries(profile.upstreamReceipts.miniKvV85),
    "",
    "## Restore Drill Plan",
    "",
    ...renderEntries(profile.restoreDrillPlan),
    "",
    "## Normalized Evidence Hints",
    "",
    ...renderEntries(profile.normalizedEvidenceHints),
    "",
    "## Drill Steps",
    "",
    ...profile.drillSteps.flatMap(renderStep),
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
    ...renderMessages(profile.productionBlockers, "No managed audit packet restore drill blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No managed audit packet restore drill warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No managed audit packet restore drill recommendations."),
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

function createJavaV76Marker(): JavaV76ApprovalHandoffVerificationMarker {
  return {
    sourceVersion: "Java v76",
    markerVersion: "java-release-approval-rehearsal-approval-handoff-verification-marker.v1",
    sourceApprovalRecordHandoffHintVersion: "java-release-approval-rehearsal-approval-record-handoff-hint.v1",
    consumedByNodeVersion: "Node v211",
    consumedByNodeProfileVersion: "managed-audit-identity-approval-provenance-dry-run-packet.v1",
    consumedPacketRequestId: "managed-audit-v211-identity-approval-provenance-request",
    consumedPacketVersion: "managed-audit-dry-run-record.v2-candidate",
    consumedPacketFileName: "managed-audit-packet.jsonl",
    appendQueryDigestCleanupCovered: true,
    readyForNodeV213RestoreDrillPlan: true,
    javaApprovalDecisionCreated: false,
    javaApprovalLedgerWritten: false,
    javaApprovalRecordPersisted: false,
    managedAuditWriteExecuted: false,
    restoreExecuted: false,
    nodeMayTreatAsProductionAuditRecord: false,
  };
}

function createMiniKvV85ReplayMarker(): MiniKvV85RetentionProvenanceReplayMarker {
  return {
    sourceVersion: "mini-kv v85",
    projectVersion: "0.85.0",
    markerVersion: "mini-kv-retention-provenance-replay-marker.v1",
    consumer: "Node v213 managed audit packet restore drill plan",
    consumedBy: "Node v211 managed audit identity approval provenance dry-run packet",
    consumedReleaseVersion: "v84",
    consumedArtifactPathHint: "c/84/",
    consumedCheckDigest: "fnv1a64:357cc7e9eec3f223",
    currentArtifactPathHint: "c/85/",
    markerDigest: "fnv1a64:1ea4570c967cfdb1",
    liveReadSessionEcho: "mini-kv-live-read-v85",
    readCommandListDigest: "fnv1a64:5bef33f2fbe65cc5",
    readOnly: true,
    executionAllowed: false,
    replayExecuted: false,
    managedAuditWriteExecuted: false,
    restoreExecuted: false,
    orderAuthoritative: false,
  };
}

function createRestoreDrillPlan(
  sourceReport: ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile,
  javaV76: JavaV76ApprovalHandoffVerificationMarker,
  miniKvV85: MiniKvV85RetentionProvenanceReplayMarker,
  drillSteps: RestoreDrillStep[],
  forbiddenOperations: RestoreForbiddenOperation[],
): ManagedAuditPacketRestoreDrillPlanProfile["restoreDrillPlan"] {
  const planWithoutDigest = {
    profileVersion: "managed-audit-packet-restore-drill-plan.v1",
    sourceReportDigest: sourceReport.verificationReport.reportDigest,
    sourcePacketDigest: sourceReport.sourcePacket.packetDigest,
    sourcePacketVerificationDigest: sourceReport.sourcePacket.packetVerificationDigest,
    javaMarkerVersion: javaV76.markerVersion,
    javaReadyForV213: javaV76.readyForNodeV213RestoreDrillPlan,
    miniKvMarkerDigest: miniKvV85.markerDigest,
    miniKvConsumedDigest: miniKvV85.consumedCheckDigest,
    normalizedEvidenceHints: NORMALIZED_EVIDENCE_HINTS,
    drillSteps: drillSteps.map((step) => step.id),
    forbiddenOperations: forbiddenOperations.map((operation) => operation.id),
  };

  return {
    planDigest: sha256StableJson(planWithoutDigest),
    planMode: "manual-dry-run-plan-only",
    packetSourceVersion: "Node v211",
    verificationSourceVersion: "Node v212",
    javaReceiptVersion: "Java v76",
    miniKvReceiptVersion: "mini-kv v85",
    normalizedEvidenceRoot: "project-relative",
    expectedPacketFileName: "managed-audit-packet.jsonl",
    expectedPacketRequestId: "managed-audit-v211-identity-approval-provenance-request",
    expectedPacketVersion: "managed-audit-dry-run-record.v2-candidate",
    stepCount: drillSteps.length,
    forbiddenOperationCount: forbiddenOperations.length,
  };
}

function createDrillSteps(): RestoreDrillStep[] {
  return [
    step(1, "verify-node-v212-report", "node", "Read the v212 verification report and confirm it is packet-verification-ready.", "c/212/ and /api/v1/audit/managed-identity-approval-provenance-packet-verification-report", "Report digest, packet digest, packet verification digest, and cleanup evidence are present."),
    step(2, "verify-java-v76-marker", "node", "Compare Java v76 approval handoff verification marker with the v211 packet request and profile.", "java:c/76/ and Java release approval rehearsal marker", "readyForNodeV213RestoreDrillPlan=true and Java no-write boundaries remain closed."),
    step(3, "verify-mini-kv-v85-marker", "node", "Compare mini-kv v85 retention provenance replay marker with the v84 digest consumed by v211.", "mini-kv:c/85/ and fixtures/release/runtime-smoke-evidence.json", "markerDigest and consumedCheckDigest match the expected read-only replay marker."),
    step(4, "reconstruct-packet-field-map", "operator", "Reconstruct the expected packet field map from archived v211/v212 evidence without replaying it into a live store.", "Node v211 dry-run packet fields", "identity, approval request, approval decision, correlation, provenance, and boundaries are recoverable from evidence."),
    step(5, "compare-digests", "operator", "Compare packet digest, verification digest, Java marker, and mini-kv replay marker in a dry-run worksheet.", "project-relative archive paths", "No digest mismatch is accepted before any future adapter implementation work."),
    step(6, "close-restore-drill", "node", "Record that the restore drill remains a plan only and does not execute restore.", "v213 archive", "No restore, no Java write, no mini-kv write, and no external managed audit access occurred."),
  ];
}

function createForbiddenOperations(): RestoreForbiddenOperation[] {
  return [
    forbidden("connect-real-managed-audit", "Connect to a real external managed audit adapter", "Node v213 drill plan", "v213 only plans evidence reconstruction and must not access real audit systems."),
    forbidden("replay-packet-to-production", "Replay the v211 packet into production audit storage", "Node v213 drill plan", "The v211 packet is a local dry-run evidence shape, not a production record."),
    forbidden("create-java-approval-decision", "Create Java approval decision or write approval ledger", "Java v76 receipt", "Java v76 explicitly keeps approval decision, ledger, and approval record writes disabled."),
    forbidden("execute-mini-kv-restore", "Execute mini-kv LOAD, COMPACT, SETNXEX, RESTORE, or managed audit writes", "mini-kv v85 receipt", "mini-kv v85 replay marker is read-only and replay_executed=false."),
    forbidden("start-upstreams-automatically", "Start Java or mini-kv automatically from Node", "runtime config", "Node v213 must not start upstream processes."),
    forbidden("enable-upstream-actions", "Set UPSTREAM_ACTIONS_ENABLED=true", "runtime config", "Production write actions remain disabled."),
  ];
}

function step(
  stepNumber: number,
  id: string,
  owner: RestoreDrillStep["owner"],
  action: string,
  evidenceTarget: string,
  expectedEvidence: string,
): RestoreDrillStep {
  return {
    step: stepNumber,
    id,
    owner,
    action,
    evidenceTarget,
    expectedEvidence,
    dryRunOnly: true,
  };
}

function forbidden(
  id: string,
  operation: string,
  blockedBy: RestoreForbiddenOperation["blockedBy"],
  reason: string,
): RestoreForbiddenOperation {
  return { id, operation, blockedBy, reason };
}

function createChecks(
  config: AppConfig,
  sourceReport: ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile,
  javaV76: JavaV76ApprovalHandoffVerificationMarker,
  miniKvV85: MiniKvV85RetentionProvenanceReplayMarker,
  drillSteps: RestoreDrillStep[],
  forbiddenOperations: RestoreForbiddenOperation[],
): ManagedAuditPacketRestoreDrillPlanProfile["checks"] {
  return {
    sourceVerificationReportReady: sourceReport.readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport
      && sourceReport.reportState === "packet-verification-ready",
    sourcePacketStillBlocksProduction: !sourceReport.readyForProductionAudit
      && !sourceReport.readyForProductionWindow
      && !sourceReport.readyForProductionOperations
      && !sourceReport.executionAllowed,
    sourceCleanupEvidenceVerified: sourceReport.checks.cleanupEvidenceVerified
      && sourceReport.sourcePacket.localDryRunDirectoryRemoved,
    javaV76MarkerAccepted: javaV76.markerVersion === "java-release-approval-rehearsal-approval-handoff-verification-marker.v1"
      && javaV76.sourceApprovalRecordHandoffHintVersion === "java-release-approval-rehearsal-approval-record-handoff-hint.v1"
      && javaV76.consumedByNodeVersion === "Node v211"
      && javaV76.consumedPacketRequestId === "managed-audit-v211-identity-approval-provenance-request",
    javaV76ReadyForNodeV213: javaV76.readyForNodeV213RestoreDrillPlan
      && javaV76.appendQueryDigestCleanupCovered,
    javaV76NoWriteBoundary: !javaV76.javaApprovalDecisionCreated
      && !javaV76.javaApprovalLedgerWritten
      && !javaV76.javaApprovalRecordPersisted
      && !javaV76.managedAuditWriteExecuted
      && !javaV76.restoreExecuted
      && !javaV76.nodeMayTreatAsProductionAuditRecord,
    miniKvV85ReplayMarkerAccepted: miniKvV85.markerVersion === "mini-kv-retention-provenance-replay-marker.v1"
      && miniKvV85.consumer === "Node v213 managed audit packet restore drill plan"
      && miniKvV85.consumedReleaseVersion === "v84"
      && miniKvV85.consumedCheckDigest === sourceReport.sourcePacket.miniKvRetentionProvenanceCheckDigest
      && miniKvV85.markerDigest === "fnv1a64:1ea4570c967cfdb1",
    miniKvV85ReadOnly: miniKvV85.readOnly
      && !miniKvV85.executionAllowed
      && !miniKvV85.orderAuthoritative,
    miniKvV85NoRestoreOrAuditWrite: !miniKvV85.replayExecuted
      && !miniKvV85.restoreExecuted
      && !miniKvV85.managedAuditWriteExecuted,
    evidenceHintsNormalized: Object.values(NORMALIZED_EVIDENCE_HINTS).every((value) => !/^[A-Za-z]:[\\/]/.test(value)),
    drillStepsDryRunOnly: drillSteps.length === 6 && drillSteps.every((item) => item.dryRunOnly),
    forbiddenOperationsCovered: forbiddenOperations.length === 6
      && forbiddenOperations.some((item) => item.id === "connect-real-managed-audit")
      && forbiddenOperations.some((item) => item.id === "execute-mini-kv-restore")
      && forbiddenOperations.some((item) => item.id === "create-java-approval-decision"),
    noAutomaticUpstreamStart: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    restoreExecutionStillBlocked: true,
    readyForManagedAuditPacketRestoreDrillPlan: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditPacketRestoreDrillPlanProfile["checks"],
): RestoreDrillMessage[] {
  const blockers: RestoreDrillMessage[] = [];
  addMessage(blockers, checks.sourceVerificationReportReady, "SOURCE_VERIFICATION_REPORT_NOT_READY", "managed-audit-identity-approval-provenance-packet-verification-report", "Node v212 verification report must be ready before v213 restore drill planning.");
  addMessage(blockers, checks.sourcePacketStillBlocksProduction, "SOURCE_PACKET_UNLOCKS_PRODUCTION", "managed-audit-identity-approval-provenance-packet-verification-report", "Node v212 must still block production audit and operations.");
  addMessage(blockers, checks.sourceCleanupEvidenceVerified, "SOURCE_CLEANUP_EVIDENCE_MISSING", "managed-audit-identity-approval-provenance-packet-verification-report", "v211/v212 cleanup evidence must be present before restore drill planning.");
  addMessage(blockers, checks.javaV76MarkerAccepted, "JAVA_V76_MARKER_NOT_ACCEPTED", "java-v76-approval-handoff-verification-marker", "Java v76 marker must match the v211 packet and v75 handoff hint.");
  addMessage(blockers, checks.javaV76ReadyForNodeV213, "JAVA_V76_NOT_READY_FOR_V213", "java-v76-approval-handoff-verification-marker", "Java v76 must explicitly be ready for Node v213 restore drill planning.");
  addMessage(blockers, checks.javaV76NoWriteBoundary, "JAVA_V76_WRITE_BOUNDARY_OPEN", "java-v76-approval-handoff-verification-marker", "Java v76 must not create approval records, ledger entries, restore, or managed audit writes.");
  addMessage(blockers, checks.miniKvV85ReplayMarkerAccepted, "MINI_KV_V85_REPLAY_MARKER_NOT_ACCEPTED", "mini-kv-v85-retention-provenance-replay-marker", "mini-kv v85 replay marker must match the v84 provenance digest consumed by v211.");
  addMessage(blockers, checks.miniKvV85ReadOnly, "MINI_KV_V85_NOT_READ_ONLY", "mini-kv-v85-retention-provenance-replay-marker", "mini-kv v85 receipt must be read-only and non-authoritative.");
  addMessage(blockers, checks.miniKvV85NoRestoreOrAuditWrite, "MINI_KV_V85_RESTORE_OR_AUDIT_WRITE", "mini-kv-v85-retention-provenance-replay-marker", "mini-kv v85 must not execute replay, restore, or managed audit writes.");
  addMessage(blockers, checks.evidenceHintsNormalized, "EVIDENCE_HINTS_NOT_NORMALIZED", "managed-audit-packet-restore-drill-plan", "v213 evidence hints must be project-relative, not absolute local disk paths.");
  addMessage(blockers, checks.drillStepsDryRunOnly, "DRILL_STEPS_NOT_DRY_RUN", "managed-audit-packet-restore-drill-plan", "All restore drill steps must remain dry-run plan steps.");
  addMessage(blockers, checks.forbiddenOperationsCovered, "FORBIDDEN_OPERATIONS_INCOMPLETE", "managed-audit-packet-restore-drill-plan", "Restore drill plan must list managed audit, Java, mini-kv, upstream start, and action-enable forbidden operations.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "managed-audit-packet-restore-drill-plan", "Node v213 must not start Java or mini-kv.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "runtime-config", "v213 must not unlock production audit.");
  addMessage(blockers, checks.restoreExecutionStillBlocked, "RESTORE_EXECUTION_UNLOCKED", "runtime-config", "v213 must not execute restore.");
  return blockers;
}

function collectWarnings(): RestoreDrillMessage[] {
  return [
    {
      code: "DRILL_PLAN_ONLY",
      severity: "warning",
      source: "managed-audit-packet-restore-drill-plan",
      message: "v213 is a restore drill plan only; it does not rebuild, replay, or persist a managed audit packet.",
    },
  ];
}

function collectRecommendations(): RestoreDrillMessage[] {
  return [
    {
      code: "VERIFY_V213_ARCHIVE_BEFORE_ADAPTER",
      severity: "recommendation",
      source: "managed-audit-packet-restore-drill-plan",
      message: "Verify the v213 archive before implementing any managed audit adapter candidate.",
    },
    {
      code: "KEEP_FIRST_ADAPTER_DRY_RUN",
      severity: "recommendation",
      source: "managed-audit-packet-restore-drill-plan",
      message: "The first managed audit adapter implementation should remain dry-run and must not connect a production audit backend.",
    },
  ];
}

function renderStep(stepItem: RestoreDrillStep): string[] {
  return [
    `- ${stepItem.step}. ${stepItem.id}`,
    `  - owner: ${stepItem.owner}`,
    `  - action: ${stepItem.action}`,
    `  - evidenceTarget: ${stepItem.evidenceTarget}`,
    `  - expectedEvidence: ${stepItem.expectedEvidence}`,
    `  - dryRunOnly: ${stepItem.dryRunOnly}`,
  ];
}

function renderForbiddenOperation(operation: RestoreForbiddenOperation): string[] {
  return [
    `- ${operation.id}: ${operation.operation}`,
    `  - blockedBy: ${operation.blockedBy}`,
    `  - reason: ${operation.reason}`,
  ];
}

function addMessage(
  messages: RestoreDrillMessage[],
  condition: boolean,
  code: string,
  source: RestoreDrillMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
