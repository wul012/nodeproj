# Code walkthrough - Node v1976

## Focus

Extract summary aggregation.

## Code reading notes

- `createSummary` centralizes counts for checks, evidence files, snippets, attempts, blockers, warnings, and recommendations.
- The loader no longer performs count arithmetic inline.

## Maintenance rule

Keep summary counting in Core.
