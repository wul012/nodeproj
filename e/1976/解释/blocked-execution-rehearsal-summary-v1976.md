# Node v1976 - blocked execution rehearsal summary

## Focus

Move summary aggregation into Core.

## What changed

`createSummary` now owns check, evidence, snippet, attempt, blocker, warning, and recommendation counts.

## Maintenance note

Summary-count changes should stay in Core unless they add a new readiness condition.
