# Code walkthrough - Node v1923

## Focus

Run typecheck after the split.

## Code reading notes

- Typecheck validates imports and exported types after the split.
- It catches missing constants and circular mistakes early.
- This gate is required before broader tests.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
