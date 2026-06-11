# Code walkthrough - Node v1946

## Focus

Extract blocker message collection.

## Code reading notes

- `collectProductionBlockers` moved to policy.
- `addMessage` remains internal to policy and wraps `appendBlockingMessage`.
- Each blocker code still maps to a concrete readiness check.

## Maintenance rule

When adding a check, add its blocker beside it in policy.
