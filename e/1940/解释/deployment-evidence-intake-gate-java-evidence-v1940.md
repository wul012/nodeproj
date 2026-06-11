# Node v1940 - deployment evidence intake gate Java evidence

## Focus

Move Java v60 production deployment runbook evidence out of the loader.

## What changed

`deploymentEvidenceIntakeGateEvidence.ts` now owns the frozen Java runbook contract reference.

## Why this matters

Java evidence can be reviewed or refreshed without scanning intake steps, checks, rendering, and digest logic.
