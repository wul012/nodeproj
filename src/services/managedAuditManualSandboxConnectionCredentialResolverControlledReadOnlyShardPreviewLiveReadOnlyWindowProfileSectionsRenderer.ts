import { renderEntries, renderProfileEntrySections } from "./liveProbeReportUtils.js";
import { renderControlledReadOnlyShardPreviewCandidateDocumentProfileSections } from "./controlledReadOnlyShardPreviewCandidateDocumentProfileSectionRenderer.js";
import { renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSections } from "./controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSectionRenderer.js";
import { renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSections } from "./controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSectionRenderer.js";
import { renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftProfileSections } from "./controlledReadOnlyShardPreviewSignedApprovalArtifactDraftProfileSectionRenderer.js";
import { renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSections } from "./controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSectionRenderer.js";
import type { ControlledReadOnlyShardPreviewProfile } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

const WINDOW_SECTIONS = [
  gapMatrixSection,
  packetCandidateSection,
  packetVerificationSection,
  stageLedgerSection,
  runbookPackageSection,
  rehearsalPacketSection,
  commandWorksheetSection,
  evidencePacketSection,
  intakeLedgerSection,
  intakeReviewSection,
  evidenceWorksheetSection,
] as const;

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowSections(
  profile: ControlledReadOnlyShardPreviewProfile,
): string[] {
  return [
    ...renderProfileEntrySections(WINDOW_SECTIONS.map((buildSection) => buildSection(profile))),
    ...renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSections(profile),
    ...renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSections(profile),
    ...renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftProfileSections(profile),
    ...renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSections(profile),
    ...renderControlledReadOnlyShardPreviewCandidateDocumentProfileSections(profile),
  ];
}

function gapMatrixSection(profile: ControlledReadOnlyShardPreviewProfile) {
  return {
    heading: "Execution Gap Matrix",
    lines: renderEntries({
      matrixVersion: profile.preview.executionGapMatrix.matrixVersion,
      matrixState: profile.preview.executionGapMatrix.matrixState,
      readyForLiveReadOnlyPacketPlanning: profile.preview.executionGapMatrix.readyForLiveReadOnlyPacketPlanning,
      readyForLiveReadOnlyExecution: profile.preview.executionGapMatrix.readyForLiveReadOnlyExecution,
      readyForProductionExecution: profile.preview.executionGapMatrix.readyForProductionExecution,
      gateCount: profile.preview.executionGapMatrix.gateCount,
      actionRequiredGateCount: profile.preview.executionGapMatrix.actionRequiredGateCount,
      productionExecutionBlockerCount: profile.preview.executionGapMatrix.productionExecutionBlockerCount,
    }),
  };
}

function packetCandidateSection(profile: ControlledReadOnlyShardPreviewProfile) {
  return {
    heading: "Live Read-Only Packet Candidate",
    lines: renderEntries({
      candidateVersion: profile.preview.liveReadOnlyPacketCandidate.candidateVersion,
      candidateState: profile.preview.liveReadOnlyPacketCandidate.candidateState,
      readyForManualLiveReadOnlyWindow: profile.preview.liveReadOnlyPacketCandidate.readyForManualLiveReadOnlyWindow,
      processStepCount: profile.preview.liveReadOnlyPacketCandidate.processStepCount,
      readTargetCount: profile.preview.liveReadOnlyPacketCandidate.readTargetCount,
      candidateDigest: profile.preview.liveReadOnlyPacketCandidate.candidateDigest,
    }),
  };
}

function packetVerificationSection(profile: ControlledReadOnlyShardPreviewProfile) {
  return {
    heading: "Live Read-Only Packet Candidate Verification",
    lines: renderEntries({
      verificationVersion: profile.preview.liveReadOnlyPacketCandidateVerification.verificationVersion,
      verificationState: profile.preview.liveReadOnlyPacketCandidateVerification.verificationState,
      readyForManualLiveReadOnlyWindow: profile.preview.liveReadOnlyPacketCandidateVerification.readyForManualLiveReadOnlyWindow,
      passedGateCount: profile.preview.liveReadOnlyPacketCandidateVerification.passedGateCount,
      gateCount: profile.preview.liveReadOnlyPacketCandidateVerification.gateCount,
      nextAction: profile.preview.liveReadOnlyPacketCandidateVerification.nextAction,
    }),
  };
}

function stageLedgerSection(profile: ControlledReadOnlyShardPreviewProfile) {
  return {
    heading: "Live Read-Only Window Stage Ledger",
    lines: renderEntries({
      ledgerVersion: profile.preview.liveReadOnlyWindowStageLedger.ledgerVersion,
      ledgerState: profile.preview.liveReadOnlyWindowStageLedger.ledgerState,
      readyForManualLiveReadOnlyWindow: profile.preview.liveReadOnlyWindowStageLedger.readyForManualLiveReadOnlyWindow,
      stageCount: profile.preview.liveReadOnlyWindowStageLedger.stageCount,
      readyStageCount: profile.preview.liveReadOnlyWindowStageLedger.readyStageCount,
      cleanupRequiredStageCount: profile.preview.liveReadOnlyWindowStageLedger.cleanupRequiredStageCount,
      ledgerDigest: profile.preview.liveReadOnlyWindowStageLedger.ledgerDigest,
    }),
  };
}

function runbookPackageSection(profile: ControlledReadOnlyShardPreviewProfile) {
  return {
    heading: "Live Read-Only Window Runbook Package",
    lines: renderEntries({
      packageVersion: profile.preview.liveReadOnlyWindowRunbookPackage.packageVersion,
      packageState: profile.preview.liveReadOnlyWindowRunbookPackage.packageState,
      readyForOperatorLiveReadOnlyWindow: profile.preview.liveReadOnlyWindowRunbookPackage.readyForOperatorLiveReadOnlyWindow,
      sectionCount: profile.preview.liveReadOnlyWindowRunbookPackage.sectionCount,
      cleanupRequiredSectionCount: profile.preview.liveReadOnlyWindowRunbookPackage.cleanupRequiredSectionCount,
      packageDigest: profile.preview.liveReadOnlyWindowRunbookPackage.packageDigest,
    }),
  };
}

function rehearsalPacketSection(profile: ControlledReadOnlyShardPreviewProfile) {
  return {
    heading: "Live Read-Only Window Rehearsal Packet",
    lines: renderEntries({
      packetVersion: profile.preview.liveReadOnlyWindowRehearsalPacket.packetVersion,
      packetState: profile.preview.liveReadOnlyWindowRehearsalPacket.packetState,
      readyForManualLiveReadOnlyRehearsal: profile.preview.liveReadOnlyWindowRehearsalPacket.readyForManualLiveReadOnlyRehearsal,
      stepCount: profile.preview.liveReadOnlyWindowRehearsalPacket.stepCount,
      evidenceSlotCount: profile.preview.liveReadOnlyWindowRehearsalPacket.evidenceSlotCount,
      failureClassCount: profile.preview.liveReadOnlyWindowRehearsalPacket.failureClassCount,
      packetDigest: profile.preview.liveReadOnlyWindowRehearsalPacket.packetDigest,
    }),
  };
}

function commandWorksheetSection(profile: ControlledReadOnlyShardPreviewProfile) {
  return {
    heading: "Live Read-Only Window Command Worksheet",
    lines: renderEntries({
      worksheetVersion: profile.preview.liveReadOnlyWindowCommandWorksheet.worksheetVersion,
      worksheetState: profile.preview.liveReadOnlyWindowCommandWorksheet.worksheetState,
      readyForManualCommandReview: profile.preview.liveReadOnlyWindowCommandWorksheet.readyForManualCommandReview,
      stepCount: profile.preview.liveReadOnlyWindowCommandWorksheet.stepCount,
      commandTemplateCount: profile.preview.liveReadOnlyWindowCommandWorksheet.commandTemplateCount,
      targetCount: profile.preview.liveReadOnlyWindowCommandWorksheet.targetCount,
      evidenceSlotCount: profile.preview.liveReadOnlyWindowCommandWorksheet.evidenceSlotCount,
      cleanupSlotCount: profile.preview.liveReadOnlyWindowCommandWorksheet.cleanupSlotCount,
      containsSecretValue: profile.preview.liveReadOnlyWindowCommandWorksheet.containsSecretValue,
      worksheetDigest: profile.preview.liveReadOnlyWindowCommandWorksheet.worksheetDigest,
    }),
  };
}

function evidencePacketSection(profile: ControlledReadOnlyShardPreviewProfile) {
  return {
    heading: "Live Read-Only Window Evidence Packet",
    lines: renderEntries({
      evidencePacketVersion: profile.preview.liveReadOnlyWindowEvidencePacket.evidencePacketVersion,
      packetState: profile.preview.liveReadOnlyWindowEvidencePacket.packetState,
      readyForManualEvidenceCapture: profile.preview.liveReadOnlyWindowEvidencePacket.readyForManualEvidenceCapture,
      recordCount: profile.preview.liveReadOnlyWindowEvidencePacket.recordCount,
      commandEvidenceRecordCount: profile.preview.liveReadOnlyWindowEvidencePacket.commandEvidenceRecordCount,
      cleanupRecordCount: profile.preview.liveReadOnlyWindowEvidencePacket.cleanupRecordCount,
      targetCount: profile.preview.liveReadOnlyWindowEvidencePacket.targetCount,
      runtimePayloadCaptured: profile.preview.liveReadOnlyWindowEvidencePacket.runtimePayloadCaptured,
      containsSecretValue: profile.preview.liveReadOnlyWindowEvidencePacket.containsSecretValue,
      evidencePacketDigest: profile.preview.liveReadOnlyWindowEvidencePacket.evidencePacketDigest,
    }),
  };
}

function intakeLedgerSection(profile: ControlledReadOnlyShardPreviewProfile) {
  return {
    heading: "Live Read-Only Window Evidence Intake Ledger",
    lines: renderEntries({
      ledgerVersion: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.ledgerVersion,
      ledgerState: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.ledgerState,
      readyForManualEvidenceIntake: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.readyForManualEvidenceIntake,
      entryCount: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.entryCount,
      requiredFieldCount: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.requiredFieldCount,
      acceptanceCriterionCount: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.acceptanceCriterionCount,
      cleanupEntryCount: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.cleanupEntryCount,
      targetCount: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.targetCount,
      importsRuntimePayload: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.importsRuntimePayload,
      acceptsSyntheticEvidence: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.acceptsSyntheticEvidence,
      containsSecretValue: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.containsSecretValue,
      ledgerDigest: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.ledgerDigest,
    }),
  };
}

function intakeReviewSection(profile: ControlledReadOnlyShardPreviewProfile) {
  return {
    heading: "Live Read-Only Window Evidence Intake Review Package",
    lines: renderEntries({
      packageVersion: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.packageVersion,
      packageState: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.packageState,
      readyForOperatorIntakeReview: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.readyForOperatorIntakeReview,
      readyForManualEvidenceEntry: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.readyForManualEvidenceEntry,
      controlCount: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.controlCount,
      ledgerGateReviewControlCount: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.ledgerGateReviewControlCount,
      targetReviewControlCount: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.targetReviewControlCount,
      maintenanceReviewControlCount: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.maintenanceReviewControlCount,
      sourceLedgerEntryCoverageCount: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.sourceLedgerEntryCoverageCount,
      targetCount: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.targetCount,
      importsRuntimePayload: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.importsRuntimePayload,
      acceptsSyntheticEvidence: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.acceptsSyntheticEvidence,
      containsSecretValue: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.containsSecretValue,
      packageDigest: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.packageDigest,
    }),
  };
}

function evidenceWorksheetSection(profile: ControlledReadOnlyShardPreviewProfile) {
  return {
    heading: "Live Read-Only Window Manual Evidence Entry Worksheet",
    lines: renderEntries({
      worksheetVersion: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.worksheetVersion,
      worksheetState: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.worksheetState,
      readyForOperatorEntryWorksheet: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.readyForOperatorEntryWorksheet,
      readyForManualEvidenceEntry: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.readyForManualEvidenceEntry,
      slotCount: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.slotCount,
      ledgerCheckSlotCount: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.ledgerCheckSlotCount,
      targetEntrySlotCount: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.targetEntrySlotCount,
      policyArchiveSlotCount: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.policyArchiveSlotCount,
      maintenanceSlotCount: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.maintenanceSlotCount,
      closeoutSlotCount: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.closeoutSlotCount,
      scopeCount: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.scopeCount,
      worksheetFieldCount: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.worksheetFieldCount,
      importsRuntimePayload: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.importsRuntimePayload,
      acceptsSyntheticEvidence: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.acceptsSyntheticEvidence,
      containsSecretValue: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.containsSecretValue,
      worksheetDigest: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.worksheetDigest,
    }),
  };
}
