# Node v1961 - disabled fake harness upstream echo core summary

## Focus

Move summary aggregation into core.

## What changed

`createSummary` now lives beside echo verification assembly and computes file, snippet, check, blocker, warning, and recommendation counts.

## Maintenance note

Summary changes should stay in core unless they introduce new policy checks.
