# Code walkthrough - Node v1948

## Focus

Keep the entrypoint compact.

## Code reading notes

- `loadDeploymentEvidenceIntakeGate` composes upstream summary, policy outputs, evidence constants, digest, and final profile.
- `renderDeploymentEvidenceIntakeGateMarkdown` remains near the public profile composition.
- Summary projection and digest helpers stay in the entrypoint because they are composition details.

## Maintenance rule

Do not add new policy or evidence blocks to the entrypoint.
