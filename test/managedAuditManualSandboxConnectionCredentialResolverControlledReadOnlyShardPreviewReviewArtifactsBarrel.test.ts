import { describe, expect, it } from "vitest";

import * as archiveHandoffArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewArchiveHandoffArtifacts.js";
import * as handoffArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.js";
import * as consumptionPlanArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlanArtifacts.js";
import * as reviewArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.js";
import * as reviewDecisionArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewDecisionArtifacts.js";
import * as routeCoverageArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArtifacts.js";
import * as sourceMatrixFlowArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixFlowArtifacts.js";
import * as typeModuleCatalog
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.js";
import * as typeModuleCatalogRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogRenderer.js";
import * as executionReadinessArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.js";
import * as executionReadinessRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessRenderer.js";
import * as stageLedgerArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerArtifacts.js";
import * as stageLedgerRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerRenderer.js";
import * as runbookArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookArtifacts.js";
import * as runbookRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookRenderer.js";
import * as rehearsalArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalArtifacts.js";
import * as rehearsalRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalRenderer.js";
import * as commandWorksheetArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetArtifacts.js";
import * as commandWorksheetRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetRenderer.js";

describe("controlled read-only shard preview review artifact barrel", () => {
  it("re-exports source matrix flow and consumption plan builders", () => {
    expect(reviewArtifacts.createSourceMatrixConsumptionPlan)
      .toBe(consumptionPlanArtifacts.createSourceMatrixConsumptionPlan);
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

  it("re-exports type module catalog helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewTypeModuleCatalog)
      .toBe(typeModuleCatalog.createControlledReadOnlyShardPreviewTypeModuleCatalog);
    expect(reviewArtifacts.listControlledReadOnlyShardPreviewTypeModules)
      .toBe(typeModuleCatalog.listControlledReadOnlyShardPreviewTypeModules);
    expect(reviewArtifacts.validateControlledReadOnlyShardPreviewTypeModuleCatalog)
      .toBe(typeModuleCatalog.validateControlledReadOnlyShardPreviewTypeModuleCatalog);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewTypeModuleCatalogMarkdown)
      .toBe(typeModuleCatalogRenderer.renderControlledReadOnlyShardPreviewTypeModuleCatalogMarkdown);
  });

  it("re-exports execution readiness helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewExecutionGapMatrix)
      .toBe(executionReadinessArtifacts.createControlledReadOnlyShardPreviewExecutionGapMatrix);
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate)
      .toBe(executionReadinessArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate);
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification)
      .toBe(executionReadinessArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewExecutionGapMatrixMarkdown)
      .toBe(executionReadinessRenderer.renderControlledReadOnlyShardPreviewExecutionGapMatrixMarkdown);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateMarkdown)
      .toBe(executionReadinessRenderer.renderControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateMarkdown);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerificationMarkdown)
      .toBe(executionReadinessRenderer
        .renderControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerificationMarkdown);
  });

  it("re-exports live read-only window stage ledger helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger)
      .toBe(stageLedgerArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerMarkdown)
      .toBe(stageLedgerRenderer.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerMarkdown);
  });

  it("re-exports live read-only window runbook package helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage)
      .toBe(runbookArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackageMarkdown)
      .toBe(runbookRenderer.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackageMarkdown);
  });

  it("re-exports live read-only window rehearsal packet helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket)
      .toBe(rehearsalArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacketMarkdown)
      .toBe(rehearsalRenderer.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacketMarkdown);
  });

  it("re-exports live read-only window command worksheet helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet)
      .toBe(commandWorksheetArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetMarkdown)
      .toBe(commandWorksheetRenderer.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetMarkdown);
  });
});
