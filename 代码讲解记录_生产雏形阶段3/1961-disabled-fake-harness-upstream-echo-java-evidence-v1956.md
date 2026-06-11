# Code walkthrough - Node v1956

## Focus

Extract Java evidence construction.

## Code reading notes

- `createJavaV122V126Reference` lives in References.
- It builds evidence file records, snippet matches, and Java boundary booleans.
- It does not call Java services or mutate sibling projects.

## Maintenance rule

Keep Java evidence consumption file-backed and read-only.
