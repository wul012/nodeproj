# Code walkthrough - Node v1888

## Focus

Add split-export identity coverage to preserve the public contract.

## Code reading notes

- The test now explicitly ties the stable barrel to the split core and renderer modules.
- That is the guardrail that keeps future refactors from changing the public import surface by accident.
- It also proves the legacy file can stay tiny without losing behavior.

## Maintenance rule

Keep the stable service barrel thin, keep evidence parsing in the shared helper, and keep readiness logic, message builders, and profile assembly in separate modules.
