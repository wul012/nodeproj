# Code walkthrough - Node v1901

## Focus

Record the batch commit for the split and verification work.

## Code reading notes

- The batch commit captures the source split and the verification work together.
- That keeps the source and its proof of correctness in the same unit of history.
- It is the right shape for later rollback or review.

## Maintenance rule

Keep the stable service barrel thin, keep evidence parsing in the shared helper, and keep readiness logic, message builders, and profile assembly in separate modules.
