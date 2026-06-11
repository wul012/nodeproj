# Code walkthrough - Node v1945

## Focus

Extract readiness checks.

## Code reading notes

- `createChecks` moved to policy.
- It consumes post-v166 summary state plus Java and mini-kv frozen evidence.
- The aggregate ready check still runs in the entrypoint after policy produces the raw check map.

## Maintenance rule

Keep all gate booleans in policy so review can compare checks and messages together.
