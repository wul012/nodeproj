# Code walkthrough - Node v1909

## Focus

Keep the mini-kv v126 Node v283 snapshot reader isolated with the evidence builders.

## Code reading notes

- The snapshot reader is intentionally kept with mini-kv receipt parsing.
- That avoids a separate helper file for one fixture-specific shape.
- The source Node fallback behavior remains visible to maintainers.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
