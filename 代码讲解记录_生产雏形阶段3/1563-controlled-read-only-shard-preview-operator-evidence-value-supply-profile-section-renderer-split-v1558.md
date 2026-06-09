# v1558 code walkthrough

v1558 value supply boundary selection: identifies the four value supply sections still owned by the main live-window renderer.

The changed renderer paths are `src/services/controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSectionRenderer.ts`, `src/services/controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyImportProfileSectionRenderer.ts`, and `src/services/controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyEnvelopeProfileSectionRenderer.ts`. The main live-window profile sections renderer delegates the four value supply sections through the extracted boundary, and the type module catalog records that ownership at orders 217-219.

The verification focus for this step is route-output stability: headings, version markers, and fail-closed false values must remain visible after the split.
