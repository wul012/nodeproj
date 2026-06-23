import { renderEntries, renderProfileEntrySections } from "./liveProbeReportUtils.js";
import type { ControlledReadOnlyShardPreviewProfile } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export function renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyImportProfileSections(
  profile: ControlledReadOnlyShardPreviewProfile,
): string[] {
  return renderProfileEntrySections([
    {
      heading: "Live Read-Only Window Operator Evidence Import Preflight",
      lines: renderEntries({
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
    },
    {
      heading: "Live Read-Only Window Operator Evidence Value Draft",
      lines: renderEntries({
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
    },
  ]);
}
