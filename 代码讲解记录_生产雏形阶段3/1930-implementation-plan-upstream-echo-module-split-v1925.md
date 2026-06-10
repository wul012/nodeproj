# Code walkthrough - Node v1925

## Focus

Run full Vitest regression with bounded workers.

## Code reading notes

- Full Vitest is run with bounded workers.
- That keeps memory under control while preserving broad confidence.
- Failures are triaged separately from timeouts when they appear.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
