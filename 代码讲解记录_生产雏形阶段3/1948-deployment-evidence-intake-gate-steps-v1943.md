# Code walkthrough - Node v1943

## Focus

Extract intake step construction.

## Code reading notes

- `createIntakeSteps` moved to `deploymentEvidenceIntakeGatePolicy.ts`.
- Every step remains dry-run, read-only, and non-executing.
- The loader only asks policy for the step list.

## Maintenance rule

Add new intake workflow steps in policy, not in the loader.
