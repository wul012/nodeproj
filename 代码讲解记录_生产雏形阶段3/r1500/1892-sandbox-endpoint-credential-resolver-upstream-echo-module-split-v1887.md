# Code walkthrough - Node v1887

## Focus

Move digest and profile assembly into a thin core loader.

## Code reading notes

- The core loader now reads like orchestration, not a grab bag.
- It creates references, evaluates checks, builds the digest, and returns the profile.
- That shape is much easier to reason about in future batches.

## Maintenance rule

Keep the stable service barrel thin, keep evidence parsing in the shared helper, and keep readiness logic, message builders, and profile assembly in separate modules.
