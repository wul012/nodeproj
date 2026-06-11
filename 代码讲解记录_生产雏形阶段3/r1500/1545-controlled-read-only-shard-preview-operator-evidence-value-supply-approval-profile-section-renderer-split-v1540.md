# v1540 code walkthrough

v1540 signed approval template lock: focused coverage protects signed approval template output after moving the section.

The changed renderer paths are `src/services/controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSectionRenderer.ts`, `src/services/controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalPacketProfileSectionRenderer.ts`, and `src/services/controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureProfileSectionRenderer.ts`. The main live-window profile sections renderer delegates the five approval/capture sections through the extracted boundary, and the type module catalog records that ownership at orders 214-216.

The verification focus for this step is route-output stability: headings, version markers, and fail-closed false values must remain visible after the split.
