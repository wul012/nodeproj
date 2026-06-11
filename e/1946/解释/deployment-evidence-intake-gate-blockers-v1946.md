# Node v1946 - deployment evidence intake gate blockers

## Focus

Move production blocker message collection into policy.

## What changed

`collectProductionBlockers` and its internal message helper now live in `deploymentEvidenceIntakeGatePolicy.ts`.

## Why this matters

Every readiness failure and operator-facing blocker remains close to the check that drives it.
