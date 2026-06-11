# Node v1943 - deployment evidence intake gate steps

## Focus

Move dry-run intake step construction into policy.

## What changed

`createIntakeSteps` now belongs to `deploymentEvidenceIntakeGatePolicy.ts`.

## Why this matters

Step construction is policy, not loading. Keeping it outside the entrypoint makes dry-run and read-only guarantees easier to inspect.
