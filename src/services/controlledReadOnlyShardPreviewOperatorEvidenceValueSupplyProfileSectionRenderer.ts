import { renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyEnvelopeProfileSections } from "./controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyEnvelopeProfileSectionRenderer.js";
import { renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyImportProfileSections } from "./controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyImportProfileSectionRenderer.js";
import type { ControlledReadOnlyShardPreviewProfile } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export function renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSections(
  profile: ControlledReadOnlyShardPreviewProfile,
): string[] {
  return [
    ...renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyImportProfileSections(profile),
    ...renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyEnvelopeProfileSections(profile),
  ];
}
