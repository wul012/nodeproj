# Node v539 Node Evidence CI test budget stabilization

v539 fixes the latest CI failure after v538.

## Failure

The v538 GitHub Actions run failed because the Node Evidence job exceeded the workflow-level 10 minute timeout while running `npm test`.

The log showed typecheck completed and many test files passing, including `javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake.test.ts`. No assertion failure was observed before cancellation.

## Change

`node-evidence.yml` now gives the job 20 minutes instead of 10 minutes.

This is test-budget stabilization, not a business behavior fix.

## Boundary

No service code, route catalog entry, Java evidence, mini-kv evidence, runtime probe, or upstream execution behavior changed.

## Next Direction

Wait for the new HEAD CI run. If it still fails, treat the next failure by its actual type: timeout, assertion, build, or smoke.
