# Node v1969 - blocked execution rehearsal types

## Focus

Move blocked execution rehearsal type ownership out of the loader.

## What changed

`managedAuditManualSandboxConnectionBlockedExecutionRehearsalTypes.ts` now owns the public profile, Java v90 and mini-kv v99 references, evidence descriptors, snippet matches, attempts, checks, messages, and receipt helper shapes.

## Maintenance note

New structural fields should be added to Types before runtime logic changes.
