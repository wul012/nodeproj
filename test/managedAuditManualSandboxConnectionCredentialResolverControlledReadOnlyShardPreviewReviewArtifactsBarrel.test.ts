import { describe, expect, it } from "vitest";

import * as archiveHandoffArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewArchiveHandoffArtifacts.js";
import * as handoffArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.js";
import * as reviewArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.js";
import * as reviewDecisionArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewDecisionArtifacts.js";
import * as routeCoverageArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArtifacts.js";
import * as sourceMatrixFlowArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixFlowArtifacts.js";

describe("controlled read-only shard preview review artifact barrel", () => {
  it("re-exports source matrix flow builders", () => {
    expect(reviewArtifacts.createSourceMatrixConsumptionPlan)
      .toBe(sourceMatrixFlowArtifacts.createSourceMatrixConsumptionPlan);
    expect(reviewArtifacts.createSourceMatrixConsumer).toBe(sourceMatrixFlowArtifacts.createSourceMatrixConsumer);
    expect(reviewArtifacts.createSourceMatrixDriftSummary).toBe(sourceMatrixFlowArtifacts.createSourceMatrixDriftSummary);
  });

  it("re-exports review decision builders", () => {
    expect(reviewArtifacts.createSourceMatrixReviewChecklist)
      .toBe(reviewDecisionArtifacts.createSourceMatrixReviewChecklist);
    expect(reviewArtifacts.createSourceMatrixReviewDigest).toBe(reviewDecisionArtifacts.createSourceMatrixReviewDigest);
  });

  it("re-exports archive handoff builders", () => {
    expect(reviewArtifacts.createSourceMatrixArchiveSnapshot)
      .toBe(archiveHandoffArtifacts.createSourceMatrixArchiveSnapshot);
    expect(reviewArtifacts.createSourceMatrixArchiveSnapshotSummaryExport)
      .toBe(archiveHandoffArtifacts.createSourceMatrixArchiveSnapshotSummaryExport);
    expect(reviewArtifacts.createSourceMatrixHandoffNotes).toBe(archiveHandoffArtifacts.createSourceMatrixHandoffNotes);
  });

  it("re-exports handoff summary builders", () => {
    expect(reviewArtifacts.createSourceMatrixHandoffSummary).toBe(handoffArtifacts.createSourceMatrixHandoffSummary);
    expect(reviewArtifacts.createSourceMatrixHandoffSummaryConsumer)
      .toBe(handoffArtifacts.createSourceMatrixHandoffSummaryConsumer);
    expect(reviewArtifacts.createSourceMatrixHandoffSummaryConsumerExport)
      .toBe(handoffArtifacts.createSourceMatrixHandoffSummaryConsumerExport);
    expect(reviewArtifacts.createSourceMatrixHandoffSummaryConsumerReceipt)
      .toBe(handoffArtifacts.createSourceMatrixHandoffSummaryConsumerReceipt);
    expect(reviewArtifacts.createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot)
      .toBe(handoffArtifacts.createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot);
    expect(reviewArtifacts.createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification)
      .toBe(handoffArtifacts.createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification);
  });

  it("re-exports route coverage builders", () => {
    expect(reviewArtifacts.createSourceMatrixHandoffRouteCoverage)
      .toBe(routeCoverageArtifacts.createSourceMatrixHandoffRouteCoverage);
    expect(reviewArtifacts.createSourceMatrixHandoffRouteCoverageVerification)
      .toBe(routeCoverageArtifacts.createSourceMatrixHandoffRouteCoverageVerification);
    expect(reviewArtifacts.createSourceMatrixHandoffRouteCoverageArchiveSnapshot)
      .toBe(routeCoverageArtifacts.createSourceMatrixHandoffRouteCoverageArchiveSnapshot);
    expect(reviewArtifacts.createSourceMatrixHandoffRouteCoverageArchiveVerification)
      .toBe(routeCoverageArtifacts.createSourceMatrixHandoffRouteCoverageArchiveVerification);
    expect(reviewArtifacts.createSourceMatrixHandoffRouteCoverageArchiveSummary)
      .toBe(routeCoverageArtifacts.createSourceMatrixHandoffRouteCoverageArchiveSummary);
    expect(reviewArtifacts.createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt)
      .toBe(routeCoverageArtifacts.createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt);
    expect(reviewArtifacts.createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot)
      .toBe(routeCoverageArtifacts.createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot);
    expect(reviewArtifacts.createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification)
      .toBe(routeCoverageArtifacts.createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification);
  });
});
