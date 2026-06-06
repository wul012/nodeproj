import { renderEntries } from "./liveProbeReportUtils.js";
import type { ControlledReadOnlyShardPreviewProfile } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowSections(
  profile: ControlledReadOnlyShardPreviewProfile,
): string[] {
  return [
    "## Execution Gap Matrix",
    ...renderEntries({
      matrixVersion: profile.preview.executionGapMatrix.matrixVersion,
      matrixState: profile.preview.executionGapMatrix.matrixState,
      readyForLiveReadOnlyPacketPlanning:
        profile.preview.executionGapMatrix.readyForLiveReadOnlyPacketPlanning,
      readyForLiveReadOnlyExecution: profile.preview.executionGapMatrix.readyForLiveReadOnlyExecution,
      readyForProductionExecution: profile.preview.executionGapMatrix.readyForProductionExecution,
      gateCount: profile.preview.executionGapMatrix.gateCount,
      actionRequiredGateCount: profile.preview.executionGapMatrix.actionRequiredGateCount,
      productionExecutionBlockerCount: profile.preview.executionGapMatrix.productionExecutionBlockerCount,
    }),
    "",
    "## Live Read-Only Packet Candidate",
    ...renderEntries({
      candidateVersion: profile.preview.liveReadOnlyPacketCandidate.candidateVersion,
      candidateState: profile.preview.liveReadOnlyPacketCandidate.candidateState,
      readyForManualLiveReadOnlyWindow:
        profile.preview.liveReadOnlyPacketCandidate.readyForManualLiveReadOnlyWindow,
      processStepCount: profile.preview.liveReadOnlyPacketCandidate.processStepCount,
      readTargetCount: profile.preview.liveReadOnlyPacketCandidate.readTargetCount,
      candidateDigest: profile.preview.liveReadOnlyPacketCandidate.candidateDigest,
    }),
    "",
    "## Live Read-Only Packet Candidate Verification",
    ...renderEntries({
      verificationVersion: profile.preview.liveReadOnlyPacketCandidateVerification.verificationVersion,
      verificationState: profile.preview.liveReadOnlyPacketCandidateVerification.verificationState,
      readyForManualLiveReadOnlyWindow:
        profile.preview.liveReadOnlyPacketCandidateVerification.readyForManualLiveReadOnlyWindow,
      passedGateCount: profile.preview.liveReadOnlyPacketCandidateVerification.passedGateCount,
      gateCount: profile.preview.liveReadOnlyPacketCandidateVerification.gateCount,
      nextAction: profile.preview.liveReadOnlyPacketCandidateVerification.nextAction,
    }),
    "",
    "## Live Read-Only Window Stage Ledger",
    ...renderEntries({
      ledgerVersion: profile.preview.liveReadOnlyWindowStageLedger.ledgerVersion,
      ledgerState: profile.preview.liveReadOnlyWindowStageLedger.ledgerState,
      readyForManualLiveReadOnlyWindow:
        profile.preview.liveReadOnlyWindowStageLedger.readyForManualLiveReadOnlyWindow,
      stageCount: profile.preview.liveReadOnlyWindowStageLedger.stageCount,
      readyStageCount: profile.preview.liveReadOnlyWindowStageLedger.readyStageCount,
      cleanupRequiredStageCount: profile.preview.liveReadOnlyWindowStageLedger.cleanupRequiredStageCount,
      ledgerDigest: profile.preview.liveReadOnlyWindowStageLedger.ledgerDigest,
    }),
    "",
    "## Live Read-Only Window Runbook Package",
    ...renderEntries({
      packageVersion: profile.preview.liveReadOnlyWindowRunbookPackage.packageVersion,
      packageState: profile.preview.liveReadOnlyWindowRunbookPackage.packageState,
      readyForOperatorLiveReadOnlyWindow:
        profile.preview.liveReadOnlyWindowRunbookPackage.readyForOperatorLiveReadOnlyWindow,
      sectionCount: profile.preview.liveReadOnlyWindowRunbookPackage.sectionCount,
      cleanupRequiredSectionCount:
        profile.preview.liveReadOnlyWindowRunbookPackage.cleanupRequiredSectionCount,
      packageDigest: profile.preview.liveReadOnlyWindowRunbookPackage.packageDigest,
    }),
    "",
    "## Live Read-Only Window Rehearsal Packet",
    ...renderEntries({
      packetVersion: profile.preview.liveReadOnlyWindowRehearsalPacket.packetVersion,
      packetState: profile.preview.liveReadOnlyWindowRehearsalPacket.packetState,
      readyForManualLiveReadOnlyRehearsal:
        profile.preview.liveReadOnlyWindowRehearsalPacket.readyForManualLiveReadOnlyRehearsal,
      stepCount: profile.preview.liveReadOnlyWindowRehearsalPacket.stepCount,
      evidenceSlotCount: profile.preview.liveReadOnlyWindowRehearsalPacket.evidenceSlotCount,
      failureClassCount: profile.preview.liveReadOnlyWindowRehearsalPacket.failureClassCount,
      packetDigest: profile.preview.liveReadOnlyWindowRehearsalPacket.packetDigest,
    }),
    "",
    "## Live Read-Only Window Command Worksheet",
    ...renderEntries({
      worksheetVersion: profile.preview.liveReadOnlyWindowCommandWorksheet.worksheetVersion,
      worksheetState: profile.preview.liveReadOnlyWindowCommandWorksheet.worksheetState,
      readyForManualCommandReview:
        profile.preview.liveReadOnlyWindowCommandWorksheet.readyForManualCommandReview,
      stepCount: profile.preview.liveReadOnlyWindowCommandWorksheet.stepCount,
      commandTemplateCount: profile.preview.liveReadOnlyWindowCommandWorksheet.commandTemplateCount,
      targetCount: profile.preview.liveReadOnlyWindowCommandWorksheet.targetCount,
      evidenceSlotCount: profile.preview.liveReadOnlyWindowCommandWorksheet.evidenceSlotCount,
      cleanupSlotCount: profile.preview.liveReadOnlyWindowCommandWorksheet.cleanupSlotCount,
      containsSecretValue: profile.preview.liveReadOnlyWindowCommandWorksheet.containsSecretValue,
      worksheetDigest: profile.preview.liveReadOnlyWindowCommandWorksheet.worksheetDigest,
    }),
    "",
    "## Live Read-Only Window Evidence Packet",
    ...renderEntries({
      evidencePacketVersion: profile.preview.liveReadOnlyWindowEvidencePacket.evidencePacketVersion,
      packetState: profile.preview.liveReadOnlyWindowEvidencePacket.packetState,
      readyForManualEvidenceCapture:
        profile.preview.liveReadOnlyWindowEvidencePacket.readyForManualEvidenceCapture,
      recordCount: profile.preview.liveReadOnlyWindowEvidencePacket.recordCount,
      commandEvidenceRecordCount:
        profile.preview.liveReadOnlyWindowEvidencePacket.commandEvidenceRecordCount,
      cleanupRecordCount: profile.preview.liveReadOnlyWindowEvidencePacket.cleanupRecordCount,
      targetCount: profile.preview.liveReadOnlyWindowEvidencePacket.targetCount,
      runtimePayloadCaptured: profile.preview.liveReadOnlyWindowEvidencePacket.runtimePayloadCaptured,
      containsSecretValue: profile.preview.liveReadOnlyWindowEvidencePacket.containsSecretValue,
      evidencePacketDigest: profile.preview.liveReadOnlyWindowEvidencePacket.evidencePacketDigest,
    }),
    "",
    "## Live Read-Only Window Evidence Intake Ledger",
    ...renderEntries({
      ledgerVersion: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.ledgerVersion,
      ledgerState: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.ledgerState,
      readyForManualEvidenceIntake:
        profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.readyForManualEvidenceIntake,
      entryCount: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.entryCount,
      requiredFieldCount: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.requiredFieldCount,
      acceptanceCriterionCount:
        profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.acceptanceCriterionCount,
      cleanupEntryCount: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.cleanupEntryCount,
      targetCount: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.targetCount,
      importsRuntimePayload: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.importsRuntimePayload,
      acceptsSyntheticEvidence:
        profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.acceptsSyntheticEvidence,
      containsSecretValue: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.containsSecretValue,
      ledgerDigest: profile.preview.liveReadOnlyWindowEvidenceIntakeLedger.ledgerDigest,
    }),
    "",
    "## Live Read-Only Window Evidence Intake Review Package",
    ...renderEntries({
      packageVersion: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.packageVersion,
      packageState: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.packageState,
      readyForOperatorIntakeReview:
        profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.readyForOperatorIntakeReview,
      readyForManualEvidenceEntry:
        profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.readyForManualEvidenceEntry,
      controlCount: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.controlCount,
      ledgerGateReviewControlCount:
        profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.ledgerGateReviewControlCount,
      targetReviewControlCount:
        profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.targetReviewControlCount,
      maintenanceReviewControlCount:
        profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.maintenanceReviewControlCount,
      sourceLedgerEntryCoverageCount:
        profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.sourceLedgerEntryCoverageCount,
      targetCount: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.targetCount,
      importsRuntimePayload: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.importsRuntimePayload,
      acceptsSyntheticEvidence:
        profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.acceptsSyntheticEvidence,
      containsSecretValue: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.containsSecretValue,
      packageDigest: profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage.packageDigest,
    }),
    "",
    "## Live Read-Only Window Manual Evidence Entry Worksheet",
    ...renderEntries({
      worksheetVersion: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.worksheetVersion,
      worksheetState: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.worksheetState,
      readyForOperatorEntryWorksheet:
        profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.readyForOperatorEntryWorksheet,
      readyForManualEvidenceEntry:
        profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.readyForManualEvidenceEntry,
      slotCount: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.slotCount,
      ledgerCheckSlotCount:
        profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.ledgerCheckSlotCount,
      targetEntrySlotCount:
        profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.targetEntrySlotCount,
      policyArchiveSlotCount:
        profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.policyArchiveSlotCount,
      maintenanceSlotCount:
        profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.maintenanceSlotCount,
      closeoutSlotCount: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.closeoutSlotCount,
      scopeCount: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.scopeCount,
      worksheetFieldCount: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.worksheetFieldCount,
      importsRuntimePayload: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.importsRuntimePayload,
      acceptsSyntheticEvidence:
        profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.acceptsSyntheticEvidence,
      containsSecretValue: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.containsSecretValue,
      worksheetDigest: profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet.worksheetDigest,
    }),
    "",
    "## Live Read-Only Window Operator Evidence Import Preflight",
    ...renderEntries({
      preflightVersion: profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.preflightVersion,
      preflightState: profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.preflightState,
      readyForOperatorEvidenceImportPreflight:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.readyForOperatorEvidenceImportPreflight,
      readyForManualEvidenceEntry:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.readyForManualEvidenceEntry,
      readyForEvidenceImport:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.readyForEvidenceImport,
      preflightSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.preflightSlotCount,
      ledgerImportPreflightSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.ledgerImportPreflightSlotCount,
      targetImportPreflightSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.targetImportPreflightSlotCount,
      policyArchiveImportPreflightSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.policyArchiveImportPreflightSlotCount,
      maintenanceImportPreflightSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.maintenanceImportPreflightSlotCount,
      closeoutImportPreflightSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.closeoutImportPreflightSlotCount,
      scopeCount: profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.scopeCount,
      importFieldCount: profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.importFieldCount,
      importsRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.importsRuntimePayload,
      acceptsSyntheticEvidence:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.acceptsSyntheticEvidence,
      containsSecretValue:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.containsSecretValue,
      importPreflightDigest:
        profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight.importPreflightDigest,
    }),
    "",
    "## Live Read-Only Window Operator Evidence Value Draft",
    ...renderEntries({
      valueDraftVersion: profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.valueDraftVersion,
      sourceImportPreflightVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.sourceImportPreflightVersion,
      valueDraftState: profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.valueDraftState,
      readyForOperatorEvidenceValueDraft:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.readyForOperatorEvidenceValueDraft,
      readyForManualEvidenceEntry:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.readyForManualEvidenceEntry,
      readyForEvidenceImport: profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.readyForEvidenceImport,
      valueDraftSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.valueDraftSlotCount,
      ledgerValueDraftSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.ledgerValueDraftSlotCount,
      targetValueDraftSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.targetValueDraftSlotCount,
      policyArchiveValueDraftSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.policyArchiveValueDraftSlotCount,
      maintenanceValueDraftSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.maintenanceValueDraftSlotCount,
      closeoutValueDraftSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.closeoutValueDraftSlotCount,
      scopeCount: profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.scopeCount,
      draftFieldCount: profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.draftFieldCount,
      importsRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.importsRuntimePayload,
      acceptsSyntheticEvidence:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.acceptsSyntheticEvidence,
      containsSecretValue:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.containsSecretValue,
      valueDraftDigest:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft.valueDraftDigest,
    }),
    "",
    "## Live Read-Only Window Operator Evidence Fresh Sibling Intake",
    ...renderEntries({
      freshSiblingIntakeVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.freshSiblingIntakeVersion,
      sourceValueDraftVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.sourceValueDraftVersion,
      javaEvidenceVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.javaEvidenceVersion,
      miniKvEvidenceVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.miniKvEvidenceVersion,
      intakeState: profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.intakeState,
      readyForFreshSiblingEvidenceIntake:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.readyForFreshSiblingEvidenceIntake,
      readyForOperatorValueSupply:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.readyForOperatorValueSupply,
      readyForEvidenceImport:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.readyForEvidenceImport,
      intakeSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.intakeSlotCount,
      javaEvidenceSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.javaEvidenceSlotCount,
      miniKvEvidenceSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.miniKvEvidenceSlotCount,
      nodeValueDraftAlignmentSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.nodeValueDraftAlignmentSlotCount,
      fileCount: profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.fileCount,
      presentFileCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.presentFileCount,
      snippetCount: profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.snippetCount,
      matchedSnippetCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.matchedSnippetCount,
      historicalFixtureResolvedFileCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.historicalFixtureResolvedFileCount,
      importsRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.importsRuntimePayload,
      acceptsSyntheticEvidence:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.acceptsSyntheticEvidence,
      containsSecretValue:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.containsSecretValue,
      freshSiblingIntakeDigest:
        profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake.freshSiblingIntakeDigest,
    }),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Envelope",
    ...renderEntries({
      valueSupplyEnvelopeVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.valueSupplyEnvelopeVersion,
      sourceFreshSiblingIntakeVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.sourceFreshSiblingIntakeVersion,
      javaValueDraftEvidenceVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.javaValueDraftEvidenceVersion,
      javaValueDraftResponseVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.javaValueDraftResponseVersion,
      miniKvValueDraftEvidenceVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.miniKvValueDraftEvidenceVersion,
      envelopeState: profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.envelopeState,
      readyForValueSupplyEnvelopeReview:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.readyForValueSupplyEnvelopeReview,
      readyForOperatorValueSupply:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.readyForOperatorValueSupply,
      readyForEvidenceImport:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.readyForEvidenceImport,
      envelopeSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.envelopeSlotCount,
      javaEvidenceSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.javaEvidenceSlotCount,
      miniKvEvidenceSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.miniKvEvidenceSlotCount,
      nodeFreshSiblingIntakeSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.nodeFreshSiblingIntakeSlotCount,
      presentFileCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.presentFileCount,
      matchedSnippetCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.matchedSnippetCount,
      historicalFixtureResolvedFileCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.historicalFixtureResolvedFileCount,
      suppliedValueCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.suppliedValueCount,
      acceptedValueCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.acceptedValueCount,
      importedValueCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.importedValueCount,
      importsRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.importsRuntimePayload,
      acceptsSyntheticEvidence:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.acceptsSyntheticEvidence,
      containsSecretValue:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.containsSecretValue,
      valueSupplyEnvelopeDigest:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope.valueSupplyEnvelopeDigest,
    }),
    "",
  ];
}
