# Node v1945 - deployment evidence intake gate checks

## Focus

Move readiness checks into policy.

## What changed

`createChecks` now lives in `deploymentEvidenceIntakeGatePolicy.ts` and reads frozen Java and mini-kv evidence from the evidence module.

## Why this matters

Readiness logic is now reviewable without loader, rendering, or digest noise.
