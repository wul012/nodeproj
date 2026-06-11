# Code walkthrough 1131: Node v1126 source evidence snippet review lane

This walkthrough explains how Node v1126 participates in the signed approval artifact draft readiness package. The implementation is intentionally split so the long governance chain stays maintainable instead of turning the profile service into one giant file.

## Source Files

- `...ArtifactDraftReadinessTypes.ts` defines the lane/control/gate contract exposed through the stable profile types barrel.
- `...ArtifactDraftReadinessLaneCatalog.ts` owns the 25 lane templates and their source v1111 draft field bindings.
- `...ArtifactDraftReadinessControlCatalog.ts` owns the 25 control templates and blocker codes.
- `...ArtifactDraftReadinessBuilder.ts` maps v1111 fields and guards to lane/control records.
- `...ArtifactDraftReadinessValidator.ts` evaluates the 45 readiness gates and produces blocked reason codes.
- `...ArtifactDraftReadinessArtifacts.ts` assembles counts, digest, state, and no-side-effect flags.
- `...ArtifactDraftReadinessRenderer.ts` renders lane/control details for archive review.

## Version-Specific Path

- v1126 lane: `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_SOURCE_SNIPPET_REVIEW`.
- Source field checked by builder: `sourceEvidenceSnippetId`.
- Blocker emitted by control catalog: `REJECT_DRAFT_READINESS_SOURCE_SNIPPET_UNREVIEWED`.
- The lane is not ready if the v1111 source field is missing, if the paired guard is not ready, if the source field already materialized a draft, or if the required source field name does not match.
- The control is not ready unless it is tied to a ready lane and keeps auto materialization, signed approval capture, runtime payloads, writes, and sibling mutation blocked.

## Route And Profile Surface

- The main preview service creates `liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness` immediately after the v1111 artifact draft preflight object.
- The profile section renderer exposes the aggregate readiness state, lane/control counts, digest, and zero materialization counts.
- The route test checks the markdown section title plus key readiness counts and false execution flags.

## Test Strategy

- Focused readiness test checks all 25 node versions in order.
- Blocked source test proves fail-closed behavior when v1111 is not ready.
- Renderer test proves detailed markdown includes lane/control details.
- Profile test proves the route-facing object is assembled by the service.
- Forced fallback test proves CI can use frozen historical source evidence.

## Why This Is A Real Slice

This version adds a concrete lane/control pair to a validated package, not just a tag. It contributes to counts, digest input, gate evaluation, markdown output, public type ownership, and focused test coverage.

## Non-Execution Boundary

The code deliberately leaves `readyForSignedApprovalArtifactDraft`, `readyForSignedApprovalCapture`, `readyForEvidenceImport`, `readyForRuntimePayload`, `executionAllowed`, and `writeRoutingAllowed` false. That keeps the package as readiness evidence for a future manual artifact package, not a hidden approval mechanism.
