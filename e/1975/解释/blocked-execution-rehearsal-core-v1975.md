# Node v1975 - blocked execution rehearsal core assembly

## Focus

Move blocked execution rehearsal digest assembly into Core.

## What changed

`createBlockedExecutionRehearsal` now lives in `managedAuditManualSandboxConnectionBlockedExecutionRehearsalCore.ts`.

## Maintenance note

Core owns derived rehearsal records; Policy owns gates.
