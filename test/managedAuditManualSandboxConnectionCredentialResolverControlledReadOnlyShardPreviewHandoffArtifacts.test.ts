import { describe, expect, it } from "vitest";

import {
  createSourceMatrixArchiveSnapshot,
  createSourceMatrixArchiveSnapshotSummaryExport,
  createSourceMatrixHandoffNotes,
  createSourceMatrixConsumer,
  createSourceMatrixDriftSummary,
  createSourceMatrixReviewChecklist,
  createSourceMatrixReviewDigest,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.js";
import {
  createSourceMatrixHandoffSummary,
  createSourceMatrixHandoffSummaryConsumer,
  createSourceMatrixHandoffSummaryConsumerExport,
  createSourceMatrixHandoffSummaryConsumerReceipt,
  createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot,
  createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification,
  createSourceMatrixHandoffRouteCoverage,
  createSourceMatrixHandoffRouteCoverageArchiveSnapshot,
  createSourceMatrixHandoffRouteCoverageArchiveSummary,
  createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt,
  createSourceMatrixHandoffRouteCoverageArchiveVerification,
  createSourceMatrixHandoffRouteCoverageVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrix,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

import {
  blockedSourceMatrix,
  readySourceMatrix,
} from "./support/controlledReadOnlyShardPreviewReviewArtifactFixtures.js";

describe("controlled read-only shard preview handoff artifacts", () => {
  it("builds the ready handoff summary consumer receipt archive chain", () => {
    const handoffNotes = createHandoffNotes(readySourceMatrix());
    const handoffSummary = createSourceMatrixHandoffSummary(handoffNotes);
    const handoffSummaryConsumer = createSourceMatrixHandoffSummaryConsumer(handoffSummary);
    const handoffSummaryConsumerExport = createSourceMatrixHandoffSummaryConsumerExport(handoffSummaryConsumer);
    const handoffSummaryConsumerReceipt = createSourceMatrixHandoffSummaryConsumerReceipt(handoffSummaryConsumerExport);
    const handoffSummaryConsumerReceiptArchiveSnapshot =
      createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot(handoffSummaryConsumerReceipt);
    const handoffSummaryConsumerReceiptArchiveVerification =
      createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification(
        handoffSummaryConsumerReceiptArchiveSnapshot,
      );
    const handoffRouteCoverage = createSourceMatrixHandoffRouteCoverage(
      handoffSummaryConsumerReceiptArchiveVerification,
    );
    const handoffRouteCoverageVerification = createSourceMatrixHandoffRouteCoverageVerification(handoffRouteCoverage);
    const handoffRouteCoverageArchiveSnapshot =
      createSourceMatrixHandoffRouteCoverageArchiveSnapshot(handoffRouteCoverageVerification);
    const handoffRouteCoverageArchiveVerification =
      createSourceMatrixHandoffRouteCoverageArchiveVerification(handoffRouteCoverageArchiveSnapshot);
    const handoffRouteCoverageArchiveSummary =
      createSourceMatrixHandoffRouteCoverageArchiveSummary(handoffRouteCoverageArchiveVerification);
    const handoffRouteCoverageArchiveSummaryReceipt =
      createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt(handoffRouteCoverageArchiveSummary);

    expect(handoffSummary).toMatchObject({
      summaryVersion: "Node v611",
      inputNotesVersion: "Node v608",
      summaryState: "ready-for-read-only-handoff-summary",
      readyForReadOnlyHandoffSummary: true,
      audiences: ["operator", "node", "java", "miniKv"],
      audienceCount: 4,
      actionRequiredCount: 0,
      handoffDigestValue: handoffNotes.handoffDigest.value,
      summaryDigest: {
        algorithm: "sha256",
        scope: "read-only-handoff-summary",
        coveredAudienceCount: 4,
        coveredActionRequiredCount: 0,
      },
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(handoffSummary.summaryDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(handoffSummaryConsumer).toMatchObject({
      consumerVersion: "Node v613",
      inputSummaryVersion: "Node v611",
      decision: "ready-for-read-only-summary-consumption",
      readyForReadOnlySummaryConsumption: true,
      gateCount: 6,
      passedGateCount: 6,
      blockedReasonCodes: [],
      summaryDigestValue: handoffSummary.summaryDigest.value,
      summaryDigestScope: "read-only-handoff-summary",
      coveredAudienceCount: 4,
      actionRequiredCount: 0,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(handoffSummaryConsumerExport).toMatchObject({
      exportVersion: "Node v614",
      inputConsumerVersion: "Node v613",
      exportState: "ready-for-read-only-summary-consumer-export",
      readyForReadOnlySummaryConsumerExport: true,
      consumerDecision: "ready-for-read-only-summary-consumption",
      summaryDigestValue: handoffSummary.summaryDigest.value,
      exportDigest: {
        algorithm: "sha256",
        scope: "handoff-summary-consumer-export-lines",
        coveredLineCount: 5,
      },
      exportLineCount: 5,
      gateCount: 6,
      passedGateCount: 6,
      blockedReasonCount: 0,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(handoffSummaryConsumerExport.exportDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(handoffSummaryConsumerReceipt).toMatchObject({
      receiptVersion: "Node v615",
      inputExportVersion: "Node v614",
      receiptState: "ready-for-read-only-summary-consumer-receipt",
      readyForReadOnlySummaryConsumerReceipt: true,
      exportState: "ready-for-read-only-summary-consumer-export",
      exportDigestValue: handoffSummaryConsumerExport.exportDigest.value,
      receiptDigest: {
        algorithm: "sha256",
        scope: "handoff-summary-consumer-receipt",
        coveredExportLineCount: 5,
        coveredBlockedReasonCount: 0,
      },
      receiptLineCount: 5,
      exportLineCount: 5,
      blockedReasonCount: 0,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(handoffSummaryConsumerReceipt.receiptDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(handoffSummaryConsumerReceiptArchiveSnapshot).toMatchObject({
      snapshotVersion: "Node v616",
      inputReceiptVersion: "Node v615",
      snapshotState: "ready-for-read-only-summary-consumer-receipt-archive",
      readyForReadOnlySummaryConsumerReceiptArchive: true,
      receiptDigestValue: handoffSummaryConsumerReceipt.receiptDigest.value,
      snapshotDigest: {
        algorithm: "sha256",
        scope: "handoff-summary-consumer-receipt-archive-snapshot",
        coveredSectionCount: 3,
      },
      archivedSectionCount: 3,
      receiptLineCount: 5,
      blockedReasonCount: 0,
      includesRawCredential: false,
      includesRuntimePayload: false,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(handoffSummaryConsumerReceiptArchiveSnapshot.snapshotDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(handoffSummaryConsumerReceiptArchiveVerification).toMatchObject({
      verificationVersion: "Node v617",
      inputSnapshotVersion: "Node v616",
      verificationState: "ready-for-read-only-summary-consumer-receipt-archive-verification",
      readyForReadOnlySummaryConsumerReceiptArchiveVerification: true,
      gateCount: 6,
      passedGateCount: 6,
      blockedReasonCodes: [],
      snapshotDigestValue: handoffSummaryConsumerReceiptArchiveSnapshot.snapshotDigest.value,
      archivedSectionCount: 3,
      blockedReasonCount: 0,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(handoffRouteCoverage).toMatchObject({
      coverageVersion: "Node v620",
      inputVerificationVersion: "Node v617",
      coverageState: "ready-for-read-only-handoff-route-coverage",
      readyForReadOnlyHandoffRouteCoverage: true,
      routeSurface: "controlled-read-only-shard-preview",
      verificationState: "ready-for-read-only-summary-consumer-receipt-archive-verification",
      coveredSectionCount: 7,
      coverageDigest: {
        algorithm: "sha256",
        scope: "handoff-route-markdown-sections",
        coveredSectionCount: 7,
      },
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffRouteCoverage.coverageDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(handoffRouteCoverageVerification).toMatchObject({
      verificationVersion: "Node v621",
      inputCoverageVersion: "Node v620",
      verificationState: "ready-for-read-only-handoff-route-coverage-verification",
      readyForReadOnlyHandoffRouteCoverageVerification: true,
      gateCount: 6,
      passedGateCount: 6,
      blockedReasonCodes: [],
      coverageDigestValue: handoffRouteCoverage.coverageDigest.value,
      coveredSectionCount: 7,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffRouteCoverageArchiveSnapshot).toMatchObject({
      snapshotVersion: "Node v622",
      inputVerificationVersion: "Node v621",
      snapshotState: "ready-for-read-only-handoff-route-coverage-archive",
      readyForReadOnlyHandoffRouteCoverageArchive: true,
      coverageDigestValue: handoffRouteCoverage.coverageDigest.value,
      snapshotDigest: {
        algorithm: "sha256",
        scope: "handoff-route-coverage-archive-snapshot",
        coveredSectionCount: 2,
      },
      archivedSections: [
        "sourceMatrixHandoffRouteCoverage",
        "sourceMatrixHandoffRouteCoverageVerification",
      ],
      archivedSectionCount: 2,
      verificationGateCount: 6,
      verificationPassedGateCount: 6,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffRouteCoverageArchiveSnapshot.snapshotDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(handoffRouteCoverageArchiveVerification).toMatchObject({
      verificationVersion: "Node v623",
      inputSnapshotVersion: "Node v622",
      verificationState: "ready-for-read-only-handoff-route-coverage-archive-verification",
      readyForReadOnlyHandoffRouteCoverageArchiveVerification: true,
      gateCount: 7,
      passedGateCount: 7,
      blockedReasonCodes: [],
      snapshotDigestValue: handoffRouteCoverageArchiveSnapshot.snapshotDigest.value,
      archivedSectionCount: 2,
      verificationGateCount: 6,
      verificationPassedGateCount: 6,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffRouteCoverageArchiveSummary).toMatchObject({
      summaryVersion: "Node v624",
      inputVerificationVersion: "Node v623",
      summaryState: "ready-for-read-only-handoff-route-coverage-archive-summary",
      readyForReadOnlyHandoffRouteCoverageArchiveSummary: true,
      verificationState: "ready-for-read-only-handoff-route-coverage-archive-verification",
      snapshotDigestValue: handoffRouteCoverageArchiveSnapshot.snapshotDigest.value,
      summaryDigest: {
        algorithm: "sha256",
        scope: "handoff-route-coverage-archive-summary-lines",
        coveredLineCount: 6,
      },
      summaryLineCount: 6,
      gateCount: 7,
      passedGateCount: 7,
      archivedSectionCount: 2,
      blockedReasonCount: 0,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffRouteCoverageArchiveSummary.summaryDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(handoffRouteCoverageArchiveSummaryReceipt).toMatchObject({
      receiptVersion: "Node v625",
      inputSummaryVersion: "Node v624",
      receiptState: "ready-for-read-only-handoff-route-coverage-archive-summary-receipt",
      readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceipt: true,
      summaryState: "ready-for-read-only-handoff-route-coverage-archive-summary",
      summaryDigestValue: handoffRouteCoverageArchiveSummary.summaryDigest.value,
      receiptDigest: {
        algorithm: "sha256",
        scope: "handoff-route-coverage-archive-summary-receipt",
        coveredSummaryLineCount: 6,
        coveredBlockedReasonCount: 0,
      },
      receiptLineCount: 5,
      summaryLineCount: 6,
      gateCount: 7,
      passedGateCount: 7,
      blockedReasonCount: 0,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffRouteCoverageArchiveSummaryReceipt.receiptDigest.value).toMatch(/^[a-f0-9]{64}$/);
  });

  it("fails closed when the handoff notes are blocked", () => {
    const handoffNotes = createHandoffNotes(blockedSourceMatrix());
    const handoffSummary = createSourceMatrixHandoffSummary(handoffNotes);
    const handoffSummaryConsumer = createSourceMatrixHandoffSummaryConsumer(handoffSummary);
    const handoffSummaryConsumerExport = createSourceMatrixHandoffSummaryConsumerExport(handoffSummaryConsumer);
    const handoffSummaryConsumerReceipt = createSourceMatrixHandoffSummaryConsumerReceipt(handoffSummaryConsumerExport);
    const handoffSummaryConsumerReceiptArchiveSnapshot =
      createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot(handoffSummaryConsumerReceipt);
    const handoffSummaryConsumerReceiptArchiveVerification =
      createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification(
        handoffSummaryConsumerReceiptArchiveSnapshot,
      );
    const handoffRouteCoverage = createSourceMatrixHandoffRouteCoverage(
      handoffSummaryConsumerReceiptArchiveVerification,
    );
    const handoffRouteCoverageVerification = createSourceMatrixHandoffRouteCoverageVerification(handoffRouteCoverage);
    const handoffRouteCoverageArchiveSnapshot =
      createSourceMatrixHandoffRouteCoverageArchiveSnapshot(handoffRouteCoverageVerification);
    const handoffRouteCoverageArchiveVerification =
      createSourceMatrixHandoffRouteCoverageArchiveVerification(handoffRouteCoverageArchiveSnapshot);
    const handoffRouteCoverageArchiveSummary =
      createSourceMatrixHandoffRouteCoverageArchiveSummary(handoffRouteCoverageArchiveVerification);
    const handoffRouteCoverageArchiveSummaryReceipt =
      createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt(handoffRouteCoverageArchiveSummary);

    expect(handoffSummary).toMatchObject({
      summaryState: "blocked",
      readyForReadOnlyHandoffSummary: false,
      audienceCount: 4,
      actionRequiredCount: 1,
      summaryDigest: {
        algorithm: "sha256",
        scope: "read-only-handoff-summary",
        coveredAudienceCount: 4,
        coveredActionRequiredCount: 1,
      },
    });
    expect(handoffSummaryConsumer).toMatchObject({
      decision: "blocked",
      readyForReadOnlySummaryConsumption: false,
      passedGateCount: 4,
      blockedReasonCodes: [
        "HANDOFF_SUMMARY_NOT_READY",
        "HANDOFF_SUMMARY_ACTION_REQUIRED",
      ],
      summaryDigestScope: "read-only-handoff-summary",
      coveredAudienceCount: 4,
      actionRequiredCount: 1,
    });
    expect(handoffSummaryConsumerExport).toMatchObject({
      exportState: "blocked",
      readyForReadOnlySummaryConsumerExport: false,
      consumerDecision: "blocked",
      exportDigest: {
        algorithm: "sha256",
        scope: "handoff-summary-consumer-export-lines",
        coveredLineCount: 5,
      },
      exportLineCount: 5,
      gateCount: 6,
      passedGateCount: 4,
      blockedReasonCount: 2,
    });
    expect(handoffSummaryConsumerReceipt).toMatchObject({
      receiptState: "blocked",
      readyForReadOnlySummaryConsumerReceipt: false,
      exportState: "blocked",
      receiptDigest: {
        algorithm: "sha256",
        scope: "handoff-summary-consumer-receipt",
        coveredExportLineCount: 5,
        coveredBlockedReasonCount: 2,
      },
      receiptLineCount: 5,
      exportLineCount: 5,
      blockedReasonCount: 2,
    });
    expect(handoffSummaryConsumerReceiptArchiveSnapshot).toMatchObject({
      snapshotState: "blocked",
      readyForReadOnlySummaryConsumerReceiptArchive: false,
      snapshotDigest: {
        algorithm: "sha256",
        scope: "handoff-summary-consumer-receipt-archive-snapshot",
        coveredSectionCount: 3,
      },
      archivedSectionCount: 3,
      blockedReasonCount: 2,
      includesRawCredential: false,
      includesRuntimePayload: false,
    });
    expect(handoffSummaryConsumerReceiptArchiveVerification).toMatchObject({
      verificationState: "blocked",
      readyForReadOnlySummaryConsumerReceiptArchiveVerification: false,
      gateCount: 6,
      passedGateCount: 5,
      blockedReasonCodes: ["HANDOFF_RECEIPT_ARCHIVE_SNAPSHOT_NOT_READY"],
      archivedSectionCount: 3,
      blockedReasonCount: 2,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(handoffRouteCoverage).toMatchObject({
      coverageState: "blocked",
      readyForReadOnlyHandoffRouteCoverage: false,
      routeSurface: "controlled-read-only-shard-preview",
      verificationState: "blocked",
      coveredSectionCount: 7,
      coverageDigest: {
        algorithm: "sha256",
        scope: "handoff-route-markdown-sections",
        coveredSectionCount: 7,
      },
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffRouteCoverageVerification).toMatchObject({
      verificationState: "blocked",
      readyForReadOnlyHandoffRouteCoverageVerification: false,
      gateCount: 6,
      passedGateCount: 5,
      blockedReasonCodes: ["HANDOFF_ROUTE_COVERAGE_NOT_READY"],
      coverageDigestValue: handoffRouteCoverage.coverageDigest.value,
      coveredSectionCount: 7,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffRouteCoverageArchiveSnapshot).toMatchObject({
      snapshotState: "blocked",
      readyForReadOnlyHandoffRouteCoverageArchive: false,
      coverageDigestValue: handoffRouteCoverage.coverageDigest.value,
      snapshotDigest: {
        algorithm: "sha256",
        scope: "handoff-route-coverage-archive-snapshot",
        coveredSectionCount: 2,
      },
      archivedSectionCount: 2,
      verificationGateCount: 6,
      verificationPassedGateCount: 5,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffRouteCoverageArchiveVerification).toMatchObject({
      verificationState: "blocked",
      readyForReadOnlyHandoffRouteCoverageArchiveVerification: false,
      gateCount: 7,
      passedGateCount: 6,
      blockedReasonCodes: ["HANDOFF_ROUTE_COVERAGE_ARCHIVE_SNAPSHOT_NOT_READY"],
      snapshotDigestValue: handoffRouteCoverageArchiveSnapshot.snapshotDigest.value,
      archivedSectionCount: 2,
      verificationGateCount: 6,
      verificationPassedGateCount: 5,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffRouteCoverageArchiveSummary).toMatchObject({
      summaryState: "blocked",
      readyForReadOnlyHandoffRouteCoverageArchiveSummary: false,
      verificationState: "blocked",
      summaryDigest: {
        algorithm: "sha256",
        scope: "handoff-route-coverage-archive-summary-lines",
        coveredLineCount: 6,
      },
      summaryLineCount: 6,
      gateCount: 7,
      passedGateCount: 6,
      archivedSectionCount: 2,
      blockedReasonCount: 1,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffRouteCoverageArchiveSummaryReceipt).toMatchObject({
      receiptState: "blocked",
      readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceipt: false,
      summaryState: "blocked",
      receiptDigest: {
        algorithm: "sha256",
        scope: "handoff-route-coverage-archive-summary-receipt",
        coveredSummaryLineCount: 6,
        coveredBlockedReasonCount: 1,
      },
      receiptLineCount: 5,
      summaryLineCount: 6,
      gateCount: 7,
      passedGateCount: 6,
      blockedReasonCount: 1,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
  });

  it("keeps the handoff summary digest stable for the same handoff notes", () => {
    const handoffNotes = createHandoffNotes(readySourceMatrix());

    const first = createSourceMatrixHandoffSummary(handoffNotes);
    const second = createSourceMatrixHandoffSummary(handoffNotes);

    expect(first.summaryDigest).toEqual(second.summaryDigest);
    expect(first.summaryDigest).toMatchObject({
      algorithm: "sha256",
      scope: "read-only-handoff-summary",
      coveredAudienceCount: 4,
      coveredActionRequiredCount: 0,
    });
  });

  it("keeps the handoff receipt archive snapshot digest stable for the same receipt", () => {
    const handoffNotes = createHandoffNotes(readySourceMatrix());
    const handoffSummary = createSourceMatrixHandoffSummary(handoffNotes);
    const handoffSummaryConsumer = createSourceMatrixHandoffSummaryConsumer(handoffSummary);
    const handoffSummaryConsumerExport = createSourceMatrixHandoffSummaryConsumerExport(handoffSummaryConsumer);
    const receipt = createSourceMatrixHandoffSummaryConsumerReceipt(handoffSummaryConsumerExport);

    const first = createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot(receipt);
    const second = createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot(receipt);

    expect(first.snapshotDigest).toEqual(second.snapshotDigest);
    expect(first.snapshotDigest).toMatchObject({
      algorithm: "sha256",
      scope: "handoff-summary-consumer-receipt-archive-snapshot",
      coveredSectionCount: 3,
    });
  });

  it("keeps the handoff route coverage archive verification stable for the same snapshot", () => {
    const handoffNotes = createHandoffNotes(readySourceMatrix());
    const handoffSummary = createSourceMatrixHandoffSummary(handoffNotes);
    const handoffSummaryConsumer = createSourceMatrixHandoffSummaryConsumer(handoffSummary);
    const handoffSummaryConsumerExport = createSourceMatrixHandoffSummaryConsumerExport(handoffSummaryConsumer);
    const receipt = createSourceMatrixHandoffSummaryConsumerReceipt(handoffSummaryConsumerExport);
    const receiptSnapshot = createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot(receipt);
    const receiptVerification = createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification(receiptSnapshot);
    const coverage = createSourceMatrixHandoffRouteCoverage(receiptVerification);
    const coverageVerification = createSourceMatrixHandoffRouteCoverageVerification(coverage);
    const snapshot = createSourceMatrixHandoffRouteCoverageArchiveSnapshot(coverageVerification);

    const first = createSourceMatrixHandoffRouteCoverageArchiveVerification(snapshot);
    const second = createSourceMatrixHandoffRouteCoverageArchiveVerification(snapshot);

    expect(first).toEqual(second);
    expect(first).toMatchObject({
      verificationVersion: "Node v623",
      inputSnapshotVersion: "Node v622",
      verificationState: "ready-for-read-only-handoff-route-coverage-archive-verification",
      gateCount: 7,
      passedGateCount: 7,
      blockedReasonCodes: [],
      snapshotDigestValue: snapshot.snapshotDigest.value,
    });
  });

  it("keeps the handoff route coverage archive summary digest stable for the same verification", () => {
    const handoffNotes = createHandoffNotes(readySourceMatrix());
    const handoffSummary = createSourceMatrixHandoffSummary(handoffNotes);
    const handoffSummaryConsumer = createSourceMatrixHandoffSummaryConsumer(handoffSummary);
    const handoffSummaryConsumerExport = createSourceMatrixHandoffSummaryConsumerExport(handoffSummaryConsumer);
    const receipt = createSourceMatrixHandoffSummaryConsumerReceipt(handoffSummaryConsumerExport);
    const receiptSnapshot = createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot(receipt);
    const receiptVerification = createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification(receiptSnapshot);
    const coverage = createSourceMatrixHandoffRouteCoverage(receiptVerification);
    const coverageVerification = createSourceMatrixHandoffRouteCoverageVerification(coverage);
    const snapshot = createSourceMatrixHandoffRouteCoverageArchiveSnapshot(coverageVerification);
    const verification = createSourceMatrixHandoffRouteCoverageArchiveVerification(snapshot);

    const first = createSourceMatrixHandoffRouteCoverageArchiveSummary(verification);
    const second = createSourceMatrixHandoffRouteCoverageArchiveSummary(verification);

    expect(first.summaryDigest).toEqual(second.summaryDigest);
    expect(first.summaryDigest).toMatchObject({
      algorithm: "sha256",
      scope: "handoff-route-coverage-archive-summary-lines",
      coveredLineCount: 6,
    });
  });

  it("keeps the handoff route coverage archive summary receipt digest stable for the same summary", () => {
    const handoffNotes = createHandoffNotes(readySourceMatrix());
    const handoffSummary = createSourceMatrixHandoffSummary(handoffNotes);
    const handoffSummaryConsumer = createSourceMatrixHandoffSummaryConsumer(handoffSummary);
    const handoffSummaryConsumerExport = createSourceMatrixHandoffSummaryConsumerExport(handoffSummaryConsumer);
    const receipt = createSourceMatrixHandoffSummaryConsumerReceipt(handoffSummaryConsumerExport);
    const receiptSnapshot = createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot(receipt);
    const receiptVerification = createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification(receiptSnapshot);
    const coverage = createSourceMatrixHandoffRouteCoverage(receiptVerification);
    const coverageVerification = createSourceMatrixHandoffRouteCoverageVerification(coverage);
    const snapshot = createSourceMatrixHandoffRouteCoverageArchiveSnapshot(coverageVerification);
    const verification = createSourceMatrixHandoffRouteCoverageArchiveVerification(snapshot);
    const summary = createSourceMatrixHandoffRouteCoverageArchiveSummary(verification);

    const first = createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt(summary);
    const second = createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt(summary);

    expect(first.receiptDigest).toEqual(second.receiptDigest);
    expect(first.receiptDigest).toMatchObject({
      algorithm: "sha256",
      scope: "handoff-route-coverage-archive-summary-receipt",
      coveredSummaryLineCount: 6,
      coveredBlockedReasonCount: 0,
    });
  });
});

function createHandoffNotes(
  sourceMatrix: ControlledReadOnlyShardPreviewSourceMatrix,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes {
  const consumer = createSourceMatrixConsumer(sourceMatrix);
  const driftSummary = createSourceMatrixDriftSummary(sourceMatrix, consumer);
  const checklist = createSourceMatrixReviewChecklist(driftSummary);
  const digest = createSourceMatrixReviewDigest(checklist);
  const snapshot = createSourceMatrixArchiveSnapshot(digest);
  const summaryExport = createSourceMatrixArchiveSnapshotSummaryExport(snapshot);
  return createSourceMatrixHandoffNotes(summaryExport);
}
