import { renderEntries, renderProfileEntrySections } from "./liveProbeReportUtils.js";
import type { ControlledReadOnlyShardPreviewProfile } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export function renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyEnvelopeProfileSections(
  profile: ControlledReadOnlyShardPreviewProfile,
): string[] {
  return renderProfileEntrySections([
    {
      heading: "Live Read-Only Window Operator Evidence Fresh Sibling Intake",
      lines: renderEntries({
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
    },
    {
      heading: "Live Read-Only Window Operator Evidence Value Supply Envelope",
      lines: renderEntries({
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
    },
  ]);
}
