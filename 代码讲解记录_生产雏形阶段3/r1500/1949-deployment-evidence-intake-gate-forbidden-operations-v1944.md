# Code walkthrough - Node v1944

## Focus

Extract forbidden operation construction.

## Code reading notes

- `createForbiddenOperations` moved to policy.
- Java deployment, Java rollback, SQL execution, secret reads, database connection, mini-kv restore-sensitive commands, upstream auto-start, and production approval remain explicitly forbidden.

## Maintenance rule

Keep safety prohibitions beside readiness policy.
