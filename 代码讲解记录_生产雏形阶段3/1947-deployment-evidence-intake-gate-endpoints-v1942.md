# Code walkthrough - Node v1942

## Focus

Move the endpoint catalog beside evidence constants.

## Code reading notes

- `ENDPOINTS` now lives in `deploymentEvidenceIntakeGateEvidence.ts`.
- The entrypoint spreads that catalog into the profile.
- The route remains unchanged.

## Maintenance rule

Keep endpoint and evidence pointers together so archive references stay easy to inspect.
