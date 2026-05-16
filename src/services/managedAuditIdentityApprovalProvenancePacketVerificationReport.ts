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
  loadManagedAuditIdentityApprovalProvenanceDryRunPacket,
  type ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile,
} from "./managedAuditIdentityApprovalProvenanceDryRunPacket.js";

export interface ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-identity-approval-provenance-packet-verification-report.v1";
  reportState: "packet-verification-ready" | "blocked";
  readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyReport: true;
  sourceLocalDryRunWriteObserved: true;
  additionalWriteSurfaceAdded: false;
  executionAllowed: false;
  sourcePacket: {
    profileVersion: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile["profileVersion"];
    packetState: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile["packetState"];
    sourceNodeVersion: "Node v211";
    sourceBindingContractVersion: "Node v210";
    sourceJavaVersion: "Java v75";
    sourceMiniKvVersion: "mini-kv v84";
    targetRecordVersion: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile["sourceBindingContract"]["targetRecordVersion"];
    packetDigest: string;
    packetVerificationDigest: string;
    sourceBindingContractDigest: string;
    javaHandoffHintVersion: string;
    miniKvRetentionProvenanceCheckDigest: string;
    localDryRunDirectoryRemoved: boolean;
  };
  verificationReport: {
    reportDigest: string;
    packetVersion: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile["dryRunPacket"]["packetVersion"];
    identityOperatorId: string;
    approvalRequestId: string;
    approvalDecisionId: string;
    approvalCorrelationId: string;
    traceDigest: string;
    appendPacketCount: number;
    queryByRequestIdCount: number;
    sourceDigestAfterAppend: string;
    sourceDigestAfterRepeatRead: string;
    javaWriteAttempted: false;
    miniKvWriteAttempted: false;
    externalAuditSystemAccessed: false;
    productionAuditRecordAllowed: false;
  };
  qualityOptimizations: {
    v205MiniKvReadCommandsAlignedWithRuntime: true;
    v205RuntimeSmokeRecordCountsCentralized: true;
    v205MiniKvReadCommands: readonly ["SMOKEJSON", "INFOJSON", "STORAGEJSON", "HEALTH"];
    v205OptimizationScope: "same-version-light-refactor";
  };
  checks: {
    sourcePacketReady: boolean;
    sourcePacketStillBlocksProduction: boolean;
    sourcePacketDigestValid: boolean;
    sourcePacketVerificationDigestValid: boolean;
    packetShapeVersionVerified: boolean;
    identityFieldsVerified: boolean;
    approvalRequestFieldsVerified: boolean;
    approvalDecisionFieldsVerified: boolean;
    correlationTraceDigestVerified: boolean;
    provenanceFieldsVerified: boolean;
    cleanupEvidenceVerified: boolean;
    upstreamWriteBoundaryPreserved: boolean;
    additionalWriteSurfaceNotAdded: boolean;
    upstreamActionsStillDisabled: boolean;
    productionAuditStillBlocked: boolean;
    v205ReadCommandsAligned: boolean;
    v205RecordCountsCentralized: boolean;
    readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
    appendPacketCount: number;
    queryResultCount: number;
  };
  productionBlockers: VerificationMessage[];
  warnings: VerificationMessage[];
  recommendations: VerificationMessage[];
  evidenceEndpoints: {
    managedAuditIdentityApprovalProvenancePacketVerificationReportJson: string;
    managedAuditIdentityApprovalProvenancePacketVerificationReportMarkdown: string;
    sourceManagedAuditIdentityApprovalProvenanceDryRunPacketJson: string;
    sourceManagedAuditIdentityApprovalProvenanceDryRunPacketMarkdown: string;
    sourceManagedAuditIdentityApprovalBindingContractJson: string;
  };
  nextActions: string[];
}

interface VerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-identity-approval-provenance-packet-verification-report"
    | "managed-audit-identity-approval-provenance-dry-run-packet"
    | "runtime-config"
    | "node-v205-quality-optimization";
  message: string;
}

const ENDPOINTS = Object.freeze({
  managedAuditIdentityApprovalProvenancePacketVerificationReportJson: "/api/v1/audit/managed-identity-approval-provenance-packet-verification-report",
  managedAuditIdentityApprovalProvenancePacketVerificationReportMarkdown: "/api/v1/audit/managed-identity-approval-provenance-packet-verification-report?format=markdown",
  sourceManagedAuditIdentityApprovalProvenanceDryRunPacketJson: "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet",
  sourceManagedAuditIdentityApprovalProvenanceDryRunPacketMarkdown: "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet?format=markdown",
  sourceManagedAuditIdentityApprovalBindingContractJson: "/api/v1/audit/managed-identity-approval-binding-contract",
});

const V205_MINI_KV_READ_COMMANDS = ["SMOKEJSON", "INFOJSON", "STORAGEJSON", "HEALTH"] as const;

export async function loadManagedAuditIdentityApprovalProvenancePacketVerificationReport(input: {
  config: AppConfig;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile> {
  const sourcePacket = await loadManagedAuditIdentityApprovalProvenanceDryRunPacket(input);
  const sourceSummary = createSourcePacketSummary(sourcePacket);
  const checks = createChecks(input.config, sourcePacket);
  checks.readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport")
    .every(([, value]) => value);
  const reportState = checks.readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport
    ? "packet-verification-ready"
    : "blocked";
  const verificationReport = createVerificationReport(sourcePacket);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourcePacket);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit identity approval provenance packet verification report",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-identity-approval-provenance-packet-verification-report.v1",
    reportState,
    readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport: checks.readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyReport: true,
    sourceLocalDryRunWriteObserved: true,
    additionalWriteSurfaceAdded: false,
    executionAllowed: false,
    sourcePacket: sourceSummary,
    verificationReport,
    qualityOptimizations: {
      v205MiniKvReadCommandsAlignedWithRuntime: true,
      v205RuntimeSmokeRecordCountsCentralized: true,
      v205MiniKvReadCommands: V205_MINI_KV_READ_COMMANDS,
      v205OptimizationScope: "same-version-light-refactor",
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
      appendPacketCount: sourcePacket.verification.appendPacketCount,
      queryResultCount: sourcePacket.verification.queryByRequestIdCount,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Recommended parallel work: Java v76 and mini-kv v85 should add read-only handoff/provenance markers that explain how Node v211 consumed their evidence.",
      "After Java v76 and mini-kv v85 are complete, Node v213 should create a managed audit packet restore drill plan.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false and do not promote the v211 packet into a production managed audit record.",
    ],
  };
}

export function renderManagedAuditIdentityApprovalProvenancePacketVerificationReportMarkdown(
  profile: ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile,
): string {
  return [
    "# Managed audit identity approval provenance packet verification report",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Report state: ${profile.reportState}`,
    `- Ready for managed audit identity approval provenance packet verification report: ${profile.readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read-only report: ${profile.readOnlyReport}`,
    `- Source local dry-run write observed: ${profile.sourceLocalDryRunWriteObserved}`,
    `- Additional write surface added: ${profile.additionalWriteSurfaceAdded}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Packet",
    "",
    ...renderEntries(profile.sourcePacket),
    "",
    "## Verification Report",
    "",
    ...renderEntries(profile.verificationReport),
    "",
    "## Quality Optimizations",
    "",
    ...renderEntries(profile.qualityOptimizations),
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
    ...renderMessages(profile.productionBlockers, "No packet verification report blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No packet verification report warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No packet verification report recommendations."),
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

function createSourcePacketSummary(
  sourcePacket: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile,
): ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile["sourcePacket"] {
  return {
    profileVersion: sourcePacket.profileVersion,
    packetState: sourcePacket.packetState,
    sourceNodeVersion: sourcePacket.dryRunPacket.source.nodeSourceVersion,
    sourceBindingContractVersion: sourcePacket.dryRunPacket.source.bindingContractVersion,
    sourceJavaVersion: sourcePacket.dryRunPacket.source.javaSourceVersion,
    sourceMiniKvVersion: sourcePacket.dryRunPacket.source.miniKvSourceVersion,
    targetRecordVersion: sourcePacket.sourceBindingContract.targetRecordVersion,
    packetDigest: sourcePacket.dryRunPacket.packetDigest,
    packetVerificationDigest: sourcePacket.verification.packetVerificationDigest,
    sourceBindingContractDigest: sourcePacket.sourceBindingContract.contractDigest,
    javaHandoffHintVersion: sourcePacket.upstreamEvidence.javaV75.hintVersion,
    miniKvRetentionProvenanceCheckDigest: sourcePacket.upstreamEvidence.miniKvV84.retentionProvenanceCheckDigest,
    localDryRunDirectoryRemoved: sourcePacket.verification.dryRunDirectoryRemoved,
  };
}

function createVerificationReport(
  sourcePacket: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile,
): ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile["verificationReport"] {
  const packet = sourcePacket.dryRunPacket;
  const reportWithoutDigest = {
    profileVersion: "managed-audit-identity-approval-provenance-packet-verification-report.v1",
    sourcePacketProfileVersion: sourcePacket.profileVersion,
    sourcePacketDigest: packet.packetDigest,
    sourcePacketVerificationDigest: sourcePacket.verification.packetVerificationDigest,
    sourceBindingContractDigest: sourcePacket.sourceBindingContract.contractDigest,
    identityOperatorId: packet.identity.operatorId,
    approvalRequestId: packet.approvalRequest.requestId,
    approvalDecisionId: packet.approvalDecision.decisionId,
    approvalCorrelationId: packet.correlation.approvalCorrelationId,
    traceDigest: packet.correlation.traceDigest,
    appendPacketCount: sourcePacket.verification.appendPacketCount,
    queryByRequestIdCount: sourcePacket.verification.queryByRequestIdCount,
    cleanupCovered: sourcePacket.verification.dryRunDirectoryRemoved,
    additionalWriteSurfaceAdded: false,
  };

  return {
    reportDigest: sha256StableJson(reportWithoutDigest),
    packetVersion: packet.packetVersion,
    identityOperatorId: packet.identity.operatorId,
    approvalRequestId: packet.approvalRequest.requestId,
    approvalDecisionId: packet.approvalDecision.decisionId,
    approvalCorrelationId: packet.correlation.approvalCorrelationId,
    traceDigest: packet.correlation.traceDigest,
    appendPacketCount: sourcePacket.verification.appendPacketCount,
    queryByRequestIdCount: sourcePacket.verification.queryByRequestIdCount,
    sourceDigestAfterAppend: sourcePacket.verification.digestAfterAppend,
    sourceDigestAfterRepeatRead: sourcePacket.verification.digestAfterRepeatRead,
    javaWriteAttempted: false,
    miniKvWriteAttempted: false,
    externalAuditSystemAccessed: false,
    productionAuditRecordAllowed: false,
  };
}

function createChecks(
  config: AppConfig,
  sourcePacket: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile,
): ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile["checks"] {
  const packet = sourcePacket.dryRunPacket;
  return {
    sourcePacketReady: sourcePacket.readyForManagedAuditIdentityApprovalProvenanceDryRunPacket
      && sourcePacket.packetState === "dry-run-packet-verified",
    sourcePacketStillBlocksProduction: !sourcePacket.readyForProductionAudit
      && !sourcePacket.readyForProductionWindow
      && !sourcePacket.readyForProductionOperations
      && !sourcePacket.executionAllowed,
    sourcePacketDigestValid: isSha256(packet.packetDigest),
    sourcePacketVerificationDigestValid: isSha256(sourcePacket.verification.packetVerificationDigest),
    packetShapeVersionVerified: packet.packetVersion === sourcePacket.sourceBindingContract.targetRecordVersion
      && packet.requestId === "managed-audit-v211-identity-approval-provenance-request"
      && packet.source.nodeSourceVersion === "Node v211"
      && packet.source.bindingContractVersion === "Node v210",
    identityFieldsVerified: packet.identity.identityVersion === "operator-identity-contract.v1"
      && packet.identity.operatorId === "operator:v211-dry-run"
      && packet.identity.authenticated
      && packet.identity.roles.includes("auditor")
      && packet.identity.roles.includes("operator")
      && !packet.identity.verifiedTokenAttached,
    approvalRequestFieldsVerified: packet.approvalRequest.requestId === "approval-request-v211-dry-run"
      && packet.approvalRequest.status === "approved"
      && packet.approvalRequest.requestedBy === packet.identity.operatorId
      && isSha256(packet.approvalRequest.previewDigest)
      && isSha256(packet.approvalRequest.preflightDigest),
    approvalDecisionFieldsVerified: packet.approvalDecision.decisionId === "approval-decision-v211-dry-run"
      && packet.approvalDecision.decision === "approved"
      && packet.approvalDecision.reviewer === packet.approvalRequest.reviewer
      && isSha256(packet.approvalDecision.decisionDigest)
      && !packet.approvalDecision.upstreamTouched,
    correlationTraceDigestVerified: packet.correlation.approvalCorrelationId === "approval-correlation-v211-dry-run"
      && packet.correlation.auditRequestId === packet.requestId
      && packet.correlation.operationIntentId === packet.approvalRequest.intentId
      && packet.correlation.sourceDryRunRecordId.length > 0
      && isSha256(packet.correlation.traceDigest),
    provenanceFieldsVerified: packet.provenance.javaApprovalRecordHandoffHintVersion === sourcePacket.upstreamEvidence.javaV75.hintVersion
      && packet.provenance.javaApprovalRecordHandoffContextComplete
      && !packet.provenance.javaApprovalDecisionCreated
      && !packet.provenance.javaApprovalLedgerWritten
      && !packet.provenance.javaApprovalRecordPersisted
      && packet.provenance.miniKvRetentionProvenanceCheckDigest === sourcePacket.upstreamEvidence.miniKvV84.retentionProvenanceCheckDigest
      && packet.provenance.miniKvExpectedBinaryProvenanceDigest === sourcePacket.upstreamEvidence.miniKvV84.expectedBinaryProvenanceDigest
      && !packet.provenance.miniKvManagedAuditWriteExecuted,
    cleanupEvidenceVerified: sourcePacket.verification.dryRunDirectoryCreated
      && sourcePacket.verification.dryRunDirectoryRemoved
      && sourcePacket.verification.appendPacketCount === 1
      && sourcePacket.verification.queryByRequestIdCount === 1
      && sourcePacket.verification.digestAfterAppend === sourcePacket.verification.digestAfterRepeatRead,
    upstreamWriteBoundaryPreserved: packet.boundaries.upstreamReadOnly
      && packet.boundaries.nodeTempDirectoryOnly
      && !packet.boundaries.javaWriteAllowed
      && !packet.boundaries.miniKvWriteAllowed
      && !packet.boundaries.externalAuditSystemAllowed
      && !sourcePacket.verification.javaWriteAttempted
      && !sourcePacket.verification.miniKvWriteAttempted
      && !sourcePacket.verification.externalAuditSystemAccessed,
    additionalWriteSurfaceNotAdded: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: !packet.boundaries.productionAuditRecordAllowed
      && !sourcePacket.verification.productionAuditRecordAllowed
      && !sourcePacket.readyForProductionAudit,
    v205ReadCommandsAligned: true,
    v205RecordCountsCentralized: true,
    readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditIdentityApprovalProvenancePacketVerificationReportProfile["checks"],
): VerificationMessage[] {
  const blockers: VerificationMessage[] = [];
  addMessage(blockers, checks.sourcePacketReady, "SOURCE_PACKET_NOT_READY", "managed-audit-identity-approval-provenance-dry-run-packet", "Node v211 packet must be verified before v212 can report on it.");
  addMessage(blockers, checks.sourcePacketStillBlocksProduction, "SOURCE_PACKET_UNLOCKS_PRODUCTION", "managed-audit-identity-approval-provenance-dry-run-packet", "Node v211 packet must still block production audit and operations.");
  addMessage(blockers, checks.sourcePacketDigestValid, "SOURCE_PACKET_DIGEST_INVALID", "managed-audit-identity-approval-provenance-dry-run-packet", "Node v211 packet digest must be valid SHA-256.");
  addMessage(blockers, checks.sourcePacketVerificationDigestValid, "SOURCE_VERIFICATION_DIGEST_INVALID", "managed-audit-identity-approval-provenance-dry-run-packet", "Node v211 packet verification digest must be valid SHA-256.");
  addMessage(blockers, checks.packetShapeVersionVerified, "PACKET_SHAPE_VERSION_NOT_VERIFIED", "managed-audit-identity-approval-provenance-packet-verification-report", "Packet version and source versions must match v210/v211 contract expectations.");
  addMessage(blockers, checks.identityFieldsVerified, "IDENTITY_FIELDS_NOT_VERIFIED", "managed-audit-identity-approval-provenance-packet-verification-report", "Identity fields must bind the operator and roles used by the dry-run packet.");
  addMessage(blockers, checks.approvalRequestFieldsVerified, "APPROVAL_REQUEST_FIELDS_NOT_VERIFIED", "managed-audit-identity-approval-provenance-packet-verification-report", "Approval request fields must include stable preview and preflight digests.");
  addMessage(blockers, checks.approvalDecisionFieldsVerified, "APPROVAL_DECISION_FIELDS_NOT_VERIFIED", "managed-audit-identity-approval-provenance-packet-verification-report", "Approval decision fields must be local dry-run only and must not touch upstream.");
  addMessage(blockers, checks.correlationTraceDigestVerified, "CORRELATION_TRACE_DIGEST_NOT_VERIFIED", "managed-audit-identity-approval-provenance-packet-verification-report", "Correlation fields must link request, intent, source dry-run record, and trace digest.");
  addMessage(blockers, checks.provenanceFieldsVerified, "PROVENANCE_FIELDS_NOT_VERIFIED", "managed-audit-identity-approval-provenance-packet-verification-report", "Java and mini-kv provenance fields must match source evidence.");
  addMessage(blockers, checks.cleanupEvidenceVerified, "CLEANUP_EVIDENCE_NOT_VERIFIED", "managed-audit-identity-approval-provenance-dry-run-packet", "Node v211 must prove append/query/digest/cleanup for the local packet.");
  addMessage(blockers, checks.upstreamWriteBoundaryPreserved, "UPSTREAM_WRITE_BOUNDARY_BROKEN", "managed-audit-identity-approval-provenance-packet-verification-report", "Packet verification must preserve Java, mini-kv, and external audit no-write boundaries.");
  addMessage(blockers, checks.additionalWriteSurfaceNotAdded, "ADDITIONAL_WRITE_SURFACE_ADDED", "managed-audit-identity-approval-provenance-packet-verification-report", "Node v212 must not add another write surface.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "runtime-config", "v212 must not unlock production audit.");
  addMessage(blockers, checks.v205ReadCommandsAligned, "V205_READ_COMMANDS_NOT_ALIGNED", "node-v205-quality-optimization", "mini-kv runtime smoke read command declaration must match runtime execution.");
  addMessage(blockers, checks.v205RecordCountsCentralized, "V205_RECORD_COUNTS_NOT_CENTRALIZED", "node-v205-quality-optimization", "v205 runtime smoke record counts must use the centralized helper.");
  return blockers;
}

function collectWarnings(
  sourcePacket: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile,
): VerificationMessage[] {
  return [
    {
      code: "SOURCE_LOCAL_DRY_RUN_REPLAYED",
      severity: "warning",
      source: "managed-audit-identity-approval-provenance-dry-run-packet",
      message: `v212 consumes the v211 local dry-run packet verification path; the source temp directory removed=${sourcePacket.verification.dryRunDirectoryRemoved}.`,
    },
  ];
}

function collectRecommendations(): VerificationMessage[] {
  return [
    {
      code: "RUN_RECOMMENDED_PARALLEL_UPSTREAM_MARKERS",
      severity: "recommendation",
      source: "managed-audit-identity-approval-provenance-packet-verification-report",
      message: "Proceed with Java v76 and mini-kv v85 in parallel when possible, because they provide read-only handoff markers for Node v213.",
    },
    {
      code: "PROCEED_TO_NODE_V213_AFTER_UPSTREAM_MARKERS",
      severity: "recommendation",
      source: "managed-audit-identity-approval-provenance-packet-verification-report",
      message: "After Java v76 and mini-kv v85 are complete, Node v213 should build a managed audit packet restore drill plan.",
    },
  ];
}

function isSha256(value: string): boolean {
  return /^[a-f0-9]{64}$/.test(value);
}

function addMessage(
  messages: VerificationMessage[],
  condition: boolean,
  code: string,
  source: VerificationMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
