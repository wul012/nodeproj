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
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Preflight",
    ...renderSignedApprovalCaptureArtifactDraftPreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Readiness",
    ...renderSignedApprovalCaptureArtifactDraftReadinessProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Review Package Preflight",
    ...renderSignedApprovalCaptureArtifactDraftReviewPackagePreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Authoring Readiness",
    ...renderSignedApprovalCaptureArtifactDraftAuthoringReadinessProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Instruction Preflight",
    ...renderSignedApprovalCaptureArtifactDraftInstructionPreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
    ),
    "",
  ];
}

function renderSignedApprovalCaptureArtifactDraftPreflightProfileEntries(
  draftPreflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftPreflightVersion:
      draftPreflight.signedApprovalCaptureArtifactDraftPreflightVersion,
    sourceSignedApprovalCaptureArtifactPreflightVersion:
      draftPreflight.sourceSignedApprovalCaptureArtifactPreflightVersion,
    artifactDraftPreflightState: draftPreflight.artifactDraftPreflightState,
    readyForSignedApprovalArtifactDraftPreflight:
      draftPreflight.readyForSignedApprovalArtifactDraftPreflight,
    readyForSignedApprovalArtifactDraft: draftPreflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: draftPreflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: draftPreflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: draftPreflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: draftPreflight.readyForEvidenceImport,
    readyForRuntimePayload: draftPreflight.readyForRuntimePayload,
    draftFieldCount: draftPreflight.draftFieldCount,
    draftGuardCount: draftPreflight.draftGuardCount,
    identityDraftFieldCount: draftPreflight.identityDraftFieldCount,
    digestBindingDraftFieldCount: draftPreflight.digestBindingDraftFieldCount,
    signatureEnvelopeDraftFieldCount: draftPreflight.signatureEnvelopeDraftFieldCount,
    sourceEvidenceDraftFieldCount: draftPreflight.sourceEvidenceDraftFieldCount,
    valueBindingDraftFieldCount: draftPreflight.valueBindingDraftFieldCount,
    policyDraftFieldCount: draftPreflight.policyDraftFieldCount,
    executionLockDraftFieldCount: draftPreflight.executionLockDraftFieldCount,
    closeoutDraftFieldCount: draftPreflight.closeoutDraftFieldCount,
    requiredDraftFieldCount: draftPreflight.requiredDraftFieldCount,
    readyDraftFieldCount: draftPreflight.readyDraftFieldCount,
    readyDraftGuardCount: draftPreflight.readyDraftGuardCount,
    draftBlockerCount: draftPreflight.draftBlockerCount,
    noExecutionGuardCount: draftPreflight.noExecutionGuardCount,
    gateCount: draftPreflight.gateCount,
    passedGateCount: draftPreflight.passedGateCount,
    draftArtifactCreated: draftPreflight.draftArtifactCreated,
    draftArtifactMaterializedCount: draftPreflight.draftArtifactMaterializedCount,
    draftSignaturePayloadCount: draftPreflight.draftSignaturePayloadCount,
    approvalCaptured: draftPreflight.approvalCaptured,
    approvalGrantPresent: draftPreflight.approvalGrantPresent,
    signedApprovalPresent: draftPreflight.signedApprovalPresent,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      draftPreflight.sourceSignedApprovalCaptureArtifactPreflightDigest,
    importsRuntimePayload: draftPreflight.importsRuntimePayload,
    acceptsSyntheticEvidence: draftPreflight.acceptsSyntheticEvidence,
    containsSecretValue: draftPreflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftPreflightDigest:
      draftPreflight.signedApprovalCaptureArtifactDraftPreflightDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftReadinessProfileEntries(
  readiness:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftReadinessVersion:
      readiness.signedApprovalCaptureArtifactDraftReadinessVersion,
    sourceSignedApprovalCaptureArtifactDraftPreflightVersion:
      readiness.sourceSignedApprovalCaptureArtifactDraftPreflightVersion,
    artifactDraftReadinessState: readiness.artifactDraftReadinessState,
    readyForSignedApprovalArtifactDraftReadiness:
      readiness.readyForSignedApprovalArtifactDraftReadiness,
    readyForManualSignedApprovalDraftReview: readiness.readyForManualSignedApprovalDraftReview,
    readyForSignedApprovalArtifactDraft: readiness.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: readiness.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: readiness.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: readiness.readyForOperatorValueSubmission,
    readyForEvidenceImport: readiness.readyForEvidenceImport,
    readyForRuntimePayload: readiness.readyForRuntimePayload,
    readinessLaneCount: readiness.readinessLaneCount,
    readinessControlCount: readiness.readinessControlCount,
    identityReadinessLaneCount: readiness.identityReadinessLaneCount,
    digestBindingReadinessLaneCount: readiness.digestBindingReadinessLaneCount,
    signatureEnvelopeReadinessLaneCount: readiness.signatureEnvelopeReadinessLaneCount,
    sourceEvidenceReadinessLaneCount: readiness.sourceEvidenceReadinessLaneCount,
    valueBindingReadinessLaneCount: readiness.valueBindingReadinessLaneCount,
    policyReadinessLaneCount: readiness.policyReadinessLaneCount,
    executionLockReadinessLaneCount: readiness.executionLockReadinessLaneCount,
    archiveCloseoutReadinessLaneCount: readiness.archiveCloseoutReadinessLaneCount,
    readyReadinessLaneCount: readiness.readyReadinessLaneCount,
    readyReadinessControlCount: readiness.readyReadinessControlCount,
    digestBindingReadinessControlCount: readiness.digestBindingReadinessControlCount,
    signatureEnvelopeReadinessControlCount: readiness.signatureEnvelopeReadinessControlCount,
    policyReadinessControlCount: readiness.policyReadinessControlCount,
    executionLockReadinessControlCount: readiness.executionLockReadinessControlCount,
    archiveCloseoutReadinessControlCount: readiness.archiveCloseoutReadinessControlCount,
    manualDraftMaterializedCount: readiness.manualDraftMaterializedCount,
    draftArtifactCreated: readiness.draftArtifactCreated,
    draftArtifactMaterializedCount: readiness.draftArtifactMaterializedCount,
    draftSignaturePayloadCount: readiness.draftSignaturePayloadCount,
    approvalCaptured: readiness.approvalCaptured,
    approvalGrantPresent: readiness.approvalGrantPresent,
    signedApprovalPresent: readiness.signedApprovalPresent,
    gateCount: readiness.gateCount,
    passedGateCount: readiness.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      readiness.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    importsRuntimePayload: readiness.importsRuntimePayload,
    acceptsSyntheticEvidence: readiness.acceptsSyntheticEvidence,
    containsSecretValue: readiness.containsSecretValue,
    signedApprovalCaptureArtifactDraftReadinessDigest:
      readiness.signedApprovalCaptureArtifactDraftReadinessDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftReviewPackagePreflightProfileEntries(
  preflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftReadinessVersion:
      preflight.sourceSignedApprovalCaptureArtifactDraftReadinessVersion,
    artifactDraftReviewPackagePreflightState:
      preflight.artifactDraftReviewPackagePreflightState,
    readyForSignedApprovalArtifactDraftReviewPackagePreflight:
      preflight.readyForSignedApprovalArtifactDraftReviewPackagePreflight,
    readyForManualSignedApprovalDraftReviewPackage:
      preflight.readyForManualSignedApprovalDraftReviewPackage,
    readyForManualSignedApprovalDraftReview:
      preflight.readyForManualSignedApprovalDraftReview,
    readyForSignedApprovalArtifactDraft: preflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: preflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: preflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: preflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: preflight.readyForEvidenceImport,
    readyForRuntimePayload: preflight.readyForRuntimePayload,
    packageSlotCount: preflight.packageSlotCount,
    packageGuardCount: preflight.packageGuardCount,
    identityReviewPackageSlotCount: preflight.identityReviewPackageSlotCount,
    digestBindingReviewPackageSlotCount: preflight.digestBindingReviewPackageSlotCount,
    signatureEnvelopeReviewPackageSlotCount: preflight.signatureEnvelopeReviewPackageSlotCount,
    sourceEvidenceReviewPackageSlotCount: preflight.sourceEvidenceReviewPackageSlotCount,
    valueBindingReviewPackageSlotCount: preflight.valueBindingReviewPackageSlotCount,
    policyReviewPackageSlotCount: preflight.policyReviewPackageSlotCount,
    executionLockReviewPackageSlotCount: preflight.executionLockReviewPackageSlotCount,
    archiveCloseoutReviewPackageSlotCount: preflight.archiveCloseoutReviewPackageSlotCount,
    digestModeReviewPackageSlotCount: preflight.digestModeReviewPackageSlotCount,
    readyPackageSlotCount: preflight.readyPackageSlotCount,
    readyPackageGuardCount: preflight.readyPackageGuardCount,
    digestBindingReviewPackageGuardCount: preflight.digestBindingReviewPackageGuardCount,
    signatureEnvelopeReviewPackageGuardCount: preflight.signatureEnvelopeReviewPackageGuardCount,
    policyReviewPackageGuardCount: preflight.policyReviewPackageGuardCount,
    executionLockReviewPackageGuardCount: preflight.executionLockReviewPackageGuardCount,
    archiveCloseoutReviewPackageGuardCount: preflight.archiveCloseoutReviewPackageGuardCount,
    packageSlotMaterializedCount: preflight.packageSlotMaterializedCount,
    packageArtifactCreated: preflight.packageArtifactCreated,
    signedDraftTextCount: preflight.signedDraftTextCount,
    draftSignaturePayloadCount: preflight.draftSignaturePayloadCount,
    approvalCaptured: preflight.approvalCaptured,
    approvalGrantPresent: preflight.approvalGrantPresent,
    signedApprovalPresent: preflight.signedApprovalPresent,
    gateCount: preflight.gateCount,
    passedGateCount: preflight.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    importsRuntimePayload: preflight.importsRuntimePayload,
    acceptsSyntheticEvidence: preflight.acceptsSyntheticEvidence,
    containsSecretValue: preflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftAuthoringReadinessProfileEntries(
  readiness:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftAuthoringReadinessVersion:
      readiness.signedApprovalCaptureArtifactDraftAuthoringReadinessVersion,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion:
      readiness.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion,
    artifactDraftAuthoringReadinessState: readiness.artifactDraftAuthoringReadinessState,
    readyForSignedApprovalArtifactDraftAuthoringReadiness:
      readiness.readyForSignedApprovalArtifactDraftAuthoringReadiness,
    readyForHumanSignedApprovalDraftArtifactAuthoring:
      readiness.readyForHumanSignedApprovalDraftArtifactAuthoring,
    readyForManualSignedApprovalDraftReviewPackage:
      readiness.readyForManualSignedApprovalDraftReviewPackage,
    readyForSignedApprovalArtifactDraft: readiness.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: readiness.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: readiness.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: readiness.readyForOperatorValueSubmission,
    readyForEvidenceImport: readiness.readyForEvidenceImport,
    readyForRuntimePayload: readiness.readyForRuntimePayload,
    authoringRequirementCount: readiness.authoringRequirementCount,
    authoringBlockerCount: readiness.authoringBlockerCount,
    identityAuthoringRequirementCount: readiness.identityAuthoringRequirementCount,
    digestBindingAuthoringRequirementCount: readiness.digestBindingAuthoringRequirementCount,
    signatureEnvelopeAuthoringRequirementCount: readiness.signatureEnvelopeAuthoringRequirementCount,
    sourceEvidenceAuthoringRequirementCount: readiness.sourceEvidenceAuthoringRequirementCount,
    valueBindingAuthoringRequirementCount: readiness.valueBindingAuthoringRequirementCount,
    policyAuthoringRequirementCount: readiness.policyAuthoringRequirementCount,
    executionLockAuthoringRequirementCount: readiness.executionLockAuthoringRequirementCount,
    archiveCloseoutAuthoringRequirementCount: readiness.archiveCloseoutAuthoringRequirementCount,
    digestModeAuthoringRequirementCount: readiness.digestModeAuthoringRequirementCount,
    readyAuthoringRequirementCount: readiness.readyAuthoringRequirementCount,
    readyAuthoringBlockerCount: readiness.readyAuthoringBlockerCount,
    digestBindingAuthoringBlockerCount: readiness.digestBindingAuthoringBlockerCount,
    signatureEnvelopeAuthoringBlockerCount: readiness.signatureEnvelopeAuthoringBlockerCount,
    policyAuthoringBlockerCount: readiness.policyAuthoringBlockerCount,
    executionLockAuthoringBlockerCount: readiness.executionLockAuthoringBlockerCount,
    archiveCloseoutAuthoringBlockerCount: readiness.archiveCloseoutAuthoringBlockerCount,
    authoringInstructionMaterializedCount: readiness.authoringInstructionMaterializedCount,
    draftArtifactCreated: readiness.draftArtifactCreated,
    signedDraftTextCount: readiness.signedDraftTextCount,
    draftSignaturePayloadCount: readiness.draftSignaturePayloadCount,
    approvalCaptured: readiness.approvalCaptured,
    approvalGrantPresent: readiness.approvalGrantPresent,
    signedApprovalPresent: readiness.signedApprovalPresent,
    gateCount: readiness.gateCount,
    passedGateCount: readiness.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      readiness.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    importsRuntimePayload: readiness.importsRuntimePayload,
    acceptsSyntheticEvidence: readiness.acceptsSyntheticEvidence,
    containsSecretValue: readiness.containsSecretValue,
    signedApprovalCaptureArtifactDraftAuthoringReadinessDigest:
      readiness.signedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftInstructionPreflightProfileEntries(
  preflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftInstructionPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftInstructionPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessVersion:
      preflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessVersion,
    artifactDraftInstructionPreflightState: preflight.artifactDraftInstructionPreflightState,
    readyForSignedApprovalArtifactDraftInstructionPreflight:
      preflight.readyForSignedApprovalArtifactDraftInstructionPreflight,
    readyForHumanSignedApprovalDraftInstructionAuthoring:
      preflight.readyForHumanSignedApprovalDraftInstructionAuthoring,
    readyForHumanSignedApprovalDraftArtifactAuthoring:
      preflight.readyForHumanSignedApprovalDraftArtifactAuthoring,
    readyForSignedApprovalArtifactDraft: preflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: preflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: preflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: preflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: preflight.readyForEvidenceImport,
    readyForRuntimePayload: preflight.readyForRuntimePayload,
    instructionSlotCount: preflight.instructionSlotCount,
    instructionGuardCount: preflight.instructionGuardCount,
    identityInstructionSlotCount: preflight.identityInstructionSlotCount,
    digestBindingInstructionSlotCount: preflight.digestBindingInstructionSlotCount,
    signatureEnvelopeInstructionSlotCount: preflight.signatureEnvelopeInstructionSlotCount,
    sourceEvidenceInstructionSlotCount: preflight.sourceEvidenceInstructionSlotCount,
    valueBindingInstructionSlotCount: preflight.valueBindingInstructionSlotCount,
    policyInstructionSlotCount: preflight.policyInstructionSlotCount,
    executionLockInstructionSlotCount: preflight.executionLockInstructionSlotCount,
    archiveCloseoutInstructionSlotCount: preflight.archiveCloseoutInstructionSlotCount,
    digestModeInstructionSlotCount: preflight.digestModeInstructionSlotCount,
    readyInstructionSlotCount: preflight.readyInstructionSlotCount,
    readyInstructionGuardCount: preflight.readyInstructionGuardCount,
    digestBindingInstructionGuardCount: preflight.digestBindingInstructionGuardCount,
    signatureEnvelopeInstructionGuardCount: preflight.signatureEnvelopeInstructionGuardCount,
    policyInstructionGuardCount: preflight.policyInstructionGuardCount,
    executionLockInstructionGuardCount: preflight.executionLockInstructionGuardCount,
    archiveCloseoutInstructionGuardCount: preflight.archiveCloseoutInstructionGuardCount,
    draftInstructionMaterializedCount: preflight.draftInstructionMaterializedCount,
    draftArtifactCreated: preflight.draftArtifactCreated,
    signedDraftTextCount: preflight.signedDraftTextCount,
    draftSignaturePayloadCount: preflight.draftSignaturePayloadCount,
    approvalCaptured: preflight.approvalCaptured,
    approvalGrantPresent: preflight.approvalGrantPresent,
    signedApprovalPresent: preflight.signedApprovalPresent,
    gateCount: preflight.gateCount,
    passedGateCount: preflight.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    importsRuntimePayload: preflight.importsRuntimePayload,
    acceptsSyntheticEvidence: preflight.acceptsSyntheticEvidence,
    containsSecretValue: preflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftInstructionPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftInstructionPreflightDigest,
  });
}
