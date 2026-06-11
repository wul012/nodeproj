# Node v1963 - disabled fake harness upstream echo policy blockers

## Focus

Move blocker message collection into policy.

## What changed

`collectProductionBlockers` now lives with the checks it reports on.

## Maintenance note

Every new check should have an operator-readable blocker if failure would block readiness.
