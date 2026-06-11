# Node v1977 - blocked execution rehearsal policy checks

## Focus

Move simulated attempts and readiness checks into Policy.

## What changed

`createBlockedExecutionAttempts` and `createChecks` now live in `managedAuditManualSandboxConnectionBlockedExecutionRehearsalPolicy.ts`.

## Maintenance note

Future rehearsal gates should be added in Policy with matching blocker messages.
