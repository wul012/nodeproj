# v1525 code walkthrough

v1525 catalog compared evidence entry: catalog order 213 owns compared package evidence and candidate section field renderers.

The changed renderer paths are `src/services/controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSectionRenderer.ts`, `src/services/controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageSubmissionProfileSectionRenderer.ts`, and `src/services/controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageComparedEvidenceProfileSectionRenderer.ts`. The main live-window profile sections renderer delegates the nine text package sections through the extracted boundary, and the type module catalog records that ownership at orders 211-213.

The verification focus for this step is route-output stability: headings, version markers, and fail-closed false values must remain visible after the split.
