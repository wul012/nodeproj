# Node v1941 - deployment evidence intake gate mini-kv evidence

## Focus

Move mini-kv v69 release artifact digest package evidence out of the loader.

## What changed

The frozen mini-kv release artifact package now lives beside the Java evidence in `deploymentEvidenceIntakeGateEvidence.ts`.

## Why this matters

mini-kv release evidence remains read-only and isolated from loader/rendering concerns.
