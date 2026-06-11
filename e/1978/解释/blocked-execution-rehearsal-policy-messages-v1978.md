# Node v1978 - blocked execution rehearsal policy messages

## Focus

Move blockers, warnings, and recommendations into Policy.

## What changed

`collectProductionBlockers`, `collectWarnings`, and `collectRecommendations` now live beside the checks they describe.

## Maintenance note

Operator-facing text belongs in Policy, not the loader.
