# Node v1944 - deployment evidence intake gate forbidden operations

## Focus

Move forbidden operation construction into policy.

## What changed

`createForbiddenOperations` now lives in `deploymentEvidenceIntakeGatePolicy.ts`.

## Why this matters

The production safety boundary stays close to the checks and messages that enforce it.
