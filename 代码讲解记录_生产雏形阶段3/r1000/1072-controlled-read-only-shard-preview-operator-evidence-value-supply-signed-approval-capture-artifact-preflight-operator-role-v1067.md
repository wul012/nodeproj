# Code walkthrough: Node v1067 signed approval capture artifact preflight operator role artifact fragment

## Files

- Artifact preflight types define the public state, fragment, seal, and gate contract for v1062-v1086.
- Artifact preflight fragment and seal catalogs keep the 25-version surface declarative and out of validator code.
- Artifact preflight builder maps v1061 capture preflight inputs into artifact fragments and maps those fragments into seals.
- Artifact preflight validator checks fragment completeness, seal completeness, source digest presence, no materialization, no grant, no runtime payload, no writes, and no sibling mutation.
- Artifact preflight artifacts compute counts, blocker summaries, and the stable artifact preflight digest.
- Artifact preflight renderer and profile sections expose the details for archive review and HTTP Markdown review.

## Behavior

Node v1067 contributes operator role artifact fragment. The code keeps readyForSignedApprovalCapture=false, readyForOperatorValueSupply=false, readyForEvidenceImport=false, readyForRuntimePayload=false, and executionAllowed=false.

## Version-Specific Mapping

- Fragment: `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_OPERATOR_ROLE`.
- Seal: `ARTIFACT_PREFLIGHT_OPERATOR_ROLE_SEAL`.
- Source capture input: `SIGNED_APPROVAL_CAPTURE_PREFLIGHT_OPERATOR_ROLE`.
- Required capture field: `operatorRole`.
- Blocker: `ARTIFACT_PREFLIGHT_OPERATOR_ROLE_MISSING`.
- Purpose: operator role fragment required before artifact draft.

## Maintenance Boundary

Do not merge this artifact preflight layer into the capture preflight input files. Capture inputs describe what a later artifact must source; artifact fragments and seals describe how the future artifact draft is rejected until every required fragment is present and still read-only.
