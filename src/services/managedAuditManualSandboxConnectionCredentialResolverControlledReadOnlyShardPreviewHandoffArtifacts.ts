import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffAudience,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummary,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerExport,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceipt,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverage,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSnapshot,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

const HANDOFF_SUMMARY_CONSUMER_RECEIPT_ARCHIVED_SECTIONS = Object.freeze([
  "sourceMatrixHandoffSummaryConsumer",
  "sourceMatrixHandoffSummaryConsumerExport",
  "sourceMatrixHandoffSummaryConsumerReceipt",
]);
const HANDOFF_ROUTE_MARKDOWN_SECTIONS = Object.freeze([
  "Source Matrix Handoff Notes",
  "Source Matrix Handoff Summary",
  "Source Matrix Handoff Summary Consumer",
  "Source Matrix Handoff Summary Consumer Export",
  "Source Matrix Handoff Summary Consumer Receipt",
  "Source Matrix Handoff Summary Consumer Receipt Archive Snapshot",
  "Source Matrix Handoff Summary Consumer Receipt Archive Verification",
]);
const HANDOFF_ROUTE_COVERAGE_ARCHIVED_SECTIONS = Object.freeze([
  "sourceMatrixHandoffRouteCoverage",
  "sourceMatrixHandoffRouteCoverageVerification",
]);

export function createSourceMatrixHandoffSummary(
  handoffNotes: ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffSummary {
  const audiences = uniqueHandoffAudiences(handoffNotes.notes.map((note) => note.audience));
  const readyForReadOnlyHandoffSummary =
    handoffNotes.readyForReadOnlyHandoff && handoffNotes.actionRequiredCount === 0;
  const material = {
    summaryVersion: "Node v611",
    inputNotesVersion: "Node v608",
    summaryState: readyForReadOnlyHandoffSummary ? "ready-for-read-only-handoff-summary" : "blocked",
    readyForReadOnlyHandoffSummary,
    audiences,
    audienceCount: audiences.length,
    actionRequiredCount: handoffNotes.actionRequiredCount,
    handoffDigestValue: handoffNotes.handoffDigest.value,
    safetyBoundaries: {
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    },
  };

  return {
    summaryVersion: "Node v611",
    inputNotesVersion: "Node v608",
    summaryState: readyForReadOnlyHandoffSummary ? "ready-for-read-only-handoff-summary" : "blocked",
    readyForReadOnlyHandoffSummary,
    audiences,
    audienceCount: audiences.length,
    actionRequiredCount: handoffNotes.actionRequiredCount,
    handoffDigestValue: handoffNotes.handoffDigest.value,
    summaryDigest: {
      algorithm: "sha256",
      scope: "read-only-handoff-summary",
      value: sha256StableJson(material),
      coveredAudienceCount: audiences.length,
      coveredActionRequiredCount: handoffNotes.actionRequiredCount,
    },
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixHandoffSummaryConsumer(
  handoffSummary: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummary,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer {
  const gates = {
    inputSummaryReady: handoffSummary.readyForReadOnlyHandoffSummary,
    summaryDigestPresent: handoffSummary.summaryDigest.value.length === 64,
    summaryDigestScopeDeclared: handoffSummary.summaryDigest.scope === "read-only-handoff-summary",
    allAudiencesCovered: handoffSummary.summaryDigest.coveredAudienceCount === handoffSummary.audienceCount
      && handoffSummary.audiences.length === handoffSummary.audienceCount,
    noActionRequired: handoffSummary.actionRequiredCount === 0
      && handoffSummary.summaryDigest.coveredActionRequiredCount === 0,
    readOnlyConsumerOnly: true as const,
  };
  const gateValues = Object.values(gates);
  const readyForReadOnlySummaryConsumption = gateValues.every(Boolean);

  return {
    consumerVersion: "Node v613",
    inputSummaryVersion: "Node v611",
    decision: readyForReadOnlySummaryConsumption ? "ready-for-read-only-summary-consumption" : "blocked",
    readyForReadOnlySummaryConsumption,
    gateCount: gateValues.length,
    passedGateCount: gateValues.filter(Boolean).length,
    gates,
    blockedReasonCodes: createSourceMatrixHandoffSummaryConsumerBlockedReasons(gates),
    summaryDigestValue: handoffSummary.summaryDigest.value,
    summaryDigestScope: handoffSummary.summaryDigest.scope,
    coveredAudienceCount: handoffSummary.summaryDigest.coveredAudienceCount,
    actionRequiredCount: handoffSummary.actionRequiredCount,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixHandoffSummaryConsumerExport(
  consumer: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerExport {
  const exportLines = [
    `decision=${consumer.decision}`,
    `summaryDigest=${consumer.summaryDigestValue}`,
    `passedGates=${consumer.passedGateCount}/${consumer.gateCount}`,
    `blockedReasons=${consumer.blockedReasonCodes.join("|") || "none"}`,
    `routingActivation=${consumer.requiresRoutingActivation}`,
  ];

  return {
    exportVersion: "Node v614",
    inputConsumerVersion: "Node v613",
    exportState: consumer.readyForReadOnlySummaryConsumption
      ? "ready-for-read-only-summary-consumer-export"
      : "blocked",
    readyForReadOnlySummaryConsumerExport: consumer.readyForReadOnlySummaryConsumption,
    consumerDecision: consumer.decision,
    summaryDigestValue: consumer.summaryDigestValue,
    exportDigest: {
      algorithm: "sha256",
      scope: "handoff-summary-consumer-export-lines",
      value: sha256StableJson({
        exportVersion: "Node v614",
        inputConsumerVersion: "Node v613",
        exportLines,
      }),
      coveredLineCount: exportLines.length,
    },
    exportLines,
    exportLineCount: exportLines.length,
    gateCount: consumer.gateCount,
    passedGateCount: consumer.passedGateCount,
    blockedReasonCount: consumer.blockedReasonCodes.length,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixHandoffSummaryConsumerReceipt(
  consumerExport: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerExport,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceipt {
  const receiptLines = [
    `exportState=${consumerExport.exportState}`,
    `exportDigest=${consumerExport.exportDigest.value}`,
    `exportLines=${consumerExport.exportLineCount}`,
    `blockedReasons=${consumerExport.blockedReasonCount}`,
    `routingActivation=${consumerExport.requiresRoutingActivation}`,
  ];

  return {
    receiptVersion: "Node v615",
    inputExportVersion: "Node v614",
    receiptState: consumerExport.readyForReadOnlySummaryConsumerExport
      ? "ready-for-read-only-summary-consumer-receipt"
      : "blocked",
    readyForReadOnlySummaryConsumerReceipt: consumerExport.readyForReadOnlySummaryConsumerExport,
    exportState: consumerExport.exportState,
    exportDigestValue: consumerExport.exportDigest.value,
    receiptDigest: {
      algorithm: "sha256",
      scope: "handoff-summary-consumer-receipt",
      value: sha256StableJson({
        receiptVersion: "Node v615",
        inputExportVersion: "Node v614",
        receiptLines,
      }),
      coveredExportLineCount: consumerExport.exportLineCount,
      coveredBlockedReasonCount: consumerExport.blockedReasonCount,
    },
    receiptLines,
    receiptLineCount: receiptLines.length,
    exportLineCount: consumerExport.exportLineCount,
    blockedReasonCount: consumerExport.blockedReasonCount,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot(
  receipt: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceipt,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot {
  return {
    snapshotVersion: "Node v616",
    inputReceiptVersion: "Node v615",
    snapshotState: receipt.readyForReadOnlySummaryConsumerReceipt
      ? "ready-for-read-only-summary-consumer-receipt-archive"
      : "blocked",
    readyForReadOnlySummaryConsumerReceiptArchive: receipt.readyForReadOnlySummaryConsumerReceipt,
    receiptDigestValue: receipt.receiptDigest.value,
    snapshotDigest: {
      algorithm: "sha256",
      scope: "handoff-summary-consumer-receipt-archive-snapshot",
      value: sha256StableJson({
        snapshotVersion: "Node v616",
        inputReceiptVersion: "Node v615",
        receiptDigestValue: receipt.receiptDigest.value,
        archivedSections: HANDOFF_SUMMARY_CONSUMER_RECEIPT_ARCHIVED_SECTIONS,
        receiptLineCount: receipt.receiptLineCount,
        blockedReasonCount: receipt.blockedReasonCount,
      }),
      coveredSectionCount: HANDOFF_SUMMARY_CONSUMER_RECEIPT_ARCHIVED_SECTIONS.length,
    },
    archivedSections: [...HANDOFF_SUMMARY_CONSUMER_RECEIPT_ARCHIVED_SECTIONS],
    archivedSectionCount: HANDOFF_SUMMARY_CONSUMER_RECEIPT_ARCHIVED_SECTIONS.length,
    receiptLineCount: receipt.receiptLineCount,
    blockedReasonCount: receipt.blockedReasonCount,
    includesRawCredential: false,
    includesRuntimePayload: false,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification(
  snapshot: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification {
  const gates = {
    snapshotReady: snapshot.readyForReadOnlySummaryConsumerReceiptArchive,
    snapshotDigestPresent: snapshot.snapshotDigest.value.length === 64,
    archivedSectionsComplete: snapshot.archivedSectionCount === HANDOFF_SUMMARY_CONSUMER_RECEIPT_ARCHIVED_SECTIONS.length,
    excludesRawCredential: !snapshot.includesRawCredential,
    excludesRuntimePayload: !snapshot.includesRuntimePayload,
    readOnlyVerificationOnly: true as const,
  };
  const gateValues = Object.values(gates);
  const readyForReadOnlySummaryConsumerReceiptArchiveVerification = gateValues.every(Boolean);

  return {
    verificationVersion: "Node v617",
    inputSnapshotVersion: "Node v616",
    verificationState: readyForReadOnlySummaryConsumerReceiptArchiveVerification
      ? "ready-for-read-only-summary-consumer-receipt-archive-verification"
      : "blocked",
    readyForReadOnlySummaryConsumerReceiptArchiveVerification,
    gateCount: gateValues.length,
    passedGateCount: gateValues.filter(Boolean).length,
    gates,
    blockedReasonCodes: createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerificationBlockedReasons(gates),
    snapshotDigestValue: snapshot.snapshotDigest.value,
    archivedSectionCount: snapshot.archivedSectionCount,
    blockedReasonCount: snapshot.blockedReasonCount,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixHandoffRouteCoverage(
  verification: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverage {
  return {
    coverageVersion: "Node v620",
    inputVerificationVersion: "Node v617",
    coverageState: verification.readyForReadOnlySummaryConsumerReceiptArchiveVerification
      ? "ready-for-read-only-handoff-route-coverage"
      : "blocked",
    readyForReadOnlyHandoffRouteCoverage: verification.readyForReadOnlySummaryConsumerReceiptArchiveVerification,
    routeSurface: "controlled-read-only-shard-preview",
    verificationState: verification.verificationState,
    coveredSections: [...HANDOFF_ROUTE_MARKDOWN_SECTIONS],
    coveredSectionCount: HANDOFF_ROUTE_MARKDOWN_SECTIONS.length,
    coverageDigest: {
      algorithm: "sha256",
      scope: "handoff-route-markdown-sections",
      value: sha256StableJson({
        coverageVersion: "Node v620",
        inputVerificationVersion: "Node v617",
        verificationState: verification.verificationState,
        coveredSections: HANDOFF_ROUTE_MARKDOWN_SECTIONS,
      }),
      coveredSectionCount: HANDOFF_ROUTE_MARKDOWN_SECTIONS.length,
    },
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixHandoffRouteCoverageVerification(
  coverage: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverage,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerification {
  const gates = {
    coverageReady: coverage.readyForReadOnlyHandoffRouteCoverage,
    coverageDigestPresent: coverage.coverageDigest.value.length === 64,
    sectionCountCovered: coverage.coveredSectionCount === coverage.coverageDigest.coveredSectionCount
      && coverage.coveredSections.length === coverage.coveredSectionCount,
    noRoutingActivationRequired: !coverage.requiresRoutingActivation,
    noFreshSiblingEvidenceRequired: !coverage.requiresFreshSiblingEvidence,
    readOnlyVerificationOnly: true as const,
  };
  const gateValues = Object.values(gates);
  const readyForReadOnlyHandoffRouteCoverageVerification = gateValues.every(Boolean);

  return {
    verificationVersion: "Node v621",
    inputCoverageVersion: "Node v620",
    verificationState: readyForReadOnlyHandoffRouteCoverageVerification
      ? "ready-for-read-only-handoff-route-coverage-verification"
      : "blocked",
    readyForReadOnlyHandoffRouteCoverageVerification,
    gateCount: gateValues.length,
    passedGateCount: gateValues.filter(Boolean).length,
    gates,
    blockedReasonCodes: createSourceMatrixHandoffRouteCoverageVerificationBlockedReasons(gates),
    coverageDigestValue: coverage.coverageDigest.value,
    coveredSectionCount: coverage.coveredSectionCount,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixHandoffRouteCoverageArchiveSnapshot(
  verification: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerification,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSnapshot {
  return {
    snapshotVersion: "Node v622",
    inputVerificationVersion: "Node v621",
    snapshotState: verification.readyForReadOnlyHandoffRouteCoverageVerification
      ? "ready-for-read-only-handoff-route-coverage-archive"
      : "blocked",
    readyForReadOnlyHandoffRouteCoverageArchive: verification.readyForReadOnlyHandoffRouteCoverageVerification,
    coverageDigestValue: verification.coverageDigestValue,
    snapshotDigest: {
      algorithm: "sha256",
      scope: "handoff-route-coverage-archive-snapshot",
      value: sha256StableJson({
        snapshotVersion: "Node v622",
        inputVerificationVersion: "Node v621",
        coverageDigestValue: verification.coverageDigestValue,
        archivedSections: HANDOFF_ROUTE_COVERAGE_ARCHIVED_SECTIONS,
        verificationGateCount: verification.gateCount,
        verificationPassedGateCount: verification.passedGateCount,
      }),
      coveredSectionCount: HANDOFF_ROUTE_COVERAGE_ARCHIVED_SECTIONS.length,
    },
    archivedSections: [...HANDOFF_ROUTE_COVERAGE_ARCHIVED_SECTIONS],
    archivedSectionCount: HANDOFF_ROUTE_COVERAGE_ARCHIVED_SECTIONS.length,
    verificationGateCount: verification.gateCount,
    verificationPassedGateCount: verification.passedGateCount,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

function createSourceMatrixHandoffSummaryConsumerBlockedReasons(
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer["gates"],
): string[] {
  return [
    gates.inputSummaryReady ? null : "HANDOFF_SUMMARY_NOT_READY",
    gates.summaryDigestPresent ? null : "HANDOFF_SUMMARY_DIGEST_MISSING",
    gates.summaryDigestScopeDeclared ? null : "HANDOFF_SUMMARY_DIGEST_SCOPE_UNDECLARED",
    gates.allAudiencesCovered ? null : "HANDOFF_SUMMARY_AUDIENCE_COVERAGE_MISMATCH",
    gates.noActionRequired ? null : "HANDOFF_SUMMARY_ACTION_REQUIRED",
  ].filter((reason): reason is string => reason !== null);
}

function createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerificationBlockedReasons(
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification["gates"],
): string[] {
  return [
    gates.snapshotReady ? null : "HANDOFF_RECEIPT_ARCHIVE_SNAPSHOT_NOT_READY",
    gates.snapshotDigestPresent ? null : "HANDOFF_RECEIPT_ARCHIVE_SNAPSHOT_DIGEST_MISSING",
    gates.archivedSectionsComplete ? null : "HANDOFF_RECEIPT_ARCHIVE_SECTIONS_INCOMPLETE",
    gates.excludesRawCredential ? null : "HANDOFF_RECEIPT_ARCHIVE_RAW_CREDENTIAL_INCLUDED",
    gates.excludesRuntimePayload ? null : "HANDOFF_RECEIPT_ARCHIVE_RUNTIME_PAYLOAD_INCLUDED",
  ].filter((reason): reason is string => reason !== null);
}

function createSourceMatrixHandoffRouteCoverageVerificationBlockedReasons(
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerification["gates"],
): string[] {
  return [
    gates.coverageReady ? null : "HANDOFF_ROUTE_COVERAGE_NOT_READY",
    gates.coverageDigestPresent ? null : "HANDOFF_ROUTE_COVERAGE_DIGEST_MISSING",
    gates.sectionCountCovered ? null : "HANDOFF_ROUTE_COVERAGE_SECTION_COUNT_MISMATCH",
    gates.noRoutingActivationRequired ? null : "HANDOFF_ROUTE_COVERAGE_ROUTING_ACTIVATION_REQUIRED",
    gates.noFreshSiblingEvidenceRequired ? null : "HANDOFF_ROUTE_COVERAGE_FRESH_SIBLING_EVIDENCE_REQUIRED",
  ].filter((reason): reason is string => reason !== null);
}

function uniqueHandoffAudiences(
  audiences: ControlledReadOnlyShardPreviewSourceMatrixHandoffAudience[],
): ControlledReadOnlyShardPreviewSourceMatrixHandoffAudience[] {
  return audiences.filter((audience, index) => audiences.indexOf(audience) === index);
}
