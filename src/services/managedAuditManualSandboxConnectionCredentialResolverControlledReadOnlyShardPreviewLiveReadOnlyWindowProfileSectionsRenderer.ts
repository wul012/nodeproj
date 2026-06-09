import { renderEntries } from "./liveProbeReportUtils.js";
import { renderControlledReadOnlyShardPreviewCandidateDocumentProfileSections } from "./controlledReadOnlyShardPreviewCandidateDocumentProfileSectionRenderer.js";
import { renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftProfileSections } from "./controlledReadOnlyShardPreviewSignedApprovalArtifactDraftProfileSectionRenderer.js";
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
    "## Live Read-Only Window Operator Evidence Value Supply Approval Packet Draft",
    ...renderEntries({
      approvalPacketDraftVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.approvalPacketDraftVersion,
      sourceValueSupplyEnvelopeVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.sourceValueSupplyEnvelopeVersion,
      javaValueSupplyEvidenceVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.javaValueSupplyEvidenceVersion,
      miniKvValueSupplyEvidenceVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.miniKvValueSupplyEvidenceVersion,
      draftState:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.draftState,
      readyForValueSupplyApprovalPacketDraft:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft
          .readyForValueSupplyApprovalPacketDraft,
      readyForOperatorValueSupply:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.readyForOperatorValueSupply,
      readyForOperatorValueSubmission:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft
          .readyForOperatorValueSubmission,
      readyForEvidenceImport:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.readyForEvidenceImport,
      readyForRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.readyForRuntimePayload,
      draftSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.draftSlotCount,
      javaEvidenceSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.javaEvidenceSlotCount,
      miniKvEvidenceSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.miniKvEvidenceSlotCount,
      nodeValueSupplyEnvelopeSlotCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.nodeValueSupplyEnvelopeSlotCount,
      presentFileCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.presentFileCount,
      matchedSnippetCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.matchedSnippetCount,
      historicalFixtureResolvedFileCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft
          .historicalFixtureResolvedFileCount,
      approvalFieldCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.approvalFieldCount,
      reviewRecordFieldCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.reviewRecordFieldCount,
      suppliedValueCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.suppliedValueCount,
      acceptedValueCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.acceptedValueCount,
      importedValueCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.importedValueCount,
      approvalCaptured:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.approvalCaptured,
      approvalGrantPresent:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.approvalGrantPresent,
      signedApprovalPresent:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.signedApprovalPresent,
      importsRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.importsRuntimePayload,
      acceptsSyntheticEvidence:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.acceptsSyntheticEvidence,
      containsSecretValue:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.containsSecretValue,
      approvalPacketDraftDigest:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft.approvalPacketDraftDigest,
    }),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Approval Packet Review",
    ...renderEntries({
      approvalPacketReviewVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.approvalPacketReviewVersion,
      sourceApprovalPacketDraftVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.sourceApprovalPacketDraftVersion,
      reviewPackageState:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.reviewPackageState,
      readyForValueSupplyApprovalPacketReview:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview
          .readyForValueSupplyApprovalPacketReview,
      readyForSignedApprovalCapture:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.readyForSignedApprovalCapture,
      readyForOperatorValueSupply:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.readyForOperatorValueSupply,
      readyForOperatorValueSubmission:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview
          .readyForOperatorValueSubmission,
      readyForEvidenceImport:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.readyForEvidenceImport,
      readyForRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.readyForRuntimePayload,
      reviewControlCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.reviewControlCount,
      approvalFieldReviewControlCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview
          .approvalFieldReviewControlCount,
      policyReviewControlCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.policyReviewControlCount,
      sourceEvidenceReviewControlCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview
          .sourceEvidenceReviewControlCount,
      executionLockReviewControlCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview
          .executionLockReviewControlCount,
      closeoutReviewControlCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.closeoutReviewControlCount,
      manualReviewRequiredControlCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview
          .manualReviewRequiredControlCount,
      autoApprovalBlockedControlCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview
          .autoApprovalBlockedControlCount,
      suppliedValueCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.suppliedValueCount,
      acceptedValueCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.acceptedValueCount,
      importedValueCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.importedValueCount,
      approvalCaptured:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.approvalCaptured,
      approvalGrantPresent:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.approvalGrantPresent,
      signedApprovalPresent:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.signedApprovalPresent,
      importsRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.importsRuntimePayload,
      acceptsSyntheticEvidence:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.acceptsSyntheticEvidence,
      containsSecretValue:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.containsSecretValue,
      approvalPacketReviewDigest:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview.approvalPacketReviewDigest,
    }),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Template",
    ...renderEntries({
      signedApprovalTemplateVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate
          .signedApprovalTemplateVersion,
      sourceApprovalPacketReviewVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate
          .sourceApprovalPacketReviewVersion,
      templateState:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.templateState,
      readyForSignedApprovalTemplatePreflight:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate
          .readyForSignedApprovalTemplatePreflight,
      readyForSignedApprovalCapture:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate
          .readyForSignedApprovalCapture,
      readyForOperatorValueSupply:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.readyForOperatorValueSupply,
      readyForOperatorValueSubmission:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate
          .readyForOperatorValueSubmission,
      readyForEvidenceImport:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.readyForEvidenceImport,
      readyForRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.readyForRuntimePayload,
      templateFieldCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.templateFieldCount,
      templateClauseCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.templateClauseCount,
      identityFieldCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.identityFieldCount,
      sourceEvidenceFieldCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.sourceEvidenceFieldCount,
      policyFieldCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.policyFieldCount,
      executionLockFieldCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.executionLockFieldCount,
      requiredFieldCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.requiredFieldCount,
      readyFieldCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.readyFieldCount,
      readyClauseCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.readyClauseCount,
      missingFieldBlockerCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.missingFieldBlockerCount,
      rejectionClauseCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.rejectionClauseCount,
      nonExecutionClauseCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.nonExecutionClauseCount,
      templateValueProvidedCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate
          .templateValueProvidedCount,
      approvalCaptured:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.approvalCaptured,
      approvalGrantPresent:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.approvalGrantPresent,
      signedApprovalPresent:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.signedApprovalPresent,
      importsRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.importsRuntimePayload,
      acceptsSyntheticEvidence:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.acceptsSyntheticEvidence,
      containsSecretValue:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate.containsSecretValue,
      signedApprovalTemplateDigest:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate
          .signedApprovalTemplateDigest,
    }),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Preflight",
    ...renderEntries({
      signedApprovalCapturePreflightVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .signedApprovalCapturePreflightVersion,
      sourceSignedApprovalTemplateVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .sourceSignedApprovalTemplateVersion,
      preflightState:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .preflightState,
      readyForSignedApprovalCapturePreflight:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .readyForSignedApprovalCapturePreflight,
      readyForSignedApprovalCapture:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .readyForSignedApprovalCapture,
      readyForOperatorValueSupply:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .readyForOperatorValueSupply,
      readyForOperatorValueSubmission:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .readyForOperatorValueSubmission,
      readyForEvidenceImport:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .readyForEvidenceImport,
      readyForRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .readyForRuntimePayload,
      captureInputCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .captureInputCount,
      captureAttestationCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .captureAttestationCount,
      identityInputCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .identityInputCount,
      digestBindingInputCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .digestBindingInputCount,
      sourceEvidenceInputCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .sourceEvidenceInputCount,
      valueBindingInputCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .valueBindingInputCount,
      executionLockInputCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .executionLockInputCount,
      readyInputCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .readyInputCount,
      readyAttestationCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .readyAttestationCount,
      missingInputBlockerCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .missingInputBlockerCount,
      noExecutionAttestationCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .noExecutionAttestationCount,
      captureValueProvidedCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .captureValueProvidedCount,
      rawSignatureMaterialCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .rawSignatureMaterialCount,
      approvalCaptured:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .approvalCaptured,
      approvalGrantPresent:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .approvalGrantPresent,
      signedApprovalPresent:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .signedApprovalPresent,
      importsRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .importsRuntimePayload,
      acceptsSyntheticEvidence:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .acceptsSyntheticEvidence,
      containsSecretValue:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .containsSecretValue,
      signedApprovalCapturePreflightDigest:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight
          .signedApprovalCapturePreflightDigest,
    }),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Preflight",
    ...renderEntries({
      signedApprovalCaptureArtifactPreflightVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .signedApprovalCaptureArtifactPreflightVersion,
      sourceSignedApprovalCapturePreflightVersion:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .sourceSignedApprovalCapturePreflightVersion,
      artifactPreflightState:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .artifactPreflightState,
      readyForSignedApprovalCaptureArtifactPreflight:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .readyForSignedApprovalCaptureArtifactPreflight,
      readyForSignedApprovalCapture:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .readyForSignedApprovalCapture,
      readyForOperatorValueSupply:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .readyForOperatorValueSupply,
      readyForOperatorValueSubmission:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .readyForOperatorValueSubmission,
      readyForEvidenceImport:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .readyForEvidenceImport,
      readyForRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .readyForRuntimePayload,
      artifactFragmentCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .artifactFragmentCount,
      artifactSealCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .artifactSealCount,
      identityFragmentCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .identityFragmentCount,
      digestBindingFragmentCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .digestBindingFragmentCount,
      signatureEnvelopeFragmentCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .signatureEnvelopeFragmentCount,
      sourceEvidenceFragmentCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .sourceEvidenceFragmentCount,
      valueBindingFragmentCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .valueBindingFragmentCount,
      policyFragmentCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .policyFragmentCount,
      executionLockFragmentCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .executionLockFragmentCount,
      closeoutFragmentCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .closeoutFragmentCount,
      requiredFragmentCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .requiredFragmentCount,
      readyFragmentCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .readyFragmentCount,
      readySealCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .readySealCount,
      artifactBlockerCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .artifactBlockerCount,
      noExecutionSealCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .noExecutionSealCount,
      gateCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .gateCount,
      passedGateCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .passedGateCount,
      artifactMaterializedCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .artifactMaterializedCount,
      rawSignatureMaterialCount:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .rawSignatureMaterialCount,
      approvalCaptured:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .approvalCaptured,
      approvalGrantPresent:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .approvalGrantPresent,
      signedApprovalPresent:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .signedApprovalPresent,
      sourceSignedApprovalCapturePreflightDigest:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .sourceSignedApprovalCapturePreflightDigest,
      sourceSignedApprovalTemplateDigest:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .sourceSignedApprovalTemplateDigest,
      sourceApprovalPacketReviewDigest:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .sourceApprovalPacketReviewDigest,
      importsRuntimePayload:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .importsRuntimePayload,
      acceptsSyntheticEvidence:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .acceptsSyntheticEvidence,
      containsSecretValue:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .containsSecretValue,
      signedApprovalCaptureArtifactPreflightDigest:
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight
          .signedApprovalCaptureArtifactPreflightDigest,
    }),
    "",
    ...renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftProfileSections(profile),
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Intake",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageIntakeProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Review Preflight",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Submission Preflight",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Comparison Preflight",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Comparison Acceptance Precheck",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Package Evidence Intake",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Evaluation Preflight",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Intake",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake,
    ),
    "",
    ...renderControlledReadOnlyShardPreviewCandidateDocumentProfileSections(profile),
  ];
}

function renderSignedApprovalCaptureArtifactDraftTextPackageIntakeProfileEntries(
  intake:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageIntakeVersion:
      intake.signedApprovalCaptureArtifactDraftTextPackageIntakeVersion,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightVersion:
      intake.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightVersion,
    artifactDraftTextPackageIntakeState: intake.artifactDraftTextPackageIntakeState,
    readyForSignedApprovalArtifactDraftTextPackageIntake:
      intake.readyForSignedApprovalArtifactDraftTextPackageIntake,
    readyForHumanSignedApprovalDraftTextPackageSubmission:
      intake.readyForHumanSignedApprovalDraftTextPackageSubmission,
    readyForHumanSignedApprovalDraftInstructionAuthoring:
      intake.readyForHumanSignedApprovalDraftInstructionAuthoring,
    readyForSignedApprovalArtifactDraft: intake.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: intake.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: intake.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: intake.readyForOperatorValueSubmission,
    readyForEvidenceImport: intake.readyForEvidenceImport,
    readyForRuntimePayload: intake.readyForRuntimePayload,
    intakeFieldCount: intake.intakeFieldCount,
    intakeGuardCount: intake.intakeGuardCount,
    identityIntakeFieldCount: intake.identityIntakeFieldCount,
    digestBindingIntakeFieldCount: intake.digestBindingIntakeFieldCount,
    signatureEnvelopeIntakeFieldCount: intake.signatureEnvelopeIntakeFieldCount,
    sourceEvidenceIntakeFieldCount: intake.sourceEvidenceIntakeFieldCount,
    valueBindingIntakeFieldCount: intake.valueBindingIntakeFieldCount,
    policyIntakeFieldCount: intake.policyIntakeFieldCount,
    executionLockIntakeFieldCount: intake.executionLockIntakeFieldCount,
    archiveCloseoutIntakeFieldCount: intake.archiveCloseoutIntakeFieldCount,
    digestModeIntakeFieldCount: intake.digestModeIntakeFieldCount,
    readyIntakeFieldCount: intake.readyIntakeFieldCount,
    readyIntakeGuardCount: intake.readyIntakeGuardCount,
    digestBindingIntakeGuardCount: intake.digestBindingIntakeGuardCount,
    signatureEnvelopeIntakeGuardCount: intake.signatureEnvelopeIntakeGuardCount,
    policyIntakeGuardCount: intake.policyIntakeGuardCount,
    executionLockIntakeGuardCount: intake.executionLockIntakeGuardCount,
    archiveCloseoutIntakeGuardCount: intake.archiveCloseoutIntakeGuardCount,
    expectedDraftTextPackageFieldCount: intake.expectedDraftTextPackageFieldCount,
    actualDraftTextPackageFieldCount: intake.actualDraftTextPackageFieldCount,
    acceptedDraftTextPackageCount: intake.acceptedDraftTextPackageCount,
    draftInstructionMaterializedCount: intake.draftInstructionMaterializedCount,
    draftArtifactCreated: intake.draftArtifactCreated,
    signedDraftTextCount: intake.signedDraftTextCount,
    draftSignaturePayloadCount: intake.draftSignaturePayloadCount,
    approvalCaptured: intake.approvalCaptured,
    approvalGrantPresent: intake.approvalGrantPresent,
    signedApprovalPresent: intake.signedApprovalPresent,
    gateCount: intake.gateCount,
    passedGateCount: intake.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest,
    importsRuntimePayload: intake.importsRuntimePayload,
    acceptsSyntheticEvidence: intake.acceptsSyntheticEvidence,
    containsSecretValue: intake.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageIntakeDigest:
      intake.signedApprovalCaptureArtifactDraftTextPackageIntakeDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightProfileEntries(
  preflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeVersion:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeVersion,
    artifactDraftTextPackageReviewPreflightState:
      preflight.artifactDraftTextPackageReviewPreflightState,
    readyForSignedApprovalArtifactDraftTextPackageReviewPreflight:
      preflight.readyForSignedApprovalArtifactDraftTextPackageReviewPreflight,
    readyForOfflineSignedApprovalDraftTextPackageReview:
      preflight.readyForOfflineSignedApprovalDraftTextPackageReview,
    readyForHumanSignedApprovalDraftTextPackageSubmission:
      preflight.readyForHumanSignedApprovalDraftTextPackageSubmission,
    readyForSignedApprovalArtifactDraft: preflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: preflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: preflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: preflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: preflight.readyForEvidenceImport,
    readyForRuntimePayload: preflight.readyForRuntimePayload,
    reviewCriterionCount: preflight.reviewCriterionCount,
    reviewControlCount: preflight.reviewControlCount,
    identityReviewCriterionCount: preflight.identityReviewCriterionCount,
    digestBindingReviewCriterionCount: preflight.digestBindingReviewCriterionCount,
    signatureEnvelopeReviewCriterionCount: preflight.signatureEnvelopeReviewCriterionCount,
    sourceEvidenceReviewCriterionCount: preflight.sourceEvidenceReviewCriterionCount,
    valueBindingReviewCriterionCount: preflight.valueBindingReviewCriterionCount,
    policyReviewCriterionCount: preflight.policyReviewCriterionCount,
    executionLockReviewCriterionCount: preflight.executionLockReviewCriterionCount,
    archiveCloseoutReviewCriterionCount: preflight.archiveCloseoutReviewCriterionCount,
    digestModeReviewCriterionCount: preflight.digestModeReviewCriterionCount,
    readyReviewCriterionCount: preflight.readyReviewCriterionCount,
    readyReviewControlCount: preflight.readyReviewControlCount,
    digestBindingReviewControlCount: preflight.digestBindingReviewControlCount,
    signatureEnvelopeReviewControlCount: preflight.signatureEnvelopeReviewControlCount,
    policyReviewControlCount: preflight.policyReviewControlCount,
    executionLockReviewControlCount: preflight.executionLockReviewControlCount,
    archiveCloseoutReviewControlCount: preflight.archiveCloseoutReviewControlCount,
    expectedDraftTextPackageFieldCount: preflight.expectedDraftTextPackageFieldCount,
    actualDraftTextPackageFieldCount: preflight.actualDraftTextPackageFieldCount,
    acceptedDraftTextPackageCount: preflight.acceptedDraftTextPackageCount,
    reviewedDraftTextPackageCount: preflight.reviewedDraftTextPackageCount,
    approvedDraftTextPackageCount: preflight.approvedDraftTextPackageCount,
    rejectedDraftTextPackageCount: preflight.rejectedDraftTextPackageCount,
    signedDraftTextCount: preflight.signedDraftTextCount,
    draftSignaturePayloadCount: preflight.draftSignaturePayloadCount,
    approvalCaptured: preflight.approvalCaptured,
    approvalGrantPresent: preflight.approvalGrantPresent,
    signedApprovalPresent: preflight.signedApprovalPresent,
    gateCount: preflight.gateCount,
    passedGateCount: preflight.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest,
    importsRuntimePayload: preflight.importsRuntimePayload,
    acceptsSyntheticEvidence: preflight.acceptsSyntheticEvidence,
    containsSecretValue: preflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightProfileEntries(
  preflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion,
    artifactDraftTextPackageSubmissionPreflightState:
      preflight.artifactDraftTextPackageSubmissionPreflightState,
    readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight:
      preflight.readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight,
    readyForManualSignedApprovalDraftTextPackageSubmission:
      preflight.readyForManualSignedApprovalDraftTextPackageSubmission,
    readyForOfflineSignedApprovalDraftTextPackageComparison:
      preflight.readyForOfflineSignedApprovalDraftTextPackageComparison,
    readyForOfflineSignedApprovalDraftTextPackageReview:
      preflight.readyForOfflineSignedApprovalDraftTextPackageReview,
    readyForSignedApprovalArtifactDraft: preflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: preflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: preflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: preflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: preflight.readyForEvidenceImport,
    readyForRuntimePayload: preflight.readyForRuntimePayload,
    submissionSlotCount: preflight.submissionSlotCount,
    comparisonControlCount: preflight.comparisonControlCount,
    identitySubmissionSlotCount: preflight.identitySubmissionSlotCount,
    digestBindingSubmissionSlotCount: preflight.digestBindingSubmissionSlotCount,
    signatureEnvelopeSubmissionSlotCount: preflight.signatureEnvelopeSubmissionSlotCount,
    sourceEvidenceSubmissionSlotCount: preflight.sourceEvidenceSubmissionSlotCount,
    valueBindingSubmissionSlotCount: preflight.valueBindingSubmissionSlotCount,
    policySubmissionSlotCount: preflight.policySubmissionSlotCount,
    executionLockSubmissionSlotCount: preflight.executionLockSubmissionSlotCount,
    archiveCloseoutSubmissionSlotCount: preflight.archiveCloseoutSubmissionSlotCount,
    digestModeSubmissionSlotCount: preflight.digestModeSubmissionSlotCount,
    readySubmissionSlotCount: preflight.readySubmissionSlotCount,
    readyComparisonControlCount: preflight.readyComparisonControlCount,
    digestBindingComparisonControlCount: preflight.digestBindingComparisonControlCount,
    signatureEnvelopeComparisonControlCount: preflight.signatureEnvelopeComparisonControlCount,
    policyComparisonControlCount: preflight.policyComparisonControlCount,
    executionLockComparisonControlCount: preflight.executionLockComparisonControlCount,
    archiveCloseoutComparisonControlCount: preflight.archiveCloseoutComparisonControlCount,
    expectedDraftTextPackageSubmissionSlotCount:
      preflight.expectedDraftTextPackageSubmissionSlotCount,
    actualDraftTextPackageSubmissionCount: preflight.actualDraftTextPackageSubmissionCount,
    submittedDraftTextPackageCount: preflight.submittedDraftTextPackageCount,
    comparedDraftTextPackageCount: preflight.comparedDraftTextPackageCount,
    acceptedDraftTextPackageCount: preflight.acceptedDraftTextPackageCount,
    rejectedDraftTextPackageCount: preflight.rejectedDraftTextPackageCount,
    signedDraftTextCount: preflight.signedDraftTextCount,
    draftSignaturePayloadCount: preflight.draftSignaturePayloadCount,
    approvalCaptured: preflight.approvalCaptured,
    approvalGrantPresent: preflight.approvalGrantPresent,
    signedApprovalPresent: preflight.signedApprovalPresent,
    gateCount: preflight.gateCount,
    passedGateCount: preflight.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest,
    importsRuntimePayload: preflight.importsRuntimePayload,
    acceptsSyntheticEvidence: preflight.acceptsSyntheticEvidence,
    containsSecretValue: preflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightProfileEntries(
  preflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion,
    artifactDraftTextPackageComparisonPreflightState:
      preflight.artifactDraftTextPackageComparisonPreflightState,
    readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight:
      preflight.readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight,
    readyForOfflineSignedApprovalDraftTextPackageComparison:
      preflight.readyForOfflineSignedApprovalDraftTextPackageComparison,
    readyForManualSignedApprovalDraftTextPackageSubmission:
      preflight.readyForManualSignedApprovalDraftTextPackageSubmission,
    readyForOfflineSignedApprovalDraftTextPackageReview:
      preflight.readyForOfflineSignedApprovalDraftTextPackageReview,
    readyForSignedApprovalArtifactDraft: preflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: preflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: preflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: preflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: preflight.readyForEvidenceImport,
    readyForRuntimePayload: preflight.readyForRuntimePayload,
    comparisonLaneCount: preflight.comparisonLaneCount,
    acceptanceControlCount: preflight.acceptanceControlCount,
    identityComparisonLaneCount: preflight.identityComparisonLaneCount,
    digestBindingComparisonLaneCount: preflight.digestBindingComparisonLaneCount,
    signatureEnvelopeComparisonLaneCount: preflight.signatureEnvelopeComparisonLaneCount,
    sourceEvidenceComparisonLaneCount: preflight.sourceEvidenceComparisonLaneCount,
    valueBindingComparisonLaneCount: preflight.valueBindingComparisonLaneCount,
    policyComparisonLaneCount: preflight.policyComparisonLaneCount,
    executionLockComparisonLaneCount: preflight.executionLockComparisonLaneCount,
    archiveCloseoutComparisonLaneCount: preflight.archiveCloseoutComparisonLaneCount,
    digestModeComparisonLaneCount: preflight.digestModeComparisonLaneCount,
    readyComparisonLaneCount: preflight.readyComparisonLaneCount,
    readyAcceptanceControlCount: preflight.readyAcceptanceControlCount,
    digestBindingAcceptanceControlCount: preflight.digestBindingAcceptanceControlCount,
    signatureEnvelopeAcceptanceControlCount: preflight.signatureEnvelopeAcceptanceControlCount,
    policyAcceptanceControlCount: preflight.policyAcceptanceControlCount,
    executionLockAcceptanceControlCount: preflight.executionLockAcceptanceControlCount,
    archiveCloseoutAcceptanceControlCount: preflight.archiveCloseoutAcceptanceControlCount,
    expectedDraftTextPackageComparisonLaneCount:
      preflight.expectedDraftTextPackageComparisonLaneCount,
    actualDraftTextPackageComparisonCount: preflight.actualDraftTextPackageComparisonCount,
    submittedDraftTextPackageCount: preflight.submittedDraftTextPackageCount,
    comparedDraftTextPackageCount: preflight.comparedDraftTextPackageCount,
    acceptedDraftTextPackageCount: preflight.acceptedDraftTextPackageCount,
    rejectedDraftTextPackageCount: preflight.rejectedDraftTextPackageCount,
    signedDraftTextCount: preflight.signedDraftTextCount,
    draftSignaturePayloadCount: preflight.draftSignaturePayloadCount,
    approvalCaptured: preflight.approvalCaptured,
    approvalGrantPresent: preflight.approvalGrantPresent,
    signedApprovalPresent: preflight.signedApprovalPresent,
    gateCount: preflight.gateCount,
    passedGateCount: preflight.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest,
    importsRuntimePayload: preflight.importsRuntimePayload,
    acceptsSyntheticEvidence: preflight.acceptsSyntheticEvidence,
    containsSecretValue: preflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckProfileEntries(
  precheck:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion:
      precheck.signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion:
      precheck.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion,
    artifactDraftTextPackageComparisonAcceptancePrecheckState:
      precheck.artifactDraftTextPackageComparisonAcceptancePrecheckState,
    readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck:
      precheck.readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck,
    readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck:
      precheck.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck,
    readyForOfflineSignedApprovalDraftTextPackageComparison:
      precheck.readyForOfflineSignedApprovalDraftTextPackageComparison,
    readyForManualSignedApprovalDraftTextPackageSubmission:
      precheck.readyForManualSignedApprovalDraftTextPackageSubmission,
    readyForSignedApprovalArtifactDraft: precheck.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: precheck.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: precheck.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: precheck.readyForOperatorValueSubmission,
    readyForEvidenceImport: precheck.readyForEvidenceImport,
    readyForRuntimePayload: precheck.readyForRuntimePayload,
    checkpointCount: precheck.checkpointCount,
    guardCount: precheck.guardCount,
    sourceComparisonLaneCount: precheck.sourceComparisonLaneCount,
    sourceAcceptanceControlCount: precheck.sourceAcceptanceControlCount,
    readyCheckpointCount: precheck.readyCheckpointCount,
    readyGuardCount: precheck.readyGuardCount,
    sourceReadinessCheckpointCount: precheck.sourceReadinessCheckpointCount,
    identityCheckpointCount: precheck.identityCheckpointCount,
    digestBindingCheckpointCount: precheck.digestBindingCheckpointCount,
    signatureEnvelopeCheckpointCount: precheck.signatureEnvelopeCheckpointCount,
    sourceEvidenceCheckpointCount: precheck.sourceEvidenceCheckpointCount,
    operatorValueCheckpointCount: precheck.operatorValueCheckpointCount,
    policyCheckpointCount: precheck.policyCheckpointCount,
    executionLockCheckpointCount: precheck.executionLockCheckpointCount,
    approvalGrantReviewCheckpointCount: precheck.approvalGrantReviewCheckpointCount,
    archiveCloseoutCheckpointCount: precheck.archiveCloseoutCheckpointCount,
    expectedDraftTextPackageAcceptanceCheckpointCount:
      precheck.expectedDraftTextPackageAcceptanceCheckpointCount,
    actualDraftTextPackageAcceptanceEvidenceCount:
      precheck.actualDraftTextPackageAcceptanceEvidenceCount,
    submittedDraftTextPackageCount: precheck.submittedDraftTextPackageCount,
    comparedDraftTextPackageCount: precheck.comparedDraftTextPackageCount,
    acceptedDraftTextPackageCount: precheck.acceptedDraftTextPackageCount,
    rejectedDraftTextPackageCount: precheck.rejectedDraftTextPackageCount,
    signedDraftTextCount: precheck.signedDraftTextCount,
    draftSignaturePayloadCount: precheck.draftSignaturePayloadCount,
    approvalCaptured: precheck.approvalCaptured,
    approvalGrantPresent: precheck.approvalGrantPresent,
    signedApprovalPresent: precheck.signedApprovalPresent,
    gateCount: precheck.gateCount,
    passedGateCount: precheck.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest:
      precheck.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest,
    importsRuntimePayload: precheck.importsRuntimePayload,
    acceptsSyntheticEvidence: precheck.acceptsSyntheticEvidence,
    containsSecretValue: precheck.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest:
      precheck.signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeProfileEntries(
  intake:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion,
    artifactDraftTextPackageComparedPackageEvidenceIntakeState:
      intake.artifactDraftTextPackageComparedPackageEvidenceIntakeState,
    readyForManualComparedPackageEvidenceIntakeContract:
      intake.readyForManualComparedPackageEvidenceIntakeContract,
    readyForRealComparedPackageEvidenceIntake:
      intake.readyForRealComparedPackageEvidenceIntake,
    readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck:
      intake.readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck,
    readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck:
      intake.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck,
    readyForSignedApprovalArtifactDraft: intake.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: intake.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: intake.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: intake.readyForOperatorValueSubmission,
    readyForEvidenceImport: intake.readyForEvidenceImport,
    readyForRuntimePayload: intake.readyForRuntimePayload,
    slotCount: intake.slotCount,
    guardCount: intake.guardCount,
    sourceAcceptanceCheckpointCount: intake.sourceAcceptanceCheckpointCount,
    sourceAcceptanceGuardCount: intake.sourceAcceptanceGuardCount,
    readySlotCount: intake.readySlotCount,
    readyGuardCount: intake.readyGuardCount,
    sourcePrecheckEvidenceSlotCount: intake.sourcePrecheckEvidenceSlotCount,
    manualSubmissionReferenceEvidenceSlotCount:
      intake.manualSubmissionReferenceEvidenceSlotCount,
    offlineComparisonResultEvidenceSlotCount:
      intake.offlineComparisonResultEvidenceSlotCount,
    identityBindingEvidenceSlotCount: intake.identityBindingEvidenceSlotCount,
    digestMatchSummaryEvidenceSlotCount: intake.digestMatchSummaryEvidenceSlotCount,
    signatureEnvelopeObservationEvidenceSlotCount:
      intake.signatureEnvelopeObservationEvidenceSlotCount,
    sourceEvidenceHandleEvidenceSlotCount: intake.sourceEvidenceHandleEvidenceSlotCount,
    policyExecutionLockEvidenceSlotCount: intake.policyExecutionLockEvidenceSlotCount,
    approvalGrantSeparationEvidenceSlotCount: intake.approvalGrantSeparationEvidenceSlotCount,
    archiveCloseoutEvidenceSlotCount: intake.archiveCloseoutEvidenceSlotCount,
    expectedRealComparedPackageEvidenceSlotCount:
      intake.expectedRealComparedPackageEvidenceSlotCount,
    realComparedPackageEvidenceCount: intake.realComparedPackageEvidenceCount,
    manualComparedPackageEvidenceMaterializedCount:
      intake.manualComparedPackageEvidenceMaterializedCount,
    syntheticComparedPackageEvidenceCount: intake.syntheticComparedPackageEvidenceCount,
    actualDraftTextPackageAcceptanceEvidenceCount:
      intake.actualDraftTextPackageAcceptanceEvidenceCount,
    submittedDraftTextPackageCount: intake.submittedDraftTextPackageCount,
    comparedDraftTextPackageCount: intake.comparedDraftTextPackageCount,
    acceptedDraftTextPackageCount: intake.acceptedDraftTextPackageCount,
    rejectedDraftTextPackageCount: intake.rejectedDraftTextPackageCount,
    signedDraftTextCount: intake.signedDraftTextCount,
    draftSignaturePayloadCount: intake.draftSignaturePayloadCount,
    approvalCaptured: intake.approvalCaptured,
    approvalGrantPresent: intake.approvalGrantPresent,
    signedApprovalPresent: intake.signedApprovalPresent,
    gateCount: intake.gateCount,
    passedGateCount: intake.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest,
    importsRuntimePayload: intake.importsRuntimePayload,
    acceptsSyntheticEvidence: intake.acceptsSyntheticEvidence,
    containsSecretValue: intake.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightProfileEntries(
  preflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion,
    artifactDraftTextPackageComparedEvidenceEvaluationPreflightState:
      preflight.artifactDraftTextPackageComparedEvidenceEvaluationPreflightState,
    readyForComparedEvidenceEvaluationPreflightContract:
      preflight.readyForComparedEvidenceEvaluationPreflightContract,
    readyForRealComparedPackageEvidenceEvaluation:
      preflight.readyForRealComparedPackageEvidenceEvaluation,
    readyForManualComparedPackageEvidenceIntakeContract:
      preflight.readyForManualComparedPackageEvidenceIntakeContract,
    readyForSignedApprovalArtifactDraft: preflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: preflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: preflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: preflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: preflight.readyForEvidenceImport,
    readyForRuntimePayload: preflight.readyForRuntimePayload,
    evaluationRuleCount: preflight.evaluationRuleCount,
    evaluationGuardCount: preflight.evaluationGuardCount,
    sourceIntakeSlotCount: preflight.sourceIntakeSlotCount,
    sourceIntakeGuardCount: preflight.sourceIntakeGuardCount,
    readyEvaluationRuleCount: preflight.readyEvaluationRuleCount,
    readyEvaluationGuardCount: preflight.readyEvaluationGuardCount,
    satisfiedEvaluationRuleCount: preflight.satisfiedEvaluationRuleCount,
    expectedRealComparedPackageEvidenceCandidateFieldCount:
      preflight.expectedRealComparedPackageEvidenceCandidateFieldCount,
    realComparedPackageEvidenceCandidateCount:
      preflight.realComparedPackageEvidenceCandidateCount,
    syntheticComparedPackageEvidenceCandidateCount:
      preflight.syntheticComparedPackageEvidenceCandidateCount,
    candidateMaterializedCount: preflight.candidateMaterializedCount,
    candidateAcceptedCount: preflight.candidateAcceptedCount,
    candidateRejectedCount: preflight.candidateRejectedCount,
    acceptedComparedPackageEvidenceCount: preflight.acceptedComparedPackageEvidenceCount,
    approvalGrantPresent: preflight.approvalGrantPresent,
    signedApprovalPresent: preflight.signedApprovalPresent,
    evaluationAllowed: preflight.evaluationAllowed,
    gateCount: preflight.gateCount,
    passedGateCount: preflight.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest,
    importsRuntimePayload: preflight.importsRuntimePayload,
    acceptsSyntheticEvidence: preflight.acceptsSyntheticEvidence,
    containsSecretValue: preflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateProfileEntries(
  candidate:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion:
      candidate.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion:
      candidate.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion,
    artifactDraftTextPackageComparedEvidenceCandidateState:
      candidate.artifactDraftTextPackageComparedEvidenceCandidateState,
    readyForComparedEvidenceCandidateBlueprintContract:
      candidate.readyForComparedEvidenceCandidateBlueprintContract,
    readyForRealComparedPackageEvidenceCandidateIntake:
      candidate.readyForRealComparedPackageEvidenceCandidateIntake,
    readyForComparedEvidenceEvaluationPreflightContract:
      candidate.readyForComparedEvidenceEvaluationPreflightContract,
    readyForRealComparedPackageEvidenceEvaluation:
      candidate.readyForRealComparedPackageEvidenceEvaluation,
    readyForEvidenceImport: candidate.readyForEvidenceImport,
    readyForRuntimePayload: candidate.readyForRuntimePayload,
    blueprintSectionCount: candidate.blueprintSectionCount,
    blueprintBlockerCount: candidate.blueprintBlockerCount,
    sourceEvaluationRuleCount: candidate.sourceEvaluationRuleCount,
    sourceEvaluationGuardCount: candidate.sourceEvaluationGuardCount,
    readyBlueprintSectionCount: candidate.readyBlueprintSectionCount,
    readyBlueprintBlockerCount: candidate.readyBlueprintBlockerCount,
    candidateFieldCount: candidate.candidateFieldCount,
    expectedCandidateFieldCountFromPreflight:
      candidate.expectedCandidateFieldCountFromPreflight,
    realComparedPackageEvidenceCandidateValueCount:
      candidate.realComparedPackageEvidenceCandidateValueCount,
    syntheticComparedPackageEvidenceCandidateValueCount:
      candidate.syntheticComparedPackageEvidenceCandidateValueCount,
    materializedComparedPackageEvidenceCandidateValueCount:
      candidate.materializedComparedPackageEvidenceCandidateValueCount,
    acceptedComparedPackageEvidenceCandidateValueCount:
      candidate.acceptedComparedPackageEvidenceCandidateValueCount,
    rejectedComparedPackageEvidenceCandidateValueCount:
      candidate.rejectedComparedPackageEvidenceCandidateValueCount,
    approvalGrantPresent: candidate.approvalGrantPresent,
    signedApprovalPresent: candidate.signedApprovalPresent,
    candidateBlueprintMaterializationAllowed:
      candidate.candidateBlueprintMaterializationAllowed,
    candidateEvaluationAllowed: candidate.candidateEvaluationAllowed,
    executionAllowed: candidate.executionAllowed,
    writeRoutingAllowed: candidate.writeRoutingAllowed,
    gateCount: candidate.gateCount,
    passedGateCount: candidate.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest:
      candidate.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest,
    importsRuntimePayload: candidate.importsRuntimePayload,
    acceptsSyntheticEvidence: candidate.acceptsSyntheticEvidence,
    containsSecretValue: candidate.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest:
      candidate.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeProfileEntries(
  intake:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion,
    artifactDraftTextPackageComparedEvidenceCandidateIntakeState:
      intake.artifactDraftTextPackageComparedEvidenceCandidateIntakeState,
    readyForComparedEvidenceCandidateIntakePreflightContract:
      intake.readyForComparedEvidenceCandidateIntakePreflightContract,
    readyForRealComparedPackageEvidenceCandidateDocumentIntake:
      intake.readyForRealComparedPackageEvidenceCandidateDocumentIntake,
    readyForComparedEvidenceCandidateBlueprintContract:
      intake.readyForComparedEvidenceCandidateBlueprintContract,
    readyForCandidatePayloadImport: intake.readyForCandidatePayloadImport,
    readyForCandidateEvaluation: intake.readyForCandidateEvaluation,
    readyForEvidenceImport: intake.readyForEvidenceImport,
    readyForRuntimePayload: intake.readyForRuntimePayload,
    intakeSlotCount: intake.intakeSlotCount,
    intakeGuardCount: intake.intakeGuardCount,
    sourceBlueprintSectionCount: intake.sourceBlueprintSectionCount,
    sourceBlueprintBlockerCount: intake.sourceBlueprintBlockerCount,
    readyIntakeSlotCount: intake.readyIntakeSlotCount,
    readyIntakeGuardCount: intake.readyIntakeGuardCount,
    requiredCandidateFieldCount: intake.requiredCandidateFieldCount,
    sourceCandidateFieldCount: intake.sourceCandidateFieldCount,
    realCandidateDocumentCount: intake.realCandidateDocumentCount,
    syntheticCandidateDocumentCount: intake.syntheticCandidateDocumentCount,
    stagedCandidateDocumentCount: intake.stagedCandidateDocumentCount,
    importedCandidatePayloadCount: intake.importedCandidatePayloadCount,
    evaluatedCandidatePayloadCount: intake.evaluatedCandidatePayloadCount,
    acceptedCandidatePayloadCount: intake.acceptedCandidatePayloadCount,
    rejectedCandidatePayloadCount: intake.rejectedCandidatePayloadCount,
    approvalGrantPresent: intake.approvalGrantPresent,
    signedApprovalPresent: intake.signedApprovalPresent,
    candidateDocumentIntakeAllowed: intake.candidateDocumentIntakeAllowed,
    candidatePayloadImportAllowed: intake.candidatePayloadImportAllowed,
    candidateEvaluationAllowed: intake.candidateEvaluationAllowed,
    executionAllowed: intake.executionAllowed,
    writeRoutingAllowed: intake.writeRoutingAllowed,
    gateCount: intake.gateCount,
    passedGateCount: intake.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest,
    importsRuntimePayload: intake.importsRuntimePayload,
    acceptsSyntheticEvidence: intake.acceptsSyntheticEvidence,
    containsSecretValue: intake.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeDigest:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeDigest,
  });
}
