# v1529 code walkthrough

v1529 main renderer size reduction: main renderer drops from 1372 lines to about 758 lines after the split.

The changed renderer paths are `src/services/controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSectionRenderer.ts`, `src/services/controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageSubmissionProfileSectionRenderer.ts`, and `src/services/controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageComparedEvidenceProfileSectionRenderer.ts`. The main live-window profile sections renderer delegates the nine text package sections through the extracted boundary, and the type module catalog records that ownership at orders 211-213.

The verification focus for this step is route-output stability: headings, version markers, and fail-closed false values must remain visible after the split.
