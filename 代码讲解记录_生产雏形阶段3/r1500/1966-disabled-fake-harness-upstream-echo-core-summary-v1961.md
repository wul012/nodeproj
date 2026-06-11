# Code walkthrough - Node v1961

## Focus

Extract summary aggregation.

## Code reading notes

- `createSummary` lives in Core.
- It aggregates check counts, evidence file counts, snippet counts, source counts, and message counts.
- It uses shared report count helpers.

## Maintenance rule

Keep summary counting in Core so the loader stays readable.
