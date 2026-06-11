# Code walkthrough - Node v1977

## Focus

Extract policy checks.

## Code reading notes

- `createBlockedExecutionAttempts` constructs the dangerous-operation matrix.
- `createChecks` verifies source Node v233, Java v90, mini-kv v99, blocked attempts, runtime config, and production gates.

## Maintenance rule

Add new gates in Policy with matching operator messages.
