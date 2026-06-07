# Code walkthrough: Node v1105 signed approval capture artifact draft preflight provenance policy draft field

## Files

- Artifact draft preflight types define the public state, field, guard, and gate contract for v1087-v1111.
- Artifact draft preflight field and guard catalogs keep the 25-version surface declarative and out of validator code.
- Artifact draft preflight builder maps v1086 artifact fragments into draft fields and maps those fields into guards.
- Artifact draft preflight validator checks field completeness, guard completeness, source digest presence, no draft materialization, no signature payload, no grant, no runtime payload, no writes, and no sibling mutation.
- Artifact draft preflight artifacts compute counts, blocker summaries, and the stable artifact draft preflight digest.
- Artifact draft preflight renderer and profile sections expose the details for archive review and HTTP Markdown review.

## Behavior

Node v1105 contributes provenance policy draft field. The code keeps readyForSignedApprovalArtifactDraft=false, readyForSignedApprovalCapture=false, readyForOperatorValueSupply=false, readyForEvidenceImport=false, readyForRuntimePayload=false, and executionAllowed=false.

## Version-Specific Mapping

- Field: `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_PROVENANCE_POLICY`.
- Guard: `ARTIFACT_DRAFT_PREFLIGHT_PROVENANCE_POLICY_GUARD`.
- Source artifact fragment: `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_PROVENANCE_POLICY`.
- Required artifact fragment: `provenancePolicy`.
- Blocker: `ARTIFACT_DRAFT_PREFLIGHT_PROVENANCE_POLICY_MISSING`.
- Purpose: provenance policy field.

## Maintenance Boundary

Do not merge this artifact draft preflight layer into the artifact preflight fragment files. Artifact fragments describe what a later draft must source; draft fields and guards describe how a future manual draft is rejected until every required field is present and still read-only.
