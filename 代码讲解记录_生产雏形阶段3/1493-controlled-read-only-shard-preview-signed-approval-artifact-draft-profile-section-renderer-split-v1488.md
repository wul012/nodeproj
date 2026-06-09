# v1488 code walkthrough

v1488 instruction preflight migration: keeps `signedApprovalCaptureArtifactDraftInstructionPreflightVersion` fixed at `Node v1211` and preserves operator instruction draft status.

The changed renderer path is `src/services/controlledReadOnlyShardPreviewSignedApprovalArtifactDraftProfileSectionRenderer.ts`. The main live-window profile sections renderer now delegates the five Signed Approval Capture Artifact Draft sections through the extracted boundary, and the type module catalog records that ownership at order 210.

The verification focus for this step is route-output stability: headings, version markers, and fail-closed false values must remain visible after the split.
