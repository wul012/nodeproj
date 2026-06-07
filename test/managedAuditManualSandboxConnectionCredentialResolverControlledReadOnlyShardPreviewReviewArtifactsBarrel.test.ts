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
import * as evidencePacketArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketArtifacts.js";
import * as evidencePacketRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketRenderer.js";
import * as evidenceIntakeLedgerArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerArtifacts.js";
import * as evidenceIntakeLedgerRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerRenderer.js";
import * as evidenceIntakeReviewPackageArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageArtifacts.js";
import * as evidenceIntakeReviewPackageRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageRenderer.js";
import * as manualEvidenceEntryWorksheetArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetArtifacts.js";
import * as manualEvidenceEntryWorksheetRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetRenderer.js";
import * as operatorEvidenceImportPreflightArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightArtifacts.js";
import * as operatorEvidenceImportPreflightRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightRenderer.js";
import * as operatorEvidenceValueDraftArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftArtifacts.js";
import * as operatorEvidenceValueDraftRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftRenderer.js";
import * as operatorEvidenceFreshSiblingIntakeArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeArtifacts.js";
import * as operatorEvidenceFreshSiblingIntakeRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeRenderer.js";
import * as operatorEvidenceValueSupplyEnvelopeArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeArtifacts.js";
import * as operatorEvidenceValueSupplyEnvelopeRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeRenderer.js";
import * as operatorEvidenceValueSupplyApprovalPacketDraftArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftArtifacts.js";
import * as operatorEvidenceValueSupplyApprovalPacketDraftRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftRenderer.js";
import * as operatorEvidenceValueSupplyApprovalPacketReviewArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewArtifacts.js";
import * as operatorEvidenceValueSupplyApprovalPacketReviewRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewRenderer.js";
import * as operatorEvidenceValueSupplySignedApprovalTemplateArtifacts
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateArtifacts.js";
import * as operatorEvidenceValueSupplySignedApprovalTemplateRenderer
  from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateRenderer.js";

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

  it("re-exports live read-only window evidence packet helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket)
      .toBe(evidencePacketArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketMarkdown)
      .toBe(evidencePacketRenderer.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketMarkdown);
  });

  it("re-exports live read-only window evidence intake ledger helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger)
      .toBe(evidenceIntakeLedgerArtifacts
        .createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerMarkdown)
      .toBe(evidenceIntakeLedgerRenderer
        .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerMarkdown);
  });

  it("re-exports live read-only window evidence intake review package helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage)
      .toBe(evidenceIntakeReviewPackageArtifacts
        .createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageMarkdown)
      .toBe(evidenceIntakeReviewPackageRenderer
        .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageMarkdown);
  });

  it("re-exports live read-only window manual evidence entry worksheet helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet)
      .toBe(manualEvidenceEntryWorksheetArtifacts
        .createControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetMarkdown)
      .toBe(manualEvidenceEntryWorksheetRenderer
        .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetMarkdown);
  });

  it("re-exports live read-only window operator evidence import preflight helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight)
      .toBe(operatorEvidenceImportPreflightArtifacts
        .createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightMarkdown)
      .toBe(operatorEvidenceImportPreflightRenderer
        .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightMarkdown);
  });

  it("re-exports live read-only window operator evidence value draft helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft)
      .toBe(operatorEvidenceValueDraftArtifacts
        .createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft);
    expect(reviewArtifacts.renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftMarkdown)
      .toBe(operatorEvidenceValueDraftRenderer
        .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftMarkdown);
  });

  it("re-exports live read-only window operator evidence fresh sibling intake helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake)
      .toBe(operatorEvidenceFreshSiblingIntakeArtifacts
        .createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake);
    expect(reviewArtifacts
      .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeMarkdown)
      .toBe(operatorEvidenceFreshSiblingIntakeRenderer
        .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeMarkdown);
  });

  it("re-exports live read-only window operator evidence value supply envelope helpers", () => {
    expect(reviewArtifacts.createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope)
      .toBe(operatorEvidenceValueSupplyEnvelopeArtifacts
        .createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope);
    expect(reviewArtifacts
      .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeMarkdown)
      .toBe(operatorEvidenceValueSupplyEnvelopeRenderer
        .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeMarkdown);
  });

  it("re-exports live read-only window operator evidence value supply approval packet draft helpers", () => {
    expect(reviewArtifacts
      .createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft)
      .toBe(operatorEvidenceValueSupplyApprovalPacketDraftArtifacts
        .createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft);
    expect(reviewArtifacts
      .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftMarkdown)
      .toBe(operatorEvidenceValueSupplyApprovalPacketDraftRenderer
        .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftMarkdown);
  });

  it("re-exports live read-only window operator evidence value supply approval packet review helpers", () => {
    expect(reviewArtifacts
      .createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview)
      .toBe(operatorEvidenceValueSupplyApprovalPacketReviewArtifacts
        .createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview);
    expect(reviewArtifacts
      .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewMarkdown)
      .toBe(operatorEvidenceValueSupplyApprovalPacketReviewRenderer
        .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewMarkdown);
  });

  it("re-exports live read-only window operator evidence value supply signed approval template helpers", () => {
    expect(reviewArtifacts
      .createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate)
      .toBe(operatorEvidenceValueSupplySignedApprovalTemplateArtifacts
        .createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate);
    expect(reviewArtifacts
      .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateMarkdown)
      .toBe(operatorEvidenceValueSupplySignedApprovalTemplateRenderer
        .renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateMarkdown);
  });
});
