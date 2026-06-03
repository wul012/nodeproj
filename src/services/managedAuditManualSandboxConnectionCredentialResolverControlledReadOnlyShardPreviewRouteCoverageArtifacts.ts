import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverage,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSnapshot,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummary,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerification,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerification,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

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
const HANDOFF_ROUTE_COVERAGE_ARCHIVE_SUMMARY_RECEIPT_ARCHIVED_SECTIONS = Object.freeze([
  "sourceMatrixHandoffRouteCoverageArchiveSummary",
  "sourceMatrixHandoffRouteCoverageArchiveSummaryReceipt",
]);

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

export function createSourceMatrixHandoffRouteCoverageArchiveVerification(
  snapshot: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSnapshot,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerification {
  const gates = {
    snapshotReady: snapshot.readyForReadOnlyHandoffRouteCoverageArchive,
    snapshotDigestPresent: snapshot.snapshotDigest.value.length === 64,
    archivedSectionsComplete: snapshot.archivedSectionCount === HANDOFF_ROUTE_COVERAGE_ARCHIVED_SECTIONS.length
      && snapshot.archivedSections.length === snapshot.archivedSectionCount
      && snapshot.snapshotDigest.coveredSectionCount === snapshot.archivedSectionCount,
    verificationGatesPreserved: snapshot.verificationGateCount > 0
      && snapshot.verificationPassedGateCount <= snapshot.verificationGateCount,
    noRoutingActivationRequired: !snapshot.requiresRoutingActivation,
    noFreshSiblingEvidenceRequired: !snapshot.requiresFreshSiblingEvidence,
    readOnlyVerificationOnly: true as const,
  };
  const gateValues = Object.values(gates);
  const readyForReadOnlyHandoffRouteCoverageArchiveVerification = gateValues.every(Boolean);

  return {
    verificationVersion: "Node v623",
    inputSnapshotVersion: "Node v622",
    verificationState: readyForReadOnlyHandoffRouteCoverageArchiveVerification
      ? "ready-for-read-only-handoff-route-coverage-archive-verification"
      : "blocked",
    readyForReadOnlyHandoffRouteCoverageArchiveVerification,
    gateCount: gateValues.length,
    passedGateCount: gateValues.filter(Boolean).length,
    gates,
    blockedReasonCodes: createSourceMatrixHandoffRouteCoverageArchiveVerificationBlockedReasons(gates),
    snapshotDigestValue: snapshot.snapshotDigest.value,
    archivedSectionCount: snapshot.archivedSectionCount,
    verificationGateCount: snapshot.verificationGateCount,
    verificationPassedGateCount: snapshot.verificationPassedGateCount,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixHandoffRouteCoverageArchiveSummary(
  verification: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerification,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummary {
  const summaryLines = [
    `verificationState=${verification.verificationState}`,
    `snapshotDigest=${verification.snapshotDigestValue}`,
    `passedGates=${verification.passedGateCount}/${verification.gateCount}`,
    `archivedSections=${verification.archivedSectionCount}`,
    `blockedReasons=${verification.blockedReasonCodes.join("|") || "none"}`,
    `routingActivation=${verification.requiresRoutingActivation}`,
  ];

  return {
    summaryVersion: "Node v624",
    inputVerificationVersion: "Node v623",
    summaryState: verification.readyForReadOnlyHandoffRouteCoverageArchiveVerification
      ? "ready-for-read-only-handoff-route-coverage-archive-summary"
      : "blocked",
    readyForReadOnlyHandoffRouteCoverageArchiveSummary:
      verification.readyForReadOnlyHandoffRouteCoverageArchiveVerification,
    verificationState: verification.verificationState,
    snapshotDigestValue: verification.snapshotDigestValue,
    summaryDigest: {
      algorithm: "sha256",
      scope: "handoff-route-coverage-archive-summary-lines",
      value: sha256StableJson({
        summaryVersion: "Node v624",
        inputVerificationVersion: "Node v623",
        summaryLines,
      }),
      coveredLineCount: summaryLines.length,
    },
    summaryLines,
    summaryLineCount: summaryLines.length,
    gateCount: verification.gateCount,
    passedGateCount: verification.passedGateCount,
    archivedSectionCount: verification.archivedSectionCount,
    blockedReasonCount: verification.blockedReasonCodes.length,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt(
  summary: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummary,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt {
  const receiptLines = [
    `summaryState=${summary.summaryState}`,
    `summaryDigest=${summary.summaryDigest.value}`,
    `summaryLines=${summary.summaryLineCount}`,
    `blockedReasons=${summary.blockedReasonCount}`,
    `routingActivation=${summary.requiresRoutingActivation}`,
  ];

  return {
    receiptVersion: "Node v625",
    inputSummaryVersion: "Node v624",
    receiptState: summary.readyForReadOnlyHandoffRouteCoverageArchiveSummary
      ? "ready-for-read-only-handoff-route-coverage-archive-summary-receipt"
      : "blocked",
    readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceipt:
      summary.readyForReadOnlyHandoffRouteCoverageArchiveSummary,
    summaryState: summary.summaryState,
    summaryDigestValue: summary.summaryDigest.value,
    receiptDigest: {
      algorithm: "sha256",
      scope: "handoff-route-coverage-archive-summary-receipt",
      value: sha256StableJson({
        receiptVersion: "Node v625",
        inputSummaryVersion: "Node v624",
        receiptLines,
      }),
      coveredSummaryLineCount: summary.summaryLineCount,
      coveredBlockedReasonCount: summary.blockedReasonCount,
    },
    receiptLines,
    receiptLineCount: receiptLines.length,
    summaryLineCount: summary.summaryLineCount,
    gateCount: summary.gateCount,
    passedGateCount: summary.passedGateCount,
    blockedReasonCount: summary.blockedReasonCount,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot(
  receipt: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot {
  return {
    snapshotVersion: "Node v626",
    inputReceiptVersion: "Node v625",
    snapshotState: receipt.readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceipt
      ? "ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive"
      : "blocked",
    readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchive:
      receipt.readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceipt,
    receiptDigestValue: receipt.receiptDigest.value,
    snapshotDigest: {
      algorithm: "sha256",
      scope: "handoff-route-coverage-archive-summary-receipt-archive-snapshot",
      value: sha256StableJson({
        snapshotVersion: "Node v626",
        inputReceiptVersion: "Node v625",
        receiptDigestValue: receipt.receiptDigest.value,
        archivedSections: HANDOFF_ROUTE_COVERAGE_ARCHIVE_SUMMARY_RECEIPT_ARCHIVED_SECTIONS,
        receiptLineCount: receipt.receiptLineCount,
        summaryLineCount: receipt.summaryLineCount,
        blockedReasonCount: receipt.blockedReasonCount,
      }),
      coveredSectionCount: HANDOFF_ROUTE_COVERAGE_ARCHIVE_SUMMARY_RECEIPT_ARCHIVED_SECTIONS.length,
    },
    archivedSections: [...HANDOFF_ROUTE_COVERAGE_ARCHIVE_SUMMARY_RECEIPT_ARCHIVED_SECTIONS],
    archivedSectionCount: HANDOFF_ROUTE_COVERAGE_ARCHIVE_SUMMARY_RECEIPT_ARCHIVED_SECTIONS.length,
    receiptLineCount: receipt.receiptLineCount,
    summaryLineCount: receipt.summaryLineCount,
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

export function createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification(
  snapshot: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification {
  const gates = {
    snapshotReady: snapshot.readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchive,
    snapshotDigestPresent: snapshot.snapshotDigest.value.length === 64,
    archivedSectionsComplete: snapshot.archivedSectionCount
      === HANDOFF_ROUTE_COVERAGE_ARCHIVE_SUMMARY_RECEIPT_ARCHIVED_SECTIONS.length
      && snapshot.archivedSections.length === snapshot.archivedSectionCount
      && snapshot.snapshotDigest.coveredSectionCount === snapshot.archivedSectionCount,
    excludesRawCredential: !snapshot.includesRawCredential,
    excludesRuntimePayload: !snapshot.includesRuntimePayload,
    noRoutingActivationRequired: !snapshot.requiresRoutingActivation,
    noFreshSiblingEvidenceRequired: !snapshot.requiresFreshSiblingEvidence,
    readOnlyVerificationOnly: true as const,
  };
  const gateValues = Object.values(gates);
  const readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification = gateValues.every(Boolean);

  return {
    verificationVersion: "Node v627",
    inputSnapshotVersion: "Node v626",
    verificationState: readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification
      ? "ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive-verification"
      : "blocked",
    readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification,
    gateCount: gateValues.length,
    passedGateCount: gateValues.filter(Boolean).length,
    gates,
    blockedReasonCodes:
      createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerificationBlockedReasons(gates),
    snapshotDigestValue: snapshot.snapshotDigest.value,
    archivedSectionCount: snapshot.archivedSectionCount,
    receiptLineCount: snapshot.receiptLineCount,
    summaryLineCount: snapshot.summaryLineCount,
    blockedReasonCount: snapshot.blockedReasonCount,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
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

function createSourceMatrixHandoffRouteCoverageArchiveVerificationBlockedReasons(
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerification["gates"],
): string[] {
  return [
    gates.snapshotReady ? null : "HANDOFF_ROUTE_COVERAGE_ARCHIVE_SNAPSHOT_NOT_READY",
    gates.snapshotDigestPresent ? null : "HANDOFF_ROUTE_COVERAGE_ARCHIVE_SNAPSHOT_DIGEST_MISSING",
    gates.archivedSectionsComplete ? null : "HANDOFF_ROUTE_COVERAGE_ARCHIVE_SECTIONS_INCOMPLETE",
    gates.verificationGatesPreserved ? null : "HANDOFF_ROUTE_COVERAGE_ARCHIVE_GATES_NOT_PRESERVED",
    gates.noRoutingActivationRequired ? null : "HANDOFF_ROUTE_COVERAGE_ARCHIVE_ROUTING_ACTIVATION_REQUIRED",
    gates.noFreshSiblingEvidenceRequired ? null : "HANDOFF_ROUTE_COVERAGE_ARCHIVE_FRESH_SIBLING_EVIDENCE_REQUIRED",
  ].filter((reason): reason is string => reason !== null);
}

function createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerificationBlockedReasons(
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification["gates"],
): string[] {
  return [
    gates.snapshotReady ? null : "HANDOFF_ROUTE_COVERAGE_SUMMARY_RECEIPT_ARCHIVE_SNAPSHOT_NOT_READY",
    gates.snapshotDigestPresent ? null : "HANDOFF_ROUTE_COVERAGE_SUMMARY_RECEIPT_ARCHIVE_DIGEST_MISSING",
    gates.archivedSectionsComplete ? null : "HANDOFF_ROUTE_COVERAGE_SUMMARY_RECEIPT_ARCHIVE_SECTIONS_INCOMPLETE",
    gates.excludesRawCredential ? null : "HANDOFF_ROUTE_COVERAGE_SUMMARY_RECEIPT_ARCHIVE_RAW_CREDENTIAL_INCLUDED",
    gates.excludesRuntimePayload ? null : "HANDOFF_ROUTE_COVERAGE_SUMMARY_RECEIPT_ARCHIVE_RUNTIME_PAYLOAD_INCLUDED",
    gates.noRoutingActivationRequired
      ? null
      : "HANDOFF_ROUTE_COVERAGE_SUMMARY_RECEIPT_ARCHIVE_ROUTING_ACTIVATION_REQUIRED",
    gates.noFreshSiblingEvidenceRequired
      ? null
      : "HANDOFF_ROUTE_COVERAGE_SUMMARY_RECEIPT_ARCHIVE_FRESH_SIBLING_EVIDENCE_REQUIRED",
  ].filter((reason): reason is string => reason !== null);
}
